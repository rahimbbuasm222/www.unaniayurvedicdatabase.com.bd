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
    } catch (error) { console.error("Fetch error:", error); }
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
        alert(isEditing ? "✅ তথ্য সফলভাবে আপডেট হয়েছে!" : "✅ তথ্য সফলভাবে সংরক্ষিত হয়েছে!");
        resetForm();
        fetchTeachers();
      }
    } catch (error) { alert("❌ সার্ভার সমস্যা!"); }
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
      } catch (error) { alert("মুছতে সমস্যা হয়েছে!"); }
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-2 md:p-6 font-sans text-gray-800">
      <div className="max-w-7xl mx-auto bg-white shadow-2xl rounded-3xl border-t-8 border-blue-900 overflow-hidden relative">
        
        {/* Header */}
        <div className="bg-blue-900 text-white py-10 px-6 text-center">
          <h1 className="text-xl md:text-3xl font-bold uppercase tracking-wide">বাংলাদেশ বোর্ড অব ইউনানি অ্যান্ড আয়ুর্বেদিক সিস্টেম অব মেডিসিন</h1>
          <p className="text-blue-200 mt-2 font-semibold">শিক্ষক প্রোফাইল ও পূর্ণাঙ্গ ডিজিটাল সার্ভিস ডাটাবেস ব্যবস্থাপনা</p>
        </div>

        <div className="p-4 md:p-8">
          {/* ইনপুট ফরম - পিডিএফ-এর সব তথ্য এখানে আছে */}
          <form onSubmit={handleSubmit} className={`p-6 md:p-10 rounded-3xl border-2 shadow-inner transition-all ${isEditing ? 'bg-green-50 border-green-200' : 'bg-blue-50 border-blue-100'}`}>
            <h3 className="font-bold text-blue-900 border-b pb-4 mb-6 text-xl">{isEditing ? "📝 তথ্য সংশোধন করুন" : "➕ নতুন তথ্য ইনপুট ফরম (অফিশিয়াল)"}</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <div className="col-span-full text-blue-800 font-bold border-l-4 border-blue-900 pl-2">১. সাধারণ ও পেশাগত তথ্য</div>
               <input type="text" name="nameBn" value={formData.nameBn} placeholder="শিক্ষকের নাম (বাংলা)*" onChange={handleChange} className="p-3 border rounded-xl bg-white" required />
               <input type="text" name="nameEn" value={formData.nameEn} placeholder="নাম (ইংরেজি)" onChange={handleChange} className="p-3 border rounded-xl bg-white" />
               <input type="text" name="fatherName" value={formData.fatherName} placeholder="পিতার নাম" onChange={handleChange} className="p-3 border rounded-xl bg-white" />
               <input type="text" name="motherName" value={formData.motherName} placeholder="মাতার নাম" onChange={handleChange} className="p-3 border rounded-xl bg-white" />
               <input type="text" name="nid" value={formData.nid} placeholder="এনআইডি নম্বর" onChange={handleChange} className="p-3 border rounded-xl bg-white" />
               <input type="text" name="designation" value={formData.designation} placeholder="পদবী" onChange={handleChange} className="p-3 border rounded-xl bg-white" />
               <input type="text" name="department" value={formData.department} placeholder="বিভাগ" onChange={handleChange} className="p-3 border rounded-xl bg-white" />
               <textarea name="presentAddr" value={formData.presentAddr} placeholder="বর্তমান ও স্থায়ী ঠিকানা" onChange={handleChange} className="p-3 border rounded-xl bg-white md:col-span-2 h-12" />

               <div className="col-span-full text-blue-900 font-bold border-l-4 border-blue-900 pl-2 mt-4">২. শিক্ষাগত যোগ্যতা ও চাকুরির রেকর্ড</div>
               <input type="text" name="eduSSC" value={formData.eduSSC} placeholder="SSC তথ্য" onChange={handleChange} className="p-3 border rounded-xl bg-white" />
               <input type="text" name="eduHSC" value={formData.eduHSC} placeholder="HSC তথ্য" onChange={handleChange} className="p-3 border rounded-xl bg-white" />
               <input type="text" name="eduGrad" value={formData.eduGrad} placeholder="স্নাতক তথ্য" onChange={handleChange} className="p-3 border rounded-xl bg-white" />
               <input type="text" name="eduPostGrad" value={formData.eduPostGrad} placeholder="স্নাতকোত্তর তথ্য" onChange={handleChange} className="p-3 border rounded-xl bg-white" />
               <div className="flex flex-col"><label className="text-[10px] ml-2">যোগদানের তারিখ</label><input type="date" name="firstJoinDate" value={formData.firstJoinDate} onChange={handleChange} className="p-3 border rounded-xl bg-white" /></div>
               <div className="flex flex-col"><label className="text-[10px] ml-2">PRL তারিখ</label><input type="date" name="prlDate" value={formData.prlDate} onChange={handleChange} className="p-3 border rounded-xl bg-white" /></div>
               <input type="number" name="basicPay" value={formData.basicPay} placeholder="মূল বেতন" onChange={handleChange} className="p-3 border rounded-xl bg-white font-bold" />
               <input type="text" name="incrementStep" value={formData.incrementStep} placeholder="ইনক্রিমেন্ট ধাপ" onChange={handleChange} className="p-3 border rounded-xl bg-white" />

               <div className="col-span-full text-blue-900 font-bold border-l-4 border-blue-900 pl-2 mt-4">৩. ব্যাংক ও অন্যান্য তথ্য</div>
               <input type="text" name="bankName" value={formData.bankName} placeholder="ব্যাংকের নাম" onChange={handleChange} className="p-3 border rounded-xl bg-white" />
               <input type="text" name="routingNumber" value={formData.routingNumber} placeholder="রাউটিং নম্বর" onChange={handleChange} className="p-3 border rounded-xl bg-white" />
               <input type="text" name="incomeTax" value={formData.incomeTax} placeholder="মাসিক আয়কর কর্তন" onChange={handleChange} className="p-3 border rounded-xl bg-white" />
            </div>

            <div className="flex gap-4 mt-8">
                <button type="submit" className={`flex-grow py-4 rounded-2xl text-white font-bold shadow-xl uppercase tracking-widest transition-all ${isEditing ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-900 hover:bg-black'}`}>{isEditing ? "তথ্য আপডেট করুন" : "তথ্য ডাটাবেজে সংরক্ষণ করুন"}</button>
                {isEditing && <button type="button" onClick={resetForm} className="bg-gray-500 text-white px-10 rounded-2xl font-bold uppercase">বাতিল</button>}
            </div>
          </form>

          {/* তালিকা টেবিল */}
          <div className="mt-16 overflow-x-auto rounded-3xl border shadow-xl bg-white">
            <h2 className="text-2xl font-bold p-6 text-gray-800 flex items-center"><span className="w-3 h-8 bg-blue-900 mr-3 rounded"></span> সংরক্ষিত শিক্ষক ও এমপ্লয়ী তালিকা</h2>
            <table className="w-full text-sm text-left">
              <thead className="bg-blue-900 text-white font-bold uppercase">
                <tr><th className="p-5">নাম ও পদবী</th><th className="p-5">বিভাগ ও বেতন</th><th className="p-5 text-center">অ্যাকশন</th></tr>
              </thead>
              <tbody className="divide-y">
                {teachers.map((t) => (
                  <tr key={t._id} className="hover:bg-slate-50 transition border-b">
                    <td className="p-5"><div className="font-bold text-blue-900 text-base uppercase">{t.nameBn || t.nameBN}</div><div className="text-xs">{t.designation}</div></td>
                    <td className="p-5"><div className="text-gray-700">{t.department}</div><div className="text-green-700 font-bold">{t.basicPay || 0} ৳</div></td>
                    <td className="p-5 flex flex-wrap justify-center gap-2">
                      <button onClick={() => { console.log("Click details:", t); setSelectedTeacher(t); }} className="bg-blue-600 text-white px-5 py-2 rounded-full text-[11px] font-bold shadow transition hover:bg-blue-800">বিস্তারিত দেখুন</button>
                      <button onClick={() => { setFormData(t); setEditId(t._id); setIsEditing(true); window.scrollTo({top:0, behavior:'smooth'}); }} className="bg-amber-500 text-white px-5 py-2 rounded-full text-[11px] font-bold shadow transition hover:bg-amber-600">এডিট</button>
                      <button onClick={() => handleDelete(t._id)} className="bg-red-500 text-white px-5 py-2 rounded-full text-[11px] font-bold shadow transition hover:bg-red-700">মুছুন</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <footer className="bg-slate-900 text-white p-8 border-t-4 border-blue-600 mt-12 rounded-2xl flex flex-col md:flex-row items-center gap-6">
              <img src="/images/my-pic.jpg" alt="AR" style={{ width: '40px', height: '40px' }} className="rounded-full border-2 border-blue-400" onError={(e) => e.target.src="https://via.placeholder.com/40"} />
              <div>
                 <h2 className="text-xl font-bold text-blue-400">আবদুর রহিম (Abdur Rahim)</h2>
                 <p className="text-gray-300 text-xs font-bold">সেকশন অফিসার (সফটওয়্যার ইঞ্জিনিয়ার) | BBUASM</p>
              </div>
          </footer>
        </div>
      </div>

      {/* --- সলিড হোয়াইট সুপার মডাল (FIXED Z-INDEX) --- */}
      {selectedTeacher && (
        <div className="fixed inset-0 flex items-center justify-center p-4" style={{ zIndex: 100000000 }}>
          <div className="absolute inset-0 bg-black bg-opacity-95" onClick={() => setSelectedTeacher(null)}></div>
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border-t-8 border-blue-900 relative z-[100000001]">
            <div className="bg-blue-900 p-6 flex justify-between items-center text-white sticky top-0 shadow-lg">
              <h2 className="text-xl font-bold uppercase tracking-widest">শিক্ষক সার্ভিস প্রোফাইল রেকর্ড</h2>
              <button onClick={() => setSelectedTeacher(null)} className="text-white text-4xl leading-none hover:text-red-400">&times;</button>
            </div>
            
            <div className="p-8 md:p-12 space-y-10 bg-white text-gray-800">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 border-b pb-8">
                <div className="space-y-4">
                  <h3 className="font-bold text-blue-900 uppercase text-xs border-b pb-1 tracking-widest">১. ব্যক্তিগত তথ্য</h3>
                  <p className="flex justify-between border-b py-1"><strong>নাম (বাংলা):</strong> <span>{selectedTeacher.nameBn || selectedTeacher.nameBN}</span></p>
                  <p className="flex justify-between border-b py-1"><strong>পিতার নাম:</strong> <span>{selectedTeacher.fatherName || "নেই"}</span></p>
                  <p className="flex justify-between border-b py-1"><strong>মাতার নাম:</strong> <span>{selectedTeacher.motherName || "নেই"}</span></p>
                  <p className="flex justify-between border-b py-1"><strong>এনআইডি:</strong> <span>{selectedTeacher.nid || "নেই"}</span></p>
                </div>
                <div className="space-y-4">
                  <h3 className="font-bold text-blue-900 uppercase text-xs border-b pb-1 tracking-widest">২. পেশাগত তথ্য</h3>
                  <p className="flex justify-between border-b py-1"><strong>পদবী:</strong> <span>{selectedTeacher.designation}</span></p>
                  <p className="flex justify-between border-b py-1"><strong>বিভাগ:</strong> <span>{selectedTeacher.department || "নেই"}</span></p>
                  <p className="flex justify-between text-green-700 font-bold py-1"><strong>মূল বেতন:</strong> <span>{selectedTeacher.basicPay || 0} ৳</span></p>
                  <p className="flex justify-between border-b py-1"><strong>যোগদান তারিখ:</strong> <span>{selectedTeacher.firstJoinDate || "নেই"}</span></p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 border-b pb-8">
                 <div className="space-y-4">
                    <h3 className="font-bold text-blue-900 uppercase text-xs border-b pb-1">৩. শিক্ষা ও ঠিকানা</h3>
                    <p><strong>SSC তথ্য:</strong> {selectedTeacher.eduSSC || "প্রদত্ত নয়"}</p>
                    <p><strong>HSC তথ্য:</strong> {selectedTeacher.eduHSC || "প্রদত্ত নয়"}</p>
                    <p><strong>স্নাতক তথ্য:</strong> {selectedTeacher.eduGrad || "প্রদত্ত নয়"}</p>
                    <p><strong>ঠিকানা:</strong> {selectedTeacher.presentAddr || "প্রদত্ত নয়"}</p>
                 </div>
                 <div className="space-y-4">
                    <h3 className="font-bold text-blue-900 uppercase text-xs border-b pb-1">৪. ব্যাংক ও অন্যান্য</h3>
                    <p><strong>ব্যাংক নাম:</strong> {selectedTeacher.bankName || "নেই"}</p>
                    <p><strong>রাউটিং নম্বর:</strong> {selectedTeacher.routingNumber || "নেই"}</p>
                    <p><strong>আয়কর কর্তন:</strong> {selectedTeacher.incomeTax || "নেই"}</p>
                    <p><strong>PRL তারিখ:</strong> {selectedTeacher.prlDate || "নেই"}</p>
                 </div>
              </div>
            </div>

            <div className="p-8 bg-gray-50 flex justify-center sticky bottom-0">
              <button onClick={() => setSelectedTeacher(null)} className="bg-blue-900 text-white py-4 px-20 rounded-2xl font-bold shadow-lg hover:bg-black transition-all uppercase tracking-widest">বন্ধ করুন</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherDatabase;