const express = require("express");
const path = require("path");
const { v4: uuidv4 } = require("uuid"); // unique ID generator
const app = express();
const port = 8080;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
const methodOverride = require("method-override");
app.use(methodOverride("_method"));

// Dummy Data
let progress = [
    {
        id: uuidv4(),
        date: "01/05/2025",
        work: "1. Node : EJS",
    },
    {
        id: uuidv4(),
        date: "02/05/2025",
        work: "1. REST ",
    },
];

// 🟢 Root route
app.get("/", (req, res) => {
    res.redirect("/progress"); // Redirect to /progress
});

// 🟢 Show all progress
app.get("/progress", (req, res) => {
    res.render("index", { progress });
});

// 🟢 Form dikhane ke liye
app.get("/progress/new", (req, res) => {
    res.render("new");
});

// 🟢 New progress add karne ke liye
app.post("/progress", (req, res) => {
    let { date, work } = req.body;
    progress.push({ id: uuidv4(), date, work });
    res.redirect("/progress");
});

// 🟢 Ek particular progress dikhane ke liye
app.get("/progress/:id", (req, res) => {
    let { id } = req.params;
    let prog = progress.find(p => p.id === id);
    res.render("show", { prog });
});

// 🟡 Edit form dikhane ke liye
app.get("/progress/:id/edit", (req, res) => {
    let { id } = req.params;
    let prog = progress.find(p => p.id === id);
    res.render("edit", { prog });
});

// 🟡 Update kare form submit hone ke baad
app.post("/progress/:id/update", (req, res) => {
    let { id } = req.params;
    let { date, work } = req.body;
    let prog = progress.find(p => p.id === id);
    prog.date = date;
    prog.work = work;
    res.redirect("/progress");
});

// 🔴 Delete kare progress
app.post("/progress/:id/delete", (req, res) => {
    let { id } = req.params;
    progress = progress.filter(p => p.id !== id);
    res.redirect("/progress");
});
app.delete("/progress/:id", (req, res) => {
    const { id } = req.params;
    progress = progress.filter(p => p.id !== id);
    res.redirect("/progress");
});

app.listen(port, () => {
    console.log("listening to port : 8080");
});
