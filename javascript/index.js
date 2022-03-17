// define debounce
function debounce(func, timeout=100) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
}

// define scroll on nav selection
function scrollToSection(str) {
    const section = document.querySelector("#"+str);
    const section_top = section.offsetTop;
    const new_top = section_top - top_offset;
    document.querySelector('html, body').scrollTo({
        top: new_top,
        behavior: 'smooth'
    });
}

// define toggle mobile view nav menu
function toggleNav() {
    const nav_top = document.querySelector('div.container_nav_top');
    if (nav_top.classList.contains('animate_show_nav')) {
        // console.log("visible");
        nav_top.classList.remove('animate_show_nav');
    } else {
        nav_top.classList.add('animate_show_nav');
    }
}

// define hide mobile view nav menu
function hideNav() {
    const nav = document.querySelector('div.container_nav_top');
    if (nav.classList.length===2) {
        nav.classList.remove('animate_show_nav');
    }
}

const top_offset = 70; // header=60 + margin=20
// const section_ids = ["about", "experience", "projects", "resume", "contact"];
const all_sections = document.querySelectorAll('section')
const sections_list = new Map();

for (let i=0; i < all_sections.length; i++) {
    const section = all_sections[i];
    sections_list.set(section.id, section.offsetTop);
    // sections_list[section.id] = section.offsetTop;
}

console.log(sections_list);

// add 'click' event listener to document: dismiss nav when document clicked
document.body.addEventListener('click', (event) => {
    if (event.target.classList[0]==='nav_top_toggle') return;
    const nav = document.querySelector('div.container_nav_top');
    if (nav.classList.length===2) {
        nav.classList.remove('animate_show_nav');
    }
}, true);

// get all nav_items
let nav_items = document.querySelectorAll("div.go_to");


// for each nav_item
for (let i=0; i < nav_items.length; i++) {
    const item = nav_items[i];
    // add 'click' event listener to trigger scroll
    item.addEventListener('click', () => {
        scrollToSection(item.dataset.id);
    });
}

/* Mobile Responsive */
const nav_toggle = document.querySelector('div.nav_top_toggle');

nav_toggle.addEventListener('click', () => {
    const nav = document.querySelector('div.container_nav_top');
    if (nav.classList.length===2) {
        nav.classList.remove('animate_show_nav');
    } else {
        nav.classList.add('animate_show_nav');
    }

});


// get scroll notification every 100ms
window.addEventListener('scroll', debounce(() => onScroll()));

function onScroll() {
    console.log("scroll");
    console.log("top = "+window.screenTop + ", y="+window.scrollY);
    for (let [sec, off] of sections_list) {
        console.log(sec + " = " + off);
    }
}

function visibleSections() {
    /* 
        goal: check which sections are in view
        get screen top and bottom
        set in_view object to empty object (format will be key:value => section:offsetTop)
        for each section in view:
        - get offsetTop
        - if (offsetTop >= screenTop and offsetTop < screenBottom) then add section:offsetTop to object
        return object section:offsetTop
    */
   const windowTop = window.scrollY;
   

   
}

// $(document).ready(function() {
//     $('.go_to').click(function() {
//         var data_id = $(this).data('id');
//         console.log(data_id);
        
//         $('html, body').animate({
//             scrollTop: $('#'+data_id).offset().top - top_offset // 57="header_height", 20="margin"
//         },'slow');

//     });

//     $(window).on('scroll', $.throttle(100, function() {
//         const all_items = all_nav_items_in_view();
//         const item = all_items[0];
//         console.log(all_items);
//         console.log(" ");
//     }));

//     // toggle mobile navigation slide-over
//     $('.nav_top_toggle').click(function() {
//         $('.container_nav_top').position().left < 0 ? show_nav() : hide_nav();
//     });


//     // hide mobile nav slide-over on section selection
//     // $('.nav_side').click(function() {
//     //     hide_nav();
//     // });
//     $('.nav_side').click(hide_nav);

// });

// function hide_nav() {
//     $('.container_nav_top').animate({
//         "left": "-100px"
//     });
// }

// function show_nav() {
//     $('.container_nav_top').animate({
//         "left": "0px"
//     });
// }

// function all_in_view(el) {
//     const offset = top_offset-1;

//     var e_top = Math.floor($(el).offset().top); // - top_offset);
//     var e_bot = Math.floor(e_top + $(el).outerHeight());
//     var w_top = Math.floor($(window).scrollTop() + offset);
//     var w_bot = Math.floor(w_top + $(window).innerHeight());

//     // console.log(" ");

//     console.log("window: " + w_top + " to " + w_bot);
//     // console.log(el + ": " + e_top + " to " + e_bot);
    

//     var w_height = w_bot - w_top;
//     var e_height = e_bot - e_top;

//     if ((w_top <= e_bot && w_bot >= e_top) || (w_bot <= e_top && w_top >= e_bot)) {
//         var size_on_screen = 0;
//         var percent_on_screen = 0

//         if (w_top <= e_bot && w_bot >= e_top) {
//             // bottom part on screen
//             size_on_screen = e_bot - w_top;
//             percent_on_screen = size_on_screen / e_height;
//             console.log("BOTTOM PART - " + el + " (" + size_on_screen + ", " + (percent_on_screen).toFixed(2) + ")");
//         }
//         if (w_bot <= e_top && w_top >= e_bot) {
//             // top part on screen
//             size_on_screen = w_bot - e_top;
//             percent_on_screen = size_on_screen / e_height;
//             console.log("TOP PART - " + el + " (" + size_on_screen + ", " + (percent_on_screen).toFixed(2) + ")");
//         }
//         if (w_top <= e_top && e_bot <= w_bot) {
//             // all on screen
//             size_on_screen = e_height;
//             percent_on_screen = 1;
//             console.log("ALL - " + el + " (" + size_on_screen + ", " + (percent_on_screen).toFixed(2) + ")");
//         }
        
//         console.log(el + " (" + size_on_screen + ", " + (percent_on_screen).toFixed(2) + ")");
//         return [el, percent_on_screen];
//     }
    
//     return [null,0];
// }

// function all_nav_items_in_view() {
//     return nav_items.filter(i => {
//         return all_in_view("#"+i)[1] > 0;
//     });
// }

// function isIntersecting(e, w) {
//     // check top intersecting
//     if (e.top >= w.top) {
//         if (e.top > w.bottom) {
//             // off screen
//             return 0;
//         } else {
//             // on screen
            
//             // check bottom intersecting
//             if (e.bot >= w.top) {
//                 if (e.bot > w.bot) {
//                     // off screen
//                     return 0;
//                 }
                
//             }
//         }
//     }
// }