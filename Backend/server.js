import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import Homework from './models/Homework.js';
import upload from './config/cloudinary.js';
import User from './models/User.js';
import bcrypt from 'bcryptjs';
import { v2 as cloudinary } from 'cloudinary';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error(err));

app.post('/api/admin/login', (req, res) => {
    const { password } = req.body;
    
    const envPassword = String(process.env.ADMIN_PASSWORD);
    const inputPassword = String(password);

    if (inputPassword === envPassword) {
        const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
        return res.json({ success: true, token });
    }
    
    res.status(401).json({ success: false });
});

// Add Student Form Route
app.post('/api/admin/add-student', async(req, res) => {
    try {
        const { name, email, studentClass, password } = req.body;

        // checking if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email pahle se registered hai!" });
        }

        // hashing the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // creating new user
        const newStudent = new User({
            name,
            email,
            password: hashedPassword,
            role: 'student', // Role always student
            studentClass
        });

        // Saving the user to the database
        await newStudent.save();
        res.status(201).json({ message: "Student added successfully!" });

    } catch (error) {
        console.error("Add Student Error:", error);
        res.status(500).json({ error: "Error in Server." });
    }
});

app.get('/api/admin/students', async (req, res) => {
    try {
        const students = await User.find({ role: 'student' }).select('-password').sort({ createdAt: -1 });
        res.json(students);
    } catch (error) {
        console.error("Fetch Students Error:", error);
        res.status(500).json({ error: "Server error." });
    }
});

app.delete('/api/admin/students/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: "Student deleted successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete student." });
    }
});
app.put('/api/admin/students/reset-password/:id', async (req, res) => {
    try {
        const { newPassword } = req.body;
        
        if (!newPassword) {
            return res.status(400).json({ message: "Enter new password" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        await User.findByIdAndUpdate(req.params.id, { password: hashedPassword });
        
        res.json({ message: "Password successfully update ho gaya!" });
    } catch (error) {
        console.error("Reset Password Error:", error);
        res.status(500).json({ error: "Server error." });
    }
});

app.get('/api/homework/:className/:subjectName', async (req, res) => {
    try {
        const { className, subjectName } = req.params;
        const data = await Homework.find({ targetClass: className, subject: subjectName });
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/homework-all', async (req, res) => {
    try {
        const list = await Homework.find().sort({ createdAt: -1 });
        res.json(list);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/homework/upload', upload.single('pdfFile'), async (req, res) => {
    try {
        const { title, description, targetClass, subject } = req.body;
        const newHw = new Homework({
            title, description, targetClass, subject,
            pdfUrl: req.file.path
        });
        await newHw.save();
        res.status(201).json(newHw);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/homework/:id', async (req, res) => {
    try {
        const homework = await Homework.findById(req.params.id);
        
        if (!homework) {
            return res.status(404).json({ message: "Homework not found" });
        }

        if (homework.fileUrl) {
            const parts = homework.fileUrl.split('/');
            const fileNameWithExtension = parts[parts.length - 1];
            const publicIdWithoutExtension = fileNameWithExtension.split('.')[0];
            const fullPublicId = `Assignments/${publicIdWithoutExtension}`; 

            await cloudinary.uploader.destroy(fullPublicId);
        }

        await Homework.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted successfully" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/student/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const student = await User.findOne({ email, role: 'student' });
        if (!student) {
            return res.status(400).json({ message: "INVALID Email." });
        }

        const isMatch = await bcrypt.compare(password, student.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Wrong Password!" });
        }

        const token = jwt.sign(
            { id: student._id, role: student.role, studentClass: student.studentClass },
            process.env.JWT_SECRET || 'secret',
            { expiresIn: '7d' }
        );

        res.json({ 
            success: true, 
            token, 
            student: { name: student.name, studentClass: student.studentClass } 
        });
    } catch (error) {
        res.status(500).json({ error: "Server error." });
    }
});

app.get('/api/student/homework/:studentClass', async (req, res) => {
    try {
        const { studentClass } = req.params;
        const data = await Homework.find({ targetClass: studentClass }).sort({ createdAt: -1 });
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server on ${PORT}`));