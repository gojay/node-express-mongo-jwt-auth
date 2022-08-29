import Role from "./role.model";
import Resource from "../resource/resource.model";
import { IRoleDoc } from "./role.interface";

export const seedRoles = async (): Promise<IRoleDoc[]> => {
  await Role.deleteMany();

  const [superAdminResources, adminResources, userResources] =
    await Promise.all([
      Resource.find({
        name: {
          $in: ["users", "products"],
        },
      }),
      Resource.find({
        name: {
          $in: ["users_exclude_delete", "products"],
        },
      }),
      Resource.find({
        name: {
          $in: ["products_create_read_only"],
        },
      }),
    ]);

  const roles = await Role.create([
    {
      name: "Super Admin",
      resources: superAdminResources,
    },
    {
      name: "Admin",
      resources: adminResources,
    },
    {
      name: "User",
      resources: userResources,
    },
  ]);

  return roles;
};

export const getRoles = async (fields?: string): Promise<IRoleDoc[]> => {
  const roles = Role.find().populate("resources");
  if (fields) {
    roles.select(fields);
  }
  return roles.exec();
};
