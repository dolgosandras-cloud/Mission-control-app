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

const RunningManIcon = ({ size = 18, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="17" cy="4" r="2" />
    <path d="M15 8l-4 3 2 4-4 2" />
    <path d="M6 16l3-1 2-5-3-2-4 2" />
    <path d="M13 15l2 5 4 1" />
  </svg>
);

const BellIcon = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
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

const CloseIcon = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

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

const WEEK_DAYS_NAMES = [
  { dayIndex: 1, label: "Hétfő", short: "H" },
  { dayIndex: 2, label: "Kedd", short: "K" },
  { dayIndex: 3, label: "Szerda", short: "Sze" },
  { dayIndex: 4, label: "Csütörtök", short: "Cs" },
  { dayIndex: 5, label: "Péntek", short: "P" },
  { dayIndex: 6, label: "Szombat", short: "Szo" },
  { dayIndex: 0, label: "Vasárnap", short: "V" }
];

const MONTH_NAMES_SHORT = ["Jan.", "Feb.", "Már.", "Ápr.", "Máj.", "Jún.", "Júl.", "Aug.", "Szep.", "Okt.", "Nov.", "Dec."];

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

function getDayShortName(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  const days = ["V", "H", "K", "Sze", "Cs", "P", "Szo"];
  return days[d.getDay()];
}

function formatNavDateLabel(dateStr, todayActualStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  const mShort = MONTH_NAMES_SHORT[d.getMonth()];
  const dayNum = String(d.getDate()).padStart(2, "0");
  const dayOfWeekShort = getDayShortName(dateStr);
  const dateFormatted = `${mShort} ${dayNum} - ${dayOfWeekShort}`;

  if (dateStr === todayActualStr) {
    return `Ma (${dateFormatted})`;
  }
  return dateFormatted;
}

const FALLBACK_EMPTY_STATE = {
  sprint: { id: "sprint-1", name: "Sprint Fókusz", startDate: getTodayDateString(), endDate: getTodayDateString(), milestones: [] },
  weeklyGoals: [],
  tasks: [],
  habits: [],
  habitLogs: {},
  habitFreezes: {},
  weeklyHabits: [
    { id: "wh1", title: "Viráglocsolás", dayOfWeek: 3 },
    { id: "wh2", title: "Heti tervezés & visszatekintés", dayOfWeek: 6 },
    { id: "wh3", title: "Nagybevásárlás", dayOfWeek: 5 }
  ],
  dismissedRollovers: {},
  dismissedWeeklyGoalRollovers: {},
  notificationSettings: {
    morningEnabled: true,
    morningTime: "07:00",
    middayEnabled: true,
    middayTime: "14:00",
    eveningEnabled: true,
    eveningTime: "21:30",
    stoicEnabled: true
  },
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
  const isSavingRef = useRef(false);

  // Toast értesítés
  const [toastMessage, setToastMessage] = useState(null);
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // PUSH ÉRTESÍTÉSI MODAL ÉS BEÁLLÍTÁSOK
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [notificationPermission, setNotificationPermission] = useState("default");
  const sentAlertsTracker = useRef({});

  // Napi feladat beviteli sorok
  const [addingCategory, setAddingCategory] = useState(null);
  const [newQuickTaskTitle, setNewQuickTaskTitle] = useState("");
  const [newQuickTaskDomain, setNewQuickTaskDomain] = useState("");
  const [manuallyOpenedGroups, setManuallyOpenedGroups] = useState({});

  // Napi feladat szerkesztő ablak
  const [editingTaskModal, setEditingTaskModal] = useState(null);
  const [editTaskTitle, setEditTaskTitle] = useState("");
  const [editTaskDate, setEditTaskDate] = useState("");
  const [editTaskType, setEditTaskType] = useState("BIG3");
  const [editTaskDomain, setEditTaskDomain] = useState("");

  // Szokás-kezelő műhely állapota
  const [isManagingHabits, setIsManagingHabits] = useState(false);
  const [newHabitTitle, setNewHabitTitle] = useState("");
  const [newHabitGroup, setNewHabitGroup] = useState("");
  const [newHabitDomain, setNewHabitDomain] = useState("");
  const [newGroupInput, setNewGroupInput] = useState("");
  const [editingHabitId, setEditingHabitId] = useState(null);
  const [editingHabitTitle, setEditingHabitTitle] = useState("");
  const [editingGroupOldName, setEditingGroupOldName] = useState(null);
  const [editingGroupNewName, setEditingGroupNewName] = useState("");
  const [selectedHabitModal, setSelectedHabitModal] = useState(null);

  // Hét lap: cél szerkesztése & naptárválasztó
  const [schedulingGoalId, setSchedulingGoalId] = useState(null);
  const [editingGoalId, setEditingGoalId] = useState(null);
  const [editingGoalText, setEditingGoalText] = useState("");

  // HETI SZOKÁSOK MODUL ÁLLAPOTOK
  const [zoomDayIndex, setZoomDayIndex] = useState(null);
  const [isAddingWeeklyGlobal, setIsAddingWeeklyGlobal] = useState(false);
  const [globalWeeklyTitle, setGlobalWeeklyTitle] = useState("");
  const [globalWeeklyDay, setGlobalWeeklyDay] = useState(1);
  const [daySpecificTitle, setDaySpecificTitle] = useState("");

  // Iránytű lap állapota
  const [activeAreaIndex, setActiveAreaIndex] = useState(0);
  const touchStartX = useRef(null);
  const [isAddingSprintMilestone, setIsAddingSprintMilestone] = useState(false);
  const [isAddingSprintWeekly, setIsAddingSprintWeekly] = useState(false);
  const [newSprintGoal, setNewSprintGoal] = useState("");
  const [newWeeklyGoal, setNewWeeklyGoal] = useState("");

  // Sprint lap fejléc beállítása & közvetlen hozzáadás
  const [isEditingSprintHeader, setIsEditingSprintHeader] = useState(false);
  const [sprintHeaderForm, setSprintHeaderForm] = useState({
    name: state.sprint?.name || "Sprint Fókusz",
    startDate: state.sprint?.startDate || getTodayDateString(),
    endDate: state.sprint?.endDate || getTodayDateString()
  });
  const [addingMilestoneDomain, setAddingMilestoneDomain] = useState(null);
  const [newMilestoneText, setNewMilestoneText] = useState("");

  // Hét lap gyors hozzáadása
  const [quickAddAreaTitle, setQuickAddAreaTitle] = useState(null);
  const [quickAddWeeklyText, setQuickAddWeeklyText] = useState("");

  // Célok lap
  const [expandedAreaId, setExpandedAreaId] = useState(null);
  const [editingAreaId, setEditingAreaId] = useState(null);
  const [editForm, setEditForm] = useState({ title: "", hell: "", ideal: "", nextBigGoal: "" });
  const [isAddingNewArea, setIsAddingNewArea] = useState(false);
  const [newAreaTitle, setNewAreaTitle] = useState("");

  // SERVICE WORKER REGISZTRÁCIÓ ÉS JOGOSULTSÁG ELLENŐRZÉSE
  useEffect(() => {
    if ("Notification" in window) {
      setNotificationPermission(Notification.permission);
    }
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch((err) => {
        console.warn("Service Worker hiba:", err);
      });
    }
  }, []);

  const requestNotificationAccess = async () => {
    if (!("Notification" in window)) {
      alert("Ez a böngésző nem támogatja a webes értesítéseket.");
      return;
    }
    try {
      const perm = await Notification.requestPermission();
      setNotificationPermission(perm);
      if (perm === "granted") {
        showToast("Értesítések engedélyezve!");
        triggerDirectPush("Mission Control", "A fegyelem egyenlő a szabadsággal. Értesítések aktiválva!");
      }
    } catch (e) {
      console.warn("Engedélykérés hiba:", e);
    }
  };

  const triggerDirectPush = (title, body) => {
    if ("serviceWorker" in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({
        type: "TRIGGER_NOTIFICATION",
        title: title,
        body: body
      });
    } else if ("Notification" in window && Notification.permission === "granted") {
      new Notification(title, {
        body: body,
        icon: "/icon-192.png"
      });
    } else {
      showToast(body);
    }
  };

  // HÁTTÉR-IDŐZÍTŐ
  useEffect(() => {
    const checkScheduledNotifications = () => {
      if (notificationPermission !== "granted") return;
      const now = new Date();
      const currentHours = String(now.getHours()).padStart(2, "0");
      const currentMinutes = String(now.getMinutes()).padStart(2, "0");
      const currentTimeStr = `${currentHours}:${currentMinutes}`;
      const todayStr = getTodayDateString();

      const settings = state.notificationSettings || FALLBACK_EMPTY_STATE.notificationSettings;

      if (settings.morningEnabled && settings.morningTime === currentTimeStr) {
        const alertKey = `${todayStr}_morning`;
        if (!sentAlertsTracker.current[alertKey]) {
          sentAlertsTracker.current[alertKey] = true;
          const openBig3 = (state.tasks || []).filter((t) => t.date === todayStr && t.type === "BIG3" && !t.done).length;
          triggerDirectPush(
            "🌅 Win the morning",
            openBig3 > 0
              ? `A nap első győzelme a tiéd! Még ${openBig3} Big 3 prioritás vár rád mára.`
              : "A fegyelem egyenlő a szabadsággal. Kitűzted már a mai 3 legfontosabb célodat?"
          );
        }
      }

      if (settings.middayEnabled && settings.middayTime === currentTimeStr) {
        const alertKey = `${todayStr}_midday`;
        if (!sentAlertsTracker.current[alertKey]) {
          sentAlertsTracker.current[alertKey] = true;
          const openTasks = (state.tasks || []).filter((t) => t.date === todayStr && !t.done).length;
          triggerDirectPush(
            "⚡ Félidős fegyelem-ellenőrzés",
            openTasks > 0
              ? `Még ${openTasks} nyitott feladatod van mára. Ne hagyd, hogy elússzon a nap!`
              : "Kiváló tempó! A mai prioritásaid jól haladnak."
          );
        }
      }

      if (settings.eveningEnabled && settings.eveningTime === currentTimeStr) {
        const alertKey = `${todayStr}_evening`;
        if (!sentAlertsTracker.current[alertKey]) {
          sentAlertsTracker.current[alertKey] = true;
          const todayHabitsLog = state.habitLogs?.[todayStr] || {};
          const uncompletedHabits = (state.habits || []).filter((h) => {
            const st = todayHabitsLog[h.id]?.status;
            return !(st === "done" || st === "micro" || st === "freeze");
          }).length;

          if (uncompletedHabits > 0) {
            triggerDirectPush(
              "🌙 Veszélyben a szériád!",
              `Még ${uncompletedHabits} szokás nincs kipipálva mára. Teljesítsd, vagy használj szériabefagyasztót!`
            );
          }
        }
      }
    };

    checkScheduledNotifications();
    const timer = setInterval(checkScheduledNotifications, 45000);
    return () => clearInterval(timer);
  }, [state, notificationPermission]);

  // 1. SZINKRONIZÁCIÓ SUPABASE-SZEL
  useEffect(() => {
    async function fetchServerState() {
      if (isSavingRef.current) return;
      try {
        const res = await fetch(`${SUPABASE_BASE}/app_state?id=eq.primary_user&select=data`, {
          headers: HEADERS
        });
        if (res.ok) {
          const rows = await res.json();
          if (rows && rows.length > 0 && rows[0].data) {
            const serverData = rows[0].data;
            if (!serverData.weeklyHabits && serverData.weeklyTemplates) {
              serverData.weeklyHabits = serverData.weeklyTemplates;
            }
            if (!serverData.weeklyGoals && serverData.tasks) {
              serverData.weeklyGoals = serverData.tasks.filter((t) => t.week && !t.date);
            }
            if (!serverData.notificationSettings) {
              serverData.notificationSettings = FALLBACK_EMPTY_STATE.notificationSettings;
            }
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
    isSavingRef.current = true;

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
      } finally {
        isSavingRef.current = false;
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [state]);

  const { sprint = FALLBACK_EMPTY_STATE.sprint, weeklyGoals = [], tasks = [], habits = [], habitLogs = {}, habitFreezes = {}, weeklyHabits = FALLBACK_EMPTY_STATE.weeklyHabits, dismissedRollovers = {}, dismissedWeeklyGoalRollovers = {}, notificationSettings = FALLBACK_EMPTY_STATE.notificationSettings, visionAreas = [] } = state;
  const currentArea = visionAreas[activeAreaIndex] || visionAreas[0];

  const habitGroups = Array.from(new Set(habits.map((h) => h.group || "ÁLTALÁNOS")));
  if (!newHabitGroup && habitGroups.length > 0) setNewHabitGroup(habitGroups[0]);
  if (!newHabitDomain && visionAreas.length > 0) setNewHabitDomain(visionAreas[0].title);
  if (!newQuickTaskDomain && visionAreas.length > 0) setNewQuickTaskDomain(visionAreas[0].title);

  const timelineDates = [-3, -2, -1, 0, 1].map((offset) => offsetDateString(selectedDate, offset));

  const yesterdayStr = offsetDateString(selectedDate, -1);
  const isRolloverDismissedToday = !!dismissedRollovers[selectedDate];
  const pendingYesterdayTasks = !isRolloverDismissedToday ? tasks.filter(
    (t) => t.date === yesterdayStr && (t.type === "BIG3" || t.type === "SCHEDULED") && !t.done
  ) : [];

  const currentDayTasks = tasks.filter((t) => t.date === selectedDate);
  const big3Tasks = [...currentDayTasks.filter((t) => t.type === "BIG3")].sort((a, b) => Number(a.done) - Number(b.done));
  const scheduledTasks = [...currentDayTasks.filter((t) => t.type === "SCHEDULED")].sort((a, b) => Number(a.done) - Number(b.done));
  const miniTasks = [...currentDayTasks.filter((t) => t.type === "DAILY5_MINI")].sort((a, b) => Number(a.done) - Number(b.done));

  const scoredTasks = [...big3Tasks, ...scheduledTasks];
  const completedScored = scoredTasks.filter((t) => t.done).length;
  const dayTaskPct = scoredTasks.length > 0 ? Math.round((completedScored / scoredTasks.length) * 100) : 0;

  const dayHabitLog = habitLogs[selectedDate] || {};
  const completedDayHabitsCount = habits.filter((h) => {
    const st = dayHabitLog[h.id]?.status;
    return st === "done" || st === "micro" || st === "freeze";
  }).length;
  const dayHabitPct = habits.length > 0 ? Math.round((completedDayHabitsCount / habits.length) * 100) : 0;

  const currentWeekGoals = weeklyGoals.filter((g) => g.week === currentWeekKey);
  const completedWeekGoals = currentWeekGoals.filter((g) => g.done).length;
  const weekHitRate = currentWeekGoals.length > 0 ? Math.round((completedWeekGoals / currentWeekGoals.length) * 100) : 0;
  const plannedAreasCount = visionAreas.filter((a) => currentWeekGoals.some((g) => g.domain === a.title)).length;
  const weekTimePct = Math.min(100, Math.max(0, Math.round(((new Date().getDay() || 7) / 7) * 100)));

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

  const pendingPrevWeekGoals = weeklyGoals.filter(
    (g) => g.week === prevWeekKey && !g.done && !dismissedWeeklyGoalRollovers[g.id]
  );

  const dayOfYear = Math.floor((actualNowTime - new Date(new Date().getFullYear(), 0, 1).getTime()) / 86400000);
  const todayQuote = DAILY_QUOTES[Math.abs(dayOfYear) % DAILY_QUOTES.length];

  const calculateDomainMomentum = (domainTitle) => {
    const domainHabits = habits.filter((h) => h.domain === domainTitle);
    let habitScore = 100;
    if (domainHabits.length > 0) {
      let doneCount = 0;
      for (let i = 0; i < 7; i++) {
        const d = offsetDateString(selectedDate, -i);
        const dayL = habitLogs[d] || {};
        domainHabits.forEach((h) => {
          const st = dayL[h.id]?.status;
          if (st === "done" || st === "micro") doneCount++;
        });
      }
      habitScore = Math.round((doneCount / (domainHabits.length * 7)) * 100);
    }

    const domainWeekGoals = weeklyGoals.filter((g) => g.domain === domainTitle && g.week === currentWeekKey);
    let goalScore = 0;
    if (domainWeekGoals.length > 0) {
      goalScore = Math.round((domainWeekGoals.filter((g) => g.done).length / domainWeekGoals.length) * 100);
    }

    let finalScore = 0;
    if (domainHabits.length === 0 && domainWeekGoals.length > 0) {
      finalScore = goalScore;
    } else if (domainHabits.length > 0 && domainWeekGoals.length === 0) {
      finalScore = habitScore;
    } else {
      finalScore = Math.round(0.6 * habitScore + 0.4 * goalScore);
    }

    let lastActiveDaysAgo = 999;
    for (let i = 0; i < 30; i++) {
      const d = offsetDateString(selectedDate, -i);
      const dayL = habitLogs[d] || {};
      const hasHabitDone = domainHabits.some((h) => dayL[h.id]?.status === "done" || dayL[h.id]?.status === "micro");
      const hasTaskDone = tasks.some((t) => t.domain === domainTitle && t.date === d && t.done);
      if (hasHabitDone || hasTaskDone) {
        lastActiveDaysAgo = i;
        break;
      }
    }

    return {
      score: Math.min(100, Math.max(0, finalScore)),
      habitScore,
      goalScore,
      domainHabitsCount: domainHabits.length,
      domainGoalsCount: domainWeekGoals.length,
      domainGoalsDone: domainWeekGoals.filter((g) => g.done).length,
      isNeglected: lastActiveDaysAgo >= 3,
      lastActiveDaysAgo
    };
  };

  const chartDays = Array.from({ length: 14 }).map((_, i) => offsetDateString(selectedDate, -13 + i));

  const getTaskPctForDate = (dateStr) => {
    const dTasks = tasks.filter((t) => t.date === dateStr && (t.type === "BIG3" || t.type === "SCHEDULED"));
    if (dTasks.length === 0) return 0;
    return Math.round((dTasks.filter((t) => t.done).length / dTasks.length) * 100);
  };

  const getHabitPctForDate = (dateStr) => {
    if (!habits || habits.length === 0) return 0;
    const log = habitLogs[dateStr] || {};
    const doneCount = habits.filter((h) => ["done", "micro", "freeze"].includes(log[h.id]?.status)).length;
    return Math.round((doneCount / habits.length) * 100);
  };

  const taskPctHistory = chartDays.map(getTaskPctForDate);
  const habitPctHistory = chartDays.map(getHabitPctForDate);

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

  const handleRolloverYesterdayTasks = () => {
    const copiedNewTasks = pendingYesterdayTasks.map((t) => ({
      ...t,
      id: `task-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      date: selectedDate,
      done: false
    }));
    setState((prev) => ({
      ...prev,
      tasks: [...(prev.tasks || []), ...copiedNewTasks],
      dismissedRollovers: { ...(prev.dismissedRollovers || {}), [selectedDate]: true }
    }));
    showToast(`${copiedNewTasks.length} feladat átmásolva mára!`);
  };

  const handleDismissRollover = () => {
    setState((prev) => ({
      ...prev,
      dismissedRollovers: { ...(prev.dismissedRollovers || {}), [selectedDate]: true }
    }));
  };

  const handleAddCategoryTask = (category, e) => {
    e.preventDefault();
    if (!newQuickTaskTitle.trim()) return;
    const newTask = {
      id: `task-${Date.now()}`,
      date: selectedDate,
      title: newQuickTaskTitle.trim(),
      domain: newQuickTaskDomain || (visionAreas[0]?.title || ""),
      type: category,
      done: false
    };
    setState((prev) => ({ ...prev, tasks: [newTask, ...(prev.tasks || [])] }));
    setNewQuickTaskTitle("");
    setAddingCategory(null);
  };

  const moveTaskType = (taskId, newType, e) => {
    if (e) e.stopPropagation();
    setState((prev) => ({
      ...prev,
      tasks: (prev.tasks || []).map((t) => (t.id === taskId ? { ...t, type: newType } : t))
    }));
  };

  const openEditTask = (task) => {
    setEditingTaskModal(task);
    setEditTaskTitle(task.title);
    setEditTaskDate(task.date || selectedDate);
    setEditTaskType(task.type || "BIG3");
    setEditTaskDomain(task.domain || (visionAreas[0]?.title || ""));
  };

  const handleSaveEditedTask = (e) => {
    e.preventDefault();
    if (!editTaskTitle.trim() || !editingTaskModal) return;
    setState((prev) => ({
      ...prev,
      tasks: (prev.tasks || []).map((t) =>
        t.id === editingTaskModal.id
          ? { ...t, title: editTaskTitle.trim(), date: editTaskDate, type: editTaskType, domain: editTaskDomain }
          : t
      )
    }));
    setEditingTaskModal(null);
  };

  const toggleTask = (id) => {
    setState((prev) => {
      const currentTask = (prev.tasks || []).find((t) => t.id === id);
      const isFinishing = currentTask && !currentTask.done;
      const nextDoneState = !currentTask?.done;

      const nextTasks = (prev.tasks || []).map((t) => (t.id === id ? { ...t, done: nextDoneState } : t));

      let nextWeeklyGoals = prev.weeklyGoals || [];
      if (currentTask?.goalId) {
        nextWeeklyGoals = nextWeeklyGoals.map((g) => g.id === currentTask.goalId ? { ...g, done: nextDoneState } : g);
      }

      if (isFinishing && currentTask.type === "BIG3") {
        const remainingBig3 = nextTasks.filter((t) => t.date === selectedDate && t.type === "BIG3" && !t.done);
        if (remainingBig3.length === 0) triggerConfetti();
      }
      return { ...prev, tasks: nextTasks, weeklyGoals: nextWeeklyGoals };
    });
  };

  const deleteTask = (id, e) => {
    if (e) e.stopPropagation();
    setState((prev) => ({
      ...prev,
      tasks: (prev.tasks || []).filter((t) => t.id !== id)
    }));
    if (editingTaskModal?.id === id) setEditingTaskModal(null);
  };

  const handleAddWeeklyGoal = (title, domain) => {
    if (!title.trim()) return;
    const newGoal = {
      id: `goal-${Date.now()}`,
      week: currentWeekKey,
      domain: domain,
      title: title.trim(),
      plannedDate: null,
      done: false
    };
    setState((prev) => ({
      ...prev,
      weeklyGoals: [...(prev.weeklyGoals || []), newGoal]
    }));
  };

  const toggleWeeklyGoal = (goalId) => {
    setState((prev) => {
      const g = (prev.weeklyGoals || []).find((x) => x.id === goalId);
      const nextDone = !g?.done;
      const nextGoals = (prev.weeklyGoals || []).map((x) => x.id === goalId ? { ...x, done: nextDone } : x);
      const nextTasks = (prev.tasks || []).map((t) => t.goalId === goalId ? { ...t, done: nextDone } : t);
      if (nextDone) triggerConfetti();
      return { ...prev, weeklyGoals: nextGoals, tasks: nextTasks };
    });
  };

  const deleteWeeklyGoal = (goalId, e) => {
    e.stopPropagation();
    setState((prev) => ({
      ...prev,
      weeklyGoals: (prev.weeklyGoals || []).filter((g) => g.id !== goalId)
    }));
  };

  const handleSaveWeeklyGoalText = (goalId) => {
    if (!editingGoalText.trim()) return;
    setState((prev) => ({
      ...prev,
      weeklyGoals: (prev.weeklyGoals || []).map((g) => g.id === goalId ? { ...g, title: editingGoalText.trim() } : g)
    }));
    setEditingGoalId(null);
  };

  const handleAcceptSingleGoalRollover = (goal) => {
    const newGoal = {
      id: `goal-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      week: currentWeekKey,
      domain: goal.domain,
      title: goal.title,
      plannedDate: null,
      done: false
    };
    setState((prev) => ({
      ...prev,
      weeklyGoals: [...(prev.weeklyGoals || []), newGoal],
      dismissedWeeklyGoalRollovers: { ...(prev.dismissedWeeklyGoalRollovers || {}), [goal.id]: true }
    }));
    showToast(`„${goal.title}” átmásolva erre a hétre!`);
  };

  const handleDismissSingleGoalRollover = (goalId) => {
    setState((prev) => ({
      ...prev,
      dismissedWeeklyGoalRollovers: { ...(prev.dismissedWeeklyGoalRollovers || {}), [goalId]: true }
    }));
  };

  const handleCopyGoalToTask = (goal, targetOffset, targetType = "BIG3") => {
    const targetDate = offsetDateString(selectedDate, targetOffset);
    const newTask = {
      id: `task-${Date.now()}`,
      date: targetDate,
      title: goal.title,
      type: targetType,
      domain: goal.domain,
      goalId: goal.id,
      done: goal.done
    };

    setState((prev) => ({
      ...prev,
      weeklyGoals: (prev.weeklyGoals || []).map((g) => g.id === goal.id ? { ...g, plannedDate: targetDate } : g),
      tasks: [newTask, ...(prev.tasks || [])]
    }));
    showToast(`Átmásolva ide: ${targetOffset === 0 ? "Mai" : "Holnapi"} feladatok!`);
  };

  const handleScheduleGoalToDate = (goal, dateStr) => {
    if (!dateStr) return;
    const newTask = {
      id: `task-${Date.now()}`,
      date: dateStr,
      title: goal.title,
      type: "SCHEDULED",
      domain: goal.domain,
      goalId: goal.id,
      done: goal.done
    };
    setState((prev) => ({
      ...prev,
      weeklyGoals: (prev.weeklyGoals || []).map((g) => g.id === goal.id ? { ...g, plannedDate: dateStr } : g),
      tasks: [newTask, ...(prev.tasks || [])]
    }));
    setSchedulingGoalId(null);
    showToast(`Beütemezve ide: ${formatShortDate(dateStr)}!`);
  };

  const handleCopyMilestoneToWeekly = (milestone) => {
    handleAddWeeklyGoal(milestone.title, milestone.domain);
    showToast(`Mérföldkő átmásolva a(z) ${selectedWeekNum}. hét céljai közé!`);
  };

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

  const handleApplyFreeze = (habitId) => {
    const habitFreezeData = habitFreezes[habitId] || { count: 2, lastReset: getTodayDateString() };
    if (habitFreezeData.count <= 0) {
      alert("Ehhez a szokáshoz elfogyott a szériabefagyasztód!");
      return;
    }

    const todayStatus = habitLogs[selectedDate]?.[habitId]?.status;
    const yStr = offsetDateString(selectedDate, -1);
    const yesterdayStatus = habitLogs[yStr]?.[habitId]?.status;

    let targetDate = selectedDate;
    if (todayStatus && !yesterdayStatus) targetDate = yStr;

    setState((prev) => {
      const prevLogs = prev.habitLogs || {};
      const targetDay = prevLogs[targetDate] || {};

      return {
        ...prev,
        habitLogs: {
          ...prevLogs,
          [targetDate]: { ...targetDay, [habitId]: { status: "freeze", at: new Date().toISOString() } }
        },
        habitFreezes: {
          ...(prev.habitFreezes || {}),
          [habitId]: { count: habitFreezeData.count - 1, lastReset: habitFreezeData.lastReset || getTodayDateString() }
        }
      };
    });
  };

  const getHabitStats = (habitId) => {
    let pastStreak = 0;
    for (let i = 1; i < 60; i++) {
      const d = offsetDateString(selectedDate, -i);
      const st = habitLogs[d]?.[habitId]?.status;
      if (st === "done" || st === "micro" || st === "freeze") {
        pastStreak++;
      } else {
        break;
      }
    }

    const todaySt = habitLogs[selectedDate]?.[habitId]?.status;
    const isTodayDone = todaySt === "done" || todaySt === "micro" || todaySt === "freeze";
    const currentStreak = pastStreak + (isTodayDone ? 1 : 0);

    const freezeObj = habitFreezes[habitId] || { count: 2, lastReset: getTodayDateString() };
    let currentCount = freezeObj.count ?? 2;
    let daysUntilReset = 0;

    if (currentCount < 2) {
      const lastResetTime = new Date(freezeObj.lastReset || getTodayDateString()).getTime();
      const nowTime = new Date(selectedDate).getTime();
      const elapsedDays = Math.floor((nowTime - lastResetTime) / 86400000);
      daysUntilReset = Math.max(0, 7 - (elapsedDays % 7));

      if (elapsedDays >= 7) {
        currentCount = Math.min(2, currentCount + Math.floor(elapsedDays / 7));
      }
    }

    return { streak: currentStreak, freezeCount: currentCount, daysUntilReset };
  };

  const handleDeleteHabit = (habitId) => {
    if (!window.confirm("Biztosan törölni szeretnéd ezt a szokást?")) return;
    setState((prev) => {
      const filteredHabits = (prev.habits || []).filter((h) => h.id !== habitId);
      const cleanedLogs = {};
      Object.keys(prev.habitLogs || {}).forEach((dateKey) => {
        const dayObj = { ...prev.habitLogs[dateKey] };
        delete dayObj[habitId];
        cleanedLogs[dateKey] = dayObj;
      });
      const cleanedFreezes = { ...(prev.habitFreezes || {}) };
      delete cleanedFreezes[habitId];

      return {
        ...prev,
        habits: filteredHabits,
        habitLogs: cleanedLogs,
        habitFreezes: cleanedFreezes
      };
    });
    if (selectedHabitModal?.id === habitId) setSelectedHabitModal(null);
  };

  const handleAddNewHabit = (e) => {
    e.preventDefault();
    if (!newHabitTitle.trim()) return;
    const targetGroup = newGroupInput.trim() || newHabitGroup || "ÁLTALÁNOS";
    const targetDomain = newHabitDomain || (visionAreas[0]?.title || "");
    const newH = {
      id: `h_${Date.now()}`,
      group: targetGroup,
      domain: targetDomain,
      title: newHabitTitle.trim()
    };
    setState((prev) => ({ ...prev, habits: [...(prev.habits || []), newH] }));
    setNewHabitTitle("");
    setNewGroupInput("");
  };

  const handleSaveHabitTitle = (habitId) => {
    if (!editingHabitTitle.trim()) return;
    setState((prev) => ({
      ...prev,
      habits: (prev.habits || []).map((h) => (h.id === habitId ? { ...h, title: editingHabitTitle.trim() } : h))
    }));
    setEditingHabitId(null);
  };

  const handleChangeHabitGroup = (habitId, targetGroup) => {
    setState((prev) => ({
      ...prev,
      habits: (prev.habits || []).map((h) => (h.id === habitId ? { ...h, group: targetGroup } : h))
    }));
  };

  const handleChangeHabitDomain = (habitId, targetDomain) => {
    setState((prev) => ({
      ...prev,
      habits: (prev.habits || []).map((h) => (h.id === habitId ? { ...h, domain: targetDomain } : h))
    }));
  };

  const handleRenameGroup = (oldName, newName) => {
    if (!newName.trim() || oldName === newName.trim()) {
      setEditingGroupOldName(null);
      return;
    }
    setState((prev) => ({
      ...prev,
      habits: (prev.habits || []).map((h) => (h.group === oldName ? { ...h, group: newName.trim() } : h))
    }));
    setEditingGroupOldName(null);
  };

  const selectedDayOfWeekNum = new Date(selectedDate).getDay();
  const todayDueWeeklyHabits = weeklyHabits.filter((wh) => wh.dayOfWeek === selectedDayOfWeekNum);

  const handleAddGlobalWeeklyHabit = (e) => {
    e.preventDefault();
    if (!globalWeeklyTitle.trim()) return;
    const newWh = {
      id: `wh_${Date.now()}`,
      title: globalWeeklyTitle.trim(),
      dayOfWeek: Number(globalWeeklyDay)
    };
    setState((prev) => ({ ...prev, weeklyHabits: [...(prev.weeklyHabits || []), newWh] }));
    setGlobalWeeklyTitle("");
    setIsAddingWeeklyGlobal(false);
  };

  const handleAddDaySpecificWeeklyHabit = (e, dayIndex) => {
    e.preventDefault();
    if (!daySpecificTitle.trim()) return;
    const newWh = {
      id: `wh_${Date.now()}`,
      title: daySpecificTitle.trim(),
      dayOfWeek: dayIndex
    };
    setState((prev) => ({ ...prev, weeklyHabits: [...(prev.weeklyHabits || []), newWh] }));
    setDaySpecificTitle("");
  };

  const handleDeleteWeeklyHabitItem = (id) => {
    setState((prev) => ({
      ...prev,
      weeklyHabits: (prev.weeklyHabits || []).filter((wh) => wh.id !== id)
    }));
  };

  const handleCopyWeeklyHabitToDailyTask = (wh, type = "BIG3") => {
    const newTask = {
      id: `task-${Date.now()}`,
      date: selectedDate,
      title: wh.title,
      type: type,
      done: false
    };
    setState((prev) => ({ ...prev, tasks: [newTask, ...(prev.tasks || [])] }));
    showToast(`„${wh.title}” bemásolva mára a(z) ${type === "BIG3" ? "Big 3" : "Ütemezett"} feladatok közé!`);
  };

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

  const handleAddDirectMilestone = (domainTitle, e) => {
    e.preventDefault();
    if (!newMilestoneText.trim()) return;
    const newM = { id: `m-${Date.now()}`, title: newMilestoneText.trim(), domain: domainTitle, done: false };
    setState((prev) => ({ ...prev, sprint: { ...prev.sprint, milestones: [...(prev.sprint.milestones || []), newM] } }));
    setNewMilestoneText("");
    setAddingMilestoneDomain(null);
  };

  const handleAddWeeklyGoalFromSprint = (e) => {
    e.preventDefault();
    if (!newWeeklyGoal.trim() || !currentArea) return;
    handleAddWeeklyGoal(newWeeklyGoal, currentArea.title);
    setNewWeeklyGoal("");
    setIsAddingSprintWeekly(false);
  };

  const handleRolloverPendingGoals = () => {
    if (pendingPrevWeekGoals.length === 0) return;
    const copiedGoals = pendingPrevWeekGoals.map((g) => ({
      ...g,
      id: `goal-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      week: currentWeekKey,
      done: false
    }));
    setState((prev) => ({ ...prev, weeklyGoals: [...(prev.weeklyGoals || []), ...copiedGoals] }));
  };

  const toggleMilestone = (id) => {
    setState((prev) => ({ ...prev, sprint: { ...prev.sprint, milestones: (prev.sprint.milestones || []).map((m) => (m.id === id ? { ...m, done: !m.done } : m)) } }));
  };

  const deleteMilestone = (id, e) => {
    e.stopPropagation();
    setState((prev) => ({ ...prev, sprint: { ...prev.sprint, milestones: (prev.sprint.milestones || []).filter((m) => m.id !== id) } }));
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

  const currentMomentum = currentArea ? calculateDomainMomentum(currentArea.title) : null;

  const getWeekOffsetLabel = (weekNum) => {
    const diff = weekNum - initialWeekNum;
    if (diff === 0) return "Akt.";
    if (diff > 0) return `Akt.+${diff}`;
    return `Akt.${diff}`;
  };

  const handleUpdateNotificationSettings = (key, value) => {
    setState((prev) => ({
      ...prev,
      notificationSettings: {
        ...(prev.notificationSettings || FALLBACK_EMPTY_STATE.notificationSettings),
        [key]: value
      }
    }));
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100 max-w-md mx-auto font-sans pb-28 select-none">
      
      {/* TOAST VISSZAJELZŐ */}
      {toastMessage && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-[1000] bg-emerald-500 text-slate-950 px-4 py-1.5 rounded-full text-xs font-extrabold shadow-lg shadow-emerald-500/20 flex items-center gap-1.5 animate-bounce">
          <span>✓</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* RÖGZÍTETT FEJLÉC                                                          */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-30 bg-slate-950/95 backdrop-blur border-b border-slate-800 shadow-md">
        
        {/* MA NÉZET FEJLÉCE */}
        {activeTab === "today" && (
          <div className="p-3 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <button onClick={() => setSelectedDate(offsetDateString(selectedDate, -1))} className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-800">
                <ChevronLeftIcon size={18} />
              </button>
              <div className="text-center flex-1 px-1">
                <span className="font-extrabold text-slate-100 tracking-wide text-sm block">
                  {formatNavDateLabel(selectedDate, todayActualStr)}
                </span>
                {selectedDate !== todayActualStr && (
                  <button onClick={() => setSelectedDate(todayActualStr)} className="text-[10px] text-emerald-400 underline mt-0.5">
                    Vissza a mai napra
                  </button>
                )}
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                {/* JAVÍTOTT ÉRTESÍTÉSI HARANG GOMB (JOBBAN KATTINTHATÓ TOUCH TARGET) */}
                <button
                  type="button"
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIsNotificationModalOpen(true); }}
                  className={`p-2 rounded-xl border transition shadow-sm ${
                    notificationPermission === "granted"
                      ? "text-emerald-400 border-emerald-500/40 bg-emerald-950/30 active:scale-95"
                      : "text-amber-400 border-amber-500/40 bg-amber-950/30 animate-pulse active:scale-95"
                  }`}
                  title="Push értesítések beállítása"
                >
                  <BellIcon size={16} />
                </button>
                <button onClick={() => setSelectedDate(offsetDateString(selectedDate, 1))} className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-800">
                  <ChevronRightIcon size={18} />
                </button>
              </div>
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

        {/* HÉT FEJLÉC */}
        {activeTab === "week" && (
          <div className="p-3 space-y-2">
            <div className="flex justify-between items-center">
              <button onClick={() => setSelectedWeekNum((p) => p - 1)} className="p-1 hover:bg-slate-800 rounded text-slate-400">
                <ChevronLeftIcon size={16} />
              </button>
              <div className="text-center">
                <span className="text-xs font-extrabold text-emerald-400 uppercase tracking-wider">
                  {selectedWeekNum}. Hét ({getWeekOffsetLabel(selectedWeekNum)})
                </span>
                <span className="text-[10px] text-slate-400 block">
                  Cél-teljesítés: <strong className="text-white">{weekHitRate}%</strong> ({completedWeekGoals}/{currentWeekGoals.length}) | Lefedettség: <strong className="text-white">{plannedAreasCount}/7</strong>
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

        {/* IRÁNYTŰ (VISION) RÖGZÍTETT FEJLÉC */}
        {activeTab === "vision" && currentArea && currentMomentum && (
          <div className="p-3 space-y-2 bg-slate-900 border-b border-slate-800 shadow-md">
            <div className="flex items-center justify-between gap-2">
              <button onClick={() => setActiveAreaIndex((p) => (p - 1 >= 0 ? p - 1 : visionAreas.length - 1))} className="p-1.5 text-slate-400 hover:text-white rounded-lg">
                <ChevronLeftIcon size={18} />
              </button>

              <div className="flex-1 text-center min-w-0">
                <select
                  value={activeAreaIndex}
                  onChange={(e) => setActiveAreaIndex(Number(e.target.value))}
                  className="bg-transparent text-xs sm:text-sm font-extrabold text-white text-center uppercase tracking-wide focus:outline-none cursor-pointer w-full truncate"
                >
                  {visionAreas.map((area, idx) => (
                    <option key={area.id} value={idx} className="bg-slate-900 text-slate-100">{area.title}</option>
                  ))}
                </select>
              </div>

              <div className={`px-2 py-0.5 rounded-full border text-[11px] font-black shrink-0 ${
                currentMomentum.score >= 80 ? "text-emerald-400 bg-emerald-950/40 border-emerald-500/30" :
                currentMomentum.score >= 50 ? "text-amber-400 bg-amber-950/40 border-amber-500/30" :
                "text-rose-400 bg-rose-950/40 border-rose-500/30"
              }`}>
                {currentMomentum.score}% Momentum
              </div>

              <button onClick={() => setActiveAreaIndex((p) => (p + 1 < visionAreas.length ? p + 1 : 0))} className="p-1.5 text-slate-400 hover:text-white rounded-lg">
                <ChevronRightIcon size={18} />
              </button>
            </div>

            <div className="space-y-1 pt-1">
              <div className="flex justify-between items-center text-[10px] text-slate-400">
                <span>Szokások: <strong className="text-cyan-300">{currentMomentum.habitScore}%</strong></span>
                <span>Heti célok: <strong className="text-amber-300">{currentMomentum.domainGoalsDone}/{currentMomentum.domainGoalsCount}</strong></span>
                {currentMomentum.isNeglected && (
                  <span className="text-rose-400 bg-rose-950/50 border border-rose-900/50 px-1.5 py-0.2 rounded font-bold animate-pulse">
                    {currentMomentum.lastActiveDaysAgo} napja inaktív
                  </span>
                )}
              </div>
              <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                <div 
                  className={`h-full transition-all duration-500 ${
                    currentMomentum.score >= 80 ? "bg-emerald-500" :
                    currentMomentum.score >= 50 ? "bg-amber-500" : "bg-rose-500"
                  }`} 
                  style={{ width: `${currentMomentum.score}%` }} 
                />
              </div>
            </div>
          </div>
        )}

        {/* SPRINT FEJLÉC */}
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

        {/* CÉLOK FEJLÉC */}
        {activeTab === "goals" && (
          <div className="p-3.5 bg-slate-900/90 flex items-start gap-3 border-b border-slate-800">
            <TargetIcon size={18} className="text-emerald-400 shrink-0 mt-0.5" />
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
        {/* 1. MA TAB                                                */}
        {/* ======================================================== */}
        {activeTab === "today" && (
          <div className="space-y-4">
            
            {/* 14 NAPOS MIKROGRAFIKONOK */}
            <section className="grid grid-cols-2 gap-2 bg-slate-900/80 border border-slate-800 rounded-2xl p-2.5">
              <div className="space-y-1">
                <div className="flex justify-between items-baseline text-[10px]">
                  <span className="font-bold uppercase tracking-wider text-emerald-400">Feladatok (14 nap)</span>
                  <span className="text-slate-400 font-semibold">{taskPctHistory[13]}%</span>
                </div>
                <div className="relative h-9 w-full bg-slate-950/70 rounded-lg p-0.5 border border-slate-800/80 overflow-hidden flex items-center justify-center">
                  <svg className="w-full h-full" viewBox="0 0 130 34" preserveAspectRatio="none">
                    {chartDays.map((dStr, idx) => {
                      const dayNum = new Date(dStr).getDay();
                      if (dayNum === 0 || dayNum === 6) {
                        return <rect key={dStr} x={(idx / 13) * 130 - 4.5} y={0} width={9} height={34} fill="#334155" opacity={0.35} />;
                      }
                      return null;
                    })}
                    <path d={buildSvgPath(taskPctHistory)} fill="none" stroke="#10b981" strokeWidth="1.8" strokeLinecap="round" />
                    <path d={buildSvgPath(taskSMA7History)} fill="none" stroke="#fbbf24" strokeWidth="1.4" strokeDasharray="2,2" strokeLinecap="round" opacity={0.9} />
                    <circle cx={130} cy={34 - (taskPctHistory[13] / 100) * 28 - 3} r="2.5" fill="#10b981" />
                  </svg>
                </div>
                <div className="flex justify-between text-[9px] text-slate-500 font-medium">
                  <span>Ma: <strong className="text-emerald-400">{taskPctHistory[13]}%</strong></span>
                  <span>SMA7: <strong className="text-amber-400">{taskSMA7History[13]}%</strong></span>
                </div>
              </div>

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
                        return <rect key={dStr} x={(idx / 13) * 130 - 4.5} y={0} width={9} height={34} fill="#334155" opacity={0.35} />;
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

            {/* TEGNAPRÓL MARADT FELADATOK */}
            {pendingYesterdayTasks.length > 0 && (
              <div className="bg-amber-950/25 border border-amber-900/50 rounded-2xl p-3 flex items-center justify-between gap-2 shadow-sm">
                <div className="text-xs text-amber-200">
                  <strong className="block font-bold">{pendingYesterdayTasks.length} elmaradt feladat tegnapról</strong>
                  <span className="text-[10px] text-slate-400">Áthozod őket mára?</span>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={handleRolloverYesterdayTasks}
                    className="bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1 transition"
                  >
                    <span>Átmásolás</span>
                    <ArrowRightIcon size={12} />
                  </button>
                  <button
                    onClick={handleDismissRollover}
                    className="text-slate-500 hover:text-slate-300 p-1 rounded-lg hover:bg-slate-800 transition"
                  >
                    <CloseIcon size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* 1. BIG 3 PRIORITÁS */}
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
                >
                  <PlusIcon size={14} />
                </button>
              </div>

              {addingCategory === "BIG3" && (
                <form onSubmit={(e) => handleAddCategoryTask("BIG3", e)} className="p-2 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
                  <input
                    type="text"
                    placeholder="Új Big 3 prioritás mára..."
                    value={newQuickTaskTitle}
                    onChange={(e) => setNewQuickTaskTitle(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    autoFocus
                  />
                  <div className="flex gap-2">
                    <select
                      value={newQuickTaskDomain}
                      onChange={(e) => setNewQuickTaskDomain(e.target.value)}
                      className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-2 py-1 text-xs text-slate-300"
                    >
                      {visionAreas.map((a) => (
                        <option key={a.id} value={a.title}>{a.title}</option>
                      ))}
                    </select>
                    <button type="submit" className="bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs px-3 py-1 rounded-lg font-bold shrink-0">
                      Hozzáad
                    </button>
                  </div>
                </form>
              )}

              <div className="space-y-1.5">
                {big3Tasks.map((task) => (
                  <div 
                    key={task.id} 
                    draggable
                    onDragStart={(e) => e.dataTransfer.setData("taskId", task.id)}
                    className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition ${task.done ? "bg-slate-950/40 border-slate-800/60 text-slate-500 line-through opacity-60" : "bg-slate-900 border-slate-800 text-slate-100 hover:border-slate-700"}`}
                  >
                    <div onClick={() => toggleTask(task.id)} className="flex items-center gap-2.5 pr-2 flex-1">
                      {task.done ? <CheckCircleIcon size={18} className="text-emerald-500 shrink-0" /> : <CircleIcon size={18} className="text-slate-500 shrink-0" />}
                      <div>
                        <span onClick={(e) => { e.stopPropagation(); openEditTask(task); }} className="text-xs font-medium hover:text-amber-300 transition cursor-text block">
                          {task.title}
                        </span>
                        {task.domain && <span className="text-[9px] text-emerald-400/80 block mt-0.5">{task.domain}</span>}
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button onClick={(e) => moveTaskType(task.id, "SCHEDULED", e)} className="text-[10px] text-slate-500 hover:text-blue-300 px-1.5 py-0.5 rounded hover:bg-slate-800 transition">
                        Ütemezve
                      </button>
                      <button onClick={(e) => deleteTask(task.id, e)} className="text-slate-600 hover:text-red-400 p-1"><TrashIcon size={13} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 2. ÜTEMEZETT FELADATOK */}
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
                >
                  <PlusIcon size={14} />
                </button>
              </div>

              {addingCategory === "SCHEDULED" && (
                <form onSubmit={(e) => handleAddCategoryTask("SCHEDULED", e)} className="p-2 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
                  <input
                    type="text"
                    placeholder="Új ütemezett teendő mára..."
                    value={newQuickTaskTitle}
                    onChange={(e) => setNewQuickTaskTitle(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    autoFocus
                  />
                  <div className="flex gap-2">
                    <select
                      value={newQuickTaskDomain}
                      onChange={(e) => setNewQuickTaskDomain(e.target.value)}
                      className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-2 py-1 text-xs text-slate-300"
                    >
                      {visionAreas.map((a) => (
                        <option key={a.id} value={a.title}>{a.title}</option>
                      ))}
                    </select>
                    <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white text-xs px-3 py-1 rounded-lg font-semibold shrink-0">
                      Hozzáad
                    </button>
                  </div>
                </form>
              )}

              <div className="space-y-1.5">
                {scheduledTasks.map((task) => (
                  <div 
                    key={task.id} 
                    draggable
                    onDragStart={(e) => e.dataTransfer.setData("taskId", task.id)}
                    className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition ${task.done ? "bg-slate-950/40 border-slate-800/60 text-slate-500 line-through opacity-60" : "bg-slate-900 border-slate-800 text-slate-200"}`}
                  >
                    <div onClick={() => toggleTask(task.id)} className="flex items-center gap-2.5 pr-2 flex-1">
                      {task.done ? <CheckCircleIcon size={16} className="text-emerald-500 shrink-0" /> : <CircleIcon size={16} className="text-slate-600 shrink-0" />}
                      <div>
                        <span onClick={(e) => { e.stopPropagation(); openEditTask(task); }} className="text-xs hover:text-blue-300 transition cursor-text block">
                          {task.title}
                        </span>
                        {task.domain && <span className="text-[9px] text-blue-400/80 block mt-0.5">{task.domain}</span>}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={(e) => moveTaskType(task.id, "BIG3", e)}
                        className="bg-amber-500/10 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30 text-[10px] font-semibold px-2 py-0.5 rounded-lg flex items-center gap-0.5 transition"
                      >
                        <ArrowUpIcon size={11} />
                        <span>Big3</span>
                      </button>
                      <button onClick={(e) => deleteTask(task.id, e)} className="text-slate-600 hover:text-red-400 p-1"><TrashIcon size={13} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 3. MINI FELADATOK */}
            <section className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Mini feladatok ({miniTasks.filter((t) => t.done).length}/{miniTasks.length})
                </span>
                <button
                  onClick={() => setAddingCategory(addingCategory === "DAILY5_MINI" ? null : "DAILY5_MINI")}
                  className={`p-1 rounded-lg transition ${addingCategory === "DAILY5_MINI" ? "bg-slate-700 text-white" : "text-slate-500 hover:text-slate-300 hover:bg-slate-800"}`}
                >
                  <PlusIcon size={14} />
                </button>
              </div>

              {addingCategory === "DAILY5_MINI" && (
                <form onSubmit={(e) => handleAddCategoryTask("DAILY5_MINI", e)} className="p-2 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
                  <input
                    type="text"
                    placeholder="Gyors apróság..."
                    value={newQuickTaskTitle}
                    onChange={(e) => setNewQuickTaskTitle(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-slate-500"
                    autoFocus
                  />
                  <div className="flex gap-2">
                    <select
                      value={newQuickTaskDomain}
                      onChange={(e) => setNewQuickTaskDomain(e.target.value)}
                      className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-2 py-1 text-xs text-slate-300"
                    >
                      {visionAreas.map((a) => (
                        <option key={a.id} value={a.title}>{a.title}</option>
                      ))}
                    </select>
                    <button type="submit" className="bg-slate-800 hover:bg-slate-700 text-white text-xs px-3 py-1.5 rounded-lg font-semibold shrink-0">
                      Hozzáad
                    </button>
                  </div>
                </form>
              )}

              <div className="space-y-1.5">
                {miniTasks.map((task) => (
                  <div key={task.id} onClick={() => toggleTask(task.id)} className={`p-2 rounded-lg flex items-center justify-between text-xs cursor-pointer border ${task.done ? "bg-slate-950/40 border-slate-900 text-slate-600 line-through opacity-50" : "bg-slate-900/60 border-slate-800/80 text-slate-300"}`}>
                    <div className="flex items-center gap-2 pr-2">
                      {task.done ? <CheckCircleIcon size={15} className="text-slate-500 shrink-0" /> : <CircleIcon size={15} className="text-slate-600 shrink-0" />}
                      <span>{task.title}</span>
                    </div>
                    <button onClick={(e) => deleteTask(task.id, e)} className="text-slate-600 hover:text-red-400 p-0.5"><TrashIcon size={12} /></button>
                  </div>
                ))}
              </div>
            </section>

            {/* 4. NAPI SZOKÁSOK */}
            <section className="space-y-4 pt-3">
              <div className="flex justify-between items-center px-1 border-b border-slate-800/80 pb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Napi Szokások</span>
                <button
                  onClick={() => setIsManagingHabits(!isManagingHabits)}
                  className="text-[11px] text-slate-400 hover:text-cyan-300 flex items-center gap-1 transition p-1 rounded hover:bg-slate-800"
                >
                  <EditIcon size={13} />
                  <span>{isManagingHabits ? "Kész" : "Szokások kezelése"}</span>
                </button>
              </div>

              {/* Szokáskezelő panel */}
              {isManagingHabits && (
                <div className="bg-slate-900 border border-cyan-800/60 rounded-2xl p-3.5 space-y-3.5 shadow-md">
                  <div className="space-y-1.5 border-b border-slate-800 pb-3">
                    <span className="text-xs font-bold text-slate-200 block">Főkategóriák átnevezése</span>
                    <div className="space-y-1.5">
                      {habitGroups.map((g) => (
                        <div key={g} className="flex items-center justify-between text-xs p-1.5 bg-slate-950 rounded-lg border border-slate-800">
                          {editingGroupOldName === g ? (
                            <div className="flex gap-1.5 flex-1">
                              <input
                                type="text"
                                value={editingGroupNewName}
                                onChange={(e) => setEditingGroupNewName(e.target.value)}
                                className="flex-1 bg-slate-900 border border-slate-700 rounded px-2 py-0.5 text-xs text-slate-100"
                                autoFocus
                              />
                              <button onClick={() => handleRenameGroup(g, editingGroupNewName)} className="bg-emerald-600 text-white text-[10px] px-2 py-0.5 rounded font-bold">Mentés</button>
                              <button onClick={() => setEditingGroupOldName(null)} className="text-slate-400 text-[10px] px-1">Mégse</button>
                            </div>
                          ) : (
                            <>
                              <span className="font-bold text-slate-300">{g}</span>
                              <button onClick={() => { setEditingGroupOldName(g); setEditingGroupNewName(g); }} className="text-slate-400 hover:text-cyan-300 p-1">
                                <EditIcon size={12} />
                              </button>
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-xs font-bold text-cyan-300">Új szokás hozzáadása</div>
                    <form onSubmit={handleAddNewHabit} className="space-y-2">
                      <input
                        type="text"
                        placeholder="Szokás neve..."
                        value={newHabitTitle}
                        onChange={(e) => setNewHabitTitle(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                      />
                      <div className="space-y-1.5">
                        <div className="flex gap-2">
                          <select
                            value={newHabitGroup}
                            onChange={(e) => { setNewHabitGroup(e.target.value); setNewGroupInput(""); }}
                            className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-2 py-1.5 text-xs text-slate-200 focus:outline-none"
                          >
                            {habitGroups.map((g) => (
                              <option key={g} value={g}>{g}</option>
                            ))}
                          </select>
                          <select
                            value={newHabitDomain}
                            onChange={(e) => setNewHabitDomain(e.target.value)}
                            className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-2 py-1.5 text-xs text-slate-200 focus:outline-none"
                          >
                            {visionAreas.map((a) => (
                              <option key={a.id} value={a.title}>{a.title}</option>
                            ))}
                          </select>
                        </div>
                        <input
                          type="text"
                          placeholder="VAGY új főkategória neve..."
                          value={newGroupInput}
                          onChange={(e) => setNewGroupInput(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1 text-[11px] text-slate-200 placeholder-slate-600"
                        />
                        <button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-500 text-white py-1.5 rounded-lg text-xs font-semibold">
                          Szokás rögzítése
                        </button>
                      </div>
                    </form>
                  </div>

                  <div className="pt-2 border-t border-slate-800 space-y-2 max-h-56 overflow-y-auto pr-1">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Szokások szerkesztése & törlése</span>
                    {habits.map((h) => (
                      <div key={h.id} className="p-2 bg-slate-950 border border-slate-800 rounded-xl space-y-1.5 text-xs">
                        {editingHabitId === h.id ? (
                          <div className="flex gap-1.5">
                            <input
                              type="text"
                              value={editingHabitTitle}
                              onChange={(e) => setEditingHabitTitle(e.target.value)}
                              className="flex-1 bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-slate-100"
                              autoFocus
                            />
                            <button onClick={() => handleSaveHabitTitle(h.id)} className="bg-emerald-600 text-white text-[10px] px-2 py-1 rounded font-bold">Mentés</button>
                            <button onClick={() => setEditingHabitId(null)} className="text-slate-400 text-[10px] px-1">Mégse</button>
                          </div>
                        ) : (
                          <div className="flex justify-between items-center">
                            <span className="font-medium text-slate-200">{h.title}</span>
                            <div className="flex items-center gap-1.5">
                              <button onClick={() => { setEditingHabitId(h.id); setEditingHabitTitle(h.title); }} className="text-slate-400 hover:text-cyan-300 p-1">
                                <EditIcon size={12} />
                              </button>
                              <button onClick={() => handleDeleteHabit(h.id)} className="text-slate-500 hover:text-red-400 p-1" title="Végleges törlés">
                                <TrashIcon size={13} />
                              </button>
                            </div>
                          </div>
                        )}
                        <div className="grid grid-cols-2 gap-1 text-[10px] text-slate-400">
                          <select
                            value={h.group}
                            onChange={(e) => handleChangeHabitGroup(h.id, e.target.value)}
                            className="bg-slate-900 border border-slate-800 rounded px-1.5 py-0.5 text-[10px] text-slate-300"
                          >
                            {habitGroups.map((g) => (
                              <option key={g} value={g}>{g}</option>
                            ))}
                          </select>
                          <select
                            value={h.domain || (visionAreas[0]?.title || "")}
                            onChange={(e) => handleChangeHabitDomain(h.id, e.target.value)}
                            className="bg-slate-900 border border-slate-800 rounded px-1.5 py-0.5 text-[10px] text-slate-300 truncate"
                          >
                            {visionAreas.map((a) => (
                              <option key={a.id} value={a.title}>{a.title}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Szokások listája a felületen */}
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
                          const { streak, freezeCount, daysUntilReset } = getHabitStats(habit.id);

                          return (
                            <div key={habit.id} className={`p-2 rounded-xl flex items-center justify-between transition-all duration-300 ${isComplete ? "bg-slate-900/40 opacity-60" : "bg-slate-900/90 border border-slate-800/80 hover:border-slate-700"}`}>
                              <div onClick={() => setSelectedHabitModal(habit)} className="flex-1 pr-2 cursor-pointer">
                                <span className={`text-xs font-medium block hover:text-cyan-300 transition ${isComplete ? "line-through text-slate-400" : "text-slate-200"}`}>
                                  {habit.title}
                                </span>
                                
                                <div className="flex items-center gap-2 text-[10px] text-slate-500 mt-1">
                                  <span className="flex items-center gap-0.5 text-amber-400 font-semibold">
                                    <FlameIcon size={11} /> {streak} nap
                                  </span>

                                  {/* 🧊 FAGYASZTÓ + VISSZASZÁMLÁLÓ */}
                                  <button
                                    onClick={(e) => { e.stopPropagation(); handleApplyFreeze(habit.id); }}
                                    className={`px-1.5 py-0.5 rounded flex items-center gap-1 border text-[9px] transition ${
                                      currentStatus === "freeze" ? "bg-blue-500/30 text-blue-300 border-blue-400" : "bg-slate-950 text-slate-400 border-slate-800 hover:text-blue-300 hover:border-blue-500/40"
                                    }`}
                                    title="Szériabefagyasztás"
                                  >
                                    <span>🧊 {freezeCount}</span>
                                    {freezeCount < 2 && daysUntilReset > 0 && (
                                      <span className="text-[8px] text-cyan-400 font-normal">({daysUntilReset}n)</span>
                                    )}
                                  </button>

                                  <button
                                    onClick={(e) => { e.stopPropagation(); handleSetMicroStatus(habit.id); }}
                                    className={`px-1.5 py-0.5 rounded border text-[9px] font-semibold transition ${
                                      currentStatus === "micro" ? "bg-emerald-500/30 text-emerald-300 border-emerald-400" : "bg-slate-950 text-slate-400 border-slate-800 hover:text-emerald-300 hover:border-emerald-500/40"
                                    }`}
                                    title="Micro szokás teljesítve"
                                  >
                                    Micro
                                  </button>
                                </div>
                              </div>

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

            {/* 5. HETI SZOKÁSOK MODUL */}
            <section className="bg-slate-900 border border-slate-800 rounded-2xl p-3.5 space-y-3">
              <div className="flex justify-between items-center border-b border-slate-800/80 pb-2">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-300 block">Heti szokások</span>
                  <span className="text-[10px] text-slate-500">Kattints a napra a részletekért</span>
                </div>
                <button
                  onClick={() => setIsAddingWeeklyGlobal(!isAddingWeeklyGlobal)}
                  className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-emerald-400 transition"
                  title="Új heti szokás felvétele"
                >
                  <PlusIcon size={15} />
                </button>
              </div>

              {isAddingWeeklyGlobal && (
                <form onSubmit={handleAddGlobalWeeklyHabit} className="bg-slate-950 border border-slate-800 rounded-xl p-2.5 space-y-2">
                  <input
                    type="text"
                    placeholder="Heti szokás neve..."
                    value={globalWeeklyTitle}
                    onChange={(e) => setGlobalWeeklyTitle(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    autoFocus
                  />
                  <div className="flex gap-2">
                    <select
                      value={globalWeeklyDay}
                      onChange={(e) => setGlobalWeeklyDay(e.target.value)}
                      className="flex-1 bg-slate-900 border border-slate-800 rounded px-2 py-1 text-xs text-slate-200"
                    >
                      {WEEK_DAYS_NAMES.map((d) => (
                        <option key={d.dayIndex} value={d.dayIndex}>{d.label}</option>
                      ))}
                    </select>
                    <button type="submit" className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1 rounded text-xs font-semibold shrink-0">
                      Hozzáad
                    </button>
                  </div>
                </form>
              )}

              {/* Ma esedékes */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold uppercase text-slate-400 block">Ma esedékes:</span>
                {todayDueWeeklyHabits.map((wh) => (
                  <div key={wh.id} className="p-2 bg-slate-950 border border-slate-800/80 rounded-xl flex items-center justify-between text-xs">
                    <span className="text-slate-200 font-medium">{wh.title}</span>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleCopyWeeklyHabitToDailyTask(wh, "BIG3")}
                        className="bg-amber-500/10 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30 text-[10px] font-semibold px-2 py-0.5 rounded transition"
                      >
                        + Big3
                      </button>
                      <button
                        onClick={() => handleCopyWeeklyHabitToDailyTask(wh, "SCHEDULED")}
                        className="bg-blue-500/10 hover:bg-blue-500/25 text-blue-300 border border-blue-500/30 text-[10px] font-semibold px-2 py-0.5 rounded transition"
                      >
                        + Ütemezve
                      </button>
                    </div>
                  </div>
                ))}
                {todayDueWeeklyHabits.length === 0 && (
                  <p className="text-[11px] text-slate-600 italic px-1">Mára nincs beütemezett heti szokás.</p>
                )}
              </div>

              {/* Heti naptár karikákkal */}
              <div className="pt-2 border-t border-slate-800/80 space-y-2">
                <span className="text-[10px] font-bold uppercase text-slate-400 block">Heti áttekintés:</span>
                <div className="grid grid-cols-7 gap-1">
                  {WEEK_DAYS_NAMES.map((day) => {
                    const isSelectedDay = day.dayIndex === selectedDayOfWeekNum;
                    const isZoomed = zoomDayIndex === day.dayIndex;
                    const dayHabits = weeklyHabits.filter((wh) => wh.dayOfWeek === day.dayIndex);

                    return (
                      <div
                        key={day.dayIndex}
                        onClick={() => setZoomDayIndex(isZoomed ? null : day.dayIndex)}
                        className={`p-1.5 rounded-xl border flex flex-col items-center gap-1 cursor-pointer transition ${
                          isZoomed ? "bg-slate-800 border-cyan-400" :
                          isSelectedDay ? "bg-slate-950 border-amber-500/50" : "bg-slate-950/60 border-slate-800/80 hover:bg-slate-900"
                        }`}
                      >
                        <span className={`text-[10px] font-bold ${isSelectedDay ? "text-amber-400" : "text-slate-400"}`}>
                          {day.short}
                        </span>

                        <div className="flex flex-wrap justify-center gap-0.5 min-h-[18px]">
                          {dayHabits.map((wh) => (
                            <span
                              key={wh.id}
                              className="w-4 h-4 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-[8px] font-extrabold flex items-center justify-center"
                              title={wh.title}
                            >
                              {wh.title.charAt(0).toUpperCase()}
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Belezoomolt nap nézet */}
              {zoomDayIndex !== null && (
                <div className="bg-slate-950 border border-cyan-800/60 rounded-xl p-3 space-y-2.5 mt-2 animate-fadeIn">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-1.5">
                    <span className="text-xs font-extrabold text-cyan-300">
                      {WEEK_DAYS_NAMES.find((d) => d.dayIndex === zoomDayIndex)?.label} szokásai
                    </span>
                    <button onClick={() => setZoomDayIndex(null)} className="text-[10px] text-slate-400 hover:text-white">
                      Bezárás ▴
                    </button>
                  </div>

                  <form onSubmit={(e) => handleAddDaySpecificWeeklyHabit(e, zoomDayIndex)} className="flex gap-1.5">
                    <input
                      type="text"
                      placeholder={`Új szokás ide: ${WEEK_DAYS_NAMES.find((d) => d.dayIndex === zoomDayIndex)?.label}...`}
                      value={daySpecificTitle}
                      onChange={(e) => setDaySpecificTitle(e.target.value)}
                      className="flex-1 bg-slate-900 border border-slate-800 rounded px-2 py-1 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                    />
                    <button type="submit" className="bg-cyan-600 hover:bg-cyan-500 text-white px-2.5 py-1 rounded text-xs font-bold shrink-0">
                      +
                    </button>
                  </form>

                  <div className="space-y-1 pt-1">
                    {weeklyHabits.filter((wh) => wh.dayOfWeek === zoomDayIndex).map((wh) => (
                      <div key={wh.id} className="p-1.5 bg-slate-900/90 rounded-lg flex items-center justify-between text-xs">
                        <span className="text-slate-200">{wh.title}</span>
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => handleCopyWeeklyHabitToDailyTask(wh, "BIG3")}
                            className="text-[9px] bg-amber-500/15 text-amber-300 border border-amber-500/30 px-1.5 py-0.5 rounded"
                          >
                            + Big3
                          </button>
                          <button
                            onClick={() => handleDeleteWeeklyHabitItem(wh.id)}
                            className="text-slate-500 hover:text-red-400 p-0.5"
                          >
                            <TrashIcon size={12} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </section>

          </div>
        )}

        {/* ======================================================== */}
        {/* 2. HÉT TAB                                               */}
        {/* ======================================================== */}
        {activeTab === "week" && (
          <div className="space-y-4">
            
            {pendingPrevWeekGoals.length > 0 && (
              <section className="bg-amber-950/20 border border-amber-900/40 rounded-2xl p-3 space-y-2 shadow-sm">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block">
                  Előző heti elmaradt célok ({pendingPrevWeekGoals.length} db)
                </span>
                <p className="text-[11px] text-slate-400">Döntsd el egyesével: megpróbálkozol vele ezen a héten újra, vagy elengeded?</p>

                <div className="space-y-1.5 pt-1">
                  {pendingPrevWeekGoals.map((goal) => (
                    <div key={goal.id} className="p-2 bg-slate-950/80 border border-slate-800 rounded-xl flex items-center justify-between gap-2 text-xs">
                      <div>
                        <span className="text-slate-200 font-medium block">{goal.title}</span>
                        <span className="text-[9px] text-slate-500">{goal.domain}</span>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={() => handleAcceptSingleGoalRollover(goal)}
                          className="bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-bold px-2 py-1 rounded-lg transition"
                        >
                          Igen, áthozom
                        </button>
                        <button
                          onClick={() => handleDismissSingleGoalRollover(goal.id)}
                          className="bg-slate-800 hover:bg-slate-700 text-slate-400 text-[10px] px-2 py-1 rounded-lg transition"
                        >
                          Elengedem
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <div className="space-y-3">
              {visionAreas.map((area) => {
                const areaGoals = currentWeekGoals.filter((g) => g.domain === area.title);
                const doneCount = areaGoals.filter((g) => g.done).length;
                const isAddingHere = quickAddAreaTitle === area.title;

                return (
                  <div key={area.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-3.5 space-y-2">
                    <div className="flex justify-between items-center border-b border-slate-800/80 pb-2">
                      <div className="flex items-center gap-2 flex-1">
                        <span className={`w-2 h-2 rounded-full ${areaGoals.length > 0 ? "bg-emerald-400" : "bg-slate-600"}`} />
                        <h3 className="text-xs font-bold text-slate-200">{area.title}</h3>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className={`text-[10px] px-2 py-0.5 rounded font-semibold ${
                          areaGoals.length === 0 ? "bg-red-500/10 text-red-400 border border-red-500/20" : "bg-slate-800 text-slate-300"
                        }`}>
                          {areaGoals.length === 0 ? "Nincs cél!" : `${doneCount}/${areaGoals.length}`}
                        </span>

                        <button
                          onClick={() => {
                            if (isAddingHere) setQuickAddAreaTitle(null);
                            else { setQuickAddAreaTitle(area.title); setQuickAddWeeklyText(""); }
                          }}
                          className={`p-1 rounded-lg transition ${isAddingHere ? "bg-blue-600 text-white" : "text-slate-400 hover:text-emerald-400 hover:bg-slate-800"}`}
                        >
                          <PlusIcon size={14} />
                        </button>
                      </div>
                    </div>

                    {isAddingHere && (
                      <form onSubmit={(e) => { e.preventDefault(); handleAddWeeklyGoal(quickAddWeeklyText, area.title); setQuickAddWeeklyText(""); setQuickAddAreaTitle(null); }} className="flex gap-1.5 pt-1">
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
                      {areaGoals.map((goal) => {
                        const plannedDayLabel = goal.plannedDate ? `${getDayShortName(goal.plannedDate)} ${formatShortDate(goal.plannedDate)}` : null;

                        return (
                          <div key={goal.id} className="p-2 bg-slate-950/80 border border-slate-800/80 rounded-xl space-y-1.5">
                            {editingGoalId === goal.id ? (
                              <div className="flex gap-1.5">
                                <input
                                  type="text"
                                  value={editingGoalText}
                                  onChange={(e) => setEditingGoalText(e.target.value)}
                                  className="flex-1 bg-slate-900 border border-slate-700 rounded px-2 py-0.5 text-xs text-slate-100"
                                  autoFocus
                                />
                                <button onClick={() => handleSaveWeeklyGoalText(goal.id)} className="bg-emerald-600 text-white text-[10px] px-2 py-1 rounded font-bold">Mentés</button>
                                <button onClick={() => setEditingGoalId(null)} className="text-slate-400 text-[10px] px-1">Mégse</button>
                              </div>
                            ) : (
                              <div className="flex items-center justify-between text-xs gap-2">
                                <div onClick={() => toggleWeeklyGoal(goal.id)} className="flex items-center gap-2 cursor-pointer flex-1 min-w-0 pr-1">
                                  {goal.done ? <CheckCircleIcon size={15} className="text-emerald-400 shrink-0" /> : <CircleIcon size={15} className="text-slate-600 shrink-0" />}
                                  <span className={`truncate ${goal.done ? "line-through text-slate-500" : "text-slate-200"}`}>{goal.title}</span>
                                  {plannedDayLabel && (
                                    <span className="text-[10px] bg-slate-900 border border-slate-800 text-amber-400 px-1.5 py-0.5 rounded shrink-0">
                                      {plannedDayLabel}
                                    </span>
                                  )}
                                </div>

                                <div className="flex items-center gap-1 shrink-0">
                                  <button onClick={() => { setEditingGoalId(goal.id); setEditingGoalText(goal.title); }} className="text-slate-500 hover:text-cyan-300 p-1">
                                    <EditIcon size={12} />
                                  </button>
                                  <button
                                    onClick={() => handleCopyGoalToTask(goal, 0, "BIG3")}
                                    className="p-1.5 rounded-lg bg-amber-500/15 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 transition"
                                    title="Másolás mára"
                                  >
                                    <SunIcon size={13} />
                                  </button>
                                  <button
                                    onClick={() => handleCopyGoalToTask(goal, 1, "BIG3")}
                                    className="px-1.5 py-1 rounded-lg bg-blue-500/15 hover:bg-blue-500/30 text-blue-300 border border-blue-500/40 text-[10px] font-bold flex items-center gap-0.5 transition"
                                    title="Másolás holnapra"
                                  >
                                    <SunIcon size={12} />
                                    <span>+1</span>
                                  </button>
                                  <button
                                    onClick={() => setSchedulingGoalId(schedulingGoalId === goal.id ? null : goal.id)}
                                    className={`p-1.5 rounded-lg border transition ${
                                      schedulingGoalId === goal.id
                                        ? "bg-cyan-500/30 text-cyan-300 border-cyan-400"
                                        : "bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200"
                                    }`}
                                    title="Ütemezés választott napra"
                                  >
                                    <CalendarIcon size={13} />
                                  </button>
                                  <button onClick={(e) => deleteWeeklyGoal(goal.id, e)} className="text-slate-600 hover:text-red-400 p-0.5">
                                    <TrashIcon size={12} />
                                  </button>
                                </div>
                              </div>
                            )}

                            {schedulingGoalId === goal.id && (
                              <div className="p-2 bg-slate-900 border border-slate-800 rounded-lg flex items-center justify-between gap-2 text-[10px]">
                                <span className="text-slate-400 font-medium">Nap kiválasztása:</span>
                                <input
                                  type="date"
                                  defaultValue={goal.plannedDate || selectedDate}
                                  onChange={(e) => handleScheduleGoalToDate(goal, e.target.value)}
                                  className="bg-slate-950 border border-slate-700 rounded px-2 py-0.5 text-slate-100 text-[10px]"
                                />
                              </div>
                            )}

                          </div>
                        );
                      })}

                      {areaGoals.length === 0 && !isAddingHere && (
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
        {/* 3. IRÁNYTŰ TAB (FENTRŐL LEFELÉ FÓKUSZ)                   */}
        {/* ======================================================== */}
        {activeTab === "vision" && currentArea && (
          <div className="space-y-4 touch-pan-y" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
            
            {/* 1. ÉLETTERÜLET NAGY KÉP */}
            <section className="bg-slate-900 border border-emerald-500/30 rounded-2xl p-3.5 space-y-2.5 shadow-lg shadow-black/20">
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

            {/* 2. SPRINT-CÉLOK (MÁSOLÁS HETI CÉLKÉNT GOMBBAL) */}
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
                {milestones.filter((m) => m.domain === currentArea.title).map((m) => (
                  <div key={m.id} className="p-2 bg-slate-950/60 border border-slate-800/80 rounded-xl flex items-center justify-between gap-2">
                    <div onClick={() => toggleMilestone(m.id)} className="flex items-center gap-2.5 cursor-pointer flex-1 pr-1">
                      {m.done ? <CheckCircleIcon size={16} className="text-emerald-400 shrink-0" /> : <CircleIcon size={16} className="text-slate-600 shrink-0" />}
                      <span className={`text-xs ${m.done ? "line-through text-slate-500" : "text-slate-200"}`}>{m.title}</span>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => handleCopyMilestoneToWeekly(m)}
                        className="bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold px-2 py-0.5 rounded transition"
                        title={`Másolás a(z) ${selectedWeekNum}. hét céljai közé`}
                      >
                        + Hétre
                      </button>
                      <button onClick={(e) => deleteMilestone(m.id, e)} className="text-slate-600 hover:text-red-400 p-1"><TrashIcon size={13} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 3. HETI CÉLOK */}
            <section className="bg-slate-900 border border-slate-800 rounded-2xl p-3.5 space-y-2.5">
              <div className="flex justify-between items-center border-b border-slate-800/80 pb-2">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Heti célok</span>
                  <div className="flex items-center bg-slate-950 border border-slate-800 rounded-lg px-1 text-[11px]">
                    <button onClick={() => setSelectedWeekNum((p) => p - 1)} className="px-1 text-slate-400 hover:text-white">‹</button>
                    <span className="px-1 font-bold text-slate-200">{selectedWeekNum}. hét ({getWeekOffsetLabel(selectedWeekNum)})</span>
                    <button onClick={() => setSelectedWeekNum((p) => p + 1)} className="px-1 text-slate-400 hover:text-white">›</button>
                  </div>
                </div>
                <button onClick={() => setIsAddingSprintWeekly(!isAddingSprintWeekly)} className="p-1 text-slate-400 hover:text-amber-400">
                  <PlusIcon size={15} />
                </button>
              </div>

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
                {currentWeekGoals.filter((g) => g.domain === currentArea.title).map((goal) => {
                  const isAlreadyCopiedToTask = tasks.some((t) => t.goalId === goal.id && t.date === selectedDate);

                  return (
                    <div key={goal.id} className="p-2 bg-slate-950/60 border border-slate-800/80 rounded-xl flex items-center justify-between gap-2">
                      <div onClick={() => toggleWeeklyGoal(goal.id)} className="flex items-center gap-2 cursor-pointer flex-1 pr-1">
                        {goal.done ? <CheckCircleIcon size={16} className="text-amber-400 shrink-0" /> : <CircleIcon size={16} className="text-slate-600 shrink-0" />}
                        <span className={`text-xs ${goal.done ? "line-through text-slate-500" : "text-slate-200"}`}>{goal.title}</span>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        {isAlreadyCopiedToTask ? (
                          <span className="text-[10px] text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-2 py-0.5 rounded font-bold">
                            ✓ Átmásolva
                          </span>
                        ) : (
                          <button
                            onClick={() => handleCopyGoalToTask(goal, 0, "BIG3")}
                            className="p-1 rounded-lg bg-amber-500/15 text-amber-300 border border-amber-500/30 text-[10px] font-bold flex items-center gap-1"
                            title="Másolás mára feladatként"
                          >
                            <SunIcon size={11} />
                            <span>Ma</span>
                          </button>
                        )}
                        <button onClick={(e) => deleteWeeklyGoal(goal.id, e)} className="text-slate-600 hover:text-red-400 p-1"><TrashIcon size={13} /></button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* 4. ELŐTTÜNK ÁLLÓ 1 HÉT ÜTEMEZETT FELADATAI */}
            <section className="bg-slate-900 border border-slate-800 rounded-2xl p-3.5 space-y-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-400 block">
                Következő 7 nap ütemezett feladatai ezen a területen
              </span>
              <div className="space-y-1.5">
                {Array.from({ length: 7 }).map((_, i) => {
                  const targetD = offsetDateString(todayActualStr, i);
                  const dTasks = tasks.filter((t) => t.domain === currentArea.title && t.date === targetD);
                  if (dTasks.length === 0) return null;

                  return (
                    <div key={targetD} className="space-y-1 pt-1">
                      <span className="text-[10px] font-bold text-slate-400 block">
                        {getDayShortName(targetD)} ({formatShortDate(targetD)}):
                      </span>
                      {dTasks.map((t) => (
                        <div key={t.id} onClick={() => toggleTask(t.id)} className="p-2 bg-slate-950/80 border border-slate-800 rounded-xl flex items-center justify-between text-xs cursor-pointer">
                          <div className="flex items-center gap-2">
                            {t.done ? <CheckCircleIcon size={15} className="text-blue-400 shrink-0" /> : <CircleIcon size={15} className="text-slate-600 shrink-0" />}
                            <span className={t.done ? "line-through text-slate-500" : "text-slate-200"}>{t.title}</span>
                          </div>
                          <span className="text-[9px] text-slate-500 font-semibold">{t.type}</span>
                        </div>
                      ))}
                    </div>
                  );
                })}
                {tasks.filter((t) => {
                  if (t.domain !== currentArea.title || !t.date) return false;
                  const diff = Math.floor((new Date(t.date).getTime() - new Date(todayActualStr).getTime()) / 86400000);
                  return diff >= 0 && diff < 7;
                }).length === 0 && (
                  <p className="text-[11px] text-slate-600 italic px-1">Nincs beütemezett feladat a következő 7 napra.</p>
                )}
              </div>
            </section>

            {/* 5. EHHEZ AZ ÉLETTERÜLETHEZ TARTOZÓ NAPI SZOKÁSOK */}
            <section className="bg-slate-900 border border-slate-800 rounded-2xl p-3.5 space-y-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 block">
                Napi szokások ezen a területen ({habits.filter((h) => h.domain === currentArea.title).length})
              </span>
              <div className="space-y-1.5">
                {habits.filter((h) => h.domain === currentArea.title).map((h) => {
                  const isDone = ["done", "micro", "freeze"].includes(habitLogs[selectedDate]?.[h.id]?.status);
                  const { streak } = getHabitStats(h.id);

                  return (
                    <div key={h.id} className="p-2 bg-slate-950/60 border border-slate-800/80 rounded-xl flex items-center justify-between text-xs">
                      <div>
                        <span className={`font-medium block ${isDone ? "text-slate-400 line-through" : "text-slate-200"}`}>{h.title}</span>
                        <span className="text-[10px] text-slate-500">{h.group}</span>
                      </div>
                      <span className="text-amber-400 text-[10px] font-bold flex items-center gap-0.5">
                        <FlameIcon size={11} /> {streak} nap
                      </span>
                    </div>
                  );
                })}
              </div>
            </section>

          </div>
        )}

        {/* ======================================================== */}
        {/* 4. SPRINT TAB                                            */}
        {/* ======================================================== */}
        {activeTab === "sprint" && (
          <div className="space-y-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3.5 space-y-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block">Sprint Mérföldkövek</span>
              <p className="text-xs text-slate-400">Az aktuális sprint időszak céljai életterületenként.</p>
            </div>

            <div className="space-y-3">
              {visionAreas.map((area) => {
                const areaMilestones = milestones.filter((m) => m.domain === area.title);
                const isAdding = addingMilestoneDomain === area.title;

                return (
                  <div key={area.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-3.5 space-y-2">
                    <div className="flex justify-between items-center border-b border-slate-800/80 pb-2">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${areaMilestones.length > 0 ? "bg-emerald-400" : "bg-slate-600"}`} />
                        <h3 className="text-xs font-bold text-slate-200">{area.title}</h3>
                      </div>
                      <button
                        onClick={() => setAddingMilestoneDomain(isAdding ? null : area.title)}
                        className={`p-1 rounded-lg transition ${isAdding ? "bg-blue-600 text-white" : "text-slate-400 hover:text-emerald-400 hover:bg-slate-800"}`}
                      >
                        <PlusIcon size={14} />
                      </button>
                    </div>

                    {isAdding && (
                      <form onSubmit={(e) => handleAddDirectMilestone(area.title, e)} className="flex gap-1.5 pt-1">
                        <input
                          type="text"
                          placeholder="Új sprint mérföldkő..."
                          value={newMilestoneText}
                          onChange={(e) => setNewMilestoneText(e.target.value)}
                          className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                          autoFocus
                        />
                        <button type="submit" className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs px-3 py-1.5 rounded-lg font-semibold shrink-0">
                          Hozzáad
                        </button>
                      </form>
                    )}

                    <div className="space-y-1.5 pt-0.5">
                      {areaMilestones.map((m) => (
                        <div key={m.id} onClick={() => toggleMilestone(m.id)} className="p-2 bg-slate-950/60 border border-slate-800/80 rounded-xl flex items-center justify-between cursor-pointer">
                          <div className="flex items-center gap-2.5 pr-2">
                            {m.done ? <CheckCircleIcon size={16} className="text-emerald-400 shrink-0" /> : <CircleIcon size={16} className="text-slate-600 shrink-0" />}
                            <span className={`text-xs ${m.done ? "line-through text-slate-500" : "text-slate-200"}`}>{m.title}</span>
                          </div>
                          <button onClick={(e) => deleteMilestone(m.id, e)} className="text-slate-600 hover:text-red-400 p-1"><TrashIcon size={13} /></button>
                        </div>
                      ))}
                      {areaMilestones.length === 0 && !isAdding && (
                        <p className="text-[11px] text-slate-600 italic px-1">Nincs sprint cél kitűzve erre a területre.</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* 5. CÉLOK TAB                                             */}
        {/* ======================================================== */}
        {activeTab === "goals" && (
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

      {/* ========================================================================= */}
      {/* PUSH ÉRTESÍTÉS BEÁLLÍTÓ MODAL (LEGELSŐ RÉTEGRE HELYEZVE: z-[999])         */}
      {/* ========================================================================= */}
      {isNotificationModalOpen && (
        <div 
          className="fixed inset-0 z-[999] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setIsNotificationModalOpen(false)}
        >
          <div 
            className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-sm p-4 space-y-3.5 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center border-b border-slate-800 pb-2">
              <div className="flex items-center gap-2">
                <BellIcon size={18} className="text-amber-400" />
                <span className="text-xs font-bold text-slate-100">Push Értesítések Kalibrálása</span>
              </div>
              <button 
                type="button" 
                onClick={() => setIsNotificationModalOpen(false)} 
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
              >
                <CloseIcon size={18} />
              </button>
            </div>

            {/* Állapot */}
            <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Eszköz állapota:</span>
                <span className="font-semibold text-slate-200">
                  {notificationPermission === "granted" ? "✓ Engedélyezve a készüléken" : "Nincs engedélyezve"}
                </span>
              </div>
              {notificationPermission !== "granted" && (
                <button
                  type="button"
                  onClick={requestNotificationAccess}
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 text-[10px] font-bold px-2.5 py-1 rounded-lg"
                >
                  Engedélyezés
                </button>
              )}
            </div>

            {/* Időzítések beállítása */}
            <div className="space-y-2 pt-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Időzített Értesítési Időpontok:</span>
              
              {/* 1. Reggeli indító */}
              <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-slate-200 block">🌅 Reggeli Fókuszindító</span>
                  <span className="text-[10px] text-slate-500">Big 3 kitűzése és Win the Morning</span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="time"
                    value={notificationSettings.morningTime || "07:00"}
                    onChange={(e) => handleUpdateNotificationSettings("morningTime", e.target.value)}
                    className="bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-slate-100 font-bold focus:outline-none focus:border-amber-500"
                  />
                  <input
                    type="checkbox"
                    checked={notificationSettings.morningEnabled ?? true}
                    onChange={(e) => handleUpdateNotificationSettings("morningEnabled", e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-500"
                  />
                </div>
              </div>

              {/* 2. Napközbeni fegyelem */}
              <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-slate-200 block">⚡ Napközbeni Fegyelem</span>
                  <span className="text-[10px] text-slate-500">Nyitott Big 3 prioritások ellenőrzése</span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="time"
                    value={notificationSettings.middayTime || "14:00"}
                    onChange={(e) => handleUpdateNotificationSettings("middayTime", e.target.value)}
                    className="bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-slate-100 font-bold focus:outline-none focus:border-amber-500"
                  />
                  <input
                    type="checkbox"
                    checked={notificationSettings.middayEnabled ?? true}
                    onChange={(e) => handleUpdateNotificationSettings("middayEnabled", e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-500"
                  />
                </div>
              </div>

              {/* 3. Esti szériamentő */}
              <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-slate-200 block">🌙 Esti Szériamentő</span>
                  <span className="text-[10px] text-slate-500">Szokások zárása & Fagyasztó emlékeztető</span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="time"
                    value={notificationSettings.eveningTime || "21:30"}
                    onChange={(e) => handleUpdateNotificationSettings("eveningTime", e.target.value)}
                    className="bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-slate-100 font-bold focus:outline-none focus:border-amber-500"
                  />
                  <input
                    type="checkbox"
                    checked={notificationSettings.eveningEnabled ?? true}
                    onChange={(e) => handleUpdateNotificationSettings("eveningEnabled", e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-500"
                  />
                </div>
              </div>
            </div>

            {/* Tesztelési gombok */}
            <div className="space-y-1.5 pt-1 border-t border-slate-800">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Azonnali tesztelés:</span>
              <button
                type="button"
                onClick={() => triggerDirectPush(
                  "Win the morning",
                  big3Tasks.filter((t) => !t.done).length > 0
                    ? `Még ${big3Tasks.filter((t) => !t.done).length} Big 3 prioritás vár rád mára!`
                    : "A nap első győzelme a tiéd. Kitűzted már a mai fókuszt?"
                )}
                className="w-full text-left p-2 bg-slate-950 hover:bg-slate-800 rounded-xl border border-slate-800 text-xs text-slate-200 transition flex items-center justify-between"
              >
                <span>🌅 Reggeli fókusz tesztelése</span>
                <span className="text-[10px] text-cyan-400 font-bold">Küldés</span>
              </button>

              <button
                type="button"
                onClick={() => triggerDirectPush(
                  "Fegyelem-ellenőrzés",
                  `A fegyelem egyenlő a szabadsággal. Még ${habits.length - completedDayHabitsCount} szokás és ${scoredTasks.length - completedScored} feladat nyitva van!`
                )}
                className="w-full text-left p-2 bg-slate-950 hover:bg-slate-800 rounded-xl border border-slate-800 text-xs text-slate-200 transition flex items-center justify-between"
              >
                <span>⚡ Provokatív riasztás tesztelése</span>
                <span className="text-[10px] text-amber-400 font-bold">Küldés</span>
              </button>
            </div>

            <button
              type="button"
              onClick={() => setIsNotificationModalOpen(false)}
              className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold transition"
            >
              Bezárás
            </button>
          </div>
        </div>
      )}

      {/* NAPI FELADAT SZERKESZTŐ MODAL */}
      {editingTaskModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleSaveEditedTask} className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-sm p-4 space-y-3 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-2">
              <span className="text-xs font-bold text-slate-200">Feladat szerkesztése</span>
              <button type="button" onClick={() => setEditingTaskModal(null)} className="text-slate-400 hover:text-white">
                <CloseIcon size={16} />
              </button>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] text-slate-400 block font-bold uppercase">Feladat megnevezése:</label>
              <input
                type="text"
                value={editTaskTitle}
                onChange={(e) => setEditTaskTitle(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] text-slate-400 block font-bold uppercase">Életterület:</label>
              <select
                value={editTaskDomain}
                onChange={(e) => setEditTaskDomain(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200"
              >
                {visionAreas.map((a) => (
                  <option key={a.id} value={a.title}>{a.title}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] text-slate-400 block font-bold uppercase">Melyik napra szóljon:</label>
              <input
                type="date"
                value={editTaskDate}
                onChange={(e) => setEditTaskDate(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] text-slate-400 block font-bold uppercase">Típus:</label>
              <div className="flex gap-1.5 text-xs">
                <button
                  type="button"
                  onClick={() => setEditTaskType("BIG3")}
                  className={`flex-1 py-1 rounded border font-semibold ${editTaskType === "BIG3" ? "bg-amber-500/20 border-amber-500/50 text-amber-300" : "bg-slate-950 border-slate-800 text-slate-400"}`}
                >
                  Big 3
                </button>
                <button
                  type="button"
                  onClick={() => setEditTaskType("SCHEDULED")}
                  className={`flex-1 py-1 rounded border font-semibold ${editTaskType === "SCHEDULED" ? "bg-blue-500/20 border-blue-500/50 text-blue-300" : "bg-slate-950 border-slate-800 text-slate-400"}`}
                >
                  Ütemezett
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <button
                type="button"
                onClick={() => deleteTask(editingTaskModal.id)}
                className="text-xs text-red-400 hover:text-red-300 p-1 flex items-center gap-1"
              >
                <TrashIcon size={13} />
                <span>Törlés</span>
              </button>
              <div className="flex gap-2">
                <button type="button" onClick={() => setEditingTaskModal(null)} className="text-xs text-slate-400 px-3 py-1">
                  Mégse
                </button>
                <button type="submit" className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs px-4 py-1.5 rounded-lg font-bold">
                  Mentés
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* RÉSZLETES SZOKÁS ADATLAP MODAL */}
      {selectedHabitModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-sm p-4 space-y-4 shadow-2xl">
            <div className="flex justify-between items-start border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] uppercase font-bold text-cyan-400 block">{selectedHabitModal.group}</span>
                <h3 className="text-base font-bold text-white leading-tight">{selectedHabitModal.title}</h3>
                {selectedHabitModal.domain && (
                  <span className="text-[10px] text-emerald-400 block mt-0.5">Életterület: {selectedHabitModal.domain}</span>
                )}
              </div>
              <button onClick={() => setSelectedHabitModal(null)} className="text-slate-400 hover:text-white p-1">
                <CloseIcon size={18} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 text-center text-xs">
              <div className="bg-slate-950 p-2 rounded-xl border border-slate-800">
                <span className="text-slate-500 text-[10px] block">Eddigi széria</span>
                <span className="text-amber-400 font-extrabold text-sm flex items-center justify-center gap-1 mt-0.5">
                  <FlameIcon size={13} /> {getHabitStats(selectedHabitModal.id).streak} nap
                </span>
              </div>
              <div className="bg-slate-950 p-2 rounded-xl border border-slate-800">
                <span className="text-slate-500 text-[10px] block">Szériabefagyasztó</span>
                <span className="text-blue-300 font-extrabold text-sm mt-0.5 block">
                  🧊 {getHabitStats(selectedHabitModal.id).freezeCount} db készleten
                </span>
              </div>
            </div>

            <div className="space-y-1.5">
              <span className="text-[11px] font-bold text-slate-300 block">Elmúlt 28 nap teljesítése</span>
              <div className="grid grid-cols-7 gap-1.5 bg-slate-950 p-2.5 rounded-2xl border border-slate-800/80">
                {Array.from({ length: 28 }).map((_, i) => {
                  const dStr = offsetDateString(todayActualStr, -27 + i);
                  const st = habitLogs[dStr]?.[selectedHabitModal.id]?.status;
                  const isToday = dStr === todayActualStr;

                  return (
                    <div
                      key={dStr}
                      className={`h-7 rounded-lg flex flex-col items-center justify-center text-[9px] font-bold transition ${
                        st === "done" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/50" :
                        st === "micro" ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/50" :
                        st === "freeze" ? "bg-blue-500/30 text-blue-300 border border-blue-400" :
                        "bg-slate-900 text-slate-600 border border-slate-800/50"
                      } ${isToday ? "ring-2 ring-amber-400/80" : ""}`}
                      title={`${dStr}: ${st || "nem teljesült"}`}
                    >
                      <span>{dStr.split("-")[2]}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <button
              onClick={() => setSelectedHabitModal(null)}
              className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold transition"
            >
              Bezárás
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* ALSÓ MENÜSÁV                                                              */}
      {/* ========================================================================= */}
      <nav 
        className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-slate-900/95 backdrop-blur border-t border-slate-800 px-3 pt-2 pb-[max(0.75rem,env(safe-area-inset-bottom))] flex justify-between items-center z-30"
      >
        <button onClick={() => setActiveTab("today")} className={`flex-1 flex flex-col items-center gap-1 transition ${activeTab === "today" ? "text-emerald-400 font-bold" : "text-slate-500 hover:text-slate-300"}`}>
          <CalendarIcon size={18} />
          <span className="text-[9px]">Ma</span>
        </button>

        <button onClick={() => setActiveTab("week")} className={`flex-1 flex flex-col items-center gap-1 transition ${activeTab === "week" ? "text-emerald-400 font-bold" : "text-slate-500 hover:text-slate-300"}`}>
          <LayoutGridIcon size={18} />
          <span className="text-[9px]">Hét</span>
        </button>

        <button onClick={() => setActiveTab("vision")} className={`flex-1 flex flex-col items-center gap-1 transition ${activeTab === "vision" ? "text-emerald-400 font-bold" : "text-slate-500 hover:text-slate-300"}`}>
          <CompassIcon size={18} />
          <span className="text-[9px]">Iránytű</span>
        </button>

        <button onClick={() => setActiveTab("sprint")} className={`flex-1 flex flex-col items-center gap-1 transition ${activeTab === "sprint" ? "text-emerald-400 font-bold" : "text-slate-500 hover:text-slate-300"}`}>
          <RunningManIcon size={18} />
          <span className="text-[9px]">Sprint</span>
        </button>

        <button onClick={() => setActiveTab("goals")} className={`flex-1 flex flex-col items-center gap-1 transition ${activeTab === "goals" ? "text-emerald-400 font-bold" : "text-slate-500 hover:text-slate-300"}`}>
          <TargetIcon size={18} />
          <span className="text-[9px]">Célok</span>
        </button>
      </nav>

    </div>
  );
}
