import mongoose from "mongoose";
import User from "../models/User.js";
import Post from "../models/Post.js";
import {users, posts} from '../data/index.js'

export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/sosial_media', {
            family: 4
        });
        console.log('MongoDB connected...');

        await User.insertMany(users);
        await Post.insertMany(posts);
        console.log('Data inserted successfully!');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};