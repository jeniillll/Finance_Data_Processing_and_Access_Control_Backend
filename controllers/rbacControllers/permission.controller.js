import prisma from "../../prisma/client.js";

export async function assignPermission(req, res, next) {
  try {
    const { roleId, tableId, operationId } = req.params;

    let permissionUser = await prisma.rolePermission.findUnique({
      where: {
        roleId_tableId_operationId: {
          roleId: Number(roleId),
          tableId: Number(tableId),
          operationId: Number(operationId)
        }
      }
    });

    if (!permissionUser) {
      permissionUser = await prisma.rolePermission.create({
        data: {
          roleId: Number(roleId),
          tableId: Number(tableId),
          operationId: Number(operationId)
        }
      });
    } else if (permissionUser.isDeleted) {
      await prisma.rolePermission.update({
        where: {
          roleId_tableId_operationId: {
            roleId: Number(roleId),
            tableId: Number(tableId),
            operationId: Number(operationId)
          }
        },
        data: {
          isDeleted: false,
        }
      });
    } else {
      return res.status(409).json({ message: "Permission already exitns ..." });
    }

    res.json({ message: "Permission granted" });

    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


export async function deAssignPermission(req, res, next) {
  try {
    const { roleId, tableId, operationId } = req.params;

    const permissionUser = await prisma.rolePermission.findUnique({
      where: {
        roleId_tableId_operationId: {
          roleId: Number(roleId),
          tableId: Number(tableId),
          operationId: Number(operationId)
        }
      }
    });

    if (!permissionUser || permissionUser.isDeleted)
      return res.status(404).json({ message: "This permission does not exists!" });

    await prisma.rolePermission.update({
      where: {
        roleId_tableId_operationId: {
          roleId: Number(roleId),
          tableId: Number(tableId),
          operationId: Number(operationId)
        }
      },
      data: {
        isDeleted: true,
      }
    });

    res.json({ message: "Permission taken ..." });
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}