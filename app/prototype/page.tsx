"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sora, Manrope } from "next/font/google"
import {
  ChevronRight,
  ArrowLeft,
  Home,
  List,
  Wallet,
  User,
  Clock,
  Bell,
  X,
  FileText,
  Smartphone,
  Users,
  Flame,
  Sparkles,
  Star,
  Lock,
  Check,
  Trophy,
  TrendingUp,
  Zap,
  CheckCircle2,
  Gift,
  Crown,
  Sparkle,
  Settings,
  Search,
  Share2,
  HelpCircle,
  Info,
  LogOut,
  SlidersHorizontal,
  ChevronDown,
  Award,
  Unlock,
  Briefcase,
  Send,
  Copy,
  BellOff,
  WifiOff,
  AlertCircle,
  Share,
} from "lucide-react"

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
})

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
})

// --- Design Tokens (Premium App Duo Light theme) ---
const C = {
  accent:       "#4F46E5", // Premium Royal Indigo
  accentBg:     "rgba(79, 70, 229, 0.05)",
  accentBorder: "rgba(79, 70, 229, 0.15)",
  bg:           "#F8FAFC", // Clean Slate Light background
  cardBg:       "#FFFFFF", // Pure White card surface
  cardBorder:   "#E2E8F0", // Slate 200 Border
  text1:        "#0F172A", // Near-Black
  text2:        "#475569", // Slate 600
  text3:        "#94A3B8", // Slate 400
  success:      "#10B981", // Green for successful payouts
  amber:        "#D97706", // Amber 600
  amberBg:      "rgba(217, 119, 6, 0.05)",
  amberBorder:  "rgba(217, 119, 6, 0.15)",
} as const

type Screen = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15
const LABELS = [
  "3 · Cashout Success",
  "Next Goal Roadmap",
  "2 · Notification Center",
  "1 · Home Dashboard",
  "4 · Profile",
  "5 · Achievements",
  "6 · Rewards Progress",
  "7 · Offer Details",
  "8 · Wallet",
  "9 · Empty Notifications",
  "10 · Empty Withdrawals",
  "11 · Empty Offers",
  "12 · Loading Skeleton",
  "13 · Error Network",
  "14 · Error Payment",
  "15 · Bottom Nav States",
]

// --- Spring Physics Configurations ---
const springProps = {
  type: "spring",
  stiffness: 220,
  damping: 28
} as const

const cardEntrance = (delayIndex: number) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: {
    type: "spring" as const,
    stiffness: 220,
    damping: 28,
    delay: delayIndex * 0.04
  }
})

// --- Global Styles & Keyframes ---
function GlobalStyles() {
  return (
    <style>{`
      html, body, select, input, button, textarea {
        font-family: ${manrope.style.fontFamily}, sans-serif;
      }
      h1, h2, h3, h4, .font-heading {
        font-family: ${sora.style.fontFamily}, sans-serif;
      }
      @keyframes floatCTA {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-6px); }
      }
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(4px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .animate-fade-in {
        animation: fadeIn 0.4s ease-out forwards;
      }
      @keyframes shake-light {
        0%, 100% { transform: rotate(0); }
        25% { transform: rotate(-1deg); }
        75% { transform: rotate(1deg); }
      }
      @keyframes ripple {
        0% { transform: scale(0.7); opacity: 0.55; }
        100% { transform: scale(2.6); opacity: 0; }
      }
      @keyframes shimmer {
        0% { transform: translateX(-130%) skewX(-18deg); }
        100% { transform: translateX(260%) skewX(-18deg); }
      }

      @keyframes chestPulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.06); }
      }
      @keyframes badgePulse {
        0%, 100% { box-shadow: 0 0 0 0 rgba(217, 119, 6, 0.4); }
        50% { box-shadow: 0 0 0 6px rgba(217, 119, 6, 0); }
      }
      @keyframes coinSettle {
        0% { transform: translate(0,0) scale(0.2); opacity: 0; }
        12% { opacity: 1; }
        42% { transform: translate(var(--tx),var(--ty)) scale(1.1); opacity: 1; }
        100% { transform: translate(0,0) scale(0.45); opacity: 0; }
      }
      @keyframes glowIndigo {
        0%, 100% { box-shadow: 0 4px 14px rgba(79, 70, 229, 0.2); }
        50% { box-shadow: 0 6px 20px rgba(79, 70, 229, 0.4), 0 0 12px rgba(79, 70, 229, 0.2); }
      }
    `}</style>
  )
}

// --- Custom Count Up Hook ---
function useCountUp(endVal: number, duration: number = 1000, trigger: boolean = true) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!trigger) return
    let startTimestamp: number | null = null
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp
      const progress = Math.min((timestamp - startTimestamp) / duration, 1)
      const easedProgress = progress * (2 - progress) // Ease-out quad
      setCount(Math.floor(easedProgress * endVal))
      if (progress < 1) {
        window.requestAnimationFrame(step)
      }
    }
    window.requestAnimationFrame(step)
  }, [endVal, duration, trigger])

  return count
}

// --- Screen Background ---
function ScreenBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 bg-[#F8FAFC] overflow-hidden">
      {/* Top Left Indigo Glow */}
      <div 
        style={{
          position: "absolute",
          top: "-160px",
          left: "-120px",
          width: "420px",
          height: "420px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99, 102, 241, 0.1), transparent 65%)",
          filter: "blur(20px)",
        }}
      />
      {/* Bottom Right Pink/Lavender Glow */}
      <div 
        style={{
          position: "absolute",
          bottom: "-140px",
          right: "-120px",
          width: "440px",
          height: "440px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(236, 72, 153, 0.07), transparent 65%)",
          filter: "blur(20px)",
        }}
      />
      {/* Middle Right Subtle Cyan Glow */}
      <div 
        style={{
          position: "absolute",
          top: "120px",
          right: "-80px",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(6, 182, 212, 0.07), transparent 70%)",
          filter: "blur(16px)",
        }}
      />
    </div>
  )
}

function CollectibleCard({ 
  children, 
  className = "", 
  delay = 0,
  onClick,
  role,
  tabIndex,
  "aria-label": ariaLabel
}: { 
  children: React.ReactNode; 
  className?: string; 
  delay?: number;
  onClick?: () => void;
  role?: string;
  tabIndex?: number;
  "aria-label"?: string;
}) {
  const hasPadding = className.includes("p-")
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 220,
        damping: 28,
        delay: delay
      }}
      whileHover={onClick ? { 
        y: -1.5, 
        boxShadow: "0 6px 20px rgba(79, 70, 229, 0.06)",
        borderColor: "rgba(79, 70, 229, 0.2)",
        transition: { type: "spring", stiffness: 300, damping: 28 }
      } : {}}
      whileTap={onClick ? { scale: 0.98 } : {}}
      onClick={onClick}
      role={role || (onClick ? "button" : undefined)}
      tabIndex={tabIndex ?? (onClick ? 0 : undefined)}
      aria-label={ariaLabel}
      onKeyDown={(e) => {
        if (onClick && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onClick();
        }
      }}
      className={`rounded-2xl border bg-white transition-all outline-none ${
        !hasPadding ? "p-5" : ""
      } ${
        onClick 
          ? "border-[#E2E8F0] cursor-pointer hover:border-[#4F46E5]/30 focus-visible:ring-2 focus-visible:ring-[#4F46E5] focus-visible:ring-offset-1 focus-visible:ring-offset-[#F8FAFC]" 
          : "border-[#E2E8F0] shadow-[0_4px_12px_rgba(0,0,0,0.02),0_1px_2px_rgba(0,0,0,0.01)]"
      } ${className}`}
    >
      {children}
    </motion.div>
  )
}

function MiniCoinIcon({ size = 14, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={`flex-shrink-0 select-none ${className}`}>
      <defs>
        <radialGradient id="miniCoinGrad" cx="45%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#F5F3FF" />
          <stop offset="35%" stopColor="#C084FC" />
          <stop offset="70%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#5B21B6" />
        </radialGradient>
        <linearGradient id="thicknessGradMini" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7C3AED" />
          <stop offset="100%" stopColor="#4C1D95" />
        </linearGradient>
      </defs>
      {/* 3D edge depth */}
      <circle cx="12" cy="12.8" r="10.5" fill="url(#thicknessGradMini)" />
      {/* Coin face */}
      <circle cx="12" cy="12" r="10" fill="url(#miniCoinGrad)" stroke="#6D28D9" strokeWidth="0.5" />
      {/* Inner dashed rim */}
      <circle cx="12" cy="12" r="8.2" fill="none" stroke="#DDD6FE" strokeWidth="0.5" strokeDasharray="1.2 0.8" opacity="0.75" />
      {/* Embossed M */}
      <text x="12.2" y="14.8" fontSize="9.5" fontWeight="900" fill="#FFFFFF" textAnchor="middle" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>M</text>
    </svg>
  )
}

// --- Glowing Gradient Premium Icon Wrapper ---
function GlowIcon({ 
  icon: Icon, 
  color = "emerald", 
  size = 20, 
  glow = true, 
  className = "",
  containerSize = "w-12 h-12"
}: { 
  icon: React.ElementType; 
  color?: "emerald" | "gold" | "blue" | "rose" | "purple" | "slate" | "cyan" | "orange"; 
  size?: number; 
  glow?: boolean; 
  className?: string;
  containerSize?: string;
}) {
  const styles = {
    emerald: {
      bg: "bg-emerald-50",
      border: "border-emerald-200/60 hover:border-emerald-300",
      text: "text-emerald-600",
      glow: "shadow-[0_0_12px_rgba(16,185,129,0.12)]"
    },
    gold: {
      bg: "bg-amber-50",
      border: "border-amber-200/60 hover:border-amber-300",
      text: "text-amber-600",
      glow: "shadow-[0_0_12px_rgba(217,119,6,0.12)]"
    },
    blue: {
      bg: "bg-indigo-50",
      border: "border-indigo-100 hover:border-indigo-200",
      text: "text-indigo-600",
      glow: "shadow-[0_0_12px_rgba(79,70,229,0.1)]"
    },
    rose: {
      bg: "bg-rose-50",
      border: "border-rose-200/60 hover:border-rose-300",
      text: "text-rose-600",
      glow: "shadow-[0_0_12px_rgba(244,63,94,0.12)]"
    },
    purple: {
      bg: "bg-purple-50",
      border: "border-purple-200/60 hover:border-purple-300",
      text: "text-purple-600",
      glow: "shadow-[0_0_12px_rgba(168,85,247,0.12)]"
    },
    cyan: {
      bg: "bg-cyan-50",
      border: "border-cyan-200/60 hover:border-cyan-300",
      text: "text-cyan-600",
      glow: "shadow-[0_0_12px_rgba(6,182,212,0.12)]"
    },
    orange: {
      bg: "bg-orange-50",
      border: "border-orange-200/60 hover:border-orange-300",
      text: "text-orange-600",
      glow: "shadow-[0_0_12px_rgba(249,115,22,0.12)]"
    },
    slate: {
      bg: "bg-slate-50",
      border: "border-slate-200 hover:border-slate-300",
      text: "text-slate-600",
      glow: ""
    }
  }

  const c = styles[color] || styles.emerald;
  return (
    <div className={`rounded-xl flex items-center justify-center border transition-all ${c.bg} ${c.border} ${glow ? c.glow : ""} ${containerSize} ${className}`}>
      <Icon size={size} className={c.text} />
    </div>
  )
}

// --- Premium Pill CTA Button ---
function PremiumCTA({ onClick, children, className = "" }: { onClick: () => void; children: React.ReactNode; className?: string }) {
  const arrowVariants = {
    initial: { x: 0 },
    hover: { x: 4 }
  }

  return (
    <div className="relative w-full flex justify-center">
      <motion.button
        onClick={onClick}
        whileTap={{ scale: 0.98 }}
        whileHover="hover"
        initial="initial"
        className={`relative w-full flex items-center justify-center gap-2 py-4 px-8 rounded-[18px] text-sm font-bold text-white bg-gradient-to-r from-[#4F46E5] to-[#6366F1] shadow-[0_4px_14px_rgba(79,70,229,0.2)] hover:shadow-[0_6px_20px_rgba(79,70,229,0.3)] transition-shadow duration-200 cursor-pointer select-none border-none outline-none ${className}`}
      >
        <span className="relative z-10 flex items-center justify-center gap-1.5 pointer-events-none">
          {children}
          <motion.span 
            variants={arrowVariants} 
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
            className="flex items-center justify-center"
          >
            <ChevronRight size={15} strokeWidth={2.5} />
          </motion.span>
        </span>
      </motion.button>
    </div>
  )
}

// --- Giant Purple Coin Component ---
function GiantGoldCoin() {
  return (
    <div className="relative flex items-center justify-center" style={{ width: 140, height: 140 }}>
      {/* Ambient warm radial glow (extremely quiet/soft) */}
      <div className="absolute w-36 h-36 rounded-full bg-purple-500/5 blur-2xl z-0 pointer-events-none" />

      {/* Main 3D Metallic Coin with natural idle float */}
      <motion.div
        animate={{ 
          y: [-2, 2, -2]
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 5, 
          ease: "easeInOut" 
        }}
        className="relative overflow-hidden rounded-full w-28 h-28 flex items-center justify-center select-none z-10"
        style={{
          boxShadow: "0 6px 18px rgba(124, 58, 237, 0.12)"
        }}
      >
        <svg width="120" height="120" viewBox="0 0 120 120" className="absolute inset-0">
          <defs>
            <radialGradient id="faceGrad" cx="45%" cy="40%" r="55%" fx="30%" fy="25%">
              <stop offset="0%" stopColor="#F5F3FF" /> {/* SPECULAR LIGHT */}
              <stop offset="35%" stopColor="#C084FC" /> {/* Purple 400 */}
              <stop offset="70%" stopColor="#8B5CF6" /> {/* Purple 500 */}
              <stop offset="100%" stopColor="#4C1D95" /> {/* Shadow 900 */}
            </radialGradient>
            
            <linearGradient id="thicknessGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7C3AED" />
              <stop offset="45%" stopColor="#6D28D9" />
              <stop offset="100%" stopColor="#3B0764" /> {/* Edge depth */}
            </linearGradient>

            <linearGradient id="highlightGrad" x1="0.5" y1="0" x2="0.5" y2="1">
              <stop offset="0%" stopColor="#FFF" opacity="0.4" />
              <stop offset="100%" stopColor="#000" opacity="0.3" />
            </linearGradient>

            <linearGradient id="embossHighlight" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#E9D5FF" />
              <stop offset="100%" stopColor="#7C3AED" />
            </linearGradient>
          </defs>

          {/* 3D Depth edge */}
          <ellipse cx="60" cy="62" rx="55" ry="55" fill="url(#thicknessGrad)" />
          <ellipse cx="60" cy="61" rx="55" ry="55" fill="url(#thicknessGrad)" />
          <ellipse cx="60" cy="60" rx="55" ry="55" fill="url(#thicknessGrad)" />
          
          {/* Face */}
          <circle cx="60" cy="56" r="54" fill="url(#faceGrad)" />
          
          {/* Ridges rim */}
          <circle cx="60" cy="56" r="51.5" fill="none" stroke="#6D28D9" strokeWidth="2.5" opacity="0.35" />
          <circle cx="60" cy="56" r="51.5" fill="none" stroke="#C084FC" strokeWidth="2" strokeDasharray="3.2 2" />
          <circle cx="60" cy="56" r="49" fill="none" stroke="url(#highlightGrad)" strokeWidth="1" opacity="0.25" />

          {/* Inner ring */}
          <circle cx="60" cy="56" r="43" fill="none" stroke="#6D28D9" strokeWidth="1.2" opacity="0.3" />
          <circle cx="60" cy="56" r="41.5" fill="none" stroke="#DDD6FE" strokeWidth="1" opacity="0.15" />

          {/* Embossed MoneyHi "M" Logo */}
          <g transform="translate(43, 39) scale(1.1)">
            {/* Dark engraved depth shadow */}
            <path 
              d="M4 22V4l13 13L30 4v18" 
              stroke="#3B0764" 
              strokeWidth="5.5" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              fill="none" 
              opacity="0.75"
            />
            {/* Embossed highlight face */}
            <path 
              d="M4 22V4l13 13L30 4v18" 
              stroke="url(#embossHighlight)" 
              strokeWidth="3.2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              fill="none" 
            />
            {/* Inner top rim spec shine */}
            <path 
              d="M5 21V5l12 12L29 5v16" 
              stroke="#FFF" 
              strokeWidth="0.8" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              fill="none" 
              opacity="0.45"
            />
          </g>

          {/* Realistic hairline scratches */}
          <path d="M38 48 l12 -6" stroke="#FFF" strokeWidth="0.5" opacity="0.15" />
          <path d="M72 74 l8 6" stroke="#FFF" strokeWidth="0.4" opacity="0.12" />
          <path d="M84 42 l-10 4" stroke="#6D28D9" strokeWidth="0.5" opacity="0.18" />
        </svg>

        {/* Shine sweep overlay running every 7 seconds */}
        <motion.div
          animate={{ x: [-160, 160] }}
          transition={{
            repeat: Infinity,
            repeatDelay: 5.6,
            duration: 1.4,
            ease: "easeInOut"
          }}
          className="absolute top-0 bottom-0 w-8 bg-gradient-to-r from-transparent via-white/12 to-transparent skew-x-12 pointer-events-none"
        />
      </motion.div>
    </div>
  )
}

// --- Collectible Milestone Coin (Streak) ---
function MilestoneCoin({ state, label, reward, day }: { state: string; label: string; reward: string; day: number }) {
  const isCompleted = state === "completed"
  const isUpcoming = state === "upcoming"
  
  return (
    <div className="flex flex-col items-center gap-1.5 select-none">
      <motion.div
        animate={isUpcoming ? { 
          y: [0, -2, 0]
        } : {}}
        transition={isUpcoming ? { repeat: Infinity, duration: 3, ease: "easeInOut" } : {}}
        className={`w-[38px] h-[38px] rounded-full flex items-center justify-center relative transition-all duration-300 ${
          isCompleted
            ? "bg-[#10B981] text-white shadow-sm"
            : isUpcoming
            ? "bg-[#FBBF24] text-[#0B0F19] shadow-sm font-bold"
            : "bg-slate-50 border border-slate-200 text-slate-400"
        }`}
      >
        {isCompleted ? (
          <Check size={15} strokeWidth={3.5} className="text-white" />
        ) : isUpcoming ? (
          <div className="flex flex-col items-center justify-center">
            <span className="text-[8px] font-black tracking-tight text-[#0B0F19] leading-none">1.2×</span>
          </div>
        ) : day === 7 ? (
          <div className="text-slate-400 flex items-center justify-center">
            <Gift size={13} />
          </div>
        ) : reward ? (
          <div className="flex flex-col items-center justify-center text-[7px] font-bold leading-none text-slate-400 uppercase tracking-tighter">
            <span>{reward.split(" ")[0]}</span>
          </div>
        ) : (
          <span className="text-[10px] font-bold">{day}</span>
        )}
      </motion.div>
      <span className={`text-[8.5px] font-bold ${isUpcoming ? "text-[#D97706] font-extrabold" : "text-slate-400"}`}>
        {isUpcoming ? "Tomorrow" : label}
      </span>
    </div>
  )
}

// --- Addictive Progress Journey (Roadmap) ---
function ProgressJourney({ pct }: { pct: number }) {
  const nodes = [
    { pct: 0, label: "Start", type: "dot" },
    { pct: 33.3, label: "1.5x Boost", type: "gift" },
    { pct: 66.7, label: "Premium", type: "star" },
    { pct: 100, label: "Cashout", type: "crown" }
  ]

  return (
    <div className="relative py-6 my-2 px-2 select-none">
      {/* Background slider track line */}
      <div className="absolute top-1/2 left-3 right-3 h-1.5 -translate-y-1/2 rounded-full bg-[#E2E8F0]" />
      
      {/* Filled slider track */}
      <motion.div
        className="absolute top-1/2 left-3 h-1.5 -translate-y-1/2 rounded-full bg-[#10B981]"
        initial={{ width: 0 }}
        animate={{ width: `calc(${pct}% - 6px)` }}
        transition={{ type: "spring", stiffness: 220, damping: 28 }}
      />
      
      {/* Interactive journey landmark points */}
      <div className="relative flex justify-between">
        {nodes.map((node, i) => {
          const isReached = pct >= node.pct
          const isCurrent = pct >= node.pct && (i === nodes.length - 1 || pct < nodes[i + 1].pct)
          
          return (
            <div key={i} className="flex flex-col items-center relative" style={{ width: 28 }}>
              <motion.div
                initial={{ scale: 0.92 }}
                animate={{
                  scale: 1
                }}
                transition={{ type: "spring", stiffness: 220, damping: 28 }}
                className={`w-7 h-7 rounded-full flex items-center justify-center border z-10 transition-all ${
                  isReached
                    ? "bg-[#10B981] border-[#10B981] text-white shadow-sm"
                    : "bg-white border-[#E2E8F0] text-slate-400"
                }`}
              >
                {node.type === "dot" ? (
                  <div className={`w-1.5 h-1.5 rounded-full ${isReached ? "bg-white" : "bg-slate-300"}`} />
                ) : node.type === "gift" ? (
                  <Gift size={11} className={isReached ? "text-white" : "text-slate-400"} />
                ) : node.type === "star" ? (
                  <Star size={11} className={isReached ? "text-white" : "text-slate-400"} />
                ) : (
                  <Crown size={11} className={isReached ? "text-white" : "text-slate-400"} />
                )}
              </motion.div>

              {/* Tag Label */}
              <span className={`text-[7.5px] font-bold mt-1.5 whitespace-nowrap absolute top-8 ${
                isCurrent 
                  ? "text-[#10B981] font-extrabold" 
                  : isReached 
                  ? "text-slate-600 font-semibold" 
                  : "text-slate-400"
              }`}>
                {node.label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// --- Atom Utility Tags ---
function OL({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#94A3B8] ${className}`}>
      {children}
    </p>
  )
}

// --- Progress Bar ---
function ProgressBar({ pct }: { pct: number }) {
  return (
    <div className="h-1.5 w-full rounded-full overflow-hidden bg-[#E2E8F0]">
      <motion.div 
        className="h-full rounded-full" 
        style={{ background: C.accent }}
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ type: "spring", stiffness: 220, damping: 28 }}
      />
    </div>
  )
}

// --- Progress Ring ---
function ProgressRing({ pct, size = 48, stroke = 3.5 }: { pct: number; size?: number; stroke?: number }) {
  const r = (size - stroke) / 2
  const circ = 2 * Math.PI * r
  const offset = circ - (pct / 100) * circ
  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)", flexShrink: 0 }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#E2E8F0" strokeWidth={stroke} />
      <circle
        cx={size / 2} cy={size / 2} r={r} fill="none"
        stroke="#5B4CF5" strokeWidth={stroke} strokeLinecap="round"
        strokeDasharray={circ} strokeDashoffset={offset}
        style={{ transition: "stroke-dashoffset 900ms cubic-bezier(0.16, 1, 0.3, 1)" }}
      />
    </svg>
  )
}

function AnimatedProgressRing({ pct, ...rest }: { pct: number; size?: number; stroke?: number }) {
  const [p, setP] = useState(0)
  useEffect(() => {
    const t = setTimeout(() => setP(pct), 600)
    return () => clearTimeout(t)
  }, [pct])
  return <ProgressRing pct={p} {...rest} />
}


// --- Screen 0 — Cashout Success ---
function CashoutSuccess({ onNext }: { onNext: () => void }) {
  const [revealStep, setRevealStep] = useState(0)
  
  useEffect(() => {
    // Drop lands around 450ms. Trigger reveal states.
    const t1 = setTimeout(() => setRevealStep(1), 500)
    const t2 = setTimeout(() => setRevealStep(2), 800)
    const t3 = setTimeout(() => setRevealStep(3), 1500)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }, [])

  const countUpVal = useCountUp(100, 800, revealStep >= 1)
  const countUpXP = useCountUp(1240, 1000, revealStep >= 1)

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC] text-[#0F172A] select-none relative overflow-hidden">
      <GlobalStyles />
      <ScreenBackground />


      <div className="flex-1 overflow-y-auto space-y-5 pb-12 pt-16 px-6 relative z-10 scrollbar-none">
        
        {/* --- Neon Emerald Success Header --- */}
        <div className="flex flex-col items-center text-center space-y-3.5 py-4">
          <motion.div
            initial={{ scale: 0.3, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 180, damping: 15 }}
            className="w-[72px] h-[72px] rounded-full border-[3px] border-[#10B981] flex items-center justify-center relative shadow-[0_0_15px_rgba(16,185,129,0.15)] bg-emerald-50"
          >
            {/* Pulsing ripples from Claude design */}
            <div className="absolute inset-0 rounded-full border border-[#10B981]/35 pointer-events-none" style={{ animation: "ripple 2.2s ease-out infinite" }} />
            <div className="absolute inset-0 rounded-full border border-[#D97706]/30 pointer-events-none" style={{ animation: "ripple 2.2s ease-out 0.7s infinite" }} />

            <Check size={36} strokeWidth={3.5} className="text-[#10B981] relative z-10" />
          </motion.div>

          <div className="space-y-1">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#059669]">
              FIRST CASH-OUT COMPLETE
            </p>
            <h2 className="text-[20px] font-black tracking-tight leading-tight text-[#0F172A] px-2">
              🎉 You just unlocked your first real reward!
            </h2>
          </div>
        </div>

        {/* --- Withdrawal Successful Card --- */}
        <CollectibleCard className="p-4.5 space-y-4 relative overflow-hidden">
          {/* Shimmer sweep reflection */}
          <div className="absolute top-0 bottom-0 left-0 w-10 pointer-events-none z-0 bg-gradient-to-r from-transparent via-[#4F46E5]/5 to-transparent" style={{ animation: "shimmer 4.5s ease-in-out 1.2s infinite" }} />
          <div className="flex items-center justify-between">
            <p className="text-[9.5px] font-extrabold uppercase tracking-widest text-[#475569]">
              WITHDRAWAL SUCCESSFUL
            </p>
            <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200/50 text-[#059669] text-[9.5px] font-bold">
              <CheckCircle2 size={10} />
              Paid
            </div>
          </div>

          <div className="flex items-baseline justify-between py-1">
            <div className="flex items-baseline gap-1.5">
              <span className="text-[24px] font-black text-[#10B981]">₹</span>
              <span className="text-[42px] font-black tracking-tighter leading-none text-[#0F172A]">
                {countUpVal}
              </span>
            </div>
            <p className="text-right text-[11px] font-semibold text-[#475569] leading-tight">
              Successfully<br />Withdrawn
            </p>
          </div>

          <div className="flex items-center justify-between text-[11px] text-[#475569] font-semibold pt-3 border-t border-[#E2E8F0]">
            <span>to UPI •••• 4821</span>
            <span>Today, 2:14 PM</span>
          </div>
        </CollectibleCard>

        {/* --- Journey Progress Card --- */}
        <CollectibleCard className="p-4.5">
          <div className="flex items-center gap-2 mb-4">
            <Unlock size={14} className="text-[#4F46E5] filter drop-shadow-[0_0_4px_rgba(79,70,229,0.3)]" />
            <p className="text-xs font-black tracking-tight text-[#0F172A]">Journey Level 2 Unlocked</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative flex items-center justify-center flex-shrink-0" style={{ width: 68, height: 68 }}>
              <ProgressRing pct={70} size={68} stroke={4.5} />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-[9px] font-extrabold text-[#475569] uppercase tracking-wide leading-none">LEVEL</p>
                <p className="text-[20px] font-black text-[#0F172A] leading-none mt-1">2</p>
              </div>
            </div>

            <div className="flex-1 space-y-2">
              <div className="flex items-baseline justify-between">
                <div className="flex items-baseline gap-1">
                  <span className="text-[22px] font-black text-[#0F172A]">{countUpXP}</span>
                  <span className="text-[10px] font-extrabold text-[#475569] uppercase">XP</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-[#4F46E5]/10 text-[9.5px] font-extrabold text-[#4F46E5] border border-[#4F46E5]/20">
                  +240 XP
                </span>
              </div>
              <ProgressBar pct={70} />
              <p className="text-[10.5px] text-[#475569] font-semibold">260 XP to Level 3</p>
            </div>
          </div>
        </CollectibleCard>

        {/* --- New Badge Earned Card --- */}
        <CollectibleCard className="p-3.5 flex items-center gap-3.5">
          <GlowIcon icon={Trophy} color="gold" containerSize="w-11 h-11" size={20} glow={true} />
          <div className="flex-1 min-w-0">
            <p className="text-[9.5px] font-extrabold uppercase tracking-widest text-[#4F46E5] leading-none">
              NEW BADGE EARNED
            </p>
            <h4 className="text-sm font-black text-[#0F172A] mt-1.5 leading-none">First Withdrawal</h4>
          </div>
          <ChevronRight size={16} className="text-[#94A3B8]" />
        </CollectibleCard>

        {/* --- Daily Streak --- */}
        <CollectibleCard className="p-4.5">
          <div className="flex items-center justify-between mb-3.5">
            <div className="flex items-center gap-1.5">
              <Flame size={14} className="text-[#D97706] fill-[#D97706] filter drop-shadow-[0_0_4px_rgba(217,119,6,0.3)]" />
              <p className="text-xs font-black text-[#0F172A]">Daily Streak</p>
            </div>
            <span className="text-[9.5px] font-extrabold text-[#4F46E5] uppercase tracking-wider bg-[#4F46E5]/10 px-2 py-0.5 rounded-full border border-[#4F46E5]/20">
              DAY 1 STARTED
            </span>
          </div>

          <div className="grid grid-cols-7 gap-1.5">
            {[
              { day: 1, label: "Today", active: true, done: true, bonus: false },
              { day: 2, label: "Tue", active: false, done: false, bonus: false },
              { day: 3, label: "Wed", active: false, done: false, bonus: false },
              { day: 4, label: "Thu", active: false, done: false, bonus: false },
              { day: 5, label: "Fri", active: false, done: false, bonus: false },
              { day: 6, label: "Sat", active: false, done: false, bonus: false },
              { day: 7, label: "Sun", active: false, done: false, bonus: true },
            ].map((d) => (
              <div key={d.day} className="flex flex-col items-center gap-1">
                {d.done ? (
                  <GlowIcon icon={Flame} color="gold" containerSize="w-9 h-9" size={16} glow={true} />
                ) : d.bonus ? (
                  <GlowIcon icon={Gift} color="emerald" containerSize="w-9 h-9" size={15} glow={true} />
                ) : (
                  <div className="w-9 h-9 rounded-xl border border-[#E2E8F0] bg-slate-50 text-[#94A3B8] text-[11.5px] font-bold flex items-center justify-center">
                    {d.day}
                  </div>
                )}
                <span className={`text-[8.5px] font-bold ${d.done ? "text-[#059669]" : "text-[#475569]"}`}>
                  {d.label}
                </span>
              </div>
            ))}
          </div>
        </CollectibleCard>

        {/* --- Tomorrow's Mission Card --- */}
        <CollectibleCard className="border-[#D97706]/20 bg-gradient-to-br from-white to-amber-50/40 p-4.5 relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[9.5px] font-extrabold text-[#D97706] uppercase tracking-widest">
              TOMORROW'S MISSION
            </span>
            <div className="flex items-center gap-1 text-[9.5px] font-bold text-[#D97706] bg-amber-50 px-2 py-0.5 rounded border border-amber-200/50" style={{ animation: "badgePulse 2s ease-in-out infinite" }}>
              <Clock size={10} className="text-[#D97706]" />
              <span>23:54:44</span>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div style={{ animation: "chestPulse 2.2s ease-in-out infinite" }}>
              <GlowIcon icon={Briefcase} color="gold" containerSize="w-[44px] h-[44px]" size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-[13.5px] font-black text-[#0F172A] leading-snug">
                Complete 2 offers tomorrow
              </h4>
              <p className="text-[11.5px] text-[#D97706] font-bold mt-0.5">
                Earn +₹50 Bonus <span className="text-[#475569] font-semibold text-[10px]">0/2</span>
              </p>
            </div>
          </div>
        </CollectibleCard>

        {/* --- Action Buttons --- */}
        <div className="space-y-3 pt-2">
          <PremiumCTA onClick={onNext} className="py-4.5 rounded-[18px]">
            Start Tomorrow's Mission
          </PremiumCTA>
          
          <button 
            onClick={onNext}
            className="w-full py-4 px-8 rounded-[18px] text-sm font-bold text-slate-800 border border-slate-200 bg-transparent hover:bg-slate-50 active:bg-slate-100 transition-colors cursor-pointer select-none text-center"
          >
            ⚡ Explore High Reward Offers
          </button>
        </div>

      </div>
    </div>
  );
}

// --- Screen 1 — Next Goal Roadmap ---
function NextGoal({ onStart, onHome }: { onStart: () => void; onHome: () => void }) {
  const countUpCoins = useCountUp(120, 1000)
  const countUpPct = useCountUp(20, 1000)
  const countUpEarnings = useCountUp(120, 1100)
  const countUpSurveys = useCountUp(6, 900)

  const milestones = [
    { coins: 200, label: "1.5× Coin Booster",    reward: "Streak bonus",              gap: "80 away",  active: true,  icon: Zap },
    { coins: 400, label: "Premium Surveys",        reward: "Access higher-value tasks",  gap: "280 away", active: false, icon: Star },
    { coins: 600, label: "Cash Out ₹150",          reward: "Target reached",             gap: "480 away", active: false, icon: Trophy },
  ]

  const achievements = [
    { name: "First Cashout", note: "₹100 withdrawn today", icon: CheckCircle2, type: "success" },
    { name: "Survey Master", note: "6 tasks done this week", icon: Trophy, type: "bronze" },
    { name: "Streak Starter", note: "Locked in Day 1 of 7", icon: Flame, type: "amber" },
  ]

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC] text-[#0F172A] select-none relative overflow-hidden">
      <GlobalStyles />
      <ScreenBackground />

      {/* App Bar */}
      <div className="flex items-center gap-3 px-6 pt-12 pb-2 relative z-10">
        <motion.button
          onClick={onHome}
          whileTap={{ scale: 0.93 }}
          className="w-8 h-8 flex items-center justify-center rounded-lg text-[#475569] hover:text-[#0F172A] transition-all cursor-pointer"
        >
          <ArrowLeft size={16} strokeWidth={2.5} />
        </motion.button>
        <p className="text-[15px] font-black text-[#0F172A]">Next Goal Roadmap</p>
      </div>

      <div className="flex-1 overflow-y-auto space-y-6 py-5 px-6 relative z-10 scrollbar-none">
        
        {/* Target Header */}
        <motion.div 
          className="space-y-1"
          {...cardEntrance(0)}
        >
          <OL>Primary Target</OL>
          <p className="text-[40px] font-black tracking-tight text-[#0F172A] leading-none mt-1">
            ₹150
          </p>
          <div className="flex items-center gap-1 text-xs text-[#475569] font-medium">
            <TrendingUp size={12} className="text-[#10B981]" />
            <span>Unlock streak bonus in <span className="font-bold text-[#10B981]">~2 surveys (~15 min)</span></span>
          </div>
        </motion.div>

        {/* Progress Tracker journey Card */}
        <CollectibleCard delay={0.1}>
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-bold text-[#475569]">Current Progress</span>
            <div className="flex items-center gap-1 font-extrabold text-[#4F46E5]">
              <MiniCoinIcon size={12} />
              <span>{countUpCoins} / 600 ({countUpPct}%)</span>
            </div>
          </div>
          
          <ProgressJourney pct={countUpPct} />
          
          <div className="flex items-center justify-between text-[11px] text-[#475569] font-bold pt-4">
            <div className="flex items-center gap-0.5">
              <span>480</span>
              <MiniCoinIcon size={10} className="opacity-80" />
              <span>to cashout</span>
            </div>
            <span className="font-bold text-[#0F172A]">6 surveys to go</span>
          </div>
        </CollectibleCard>

        {/* Vertical Timeline */}
        <div className="space-y-3.5">
          <OL className="px-1">Milestone Timeline</OL>
          
          <div className="relative pl-6 space-y-5">
            <motion.div 
              className="absolute left-[11px] top-2 bottom-2 w-[1.5px] bg-[#E2E8F0]" 
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
            
            {milestones.map((m, i) => {
              return (
                <motion.div 
                  key={m.coins} 
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 22, delay: 0.15 + i * 0.06 }}
                  className="relative flex items-start gap-4"
                >
                  {/* Timeline dot */}
                  <div 
                    className={`absolute -left-[26px] w-6.5 h-6.5 rounded-full border flex items-center justify-center bg-white z-10 transition-all ${
                      m.active 
                        ? "border-[#4F46E5] shadow-[0_0_8px_rgba(79,70,229,0.3)]" 
                        : "border-[#E2E8F0]"
                    }`}
                  >
                    <m.icon size={11} className={m.active ? "text-[#4F46E5]" : "text-[#94A3B8]"} />
                  </div>

                  <div className="flex-1 flex items-start justify-between gap-4 pl-3.5">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1 font-bold text-xs text-[#0F172A]">
                        <MiniCoinIcon size={12} />
                        <span>{m.coins} · {m.label}</span>
                      </div>
                      <p className="text-[11px] text-[#475569] font-medium">{m.reward}</p>
                    </div>
                    
                    <span 
                      className={`text-[9.5px] font-extrabold flex-shrink-0 px-2 py-0.5 rounded-full ${
                        m.active 
                          ? "text-[#4F46E5] bg-[#4F46E5]/10 border border-[#4F46E5]/20" 
                          : "text-[#475569] bg-slate-100 border border-slate-200"
                      }`}
                    >
                      {m.gap}
                    </span>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Recommended Survey */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <OL>Recommended Campaign</OL>
            <span className="text-[9.5px] font-black text-[#10B981] bg-emerald-50 border border-emerald-200/50 px-2.5 py-0.5 rounded-full uppercase tracking-wide">
              Highest Yield
            </span>
          </div>

          <CollectibleCard 
            className="p-0 overflow-hidden relative border-[#4F46E5]/20 shadow-[0_8px_30px_rgba(79,70,229,0.04)]" 
            delay={0.25}
            onClick={onStart}
            aria-label="Start Market Opinion Survey, sponsored by CPX Research. Earns 80 coins. Takes 10 minutes. This survey has the highest coins-per-minute among 12 open surveys."
          >
            <div className="flex flex-col">
              {/* Card content wrapper */}
              <div className="p-5 pb-4 space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap min-w-0">
                      <span className="inline-flex items-center px-2 py-0.5 rounded bg-[#4F46E5]/10 text-[8.5px] font-black text-[#4F46E5] uppercase tracking-wider whitespace-nowrap">
                        SPONSORED SURVEY
                      </span>
                      <span className="text-[10px] font-bold text-[#475569] whitespace-nowrap">by CPX Research</span>
                    </div>
                    <h3 className="text-[17px] font-black leading-snug text-[#0F172A]">
                      Market Opinion Survey
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs font-bold flex-wrap">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-[9.5px] font-extrabold text-[#059669] border border-emerald-100 whitespace-nowrap">
                        82% Match
                      </span>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-indigo-50 text-[9.5px] font-extrabold text-indigo-600 border border-indigo-100/50 whitespace-nowrap">
                        <Clock size={10} strokeWidth={2.5} className="text-indigo-500 flex-shrink-0" />
                        10 min
                      </span>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50/80 text-[9.5px] font-extrabold text-[#D97706] border border-amber-100/50 whitespace-nowrap">
                        <Users size={10} className="text-[#D97706] flex-shrink-0" />
                        34 slots left
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 bg-purple-50 rounded-full border border-purple-100 shadow-sm whitespace-nowrap">
                    <MiniCoinIcon size={16} />
                    <div className="flex items-baseline gap-0.5 leading-none">
                      <span className="text-[16px] font-black tracking-tight text-[#8B5CF6]">
                        +80
                      </span>
                      <span className="text-[8px] text-[#8B5CF6]/85 font-black uppercase tracking-wider mt-0.5 ml-0.5">coins</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-2 text-xs text-indigo-700 font-bold bg-[#4F46E5]/5 border border-[#4F46E5]/10 px-3.5 py-3 rounded-xl leading-relaxed">
                  <Info size={14} className="text-[#4F46E5] mt-0.5 flex-shrink-0" />
                  <span>This survey has the highest coins-per-minute among 12 open surveys.</span>
                </div>
              </div>

              {/* Flush CTA Footer */}
              <div 
                className="bg-[#F8FAFC] border-t border-[#E2E8F0] py-3.5 flex items-center justify-center gap-1.5 cursor-pointer hover:bg-[#4F46E5]/5 transition-colors"
                onClick={onStart}
              >
                <span className="text-[11px] font-extrabold text-[#4F46E5] uppercase tracking-wider flex items-center gap-1">
                  Launch Campaign
                </span>
                <ChevronRight size={13} strokeWidth={3} className="text-[#4F46E5]" />
              </div>
            </div>
          </CollectibleCard>
        </div>

        {/* Weekly Summary */}
        <div className="space-y-3">
          <OL className="px-1">Weekly activity</OL>
          <CollectibleCard delay={0.3}>
            <div className="grid grid-cols-3 divide-x divide-[#E2E8F0]">
              <div className="text-center space-y-0.5">
                <p className="text-xl font-black tracking-tight text-[#0F172A]">₹{countUpEarnings}</p>
                <p className="text-[9.5px] text-[#475569] uppercase font-extrabold tracking-wider">earned</p>
              </div>
              <div className="text-center space-y-0.5">
                <p className="text-xl font-black tracking-tight text-[#0F172A]">{countUpSurveys}</p>
                <p className="text-[9.5px] text-[#475569] uppercase font-extrabold tracking-wider">surveys</p>
              </div>
              <div className="text-center space-y-0.5">
                <p className="text-xl font-black tracking-tight text-[#0F172A] flex items-center justify-center gap-0.5 text-[#D97706]">
                  <Flame size={14} className="fill-[#D97706]" />
                  1
                </p>
                <p className="text-[9.5px] text-[#475569] uppercase font-extrabold tracking-wider">streak day</p>
              </div>
            </div>
          </CollectibleCard>
        </div>

        {/* Achievements Badge Shelf */}
        <div className="space-y-3 pb-4">
          <OL className="px-1">Achievement Badges</OL>
          
          <div className="space-y-2.5">
            {achievements.map((a, idx) => (
              <div key={a.name}>
                <AchievementCard 
                  name={a.name} 
                  note={a.note} 
                  icon={a.icon} 
                  type={a.type} 
                  idx={idx} 
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 pb-8 pt-2 flex flex-col gap-2 relative z-10">
        <PremiumCTA onClick={onStart}>
          Start survey
        </PremiumCTA>
        <motion.button
          onClick={onHome}
          whileTap={{ scale: 0.97 }}
          className="w-full py-2.5 rounded-full text-xs font-bold text-[#475569] hover:text-[#0F172A] transition-colors cursor-pointer"
        >
          Browse all 12 surveys
        </motion.button>
      </div>
    </div>
  )
}

// --- Custom Achievement Badge component ---
function AchievementCard({ name, note, icon: Icon, type, idx }: { name: string; note: string; icon: React.ElementType; type: string; idx: number }) {
  const bgClass = 
    type === "success" ? "bg-[#10B981]/10 text-[#10B981] border-[#10B981]/25" : 
    type === "amber" ? "bg-[#FBBF24]/10 text-[#D97706] border-[#FBBF24]/25" :
    "bg-orange-500/10 text-orange-600 border-orange-500/25"
    
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 220, damping: 28, delay: 0.15 + idx * 0.04 }}
      whileHover={{ 
        y: -0.5, 
        boxShadow: "0 6px 16px rgba(0, 0, 0, 0.03)",
        borderColor: "rgba(79, 70, 229, 0.15)"
      }}
      tabIndex={0}
      aria-label={`Achievement unlocked: ${name}. Details: ${note}.`}
      className="flex items-center gap-3.5 p-3 rounded-xl border border-[#E2E8F0] bg-white transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5] focus-visible:ring-offset-1 focus-visible:ring-offset-white relative overflow-hidden"
    >
      <div 
        className={`w-9 h-9 rounded-lg flex items-center justify-center border relative z-10 ${bgClass}`}
      >
        <Icon size={16} strokeWidth={2.5} />
      </div>
      
      <div className="flex-1 flex items-center justify-between min-w-0 z-10">
        <div>
          <p className="text-xs font-black text-[#0F172A]">{name}</p>
          <p className="text-[10.5px] text-[#475569] font-bold mt-0.5">{note}</p>
        </div>
        
        <span className="text-[9.5px] text-[#475569] font-extrabold bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-full">
          Unlocked
        </span>
      </div>
    </motion.div>
  )
}

// --- Top Banner Slider Component ---
function TopBannerSlider({ 
  onSurveyClick, 
  onGamesClick, 
  onReferClick 
}: { 
  onSurveyClick: () => void; 
  onGamesClick: () => void; 
  onReferClick: () => void 
}) {
  const slides = [
    {
      id: 0,
      badge: "SPONSORED CAMPAIGNS",
      title: "Market Opinion Surveys",
      description: "Answer research questions from premium ad partners to secure coins fast.",
      actionLabel: "Launch Surveys",
      reward: "+150 max",
      image: "/simple-rounded-rectangles-with-arrow-dot-logo-template_748270-248.avif",
      onClick: onSurveyClick
    },
    {
      id: 1,
      badge: "PLAYTIME REWARDS",
      title: "Play Games & Earn",
      description: "Install Chess Battle, complete level milestones, and claim massive coin drops.",
      actionLabel: "Find Games",
      reward: "+500 max",
      image: "/chessmen-Position-beginning-game-queen-rook-king.webp",
      onClick: onGamesClick
    },
    {
      id: 2,
      badge: "APP INSTALL OFFERS",
      title: "Download TikTok & Win",
      description: "Download TikTok, register an account, and watch for 3 minutes to unlock coins.",
      actionLabel: "View Offer",
      reward: "+200 bonus",
      image: "/tiktok-app-icon-logo-png_seeklogo-373800.png",
      onClick: onReferClick
    }
  ]

  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const t = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length)
    }, 6000)
    return () => clearInterval(t)
  }, [slides.length])

  return (
    <div 
      className="relative w-full rounded-2xl border border-[#E2E8F0] bg-white p-4.5 overflow-hidden select-none outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5] focus-visible:ring-offset-1 focus-visible:ring-offset-[#F8FAFC]"
      role="region"
      tabIndex={0}
      aria-label="Sponsored Campaigns Carousel"
    >
      <div className="relative h-[135px] overflow-hidden">
        <AnimatePresence mode="wait">
          {slides.map((s, idx) => {
            if (idx !== current) return null
            return (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, x: 25 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -25 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="absolute inset-0 flex items-stretch justify-between gap-3"
              >
                {/* Left content area */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <span className="inline-block text-[8.5px] font-black tracking-wider px-2 py-0.5 rounded bg-[#4F46E5]/10 text-[#4F46E5] uppercase">
                      {s.badge}
                    </span>
                    <h3 className="text-[14px] font-black tracking-tight text-[#0F172A] mt-1.5">{s.title}</h3>
                    <p className="text-[10.5px] text-[#475569] font-semibold leading-normal mt-1 line-clamp-2">
                      {s.description}
                    </p>
                  </div>

                  <div className="flex items-center mt-1.5">
                    <motion.button
                      onClick={s.onClick}
                      whileTap={{ scale: 0.96 }}
                      className="px-3.5 py-1.5 rounded-lg text-[10px] font-black text-white bg-[#4F46E5] flex items-center gap-1 shadow-sm cursor-pointer focus-visible:ring-2 focus-visible:ring-[#4F46E5] outline-none border-none"
                    >
                      <span>{s.actionLabel}</span>
                      <ChevronRight size={11} strokeWidth={3} />
                    </motion.button>
                  </div>
                </div>

                {/* Right image + reward area */}
                <div className="flex flex-col items-center justify-between w-[75px] flex-shrink-0 py-0.5">
                  <span className="inline-flex items-center gap-0.5 text-[9.5px] font-black text-[#8B5CF6] bg-purple-50 border border-purple-100 px-2 py-0.5 rounded-full shadow-sm">
                    {s.reward} <MiniCoinIcon size={10} />
                  </span>

                  <div className="relative w-[50px] h-[50px] rounded-xl border border-[#E2E8F0] bg-slate-50 overflow-hidden shadow-sm flex items-center justify-center">
                    <img 
                      src={s.image} 
                      alt={s.title} 
                      className="w-full h-full object-cover" 
                      onError={(e) => {
                        e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Crect width='40' height='40' fill='%234F46E5' opacity='0.1'/%3E%3C/svg%3E";
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      {/* Indicator dots */}
      <div className="flex items-center justify-center gap-1.5 mt-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            aria-label={`Show campaign slide ${idx + 1}`}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              idx === current ? "bg-[#4F46E5] w-3.5" : "bg-[#E2E8F0] hover:bg-slate-300"
            } outline-none focus-visible:ring-1 focus-visible:ring-[#4F46E5] border-none cursor-pointer`}
          />
        ))}
      </div>
    </div>
  )
}

type Tab = "Home" | "Offers" | "Rewards" | "Wallet" | "Profile"

// --- Screen 2 — Home Dashboard ---
function HomeScreen({ onGoal, initialTab = "Home" }: { onGoal: () => void; initialTab?: Tab }) {
  const [activeTab, setActiveTab] = useState<Tab>(initialTab)
  const [showStreakModal, setShowStreakModal] = useState(false)
  const [shakeId, setShakeId] = useState<number | null>(null)
  
  useEffect(() => {
    setActiveTab(initialTab)
  }, [initialTab])
  
  // Search & Filters state
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilterModal, setShowFilterModal] = useState(false)
  const [filterType, setFilterType] = useState<string[]>(["Surveys", "Games", "Apps"])

  // Offers Profile personalisation state
  const [gender, setGender] = useState("")
  const [dob, setDob] = useState("")
  const [zip, setZip] = useState("")
  const [surveyProfileCompleted, setSurveyProfileCompleted] = useState(false)

  const [selectedCat, setSelectedCat] = useState(0)

  // Refer state
  const [copied, setCopied] = useState(false)

  // Contest state
  const [contestJoined, setContestJoined] = useState(false)
  const [contestSubTab, setContestSubTab] = useState<"Stats" | "Leaderboard" | "Rules">("Leaderboard")

  const triggerShake = (idx: number) => {
    setShakeId(idx)
    setTimeout(() => setShakeId(null), 450)
  }

  const handleCopyCode = () => {
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const moreTasks = [
    { type: "image", image: "/tiktok-app-icon-logo-png_seeklogo-373800.png", category: "Apps", name: "TikTok: Install & Watch", sub: "1. Download app • 2. Create account • 3. Watch for 3 min", coins: 45, time: "3 min" },
    { type: "image", image: "/Snapchat.png", category: "Apps", name: "Snapchat: Register Profile", sub: "1. Download app • 2. Verify phone • 3. Send 1 snap", coins: 80, time: "5 min" },
    { type: "image", image: "/chessmen-Position-beginning-game-queen-rook-king.webp", category: "Games", name: "Chess Battle: Play & Win", sub: "1. Install game • 2. Win battles • 3. Unlock reward", coins: 500, time: "15 min" },
    { type: "icon", image: "", category: "Surveys", name: "Refer-a-Friend Boost", sub: "Invite Network • Streak Day 3 Unlock", coins: 200, time: "Locked" },
  ]

  const surveyOffers = [
    { provider: "Ipsos Surveys", match: "98% Match", title: "General Opinion Poll", coins: 120, time: "8 min" },
    { provider: "PureSpectrum", match: "82% Match", title: "Consumer Behavior Research", coins: 150, time: "10 min" },
    { provider: "CPX Research", match: "75% Match", title: "Product Concept Test", coins: 80, time: "12 min" },
  ]

  // Filter tasks based on searchQuery and active filters
  const filteredTasks = moreTasks.filter(task => {
    const matchesSearch = task.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          task.sub.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filterType.includes(task.category === "Apps" ? "Apps" : task.category === "Games" ? "Games" : "Surveys")
    return matchesSearch && matchesFilter
  })

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC] text-[#0F172A] select-none relative overflow-hidden">
      <GlobalStyles />
      <ScreenBackground />

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto pt-14 pb-5 px-6 relative z-10 scrollbar-none">
        
        {/* App Greeting & Mini Wallet Header */}
        <div className="flex items-center justify-between py-2 mb-5">
          <div className="space-y-0.5">
            <p className="text-[11px] font-bold text-[#475569]">Hello,</p>
            <p className="text-[15px] font-black text-[#0F172A]">Chetan Bhosale</p>
          </div>
          <div className="flex items-center gap-2">
            <motion.button
              onClick={() => setShowStreakModal(true)}
              whileTap={{ scale: 0.93 }}
              className="cursor-pointer"
              aria-label="View Daily Rewards Streak"
            >
              <GlowIcon icon={Gift} color="gold" containerSize="w-8 h-8" size={15} />
            </motion.button>
            <div 
              onClick={() => setShowStreakModal(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#E2E8F0] cursor-pointer hover:border-[#4F46E5]/25 transition-colors"
            >
              <MiniCoinIcon size={14} />
              <span className="text-[11.5px] font-black text-[#0F172A]">120</span>
            </div>
          </div>
        </div>

        {/* --- TAB: HOME --- */}
        {activeTab === "Home" && (
          <div className="relative min-h-full pb-12">
            <div className="space-y-6">
              {/* Top Banner Slider */}
              <TopBannerSlider 
                onSurveyClick={onGoal}
                onGamesClick={() => triggerShake(2)}
                onReferClick={() => {
                  setActiveTab("Profile")
                }}
              />

              {/* Reward Categories */}
              <div className="space-y-3">
                <OL className="px-1">Reward Categories</OL>
                <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
                  {([
                    { line1: "Survey",   line2: "Rewards", icon: FileText   },
                    { line1: "Prime",    line2: "Surveys", icon: Star        },
                    { line1: "Playtime", line2: "",        icon: Smartphone  },
                    { line1: "Play &",   line2: "Earn",    icon: Trophy      },
                    { line1: "Games",    line2: "",        icon: Zap         },
                  ] as const).map((cat, i) => {
                    const active = selectedCat === i
                    return (
                      <button
                        key={i}
                        onClick={() => {
                          setSelectedCat(i)
                          if (i <= 1) setActiveTab("Offers")
                          else if (i >= 3) triggerShake(2)
                        }}
                        className="flex flex-col items-center justify-center gap-2 flex-shrink-0 transition-all duration-[180ms] ease-out active:scale-[0.94]"
                        style={{
                          width: 72,
                          height: 84,
                          borderRadius: 20,
                          background: active ? "#5B4CF5" : "#FFFFFF",
                          boxShadow: active
                            ? "0 2px 8px rgba(91,76,245,0.22), 0 1px 3px rgba(91,76,245,0.12)"
                            : "0 1px 2px rgba(0,0,0,0.06), 0 2px 8px rgba(0,0,0,0.04)",
                          border: `1px solid ${active ? "transparent" : "#F0F0F4"}`,
                        }}
                      >
                        <cat.icon
                          size={20}
                          strokeWidth={1.75}
                          color={active ? "#FFFFFF" : "#71717A"}
                        />
                        <p
                          className="text-[10px] font-semibold leading-[1.3] text-center whitespace-pre-line"
                          style={{ color: active ? "rgba(255,255,255,0.95)" : "#52525B" }}
                        >
                          {cat.line1}{cat.line2 ? `\n${cat.line2}` : ""}
                        </p>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Wallet Balance Card */}
              <CollectibleCard className="p-4.5 bg-gradient-to-br from-white to-[#4F46E5]/5 border-[#4F46E5]/20">
                <div className="flex items-center justify-between">
                  <span className="text-[9.5px] font-extrabold uppercase tracking-widest text-[#475569]">WALLET BALANCE</span>
                  <Wallet size={16} className="text-[#4F46E5]" />
                </div>
                <div className="flex items-baseline gap-2 mt-3">
                  <span className="text-[34px] font-black tracking-tight leading-none text-[#0F172A]">₹1,240</span>
                  <span className="text-[10px] font-extrabold text-[#10B981] bg-[#10B981]/10 px-2 py-0.5 rounded-full border border-[#10B981]/20">
                    +₹240 today
                  </span>
                </div>
                <div className="flex gap-2.5 mt-4">
                  <button 
                    onClick={onGoal}
                    className="flex-1 h-11 border-none rounded-xl bg-gradient-to-r from-[#4F46E5] to-[#6366F1] text-white font-extrabold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-[0_4px_12px_rgba(79,70,229,0.15)] hover:opacity-95"
                  >
                    <ChevronRight size={14} className="rotate-[-45deg]" />
                    Withdraw
                  </button>
                  <button 
                    onClick={() => setActiveTab("Wallet")}
                    className="flex-1 h-11 border border-[#E2E8F0] rounded-xl bg-transparent text-[#475569] font-bold text-xs cursor-pointer hover:bg-slate-50 active:bg-slate-100"
                  >
                    History
                  </button>
                </div>
              </CollectibleCard>

              {/* Progress to next reward Level 5 Card */}
              <CollectibleCard className="p-4.5 flex items-center gap-4">
                <div className="relative flex items-center justify-center flex-shrink-0" style={{ width: 68, height: 68 }}>
                  <ProgressRing pct={81} size={68} stroke={4.5} />
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <p className="text-[20px] font-black text-[#4F46E5] leading-none">5</p>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-xs text-[#0F172A]">Progress to next reward</span>
                    <span className="text-[10.5px] font-extrabold text-[#4F46E5]">₹50</span>
                  </div>
                  <div className="mt-2.5">
                    <ProgressBar pct={81} />
                  </div>
                  <p className="text-[10.5px] text-[#475569] font-semibold mt-2">
                    3,240 / 4,000 XP · <span className="text-[#4F46E5] font-bold">760 to Level 6</span>
                  </p>
                </div>
              </CollectibleCard>

              {/* Daily Streak Card */}
              <CollectibleCard className="p-4.5">
                <div className="flex items-center justify-between mb-3.5">
                  <div className="flex items-center gap-1.5">
                    <Flame size={14} className="text-[#D97706] fill-[#D97706] filter drop-shadow-[0_0_4px_rgba(217,119,6,0.3)]" />
                    <p className="text-xs font-black text-[#0F172A]">4 Day Streak</p>
                  </div>
                  <span className="text-[9.5px] font-extrabold text-[#4F46E5] uppercase tracking-wider bg-[#4F46E5]/10 px-2 py-0.5 rounded-full border border-[#4F46E5]/20">
                    +10 XP daily
                  </span>
                </div>
                <div className="grid grid-cols-7 gap-1.5">
                  {[
                    { day: "Mon", active: true },
                    { day: "Tue", active: true },
                    { day: "Wed", active: true },
                    { day: "Thu", active: true },
                    { day: "Fri", active: false },
                    { day: "Sat", active: false },
                    { day: "Sun", active: false, gift: true },
                  ].map((d, i) => (
                    <div key={i} className="flex flex-col items-center gap-1">
                      {d.active ? (
                        <div className="w-9 h-9 rounded-xl bg-[#4F46E5]/10 border border-[#4F46E5]/20 flex items-center justify-center text-[#4F46E5]">
                          <Check size={14} strokeWidth={3} />
                        </div>
                      ) : d.gift ? (
                        <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200/50 flex items-center justify-center text-[#D97706]">
                          <Gift size={14} />
                        </div>
                      ) : (
                        <div className="w-9 h-9 rounded-xl border border-[#E2E8F0] bg-slate-50 text-[#94A3B8] text-[10px] font-black flex items-center justify-center">
                          {d.day}
                        </div>
                      )}
                      <span className="text-[8.5px] font-bold text-[#475569]">{d.day}</span>
                    </div>
                  ))}
                </div>
              </CollectibleCard>

              {/* Active Missions Card */}
              <div className="space-y-3">
                <div className="flex items-center justify-between px-1">
                  <span className="text-xs font-black text-[#0F172A]">Active Missions</span>
                  <span className="text-[10.5px] font-extrabold text-[#4F46E5] cursor-pointer hover:underline">See all</span>
                </div>
                <div className="space-y-2.5">
                  {[
                    { icon: Smartphone, title: "Play 3 quick games", prog: 66, meta: "2 of 3 • ~8 min left", reward: "+₹20" },
                    { icon: FileText, title: "Complete a short survey", prog: 0, meta: "Not started • ~5 min", reward: "+₹35" }
                  ].map((m, i) => (
                    <div key={i} className="flex items-center gap-3.5 p-3.5 rounded-xl border border-[#E2E8F0] bg-white">
                      <GlowIcon icon={m.icon} color="blue" containerSize="w-10 h-10" size={18} />
                      <div className="flex-1 min-w-0 space-y-1.5">
                        <h4 className="text-xs font-black text-[#0F172A]">{m.title}</h4>
                        <ProgressBar pct={m.prog} />
                        <p className="text-[9.5px] text-[#94A3B8] font-bold">{m.meta}</p>
                      </div>
                      <span className="text-[11px] font-extrabold text-[#4F46E5] bg-[#4F46E5]/10 px-2 py-1 rounded-full border border-[#4F46E5]/20 flex-shrink-0">
                        {m.reward}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Search and Filters Bar */}
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
                  <input
                    type="text"
                    placeholder="Search campaigns..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white border border-[#E2E8F0] rounded-xl py-2 pl-9.5 pr-4 text-xs text-[#0F172A] placeholder-zinc-400 outline-none focus:border-[#4F46E5]/55 transition-colors"
                  />
                </div>
                <button 
                  onClick={() => setShowFilterModal(true)}
                  className="w-9 h-9 rounded-xl border border-[#E2E8F0] bg-white flex items-center justify-center text-zinc-400 hover:text-slate-800 cursor-pointer"
                  aria-label="Filter offers"
                >
                  <SlidersHorizontal size={14} />
                </button>
              </div>

              {/* Tasks Feed / Recommended Offers */}
              <div className="space-y-3 pb-2">
                <div className="flex items-center justify-between px-1">
                  <span className="text-xs font-black text-[#0F172A]">Recommended Offers</span>
                  <span className="text-[10.5px] font-extrabold text-[#4F46E5] cursor-pointer hover:underline">See all</span>
                </div>
                
                <div className="space-y-3.5">
                  {filteredTasks.length === 0 ? (
                    <div className="text-center py-6 text-slate-400 text-xs font-semibold">No offers match your criteria</div>
                  ) : (
                    filteredTasks.map(({ type, image, name, sub, coins, time }, i) => {
                      const isLocked = time === "Locked"
                      return (
                        <motion.button
                          key={i}
                          onClick={() => !isLocked && triggerShake(i)}
                          whileTap={!isLocked ? { scale: 0.98 } : {}}
                          className={`w-full flex items-center gap-3.5 p-3.5 rounded-xl border text-left cursor-pointer transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5] bg-white ${
                            isLocked 
                              ? "opacity-60 border-slate-100 bg-slate-50/50 cursor-not-allowed" 
                              : "border-[#E2E8F0] hover:border-[#4F46E5]/30 shadow-[0_2px_4px_rgba(0,0,0,0.01)]"
                          }`}
                        >
                          <div className="w-10 h-10 rounded-xl bg-[#4F46E5]/5 border border-[#4F46E5]/15 flex items-center justify-center overflow-hidden flex-shrink-0">
                            {type === "icon" ? (
                              <GlowIcon icon={Users} color="blue" containerSize="w-10 h-10" size={18} glow={false} />
                            ) : (
                              <img 
                                src={image} 
                                alt={name} 
                                className="w-full h-full object-cover" 
                                onError={(e) => {
                                  e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Crect width='40' height='40' fill='%234F46E5' opacity='0.1'/%3E%3C/svg%3E";
                                }}
                              />
                            )}
                          </div>
                          
                          <div className="flex-1 min-w-0 space-y-0.5">
                            <p className={`text-xs font-extrabold leading-tight ${isLocked ? "text-slate-400" : "text-[#0F172A]"}`}>{name}</p>
                            <p className={`text-[10px] font-semibold truncate ${isLocked ? "text-slate-400" : "text-[#475569]"}`}>{sub}</p>
                          </div>
                          
                          <div className="text-right flex-shrink-0 flex items-center gap-2">
                            <div className="flex items-center gap-1">
                              <MiniCoinIcon size={12} className={isLocked ? "opacity-50" : ""} />
                              <span className={`text-xs font-black tracking-tight ${isLocked ? "text-slate-400" : "text-[#8B5CF6]"}`}>+{coins}</span>
                            </div>
                            {isLocked ? (
                              <span className="text-[8.5px] font-black text-slate-400 uppercase bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded">Locked</span>
                            ) : (
                              <span className="text-[8.5px] font-black text-[#475569] uppercase bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded">{time}</span>
                            )}
                          </div>
                        </motion.button>
                      )
                    })
                  )}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="space-y-3">
                <div className="flex items-center justify-between px-1">
                  <span className="text-xs font-black text-[#0F172A]">Recent Activity</span>
                  <span className="text-[10.5px] font-extrabold text-[#4F46E5] cursor-pointer hover:underline">See all</span>
                </div>
                <div className="space-y-2">
                  {[
                    { icon: Send, title: "Withdrew to UPI", sub: "Today, 2:14 PM", amt: "-₹100", pos: false },
                    { icon: Zap, title: "Mission completed", sub: "Today, 1:50 PM", amt: "+240 XP", pos: true },
                    { icon: Gift, title: "Offer reward credited", sub: "Yesterday", amt: "+₹85", pos: true }
                  ].map((a, i) => (
                    <div key={i} className="flex items-center gap-3 py-2 border-b border-[#E2E8F0]/40 last:border-none">
                      <GlowIcon icon={a.icon} color={a.pos ? "blue" : "slate"} containerSize="w-9 h-9" size={15} glow={false} />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-black text-[#0F172A]">{a.title}</h4>
                        <p className="text-[9.5px] text-[#94A3B8] font-bold mt-0.5">{a.sub}</p>
                      </div>
                      <span className={`text-xs font-black ${a.pos ? "text-[#4F46E5]" : "text-[#475569]"}`}>
                        {a.amt}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating CTA */}
            <div 
              onClick={() => triggerShake(0)}
              style={{ animation: "floatCTA 3s ease-in-out infinite" }}
              className="absolute right-0 bottom-6 flex items-center gap-1.5 h-11 px-5 rounded-full bg-gradient-to-r from-[#4F46E5] to-[#6366F1] text-white font-extrabold text-xs shadow-[0_8px_20px_rgba(79,70,229,0.3)] cursor-pointer select-none z-30"
            >
              <Zap size={14} className="fill-white" />
              <span>Earn more</span>
            </div>
          </div>
        )}

        {/* --- TAB: OFFERS --- */}
        {activeTab === "Offers" && (
          <div className="space-y-5">
            {/* Demographics customization card */}
            {!surveyProfileCompleted ? (
              <CollectibleCard className="p-4.5 space-y-3.5">
                <div className="flex items-center gap-2 text-xs font-bold text-[#D97706]">
                  <Star size={13} className="text-[#D97706] filter drop-shadow-[0_0_4px_rgba(217,119,6,0.3)]" />
                  <span>Personalise surveys (+50 coins)</span>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-[#475569]">Gender</label>
                    <select 
                      value={gender} 
                      onChange={(e) => setGender(e.target.value)}
                      className="w-full bg-white border border-[#E2E8F0] rounded-lg p-2 text-[#0F172A] outline-none"
                    >
                      <option value="">Select</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-[#475569]">Zip Code</label>
                    <input 
                      type="text" 
                      placeholder="400001" 
                      value={zip}
                      onChange={(e) => setZip(e.target.value)}
                      maxLength={6}
                      className="w-full bg-white border border-[#E2E8F0] rounded-lg p-2 text-[#0F172A] outline-none placeholder-zinc-400" 
                    />
                  </div>
                </div>

                <button 
                  onClick={() => {
                    if (gender && zip) {
                      setSurveyProfileCompleted(true)
                    }
                  }}
                  disabled={!gender || !zip}
                  className="w-full py-2 bg-[#4F46E5] disabled:opacity-40 disabled:cursor-not-allowed text-white font-black text-xs rounded-xl shadow-sm cursor-pointer border-none"
                >
                  Save & Unlock High Paying Surveys
                </button>
              </CollectibleCard>
            ) : (
              <div className="p-3.5 rounded-xl border border-emerald-200/50 bg-emerald-50 text-xs text-[#059669] font-bold flex items-center justify-between">
                <span>✓ Profile verified! Custom matching active.</span>
                <span className="text-[10px] bg-emerald-100 px-2 py-0.5 rounded-full">+50 coins credited</span>
              </div>
            )}

            {/* List of surveys */}
            <div className="space-y-3">
              {surveyOffers.map((survey, i) => (
                <CollectibleCard 
                  key={i} 
                  onClick={onGoal}
                  className="p-4 flex items-center justify-between gap-4"
                >
                  <div className="space-y-1 flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-black text-[#4F46E5] uppercase tracking-wider bg-[#4F46E5]/10 px-1.5 py-0.5 rounded border border-[#4F46E5]/20">
                        {survey.provider}
                      </span>
                      <span className="text-[9.5px] font-bold text-[#D97706]">{survey.match}</span>
                    </div>
                    <h3 className="text-xs font-black text-[#0F172A] leading-tight">{survey.title}</h3>
                    <p className="text-[10px] text-[#475569] font-semibold flex items-center gap-1">
                      <Clock size={10} />
                      <span>Takes {survey.time}</span>
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-1 flex-shrink-0">
                    <div className="flex items-center gap-1 text-[#8B5CF6] font-black text-sm bg-purple-50 border border-purple-100 px-2 py-1 rounded-xl">
                      <MiniCoinIcon size={12} />
                      <span>+{survey.coins}</span>
                    </div>
                    <span className="text-[8px] text-[#475569] font-bold uppercase tracking-wider">Start</span>
                  </div>
                </CollectibleCard>
              ))}
            </div>
          </div>
        )}

        {/* --- TAB: REWARDS --- */}
        {activeTab === "Rewards" && (
          <div className="space-y-6">
            {/* Rewards Progress Card */}
            <CollectibleCard className="p-4.5 bg-gradient-to-br from-white to-[#4F46E5]/5 border-[#4F46E5]/20">
              <div className="flex items-center justify-between">
                <span className="text-[9.5px] font-extrabold uppercase tracking-widest text-[#475569]">NEXT REWARD</span>
                <span className="text-[14px] font-black text-[#4F46E5]">₹100 + Badge</span>
              </div>
              <div className="mt-3">
                <ProgressBar pct={81} />
              </div>
              <p className="text-[10.5px] text-[#475569] font-semibold mt-2">
                760 XP to unlock • <span className="text-[#4F46E5] font-bold">Level 6</span>
              </p>
            </CollectibleCard>

            {/* Timeline Milestones Roadmap */}
            <div className="relative pl-6 mt-4 space-y-4">
              {/* Central timeline line */}
              <div className="absolute left-[39px] top-2 bottom-2 w-0.5 bg-[#E2E8F0]" />
              
              {[
                { lvl: "LV 1", reward: "Welcome ₹10", state: "claimed", tag: "Claimed" },
                { lvl: "LV 2", reward: "₹50 Bonus", state: "claimed", tag: "Claimed" },
                { lvl: "LV 5", reward: "₹100 + Badge", state: "current", tag: "You are here" },
                { lvl: "LV 8", reward: "₹250 Reward", state: "locked", tag: "Locked" },
                { lvl: "LV 12", reward: "Premium Chest", state: "premium", tag: "Premium" },
                { lvl: "LV 20", reward: "₹1,000 Jackpot", state: "jackpot", tag: "Jackpot" },
              ].map((r, idx) => {
                const isClaimed = r.state === "claimed"
                const isCurrent = r.state === "current"
                const isPremium = r.state === "premium" || r.state === "jackpot"
                
                return (
                  <div key={idx} className="flex items-center gap-3.5 relative">
                    {/* Node dot icon */}
                    <div className={`w-8 h-8 rounded-full border-2 z-10 flex items-center justify-center flex-shrink-0 ${
                      isClaimed 
                        ? "bg-[#4F46E5] border-[#4F46E5] text-white" 
                        : isCurrent 
                        ? "bg-[#4F46E5]/10 border-[#4F46E5] text-[#4F46E5]" 
                        : isPremium 
                        ? "bg-amber-50 border-amber-300 text-[#D97706]" 
                        : "bg-white border-[#E2E8F0] text-[#94A3B8]"
                    }`}>
                      {isClaimed ? (
                        <Check size={14} strokeWidth={3} />
                      ) : isCurrent ? (
                        <Zap size={14} className="fill-[#4F46E5]" />
                      ) : isPremium ? (
                        <Crown size={14} className="fill-[#D97706]" />
                      ) : (
                        <Lock size={12} />
                      )}
                    </div>

                    {/* Level description card */}
                    <div className={`flex-1 flex items-center justify-between p-3.5 rounded-xl border ${
                      isCurrent 
                        ? "bg-gradient-to-br from-white to-[#4F46E5]/5 border-[#4F46E5]/30" 
                        : isPremium 
                        ? "bg-gradient-to-br from-white to-amber-50/20 border-amber-200" 
                        : "bg-white border-[#E2E8F0]"
                    }`}>
                      <div>
                        <p className="text-[9.5px] font-extrabold text-[#94A3B8] uppercase tracking-wide leading-none">{r.lvl}</p>
                        <h4 className={`text-xs font-black mt-1.5 ${isCurrent ? "text-[#4F46E5]" : "text-[#0F172A]"}`}>{r.reward}</h4>
                      </div>
                      <span className={`text-[10px] font-extrabold uppercase tracking-wider ${
                        isClaimed 
                          ? "text-slate-400" 
                          : isCurrent 
                          ? "text-[#4F46E5]" 
                          : isPremium 
                          ? "text-[#D97706]" 
                          : "text-slate-400"
                      }`}>
                        {r.tag}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Weekly Refer Contest Leaderboard */}
            <div className="pt-6 border-t border-[#E2E8F0]/80 space-y-4">
              <div className="space-y-0.5">
                <h3 className="text-sm font-black text-[#0F172A] uppercase tracking-wider">Weekly Refer Contest #12</h3>
                <p className="text-[11.5px] text-[#475569] font-semibold">Join the race to win massive rewards!</p>
              </div>

              {/* Contest Joined Status or Podium */}
              {!contestJoined ? (
                <CollectibleCard className="p-4 text-center space-y-3.5 border-dashed border-[#4F46E5]/30">
                  <p className="text-xs text-[#475569] font-medium px-4">
                    Invite friends to earn active referrals. Top 3 referrers share the ₹5,000 weekly pool.
                  </p>
                  <button 
                    onClick={() => setContestJoined(true)}
                    className="w-full py-2.5 bg-gradient-to-r from-[#4F46E5] to-[#6366F1] text-white font-extrabold text-xs rounded-xl shadow-sm cursor-pointer border-none"
                  >
                    Join Weekly Contest
                  </button>
                </CollectibleCard>
              ) : (
                <div className="space-y-5">
                  {/* Render the 3D Leaderboard Podium columns */}
                  <div className="flex items-end justify-center gap-2 pt-6 pb-2 px-2 relative min-h-[140px] bg-slate-50 rounded-2xl border border-[#E2E8F0]/60">
                    
                    {/* #2 Rank Column (Sagar) */}
                    <div className="flex-1 flex flex-col items-center">
                      <div className="relative mb-2">
                        <GlowIcon icon={User} color="slate" containerSize="w-8 h-8" size={14} glow={false} />
                        <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-slate-400 text-white text-[9px] font-black flex items-center justify-center border border-white">2</span>
                      </div>
                      <span className="text-[10px] font-black text-[#0F172A] max-w-[50px] truncate text-center">Sagar</span>
                      <span className="text-[9px] text-[#D97706] font-bold">14 refs</span>
                      <div className="w-full bg-slate-200 border-t border-slate-300 rounded-t-lg mt-2 flex items-center justify-center" style={{ height: 40 }}>
                        <span className="text-[11px] font-extrabold text-slate-600">₹1,500</span>
                      </div>
                    </div>

                    {/* #1 Rank Column (Abhishek) */}
                    <div className="flex-1 flex flex-col items-center relative">
                      {/* Bobbing Crown vector animation wrapper */}
                      <motion.div 
                        animate={{ y: [-1, 2, -1] }} 
                        transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                        className="absolute -top-6 text-amber-500"
                      >
                        <Crown size={15} className="fill-amber-500" />
                      </motion.div>
                      
                      <div className="relative mb-2">
                        <GlowIcon icon={User} color="blue" containerSize="w-9 h-9" size={16} glow={true} />
                        <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500 text-white text-[9px] font-black flex items-center justify-center border border-white">1</span>
                      </div>
                      <span className="text-[10.5px] font-black text-[#0F172A] max-w-[60px] truncate text-center">अभिषेक</span>
                      <span className="text-[9.5px] text-[#4F46E5] font-bold">28 refs</span>
                      <div className="w-full bg-gradient-to-t from-[#4F46E5] to-[#6366F1] border-t border-[#4F46E5] rounded-t-lg mt-2 flex items-center justify-center shadow-[0_4px_12px_rgba(79,70,229,0.2)]" style={{ height: 60 }}>
                        <span className="text-[11px] font-extrabold text-white">₹2,500</span>
                      </div>
                    </div>

                    {/* #3 Rank Column (Chetan) */}
                    <div className="flex-1 flex flex-col items-center">
                      <div className="relative mb-2">
                        <GlowIcon icon={User} color="orange" containerSize="w-8 h-8" size={14} glow={false} />
                        <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-orange-400 text-white text-[9px] font-black flex items-center justify-center border border-white">3</span>
                      </div>
                      <span className="text-[10px] font-black text-[#0F172A] max-w-[50px] truncate text-center">Chetan</span>
                      <span className="text-[9px] text-[#D97706] font-bold">8 refs</span>
                      <div className="w-full bg-orange-100 border-t border-orange-200 rounded-t-lg mt-2 flex items-center justify-center" style={{ height: 28 }}>
                        <span className="text-[11px] font-extrabold text-orange-700">₹1,000</span>
                      </div>
                    </div>

                  </div>

                  {/* Action Button to copy link/invite */}
                  <button 
                    onClick={() => setActiveTab("Profile")}
                    className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-xs rounded-xl flex items-center justify-center gap-1.5 cursor-pointer border border-[#E2E8F0]"
                  >
                    <Users size={13} />
                    <span>Invite Friends to Compete</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* --- TAB: WALLET --- */}
        {activeTab === "Wallet" && (
          <div className="space-y-5">
            {/* Wallet Available/Pending/Lifetime Balance Card */}
            <CollectibleCard className="p-4.5 bg-gradient-to-br from-white to-[#4F46E5]/5 border-[#4F46E5]/20 space-y-4">
              <div>
                <span className="text-[9.5px] font-extrabold uppercase tracking-widest text-[#475569]">AVAILABLE BALANCE</span>
                <div className="text-[34px] font-black tracking-tight text-[#0F172A] mt-1">₹1,240</div>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-3 border-t border-[#E2E8F0] text-xs font-semibold">
                <div>
                  <p className="text-[10px] text-[#94A3B8]">Pending Clearance</p>
                  <p className="text-sm font-black text-[#4F46E5] mt-1">₹35</p>
                </div>
                <div>
                  <p className="text-[10px] text-[#94A3B8]">Lifetime Earnings</p>
                  <p className="text-sm font-black text-[#0F172A] mt-1">₹2,340</p>
                </div>
              </div>
              <button 
                onClick={onGoal}
                className="w-full h-11 border-none rounded-xl bg-gradient-to-r from-[#4F46E5] to-[#6366F1] text-white font-extrabold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-[0_4px_12px_rgba(79,70,229,0.15)] hover:opacity-95"
              >
                <ChevronRight size={14} className="rotate-[-45deg]" />
                Withdraw Available Balance
              </button>
            </CollectibleCard>

            {/* Wallet Ledger Filters */}
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
              {["All", "Earned", "Withdrawn", "Pending"].map((filter, i) => (
                <button 
                  key={i}
                  className={`px-3 py-1.5 rounded-full text-xs font-extrabold cursor-pointer border transition-all ${
                    i === 0 
                      ? "bg-[#4F46E5] text-white border-[#4F46E5]" 
                      : "bg-white text-[#475569] border-[#E2E8F0] hover:border-[#4F46E5]/20"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* Transaction Ledger list */}
            <div className="space-y-2">
              {[
                { icon: ChevronRight, title: "Withdrawal to UPI", sub: "Today • 2:14 PM", amt: "-₹100", state: "Success", color: "#10B981", rot: -45 },
                { icon: Gift, title: "Offer reward credited", sub: "Yesterday", amt: "+₹85", state: "Success", color: "#10B981" },
                { icon: Zap, title: "Daily login bonus", sub: "Yesterday", amt: "+₹10", state: "Success", color: "#10B981" },
                { icon: FileText, title: "Survey reward", sub: "Pending review", amt: "+₹35", state: "Pending", color: "#4F46E5" },
                { icon: ChevronRight, title: "Withdrawal to Bank", sub: "2 days ago", amt: "-₹500", state: "Success", color: "#10B981", rot: -45 }
              ].map((t, idx) => (
                <div 
                  key={idx} 
                  className="flex items-center justify-between p-3.5 rounded-xl border border-[#E2E8F0] bg-white text-xs font-bold text-[#0F172A] shadow-sm hover:border-[#4F46E5]/15 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <GlowIcon icon={t.icon} color={t.amt.startsWith("+") ? "blue" : "slate"} containerSize="w-9 h-9" size={15} glow={false} className={t.rot ? "rotate-[-45deg]" : ""} />
                    <div>
                      <p className="text-[#0F172A] font-extrabold">{t.title}</p>
                      <p className="text-[9.5px] text-[#94A3B8] font-bold mt-0.5">
                        {t.sub} • <span style={{ color: t.color }}>{t.state}</span>
                      </p>
                    </div>
                  </div>
                  <span className={`font-black text-sm ${t.amt.startsWith("+") ? "text-[#4F46E5]" : "text-[#0F172A]"}`}>
                    {t.amt}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- TAB: PROFILE --- */}
        {activeTab === "Profile" && (
          <div className="space-y-5">
            {/* Profile Detail verified header */}
            <div className="flex items-center gap-3.5 py-1">
              <div className="relative w-[52px] h-[52px] rounded-full bg-[#4F46E5]/10 border-2 border-[#4F46E5]/30 flex items-center justify-center font-black text-base text-[#4F46E5]">
                CB
                <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#4F46E5] border-2 border-white flex items-center justify-center text-white text-[9px] font-bold">
                  ✓
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-black text-[#0F172A] leading-tight">Chetan Bhosale</h3>
                <p className="text-[11.5px] text-[#475569] font-bold mt-0.5">Level 5 · Pro Earner</p>
              </div>
              <span className="text-[10px] font-extrabold text-[#4F46E5] border border-[#4F46E5]/30 px-3 py-1.5 rounded-full bg-white hover:bg-slate-50 cursor-pointer">
                Edit
              </span>
            </div>

            {/* Total Stats Row */}
            <div className="grid grid-cols-3 gap-2">
              <div className="p-3 border border-[#E2E8F0] rounded-xl bg-white text-center">
                <div className="text-base font-black text-[#0F172A]">₹2,340</div>
                <div className="text-[9px] text-[#94A3B8] font-bold mt-1">Total Earned</div>
              </div>
              <div className="p-3 border border-[#E2E8F0] rounded-xl bg-white text-center">
                <div className="text-base font-black text-[#4F46E5]">3,240</div>
                <div className="text-[9px] text-[#94A3B8] font-bold mt-1">Total XP</div>
              </div>
              <div className="p-3 border border-[#E2E8F0] rounded-xl bg-white text-center">
                <div className="text-base font-black text-[#0F172A]">5</div>
                <div className="text-[9px] text-[#94A3B8] font-bold mt-1">Current Level</div>
              </div>
            </div>

            {/* Achievements row */}
            <div className="space-y-3">
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-black text-[#0F172A]">Recent Achievements</span>
                <span onClick={() => setActiveTab("Rewards")} className="text-[10.5px] font-extrabold text-[#4F46E5] cursor-pointer hover:underline">View all</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { icon: Trophy, active: true },
                  { icon: Flame, active: true },
                  { icon: Wallet, active: false },
                  { icon: Users, active: false }
                ].map((badge, i) => (
                  <div
                    key={i}
                    className="aspect-square rounded-xl flex items-center justify-center"
                    style={{
                      background: badge.active ? "#FEF3C7" : "#F8FAFC",
                      border: `1px solid ${badge.active ? "#FCD34D" : "#E2E8F0"}`,
                    }}
                  >
                    <badge.icon
                      size={20}
                      strokeWidth={1.75}
                      color={badge.active ? "#D97706" : "#CBD5E1"}
                      fill={badge.active ? "#D97706" : "none"}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Refer & Earn Share section */}
            <CollectibleCard className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Users size={14} className="text-[#4F46E5]" />
                  <p className="text-xs font-black text-[#0F172A]">Refer & earn ₹50 each</p>
                </div>
                <span className="text-[10px] font-extrabold text-[#4F46E5] bg-[#4F46E5]/10 px-2 py-0.5 rounded border border-[#4F46E5]/20">
                  3 / 10 Active
                </span>
              </div>
              <ProgressBar pct={30} />
              <p className="text-[10px] text-[#475569] font-semibold">
                Invite 7 more active friends to unlock a ₹200 bonus.
              </p>
              
              {/* Copy invite code block */}
              <div className="flex items-center justify-between bg-slate-50 border border-[#E2E8F0] p-2.5 rounded-xl">
                <span className="text-sm font-black tracking-widest text-[#4F46E5] px-2">BJR831</span>
                <button 
                  onClick={handleCopyCode}
                  className="px-3.5 py-1.5 rounded-lg bg-[#4F46E5] text-white font-extrabold text-[10px] uppercase border-none cursor-pointer hover:bg-[#6366F1]"
                >
                  {copied ? "Copied" : "Copy Code"}
                </button>
              </div>
            </CollectibleCard>

            {/* Payment Methods */}
            <div className="space-y-2.5">
              <OL className="px-1">PAYMENT METHODS</OL>
              {[
                { label: "HDFC Bank •••• 8842", tag: "PRIMARY", color: "#4F46E5", bg: "bg-[#4F46E5]/10", border: "border-[#4F46E5]/20" },
                { label: "UPI •••• 4821", tag: "LINKED", color: "#475569", bg: "bg-slate-50", border: "border-slate-200" }
              ].map((pm, idx) => (
                <div 
                  key={idx}
                  className="flex items-center justify-between p-3.5 rounded-xl border border-[#E2E8F0] bg-white text-xs font-bold text-[#0F172A]"
                >
                  <div className="flex items-center gap-3">
                    <GlowIcon icon={Wallet} color="slate" containerSize="w-8 h-8" size={14} glow={false} />
                    <span className="font-extrabold text-[#0F172A]">{pm.label}</span>
                  </div>
                  <span className={`text-[8.5px] font-extrabold px-2 py-0.5 rounded border ${pm.bg} ${pm.border}`} style={{ color: pm.color }}>
                    {pm.tag}
                  </span>
                </div>
              ))}
            </div>

            {/* Settings option items list */}
            <div className="space-y-2">
              {[
                { icon: Bell, label: "Notification alerts", color: "text-[#4F46E5]" },
                { icon: Lock, label: "Security & privacy", color: "text-[#475569]" },
                { icon: HelpCircle, label: "Help & support", color: "text-[#4F46E5]" },
                { icon: LogOut, label: "Log out", color: "text-red-500", onClick: onGoal }
              ].map((opt, i) => (
                <div 
                  key={i}
                  onClick={opt.onClick}
                  className="flex items-center justify-between py-2 border-b border-[#E2E8F0]/40 last:border-none cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <opt.icon size={16} className={`${opt.color}`} />
                    <span className={`text-xs font-extrabold ${opt.color}`}>{opt.label}</span>
                  </div>
                  <ChevronRight size={14} className="text-[#94A3B8] group-hover:translate-x-0.5 transition-transform" />
                </div>
              ))}
            </div>

            <p className="text-[9.5px] text-zinc-400 font-bold text-center pt-2">
              MoneyHi Duo v1.4.2 • Secured AdTech Network
            </p>
          </div>
        )}
      </div>

      {/* --- Unified Streaks Overlay Sheet/Modal --- */}
      <AnimatePresence>
        {showStreakModal && (
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-end justify-center">
            {/* Modal backdrop closer clicker */}
            <div className="absolute inset-0 z-0" onClick={() => setShowStreakModal(false)} />
            
            <motion.div
              initial={{ y: 300 }}
              animate={{ y: 0 }}
              exit={{ y: 300 }}
              transition={{ type: "spring", stiffness: 220, damping: 26 }}
              className="w-full max-w-[390px] bg-white border-t border-[#E2E8F0] rounded-t-[32px] p-6 relative z-10 space-y-5 shadow-2xl"
            >
              {/* Drag handles bar indicator */}
              <div className="w-12 h-1 bg-slate-200 rounded-full mx-auto -mt-1 mb-2" />

              <div className="flex items-start justify-between">
                <div className="space-y-0.5">
                  <h3 className="text-base font-black text-[#0F172A]">Daily Streak Route</h3>
                  <p className="text-xs text-[#475569] font-semibold">Day 2 unlocks 1.2× multiplier bonus</p>
                </div>
                <button 
                  onClick={() => setShowStreakModal(false)} 
                  className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-[#475569] hover:text-[#0F172A] cursor-pointer border-none"
                  aria-label="Close Streak Route"
                >
                  <X size={14} />
                </button>
              </div>

              {/* Grid of 7 streak days */}
              <div className="grid grid-cols-7 gap-1.5 py-2">
                {[
                  { day: 1, label: "Day 1", done: true, reward: "" },
                  { day: 2, label: "Day 2", done: false, reward: "1.2x" },
                  { day: 3, label: "Day 3", done: false, reward: "1.5x" },
                  { day: 4, label: "Day 4", done: false, reward: "" },
                  { day: 5, label: "Day 5", done: false, reward: "2.0x" },
                  { day: 6, label: "Day 6", done: false, reward: "" },
                  { day: 7, label: "Day 7", done: false, reward: "Chest" },
                ].map((d) => (
                  <div key={d.day} className="flex flex-col items-center gap-1">
                      {d.done ? (
                        <GlowIcon icon={Flame} color="gold" containerSize="w-9 h-9" size={16} glow={true} />
                      ) : d.reward === "Chest" ? (
                        <GlowIcon icon={Gift} color="emerald" containerSize="w-9 h-9" size={15} glow={true} />
                      ) : d.reward ? (
                        <div className="w-9 h-9 rounded-xl border border-[#E2E8F0] bg-slate-50 text-[#475569] flex flex-col items-center justify-center">
                          <span className="text-[7.5px] font-extrabold tracking-tight text-[#4F46E5]">{d.reward}</span>
                          <span className="text-[6.5px] font-bold text-[#475569] uppercase">Mult</span>
                        </div>
                      ) : (
                        <div className="w-9 h-9 rounded-xl border border-[#E2E8F0] bg-slate-50 text-[#475569] text-[11.5px] font-bold flex items-center justify-center">
                          {d.day}
                        </div>
                      )}
                      <span className={`text-[8.5px] font-bold ${d.done ? "text-[#059669]" : "text-[#475569]"}`}>
                        {d.label}
                      </span>
                  </div>
                ))}
              </div>

              <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-xl text-xs leading-relaxed text-[#475569] font-semibold">
                Come back <span className="text-[#0F172A] font-extrabold">tomorrow</span> and complete 1 task to claim your <span className="text-[#D97706] font-black">1.2× bonus coin multiplier</span>!
              </div>

              <PremiumCTA onClick={() => setShowStreakModal(false)} className="py-4.5 rounded-[18px]">
                Continue Earning
              </PremiumCTA>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- Unified Search Filters Sheet --- */}
      <AnimatePresence>
        {showFilterModal && (
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-end justify-center">
            {/* Modal backdrop closer clicker */}
            <div className="absolute inset-0 z-0" onClick={() => setShowFilterModal(false)} />
            
            <motion.div
              initial={{ y: 300 }}
              animate={{ y: 0 }}
              exit={{ y: 300 }}
              transition={{ type: "spring", stiffness: 220, damping: 26 }}
              className="w-full max-w-[390px] bg-white border-t border-[#E2E8F0] rounded-t-[32px] p-6 relative z-10 space-y-5 shadow-2xl"
            >
              {/* Drag handles bar indicator */}
              <div className="w-12 h-1 bg-slate-200 rounded-full mx-auto -mt-1 mb-2" />

              <div className="flex items-start justify-between">
                <div className="space-y-0.5">
                  <h3 className="text-base font-black text-[#0F172A]">Filter Campaigns</h3>
                  <p className="text-xs text-[#475569] font-semibold">Filter campaigns by type</p>
                </div>
                <button 
                  onClick={() => setShowFilterModal(false)} 
                  className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-[#475569] hover:text-[#0F172A] cursor-pointer border-none"
                  aria-label="Close Filters"
                >
                  <X size={14} />
                </button>
              </div>

              <div className="space-y-3.5">
                {(["Surveys", "Games", "Apps"] as const).map((type) => {
                  const active = filterType.includes(type)
                  return (
                    <button
                      key={type}
                      onClick={() => {
                        if (active) {
                          setFilterType(filterType.filter(t => t !== type))
                        } else {
                          setFilterType([...filterType, type])
                        }
                      }}
                      className="w-full flex items-center justify-between p-3.5 rounded-xl border border-[#E2E8F0] bg-slate-50 text-xs font-bold text-[#0F172A] shadow-sm cursor-pointer"
                    >
                      <span>{type}</span>
                      <div className={`w-5 h-5 rounded border flex items-center justify-center ${active ? "bg-[#4F46E5] border-[#4F46E5] text-white" : "border-[#E2E8F0]"}`}>
                        {active && <Check size={14} strokeWidth={3} />}
                      </div>
                    </button>
                  )
                })}
              </div>

              <PremiumCTA onClick={() => setShowFilterModal(false)} className="py-4.5 rounded-[18px]">
                Apply Filters
              </PremiumCTA>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Bottom Elevated Navigation Bar inside main page */}
      <div className="flex border-t border-[#E2E8F0] bg-white pt-1 pb-6 relative z-10 shadow-[0_-4px_16px_rgba(0,0,0,0.03)]">
        {([
          { Icon: Home,     label: "Home",     color: "emerald" },
          { Icon: List,     label: "Offers",   color: "cyan" },
          { Icon: Award,    label: "Rewards",  color: "rose" },
          { Icon: Wallet,   label: "Wallet",   color: "gold" },
          { Icon: User,     label: "Profile",  color: "slate" },
        ] as const).map(({ Icon, label, color }) => {
          const active = activeTab === label
          return (
            <button 
              key={label}
              onClick={() => setActiveTab(label)}
              aria-label={`Tab: ${label}`}
              className="flex-1 flex flex-col items-center gap-1.5 py-2.5 relative cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5] rounded-xl group border-none bg-transparent"
            >
              {active && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute inset-x-2 inset-y-1 rounded-xl bg-[#4F46E5]/5 border border-[#4F46E5]/10 z-0 pointer-events-none"
                  transition={{ type: "spring", stiffness: 220, damping: 25 }}
                />
              )}
              <div className="z-10 relative flex flex-col items-center justify-center">
                <motion.div
                  animate={active ? { scale: [1, 1.2, 1], y: [0, -1, 0] } : {}}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <Icon 
                    size={18} 
                    strokeWidth={active ? 2.5 : 1.75} 
                    className={active ? (color === "emerald" ? "text-[#4F46E5]" : color === "cyan" ? "text-cyan-600" : color === "gold" ? "text-[#D97706]" : color === "rose" ? "text-rose-500" : "text-slate-800") : "text-[#94A3B8] transition-colors group-hover:text-zinc-500"} 
                  />
                </motion.div>
                {active && (
                  <span className={`absolute -bottom-1.5 w-1 h-1 rounded-full filter blur-[0.5px] opacity-60 ${color === "emerald" ? "bg-[#4F46E5]" : color === "cyan" ? "bg-cyan-600" : color === "gold" ? "bg-[#D97706]" : color === "rose" ? "bg-rose-500" : "bg-slate-800"}`} />
                )}
              </div>
              <span className={`text-[9px] font-bold z-10 relative transition-colors ${active ? "text-[#0F172A]" : "text-[#94A3B8] group-hover:text-zinc-500"}`}>
                {label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

// --- Screen 3 — Notification Simulator ---
function NotificationCard({
  title,
  body,
  time,
  onAction,
  actionLabel = "View task",
}: {
  title: string
  body: string
  time: string
  onAction: () => void
  actionLabel?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -40, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 220, damping: 28 }}
      whileHover={{ y: -0.5 }}
      className="rounded-2xl overflow-hidden bg-white/85 backdrop-blur-md border border-[#E2E8F0] shadow-[0_4px_16px_rgba(0,0,0,0.04)] relative"
    >
      {/* App Identifier Bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-50/50 border-b border-[#E2E8F0]">
        <div className="w-[18px] h-[18px] rounded-[5px] bg-[#4F46E5] flex items-center justify-center text-[9px] font-black text-white flex-shrink-0 shadow-sm">
          M
        </div>
        <p className="flex-1 text-[11px] font-bold text-slate-800 tracking-tight">MONEYHI DUO</p>
        <p className="text-[10px] text-[#94A3B8] font-semibold">{time}</p>
        <button className="ml-1 opacity-60 hover:opacity-100 transition-opacity cursor-pointer border-none bg-transparent">
          <X size={11} strokeWidth={2.5} className="text-[#94A3B8]" />
        </button>
      </div>

      {/* Content */}
      <div className="px-4 py-3 text-slate-800">
        <p className="text-[13px] font-bold leading-tight">
          {title}
        </p>
        <p className="text-[11.5px] leading-snug text-[#475569] mt-1 font-medium">{body}</p>
      </div>

      {/* iOS Action Buttons */}
      <div className="flex border-t border-[#E2E8F0] bg-slate-50/20">
        <motion.button
          onClick={onAction}
          whileTap={{ scale: 0.98 }}
          className="flex-1 py-2.5 text-xs font-bold text-[#4F46E5] hover:bg-slate-100/50 active:bg-slate-50 border-r border-[#E2E8F0] transition-colors cursor-pointer border-none bg-transparent"
        >
          {actionLabel}
        </motion.button>
        <motion.button
          onClick={onAction}
          whileTap={{ scale: 0.98 }}
          className="flex-1 py-2.5 text-xs font-bold text-[#475569] hover:bg-slate-100/50 active:bg-slate-50 transition-colors cursor-pointer border-none bg-transparent"
        >
          Later
        </motion.button>
      </div>
    </motion.div>
  )
}

function NotificationScreen({ onRestart }: { onRestart: () => void }) {
  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-[#EEF2FF] via-[#FDF2F8] to-[#ECFDF5] text-slate-800 overflow-hidden relative select-none">
      
      {/* Lockscreen Time Display */}
      <div className="text-center pt-8 pb-4 space-y-0.5 z-10">
        <p className="text-[11px] font-bold tracking-wider text-slate-500 uppercase">
          Friday, June 26
        </p>
        <p className="text-6xl font-light tracking-tighter text-slate-700">
          9:41
        </p>
        <div className="flex items-center justify-center gap-1 text-[10px] text-slate-500 font-semibold pt-1">
          <Lock size={10} strokeWidth={2.5} />
          <span>Lock Screen Simulator</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 space-y-6 pb-6 z-10 scrollbar-none">
        
        {/* Variant A Notification block */}
        <motion.div className="space-y-2" {...cardEntrance(0)}>
          <div className="flex items-center gap-1.5 px-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4F46E5]" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Variant A · Goal Achievement</span>
            <span className="text-[10px] text-slate-400 font-medium">• 2 PM Trigger</span>
          </div>
          
          <NotificationCard
            title="You're only 80 coins away from a milestone"
            body="One 8-minute survey gets you there. Your Day 2 streak bonus unlocks at 200 coins."
            time="2:14 PM"
            onAction={onRestart}
            actionLabel="Start survey"
          />
          <p className="text-[11px] text-[#475569] leading-snug px-1 pt-0.5 font-medium">
            💡 Highlight proximity (&quot;Only 80 coins&quot;) to make the milestone feel highly achievable and reduce task hesitation.
          </p>
        </motion.div>

        {/* Variant B Notification block */}
        <motion.div className="space-y-2" {...cardEntrance(1)}>
          <div className="flex items-center gap-1.5 px-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D97706]" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Variant B · Loss Aversion</span>
            <span className="text-[10px] text-slate-400 font-medium">• 7 PM Trigger</span>
          </div>
          
          <NotificationCard
            title="Your streak ends tonight"
            body="One task today keeps your Day 2 bonus alive. 10 minutes is all it takes."
            time="7:00 PM"
            onAction={onRestart}
            actionLabel="Keep my streak"
          />
          <p className="text-[11px] text-[#475569] leading-snug px-1 pt-0.5 font-medium">
            💡 Frames the notification as protecting an existing asset (your streak) rather than earning something new.
          </p>
        </motion.div>

        {/* Copy principles card */}
        <motion.div 
          className="rounded-2xl bg-white/80 backdrop-blur-md border border-[#E2E8F0] p-4 space-y-3 shadow-sm"
          {...cardEntrance(2)}
        >
          <div className="flex items-center gap-1.5">
            <Bell size={13} className="text-[#4F46E5]" />
            <p className="text-[11px] font-bold tracking-wider text-slate-800 uppercase">Design Copy Principles</p>
          </div>
          
          <div className="space-y-2.5">
            {[
              { rule: "Specific over generic", note: "\"80 coins\" beats \"you are close to cashout\"" },
              { rule: "Loss over gain", note: "\"Streak ends tonight\" activates immediate attention" },
              { rule: "Frictionless pathing", note: "Direct button linking removes cognitive load" },
              { rule: "\"Later\" soft dismiss", note: "Leaves the user's intent open for re-entry" },
            ].map(({ rule, note }) => (
              <div key={rule} className="flex gap-2">
                <div className="w-1.5 h-1.5 rounded-full mt-1.5 bg-[#4F46E5]/20 flex-shrink-0" />
                <p className="text-[11px] leading-relaxed text-[#475569] font-medium">
                  <span className="font-bold text-slate-800">{rule}</span>
                  {" — "}{note}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Footer System Control */}
      <div className="px-6 py-4 border-t border-[#E2E8F0] bg-white/50 backdrop-blur-sm z-10">
        <motion.button
          onClick={onRestart}
          whileTap={{ scale: 0.98 }}
          className="w-full py-3 rounded-xl text-xs font-bold text-slate-800 bg-[#F8FAFC] hover:bg-white border border-slate-200 active:bg-slate-100 transition-all text-center cursor-pointer shadow-[0_2px_4px_rgba(0,0,0,0.02)]"
        >
          Restart Simulation
        </motion.button>
      </div>
    </div>
  )
}

// --- Screen 2 · Notification Center ---
function NotificationCenterScreen({ onBack }: { onBack: () => void }) {
  const notifsNew = [
    { icon: Zap, title: "You earned 240 XP", sub: "Mission “Daily Spin” completed", time: "2m", color: "blue" },
    { icon: Wallet, title: "₹100 withdrawn successfully", sub: "Sent to UPI •••• 4821", time: "12m", color: "slate" },
    { icon: Trophy, title: "Achievement unlocked", sub: "“First Withdrawal” badge earned", time: "15m", color: "gold" }
  ]
  const notifsOld = [
    { icon: Flame, title: "Keep your streak alive", sub: "Complete 1 task before midnight", time: "1h", color: "gold" },
    { icon: Star, title: "New high-reward offer", sub: "Earn ₹450 — open a demat account", time: "3h", color: "blue" },
    { icon: Gift, title: "Reward available to claim", sub: "A ₹50 bonus is waiting for you", time: "5h", color: "emerald" },
    { icon: CheckCircle2, title: "Mission completed", sub: "“Watch 2 videos” marked done", time: "1d", color: "slate" }
  ]

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC] text-[#0F172A] select-none relative overflow-hidden">
      <GlobalStyles />
      <ScreenBackground />
      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-12 pb-2 relative z-10">
        <div className="flex items-center gap-2">
          <motion.button
            onClick={onBack}
            whileTap={{ scale: 0.93 }}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-[#475569] hover:text-[#0F172A] transition-all cursor-pointer mr-1"
          >
            <ArrowLeft size={16} strokeWidth={2.5} />
          </motion.button>
          <h2 className="text-[17px] font-black text-[#0F172A]">Notifications</h2>
          <span className="text-[10px] font-extrabold text-[#4F46E5] bg-[#4F46E5]/10 px-2 py-0.5 rounded-full border border-[#4F46E5]/20">3 new</span>
        </div>
        <span className="text-xs font-bold text-[#4F46E5] cursor-pointer hover:underline">Mark all read</span>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 py-4 px-6 relative z-10 scrollbar-none">
        <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">NEW</p>
        <div className="space-y-2.5">
          {notifsNew.map((n, i) => (
            <div key={i} className="flex items-start gap-3.5 p-3.5 rounded-xl border border-[#4F46E5]/20 bg-white shadow-sm">
              <GlowIcon icon={n.icon} color={n.color as any} containerSize="w-10 h-10" size={18} glow={false} />
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-black text-[#0F172A]">{n.title}</h4>
                <p className="text-[11px] text-[#475569] font-medium mt-0.5 leading-snug">{n.sub}</p>
              </div>
              <span className="text-[9.5px] text-[#94A3B8] font-semibold flex-shrink-0">{n.time}</span>
            </div>
          ))}
        </div>

        <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 pt-2">EARLIER</p>
        <div className="space-y-2.5">
          {notifsOld.map((n, i) => (
            <div key={i} className="flex items-start gap-3.5 p-3.5 rounded-xl border border-[#E2E8F0] bg-white opacity-85 shadow-sm">
              <GlowIcon icon={n.icon} color="slate" containerSize="w-10 h-10" size={18} glow={false} />
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-black text-[#475569]">{n.title}</h4>
                <p className="text-[11px] text-[#94A3B8] font-medium mt-0.5 leading-snug">{n.sub}</p>
              </div>
              <span className="text-[9.5px] text-[#94A3B8] font-semibold flex-shrink-0">{n.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// --- Screen 5 · Achievement Center ---
function AchievementsScreen({ onBack }: { onBack: () => void }) {
  const achievements = [
    { icon: Trophy, title: "First Withdrawal", sub: "Cash out for the first time", isProg: false, prog: 100, label: "Completed", type: "success" },
    { icon: Flame, title: "7 Day Streak", sub: "Earn every day for a week", isProg: true, prog: 57, label: "4 / 7 days", type: "amber" },
    { icon: Wallet, title: "₹1,000 Earned", sub: "Reach ₹1,000 lifetime earnings", isProg: true, prog: 34, label: "₹340 / ₹1,000", type: "blue" },
    { icon: Trophy, title: "Offer Master", sub: "Complete 25 offers", isProg: true, prog: 20, label: "5 / 25 offers", type: "rose" },
    { icon: Users, title: "Referral Champion", sub: "Invite 10 friends to join", isProg: false, prog: 0, label: "Locked", type: "locked" }
  ]

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC] text-[#0F172A] select-none relative overflow-hidden">
      <GlobalStyles />
      <ScreenBackground />
      {/* Header */}
      <div className="flex items-center gap-2 px-6 pt-12 pb-2 relative z-10">
        <motion.button
          onClick={onBack}
          whileTap={{ scale: 0.93 }}
          className="w-8 h-8 flex items-center justify-center rounded-lg text-[#475569] hover:text-[#0F172A] transition-all cursor-pointer mr-1"
        >
          <ArrowLeft size={16} strokeWidth={2.5} />
        </motion.button>
        <h2 className="text-[17px] font-black text-[#0F172A]">Achievements</h2>
        <span className="text-[10px] font-extrabold text-[#4F46E5] bg-[#4F46E5]/10 px-2.5 py-0.5 rounded-full border border-[#4F46E5]/20">1 / 5</span>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 py-4 px-6 relative z-10 scrollbar-none">
        {/* Summary Grid */}
        <div className="grid grid-cols-3 gap-2">
          <div className="p-3 border border-[#E2E8F0] rounded-xl bg-white text-center">
            <div className="text-base font-black text-[#10B981]">1</div>
            <div className="text-[9px] text-[#94A3B8] font-bold mt-0.5">Completed</div>
          </div>
          <div className="p-3 border border-[#E2E8F0] rounded-xl bg-white text-center">
            <div className="text-base font-black text-[#4F46E5]">3</div>
            <div className="text-[9px] text-[#94A3B8] font-bold mt-0.5">In progress</div>
          </div>
          <div className="p-3 border border-[#E2E8F0] rounded-xl bg-white text-center">
            <div className="text-base font-black text-slate-400">1</div>
            <div className="text-[9px] text-[#94A3B8] font-bold mt-0.5">Locked</div>
          </div>
        </div>

        {/* List */}
        <div className="space-y-3 pt-2">
          {achievements.map((a, i) => {
            const isLocked = a.type === "locked"
            const isDone = a.label === "Completed"
            return (
              <div 
                key={i} 
                className={`flex items-center gap-3.5 p-3.5 rounded-xl border bg-white relative overflow-hidden ${
                  isLocked ? "opacity-60 border-slate-100" : "border-[#E2E8F0]"
                }`}
              >
                <GlowIcon 
                  icon={a.icon} 
                  color={isLocked ? "slate" : isDone ? "emerald" : a.type as any} 
                  containerSize="w-11 h-11" 
                  size={20} 
                  glow={false} 
                />
                
                <div className="flex-1 min-w-0 space-y-1">
                  <h4 className="text-xs font-black text-[#0F172A]">{a.title}</h4>
                  <p className="text-[10.5px] text-[#475569] font-medium leading-none">{a.sub}</p>
                  {a.isProg && (
                    <div className="mt-1.5">
                      <ProgressBar pct={a.prog} />
                    </div>
                  )}
                </div>

                <span className={`text-[9.5px] font-extrabold px-2 py-0.5 rounded-full flex-shrink-0 ${
                  isDone 
                    ? "text-[#10B981] bg-emerald-50 border border-emerald-200/50" 
                    : isLocked 
                    ? "text-slate-400 bg-slate-50 border border-slate-200" 
                    : "text-[#4F46E5] bg-[#4F46E5]/5 border border-[#4F46E5]/15"
                }`}>
                  {a.label}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// --- Screen 7 · Offer Details ---
function OfferDetailsScreen({ onBack }: { onBack: () => void }) {
  const offerRules = [
    { num: "1", text: "Install the app using the button below" },
    { num: "2", text: "Open the app and complete the quick tutorial" },
    { num: "3", text: "Reach level 10 within 7 days" },
    { num: "4", text: "Reward credits to your wallet within 48 hours" }
  ]

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC] text-[#0F172A] select-none relative overflow-hidden">
      <GlobalStyles />
      <ScreenBackground />

      {/* Header Bar */}
      <div className="flex items-center justify-between px-6 pt-12 pb-2 relative z-10">
        <motion.button
          onClick={onBack}
          whileTap={{ scale: 0.93 }}
          className="w-8 h-8 flex items-center justify-center rounded-lg text-[#475569] hover:text-[#0F172A] transition-all cursor-pointer"
        >
          <ArrowLeft size={16} strokeWidth={2.5} />
        </motion.button>
        <span className="text-[13px] font-extrabold text-[#475569] uppercase tracking-widest">Offer Details</span>
        <motion.button
          whileTap={{ scale: 0.93 }}
          className="w-8 h-8 flex items-center justify-center rounded-lg text-[#475569] hover:text-[#0F172A] transition-all cursor-pointer"
        >
          <Share size={16} strokeWidth={2.5} />
        </motion.button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-5 pb-28 pt-4 px-6 relative z-10 scrollbar-none">
        {/* Banner Area */}
        <div className="relative h-[130px] rounded-2xl overflow-hidden bg-gradient-to-br from-[#4F46E5]/10 to-[#6366F1]/5 border border-[#4F46E5]/20 flex items-center justify-center shadow-sm">
          <Briefcase size={44} className="text-[#4F46E5]/80" />
          <div className="absolute top-3 left-3 text-[9px] font-black text-[#4F46E5] uppercase tracking-wider bg-white/90 px-2 py-0.5 rounded border border-[#4F46E5]/10">offer_artwork.png</div>
          <div className="absolute bottom-3 right-3 flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-[#4F46E5] to-[#6366F1] text-white font-extrabold text-sm shadow-md">
            <MiniCoinIcon size={14} className="filter brightness-0 invert" />
            <span>₹450</span>
          </div>
        </div>

        {/* Title and Category */}
        <div className="space-y-1">
          <span className="text-[9.5px] font-extrabold uppercase tracking-widest text-[#4F46E5]">FINANCE · TIER 1</span>
          <h2 className="text-[20px] font-black text-[#0F172A] leading-tight">Open a Demat Account</h2>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-3 gap-2">
          <div className="p-3 border border-[#E2E8F0] rounded-xl bg-white text-center">
            <Clock size={16} className="text-[#4F46E5] mx-auto" />
            <div className="text-[11.5px] font-black text-[#0F172A] mt-1.5">~15 min</div>
            <div className="text-[8.5px] text-[#94A3B8] font-bold mt-1">Est. time</div>
          </div>
          <div className="p-3 border border-[#E2E8F0] rounded-xl bg-white text-center">
            <TrendingUp size={16} className="text-[#4F46E5] mx-auto" />
            <div className="text-[11.5px] font-black text-[#0F172A] mt-1.5">Medium</div>
            <div className="text-[8.5px] text-[#94A3B8] font-bold mt-1">Difficulty</div>
          </div>
          <div className="p-3 border border-[#E2E8F0] rounded-xl bg-white text-center">
            <Unlock size={16} className="text-[#4F46E5] mx-auto" />
            <div className="text-[11.5px] font-black text-[#0F172A] mt-1.5">48 hrs</div>
            <div className="text-[8.5px] text-[#94A3B8] font-bold mt-1">Payout</div>
          </div>
        </div>

        {/* User Progress */}
        <div className="p-4 rounded-xl border border-[#4F46E5]/20 bg-gradient-to-br from-white to-[#4F46E5]/5 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-[#0F172A]">Your progress</span>
            <span className="text-[#4F46E5]">Step 1 of 3</span>
          </div>
          <div className="flex gap-1.5 pt-1">
            <div className="flex-1 h-1.5 rounded-full bg-[#4F46E5]" />
            <div className="flex-1 h-1.5 rounded-full bg-[#E2E8F0]" />
            <div className="flex-1 h-1.5 rounded-full bg-[#E2E8F0]" />
          </div>
        </div>

        {/* How it works */}
        <div className="space-y-3">
          <h3 className="text-xs font-black uppercase tracking-wider text-[#0F172A]">How it works</h3>
          <div className="space-y-3">
            {offerRules.map((rule, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="w-6 h-6 flex-shrink-0 rounded-lg bg-[#4F46E5]/10 text-[#4F46E5] font-black text-xs flex items-center justify-center border border-[#4F46E5]/20">{rule.num}</div>
                <p className="text-xs text-[#475569] font-medium leading-relaxed pt-0.5">{rule.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sticky footer CTA */}
      <div className="absolute left-0 right-0 bottom-0 px-4 pt-6 pb-8 bg-gradient-to-t from-[#F8FAFC] via-[#F8FAFC]/95 to-transparent z-20">
        <PremiumCTA onClick={onBack}>
          Start Offer · Earn ₹450
        </PremiumCTA>
      </div>
    </div>
  )
}

// --- Empty States Component ---
function EmptyStateScreen({
  icon: Icon,
  title,
  sub,
  btnLabel,
  onAction
}: {
  icon: React.ElementType
  title: string
  sub: string
  btnLabel: string
  onAction: () => void
}) {
  return (
    <div className="flex flex-col h-full bg-[#F8FAFC] text-[#0F172A] select-none relative overflow-hidden">
      <GlobalStyles />
      <ScreenBackground />
      <div className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-6">
        <div className="relative w-28 h-28 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-[#4F46E5]/5 border border-[#4F46E5]/10" />
          <div className="w-20 h-20 rounded-full bg-[#4F46E5]/10 border border-[#4F46E5]/20 flex items-center justify-center shadow-inner">
            <Icon size={34} className="text-[#4F46E5]" />
          </div>
        </div>
        <div className="space-y-2 max-w-[260px] mx-auto">
          <h3 className="text-[18px] font-black text-[#0F172A] tracking-tight">{title}</h3>
          <p className="text-xs text-[#475569] font-medium leading-relaxed">{sub}</p>
        </div>
        <button
          onClick={onAction}
          className="h-11 px-6 rounded-xl bg-[#4F46E5] text-white font-extrabold text-xs shadow-md border-none cursor-pointer hover:bg-[#6366F1] transition-all"
        >
          {btnLabel}
        </button>
      </div>
    </div>
  )
}

// --- Loading Skeleton Screen ---
function LoadingSkeletonScreen() {
  return (
    <div className="flex flex-col h-full bg-[#F8FAFC] text-[#0F172A] select-none relative overflow-hidden">
      <GlobalStyles />
      <ScreenBackground />
      {/* Header Skeleton */}
      <div className="flex items-center gap-3 px-6 pt-12 pb-2 relative z-10">
        <div className="w-10 h-10 rounded-full bg-slate-200 animate-pulse flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="w-24 h-3 bg-slate-200 rounded animate-pulse" />
          <div className="w-16 h-2.5 bg-slate-100 rounded animate-pulse" />
        </div>
        <div className="w-8 h-8 rounded-lg bg-slate-100 animate-pulse" />
      </div>

      <div className="flex-1 overflow-y-auto space-y-5 py-5 px-6 relative z-10 scrollbar-none animate-fade-in">
        {/* Large Card Skeleton */}
        <div className="h-28 rounded-2xl border border-[#E2E8F0] bg-white p-4.5 space-y-4">
          <div className="w-28 h-3 bg-slate-100 rounded animate-pulse" />
          <div className="w-20 h-8 bg-slate-200 rounded animate-pulse" />
        </div>

        {/* Medium Card Skeleton */}
        <div className="h-24 rounded-2xl border border-[#E2E8F0] bg-white p-4.5 space-y-3">
          <div className="w-32 h-3 bg-slate-100 rounded animate-pulse" />
          <div className="h-2 w-full bg-slate-100 rounded" />
        </div>

        {/* Item List Skeletons */}
        <div className="space-y-3">
          <div className="w-28 h-3 bg-slate-200 rounded animate-pulse mb-1.5" />
          {[1, 2].map((i) => (
            <div key={i} className="flex items-center gap-3.5 p-3.5 rounded-xl border border-slate-100 bg-white">
              <div className="w-10 h-10 rounded-xl bg-slate-100 animate-pulse flex-shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="w-36 h-3 bg-slate-100 rounded animate-pulse" />
                <div className="w-24 h-2.5 bg-slate-50 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>

        {/* Loader Status */}
        <div className="flex items-center justify-center gap-2 pt-4 text-xs font-bold text-[#475569]">
          <div className="w-3.5 h-3.5 border-2 border-[#4F46E5]/30 border-t-[#4F46E5] rounded-full animate-spin" />
          <span>Loading your dashboard…</span>
        </div>
      </div>
    </div>
  )
}

// --- Error Network Screen ---
function ErrorNetworkScreen({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex flex-col h-full bg-[#F8FAFC] text-[#0F172A] select-none relative overflow-hidden">
      <GlobalStyles />
      <ScreenBackground />
      <div className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-6">
        <div className="relative w-28 h-28 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-red-500/5 border border-red-500/10" />
          <div className="w-20 h-20 rounded-full bg-red-500/10 border border-red-500/25 flex items-center justify-center shadow-inner">
            <WifiOff size={34} className="text-red-500" />
          </div>
        </div>
        <div className="space-y-2 max-w-[260px] mx-auto">
          <h3 className="text-[18px] font-black text-[#0F172A] tracking-tight">No internet connection</h3>
          <p className="text-xs text-[#475569] font-medium leading-relaxed">We couldn't reach the server. Check your connection and try again.</p>
        </div>
        <button
          onClick={onRetry}
          className="h-11 w-44 rounded-xl bg-[#4F46E5] text-white font-extrabold text-xs shadow-md border-none cursor-pointer hover:bg-[#6366F1] transition-all flex items-center justify-center gap-1.5"
        >
          <SlidersHorizontal size={13} className="rotate-90" />
          Try again
        </button>
        <span className="text-xs font-bold text-[#475569] cursor-pointer hover:underline">Go to offline mode</span>
      </div>
    </div>
  )
}

// --- Error Payment Failed Screen ---
function ErrorPaymentScreen({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex flex-col h-full bg-[#F8FAFC] text-[#0F172A] select-none relative overflow-hidden">
      <GlobalStyles />
      <ScreenBackground />
      <div className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-6">
        <div className="relative w-28 h-28 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-red-500/5 border border-red-500/10" />
          <div className="w-20 h-20 rounded-full bg-red-500/10 border border-red-500/25 flex items-center justify-center shadow-inner">
            <AlertCircle size={36} className="text-red-500" />
          </div>
        </div>
        <div className="space-y-2 max-w-[260px] mx-auto">
          <h3 className="text-[18px] font-black text-[#0F172A] tracking-tight">Withdrawal failed</h3>
          <p className="text-xs text-[#475569] font-medium leading-relaxed">Your ₹100 withdrawal couldn't be processed. No money has left your wallet.</p>
        </div>
        <div className="w-full p-4 rounded-xl border border-red-200/50 bg-red-50/50 text-left flex items-start gap-2.5">
          <Info size={16} className="text-red-500 mt-0.5 flex-shrink-0" />
          <p className="text-[11.5px] text-[#475569] font-semibold leading-relaxed">UPI gateway timed out. This usually resolves within a few minutes.</p>
        </div>
        <button
          onClick={onRetry}
          className="w-full h-11 rounded-xl bg-[#4F46E5] text-white font-extrabold text-xs shadow-md border-none cursor-pointer hover:bg-[#6366F1] transition-all flex items-center justify-center gap-1.5"
        >
          Retry withdrawal
        </button>
        <span className="text-xs font-bold text-[#475569] cursor-pointer hover:underline">Contact support</span>
      </div>
    </div>
  )
}

// --- Screen 15 · Bottom Navigation States Screen ---
function BottomNavStatesScreen() {
  const tabs = [
    { Icon: Home, label: "Home", color: "emerald" },
    { Icon: List, label: "Offers", color: "cyan" },
    { Icon: Award, label: "Rewards", color: "rose" },
    { Icon: Wallet, label: "Wallet", color: "gold" },
    { Icon: User, label: "Profile", color: "slate" },
  ] as const

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC] text-[#0F172A] select-none relative overflow-hidden">
      <GlobalStyles />
      <ScreenBackground />
      {/* Header */}
      <div className="px-6 pt-12 pb-2 relative z-10">
        <h2 className="text-[16px] font-black text-[#0F172A]">Bottom Navigation States</h2>
        <p className="text-[11px] text-[#475569] font-medium mt-0.5">Active state shown per tab · filled icon, blue label & indicator dot.</p>
      </div>

      <div className="flex-1 overflow-y-auto space-y-5 py-4 px-6 relative z-10 scrollbar-none">
        {tabs.map((activeTab) => (
          <div key={activeTab.label} className="space-y-1.5">
            <p className="text-[9px] font-extrabold uppercase tracking-widest text-[#4F46E5] px-1">{activeTab.label} ACTIVE</p>
            <div className="rounded-xl border border-[#E2E8F0] overflow-hidden bg-white shadow-sm flex py-1">
              {tabs.map(({ Icon, label, color }) => {
                const active = activeTab.label === label
                return (
                  <div 
                    key={label}
                    className="flex-1 flex flex-col items-center gap-1.5 py-2 relative rounded-lg"
                  >
                    {active && (
                      <div className="absolute inset-x-2 inset-y-1 rounded-xl bg-[#4F46E5]/5 border border-[#4F46E5]/10 z-0 pointer-events-none" />
                    )}
                    <div className="z-10 relative flex flex-col items-center justify-center">
                      <Icon 
                        size={17} 
                        strokeWidth={active ? 2.5 : 1.75} 
                        className={active ? "text-[#4F46E5]" : "text-[#94A3B8]"} 
                      />
                      {active && (
                        <span className="absolute -bottom-1.5 w-1 h-1 rounded-full bg-[#4F46E5]" />
                      )}
                    </div>
                    <span className={`text-[8.5px] font-black z-10 relative ${active ? "text-[#0F172A]" : "text-[#94A3B8]"}`}>
                      {label}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// --- Status bar ---
function StatusBar() {
  return (
    <div
      className="absolute top-0 left-0 right-0 z-40 flex justify-between items-center text-[#0F172A] pointer-events-none select-none"
      style={{ padding: "17px 28px 0", fontSize: 13, fontWeight: 700 }}
    >
      <span>9:41</span>
      <div className="flex items-center gap-1.5">
        <svg width="17" height="12" viewBox="0 0 17 12" fill="currentColor">
          <rect x="0"    y="7" width="3" height="5"  rx="1" opacity=".4" />
          <rect x="4.5"  y="5" width="3" height="7"  rx="1" opacity=".7" />
          <rect x="9"    y="2" width="3" height="10" rx="1" opacity=".9" />
          <rect x="13.5" y="0" width="3" height="12" rx="1" />
        </svg>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor">
          <circle cx="8" cy="10.5" r="1.5" />
          <path d="M5.4 8.1C6.2 7.3 7 7 8 7s1.8.3 2.6 1.1l1.4-1.4C10.8 5.5 9.5 5 8 5S5.2 5.5 4 6.7z" opacity=".7" />
          <path d="M3 5.7C4.3 4.4 6 3.5 8 3.5s3.7.9 5 2.2l1.4-1.4C12.8 2.7 10.6 2 8 2S3.2 2.7 1.6 4.3z" opacity=".4" />
        </svg>
        <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
          <rect x="0.5" y="0.5" width="21" height="11" rx="2.5" stroke="currentColor" strokeOpacity=".4" />
          <rect x="22"  y="3.5" width="2.5" height="5"  rx="1" fill="currentColor" fillOpacity=".4" />
          <rect x="2"   y="2"   width="17"  height="8"  rx="1.5" fill="currentColor" />
        </svg>
      </div>
    </div>
  )
}

// --- Root Page Component ---
export default function PrototypePage() {
  const [screen, setScreen] = useState<Screen>(0)
  const go = (s: Screen) => setScreen(s)

  return (
    <div
      className={`${sora.className} ${manrope.className} min-h-screen flex flex-col items-center justify-center gap-6 py-10`}
      style={{ background: "#F1F5F9" }}
    >
      {/* Phone chassis shell */}
      <div
        className="relative overflow-hidden flex-shrink-0"
        style={{
          width: 390,
          height: 844,
          borderRadius: 52,
          background: "#000",
          boxShadow: [
            "0 0 0 2px #2C2C2E",
            "0 0 0 10px #1C1C1E",
            "0 0 0 12px #3A3A3C",
            "0 40px 100px rgba(0,0,0,0.40)",
            "0 8px 24px rgba(0,0,0,0.22)",
          ].join(", "),
        }}
      >
        {/* Dynamic Island Area */}
        <div
          className="absolute z-50 pointer-events-none"
          style={{
            top: 14, left: "50%", transform: "translateX(-50%)",
            width: 110, height: 30, borderRadius: 20, background: "#000",
          }}
        />
        
        <StatusBar />
        
        <div
          className="absolute inset-0 overflow-hidden bg-[#F8FAFC]"
          style={{ borderRadius: 52, paddingTop: 0, paddingBottom: 0 }}
        >
          <div className="h-full relative">
            <AnimatePresence mode="wait">
              {screen === 0 && (
                <motion.div
                  key="screen-0"
                  initial={{ opacity: 0, x: 25 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -25 }}
                  transition={springProps}
                  className="h-full w-full absolute inset-0"
                >
                  <CashoutSuccess onNext={() => go(1)} />
                </motion.div>
              )}
              {screen === 1 && (
                <motion.div
                  key="screen-1"
                  initial={{ opacity: 0, x: 25 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -25 }}
                  transition={springProps}
                  className="h-full w-full absolute inset-0"
                >
                  <NextGoal onStart={() => go(3)} onHome={() => go(3)} />
                </motion.div>
              )}
              {screen === 2 && (
                <motion.div
                  key="screen-2"
                  initial={{ opacity: 0, x: 25 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -25 }}
                  transition={springProps}
                  className="h-full w-full absolute inset-0"
                >
                  <NotificationCenterScreen onBack={() => go(3)} />
                </motion.div>
              )}
              {screen === 3 && (
                <motion.div
                  key="screen-3"
                  initial={{ opacity: 0, x: 25 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -25 }}
                  transition={springProps}
                  className="h-full w-full absolute inset-0"
                >
                  <HomeScreen onGoal={() => go(1)} initialTab="Home" />
                </motion.div>
              )}
              {screen === 4 && (
                <motion.div
                  key="screen-4"
                  initial={{ opacity: 0, x: 25 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -25 }}
                  transition={springProps}
                  className="h-full w-full absolute inset-0"
                >
                  <HomeScreen onGoal={() => go(1)} initialTab="Profile" />
                </motion.div>
              )}
              {screen === 5 && (
                <motion.div
                  key="screen-5"
                  initial={{ opacity: 0, x: 25 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -25 }}
                  transition={springProps}
                  className="h-full w-full absolute inset-0"
                >
                  <AchievementsScreen onBack={() => go(4)} />
                </motion.div>
              )}
              {screen === 6 && (
                <motion.div
                  key="screen-6"
                  initial={{ opacity: 0, x: 25 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -25 }}
                  transition={springProps}
                  className="h-full w-full absolute inset-0"
                >
                  <HomeScreen onGoal={() => go(1)} initialTab="Rewards" />
                </motion.div>
              )}
              {screen === 7 && (
                <motion.div
                  key="screen-7"
                  initial={{ opacity: 0, x: 25 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -25 }}
                  transition={springProps}
                  className="h-full w-full absolute inset-0"
                >
                  <OfferDetailsScreen onBack={() => go(3)} />
                </motion.div>
              )}
              {screen === 8 && (
                <motion.div
                  key="screen-8"
                  initial={{ opacity: 0, x: 25 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -25 }}
                  transition={springProps}
                  className="h-full w-full absolute inset-0"
                >
                  <HomeScreen onGoal={() => go(1)} initialTab="Wallet" />
                </motion.div>
              )}
              {screen === 9 && (
                <motion.div
                  key="screen-9"
                  initial={{ opacity: 0, x: 25 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -25 }}
                  transition={springProps}
                  className="h-full w-full absolute inset-0"
                >
                  <EmptyStateScreen 
                    icon={BellOff} 
                    title="You're all caught up" 
                    sub="New rewards, missions and streak updates will land right here." 
                    btnLabel="Explore offers" 
                    onAction={() => go(3)} 
                  />
                </motion.div>
              )}
              {screen === 10 && (
                <motion.div
                  key="screen-10"
                  initial={{ opacity: 0, x: 25 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -25 }}
                  transition={springProps}
                  className="h-full w-full absolute inset-0"
                >
                  <EmptyStateScreen 
                    icon={FileText} 
                    title="No withdrawals yet" 
                    sub="Cash out your earnings and your history will appear here." 
                    btnLabel="Withdraw now" 
                    onAction={() => go(8)} 
                  />
                </motion.div>
              )}
              {screen === 11 && (
                <motion.div
                  key="screen-11"
                  initial={{ opacity: 0, x: 25 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -25 }}
                  transition={springProps}
                  className="h-full w-full absolute inset-0"
                >
                  <EmptyStateScreen 
                    icon={CheckCircle2} 
                    title="No completed offers yet" 
                    sub="Finish your first offer to start stacking real cash rewards." 
                    btnLabel="Browse offers" 
                    onAction={() => go(3)} 
                  />
                </motion.div>
              )}
              {screen === 12 && (
                <motion.div
                  key="screen-12"
                  initial={{ opacity: 0, x: 25 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -25 }}
                  transition={springProps}
                  className="h-full w-full absolute inset-0"
                >
                  <LoadingSkeletonScreen />
                </motion.div>
              )}
              {screen === 13 && (
                <motion.div
                  key="screen-13"
                  initial={{ opacity: 0, x: 25 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -25 }}
                  transition={springProps}
                  className="h-full w-full absolute inset-0"
                >
                  <ErrorNetworkScreen onRetry={() => go(3)} />
                </motion.div>
              )}
              {screen === 14 && (
                <motion.div
                  key="screen-14"
                  initial={{ opacity: 0, x: 25 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -25 }}
                  transition={springProps}
                  className="h-full w-full absolute inset-0"
                >
                  <ErrorPaymentScreen onRetry={() => go(8)} />
                </motion.div>
              )}
              {screen === 15 && (
                <motion.div
                  key="screen-15"
                  initial={{ opacity: 0, x: 25 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -25 }}
                  transition={springProps}
                  className="h-full w-full absolute inset-0"
                >
                  <BottomNavStatesScreen />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        
        {/* iOS Home Indicator Bar */}
        <div className="absolute bottom-2 left-0 right-0 flex justify-center z-40">
          <div className="w-28 h-1 rounded-full" style={{ background: "rgba(15, 23, 42, 0.2)" }} />
        </div>
      </div>

      {/* Screen Selector controls */}
      <div className="grid grid-cols-4 gap-1.5 bg-white/75 p-3 rounded-[24px] shadow-[0_4px_16px_rgba(0,0,0,0.03)] border border-[#E2E8F0] max-w-[480px] w-full mx-auto">
        {LABELS.map((label, i) => (
          <motion.button
            key={i}
            onClick={() => go(i as Screen)}
            whileTap={{ scale: 0.94 }}
            aria-label={`Go to screen: ${label}`}
            className="flex flex-col items-center gap-1 py-1.5 rounded-xl transition-colors cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5] focus-visible:ring-offset-1"
            style={{ background: i === screen ? `${C.accent}14` : "transparent" }}
          >
            <div
              className="rounded-full transition-all duration-300"
              style={{
                width: i === screen ? 18 : 5,
                height: 5,
                background: i === screen ? C.accent : i < screen ? `${C.accent}50` : "#C4C4CC",
              }}
            />
            <span
              className="text-[9px] font-black tracking-tight whitespace-nowrap overflow-hidden text-ellipsis w-full px-1 text-center"
              style={{ color: i === screen ? C.accent : "#9CA3AF" }}
            >
              {label}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  )
}
