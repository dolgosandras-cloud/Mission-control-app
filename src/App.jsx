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

// HÉT NAPJAI
const DAYS_OF_WEEK = [
  { key: "2026-08-31", short: "H", label: "Hétfő" },
  { key: "2026-09-01", short: "K", label: "Kedd" },
  { key: "2026-09-02", short: "Sze", label: "Szerda" },
  { key: "2026-09-03", short: "Cs", label: "Csütörtök" },
  { key: "2026-09-04", short: "P", label: "Péntek" },
  { key: "2026-09-05", short: "Szo", label: "Szombat" },
  { key: "2026-09-06", short: "V", label: "Vasárnap" }
];

const INITIAL_DATA = {
  sprint: {
    id: "sprint-1",
    name: "2026 Q3 Fókusz",
    startDate: "2026-08-24",
    endDate: "2026-10-04",
    milestones: [
      { id: "m1", title: "Gyerekszobák kifestése, berendezése", domain: "Otthon & Lakás", done: false },
      { id: "m2", title: "Murph kihívás felkészülés & Orsi mozgása", domain: "Egészség & Fitnesz", done: true },
      { id: "m3", title: "12M Ft-os megtakarítási szint elérése dec-re", domain: "Pénzügyek, anyagiak", done: false },
      { id: "m4", title: "Szent Istvános közösségi szerepvállalás", domain: "Család & Kapcsolatok", done: false }
    ]
  },
  tasks: [
    { id: "t1", date: "2026-09-04", title: "Murph edzésprogram heti bontás átnézése", domain: "Egészség & Fitnesz", type: "BIG3", done: true },
    { id: "t2", date: "2026-09-04", title: "Festék és alapozó árak összeírása szobákhoz", domain: "Otthon & Lakás", type: "BIG3", done: false },
    { id: "t3", date: "2026-09-04", title: "Megtakarítási ráta havi frissítése", domain: "Pénzügyek, anyagiak", type: "BIG3", done: false },
    { id: "t4", date: "2026-09-04", title: "Heti projekt jelentés elküldése", domain: "Karrier & Munka", type: "SCHEDULED", done: true },
    { id: "t5", date: "2026-09-04", title: "Szűrőbetét csere a konyhában", domain: "Otthon & Lakás", type: "DAILY5_MINI", done: false }
  ],
  habits: [
    { id: "h1", title: "Hideg zuhany & légzés", block: "morning" },
    { id: "h2", title: "15 perc nyújtás / mobilitás", block: "morning" },
    { id: "h3", title: "Napi fókusz kijelölése (Big3)", block: "morning" },
    { id: "h4", title: "45 perc edzés (Kardió/Erősítés)", block: "fitness" },
    { id: "h5", title: "Képernyőmentes este 21:00 után", block: "evening" }
  ],
  habitLogs: {
    "2026-09-04": { h1: true, h2: true, h3: true, h4: false, h5: false },
    "2026-09-03": { h1: true, h2: true, h3: true, h4: false, h5: false },
    "2026-09-02": { h1: true, h2: true, h3: true, h4: true, h5: true },
    "2026-09-01": { h1: true, h2: false, h3: true, h4: true, h5: false },
    "2026-08-31": { h1: true, h2: true, h3: true, h4: false, h5: true }
  },
  visionAreas: [
    {
      id: "penzugyek",
      title: "Pénzügyek, anyagiak",
      hell: 'A gyerekek szemébe kell nézni, és azt mondani nekik: "Nem tudom ezt megadni nektek."',
      ideal: '1. A gyerekek egyetemi tandíja félretéve 2030-ra.\n2. 65 évesen úgy vonulunk nyugdíjba, hogy csak a megtakarításaink hozamából fedezni tudnánk a korábbi életszínvonalunkat.',
      nextBigGoal: '2026. decemberre az összes megtakarítás elérje a 12 M Ft-ot'
    },
    {
      id: "egeszseg",
      title: "Egészség & Fitnesz",
      hell: 'Fiatalon meghalok egy megelőzhető betegségben és nem látom, ahogy a gyerekeim sikerrel boldogulnak az életben.',
      ideal: '1. Rendszeresen mozgok, fitt vagyok. 90 éves koromban is kiváló formában leszek, a 3-ra gyakorlatilag fel tudok szaladni 2 nagy szatyorral a kezemben. A dédunokákkal is vidáman tudok játszani. Kognitív képességeim kiválóak.\n2. Ideális esetben Orsi is velem együtt hasonló szinten lesz.',
      nextBigGoal: '1. Murph kihívás teljesítése\n2. Orsi rendszeres mozgásának elindítása'
    },
    {
      id: "otthon",
      title: "Otthon & Lakás",
      hell: 'Egy rossz környezetben élek és aggódnom kell a lakhatás miatt.',
      ideal: '1. Egy saját, 160 négyzetméteres modern, jó lakás van a saját nevünkön.\n2. Békés, csendes szomszédokkal jó kapcsolatban.',
      nextBigGoal: 'Gyerekszobák kifestése, berendezése'
    },
    {
      id: "karrier",
      title: "Karrier & Munka",
      hell: 'Olyan munkahelyen dolgozni, amit nem szeretsz, rossz hangulattal.',
      ideal: '1. Elismert projektvezető vagyok, akihez szívesen fordulnak a kollégák tanácsért és akit kifejezetten kérnek a megrendelők, hogy dolgozzam a projektjükön.\n2. Microsoft Project szakértőként hívnak, ha kell egy jó és pontos ütemterv.\n3. Több olyan projekt megvalósítása van a hátam mögött életem végén, melyek sok embernek tették az életét jobbá. Írtak rólam cikket az újságok, mint pozitív példakép.',
      nextBigGoal: 'Önálló, összetett projektek vezetése és az MS Project márka felépítése'
    },
    {
      id: "fejlodes",
      title: "Személyes fejlődés & szolgálat",
      hell: 'Elmegy mellettem az élet, nem lesz értelme. A tudásommal nem tudok senkinek segíteni.',
      ideal: '1. Rendszeresen tanulok valami újat.\n2. Tanítok másokat, hogy jobbá váljanak és így nagy és jó dolgokat vigyenek végbe, melyekben így közvetve nekem is benne lesz a munkám.',
      nextBigGoal: 'Folyamatos tanulás és fejlődés. A megszerzett tudás (PMP, FMV, MS Project) aktív megosztása a közösséggel.'
    },
    {
      id: "szorakozas",
      title: "Szórakozás & Kikapcsolódás",
      hell: 'Fáradt leszek, ingerült, csak a kanapén ülök. Nem töltődök fel, és ez rá fog nyomni a családomra.',
      ideal: '1. Bármilyen programra, amit csak kinéztünk magunknak, el tudtunk menni és ehhez nem kellett az anyagi biztonságról lemondani.',
      nextBigGoal: 'Rendszeres, minőségi kikapcsolódás: Heti szinten van idő a pihenésre. Havonta egy "randi" Orsival.'
    },
    {
      id: "csalad",
      title: "Család & Kapcsolatok",
      hell: 'Nem lesznek kapcsolataim, nem fogok másokhoz kapcsolódni. Az öregkor magányosan fog elérni.',
      ideal: '1. Rendszeresen találkozunk a családtagjainkkal. A gyermekeink örömmel és rendszeresen látogatnak meg majd minket akkor is, amikor már saját gyermekeik is lesznek.\n2. Olyan kapcsolati hálót alakítottam ki és ápoltam, melyre büszke vagyok és amelyen keresztül bármit el tudtam érni életem során.',
      nextBigGoal: 'Szent Istvános Szülői közösségben aktív részvételt vállalni.'
    }
  ]
};

// Dátum formázás év nélkül: "2026-08-24" -> "08.24"
function formatShortDate(dateStr) {
  if (!dateStr) return "";
  const parts = dateStr.split("-");
  return parts.length === 3 ? `${parts[1]}.${parts[2]}` : dateStr;
}

export default function App() {
  const [activeTab, setActiveTab] = useState("sprint");
  const [selectedDate, setSelectedDate] = useState("2026-09-04");

  const [state, setState] = useState(() => {
    const saved = localStorage.getItem("mc_cloud_state");
    if (saved) {
      const parsed = JSON.parse(saved);
      if (!parsed.visionAreas || parsed.visionAreas.length === 0) parsed.visionAreas = INITIAL_DATA.visionAreas;
      if (!parsed.sprint?.startDate) {
        parsed.sprint = { ...INITIAL_DATA.sprint, ...parsed.sprint };
      }
      return parsed;
    }
    return INITIAL_DATA;
  });

  const [syncStatus, setSyncStatus] = useState("synced");
  const isInternalUpdate = useRef(false);

  // Sprint modul fókusz & touch swipe
  const [activeAreaIndex, setActiveAreaIndex] = useState(0);
  const touchStartX = useRef(null);

  // Sprint fejléc szerkesztés állapota
  const [isEditingSprintHeader, setIsEditingSprintHeader] = useState(false);
  const [sprintHeaderForm, setSprintHeaderForm] = useState({
    name: state.sprint?.name || "2026 Q3 Fókusz",
    startDate: state.sprint?.startDate || "2026-08-24",
    endDate: state.sprint?.endDate || "2026-10-04"
  });

  // Helyszíni gyors feladatbeviteli sor a Hét nézet kártyáin
  const [quickAddAreaTitle, setQuickAddAreaTitle] = useState(null);
  const [quickAddWeeklyText, setQuickAddWeeklyText] = useState("");

  // Sprint & heti beviteli mezők a sprint fókuszlapon
  const [newSprintGoal, setNewSprintGoal] = useState("");
  const [newWeeklyGoal, setNewWeeklyGoal] = useState("");

  // Napi és egyéb mezők
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskType, setNewTaskType] = useState("BIG3");

  // Iránytű lap állapota
  const [expandedAreaId, setExpandedAreaId] = useState(null);
  const [editingAreaId, setEditingAreaId] = useState(null);
  const [editForm, setEditForm] = useState({ title: "", hell: "", ideal: "", nextBigGoal: "" });
  const [isAddingNewArea, setIsAddingNewArea] = useState(false);
  const [newAreaTitle, setNewAreaTitle] = useState("");

  // 1. HÁTTÉR-SZINKRONIZÁCIÓ (3 MP)
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
            if (!serverData.visionAreas || serverData.visionAreas.length === 0) serverData.visionAreas = INITIAL_DATA.visionAreas;
            if (!serverData.sprint?.startDate) serverData.sprint = { ...INITIAL_DATA.sprint, ...serverData.sprint };

            setState((current) => {
              if (JSON.stringify(current) !== JSON.stringify(serverData)) {
                isInternalUpdate.current = true;
                localStorage.setItem("mc_cloud_state", JSON.stringify(serverData));
                return serverData;
              }
              return current;
            });
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

  // 2. HELYI VÁLTOZTATÁSOK MENTÉSE
  useEffect(() => {
    if (isInternalUpdate.current) {
      isInternalUpdate.current = false;
      return;
    }

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

        if (res.ok) {
          setSyncStatus("synced");
        } else {
          setSyncStatus("offline");
        }
      } catch {
        setSyncStatus("offline");
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [state]);

  const { sprint = INITIAL_DATA.sprint, tasks, habits, habitLogs, visionAreas = INITIAL_DATA.visionAreas } = state;
  const currentArea = visionAreas[activeAreaIndex] || visionAreas[0];

  // --- KETTŐS HALADÁSI SZÁMÍTÁS (IDŐ VS. FELADATOK) ---
  const sprintStart = new Date(sprint.startDate || "2026-08-24").getTime();
  const sprintEnd = new Date(sprint.endDate || "2026-10-04").getTime();
  const todayTime = new Date(selectedDate).getTime();

  let timePct = 0;
  if (sprintEnd > sprintStart) {
    const elapsed = todayTime - sprintStart;
    const total = sprintEnd - sprintStart;
    timePct = Math.min(100, Math.max(0, Math.round((elapsed / total) * 100)));
  }

  const completedMilestones = sprint.milestones.filter((m) => m.done).length;
  const totalMilestones = sprint.milestones.length;
  const taskPct = totalMilestones > 0 ? Math.round((completedMilestones / totalMilestones) * 100) : 0;

  // Swipe kezelés
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (!touchStartX.current) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) goToNextArea();
    else if (diff < -50) goToPrevArea();
    touchStartX.current = null;
  };

  const goToNextArea = () => setActiveAreaIndex((p) => (p + 1 < visionAreas.length ? p + 1 : 0));
  const goToPrevArea = () => setActiveAreaIndex((p) => (p - 1 >= 0 ? p - 1 : visionAreas.length - 1));

  // Napi kalkulációk
  const currentDayTasks = tasks.filter((t) => (t.date || "2026-09-04") === selectedDate);
  const scoredTasks = currentDayTasks.filter((t) => t.type === "BIG3" || t.type === "SCHEDULED");
  const completedScored = scoredTasks.filter((t) => t.done).length;
  const taskProgressPct = scoredTasks.length > 0 ? Math.round((completedScored / scoredTasks.length) * 100) : 0;
  const isHabitDone = (dateKey, habitId) => !!habitLogs?.[dateKey]?.[habitId];

  // Sprint fejléc mentése
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

  // Műveletek
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
      sprint: { ...prev.sprint, milestones: [...prev.sprint.milestones, newM] }
    }));
    setNewSprintGoal("");
  };

  const handleAddWeeklyGoal = (e) => {
    e.preventDefault();
    if (!newWeeklyGoal.trim() || !currentArea) return;
    const newTask = {
      id: `task-${Date.now()}`,
      date: selectedDate,
      title: newWeeklyGoal.trim(),
      domain: currentArea.title,
      type: "SCHEDULED",
      done: false
    };
    setState((prev) => ({
      ...prev,
      tasks: [newTask, ...prev.tasks]
    }));
    setNewWeeklyGoal("");
  };

  // Helyszíni hozzáadás a Hét nézet kártyájáról
  const handleQuickAddWeekly = (domainTitle, e) => {
    e.preventDefault();
    if (!quickAddWeeklyText.trim()) return;
    const newTask = {
      id: `task-${Date.now()}`,
      date: selectedDate,
      title: quickAddWeeklyText.trim(),
      domain: domainTitle,
      type: "SCHEDULED",
      done: false
    };
    setState((prev) => ({
      ...prev,
      tasks: [newTask, ...prev.tasks]
    }));
    setQuickAddWeeklyText("");
    setQuickAddAreaTitle(null);
  };

  const toggleTask = (id) => {
    setState((prev) => ({
      ...prev,
      tasks: prev.tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    }));
  };

  const deleteTask = (id, e) => {
    e.stopPropagation();
    setState((prev) => ({
      ...prev,
      tasks: prev.tasks.filter((t) => t.id !== id)
    }));
  };

  const toggleMilestone = (id) => {
    setState((prev) => ({
      ...prev,
      sprint: {
        ...prev.sprint,
        milestones: prev.sprint.milestones.map((m) => (m.id === id ? { ...m, done: !m.done } : m))
      }
    }));
  };

  const deleteMilestone = (id, e) => {
    e.stopPropagation();
    setState((prev) => ({
      ...prev,
      sprint: {
        ...prev.sprint,
        milestones: prev.sprint.milestones.filter((m) => m.id !== id)
      }
    }));
  };

  const toggleHabit = (dateKey, habitId) => {
    setState((prev) => {
      const day = prev.habitLogs?.[dateKey] || {};
      return {
        ...prev,
        habitLogs: {
          ...prev.habitLogs,
          [dateKey]: { ...day, [habitId]: !day[habitId] }
        }
      };
    });
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    const newTask = {
      id: `task-${Date.now()}`,
      date: selectedDate,
      title: newTaskTitle.trim(),
      type: newTaskType,
      done: false
    };
    setState((prev) => ({ ...prev, tasks: [newTask, ...prev.tasks] }));
    setNewTaskTitle("");
  };

  // Iránytű modul segédek
  const toggleAreaExpand = (id) => {
    if (editingAreaId) return;
    setExpandedAreaId((p) => (p === id ? null : id));
  };

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
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100 max-w-md mx-auto font-sans pb-24 select-none">
      
      {/* ========================================================================= */}
      {/* FIXEN RÖGZÍTETT FEJLÉC: KETTŐS HALADÁS (NAP IKON & EMBERKE IKON) + SPRINT NÉV */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-30 bg-slate-950/95 backdrop-blur border-b border-slate-800 shadow-md">
        
        {/* VÉKONY IDŐ CSÚSZKA (NAP IKONNAL) */}
        <div className="px-4 pt-2.5 pb-1">
          <div className="flex justify-between items-center text-[10px] text-slate-400 font-semibold mb-1">
            <span>{formatShortDate(sprint.startDate)}</span>
            <span className="text-amber-400 flex items-center gap-1 font-bold">
              Ma: {formatShortDate(selectedDate)} ({timePct}%)
            </span>
            <span>{formatShortDate(sprint.endDate)}</span>
          </div>

          <div className="relative h-2 bg-slate-900 rounded-full overflow-visible flex items-center border border-slate-800">
            <div 
              className="h-full bg-gradient-to-r from-amber-600 to-amber-500 rounded-full" 
              style={{ width: `${timePct}%` }}
            />
            {/* NAP IKON AZ AKTUÁLIS IDŐPONTNÁL */}
            <div 
              className="absolute -top-1.5 -ml-2.5 bg-slate-950 text-amber-400 rounded-full p-0.5 border border-amber-500 shadow-sm shadow-amber-500/30 transition-all duration-300"
              style={{ left: `${timePct}%` }}
            >
              <SunIcon size={13} />
            </div>
          </div>
        </div>

        {/* VÉKONY FELADAT CSÚSZKA (EMBERKE IKONNAL) */}
        <div className="px-4 pt-1 pb-2">
          <div className="flex justify-between items-center text-[10px] text-slate-400 font-semibold mb-1">
            <span>0%</span>
            <span className="text-emerald-400 flex items-center gap-1 font-bold">
              Sprint célok: {completedMilestones}/{totalMilestones} ({taskPct}%)
            </span>
            <span>100%</span>
          </div>

          <div className="relative h-2 bg-slate-900 rounded-full overflow-visible flex items-center border border-slate-800">
            <div 
              className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full" 
              style={{ width: `${taskPct}%` }}
            />
            {/* EMBERKE IKON A KÉSZÜLTSÉGNÉL */}
            <div 
              className="absolute -top-1.5 -ml-2.5 bg-slate-950 text-emerald-400 rounded-full p-0.5 border border-emerald-500 shadow-sm shadow-emerald-500/30 transition-all duration-300"
              style={{ left: `${taskPct}%` }}
            >
              <UserIcon size={13} />
            </div>
          </div>
        </div>

        {/* SPRINT NEVE (RÁKATTINTÁSSAL SZERKESZTHETŐ) ÉS SZINKRON JELZŐ */}
        <div className="bg-slate-900/80 px-4 py-1.5 border-t border-slate-800/80 flex justify-between items-center text-xs">
          {!isEditingSprintHeader ? (
            <div 
              onClick={() => {
                setSprintHeaderForm({ name: sprint.name, startDate: sprint.startDate, endDate: sprint.endDate });
                setIsEditingSprintHeader(true);
              }}
              className="flex items-center gap-1.5 font-bold text-slate-100 hover:text-emerald-400 cursor-pointer transition"
              title="Kattints a szerkesztéshez"
            >
              <TargetIcon size={14} className="text-emerald-400" />
              <span>{sprint.name}</span>
              <EditIcon size={12} className="text-slate-500 ml-1" />
            </div>
          ) : (
            <form onSubmit={saveSprintHeader} className="flex-1 flex gap-1.5 items-center">
              <input 
                type="text"
                value={sprintHeaderForm.name}
                onChange={(e) => setSprintHeaderForm({ ...sprintHeaderForm, name: e.target.value })}
                className="bg-slate-950 border border-slate-700 rounded px-2 py-0.5 text-xs text-slate-100 flex-1 focus:outline-none focus:border-emerald-500"
                autoFocus
              />
              <button type="submit" className="bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] px-2 py-0.5 rounded font-semibold">
                Kész
              </button>
              <button 
                type="button" 
                onClick={() => setIsEditingSprintHeader(false)} 
                className="text-slate-400 hover:text-slate-200 text-[11px] px-1"
              >
                Mégse
              </button>
            </form>
          )}

          <div className={`flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded shrink-0 ${
            syncStatus === "synced" ? "text-emerald-400" :
            syncStatus === "saving" ? "text-amber-400 animate-pulse" : "text-red-400"
          }`}>
            <CloudIcon size={11} />
            <span>{syncStatus === "synced" ? "Élő" : syncStatus === "saving" ? "Mentés..." : "Offline"}</span>
          </div>
        </div>

      </header>

      {/* FŐ TARTALOM */}
      <main className="p-4 space-y-4 flex-1">
        
        {/* ======================================================== */}
        {/* SPRINT NÉZET: FÓKUSZÁLT ÉLETTERÜLET + LEBONTÁS           */}
        {/* ======================================================== */}
        {activeTab === "sprint" && currentArea && (
          <div 
            className="space-y-4 touch-pan-y"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* TERÜLETVÁLASZTÓ ÉS LAPOZÓ VEZÉRLŐ */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-2.5 flex items-center justify-between shadow-sm">
              <button 
                onClick={goToPrevArea}
                className="p-2 hover:bg-slate-800 text-slate-400 hover:text-white rounded-xl transition"
              >
                <ChevronLeftIcon size={18} />
              </button>

              <div className="flex-1 px-2 text-center">
                <select
                  value={activeAreaIndex}
                  onChange={(e) => setActiveAreaIndex(Number(e.target.value))}
                  className="bg-transparent text-xs font-bold text-emerald-400 text-center uppercase tracking-wide focus:outline-none cursor-pointer"
                >
                  {visionAreas.map((area, idx) => (
                    <option key={area.id} value={idx} className="bg-slate-900 text-slate-100">
                      {area.title} ({idx + 1}/{visionAreas.length})
                    </option>
                  ))}
                </select>
                <span className="text-[10px] text-slate-500 block">Húzd jobbra/balra a lapozáshoz ↔</span>
              </div>

              <button 
                onClick={goToNextArea}
                className="p-2 hover:bg-slate-800 text-slate-400 hover:text-white rounded-xl transition"
              >
                <ChevronRightIcon size={18} />
              </button>
            </div>

            {/* FÓKUSZÁLT VÍZIÓ KÁRTYA */}
            <section className="bg-slate-900 border border-emerald-500/30 rounded-2xl p-4 space-y-3 shadow-lg shadow-black/20">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  <h3 className="text-sm font-bold text-white tracking-wide">{currentArea.title}</h3>
                </div>
                <span className="text-[10px] text-slate-500 font-semibold uppercase">Iránytű Fókusz</span>
              </div>

              <div className="space-y-2.5 text-xs leading-relaxed">
                <div className="bg-red-950/20 border border-red-900/30 rounded-xl p-2.5">
                  <span className="text-[10px] uppercase font-bold text-red-400 block mb-0.5">
                    POKOL KÉPE (AMIT EL AKARUNK KERÜLNI)
                  </span>
                  <p className="text-slate-300 italic whitespace-pre-line">{currentArea.hell || "Nincs kitöltve."}</p>
                </div>

                <div className="bg-emerald-950/20 border border-emerald-900/30 rounded-xl p-2.5">
                  <span className="text-[10px] uppercase font-bold text-emerald-400 block mb-0.5">
                    IDEÁLIS KÉP (AHOVA TARTUNK)
                  </span>
                  <p className="text-slate-200 whitespace-pre-line">{currentArea.ideal || "Nincs kitöltve."}</p>
                </div>

                <div className="bg-amber-950/20 border border-amber-900/30 rounded-xl p-2.5">
                  <span className="text-[10px] uppercase font-bold text-amber-400 block mb-0.5">
                    KÖVETKEZŐ NAGY CÉL
                  </span>
                  <p className="text-amber-200 font-semibold whitespace-pre-line">{currentArea.nextBigGoal || "Nincs kitűzve."}</p>
                </div>
              </div>
            </section>

            {/* 1. SZINT: SPRINT-CÉLOK */}
            <section className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  Sprint-célok ({currentArea.title})
                </span>
                <span className="text-[10px] text-slate-500">
                  {sprint.milestones.filter((m) => m.domain === currentArea.title && m.done).length} / {sprint.milestones.filter((m) => m.domain === currentArea.title).length} kész
                </span>
              </div>

              <form onSubmit={handleAddSprintGoal} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Új sprint mérföldkő ide..."
                  value={newSprintGoal}
                  onChange={(e) => setNewSprintGoal(e.target.value)}
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-2 rounded-lg text-xs font-semibold shrink-0"
                >
                  Kitűz
                </button>
              </form>

              <div className="space-y-1.5">
                {sprint.milestones.filter((m) => m.domain === currentArea.title).map((m) => (
                  <div
                    key={m.id}
                    onClick={() => toggleMilestone(m.id)}
                    className="p-2.5 bg-slate-950/60 border border-slate-800/80 rounded-xl flex items-center justify-between cursor-pointer hover:border-slate-700 transition"
                  >
                    <div className="flex items-center gap-2.5 pr-2">
                      {m.done ? (
                        <CheckCircleIcon size={17} className="text-emerald-400 shrink-0" />
                      ) : (
                        <CircleIcon size={17} className="text-slate-600 shrink-0" />
                      )}
                      <span className={`text-xs font-medium ${m.done ? "line-through text-slate-500" : "text-slate-200"}`}>
                        {m.title}
                      </span>
                    </div>
                    <button
                      onClick={(e) => deleteMilestone(m.id, e)}
                      className="text-slate-600 hover:text-red-400 p-1 rounded transition shrink-0"
                    >
                      <TrashIcon size={13} />
                    </button>
                  </div>
                ))}
                {sprint.milestones.filter((m) => m.domain === currentArea.title).length === 0 && (
                  <p className="text-xs text-slate-600 italic px-1">Még nincs időszaki cél kitűzve erre a területre.</p>
                )}
              </div>
            </section>

            {/* 2. SZINT: HETI CÉLOK */}
            <section className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  36. hét – Heti célok ({currentArea.title})
                </span>
                <span className="text-[10px] text-slate-500">Lebontás erre a hétre</span>
              </div>

              <form onSubmit={handleAddWeeklyGoal} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Heti cél hozzáadása..."
                  value={newWeeklyGoal}
                  onChange={(e) => setNewWeeklyGoal(e.target.value)}
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
                <button
                  type="submit"
                  className="bg-amber-600 hover:bg-amber-500 text-slate-950 px-3 py-2 rounded-lg text-xs font-bold shrink-0"
                >
                  Hozzáad
                </button>
              </form>

              <div className="space-y-1.5">
                {tasks.filter((t) => t.domain === currentArea.title).map((task) => (
                  <div
                    key={task.id}
                    onClick={() => toggleTask(task.id)}
                    className="p-2.5 bg-slate-950/60 border border-slate-800/80 rounded-xl flex items-center justify-between cursor-pointer hover:border-slate-700 transition"
                  >
                    <div className="flex items-center gap-2.5 pr-2">
                      {task.done ? (
                        <CheckCircleIcon size={17} className="text-amber-400 shrink-0" />
                      ) : (
                        <CircleIcon size={17} className="text-slate-600 shrink-0" />
                      )}
                      <span className={`text-xs ${task.done ? "line-through text-slate-500" : "text-slate-200"}`}>
                        {task.title}
                      </span>
                    </div>
                    <button
                      onClick={(e) => deleteTask(task.id, e)}
                      className="text-slate-600 hover:text-red-400 p-1 rounded transition shrink-0"
                    >
                      <TrashIcon size={13} />
                    </button>
                  </div>
                ))}
                {tasks.filter((t) => t.domain === currentArea.title).length === 0 && (
                  <p className="text-xs text-slate-600 italic px-1">Nincs még heti cél hozzárendelve.</p>
                )}
              </div>
            </section>
          </div>
        )}

        {/* ======================================================== */}
        {/* HÉT TAB: EGYENSÚLY-ÁTTEKINTÉS + KÖZVETLEN HETI CÉL HOZZÁADÁS */}
        {/* ======================================================== */}
        {activeTab === "week" && (
          <div className="space-y-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                36. hét – Élet-Egyensúly Áttekintés
              </span>
              <p className="text-xs text-slate-400 leading-relaxed">
                Itt látod az összes életterületre kitűzött heti célokat egyben. A kártya melletti <strong>+</strong> gombbal közvetlenül is rögzíthetsz új heti célt.
              </p>
            </div>

            {/* TERÜLETENKÉNTI ÖSSZESÍTŐ KÁRTYÁK */}
            <div className="space-y-3">
              {visionAreas.map((area) => {
                const areaTasks = tasks.filter((t) => t.domain === area.title);
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
                          areaTasks.length === 0 
                            ? "bg-red-500/10 text-red-400 border border-red-500/20" 
                            : "bg-slate-800 text-slate-300"
                        }`}>
                          {areaTasks.length === 0 ? "Nincs cél!" : `${doneCount}/${areaTasks.length}`}
                        </span>

                        {/* KÖZVETLEN HOZZÁADÁS + GOMB */}
                        <button
                          onClick={() => {
                            if (isAddingHere) {
                              setQuickAddAreaTitle(null);
                            } else {
                              setQuickAddAreaTitle(area.title);
                              setQuickAddWeeklyText("");
                            }
                          }}
                          className={`p-1 rounded-lg transition ${
                            isAddingHere 
                              ? "bg-amber-500 text-slate-950" 
                              : "text-slate-400 hover:text-emerald-400 hover:bg-slate-800"
                          }`}
                          title="Heti cél hozzáadása ehhez a területhez"
                        >
                          <PlusIcon size={14} />
                        </button>
                      </div>
                    </div>

                    {/* GYORS BEVITELI FORM KATTINTÁSRA */}
                    {isAddingHere && (
                      <form onSubmit={(e) => handleQuickAddWeekly(area.title, e)} className="flex gap-1.5 pt-1">
                        <input
                          type="text"
                          placeholder={`Új heti cél ide: ${area.title}...`}
                          value={quickAddWeeklyText}
                          onChange={(e) => setQuickAddWeeklyText(e.target.value)}
                          className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                          autoFocus
                        />
                        <button
                          type="submit"
                          className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs px-3 py-1.5 rounded-lg font-semibold shrink-0"
                        >
                          Hozzáad
                        </button>
                      </form>
                    )}

                    {/* HETI CÉLOK LISTÁJA */}
                    <div className="space-y-1.5 pt-0.5">
                      {areaTasks.map((t) => (
                        <div
                          key={t.id}
                          onClick={() => toggleTask(t.id)}
                          className="flex items-center justify-between text-xs p-1.5 rounded hover:bg-slate-800/60 cursor-pointer"
                        >
                          <div className="flex items-center gap-2">
                            {t.done ? (
                              <CheckCircleIcon size={15} className="text-emerald-400 shrink-0" />
                            ) : (
                              <CircleIcon size={15} className="text-slate-600 shrink-0" />
                            )}
                            <span className={t.done ? "line-through text-slate-500" : "text-slate-300"}>
                              {t.title}
                            </span>
                          </div>
                          <button
                            onClick={(e) => deleteTask(t.id, e)}
                            className="text-slate-600 hover:text-red-400 p-0.5"
                          >
                            <TrashIcon size={12} />
                          </button>
                        </div>
                      ))}
                      {areaTasks.length === 0 && !isAddingHere && (
                        <p className="text-[11px] text-slate-600 italic px-1">Nincs cél kitűzve a hétre.</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* MA TAB: NAPI FÓKUSZ ÉS BIG 3                              */}
        {/* ======================================================== */}
        {activeTab === "today" && (
          <>
            <section className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center gap-5 shadow-lg shadow-black/20">
              <div className="relative w-20 h-20 flex items-center justify-center shrink-0">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-slate-800"
                    strokeWidth="3.5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-emerald-500 transition-all duration-500"
                    strokeDasharray={`${taskProgressPct}, 100`}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute text-center">
                  <span className="text-base font-extrabold text-white">{taskProgressPct}%</span>
                </div>
              </div>
              <div className="space-y-1">
                <span className="text-xs uppercase tracking-wide text-slate-400 font-semibold">Napi Készültség</span>
                <p className="text-sm font-medium text-slate-200">
                  {completedScored} / {scoredTasks.length} feladat elvégezve
                </p>
                <p className="text-xs text-slate-500">A mai fókuszpontjaid.</p>
              </div>
            </section>

            <form onSubmit={handleAddTask} className="bg-slate-900 border border-slate-800 rounded-xl p-3 space-y-2.5 shadow-sm">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder={`Napi feladat ide: ${formatShortDate(selectedDate)}...`}
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1 shrink-0 transition"
                >
                  <PlusIcon size={14} />
                  <span>Hozzáad</span>
                </button>
              </div>

              <div className="flex gap-1.5 text-[11px]">
                <button
                  type="button"
                  onClick={() => setNewTaskType("BIG3")}
                  className={`flex-1 py-1 rounded border font-medium transition ${
                    newTaskType === "BIG3"
                      ? "bg-amber-500/20 border-amber-500/50 text-amber-300"
                      : "bg-slate-950 border-slate-800 text-slate-400"
                  }`}
                >
                  Big 3
                </button>
                <button
                  type="button"
                  onClick={() => setNewTaskType("SCHEDULED")}
                  className={`flex-1 py-1 rounded border font-medium transition ${
                    newTaskType === "SCHEDULED"
                      ? "bg-blue-500/20 border-blue-500/50 text-blue-300"
                      : "bg-slate-950 border-slate-800 text-slate-400"
                  }`}
                >
                  Ütemezett
                </button>
                <button
                  type="button"
                  onClick={() => setNewTaskType("DAILY5_MINI")}
                  className={`flex-1 py-1 rounded border font-medium transition ${
                    newTaskType === "DAILY5_MINI"
                      ? "bg-slate-800 border-slate-600 text-slate-200"
                      : "bg-slate-950 border-slate-800 text-slate-400"
                  }`}
                >
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
                  <div
                    key={task.id}
                    onClick={() => toggleTask(task.id)}
                    className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition active:scale-[0.98] ${
                      task.done 
                        ? "bg-emerald-950/20 border-emerald-800/40 text-slate-400 line-through" 
                        : "bg-slate-900 border-slate-800 text-slate-100 hover:border-slate-700"
                    }`}
                  >
                    <div className="flex items-center gap-3 pr-2">
                      {task.done ? (
                        <CheckCircleIcon size={20} className="text-emerald-400 shrink-0" />
                      ) : (
                        <CircleIcon size={20} className="text-slate-500 shrink-0" />
                      )}
                      <div>
                        <span className="text-sm font-medium leading-snug">{task.title}</span>
                        {task.domain && (
                          <span className="text-[10px] text-emerald-400/80 block mt-0.5">{task.domain}</span>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={(e) => deleteTask(task.id, e)}
                      className="text-slate-600 hover:text-red-400 p-1 rounded transition shrink-0"
                    >
                      <TrashIcon size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {/* ======================================================== */}
        {/* IRÁNYTŰ TAB: ÉLETTERÜLETEK TELJES TÁRA & SZERKESZTÉS    */}
        {/* ======================================================== */}
        {activeTab === "vision" && (
          <div className="space-y-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2 shadow-sm">
              <div className="flex items-center gap-2">
                <CompassIcon size={20} className="text-emerald-400" />
                <h2 className="text-sm font-bold uppercase tracking-wider text-emerald-400">Élet-Iránytű</h2>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Kattints egy kártyára a részletek kinyitásához. A ceruza ikonnal a nevet és a célokat is közvetlenül módosíthatod.
              </p>
            </div>

            <div className="space-y-2.5">
              {visionAreas.map((area) => {
                const isExpanded = expandedAreaId === area.id;
                const isEditing = editingAreaId === area.id;

                return (
                  <div 
                    key={area.id} 
                    className={`bg-slate-900 border rounded-2xl transition duration-200 overflow-hidden ${
                      isExpanded ? "border-emerald-500/40 shadow-lg shadow-black/30" : "border-slate-800/80 hover:border-slate-700"
                    }`}
                  >
                    <div
                      onClick={() => toggleAreaExpand(area.id)}
                      className="p-3.5 flex items-start justify-between cursor-pointer select-none gap-2"
                    >
                      <div className="flex items-start gap-2.5 pr-2 flex-1">
                        <span className={`w-2 h-2 rounded-full shrink-0 mt-1.5 ${isExpanded ? "bg-emerald-400" : "bg-slate-600"}`} />
                        <div className="space-y-1">
                          <h3 className="text-sm font-bold text-slate-100 tracking-wide">{area.title}</h3>
                          {!isExpanded && area.nextBigGoal && (
                            <p className="text-xs text-amber-400/90 font-medium leading-snug whitespace-pre-line">
                              <span className="text-[10px] uppercase font-bold text-amber-500/80 block">Következő NAGY cél:</span>
                              {area.nextBigGoal}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 pt-0.5">
                        {!isEditing && (
                          <button
                            onClick={(e) => startEditArea(area, e)}
                            className="text-slate-400 hover:text-emerald-400 p-1.5 rounded hover:bg-slate-800 transition"
                          >
                            <EditIcon size={15} />
                          </button>
                        )}
                        <ChevronDownIcon 
                          size={17} 
                          className={`text-slate-500 transition-transform duration-300 ${isExpanded ? "transform rotate-180 text-emerald-400" : ""}`} 
                        />
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="px-3.5 pb-4 pt-1 border-t border-slate-800/60 space-y-3">
                        {!isEditing ? (
                          <div className="space-y-3 text-xs leading-relaxed mt-2">
                            <div className="bg-red-950/20 border border-red-900/30 rounded-xl p-3">
                              <span className="text-[10px] uppercase font-bold text-red-400 tracking-wider block mb-1">
                                POKOL KÉPE (AMIT EL AKARUNK KERÜLNI)
                              </span>
                              <p className="text-slate-300 italic whitespace-pre-line">{area.hell || "Nincs még kitöltve."}</p>
                            </div>

                            <div className="bg-emerald-950/20 border border-emerald-900/30 rounded-xl p-3">
                              <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider block mb-1">
                                IDEÁLIS KÉP (AHOVA TARTUNK)
                              </span>
                              <p className="text-slate-200 whitespace-pre-line">{area.ideal || "Nincs még kitöltve."}</p>
                            </div>

                            <div className="bg-amber-950/20 border border-amber-900/30 rounded-xl p-3">
                              <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider block mb-1">
                                KÖVETKEZŐ NAGY CÉL
                              </span>
                              <p className="text-amber-200 font-medium whitespace-pre-line">{area.nextBigGoal || "Nincs még kitűzve."}</p>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-3 pt-2 text-xs">
                            <div>
                              <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Életterület elnevezése:</label>
                              <input
                                type="text"
                                value={editForm.title}
                                onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-100 font-bold focus:outline-none focus:border-emerald-500"
                              />
                            </div>

                            <div>
                              <label className="text-[10px] uppercase font-bold text-red-400 block mb-1">POKOL KÉPE:</label>
                              <textarea
                                rows={3}
                                value={editForm.hell}
                                onChange={(e) => setEditForm({ ...editForm, hell: e.target.value })}
                                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 focus:outline-none focus:border-red-500"
                              />
                            </div>

                            <div>
                              <label className="text-[10px] uppercase font-bold text-emerald-400 block mb-1">IDEÁLIS KÉP:</label>
                              <textarea
                                rows={4}
                                value={editForm.ideal}
                                onChange={(e) => setEditForm({ ...editForm, ideal: e.target.value })}
                                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 focus:outline-none focus:border-emerald-500"
                              />
                            </div>

                            <div>
                              <label className="text-[10px] uppercase font-bold text-amber-400 block mb-1">KÖVETKEZŐ NAGY CÉL:</label>
                              <textarea
                                rows={2}
                                value={editForm.nextBigGoal}
                                onChange={(e) => setEditForm({ ...editForm, nextBigGoal: e.target.value })}
                                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-amber-200 focus:outline-none focus:border-amber-500"
                              />
                            </div>

                            <div className="flex justify-between items-center pt-2">
                              <button
                                type="button"
                                onClick={(e) => deleteArea(area.id, e)}
                                className="text-red-400 hover:text-red-300 text-xs flex items-center gap-1 p-1"
                              >
                                <TrashIcon size={14} />
                                <span>Terület törlése</span>
                              </button>

                              <div className="flex gap-2">
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setEditingAreaId(null);
                                  }}
                                  className="text-slate-400 hover:text-slate-200 text-xs px-3 py-1 rounded"
                                >
                                  Mégse
                                </button>
                                <button
                                  type="button"
                                  onClick={(e) => saveEditArea(area.id, e)}
                                  className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs px-3 py-1 rounded font-semibold transition"
                                >
                                  Mentés
                                </button>
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
                <button
                  onClick={() => setIsAddingNewArea(true)}
                  className="w-full py-3 border border-dashed border-slate-800 hover:border-emerald-500/50 rounded-2xl flex items-center justify-center gap-2 text-xs font-semibold text-slate-400 hover:text-emerald-400 transition bg-slate-900/40"
                >
                  <PlusIcon size={16} />
                  <span>Új életterület hozzáadása</span>
                </button>
              ) : (
                <form onSubmit={handleAddNewArea} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-200">Új életterület megnevezése</span>
                    <button
                      type="button"
                      onClick={() => {
                        setIsAddingNewArea(false);
                        setNewAreaTitle("");
                      }}
                      className="text-xs text-slate-500 hover:text-slate-300"
                    >
                      Mégse
                    </button>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Pl. Lelkiség, Hobbi, Tanulmányok..."
                      value={newAreaTitle}
                      onChange={(e) => setNewAreaTitle(e.target.value)}
                      className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                      autoFocus
                    />
                    <button
                      type="submit"
                      className="bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 py-2 rounded-lg text-xs font-semibold shrink-0"
                    >
                      Létrehozás
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}

      </main>

      {/* ALSÓ MENÜSÁV */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-slate-900/90 backdrop-blur border-t border-slate-800 px-4 py-2.5 flex justify-around items-center z-30">
        <button 
          onClick={() => setActiveTab("today")}
          className={`flex flex-col items-center gap-1 transition ${
            activeTab === "today" ? "text-emerald-400" : "text-slate-500 hover:text-slate-300"
          }`}
        >
          <CalendarIcon size={18} />
          <span className="text-[10px] font-semibold">Ma</span>
        </button>

        <button 
          onClick={() => setActiveTab("week")}
          className={`flex flex-col items-center gap-1 transition ${
            activeTab === "week" ? "text-emerald-400" : "text-slate-500 hover:text-slate-300"
          }`}
        >
          <LayoutGridIcon size={18} />
          <span className="text-[10px] font-semibold">Hét</span>
        </button>

        <button 
          onClick={() => setActiveTab("sprint")}
          className={`flex flex-col items-center gap-1 transition ${
            activeTab === "sprint" ? "text-emerald-400" : "text-slate-500 hover:text-slate-300"
          }`}
        >
          <TargetIcon size={18} />
          <span className="text-[10px] font-semibold">Sprint</span>
        </button>

        <button 
          onClick={() => setActiveTab("vision")}
          className={`flex flex-col items-center gap-1 transition ${
            activeTab === "vision" ? "text-emerald-400" : "text-slate-500 hover:text-slate-300"
          }`}
        >
          <CompassIcon size={18} />
          <span className="text-[10px] font-semibold">Iránytű</span>
        </button>
      </nav>

    </div>
  );
}
