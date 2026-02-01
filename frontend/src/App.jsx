import React, { useState, useEffect } from 'react';

const TeacherDatabase = () => {
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  
  const [formData, setFormData] = useState({
    serialNo: '', nameBn: '', nameEn: '', designation: '', nid: '', dob: '', fatherName: '', motherName: '', mobile: '',
    eduSSC: '', eduHSC: '', eduDAMS: '', eduDUMS: '', eduBUMS: '', eduGraduation: '', eduPostGraduation: '',
    joinDate: '', promotionDate: '', payScale: '', basicPay: '', boardRegNo: '', serviceLength: '', prlDate: '', bankAcc: '', bankName: '', bankBranch: '', ibasId: ''
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
    setFormData({ serialNo: '', nameBn: '', nameEn: '', designation: '', nid: '', dob: '', fatherName: '', motherName: '', mobile: '', eduSSC: '', eduHSC: '', eduDAMS: '', eduDUMS: '', eduBUMS: '', eduGraduation: '', eduPostGraduation: '', joinDate: '', promotionDate: '', payScale: '', basicPay: '', boardRegNo: '', serviceLength: '', prlDate: '', bankAcc: '', bankName: '', bankBranch: '', ibasId: '' });
    setIsEditing(false); setEditId(null);
  };

  return (
    <div className="min-h-screen bg-slate-100 p-2 md:p-6 font-sans text-gray-800 pb-20">
      <div className="max-w-7xl mx-auto bg-white shadow-2xl rounded-3xl border-t-8 border-blue-900 overflow-hidden">
        
        {/* Header */}
        <div className="bg-blue-900 text-white py-10 px-6 text-center">
          <h1 className="text-xl md:text-3xl font-bold uppercase">বাংলাদেশ বোর্ড অব ইউনানি অ্যান্ড আয়ুর্বেদিক সিস্টেম অব মেডিসিন</h1>
          <p className="text-blue-200 mt-2 font-semibold">অফিশিয়াল এমপ্লয়ী ও শিক্ষক ডিজিটাল ডাটাবেজ</p>
        </div>

        <div className="p-4 md:p-8">
          {/* ইনপুট ফরম */}
          <form onSubmit={handleSubmit} className={`p-6 md:p-10 rounded-3xl border-2 shadow-inner transition-all ${isEditing ? 'bg-green-50 border-green-200' : 'bg-blue-50 border-blue-100'}`}>
            <h3 className="font-bold text-blue-900 border-b pb-4 mb-6 text-xl">{isEditing ? "📝 তথ্য সংশোধন" : "➕ নতুন তথ্য ইনপুট ফরম (সব তথ্যসহ)"}</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
               <div className="col-span-full font-bold text-blue-800 border-l-4 border-blue-900 pl-2">১-৯: ব্যক্তিগত তথ্য</div>
               <input type="text" name="serialNo" value={formData.serialNo} placeholder="১. ক্রমিক নং" onChange={handleChange} className="p-2 border rounded-xl" />
               <input type="text" name="nameBn" value={formData.nameBn} placeholder="২. নাম (বাংলা)*" onChange={handleChange} className="p-2 border rounded-xl" required />
               <input type="text" name="nameEn" value={formData.nameEn} placeholder="৩. নাম (ইংরেজি)" onChange={handleChange} className="p-2 border rounded-xl" />
               <input type="text" name="designation" value={formData.designation} placeholder="৪. পদবী" onChange={handleChange} className="p-2 border rounded-xl" />
               <input type="text" name="nid" value={formData.nid} placeholder="৫. এনআইডি নম্বর" onChange={handleChange} className="p-2 border rounded-xl" />
               <div className="flex flex-col"><label className="text-[10px]">৬. জন্ম তারিখ</label><input type="date" name="dob" value={formData.dob} onChange={handleChange} className="p-2 border rounded-xl" /></div>
               <input type="text" name="fatherName" value={formData.fatherName} placeholder="৭. পিতার নাম" onChange={handleChange} className="p-2 border rounded-xl" />
               <input type="text" name="motherName" value={formData.motherName} placeholder="৮. মাতার নাম" onChange={handleChange} className="p-2 border rounded-xl" />
               <input type="text" name="mobile" value={formData.mobile} placeholder="৯. মোবাইল নম্বর" onChange={handleChange} className="p-2 border rounded-xl" />

               <div className="col-span-full font-bold text-blue-800 border-l-4 border-blue-900 pl-2 mt-4">১০: শিক্ষাগত যোগ্যতা</div>
               <input type="text" name="eduSSC" value={formData.eduSSC} placeholder="SSC তথ্য" onChange={handleChange} className="p-2 border rounded-xl" />
               <input type="text" name="eduDAMS" value={formData.eduDAMS} placeholder="DAMS তথ্য" onChange={handleChange} className="p-2 border rounded-xl" />
               <input type="text" name="eduGraduation" value={formData.eduGraduation} placeholder="স্নাতক (Graduation)" onChange={handleChange} className="p-2 border rounded-xl" />
               <input type="text" name="eduPostGraduation" value={formData.eduPostGraduation} placeholder="স্নাতকোত্তর (Post-Graduation)" onChange={handleChange} className="p-2 border rounded-xl" />

               <div className="col-span-full font-bold text-blue-800 border-l-4 border-blue-900 pl-2 mt-4">১১-১৯: চাকুরি ও ব্যাংক তথ্য</div>
               <input type="number" name="basicPay" value={formData.basicPay} placeholder="১৪. মূল বেতন" onChange={handleChange} className="p-2 border rounded-xl font-bold" />
               <input type="text" name="boardRegNo" value={formData.boardRegNo} placeholder="১৫. বোর্ড নিবন্ধন নম্বর" onChange={handleChange} className="p-2 border rounded-xl" />
               <input type="text" name="bankAcc" value={formData.bankAcc} placeholder="১৮. ব্যাংক হিসাব নম্বর" onChange={handleChange} className="p-2 border rounded-xl" />
            </div>
            <button type="submit" className="w-full mt-8 py-4 bg-blue-900 text-white font-bold rounded-2xl shadow-xl uppercase">তথ্য সংরক্ষণ করুন</button>
          </form>

          {/* তালিকা */}
          <div className="mt-12 overflow-x-auto rounded-3xl border shadow-xl bg-white">
            <table className="w-full text-sm text-left">
              <thead className="bg-blue-900 text-white font-bold uppercase">
                <tr><th className="p-5">শিক্ষকের নাম</th><th className="p-5 text-center">অ্যাকশন</th></tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {teachers.map((t) => (
                  <tr key={t._id} className="hover:bg-slate-50 transition border-b">
                    <td className="p-5 font-bold text-blue-900 uppercase">{t.nameBn}</td>
                    <td className="p-5 text-center">
                        <button onClick={() => { setSelectedTeacher(t); setTimeout(()=>document.getElementById('full-view')?.scrollIntoView({behavior:'smooth'}), 100); }} className="bg-blue-600 text-white px-5 py-2 rounded-full text-[10px] font-bold shadow transition hover:bg-blue-800">বিস্তারিত</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ৩. বিস্তারিত প্রোফাইল (ফিক্সড ভিউ) */}
        {selectedTeacher && (
           <div id="full-view" className="m-4 md:m-8 p-8 bg-white rounded-3xl border-4 border-blue-900 shadow-2xl">
                <div className="flex justify-between items-center mb-8 border-b-4 border-blue-900 pb-4">
                    <h2 className="text-2xl font-bold text-blue-900 uppercase">📋 সার্ভিস প্রোফাইল রেকর্ড</h2>
                    <button onClick={() => setSelectedTeacher(null)} className="bg-red-500 text-white px-6 py-2 rounded-xl font-bold">বন্ধ করুন</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-base text-gray-800">
                    <div className="space-y-4">
                        <h3 className="bg-blue-900 text-white px-3 py-1 rounded text-xs inline-block uppercase font-bold tracking-widest">ব্যক্তিগত তথ্য</h3>
                        <p className="border-b py-1"><strong>নাম:</strong> <span className="font-bold text-blue-900">{selectedTeacher.nameBn}</span></p>
                        <p className="border-b py-1"><strong>পিতার নাম:</strong> <span>{selectedTeacher.fatherName}</span></p>
                        <p className="border-b py-1"><strong>এনআইডি:</strong> <span>{selectedTeacher.nid}</span></p>
                        <p className="border-b py-1"><strong>মোবাইল:</strong> <span>{selectedTeacher.mobile}</span></p>
                    </div>
                    <div className="space-y-4">
                        <h3 className="bg-blue-900 text-white px-3 py-1 rounded text-xs inline-block uppercase font-bold tracking-widest">শিক্ষা ও চাকুরি</h3>
                        <p className="border-b py-1"><strong>স্নাতক (Graduation):</strong> {selectedTeacher.eduGraduation || "নেই"}</p>
                        <p className="border-b py-1"><strong>স্নাতকোত্তর (PostGrad):</strong> {selectedTeacher.eduPostGraduation || "নেই"}</p>
                        <p className="border-b py-1 text-green-700 font-bold"><strong>মূল বেতন:</strong> {selectedTeacher.basicPay} ৳</p>
                        <p className="border-b py-1 text-blue-700 font-bold"><strong>বোর্ড নিবন্ধন:</strong> {selectedTeacher.boardRegNo || "নেই"}</p>
                    </div>
                </div>
           </div>
        )}

        {/* Footer */}
        <footer className="bg-slate-900 text-white p-8 mt-12 flex flex-col md:flex-row items-center gap-6">
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