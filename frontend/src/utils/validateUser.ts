import { getFromLocalStorage } from "./localStorage/storage";

export function validateUser() {
  const user = getFromLocalStorage("user");
  return user;
}
