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

// Get user's tasks
exports.getUserTasks = async (req, res) => {
  const { uid } = req.params;

  try {
    const tasksSnapshot = await db.collection('tasks').where('id', '==', uid).get();
    const tasks = tasksSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));S

    return res.status(200).json(tasks);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Update task
exports.updateTask = async (req, res) => {
  const { taskId } = req.params;
  const { title, isDone } = req.body;

  try {
    const taskRef = db.collection('tasks').doc(taskId);
    await taskRef.update({ title, isDone, updatedAt: new Date() });

    return res.status(200).json({ message: 'Task updated successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete task
exports.deleteTask = async (req, res) => {
  const { taskId, uid } = req.params;

  try {
    const taskRef = db.collection('tasks').doc(taskId);
    await taskRef.delete();

    // Remove task from user's tasks
    const userRef = db.collection('users').doc(uid);
    await userRef.update({
      tasks: admin.firestore.FieldValue.arrayRemove(taskId),
    });

    return res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};  