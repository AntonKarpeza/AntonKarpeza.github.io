$(function() {
    $(document).ready(function(){

		/*parallax*/
        //header
        $('.parallax-header').parallax({
            imageSrc: 'img/seattle-bg.jpg',
            positionX: 'center',
            speed: 0.2
        });
        function headerHeightDetect() {
            $(".parallax-header").css("height", $(window).height());
        }
        headerHeightDetect();
        $(window).resize(function() {
            headerHeightDetect();
        });


        //portfolio
        $('#portfolio').parallax({
            imageSrc: 'img/portfolio/portfolio-bg.jpg',
            positionX: 'center',
            speed: 0.2
        });
        function portfolioHeightDetect() {
            $("#portfolio").css("height", $(window).height());
        }
        portfolioHeightDetect();

        $(window).resize(function() {
            portfolioHeightDetect();
        });

        //menu
        var touch = $('.menu_button');
        var menu = $('.navigate');
		/*____________________________________button*/
        $(touch).click(function(){
            $(this).toggleClass("change");
        });
		/*_________________________________________*/
        $(touch).on('click', function(e) {
            e.preventDefault();
            menu.fadeToggle('slow');
        });
        $(".menu_link").on('click', function() {
            $(touch).toggleClass("change");
            menu.fadeOut('slow');
            $("html, body").animate({
                scrollTop: $($(this).attr("href")).offset().top + "px"
            }, {
                duration: 1000,
                easing: "swing"
            });
            return false;
        });

        //portfolio-carousel
        var owl = $('#owl-first');
        owl.owlCarousel({
            margin: 500,
            nav: true,
            navText: ["<img class='owf-prev' src='img/portfolio/white-up.png'>", "<img class='owf-next' src='img/portfolio/white-down.png'>"],
            loop: true,
            items: 1,
            mouseDrag: false,
            lazyLoad: true,
            smartSpeed: 350,
            animateIn: 'fadeInUp',
            animateOut: 'zoomOutDown'
        });
        function bodyPortfolio() {
            $(".item").css("height", $('#content-body-portfolio').height());
        }
        bodyPortfolio();

        //common resize
        $(window).resize(function() {
            bodyPortfolio();
        });

        //overlay-content
        $('.btn-demo').click(function () {
            $(".overlay").css({"width": "100%"});
            $(".item-content").css("filter", "blur(9px)");
        });
        $(".owl-dot, .owf-next ,.owf-prev ,.btn-close").click(function () {
            $(".overlay").css("width", "0");
            $(".item-content").css("filter", "blur(0px)");
        });

        //E-mail Ajax Send
        $("form").submit(function() { //Change
            var th = $(this);
            $.ajax({
                type: "POST",
                url: "mail.php", //Change
                data: th.serialize()
            }).done(function() {
                setTimeout(function() {
                    // Done Functions
                    th.trigger("reset");
                }, 1000);
            });
            return false;
        });

        /*ANIMATION*/
        //main
        $("#name-header").animated("fadeInUp", "fadeOutDown");
        $(touch).addClass("animated fadeInDown");
        $("#lang-header a").animated("fadeInDown", "fadeOutDown");
        //block
        $(".head-content-block").animated("fadeInUp", "fadeOutDown");
        //menu
        $(".navigate ul li a").addClass("animated fadeInUp");
        //about
        $("#photo-about").animated("flipInY", "fadeOutLeft");
        $("#text-about").animated("fadeInRight", "fadeOutRight");
        //resume
        $("#left-resume-part").animated("fadeInLeft", "fadeOutLeft");
        $("#right-resume-part").animated("fadeInRight", "fadeOutRight");
        //portfolio
        $("#body-portfolio").animated("fadeInRight", "fadeOutRight");
        //contacts
        $("#links-contacts").animated("fadeInLeft", "fadeOutLeft");
        $("#mess-contacts").animated("fadeInRight", "fadeOutRight");

    });
});

$(window).on("load", function(){
    $('.preloader').delay(300).fadeOut("slow");
});

// MAP
function myMap() {
    var myCenter = new google.maps.LatLng(55.53,28.65);
    var mapCanvas = document.getElementById("googleMap");
    var mapOptions = {center: myCenter, zoom: 7};
    var map = new google.maps.Map(mapCanvas, mapOptions);
    var marker = new google.maps.Marker({position:myCenter});
    marker.setMap(map);
}