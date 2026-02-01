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
        alert(isEditing ? "✅ তথ্য সফলভাবে আপডেট হয়েছে!" : "✅ তথ্য সফলভাবে সংরক্ষিত হয়েছে!");
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
    if (window.confirm("মুছে ফেলতে চান?")) {
      try {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        fetchTeachers();
      } catch (error) { alert("এরর!"); }
    }
  };

  // বিস্তারিত বাটনের জন্য আলাদা ফাংশন
  const handleShowDetails = (t) => {
    setSelectedTeacher(t);
    // সরাসরি নিচের বিস্তারিত সেকশনে স্ক্রল করবে
    setTimeout(() => {
        document.getElementById('details-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-slate-100 p-2 md:p-6 font-sans text-gray-800 pb-20">
      <div className="max-w-6xl mx-auto bg-white shadow-2xl rounded-3xl border-t-8 border-blue-900 overflow-hidden">
        
        {/* Header */}
        <div className="bg-blue-900 text-white py-10 px-6 text-center">
          <h1 className="text-xl md:text-3xl font-bold uppercase tracking-wide">বাংলাদেশ বোর্ড অব ইউনানি অ্যান্ড আয়ুর্বেদিক সিস্টেম অব মেডিসিন</h1>
          <p className="text-blue-200 mt-2 font-semibold">শিক্ষক ও এমপ্লয়ী পূর্ণাঙ্গ ডিজিটাল সার্ভিস ডাটাবেস</p>
        </div>

        <div className="p-4 md:p-8">
          {/* ১. ইনপুট ফরম */}
          <form onSubmit={handleSubmit} className={`p-6 md:p-10 rounded-3xl border-2 shadow-inner transition-all ${isEditing ? 'bg-green-50 border-green-200' : 'bg-blue-50 border-blue-100'}`}>
            <h3 className="font-bold text-blue-900 border-b pb-4 mb-6 text-xl">{isEditing ? "📝 তথ্য সংশোধন" : "➕ নতুন তথ্য ইনপুট ফরম"}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <input type="text" name="nameBn" value={formData.nameBn} placeholder="নাম (বাংলা)*" onChange={handleChange} className="p-3 border rounded-xl bg-white shadow-sm" required />
               <input type="text" name="designation" value={formData.designation} placeholder="পদবী" onChange={handleChange} className="p-3 border rounded-xl bg-white shadow-sm" />
               <input type="text" name="department" value={formData.department} placeholder="বিভাগ" onChange={handleChange} className="p-3 border rounded-xl bg-white shadow-sm" />
               <input type="number" name="basicPay" value={formData.basicPay} placeholder="মূল বেতন" onChange={handleChange} className="p-3 border rounded-xl bg-white shadow-sm font-bold" />
               <input type="text" name="nid" value={formData.nid} placeholder="এনআইডি নম্বর" onChange={handleChange} className="p-3 border rounded-xl bg-white shadow-sm" />
            </div>
            <button type="submit" className="w-full mt-6 bg-blue-900 text-white font-bold py-4 rounded-2xl shadow-xl uppercase hover:bg-black transition-all">তথ্য ডাটাবেজে সংরক্ষণ করুন</button>
          </form>

          {/* ২. সংরক্ষিত তালিকা */}
          <div className="mt-16 overflow-x-auto rounded-3xl border shadow-xl bg-white">
            <h2 className="text-2xl font-bold p-6 text-gray-800 flex items-center"><span className="w-3 h-8 bg-blue-900 mr-3 rounded"></span> সংরক্ষিত শিক্ষক তালিকা</h2>
            <table className="w-full text-sm text-left">
              <thead className="bg-blue-900 text-white font-bold uppercase">
                <tr><th className="p-5">নাম ও পদবী</th><th className="p-5">বিভাগ ও বেতন</th><th className="p-5 text-center">অ্যাকশন</th></tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {teachers.map((t) => (
                  <tr key={t._id} className="hover:bg-slate-50 transition border-b">
                    <td className="p-5"><div className="font-bold text-blue-900 text-base">{t.nameBn || t.nameBN}</div><div className="text-xs text-gray-500 font-medium">{t.designation}</div></td>
                    <td className="p-5"><div className="text-gray-700">{t.department}</div><div className="text-green-700 font-bold">{t.basicPay || 0} ৳</div></td>
                    <td className="p-5 flex flex-wrap justify-center gap-2">
                      <button onClick={() => handleShowDetails(t)} className="bg-blue-600 text-white px-5 py-2 rounded-full text-[10px] font-bold shadow hover:bg-blue-800 transition">বিস্তারিত দেখুন</button>
                      <button onClick={() => { setFormData(t); setEditId(t._id); setIsEditing(true); window.scrollTo({top:0, behavior:'smooth'}); }} className="bg-amber-500 text-white px-5 py-2 rounded-full text-[10px] font-bold shadow hover:bg-amber-600 transition">এডিট</button>
                      <button onClick={() => handleDelete(t._id)} className="bg-red-500 text-white px-5 py-2 rounded-full text-[10px] font-bold shadow hover:bg-red-700 transition">মুছুন</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ৩. বিস্তারিত তথ্য সেকশন (নিচে দেখাবে, ওভারল্যাপ হবে না) */}
        {selectedTeacher && (
           <div id="details-section" className="m-4 md:m-8 p-8 bg-white rounded-3xl border-4 border-blue-900 shadow-2xl animate-pulse-once">
                <div className="flex justify-between items-center mb-8 border-b-4 border-blue-900 pb-4">
                    <h2 className="text-2xl font-bold text-blue-900 uppercase">📋 শিক্ষকের পূর্ণাঙ্গ প্রোফাইল রেকর্ড</h2>
                    <button onClick={() => setSelectedTeacher(null)} className="bg-red-500 text-white px-4 py-1 rounded-lg font-bold">বন্ধ করুন</button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-4">
                        <h3 className="bg-blue-900 text-white px-3 py-1 rounded text-sm inline-block uppercase">ব্যক্তিগত তথ্য</h3>
                        <p className="border-b py-1"><strong>নাম (বাংলা):</strong> {selectedTeacher.nameBn || selectedTeacher.nameBN}</p>
                        <p className="border-b py-1"><strong>নাম (ইংরেজি):</strong> {selectedTeacher.nameEn || "নেই"}</p>
                        <p className="border-b py-1"><strong>পিতার নাম:</strong> {selectedTeacher.fatherName || "নেই"}</p>
                        <p className="border-b py-1"><strong>মাতার নাম:</strong> {selectedTeacher.motherName || "নেই"}</p>
                        <p className="border-b py-1"><strong>এনআইডি:</strong> {selectedTeacher.nid || "নেই"}</p>
                        <p className="bg-slate-50 p-3 rounded italic"><strong>ঠিকানা:</strong> {selectedTeacher.presentAddr || selectedTeacher.address || "প্রদত্ত নয়"}</p>
                    </div>

                    <div className="space-y-4">
                        <h3 className="bg-blue-900 text-white px-3 py-1 rounded text-sm inline-block uppercase">পেশাগত তথ্য ও বেতন</h3>
                        <p className="border-b py-1"><strong>পদবী:</strong> {selectedTeacher.designation}</p>
                        <p className="border-b py-1"><strong>বিভাগ:</strong> {selectedTeacher.department || "নেই"}</p>
                        <p className="border-b py-1 text-green-700 font-bold"><strong>মূল বেতন:</strong> {selectedTeacher.basicPay || 0} ৳</p>
                        <p className="border-b py-1"><strong>যোগদান তারিখ:</strong> {selectedTeacher.firstJoinDate || "নেই"}</p>
                        <p className="border-b py-1"><strong>PRL শুরুর তারিখ:</strong> {selectedTeacher.prlDate || "নেই"}</p>
                    </div>

                    <div className="space-y-4">
                        <h3 className="bg-blue-900 text-white px-3 py-1 rounded text-sm inline-block uppercase">শিক্ষাগত যোগ্যতা</h3>
                        <p className="border-b py-1"><strong>SSC তথ্য:</strong> {selectedTeacher.eduSSC || "নেই"}</p>
                        <p className="border-b py-1"><strong>HSC তথ্য:</strong> {selectedTeacher.eduHSC || "নেই"}</p>
                        <p className="border-b py-1"><strong>স্নাতক/স্নাতকোত্তর:</strong> {selectedTeacher.eduGrad || selectedTeacher.eduPostGrad || "নেই"}</p>
                    </div>

                    <div className="space-y-4">
                        <h3 className="bg-blue-900 text-white px-3 py-1 rounded text-sm inline-block uppercase">ব্যাংক ও অন্যান্য</h3>
                        <p className="border-b py-1"><strong>ব্যাংকের নাম:</strong> {selectedTeacher.bankName || "নেই"}</p>
                        <p className="border-b py-1"><strong>রাউটিং নম্বর:</strong> {selectedTeacher.routingNumber || "নেই"}</p>
                        <p className="border-b py-1"><strong>আয়কর কর্তন:</strong> {selectedTeacher.incomeTax || "০"} ৳</p>
                    </div>
                </div>

                <div className="mt-10 text-center border-t pt-6">
                    <button onClick={() => setSelectedTeacher(null)} className="bg-red-600 text-white py-3 px-20 rounded-2xl font-bold shadow-xl hover:bg-black transition-all uppercase">প্রোফাইল বন্ধ করুন</button>
                </div>
           </div>
        )}

        {/* Footer */}
        <footer className="bg-slate-900 text-white p-8 mt-12 border-t-4 border-blue-600 flex flex-col md:flex-row items-center gap-6">
            <div style={{ width: '50px', height: '50px' }} className="rounded-full border-2 border-blue-400 overflow-hidden shadow-xl bg-white flex-shrink-0">
               <img src="/images/my-pic.jpg" alt="AR" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.target.src="https://via.placeholder.com/40"; }} />
            </div>
            <div>
               <h2 className="text-xl font-bold text-white">আবদুর রহিম (Abdur Rahim)</h2>
               <p className="text-blue-400 text-xs font-bold uppercase">সেকশন অফিসার (সফটওয়্যার ইঞ্জিনিয়ার) | BBUASM</p>
               <p className="text-gray-500 text-[10px] mt-1 italic">ইউনানি ও আয়ুর্বেদিক শিক্ষা ব্যবস্থাপনা ডিজিটালাইজেশন প্রজেক্ট</p>
            </div>
        </footer>

      </div>
    </div>
  );
};

export default TeacherDatabase;