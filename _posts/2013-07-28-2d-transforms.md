---
layout: post
title: 'Transforming Elements With the Power of CSS, Part 1: 2D Transforms'
---

This post is the first part of a 3 part series of posts which will serve as a rather thorough introduction to CSS transforms, transitions and animations. In this part you will find almost all you need to know about CSS' two dimensional transform functions.

## Introduction

CSS transforms have been around for a while now, making our lives on the internet more three dimensional one property at a time (and more interesting in the two dimensional realm).

If you are completely new to CSS transforms, here's a quick breifing:

CSS transforms let you manipulate the appearance of HTML elements with a few simple functions, all of which will be explained in this series. Using these functions you can, well, transform elements two dimensionally and also give them the appearance of having 3 dimensions all from the comfort of your very own stylesheets. Very cool.

## 2D Transforms

2D transforms, as their name implies, transform elements in two dimensions. To use 2D transforms, all you have to do is set the transform property of the desired element to a function and a value, like so:

{% highlight css %}
#id {
  transform: function(parameters);
}
{% endhighlight %}

For example:

{% highlight css %}
transform: translate(10px, 50px);
{% endhighlight %}

You can use more than one transform function on any element in order to apply multiple transforms to the same element. You do this by chaining the transform functions, seperated by a space. For example:

{% highlight css %}
transform: translate(10px, 50px) scale(1.2);
{% endhighlight %}

Next, we will see what transform functions are available and what they do.

## Translate

2D translation moves the element by the specified X and Y offsets. It is important to note the the layout of the page will not be affected by translating an element. This is true for all transform functions. What this means is that when an element is transformed, it will still take up exactly the same space it took before being transformed.

_**Why not just move the element around by changing the top/left/bottom/right properties of the element, you ask?**_

The answer is that animating elements using translate instead of positioning takes advantage of browser optimization, making the animation much smoother ([You can read all about that here](http://css-tricks.com/tale-of-animation-performance/)). Also, using translate is more simple because you just have to say the offset and your done, instead of having to deal with the position property and shifting everything into place.

The translate function takes either 1 or 2 parameters, the first being the X offset and the optional second parameter being the Y offset. For example:

{% highlight css %}
/* moves the element 100px on the X axis */
transform: translate(100px);

/* moves the element 100px on the Y axis */
transform: translate(0, 100px);
{% endhighlight %}

The transform function accepts any measure of length including negative values to shift elements the opposite way.

Another option is using the functions translateX and translateY which each take one parameter as the X or Y offset respectively.

<p data-height="260" data-theme-id="211" data-slug-hash="fwBDH" data-user="agelber" data-default-tab="result" class='codepen'>See the Pen <a href='http://codepen.io/agelber/pen/fwBDH'>Translate Demo</a> by Assaf Gelber (<a href='http://codepen.io/agelber'>@agelber</a>) on <a href='http://codepen.io'>CodePen</a></p>

## Scale

2D scaling changes the size of the element according to the given parameter. The scale function, similar to translate takes two parameters, the first being the multiplier for the X axis and the second optional parameter for the Y axis. However, Unlike the translate function, when only one parameter is passed to scale, the given parameter will be used for both X and Y. For example:

{% highlight css %}
/* yields an element 1.5 times longer in the X axis and unchanged in the Y axis */
transform: scale(1.5, 1);

/* yields an element half as long on both the X and Y axes */
transform: scale(0.5)
{% endhighlight %}

scale only accepts unitless numbers as it's parameters, multiplying the length of each axis by the given number. This means that any number greater than 1 will make the element bigger and any number between 0 and 1, will make it smaller.

Just like the translate function, you can use scaleX and scaleY to specify a scale in only one axis.

<p data-height="260" data-theme-id="211" data-slug-hash="likrn" data-user="agelber" data-default-tab="result" class='codepen'>See the Pen <a href='http://codepen.io/agelber/pen/likrn'>Scale Demo</a> by Assaf Gelber (<a href='http://codepen.io/agelber'>@agelber</a>) on <a href='http://codepen.io'>CodePen</a></p>

## Rotate

2D rotation rotates an element and it's content clockwise. For example:

{% highlight css %}
/* rotates an element a quarter of a turn clockwise */
transform: rotate(90deg);
{% endhighlight %}

The rotate function takes one parameter: the number of degrees to rotate which can be positive or negative.

In contrast to the previous functions, rotateX and rotateY exist but are used for 3D transforms, so we'll leave them for part 2.

<p data-height="260" data-theme-id="211" data-slug-hash="ahdls" data-user="agelber" data-default-tab="result" class='codepen'>See the Pen <a href='http://codepen.io/agelber/pen/ahdls'>Rotate Demo</a> by Assaf Gelber (<a href='http://codepen.io/agelber'>@agelber</a>) on <a href='http://codepen.io'>CodePen</a></p>

## A Word About Origin

The origin of a transform is the point from or around which the transform is applied. You can change the origin of a transform to acheive different effects. Note that not all transform functions are affected by the origin. To change the origin, use the transform-origin property like so:

{% highlight css %}
transfrom-origin: 10px 40px;
{% endhighlight %}

By default, the origin is 50% 50%, the center of the element.
You can set the origin using any length values (e.g. pixels, percentages) or with the keywords top/left/bottom/right/center. The measurements are taken from the top-left corent of the element.

<p data-height="200" data-theme-id="211" data-slug-hash="xDtor" data-user="agelber" data-default-tab="result" class='codepen'>See the Pen <a href='http://codepen.io/agelber/pen/xDtor'>Origin Demo</a> by Assaf Gelber (<a href='http://codepen.io/agelber'>@agelber</a>) on <a href='http://codepen.io'>CodePen</a></p>

## Skew

Skewing tilts an element along the specified axis, turning a rectangular element into a parallelogram. Although the skew function exists, it is only there to keep compatibility with early drafts of the spec. Instead use skewX and skewY to skew along the X and Y axes respectively.
For example:

{% highlight css %}
/* skews the element 30 degress along the X axis and 60 degrees along the Y axis */
transform: skewX(30deg) skewY(60deg);
{% endhighlight %}

The skew function accepts any value in degrees, including negative degrees to skew the other way.

<p data-height="260" data-theme-id="211" data-slug-hash="tyfku" data-user="agelber" data-default-tab="result" class='codepen'>See the Pen <a href='http://codepen.io/agelber/pen/tyfku'>Skew Demo</a> by Assaf Gelber (<a href='http://codepen.io/agelber'>@agelber</a>) on <a href='http://codepen.io'>CodePen</a></p>

## Conclusion

These were all the 2D transforms CSS has to offer at the moment. Use them wisely and you can acheive some really cool stuff.

<p><strike>A link to part 2 will show up here as soon as it's up, so check back soon!</strike></p>

_**Edit:** Part 2 is up and [can be found here](/3d-transforms/)!_

<script async="async" src="http://codepen.io/assets/embed/ei.js"> </script>