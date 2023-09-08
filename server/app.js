const express=require('express')
const app=express();
const mongoose=require('mongoose')
require('dotenv').config();
const PORT=3000;
app.get('/',(req,res)=>{
    res.send("I am back");
})
console.log(process.env.MONGO_URI)

mongoose.connect(`${process.env.MONGO_URI}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB Atlas:', err);
  });

app.listen(PORT,()=>{
    console.log(`Server is working at ${PORT}`);
})