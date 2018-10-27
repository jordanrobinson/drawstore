'use strict';

var _buildingBlocks = _buildingBlocks ? _buildingBlocks : {};
(function ($) {
	$.extend(_buildingBlocks, {
		bbActionMenu: function bbActionMenu() {
			var self = this,
			    $demoActions = $('.demo-actions'),
			    menuIn = false,
			    delayA = null,
			    delayB = null,
			    wait = false;

			if (!$demoActions.length) {
				return;
			}

			$('.action-demo-actions').on('click.bbActionMenu', function (event) {
				event.preventDefault();

				if (wait) {
					return;
				}

				wait = true;

				if (menuIn) {
					_buildingBlocks.settings.$html.removeClass('demo-actions-show');

					delayA = setTimeout(function () {
						_buildingBlocks.settings.$html.removeClass('demo-actions-out');
						menuIn = false;
						wait = false;
						clearTimeout(delayA);
					}, 250);
				} else {
					_buildingBlocks.settings.$html.addClass('demo-actions-out');

					delayB = setTimeout(function () {
						_buildingBlocks.settings.$html.addClass('demo-actions-show');
						menuIn = true;
						wait = false;
						clearTimeout(delayB);
					}, 250);
				}
			});
		}
	});
	$.subscribe('pageReady', function () {
		_buildingBlocks.bbActionMenu();
	});
})(jQuery);

var _buildingBlocks = _buildingBlocks ? _buildingBlocks : {};
(function ($) {
	$.extend(_buildingBlocks, {
		bbPageNav: function bbPageNav() {
			var self = this,
			    $pageNav = $('.bb-page-nav'),
			    navOpen = false;

			if (!$pageNav.length) {
				return;
			}

			// create open nav btn
			var $btn = $('<button />', {
				'type': 'button',
				'class': 'action-bb-page-nav bb-page-nav-btn btn-no-style'
			}).text('menu');
			var $demoActions = $('.demo-links');
			if ($demoActions && $demoActions.length > 0) {
				$demoActions.append($btn);
			}

			// open nav on btn click
			$btn.on('click.bbPageNav', function (event) {
				_buildingBlocks.settings.$html.toggleClass('bb-page-nav-show');

				if (navOpen) {
					navOpen = false;
				} else {
					navOpen = true;
				}
			});

			// close nav on close button click
			$('.action-bb-page-nav-close').on('click.bbPageNav', function (event) {
				event.preventDefault();
				_buildingBlocks.settings.$html.removeClass('bb-page-nav-show');
				navOpen = false;
			});

			// close nav on body click
			_buildingBlocks.settings.$htmlbody.on('click.bbPageNav', function (event) {
				var $clickElement = $(event.target),
				    $actionBtn = $clickElement.closest('.action-bb-page-nav'),
				    $pageNav = $clickElement.closest('.bb-page-nav');

				if ($actionBtn && $actionBtn.length > 0 || $pageNav && $pageNav.length > 0) {
					return;
				}

				if (navOpen) {
					_buildingBlocks.settings.$html.removeClass('bb-page-nav-show');
					navOpen = false;
				} else {
					return;
				}
			});
		}
	});
	$.subscribe('pageReady', function () {
		_buildingBlocks.bbPageNav();
	});
})(jQuery);

var _buildingBlocks = _buildingBlocks ? _buildingBlocks : {};
(function ($) {
	/**
  * Publish events using Pub/Sub
  * @namespace events
  * @see {@link https://github.com/cowboy/jquery-tiny-pubsub}
  */
	$.extend(_buildingBlocks, {
		/**
   * Publish event when the page is ready.
   * @function pageReady
   */
		pageReady: function pageReady() {
			var self = this;

			$.publish('pageReady_prioritize', self);
			$.publish('pageReady', self);

			self.pageLoaded();
		},
		/**
   * Publish event when the page has loaded.
   * @function pageLoaded
   */
		pageLoaded: function pageLoaded() {
			var self = this;

			self.settings.$window.on('load', function () {

				$.publish('pageLoaded', self);
			});
		},
		/**
   * Publish event when an AJAX request has finished.
   * @function ajaxLoaded
   */
		ajaxLoaded: function ajaxLoaded() {
			var self = this;

			$.publish('ajaxLoaded', self);
		}
	});
})(jQuery);

var _buildingBlocks = _buildingBlocks ? _buildingBlocks : {};
(function ($) {
	$.extend(_buildingBlocks, {
		/**
   * Monitor media queries related methods.
   * @namespace monitorMq
   */
		monitorMq: {
			// jQuery DOM caching
			$detector: null,
			// CSS selectors
			detectorClass: 'monitor-mq',
			detectorId: 'monitor_mq',
			// Configuration
			detectorWidth: 0,
			currentBreakpoint: 0,
			previousBreakpoint: 0,
			/**
    * Initialises monitor media queries module. Caches jQuery DOM objects, calls monitor() on pageReady.
    * @function init
    * @memberof monitorMq
    */
			init: function init() {
				var self = this;
				self.$detector = $('#' + self.detectorId);
				self.monitor();
			},
			/**
    * Creates detector <div> if not present. Updates the comparison variable when a change in screen size occurs.
    * @function monitor
    * @memberof monitorMq
    */
			monitor: function monitor() {
				var self = this;
				if (!self.$detector.length) {
					self.$detector = $('<div />', {
						id: self.detectorId,
						class: self.detectorClass
					});
					_buildingBlocks.settings.$body.append(self.$detector);
				}
				self.detectorWidth = self.$detector.width();
				if (self.detectorWidth !== self.currentBreakpoint) {
					self.previousBreakpoint = self.currentBreakpoint;
					self.currentBreakpoint = self.detectorWidth;
				}
			}
		}
	});
	$.subscribe('pageReady', function () {
		_buildingBlocks.monitorMq.init();
	});
	$.subscribe('viewportResizeEnd', function () {
		_buildingBlocks.monitorMq.monitor();
	});
})(jQuery);

var _buildingBlocks = _buildingBlocks ? _buildingBlocks : {};
(function ($) {
	$.extend(_buildingBlocks, {
		pageReadyClass: function pageReadyClass() {
			var self = this;

			self.settings.$html.addClass('page-ready');
		},
		pageLoadedClass: function pageLoadedClass() {
			var self = this;

			self.settings.$html.addClass('page-loaded');
		}
	});
	$.subscribe('pageReady', function () {
		_buildingBlocks.pageReadyClass();
	});
	$.subscribe('pageLoaded', function () {
		_buildingBlocks.pageLoadedClass();
	});
})(jQuery);

var _buildingBlocks = _buildingBlocks ? _buildingBlocks : {};
(function ($) {
	$.subscribe('pageReady ajaxLoaded', function () {
		if (typeof picturefill === 'function') {
			// console.log('picturefill');
			picturefill();
		}
	});
})(jQuery);

var _buildingBlocks = _buildingBlocks ? _buildingBlocks : {};
(function ($) {
	$.extend(_buildingBlocks, {
		settings: {
			// cache some common variables
			$window: $(window),
			$html: $('html'),
			$body: $('body'),
			$htmlbody: $('html,body'),
			$page: $('#page'),
			$header: $('#header'),
			$main: $('#main'),
			$footer: $('#footer'),
			// stored URL params (empty to begin with)
			urlParams: {},
			// class to use on
			processedClass: 'processed',
			browserPrefix: null,
			transitionEnd: null,
			animationEnd: null,
			transitionAnimationEnd: null,
			// store processing of last component globally
			processinglastBlock: false,
			// breakpoint variables (should match variables.less)
			breakPointA: 320,
			breakPointB: 480,
			breakPointC: 600,
			breakPointD: 768,
			breakPointE: 1000,
			breakPointF: 1200,
			breakPointG: 1360,
			// store scripts directory
			scriptsDirectory: '',
			// is this a RTL site?
			rtl: false,
			// Perform Modernizr tests once and store the result
			supports: {
				// history: Modernizr.history // for example
			}
		}
	});
})(jQuery);

var _buildingBlocks = _buildingBlocks ? _buildingBlocks : {};
(function ($) {
	$.extend(_buildingBlocks, {
		toggleGrid: function toggleGrid($object) {
			var self = this,
			    $visibleGrid = $('.visible-grid');

			if (!$visibleGrid.length) {
				return;
			}

			var $btn = $('<button />', {
				'type': 'button',
				'class': 'visible-grid-btn btn-no-style'
			}).text('Grid on/off');

			var $demoActions = $('.demo-links');
			if ($demoActions && $demoActions.length > 0) {
				$demoActions.append($btn);
			} else {
				_buildingBlocks.settings.$body.append($btn);
			}

			$btn.on('click', function (event) {
				_buildingBlocks.settings.$body.toggleClass('visible-grid-in');
			});
		}
	});
	$.subscribe('pageReady', function () {
		_buildingBlocks.toggleGrid();
	});
})(jQuery);

var _buildingBlocks = _buildingBlocks ? _buildingBlocks : {};
(function ($) {
	$.extend(_buildingBlocks, {
		/**
   * Returns a query string parameter’s value if specified, object of query string parameters if not.
   * @function getUrlParams
   * @memberof utilities
   * @param {String} [parameter] Parameter passed in to retrieve from query string
   * @returns {Obj} [params] | {String} [param]
   */
		getUrlParams: function getUrlParams(parameter) {
			var queryString = window.location.search;

			if (queryString !== undefined) {
				queryString = window.location.search.replace('?', '');

				var params = {},
				    queryStringArray = queryString.split('&');

				for (var index in queryStringArray) {
					var query = queryStringArray[index].split('=');

					params[decodeURIComponent(query[0])] = decodeURIComponent(query[1]);
				}

				if (parameter) {
					return params[parameter];
				} else {
					return params;
				}
			}
		},
		setUrlParams: function setUrlParams() {
			var self = this;
			self.settings.urlParams = self.getUrlParams(window.location.search);
		},
		/*
   * Safely outputs message to browser console. Use for debugging/logging.
   * @function log
   * @param {String|Object} content - Content to log to browser console.
   * @param {String} styles - CSS style to apply to text logged to browser console.
   * @example
   * _buildingBlocks.log('Hello, World!', 'background:#F00;color:#FF0;');
   */
		log: function log(content, style) {
			if (typeof console !== 'undefined') {
				if (style) {
					console.log('%c' + content, style);
				} else {
					console.log(content);
				}
			}
		},
		htmlEncode: function htmlEncode(value) {
			if (value) {
				return $('<div />').text(value).html();
			} else {
				return '';
			}
		},
		htmlDecode: function htmlDecode(value) {
			if (value) {
				return $('<div />').html(value).text();
			} else {
				return '';
			}
		},
		// get IE version from classname (acceptable values: 10,9,8 or 7)
		ltIE: function ltIE(version) {
			var self = this;
			if (self.settings.$html.hasClass('lt-ie' + version)) {
				return true;
			} else {
				return false;
			}
		},
		browserPrefix: function browserPrefix() {
			if (window.getComputedStyle) {
				var self = this,
				    styles = window.getComputedStyle(window.document.documentElement, ''),
				    prefix = (Array.prototype.slice.call(styles).join('').match(/-(moz|webkit|ms)-/) || styles.OLink === '' && ['', 'o'])[1];
				self.settings.browserPrefix = '-' + prefix + '-';
			}
		},
		transitionAnimationEndEvent: function transitionAnimationEndEvent() {
			var self = this,
			    transition,
			    transitions,
			    animation,
			    animations,
			    element = window.document.createElement('transitionAnimationElement');
			transitions = {
				'WebkitTransition': 'webkitTransitionEnd',
				'MozTransition': 'transitionend',
				'MSTransition': 'msTransitionEnd',
				'OTransition': 'oTransitionEnd',
				'transition': 'transitionend'
			};
			animations = {
				'WebkitAnimation': 'webkitAnimationEnd',
				'MozAnimation': 'animationend',
				'MSAnimation': 'msAnimationEnd',
				'OAnimation': 'oAnimationEnd',
				'animation': 'animationend'
			};
			for (transition in transitions) {
				if (element.style[transition] !== undefined) {
					self.settings.transitionEnd = transitions[transition];
				}
			}
			// is it null?
			if (self.settings.transitionEnd === null) {
				self.settings.transitionEnd = 'noTransitionEnd';
			}
			for (animation in animations) {
				if (element.style[animation] !== undefined) {
					self.settings.animationEnd = animations[animation];
				}
			}
			// is it null?
			if (self.settings.animationEnd === null) {
				self.settings.animationEnd = 'noAnimationEnd';
			}
			self.settings.transitionAnimationEnd = (self.settings.transitionEnd + ' ' + self.settings.animationEnd).toString();
		},
		textDirection: function textDirection() {
			var self = this,
			    direction = self.settings.$html.attr('dir');
			if (direction === 'rtl') {
				self.settings.rtl = true;
			}
		},
		closestClass: function closestClass(el, className) {
			while (el) {
				if (_buildingBlocks.hasClass(el, className)) {
					break;
				}
				el = el.parentElement;
			}
			return el;
		},
		hasClass: function hasClass(el, className) {
			if (el.classList) {
				return el.classList.contains(className);
			} else {
				if (el.className) {
					var classArray = el.className.split(' ');
					for (var i = 0; i < classArray.length; i++) {
						if (classArray[i] === className) {
							return true;
						}
					}
				}
			}
			//return el.classList ? el.classList.contains(className) : new RegExp('\\b' + className + '\\b').test(el.className);
		},
		addClass: function addClass(el, className) {
			var classNames = className.split(' ');
			var i;

			for (i = 0; i < classNames.length; i++) {
				if (el.classList) {
					el.classList.add(classNames[i]);
				} else if (!_buildingBlocks.hasClass(el, classNames[i])) {
					el.className += ' ' + classNames[i];
				}
			}
		},
		removeClass: function removeClass(el, className) {
			var classNames = className.split(' ');
			var i;

			for (i = 0; i < classNames.length; i++) {
				if (el.classList) {
					el.classList.remove(classNames[i]);
				} else {
					el.className = el.className.replace(new RegExp('\\b' + classNames[i] + '\\b', 'g'), '');
				}
			}
		}
	});
	$.subscribe('pageReady', function () {
		_buildingBlocks.textDirection();
		_buildingBlocks.browserPrefix();
		_buildingBlocks.transitionAnimationEndEvent();
		_buildingBlocks.setUrlParams();
	});
})(jQuery);

var _buildingBlocks = _buildingBlocks ? _buildingBlocks : {};
(function ($) {
	$.extend(_buildingBlocks, {
		/**
   * Reusable site resize function.
   * @namespace viewportResize
   */
		viewportResize: {
			// Configuration
			resizeTimeout: null,
			timeoutDuration: 200,
			/**
    * Initialises viewport resize module, binds event to window resize.
    * @function init
    * @memberOf viewportResize
    */
			init: function init() {
				var self = this;

				_buildingBlocks.settings.$window.on('resize.viewportResize', function () {
					if (self.resizeTimeout) {
						clearTimeout(self.resizeTimeout);
					}

					$.publish('viewportResizeStart');

					self.resizeTimeout = setTimeout(function () {
						$.publish('viewportResizeEnd_prioritize');
						$.publish('viewportResizeEnd');
					}, self.timeoutDuration);
				});
			}
		}
	});
	$.subscribe('pageReady', function () {
		_buildingBlocks.viewportResize.init();
	});
})(jQuery);

var _buildingBlocks = _buildingBlocks ? _buildingBlocks : {};
(function ($) {
	$.extend(_buildingBlocks, {
		/**
   * Show and hide alerts
   * @namespace alerts
   */
		alerts: {
			alertWaitTime: 300,
			alertsInClass: 'flash-alerts--in',
			alertInClass: 'alert--in',
			alertOutClass: 'alert--out',
			alertShowClass: 'alert--show',
			alertHideShowClass: 'alert-hide-show',
			$alertsContainer: $('.flash-alerts'),
			/**
    * Initialises alerts module.
    * @function init
    * @memberof alert
    */
			init: function init() {
				var self = this;

				self.$alertsContainer = $('.flash-alerts');

				var $alerts = self.$alertsContainer.find('.alert:not(.' + self.alertInClass + ')');
				if ($alerts.length > 0 && !$alerts.hasClass(self.alertHideShowClass)) {
					self.showAlerts();
				}
				self.$alertsContainer.on('click.alerts', '.alert--dismiss', function (event) {
					self.hideAlert($(this).closest('.alert'));
					event.preventDefault();
				});
				self.formAlerts();
			},
			showContainer: function showContainer() {
				var self = this;
				self.$alertsContainer.addClass(self.alertsInClass);
			},
			hideContainer: function hideContainer() {
				var self = this;
				self.$alertsContainer.removeClass(self.alertsInClass);
			},
			addAlert: function addAlert(alertID) {
				var self = this,
				    $alert = $('#' + alertID),
				    $clone = $alert.clone().removeAttr('id').attr('data-id', alertID);
				if (self.$alertsContainer.find('[data-id=' + alertID + ']').length < 1) {
					self.hideAlerts();
					self.$alertsContainer.find('.flash-alerts-inner').prepend($clone);
					self.showAlerts();
				}
			},
			hideAlerts: function hideAlerts() {
				var self = this,
				    $alerts = self.$alertsContainer.find('.alert');

				if ($alerts.length === 0) {
					return false;
				}
				$alerts.each(function (index) {
					var $alert = $(this);
					var alertTimeout = $alert.attr('data-timeout');

					if (alertTimeout && alertTimeout > 0) {
						var alertWait = window.setTimeout(function () {
							self.hideAlert($alert);
							window.clearTimeout(alertWait);
						}, alertTimeout);
					}
				});
			},
			hideAlert: function hideAlert($alert) {
				var self = this;
				if ($alert.length > 0) {

					if (Modernizr.cssanimations) {
						if ($alert.hasClass(self.alertHideShowClass)) {
							$alert.removeClass(self.alertInClass).addClass(self.alertOutClass);
						} else {
							$alert.on(_buildingBlocks.settings.animationEnd, function () {
								$(this).remove();
							}).removeClass(self.alertInClass).addClass(self.alertOutClass);
						}
					} else {
						if ($alert.hasClass(self.alertHideShowClass)) {
							$alert.removeClass(self.alertInClass).addClass(self.alertOutClass);
						} else {
							$alert.removeClass(self.alertInClass).addClass(self.alertOutClass);
							$alert.each(function () {
								$(this).remove();
							});
						}
					}
					if (self.$alertsContainer.find('.alert').length < 1) {
						self.$alertsContainer.removeClass(self.alertsInClass);
					}
				}
			},
			showAlerts: function showAlerts() {
				var self = this,
				    $alerts = self.$alertsContainer.find('.alert:not(.' + self.alertInClass + ')'),
				    $hideShowAlerts = self.$alertsContainer.find('.' + self.alertHideShowClass);

				if ($hideShowAlerts.length > 0) {
					$hideShowAlerts.removeClass(self.alertOutClass).addClass(self.alertInClass);
				}

				if ($alerts.length === 0) {
					return false;
				}
				self.showContainer();

				$alerts.reverse().each(function (i) {
					var $alert = $(this),
					    timeout = $alert.data('timeout'),

					//in seconds
					alertWait,
					    timeoutWait;
					$alert.addClass(self.alertShowClass);
					alertWait = window.setTimeout(function () {
						$alert.addClass(self.alertInClass);
						if (timeout && timeout > 0) {
							timeoutWait = window.setTimeout(function () {
								self.hideAlert($alert);
								window.clearTimeout(timeoutWait);
							}, timeout * 1000); //convert to miliseconds
						}
						window.clearTimeout(alertWait);
					}, self.alertWaitTime * i);
				});
			},
			formAlerts: function formAlerts() {
				var self = this,
				    $forms = $('[data-alert]:not(.processed)');
				$forms.each(function () {
					var $this = $(this),
					    alertID = $this.data('alert'),
					    $inputs = $this.find('select,input,textarea').not('[data-alert-ignore]'),
					    inputs = 'select,input,textarea';
					$this.addClass('processed');
					$this.on('change.alerts remove.alerts', $inputs, function () {
						var $input = $(this);
						if ($input.is('[data-alert-ignore]')) {
							return false;
						}
						self.addAlert(alertID);
					});
				});
			},
			showAlert: function showAlert(type, message, alertUrl) {
				var self = this;
				var flashUrl = alertUrl + '?type=' + encodeURIComponent(type) + '&text=' + encodeURIComponent(message);

				var flashContent = $.get(flashUrl, function (data) {
					self.$alertsContainer.find('.flash-alerts-inner').append(data);
					self.showAlerts();
					self.showContainer();
				});
			},
			addAlertToPage: function addAlertToPage(type, text, timeout) {
				var self = this;

				var alertTemplate = '\n\t\t\t\t\t<div class="flash-alerts flash-alerts--in">\n\t\t\t\t\t\t<div class="flash-alerts-inner">\n\t\t\t\t\t\t\t<div class="alert-container">\n\t\t\t\t\t\t\t\t<div class="alert alert--' + type + ' alert--show alert--in" data-timeout="' + timeout + '">\n\t\t\t\t\t\t\t\t\t<div class="alert--inner">\n\t\t\t\t\t\t\t\t\t\t<button class="alert--dismiss" title="Close alert">\n\t\t\t\t\t\t\t\t\t\t\t<span role="presentation" aria-hidden="true" class="icon icon--x"></span>\n\t\t\t\t\t\t\t\t\t\t\t<span class="visually-hidden">Close Alert</span>\n\t\t\t\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t<div class="alert__content">\n\t\t\t\t\t\t\t\t\t\t\t<div class="alert__icon">\n\t\t\t\t\t\t\t\t\t\t\t\t<span role="presentation" aria-hidden="true" class="icon icon--' + type + '"></span>\n\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t<div class="alert__copy">\n\t\t\t\t\t\t\t\t\t\t\t\t<p>' + text + '</p>\n\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t';

				var _Div = document.createElement('div');
				_Div.innerHTML = alertTemplate;
				document.body.appendChild(_Div);
				self.bindEvents();
				self.hideAlerts();
			}
		}
	});
	$.subscribe('pageReady', function () {
		_buildingBlocks.alerts.init();
	});
	$.subscribe('ajaxLoaded', function () {
		_buildingBlocks.alerts.init();
	});
})(jQuery);
var _buildingBlocks = _buildingBlocks ? _buildingBlocks : {};
(function ($) {
	$.extend(_buildingBlocks, {
		drawStore: {
			init: function init() {
				var self = this;

				var moo = new Canvas("canvas", "#ffffff", "black");
				moo.init();
			}
		}
	});
	$.subscribe('pageReady', function () {
		_buildingBlocks.drawStore.init();
	});
})(jQuery);

var _buildingBlocks = _buildingBlocks ? _buildingBlocks : {};
(function ($) {
	$.extend(_buildingBlocks, {
		imgToBg: {
			// DOM Objects
			_ImgToBg: null,
			// Selectors
			imgToBgSelector: '.img-to-bg',
			// Classes
			processedClass: 'img-to-bg-complete',
			// Misc
			init: function init() {
				var self = this;

				self._ImgToBg = document.querySelectorAll(self.imgToBgSelector);
				if (!self._ImgToBg) {
					return;
				}

				for (var i = 0; i < self._ImgToBg.length; i++) {
					var _ImgContainer = self._ImgToBg[i];
					self.processImg(_ImgContainer);
				}
			},
			processImg: function processImg(_ImgContainer) {
				var self = this;

				if (!_ImgContainer) {
					return;
				}

				var width = self.getImgSML();
				var dataLrg = _ImgContainer.getAttribute('data-background-image-lrg');
				var dataMed = _ImgContainer.getAttribute('data-background-image-med');
				var dataSmall = _ImgContainer.getAttribute('data-background-image-small');
				var img = null;

				if (!dataLrg || !dataMed || !dataSmall || !width) {
					return;
				}

				switch (width) {
					case 'S':
						img = dataSmall;
						break;
					case 'M':
						img = dataMed;
						break;
					case 'L':
						img = dataLrg;
						break;
					default:
						console.log('imgToBg - something went wrong');
						return;
				}

				_ImgContainer.style.backgroundImage = 'url(' + img + ')';
				_ImgContainer.classList.add(self.processedClass);
			},
			getImgSML: function getImgSML() {
				var self = this;

				var currentBP = _buildingBlocks.monitorMq.currentBreakpoint;
				if (currentBP < _buildingBlocks.settings.breakPointD) {
					return 'S';
				} else if (currentBP < _buildingBlocks.settings.breakPointF && currentBP >= _buildingBlocks.settings.breakPointD) {
					return 'M';
				} else {
					return 'L';
				}
			},
			resizeEvent: function resizeEvent() {
				var self = this;

				self._ImgToBg = document.querySelectorAll(self.imgToBgSelector);
				if (!self._ImgToBg) {
					return;
				}

				for (var i = 0; i < self._ImgToBg.length; i++) {
					var _ImgContainer = self._ImgToBg[i];
					_ImgContainer.classList.remove(self.processedClass);
					self.processImg(_ImgContainer);
				}
			}
		}
	});
	$.subscribe('pageReady', function () {
		_buildingBlocks.imgToBg.init();
	});
	$.subscribe('viewportResizeEnd', function () {
		_buildingBlocks.imgToBg.resizeEvent();
	});
	$.subscribe('ajaxLoaded', function () {
		_buildingBlocks.imgToBg.resizeEvent();
	});
})(jQuery);

var _buildingBlocks = _buildingBlocks ? _buildingBlocks : {};
(function ($) {
	$.extend(_buildingBlocks, {
		mediaBlock: {
			// DOM Objects
			_MediaBlocks: null,
			// Selectors
			mediaBlockSelector: '.media-block',
			mediaBlockHasVideoSelector: '.media-block--has-video',
			mediaBlockImageSelector: '.media-block__img',
			mediaBlockVideoSelector: '.media-block__video',
			// Classes
			mediaBlockHasVideoClass: 'media-block--has-video',
			isPlayingClass: 'media-block--is-playing',
			// Misc
			init: function init() {
				var self = this;

				self._MediaBlocks = document.querySelectorAll(self.mediaBlockSelector);
				if (!self._MediaBlocks || self._MediaBlocks.length < 1) {
					return;
				}

				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;

				try {
					for (var _iterator = self._MediaBlocks[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						var _MediaBlock = _step.value;

						var hasVideo = _MediaBlock.classList.contains(self.mediaBlockHasVideoClass);
						if (hasVideo) {
							self.setupVideo(_MediaBlock);
						}
					}
				} catch (err) {
					_didIteratorError = true;
					_iteratorError = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion && _iterator.return) {
							_iterator.return();
						}
					} finally {
						if (_didIteratorError) {
							throw _iteratorError;
						}
					}
				}
			},
			setupVideo: function setupVideo(_MediaBlock) {
				var self = this;

				var _Video = _MediaBlock.querySelector('video');

				if (_buildingBlocks.settings.breakPointD <= window.innerWidth) {
					_Video.setAttribute('autoplay', true);
					_Video.play();
				} else {
					_Video.removeAttribute('autoplay');
					_Video.pause();
				}

				_Video.addEventListener("playing", function (event) {
					_MediaBlock.classList.add(self.isPlayingClass);
				});
			}
		}
	});
	$.subscribe('pageReady viewportResizeEnd', function () {
		_buildingBlocks.mediaBlock.init();
	});
})(jQuery);
var _buildingBlocks = _buildingBlocks ? _buildingBlocks : {};
(function ($) {
	$.extend(_buildingBlocks, {
		$selector: null,
		videosResponsive: function videosResponsive($object) {
			if (!$object) {
				$object = $('.media-video');
			}
			$object.fitVids({
				customSelector: 'iframe[src^="http://' + window.location.host + '"], iframe[src^="http://fast.wistia.net"], iframe[src^="http://cdnapi.kaltura.com"]'
			});
		}
	});
	$.subscribe('pageReady', function () {
		_buildingBlocks.videosResponsive();
	});
})(jQuery);