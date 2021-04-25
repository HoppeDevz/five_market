const axios = require("axios");
const { USER_TOKEN, verify_timeout } = require("./config");
const { Wait, NeverResolve } = require("./lib/utils");
const net_events = require("./net_events");

const io = require("socket.io-client");

setTick(async () => {
    
    let SocketConnection = io(/*"https://api.fivemarket.org/"*/"http://localhost:40120");

    SocketConnection.emit("room", `deliveries:${USER_TOKEN}`);

    SocketConnection.on("delivery:new", data => {
        let { id, passport, items } = data;
        
        for (let item of items) {
            let { command, value, schedule, product_name } = item;

            emit(net_events[command], passport, value, schedule);

            if (command == "ADD_GROUP" || command == "ADD_MONEY" || command == "ADD_ITEM" || command == "ADD_HOME" || command == "ADD_VEHICLE") {
                emit("fxserver_events:user-notify", passport, value, schedule, product_name);
                emit("fxserver_events:global_chat_message", passport, value, schedule, product_name);
            }
            
        }

        SocketConnection.emit("delivery:received", { id });
        
    });
    
    await NeverResolve();
});

async function start() {
    console.log(`
     / __(_)   _____     ____ ___  ____ ______/ /_____  / /_
    / /_/ / | / / _ \\   / __ \`__ \\/ __ \`/ ___/ //_/ _ \\/ __/
   / __/ /| |/ /  __/  / / / / / / /_/ / /  / ,< /  __/ /_  
  /_/ /_/ |___/\\___/  /_/ /_/ /_/\\__,_/_/  /_/|_|\\___/\\__/  
    `)
}
start();