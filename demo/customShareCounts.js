(function ($) {
	'use strict';
	var $thisUrl = $(location).attr('href');

	$.fn.customShareCount = function( options ) {
		var socialCounts,
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
				success: function (data) {
					callback(data);
				}
			});
		}

		socialCounts = {
			facebook: {
				jsonUrl: 'http://graph.facebook.com/?id=' + settings.pageUrl,
				shareUrl: 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(settings.pageUrl),
				getCountAddLink: function () {
					$('.facebookBtn').attr('href', this.shareUrl);
					loadCounts(this.jsonUrl, 'jsonp', function (data) {
						$('.facebook-count').text(data.shares);
					});

				}
			},
			linkedIn: {
				jsonUrl: 'https://www.linkedin.com/countserv/count/share?url=' + settings.pageUrl + '&format=json?callback=JSON_CALLBACK',
				shareUrl: 'http://www.linkedin.com/shareArticle?mini=true&url=' + encodeURIComponent(settings.pageUrl),
				getCountAddLink: function () {
					$('.linkedinBtn').attr('href', this.shareUrl);
					loadCounts(this.jsonUrl, 'jsonp', function (data) {
						$('.linkedin-count').text(data.count);
					});
				}
			},
			googlePlus: {
				jsonUrl: 'https://count.donreach.com/',
				shareUrl: 'https://plus.google.com/share?url=' + encodeURIComponent(settings.pageUrl),
				getCountAddLink: function () {
					$('.googleBtn').attr('href', this.shareUrl);
					loadCounts(this.jsonUrl, 'jsonp', function (data) {
						$('.google-count').text(data.shares.google);
					});
				}
			},
			twitter: {
				jsonUrl: 'http://opensharecount.com/count.json?url=' + settings.pageUrl,
				shareUrl: 'http://twitter.com/intent/tweet?text='+ $thisTitle + '&amp;via=' + settings.twitterUsername,
				getCountAddLink: function () {
					$('.twitterBtn').attr('href', this.shareUrl);
					loadCounts(this.jsonUrl, 'json', function (data) {
						$('.twitter-count').text(data.count);
					});
				}
			},
			execute: function() {
				if (settings.facebook === true) {
					this.facebook.getCountAddLink();
				}
				if (settings.linkedin === true) {
					this.linkedIn.getCountAddLink();
				}
				if (settings.googlePlus === true) {
					this.googlePlus.getCountAddLink();
				}
				if (settings.twitter === true) {
					this.twitter.getCountAddLink();
				}
			}
		};

		socialCounts.execute();

		this.on('click', 'li a', function () {
			window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
			return false;
		});
		return this;
	};

	$.fn.customShareCount.defaults = {
		// set true or false to toggle the counts & API calls
		// in order to get twitter counts you must sign up for a free account @ https://opensharecount.com/
		facebook: true,
		linkedin: true,
		googlePlus: true,
		twitter: true,
		twitterUsername: '',

		// set the page url you want to get the counts from
		pageUrl:  $thisUrl
	};

}(jQuery));