const router = require("express").Router();
const {error} = require("console");
const LivestockHandler = require("../models/livestockHandler");
const {Router} = require("express");


router.route("/add").post((req, res) => {
  const handler_id = req.body.handler_id;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const password = req.body.password;
  const email = req.body.email;
  const contact_No = req.body.contact_No;
  

  const newLivestockHandler = new LivestockHandler({
    handler_id,
    firstName,
    lastName,
    password,
    email,
    contact_No
  });

  newLivestockHandler.save().then(() => {
    res.json("New LivestockHandler added successfully!");
  })
    .catch((error) => {
      console.log(error);
      res.status(500).json("Error: " + error);
    });
});

//http://localhost:8070/LivestockHandler
//get all data

router.route("/").get((req, res) => {
  LivestockHandler.find().then((livestockHandler) => {
    res.json(livestockHandler)
  }).catch((error) => {
    console.log(error)
  })
});

//http://localhost:8070/LivestockHandler/update/
router.route("/update/:id").put(async (req, res) => {
  //extract LivestockHandler id from url
  let livestockHandlerID = req.params.id;

  //destructure request
  const { handler_id,firstName, lastName,password, email, contact_No  } = req.body;

  //build update object
  const updateLivestockHandler = {
    handler_id,
    firstName,
    lastName,
    password,
    email,
    contact_No
    

  }
  try {
    const updated = await LivestockHandler.findOneAndUpdate(
      { handler_id: livestockHandlerID },
      updateLivestockHandler,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "LivestockHandler not found" });
    }
    else
    res.status(200).json({ message: "LivestockHandler updated successfully", data: updated });

  } catch (error) {
    
    res.status(500).json({ message: "Error updating LivestockHandler", error: error.message });
  }
});


router.route("/delete/:id").delete(async (req, res) => {
  const livestockHandlerID = req.params.id;

  try {
    const deletedItem = await LivestockHandler.findOneAndDelete({ handler_id: livestockHandlerID });

    if (!deletedItem) {
      return res.status(404).json({ message: "LivestockHandler not found" });
    }

    res.status(200).json({ message: "LivestockHandler deleted successfully", data: deletedItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting LivestockHandler", error: error.message });
  }
});

module.exports = {LivestockHandler};