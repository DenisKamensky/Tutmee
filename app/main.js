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
	 /*create a slider with correct sizes*/
	 var sliderSizes = function(){
	 	if($('.slider').length){
	 		var commonWidth = 0;
	 		$('.slider__slide').each(function(){
	 			$(this).width($('.slider').width());
	 			return commonWidth += $(this).width()
	 		});
	 		$('.slider-container').width(commonWidth);
	 	}
	 };
	 /*create a slider with correct sizes end*/
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
	 	
	 	/*submit footer form */
	 	$('.form-block form').submit(function(e){
	 		var userName = $(this).find('.form-block__name input').val();
	 		var tel = $(this).find('.form-block__tel input').val();
	 		var name_pattern = /[a-яА-Я]\s*[a-яА-Я]/i;
	 		var telPattern = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
	 		var nameResult = name_pattern.test(userName);
	 		var telResult = telPattern.test(tel)
	 		if(!nameResult){
	 			e.preventDefault();
	 			alert('ошибка')
	 		}else if(!telResult){
	 			e.preventDefault();
	 			alert('ошибка')
	 		}else{
	 			e.preventDefault()
	 			$.ajax({
					type: "POST",
					url: "mail.php",
					data: $(this).serialize()
				}).done(function() {
					$(this).find("input").val("");
					alert("Спасибо за заявку! Скоро мы с вами свяжемся.");
					$("#form").trigger("reset");
				});
	 		}
	 	});
	 	/*submit footer form  end*/

	 	/*modify header*/
	 	$(window).scroll(function(){
	 		var pagePosition = $('.header').next().offset().top;
	 		var headerPosition = $('.header').offset().top;
	 		if(headerPosition>pagePosition){
	 			$('.header').addClass('header_scrolled');
	 		}else{
	 			$('.header').removeClass('header_scrolled');
	 		};
	 	});
	 	/*modify header end*/
	 	/*carousel*/
	 	$('.apartments__carousel').owlCarousel({
	 		loop: true,
	 		items: 3,
	 		navigation: true,
	 		navigationText: ['<span class="glyphicon glyphicon-menu-left" aria-hidden="true"></span>','<span class="glyphicon glyphicon-menu-right" aria-hidden="true"></span>']
	 	});
	 	/*carousel end*/
	 	sliderSizes();
	 	/*slider*/
	 	if($('.slider').length){
	 		window.condition = true;
	 		var parent = $('.slider-container');
	 		var lastElem = parent.find('.slider__slide:last');
	 		lastElem.css('margin-left', '-'+lastElem.width()+'px');
	 		parent.prepend(parent.find('.slider__slide:last'));
	 		parent.find('.slider__slide:eq(1)').addClass('active');
	 		$('.slider__slide').hover(function(){
	 			var index = $(this).index();
	 			if(!window.condition){
	 				return;
	 			}
	 			window.condition = false;
	 			if(index===0){
	 				var lastAgain = parent.find('.slider__slide:last');
	 				lastAgain.css('margin-left', '-'+lastElem.width()*2+'px');
	 				parent.prepend(lastAgain);
	 				var curSlide = $(this)
	 				/*delete margin from second slide's attribute */
	 					var style = curSlide.attr('style').split(';').splice(0,1);
	 					curSlide.attr('style',style.join(';'));
	 					/*delete margin from second slide's attribute end*/
	 				var elemsToMove = [];
	 				$('.slider__slide').each(function(){
	 					if($(this).attr('style').indexOf('margin')!= -1){
	 						elemsToMove.push($(this));
	 					}
	 				});
	 				elemsToMove.forEach(function(el){
	 					el.animate({marginLeft: '+='+lastAgain.width()},2000,function(){
	 						window.condition = true;
	 					});
	 				});
	 			}else{
	 				window.condition = true;
	 			}
	 		});
	 	}
	 	/*slider end*/
	});
	 $(window).resize(function(){
	 	videoPlayerHeight();
	 	sliderSizes();
	 })
})(jQuery);