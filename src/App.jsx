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

const FlameIcon = ({ size = 14, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
  </svg>
);

const SnowflakeIcon = ({ size = 14, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="12" y1="2" x2="12" y2="22" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
    <line x1="19.07" y1="4.93" x2="4.93" y2="19.07" />
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

// Dátumkezelő segédfüggvények
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
  sprint: {
    id: "sprint-1",
    name: "Sprint Fókusz",
    startDate: getTodayDateString(),
    endDate: getTodayDateString(),
    milestones: []
  },
  tasks: [],
  habits: [],
  habitLogs: {},
  freezes: {}, // Pl. { "2026-09-05": { "WIN THE MORNING": 1 } }
  weeklyTemplates: [
    { id: "wt1", title: "Viráglocsolás", domain: "Otthon & Lakás" },
    { id: "wt2", title: "Heti tervezés & visszatekintés", domain: "Karrier & Munka" },
    { id: "wt3", title: "Heti nagybevásárlás", domain: "Otthon & Lakás" }
  ],
  visionAreas: []
};

// Vizuális konfetti effekt (HTML5 Canvas)
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
    size: Math.random() * 6 + 3,
    color: ["#10b981", "#3b82f6", "#f59e0b", "#ec4899", "#8b5cf6"][Math.floor(Math.random() * 5)],
    alpha: 1
  }));

  let frame = 0;
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.3;
      p.alpha -= 0.02;
      ctx.fillStyle = p.color;
      ctx.globalAlpha = Math.max(0, p.alpha);
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    });
    frame++;
    if (frame < 50) requestAnimationFrame(animate);
    else document.body.removeChild(canvas);
  }
  animate();
}

export default function App() {
  const [activeTab, setActiveTab] = useState("today"); // Alapértelmezésben a MA nézet nyílik
  const todayActualStr = getTodayDateString();
  const [selectedDate, setSelectedDate] = useState(todayActualStr);

  const initialWeekNum = getCurrentWeekNumber();
  const [selectedWeekNum, setSelectedWeekNum] = useState(initialWeekNum);
  const currentWeekKey = `2026-W${selectedWeekNum}`;

  const [state, setState] = useState(() => {
    const saved = localStorage.getItem("mc_cloud_state");
    return saved ? JSON.parse(saved) : FALLBACK_EMPTY_STATE;
  });

  const [syncStatus, setSyncStatus] = useState("synced");
  const isInternalUpdate = useRef(false);
  const isLoadedFromServer = useRef(false);

  // Sprint lap
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

  // Hét nézet
  const [quickAddAreaTitle, setQuickAddAreaTitle] = useState(null);
  const [quickAddWeeklyText, setQuickAddWeeklyText] = useState("");

  // Napi nézet
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskType, setNewTaskType] = useState("BIG3");

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

  const { sprint = FALLBACK_EMPTY_STATE.sprint, tasks = [], habits = [], habitLogs = {}, freezes = {}, weeklyTemplates = FALLBACK_EMPTY_STATE.weeklyTemplates, visionAreas = [] } = state;
  const currentArea = visionAreas[activeAreaIndex] || visionAreas[0];

  // Csoportok kigyűjtése a szokásokból
  const habitGroups = Array.from(new Set(habits.map((h) => h.group || "ÁLTALÁNOS")));

  // 5 napos idősáv dátumai a kiválasztott naphoz képest: T-3, T-2, T-1, MA, Holnap (+1)
  const timelineDates = [-3, -2, -1, 0, 1].map((offset) => offsetDateString(selectedDate, offset));

  // Napi szűrt feladatok és statisztikák
  const currentDayTasks = tasks.filter((t) => (t.date || todayActualStr) === selectedDate);
  const scoredDayTasks = currentDayTasks.filter((t) => t.type === "BIG3" || t.type === "SCHEDULED");
  const completedDayScored = scoredDayTasks.filter((t) => t.done).length;
  const dayTaskPct = scoredDayTasks.length > 0 ? Math.round((completedDayScored / scoredDayTasks.length) * 100) : 0;

  // Kiválasztott napi szokások aránya
  const dayLog = habitLogs[selectedDate] || {};
  const completedDayHabitsCount = habits.filter((h) => !!dayLog[h.id]?.done).length;
  const dayHabitPct = habits.length > 0 ? Math.round((completedDayHabitsCount / habits.length) * 100) : 0;

  // Napi rotálódó idézet
  const dayOfYear = Math.floor((new Date(selectedDate).getTime() - new Date(new Date().getFullYear(), 0, 1).getTime()) / 86400000);
  const todayQuote = DAILY_QUOTES[Math.abs(dayOfYear) % DAILY_QUOTES.length];

  // Szokás pipálása adott dátumra + automatikus csoport-teljesülés és konfetti
  const toggleHabitDate = (habitId, dateStr, groupName) => {
    setState((prev) => {
      const prevLogs = prev.habitLogs || {};
      const currentDay = prevLogs[dateStr] || {};
      const wasDone = !!currentDay[habitId]?.done;
      const newDone = !wasDone;

      const updatedDay = {
        ...currentDay,
        [habitId]: {
          done: newDone,
          completedAt: newDone ? new Date().toISOString() : null
        }
      };

      // Ha most lett kész, ellenőrizzük, hogy a csoport összes többi eleme kész van-e már
      if (newDone && groupName) {
        const groupHabits = (prev.habits || []).filter((h) => h.group === groupName);
        const allOthersDone = groupHabits.every((h) => h.id === habitId || !!updatedDay[h.id]?.done);
        if (allOthersDone) {
          triggerConfetti();
        }
      }

      return {
        ...prev,
        habitLogs: {
          ...prevLogs,
          [dateStr]: updatedDay
        }
      };
    });
  };

  // Szériabefagyasztó (Freeze) aktiválása (max 2 / csoport / nap)
  const handleFreezeGroup = (groupName) => {
    const dayFreezes = freezes[selectedDate] || {};
    const currentCount = dayFreezes[groupName] || 0;
    if (currentCount >= 2) {
      alert(`Ebben a csoportban ma már felhasználtad a maximális 2 szériabefagyasztót!`);
      return;
    }

    setState((prev) => {
      const prevFreezes = prev.freezes || {};
      const day = prevFreezes[selectedDate] || {};
      return {
        ...prev,
        freezes: {
          ...prevFreezes,
          [selectedDate]: {
            ...day,
            [groupName]: (day[groupName] || 0) + 1
          }
        }
      };
    });
  };

  // Streak és 21 napos ráta kalkuláció egy szokáshoz
  const getHabitStats = (habitId) => {
    let completedIn21 = 0;
    for (let i = 0; i < 21; i++) {
      const d = offsetDateString(selectedDate, -i);
      if (habitLogs[d]?.[habitId]?.done) completedIn21++;
    }

    let streak = 0;
    for (let i = 0; i < 60; i++) {
      const d = offsetDateString(selectedDate, -i);
      if (habitLogs[d]?.[habitId]?.done) {
        streak++;
      } else {
        break;
      }
    }
    return { streak, rate21: `${completedIn21}/21` };
  };

  // Heti sablon / meeting közvetlen átemelése a napi listába
  const handleImportWeeklyTemplate = (template, type = "BIG3") => {
    const newTask = {
      id: `task-${Date.now()}`,
      date: selectedDate,
      week: currentWeekKey,
      title: template.title,
      domain: template.domain,
      type: type,
      done: false
    };
    setState((prev) => ({
      ...prev,
      tasks: [newTask, ...(prev.tasks || [])]
    }));
  };

  // Általános feladatkezelők
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
    setState((prev) => ({
      ...prev,
      tasks: [newTask, ...(prev.tasks || [])]
    }));
    setNewTaskTitle("");
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

  const toggleMilestone = (id) => {
    setState((prev) => ({ ...prev, sprint: { ...prev.sprint, milestones: (prev.sprint.milestones || []).map((m) => (m.id === id ? { ...m, done: !m.done } : m)) } }));
  };

  const deleteMilestone = (id, e) => {
    e.stopPropagation();
    setState((prev) => ({ ...prev, sprint: { ...prev.sprint, milestones: (prev.sprint.milestones || []).filter((m) => m.id !== id) } }));
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
      {/* DINAMIKUS RÖGZÍTETT FEJLÉC                                                */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-30 bg-slate-950/95 backdrop-blur border-b border-slate-800 shadow-md">
        
        {/* MA NÉZET FEJLÉCE: KÉT KÖRDIAGRAM AZ AKTUÁLISAN KIVÁLASZTOTT NAPRA */}
        {activeTab === "today" && (
          <div className="p-3 space-y-2">
            {/* Napi léptető */}
            <div className="flex justify-between items-center text-xs">
              <button 
                onClick={() => setSelectedDate(offsetDateString(selectedDate, -1))}
                className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition"
              >
                <ChevronLeftIcon size={16} />
              </button>
              
              <div className="text-center">
                <span className="font-extrabold text-slate-100 uppercase tracking-wider">
                  {selectedDate === todayActualStr ? "MA" : formatShortDate(selectedDate)} ({selectedDate})
                </span>
                {selectedDate !== todayActualStr && (
                  <button 
                    onClick={() => setSelectedDate(todayActualStr)} 
                    className="text-[10px] text-emerald-400 block mx-auto underline mt-0.5"
                  >
                    Vissza a mai napra
                  </button>
                )}
              </div>

              <button 
                onClick={() => setSelectedDate(offsetDateString(selectedDate, 1))}
                className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition"
              >
                <ChevronRightIcon size={16} />
              </button>
            </div>

            {/* A két kördiagram (kizárólag a kiválasztott napra) */}
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
                  <span className="text-xs font-semibold text-slate-200">{completedDayScored}/{scoredDayTasks.length}</span>
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

        {/* SPRINT FEJLÉC */}
        {activeTab === "sprint" && (
          <div className="p-3 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-100 flex items-center gap-1.5">
                <TargetIcon size={14} className="text-emerald-400" />
                <span>{sprint.name}</span>
              </span>
              <div className={`flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded ${syncStatus === "synced" ? "text-emerald-400" : "text-amber-400"}`}>
                <CloudIcon size={11} />
                <span>{syncStatus === "synced" ? "Élő" : "Mentés..."}</span>
              </div>
            </div>
          </div>
        )}

        {/* HÉT FEJLÉC */}
        {activeTab === "week" && (
          <div className="p-3 flex justify-between items-center text-xs">
            <button onClick={() => setSelectedWeekNum((p) => p - 1)} className="p-1 text-slate-400 hover:text-white">
              <ChevronLeftIcon size={16} />
            </button>
            <span className="font-extrabold text-emerald-400 uppercase">{selectedWeekNum}. Hét</span>
            <button onClick={() => setSelectedWeekNum((p) => p + 1)} className="p-1 text-slate-400 hover:text-white">
              <ChevronRightIcon size={16} />
            </button>
          </div>
        )}

        {/* IRÁNYTŰ FEJLÉC */}
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
      <main className="p-4 space-y-5 flex-1">
        
        {/* ======================================================== */}
        {/* 1. MA TAB: NAPI FELADATOK & CSOPORTOSÍTOTT SZOKÁSOK      */}
        {/* ======================================================== */}
        {activeTab === "today" && (
          <div className="space-y-5">
            
            {/* FELADAT RÖGZÍTÉS */}
            <form onSubmit={handleAddTask} className="bg-slate-900 border border-slate-800 rounded-xl p-3 space-y-2.5 shadow-sm">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder={`Új napi feladat (${formatShortDate(selectedDate)})...`}
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

            {/* NAPI BIG 3 FELADATOK */}
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

            {/* CSOPORTOSÍTOTT NAPI SZOKÁSOK */}
            <section className="space-y-4 pt-2">
              <div className="flex justify-between items-center px-1">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Napi Szokások</span>
                <span className="text-[10px] text-slate-500">T-3 | T-2 | T-1 | <strong>MA</strong> | +1</span>
              </div>

              {habitGroups.map((groupName) => {
                const groupHabits = habits.filter((h) => h.group === groupName);
                const allGroupDone = groupHabits.length > 0 && groupHabits.every((h) => !!habitLogs[selectedDate]?.[h.id]?.done);
                const usedFreezes = freezes[selectedDate]?.[groupName] || 0;

                // AUTOMATIKUS ÁTRENDEZÉS: A kész feladatok legalulra kerülnek
                const sortedHabits = [...groupHabits].sort((a, b) => {
                  const aDone = !!habitLogs[selectedDate]?.[a.id]?.done;
                  const bDone = !!habitLogs[selectedDate]?.[b.id]?.done;
                  return aDone === bDone ? 0 : aDone ? 1 : -1;
                });

                return (
                  <div key={groupName} className={`border rounded-2xl p-3.5 space-y-3 transition duration-300 ${allGroupDone ? "bg-slate-900/90 border-emerald-500/50 shadow-md shadow-emerald-500/10" : "bg-slate-900 border-slate-800"}`}>
                    
                    {/* CSOPORT FEJLÉC */}
                    <div className="flex justify-between items-center border-b border-slate-800/80 pb-2">
                      <div className="flex items-center gap-2">
                        {allGroupDone ? (
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                        ) : (
                          <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0" />
                        )}
                        <h3 className={`text-xs font-bold tracking-wide ${allGroupDone ? "text-emerald-300" : "text-slate-200"}`}>
                          {groupName}
                        </h3>
                      </div>

                      {/* SZÉRIABEFAGYASZTÓ GOMB (MAX 2) */}
                      <button
                        onClick={() => handleFreezeGroup(groupName)}
                        className={`text-[10px] px-2 py-0.5 rounded-lg flex items-center gap-1 border transition ${
                          usedFreezes > 0 ? "bg-blue-500/20 text-blue-300 border-blue-500/40" : "bg-slate-950 text-slate-500 border-slate-800 hover:text-slate-300"
                        }`}
                        title="Szériabefagyasztó erre a napra (max 2)"
                      >
                        <SnowflakeIcon size={11} />
                        <span>Fagyasztó ({usedFreezes}/2)</span>
                      </button>
                    </div>

                    {/* SZOKÁSOK LISTÁJA */}
                    <div className="space-y-2">
                      {sortedHabits.map((habit) => {
                        const isDoneToday = !!habitLogs[selectedDate]?.[habit.id]?.done;
                        const { streak, rate21 } = getHabitStats(habit.id);

                        return (
                          <div
                            key={habit.id}
                            className={`p-2 rounded-xl flex items-center justify-between transition-all duration-300 ${
                              isDoneToday ? "bg-slate-950/40 opacity-60" : "bg-slate-950/80 hover:bg-slate-950"
                            }`}
                          >
                            <div className="flex-1 pr-2">
                              <span className={`text-xs font-medium block ${isDoneToday ? "line-through text-slate-400" : "text-slate-200"}`}>
                                {habit.title}
                              </span>
                              <div className="flex items-center gap-2 text-[10px] text-slate-500 mt-0.5">
                                <span className="flex items-center gap-0.5 text-amber-400 font-semibold">
                                  <FlameIcon size={11} /> {streak} nap
                                </span>
                                <span>21 nap: <strong>{rate21}</strong></span>
                              </div>
                            </div>

                            {/* 5 NAPOS IDŐVONAL: T-3, T-2, T-1, MA (KIEMELVE), +1 */}
                            <div className="flex items-center gap-1 shrink-0">
                              {timelineDates.map((dStr, idx) => {
                                const isCurrent = dStr === selectedDate;
                                const isFuture = idx === 4;
                                const doneOnDate = !!habitLogs[dStr]?.[habit.id]?.done;

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
                                    onClick={() => toggleHabitDate(habit.id, dStr, groupName)}
                                    className={`rounded-full flex items-center justify-center transition ${
                                      isCurrent 
                                        ? "w-7 h-7 border-2 " + (doneOnDate ? "bg-cyan-500/20 border-cyan-400 text-cyan-400 font-bold" : "border-slate-700 bg-slate-900 text-slate-400")
                                        : "w-5 h-5 text-[9px] " + (doneOnDate ? "bg-emerald-500/20 border border-emerald-500/50 text-emerald-400" : "border border-slate-800 bg-slate-950 text-slate-600")
                                    }`}
                                    title={dStr}
                                  >
                                    {doneOnDate ? "✓" : isCurrent ? "•" : ""}
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
            </section>

            {/* HETI RUTINOK ÉS MEETINGEK GYORS ÁTEMELÉSE */}
            <section className="bg-slate-900 border border-slate-800 rounded-2xl p-3.5 space-y-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                Heti szokásos események & Meetingek
              </span>
              <div className="space-y-1.5">
                {weeklyTemplates.map((item) => (
                  <div key={item.id} className="p-2 bg-slate-950 border border-slate-800/80 rounded-xl flex items-center justify-between text-xs">
                    <span className="text-slate-300 font-medium">{item.title}</span>
                    <div className="flex gap-1.5">
                      <button
                        onClick={() => handleImportWeeklyTemplate(item, "BIG3")}
                        className="bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] px-2 py-0.5 rounded font-semibold transition"
                      >
                        + Big3
                      </button>
                      <button
                        onClick={() => handleImportWeeklyTemplate(item, "SCHEDULED")}
                        className="bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 border border-blue-500/30 text-[10px] px-2 py-0.5 rounded font-semibold transition"
                      >
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
        {/* 2. SPRINT TAB                                            */}
        {/* ======================================================== */}
        {activeTab === "sprint" && currentArea && (
          <div className="space-y-4 touch-pan-y" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
            <section className="bg-slate-900 border border-emerald-500/30 rounded-2xl p-3.5 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <button onClick={() => setActiveAreaIndex((p) => (p - 1 >= 0 ? p - 1 : visionAreas.length - 1))} className="p-2 text-slate-400 hover:text-white">
                  <ChevronLeftIcon size={18} />
                </button>
                <select
                  value={activeAreaIndex}
                  onChange={(e) => setActiveAreaIndex(Number(e.target.value))}
                  className="bg-transparent text-xs sm:text-sm font-extrabold text-white text-center uppercase tracking-wide focus:outline-none cursor-pointer max-w-[240px] truncate"
                >
                  {visionAreas.map((area, idx) => (
                    <option key={area.id} value={idx} className="bg-slate-900 text-slate-100">{area.title}</option>
                  ))}
                </select>
                <button onClick={() => setActiveAreaIndex((p) => (p + 1 < visionAreas.length ? p + 1 : 0))} className="p-2 text-slate-400 hover:text-white">
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
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Sprint-célok</span>
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
                {(sprint.milestones || []).filter((m) => m.domain === currentArea.title).map((m) => (
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
          </div>
        )}

        {/* ======================================================== */}
        {/* 3. HÉT TAB                                               */}
        {/* ======================================================== */}
        {activeTab === "week" && (
          <div className="space-y-4">
            <div className="space-y-3">
              {visionAreas.map((area) => {
                const areaTasks = (tasks || []).filter((t) => t.domain === area.title && (t.week || `2026-W${initialWeekNum}`) === currentWeekKey);
                const doneCount = areaTasks.filter((t) => t.done).length;

                return (
                  <div key={area.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-3.5 space-y-2">
                    <div className="flex justify-between items-center border-b border-slate-800/80 pb-2">
                      <h3 className="text-xs font-bold text-slate-200">{area.title}</h3>
                      <span className={`text-[10px] px-2 py-0.5 rounded font-semibold ${areaTasks.length === 0 ? "bg-red-500/10 text-red-400 border border-red-500/20" : "bg-slate-800 text-slate-300"}`}>
                        {areaTasks.length === 0 ? "Nincs cél!" : `${doneCount}/${areaTasks.length}`}
                      </span>
                    </div>
                    <div className="space-y-1.5">
                      {areaTasks.map((t) => (
                        <div key={t.id} onClick={() => toggleTask(t.id)} className="flex items-center justify-between text-xs p-1.5 rounded hover:bg-slate-800/60 cursor-pointer">
                          <span className={t.done ? "line-through text-slate-500" : "text-slate-300"}>{t.title}</span>
                          <button onClick={(e) => deleteTask(t.id, e)} className="text-slate-600 hover:text-red-400 p-0.5"><TrashIcon size={12} /></button>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* 4. IRÁNYTŰ TAB                                           */}
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
