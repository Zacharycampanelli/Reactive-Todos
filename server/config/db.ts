import mongoose from "mongoose";

mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/todoapp")
  .then(() => {
    ("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

export default mongoose.connection;
