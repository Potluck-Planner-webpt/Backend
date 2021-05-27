const router = require("express").Router();
const Users = require("../models/usermodel");



router.get("/",  (req,res) => {
    Users.find()
    .then(users => {
        res.json(users);
    })
    .catch(err => res.send(err));
})

router.get("/:id",  async(req, res, next) => {
    try {
        const User = await Users.getUserById(req.params.id)
        if(!User) {
            return res.status(404).json({
                message: "User not found"
            })
        }
        res.json(User)
    }catch(err) {
        next(err)
    }
})

router.get('/:id/foods',  (req, res) => {
    const {id} = req.params;
    Users.getFoods(id)
    .then(foods => {
        if(foods.length) {
            res.json(foods);
        } else {
            res.status(404).json({message: 'User has no food items'})
        }
    })
    .catch(err => {
        res.status(500).json({message: 'Failed to get food items'});
    })
})

router.post("/:id/foods",  async (req, res) => {
    const {id } = req.params;
    const foodsData = {...req.body, user_id: id}
    try {
        const newFood = await Users.addFood(foodData);
        res.status(201).json(newFood);
    } catch(err) {
        res.status(500).json({message: 'cannot add food item'})
    }
})

router.put("/:foods/:foodid",  async (req, res) => {
    const {_, foodid} = req.params;
    const foodData = req.body;
    try {
        const updated = await Users.updateFood(foodData, foodid);
        res.status(200).json(updated);
    } catch (err) {
        res.status(500).json({error: "Food item cannot be updated"})
    }
});

router.delete('/:foods/:foodid', (req, res) => {
    const {foodid} = req.params;

    Users.removeFoods(foodid)
    .then(deleted => {
        if(deleted) {res.json({removed: deleted})
    } else {
        res.status(404).json({Message: 'Could not find food item with given id'})
    }
    })
    .catch(err => {
        res.status(500).json({message: 'Failed to delete food item'})
    })
})



module.exports = router;