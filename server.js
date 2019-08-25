var express = require('express')
  , app = express()
  , env = { Local: 0, Azure: 1 }
  , envMode = env.Local
  , port

app.use(express.static('www'))

process.argv.forEach((val, index, array) => { if (val === 'local') { envMode = env.Local } })
  
if (envMode === env.Local)
    port = 1000
else
    port = process.env.PORT

app.listen(port, function (error) {
    if(!error)
        console.log('Find server is listen to port: ' + port)
    else
        console.log('error on find server inicialization: ' + error)
})