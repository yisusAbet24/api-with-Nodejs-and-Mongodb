//CRUD PARA PRODUCTOS :)
const express = require("express");
const productSchema = require("../models/productoYss");
const routes = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *      Product:
 *          type: object
 *          properties:
 *              name:
 *                  type: string
 *                  description: El nombre del producto
 *              price:
 *                  type: number
 *                  description: El precio del producto
 *              quantity:
 *                  type: number
 *                  description: La cantidad de productos
 *          required:
 *              -name
 *              -price
 *              -quantity
 *          example:
 *              name: Chetos
 *              price: 13.5
 *              quantity: 3
 */

/**
 * @swagger
 * /api-yisus/add-product:
 *  post:
 *      summary: Almacena un nuevo producto en la base de datos
 *      tags: [Product]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Product'
 *      responses:
 *          200:
 *              description: Nuevo Producto Almacenado
 *          
 * 
 */
//POST
routes.post('/add-product', (req,res)=>{
    const product = productSchema(req.body);
    product.save().then((data)=> res.json(data)).catch((error)=> res.json({message: error}));
})
/**
 * @swagger
 * /api-yisus/get-products:
 *  get:
 *      summary: Obtiene todos los productos almacenados en la base de datos
 *      tags: [Product]
 *      responses:
 *          200:
 *              description: Todos los productos
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Product'
 */

//GET

routes.get('/get-products', (req,res)=>{
    productSchema
    .find()
    .then((data)=> res.json(data))
    .catch((error)=> res.json({message: error}));
})


/**
 * @swagger
 * /api-yisus/get-product/{id}:
 *  get:
 *      summary: Obtiene un producto de la base de datos tomando como referencia la id 
 *      tags: [Product]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema: 
 *                 type: string
 *            required: true
 *            description: La id del producto
 *      responses:
 *          200:
 *             description: Producto encontrado
 *             content:
 *              application/json:
 *                 schema:
 *                    type: object
 *                    $ref: '#/components/schemas/Product'
 *          404: 
 *              description: El producto no fue encontrado
 */

//GET
routes.get('/get-product/:id', (req,res)=>{
    const { id } = req.params;

    productSchema
    .findById(id)
    .then((data)=> res.json(data))
    .catch((error)=> res.json({message: error}));
})

/**
 * @swagger
 * /api-yisus/update-product/{id}:
 *  put:
 *      summary: Actualiza un producto de la base de datos tomando como referencia la id
 *      tags: [Product]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema: 
 *                 type: string
 *            required: true
 *            description: La id del producto
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Product'
 *      responses:
 *          200:
 *             description: Producto actualizado 
 *          404: 
 *              description: El producto no fue encontrado
 */
//UPDATE
routes.put('/update-product/:id', (req,res)=>{
    const { id } = req.params;
    const { name, price, quantity } = req.body;

    productSchema
    .updateOne({ _id: id}, {$set: { name, price, quantity}})
    .then((data)=> res.json(data))
    .catch((error)=> res.json({message: error}));
})

/**
 * @swagger
 * /api-yisus/delete-product/{id}:
 *  delete:
 *      summary: Elimina un producto de la base de datos tomando como referencia la id 
 *      tags: [Product]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema: 
 *                 type: string
 *            required: true
 *            description: La id del producto
 *      responses:
 *          200:
 *             description: Producto eliminado
 *          404: 
 *              description: El producto no fue encontrado
 */
//DELETE
routes.delete('/delete-product/:id', (req,res)=>{
    const { id } = req.params;
    productSchema
    .deleteOne({ _id: id})
    .then((data)=> res.json(data))
    .catch((error)=> res.json({message: error}));
})

module.exports = routes;