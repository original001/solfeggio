$ 'img[title]'
	.each ->
		$this = $(this)
		img_class = if $this.height() > $this.width() then 'img-vert' else 'img'
    if $this.attr('title') != false
        $this.wrap('<div class="' + img_class + '" style="width:' + $this.width() + 'px"></div>')
            .after('<p></p>')
            .next().text($this.attr('title'))

### ACCORDION (by Tolstikov) ###
$ document
	.on 'click', '.sidebar_inner, .product-nav-tabs__li', (e) ->
		th = $ this
		$target = $ e.target
		if $target.is('a') && $target.attr('href') && !/#|javascript:/i.test $target.attr 'href'
			e.stopPropagation()
			return

		e.preventDefault()
		isActive = th.hasClass 'open'
		isntEmpty = !!th.has('ul, div').length
		move = ($ctx, dir) ->
			$parent = $ctx.parent()

			if $parent.hasClass("sliding_#{dir}") then return

			if dir == 'down'
				methodClassControl = 'addClass'
				methodSliding = 'slideDown'
			else
				methodClassControl = 'removeClass'
				methodSliding = 'slideUp'

			$parent.addClass "sliding_#{dir}"
			$ctx[methodClassControl] 'open'
				.children 'ul, div'
				.first()[methodSliding] ->
					$parent.removeClass "sliding_#{dir}"
					return

			return

		if isActive
			move th, 'up'
			return
		else if isntEmpty
			move $('.' + th.attr('class') + '.open'), 'up'
			move th, 'down'

### ACCORDION END ###
			
### ANCHOR ###

$ '.anchor'
	.on 'click', (e) ->
		$ 'body, html'
			.animate
				scrollTop:0
			, 800

$ window
	.on 'scroll', ->
		$window = $ window
		windowScrollTop = $window.scrollTop()
		$anchor = $ '.anchor'
		footerOffset = $ 'footer'
			.offset().top
		if windowScrollTop > 100
			$anchor.addClass 'show'
		else 
			$anchor.removeClass 'show'
			return

		if footerOffset < windowScrollTop + $window.height()
			$anchor.addClass 'abs'
		else
			$anchor.removeClass 'abs'

### ANCHOR END ###


$ '[data-slick-carousel]'
	.slick
		# accessibility: true # Enables tabbing and arrow key navigation
		# autoplay: false # Enables auto play of slides
		# autoplaySpeed: 3000 # Auto play change interval
		# centerMode: false # Enables centered view with partial prev/next slides. Use with odd numbered slidesToShow counts.
		# centerPadding: '50px' # Side padding when in center mode. (px or %)
		# cssEase:  'ease' # CSS3 easing
		# customPaging: 0 # Custom paging templates. See source for use example.
		# dots: false # Current slide indicator dots
		# dotsClass: 'slick-dots' # Class for slide indicator dots container
		# draggable: true # Enables desktop dragging
		# easing:  'linear' # animate() fallback easing
		# edgeFriction: 0.15 # Resistance when swiping edges of non-infinite carousels
		# fade: false # Enables fade
		# arrows: true # Enable Next/Prev arrows
		# appendArrows: # $(element) # Change where the navigation arrows are attached (Selector, htmlString, Array, Element, jQuery object)
		# appendDots:#  $(element) # Change where the navigation dots are attached (Selector, htmlString, Array, Element, jQuery object)
		# mobileFirst: false # Responsive settings use mobile first calculation
		# prevArrow: #tml#jQuery selector) # object (DOM node#jQuery object) # <button type="button" class="slick-prev">Previous</button> # Allows you to select a node or customize the HTML for the "Previous" arrow.
		# nextArrow: #tml#jQuery selector) # object (DOM node#jQuery object) # <button type="button" class="slick-next">Next</button> # Allows you to select a node or customize the HTML for the "Next" arrow.
		# infinite: true # Infinite looping
		# initialSlide: 0 # Slide to start on
		# lazyLoad: 'ondemand' # Accepts 'ondemand' or 'progressive' for lazy load technique
		# pauseOnHover: true # Pauses autoplay on hover
		# pauseOnDotsHover: false # Pauses autoplay when a dot is hovered
		# respondTo: 'window' # Width that responsive object responds to. Can be 'window', 'slider' or 'min' (the smaller of the two).
		# responsive: null # Object containing breakpoints and settings objects (see demo). Enables settings sets at given screen width. Set settings to "unslick" instead of an object to disable slick at a given breakpoint.
		# rows: 1 # Setting this to more than 1 initializes grid mode. Use slidesPerRow to set how many slides should be in each row.
		# slide: '' # Slide element query
		# slidesPerRow: 1 # With grid mode intialized via the rows option, this sets how many slides are in each grid row. dver
		# slidesToShow: 1 # # of slides to show at a time
		# slidesToScroll: 1 # # of slides to scroll at a time
		# speed: 300 # Transition speed
		# swipe: true # Enables touch swipe
		# swipeToSlide: false # Swipe to slide irrespective of slidesToScroll
		# touchMove: true # Enables slide moving with touch
		# touchThreshold: 5 # To advance slides, the user must swipe a length of (1/touchThreshold) * the width of the slider.
		# useCSS: true # Enable/Disable CSS Transitions
		# variableWidth: false # Disables automatic slide width calculation
		# vertical: false # Vertical slide direction
		# verticalSwiping: false # Changes swipe direction to vertical
		# rtl: false # Change the slider's direction to become right-to-left
		# waitForAnimate: true # Ignores requests to advance the slide while animating