const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
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

// const p = new Product({
//     name: 'Grapefruit',
//     price: 1.50,
//     category: 'fruit'
// })

// p.save()
//     .then(data => {
//         console.log('data saved!', data)
//     })
//     .catch(e => {
//         console.log('error found:',e)
//     })

const seedProducts = [
    {
        name: 'Fairy Eggplant',
        price: 1.00,
        category: 'vegetable'
    },
    {
        name: 'Organic Goddess Melon',
        price: 4.99,
        category: 'fruit'
    },
    {
        name: 'Organic Mini Seedless Watermelon',
        price: 3.99,
        category: 'fruit'
    },
    {
        name: 'Organic Celery',
        price: 1.50,
        category: 'vegetable'
    },
    {
        name: 'Chocolate Whole Milk',
        price: 2.69,
        category: 'dairy'
    },
]

Product.insertMany(seedProducts)
    .then(res => {
        console.log(res)
    })
    .catch(error => {
        console.log(error)
    })
