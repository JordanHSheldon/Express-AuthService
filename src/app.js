const express = require('express'); 
  
const app = express(); 
const PORT = 3000; 

app.get('/Login', (req, res)=>{
    if(req === null || req.body === null)
    {
        res.status(400);
        res.send("bad request")
    }
    res.send("You are now logged in.")
});

app.listen(PORT, (error) =>{ 
    if(!error) 
        console.log("Server is Successfully Running, and App is listening on port "+ PORT) 
    else 
        console.log("Error occurred, server can't start", error); 
    } 
); 