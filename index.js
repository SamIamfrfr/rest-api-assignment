const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

let users = [];
let userIdCounter = 1;

app.post("/users", (req, res) => {
    const { name, email } = req.body;
    if (!(name && email)) return res.status(400).json({ error: "We need both your name and email."});

    const newUser = { id: userIdCounter, name, email };
    
    userIdCounter++;
    users.push(newUser);
    res.status(201).json(newUser);
});


app.get("/users/:id", (req, res) => {
    const userId = Number(req.params.id);
    const user = users.find(u => u.id === userId);


    if (user==null) return res.status(404).json({ error: "This user does not exist" });

    res.json(user);
});


app.put("/users/:id", (req, res) => {
    const userId = Number(req.params.id);
    const user = users.find(u => u.id === userId);

    if (user==null) return res.status(404).json({ error: "This user does not exist" });
    
    const { name, email } = req.body;
    if (name) 
        user.name = name;
    if (email) 
        user.email = email;

    res.json(user);
});


app.delete("/users/:id", (req, res) => {
    const userId = Number(req.params.id);
    const index = users.findIndex(u => u.id === userId);

    if (index < 0) {
        res.status(404).json({ error: "User not found" });
        return;
    }

    users = users.filter((user, i) => i !== index);

    res.sendStatus(204);
});


app.get("/", (req, res) => {
    res.send("Hello World!");
});


if (process.env.NODE_ENV !== "test") {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}

module.exports = app; 
