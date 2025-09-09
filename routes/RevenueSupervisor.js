const router=require("express").Router();
const { error } = require("console");
let RevenueSupervisor=require("../models/revenue");
const { Router } = require("express");

router.route("/add").post((req,res)=>{ //when inserting we use post (request and respond)

    //getting the the values using request
    const rsupervisor_id=req.body.rsupervisor_id;
    const first_name=Number(req.body.first_name);
    const last_name=Number(req.body.last_name);
    const email=Number(req.body.email);
    const password=req.body.password;
    const contact=Number(req.body.contact);

    //sending data to database or create objects from schema
    const newRevenueSupervisor= new RevenueSupervisor({
        rsupervisor_id,
        first_name,
        last_name,
        email,
        password,
        contact
    });

    //saving to Database
    newRevenueSupervisor.save().then(()=>{
        res.json("Revenue supervisor added!");
    })
    .catch((error)=>{
        console.log(error);
        res.status(500).json("Error:"+error);
    });
});

//http://localhost:8070/Revenue
    //get all data
    router.route("/").get((req,res)=>{
        RevenueSupervisor.find().then((revenueSupervisors)=>{
            res.json(revenueSupervisors)
        }).catch((error)=>{
            console.log(error)
        })
    });

//http//localhsot:8070/Revenue/update/
    router.route("/update/:id").put(async (req, res) => {
    // Extract rsupervisor_id from the URL
    let rsupervisorID = req.params.id;

    // Destructure request 
    const {rsupervisor_id, first_name, last_name, email, password,contact} = req.body;

    // Build update object
    const updateRevenueSupervisor = {
        rsupervisor_id,
        first_name,
        last_name,
        email,
        password,
        contact
    };

    try {
        // Use custom field in the query
        const update = await RevenueSupervisor.findOneAndUpdate(
            { rsupervisor_id: rsupervisorID }, 
            updateRevenueSupervisor,
            { new: true }  //return the updated doc
        );
            if (!update) {
            return res.status(404).json({ message: "Revenue item not found" });
            }
            else
                res.status(200).json({ message: "Revenue updated successfully", data: update });

        } catch (error) {
             res.status(500).json({ message: "Error updating Revenue", error: error.message });
        }

    }); 
    
    //delete
    router.route("/delete/:id").delete(async(req,res)=>{
        let rsupervisorID = req.params.id;

        try {
            const deletedItem = await RevenueSupervisor.findOneAndDelete({ rsupervisor_id: rsupervisorID });

            if (!deletedItem) {
                return res.status(404).json({ message: "Revenue item not found" });
            }

            res.status(200).json({ message: "Revenue item deleted successfully", data: deletedItem });
            } catch (error) {
            res.status(500).json({ message: "Error deleting Revenue item", error: error.message });
            }
    })

    module.exports=router;  //its a must