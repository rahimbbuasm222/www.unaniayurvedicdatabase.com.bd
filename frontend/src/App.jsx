import React, { useState, useEffect } from 'react';

const TeacherDatabase = () => {
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [formData, setFormData] = useState({
    nameBn: '', nameEn: '', fatherName: '', motherName: '', presentAddr: '', permanentAddr: '', nid: '', designation: '', department: '',
    eduSSC: '', eduHSC: '', eduGrad: '', eduPostGrad: '',
    firstJoinDate: '', currentPostDate: '', jobType: 'স্থায়ী', prlDate: '',
    initialPayScale: '', basicPay: '', incrementStep: '',
    bankAcc: '', bankName: '', branchName: '', routingNumber: '', incomeTax: ''
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
        alert("✅ সফলভাবে তথ্য সংরক্ষিত হয়েছে!");
        fetchTeachers();
      }
    } catch (error) { alert("❌ এরর!"); }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-2 md:p-6 font-sans text-gray-800">
      <div className="max-w-7xl mx-auto bg-white shadow-2xl rounded-xl border-t-8 border-blue-900 overflow-hidden">
        
        {/* Header */}
        <div className="bg-blue-900 text-white py-8 px-6 text-center">
          <h1 className="text-xl md:text-2xl font-bold uppercase">বাংলাদেশ বোর্ড অব ইউনানি অ্যান্ড আয়ুর্বেদিক সিস্টেম অব মেডিসিন</h1>
          <h2 className="text-lg font-semibold text-blue-200 mt-2">অফিসিয়াল শিক্ষক ও এমপ্লয়ী ডাটাবেস</h2>
        </div>

        <div className="p-4 md:p-8">
          {/* ইনপুট ফরম - সব তথ্যসহ */}
          <form onSubmit={handleSubmit} className="space-y-6 bg-blue-50 p-6 rounded-2xl border border-blue-100 mb-12 shadow-inner">
            <h3 className="font-bold text-blue-900 border-b border-blue-200 pb-2">নতুন তথ্য ইনপুট করুন</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               <input type="text" name="nameBn" placeholder="নাম (বাংলা)" onChange={handleChange} className="border p-2 rounded bg-white" required />
               <input type="text" name="designation" placeholder="পদবী" onChange={handleChange} className="border p-2 rounded bg-white" />
               <input type="text" name="department" placeholder="বিভাগ" onChange={handleChange} className="border p-2 rounded bg-white" />
               <input type="number" name="basicPay" placeholder="মূল বেতন" onChange={handleChange} className="border p-2 rounded bg-white" />
               <input type="text" name="nid" placeholder="এনআইডি" onChange={handleChange} className="border p-2 rounded bg-white" />
               <input type="text" name="eduGrad" placeholder="স্নাতক ডিগ্রি ও সাল" onChange={handleChange} className="border p-2 rounded bg-white" />
               <input type="text" name="fatherName" placeholder="পিতার নাম" onChange={handleChange} className="border p-2 rounded bg-white" />
               <div className="flex flex-col"><label className="text-[10px] ml-1">যোগদানের তারিখ</label><input type="date" name="firstJoinDate" onChange={handleChange} className="border p-2 rounded bg-white" /></div>
               <div className="flex flex-col"><label className="text-[10px] ml-1">PRL শুরুর তারিখ</label><input type="date" name="prlDate" onChange={handleChange} className="border p-2 rounded bg-white" /></div>
            </div>
            <button type="submit" className="w-full bg-blue-900 text-white font-bold py-3 rounded-xl hover:bg-black transition-all shadow-lg">তথ্য সংরক্ষণ করুন</button>
          </form>

          {/* তালিকা টেবিল */}
          <div className="mt-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center"><span className="w-2 h-6 bg-blue-900 mr-2 rounded"></span> সংরক্ষিত শিক্ষক তালিকা</h2>
            <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
              <table className="w-full text-sm text-left bg-white">
                <thead className="bg-blue-900 text-white font-bold">
                  <tr>
                    <th className="p-4">নাম ও পদবী</th>
                    <th className="p-4 text-center">অ্যাকশন</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {teachers.map((t) => (
                    <tr key={t._id} className="hover:bg-blue-50 transition border-b">
                      <td className="p-4">
                        <div className="font-bold text-blue-900">{t.nameBn || t.nameBN}</div>
                        <div className="text-xs text-gray-500">{t.designation || "পদবী নেই"}</div>
                      </td>
                      <td className="p-4 text-center">
                        <button onClick={() => setSelectedTeacher(t)} className="bg-blue-900 text-white px-5 py-2 rounded-full text-[10px] font-bold shadow-md hover:bg-black transition">বিস্তারিত তথ্য দেখুন</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer (branding) */}
        <footer className="bg-slate-900 text-white p-8 mt-12 border-t-4 border-blue-600 flex flex-col md:flex-row items-center gap-6">
            <img src="/images/my-pic.jpg" alt="AR" style={{ width: '50px', height: '50px' }} className="rounded-full border-2 border-blue-400" onError={(e) => e.target.src="https://via.placeholder.com/50"} />
            <div>
               <h2 className="text-xl font-bold">আবদুর রহিম (Abdur Rahim)</h2>
               <p className="text-blue-400 text-xs font-bold uppercase">সেকশন অফিসার (সফটওয়্যার ইঞ্জিনিয়ার) | BBUASM</p>
            </div>
        </footer>

        {/* --- সলিড হোয়াইট মডাল (ওভারল্যাপিং ফিক্স) --- */}
        {selectedTeacher && (
           <div className="fixed inset-0 flex items-center justify-center p-4 z-[999999]">
              {/* অন্ধকার সলিড ব্যাকড্রপ */}
              <div className="absolute inset-0 bg-gray-900 bg-opacity-95" onClick={() => setSelectedTeacher(null)}></div>
              
              {/* মডাল বক্স - একদম সাদা এবং পরিষ্কার */}
              <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-2 border-blue-900 relative z-[1000000]">
                  <div className="bg-blue-900 p-6 flex justify-between items-center text-white sticky top-0 z-10">
                    <h2 className="text-xl font-bold">শিক্ষক সার্ভিস প্রোফাইল রেকর্ড</h2>
                    <button onClick={() => setSelectedTeacher(null)} className="text-white text-4xl leading-none hover:text-red-400 transition">&times;</button>
                  </div>
                  
                  <div className="p-8 md:p-10 space-y-6 text-sm md:text-base">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-b pb-6">
                      <div className="space-y-3">
                        <h3 className="font-bold text-blue-900 uppercase text-xs border-b pb-1">ব্যক্তিগত তথ্য</h3>
                        <p><strong>নাম (বাংলা):</strong> {selectedTeacher.nameBn || selectedTeacher.nameBN || "প্রদত্ত নয়"}</p>
                        <p><strong>পিতার নাম:</strong> {selectedTeacher.fatherName || "প্রদত্ত নয়"}</p>
                        <p><strong>মাতার নাম:</strong> {selectedTeacher.motherName || "প্রদত্ত নয়"}</p>
                        <p><strong>এনআইডি:</strong> {selectedTeacher.nid || "প্রদত্ত নয়"}</p>
                      </div>
                      <div className="space-y-3">
                        <h3 className="font-bold text-blue-900 uppercase text-xs border-b pb-1">পেশাগত তথ্য</h3>
                        <p><strong>পদবী:</strong> {selectedTeacher.designation || "প্রদত্ত নয়"}</p>
                        <p><strong>বিভাগ:</strong> {selectedTeacher.department || "প্রদত্ত নয়"}</p>
                        <p><strong>মূল বেতন:</strong> <span className="font-bold text-green-700">{selectedTeacher.basicPay || selectedTeacher.basicpay || 0} ৳</span></p>
                        <p><strong>ব্যাংক একাউন্ট:</strong> {selectedTeacher.bankAcc || "প্রদত্ত নয়"}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                       <h3 className="font-bold text-blue-900 uppercase text-xs border-b pb-1">শিক্ষা ও চাকুরির রেকর্ড</h3>
                       <div className="grid grid-cols-2 gap-4">
                          <p><strong>SSC যোগ্যতা:</strong> {selectedTeacher.eduSSC || "প্রদত্ত নয়"}</p>
                          <p><strong>স্নাতক যোগ্যতা:</strong> {selectedTeacher.eduGrad || "প্রদত্ত নয়"}</p>
                          <p><strong>প্রথম যোগদানের তারিখ:</strong> {selectedTeacher.firstJoinDate || "প্রদত্ত নয়"}</p>
                          <p><strong>PRL শুরুর তারিখ:</strong> {selectedTeacher.prlDate || "প্রদত্ত নয়"}</p>
                       </div>
                    </div>

                    <div className="mt-6 bg-gray-50 p-4 rounded-xl text-gray-700 italic border">
                       <strong>ঠিকানা:</strong> {selectedTeacher.presentAddr || selectedTeacher.address || "প্রদত্ত নয়"}
                    </div>
                  </div>

                  <div className="p-6 bg-gray-100 text-right">
                    <button onClick={() => setSelectedTeacher(null)} className="bg-blue-900 text-white py-3 px-10 rounded-xl font-bold shadow-lg hover:bg-black transition-all">বন্ধ করুন</button>
                  </div>
              </div>
           </div>
        )}
      </div>
    </div>
  );
};

export default TeacherDatabase;