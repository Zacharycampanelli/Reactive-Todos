import { create } from 'domain';

const { db } = require('../config/firebase');

//  Create Profile
exports.createUserProfile = async (req, res) => {
  const { uid, email, name } = req.body;

  try {
    const userRef = db.collection('users').doc(uid);
    await userRef.set({ email, name, createdAt: new Date(), tasks: [] });
    return res.status(201).json({ message: 'Profile created successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};
