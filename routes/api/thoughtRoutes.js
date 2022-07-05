const router = require("express").Router();
const {
  getThoughts,
  getOneThought,
  addThought,
  deleteThought,
  editThought,
  addReaction,
  deleteReaction,
} = require("../../controllers/thoughtController");

router.route("/").get(getThoughts).post(addThought);

router
  .route("/:thoughtId")
  .get(getOneThought)
  .put(editThought)
  .delete(deleteThought);

router.route("/:thoughtId/reactions").post(addReaction);
router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);

module.exports = router;
