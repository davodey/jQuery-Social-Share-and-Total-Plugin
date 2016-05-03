(function ($) {
	'use strict';
	var $thisUrl = $(location).attr('href');

	$.fn.customShareCount = function( options ) {
		var socialCounts,
			totalCount = {},
			$thisTitle = $(document).find('title').text(),
			settings = $.extend({}, $.fn.customShareCount.defaults, options);

		function loadCounts(url, type, callback) {
			$.ajax({
				url: url,
				cache: true,
				type: 'POST',
				dataType: type,
				data: {
					url: settings.pageUrl
				},
				success: function (data){
					callback(data);
				}
			});
		}

		socialCounts = {
			facebook: {
				jsonUrl: 'http://graph.facebook.com/?id=' + settings.pageUrl,
				shareUrl: 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(settings.pageUrl),
				loadLink: function () {
					$('.facebookBtn').attr('href', this.shareUrl);
				},
				getCountAddLink: function () {
					loadCounts(this.jsonUrl, 'jsonp', function (data) {
						$('.facebook-count').text(data.shares);
						totalCount.facebook = data.shares;
					});
				}
			},
			linkedIn: {
				jsonUrl: 'https://www.linkedin.com/countserv/count/share?url=' + settings.pageUrl,
				shareUrl: 'http://www.linkedin.com/shareArticle?mini=true&url=' + encodeURIComponent(settings.pageUrl),
				loadLink: function () {
					$('.linkedinBtn').attr('href', this.shareUrl);
				},
				getCountAddLink: function () {
					loadCounts(this.jsonUrl, 'jsonp', function (data) {
						$('.linkedin-count').text(data.count);
						totalCount.linkedin = data.count;
					});
				}
			},
			googlePlus: {
				jsonUrl: 'https://count.donreach.com/',
				shareUrl: 'https://plus.google.com/share?url=' + encodeURIComponent(settings.pageUrl),
				loadLink: function () {
					$('.googleBtn').attr('href', this.shareUrl);
				},
				getCountAddLink: function () {
					loadCounts(this.jsonUrl, 'jsonp', function (data) {
						$('.google-count').text(data.shares.google);
						totalCount.google = data.shares.google;
						console.log(totalCount);
					});
				}
			},
			twitter: {
				jsonUrl: 'http://opensharecount.com/count.json?url=' + settings.pageUrl,
				shareUrl: 'http://twitter.com/intent/tweet?text='+ $thisTitle + '&amp;via=' + settings.twitterUsername,
				loadLink: function () {
					$('.twitterBtn').attr('href', this.shareUrl);
				},
				getCountAddLink: function () {
					return loadCounts(this.jsonUrl, 'json', function (data) {
						$('.twitter-count').text(data.count);
						totalCount.twitter = data.count;


					});
				}
			},
			execute: function() {
				// load counts
				if (settings.showAllCount === true && settings.facebookCount === true) {
					this.facebook.getCountAddLink();
				} else {
					$('facebook-count').text('');
				}

				if (settings.showAllCount === true && settings.linkedinCount === true) {
					this.linkedIn.getCountAddLink();
				} else {
					$('linkedim-count').text('');
				}

				if (settings.showAllCount === true && settings.googlePlusCount === true) {
					this.googlePlus.getCountAddLink();
				} else {
					$('google-count').text('');
				}
				if (settings.showAllCount === true && settings.twitterCount === true) {
					this.twitter.getCountAddLink();
				} else {
					$('twitter-count').text('');
				}

				// load links {
				if (settings.facebookLoad === true) {
					this.facebook.loadLink();
				}
				if (settings.linkedinLoad === true) {
					this.linkedIn.loadLink();
				}
				if (settings.googlePlusLoad === true) {
					this.googlePlus.loadLink();
				}
				if (settings.twitterLoad === true) {
					this.twitter.loadLink();
				}
			}
		};

		socialCounts.execute();

		this.on('click', 'a', function () {
			window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
			return false;
		});

		return this;

	};

	$.fn.customShareCount.defaults = {
		// set true or false to toggle the counts & API calls
		// in order to get twitter counts you must sign up for a free account @ https://opensharecount.com/
		facebookCount: true,
		facebookLoad: true,
		linkedinCount: true,
		linkedinLoad: true,
		googlePlusCount: true,
		googlePlusLoad: true,
		twitterCount: true,
		twitterLoad: true,
		twitterUsername: '',
		showAllCount: true,

		// set the page url you want to get the counts from
		pageUrl:  $thisUrl
	};

}(jQuery));