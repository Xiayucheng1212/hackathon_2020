const mongoose = require('mongoose');
// 8.210.63.210:27017


const userSchema = new mongoose.Schema({
    // 用戶名
    lineId:{
        required: true,
        type: String
    },
    username: String,
    profile_path: String,
    projects:[{ type: mongoose.Schema.Types.ObjectId, ref:"Project"}],
    
});

const User = mongoose.model('User', userSchema);



module.exports = {User};
