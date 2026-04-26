import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, CheckCircle, Loader2, ArrowLeft, Trash2, FileText } from 'lucide-react';
import API from '../api/axios';

function Admin() {
    const [file, setFile] = useState(null);
    const navigate = useNavigate();
    const [allHomework, setAllHomework] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        targetClass: 'Class 10',
        subject: 'Math'
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    // Saare Assignments load karne ka function
    const fetchAll = async () => {
        try {
            const res = await API.get('/homework-all');
            setAllHomework(res.data);
        } catch (err) {
            console.error("Fetch error:", err);
        }
    };

    useEffect(() => {
        fetchAll();
    }, []);

    const handleSubmit = async (e) => {
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
            fetchAll();
        } catch (err) {
            setMessage("Upload failed. Check console.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this?")) return;
        try {
            await API.delete(`/homework/${id}`);
            setAllHomework(allHomework.filter(hw => hw._id !== id));
            alert("Deleted successfully!");
        } catch (err) {
            console.error(err);
            alert("Delete failed.");
        }
    };

    return (
        <div className="p-8 max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <button
                    onClick={() => navigate('/')}
                    className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors font-medium group"
                >
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Student Portal
                </button>

                <button
                    onClick={() => { localStorage.removeItem('adminToken'); window.location.href = '/'; }}
                    className="bg-red-50 text-red-600 px-4 py-2 rounded-lg font-bold hover:bg-red-600 hover:text-white transition-all"
                >
                    Logout
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
                {/* LEFT SIDE: UPLOAD FORM */}
                <div className="lg:col-span-3">
                    <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-gray-800">
                            <Upload className="text-blue-600" /> Publish New Homework
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <input
                                type="text" placeholder="Assignment Title" required
                                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            />

                            <textarea
                                placeholder="Short Description..." required
                                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl h-28 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            />

                            <div className="grid grid-cols-2 gap-4">
                                <select
                                    className="p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.targetClass} onChange={(e) => setFormData({ ...formData, targetClass: e.target.value })}
                                >
                                    {["Class 6", "Class 7", "Class 8", "Class 9", "Class 10"].map(c => <option key={c} value={c}>{c}</option>)}
                                </select>

                                <select
                                    className="p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                >
                                    {['Math', 'Science', 'Social Science', 'English', 'Hindi', 'Computer Science'].map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                            </div>

                            {/* CUSTOM FILE UPLOAD DESIGN */}
                            <div className="relative border-2 border-dashed border-blue-200 rounded-2xl p-10 hover:border-blue-400 hover:bg-blue-50/50 transition-all group text-center bg-gray-50/30">
                                <input
                                    type="file" accept=".pdf,.jpg,.png" required={!loading}
                                    onChange={(e) => setFile(e.target.files[0])}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                />
                                <div className="flex flex-col items-center gap-3">
                                    <div className="bg-blue-100 p-4 rounded-2xl group-hover:scale-110 transition-transform shadow-sm">
                                        <FileText className="text-blue-600" size={30} />
                                    </div>
                                    <div>
                                        <p className="text-gray-700 font-bold text-lg">
                                            {file ? <span className="text-green-600">{file.name}</span> : "Click to upload file"}
                                        </p>
                                        <p className="text-sm text-gray-400">PDF, JPG, PNG are supported</p>
                                    </div>
                                </div>
                            </div>

                            <button
                                disabled={loading}
                                className={`w-full p-4 rounded-2xl font-black text-lg text-white transition-all shadow-lg 
                                ${loading ? 'bg-blue-400 cursor-not-allowed animate-pulse' : 'bg-blue-600 hover:bg-blue-700 active:scale-95 shadow-blue-200'}`}
                            >
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

                {/* RIGHT SIDE: MANAGE SECTION */}
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
                                        <button
                                            onClick={() => handleDelete(hw._id)}
                                            className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Admin;