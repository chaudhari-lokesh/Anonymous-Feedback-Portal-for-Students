const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
  topic: { type: String },
  category: { type: String },
  priority: { type: String, enum: ["Low", "Medium", "High"], default: "Low" },
  message: { type: String, required: true },
  image: { type: String },
}, { timestamps: true });

const FeedbackModel = mongoose.model('Feedback', FeedbackSchema);

module.exports = FeedbackModel;