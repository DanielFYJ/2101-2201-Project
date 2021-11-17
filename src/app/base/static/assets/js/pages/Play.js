/* This file will created 2 queue. One is used to insert to the basic table and the other is used to send the commands to the robor over the socket. */

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

// Remove a command from the queue based on index
Queue.prototype.removebyIndex = function (index) {
  this.commands.splice(index, 1);
}

// Check if the queue is empty
Queue.prototype.isEmpty = function () {
  return this.commands.length === 0;
};
// Peek the first command in queue
Queue.prototype.peek = function () {
  return !this.isEmpty() ? this.commands[0] : undefined;
}

// Display all the items in queue
function printQueue() {
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
  q.enqueue("B");
  qCommands.enqueue("B");
  data = convertToString();
  getCommands(data);
  q.clear();
}

// When star is click, store * in queue
function star() {
  q.enqueue("*");
  qCommands.enqueue("*");
  data = convertToString();
  getCommands(data);
  q.clear();
}

/* TODO: Submit the stop command directly to the server */
function stop() { }

// Convert  the queue into string datatype
function convertToString() {
  var json = JSON.stringify(q.commands);
  return json;
}

//using ajax to get the commands from queues when it GET to the server
function getCommands(data) {
  var queue = data;
  $.ajax({
    type: "POST",
    url: "/getCommands",
    data: {
      queue: queue
    },
    success: function (commands) {
      for (var i = 0; i < commands.length; i++) {
        switch (commands[i]) {
          case "W":
            console.log("up");
            $("#tableCommands").append("<tr><td>" + "<input type=\"checkbox\" aria-label=\"Checkbox to select following commands\" name=\"record\">" + "</td>" + "<td>" + "</td>" + "<td>" + "Forward" + "</td></tr>");
            addNo();
            break;
          case "S":
            console.log("down");
            $("#tableCommands").append("<tr><td>" + "<input type=\"checkbox\" aria-label=\"Checkbox to select following commands\" name=\"record\">" + "</td>" + "<td>" + "</td>" + "<td>" + "Backward" + "</td></tr>");
            addNo();
            break;
          case "A":
            console.log("left");
            $("#tableCommands").append("<tr><td>" + "<input type=\"checkbox\" aria-label=\"Checkbox to select following commands\" name=\"record\">" + "</td>" + "<td>" + "</td>" + "<td>" + "Left" + "</td></tr>");
            addNo();
            break;
          case "D":
            console.log("right");
            $("#tableCommands").append("<tr><td>" + "<input type=\"checkbox\" aria-label=\"Checkbox to select following commands\" name=\"record\">" + "</td>" + "<td>" + "</td>" + "<td>" + "Right" + "</td></tr>");
            addNo();
            break;
          case "R":
            console.log("rotate");
            $("#tableCommands").append("<tr><td>" + "<input type=\"checkbox\" aria-label=\"Checkbox to select following commands\" name=\"record\">" + "</td>" + "<td>" + "</td>" + "<td>" + "Rotate" + "</td></tr>");
            addNo();
            break;
          case "B":
            console.log("black_tiles");
            $("#tableCommands").append("<tr><td>" + "<input type=\"checkbox\" aria-label=\"Checkbox to select following commands\" name=\"record\">" + "</td>" + "<td>" + "</td>" + "<td>" + "When On black tiles" + "</td></tr>");
            addNo();
            break;
          case "*":
            console.log("star");
            $("#tableCommands").append("<tr><td>" + "<input type=\"checkbox\" aria-label=\"Checkbox to select following commands\" name=\"record\">" + "</td>" + "<td>" + "</td>" + "<td>" + "When " + "<i class=\"fas fa-star\"></i> " + " On Black Tiles" + "</td></tr>");
            addNo();
            break;
          default:
            break;
        }
        //$("#tableCommands").append("<tr><td>" +  +"</td>" +"<td>" + row + "</td>" +  "<td>" + commands[i] + "</td></tr>");
      }
    }
  });
}

// Delete  row in  table
$("#deleteQueue").click(function () {
  $("table tbody").find('input[name="record"]').each(function () {
    if ($(this).is(":checked")) {
      // Extract the row index
      var row = $(this).closest("tr").index();
      //console.log(row);
      qCommands.removebyIndex(row);
      console.log(qCommands.commands);
      $(this).parents("tr").remove();
    }
  });
  addNo();
});

// Add serial number to table
function addNo() {
  var table = document.getElementById('tableCommands');
  for (var i = 1, row; row = table.rows[i]; i++) {
    row.cells[1].innerHTML = i;
  }
}