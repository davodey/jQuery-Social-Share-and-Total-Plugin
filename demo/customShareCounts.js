(function ($) {
	'use strict';

	$.fn.customShareCount = function( options ) {
		var settings = $.extend({}, $.fn.customShareCount.defaults, options);

		function SocialNetwork(name, count) {
			this.name = name;
			this.count = count;
		}

		function kFormatter(num) {
			return num > 999 ? (num/1000).toFixed(1) + 'k' : num;
		}

		function loadCounts(url, type, jsonUrl, callback) {
			$.ajax({
				url: url,
				cache: true,
				type: 'POST',
				dataType: type,
				data: {
					url: jsonUrl
				},
				success: function (data){
					callback(data);
				}
			});
		}



		function showCount (target, value) {
			if (settings.showCounts === true) {
				target.text(kFormatter(value));
			} else {
				target.remove();
			}
		}

		// this.on('click', 'a', function () {
		// 	window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
		// 	return false;
		// });

		return this.each(function(){
			var links = $(this).find('a'),
				$thisUrl = $(this).find('a.share-url').attr('href'),
				$thisTitle = $(document).find('title').text(),
				$twitterCount = $(this).find('.twitter-count'),
				$facebookCount = $(this).find('.facebook-count'),
				$linkedinCount = $(this).find('.linkedin-count'),
				$googleCount = $(this).find('.google-count'),
				$totalCount = $(this).find('.total-count'),
				twitterLoadUrl = 'http://twitter.com/intent/tweet?text='+ $thisTitle + '&amp;via=' + settings.twitterUsername,
				twitterJsonUrl = 'http://opensharecount.com/count.json?url=' + $thisUrl,
				facebookLoadUrl = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent($thisUrl),
				facebookJsonUrl = 'http://graph.facebook.com/?id=' + $thisUrl,
				linkedInLoadUrl = 'http://www.linkedin.com/shareArticle?mini=true&url=' + encodeURIComponent($thisUrl),
				linkedInJsonUrl = 'https://www.linkedin.com/countserv/count/share?url=' + $thisUrl,
				googlePlusLoadUrl = 'https://plus.google.com/share?url=' + encodeURIComponent($thisUrl),
				googlePlusJsonUrl = 'https://count.donreach.com/',
				totalCount = 0;


				if (links.hasClass('twitterBtn')) {
					$(this).find('a.twitterBtn').attr('href', twitterLoadUrl);
					loadCounts(twitterJsonUrl, 'json', $thisUrl, function (data) {
						var Twitter = new SocialNetwork(
							'twitter',
							data.count

						);
						showCount($twitterCount, Twitter.count);
						totalCount += Twitter.count;
						$totalCount.text(kFormatter(totalCount));
					});

				}
				if (links.hasClass('facebookBtn')) {
					$(this).find('a.facebookBtn').attr('href', facebookLoadUrl);
					loadCounts(facebookJsonUrl, 'jsonp', $thisUrl, function (data) {
						var Facebook = new SocialNetwork(
							'facebook',
							data.shares
						);
						showCount($facebookCount, Facebook.count);
						totalCount += Facebook.count;
						$totalCount.text(kFormatter(totalCount));
					});

				}
				if (links.hasClass('linkedinBtn')) {
					$(this).find('a.linkedinBtn').attr('href', linkedInLoadUrl);
					loadCounts(linkedInJsonUrl, 'jsonp', $thisUrl, function (data) {
						var Linkedin = new SocialNetwork(
							'linkedIn',
							data.count
						);
						showCount($linkedinCount, Linkedin.count);
						totalCount += Linkedin.count;
						$totalCount.text(kFormatter(totalCount));
					});

				}
				if (links.hasClass('googleBtn')) {
					$(this).find('a.googleBtn').attr('href', googlePlusLoadUrl);
					loadCounts(googlePlusJsonUrl, 'jsonp', $thisUrl, function (data) {
						var Google = new SocialNetwork(
							'google',
							data.shares.google
						);
						showCount($googleCount, Google.count);
						totalCount += Google.count;
						$totalCount.text(kFormatter(totalCount));
					});

				}


		});
	};

	$.fn.customShareCount.defaults = {

		// set true or false to toggle the counts & API calls
		// in order to get twitter counts you must sign up for a free account @ https://opensharecount.com/

		twitterUsername: '',
		showCounts: true,
		showTotal: true,
		singlePage: true

		// set the page url you want to get the counts from
	};

}(jQuery));