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
      setTeachers(data);
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
          <h1 className="text-2xl md:text-3xl font-bold mb-2 uppercase tracking-wide">
            বাংলাদেশ বোর্ড অব ইউনানি অ্যান্ড আয়ুর্বেদিক সিস্টেম অব মেডিসিন 
          </h1>
          <h2 className="text-xl md:text-2xl font-semibold text-blue-200">শিক্ষক প্রোফাইল ও বেতন ডাটাবেস (Beta)</h2>
        </div>

        <div className="p-6">
          {/* ইনপুট ফরম */}
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-50 p-6 rounded-xl border mb-10">
             <div className="col-span-full font-bold text-blue-900 border-b pb-2 mb-2">নতুন শিক্ষক যুক্ত করুন</div>
             <input type="text" name="nameBn" placeholder="নাম (বাংলা)" onChange={handleChange} className="border p-2 rounded" required />
             <input type="text" name="designation" placeholder="পদবী" onChange={handleChange} className="border p-2 rounded" />
             <input type="text" name="ibasId" placeholder="iBAS ID (১১ ডিজিট)" onChange={handleChange} className="border p-2 rounded bg-yellow-50" required />
             <input type="number" name="basicPay" placeholder="মূল বেতন" onChange={handleChange} className="border p-2 rounded" />
             <input type="text" name="nid" placeholder="এনআইডি" onChange={handleChange} className="border p-2 rounded" />
             <input type="text" name="bankAcc" placeholder="ব্যাংক একাউন্ট" onChange={handleChange} className="border p-2 rounded" />
             <button type="submit" className="col-span-full bg-blue-900 text-white font-bold py-3 rounded hover:bg-black transition">সংরক্ষণ করুন</button>
          </form>

          {/* সংরক্ষিত শিক্ষকদের তালিকা */}
          <div className="mt-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="bg-blue-900 w-2 h-8 mr-3 rounded-full"></span>
              সংরক্ষিত শিক্ষকদের ডিজিটাল তালিকা (সব তথ্যসহ)
            </h2>
            <div className="overflow-x-auto rounded-xl border-2 border-gray-100">
              <table className="w-full text-sm text-left">
                <thead className="bg-blue-900 text-white uppercase font-bold">
                  <tr>
                    <th className="p-4 border-b">নাম ও পদবী</th>
                    <th className="p-4 border-b">এনআইডি ও আইবাস</th>
                    <th className="p-4 border-b">বেতন ও ব্যাংক</th>
                    <th className="p-4 border-b text-center">অ্যাকশন</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {teachers.map((t) => (
                    <tr key={t._id} className="hover:bg-blue-50 transition border-b">
                      <td className="p-4">
                        {/* স্মার্ট ম্যাপিং: পুরনো বা নতুন যেকোনো নামের ডেটা দেখাবে */}
                        <div className="font-bold text-blue-900 uppercase">{t.nameBn || t.nameBN || "নাম নেই"}</div>
                        <div className="text-[11px] text-gray-600">{t.designation || "পদবী নেই"}</div>
                      </td>
                      <td className="p-4">
                        <div className="text-[12px] font-mono font-bold text-gray-700">ID: {t.ibasId || t.ibasID || t.ibasId}</div>
                        <div className="text-[11px] text-gray-500 font-mono">NID: {t.nid}</div>
                      </td>
                      <td className="p-4">
                        <div className="font-bold text-green-700">{t.basicPay || t.basicpay} ৳</div>
                        <div className="text-[11px] text-gray-600 font-mono">ACC: {t.bankAcc || t.accNumber}</div>
                      </td>
                      <td className="p-4 text-center">
                        <button onClick={() => setSelectedTeacher(t)} className="bg-blue-900 text-white px-4 py-2 rounded-full text-[10px] font-bold hover:bg-black transition shadow-md">সম্পূর্ণ প্রোফাইল</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-gray-900 text-white p-10 mt-16 text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center gap-6 max-w-4xl mx-auto">
               <img src="/images/my-pic.jpg" alt="Rahim" style={{ width: '60px', height: '60px' }} className="rounded-full border-2 border-blue-500" onError={(e) => e.target.src="https://via.placeholder.com/60"} />
               <div>
                  <h2 className="text-2xl font-bold">আবদুর রহিম (Abdur Rahim)</h2>
                  <p className="text-blue-400 font-bold text-sm">সেকশন অফিসার (সফটওয়্যার ইঞ্জিনিয়ার)</p>
                  <p className="text-gray-400 text-xs italic">বাংলাদেশ বোর্ড অব ইউনানি অ্যান্ড আয়ুর্বেদিক সিস্টেম অব মেডিসিন</p>
               </div>
            </div>
        </footer>

        {/* বিস্তারিত মডাল (Smart Mapping সহ) */}
        {selectedTeacher && (
           <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-90 p-4 backdrop-blur-md">
            <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border-t-8 border-blue-900 p-8">
                <div className="flex justify-between items-center mb-8 border-b pb-4">
                  <h2 className="text-2xl font-bold text-blue-900">শিক্ষক প্রোফাইল - বিস্তারিত রেকর্ড</h2>
                  <button onClick={() => setSelectedTeacher(null)} className="text-red-600 text-4xl">&times;</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-sm">
                  <div className="space-y-4">
                    <p><strong>নাম (বাংলা):</strong> {selectedTeacher.nameBn || selectedTeacher.nameBN}</p>
                    <p><strong>পিতার নাম:</strong> {selectedTeacher.fatherName}</p>
                    <p><strong>এনআইডি:</strong> {selectedTeacher.nid}</p>
                    <p><strong>ঠিকানা:</strong> {selectedTeacher.presentAddr || selectedTeacher.permVillage}</p>
                  </div>
                  <div className="space-y-4">
                    <p><strong>আইবাস আইডি:</strong> {selectedTeacher.ibasId || selectedTeacher.ibasID}</p>
                    <p><strong>পদবী:</strong> {selectedTeacher.designation}</p>
                    <p><strong>মূল বেতন:</strong> {selectedTeacher.basicPay} ৳</p>
                    <p><strong>ব্যাংক একাউন্ট:</strong> {selectedTeacher.bankAcc || selectedTeacher.accNumber}</p>
                  </div>
                </div>
                <button onClick={() => setSelectedTeacher(null)} className="mt-12 w-full bg-blue-900 text-white py-4 rounded-2xl font-bold hover:bg-black transition">বন্ধ করুন</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherDatabase;