//引用'http'模組
// const http = require('http');

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { User } = require('./model/User');
const { Project } = require('./model/Project');
const { Photo } = require('./model/Photo');
const { Payment } = require('./model/Payment');
const { Album } = require('./model/Album');
const bodyParser = require('body-parser');
const formidable = require('formidable');
const path = require('path');


//連結mongodb
mongoose.connect('mongodb://localhost/lineWeb', { useFindAndModify: false })
    .then(() => { console.log('數據庫連結成功'); })
    .catch(() => {
        console.log('數據庫連結失敗');
    });

// 參數解析post
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// 設定靜態資源位置
app.use(express.static('public'));

//設定CORS
app.use('/', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    next();
})
//設定server網址，因為在本機端測試，所以輸入127.0.0.1
//const hostname = '127.0.0.1'  //上傳至伺服器需拿掉
app.get('/test', async (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.send('這裡是test');

})


app.get('/getProjects', async (req, res) => {
    var lineId = req.body.lineId;
    var result = await User.aggregate([{ // 操作的Model为Author
        $lookup: {
            from: "projects", // 数据库中关联的集合名
            localField: "projects", // author文档中关联的字段
            foreignField: "_id", // book文档中关联的字段
            as: "projects_list" // 返回数据的字段名
        }
    }, {
        $match: { // 筛选条件
            "lineId": lineId
        }
    }]);
    //紀錄lineId
    req.app.locals.lineId = lineId;
    console.log(req.app.locals.lineId);

    res.send({
        status: 200,
        reuslt: result[0]
    });
})


app.post('/createProject', async (req, res) => {
    var body = req.body;
    req.app.locals.lineId = req.body.lineId;
    // 生成新的project id
    var new_project_id = mongoose.Types.ObjectId()
    var new_project = {
        _id: new_project_id,
        projectName: body.projectName,
        owner: body.lineId,
        createTime: body.time,
        place: body.place
    }
    var owner = await User.findOne({ lineId: body.lineId });
    Project.create(new_project);
    if (owner) {
        var new_list = JSON.parse(JSON.stringify(owner.projects));
        new_list.push(new_project_id);
        var result = await User.findOneAndUpdate({ lineId: body.lineId }, { projects: new_list });
    } else {
        var result = await User.create({
            lineId: body.lineId,
            username: body.username,
            projects: [new_project_id]
        })


    }

    console.log(result);
    res.json({
        status: 200,
        project_id: new_project_id
    })
})


app.get('/deleteProject', async (req, res) => {

})

app.post('/createAlbum', async (req, res) => {

    const form = new formidable.IncomingForm();
    form.uploadDir = path.join(__dirname, 'public', "uploads");
    form.keepExtensions = true;
    //定義在外面
    var new_album_id = new mongoose.Types.ObjectId();
    form.parse(req, async (err, fields, files) => {

        // 獲得project
        console.log(files);

        var new_album = await Album.create({
            _id: new_album_id,
            place: fields.place,
            project_belong: fields.project_id
        })
        await Album.create(new_album);
        if (files) {
            let photos = [];
            Object.keys(files).forEach(async function (key) {
                var new_photo_id = new mongoose.Types.ObjectId();
                var new_photo = {
                    _id: new_photo_id,
                    path: "http://localhost:3000" + files[key].path.split('public')[1],
                    album_belong: new_album_id
                };
                photos.push(new_photo_id);
                await Photo.create(new_photo);
            })

            var album = await Album.findOneAndUpdate({ _id: new_album_id }, { photos: photos });

            console.log(album);
        }
    });

    var result = await Album.findOne({ _id: new_album_id }).populate('photos').exec();
    res.send({
        status: 200,
        result
    });
})

app.post('/updateAlbum', (req, res) => {
    const form = new formidable.IncomingForm();
    form.uploadDir = path.join(__dirname, 'public', "uploads");
    form.keepExtensions = true;
    var photos = [];
    form.parse(req, async (err, fields, files) => {
        console.log(photos);

        // 獲得project
        console.log(files);
        var album = await Album.findOne({plcae: fields.plcae})
        
        Object.keys(files).forEach(async function (key) {
            var new_photo_id = new mongoose.Types.ObjectId();
            var new_photo = {
                _id: new_photo_id,
                path: "http://localhost:3000" + files[key].path.split('public')[1],
                // album_belong: album._id
            };
            photos.push(new_photo_id);
            await Photo.create(new_photo);
        })

        var album = await Album.findOneAndUpdate({ place: fields.place}, { photos: photos });

        console.log(album);

    });
    res.send({
        status: 200
    })
})


app.get('/getAlbum', async (req, res) => {

    var result = await Album.findOne({ place : req.query.place }).populate('photos').exec();
    console.log(result);

    res.send(reuslt)

})

app.post('/createRecord', async (req, res) => {
    var project_id = req.body.project_id;
    var member = req.body.member;
    var item = req.body.item;
    var new_payment_id = new mongoose.Types.ObjectId();
    var new_payment = {
        _id : new_payment_id,
        item: item,
        member: member
    };
    await Payment.create(new_payment);
    var record = await Project.findOne({_id: project_id}).record;
    record = JSON.parse(JSON.stringify(record)).push(new_payment_id);
    
    await Project.findOneAndUpdate({_id: project_id}, {record: record})
    var payment_list = await Project.findOne({_id: project_id}).populate('record').exec();
    res.send({
        status:200,
        payment_list
    })
})






//port 號會由 Heroku 給予，因此不再自行指定
const port = process.env.PORT || 3000;
app.listen(port);
console.log('服務器連結成功');


