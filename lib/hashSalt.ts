import * as bcrypt from "bcrypt";

export async function hashPassword(password: string) {
  const saltRounds = 10; // standar
  const hashed = await bcrypt.hash(password, saltRounds);

  return hashed;
}
