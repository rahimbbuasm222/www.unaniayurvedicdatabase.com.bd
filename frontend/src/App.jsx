import React, { useState, useEffect } from 'react';

const TeacherDatabase = () => {
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    nameBn: '', nameEn: '', fatherName: '', motherName: '', presentAddr: '', permanentAddr: '', nid: '', designation: '', department: '',
    eduSSC: '', eduGrad: '', firstJoinDate: '', prlDate: '', basicPay: '', bankAcc: '', ibasId: '', routingNumber: '', incomeTax: ''
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
        alert(isEditing ? "✅ তথ্য সফলভাবে আপডেট হয়েছে!" : "✅ তথ্য সফলভাবে সংরক্ষিত হয়েছে!");
        resetForm();
        fetchTeachers();
      }
    } catch (error) { alert("❌ সমস্যা হয়েছে!"); }
  };

  const resetForm = () => {
    setFormData({ nameBn: '', nameEn: '', fatherName: '', motherName: '', presentAddr: '', permanentAddr: '', nid: '', designation: '', department: '', eduSSC: '', eduGrad: '', firstJoinDate: '', prlDate: '', basicPay: '', bankAcc: '', ibasId: '', routingNumber: '', incomeTax: '' });
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
    <div className="min-h-screen bg-slate-100 p-2 md:p-6 font-sans text-gray-800">
      <div className="max-w-7xl mx-auto bg-white shadow-2xl rounded-3xl border-t-8 border-blue-900 overflow-hidden relative">
        
        {/* Header */}
        <div className="bg-blue-900 text-white py-10 px-6 text-center">
          <h1 className="text-xl md:text-3xl font-bold uppercase">বাংলাদেশ বোর্ড অব ইউনানি অ্যান্ড আয়ুর্বেদিক সিস্টেম অব মেডিসিন</h1>
          <p className="text-blue-200 mt-2 font-semibold">শিক্ষক প্রোফাইল ও পূর্ণাঙ্গ সার্ভিস ডাটাবেস ব্যবস্থাপনা</p>
        </div>

        <div className="p-4 md:p-8">
          {/* ইনপুট ফরম */}
          <form onSubmit={handleSubmit} className={`p-6 md:p-10 rounded-3xl border-2 shadow-inner transition-all ${isEditing ? 'bg-green-50 border-green-200' : 'bg-blue-50 border-blue-100'}`}>
            <h3 className="font-bold text-blue-900 border-b pb-4 mb-6 text-xl">{isEditing ? "📝 তথ্য সংশোধন করুন" : "➕ নতুন শিক্ষক তথ্য ইনপুট ফরম"}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <input type="text" name="nameBn" value={formData.nameBn} placeholder="নাম (বাংলা)*" onChange={handleChange} className="p-3 border rounded-xl bg-white" required />
               <input type="text" name="designation" value={formData.designation} placeholder="পদবী" onChange={handleChange} className="p-3 border rounded-xl bg-white" />
               <input type="text" name="department" value={formData.department} placeholder="বিভাগ" onChange={handleChange} className="p-3 border rounded-xl bg-white" />
               <input type="number" name="basicPay" value={formData.basicPay} placeholder="মূল বেতন" onChange={handleChange} className="p-3 border rounded-xl bg-white" />
               <input type="text" name="nid" value={formData.nid} placeholder="এনআইডি" onChange={handleChange} className="p-3 border rounded-xl bg-white" />
               <div className="flex flex-col"><label className="text-[10px] ml-2">যোগদানের তারিখ</label><input type="date" name="firstJoinDate" value={formData.firstJoinDate} onChange={handleChange} className="p-3 border rounded-xl bg-white" /></div>
            </div>
            <div className="flex gap-4 mt-8">
                <button type="submit" className={`flex-grow py-4 rounded-2xl text-white font-bold shadow-xl uppercase tracking-widest transition-all ${isEditing ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-900 hover:bg-black'}`}>
                    {isEditing ? "তথ্য আপডেট করুন" : "তথ্য ডাটাবেজে সংরক্ষণ করুন"}
                </button>
                {isEditing && <button type="button" onClick={resetForm} className="bg-gray-500 text-white px-10 rounded-2xl font-bold uppercase">বাতিল</button>}
            </div>
          </form>

          {/* তালিকা টেবিল */}
          <div className="mt-16 overflow-x-auto rounded-3xl border shadow-xl bg-white">
            <h2 className="text-2xl font-bold p-6 text-gray-800 flex items-center">
               <span className="w-3 h-8 bg-blue-900 mr-3 rounded"></span> সংরক্ষিত শিক্ষক ও এমপ্লয়ী তালিকা
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
                      <div className="font-bold text-blue-900 text-base">{t.nameBn || t.nameBN}</div>
                      <div className="text-xs text-gray-500 font-semibold">{t.designation}</div>
                    </td>
                    <td className="p-5">
                      <div className="text-gray-700">{t.department}</div>
                      <div className="text-green-700 font-bold">{t.basicPay || 0} ৳</div>
                    </td>
                    <td className="p-5 flex flex-wrap justify-center gap-3">
                      <button onClick={() => setSelectedTeacher(t)} className="bg-blue-600 text-white px-4 py-2 rounded-full text-[10px] font-bold shadow hover:bg-blue-800 transition">বিস্তারিত</button>
                      <button onClick={() => startEdit(t)} className="bg-amber-500 text-white px-4 py-2 rounded-full text-[10px] font-bold shadow hover:bg-amber-600 transition">এডিট</button>
                      <button onClick={() => handleDelete(t._id)} className="bg-red-500 text-white px-4 py-2 rounded-full text-[10px] font-bold shadow hover:bg-red-700 transition">মুছুন</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-slate-900 text-white p-10 mt-12 border-t-4 border-blue-600 flex flex-col md:flex-row items-center gap-6">
            <img src="/images/my-pic.jpg" alt="AR" style={{ width: '50px', height: '50px' }} className="rounded-full border-2 border-blue-400" onError={(e) => e.target.src="https://via.placeholder.com/50"} />
            <div>
               <h2 className="text-xl font-bold">আবদুর রহিম (Abdur Rahim)</h2>
               <p className="text-blue-400 text-sm font-bold uppercase">সেকশন অফিসার (সফটওয়্যার ইঞ্জিনিয়ার) | BBUASM</p>
            </div>
        </footer>

        {/* --- বিস্তারিত মডাল (FIXED Z-INDEX & BACKGROUND) --- */}
        {selectedTeacher && (
           <div className="fixed inset-0 flex items-center justify-center p-4" style={{ zIndex: 1000000 }}>
              <div 
                className="absolute inset-0 bg-black bg-opacity-95" 
                style={{ backdropFilter: 'blur(10px)' }}
                onClick={() => setSelectedTeacher(null)}
              ></div>
              
              <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border-t-8 border-blue-900 relative z-[1000001]">
                  <div className="bg-blue-900 p-6 flex justify-between items-center text-white sticky top-0">
                    <h2 className="text-xl font-bold uppercase">শিক্ষক প্রোফাইল রেকর্ড</h2>
                    <button onClick={() => setSelectedTeacher(null)} className="text-white text-4xl leading-none">&times;</button>
                  </div>
                  
                  <div className="p-8 md:p-12 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 border-b pb-8 text-base">
                      <div className="space-y-4">
                        <h3 className="font-bold text-blue-900 uppercase text-xs border-b pb-1">১. ব্যক্তিগত তথ্য</h3>
                        <p><strong>নাম (বাংলা):</strong> {selectedTeacher.nameBn || selectedTeacher.nameBN}</p>
                        <p><strong>পিতার নাম:</strong> {selectedTeacher.fatherName || "নেই"}</p>
                        <p><strong>মাতার নাম:</strong> {selectedTeacher.motherName || "নেই"}</p>
                        <p><strong>এনআইডি:</strong> {selectedTeacher.nid || "নেই"}</p>
                      </div>
                      <div className="space-y-4">
                        <h3 className="font-bold text-blue-900 uppercase text-xs border-b pb-1">২. পেশাগত ও বেতন</h3>
                        <p><strong>পদবী:</strong> {selectedTeacher.designation}</p>
                        <p><strong>বিভাগ:</strong> {selectedTeacher.department || "নেই"}</p>
                        <p className="text-green-700 font-bold text-lg"><strong>মূল বেতন:</strong> {selectedTeacher.basicPay || 0} ৳</p>
                        <p><strong>যোগদান তারিখ:</strong> {selectedTeacher.firstJoinDate || "নেই"}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                       <div className="space-y-4">
                          <h3 className="font-bold text-blue-900 uppercase text-xs border-b pb-1">৩. শিক্ষাগত যোগ্যতা</h3>
                          <p><strong>SSC তথ্য:</strong> {selectedTeacher.eduSSC || "নেই"}</p>
                          <p><strong>স্নাতক তথ্য:</strong> {selectedTeacher.eduGrad || "নেই"}</p>
                       </div>
                       <div className="space-y-4">
                          <h3 className="font-bold text-blue-900 uppercase text-xs border-b pb-1">৪. ব্যাংক ও অন্যান্য</h3>
                          <p><strong>ব্যাংক একাউন্ট:</strong> {selectedTeacher.bankAcc || "নেই"}</p>
                          <p><strong>PRL তারিখ:</strong> {selectedTeacher.prlDate || "নেই"}</p>
                       </div>
                    </div>

                    <div className="mt-6 bg-gray-50 p-6 rounded-2xl border italic text-gray-700">
                       <strong>ঠিকানা:</strong> {selectedTeacher.presentAddr || selectedTeacher.address || "নেই"}
                    </div>
                  </div>

                  <div className="p-6 bg-gray-100 flex justify-end">
                    <button onClick={() => setSelectedTeacher(null)} className="bg-blue-900 text-white py-3 px-12 rounded-xl font-bold shadow-lg hover:bg-black transition-all">বন্ধ করুন</button>
                  </div>
              </div>
           </div>
        )}
      </div>
    </div>
  );
};

export default TeacherDatabase;