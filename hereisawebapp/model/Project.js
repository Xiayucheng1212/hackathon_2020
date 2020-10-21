const mongoose = require('mongoose');
// 8.210.63.210:27017


const projectSchema = new mongoose.Schema({
    projectName: {
        required: true,
        type: String
    },
    album: {type: mongoose.Schema.Types.ObjectId, ref:"Album"},
    owner: {type: String, ref: "User"},// 利用lineId
    createTime: String,
    place: String,
    record: [{type: mongoose.Schema.Types.ObjectId, ref:"Payment"}]


});

const Project = mongoose.model('Project', projectSchema);

module.exports = {Project};