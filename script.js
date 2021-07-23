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
function animateHands(){
    $('#pointer').animate({width:'35px'}, 800, animateHandb)
}
function animateHandb(){
    $('#pointer').animate({width:'50px'}, 800, animateHands)
}
animateHands();
});

$('#pointer').on("click", () => { goToNext(); });

$(document).ready(function() {
    if(x.matches){
    }
    else{
        $(".page-wrapper")[5].remove();
        $(".page-wrapper")[5].remove();
        $(".page-wrapper")[4].remove();
        $(".shadow").remove();
        $(".paging").remove();
    }
});  

//multilingual menu
var changeToEnglish = () => {
    if(x.matches){
        $('.p1').css('background-image','url("./images/english/1flp2.jpg")');
        $('.p3').css('background-image','url("./images/english/2.jpg")');
        $('.p5').css('background-image','url("./images/english/3.jpg")');
        $('.p7').css('background-image','url("./images/english/4.jpg")');
    }else{
        $('.p1').css('background-image','url("./images/english/1.jpg")');
        $('.p2').css('background-image','url("./images/english/2.jpg")');
        $('.p3').css('background-image','url("./images/english/3.jpg")');
        $('.p4').css('background-image','url("./images/english/4.jpg")');
    }
};
var changeToGreek = () => {
    if(x.matches){
        $('.p1').css('background-image','url("./images/greek/1flp2.jpg")');
        $('.p3').css('background-image','url("./images/greek/2.jpg")');
        $('.p5').css('background-image','url("./images/greek/3.jpg")');
        $('.p7').css('background-image','url("./images/greek/4.jpg")');
    }else{
        $('.p1').css('background-image','url("./images/greek/1.jpg")');
        $('.p2').css('background-image','url("./images/greek/2.jpg")');
        $('.p3').css('background-image','url("./images/greek/3.jpg")');
        $('.p4').css('background-image','url("./images/greek/4.jpg")');
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
        if(pg == 1){
            $('#pointer').show();
        }
    },
    turning: function(event, page, pageObj) {
        if (isCurrentlyOnTurning) {
            event.preventDefault();
        }else{
            isCurrentlyOnTurning = true;
            if (page%2 == 0){
                increasePage(page)
            }else{
                decreasePage()
            }
        }
        $('#pointer').hide();
    }
    }
});

// when clicking on the even pages go to the next page.
$(".even").on("click", () => { goToPrev() });

// when clicking on the odd pages go to the next page.
$(".odd").on("click", () => {
    if(vibr){
        window.navigator.vibrate(150);
        vibr = false;
    }
    goToNext() 
});

// helper methods.
var goToNext = () => {
    $('#pointer').hide();
    $('#album').turn('next')
    if(pg == 4){
        vibr = true;
    }
    else{
        vibr = false;
    }
};   
var goToPrev = () => {
    $('#album').turn('previous')
    vibr = false;
};

function increasePage(page){
    if(pg < 4){
        if(page == 2 || page == 4 || page == 6){
            $(".paging").text(++pg +'/4');
        }
    }
};

function decreasePage(){
    if(pg > 1){
        $(".paging").text(--pg +'/4');
    }
};