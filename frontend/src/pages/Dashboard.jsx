import { useState, useEffect } from "react";

export default function Dashboard() {
  const [sector, setSector] = useState("Core");
  const [missions, setMissions] = useState([]);

  const workoutData = {
    Arms: [
      { id: 1, title: "Supernova Curls (3x12)", xp: 150 },
      { id: 2, title: "Comet Tricep Extensions", xp: 100 },
      { id: 3, title: "Asteroid Hammer Curls", xp: 120 },
    ],
    Legs: [
      { id: 4, title: "Gravity Squats (4x10)", xp: 200 },
      { id: 5, title: "Lunar Lunges", xp: 150 },
      { id: 6, title: "Orbit Calf Raises", xp: 80 },
    ],
    Core: [
      { id: 7, title: "Black Hole Planks (1 min)", xp: 120 },
      { id: 8, title: "Plasma Leg Raises", xp: 100 },
      { id: 9, title: "Nebula Crunches", xp: 90 },
    ],
  };

  // Update missions when sector changes
  useEffect(() => {
    const tasks = workoutData[sector].map(t => ({ ...t, completed: false }));
    setMissions(tasks);
  }, [sector]);

  const toggleMission = (id) => {
    setMissions(prev => prev.map(m => m.id === id ? { ...m, completed: !m.completed } : m));
  };

  const baseXP = 800;
  const earnedXP = missions.filter(m => m.completed).reduce((sum, m) => sum + m.xp, 0);
  const totalXP = baseXP + earnedXP;

  const size = Math.min(140 + (totalXP / 10), 340);
  const level = Math.floor(totalXP / 1000) + 1;

  return (
    <div className="min-h-screen bg-[#0b090c] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>

      <div className="w-full max-w-6xl bg-[#1a161d]/90 backdrop-blur-2xl border border-white/5 rounded-[2rem] p-8 md:p-12 shadow-2xl relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* LEFT: THE INTERACTIVE STAR */}
        <div className="flex flex-col items-center gap-8 lg:border-r border-white/5 lg:pr-10">
          <div className="text-center">
            <h1 className="text-4xl font-black tracking-tighter italic uppercase text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-200">
              Dark Star Dashboard
            </h1>
            <p className="text-gray-500 text-sm tracking-widest uppercase mt-2">Commander Level {level}</p>
          </div>

          <div className="relative flex items-center justify-center h-[380px] w-full">
            {/* Outer Corona Glow */}
            <div 
              className="absolute rounded-full bg-orange-600/30 blur-[60px] animate-pulse"
              style={{ width: size + 40, height: size + 40 }}
            ></div>

            {/* THE STAR CORE WITH CUSTOM TEXTURE */}
            <div 
              className="relative rounded-full overflow-hidden shadow-[inset_0_0_50px_rgba(0,0,0,0.8),0_0_40px_rgba(249,115,22,0.4)] transition-all duration-1000"
              style={{ 
                width: size, 
                height: size,
                background: `url('/2k_sun.jpg')`, // Replace with your actual local file path if needed
                backgroundSize: 'cover',
                backgroundRepeat: 'repeat-x',
                animation: 'solar-rotate 30s linear infinite'
              }}
            >
              {/* Overlay for Heat Gradients */}
              <div className="absolute inset-0 bg-gradient-to-tr from-orange-900/40 via-transparent to-white/20 mix-blend-overlay"></div>
              
              {/* Internal Heat Bloom */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_40%,_black_110%)] opacity-60"></div>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="w-full flex bg-black/40 rounded-2xl p-4 border border-white/5 divide-x divide-white/5">
            <div className="flex-1 text-center">
              <p className="text-[10px] text-gray-500 uppercase tracking-widest">Sector</p>
              <p className="text-lg font-bold text-orange-500">{sector}</p>
            </div>
            <div className="flex-1 text-center">
              <p className="text-[10px] text-gray-500 uppercase tracking-widest">Total XP</p>
              <p className="text-lg font-bold">{totalXP}</p>
            </div>
          </div>
        </div>

        {/* RIGHT: SECTOR SELECT & MISSION LOG */}
        <div className="flex flex-col gap-8">
          {/* Sector Picker */}
          <div>
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Select Target Sector</h2>
            <div className="flex gap-2">
              {["Arms", "Legs", "Core"].map((s) => (
                <button
                  key={s}
                  onClick={() => setSector(s)}
                  className={`flex-1 py-3 rounded-xl border transition-all font-bold ${
                    sector === s 
                    ? "bg-orange-500 border-orange-400 text-white shadow-[0_0_20px_rgba(249,115,22,0.3)]" 
                    : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Mission List */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Mission Log</h2>
              <span className="text-xs text-orange-500 font-mono tracking-tighter bg-orange-500/10 px-2 py-1 rounded">
                XP AVAILABLE: {missions.filter(m => !m.completed).reduce((s, m) => s + m.xp, 0)}
              </span>
            </div>
            
            <div className="space-y-3">
              {missions.map((m) => (
                <div 
                  key={m.id}
                  onClick={() => toggleMission(m.id)}
                  className={`p-4 rounded-xl border cursor-pointer flex justify-between items-center transition-all ${
                    m.completed 
                    ? "bg-green-500/10 border-green-500/40 opacity-60" 
                    : "bg-white/5 border-white/10 hover:border-orange-500/50"
                  }`}
                >
                  <span className={m.completed ? "line-through text-gray-500" : "font-medium"}>{m.title}</span>
                  <div className={`text-xs px-2 py-1 rounded font-bold ${m.completed ? "bg-green-500 text-black" : "bg-orange-500/20 text-orange-400"}`}>
                    +{m.xp} XP
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animation for the Surface Rotation */}
      <style>{`
        @keyframes solar-rotate {
          from { background-position: 0 0; }
          to { background-position: 1000px 0; }
        }
      `}</style>
    </div>
  );
}