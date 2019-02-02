import { Query } from "./Query";
import { ads } from "./ads";

// This is weird but temporary
// Query will be in seperated folders
// with meaningful names in the future
export default {
  ...Query,
  ...ads
};
