$ ->
	#! Resize scroll >>>

	$scrollDiv = $ '<div />'
	$scrollDiv.css
		width: 99
		height: 99
		overflow: 'scroll'
		position: 'absolute'
		top: -9999
	$ 'body'
		.append $scrollDiv

	scrollBarWidth = $scrollDiv[0].offsetWidth - $scrollDiv[0].clientWidth
	$scrollDiv.remove()

	windowResizeScroll = ->
		if $(window).height() == $(document).height()
			$('html').css 'margin-right',scrollBarWidth
			$('.page').css 
				'margin-right': -scrollBarWidth
				'padding-right': scrollBarWidth
			$('footer').css 
				'margin-right': -scrollBarWidth
				'padding-right': scrollBarWidth

	do windowResizeScroll

	$ window
		.resize ->
			do windowResizeScroll
	
	#! Resize scroll end <<<
