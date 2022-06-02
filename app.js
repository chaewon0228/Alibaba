var express = require('express')
, http = require('http')
, path = require('path')

var bodyParser = require('body-parser')
, static = require('serve-static')

var app = express();

var router = express.Router();

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use('/js', static(path.join(__dirname, 'js')))
app.use('/html', static(path.join(__dirname, 'html')))
app.use('/image', static(path.join(__dirname, 'image')))
app.use('/gif', static(path.join(__dirname, 'gif')))
app.use('/font', static(path.join(__dirname, 'font')))

router.route('/').get(function(req, res) {
    res.redirect('/html/main.html');
})

app.use('/', router)

http.createServer(app).listen(process.env.PORT || 3000, function() {
    console.log('서버가 시작되었습니다.')
});