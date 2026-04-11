import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen } from 'lucide-react';

const classes = ["Class 6", "Class 7", "Class 8", "Class 9", "Class 10"];

function Home() {
    const navigate = useNavigate();

    return (
        <div className="p-8">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Welcome, Students!</h1>
                <p className="text-gray-500">Apni class select karein aur assignments download karein.</p>
            </div>
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Select Your Class</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {classes.map((cls) => (
                    <div
                        key={cls}
                        onClick={() => navigate(`/class/${cls}`)}
                        className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all cursor-pointer border-b-4 border-blue-500 flex flex-col items-center group"
                    >
                        <div className="bg-blue-100 p-4 rounded-full mb-4 group-hover:bg-blue-600 transition-colors">
                            <BookOpen className="text-blue-600 group-hover:text-white" size={32} />
                        </div>
                        <span className="text-xl font-semibold text-gray-700">{cls}</span>
                        <p className="text-sm text-gray-400 mt-2">View all assignments</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;