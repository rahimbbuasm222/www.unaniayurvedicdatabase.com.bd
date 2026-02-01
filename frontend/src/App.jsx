import React, { useState, useEffect } from 'react';

const TeacherDatabase = () => {
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    nameBn: '', nameEn: '', fatherName: '', motherName: '', presentAddr: '', nid: '', designation: '', department: '',
    eduSSC: '', eduGrad: '', firstJoinDate: '', prlDate: '', basicPay: '', bankAcc: '', ibasId: '', routingNumber: ''
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

  // ডাটা সেভ এবং আপডেট লজিক
  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalData = { ...formData, ibasId: formData.ibasId || "SR-" + Date.now() };
    
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
    setFormData({ nameBn: '', nameEn: '', fatherName: '', motherName: '', presentAddr: '', nid: '', designation: '', department: '', eduSSC: '', eduGrad: '', firstJoinDate: '', prlDate: '', basicPay: '', bankAcc: '', ibasId: '', routingNumber: '' });
    setIsEditing(false);
    setEditId(null);
  };

  // ডিলিট করার ফাংশন
  const handleDelete = async (id) => {
    if (window.confirm("আপনি কি নিশ্চিতভাবে এই তথ্যটি মুছে ফেলতে চান?")) {
      try {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        fetchTeachers();
      } catch (error) { alert("মুছতে সমস্যা হয়েছে!"); }
    }
  };

  // এডিট মোড অন করা
  const startEdit = (t) => {
    setFormData(t);
    setEditId(t._id);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // স্ক্রল করে উপরে নিয়ে যাবে
  };

  return (
    <div className="min-h-screen bg-slate-100 p-2 md:p-6 font-sans text-gray-800">
      <div className="max-w-7xl mx-auto bg-white shadow-2xl rounded-3xl border-t-8 border-blue-900">
        
        <div className="bg-blue-900 text-white py-10 px-6 text-center rounded-t-2xl">
          <h1 className="text-2xl md:text-3xl font-bold uppercase">বাংলাদেশ বোর্ড অব ইউনানি অ্যান্ড আয়ুর্বেদিক সিস্টেম অব মেডিসিন</h1>
          <p className="text-blue-200 mt-2 font-semibold italic">সফটওয়্যার ডেভেলপমেন্ট ও কারিগরি সহায়তায়: আবদুর রহিম</p>
        </div>

        <div className="p-4 md:p-8">
          {/* ইনপুট ফরম */}
          <form onSubmit={handleSubmit} className={`space-y-8 p-6 md:p-10 rounded-3xl border-2 shadow-inner transition-all ${isEditing ? 'bg-green-50 border-green-200' : 'bg-blue-50 border-blue-100'}`}>
            <h3 className="font-bold text-blue-900 border-b pb-2 text-xl">{isEditing ? "📝 তথ্য সংশোধন করুন" : "➕ নতুন শিক্ষক তথ্য ইনপুট"}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <input type="text" name="nameBn" value={formData.nameBn} placeholder="নাম (বাংলা)*" onChange={handleChange} className="p-3 border rounded-xl bg-white" required />
               <input type="text" name="designation" value={formData.designation} placeholder="পদবী" onChange={handleChange} className="p-3 border rounded-xl bg-white" />
               <input type="text" name="department" value={formData.department} placeholder="বিভাগ" onChange={handleChange} className="p-3 border rounded-xl bg-white" />
               <input type="text" name="fatherName" value={formData.fatherName} placeholder="পিতার নাম" onChange={handleChange} className="p-3 border rounded-xl bg-white" />
               <input type="number" name="basicPay" value={formData.basicPay} placeholder="মূল বেতন" onChange={handleChange} className="p-3 border rounded-xl bg-white" />
               <input type="text" name="nid" value={formData.nid} placeholder="এনআইডি" onChange={handleChange} className="p-3 border rounded-xl bg-white" />
            </div>
            <div className="flex gap-4">
                <button type="submit" className={`flex-grow py-4 rounded-2xl text-white font-bold shadow-xl uppercase tracking-widest transition-all ${isEditing ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-900 hover:bg-black'}`}>
                    {isEditing ? "আপডেট করুন" : "সংরক্ষণ করুন"}
                </button>
                {isEditing && <button onClick={resetForm} className="bg-gray-500 text-white px-8 rounded-2xl font-bold uppercase">বাতিল</button>}
            </div>
          </form>

          {/* তালিকা */}
          <div className="mt-12 overflow-x-auto rounded-3xl border shadow-xl bg-white">
            <table className="w-full text-sm text-left">
              <thead className="bg-blue-900 text-white">
                <tr>
                  <th className="p-5">শিক্ষকের নাম ও পদবী</th>
                  <th className="p-5 text-center">অ্যাকশন</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {teachers.map((t) => (
                  <tr key={t._id} className="hover:bg-slate-50 transition border-b">
                    <td className="p-5">
                      <div className="font-bold text-blue-900 text-base">{t.nameBn || t.nameBN}</div>
                      <div className="text-xs text-gray-500">{t.designation}</div>
                    </td>
                    <td className="p-5 flex flex-wrap justify-center gap-2">
                      <button onClick={() => setSelectedTeacher(t)} className="bg-blue-600 text-white px-4 py-2 rounded-full text-[10px] font-bold shadow hover:bg-blue-800">বিস্তারিত</button>
                      <button onClick={() => startEdit(t)} className="bg-amber-500 text-white px-4 py-2 rounded-full text-[10px] font-bold shadow hover:bg-amber-600">এডিট</button>
                      <button onClick={() => handleDelete(t._id)} className="bg-red-500 text-white px-4 py-2 rounded-full text-[10px] font-bold shadow hover:bg-red-700">মুছুন</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* --- বিস্তারিত মডাল (Detailed View) --- */}
        {selectedTeacher && (
           <div className="fixed inset-0 flex items-center justify-center p-4 z-[999999]">
              <div className="absolute inset-0 bg-black bg-opacity-95 backdrop-blur-sm" onClick={() => setSelectedTeacher(null)}></div>
              <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl border-t-8 border-blue-900 p-8 md:p-12 relative z-[1000000]">
                  <div className="flex justify-between items-start mb-8 border-b pb-4 text-blue-900">
                    <h2 className="text-2xl font-bold">শিক্ষক প্রোফাইল রেকর্ড</h2>
                    <button onClick={() => setSelectedTeacher(null)} className="text-red-500 text-4xl">&times;</button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-base">
                    <div className="space-y-3">
                      <p><strong>নাম (বাংলা):</strong> {selectedTeacher.nameBn || selectedTeacher.nameBN}</p>
                      <p><strong>পদবী:</strong> {selectedTeacher.designation}</p>
                      <p><strong>পিতার নাম:</strong> {selectedTeacher.fatherName || "নেই"}</p>
                    </div>
                    <div className="space-y-3">
                      <p><strong>মূল বেতন:</strong> {selectedTeacher.basicPay || selectedTeacher.basicpay || 0} ৳</p>
                      <p><strong>বিভাগ:</strong> {selectedTeacher.department || "নেই"}</p>
                      <p><strong>এনআইডি:</strong> {selectedTeacher.nid || "নেই"}</p>
                    </div>
                  </div>
                  <button onClick={() => setSelectedTeacher(null)} className="mt-10 w-full bg-blue-900 text-white py-4 rounded-2xl font-bold">বন্ধ করুন</button>
              </div>
           </div>
        )}
      </div>
    </div>
  );
};

export default TeacherDatabase;