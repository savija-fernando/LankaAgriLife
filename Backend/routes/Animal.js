const router=require("express").Router();
const { error } = require("console");
let Animal=require("../models/animal");
const { Router } = require("express");

    router.route("/add").post((req,res)=>{ //when inserting we use post
    //getting the the values using request
    const animal_id=req.body.animal_id;
    const species=req.body.species;
    const breedingDetails=req.body.breedingDetails;
    const feedingData=req.body.feedingData;
    const healthRecord=req.body.healthRecord;
    const dateOfBirth=new Date(req.body.dateOfBirth);

    //sending data to database or create objects from schema
    const newAnimal= new Animal({
        animal_id,
        species,
        breedingDetails,
        feedingData,
        healthRecord,
        dateOfBirth
    }); 

    //saving to Database
    newAnimal.save().then(()=>{
        res.json("Animal added!");
    })
    .catch((error)=>{
        console.log(error);
        res.status(500).json("Error:"+error);
    });

    //get all data
    router.route("/get").get((req,res)=>{
        Animal.find().then((animals)=>{
            res.json(animals)
        }).catch((error)=>{
            console.log(error)
        })
    });
//http//localhost:8070/Animal/update/
    router.route("/update/:id").put(async (req, res) => {
    // Extract animal_id from the URL
    let animalId = req.params.id;

    // Destructure request 
    const { animal_id, species, dateAdded, breedingDetails, feedingData, healthRecord,dateOfBirth, } = req.body;

    // Build update object
    const updateAnimal = {
        animal_id,
        species,
        dateAdded,
        dateAdded,
        breedingDetails,
        feedingData,
        healthRecord,
        dateOfBirth,

    };

    try {
        // Use custom field in the query
        const update = await Animal.findOneAndUpdate(
            { animal_id: animalId }, 
            updateAnimal,
            { new: true }  //return the updated doc
        );
            if (!update) {
            return res.status(404).json({ message: "Animal not found" });
            }
            else
                res.status(200).json({ message: "Animal updated successfully", data: update });

        } catch (error) {
             res.status(500).json({ message: "Error updating Animal", error: error.message });
        }

    }); 
    //delete
    router.route("/delete/:id").delete(async(req,res)=>{
        let animalId = req.params.id;

        try {
            const deletedItem = await Animal.findOneAndDelete({ animal_id: animalId });

            if (!deletedItem) {
                return res.status(404).json({ message: "Animal not found" });
            }

            res.status(200).json({ message: "Animal deleted successfully", data: deletedItem });
            } catch (error) {
            res.status(500).json({ message: "Error deleting Animal", error: error.message });
            }
    })

});
module.exports=router;