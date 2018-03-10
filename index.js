// Connect to the server
let address = "https://server-djwxqxfveu.now.sh";
let socket = io(address);

socket.on("connect", () => socket.emit('newPlayer'));
socket.on("state", render);

// Render the Game
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

function render(players) {
  // Clear prior frame
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw players
  ctx.fillStyle = "red";
  for (id in players) {
    let player = players[id];
    ctx.fillRect(player.x, player.y, 50, 50);
  }
}

// Movement
let movement = {
  up: false,
  left: false,
  right: false,
  down: false
}

function broadcastMovement() {
  socket.emit("movement", movement);
}

// Controls

const keymap = {
  87: "up",
  65: "left",
  83: "down",
  68: "right"
};

function keydown(event) {
  const direction = keymap[event.keyCode];
  if (direction) movement[direction] = true;
}

function keyup(event) {
  const direction = keymap[event.keyCode];
  if (direction) movement[direction] = false;
}

window.addEventListener("keydown", keydown);
window.addEventListener("keyup", keyup);

setInterval(broadcastMovement, 1000 / 60);
