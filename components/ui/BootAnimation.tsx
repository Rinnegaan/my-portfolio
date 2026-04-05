"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

/* ─── Boot script phases ─────────────────────────────────────── */
const PHASES = [
  {
    label: "BIOS POST",
    lines: [
      "SPECTER\u00ae Forensic BIOS v2.4.1  (C) Specter Labs",
      "CPU: SPECTER-CORE\u2122 @ 3.80 GHz  |  CACHE: 32MB L3",
      "MEM: 65536 MB DDR5-6400  |  INTEGRITY: PASS",
      "STORAGE: NVME-ENCRYPTED  |  STATUS: VERIFIED",
      "",
      ">> Initialising hardware security module... [OK]",
      ">> TPM 2.0 attestation check............ [PASS]",
      ">> Secure boot chain validated.......... [OK]",
    ],
    duration: 1400,
  },
  {
    label: "KERNEL INIT",
    lines: [
      "[ LOAD ] specter-kernel: loading forensic modules",
      "[ LOAD ] crypto-suite:   AES-256-GCM | SHA-3 | RSA-4096",
      "[ LOAD ] osint-engine:   passive recon subsystems online",
      "[ LOAD ] evidence-fs:    mounting encrypted partitions",
      "[ LOAD ] net-monitor:    passive tap \u2014 promiscuous mode",
      "[ LOAD ] timeline-db:    artifact indexer v4.2.1 ready",
      "[ LOAD ] dfir-suite:     digital forensics env active",
    ],
    duration: 1200,
  },
  {
    label: "AUTHENTICATION",
    lines: [
      ">> IDENTITY CHALLENGE: AK_54881",
      ">> Biometric hash: \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588",
      ">> Cross-referencing clearance database...",
      ">> CREDENTIAL MATRIX: VERIFIED",
      ">> CLEARANCE LEVEL: ALPHA-7 \u2014 FULL FORENSIC ACCESS GRANTED",
    ],
    duration: 1000,
  },
];

const TOTAL_DURATION = PHASES.reduce((a, p) => a + p.duration, 0) + 600;

/* ─── Helper: random flicker character ──────────────────────── */
function randChar() {
  const chars = "01ABCDEF><|\\/-_:.!?#@$%^&*";
  return chars[Math.floor(Math.random() * chars.length)];
}

/* ─── Glitch Text ────────────────────────────────────────────── */
function GlitchText({ text }: { text: string }) {
  const [display, setDisplay] = useState(text);
  const ref = useRef<ReturnType<typeof setInterval> | null>(null);
  useEffect(() => {
    let frame = 0;
    ref.current = setInterval(() => {
      frame++;
      if (frame > 8) {
        setDisplay(text);
        if (ref.current) clearInterval(ref.current);
        return;
      }
      setDisplay(
        text.split("").map((c) => (c !== " " && Math.random() < 0.3 ? randChar() : c)).join("")
      );
    }, 40);
    return () => { if (ref.current) clearInterval(ref.current); };
  }, [text]);
  return <span>{display}</span>;
}

/* ─── Web Audio Engine ───────────────────────────────────────── */
function useBootAudio() {
  const ctxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const humRef = useRef<OscillatorNode | null>(null);
  const humGainRef = useRef<GainNode | null>(null);
  const [muted, setMuted] = useState(false);
  const mutedRef = useRef(false);

  /** Lazily create AudioContext on first user interaction */
  const ensureCtx = useCallback(() => {
    if (ctxRef.current) return ctxRef.current;
    const ctx = new AudioContext();
    const master = ctx.createGain();
    master.gain.value = 0.55;
    master.connect(ctx.destination);
    ctxRef.current = ctx;
    masterGainRef.current = master;
    return ctx;
  }, []);

  /** Keyboard click — short noise burst */
  const playClick = useCallback(() => {
    if (mutedRef.current) return;
    const ctx = ensureCtx();
    const buf = ctx.createBuffer(1, ctx.sampleRate * 0.04, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < data.length; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / data.length, 4);
    }
    const src = ctx.createBufferSource();
    src.buffer = buf;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.22, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = 4200 + Math.random() * 800;
    filter.Q.value = 0.8;
    src.connect(filter);
    filter.connect(g);
    g.connect(masterGainRef.current!);
    src.start();
    src.stop(ctx.currentTime + 0.05);
  }, [ensureCtx]);

  /** Classic BIOS single POST beep */
  const playPostBeep = useCallback(() => {
    if (mutedRef.current) return;
    const ctx = ensureCtx();
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = "square";
    osc.frequency.value = 880;
    g.gain.setValueAtTime(0.0, ctx.currentTime);
    g.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 0.01);
    g.gain.setValueAtTime(0.15, ctx.currentTime + 0.12);
    g.gain.linearRampToValueAtTime(0.0, ctx.currentTime + 0.18);
    osc.connect(g);
    g.connect(masterGainRef.current!);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.2);
  }, [ensureCtx]);

  /** Ambient low-frequency hum that runs throughout */
  const startHum = useCallback(() => {
    if (mutedRef.current) return;
    const ctx = ensureCtx();
    // Sub hum
    const hum = ctx.createOscillator();
    hum.type = "sine";
    hum.frequency.value = 55;
    const humG = ctx.createGain();
    humG.gain.value = 0.08;
    // Slight LFO wobble
    const lfo = ctx.createOscillator();
    lfo.type = "sine";
    lfo.frequency.value = 0.3;
    const lfoG = ctx.createGain();
    lfoG.gain.value = 3;
    lfo.connect(lfoG);
    lfoG.connect(hum.frequency);
    hum.connect(humG);
    humG.connect(masterGainRef.current!);
    hum.start();
    lfo.start();
    humRef.current = hum;
    humGainRef.current = humG;

    // High-freq shimmer layer
    const shimmer = ctx.createOscillator();
    shimmer.type = "sawtooth";
    shimmer.frequency.value = 440;
    const shimG = ctx.createGain();
    shimG.gain.value = 0.004;
    const shimFilter = ctx.createBiquadFilter();
    shimFilter.type = "highpass";
    shimFilter.frequency.value = 3000;
    shimmer.connect(shimFilter);
    shimFilter.connect(shimG);
    shimG.connect(masterGainRef.current!);
    shimmer.start();
  }, [ensureCtx]);

  const stopHum = useCallback(() => {
    if (humRef.current) {
      try {
        const ctx = ctxRef.current!;
        humGainRef.current!.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.4);
        humRef.current.stop(ctx.currentTime + 0.5);
      } catch {}
      humRef.current = null;
    }
  }, []);

  /** Auth verification rising arpeggio */
  const playAuthConfirm = useCallback(() => {
    if (mutedRef.current) return;
    const ctx = ensureCtx();
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5 E5 G5 C6
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = freq;
      const t = ctx.currentTime + i * 0.09;
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(0.14, t + 0.03);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
      osc.connect(g);
      g.connect(masterGainRef.current!);
      osc.start(t);
      osc.stop(t + 0.3);
    });
  }, [ensureCtx]);

  /** Launch sweep — whoosh up */
  const playLaunchSweep = useCallback(() => {
    if (mutedRef.current) return;
    const ctx = ensureCtx();
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(80, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(2400, ctx.currentTime + 0.7);
    g.gain.setValueAtTime(0, ctx.currentTime);
    g.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.1);
    g.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.75);
    osc.connect(g);
    g.connect(masterGainRef.current!);
    osc.start();
    osc.stop(ctx.currentTime + 0.8);
  }, [ensureCtx]);

  /** Toggle mute */
  const toggleMute = useCallback(() => {
    const newMuted = !mutedRef.current;
    mutedRef.current = newMuted;
    setMuted(newMuted);
    if (masterGainRef.current && ctxRef.current) {
      masterGainRef.current.gain.setValueAtTime(
        newMuted ? 0 : 0.55,
        ctxRef.current.currentTime
      );
    }
  }, []);

  /** Resume context after user gesture (browsers require it) */
  const resumeCtx = useCallback(() => {
    if (ctxRef.current?.state === "suspended") {
      ctxRef.current.resume();
    }
  }, []);

  const cleanup = useCallback(() => {
    stopHum();
    setTimeout(() => {
      try { ctxRef.current?.close(); } catch {}
    }, 600);
  }, [stopHum]);

  return { playClick, playPostBeep, startHum, stopHum, playAuthConfirm, playLaunchSweep, toggleMute, resumeCtx, cleanup, muted };
}

/* ─── Main Component ─────────────────────────────────────────── */
export default function BootAnimation() {
  const [visible, setVisible] = useState(true);
  const [phase, setPhase] = useState(0);
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [launch, setLaunch] = useState(false);
  const [glitchTitle, setGlitchTitle] = useState(false);
  const [audioStarted, setAudioStarted] = useState(false);

  const audio = useBootAudio();
  const lineTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* ── Start audio on first click anywhere ── */
  useEffect(() => {
    const startAudio = () => {
      if (!audioStarted) {
        audio.resumeCtx();
        setAudioStarted(true);
      }
    };
    window.addEventListener("click", startAudio, { once: true });
    return () => window.removeEventListener("click", startAudio);
  }, [audioStarted, audio]);

  useEffect(() => {
    if (sessionStorage.getItem("booted")) {
      setVisible(false);
      return;
    }

    let lineQueue: string[] = [];

    function scheduleLines(lines: string[], delay: number, cb: () => void) {
      let i = 0;
      function next() {
        if (i >= lines.length) { cb(); return; }
        const line = lines[i];
        lineQueue = [...lineQueue, line];
        setVisibleLines([...lineQueue]);
        // Play click for non-empty lines
        if (line.trim().length > 0) audio.playClick();
        i++;
        lineTimerRef.current = setTimeout(next, delay);
      }
      next();
    }

    function runPhase(idx: number) {
      if (idx >= PHASES.length) {
        setPhase(3);
        setLaunch(true);
        audio.playLaunchSweep();
        setTimeout(() => {
          audio.cleanup();
          sessionStorage.setItem("booted", "1");
          setVisible(false);
        }, 900);
        return;
      }
      setPhase(idx);
      setGlitchTitle(true);
      setTimeout(() => setGlitchTitle(false), 400);

      const p = PHASES[idx];
      const lineDelay = p.duration / (p.lines.length + 1);

      // Phase-specific sound cues
      if (idx === 0) {
        audio.startHum();
        setTimeout(() => audio.playPostBeep(), 80);
      }
      if (idx === 2) {
        // Auth phase: play confirm on the last line
        const authDelay = lineDelay * (PHASES[idx].lines.length - 1);
        setTimeout(() => audio.playAuthConfirm(), authDelay + 200);
      }

      scheduleLines(p.lines, lineDelay, () => {
        setTimeout(() => runPhase(idx + 1), 180);
      });
    }

    runPhase(0);

    // Progress bar
    const step = 100 / (TOTAL_DURATION / 30);
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p + step >= 100) { clearInterval(interval); return 100; }
        return p + step;
      });
    }, 30);

    return () => {
      if (lineTimerRef.current) clearTimeout(lineTimerRef.current);
      clearInterval(interval);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── Phase label colours ── */
  const phaseColors: Record<number, string> = { 0: "#94a3b8", 1: "#00E5FF", 2: "#FF2E63", 3: "#00E5FF" };

  function lineColor(line: string) {
    if (line.includes("GRANTED") || line.includes("VERIFIED") || line.includes("PASS") || line.includes("OK")) return "#00E5FF";
    if (line.includes("ALPHA") || line.includes("IDENTITY")) return "#FF2E63";
    if (line.startsWith("[ LOAD ]")) return "#7dd3fc";
    if (line.startsWith(">>")) return "#94a3b8";
    return "#64748b";
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] overflow-hidden"
          style={{ background: "#030408" }}
          onClick={audio.resumeCtx}
        >
          {/* Dot grid */}
          <div
            className="absolute inset-0 opacity-30"
            style={{ backgroundImage: "radial-gradient(rgba(0,229,255,0.06) 1px, transparent 1px)", backgroundSize: "28px 28px" }}
          />

          {/* Ambient glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,229,255,0.04) 0%, transparent 70%)" }}
          />

          {/* Scanline sweep */}
          <motion.div
            animate={{ y: ["-4%", "104%"], opacity: [0, 0.5, 0] }}
            transition={{ repeat: Infinity, duration: 2.8, ease: "linear" }}
            className="absolute left-0 right-0 h-[2px] pointer-events-none"
            style={{ background: "linear-gradient(90deg, transparent 0%, #00E5FF 50%, transparent 100%)", filter: "blur(1px)" }}
          />

          {/* CRT scanlines */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.03]"
            style={{ backgroundImage: "repeating-linear-gradient(to bottom, transparent 0px, transparent 1px, rgba(0,0,0,0.8) 2px, rgba(0,0,0,0.8) 2px)", backgroundSize: "100% 4px" }}
          />

          {/* Corner HUD brackets */}
          {[
            "top-5 left-5 border-t-2 border-l-2",
            "top-5 right-5 border-t-2 border-r-2",
            "bottom-5 left-5 border-b-2 border-l-2",
            "bottom-5 right-5 border-b-2 border-r-2",
          ].map((cls, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.5, scale: 1 }}
              transition={{ delay: i * 0.08, duration: 0.3 }}
              className={`absolute w-8 h-8 ${cls}`}
              style={{ borderColor: "#00E5FF" }}
            />
          ))}

          {/* Top status bar */}
          <div
            className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 py-2"
            style={{ borderBottom: "1px solid rgba(0,229,255,0.12)", background: "rgba(0,229,255,0.03)" }}
          >
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase" style={{ color: "#00E5FF", opacity: 0.7 }}>
              SPECTER\u00ae DFIR SYSTEM
            </span>
            <div className="flex items-center gap-4">
              <span className="font-mono text-[10px]" style={{ color: "#64748b" }}>SYS::BOOT</span>
              <motion.span
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ repeat: Infinity, duration: 1.1 }}
                className="font-mono text-[10px]"
                style={{ color: phaseColors[phase] }}
              >
                {phase < 3 ? PHASES[Math.min(phase, 2)].label : "LAUNCHING"}
              </motion.span>

              {/* Mute toggle */}
              <button
                onClick={(e) => { e.stopPropagation(); audio.toggleMute(); }}
                className="flex items-center justify-center w-6 h-6 rounded transition-opacity hover:opacity-100 opacity-60"
                style={{ color: "#00E5FF", border: "1px solid rgba(0,229,255,0.3)" }}
                title={audio.muted ? "Unmute" : "Mute"}
              >
                {audio.muted
                  ? <VolumeX size={12} />
                  : <Volume2 size={12} />
                }
              </button>
            </div>
          </div>

          {/* Main terminal window */}
          <div className="absolute inset-0 flex items-center justify-center px-4 pt-10 pb-16">
            <div className="w-full max-w-2xl">

              {/* Logo / Identity */}
              <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="flex items-center gap-3 mb-6"
              >
                <motion.span
                  animate={{ boxShadow: ["0 0 0 0 rgba(0,229,255,0.6)", "0 0 0 10px transparent"] }}
                  transition={{ repeat: Infinity, duration: 1.4 }}
                  className="w-3 h-3 rounded-full"
                  style={{ background: "#00E5FF" }}
                />
                <span className="font-mono text-xs tracking-[0.35em] uppercase" style={{ color: "#00E5FF" }}>
                  {glitchTitle
                    ? <GlitchText text="IDENTITY :: AK_54881  \u2014  FORENSIC SHELL" />
                    : "IDENTITY :: AK_54881  \u2014  FORENSIC SHELL"
                  }
                </span>
              </motion.div>

              {/* Terminal lines */}
              <div className="font-mono text-[11px] leading-relaxed space-y-[3px] mb-6 max-h-[320px] overflow-hidden" style={{ minHeight: "260px" }}>
                {visibleLines.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.15 }}
                    style={{ color: lineColor(line) }}
                  >
                    {line}
                  </motion.div>
                ))}

                {/* Cursor blink */}
                {!launch && (
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.65 }}
                    className="inline-block w-[7px] h-[13px] align-middle"
                    style={{ background: "#00E5FF" }}
                  />
                )}

                {/* Launch message */}
                {launch && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="mt-3 font-mono text-xs tracking-widest uppercase"
                    style={{ color: "#00E5FF" }}
                  >
                    {">> LAUNCHING SECURE ENVIRONMENT..."}
                  </motion.div>
                )}
              </div>

              {/* Progress bar */}
              <div className="h-[2px] w-full rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    width: `${progress}%`,
                    background: "linear-gradient(90deg, #00E5FF 0%, #3b82f6 60%, #FF2E63 100%)",
                    boxShadow: "0 0 10px rgba(0,229,255,0.5)",
                    transition: "width 0.03s linear",
                  }}
                />
              </div>

              <div className="flex justify-between mt-2">
                <span className="font-mono text-[10px] tracking-widest uppercase" style={{ color: "#475569" }}>
                  FORENSIC OS v2.4.1
                </span>
                <span className="font-mono text-[10px]" style={{ color: "#00E5FF" }}>
                  {Math.round(progress)}%
                </span>
              </div>
            </div>
          </div>

          {/* Bottom status bar */}
          <div
            className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-6 py-2"
            style={{ borderTop: "1px solid rgba(0,229,255,0.08)", background: "rgba(0,229,255,0.02)" }}
          >
            <span className="font-mono text-[10px]" style={{ color: "#1e293b" }}>
              SECURE SHELL :: ENC-AES256-GCM
            </span>
            <div className="flex items-center gap-2">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  animate={{ opacity: [0.2, 1, 0.2] }}
                  transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.3 }}
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: "#00E5FF" }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
