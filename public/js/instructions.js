window.onload = function() {

    var node = parent.node;

    // --------------- //

    // node.emit('HTML-startSecretTutoTimer');

    // ---------------------------------- //
    // --------  INITIAL SETUP  --------- //
    // ---------------------------------- //

    title.update.text('WELCOME TO THE EXPERIMENT');
    title.update.size(true);
    title.update.textColor(-6000, false, 50);

    box.transition('', 'A-1', 0, 0, 1, 750);

    setTimeout(()=>{
        box.button.show('A-1');
    }, 2000)

    $('#btn-A-1').click(function() {

        box.transition('A-1', 'A-2', 0, 1, 1, 750);

        setTimeout(()=>{
            box.button.show('A-2');
        }, 2000)

    });

    $('#btn-A-2').click(function() {

        box.transition('A-2', 'A-3', 1, 1, 1, 750);

        setTimeout(()=>{
            box.button.show('A-3');
        }, 2000)

    });

    $('#btn-A-3').click(function() {

        box.transition('A-3', 'A-4', 1, 1, 1, 750);

        setTimeout(()=>{
            box.button.show('A-4');
        }, 2000)

    });

    $('#btn-A-4').click(function() {

        box.transition('A-4', '', 0, 0, 1, 0);

        setTimeout(()=>{
            box.flush();
            title.hide();
        }, 100);

        setTimeout(()=>{

            box.transition('', 'A-5', 0, 0, 1, 750)

            setTimeout(()=>{
                box.button.show('A-5');
            }, 2750)

        }, 750)


    });

    var buttonDelay = 2750;

    $('#btn-A-5').click(function() {

        box.transition('A-5', 'A-6', 1, 1, 1, 750);

        setTimeout(()=>{
            box.button.show('A-6');
        }, buttonDelay)

    });

    $('#btn-A-6').click(function() {

        box.transition('A-6', 'A-7', 1, 1, 1, 750);

        setTimeout(()=>{
            box.button.show('A-7');
        }, buttonDelay)

    });

    $('#btn-A-7').click(function() {

        box.transition('A-7', 'B-8', 0, 0, 1, 750);

        setTimeout(()=>{
            box.button.show('B-8');
        }, buttonDelay)

    });

    $('#btn-B-8').click(function() {

        box.transition('B-8', 'B-9', 1, 0, 1, 750);

        $('.info-a-8-1').css({'transition':'0.5s', 'opacity':'0'});
        $('.info-a-8-2').css({'display':'block', 'margin-top':'-20px'});
        setTimeout(()=>{
            $('.info-a-8-2').css({'transition':'0.5s', 'opacity':'1'})
            $('#boxwrap-B-8').css({'margin-top':'-15px'});
            $('.line-A').css({'opacity':'1'});
        }, 250)


        setTimeout(()=>{
            box.button.show('B-9');
        }, buttonDelay)

    });

    $('#btn-B-9').click(function() {

        box.transition('B-9', 'B-10', 1, 0, 1, 750);

        setTimeout(()=>{
            box.button.show('B-10');
        }, buttonDelay)

    });

    $('#btn-B-10').click(function() {

        box.transition('B-10', 'B-11', 1, 0, 1, 750);

        node.emit('goDown', 670);

        setTimeout(()=>{
            box.button.show('B-11');
        }, buttonDelay)

    });

    $('#btn-B-11').click(function() {

        box.transition('B-11', 'B-12', 1, 0, 1, 750);

        node.emit('goDown', 790);

        setTimeout(()=>{
            box.button.show('B-12');
        }, buttonDelay)


    });

    $('#btn-B-12').click(function() {

        box.transition('B-12', 'C-13', 1, 1, 1, 750);

        $('.line-B').css({'display':'block'})

        setTimeout(()=>{
            $('.line-B').css({'opacity':'1'})
        }, 750)

        node.emit('goDown', 965);

        setTimeout(()=>{
            box.button.show('C-13');
        }, buttonDelay)

    });

    $('#btn-C-13').click(function() {

        box.transition('C-13', 'C-14', 1, 1, 1, 750);

        node.emit('goDown', 1065);

        setTimeout(()=>{
            box.button.show('C-14');
        }, buttonDelay)

    });

    $('#btn-C-14').click(function() {

        box.transition('C-14', 'D-15', 1, 1, 1, 750);

        $('.extraTextEnforcement').css({'font-size':'20px'});
        $('.hiddenGameInfo').css({'font-size':'26px',
        'padding-bottom':'50px', 'right':'144px', 'left':'16px'});

        $('.line-C').css({'display':'block'})

        setTimeout(()=>{
            $('.line-C').css({'opacity':'1'})
        }, 750)

        node.emit('goDown', 1425);

        $('.myBody').css({'height':'1410px'});

        setTimeout(()=>{

            box.transition('D-15', 'D-16', 1, 1, 1, 0);
            box.button.show('D-16');

        }, 800)

    });

    $('#btn-D-16').click(function() {

        node.emit('HTML-endTutorial');

    })

    // --------------------- //

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

}
