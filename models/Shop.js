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
        required: [true, 'Please add an telephone number'],
        match: [/^[0-9]{10}$/, 'Telephone number must be exactly 10 digits'],
    },
    openClose: {
        open: {
            type: String,
            required: [true, 'Please add a Opening time'],
            match: [
                /^([01]\d|2[0-3]):([0-5]\d)$/,
                'Please use valid time format HH:mm from 00:00 - 23:59'
            ]
        },
        close: {
            type: String,
            required: [true, 'Please add a Closing time'],
            match: [
                /^([01]\d|2[0-3]):([0-5]\d)$/,
                'Please use valid time format HH:mm from 00:00 - 23:59'
            ]
        }
    },
},{
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
});

// Reverse poppulation with virtuals
ShopSchema.virtual('reservations', {
    ref: 'Reservation',
    localField: '_id',
    foreignField: 'Shop',
    justOne: false
})

module.exports = mongoose.model('Shop', ShopSchema);