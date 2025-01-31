const { db } = require('../config/firebase');

// Create Task
exports.createTask = async (req, res) => {
  const { uid, title, isDone } = req.body;

  try {
    const newTaskRef = db.collection('tasks').doc();
    const newTask = { uid, title, isDone, createdAt: new Date() };

    await newTaskRef.set(newTask);

    // Update user's tasks
    const userRef = db.collection('users').doc(uid);
    await userRef.update({
      tasks: admin.firestore.FieldValue.arrayUnion(newTaskRef.id),
    });

    return res.status(201).json({ message: 'Task created successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};
