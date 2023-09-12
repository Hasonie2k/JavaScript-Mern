const express = require ("express");
const app = express();''
const port =8000;

app.listen(port, ()=>console.log("server is running homies "+ port));

const users = [
    {firstName: "hasan", lastName : "adnan"},
    {firstName: "ali", lastName : "adnan"},
    {firstName: "ammar", lastName : "adnan"},
    {firstName: "seenaa", lastName : "adnan"},
    {firstName: "reem", lastName : "adnan"},
];

app.get("/api/users", (req , res ) => {
    res.json( users );
})
