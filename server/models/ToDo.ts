import { Schema, model } from 'mongoose';

const ToDoSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

const ToDo = model('ToDo', ToDoSchema);

export default ToDo;