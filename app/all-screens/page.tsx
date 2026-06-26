"use client"

import React from "react"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] })

// ─── Constants ────────────────────────────────────────────────────────────────
const PHONE_W = 390
const PHONE_H = 844
const SCALE = 0.52
const CW = Math.round(PHONE_W * SCALE)
const CH = Math.round(PHONE_H * SCALE)
const CONTENT_W = 580

// ─── Types ────────────────────────────────────────────────────────────────────
interface Card {
  label: string
  text: string
  mono?: boolean
  light?: boolean
  dashed?: boolean
}

interface ScreenData {
  screenId: number
  index: number
  name: string
  goal: string
  problem: string
  cards: Card[]
  result: string
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const FLOW: { label: string; text: string }[] = [
  {
    label: "Problem",
    text: "Users cash out once.\nMost never come back.",
  },
  {
    label: "Insight",
    text: "There is no next goal after cashout.\nThe earning loop breaks at the highest point.",
  },
  {
    label: "Idea",
    text: "Give users a clear next goal\nbefore they close the app.",
  },
  {
    label: "Solution",
    text: "Progress map · Daily streak · Smart notification",
  },
  {
    label: "Expected result",
    text: "Better post-first-cashout retention.\nMore surveys completed per user.",
  },
]

const METRICS: { label: string; today: string; goal: string }[] = [
  { label: "Return after first cashout", today: "~20%", goal: "30%+" },
  { label: "Day-7 retention", today: "~14%", goal: "20%+" },
  { label: "Users who accept next goal", today: "No metric", goal: "35%+ tap rate" },
]

const SCREENS: ScreenData[] = [
  {
    screenId: 3,
    index: 1,
    name: "Home Dashboard",
    goal: "The first screen users see every day. The job is to get them from open to action in under ten seconds.",
    problem: "Users open the app but don't know where to start.\n\nToo many choices lead to no action. Most users scroll without tapping.",
    cards: [
      {
        label: "Design Decision",
        text: "Show one recommended survey at the top — not a list, not a grid. One clear thing to do next.",
      },
      {
        label: "Why It Helps",
        text: "When the next action is obvious, users take it. When it isn't, they leave.",
      },
      {
        label: "Design Decision",
        text: "The daily streak counter appears before anything else. People protect things they have already built. A broken streak feels like a loss.",
      },
      {
        label: "Why It Helps",
        text: "Users return daily not because of a new reward, but because they don't want to lose what they already have.",
      },
      {
        label: "Developer Note",
        text: "Cache the balance locally. Never show ₹0 while the API loads. Display the last known value.",
        mono: true,
      },
      {
        label: "Out of Scope",
        text: "Social features and referral improvements are left out of this version. The focus here is reducing the time from app open to first action.",
        light: true,
        dashed: true,
      },
    ],
    result: "Higher survey start rate within the first session.\nLower early drop-off.\nUsers spend less time deciding and more time earning.",
  },

  {
    screenId: 0,
    index: 2,
    name: "Cashout Success",
    goal: "The highest-value moment in the product. Most apps end the experience here. This design uses it as a starting point.",
    problem: "After a successful cashout, most users leave and don't return.\n\nThe app treats this as a final step. It should be a transition point.",
    cards: [
      {
        label: "Design Decision",
        text: "Show the exact amount withdrawn in large type. Not a generic success message. The money needs to feel real.",
      },
      {
        label: "Why It Helps",
        text: "When earnings feel tangible, users are more motivated to earn again. Vague confirmations don't create the same effect.",
      },
      {
        label: "Design Decision",
        text: "Present the next earning goal immediately — before the user has a chance to close the app.",
      },
      {
        label: "Why It Helps",
        text: "The moment after a win is the best time to set the next goal. The user is already engaged and feeling good about the app.",
      },
      {
        label: "Developer Note",
        text: "Animate the amount with spring physics. Duration 450ms. Do not replay the animation if the user navigates back.",
        mono: true,
      },
    ],
    result: "More users begin the next earning cycle immediately after cashout.\nImproved post-first-cashout retention.\nHigher Day-3 return rate.",
  },

  {
    screenId: 1,
    index: 3,
    name: "Next Earning Goal",
    goal: "Gives users a concrete target to work toward after cashout. Without this, there is no reason to return.",
    problem: "After cashout, users have nothing to aim at.\n\nThe app has no memory of what the user was working toward. Every session starts from zero.",
    cards: [
      {
        label: "Design Decision",
        text: "Show a visual milestone map with the next earning target. The gap between now and the goal is always visible.",
      },
      {
        label: "Why It Helps",
        text: "People work harder when they can see how close they are to a reward. A visible gap is more motivating than an abstract target.",
      },
      {
        label: "Design Decision",
        text: "The user taps to accept the goal. Accepting a specific target makes people more likely to follow through than a generic suggestion.",
      },
      {
        label: "Why It Helps",
        text: "A decision the user made themselves is harder to abandon than one the app made for them.",
      },
      {
        label: "Developer Note",
        text: "Animate milestones in sequence with a 150ms stagger. Store the accepted goal server-side, not just in local state.",
        mono: true,
      },
    ],
    result: "Higher Day-3 and Day-7 return rate.\nMore surveys completed in the session immediately after cashout.\nUsers always know what they are working toward.",
  },

  {
    screenId: 6,
    index: 4,
    name: "Rewards Progress",
    goal: "Makes small daily actions feel like they are building toward something real.",
    problem: "Completing a single survey feels pointless if users can't see it adding up.\n\nWithout visible progress, users lose motivation between sessions.",
    cards: [
      {
        label: "Design Decision",
        text: "A progress bar updates after every completed survey. The distance to the next milestone is always visible.",
      },
      {
        label: "Why It Helps",
        text: "Small visible progress keeps users going. The closer the next milestone appears, the more likely users are to complete one more survey.",
      },
      {
        label: "Design Decision",
        text: "Locked achievements are shown — not hidden. Seeing what comes next creates a reason to keep going.",
      },
      {
        label: "Why It Helps",
        text: "A goal you can see is more compelling than one described in text. The locked badge is the next goal made visual.",
      },
      {
        label: "Developer Note",
        text: "Update progress only after confirmed survey completion. Do not increment on attempt. Avoid inflating the metric.",
        mono: true,
      },
    ],
    result: "More surveys completed per session.\nHigher engagement on Days 3 to 7.\nUsers return to close the gap to the next milestone.",
  },

  {
    screenId: 2,
    index: 5,
    name: "Notification Center",
    goal: "Brings users back at the right moment — not just any moment.",
    problem: "Generic push notifications are ignored.\n\nUsers have trained themselves to dismiss 'Come back!' messages. Over-notification causes uninstalls.",
    cards: [
      {
        label: "Design Decision",
        text: "A notification is sent only when the user is close to a meaningful milestone — a cashout threshold, a streak at risk, a high-paying survey available.",
      },
      {
        label: "Why It Helps",
        text: "A message that feels timely and relevant gets tapped. A message that could have been sent any day gets dismissed.",
      },
      {
        label: "Design Decision",
        text: "The notification copy focuses on what the user stands to lose, not what they can gain. 'Your streak ends tonight' is more effective than 'Earn more today'.",
      },
      {
        label: "Developer Note",
        text: "Maximum one notification per day per user. Never send a notification unless a high-confidence trigger condition is met. No generic reminders.",
        mono: true,
      },
      {
        label: "Out of Scope",
        text: "Notification preferences and opt-out controls are part of the settings flow — not in scope here.",
        light: true,
        dashed: true,
      },
    ],
    result: "Higher notification tap rate.\nLower uninstall rate.\nUsers return at moments when they can make meaningful progress.",
  },

  {
    screenId: 5,
    index: 6,
    name: "Achievements",
    goal: "Gives users a reason to return that has nothing to do with money. Recognition is a separate and powerful motivator.",
    problem: "Consistent users churn at the same rate as new ones.\n\nThere is no acknowledgement for effort. Every session feels the same regardless of how much the user has done.",
    cards: [
      {
        label: "Design Decision",
        text: "Badges are awarded at meaningful milestones — not for every action. Rarity is what makes them worth having.",
      },
      {
        label: "Why It Helps",
        text: "Small surprise rewards make people want to return. Not for the badge itself, but for the feeling of being recognised after sustained effort.",
      },
      {
        label: "Design Decision",
        text: "Earned badges stay permanently visible. They remind users of what they have already built — and what they could lose by leaving.",
      },
      {
        label: "Developer Note",
        text: "Unlock events are evaluated server-side. Show badge unlock as a full-screen moment for high-tier badges. Do not use a toast.",
        mono: true,
      },
    ],
    result: "Higher 30-day retention among users who earn three or more badges.\nIncreased word-of-mouth referrals.\nStronger sense of identity as an active earner.",
  },

  {
    screenId: 7,
    index: 7,
    name: "Offer Details",
    goal: "The conversion screen. Users decide in under five seconds whether to start an offer.",
    problem: "Users preview offers and leave without starting.\n\nVague descriptions and unclear earning potential make the decision feel risky.",
    cards: [
      {
        label: "Design Decision",
        text: "The exact earning amount is the largest element on the screen. Steps and requirements appear below, not alongside.",
      },
      {
        label: "Why It Helps",
        text: "Users evaluate offers on earning potential first. Showing it clearly reduces hesitation. Burying it below description text causes drop-off.",
      },
      {
        label: "Design Decision",
        text: "Estimated time to complete is shown alongside the reward. Setting expectations reduces mid-offer abandonment.",
      },
      {
        label: "Design Decision",
        text: "The CTA button is fixed at the bottom and always visible — it never scrolls away.",
      },
      {
        label: "Developer Note",
        text: "CTA label includes the earning amount: 'Start · Earn ₹450'. Disable the button if the user has already started this offer in this session.",
        mono: true,
      },
    ],
    result: "Higher offer start rate.\nLower mid-offer abandonment.\nUsers know exactly what they are committing to before they tap.",
  },
]

// ─── Components ───────────────────────────────────────────────────────────────

function FlowStep({ step }: { step: { label: string; text: string } }) {
  return (
    <div style={{
      flex: 1,
      background: "#0F172A",
      border: "1px solid #1E293B",
      borderRadius: 8,
      padding: "20px 20px",
      minWidth: 0,
    }}>
      <div style={{
        fontSize: 9,
        fontWeight: 700,
        letterSpacing: "0.1em",
        textTransform: "uppercase" as const,
        color: "rgba(255,255,255,0.35)",
        marginBottom: 10,
      }}>
        {step.label}
      </div>
      <div style={{
        fontSize: 12,
        color: "rgba(255,255,255,0.85)",
        lineHeight: 1.7,
        whiteSpace: "pre-line" as const,
        fontWeight: 400,
      }}>
        {step.text}
      </div>
    </div>
  )
}

function MetricCard({ m }: { m: { label: string; today: string; goal: string } }) {
  return (
    <div style={{
      flex: 1,
      border: "1px solid #E5E7EB",
      borderRadius: 8,
      overflow: "hidden",
    }}>
      <div style={{
        padding: "14px 20px",
        borderBottom: "1px solid #E5E7EB",
        fontSize: 11,
        fontWeight: 600,
        color: "#6B7280",
      }}>
        {m.label}
      </div>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1, padding: "16px 20px", borderRight: "1px solid #E5E7EB" }}>
          <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#9CA3AF", marginBottom: 6 }}>
            Today
          </div>
          <div style={{ fontSize: 20, fontWeight: 700, color: "#0F172A" }}>{m.today}</div>
        </div>
        <div style={{ flex: 1, padding: "16px 20px", background: "#0F172A" }}>
          <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.35)", marginBottom: 6 }}>
            Goal
          </div>
          <div style={{ fontSize: 20, fontWeight: 700, color: "#FFFFFF" }}>{m.goal}</div>
        </div>
      </div>
    </div>
  )
}

function AnnotationCard({ card }: { card: Card }) {
  if (card.light) {
    return (
      <div style={{
        border: card.dashed ? "1px dashed #E5E7EB" : "1px solid #E5E7EB",
        borderRadius: 8,
        padding: "16px 20px",
        background: "#FAFAFA",
      }}>
        <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#9CA3AF", marginBottom: 8 }}>
          {card.label}
        </div>
        <div style={{ fontSize: 12, color: "#6B7280", lineHeight: 1.7, fontWeight: 400 }}>
          {card.text}
        </div>
      </div>
    )
  }

  return (
    <div style={{
      background: "#0F172A",
      border: "1px solid #1E293B",
      borderRadius: 8,
      padding: "18px 22px",
    }}>
      <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: card.mono ? "rgba(134,239,172,0.7)" : "rgba(255,255,255,0.35)", marginBottom: 10 }}>
        {card.label}
      </div>
      <div style={{
        fontSize: 12,
        color: "rgba(255,255,255,0.80)",
        lineHeight: 1.75,
        fontWeight: 400,
        fontFamily: card.mono ? "'SF Mono', 'Fira Code', 'Cascadia Code', monospace" : "inherit",
      }}>
        {card.text}
      </div>
    </div>
  )
}

function Arrow() {
  return (
    <div style={{ display: "flex", flexDirection: "column" as const, alignItems: "center", padding: "20px 0", gap: 0 }}>
      <div style={{ width: 1, height: 40, background: "#E5E7EB" }} />
      <svg width="8" height="6" viewBox="0 0 8 6" fill="none" style={{ marginTop: -1 }}>
        <path d="M4 6L0 0h8L4 6z" fill="#D1D5DB" />
      </svg>
    </div>
  )
}

function PhoneFrame({ screenId }: { screenId: number }) {
  return (
    <div style={{
      width: CW,
      height: CH,
      borderRadius: Math.round(52 * SCALE),
      background: "#000",
      overflow: "hidden",
      position: "relative" as const,
      flexShrink: 0,
      boxShadow: [
        "0 0 0 1px #1C1C1E",
        "0 0 0 6px #0A0A0A",
        "0 0 0 7px #2C2C2E",
        "0 32px 64px rgba(0,0,0,0.22)",
        "0 8px 16px rgba(0,0,0,0.12)",
      ].join(", "),
    }}>
      <div style={{ width: PHONE_W, height: PHONE_H, transform: `scale(${SCALE})`, transformOrigin: "top left" }}>
        <iframe
          src={`/prototype?screen=${screenId}`}
          width={PHONE_W}
          height={PHONE_H}
          style={{ border: "none", display: "block", pointerEvents: "none" }}
          title={`Screen ${screenId}`}
        />
      </div>
    </div>
  )
}

function ScreenSection({ s }: { s: ScreenData }) {
  const pairCards: Card[] = []
  const singleCards: Card[] = []

  s.cards.forEach((c) => {
    if (c.light || c.mono) singleCards.push(c)
    else pairCards.push(c)
  })

  const paired: [Card, Card | undefined][] = []
  for (let i = 0; i < pairCards.length; i += 2) {
    paired.push([pairCards[i], pairCards[i + 1]])
  }

  return (
    <section style={{ marginBottom: 0, paddingBottom: 100 }}>
      {/* Index + title */}
      <div style={{ marginBottom: 48 }}>
        <div style={{ fontSize: 11, color: "#CBD5E1", fontWeight: 600, letterSpacing: "0.06em", marginBottom: 10 }}>
          {String(s.index).padStart(2, "0")}
        </div>
        <h2 style={{ fontSize: 30, fontWeight: 700, color: "#0F172A", letterSpacing: "-0.025em", margin: "0 0 14px" }}>
          {s.name}
        </h2>
        <p style={{ fontSize: 14, color: "#64748B", fontWeight: 400, maxWidth: CONTENT_W, margin: 0, lineHeight: 1.7 }}>
          {s.goal}
        </p>
      </div>

      {/* Vertical stack */}
      <div style={{ display: "flex", flexDirection: "column" as const, alignItems: "center" }}>
        {/* Problem */}
        <div style={{ width: CONTENT_W }}>
          <AnnotationCard card={{ label: "Problem", text: s.problem }} />
        </div>

        <Arrow />

        {/* Phone */}
        <PhoneFrame screenId={s.screenId} />

        <Arrow />

        {/* Paired design cards */}
        <div style={{ width: CONTENT_W, display: "flex", flexDirection: "column" as const, gap: 10 }}>
          {paired.map(([a, b], i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: b ? "1fr 1fr" : "1fr", gap: 10 }}>
              <AnnotationCard card={a} />
              {b && <AnnotationCard card={b} />}
            </div>
          ))}
          {singleCards.map((c, i) => (
            <AnnotationCard key={i} card={c} />
          ))}
        </div>

        <Arrow />

        {/* Expected result */}
        <div style={{
          width: CONTENT_W,
          border: "1px solid #E5E7EB",
          borderRadius: 8,
          padding: "20px 24px",
          background: "#FAFAFA",
        }}>
          <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#9CA3AF", marginBottom: 10 }}>
            Expected Result
          </div>
          <div style={{ fontSize: 13, color: "#0F172A", lineHeight: 1.8, whiteSpace: "pre-line" as const, fontWeight: 400 }}>
            {s.result}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div style={{ width: "100%", height: 1, background: "#F1F5F9", marginTop: 100 }} />
    </section>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function CaseStudyPage() {
  return (
    <main className={inter.className} style={{ background: "#FFFFFF", minHeight: "100vh" }}>

      {/* Page header */}
      <header style={{ borderBottom: "1px solid #F1F5F9", padding: "80px 0 64px", textAlign: "center" }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#94A3B8", marginBottom: 20 }}>
          Product Case Study · Internal Review
        </div>
        <h1 style={{ fontSize: 42, fontWeight: 800, color: "#0F172A", letterSpacing: "-0.03em", margin: "0 0 16px" }}>
          MoneyHi
        </h1>
        <p style={{ fontSize: 16, color: "#64748B", fontWeight: 400, maxWidth: 520, margin: "0 auto 40px", lineHeight: 1.7 }}>
          A rewards app that helps users build a daily earning habit.
          This document explains the design decisions behind each screen.
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: 48 }}>
          {[
            { label: "Screens", value: `${SCREENS.length}` },
            { label: "Audience", value: "PM · Eng · Design" },
            { label: "Status", value: "Design Complete" },
          ].map((m) => (
            <div key={m.label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 22, fontWeight: 700, color: "#0F172A" }}>{m.value}</div>
              <div style={{ fontSize: 11, color: "#94A3B8", fontWeight: 600, marginTop: 4, letterSpacing: "0.04em" }}>{m.label}</div>
            </div>
          ))}
        </div>
      </header>

      <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 40px" }}>

        {/* Story flow */}
        <section style={{ padding: "80px 0 72px", borderBottom: "1px solid #F1F5F9" }}>
          <div style={{ marginBottom: 32 }}>
            <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#94A3B8", marginBottom: 10 }}>
              The Problem We Are Solving
            </div>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: "#0F172A", letterSpacing: "-0.02em", margin: 0 }}>
              Why users stop returning after their first cashout
            </h2>
          </div>
          <div style={{ display: "flex", alignItems: "stretch", gap: 4 }}>
            {FLOW.map((step, i) => (
              <React.Fragment key={i}>
                <FlowStep step={step} />
                {i < FLOW.length - 1 && (
                  <div style={{ display: "flex", alignItems: "center", flexShrink: 0, padding: "0 2px" }}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M1 6h10M7 2l4 4-4 4" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </section>

        {/* Success metrics */}
        <section style={{ padding: "72px 0", borderBottom: "1px solid #F1F5F9" }}>
          <div style={{ marginBottom: 32 }}>
            <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#94A3B8", marginBottom: 10 }}>
              Success Metrics
            </div>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: "#0F172A", letterSpacing: "-0.02em", margin: 0 }}>
              How we measure if it works
            </h2>
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            {METRICS.map((m, i) => <MetricCard key={i} m={m} />)}
          </div>
        </section>

        {/* Screen sections */}
        <div style={{ paddingTop: 80 }}>
          {SCREENS.map((s) => <ScreenSection key={s.screenId} s={s} />)}
        </div>

        {/* Footer */}
        <footer style={{ textAlign: "center", padding: "40px 0 80px", borderTop: "1px solid #F1F5F9" }}>
          <p style={{ fontSize: 12, color: "#CBD5E1", fontWeight: 500 }}>
            MoneyHi · Product Design Review · Prepared for internal use
          </p>
        </footer>
      </div>
    </main>
  )
}
