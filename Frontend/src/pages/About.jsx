import React from 'react';
import { ShieldCheck, Users, Target, BookOpen } from 'lucide-react';
import logo from '../assets/fd_logo.jpg';

function About() {
    return (
        <div className="min-h-screen bg-gray-50 py-20 px-6 animate-fade-in">
            <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                {/* Header Section */}
                <div className="bg-indigo-600 p-10 text-center relative">
                    <img src={logo} alt="Future Developer" className="h-20 w-auto mx-auto rounded-xl shadow-lg border-2 border-white/20 mb-6 relative z-10" />
                    <h1 className="text-4xl font-black text-white mb-2 relative z-10">About Future Developer</h1>
                    <p className="text-indigo-200 font-medium text-lg relative z-10">Future is Here.</p>
                    <div className="absolute inset-0 bg-black/10"></div>
                </div>

                {/* Content Section */}
                <div className="p-10 text-gray-600 leading-relaxed space-y-8 text-lg">
                    <p>
                        <strong className="text-gray-800">Future Developer</strong> in Rahargora, Jamshedpur is a renowned educational institution that has been offering high-quality coaching services. Specializing in academics from Classes 6 to 12 and competitive exam preparations, the institute has become a trusted destination for students looking to achieve academic success.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                        <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
                            <Target size={32} className="text-indigo-600 mb-4" />
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Our Mission</h3>
                            <p className="text-sm">To provide a supportive learning environment with state-of-the-art digital technology, ensuring every student gets personalized attention and maximum benefits.</p>
                        </div>
                        <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                            <BookOpen size={32} className="text-blue-600 mb-4" />
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Our Approach</h3>
                            <p className="text-sm">We don't believe in overcrowding. We maintain smaller batches to focus on conceptual clarity, regular assessments, and doubt-clearing sessions.</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 bg-gray-50 p-6 rounded-2xl border border-gray-200">
                        <ShieldCheck size={40} className="text-green-600 shrink-0" />
                        <p className="text-sm">
                            <strong className="text-gray-800 block mb-1">Safe & Secure Environment</strong>
                            We uphold high standards in both academics and behavior. Our campus is equipped with 24/7 security cameras, ensuring a safe learning space for all students.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;