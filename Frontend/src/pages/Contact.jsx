import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

function Contact() {
    return (
        <div className="min-h-screen bg-gray-50 py-20 px-6 animate-fade-in">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-black text-gray-800 mb-4">Get In Touch</h1>
                    <p className="text-gray-500 font-medium">Have questions? We'd love to hear from you.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {/* Contact Info Cards */}
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-6">
                            <div className="bg-indigo-100 p-4 rounded-full"><MapPin className="text-indigo-600" size={28} /></div>
                            <div>
                                <h3 className="font-bold text-gray-800 text-lg">Institute Location</h3>
                                <p className="text-gray-500 mt-1">Behind Little Star School, Near Kali Mandir, Barigora, Jamshedpur</p>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-6">
                            <div className="bg-green-100 p-4 rounded-full"><Phone className="text-green-600" size={28} /></div>
                            <div>
                                <h3 className="font-bold text-gray-800 text-lg">Phone / WhatsApp</h3>
                                <p className="text-gray-500 mt-1">+91 8434705490</p>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-6">
                            <div className="bg-orange-100 p-4 rounded-full"><Clock className="text-orange-600" size={28} /></div>
                            <div>
                                <h3 className="font-bold text-gray-800 text-lg">Operating Hours</h3>
                                <p className="text-gray-500 mt-1">Mon-Sat: 8:00 AM - 6:00 PM<br/>Sun: 7:00 AM - 10:00 AM</p>
                            </div>
                        </div>
                    </div>

                    {/* Simple Message Form */}
                    <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
                        <h3 className="text-2xl font-bold text-gray-800 mb-6">Send us a Message</h3>
                        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert("Thanks for contacting us! We will get back to you soon."); }}>
                            <input type="text" placeholder="Your Name" required className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" />
                            <input type="text" placeholder="Your Phone Number" required className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" />
                            <textarea placeholder="How can we help you?" required className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 h-32"></textarea>
                            <button className="w-full bg-indigo-600 text-white font-bold text-lg p-4 rounded-xl hover:bg-indigo-700 active:scale-95 transition-all shadow-lg shadow-indigo-200">
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;