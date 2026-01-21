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

  // ডেটা লোড করার ফাংশন
  const fetchTeachers = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      if (Array.isArray(data)) {
        setTeachers(data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
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
        alert("✅ সফলভাবে ডাটাবেজে সংরক্ষিত হয়েছে!");
        fetchTeachers();
      } else {
        alert("❌ ভুল: আইবাস আইডি ডুপ্লিকেট অথবা অন্য কোনো সমস্যা হয়েছে।");
      }
    } catch (error) {
      alert("❌ সার্ভার কানেকশন এরর!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-2 md:p-6 font-sans text-gray-800">
      <div className="max-w-7xl mx-auto bg-white shadow-2xl rounded-xl border-t-8 border-blue-900">
        
        {/* Header */}
        <div className="bg-blue-900 text-white py-8 px-6 text-center">
          <h1 className="text-2xl md:text-3xl font-bold uppercase">বাংলাদেশ বোর্ড অব ইউনানি অ্যান্ড আয়ুর্বেদিক সিস্টেম অব মেডিসিন</h1>
          <h2 className="text-xl font-semibold text-blue-200 mt-2">শিক্ষক প্রোফাইল ও পূর্ণাঙ্গ সার্ভিস ডাটাবেস</h2>
        </div>

        <div className="p-4 md:p-8">
          {/* ইনপুট ফরম */}
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-blue-50 p-6 rounded-2xl border-2 border-blue-100 mb-10 shadow-sm">
             <div className="col-span-full font-bold text-blue-900 border-b pb-2">নতুন শিক্ষক তথ্য এন্ট্রি</div>
             <input type="text" name="nameBn" placeholder="নাম (বাংলা)*" onChange={handleChange} className="border p-2 rounded" required />
             <input type="text" name="ibasId" placeholder="iBAS ID (ইউনিক)*" onChange={handleChange} className="border p-2 rounded bg-yellow-50 font-bold" required />
             <input type="text" name="designation" placeholder="পদবী" onChange={handleChange} className="border p-2 rounded" />
             <input type="number" name="basicPay" placeholder="মূল বেতন" onChange={handleChange} className="border p-2 rounded" />
             <input type="text" name="nid" placeholder="এনআইডি" onChange={handleChange} className="border p-2 rounded" />
             <input type="text" name="routingNumber" placeholder="রাউটিং নম্বর" onChange={handleChange} className="border p-2 rounded" />
             <button type="submit" className="col-span-full bg-blue-900 text-white font-bold py-3 rounded-xl hover:bg-black transition shadow-lg uppercase">তথ্য সংরক্ষণ করুন</button>
          </form>

          {/* তালিকা টেবিল */}
          <div className="mt-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
               <span className="w-3 h-8 bg-blue-900 mr-3 rounded"></span> সংরক্ষিত শিক্ষকদের তালিকা
            </h2>
            <div className="overflow-x-auto rounded-xl border shadow-sm">
              <table className="w-full text-sm text-left bg-white">
                <thead className="bg-blue-900 text-white font-bold uppercase tracking-wider">
                  <tr>
                    <th className="p-4">নাম ও পদবী</th>
                    <th className="p-4">এনআইডি ও আইডি</th>
                    <th className="p-4">বেতন</th>
                    <th className="p-4 text-center">অ্যাকশন</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {teachers.map((t) => (
                    <tr key={t._id} className="hover:bg-blue-50 transition border-b">
                      <td className="p-4">
                        <div className="font-bold text-blue-900">{t.nameBn || t.nameBN || "নাম নেই"}</div>
                        <div className="text-xs">{t.designation || "পদবী নেই"}</div>
                      </td>
                      <td className="p-4">
                        <div className="font-mono font-bold text-gray-700">ID: {t.ibasId || t.ibasID}</div>
                        <div className="text-[11px] text-gray-400 font-mono">NID: {t.nid}</div>
                      </td>
                      <td className="p-4 font-bold text-green-700">{t.basicPay || t.basicpay || 0} ৳</td>
                      <td className="p-4 text-center">
                        <button 
                          onClick={() => {
                            console.log("Selected Teacher Data:", t); // চেক করার জন্য
                            setSelectedTeacher(t);
                          }} 
                          className="bg-blue-900 text-white px-5 py-2 rounded-full text-[10px] font-bold shadow hover:bg-black transition active:scale-95"
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
        <footer className="bg-gray-900 text-white p-8 mt-12 border-t-4 border-blue-500">
           <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-6">
              <div style={{ width: '40px', height: '40px' }} className="rounded-full border border-blue-400 overflow-hidden bg-gray-700">
                 <img src="/images/my-pic.jpg" alt="AR" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.target.src="https://via.placeholder.com/40?text=AR"; }} />
              </div>
              <div className="text-center md:text-left">
                 <h2 className="text-xl font-bold">আবদুর রহিম (Abdur Rahim)</h2>
                 <p className="text-blue-400 font-bold text-sm uppercase">সেকশন অফিসার (সফটওয়্যার ইঞ্জিনিয়ার) | BBUASM</p>
              </div>
           </div>
        </footer>

        {/* --- আল্টিমেট মডাল ফিক্স (যেকোনো অবস্থায় ওপেন হবে) --- */}
        {selectedTeacher && (
           <div className="fixed inset-0 flex items-center justify-center p-4" style={{ zIndex: 999999, position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}>
              {/* অন্ধকার ব্যাকগ্রাউন্ড */}
              <div className="absolute inset-0 bg-black bg-opacity-90 backdrop-blur-md" onClick={() => setSelectedTeacher(null)}></div>
              
              {/* মডাল কন্টেন্ট - সলিড সাদা বক্স */}
              <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl border-t-8 border-blue-900 p-8 md:p-12 relative z-[1000000]">
                  <div className="flex justify-between items-center mb-8 border-b-2 border-gray-100 pb-4">
                    <h2 className="text-2xl md:text-3xl font-extrabold text-blue-900 uppercase">শিক্ষক প্রোফাইল রেকর্ড</h2>
                    <button onClick={() => setSelectedTeacher(null)} className="text-red-600 text-5xl font-light hover:scale-110 transition leading-none">&times;</button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm md:text-base">
                    <div className="space-y-4">
                      <p className="border-b pb-2 text-gray-600"><strong>নাম (বাংলা):</strong> <br/> <span className="text-blue-900 font-bold text-lg">{selectedTeacher?.nameBn || selectedTeacher?.nameBN || "প্রদত্ত নয়"}</span></p>
                      <p className="border-b pb-2 text-gray-600"><strong>পিতার নাম:</strong> <br/> <span className="text-gray-800 font-semibold">{selectedTeacher?.fatherName || "প্রদত্ত নয়"}</span></p>
                      <p className="border-b pb-2 text-gray-600"><strong>এনআইডি:</strong> <br/> <span className="text-gray-800 font-mono">{selectedTeacher?.nid || "প্রদত্ত নয়"}</span></p>
                    </div>
                    <div className="space-y-4">
                      <p className="border-b pb-2 text-gray-600"><strong>আইবাস আইডি:</strong> <br/> <span className="text-blue-700 font-extrabold font-mono">{selectedTeacher?.ibasId || selectedTeacher?.ibasID || "প্রদত্ত নয়"}</span></p>
                      <p className="border-b pb-2 text-gray-600"><strong>পদবী:</strong> <br/> <span className="text-gray-800 font-semibold">{selectedTeacher?.designation || "প্রদত্ত নয়"}</span></p>
                      <p className="border-b pb-2 text-gray-600"><strong>মূল বেতন:</strong> <br/> <span className="text-green-700 font-extrabold">{selectedTeacher?.basicPay || selectedTeacher?.basicpay || 0} ৳</span></p>
                    </div>
                  </div>

                  {/* অতিরিক্ত তথ্য */}
                  <div className="mt-8 bg-blue-50 p-6 rounded-2xl border border-blue-100">
                     <p className="text-blue-900 text-sm leading-relaxed">
                        <strong>ঠিকানা ও অন্যান্য:</strong> <br/>
                        {selectedTeacher?.presentAddr || selectedTeacher?.address || selectedTeacher?.permVillage || "প্রদত্ত নয়"}
                     </p>
                  </div>

                  <button 
                    onClick={() => setSelectedTeacher(null)} 
                    className="mt-10 w-full bg-blue-900 text-white py-4 rounded-2xl font-bold shadow-2xl hover:bg-black transition-all text-lg uppercase tracking-widest"
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