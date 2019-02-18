import { SchemaDirectiveVisitor } from "graphql-tools";
import { defaultFieldResolver } from "graphql";
import { getUserId, Context } from "../utils";

export class PrivateDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field, details) {
    this.ensureFieldsWrapped(details.objectType, field.name);
  }

  ensureFieldsWrapped(objectType, fieldName) {
    // Mark the GraphQLObjectType object to avoid re-wrapping:
    const fields = objectType.getFields();

    const field = fields[fieldName];
    const { resolve = defaultFieldResolver } = field;
    field.resolve = async function(...args) {
      const context: Context = args[2];

      const user = await resolve.apply(this, args);

      const id = context.request.userId;

      // If theres no token
      if (!id) {
        return;
      }

      // If theres a token we need to check permissions
      const self = await context.prisma.user({ id });
      const isSelf = user.id === self.id;
      const isAdmin = self.permissions.includes("ADMIN");

      if (isAdmin || isSelf) {
        return user;
      }

      return;
    };
  }
}
