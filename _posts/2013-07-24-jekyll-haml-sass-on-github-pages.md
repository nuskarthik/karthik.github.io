---
layout: post
title: Blogging With Jekyll, Haml and Sass On Github Pages
---

In this post I will give a short review about the things I used to create this blog. Specifically Jekyll along with Haml and Sass on Github Pages. I will talk a little bit about Jekyll in general and then dive into the tricky part: getting everything to work on Github.



## Pure Jekyll

First of all I have to start off by saying that [Jekyll](http://jekyllrb.com) is a breeze to learn and use thanks to [the excellent documentation](http://jekyllrb.com/docs/home), especially if you are planning on hosting your project on Github Pages (and not planning on using preprocessors). Jekyll was written by co-founder of Github, Tom Preston-Werner as way to generate blog-aware static sites extremely easily. To get a Jekyll site running all you need to do is write some layouts using [Liquid](http://liquidmarkup.org) along with HTML and CSS, write posts with your choice of [Markdown](http://daringfireball.net/projects/markdown/) or [Textile](http://textile.sitemonks.com/) (or straight up HTML), build and you're ready to go.  

## Enter Preprocessors

I love preprocessors. Specifically [Haml](http://haml.info) and [Sass](http://sass-lang.com), so, naturally, I wanted to use them when writing the layouts and pages as well as for styling everything. Now, If you're not planning on deploying to Github Pages, there are excellent plugins for doing just that, for example, [this converter](https://gist.github.com/radamant/481456)	(which will only do your static pages because Jekyll doesn't run layout files through converters, but [there are rake tasks to solve that as well](https://gist.github.com/connatser/1224454)).

However, for safety reasons, Github will not run any Jekyll plugins when building your site, meaning that the converter will not run and your site will not look the way you expected it to. They way I solved that is with [this little Rakefile](https://gist.github.com/agelber/5977827), which parses your Haml and Sass files by simply running:  

{% highlight sh %}
$ rake build
{% endhighlight %}

So now every time I want to deploy I run that task and all the files that Jekyll can work with are generated. If you only want to parse a specific part, you can also use:  
{% highlight sh %}
# For only haml files
$ rake haml
# For only haml posts
$ rake haml:posts
# For only sass files
$ rake sass
{% endhighlight %}

I found this to be the simplest way for me although there are many ways to acheive the same goal.

## Deploying

Normally, after running:

{% highlight sh %}
$ jekyll build 
{% endhighlight %}

your site will be ready for you in the `_site` directory and you can push that to your server and all will be well. When deploying to Github, however, you need to create a new repository named `yourusername.github.io` (which will also be the url of your site) and just push your project to there without the `_site` directory. In a matter of seconds, your site will be built on Github and be up for all the inhabitants of the internet to see!

## Last Words

The one thing that always got me when writing everything is the [YAML Front-Matter](http://jekyllrb.com/docs/frontmatter/). Jekyll will only process files that begin with the front-matter so remember to include them in your Haml files (add a '\' before the triple-dashes to tell Haml not to parse it as ruby code). I didn't remember at first and it took me a good period of time to figure out why nothing was working.

And one last thing that I think deserves a mention here even though it is not related to Jekyll, Haml, Sass or Github is [-prefix-free](http://leaverou.github.io/prefixfree/) by Lea Verou which I just included in my base layout file so I could write prefix-less Sass and everything just works out zero extra effort.