var ApplicationModel = require("../models/applicationModel.js");

/**
 * applicationController.js
 *
 * @description :: Server-side logic for managing applications.
 */
module.exports = {
  /**
   * applicationController.list()
   */
  list: function (req, res) {
    ApplicationModel.find(function (err, applications) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting application.",
          error: err,
        });
      }

      return res.json(applications);
    });
  },

 
  /**
   * applicationController.show()
   */
  show: function (req, res) {
    var id = req.params.id;

    ApplicationModel.findOne({ _id: id }, function (err, application) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting application.",
          error: err,
        });
      }

      if (!application) {
        return res.status(404).json({
          message: "No such application",
        });
      }

      return res.json(application);
    });
  },

  /**
   * applicationController.create()
   */
  create: function (req, res) {
    var application = new ApplicationModel({
      student_id: req.body.student_id,
      batch_id: req.body.batch_id,
      status: req.body.status,
      reviewed_by: req.body.reviewed_by,
      remarks: req.body.remarks,
      timestamps: req.body.timestamps,
    });

    application.save(function (err, application) {
      if (err) {
        return res.status(500).json({
          message: "Error when creating application",
          error: err,
        });
      }

      return res.status(201).json(application);
    });
  },

  /**
   * applicationController.update()
   */
  update: function (req, res) {
    var id = req.params.id;

    ApplicationModel.findOne({ _id: id }, function (err, application) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting application",
          error: err,
        });
      }

      if (!application) {
        return res.status(404).json({
          message: "No such application",
        });
      }

      application.student_id = req.body.student_id
        ? req.body.student_id
        : application.student_id;
      application.batch_id = req.body.batch_id
        ? req.body.batch_id
        : application.batch_id;
      application.status = req.body.status
        ? req.body.status
        : application.status;
      application.reviewed_by = req.body.reviewed_by
        ? req.body.reviewed_by
        : application.reviewed_by;
      application.remarks = req.body.remarks
        ? req.body.remarks
        : application.remarks;
      application.timestamps = req.body.timestamps
        ? req.body.timestamps
        : application.timestamps;

      application.save(function (err, application) {
        if (err) {
          return res.status(500).json({
            message: "Error when updating application.",
            error: err,
          });
        }

        return res.json(application);
      });
    });
  },

  /**
   * applicationController.remove()
   */
  remove: function (req, res) {
    var id = req.params.id;

    ApplicationModel.findByIdAndRemove(id, function (err, application) {
      if (err) {
        return res.status(500).json({
          message: "Error when deleting the application.",
          error: err,
        });
      }

      return res.status(204).json();
    });
  },

  /**
   * applicationController.pendingApplications()
   */
    pendingApplications: function (req, res) {     /////TODO uncomment batch_id once bathchmanager model is complete
    ApplicationModel.find({ status: 'pending' /*, batch_id: req.params.batch */}, function (err, applications) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting application.",
          error: err,
        });
      }

      return res.json(applications);
    });
  }, 

   /**
   * applicationController.history()
   */
    history: function (req, res) {  
      const batches =req.query.batches.split(',');
      const batchFilter = batches.map((b)=>{return {batch_id:b}});

      const findObj= {
        $or : batchFilter,
        status: {$ne: 'pending'},
        updatedAt: {
          $gte:req.query.from,
          $lte: req.query.to    ///new ISODate(req.query.to)
        }
      }

      ApplicationModel.find(findObj, function (err, applications) {
        if (err) {
          return res.status(500).json({
            message: "Error when getting application.",
            error: err,
          });
        }
  
        return res.json(applications);
      });
    }, 

};


