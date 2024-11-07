
// routes/insert.js
const express = require("express");
const router = express.Router();




router.post("/insertMany", async (req, res) => {
  const documents = req.body; 

  if (!Array.isArray(documents)) {
    return res.status(400).json({ error: "Request body must be an array of documents" });
  }

  
    const db = req.app.locals.db;
    const collection = db.collection("employees"); 

    const result = await collection.insertMany(documents);
    res.status(200).json({
      message: "Documents inserted successfully",
      insertedCount: result.insertedCount,
      insertedIds: result.insertedIds,
    });
  
});

router.get("/find", async (req, res) => {
      const db = req.app.locals.db;
      const collection = db.collection("employees"); 
      const result = await collection.find({}).toArray(); 
      res.status(200).json({ result });
   
  });

router.post('/addSkill',async(req,res)=>{
    const { name, skills } = req.body;

    if (!name || !Array.isArray(skills) || skills.length === 0) {
      return res.status(400).json({ message: 'Name and skills array are required.' });

    }
    const db = req.app.locals.db;
    const collection = db.collection("employees");
      const result = await collection.updateOne(
        { name: name },
        {
          $addToSet: {  
            skills: { $each: skills }
          }
        }
      );
      res.status(200).json({ message: 'Skills added successfully!' });
})


router.post('/deleteSkill',async(req,res)=>{
  const { name, skills } = req.body;

  if (!name || !Array.isArray(skills) || skills.length === 0) {
    return res.status(400).json({ message: 'Name and skills array are required.' });

  }
  try{
  const db = req.app.locals.db;
  const collection = db.collection("employees");
    const result = await collection.updateOne(
      { name: name },
      {
        $pull: {  
          skills: { $in: skills }
        }
      }
    );
    res.status(200).json({ message: 'Skills deleted successfully successfully!' });
  } catch (error) {
    console.error('Error in aggregation:', error);
    res.status(500).json({ error: 'An error occurred while processing your request' });
  }
})



router.get("/employeesWithDepartment", async (req, res) => {
    const db = req.app.locals.db;
    const employeesCollection = db.collection("employees");
    const departmentsCollection = db.collection("departments");
  
    const result = await employeesCollection.aggregate([
      {
        $lookup: {
          from: "departments",             
          localField: "department_id",     
          foreignField: "department_id",   
          as: "department_info"            
        }
      },
      {
        $project: {
          name: 1,                         
          position: 1,                     
          department_info: {               
            department_name: 1,
            location: 1
          }
        }
      }
    ]).toArray();  
  
    res.status(200).json({ result });
  });

  router.get('/splitName', async (req, res) => {
    const db = req.app.locals.db;
    const employees = db.collection("employees");
  
    try {
      const result = await employees.updateMany(
        { name: { $exists: true } },
        [{ $set: {
            firstName: { $arrayElemAt: [{ $split: ["$name", " "] }, 0] }, 
            lastName: { $arrayElemAt: [{ $split: ["$name", " "] }, 1] }   
          }
        },
        ]
      )
  
      res.status(200).json({ message: 'Success' });
    } catch (error) {
      console.error('Error in aggregation:', error);
      res.status(500).json({ error: 'An error occurred while processing your request' });
    }
  });

  

  router.get('/groupByPosition', async (req, res) => {
    try {
      const db = req.app.locals.db;  
      const employees = db.collection('employees');  
      
     
      const result = await employees.aggregate([
        {
          $group: {
            _id: {
              position: "$position",  
              status: "$status"       
            },
            count: { $sum: 1 },        
            averageSalary: { $avg: "$salary" }  
          }
        },
        {
          $sort: { "_id.position": 1 }  
        }
      ]).toArray();  
  
      
      
      res.status(200).json(result);
    } catch (error) {
      console.error('Error in aggregation:', error);
      res.status(500).json({ error: 'An error occurred while processing your request' });
    }
  });
  
  

/*
router.get('/groupByPosition', async (req, res) => {
  try {
    const db = req.app.locals.db;  
    const employees = db.collection('employees');  
    
   
    const result = await employees.aggregate([
      { 
        $match: { status: "active" }  
      },
      {
        $facet: {
          "groupByPosition": [
            { $group: { _id: "$position", count: { $sum: 1 } } }  
          ],
          "avgSalary": [
            { $group: { _id: null, avgSalary: { $avg: "$salary" } } }  
          ],
          "countByDepartment": [
            { $group: { _id: "$department", count: { $sum: 1 } } }  
          ]
        }
      }
    ]).toArray();  
    
    res.status(200).json(result);
  } catch (error) {
    console.error('Error in aggregation:', error);
    res.status(500).json({ error: 'An error occurred while processing your request' });
  }
});
*/
module.exports = router;

