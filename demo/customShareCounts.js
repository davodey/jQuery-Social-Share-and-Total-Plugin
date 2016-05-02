(function ($) {
	'use strict';
	var $thisUrl = $(location).attr('href');

	$.fn.customShareCount = function( options ) {
		var socialCounts,
			loadButtons,
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
				url: 'http://graph.facebook.com/?id=' + settings.pageUrl,
				getCount: function () {
					loadCounts(this.url, 'jsonp', function (data) {
						$('.' + settings.facebookClass).text(data.shares);
					});
				}
			},
			linkedin: {
				url: 'https://www.linkedin.com/countserv/count/share?url=' + settings.pageUrl + '&format=json?callback=JSON_CALLBACK',
				getCount: function () {
					loadCounts(this.url, 'jsonp', function (data) {
						$('.' + settings.linkedinClass).text(data.count);
					});
				}
			},
			googlePlus: {
				url: 'https://count.donreach.com/',
				getCount: function () {
					loadCounts(this.url, 'jsonp', function (data) {
						$('.' + settings.googlePlusClass).text(data.shares.google);
					});
				}
			},
			twitter: {
				url: 'http://opensharecount.com/count.json?url=' + settings.pageUrl,
				getCount: function () {
					loadCounts(this.url, 'json', function (data) {
						$('.' + settings.twitterPlusClass).text(data.count);
					});
				}
			}
		};
		
		loadButtons = {
			facebookBtn: {
				url: 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(settings.pageUrl),
				load: function () {
					socialCounts.facebook.getCount();
					$('.facebookBtn').attr('href', this.url);
				}
			},
			linkedinBtn: {
				url: 'http://www.linkedin.com/shareArticle?mini=true&url=' + encodeURIComponent(settings.pageUrl),
				load: function () {
					socialCounts.linkedin.getCount();
					$('.linkedinBtn').attr('href', this.url);
				}
			},
			googleBtn: {
				url: 'https://plus.google.com/share?url=' + encodeURIComponent(settings.pageUrl),
				load: function () {
					socialCounts.googlePlus.getCount();
					$('.googleBtn').attr('href', this.url);
				}
			},
			twitterBtn: {
				url: 'http://twitter.com/intent/tweet?text='+ $thisTitle + '&amp;via=' + settings.twitterUsername,
				load: function () {
					socialCounts.twitter.getCount();
					$('.twitterBtn').attr('href', this.url);
				}
			}
		};
		if (settings.facebook === true) {
			loadButtons.facebookBtn.load();
		}
		if (settings.linkedin === true) {
			loadButtons.linkedinBtn.load();
		}
		if (settings.googlePlus === true) {
			loadButtons.googleBtn.load();
		}
		if (settings.twitter === true) {
			loadButtons.twitterBtn.load();
		}
		this.on('click', 'li a', function () {
			window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
			return false;
		});
		return this;
	};

	$.fn.customShareCount.defaults = {
		// set true or false to toggle the counts
		facebook: true,
		linkedin: true,
		googlePlus: true,

		//in order to get twitter counts you must sign up for a free account @ https://opensharecount.com/
		twitter: true,
		twitterUsername: '',

		// set the page url you want to get the counts from
		pageUrl:  $thisUrl,

		// classes of the containers that will display the counts
		facebookClass: 'facebook-count',
		linkedinClass: 'linkedin-count',
		googlePlusClass: 'google-count',
		twitterPlusClass: 'twitter-count'

	};

}(jQuery));