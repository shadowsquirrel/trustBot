
var order = {};

order.index = undefined;

order.racePrime = [
    'Race',
    'Trust',
    'Party',
    'Education',
    'Age'
];

order.partyPrime = [
    'Party',
    'Trust',
    'Race',
    'Education',
    'Age'
];

order.noPrime = [
    'Trust',
    'Party',
    'Race',
    'Education',
    'Age'
];


order.set = function() {

    if(treatment === 0 || treatment === -1) {
        order.active = order.noPrime;
    }

    if(treatment === 1) {
        order.active = order.racePrime;
    }

    if(treatment === 2) {
        order.active = order.partyPrime;
    }

}
