// to be received by client.js

// to be defined in logic and used in logic to identify the active name
// name.list = [
//     'AHMED JAMAL',
//     'BILL EVANS',
//     'MILES DAVIS',
//     'DUKE ELLINGTON',
//     'JOHN COLTRANE',
//     'THELONIOUS MONK',
//     'HERBIE HANCOCK',
//     'DAVE BRUBECK'
// ]

// to be updated in logic and used in logic to identify the active name
// name.index = 0;

// to be determined in logic and send to here as a message
// name.active = name.list[name.index];

// to be defined in logic and passed it on to here
// treatment = 0;

// in sum we need to send a message with treatment and name.active
// as the only two data values to be used in html

window.onload = function() {

    var node = parent.node;

    node.on('playerData-HTML', function(msg) {

        console.log('');
        console.log('DATA RECEIVED FROM CLIENT');
        console.log(msg);
        console.log('');

        name.active = msg.activeName;
        treatment = msg.treatment;

        experiment.generate();

    })

    node.emit('HTML-playerData');





    // ----------------------- //
    // ---- SAVE DECISION ---- //
    // ----------------------- //

    decision.save = function() {

        decision.name = name.active;
        decision.treatment = treatment;

        console.log('decision of the player');
        console.log(decision);

        $('.all').css({'transition':'0.5s', 'opacity':'0'});

        // send the decision to client to save
        node.emit('HTML-decision', decision);

    }


}
