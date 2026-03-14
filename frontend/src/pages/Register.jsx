import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: '',
    gender: 'Male',
    height: '',
    weight: '',
    sleepCycles: 8,
    experienceLevel: 'BEGINNER'
  });
  const [error, setError] = useState('');

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onExperienceClick = (level) => {
    setFormData({ ...formData, experienceLevel: level });
  };

  const onSubmit = async e => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', formData);
      localStorage.setItem('token', res.data.token);
      navigate('/login'); // Redirect to login or dashboard
    } catch (err) {
      setError(err.response?.data?.msg || 'Registration failed');
    }
  };

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <div className="relative hidden lg:flex lg:w-1/2 flex-col justify-between p-12 overflow-hidden bg-obsidian">
        <div className="absolute inset-0 z-0 opacity-60">
          <img 
            alt="Deep space nebula" 
            className="w-full h-full object-cover" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAoVGthV_kUdjID7jKedvzvIesMoc3bpYQhb6NILwGjilQt-Uk8WR2RthvsV663tc49OTuUxn5BK0QW6EF-6Ljsc80AqHSbdKZlzzC6mWnjld32yGHF3eOodF96HCgxhMDW95IMpa2TZrvjPglfSqrzCuDluoXpzp0xZrZJ7lMYyact2DfUdJ_hLhd3QKtDT5PLMp6zdJqBLa7gPc2TvV09GOqd9Jcc_b-8pe8iIfkke1lr-OfHUmXvAk5XBtuxClhSL-j-dxBZUNN4"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-obsidian via-transparent to-obsidian/20"></div>
        </div>
        <div className="relative z-10 flex items-center gap-3">
          <div className="p-2 bg-primary rounded-lg">
            <span className="material-symbols-outlined text-white">rocket_launch</span>
          </div>
          <h1 className="text-2xl font-black tracking-tighter text-white uppercase italic">Dark Star</h1>
        </div>
        <div className="relative z-10">
          <h2 className="text-6xl font-black leading-tight text-white mb-6">FUEL YOUR <br/><span className="text-primary italic">ASCENSION.</span></h2>
          <p className="text-xl text-slate-300 max-w-md">Join the elite squadron of intergalactic athletes. Track your vitals, conquer missions, and transcend your physical limits.</p>
        </div>
        <div className="relative z-10 flex gap-4"></div>
      </div>

      <div className="flex-1 flex flex-col justify-center items-center p-6 lg:p-12 space-bg relative">
        <div className="absolute top-10 right-20 w-32 h-32 opacity-20 pointer-events-none">
          <span className="material-symbols-outlined text-accent-cyan text-8xl blur-[2px] animate-[pulse_4s_infinite]">cyclone</span>
        </div>
        <div className="absolute bottom-40 left-10 w-24 h-24 opacity-20 pointer-events-none rotate-45">
          <span className="material-symbols-outlined text-primary text-6xl blur-[1px] animate-[pulse_6s_infinite]">cyclone</span>
        </div>

        <div className="w-full max-w-xl relative z-10">
          <header className="mb-8 flex justify-between items-end">
            <div>
              <p className="text-primary font-bold uppercase tracking-widest text-sm mb-1">System Initialization</p>
              <h3 className="text-4xl font-black text-white">COMMENCE REGISTRATION</h3>
            </div>
            <span className="material-symbols-outlined text-primary text-4xl animate-pulse">rocket</span>
          </header>

          {error && <div className="mb-4 text-red-500 font-bold">{error}</div>}

          <form className="space-y-6" onSubmit={onSubmit}>
            {/* Identity Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold uppercase tracking-tight text-slate-400">Name</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-primary/60">person</span>
                  <input name="name" value={formData.name} onChange={onChange} required className="w-full pl-12 pr-4 py-4 rounded-xl border-primary/20 bg-charcoal text-white focus:ring-primary focus:border-primary transition-all outline-none" placeholder="e.g. STAR_LORD_99" type="text"/>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold uppercase tracking-tight text-slate-400">Email address</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-primary/60">alternate_email</span>
                  <input name="email" value={formData.email} onChange={onChange} required className="w-full pl-12 pr-4 py-4 rounded-xl border-primary/20 bg-charcoal text-white focus:ring-primary focus:border-primary transition-all outline-none" placeholder="commander@nebula.com" type="email"/>
                </div>
              </div>
            </div>

            {/* Vitals Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase text-slate-500">Age</label>
                <input name="age" value={formData.age} onChange={onChange} required className="w-full px-4 py-3 rounded-xl border-primary/20 bg-charcoal text-white focus:ring-primary outline-none" placeholder="25" type="number"/>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase text-slate-500">Gender</label>
                <select name="gender" value={formData.gender} onChange={onChange} className="w-full px-4 py-3 rounded-xl border-primary/20 bg-charcoal text-white focus:ring-primary outline-none">
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Non-Binary">Non-Binary</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase text-slate-500">Height (cm)</label>
                <input name="height" value={formData.height} onChange={onChange} required className="w-full px-4 py-3 rounded-xl border-primary/20 bg-charcoal text-white focus:ring-primary outline-none" placeholder="180" type="number"/>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase text-slate-500">Weight (kg)</label>
                <input name="weight" value={formData.weight} onChange={onChange} required className="w-full px-4 py-3 rounded-xl border-primary/20 bg-charcoal text-white focus:ring-primary outline-none" placeholder="75" type="number"/>
              </div>
            </div>

            {/* Sleep & Experience */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold uppercase tracking-tight text-slate-400">Avg. Sleep Cycles (Hours)</label>
                <div className="flex items-center gap-4 bg-charcoal p-2 rounded-xl border border-primary/20">
                  <span className="material-symbols-outlined text-accent-cyan ml-2">bedtime</span>
                  <input name="sleepCycles" value={formData.sleepCycles} onChange={onChange} className="w-full accent-primary" max="12" min="4" type="range"/>
                  <span className="font-bold text-primary mr-2">{formData.sleepCycles}h</span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold uppercase tracking-tight text-slate-400">Experience Level</label>
                <div className="grid grid-cols-3 gap-2">
                  {['BEGINNER', 'INTERMED', 'ADVANCED'].map((level) => (
                    <button 
                      key={level}
                      onClick={() => onExperienceClick(level)}
                      className={`py-2 px-1 text-xs font-bold border-2 rounded-lg transition-colors ${formData.experienceLevel === level ? 'border-primary bg-primary text-white' : 'border-primary/20 text-slate-500 hover:border-primary/60'}`}
                      type="button"
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Security Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold uppercase tracking-tight text-slate-400">Password</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-primary/60">lock</span>
                  <input name="password" value={formData.password} onChange={onChange} required minLength="6" className="w-full pl-12 pr-4 py-4 rounded-xl border-primary/20 bg-charcoal text-white focus:ring-primary focus:border-primary transition-all outline-none" placeholder="••••••••" type="password"/>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold uppercase tracking-tight text-slate-400">Confirm Password</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-primary/60">lock_reset</span>
                  <input name="confirmPassword" value={formData.confirmPassword} onChange={onChange} required minLength="6" className="w-full pl-12 pr-4 py-4 rounded-xl border-primary/20 bg-charcoal text-white focus:ring-primary focus:border-primary transition-all outline-none" placeholder="••••••••" type="password"/>
                </div>
              </div>
            </div>

            <div className="pt-6 space-y-4">
              <button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90 text-white font-black text-xl py-5 rounded-xl shadow-lg shadow-primary/30 flex items-center justify-center gap-3 transition-transform active:scale-[0.98]"
              >
                <span className="material-symbols-outlined">rocket_launch</span>
                LAUNCH ACCOUNT
              </button>
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer text-slate-400">
                  <input required defaultChecked className="rounded border-primary/40 text-primary focus:ring-primary bg-transparent" type="checkbox"/>
                  <span className="text-primary hover:underline">Terms & Conditions</span>
                </label>
                <Link to="/login" className="text-primary font-bold hover:underline">Already Enlisted? Login</Link>
              </div>
            </div>
          </form>

          <footer className="mt-12 flex justify-center gap-8 text-slate-500">
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">security</span>
              <span className="text-xs uppercase font-bold tracking-tighter">Encrypted Link</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">public</span>
              <span className="text-xs uppercase font-bold tracking-tighter">Global Relay</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">verified_user</span>
              <span className="text-xs uppercase font-bold tracking-tighter">Protocol 4.0</span>
            </div>
          </footer>
        </div>

        <div className="absolute bottom-6 right-6 opacity-30">
          <span className="material-symbols-outlined text-primary text-2xl rotate-45">rocket</span>
        </div>
      </div>
    </div>
  );
}
