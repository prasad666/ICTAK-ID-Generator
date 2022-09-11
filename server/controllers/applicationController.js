var ApplicationModel = require("../models/applicationModel.js");
var fs = require('fs');
var path = require('path')
var html_to_pdf = require('html-pdf-node');

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

    ApplicationModel.findOne({ _id: id })
      .populate('student_id')
      .populate({
        path:'batch_id',
        populate:'course'
      })
      .exec(function (err, application) {
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
    pendingApplications: function (req, res) {  
      const batches =req.query.batches.split(',');
      const batchFilter = batches.map((b)=>{return {batch_id: b}});

      const findObj= {
        $or : batchFilter,
        status: 'pending',
        }


      ApplicationModel.find(findObj)
      .populate('student_id')
      .populate({
        path:'batch_id',
        select:'batch_name',
        populate:{
          path:'course',
          select:'course_name'
        }
       })
      .exec(function (err, applications) {
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

      ApplicationModel.find(findObj)
      .populate('student_id')
      .populate({
        path:'batch_id',
        select:'batch_name',
        populate:{
          path:'course',
          select:'course_name'
        }
       })
      .exec(function (err, applications) {
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
   * applicationController.getPdf()
   */
     applicationStatus: function (req, res) {
       
      ApplicationModel.find({ student_id: req.user.id })
      .populate('student_id')
      .populate({
        path:'batch_id',
        select:'batch_name',
        populate:{
          path:'course',
          select:'course_name'
        }
       })
      .exec(function (err, application) {
        if (err) {
          return res.status(500).json({
            message: "Error getting application status.",
            error: err,
          });
        }
  
        if (!application) {
          return res.status(404).json({
            message: "No such application",
          });
        }

        return res.status(200).json(application);  
      });
    },

   /**
   * applicationController.getPdf()
   */
    getPdf: function (req, res) {
       console.log(req.params.id);
       
      ApplicationModel.findOne({ _id: req.params.id })
      .populate('student_id')
      .populate({
        path:'batch_id',
        select:'batch_name',
        populate:{
          path:'course',
          select:'course_name'
        }
       })
      .exec(function (err, application) {
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

        if (application.status!=="approved") {
          return res.status(403).json({
            message: application.status,
            applicationStatus: application.status,
            applicationRemarks: application.remarks,

          });
          
        }

        let qrData = 
        `        Name: ${application.student_id.first_name} ${application.student_id.last_name}, 
        Course: ${application.batch_id.course.course_name}, 
        Batch: ${application.batch_id.batch_name},
        ID: ${application.student_id._id}`

        const qrcode = require('qrcode');
        qrcode.toDataURL(qrData).then(qr => {

          //pdf generate
          let html = 
          `<div style="margin:7%;border:1px solid blue;border-radius:4px;padding:3%;font-family:Verdana, Geneva, Tahoma, sans-serif">
            <div style="font-weight: bold;font-size:2rem;padding-bottom:.5rem">ICT Academy Kerala</div>
            <div style="display:flex;justify-content:space-between;align-items: center;">
              <div style="padding:0 0 0 5%  ">
                <div style="font-weight: bold;font-size:1.5rem;margin:1rem 0;">${application.student_id.first_name} ${application.student_id.last_name}</div>
                <div style="font-weight: bold;">Student</div>
                <div style="font-weight: bold;">Course: ${application.batch_id.course.course_name}</div>
                <div >Batch: ${application.batch_id.batch_name}</div>
                <div>ID:${application.student_id._id}</div>
              </div>
              <div><img src='${qr}'/></div> 
            </div>   
          </div>`
         
          let options = { format: 'A4', path:'./pdf/id.pdf' };
          
          let file = { content: html };
          html_to_pdf.generatePdf(file, options).then(() => {
            if (application.status==="approved") {
               res.sendFile(path.resolve(__dirname +'/../pdf/id.pdf'));
            }
          });

          
        })
        .catch(err => {
          return res.status(500).json({
            message: "Error when generating qr code.",
            error: err
          })
        })


      });
    },
  

};


