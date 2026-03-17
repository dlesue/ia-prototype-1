import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { SlideVisual, New2SlideVisual, SpaceSlideVisual } from './SlideVisuals';

type SlideLayout = 'center' | 'side';

interface Slide {
  number: number;
  headline: string;
  subtext?: string;
  layout?: SlideLayout;
}

const SLIDE_PAIRS: { problem: Omit<Slide, 'number'>; solution: Omit<Slide, 'number'>; layout?: SlideLayout }[] = [
  {
    problem: { headline: 'No shared internal taxonomy', subtext: `No common definition for product vs. module vs. feature \u2014 every trio is making it up.` },
    solution: { headline: 'Product, Module, Feature', subtext: `Three tiers. Products get a T1 and a hub. Modules get T2s. Features live inside modules.` },
  },
  {
    problem: { headline: 'No guidance on what belongs where', subtext: `No rulebook for placement \u2014 so new capabilities end up wherever feels right at the time.` },
    solution: { headline: 'A rulebook for placement', subtext: `Own pricing and workflows? Product. Major area within a product? Module. Everything else? Feature.` },
  },
  {
    problem: { headline: `First-class products don\u2019t have first-class nav presence`, subtext: `Customers pay to upgrade for Performance but can\u2019t find it \u2014 no T1, no hub, no front door.` },
    solution: { headline: 'Every product gets a front door', subtext: `Every product gets its own T1 nav item and hub page with direct access to every module inside it.` },
    layout: 'side',
  },
  {
    problem: { headline: 'Settings and the Employee Profile absorb the damage', subtext: `Homeless products bleed into Settings and the Employee Profile \u2014 which now carries 13+ tabs.` },
    solution: { headline: 'Products stop bleeding into Settings', subtext: `Product config lives in-product. Settings handles global config. The profile goes back to being a profile.` },
  },
  {
    problem: { headline: 'Unpurchased products are invisible', subtext: `No product in the nav means no discovery \u2014 usability testing confirmed customers can\u2019t find our upsell pages.` },
    solution: { headline: 'The nav becomes a storefront', subtext: `Locked products appear in the nav with a clear path to a dedicated upsell page.` },
    layout: 'side',
  },
  {
    problem: { headline: 'Split navigation creates a findability dead zone', subtext: `Two nav systems competing for attention \u2014 usability tests show people miss the header entirely.` },
    solution: { headline: 'One nav, everything in it', subtext: `Settings, Inbox, and Ask move into a single vertical nav. One place to look.` },
  },
  {
    problem: { headline: 'No guidance for the nav order', subtext: `No sequencing rules \u2014 teams place items wherever feels right, and the order gets more random over time.` },
    solution: { headline: 'A nav that follows the employee lifecycle', subtext: `Core HR at the top, cross-product tools at the bottom, and the employee lifecycle \u2014 hire to retire \u2014 in the middle.` },
    layout: 'side',
  },
  {
    problem: { headline: 'The screen real estate crisis', subtext: `Triple-stacked nav layers plus the Ask rail are eating the page \u2014 and we\u2019re not even responsive.` },
    solution: { headline: 'A nav that gets out of the way', subtext: `One two-tier vertical nav. No header bar. No sub-nav. No sub-sub-nav. Plenty of room for Ask and content.` },
  },
  {
    problem: { headline: 'Contextual settings require a scavenger hunt', subtext: `Changing a product\u2019s settings means leaving the product, navigating to Settings, and finding it again.` },
    solution: { headline: 'Settings, in context', subtext: `A gear icon on every product\u2019s nav item opens its settings in context.` },
  },
  {
    problem: { headline: 'No standard pattern for contextual reports', subtext: `Every product handles reports differently \u2014 a toolbar button here, a corner button there, nothing at all elsewhere.` },
    solution: { headline: 'Reports, in context', subtext: `Every hub gets a metrics bar with a link to contextual reports. Same pattern, every product.` },
  },
  {
    problem: { headline: 'No standard pattern for contextual AI assistance', subtext: `Ask can answer product-specific questions, but there\u2019s no in-product affordance \u2014 no point of ingress.` },
    solution: { headline: 'Ask, in context', subtext: `Every product gets a contextual Ask bar with product-specific suggestions built in.` },
  },
  {
    problem: { headline: 'No contextual pattern for surfacing insights', subtext: `No standard way to surface what matters \u2014 insights are buried in reports or missing entirely.` },
    solution: { headline: 'Insights, in context', subtext: `Every hub proactively surfaces what matters \u2014 same pattern, every product.` },
  },
  {
    problem: { headline: 'No contextual pattern for surfacing automations', subtext: `Users don\u2019t know what they can automate \u2014 no in-context suggestions, no discoverability.` },
    solution: { headline: 'Automations, in context', subtext: `Every hub suggests automations in context \u2014 one click to set up, same pattern, every product.` },
  },
];

const PROBLEM_SLIDES: Slide[] = SLIDE_PAIRS.map((pair, i) => ({ number: i + 1, layout: pair.layout, ...pair.problem }));
const SOLUTION_SLIDES: Slide[] = SLIDE_PAIRS.map((pair, i) => ({ number: i + 1, layout: pair.layout, ...pair.solution }));

// New 2 slides — the journey from New nav problems to research-driven IA
const NEW2_SLIDES: Slide[] = [
  { number: 1, headline: 'We solved some problems\u2026 but created new ones', subtext: 'Every product gets a front door now \u2014 but 15 products means a very long nav.', layout: 'side' },
  { number: 2, headline: 'This is a solved problem', subtext: 'Buyers, sellers, and CX teams already expect a certain structure. We don\u2019t need to invent one.' },
  { number: 3, headline: 'Deep research across the market', subtext: 'Four AI deep-research passes across every major HRIS/HCM competitor, then cross-checked for accuracy.' },
  { number: 4, headline: 'One aggregate IA', subtext: 'Compiled into a single consensus structure \u2014 the groupings and labels the market already uses.' },
];

// Space exploration slides
const SPACE_SLIDES: Slide[] = [
  { number: 1, headline: 'All of that is too little, too late.', subtext: 'Better navigation. Cleaner UI. Faster workflows. Right fixes \u2014 for 2022.' },
  { number: 2, headline: 'Claude Code can rebuild our product in a weekend. Now what?', subtext: 'Every feature we\u2019ve built over 15 years can now be replicated in an afternoon. The feature moat is gone.', layout: 'side' },
  { number: 3, headline: 'The solution isn\u2019t a better app. It\u2019s a better platform.', subtext: 'Consistent shell. Infinite surface area. Everyone\u2019s experience is different \u2014 but everyone speaks the same language.' },
  { number: 4, headline: 'BambooHR becomes the data layer AI runs on.', subtext: 'Own the graph. Define the framework. Let everything else \u2014 apps, AI, the market \u2014 build on top.' },
];

const LEGACY_KEY = 'bhr-legacy-nav';

type Direction = 'left' | 'right' | 'none';

export function ProblemSlides() {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState<Direction>('none');
  const [slideKey, setSlideKey] = useState(0);
  const [navMode, setNavMode] = useState(() => {
    const stored = localStorage.getItem(LEGACY_KEY);
    if (stored === 'true') return 'legacy';
    if (stored === 'new2') return 'new2';
    if (stored === 'space') return 'space';
    return 'new';
  });
  const closingTimeout = useRef<ReturnType<typeof setTimeout>>(undefined);

  // Sync nav mode from localStorage
  useEffect(() => {
    const handler = () => {
      const stored = localStorage.getItem(LEGACY_KEY);
      setNavMode(stored === 'true' ? 'legacy' : stored === 'new2' ? 'new2' : stored === 'space' ? 'space' : 'new');
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  const slides = navMode === 'legacy' ? PROBLEM_SLIDES : navMode === 'new2' ? NEW2_SLIDES : navMode === 'space' ? SPACE_SLIDES : SOLUTION_SLIDES;

  // Reset to first slide when switching nav modes
  useEffect(() => {
    setCurrentSlide(0);
  }, [navMode]);

  const close = useCallback(() => {
    setIsClosing(true);
    closingTimeout.current = setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 300);
  }, []);

  const navigate = useNavigate();

  const open = useCallback(() => {
    // Re-read nav mode on open to ensure it's current
    const stored = localStorage.getItem(LEGACY_KEY);
    setNavMode(stored === 'true' ? 'legacy' : stored === 'new2' ? 'new2' : stored === 'space' ? 'space' : 'new');
    setDirection('none');
    setSlideKey(k => k + 1);
    (document.activeElement as HTMLElement)?.blur();
    setIsOpen(true);
    setTimeout(() => navigate('/home'), 400);
  }, [navigate]);

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

    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      setCurrentSlide(prev => {
        const s = navMode === 'legacy' ? PROBLEM_SLIDES : navMode === 'new2' ? NEW2_SLIDES : navMode === 'space' ? SPACE_SLIDES : SOLUTION_SLIDES;
        if (prev >= s.length - 1) return prev;
        setDirection('right');
        setSlideKey(k => k + 1);
        return prev + 1;
      });
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      setCurrentSlide(prev => {
        if (prev <= 0) return prev;
        setDirection('left');
        setSlideKey(k => k + 1);
        return prev - 1;
      });
    } else if (e.key === 'Escape') {
      e.preventDefault();
      close();
    }
  }, [isOpen, isClosing, close, open, navMode]);

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
      `}</style>
      <div className={`fixed inset-0 z-[9999] bg-black/95 backdrop-blur-sm flex flex-col items-center justify-center select-none ${overlayAnimation}`}>
        {/* Slide counter */}
        <div className={`absolute top-8 right-10 text-sm font-mono ${navMode === 'space' ? 'text-blue-500/40' : navMode === 'new2' ? 'text-green-500/40' : 'text-amber-500/40'}`}>
          {slide.number} / {slides.length}
        </div>

        {/* Content */}
        <div
          key={slideKey}
          className={`max-w-[1200px] px-12 ${slide.layout === 'side' ? '' : 'text-center'} ${contentAnimation}`}
          style={{
            '--slide-from': contentTransform,
            animation: isClosing ? undefined : 'slideContentIn 450ms cubic-bezier(0.16, 1, 0.3, 1) forwards',
          } as React.CSSProperties}
        >
          {slide.layout === 'side' ? (
            <div className="flex items-center gap-16">
              <div className="shrink-0">
                {navMode === 'space'
                  ? <SpaceSlideVisual index={currentSlide} noMargin />
                  : navMode === 'new2'
                  ? <New2SlideVisual index={currentSlide} noMargin />
                  : <SlideVisual index={currentSlide} mode={navMode === 'legacy' ? 'problem' : 'solution'} noMargin />
                }
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="font-bold leading-tight mb-8" style={{ color: '#ffffff', fontSize: '72px', lineHeight: 1.15, textWrap: 'balance' }}>
                  {slide.headline}
                </h1>
                {slide.subtext && (
                  <p className="text-[26px] text-neutral-400 leading-relaxed [text-wrap:balance]">
                    {slide.subtext}
                  </p>
                )}
              </div>
            </div>
          ) : (
            <>
              {navMode === 'space'
                ? <SpaceSlideVisual index={currentSlide} />
                : navMode === 'new2'
                ? <New2SlideVisual index={currentSlide} />
                : <SlideVisual index={currentSlide} mode={navMode === 'legacy' ? 'problem' : 'solution'} />
              }
              <h1 className="font-bold leading-tight mb-8" style={{ color: '#ffffff', fontSize: '80px', lineHeight: 1.15, textWrap: 'balance' }}>
                {slide.headline}
              </h1>
              {slide.subtext && (
                <p className="text-[28px] text-neutral-400 leading-relaxed [text-wrap:balance]">
                  {slide.subtext}
                </p>
              )}
            </>
          )}
        </div>

        {/* Navigation dots */}
        <div className="absolute bottom-10 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > currentSlide ? 'right' : i < currentSlide ? 'left' : 'none');
                setSlideKey(k => k + 1);
                setCurrentSlide(i);
              }}
              className={`w-2 h-2 rounded-full transition-colors ${
                i === currentSlide ? (navMode === 'legacy' ? 'bg-red-400' : navMode === 'new2' ? 'bg-green-400' : navMode === 'space' ? 'bg-blue-400' : 'bg-amber-300') : 'bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
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
