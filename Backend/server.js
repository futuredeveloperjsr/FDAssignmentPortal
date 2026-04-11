import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import Homework from './models/Homework.js';
import upload from './config/cloudinary.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const ADMIN_PASSWORD = "Tera_Secret_Password"; 
const JWT_SECRET = "Abhishek_Ka_Secret_Key";

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
        await Homework.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server on ${PORT}`));