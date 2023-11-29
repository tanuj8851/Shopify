const mongoose= require("mongoose");

const productSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        required: true
    }
},{
    versionKey:false
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;