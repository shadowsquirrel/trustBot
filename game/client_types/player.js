/**
* # Player type implementation of the game stages
* Copyright(c) 2021 Can Celebi <cnelebi@gmail.com>
* MIT Licensed
*
* Each client type must extend / implement the stages defined in `game.stages`.
* Upon connection each client is assigned a client type and it is automatically
* setup with it.
*
* http://www.nodegame.org
* ---
*/

"use strict";

const ngc = require('nodegame-client');

module.exports = function(treatmentName, settings, stager, setup, gameRoom) {

    // Make the player step through the steps without waiting for other players.
    stager.setDefaultStepRule(ngc.stepRules.SOLO);

    stager.setOnInit(function() {

        // Initialize the client.

        var header;

        // Setup page: header + frame.
        header = W.generateHeader();
        W.generateFrame();

        // Add widgets.
        this.visuaStage = node.widgets.append('VisualStage', header);
        this.visualRound = node.widgets.append('VisualRound', header);
        this.visualTimer = node.widgets.append('VisualTimer', header, {
            hidden: true // Initially hidden.
        });
        this.doneButton = node.widgets.append('DoneButton', header, {
            hidden: true // Initially hidden.
        });

        // No need to show the wait for other players screen in single-player
        // games.
        W.init({ waitScreen: false });

        // for debug
        this.talk = function(msg){
            node.say('debug', 'SERVER', msg);
        };

        // ------------------------------------------------------------------ //
        // -   - -   - -   - -   - -   - -   - -   - -   - -   - -   - -   -  //
        // ------------------------------------------------------------------ //
        // -   - -   - -   - -   - -   - -   - -   - -   - -   - -   - -   -  //
        // --------------------------  HIGHWAY  ----------------------------- //
        // -   - -   - -   - -   - -   - -   - -   - -   - -   - -   - -   -  //
        // ------------------------------------------------------------------ //
        // -   - -   - -   - -   - -   - -   - -   - -   - -   - -   - -   -  //
        // ------------------------------------------------------------------ //

        // ------------------------------------------------------------------ //
        // ------------------------------------------------------------------ //
        // -------------------                          --------------------- //
        // -------------------      HTML --> CLIENT     --------------------- //
        // -------------------                          --------------------- //
        // ------------------------------------------------------------------ //
        // ------------------------------------------------------------------ //

        // receiving player's decision from html, storing the decision and
        // ending the stage
        // sending trust decision to logic to be stored for payoff stage
        node.on('HTML-decision', function(msg) {

            node.game.talk('CLIENT SIDE: DECISION DATA IS RECEIVED FROM HTML')
            node.game.talk(msg)

            node.game.talk('CLIENT SIDE: SENDING TRUST DECISION ' + msg.trust
            +' TO LOGIC')

            // -------------------------------------------- //
            // -----------  CLIENT --> LOGIC  ------------- //
            // -------------------------------------------- //
            node.say('trustDecision-LOGIC', 'SERVER', msg.trust)


            node.game.talk('CLIENT SIDE: ENDING ROUND -> NODE.DONE & SAVE')

            node.done({
                treatment: msg.treatment,
                name: msg.name,
                race: msg.race,
                party: msg.party,
                trust: msg.trust,
                education: msg.education,
                age: msg.age
            })

        })


        // ------------------------------------------------------------------ //
        // ------------------------------------------------------------------ //
        // -------------------                          --------------------- //
        // -------------------      LOGIC --> HTML      --------------------- //
        // -------------------                          --------------------- //
        // ------------------------------------------------------------------ //
        // ------------------------------------------------------------------ //

        // receiving player's data from logic and sending it to html
        node.on.data('LOGIC-playerData', function(msg) {

            let data = msg.data;

            node.game.talk('CLIENT: DATA RECEIVED FROM LOGIC')
            node.game.talk(data)

            node.emit('playerData-HTML', data);

        })


        // ------------------------------------------------------------------ //
        // ------------------------------------------------------------------ //
        // -------------------                          --------------------- //
        // -------------------      HTML --> LOGIC      --------------------- //
        // -------------------                          --------------------- //
        // ------------------------------------------------------------------ //
        // ------------------------------------------------------------------ //


        // receiving signal from html to request player's data from logic
        node.on('HTML-playerData', function() {

            this.talk('CLIENT: HTML REQUESTING PLAYER DATA');

            node.say('playerData-LOGIC', 'SERVER');

        })


    });

    stager.extendStep('instructions', {

        frame: 'instructions.htm',

        cb: function() {

        }

    });

    stager.extendStep('quiz', {

        cb: function() {

        },

    });

    stager.extendStep('experiment', {

        frame: 'experiment.htm',

        cb: function() {

            var round  = node.game.getRound();
            node.game.talk('Experiment Stage - Round ' + round);

        },

    });

    stager.extendStep('survey1', {

        frame: 'survey1.htm',

        cb: function() {

        }

    });

    stager.extendStep('survey2', {

        frame: 'survey2.htm',

        cb: function() {

        }

    });

    stager.extendStep('results', {

        frame: 'game.htm',

        cb: function() {

        }

    });

    stager.extendStep('end', {

        widget: 'EndScreen',

        init: function() {

            node.game.visualTimer.destroy();
            node.game.doneButton.destroy();

        }

    });
};
