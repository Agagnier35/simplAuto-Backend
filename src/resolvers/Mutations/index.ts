import { auth } from "./auth";
import { post } from "./post";
import { user } from "./user";
import { car } from "./car";
import { ad } from "./ad";

export default {
  ...auth,
  ...post,
  ...user,
  ...car,
  ...ad
};
