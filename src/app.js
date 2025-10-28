const express = require('express');
const hbs = require('hbs');
const path = require('path');

const app = express();
const weatherData = require("../utils/weatherData");

const publicPath = path.join(__dirname,"../public");
const viewsPath = path.join(__dirname,"../templates/views");
const parialsPath = path.join(__dirname,"../templates/partials");

app.set("view engine","hbs");
app.set("views", viewsPath);
hbs.registerPartials(parialsPath);
app.use(express.static(publicPath));

const port = process.env.PORT || 3000;

app.get('/',(req,res) => {
    res.render("index", {title: "Weather App" });
});

app.get("/weather",(req,res) => {
    if(!req.query.address){
        return res.send("Address is required")
    }
    weatherData(req.query.address,(error,result) => {
        if(error){
            return res.send(error);
        }
        res.send(result);
    });

    
    
});

app.get("",(req , res) => {
    res.send("This route doesnt exists");
})

app.listen(port,() => {
    console.log("server running on port " + port);
});

