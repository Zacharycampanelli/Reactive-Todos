//import mongoose in the application
import mongoose from 'mongoose';

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI ||'mongodb://localhost:27017/todos');

export default mongoose.connection