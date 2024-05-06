import { Schema, model } from "mongoose";

const article = new Schema({
    title: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref:"user",
    }
});

export default model("Article", article);