import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    toDos: [{
        type: Schema.Types.ObjectId,
        ref: 'ToDo'
    }]
}, { timestamps: true });

const User = model('User', UserSchema);

export default User;