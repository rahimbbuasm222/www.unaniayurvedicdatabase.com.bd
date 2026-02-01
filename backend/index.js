const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());

// CORS সেটিংস - আপনার ফ্রন্টএন্ড লিঙ্কটি এখানে দিলে বেশি নিরাপদ
app.use(cors()); 

// ১. ডাটাবেস কানেকশন (Render-এর জন্য পরিবর্তিত)
// MONGO_URI আমরা Render-এর Environment Variable থেকে পাবো
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    console.error("Error: MONGO_URI is not defined in Environment Variables.");
}

mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB Cloud Connected Successfully'))
    .catch(err => console.log('Database Connection Error:', err));

// ২. শিক্ষক ডাটাবেস স্কিমা (আপনার আগের কোড অনুযায়ী)
const teacherSchema = new mongoose.Schema({
    nameBn: String,
    nameEn: String,
    fatherName: String,
    motherName: String,
    address: String,
    ibasId: { type: String, required: true, unique: true },
    nid: String,
    designation: String,
    department: String,
    education: String,
    payGrade: String,
    basicPay: Number,
    incrementStep: String,
    nonPracticing: String,
    bankAcc: String,
    bankName: String,
    routingNumber: { type: String, required: true },
    firstJoinDate: String,
    currentPostDate: String,
    jobType: String,
    prlDate: String,
    gpfInfo: String,
    incomeTax: String,
    ddoCode: String,
    economicCode: { type: String, default: "3111101" }
}, { timestamps: true });

const Teacher = mongoose.model('Teacher', teacherSchema);

// ৩. এপিআই রাুটসমূহ
app.get('/', (req, res) => {
    res.send('Unani Ayurvedic Board Backend is Running...');
});

// সব শিক্ষকের তথ্য পাওয়ার জন্য
app.get('/api/teachers', async (req, res) => {
    try {
        const teachers = await Teacher.find().sort({ createdAt: -1 });
        res.json(teachers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// নতুন শিক্ষকের তথ্য জমা দেওয়ার জন্য
app.post('/api/teachers', async (req, res) => {
    try {
        const newTeacher = new Teacher(req.body);
        const savedTeacher = await newTeacher.save();
        res.status(201).json(savedTeacher);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});
// ৪. ডাটা মুছে ফেলার জন্য (Delete)
app.delete('/api/teachers/:id', async (req, res) => {
    try {
        await Teacher.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ৫. ডাটা আপডেট করার জন্য (Edit/Update)
app.put('/api/teachers/:id', async (req, res) => {
    try {
        const updatedTeacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedTeacher);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// ৪. সার্ভার পোর্ট সেটআপ (Render-এর জন্য পরিবর্তিত)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});