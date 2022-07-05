const { Thought, User, reactionSchema } = require("../models");
module.exports = {
  //   getThoughts,
  //   getOneThought,
  //   addThought,
  //   removeThought,
  getThoughts(req, res) {
    Thought.find()
      .then((found) => {
        res.json(found);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  getOneThought(req, res) {
    Thought.findOne({ _id: req.params.ThoughtId })
      .populate("friends")
      .populate("thoughts")
      .then((found) => {
        if (!found) {
          return res
            .status(404)
            .json({ message: "No Thought exits with this ID" });
        }
        res.json(found);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  addThought(req, res) {
    Thought.create(req.body)
      .then((newThought) => {
        res.json(newThought);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  editThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.ThoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((editedThought) => {
        if (!editedThought) {
          return res
            .status(404)
            .json({ message: "No Thought exits with this ID" });
        }
        res.json(editedThought);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.ThoughtId })
      .then((deletedThought) => {
        if (!deletedThought) {
          return res
            .status(404)
            .json({ message: "No Thought exits with this ID" });
        }
        return Thought.deleteMany({ id: { $in: deletedThought.thoughts } });
      })
      .then(() => {
        res.json({ successMsg: `${deletedThought.Thoughtname} deleted` });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  // addReaction(req, res) {
  //   Thought.findOneAndUpdate(
  //     { _id: req.params.thoughtId },
  //     { $addToSet: { reactionBody: req.body } },
  //     { runValidators: true, new: true }
  //   )
  //     .then((newReaction) => {
  //       res.json(newReaction);
  //     })
  //     .catch((err) => {
  //       res.status(500).json(err);
  //     });
  // },
  // deleteReaction(req, res) {
  //   Thought.findOneAndDelete({ _id: req.params.ReactionId })
  //     .then((deletedReaction) => {
  //       if (!deletedReaction) {
  //         return res
  //           .status(404)
  //           .json({ message: "No Reaction exits with this ID" });
  //       }
  //     })
  //     .then(() => {
  //       res.json({ successMsg: `${deletedReaction.Reactionname} deleted` });
  //     })
  //     .catch((err) => {
  //       res.status(500).json(err);
  //     });
  // },
};
