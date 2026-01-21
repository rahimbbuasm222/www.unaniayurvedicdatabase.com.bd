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
        alert("শিক্ষক প্রোফাইল সরাসরি ক্লাউড ডাটাবেজে সংরক্ষিত হয়েছে!");
        fetchTeachers();
      } else {
        alert("সংরক্ষণে সমস্যা হয়েছে। আইবাস আইডি ইউনিক হতে হবে।");
      }
    } catch (error) {
      alert("সার্ভার কানেকশন এরর!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-2 md:p-6 font-sans text-gray-800">
      <div className="max-w-7xl mx-auto bg-white shadow-2xl rounded-xl border-t-8 border-blue-900 overflow-hidden">
        
        {/* Header Section */}
        <div className="bg-blue-900 text-white py-8 px-6 text-center">
          <h1 className="text-2xl md:text-3xl font-bold mb-2 uppercase tracking-wide">
            বাংলাদেশ বোর্ড অব ইউনানি অ্যান্ড আয়ুর্বেদিক সিস্টেম অব মেডিসিন 
          </h1>
          <h2 className="text-xl md:text-2xl font-semibold text-blue-200">এমপ্লয়ী / কলেজের শিক্ষক প্রোফাইল ডাটাবেস</h2>
          <p className="text-blue-100 italic mt-2 opacity-80 underline">বোর্ড অনুমোদিত ডিজিটাল ডাটাবেস ফরম্যাট</p>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* ইনপুট ফিল্ডসমূহ (আগের মতোই থাকবে) */}
            <section className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold text-blue-900 border-b-2 border-blue-100 mb-6 pb-1 flex items-center">
                <span className="w-2 h-2 bg-blue-900 rounded-full mr-2"></span> ১. সাধারণ ও পেশাগত তথ্য
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <input type="text" name="nameBn" placeholder="শিক্ষকের নাম (বাংলা)" onChange={handleChange} className="border p-2 rounded" required />
                <input type="text" name="nameEn" placeholder="শিক্ষকের নাম (ইংরেজি)" onChange={handleChange} className="border p-2 rounded" />
                <input type="text" name="fatherName" placeholder="পিতার নাম" onChange={handleChange} className="border p-2 rounded" />
                <input type="text" name="motherName" placeholder="মাতার নাম" onChange={handleChange} className="border p-2 rounded" />
                <textarea name="presentAddr" placeholder="বর্তমান ঠিকানা" onChange={handleChange} className="border p-2 rounded md:col-span-2 h-20" />
                <input type="text" name="nid" placeholder="এনআইডি (NID) নম্বর" onChange={handleChange} className="border p-2 rounded" />
                <input type="text" name="designation" placeholder="পদবী" onChange={handleChange} className="border p-2 rounded" />
                <input type="text" name="department" placeholder="বিভাগ" onChange={handleChange} className="border p-2 rounded" />
              </div>
            </section>

            <section className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold text-blue-900 border-b-2 border-blue-100 mb-6 pb-1 flex items-center">
                <span className="w-2 h-2 bg-blue-900 rounded-full mr-2"></span> ২. iBAS ও বেতন তথ্য
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input type="text" name="ibasId" placeholder="iBAS ID (১১ ডিজিট)" onChange={handleChange} className="border p-2 rounded bg-yellow-50 font-bold" required />
                <input type="number" name="basicPay" placeholder="বর্তমান মূল বেতন (Basic)" onChange={handleChange} className="border p-2 rounded font-bold text-blue-900" />
                <input type="text" name="bankAcc" placeholder="ব্যাংক একাউন্ট নম্বর" onChange={handleChange} className="border p-2 rounded" />
                <input type="text" name="routingNumber" placeholder="রাউটিং নম্বর" onChange={handleChange} className="border p-2 rounded" />
              </div>
            </section>

            <button type="submit" className="w-full bg-blue-900 text-white font-bold py-4 rounded-lg hover:bg-black transition shadow-xl uppercase">
              সরাসরি ডাটাবেজে সংরক্ষণ করুন
            </button>
          </form>

          {/* আপডেট করা টেবিল লিস্ট - যেখানে সব তথ্য আসবে */}
          <div className="mt-20">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="bg-blue-900 w-2 h-8 mr-3 rounded-full"></span>
              সংরক্ষিত শিক্ষকদের ডিজিটাল তালিকা (সব তথ্যসহ)
            </h2>
            <div className="overflow-x-auto rounded-xl border-2 border-gray-100 shadow-sm">
              <table className="w-full text-sm text-left">
                <thead className="bg-blue-900 text-white uppercase font-bold">
                  <tr>
                    <th className="p-4 border-b">শিক্ষকের নাম ও পদবী</th>
                    <th className="p-4 border-b">এনআইডি ও আইবাস আইডি</th>
                    <th className="p-4 border-b">বেতন ও ব্যাংক তথ্য</th>
                    <th className="p-4 border-b text-center">অ্যাকশন</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {teachers.map((t) => (
                    <tr key={t._id} className="hover:bg-blue-50 transition border-b">
                      <td className="p-4">
                        <div className="font-bold text-blue-900 uppercase">{t.nameBn}</div>
                        <div className="text-[11px] text-gray-600 font-semibold">{t.designation} ({t.department})</div>
                      </td>
                      <td className="p-4">
                        <div className="text-[12px] font-mono text-gray-700 font-bold">iBAS ID: {t.ibasId}</div>
                        <div className="text-[11px] text-gray-500">NID: {t.nid}</div>
                      </td>
                      <td className="p-4">
                        <div className="font-bold text-green-700">বেতন: {t.basicPay} ৳</div>
                        <div className="text-[11px] text-gray-600 font-mono">ACC: {t.bankAcc}</div>
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

        {/* ফুটার (ব্র্যান্ডিং) */}
        <footer className="bg-gray-900 text-white p-8 md:p-12 mt-16 relative overflow-hidden">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8 relative z-10">
            <div className="flex-shrink-0">
               <div style={{ width: '60px', height: '60px' }} className="rounded-full border-2 border-blue-500 p-0.5 shadow-xl overflow-hidden bg-gray-800">
                  <img src="/images/my-pic.jpg" alt="Abdur Rahim" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} onError={(e) => { e.target.src = "https://via.placeholder.com/60?text=AR"; }} />
               </div>
            </div>
            <div className="text-center md:text-left flex-grow">
              <h2 className="text-2xl font-extrabold text-white mb-1">আবদুর রহিম (Abdur Rahim)</h2>
              <p className="text-lg text-gray-300 font-medium">সেকশন অফিসার (সফটওয়্যার ইঞ্জিনিয়ার)</p>
              <p className="text-sm text-blue-200">বাংলাদেশ বোর্ড অব ইউনানি অ্যান্ড আয়ুর্বেদিক সিস্টেমস অব মেডিসিন</p>
            </div>
          </div>
        </footer>

        {/* বিস্তারিত মডাল (এখানে সব তথ্য শো করা হয়েছে) */}
        {selectedTeacher && (
           <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-90 p-4 backdrop-blur-md">
            <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border-t-8 border-blue-900 p-8">
                <div className="flex justify-between items-center mb-8 border-b pb-4">
                  <h2 className="text-2xl font-bold text-blue-900">শিক্ষক প্রোফাইল - বিস্তারিত রেকর্ড</h2>
                  <button onClick={() => setSelectedTeacher(null)} className="text-gray-400 hover:text-red-600 text-4xl">&times;</button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-sm">
                  <div className="space-y-4">
                    <h3 className="text-blue-900 font-bold uppercase tracking-wider border-b pb-1">ব্যক্তিগত ও পেশাগত তথ্য</h3>
                    <p><strong>নাম (বাংলা):</strong> {selectedTeacher.nameBn}</p>
                    <p><strong>নাম (ইংরেজি):</strong> {selectedTeacher.nameEn}</p>
                    <p><strong>পিতার নাম:</strong> {selectedTeacher.fatherName}</p>
                    <p><strong>মাতার নাম:</strong> {selectedTeacher.motherName}</p>
                    <p><strong>এনআইডি:</strong> {selectedTeacher.nid}</p>
                    <p><strong>পদবী:</strong> {selectedTeacher.designation}</p>
                    <p><strong>বিভাগ:</strong> {selectedTeacher.department}</p>
                    <p><strong>ঠিকানা:</strong> {selectedTeacher.presentAddr}</p>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-blue-900 font-bold uppercase tracking-wider border-b pb-1">বেতন, আইবাস ও ব্যাংক রেকর্ড</h3>
                    <p className="text-blue-700 font-bold"><strong>আইবাস আইডি:</strong> {selectedTeacher.ibasId}</p>
                    <p className="text-green-700 font-bold"><strong>বর্তমান মূল বেতন:</strong> {selectedTeacher.basicPay} ৳</p>
                    <p><strong>ব্যাংক একাউন্ট নম্বর:</strong> {selectedTeacher.bankAcc}</p>
                    <p><strong>ব্যাংকের নাম:</strong> {selectedTeacher.bankName}</p>
                    <p><strong>রাউটিং নম্বর:</strong> {selectedTeacher.routingNumber}</p>
                    <p><strong>চাকুরির ধরন:</strong> {selectedTeacher.jobType}</p>
                    <p><strong>প্রথম যোগদানের তারিখ:</strong> {selectedTeacher.firstJoinDate}</p>
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