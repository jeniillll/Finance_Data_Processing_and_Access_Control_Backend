import { findUserById, updateUserActiveStatus, softDeleteUser } from "../../repositories/admin/user.repository.js";

export async function updateUserActiveStatusService(params, body) {
    const userId = Number(params.userId);
    const { isActive } = body;

    const user = await findUserById(userId);

    if (!user) {
        return {
            statusCode: 404,
            message: "User not found"
        };
    }

    await updateUserActiveStatus(userId, isActive);

    return {
        statusCode: 200,
        message: `User ${isActive ? "activated" : "deactivated"} successfully`
    };
}

export async function deleteUserService(params) {
    const userId = Number(params.userId);

    const user = await findUserById(userId);

    if (!user || user.isDeleted) {
        return {
            statusCode: 404,
            message: "User not found"
        };
    }

    await softDeleteUser(userId);

    return {
        statusCode: 200,
        message: "User deleted successfully"
    };
}