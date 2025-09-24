const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    productname : {
        type: String,
        required : true,
    },
    price : {
        type : String,
        required : true,
    },
    category : {
        type: String,
        required : true,
    },
    stock : {
        type : Number,
        required : true,
    },
    description : {
        type : String,
        required : true,
    },
    productImage : {
        type : String,
    }
});

module.exports = mongoose.model("Product", productSchema)