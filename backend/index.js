const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// ১. ডাটাবেস কানেকশন
const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB Cloud Connected Successfully'))
    .catch(err => console.log('Database Connection Error:', err));

// ২. সারের ১৯টি পয়েন্ট এবং শিক্ষাগত যোগ্যতার পূর্ণাঙ্গ স্কিমা
const teacherSchema = new mongoose.Schema({
    serialNo: String,        // ১. ক্রমিক নং
    nameBn: String,          // ২. নাম (বাংলা)
    nameEn: String,          // ৩. নাম (ইংরেজি)
    designation: String,     // ৪. পদবী
    nid: String,             // ৫. এনআইডি নম্বর
    dob: String,             // ৬. জন্ম তারিখ
    fatherName: String,      // ৭. পিতার নাম
    motherName: String,      // ৮. মাতার নাম
    mobile: String,          // ৯. মোবাইল নম্বর
    
    // ১০. শিক্ষাগত যোগ্যতা (সবগুলো যুক্ত করা হয়েছে)
    eduSSC: String,          
    eduHSC: String,          
    eduDAMS: String,         
    eduDUMS: String,         
    eduBUMS: String,         
    eduGraduation: String,   // স্নাতক
    eduPostGraduation: String, // স্নাতকোত্তর

    joinDate: String,        // ১১. বর্তমান চাকরিতে যোগদানের তারিখ
    promotionDate: String,   // ১২. বর্তমান পদে পদোন্নতির তারিখ
    payScale: String,        // ১৩. প্রাপ্ত বেতন স্কেল
    basicPay: Number,        // ১৪. বর্তমান মূল বেতন
    boardRegNo: String,      // ১৫. বোর্ডের চিকিৎসক নিবন্ধন নম্বর
    serviceLength: String,   // ১৬. মোট চাকুরিকাল
    prlDate: String,         // ১৭. পিআরএল (PRL) তারিখ
    bankAcc: String,         // ১৮. ব্যাংক হিসাব নম্বর
    bankName: String,        // ১৯. ব্যাংকের নাম ও শাখা
    bankBranch: String,      

    ibasId: { type: String, unique: true } 
}, { timestamps: true });

const Teacher = mongoose.model('Teacher', teacherSchema);

// ৩. এপিআই রাুটসমূহ
app.get('/api/teachers', async (req, res) => {
    try {
        const teachers = await Teacher.find().sort({ createdAt: -1 });
        res.json(teachers);
    } catch (err) { res.status(500).json({ message: err.message }); }
});

app.post('/api/teachers', async (req, res) => {
    try {
        const newTeacher = new Teacher(req.body);
        const savedTeacher = await newTeacher.save();
        res.status(201).json(savedTeacher);
    } catch (err) { res.status(400).json({ message: err.message }); }
});

app.put('/api/teachers/:id', async (req, res) => {
    try {
        const updatedTeacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedTeacher);
    } catch (err) { res.status(400).json({ message: err.message }); }
});

app.delete('/api/teachers/:id', async (req, res) => {
    try {
        await Teacher.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted" });
    } catch (err) { res.status(500).json({ message: err.message }); }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));