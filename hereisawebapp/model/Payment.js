const mongoose = require('mongoose');
const paymentSchema = new mongoose.Schema({
    // 用戶名
    project_id:{
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref:"Project"
    },
    itemName: String,
    member: [{type: Object}]
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = {Payment};