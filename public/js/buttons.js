
// race buttons
var raceDecisionList = ['white', 'black', 'hispanic', 'asian', 'other'];

raceDecisionList.forEach(i => {

    var string = '#' + i;

    $(string).click(function() {

        decision.race = i;

        console.log('race decision: ' + decision.race);

        question.next();

    });

});


// trust buttons
var trustDecisionList = [0,1,2,3,4,5,6,7,8,9,10];

trustDecisionList.forEach(i => {

    var string = '#' + i;

    $(string).click(function() {

        decision.trust = i;

        console.log('trust decision: ' + decision.trust);

        question.next();

    });

});


// party buttons
var partyDecisionList = ['democrat', 'republican'];

partyDecisionList.forEach(i => {

    var string = '#' + i;

    $(string).click(function() {

        decision.party = i;

        console.log('party decision: ' + decision.party);

        question.next();

    });

});


// education buttons
var educationDecisionList = ['primarySchool', 'highSchool', 'bachelor', 'master', 'phd'];

educationDecisionList.forEach(i => {

    var string = '#' + i;

    $(string).click(function() {

        decision.education = i;

        console.log('education decision: ' + decision.education);

        question.next();

    });

});


// age buttons
var ageDecisionList = [
    '18-24', '25-29', '30-34', '35-39', '40-44', '45-49',
    '50-54', '55-59', '60plus'
];

ageDecisionList.forEach(i => {

    var string = '#' + i;

    $(string).click(function() {

        decision.age = i;

        console.log('age decision: ' + decision.age);

        question.next();

    });

});





// --------------- //


$('.game').hover(
    function() {
        $('.hiddenGameInfo').css({'transition':'0.25s', 'z-index':'1',
        'opacity':'1'});
    },
    function() {
        $('.hiddenGameInfo').css({'transition':'0.25s', 'z-index':'-1',
        'opacity':'0'});
    }
)
