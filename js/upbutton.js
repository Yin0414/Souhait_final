$(document).ready(function () {
    $(window).scroll(function () {
        if ($(this).scrollTop() > 30) {
            $('.back-to-top').fadeIn();
        } else {
            $('.back-to-top').fadeOut();
        }
    });


    $('.back-to-top').click(function (e) {
        e.preventDefault(); 
        $('html, body').animate({ scrollTop: 0 }, 500); 
    });
});

$(document).ready(function() {
    $("#hamburger").click(function() {
        $("#nav").toggleClass("active"); 
    });
});
