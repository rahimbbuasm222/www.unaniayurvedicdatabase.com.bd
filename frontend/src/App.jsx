import React, { useState, useEffect } from 'react';

const TeacherDatabase = () => {
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  
  const [formData, setFormData] = useState({
    serialNo: '', nameBn: '', nameEn: '', designation: '', nid: '', dob: '', fatherName: '', motherName: '', mobile: '',
    eduSSC: '', eduHSC: '', eduGraduation: '', eduPostGraduation: '', eduDAMS: '', eduDUMS: '',
    joinDate: '', promotionDate: '', payScale: '', basicPay: '', boardRegNo: '', serviceLength: '', prlDate: '', bankAcc: '', bankName: '', ibasId: ''
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
        alert("✅ তথ্য সফলভাবে সংরক্ষিত হয়েছে!");
        resetForm();
        fetchTeachers();
      }
    } catch (error) { alert("❌ সার্ভার এরর!"); }
  };

  const resetForm = () => {
    setFormData({ serialNo: '', nameBn: '', nameEn: '', designation: '', nid: '', dob: '', fatherName: '', motherName: '', mobile: '', eduSSC: '', eduHSC: '', eduDAMS: '', eduDUMS: '', eduGraduation: '', eduPostGraduation: '', joinDate: '', promotionDate: '', payScale: '', basicPay: '', boardRegNo: '', serviceLength: '', prlDate: '', bankAcc: '', bankName: '', ibasId: '' });
    setIsEditing(false); setEditId(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm("আপনি কি নিশ্চিতভাবে এই তথ্যটি মুছে ফেলতে চান?")) {
      try { await fetch(`${API_URL}/${id}`, { method: 'DELETE' }); fetchTeachers(); } catch (error) { alert("এরর!"); }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-2 md:p-6 font-sans text-gray-800 pb-20">
      <div className="max-w-7xl mx-auto bg-white shadow-2xl rounded-3xl border-t-8 border-blue-900 overflow-hidden">
        
        {/* Header */}
        <div className="bg-blue-900 text-white py-8 px-6 text-center">
          <h1 className="text-xl md:text-3xl font-bold uppercase">বাংলাদেশ বোর্ড অব ইউনানী এন্ড আয়ুর্বেদিক সিস্টেমস অব মেডিসিন</h1>
          <p className="text-blue-200 mt-1 font-semibold">বেসরকারি ইউনানী/ আয়ুর্বেদিক কলেজসমূহে কর্মরত শিক্ষকবৃন্দের ডিজিটাল ডাটাবেজ (১-১৯ পয়েন্ট)</p>
        </div>

        <div className="p-4 md:p-8">
          {/* ইনপুট ফরম */}
          <form onSubmit={handleSubmit} className="p-6 md:p-10 rounded-3xl border-2 bg-blue-50 border-blue-100 shadow-inner mb-12">
            <h3 className="font-bold text-blue-900 border-b pb-4 mb-6 text-xl">➕ নতুন তথ্য এন্ট্রি ফরম</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-sm">
               <input type="text" name="serialNo" value={formData.serialNo} placeholder="১. কলেজের নাম" onChange={handleChange} className="p-2 border rounded-lg" />
               <input type="text" name="nameBn" value={formData.nameBn} placeholder="২. নাম (বাংলা)*" onChange={handleChange} className="p-2 border rounded-lg" required />
               <input type="text" name="designation" value={formData.designation} placeholder="৪. পদবী" onChange={handleChange} className="p-2 border rounded-lg" />
               <input type="text" name="mobile" value={formData.mobile} placeholder="৯. মোবাইল নম্বর" onChange={handleChange} className="p-2 border rounded-lg" />
               <input type="text" name="boardRegNo" value={formData.boardRegNo} placeholder="১৫. বোর্ড নিবন্ধন নং" onChange={handleChange} className="p-2 border rounded-lg" />
               <input type="number" name="basicPay" value={formData.basicPay} placeholder="১৪. মূল বেতন" onChange={handleChange} className="p-2 border rounded-lg" />
            </div>
            <button type="submit" className="w-full mt-8 py-4 bg-blue-900 text-white font-bold rounded-2xl shadow-xl uppercase hover:bg-black transition-all">তথ্য ডাটাবেজে সেভ করুন</button>
          </form>

          {/* সংরক্ষিত তালিকা - কলাম বাড়ানো হয়েছে */}
          <div className="overflow-x-auto rounded-3xl border shadow-xl bg-white">
            <h2 className="text-2xl font-bold p-6 border-b text-gray-800 bg-gray-50">সংরক্ষিত শিক্ষক ও এমপ্লয়ী তালিকা</h2>
            <table className="w-full text-xs md:text-sm text-left">
              <thead className="bg-blue-900 text-white font-bold uppercase">
                <tr>
                  <th className="p-4 border-r">ক্রমিক ও নাম</th>
                  <th className="p-4 border-r">পদবী ও মোবাইল</th>
                  <th className="p-4 border-r">নিবন্ধন ও বেতন</th>
                  <th className="p-4 text-center">অ্যাকশন</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {teachers.map((t) => (
                  <tr key={t._id} className="hover:bg-slate-50 transition border-b">
                    <td className="p-4 border-r">
                        <div className="text-[10px] text-gray-400">SL: {t.serialNo || "N/A"}</div>
                        <div className="font-bold text-blue-900">{t.nameBn}</div>
                    </td>
                    <td className="p-4 border-r">
                        <div className="font-semibold text-gray-700">{t.designation}</div>
                        <div className="text-blue-600 font-mono">{t.mobile}</div>
                    </td>
                    <td className="p-4 border-r">
                        <div className="text-blue-800 font-bold">Reg: {t.boardRegNo || "নেই"}</div>
                        <div className="text-green-700 font-bold">{t.basicPay || 0} ৳</div>
                    </td>
                    <td className="p-4 flex flex-col gap-2 items-center">
                        <button onClick={() => { setSelectedTeacher(t); setTimeout(()=>document.getElementById('profile-card')?.scrollIntoView({behavior:'smooth'}), 100); }} className="w-24 bg-blue-600 text-white py-1.5 rounded-full text-[10px] font-bold shadow hover:bg-black transition">বিস্তারিত</button>
                        <button onClick={() => startEdit(t)} className="w-24 bg-amber-500 text-white py-1.5 rounded-full text-[10px] font-bold shadow hover:bg-black transition">এডিট</button>
                        <button onClick={() => handleDelete(t._id)} className="w-24 bg-red-500 text-white py-1.5 rounded-full text-[10px] font-bold shadow hover:bg-black transition">মুছুন</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ৩. প্রোফাইল কার্ড (নিচে ঝকঝকে হয়ে আসবে) */}
        {selectedTeacher && (
           <div id="profile-card" className="m-4 md:m-12 p-8 bg-white rounded-3xl border-4 border-blue-900 shadow-2xl animate-pulse-once">
                <div className="flex justify-between items-center mb-8 border-b-4 border-blue-900 pb-4">
                    <h2 className="text-2xl font-bold text-blue-900 uppercase">📋 সার্ভিস প্রোফাইল রেকর্ড (সম্পূর্ণ ১৯টি তথ্য)</h2>
                    <button onClick={() => setSelectedTeacher(null)} className="bg-red-500 text-white px-6 py-2 rounded-xl font-bold hover:bg-black transition-all">বন্ধ করুন</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-base text-gray-800">
                    <div className="space-y-3">
                        <h3 className="bg-blue-900 text-white px-3 py-1 rounded text-xs inline-block uppercase font-bold tracking-widest">ব্যক্তিগত রেকর্ড</h3>
                        <p className="border-b py-1"><strong>১. ক্রমিক নং:</strong> {selectedTeacher.serialNo}</p>
                        <p className="border-b py-1"><strong>২. নাম (বাংলা):</strong> <span className="font-bold text-blue-900">{selectedTeacher.nameBn}</span></p>
                        <p className="border-b py-1"><strong>৫. এনআইডি:</strong> {selectedTeacher.nid}</p>
                        <p className="border-b py-1"><strong>৬. জন্ম তারিখ:</strong> {selectedTeacher.dob}</p>
                        <p className="border-b py-1"><strong>৭. পিতার নাম:</strong> {selectedTeacher.fatherName}</p>
                        <p className="border-b py-1"><strong>৯. মোবাইল:</strong> <span className="font-bold text-blue-700">{selectedTeacher.mobile}</span></p>
                    </div>
                    <div className="space-y-3">
                        <h3 className="bg-blue-900 text-white px-3 py-1 rounded text-xs inline-block uppercase font-bold tracking-widest">চাকুরি ও ব্যাংক তথ্য</h3>
                        <p className="border-b py-1"><strong>১১. যোগদান:</strong> {selectedTeacher.joinDate}</p>
                        <p className="border-b py-1"><strong>১২. পদোন্নতি:</strong> {selectedTeacher.promotionDate}</p>
                        <p className="border-b py-1"><strong>১৩. বেতন স্কেল:</strong> {selectedTeacher.payScale}</p>
                        <p className="border-b py-1"><strong>১৪. মূল বেতন:</strong> {selectedTeacher.basicPay} ৳</p>
                        <p className="border-b py-1 text-blue-700 font-bold"><strong>১৫. বোর্ড নিবন্ধন:</strong> {selectedTeacher.boardRegNo}</p>
                        <p className="border-b py-1 font-mono text-xs"><strong>১৮. ব্যাংক হিসাব:</strong> {selectedTeacher.bankAcc}</p>
                    </div>
                </div>
           </div>
        )}

        {/* Footer with Small Photo */}
        <footer className="bg-slate-900 text-white p-10 mt-12 border-t-4 border-blue-600 flex flex-col md:flex-row items-center gap-6">
            <img src="/images/my-pic.jpg" alt="AR" style={{ width: '50px', height: '50px' }} className="rounded-full border-2 border-blue-400" />
            <div>
               <h2 className="text-xl font-bold">আবদুর রহিম (Abdur Rahim)</h2>
               <p className="text-blue-400 text-xs font-bold uppercase tracking-wider">সেকশন অফিসার (সফটওয়্যার ইঞ্জিনিয়ার) | BBUASM</p>
            </div>
        </footer>
      </div>
    </div>
  );
};

export default TeacherDatabase;