import React, { useState, useEffect } from 'react';

const TeacherDatabase = () => {
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [formData, setFormData] = useState({
    nameBN: '', nameEN: '', fatherName: '', motherName: '', 
    permVillage: '', permDist: '', ibasID: '', nid: '',
    eduSSC: '', eduHSC: '', eduGrad: '', passingYear: '',
    designation: '', department: '', basicPay: '', 
    accNumber: '', routingNumber: '', bankBranch: '',
    jobType: 'স্থায়ী', firstJoinDate: '', prlDate: ''
  });

  useEffect(() => {
    const savedData = localStorage.getItem('unaniTeachers');
    if (savedData) setTeachers(JSON.parse(savedData));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nameBN || !formData.ibasID) {
      alert("নাম এবং আইবাস আইডি অবশ্যই দিন!");
      return;
    }
    const updatedTeachers = [...teachers, { ...formData, id: Date.now() }];
    setTeachers(updatedTeachers);
    localStorage.setItem('unaniTeachers', JSON.stringify(updatedTeachers));
    alert("তথ্য সফলভাবে সংরক্ষণ করা হয়েছে!");
  };

  const deleteTeacher = (id) => {
    if(window.confirm("মুছে ফেলতে চান?")) {
      const filtered = teachers.filter(t => t.id !== id);
      setTeachers(filtered);
      localStorage.setItem('unaniTeachers', JSON.stringify(filtered));
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-2 md:p-6 font-sans">
      <div className="max-w-7xl mx-auto bg-white shadow-2xl rounded-2xl p-4 md:p-8">
        <h1 className="text-3xl font-bold text-center text-blue-900 mb-8 border-b-4 border-blue-100 pb-4">
          ইউনানি ও আয়ুর্বেদিক শিক্ষক ডাটাবেস
        </h1>

        {/* নতুন ইনপুট ফরম (সব ফিল্ডসহ) */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-blue-50 p-6 rounded-xl mb-10 border border-blue-100 shadow-inner">
          <div className="col-span-full font-bold text-blue-800 border-b border-blue-200 pb-2">১. ব্যক্তিগত, এনআইডি ও ঠিকানা</div>
          <input type="text" name="nameBN" placeholder="নাম (বাংলা)" onChange={handleChange} className="border p-2 rounded bg-white" />
          <input type="text" name="fatherName" placeholder="পিতার নাম" onChange={handleChange} className="border p-2 rounded bg-white" />
          <input type="text" name="motherName" placeholder="মাতার নাম" onChange={handleChange} className="border p-2 rounded bg-white" />
          <input type="text" name="nid" placeholder="NID নম্বর" onChange={handleChange} className="border p-2 rounded bg-white" />
          <input type="text" name="permVillage" placeholder="গ্রাম" onChange={handleChange} className="border p-2 rounded bg-white" />
          <input type="text" name="permDist" placeholder="জেলা" onChange={handleChange} className="border p-2 rounded bg-white" />
          
          <div className="col-span-full font-bold text-blue-800 border-b border-blue-200 mt-4 pb-2">২. iBAS, ব্যাংক ও চাকুরি</div>
          <input type="text" name="ibasID" placeholder="iBAS ID (১১ ডিজিট)" onChange={handleChange} className="border p-2 rounded bg-yellow-50" />
          <input type="text" name="accNumber" placeholder="ব্যাংক একাউন্ট নম্বর" onChange={handleChange} className="border p-2 rounded bg-white" />
          <input type="text" name="routingNumber" placeholder="রাউটিং নম্বর" onChange={handleChange} className="border p-2 rounded bg-white" />
          <input type="text" name="designation" placeholder="পদবী" onChange={handleChange} className="border p-2 rounded bg-white" />
          <input type="text" name="basicPay" placeholder="মূল বেতন" onChange={handleChange} className="border p-2 rounded bg-white" />
          <div className="flex flex-col"><label className="text-[10px] ml-1">যোগদানের তারিখ</label>
          <input type="date" name="firstJoinDate" onChange={handleChange} className="border p-2 rounded bg-white" /></div>

          <div className="col-span-full font-bold text-blue-800 border-b border-blue-200 mt-4 pb-2">৩. শিক্ষাগত যোগ্যতা</div>
          <input type="text" name="eduSSC" placeholder="SSC রেজাল্ট" onChange={handleChange} className="border p-2 rounded bg-white" />
          <input type="text" name="eduHSC" placeholder="HSC রেজাল্ট" onChange={handleChange} className="border p-2 rounded bg-white" />
          <input type="text" name="eduGrad" placeholder="স্নাতক ডিগ্রি" onChange={handleChange} className="border p-2 rounded bg-white" />
          <input type="text" name="passingYear" placeholder="পাশের সাল" onChange={handleChange} className="border p-2 rounded bg-white" />

          <button type="submit" className="col-span-full bg-blue-700 text-white font-bold py-3 rounded-lg hover:bg-blue-800 transition shadow-lg mt-4">
            তথ্য সংরক্ষণ করুন
          </button>
        </form>

        {/* আপডেট করা টেবিল (বেশি তথ্যসহ) */}
        <div className="overflow-x-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">সংরক্ষিত শিক্ষকদের তালিকা</h2>
          <table className="w-full border-collapse border border-gray-300 shadow-lg">
            <thead className="bg-blue-800 text-white text-sm">
              <tr>
                <th className="p-3 border">শিক্ষকের নাম ও এনআইডি</th>
                <th className="p-3 border">ঠিকানা ও যোগ্যতা</th>
                <th className="p-3 border">iBAS ও ব্যাংক তথ্য</th>
                <th className="p-3 border">পদবী ও বেতন</th>
                <th className="p-3 border">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="bg-white text-gray-700">
              {teachers.map((t) => (
                <tr key={t.id} className="hover:bg-blue-50 border-b">
                  <td className="p-3 border">
                    <div className="font-bold">{t.nameBN}</div>
                    <div className="text-[11px] text-gray-500">NID: {t.nid}</div>
                  </td>
                  <td className="p-3 border text-xs">
                    📍 {t.permVillage}, {t.permDist} <br/>
                    🎓 {t.eduGrad} ({t.passingYear})
                  </td>
                  <td className="p-3 border text-xs font-mono">
                    ID: {t.ibasID} <br/>
                    A/C: {t.accNumber} <br/>
                    Routing: {t.routingNumber}
                  </td>
                  <td className="p-3 border">
                    <div className="text-sm font-semibold">{t.designation}</div>
                    <div className="text-green-700 font-bold">{t.basicPay} ৳</div>
                  </td>
                  <td className="p-3 border space-y-1">
                    <button onClick={() => setSelectedTeacher(t)} className="w-full bg-green-600 text-white px-2 py-1 rounded text-[11px] font-bold">বিস্তারিত</button>
                    <button onClick={() => deleteTeacher(t.id)} className="w-full bg-red-500 text-white px-2 py-1 rounded text-[11px]">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* বিস্তারিত মডাল (সব তথ্যসহ) */}
        {selectedTeacher && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-70 p-4 backdrop-blur-sm">
            <div className="bg-white p-6 md:p-8 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border-t-8 border-blue-700">
              <div className="flex justify-between items-center mb-6 border-b pb-2">
                <h2 className="text-2xl font-bold text-blue-900">শিক্ষকের পূর্ণাঙ্গ ডাটাবেস রেকর্ড</h2>
                <button onClick={() => setSelectedTeacher(null)} className="text-red-500 text-3xl font-bold">&times;</button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div>
                  <h3 className="font-bold text-blue-700 underline mb-2">ব্যক্তিগত তথ্য</h3>
                  <p><strong>নাম:</strong> {selectedTeacher.nameBN}</p>
                  <p><strong>পিতার নাম:</strong> {selectedTeacher.fatherName}</p>
                  <p><strong>মাতার নাম:</strong> {selectedTeacher.motherName}</p>
                  <p><strong>NID নম্বর:</strong> {selectedTeacher.nid}</p>
                  <p><strong>গ্রাম ও জেলা:</strong> {selectedTeacher.permVillage}, {selectedTeacher.permDist}</p>
                </div>
                <div>
                  <h3 className="font-bold text-blue-700 underline mb-2">চাকুরি ও বেতন</h3>
                  <p><strong>আইবাস আইডি:</strong> {selectedTeacher.ibasID}</p>
                  <p><strong>পদবী:</strong> {selectedTeacher.designation}</p>
                  <p><strong>মূল বেতন:</strong> {selectedTeacher.basicPay} টাকা</p>
                  <p><strong>যোগদানের তারিখ:</strong> {selectedTeacher.firstJoinDate}</p>
                </div>
                <div>
                  <h3 className="font-bold text-blue-700 underline mb-2">ব্যাংক তথ্য</h3>
                  <p><strong>একাউন্ট নম্বর:</strong> {selectedTeacher.accNumber}</p>
                  <p><strong>রাউটিং নম্বর:</strong> {selectedTeacher.routingNumber}</p>
                </div>
                <div>
                  <h3 className="font-bold text-blue-700 underline mb-2">শিক্ষা</h3>
                  <p><strong>SSC/HSC:</strong> {selectedTeacher.eduSSC} / {selectedTeacher.eduHSC}</p>
                  <p><strong>ডিগ্রি:</strong> {selectedTeacher.eduGrad}</p>
                  <p><strong>পাশের সাল:</strong> {selectedTeacher.passingYear}</p>
                </div>
              </div>
              <button onClick={() => setSelectedTeacher(null)} className="mt-8 w-full bg-blue-800 text-white py-3 rounded-xl font-bold shadow-lg">বন্ধ করুন</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherDatabase;