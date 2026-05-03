import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, CheckCircle, Loader2, ArrowLeft, Trash2, FileText, UserPlus, BookOpen, Users, User } from 'lucide-react';
import API from '../api/axios';


function Admin() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('homework');

    // Reset states
    const [showResetModal, setShowResetModal] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [newPassword, setNewPassword] = useState('');

    // Homework States
    const [file, setFile] = useState(null);
    const [allHomework, setAllHomework] = useState([]);
    const [formData, setFormData] = useState({
        title: '', description: '', targetClass: 'Class 10', subject: 'Math'
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    // Student States
    const [allStudents, setAllStudents] = useState([]);
    const [studentData, setStudentData] = useState({
        name: '', email: '', password: '', studentClass: 'Class 10'
    });
    const [studentLoading, setStudentLoading] = useState(false);
    const [studentMessage, setStudentMessage] = useState({ type: '', text: '' });

    const handleResetPassword = async (e) => {
        e.preventDefault();
        try {
            const res = await API.put(`/admin/students/reset-password/${selectedStudent._id}`, {
                newPassword
            });

            alert(res.data.message);
            setShowResetModal(false);
            setNewPassword('');
        } catch (error) {
            console.error(error);
            alert("Password reset nahi ho paya!");
        }
    };

    // Fetch Data Functions
    const fetchAllHomework = async () => {
        try {
            const res = await API.get('/homework-all');
            setAllHomework(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchAllStudents = async () => {
        try {
            const res = await API.get('/admin/students');
            setAllStudents(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchAllHomework();
        fetchAllStudents();
    }, []);

    // Homework Handlers
    const handleHomeworkSubmit = async (e) => {
        e.preventDefault();
        if (!file) return alert("Please select a file first!");

        setLoading(true);
        setMessage('');

        const data = new FormData();
        data.append('pdfFile', file);
        data.append('title', formData.title);
        data.append('description', formData.description);
        data.append('targetClass', formData.targetClass);
        data.append('subject', formData.subject);

        try {
            await API.post('/homework/upload', data);
            setMessage("Homework uploaded successfully! 🎉");
            setFormData({ title: '', description: '', targetClass: 'Class 10', subject: 'Math' });
            setFile(null);
            fetchAllHomework();
        } catch (err) {
            setMessage("Upload failed. Check console.");
        } finally {
            setLoading(false);
        }
    };

    const handleHomeworkDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this homework?")) return;
        try {
            await API.delete(`/homework/${id}`);
            setAllHomework(allHomework.filter(hw => hw._id !== id));
        } catch (err) {
            alert("Delete failed.");
        }
    };

    // Student Handlers
    const handleStudentSubmit = async (e) => {
        e.preventDefault();
        setStudentLoading(true);
        setStudentMessage({ type: '', text: '' });

        try {
            await API.post('/admin/add-student', studentData);
            setStudentMessage({ type: 'success', text: "Student registered successfully! 🎉" });
            setStudentData({ name: '', email: '', password: '', studentClass: 'Class 10' });
            fetchAllStudents(); // Naya student add hote hi list update karo
        } catch (err) {
            setStudentMessage({
                type: 'error',
                text: err.response?.data?.message || "Failed to add student."
            });
        } finally {
            setStudentLoading(false);
        }
    };

    const handleStudentDelete = async (id) => {
        if (!window.confirm("Are you sure you want to remove this student?")) return;
        try {
            await API.delete(`/admin/students/${id}`);
            setAllStudents(allStudents.filter(student => student._id !== id));
        } catch (err) {
            alert("Failed to remove student.");
        }
    };

    return (
        <div className="p-8 max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <button onClick={() => navigate('/')} className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors font-medium group">
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Portal
                </button>
                <button onClick={() => { localStorage.removeItem('adminToken'); window.location.href = '/'; }} className="bg-red-50 text-red-600 px-4 py-2 rounded-lg font-bold hover:bg-red-600 hover:text-white transition-all">
                    Logout
                </button>
            </div>

            <div className="flex gap-4 mb-8 border-b pb-4">
                <button
                    onClick={() => setActiveTab('homework')}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${activeTab === 'homework' ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
                >
                    <BookOpen size={20} /> Manage Homework
                </button>
                <button
                    onClick={() => setActiveTab('students')}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${activeTab === 'students' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
                >
                    <Users size={20} /> Manage Students
                </button>
            </div>

            {/* HOMEWORK TAB */}
            {activeTab === 'homework' && (
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 animate-fade-in">
                    {/* Upload Form */}
                    <div className="lg:col-span-3">
                        <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-gray-800">
                                <Upload className="text-blue-600" /> Publish New Homework
                            </h2>
                            <form onSubmit={handleHomeworkSubmit} className="space-y-5">
                                <input type="text" placeholder="Assignment Title" required className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
                                <textarea placeholder="Short Description..." required className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl h-28 focus:ring-2 focus:ring-blue-500 outline-none transition-all" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
                                <div className="grid grid-cols-2 gap-4">
                                    <select className="p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" value={formData.targetClass} onChange={(e) => setFormData({ ...formData, targetClass: e.target.value })}>
                                        {["Class 6", "Class 7", "Class 8", "Class 9", "Class 10"].map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                    <select className="p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })}>
                                        {['Math', 'Science', 'Social Science', 'English', 'Hindi', 'Computer Science'].map(s => <option key={s} value={s}>{s}</option>)}
                                    </select>
                                </div>
                                <div className="relative border-2 border-dashed border-blue-200 rounded-2xl p-10 hover:border-blue-400 hover:bg-blue-50/50 transition-all group text-center bg-gray-50/30">
                                    <input type="file" accept=".pdf,.jpg,.png" required={!loading} onChange={(e) => setFile(e.target.files[0])} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                                    <div className="flex flex-col items-center gap-3">
                                        <div className="bg-blue-100 p-4 rounded-2xl group-hover:scale-110 transition-transform shadow-sm">
                                            <FileText className="text-blue-600" size={30} />
                                        </div>
                                        <div>
                                            <p className="text-gray-700 font-bold text-lg">{file ? <span className="text-green-600">{file.name}</span> : "Click to upload file"}</p>
                                            <p className="text-sm text-gray-400">PDF, JPG, PNG are supported</p>
                                        </div>
                                    </div>
                                </div>
                                <button disabled={loading} className={`w-full p-4 rounded-2xl font-black text-lg text-white transition-all shadow-lg ${loading ? 'bg-blue-400 cursor-not-allowed animate-pulse' : 'bg-blue-600 hover:bg-blue-700 active:scale-95 shadow-blue-200'}`}>
                                    {loading ? <Loader2 className="animate-spin mx-auto" /> : "PUBLISH ASSIGNMENT"}
                                </button>
                            </form>
                            {message && (
                                <div className="mt-6 p-4 bg-green-50 text-green-700 rounded-xl border border-green-100 flex items-center gap-2 animate-bounce">
                                    <CheckCircle size={20} /> {message}
                                </div>
                            )}
                        </div>
                    </div>
                    {/* Uploads List */}
                    <div className="lg:col-span-2">
                        <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 h-full max-h-[700px] flex flex-col">
                            <h2 className="text-xl font-bold mb-6 text-gray-800">Manage Uploads</h2>
                            <div className="space-y-4 overflow-y-auto pr-2 custom-scrollbar flex-1">
                                {allHomework.length === 0 ? (
                                    <p className="text-gray-400 text-center py-10">No assignments yet.</p>
                                ) : (
                                    allHomework.map((hw) => (
                                        <div key={hw._id} className="p-4 bg-gray-50 border border-gray-100 rounded-2xl flex justify-between items-center group hover:bg-white hover:shadow-md transition-all">
                                            <div className="truncate pr-4">
                                                <h4 className="font-bold text-gray-800 text-sm truncate">{hw.title}</h4>
                                                <p className="text-xs text-blue-500 font-medium">{hw.targetClass} • {hw.subject}</p>
                                            </div>
                                            <button onClick={() => handleHomeworkDelete(hw._id)} className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all">
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* STUDENTS TAB */}
            {activeTab === 'students' && (
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 animate-fade-in">
                    {/* Add Student Form */}
                    <div className="lg:col-span-3">
                        <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-gray-800">
                                <UserPlus className="text-indigo-600" /> Register New Student
                            </h2>
                            <form onSubmit={handleStudentSubmit} className="space-y-5">
                                <input type="text" placeholder="Student's Full Name" required className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all" value={studentData.name} onChange={(e) => setStudentData({ ...studentData, name: e.target.value })} />
                                <input type="email" placeholder="Student's Email Address" required className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all" value={studentData.email} onChange={(e) => setStudentData({ ...studentData, email: e.target.value })} />
                                <div className="grid grid-cols-2 gap-4">
                                    <input type="text" placeholder="Default Password" required className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all" value={studentData.password} onChange={(e) => setStudentData({ ...studentData, password: e.target.value })} />
                                    <select className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all" value={studentData.studentClass} onChange={(e) => setStudentData({ ...studentData, studentClass: e.target.value })}>
                                        {["Class 6", "Class 7", "Class 8", "Class 9", "Class 10"].map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>
                                <button disabled={studentLoading} className={`w-full p-4 rounded-2xl font-black text-lg text-white transition-all shadow-lg ${studentLoading ? 'bg-indigo-400 cursor-not-allowed animate-pulse' : 'bg-indigo-600 hover:bg-indigo-700 active:scale-95 shadow-indigo-200'}`}>
                                    {studentLoading ? <Loader2 className="animate-spin mx-auto" /> : "ADD STUDENT"}
                                </button>
                            </form>
                            {studentMessage.text && (
                                <div className={`mt-6 p-4 rounded-xl border flex items-center gap-2 animate-bounce ${studentMessage.type === 'success' ? 'bg-green-50 text-green-700 border-green-100' : 'bg-red-50 text-red-700 border-red-100'}`}>
                                    {studentMessage.type === 'success' ? <CheckCircle size={20} /> : <div className="font-bold">!</div>}
                                    {studentMessage.text}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Registered Students List */}
                    <div className="lg:col-span-2">
                        <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 h-full max-h-[700px] flex flex-col">
                            <h2 className="text-xl font-bold mb-2 text-gray-800 flex items-center gap-2">
                                <Users className="text-indigo-600" size={24} /> Registered Students
                            </h2>
                            <p className="text-sm text-gray-500 mb-6 font-medium">Total count: <span className="text-indigo-600 font-bold">{allStudents.length}</span></p>

                            <div className="space-y-4 overflow-y-auto pr-2 custom-scrollbar flex-1">
                                {allStudents.length === 0 ? (
                                    <p className="text-gray-400 text-center py-10">No students registered yet.</p>
                                ) : (
                                    allStudents.map((student) => (
                                        <div key={student._id} className="p-4 bg-indigo-50/50 border border-indigo-100 rounded-2xl flex justify-between items-center group hover:bg-white hover:shadow-md transition-all">
                                            <div className="flex items-center gap-3 overflow-hidden">
                                                <div className="bg-indigo-100 p-2 rounded-full shrink-0">
                                                    <User size={18} className="text-indigo-600" />
                                                </div>
                                                <div className="truncate">
                                                    <h4 className="font-bold text-gray-800 text-sm truncate">{student.name}</h4>
                                                    <p className="text-xs text-gray-500 truncate">{student.email}</p>
                                                    <span className="inline-block mt-1 bg-indigo-100 text-indigo-700 text-[10px] font-bold px-2 py-0.5 rounded-md">
                                                        {student.studentClass}
                                                    </span>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => {
                                                    setSelectedStudent(student);
                                                    setShowResetModal(true);
                                                }}
                                                className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded-lg text-sm font-bold ml-2 transition-all shadow-sm"
                                            >
                                                Reset Password
                                            </button>
                                            <button onClick={() => handleStudentDelete(student._id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all shrink-0">
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/* 🔑 RESET PASSWORD MODAL */}
            {showResetModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md">
                        <h2 className="text-xl font-bold text-gray-800 mb-2">Reset Password</h2>
                        <p className="text-sm text-gray-500 mb-6">Naya password set karein for: <span className="font-bold text-indigo-600">{selectedStudent?.name}</span></p>

                        <form onSubmit={handleResetPassword}>
                            <input
                                type="text"
                                placeholder="Enter New Password (e.g. 123456)"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                                className="w-full p-3 border border-gray-300 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            />

                            <div className="flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setShowResetModal(false)}
                                    className="px-4 py-2 text-gray-600 font-bold hover:bg-gray-100 rounded-lg transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-bold rounded-lg transition-all shadow-md"
                                >
                                    Save Password
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Admin;