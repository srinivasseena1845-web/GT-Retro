const Menu = require('../models/Menu');
const mongoose = require('mongoose');

const createMenu = async (req, res) => {
    try {
        const { name, description, price, category, isAvailable } = req.body;

        if (!name || !description || price == null || !category) {
            return res.status(400).json({ message: "Required fields missing" });
        }

        const newMenu = await Menu.create({
            name,
            description,
            price,
            category,
            isAvailable
        });

        res.status(201).json(newMenu);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getMenus = async (req, res) => {
    const menus = await Menu.find();
    res.status(200).json(menus);
};

const updateMenu = async(req,res)=>{
    try {
        const {name,description,price,category,isAvailable} = req.body;
        const menu = await Menu.findByIdAndUpdate(req.params.id,{name,description,price,category,isAvailable},{new:true,runValidators:true});
        res.status(200).json(menu);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

const deleteMenu = async(req,res) => {
    const menu = await Menu.findByIdAndDelete(req.params.id);
    if(!menu){
        return res.status(404).json({message:"Menu not found"});
    }
    res.status(200).json({message:"Menu deleted successfully"}); 
}


// get by id



module.exports = { createMenu, getMenus, updateMenu, deleteMenu };