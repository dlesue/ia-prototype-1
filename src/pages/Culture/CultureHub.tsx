import React from 'react';
import { HubHeader } from '../../components/HubHeader';

const metrics = [
  { label: "eNPS", value: "+42", trend: "up" as const, trendValue: "+5" },
  { label: "Recognition / Month", value: "847" },
  { label: "Engagement", value: "73%", ringPercent: 73 },
  { label: "Community DAU", value: "234" },
];

const insights = [
  { text: "eNPS improved 5 points this quarter" },
  { text: "Engineering team has low recognition activity" },
  { text: "October Wellbeing survey open \u2014 47% responded" },
];

const posts = [
  {
    author: "Maria Santos",
    role: "VP People",
    date: "Mar 11, 2026",
    content: "Excited to announce our Q1 All-Hands is happening this Friday at 10am PT! We\u2019ll be sharing company updates, celebrating Q1 wins, and hearing from each team lead. Join us in person or via Zoom. Link in your calendar invite.",
    likes: 42,
    hearts: 18,
    comments: 7,
  },
  {
    author: "Jordan Kim",
    role: "Sr. Product Designer",
    date: "Mar 10, 2026",
    content: "Please join me in welcoming Mei Zhang to the Product Design team! Mei is joining us from Figma and brings incredible expertise in design systems. She starts today \u2014 say hi if you see her around!",
    likes: 67,
    hearts: 34,
    comments: 12,
  },
  {
    author: "Alex Chen",
    role: "Director of Engineering",
    date: "Mar 9, 2026",
    content: "The Engineering team is hosting a rooftop happy hour this Thursday at 5pm. All employees welcome \u2014 food and drinks provided. Come celebrate the successful launch of Platform v3.0!",
    likes: 89,
    hearts: 22,
    comments: 15,
  },
];

function getInitials(name: string) {
  return name.split(" ").map(n => n[0]).join("").toUpperCase();
}

export default function CultureHub() {
  return (
    <div>
      <div className="px-6 pt-6">
        <h1 className="text-2xl font-bold text-[var(--text-neutral-xx-strong)]">Culture</h1>
      </div>
      <HubHeader product="Culture" metrics={metrics} insights={insights} />
      <div className="px-6 pb-6">
        <h2 className="text-lg font-semibold text-[var(--text-neutral-xx-strong)] mb-4">Community</h2>

        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-[var(--text-neutral-medium)] mt-0.5">Company announcements and employee posts</p>
          <button className="flex items-center gap-2 px-4 py-2 rounded-[var(--radius-xx-small)] text-sm font-medium text-white" style={{ background: "var(--color-primary-strong)" }}>
            New Post
          </button>
        </div>

        <div className="flex flex-col gap-4 max-w-2xl">
          {posts.map((p, i) => (
            <div key={i} className="bg-[var(--surface-neutral-white)] rounded-[var(--radius-medium)] border border-[var(--border-neutral-xx-weak)] p-5">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0" style={{ background: "var(--color-primary-strong)" }}>
                  {getInitials(p.author)}
                </div>
                <div>
                  <div className="text-sm font-semibold text-[var(--text-neutral-xx-strong)]">{p.author}</div>
                  <div className="text-xs text-[var(--text-neutral-medium)]">{p.role} &middot; {p.date}</div>
                </div>
              </div>
              <p className="text-sm text-[var(--text-neutral-x-strong)] leading-relaxed mb-3">{p.content}</p>
              <div className="flex items-center gap-4 pt-3 border-t border-[var(--border-neutral-xx-weak)]">
                <button className="flex items-center gap-1.5 text-xs text-[var(--text-neutral-medium)] hover:text-[var(--text-neutral-x-strong)] transition-colors">
                  <span>&#128077;</span> {p.likes}
                </button>
                <button className="flex items-center gap-1.5 text-xs text-[var(--text-neutral-medium)] hover:text-[var(--text-neutral-x-strong)] transition-colors">
                  <span>&#10084;&#65039;</span> {p.hearts}
                </button>
                <button className="flex items-center gap-1.5 text-xs text-[var(--text-neutral-medium)] hover:text-[var(--text-neutral-x-strong)] transition-colors">
                  <span>&#128172;</span> {p.comments} comments
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
