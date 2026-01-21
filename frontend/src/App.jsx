import React, { useState, useEffect } from 'react';

const TeacherDatabase = () => {
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [formData, setFormData] = useState({
    nameBn: '', nameEn: '', fatherName: '', motherName: '', 
    presentAddr: '', permanentAddr: '', nid: '', designation: '', department: '',
    eduSSC: '', eduHSC: '', eduGrad: '', eduPostGrad: '',
    firstJoinDate: '', currentPostDate: '', jobType: 'স্থায়ী', prlDate: '',
    initialPayScale: '', basicPay: '', incrementStep: '',
    bankAcc: '', bankName: '', branchName: '', routingNumber: '', incomeTax: '',
    ibasId: ''
  });

  const API_URL = "https://www-updatedunaniayurvedicdatabase-com-bd.onrender.com/api/teachers";

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
        alert("তথ্য ডাটাবেজে সফলভাবে সংরক্ষিত হয়েছে!");
        fetchTeachers();
      }
    } catch (error) {
      alert("সংরক্ষণে সমস্যা হয়েছে!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-2 md:p-6 font-sans text-gray-800">
      <div className="max-w-7xl mx-auto bg-white shadow-2xl rounded-xl border-t-8 border-blue-900 overflow-hidden">
        
        {/* Header */}
        <div className="bg-blue-900 text-white py-8 px-6 text-center">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">বাংলাদেশ বোর্ড অব ইউনানি অ্যান্ড আয়ুর্বেদিক সিস্টেম অব মেডিসিন</h1>
          <h2 className="text-xl font-semibold text-blue-200">শিক্ষক প্রোফাইল ও বেতন ডাটাবেস</h2>
        </div>

        <div className="p-6">
          {/* ইনপুট ফরম */}
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-50 p-6 rounded-xl border mb-10">
             <div className="col-span-full font-bold text-blue-900 border-b pb-2">নতুন শিক্ষক তথ্য ইনপুট</div>
             <input type="text" name="nameBn" placeholder="নাম (বাংলা)" onChange={handleChange} className="border p-2 rounded" required />
             <input type="text" name="ibasId" placeholder="iBAS ID" onChange={handleChange} className="border p-2 rounded bg-yellow-50" required />
             <input type="text" name="designation" placeholder="পদবী" onChange={handleChange} className="border p-2 rounded" />
             <input type="number" name="basicPay" placeholder="মূল বেতন" onChange={handleChange} className="border p-2 rounded" />
             <input type="text" name="nid" placeholder="এনআইডি" onChange={handleChange} className="border p-2 rounded" />
             <button type="submit" className="col-span-full bg-blue-900 text-white font-bold py-3 rounded hover:bg-black transition">ডাটাবেজে সেভ করুন</button>
          </form>

          {/* তালিকা */}
          <div className="mt-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">সংরক্ষিত শিক্ষকদের তালিকা</h2>
            <div className="overflow-x-auto rounded-xl border">
              <table className="w-full text-sm text-left">
                <thead className="bg-blue-900 text-white font-bold">
                  <tr>
                    <th className="p-4">নাম ও পদবী</th>
                    <th className="p-4">আইবাস ও এনআইডি</th>
                    <th className="p-4">বেতন</th>
                    <th className="p-4 text-center">অ্যাকশন</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {teachers.map((t) => (
                    <tr key={t._id} className="hover:bg-blue-50 border-b">
                      <td className="p-4">
                        <div className="font-bold text-blue-900">{t.nameBn || t.nameBN || "নাম নেই"}</div>
                        <div className="text-xs">{t.designation || "পদবী নেই"}</div>
                      </td>
                      <td className="p-4">
                        <div className="font-mono font-bold">ID: {t.ibasId || t.ibasID || "নেই"}</div>
                        <div className="text-[11px]">NID: {t.nid || "নেই"}</div>
                      </td>
                      <td className="p-4 font-bold text-green-700">{t.basicPay || t.basicpay || 0} ৳</td>
                      <td className="p-4 text-center">
                        {/* বাটনে ক্লিক করলে setSelectedTeacher(t) কাজ করবে */}
                        <button 
                          onClick={() => {
                            console.log("Selected Teacher:", t);
                            setSelectedTeacher(t);
                          }} 
                          className="bg-blue-900 text-white px-4 py-2 rounded-full text-[10px] font-bold shadow-md"
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

        {/* Footer (branding) */}
        <footer className="bg-gray-900 text-white p-6 mt-16 flex items-center gap-4">
            <img src="/images/my-pic.jpg" alt="AR" style={{ width: '40px', height: '40px' }} className="rounded-full border border-blue-500" onError={(e) => e.target.src="https://via.placeholder.com/40"} />
            <div>
               <h2 className="text-lg font-bold">আবদুর রহিম (Abdur Rahim)</h2>
               <p className="text-xs text-blue-400">সেকশন অফিসার (সফটওয়্যার ইঞ্জিনিয়ার) | BBUASM</p>
            </div>
        </footer>

        {/* --- বিস্তারিত মডাল (Fixed Logic) --- */}
        {selectedTeacher && (
           <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black bg-opacity-80 p-4 backdrop-blur-sm">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border-t-8 border-blue-900 p-6 md:p-10">
                <div className="flex justify-between items-center mb-6 border-b pb-4">
                  <h2 className="text-2xl font-bold text-blue-900">শিক্ষকের পূর্ণাঙ্গ রেকর্ড</h2>
                  <button onClick={() => setSelectedTeacher(null)} className="text-red-500 text-4xl">&times;</button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                  <div className="space-y-3">
                    <p className="border-b pb-1"><strong>নাম (বাংলা):</strong> {selectedTeacher.nameBn || selectedTeacher.nameBN || "প্রদত্ত নয়"}</p>
                    <p className="border-b pb-1"><strong>পিতার নাম:</strong> {selectedTeacher.fatherName || "প্রদত্ত নয়"}</p>
                    <p className="border-b pb-1"><strong>মাতার নাম:</strong> {selectedTeacher.motherName || "প্রদত্ত নয়"}</p>
                    <p className="border-b pb-1"><strong>এনআইডি:</strong> {selectedTeacher.nid || "প্রদত্ত নয়"}</p>
                    <p className="border-b pb-1"><strong>ঠিকানা:</strong> {selectedTeacher.presentAddr || selectedTeacher.presentAddress || selectedTeacher.permVillage || "প্রদত্ত নয়"}</p>
                  </div>
                  <div className="space-y-3">
                    <p className="border-b pb-1"><strong>আইবাস আইডি:</strong> <span className="font-mono font-bold text-blue-700">{selectedTeacher.ibasId || selectedTeacher.ibasID || "প্রদত্ত নয়"}</span></p>
                    <p className="border-b pb-1"><strong>পদবী:</strong> {selectedTeacher.designation || "প্রদত্ত নয়"}</p>
                    <p className="border-b pb-1"><strong>মূল বেতন:</strong> <span className="font-bold text-green-700">{selectedTeacher.basicPay || selectedTeacher.basicpay || 0} ৳</span></p>
                    <p className="border-b pb-1"><strong>ব্যাংক একাউন্ট:</strong> {selectedTeacher.bankAcc || selectedTeacher.accNumber || "প্রদত্ত নয়"}</p>
                    <p className="border-b pb-1"><strong>রাউটিং নম্বর:</strong> {selectedTeacher.routingNumber || "প্রদত্ত নয়"}</p>
                  </div>
                </div>
                <button onClick={() => setSelectedTeacher(null)} className="mt-10 w-full bg-blue-900 text-white py-3 rounded-xl font-bold shadow-lg">বন্ধ করুন</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherDatabase;