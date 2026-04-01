import { useState, useEffect, useCallback, useRef, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SlideVisual, SpaceSlideVisual, IntroSlideVisual, SectionTitleVisual, PhasesVisual, SolvedProblemsVisual, getConsolidatedPhaseCount, getConsolidatedVisualKey } from './SlideVisuals';
import daveAvatar from '../../assets/images/dave-avatar.jpeg';


type SlideLayout = 'center' | 'side' | 'side-right';

export type LandOnTarget =
  | { mode: 'prototypes'; route: string }
  | { mode: 'docs'; docId: string }
  | { mode: 'style-guide'; tab?: 'nav' | 'slides' };

interface Slide {
  number: number;
  headline: string;
  subtext?: string;
  phaseHeadlines?: string[];
  layout?: SlideLayout;
  landOn?: LandOnTarget;
}

const SLIDE_PAIRS: { problem: Omit<Slide, 'number'>; solution: Omit<Slide, 'number'>; layout?: SlideLayout }[] = [
  {
    problem: {
      headline: 'No shared taxonomy or guidance',
      phaseHeadlines: ['No shared internal taxonomy', 'No guidance on what belongs where', 'No guidance for the nav order'],
    },
    solution: {
      headline: 'One taxonomy',
      phaseHeadlines: ['Product, Module, Feature \u2014 three tiers', 'A rulebook governs placement', 'A defined ordering framework'],
      landOn: { mode: 'docs', docId: 'ia-products-modules' },
    },
  },
  {
    problem: {
      headline: 'Homeless products',
      phaseHeadlines: ['Products don\u2019t have nav presence', 'Settings and EE Profile absorb it', 'Unpurchased products are invisible'],
    },
    solution: {
      headline: 'Front doors',
      phaseHeadlines: ['Every product gets a T1 and hub', 'Config lives in-product', 'Locked products show upsell paths'],
    },
  },
  {
    problem: {
      headline: 'Broken nav',
      phaseHeadlines: ['Split nav creates a dead zone', 'The screen real estate crisis'],
    },
    solution: {
      headline: 'One nav',
      phaseHeadlines: ['A single two-tier vertical nav', 'No header bar, no sub-nav'],
    },
  },
  {
    problem: {
      headline: 'Poor contextual patterns',
      phaseHeadlines: ['Settings require a scavenger hunt', 'No pattern for contextual reports', 'No pattern for contextual AI', 'No pattern for surfacing insights'],
    },
    solution: {
      headline: 'In context',
      phaseHeadlines: ['Settings via gear icon on every hub', 'Metrics and reports on every hub', 'Contextual Ask and insights', 'Automation suggestions on every hub'],
    },
  },
  {
    problem: {
      headline: 'We\u2019re not future-proof',
      phaseHeadlines: ['The nav was designed for HR only', 'No room for new domains'],
    },
    solution: {
      headline: 'Future-proof by design',
      phaseHeadlines: ['New domains slot right in', 'One nav for every role'],
      landOn: { mode: 'docs', docId: 'platform-architecture' },
    },
  },
];

// Intro slides that precede the problems (number: 0 means "intro, no counter")
const INTRO_SET_SLIDES: Slide[] = [
  { number: 0, headline: '__title_card__' },
  { number: 0, headline: 'We have an information architecture problem.' },
  { number: 0, headline: 'Well, actually, it\u2019s 5 problems.' },
  { number: 0, headline: '__purpose__', layout: 'side-right' },
  { number: 0, headline: '__methodology__' },
  { number: 0, headline: '__phases__' },
];

const PROBLEM_SLIDES: Slide[] = [
  { number: 0, headline: '5 Problems' },
  ...SLIDE_PAIRS.map((pair, i) => ({ number: i + 1, layout: pair.layout, ...pair.problem })),
];
const SOLUTION_SLIDES: Slide[] = [
  { number: 0, headline: 'Redesign\nPrototype' },
  { number: 0, headline: '__solved_problems__' },
  ...SLIDE_PAIRS.map((pair, i) => ({ number: i + 1, layout: pair.layout, ...pair.solution })),
];

// Space exploration slides
const SPACE_SLIDES: Slide[] = [
  { number: 0, headline: 'Space\nExploration' },
  { number: 1, headline: 'All of that is too little, too late.', subtext: 'Better navigation. Cleaner UI. Faster workflows. Right fixes \u2014 for 2022.' },
  { number: 2, headline: 'Claude Code can rebuild our product in a weekend. Now what?', subtext: 'Every feature we\u2019ve built over 15 years can now be replicated in an afternoon. The feature moat is gone.', layout: 'side' },
  { number: 3, headline: 'The solution isn\u2019t a better app. It\u2019s a better platform.', subtext: 'Consistent shell. Infinite surface area. Everyone\u2019s experience is different \u2014 but everyone speaks the same language.' },
  { number: 4, headline: 'BambooHR becomes the data layer AI runs on.', subtext: 'Own the graph. Define the framework. Let everything else \u2014 apps, AI, the market \u2014 build on top.' },
];

/** Renders children scaled to fit within a fixed container */
function ScaleToFit({ width, height, children }: { width: number; height: number; children: React.ReactNode }) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const inner = innerRef.current;
    if (!inner) return;
    const ro = new ResizeObserver(() => {
      const iw = inner.scrollWidth;
      const ih = inner.scrollHeight;
      if (iw === 0 || ih === 0) return;
      setScale(Math.min(width / iw, height / ih, 1));
    });
    ro.observe(inner);
    return () => ro.disconnect();
  }, [width, height]);

  return (
    <div ref={outerRef} className="flex items-center justify-center" style={{ width, height, overflow: 'visible' }}>
      <div ref={innerRef} style={{ transform: `scale(${scale})`, transformOrigin: 'center center' }}>
        {children}
      </div>
    </div>
  );
}

const LEGACY_KEY = 'bhr-legacy-nav';
const SLIDES_POSITION_KEY = 'bhr-slides-position'; // sessionStorage

type Direction = 'left' | 'right' | 'none';

// In-memory position — survives open/close but not page refresh
let savedPosition: { navMode: string; slide: number } | null = null;

function getSavedPosition() {
  return savedPosition;
}

function savePosition(navMode: string, slide: number) {
  savedPosition = { navMode, slide };
}

export function ProblemSlides() {
  const [isOpen, setIsOpen] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('present') === 'true';
  });
  const [isClosing, setIsClosing] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState<Direction>('none');
  const [slideKey, setSlideKey] = useState(0);
  const [navMode, setNavMode] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('present') === 'true') {
      localStorage.setItem(LEGACY_KEY, 'intro');
      window.dispatchEvent(new Event('storage'));
      return 'intro';
    }
    const stored = localStorage.getItem(LEGACY_KEY);
    if (stored === 'intro') return 'intro';
    if (stored === 'true') return 'legacy';
    if (stored === 'space') return 'space';
    return 'new';
  });
  const [visualPhase, setVisualPhase] = useState(0);
  const closingTimeout = useRef<ReturnType<typeof setTimeout>>(undefined);

  const chainingRef = useRef(false);

  // Sync nav mode from localStorage (skip if chaining to avoid double-fire)
  useEffect(() => {
    const handler = () => {
      if (chainingRef.current) return;
      const stored = localStorage.getItem(LEGACY_KEY);
      const mode = stored === 'intro' ? 'intro' : stored === 'true' ? 'legacy' : stored === 'space' ? 'space' : 'new';
      setNavMode(mode);
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  const slides = navMode === 'intro' ? INTRO_SET_SLIDES : navMode === 'legacy' ? PROBLEM_SLIDES : navMode === 'space' ? SPACE_SLIDES : SOLUTION_SLIDES;

  // Save position whenever slide or mode changes while open
  useEffect(() => {
    if (isOpen && !isClosing) {
      savePosition(navMode, currentSlide);
    }
  }, [isOpen, isClosing, navMode, currentSlide]);

  // Reset to first slide when switching nav modes (unless chaining between sets)
  useEffect(() => {
    if (chainingRef.current) {
      chainingRef.current = false;
    } else {
      setCurrentSlide(0);
    }
  }, [navMode]);

  const navigate = useNavigate();

  const close = useCallback(() => {
    // Land on the current slide's target before closing
    const currentSlideData = slides[Math.min(currentSlide, slides.length - 1)];
    const target = currentSlideData?.landOn;
    if (target) {
      if (target.mode === 'prototypes') {
        localStorage.setItem('bhr-project-mode', 'prototypes');
        window.dispatchEvent(new Event('storage'));
        navigate(target.route);
      } else if (target.mode === 'docs') {
        localStorage.setItem('bhr-project-mode', 'docs');
        localStorage.setItem('bhr-selected-doc', target.docId);
        window.dispatchEvent(new Event('storage'));
      } else if (target.mode === 'style-guide') {
        localStorage.setItem('bhr-project-mode', 'style-guide');
        if (target.tab) {
          localStorage.setItem('bhr-style-guide-tab', target.tab);
        }
        window.dispatchEvent(new Event('storage'));
        navigate('/style-guide');
      }
    }

    setIsClosing(true);
    closingTimeout.current = setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 300);
  }, [currentSlide, slides, navigate]);

  const open = useCallback(() => {
    // Try to restore last position from this session
    const saved = getSavedPosition();
    if (saved) {
      setNavMode(saved.navMode as typeof navMode);
      setCurrentSlide(saved.slide);
    } else {
      // First time this session — start at intro title card
      setNavMode('intro');
      setCurrentSlide(0);
    }
    setDirection('none');
    setSlideKey(k => k + 1);
    setVisualPhase(0);
    (document.activeElement as HTMLElement)?.blur();
    setIsOpen(true);
  }, []);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const tag = (e.target as HTMLElement).tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

    if (e.code === 'Space') {
      e.preventDefault();
      if (isOpen && !isClosing) {
        close();
      } else if (!isOpen) {
        open();
      }
      return;
    }

    if (!isOpen || isClosing) return;

    // Check if current slide has sub-steps (visual phases)
    const isPhaseSlide = navMode === 'intro' && slides[currentSlide]?.headline === '__phases__';
    const isMethodologySlide = navMode === 'intro' && slides[currentSlide]?.headline === '__methodology__';

    let maxPhase = 0;
    if (isMethodologySlide) {
      maxPhase = 3;
    } else if (isPhaseSlide) {
      maxPhase = 1;
    } else if ((navMode === 'legacy' || navMode === 'new') && currentSlide > 0) {
      // Consolidated slides: use phase count from visual mapping
      const slideIndex = navMode === 'new' ? currentSlide - 2 : currentSlide - 1;
      const mode = navMode === 'legacy' ? 'problem' : 'solution';
      if (slideIndex >= 0) {
        maxPhase = getConsolidatedPhaseCount(slideIndex, mode) - 1;
      }
    }

    const NAV_ORDER: typeof navMode[] = ['intro', 'legacy', 'new', 'space'];
    const switchNavMode = (mode: typeof navMode) => {
      chainingRef.current = true;
      setNavMode(mode);
      const stored = mode === 'intro' ? 'intro' : mode === 'legacy' ? 'true' : mode === 'space' ? 'space' : 'false';
      localStorage.setItem(LEGACY_KEY, stored);
      // Delay storage dispatch so React processes state updates first
      setTimeout(() => window.dispatchEvent(new Event('storage')), 0);
    };

    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      if (visualPhase < maxPhase) {
        setVisualPhase(p => p + 1);
      } else {
        const s = navMode === 'intro' ? INTRO_SET_SLIDES : navMode === 'legacy' ? PROBLEM_SLIDES : navMode === 'space' ? SPACE_SLIDES : SOLUTION_SLIDES;
        if (currentSlide >= s.length - 1) {
          // Chain to next slide set
          const idx = NAV_ORDER.indexOf(navMode);
          if (idx < NAV_ORDER.length - 1) {
            switchNavMode(NAV_ORDER[idx + 1]);
            setDirection('right');
            setSlideKey(k => k + 1);
            setVisualPhase(0);
            setCurrentSlide(0);
          }
        } else {
          setDirection('right');
          setSlideKey(k => k + 1);
          setVisualPhase(0);
          setCurrentSlide(prev => prev + 1);
        }
      }
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      if (visualPhase > 0) {
        setVisualPhase(p => p - 1);
      } else if (currentSlide <= 0) {
        // Chain to previous slide set
        const idx = NAV_ORDER.indexOf(navMode);
        if (idx > 0) {
          const prevMode = NAV_ORDER[idx - 1];
          const prevSlides = prevMode === 'intro' ? INTRO_SET_SLIDES : prevMode === 'legacy' ? PROBLEM_SLIDES : prevMode === 'space' ? SPACE_SLIDES : SOLUTION_SLIDES;
          switchNavMode(prevMode);
          setDirection('left');
          setSlideKey(k => k + 1);
          setVisualPhase(0);
          setCurrentSlide(prevSlides.length - 1);
        }
      } else {
        setDirection('left');
        setSlideKey(k => k + 1);
        setVisualPhase(0);
        setCurrentSlide(prev => prev - 1);
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      close();
    }
  }, [isOpen, isClosing, close, open, navMode, currentSlide, visualPhase]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    return () => {
      if (closingTimeout.current) clearTimeout(closingTimeout.current);
    };
  }, []);

  if (!isOpen) return null;

  const slide = slides[Math.min(currentSlide, slides.length - 1)];

  const overlayAnimation = isClosing
    ? 'animate-[overlayOut_300ms_ease-in_forwards]'
    : 'animate-[overlayIn_400ms_ease-out_forwards]';

  const contentTransform = direction === 'right'
    ? 'translate3d(60px, 0, 0)'
    : direction === 'left'
      ? 'translate3d(-60px, 0, 0)'
      : 'scale(0.96)';

  const contentAnimation = isClosing
    ? 'animate-[contentOut_300ms_ease-in_forwards]'
    : '';

  return (
    <>
      <style>{`
        @keyframes overlayIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes overlayOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        @keyframes contentOut {
          from { opacity: 1; transform: scale(1); }
          to { opacity: 0; transform: scale(0.96); }
        }
        @keyframes slideContentIn {
          from { opacity: 0; transform: var(--slide-from); }
          to { opacity: 1; transform: translate3d(0, 0, 0) scale(1); }
        }
        @keyframes introNumIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes phaseIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <div className={`fixed inset-0 z-[9999] bg-black/95 backdrop-blur-sm flex flex-col items-center justify-center select-none ${overlayAnimation}`}>
        {/* Space background */}
        {navMode === 'space' && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute inset-0" style={{
              background: 'radial-gradient(ellipse 80% 60% at 75% 20%, rgba(30,80,140,0.35) 0%, rgba(15,40,80,0.15) 40%, transparent 70%), radial-gradient(ellipse 50% 40% at 30% 70%, rgba(20,60,120,0.12) 0%, transparent 60%)',
            }} />
            <div className="space-stars-sm" />
            <div className="space-stars-sm2" />
            <div className="space-stars-md" />
            <div className="space-stars-md2" />
            <div className="space-stars-lg" />
            <div className="space-stars-lg2" />
            <style>{`
              .space-stars-sm {
                position: absolute; inset: 0;
                background-image:
                  radial-gradient(0.8px 0.8px at 3% 7%, rgba(180,210,255,0.5), transparent),
                  radial-gradient(0.8px 0.8px at 8% 22%, rgba(180,210,255,0.4), transparent),
                  radial-gradient(0.8px 0.8px at 12% 45%, rgba(180,210,255,0.35), transparent),
                  radial-gradient(0.8px 0.8px at 16% 78%, rgba(180,210,255,0.3), transparent),
                  radial-gradient(0.8px 0.8px at 21% 12%, rgba(180,210,255,0.45), transparent),
                  radial-gradient(0.8px 0.8px at 26% 56%, rgba(180,210,255,0.3), transparent),
                  radial-gradient(0.8px 0.8px at 31% 33%, rgba(180,210,255,0.4), transparent),
                  radial-gradient(0.8px 0.8px at 35% 88%, rgba(180,210,255,0.25), transparent),
                  radial-gradient(0.8px 0.8px at 39% 4%, rgba(180,210,255,0.5), transparent),
                  radial-gradient(0.8px 0.8px at 43% 67%, rgba(180,210,255,0.3), transparent),
                  radial-gradient(0.8px 0.8px at 47% 29%, rgba(180,210,255,0.35), transparent),
                  radial-gradient(0.8px 0.8px at 52% 82%, rgba(180,210,255,0.25), transparent),
                  radial-gradient(0.8px 0.8px at 56% 15%, rgba(180,210,255,0.45), transparent),
                  radial-gradient(0.8px 0.8px at 61% 51%, rgba(180,210,255,0.3), transparent),
                  radial-gradient(0.8px 0.8px at 65% 93%, rgba(180,210,255,0.2), transparent),
                  radial-gradient(0.8px 0.8px at 69% 38%, rgba(180,210,255,0.4), transparent),
                  radial-gradient(0.8px 0.8px at 74% 71%, rgba(180,210,255,0.3), transparent),
                  radial-gradient(0.8px 0.8px at 78% 9%, rgba(180,210,255,0.5), transparent),
                  radial-gradient(0.8px 0.8px at 82% 58%, rgba(180,210,255,0.35), transparent),
                  radial-gradient(0.8px 0.8px at 87% 24%, rgba(180,210,255,0.4), transparent),
                  radial-gradient(0.8px 0.8px at 91% 84%, rgba(180,210,255,0.25), transparent),
                  radial-gradient(0.8px 0.8px at 95% 42%, rgba(180,210,255,0.35), transparent),
                  radial-gradient(0.8px 0.8px at 2% 62%, rgba(180,210,255,0.3), transparent),
                  radial-gradient(0.8px 0.8px at 14% 95%, rgba(180,210,255,0.2), transparent),
                  radial-gradient(0.8px 0.8px at 28% 3%, rgba(180,210,255,0.45), transparent),
                  radial-gradient(0.8px 0.8px at 44% 48%, rgba(180,210,255,0.3), transparent),
                  radial-gradient(0.8px 0.8px at 58% 72%, rgba(180,210,255,0.25), transparent),
                  radial-gradient(0.8px 0.8px at 73% 19%, rgba(180,210,255,0.4), transparent),
                  radial-gradient(0.8px 0.8px at 88% 66%, rgba(180,210,255,0.3), transparent),
                  radial-gradient(0.8px 0.8px at 97% 11%, rgba(180,210,255,0.45), transparent);
              }
              .space-stars-sm2 {
                position: absolute; inset: 0;
                background-image:
                  radial-gradient(0.7px 0.7px at 1% 34%, rgba(180,210,255,0.4), transparent),
                  radial-gradient(0.8px 0.8px at 6% 58%, rgba(180,210,255,0.35), transparent),
                  radial-gradient(0.7px 0.7px at 10% 81%, rgba(180,210,255,0.3), transparent),
                  radial-gradient(0.8px 0.8px at 15% 3%, rgba(180,210,255,0.5), transparent),
                  radial-gradient(0.7px 0.7px at 19% 41%, rgba(180,210,255,0.35), transparent),
                  radial-gradient(0.8px 0.8px at 23% 69%, rgba(180,210,255,0.3), transparent),
                  radial-gradient(0.7px 0.7px at 29% 17%, rgba(180,210,255,0.45), transparent),
                  radial-gradient(0.8px 0.8px at 34% 52%, rgba(180,210,255,0.3), transparent),
                  radial-gradient(0.7px 0.7px at 37% 76%, rgba(180,210,255,0.25), transparent),
                  radial-gradient(0.8px 0.8px at 41% 11%, rgba(180,210,255,0.5), transparent),
                  radial-gradient(0.7px 0.7px at 46% 39%, rgba(180,210,255,0.35), transparent),
                  radial-gradient(0.8px 0.8px at 50% 63%, rgba(180,210,255,0.3), transparent),
                  radial-gradient(0.7px 0.7px at 54% 91%, rgba(180,210,255,0.2), transparent),
                  radial-gradient(0.8px 0.8px at 59% 26%, rgba(180,210,255,0.4), transparent),
                  radial-gradient(0.7px 0.7px at 63% 44%, rgba(180,210,255,0.35), transparent),
                  radial-gradient(0.8px 0.8px at 67% 8%, rgba(180,210,255,0.5), transparent),
                  radial-gradient(0.7px 0.7px at 72% 57%, rgba(180,210,255,0.3), transparent),
                  radial-gradient(0.8px 0.8px at 76% 83%, rgba(180,210,255,0.25), transparent),
                  radial-gradient(0.7px 0.7px at 80% 31%, rgba(180,210,255,0.4), transparent),
                  radial-gradient(0.8px 0.8px at 84% 47%, rgba(180,210,255,0.35), transparent),
                  radial-gradient(0.7px 0.7px at 89% 73%, rgba(180,210,255,0.3), transparent),
                  radial-gradient(0.8px 0.8px at 93% 16%, rgba(180,210,255,0.45), transparent),
                  radial-gradient(0.7px 0.7px at 96% 55%, rgba(180,210,255,0.3), transparent),
                  radial-gradient(0.8px 0.8px at 99% 88%, rgba(180,210,255,0.2), transparent),
                  radial-gradient(0.7px 0.7px at 4% 49%, rgba(180,210,255,0.35), transparent),
                  radial-gradient(0.8px 0.8px at 17% 27%, rgba(180,210,255,0.4), transparent),
                  radial-gradient(0.7px 0.7px at 33% 65%, rgba(180,210,255,0.3), transparent),
                  radial-gradient(0.8px 0.8px at 48% 2%, rgba(180,210,255,0.5), transparent),
                  radial-gradient(0.7px 0.7px at 66% 79%, rgba(180,210,255,0.25), transparent),
                  radial-gradient(0.8px 0.8px at 81% 14%, rgba(180,210,255,0.45), transparent);
              }
              .space-stars-md {
                position: absolute; inset: 0;
                background-image:
                  radial-gradient(1.3px 1.3px at 5% 18%, rgba(200,220,255,0.6), transparent),
                  radial-gradient(1.3px 1.3px at 11% 52%, rgba(200,220,255,0.45), transparent),
                  radial-gradient(1.3px 1.3px at 18% 85%, rgba(200,220,255,0.35), transparent),
                  radial-gradient(1.3px 1.3px at 24% 31%, rgba(200,220,255,0.5), transparent),
                  radial-gradient(1.3px 1.3px at 33% 9%, rgba(200,220,255,0.55), transparent),
                  radial-gradient(1.3px 1.3px at 38% 64%, rgba(200,220,255,0.4), transparent),
                  radial-gradient(1.3px 1.3px at 46% 42%, rgba(200,220,255,0.5), transparent),
                  radial-gradient(1.3px 1.3px at 54% 76%, rgba(200,220,255,0.35), transparent),
                  radial-gradient(1.3px 1.3px at 62% 21%, rgba(200,220,255,0.55), transparent),
                  radial-gradient(1.3px 1.3px at 68% 55%, rgba(200,220,255,0.4), transparent),
                  radial-gradient(1.3px 1.3px at 76% 37%, rgba(200,220,255,0.5), transparent),
                  radial-gradient(1.3px 1.3px at 83% 79%, rgba(200,220,255,0.35), transparent),
                  radial-gradient(1.3px 1.3px at 89% 14%, rgba(200,220,255,0.6), transparent),
                  radial-gradient(1.3px 1.3px at 94% 48%, rgba(200,220,255,0.45), transparent),
                  radial-gradient(1.3px 1.3px at 7% 91%, rgba(200,220,255,0.3), transparent),
                  radial-gradient(1.3px 1.3px at 42% 6%, rgba(200,220,255,0.55), transparent),
                  radial-gradient(1.3px 1.3px at 57% 88%, rgba(200,220,255,0.3), transparent),
                  radial-gradient(1.3px 1.3px at 71% 3%, rgba(200,220,255,0.6), transparent),
                  radial-gradient(1.3px 1.3px at 86% 44%, rgba(200,220,255,0.45), transparent),
                  radial-gradient(1.3px 1.3px at 29% 70%, rgba(200,220,255,0.35), transparent);
              }
              .space-stars-md2 {
                position: absolute; inset: 0;
                background-image:
                  radial-gradient(1.2px 1.2px at 2% 29%, rgba(200,220,255,0.5), transparent),
                  radial-gradient(1.4px 1.4px at 9% 67%, rgba(200,220,255,0.4), transparent),
                  radial-gradient(1.2px 1.2px at 15% 11%, rgba(200,220,255,0.55), transparent),
                  radial-gradient(1.4px 1.4px at 22% 43%, rgba(200,220,255,0.45), transparent),
                  radial-gradient(1.2px 1.2px at 27% 82%, rgba(200,220,255,0.3), transparent),
                  radial-gradient(1.4px 1.4px at 35% 24%, rgba(200,220,255,0.5), transparent),
                  radial-gradient(1.2px 1.2px at 41% 56%, rgba(200,220,255,0.4), transparent),
                  radial-gradient(1.4px 1.4px at 48% 15%, rgba(200,220,255,0.55), transparent),
                  radial-gradient(1.2px 1.2px at 53% 38%, rgba(200,220,255,0.45), transparent),
                  radial-gradient(1.4px 1.4px at 59% 71%, rgba(200,220,255,0.35), transparent),
                  radial-gradient(1.2px 1.2px at 64% 92%, rgba(200,220,255,0.25), transparent),
                  radial-gradient(1.4px 1.4px at 70% 48%, rgba(200,220,255,0.45), transparent),
                  radial-gradient(1.2px 1.2px at 75% 7%, rgba(200,220,255,0.6), transparent),
                  radial-gradient(1.4px 1.4px at 81% 33%, rgba(200,220,255,0.5), transparent),
                  radial-gradient(1.2px 1.2px at 87% 59%, rgba(200,220,255,0.4), transparent),
                  radial-gradient(1.4px 1.4px at 92% 22%, rgba(200,220,255,0.55), transparent),
                  radial-gradient(1.2px 1.2px at 96% 77%, rgba(200,220,255,0.3), transparent),
                  radial-gradient(1.4px 1.4px at 13% 36%, rgba(200,220,255,0.5), transparent),
                  radial-gradient(1.2px 1.2px at 44% 87%, rgba(200,220,255,0.3), transparent),
                  radial-gradient(1.4px 1.4px at 79% 64%, rgba(200,220,255,0.4), transparent);
              }
              .space-stars-lg {
                position: absolute; inset: 0;
                background-image:
                  radial-gradient(2.5px 2.5px at 72% 12%, rgba(220,235,255,0.9), transparent),
                  radial-gradient(2px 2px at 90% 8%, rgba(220,235,255,0.8), transparent),
                  radial-gradient(2.5px 2.5px at 82% 28%, rgba(220,235,255,0.7), transparent),
                  radial-gradient(2px 2px at 15% 35%, rgba(220,235,255,0.5), transparent),
                  radial-gradient(3px 3px at 78% 18%, rgba(230,240,255,0.85), transparent),
                  radial-gradient(2px 2px at 50% 5%, rgba(220,235,255,0.6), transparent),
                  radial-gradient(2.5px 2.5px at 35% 15%, rgba(220,235,255,0.55), transparent),
                  radial-gradient(2px 2px at 63% 45%, rgba(220,235,255,0.45), transparent),
                  radial-gradient(2.5px 2.5px at 88% 62%, rgba(220,235,255,0.5), transparent),
                  radial-gradient(2px 2px at 22% 82%, rgba(220,235,255,0.4), transparent),
                  radial-gradient(3px 3px at 95% 30%, rgba(230,240,255,0.75), transparent),
                  radial-gradient(2px 2px at 45% 92%, rgba(220,235,255,0.35), transparent);
              }
              .space-stars-lg2 {
                position: absolute; inset: 0;
                background-image:
                  radial-gradient(2px 2px at 4% 14%, rgba(220,235,255,0.55), transparent),
                  radial-gradient(2.5px 2.5px at 11% 53%, rgba(220,235,255,0.5), transparent),
                  radial-gradient(2px 2px at 19% 8%, rgba(220,235,255,0.6), transparent),
                  radial-gradient(3px 3px at 27% 41%, rgba(230,240,255,0.45), transparent),
                  radial-gradient(2px 2px at 32% 72%, rgba(220,235,255,0.4), transparent),
                  radial-gradient(2.5px 2.5px at 40% 26%, rgba(220,235,255,0.55), transparent),
                  radial-gradient(2px 2px at 48% 59%, rgba(220,235,255,0.45), transparent),
                  radial-gradient(3px 3px at 55% 13%, rgba(230,240,255,0.7), transparent),
                  radial-gradient(2.5px 2.5px at 61% 85%, rgba(220,235,255,0.35), transparent),
                  radial-gradient(2px 2px at 69% 32%, rgba(220,235,255,0.6), transparent),
                  radial-gradient(2.5px 2.5px at 75% 67%, rgba(220,235,255,0.5), transparent),
                  radial-gradient(3px 3px at 84% 9%, rgba(230,240,255,0.8), transparent),
                  radial-gradient(2px 2px at 91% 46%, rgba(220,235,255,0.55), transparent),
                  radial-gradient(2.5px 2.5px at 97% 74%, rgba(220,235,255,0.4), transparent);
              }
            `}</style>
          </div>
        )}
        {/* Slide counter — hidden for intro slides */}
        {slide.number > 0 && (
          <div className={`absolute top-8 right-10 text-sm font-mono ${navMode === 'space' ? 'text-blue-500/40' : navMode === 'legacy' ? 'text-red-500/40' : 'text-green-500/40'}`}>
            {slide.number} / {SLIDE_PAIRS.length}
          </div>
        )}

        {/* Problem number badge removed from here — now inline with headline */}

        {/* Full-screen intro visual (scattered nav — rendered outside content wrapper) */}
        {navMode === 'intro' && currentSlide === 1 && (
          <div key={`scatter-${slideKey}`} className="absolute inset-0 z-0 overflow-hidden">
            <IntroSlideVisual index={0} />
          </div>
        )}

        {/* Content */}
        <div
          key={slideKey}
          className={`max-w-[1400px] px-12 relative z-10 ${slide.layout === 'side' || slide.layout === 'side-right' || ((navMode === 'legacy' || navMode === 'new') && currentSlide > 0 && slide.phaseHeadlines && slide.phaseHeadlines.length > 1) ? '' : 'text-center'} ${contentAnimation}`}
          style={{
            '--slide-from': contentTransform,
            animation: isClosing ? undefined : 'slideContentIn 450ms cubic-bezier(0.16, 1, 0.3, 1) forwards',
          } as React.CSSProperties}
        >
          {slide.layout === 'side-right' ? (
            <div className="flex items-center gap-16">
              <div className="flex-1 min-w-0">
                <h1 className="font-bold leading-tight mb-8" style={{ color: '#ffffff', fontSize: '72px', lineHeight: 1.15, textWrap: 'balance' }}>
                  {slide.headline === '__purpose__' ? 'The purpose of this presentation' : slide.headline}
                </h1>
                {slide.subtext && (
                  <p className="text-[26px] text-neutral-400 leading-relaxed [text-wrap:balance]">
                    {slide.subtext}
                  </p>
                )}
              </div>
              <div className="shrink-0">
                {navMode === 'intro'
                  ? <IntroSlideVisual index={currentSlide - 1} noMargin />
                  : navMode === 'space'
                  ? <SpaceSlideVisual index={currentSlide - 1} noMargin />
                  : navMode === 'new'
                  ? <SlideVisual index={currentSlide - 1} mode="solution" noMargin phase={visualPhase} />
                  : <SlideVisual index={currentSlide - 1} mode="problem" noMargin phase={visualPhase} />
                }
              </div>
            </div>
          ) : slide.layout === 'side' ? (
            <div className="flex items-center gap-16">
              <div className="shrink-0">
                {navMode === 'intro'
                  ? <IntroSlideVisual index={currentSlide - 1} noMargin />
                  : navMode === 'space'
                  ? <SpaceSlideVisual index={currentSlide - 1} noMargin />
                  : navMode === 'new'
                  ? <SlideVisual index={currentSlide - 1} mode="solution" noMargin phase={visualPhase} />
                  : <SlideVisual index={currentSlide - 1} mode="problem" noMargin phase={visualPhase} />
                }
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="font-bold leading-tight mb-8" style={{ color: '#ffffff', fontSize: '72px', lineHeight: 1.15, textWrap: 'balance' }}>
                  {slide.headline === '__purpose__' ? 'The purpose of this presentation' : slide.headline}
                </h1>
                {slide.subtext && (
                  <p className="text-[26px] text-neutral-400 leading-relaxed [text-wrap:balance]">
                    {slide.subtext}
                  </p>
                )}
              </div>
            </div>
          ) : (navMode === 'legacy' || navMode === 'new') && currentSlide > 0 && slide.phaseHeadlines && slide.phaseHeadlines.length > 1 ? (
            /* Split layout for multi-phase problem/solution slides */
            <div className="flex items-center gap-14">
              {/* Left: full visual */}
              <div className="min-w-0 flex items-center justify-center" style={{ flex: '0 0 50%' }}>
                <div key={`visual-${getConsolidatedVisualKey(navMode === 'new' ? currentSlide - 2 : currentSlide - 1, visualPhase, navMode === 'new' ? 'solution' : 'problem')}`} style={{ animation: 'phaseIn 350ms cubic-bezier(0.16, 1, 0.3, 1) forwards' }}>
                  <ScaleToFit width={550} height={500}>
                    {navMode === 'new'
                      ? <SlideVisual index={currentSlide - 2} mode="solution" noMargin phase={visualPhase} />
                      : <SlideVisual index={currentSlide - 1} mode="problem" noMargin phase={visualPhase} />
                    }
                  </ScaleToFit>
                </div>
              </div>
              {/* Right: headline docked to top + building bullet list below */}
              <div className="min-w-0 flex flex-col justify-center" style={{ flex: '0 0 50%' }}>
                {navMode === 'legacy' && slide.number > 0 && (
                  <div
                    className="w-10 h-10 rounded-full border-2 flex items-center justify-center mb-5"
                    style={{ borderColor: 'rgba(248,113,113,0.5)', color: '#f87171' }}
                  >
                    <span className="text-[17px] font-bold tabular-nums">{slide.number}</span>
                  </div>
                )}
                <h1 className="font-bold leading-none" style={{ color: '#ffffff', fontSize: '72px', lineHeight: 1.0, textWrap: 'balance' }}>
                  {slide.headline}
                </h1>
                <ul className="flex flex-col gap-5 text-left mt-16">
                  {slide.phaseHeadlines!.map((headline, i) => {
                    const phaseCount = getConsolidatedPhaseCount(navMode === 'new' ? currentSlide - 2 : currentSlide - 1, navMode === 'new' ? 'solution' : 'problem');
                    const offset = phaseCount - slide.phaseHeadlines!.length;
                    const activeBullet = visualPhase - offset;
                    const isCurrent = i === activeBullet;
                    const isLegacy = navMode === 'legacy';
                    const activeText = isLegacy ? 'text-red-300' : 'text-green-300';
                    const dimText = isLegacy ? 'text-red-300/30' : 'text-green-300/30';
                    const activeDot = isLegacy ? 'bg-red-400' : 'bg-green-400';
                    const dimDot = isLegacy ? 'bg-red-400/30' : 'bg-green-400/30';
                    return (
                      <li
                        key={i}
                        className={`flex items-baseline gap-4 text-[28px] font-semibold leading-snug transition-colors duration-300 ${isCurrent ? activeText : dimText}`}
                      >
                        <span className={`shrink-0 w-2.5 h-2.5 rounded-full mt-[10px] transition-colors duration-300 ${isCurrent ? activeDot : dimDot}`} />
                        <span>{headline}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          ) : (
            <>
              {navMode === 'intro'
                ? (slide.headline === '__title_card__' ? null : currentSlide === 1 ? null : slide.headline === '__phases__' ? <PhasesVisual phase={visualPhase} /> : <IntroSlideVisual index={currentSlide - 1} phase={visualPhase} />)
                : (navMode === 'legacy' || navMode === 'new' || navMode === 'space') && currentSlide === 0
                ? <SectionTitleVisual mode={navMode} />
                : navMode === 'space'
                ? <SpaceSlideVisual index={currentSlide - 1} />
                : navMode === 'new' && slide.headline === '__solved_problems__'
                ? <SolvedProblemsVisual />
                : navMode === 'new'
                ? <SlideVisual index={currentSlide - 2} mode="solution" phase={visualPhase} />
                : <SlideVisual index={currentSlide - 1} mode="problem" phase={visualPhase} />
              }
              {slide.headline === '__title_card__' ? (
                <div className="flex flex-col items-center gap-1" style={{ fontFamily: 'Fields, system-ui, sans-serif' }}>
                  <div className="text-[42px] font-normal text-white/40">Let's talk about...</div>
                  <h1 className="font-bold" style={{ color: '#ffffff', fontSize: '90px', lineHeight: 1.0 }}>Information Architecture</h1>
                  <div className="text-[54px] font-normal text-white/40 mt-1">(and a few other global UX patterns)</div>
                  <div className="mt-20 flex flex-col items-center gap-3" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                    <img src={daveAvatar} alt="Dave Lesue" className="w-16 h-16 rounded-full object-cover object-top" />
                    <div className="flex flex-col items-center gap-0.5">
                      <div className="text-[32px] font-semibold text-white">Dave Lesue</div>
                      <div className="text-[22px] font-normal text-white/40">Sr. Product Design Director</div>
                    </div>
                  </div>
                </div>
              ) : slide.headline === '__purpose__' ? (
                <h1 className="font-bold leading-tight mb-8" style={{ color: '#ffffff', fontSize: '80px', lineHeight: 1.15, textWrap: 'balance' }}>
                  The purpose of this presentation
                </h1>
              ) : slide.headline === '__methodology__' ? (
                <h1 className="font-bold leading-tight mb-8" style={{ color: '#ffffff', fontSize: '80px', lineHeight: 1.15, textWrap: 'balance' }}>
                  How I approached this
                </h1>
              ) : slide.headline === '__solved_problems__' ? (
                <h1 className="font-bold leading-tight mb-8" style={{ color: '#ffffff', fontSize: '72px', lineHeight: 1.15, textWrap: 'balance' }}>
                  Good news!<br />These are solved problems.
                </h1>
              ) : slide.headline === '__phases__' ? (
                <h1 className="font-bold leading-tight mb-8" style={{ color: '#ffffff', fontSize: '80px', lineHeight: 1.15, textWrap: 'balance' }}>
                  {visualPhase === 0 ? 'Overhauling our IA would be a multi-phase effort.' : 'Today we\u2019re covering the first two.'}
                </h1>
              ) : (
                <h1 className="font-bold leading-tight mb-8" style={{ color: '#ffffff', fontSize: '80px', lineHeight: 1.15, textWrap: 'balance', whiteSpace: 'pre-line' }}>
                  {slide.headline}
                </h1>
              )}
              {slide.subtext && (
                <p className="text-[28px] text-neutral-400 leading-relaxed [text-wrap:balance]">
                  {slide.subtext}
                </p>
              )}
            </>
          )}
        </div>

        {/* Navigation dots with set bars */}
        <div className="absolute bottom-10 flex items-end gap-4">
          {(['intro', 'legacy', 'new', 'space'] as const).map((setMode) => {
            const setSlides = setMode === 'intro' ? INTRO_SET_SLIDES : setMode === 'legacy' ? PROBLEM_SLIDES : setMode === 'space' ? SPACE_SLIDES : SOLUTION_SLIDES;
            const setColor = setMode === 'intro' ? 'bg-white' : setMode === 'legacy' ? 'bg-red-400' : setMode === 'new' ? 'bg-green-400' : 'bg-blue-400';
            const isActiveSet = setMode === navMode;

            if (!isActiveSet) {
              // Inactive set: render as a single wide pill bar
              return (
                <button
                  key={setMode}
                  onClick={() => {
                    if (setMode !== 'intro') {
                      const stored = setMode === 'legacy' ? 'true' : setMode === 'space' ? 'space' : 'false';
                      localStorage.setItem(LEGACY_KEY, stored);
                      window.dispatchEvent(new Event('storage'));
                    }
                    chainingRef.current = true;
                    setNavMode(setMode);
                    setCurrentSlide(0);
                    setDirection('none');
                    setSlideKey(k => k + 1);
                    setVisualPhase(0);
                  }}
                  className={`${setColor} opacity-20 hover:opacity-40 transition-opacity rounded-full`}
                  style={{ width: Math.max(20, setSlides.length * 3.5), height: 8 }}
                />
              );
            }

            // Active set: render individual dots
            return (
              <div key={setMode} className="flex items-end gap-2">
                {setSlides.map((s, i) => {
                  const dimColor = setMode === 'intro' ? 'bg-white/30 hover:bg-white/50' : setMode === 'legacy' ? 'bg-red-400/30 hover:bg-red-400/50' : setMode === 'new' ? 'bg-green-400/30 hover:bg-green-400/50' : 'bg-blue-400/30 hover:bg-blue-400/50';

                  return (
                    <button
                      key={i}
                      onClick={() => {
                        setDirection(i > currentSlide ? 'right' : i < currentSlide ? 'left' : 'none');
                        setSlideKey(k => k + 1);
                        setCurrentSlide(i);
                      }}
                      className="flex flex-col items-center gap-1.5"
                    >
                      <div className={`w-2 h-2 rounded-full transition-colors ${
                        i === currentSlide ? setColor : dimColor
                      }`} />
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* BambooHR b logo */}
        <div className="absolute bottom-9 left-10">
          <svg width="72" height="57" viewBox="0 0 37 29.35" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.26601 0C7.24121 -0.00826622 7.22881 0.0206656 7.24534 0.0413311C10.3658 3.56274 12.6267 7.82398 13.7591 10.556C12.3291 9.02258 10.9651 7.4272 9.43589 6.36499C6.33193 4.19924 3.06264 3.1329 0.0247987 2.72785C0 2.72785 -0.0123993 2.75679 0.00826622 2.77332C7.4396 8.73326 5.70783 11.8496 15.4082 13.0813C15.4248 13.0813 15.4413 13.0648 15.433 13.0482C13.9988 8.62994 13.5318 5.35238 11.0974 2.74852C10.3328 1.93016 8.0761 0.281052 7.26601 0Z" fill="rgba(255,255,255,0.18)"/>
            <path d="M27.0471 9.29537C23.5257 9.29537 21.641 10.5022 20.3184 11.8166L19.9588 12.1968V0H16.9168V19.7025C16.9168 25.6418 21.4922 29.3451 26.7412 29.3451C32.5235 29.3451 36.9046 24.8937 36.9046 19.1735C36.9046 13.8625 32.3375 9.29537 27.0471 9.29537ZM26.7412 26.5263C22.9098 26.5263 19.6653 23.505 19.6653 19.4587C19.6653 15.4124 22.3973 12.0852 26.8074 12.0852C31.2174 12.0852 33.813 15.6521 33.813 19.3843C33.813 23.4471 31.0645 26.5263 26.7371 26.5263H26.7412Z" fill="rgba(255,255,255,0.18)"/>
          </svg>
        </div>

        {/* Arrow hints */}
        <div className="absolute bottom-10 right-10 flex gap-3 text-neutral-700 text-xs">
          <span>arrows to navigate</span>
          <span>space to close</span>
        </div>
      </div>
    </>
  );
}

export default ProblemSlides;
