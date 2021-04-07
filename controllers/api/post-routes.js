const router = require('express').Router();
const { Post, User, Vote, Comment } = require('../../models');
const sequelize = require('../../config/connection');

router.get("/", (req, res) => {
    Post.findAll({
        attributes: ["id", "post_url", 'title', 'created_at',
            [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
        ],
        order: [['created_at', 'DESC']],
        include: [{
            model: User,
            attributes: { exclude: ['password'] }
        },
        {
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
            include: {
                model: User,
                attributes: ['username']
            }
        }
        ]
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
        attributes: [
            'id',
            'post_url',
            'title',
            'created_at',
            [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
        ],
        include: [{
            model: User,
            attributes: { exclude: ['password'] }
        },
        {
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
            include: {
                model: User,
                attributes: ['username']
            }
        }
        ]
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

router.put('/upvote', (req, res) => {
    // make sure the session exists first
    if (req.session) {
        // pass session id along with all destructured properties on req.body
        Post.upvote({ ...req.body, user_id: req.session.user_id }, { Vote, Comment, User })
            .then(updatedVoteData => res.json(updatedVoteData))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    }
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

router.delete("/:id", (req, res) => {
    Post.destroy(
        {
            where: {
                id: req.params.id
            }
        }
    )
        .then(data => {
            if (!data) {
                res.status(400).json({ message: "No post found with this id" })
            }
            res.json(data)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

module.exports = router;