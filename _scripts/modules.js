var _buildingBlocks = _buildingBlocks ? _buildingBlocks : {};
(function($) {
	$.extend(_buildingBlocks, {
		bbActionMenu: function() {
			var self = this,
				$demoActions = $('.demo-actions'),
				menuIn = false,
				delayA = null,
				delayB = null,
				wait = false;

			if (!$demoActions.length) {
				return;
			}

			$('.action-demo-actions').on('click.bbActionMenu', function(event) {
				event.preventDefault();

				if (wait) {
					return;
				}

				wait = true;

				if (menuIn) {
					_buildingBlocks.settings.$html.removeClass('demo-actions-show');

					delayA = setTimeout(function() {
						_buildingBlocks.settings.$html.removeClass('demo-actions-out');
						menuIn = false;
						wait = false;
						clearTimeout(delayA);
					}, 250);

				} else {
					_buildingBlocks.settings.$html.addClass('demo-actions-out');

					delayB = setTimeout(function() {
						_buildingBlocks.settings.$html.addClass('demo-actions-show');
						menuIn = true;
						wait = false;
						clearTimeout(delayB);
					}, 250);
				}
			});
		}
	});
	$.subscribe('pageReady', function() {
		_buildingBlocks.bbActionMenu();
	});
}(jQuery));

var _buildingBlocks = _buildingBlocks ? _buildingBlocks : {};
(function($) {
	$.extend(_buildingBlocks, {
		bbPageNav: function() {
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
			$btn.on('click.bbPageNav', function(event) {
				_buildingBlocks.settings.$html.toggleClass('bb-page-nav-show');

				if (navOpen) {
					navOpen = false;
				} else {
					navOpen = true;
				}
			});

			// close nav on close button click
			$('.action-bb-page-nav-close').on('click.bbPageNav', function(event) {
				event.preventDefault();
				_buildingBlocks.settings.$html.removeClass('bb-page-nav-show');
				navOpen = false;
			});

			// close nav on body click
			_buildingBlocks.settings.$htmlbody.on('click.bbPageNav', function(event) {
				var $clickElement = $(event.target),
					$actionBtn = $clickElement.closest('.action-bb-page-nav'),
					$pageNav = $clickElement.closest('.bb-page-nav');

				if (($actionBtn && $actionBtn.length > 0) || ($pageNav && $pageNav.length > 0)) {
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
	$.subscribe('pageReady', function() {
		_buildingBlocks.bbPageNav();
	});
}(jQuery));

var _buildingBlocks = _buildingBlocks ? _buildingBlocks : {};
(function($) {
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
		pageReady: function() {
			var self = this;

			$.publish('pageReady_prioritize', self);
			$.publish('pageReady', self);

			self.pageLoaded();
		},
		/**
		 * Publish event when the page has loaded.
		 * @function pageLoaded
		 */
		pageLoaded: function() {
			var self = this;

			self.settings.$window.on('load', function() {

				$.publish('pageLoaded', self);
			});
		},
		/**
		 * Publish event when an AJAX request has finished.
		 * @function ajaxLoaded
		 */
		ajaxLoaded: function() {
			var self = this;

			$.publish('ajaxLoaded', self);
		}
	});
}(jQuery));

var _buildingBlocks = _buildingBlocks ? _buildingBlocks : {};
(function($) {
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
			init: function() {
				var self = this;
				self.$detector = $('#' + self.detectorId);
				self.monitor();
			},
			/**
			 * Creates detector <div> if not present. Updates the comparison variable when a change in screen size occurs.
			 * @function monitor
			 * @memberof monitorMq
			 */
			monitor: function() {
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
	$.subscribe('pageReady', function() {
		_buildingBlocks.monitorMq.init();
	});
	$.subscribe('viewportResizeEnd', function() {
		_buildingBlocks.monitorMq.monitor();
	});
}(jQuery));

var _buildingBlocks = _buildingBlocks ? _buildingBlocks : {};
(function($) {
	$.extend(_buildingBlocks, {
		pageReadyClass: function() {
			var self = this;

			self.settings.$html.addClass('page-ready');
		},
		pageLoadedClass: function() {
			var self = this;

			self.settings.$html.addClass('page-loaded');
		}
	});
	$.subscribe('pageReady', function() {
		_buildingBlocks.pageReadyClass();
	});
	$.subscribe('pageLoaded', function() {
		_buildingBlocks.pageLoadedClass();
	});
}(jQuery));

var _buildingBlocks = _buildingBlocks ? _buildingBlocks : {};
(function($) {
	$.subscribe('pageReady ajaxLoaded', function() {
		if (typeof picturefill === 'function') {
			// console.log('picturefill');
			picturefill();
		}
	});
}(jQuery));

var _buildingBlocks = _buildingBlocks ? _buildingBlocks : {};
(function($) {
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
}(jQuery));

var _buildingBlocks = _buildingBlocks ? _buildingBlocks : {};
(function($) {
	$.extend(_buildingBlocks, {
		toggleGrid: function($object) {
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

			$btn.on('click', function(event) {
				_buildingBlocks.settings.$body.toggleClass('visible-grid-in');
			});
		}
	});
	$.subscribe('pageReady', function() {
		_buildingBlocks.toggleGrid();
	});
}(jQuery));

var _buildingBlocks = _buildingBlocks ? _buildingBlocks : {};
(function($) {
	$.extend(_buildingBlocks, {
		/**
		 * Returns a query string parameter’s value if specified, object of query string parameters if not.
		 * @function getUrlParams
		 * @memberof utilities
		 * @param {String} [parameter] Parameter passed in to retrieve from query string
		 * @returns {Obj} [params] | {String} [param]
		 */
		getUrlParams: function(parameter) {
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
		setUrlParams: function() {
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
		log: function(content, style) {
			if (typeof(console) !== 'undefined') {
				if (style) {
					console.log('%c' + content, style);
				} else {
					console.log(content);
				}
			}
		},
		htmlEncode: function(value) {
			if (value) {
				return $('<div />').text(value).html();
			} else {
				return '';
			}
		},
		htmlDecode: function(value) {
			if (value) {
				return $('<div />').html(value).text();
			} else {
				return '';
			}
		},
		// get IE version from classname (acceptable values: 10,9,8 or 7)
		ltIE: function(version) {
			var self = this;
			if (self.settings.$html.hasClass('lt-ie' + version)) {
				return true;
			} else {
				return false;
			}
		},
		browserPrefix: function() {
			if (window.getComputedStyle) {
				var self = this,
					styles = window.getComputedStyle(window.document.documentElement, ''),
					prefix = (Array.prototype.slice.call(styles).join('').match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o']))[1];
				self.settings.browserPrefix = '-' + prefix + '-';
			}
		},
		transitionAnimationEndEvent: function() {
			var self = this,
				transition, transitions, animation, animations, element = window.document.createElement('transitionAnimationElement');
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
		textDirection: function() {
			var self = this,
				direction = self.settings.$html.attr('dir');
			if (direction === 'rtl') {
				self.settings.rtl = true;
			}
		},
        closestClass: function(el, className) {
			while (el) {
				if (_buildingBlocks.hasClass(el, className)) {
					break;
				}
				el = el.parentElement;
			}
			return el;
		},
		hasClass: function(el, className) {
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
		addClass: function(el, className) {
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
		removeClass: function(el, className) {
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
	$.subscribe('pageReady', function() {
		_buildingBlocks.textDirection();
		_buildingBlocks.browserPrefix();
		_buildingBlocks.transitionAnimationEndEvent();
		_buildingBlocks.setUrlParams();
	});
}(jQuery));

var _buildingBlocks = _buildingBlocks ? _buildingBlocks : {};
(function($) {
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
			init: function() {
				var self = this;

				_buildingBlocks.settings.$window.on('resize.viewportResize', function() {
					if (self.resizeTimeout) {
						clearTimeout(self.resizeTimeout);
					}

					$.publish('viewportResizeStart');

					self.resizeTimeout = setTimeout(function() {
						$.publish('viewportResizeEnd_prioritize');
						$.publish('viewportResizeEnd');
					}, self.timeoutDuration);
				});
			}
		}
	});
	$.subscribe('pageReady', function() {
		_buildingBlocks.viewportResize.init();
	});
}(jQuery));

var _buildingBlocks = _buildingBlocks ? _buildingBlocks : {};
(function($) {
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
			init: function() {
				var self = this;

				self.$alertsContainer = $('.flash-alerts');

				var $alerts = self.$alertsContainer.find('.alert:not(.' + self.alertInClass + ')');
				if ($alerts.length > 0 && !$alerts.hasClass(self.alertHideShowClass)) {
					self.showAlerts();
				}
				self.$alertsContainer.on('click.alerts', '.alert--dismiss', function(event) {
					self.hideAlert($(this).closest('.alert'));
					event.preventDefault();
				});
				self.formAlerts();
			},
			showContainer: function() {
				var self = this;
				self.$alertsContainer.addClass(self.alertsInClass);
			},
			hideContainer: function() {
				var self = this;
				self.$alertsContainer.removeClass(self.alertsInClass);
			},
			addAlert: function(alertID) {
				var self = this,
					$alert = $('#' + alertID),
					$clone = $alert.clone().removeAttr('id').attr('data-id', alertID);
				if (self.$alertsContainer.find('[data-id=' + alertID + ']').length < 1) {
					self.hideAlerts();
					self.$alertsContainer.find('.flash-alerts-inner').prepend($clone);
					self.showAlerts();
				}
			},
			hideAlerts: function() {
				var self = this,
					$alerts = self.$alertsContainer.find('.alert');

				if ($alerts.length === 0) {
					return false;
				}
				$alerts.each(function(index) {
					var $alert = $(this);
					var alertTimeout = $alert.attr('data-timeout');

					if (alertTimeout && alertTimeout > 0) {
						var alertWait = window.setTimeout(function() {
							self.hideAlert($alert);
							window.clearTimeout(alertWait);
						}, alertTimeout);
					}
				});
			},
			hideAlert: function($alert) {
        var self = this;
				if ($alert.length > 0) {

					if (Modernizr.cssanimations) {
						if ($alert.hasClass(self.alertHideShowClass)) {
							$alert.removeClass(self.alertInClass).addClass(self.alertOutClass);
						} else {
							$alert.on(_buildingBlocks.settings.animationEnd, function() {
								$(this).remove();
							}).removeClass(self.alertInClass).addClass(self.alertOutClass);
						}
					} else {
						if ($alert.hasClass(self.alertHideShowClass)) {
							$alert.removeClass(self.alertInClass).addClass(self.alertOutClass);
						} else {
							$alert.removeClass(self.alertInClass).addClass(self.alertOutClass);
							$alert.each(function() {
								$(this).remove();
							});
						}
					}
					if (self.$alertsContainer.find('.alert').length < 1) {
						self.$alertsContainer.removeClass(self.alertsInClass);
					}
				}
			},
			showAlerts: function() {
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

				$alerts.reverse().each(function(i) {
					var $alert = $(this),
						timeout = $alert.data('timeout'),
						//in seconds
						alertWait, timeoutWait;
					$alert.addClass(self.alertShowClass);
					alertWait = window.setTimeout(function() {
						$alert.addClass(self.alertInClass);
						if (timeout && timeout > 0) {
							timeoutWait = window.setTimeout(function() {
								self.hideAlert($alert);
								window.clearTimeout(timeoutWait);
							}, timeout * 1000); //convert to miliseconds
						}
						window.clearTimeout(alertWait);
					}, self.alertWaitTime * i);
				});
			},
			formAlerts: function() {
				var self = this,
					$forms = $('[data-alert]:not(.processed)');
				$forms.each(function() {
					var $this = $(this),
						alertID = $this.data('alert'),
						$inputs = $this.find('select,input,textarea').not('[data-alert-ignore]'),
						inputs = 'select,input,textarea';
					$this.addClass('processed');
					$this.on('change.alerts remove.alerts', $inputs, function() {
						var $input = $(this);
						if ($input.is('[data-alert-ignore]')) {
							return false;
						}
						self.addAlert(alertID);
					});
				});
			},
			showAlert: function(type, message, alertUrl) {
				var self = this;
				var flashUrl = alertUrl + '?type=' + encodeURIComponent(type) + '&text=' + encodeURIComponent(message);

				var flashContent = $.get(flashUrl, function(data) {
					self.$alertsContainer.find('.flash-alerts-inner').append(data);
					self.showAlerts();
					self.showContainer();
				});
			},
			addAlertToPage(type, text, timeout) {
				const self = this;

				const alertTemplate = `
					<div class="flash-alerts flash-alerts--in">
						<div class="flash-alerts-inner">
							<div class="alert-container">
								<div class="alert alert--${type} alert--show alert--in" data-timeout="${timeout}">
									<div class="alert--inner">
										<button class="alert--dismiss" title="Close alert">
											<span role="presentation" aria-hidden="true" class="icon icon--x"></span>
											<span class="visually-hidden">Close Alert</span>
										</button>
										
										<div class="alert__content">
											<div class="alert__icon">
												<span role="presentation" aria-hidden="true" class="icon icon--${type}"></span>
											</div>
											<div class="alert__copy">
												<p>${text}</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				`;

				const _Div = document.createElement('div');
				_Div.innerHTML = alertTemplate;
				document.body.appendChild(_Div);
				self.bindEvents();
				self.hideAlerts();
			}
		}
	});
	$.subscribe('pageReady', function() {
		_buildingBlocks.alerts.init();
	});
	$.subscribe('ajaxLoaded', function() {
		_buildingBlocks.alerts.init();
	});
}(jQuery));
class BasketItem {
    constructor(itemName) {
        this.id = '';   
        this.itemName = itemName;
        this.itemPrice  = ''; 
        this.canvasImage = '';
        
      }
}


class Basket {
    
    constructor() {       
        this.items = []; 
        this.basketTotal = ''; 
      }     
     
      total(){
          let total = 0;
          
          this.items.map((item) =>{
            total = total + item.price;
           });

           this.basketTotal = total;
      }

}
var _buildingBlocks = _buildingBlocks ? _buildingBlocks : {};
(function ($) {
    $.extend(_buildingBlocks, {
        checkoutBasket: {
            hasItemsClass: 'basket--has-items',
            itemCount: 0,
            init: function () {
                const self = this;
                this.basket = new Basket();

                self._BasketList = document.querySelector(".basket__list");
                self._Basket = document.querySelector(".basket");
                self._ItemCount = document.querySelector(".item-count");               

                const _addCta = document.querySelector(".js-add-item");
                const _clearBasketCta = document.querySelector(".js-clear-basket");

                _addCta.addEventListener("click", function (event) {
                    event.preventDefault();
                    self.addItem();
                    _buildingBlocks.drawStore.canvas.erase();
                });

                _clearBasketCta.addEventListener("click", function (event) {
                    event.preventDefault();
                    
                    self._BasketList.innerHTML = "";
                    self._Basket.classList.remove(_buildingBlocks.checkoutBasket.hasItemsClass);

                    self.basket.items = [];
                    _buildingBlocks.checkoutBasket._ItemCount.innerHTML = "0";
                });
            },
            addItem: function () {
                let product = _buildingBlocks.drawStore.canvas.product;

                const _Item = document.createElement("div");

                const markup = `
                <div class="basket__item">
                <img src="${product.image}" class="item item--image" alt="item">
                <span class="item item--name">${product.name}</span>
                <span class="item item--price">£${product.price}</span>
                <span class="item item--quantity">1</span>
                <span class="item item--total">£${product.price}</span>
                </div>
                `;


                console.log(product);

                _Item.innerHTML = markup;
                // _buildingBlocks.checkoutBasket._BasketTotal = document.querySelector('.basket-total');
                _buildingBlocks.checkoutBasket._BasketList.appendChild(_Item);

                this.basket.items.push(product);

                // this.basket.total();
                // _buildingBlocks.checkoutBasket._BasketTotal.innerHTML = this.basket.basketTotal;
                
                _buildingBlocks.checkoutBasket.itemCount = this.basket.items.length;
                _buildingBlocks.checkoutBasket._ItemCount.innerHTML = _buildingBlocks.checkoutBasket.itemCount;

                const feedback = `You've bought a ${product.name}!`;
                const _Prediction = document.querySelector(".prediction");
                document.querySelector('.prediction > .prediction__inner').innerHTML = feedback;
                _Prediction.classList.add('shake');
                setTimeout(function() {
                    _Prediction.classList.remove('shake');
                }, 1000);

                _buildingBlocks.checkoutBasket._Basket.classList.add(_buildingBlocks.checkoutBasket.hasItemsClass);
            }
        }
    });
    $.subscribe('pageReady', function () {
        _buildingBlocks.checkoutBasket.init();
    });
}(jQuery));


var _buildingBlocks = _buildingBlocks ? _buildingBlocks : {};
(function($) {
	$.extend(_buildingBlocks, {
		drawStore: {
			init: function() {
				const self = this;

				document.getElementById("prediction").classList.add('hidden');
				
				this.canvas = new Canvas("canvas","#ffffff","black");
				this.canvas.init();
				
				const _ClearCta = document.querySelector(".js-clear-canvas");

				_ClearCta.addEventListener("click", function(event) {
					event.preventDefault();

					_buildingBlocks.drawStore.canvas.erase();
					document.querySelector(".prediction").classList.add('hidden');
				});
			},
			canvas: {}
		}
	});
	$.subscribe('pageReady', function() {
		_buildingBlocks.drawStore.init();
	});
}(jQuery));


var _buildingBlocks = _buildingBlocks ? _buildingBlocks : {};
(function($) {
	$.extend(_buildingBlocks, {
		imgToBg: {
            // DOM Objects
            _ImgToBg: null,
            // Selectors
            imgToBgSelector: '.img-to-bg',
            // Classes
            processedClass: 'img-to-bg-complete',
            // Misc
			init: function() {
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
            processImg: function (_ImgContainer) {
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
            getImgSML: function () {
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
            resizeEvent: function () {
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
	$.subscribe('pageReady', function() {
		_buildingBlocks.imgToBg.init();
	});
    $.subscribe('viewportResizeEnd', function() {
		_buildingBlocks.imgToBg.resizeEvent();
	});
    $.subscribe('ajaxLoaded', function() {
		_buildingBlocks.imgToBg.resizeEvent();
	});
}(jQuery));

var _buildingBlocks = _buildingBlocks ? _buildingBlocks : {};
(function($) {
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
			init() {
				const self = this;

				self._MediaBlocks = document.querySelectorAll(self.mediaBlockSelector);
				if (!self._MediaBlocks || self._MediaBlocks.length < 1) {
					return;
				}

				for (const _MediaBlock of self._MediaBlocks) {
					const hasVideo = _MediaBlock.classList.contains(self.mediaBlockHasVideoClass);
					if (hasVideo) {
						self.setupVideo(_MediaBlock);
					}
				}
			},
			setupVideo(_MediaBlock) {
				const self = this;

				const _Video = _MediaBlock.querySelector('video');

				if (_buildingBlocks.settings.breakPointD <= window.innerWidth) {
          _Video.setAttribute('autoplay', true);
          _Video.play();
        } else {
          _Video.removeAttribute('autoplay');
          _Video.pause();
				}

				_Video.addEventListener("playing", function(event) {
					_MediaBlock.classList.add(self.isPlayingClass);
				});
			}
		}
	});
	$.subscribe('pageReady viewportResizeEnd', function() {
		_buildingBlocks.mediaBlock.init();
	});
}(jQuery));
var _buildingBlocks = _buildingBlocks ? _buildingBlocks : {};
(function($) {
	$.extend(_buildingBlocks, {
		recentlyBought: {
      json: null,
			init: function() {
				const self = this;
				
				self._RecentlyBought = document.querySelectorAll(".recently-bought");
        if (!self._RecentlyBought || self._RecentlyBought.length < 1) {
          return;
        }

        $.getJSON(
          "./lib/products.json",
          function(data) {
            self.json = data;

            for (const _RecentlyBought of self._RecentlyBought) {
              const _List = _RecentlyBought.querySelector("ul");
              self.buildListings(_List);
            }
          }
        );
      },
      buildListings: function(_List) {
        const self = this;

        _List.innerHTML = '';

        const used = [];

        for (let i = 0; i < 3; i++) {
          const _El = document.createElement("li");
          
          var index = Math.floor(Math.random() * ((self.json.products.length - 1) - 0 + 1)) + 0;
          do{
            index = Math.floor(Math.random() * ((self.json.products.length - 1) - 0 + 1)) + 0;
          } while (used.indexOf(index) > -1);
          
          used.push(index);

          const name = self.json.products[index].name;
          const price = self.json.products[index].price;
          const imgSrc = self.json.products[index].image.src;
          
          const markup = `
          <li class="rb-item">
            <img src="${imgSrc}" alt="img"/>
            <span class="title">${name}</span>
            <span class="price">${price}</span>
          </div>
          `;

          _El.innerHTML = markup;

          _List.appendChild(_El);
        }
      }
		}
	});
	$.subscribe('pageReady', function() {
		_buildingBlocks.recentlyBought.init();
	});
}(jQuery));

var _buildingBlocks = _buildingBlocks ? _buildingBlocks : {};
(function ($) {
	$.extend(_buildingBlocks, {
		$selector: null,
		videosResponsive: function ($object) {
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
}(jQuery));