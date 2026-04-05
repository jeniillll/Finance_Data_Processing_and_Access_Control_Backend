import prisma from "../../prisma/client.js";

export async function findAllDepartments() {
    const departments = await prisma.department.findMany({});

    return departments;
}

export async function findDepartmentByName(deptName) {
    const dept = await prisma.department.findUnique({
        where: {
            departmentName: deptName
        }
    })
    return dept;
}

export async function createDepartment(deptName) {
    const newDepartment = await prisma.department.create({
        data: {
            departmentName: deptName,
        }
    });

    return newDepartment;
}