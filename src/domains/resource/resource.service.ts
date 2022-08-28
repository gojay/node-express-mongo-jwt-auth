import { IResourceDoc } from "./resource.interface";
import Resource from "./resource.model";

export const seedResources = async (): Promise<IResourceDoc[]> => {
  await Resource.deleteMany();

  const resources = await Resource.create([
    {
      name: "users",
      scopes: ["create:users", "read:users", "update:users", "delete:users"],
    },
    {
      name: "users_exclude_delete",
      scopes: ["create:users", "read:users", "update:users"],
    },
    {
      name: "products",
      scopes: [
        "create:products",
        "read:products",
        "update:products",
        "delete:products",
      ],
    },
    {
      name: "products_create_read_only",
      scopes: ["create:products", "read:products"],
    },
  ]);

  return resources;
};
