const router = require('express').Router();
const { Post, User } = require('../../models');

router.get("/", (req, res) => {
    Post.findAll({
        attributes: ["id", "post_url", 'title', 'created_at'],
        order: [['created_at', 'DESC']],
        include: [{
            model: User,
            attributes: { exclude: ['password'] }
        }]
    })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get("/:id", (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        include: [{
            model: User,
            attributes: { exclude: ['password'] }
        }]
    })
        .then(data => {
            if (!data) {
                res.status(400).json({ message: "No post found with this id" });
                return;
            }
            res.json(data)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post("/", (req, res) => {

    const { title, post_url, user_id } = req.body;

    Post.create({ title, post_url, user_id })
        .then(data => res.json(data))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

router.put("/:id", (req, res) => {
    Post.update(
        {
            title: req.body.title
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
        .then(data => {
            if (!data) {
                res.status(400).json({ message: "No post found with this id" });
                return;
            }
            res.json(data);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.delete("/:id", (req,res) => {
    Post.destroy(
            {
                where: {
                    id: req.params.id
                }
            }
        )
        .then(data => {
            if (!data) {
                res.status(400).json({message: "No post found with this id"})
            }
            res.json(data)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

module.exports = router;