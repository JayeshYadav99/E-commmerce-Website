
import mongoose from "mongoose";
import productModel from "../models/productModel.js";

// Replace 'your_mongodb_uri' with your actual MongoDB connection URI
const mongoURI = 'mongodb+srv://Jazzy49:MyNodeApp@nodeprojects.tsxlcqi.mongodb.net/Datadb?retryWrites=true&w=majority';

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

// Get the default connection
const db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
  // Call the function to delete documents
  deleteDocuments();
});

const deleteDocuments = async () => {
  try {
    // Define the condition to delete documents with name equal to "GT WATCH"
    const condition = { name: "GT WATCH" };

    // Use deleteMany to delete documents that match the condition
    const result = await productModel.deleteMany(condition);

    console.log(`${result.deletedCount} documents deleted successfully.`);
  } catch (error) {
    console.error('Error deleting documents:', error);
  } finally {
    // Close the MongoDB connection after the operation is complete
    mongoose.connection.close();
  }
};
