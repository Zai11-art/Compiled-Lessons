const express = require('express');
const app = express();
const path = require('path')
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
const methodOverride = require('method-override')

const Product = require('./models/product');

main().catch(err => console.log(err));
async function main() {
    try {
        console.log('Mongo connection open')
        await mongoose.connect('mongodb://127.0.0.1:27017/farmStand');
    } catch (e) {
        console.log('Mongo connection error caught:', e)
    }     
}

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middlewares
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))

const categories  = ['fruit', 'vegetables', 'dairy', 'fungi', 'drinks']

// display all comments: index
app.get('/products', async (req,res) => {
    const { category } = req.query;
    if (category) {
        const products = await Product.find({category})
        res.render('products/index', {products, category})
    } else {
        const products = await Product.find({});
        res.render('products/index', {products, category: 'All'})
    }
}) 

// form to create a new comment: New
app.get('/products/new', (req,res) => {
    res.render('products/new', {categories})
})

// creates new comment on server: Create
app.post('/products', async (req, res) => {
    const newProduct =  new Product(req.body);
    await newProduct.save();
    console.log(newProduct)
    res.redirect(`/products/${newProduct._id}`)
})

// details for one specific comment: Show
app.get('/products/:id', async (req,res) => {
    const {id} = req.params;
    const product = await Product.findById(id);
    res.render('products/show', {product});
})

// Form to edit specific comment:  Edit 
app.get('/products/:id/edit', async (req,res) => {
    const {id} = req.params
    const product = await Product.findById(id);
    res.render('products/edit', {product, categories})
})

app.put('/products/:id', async (req,res) => {
    const  {id} = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, {runValidators:true});
    console.log(req.body);
    res.redirect(`/products/${product._id}`);
})

app.delete('/products/:id', async (req, res) => {
    const {id} = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    res.redirect('/products');
})

app.listen(8080
    , () => {
    console.log('LISTENING TO THIS PORT')
})