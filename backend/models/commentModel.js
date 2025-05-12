import mongoose from "mongoose";

export const commentSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    text: { type: String, required: true }, 
    rate: { type: Number, min: 1, max: 5, default: 5 }, 
    createdAt: { type: Date, default: Date.now }
  },
  { _id: false }
);
// _id: false serve per non creare un nuovo id per ogni commento