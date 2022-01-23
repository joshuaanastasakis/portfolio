$(document).ready(function() {
    $('.go_to').click(function() {
        var data_id = $(this).data('id');
        console.log(data_id);
        
        $('html, body').animate({
            scrollTop: $('#'+data_id).offset().top-52
        },'slow');

    });

    // $('.scrollspy').scrollSpy();

    // $(window).scroll(function() {

    // });

    $('.nav_top_toggle').click(function() {
        if ($('.container_nav_top').position().left < 0) {
            console.log("show");
            $('.container_nav_top').animate({
                "left": "0px"
            }/*, 'slow'*/);
        } else {
            console.log("hide");
            $('.container_nav_top').animate({
                "left": "-100px"
            }, 'slow');
        }
        
    });

});

function toggleNav() {
    if ($('.container_nav_top').left === -100) {
        console.log("left already");
        $('.container_nav_top').animate({
            "left": "100px"
        }, 'slow');
    } else {
        console.log("left already");
        $('.container_nav_top').animate({
            "left": "-100px"
        }, 'slow');
    }
    
}