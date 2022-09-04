var CourseModel = require("../models/courseModel.js");

/**
 * courseController.js
 *
 * @description :: Server-side logic for managing courses.
 */
module.exports = {
  /**
   * courseController.list()
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
      queryObj = { course_name: new RegExp("^" + filter) };
    }
    console.log(queryObj);
    const courses = await CourseModel.paginate(queryObj, {
      page,
      limit: size,
      sort: { [sort]: dir },
    });
    console.log(courses);
    return res.json(courses);
  },

  /**
   * userController.list()
   */
  listAll: function (req, res) {
    CourseModel.find(function (err, courses) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting user.",
          error: err,
        });
      }

      return res.json(courses);
    });
  },

  /**
   * courseController.show()
   */
  show: function (req, res) {
    var id = req.params.id;

    CourseModel.findOne({ _id: id }, function (err, course) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting course.",
          error: err,
        });
      }

      if (!course) {
        return res.status(404).json({
          message: "No such course",
        });
      }

      return res.json(course);
    });
  },

  /**
   * courseController.create()
   */
  create: function (req, res) {
    var course = new CourseModel({
      course_name: req.body.course_name,
      enabled: req.body.enabled,
      //   created_at: req.body.created_at,
      //   updated_at: req.body.updated_at,
    });

    course.save(function (err, course) {
      if (err) {
        return res.status(500).json({
          message: "Error when creating course",
          error: err,
        });
      }

      return res.status(201).json(course);
    });
  },

  /**
   * courseController.update()
   */
  update: function (req, res) {
    var id = req.params.id;

    CourseModel.findOne({ _id: id }, function (err, course) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting course",
          error: err,
        });
      }

      if (!course) {
        return res.status(404).json({
          message: "No such course",
        });
      }

      course.course_name = req.body.course_name
        ? req.body.course_name
        : course.course_name;
      course.enabled = req.body.enabled ? req.body.enabled : course.enabled;
      course.created_at = req.body.created_at
        ? req.body.created_at
        : course.created_at;
      course.updated_at = req.body.updated_at
        ? req.body.updated_at
        : course.updated_at;

      course.save(function (err, course) {
        if (err) {
          return res.status(500).json({
            message: "Error when updating course.",
            error: err,
          });
        }

        return res.json(course);
      });
    });
  },

  /**
   * courseController.remove()
   */
  remove: function (req, res) {
    var id = req.params.id;
    console.log(id);
    CourseModel.findByIdAndRemove(id, function (err, course) {
      if (err) {
        return res.status(500).json({
          message: "Error when deleting the course.",
          error: err,
        });
      }

      return res.status(204).json();
    });
  },
};
