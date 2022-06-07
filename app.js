var express = require('express')
, http = require('http')
, path = require('path')

var bodyParser = require('body-parser')
, static = require('serve-static')

var mongoose = require('mongoose')

var app = express();

var router = express.Router();

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use('/js', static(path.join(__dirname, 'js')))
app.use('/html', static(path.join(__dirname, 'html')))
app.use('/image', static(path.join(__dirname, 'image')))
app.use('/gif', static(path.join(__dirname, 'gif')))
app.use('/font', static(path.join(__dirname, 'font')))

app.set('view engine', 'ejs');


var database;
var UserSchema;
var UserModel;

var spell_1 = "열려라"
var spell_2 = ['삼성', '엘지']
var spell_3 = ['냉장고', '건조기', '에어컨', '세탁기', '공기청정기', "가습기", "무선청소기"]

function connectDB() {
    var databaseUrl = 'mongodb://127.0.0.1:27017/local'

    console.log("데이터베이스 연결을 시도합니다.");
    mongoose.Promise = global.Promise;
    mongoose.connect(databaseUrl)
    database = mongoose.connection

    database.on('error', console.error.bind(console, 'mongoose connection error.'))
    database.on('open', function() {
        console.log("데이터베이스에 연결되었습니다.", databaseUrl)
        createUserSchema();
    })

    database.on('disconnected', function() {
        console.log("연결이 끊어졌습니다. 5초 후 재연결합니다.")
        setInterval(connectDB, 5000)
    })
}


function createUserSchema() {
    UserSchema = mongoose.Schema({
        name: {type: String, required: true, index: 'hashed', 'default': '', unique: true},
        random_spell: {type: String, required: true},
        current_step: {type: Number, 'default': 1},
        coin: {type: Number, 'default': 0}
    })


    console.log("UserSchema 정의함")

    UserSchema.static('findById', function(id, callback) {
        return this.find({id: id}, callback)
    })
    UserSchema.static('findAll', function(callback) {
        return this.find({}, callback)
    })
    UserSchema.static('findByCoin', function(callback) {
        return this.find({sort: {"coin": -1}, "limit": 5}, callback)
    })

    UserModel = mongoose.model("alibaba", UserSchema)
    console.log("users 정의함")
}

// createUser
// authUser
// createSpell

function createSpell() {
    var second = spell_2[Math.round(Math.random())]
    var third = spell_3[Math.floor(Math.random() * spell_3.length)]
    return spell_1 + " " + second + " " + third;
}

var addUser = function(database, name, callback) {
    console.log('addUser 호출됨 : ' + name)

    var createdSpell = createSpell();
    var user = new UserModel({'name': name, 'random_spell': createdSpell, 'current_step' : 1, 'coin': 0})

    
    user.save(function(err, addedUser) {
        if(err) {
            callback(err, null)
            return;
        }
        console.log('사용자 데이터 추가함')
        callback(null, addedUser)
    })

}

router.route('/process/adduser').post(function(req, res) {
    var username = req.body.username || req.query.username;

    if(database) {
        addUser(database, username, function(err, result) {
            if(err) {
                throw err;
            }
            if(result) {
                console.log("사용자 추가 성공")
            }
            else {
                console.log("사용자 추가 실패")
            }
        })
    }
    res.redirect('/html/start.html')
})

router.route("/process/rank").get(function(req, res) {
    console.log('/process/rank 호출됨')
    
    if(database) {
        UserModel.findByCoin(function(err, results) {
            if(err) {
                console.error('사용자 리스트 조회 중 오류 발생 : ' + err.stack)
                return
            }
            if(results) {
                console.dir(results)
                var rankingResult = [];
                for(var i = 0; i<results.length; i++) {
                    var curName = results[i]._doc.name
                    var curCoin = results[i]._doc.coin
                    rankingResult.push({"name": curName, "coin": curCoin})
                }
                res.render('../html/ranking.ejs', {'rankingResult' : rankingResult}, function(err ,html){
                    if (err){
                        console.log("랭킹 실패")
                        console.log(err)
                        return
                    }
                    console.log("랭킹 성공")
                    res.end(html) // 응답 종료
                })
            }
            else {
                console.log("사용자 리스트 조회 실패");
            }
        })
    }
    else {
        res.writeHead('200', {'Content-Type': 'text/html; charset=utf8'})
        res.write('<h2>데이터베이스 연결 실패</h2>')
        res.end();
    }
})

router.route('/').get(function(req, res) {
    res.redirect('/html/main.html');
})

app.use('/', router)

http.createServer(app).listen(process.env.PORT || 3000, function() {
    connectDB();
    console.log('서버가 시작되었습니다.')
});