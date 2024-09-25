const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  category: { type: String, required: true },
  paymentMethod: { type: String, enum: ['cash', 'credit'], required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Expense', expenseSchema);
