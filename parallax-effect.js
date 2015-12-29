// Create array of all parallax elements
var elements = new Array();

// Adding each element to array
function addObject(el, DOM, host) {
	// Adding data from DOM object to jQuery object (data are more specified in parallax-object.html)
	el.data('speedCoef',DOM.speedCoef);
	el.data('spaceRotation', DOM.spaceRotation);
	el.data('rotationCoef', DOM.rotationCoef);
	el.data('startingRotation', DOM.startingRotation);
	el.data('parallaxWidth', DOM.parallaxWidth);
	el.data('top',el.offset().top);
	el.data('left',el.offset().left);
	el.data('bottom',el.offset().top + host.height());
	el.data('right', el.offset().left + host.height());
	// Push element to array
	elements.push(el);

	// While all elements will be pushed
	if(elements.length == $('parallax-object').length) {
		// Call parallax effect with elements as parametr
		parallax(elements)
	}

}

// Checking if element is in viewport
function inViewport(el, values, tolerance) {
	// Getting offset of all borders of element
	var top = el.data('top');
	var left = el.data('left');
	var bottom = el.data('bottom');
	var right = el.data('right');

	// Veryfing that element is on current viewport
	return (
		top < values[2] + tolerance &&
		bottom + tolerance > values[0] &&
		left < values[3] + tolerance &&
		right + tolerance > values[1]
	)

}

// Parallax effect itself
function parallax(els) {
	// On every page scroll
	$(window).scroll(function(){
		parallaxEffect(els);
	});

	// If user resize window
	$(window).resize(function(){
		parallaxEffect(els);
	});
}

function parallaxEffect(els) {
	// Getting offset off all borders of window
	var wTop = $(window).scrollTop();
	var wLeft = $(window).scrollLeft();
	var wBottom = wTop + $(window).height();
	var wRight = wLeft + $(window).width();

	var values = [wTop, wLeft, wBottom, wRight];

	// For each element in array (all parallax objects)
	for(var i = 0; i < els.length; i++) {
		// Check if element is in viewport
		if(inViewport(els[i], values, 50)) {
			// If element is in viewport get his offset of bottom windows border and edit it with speed coeficient 
			var distance = (wBottom - els[i].parent().offset().top) / 5 * els[i].data('speedCoef');
			// Edit element top style so it looks like it moves
			els[i].css('top', distance);
			// If element has rotationCoef option
			if(els[i].data('rotationCoef') != 0) {
				// Calculate rotation value
				var rotation = parseInt(els[i].data('startingRotation')) + (wBottom - els[i].parent().offset().top) / 20 * els[i].data('rotationCoef');
				// Change CSS (webkit and moz engine)
				els[i].css({ WebkitTransform: 'rotate(' + rotation + 'deg)'});
				els[i].css({ '-moz-transform': 'rotate(' + rotation + 'deg)'});
			}
			// If element has spaceRotation option
			if(els[i].data('spaceRotation') != 0) {
				// Calculate rotation value
				var zrotation = (wBottom - els[i].parent().offset().top) / 10 * els[i].data('spaceRotation');
				// Change CSS (webkit and moz engine)
				var childrenEl = els[i].find('.3dRotate');
				childrenEl.css({ WebkitTransform: 'rotate3d(1,1,1,' + zrotation + 'deg)'});
				childrenEl.css({ '-moz-transform': 'rotate3d(1,1,1,' + zrotation + 'deg)'});
			}
			// If element has parallax width value
			if(els[i].data('parallaxWidth') != 0) {
				var currentWidth = ((wBottom - els[i].parent().offset().top) / $(window).height()) * parseInt(els[i].data('parallaxWidth'));
				els[i].css('left', currentWidth);
			}
		}	
	};
}

// Do this while element is ready
$(document).ready(function(){
	setTimeout(function(){
		$(window).scrollTop(0);
		// Call parallaxEffect first time
		parallaxEffect(elements);
		// If parallaxReady function exist
		if(typeof parallaxReady == 'function') {
			// Execute it
			parallaxReady();
		}
	}, 1000);

	// This scrolling part is added because whenever page is loaded scroll event is not called yet and elements are loaded
	// in wrong position and on first scroll they jump to correct position so I trigger scroll event with it
	// ParallaxReady function is created for user callback option so whenever user wants to use this he can do something after that
	// parallax will be load (for example delete loading button etc...)

});