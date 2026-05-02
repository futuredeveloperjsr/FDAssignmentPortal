import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, User, Lock, Mail, Loader2 } from 'lucide-react';
import API from '../api/axios';

function Login() {
    const navigate = useNavigate();
    const [loginType, setLoginType] = useState('student'); // 'student' or 'admin'
    
    // States for Admin
    const [adminPassword, setAdminPassword] = useState('');
    
    // States for Student
    const [studentEmail, setStudentEmail] = useState('');
    const [studentPassword, setStudentPassword] = useState('');
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleAdminLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const res = await API.post('/admin/login', { password: adminPassword });
            if (res.data.success) {
                localStorage.setItem('adminToken', res.data.token);
                navigate('/admin');
            }
        } catch (err) {
            setError("Wrong Admin Password!");
        } finally {
            setLoading(false);
        }
    };

    const handleStudentLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const res = await API.post('/student/login', { 
                email: studentEmail, 
                password: studentPassword 
            });
            if (res.data.success) {
                localStorage.setItem('studentToken', res.data.token);
                localStorage.setItem('studentInfo', JSON.stringify(res.data.student));
                navigate('/student-dashboard');
            }
        } catch (err) {
            setError(err.response?.data?.message || "Login failed!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
            <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md border border-white/50 backdrop-blur-sm animate-fade-in">
                
                <div className="text-center mb-8">
                    <div className="inline-block p-4 bg-blue-50 rounded-full mb-4 shadow-inner">
                        <ShieldCheck size={40} className="text-blue-600" />
                    </div>
                    <h1 className="text-3xl font-black text-gray-800 tracking-tight">Portal Login</h1>
                    <p className="text-gray-500 mt-2 font-medium">Welcome to the Assignment Portal</p>
                </div>

                {/* Login Type Tabs */}
                <div className="flex bg-gray-100 p-1 rounded-xl mb-8">
                    <button 
                        onClick={() => { setLoginType('student'); setError(''); }}
                        className={`flex-1 flex justify-center items-center gap-2 py-3 rounded-lg font-bold transition-all ${loginType === 'student' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        <User size={18} /> Student
                    </button>
                    <button 
                        onClick={() => { setLoginType('admin'); setError(''); }}
                        className={`flex-1 flex justify-center items-center gap-2 py-3 rounded-lg font-bold transition-all ${loginType === 'admin' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        <ShieldCheck size={18} /> Admin
                    </button>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-center font-bold text-sm border border-red-100 animate-shake">
                        {error}
                    </div>
                )}

                {/* STUDENT LOGIN FORM */}
                {loginType === 'student' ? (
                    <form onSubmit={handleStudentLogin} className="space-y-5">
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input 
                                type="email" placeholder="Student Email" required
                                className="w-full p-4 pl-12 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all font-medium"
                                value={studentEmail} onChange={(e) => setStudentEmail(e.target.value)}
                            />
                        </div>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input 
                                type="password" placeholder="Password" required
                                className="w-full p-4 pl-12 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all font-medium"
                                value={studentPassword} onChange={(e) => setStudentPassword(e.target.value)}
                            />
                        </div>
                        <button disabled={loading} className="w-full p-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-black text-lg transition-all shadow-lg shadow-indigo-200 active:scale-95 flex justify-center">
                            {loading ? <Loader2 className="animate-spin" /> : "STUDENT LOGIN"}
                        </button>
                    </form>
                ) : (
                    /* ADMIN LOGIN FORM */
                    <form onSubmit={handleAdminLogin} className="space-y-5">
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input 
                                type="password" placeholder="Admin Secret Key" required
                                className="w-full p-4 pl-12 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all font-medium tracking-widest"
                                value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)}
                            />
                        </div>
                        <button disabled={loading} className="w-full p-4 bg-gray-900 hover:bg-black text-white rounded-xl font-black text-lg transition-all shadow-lg shadow-gray-300 active:scale-95 flex justify-center">
                            {loading ? <Loader2 className="animate-spin" /> : "ENTER SECURE PANEL"}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}

export default Login;