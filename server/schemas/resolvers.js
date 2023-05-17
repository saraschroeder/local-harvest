//resolvers
const User = require("./user");

const userResolvers = {
  Query: {
    users: () => User.find(),
    userById: (_, { userId }) => User.findById(userId),
  },
  Mutation: {
    createUser: (_, { email, userName, password, role, businessName, location }) => {
      const user = new User({
        email,
        userName,
        password,
        role,
        businessName,
        location
      });
      return user.save();
    },
    updateUser: (_, { userId, email, userName, password, role, businessName, location }) => {
      return User.findByIdAndUpdate(
        userId,
        { email, userName, password, role, businessName, location },
        { new: true }
      );
    },
    deleteUser: (_, { userId }) => {
      return User.findByIdAndDelete(userId);
    },
  },
  User: {
    posts: (parent) => {
      return Post.find({ _id: { $in: parent.posts } });
    },
  },
};

module.exports = userResolvers;