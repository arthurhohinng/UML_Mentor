const Challenge = require('../controllers/Challenge.controller');
const router = require("express").Router();

// Get a challenge from the database.
router.get("/:id", Challenge.get);

// Get all solutions from a challenge.
// Sorting (by date or upvote) happens on the client side.
router.get("/:id", Challenge.getSolutions);

// Create a new challenge in the database.
route.post("/:id", Challenge.create);

// Edit a challenge in the database.
router.put("/:id", Challenge.edit);

// Delete a challenge from the database.
router.delete("/:id", Challenge.delete);

module.exports = router;