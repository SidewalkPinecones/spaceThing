//put backend code here (: 

const express = require('express');
const fs = require('fs');
const app = express();
const path = require("path");

app.get("/", (req,res)=>{
    res.redirect("/pages/home.html");
}) ;

//  Pages
app.get("/pages/:name", (req, res, next) => {
  const options = {
    root: path.join(__dirname,"pages"),
    dotfiles: "deny",
    headers: {
      "x-timestamp": Date.now(),
      "x-sent": true,
    },
  };

  const fileName = req.params.name;
  res.sendFile(fileName, options, (err) => {
    if (err) {
      next(err);
    } else {
      console.log("Sent page:", fileName);
    }
  });
});

//  Media

app.get("/media/:name", (req, res, next) => {
    const options = {
      root: path.join(__dirname,"media"),
      dotfiles: "deny",
      headers: {
        "x-timestamp": Date.now(),
        "x-sent": true,
      },
    };
  
    const fileName = req.params.name;
    res.sendFile(fileName, options, (err) => {
      if (err) {
        next(err);
      } else {
        console.log("Sent file:", fileName);
      }
    });
  });

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

console.log(path.join(__dirname))