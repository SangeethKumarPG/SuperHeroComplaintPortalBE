const mongoose = require("mongoose");
const complaint = require("../models/complaintSchema");
const mailer = require("../utils/mailer");

exports.createComplaint = async (req, res) => {
  try {
    const { requesterName, complaintType, dangerLevel, location, description } =
      req.body;
    const newComplaint = new complaint({
      requesterName,
      complaintType,
      dangerLevel,
      location:{
        lat:location.lat,
        lng:location.lng
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
