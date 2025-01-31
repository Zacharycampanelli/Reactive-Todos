import { create } from 'domain';

const { db } = require('../config/firebase');

//  Create Profile
exports.createUserProfile = async (req, res) => {
  const { uid, email, name } = req.body;

  try {
    const userRef = db.collection('users').doc(uid);
    await userRef.set({ email, name, createdAt: new Date(), tasks: [], password });
    return res.status(201).json({ message: 'Profile created successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.loginUser = async (req, res) => {
  const { uid } = req.body;

  try {
    const userRef = db.collection('users').doc(uid);
    const user = await userRef.get();

    if (!user.exists) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(user.data());
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
}