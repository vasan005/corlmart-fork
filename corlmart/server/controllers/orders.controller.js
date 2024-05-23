
import Orders from "../models/order.model.js";
import express from 'express'

//create order
export const createOrder= async(req,res,next)=>{
    const newOrder = new Orders(req.body);
    try {
        const savedOrder= await newOrder.save();
        res.status(200).json(savedOrder);
    } catch (error) {
        res.status(500).json(error);
        
    }
}

//Edit or update orders
export const UpdateOrder = async (req,res)=>{
    try {
        const updatedOrder = await Orders.findByIdAndUpdate(
            req.params.id,{$set: req.body,},{new: true}
        );
        return res.status(200).json(updatedOrder);
        
    } catch (error) {
        return res.status(500).json(err);
        
    }

}



//delete orders

export const deleteOrder= async(req,res,next)=>{
    try {
        await Orders.findByIdAndDelete(req.params.id);
        return res.status(200).json("Order has been deleted...");
    } catch (error) {
        return res.status(500).json(error);
        
    }
}


//get all orders of particular user

export const getOrdersOfUser= async (req,res,next)=>{
    try {
        const orders = await Orders.find({userId: req.params.userId});
        return res.status(200).json(orders);
    } catch (error) {
        return res.status(500).json(error);
    }
}


// get orders of all users

export const OrdersOfAllUsers = async (req,res,next)=>{
    try {
        const orders= await Orders.find();
        return res.status(200).json(orders);
    } catch (error) {
        res.status(500).json(error);
    }
}

