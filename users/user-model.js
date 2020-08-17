const db = require("../database/dbConfig");

module.exports = {
    add,
    find,
    findBy
}

function find() {
    return db("auth").select("id", "username").orderBy("id")
}

function findBy(filter) {
    return db("auth").where(filter).orderBy("id")

}

async function add(user) {
    try {
        const [id] = await db("auth").insert(user, "id")
        return findById(id);
    } catch (error) {
        throw error;
    }
}