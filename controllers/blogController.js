const blogModel = require('../models/blogModel.js');
const express = require('express');
const app = express();
app.use(express.json());

class BlogController {

    static getAllBlogs = async (req, res) => {
        try {
            const fetchAllBlogs = await blogModel.find();
           
            return res.status(200).json(fetchAllBlogs);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }


    static addNewBlog = async (req, res) => {
        const { title, category, description } = req.body; // Correctly access req.body
        try {
            if (title && category && description) {
                const addBlog = new blogModel({
                    title: title,
                    category: category,
                    description: description,
                    thumbnil: req.file ? req.file.filename : null, // Check if req.file exists
                    user: req.user ? req.user._id : null, // Ensure req.user exists
                });
                const savedBlog = await addBlog.save();
                if (savedBlog) {
                    return res.status(200).json({ message: "Blog added successfully" });
                } else {
                    return res.status(500).json({ message: "Blog not added" });
                }
            } else {
                res.status(400).json({ message: "All fields are required" }); // Use 400 for bad request
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    static getSingleBlog = async (req, res) => {
        const { id } = req.params; // Correctly access req.params
        try {
            if (id) {
                const fetchBlogByID = await blogModel.findById(id); // Correct spelling of findById
                if (fetchBlogByID) {
                    return res.status(200).json(fetchBlogByID);
                } else {
                    return res.status(404).json({ message: "Blog not found" }); // Handle not found case
                }
            } else {
                return res.status(400).json({ message: "Invalid URL" }); // Use 400 for bad request
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };
}

module.exports = BlogController;
