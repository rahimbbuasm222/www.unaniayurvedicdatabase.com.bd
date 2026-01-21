import React, { useState, useEffect } from 'react';

const TeacherDatabase = () => {
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [formData, setFormData] = useState({
    nameBn: '', nameEn: '', fatherName: '', motherName: '', 
    presentAddr: '', nid: '', designation: '', department: '',
    ibasId: '', basicPay: '', bankAcc: '', bankName: '', routingNumber: ''
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
    // Routing Number চেক করা কারণ এটি ডাটাবেজে mandatory
    if (!formData.routingNumber) {
      alert("ভুল: রাউটিং নম্বর অবশ্যই দিতে হবে!");
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert("✅ তথ্য সফলভাবে ডাটাবেজে সংরক্ষিত হয়েছে!");
        setFormData({
          nameBn: '', nameEn: '', fatherName: '', motherName: '', 
          presentAddr: '', nid: '', designation: '', department: '',
          ibasId: '', basicPay: '', bankAcc: '', bankName: '', routingNumber: ''
        });
        fetchTeachers();
      } else {
        const errorData = await response.json();
        alert("❌ ডাটাবেজ এরর: " + (errorData.message || "আইবাস আইডি ইউনিক হতে হবে।"));
      }
    } catch (error) {
      alert("❌ সার্ভার কানেকশন এরর!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-2 md:p-6 font-sans text-gray-800">
      <div className="max-w-7xl mx-auto bg-white shadow-2xl rounded-xl border-t-8 border-blue-900 overflow-hidden">
        
        {/* Header */}
        <div className="bg-blue-900 text-white py-10 px-6 text-center">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">বাংলাদেশ বোর্ড অব ইউনানি অ্যান্ড আয়ুর্বেদিক সিস্টেম অব মেডিসিন</h1>
          <h2 className="text-xl font-semibold text-blue-200">শিক্ষক প্রোফাইল ও বেতন ডাটাবেস (Beta Version)</h2>
        </div>

        <div className="p-4 md:p-8">
          {/* ইনপুট ফরম - Routing Number যোগ করা হয়েছে */}
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-5 bg-blue-50 p-6 rounded-2xl border-2 border-blue-100 mb-12 shadow-md">
             <div className="col-span-full font-bold text-blue-900 border-b-2 border-blue-200 pb-2 mb-2 text-lg font-serif">নতুন শিক্ষক তথ্য এন্ট্রি ফরম</div>
             
             <input type="text" name="nameBn" value={formData.nameBn} placeholder="নাম (বাংলা)*" onChange={handleChange} className="border-2 p-2 rounded bg-white outline-none focus:border-blue-500" required />
             <input type="text" name="ibasId" value={formData.ibasId} placeholder="iBAS ID (১১ ডিজিট)*" onChange={handleChange} className="border-2 p-2 rounded bg-yellow-50 font-bold outline-none focus:border-blue-500" required />
             <input type="text" name="routingNumber" value={formData.routingNumber} placeholder="রাউটিং নম্বর (৯ ডিজিট)*" onChange={handleChange} className="border-2 p-2 rounded bg-red-50 outline-none focus:border-red-500" required />
             
             <input type="text" name="designation" value={formData.designation} placeholder="পদবী" onChange={handleChange} className="border-2 p-2 rounded bg-white" />
             <input type="number" name="basicPay" value={formData.basicPay} placeholder="মূল বেতন" onChange={handleChange} className="border-2 p-2 rounded bg-white" />
             <input type="text" name="nid" value={formData.nid} placeholder="এনআইডি নম্বর" onChange={handleChange} className="border-2 p-2 rounded bg-white" />
             <input type="text" name="bankName" value={formData.bankName} placeholder="ব্যাংকের নাম" onChange={handleChange} className="border-2 p-2 rounded bg-white" />
             <input type="text" name="bankAcc" value={formData.bankAcc} placeholder="ব্যাংক একাউন্ট" onChange={handleChange} className="border-2 p-2 rounded bg-white" />
             <input type="text" name="fatherName" value={formData.fatherName} placeholder="পিতার নাম" onChange={handleChange} className="border-2 p-2 rounded bg-white" />

             <button type="submit" className="col-span-full bg-blue-900 text-white font-bold py-4 rounded-xl hover:bg-black transition-all shadow-xl text-lg uppercase">ডাটাবেজে তথ্য সংরক্ষণ করুন</button>
          </form>

          {/* তালিকা টেবিল */}
          <div className="mt-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
               <span className="w-3 h-8 bg-blue-900 mr-3 rounded"></span> সংরক্ষিত শিক্ষকদের তালিকা
            </h2>
            <div className="overflow-x-auto rounded-xl border-2 border-gray-200">
              <table className="w-full text-sm text-left">
                <thead className="bg-blue-900 text-white font-bold">
                  <tr>
                    <th className="p-4 border-b">নাম ও পদবী</th>
                    <th className="p-4 border-b">আইবাস ও এনআইডি</th>
                    <th className="p-4 border-b text-center">অ্যাকশন</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {teachers.map((t) => (
                    <tr key={t._id} className="hover:bg-blue-50 transition-colors bg-white">
                      <td className="p-4">
                        <div className="font-bold text-blue-900">{t.nameBn || t.nameBN || "নাম নেই"}</div>
                        <div className="text-xs text-gray-500">{t.designation || "পদবী নেই"}</div>
                      </td>
                      <td className="p-4 font-mono">
                        <div className="font-bold">ID: {t.ibasId || t.ibasID}</div>
                        <div className="text-[10px] text-gray-400">NID: {t.nid}</div>
                      </td>
                      <td className="p-4 text-center">
                        <button 
                          onClick={() => setSelectedTeacher(t)} 
                          className="bg-blue-800 text-white px-5 py-2 rounded-full text-[10px] font-bold shadow hover:bg-black transition active:scale-95"
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

        {/* Footer (আব্দুর রহিম ভাইয়ের ব্র্যান্ডিং) */}
        <footer className="bg-slate-900 text-white p-10 mt-12 border-t-4 border-blue-600 flex flex-col md:flex-row items-center gap-6">
            <img src="/images/my-pic.jpg" alt="AR" style={{ width: '60px', height: '60px' }} className="rounded-full border-2 border-blue-400" onError={(e) => e.target.src="https://via.placeholder.com/60"} />
            <div>
               <h2 className="text-xl font-bold">আবদুর রহিম (Abdur Rahim)</h2>
               <p className="text-blue-400 text-sm">সেকশন অফিসার (সফটওয়্যার ইঞ্জিনিয়ার) | BBUASM</p>
            </div>
        </footer>

        {/* --- ফিক্সড বিস্তারিত মডাল (Modal) --- */}
        {selectedTeacher && (
           <div className="fixed inset-0 flex items-center justify-center p-4 z-[999999]">
              {/* ব্যাকগ্রাউন্ড অন্ধকার করার জন্য */}
              <div className="absolute inset-0 bg-black bg-opacity-90" onClick={() => setSelectedTeacher(null)}></div>
              
              {/* মডাল বক্স - একদম সলিড সাদা ব্যাকগ্রাউন্ড */}
              <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl border-t-8 border-blue-900 p-8 md:p-12 relative z-[1000000]">
                  <div className="flex justify-between items-center mb-8 border-b-2 border-gray-100 pb-4">
                    <h2 className="text-3xl font-extrabold text-blue-900">শিক্ষক সার্ভিস রেকর্ড</h2>
                    <button onClick={() => setSelectedTeacher(null)} className="text-red-600 text-5xl hover:scale-110 transition leading-none">&times;</button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-base">
                    <div className="space-y-4">
                      <p className="bg-gray-50 p-2 rounded"><strong>নাম (বাংলা):</strong> <br/> {selectedTeacher.nameBn || selectedTeacher.nameBN || "প্রদত্ত নয়"}</p>
                      <p><strong>পিতার নাম:</strong> {selectedTeacher.fatherName || "প্রদত্ত নয়"}</p>
                      <p><strong>মাতার নাম:</strong> {selectedTeacher.motherName || "প্রদত্ত নয়"}</p>
                      <p className="font-mono"><strong>এনআইডি:</strong> {selectedTeacher.nid || "প্রদত্ত নয়"}</p>
                    </div>
                    <div className="space-y-4">
                      <p className="bg-blue-50 p-2 rounded text-blue-900 font-bold font-mono"><strong>আইবাস আইডি:</strong> {selectedTeacher.ibasId || selectedTeacher.ibasID || "প্রদত্ত নয়"}</p>
                      <p><strong>পদবী:</strong> {selectedTeacher.designation || "প্রদত্ত নয়"}</p>
                      <p className="text-green-700 font-bold"><strong>মূল বেতন:</strong> {selectedTeacher.basicPay || selectedTeacher.basicpay || 0} ৳</p>
                      <p className="bg-red-50 p-2 rounded font-mono"><strong>রাউটিং নম্বর:</strong> {selectedTeacher.routingNumber || "প্রদত্ত নয়"}</p>
                    </div>
                  </div>

                  <button 
                    onClick={() => setSelectedTeacher(null)} 
                    className="mt-12 w-full bg-blue-900 text-white py-4 rounded-2xl font-bold shadow-2xl hover:bg-black transition-all text-lg uppercase tracking-widest"
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