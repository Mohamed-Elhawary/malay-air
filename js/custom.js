$(function() {
    let header       = $(".header"),
        nav          = $(".nav"),
        headerSlider = $(".bxslider");


    //Start Nav bar settings

    //fixed the navbar at the top of page while scrolling
    $("body").css({
        paddingTop: $("nav").innerHeight()
    });

    nav.css({
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
    });


    //sync the navbar links with sections while clicking any link (with smooth scrolling) & add class active at the clicked link and remove it from its siblings
    $(".nav .navigation a").on("click", function(e) {
        e.preventDefault();
        $(this).addClass("active").siblings().removeClass("active");
        $("html, body").animate({
            scrollTop: $($(this).data("scroll")).offset().top + 1
        });
    });

    
    $(window).scroll(function() {
        //sync the navbar links with sections while scrolling & add class active at link that match the existed section and remove it from its siblings
        $("section").each(function() {
            if ($(window).scrollTop() > $(this).offset().top) {
                $(".nav .navigation a").removeClass("active");
                $('.nav .navigation a[data-scroll = "' + '#' + $(this).attr("id") + '"]').addClass("active");
            }
            
        });

        //make the nav bar has a height and a background after scrolling specific pixels
        if ($(window).scrollTop() >= (headerSlider.innerHeight()) / 4) { 
                if(nav.height() == 0) {
                    nav.height("65px").css("background-color", "rgba(0,0,0, .6)");
                }

        } else {
            nav.css({height: 0})
        }

    });
    
    //End Nav bar Settings


    //Start header and bxslider Settings

    //make the header has the full height of the window    
    header.height($(window).height());

    //make the bxslider contents be at the center of the window   
    headerSlider.each(function() {
        $(this).css("padding-top", ($(window).height() - $('.bxslider div').height()) /2) ;
    });

    $(window).on("resize", function() {

        //make the header has the full height of the window on resize   
        $("header").height($(window).height());
        
        //make the bxslider contents be at the center of the window on resize  
        headerSlider.each(function() {
            $(this).css("padding-top", ($(window).height() - $('.bxslider div').height()) /2) ;
        });
        
    });

    //Trigger the bxslider plugin
    $(".bxslider").bxSlider({
        pager: false, // remove the bullets at the bottom of the bxslider, you can show it as you want by set true instead of false
        auto:  true  //allow to start the silder automatically
    });

    //End header and bxslider Settings

    //start travels section settings
    $(".travels .mix img").each(function(){
        $(this).mouseenter(function() {
            $(this).prev(".overlay").css("display", "block");
        });
    });

    $(".travels .mix .overlay").each(function(){
        $(this).mouseenter(function() {
            $(this).css("display", "block");

        });

        $(this).mouseleave(function() {
            $(this).css("display", "none");

        });
    });

    // Trigger MixitUp
    $('#Container').mixItUp();

    //end travels section settings

    //start crew section settings 
    $(".crew .person img").each(function() {
        $(this).hover(function() {
            $(this).siblings().css("display", "block")
        });
    });

    $(".crew .person .overlay").each(function() {
        $(this).hover(function() {
            $(this).css("display", "block")
        }, function() {
            $(this).css("display", "none")

        });
    });
    //End crew section settings 
    

    //start passengers opinions section settings

    //start slider settings
    var reviews = Array.from(document.querySelectorAll('.reviews .review')),
        reviewsLength = reviews.length,
        navigatorUl = document.querySelector(".navigator"),
        navigator   = $(".navigator"),
        currentReview = 1;
    

    for (var i = 1; i <= reviewsLength; i++) {
        var navigatorLi = document.createElement("li");
        navigatorLi.setAttribute('data-index', i);
        navigatorUl.appendChild(navigatorLi);
    }

    navigator.find("li:first-child").addClass("active");

    var createLi = Array.from(document.querySelectorAll('.navigator li'));
    
    for (var i = 0; i < createLi.length; i = i + 1){
        createLi[i].onclick = function () {
            "use strict";
            currentReview = parseInt(this.getAttribute("data-index"));
            
            theChecker();
        }
    }

    theChecker();

    function theChecker() {

        removeAttributes();
        
        $(".review[data-review = '" + currentReview +  "']").addClass("active");
        
        createLi[currentReview - 1].classList.add('active');
    }
    
    function removeAttributes() {
        $(".reviews .review").each(function() {
            $(this).removeClass("active");
        });
        
        createLi.forEach(function(bullet) {
            bullet.classList.remove("active");
        });
    }

    setInterval(function autoPlay() {
        if ($(".reviews .review.active").is(':last-child')) {
            currentReview = 1;
            theChecker();

        } else {
            currentReview++;
            theChecker();
        }

    }, 4000);
   
    //End slider Settings
    
    //End passengers opinions section Settings

    //Start contact us section settings
    var inputPlace,
        textAreaPlace;
    $("input").each(function() {
        $(this).focus(function() {
            inputPlace    = $(this).attr("placeholder");
            $(this).attr("placeholder", "")
        }).blur(function() {
            $(this).attr("placeholder", inputPlace);
        });
    });

    $("textarea").focus(function() {
        textAreaPlace = $("textarea").attr("placeholder");
        $("textarea").attr("placeholder", "");
    }).blur(function() {
        $(this).attr("placeholder", textAreaPlace);
    });

    //End contact us section settings

    //Trigger nice scroll plugin
    $('html').niceScroll({
        
        cursorcolor: '#1abc9c',
        
        cursorwidth: '18px',
        
        cursorborder: '1px solid #1abc9c',
        
        cursorborderradius: 0
        
    });


    
});