(function ($) {
	'use strict';
	var $thisUrl = $(location).attr('href');

	$.fn.customShareCount = function( options ) {
		var totalCount = 0,
			$numInstances = $(this).length,
			$totalCount = $(this).find('.total-count'),
			$twitterCount = $(this).find('.twitter-count'),
			$facebookCount = $(this).find('.facebook-count'),
			$linkedinCount = $(this).find('.linkedin-count'),
			$googleCount = $(this).find('.google-count'),
			settings = $.extend({}, $.fn.customShareCount.defaults, options);

		function kFormatter(num) {
			return num > 999 ? (num/1000).toFixed(1) + 'k' : num;
		}

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

		function showTotal(value) {
			if (settings.showTotal === true && isNaN(null) !== true) {
				totalCount += value;
			} else {
				$totalCount.remove();
			}
			$totalCount.text(kFormatter(totalCount / $numInstances));
		}

		function showCount (target, value) {
			if (settings.showCounts === true) {
				target.text(kFormatter(value));
			} else {
				target.remove();
			}
		}

		this.on('click', 'a', function () {
			window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
			return false;
		});

		return this.each(function(){

			var links = $(this).find('a'),
				$thisTitle = $(document).find('title').text(),
				twitterLoadUrl = 'http://twitter.com/intent/tweet?text='+ $thisTitle + '&amp;via=' + settings.twitterUsername,
				twitterJsonUrl = 'http://opensharecount.com/count.json?url=' + settings.pageUrl,
				facebookLoadUrl = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(settings.pageUrl),
				facebookJsonUrl = 'http://graph.facebook.com/?id=' + settings.pageUrl,
				linkedInLoadUrl = 'http://www.linkedin.com/shareArticle?mini=true&url=' + encodeURIComponent(settings.pageUrl),
				linkedInJsonUrl = 'https://www.linkedin.com/countserv/count/share?url=' + settings.pageUrl,
				googlePlusLoadUrl = 'https://plus.google.com/share?url=' + encodeURIComponent(settings.pageUrl),
				googlePlusJsonUrl = 'https://count.donreach.com/';

			if (settings.singlePage === true) {

				if (links.hasClass('twitterBtn')) {
					$(this).find('a.twitterBtn').attr('href', twitterLoadUrl);
					loadCounts(twitterJsonUrl, 'json', function (data) {
						showCount($twitterCount, data.count);
						showTotal(data.count);
					});

				}
				if (links.hasClass('facebookBtn')) {
					$(this).find('a.facebookBtn').attr('href', facebookLoadUrl);
					loadCounts(facebookJsonUrl, 'jsonp', function (data) {
						showCount($facebookCount, data.shares);
						showTotal(data.shares);
					});

				}
				if (links.hasClass('linkedinBtn')) {
					$(this).find('a.linkedinBtn').attr('href', linkedInLoadUrl);
					loadCounts(linkedInJsonUrl, 'jsonp', function (data) {
						showCount($linkedinCount, data.count);
						showTotal(data.count);
					});

				}
				if (links.hasClass('googleBtn')) {
					$(this).find('a.googleBtn').attr('href', googlePlusLoadUrl);
					loadCounts(googlePlusJsonUrl, 'jsonp', function (data) {
						showCount($googleCount, data.shares.google);
						showTotal(data.shares.google);
					});

				}
			}
		});
	};

	$.fn.customShareCount.defaults = {
		// set true or false to toggle the counts & API calls
		// in order to get twitter counts you must sign up for a free account @ https://opensharecount.com/

		twitterUsername: '',
		showCounts: true,
		showTotal: true,
		singlePage: true,

		// set the page url you want to get the counts from
		pageUrl:  $thisUrl
	};

}(jQuery));