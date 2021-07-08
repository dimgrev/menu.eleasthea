// initializing a flag.
var isCurrentlyOnTurning = false;

// initializing turn.js
$("#flipbook").turn({
    acceleration:true,
    gradients: true,
    when: {
        turned: function(event, page, pageObj) {
            isCurrentlyOnTurning = false;
        },
        turning: function(event, page, pageObj) {
            if (isCurrentlyOnTurning) { event.preventDefault(); }
            else { isCurrentlyOnTurning = true; }
        }
    }
});

// on window resize, update the size of the flipbook to keep aspect ratio.
$(window).resize(() => $("#flipbook").turn("size", 2 * 0.7 * 0.85 * window.innerHeight, window.innerHeight * 0.85));

// when clicking on the even pages go to the next page.
$(".even").on("click", () => goToPrev());

// when clicking on the odd pages go to the next page.
$(".odd").on("click", () => goToNext());

// helper methods.
var goToNext = () => $('#flipbook').turn('next');   
var goToPrev = () => $('#flipbook').turn('previous');

var changeToEnglish = () => {
    $('.p1').css('background-image','url("./images/english/1.jpg")');
    $('.p2').css('background-image','url("./images/english/2.jpg")');
    $('.p3').css('background-image','url("./images/english/3.jpg")');
    $('.p4').css('background-image','url("./images/english/4.jpg")');
};

var changeToGreek = () => {
    $('.p1').css('background-image','url("./images/greek/1.jpg")');
    $('.p2').css('background-image','url("./images/greek/2.jpg")');
    $('.p3').css('background-image','url("./images/greek/3.jpg")');
    $('.p4').css('background-image','url("./images/greek/4.jpg")');
};

