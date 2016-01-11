$(document).ready(function(){
    var options = {
        nextButton: true,
        prevButton: true,
        preloader: true,
        navigationSkipThreshold: 1000,
        fadeFrameWhenSkipped: false
    };
    var sequence = $("#sequence").sequence(options).data("sequence");

    sequence.afterLoaded = function(){
        $("http://htmlstream.com/preview/unify-v1.9/assets/plugins/horizontal-parallax/js/.prev, .next").fadeIn(500);
    }
});