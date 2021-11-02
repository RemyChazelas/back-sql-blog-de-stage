const postsRouter = require("./posts")
const usersRouter = require("./users")
const authRouter = require("./auth");

const setupRoutes = (app) => {
    app.use("/auth", authRouter);
    app.use("/users", usersRouter);
    app.use("/posts", postsRouter);
};

module.exports = { setupRoutes };