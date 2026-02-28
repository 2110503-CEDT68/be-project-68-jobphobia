const mongoose = require('mongoose');

const ShopSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        unique: true,
        trim: true,
        maxLength: [50, 'Name can not be more than 50 characters']
    },
    address: {
        type: String,
        required: [true, 'Please add an address']
    },
    tel: {
        type: String,
        required: [true, 'Please add an telephone number']
    },
    openClose: {
        open: {
            type: String,
            required: [true, 'Please add a Opening time']
        },
        close: {
            type: String,
            required: [true, 'Please add a Closing time']
        }
    },
},{
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
});

// Reverse poppulation with virtuals
ShopSchema.virtual('reservation', {
    ref: 'Reservation',
    localField: '_id',
    foreignField: 'Shop',
    justOne: false
})

module.exports = mongoose.model('Shop', ShopSchema);