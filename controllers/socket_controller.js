const io = require( "socket.io" )();
const socketapi = {
    io: io
};

io.on('connection', function(socket){

    socket.on('announcement', function(data) {
      console.log('announcement:', data);
      io.emit('announcement', {
        userFirstName: data.userFirstName,
        message: data.message
      });
    });

    socket.on('connectionEvent', function(data) {
      console.log('connection:', data.userFirstName);
      io.emit('connectionEvent', {
          userFirstName:data.userFirstName,
          numClients: io.engine.clientsCount,
          message: 'connected'
      });
    });

});

module.exports = socketapi;
