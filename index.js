
const express = require('express');
const app = express();
const serv = require('http').Server(app);

app.get('/',function(req, res) {
  res.sendFile(__dirname + '/client/index.html');
});
//Configurando app
app.use('/client',express.static(__dirname + '/client'));

serv.listen(process.env.PORT);
console.log("Servidor Iniciado");
//^^
/*const io = require('socket.io')(serv,{});

io.sockets.on('connection', socket => {
  
  
  socket.on('newPlayer', (playerId) => {
    console.log(playerId);
  });

 
  socket.on('disconnect',function(){

  });

});*/