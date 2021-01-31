import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin USer",
    email: "admin@example.com",
    password: bcrypt.hashSync("12345", 10),
    isAdmin: true,
  },
  {
    name: "wuyep",
    email: "wuyep@gmail.com",
    password: bcrypt.hashSync("12345", 10),
  },
  {
    name: "abdul",
    email: "abdul@gmail.com",
    password: bcrypt.hashSync("12345", 10),
  },
];

export default users;
