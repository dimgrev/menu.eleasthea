var x = window.matchMedia("(max-width: 768px)");
var pg = 1;
var vibr = false;

// on window resize, update the size of the flipbook to keep aspect ratio. (width , heigth)
$(window).resize(() => {
    if(x.matches){
        $("#album").turn("size", window.innerWidth * 1.77 , (window.innerWidth * 1.77) / 1.414 )
    }else{
        location.reload()
        $("#album").turn("size", window.innerWidth * 0.97 , (window.innerWidth * 0.97) / 1.414 )
    }
});

$(document).ready(function() {
    hideLArrow();
    if(x.matches){
        $("#album").bind('start', 
            function (event, pageObject, corner)
            {
                if (corner=="tl" || corner=="bl" || corner=="br" || corner == 'tr') {
                    event.preventDefault();
                }
            }
        );
    }
    else{
        $(".page-wrapper")[4].remove();
        $(".page-wrapper")[3].remove();
        $(".shadow").remove();
        $(".paging").remove();
    }
});  

//multilingual menu
var changeToEnglish = () => {
    if(x.matches){
        $('.p1').css('background-image','url("./images/english/1h.jpg")');
        $('.p3').css('background-image','url("./images/english/2.jpg")');
        $('.p5').css('background-image','url("./images/english/3.jpg")');
    }else{
        $('.p1').css('background-image','url("./images/english/1h.jpg")');
        $('.p2').css('background-image','url("./images/english/2.jpg")');
        $('.p3').css('background-image','url("./images/english/3.jpg")');
    }
};
var changeToGreek = () => {
    if(x.matches){
        $('.p1').css('background-image','url("./images/greek/1h.jpg")');
        $('.p3').css('background-image','url("./images/greek/2.jpg")');
        $('.p5').css('background-image','url("./images/greek/3.jpg")');
    }else{
        $('.p1').css('background-image','url("./images/greek/1h.jpg")');
        $('.p2').css('background-image','url("./images/greek/2.jpg")');
        $('.p3').css('background-image','url("./images/greek/3.jpg")');
    }
};

// initializing a flag.
var isCurrentlyOnTurning = false;

// initializing turn.js
$("#album").turn({
    acceleration:true,
    gradients: true,
    when: {
        turned: function(event, page, pageObj) {   
            isCurrentlyOnTurning=false;
        },
        turning: function(event, page, pageObj) {
            pg = page;
            if (isCurrentlyOnTurning) {
                event.preventDefault();
            }else{
                if(!x.matches && page == 4){
                    event.preventDefault();
                }else{
                    isCurrentlyOnTurning = true;
                    if (page%2 == 0){
                        increasePage(page)
                    }else{
                        decreasePage(page);
                    }
                }
            }
        }
    }
});

$(".fa-arrow-left").on("click", () => { 
    goToPrev();
});

$(".fa-arrow-right").on("click", () => {
    callVibr();
    goToNext(); 
});

// when clicking on the even pages go to the next page.
$(".even").on("click", () => { 
    goToPrev();
});

// when clicking on the odd pages go to the next page.
$(".odd").on("click", () => {
    callVibr();
    goToNext();
});

// helper methods.
var goToNext = () => {
        $('#album').turn('next');
        if(pg == 5 || (!x.matches && pg == 4)){
            vibr = true;
            //hidePointer();
        }
        else{
            vibr = false;
        }
};   

var goToPrev = () => {
        $('#album').turn('previous');
        vibr = false;    
};

function callVibr(){
    if(vibr){
        window.navigator.vibrate(150);
        vibr = false;
    }
};

function hideLArrow(){
    $(".fa-arrow-left").hide();
};

function hideRArrow(){
    $(".fa-arrow-right").hide();
};

function showLArrow(){
    $(".fa-arrow-left").show();
};

function showRArrow(){
    $(".fa-arrow-right").show();
};

function increasePage(page){
    ++pg;
    showRArrow();
    showLArrow();
    
    if(x.matches){
        if(page == 4){
            hideRArrow();
            showLArrow();
        }
    }else{
        if(page == 2){
            hideRArrow();
            showLArrow();
        }
    }
};

function decreasePage(page){
    --pg;
    showRArrow();
    showLArrow();
    if(page == 1){
        hideLArrow();
        showRArrow();
    }
};