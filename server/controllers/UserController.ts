import { User } from '../models';
import { generateToken } from '../utils/jwtoken';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

export const register = async (req: any, res: any) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const user = await User.create({ name, email, password });
    const token = generateToken(user._id.toString() as string);
    res.status(201).json({ message: 'Registration successful', user, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req: any, res: any) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(400).json({ message: 'User does not exist' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

    res.status(200).json({ message: 'User logged in successfully', user, token });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(400).json({ message: error.message });
  }
};

export const forgottenPassword = async (req: any, res: any) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({ message: 'User does not exist' });
    }

    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '15m' });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: false,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });
    const mailOptions = {
      from: process.env.EMAIL,
      to: user.email,
      subject: 'Password Reset',
      html: `
        <h2>Please click on the link below to reset your password</h2>
        <a href="${process.env.CLIENT_URL}/?resetToken=${token}"}</a>
        <p><b>Note: </b> The link above will expire in 15 minutes</p>
        `,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error.message);
        return res.status(500).json({ message: error.message });
      }
      res.status(200).json({ message: `Email sent to ${user.email}` });
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const resetPassword = async (req: any, res: any) => {
  try {
    const { token, newPassword } = req.body;

    if (!token) {
      return res.status(400).json({ message: 'No token provided' });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(400).json({ message: 'Expired or invalid token' });
    }

    const user = await User.findOne({ email: decoded.email }).select('+password');
    if (!user) {
      return res.status(400).json({ message: 'User does not exist' });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    console.error('Reset Password Error:', error);
    res.status(400).json({ message: error.message });
  }
};

export const getUser = async (req: any, res: any) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Get User Error:', error);
    res.status(500).json({ message: 'Error retrieving user data' });
  }
};
