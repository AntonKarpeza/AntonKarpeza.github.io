$(function() {
	$(document).ready(function(){

        /* **************Parallax************ */
        //header
        $('.parallax-header').parallax({
            imageSrc: 'img/header.jpg',
            positionX: 'center',
            speed: 0.4
        });
        //work
        $('#company_work').parallax({
            imageSrc: 'img/work/company.jpg',
            positionX: 'center',
            speed: 0.8
        });
        //la
        $('#la_parallax_work').parallax({
            imageSrc: 'img/work/la_boriosa.jpg',
            positionX: 'center',
            speed: 0.8
        });
        //retro
        $('#retro1_parallax_work').parallax({
            imageSrc: 'img/work/retro1.jpg',
            positionX: 'center',
            speed: 0.8
        });
        $('#retro2_parallax_work').parallax({
            imageSrc: 'img/work/retro2.jpg',
            positionX: 'center',
            speed: 0.8
        });


		//mobile-menu
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
            var wid = $(window).width();
            if(wid<768) {
                $(touch).toggleClass("change");
                menu.fadeOut('slow');
            }
            $("html, body").animate({
                scrollTop: $($(this).attr("href")).offset().top + "px"
            }, {
                duration: 1000,
                easing: "swing"
            });
            return false;
        });
        $(window).resize(function(){
            var wid = $(window).width();
            if(wid > 768 && menu.is(':hidden')) {
                menu.removeAttr('style');
            }
        });


        /*owl-carousel*/
        var owl = $('#owl-first');
        owl.owlCarousel({
            dots: true,
            items: 1,
            center: true,
            loop: true,
            autoplay: true
        })


    });
});

