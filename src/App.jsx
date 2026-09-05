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

const ChevronDownIcon = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const ArrowUpIcon = ({ size = 13, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="12" y1="19" x2="12" y2="5" />
    <polyline points="5 12 12 5 19 12" />
  </svg>
);

const SunIcon = ({ size = 14, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

const UserIcon = ({ size = 14, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const FlameIcon = ({ size = 13, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
  </svg>
);

const ArrowRightIcon = ({ size = 14, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

// 31 DB FÓKUSZ-IDÉZET
const DAILY_QUOTES = [
  { text: "A fegyelem egyenlő a szabadsággal.", author: "Jocko Willink" },
  { text: "A varázslat, amit keresel, abban a munkában van, amit épp kerülsz.", author: "Chris Williamson" },
  { text: "Az amatőrök az ihletre várnak. A profik leülnek és dolgoznak.", author: "Steven Pressfield" },
  { text: "Hasonlítsd magad ahhoz, aki tegnap voltál, ne ahhoz, aki valaki más ma.", author: "Jordan Peterson" },
  { text: "Amikor azt hiszed, végeztél, még csak a 40%-nál tartasz. Menj tovább.", author: "David Goggins" },
  { text: "Nem kell, hogy kedved legyen hozzá, csak meg kell csinálnod.", author: "Alex Hormozi" },
  { text: "Ne keresd a kifogásokat. Keress megoldásokat. Vedd át a teljes irányítást (Extreme Ownership).", author: "Jocko Willink" },
  { text: "Tegyél rendet a saját szobádban, mielőtt meg akarod váltani a világot.", author: "Jordan Peterson" },
  { text: "Nem a céljaid szintjére emelkedsz, hanem a rendszereid szintjére süllyedsz.", author: "James Clear" },
  { text: "A rendkívüli eredményekhez csak az kell, hogy a hétköznapi dolgokat rendkívül sokáig csináld.", author: "Alex Hormozi" },
  { text: "Ne állj meg, ha fáradt vagy. Akkor állj meg, ha végeztél.", author: "David Goggins" },
  { text: "Az Ellenállás (halogatás) mindig a legfontosabb céljaid és hivatásod körül a legerősebb.", author: "Steven Pressfield" },
  { text: "Jó. (Good.) – Bármi történik, találd meg benne a lehetőséget a fejlődésre.", author: "Jocko Willink" },
  { text: "Ha van időd napközben unatkozni, akkor nincs elég volumened.", author: "Alex Hormozi" },
  { text: "Kezeld magad úgy, mint valakit, akinek a megsegítéséért felelős vagy.", author: "Jordan Peterson" },
  { text: "Senki sem jön, hogy megmentsen. Neked kell megtenned.", author: "David Goggins" },
  { text: "A motiváció megbízhatatlan. A fegyelem az egyetlen dolog, amire építhetsz.", author: "Jocko Willink" },
  { text: "A hosszú élet nem csak az évekről szól, hanem arról, hogy a tested és az elméd hogyan szolgál a végéig.", author: "Peter Attia" },
  { text: "Nincs olyan, hogy időhiány. Csak prioritások vannak.", author: "Jocko Willink" },
  { text: "Az emberek nem azért buknak el, mert rossz a tervük, hanem mert nem csinálják elég ideig.", author: "Alex Hormozi" },
  { text: "Vedd a hátadra a legnagyobb terhet, amit csak elbírsz, és vidd.", author: "Jordan Peterson" },
  { text: "A legdrágább ár, amit valaha is kifizetsz, az annak a tudásnak a hiánya, amit nem szereztél meg.", author: "Alex Hormozi" },
  { text: "A korai kelés az első győzelem a napban. Szerezd meg.", author: "Jocko Willink" },
  { text: "Szenvedj most, és éld az életed hátralévő részét bajnokként.", author: "David Goggins" },
  { text: "A szenvedés elkerülhetetlen. A kérdés az, hogy találsz-e benne értelmet a munkád révén.", author: "Jordan Peterson" },
  { text: "Nem az a baj, hogy kevés az időnk, hanem hogy sokat elvesztegetünk belőle.", author: "Seneca" },
  { text: "Az önbizalom az, amikor tudod, hogy betartod a magadnak tett ígéreteidet.", author: "Alex Hormozi" },
  { text: "Koncentrálj minden percedben arra, ami épp a kezedben van, férfias és őszinte komolysággal.", author: "Marcus Aurelius" },
  { text: "A holnap tegnap kezdődött. Készülj fel ma.", author: "Jocko Willink" },
  { text: "Callouse your mind. Kérgesítsd meg az elmédet a nehéz munkával.", author: "David Goggins" },
  { text: "A leggyorsabb út a sikerhez, ha abbahagyod a kifogások keresését, és elkezdesz építeni.", author: "Chris Williamson" }
];

function getTodayDateString() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function offsetDateString(baseDateStr, dayOffset) {
  const d = new Date(baseDateStr);
  d.setDate(d.getDate() + dayOffset);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function getCurrentWeekNumber() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 4 - (d.getDay() || 7));
  const yearStart = new Date(d.getFullYear(), 0, 1);
  return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
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
  habitFreezes: {},
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

  const particles = Array.from({ length: 50 }).map(() => ({
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

  const initialWeekNum = getCurrentWeekNumber();
  const [selectedWeekNum, setSelectedWeekNum] = useState(initialWeekNum);
  const currentWeekKey = `2026-W${selectedWeekNum}`;
  const prevWeekKey = `2026-W${selectedWeekNum - 1}`;

  const [state, setState] = useState(() => {
    const saved = localStorage.getItem("mc_cloud_state");
    return saved ? JSON.parse(saved) : FALLBACK_EMPTY_STATE;
  });

  const [syncStatus, setSyncStatus] = useState("synced");
  const isInternalUpdate = useRef(false);
  const isLoadedFromServer = useRef(false);

  // Rejtett beviteli sorok a Napi feladatokhoz
  const [addingCategory, setAddingCategory] = useState(null);
  const [newQuickTaskTitle, setNewQuickTaskTitle] = useState("");
  const [manuallyOpenedGroups, setManuallyOpenedGroups] = useState({});

  // Sprint lap állapota
  const [activeAreaIndex, setActiveAreaIndex] = useState(0);
  const touchStartX = useRef(null);
  const [isEditingSprintHeader, setIsEditingSprintHeader] = useState(false);
  const [sprintHeaderForm, setSprintHeaderForm] = useState({
    name: state.sprint?.name || "Sprint Fókusz",
    startDate: state.sprint?.startDate || getTodayDateString(),
    endDate: state.sprint?.endDate || getTodayDateString()
  });
  const [isAddingSprintMilestone, setIsAddingSprintMilestone] = useState(false);
  const [isAddingSprintWeekly, setIsAddingSprintWeekly] = useState(false);
  const [newSprintGoal, setNewSprintGoal] = useState("");
  const [newWeeklyGoal, setNewWeeklyGoal] = useState("");

  // Hét lap gyors hozzáadása
  const [quickAddAreaTitle, setQuickAddAreaTitle] = useState(null);
  const [quickAddWeeklyText, setQuickAddWeeklyText] = useState("");

  // Iránytű lap
  const [expandedAreaId, setExpandedAreaId] = useState(null);
  const [editingAreaId, setEditingAreaId] = useState(null);
  const [editForm, setEditForm] = useState({ title: "", hell: "", ideal: "", nextBigGoal: "" });
  const [isAddingNewArea, setIsAddingNewArea] = useState(false);
  const [newAreaTitle, setNewAreaTitle] = useState("");

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

  const { sprint = FALLBACK_EMPTY_STATE.sprint, tasks = [], habits = [], habitLogs = {}, habitFreezes = {}, weeklyTemplates = FALLBACK_EMPTY_STATE.weeklyTemplates, visionAreas = [] } = state;
  const currentArea = visionAreas[activeAreaIndex] || visionAreas[0];

  // Csoportok
  const habitGroups = Array.from(new Set(habits.map((h) => h.group || "ÁLTALÁNOS")));
  const timelineDates = [-3, -2, -1, 0, 1].map((offset) => offsetDateString(selectedDate, offset));

  // Napi feladatok KIZÁRÓLAG az adott napra
  const currentDayTasks = tasks.filter((t) => (t.date || todayActualStr) === selectedDate);
  const big3Tasks = currentDayTasks.filter((t) => t.type === "BIG3");
  const scheduledTasks = currentDayTasks.filter((t) => t.type === "SCHEDULED");
  const miniTasks = currentDayTasks.filter((t) => t.type === "DAILY5_MINI");

  const scoredTasks = [...big3Tasks, ...scheduledTasks];
  const completedScored = scoredTasks.filter((t) => t.done).length;
  const dayTaskPct = scoredTasks.length > 0 ? Math.round((completedScored / scoredTasks.length) * 100) : 0;

  // Napi szokások aránya
  const dayHabitLog = habitLogs[selectedDate] || {};
  const completedDayHabitsCount = habits.filter((h) => {
    const st = dayHabitLog[h.id]?.status;
    return st === "done" || st === "micro" || st === "freeze";
  }).length;
  const dayHabitPct = habits.length > 0 ? Math.round((completedDayHabitsCount / habits.length) * 100) : 0;

  // Heti számítások
  const currentWeekTasks = tasks.filter((t) => (t.week || `2026-W${initialWeekNum}`) === currentWeekKey);
  const completedWeekTasks = currentWeekTasks.filter((t) => t.done).length;
  const weekHitRate = currentWeekTasks.length > 0 ? Math.round((completedWeekTasks / currentWeekTasks.length) * 100) : 0;
  const plannedAreasCount = visionAreas.filter((a) => currentWeekTasks.some((t) => t.domain === a.title)).length;
  const weekTimePct = Math.min(100, Math.max(0, Math.round(((new Date().getDay() || 7) / 7) * 100)));

  // Sprint haladás számítás
  const sprintStart = new Date(sprint.startDate || getTodayDateString()).getTime();
  const sprintEnd = new Date(sprint.endDate || getTodayDateString()).getTime();
  const actualNowTime = new Date().getTime();

  let sprintTimePct = 0;
  if (sprintEnd > sprintStart) {
    const elapsed = actualNowTime - sprintStart;
    const total = sprintEnd - sprintStart;
    sprintTimePct = Math.min(100, Math.max(0, Math.round((elapsed / total) * 100)));
  }
  const milestones = sprint.milestones || [];
  const completedMilestones = milestones.filter((m) => m.done).length;
  const totalMilestones = milestones.length;
  const sprintTaskPct = totalMilestones > 0 ? Math.round((completedMilestones / totalMilestones) * 100) : 0;

  const pendingPrevWeekGoals = currentArea ? tasks.filter(
    (t) => t.domain === currentArea.title && (t.week || `2026-W${initialWeekNum}`) === prevWeekKey && !t.done
  ) : [];

  const dayOfYear = Math.floor((actualNowTime - new Date(new Date().getFullYear(), 0, 1).getTime()) / 86400000);
  const todayQuote = DAILY_QUOTES[Math.abs(dayOfYear) % DAILY_QUOTES.length];

  // =========================================================================
  // 14 NAPOS TREND ÉS 7 NAPOS MOZGÓÁTLAG (SMA) SZÁMÍTÁSA
  // A mai nap a 13. index (0-13 = 14 nap)
  // =========================================================================
  const chartDays = Array.from({ length: 14 }).map((_, i) => offsetDateString(selectedDate, -13 + i));

  // Segédfüggvény egy adott nap feladat-teljesítményének kinyerésére
  const getTaskPctForDate = (dateStr) => {
    const dTasks = tasks.filter((t) => t.date === dateStr && (t.type === "BIG3" || t.type === "SCHEDULED"));
    if (dTasks.length === 0) return 0;
    return Math.round((dTasks.filter((t) => t.done).length / dTasks.length) * 100);
  };

  // Segédfüggvény egy adott nap szokás-teljesítményének kinyerésére
  const getHabitPctForDate = (dateStr) => {
    if (!habits || habits.length === 0) return 0;
    const log = habitLogs[dateStr] || {};
    const doneCount = habits.filter((h) => ["done", "micro", "freeze"].includes(log[h.id]?.status)).length;
    return Math.round((doneCount / habits.length) * 100);
  };

  const taskPctHistory = chartDays.map(getTaskPctForDate);
  const habitPctHistory = chartDays.map(getHabitPctForDate);

  // 7 napos mozgóátlag számítás
  const calculateSMA7 = (history, targetIndex) => {
    const targetDate = chartDays[targetIndex];
    let sum = 0;
    for (let i = 0; i < 7; i++) {
      const d = offsetDateString(targetDate, -i);
      const val = targetIndex === 13 ? (history === taskPctHistory ? getTaskPctForDate(d) : getHabitPctForDate(d)) : (history[targetIndex - i] ?? 0);
      sum += val;
    }
    return Math.round(sum / 7);
  };

  const taskSMA7History = chartDays.map((_, idx) => calculateSMA7(taskPctHistory, idx));
  const habitSMA7History = chartDays.map((_, idx) => calculateSMA7(habitPctHistory, idx));

  // Vonaldiagram koordináták generálása SVG-hez (szélesség: 130px, magasság: 34px)
  const buildSvgPath = (dataPoints) => {
    const w = 130;
    const h = 34;
    return dataPoints
      .map((val, idx) => {
        const x = (idx / 13) * w;
        const y = h - (val / 100) * (h - 6) - 3;
        return `${idx === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
      })
      .join(" ");
  };

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
    setState((prev) => ({ ...prev, tasks: [newTask, ...(prev.tasks || [])] }));
    setNewQuickTaskTitle("");
    setAddingCategory(null);
  };

  // Feladat típusának módosítása (pl. Ütemezettből Big 3-be emelés)
  const moveTaskType = (taskId, newType, e) => {
    if (e) e.stopPropagation();
    setState((prev) => ({
      ...prev,
      tasks: (prev.tasks || []).map((t) => (t.id === taskId ? { ...t, type: newType } : t))
    }));
  };

  const toggleTask = (id) => {
    setState((prev) => {
      const currentTask = (prev.tasks || []).find((t) => t.id === id);
      const isFinishing = currentTask && !currentTask.done;

      const nextTasks = (prev.tasks || []).map((t) => (t.id === id ? { ...t, done: !t.done } : t));

      // Ha a Big 3 feladatok közül mind kész lett a művelettel, indul a konfetti!
      if (isFinishing && currentTask.type === "BIG3") {
        const remainingBig3 = nextTasks.filter((t) => t.date === selectedDate && t.type === "BIG3" && !t.done);
        if (remainingBig3.length === 0) {
          triggerConfetti();
        }
      }

      return { ...prev, tasks: nextTasks };
    });
  };

  const deleteTask = (id, e) => {
    e.stopPropagation();
    setState((prev) => ({
      ...prev,
      tasks: (prev.tasks || []).filter((t) => t.id !== id)
    }));
  };

  // Szokás státusz váltása
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

      if (newStatus === "done" && groupName) {
        const groupHabits = (prev.habits || []).filter((h) => h.group === groupName);
        const allReady = groupHabits.every((h) => h.id === habitId || ["done", "micro", "freeze"].includes(updatedDay[h.id]?.status));
        if (allReady) triggerConfetti();
      }

      return { ...prev, habitLogs: { ...prevLogs, [dateStr]: updatedDay } };
    });
  };

  // Micro szokás gomb (csak szöveggel, ikon nélkül)
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

  // Széria Fagyasztó kezelő
  const handleApplyFreeze = (habitId) => {
    const habitFreezeData = habitFreezes[habitId] || { count: 2, lastReset: getTodayDateString() };
    if (habitFreezeData.count <= 0) {
      alert("Ehhez a szokáshoz elfogyott a szériabefagyasztód! (7 nap múlva töltődik vissza)");
      return;
    }

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
      if (st === "done" || st === "micro" || st === "freeze") streak++;
      else break;
    }
    const freezeCount = habitFreezes[habitId]?.count ?? 2;
    return { streak, rate21: `${completedIn21}/21`, freezeCount };
  };

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

  // Sprint kezelők
  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e) => {
    if (!touchStartX.current || visionAreas.length === 0) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) setActiveAreaIndex((p) => (p + 1 < visionAreas.length ? p + 1 : 0));
    else if (diff < -50) setActiveAreaIndex((p) => (p - 1 >= 0 ? p - 1 : visionAreas.length - 1));
    touchStartX.current = null;
  };

  const saveSprintHeader = (e) => {
    e.preventDefault();
    setState((prev) => ({
      ...prev,
      sprint: {
        ...prev.sprint,
        name: sprintHeaderForm.name.trim() || prev.sprint.name,
        startDate: sprintHeaderForm.startDate,
        endDate: sprintHeaderForm.endDate
      }
    }));
    setIsEditingSprintHeader(false);
  };

  const handleAddSprintGoal = (e) => {
    e.preventDefault();
    if (!newSprintGoal.trim() || !currentArea) return;
    const newM = { id: `m-${Date.now()}`, title: newSprintGoal.trim(), domain: currentArea.title, done: false };
    setState((prev) => ({ ...prev, sprint: { ...prev.sprint, milestones: [...(prev.sprint.milestones || []), newM] } }));
    setNewSprintGoal("");
    setIsAddingSprintMilestone(false);
  };

  const handleAddWeeklyGoalFromSprint = (e) => {
    e.preventDefault();
    if (!newWeeklyGoal.trim() || !currentArea) return;
    const newTask = { id: `task-${Date.now()}`, date: selectedDate, week: currentWeekKey, title: newWeeklyGoal.trim(), domain: currentArea.title, type: "SCHEDULED", done: false };
    setState((prev) => ({ ...prev, tasks: [newTask, ...(prev.tasks || [])] }));
    setNewWeeklyGoal("");
    setIsAddingSprintWeekly(false);
  };

  const handleRolloverPendingGoals = () => {
    if (pendingPrevWeekGoals.length === 0) return;
    const copiedTasks = pendingPrevWeekGoals.map((t) => ({
      ...t,
      id: `task-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      week: currentWeekKey,
      done: false
    }));
    setState((prev) => ({ ...prev, tasks: [...prev.tasks, ...copiedTasks] }));
  };

  const toggleMilestone = (id) => {
    setState((prev) => ({ ...prev, sprint: { ...prev.sprint, milestones: (prev.sprint.milestones || []).map((m) => (m.id === id ? { ...m, done: !m.done } : m)) } }));
  };

  const deleteMilestone = (id, e) => {
    e.stopPropagation();
    setState((prev) => ({ ...prev, sprint: { ...prev.sprint, milestones: (prev.sprint.milestones || []).filter((m) => m.id !== id) } }));
  };

  // Hét lap felvétele
  const handleQuickAddWeekly = (domainTitle, e) => {
    e.preventDefault();
    if (!quickAddWeeklyText.trim()) return;
    const newTask = {
      id: `task-${Date.now()}`,
      date: selectedDate,
      week: currentWeekKey,
      title: quickAddWeeklyText.trim(),
      domain: domainTitle,
      type: "SCHEDULED",
      done: false
    };
    setState((prev) => ({ ...prev, tasks: [newTask, ...prev.tasks] }));
    setQuickAddWeeklyText("");
    setQuickAddAreaTitle(null);
  };

  // Iránytű kezelők
  const toggleAreaExpand = (id) => { if (!editingAreaId) setExpandedAreaId((p) => (p === id ? null : id)); };
  const startEditArea = (area, e) => {
    e.stopPropagation();
    setExpandedAreaId(area.id);
    setEditingAreaId(area.id);
    setEditForm({ title: area.title, hell: area.hell, ideal: area.ideal, nextBigGoal: area.nextBigGoal });
  };
  const saveEditArea = (id, e) => {
    e.stopPropagation();
    setState((prev) => ({ ...prev, visionAreas: prev.visionAreas.map((a) => (a.id === id ? { ...a, ...editForm } : a)) }));
    setEditingAreaId(null);
  };
  const deleteArea = (id, e) => {
    e.stopPropagation();
    if (!window.confirm("Biztosan törölni szeretnéd ezt az életterületet?")) return;
    setState((prev) => ({ ...prev, visionAreas: prev.visionAreas.filter((a) => a.id !== id) }));
    setEditingAreaId(null);
    setExpandedAreaId(null);
  };
  const handleAddNewArea = (e) => {
    e.preventDefault();
    if (!newAreaTitle.trim()) return;
    const newId = `area-${Date.now()}`;
    const newAreaObj = { id: newId, title: newAreaTitle.trim(), hell: "", ideal: "", nextBigGoal: "" };
    setState((prev) => ({ ...prev, visionAreas: [...prev.visionAreas, newAreaObj] }));
    setNewAreaTitle("");
    setIsAddingNewArea(false);
    setExpandedAreaId(newId);
    setEditingAreaId(newId);
    setEditForm({ title: newAreaObj.title, hell: "", ideal: "", nextBigGoal: "" });
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100 max-w-md mx-auto font-sans pb-28 select-none">
      
      {/* ========================================================================= */}
      {/* DINAMIKUS RÖGZÍTETT FEJLÉC (STICKY HEADER)                                */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-30 bg-slate-950/95 backdrop-blur border-b border-slate-800 shadow-md">
        
        {/* 1. MA NÉZET FEJLÉCE */}
        {activeTab === "today" && (
          <div className="p-3 space-y-2">
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
          </div>
        )}

        {/* 2. HÉT NÉZET FEJLÉCE */}
        {activeTab === "week" && (
          <div className="p-3 space-y-2">
            <div className="flex justify-between items-center">
              <button onClick={() => setSelectedWeekNum((p) => p - 1)} className="p-1 hover:bg-slate-800 rounded text-slate-400">
                <ChevronLeftIcon size={16} />
              </button>
              <div className="text-center">
                <span className="text-xs font-extrabold text-emerald-400 uppercase tracking-wider">
                  {selectedWeekNum}. Hét {selectedWeekNum === initialWeekNum && "(Aktuális)"}
                </span>
                <span className="text-[10px] text-slate-400 block">
                  Pontosság: <strong className="text-white">{weekHitRate}%</strong> | Lefedettség: <strong className="text-white">{plannedAreasCount}/7 terület</strong>
                </span>
              </div>
              <button onClick={() => setSelectedWeekNum((p) => p + 1)} className="p-1 hover:bg-slate-800 rounded text-slate-400">
                <ChevronRightIcon size={16} />
              </button>
            </div>

            <div className="space-y-1.5 pt-1">
              <div className="relative h-1.5 bg-slate-900 rounded-full flex items-center border border-slate-800">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: `${weekTimePct}%` }} />
                <div className="absolute -top-1.5 -ml-2 bg-slate-950 text-amber-400 rounded-full p-0.5 border border-amber-500" style={{ left: `${weekTimePct}%` }}>
                  <SunIcon size={10} />
                </div>
              </div>
              <div className="relative h-1.5 bg-slate-900 rounded-full flex items-center border border-slate-800">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${weekHitRate}%` }} />
                <div className="absolute -top-1.5 -ml-2 bg-slate-950 text-emerald-400 rounded-full p-0.5 border border-emerald-500" style={{ left: `${weekHitRate}%` }}>
                  <UserIcon size={10} />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. SPRINT NÉZET FEJLÉCE */}
        {activeTab === "sprint" && (
          <div className="p-3 space-y-2">
            <div>
              <div className="flex justify-between items-center text-[10px] text-slate-400 font-semibold mb-1">
                <span onClick={() => setIsEditingSprintHeader(true)} className="cursor-pointer hover:text-white">
                  {formatShortDate(sprint.startDate)}
                </span>
                <span className="text-amber-400 flex items-center gap-1 font-bold">
                  Ma: {formatShortDate(todayActualStr)} ({sprintTimePct}%)
                </span>
                <span onClick={() => setIsEditingSprintHeader(true)} className="cursor-pointer hover:text-white">
                  {formatShortDate(sprint.endDate)}
                </span>
              </div>
              <div className="relative h-2 bg-slate-900 rounded-full flex items-center border border-slate-800">
                <div className="h-full bg-gradient-to-r from-amber-600 to-amber-500 rounded-full" style={{ width: `${sprintTimePct}%` }} />
                <div className="absolute -top-1.5 -ml-2 bg-slate-950 text-amber-400 rounded-full p-0.5 border border-amber-500" style={{ left: `${sprintTimePct}%` }}>
                  <SunIcon size={12} />
                </div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center text-[10px] text-slate-400 font-semibold mb-1">
                <span>0%</span>
                <span className="text-emerald-400 flex items-center gap-1 font-bold">
                  Sprint-célok: {completedMilestones}/{totalMilestones} ({sprintTaskPct}%)
                </span>
                <span>100%</span>
              </div>
              <div className="relative h-2 bg-slate-900 rounded-full flex items-center border border-slate-800">
                <div className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full" style={{ width: `${sprintTaskPct}%` }} />
                <div className="absolute -top-1.5 -ml-2 bg-slate-950 text-emerald-400 rounded-full p-0.5 border border-emerald-500" style={{ left: `${sprintTaskPct}%` }}>
                  <UserIcon size={12} />
                </div>
              </div>
            </div>

            <div className="pt-1 flex justify-between items-center text-xs">
              {!isEditingSprintHeader ? (
                <div 
                  onClick={() => {
                    setSprintHeaderForm({ name: sprint.name, startDate: sprint.startDate, endDate: sprint.endDate });
                    setIsEditingSprintHeader(true);
                  }}
                  className="flex items-center gap-1.5 font-bold text-slate-100 hover:text-emerald-400 cursor-pointer transition"
                >
                  <TargetIcon size={14} className="text-emerald-400" />
                  <span>{sprint.name}</span>
                  <EditIcon size={12} className="text-slate-500 ml-1" />
                </div>
              ) : (
                <form onSubmit={saveSprintHeader} className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 space-y-2">
                  <div className="text-[11px] font-bold text-slate-300">Sprint időszak szerkesztése:</div>
                  <input 
                    type="text"
                    value={sprintHeaderForm.name}
                    onChange={(e) => setSprintHeaderForm({ ...sprintHeaderForm, name: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1 text-xs text-slate-100"
                  />
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <label className="text-[9px] text-slate-400 block">Kezdés:</label>
                      <input 
                        type="date"
                        value={sprintHeaderForm.startDate}
                        onChange={(e) => setSprintHeaderForm({ ...sprintHeaderForm, startDate: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded px-1.5 py-1 text-[11px] text-slate-200"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="text-[9px] text-slate-400 block">Vége:</label>
                      <input 
                        type="date"
                        value={sprintHeaderForm.endDate}
                        onChange={(e) => setSprintHeaderForm({ ...sprintHeaderForm, endDate: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded px-1.5 py-1 text-[11px] text-slate-200"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 pt-1">
                    <button type="button" onClick={() => setIsEditingSprintHeader(false)} className="text-xs text-slate-400 px-2 py-0.5">Mégse</button>
                    <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white text-xs px-3 py-1 rounded font-semibold">Mentés</button>
                  </div>
                </form>
              )}

              {!isEditingSprintHeader && (
                <div className={`flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded ${syncStatus === "synced" ? "text-emerald-400" : "text-amber-400"}`}>
                  <CloudIcon size={11} />
                  <span>{syncStatus === "synced" ? "Élő" : "Mentés..."}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 4. IRÁNYTŰ NÉZET FEJLÉCE */}
        {activeTab === "vision" && (
          <div className="p-3.5 bg-slate-900/90 flex items-start gap-3 border-b border-slate-800">
            <CompassIcon size={18} className="text-emerald-400 shrink-0 mt-0.5" />
            <div className="text-xs leading-relaxed">
              <p className="text-slate-100 font-medium italic">„{todayQuote.text}”</p>
              <span className="text-[10px] text-emerald-400 font-bold mt-1 block">— {todayQuote.author}</span>
            </div>
          </div>
        )}

      </header>

      {/* FŐ TARTALOM */}
      <main className="p-4 space-y-4 flex-1">
        
        {/* ======================================================== */}
        {/* 1. MA TAB: 14 NAPOS MIKROGRAFIKONOK + BIG 3 + EGYEBEK     */}
        {/* ======================================================== */}
        {activeTab === "today" && (
          <div className="space-y-4">
            
            {/* 14 NAPOS TELJESÍTMÉNY- ÉS MOZGÓÁTLAG (SMA7) MIKROGRAFIKONOK */}
            <section className="grid grid-cols-2 gap-2 bg-slate-900/80 border border-slate-800 rounded-2xl p-2.5">
              
              {/* FELADATOK GRAFIKON */}
              <div className="space-y-1">
                <div className="flex justify-between items-baseline text-[10px]">
                  <span className="font-bold uppercase tracking-wider text-emerald-400">Feladatok (14 nap)</span>
                  <span className="text-slate-400 font-semibold">{taskPctHistory[13]}%</span>
                </div>
                <div className="relative h-9 w-full bg-slate-950/70 rounded-lg p-0.5 border border-slate-800/80 overflow-hidden flex items-center justify-center">
                  <svg className="w-full h-full" viewBox="0 0 130 34" preserveAspectRatio="none">
                    {/* Hétvégi háttérsávok (szombat/vasárnap halvány szürke oszlopok) */}
                    {chartDays.map((dStr, idx) => {
                      const dayNum = new Date(dStr).getDay();
                      if (dayNum === 0 || dayNum === 6) {
                        return (
                          <rect
                            key={dStr}
                            x={(idx / 13) * 130 - 4.5}
                            y={0}
                            width={9}
                            height={34}
                            fill="#334155"
                            opacity={0.35}
                          />
                        );
                      }
                      return null;
                    })}
                    {/* Napi tényleges teljesítmény görbéje */}
                    <path d={buildSvgPath(taskPctHistory)} fill="none" stroke="#10b981" strokeWidth="1.8" strokeLinecap="round" />
                    {/* 7 napos mozgóátlag (SMA7) szaggatott sárgás görbéje */}
                    <path d={buildSvgPath(taskSMA7History)} fill="none" stroke="#fbbf24" strokeWidth="1.4" strokeDasharray="2,2" strokeLinecap="round" opacity={0.9} />
                    {/* A mai nap pontja (13. index) */}
                    <circle cx={130} cy={34 - (taskPctHistory[13] / 100) * 28 - 3} r="2.5" fill="#10b981" />
                  </svg>
                </div>
                <div className="flex justify-between text-[9px] text-slate-500 font-medium">
                  <span>Ma: <strong className="text-emerald-400">{taskPctHistory[13]}%</strong></span>
                  <span>SMA7: <strong className="text-amber-400">{taskSMA7History[13]}%</strong></span>
                </div>
              </div>

              {/* SZOKÁSOK GRAFIKON */}
              <div className="space-y-1">
                <div className="flex justify-between items-baseline text-[10px]">
                  <span className="font-bold uppercase tracking-wider text-cyan-400">Szokások (14 nap)</span>
                  <span className="text-slate-400 font-semibold">{habitPctHistory[13]}%</span>
                </div>
                <div className="relative h-9 w-full bg-slate-950/70 rounded-lg p-0.5 border border-slate-800/80 overflow-hidden flex items-center justify-center">
                  <svg className="w-full h-full" viewBox="0 0 130 34" preserveAspectRatio="none">
                    {chartDays.map((dStr, idx) => {
                      const dayNum = new Date(dStr).getDay();
                      if (dayNum === 0 || dayNum === 6) {
                        return (
                          <rect
                            key={dStr}
                            x={(idx / 13) * 130 - 4.5}
                            y={0}
                            width={9}
                            height={34}
                            fill="#334155"
                            opacity={0.35}
                          />
                        );
                      }
                      return null;
                    })}
                    <path d={buildSvgPath(habitPctHistory)} fill="none" stroke="#06b6d4" strokeWidth="1.8" strokeLinecap="round" />
                    <path d={buildSvgPath(habitSMA7History)} fill="none" stroke="#fbbf24" strokeWidth="1.4" strokeDasharray="2,2" strokeLinecap="round" opacity={0.9} />
                    <circle cx={130} cy={34 - (habitPctHistory[13] / 100) * 28 - 3} r="2.5" fill="#06b6d4" />
                  </svg>
                </div>
                <div className="flex justify-between text-[9px] text-slate-500 font-medium">
                  <span>Ma: <strong className="text-cyan-400">{habitPctHistory[13]}%</strong></span>
                  <span>SMA7: <strong className="text-amber-400">{habitSMA7History[13]}%</strong></span>
                </div>
              </div>

            </section>

            {/* 1. BIG 3 PRIORITÁS (FÓKUSZBAN, A KÉPERNYŐ KÖZEPÉN) */}
            <section 
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                const taskId = e.dataTransfer.getData("taskId");
                if (taskId) moveTaskType(taskId, "BIG3");
              }}
              className="space-y-2"
            >
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
                  <div 
                    key={task.id} 
                    draggable
                    onDragStart={(e) => e.dataTransfer.setData("taskId", task.id)}
                    onClick={() => toggleTask(task.id)} 
                    className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition ${task.done ? "bg-emerald-950/20 border-emerald-800/40 text-slate-400 line-through" : "bg-slate-900 border-slate-800 text-slate-100 hover:border-slate-700"}`}
                  >
                    <div className="flex items-center gap-2.5 pr-2">
                      {task.done ? <CheckCircleIcon size={18} className="text-emerald-400 shrink-0" /> : <CircleIcon size={18} className="text-slate-500 shrink-0" />}
                      <span className="text-xs font-medium">{task.title}</span>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button 
                        onClick={(e) => moveTaskType(task.id, "SCHEDULED", e)} 
                        className="text-[10px] text-slate-500 hover:text-blue-300 px-1.5 py-0.5 rounded hover:bg-slate-800 transition"
                        title="Visszahelyezés az ütemezettek közé"
                      >
                        Ütemezve
                      </button>
                      <button onClick={(e) => deleteTask(task.id, e)} className="text-slate-600 hover:text-red-400 p-1"><TrashIcon size={13} /></button>
                    </div>
                  </div>
                ))}
                {big3Tasks.length === 0 && addingCategory !== "BIG3" && (
                  <p className="text-[11px] text-slate-600 italic px-2">Nincs még Big 3 feladat kitűzve mára.</p>
                )}
              </div>
            </section>

            {/* 2. ÜTEMEZETT FELADATOK (EGYKOPPINTÁSOS FELHÚZÁSSAL ÉS DRAG & DROP-PAL) */}
            <section 
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                const taskId = e.dataTransfer.getData("taskId");
                if (taskId) moveTaskType(taskId, "SCHEDULED");
              }}
              className="space-y-2"
            >
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
                  <div 
                    key={task.id} 
                    draggable
                    onDragStart={(e) => e.dataTransfer.setData("taskId", task.id)}
                    onClick={() => toggleTask(task.id)} 
                    className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition ${task.done ? "bg-slate-900/50 border-slate-800/60 text-slate-500 line-through" : "bg-slate-900 border-slate-800 text-slate-200"}`}
                  >
                    <div className="flex items-center gap-2.5 pr-2">
                      {task.done ? <CheckCircleIcon size={16} className="text-emerald-500 shrink-0" /> : <CircleIcon size={16} className="text-slate-600 shrink-0" />}
                      <span className="text-xs">{task.title}</span>
                    </div>

                    {/* KÖZVETLEN FELHÚZÁS A BIG 3 KÖZÉ */}
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={(e) => moveTaskType(task.id, "BIG3", e)}
                        className="bg-amber-500/10 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30 text-[10px] font-semibold px-2 py-0.5 rounded-lg flex items-center gap-0.5 transition"
                        title="Felhúzás a Big 3 prioritások közé"
                      >
                        <ArrowUpIcon size={11} />
                        <span>Big3</span>
                      </button>
                      <button onClick={(e) => deleteTask(task.id, e)} className="text-slate-600 hover:text-red-400 p-1"><TrashIcon size={13} /></button>
                    </div>
                  </div>
                ))}
                {scheduledTasks.length === 0 && addingCategory !== "SCHEDULED" && (
                  <p className="text-[11px] text-slate-600 italic px-2">Nincs ütemezett feladat mára.</p>
                )}
              </div>
            </section>

            {/* 3. MINI FELADATOK (SZÖVEG LEVÉVE) */}
            <section className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Mini feladatok ({miniTasks.filter((t) => t.done).length}/{miniTasks.length})
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
                    placeholder="Gyors apróság (pl. telefonhívás)..."
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

            {/* 4. NAPI SZOKÁSOK (TISZTA FEJLÉC, FELESLEGES T-3 SZÖVEG NÉLKÜL) */}
            <section className="space-y-4 pt-3">
              <div className="flex justify-between items-center px-1 border-b border-slate-800/80 pb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Napi Szokások</span>
              </div>

              <div className="space-y-4">
                {habitGroups.map((groupName) => {
                  const groupHabits = habits.filter((h) => h.group === groupName);
                  const allDone = groupHabits.length > 0 && groupHabits.every((h) => {
                    const st = habitLogs[selectedDate]?.[h.id]?.status;
                    return st === "done" || st === "micro" || st === "freeze";
                  });
                  const isCollapsed = allDone && !manuallyOpenedGroups[groupName];

                  if (isCollapsed) {
                    return (
                      <div
                        key={groupName}
                        onClick={() => setManuallyOpenedGroups({ ...manuallyOpenedGroups, [groupName]: true })}
                        className="p-3 bg-emerald-950/20 border border-emerald-800/50 rounded-2xl flex items-center justify-between cursor-pointer hover:bg-emerald-950/30 transition shadow-sm"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-400 text-xs font-bold">✓</span>
                          <span className="text-xs font-bold text-emerald-300 tracking-wide">{groupName}</span>
                        </div>
                        <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded-full">
                          Mind kész ({groupHabits.length}/{groupHabits.length}) – Nyiss ki ▾
                        </span>
                      </div>
                    );
                  }

                  const sortedHabits = [...groupHabits].sort((a, b) => {
                    const aDone = !!habitLogs[selectedDate]?.[a.id]?.status;
                    const bDone = !!habitLogs[selectedDate]?.[b.id]?.status;
                    return aDone === bDone ? 0 : aDone ? 1 : -1;
                  });

                  return (
                    <div key={groupName} className="space-y-2">
                      <div className="flex justify-between items-center px-1">
                        <span className="text-xs font-extrabold tracking-wide text-slate-200">{groupName}</span>
                        {allDone && (
                          <button onClick={() => setManuallyOpenedGroups({ ...manuallyOpenedGroups, [groupName]: false })} className="text-[10px] text-slate-500 hover:text-slate-300">
                            Összecsukás ▴
                          </button>
                        )}
                      </div>

                      <div className="pl-3 border-l-2 border-slate-800/80 space-y-1.5">
                        {sortedHabits.map((habit) => {
                          const currentStatus = habitLogs[selectedDate]?.[habit.id]?.status;
                          const isComplete = currentStatus === "done" || currentStatus === "micro" || currentStatus === "freeze";
                          const { streak, rate21, freezeCount } = getHabitStats(habit.id);

                          return (
                            <div key={habit.id} className={`p-2 rounded-xl flex items-center justify-between transition-all duration-300 ${isComplete ? "bg-slate-900/40 opacity-60" : "bg-slate-900/90 border border-slate-800/80 hover:border-slate-700"}`}>
                              <div className="flex-1 pr-2">
                                <span className={`text-xs font-medium block ${isComplete ? "line-through text-slate-400" : "text-slate-200"}`}>
                                  {habit.title}
                                </span>
                                
                                <div className="flex items-center gap-2 text-[10px] text-slate-500 mt-1">
                                  <span className="flex items-center gap-0.5 text-amber-400 font-semibold">
                                    <FlameIcon size={11} /> {streak} nap
                                  </span>
                                  <span>21 nap: {rate21}</span>

                                  {/* 🧊 FAGYASZTÓ GOMB */}
                                  <button
                                    onClick={() => handleApplyFreeze(habit.id)}
                                    className={`px-1.5 py-0.5 rounded flex items-center gap-0.5 border text-[9px] transition ${
                                      currentStatus === "freeze" ? "bg-blue-500/30 text-blue-300 border-blue-400" : "bg-slate-950 text-slate-400 border-slate-800 hover:text-blue-300 hover:border-blue-500/40"
                                    }`}
                                    title="Szériabefagyasztás (ma vagy kimaradt tegnap megmentése)"
                                  >
                                    <span>🧊</span>
                                    <span>{freezeCount}</span>
                                  </button>

                                  {/* MICRO GOMB (TISZTÁN SZÖVEG) */}
                                  <button
                                    onClick={() => handleSetMicroStatus(habit.id)}
                                    className={`px-1.5 py-0.5 rounded border text-[9px] font-semibold transition ${
                                      currentStatus === "micro" ? "bg-emerald-500/30 text-emerald-300 border-emerald-400" : "bg-slate-950 text-slate-400 border-slate-800 hover:text-emerald-300 hover:border-emerald-500/40"
                                    }`}
                                    title="Micro szokás teljesítve"
                                  >
                                    Micro
                                  </button>
                                </div>
                              </div>

                              {/* 5 NAPOS PÖTTYÖS SÁV */}
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
                                              st === "micro" ? "bg-emerald-500/20 border-emerald-400 text-emerald-400 font-bold text-xs" :
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
                                      {st === "done" ? "✓" : st === "micro" ? "m" : st === "freeze" ? "🧊" : isCurrent ? "•" : ""}
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

            {/* 5. HETI RUTINOK ÁTEMELÉSE */}
            <section className="bg-slate-900 border border-slate-800 rounded-2xl p-3.5 space-y-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                Heti események átemelése a napi listába
              </span>
              <div className="space-y-1.5">
                {weeklyTemplates.map((item) => (
                  <div key={item.id} className="p-2 bg-slate-950 border border-slate-800/80 rounded-xl flex items-center justify-between text-xs">
                    <span className="text-slate-300 font-medium">{item.title}</span>
                    <div className="flex gap-1.5">
                      <button onClick={() => handleImportWeekly(item, "BIG3")} className="bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] px-2 py-0.5 rounded font-semibold transition">
                        + Big3
                      </button>
                      <button onClick={() => handleImportWeekly(item, "SCHEDULED")} className="bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 border border-blue-500/30 text-[10px] px-2 py-0.5 rounded font-semibold transition">
                        + Ütemezett
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </div>
        )}

        {/* ======================================================== */}
        {/* 2. HÉT TAB                                               */}
        {/* ======================================================== */}
        {activeTab === "week" && (
          <div className="space-y-4">
            <div className="space-y-3">
              {visionAreas.map((area) => {
                const areaTasks = (tasks || []).filter((t) => t.domain === area.title && (t.week || `2026-W${initialWeekNum}`) === currentWeekKey);
                const doneCount = areaTasks.filter((t) => t.done).length;
                const isAddingHere = quickAddAreaTitle === area.title;

                return (
                  <div key={area.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-3.5 space-y-2">
                    <div className="flex justify-between items-center border-b border-slate-800/80 pb-2">
                      <div className="flex items-center gap-2 flex-1">
                        <span className={`w-2 h-2 rounded-full ${areaTasks.length > 0 ? "bg-emerald-400" : "bg-slate-600"}`} />
                        <h3 className="text-xs font-bold text-slate-200">{area.title}</h3>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className={`text-[10px] px-2 py-0.5 rounded font-semibold ${
                          areaTasks.length === 0 ? "bg-red-500/10 text-red-400 border border-red-500/20" : "bg-slate-800 text-slate-300"
                        }`}>
                          {areaTasks.length === 0 ? "Nincs cél!" : `${doneCount}/${areaTasks.length}`}
                        </span>

                        <button
                          onClick={() => {
                            if (isAddingHere) setQuickAddAreaTitle(null);
                            else { setQuickAddAreaTitle(area.title); setQuickAddWeeklyText(""); }
                          }}
                          className={`p-1 rounded-lg transition ${isAddingHere ? "bg-blue-600 text-white" : "text-slate-400 hover:text-emerald-400 hover:bg-slate-800"}`}
                          title="Heti cél hozzáadása"
                        >
                          <PlusIcon size={14} />
                        </button>
                      </div>
                    </div>

                    {isAddingHere && (
                      <form onSubmit={(e) => handleQuickAddWeekly(area.title, e)} className="flex gap-1.5 pt-1">
                        <input
                          type="text"
                          placeholder={`Új heti cél (${selectedWeekNum}. hét)...`}
                          value={quickAddWeeklyText}
                          onChange={(e) => setQuickAddWeeklyText(e.target.value)}
                          className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500"
                          autoFocus
                        />
                        <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white text-xs px-3 py-1.5 rounded-lg font-semibold shrink-0">Hozzáad</button>
                      </form>
                    )}

                    <div className="space-y-1.5 pt-0.5">
                      {areaTasks.map((t) => (
                        <div key={t.id} onClick={() => toggleTask(t.id)} className="flex items-center justify-between text-xs p-1.5 rounded hover:bg-slate-800/60 cursor-pointer">
                          <div className="flex items-center gap-2">
                            {t.done ? <CheckCircleIcon size={15} className="text-emerald-400 shrink-0" /> : <CircleIcon size={15} className="text-slate-600 shrink-0" />}
                            <span className={t.done ? "line-through text-slate-500" : "text-slate-300"}>{t.title}</span>
                          </div>
                          <button onClick={(e) => deleteTask(t.id, e)} className="text-slate-600 hover:text-red-400 p-0.5"><TrashIcon size={12} /></button>
                        </div>
                      ))}
                      {areaTasks.length === 0 && !isAddingHere && (
                        <p className="text-[11px] text-slate-600 italic px-1">Nincs cél kitűzve erre a hétre.</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* 3. SPRINT TAB                                            */}
        {/* ======================================================== */}
        {activeTab === "sprint" && currentArea && (
          <div className="space-y-4 touch-pan-y" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
            <section className="bg-slate-900 border border-emerald-500/30 rounded-2xl p-3.5 space-y-3 shadow-lg shadow-black/20">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <button onClick={() => setActiveAreaIndex((p) => (p - 1 >= 0 ? p - 1 : visionAreas.length - 1))} className="p-2 text-slate-400 hover:text-white rounded-lg">
                  <ChevronLeftIcon size={18} />
                </button>
                <div className="text-center flex-1 px-2 max-w-[240px]">
                  <select
                    value={activeAreaIndex}
                    onChange={(e) => {
                      setActiveAreaIndex(Number(e.target.value));
                      setIsAddingSprintMilestone(false);
                      setIsAddingSprintWeekly(false);
                    }}
                    className="bg-transparent text-xs sm:text-sm font-extrabold text-white text-center uppercase tracking-wide focus:outline-none cursor-pointer w-full truncate"
                  >
                    {visionAreas.map((area, idx) => (
                      <option key={area.id} value={idx} className="bg-slate-900 text-slate-100">{area.title}</option>
                    ))}
                  </select>
                </div>
                <button onClick={() => setActiveAreaIndex((p) => (p + 1 < visionAreas.length ? p + 1 : 0))} className="p-2 text-slate-400 hover:text-white rounded-lg">
                  <ChevronRightIcon size={18} />
                </button>
              </div>

              <div className="space-y-2 text-xs leading-relaxed">
                <div className="bg-red-950/20 border border-red-900/30 rounded-xl p-2">
                  <span className="text-[10px] uppercase font-bold text-red-400 block mb-0.5">POKOL KÉPE</span>
                  <p className="text-slate-300 italic whitespace-pre-line">{currentArea.hell || "Nincs kitöltve."}</p>
                </div>
                <div className="bg-emerald-950/20 border border-emerald-900/30 rounded-xl p-2">
                  <span className="text-[10px] uppercase font-bold text-emerald-400 block mb-0.5">IDEÁLIS KÉP</span>
                  <p className="text-slate-200 whitespace-pre-line">{currentArea.ideal || "Nincs kitöltve."}</p>
                </div>
                <div className="bg-amber-950/20 border border-amber-900/30 rounded-xl p-2">
                  <span className="text-[10px] uppercase font-bold text-amber-400 block mb-0.5">KÖVETKEZŐ NAGY CÉL</span>
                  <p className="text-amber-200 font-semibold whitespace-pre-line">{currentArea.nextBigGoal || "Nincs kitűzve."}</p>
                </div>
              </div>
            </section>

            <section className="bg-slate-900 border border-slate-800 rounded-2xl p-3.5 space-y-2.5">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Sprint-célok</span>
                  <span className="text-[10px] text-slate-500">
                    ({milestones.filter((m) => m.domain === currentArea.title && m.done).length}/{milestones.filter((m) => m.domain === currentArea.title).length})
                  </span>
                </div>
                <button onClick={() => setIsAddingSprintMilestone(!isAddingSprintMilestone)} className="p-1 text-slate-400 hover:text-emerald-400">
                  <PlusIcon size={15} />
                </button>
              </div>

              {isAddingSprintMilestone && (
                <form onSubmit={handleAddSprintGoal} className="flex gap-1.5 pt-1">
                  <input
                    type="text"
                    placeholder="Új sprint mérföldkő..."
                    value={newSprintGoal}
                    onChange={(e) => setNewSprintGoal(e.target.value)}
                    className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    autoFocus
                  />
                  <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0">Hozzáad</button>
                </form>
              )}

              <div className="space-y-1.5">
                {milestones.filter((m) => m.domain === currentArea.title).map((m) => (
                  <div key={m.id} onClick={() => toggleMilestone(m.id)} className="p-2 bg-slate-950/60 border border-slate-800/80 rounded-xl flex items-center justify-between cursor-pointer">
                    <div className="flex items-center gap-2.5 pr-2">
                      {m.done ? <CheckCircleIcon size={16} className="text-emerald-400 shrink-0" /> : <CircleIcon size={16} className="text-slate-600 shrink-0" />}
                      <span className={`text-xs ${m.done ? "line-through text-slate-500" : "text-slate-200"}`}>{m.title}</span>
                    </div>
                    <button onClick={(e) => deleteMilestone(m.id, e)} className="text-slate-600 hover:text-red-400 p-1"><TrashIcon size={13} /></button>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-slate-900 border border-slate-800 rounded-2xl p-3.5 space-y-2.5">
              <div className="flex justify-between items-center border-b border-slate-800/80 pb-2">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Heti célok</span>
                  <div className="flex items-center bg-slate-950 border border-slate-800 rounded-lg px-1 text-[11px]">
                    <button onClick={() => setSelectedWeekNum((p) => p - 1)} className="px-1 text-slate-400 hover:text-white">‹</button>
                    <span className="px-1 font-bold text-slate-200">{selectedWeekNum}. hét</span>
                    <button onClick={() => setSelectedWeekNum((p) => p + 1)} className="px-1 text-slate-400 hover:text-white">›</button>
                  </div>
                </div>
                <button onClick={() => setIsAddingSprintWeekly(!isAddingSprintWeekly)} className="p-1 text-slate-400 hover:text-amber-400">
                  <PlusIcon size={15} />
                </button>
              </div>

              {pendingPrevWeekGoals.length > 0 && (
                <div className="bg-amber-950/20 border border-amber-900/40 rounded-xl p-2.5 flex items-center justify-between gap-2">
                  <div className="text-[11px] text-amber-200 leading-tight">
                    <strong>{pendingPrevWeekGoals.length} elmaradt cél</strong> az előző hétről.
                  </div>
                  <button onClick={handleRolloverPendingGoals} className="bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-[10px] font-bold px-2 py-1 rounded-lg flex items-center gap-1 shrink-0">
                    <span>Átmásolás</span>
                    <ArrowRightIcon size={11} />
                  </button>
                </div>
              )}

              {isAddingSprintWeekly && (
                <form onSubmit={handleAddWeeklyGoalFromSprint} className="flex gap-1.5 pt-1">
                  <input
                    type="text"
                    placeholder={`Heti cél a ${selectedWeekNum}. hétre...`}
                    value={newWeeklyGoal}
                    onChange={(e) => setNewWeeklyGoal(e.target.value)}
                    className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    autoFocus
                  />
                  <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0">Hozzáad</button>
                </form>
              )}

              <div className="space-y-1.5">
                {currentWeekTasks.filter((t) => t.domain === currentArea.title).map((task) => (
                  <div key={task.id} onClick={() => toggleTask(task.id)} className="p-2 bg-slate-950/60 border border-slate-800/80 rounded-xl flex items-center justify-between cursor-pointer">
                    <div className="flex items-center gap-2.5 pr-2">
                      {task.done ? <CheckCircleIcon size={16} className="text-amber-400 shrink-0" /> : <CircleIcon size={16} className="text-slate-600 shrink-0" />}
                      <span className={`text-xs ${task.done ? "line-through text-slate-500" : "text-slate-200"}`}>{task.title}</span>
                    </div>
                    <button onClick={(e) => deleteTask(task.id, e)} className="text-slate-600 hover:text-red-400 p-1"><TrashIcon size={13} /></button>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* ======================================================== */}
        {/* 4. IRÁNYTŰ TAB                                           */}
        {/* ======================================================== */}
        {activeTab === "vision" && (
          <div className="space-y-3">
            <div className="space-y-2.5">
              {visionAreas.map((area) => {
                const isExpanded = expandedAreaId === area.id;
                const isEditing = editingAreaId === area.id;

                return (
                  <div key={area.id} className={`bg-slate-900 border rounded-2xl transition duration-200 overflow-hidden ${isExpanded ? "border-emerald-500/40 shadow-lg shadow-black/30" : "border-slate-800/80 hover:border-slate-700"}`}>
                    <div onClick={() => toggleAreaExpand(area.id)} className="p-3.5 flex items-start justify-between cursor-pointer select-none gap-2">
                      <div className="flex items-start gap-2.5 pr-2 flex-1">
                        <span className={`w-2 h-2 rounded-full shrink-0 mt-1.5 ${isExpanded ? "bg-emerald-400" : "bg-slate-600"}`} />
                        <div>
                          <h3 className="text-sm font-bold text-slate-100 tracking-wide">{area.title}</h3>
                          {!isExpanded && area.nextBigGoal && (
                            <p className="text-xs text-amber-400/90 font-medium leading-snug whitespace-pre-line mt-0.5">{area.nextBigGoal}</p>
                          )}
                        </div>
                      </div>
                      <button onClick={(e) => startEditArea(area, e)} className="text-slate-400 hover:text-emerald-400 p-1.5 rounded">
                        <EditIcon size={15} />
                      </button>
                    </div>

                    {isExpanded && (
                      <div className="px-3.5 pb-4 pt-1 border-t border-slate-800/60 space-y-3">
                        {!isEditing ? (
                          <div className="space-y-3 text-xs leading-relaxed mt-2">
                            <div className="bg-red-950/20 border border-red-900/30 rounded-xl p-3">
                              <span className="text-[10px] uppercase font-bold text-red-400 block mb-1">POKOL KÉPE</span>
                              <p className="text-slate-300 italic whitespace-pre-line">{area.hell || "Nincs kitöltve."}</p>
                            </div>
                            <div className="bg-emerald-950/20 border border-emerald-900/30 rounded-xl p-3">
                              <span className="text-[10px] uppercase font-bold text-emerald-400 block mb-1">IDEÁLIS KÉP</span>
                              <p className="text-slate-200 whitespace-pre-line">{area.ideal || "Nincs kitöltve."}</p>
                            </div>
                            <div className="bg-amber-950/20 border border-amber-900/30 rounded-xl p-3">
                              <span className="text-[10px] uppercase font-bold text-amber-400 block mb-1">KÖVETKEZŐ NAGY CÉL</span>
                              <p className="text-amber-200 font-medium whitespace-pre-line">{area.nextBigGoal || "Nincs kitűzve."}</p>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-3 pt-2 text-xs">
                            <input type="text" value={editForm.title} onChange={(e) => setEditForm({ ...editForm, title: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-100 font-bold" />
                            <textarea rows={3} value={editForm.hell} onChange={(e) => setEditForm({ ...editForm, hell: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200" />
                            <textarea rows={4} value={editForm.ideal} onChange={(e) => setEditForm({ ...editForm, ideal: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200" />
                            <textarea rows={2} value={editForm.nextBigGoal} onChange={(e) => setEditForm({ ...editForm, nextBigGoal: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-amber-200" />
                            <div className="flex justify-end gap-2 pt-2">
                              <button type="button" onClick={() => setEditingAreaId(null)} className="text-slate-400 text-xs px-3 py-1">Mégse</button>
                              <button type="button" onClick={(e) => saveEditArea(area.id, e)} className="bg-blue-600 text-white text-xs px-3 py-1 rounded font-semibold">Mentés</button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

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
