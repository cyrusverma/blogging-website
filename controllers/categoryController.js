const  categoryModel=require('../models/categoryModel.js');
const express = require('express');
const app = express();

app.use(express.json()); // This line is essential to parse JSON bodies


class CategoryController {
    static getAllCategories = async (req, res) => {
       
try{
const fetchAllCategories= await categoryModel.find({})
res.status(200).json(fetchAllCategories);


}
catch(error){
    return res.status(400).json({message:error.message});
}



    };

    static addNewCategories = async (req, res) => {
        const {title}=req.body;
        try{
            if(title){
                const newCategory=  new categoryModel({ title: title });
                const savedCategory=await  newCategory.save();
                if(savedCategory){
                    return res.status(200).json({message:"Category added successfully"});
                }
                else{
                    return res.status(400).json({message:"error in adding new category"});
                }

            }
            else{
                return res.status(400).json({message:"title is required"})
            }

        }
        catch(error){
            return res.status(500).json({message:error.message});
        }
    };
}

module.exports = CategoryController;
