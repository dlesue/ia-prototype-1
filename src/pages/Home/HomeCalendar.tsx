import React, { useState } from 'react';
import { Icon } from '../../components/Icon';

const events = [
  { date: 3, type: 'holiday', label: 'Company Kickoff', color: '#f97316' },
  { date: 5, type: 'timeoff', label: 'Jordan Kim – PTO', color: '#22c55e' },
  { date: 6, type: 'timeoff', label: 'Jordan Kim – PTO', color: '#22c55e' },
  { date: 10, type: 'timeoff', label: 'Sarah Chen – PTO', color: '#22c55e' },
  { date: 11, type: 'timeoff', label: 'Sarah Chen – PTO', color: '#22c55e' },
  { date: 12, type: 'timeoff', label: 'Sarah Chen – PTO', color: '#22c55e' },
  { date: 14, type: 'holiday', label: 'Pi Day Celebration', color: '#f97316' },
  { date: 17, type: 'timeoff', label: 'Carlos Rivera – PTO', color: '#22c55e' },
  { date: 18, type: 'timeoff', label: 'Carlos Rivera – PTO', color: '#22c55e' },
  { date: 19, type: 'timeoff', label: 'Carlos Rivera – PTO', color: '#22c55e' },
  { date: 20, type: 'timeoff', label: 'Spring begins', color: '#f97316' },
  { date: 21, type: 'timeoff', label: 'Alex Chen – PTO', color: '#22c55e' },
  { date: 24, type: 'timeoff', label: 'Marcus Williams – PTO', color: '#22c55e' },
  { date: 25, type: 'timeoff', label: 'Marcus Williams – PTO', color: '#22c55e' },
  { date: 26, type: 'timeoff', label: 'Priya Patel – WFH', color: '#3b82f6' },
  { date: 31, type: 'holiday', label: 'Q1 End', color: '#f97316' },
];

const upcoming = [
  { date: 'Mar 14', label: 'Pi Day Celebration', type: 'Company Event', icon: 'face-smile' },
  { date: 'Mar 17', label: 'Carlos Rivera – PTO Start', type: 'Time Off', icon: 'calendar' },
  { date: 'Mar 17', label: 'Emma Thompson – First Day', type: 'New Hire', icon: 'user-group' },
  { date: 'Mar 20', label: 'Spring begins', type: 'Holiday', icon: 'star' },
  { date: 'Mar 24', label: 'Marcus Williams – PTO Start', type: 'Time Off', icon: 'calendar' },
  { date: 'Mar 31', label: 'Q1 All-Hands', type: 'Company Event', icon: 'bullhorn' },
];

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
// March 2026 starts on Sunday (day 0)
const startDay = 0;
const totalDays = 31;

export default function HomeCalendar() {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const getEventsForDay = (d: number) => events.filter(e => e.date === d);

  const cells: (number | null)[] = [];
  for (let i = 0; i < startDay; i++) cells.push(null);
  for (let i = 1; i <= totalDays; i++) cells.push(i);

  return (
    <div style={{ padding: 24 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 600, color: 'var(--text-neutral-xx-strong)', margin: 0 }}>Company Calendar</h1>
          <p style={{ fontSize: 13, color: 'var(--text-neutral-medium)', margin: '2px 0 0' }}>March 2026</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button style={{
            padding: '7px 14px', borderRadius: 'var(--radius-xx-small)',
            border: '1px solid var(--border-neutral-weak)', background: 'var(--surface-neutral-white)',
            color: 'var(--text-neutral-strong)', cursor: 'pointer', fontSize: 13,
          }}>← Feb</button>
          <button style={{
            padding: '7px 14px', borderRadius: 'var(--radius-xx-small)',
            border: '1px solid var(--border-neutral-weak)', background: 'var(--surface-neutral-white)',
            color: 'var(--text-neutral-strong)', cursor: 'pointer', fontSize: 13,
          }}>Apr →</button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 20 }}>
        {/* Calendar grid */}
        <div style={{ flex: 1 }}>
          <div style={{
            background: 'var(--surface-neutral-white)',
            border: '1px solid var(--border-neutral-weak)',
            borderRadius: 'var(--radius-small)',
            overflow: 'hidden',
          }}>
            {/* Day headers */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', background: 'var(--surface-neutral-x-weak)' }}>
              {days.map(d => (
                <div key={d} style={{
                  padding: '10px 8px', textAlign: 'center', fontSize: 11,
                  fontWeight: 600, color: 'var(--text-neutral-medium)',
                  textTransform: 'uppercase', letterSpacing: '0.04em',
                  borderBottom: '1px solid var(--border-neutral-weak)',
                }}>
                  {d}
                </div>
              ))}
            </div>
            {/* Calendar cells */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)' }}>
              {cells.map((day, idx) => {
                const dayEvents = day ? getEventsForDay(day) : [];
                const isToday = day === 11;
                const isSelected = day === selectedDay;
                return (
                  <div
                    key={idx}
                    onClick={() => day && setSelectedDay(day === selectedDay ? null : day)}
                    style={{
                      minHeight: 80, padding: '6px 8px',
                      borderRight: (idx + 1) % 7 === 0 ? 'none' : '1px solid var(--border-neutral-weak)',
                      borderBottom: '1px solid var(--border-neutral-weak)',
                      background: isSelected ? 'var(--color-primary-weak)' : 'transparent',
                      cursor: day ? 'pointer' : 'default',
                    }}
                  >
                    {day && (
                      <>
                        <div style={{
                          width: 24, height: 24, borderRadius: '50%',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: 12, fontWeight: isToday ? 700 : 400,
                          background: isToday ? 'var(--color-primary-strong)' : 'transparent',
                          color: isToday ? '#fff' : 'var(--text-neutral-xx-strong)',
                          marginBottom: 4,
                        }}>
                          {day}
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                          {dayEvents.slice(0, 2).map((ev, i) => (
                            <div key={i} style={{
                              fontSize: 10, padding: '1px 5px',
                              background: ev.color + '22',
                              color: ev.color,
                              borderRadius: 3,
                              fontWeight: 500,
                              whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                            }}>
                              {ev.label}
                            </div>
                          ))}
                          {dayEvents.length > 2 && (
                            <div style={{ fontSize: 10, color: 'var(--text-neutral-medium)' }}>
                              +{dayEvents.length - 2} more
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Legend */}
          <div style={{ display: 'flex', gap: 16, marginTop: 12 }}>
            {[
              { color: '#22c55e', label: 'Time Off' },
              { color: '#f97316', label: 'Company Events & Holidays' },
              { color: '#3b82f6', label: 'Remote / WFH' },
            ].map(l => (
              <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 10, height: 10, borderRadius: 2, background: l.color }} />
                <span style={{ fontSize: 12, color: 'var(--text-neutral-medium)' }}>{l.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div style={{ width: 240, flexShrink: 0 }}>
          <div style={{
            background: 'var(--surface-neutral-white)',
            border: '1px solid var(--border-neutral-weak)',
            borderRadius: 'var(--radius-small)',
            overflow: 'hidden',
          }}>
            <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-neutral-weak)' }}>
              <h3 style={{ margin: 0, fontSize: 13, fontWeight: 600, color: 'var(--text-neutral-xx-strong)' }}>
                Upcoming Events
              </h3>
            </div>
            <div style={{ padding: 8 }}>
              {upcoming.map((ev, i) => (
                <div key={i} style={{
                  display: 'flex', gap: 10, padding: '8px',
                  borderRadius: 'var(--radius-x-small)',
                  cursor: 'pointer',
                }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: 'var(--radius-x-small)', flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'var(--surface-neutral-x-weak)', color: 'var(--color-primary-strong)',
                  }}>
                    <Icon name={ev.icon as any} size={14} />
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <p style={{ margin: 0, fontSize: 12, fontWeight: 600, color: 'var(--text-neutral-xx-strong)' }}>
                      {ev.label}
                    </p>
                    <p style={{ margin: 0, fontSize: 11, color: 'var(--text-neutral-medium)' }}>
                      {ev.date} · {ev.type}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
