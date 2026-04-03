import prisma from "../prisma/client.js";
import dotenv from "dotenv";
import bcrypt from 'bcrypt';

import { createTokenForUser } from "../services/authentication.js";

dotenv.config();


export async function createUser(req, res) {
    try {
        const { contactnumber, fullname, email, password } = req.body;

        const findUser = await prisma.user.findFirst({
            where: {
                OR: [
                    { email },
                    { contactnumber }
                ]
            }
        });

        if (findUser) {
            return res.status(409).json({
                message: "User already exists with this email or phone"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                contactnumber,
                fullname,
                email,
                password: hashedPassword,
            }
        });

        const role = await prisma.role.findUnique({
            where: {
                rolename: "Viewer"
            }
        });

        await prisma.userRole.create({
            data: {
                userId: newUser.id,
                roleId: role.id,
                isDeleted: false
            }
        });

        return res.status(201).json({
            message: "User created successfully"
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Signup failed"
        });
    }
}

export async function loginUser(req, res) {
    try {
        const { email, password } = req.body;

        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }

        const token = createTokenForUser(user);

        res.cookie("token", token, {
            httpOnly: true,
            secure: false, // true in production
            sameSite: "lax"
        });

        return res.status(200).json({
            message: "Login successful",
            token
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Login failed"
        });
    }
}


export async function deleteUser(req, res , next) {
    const { userId } = req.params;

    const findUser = await prisma.user.findUnique({
        where: {
            id: Number(userId),
        }
    })

    if (!findUser || findUser.isDeleted) {
        return res.status(404).json({ message: "User not found ..." });
    }

    const deletedUser = await prisma.user.update({
        where: {
            id: Number(userId),
        },
        data : {
            isDeleted : true
        }
    })
    req.objectId =  userId;
    res.status(200).json({ message: "user deleted ..." })
    next();
}

export async function logOutHelper(req, res) {
    res.clearCookie("token");
    return res.status(200).json({ message: "logout sucessfull !" });
}

export async function getUser(req, res) {
    const user = req.user;
    return res.status(200).json({ user });
}