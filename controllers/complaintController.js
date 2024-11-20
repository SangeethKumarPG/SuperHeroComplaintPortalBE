const mongoose = require("mongoose");
const complaint = require("../models/complaintSchema");
const mailer = require("../utils/mailer");
const complaints = require("../models/complaintSchema");

exports.createComplaint = async (req, res) => {
  try {
    const { requesterName, complaintType, dangerLevel, location, description } =
      req.body;
    const newComplaint = new complaint({
      requesterName,
      complaintType,
      dangerLevel,
      location: {
        lat: location.lat,
        lng: location.lng,
      },
      description,
    });
    const savedComplaint = await newComplaint.save();
    mailer.sendMail(
      process.env.ADMIN_EMAIL,
      `New ${savedComplaint.dangerLevel} complaint received`,
      `Dear Hero \n A new complaint has been received from ${savedComplaint.requesterName}. The complaint type is ${savedComplaint.complaintType}, the danger level is ${savedComplaint.dangerLevel} and the description is ${savedComplaint.description}. Click here to view more details:<placeholder for website link> \n Thank you for your support. `
    );
    return res.status(201).json("Complaint registered successfully");
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getComplaints = async (req, res) => {
  try {
    const complaints = await complaint.find();
    return res.status(200).json(complaints);
  } catch (err) {
    console.log(err);
    return res.status(500).json("Internal server error");
  }
};

exports.getUniqueComplaintCountByType = async (req, res) => {
  try {
    complaints.aggregate([
      {
        $group: {
          _id: "$complaintType",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
    ]).then((result) => {
      return res.status(200).json(result);
    }).catch((err) => {
      console.log(err);
      return res.status(500).json("Internal server error");
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error");
  }
};

exports.getUniqueDangerLevelCount = async(req,res)=>{
  try {
    complaints.aggregate([
      {
        $group: {
          _id: "$dangerLevel",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      }
    ]).then((result) => {
      return res.status(200).json(result);
    }).catch((err)=>{
      console.log(err);
      return res.status(400).json("Unable to fetch data");
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error");
  }
}

exports.getLatestComplaintLocations = async (req,res)=>{
  try {
    const latestLocations = await complaint.find({},{location:1, _id:0}).sort({createdData:-1}).limit(50);
    return res.status(200).json(latestLocations);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error");
  }
}

exports.updateComplaintStatus = async (req, res) => {
  try {
    const { complaintId, status } = req.body;
    const updatedComplaint = await complaint.findByIdAndUpdate(
      complaintId,
      { status },
      { new: true }
    );
    return res.status(200).json("status updated successfully");
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error");
  }
}

exports.getComplaintSummary = async (req, res) => {
  try {
    // Fetch and group complaints
    const complaintData = await complaints.aggregate([
      {
        $group: {
          _id: "$status",
          total: { $sum: 1 },
        },
      },
    ]);

    // Fetch immediate attention complaints
    const immediateAttentionCount = await complaints.countDocuments({
      dangerLevel: {
        $in: [
          "Danger To Life",
          "Danger To Property",
          "Danger To Safety",
          "Danger To Animals",
        ],
      },
    });

    // Map results to the required format
    const summary = [
      {
        title: "Immediate Attention Required",
        count: immediateAttentionCount,
      },
      {
        title: "Open Issues",
        count:
          complaintData.find((item) => item._id === "open")?.total || 0,
      },
      {
        title: "Pending Issues",
        count:
          complaintData.find((item) => item._id === "pending")?.total || 0,
      },
    ];

    res.status(200).json(summary);
  } catch (error) {
    console.error("Error fetching complaint summary:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}