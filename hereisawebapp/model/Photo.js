const mongoose = require('mongoose');
// 8.210.63.210:27017



const photoSchema = new mongoose.Schema({
    path:{
        required: true,
        type: String
    },
    album_belong: {type: mongoose.Schema.Types.ObjectId, ref: "album"},// 利用lineId
    
});

const Photo = mongoose.model('Photo', photoSchema);

module.exports = {Photo};