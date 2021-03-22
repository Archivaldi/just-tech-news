const router = require("express").Router();
const userRoutes = require("./user-routes");
const postRoutes = require("./post-routes");

router.use('/posts', postRoutes);
router.use('/users', userRoutes);

module.exports = router;