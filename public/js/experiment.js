
window.onload = function() {


    var node = parent.node;


    node.on('playerData-HTML', function(msg) {

        console.log('');
        console.log('DATA RECEIVED FROM CLIENT');
        console.log(msg);
        console.log('');

        name.active = msg.activeName;
        address.active = msg.activeAddress;
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
