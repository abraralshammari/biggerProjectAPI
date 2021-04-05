const express = require("express");







//{=====================================================================}

app.use(express.json());


app.listen(8000, () => {
    console.log("The application is running on localhost:8000");
  });
  