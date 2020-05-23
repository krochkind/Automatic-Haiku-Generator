$(document).ready(function() {
    $.get('background', data => {
        bg = 'backgrounds/' + data.background;
        $('body').css('background', 'linear-gradient(rgba(255,255,255,.5), rgba(255,255,255,.5)), url(' + bg + ') no-repeat center center fixed');
        $('#i').attr('src', bg);
    });

    document.getElementById("i").onload = () => {
        $.get('data', data => {
            $('#p1').text(data['p1']);
            $('#p2').text(data['p2']);
            $('#p3').text(data['p3']);
        });
    };
});