var Contact_messageModel = require("../models/contact_messageModel.js");

/**
 * contact_messageController.js
 *
 * @description :: Server-side logic for managing contact_messages.
 */
module.exports = {
  /**
   * contact_messageController.list()
   */
  list: function (req, res) {
    Contact_messageModel.find(function (err, contact_messages) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting contact_message.",
          error: err,
        });
      }

      return res.json(contact_messages);
    });
  },

  /**
   * contact_messageController.show()
   */
  show: function (req, res) {
    var id = req.params.id;

    Contact_messageModel.findOne({ _id: id }, function (err, contact_message) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting contact_message.",
          error: err,
        });
      }

      if (!contact_message) {
        return res.status(404).json({
          message: "No such contact_message",
        });
      }

      return res.json(contact_message);
    });
  },

  /**
   * contact_messageController.create()
   */
  create: function (req, res) {
    var contact_message = new Contact_messageModel({
      name: req.body.name,
      email: req.body.email,
      message: req.body.message,
      createdAt: req.body.createdAt,
    });

    contact_message.save(function (err, contact_message) {
      if (err) {
        return res.status(500).json({
          message: "Error when creating contact_message",
          error: err,
        });
      }

      return res.status(201).json(contact_message);
    });
  },

  /**
   * contact_messageController.update()
   */
  update: function (req, res) {
    var id = req.params.id;

    Contact_messageModel.findOne({ _id: id }, function (err, contact_message) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting contact_message",
          error: err,
        });
      }

      if (!contact_message) {
        return res.status(404).json({
          message: "No such contact_message",
        });
      }

      contact_message.name = req.body.name
        ? req.body.name
        : contact_message.name;
      contact_message.email = req.body.email
        ? req.body.email
        : contact_message.email;
      contact_message.message = req.body.message
        ? req.body.message
        : contact_message.message;
      contact_message.createdAt = req.body.createdAt
        ? req.body.createdAt
        : contact_message.createdAt;

      contact_message.save(function (err, contact_message) {
        if (err) {
          return res.status(500).json({
            message: "Error when updating contact_message.",
            error: err,
          });
        }

        return res.json(contact_message);
      });
    });
  },

  /**
   * contact_messageController.remove()
   */
  remove: function (req, res) {
    var id = req.params.id;

    Contact_messageModel.findByIdAndRemove(id, function (err, contact_message) {
      if (err) {
        return res.status(500).json({
          message: "Error when deleting the contact_message.",
          error: err,
        });
      }

      return res.status(204).json();
    });
  },
};
