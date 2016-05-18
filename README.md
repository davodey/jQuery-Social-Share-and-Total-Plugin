# jQuery Social Share and Total Plugin
Social sharing plugin that has a very light footprint, displays total counts and individual share counts for your posts, or any other link you want to see numbers for.

##Demo 
Click the link below for a working demo.
<a target="_blank" href="http://www.davidodey.com/projects/share.html">Click Here for Demo</a>

#Supported social sites:
1. Facebook
2. Twitter (in order to get twitter counts, youll need to register your domain to: [https://opensharecount.com/](https://opensharecount.com/))
3. Linkedin
4. Google Plus

*Want more?  Reach out to me [@davodey](https://twitter.com/davodey) and let me know or if your feeling up to it, make a pull request and help out.*

#installation
1. This plugin depends on jQuery, so youll want to grab a local copy or use a cdn version.
[jQuery 1.12.3 tested and supported] https://code.jquery.com/jquery-1.12.3.min.js
2. Load up the min file provided: customShareCounts.min.js

#How to use
First, wrap the content you want to share / get counts from with an element and give it a class of your choosing. In this example we'll use 'share-items'.  Include:
* data-title - this your tweet content
* data-hash - twitter hashtag.
* data-url - The url you want to share.

```
<div class="share-items" data-title="title you want twitter to use to share" data-hash="TwitterHashtag" data-url="http://urltogetcounts">
 {blog / article content here}
</div>
```

Next, if you want to display share buttons with counts, create an anchor tag and assign the following class. In this example well use twitter '.twitterBtn', you will also need the '.twitter-count' class if you want to include share counts. See the examples below for Facebook, Linkedin and Google Plus.
```
<a Class="twitterBtn" data-dir="left" href="" >
	<span>Twitter</span>
	<span class="twitter-count"></span>
</a>
```
```
<a class="facebookBtn" href="">
	<span>Facebook</span>
	<span class="facebook-count"></span>
</a>
```
```
<a class="linkedinBtn" href="">
	<span>LinkedIn</span>
	<span class="linkedin-count"></span>
</a>
```
```
<a class="googleBtn" href="">
	<span>Google</span>
	<span class="google-count"></span>
</a>
```
Finally, if you want to include the total number of shares include an element with this class '.total-count'
```
<span>Total</span>
<span class="total-count"></span>
```
Your final markup should look something this:

##Example of complete markup
```html
<!-- the div wrapper -->
<div class="share-items" data-title="title you want twitter to use to share" data-hash="TwitterHashtag" data-url="http://urltogetcounts">
  <h2>Blog Post Two</h2>
  <div class="share-links">
  <!-- use the class 'twitterBtn' for loading the provider URL, you dont need to include an href, this will generate for you -->
  <!-- use the class 'twitter-count' for loading the number of shares-->
		<a class="twitterBtn" data-dir="left" href="" >
			<span>Twitter</span>
			<span class="twitter-count"></span>
		</a>
		<!-- same as above, you get it right? -->
		<a class="facebookBtn" href="">
			<span>Facebook</span>
			<span class="facebook-count"></span>
		</a>
		<a class="linkedinBtn" href="">
			<span>LinkedIn</span>
			<span class="linkedin-count"></span>
		</a>
		<a class="googleBtn" href="">
			<span>Google</span>
			<span class="google-count"></span>
		</a>
		<span>Total</span>
		<!-- include the total-count class to populate the total number of shares -->
		<span class="total-count"></span>
	</div>
</div>
```
##Javascript
Now youll want to include the JS, youll want to include this at the bottom of the page before the closing </body> tag.  See the comments below to manage the options.
```javascript
$('.share-items').customShareCount({
	// in order to get twitter counts & totals you must sign up for a free account @ https://opensharecount.com/
	// setting these to false will prevent an API call to the service.
	// set these to false if you dont want counts or links generated for that social network
	twitter: true,
	facebook: true,
	linkedin: true,
	google: true,

	// add the twitter username you want to append to your share, leave blank for none;
	twitterUsername: 'davodey',

	// display the counts for each of the social networks, set this to false if you want to disable.
	showCounts: true,

	// displays the total number of shares between all providers, set this to false if you want to disable
	showTotal: true,
});
```
##Known Bugs:
Firefox 42 + prevents calls to the facebook and linkedin api as part of their new tracking protection.  There is a planned fix in the next release.
