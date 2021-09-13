let payoff = {
    name: [],
    trust: [],
    trustWorthy: [],
    payoff: [],
}

let finalCalculatedPayoff = undefined;

let result = {}


result.compile = function(data) {

    for(var i = 0; i < data.length; i++) {

        payoff.name.push(data[i].name);
        payoff.trust.push(data[i].trust);
        payoff.trustWorthy.push(data[i].trustWorthy);
        payoff.payoff.push(data[i].payoff);

    }

}

result.generateParentDiv = function(index) {

    var parentName = 'frame-B-0-' + index;

    var string1 = '<div class=' + parentName + '></div>';

    var parent = $(string1);

    $('.frame-B-0').append(parent);

    parent.css({'display':'inline-block', 'text-align':'left', 'width':'950px',
    'font-size':'23px', 'font-weight':'100', 'padding-top':'20px', 'padding-bottom':'20px',
    'border-bottom':'1px solid'});

}

result.appendResult = function(index) {

    var parentName = '.frame-B-0-' + index;

    var tempName = payoff.name[index];
    var tempTrust = payoff.trust[index];
    var tempPayoff = payoff.payoff[index];
    var tempTrustWorthy = payoff.trustWorthy[index];

    if(tempTrust > 0) {

        var string1 = "<p>You sent <span class=bb>" + tempTrust +
        "</span> tokens to <span class=bb>" + tempName + "</span>.</p>";
        let div1 = $(string1);
        $(parentName).append(div1);

        if(tempTrustWorthy) {

            var string2 = "<p><span class=bb>" + tempName + "</span> decided to return half of the trippled " +
            "amount (" + (tempTrust * 3) + " tokens).</p>";
            let div2 = $(string2);
            $(parentName).append(div2);

            var string3 = "<p>You received <span class=bb>" + (tempTrust * 1.5)  +
            "</span> tokens back.</p>";
            let div3 = $(string3);
            $(parentName).append(div3);

            var string4 = "<p>Your <span class=bb>final payoff</span> from playing with " + tempName +
            " is <span class=bb>" + tempPayoff + "</span> tokens.</p>";
            let div4 = $(string4);
            $(parentName).append(div4);

        } else {

            var string2 = "<p><span class=bb>" + tempName + "</span> decided <span class=bb>NOT</span> to return any " +
            "tokens back to you.</p>";
            let div2 = $(string2);
            $(parentName).append(div2);

            var string4 = "<p>Your <span class=bb>final payoff</span> from playing with <span class=bb>"
            + tempName +
            "</span> is <span class=bb>" + tempPayoff + "</span> tokens.</p>";
            let div4 = $(string4);
            $(parentName).append(div4);

        }

    } else {

        var string1 = "<p>You did <span class=bb>NOT</span> send any tokens to <span class=bb>"
        + tempName + "</span>.</p>";
        let div1 = $(string1);
        $(parentName).append(div1);

        var string2 = "<p>Your <span class=bb>final payoff</span> from playing with <span class=bb>"
        + tempName +
        "</span> is <span class=bb>10</span> tokens.</p>";
        let div2 = $(string2);
        $(parentName).append(div2);

    }

}

result.calculateFinalTotalPayoff = function(myList) {

    var totalPayoff = 0;

    for(var i = 0; i < myList.length; i++) {

        totalPayoff = totalPayoff + payoff.payoff[i];

    }

    $('#finalTotalPayoff').html(totalPayoff);

    finalCalculatedPayoff = totalPayoff;

}

result.generate = function(myPayoffList) {

    result.compile(myPayoffList);

    for(var i = 0; i < myPayoffList.length; i++) {
        result.generateParentDiv(i);
        result.appendResult(i);
    }

    result.calculateFinalTotalPayoff(myPayoffList);

}
