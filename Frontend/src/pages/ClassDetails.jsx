import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Download, ArrowLeft, Eye, X } from 'lucide-react';

function ClassDetails() {
  const { className, subjectName } = useParams();
  const navigate = useNavigate();
  const [homeworks, setHomeworks] = useState([]);
  const [selectedPdf, setSelectedPdf] = useState(null);

  useEffect(() => {
    const fetchHomework = async () => {
      try {
        // UPDATED: Naya Subject-wise route use kiya
        const res = await axios.get(`http://localhost:5000/api/homework/${className}/${subjectName}`);
        setHomeworks(res.data);
      } catch (err) {
        console.error("Error fetching data", err);
      }
    };
    fetchHomework();
  }, [className, subjectName]);

  return (
    <div className="p-8 max-w-5xl mx-auto relative">
      <button onClick={() => navigate('/class/' + className)} className="flex items-center gap-2 text-blue-600 mb-6 font-medium">
        <ArrowLeft size={20} /> Back to Subjects
      </button>

      <h2 className="text-3xl font-bold mb-8 text-gray-800 border-l-4 border-blue-600 pl-4 capitalize">
        {className} - {subjectName}
      </h2>

      {homeworks.length === 0 ? (
        <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200 text-yellow-700">
          Is subject ke liye abhi koi assignment nahi hai.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {homeworks.map((hw) => (
            <div key={hw._id} className="bg-white p-6 rounded-xl shadow-sm border flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex-1">
                <h3 className="font-bold text-xl text-gray-900">{hw.title}</h3>
                <p className="text-gray-600 mt-1">{hw.description}</p>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setSelectedPdf(hw.pdfUrl)} className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg font-medium"><Eye size={18}/> Preview</button>
                <a href={hw.pdfUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium"><Download size={18}/> Download</a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* PREVIEW MODAL */}
      {selectedPdf && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-5xl h-[90vh] rounded-2xl overflow-hidden relative flex flex-col">
            <div className="p-4 border-b flex justify-between items-center bg-white">
              <h3 className="font-bold">Preview</h3>
              <button onClick={() => setSelectedPdf(null)} className="p-2 text-red-500 hover:bg-red-50 rounded-full"><X size={24}/></button>
            </div>
            <div className="flex-1 bg-gray-100">
              <iframe src={`https://docs.google.com/viewer?url=${encodeURIComponent(selectedPdf)}&embedded=true`} className="w-full h-full border-none"></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default ClassDetails;