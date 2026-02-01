import React, { useState, useEffect } from 'react';

const TeacherDatabase = () => {
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  
  const [formData, setFormData] = useState({
    serialNo: '', nameBn: '', nameEn: '', designation: '', nid: '', dob: '', fatherName: '', motherName: '', mobile: '',
    eduSSC: '', eduHSC: '', eduDAMS: '', eduDUMS: '', eduBUMS: '', eduGraduation: '', eduPostGraduation: '',
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
    setFormData({ serialNo: '', nameBn: '', nameEn: '', designation: '', nid: '', dob: '', fatherName: '', motherName: '', mobile: '', eduSSC: '', eduHSC: '', eduDAMS: '', eduDUMS: '', eduBUMS: '', eduGraduation: '', eduPostGraduation: '', joinDate: '', promotionDate: '', payScale: '', basicPay: '', boardRegNo: '', serviceLength: '', prlDate: '', bankAcc: '', bankName: '', ibasId: '' });
    setIsEditing(false); setEditId(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-2 md:p-6 font-sans text-gray-800 pb-20">
      <div className="max-w-7xl mx-auto bg-white shadow-2xl rounded-3xl border-t-8 border-blue-900 overflow-hidden">
        
        {/* Header */}
        <div className="bg-blue-900 text-white py-10 px-6 text-center">
          <h1 className="text-xl md:text-3xl font-bold uppercase">বাংলাদেশ বোর্ড অব ইউনানি অ্যান্ড আয়ুর্বেদিক সিস্টেম অব মেডিসিন</h1>
          <p className="text-blue-200 mt-2 font-semibold">অফিশিয়াল ডিজিটাল সার্ভিস ডাটাবেজ (১-১৯ পয়েন্ট)</p>
        </div>

        <div className="p-4 md:p-8">
          {/* ইনপুট ফরম */}
          <form onSubmit={handleSubmit} className="p-6 md:p-10 rounded-3xl border-2 bg-blue-50 border-blue-100 shadow-inner">
            <h3 className="font-bold text-blue-900 border-b pb-4 mb-6 text-xl">➕ তথ্য এন্ট্রি ফরম (সব ফিল্ডসহ)</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-sm">
               <div className="col-span-full font-bold text-blue-800 border-l-4 border-blue-900 pl-2">১-৯: ব্যক্তিগত তথ্য</div>
               <input type="text" name="serialNo" value={formData.serialNo} placeholder="১. ক্রমিক নং" onChange={handleChange} className="p-2 border rounded-lg" />
               <input type="text" name="nameBn" value={formData.nameBn} placeholder="২. নাম (বাংলা)*" onChange={handleChange} className="p-2 border rounded-lg" required />
               <input type="text" name="designation" value={formData.designation} placeholder="৪. পদবী" onChange={handleChange} className="p-2 border rounded-lg" />
               <input type="text" name="nid" value={formData.nid} placeholder="৫. এনআইডি নম্বর" onChange={handleChange} className="p-2 border rounded-lg" />
               <input type="text" name="mobile" value={formData.mobile} placeholder="৯. মোবাইল নম্বর" onChange={handleChange} className="p-2 border rounded-lg" />

               <div className="col-span-full font-bold text-blue-800 border-l-4 border-blue-900 pl-2 mt-4">১০: শিক্ষাগত যোগ্যতা</div>
               <input type="text" name="eduSSC" value={formData.eduSSC} placeholder="SSC তথ্য" onChange={handleChange} className="p-2 border rounded-lg" />
               <input type="text" name="eduHSC" value={formData.eduHSC} placeholder="HSC তথ্য" onChange={handleChange} className="p-2 border rounded-lg" />
               <input type="text" name="eduGraduation" value={formData.eduGraduation} placeholder="স্নাতক (Graduation)" onChange={handleChange} className="p-2 border rounded-lg" />
               <input type="text" name="eduPostGraduation" value={formData.eduPostGraduation} placeholder="স্নাতকোত্তর (Post-Grad)" onChange={handleChange} className="p-2 border rounded-lg" />

               <div className="col-span-full font-bold text-blue-800 border-l-4 border-blue-900 pl-2 mt-4">১১-১৯: চাকুরি ও ব্যাংক রেকর্ড</div>
               <div className="flex flex-col"><label className="text-[10px]">১১. যোগদান তারিখ</label><input type="date" name="joinDate" value={formData.joinDate} onChange={handleChange} className="p-2 border rounded-xl" /></div>
               <div className="flex flex-col"><label className="text-[10px]">১২. পদোন্নতির তারিখ</label><input type="date" name="promotionDate" value={formData.promotionDate} onChange={handleChange} className="p-2 border rounded-xl" /></div>
               <input type="text" name="payScale" value={formData.payScale} placeholder="১৩. প্রাপ্ত বেতন স্কেল" onChange={handleChange} className="p-2 border rounded-xl" />
               <input type="number" name="basicPay" value={formData.basicPay} placeholder="১৪. বর্তমান মূল বেতন" onChange={handleChange} className="p-2 border rounded-xl font-bold" />
               <input type="text" name="boardRegNo" value={formData.boardRegNo} placeholder="১৫. বোর্ড নিবন্ধন নং" onChange={handleChange} className="p-2 border rounded-xl font-bold text-blue-700" />
            </div>
            <button type="submit" className="w-full mt-10 py-4 bg-blue-900 text-white font-bold rounded-2xl shadow-xl uppercase hover:bg-black transition-all">তথ্য সংরক্ষণ করুন</button>
          </form>

          {/* তালিকা */}
          <div className="mt-16 overflow-x-auto rounded-3xl border shadow-xl bg-white">
            <h2 className="text-2xl font-bold p-6 border-b text-gray-800">সংরক্ষিত তালিকা</h2>
            <table className="w-full text-sm text-left">
              <thead className="bg-blue-900 text-white font-bold uppercase">
                <tr><th className="p-5">SL & নাম</th><th className="p-5">পদবী ও বেতন</th><th className="p-5 text-center">অ্যাকশন</th></tr>
              </thead>
              <tbody className="divide-y">
                {teachers.map((t) => (
                  <tr key={t._id} className="hover:bg-slate-50 transition border-b">
                    <td className="p-5"><div className="text-xs text-gray-400">#{t.serialNo}</div><div className="font-bold text-blue-900 text-base">{t.nameBn}</div></td>
                    <td className="p-5"><div>{t.designation}</div><div className="font-bold text-green-700">{t.basicPay} ৳</div></td>
                    <td className="p-5 text-center">
                        <button onClick={() => { setSelectedTeacher(t); setTimeout(()=>document.getElementById('full-profile-view')?.scrollIntoView({behavior:'smooth'}), 100); }} className="bg-blue-600 text-white px-8 py-2 rounded-full text-xs font-bold shadow hover:bg-black">বিস্তারিত দেখুন</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ৩. বিস্তারিত প্রোফাইল কার্ড (১৯টি পয়েন্ট সিরিয়ালি সাজানো) */}
        {selectedTeacher && (
           <div id="full-profile-view" className="m-4 md:m-8 p-8 bg-white rounded-3xl border-4 border-blue-900 shadow-2xl animate-pulse-once">
                <div className="flex justify-between items-center mb-8 border-b-4 border-blue-900 pb-4">
                    <h2 className="text-2xl font-bold text-blue-900 uppercase">📋 সার্ভিস প্রোফাইল রেকর্ড (১-১৯ পয়েন্ট)</h2>
                    <button onClick={() => setSelectedTeacher(null)} className="bg-red-500 text-white px-6 py-2 rounded-xl font-bold">বন্ধ করুন</button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-base text-gray-800">
                    <div className="space-y-3">
                        <h3 className="bg-blue-900 text-white px-3 py-1 rounded text-xs inline-block uppercase font-bold tracking-widest">১-৯: ব্যক্তিগত তথ্য</h3>
                        <p className="border-b py-1"><strong>১. ক্রমিক নং:</strong> {selectedTeacher.serialNo}</p>
                        <p className="border-b py-1"><strong>২. নাম (বাংলা):</strong> <span className="font-bold text-blue-900">{selectedTeacher.nameBn}</span></p>
                        <p className="border-b py-1"><strong>৩. নাম (ইংরেজি):</strong> {selectedTeacher.nameEn || "নেই"}</p>
                        <p className="border-b py-1"><strong>৪. পদবী:</strong> {selectedTeacher.designation}</p>
                        <p className="border-b py-1"><strong>৫. এনআইডি নম্বর:</strong> {selectedTeacher.nid}</p>
                        <p className="border-b py-1"><strong>৬. জন্ম তারিখ:</strong> {selectedTeacher.dob}</p>
                        <p className="border-b py-1"><strong>৭. পিতার নাম:</strong> {selectedTeacher.fatherName}</p>
                        <p className="border-b py-1"><strong>৮. মাতার নাম:</strong> {selectedTeacher.motherName}</p>
                        <p className="border-b py-1 text-blue-700 font-bold"><strong>৯. মোবাইল:</strong> {selectedTeacher.mobile}</p>
                    </div>

                    <div className="space-y-3">
                        <h3 className="bg-blue-900 text-white px-3 py-1 rounded text-xs inline-block uppercase font-bold tracking-widest">১০: শিক্ষাগত যোগ্যতা</h3>
                        <p className="border-b py-1"><strong>SSC তথ্য:</strong> {selectedTeacher.eduSSC || "প্রদত্ত নয়"}</p>
                        <p className="border-b py-1"><strong>HSC তথ্য:</strong> {selectedTeacher.eduHSC || "প্রদত্ত নয়"}</p>
                        <p className="border-b py-1"><strong>স্নাতক (Graduation):</strong> {selectedTeacher.eduGraduation || "প্রদত্ত নয়"}</p>
                        <p className="border-b py-1"><strong>স্নাতকোত্তর (Post-Grad):</strong> {selectedTeacher.eduPostGraduation || "প্রদত্ত নয়"}</p>
                        <p className="border-b py-1 text-blue-700 font-bold"><strong>DAMS/DUMS:</strong> {selectedTeacher.eduDAMS} / {selectedTeacher.eduDUMS}</p>

                        <h3 className="bg-blue-900 text-white px-3 py-1 rounded text-xs inline-block uppercase font-bold tracking-widest mt-4">১১-১৯: চাকুরি ও ব্যাংক রেকর্ড</h3>
                        <p className="border-b py-1"><strong>১১. যোগদানের তারিখ:</strong> {selectedTeacher.joinDate}</p>
                        <p className="border-b py-1 text-blue-900 font-bold"><strong>১২. পদোন্নতির তারিখ:</strong> {selectedTeacher.promotionDate || "নেই"}</p>
                        <p className="border-b py-1"><strong>১৩. বেতন স্কেল:</strong> {selectedTeacher.payScale || "নেই"}</p>
                        <p className="border-b py-1 text-green-700 font-bold"><strong>১৪. বর্তমান মূল বেতন:</strong> {selectedTeacher.basicPay} ৳</p>
                        <p className="border-b py-1 text-blue-700 font-bold"><strong>১৫. বোর্ড নিবন্ধন:</strong> {selectedTeacher.boardRegNo || "নেই"}</p>
                        <p className="border-b py-1"><strong>১৭. PRL তারিখ:</strong> {selectedTeacher.prlDate || "নেই"}</p>
                        <p className="border-b py-1"><strong>১৮. ব্যাংক হিসাব নম্বর:</strong> {selectedTeacher.bankAcc || "নেই"}</p>
                    </div>
                </div>
           </div>
        )}

        {/* Footer */}
        <footer className="bg-slate-900 text-white p-8 mt-12 flex flex-col md:flex-row items-center gap-6">
            <img src="/images/my-pic.jpg" alt="AR" style={{ width: '50px', height: '50px' }} className="rounded-full border-2 border-blue-400 object-cover" />
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