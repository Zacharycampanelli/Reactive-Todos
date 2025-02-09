import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new Schema({
    name:{
        type: String,
        required: true
    },
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

// Hash the user password before saving it to the database
UserSchema.pre('save', async function(next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next();
})

// Custom method to compare and validate password for logging in
UserSchema.methods.isCorrectPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}

const User = model('User', UserSchema);

export default User;