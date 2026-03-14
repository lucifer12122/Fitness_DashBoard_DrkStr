import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [stars, setStars] = useState([]);

  useEffect(() => {
    // Generate stars for animated background
    const starArray = Array.from({ length: 150 }).map((_, i) => ({
      id: i,
      size: Math.random() * 2 + 1,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * -20
    }));
    setStars(starArray);
  }, []);

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      localStorage.setItem('token', res.data.token);
      alert('Login successful! Welcome back commander.');
      // navigate('/dashboard'); 
    } catch (err) {
      setError(err.response?.data?.msg || 'Login failed');
    }
  };

  return (
    <>
      {/* Starfield Animation */}
      <div className="fixed top-[-100%] left-0 w-full h-[200%] bg-transparent -z-10 overflow-hidden pointer-events-none">
        {stars.map(star => (
          <div 
            key={star.id}
            className="absolute bg-white rounded-full opacity-50"
            style={{
              width: `${star.size}px`,
              height: `${star.size}px`,
              left: `${star.left}%`,
              top: `${star.top}%`,
              animation: `move-down ${star.duration}s linear infinite`,
              animationDelay: `${star.delay}s`
            }}
          />
        ))}
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes move-down {
            from { transform: translateY(0); }
            to { transform: translateY(50vh); }
          }
        `}} />
      </div>

      {/* Header */}
      <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-primary/20 px-10 py-4 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <div className="size-8 flex items-center justify-center text-primary animate-rocket">
            <span className="material-symbols-outlined text-4xl" style={{fontVariationSettings: "'FILL' 1"}}>rocket_launch</span>
          </div>
          <h2 className="text-slate-900 dark:text-white text-xl font-bold leading-tight tracking-tight">Dark Star</h2>
        </div>
        <div className="flex flex-1 justify-end gap-8 items-center">
          <nav className="hidden md:flex items-center gap-9">
            <a className="text-slate-600 dark:text-slate-300 hover:text-primary transition-colors text-sm font-medium" href="#">Home</a>
            <a className="text-slate-600 dark:text-slate-300 hover:text-primary transition-colors text-sm font-medium" href="#">Marketplace</a>
          </nav>
          <div className="h-8 w-px bg-slate-200 dark:bg-primary/20 mx-2"></div>
          <Link to="/register" className="flex min-w-[84px] cursor-pointer items-center justify-center rounded-xl h-10 px-5 bg-primary text-white text-sm font-bold hover:opacity-90 transition-opacity">
            Sign Up
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute inset-0 nebula-glow pointer-events-none"></div>
        <div className="flex w-full max-w-[1200px] min-h-[720px] rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-primary/10 bg-white dark:bg-zinc-900/50 backdrop-blur-xl z-10">
          
          <div className="hidden lg:flex flex-1 relative flex-col justify-end p-12 bg-cover bg-center" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDkxXik3EcXXocicPlx0UjI-OLIJRj4paQyqiBHJVW2pHIpeGMydc9uqMDE6J6QRvnPIzPhv6G7h9tUrg9uaslwt7B6gjj10znPPUVkNQFrBa0fwf_Rw_UZEQ99yR6OJVyEzBF0VK3WCdhEXfr5feiqRHZg0DqKJAM6aFWTxLV1lbZz-m9cJxyXBXvUbP_0rbmh0eGKDjTgyeNXsh1TaHJqw2rPXPpxiw6Uz2OYga47MjaMzMqAfMkeB1YyAK6NIWwDDuPAwI8HaNip')"}}>
            <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/40 to-transparent"></div>
            <div className="relative z-10">
              <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-4 border border-primary/30">Sector 7-G Access</span>
              <h1 className="text-5xl font-black text-white leading-tight mb-4">Journey to the Edge of the Universe</h1>
              <p className="text-slate-300 text-lg max-w-md leading-relaxed">Join the elite corps of interstellar athletes. Track your fitness missions, earn EXP, and conquer the galaxy through movement.</p>
            </div>
            <div className="absolute top-10 right-10 flex flex-col gap-4 opacity-50">
              <div className="size-16 rounded-full border border-space-accent/30 flex items-center justify-center text-space-accent">
                <span className="material-symbols-outlined">star</span>
              </div>
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-center px-10 md:px-20 py-12 relative w-full max-w-[600px] lg:max-w-none mx-auto lg:mx-0">
            <div className="w-full">
              <div className="mb-10">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Welcome Back</h2>
                <p className="text-slate-500 dark:text-slate-400">Your journey across the stars begins with a single step. Keep moving, Commander.</p>
              </div>

              <div className="flex border-b border-slate-200 dark:border-primary/20 mb-8 w-full cursor-pointer">
                <div className="flex-1 py-4 text-sm font-bold text-primary border-b-2 border-primary transition-all text-center">
                  Login
                </div>
                <Link to="/register" className="flex-1 py-4 text-sm font-bold text-slate-400 dark:text-slate-500 border-b-2 border-transparent hover:text-slate-600 dark:hover:text-slate-300 transition-all text-center">
                  Register
                </Link>
              </div>

              {error && <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-xl text-red-500 font-bold text-sm">{error}</div>}

              <form className="space-y-6" onSubmit={onSubmit}>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-200 block">Email</label>
                  <div className="relative group">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">alternate_email</span>
                    <input 
                      name="email" 
                      value={formData.email} 
                      onChange={onChange}
                      required
                      className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-50 dark:bg-background-dark border border-slate-200 dark:border-primary/20 focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all text-slate-900 dark:text-white outline-none" 
                      placeholder="commander@darkstar.io" 
                      type="email"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-200 block">Access Key</label>
                    <a className="text-xs font-semibold text-primary hover:underline" href="#">Lost signal?</a>
                  </div>
                  <div className="relative group">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">lock</span>
                    <input 
                      name="password" 
                      value={formData.password} 
                      onChange={onChange}
                      required
                      className="w-full pl-12 pr-12 py-4 rounded-xl bg-slate-50 dark:bg-background-dark border border-slate-200 dark:border-primary/20 focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all text-slate-900 dark:text-white outline-none" 
                      placeholder="••••••••••••" 
                      type="password"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <input className="size-5 rounded border-slate-300 dark:border-primary/30 bg-white dark:bg-background-dark text-primary focus:ring-primary" id="remember" type="checkbox"/>
                  <label className="text-sm text-slate-600 dark:text-slate-400" htmlFor="remember">Maintain session persistence</label>
                </div>

                <button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 flex items-center justify-center gap-2 transition-transform active:scale-[0.98]">
                  <span className="material-symbols-outlined">login</span> Sign in
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>

      <footer className="py-8 px-10 text-center relative z-10">
        <p className="text-slate-400 text-xs font-medium tracking-wide uppercase">
          © 2245 Dark Star Interstellar Logistics. All transmissions encrypted.
        </p>
      </footer>
    </>
  );
}
