import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Lock, ArrowLeft, ShieldCheck } from 'lucide-react';

function Login() {
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('https://fdassignmentportal.onrender.com/api/admin/login', { password });
            if (res.data.token) {
                localStorage.setItem('adminToken', res.data.token);
                window.location.href = '/admin';
            }
        } catch (err) {
            alert("Wrong Password!");
        }
    };

    return (
        <div className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
            <div className="w-full max-w-md">
                
                {/* Top Navigation */}
                <div className="flex justify-between items-center mb-6 px-2">
                    <button 
                        onClick={() => navigate('/')} 
                        className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition-all font-semibold group"
                    >
                        <div className="p-2 bg-white rounded-lg shadow-sm group-hover:shadow-md transition-all">
                            <ArrowLeft size={18} />
                        </div>
                        <span>Student Portal</span>
                    </button>
                    <div className="flex items-center gap-1 text-xs font-bold text-gray-400 uppercase tracking-widest">
                        <ShieldCheck size={14} /> Secure Access
                    </div>
                </div>

                {/* Main Card */}
                <div className="bg-white/80 backdrop-blur-xl p-10 rounded-[2.5rem] shadow-2xl border border-white flex flex-col items-center">
                    
                    {/* Animated Icon Header */}
                    <div className="relative mb-8">
                        <div className="absolute inset-0 bg-indigo-500 blur-2xl opacity-20 animate-pulse"></div>
                        <div className="relative bg-gradient-to-tr from-indigo-600 to-blue-500 p-6 rounded-3xl shadow-lg shadow-indigo-200">
                            <Lock className="text-white" size={42} />
                        </div>
                    </div>
                    
                    <h2 className="text-3xl font-black text-gray-800 mb-2">Admin Panel</h2>
                    <p className="text-gray-500 mb-10 font-medium">Authentication required to continue</p>
                    
                    <form onSubmit={handleLogin} className="w-full space-y-6">
                        <div className="relative group">
                            <input
                                type="password"
                                placeholder="Enter secret password"
                                className="w-full p-5 bg-white border-2 border-gray-100 rounded-2xl outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all text-center text-xl tracking-[0.5em] font-mono placeholder:tracking-normal placeholder:text-gray-300 shadow-sm"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        
                        <button className="w-full bg-indigo-600 text-white p-5 rounded-2xl font-black text-lg hover:bg-indigo-700 shadow-xl shadow-indigo-200 transition-all active:scale-95 flex items-center justify-center gap-2 group">
                            Unlock Dashboard
                            <div className="group-hover:translate-x-1 transition-transform">
                                <ShieldCheck size={20} />
                            </div>
                        </button>
                    </form>

                    <p className="mt-8 text-xs text-gray-400 font-medium">
                        Authorized Personnel Only
                    </p>
                </div>

                {/* Footer Branding */}
                <p className="text-center mt-8 text-gray-400 text-sm">
                    © 2026 <span className="font-bold text-gray-600">Future Developer</span>
                </p>
            </div>
        </div>
    );
}

export default Login;