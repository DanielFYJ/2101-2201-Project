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
    
    // $('.left').mousedown(function() {
    //   $('.left').css('transform', 'translate(0, 2px)');
    // });
    
    // $('.left').mouseup(function() {
    //   $('.left').css('transform', 'translate(0, 0)');
    // });
  
    // $('.right').mousedown(function() {
    //   $('.right').css('transform', 'translate(0, 2px)');
    // });
    
    // $('.right').mouseup(function() {
    //   $('.righttext').text('');
    //   $('.right').css('transform', 'translate(0, 0)');
    // });
    
    // $('.up').mousedown(function() {
    //   $('.up').css('transform', 'translate(0, 2px)');
    // });
    
    // $('.up').mouseup(function() {
    //   $('.up').css('transform', 'translate(0, 0)');
    // });
  
    // $('.rotate').mousedown(function() {
    //   $('.rotate').css('transform', 'translate(0, 2px)');
    // });
    
    // $('.rotate').mouseup(function() {
    //   $('.rotate').css('transform', 'translate(0, 0)');
    // });
    
    // $('.down').mousedown(function() {
    //   $('.down').css('transform', 'translate(0, 2px)');
    // });
    
    // $('.down').mouseup(function() {
    //   $('.down').css('transform', 'translate(0, 0)');
    // });
  
    // $('.star').mousedown(function() {
    //   $('.star').css('transform', 'translate(0, 2px)');
    // });
    
    // $('.star').mouseup(function() {
    //   $('.star').css('transform', 'translate(0, 0)');
    // });
  
    // $('.nostar').mousedown(function() {
    //   $('.nostar').css('transform', 'translate(0, 2px)');
    // });
    
    // $('.nostar').mouseup(function() {
    //   $('.nostar').css('transform', 'translate(0, 0)');
    // });
    