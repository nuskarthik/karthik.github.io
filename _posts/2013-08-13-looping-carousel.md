---
layout: post
title: 'Tutorial: CSS Looping Carousel'
---

This post is a tutorial on how to make a looping carousel with mostly CSS and a little bit of javascript, just like the one I have for my short bio. I will go over all the steps to make one and how to customize it to your liking.

<p data-height="260" data-theme-id="211" data-slug-hash="rAuaf" data-user="agelber" data-default-tab="result" class='codepen'>See the Pen <a href='http://codepen.io/agelber/pen/rAuaf'>Carousel Tutorial Demo</a> by Assaf Gelber (<a href='http://codepen.io/agelber'>@agelber</a>) on <a href='http://codepen.io'>CodePen</a></p>

## What You'll Need

There are 4 components to this carousel:
- HTML containing the items to loop through
- CSS to style the items
- Keyframe animations to set how they loop
- Some javascript to handle clicks and start the animation

Let's look through each component and see how this works:

## The HTML

What I have is an unordered list, which for this tutorial we will give the class `carousel` with a number of items in it and to buttons for navigation between the items. For example:

{% highlight html %}
<ul class="carousel">
  <li>Item Number 1</li>
  <li>Item Number 2</li>
  <li>Item Number 3</li>
  <li>Item Number 4</li>
</ul>

<a href="#" class="carousel-nav prev"><</a>
<a href="#" class="carousel-nav next">></a>
{% endhighlight %}

Anything will work inside the list items: text, images, more lists.. you name it. The important thing is to keep this structure so that the CSS and javascript will work.

## The CSS

What we want to do, is have all the items stacked on top of each other, but only one of them visible. The way I acheived this is positioned the items absolutely and set the `display` property of all the items which do not have the `active` class to `none`, like so:

{% highlight css %}
.carousel {
  position: relative;
  list-style: none;
}

.carousel > li {
  position: absolute;
}

.carousel > li:not(.active) {
  display: none;
}
{% endhighlight %}

I also set the carousel postiioning to `relative` to have the items positioned relative to the carousel and set the list style to `none` to get rid of the bullets.

Note that here is where you can style your items however you like.

## Keyframes

This is the really cool part. I created 4 different keyframe animations, one for each option of looping: next-in, next-out, prev-in and prev-out. When the 'next' button is clicked, the item animating into view will get the `next-in` animation and the one going out will get the `next-out` animation, same goes for the the 'previous' button with `prev-in` and `prev-out`.

This is where you can get really creative about how you want your animation to look. I went with something pretty solid, but you can get really wacky with how items appear and disappear.

Writing the animations is pretty straightforward. In my case:

<div class='highlight'>
  <pre>
    <code class='css'>
<span class='p'>@</span><span class='nt'>keyframes</span> <span class='nt'>next-in</span> <span class='p'>{</span>
  <span class='m'>0</span><span class='o'>%</span> <span class='p'>{</span>
    <span class='k'>opacity</span><span class='o'>:</span> <span class='m'>0</span><span class='p'>;</span>
    <span class='n'>transform</span><span class='o'>:</span> <span class='n'>translateY</span><span class='p'>(</span><span class='m'>50px</span><span class='p'>);</span>
  <span class='p'>}</span>
  <span class='nt'>100</span><span class='o'>%</span> <span class='p'>{</span>
    <span class='k'>opacity</span><span class='o'>:</span> <span class='m'>1</span><span class='p'>;</span>
    <span class='n'>transform</span><span class='o'>:</span> <span class='n'>translateY</span><span class='p'>(</span><span class='m'>0px</span><span class='p'>);</span>
  <span class='p'>}</span>
<span class='p'>}</span>

<span class='p'>@</span><span class='nt'>keyframes</span> <span class='nt'>next-out</span> <span class='p'>{</span>
  <span class='m'>0</span><span class='o'>%</span> <span class='p'>{</span>
    <span class='k'>opacity</span><span class='o'>:</span> <span class='m'>1</span><span class='p'>;</span>
    <span class='n'>transform</span><span class='o'>:</span> <span class='n'>translateX</span><span class='p'>(</span><span class='m'>0px</span><span class='p'>);</span>
  <span class='p'>}</span>
  <span class='nt'>100</span><span class='o'>%</span> <span class='p'>{</span>
    <span class='k'>opacity</span><span class='o'>:</span> <span class='m'>0</span><span class='p'>;</span>
    <span class='n'>transform</span><span class='o'>:</span> <span class='n'>translateX</span><span class='p'>(</span><span class='m'>-50px</span><span class='p'>);</span>
  <span class='p'>}</span>
<span class='p'>}</span>

<span class='p'>@</span><span class='nt'>keyframes</span> <span class='nt'>prev-in</span> <span class='p'>{</span>
  <span class='m'>0</span><span class='o'>%</span> <span class='p'>{</span>
    <span class='k'>opacity</span><span class='o'>:</span> <span class='m'>0</span><span class='p'>;</span>
    <span class='n'>transform</span><span class='o'>:</span> <span class='n'>translateX</span><span class='p'>(</span><span class='m'>-50px</span><span class='p'>);</span>
  <span class='p'>}</span>
  <span class='nt'>100</span><span class='o'>%</span> <span class='p'>{</span>
    <span class='k'>opacity</span><span class='o'>:</span> <span class='m'>1</span><span class='p'>;</span>
    <span class='n'>transform</span><span class='o'>:</span> <span class='n'>translateX</span><span class='p'>(</span><span class='m'>0px</span><span class='p'>);</span>
  <span class='p'>}</span>
<span class='p'>}</span>

<span class='p'>@</span><span class='nt'>keyframes</span> <span class='nt'>prev-out</span> <span class='p'>{</span>
  <span class='m'>0</span><span class='o'>%</span> <span class='p'>{</span>
    <span class='k'>opacity</span><span class='o'>:</span> <span class='m'>1</span><span class='p'>;</span>
    <span class='n'>transform</span><span class='o'>:</span> <span class='n'>translateY</span><span class='p'>(</span><span class='m'>0px</span><span class='p'>);</span>
  <span class='p'>}</span>
  <span class='nt'>100</span><span class='o'>%</span> <span class='p'>{</span>
    <span class='k'>opacity</span><span class='o'>:</span> <span class='m'>0</span><span class='p'>;</span>
    <span class='n'>transform</span><span class='o'>:</span> <span class='n'>translateY</span><span class='p'>(</span><span class='m'>50px</span><span class='p'>);</span>
  <span class='p'>}</span>
<span class='p'>}</span>
    </code>
  </pre>
</div>

And to add the animations to the elements:

{% highlight css %}
.carousel > li.next-in {
  animation: next-in 0.5s;
}

.carousel > li.next-out {
  animation: next-out 0.5s;
}

.carousel > li.prev-in {
  animation: prev-in 0.5s;
}

.carousel > li.prev-out {
  animation: prev-out 0.5s;
}
{% endhighlight %}

or if you're using SASS, this little snippet will save you some typing:

{% highlight css %}
@each $anim in next-in, next-out, prev-in, prev-out
  .carousel > li.#{$anim}
    animation: #{$anim} 0.5s
{% endhighlight %}

## The Javascript

What we want to do in our javascript is catch the click event of our buttons and add the appropriate classes to the current item and the next (or previous) one. I'm using jQuery for this:

{% highlight javascript %}
$(function() {
  var currentIndex = 0,
      itemCount    = $('.carousel > li').length;

  /* add the active class to the first item to hide all the others */
  $('.carousel > li:eq(' + currentIndex + ')').addClass('active');

  $('.carousel-nav').on('click', function() {
    var $active  = $('.carousel > li.active'),
        isNext   = $(this).hasClass('next');
    currentIndex = (currentIndex + (isNext ? 1 : -1)) % itemCount;

    /* go back to the last item if we hit -1 */
    if (currentIndex === -1) {
      currentIndex = itemCount - 1;
    }

    var $next = $('.carousel > li:eq(' + currentIndex + ')');
    $active.addClass(isNext ? 'next-out' : 'prev-out');
    $next.addClass('active').addClass(isNext ? 'next-in' : 'prev-in');
    setTimeout(function() { 
      $active.removeClass('active next-out prev-out');
      $next.removeClass('next-in prev-in')
    }, 500);
    return false;
  });
});
{% endhighlight %}

What I did is first of all, add the `active` class to the first item and then add the click handler to the navigation buttons. When clicked, we find the active item and the index of the next item we want to display by checking if the button that was clicked has the `next` class. Then, we find the index of the next item, making sure not to go to -1, find the item by its index and add the `active` class and the classes for the animations by checking if the next or previous button was clicked. Lastly, after the animation is over, we remove all the classes we no longer need and return false so that the '#' doesn't show up in the browser's address bar.

## Conclusion

I like this carousel because it is very simple to add to any site but is still highly customizable. I'm sure that if you get a little more creative than what I did on here, you could do really awesome things. Feel free to try it out and show me in the comments.

<script async="async" src="http://codepen.io/assets/embed/ei.js"> </script>