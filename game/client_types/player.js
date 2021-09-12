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
            var trustData = {
                trust: msg.trust,
                name: msg.name
            }
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

        node.on('HTML-payoffDataRequest', function() {

            node.say('payoffDataRequest-LOGIC', 'SERVER');

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

        node.on.data('LOGIC-payoffData', function(msg) {

            let data = msg.data;

            node.game.talk('CLIENT: PAYOFF DATA RECEIVED FROM LOGIC')
            node.game.talk(data)

            node.emit('payoffData-HTML', data);

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

            node.game.doneButton.show();
            parent.scrollTo(0,0);
            W.cssRule('.choicetable-left, .choicetable-right ' +
            '{ width: 200px !important; }');

            W.cssRule('table.choicetable td { text-align: left !important; ' +
            'font-weight: normal; padding-left: 10px; }');

            W.setHeight(1300);

        },



        widget: {
            name: 'ChoiceManager',
            id: 'quiz',
            options: {
                mainText: 'Answer the following questions to check ' +
                'your understanding of the game.',
                forms: [
                    {
                        name: 'ChoiceTable',
                        id: 'tasks',
                        mainText: 'What are your tasks in this experiment?',
                        choices: [
                            'Only answer the multiple choice questions',
                            'Only play the previously described game.',
                            'Answer the multiple choice questions and player the game'
                        ],
                        correctChoice: 2,
                        orientation: 'v'
                    },
                    {
                        name: 'ChoiceTable',
                        id: 'tokenWorth',
                        mainText: 'You are endowed with 10 token for each game. ' +
                        'How much each token is worth?',
                        choices: [
                            '1 cent',
                            '10 cents',
                            '100 cents'
                        ],
                        correctChoice: 1,
                        orientation: 'v'
                    },
                    {
                        name: 'ChoiceTable',
                        id: 'gameOpponent',
                        mainText: 'Who do you play the game with?',
                        choices: [
                            'I play the game with an other player',
                            'I play the game with a computer',
                            'I play the game with a computer and an other player'
                        ],
                        correctChoice: 1,
                        orientation: 'v'
                    },
                    {
                        name: 'ChoiceTable',
                        id: 'trippledMoney',
                        mainText: 'What happens to the money you send to the other player?',
                        choices: [
                            'Nothing happens.',
                            'The money I send to the other player is doubled.',
                            'The money I send to the other player is trippled.'
                        ],
                        correctChoice: 2,
                        orientation: 'v'
                    },
                    {
                        name: 'ChoiceTable',
                        id: 'opponentDecision',
                        mainText: 'What does the computer opponent do after receiving the money',
                        choices: [
                            'The computer decides whether to accept or reject the money I send.',
                            'The computer does nothing',
                            'With a 50% chance, the computer returns back half of the money ' +
                            ' it receives and with a 50% chance, the computer returns nothing back.'
                        ],
                        correctChoice: 2,
                        orientation: 'v'
                    },
                    {
                        name: 'ChoiceTable',
                        id: 'hardQuestion1',
                        mainText: 'Assume you sent 10 tokens and the computer' +
                        ' decided to return half of it. How many tokens in total ' +
                        'do you have at the end?',
                        choices: [
                            '5 tokens',
                            '10 tokens',
                            '15 tokens'
                        ],
                        correctChoice: 2,
                        orientation: 'v'
                    },

                    {
                        name: 'ChoiceTable',
                        id: 'hardQuestion2',
                        mainText: 'Assume the computer returns half of the money it received.' +
                        'You have 13 tokens in total at the end. How many tokens ' +
                        'did you send to the computer?',
                        choices: [
                            '4 tokens',
                            '6 tokens',
                            '8 tokens'
                        ],
                        correctChoice: 1,
                        orientation: 'v'
                    },

                ],

                formsOptions: {
                shuffleChoices: true,
            },
            className: 'centered'
        }
    }

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
