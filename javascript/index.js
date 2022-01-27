const top_offset = 77;
const visibility_threshold = 10;
const nav_items = ["about", "experience", "projects", "resume", "contact"];
const nav_items_reversed = nav_items.reverse();
var cur_nav_item = "about";

$(document).ready(function() {
    $('.go_to').click(function() {
        var data_id = $(this).data('id');
        console.log(data_id);
        
        $('html, body').animate({
            scrollTop: $('#'+data_id).offset().top - top_offset // 57="header_height", 20="margin"
        },'slow');

    });

    $(window).on('scroll', $.throttle(100, function() {
        const all_items = all_nav_items_in_view();
        const item = all_items[0];
        console.log(all_items);
        console.log(" ");
    }));

    // toggle mobile navigation slide-over
    $('.nav_top_toggle').click(function() {
        $('.container_nav_top').position().left < 0 ? show_nav() : hide_nav();
    });


    // hide mobile nav slide-over on section selection
    // $('.nav_side').click(function() {
    //     hide_nav();
    // });
    $('.nav_side').click(hide_nav);

});

function hide_nav() {
    $('.container_nav_top').animate({
        "left": "-100px"
    });
}

function show_nav() {
    $('.container_nav_top').animate({
        "left": "0px"
    });
}

function all_in_view(el) {
    const offset = top_offset-1;

    var e_top = Math.floor($(el).offset().top); // - top_offset);
    var e_bot = Math.floor(e_top + $(el).outerHeight());
    var w_top = Math.floor($(window).scrollTop() + offset);
    var w_bot = Math.floor(w_top + $(window).innerHeight());

    // console.log(" ");

    console.log("window: " + w_top + " to " + w_bot);
    // console.log(el + ": " + e_top + " to " + e_bot);
    

    var w_height = w_bot - w_top;
    var e_height = e_bot - e_top;

    if ((w_top <= e_bot && w_bot >= e_top) || (w_bot <= e_top && w_top >= e_bot)) {
        var size_on_screen = 0;
        var percent_on_screen = 0

        if (w_top <= e_bot && w_bot >= e_top) {
            // bottom part on screen
            size_on_screen = e_bot - w_top;
            percent_on_screen = size_on_screen / e_height;
            console.log("BOTTOM PART - " + el + " (" + size_on_screen + ", " + (percent_on_screen).toFixed(2) + ")");
        }
        if (w_bot <= e_top && w_top >= e_bot) {
            // top part on screen
            size_on_screen = w_bot - e_top;
            percent_on_screen = size_on_screen / e_height;
            console.log("TOP PART - " + el + " (" + size_on_screen + ", " + (percent_on_screen).toFixed(2) + ")");
        }
        if (w_top <= e_top && e_bot <= w_bot) {
            // all on screen
            size_on_screen = e_height;
            percent_on_screen = 1;
            console.log("ALL - " + el + " (" + size_on_screen + ", " + (percent_on_screen).toFixed(2) + ")");
        }
        
        console.log(el + " (" + size_on_screen + ", " + (percent_on_screen).toFixed(2) + ")");
        return [el, percent_on_screen];
    }
    
    return [null,0];
}

function all_nav_items_in_view() {
    return nav_items.filter(i => {
        return all_in_view("#"+i)[1] > 0;
    });
}

function isIntersecting(e, w) {
    // check top intersecting
    if (e.top >= w.top) {
        if (e.top > w.bottom) {
            // off screen
            return 0;
        } else {
            // on screen
            
            // check bottom intersecting
            if (e.bot >= w.top) {
                if (e.bot > w.bot) {
                    // off screen
                    return 0;
                }
                
            }
        }
    }
}