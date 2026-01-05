const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// ১. ডাটাবেস কানেকশন (লোকাল মঙ্গোডিবি ব্যবহার করলে)
mongoose.connect('mongodb://127.0.0.1:27017/unani_ayurvedic_db')
    .then(() => console.log('MongoDB Connected Successfully'))
    .catch(err => console.log('Database Connection Error:', err));

// ২. শিক্ষক ডাটাবেস স্কিমা (আপনার ৫টি পয়েন্ট অনুযায়ী)
const teacherSchema = new mongoose.Schema({
    // ১. প্রোফাইল
    nameBn: String,
    nameEn: String,
    fatherName: String,
    motherName: String,
    address: String,
    ibasId: { type: String, required: true, unique: true }, // ১১ ডিজিট
    nid: String,
    designation: String,
    department: String,
    education: String,
    
    // ২. বেতন ও গ্রেড (iBAS++ অনুযায়ী)
    payGrade: String,
    basicPay: Number,
    incrementStep: String,
    nonPracticing: String,

    // ৩. ব্যাংক ও ইএফটি (EFT)
    bankAcc: String,
    bankName: String,
    routingNumber: { type: String, required: true }, // ৯ ডিজিট
    
    // ৪. চাকুরির রেকর্ড
    firstJoinDate: String,
    currentPostDate: String,
    jobType: String,
    prlDate: String,

    // ৫. কর্তন ও বাজেট কোড
    gpfInfo: String,
    incomeTax: String,
    ddoCode: String,
    economicCode: { type: String, default: "3111101" }
});

const Teacher = mongoose.model('Teacher', teacherSchema);

// ৩. এপিআই রাুটসমূহ

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

// ৪. সার্ভার পোর্ট সেটআপ
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});