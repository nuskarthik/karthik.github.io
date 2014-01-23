---
layout: post
title: 'Adding Facebook Login to Your Rails App in 8 minutes'
---

This short tutorial should set you on your way to adding the option to log in with facebook to your rails application using the `omniauth-facebook` gem. After doing this a couple of times, I am sure you will be able to do it in 8 minutes or under.

## 1. Creating an app on Facebook

The first thing you need to do is create an app on [the Facebook developers apps page](https://developers.facebook.com/apps/) by clicking the 'Create New App' button. This will enable us to use the Facebook SDK and the Graph API.

![Create app on Facebook](/images/fb-create-app.png)

After creating your app we need to enable tell Facebook how our app integrates with Facebook. Here we choose "Website with Facebook Login" and enter our site url. Note that only pages on this url can be used as the callback after the user approves your app, so for development purposes, I entered `http://localhost:3000`.

![Setup login with Facebook](/images/fb-setup.png)

## 2. Adding and initializing the `omniauth-facebook` gem

Now that our Facebook knows about our app and agrees for us to let users sign in to it, we use the [omniauth-facebook](https://github.com/mkdynamic/omniauth-facebook) gem to handle everything. This gem is really awesome, because you really have to write very little code to set it up and it will take care of all the rest.

Add it to your Gemfile and run `bundle install`.

{% highlight ruby %}
gem 'omniauth-facebook'
{% endhighlight %}

Next, we need to initialize omniauth and set the provider to Facebook. To do this we create a new file in the initializers directory of our rails app called `/config/initializers/omniauth.rb` and configure omniauth:

{% highlight ruby %}
OmniAuth.config.logger = Rails.logger

Rails.application.config.middleware.use OmniAuth::Builder do
  provider :facebook, FACEBOOK_APP_ID, FACEBOOK_APP_SECRET
end
{% endhighlight %}

Insert your app id and secret written in the basic settings page of your app on facebook to the appropriate places.

## 3. Routing the omniauth callback

Now if you visit `/auth/facebook` you will be redirected to Facebook to approve logging in with your facebook account. Hit 'Okay' and you will see a rails error message. This is because we haven't routed omniauth's callback url to an action. Omniauth uses the template `/auth/:provider/callback` as the callback for each provider, so inorder to direct the route to an action, add to `/config/routes.rb`:

{% highlight ruby %}
get 'auth/:provider/callback', to: 'sessions#create'
get 'logout', to: 'sessions#destroy'
{% endhighlight %}

You can keep track of sessions however you like, the important thing is to create the user, so your controller might look something like this: 

{% highlight ruby %}
class SessionsController < ApplicationController
  def create
    user = User.omniauth(env['omniauth.auth'])
    session[:user_id] = user.id
    redirect_to root_url
  end

  def destroy
    session[:user_id] = nil
  end
end
{% endhighlight %}

Here we are using the `omniauth` method of the `User` class that we don't yet have, we will write that up in the next section.

## 4. Creating users

To load and save users to our database, we first need to create a user model:

{% highlight sh %}
rails g model user provider uid name image token expires_at:datetime
{% endhighlight %}

(See [omniauth-facebook's README](https://github.com/mkdynamic/omniauth-facebook) to see all the available information)

Now to actually persist users, in `/app/models/user.rb`:

{% highlight ruby %}
class User < ActiveRecord::Base
  def self.omniauth(auth)
    where(auth.slice(:provider, :uid)).first_or_initialize.tap do |user|
      user.provider = auth.provider
      user.uid = auth.uid
      user.name = auth.info.name
      user.image = auth.info.image
      user.token = auth.credentials.token
      user.expires_at = Time.at(auth.credentials.expires_at)
      user.save!
    end
  end
end
{% endhighlight %}

What we do here is take the first user with the given provider and uid or initialize a new one if one doesn't exist. Then, we use `tap` to send that user to the block. In the block we insert the user's attributes from the auth object we recieved and save it.

## 5. Win

The last thing to do is link to `/auth/facebook` and all will be taken care of.

Now you can handle your users like you normally would, maybe writing a `current_user` method to get the current logged on user or whatever you are used to working with. From there you can access the user's information you saved and use the Facebook Javascript SDK to use the Graph API as the logged on user.