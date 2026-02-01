import React, { useState, useEffect } from 'react';

const TeacherDatabase = () => {
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [formData, setFormData] = useState({
    nameBn: '', nameEn: '', fatherName: '', motherName: '', 
    presentAddr: '', nid: '', designation: '', department: '',
    eduSSC: '', eduHSC: '', eduGrad: '',
    firstJoinDate: '', prlDate: '', basicPay: '', 
    bankAcc: '', bankName: '', routingNumber: ''
  });

  const API_URL = "https://www-updatedunaniayurvedicdatabase-com-bd.onrender.com/api/teachers";

  const fetchTeachers = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      if (Array.isArray(data)) setTeachers(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => { fetchTeachers(); }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // ব্যাকএন্ডের রিকোয়ারমেন্ট মেটানোর জন্য অটো আইডি তৈরি (যেহেতু আপনি এটি দেখতে চান না)
    const finalData = { 
        ...formData, 
        ibasId: formData.ibasId || "SR-" + Date.now(), // অটো আইডি
        routingNumber: formData.routingNumber || "000000000" // ডিফল্ট রাউটিং
    };

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalData)
      });
      if (response.ok) {
        alert("✅ তথ্য সফলভাবে ডাটাবেজে সংরক্ষিত হয়েছে!");
        fetchTeachers();
      } else {
        const errorMsg = await response.json();
        alert("❌ সেভ হয়নি: " + (errorMsg.message || "আইবাস আইডি ডুপ্লিকেট হতে পারে।"));
      }
    } catch (error) {
      alert("❌ সার্ভার কানেকশন এরর!");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-2 md:p-6 font-sans text-gray-800">
      <div className="max-w-6xl mx-auto bg-white shadow-2xl rounded-3xl border-t-8 border-blue-900">
        
        <div className="bg-blue-900 text-white py-10 px-6 text-center rounded-t-2xl">
          <h1 className="text-2xl md:text-3xl font-bold uppercase">বাংলাদেশ বোর্ড অব ইউনানি অ্যান্ড আয়ুর্বেদিক সিস্টেম অব মেডিসিন</h1>
          <p className="text-blue-200 mt-2 font-semibold">শিক্ষক ও এমপ্লয়ী পূর্ণাঙ্গ ডিজিটাল সার্ভিস ডাটাবেস</p>
        </div>

        <div className="p-4 md:p-8">
          {/* পূর্ণাঙ্গ ইনপুট ফরম */}
          <form onSubmit={handleSubmit} className="space-y-8 bg-blue-50 p-6 md:p-10 rounded-3xl border border-blue-100 shadow-inner">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <div className="col-span-full font-bold text-blue-900 border-b border-blue-200 pb-2">১. ব্যক্তিগত ও পেশাগত তথ্য</div>
               <input type="text" name="nameBn" placeholder="শিক্ষকের নাম (বাংলা)*" onChange={handleChange} className="p-3 border rounded-xl bg-white shadow-sm" required />
               <input type="text" name="designation" placeholder="পদবী" onChange={handleChange} className="p-3 border rounded-xl bg-white" />
               <input type="text" name="department" placeholder="বিভাগ" onChange={handleChange} className="p-3 border rounded-xl bg-white" />
               <input type="text" name="fatherName" placeholder="পিতার নাম" onChange={handleChange} className="p-3 border rounded-xl bg-white" />
               <input type="text" name="motherName" placeholder="মাতার নাম" onChange={handleChange} className="p-3 border rounded-xl bg-white" />
               <input type="text" name="nid" placeholder="এনআইডি নম্বর" onChange={handleChange} className="p-3 border rounded-xl bg-white" />
               <input type="text" name="presentAddr" placeholder="ঠিকানা" onChange={handleChange} className="p-3 border rounded-xl bg-white md:col-span-3" />

               <div className="col-span-full font-bold text-blue-900 border-b border-blue-200 pb-2 mt-4">২. শিক্ষা ও বেতন তথ্য</div>
               <input type="text" name="eduSSC" placeholder="SSC তথ্য" onChange={handleChange} className="p-3 border rounded-xl bg-white" />
               <input type="text" name="eduGrad" placeholder="স্নাতক তথ্য" onChange={handleChange} className="p-3 border rounded-xl bg-white" />
               <input type="number" name="basicPay" placeholder="মূল বেতন (Basic)" onChange={handleChange} className="p-3 border rounded-xl bg-white font-bold text-blue-900" />
               
               <div className="flex flex-col"><label className="text-xs ml-2 mb-1">যোগদানের তারিখ</label><input type="date" name="firstJoinDate" onChange={handleChange} className="p-3 border rounded-xl bg-white" /></div>
               <div className="flex flex-col"><label className="text-xs ml-2 mb-1">PRL শুরুর তারিখ</label><input type="date" name="prlDate" onChange={handleChange} className="p-3 border rounded-xl bg-white" /></div>
               <input type="text" name="bankAcc" placeholder="ব্যাংক একাউন্ট নম্বর" onChange={handleChange} className="p-3 border rounded-xl bg-white" />
            </div>
            <button type="submit" className="w-full bg-blue-900 text-white font-bold py-4 rounded-2xl hover:bg-black transition-all shadow-xl text-lg uppercase tracking-widest">ডাটাবেজে তথ্য সংরক্ষণ করুন</button>
          </form>

          {/* তালিকা */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center"><span className="w-3 h-8 bg-blue-900 mr-3 rounded-full"></span> সংরক্ষিত শিক্ষক তালিকা</h2>
            <div className="overflow-x-auto rounded-2xl border shadow-lg">
              <table className="w-full text-sm text-left bg-white">
                <thead className="bg-blue-900 text-white font-bold">
                  <tr>
                    <th className="p-5">শিক্ষকের নাম ও পদবী</th>
                    <th className="p-5 text-center">অ্যাকশন</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {teachers.map((t) => (
                    <tr key={t._id} className="hover:bg-blue-50 transition border-b">
                      <td className="p-5">
                        <div className="font-bold text-blue-900 text-base uppercase">{t.nameBn || t.nameBN}</div>
                        <div className="text-xs text-gray-500 font-medium">{t.designation || "পদবী নেই"}</div>
                      </td>
                      <td className="p-5 text-center">
                        <button onClick={() => setSelectedTeacher(t)} className="bg-blue-900 text-white px-8 py-3 rounded-full text-xs font-bold shadow-md hover:bg-black transition">বিস্তারিত দেখুন</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer (আব্দুর রহিম ভাইয়ের ব্র্যান্ডিং) */}
        <footer className="bg-slate-900 text-white p-10 mt-16 border-t-4 border-blue-600 flex flex-col md:flex-row items-center gap-6">
            <img src="/images/my-pic.jpg" alt="AR" style={{ width: '70px', height: '70px' }} className="rounded-full border-2 border-blue-400 object-cover" onError={(e) => e.target.src="https://via.placeholder.com/70"} />
            <div>
               <h2 className="text-2xl font-bold">আবদুর রহিম (Abdur Rahim)</h2>
               <p className="text-blue-400 font-bold uppercase text-sm">সেকশন অফিসার (সফটওয়্যার ইঞ্জিনিয়ার) | BBUASM</p>
            </div>
        </footer>

        {/* --- সলিড হোয়াইট মডাল (সব তথ্যসহ) --- */}
        {selectedTeacher && (
           <div className="fixed inset-0 flex items-center justify-center p-4 z-[999999]">
              <div className="absolute inset-0 bg-black bg-opacity-95 backdrop-blur-md" onClick={() => setSelectedTeacher(null)}></div>
              <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border-t-8 border-blue-900 p-8 md:p-12 relative z-[1000000]">
                  <div className="flex justify-between items-start mb-8 border-b-2 border-gray-100 pb-4">
                    <div>
                        <h2 className="text-3xl font-extrabold text-blue-900 uppercase">শিক্ষক প্রোফাইল</h2>
                        <p className="text-blue-600 font-bold mt-1 tracking-widest uppercase text-xs">সার্ভিস রেকর্ড ও ব্যক্তিগত তথ্য</p>
                    </div>
                    <button onClick={() => setSelectedTeacher(null)} className="text-red-600 text-5xl font-light hover:scale-110 transition leading-none">&times;</button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-base">
                    <div className="space-y-4">
                      <h3 className="font-bold text-blue-900 border-b pb-1 uppercase text-xs">ব্যক্তিগত তথ্য</h3>
                      <p><strong>নাম (বাংলা):</strong> <span className="text-gray-800">{selectedTeacher.nameBn || selectedTeacher.nameBN}</span></p>
                      <p><strong>পিতার নাম:</strong> {selectedTeacher.fatherName || "নেই"}</p>
                      <p><strong>মাতার নাম:</strong> {selectedTeacher.motherName || "নেই"}</p>
                      <p><strong>এনআইডি:</strong> {selectedTeacher.nid || "নেই"}</p>
                      <p><strong>ঠিকানা:</strong> {selectedTeacher.presentAddr || selectedTeacher.address || "নেই"}</p>
                    </div>
                    <div className="space-y-4">
                      <h3 className="font-bold text-blue-900 border-b pb-1 uppercase text-xs">চাকুরি ও শিক্ষা</h3>
                      <p><strong>পদবী:</strong> {selectedTeacher.designation}</p>
                      <p><strong>বিভাগ:</strong> {selectedTeacher.department}</p>
                      <p className="text-green-700 font-bold text-lg"><strong>মূল বেতন:</strong> {selectedTeacher.basicPay || selectedTeacher.basicpay || 0} ৳</p>
                      <p><strong>স্নাতক ডিগ্রি:</strong> {selectedTeacher.eduGrad || "নেই"}</p>
                      <p><strong>যোগদান তারিখ:</strong> {selectedTeacher.firstJoinDate || "নেই"}</p>
                      <p><strong>PRL তারিখ:</strong> {selectedTeacher.prlDate || "নেই"}</p>
                    </div>
                  </div>

                  <button onClick={() => setSelectedTeacher(null)} className="mt-12 w-full bg-blue-900 text-white py-4 rounded-2xl font-bold shadow-2xl hover:bg-black transition-all text-lg">বন্ধ করুন</button>
              </div>
           </div>
        )}
      </div>
    </div>
  );
};

export default TeacherDatabase;