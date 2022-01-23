$(document).ready(function() {
    $('.go_to').click(function() {
        var data_id = $(this).data('id');
        console.log(data_id);
        
        $('html, body').animate({
            scrollTop: $('#'+data_id).offset().top - 57 - 20 // 57+ to show under header, 20 for margin
        },'slow');

    });

    // $('.scrollspy').scrollSpy();

    // $(window).scroll(function() {

    // });

    // toggle mobile navigation slide-over
    $('.nav_top_toggle').click(function() {
        $('.container_nav_top').position().left < 0 ? show_nav() : hide_nav();        
    });

    $('.nav_side').click(function() {
        hide_nav();
    });

});

function hide_nav() {
    $('.container_nav_top').animate({
        "left": "-100px"
    });
}

function show_nav() {
    $('.container_nav_top').animate({
        "left": "00px"
    });
}