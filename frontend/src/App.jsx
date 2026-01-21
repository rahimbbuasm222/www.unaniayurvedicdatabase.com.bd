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

  // ডেটা ফেচ করার ফাংশন
  const fetchTeachers = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      if (Array.isArray(data)) {
        setTeachers(data);
      }
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
        alert("তথ্য সফলভাবে ডাটাবেজে সংরক্ষিত হয়েছে!");
        fetchTeachers();
      }
    } catch (error) {
      alert("সংরক্ষণে সমস্যা হয়েছে!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-2 md:p-6 font-sans text-gray-800">
      <div className="max-w-7xl mx-auto bg-white shadow-2xl rounded-2xl border-t-8 border-blue-900">
        
        {/* Header */}
        <div className="bg-blue-900 text-white py-10 px-6 text-center">
          <h1 className="text-2xl md:text-3xl font-bold mb-2 uppercase">বাংলাদেশ বোর্ড অব ইউনানি অ্যান্ড আয়ুর্বেদিক সিস্টেম অব মেডিসিন</h1>
          <h2 className="text-xl font-semibold text-blue-200 underline">শিক্ষক প্রোফাইল ও বেতন ডাটাবেস (Beta Version)</h2>
        </div>

        <div className="p-4 md:p-8">
          {/* ইনপুট ফরম */}
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-blue-50 p-6 rounded-2xl border border-blue-100 mb-12">
             <div className="col-span-full font-bold text-blue-900 border-b border-blue-200 pb-2 mb-2">নতুন শিক্ষক তথ্য ইনপুট ফরম</div>
             <input type="text" name="nameBn" placeholder="নাম (বাংলা)" onChange={handleChange} className="border p-2 rounded shadow-sm" required />
             <input type="text" name="ibasId" placeholder="iBAS ID" onChange={handleChange} className="border p-2 rounded bg-yellow-50 font-bold" required />
             <input type="text" name="designation" placeholder="পদবী" onChange={handleChange} className="border p-2 rounded" />
             <input type="number" name="basicPay" placeholder="মূল বেতন" onChange={handleChange} className="border p-2 rounded" />
             <input type="text" name="nid" placeholder="এনআইডি" onChange={handleChange} className="border p-2 rounded" />
             <button type="submit" className="col-span-full bg-blue-900 text-white font-bold py-3 rounded-xl hover:bg-black transition duration-300">ডাটাবেজে সেভ করুন</button>
          </form>

          {/* তালিকা টেবিল */}
          <div className="mt-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
               <span className="w-3 h-8 bg-blue-900 mr-3 rounded"></span> সংরক্ষিত শিক্ষকদের তালিকা
            </h2>
            <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
              <table className="w-full text-sm text-left">
                <thead className="bg-blue-900 text-white font-bold uppercase tracking-wider">
                  <tr>
                    <th className="p-4">শিক্ষকের নাম ও পদবী</th>
                    <th className="p-4">আইবাস ও এনআইডি</th>
                    <th className="p-4">বেতন</th>
                    <th className="p-4 text-center">অ্যাকশন</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {teachers.map((t) => (
                    <tr key={t._id} className="hover:bg-blue-50 transition-colors">
                      <td className="p-4">
                        <div className="font-bold text-blue-900 text-base">{t.nameBn || t.nameBN || "নাম নেই"}</div>
                        <div className="text-xs text-gray-500 font-medium">{t.designation || "পদবী নেই"}</div>
                      </td>
                      <td className="p-4">
                        <div className="font-mono font-bold text-gray-700">ID: {t.ibasId || t.ibasID || "নেই"}</div>
                        <div className="text-[11px] text-gray-400">NID: {t.nid || "নেই"}</div>
                      </td>
                      <td className="p-4 font-bold text-green-700 text-base">{t.basicPay || t.basicpay || 0} ৳</td>
                      <td className="p-4 text-center">
                        <button 
                          onClick={() => {
                            console.log("Selected:", t); // Debug log
                            setSelectedTeacher(t);
                          }} 
                          className="bg-blue-900 text-white px-6 py-2 rounded-full text-[11px] font-bold shadow-lg hover:bg-black active:scale-95 transition-all"
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

        {/* Footer (আব্দুর রহিম ভাইয়ের প্রোফাইল) */}
        <footer className="bg-gray-900 text-white p-10 mt-12 border-t-4 border-blue-600">
           <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-6">
              <div style={{ width: '70px', height: '70px' }} className="rounded-full border-2 border-blue-400 overflow-hidden bg-gray-800">
                 <img src="/images/my-pic.jpg" alt="AR" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => e.target.src="https://via.placeholder.com/70?text=AR"} />
              </div>
              <div className="text-center md:text-left">
                 <h2 className="text-2xl font-bold tracking-tight">আবদুর রহিম (Abdur Rahim)</h2>
                 <p className="text-blue-400 font-bold">সেকশন অফিসার (সফটওয়্যার ইঞ্জিনিয়ার)</p>
                 <p className="text-gray-400 text-sm mt-1 italic">বাংলাদেশ বোর্ড অব ইউনানি অ্যান্ড আয়ুর্বেদিক সিস্টেম অব মেডিসিন</p>
              </div>
           </div>
        </footer>

        {/* --- শক্তিশালী এবং ফিক্সড মডাল (Modal) --- */}
        {selectedTeacher && (
           <div 
             className="fixed inset-0 flex items-center justify-center p-4" 
             style={{ zIndex: 100000, position: 'fixed', top: 0, left: 0, width: '100%', height: '100%' }}
           >
              {/* অন্ধকার ব্যাকগ্রাউন্ড */}
              <div 
                className="absolute inset-0 bg-black bg-opacity-80 backdrop-blur-md" 
                onClick={() => setSelectedTeacher(null)}
              ></div>
              
              {/* মডাল কন্টেন্ট বক্স */}
              <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl border-t-8 border-blue-900 p-6 md:p-12 relative z-[100001] animate-in fade-in zoom-in duration-300">
                  <div className="flex justify-between items-start mb-8 border-b pb-4">
                    <div>
                        <h2 className="text-3xl font-extrabold text-blue-900">শিক্ষক রেকর্ড</h2>
                        <p className="text-gray-500 text-sm mt-1">বিস্তারিত সার্ভিস প্রোফাইল তথ্য</p>
                    </div>
                    <button 
                        onClick={() => setSelectedTeacher(null)} 
                        className="bg-red-100 text-red-600 w-10 h-10 rounded-full flex items-center justify-center font-bold text-2xl hover:bg-red-600 hover:text-white transition-all"
                    >&times;</button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h3 className="text-blue-900 font-bold uppercase text-xs tracking-widest border-b border-gray-100 pb-1">ব্যক্তিগত তথ্য</h3>
                      <p className="text-sm"><strong>নাম (বাংলা):</strong> <br/> <span className="text-gray-700 text-base">{selectedTeacher.nameBn || selectedTeacher.nameBN || "প্রদত্ত নয়"}</span></p>
                      <p className="text-sm"><strong>পিতার নাম:</strong> <br/> <span className="text-gray-700">{selectedTeacher.fatherName || "প্রদত্ত নয়"}</span></p>
                      <p className="text-sm"><strong>এনআইডি:</strong> <br/> <span className="text-gray-700 font-mono">{selectedTeacher.nid || "প্রদত্ত নয়"}</span></p>
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-blue-900 font-bold uppercase text-xs tracking-widest border-b border-gray-100 pb-1">অফিসিয়াল রেকর্ড</h3>
                      <p className="text-sm"><strong>আইবাস আইডি:</strong> <br/> <span className="text-blue-700 font-bold font-mono text-base">{selectedTeacher.ibasId || selectedTeacher.ibasID || "প্রদত্ত নয়"}</span></p>
                      <p className="text-sm"><strong>পদবী:</strong> <br/> <span className="text-gray-700">{selectedTeacher.designation || "প্রদত্ত নয়"}</span></p>
                      <p className="text-sm"><strong>মূল বেতন:</strong> <br/> <span className="text-green-700 font-bold text-base">{selectedTeacher.basicPay || selectedTeacher.basicpay || 0} ৳</span></p>
                    </div>
                  </div>

                  <div className="mt-10 bg-gray-50 p-6 rounded-2xl border border-gray-100">
                     <p className="text-sm text-gray-600"><strong>ঠিকানা:</strong> {selectedTeacher.presentAddr || selectedTeacher.address || selectedTeacher.permVillage || "প্রদত্ত নয়"}</p>
                  </div>

                  <button 
                    onClick={() => setSelectedTeacher(null)} 
                    className="mt-10 w-full bg-blue-900 text-white py-4 rounded-2xl font-bold shadow-xl hover:bg-black hover:scale-[1.02] transition-all duration-300"
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