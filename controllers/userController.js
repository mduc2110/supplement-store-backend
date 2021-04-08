const User = require('../models/userModel');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
module.exports = {
    login: async (req, res) => {
        const { username, password } = req.body;
        try {
            const user = await User.findOne({
                username
            })
            .populate({
                path: 'roles',
                populate: {
                    path: 'permissions'
                }
            })
            .exec();
            delete user.password;
            // const user = [...rest];
            const formatRole = {
                roleName: user.roles.roleName,
                permissions: [...user.roles.permissions].map(item => item.permissionName)
            };
            const validPass = await bcrypt.compare(password, user.password);
            if(validPass){
                res.status(200).json(
                    {
                        'info': user,
                        'token': jwt.sign({
                            username: user.username, 
                            _id: user._id,
                            roles: formatRole
                    },process.env.TOKEN_SECRET, {expiresIn: "12h"})});
            }else {
                res.status(400).json({message: "invalid password"});  
            }
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    },
    create: async (req, res) => {
        const { username, password, email, fullName, dob, avatarUrl } = req.body;
        try {
            const usernameExist = await User.findOne({
                username
            });

            if(usernameExist) return res.status(400).send("Username already exists");

            const emailExist = await User.findOne({
                email
            });
            if(emailExist) return res.status(400).send('Email already exists');

            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password, salt);
            const user = new User({
                username,
                password: hashPassword,
                email,
                fullName, 
                dob,
                avatarUrl,
                roles: "606ddeb2b489213b9c59214c",
                active: 1
            });
            console.log(user);
            const savedUser = await user.save();
            res.status(201).json({message: "OK"});
        } catch (error) {
            res.status(404).json({message: error.message});
        }
    },
    getAll: async (req, res) => {
        try {
            const users = await User.find()
            .populate({
                path: 'roles',
                populate: {
                    path: 'permissions'
                }
            }).exec();
            res.status(200).json(users);
        } catch (error) {
            res.status(400);
        }
    },
    getOne: async (req, res) => {
        const {_id} = req.user;
        try {
            const user = await User.findOne({
                _id
            });

            // delete user.dataValues.password;
            res.status(200).json(user);
        } catch (error) {
            res.status(400).json({message: error.message});
        }
    },
    
    update: async (req, res) => {
        try {
            const {newMoney} = req.body;
            const {id} = req.user;
            if(newMoney){
                const user = await User.findOne({
                    where: {
                        user_id: id
                    }
                });
                await user.update({
                    money: newMoney,
                })
                res.status(200).json("success");
            }else{
                res.status(404);
            }
            
        } catch (error) {
            res.status(400).json({message: error.message});
        }
    }
};