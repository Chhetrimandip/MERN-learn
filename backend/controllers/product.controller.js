import Product from "../models/product.model.js";
import mongoose from 'mongoose';  // Missing for ObjectId validation
export const createProduct = async (req, res) => {
    const product = req.body; //user will send the data in the body of the request
    if(!product.name || !product.price || !product.image){
        return res.status(400).json({message: "All fields are required"});
    }
    const newProduct = new Product(product);

    try {
        await newProduct.save();
        res.status(201).json({ success: true, message: "Product created successfully", data: newProduct }); 
    } catch (error) {
        console.error("Error creating product:", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};

export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid product ID" });
    }
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Product deleted successfully" });
    } catch (error) {
        console.error("Error deleting product:", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};
export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.error("Error fetching products:", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
}


export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const product = req.body;
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
        res.status(200).json({ success: true, data: updatedProduct });
    } catch (error) {
        console.error("Error updating product:", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};