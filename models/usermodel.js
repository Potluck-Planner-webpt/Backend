const db = require('../data/dbconfig');

function getFoods(id) {
    return db('foods').where('user_id', id).orderBy('id')
}

function getUserById(id) {
    return db('users')
    .where("id", id)
    .first();
}

function addFood(foodData) {
    return db('foods').insert(foodData, 'id').then((ids) => {
        const [id] = ids;
        return db('foods').where({id}).first().then((obj) => {
            return getFoods(obj.user_id);
        })
    })
}


async function insert(food) {
    const [id] = await db("foods").insert(food);
    return findById(id)
}

function updateFood(food, foodid) {
    return db('foods')
    .update(food)
    .where({id: foodid})
}

function removeFoods(foodid) {
    return db('foods').where({id: foodid}).del();
}

function find() {
    return db('users').select('id', 'username', 'password');
}

module.exports = {
    getFoods,
    getUserById,
    insert,
    updateFood,
    removeFoods,
    find,
    addFood
}