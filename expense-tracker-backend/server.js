const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');

dotenv.config();
const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

// Routes
const expenseRoutes = require('./routes/expenseRoutes');
const authRoutes = require('./routes/authRoutes');

app.use('/api/expenses', expenseRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5500;

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
