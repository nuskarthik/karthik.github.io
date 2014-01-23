---
layout: post
title: 'Transforming Elements With the Power of CSS, Part 2: 3D Transforms'
---

This post is the second part of a 3 part series of posts which will serve as a rather thorough introduction to CSS transforms, transitions and animations. In this part you will find almost all you need to know about CSS' three dimensional transform functions.

## Introduction

First off, If you haven't already, I suggest reading [the first post in this series](/2d-transforms/) which was all about two-dimensional transform functions. This part will be quite similar to the previous one, with the major difference being that it will discuss 3D transforms.

## 3D Transforms

It is awesome, if you ask me, that you can acheive three-dimensional effects in the browser with such ease using CSS only. With 3-dimensional transforms, a z-axis is added to the objects, letting us distort elements on a third plane. The syntax is identical to 2D transforms except now you will use 3D functions instead of the 2D ones from part 1. The only other addition is the `perspective` property which we will talk about first.

## Let's Put Things Into Perspective

Without perspective all elements would appear flat (and so they do if the perspective is set to `none`). What `perspective` does, is distort the elements to appear more in tune with how we percieve 3D objects, essentially making closer things appear larger and farther things smaller.

The perspective property sets the distance between the z-plane and the user using any length value so that the smaller the perspective the larger "close" things are.

Differently from what we saw so far, the `perspective` property is set on the parent element of the transformed object. So, for example, your css could look something like this:

{% highlight css %}
.parent {
  perspective: 500px;
}

.parent .child {
  transform: rotateX(60deg); /* We will talk about rotateX in a minute */
}
{% endhighlight %}

There is one more way to set perspective for an element which is to use it like a transform function. so the previous example would look like this:

{% highlight css %}
.parent .child {
  transform: perspective(500px) rotateX(60deg);
}
{% endhighlight %}

This syntax is mostly used if you want to set the perspective for only a single element.

<p data-height="260" data-theme-id="211" data-slug-hash="JIAzw" data-user="agelber" data-default-tab="result" class='codepen'>See the Pen <a href='http://codepen.io/agelber/pen/JIAzw'>Perspective Demo</a> by Assaf Gelber (<a href='http://codepen.io/agelber'>@agelber</a>) on <a href='http://codepen.io'>CodePen</a></p>

### Origin

Just like with 2D transforms, the `transform-origin` property sets the point from or around which the transform is applied. However, for 3D transforms there also exists a `perspective-origin` property which sets the origin of the perspective, or the position the user is looking at. `perspective-origin` has to be set on the parent element along with the `perspective` property, otherwise it will do nothing.

<p data-height="260" data-theme-id="211" data-slug-hash="aIbAd" data-user="agelber" data-default-tab="result" class='codepen'>See the Pen <a href='http://codepen.io/agelber/pen/aIbAd'>Perspective Origin Demo</a> by Assaf Gelber (<a href='http://codepen.io/agelber'>@agelber</a>) on <a href='http://codepen.io'>CodePen</a></p>

## Translate

Translation works exactly the same as with 2D translation, but now we can also set a value to translate on the z-axis making elements appear closer to the user or farther.

Three dimensional translation can be set with either:
{% highlight css %}
transform: translate3d(10px, 20px, 30px);
{% endhighlight %}

or:

{% highlight css %}
/* along with translateX and translateY */
transform: translatez(30px);
{% endhighlight %}

The advantage of the first possibility is that it is shorter, other than that, they are identical.

<p data-height="260" data-theme-id="211" data-slug-hash="wAgzI" data-user="agelber" data-default-tab="result" class='codepen'>See the Pen <a href='http://codepen.io/agelber/pen/wAgzI'>TranslateZ Demo</a> by Assaf Gelber (<a href='http://codepen.io/agelber'>@agelber</a>) on <a href='http://codepen.io'>CodePen</a></p>

## Scale

Similarly to translation, 3D scaling is just like 2D scaling but on the z-axis, i.e. it multiplies the size of the element by the given value on the z-plane. And just like with translate, for 3D scaling you can either use `scale3d` and pass in 3 values or `scaleZ` along with `scaleX` and `scaleY`.

<p data-height="260" data-theme-id="211" data-slug-hash="pfJwz" data-user="agelber" data-default-tab="result" class='codepen'>See the Pen <a href='http://codepen.io/agelber/pen/pfJwz'>ScaleZ Demo</a> by Assaf Gelber (<a href='http://codepen.io/agelber'>@agelber</a>) on <a href='http://codepen.io'>CodePen</a></p>

## Rotate

3D rotation causes an element to be rotated around the origin so the one edge becomes closer and the opposite one becomes farther away. This can be done on the x-axis (causing the top and bottom edges move) or the y-axis (left and right edges move). To do this, use the `rotateX` and `rotateY` functions which I mentioned earlier like so:

{% highlight css %}
/* causes the bottom edge to become closer */
transform: rotateX(30deg);

/* causes the left edge to become closer */
transform: rotateY(60deg);
{% endhighlight %}

`rotateX` and `rotateY` accept degrees, positive or negative.

Another option is using `rotate3d` which takes four arguments, the first 3 being a direction vector around which the rotation is applied, and the fourth is the amount of rotation to apply. For example:

{% highlight css %}
/* rotates the element 45 degrees around the [1,2,0] direction vector */
transform: rotate3d(1, 2, 0, 45deg);
{% endhighlight %}

(You can also rotate around the z-axis with `rotateZ` but it as the same as using the 2D `rotate` function.)

<p data-height="260" data-theme-id="211" data-slug-hash="ICGpc" data-user="agelber" data-default-tab="result" class='codepen'>See the Pen <a href='http://codepen.io/agelber/pen/ICGpc'>RotateX and Y Demo</a> by Assaf Gelber (<a href='http://codepen.io/agelber'>@agelber</a>) on <a href='http://codepen.io'>CodePen</a></p>

## Coming Clean

I lied in part 1. Those weren't all the transform functions. I left out the all-important `matrix`.

You can think of all the transform functions, both 2D and 3D, as shorthand ways of generating matrixes. Matrixes are used by browsers in order to calculate the new position of every point in the element using linear algebra. The `matrix` and `matrix3d` functions allow you to manually specify the transform matrix to be used.

There is no reason, in my opinion, to use these functions (except maybe to reduce the size of your css files) when you can use all the other available functions. It is important to know them and maybe understand how they work, but I won't go into that here. You can read all about matrixes in [this article](http://dev.opera.com/articles/view/understanding-the-css-transforms-matrix/).

## More cool things

Two more things I want to talk about:

#### Backface Visibility

What happens when an element is rotated more than 90 degrees? By default, the user will see the content of the element reversed. However, setting the `backface-visibility` property of an element to `hidden` will cause the "back side" of the element to be invisible (which can help create some neat effects).

#### Transform Style

By default, the children of a transformed element are positioned flattened. However, setting the `transform-style` of an element to `preserve-3d`, causes the children of the element to be positioned in the 3D space.

## Conclusion

The effects you can create with 3D transforms are really unbelievable, especially taking into consideration the effort it takes and the fact that it is all done in your stylesheets. Master these functions and you will acheive 3D greatness.

In part 3, I will talk all about transitions and animations which make these first two parts even more worthwhile.

_**Edit:** And it's up! [Right here](/transition-and-animation/)._

<script async="async" src="http://codepen.io/assets/embed/ei.js"> </script>