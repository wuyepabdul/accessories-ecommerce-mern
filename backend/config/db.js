import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useUnifiedTopology: true,
      useCreateIndex: true,
      useNewUrlParser: true,
    });
    console.log(`Mongodb connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`error:${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
