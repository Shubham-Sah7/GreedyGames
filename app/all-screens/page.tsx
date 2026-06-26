"use client"

const SCREENS = [
  { id: 0,  label: "Cashout Success" },
  { id: 1,  label: "Next Goal Roadmap" },
  { id: 3,  label: "Home · Home Tab" },
  { id: 6,  label: "Home · Rewards Tab" },
  { id: 8,  label: "Home · Wallet Tab" },
  { id: 4,  label: "Home · Profile Tab" },
  { id: 2,  label: "Notification Center" },
  { id: 5,  label: "Achievements" },
  { id: 7,  label: "Offer Details" },
  { id: 9,  label: "Empty State" },
  { id: 12, label: "Loading Skeleton" },
  { id: 13, label: "Error · Network" },
  { id: 14, label: "Error · Payment" },
  { id: 15, label: "Bottom Nav States" },
]

const PHONE_W = 390
const PHONE_H = 844
const SCALE = 0.55
const CELL_W = Math.round(PHONE_W * SCALE)
const CELL_H = Math.round(PHONE_H * SCALE)

function PhoneShell({ screenId, label }: { screenId: number; label: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
      <div
        style={{
          width: CELL_W,
          height: CELL_H,
          borderRadius: Math.round(52 * SCALE),
          background: "#000",
          boxShadow: [
            "0 0 0 1.5px #2C2C2E",
            "0 0 0 6px #1C1C1E",
            "0 0 0 7.5px #3A3A3C",
            "0 20px 50px rgba(0,0,0,0.35)",
          ].join(", "),
          overflow: "hidden",
          position: "relative",
          flexShrink: 0,
        }}
      >
        {/* Scaled iframe — embed mode renders clean 390×844 content */}
        <div
          style={{
            width: PHONE_W,
            height: PHONE_H,
            transform: `scale(${SCALE})`,
            transformOrigin: "top left",
            overflow: "hidden",
          }}
        >
          <iframe
            src={`/prototype?screen=${screenId}`}
            width={PHONE_W}
            height={PHONE_H}
            style={{ border: "none", display: "block", pointerEvents: "none" }}
            title={label}
          />
        </div>
      </div>
      <p
        style={{
          fontSize: 11,
          fontWeight: 700,
          color: "#475569",
          textAlign: "center",
          letterSpacing: "0.02em",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        {label}
      </p>
    </div>
  )
}

export default function AllScreensPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#E8EDF4", padding: "48px 40px 64px" }}>
      <div style={{ marginBottom: 48, textAlign: "center" }}>
        <h1
          style={{
            fontSize: 26,
            fontWeight: 800,
            color: "#0F172A",
            letterSpacing: "-0.02em",
            fontFamily: "system-ui, -apple-system, sans-serif",
            margin: 0,
          }}
        >
          MoneyHi · All Screens
        </h1>
        <p
          style={{
            fontSize: 13,
            color: "#64748B",
            marginTop: 8,
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontWeight: 500,
          }}
        >
          {SCREENS.length} screens — screenshot for Figma or use HTML-to-Design plugin
        </p>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 32, justifyContent: "center" }}>
        {SCREENS.map((s) => (
          <PhoneShell key={s.id} screenId={s.id} label={s.label} />
        ))}
      </div>
    </div>
  )
}
