import bcrypt from "bcrypt";
import { findUserByEmail, findUserByEmailOrPhone, createUser, findRoleByName, assignRoleToUser } from "../repositories/auth.repository.js";

import { createTokenForUser } from "./authentication.js";

export async function createUserService(body) {
    const { contactnumber, fullname, email, password } = body;

    const existingUser = await findUserByEmailOrPhone(email, contactnumber);

    if (existingUser) {
        return {
            statusCode: 409,
            message: "User already exists with this email or phone"
        };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await createUser({
        contactnumber,
        fullname,
        email,
        password: hashedPassword
    });

    const defaultRole = await findRoleByName("Viewer");

    await assignRoleToUser(newUser.id, defaultRole.id);

    return {
        statusCode: 201,
        message: "User created successfully"
    };
}

export async function loginUserService(body) {
    const { email, password } = body;

    const user = await findUserByEmail(email);

    if (!user || user.isDeleted) {
        return {
            statusCode: 404,
            message: "User not found"
        };
    }

    if (!user.isActive) {
        return {
            statusCode: 403,
            message: "Your account has been deactivated by admin"
        };
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return {
            statusCode: 401,
            message: "Invalid credentials"
        };
    }

    const token = createTokenForUser(user);

    return {
        statusCode: 200,
        token: token,
        message: "Login successful"
    };
}