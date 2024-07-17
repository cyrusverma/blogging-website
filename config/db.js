const mongoose = require('mongoose');

const connectToMongoos = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/blog-mern-project", {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        });
        console.log("Connected to db");
    } catch (error) {
        console.error("Error connecting to db", error);
    }
};

module.exports = connectToMongoos;
