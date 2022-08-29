import { seedResources } from "domains/resource/resource.service";
import { seedRoles } from "domains/role/role.service";
import { IUserDoc } from "domains/user/user.interface";
import Role from "domains/role/role.model";
import User from "domains/user/user.model";

export const seedUsers = async (): Promise<IUserDoc[]> => {
  await seedResources();
  await seedRoles();
  await User.deleteMany();

  const superAdminRole = await Role.findOne({ name: "Super Admin" });

  await User.create([
    {
      name: "John Doe",
      email: "john.doe@example.com",
      password: "12345678",
      role: superAdminRole,
    },
  ]);

  const users = await User.find().populate({
    path: "role",
    model: "Role",
    select: "-_id name resources",
    populate: {
      path: "resources",
      model: "Resource",
      select: "-_id scopes",
    },
  });

  return users;
};
