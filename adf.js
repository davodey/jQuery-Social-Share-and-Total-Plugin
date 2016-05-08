/*!
 *  Custom share counts with totals!
 *  Version: 1.0.0
 *  Author: David O'Dey - www.davidodey.com
 *  License: MIT http://en.wikipedia.org/wiki/MIT_License or GPLv2 http://en.wikipedia.org/wiki/GNU_General_Public_License
 */

(function ($) {
	'use strict';

	$.fn.customShareCount = function( options ) {
		var settings = $.extend({}, $.fn.customShareCount.defaults, options),
			network = {
				facebook: {
					count: 0
				},
				linkedin: {
					count:0
				},
				twitter: {
					count:0
				},
				google: {
					count:0
				},
				total = function (){
					return this.facebook.count + this.linkedin.count + this.twitter.count + this.google.count;
				}
			}

		function formatK(num) {
			return num > 999 ? (num/1000).toFixed(1) + 'k' : num;
		}

		function loadCounts(url, jsonUrl, callback) {
			$.ajax({
				url: url,
				cache: true,
				type: 'POST',
				dataType: 'jsonp',
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
				target.text(formatK(value));
				if (value === undefined) {
					target.text(0);
				}
			} else {
				target.remove();
			}
		}

		this.on('click', 'a', function () {
			window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
			return false;
		});

		return this.each(function(){
			var $twitterCount = $(this).find('.twitter-count'),
				$facebookCount = $(this).find('.facebook-count'),
				$linkedinCount = $(this).find('.linkedin-count'),
				$googleCount = $(this).find('.google-count'),
				$totalCount = $(this).find('.total-count'),
				$thisUrl = $(this).attr('data-url'),
				$thisTitle = $(this).attr('data-title'),
				$twitterHash = $(this).attr('data-hash'),
				twitterLoadUrl = 'http://twitter.com/intent/tweet?text='+ $thisTitle + ' ' + $thisUrl + '&amp;via=' + settings.twitterUsername + ' %23' + $twitterHash + '&amp;source=webclient',
				twitterJsonUrl = 'http://opensharecount.com/count.json?url=' + $thisUrl,
				facebookLoadUrl = 
				facebookJsonUrl = 'http://graph.facebook.com/?id=' + $thisUrl,
				linkedInLoadUrl = 'http://www.linkedin.com/shareArticle?mini=true&url=' + encodeURIComponent($thisUrl),
				linkedInJsonUrl = 'https://www.linkedin.com/countserv/count/share?url=' + $thisUrl,
				googlePlusLoadUrl = 'https://plus.google.com/share?url=' + encodeURIComponent($thisUrl),
				googlePlusJsonUrl = 'https://count.donreach.com/',
				totalCount = 0;

			if (settings.twitter === true) {
				$(this).find('a.twitterBtn').attr('href', twitterLoadUrl);
				loadCounts(twitterJsonUrl, $thisUrl, function (data) {
					showCount($twitterCount, data.count);
					if (settings.showTotal === true && isNaN(data.count) === false) {
						totalCount += data.count;
						$totalCount.text(formatK(totalCount));

					}
				});
			}

			if (settings.facebook === true) {
				$(this).find('a.facebookBtn').attr('href', facebookLoadUrl);
				loadCounts(facebookJsonUrl, $thisUrl, function (data) {
					showCount($facebookCount, data.shares);
					if (settings.showTotal === true && isNaN(data.shares) === false) {
						totalCount += data.shares;
						$totalCount.text(formatK(totalCount));

					}
				});
			}

			if (settings.linkedin === true) {
				$(this).find('a.linkedinBtn').attr('href', linkedInLoadUrl);
				loadCounts(linkedInJsonUrl, $thisUrl, function (data) {
					showCount($linkedinCount, data.count);
					if (settings.showTotal === true && isNaN(data.count) === false) {
						totalCount += data.count;
						$totalCount.text(formatK(totalCount));

					}
				});
			}

			if (settings.google === true) {
				$(this).find('a.googleBtn').attr('href', googlePlusLoadUrl);
				loadCounts(googlePlusJsonUrl, $thisUrl, function (data) {
					showCount($googleCount, data.shares.google);
					if (settings.showTotal === true && isNaN(data.shares.google) === false){
						totalCount += data.shares.google;
						$totalCount.text(formatK(totalCount));

					}
				});
			}
		});
	};

	$.fn.customShareCount.defaults = {
		// set true or false to toggle the counts & API calls
		twitter: true,
		facebook: true,
		linkedin: true,
		google: true,
		twitterUsername: '',
		showCounts: false,
		showTotal: true,
		blogRoll: true
	};

}(jQuery));