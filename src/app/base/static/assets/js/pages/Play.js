// Implement a queue for the commands
function Queue() {
this.commands = [];
}
// Add a command to the queue
Queue.prototype.enqueue = function(cmd) {
    this.commands.push(cmd);
};

// Remove a command from the queue
Queue.prototype.dequeue = function() {
    // remove the first command
    return this.commands.shift();
};

// Check if the queue is empty
Queue.prototype.isEmpty = function() {
    return this.commands.length === 0;
};
  // Peek the first command in queue
Queue.prototype.peek = function() {
    return !this.isEmpty() ? this.commands[0] : undefined;
}


let q = new Queue();

// Enqueue to queue 
$(document).ready(function() {
    $("#up").click(up);
    $("#down").click(down);
    $("#left").click(left);
    $("#right").click(right);
    $("#rotate").click(rotate);
    $("#black_tiles").click(black_tiles);
    $("#star").click(star);
    $("#stop").click(stop);
});

//When up button is click, store W in queue
function up() {
    console.log("up");
    q.enqueue("W");
    console.log(q.commands);
};

// when down button is click, store S in queue
function down() {
    console.log("down");
    q.enqueue("S");
    console.log(q.commands);
    console.log(q.peek());
};

// when left button is click, store A in queue
function left() {
    console.log("left");
    q.enqueue("A");
    console.log(q.commands);
};

// when right button is click, store D in queue
function right() {
    console.log("right");
    q.enqueue("D");
    console.log(q.commands);
};

// when rotate button is click, store R in queue
function rotate() {
    console.log("rotate");
    q.enqueue("R");
    console.log(q.commands);
};


// Wehn black tiles button is click, store B in queue
function black_tiles() {
    console.log("black_tiles");
    q.enqueue("B");
    console.log(q.commands);
}

// When star is click, store * in queue
function star() {
    console.log("star");
    q.enqueue("*");
    console.log(q.commands);
}

// When stop is click, store T in queue
function stop() {
    console.log("stop");
    q.enqueue("T");
    console.log(q.commands);
}


