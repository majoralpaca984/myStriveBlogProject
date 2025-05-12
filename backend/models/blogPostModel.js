import mongoose from 'mongoose';
import { commentSchema } from './commentModel.js'; 


const blogPostSchema = new mongoose.Schema(
  {
    category: { type: String, required: true }, 
    title: { type: String, required: true },
    cover: { type: String },
    readTime: {
      value: { type: Number, required: true },
      unit: { type: String, enum: ["minutes", "seconds"], required: true },
    }, 
    author: { type: mongoose.Schema.Types.ObjectId, ref: "Author", required: true }, // ✅ usa ref per collegamento autore
    content: { type: String, required: true },
    comments: [commentSchema] 
  },
  { timestamps: true }
);

const BlogPost = mongoose.model('BlogPost', blogPostSchema);
export default BlogPost;
