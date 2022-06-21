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
app.use('/sound', static(path.join(__dirname, 'sound')))

app.set('view engine', 'ejs');


var database;
var UserSchema;
var UserModel;

var spell_1 = "열려라"
var spell_2 = ['삼성', '엘지']
var spell_3 = ['냉장고', '건조기', '에어컨', '세탁기', '공기청정기', "가습기", "무선청소기"]

function connectDB() {
    var databaseUrl = 'mongodb+srv://akwls:rlagkwls1004@cluster0.9dmny.mongodb.net/alibaba'

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
        return this.find({name: id}, callback)
    })
    UserSchema.static('findAll', function(callback) {
        return this.find({}, callback)
    })
    UserSchema.static('findByCoin', function(callback) {
        return this.find({sort: {"coin": -1}, "limit": 5}, callback)
    })

    UserModel = mongoose.model("alibabas", UserSchema)
    console.log("alibabas 정의함")
}


function createSpell() {
    var second = spell_2[Math.round(Math.random())]
    var third = spell_3[Math.floor(Math.random() * spell_3.length)]
    return spell_1 + " " + second + " " + third;
}

var addUser = function(database, name, coin, callback) {
    console.log('addUser 호출됨 : ' + name)

    var createdSpell = createSpell();
    var user = new UserModel({'name': name, 'random_spell': createdSpell, 'current_step' : 1, 'coin': coin})


    user.save(function(err, addedUser) {
        if(err) {
            callback(err, null)
            return;
        }
        console.log('사용자 데이터 추가함')
        callback(null, addedUser)
    })

}

var updateUser = function(database, name, oldCoin, coin, callback) {
    console.log("updateUser 호출 됨 : " + name + coin)
    console.log("기존 코인" + oldCoin)

    UserModel.findOneAndUpdate({name: name}, {coin: (+oldCoin)+coin}, function(err, updatedUser) {
        if(err) {
            callback(err, null)
            return
        }
        console.log('사용자 coin 업데이트함')
        callback(null, updatedUser)
    })
}

router.route('/process/adduser').post(function(req, res) {
    var username = req.body.name || req.query.name;
    var coinCount = req.body.coin || req.query.coin;
    var isEnd = req.body.end || req.query.end;

    if(database) {
        UserModel.findById(username, function(err, results) {
            if(err) {
                throw err;
                return;
            }
            if(results.length == 0) {
                addUser(database, username, coinCount, function(err, result) {
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
            else if(results.length > 1) {
                console.log("중복된 이름입니다.")
                return;
            }
            else if(results.length == 1) {
               updateUser(database, username, results[0].coin, coinCount, function(err, result) {
                    if(err) {
                        throw err;
                    }
                    if(result) {
                        console.log('사용자 업데이트 성공')
                    }
                    else {
                        console.log('사용자 업데이트 실패')
                    }
               })
            }
            
        })
        if(isEnd) {
            res.redirect('/html/end_game_name.html')
        }
        else {
            res.redirect('/html/start.html')
        }
        
    }
    
})

router.route('/process/spell').post(function(req, res) {
    var spell = req.body.spell || req.query.spell;
    if(spell == "열려라 미림 월드") {
        res.redirect('/html/end_game.html')
    }
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