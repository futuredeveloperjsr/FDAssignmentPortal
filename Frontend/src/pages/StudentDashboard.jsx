import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, LogOut, FileText, Download, User, Loader2 } from 'lucide-react';
import API from '../api/axios';

function StudentDashboard() {
    const navigate = useNavigate();
    const [homework, setHomework] = useState([]);
    const [loading, setLoading] = useState(true);
    const [student, setStudent] = useState(null);

    useEffect(() => {
        // LocalStorage se student ka data aur token nikalo
        const storedStudent = localStorage.getItem('studentInfo');
        const token = localStorage.getItem('studentToken');

        if (!token || !storedStudent) {
            navigate('/'); // Agar login nahi hai toh wapas login page bhej do
            return;
        }

        const parsedStudent = JSON.parse(storedStudent);
        setStudent(parsedStudent);

        // Sirf is student ki class ka homework fetch karo
        const fetchClassHomework = async () => {
            try {
                const res = await API.get(`/student/homework/${parsedStudent.studentClass}`);
                setHomework(res.data);
            } catch (err) {
                console.error("Failed to fetch homework", err);
            } finally {
                setLoading(false);
            }
        };

        fetchClassHomework();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('studentToken');
        localStorage.removeItem('studentInfo');
        navigate('/');
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <Loader2 className="animate-spin text-indigo-600" size={48} />
            </div>
        );
    }

    return (
        <div className="p-8 max-w-6xl mx-auto min-h-screen animate-fade-in">
            {/* 🎓 HEADER SECTION */}
            <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-3xl p-8 text-white shadow-xl flex flex-col md:flex-row justify-between items-center gap-6 mb-10">
                <div className="flex items-center gap-5">
                    <div className="bg-white/20 p-4 rounded-full backdrop-blur-sm">
                        <User size={32} className="text-white" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black">Welcome, {student?.name}! 👋</h1>
                        <p className="text-indigo-100 font-medium mt-1 text-lg flex items-center gap-2">
                            <BookOpen size={18} /> {student?.studentClass} Dashboard
                        </p>
                    </div>
                </div>
                <button 
                    onClick={handleLogout}
                    className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-red-50 hover:text-red-600 transition-all shadow-lg active:scale-95"
                >
                    <LogOut size={20} /> Logout
                </button>
            </div>

            {/* 📚 ASSIGNMENTS SECTION */}
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <FileText className="text-indigo-600" /> Your Latest Assignments
            </h2>

            {homework.length === 0 ? (
                <div className="bg-white border border-gray-100 rounded-3xl p-12 text-center shadow-sm">
                    <div className="bg-indigo-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
                        <BookOpen className="text-indigo-300" size={48} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">No Homework Yet! 🎉</h3>
                    <p className="text-gray-500 font-medium">Aapki class ke liye abhi koi assignment upload nahi hua hai. Chill karo!</p>
                </div>
            ) : (
                // Homework Grid
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {homework.map((hw) => (
                        <div key={hw._id} className="bg-white border border-gray-100 rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 group flex flex-col">
                            <div className="flex justify-between items-start mb-4">
                                <span className="bg-indigo-50 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full border border-indigo-100">
                                    {hw.subject}
                                </span>
                                <span className="text-xs text-gray-400 font-medium">
                                    {new Date(hw.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-indigo-600 transition-colors">
                                {hw.title}
                            </h3>
                            <p className="text-gray-500 text-sm mb-6 flex-1 line-clamp-3">
                                {hw.description}
                            </p>
                            <a 
                                href={hw.pdfUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="w-full bg-indigo-50 text-indigo-600 border border-indigo-100 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 p-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95"
                            >
                                <Download size={18} /> Download Assignment
                            </a>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default StudentDashboard;