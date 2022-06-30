const { Thought, User } = require("../models");
module.exports = {
  getUsers(req, res) {
    User.find()
      .then((found) => {
        res.json(found);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  getOneUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .populate("friends")
      .populate("thoughts")
      .then((found) => {
        if (!found) {
          return res
            .status(404)
            .json({ message: "No User exits with this ID" });
        }
        res.json(found);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  addUser(req, res) {
    User.create(req.body)
      .then((newUser) => {
        res.json(newUser);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((updatedUser) => {
        if (!updatedUser) {
          return res
            .status(404)
            .json({ message: "No User exits with this ID" });
        }
        res.json(updatedUser);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((deletedUser) => {
        if (!deletedUser) {
          return res
            .status(404)
            .json({ message: "No User exits with this ID" });
        }
        return Thought.deleteMany({ id: { $in: deletedUser.thoughts } });
      })
      .then(() => {
        res.json({ successMsg: `${deletedUser.username} deleted` });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    )
      .then((updatedUser) => {
        if (!updatedUser) {
          return res
            .status(404)
            .json({ message: "No User exits with this ID" });
        }
        res.json(updatedUser);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    )
      .then((updatedUser) => {
        if (!updatedUser) {
          return res
            .status(404)
            .json({ message: "No User exits with this ID" });
        }
        res.json(updatedUser);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
};
