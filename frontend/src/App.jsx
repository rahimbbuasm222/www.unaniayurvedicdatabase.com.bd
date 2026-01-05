import React, { useState, useEffect } from 'react';

const TeacherDatabase = () => {
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [formData, setFormData] = useState({
    nameBn: '', nameEn: '', fatherName: '', motherName: '', 
    address: '', ibasId: '', nid: '',
    education: '', designation: '', basicPay: '', 
    bankAcc: '', routingNumber: '', 
    firstJoinDate: '', jobType: 'স্থায়ী'
  });

  // ১. আপনার রেন্ডার ব্যাকএন্ড লিঙ্ক
  const API_URL = "https://www-updatedunaniayurvedicdatabase-com-bd.onrender.com/api/teachers";

  // ২. ডাটাবেজ থেকে তথ্য নিয়ে আসা
  const fetchTeachers = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setTeachers(data);
    } catch (error) {
      console.error("ডেটা আনতে সমস্যা হয়েছে:", error);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ৩. তথ্য ডাটাবেজে পাঠানো (POST Request)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.nameBn || !formData.ibasId) {
      alert("নাম এবং আইবাস আইডি অবশ্যই দিন!");
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert("তথ্য ডাটাবেজে সফলভাবে সংরক্ষণ করা হয়েছে!");
        fetchTeachers(); // নতুন ডেটা দেখানোর জন্য রিফ্রেশ
      } else {
        alert("সংরক্ষণে সমস্যা হয়েছে। আইবাস আইডি ইউনিক হতে হবে।");
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-2 md:p-6 font-sans">
      <div className="max-w-7xl mx-auto bg-white shadow-2xl rounded-2xl p-4 md:p-8">
        <h1 className="text-3xl font-bold text-center text-blue-900 mb-8 border-b-4 border-blue-100 pb-4">
          ইউনানি ও আয়ুর্বেদিক শিক্ষক ডাটাবেস (Live MongoDB)
        </h1>

        {/* নতুন ইনপুট ফরম */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-blue-50 p-6 rounded-xl mb-10 border border-blue-100 shadow-inner">
          <div className="col-span-full font-bold text-blue-800 border-b border-blue-200 pb-2">১. ব্যক্তিগত তথ্য</div>
          <input type="text" name="nameBn" placeholder="নাম (বাংলা)" onChange={handleChange} className="border p-2 rounded bg-white" />
          <input type="text" name="fatherName" placeholder="পিতার নাম" onChange={handleChange} className="border p-2 rounded bg-white" />
          <input type="text" name="motherName" placeholder="মাতার নাম" onChange={handleChange} className="border p-2 rounded bg-white" />
          <input type="text" name="nid" placeholder="NID নম্বর" onChange={handleChange} className="border p-2 rounded bg-white" />
          <input type="text" name="address" placeholder="বর্তমান ঠিকানা" onChange={handleChange} className="border p-2 rounded bg-white" />
          
          <div className="col-span-full font-bold text-blue-800 border-b border-blue-200 mt-4 pb-2">২. iBAS ও চাকুরি</div>
          <input type="text" name="ibasId" placeholder="iBAS ID (১১ ডিজিট)" onChange={handleChange} className="border p-2 rounded bg-yellow-50" />
          <input type="text" name="bankAcc" placeholder="ব্যাংক একাউন্ট নম্বর" onChange={handleChange} className="border p-2 rounded bg-white" />
          <input type="text" name="routingNumber" placeholder="রাউটিং নম্বর" onChange={handleChange} className="border p-2 rounded bg-white" />
          <input type="text" name="designation" placeholder="পদবী" onChange={handleChange} className="border p-2 rounded bg-white" />
          <input type="number" name="basicPay" placeholder="মূল বেতন" onChange={handleChange} className="border p-2 rounded bg-white" />
          <div className="flex flex-col"><label className="text-[10px] ml-1">যোগদানের তারিখ</label>
          <input type="date" name="firstJoinDate" onChange={handleChange} className="border p-2 rounded bg-white" /></div>

          <div className="col-span-full font-bold text-blue-800 border-b border-blue-200 mt-4 pb-2">৩. শিক্ষা</div>
          <input type="text" name="education" placeholder="সর্বোচ্চ ডিগ্রি (উদা: BUMS)" onChange={handleChange} className="border p-2 rounded bg-white" />

          <button type="submit" className="col-span-full bg-blue-700 text-white font-bold py-3 rounded-lg hover:bg-blue-800 transition shadow-lg mt-4">
            সরাসরি ডাটাবেজে সংরক্ষণ করুন
          </button>
        </form>

        {/* সংরক্ষিত শিক্ষকদের তালিকা */}
        <div className="overflow-x-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">ক্লাউড ডাটাবেজ থেকে প্রাপ্ত তালিকা</h2>
          <table className="w-full border-collapse border border-gray-300 shadow-lg">
            <thead className="bg-blue-800 text-white text-sm">
              <tr>
                <th className="p-3 border">শিক্ষকের নাম ও এনআইডি</th>
                <th className="p-3 border">আইবাস ও ব্যাংক তথ্য</th>
                <th className="p-3 border">পদবী ও বেতন</th>
                <th className="p-3 border">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="bg-white text-gray-700">
              {teachers.map((t) => (
                <tr key={t._id} className="hover:bg-blue-50 border-b">
                  <td className="p-3 border">
                    <div className="font-bold">{t.nameBn}</div>
                    <div className="text-[11px] text-gray-500">NID: {t.nid}</div>
                  </td>
                  <td className="p-3 border text-xs font-mono">
                    ID: {t.ibasId} <br/>
                    A/C: {t.bankAcc} <br/>
                    Routing: {t.routingNumber}
                  </td>
                  <td className="p-3 border">
                    <div className="text-sm font-semibold">{t.designation}</div>
                    <div className="text-green-700 font-bold">{t.basicPay} ৳</div>
                  </td>
                  <td className="p-3 border">
                    <button onClick={() => setSelectedTeacher(t)} className="w-full bg-green-600 text-white px-2 py-1 rounded text-[11px] font-bold">বিস্তারিত</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* বিস্তারিত মডাল */}
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
                  <p><strong>নাম:</strong> {selectedTeacher.nameBn}</p>
                  <p><strong>পিতার নাম:</strong> {selectedTeacher.fatherName}</p>
                  <p><strong>মাতার নাম:</strong> {selectedTeacher.motherName}</p>
                  <p><strong>ঠিকানা:</strong> {selectedTeacher.address}</p>
                </div>
                <div>
                  <h3 className="font-bold text-blue-700 underline mb-2">চাকুরি ও বেতন</h3>
                  <p><strong>আইবাস আইডি:</strong> {selectedTeacher.ibasId}</p>
                  <p><strong>পদবী:</strong> {selectedTeacher.designation}</p>
                  <p><strong>মূল বেতন:</strong> {selectedTeacher.basicPay} টাকা</p>
                  <p><strong>যোগদানের তারিখ:</strong> {selectedTeacher.firstJoinDate}</p>
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