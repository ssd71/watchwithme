
'use strict'

var fileInput = document.getElementById("fileinput");
var startButton = document.getElementById("startButton");
var peerid = document.getElementById("peerid");
var myid = document.getElementById("myid");
var readytext = document.getElementById("readytext");
var fileloaded = false,
haveid = false,
playing = false;
var myPlayer = videojs('my-video');
let peer,
conn;

fileInput.onchange = () => {
  console.log("fileinput onchange");
  fileloaded = true;
  peer = new Peer();
  peer.on('open', (id) => {
    console.log("peerjs started with id "+ id);
    myid.textContent = id;
  });
  peer.on('connection', handleincoming);
  if (fileloaded && haveid) {
    startButton.disabled = false;
  }
};

peerid.oninput = () => {
  console.log("peerid on input");
  haveid = true;
  if (fileloaded && haveid) {
    startButton.disabled = false;
  }
};

function readyPlayer() {
  var filename = fileInput.files[0].name;
  var fileUrl = URL.createObjectURL(fileInput.files[0]);
  var fileType = fileInput.files[0].type;
  console.log(filename);
  myPlayer.src({ type: fileType, src: fileUrl });
  myPlayer.load();
  myPlayer.on("play", () => conn.send("PLAY"));
  myPlayer.on("pause", () => conn.send("PAUSE"));
  readytext.textContent = "Press play to start!"
}

startButton.addEventListener('click', function () {
  // ready
  console.log("connecting to "+ peerid.value);
  conn = peer.connect(peerid.value);
  conn.on("open", () => console.log("connection now open"));
  conn.on("data", onData);
  conn.send("READY");
  readyPlayer();
});

function handleincoming(con) {
  conn = con;
  readyPlayer();
  conn.on("open", () => {
    console.log("incoming connection");

    conn.on("data", onData);
  });

}

function onData(data) {
  console.log("got data "+data);
  if (data == "READY") {
    if (myPlayer.readyState() == 0){
      readyPlayer();
      conn.send("READY");
    }
  } else if (data == "PLAY") {
    if (!playing) {
      myPlayer.play();
      playing = true;
    }
  } else if (data == "PAUSE"){
    if (playing) {
      myPlayer.pause();
      playing = false;
    }
  }
}
