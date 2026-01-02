const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const StudentModel = require('./models/Student');
const FeedbackModel = require('./models/Feedback');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/Students")
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    StudentModel.findOne({email: email})
    .then(student => {
        if(student) {
            if(student.password === password) {
                res.json("Success");
            } else {
                res.json("Password is incorrect");
            }
        } else {
            res.json("User not registered");
        }
    })
});


app.post('/register', async (req, res) => {
    StudentModel.create(req.body)
    .then(student => res.json(student))
    .catch(err => res.json(err));
});


const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const safe = Date.now() + "-" + file.originalname.replace(/\s+/g, '-');
    cb(null, safe);
  }
});
const upload = multer({ storage });

// POST feedback with optional image (use this route — replaces existing /feedback handler)
app.post('/feedback', upload.single('image'), async (req, res) => {
  try {
    const body = req.body || {};
    const topic = body.topic || '';
    const category = body.category || '';
    const priority = body.priority || 'Low';
    const message = body.message || body.msg || '';

    if (!message) return res.status(400).json({ error: 'message required' });

    const image = req.file ? req.file.filename : undefined;

    const fb = await FeedbackModel.create({ topic, category, priority, message, image });
    return res.status(201).json(fb);
  } catch (err) {
    console.error('Error saving feedback:', err);
    return res.status(500).json({ error: err.message || 'Server error' });
  }
});

// get all feedbacks
app.get('/feedbacks', async (req, res) => {
  try {
    const list = await FeedbackModel.find().sort({ createdAt: -1 }).lean();
    res.json(list);
  } catch (err) {
    console.error('Error loading feedbacks:', err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(3001, () => console.log('Server listening on http://localhost:3001'));

