// Implement a queue for the commands
function Queue() {
  this.commands = [];
}
// Add a command to the queue
Queue.prototype.enqueue = function (cmd) {
  this.commands.push(cmd);
};

// Remove all comdands from queue
Queue.prototype.clear = function () {
  this.commands = [];
};

// Remove a command from the queue
Queue.prototype.dequeue = function () {
  // remove the first command
  return this.commands.shift();
};

// Check if the queue is empty
Queue.prototype.isEmpty = function () {
  return this.commands.length === 0;
};
// Peek the first command in queue
Queue.prototype.peek = function () {
  return !this.isEmpty() ? this.commands[0] : undefined;
}

// Display all the items in queue
function printQueue()
{
  var str = "";
  for (var i = 0; i < this.items.length; i++)
    str += this.items[i] + " ";
  return str;
}

// This queue is for the table
var q = new Queue();
// This queue is to send the commands to the car
var qCommands = new Queue();

// Enqueue to queue 
$(document).ready(function () {
  $("#up").click(up);
  $("#down").click(down);
  $("#left").click(left);
  $("#right").click(right);
  $("#rotate").click(rotate);
  $("#black_tiles").click(black_tiles);
  $("#stars").click(star);
  $("#stop").click(stop);
});

//When up button is click, store W in queue
function up() {
  // console.log("up");
  q.enqueue("W");
  qCommands.enqueue("W");
  // console.log(q.commands);
  data = convertToString();
  getCommands(data);
  q.clear();
};

// when down button is click, store S in queue
function down() {
  // console.log("down");
  q.enqueue("S");
  qCommands.enqueue("S");
  data = convertToString();
  getCommands(data);
  q.clear();
};

// when left button is click, store A in queue
function left() {
  // console.log("left");
  q.enqueue("A");
  qCommands.enqueue("A");
  // console.log(q.commands);
  data = convertToString();
  getCommands(data);
  q.clear();
};

// when right button is click, store D in queue
function right() {
  // console.log("right");
  q.enqueue("D");
  qCommands.enqueue("D");
  // console.log(q.commands);
  data = convertToString();
  getCommands(data);
  q.clear();
};

// when rotate button is click, store R in queue
function rotate() {
  // console.log("rotate");
  q.enqueue("R");
  qCommands.enqueue("R");
  // console.log(q.commands);
  data = convertToString();
  getCommands(data);
  q.clear();
};

// Wehn black tiles button is click, store B in queue
function black_tiles() {
  console.log("black_tiles");
  q.enqueue("B");
  qCommands.enqueue("B");
  console.log(q.commands);
}

// When star is click, store * in queue
function star() {
  console.log("star");
  q.enqueue("*");
  qCommands.enqueue("*");
  console.log(q.commands);
}

// When stop is click, store T in queue
function stop() {
  //console.log("stop");
  q.commands.enqueue("T");
  // console.log(q.commands);
}

// Convert  the queue into string datatype
function convertToString() {
  var json = JSON.stringify(q.commands);
  // console.log(json);
  return json;
}

// var table = document.getElementById('tableCommands'), rowIndex;
var row = 0;

//using ajax to get the commands from queues when it GET to the server
function getCommands(data) {
  var queue = data;
  // console.log(data);
  $.ajax({
    type: "POST",
    url: "/getCommands",
    data: {
      queue: queue
    },
    success: function (commands) {
      for (var i = 0; i < commands.length; i++) {
        row++;
        switch (commands[i]) {
          case "W":
            console.log("up");
            $("#tableCommands").append("<tr><td>" + "</td>" +"<td>" + row + "</td>" +  "<td>" + "Forward" + "</td></tr>");
            break;
          case "S":
            console.log("down");
            $("#tableCommands").append("<tr><td>" + "</td>" +"<td>" + row + "</td>" +  "<td>" + "Backward" + "</td></tr>");
            break;
          case "A":
            console.log("left");
            $("#tableCommands").append("<tr><td>" + "</td>" +"<td>" + row + "</td>" +  "<td>" + "Left" + "</td></tr>");
            break;
          case "D":
            console.log("right");
            $("#tableCommands").append("<tr><td>" + "</td>" +"<td>" + row + "</td>" +  "<td>" + "Right" + "</td></tr>");
            break;
          case "R":
            console.log("rotate");
            $("#tableCommands").append("<tr><td>" + "</td>" +"<td>" + row + "</td>" +  "<td>" + "Rotate" + "</td></tr>");
            break;
          default:
            break;
        }
        //$("#tableCommands").append("<tr><td>" + "</td>" +"<td>" + row + "</td>" +  "<td>" + commands[i] + "</td></tr>");
      }
    }
  });
}

/* TODO:Delete Queue Commands from the queue commands*/