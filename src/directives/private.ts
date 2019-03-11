import { SchemaDirectiveVisitor } from "graphql-tools";
import { defaultFieldResolver } from "graphql";
import { Context as Ctx } from "../utils";
import { Permission } from "../generated/prisma-client";

interface Context extends Ctx {
  userId?: string;
  permissions: [Permission];
  connection?: any;
}

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

      let id;
      if (context.request) {
        // (http)
        id = context.request.userId;
      } else if (context.userId) {
        // Playground (websocket)
        id = context.userId;
      } else if (context.connection) {
        // App (websocket)
        id = context.connection.context.userId;
      } else {
        // If theres no token
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
