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
    } catch (error) { console.error("Load error:", error); }
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
    <div className="min-h-screen bg-gray-100 p-2 md:p-6 font-sans text-gray-800">
      <div className="max-w-7xl mx-auto bg-white shadow-2xl rounded-3xl border-t-8 border-blue-900 overflow-hidden">
        
        {/* Header Section */}
        <div className="bg-blue-900 text-white py-8 px-6 text-center">
          <h1 className="text-xl md:text-2xl font-bold uppercase">বাংলাদেশ বোর্ড অব ইউনানি অ্যান্ড আয়ুর্বেদিক সিস্টেম অব মেডিসিন</h1>
          <p className="text-blue-100 mt-2 font-semibold">শিক্ষক ও এমপ্লয়ী পূর্ণাঙ্গ ডিজিটাল সার্ভিস ডাটাবেস</p>
        </div>

        <div className="p-4 md:p-8">
          {/* ইনপুট ফরম - পিডিএফ অনুযায়ী সব ফিল্ড */}
          <form onSubmit={handleSubmit} className={`p-6 md:p-10 rounded-3xl border-2 shadow-inner transition-all ${isEditing ? 'bg-green-50 border-green-200' : 'bg-blue-50 border-blue-100'}`}>
            <h3 className="font-bold text-blue-900 border-b pb-4 mb-6 text-xl">{isEditing ? "📝 তথ্য সংশোধন" : "➕ নতুন তথ্য ইনপুট ফরম (অফিশিয়াল)"}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <div className="col-span-full font-bold text-blue-800 border-l-4 border-blue-900 pl-2 mb-2 uppercase text-xs">১. সাধারণ ও পেশাগত তথ্য</div>
               <input type="text" name="nameBn" value={formData.nameBn} placeholder="নাম (বাংলা)*" onChange={handleChange} className="p-3 border rounded-xl bg-white" required />
               <input type="text" name="nameEn" value={formData.nameEn} placeholder="নাম (ইংরেজি)" onChange={handleChange} className="p-3 border rounded-xl bg-white" />
               <input type="text" name="fatherName" value={formData.fatherName} placeholder="পিতার নাম" onChange={handleChange} className="p-3 border rounded-xl bg-white" />
               <input type="text" name="motherName" value={formData.motherName} placeholder="মাতার নাম" onChange={handleChange} className="p-3 border rounded-xl bg-white" />
               <input type="text" name="nid" value={formData.nid} placeholder="এনআইডি নম্বর" onChange={handleChange} className="p-3 border rounded-xl bg-white" />
               <input type="text" name="designation" value={formData.designation} placeholder="পদবী" onChange={handleChange} className="p-3 border rounded-xl bg-white" />
               <input type="text" name="department" value={formData.department} placeholder="বিভাগ" onChange={handleChange} className="p-3 border rounded-xl bg-white" />
               <textarea name="presentAddr" value={formData.presentAddr} placeholder="ঠিকানা" onChange={handleChange} className="p-3 border rounded-xl bg-white md:col-span-2 h-12" />

               <div className="col-span-full font-bold text-blue-800 border-l-4 border-blue-900 pl-2 mt-4 uppercase text-xs">২. শিক্ষাগত যোগ্যতা ও চাকুরির রেকর্ড</div>
               <input type="text" name="eduSSC" value={formData.eduSSC} placeholder="SSC তথ্য" onChange={handleChange} className="p-3 border rounded-xl bg-white" />
               <input type="text" name="eduGrad" value={formData.eduGrad} placeholder="স্নাতক তথ্য" onChange={handleChange} className="p-3 border rounded-xl bg-white" />
               <div className="flex flex-col"><label className="text-[10px] ml-2 font-bold text-gray-500 uppercase">যোগদান</label><input type="date" name="firstJoinDate" value={formData.firstJoinDate} onChange={handleChange} className="p-3 border rounded-xl bg-white" /></div>
               <div className="flex flex-col"><label className="text-[10px] ml-2 font-bold text-gray-500 uppercase">PRL শুরু</label><input type="date" name="prlDate" value={formData.prlDate} onChange={handleChange} className="p-3 border rounded-xl bg-white" /></div>
               <input type="number" name="basicPay" value={formData.basicPay} placeholder="মূল বেতন" onChange={handleChange} className="p-3 border rounded-xl bg-white font-bold" />
               <input type="text" name="routingNumber" value={formData.routingNumber} placeholder="রাউটিং নম্বর" onChange={handleChange} className="p-3 border rounded-xl bg-white" />
            </div>
            <button type="submit" className={`w-full mt-8 py-4 rounded-2xl text-white font-bold shadow-xl uppercase tracking-widest transition-all ${isEditing ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-900 hover:bg-black'}`}>
                {isEditing ? "তথ্য আপডেট করুন" : "তথ্য ডাটাবেজে সংরক্ষণ করুন"}
            </button>
            {isEditing && <button type="button" onClick={resetForm} className="w-full mt-2 bg-gray-500 text-white py-2 rounded-xl font-bold uppercase">বাতিল</button>}
          </form>

          {/* তালিকা টেবিল */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6 flex items-center text-gray-800"><span className="w-3 h-8 bg-blue-900 mr-3 rounded"></span> সংরক্ষিত শিক্ষক তালিকা</h2>
            <div className="overflow-x-auto rounded-3xl border shadow-xl bg-white">
              <table className="w-full text-sm text-left">
                <thead className="bg-blue-900 text-white font-bold uppercase text-xs">
                  <tr><th className="p-5">শিক্ষকের নাম ও পদবী</th><th className="p-5">বিভাগ ও বেতন</th><th className="p-5 text-center">অ্যাকশন</th></tr>
                </thead>
                <tbody className="divide-y">
                  {teachers.map((t) => (
                    <tr key={t._id} className="hover:bg-slate-50 transition border-b">
                      <td className="p-5"><div className="font-bold text-blue-900 text-base">{t.nameBn || t.nameBN}</div><div className="text-xs text-gray-500">{t.designation}</div></td>
                      <td className="p-5"><div className="text-gray-700">{t.department || "বিভাগ নেই"}</div><div className="text-green-700 font-bold">{t.basicPay || 0} ৳</div></td>
                      <td className="p-5 flex flex-wrap justify-center gap-3">
                        <button onClick={() => setSelectedTeacher(t)} className="bg-blue-600 text-white px-5 py-2 rounded-full text-[10px] font-bold shadow hover:bg-blue-800 transition">বিস্তারিত</button>
                        <button onClick={() => startEdit(t)} className="bg-amber-500 text-white px-5 py-2 rounded-full text-[10px] font-bold shadow hover:bg-amber-600 transition">এডিট</button>
                        <button onClick={() => handleDelete(t._id)} className="bg-red-500 text-white px-4 py-2 rounded-full text-[10px] font-bold shadow hover:bg-red-700 transition">মুছুন</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-slate-900 text-white p-8 mt-12 border-t-4 border-blue-600 flex flex-col md:flex-row items-center gap-6">
            <div style={{ width: '40px', height: '40px' }} className="rounded-full border-2 border-blue-400 overflow-hidden shadow-xl bg-white flex-shrink-0">
               <img src="/images/my-pic.jpg" alt="AR" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.target.src="https://via.placeholder.com/40"; }} />
            </div>
            <div>
               <h2 className="text-xl font-bold">আবদুর রহিম (Abdur Rahim)</h2>
               <p className="text-blue-400 text-xs font-bold uppercase">সেকশন অফিসার (সফটওয়্যার ইঞ্জিনিয়ার) | BBUASM</p>
               <p className="text-gray-500 text-[10px] mt-1 italic">ইউনানি ও আয়ুর্বেদিক শিক্ষা ব্যবস্থাপনা ডিজিটালাইজেশন প্রজেক্ট</p>
            </div>
        </footer>

        {/* --- সলিড হোয়াইট মডাল (FIXED: NO OVERLAP) --- */}
        {selectedTeacher && (
           <div className="fixed inset-0 flex items-center justify-center p-4 z-[99999999]" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%' }}>
              {/* অন্ধকার সলিড ব্যাকড্রপ */}
              <div className="absolute inset-0 bg-gray-900 bg-opacity-95" onClick={() => setSelectedTeacher(null)}></div>
              
              {/* মডাল বক্স - একদম সাদা এবং পরিষ্কার */}
              <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border-t-8 border-blue-900 relative z-[100000000]">
                  <div className="bg-blue-900 p-6 flex justify-between items-center text-white sticky top-0 shadow-lg">
                    <div>
                        <h2 className="text-xl font-bold uppercase tracking-wide font-serif">শিক্ষক প্রোফাইল বিস্তারিত তথ্য রেকর্ড</h2>
                        <p className="text-blue-200 text-xs">বাংলাদেশ বোর্ড অব ইউনানি অ্যান্ড আয়ুর্বেদিক সিস্টেম অব মেডিসিন</p>
                    </div>
                    <button onClick={() => setSelectedTeacher(null)} className="text-white text-4xl leading-none hover:text-red-400 transition">&times;</button>
                  </div>
                  
                  <div className="p-8 md:p-12 space-y-10 bg-white">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 border-b pb-10">
                      <div className="space-y-4">
                        <h3 className="font-bold text-blue-900 uppercase text-xs border-b pb-1 tracking-widest font-serif">১. ব্যক্তিগত তথ্য</h3>
                        <p className="flex justify-between border-b border-dotted py-1 text-sm"><strong>নাম (বাংলা):</strong> <span className="font-bold text-gray-800">{selectedTeacher.nameBn || selectedTeacher.nameBN}</span></p>
                        <p className="flex justify-between border-b border-dotted py-1 text-sm"><strong>পিতার নাম:</strong> <span className="text-gray-700">{selectedTeacher.fatherName || "প্রদত্ত নয়"}</span></p>
                        <p className="flex justify-between border-b border-dotted py-1 text-sm"><strong>মাতার নাম:</strong> <span className="text-gray-700">{selectedTeacher.motherName || "প্রদত্ত নয়"}</span></p>
                        <p className="flex justify-between border-b border-dotted py-1 text-sm"><strong>এনআইডি নম্বর:</strong> <span className="font-mono font-bold text-blue-700">{selectedTeacher.nid || "প্রদত্ত নয়"}</span></p>
                        <p className="text-xs bg-gray-50 p-4 rounded-xl mt-3 border text-gray-600 leading-relaxed italic"><strong>ঠিকানা:</strong> {selectedTeacher.presentAddr || selectedTeacher.address || "প্রদত্ত নয়"}</p>
                      </div>
                      <div className="space-y-4">
                        <h3 className="font-bold text-blue-900 uppercase text-xs border-b pb-1 tracking-widest font-serif">২. পেশাগত তথ্য</h3>
                        <p className="flex justify-between border-b border-dotted py-1 text-sm"><strong>পদবী:</strong> <span className="text-gray-700 font-bold">{selectedTeacher.designation}</span></p>
                        <p className="flex justify-between border-b border-dotted py-1 text-sm"><strong>বিভাগ:</strong> <span className="text-gray-700">{selectedTeacher.department || "প্রদত্ত নয়"}</span></p>
                        <p className="flex justify-between text-green-700 font-bold py-1 text-lg border-b border-dotted"><strong>মূল বেতন:</strong> <span>{selectedTeacher.basicPay || 0} ৳</span></p>
                        <p className="flex justify-between border-b border-dotted py-1 text-sm"><strong>যোগদান তারিখ:</strong> <span className="text-blue-900 font-bold">{selectedTeacher.firstJoinDate || "প্রদত্ত নয়"}</span></p>
                        <p className="flex justify-between border-b border-dotted py-1 text-sm"><strong>PRL শুরুর তারিখ:</strong> <span className="text-red-700 font-bold">{selectedTeacher.prlDate || "প্রদত্ত নয়"}</span></p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                       <div className="space-y-4 text-sm">
                          <h3 className="font-bold text-blue-900 uppercase text-xs border-b pb-1 tracking-widest font-serif">৩. শিক্ষাগত যোগ্যতা</h3>
                          <div className="bg-gray-50 p-4 rounded-xl space-y-2 border">
                            <p><strong>SSC/HSC তথ্য:</strong> <br/> <span className="text-gray-600 italic">{selectedTeacher.eduSSC || selectedTeacher.eduHSC || "প্রদত্ত নয়"}</span></p>
                            <p className="mt-2"><strong>স্নাতক/স্নাতকোত্তর:</strong> <br/> <span className="text-gray-600 italic">{selectedTeacher.eduGrad || selectedTeacher.eduPostGrad || "প্রদত্ত নয়"}</span></p>
                          </div>
                       </div>
                       <div className="space-y-4 text-sm">
                          <h3 className="font-bold text-blue-900 uppercase text-xs border-b pb-1 tracking-widest font-serif">৪. ব্যাংক ও অন্যান্য তথ্য</h3>
                          <p className="flex justify-between border-b border-dotted py-1"><strong>ব্যাংকের নাম:</strong> <span className="text-gray-700">{selectedTeacher.bankName || "নেই"}</span></p>
                          <p className="flex justify-between border-b border-dotted py-1"><strong>রাউটিং নম্বর:</strong> <span className="font-mono font-bold text-gray-700">{selectedTeacher.routingNumber || "নেই"}</span></p>
                          <p className="flex justify-between border-b border-dotted py-1"><strong>আয়কর কর্তন:</strong> <span className="text-gray-700 font-bold">{selectedTeacher.incomeTax || "০"} ৳</span></p>
                       </div>
                    </div>
                  </div>

                  <div className="p-8 bg-gray-100 flex justify-center sticky bottom-0">
                    <button onClick={() => setSelectedTeacher(null)} className="bg-blue-900 text-white py-4 px-24 rounded-2xl font-bold shadow-2xl hover:bg-black transition-all uppercase tracking-widest transform hover:scale-105">বন্ধ করুন</button>
                  </div>
              </div>
           </div>
        )}
      </div>
    </div>
  );
};

export default TeacherDatabase;