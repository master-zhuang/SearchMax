$(document).ready(function() {
	if (!(/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera)) {
		$.getScript("assets/plugins/youtube-player/src/jquery.mb.YTPlayer.min-1.js"/*tpa=http://htmlstream.com/preview/unify-v1.9//assets/plugins/youtube-player/assets/plugins/youtube-player/src/jquery.mb.YTPlayer.min.js*/, function(){
	        $(".player").YTPlayer();
		});
	}
});