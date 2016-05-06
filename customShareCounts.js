/*
 The MIT License (MIT)

 Copyright (c) <year> <copyright holders>

 Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE

 Author: David O'Dey
 Website: http://www.davidodey.com
 Version: 1.1

 */
(function ($) {
	'use strict';

	$.fn.customShareCount = function( options ) {
		var settings = $.extend({}, $.fn.customShareCount.defaults, options);
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
		function formatK(num) {
			return num > 999 ? (num/1000).toFixed(1) + 'k' : num;
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
				facebookLoadUrl = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent($thisUrl),
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
		showCounts: true,
		showTotal: true,
		blogRoll: true
	};

}(jQuery));