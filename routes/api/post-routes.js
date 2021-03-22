const router = require('express').Router();
const { Post, User } = require('../../models');

router.get("/", (req, res) => {
    Post.findAll({
        attributes: ["id", "post_url", 'title', 'created_at'],
        include: [{
            model: User,
            attributes: {exclude: ['password']}
        }]
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get("/:id", (req,res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        include: [{
            model: User,
            attributes: {exclude: ['password']}
        }]
    })
    .then(data => {
        if (!data){
            res.status(400).json({message: "No post found with this id"});
            return;
        }
        res.json(data)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

module.exports = router;