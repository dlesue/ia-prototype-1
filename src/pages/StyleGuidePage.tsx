// @ts-nocheck
import { useState, useEffect } from 'react'
import { StyleGuide } from '@shared/StyleGuide.tsx'
import DocsStyleTab from '../components/DocsStyleTab/DocsStyleTab'

const STYLE_TAB_KEY = 'bhr-style-guide-tab';

export default function StyleGuidePage() {
  const [activeTab, setActiveTab] = useState(() => {
    const stored = localStorage.getItem(STYLE_TAB_KEY);
    if (stored === 'slides') return 'slides';
    if (stored === 'docs') return 'docs';
    return 'nav';
  });

  useEffect(() => {
    const handler = () => {
      const stored = localStorage.getItem(STYLE_TAB_KEY);
      if (stored === 'nav' || stored === 'slides' || stored === 'docs') {
        setActiveTab(stored);
      }
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  const handleTabChange = (tab) => {
    localStorage.setItem(STYLE_TAB_KEY, tab);
    setActiveTab(tab);
    window.dispatchEvent(new Event('storage'));
  };

  return <StyleGuide activeTab={activeTab} onTabChange={handleTabChange} docsTab={<DocsStyleTab />} />
}
