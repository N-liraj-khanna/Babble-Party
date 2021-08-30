// Imports
const express= require('express');

// Constants
const app = express();
const PORT = process.env.PORT || 3000;


// Routes
app.get("/",(req, res) => {
  return res.send("Yo!");
})

// General Config
app.listen(PORT,()=>{console.log(`Server running on http://localhost:${PORT}`);});