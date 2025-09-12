// config/db.js
const mongoose = require('mongoose'); 

//connecting to mongodb 
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {  // taking the mongo-url for .env file 
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);  //showing with host is connected (not using this console log in production )
    } catch (error) {
        console.error(error.message);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB; // exporting the db connection or promise 
