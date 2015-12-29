# Parallax object web component

This text file is included to explain how my web component (parallax-object) works.

Parallax object is a web component created with Polymer technology which has been released recently (end of 2015). Using
this technology we can easily import web components to our website or create new one and share it with large web developer
community.

Lets take a look on my parallax object. With this web component you can add any content and position it using absolute position
anywhere on your page. This absolute position has origin in its parent element so you can be more specific while positioning it.
Parallax object is created with few properties which can define its behaviour.

Here are all properties:

	absolute-top - default value is 0 and specify position from top
	absolute-bottom - default value is 0 and specify position from bottom
	absolute-left - default value is 0 and specify position from left
	absolute-right -default value is 0 and specify position from right
	speed-coef - default value is 0 and specify how fast will element move relatively to webpage
	starting-rotation - default value is 0 and specify rotation of content while page is loaded
	rotation-coef - default value is 0 and specify how fast will content rotate while scrolling
	space-rotation - default value is 0 and specify how fast will content rotate in space (3D rotation around its x,y and z axis)
	parallax-width - default value is 0 and specify how much to width element will move (for exemple if there is set 300px it
			 will move 300px to right from its starting position)

Here are some important facts about web component. Whole animation is occuring while element is in viewport so if you set parallax-width
to -300px it will move to left but animation starts while it appear on screen and ends while it disappear again. Because it takes a while
to load all script needed and add all elements to array etc... there is called function after parallax is loaded so you can create that
function and it will be automatically called after parallax loads function name is parallaxReady().

Thank you for using my web component,
Sonyck.
