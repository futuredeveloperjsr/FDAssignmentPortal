import mongoose from "mongoose";

const homeworkSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    targetClass: { type: String, required: true },
    subject: {
        type: String,
        required: true,
        enum: ['Math', 'Science', 'Social Science', 'English', 'Hindi', 'Computer Science']
    },
    pdfUrl: { type: String, required: true },
    createdAt: {
        type: Date,
        default: Date.now
    }, 
}, {});

export default mongoose.model('Homework', homeworkSchema);