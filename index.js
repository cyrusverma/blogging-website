const express = require('express');
const connectToMongoos = require('./config/db.js');
const cors =require('cors');

const app = express();
const PORT = 9000;
const authRoutes = require('./routes/blog.js'); // Ensure this path matches your folder structure

connectToMongoos();
 // Add this to parse JSON bodies
app.use(cors());
app.use(express.json());
app.use(express.static("public/upload"));
app.get('/', (req, res) => {
    res.send('API IS RUNNING');
});

// Use the correct API route
app.use('/api/v1', authRoutes);

app.listen(PORT, () => {
    console.log(`API is running on ${PORT}`);
});
