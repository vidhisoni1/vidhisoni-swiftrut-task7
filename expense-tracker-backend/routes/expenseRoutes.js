const express = require('express');
const { addExpense, getExpenses, updateExpense, deleteExpense } = require('../controllers/expenseController');
const { protect, authorize } = require('../middleware/authMiddleware');
const router = express.Router();

router
  .route('/')
  .post(protect, addExpense)
  .get(protect, getExpenses);

router
  .route('/:id')
  .patch(protect, authorize('admin', 'user'), updateExpense)
  .delete(protect, authorize('admin', 'user'), deleteExpense);

module.exports = router;
