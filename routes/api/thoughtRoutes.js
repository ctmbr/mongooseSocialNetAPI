const router = require("express").Router();
const {
  getThoughts,
  getOneThought,
  addThought,
  deleteThought,
  editThought,
  // addReaction,
  // deleteReaction,
} = require("../../controllers/thoughtController");

router.route("/").get(getThoughts).post(addThought);
router
  .route("/:ThoughtId")
  .get(getOneThought)
  .put(editThought)
  .delete(deleteThought);
// router.route("/:ThoughtId/reactions").post(addReaction).delete(deleteReaction);

module.exports = router;
