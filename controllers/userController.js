const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.userId; // Get the userId from URL parameter

    // Find the user by their _id
    const user = await User.findById(userId);

    if (!user) {
      console.log('User not found'); 
      return res.status(404).json({ error: 'User not found' });
    }

    // Return the user as JSON
    res.status(200).json({ user });
  } catch (error) {
    console.error('Error fetching user by ID:', error); // Log any errors
    res.status(500).json({ error: 'An error occurred while fetching user by ID' });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    // Fetch all users from the database

    const users = await User.find();
if (users.length === 0) {
  console.log('No users found');
} else {
  users.forEach((user, index) => {
    console.log(`User ${index + 1}:`);
    console.log(user);
  });
}

    // Return the list of users as JSON
    res.status(200).json({ users });
  } catch (error) {
    console.error('Error fetching users:', error); // Log any errors
    res.status(500).json({ error: 'An error occurred while fetching users' });
  }
};


exports.signup = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    // Check if the username already exists in the database
    const existingUser = await User.findOne({ username });
    
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = new User({
      username,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error during signup:', error); // Log the error
    res.status(500).json({ error: 'An error occurred during signup' });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

     console.log(username);


    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { 
      expiresIn: '12h',
    });

    res.status(200).json({ token });
  } catch (error) {
    console.error('Error during login:', error); // Log the error
    res.status(500).json({ error: 'An error occurred during login' });
  }
};