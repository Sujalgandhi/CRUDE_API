const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const secretKey = 'your_secret_key';

const addUser = async (req, res) => {
    try {
        let hashPass = await bcrypt.hash(req.body.password, 10);
        let user = await userModel.create({
            userName: req.body.userName,
            email: req.body.email,
            mobile: req.body.mobile,
            password: hashPass
        });
        res.status(201).send(user);
        console.log(user);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
}

const login = async (req, res) => {
    try {
        let email = req.body.email;
        let password = req.body.password;
        let userFind = await userModel.findOne({ email: email });

        if (!userFind) {
            return res.status(401).send("Login Error: User not found");
        }

        let passCheck = await bcrypt.compare(password, userFind.password);

        if (passCheck) {
            let payload = {
                id: userFind._id,
                email: userFind.email,
                userName: userFind.userName
            };

            let token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
            console.log(token);

            res.status(200).cookie("token", token, {
                httpOnly: true,  
                maxAge: 3600000 
            }).json({
                message: "Login Success",
                token: token
            });

        } else {
            res.status(401).send("Login Error: Invalid password");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
}

const deleteUser = async (req, res) => {
    try {
        let id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send("Invalid User ID format");
        }

        let deleteData = await userModel.findByIdAndDelete(id);
        if (deleteData) {
            res.status(204).send();
        } else {
            res.status(404).send("User not found");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
}

const update = async (req, res) => {
    try {
        let id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send("Invalid User ID format");
        }

        let userFind = await userModel.findById(id);
        if (!userFind) {
            return res.status(404).send("User not found");
        }

        let updateobj = {
            userName: req.body.userName,
            email: req.body.email,
            mobile: req.body.mobile
        };

        if (req.body.password) {
            let hashPass = await bcrypt.hash(req.body.password, 10);
            updateobj.password = hashPass;
        }

        let updateData = await userModel.findByIdAndUpdate(id, updateobj, { new: true });

        if (updateData) {
            res.status(200).send(updateData);
        } else {
            res.status(404).send("User not found");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
}

const showUsers = async (req, res) => {
    try {
        let show = await userModel.find();
        res.status(200).send(show);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
}

module.exports = { addUser, login, deleteUser, update, showUsers };
