
// -------------------- //
// ------ GLOBALS ----- //
// -------------------- //

let main = {};
let name = {};
let icon = {};
let question = {};
let experiment = {};

let decision = {};


// ------------------ //

let treatment = undefined;


// --------------------- //
// ------- NAME -------- //
// --------------------- //

name.list = undefined;
name.active = undefined;
name.index = undefined;
name.isDisplayed = undefined;

name.set = function() {

    main.transition();

    if(name.isDisplayed) {

        setTimeout(()=>{
            $('#botName, #botName2').html(name.active);
        }, 550)

    } else {

        setTimeout(()=>{
            $('#botName, #botName2').html('');
        }, 550)

    }


}

// helper to name.set(): transition between different names
main.transition = function() {

    $('.all').css({'transition':'0.5s', 'opacity':'0'});
    setTimeout(()=>{
        $('.all').css({'transition':'1s', 'opacity':'1'});
    }, 1000)

}


// ------------------ //
// ------ ICON ------ //
// ------------------ //

icon.isHidden = true;

icon.hide = function() {

    if(!icon.isHidden) {

        icon.isHidden = true;

        question.transition();

        setTimeout(()=>{
            $('.frame-A-0').css({'transition':'0.75s',
            'margin-top': '-125px', 'margin-bottom':'65px'});
            $('.frame-A-0-0').css({'transition':'0.5s', 'opacity':'0'});
        }, 0)

    }

}

icon.show = function() {

    if(icon.isHidden) {

        icon.isHidden = false;

        question.transition();

        setTimeout(()=>{
            $('.frame-A-0').css({'transition':'1.25s',
            'margin-top': '0px', 'margin-bottom':'0px'});
        }, 500)

        setTimeout(()=>{
            $('.frame-A-0-0').css({'transition':'0.75s', 'opacity':'1'});
        }, 1000)

    }

}

icon.set = function(mode) {

    var myString = 'images/';

    if(mode === 'laptop') {
        myString = myString + 'pureComputer2.png';
    }

    if(mode === 'humanBot') {
        myString = myString + 'humanComputer.png';
    }

    $('.humanComputer').attr('src', myString);

}


// ------------------ //
// ---- QUESTION ---- //
// ------------------ //

question.previous = undefined;
question.active = undefined;

question.first = function() {

    question.active = order.active[order.index];

    console.log('');
    console.log('active question is: ' + question.active);

    if(treatment > 0) {

        icon.hide();

    } else {

        icon.show();

    }

    question.switch('Age', question.active);

}

question.next = function() {

    if(order.index < 4) {

        order.index++;

        question.previous = question.active;
        question.active = order.active[order.index];

        console.log('');
        console.log('active question is: ' + question.active);

        question.switch(question.previous, question.active);

        // for baseline -1 treatment no name is shown in the trust game
        // but for the rest of the question the name is displayed
        if(treatment === -1) {

            if(question.active != 'Trust') {

                name.isDisplayed = true;

                name.set();

            } else {

                name.isDisplayed = false;

                name.set();

            }

        }

    } else {

        console.log('');
        console.log('');
        console.log('No more question to ask for the given name: ' + name.active);
        console.log('');
        console.log('Saving the decisions for the name: ' + name.active);
        console.log('');

        decision.save();

        // -----------  <|@|>  ----------- //

        // below this will not be used when nodegame.js is integrated
        // name.index will be updated in logic
        // this update will be triggered by decision.save()
        // name.index++;
        //
        // if(name.index < name.list.length) {
        //
        //     // order.index = -1;
        //
        //     name.active = name.list[name.index];
        //
        //     console.log('');
        //     console.log('Moving to the next name:  ' + name.active);
        //     console.log('');
        //
        //     // order.set();
        //     //
        //     // question.next();
        //
        //     experiment.generate();
        //
        // } else {
        //
        //     console.log('No more names left!');
        //
        // }

    }

}

question.switch = function(class1, class2) {

    // showing the laptop or humanBot icon only for the trust question
    if(class2 === 'Trust') {
        icon.show();
    } else {
        icon.hide();
    }

    class1 = '.ask' + class1;
    class2 = '.ask' + class2;

    // hide and show question with 1000ms delay
    question.transition();

    // while question div is hidden change the question
    setTimeout(()=>{
        $(class1).css({'display':'none'});
        $(class2).css({'display':'block', 'opacity':'0'});
        setTimeout(()=>{
            $(class2).css({'transition':'0.2s', 'opacity':'1'});
        }, 200)
    }, 550)

}

// helper to question.switch(): transition between different questions
question.transition = function() {

    $('.frame-B-0-0').css({'transition':'0.5s', 'opacity':'0'});
    setTimeout(()=>{
        $('.frame-B-0-0').css({'transition':'1s', 'opacity':'1'});
    }, 1000)

}


// -------------------- //
// ---- EXPERIMENT ---- //
// -------------------- //

experiment.generate = function() {

    console.log('generating experiment');
    console.log('');

    if(treatment === -1) {
        icon.set('laptop');
        name.isDisplayed = false;
    } else {
        icon.set('humanBot');
        name.isDisplayed = true;
    }

    name.set();

    order.index = 0;

    order.set();

    console.log('order index: ' + order.index);
    console.log('for question order: ' + order.active);

    question.first();

}
