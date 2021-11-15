
// debug data
// debug data
// let payoffList = [
//     {
//         name:'AHMED JAMAL',
//         trust:5,
//         trustWorthy:true,
//         payoff:12.5
//     },
//     {
//         name:'BILL EVANS',
//         trust:0,
//         trustWorthy:false,
//         payoff:10
//     },
//     {
//         name:'MILES DAVIS',
//         trust:3,
//         trustWorthy:false,
//         payoff:7
//     },
//     {
//         name:'AHMED JAMAL',
//         trust:5,
//         trustWorthy:true,
//         payoff:12.5
//     },
//     {
//         name:'BILL EVANS',
//         trust:0,
//         trustWorthy:false,
//         payoff:10
//     },
//     {
//         name:'MILES DAVIS',
//         trust:3,
//         trustWorthy:false,
//         payoff:7
//     }
// ];


window.onload = function() {

    var node = parent.node;


    node.on('payoffData-HTML', function(msg) {

        console.log('');
        console.log('PAYOFF DATA RECEIVED FROM CLIENT');
        console.log(msg);
        console.log('');

        let payoffList = msg;

        result.generate(payoffList);

    })

    node.emit('HTML-payoffDataRequest');


    $('#doneWithResults').click(function() {

        var myFinalPayoff = finalCalculatedPayoff;

        node.emit('HTML-reportFinalPayoff', myFinalPayoff);

    })


}
