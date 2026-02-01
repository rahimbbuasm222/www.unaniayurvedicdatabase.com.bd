import React, { useState, useEffect } from 'react';

const TeacherDatabase = () => {
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    nameBn: '', nameEn: '', fatherName: '', motherName: '', presentAddr: '', permanentAddr: '', nid: '', designation: '', department: '',
    eduSSC: '', eduHSC: '', eduGrad: '', eduPostGrad: '',
    firstJoinDate: '', currentPostDate: '', jobType: 'স্থায়ী', prlDate: '',
    initialPayScale: '', basicPay: '', incrementStep: '',
    bankAcc: '', bankName: '', branchName: '', routingNumber: '', incomeTax: '', ibasId: ''
  });

  const API_URL = "https://www-updatedunaniayurvedicdatabase-com-bd.onrender.com/api/teachers";

  const fetchTeachers = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      if (Array.isArray(data)) setTeachers(data);
    } catch (error) { console.error(error); }
  };

  useEffect(() => { fetchTeachers(); }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalData = { ...formData, ibasId: formData.ibasId || "BBUASM-" + Date.now() };
    const method = isEditing ? 'PUT' : 'POST';
    const url = isEditing ? `${API_URL}/${editId}` : API_URL;

    try {
      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalData)
      });
      if (response.ok) {
        alert(isEditing ? "✅ তথ্য সফলভাবে আপডেট হয়েছে!" : "✅ তথ্য সফলভাবে ডাটাবেজে সংরক্ষিত হয়েছে!");
        resetForm();
        fetchTeachers();
      }
    } catch (error) { alert("❌ সার্ভার কানেকশন এরর!"); }
  };

  const resetForm = () => {
    setFormData({ nameBn: '', nameEn: '', fatherName: '', motherName: '', presentAddr: '', permanentAddr: '', nid: '', designation: '', department: '', eduSSC: '', eduHSC: '', eduGrad: '', eduPostGrad: '', firstJoinDate: '', currentPostDate: '', jobType: 'স্থায়ী', prlDate: '', initialPayScale: '', basicPay: '', incrementStep: '', bankAcc: '', bankName: '', branchName: '', routingNumber: '', incomeTax: '', ibasId: '' });
    setIsEditing(false);
    setEditId(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm("আপনি কি নিশ্চিতভাবে এই তথ্যটি মুছে ফেলতে চান?")) {
      try {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        fetchTeachers();
      } catch (error) { alert("মুছতে সমস্যা হয়েছে!"); }
    }
  };

  const startEdit = (t) => {
    setFormData(t);
    setEditId(t._id);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 p-2 md:p-6 font-sans text-gray-800">
      <div className="max-w-7xl mx-auto bg-white shadow-2xl rounded-3xl border-t-8 border-blue-900 overflow-hidden relative">
        
        {/* Header Section */}
        <div className="bg-blue-900 text-white py-10 px-6 text-center">
          <h1 className="text-xl md:text-3xl font-bold uppercase tracking-wide">বাংলাদেশ বোর্ড অব ইউনানি অ্যান্ড আয়ুর্বেদিক সিস্টেম অব মেডিসিন</h1>
          <p className="text-blue-200 mt-2 font-semibold italic text-sm md:text-base underline">শিক্ষক প্রোফাইল ও পূর্ণাঙ্গ সার্ভিস ডাটাবেস ব্যবস্থাপনা</p>
        </div>

        <div className="p-4 md:p-8">
          {/* ইনপুট ফরম - পিডিএফ অনুযায়ী পূর্ণাঙ্গ ফিল্ড */}
          <form onSubmit={handleSubmit} className={`p-6 md:p-10 rounded-3xl border-2 shadow-inner transition-all ${isEditing ? 'bg-green-50 border-green-200' : 'bg-blue-50 border-blue-100'}`}>
            <h3 className="font-bold text-blue-900 border-b pb-4 mb-6 text-xl">{isEditing ? "📝 তথ্য সংশোধন করুন" : "➕ নতুন তথ্য ইনপুট ফরম (অফিশিয়াল)"}</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <div className="col-span-full text-blue-800 font-bold border-l-4 border-blue-900 pl-2">১. সাধারণ ও পেশাগত তথ্য</div>
               <input type="text" name="nameBn" value={formData.nameBn} placeholder="শিক্ষকের নাম (বাংলা)*" onChange={handleChange} className="p-3 border rounded-xl bg-white shadow-sm" required />
               <input type="text" name="nameEn" value={formData.nameEn} placeholder="নাম (ইংরেজি)" onChange={handleChange} className="p-3 border rounded-xl bg-white" />
               <input type="text" name="fatherName" value={formData.fatherName} placeholder="পিতার নাম" onChange={handleChange} className="p-3 border rounded-xl bg-white" />
               <input type="text" name="motherName" value={formData.motherName} placeholder="মাতার নাম" onChange={handleChange} className="p-3 border rounded-xl bg-white" />
               <input type="text" name="nid" value={formData.nid} placeholder="এনআইডি (NID) নম্বর" onChange={handleChange} className="p-3 border rounded-xl bg-white" />
               <input type="text" name="designation" value={formData.designation} placeholder="পদবী" onChange={handleChange} className="p-3 border rounded-xl bg-white" />
               <input type="text" name="department" value={formData.department} placeholder="বিভাগ" onChange={handleChange} className="p-3 border rounded-xl bg-white" />
               <textarea name="presentAddr" value={formData.presentAddr} placeholder="বর্তমান ঠিকানা" onChange={handleChange} className="p-3 border rounded-xl bg-white md:col-span-2 h-12" />

               <div className="col-span-full text-blue-800 font-bold border-l-4 border-blue-900 pl-2 mt-4">২. শিক্ষাগত যোগ্যতা ও চাকুরির রেকর্ড</div>
               <input type="text" name="eduSSC" value={formData.eduSSC} placeholder="SSC (জিপিএ/সাল/প্রতিষ্ঠান)" onChange={handleChange} className="p-3 border rounded-xl bg-white" />
               <input type="text" name="eduGrad" value={formData.eduGrad} placeholder="স্নাতক (ডিগ্রি/সাল/প্রতিষ্ঠান)" onChange={handleChange} className="p-3 border rounded-xl bg-white" />
               <input type="text" name="eduPostGrad" value={formData.eduPostGrad} placeholder="স্নাতকোত্তর তথ্য" onChange={handleChange} className="p-3 border rounded-xl bg-white" />
               <div className="flex flex-col"><label className="text-[10px] ml-2 font-bold text-gray-500">যোগদানের তারিখ</label><input type="date" name="firstJoinDate" value={formData.firstJoinDate} onChange={handleChange} className="p-3 border rounded-xl bg-white" /></div>
               <div className="flex flex-col"><label className="text-[10px] ml-2 font-bold text-gray-500">PRL শুরুর তারিখ</label><input type="date" name="prlDate" value={formData.prlDate} onChange={handleChange} className="p-3 border rounded-xl bg-white" /></div>
               <input type="number" name="basicPay" value={formData.basicPay} placeholder="বর্তমান মূল বেতন" onChange={handleChange} className="p-3 border rounded-xl bg-white font-bold text-blue-900" />

               <div className="col-span-full text-blue-800 font-bold border-l-4 border-blue-900 pl-2 mt-4">৩. ব্যাংক ও অন্যান্য তথ্য</div>
               <input type="text" name="bankAcc" value={formData.bankAcc} placeholder="ব্যাংক একাউন্ট নম্বর" onChange={handleChange} className="p-3 border rounded-xl bg-white" />
               <input type="text" name="bankName" value={formData.bankName} placeholder="ব্যাংকের নাম" onChange={handleChange} className="p-3 border rounded-xl bg-white" />
               <input type="text" name="routingNumber" value={formData.routingNumber} placeholder="রাউটিং নম্বর" onChange={handleChange} className="p-3 border rounded-xl bg-white" />
               <input type="text" name="incomeTax" value={formData.incomeTax} placeholder="মাসিক আয়কর কর্তন" onChange={handleChange} className="p-3 border rounded-xl bg-white" />
            </div>

            <div className="flex gap-4 mt-10">
                <button type="submit" className={`flex-grow py-4 rounded-2xl text-white font-bold shadow-xl uppercase tracking-widest transition-all duration-300 ${isEditing ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-900 hover:bg-black'}`}>
                    {isEditing ? "তথ্য আপডেট করুন" : "তথ্য ডাটাবেজে সংরক্ষণ করুন"}
                </button>
                {isEditing && <button type="button" onClick={resetForm} className="bg-gray-500 text-white px-10 rounded-2xl font-bold uppercase shadow-lg">বাতিল</button>}
            </div>
          </form>

          {/* তালিকা টেবিল */}
          <div className="mt-16 overflow-x-auto rounded-3xl border shadow-2xl bg-white">
            <h2 className="text-2xl font-bold p-6 text-gray-800 flex items-center">
               <span className="w-3 h-8 bg-blue-900 mr-3 rounded"></span> সংরক্ষিত শিক্ষক ও এমপ্লয়ী ডিজিটাল তালিকা
            </h2>
            <table className="w-full text-sm text-left">
              <thead className="bg-blue-900 text-white font-bold uppercase">
                <tr>
                  <th className="p-5">নাম ও পদবী</th>
                  <th className="p-5">বিভাগ ও বেতন</th>
                  <th className="p-5 text-center">অ্যাকশন</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {teachers.map((t) => (
                  <tr key={t._id} className="hover:bg-slate-50 transition border-b">
                    <td className="p-5">
                      <div className="font-bold text-blue-900 text-base uppercase">{t.nameBn || t.nameBN}</div>
                      <div className="text-xs text-gray-500 font-semibold">{t.designation}</div>
                    </td>
                    <td className="p-5">
                      <div className="text-gray-700">{t.department || "বিভাগ নেই"}</div>
                      <div className="text-green-700 font-bold">{t.basicPay || 0} ৳</div>
                    </td>
                    <td className="p-5 flex flex-wrap justify-center gap-3">
                      <button onClick={() => setSelectedTeacher(t)} className="bg-blue-600 text-white px-5 py-2 rounded-full text-[10px] font-bold shadow-lg hover:bg-blue-800 transition">বিস্তারিত</button>
                      <button onClick={() => startEdit(t)} className="bg-amber-500 text-white px-5 py-2 rounded-full text-[10px] font-bold shadow-lg hover:bg-amber-600 transition">এডিট</button>
                      <button onClick={() => handleDelete(t._id)} className="bg-red-500 text-white px-5 py-2 rounded-full text-[10px] font-bold shadow-lg hover:bg-red-700 transition">মুছুন</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer (আব্দুর রহিম ভাইয়ের ব্র্যান্ডিং) */}
        <footer className="bg-slate-900 text-white p-10 mt-16 border-t-4 border-blue-600 flex flex-col md:flex-row items-center gap-6">
            <div className="w-16 h-16 rounded-full border-2 border-blue-400 overflow-hidden shadow-2xl">
               <img src="/images/my-pic.jpg" alt="AR" className="w-full h-full object-cover" onError={(e) => e.target.src="https://via.placeholder.com/60"} />
            </div>
            <div>
               <h2 className="text-xl font-bold text-blue-400">আবদুর রহিম (Abdur Rahim)</h2>
               <p className="text-gray-300 text-xs font-bold uppercase tracking-wider">সেকশন অফিসার (সফটওয়্যার ইঞ্জিনিয়ার) | BBUASM</p>
               <p className="text-gray-500 text-[10px] mt-1 italic">ইউনানি ও আয়ুর্বেদিক শিক্ষা ব্যবস্থাপনা ডিজিটালাইজেশন প্রজেক্ট</p>
            </div>
        </footer>

        {/* --- সলিড হোয়াইট মডাল (পিডিএফ-এর সব তথ্যসহ) --- */}
        {selectedTeacher && (
           <div className="fixed inset-0 flex items-center justify-center p-4" style={{ zIndex: 9999999 }}>
              <div className="absolute inset-0 bg-black bg-opacity-95 backdrop-blur-md" onClick={() => setSelectedTeacher(null)}></div>
              
              <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border-t-8 border-blue-900 relative z-[10000000]">
                  <div className="bg-blue-900 p-6 flex justify-between items-center text-white sticky top-0 shadow-xl">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-8 bg-blue-400 rounded-full"></div>
                        <h2 className="text-xl font-bold uppercase tracking-wide">শিক্ষক সার্ভিস প্রোফাইল রেকর্ড</h2>
                    </div>
                    <button onClick={() => setSelectedTeacher(null)} className="text-white text-5xl leading-none hover:text-red-400 transition">&times;</button>
                  </div>
                  
                  <div className="p-8 md:p-12 space-y-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-b pb-10">
                      <div className="space-y-4">
                        <h3 className="font-bold text-blue-900 uppercase text-xs border-b-2 border-blue-100 pb-1 tracking-widest">১. ব্যক্তিগত তথ্য</h3>
                        <p className="flex justify-between border-b border-dotted border-gray-200 pb-1"><strong>নাম (বাংলা):</strong> <span className="font-bold">{selectedTeacher.nameBn || selectedTeacher.nameBN}</span></p>
                        <p className="flex justify-between border-b border-dotted border-gray-200 pb-1"><strong>নাম (ইংরেজি):</strong> <span>{selectedTeacher.nameEn || "নেই"}</span></p>
                        <p className="flex justify-between border-b border-dotted border-gray-200 pb-1"><strong>পিতার নাম:</strong> <span>{selectedTeacher.fatherName || "নেই"}</span></p>
                        <p className="flex justify-between border-b border-dotted border-gray-200 pb-1"><strong>মাতার নাম:</strong> <span>{selectedTeacher.motherName || "নেই"}</span></p>
                        <p className="flex justify-between border-b border-dotted border-gray-200 pb-1"><strong>এনআইডি নম্বর:</strong> <span className="font-mono font-bold text-blue-700">{selectedTeacher.nid || "নেই"}</span></p>
                        <p className="text-xs bg-blue-50 p-4 rounded-xl mt-3 border border-blue-100 shadow-sm"><strong>বর্তমান ও স্থায়ী ঠিকানা:</strong> <br/> {selectedTeacher.presentAddr || selectedTeacher.address || "নেই"}</p>
                      </div>
                      <div className="space-y-4">
                        <h3 className="font-bold text-blue-900 uppercase text-xs border-b-2 border-blue-100 pb-1 tracking-widest">২. পেশাগত ও বেতন তথ্য</h3>
                        <p className="flex justify-between border-b border-dotted border-gray-200 pb-1"><strong>পদবী:</strong> <span>{selectedTeacher.designation}</span></p>
                        <p className="flex justify-between border-b border-dotted border-gray-200 pb-1"><strong>বিভাগ:</strong> <span>{selectedTeacher.department || "নেই"}</span></p>
                        <p className="flex justify-between text-green-700 font-bold text-lg border-b border-dotted border-gray-200 pb-1"><strong>মূল বেতন:</strong> <span>{selectedTeacher.basicPay || 0} ৳</span></p>
                        <p className="flex justify-between border-b border-dotted border-gray-200 pb-1"><strong>ইনক্রিমেন্ট ধাপ:</strong> <span>{selectedTeacher.incrementStep || "নেই"}</span></p>
                        <p className="flex justify-between border-b border-dotted border-gray-200 pb-1"><strong>আয়কর কর্তন:</strong> <span>{selectedTeacher.incomeTax || "নেই"}</span></p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                       <div className="space-y-4">
                          <h3 className="font-bold text-blue-900 uppercase text-xs border-b-2 border-blue-100 pb-1 tracking-widest">৩. শিক্ষাগত যোগ্যতা</h3>
                          <div className="bg-gray-50 p-4 rounded-xl space-y-2 border shadow-sm">
                            <p className="text-sm"><strong>SSC/HSC যোগ্যতা:</strong> <br/> <span className="text-gray-600 italic">{selectedTeacher.eduSSC || "প্রদত্ত নয়"}</span></p>
                            <p className="text-sm"><strong>স্নাতক যোগ্যতা:</strong> <br/> <span className="text-gray-600 italic">{selectedTeacher.eduGrad || "প্রদত্ত নয়"}</span></p>
                          </div>
                       </div>
                       <div className="space-y-4">
                          <h3 className="font-bold text-blue-900 uppercase text-xs border-b-2 border-blue-100 pb-1 tracking-widest">৪. চাকুরির রেকর্ড ও ব্যাংক</h3>
                          <p className="flex justify-between border-b border-dotted border-gray-200 pb-1 text-sm"><strong>প্রথম যোগদানের তারিখ:</strong> <span className="font-bold text-gray-700">{selectedTeacher.firstJoinDate || "নেই"}</span></p>
                          <p className="flex justify-between border-b border-dotted border-gray-200 pb-1 text-sm"><strong>PRL শুরুর তারিখ:</strong> <span className="font-bold text-gray-700">{selectedTeacher.prlDate || "নেই"}</span></p>
                          <p className="flex justify-between border-b border-dotted border-gray-200 pb-1 text-sm"><strong>ব্যাংক একাউন্ট:</strong> <span className="font-bold font-mono">{selectedTeacher.bankAcc || "নেই"}</span></p>
                          <p className="flex justify-between border-b border-dotted border-gray-200 pb-1 text-sm"><strong>রাউটিং নম্বর:</strong> <span className="font-bold font-mono">{selectedTeacher.routingNumber || "নেই"}</span></p>
                       </div>
                    </div>
                  </div>

                  <div className="p-8 bg-gray-100 flex justify-center">
                    <button onClick={() => setSelectedTeacher(null)} className="bg-blue-900 text-white py-4 px-20 rounded-2xl font-bold shadow-2xl hover:bg-black transition-all uppercase tracking-widest transform hover:scale-105 active:scale-95">বন্ধ করুন</button>
                  </div>
              </div>
           </div>
        )}
      </div>
    </div>
  );
};

export default TeacherDatabase;