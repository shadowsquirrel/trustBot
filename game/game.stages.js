/**
 * # Game stages definition file
 * Copyright(c) 2021 Can Celebi <cnelebi@gmail.com>
 * MIT Licensed
 *
 * Stages are defined using the stager API
 *
 * http://www.nodegame.org
 * ---
 */

module.exports = function(stager, settings) {

     stager
        .next('instructions')
        .next('quiz')
        .repeat('experiment', settings.ROUNDS)
        .next('survey1')
        .next('survey2')
        .next('results')
        .next('end')
        .gameover();

        stager.skip('instructions');
        stager.skip('quiz');
        // stager.skip('experiment');
        stager.skip('survey1');
        stager.skip('survey2');
        // stager.skip('results');
        // stager.skip('end');

};
