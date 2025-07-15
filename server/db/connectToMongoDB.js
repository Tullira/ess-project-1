import mongoose from "mongoose";

const connectToMongoDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://tfcl:byBDc2RpYRBYGiQk@cluster0.q8lmdsw.mongodb.net/")
        console.log("Successfully connected to MongoDB")
    } catch (error) {
        console.log("Error connecting to MongoDB:", error.message)
    }
}

export default connectToMongoDB