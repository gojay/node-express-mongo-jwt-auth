print("################# START MONGO_INIT #################");
db.auth("root", "password");
db = db.getSiblingDB("sample_db");
db.createUser({
  user: "sample_user",
  pwd: "12345678",
  roles: [
    {
      role: "dbOwner",
      db: "sample_db",
    },
  ],
});
print("################# END MONGO_INIT #################");
