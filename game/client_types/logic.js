/**
 * # Logic type implementation of the game stages
 * Copyright(c) 2021 Can Celebi <cnelebi@gmail.com>
 * MIT Licensed
 *
 * http://www.nodegame.org
 * ---
 */

"use strict";

const ngc = require('nodegame-client');
const J = ngc.JSUS;

module.exports = function(treatmentName, settings, stager, setup, gameRoom) {

    let node = gameRoom.node;
    let channel = gameRoom.channel;
    let memory = node.game.memory;

    // Make the logic independent from players position in the game.
    stager.setDefaultStepRule(ngc.stepRules.SOLO);

    // Must implement the stages here.

    stager.setOnInit(function() {

        // Feedback.
        memory.view('feedback').save('feedback.csv', {
            header: [ 'time', 'timestamp', 'player', 'feedback' ],
            keepUpdated: true
        });

        // Email.
        memory.view('email').save('email.csv', {
            header: [ 'timestamp', 'player', 'email' ],
            keepUpdated: true
        });

        //-------- SOME DEBUG METHODS --------//

        // Identifies the player in the console
        node.game.showPlayer = function(player) {
            console.log();
            console.log('Player ' + player.count);
        };

        // Enables logging to console from player.js
        node.on.data('debug', function(msg) {
            let player = node.game.pl.get(msg.from);
            node.game.showPlayer(player);
            console.log(msg.data);
        });


        // ------------------- //


        node.game.nameList = [
            ['AHMED JAMAL', '240 Holcom Road'],
            ['BILL EVANS', '4150 Arkweright Road'],
            ['MILES DAVIS', '1592 Burton Avenue'],
            ['DUKE ELLINGTON', '526 Edgefield Way'],
            ['JOHN COLTRANE', '11792 Browntown Road'],
            ['THELONIOUS MONK', '304 Pitt Moore Road'],
            ['HERBIE HANCOCK', '16 Greenbriar Drive'],
            ['DAVE BRUBECK', '7322 Garfield Street']
        ]


        // treatments
        //
        // -1: no name / no priming
        //  0: name / no priming
        //  1: name / race priming
        //  2: name / party priming
        //
        node.game.treatment = -1;


        // initializing the player
        //
        // - shuffledNameList
        // - activeNameIndex = 0
        // - trustDecisionList = []
        //
        node.game.initPlayer = function() {

            console.log();
            console.log();
            console.log('PLAYER DATA IS INITIATED');

            node.game.pl.each(function(player) {

                if(!player.initiated) {

                    player.initiated = true;

                    player.shuffledNameList = J.shuffle(node.game.nameList);

                    player.activeNameIndex = 0;

                    player.trustDecisionList = [];

                    console.log();
                    console.log('Player ' + player.id + ' is initiated');
                    console.log(' player\'s shuffled name list is: '
                    + player.shuffledNameList);
                    console.log(' player\'s intial active name index: '
                    + player.activeNameIndex);

                } else {
                    console.log('PLAYER ALREADY INITIATED');
                }

            });

        }


        // listener to send (initial) data to the client
        node.on.data('playerData-LOGIC', function(msg) {

            node.game.initPlayer();

            let player = node.game.pl.get(msg.from);

            console.log();
            console.log();
            console.log('LOGIC: PLAYER ' + player.id + ' requested data.');

            console.log('ACTIVE NAME INDEX: ' + player.activeNameIndex);

            console.log('ACTIVE ARRAY: ' + player.shuffledNameList[player.activeNameIndex]);


            let activeName =  player.shuffledNameList[player.activeNameIndex][0];
            let activeAddress = player.shuffledNameList[player.activeNameIndex][1];
            let treatment = node.game.treatment;


            console.log('ACTIVE NAME: ' + activeName);
            console.log('ACTIVE ADDRESS: ' + activeAddress);
            console.log('TREATMENT: ' + treatment);
            console.log();

            let data = {
                activeName: activeName,
                activeAddress: activeAddress,
                treatment: treatment
            }

            node.say('LOGIC-playerData', player.id, data);

            player.activeNameIndex++;

            console.log();
            console.log('INCREMENTING ACTIVE NAME INDEX FOR THE NEXT ' +
            ' NAME TO BE SENT');
            console.log('NEXT ACTIVE NAME INDEX TO BE USED: ' +
            player.activeNameIndex);
            console.log();


            if(player.activeNameIndex >= 8) {

                console.log();
                console.log('WARNING! NO MORE NAMES TO BE SENT.');
                console.log('THIS IS THE FINAL ROUND OF THE EXPERIMENT STAGE');
                console.log();

            }


        })


        // listener to store player's trust decision to be used for final payment
        node.on.data('trustDecision-LOGIC', function(msg) {

            let player = node.game.pl.get(msg.from);

            let trustDecision = msg.data;

            player.trustDecisionList.push(trustDecision);

            console.log();
            console.log('LOGIC: TRUST DECISION ' + trustDecision +' OF PLAYER '
            + player.id + ' IS RECORDED TO ITS TRUST DECISION LIST');
            console.log(player.trustDecisionList);
            console.log();

        })


        // listener to be triggered by client side to save memory at the end of
        // every round
        // node.on.data('memorySave-LOGIC', function() {
        //
        //     console.log('LOGIC: inside memory save listener');
        //
        //     memory.save('decision.csv', {
        //
        //         header: [
        //             'player',
        //             'treatment',
        //             'name',
        //             'race',
        //             'party',
        //             'trust',
        //             'education',
        //             'age'
        //         ],
        //
        //         updatesOnly: true,
        //
        //     })
        //
        // })

        memory.view('name').save('decision.csv', {

            header: [
                'player',
                'treatment',
                'name',
                'race',
                'party',
                'trust',
                'education',
                'age'
            ],

            keepUpdated: true,

        })

        // TO DO: function to calculate payoff for each trust decision
        // then use those decisions to calculate the final payoff for the
        // trust games.


        node.game.initPlayer();

    });


    stager.setOnGameOver(function() {
        // Something to do.
    });
};
