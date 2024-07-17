const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController.js');
const BlogController = require('../controllers/blogController.js');
const CategoryController = require('../controllers/categoryController.js');
const multer = require('multer');
const checkIsUserAuthenticated = require('../middlewares/authMiddleware.js');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/upload');
    }, // Directory to save uploaded files
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage: storage });

// Authentication routes
router.post('/user/register', AuthController.userRegistration);
router.post('/user/login', AuthController.userLogin);

// Protected routes
router.get('/get/allblogs', checkIsUserAuthenticated, BlogController.getAllBlogs);
router.post('/add/blog', upload.single("thumbnil"), checkIsUserAuthenticated, BlogController.addNewBlog);
router.get('/get/blog/:id', checkIsUserAuthenticated, BlogController.getSingleBlog);

router.get('/get/categories', checkIsUserAuthenticated, CategoryController.getAllCategories);
router.post('/add/category', checkIsUserAuthenticated, CategoryController.addNewCategories);

module.exports = router;
