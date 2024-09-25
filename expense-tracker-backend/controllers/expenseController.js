const Expense = require('../models/Expense');

exports.addExpense = async (req, res) => {
  try {
    const { amount, description, date, category, paymentMethod } = req.body;
    const expense = new Expense({ amount, description, date, category, paymentMethod, user: req.user.id });
    await expense.save();
    res.status(201).json(expense);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getExpenses = async (req, res) => {
  const { category, dateRange, paymentMethod } = req.query;
  const filters = { user: req.user.id };
  if (category) filters.category = category;
  if (dateRange) filters.date = { $gte: dateRange[0], $lte: dateRange[1] };
  if (paymentMethod) filters.paymentMethod = paymentMethod;
  const expenses = await Expense.find(filters).sort({ date: -1 });
  res.json(expenses);
};

exports.updateExpense = async (req, res) => {
  const { id } = req.params;
  try {
    const expense = await Expense.findByIdAndUpdate(id, req.body, { new: true });
    if (!expense) return res.status(404).json({ message: 'Expense not found' });
    res.json(expense);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteExpense = async (req, res) => {
  const { id } = req.params;
  try {
    const expense = await Expense.findByIdAndDelete(id);
    if (!expense) return res.status(404).json({ message: 'Expense not found' });
    res.json({ message: 'Expense deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
