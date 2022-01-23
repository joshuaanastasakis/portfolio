$(document).ready(function() {
    $('.go_to').click(function() {
        var data_id = $(this).data('id');
        console.log(data_id);
        
        $('html, body').animate({
            scrollTop: $('#'+data_id).offset().top - 57 - 20 // 57="header_height", 20="margin"
        },'slow');

        $(this).blur();

    });

    $(window).on('scroll', $.throttle(500, function() {
        console.log("scroll");
        // const 
    }));

    // toggle mobile navigation slide-over
    $('.nav_top_toggle').click(function() {
        $('.container_nav_top').position().left < 0 ? show_nav() : hide_nav();
    });


    // hide mobile nav slide-over on section selection
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

function inWindowView(el) {
    var top_el = $(el).offset().top;
    var bottom_el = $(el).offset().top - $(el).outerHeight();
    var bottom_window = $(window).scrollTop() + $(window).innerHeight();
    var top_window = $(window).scrollTop();

    if ((bottom_window > bottom_el) && (top_window)) {

    }
}