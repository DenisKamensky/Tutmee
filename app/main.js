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
	 		var namePattern = /[a-яА-Я]\s*[a-яА-Я]/i;
	 		var telPattern = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
	 		var nameResult = namePattern.test(userName);
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
	 		$('.guest-block__slider').on('mouseover','.slider__slide',function(){
	 			var slideOffset = $(this).offset().left;
	 			var firstMargin = parseInt(parent.find('.slider__slide').first().offset().left);
	 			var moveSize = slideOffset-firstMargin;
	 			var index = $(this).index();
	 			function toggleText(){
	 				var order = parent.find('.active').attr('data-order');
	 				$('.slide-headings__heading').removeClass('active');
	 				$('.slide-headings__heading').eq(order).addClass('active');
	 				$('.guest-block__slide-text').removeClass('active');
	 				$('.guest-block__slide-text').eq(order).addClass('active');
	 			};
	 			if(!window.condition||index===parent.find('.active').index()){ // exit from function if hover event not finished yet or hover element === active slide 
	 				return;
	 			}
	 			window.condition = false;
	 			if(index===0){ //move forward if hover element first
	 				var curSlide = $(this); 
	 				parent.find('.active').removeClass('active');
	 				var lastAgain = parent.find('.slider__slide:last');
	 				lastAgain.css('margin-left', '-'+lastElem.width()*2+'px');
	 				parent.prepend(lastAgain);
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
	 					el.animate({marginLeft: '+='+lastAgain.width()},1000,function(){
	 						curSlide.addClass('active');
	 						toggleText();
	 						window.condition = true;
	 						return;
	 					});
	 				});
	 			}else if(index!=($('.slider__slide:last').index())){
	 				var active = parent.find('.active');
	 				active.removeClass('active');
	 				if(index>active.index()){ //move forward if hover element not first and not last
	 					$('.slider__slide:first').animate({marginLeft: '-='+lastElem.width()},1000,function(){
	 						active.next().addClass('active')
	 						window.condition = true;
	 						toggleText();
	 						return;
	 					});
	 				}else{  //move back if hover element not first and not last
	 					$('.slider__slide:first').animate({marginLeft: '+='+lastElem.width()},1000,function(){
	 						active.prev().addClass('active');
	 						window.condition = true;
	 						toggleText();
	 						return;
	 					});
	 				}
	 			}else{ // if hover element last
	 				var active = parent.find('.active');
	 				active.removeClass('active');
	 				var appendEl = $('.slider__slide:first').clone(); //let's clone first slide and take infinit quantity of slides
	 				/*delete margin from clone slide's attribute */
	 					var style = appendEl.attr('style').split(';').splice(0,1);
	 					appendEl.attr('style',style.join(';'));
	 				/*delete margin from clone slide's attribute end*/
	 				$('.slider__slide:last').after(appendEl)
	 				$('.slider__slide:first').animate({marginLeft: '-='+lastElem.width()},1000,function(){
	 						var marginLeft = parseInt($('.slider__slide:first').css('margin-left'));
	 						$('.slider__slide:eq(1)').css('margin-left',marginLeft+lastElem.width());
	 						$('.slider__slide:eq(0)').remove();
	 						active.next().addClass('active');
	 						toggleText();
	 						window.condition = true;
	 						return;
	 					});
	 				
	 			}
	 		});
	 		$('.slide-headings__heading').click(function(){
	 			var order = $(this).index();
	 			// $('.slider__slide[data-order='+order+']').mouseover();
	 			var waitActive = setInterval(function(){
	 				if($('.slider__slide[data-order='+order+']').hasClass('active')){
	 					clearInterval(waitActive);
	 					return;
	 				}
	 				$('.slider__slide[data-order='+order+']').mouseover();
	 			},10);
	 			
	 		});
	 	}
	 	$('.slider__controls').click(function(){
	 		if($(this).attr('class').indexOf('next')!= -1){
	 			$('.slider__slide.active').next().mouseover();
	 		}else{
	 			$('.slider__slide.active').prev().mouseover();
	 		}
	 	});
	 	/*slider end*/
	});
	 $(window).resize(function(){
	 	videoPlayerHeight();
	 	sliderSizes();
	 })
})(jQuery);