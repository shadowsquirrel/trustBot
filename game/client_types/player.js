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
        this.visualRound = node.widgets.append('VisualRound', header, {
            displayModeNames: [
                'COUNT_UP_ROUNDS_TO_TOTAL'
            ],
        });
        this.visualTimer = node.widgets.append('VisualTimer', header, {
            hidden: true // Initially hidden.
        });
        this.doneButton = node.widgets.append('DoneButton', header);
        this.doneButton.hide();

        W.setRightPadding = function(val) {
            var myframe = W.gid('ng_mainframe');
            var myLength = val + 'px';
            myframe.style.paddingRight = myLength;
        };

        // Scrolls into view an element with a given id.
        W.scrollInto = function(id, opts) {
            var el;
            el = W.gid(id);
            if (!el) {
                console.log('Element not available: ' + id);
                return;
            }
            // Merge options with default.
            opts = opts || {};
            opts = {
                behavior: 'smooth' || opts.behavior,
                block: 'start' || opts.block
            };
            // TODO: this might fail in some browsers. Check.
            el.scrollIntoView(opts);
            // if (myDiv.scrollIntoView) {
            //     myDiv.scrollIntoView({
            //         behavior: 'smooth',
            //         block: 'end'
            //     });
            // }
        };

        W.setHeight = function(val) {
            var myframe = W.gid('ng_mainframe');
            var myHeight = val + 'px';
            myframe.style.minHeight = myHeight;
        };

        W.goUp = function(val) {
            if (val != undefined )  {
                W.setHeight(val);
            }
            var endDiv = W.gid('start');
            endDiv.scrollIntoView({behavior:'smooth'});
        };

        W.goDown = function(val) {
            if (val != undefined )  {
                W.setHeight(val);
            }
            var endDiv = W.gid('end');

            setTimeout(()=>{
                endDiv.scrollIntoView({behavior:'smooth'});
            }, 750)

        };

        // ---------------------------- //

        W.setRightPadding(125);

        W.setHeaderPosition('right');

        node.on('setHeight', function(val) {
            W.setHeight(val);
        });

        node.on('goUp', function(val) {
            W.goUp(val);
        });

        node.on('goDown', function(val) {
            W.goDown(val);
        });

        node.on('scrollTo', function(id, val) {

            if (val != undefined )  {
                W.setHeight(val);
            }

            this.talk('scroll into div ' + id)

            var targetDiv = W.gid(id);

            setTimeout(()=>{
                targetDiv.scrollIntoView({behavior:'smooth'});
            })


        })

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

        done: function() {

            // node.game.talk('EXPERIMENT STAGE - INSIDE DONE CALL BACK')

            // node.say('memorySave-LOGIC', 'SERVER');

        }

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
