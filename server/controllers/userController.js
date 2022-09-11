const bcrypt = require("bcrypt");
const crypto = require("crypto");

var UserModel = require("../models/userModel.js");

/**
 * userController.js
 *
 * @description :: Server-side logic for managing users.
 */
module.exports = {
  /**
   * userController.list()
   */
  list: async function (req, res) {
    const {
      role = "",
      page = 1,
      size = 10,
      sort = "_id",
      dir = "asc",
      filter = "",
    } = req.query;
    let queryObj = {};
    if (filter) {
      queryObj = {
        $or: [
          { first_name: new RegExp("^" + filter) },
          { last_name: new RegExp("^" + filter) },
          { email: new RegExp("^" + filter) },
        ],
      };
    }
    if (role) {
      queryObj.role = role;
    }
    console.log(queryObj);
    const users = await UserModel.paginate(queryObj, {
      page,
      limit: size,
      sort: { [sort]: dir },
    });
    console.log(users);
    return res.json(users);
  },

  listAll: function (req, res) {
    var role = req.query.role || "";
    var queryObj = {};
    if (role) {
      queryObj = { role: role };
    }

    UserModel.find(queryObj, function (err, users) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting user.",
          error: err,
        });
      }

      return res.json(users);
    });
  },
  /**
   * userController.show()
   */
  show: function (req, res) {
    var id = req.params.id;

    UserModel.findOne({ _id: id }, function (err, user) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting user.",
          error: err,
        });
      }

      if (!user) {
        return res.status(404).json({
          message: "No such user",
        });
      }
      user.password = "";
      return res.json(user);
    });
  },

  /**
   * userController.create()
   */
  create: async function (req, res) {
    var password = await bcrypt.hash(req.body.password, 12);
    var user = new UserModel({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      password: password,
      email: req.body.email,
      role: req.body.role,
      enabled: req.body.enabled,
      deleted: req.body.deleted,
      timestamps: req.body.timestamps,
      deletedAt: req.body.deletedAt,
    });

    user.save(function (err, user) {
      if (err) {
        return res.status(500).json({
          message: "Error when creating user",
          error: err,
        });
      }

      return res.status(201).json(user);
    });
  },

  register: async function (req, res) {
    var password = await bcrypt.hash(req.body.password, 12);
    var user = new UserModel({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      password: password,
      email: req.body.email,
      photo: req.file.path,
      role: "student",
      enabled: false,
      deleted: false,
      deletedAt: null,
    });

    user.save(function (err, user) {
      if (err && err.message) {
        return res.status(500).json({
          message: err.message,
          error: err.code,
        });
      }
      return res.status(201).json(user);
    });
  },

  /**
   * userController.update()
   */
  update: async function (req, res) {
    var id = req.params.id;
    req.body.password = await bcrypt.hash(req.body.password, 12);
    UserModel.findOne({ _id: id }, function (err, user) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting user",
          error: err,
        });
      }

      if (!user) {
        return res.status(404).json({
          message: "No such user",
        });
      }

      user.first_name = req.body.first_name
        ? req.body.first_name
        : user.first_name;
      user.last_name = req.body.last_name ? req.body.last_name : user.last_name;
      user.password = req.body.password ? req.body.password : user.password;
      user.email = req.body.email ? req.body.email : user.email;
      user.role = req.body.role ? req.body.role : user.role;
      user.enabled = req.body.enabled ? req.body.enabled : user.enabled;
      user.deleted = req.body.deleted ? req.body.deleted : user.deleted;
      user.timestamps = req.body.timestamps
        ? req.body.timestamps
        : user.timestamps;
      user.deletedAt = req.body.deletedAt ? req.body.deletedAt : user.deletedAt;

      user.save(function (err, user) {
        if (err) {
          return res.status(500).json({
            message: "Error when updating user.",
            error: err,
          });
        }

        return res.json(user);
      });
    });
  },

  /**
   * userController.remove()
   */
  remove: function (req, res) {
    var id = req.params.id;

    UserModel.findByIdAndRemove(id, function (err, user) {
      if (err) {
        return res.status(500).json({
          message: "Error when deleting the user.",
          error: err,
        });
      }

      return res.status(204).json();
    });
  },
};
