"use client"

import React from "react"

// ─── Design tokens ───────────────────────────────────────────────────────────
const C = {
  ux:         { bg: "#FFFBEB", border: "#F59E0B", tagBg: "#FEF3C7", tagColor: "#92400E", label: "UX Note" },
  dev:        { bg: "#EFF6FF", border: "#60A5FA", tagBg: "#DBEAFE", tagColor: "#1E40AF", label: "Dev Note" },
  product:    { bg: "#F0FDF4", border: "#4ADE80", tagBg: "#DCFCE7", tagColor: "#14532D", label: "Hypothesis" },
  psychology: { bg: "#F9FAFB", border: "#94A3B8", tagBg: "#F1F5F9", tagColor: "#334155", label: "Psychology" },
} as const
type NoteType = keyof typeof C

interface Annotation {
  type: NoteType
  emoji: string
  title: string
  body: string[]
  metric?: string
}

interface ScreenSection {
  screenId: number
  label: string
  description: string
  left: Annotation[]
  right: Annotation[]
  bottom?: Annotation[]
}

// ─── Case study data ─────────────────────────────────────────────────────────
const SECTIONS: ScreenSection[] = [
  {
    screenId: 3,
    label: "Home Dashboard · Home Tab",
    description: "The primary daily surface. Every element is placed to reduce friction and increase earning momentum.",
    left: [
      {
        type: "ux",
        emoji: "🔥",
        title: "Daily Streak",
        body: [
          "Purpose: Build a daily earning habit.",
          "Users who maintain a streak are 3× more likely to return on Day 7.",
          "The streak counter is placed at eye level, above the fold.",
        ],
        metric: "↑ Day-7 Retention",
      },
      {
        type: "ux",
        emoji: "🎯",
        title: "Recommended Survey Card",
        body: [
          "Problem: Users abandon when overwhelmed by too many choices.",
          "Solution: Surface only the single highest-paying, best-fit survey.",
          "Reduces cognitive load before the first action.",
        ],
        metric: "↑ Survey Completion Rate",
      },
      {
        type: "psychology",
        emoji: "🧠",
        title: "Loss Aversion",
        body: [
          "Behavioural Principle: Losses feel ~2× more painful than equivalent gains.",
          "A broken streak feels like losing something already owned.",
          "This motivates daily opens even without a pending reward.",
        ],
      },
    ],
    right: [
      {
        type: "dev",
        emoji: "💻",
        title: "Earnings Counter Animation",
        body: [
          "Use count-up animation on balance reveal.",
          "Duration: 600ms · Easing: ease-out cubic",
          "Cache balance locally — display last known value on network failure.",
          "Never show ₹0 if cached value exists.",
        ],
      },
      {
        type: "product",
        emoji: "📈",
        title: "Hypothesis · DAU Growth",
        body: [
          "Introducing Daily Missions + visible streak may increase Day-7 retention by ~25–35%.",
          "Users with an active streak are significantly less likely to churn.",
        ],
        metric: "↑ DAU · ↑ Return Sessions",
      },
      {
        type: "dev",
        emoji: "💻",
        title: "Streak Update Logic",
        body: [
          "Increment streak only after a survey is completed — not on app open.",
          "Prevents streak inflation and maintains perceived value.",
          "Persist via API + local cache for offline resilience.",
        ],
      },
    ],
    bottom: [
      {
        type: "ux",
        emoji: "📐",
        title: "Typography Hierarchy",
        body: [
          "Three levels: Hero balance (28px black) → Section label (11px uppercase) → Body (13px medium).",
          "Consistent hierarchy reduces time to scan and locate relevant information.",
        ],
      },
      {
        type: "ux",
        emoji: "🎨",
        title: "Gold Reserved for Reward Moments",
        body: [
          "The gold/amber colour is used exclusively for earnings, coins, and reward milestones.",
          "Overuse would dilute its signal value. Every other accent is purple.",
        ],
      },
    ],
  },

  {
    screenId: 0,
    label: "Cashout Success",
    description: "A deliberate celebration moment. The design signals that a real-world outcome has occurred.",
    left: [
      {
        type: "ux",
        emoji: "🎉",
        title: "Celebration Design Rationale",
        body: [
          "Purpose: Reinforce the positive earning loop at its emotional peak.",
          "Users are most open to goal-setting immediately after a successful cashout.",
          "This is the best moment to present the 'next goal' prompt.",
        ],
        metric: "↑ Time to Second Cashout",
      },
      {
        type: "psychology",
        emoji: "🧠",
        title: "Endowment Effect",
        body: [
          "Users place higher value on earnings already 'received'.",
          "The withdrawal confirmation makes the money feel real.",
          "Triggers motivation to begin the next earning cycle immediately.",
        ],
      },
    ],
    right: [
      {
        type: "dev",
        emoji: "💻",
        title: "Success Screen Animation",
        body: [
          "Amount reveal: spring physics, stiffness 200, damping 20.",
          "Duration: 450ms · Ease: cubic-bezier(0.16, 1, 0.3, 1)",
          "Do NOT play if user has already seen this screen in the same session.",
        ],
      },
      {
        type: "product",
        emoji: "📈",
        title: "Hypothesis · Repeat Cashout",
        body: [
          "Showing a post-cashout celebration + progress summary will reduce the gap to a user's second cashout.",
          "Contextual 'next goal' CTA increases goal acceptance rate.",
        ],
        metric: "↑ Survey Completions After Cashout",
      },
    ],
  },

  {
    screenId: 1,
    label: "Next Goal Roadmap",
    description: "Presented immediately after cashout. Commits the user to the next earning milestone before they leave the app.",
    left: [
      {
        type: "ux",
        emoji: "🗺️",
        title: "Commitment Prompt Design",
        body: [
          "Users who accept a specific earning goal are significantly more likely to return.",
          "The roadmap is presented as a visual journey, not a list.",
          "Visual progress creates a sense of existing investment.",
        ],
        metric: "↑ Day-3 Return Rate",
      },
      {
        type: "psychology",
        emoji: "🧠",
        title: "Commitment Effect",
        body: [
          "Explicitly accepting a goal creates psychological commitment.",
          "Users feel cognitive dissonance if they don't follow through.",
          "Paired with the Goal Gradient Effect: effort increases as users approach a target.",
        ],
      },
    ],
    right: [
      {
        type: "dev",
        emoji: "💻",
        title: "Progress Journey Animation",
        body: [
          "Milestones animate in sequentially with 150ms stagger delay.",
          "Completed nodes: filled gold · In-progress: purple ring · Locked: grey.",
          "Do not animate on back-navigation — resume at current state.",
        ],
      },
      {
        type: "product",
        emoji: "📈",
        title: "Hypothesis · Completion Rate",
        body: [
          "Users who accept a next goal immediately after cashout will complete their next survey within 24 hours at a higher rate.",
          "Reduces churn between earning cycles.",
        ],
        metric: "↑ Next-Session Survey Completion",
      },
    ],
  },

  {
    screenId: 6,
    label: "Home · Rewards Progress Tab",
    description: "Visualises progress toward the next reward tier. Designed to leverage the Goal Gradient Effect.",
    left: [
      {
        type: "ux",
        emoji: "📊",
        title: "Progress Bar Placement",
        body: [
          "Problem: Users don't know how close they are to the next reward.",
          "Solution: Show a persistent visual progress bar after every completed survey.",
          "Placed prominently so users understand incremental progress.",
        ],
        metric: "↑ Surveys Per Session",
      },
      {
        type: "ux",
        emoji: "🏆",
        title: "Achievement Badge Design",
        body: [
          "Badges celebrate meaningful milestones, not trivial actions.",
          "Locked badges are visible to create aspiration without frustration.",
          "Small recognition moments increase motivation without overwhelming.",
        ],
      },
      {
        type: "psychology",
        emoji: "🧠",
        title: "Goal Gradient Effect",
        body: [
          "Users accelerate effort as they approach a reward.",
          "The closer the next milestone appears, the more surveys users complete per session.",
          "Progress bar is most effective when showing ≥ 60% completion.",
        ],
      },
    ],
    right: [
      {
        type: "dev",
        emoji: "💻",
        title: "Progress Bar Update",
        body: [
          "Update progress only after confirmed survey completion — not on attempt.",
          "Use smooth transition: 900ms ease-in-out.",
          "If progress crosses a tier boundary, trigger a milestone celebration state.",
        ],
      },
      {
        type: "product",
        emoji: "📈",
        title: "Hypothesis · Session Depth",
        body: [
          "Visible incremental progress after each survey will increase the average number of surveys completed per session.",
          "Mirrors Starbucks rewards card effect (pre-stamped cards increase completion).",
        ],
        metric: "↑ Surveys/Session · ↑ Time in App",
      },
    ],
  },

  {
    screenId: 2,
    label: "Notification Center",
    description: "Designed for context-aware re-engagement. Notifications should feel meaningful, not spammy.",
    left: [
      {
        type: "ux",
        emoji: "📲",
        title: "Smart Notification Logic",
        body: [
          "Notifications trigger only when actionable progress is available.",
          "Example: 'You're ₹40 away from your next cashout.'",
          "Generic 'Come back!' messages are disabled by design.",
        ],
        metric: "↑ Return Sessions",
      },
      {
        type: "ux",
        emoji: "🔔",
        title: "Notification Grouping",
        body: [
          "NEW vs EARLIER separation reduces notification overwhelm.",
          "Users process new items first without scanning the full history.",
          "Read vs unread state managed server-side for cross-device consistency.",
        ],
      },
    ],
    right: [
      {
        type: "dev",
        emoji: "💻",
        title: "Notification Trigger Rules",
        body: [
          "Only trigger when: high-confidence survey available OR user is within 20% of cashout threshold.",
          "Max 1 notification per day per user.",
          "Respect OS-level notification permissions — never prompt more than twice.",
        ],
      },
      {
        type: "product",
        emoji: "📈",
        title: "Hypothesis · Re-engagement",
        body: [
          "Context-aware notifications (milestone proximity) will outperform generic push by 2–3× in CTR.",
          "Over-notification increases uninstall rate — frequency capped deliberately.",
        ],
        metric: "↑ Push CTR · ↓ Uninstall Rate",
      },
      {
        type: "psychology",
        emoji: "🧠",
        title: "Loss Aversion",
        body: [
          "Framing: 'Your streak ends tonight' performs better than 'Open the app today.'",
          "Users respond more strongly to protecting existing progress than gaining new rewards.",
        ],
      },
    ],
  },

  {
    screenId: 5,
    label: "Achievements",
    description: "A motivation layer that rewards meaningful milestones — not every tap. Rarity increases perceived value.",
    left: [
      {
        type: "ux",
        emoji: "🏅",
        title: "Achievement Ladder Design",
        body: [
          "Badges are grouped by tier to signal progression, not just collection.",
          "Locked badges are shown to create aspiration.",
          "Completed badges remain visible — reinforces identity as an active earner.",
        ],
      },
      {
        type: "psychology",
        emoji: "🧠",
        title: "Variable Reward System",
        body: [
          "Unpredictable reward timing (not every survey = badge) increases engagement.",
          "Mirrors slot-machine psychology — but for positive earning behaviour.",
          "Badge rarity increases perceived value of each award.",
        ],
      },
    ],
    right: [
      {
        type: "dev",
        emoji: "💻",
        title: "Badge Unlock State",
        body: [
          "Unlock event triggers server-side after qualifying action.",
          "Client polls on app focus (not on a timer) to display new badge.",
          "Display badge unlock as a full-screen moment (not a toast) for high-tier badges.",
        ],
      },
      {
        type: "product",
        emoji: "📈",
        title: "Hypothesis · Identity Effect",
        body: [
          "Users who unlock 3+ badges within the first week have 4× higher 30-day retention.",
          "Achievement screens increase app sharing and word-of-mouth referrals.",
        ],
        metric: "↑ 30-Day Retention · ↑ Referral Rate",
      },
    ],
  },

  {
    screenId: 7,
    label: "Offer Details",
    description: "The conversion screen. Clarity and trust are the primary design goals.",
    left: [
      {
        type: "ux",
        emoji: "💰",
        title: "Earning Potential — Above Fold",
        body: [
          "The reward amount is the largest typographic element on the screen.",
          "Users evaluate offers in under 3 seconds — clarity wins over description.",
          "Steps/requirements shown below the fold to not delay CTA engagement.",
        ],
        metric: "↑ Offer Start Rate",
      },
      {
        type: "ux",
        emoji: "🛡️",
        title: "Trust Signals",
        body: [
          "Offer provider name + category displayed prominently.",
          "Estimated completion time shown — sets expectations and reduces drop-off.",
          "Real earnings displayed — no vague 'earn up to' language.",
        ],
      },
    ],
    right: [
      {
        type: "dev",
        emoji: "💻",
        title: "Sticky CTA Footer",
        body: [
          "CTA button remains fixed at bottom viewport regardless of scroll depth.",
          "Button label dynamically shows earning amount: 'Start · Earn ₹450'",
          "Disabled state shown if user has already started this offer.",
        ],
      },
      {
        type: "product",
        emoji: "📈",
        title: "Hypothesis · Start Rate",
        body: [
          "Showing exact earnings + estimated time above the fold will increase offer start rate.",
          "Vague descriptions increase 'preview and exit' behaviour — specificity reduces it.",
        ],
        metric: "↑ Offer Start Rate · ↑ Completion Rate",
      },
    ],
  },

  {
    screenId: 8,
    label: "Home · Wallet Tab",
    description: "The financial trust layer. Users need to feel their money is safe and accessible.",
    left: [
      {
        type: "ux",
        emoji: "💳",
        title: "Balance Clarity First",
        body: [
          "Withdrawable balance is the primary element — shown in the largest type size.",
          "Pending balance shown separately to set realistic expectations.",
          "UPI last-4 digits displayed for trust — users know where money goes.",
        ],
      },
      {
        type: "ux",
        emoji: "📜",
        title: "Transaction History",
        body: [
          "Recent transactions visible without navigating away from the wallet tab.",
          "Each item shows exact amount, time, and source.",
          "Negative transactions (withdrawals) styled differently to aid scanning.",
        ],
      },
    ],
    right: [
      {
        type: "dev",
        emoji: "💻",
        title: "Balance Display",
        body: [
          "Always fetch fresh balance on tab focus — never use stale cache.",
          "Show skeleton while loading. Never flash ₹0 before data loads.",
          "Withdrawal initiated state: immediately disable button and show 'Processing...'",
        ],
      },
      {
        type: "product",
        emoji: "📈",
        title: "Hypothesis · Trust & Frequency",
        body: [
          "Users who successfully withdraw once are 5× more likely to complete additional surveys.",
          "First successful cashout is the most important retention moment in the product.",
        ],
        metric: "↑ Post-Withdrawal Survey Completion",
      },
    ],
  },

  {
    screenId: 4,
    label: "Home · Profile Tab",
    description: "Social proof, referral mechanics, and user identity. Encourages growth through community.",
    left: [
      {
        type: "ux",
        emoji: "👥",
        title: "Refer & Earn Design",
        body: [
          "Referral code is copy-friendly — one tap, confirmed with visual feedback.",
          "Progress shown: '3 of 10 active friends' — creates a clear sub-goal.",
          "Bonus unlocks at milestone — creates urgency through visible target.",
        ],
        metric: "↑ Referral Rate",
      },
      {
        type: "psychology",
        emoji: "🧠",
        title: "Social Proof",
        body: [
          "Leaderboard shows real earning rankings among referred friends.",
          "Seeing peers earn motivates lagging users to engage more.",
          "Framed as community, not competition.",
        ],
      },
    ],
    right: [
      {
        type: "dev",
        emoji: "💻",
        title: "Referral Tracking",
        body: [
          "Referral attribution: track install source via dynamic link (e.g. Branch.io).",
          "'Active' = referred user has completed ≥ 1 survey in the last 30 days.",
          "Bonus credited within 24h of the 10th active referral — show pending state.",
        ],
      },
      {
        type: "product",
        emoji: "📈",
        title: "Hypothesis · Viral Growth",
        body: [
          "A ₹200 bonus at 10 referrals creates a meaningful incentive without making unit economics unsustainable.",
          "Each referral-driven install has 2× LTV of organic installs.",
        ],
        metric: "↑ K-Factor · ↑ CAC Efficiency",
      },
    ],
  },

  {
    screenId: 9,
    label: "Empty State · All Caught Up",
    description: "Zero states are product moments, not dead ends. Every empty state has a clear next action.",
    left: [
      {
        type: "ux",
        emoji: "📭",
        title: "Empty State Design Principles",
        body: [
          "Icon reinforces the context (not a generic 'no data' illustration).",
          "Message is positive and forward-looking — never 'No items found'.",
          "Primary CTA drives users to the highest-value next action.",
        ],
      },
    ],
    right: [
      {
        type: "dev",
        emoji: "💻",
        title: "Empty State Trigger",
        body: [
          "Show only after confirmed empty API response — never on load.",
          "Use skeleton screen during fetch to avoid false empty flashes.",
          "CTA links directly to the relevant feature, not the home tab.",
        ],
      },
    ],
  },

  {
    screenId: 12,
    label: "Loading Skeleton",
    description: "Perceived performance is as important as actual performance. Skeleton screens set the right expectation.",
    left: [
      {
        type: "ux",
        emoji: "⚡",
        title: "Skeleton Over Spinner",
        body: [
          "Skeleton screens feel 20% faster than spinners because they show structure immediately.",
          "Users understand where content will appear — reduces perceived wait time.",
          "Skeleton layout matches the real content layout exactly.",
        ],
      },
    ],
    right: [
      {
        type: "dev",
        emoji: "💻",
        title: "Skeleton Implementation",
        body: [
          "Minimum display: 300ms — avoid flash if API responds instantly.",
          "Maximum display: 6s — then show error state with retry.",
          "Animate shimmer pulse at 1.5s cycle to signal active loading.",
        ],
      },
    ],
  },

  {
    screenId: 13,
    label: "Error · Network Failure",
    description: "Errors are trust moments. Clear cause + clear recovery action prevents churn.",
    left: [
      {
        type: "ux",
        emoji: "⚠️",
        title: "Error State Design",
        body: [
          "Error message explains WHAT happened and WHAT to do — not an error code.",
          "Primary action: Retry. Secondary action: Go Home.",
          "Tone is calm and helpful — never blames the user.",
        ],
      },
    ],
    right: [
      {
        type: "dev",
        emoji: "💻",
        title: "Retry Logic",
        body: [
          "Auto-retry once silently on network error before showing the error screen.",
          "Exponential backoff: 1s → 2s → 4s.",
          "Preserve in-progress state (survey progress, form data) across retries.",
        ],
      },
      {
        type: "product",
        emoji: "📈",
        title: "Hypothesis · Trust Recovery",
        body: [
          "Clear, actionable error screens with retry reduce churn at failure points by ~40%.",
          "Users who successfully retry and recover have higher trust scores.",
        ],
        metric: "↓ Churn at Error · ↑ Recovery Rate",
      },
    ],
  },
]

// ─── Phone shell constant ────────────────────────────────────────────────────
const PHONE_W = 390
const PHONE_H = 844
const SCALE = 0.48
const CW = Math.round(PHONE_W * SCALE)
const CH = Math.round(PHONE_H * SCALE)

// ─── Components ──────────────────────────────────────────────────────────────
function Tag({ type }: { type: NoteType }) {
  const col = C[type]
  return (
    <span style={{
      display: "inline-block",
      fontSize: 9,
      fontWeight: 800,
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      color: col.tagColor,
      background: col.tagBg,
      border: `1px solid ${col.border}`,
      borderRadius: 4,
      padding: "2px 6px",
      marginBottom: 8,
    }}>
      {col.label}
    </span>
  )
}

function Note({ a, side }: { a: Annotation; side: "left" | "right" }) {
  const col = C[a.type]
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 0 }}>
      {side === "right" && (
        <div style={{ display: "flex", alignItems: "center", alignSelf: "center", flexShrink: 0, marginRight: -1 }}>
          <div style={{ width: 24, height: 1, background: col.border }} />
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: col.border, flexShrink: 0 }} />
        </div>
      )}
      <div style={{
        background: col.bg,
        border: `1px solid ${col.border}`,
        borderRadius: 10,
        padding: "14px 16px",
        width: 224,
        flexShrink: 0,
        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
      }}>
        <Tag type={a.type} />
        <div style={{ fontSize: 12, fontWeight: 800, color: "#0F172A", marginBottom: 8, lineHeight: 1.3 }}>
          {a.emoji} {a.title}
        </div>
        {a.body.map((line, i) => (
          <p key={i} style={{
            fontSize: 11,
            color: "#475569",
            lineHeight: 1.6,
            margin: "0 0 4px",
            fontWeight: 500,
          }}>
            {line}
          </p>
        ))}
        {a.metric && (
          <div style={{
            marginTop: 10,
            paddingTop: 8,
            borderTop: `1px solid ${col.border}`,
            fontSize: 10,
            fontWeight: 800,
            color: col.tagColor,
            letterSpacing: "0.02em",
          }}>
            {a.metric}
          </div>
        )}
      </div>
      {side === "left" && (
        <div style={{ display: "flex", alignItems: "center", alignSelf: "center", flexShrink: 0, marginLeft: -1 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: col.border, flexShrink: 0 }} />
          <div style={{ width: 24, height: 1, background: col.border }} />
        </div>
      )}
    </div>
  )
}

function Phone({ screenId }: { screenId: number }) {
  return (
    <div style={{
      width: CW,
      height: CH,
      borderRadius: Math.round(52 * SCALE),
      background: "#000",
      flexShrink: 0,
      boxShadow: [
        "0 0 0 1.5px #2C2C2E",
        "0 0 0 6px #1C1C1E",
        "0 0 0 7.5px #3A3A3C",
        "0 24px 48px rgba(0,0,0,0.32)",
      ].join(", "),
      overflow: "hidden",
      position: "relative",
    }}>
      <div style={{
        width: PHONE_W,
        height: PHONE_H,
        transform: `scale(${SCALE})`,
        transformOrigin: "top left",
        overflow: "hidden",
      }}>
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

function Section({ s }: { s: ScreenSection }) {
  const maxLeft = s.left.length
  const maxRight = s.right.length
  const maxRows = Math.max(maxLeft, maxRight)

  return (
    <div style={{
      paddingBottom: 80,
      marginBottom: 80,
      borderBottom: "1px solid #E2E8F0",
    }}>
      {/* Section header */}
      <div style={{ marginBottom: 36, textAlign: "center" }}>
        <h2 style={{
          fontSize: 20,
          fontWeight: 800,
          color: "#0F172A",
          letterSpacing: "-0.02em",
          margin: "0 0 8px",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}>
          {s.label}
        </h2>
        <p style={{
          fontSize: 13,
          color: "#64748B",
          fontWeight: 500,
          margin: 0,
          maxWidth: 540,
          marginLeft: "auto",
          marginRight: "auto",
          lineHeight: 1.6,
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}>
          {s.description}
        </p>
      </div>

      {/* Three column layout */}
      <div style={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        gap: 0,
      }}>
        {/* Left notes */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
          alignItems: "flex-end",
          width: 260,
          flexShrink: 0,
          paddingTop: Math.max(0, (CH - maxLeft * 110) / 2),
        }}>
          {s.left.map((a, i) => <Note key={i} a={a} side="left" />)}
        </div>

        {/* Vertical connector line left */}
        <div style={{ width: 1, background: "#E2E8F0", alignSelf: "stretch", flexShrink: 0 }} />

        {/* Phone */}
        <div style={{ padding: "0 0", flexShrink: 0 }}>
          <Phone screenId={s.screenId} />
        </div>

        {/* Vertical connector line right */}
        <div style={{ width: 1, background: "#E2E8F0", alignSelf: "stretch", flexShrink: 0 }} />

        {/* Right notes */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
          alignItems: "flex-start",
          width: 260,
          flexShrink: 0,
          paddingTop: Math.max(0, (CH - maxRight * 110) / 2),
        }}>
          {s.right.map((a, i) => <Note key={i} a={a} side="right" />)}
        </div>
      </div>

      {/* Bottom notes */}
      {s.bottom && (
        <div style={{
          display: "flex",
          gap: 16,
          justifyContent: "center",
          marginTop: 28,
          flexWrap: "wrap",
        }}>
          {s.bottom.map((a, i) => (
            <div key={i} style={{
              background: C[a.type].bg,
              border: `1px solid ${C[a.type].border}`,
              borderRadius: 10,
              padding: "14px 18px",
              maxWidth: 320,
              boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
            }}>
              <Tag type={a.type} />
              <div style={{ fontSize: 12, fontWeight: 800, color: "#0F172A", marginBottom: 8 }}>
                {a.emoji} {a.title}
              </div>
              {a.body.map((line, j) => (
                <p key={j} style={{ fontSize: 11, color: "#475569", lineHeight: 1.6, margin: "0 0 4px", fontWeight: 500 }}>
                  {line}
                </p>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Legend ──────────────────────────────────────────────────────────────────
function Legend() {
  return (
    <div style={{
      display: "flex",
      gap: 16,
      justifyContent: "center",
      marginBottom: 56,
      flexWrap: "wrap",
    }}>
      {(Object.entries(C) as [NoteType, typeof C[NoteType]][]).map(([key, val]) => (
        <div key={key} style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          background: val.bg,
          border: `1px solid ${val.border}`,
          borderRadius: 20,
          padding: "6px 14px",
        }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: val.border }} />
          <span style={{
            fontSize: 11,
            fontWeight: 700,
            color: val.tagColor,
            fontFamily: "system-ui, -apple-system, sans-serif",
            letterSpacing: "0.04em",
          }}>
            {val.label}
          </span>
        </div>
      ))}
    </div>
  )
}

// ─── Page ────────────────────────────────────────────────────────────────────
export default function CaseStudyPage() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#F8FAFC",
      fontFamily: "system-ui, -apple-system, sans-serif",
    }}>
      {/* Page header */}
      <div style={{
        textAlign: "center",
        padding: "64px 40px 48px",
        borderBottom: "1px solid #E2E8F0",
        background: "#fff",
        marginBottom: 64,
      }}>
        <div style={{
          fontSize: 11,
          fontWeight: 800,
          letterSpacing: "0.12em",
          color: "#4F46E5",
          textTransform: "uppercase",
          marginBottom: 12,
        }}>
          Product Design Review · Internal
        </div>
        <h1 style={{
          fontSize: 34,
          fontWeight: 800,
          color: "#0F172A",
          letterSpacing: "-0.03em",
          margin: "0 0 12px",
        }}>
          MoneyHi — Design Case Study
        </h1>
        <p style={{
          fontSize: 14,
          color: "#64748B",
          fontWeight: 500,
          maxWidth: 580,
          margin: "0 auto 32px",
          lineHeight: 1.7,
        }}>
          A full walkthrough of every design decision, UX rationale, expected business impact,
          and developer specification for the MoneyHi rewards product.
        </p>

        {/* Meta row */}
        <div style={{ display: "flex", gap: 32, justifyContent: "center", flexWrap: "wrap" }}>
          {[
            { label: "Screens", value: `${SECTIONS.length} annotated` },
            { label: "Audience", value: "PM · Engineering · Design" },
            { label: "Status", value: "Design Complete" },
          ].map((item) => (
            <div key={item.label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: "#0F172A" }}>{item.value}</div>
              <div style={{ fontSize: 11, color: "#94A3B8", fontWeight: 600, marginTop: 2 }}>{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 32px" }}>
        {/* Legend */}
        <div style={{ marginBottom: 56 }}>
          <p style={{ textAlign: "center", fontSize: 12, color: "#94A3B8", fontWeight: 600, marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.08em" }}>
            Annotation Key
          </p>
          <Legend />
        </div>

        {/* All sections */}
        {SECTIONS.map((s) => (
          <Section key={s.screenId} s={s} />
        ))}

        {/* Footer */}
        <div style={{ textAlign: "center", padding: "40px 0 64px", color: "#94A3B8", fontSize: 12, fontWeight: 500 }}>
          MoneyHi · Design System v1 · Prepared for internal product review
        </div>
      </div>
    </div>
  )
}
