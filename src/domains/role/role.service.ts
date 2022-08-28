import Role from "./role.model";
import Resource from "../resource/resource.model";
import { IRoleDoc } from "./role.interface";

export const seedRoles = async (): Promise<IRoleDoc[]> => {
  await Role.deleteMany();

  const [superAdminResources, adminResources, staffResources] =
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
      name: "Staff",
      resources: staffResources,
    },
  ]);

  return roles;
};
