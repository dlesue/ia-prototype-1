import { useState, useRef, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Icon } from '../Icon';
import { recentConversations } from '../../data/chatData';
import type { ChatConversation, ChatMessage } from '../../data/chatData';
import MarkdownContent from '../MarkdownContent';
import { streamChatResponse } from '../../utils/openai';
import type { IconName } from '../Icon';

const HELP_ITEMS: { icon: IconName; label: string; desc: string }[] = [
  { icon: 'magnifying-glass', label: 'Help Center', desc: 'Search our video tutorials & help articles' },
  { icon: 'file-lines', label: 'Step-by-Step Guides', desc: 'Easily complete tasks within the software' },
  { icon: 'graduation-cap', label: 'Live & Self-Paced Learning', desc: 'Become a BambooHR expert' },
  { icon: 'envelope', label: 'Chat With Us', desc: 'Connect with our support team' },
  { icon: 'wrench', label: 'BambooHR Services', desc: 'Our paid services team is ready to help' },
  { icon: 'paper-plane', label: 'Submit a Support Request', desc: 'Email reply (slowest response)' },
  { icon: 'sparkles', label: 'Product Updates', desc: 'Experience the updated BambooHR' },
  { icon: 'compass', label: 'Do More With BambooHR', desc: 'Join events, explore add-ons, and more' },
];

const PRODUCT_SUGGESTIONS: Record<string, string[]> = {
  hiring: ['What roles are hardest to fill?', 'How is our candidate pipeline trending?', 'Show me time-to-hire by department'],
  payroll: ['When is the next payroll run?', 'How many timesheets are pending?', 'Show me payroll cost trends'],
  benefits: ['When does open enrollment close?', 'What is our HDHP adoption rate?', 'Show me cost per employee trends'],
  performance: ['How is Q1 review completion going?', 'Which teams have at-risk goals?', 'Show me 1:1 frequency trends'],
  compensation: ['How many employees are above band?', 'What is our average compa-ratio?', 'Show me pay equity by department'],
  training: ['Which certifications are expiring?', 'How many trainings are overdue?', 'Show me compliance rate by team'],
  onboarding: ['How many people are onboarding?', 'What tasks are overdue?', 'Show me 90-day attrition trends'],
  people: ['What is our current headcount?', 'Show me turnover trends', 'Who are the newest hires?'],
  culture: ['What is our current eNPS?', 'How is engagement trending?', 'Show me recognition activity'],
  'time-and-attendance': ['What is our PTO utilization?', 'How many requests are pending?', 'Show me overtime trends'],
  files: ['How many files are pending signature?', 'Show me storage usage', 'What docs were shared recently?'],
  reports: ['What are the most-viewed reports?', 'Show me headcount trends', 'Which reports were run last week?'],
  apps: ['Which integrations have errors?', 'How many apps are active?', 'Show me integration health'],
};

function getProductFromPath(pathname: string): string {
  const seg = pathname.split('/').filter(Boolean)[0] || 'home';
  return seg;
}

function getProductLabel(product: string): string {
  const labels: Record<string, string> = {
    hiring: 'Hiring', payroll: 'Payroll', benefits: 'Benefits', performance: 'Performance',
    compensation: 'Compensation', training: 'Training', onboarding: 'Onboarding',
    people: 'People', culture: 'Culture', 'time-and-attendance': 'Time & Attendance',
    files: 'Files', reports: 'Reports', apps: 'Apps', home: 'BambooHR',
    'employee-community': 'Employee Community', 'rewards-recognition': 'Rewards & Recognition',
    wellbeing: 'Wellbeing', settings: 'Settings',
  };
  return labels[product] || 'BambooHR';
}

function HelpCards() {
  return (
    <div className="space-y-3">
      <p className="text-[13px] font-semibold text-[var(--text-neutral-xx-strong)]">How can I help?</p>
      <div className="space-y-1.5">
        {HELP_ITEMS.map((item) => (
          <button
            key={item.label}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg border border-[var(--border-neutral-xx-weak)] bg-white hover:bg-[var(--surface-neutral-xx-weak)] hover:border-[var(--border-neutral-weak)] transition-colors text-left"
          >
            <div className="w-7 h-7 rounded-md bg-[var(--surface-neutral-xx-weak)] flex items-center justify-center shrink-0">
              <Icon name={item.icon} size={13} className="text-[var(--text-neutral-medium)]" />
            </div>
            <div className="min-w-0">
              <p className="text-[13px] font-medium text-[var(--text-neutral-xx-strong)] leading-tight">{item.label}</p>
              <p className="text-[11px] text-[var(--text-neutral-weak)] leading-tight mt-0.5">{item.desc}</p>
            </div>
          </button>
        ))}
      </div>
      <p className="text-[12px] text-[var(--text-neutral-weak)] mt-2">Or just ask me a question about anything in BambooHR.</p>
    </div>
  );
}

interface AIChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
  isExpanded: boolean;
  onExpandChange: (expanded: boolean) => void;
}

interface AutomationField {
  label: string;
  options: string[];
}

interface LocalMessage {
  id: string;
  type: 'user' | 'ai';
  text: string;
  suggestions?: string[];
  automationCard?: { name: string };
  automationForm?: { name: string; fields: AutomationField[] };
}

export function AIChatPanel({ isOpen, onClose }: AIChatPanelProps) {
  const location = useLocation();
  const chatNavigate = useNavigate();
  const [inputValue, setInputValue] = useState('');
  const [selectedConversation, setSelectedConversation] = useState<ChatConversation | null>(null);
  const [isBlankState, setIsBlankState] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [injectedMessages, setInjectedMessages] = useState<LocalMessage[]>([]);
  const [typingText, setTypingText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingRef = useRef<number | null>(null);
  const panelInputRef = useRef<HTMLTextAreaElement>(null);

  const sendToAI = useCallback((question: string, existingMessages: LocalMessage[]) => {
    setIsTyping(true);
    setTypingText('');

    streamChatResponse(
      question,
      (text) => setTypingText(text),
      (fullText) => {
        setIsTyping(false);
        setTypingText('');
        const aiMsg: LocalMessage = {
          id: `inj-ai-${Date.now()}`,
          type: 'ai',
          text: fullText,
        };
        setInjectedMessages(prev => [...prev, aiMsg]);
      },
      (error) => {
        setIsTyping(false);
        setTypingText('');
        const errMsg: LocalMessage = {
          id: `inj-ai-err-${Date.now()}`,
          type: 'ai',
          text: `Sorry, I encountered an error: ${error}`,
        };
        setInjectedMessages(prev => [...prev, errMsg]);
      },
    );
  }, []);

  const isInjectedMode = injectedMessages.length > 0;
  const messages = isInjectedMode ? [] : (selectedConversation?.messages ?? []);
  const firstText = injectedMessages[0]?.text;
  const currentProduct = getProductLabel(getProductFromPath(location.pathname));
  const title = isBlankState
    ? `Ask ${currentProduct}`
    : isInjectedMode
      ? (firstText === '__HELP__' ? 'Help' : firstText.slice(0, 40) + '...')
      : (selectedConversation?.title ?? `Ask ${currentProduct}`);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [injectedMessages, typingText, messages]);

  // Poll for insight payload from localStorage (question only — AI generates the response)
  const lastInsightTs = useRef<number>(0);
  useEffect(() => {
    const interval = setInterval(() => {
      const raw = localStorage.getItem('bhr-insight-payload');
      if (!raw) return;
      try {
        const { question, ts } = JSON.parse(raw);
        if (ts <= lastInsightTs.current) return;
        lastInsightTs.current = ts;
        localStorage.removeItem('bhr-insight-payload');

        const userMsg: LocalMessage = {
          id: `inj-user-${ts}`,
          type: 'user',
          text: question,
        };
        const newMessages = [userMsg];
        setInjectedMessages(newMessages);
        sendToAI(question, newMessages);
      } catch { /* ignore parse errors */ }
    }, 150);
    return () => clearInterval(interval);
  }, [sendToAI]);

  // Poll for help payload from nav help icon
  const lastHelpTs = useRef<number>(0);
  useEffect(() => {
    const interval = setInterval(() => {
      const raw = localStorage.getItem('bhr-help-payload');
      if (!raw) return;
      try {
        const { ts } = JSON.parse(raw);
        if (ts <= lastHelpTs.current) return;
        lastHelpTs.current = ts;
        localStorage.removeItem('bhr-help-payload');

        const helpMsg: LocalMessage = {
          id: `inj-ai-help-${ts}`,
          type: 'ai',
          text: '__HELP__',
        };
        setInjectedMessages([helpMsg]);
        setIsTyping(false);
        setTypingText('');
      } catch { /* ignore */ }
    }, 150);
    return () => clearInterval(interval);
  }, []);

  // Poll for ask payload from Hub Header (question only, no response)
  const lastAskTs = useRef<number>(0);
  useEffect(() => {
    const interval = setInterval(() => {
      const raw = localStorage.getItem('bhr-ask-payload');
      if (!raw) return;
      try {
        const { question, ts } = JSON.parse(raw);
        if (ts <= lastAskTs.current) return;
        lastAskTs.current = ts;
        localStorage.removeItem('bhr-ask-payload');

        // Clear any in-progress typing
        if (typingRef.current) {
          clearInterval(typingRef.current);
          typingRef.current = null;
        }

        const userMsg: LocalMessage = {
          id: `inj-user-${ts}`,
          type: 'user',
          text: question,
        };
        const newMessages = [userMsg];
        setInjectedMessages(newMessages);
        sendToAI(question, newMessages);
      } catch { /* ignore parse errors */ }
    }, 150);
    return () => clearInterval(interval);
  }, []);

  // Poll for ask-reset payload (blank state from Ask button toggle)
  const lastResetTs = useRef<number>(0);
  useEffect(() => {
    const interval = setInterval(() => {
      const raw = localStorage.getItem('bhr-ask-reset');
      if (!raw) return;
      try {
        const { ts } = JSON.parse(raw);
        if (ts <= lastResetTs.current) return;
        lastResetTs.current = ts;
        localStorage.removeItem('bhr-ask-reset');
        setInjectedMessages([]);
        setSelectedConversation(null);
        setIsTyping(false);
        setTypingText('');
        setIsBlankState(true);
      } catch { /* ignore */ }
    }, 150);
    return () => clearInterval(interval);
  }, []);

  // Poll for automation payload from Hub Header automation chips
  const lastAutomationTs = useRef<number>(0);
  useEffect(() => {
    const interval = setInterval(() => {
      const raw = localStorage.getItem('bhr-automation-payload');
      if (!raw) return;
      try {
        const { name, fields, ts } = JSON.parse(raw);
        if (ts <= lastAutomationTs.current) return;
        lastAutomationTs.current = ts;
        localStorage.removeItem('bhr-automation-payload');

        const userMsg: LocalMessage = {
          id: `inj-user-${ts}`,
          type: 'user',
          text: `Automate: ${name}`,
        };
        setInjectedMessages([userMsg]);
        setIsTyping(true);
        setTypingText('');

        setTimeout(() => {
          const aiFormMsg: LocalMessage = {
            id: `inj-ai-${ts}`,
            type: 'ai',
            text: `Let's set that up.`,
            automationForm: { name, fields },
          };
          setInjectedMessages([userMsg, aiFormMsg]);
          setIsTyping(false);
          setTypingText('');
        }, 1200);
      } catch { /* ignore parse errors */ }
    }, 150);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSend = () => {
    const text = inputValue.trim();
    if (!text) return;
    setInputValue('');
    setIsBlankState(false);

    const userMsg: LocalMessage = {
      id: `inj-user-${Date.now()}`,
      type: 'user',
      text,
    };
    const newMessages = [...injectedMessages, userMsg];
    setInjectedMessages(newMessages);
    setSelectedConversation(null);
    sendToAI(text, newMessages);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = Math.min(e.target.scrollHeight, 150) + 'px';
  };

  const handleSelectConversation = (conversation: ChatConversation) => {
    setSelectedConversation(conversation);
    setInjectedMessages([]);
    setTypingText('');
    setIsTyping(false);
    if (typingRef.current) {
      clearInterval(typingRef.current);
      typingRef.current = null;
    }
    setIsDropdownOpen(false);
  };

  const displayMessages = isInjectedMode ? injectedMessages : messages;

  return (
    <div className={`w-full h-full flex flex-col bg-white border-l border-[var(--border-neutral-xx-weak)] ${!isOpen ? 'invisible' : ''}`}>
      {/* Header */}
      <div className="relative shrink-0" ref={dropdownRef}>
        <div className="h-[52px] px-4 flex items-center justify-between border-b border-[var(--border-neutral-xx-weak)]">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity min-w-0"
          >
            <div className="w-5 h-5 flex items-center justify-center bg-[var(--color-primary-strong)] rounded-md shrink-0">
              <Icon name="sparkles" size={11} className="text-white" />
            </div>
            <span className="text-sm font-semibold text-[var(--text-neutral-xx-strong)] truncate">
              {title}
            </span>
            <Icon
              name="caret-down"
              size={9}
              className={`text-[var(--icon-neutral-medium)] transition-transform duration-200 shrink-0 ${isDropdownOpen ? 'rotate-180' : ''}`}
            />
          </button>
          <div className="flex items-center gap-1">
            <button
              className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-[var(--surface-neutral-xx-weak)] transition-colors"
              aria-label="New chat"
            >
              <Icon name="pen-to-square" size={14} className="text-[var(--icon-neutral-x-strong)]" />
            </button>
            <button
              className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-[var(--surface-neutral-xx-weak)] transition-colors"
              aria-label="Close"
              onClick={onClose}
            >
              <Icon name="xmark" size={14} className="text-[var(--icon-neutral-x-strong)]" />
            </button>
          </div>
        </div>

        {/* Dropdown */}
        {isDropdownOpen && (
          <div className="absolute top-full left-0 right-0 z-50 mx-2 mt-1 bg-white border border-[var(--border-neutral-weak)] rounded-lg shadow-lg overflow-hidden">
            {recentConversations.map((conversation) => (
              <button
                key={conversation.id}
                onClick={() => handleSelectConversation(conversation)}
                className={`
                  w-full px-4 py-2.5 text-left text-[13px]
                  hover:bg-[var(--surface-neutral-xx-weak)]
                  transition-colors duration-150
                  ${!isInjectedMode && conversation.id === selectedConversation.id
                    ? 'bg-[var(--surface-neutral-x-weak)] text-[var(--text-neutral-xx-strong)] font-medium'
                    : 'text-[var(--text-neutral-strong)]'
                  }
                `}
              >
                {conversation.title}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 min-h-0 overflow-y-auto">
        <div className="flex flex-col gap-5 p-4">
          {displayMessages.length === 0 && !isTyping && (() => {
            const product = getProductFromPath(location.pathname);
            const label = getProductLabel(product);
            const suggestions = PRODUCT_SUGGESTIONS[product] || PRODUCT_SUGGESTIONS['people'] || [];
            return (
              <div className="flex flex-col items-center justify-center text-center pt-16 px-6">
                <div className="w-10 h-10 flex items-center justify-center bg-[var(--color-primary-weak)] rounded-full mb-3">
                  <Icon name="sparkles" size={18} className="text-[var(--color-primary-strong)]" />
                </div>
                <p className="text-sm font-medium text-[var(--text-neutral-xx-strong)] mb-1">How can I help with {label}?</p>
                <p className="text-xs text-[var(--text-neutral-weak)] leading-relaxed mb-5">Ask questions, get insights, or explore your data.</p>
                {suggestions.length > 0 && (
                  <div className="flex flex-col gap-1.5 w-full">
                    {suggestions.map((s, i) => (
                      <button
                        key={i}
                        className="w-full px-3 py-2.5 text-left text-[12px] text-[var(--text-neutral-x-strong)] bg-[var(--surface-neutral-xx-weak)] border border-[var(--border-neutral-xx-weak)] rounded-lg hover:border-[var(--border-neutral-weak)] transition-colors"
                        onClick={() => {
                          setIsBlankState(false);
                          const userMsg: LocalMessage = { id: `inj-user-${Date.now()}`, type: 'user', text: s };
                          const newMessages = [...injectedMessages, userMsg];
                          setInjectedMessages(newMessages);
                          sendToAI(s, newMessages);
                        }}
                      >
                        <Icon name="sparkles" size={9} className="text-[var(--color-primary-medium)] mr-1.5 inline" />
                        {s}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })()}
          {displayMessages.map((message) => (
            <div key={message.id}>
              {message.type === 'user' ? (
                <div className="flex justify-end pl-8">
                  <div className="bg-[var(--surface-neutral-xx-weak)] px-3.5 py-2.5 rounded-2xl rounded-br-sm">
                    <p className="text-[13px] leading-[20px] text-[var(--text-neutral-x-strong)]">
                      {message.text}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex gap-2.5">
                  <div className="w-5 h-5 flex items-center justify-center bg-[var(--color-primary-strong)] rounded-full shrink-0 mt-0.5">
                    <Icon name="sparkles" size={10} className="text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    {message.text === '__HELP__' ? <HelpCards /> : <MarkdownContent text={message.text} />}
                    {message.automationForm && !message.automationCard && (
                      <div className="mt-2 rounded-xl border border-[var(--border-neutral-xx-weak)] bg-white overflow-hidden">
                        <div className="px-3.5 py-2.5 bg-[var(--surface-neutral-xx-weak)] border-b border-[var(--border-neutral-xx-weak)] flex items-center gap-2">
                          <Icon name="bolt" size={12} className="text-[var(--color-primary-medium)]" />
                          <p className="text-[12px] font-semibold text-[var(--text-neutral-x-strong)]">{message.automationForm.name}</p>
                        </div>
                        <div className="px-3.5 py-3 flex flex-col gap-2.5">
                          {message.automationForm.fields.map((field, fi) => (
                            <div key={fi}>
                              <label className="block text-[11px] font-medium text-[var(--text-neutral-weak)] mb-1">{field.label}</label>
                              <select className="w-full px-2.5 py-1.5 text-[12px] text-[var(--text-neutral-x-strong)] bg-[var(--surface-neutral-xx-weak)] border border-[var(--border-neutral-xx-weak)] rounded-lg outline-none focus:border-[var(--color-primary-medium)] transition-colors">
                                {field.options.map((opt, oi) => (
                                  <option key={oi}>{opt}</option>
                                ))}
                              </select>
                            </div>
                          ))}
                          <button
                            onClick={() => {
                              const name = message.automationForm!.name;
                              // Replace form message with typing, then show success + card
                              const userMsg = injectedMessages.find(m => m.type === 'user')!;
                              setInjectedMessages([userMsg]);
                              setIsTyping(true);
                              setTypingText('');
                              setTimeout(() => {
                                const aiSuccess: LocalMessage = {
                                  id: `inj-ai-done-${Date.now()}`,
                                  type: 'ai',
                                  text: `Done! I've created that automation for you. It's active now and will run automatically. You can edit, pause, or delete it anytime from your Automations page.`,
                                };
                                setInjectedMessages([userMsg, aiSuccess]);
                                setIsTyping(false);
                                setTimeout(() => {
                                  const aiWithCard: LocalMessage = {
                                    ...aiSuccess,
                                    automationCard: { name },
                                  };
                                  setInjectedMessages([userMsg, aiWithCard]);
                                }, 600);
                              }, 1500);
                            }}
                            className="mt-1 w-full py-2 rounded-lg bg-[var(--color-primary-medium)] hover:bg-[var(--color-primary-strong)] text-white text-[12px] font-medium transition-colors"
                          >
                            Create Automation
                          </button>
                        </div>
                      </div>
                    )}
                    {message.automationCard && (
                      <button
                        onClick={() => chatNavigate('/automations/0')}
                        className="mt-2 flex items-center gap-2.5 w-full px-3.5 py-3 rounded-xl border border-[var(--border-neutral-xx-weak)] bg-[var(--surface-neutral-xx-weak)] hover:border-[var(--border-neutral-weak)] hover:bg-[var(--surface-neutral-x-weak)] transition-colors text-left group"
                      >
                        <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-[var(--color-primary-medium)] text-white shrink-0">
                          <Icon name="bolt" size={14} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[13px] font-medium text-[var(--text-neutral-x-strong)] truncate">{message.automationCard.name}</p>
                          <p className="text-[11px] text-[var(--text-neutral-weak)]">View in Automations</p>
                        </div>
                        <Icon name="chevron-right" size={12} className="text-[var(--text-neutral-weak)] group-hover:text-[var(--text-neutral-medium)] transition-colors shrink-0" />
                      </button>
                    )}
                    {'suggestions' in message && (message as ChatMessage).suggestions && (message as ChatMessage).suggestions!.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {(message as ChatMessage).suggestions!.map((suggestion, index) => (
                          <button
                            key={index}
                            className="px-3 py-1.5 text-[12px] text-[var(--text-neutral-x-strong)] bg-[var(--surface-neutral-xx-weak)] border border-[var(--border-neutral-xx-weak)] rounded-full hover:bg-[var(--surface-neutral-x-weak)] transition-colors"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Typing indicator / in-progress response */}
          {isTyping && (
            <div className="flex gap-2.5">
              <div className="w-5 h-5 flex items-center justify-center bg-[var(--color-primary-strong)] rounded-full shrink-0 mt-0.5">
                <Icon name="sparkles" size={10} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                {typingText ? (
                  <MarkdownContent text={typingText} />
                ) : (
                  <div className="flex items-center gap-1 py-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--text-neutral-weak)] animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--text-neutral-weak)] animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--text-neutral-weak)] animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                )}
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="shrink-0 px-4 pb-4 pt-2">
        <div className="flex items-end gap-2 border border-[var(--border-neutral-weak)] rounded-xl px-3.5 py-2.5 bg-white focus-within:border-[var(--color-primary-medium)] transition-colors">
          <textarea
            ref={panelInputRef}
            placeholder="Ask anything..."
            value={inputValue}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            rows={1}
            className="flex-1 bg-transparent text-[13px] leading-[20px] text-[var(--text-neutral-strong)] placeholder:text-[var(--text-neutral-weak)] outline-none resize-none overflow-hidden"
          />
          <button
            onClick={handleSend}
            disabled={!inputValue.trim()}
            className="shrink-0 disabled:opacity-30 transition-opacity hover:opacity-70"
            aria-label="Send message"
          >
            <Icon name="circle-arrow-up" size={18} className="text-[var(--color-primary-strong)]" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default AIChatPanel;
