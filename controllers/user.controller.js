const User = require("../models/user");
const ApiError = require("../utils/apiError");
const asyncHandler = require("express-async-handler");
const validator = require("../utils/user.validator");

class UserController{
    signUP = asyncHandler(async(req,res,next)=>{
        const {name, email, password,gender,role} = req.body;
        const newUser = new User({
            name,
            email,
            password,
            gender,
            role
        })
        await newUser.save();
        res.status(200).json({
            status: "success",
            data:newUser
        });
    })

    findAll = asyncHandler(async(req,res,next)=>{
        const users = await User.find({});
        if (!users){ return next(new ApiError(`can't find users`, 404));}
        res.status(200).json({
            status: "success",
            data: users
        });
    })

    findone = asyncHandler(async (req, res,next) => {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) {
            return next(new ApiError(`Invalid id ${id}`, 404));
        }
        res.status(200).json({
            status: "success",
            data: user
        });
    })

    deleteOne = asyncHandler(async(req,res,next)=>{
        const {id} = req.params;
        const user = await User.findByIdAndDelete(id);
        if (!user){ return next(new ApiError(`Invalid id ${id} `, 404));}
        res.status(200).json({
            status: "success",
            data: user
        });
    }) 

    updateOne = asyncHandler(async(req,res,next)=>{
        const{id} = req.params;
        const{name,email,password,gender} = req.body;
        const user = await User.findByIdAndUpdate(id,{name,email,password,gender});
        if (!user){ return next(new ApiError(`Invalid id ${id} `, 404));}
        const updeatedUser = await User.findById(id);
        res.status(200).json({
            status: "success",
            data: updeatedUser
        });
    })

    login = asyncHandler(async(req,res,next)=>{
        const{email,password} = req.body;
        const user = await Todo.findOne(email);
        if(!user){
            return next(new ApiError(`User Not Found!`, 401));
        }
    })
}
module.exports = new UserController();