; /*in code before this script developer can forget to print a symbol ";" , in this case  we will not take a mistakes */
(function($){ /*closure for a working in local scope, function takes a parametr $ as a jQuery and  in case if symbol $ is used before or after by another js library, we will not take a conflict*/
	 $(function(){ /*document.ready*/
	 	$('.menu-trigger__icon').click(function(){
	 		/* toggle mobile menu modificator*/
	 		$('.header').find('.navigation-container').toggleClass('navigation-container_enabled');
	 	});
	});
})(jQuery);