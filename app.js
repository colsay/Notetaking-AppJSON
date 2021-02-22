const express = require("express");
const app = express();
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const fs = require('fs')
const basicAuth = require("express-basic-auth");


// const myAuthorizer = require("./utils/MyAuthorizer");
// const ViewRouter = require("./Routers/ViewRouter");
// const OrderService = require("./Services/orderService");
// const OrderRouter = require("./Routers/orderRouter");
// const orderService = new OrderService("./stores/orders.json");
// const orderRouter = new OrderRouter(orderService);

app.engine("handlebars", handlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
    basicAuth({
        authorizer: myAuthorizer,
        challenge: true,
        authorizeAsync: true,
        realm: "My Application",
    })
);

function myAuthorizer(username, password, callback) {
    const USERS = fs.readFileSync('./users.json', 'utf-8', async (err, data) => {
        if (err) {
            throw err
        }
        return await data
    });
    let parsed = JSON.parse(USERS);
    let user = parsed.users.filter((user) => user.username == username);
    if (user[0].username === username && user[0].password === password) {
        return callback(null, true);
    } else {
        return callback(null, false);
    }
}

// // For all pages being sent from the server
// app.use("/", new ViewRouter().router());
// app.use("/api/orders", orderRouter.router());

const hello = {
    hellos: [{ note1: 123 }]
}

app.get("/", (req, res) => {
    // console.log(hello.pizza.note1)
    res.render('index', hello)
});


app.listen(8000, () => {
    console.log("Application listening to port 8000");
});
