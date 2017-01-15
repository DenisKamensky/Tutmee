; /*in code before this script developer can forget to print a symbol ";" , in this case  we will not take a mistakes */
(function($){ /*closure for a working in local scope, function takes a parametr $ as a jQuery and  in case if symbol $ is used before or after by another js library, we will not take a conflict*/
	 var videoPlayerHeight = function(){
	 	var video = $('body .video__player'); /* let's give video frame right height */
	 	if(video.length){
	 		video.each(function(){ /* if many video frames exist on a page*/
	 			var width = $(this).find('iframe').width();
	 			$(this).find('iframe').height(width*0.5625)
	 			$(this).height($(this).find('iframe').height());
	 		});
	 	}
	 };
	 $(function(){ /*document.ready*/

	 	$('a[href="#"]').click(function(e){
	 		e.preventDefault();
	 	});
	 	/* banner animated button */
	 	videoPlayerHeight()
	 	$('.banner__arrows').addClass('banner__arrows_visible');
	 	$('.banner__play').addClass('banner__play_visible');
	 	/* banner animated button end*/
	 	/*show banner video*/
	 	$('.banner__play').click(function(){
	 		if(window.rightVideoLink != undefined){
	 			$('.top-block').find('iframe').attr('src', window.rightVideoLink);
	 		}
	 		$('.banner').addClass('banner_disabled');
	 		$('.top-block').addClass('top-block_no-bg');
	 		$('.top-block .video').addClass('video_enabled');
	 	});
	 	/*show banner video end */
	 	$('.video__close').click(function(){
	 		var frame = $(this).parent().find('iframe');
	 		var blakSceen = 'https://i.ytimg.com/vi/FbCdr5UNLv0/maxresdefault.jpg'
	 		window.rightVideoLink = frame.attr('src');
	 		frame.attr('src', blakSceen);
	 		$(this).closest('.video_enabled').removeClass('video_enabled');
	 		$('.top-block_no-bg').removeClass('top-block_no-bg');
	 		$('.banner_disabled').removeClass('banner_disabled')
	 	})
	 	$('.menu-trigger__icon').click(function(){
	 		/* toggle mobile menu modificator*/
	 		$('.header').find('.navigation-container').toggleClass('navigation-container_enabled');
	 		/* toggle video modificator*/
	 	});

	 	/*toogle news */
	 	$('.news__button').click(function(){
	 		$(this).toggleClass('news__button_opened')
	 		var newsNode = $(this).closest('.news');
	 		newsNode.find('.news__body').slideToggle();
	 	});
	 	/*toogle news end */

	 	/*toogle news block */
	 	$('.news-block__toggler').click(function(){
	 		$('.news-block__container').slideToggle();
	 	});
	 	/*toogle news block end */
	});
	 $(window).resize(function(){
	 	videoPlayerHeight();
	 })
})(jQuery);