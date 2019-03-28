import { PrivateDirective } from "./private";
import { NotBannedDirective } from "./notBanned";

const schemaDirectives = {
  private: PrivateDirective,
  notBanned: NotBannedDirective
};

export default schemaDirectives;
