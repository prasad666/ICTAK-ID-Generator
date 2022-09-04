var BatchModel = require("../models/batchModel.js");
const CourseModel = require("../models/courseModel.js");
var UserModel = require("../models/userModel");
/**
 * batchController.js
 *
 * @description :: Server-side logic for managing batchs.
 */
module.exports = {
  /**
   * batchController.list()
   */

  list: async function (req, res) {
    const {
      page = 1,
      size = 10,
      sort = "_id",
      dir = "asc",
      filter = "",
    } = req.query;
    let queryObj = {};
    if (filter) {
      queryObj = { batch_name: new RegExp("^" + filter) };
    }
    console.log(queryObj);
    const batches = await BatchModel.paginate(queryObj, {
      page,
      limit: size,
      sort: { [sort]: dir },
      populate: [
        {
          path: "course",
          select: "course_name",
        },
        {
          path: "user",
          select: "first_name",
        },
      ],
    });
    console.log(batches);
    return res.json(batches);
  },

  list1: function (req, res) {
    // BatchModel.find(function (err, batches) {
    //   if (err) {
    //     return res.status(500).json({
    //       message: "Error when getting batch.",
    //       error: err,
    //     });
    //   }

    //   return res.json(batches);
    // });
    BatchModel.find()
      .populate("course")
      .populate("user")
      .exec(function (err, batches) {
        if (err) {
          console.log(err);
          return res.status(500).json({
            message: "Error when getting batch.",
            error: err,
          });
        }

        if (!batches) {
          return res.status(404).json({
            message: "No such batch",
          });
        }

        return res.json(batches);
      });
  },

  /**
   * batchController.show()
   */
  show: function (req, res) {
    var id = req.params.id;

    BatchModel.findOne({ _id: id })
      .populate("course")
      .populate("user")
      .exec(function (err, batch) {
        if (err) {
          console.log(err);
          return res.status(500).json({
            message: "Error when getting batch.",
            error: err,
          });
        }

        if (!batch) {
          return res.status(404).json({
            message: "No such batch",
          });
        }

        return res.json(batch);
      });
  },

  /**
   * batchController.create()
   */
  create: function (req, res) {
    var batch = new BatchModel({
      batch_name: req.body.batch_name,
      course: req.body.course,
      user: req.body.user,
      enabled: req.body.enabled,
      start_date: req.body.start_date,
      end_date: req.body.end_date,
      timestamps: req.body.timestamps,
    });

    batch.save(function (err, batch) {
      if (err) {
        return res.status(500).json({
          message: "Error when creating batch",
          error: err,
        });
      }

      return res.status(201).json(batch);
    });
  },

  /**
   * batchController.update()
   */
  update: function (req, res) {
    var id = req.params.id;

    BatchModel.findOne({ _id: id }, function (err, batch) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting batch",
          error: err,
        });
      }

      if (!batch) {
        return res.status(404).json({
          message: "No such batch",
        });
      }

      batch.batch_name = req.body.batch_name
        ? req.body.batch_name
        : batch.batch_name;
      batch.course_id = req.body.course_id
        ? req.body.course_id
        : batch.course_id;
      batch.batchmanager_id = req.body.batchmanager_id
        ? req.body.batchmanager_id
        : batch.batchmanager_id;
      batch.enabled = req.body.enabled ? req.body.enabled : batch.enabled;
      batch.start_date = req.body.start_date
        ? req.body.start_date
        : batch.start_date;
      batch.end_date = req.body.end_date ? req.body.end_date : batch.end_date;
      batch.timestamps = req.body.timestamps
        ? req.body.timestamps
        : batch.timestamps;

      batch.save(function (err, batch) {
        if (err) {
          return res.status(500).json({
            message: "Error when updating batch.",
            error: err,
          });
        }

        return res.json(batch);
      });
    });
  },

  /**
   * batchController.remove()
   */
  remove: function (req, res) {
    var id = req.params.id;

    BatchModel.findByIdAndRemove(id, function (err, batch) {
      if (err) {
        return res.status(500).json({
          message: "Error when deleting the batch.",
          error: err,
        });
      }

      return res.status(204).json();
    });
  },
};
