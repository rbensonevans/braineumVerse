const Web3 = require("web3");
const net = require("net");
const shell = require('shelljs')

const webSocketsServerPort = 8000;
const webSocketServer = require('websocket').server;
const http = require('http');
const { DefaultDeserializer } = require("v8");

var intervalObj = null;
var new_coins = 0;

// One starts out life with 100 'BRAI' coins.
var LifeCoins = 100;

// Spinning the http server and the websocket server.
const server = http.createServer();
server.listen(webSocketsServerPort);
console.log('Hello World: http listening on port 8000');


const wsServer = new webSocketServer({
  httpServer: server
});

var web3_chain1 = new Web3('/Users/benson/BRAINEUM_HACKATHON/ethereum_src/braineum_chaindir_1/geth.ipc', net);
var web3_chain2 = new Web3('/Users/benson/BRAINEUM_HACKATHON/ethereum_src/braineum_chaindir_2/geth.ipc', net);
var web3_chain3 = new Web3('/Users/benson/BRAINEUM_HACKATHON/ethereum_src/braineum_chaindir_3/geth.ipc', net);
var web3_chain4 = new Web3('/Users/benson/BRAINEUM_HACKATHON/ethereum_src/braineum_chaindir_4/geth.ipc', net);
var web3_chain5 = new Web3('/Users/benson/BRAINEUM_HACKATHON/ethereum_src/braineum_chaindir_5/geth.ipc', net);

earth = 0;
moon = 0;
mars = 0;
jupiter = 0;
pluto = 0;
miningOnFlag = 0;

const clients = {};

// This code generates unique userid for everyuser.
const getUniqueID = () => {
  const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  return s4() + s4() + '-' + s4();
};

// Main scene sequence.
//var event_number = 1; // send events from 1 to 20; 0 is the initially displayed scene.
var event_number = 0; // send events from 0 to 19; blockchain version.
var event_number_paused = 1; // initially set to event_number.

// flags.
var main_script = 1;
var teleport_macys = 0;
var teleport_starbucks = 0;
var teleport_brooklyn_museum = 0;
var teleport_random_new = 0;
var teleport_home = 0;
var teleport_global = 0;
var teleport_friends = 0;
var teleport_cities = 0;
var teleport_live_event = 0;
var teleport_flatbush_ave = 0;
var teleport_news = 0;
var teleport_suggestions = 0;

var cid = "";
var noPubAddress = "";
var noToken = 0;
var pubAddress = "0xljweoisdfljsdlfieesjfjdljfal";
var tokenValue = 60;

wsServer.on('request', function (request) {
 var userID = getUniqueID();
  console.log((new Date()) + ' Recieved a new connection from origin ' + request.origin + '.');

  // You can rewrite this part of the code to accept only the requests from allowed origin
  const connection = request.accept(null, request.origin);
  console.log('connected: ');


  clients[userID] = connection;
  console.log('connected: ' + userID + ' in ' + Object.getOwnPropertyNames(clients));

  function sendMessageToClient(amountEarned, brainRegion, infoMsg, imageIndex, pubAddress, wonToken) {
    // REVISIT!! assume more than one connection for now. Should only be one.

  var current = new Date();
  var dateTimeVal = current.toLocaleString();

    for(key in clients) {
       //clients[key].send(JSON.stringify({
       var server_response = JSON.stringify({
          type: "message",
          amount: amountEarned, 
          region: brainRegion,
          infomsg: infoMsg,
	  imageindex: imageIndex,
	  pubaddress: pubAddress,
	  wontoken: wonToken,
	  datetimeval: dateTimeVal,
          miner1: "Earth: " + earth,
          miner2: "Moon: " + moon,
          miner3: "Mars: " + mars,
          miner4: "Jupiter: " + jupiter,
          miner5: "Pluto: " + pluto,
          miningonflag: miningOnFlag
    });
    console.log('server: ' + server_response);
    clients[key].send(server_response);
   }
  }

  function getRandomInt(max) {
      return Math.floor(Math.random() * max);
  }

  function turnOffFlags() {
	main_script = 0;
	teleport_macys = 0;
	teleport_starbucks = 0;
	teleport_brooklyn_museum = 0;
	teleport_random_new = 0;
	teleport_home = 0;
	teleport_global = 0;
	teleport_friends = 0;
	teleport_cities = 0;
	teleport_live_event = 0;
	teleport_flatbush_ave = 0;
	teleport_news = 0;
	teleport_suggestions = 0;
  }


  function getStarbucksScene(arg_event_number) {
    // the frontend uses numbers from 25 to 27.
    switch(arg_event_number) {
        //case 0:
        case 25:
	  return("USING_LOCAL_ADDRESS");
          //return("StarBucks:QmPXkR23vecWM6V5ojv84Cngx6SErjFfVsgL59P3V98KH3");

        //case 1:
        case 26:
	  return("USING_LOCAL_ADDRESS");
          //return("StarBucks:QmVM97hK2gRPL64CVPdFWrbT7sXzKMwmq8pE7mKXQodkKn");

        //case 2:
        case 27:
	  return("USING_LOCAL_ADDRESS");
          //return("StarBucks:QmTW3M7RJeQzXTiQ2KbnWvxyKTprdaVTrqYTbFiuMzFHCg");

       default:
          console.log("Error: out of bounds event_number.");
	  event_number = 25; // wrap the global event number.
	  return("USING_LOCAL_ADDRESS");
          //return("EOF");
    }
   }

  function getMacysScene(arg_event_number) {
    // the frontend uses numbers from 21 to 24.
    switch(arg_event_number) {
        //case 0:
        case 21:
	  return("USING_LOCAL_ADDRESS");
          //return("QmNxHByd376GmJjKpd8eU9S8zv6MoQig1jZwYdS7bu1bbX");

        //case 1:
        case 22:
	  return("USING_LOCAL_ADDRESS");
          //return("MACYS:QmUYJWzrTi2U6gvyJh3Rs3yBpXyiBrppPhraLYyrwLRL3n");

        //case 2:
        case 23:
	  return("USING_LOCAL_ADDRESS");
          //return("MACYS:QmT22uLYQt1UkskfyxUHyNhjxvUvSqsuDT7RmJwG7tLyL3");

        //case 3:
        case 24:
	  return("USING_LOCAL_ADDRESS");
          //return("MACYS:QmVTmDftD1wAMVjF1x3BMmf7SP9smzHyh2s1Gqyp56DVQj");

       default:
          console.log("Error: out of bounds event_number.");
	  event_number = 21; // wrap the global event number.
	  return("USING_LOCAL_ADDRESS");
          //return("EOF");
    }
   }


  function getSpaceStationScene(arg_event_number) {

    switch(arg_event_number) {
        case 0:
	  return("USING_LOCAL_ADDRESS");
    	  //return('https://bafybeidyzcnemgquqhqr3d6vpey2iagbni2p7tcky5w2jonw6zht6pqm6q.ipfs.dweb.link/space_station_v_scene/2001_Tunnel.jpeg');
          //return("QmX3QAonUPVZQtJjGVNFdAEkTnwwbhLLxbAzq39gy8Tc7V");

        case 1:
	  return("USING_LOCAL_ADDRESS");
          //return("QmcNjUbcYmMbUgPpE5m6WDbR5zHjY5YLMGdKaHDA4p1Eyu");

        case 2:
	  return("USING_LOCAL_ADDRESS");
          //return("QmYtYE9Wf8zcKnoX11mqJuzkCcbHevymHyFq7KmnxTKkcr");

        case 3:
	  return("USING_LOCAL_ADDRESS");
          //return("QmVKv23fzCkDhbg5i9kHrFh8AojDed39xsCwUALeFNLP9g");

        case 4:
	  return("USING_LOCAL_ADDRESS");
          //return("QmV4KGKaiMRpGvLfx4NmZpjNxLeU5iVHHxbbtWPe2r2FUv");

        case 5:
	  return("USING_LOCAL_ADDRESS");
          //return("QmVKPMpL3J2KbZsLvEWKnMx1rAZJfHPkk9cYdb7qo2scyp");

        case 6:
	  return("USING_LOCAL_ADDRESS");
          //return("QmX3QAonUPVZQtJjGVNFdAEkTnwwbhLLxbAzq39gy8Tc7V");

        case 7:
	  return("USING_LOCAL_ADDRESS");
          //return("QmbQDuRTumRpQQ3UJikJM3NXBKNKoctXM4xjrvsWeqtJHK");

        case 8:
	  return("USING_LOCAL_ADDRESS");
          //return("Qmbnffvc1Dep6jW9Ug3kqF5Pyf6BKmeeyM2ShEf6ga1qBX");

        case 9:
	  return("USING_LOCAL_ADDRESS");
          //return("QmPMxAcv5gNgsjEccikNPxmfJ8dbiE3YPgb95QkWxYiB9W");

        case 10:
	  return("USING_LOCAL_ADDRESS");
          //return("Qmd8uf3Av6tNTaUTBwaHdRGxW3yDg2JMLJuYSpmtDc9rZx");

        case 11:
	  return("USING_LOCAL_ADDRESS");
          //return("QmfWUZANb1vSmKL2DVvLpVZgkGt4Uh8TkL3aK4JYj759f2");

        case 12:
	  return("USING_LOCAL_ADDRESS");
          //return("QmPuPKqPkJJ4aDdQhSYYG1H3Mihh2GwYGmty9JSV4A6PRY");

        case 13:
	  return("USING_LOCAL_ADDRESS");
          //return("Qmaw1tDMt1MzG4ZWPvqQGzSAbP6sqbB466E6X7HVdUHafm");

        case 14:
	  return("USING_LOCAL_ADDRESS");
          //return("QmcxaFyhXYSp2mDGxJ6gtMzPHJVCMKV3CwXnRzsJou3UBM");

        case 15:
	  return("USING_LOCAL_ADDRESS");
          //return("QmXJ5xywc9r5HuPnVwzK2FnNNLtEP1HbSv89QiD14WiyyD");

        case 16:
	  return("USING_LOCAL_ADDRESS");
          //return("QmPgnyird7kCvjkvtftgNXCQExn99F2GHER9TcnHrA97JZ");

        case 17:
	  return("USING_LOCAL_ADDRESS");
          //return("QmRpxbNFAqmZLaobm85kp8iT4L4ErE6U2cvjQd3VwBX83e");

        case 18:
	  return("USING_LOCAL_ADDRESS");
          //return("QmdQxerU75n8mwedHrVKrrayT8vzTs7DtdtcgFDwk8cy8J");

        case 19:
	  return("USING_LOCAL_ADDRESS");
          //return("QmUhBar75KMUenEPUqAAzCQoVKTe4EuXFnnr66mMQnSPKW");

        case 20:
	  return("USING_LOCAL_ADDRESS");
          //return("QmUhBar75KMUenEPUqAAzCQoVKTe4EuXFnnr66mMQnSPKW");

       default:
          console.log("Error: out of bounds event_number.");
	  event_number = 0; // reset the global event number.
	  return("USING_LOCAL_ADDRESS");
          //return("EOF"); 
    }
   }



  function getRandomNewScene(arg_event_number) {
    switch(arg_event_number) {
        case 0:
return("https://bafybeibx3ds2rvfb35unt7jjjerudqnjiv66ds24zmi7j3iotdm6mpa3au.ipfs.dweb.link/random_view/random_1.jpeg");

        case 1:
return("https://bafybeibx3ds2rvfb35unt7jjjerudqnjiv66ds24zmi7j3iotdm6mpa3au.ipfs.dweb.link/random_view/random_2.jpeg");

        case 2:
return("https://bafybeibx3ds2rvfb35unt7jjjerudqnjiv66ds24zmi7j3iotdm6mpa3au.ipfs.dweb.link/random_view/random_3.jpeg");

        case 3:
return("https://bafybeibx3ds2rvfb35unt7jjjerudqnjiv66ds24zmi7j3iotdm6mpa3au.ipfs.dweb.link/random_view/random_4.jpeg");

        case 4:
return("https://bafybeibx3ds2rvfb35unt7jjjerudqnjiv66ds24zmi7j3iotdm6mpa3au.ipfs.dweb.link/random_view/random_5.jpeg");

       default:
          console.log("Error: out of bounds event_number.");
	  event_number = 0; // wrap the global event number.
return("https://bafybeibx3ds2rvfb35unt7jjjerudqnjiv66ds24zmi7j3iotdm6mpa3au.ipfs.dweb.link/random_view/random_1.jpeg");
          //return("EOF");
    }
   }


  function getFriendsScene(arg_event_number) {
    switch(arg_event_number) {
        case 0:
return("https://bafybeic5lsayqi2a746paxnhlbqid6fk6acgkquy3hvuc4gzey7aaxxxuq.ipfs.dweb.link/models_view/models_1.jpeg");

        case 1:
return("https://bafybeic5lsayqi2a746paxnhlbqid6fk6acgkquy3hvuc4gzey7aaxxxuq.ipfs.dweb.link/models_view/models_2.jpeg");

        case 2:
return("https://bafybeic5lsayqi2a746paxnhlbqid6fk6acgkquy3hvuc4gzey7aaxxxuq.ipfs.dweb.link/models_view/models_3.jpeg");

        case 3:
return("https://bafybeic5lsayqi2a746paxnhlbqid6fk6acgkquy3hvuc4gzey7aaxxxuq.ipfs.dweb.link/models_view/models_4.jpeg");

        case 4:
return("https://bafybeic5lsayqi2a746paxnhlbqid6fk6acgkquy3hvuc4gzey7aaxxxuq.ipfs.dweb.link/models_view/models_5.jpeg");

       default:
          console.log("Error: out of bounds event_number.");
	  event_number = 0; // wrap the global event number.
return("https://bafybeic5lsayqi2a746paxnhlbqid6fk6acgkquy3hvuc4gzey7aaxxxuq.ipfs.dweb.link/models_view/models_1.jpeg");
          //return("EOF");
    }
   }



  function getHomeScene(arg_event_number) {
    switch(arg_event_number) {
        case 0:
return("https://bafybeifuiyt25c5ggjpxvpio3napvjhxxrcoiuzqqaykumbbowh5z4iluu.ipfs.dweb.link/home_view/home_1.jpeg");

        case 1:
return("https://bafybeifuiyt25c5ggjpxvpio3napvjhxxrcoiuzqqaykumbbowh5z4iluu.ipfs.dweb.link/home_view/home_2.jpeg");

        case 2:
return("https://bafybeifuiyt25c5ggjpxvpio3napvjhxxrcoiuzqqaykumbbowh5z4iluu.ipfs.dweb.link/home_view/home_3.jpeg");

        case 3:
return("https://bafybeifuiyt25c5ggjpxvpio3napvjhxxrcoiuzqqaykumbbowh5z4iluu.ipfs.dweb.link/home_view/home_4.jpeg");

        case 4:
return("https://bafybeifuiyt25c5ggjpxvpio3napvjhxxrcoiuzqqaykumbbowh5z4iluu.ipfs.dweb.link/home_view/home_5.jpeg");

       default:
          console.log("Error: out of bounds event_number.");
	  event_number = 0; // wrap the global event number.
return("https://bafybeifuiyt25c5ggjpxvpio3napvjhxxrcoiuzqqaykumbbowh5z4iluu.ipfs.dweb.link/home_view/home_1.jpeg");
          //return("EOF");
    }
   }


  function getGlobalScene(arg_event_number) {
    switch(arg_event_number) {
        case 0:
return("https://bafybeifimxu5dwiemi34wow4f263yov7zpqsktr6dqmloeo7sd6p32byyu.ipfs.dweb.link/global_view/global_1.jpeg");

        case 1:
return("https://bafybeifimxu5dwiemi34wow4f263yov7zpqsktr6dqmloeo7sd6p32byyu.ipfs.dweb.link/global_view/global_2.jpeg");

        case 2:
return("https://bafybeifimxu5dwiemi34wow4f263yov7zpqsktr6dqmloeo7sd6p32byyu.ipfs.dweb.link/global_view/global_3.jpeg");

        case 3:
return("https://bafybeifimxu5dwiemi34wow4f263yov7zpqsktr6dqmloeo7sd6p32byyu.ipfs.dweb.link/global_view/global_4.jpeg");

        case 4:
return("https://bafybeifimxu5dwiemi34wow4f263yov7zpqsktr6dqmloeo7sd6p32byyu.ipfs.dweb.link/global_view/global_5.jpeg");

       default:
          console.log("Error: out of bounds event_number.");
	  event_number = 0; // wrap the global event number.
return("https://bafybeifimxu5dwiemi34wow4f263yov7zpqsktr6dqmloeo7sd6p32byyu.ipfs.dweb.link/global_view/global_1.jpeg");
          //return("EOF");
    }
   }


  function getFlatbushAveScene(arg_event_number) {
    switch(arg_event_number) {
        case 0:
return("https://bafybeibo7wz37rw22ys3rpqsuzf4ezmubdrzoka2xnulfeedgsigh3czhy.ipfs.dweb.link/flatbush_ave_view/flatbush_1.jpeg");

        case 1:
return("https://bafybeibo7wz37rw22ys3rpqsuzf4ezmubdrzoka2xnulfeedgsigh3czhy.ipfs.dweb.link/flatbush_ave_view/flatbush_2.jpeg");

        case 2:
return("https://bafybeibo7wz37rw22ys3rpqsuzf4ezmubdrzoka2xnulfeedgsigh3czhy.ipfs.dweb.link/flatbush_ave_view/flatbush_3.jpeg");

        case 3:
return("https://bafybeibo7wz37rw22ys3rpqsuzf4ezmubdrzoka2xnulfeedgsigh3czhy.ipfs.dweb.link/flatbush_ave_view/flatbush_4.jpeg");

        case 4:
return("https://bafybeibo7wz37rw22ys3rpqsuzf4ezmubdrzoka2xnulfeedgsigh3czhy.ipfs.dweb.link/flatbush_ave_view/flatbush_5.jpeg");

       default:
          console.log("Error: out of bounds event_number.");
	  event_number = 0; // wrap the global event number.
return("https://bafybeibo7wz37rw22ys3rpqsuzf4ezmubdrzoka2xnulfeedgsigh3czhy.ipfs.dweb.link/flatbush_ave_view/flatbush_1.jpeg");
          //return("EOF");
    }
   }



  function getLiveEventScene(arg_event_number) {
    switch(arg_event_number) {
        case 0:
return("https://bafybeib43vx7s4u5gwdxzsd5tdz47e4sk3cxplebbosyfteojpy3wqposa.ipfs.dweb.link/events_view/event_1.jpeg");

        case 1:
return("https://bafybeib43vx7s4u5gwdxzsd5tdz47e4sk3cxplebbosyfteojpy3wqposa.ipfs.dweb.link/events_view/event_2.jpeg");

        case 2:
return("https://bafybeib43vx7s4u5gwdxzsd5tdz47e4sk3cxplebbosyfteojpy3wqposa.ipfs.dweb.link/events_view/event_3.jpeg");

        case 3:
return("https://bafybeib43vx7s4u5gwdxzsd5tdz47e4sk3cxplebbosyfteojpy3wqposa.ipfs.dweb.link/events_view/event_4.jpeg");

        case 4:
return("https://bafybeib43vx7s4u5gwdxzsd5tdz47e4sk3cxplebbosyfteojpy3wqposa.ipfs.dweb.link/events_view/event_5.jpeg");

       default:
          console.log("Error: out of bounds event_number.");
	  event_number = 0; // wrap the global event number.
return("https://bafybeib43vx7s4u5gwdxzsd5tdz47e4sk3cxplebbosyfteojpy3wqposa.ipfs.dweb.link/events_view/event_1.jpeg");
          //return("EOF");
    }
   }



  function getCitiesScene(arg_event_number) {
    switch(arg_event_number) {
        case 0:
return("https://bafybeicsuwx3aid2d3tzbmity7tps477cpuimxalef7nsmbc5b66vq27ze.ipfs.dweb.link/city_view/city_1.jpeg");

        case 1:
return("https://bafybeicsuwx3aid2d3tzbmity7tps477cpuimxalef7nsmbc5b66vq27ze.ipfs.dweb.link/city_view/city_2.jpeg");

        case 2:
return("https://bafybeicsuwx3aid2d3tzbmity7tps477cpuimxalef7nsmbc5b66vq27ze.ipfs.dweb.link/city_view/city_3.jpeg");

        case 3:
return("https://bafybeicsuwx3aid2d3tzbmity7tps477cpuimxalef7nsmbc5b66vq27ze.ipfs.dweb.link/city_view/city_4.jpeg");

        case 4:
return("https://bafybeicsuwx3aid2d3tzbmity7tps477cpuimxalef7nsmbc5b66vq27ze.ipfs.dweb.link/city_view/city_5.jpeg");

       default:
          console.log("Error: out of bounds event_number.");
	  event_number = 0; // wrap the global event number.
return("https://bafybeicsuwx3aid2d3tzbmity7tps477cpuimxalef7nsmbc5b66vq27ze.ipfs.dweb.link/city_view/city_1.jpeg");
          //return("EOF");
    }
   }



  function getBrooklynMuseumScene(arg_event_number) {
    switch(arg_event_number) {
        case 0:
return("https://bafybeicjgk6cafam7wqokosnmqgzi3izvxynco7ssexnimc2kbonff5wce.ipfs.dweb.link/brooklyn_museum_view/museum_view_1.jpeg");

        case 1:
return("https://bafybeicjgk6cafam7wqokosnmqgzi3izvxynco7ssexnimc2kbonff5wce.ipfs.dweb.link/brooklyn_museum_view/museum_view_2.jpeg");

        case 2:
return("https://bafybeicjgk6cafam7wqokosnmqgzi3izvxynco7ssexnimc2kbonff5wce.ipfs.dweb.link/brooklyn_museum_view/museum_view_3.jpeg");

        case 3:
return("https://bafybeicjgk6cafam7wqokosnmqgzi3izvxynco7ssexnimc2kbonff5wce.ipfs.dweb.link/brooklyn_museum_view/museum_view_4.jpeg");

        case 4:
return("https://bafybeicjgk6cafam7wqokosnmqgzi3izvxynco7ssexnimc2kbonff5wce.ipfs.dweb.link/brooklyn_museum_view/museum_view_5.jpeg");

       default:
          console.log("Error: out of bounds event_number.");
	  event_number = 0; // wrap the global event number.
return("https://bafybeicjgk6cafam7wqokosnmqgzi3izvxynco7ssexnimc2kbonff5wce.ipfs.dweb.link/brooklyn_museum_view/museum_view_1.jpeg");
          //return("EOF");
    }
   }

  function getNewsScene(arg_event_number) {
	return(getRandomNewScene(event_number)); // add its own links later.
  }
  function getSuggestionsScene(arg_event_number) {
       return(getGlobalScene(event_number)); // add its own links later.

  }

	function teleport_basics() 
	{
	      if (main_script)
	      {
	          event_number_paused = event_number; // save our location only if in main_script.
	      }
	      event_number = 0; // blockchain version. 
	      main_script = 0;
	      teleport_macys = 0;
	      clearInterval(intervalObj);
	      intervalObj= setInterval(startBlockchainGame, 1500, "Start interval called");
	      return;
	}
	
   function message_producer_basics(cid_val) 
   {
       if (cid_val === "EOF") {
           event_number = 0;
           clearInterval(intervalObj);  // stop sending events.
           // Send the EOF to the client. 
           sendMessageToClient(0, -9, "", event_number, cid_val, noToken);
           return;
       }
       sendMessageToClient(0, -9, "", event_number, cid_val, noToken);
       event_number += 1;
       return;
   }

  
  function startBlockchainGame(arg) {
    console.log(`arg was => ${arg}`);


    // the main scene.
    if (main_script)
    {
       cid = getSpaceStationScene(event_number);
       if (cid === "EOF") {
           event_number = 0;
           clearInterval(intervalObj);  // stop sending events.
           sendMessageToClient(0, -9, "", event_number, cid, noToken);
	   return;
       }
       // Send the EOF to the client.
       sendMessageToClient(0, -9, "", event_number, cid, noToken);
       event_number += 1;
       return;
    }

    if (teleport_starbucks)
    {
       cid = getStarbucksScene(event_number);
       if (cid === "EOF") {
           event_number = 0;
           clearInterval(intervalObj);  // stop sending events.
           // Send the EOF to the client.
           sendMessageToClient(0, -9, "", event_number, cid, noToken);
	   return;
       }
       sendMessageToClient(0, -9, "", event_number, cid, noToken);
       event_number += 1;
       return;
    }

    if (teleport_macys)
    {
       cid = getMacysScene(event_number);
       if (cid === "EOF") {
           event_number = 0;
           clearInterval(intervalObj);  // stop sending events.
           // Send the EOF to the client.
           sendMessageToClient(0, -9, "", event_number, cid, noToken);
	   return;
       }
       sendMessageToClient(0, -9, "", event_number, cid, noToken);
       event_number += 1;
       return;
    }


    if (teleport_brooklyn_museum)
    {  
       cid = getBrooklynMuseumScene(event_number);
       message_producer_basics(cid);
       return;
    }
        
    if (teleport_random_new)
    {  
       cid = getRandomNewScene(event_number);
       message_producer_basics(cid);
       return;
    }
        
    if (teleport_home)
    {  
       cid = getHomeScene(event_number);
       message_producer_basics(cid);
       return;
    }
        
    if (teleport_global)
    {  
       cid = getGlobalScene(event_number);
       message_producer_basics(cid);
       return;
    }
	      
    if (teleport_friends)
    {  
       cid = getFriendsScene(event_number);
       message_producer_basics(cid);
       return;
    }
        
    if (teleport_cities)
    {  
       cid = getCitiesScene(event_number);
       message_producer_basics(cid);
       return;
    }
        
    if (teleport_live_event)
    {  
       cid = getLiveEventScene(event_number);
       message_producer_basics(cid);
       return;
    }
        
    if (teleport_flatbush_ave)
    {  
       cid = getFlatbushAveScene(event_number);
       message_producer_basics(cid);
       return;
    }
        
    if (teleport_news)
    {  
       cid = getNewsScene(event_number);
       message_producer_basics(cid);
       return;
    }
        
    if (teleport_suggestions)
    {  
       cid = getSuggestionsScene(event_number);
       message_producer_basics(cid);
       return;
    }

    // some error; go to main_script.
    main_script = 1;
    event_number = 0;
  } 
    

  var usermsg = null;

  connection.on('message', function(message) {
    
    if (message.type === 'utf8') {
      console.log('Received Message: ', message.utf8Data);
      usermsg = JSON.parse(message.utf8Data);
    }

    if (usermsg.msg === "StartBraineumAI") {
      console.log("Hey Benson: Start BraineumAI Received");
      main_script = 1;
      //event_number = 1; // old-way reset.
      event_number = 0; // reset.
      teleport_macys = 0; // turn off teleports; back to main script.
      teleport_starbucks = 0; // turn off teleports; back to main script.
      clearInterval(intervalObj);
      intervalObj= setInterval(startBlockchainGame, 1500, "Start interval called");
      return;
    }  
  
    if (usermsg.msg === "PauseBraineumAI") {
      console.log("Hey Benson: Pause BraineumAI Received");
      clearInterval(intervalObj);
      return;
    }

    if (usermsg.msg === "ContinueBraineumAI") {
      console.log("Hey Benson: Continue BraineumAI Received");
      main_script = 1;
      teleport_macys = 0; // turn off teleports; back to main script.
      teleport_starbucks = 0; // turn off teleports; back to main script.
      clearInterval(intervalObj);
      intervalObj= setInterval(startBlockchainGame, 1500, "Start interval called");
      return;
    }

    if (usermsg.msg === "TeleportMacys") {
      if (main_script)
      {
          event_number_paused = event_number; // save our location only if in main_script.
      }
      event_number = 21; // start macy's stream.
      // event_number = 0; // blockchain version.
      teleport_macys = 1;
      main_script = 0;
      teleport_starbucks = 0;
      console.log("Hey Benson: TeleportMacys Received");
      clearInterval(intervalObj);
      intervalObj= setInterval(startBlockchainGame, 1500, "Start interval called");
      return;
    }

    if (usermsg.msg === "TeleportStarbucks") {
      if (main_script)
      {
          event_number_paused = event_number; // save our location only if in main_script.
      }
      event_number = 25; // start starbuck's stream.
      //event_number = 0; // blockchain version. 
      teleport_starbucks = 1;
      main_script = 0;
      teleport_macys = 0;
      clearInterval(intervalObj);
      intervalObj= setInterval(startBlockchainGame, 1500, "Start interval called");
      console.log("Hey Benson: TeleportStarbucks Received");
      return;
    }

	
	if (usermsg.msg === "TeleportBrooklynMuseum") 
	{
	      teleport_basics();
  	      turnOffFlags();
	      teleport_brooklyn_museum = 1;
	      console.log("Hey Benson: TeleportBrooklynMuseum Received");
	      return;
	}
	
	if (usermsg.msg === "TeleportRandomNew") 
	{
	      teleport_basics();
  	      turnOffFlags();
	      teleport_random_new = 1;
	      console.log("Hey Benson: TeleportRandomNew Received");
	      return;
	}
	
	
	if (usermsg.msg === "TeleportHome") 
	{
	      teleport_basics();
  	      turnOffFlags();
	      teleport_home = 1;
	      console.log("Hey Benson: TeleportHome Received");
	      return;
	}
	
	if (usermsg.msg === "TeleportGlobal") 
	{
	      teleport_basics();
  	      turnOffFlags();
	      teleport_global = 1;
	      console.log("Hey Benson: TeleportGlobal Received");
	      return;
	}
	
	if (usermsg.msg === "TeleportFriends") 
	{
	      teleport_basics();
  	      turnOffFlags();
	      teleport_friends = 1;
	      console.log("Hey Benson: TeleportFriends Received");
	      return;
	}
	
	if (usermsg.msg === "TeleportCities") 
	{
	      teleport_basics();
  	      turnOffFlags();
	      teleport_cities = 1;
	      console.log("Hey Benson: TeleportCities Received");
	      return;
	}
	
	if (usermsg.msg === "TeleportLiveEvent") 
	{
	      teleport_basics();
  	      turnOffFlags();
	      teleport_live_event = 1;
	      console.log("Hey Benson: TeleportLiveEvent Received");
	      return;
	}
	
	if (usermsg.msg === "TeleportFlatbushAvenue") 
	{
	      teleport_basics();
  	      turnOffFlags();
	      teleport_flatbush_ave = 1;
	      console.log("Hey Benson: TeleportFlatbushAve Received");
	      return;
	}
	
	if (usermsg.msg === "TeleportNews") 
	{
	      teleport_basics();
  	      turnOffFlags();
	      teleport_news = 1;
	      console.log("Hey Benson: TeleportNews Received");
	      return;
	}
	
	if (usermsg.msg === "TeleportSuggestions") 
	{
	      teleport_basics();
  	      turnOffFlags();
	      teleport_suggestions = 1;
	      console.log("Hey Benson: TeleportSuggestions Received");
	      return;
	}
	
	

    if (usermsg.msg === "PauseTeleport") {
      console.log("Hey Benson: PauseTeleport Received");
      clearInterval(intervalObj);
      return;
    }

    if (usermsg.msg === "ContinueTeleport") {
      console.log("Hey Benson: ContinueTeleport Received");
      clearInterval(intervalObj);
      intervalObj= setInterval(startBlockchainGame, 1500, "Start interval called");
      return;
    }

    if (usermsg.msg === "EndTeleport") {
      console.log("Hey Benson: EndTeleport Received");
      teleport_macys = 0; // turn it off.
      teleport_starbucks = 0; // turn it off.
      main_script = 1;
      event_number = event_number_paused; // reinstate location in main scene.
      clearInterval(intervalObj);
      intervalObj= setInterval(startBlockchainGame, 1500, "Start interval called");
      return;
    }

    if (usermsg.msg === "StartMiners") {
      miningOnFlag = 1;
      console.log("Hey Benson: Start Miners Received");
      shell.exec('/Users/benson/BRAINEUM_HACKATHON/dev/braineum/braineum/hack_src/run_miner_start_all.sh');
      return;
    }
  
    if (usermsg.msg === "StopMiners") {
      miningOnFlag = 0;
      console.log("Hey Benson: Stop Miners Received");
      shell.exec('/Users/benson/BRAINEUM_HACKATHON/dev/braineum/braineum/hack_src/run_miner_stop_all.sh');
      return;
    }   
      // REVISIT!! TO BE FIXED. broadcasting message to all connected clients
      //for(key in clients) {
        //clients[key].sendUTF(message.utf8Data);
        //console.log('sent Message to: ', clients[key]);
      //} 
    })
});

