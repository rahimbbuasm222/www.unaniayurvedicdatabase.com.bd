import React, { useState, useEffect } from 'react';

const TeacherDatabase = () => {
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
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
    } catch (error) {
      console.error("ডেটা আনতে সমস্যা হয়েছে:", error);
    }
  };

  useEffect(() => { fetchTeachers(); }, []);

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
        alert("✅ সফলভাবে সব তথ্য সংরক্ষিত হয়েছে!");
        setFormData({ nameBn: '', nameEn: '', fatherName: '', motherName: '', presentAddr: '', permanentAddr: '', nid: '', designation: '', department: '', eduSSC: '', eduHSC: '', eduGrad: '', eduPostGrad: '', firstJoinDate: '', currentPostDate: '', jobType: 'স্থায়ী', prlDate: '', initialPayScale: '', basicPay: '', incrementStep: '', bankAcc: '', bankName: '', branchName: '', routingNumber: '', incomeTax: '', ibasId: '' });
        fetchTeachers();
      } else {
        const err = await response.json();
        alert("❌ ভুল: আইবাস আইডি (" + formData.ibasId + ") ডাটাবেজে আগে থেকেই আছে। দয়া করে নতুন আইডি দিন।");
      }
    } catch (error) { alert("❌ সার্ভার এরর!"); }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-2 md:p-6 font-sans text-gray-800">
      <div className="max-w-7xl mx-auto bg-white shadow-2xl rounded-xl border-t-8 border-blue-900">
        
        <div className="bg-blue-900 text-white py-8 px-6 text-center">
          <h1 className="text-2xl md:text-3xl font-bold uppercase tracking-tight">বাংলাদেশ বোর্ড অব ইউনানি অ্যান্ড আয়ুর্বেদিক সিস্টেম অব মেডিসিন</h1>
          <h2 className="text-xl font-semibold text-blue-200 mt-2 underline">শিক্ষক প্রোফাইল ও পূর্ণাঙ্গ সার্ভিস ডাটাবেস</h2>
        </div>

        <div className="p-4 md:p-8">
          {/* ইনপুট ফরম - পিডিএফ অনুযায়ী সব ফিল্ড */}
          <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-2xl border-2 border-blue-50 mb-12 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               <div className="col-span-full font-bold text-blue-900 border-b pb-2">১. সাধারণ ও পেশাগত তথ্য</div>
               <input type="text" name="nameBn" value={formData.nameBn} placeholder="নাম (বাংলা)*" onChange={handleChange} className="border p-2 rounded" required />
               <input type="text" name="nameEn" value={formData.nameEn} placeholder="নাম (ইংরেজি)" onChange={handleChange} className="border p-2 rounded" />
               <input type="text" name="ibasId" value={formData.ibasId} placeholder="iBAS ID (ইউনিক)*" onChange={handleChange} className="border p-2 rounded bg-yellow-50 font-bold" required />
               <input type="text" name="nid" value={formData.nid} placeholder="এনআইডি নম্বর" onChange={handleChange} className="border p-2 rounded" />
               <input type="text" name="designation" value={formData.designation} placeholder="পদবী" onChange={handleChange} className="border p-2 rounded" />
               <input type="text" name="department" value={formData.department} placeholder="বিভাগ" onChange={handleChange} className="border p-2 rounded" />
               <input type="text" name="fatherName" value={formData.fatherName} placeholder="পিতার নাম" onChange={handleChange} className="border p-2 rounded" />
               <input type="text" name="motherName" value={formData.motherName} placeholder="মাতার নাম" onChange={handleChange} className="border p-2 rounded" />
               <input type="text" name="presentAddr" value={formData.presentAddr} placeholder="ঠিকানা" onChange={handleChange} className="border p-2 rounded" />

               <div className="col-span-full font-bold text-blue-900 border-b pb-2 mt-4">২. শিক্ষাগত যোগ্যতা ও চাকুরির রেকর্ড</div>
               <input type="text" name="eduSSC" value={formData.eduSSC} placeholder="SSC (জিপিএ/সাল/প্রতিষ্ঠান)" onChange={handleChange} className="border p-2 rounded" />
               <input type="text" name="eduGrad" value={formData.eduGrad} placeholder="স্নাতক (ডিগ্রি/সাল)" onChange={handleChange} className="border p-2 rounded" />
               <div className="flex flex-col"><label className="text-[10px] ml-1">প্রথম যোগদানের তারিখ</label><input type="date" name="firstJoinDate" value={formData.firstJoinDate} onChange={handleChange} className="border p-2 rounded" /></div>
               <div className="flex flex-col"><label className="text-[10px] ml-1">PRL শুরুর তারিখ</label><input type="date" name="prlDate" value={formData.prlDate} onChange={handleChange} className="border p-2 rounded" /></div>
               <input type="number" name="basicPay" value={formData.basicPay} placeholder="বর্তমান মূল বেতন" onChange={handleChange} className="border p-2 rounded" />
               <input type="text" name="incrementStep" value={formData.incrementStep} placeholder="ইনক্রিমেন্ট ধাপ" onChange={handleChange} className="border p-2 rounded" />
               <input type="text" name="routingNumber" value={formData.routingNumber} placeholder="ব্যাংক রাউটিং নম্বর" onChange={handleChange} className="border p-2 rounded" />
            </div>
            <button type="submit" className="w-full bg-blue-900 text-white font-bold py-4 rounded-xl hover:bg-black transition-all shadow-xl">তথ্য ডাটাবেজে সংরক্ষণ করুন</button>
          </form>

          {/* তালিকা টেবিল */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center"><span className="w-3 h-8 bg-blue-900 mr-3 rounded"></span> সংরক্ষিত শিক্ষকদের তালিকা</h2>
            <div className="overflow-x-auto rounded-xl border shadow-md">
              <table className="w-full text-sm text-left bg-white">
                <thead className="bg-blue-900 text-white font-bold uppercase">
                  <tr><th className="p-4">নাম ও পদবী</th><th className="p-4">আইবাস ও এনআইডি</th><th className="p-4">বেতন</th><th className="p-4 text-center">অ্যাকশন</th></tr>
                </thead>
                <tbody className="divide-y">
                  {teachers.map((t) => (
                    <tr key={t._id} className="hover:bg-blue-50 transition border-b">
                      <td className="p-4"><div className="font-bold text-blue-900">{t.nameBn || t.nameBN}</div><div className="text-xs">{t.designation}</div></td>
                      <td className="p-4 font-mono font-bold text-gray-600">ID: {t.ibasId || t.ibasID} <br/><span className="text-[10px] font-normal">NID: {t.nid}</span></td>
                      <td className="p-4 font-bold text-green-700">{t.basicPay || t.basicpay} ৳</td>
                      <td className="p-4 text-center"><button onClick={() => setSelectedTeacher(t)} className="bg-blue-900 text-white px-5 py-2 rounded-full text-[10px] font-bold shadow hover:bg-black transition">সম্পূর্ণ প্রোফাইল</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-slate-900 text-white p-8 mt-12 border-t-4 border-blue-600 flex flex-col md:flex-row items-center gap-6">
            <img src="/images/my-pic.jpg" alt="AR" style={{ width: '60px', height: '60px' }} className="rounded-full border-2 border-blue-400" onError={(e) => e.target.src="https://via.placeholder.com/60"} />
            <div>
               <h2 className="text-xl font-bold">আবদুর রহিম (Abdur Rahim)</h2>
               <p className="text-blue-400 text-sm font-bold uppercase">সেকশন অফিসার (সফটওয়্যার ইঞ্জিনিয়ার) | BBUASM</p>
            </div>
        </footer>

        {/* --- বিস্তারিত মডাল (FIXED MODAL) --- */}
        {selectedTeacher && (
           <div className="fixed inset-0 flex items-center justify-center p-4 z-[999999]">
              <div className="absolute inset-0 bg-black bg-opacity-90 backdrop-blur-sm" onClick={() => setSelectedTeacher(null)}></div>
              <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border-t-8 border-blue-900 p-8 md:p-12 relative z-[1000000]">
                  <div className="flex justify-between items-center mb-8 border-b pb-4">
                    <h2 className="text-3xl font-extrabold text-blue-900">শিক্ষক সার্ভিস প্রোফাইল</h2>
                    <button onClick={() => setSelectedTeacher(null)} className="text-red-600 text-5xl hover:scale-110 transition leading-none">&times;</button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h3 className="font-bold text-blue-800 border-b pb-1 uppercase text-xs tracking-widest">ব্যক্তিগত তথ্য</h3>
                      <p><strong>নাম (বাংলা):</strong> {selectedTeacher.nameBn || selectedTeacher.nameBN}</p>
                      <p><strong>পিতার নাম:</strong> {selectedTeacher.fatherName || "নেই"}</p>
                      <p><strong>মাতার নাম:</strong> {selectedTeacher.motherName || "নেই"}</p>
                      <p><strong>এনআইডি:</strong> {selectedTeacher.nid || "নেই"}</p>
                      <p><strong>ঠিকানা:</strong> {selectedTeacher.presentAddr || selectedTeacher.address || selectedTeacher.permVillage || "নেই"}</p>
                    </div>
                    <div className="space-y-4">
                      <h3 className="font-bold text-blue-800 border-b pb-1 uppercase text-xs tracking-widest">প্রফেশনাল ও বেতন</h3>
                      <p className="font-bold text-blue-600"><strong>আইবাস আইডি:</strong> {selectedTeacher.ibasId || selectedTeacher.ibasID}</p>
                      <p><strong>পদবী:</strong> {selectedTeacher.designation}</p>
                      <p><strong>বিভাগ:</strong> {selectedTeacher.department}</p>
                      <p className="text-green-700 font-bold"><strong>মূল বেতন:</strong> {selectedTeacher.basicPay || selectedTeacher.basicpay} ৳</p>
                      <p><strong>ইনক্রিমেন্ট ধাপ:</strong> {selectedTeacher.incrementStep || "নেই"}</p>
                    </div>
                    <div className="col-span-full space-y-4 mt-4">
                       <h3 className="font-bold text-blue-800 border-b pb-1 uppercase text-xs tracking-widest">শিক্ষাগত যোগ্যতা ও চাকুরির রেকর্ড</h3>
                       <div className="grid grid-cols-2 gap-4">
                          <p><strong>SSC:</strong> {selectedTeacher.eduSSC || "নেই"}</p>
                          <p><strong>স্নাতক:</strong> {selectedTeacher.eduGrad || "নেই"}</p>
                          <p><strong>যোগদান তারিখ:</strong> {selectedTeacher.firstJoinDate || "নেই"}</p>
                          <p><strong>PRL তারিখ:</strong> {selectedTeacher.prlDate || "নেই"}</p>
                       </div>
                    </div>
                  </div>
                  <button onClick={() => setSelectedTeacher(null)} className="mt-12 w-full bg-blue-900 text-white py-4 rounded-2xl font-bold shadow-2xl hover:bg-black transition-all">বন্ধ করুন</button>
              </div>
           </div>
        )}
      </div>
    </div>
  );
};

export default TeacherDatabase;