const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
    place: {
        required: true,
        type: String
    },
    project_belong: {type: mongoose.Schema.Types.ObjectId, ref: "Project"},// 利用lineId
    photos:[{type: mongoose.Schema.Types.ObjectId, ref: "Photo"}]
});

const Album = mongoose.model('Album', albumSchema);

module.exports = {Album};