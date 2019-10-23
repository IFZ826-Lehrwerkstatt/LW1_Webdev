var TicTacToe =
{
    counter: 1,

    init: function(e,obj)
    {
        var self = this;

        self.setPlay(e,obj);
        self.validateTicTacToe();

    },

    setPlay: function(e,obj)
    {
        var self = this,
            player1 = 'X', player2 = 'O',
            cell = obj || {};

        if ( $(obj).hasClass('player1') ||  $(obj).hasClass('player2') )
        {
            e.preventDefault();
            return false;
        }

        //Player Switching
        if ( TicTacToe.counter % 2 === 0)
        {
            $(cell).html(player1).addClass('player1 selected');
        }
        else
        {
            $(cell).html(player2).addClass('player2 selected');
        }

        TicTacToe.counter++;
    },

    validateTicTacToe: function()
    {
      // Playfields
        var cell0 = $('#0'),
            cell1 = $('#1'),
            cell2 = $('#2'),
            cell3 = $('#3'),
            cell4 = $('#4'),
            cell5 = $('#5'),
            cell6 = $('#6'),
            cell7 = $('#7'),
            cell8 = $('#8');

            // All Possible Winning Combos
             if (   $(cell0).text() === 'X'
                &&  $(cell1).text() === 'X'
                &&  $(cell2).text() === 'X' ||
                    $(cell3).text() === 'X'
                &&  $(cell4).text() === 'X'
                &&  $(cell5).text() === 'X' ||
                    $(cell6).text() === 'X'
                &&  $(cell7).text() === 'X'
                &&  $(cell8).text() === 'X' ||
                    $(cell0).text() === 'X'
                &&  $(cell3).text() === 'X'
                &&  $(cell6).text() === 'X' ||
                    $(cell1).text() === 'X'
                &&  $(cell4).text() === 'X'
                &&  $(cell7).text() === 'X' ||
                    $(cell2).text() === 'X'
                &&  $(cell5).text() === 'X'
                &&  $(cell8).text() === 'X' ||
                    $(cell0).text() === 'X'
                &&  $(cell4).text() === 'X'
                &&  $(cell8).text() === 'X' ||
                    $(cell2).text() === 'X'
                &&  $(cell4).text() === 'X'
                &&  $(cell6).text() === 'X' ||
                    $(cell0).text() === 'O'
                &&  $(cell1).text() === 'O'
                &&  $(cell2).text() === 'O' ||
                    $(cell3).text() === 'O'
                &&  $(cell4).text() === 'O'
                &&  $(cell5).text() === 'O' ||
                    $(cell6).text() === 'O'
                &&  $(cell7).text() === 'O'
                &&  $(cell8).text() === 'O' ||
                    $(cell0).text() === 'O'
                &&  $(cell3).text() === 'O'
                &&  $(cell6).text() === 'O' ||
                    $(cell1).text() === 'O'
                &&  $(cell4).text() === 'O'
                &&  $(cell7).text() === 'O' ||
                    $(cell2).text() === 'O'
                &&  $(cell5).text() === 'O'
                &&  $(cell8).text() === 'O' ||
                    $(cell0).text() === 'O'
                &&  $(cell4).text() === 'O'
                &&  $(cell8).text() === 'O' ||
                    $(cell2).text() === 'O'
                &&  $(cell4).text() === 'O'
                &&  $(cell6).text() === 'O')
            {
                    $('.message').fadeIn('slow');
                    $('table').off('click');
            }
        }

};

$(function()
{
    $('table').on('click','td', function(e)
    {
        var obj = $(this);
        TicTacToe.init(e,obj);
    });

    $('p.restart').on('click', function (e)
    {
        e.preventDefault();
        $('table').find('td.selected').text('');
        $('table').find('td')
            .removeClass('selected')
            .removeClass('player1')
            .removeClass('player2');
        $('.message').fadeOut('slow');
        $('table').on('click','td', function(e)
        {
            var obj = $(this);
            TicTacToe.init(e,obj);
        });
    });

});
