import React, { useState, useEffect } from 'react';

const TeacherDatabase = () => {
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [formData, setFormData] = useState({
    nameBn: '', nameEn: '', fatherName: '', motherName: '', 
    presentAddr: '', permanentAddr: '', nid: '', designation: '', department: '',
    eduSSC: '', eduHSC: '', eduGrad: '', eduPostGrad: '',
    firstJoinDate: '', currentPostDate: '', jobType: 'স্থায়ী', prlDate: '',
    initialPayScale: '', basicPay: '', incrementStep: '',
    bankAcc: '', bankName: '', branchName: '', routingNumber: '', incomeTax: '',
    ibasId: ''
  });

  // রেন্ডার ব্যাকএন্ড লিঙ্ক
  const API_URL = "https://www-updatedunaniayurvedicdatabase-com-bd.onrender.com/api/teachers";

  const fetchTeachers = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setTeachers(data);
    } catch (error) {
      console.error("ডেটা আনতে সমস্যা হয়েছে:", error);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        alert("শিক্ষক প্রোফাইল সরাসরি ক্লাউড ডাটাবেজে সংরক্ষিত হয়েছে!");
        fetchTeachers();
      } else {
        alert("সংরক্ষণে সমস্যা হয়েছে। আইবাস আইডি ইউনিক হতে হবে।");
      }
    } catch (error) {
      alert("সার্ভার কানেকশন এরর!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-2 md:p-6 font-sans text-gray-800">
      <div className="max-w-6xl mx-auto bg-white shadow-2xl rounded-xl border-t-8 border-blue-900 overflow-hidden">
        
        {/* Header Section */}
        <div className="bg-blue-900 text-white py-8 px-6 text-center">
          <h1 className="text-2xl md:text-3xl font-bold mb-2 uppercase tracking-wide">
            বাংলাদেশ বোর্ড অব ইউনানি অ্যান্ড আয়ুর্বেদিক সিস্টেম অব মেডিসিন 
          </h1>
          <h2 className="text-xl md:text-2xl font-semibold text-blue-200">এমপ্লয়ী / কলেজের শিক্ষক প্রোফাইল ডাটাবেস</h2>
          <p className="text-blue-100 italic mt-2 opacity-80 underline">বোর্ড অনুমোদিত ডিজিটাল ডাটাবেস ফরম্যাট</p>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* ১. সাধারণ ও পেশাগত তথ্য */}
            <section className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold text-blue-900 border-b-2 border-blue-100 mb-6 pb-1 flex items-center">
                <span className="w-2 h-2 bg-blue-900 rounded-full mr-2"></span> ১. সাধারণ ও পেশাগত তথ্য
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500">শিক্ষকের নাম (বাংলা)</label>
                  <input type="text" name="nameBn" onChange={handleChange} className="w-full border-b-2 border-gray-200 p-2 focus:border-blue-900 outline-none transition" required />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500">শিক্ষকের নাম (ইংরেজি)</label>
                  <input type="text" name="nameEn" onChange={handleChange} className="w-full border-b-2 border-gray-200 p-2 focus:border-blue-900 outline-none transition" />
                </div>
                <input type="text" name="fatherName" placeholder="পিতার নাম" onChange={handleChange} className="border p-2 rounded focus:ring-1 focus:ring-blue-900 outline-none" />
                <input type="text" name="motherName" placeholder="মাতার নাম" onChange={handleChange} className="border p-2 rounded focus:ring-1 focus:ring-blue-900 outline-none" />
                <textarea name="presentAddr" placeholder="বর্তমান ঠিকানা" onChange={handleChange} className="border p-2 rounded md:col-span-2 h-20 focus:ring-1 focus:ring-blue-900 outline-none" />
                <textarea name="permanentAddr" placeholder="স্থায়ী ঠিকানা" onChange={handleChange} className="border p-2 rounded md:col-span-2 h-20 focus:ring-1 focus:ring-blue-900 outline-none" />
                <input type="text" name="nid" placeholder="এনআইডি (NID) নম্বর" onChange={handleChange} className="border p-2 rounded" />
                <input type="text" name="designation" placeholder="পদবী" onChange={handleChange} className="border p-2 rounded" />
                <input type="text" name="department" placeholder="বিভাগ" onChange={handleChange} className="border p-2 rounded" />
              </div>
            </section>

            {/* ২. শিক্ষাগত যোগ্যতা */}
            <section className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold text-blue-900 border-b-2 border-blue-100 mb-6 pb-1 flex items-center">
                <span className="w-2 h-2 bg-blue-900 rounded-full mr-2"></span> ২. শিক্ষাগত যোগ্যতা
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" name="eduSSC" placeholder="এসএসপি (জিপিএ/সাল/প্রতিষ্ঠান)" onChange={handleChange} className="border p-2 rounded" />
                <input type="text" name="eduHSC" placeholder="এইচএসসি (জিপিএ/সাল/প্রতিষ্ঠান)" onChange={handleChange} className="border p-2 rounded" />
                <input type="text" name="eduGrad" placeholder="স্নাতক (ডিগ্রি/সাল/প্রতিষ্ঠান)" onChange={handleChange} className="border p-2 rounded" />
                <input type="text" name="eduPostGrad" placeholder="স্নাতকোত্তর (ডিগ্রি/সাল/প্রতিষ্ঠান)" onChange={handleChange} className="border p-2 rounded" />
              </div>
            </section>

            {/* ৩. চাকুরির রেকর্ড ও বেতন */}
            <section className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold text-blue-900 border-b-2 border-blue-100 mb-6 pb-1 flex items-center">
                <span className="w-2 h-2 bg-blue-900 rounded-full mr-2"></span> ৩. চাকুরির রেকর্ড ও বেতন
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input type="text" name="ibasId" placeholder="iBAS ID (১১ ডিজিট)" onChange={handleChange} className="border p-2 rounded bg-yellow-50 font-bold" required />
                <div className="flex flex-col"><label className="text-xs font-bold text-gray-400">প্রথম যোগদানের তারিখ</label><input type="date" name="firstJoinDate" onChange={handleChange} className="border p-2 rounded text-gray-600" /></div>
                <div className="flex flex-col"><label className="text-xs font-bold text-gray-400">PRL শুরুর তারিখ</label><input type="date" name="prlDate" onChange={handleChange} className="border p-2 rounded text-gray-600" /></div>
                <select name="jobType" onChange={handleChange} className="border p-2 rounded mt-4 bg-white">
                  <option value="স্থায়ী">স্থায়ী</option>
                  <option value="অস্থায়ী">অস্থায়ী</option>
                  <option value="চুক্তিভিত্তিক">চুক্তিভিত্তিক</option>
                </select>
                <input type="text" name="initialPayScale" placeholder="শুরুকালীন বেতন স্কেল" onChange={handleChange} className="border p-2 rounded mt-4" />
                <input type="number" name="basicPay" placeholder="বর্তমান মূল বেতন (Basic)" onChange={handleChange} className="border p-2 rounded mt-4 font-bold text-blue-900" />
              </div>
            </section>

            {/* ৪. ব্যাংক তথ্য */}
            <section className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold text-blue-900 border-b-2 border-blue-100 mb-6 pb-1 flex items-center">
                <span className="w-2 h-2 bg-blue-900 rounded-full mr-2"></span> ৪. ব্যাংক ও ইএফটি (EFT) তথ্য
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" name="bankAcc" placeholder="ব্যাংক একাউন্ট নম্বর" onChange={handleChange} className="border p-2 rounded" />
                <input type="text" name="bankName" placeholder="ব্যাংকের নাম" onChange={handleChange} className="border p-2 rounded" />
                <input type="text" name="branchName" placeholder="শাখা" onChange={handleChange} className="border p-2 rounded" />
                <input type="text" name="routingNumber" placeholder="রাউটিং নম্বর (৯ ডিজিট)" onChange={handleChange} className="border p-2 rounded bg-yellow-50" />
              </div>
            </section>

            <button type="submit" className="w-full bg-blue-900 text-white font-bold py-4 rounded-lg hover:bg-black transition-all duration-300 shadow-xl transform hover:-translate-y-1 uppercase tracking-widest">
              সরাসরি ডাটাবেজে তথ্য সংরক্ষণ করুন
            </button>
          </form>

          {/* সংরক্ষিত শিক্ষকদের তালিকা */}
          <div className="mt-20">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="bg-blue-900 w-2 h-8 mr-3 rounded-full"></span>
              সংরক্ষিত শিক্ষকদের ডিজিটাল তালিকা
            </h2>
            <div className="overflow-x-auto rounded-xl border-2 border-gray-100 shadow-sm">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 text-gray-700 uppercase font-bold">
                  <tr>
                    <th className="p-4 border-b">নাম ও পদবী</th>
                    <th className="p-4 border-b">এনআইডি ও ব্যাংক</th>
                    <th className="p-4 border-b text-center">অ্যাকশন</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {teachers.map((t) => (
                    <tr key={t._id} className="hover:bg-blue-50 transition">
                      <td className="p-4">
                        <div className="font-bold text-blue-900 uppercase">{t.nameBn}</div>
                        <div className="text-[10px] text-gray-500 font-semibold">{t.designation}</div>
                      </td>
                      <td className="p-4">
                        <div className="text-[11px] font-mono text-gray-600">NID: {t.nid}</div>
                        <div className="text-[11px] font-mono text-blue-700">ACC: {t.bankAcc}</div>
                      </td>
                      <td className="p-4 text-center">
                        <button onClick={() => setSelectedTeacher(t)} className="bg-blue-900 text-white px-4 py-1.5 rounded-full text-[10px] font-bold hover:bg-black transition shadow-md">DETAILS</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* --- PROFESSIONAL FOOTER WITH SMALLER PHOTO --- */}
        <footer className="bg-gray-900 text-white p-8 md:p-12 mt-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-900 opacity-10 rounded-full -mr-32 -mt-32"></div>
          
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8 relative z-10">
            {/* Your Picture Section (Resized to Small) */}
            <div className="flex-shrink-0">
               <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-blue-500 p-0.5 shadow-xl overflow-hidden bg-gray-800">
                  <img 
                    src="/images/my-pic.jpg" 
                    alt="Abdur Rahim" 
                    className="w-full h-full rounded-full object-cover"
                    onError={(e) => { e.target.src = "https://via.placeholder.com/150?text=AR"; }}
                  />
               </div>
            </div>

            <div className="text-center md:text-left flex-grow">
              <h3 className="text-xs uppercase tracking-widest text-blue-400 font-bold mb-1">Developed By</h3>
              <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-1">আবদুর রহিম (Abdur Rahim)</h2>
              <p className="text-xl text-gray-300 font-medium mb-2">সেকশন অফিসার (সফটওয়্যার ইঞ্জিনিয়ার)</p>
              <p className="text-sm text-blue-200 italic mb-4">বাংলাদেশ বোর্ড অব ইউনানি অ্যান্ড আয়ুর্বেদিক সিস্টেমস অব মেডিসিন</p>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm">
                <div className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-lg border border-gray-700">
                  <span className="text-blue-400">📞</span>
                  <span className="font-mono">০১৭৮১৮০০৪৯৪</span>
                </div>
                <div className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-lg border border-gray-700">
                  <span className="text-blue-400">✉️</span>
                  <span className="font-mono text-gray-200 uppercase">rahimbbuasm222@gmail.com</span>
                </div>
              </div>
            </div>

            <div className="text-center md:text-right bg-blue-900 bg-opacity-20 p-6 rounded-2xl border border-blue-800 max-w-xs">
               <h4 className="text-blue-400 font-bold uppercase text-xs mb-3 tracking-widest">Digital Vision</h4>
               <p className="text-sm text-gray-300 leading-relaxed italic">
                 "আমি বিশ্বাস করি ইউনানি ও আয়ুর্বেদিক শিক্ষা ব্যবস্থাকে অটোমেশনের মাধ্যমে স্মার্ট বাংলাদেশের সাথে যুক্ত করা সম্ভব। আমার এই ডিজিটাল ডাটাবেজ সলিউশন ইএফটি (EFT) এবং আইবাস (iBAS++) ব্যবস্থাপনাকে করবে নির্ভুল।"
               </p>
            </div>
          </div>

          <div className="text-center mt-12 pt-6 border-t border-gray-800 text-gray-600 text-[10px] tracking-widest uppercase font-bold">
            &copy; 2026 ABDUR RAHIM | SOFTWARE ENGINEER | BBUASM
          </div>
        </footer>

        {/* Detailed Modal Section */}
        {selectedTeacher && (
           <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-90 p-4 backdrop-blur-md">
            <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border-t-8 border-blue-900">
              <div className="p-8">
                <div className="flex justify-between items-center mb-8 border-b pb-4">
                  <h2 className="text-2xl font-bold text-blue-900">শিক্ষক প্রোফাইল - বিস্তারিত রেকর্ড</h2>
                  <button onClick={() => setSelectedTeacher(null)} className="text-gray-400 hover:text-red-600 text-4xl">&times;</button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
                  <div className="space-y-3">
                    <p className="flex justify-between border-b pb-1"><span>নাম (বাংলা):</span> <span className="font-bold">{selectedTeacher.nameBn}</span></p>
                    <p className="flex justify-between border-b pb-1"><span>পিতার নাম:</span> <span className="font-bold">{selectedTeacher.fatherName}</span></p>
                    <p className="flex justify-between border-b pb-1"><span>এনআইডি:</span> <span className="font-bold text-blue-700">{selectedTeacher.nid}</span></p>
                    <p className="flex flex-col border-b pb-1"><span>বর্তমান ঠিকানা:</span> <span className="font-bold">{selectedTeacher.presentAddr}</span></p>
                  </div>
                  <div className="space-y-3">
                    <p className="flex justify-between border-b pb-1"><span>পদবী:</span> <span className="font-bold">{selectedTeacher.designation}</span></p>
                    <p className="flex justify-between border-b pb-1"><span>বেতন:</span> <span className="font-bold text-green-700">{selectedTeacher.basicPay} ৳</span></p>
                    <p className="flex justify-between border-b pb-1"><span>আইবাস আইডি:</span> <span className="font-bold font-mono">{selectedTeacher.ibasId}</span></p>
                    <p className="flex justify-between border-b pb-1"><span>ব্যাংক একাউন্ট:</span> <span className="font-bold">{selectedTeacher.bankAcc}</span></p>
                  </div>
                </div>
                <button onClick={() => setSelectedTeacher(null)} className="mt-12 w-full bg-blue-900 text-white py-4 rounded-2xl font-bold shadow-xl hover:bg-black transition">বন্ধ করুন</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default TeacherDatabase;