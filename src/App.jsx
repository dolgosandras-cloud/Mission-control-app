import React, { useState, useEffect, useRef } from "react";

// --- SUPABASE REST KONFIGURÁCIÓ ---
const SUPABASE_BASE = "https://waiiogonnyryhizxvptm.supabase.co/rest/v1";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndhaWlvZ29ubnlyeWhpenh2cHRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg0OTA5NjMsImV4cCI6MjEwNDA2Njk2M30.waiyyiAV2Vxkp2r4vgUmsMzNmhvIXWKJaXXrFhnG15k";

const HEADERS = {
  apikey: SUPABASE_KEY,
  Authorization: `Bearer ${SUPABASE_KEY}`,
  "Content-Type": "application/json"
};

// --- SVG IKONOK ---
const CheckCircleIcon = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const CircleIcon = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10" />
  </svg>
);

const TargetIcon = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

const CalendarIcon = ({ size = 18, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const LayoutGridIcon = ({ size = 18, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
  </svg>
);

const CompassIcon = ({ size = 18, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10" />
    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
  </svg>
);

const TrashIcon = ({ size = 14, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
);

const PlusIcon = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const CloudIcon = ({ size = 14, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
  </svg>
);

const EditIcon = ({ size = 15, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const ChevronLeftIcon = ({ size = 18, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const ChevronRightIcon = ({ size = 18, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const FlameIcon = ({ size = 13, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
  </svg>
);

const ThumbsUpIcon = ({ size = 13, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
  </svg>
);

// Dátumkezelők
function getTodayDateString() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function offsetDateString(baseDateStr, dayOffset) {
  const d = new Date(baseDateStr);
  d.setDate(d.getDate() + dayOffset);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function formatShortDate(dateStr) {
  if (!dateStr) return "";
  const parts = dateStr.split("-");
  return parts.length === 3 ? `${parts[1]}.${parts[2]}` : dateStr;
}

const FALLBACK_EMPTY_STATE = {
  sprint: { id: "sprint-1", name: "Sprint Fókusz", startDate: getTodayDateString(), endDate: getTodayDateString(), milestones: [] },
  tasks: [],
  habits: [],
  habitLogs: {},
  habitFreezes: {}, // { [habitId]: { count: 2, lastReset: "2026-09-01" } }
  weeklyTemplates: [
    { id: "wt1", title: "Viráglocsolás", domain: "Otthon & Lakás" },
    { id: "wt2", title: "Heti tervezés & visszatekintés", domain: "Karrier & Munka" },
    { id: "wt3", title: "Heti nagybevásárlás", domain: "Otthon & Lakás" }
  ],
  visionAreas: []
};

// Canvas konfetti effekt
function triggerConfetti() {
  const canvas = document.createElement("canvas");
  canvas.className = "fixed inset-0 pointer-events-none z-50 w-full h-full";
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = Array.from({ length: 45 }).map(() => ({
    x: canvas.width / 2,
    y: canvas.height / 3,
    vx: (Math.random() - 0.5) * 12,
    vy: (Math.random() - 0.5) * 12 - 4,
    size: Math.random() * 5 + 3,
    color: ["#10b981", "#3b82f6", "#f59e0b", "#ec4899", "#06b6d4"][Math.floor(Math.random() * 5)],
    alpha: 1
  }));

  let frame = 0;
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.3;
      p.alpha -= 0.025;
      ctx.fillStyle = p.color;
      ctx.globalAlpha = Math.max(0, p.alpha);
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    });
    frame++;
    if (frame < 45) requestAnimationFrame(animate);
    else document.body.removeChild(canvas);
  }
  animate();
}

export default function App() {
  const [activeTab, setActiveTab] = useState("today");
  const todayActualStr = getTodayDateString();
  const [selectedDate, setSelectedDate] = useState(todayActualStr);

  const [state, setState] = useState(() => {
    const saved = localStorage.getItem("mc_cloud_state");
    return saved ? JSON.parse(saved) : FALLBACK_EMPTY_STATE;
  });

  const [syncStatus, setSyncStatus] = useState("synced");
  const isInternalUpdate = useRef(false);
  const isLoadedFromServer = useRef(false);

  // Rejtett beviteli panelek a 3 feladattípushoz
  const [addingCategory, setAddingCategory] = useState(null); // "BIG3" | "SCHEDULED" | "DAILY5_MINI"
  const [newQuickTaskTitle, setNewQuickTaskTitle] = useState("");

  // Kézzel lenyitott befejezett csoportok nyilvántartása
  const [manuallyOpenedGroups, setManuallyOpenedGroups] = useState({});

  // 1. SZINKRONIZÁCIÓ SUPABASE-SZEL
  useEffect(() => {
    async function fetchServerState() {
      try {
        const res = await fetch(`${SUPABASE_BASE}/app_state?id=eq.primary_user&select=data`, {
          headers: HEADERS
        });
        if (res.ok) {
          const rows = await res.json();
          if (rows && rows.length > 0 && rows[0].data) {
            const serverData = rows[0].data;
            isInternalUpdate.current = true;
            isLoadedFromServer.current = true;
            setState(serverData);
            localStorage.setItem("mc_cloud_state", JSON.stringify(serverData));
            setSyncStatus("synced");
          }
        }
      } catch (err) {
        console.warn("Szinkron hiba:", err);
      }
    }

    fetchServerState();
    const interval = setInterval(fetchServerState, 3000);
    return () => clearInterval(interval);
  }, []);

  // 2. HELYI MENTÉS A SUPABASE-BE
  useEffect(() => {
    if (isInternalUpdate.current) {
      isInternalUpdate.current = false;
      return;
    }
    if (!isLoadedFromServer.current) return;

    localStorage.setItem("mc_cloud_state", JSON.stringify(state));
    setSyncStatus("saving");

    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`${SUPABASE_BASE}/app_state?id=eq.primary_user`, {
          method: "PATCH",
          headers: { ...HEADERS, Prefer: "return=representation" },
          body: JSON.stringify({ data: state, updated_at: new Date().toISOString() })
        });
        if (res.ok) setSyncStatus("synced");
        else setSyncStatus("offline");
      } catch {
        setSyncStatus("offline");
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [state]);

  const { sprint = FALLBACK_EMPTY_STATE.sprint, tasks = [], habits = [], habitLogs = {}, habitFreezes = {}, weeklyTemplates = FALLBACK_EMPTY_STATE.weeklyTemplates } = state;

  // Csoportok kigyűjtése
  const habitGroups = Array.from(new Set(habits.map((h) => h.group || "ÁLTALÁNOS")));
  const timelineDates = [-3, -2, -1, 0, 1].map((offset) => offsetDateString(selectedDate, offset));

  // Napi szűrt feladatok KIZÁRÓLAG az adott napra
  const currentDayTasks = tasks.filter((t) => (t.date || todayActualStr) === selectedDate);
  const big3Tasks = currentDayTasks.filter((t) => t.type === "BIG3");
  const scheduledTasks = currentDayTasks.filter((t) => t.type === "SCHEDULED");
  const miniTasks = currentDayTasks.filter((t) => t.type === "DAILY5_MINI");

  // Csak a Big3 és Ütemezett számít a százalékba (a Mini 0%-os teher)
  const scoredTasks = [...big3Tasks, ...scheduledTasks];
  const completedScored = scoredTasks.filter((t) => t.done).length;
  const dayTaskPct = scoredTasks.length > 0 ? Math.round((completedScored / scoredTasks.length) * 100) : 0;

  // Napi szokások számai a kiválasztott napra
  const dayHabitLog = habitLogs[selectedDate] || {};
  const completedDayHabitsCount = habits.filter((h) => {
    const st = dayHabitLog[h.id]?.status;
    return st === "done" || st === "micro" || st === "freeze";
  }).length;
  const dayHabitPct = habits.length > 0 ? Math.round((completedDayHabitsCount / habits.length) * 100) : 0;

  // Feladat hozzáadása kategóriánként
  const handleAddCategoryTask = (category, e) => {
    e.preventDefault();
    if (!newQuickTaskTitle.trim()) return;
    const newTask = {
      id: `task-${Date.now()}`,
      date: selectedDate,
      title: newQuickTaskTitle.trim(),
      type: category,
      done: false
    };
    setState((prev) => ({
      ...prev,
      tasks: [newTask, ...(prev.tasks || [])]
    }));
    setNewQuickTaskTitle("");
    setAddingCategory(null);
  };

  const toggleTask = (id) => {
    setState((prev) => ({
      ...prev,
      tasks: (prev.tasks || []).map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    }));
  };

  const deleteTask = (id, e) => {
    e.stopPropagation();
    setState((prev) => ({
      ...prev,
      tasks: (prev.tasks || []).filter((t) => t.id !== id)
    }));
  };

  // Szokás pipálása (Done / Törlés)
  const toggleHabitStatus = (habitId, dateStr, groupName) => {
    setState((prev) => {
      const prevLogs = prev.habitLogs || {};
      const currentDay = prevLogs[dateStr] || {};
      const currentStatus = currentDay[habitId]?.status;
      const newStatus = currentStatus === "done" ? null : "done";

      const updatedDay = {
        ...currentDay,
        [habitId]: newStatus ? { status: newStatus, at: new Date().toISOString() } : null
      };

      // Konfetti ha kész az egész csoport
      if (newStatus === "done" && groupName) {
        const groupHabits = (prev.habits || []).filter((h) => h.group === groupName);
        const allReady = groupHabits.every((h) => h.id === habitId || ["done", "micro", "freeze"].includes(updatedDay[h.id]?.status));
        if (allReady) triggerConfetti();
      }

      return {
        ...prev,
        habitLogs: { ...prevLogs, [dateStr]: updatedDay }
      };
    });
  };

  // Micro szokás gomb (👍 Like)
  const handleSetMicroStatus = (habitId) => {
    setState((prev) => {
      const prevLogs = prev.habitLogs || {};
      const currentDay = prevLogs[selectedDate] || {};
      const currentStatus = currentDay[habitId]?.status;
      const newStatus = currentStatus === "micro" ? null : "micro";

      return {
        ...prev,
        habitLogs: {
          ...prevLogs,
          [selectedDate]: {
            ...currentDay,
            [habitId]: newStatus ? { status: "micro", at: new Date().toISOString() } : null
          }
        }
      };
    });
  };

  // Széria Fagyasztó kezelő (🧊)
  const handleApplyFreeze = (habitId) => {
    const habitFreezeData = habitFreezes[habitId] || { count: 2, lastReset: getTodayDateString() };
    if (habitFreezeData.count <= 0) {
      alert("Ehhez a szokáshoz elfogyott a szériabefagyasztód! (7 nap múlva töltődik vissza)");
      return;
    }

    // Ha ma üres -> ma fagyasztjuk le; ha ma már van valami, de tegnap üres volt -> a tegnapot mentjük meg
    const todayStatus = habitLogs[selectedDate]?.[habitId]?.status;
    const yesterdayStr = offsetDateString(selectedDate, -1);
    const yesterdayStatus = habitLogs[yesterdayStr]?.[habitId]?.status;

    let targetDate = selectedDate;
    if (todayStatus && !yesterdayStatus) {
      targetDate = yesterdayStr;
    }

    setState((prev) => {
      const prevLogs = prev.habitLogs || {};
      const targetDay = prevLogs[targetDate] || {};

      return {
        ...prev,
        habitLogs: {
          ...prevLogs,
          [targetDate]: {
            ...targetDay,
            [habitId]: { status: "freeze", at: new Date().toISOString() }
          }
        },
        habitFreezes: {
          ...(prev.habitFreezes || {}),
          [habitId]: {
            count: habitFreezeData.count - 1,
            lastReset: habitFreezeData.lastReset || getTodayDateString()
          }
        }
      };
    });
  };

  // Streak és 21 napos statisztika
  const getHabitStats = (habitId) => {
    let completedIn21 = 0;
    for (let i = 0; i < 21; i++) {
      const d = offsetDateString(selectedDate, -i);
      const st = habitLogs[d]?.[habitId]?.status;
      if (st === "done" || st === "micro" || st === "freeze") completedIn21++;
    }

    let streak = 0;
    for (let i = 0; i < 60; i++) {
      const d = offsetDateString(selectedDate, -i);
      const st = habitLogs[d]?.[habitId]?.status;
      if (st === "done" || st === "micro" || st === "freeze") {
        streak++;
      } else {
        break;
      }
    }
    const freezeCount = habitFreezes[habitId]?.count ?? 2;
    return { streak, rate21: `${completedIn21}/21`, freezeCount };
  };

  // Heti sablon átemelése a napi nézetbe
  const handleImportWeekly = (template, type) => {
    const newTask = {
      id: `task-${Date.now()}`,
      date: selectedDate,
      title: template.title,
      type: type,
      done: false
    };
    setState((prev) => ({ ...prev, tasks: [newTask, ...(prev.tasks || [])] }));
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100 max-w-md mx-auto font-sans pb-28 select-none">
      
      {/* ========================================================================= */}
      {/* RÖGZÍTETT FEJLÉC: PONTOS NAPI SZÁMOLÁS (KIZÁRÓLAG AZ ADOTT NAPBÓL)        */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-30 bg-slate-950/95 backdrop-blur border-b border-slate-800 shadow-md p-3 space-y-2">
        {/* Napi léptető */}
        <div className="flex justify-between items-center text-xs">
          <button onClick={() => setSelectedDate(offsetDateString(selectedDate, -1))} className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800">
            <ChevronLeftIcon size={16} />
          </button>
          <div className="text-center">
            <span className="font-extrabold text-slate-100 uppercase tracking-wider">
              {selectedDate === todayActualStr ? "MA" : formatShortDate(selectedDate)} ({selectedDate})
            </span>
            {selectedDate !== todayActualStr && (
              <button onClick={() => setSelectedDate(todayActualStr)} className="text-[10px] text-emerald-400 block mx-auto underline mt-0.5">
                Vissza a mai napra
              </button>
            )}
          </div>
          <button onClick={() => setSelectedDate(offsetDateString(selectedDate, 1))} className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800">
            <ChevronRightIcon size={16} />
          </button>
        </div>

        {/* Pontos Kördiagramok: Feladatok és Szokások */}
        <div className="flex items-center justify-around pt-1">
          <div className="flex items-center gap-3">
            <div className="relative w-11 h-11 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path className="text-slate-800" strokeWidth="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path className="text-emerald-500 transition-all duration-300" strokeDasharray={`${dayTaskPct}, 100`} strokeWidth="4" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              </svg>
              <span className="absolute text-[10px] font-extrabold text-white">{dayTaskPct}%</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Napi Feladat</span>
              <span className="text-xs font-semibold text-slate-200">{completedScored}/{scoredTasks.length}</span>
            </div>
          </div>

          <div className="h-7 w-[1px] bg-slate-800" />

          <div className="flex items-center gap-3">
            <div className="relative w-11 h-11 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path className="text-slate-800" strokeWidth="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path className="text-cyan-400 transition-all duration-300" strokeDasharray={`${dayHabitPct}, 100`} strokeWidth="4" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              </svg>
              <span className="absolute text-[10px] font-extrabold text-white">{dayHabitPct}%</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Napi Szokás</span>
              <span className="text-xs font-semibold text-slate-200">{completedDayHabitsCount}/{habits.length}</span>
            </div>
          </div>
        </div>
      </header>

      {/* FŐ TARTALOM */}
      <main className="p-4 space-y-5 flex-1">
        
        {/* ======================================================== */}
        {/* 1. BIG 3 PRIORITÁS (HELYI + GOMBBAL)                    */}
        {/* ======================================================== */}
        <section className="space-y-2">
          <div className="flex justify-between items-center px-1">
            <h2 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <TargetIcon size={14} /> Big 3 prioritás ({big3Tasks.filter((t) => t.done).length}/{big3Tasks.length})
            </h2>
            <button
              onClick={() => setAddingCategory(addingCategory === "BIG3" ? null : "BIG3")}
              className={`p-1 rounded-lg transition ${addingCategory === "BIG3" ? "bg-amber-500 text-slate-950" : "text-slate-400 hover:text-amber-400 hover:bg-slate-800"}`}
              title="Új Big 3 feladat hozzáadása"
            >
              <PlusIcon size={14} />
            </button>
          </div>

          {/* Lenyíló beviteli sor */}
          {addingCategory === "BIG3" && (
            <form onSubmit={(e) => handleAddCategoryTask("BIG3", e)} className="flex gap-1.5 p-1">
              <input
                type="text"
                placeholder="Új Big 3 prioritás mára..."
                value={newQuickTaskTitle}
                onChange={(e) => setNewQuickTaskTitle(e.target.value)}
                className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
                autoFocus
              />
              <button type="submit" className="bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs px-3 py-1.5 rounded-lg font-bold shrink-0">
                Hozzáad
              </button>
            </form>
          )}

          <div className="space-y-1.5">
            {big3Tasks.map((task) => (
              <div key={task.id} onClick={() => toggleTask(task.id)} className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition ${task.done ? "bg-emerald-950/20 border-emerald-800/40 text-slate-400 line-through" : "bg-slate-900 border-slate-800 text-slate-100"}`}>
                <div className="flex items-center gap-2.5 pr-2">
                  {task.done ? <CheckCircleIcon size={18} className="text-emerald-400 shrink-0" /> : <CircleIcon size={18} className="text-slate-500 shrink-0" />}
                  <span className="text-xs font-medium">{task.title}</span>
                </div>
                <button onClick={(e) => deleteTask(task.id, e)} className="text-slate-600 hover:text-red-400 p-1"><TrashIcon size={13} /></button>
              </div>
            ))}
            {big3Tasks.length === 0 && addingCategory !== "BIG3" && (
              <p className="text-[11px] text-slate-600 italic px-2">Nincs még Big 3 feladat kitűzve mára.</p>
            )}
          </div>
        </section>

        {/* ======================================================== */}
        {/* 2. ÜTEMEZETT FELADATOK (HELYI + GOMBBAL)                 */}
        {/* ======================================================== */}
        <section className="space-y-2">
          <div className="flex justify-between items-center px-1">
            <h2 className="text-xs font-bold uppercase tracking-wider text-blue-400 flex items-center gap-1.5">
              Ütemezett teendők ({scheduledTasks.filter((t) => t.done).length}/{scheduledTasks.length})
            </h2>
            <button
              onClick={() => setAddingCategory(addingCategory === "SCHEDULED" ? null : "SCHEDULED")}
              className={`p-1 rounded-lg transition ${addingCategory === "SCHEDULED" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-blue-400 hover:bg-slate-800"}`}
              title="Új ütemezett feladat hozzáadása"
            >
              <PlusIcon size={14} />
            </button>
          </div>

          {addingCategory === "SCHEDULED" && (
            <form onSubmit={(e) => handleAddCategoryTask("SCHEDULED", e)} className="flex gap-1.5 p-1">
              <input
                type="text"
                placeholder="Új ütemezett teendő mára..."
                value={newQuickTaskTitle}
                onChange={(e) => setNewQuickTaskTitle(e.target.value)}
                className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500"
                autoFocus
              />
              <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white text-xs px-3 py-1.5 rounded-lg font-semibold shrink-0">
                Hozzáad
              </button>
            </form>
          )}

          <div className="space-y-1.5">
            {scheduledTasks.map((task) => (
              <div key={task.id} onClick={() => toggleTask(task.id)} className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition ${task.done ? "bg-slate-900/50 border-slate-800/60 text-slate-500 line-through" : "bg-slate-900 border-slate-800 text-slate-200"}`}>
                <div className="flex items-center gap-2.5 pr-2">
                  {task.done ? <CheckCircleIcon size={16} className="text-emerald-500 shrink-0" /> : <CircleIcon size={16} className="text-slate-600 shrink-0" />}
                  <span className="text-xs">{task.title}</span>
                </div>
                <button onClick={(e) => deleteTask(task.id, e)} className="text-slate-600 hover:text-red-400 p-1"><TrashIcon size={13} /></button>
              </div>
            ))}
            {scheduledTasks.length === 0 && addingCategory !== "SCHEDULED" && (
              <p className="text-[11px] text-slate-600 italic px-2">Nincs ütemezett feladat mára.</p>
            )}
          </div>
        </section>

        {/* ======================================================== */}
        {/* 3. MINI FELADATOK (0% HATÁS) (HELYI + GOMBBAL)           */}
        {/* ======================================================== */}
        <section className="space-y-2">
          <div className="flex justify-between items-center px-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Mini feladatok (0% súlyozás) ({miniTasks.filter((t) => t.done).length}/{miniTasks.length})
            </span>
            <button
              onClick={() => setAddingCategory(addingCategory === "DAILY5_MINI" ? null : "DAILY5_MINI")}
              className={`p-1 rounded-lg transition ${addingCategory === "DAILY5_MINI" ? "bg-slate-700 text-white" : "text-slate-500 hover:text-slate-300 hover:bg-slate-800"}`}
              title="Új mini feladat hozzáadása"
            >
              <PlusIcon size={14} />
            </button>
          </div>

          {addingCategory === "DAILY5_MINI" && (
            <form onSubmit={(e) => handleAddCategoryTask("DAILY5_MINI", e)} className="flex gap-1.5 p-1">
              <input
                type="text"
                placeholder="Gyors apróság (pl. telefonhívás, levél)..."
                value={newQuickTaskTitle}
                onChange={(e) => setNewQuickTaskTitle(e.target.value)}
                className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-slate-500"
                autoFocus
              />
              <button type="submit" className="bg-slate-800 hover:bg-slate-700 text-white text-xs px-3 py-1.5 rounded-lg font-semibold shrink-0">
                Hozzáad
              </button>
            </form>
          )}

          <div className="space-y-1.5">
            {miniTasks.map((task) => (
              <div key={task.id} onClick={() => toggleTask(task.id)} className="p-2 bg-slate-900/60 border border-slate-800/80 rounded-lg flex items-center justify-between text-xs text-slate-300 cursor-pointer">
                <div className="flex items-center gap-2 pr-2">
                  {task.done ? <CheckCircleIcon size={15} className="text-slate-500 shrink-0" /> : <CircleIcon size={15} className="text-slate-600 shrink-0" />}
                  <span className={task.done ? "line-through text-slate-500" : ""}>{task.title}</span>
                </div>
                <button onClick={(e) => deleteTask(task.id, e)} className="text-slate-600 hover:text-red-400 p-0.5"><TrashIcon size={12} /></button>
              </div>
            ))}
          </div>
        </section>

        {/* ======================================================== */}
        {/* 4. NAPI SZOKÁSOK (HIERARCHIKUS, ÖSSZECSUKÓDÓ BLOKKOK)    */}
        {/* ======================================================== */}
        <section className="space-y-4 pt-3">
          <div className="flex justify-between items-center px-1 border-b border-slate-800/80 pb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Napi Szokások</span>
            <span className="text-[10px] text-slate-500">T-3 | T-2 | T-1 | <strong>MA</strong> | +1</span>
          </div>

          <div className="space-y-4">
            {habitGroups.map((groupName) => {
              const groupHabits = habits.filter((h) => h.group === groupName);
              const allDone = groupHabits.length > 0 && groupHabits.every((h) => {
                const st = habitLogs[selectedDate]?.[h.id]?.status;
                return st === "done" || st === "micro" || st === "freeze";
              });
              
              // Ha mind kész és nincs kézzel kinyitva -> ÖSSZECSUKVA MEGJELENŐ SIKER SÁV
              const isCollapsed = allDone && !manuallyOpenedGroups[groupName];

              if (isCollapsed) {
                return (
                  <div
                    key={groupName}
                    onClick={() => setManuallyOpenedGroups({ ...manuallyOpenedGroups, [groupName]: true })}
                    className="p-3 bg-emerald-950/20 border border-emerald-800/50 rounded-2xl flex items-center justify-between cursor-pointer hover:bg-emerald-950/30 transition shadow-sm"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-400 text-xs font-bold">
                        ✓
                      </span>
                      <span className="text-xs font-bold text-emerald-300 tracking-wide">{groupName}</span>
                    </div>
                    <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded-full">
                      Mind kész ({groupHabits.length}/{groupHabits.length}) – Nyiss ki ▾
                    </span>
                  </div>
                );
              }

              // AUTOMATIKUS ÁTRENDEZÉS: A kész elemek legalulra kerülnek
              const sortedHabits = [...groupHabits].sort((a, b) => {
                const aDone = !!habitLogs[selectedDate]?.[a.id]?.status;
                const bDone = !!habitLogs[selectedDate]?.[b.id]?.status;
                return aDone === bDone ? 0 : aDone ? 1 : -1;
              });

              return (
                <div key={groupName} className="space-y-2">
                  {/* FŐCSOPORT FEJLÉC (BELJEBB HÚZOTT HIERARCHIÁVAL) */}
                  <div className="flex justify-between items-center px-1">
                    <span className="text-xs font-extrabold tracking-wide text-slate-200">
                      {groupName}
                    </span>
                    {allDone && (
                      <button
                        onClick={() => setManuallyOpenedGroups({ ...manuallyOpenedGroups, [groupName]: false })}
                        className="text-[10px] text-slate-500 hover:text-slate-300"
                      >
                        Összecsukás ▴
                      </button>
                    )}
                  </div>

                  {/* SZOKÁSOK SORAI: ENYHÉN BELJEBB HÚZVA */}
                  <div className="pl-3 border-l-2 border-slate-800/80 space-y-1.5">
                    {sortedHabits.map((habit) => {
                      const currentStatus = habitLogs[selectedDate]?.[habit.id]?.status;
                      const isComplete = currentStatus === "done" || currentStatus === "micro" || currentStatus === "freeze";
                      const { streak, rate21, freezeCount } = getHabitStats(habit.id);

                      return (
                        <div
                          key={habit.id}
                          className={`p-2 rounded-xl flex items-center justify-between transition-all duration-300 ${
                            isComplete ? "bg-slate-900/40 opacity-60" : "bg-slate-900/90 border border-slate-800/80 hover:border-slate-700"
                          }`}
                        >
                          <div className="flex-1 pr-2">
                            <span className={`text-xs font-medium block ${isComplete ? "line-through text-slate-400" : "text-slate-200"}`}>
                              {habit.title}
                            </span>
                            
                            {/* STREAK, 21 NAP ÉS A SORONKÉNTI MENTŐÖVEK (🧊 ÉS 👍) */}
                            <div className="flex items-center gap-2 text-[10px] text-slate-500 mt-1">
                              <span className="flex items-center gap-0.5 text-amber-400 font-semibold">
                                <FlameIcon size={11} /> {streak} nap
                              </span>
                              <span>21 nap: {rate21}</span>

                              {/* 🧊 SORONKÉNTI FAGYASZTÓ (KÉSZLETTEL) */}
                              <button
                                onClick={() => handleApplyFreeze(habit.id)}
                                className={`px-1.5 py-0.5 rounded flex items-center gap-0.5 border text-[9px] transition ${
                                  currentStatus === "freeze"
                                    ? "bg-blue-500/30 text-blue-300 border-blue-400"
                                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-blue-300 hover:border-blue-500/40"
                                }`}
                                title="Szériabefagyasztás (ma vagy kimaradt tegnap megmentése)"
                              >
                                <span>🧊</span>
                                <span>{freezeCount}</span>
                              </button>

                              {/* 👍 MICRO SZOKÁS FENNTARTÓ GOMB */}
                              <button
                                onClick={() => handleSetMicroStatus(habit.id)}
                                className={`px-1.5 py-0.5 rounded flex items-center gap-0.5 border text-[9px] transition ${
                                  currentStatus === "micro"
                                    ? "bg-emerald-500/30 text-emerald-300 border-emerald-400"
                                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-emerald-300 hover:border-emerald-500/40"
                                }`}
                                title="Micro-szokás teljesítve (2 perces szabály)"
                              >
                                <ThumbsUpIcon size={10} />
                                <span>Micro</span>
                              </button>
                            </div>
                          </div>

                          {/* 5 NAPOS IDŐVONAL (PÖTTYÖK, PIPA, LIKE VAGY JÉG) */}
                          <div className="flex items-center gap-1 shrink-0">
                            {timelineDates.map((dStr, idx) => {
                              const isCurrent = dStr === selectedDate;
                              const isFuture = idx === 4;
                              const st = habitLogs[dStr]?.[habit.id]?.status;

                              if (isFuture) {
                                return (
                                  <div key={dStr} className="w-5 h-5 rounded-full border border-slate-800/40 bg-slate-900/20 opacity-30 flex items-center justify-center text-[8px] text-slate-600">
                                    +1
                                  </div>
                                );
                              }

                              return (
                                <button
                                  key={dStr}
                                  onClick={() => toggleHabitStatus(habit.id, dStr, groupName)}
                                  className={`rounded-full flex items-center justify-center transition ${
                                    isCurrent 
                                      ? "w-7 h-7 border-2 " + (
                                          st === "done" ? "bg-cyan-500/20 border-cyan-400 text-cyan-400 font-bold" :
                                          st === "micro" ? "bg-emerald-500/20 border-emerald-400 text-emerald-400 font-bold" :
                                          st === "freeze" ? "bg-blue-500/20 border-blue-400 text-blue-300" :
                                          "border-slate-700 bg-slate-900 text-slate-400"
                                        )
                                      : "w-5 h-5 text-[9px] " + (
                                          st === "done" ? "bg-emerald-500/20 border border-emerald-500/50 text-emerald-400" :
                                          st === "micro" ? "bg-emerald-500/20 border border-emerald-500/50 text-emerald-400" :
                                          st === "freeze" ? "bg-blue-500/20 border border-blue-500/50 text-blue-300" :
                                          "border border-slate-800 bg-slate-950 text-slate-600"
                                        )
                                  }`}
                                  title={dStr}
                                >
                                  {st === "done" ? "✓" : st === "micro" ? "👍" : st === "freeze" ? "🧊" : isCurrent ? "•" : ""}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ======================================================== */}
        {/* 5. HETI RUTINOK & MEETINGEK ÁTEMELÉSE                   */}
        {/* ======================================================== */}
        <section className="bg-slate-900 border border-slate-800 rounded-2xl p-3.5 space-y-2.5">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
            Heti események átemelése a napi listába
          </span>
          <div className="space-y-1.5">
            {weeklyTemplates.map((item) => (
              <div key={item.id} className="p-2 bg-slate-950 border border-slate-800/80 rounded-xl flex items-center justify-between text-xs">
                <span className="text-slate-300 font-medium">{item.title}</span>
                <div className="flex gap-1.5">
                  <button
                    onClick={() => handleImportWeekly(item, "BIG3")}
                    className="bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] px-2 py-0.5 rounded font-semibold transition"
                  >
                    + Big3
                  </button>
                  <button
                    onClick={() => handleImportWeekly(item, "SCHEDULED")}
                    className="bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 border border-blue-500/30 text-[10px] px-2 py-0.5 rounded font-semibold transition"
                  >
                    + Ütemezett
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* ALSÓ MENÜSÁV */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-slate-900/95 backdrop-blur border-t border-slate-800 px-4 pt-2.5 pb-[max(0.75rem,env(safe-area-inset-bottom))] flex justify-around items-center z-30">
        <button onClick={() => setActiveTab("today")} className={`flex flex-col items-center gap-1 transition ${activeTab === "today" ? "text-emerald-400" : "text-slate-500 hover:text-slate-300"}`}>
          <CalendarIcon size={18} />
          <span className="text-[10px] font-semibold">Ma</span>
        </button>

        <button onClick={() => setActiveTab("week")} className={`flex flex-col items-center gap-1 transition ${activeTab === "week" ? "text-emerald-400" : "text-slate-500 hover:text-slate-300"}`}>
          <LayoutGridIcon size={18} />
          <span className="text-[10px] font-semibold">Hét</span>
        </button>

        <button onClick={() => setActiveTab("sprint")} className={`flex flex-col items-center gap-1 transition ${activeTab === "sprint" ? "text-emerald-400" : "text-slate-500 hover:text-slate-300"}`}>
          <TargetIcon size={18} />
          <span className="text-[10px] font-semibold">Sprint</span>
        </button>

        <button onClick={() => setActiveTab("vision")} className={`flex flex-col items-center gap-1 transition ${activeTab === "vision" ? "text-emerald-400" : "text-slate-500 hover:text-slate-300"}`}>
          <CompassIcon size={18} />
          <span className="text-[10px] font-semibold">Iránytű</span>
        </button>
      </nav>

    </div>
  );
}
