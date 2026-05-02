import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ShieldCheck, Star, MapPin, Phone, MonitorPlay, FileText, CheckCircle, Clock, Users, BookMarked, HelpCircle, Mail } from 'lucide-react';
import logo from '../assets/fd_logo.jpg';
import photo1 from '../assets/slide1.jpg';
import photo2 from '../assets/slide2.avif';
import photo3 from '../assets/slide3.jpg';

const slideImages = [
    photo1,
    photo2,
    photo3
];

function Home() {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slideImages.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 animate-fade-in flex flex-col">

            <div className="relative py-24 px-6 overflow-hidden flex-shrink-0 bg-gray-900">
                {slideImages.map((img, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-80' : 'opacity-0'}`}
                        style={{ backgroundImage: `url(${img})` }}
                    ></div>
                ))}

                <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 via-indigo-900/80 to-gray-900/90 z-0"></div>

                <div className="max-w-5xl mx-auto relative z-10 text-center">
                    <div>
                        <img
                            src={logo}
                            alt="Future Developer Logo"
                            className="h-24 md:h-32 w-auto rounded-2xl shadow-xl border-2 border-white/20 hover:scale-105 transition-transform text-center mx-auto mb-6"
                        />
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">Future Developer</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-indigo-100 mb-4 font-bold max-w-3xl mx-auto">
                        Classes from 1 to 12 With Best Technology
                    </p>
                    <p className="text-lg text-gray-300 mb-10 font-medium max-w-2xl mx-auto leading-relaxed">
                        A renowned educational institution in Jamshedpur offering high-quality academic and competitive exam preparations with supportive learning environments.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link
                            to="/login"
                            className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-black text-lg transition-all shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 active:scale-95"
                        >
                            <ShieldCheck size={24} /> ENTER STUDENT PORTAL
                        </Link>
                        <Link
                            to="/about"
                            className="bg-white/10 hover:bg-white/20 text-white border border-white/30 px-8 py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 backdrop-blur-sm active:scale-95"
                        >
                            <BookOpen size={20} /> About Institute
                        </Link>
                    </div>
                </div>
            </div>

            <div className="bg-indigo-600 text-white py-6 px-6 shadow-md relative z-20 flex-shrink-0">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm md:text-base font-medium">
                    <div className="flex items-center gap-2">
                        <MapPin className="text-yellow-400 shrink-0" size={20} />
                        <span>Behind Little Star School, Near Kali Mandir, Barigora</span>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <Clock className="text-yellow-400" size={20} />
                            <span>Mon-Sat: 8 AM - 6 PM | Sun: 7 AM - 10 AM</span>
                        </div>
                        <div className="flex items-center gap-2 font-bold bg-white/20 px-4 py-2 rounded-lg">
                            <Phone className="text-yellow-400" size={18} />
                            <span><a href="tel: +918434705490">8434705490</a></span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 py-20 flex-grow">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-black text-gray-800 mb-4">Why Choose Future Developer?</h2>
                    <p className="text-gray-500 font-medium">Minimum fees with maximum benefits for every student.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all group">
                        <MonitorPlay size={40} className="text-blue-600 mb-4 group-hover:scale-110 transition-transform" />
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Digital & Visual Classes</h3>
                        <p className="text-gray-500 text-sm leading-relaxed">Modern classrooms equipped with state-of-the-art technology, including computer classes to support interactive learning.</p>
                    </div>
                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all group">
                        <Users size={40} className="text-indigo-600 mb-4 group-hover:scale-110 transition-transform" />
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Expert Faculty</h3>
                        <p className="text-gray-500 text-sm leading-relaxed">Different teachers for all subjects with the best qualifications, providing a wealth of knowledge and experience.</p>
                    </div>
                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all group">
                        <FileText size={40} className="text-purple-600 mb-4 group-hover:scale-110 transition-transform" />
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Personalized Notes</h3>
                        <p className="text-gray-500 text-sm leading-relaxed">Comprehensive study material and personalized notes availed to each and every student to build exam readiness.</p>
                    </div>
                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all group">
                        <CheckCircle size={40} className="text-green-600 mb-4 group-hover:scale-110 transition-transform" />
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Regular Assessments</h3>
                        <p className="text-gray-500 text-sm leading-relaxed">Regular tests, mock tests, and doubt clearing sessions to monitor student progress and provide constructive feedback.</p>
                    </div>
                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all group">
                        <ShieldCheck size={40} className="text-red-600 mb-4 group-hover:scale-110 transition-transform" />
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Safe Environment</h3>
                        <p className="text-gray-500 text-sm leading-relaxed">High standards of health and safety with 24/7 security cameras available to ensure a secure campus for everyone.</p>
                    </div>
                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all group">
                        <BookMarked size={40} className="text-orange-600 mb-4 group-hover:scale-110 transition-transform" />
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Library & Counseling</h3>
                        <p className="text-gray-500 text-sm leading-relaxed">Access to a well-stocked library, online e-learning resources, and professional counseling for stress management.</p>
                    </div>
                </div>
            </div>

            <div className="bg-indigo-600 py-16 flex-shrink-0 relative overflow-hidden">
                <div className="max-w-6xl mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-indigo-400">
                        <div className="py-4">
                            <div className="text-5xl md:text-6xl font-black text-white mb-2 tracking-tighter">50+</div>
                            <div className="text-indigo-200 font-bold tracking-wide uppercase text-sm md:text-base">Active Students</div>
                        </div>
                        <div className="py-4">
                            <div className="text-5xl md:text-6xl font-black text-white mb-2 tracking-tighter">12</div>
                            <div className="text-indigo-200 font-bold tracking-wide uppercase text-sm md:text-base">Classes Covered</div>
                        </div>
                        <div className="py-4">
                            <div className="text-5xl md:text-6xl font-black text-white mb-2 tracking-tighter">100%</div>
                            <div className="text-indigo-200 font-bold tracking-wide uppercase text-sm md:text-base">Digital Homework</div>
                        </div>
                    </div>
                </div>
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent"></div>
            </div>

            <div className="bg-white border-b border-gray-100 py-20 px-6 flex-shrink-0">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <HelpCircle size={48} className="text-indigo-600 mx-auto mb-4" />
                        <h2 className="text-3xl font-black text-gray-800">Frequently Asked Questions</h2>
                        <p className="text-gray-500 font-medium mt-2">Everything you need to know about our institute.</p>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                            <h3 className="text-lg font-bold text-gray-800 mb-2">1. Will the tutorial school provide study material and notebooks?</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">Some tutorials provide study material and some do not. However, there have been instances wherein certain material is distributed as it was deemed essential for proper illustration. You can check with us to get more information on the same.</p>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                            <h3 className="text-lg font-bold text-gray-800 mb-2">2. How do I locate Future Developer in Rahargora?</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">These classes are so easy to find because it is just Behind Little Star School, Near Kali Mandir, Barigora.</p>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                            <h3 className="text-lg font-bold text-gray-800 mb-2">3. How many students does one class accommodate?</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">We do not believe in overcrowding classes because the children do not get individual attention then. So, we try to fit lesser numbers in each batch. Batches are divided depending on the demand for a specific course, making sure every student gets focus.</p>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                            <h3 className="text-lg font-bold text-gray-800 mb-2">4. What are the class timings?</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">Tutorial classes will be on during Monday to Saturday: 8:00 am - 6:00 pm, and Sunday: 7:00 am - 10:00 am.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-gray-100 py-16 flex-shrink-0">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-black text-gray-800 mb-6">Stay Updated With Us</h2>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link to="/notice" className="bg-white text-gray-800 border border-gray-200 px-8 py-4 rounded-xl font-bold hover:bg-gray-50 transition-all shadow-sm">
                            Check Notice Board
                        </Link>
                        <Link to="/contact" className="bg-white text-gray-800 border border-gray-200 px-8 py-4 rounded-xl font-bold hover:bg-gray-50 transition-all shadow-sm">
                            Contact Administration
                        </Link>
                    </div>
                </div>
            </div>

            <footer className="bg-gray-900 text-gray-300 pt-16 pb-8 px-6 border-t border-gray-800 flex-shrink-0">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

                    <div>
                        <h3 className="text-2xl font-black text-white mb-4">Future Developer</h3>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6">
                            Empowering students with conceptual clarity and a modern digital learning experience. Your journey to excellence starts here.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-lg font-bold text-white mb-6">Quick Links</h4>
                        <ul className="space-y-3 text-sm font-medium">
                            <li><Link to="/login" className="text-gray-400 hover:text-indigo-400 transition-colors flex items-center gap-2"><div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></div> Portal Login</Link></li>
                            <li><Link to="/about" className="text-gray-400 hover:text-indigo-400 transition-colors flex items-center gap-2"><div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></div> About Us</Link></li>
                            <li><Link to="/notice" className="text-gray-400 hover:text-indigo-400 transition-colors flex items-center gap-2"><div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></div> Notice Board</Link></li>
                            <li><a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors flex items-center gap-2"><div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></div> Privacy Policy</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-bold text-white mb-6">Contact Us</h4>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li className="flex items-start gap-3">
                                <MapPin size={20} className="text-indigo-400 shrink-0 mt-0.5" />
                                <span>Behind Little Star School, Near Kali Mandir, Barigora, Jamshedpur</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone size={20} className="text-indigo-400 shrink-0" />
                                <span><a href="tel: +918434705490">+91 8434705490</a> <a href="https://wa.me/918434705490">(WhatsApp Available)</a></span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail size={20} className="text-indigo-400 shrink-0" />
                                <span>contact@futuredeveloper.in</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="max-w-6xl mx-auto pt-8 border-t border-gray-800 text-center text-sm font-medium text-gray-500">
                    © 2026 Future Developer. All rights reserved.
                </div>
            </footer>

        </div>
    );
}

export default Home;