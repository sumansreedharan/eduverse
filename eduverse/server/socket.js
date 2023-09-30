// const {Server} = require('socket.io')

// function setSocket(server){
//     const io = new Server(server,{cors:true})
//     io.on('connected',(socket)=>{
//         console.log("socket connected",socket.id);

//         socket.on('setup',(userData)=>{
//             console.log(`user ${userData._id} connected`);
//             socket.join(userData._id)
//             socket.emit("chat connected")
//         })
//     })
// }

// module.exports = {setSocket}
