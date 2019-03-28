import { Query } from "./Query";
import { ads } from "./ads";
import { car } from "./car";
import { offers } from "./offers";
import { prices } from "./prices";
import { users } from "./user";

// This is weird but temporary
// Query will be in seperated folders
// with meaningful names in the future
export default {
  ...Query,
  ...ads,
  ...car,
  ...offers,
  ...prices,
  ...users
};
