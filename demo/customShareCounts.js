(function ($) {
	'use strict';
	var $thisUrl = $(location).attr('href');

	$.fn.customShareCount = function( options ) {
		var socialServices,
			totalCount = {},
			totalTime,
			ajaxTime= new Date().getTime(),
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

		socialServices = {
			facebook: {
				jsonUrl: 'http://graph.facebook.com/?id=' + settings.pageUrl,
				shareUrl: 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(settings.pageUrl),
				loadLink: function () {
					$('.facebookBtn').attr('href', this.shareUrl);
				},
				getCount: function () {
					loadCounts(this.jsonUrl, 'jsonp', function (data) {
						$('.facebook-count').text(data.shares);
						if (settings.showTotal === true) {
							totalCount.facebook = Number(data.shares);
						}
					});
				}
			},
			linkedIn: {
				jsonUrl: 'https://www.linkedin.com/countserv/count/share?url=' + settings.pageUrl,
				shareUrl: 'http://www.linkedin.com/shareArticle?mini=true&url=' + encodeURIComponent(settings.pageUrl),
				loadLink: function () {
					$('.linkedinBtn').attr('href', this.shareUrl);
				},
				getCount: function () {
					loadCounts(this.jsonUrl, 'jsonp', function (data) {
						$('.linkedin-count').text(data.count);
						totalCount.linkedin = Number(data.count);
						totalCount.total = totalCount.facebook + totalCount.linkedin + totalCount.twitter;
						console.log(Number(totalCount.total));
					});
				}
			},
			googlePlus: {
				jsonUrl: 'https://count.donreach.com/',
				shareUrl: 'https://plus.google.com/share?url=' + encodeURIComponent(settings.pageUrl),
				loadLink: function () {
					$('.googleBtn').attr('href', this.shareUrl);
				},
				getCount: function () {
					loadCounts(this.jsonUrl, 'jsonp', function (data) {
						$('.google-count').text(data.shares.google);
						totalCount.google = Number(data.shares.google);
						totalCount.total = totalCount.facebook + totalCount.linkedin + totalCount.twitter;
						console.log(Number(totalCount.total));
					});
				}
			},
			twitter: {
				jsonUrl: 'http://opensharecount.com/count.json?url=' + settings.pageUrl,
				shareUrl: 'http://twitter.com/intent/tweet?text='+ $thisTitle + '&amp;via=' + settings.twitterUsername,
				loadLink: function () {
					$('.twitterBtn').attr('href', this.shareUrl);
				},
				getCount: function () {
					loadCounts(this.jsonUrl, 'json', function (data) {
						$('.twitter-count').text(data.count);
						totalCount.twitter = Number(data.count);
						totalCount.total = totalCount.facebook + totalCount.linkedin + totalCount.twitter;
						console.log(Number(totalCount.total));
					});
				}
			},
			total: function () {
				$( document ).ajaxComplete(function() {
					totalCount.total = totalCount.facebook + totalCount.linkedin + totalCount.twitter;
					totalCount.total = totalCount.facebook + totalCount.linkedin + totalCount.twitter;
				});
			}
		};


		this.each(function(){
			var links = ($(this).find('a'));
			if (links.hasClass('twitterBtn')) {
				socialServices.twitter.loadLink();

				if (settings.showCounts === true) {
					socialServices.twitter.getCount();
				} else {
					$('.twitter-count').text('');
				}
			}
			if (links.hasClass('facebookBtn')) {
				socialServices.facebook.loadLink();
				if (settings.showCounts === true) {
					socialServices.facebook.getCount();
				} else {
					$('.facebook-count').text('');
				}
			}
			if (links.hasClass('linkedinBtn')) {
				socialServices.linkedIn.loadLink();
				if (settings.showCounts === true) {
					socialServices.linkedIn.getCount();
				} else {
					$('.linkedin-count').text('');
				}
			}
			if (links.hasClass('googleBtn')) {
				socialServices.googlePlus.loadLink();
				if (settings.showCounts === true) {
					socialServices.googlePlus.getCount();
				} else {
					$('.google-count').text('');
				}
			}
		});
	
		this.on('click', 'a', function () {
			window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
			return false;
		});

		return this;

	};

	$.fn.customShareCount.defaults = {
		// set true or false to toggle the counts & API calls
		// in order to get twitter counts you must sign up for a free account @ https://opensharecount.com/

		twitterUsername: '',
		showCounts: true,
		showTotal: true,

		// set the page url you want to get the counts from
		pageUrl:  $thisUrl
	};

}(jQuery));