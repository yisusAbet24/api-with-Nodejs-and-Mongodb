const express = require("express");
const mongoose = require("mongoose")
const app = express();
require("dotenv").config();
const RoutesUser = require("./routes/product");
const path = require("path");
const swagger_ui_express = require("swagger-ui-express");
const swagger_jsdoc = require("swagger-jsdoc");
const swaggerSpec = {
    definition: {
        openapi: "3.0.1",
        info: {
            title: "Proyecto Nodejs - MongoDB Api - Yisus",
            version: "1.0"
        },
        servers: [
            {
                url: "http://localhost:3000"
            }
        ]
    },
    apis: [`${path.join(__dirname, "./routes/product.js")}`]
};



const port = process.env.PORT || 3000;

app.listen(port, ()=>console.log("server on port", port));

//middleware
app.use(express.json())
app.use('/api-yisus', RoutesUser);
app.use('/', swagger_ui_express.serve, swagger_ui_express.setup(swagger_jsdoc(swaggerSpec)))



//mongo

mongoose.set("strictQuery", true);
mongoose
.connect(process.env.MONGODB_URL)
.then(()=>console.log("BD conectado"))
.catch((error)=>console.error(error));


