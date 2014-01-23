---
layout: post
title: 'Using The HTML Offline Application Cache'
---

HTML5 brought with it the possibility to tell the browser to download certain files of the developer's choice to be available when trying to browse to the site with no internet connection. This is pretty awesome where relevant, so let's take a look at it.

## Introduction

Enabling your app to work offline is a piece of cake, as you will see in this post, but that doesn't mean it should be used everywhere. There is no reason, obviously to use the appcache for apps that rely on real-time data, however, for calendars, notes, maybe even blogs it could be very beneficial to access saved data when an internet connection is not available.

## Manifest Your Desires

The core part of the appcache is the manifest file. The manifest file, linked to directly from the `html` element of the page is where you specify to the browser which file to cache, which to require an internet connection for and fallbacks using the `manifest` attribute. All you have to do is link to the file like so:

{% highlight html %}
<html manifest="app.manifest">
  <head>
  ...
{% endhighlight %}

### Inside The Manifest File

The first line of the manifest must contain the following line:

{% highlight html %}
CACHE MANIFEST
{% endhighlight %}

And then it divides into 3 section:

#### `CACHE:`

In this section, list all the files that you want cached (the HTML file pointing to the manifest will be cached automatically, so you can leave it out). For example: 

{% highlight html %}
CACHE MANIFEST
CACHE:
/site.css
/site.js
/logo.svg
{% endhighlight %}

This will download and cache a css file, a javascript script and an SVG logo as well as the html file in which the manifest link appeared.

The `CACHE` section is the default section so feel free to leave out the section header and just list the files directly after the first line.

#### `NETWORK:`

In the network section, list the files that require a connection to the server and should not be cached, anything that is not relevant when working offline. Adding it to the manifest from the previous section: 

{% highlight html %}
CACHE MANIFEST
/site.css
/site.js
/logo.svg

NETWORK:
/something_that_updates_periodically.js
/this_requires_network.html
/realtime/
{% endhighlight %}

As seen in the example, the network section can contain wildcards for multiple files.

#### `FALLBACK:`

The fallback section contains pairs of URIs where the second in each pair is used as a fallback for when the first is not available. This section, like the previous can contain wildcards, so for example, if you wanted to display a custom error message when certain files can not be viewed offline you could add: 

{% highlight html %}
FALLBACK:
/realtime/ /offline.html
{% endhighlight %}

or for using different scripts or css files for online and offline viewing:

{% highlight html %}
NETWORK:
/online.js
/online.css

FALLBACK:
/online.js /offline.js
/online.css /offline.css
{% endhighlight %}

#### And Comments

Any line beginning with a `#` will be ignored, so insert comments to make things clearer when needed.

## One More Thing To Keep In Mind

When caching files, as long as the manifest file hasn't changed, the files will not be downloaded again, so it is advised to put a comment in the manifest file and change it, even if by one character, every time one of the cached file changes. For example, the date and time of the update or a revision number. That way the browser will detect that something has changed, download the files again and save you the frustration of trying to figure out why the changes you made aren't showing up.