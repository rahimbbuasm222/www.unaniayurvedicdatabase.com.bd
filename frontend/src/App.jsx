import React, { useState, useEffect } from 'react';

const TeacherDatabase = () => {
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [formData, setFormData] = useState({
    nameBn: '', nameEn: '', fatherName: '', motherName: '', 
    presentAddr: '', nid: '', designation: '', department: '',
    ibasId: '', basicPay: '', bankAcc: '', routingNumber: ''
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

  useEffect(() => {
    fetchTeachers();
  }, []);

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
        alert("✅ তথ্য সফলভাবে ডাটাবেজে সংরক্ষিত হয়েছে!");
        setFormData({ // ফরম খালি করা
            nameBn: '', nameEn: '', fatherName: '', motherName: '', 
            presentAddr: '', nid: '', designation: '', department: '',
            ibasId: '', basicPay: '', bankAcc: '', routingNumber: ''
        });
        fetchTeachers(); // তালিকা রিফ্রেশ করা
      } else {
        const errorData = await response.json();
        alert("❌ ভুল: " + (errorData.message || "সংরক্ষণে সমস্যা হয়েছে। iBAS ID ইউনিক হতে হবে।"));
      }
    } catch (error) {
      alert("❌ সার্ভার কানেকশন এরর!");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-2 md:p-6 font-sans text-gray-800">
      <div className="max-w-7xl mx-auto bg-white shadow-2xl rounded-xl border-t-8 border-blue-900 overflow-hidden">
        
        {/* Header */}
        <div className="bg-blue-900 text-white py-10 px-6 text-center">
          <h1 className="text-2xl md:text-3xl font-bold mb-2 uppercase">বাংলাদেশ বোর্ড অব ইউনানি অ্যান্ড আয়ুর্বেদিক সিস্টেম অব মেডিসিন</h1>
          <h2 className="text-xl font-semibold text-blue-200">শিক্ষক প্রোফাইল ও বেতন ডাটাবেস (Beta Version)</h2>
        </div>

        <div className="p-4 md:p-8">
          {/* ইনপুট ফরম */}
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-5 bg-white p-6 rounded-2xl border-2 border-blue-50 mb-12 shadow-lg">
             <div className="col-span-full font-bold text-blue-900 border-b-2 border-blue-100 pb-2 mb-2 text-lg">নতুন শিক্ষক তথ্য ইনপুট ফরম</div>
             <input type="text" name="nameBn" value={formData.nameBn} placeholder="নাম (বাংলা)" onChange={handleChange} className="border-2 p-2 rounded focus:border-blue-500 outline-none" required />
             <input type="text" name="nameEn" value={formData.nameEn} placeholder="Name (English)" onChange={handleChange} className="border-2 p-2 rounded focus:border-blue-500 outline-none" />
             <input type="text" name="ibasId" value={formData.ibasId} placeholder="iBAS ID (ইউনিক)" onChange={handleChange} className="border-2 p-2 rounded bg-yellow-50 font-bold" required />
             <input type="text" name="designation" value={formData.designation} placeholder="পদবী" onChange={handleChange} className="border-2 p-2 rounded" />
             <input type="number" name="basicPay" value={formData.basicPay} placeholder="মূল বেতন" onChange={handleChange} className="border-2 p-2 rounded" />
             <input type="text" name="nid" value={formData.nid} placeholder="এনআইডি" onChange={handleChange} className="border-2 p-2 rounded" />
             <input type="text" name="fatherName" value={formData.fatherName} placeholder="পিতার নাম" onChange={handleChange} className="border-2 p-2 rounded" />
             <input type="text" name="motherName" value={formData.motherName} placeholder="মাতার নাম" onChange={handleChange} className="border-2 p-2 rounded" />
             <input type="text" name="presentAddr" value={formData.presentAddr} placeholder="ঠিকানা" onChange={handleChange} className="border-2 p-2 rounded" />
             <button type="submit" className="col-span-full bg-blue-900 text-white font-bold py-4 rounded-xl hover:bg-black transition-all shadow-xl text-lg uppercase tracking-wider">তথ্য ডাটাবেজে সংরক্ষণ করুন</button>
          </form>

          {/* তালিকা টেবিল */}
          <div className="mt-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
               <span className="w-3 h-8 bg-blue-900 mr-3 rounded"></span> সংরক্ষিত শিক্ষকদের তালিকা
            </h2>
            <div className="overflow-x-auto rounded-xl border-2 border-gray-100 shadow-md">
              <table className="w-full text-sm text-left bg-white">
                <thead className="bg-blue-900 text-white font-bold uppercase tracking-wider">
                  <tr>
                    <th className="p-4">শিক্ষকের নাম ও পদবী</th>
                    <th className="p-4">আইবাস ও এনআইডি</th>
                    <th className="p-4">বেতন</th>
                    <th className="p-4 text-center">অ্যাকশন</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {teachers.map((t) => (
                    <tr key={t._id} className="hover:bg-blue-50 transition-colors">
                      <td className="p-4">
                        <div className="font-bold text-blue-900 text-base">{t.nameBn || t.nameEn || t.nameBN || "নাম নেই"}</div>
                        <div className="text-xs text-gray-500 font-medium">{t.designation || "পদবী নেই"}</div>
                      </td>
                      <td className="p-4">
                        <div className="font-mono font-bold text-gray-700 text-sm">ID: {t.ibasId || t.ibasID || "নেই"}</div>
                        <div className="text-[11px] text-gray-500">NID: {t.nid || "নেই"}</div>
                      </td>
                      <td className="p-4 font-bold text-green-700 text-base">{t.basicPay || t.basicpay || 0} ৳</td>
                      <td className="p-4 text-center">
                        <button 
                          onClick={() => setSelectedTeacher(t)} 
                          className="bg-blue-900 text-white px-6 py-2 rounded-full text-[11px] font-bold shadow-md hover:bg-black active:scale-95 transition-all"
                        >
                          সম্পূর্ণ প্রোফাইল
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-slate-900 text-white p-10 mt-12 border-t-4 border-blue-600">
           <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-6">
              <div style={{ width: '80px', height: '80px' }} className="rounded-full border-4 border-blue-400 overflow-hidden bg-white">
                 <img src="/images/my-pic.jpg" alt="AR" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.target.src="https://via.placeholder.com/80?text=AR"; }} />
              </div>
              <div className="text-center md:text-left">
                 <h2 className="text-2xl font-bold tracking-tight text-blue-400">আবদুর রহিম (Abdur Rahim)</h2>
                 <p className="text-gray-300 font-bold text-lg">সেকশন অফিসার (সফটওয়্যার ইঞ্জিনিয়ার)</p>
                 <p className="text-gray-400 text-sm mt-1 italic">বাংলাদেশ বোর্ড অব ইউনানি অ্যান্ড আয়ুর্বেদিক সিস্টেম অব মেডিসিন</p>
              </div>
           </div>
        </footer>

        {/* --- ফিক্সড বিস্তারিত মডাল (Modal) --- */}
        {selectedTeacher && (
           <div className="fixed inset-0 flex items-center justify-center p-4 z-[99999]" style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}>
              {/* মডাল বক্স */}
              <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5)] border-t-8 border-blue-900 p-8 md:p-12 relative">
                  <div className="flex justify-between items-start mb-8 border-b-2 border-blue-50 pb-4">
                    <div>
                        <h2 className="text-3xl font-extrabold text-blue-900">শিক্ষক রেকর্ড</h2>
                        <p className="text-blue-600 font-semibold mt-1">বিস্তারিত সার্ভিস প্রোফাইল তথ্য</p>
                    </div>
                    <button 
                        onClick={() => setSelectedTeacher(null)} 
                        className="bg-red-100 text-red-600 w-12 h-12 rounded-full flex items-center justify-center font-bold text-3xl hover:bg-red-600 hover:text-white transition-all shadow-lg"
                    >&times;</button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                    <div className="space-y-4">
                      <h3 className="text-blue-900 font-bold uppercase text-xs tracking-widest border-b border-gray-200 pb-1">ব্যক্তিগত তথ্য</h3>
                      <p className="text-sm"><strong>নাম (বাংলা):</strong> <br/> <span className="text-gray-800 text-lg font-bold">{selectedTeacher.nameBn || selectedTeacher.nameBN || "প্রদত্ত নয়"}</span></p>
                      <p className="text-sm"><strong>নাম (ইংরেজি):</strong> <br/> <span className="text-gray-800 font-semibold">{selectedTeacher.nameEn || "প্রদত্ত নয়"}</span></p>
                      <p className="text-sm"><strong>পিতার নাম:</strong> <br/> <span className="text-gray-800">{selectedTeacher.fatherName || "প্রদত্ত নয়"}</span></p>
                      <p className="text-sm"><strong>মাতার নাম:</strong> <br/> <span className="text-gray-800">{selectedTeacher.motherName || "প্রদত্ত নয়"}</span></p>
                      <p className="text-sm"><strong>এনআইডি:</strong> <br/> <span className="text-gray-800 font-mono font-bold tracking-wider">{selectedTeacher.nid || "প্রদত্ত নয়"}</span></p>
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-blue-900 font-bold uppercase text-xs tracking-widest border-b border-gray-200 pb-1">অফিসিয়াল রেকর্ড</h3>
                      <p className="text-sm"><strong>আইবাস আইডি:</strong> <br/> <span className="text-blue-700 font-extrabold font-mono text-lg">{selectedTeacher.ibasId || selectedTeacher.ibasID || "প্রদত্ত নয়"}</span></p>
                      <p className="text-sm"><strong>পদবী:</strong> <br/> <span className="text-gray-800 font-semibold">{selectedTeacher.designation || "প্রদত্ত নয়"}</span></p>
                      <p className="text-sm"><strong>বিভাগ:</strong> <br/> <span className="text-gray-800">{selectedTeacher.department || "প্রদত্ত নয়"}</span></p>
                      <p className="text-sm"><strong>মূল বেতন:</strong> <br/> <span className="text-green-700 font-extrabold text-xl">{selectedTeacher.basicPay || selectedTeacher.basicpay || 0} ৳</span></p>
                    </div>
                  </div>

                  <div className="mt-10 bg-blue-50 p-6 rounded-2xl border-2 border-blue-100">
                     <p className="text-sm text-blue-900 leading-relaxed"><strong>বর্তমান ঠিকানা:</strong> <br/> {selectedTeacher.presentAddr || selectedTeacher.address || selectedTeacher.permVillage || "প্রদত্ত নয়"}</p>
                  </div>

                  <button 
                    onClick={() => setSelectedTeacher(null)} 
                    className="mt-10 w-full bg-blue-900 text-white py-4 rounded-2xl font-bold shadow-2xl hover:bg-black hover:scale-[1.01] transition-all duration-300 text-lg uppercase tracking-widest"
                  >
                    বন্ধ করুন
                  </button>
              </div>
           </div>
        )}
      </div>
    </div>
  );
};

export default TeacherDatabase;