import bcrypt from "bcrypt";

export default [
  { userId: 123, password: bcrypt.hashSync("123456", 10), userName: "test" },
  { userId: 123, password: bcrypt.hashSync("abcd123", 10), userName: "test2" }
];
