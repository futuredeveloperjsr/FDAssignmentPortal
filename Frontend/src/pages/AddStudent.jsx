import React, { useState } from 'react';
import { UserPlus, CheckCircle, Loader2 } from 'lucide-react';
import API from '../api/axios';

function AddStudent() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        studentClass: 'Class 10'
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });

        try {
            await API.post('/admin/add-student', formData);

            setMessage({ type: 'success', text: "Student added successfully!" });
            setFormData({ name: '', email: '', password: '', studentClass: 'Class 10' });

        } catch (err) {
            console.error(err);
            setMessage({
                type: 'error',
                text: err.response?.data?.message || "Failed to add student."
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 max-w-lg mx-auto mt-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-gray-800">
                <UserPlus className="text-indigo-600" /> Register Student
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
                <input
                    type="text" placeholder="Student's Full Name" required
                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />

                <input
                    type="email" placeholder="Student's Email" required
                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />

                <div className="grid grid-cols-2 gap-4">
                    <input
                        type="text" placeholder="Default Password" required
                        className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                        value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />

                    <select
                        className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                        value={formData.studentClass} onChange={(e) => setFormData({ ...formData, studentClass: e.target.value })}
                    >
                        {["Class 6", "Class 7", "Class 8", "Class 9", "Class 10"].map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                </div>

                <button
                    disabled={loading}
                    className={`w-full p-4 rounded-2xl font-black text-lg text-white transition-all shadow-lg 
                    ${loading ? 'bg-indigo-400 cursor-not-allowed animate-pulse' : 'bg-indigo-600 hover:bg-indigo-700 active:scale-95 shadow-indigo-200'}`}
                >
                    {loading ? <Loader2 className="animate-spin mx-auto" /> : "ADD STUDENT"}
                </button>
            </form>

            {/* Notification Messages */}
            {message.text && (
                <div className={`mt-6 p-4 rounded-xl border flex items-center gap-2 animate-bounce ${message.type === 'success' ? 'bg-green-50 text-green-700 border-green-100' : 'bg-red-50 text-red-700 border-red-100'}`}>
                    {message.type === 'success' && <CheckCircle size={20} />}
                    {message.text}
                </div>
            )}
        </div>
    );
}

export default AddStudent;