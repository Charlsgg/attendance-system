require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const User = require('./models/User');
const bcrypt = require('bcryptjs');

// Middleware
app.use(cors());
app.use(express.json());
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// Database connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Test route
app.get('/', (req, res) => res.send('API Running'));

// const seedUsers = async () => {
//   try {
//     // Clear existing users (optional)
//     await User.deleteMany();

//     const hashedPassword = await bcrypt.hash('password123', 10);

//     const users = [
//       {
//         name: 'Admin User',
//         email: 'admin@example.com',
//         password: hashedPassword,
//         role: 'admin'
//       },
//       {
//         name: 'Regular User',
//         email: 'user@example.com',
//         password: hashedPassword,
//         role: 'user'
//       }
//     ];

//     await User.insertMany(users);
//     console.log('Users seeded successfully');
//     process.exit();
//   } catch (err) {
//     console.error(err);
//     process.exit(1);
//   }
// };
// seedUsers();


app.get('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // Send user data without the password
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));