---
layout: post
title: 'Transforming Elements With the Power of CSS, Part 3: Transition and Animation'
---

This post is the third and last part of a series of posts which will serve as a rather thorough introduction to CSS transforms, transition and animation. In this part we will use all the transform functions and more to animate elements.

## Introduction

Now that you can move, strech, twist and turn elements in the browser _(If you can't you might wanna take a look [here for 2D transforms](/2d-transforms/) and [here for 3D](/3d-transforms/))_ we will take all those functions and utilize them to animate elements to give some special effects to your site's user experience.

Both trasitions and animations can be used with other css properties (A list of animatable properties [can be found here](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animated_properties)), not only transfroms, but animtaing with transorms is very useful and common, so I included them in the series.

## Transitions

CSS transitions are used to animate the change from one state of an element to another. For example, I think the most common use is the normal, hover and active state of a button. When there is no interaction with a button it looks one way, when the user hovers over the button with the mouse it changes a bit to indicate the button can be clicked (maybe the button moves up and some shadowing is added) and finally when the user clicks the button it is changed again to show that it was clicked (maybe moved down or scaled down slightly). Instead of having the button jump from one state to the next, you can use the transition property to gradually change each property for a smoother effect.

The transition property has 4 attributes:

#### `transition-property`

Specifies which property will be transitioned. Can be set to `all` to transition all the properties of the element.

#### `transition-duration`

Specifies the number of seconds or miliseconds the transition will take.

#### `transition-timing-function`

Timing functions are used to set how the intermediate values are computed. Different timing functions create different effects. ([You can read more about timing functions here](https://developer.mozilla.org/en-US/docs/Web/CSS/timing-function))

#### `transition-delay`

Specifies the amount of seconds or miliseconds to wait before starting the transition.

So you would get something like this:

{% highlight css %}
transition-property: all;
transition-duration: 0.5s; /* or 500ms */
transition-timing-function: ease-in;
transition-delay: 0.25s;
{% endhighlight %}

#### The Shorthand Way

The shorthand `transition` property is a way to define all four of the transition properties (or only part of them) at once and is very convenient instead of having to write out all four.

So the above would be:

{% highlight css %}
transition: all 0.5s ease-in 0.25s;
{% endhighlight %}

You can set multiple transitions to have different transitions for different properties by chaining the shorthand properties delimited by commas or chaining each value in every attribute delimited by commas in the same order in each attribute. For example this:

{% highlight css %}
transition: transform 0.25s ease 0.25s, color 0.5s linear 0.1s;
{% endhighlight %}

is the shorthand way of writing this:

{% highlight css %}
transition-property: transform, color;
transition-durations: 0.25s, 0.5s;
transition-timing-function: ease, linear;
transition-delay: 0.25s, 0.1s;
{% endhighlight %}

<p data-height="260" data-theme-id="211" data-slug-hash="fxbAi" data-user="agelber" data-default-tab="result" class='codepen'>See the Pen <a href='http://codepen.io/agelber/pen/fxbAi'>Transition Demo</a> by Assaf Gelber (<a href='http://codepen.io/agelber'>@agelber</a>) on <a href='http://codepen.io'>CodePen</a></p>

## Keyframe Animations

CSS animations are a way to create a transition from one preset style to another unrelated to user interaction or state of the element. Animations consist of 2 parts: keyframes definition and the animation declaration.

#### Keyframes

The keyframes definition is where you create the sequence of the animation. It is defined by states over the duration of the animation in percentages or the keywords `from` and `to` as a shorthand way of writing `0%` and `100%`. You can configure a different styling configuration for each state in the animation. It looks like this:

{% highlight css %}
@keyframes ANIMTION-NAME {
  0% {
    transform: scale(0) rotate(0deg);
    opacity: 0;
  }
  50% {
    transform: scale(0.5) rotate(360deg);
  }
  100% {
    transform: scale(1) rotate(0deg);
    opacity: 1;
  }
}
{% endhighlight %}

In this example the animation appears as though the element is fading in while scaling up and turning 360 degrees clockwise and 360 degrees counter clockwise to return to the same position. You can have any amount of intermediate configurations that will be transitioned through according to the specified timing function.

The next step is defining the animation on the element. Just like with transitions, animations have a set of attributes that can be defined:

#### `animation-name`

Specifies the name of the animation to apply as defined in the keyframes definition.

#### `animation-duration`

Specifies how long the animation will take in seconds or miliseconds.

#### `animation-timing-function`

Same as with transitions, specifies which timing function to use.

#### `animation-delay`

Again, specifies how long to wait before starting the animation.

#### `animation-iteration-count`

Specifies how many times the animation will be played. Can be set to `infinite` to run forever.

#### `animation-direction`

Specifies if the animation should play normally, in reverse or alternating with the keywords `normal`, `reverse` and `alternate`.

#### `animation-fill-mode`

Specifies what style configuration to set on the element before or after the animation. Can be set to `none` to apply the normal style, `forwards` to keep the last frame executed, `backwards` to apply the first frame before the animation or `both` to set the style to the first frame before the animation and retain the style of the last frame after it.

#### `animation-play-state`

Specifies whether the animation is running or not with the keywords `running` and `paused`.

So with all these attributes, you would get this:

{% highlight css %}
animation-name: fade-in;
animation-duration: 1s;
animation-timing-function: linear;
animation-delay: 0.5s;
animation-direction: alternate;
animation-iteration-count: 6;
animation-fill-mode: both;
animation-play-state: running;
{% endhighlight %}

#### The Shorthand Way

As with transitions, you can use the `animation` property to set all the attributes at once, so that the above example becomes:

{% highlight css %}
animation: fade-in 1s linear 0.5s alternate 6 both running;
{% endhighlight %}

The only restraint is that, when used together, `animation-duration` must come before `animation-delay` so that in this example:

{% highlight css %}
animation: fade-in 1s 0.5s linear;
{% endhighlight %}

the duration will be 1 second and the delay will be half a second.

Setting multiple animations on an element is the same as setting multiple transitions, comma delimited shorthand properties or comma delimited seperate attributes which will be taken with respect to the order in which they are written.

<p data-height="260" data-theme-id="211" data-slug-hash="sjcFG" data-user="agelber" data-default-tab="result" class='codepen'>See the Pen <a href='http://codepen.io/agelber/pen/sjcFG'>Anmation Demo</a> by Assaf Gelber (<a href='http://codepen.io/agelber'>@agelber</a>) on <a href='http://codepen.io'>CodePen</a></p>

## Browser Support

Everything I showed in this series will not work in some browsers unless you prefix your CSS (check which browers need prefixes for which property with [caniuse](http://caniuse.com)). I like to use tools like Lea Verou's [-prefix-free](http://leaverou.github.io/prefixfree/) which enables me to write prefix-less CSS and everything will work fine in all browsers that support the properties. There are other tools out there to take care of prefixes and you can always write them out by hand, just be aware of the issue.

## Conclusion

That was a very thorough introduction to CSS transform functions (2D and 3D), transitions and animations. You now have all the skills you need to integrate these into your stylesheets and create some awesome things. It is important, however, not to overuse these. They can give a major boost to UX if used where appropriate, but can feel a bit tacky and overwhelming when overdone.

## One More Thing

If you want to practice or just play around, [codepen](http://codepen.io) is an excellent tool just for that (and then sharing your work). I use codepen all the time to try out little things (and also to integrate the demos into my posts). Highly recommended.

<script async="async" src="http://codepen.io/assets/embed/ei.js"> </script>