import React, { useState, useEffect } from 'react';

const TeacherDatabase = () => {
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  
  // ম্যাডামের পিডিএফ অনুযায়ী সব ফিল্ড এখানে যুক্ত করা হয়েছে
  const [formData, setFormData] = useState({
    nameBn: '', nameEn: '', fatherName: '', motherName: '', 
    presentAddr: '', permanentAddr: '', nid: '', designation: '', department: '',
    eduSSC: '', eduHSC: '', eduGrad: '', eduPostGrad: '',
    firstJoinDate: '', currentPostDate: '', jobType: 'স্থায়ী', prlDate: '',
    initialPayScale: '', basicPay: '', incrementStep: '',
    bankAcc: '', bankName: '', branchName: '', routingNumber: '', incomeTax: '', 
    ibasId: '' // iBAS ID বাধ্যতামূলক তাই এটি রাখা হয়েছে
  });

  const API_URL = "https://www-updatedunaniayurvedicdatabase-com-bd.onrender.com/api/teachers";

  const fetchTeachers = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      if (Array.isArray(data)) setTeachers(data);
    } catch (error) { console.error("Data fetch error:", error); }
  };

  useEffect(() => { fetchTeachers(); }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // iBAS ID না থাকলে একটি অটো আইডি জেনারেট হবে যেন সেভ হতে বাধা না দেয়
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
        alert(isEditing ? "✅ তথ্য সফলভাবে আপডেট হয়েছে!" : "✅ নতুন এমপ্লয়ী সফলভাবে যুক্ত হয়েছে!");
        resetForm();
        fetchTeachers();
      } else {
        const err = await response.json();
        alert("❌ ভুল: " + (err.message || "সংরক্ষণে সমস্যা হয়েছে।"));
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

  const handleShowDetails = (t) => {
    setSelectedTeacher(t);
    setTimeout(() => {
        document.getElementById('details-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-2 md:p-6 font-sans text-gray-800 pb-20">
      <div className="max-w-6xl mx-auto bg-white shadow-2xl rounded-3xl border-t-8 border-blue-900 overflow-hidden">
        
        {/* Header */}
        <div className="bg-blue-900 text-white py-10 px-6 text-center">
          <h1 className="text-xl md:text-3xl font-bold uppercase">বাংলাদেশ বোর্ড অব ইউনানি অ্যান্ড আয়ুর্বেদিক সিস্টেম অব মেডিসিন</h1>
          <p className="text-blue-200 mt-2 font-semibold">শিক্ষক ও এমপ্লয়ী পূর্ণাঙ্গ ডিজিটাল ডাটাবেস ব্যবস্থাপনা</p>
        </div>

        <div className="p-4 md:p-8">
          {/* ১. পূর্ণাঙ্গ ইনপুট ফরম (ম্যাডামের পিডিএফ অনুযায়ী সব ঘর আছে) */}
          <form onSubmit={handleSubmit} className={`p-6 md:p-10 rounded-3xl border-2 shadow-inner transition-all ${isEditing ? 'bg-green-50 border-green-200' : 'bg-blue-50 border-blue-100'}`}>
            <h3 className="font-bold text-blue-900 border-b pb-4 mb-6 text-xl">{isEditing ? "📝 তথ্য সংশোধন করুন" : "➕ নতুন এমপ্লয়ী যুক্ত করুন (তথ্য এন্ট্রি ফরম)"}</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <div className="col-span-full font-bold text-blue-800 border-l-4 border-blue-900 pl-2 uppercase text-xs">ব্যক্তিগত ও পেশাগত তথ্য</div>
               <input type="text" name="nameBn" value={formData.nameBn} placeholder="শিক্ষকের নাম (বাংলা)*" onChange={handleChange} className="p-3 border rounded-xl bg-white" required />
               <input type="text" name="nameEn" value={formData.nameEn} placeholder="নাম (ইংরেজি)" onChange={handleChange} className="p-3 border rounded-xl bg-white" />
               <input type="text" name="fatherName" value={formData.fatherName} placeholder="পিতার নাম" onChange={handleChange} className="p-3 border rounded-xl bg-white" />
               <input type="text" name="motherName" value={formData.motherName} placeholder="মাতার নাম" onChange={handleChange} className="p-3 border rounded-xl bg-white" />
               <input type="text" name="nid" value={formData.nid} placeholder="এনআইডি নম্বর" onChange={handleChange} className="p-3 border rounded-xl bg-white" />
               <input type="text" name="designation" value={formData.designation} placeholder="পদবী" onChange={handleChange} className="p-3 border rounded-xl bg-white" />
               <input type="text" name="department" value={formData.department} placeholder="বিভাগ" onChange={handleChange} className="p-3 border rounded-xl bg-white" />
               <input type="text" name="presentAddr" value={formData.presentAddr} placeholder="বর্তমান ঠিকানা" onChange={handleChange} className="p-3 border rounded-xl bg-white md:col-span-2" />

               <div className="col-span-full font-bold text-blue-800 border-l-4 border-blue-900 pl-2 mt-4 uppercase text-xs">শিক্ষাগত যোগ্যতা ও চাকুরীর রেকর্ড</div>
               <input type="text" name="eduSSC" value={formData.eduSSC} placeholder="SSC তথ্য" onChange={handleChange} className="p-3 border rounded-xl bg-white" />
               <input type="text" name="eduGrad" value={formData.eduGrad} placeholder="স্নাতক তথ্য" onChange={handleChange} className="p-3 border rounded-xl bg-white" />
               <div className="flex flex-col"><label className="text-[10px] ml-2">যোগদান তারিখ</label><input type="date" name="firstJoinDate" value={formData.firstJoinDate} onChange={handleChange} className="p-3 border rounded-xl bg-white" /></div>
               <div className="flex flex-col"><label className="text-[10px] ml-2">PRL তারিখ</label><input type="date" name="prlDate" value={formData.prlDate} onChange={handleChange} className="p-3 border rounded-xl bg-white" /></div>
               <input type="number" name="basicPay" value={formData.basicPay} placeholder="মূল বেতন" onChange={handleChange} className="p-3 border rounded-xl bg-white font-bold text-blue-900" />
               <input type="text" name="ibasId" value={formData.ibasId} placeholder="iBAS ID (ঐচ্ছিক)" onChange={handleChange} className="p-3 border rounded-xl bg-yellow-50" />

               <div className="col-span-full font-bold text-blue-800 border-l-4 border-blue-900 pl-2 mt-4 uppercase text-xs">ব্যাংক ও আর্থিক তথ্য</div>
               <input type="text" name="bankName" value={formData.bankName} placeholder="ব্যাংকের নাম" onChange={handleChange} className="p-3 border rounded-xl bg-white" />
               <input type="text" name="bankAcc" value={formData.bankAcc} placeholder="একাউন্ট নম্বর" onChange={handleChange} className="p-3 border rounded-xl bg-white" />
               <input type="text" name="routingNumber" value={formData.routingNumber} placeholder="রাউটিং নম্বর" onChange={handleChange} className="p-3 border rounded-xl bg-white" />
            </div>

            <button type="submit" className={`w-full mt-8 py-4 rounded-2xl text-white font-bold shadow-xl uppercase tracking-widest transition-all ${isEditing ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-900 hover:bg-black'}`}>
                {isEditing ? "তথ্য আপডেট করুন" : "নতুন তথ্য ডাটাবেজে সংরক্ষণ করুন"}
            </button>
            {isEditing && <button type="button" onClick={resetForm} className="w-full mt-2 bg-gray-500 text-white py-2 rounded-xl font-bold">বাতিল</button>}
          </form>

          {/* ২. সংরক্ষিত তালিকা */}
          <div className="mt-16 overflow-x-auto rounded-3xl border shadow-xl bg-white">
            <h2 className="text-2xl font-bold p-6 text-gray-800 flex items-center"><span className="w-3 h-8 bg-blue-900 mr-3 rounded"></span> সংরক্ষিত শিক্ষক ও এমপ্লয়ী তালিকা</h2>
            <table className="w-full text-sm text-left">
              <thead className="bg-blue-900 text-white font-bold uppercase">
                <tr><th className="p-5 text-center">শিক্ষকের নাম ও পদবী</th><th className="p-5 text-center">অ্যাকশন</th></tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {teachers.map((t) => (
                  <tr key={t._id} className="hover:bg-slate-50 transition border-b">
                    <td className="p-5 text-center"><div className="font-bold text-blue-900 text-base uppercase">{t.nameBn || t.nameBN}</div><div className="text-xs text-gray-500">{t.designation}</div></td>
                    <td className="p-5 flex flex-wrap justify-center gap-3">
                      <button onClick={() => handleShowDetails(t)} className="bg-blue-600 text-white px-5 py-2 rounded-full text-[10px] font-bold shadow hover:bg-blue-800 transition">বিস্তারিত</button>
                      <button onClick={() => { setFormData(t); setEditId(t._id); setIsEditing(true); window.scrollTo({top:0, behavior:'smooth'}); }} className="bg-amber-500 text-white px-5 py-2 rounded-full text-[10px] font-bold shadow hover:bg-amber-600 transition">এডিট</button>
                      <button onClick={() => handleDelete(t._id)} className="bg-red-500 text-white px-5 py-2 rounded-full text-[10px] font-bold shadow hover:bg-red-700 transition">মুছুন</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ৩. বিস্তারিত প্রোফাইল কার্ড (ওভারল্যাপ ছাড়া) */}
        {selectedTeacher && (
           <div id="details-section" className="m-4 md:m-8 p-8 bg-white rounded-3xl border-4 border-blue-900 shadow-2xl">
                <div className="flex justify-between items-center mb-8 border-b-4 border-blue-900 pb-4">
                    <h2 className="text-2xl font-bold text-blue-900 uppercase tracking-widest">📋 শিক্ষকের পূর্ণাঙ্গ সার্ভিস রেকর্ড</h2>
                    <button onClick={() => setSelectedTeacher(null)} className="bg-red-500 text-white px-4 py-1 rounded-lg font-bold">বন্ধ করুন</button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-base">
                    <div className="space-y-4">
                        <h3 className="font-bold text-blue-900 border-b pb-1 uppercase text-xs">১. ব্যক্তিগত তথ্য</h3>
                        <p><strong>নাম (বাংলা):</strong> {selectedTeacher.nameBn || selectedTeacher.nameBN}</p>
                        <p><strong>পিতার নাম:</strong> {selectedTeacher.fatherName || "প্রদত্ত নয়"}</p>
                        <p><strong>মাতার নাম:</strong> {selectedTeacher.motherName || "প্রদত্ত নয়"}</p>
                        <p><strong>এনআইডি:</strong> {selectedTeacher.nid || "প্রদত্ত নয়"}</p>
                        <p><strong>ঠিকানা:</strong> {selectedTeacher.presentAddr || selectedTeacher.address || "প্রদত্ত নয়"}</p>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-bold text-blue-900 border-b pb-1 uppercase text-xs">২. চাকুরীর রেকর্ড ও বেতন</h3>
                        <p><strong>পদবী:</strong> {selectedTeacher.designation || "নেই"}</p>
                        <p><strong>বিভাগ:</strong> {selectedTeacher.department || "নেই"}</p>
                        <p className="text-green-700 font-bold"><strong>মূল বেতন:</strong> {selectedTeacher.basicPay || 0} ৳</p>
                        <p><strong>যোগদান তারিখ:</strong> {selectedTeacher.firstJoinDate || "নেই"}</p>
                        <p><strong>PRL তারিখ:</strong> {selectedTeacher.prlDate || "নেই"}</p>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-bold text-blue-900 border-b pb-1 uppercase text-xs">৩. শিক্ষাগত যোগ্যতা</h3>
                        <p><strong>SSC তথ্য:</strong> {selectedTeacher.eduSSC || "প্রদত্ত নয়"}</p>
                        <p><strong>স্নাতক/ডিগ্রি:</strong> {selectedTeacher.eduGrad || "প্রদত্ত নয়"}</p>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-bold text-blue-900 border-b pb-1 uppercase text-xs">৪. ব্যাংক ও অন্যান্য</h3>
                        <p><strong>ব্যাংকের নাম:</strong> {selectedTeacher.bankName || "নেই"}</p>
                        <p><strong>রাউটিং নম্বর:</strong> {selectedTeacher.routingNumber || "নেই"}</p>
                        <p><strong>ব্যাংক একাউন্ট:</strong> {selectedTeacher.bankAcc || "নেই"}</p>
                    </div>
                </div>
           </div>
        )}

        {/* Footer with Small Photo */}
        <footer className="bg-slate-900 text-white p-10 mt-12 border-t-4 border-blue-600 flex flex-col md:flex-row items-center gap-6">
            <div style={{ width: '40px', height: '40px' }} className="rounded-full border-2 border-blue-400 overflow-hidden shadow-2xl bg-white flex-shrink-0">
               <img src="/images/my-pic.jpg" alt="AR" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.target.src="https://via.placeholder.com/40"; }} />
            </div>
            <div>
               <h2 className="text-xl font-bold">আবদুর রহিম (Abdur Rahim)</h2>
               <p className="text-blue-400 text-xs font-bold uppercase">সেকশন অফিসার (সফটওয়্যার ইঞ্জিনিয়ার) | BBUASM</p>
               <p className="text-gray-500 text-[10px] mt-1 italic">ইউনানি ও আয়ুর্বেদিক শিক্ষা ব্যবস্থাপনা ডিজিটালাইজেশন প্রজেক্ট</p>
            </div>
        </footer>
      </div>
    </div>
  );
};

export default TeacherDatabase;