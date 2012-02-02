/**
 * 
 * Find more about the lame micro-framework at
 * http://cubiq.org/
 *
 * Copyright (c) 2010 Matteo Spinelli, http://cubiq.org/
 * Released under MIT license
 * http://cubiq.org/dropbox/mit-license.txt
 * 
 */

// Create our own namespace (because it's cool)
(function () {

// Define the core element
var $ = function (query) {
		return new customNL(query);
	},
	
	// Custom Node List
	customNL = function (query) {
		if (query.nodeType) {					// query is already a Node
			query = [query];
		} else if (typeof query == 'string') {	// query is a string
			query = document.querySelectorAll(query);
		} else if (!(query instanceof Array)) {	// if none of the above, query must be an array
			return null;
		}

		this.length = query.length;
		for (var i=0; i<this.length; i++) {
			this[i] = query[i];
		}

		return this;
	},
	
	// Holds all functions to be executed on DOM ready
	readyFn = [],
	
	// Executed on DOMContentLoaded
	DOMReady = function () {
		for(var i=0, l=readyFn.length; i<l; i++) {
			readyFn[i]();
		}
		readyFn = null;
		document.removeEventListener('DOMContentLoaded', DOMReady, false);
	};


// Merge to objects
$.extend = function (obj, target) {
	target = target || customNL.prototype;	// To help plugin development
	for (var prop in obj) {
		target[prop] = obj[prop];
	}
};

// Add feature to the $ class
$.extend({
	isIpad: (/ipad/gi).test(navigator.appVersion),
	isIphone: (/iphone/gi).test(navigator.appVersion),
	isAndroid: (/android/gi).test(navigator.appVersion),
	isOrientationAware: ('onorientationchange' in window),
	isHashChangeAware: ('onhashchange' in window),
	isStandalone: window.navigator.standalone,
	has3d: ('WebKitCSSMatrix' in window && 'm11' in new WebKitCSSMatrix()),

	// Execute functions on DOM ready
	ready: function (fn) {
		if (readyFn.length == 0) {
			document.addEventListener('DOMContentLoaded', DOMReady, false);
		}

		readyFn.push(fn);
	},
	
	hasClass: function (el, className) {
		return new RegExp('(^|\\s)' + className + '(\\s|$)').test(el.className);
	},
}, $);

// Custom NodeList prototypes
customNL.prototype = {
	each: function (callback) {
		for (var i=0; i<this.length; i++) {
			callback.call(this[i]);
		}
		
		return this;
	},

	style: function (attrib, value) {
		if (typeof attrib == 'string' && value === undefined) {
			return window.getComputedStyle(this[0], null).getPropertyValue(attrib);
		}
		
		if (typeof attrib != 'object') {
			attrib[attrib] = value;
		}

		return this.each(function () {
			for (var i in attrib) {
				this.style[i] = attrib[i];
			}
		});
	},

	item: function (num) {
		return $(this[num]);
	},
	
	bind: function (type, fn, capture) {
		return this.each(function () {
			this.addEventListener(type, fn, capture ? true : false);
		});
	},
	
	unbind: function (type, fn, capture) {
		return this.each(function () {
			this.removeEventListener(type, fn, capture ? true : false);
		});
	},
	
	parent: function () {
		var result = [], parent, i, l;
		this.each(function () {
			parent = this.parentNode;
			if (!parent._counted) {
				result[result.length] = parent;
				parent._counted = true;
			}
		});
		
		return $(result).each(function () {
			delete this._counted;
		});
	},
	
	// Returns the first element className
	hasClass: function (className) {
		return $.hasClass(this[0], className);
	},
	
	// Add one or more classes to all elements
	addClass: function () {
		var className = arguments;

		for (var i=0, l=className.length; i<l; i++) {
			this.each(function () {
				if (!$.hasClass(this, className[i])) {
					this.className = this.className ? this.className + ' ' + className[i] : className[i];
				}
			});
		}
		
		return this;
	},
	
	// Remove one or more classes from all elements
	removeClass: function () {
		var className = arguments;
		
		for (var i=0, l=className.length; i<l; i++) {
			this.each(function () {
				this.className = this.className.replace(new RegExp('(^|\\s+)' + className[i] + '(\\s+|$)'), ' ');
			});
		}
		
		return this;
	},
	
	html: function (value) {
		if (value === undefined) {
			return this[0].innerHTML;
		}
		
		return this.each(function () {
			this.innerHTML = value;
		});
	},
	
	width: function (value) {
		if (value === undefined) {
			return this[0].clientWidth;
		}
		
		return this.each(function () {
			this.style.width = value + 'px';
		});
	},

	height: function (value) {
		if (value === undefined) {
			return this[0].clientHeight;
		}
		
		return this.each(function () {
			this.style.height = value === '' ? '' : value + 'px';
		});
	}
}

// Expose $ to the world
window.$ = $;

})();	// Execute our namespace