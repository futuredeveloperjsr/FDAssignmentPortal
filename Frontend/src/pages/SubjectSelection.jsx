import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Book, ArrowLeft } from 'lucide-react';

const subjects = ['Math', 'Science', 'Social Science', 'English', 'Hindi', 'Computer Science'];

function SubjectSelection() {
  const { className } = useParams();
  const navigate = useNavigate();

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <button onClick={() => navigate('/')} className="flex items-center gap-2 text-blue-600 mb-6 font-medium">
        <ArrowLeft size={20} /> Back to Classes
      </button>

      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Subjects for {className}</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {subjects.map((sub) => (
          <div 
            key={sub}
            onClick={() => navigate(`/class/${className}/${sub}`)}
            className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all cursor-pointer border-t-4 border-blue-500 flex flex-col items-center group"
          >
            <div className="bg-blue-50 p-4 rounded-xl mb-4 group-hover:bg-blue-500 transition-colors">
              <Book className="text-blue-600 group-hover:text-white" size={32} />
            </div>
            <span className="text-xl font-bold text-gray-700">{sub}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SubjectSelection;