const connection = require("../config/db");
const db = connection.promise();

// const validate = (data) => {
//   return Joi.object({
//     ident: Joi.string().max(254).required(),
//     password: Joi.string().max(255).required(),
//   }).validate(data, { abortEarly: false }).error;
// };

const findUsers = async () => {
    try {
        const users = await db.query("SELECT * FROM users");
        return users[0];
    } catch (error) {
        return Promise.reject(error);
    }
};

const findByEmail = async (email) => {
    try {
        const user = await db.query("SELECT * FROM users WHERE email = ?", [
            email,
        ]);
        return user[0][0];
    } catch (error) {
        return Promise.reject(error);
    }
};

const create = async (pseudo, likes, email, hashedPassword) => {
    try {
        const response = await db.query(
            "INSERT INTO users (pseudo, likes, email, password) VALUES (?,?,?,?)",
            [pseudo, likes, email, hashedPassword]
        );
        return response[0];
    } catch (error) {
        return Promise.reject(error);
    }
};

module.exports = { findUsers, findByEmail, create };