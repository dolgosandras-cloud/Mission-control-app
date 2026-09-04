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

const FlameIcon = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
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

// INITIAL DATA A 7 ÉLETTERÜLETTEL
const INITIAL_DATA = {
  sprint: {
    id: "sprint-1",
    name: "2026 Q3 - 6 hetes fókusz",
    totalWeeks: 6,
    currentWeek: 2,
    milestones: [
      { id: "m1", title: "Gyerekszobák kifestése, berendezése", domain: "Otthon & Lakás", done: false },
      { id: "m2", title: "Murph kihívás felkészülés & Orsi mozgása", domain: "Egészség & Fitnesz", done: true },
      { id: "m3", title: "12M Ft-os megtakarítási szint elérése dec-re", domain: "Pénzügyek, anyagiak", done: false },
      { id: "m4", title: "Szent Istvános közösségi szerepvállalás", domain: "Család & Kapcsolatok", done: false }
    ]
  },
  tasks: [
    { id: "t1", date: "2026-09-04", title: "Murph edzésprogram heti bontás átnézése", type: "BIG3", done: true },
    { id: "t2", date: "2026-09-04", title: "Festék és alapozó árak összeírása szobákhoz", type: "BIG3", done: false },
    { id: "t3", date: "2026-09-04", title: "Megtakarítási ráta havi frissítése", type: "BIG3", done: false },
    { id: "t4", date: "2026-09-04", title: "Heti projekt jelentés elküldése", type: "SCHEDULED", done: true },
    { id: "t5", date: "2026-09-04", title: "Szűrőbetét csere a konyhában", type: "DAILY5_MINI", done: false }
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

export default function App() {
  const [activeTab, setActiveTab] = useState("vision"); // Indításként közvetlenül az Iránytű nyílik
  const [selectedDate, setSelectedDate] = useState("2026-09-04");

  const [state, setState] = useState(() => {
    const saved = localStorage.getItem("mc_cloud_state");
    if (saved) {
      const parsed = JSON.parse(saved);
      // Ha még a régi struktúra volt benne visionAreas nélkül, beillesztjük
      if (!parsed.visionAreas) {
        parsed.visionAreas = INITIAL_DATA.visionAreas;
      }
      return parsed;
    }
    return INITIAL_DATA;
  });

  const [syncStatus, setSyncStatus] = useState("synced");
  const isInternalUpdate = useRef(false);

  // Iránytű szerkesztés állapota
  const [editingAreaId, setEditingAreaId] = useState(null);
  const [editForm, setEditForm] = useState({ hell: "", ideal: "", nextBigGoal: "" });

  // Beviteli mezők (napi & sprint)
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskType, setNewTaskType] = useState("BIG3");
  const [newMilestoneTitle, setNewMilestoneTitle] = useState("");
  const [newMilestoneDomain, setNewMilestoneDomain] = useState("Otthon & Lakás");

  // 1. ADATLEKÉRÉS ÉS PERIODIKUS HÁTTÉR-SZINKRONIZÁCIÓ (3 MP)
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
            if (!serverData.visionAreas) {
              serverData.visionAreas = INITIAL_DATA.visionAreas;
            }
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

  const { sprint, tasks, habits, habitLogs, visionAreas = INITIAL_DATA.visionAreas } = state;

  const currentDayTasks = tasks.filter((t) => (t.date || "2026-09-04") === selectedDate);
  const scoredTasks = currentDayTasks.filter((t) => t.type === "BIG3" || t.type === "SCHEDULED");
  const completedScored = scoredTasks.filter((t) => t.done).length;
  const taskProgressPct = scoredTasks.length > 0 ? Math.round((completedScored / scoredTasks.length) * 100) : 0;

  const isHabitDone = (dateKey, habitId) => !!habitLogs?.[dateKey]?.[habitId];
  const morningHabits = habits.filter((h) => h.block === "morning");
  const isMorningComplete = morningHabits.length > 0 && morningHabits.every((h) => isHabitDone(selectedDate, h.id));

  const completedMilestones = sprint.milestones.filter((m) => m.done).length;
  const sprintProgressPct = sprint.milestones.length > 0 ? Math.round((completedMilestones / sprint.milestones.length) * 100) : 0;

  // Iránytű mentés kezelője
  const startEditArea = (area) => {
    setEditingAreaId(area.id);
    setEditForm({
      hell: area.hell,
      ideal: area.ideal,
      nextBigGoal: area.nextBigGoal
    });
  };

  const saveEditArea = (id) => {
    setState((prev) => ({
      ...prev,
      visionAreas: (prev.visionAreas || INITIAL_DATA.visionAreas).map((a) =>
        a.id === id ? { ...a, ...editForm } : a
      )
    }));
    setEditingAreaId(null);
  };

  // Napi feladat műveletek
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

  const toggleHabit = (dateKey, habitId) => {
    setState((prev) => {
      const day = prev.habitLogs?.[dateKey] || {};
      return {
        ...prev,
        habitLogs: {
          ...prev.habitLogs,
          [dateKey]: {
            ...day,
            [habitId]: !day[habitId]
          }
        }
      };
    });
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
    setState((prev) => ({
      ...prev,
      tasks: [newTask, ...prev.tasks]
    }));
    setNewTaskTitle("");
  };

  const handleAddMilestone = (e) => {
    e.preventDefault();
    if (!newMilestoneTitle.trim()) return;
    const newM = {
      id: `m-${Date.now()}`,
      title: newMilestoneTitle.trim(),
      domain: newMilestoneDomain,
      done: false
    };
    setState((prev) => ({
      ...prev,
      sprint: {
        ...prev.sprint,
        milestones: [...prev.sprint.milestones, newM]
      }
    }));
    setNewMilestoneTitle("");
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100 max-w-md mx-auto font-sans pb-24 select-none">
      
      {/* FEJLÉC */}
      <header className="p-4 border-b border-slate-800/80 bg-slate-900/50 backdrop-blur sticky top-0 z-20 flex justify-between items-center">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">Mission Control</span>
            <div className={`flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded ${
              syncStatus === "synced" ? "bg-emerald-500/10 text-emerald-400" :
              syncStatus === "saving" ? "bg-amber-500/10 text-amber-400 animate-pulse" : "bg-red-500/10 text-red-400"
            }`}>
              <CloudIcon size={12} />
              <span>{syncStatus === "synced" ? "Élő szinkron" : syncStatus === "saving" ? "Mentés..." : "Offline"}</span>
            </div>
          </div>
          <h1 className="text-lg font-bold tracking-tight">
            {DAYS_OF_WEEK.find((d) => d.key === selectedDate)?.label}, {selectedDate}
          </h1>
        </div>
        <div className="flex items-center gap-1 bg-amber-500/10 text-amber-400 px-2.5 py-1 rounded-full text-xs font-medium border border-amber-500/20">
          <FlameIcon size={14} />
          <span>7 Napos Streak</span>
        </div>
      </header>

      {/* VÍZSZINTES HETI NAPTÁRSÁV (Ha nem az Iránytű van nyitva) */}
      {activeTab !== "vision" && (
        <div className="bg-slate-900/80 border-b border-slate-800 px-3 py-2.5 flex justify-between gap-1.5 overflow-x-auto">
          {DAYS_OF_WEEK.map((day) => {
            const isSelected = day.key === selectedDate;
            const dayTasks = tasks.filter((t) => t.date === day.key && (t.type === "BIG3" || t.type === "SCHEDULED"));
            const doneTasks = dayTasks.filter((t) => t.done).length;
            const pct = dayTasks.length > 0 ? Math.round((doneTasks / dayTasks.length) * 100) : null;

            return (
              <button
                key={day.key}
                onClick={() => setSelectedDate(day.key)}
                className={`flex-1 py-1.5 px-1 rounded-xl flex flex-col items-center gap-1 transition ${
                  isSelected 
                    ? "bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20" 
                    : "hover:bg-slate-800 text-slate-400"
                }`}
              >
                <span className="text-[10px] uppercase">{day.short}</span>
                <span className="text-xs">{day.key.split("-")[2]}</span>
                {pct !== null ? (
                  <span className={`text-[9px] px-1 rounded-full ${
                    isSelected ? "bg-slate-900 text-emerald-400" : "bg-slate-800 text-slate-300"
                  }`}>
                    {pct}%
                  </span>
                ) : (
                  <span className="text-[9px] opacity-40">-</span>
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* FŐ TARTALOM */}
      <main className="p-4 space-y-5 flex-1">
        
        {/* 1. MA TAB */}
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
                <p className="text-xs text-slate-500">A kiválasztott nap fókuszpontjai.</p>
              </div>
            </section>

            {/* GYORS BEVITEL */}
            <form onSubmit={handleAddTask} className="bg-slate-900 border border-slate-800 rounded-xl p-3 space-y-2.5 shadow-sm">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder={`Feladat rögzítése ide: ${selectedDate}...`}
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

            {/* BIG 3 BLOKK */}
            <section className="space-y-2">
              <h2 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5 px-1">
                <TargetIcon size={14} /> Big 3 prioritás
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
                      <span className="text-sm font-medium leading-snug">{task.title}</span>
                    </div>
                    <button
                      onClick={(e) => deleteTask(task.id, e)}
                      className="text-slate-600 hover:text-red-400 p-1 rounded transition shrink-0"
                    >
                      <TrashIcon size={14} />
                    </button>
                  </div>
                ))}
                {currentDayTasks.filter((t) => t.type === "BIG3").length === 0 && (
                  <p className="text-xs text-slate-600 italic px-2 py-1">Nincs Big3 feladat mára kitűzve.</p>
                )}
              </div>
            </section>

            {/* ÜTEMEZETT FELADATOK */}
            {currentDayTasks.some((t) => t.type === "SCHEDULED") && (
              <section className="space-y-2">
                <h2 className="text-xs font-bold uppercase tracking-wider text-blue-400 px-1">
                  Ütemezett teendők
                </h2>
                <div className="space-y-1.5">
                  {currentDayTasks.filter((t) => t.type === "SCHEDULED").map((task) => (
                    <div
                      key={task.id}
                      onClick={() => toggleTask(task.id)}
                      className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition ${
                        task.done 
                          ? "bg-slate-900/50 border-slate-800/60 text-slate-500 line-through" 
                          : "bg-slate-900 border-slate-800 text-slate-200"
                      }`}
                    >
                      <div className="flex items-center gap-3 pr-2">
                        {task.done ? (
                          <CheckCircleIcon size={18} className="text-emerald-500 shrink-0" />
                        ) : (
                          <CircleIcon size={18} className="text-slate-600 shrink-0" />
                        )}
                        <span className="text-xs font-medium">{task.title}</span>
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
            )}

            {/* NAPI SZOKÁSOK */}
            <section className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <h2 className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                  Napi Szokások ({selectedDate})
                </h2>
                {isMorningComplete && (
                  <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded font-semibold">
                    Win the Morning KÉSZ! ✓
                  </span>
                )}
              </div>
              
              <div className={`p-3 rounded-xl border space-y-2.5 transition ${
                isMorningComplete ? "bg-slate-900/90 border-cyan-800/50" : "bg-slate-900 border-slate-800"
              }`}>
                <div className="text-xs font-semibold text-slate-400 mb-1">Win the Morning blokk:</div>
                {morningHabits.map((habit) => {
                  const done = isHabitDone(selectedDate, habit.id);
                  return (
                    <div 
                      key={habit.id}
                      onClick={() => toggleHabit(selectedDate, habit.id)}
                      className="flex items-center gap-3 cursor-pointer select-none"
                    >
                      {done ? (
                        <CheckCircleIcon size={17} className="text-cyan-400 shrink-0" />
                      ) : (
                        <CircleIcon size={17} className="text-slate-600 shrink-0" />
                      )}
                      <span className={`text-xs ${done ? "text-slate-400 line-through" : "text-slate-200"}`}>
                        {habit.title}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 space-y-2.5">
                <div className="text-xs font-semibold text-slate-400 mb-1">További rutinok:</div>
                {habits.filter((h) => h.block !== "morning").map((habit) => {
                  const done = isHabitDone(selectedDate, habit.id);
                  return (
                    <div 
                      key={habit.id}
                      onClick={() => toggleHabit(selectedDate, habit.id)}
                      className="flex items-center gap-3 cursor-pointer select-none"
                    >
                      {done ? (
                        <CheckCircleIcon size={17} className="text-emerald-400 shrink-0" />
                      ) : (
                        <CircleIcon size={17} className="text-slate-600 shrink-0" />
                      )}
                      <span className={`text-xs ${done ? "text-slate-400 line-through" : "text-slate-200"}`}>
                        {habit.title}
                      </span>
                    </div>
                  );
                })}
              </div>
            </section>
          </>
        )}

        {/* 2. HÉT TAB */}
        {activeTab === "week" && (
          <div className="space-y-5">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Heti Áttekintés</span>
              <p className="text-xs text-slate-300">
                Kattints egy napra a felső naptársávban az adott nap teendőinek szerkesztéséhez!
              </p>
            </div>

            {/* SZOKÁS MÁTRIX */}
            <section className="bg-slate-900 border border-slate-800 rounded-2xl p-3.5 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Szokások Heti Mátrixa</span>
                <span className="text-[10px] text-slate-500 font-medium">H - V</span>
              </div>

              <div className="space-y-2.5">
                {habits.map((habit) => (
                  <div key={habit.id} className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-300 truncate max-w-[200px]">{habit.title}</span>
                      <span className="text-[10px] text-slate-500">
                        {DAYS_OF_WEEK.filter((d) => isHabitDone(d.key, habit.id)).length} / 7
                      </span>
                    </div>
                    <div className="grid grid-cols-7 gap-1.5">
                      {DAYS_OF_WEEK.map((d) => {
                        const done = isHabitDone(d.key, habit.id);
                        return (
                          <button
                            key={d.key}
                            onClick={() => toggleHabit(d.key, habit.id)}
                            className={`h-7 rounded flex items-center justify-center text-[10px] font-bold transition ${
                              done 
                                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40" 
                                : "bg-slate-950 text-slate-600 border border-slate-800/60"
                            }`}
                          >
                            {d.short}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* 3. SPRINT TAB */}
        {activeTab === "sprint" && (
          <div className="space-y-5">
            <section className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">Aktív Sprint</span>
                  <h2 className="text-base font-bold text-white">{sprint.name}</h2>
                </div>
                <span className="text-xs bg-slate-800 text-slate-300 px-2.5 py-1 rounded-full font-medium">
                  Hét: {sprint.currentWeek} / {sprint.totalWeeks}
                </span>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Mérföldkövek haladása</span>
                  <span className="font-bold text-emerald-400">{sprintProgressPct}%</span>
                </div>
                <div className="h-2.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                    style={{ width: `${sprintProgressPct}%` }}
                  />
                </div>
              </div>
            </section>

            <form onSubmit={handleAddMilestone} className="bg-slate-900 border border-slate-800 rounded-xl p-3 space-y-2.5">
              <span className="text-xs font-bold text-slate-300">Új mérföldkő kitűzése</span>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Mérföldkő neve..."
                  value={newMilestoneTitle}
                  onChange={(e) => setNewMilestoneTitle(e.target.value)}
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1 shrink-0 transition"
                >
                  <PlusIcon size={14} />
                  <span>Kitűz</span>
                </button>
              </div>
              <select
                value={newMilestoneDomain}
                onChange={(e) => setNewMilestoneDomain(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-300 focus:outline-none"
              >
                {visionAreas.map((area) => (
                  <option key={area.id} value={area.title}>{area.title}</option>
                ))}
              </select>
            </form>

            <section className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">Időszaki Mérföldkövek</h3>
              <div className="space-y-2">
                {sprint.milestones.map((m) => (
                  <div
                    key={m.id}
                    onClick={() => toggleMilestone(m.id)}
                    className="p-3.5 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between cursor-pointer active:scale-[0.99] transition"
                  >
                    <div className="flex items-center gap-3 pr-2">
                      {m.done ? (
                        <CheckCircleIcon size={18} className="text-emerald-400 shrink-0" />
                      ) : (
                        <CircleIcon size={18} className="text-slate-600 shrink-0" />
                      )}
                      <div>
                        <p className={`text-xs font-medium ${m.done ? "line-through text-slate-500" : "text-slate-200"}`}>
                          {m.title}
                        </p>
                        <span className="text-[10px] text-slate-500 font-semibold">{m.domain}</span>
                      </div>
                    </div>
                    <button
                      onClick={(e) => deleteMilestone(m.id, e)}
                      className="text-slate-600 hover:text-red-400 p-1 rounded transition shrink-0"
                    >
                      <TrashIcon size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* 4. IRÁNYTŰ TAB (A 7 ÉLETTERÜLET RÉSZLETES KIBONTÁSA) */}
        {activeTab === "vision" && (
          <div className="space-y-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-1 shadow-sm">
              <div className="flex items-center gap-2">
                <CompassIcon size={20} className="text-emerald-400" />
                <h2 className="text-sm font-bold uppercase tracking-wider text-emerald-400">Élet-Iránytű (7 Terület)</h2>
              </div>
              <p className="text-xs text-slate-400">
                A mély belső motiváció és az elkerülendő pokol térképe. Bármelyik kártyát közvetlenül szerkesztheted.
              </p>
            </div>

            <div className="space-y-3.5">
              {visionAreas.map((area) => {
                const isEditing = editingAreaId === area.id;

                return (
                  <div key={area.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3 shadow-md">
                    {/* FEJLÉC ÉS SZERKESZTŐ GOMB */}
                    <div className="flex justify-between items-center border-b border-slate-800/80 pb-2">
                      <h3 className="text-sm font-bold text-white tracking-wide flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                        {area.title}
                      </h3>
                      {!isEditing ? (
                        <button
                          onClick={() => startEditArea(area)}
                          className="text-slate-400 hover:text-emerald-400 p-1 transition flex items-center gap-1 text-[11px]"
                        >
                          <EditIcon size={14} />
                          <span>Szerkeszt</span>
                        </button>
                      ) : (
                        <div className="flex gap-2">
                          <button
                            onClick={() => setEditingAreaId(null)}
                            className="text-slate-400 hover:text-slate-200 text-xs px-2 py-0.5 rounded"
                          >
                            Mégse
                          </button>
                          <button
                            onClick={() => saveEditArea(area.id)}
                            className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs px-2.5 py-0.5 rounded font-medium transition"
                          >
                            Mentés
                          </button>
                        </div>
                      )}
                    </div>

                    {/* TARTALOM (OLVASÓ VAGY SZERKESZTŐ NÉZET) */}
                    {!isEditing ? (
                      <div className="space-y-3 text-xs leading-relaxed">
                        <div className="bg-red-950/20 border border-red-900/30 rounded-xl p-2.5">
                          <span className="text-[10px] uppercase font-bold text-red-400 tracking-wider block mb-1">
                            Pokol képe (Amit el akarunk kerülni)
                          </span>
                          <p className="text-slate-300 italic whitespace-pre-line">{area.hell}</p>
                        </div>

                        <div className="bg-emerald-950/20 border border-emerald-900/30 rounded-xl p-2.5">
                          <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider block mb-1">
                            Ideális kép (Ahova tartunk)
                          </span>
                          <p className="text-slate-200 whitespace-pre-line">{area.ideal}</p>
                        </div>

                        <div className="bg-amber-950/20 border border-amber-900/30 rounded-xl p-2.5">
                          <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider block mb-1">
                            Következő NAGY cél
                          </span>
                          <p className="text-amber-200 font-medium whitespace-pre-line">{area.nextBigGoal}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3 text-xs">
                        <div>
                          <label className="text-[10px] uppercase font-bold text-red-400 block mb-1">Pokol képe:</label>
                          <textarea
                            rows={3}
                            value={editForm.hell}
                            onChange={(e) => setEditForm({ ...editForm, hell: e.target.value })}
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 focus:outline-none focus:border-red-500"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] uppercase font-bold text-emerald-400 block mb-1">Ideális kép:</label>
                          <textarea
                            rows={4}
                            value={editForm.ideal}
                            onChange={(e) => setEditForm({ ...editForm, ideal: e.target.value })}
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 focus:outline-none focus:border-emerald-500"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] uppercase font-bold text-amber-400 block mb-1">Következő NAGY cél:</label>
                          <textarea
                            rows={2}
                            value={editForm.nextBigGoal}
                            onChange={(e) => setEditForm({ ...editForm, nextBigGoal: e.target.value })}
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-amber-200 focus:outline-none focus:border-amber-500"
                          />
                        </div>
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
