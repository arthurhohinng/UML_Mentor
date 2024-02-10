const Solution = require('../controllers/Solution.controller');
const router = require("express").Router();

// Getsolution from the database.
router.get("/:id", Soltion.get);

// Get all comments for a solutions.
// Sorting (by date or upvote) happens on the client side.
router.get("/:id", Challenge.getComments);

// Create a new solution in the database.
route.post("/:id", Solution.create);

// Edit a solution in the database.
router.put("/:id/edit", Solution.edit);

// Upvote a solution in the databse.
// However Vlad said we shouldn't worry about upvoting a solution for now. Just
// worry about upvoting comments.
// router.put("/:id", Solution.upvote);

// Delete a solution from the database.
router.delete("/:id", Solution.delete);

module.exports = router;