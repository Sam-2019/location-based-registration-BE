const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID,
} = graphql;

const UserSchema = require("../db/schema/user");
const RegisterSchema = require("../db/schema/register");

const UserType = new GraphQLObjectType({
  name: "UserType",
  fields: () => ({
    id: { type: GraphQLID },
    token: { type: GraphQLString },
    firstname: { type: GraphQLString },
    lastname: { type: GraphQLString },
    department: { type: GraphQLString },
    date: { type: GraphQLString },
    registered: { type: new GraphQLList(RegisterType) },
  }),
});

const RegisterType = new GraphQLObjectType({
  name: "RegisterType",
  fields: () => ({
    id: { type: GraphQLID },
    user: { type: UserType },
    date: { type: GraphQLString },
    token: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    signups: {
      type: new GraphQLList(UserType),
      resolve(parentValue, args) {
        const list = UserSchema.find().populate("registered");
        return list;
      },
    },

    registered: {
      type: new GraphQLList(RegisterType),
      resolve(parentValue, args) {
        return RegisterSchema.find().populate("user");
      },
    },

    user: {
      type: UserType,
      args: {
        user: {
          type: new GraphQLNonNull(GraphQLID),
        },
      },
      resolve(parentValue, { user }) {
        const data = UserSchema.findById(user).populate("registered");
        return data;
      },
    },
  }),
});

const RootMutation = new GraphQLObjectType({
  name: "RootMutationType",
  fields: {
    signup: {
      type: UserType,
      args: {
        token: {
          type: new GraphQLNonNull(GraphQLString),
        },
        firstname: {
          type: new GraphQLNonNull(GraphQLString),
        },
        lastname: {
          type: new GraphQLNonNull(GraphQLString),
        },
        department: {
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      resolve(parentValue, { token, firstname, lastname, department }) {
        var user = new UserSchema({
          token,
          firstname,
          lastname,
          department,
        });

        user.save();
        return user;
      },
    },
    register: {
      type: RegisterType,
      args: {
        user: {
          type: new GraphQLNonNull(GraphQLID),
        },
        token: {
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      resolve(parentValue, { user, token }) {
        var register = new RegisterSchema({
          user,
          token,
        });
        register
          .save()
          .then((result) => {
            // console.log(result)
            return UserSchema.findById(user);
          })
          .then((user) => {
            //    console.log(user);
            user.registered.push(register);
            return user.save();
          });
        return register;
      },
    },
  },
});

const DataSchema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});

module.exports = DataSchema;
