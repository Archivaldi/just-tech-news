const router = require('express').Router();
const {Comment} = require('../../models');

router.get('/', (req, res) => {
    Comment.findAll()
        .then(data => res.json(data))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

router.post('/', (req, res) => {
    const {comment_text, user_id, post_id} = req.body;
    Comment.create({ comment_text, user_id, post_id })
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
});

router.delete('/:id', (req, res) => {
    Comment.destroy({ 
        where: {
            id: req.params.id
        }
    })
        .then(data => {
            if (!data){
                res.status(400).json({message: "Comment not found with this id"})
            }
            res.json(data)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

module.exports = router;