import React, { useState, useEffect, useRef } from "react";

// --- SUPABASE REST KONFIGURÁCIÓ ---
const SUPABASE_BASE = "https://waiiogonnyryhizxvptm.supabase.co/rest/v1";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndhaWlvZ29ubnlyeWhpenh2cHRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg0OTA5NjMsImV4cCI6MjEwNDA2Njk2M30.waiyyiAV2Vxkp2r4vgUmsMzNmhvIXWKJaXXrFhnG15k";

const HEADERS = {
  apikey: SUPABASE_KEY,
  Authorization: `Bearer ${SUPABASE_KEY}`,
  "Content-Type": "application/json"
};

// --- BEÉPÍTETT SVG IKONOK ---
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

const ChevronDownIcon = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="6 9 12 15 18 9" />
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
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
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

// ÜRES BIZTONSÁGI ALAPVÁZ (NINCSENEK TESZTADATOK)
const FALLBACK_EMPTY_STATE = {
  sprint: {
    id: "sprint-1",
    name: "Sprint Fókusz",
    startDate: getTodayDateString(),
    endDate: getTodayDateString(),
    milestones: []
  },
  tasks: [],
  habits: [
    { id: "h1", title: "Hideg zuhany & légzés", block: "morning" },
    { id: "h2", title: "15 perc nyújtás / mobilitás", block: "morning" },
    { id: "h3", title: "Napi fókusz kijelölése (Big3)", block: "morning" },
    { id: "h4", title: "45 perc edzés (Kardió/Erősítés)", block: "fitness" },
    { id: "h5", title: "Képernyőmentes este 21:00 után", block: "evening" }
  ],
  habitLogs: {},
  visionAreas: []
};

export default function App() {
  const [activeTab, setActiveTab] = useState("sprint");
  const todayActualStr = getTodayDateString();
  const [selectedDate, setSelectedDate] = useState(todayActualStr);

  const initialWeekNum = getCurrentWeekNumber();
  const [selectedWeekNum, setSelectedWeekNum] = useState(initialWeekNum);
  const currentWeekKey = `2026-W${selectedWeekNum}`;
  const prevWeekKey = `2026-W${selectedWeekNum - 1}`;

  // Kezdeti állapot kizárólag a helyi gyorstárból
  const [state, setState] = useState(() => {
    const saved = localStorage.getItem("mc_cloud_state");
    return saved ? JSON.parse(saved) : FALLBACK_EMPTY_STATE;
  });

  const [syncStatus, setSyncStatus] = useState("synced");
  const isInternalUpdate = useRef(false);
  const isLoadedFromServer = useRef(false);

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

  const [quickAddAreaTitle, setQuickAddAreaTitle] = useState(null);
  const [quickAddWeeklyText, setQuickAddWeeklyText] = useState("");

  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskType, setNewTaskType] = useState("BIG3");

  const [expandedAreaId, setExpandedAreaId] = useState(null);
  const [editingAreaId, setEditingAreaId] = useState(null);
  const [editForm, setEditForm] = useState({ title: "", hell: "", ideal: "", nextBigGoal: "" });
  const [isAddingNewArea, setIsAddingNewArea] = useState(false);
  const [newAreaTitle, setNewAreaTitle] = useState("");

  // 1. SZINKRONIZÁCIÓ SUPABASE-SZEL (KIZÁRÓLAG AZ ADATBÁZISBÓL DOLGOZIK)
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

  // 2. HELYI MENTÉS (CSAK HA MÁR EGYSZER BETÖLTÖTT A SZERVERRŐL, ÍGY NEM ÍRJA FELÜL SEMMI)
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
          headers: {
            ...HEADERS,
            Prefer: "return=representation"
          },
          body: JSON.stringify({
            data: state,
            updated_at: new Date().toISOString()
          })
        });

        if (res.ok) setSyncStatus("synced");
        else setSyncStatus("offline");
      } catch {
        setSyncStatus("offline");
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [state]);

  const { sprint = FALLBACK_EMPTY_STATE.sprint, tasks = [], habits = [], habitLogs = {}, visionAreas = [] } = state;
  const currentArea = visionAreas[activeAreaIndex] || visionAreas[0];

  // Automatikus idősáv
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

  // Heti számítások
  const currentWeekTasks = tasks.filter((t) => (t.week || `2026-W${initialWeekNum}`) === currentWeekKey);
  const completedWeekTasks = currentWeekTasks.filter((t) => t.done).length;
  const weekHitRate = currentWeekTasks.length > 0 ? Math.round((completedWeekTasks / currentWeekTasks.length) * 100) : 0;
  const plannedAreasCount = visionAreas.filter((a) => currentWeekTasks.some((t) => t.domain === a.title)).length;
  
  const currentDayOfWeekNum = new Date().getDay() || 7;
  const weekTimePct = Math.min(100, Math.max(0, Math.round((currentDayOfWeekNum / 7) * 100)));

  const pendingPrevWeekGoals = currentArea ? tasks.filter(
    (t) => t.domain === currentArea.title && (t.week || `2026-W${initialWeekNum}`) === prevWeekKey && !t.done
  ) : [];

  const currentDayTasks = tasks.filter((t) => (t.date || todayActualStr) === selectedDate);
  const scoredDayTasks = currentDayTasks.filter((t) => t.type === "BIG3" || t.type === "SCHEDULED");
  const completedDayScored = scoredDayTasks.filter((t) => t.done).length;
  const dayTaskPct = scoredDayTasks.length > 0 ? Math.round((completedDayScored / scoredDayTasks.length) * 100) : 0;
  const todayHabitLog = habitLogs?.[selectedDate] || {};
  const completedHabits = habits.filter((h) => !!todayHabitLog[h.id]).length;
  const dayHabitPct = habits.length > 0 ? Math.round((completedHabits / habits.length) * 100) : 0;

  const dayOfYear = Math.floor((actualNowTime - new Date(new Date().getFullYear(), 0, 1).getTime()) / 86400000);
  const todayQuote = DAILY_QUOTES[Math.abs(dayOfYear) % DAILY_QUOTES.length];

  // Swipe
  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e) => {
    if (!touchStartX.current || visionAreas.length === 0) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) goToNextArea();
    else if (diff < -50) goToPrevArea();
    touchStartX.current = null;
  };

  const goToNextArea = () => {
    setActiveAreaIndex((p) => (p + 1 < visionAreas.length ? p + 1 : 0));
    setIsAddingSprintMilestone(false);
    setIsAddingSprintWeekly(false);
  };
  const goToPrevArea = () => {
    setActiveAreaIndex((p) => (p - 1 >= 0 ? p - 1 : visionAreas.length - 1));
    setIsAddingSprintMilestone(false);
    setIsAddingSprintWeekly(false);
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
    const newM = {
      id: `m-${Date.now()}`,
      title: newSprintGoal.trim(),
      domain: currentArea.title,
      done: false
    };
    setState((prev) => ({
      ...prev,
      sprint: { ...prev.sprint, milestones: [...(prev.sprint.milestones || []), newM] }
    }));
    setNewSprintGoal("");
    setIsAddingSprintMilestone(false);
  };

  const handleAddWeeklyGoalFromSprint = (e) => {
    e.preventDefault();
    if (!newWeeklyGoal.trim() || !currentArea) return;
    const newTask = {
      id: `task-${Date.now()}`,
      date: selectedDate,
      week: currentWeekKey,
      title: newWeeklyGoal.trim(),
      domain: currentArea.title,
      type: "SCHEDULED",
      done: false
    };
    setState((prev) => ({ ...prev, tasks: [newTask, ...prev.tasks] }));
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

  const toggleTask = (id) => {
    setState((prev) => ({ ...prev, tasks: prev.tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)) }));
  };

  const deleteTask = (id, e) => {
    e.stopPropagation();
    setState((prev) => ({ ...prev, tasks: prev.tasks.filter((t) => t.id !== id) }));
  };

  const toggleMilestone = (id) => {
    setState((prev) => ({
      ...prev,
      sprint: { ...prev.sprint, milestones: (prev.sprint.milestones || []).map((m) => (m.id === id ? { ...m, done: !m.done } : m)) }
    }));
  };

  const deleteMilestone = (id, e) => {
    e.stopPropagation();
    setState((prev) => ({
      ...prev,
      sprint: { ...prev.sprint, milestones: (prev.sprint.milestones || []).filter((m) => m.id !== id) }
    }));
  };

  const toggleHabit = (dateKey, habitId) => {
    setState((prev) => {
      const day = prev.habitLogs?.[dateKey] || {};
      return {
        ...prev,
        habitLogs: { ...prev.habitLogs, [dateKey]: { ...day, [habitId]: !day[habitId] } }
      };
    });
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    const newTask = {
      id: `task-${Date.now()}`,
      date: selectedDate,
      week: currentWeekKey,
      title: newTaskTitle.trim(),
      type: newTaskType,
      done: false
    };
    setState((prev) => ({ ...prev, tasks: [newTask, ...prev.tasks] }));
    setNewTaskTitle("");
  };

  const toggleAreaExpand = (id) => { if (!editingAreaId) setExpandedAreaId((p) => (p === id ? null : id)); };
  const startEditArea = (area, e) => {
    e.stopPropagation();
    setExpandedAreaId(area.id);
    setEditingAreaId(area.id);
    setEditForm({ title: area.title, hell: area.hell, ideal: area.ideal, nextBigGoal: area.nextBigGoal });
  };
  const saveEditArea = (id, e) => {
    e.stopPropagation();
    setState((prev) => ({
      ...prev,
      visionAreas: prev.visionAreas.map((a) => (a.id === id ? { ...a, ...editForm } : a))
    }));
    setEditingAreaId(null);
  };
  const deleteArea = (id, e) => {
    e.stopPropagation();
    if (!window.confirm("Biztosan törölni szeretnéd ezt az életterületet?")) return;
    setState((prev) => ({
      ...prev,
      visionAreas: prev.visionAreas.filter((a) => a.id !== id)
    }));
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
      {/* DINAMIKUS RÖGZÍTETT FEJLÉC                                                */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-30 bg-slate-950/95 backdrop-blur border-b border-slate-800 shadow-md">
        
        {/* 1. SPRINT NÉZET FEJLÉCE */}
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
                    placeholder="Sprint neve..."
                  />
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <label className="text-[9px] text-slate-400 block">Kezdés dátuma:</label>
                      <input 
                        type="date"
                        value={sprintHeaderForm.startDate}
                        onChange={(e) => setSprintHeaderForm({ ...sprintHeaderForm, startDate: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded px-1.5 py-1 text-[11px] text-slate-200"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="text-[9px] text-slate-400 block">Zárás dátuma:</label>
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

        {/* 3. MA NÉZET FEJLÉCE */}
        {activeTab === "today" && (
          <div className="p-3 flex items-center justify-around">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path className="text-slate-800" strokeWidth="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path className="text-emerald-500" strokeDasharray={`${dayTaskPct}, 100`} strokeWidth="4" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
                <span className="absolute text-[11px] font-extrabold text-white">{dayTaskPct}%</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Feladatok</span>
                <span className="text-xs font-semibold text-slate-200">{completedDayScored}/{scoredDayTasks.length}</span>
              </div>
            </div>

            <div className="h-8 w-[1px] bg-slate-800" />

            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path className="text-slate-800" strokeWidth="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path className="text-cyan-400" strokeDasharray={`${dayHabitPct}, 100`} strokeWidth="4" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
                <span className="absolute text-[11px] font-extrabold text-white">{dayHabitPct}%</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Szokások</span>
                <span className="text-xs font-semibold text-slate-200">{completedHabits}/{habits.length}</span>
              </div>
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
        {/* SPRINT NÉZET: SZÁMOK NÉLKÜLI CÍMMEL                      */}
        {/* ======================================================== */}
        {activeTab === "sprint" && currentArea && (
          <div 
            className="space-y-4 touch-pan-y"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* 1. ÉLETTERÜLET BLOKK (KIZÁRÓLAG A NÉVVEL, SZÁMOK NÉLKÜL) */}
            <section className="bg-slate-900 border border-emerald-500/30 rounded-2xl p-3.5 space-y-3 shadow-lg shadow-black/20">
              
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <button onClick={goToPrevArea} className="p-2 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg shrink-0 transition">
                  <ChevronLeftIcon size={18} />
                </button>

                {/* TISZTA NÉV (NINCS MÖGÖTTE SORSZÁM) */}
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
                      <option key={area.id} value={idx} className="bg-slate-900 text-slate-100">
                        {area.title}
                      </option>
                    ))}
                  </select>
                </div>

                <button onClick={goToNextArea} className="p-2 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg shrink-0 transition">
                  <ChevronRightIcon size={18} />
                </button>
              </div>

              <div className="space-y-2 text-xs leading-relaxed">
                <div className="bg-red-950/20 border border-red-900/30 rounded-xl p-2">
                  <span className="text-[10px] uppercase font-bold text-red-400 block mb-0.5">POKOL KÉPE (AMIT EL AKARUNK KERÜLNI)</span>
                  <p className="text-slate-300 italic whitespace-pre-line">{currentArea.hell || "Nincs kitöltve."}</p>
                </div>

                <div className="bg-emerald-950/20 border border-emerald-900/30 rounded-xl p-2">
                  <span className="text-[10px] uppercase font-bold text-emerald-400 block mb-0.5">IDEÁLIS KÉP (AHOVA TARTUNK)</span>
                  <p className="text-slate-200 whitespace-pre-line">{currentArea.ideal || "Nincs kitöltve."}</p>
                </div>

                <div className="bg-amber-950/20 border border-amber-900/30 rounded-xl p-2">
                  <span className="text-[10px] uppercase font-bold text-amber-400 block mb-0.5">KÖVETKEZŐ NAGY CÉL</span>
                  <p className="text-amber-200 font-semibold whitespace-pre-line">{currentArea.nextBigGoal || "Nincs kitűzve."}</p>
                </div>
              </div>
            </section>

            {/* 2. SPRINT-CÉLOK BLOKK */}
            <section className="bg-slate-900 border border-slate-800 rounded-2xl p-3.5 space-y-2.5">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Sprint-célok</span>
                  <span className="text-[10px] text-slate-500">
                    ({milestones.filter((m) => m.domain === currentArea.title && m.done).length}/{milestones.filter((m) => m.domain === currentArea.title).length})
                  </span>
                </div>

                <button
                  onClick={() => setIsAddingSprintMilestone(!isAddingSprintMilestone)}
                  className={`p-1 rounded-lg transition ${isAddingSprintMilestone ? "bg-emerald-600 text-white" : "text-slate-400 hover:text-emerald-400 hover:bg-slate-800"}`}
                  title="Új sprint-cél hozzáadása"
                >
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
                  <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0 transition">
                    Hozzáad
                  </button>
                </form>
              )}

              <div className="space-y-1.5">
                {milestones.filter((m) => m.domain === currentArea.title).map((m) => (
                  <div key={m.id} onClick={() => toggleMilestone(m.id)} className="p-2 bg-slate-950/60 border border-slate-800/80 rounded-xl flex items-center justify-between cursor-pointer hover:border-slate-700 transition">
                    <div className="flex items-center gap-2.5 pr-2">
                      {m.done ? <CheckCircleIcon size={16} className="text-emerald-400 shrink-0" /> : <CircleIcon size={16} className="text-slate-600 shrink-0" />}
                      <span className={`text-xs ${m.done ? "line-through text-slate-500" : "text-slate-200"}`}>{m.title}</span>
                    </div>
                    <button onClick={(e) => deleteMilestone(m.id, e)} className="text-slate-600 hover:text-red-400 p-1 rounded transition shrink-0"><TrashIcon size={13} /></button>
                  </div>
                ))}
                {milestones.filter((m) => m.domain === currentArea.title).length === 0 && !isAddingSprintMilestone && (
                  <p className="text-[11px] text-slate-600 italic px-1">Még nincs sprint-cél ezen a területen.</p>
                )}
              </div>
            </section>

            {/* 3. HETI CÉLOK BLOKK */}
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

                <button
                  onClick={() => setIsAddingSprintWeekly(!isAddingSprintWeekly)}
                  className={`p-1 rounded-lg transition ${isAddingSprintWeekly ? "bg-amber-500 text-slate-950" : "text-slate-400 hover:text-amber-400 hover:bg-slate-800"}`}
                  title="Új heti cél hozzáadása"
                >
                  <PlusIcon size={15} />
                </button>
              </div>

              {pendingPrevWeekGoals.length > 0 && (
                <div className="bg-amber-950/20 border border-amber-900/40 rounded-xl p-2.5 flex items-center justify-between gap-2">
                  <div className="text-[11px] text-amber-200 leading-tight">
                    <strong>{pendingPrevWeekGoals.length} elmaradt cél</strong> az előző hétről.
                  </div>
                  <button
                    onClick={handleRolloverPendingGoals}
                    className="bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-[10px] font-bold px-2 py-1 rounded-lg flex items-center gap-1 shrink-0 transition"
                  >
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
                  <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0 transition">
                    Hozzáad
                  </button>
                </form>
              )}

              <div className="space-y-1.5">
                {currentWeekTasks.filter((t) => t.domain === currentArea.title).map((task) => (
                  <div key={task.id} onClick={() => toggleTask(task.id)} className="p-2 bg-slate-950/60 border border-slate-800/80 rounded-xl flex items-center justify-between cursor-pointer hover:border-slate-700 transition">
                    <div className="flex items-center gap-2.5 pr-2">
                      {task.done ? <CheckCircleIcon size={16} className="text-amber-400 shrink-0" /> : <CircleIcon size={16} className="text-slate-600 shrink-0" />}
                      <span className={`text-xs ${task.done ? "line-through text-slate-500" : "text-slate-200"}`}>{task.title}</span>
                    </div>
                    <button onClick={(e) => deleteTask(task.id, e)} className="text-slate-600 hover:text-red-400 p-1 rounded transition shrink-0"><TrashIcon size={13} /></button>
                  </div>
                ))}
                {currentWeekTasks.filter((t) => t.domain === currentArea.title).length === 0 && !isAddingSprintWeekly && (
                  <p className="text-[11px] text-slate-600 italic px-1">Nincs még heti cél rögzítve a {selectedWeekNum}. hétre.</p>
                )}
              </div>
            </section>
          </div>
        )}

        {/* ======================================================== */}
        {/* HÉT TAB                                                  */}
        {/* ======================================================== */}
        {activeTab === "week" && (
          <div className="space-y-4">
            <div className="space-y-3">
              {visionAreas.map((area) => {
                const areaTasks = currentWeekTasks.filter((t) => t.domain === area.title);
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
        {/* MA TAB                                                   */}
        {/* ======================================================== */}
        {activeTab === "today" && (
          <>
            <form onSubmit={handleAddTask} className="bg-slate-900 border border-slate-800 rounded-xl p-3 space-y-2.5 shadow-sm">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder={`Napi feladat (${formatShortDate(selectedDate)})...`}
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
                <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1 shrink-0 transition">
                  <PlusIcon size={14} />
                  <span>Hozzáad</span>
                </button>
              </div>

              <div className="flex gap-1.5 text-[11px]">
                <button type="button" onClick={() => setNewTaskType("BIG3")} className={`flex-1 py-1 rounded border font-medium transition ${newTaskType === "BIG3" ? "bg-amber-500/20 border-amber-500/50 text-amber-300" : "bg-slate-950 border-slate-800 text-slate-400"}`}>
                  Big 3
                </button>
                <button type="button" onClick={() => setNewTaskType("SCHEDULED")} className={`flex-1 py-1 rounded border font-medium transition ${newTaskType === "SCHEDULED" ? "bg-blue-500/20 border-blue-500/50 text-blue-300" : "bg-slate-950 border-slate-800 text-slate-400"}`}>
                  Ütemezett
                </button>
                <button type="button" onClick={() => setNewTaskType("DAILY5_MINI")} className={`flex-1 py-1 rounded border font-medium transition ${newTaskType === "DAILY5_MINI" ? "bg-slate-800 border-slate-600 text-slate-200" : "bg-slate-950 border-slate-800 text-slate-400"}`}>
                  Mini (0%)
                </button>
              </div>
            </form>

            <section className="space-y-2">
              <h2 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5 px-1">
                <TargetIcon size={14} /> Napi Big 3 prioritás
              </h2>
              <div className="space-y-2">
                {currentDayTasks.filter((t) => t.type === "BIG3").map((task) => (
                  <div key={task.id} onClick={() => toggleTask(task.id)} className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition active:scale-[0.98] ${task.done ? "bg-emerald-950/20 border-emerald-800/40 text-slate-400 line-through" : "bg-slate-900 border-slate-800 text-slate-100 hover:border-slate-700"}`}>
                    <div className="flex items-center gap-3 pr-2">
                      {task.done ? <CheckCircleIcon size={20} className="text-emerald-400 shrink-0" /> : <CircleIcon size={20} className="text-slate-500 shrink-0" />}
                      <div>
                        <span className="text-sm font-medium leading-snug">{task.title}</span>
                        {task.domain && <span className="text-[10px] text-emerald-400/80 block mt-0.5">{task.domain}</span>}
                      </div>
                    </div>
                    <button onClick={(e) => deleteTask(task.id, e)} className="text-slate-600 hover:text-red-400 p-1 rounded transition shrink-0"><TrashIcon size={14} /></button>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-2 pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 px-1">Napi Szokások</span>
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 space-y-2.5">
                {habits.map((habit) => {
                  const done = !!todayHabitLog[habit.id];
                  return (
                    <div key={habit.id} onClick={() => toggleHabit(selectedDate, habit.id)} className="flex items-center gap-3 cursor-pointer select-none">
                      {done ? <CheckCircleIcon size={17} className="text-cyan-400 shrink-0" /> : <CircleIcon size={17} className="text-slate-600 shrink-0" />}
                      <span className={`text-xs ${done ? "text-slate-400 line-through" : "text-slate-200"}`}>{habit.title}</span>
                    </div>
                  );
                })}
              </div>
            </section>
          </>
        )}

        {/* ======================================================== */}
        {/* IRÁNYTŰ TAB                                              */}
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
                        <div className="space-y-1">
                          <h3 className="text-sm font-bold text-slate-100 tracking-wide">{area.title}</h3>
                          {!isExpanded && area.nextBigGoal && (
                            <p className="text-xs text-amber-400/90 font-medium leading-snug whitespace-pre-line">
                              {area.nextBigGoal}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 pt-0.5">
                        {!isEditing && (
                          <button onClick={(e) => startEditArea(area, e)} className="text-slate-400 hover:text-emerald-400 p-1.5 rounded hover:bg-slate-800 transition">
                            <EditIcon size={15} />
                          </button>
                        )}
                        <ChevronDownIcon size={17} className={`text-slate-500 transition-transform duration-300 ${isExpanded ? "transform rotate-180 text-emerald-400" : ""}`} />
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="px-3.5 pb-4 pt-1 border-t border-slate-800/60 space-y-3">
                        {!isEditing ? (
                          <div className="space-y-3 text-xs leading-relaxed mt-2">
                            <div className="bg-red-950/20 border border-red-900/30 rounded-xl p-3">
                              <span className="text-[10px] uppercase font-bold text-red-400 tracking-wider block mb-1">POKOL KÉPE (AMIT EL AKARUNK KERÜLNI)</span>
                              <p className="text-slate-300 italic whitespace-pre-line">{area.hell || "Nincs még kitöltve."}</p>
                            </div>
                            <div className="bg-emerald-950/20 border border-emerald-900/30 rounded-xl p-3">
                              <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider block mb-1">IDEÁLIS KÉP (AHOVA TARTUNK)</span>
                              <p className="text-slate-200 whitespace-pre-line">{area.ideal || "Nincs még kitöltve."}</p>
                            </div>
                            <div className="bg-amber-950/20 border border-amber-900/30 rounded-xl p-3">
                              <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider block mb-1">KÖVETKEZŐ NAGY CÉL</span>
                              <p className="text-amber-200 font-medium whitespace-pre-line">{area.nextBigGoal || "Nincs még kitűzve."}</p>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-3 pt-2 text-xs">
                            <div>
                              <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Életterület elnevezése:</label>
                              <input type="text" value={editForm.title} onChange={(e) => setEditForm({ ...editForm, title: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-100 font-bold focus:outline-none focus:border-emerald-500" />
                            </div>
                            <div>
                              <label className="text-[10px] uppercase font-bold text-red-400 block mb-1">POKOL KÉPE:</label>
                              <textarea rows={3} value={editForm.hell} onChange={(e) => setEditForm({ ...editForm, hell: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 focus:outline-none focus:border-red-500" />
                            </div>
                            <div>
                              <label className="text-[10px] uppercase font-bold text-emerald-400 block mb-1">IDEÁLIS KÉP:</label>
                              <textarea rows={4} value={editForm.ideal} onChange={(e) => setEditForm({ ...editForm, ideal: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 focus:outline-none focus:border-emerald-500" />
                            </div>
                            <div>
                              <label className="text-[10px] uppercase font-bold text-amber-400 block mb-1">KÖVETKEZŐ NAGY CÉL:</label>
                              <textarea rows={2} value={editForm.nextBigGoal} onChange={(e) => setEditForm({ ...editForm, nextBigGoal: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-amber-200 focus:outline-none focus:border-amber-500" />
                            </div>
                            <div className="flex justify-between items-center pt-2">
                              <button type="button" onClick={(e) => deleteArea(area.id, e)} className="text-red-400 hover:text-red-300 text-xs flex items-center gap-1 p-1"><TrashIcon size={14} /><span>Törlés</span></button>
                              <div className="flex gap-2">
                                <button type="button" onClick={() => setEditingAreaId(null)} className="text-slate-400 hover:text-slate-200 text-xs px-3 py-1 rounded">Mégse</button>
                                <button type="button" onClick={(e) => saveEditArea(area.id, e)} className="bg-blue-600 hover:bg-blue-500 text-white text-xs px-3 py-1 rounded font-semibold transition">Mentés</button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="pt-2">
              {!isAddingNewArea ? (
                <button onClick={() => setIsAddingNewArea(true)} className="w-full py-3 border border-dashed border-slate-800 hover:border-emerald-500/50 rounded-2xl flex items-center justify-center gap-2 text-xs font-semibold text-slate-400 hover:text-emerald-400 transition bg-slate-900/40">
                  <PlusIcon size={16} /><span>Új életterület hozzáadása</span>
                </button>
              ) : (
                <form onSubmit={handleAddNewArea} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-200">Új életterület megnevezése</span>
                    <button type="button" onClick={() => setIsAddingNewArea(false)} className="text-xs text-slate-500 hover:text-slate-300">Mégse</button>
                  </div>
                  <div className="flex gap-2">
                    <input type="text" placeholder="Pl. Lelkiség, Tanulmányok..." value={newAreaTitle} onChange={(e) => setNewAreaTitle(e.target.value)} className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500" autoFocus />
                    <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white px-3.5 py-2 rounded-lg text-xs font-semibold shrink-0">Létrehozás</button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}

      </main>

      {/* ALSÓ MENÜSÁV */}
      <nav 
        className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-slate-900/95 backdrop-blur border-t border-slate-800 px-4 pt-2.5 pb-[max(0.75rem,env(safe-area-inset-bottom))] flex justify-around items-center z-30"
      >
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
