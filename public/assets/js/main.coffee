$ ->
	scrollDiv = document.createElement("div");
	scrollDiv.style.cssText = 'width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;';
	document.body.appendChild(scrollDiv);
	scrollBarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
	document.body.removeChild(scrollDiv);

	if $(window).height() == $(document).height()
		$('html').css 'margin-right',scrollBarWidth
	
