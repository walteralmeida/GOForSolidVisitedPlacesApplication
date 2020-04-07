window.GO = GenerativeObjects = window.GenerativeObjects || {};
GenerativeObjects.Web = GenerativeObjects.Web || {};
GO.Web.JSON = GO.Web.JSON || {};
GO.Web.Url = GO.Web.Url || {};
GO.Filter = GO.Filter || {};
GO.Array = GO.Array || {};
GO.Regex = GO.Regex || {};

(function (global) {
	//constant
	GenerativeObjects.Web.DB_KEY = "dbKey";
	GO.Regex.DateTime = /(\d\d\d\d)-(\d\d)-(\d\d).(\d\d):(\d\d):(\d\d)/;
	GO.Regex.DateTimeWithTimezoneOffset = /(\d\d\d\d)-(\d\d)-(\d\d).(\d\d):(\d\d):(\d\d).*([\+\-])(\d\d):(\d\d)/;

	GenerativeObjects.Web.JSONToData = function (jsondata) {
		var result = null;

		if ((typeof jsondata == "string") && jsondata.match(/^\/Date\((.*)\)\/$/)) {
			// Date type => special parse                
			result = new Date(parseInt(jsondata.match(/^\/Date\((.*)\)\/$/)[1], 10));
		}
		else
			result = jsondata;

		return result;
	};

	GenerativeObjects.Web.JSONToDataObject = function (jsondata, dataobject) {
		var oldDirtyHandlerOn = dataobject.DirtyHandlerOn;
		var oldNotifyChangesOn = dataobject.notifyChangesOn;
		dataobject.DirtyHandlerOn = false;
		dataobject.notifyChangesOn = false;

		for (prop in jsondata) {
			if ((typeof jsondata[prop] == "string") && jsondata[prop].match(GO.Regex.DateTime)) {

				// Date type => special parse
				var date = GO.ExtractDateFromJSONRoundtrip(jsondata[prop]);

				// Go via the dataobject so that it can apply timezone offset etc
				dataobject.setDateTimeFromJSON(prop, date);
			}
			else {
				if (dataobject.Data[prop])
					dataobject.Data[prop](jsondata[prop]);
			}
		}

		dataobject.DirtyHandlerOn = oldDirtyHandlerOn;
		dataobject.notifyChangesOn = oldNotifyChangesOn;

		// Updating all dependent values in one shot
		dataobject.updateDependentValues();

		return dataobject;
	};

	GenerativeObjects.Web.DataObjectToJSON = function (dataobject) {
		var jsondata = {};
		for (prop in dataobject.Data) {

			// Only map observables, ignore relation properties, non-observable and computed variables
			if (ko.isObservable(dataobject.Data[prop])) {
				jsondata[prop] = dataobject.Data[prop]();

				if (jsondata[prop] && jsondata[prop].getMonth && jsondata[prop].getDay && jsondata[prop].getFullYear) {

					// Send the full date + timezone info
					// But note: For technical reasons, the server side doesn't support deserialising of the timezone info in this field currently 
					jsondata[prop] = jsondata[prop].toJSONRoundtrip();

					// Send the full offset info in a 'virtual' field (because not suported on the 'actual' field)
					jsondata[prop + "_WithTimezoneOffset"] = jsondata[prop];
				}
				else if (dataobject.Data[prop]())
					jsondata[prop] = dataobject.Data[prop]();
			}
		}

		return jsondata;
	};

	// Used only to send PKs
	GenerativeObjects.Web.DataToJSON = function (data) {
		var jsondata = null;

		if (data && data.getMonth && data.getDay && data.getFullYear) //TODO: not best way to test date type
		{
			var separator = "";
			var year = data.getFullYear();
			var month = (data.getMonth() + 1) < 10 ? "0" + (data.getMonth() + 1) : (data.getMonth() + 1);
			var day = data.getDate() < 10 ? "0" + data.getDate() : data.getDate();
			var hour = data.getHours() < 10 ? "0" + data.getHours() : data.getHours();
			var minu = data.getMinutes() < 10 ? "0" + data.getSeconds() : data.getSeconds();
			var sec = data.getSeconds() < 10 ? "0" + data.getSeconds() : data.getSeconds();
			// format is : "yyyyMMdd hhmmss"
			var dateFormat = year + separator + month + separator + day + " " + hour + separator + minu + separator + sec;
			jsondata = dateFormat;

		}
		else
			jsondata = data;

		return jsondata;
	};
	GenerativeObjects.Web.GetEnvironment = function () {
		// reuse jQuery detection
		return $.extend(
			{
				GOversion: '1.24',
				isMobile: window.matchMedia("only screen and (max-width: 760px)").matches ? true : false
			},
			$.browser
		);
	};

	GO.Web.isDataObjectInContext = function (dataobject, contextId) {
		if (!contextId || contextId.length === 0)
			return false;

		for (var i = 0; i < dataobject.contextIds.length; i++) {
			var objectContextId = dataobject.contextIds[i];

			if (objectContextId.length < contextId.length) {
				continue;
			}

			var isInContext = true;

			for (var j = 0; j < contextId.length; j++) {
				if (objectContextId[j] !== contextId[j]) {
					isInContext = false;
					break;
				}
			}

			if (isInContext)
				return true;
		}

		return false;
	};

	global.GO.log = function (source, msg, data) {
		if (GenerativeObjects.Web.ActivateClientLogging) {
			var ts = GO.DateToString(new Date(), true);
			var h = window.location.hash;
			if (data)
				console.log(ts, h, source, msg, JSON.stringify(data));
			else
				console.log(ts, h, source, msg);
		}
	};

	// Compares 2 GO entities
	global.GO.compareEntities = function (a, b) {
		var diffs = {};
		if (a && b && a._objectType && a._objectType === b._objectType) {
			for (var prop in a.Data) {
				if (ko.isObservable(a.Data[prop]) && !ko.isPureComputed(a.Data[prop])
					&& !$.isArray(a.Data[prop]()) // enum values
					&& b.Data[prop]() != a.Data[prop]()) {
					diffs[prop] = { 'a': a.Data[prop](), 'b': b.Data[prop]() };
				}
			}
			return diffs;
		}
		return null;
	}

	global.GO.observableArray = function (changeHandler) {

		var self = this;

		this.changeHandler = changeHandler;
		this.changedHandlerOn = true;
		this.dirtyHandlerOn = true;

		this.innerArray = ko.observableArray();

		this.length = ko.pureComputed(function () {
			return self.innerArray().length;
		});

		this.push = function (objectToPush) {
			self.innerArray.push(objectToPush);
			if (self.changeHandler && self.changedHandlerOn === true) {
				self.changeHandler("add", [objectToPush], null, self.dirtyHandlerOn);
			}
		};

		this.remove = function (objectToRemove) {
			self.innerArray.remove(objectToRemove);
			if (self.changeHandler && self.changedHandlerOn === true) {
				self.changeHandler("remove", null, [objectToRemove], self.dirtyHandlerOn);
			}
		};

		this.removeAll = function () {
			if (self.changeHandler && self.changedHandlerOn === true) {
				self.changeHandler("remove", null, self.innerArray(), self.dirtyHandlerOn);
			}

			self.innerArray.removeAll();
		};

		this.get = function (index) {
			return self.innerArray()[index];
		};
	};

	if (!Array.prototype.indexOf) {
		Array.prototype.indexOf = function (obj, start) {
			for (var i = (start || 0), j = this.length; i < j; i++) {
				if (this[i] === obj) {
					return i;
				}
			}
			return -1;
		};
	}

    /**
     * Formatting Date to String with leading zeros
     * @param myDate
     * @param withTime
     * @return {string} date as string
     * @see unit tests in project [GenerativeObjects.Application.Web Js Tests/test/generativeobjectTest.js]
     */
	global.GO.DateToString = function (myDate, withTime) {
		if (!myDate)
			return null;
		var stringDate = ('0' + myDate.getDate()).slice(-2) + '/' + ('0' + (myDate.getMonth() + 1)).slice(-2) + '/' + myDate.getFullYear();
		if (withTime) {
			return stringDate + ' ' + ('0' + myDate.getHours()).slice(-2) + ':' + ('0' + myDate.getMinutes()).slice(-2) + ':' + ('0' + myDate.getSeconds()).slice(-2);
		} else {
			return stringDate;
		}
	};


	global.GO.ReconstructDataObjectFieldAccessor = function (dataObj, arrayAccessorsArgs) {
		if (!arrayAccessorsArgs || arrayAccessorsArgs.length == 0) return null;
		var result = dataObj, attr;
		for (var i = 0; i < arrayAccessorsArgs.length; i++) {
			attr = arrayAccessorsArgs[i];
			if (result !== null && result.Data && attr in result.Data) {
				result = result.Data[attr].call();
			} else {
				return null;
			}
		}
		return result;
	};

	// returns a sort function based on the given ColumnName & Order (asc/desc)
	GO.getSortFunction = function (columnName, order) {
		var args = columnName.split(".");
		if (order == "desc") {
			return function (left, right) {
				var l = GO.ReconstructDataObjectFieldAccessor(right, args);
				var r = GO.ReconstructDataObjectFieldAccessor(left, args);
                if (l === null) {
                    return -1;
                }
                else if (r === null) {
                    return 1;
                }
				return l == r ? 0 : l < r ? -1 : 1;
			};
		} else {
			return function (left, right) {
				var l = GO.ReconstructDataObjectFieldAccessor(left, args);
                var r = GO.ReconstructDataObjectFieldAccessor(right, args);
                if (l === null) {
                    return -1;
                }
                else if (r === null) {
                    return 1;
                }
				return l == r ? 0 : l < r ? -1 : 1;
			};
		}
	};

	// Reconstruct an object from a specific string : Used to correct the bug : GO-268
	// ie : obj : baseFormViewModel
	// propString : "subFormViewModel.myfield"
	// return baseFormViewModel[subFormViewModel][MyField]
	ReconstructObject = function ReconstructObject(obj, propString) {
		if (!propString) return obj;
		var prop, props = propString.split('.');
		for (var i = 0, iLen = props.length - 1; i < iLen; i++) {
			prop = props[i];
			if (typeof obj == 'object' && obj !== null && prop in obj) {
				obj = obj[prop];
			} else {
				break;
			}
		}
		return obj[props[i]];
	};

    /**
     * Formatting Number to String with leading zeros (no scale)
     * @param {decimal} n
     * @return {string} number formatted
     */
	global.GO.FormatNumberWithSpaces = function (n) {
		if (n == undefined || n == null)
			return "";
		var parts = n.toString().split(".");
		parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
		return parts.join(".");
	};

    /**
     * @param {decimal} n
     * @param {string} currency
     * @return {string} number formatted with currency 
     */
	global.GO.FormatNumberToEuros = function (n, currency) {
		if (n == undefined || n == null)
			return "";
		if (currency == undefined || currency == null)
			currency = " \u20AC";
		var parts = GO.FormatNumberWithSpaces(n).toString().split(".");
		if (parts.length > 1) {

			return parts[0] + "," + (parts[1] + '00').slice(0, 2) + currency;

		} else {
			return parts[0] + ',00' + currency;
		}
	};

    /**
     * Format a decimal in mix Fr / En : indeed thousands separator is ' ' and decimal separator is '.'
     * @param {decimal} numberValue
     * @param {string} rawScale
     * @return {string} number formatted with fr-FR locale and a '.' (point) in place of ',' (comma) - ex: 15 256 897.41
     */
	global.GO.FormatNumber_custom = function (numberValue, rawScale) {
		var formattedValue = "";
		if (numberValue != null && !numberValue.isEmpty)  {
			//var userLocale = (navigator.languages && navigator.languages.length) ? navigator.languages[0] : navigator.language;
			//var locale = allBindingsAccessor.get('locale') || userLocale || 'fr-FR';
			var locale = 'fr-FR';
			var DEFAULT_SCALE = 2;
			//var rawScale = allBindingsAccessor.get('scale');
			var scale = (rawScale === undefined || rawScale === null || rawScale.toString().trim().length === 0) ? DEFAULT_SCALE : rawScale;
			var options = { minimumFractionDigits: scale, maximumFractionDigits: scale };
			var tmpFormattedValue = numberValue.toLocaleString(locale, options);
			formattedValue = tmpFormattedValue.replace(",", ".");
		}
		return formattedValue;
	};

	//Trunc str beyond n
	global.GO.TruncString = function (str, n) {
		if (str === undefined || str === null) return "";
		if (str.length > n) {
			return str.substring(0, n) + " ...";
		} else {
			return str;
		}
	};


	// Converts a Date object to a XXXX-XX-XX string (used mostly for filter).
	// This method is Timezone agnostic
	global.GO.DateRevertWithDash = function (myDate, withTime, tzOffset) {
		if (!myDate)
			return null;

		var stringDate = myDate.getFullYear() + '-' + ('0' + (myDate.getMonth() + 1)).slice(-2) + '-' + ('0' + myDate.getDate()).slice(-2);

		if (withTime) {
			stringDate += ' ' + ('0' + myDate.getHours()).slice(-2) + ':' + ('0' + myDate.getMinutes()).slice(-2) + ':' + ('0' + myDate.getSeconds()).slice(-2);

			// Note that tzOffset is not currently used since LLBLGen fails to match datetimes that are 'the same' but at different offsets
			// When we switch ORM, we can try to use it again
			// if (typeof tzOffset !== 'undefined')
			//	 stringDate += GO.FormatTimezoneOffset(tzOffset);

			return stringDate;

		} else {
			return stringDate;
		}
	};

	global.GO.DateRevertWithDashUTC = function (myDate, withTime, tzOffset) {
		if (!myDate)
			return null;

		var stringDate = myDate.getUTCFullYear() + '-' + ('0' + (myDate.getUTCMonth() + 1)).slice(-2) + '-' + ('0' + myDate.getUTCDate()).slice(-2);

		if (withTime) {
			stringDate += ' ' + ('0' + myDate.getUTCHours()).slice(-2) + ':' + ('0' + myDate.getUTCMinutes()).slice(-2) + ':' + ('0' + myDate.getUTCSeconds()).slice(-2);

			// Note that tzOffset is not currently used since LLBLGen fails to match datetimes that are 'the same' but at different offsets
			// When we switch ORM, we can try to use it again
			// if (typeof tzOffset !== 'undefined')
			//	 stringDate += GO.FormatTimezoneOffset(tzOffset);

			return stringDate;

		} else {
			return stringDate;
		}
	};

	GO.GetFirstDayOfMonth = function (myDate) {
		if (!myDate) return null;
		var firstDay = new Date(myDate.getFullYear(), myDate.getMonth(), 1);
		return GO.DateRevertWithDash(firstDay);
	};

	GO.GetLastDayOfMonth = function (myDate) {
		if (!myDate) return null;
		var lastDay = new Date(myDate.getFullYear(), myDate.getMonth() + 1, 0);
		return GO.DateRevertWithDash(lastDay);
	};

	GO.GetFirstDayOfYear = function (year) {
		if (!year) return null;
		var firstDay = new Date(year, 0, 1);
		return GO.DateRevertWithDash(firstDay);
	};

	GO.GetLastDayOfYear = function (year) {
		if (!year) return null;
		var lastDay = new Date(year + 1, 0, 0);
		return GO.DateRevertWithDash(lastDay);
	};

    GO.GetStartOfDay = function (myDate) {
        if (!myDate) return null;
        var firstLight = new Date(myDate.getFullYear(), myDate.getMonth(), myDate.getDate(), 0, 0, 0);
        return GO.DateRevertWithDash(firstLight, true);
    }

    GO.GetEndOfDay = function (myDate) {
        if (!myDate) return null;
        var lastLight = new Date(myDate.getFullYear(), myDate.getMonth(), myDate.getDate(), 23, 59, 59);
        return GO.DateRevertWithDash(lastLight, true);
    }

	GO.GetFirstDayOfMonthUTC = function (myDate) {
		if (!myDate) return null;
		var firstDay = new Date(myDate.getFullYear(), myDate.getMonth(), 1);
		return GO.DateRevertWithDashUTC(firstDay, true);
	};

	GO.GetLastDayOfMonthUTC = function (myDate) {
		if (!myDate) return null;
		//var lastDay = new Date(myDate.getFullYear(), myDate.getMonth() + 1, 0, 23, 59, 59).addDays(-1);
		var lastDay = new Date(myDate.getFullYear(), myDate.getMonth() + 1, 0);
		return GO.DateRevertWithDashUTC(lastDay, true);
	};

	GO.GetFirstDayOfYearUTC = function (year) {
		if (!year) return null;
		var firstDay = new Date(year, 0, 1);
		return GO.DateRevertWithDashUTC(firstDay, true);
	};

	GO.GetLastDayOfYearUTC = function (year) {
		if (!year) return null;
		var lastDay = new Date(year + 1, 0, 0, 23, 59, 59).addDays(-1);
		return GO.DateRevertWithDashUTC(lastDay, true);
	};

	GO.GetStartOfDayUTC = function (myDate) {
	    if (!myDate) return null;
	    var firstLight = new Date(myDate.getFullYear(), myDate.getMonth(), myDate.getDate(), 0, 0, 0);
	    return GO.DateRevertWithDashUTC(firstLight, true);
	}

	GO.GetEndOfDayUTC = function (myDate) {
	    if (!myDate) return null;
	    var lastLight = new Date(myDate.getFullYear(), myDate.getMonth(), myDate.getDate(), 23, 59, 59);
	    return GO.DateRevertWithDashUTC(lastLight, true);
	}

	GO.CreateYearArray = function (middleYear, span, nullable) {
		var result = nullable ? [""] : [];
		for (var i = -span; i < span + 1; i++) {
			result.push(middleYear + i);
		}
		return result;
	}

	GO.GetMonthArray = function (regional, nullable) {
		var result = nullable ? [""] : [];
		for (var i = 0; i < 12; i++) {
			result.push({ index: i, text: $.datepicker.regional[regional].monthNames[i] });
		}
		return result;
	}

	// Add days to a Date
	Date.prototype.addDays = function (days) {
		var dat = new Date(this.valueOf());
		dat.setDate(dat.getDate() + days);
		return dat;
	}

	Date.prototype.addSeconds = function (seconds) {
		this.setSeconds(this.getSeconds() + seconds);
		return this;
	};

	Date.prototype.addMinutes = function (minutes) {
		this.setMinutes(this.getMinutes() + minutes);
		return this;
	};

	Date.prototype.addHours = function (hours) {
		this.setHours(this.getHours() + hours);
		return this;
	};

	Date.prototype.toJSONRoundtrip = function () {
		function padLeadingZero(n) {
			return (n < 10 ? '0' : '') + n;
		}

		// "YYYY-MM-DDThh:mm:ss.000+00:00" (where datetime is local and offset is from GMT)
		var json =
			this.getFullYear() + '-'
			+ padLeadingZero(this.getMonth() + 1) + '-'
			+ padLeadingZero(this.getDate()) + 'T'
			+ padLeadingZero(this.getHours()) + ":"
			+ padLeadingZero(this.getMinutes()) + ":"
			+ padLeadingZero(this.getSeconds())
			+ '.000';

		// append timezone offset
		json += GO.FormatTimezoneOffset(this.getTimezoneOffset());

		return json;
	};

	GO.FormatTimezoneOffset = function (minutes) {
		function padLeadingZero(n) {
			return (n < 10 ? '0' : '') + n;
		}
		var tzOffset = parseInt(minutes);
		var tzOffsetSign = tzOffset <= 0 ? '+' : '-';		// bit weird: js date.getTimezoneOffset sign is the opposite of standard round-trip notation?!
		var tzOffsetHours = Math.floor(Math.abs(tzOffset) / 60);
		var tzOffsetMinutes = Math.abs(tzOffset % 60);
		return tzOffsetSign + padLeadingZero(tzOffsetHours) + ":" + padLeadingZero(tzOffsetMinutes);
	}


	GO.ExtractDateFromJSONRoundtrip = function (iso) {

		var dateparts = iso.match(GO.Regex.DateTime);

		var year = parseInt(dateparts[1]);
		var month = parseInt(dateparts[2]) - 1;
		var date = parseInt(dateparts[3]);
		var hours = parseInt(dateparts[4]);
		var minutes = parseInt(dateparts[5]);
		var seconds = parseInt(dateparts[6]);

		var result = new Date(year, month, date, hours, minutes, seconds);

		// With timeoffset ?
		var tzOffsetMinutes = 0;
		dateparts = iso.match(GO.Regex.DateTimeWithTimezoneOffset);
		if (dateparts) {
			// timezone offset at the time the date was set
			tzOffsetMinutes = (parseInt(dateparts[8]) * 60) + parseInt(dateparts[9]);
		}

		return { Date: result, TimezoneOffset: tzOffsetMinutes };
	};

	// In theory, if we want to display datetimes in different timezones etc, we can adjust the date here and use it instead
	// Currently just a stub (it was doing something useful at one point during dev, decided to keep it as placeholder for future expansion)
	GO.GetDisplayDate = function (date, timezoneOffset, isAbsolute) {
		return date;
	};

	GO.IsNumber = function (n) {
		return !(n != parseFloat(n) || isNaN(parseFloat(n)));
	};

	GO.IsGuid = function (data) {
		var reg = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
		return reg.test(data);
	};

	GO.isObjectEmpty = function (o) {
		for (var key in o) {
			if (o.hasOwnProperty(key)) {
				return false;
			}
		}
		return true;
	};

	GO.deconstructJWT = function (token) {
		var segments = token.split(".");
		if (!segments instanceof Array || segments.length !== 3) {
			throw new Error("Invalid JWT");
		}
		var claims = segments[1];
		if (window.atob) {
			return JSON.parse(decodeURI(decodeURIComponent(escape(window.atob(claims)))));
		}
		else { // IE < IE9
			return JSON.parse(decodeURI(decodeURIComponent(escape(decode64(claims)))));
		}
	};

    /*!
    Math.uuid.js (v1.4)
    http://www.broofa.com
    mailto:robert@broofa.com

    Copyright (c) 2010 Robert Kieffer
    Dual licensed under the MIT and GPL licenses.
    */

	// A more performant, but slightly bulkier, RFC4122v4 solution.  We boost performance
	// by minimizing calls to random()
	var CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');

	// Initialize a new "random" number generator for the current session
	// We use MersenneTwister, which seems to be faster and safer than the browser's default 
	// https://medium.com/@betable/tifu-by-using-math-random-f1c308c4fd9d
	var m = new MersenneTwister();

	Math.uuid = function () {
		var chars = CHARS, uuid = new Array(36), rnd = 0, r;
		for (var i = 0; i < 36; i++) {
			if (i == 8 || i == 13 || i == 18 || i == 23) {
				uuid[i] = '-';
			} else if (i == 14) {
				uuid[i] = '4';
			} else {
				if (rnd <= 0x02) rnd = 0x2000000 + (m.random() * 0x1000000) | 0;
				r = rnd & 0xf;
				rnd = rnd >> 4;
				uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
			}
		}
		return uuid.join('');
	};

    /**
     * Utility to update or append a URL key=value
     * @param uri old uri to update
     * @param key 
     * @param value 
     * @return {string} uri with new query string
     * @see unit tests in project [GenerativeObjects.Application.Web Js Tests/test/generativeobjectTest.js]
     */
	GO.UpdateQueryStringParameter = function updateQueryStringParameter(uri, key, value) {
		var re = new RegExp("([?|&])" + key + "=.*?(&|#|$)", "i");
		if (uri.match(re)) {
			return uri.replace(re, '$1' + key + "=" + value + '$2');
		} else {
			var hash = '';
			if (uri.indexOf('#') !== -1) {
				hash = uri.replace(/.*#/, '#');
				uri = uri.replace(/#.*/, '');
			}
			var separator = uri.indexOf('?') !== -1 ? "&" : "?";
			return uri + separator + key + "=" + value + hash;
		}
	};

    /**
     * Get value of query param from an url
     * @param {string} key searched
     * @param {string} url in which we search
     * @returns {string} value of the key query string
     * @see unit tests in project [GenerativeObjects.Application.Web Js Tests/test/generativeobjectTest.js]
     */
	GO.GetUrlQueryString = function (key, url) {
		if (!url) {
			url = window.location.href;
		}
		var regex = new RegExp("[\\?&]" + key + "=([^&#]*)");
		var groups = regex.exec(url);
		if (groups === null) {
			return null;
		} else {
			return decodeURI(groups[1]) || 0;
		}
	};
    /**
     * Definition of object QueryParams with its methods and fields
     * @see unit tests in project [GenerativeObjects.Application.Web Js Tests/test/generativeobjectTest.js]
     */
	GO.QueryParams = function () {
		var queryStringParts = [];

        /**
         * Add One parameter
         * @param {string} queryParamKey 
         * @param {string} queryParamValue 
         */
		this.add = function (queryParamKey, queryParamValue) {
			if (queryParamKey && queryParamValue) {
				queryStringParts.push(queryParamKey + "=" + queryParamValue);
			}
		};

        /**
         * Build the query param string according to params already added with or without QuestionMark
         * @param {bool} withQuestionMark mean adding at the beginning a '?'
         * @returns {string} complete query string
         */
		this.build = function (withQuestionMark) {
			var queryString = "";
			if (queryStringParts.length > 0) {
				if (withQuestionMark) {
					queryString = "?"
				}
				queryString += queryStringParts.join("&");
			}

			return queryString;
		};

        /**
         * Build the query param string according to params already added with QuestionMark '?'
         * @returns {string} complete query string with ? at the beginning
         */
		this.buildWithQuestionMark = function () {
			return this.build(true);
		};
        /**
         * Build the query param string according to params already added without QuestionMark '?'
         * @returns {string} complete query string without '?' at the beginning
         */
		this.buildWithoutQuestionMark = function () {
			return this.build(false);
		};
	};

	GO.Colors = function () {
		this.colors = [
			{ name: "blue", border: "rgb(54, 162, 235)", background: "rgba(54, 162, 235, 0.5)" },
			{ name: "green", border: "rgb(75, 192, 192)", background: "rgba(75, 192, 192, 0.5)" },
			{ name: "orange", border: "rgb(255, 159, 64)", background: "rgba(255, 159, 64, 0.5)" },
			{ name: "purple", border: "rgb(153, 102, 255)", background: "rgba(153, 102, 255, 0.5)" },
			{ name: "red", border: "rgb(255, 99, 132)", background: "rgba(255, 99, 132, 0.5)" },
			{ name: "yellow", border: "rgb(255, 205, 86)", background: "rgba(255, 205, 86, 0.5)" },
			{ name: "grey", border: "rgb(201, 203, 207)", background: "rgba(201, 203, 207, 0.5)" }
		];

		this.currentColorIndex = 0;

		this.getNextColor = function () {
			var toReturn = this.colors[this.currentColorIndex];

			this.currentColorIndex++;
			if (this.currentColorIndex == this.colors.length) {
				this.currentColorIndex = 0;
			}

			return toReturn;
		}
	};

    /**
     * @param {string} value
     * @returns {boolean} true if null or "" or " " otherwise false
     */
	GO.isNullOrWhitespace = function (value) {
		return !value || value === null || !value.toString().trim();
	};

    /**
     * @param {string} value to check
     * @param {string} suffix 
     * @returns {boolean} true if value end with the suffix
     */
	GO.endWith = function (value, suffix) {
		return value.substr(-suffix.length) === suffix;
	};

    /**
     * Check if string end with the suffix (ignore case)
     * @param {string} value to check
     * @param {string} suffix simplified RegExp (without / before and after ex: 'Filter')
     * @returns {boolean} true if value end with the suffix
     */
	GO.endWithRegExp = function (value, suffix) {
		var regExp = new RegExp(suffix + "$", "i");

		return regExp.test(value);
	};

    /**
     * @return {boolean} true if object has no property or null or undefined otherwise false
     * @see unit tests in project [GenerativeObjects.Application.Web Js Tests/test/generativeobjectTest.js]
     */
	GO.isEmpty = function (value) {
		return !(Boolean(value) && Object.keys(value).length > 0);
	};

    /**
     * create à new object with properties of obj1 + obj2
     * @param obj1
     * @param obj2
     * @return {object} object containing properties obj1 + properties obj2
     * @see unit tests in project [GenerativeObjects.Application.Web Js Tests/test/generativeobjectTest.js]
     */
	GO.union = function (obj1, obj2) {
		var result = {};
		var properties = Object.getOwnPropertyNames(obj1);
		var propIndex;
		for (propIndex in properties) {
			result[properties[propIndex]] = obj1[properties[propIndex]];
		}
		properties = Object.getOwnPropertyNames(obj2);
		for (propIndex in properties) {
			result[properties[propIndex]] = obj2[properties[propIndex]];
		}
		return result;
	};

    /**
     * @param {string} href url string : see window.location.href
     * @returns {Object}
     */
	GO.getUrlParams = function (href) {
		//Attention au hash = parameter start with #!/ and 
		var urlParts = href.split("?");  //debut hash and queryString
		if (urlParts.length <= 1) {
			return {};
		}
		var queryStringAndHash = urlParts[1];
		var queryString = queryStringAndHash.split("#!")[0];   //debut hash
		var keyValuePairs = queryString.split("&");  //debut query string
		var keyValue, params = {}; //get an Object
		keyValuePairs.forEach(function (pair) {
			keyValue = pair.split("=");
			if (keyValue[0] !== "" && keyValue[0] != "undefined") {
				params[keyValue[0]] = decodeURIComponent(keyValue[1]);
			}
		});
		return params;
	};

    /**
     * On n'ajoute pas au début le '?' ni de '&' à la fin
     * @param {Object} parametersObj
     * @returns {string} parameters string without hash
     */
	GO.buildRemainingParameters = function (parametersObj) {
		if (!parametersObj)
			return "";
		var stringWindowLocationSearch = "";
		if (parametersObj) {
			var index = 0;
			for (var key in parametersObj) {
				if (index > 0) {
					stringWindowLocationSearch += "&";
				}
				stringWindowLocationSearch += key + "=" + encodeURIComponent(parametersObj[key]);
				index++;
			}
		}

		return stringWindowLocationSearch.length === 0 ? "" : stringWindowLocationSearch;
	};

    /**
     * get hash : le hash est toujours en derniere position des parametres de la query et commence toujours par '#!'
     * @param {string} stringParameters :
     * @returns {string} hash
     */
	GO.getHash = function (stringParameters) {
		if (GO.isNullOrWhitespace(stringParameters))
			return "";
		var elements = stringParameters.split('#!');
		if (elements.length > 0) {
			var split2 = elements[1].split('?');
			if (split2 && split2.length > 0)
				return split2[0];
			else
				return elements[1];
		}
		return "";
	};

    /**
     * Change URL without reloading page
     * @param {string} newUrl of the page
     */
	GO.changeUrl = function (newUrl) {
		//We continue only if the 'new url' is really a new one
		if (newUrl === GO.getHref()) {
			return;
		}
		if (typeof (history.pushState) != "undefined") {
			window.Sammy()._location_proxy.unbind();
			history.pushState("", "", newUrl);
			window.Sammy()._location_proxy.bind();
		} else {
			alert("Browser does not support HTML5 (history.pushState).");
		}
	};

    /**
     * A filterkey is a key starting with 'Filter'
     * Then all keys ending with 'Filter[.*]' are removed
     */
	GO.removeAllFiltersFromQueryStringFromUrl = function () {
		//A filter Query String is a key starting with 'Filter'
		var currentUrl = GO.getHref();
		var urlParameters = GO.getUrlParams(currentUrl);
		//No url change when no filter to delete : it's important to limit changing browser history 
		// to be able to use efficiently the back button
		for (var param in urlParameters) {
			if (GO.endWithRegExp(param, "Filter\\d*")) {
				delete urlParameters[param];
			}
		}
		//remove all 'filter' key from URL parameters
		//update 'window.location.href' without reloading page*
		var newUrl = GO.buildURL(currentUrl, urlParameters);
		GO.changeUrl(newUrl);

		return newUrl;
	};

    /**
     * Encapsulated in a function, so i can stub it in tests
     * @return {string} Href
     */
	GO.getHref = function () {
		return window.location.href;
	};

    /**
     * remove serialized filter of current filter from URL
     * @param {string} filterName - must end with 'Filter'
     */
	GO.removeQueryStringFromUrl = function (filterName) {
		var currentUrl = GO.getHref();
		var urlParameters = GO.getUrlParams(currentUrl);
		//No url change when no filter to delete : it's important to limit changing browser history 
		// to be able to use efficiently the back button
		if (!urlParameters[filterName])
			return;
		//remove 'filter' from URL parameters
		delete urlParameters[filterName];
		//update 'window.location.href' without reloading page
		var newUrl = GO.buildURL(currentUrl, urlParameters);
		GO.changeUrl(newUrl);
	};

    /**
     * Build an url completely with parameters and hash added at the right place
     * @param {string} href original
     * @param {Object} parametersObj
     * @returns {string} href rebuild with new parameters
     */
	GO.buildURL = function (href, parametersObj) {
		if (!parametersObj)
			return href;
		var newHref;
		var elements = "";
		var root = "";
		var hash = "";
		if (href.indexOf("?") !== -1) {
			elements = href.split('?');
			// var params = elements[1];
			root = elements[0];
			if (root.indexOf("#!") !== -1) {
				var racines = root.split('#!');
				root = racines[0];
				hash = racines[1];
			} else {
				if (elements[1].indexOf('#!') !== -1) {
					hash = elements[1].split('#!')[1];
				}
			}
		} else {
			elements = href.split('#!');
			root = elements[0];
			hash = elements[1];
		}
		var remainingParameters = GO.buildRemainingParameters(parametersObj);

		newHref = root + "?" + (remainingParameters ? remainingParameters : "") + (GO.isNullOrWhitespace(hash) ? "" : "#!" + hash);

		return newHref;
	};

	GO.Web.JSON.dateParser = function (key, value) {
		var reISO = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*))(?:Z|(\+|-)([\d|:]*))?$/;
		var reMsAjax = /^\/Date\((d|-|.*)\)[\/|\\]$/;

		if (typeof value === 'string') {
			var a = reISO.exec(value);
			if (a)
				return new Date(value);
			a = reMsAjax.exec(value);
			if (a) {
				var b = a[1].split(/[-+,.]/);
				return new Date(b[0] ? +b[0] : 0 - +b[1]);
			}
		}
		return value;
	};

	//------------------------
	//persistent filter helper : GO.Filter.xxx
	//------------------------
	GO.Filter.SerialisedObject = {
		PROP_VALUE: 'value', //GUID, id, ...
		PROP_TEXT: 'text'  //label or type depending on the element
	};
    /**
     * SUFFIX for object value in dropdown list
     * we have an object that describe an element of the list : {value:myValue, text:'my label'}
     * myValue could be for an enumeration just an index           : ex. Auditor_PMPPValue":{"value":"0","text":"PM"}
     *                   or for a DataObject value=the data object : ex. Auditor_AuditorRegionalCompanyValue:{"value":H3C.Web.Model.DataObjects.AuditorRegionalCompanyObject {_objectType: "AuditorRegionalCompany", ...},"text":"Agen"}
     */
	GO.Filter.SUFFIX_VALUE_OBJECT = 'Value';

    /**
     * @desc Get selected filters fields/value from url and select right value in filter
     * Allow parsing dates correctly
     * Executed for each Filter Fields Serialised
     * @example JSON.parse("{"Auditor_Name":"te","Auditor_PMPPValue":{"value":"0","text":"PM"},"NumeroH3C":"12","Seance":"2017-01-04T23:00:00.000Z", Auditor_AuditorRegionalCompanyValue:{"value":"155fa565-2262-4985-b4a3-1255c8e32740","text":"AuditorRegionalCompany"}", GO.Web.JSON.dateParser);
     * here we get a date Object for Seance
     * @requires filterViewModel.KEY_BY_FILTER_DATA_OBJECTS
     *
     * @param {string} filtersAsJson json string
     * @param {EntityFilterViewModel} filterViewModel to set
     */
	GO.Filter.setFilters = function (filtersAsJson, filterViewModel) {
		var fields = filterViewModel.filterData.fields;
		var groups = filterViewModel.filterData.groups;

		var filterFields = GO.union(fields, groups);

		if (GO.isNullOrWhitespace(filtersAsJson)) {
			return;
		}

		var filterFieldsDeserialised = JSON.parse(filtersAsJson, GO.Web.JSON.dateParser);
		for (var filterFieldDeserialised in filterFieldsDeserialised) {

			GO.Filter.setOneFilter(filterFieldDeserialised, filterFieldsDeserialised, filterFields, filterViewModel, filterViewModel.KEY_BY_FILTER_DATA_OBJECTS);

		}
	};

    /**
     * @desc
     * @param {object} filterFieldDeserialised
     * @param {map} filterFieldsDeserialised
     * @param {Array<object>} filterFields to serialize (FilterViewModel.filterData.fields)
     * @param {EntityFilterViewModel} filterViewModel
     * @param {map} keyByFilterDataObjects : key=_objectType: value=keyFieldName (ex: "AuditorRegionalCompany": "Id")
     *                                       FilterViewModel.KEY_BY_FILTER_DATA_OBJECTS
     * @returns {string} json string - serialisation of filled in fields
     */
	GO.Filter.setOneFilter = function (filterFieldDeserialised, filterFieldsDeserialised, filterFields, filterViewModel, keyByFilterDataObjects) {
		var field = filterFields[filterFieldDeserialised];
		if (!field) {
			return "";
		}

		//if observable select element : it is a field ending with 'Value'
		// we need to get right selected element from observable array and set the field with it
		// (we can't use directly the object get from queryParam)
		var boundValues = null;
		var newBoundSelectedValue = null;
		if (GO.endWith(filterFieldDeserialised, GO.Filter.SUFFIX_VALUE_OBJECT)) {
			//- get collection associated : collection end with an 's'
			boundValues = filterViewModel[filterFieldDeserialised + "s"];
			//get value from the collection corresponding to filterValue
			// bound means bound with knockoutJs
			for (var boundVal in boundValues()) {
				var valueOfFilterValue = filterFieldsDeserialised[filterFieldDeserialised].value;
				var objectOfFilterValue = filterFieldsDeserialised[filterFieldDeserialised];

				if (!valueOfFilterValue) {
					break;
				}
				//Pour les DataObjects on récupère un objet {text:'', value:''}
				if (GO.Filter.isASerialisedDataObject(objectOfFilterValue, keyByFilterDataObjects)) {
					var keyFieldName = keyByFilterDataObjects[objectOfFilterValue[GO.Filter.SerialisedObject.PROP_TEXT]];
					if (!boundValues()[boundVal].value.Data) {
						continue;
					}
					var boundKeyValue = boundValues()[boundVal].value.Data[keyFieldName]();
					if (boundKeyValue == objectOfFilterValue[GO.Filter.SerialisedObject.PROP_VALUE]) {
						newBoundSelectedValue = boundValues()[boundVal];
						break;
					}
				} else {
					if (boundValues()[boundVal].value == valueOfFilterValue) {
						newBoundSelectedValue = boundValues()[boundVal];
						break;
					}
				}
			}
		} else {
			newBoundSelectedValue = filterFieldsDeserialised[filterFieldDeserialised];
		}
		if (newBoundSelectedValue) {
			field(newBoundSelectedValue);
		}
	};

    /**
     * @param {EntityFilterViewModel} filterViewModel to serialize (FilterViewModel.filterData.fields and groups)
     * @param {map} keyByFilterDataObjects : key=_objectType: value=keyFieldName (ex: "AuditorRegionalCompany": "Id")
     *                                       FilterViewModel.KEY_BY_FILTER_DATA_OBJECTS
     * @returns {string} json string - serialization of filled in fields
     */
	GO.Filter.getFilters = function (filterViewModel, keyByFilterDataObjects) {
		var fieldsToSerialized = {};
		//be careful in filterData.fields we have filterFields in Main and filterData.groups are filterFields in a group diffrent of Main 
		var fields = filterViewModel.filterData.fields;
		var groups = filterViewModel.filterData.groups;
		var allFilterFields = GO.union(fields, groups);

		for (var filterField in allFilterFields) {
			if (!allFilterFields[filterField] || allFilterFields[filterField] === null || allFilterFields[filterField]() === null) {
				continue;
			}
			if (GO.endWith(filterField, GO.Filter.SUFFIX_VALUE_OBJECT)) {
				var filterFieldValue = allFilterFields[filterField]().value;

				if (GO.Filter.isADataObject(filterFieldValue, keyByFilterDataObjects)) {
					var key = keyByFilterDataObjects[filterFieldValue._objectType];
					var keyValue = filterFieldValue.Data[key]();
					//ex : { text: '', value: 'All' }
					//ex : { text: 'AuditorRegionalCompany', value: '758a6d57-0f80-497a-a423-78c4b3dd8034' }
					var objectToSerialise = {};
					objectToSerialise[GO.Filter.SerialisedObject.PROP_TEXT] = filterFieldValue._objectType;
					objectToSerialise[GO.Filter.SerialisedObject.PROP_VALUE] = keyValue;

					fieldsToSerialized[filterField] = objectToSerialise;
				}
				//it is a simple value
				else {
					if (filterFieldValue !== "" && filterFieldValue !== "All") {
						//          field                               //value
						fieldsToSerialized[filterField] = allFilterFields[filterField]();
					}
				}
			} else {
				if (!GO.isNullOrWhitespace(allFilterFields[filterField]())) {
					//          field                               //value
					fieldsToSerialized[filterField] = allFilterFields[filterField]();
				}
			}
		}

		if (GO.isEmpty(fieldsToSerialized))
			return "";

		return JSON.stringify(fieldsToSerialized);
	};

    /**
     * @param {object} filterFieldValue
     * @param {map} keyByFilterDataObjects : key=_objectType: value=keyFieldName (ex: "AuditorRegionalCompany": "Id")
     * @returns {boolean}
     */
	GO.Filter.isADataObject = function (filterFieldValue, keyByFilterDataObjects) {
		var typeOfFilterValue = filterFieldValue._objectType;
		if (typeOfFilterValue && keyByFilterDataObjects[typeOfFilterValue]) {
			return true;
		}
		return false;
	};

    /**
     * Is a serialised DataObject if property 'text' contains an object type contains in map KEY_BY_FILTER_DATA_OBJECTS
     * @param {object} serialisedFilterValue
     * @param {map} keyByFilterDataObjects : key=_objectType: value=keyFieldName (ex: "AuditorRegionalCompany": "Id")
     * @returns {boolean}
     */
	GO.Filter.isASerialisedDataObject = function (serialisedFilterValue, keyByFilterDataObjects) {
		var typeOfFilterValue = serialisedFilterValue[GO.Filter.SerialisedObject.PROP_TEXT];
		if (!typeOfFilterValue) {
			return false;
		}
		if (!keyByFilterDataObjects[typeOfFilterValue]) {
			return false;
		}

		return true;
	};

    /**
     * @param {string} filtersSerialized as JSON not url encoded
     * @param {string} filterName - MUST end with 'Filter'
     */
	GO.Filter.addFilterToUrl = function (filtersSerialized, filterName) {
		if (GO.isNullOrWhitespace(filtersSerialized))
			return;
		var currentUrl = GO.getHref();
		var urlParameters = GO.getUrlParams(currentUrl);
		urlParameters[filterName] = filtersSerialized;

		var newUrl = GO.buildURL(currentUrl, urlParameters);
		GO.changeUrl(newUrl);
	};

    /**
     * initializeFilterFromUrl need to be run only once because after we rebuild filterPredicate and queryParam from it
     *    then if is wrong the url will be wrong too after
     * @see Persitant Filter
     */
    GO.Filter.hasUrlFilter = function (filterName, viewModel) {
        var currentUrl = GO.getHref();
        var urlParameters = GO.getUrlParams(currentUrl);
        var filterViewModel = viewModel[filterName + "ViewModel"];
        var value = urlParameters[filterName];
        return !GO.isNullOrWhitespace(value) && !GO.isEmpty(JSON.parse(value));
    };

    GO.Filter.initializeFilterFromUrl = function (filterName, viewModel) {
        var filterViewModel = viewModel[filterName + "ViewModel"];

        // before setting filters => need to wait until all filter collections are loaded.
        var waitForFilterCollectionsLoaded = timeoutms => new Promise(function (resolve, reject) {
            var check = () => {
                if (filterViewModel.statusData.filterCollectionLoaded) {
                    resolve();
                }
                else if ((timeoutms -= 100) < 0) {
                    reject('timeout');
                }
                else
                    setTimeout(check, 100)
            }

            setTimeout(check, 100);

        });

        // in both resolve and reject cases : we set the filters, to make sure as much as the filters can be set
        waitForFilterCollectionsLoaded(5000).then(function (val) {
            GO.Filter.initializeFilterFromUrlMethod(filterName, viewModel)
        },
            function (val) {
                GO.Filter.initializeFilterFromUrlMethod(filterName, viewModel)
            });

    };

    GO.Filter.initializeFilterFromUrlMethod = function (filterName, viewModel) {
        var currentUrl = GO.getHref();
        var urlParameters = GO.getUrlParams(currentUrl);
        var filterViewModel = viewModel[filterName + "ViewModel"];

        var value = urlParameters[filterName];
        if (!GO.isNullOrWhitespace(value) && !GO.isEmpty(JSON.parse(value))) {
            filterViewModel.clearFilterDataOnly();
            GO.Filter.setFilters(urlParameters[filterName], filterViewModel);
            viewModel["on" + filterName + "ViewModelSearch"]();
        }
    };


	/**
	*  Distinct
	* - Removes duplicates from an array
	*/
	GO.Array.Distinct = function (array) {
		var seen = {};
		var out = [];
		var len = array.length;
		var j = 0;
		for (var i = 0; i < len; i++) {
			var item = array[i];
			if (seen[item] !== 1) {
				seen[item] = 1;
				out[j++] = item;
			}
		}
		return out;
	}

})(this);