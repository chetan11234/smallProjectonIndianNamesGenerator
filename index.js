import express from "express";
import axios from "axios";
import ejs from "ejs"

const app = express();
const port = 3000;

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs", { fName: "Submit Data" });
});

app.post("/name", async (req, res) => {
    try {
        const response = await axios({
            method: 'get',
            baseURL: "https://random-indian-name-generator.vercel.app",
            url: "/api/random_name"
        });
        res.render("index.ejs", { fName: response.data.firstName });
    } catch (error) {
        console.log("Error in fetching the name : " + error.message);
        res.render("index.ejs", { fName: error.message });
    }
});

app.listen(port, (error) => {
    if (error) console.log(error);
    else console.log("App is listening on port " + port);
})