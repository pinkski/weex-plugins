// { "framework": "Weex" }
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	var __weex_template__ = __webpack_require__(5)
	var __weex_script__ = __webpack_require__(6)

	__weex_define__('@weex-component/66b5d0d7a97c55083a15980130591696', [], function(__weex_require__, __weex_exports__, __weex_module__) {

	    __weex_script__(__weex_module__, __weex_exports__, __weex_require__)
	    if (__weex_exports__.__esModule && __weex_exports__.default) {
	      __weex_module__.exports = __weex_exports__.default
	    }

	    __weex_module__.exports.template = __weex_template__

	})

	__weex_bootstrap__('@weex-component/66b5d0d7a97c55083a15980130591696',undefined,undefined)

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	/**

	gcanvas.js使用说明:
	1、引入gcanvas库
	2、调用gcanvas库的createElement(component)接口，创建一个canvas对象。
	3、调用canvas对象的getContext(param)，获取用于渲染的context。

	扩展用法：
	1、对于Android环境，部分机型可能无法运行。建议在页面入口处调用gcanvas库的start(successCallback, errorCallback)函数，进行黑白名单判断。
	2、默认每16ms，会自动下发一次渲染指令。某些特殊场景下，希望自行控制下发频率的，可直接调用context.render()接口。调用后会关闭自动下发的操作，切换成每次主动调用render时才下发。

	完整示例如下：
	var libGCanvas = require('../../core/gcanvas');
	libGCanvas.start(function(){
	    nativeLog('gcanvas.start success');
	    var canvasObj = libGCanvas.createElement(gcanvasComponent);
	    var context = canvasObj.getContext('2d');
	    //do any action here
	},function(){
	    nativeLog('gcanvas.start failed');
	}); 

	*/

	var GBridge = __webpack_require__(2).GBridge;
	var GLog = __webpack_require__(2).GLog;
	//var GContextWebGL = require('./gwebgl');
	var GContext2D = __webpack_require__(4);

	///////////////////////////////
	var GSupport = {};
	var model_check;
	var version_check;
	GSupport.renderMode = 0;// 0--RENDERMODE_WHEN_DIRTY, 1--RENDERMODE_CONTINUOUSLY
	GSupport.hybridLayerType = -1;// 0--LAYER_TYPE_NONE 1--LAYER_TYPE_SOFTWARE 2--LAYER_TYPE_HARDWARE. change hybrid layer type from LAYER_TYPE_SOFTWARE to unset, avoid block when use html5 audio.
	GSupport.checkType = 0;// 0--all support, 1--white list check
	GSupport.nativeVer = 0;
	GSupport.defaultHiQualityMode = true; // false-- normal true--hiQuality
	GSupport.supportScroll = false;
	GSupport.newCanvasMode = false;             //true: GCanvasView in Webview
	GSupport.sameLevel = false; //newCanvasMode = true && true: GCanvasView and Webview is same level;
	GSupport.clearColor = "white";
	GSupport.WHITE_LIST = [

	    model_check = [
	        function(info) {return info.MODEL == 'GT-I9300';},
	        function(info) {return info.MODEL == 'GT-I9500';},
	        function(info) {return info.MODEL == 'GT-N7108';},
	        function(info) {return info.MODEL == 'HIKe 848A';},
	        function(info) {return info.MODEL == 'HTC 601e';},
	        function(info) {return info.MODEL == 'HUAWEI C8813';},
	        function(info) {return info.MODEL == 'Lenovo K900';},
	        function(info) {return info.MODEL == 'M351';},
	        function(info) {return info.MODEL == 'M51w';},
	        function(info) {return info.MODEL == 'MI 3';},
	        function(info) {return info.MODEL == 'MI 3W';},
	        function(info) {return info.MODEL == 'SM-G9006V';},
	        function(info) {return info.MODEL == 'SM-N9006';}
	    ],
	    version_check = [
	        function(info) {GLog.d("info.OS_RELEASE=" + info.OS_RELEASE); return false;},
	        function(info) {return (info.OS_RELEASE >= '4.1.0')&&( info.OS_RELEASE <= '4.4.2');}
	    ]
	];


	GSupport.checkList = function(successFunc, failureFunc){
	    var checkType = GSupport.checkType;
	    GLog.d("[checkList] checkType:" + checkType);
	    if (1 == checkType) {//white list check
	        var whitelist = GSupport.WHITE_LIST;
	        var length = whitelist.length;
	        for (var i = 0; i < length; i++) {
	            var lenSub = whitelist[i].length;
	            var found = false;
	            for (var j = 0; j < lenSub; j++){
	                if (whitelist[i][j](GDeviceInfo)) {
	                    found = true;
	                    break;
	                }
	            }
	            if (!found){ // unfound in white list
	                GLog.d("the device is not supported, " + GDeviceInfo.MODEL);
	                failureFunc&&failureFunc();
	                return;
	            }
	        }
	    }
	    successFunc&&successFunc();
	};
	///////////////////////////////

	var GDeviceInfo = {};
	var _context = null;
	var _context_type = 0;//0--2d;1--webgl
	///////////////////////////////

	var GCanvasPlatform = 2;//0--H5;1--iOS;2--Android

	var GCanvas = {
	    start: function (ref, succ, fail) {
	        GLog.d('gcanvas#start=====>>>');

	        //bind canvas
	        var config = [];
	        config.push(GSupport.renderMode);
	        config.push(GSupport.hybridLayerType);
	        config.push(GSupport.supportScroll);
	        config.push(GSupport.newCanvasMode);
	        config.push(1);//compatible. 1 will call GCanvasJNI.getAllParameter("gcanvas");
	        config.push(GSupport.clearColor);
	        config.push(GSupport.sameLevel);
	        GBridge.callEnable(ref,config,function(e){});

	        

	        //get device
	        GBridge.getDeviceInfo(function(e){//这里是异步操作



	          if (e.data && e.data.platform == "iOS"){
	              GCanvasPlatform = 1;

	          }else{
	            GCanvasPlatform = 2;

	          }
	          console.log('GCanvasPlatform = ' + GCanvasPlatform);
	          succ();
	          /*
	            if(e && e.result === 'success'){
	                if (e.data && e.data.platform == "iOS"){
	                    GCanvasPlatform = 1;
	                    succ();
	                }else{
	                    var info = JSON.parse(e.data);
	                    if(info.GCANVASLIBENABLE && info.IS_AVAILABLE){
	                        GDeviceInfo = info;
	                        GSupport.checkList(succ,fail);
	                    }else{
	                        fail&&fail();
	                    }
	                }
	            }else{
	                fail&&fail();
	            }
	            */
	        });
	    },

	    getContext: function (contextID) {
	        GLog.d('gcanvas#getContext=====>>>');
	        if (_context){
	            return _context;//unsupport change type after create
	        }

	        if (contextID.match(/webgl/i)){
	            _context = new GContextWebGL();
	            _context_type = 1;
	        }else{
	            _context = new GContext2D();
	            _context_type = 0;
	        }

	        GBridge.setContextType(_context_type);

	        if (!_context.timer) {
	            _context.timer = setInterval(this.render.bind(this), 16);            
	        }
	        
	        return _context;
	    },
	    render: function(){
	        // GLog.d('[GCanvas::render] start...');
	        _context.render("auto");
	    },

	    disable: function(){
	        GLog.d('gcanvas#disable=====>>>');
	        GBridge.callDisable();
	    },

	    setHiQuality: function(quality){
	        GLog.d('gcanvas#setHiQuality=====>>>' + quality);
	        GBridge.setHiQuality(quality);

	    },

	    setLogLevel:function(level){
	        GLog.d('gcanvas#setLogLevel=====>>> ' + level);
	        GBridge.setLogLevel(level);
	    }
	};

	module.exports = GCanvas;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	/////////////////////////////////////////////////////////////////
	//GBridge
	/////////////////////////////////////////////////////////////////
	var GLog = __webpack_require__(3).GLog;

	var inWeex = typeof callNative !== 'undefined';
	var debug = true;
	var canvasModule;

	/*
	__weex_define__('@weex-temp/x', function (__weex_require__) {
	    canvasModule = __weex_require__('@weex-module/gcanvas');
	});
	*/

	//canvasModule=typeof weex!=='undefined'?weex.requireModule('gcanvas'):__weex_require__('@weex-module/gcanvas');
	canvasModule = (typeof weex!=='undefined'&&weex.requireModule) ? ( weex.requireModule('gcanvas') ) : (__weex_require__('@weex-module/gcanvas') );

	var GBridge = {
	    /**执行render指令*/
	    callRender: function (commands) {
	        if (!inWeex) {
	            return;
	        }
	        GLog.d('bridge#callRender() commands is ' + commands);
	        canvasModule.render([commands]);
	    },

	    /**预加载图片*/
	    preLoadImage: function (src, cb) {
	        if (!inWeex) {
	            return;
	        }
	        GLog.d('bridge#preLoadImage() image url is ' + src);
	        canvasModule.preLoadImage(src, function (e) {
	            cb && cb(e);
	        });
	    },

	    /**
	     * 获取canvas引用
	     * @param ref wx-canvas 引用
	     * @param configArray 配置参数
	     **/
	    callEnable: function (ref, configArray, callback) {
	        if (!inWeex) {
	            return;
	        }
	        var params = {
	            componentId: ref,
	            config:configArray
	        };
	        canvasModule.enable(params, function (e) {
	            GLog.d('bridge#callEnable() return val:' + JSON.stringify(e));
	            callback && callback(e);
	        });
	    },


	    /**
	     * 释放gcanvas引擎
	     * @param ref wx-canvas 引用
	     * @param configArray 配置参数
	     **/
	    callDisable: function () {
	        if (!inWeex) {
	            return;
	        }
	        var params = {
	            
	        };
	        canvasModule.disable(params, function(e){
	            GLog.d('bridge#callDisable() return val:' + JSON.stringify(e));
	        });
	    },

	    /**
	     * 获取设备信息(android)
	     * @param callback 设备信息
	     **/
	    getDeviceInfo: function (callback) {
	        if (!inWeex) {
	            return;
	        }
	        canvasModule.getDeviceInfo({}, function (e) {
	            GLog.d('bridge#getDeviceInfo() return val:' + JSON.stringify(e));
	            callback && callback(e);
	        });
	    },

	    /**
	     *
	     * 设置context类型,2d或者webgl
	     *
	     * @param context_type 0代表2d,1代表3d
	     * */
	    setContextType: function (context_type){
	        if(context_type != 0 && context_type != 1){
	            GLog.d('bridge#setContextType(): invalid context type===>' + context_type);
	            return;
	        }
	        GLog.d('bridge#setContextType(): context type is ' + context_type);
	        canvasModule.setContextType(context_type);
	    },

	    /**
	     *
	     * 设置日志级别
	     *
	     * @param context_type 0代表2d,1代表3d
	     * */
	    setLogLevel: function (level){
	        GLog.d('bridge#setLogLevel(): native logLevel ' + level);
	        canvasModule.setLogLevel(level);
	    },

	    /**
	     *
	     * 设置opengl渲染质量
	     *
	     * @param context_type 0代表2d,1代表3d
	     * */
	    setHiQuality: function (quality){
	        GLog.d('bridge#setHiQuality(): quality: ' + quality);
	        canvasModule.setHiQuality(quality);
	    }
	};


	module.exports = {
	    GBridge: GBridge,
	    GLog: GLog
	};


/***/ }),
/* 3 */
/***/ (function(module, exports) {

	/////////////////////////////////////////////////////////////////
	//GLog
	/////////////////////////////////////////////////////////////////
	var GLOG_DEBUG	= 0;
	var GLOG_INFO   = 1;
	var GLOG_WARN   = 2;
	var GLOG_ERROR	= 3;
	var GLOG_NULL   = -1;

	var GLog = {};
	GLog._nullFunc = function(){};
	GLog.d = GLog._nullFunc;
	GLog.i = GLog._nullFunc
	GLog.w = GLog._nullFunc;
	GLog.e = GLog._nullFunc;
	GLog._nativeEnable = false;
	GLog._setNativeLevel = function(level){
		/*
		if (!this._nativeEnable)
			return;
		if (level == GLOG_DEBUG)
			GCanvas._toNative(null, null, 'GCanvas', 'setLogLevel', [ "debug" ]);
		else if (level == GLOG_INFO)
			GCanvas._toNative(null, null, 'GCanvas', 'setLogLevel', [ "info" ]);
		else if (level == GLOG_WARN)
			GCanvas._toNative(null, null, 'GCanvas', 'setLogLevel', [ "warn" ]);
		else if (level == GLOG_ERROR)
			GCanvas._toNative(null, null, 'GCanvas', 'setLogLevel', [ "error" ]);
		else 
			GCanvas._toNative(null, null, 'GCanvas', 'setLogLevel', [ "fatal" ]);	
	     */
	}
	GLog._refresh = function(){

		
		if (this.enable == false){
			this._setNativeLevel(GLOG_NULL);
			this.d = this._nullFunc;
			this.i = this._nullFunc
			this.w = this._nullFunc;
			this.e = this._nullFunc;
		}
		else
		{
			if (this.level <= GLOG_ERROR)
				this.e = function(msg){ console.error(msg);};
			else
				this.e = this._nullFunc;
				
			if (this.level <= GLOG_WARN)
				this.w = function(msg){ console.warn(msg);};
			else
				this.w = this._nullFunc;
			
			if (this.level <= GLOG_INFO)
				this.i = function(msg){ console.info(msg);
					var args = {
						msg:msg
					}
				//WindVane.call("GLog", "writeLog", args || {}, null, null);
			};
			else
				this.i = this._nullFunc;
			
			if (this.level <= GLOG_DEBUG)
				this.d = function(msg){ console.info(msg);
					var args = {
						msg:msg
					}
				//WindVane.call("GLog", "writeLog", args || {}, null, null);
			};
			else
				this.d = this._nullFunc;
			
			this._setNativeLevel(this.level);	
		}
	}
	GLog.enable = function(){
		this.enable = true;
		this._refresh();
	}
	GLog.disable = function(){
		this.enable = false;
		this._refresh();
	}
	GLog.setLevel = function(level){
		console.info("[setLevel] "+ this.level + "=>" + level);
		this.level = level;
		this.enable = true;
		this._refresh();
	}

	//GLog.setLevel(GLOG_WARN);
	GLog.setLevel(GLOG_DEBUG);

	module.exports.GLog = GLog

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	var GBridge = __webpack_require__(2).GBridge;
	var GLog = __webpack_require__(2).GLog;

	function GContext2D() {
	    this._drawCommands = "";
	    this._globalAlpha = 1.0;
	    this._fillStyle = "rgb(0,0,0)";
	    this._strokeStyle = "rgb(0,0,0)";
	    this._lineWidth = 1;
	    this._lineCap = "butt";
	    this._lineJoin= "miter";
	    this._miterLimit = 10;
	    this._globalCompositeOperation = "source-over";
	    this._textAlign = "start";
	    this._textBaseline = "alphabetic";
	    this._font = "10px sans-serif";
	    this._images = {};
	    this._canvases1 = {};
	    this._canvases2 = {};
	    this._getImageData = new Array();

	//    GCanvas._forbiddenAutoReplaceCanvas =true;
	//    this._apiCanvas  = document.createElement('canvas');
	//    GCanvas._forbiddenAutoReplaceCanvas =false;
	//    console.error("apicanvas="+this._apiCanvas);
	//    this._apiContext = this._apiCanvas.getContext("2d");
	//    this._apiContext.font = this._font;

	    this._savedGlobalAlpha =[];
	    this.timer =null;
	}



	function FillStylePattern(img, pattern) {
	    this._style = pattern;
	    this._img = img;
	}

	function FillStyleLinearGradient(x0, y0, x1, y1) {
	    this._start_pos = { _x : x0, _y : y0 };
	    this._end_pos = { _x : x1, _y : y1 };
	    this._stop_count = 0;
	    this._stops = [0, 0, 0, 0, 0];
	}

	FillStyleLinearGradient.prototype.addColorStop = function(pos, color) {
	    if (this._stop_count < 5 && 0.0 <= pos && pos <= 1.0) {
	        this._stops[this._stop_count] = { _pos : pos, _color : color };
	        this._stop_count++;
	    }
	}

	function FillStyleRadialGradient(x0, y0, r0, x1, y1, r1) {
	    this._start_pos = { _x : x0, _y : y0, _r : r0 };
	    this._end_pos = { _x : x1, _y : y1, _r : r1 };
	    this._stop_count = 0;
	    this._stops = [0, 0, 0, 0, 0];
	}

	FillStyleRadialGradient.prototype.addColorStop = function(pos, color) {
	    if (this._stop_count < 5 && 0.0 <= pos && pos <= 1.0) {
	        this._stops[this._stop_count] = { _pos : pos, _color : color };
	        this._stop_count++;
	    }
	}

	/**
	 * Represents the alpha value to be used with drawing commands where 1 is
	 * completely visible and 0 is fully transparent.
	 *
	 * @type {number}
	 * @name GContext2D#globalAlpha
	 */
	Object.defineProperty(GContext2D.prototype, "globalAlpha", {
	    get : function() {
	        return this._globalAlpha;
	    },
	    set : function(value) {
	        // if (this._globalAlpha != value) {
	        this._globalAlpha = value;
	        this._drawCommands = this._drawCommands.concat("a" + value.toFixed(6)
	                + ";");
	        // }
	    }
	});

	/**
	 * Represents the color or style to use inside shapes. It can only be a
	 * string which must be parsed as CSS <color> value for now.
	 *
	 * @type {string}
	 * @name GContext2D#fillStyle
	 * @example // set context fillStyle context.fillStyle = 'rgb(121,194,245)';
	 */
	Object.defineProperty(GContext2D.prototype, "fillStyle", {
	    get : function() {
	        return this._fillStyle;
	    },
	    set : function(value) {
	        this._fillStyle = value;

	        if (typeof(value) == 'string') {
	            this._drawCommands = this._drawCommands.concat("F" + value + ";");
	        }
	        else if (value instanceof FillStylePattern) {
	            if (value._img instanceof Image) {
	                if (!(value._img.src in this._images)) {
	                    var new_image = GCanvas.createImage();
	                    new_image.width = value._img.width;
	                    new_image.height = value._img.height;
	                    new_image.src = value._img.src;
	                    new_image.complete = value._img.complete;
	                    this._images[value._img.src] = new_image;
	                } else {
	                    this._drawCommands = this._drawCommands.concat("G" + this._images[value._img.src]._id + "," + value._style + ";");
	                 }
	            }
	            else if (value._img instanceof GCanvasImage){
	                this._drawCommands = this._drawCommands.concat("G" + value._img._id + "," + value._style + ";");
	            }
	        }
	        else if (value instanceof FillStyleLinearGradient) {
	            var command = "D" + value._start_pos._x + "," + value._start_pos._y + ","
	                + value._end_pos._x + "," + value._end_pos._y + "," + value._stop_count;

	            for (var i = 0; i < value._stop_count; ++i) {
	                command += ("," + value._stops[i]._pos + "," + value._stops[i]._color);
	            }
	            this._drawCommands = this._drawCommands.concat(command + ";");
	            //console.log('createLinearGradient command -> ' + command);
	        }
	        else if (value instanceof FillStyleRadialGradient) {
	            var command = "H" + value._start_pos._x + "," + value._start_pos._y + "," + value._start_pos._r + ","
	                + value._end_pos._x + "," + value._end_pos._y + "," + value._end_pos._r + "," + value._stop_count;

	            for (var i = 0; i < value._stop_count; ++i) {
	                command += ("," + value._stops[i]._pos + "," + value._stops[i]._color);
	            }
	            this._drawCommands = this._drawCommands.concat(command + ";");
	            //console.log('FillStyleRadialGradient command -> ' + command);
	        }
	    }
	});

	/**
	 * Represents the color or style for the lines. It can only be a string
	 * which must be parsed as CSS <color> value for now.
	 *
	 * @type {string}
	 * @name GContext2D#strokeStyle
	 * @example // set context strokeStyle context.strokeStyle = 'rgb(121,194,245)';
	 */
	Object.defineProperty(GContext2D.prototype, "strokeStyle", {
	    get : function() {
	        return this._strokeStyle;
	    },
	    set : function(value) {
	        this._strokeStyle = value;

	        if (typeof(value) == 'string') {
	            this._drawCommands = this._drawCommands.concat("S" + value + ";");
	        }
	        else if (value instanceof FillStylePattern) {
	            if (value._img instanceof Image) {
	                if (!(value._img.src in this._images)) {
	                    var new_image = GCanvas.createImage();
	                    new_image.width = value._img.width;
	                    new_image.height = value._img.height;
	                    new_image.src = value._img.src;
	                    new_image.complete = value._img.complete;
	                    this._images[value._img.src] = new_image;
	                } else {
	                    this._drawCommands = this._drawCommands.concat("G" + this._images[value._img.src]._id + "," + value._style + ";");
	                 }
	            }
	            else if (value._img instanceof GCanvasImage){
	                this._drawCommands = this._drawCommands.concat("G" + value._img._id + "," + value._style + ";");
	            }
	        }
	        else if (value instanceof FillStyleLinearGradient) {
	            var command = "D" + value._start_pos._x + "," + value._start_pos._y + ","
	                + value._end_pos._x + "," + value._end_pos._y + "," + value._stop_count;

	            for (var i = 0; i < value._stop_count; ++i) {
	                command += ("," + value._stops[i]._pos + "," + value._stops[i]._color);
	            }
	            this._drawCommands = this._drawCommands.concat(command + ";");
	            //console.log('createLinearGradient command -> ' + command);
	        }
	        else if (value instanceof FillStyleRadialGradient) {
	            var command = "H" + value._start_pos._x + "," + value._start_pos._y + "," + value._start_pos._r + ","
	                + value._end_pos._x + "," + value._end_pos._y + "," + value._end_pos._r + "," + value._stop_count;

	            for (var i = 0; i < value._stop_count; ++i) {
	                command += ("," + value._stops[i]._pos + "," + value._stops[i]._color);
	            }
	            this._drawCommands = this._drawCommands.concat(command + ";");
	            //console.log('FillStyleRadialGradient command -> ' + command);
	        }
	    }
	});

	/**
	 * Represents the width of the lines.
	 *
	 * @type {number}
	 * @name GContext2D#lineWidth
	 * @example // set context lineWidth context.lineWidth = 2;
	 */
	Object.defineProperty(GContext2D.prototype, "lineWidth", {
	    get : function() {
	        return this._lineWidth;
	    },
	    set : function(value) {
	        this._lineWidth = value;
	        this._drawCommands = this._drawCommands.concat("W" + value
	                + ";");
	    }
	});
	/**
	 * The lineCap property sets or returns the style of the end caps for a line.
	 *
	 * @type {number}
	 * @name GContext2D#lineCap
	 * @example // set context lineCap context.lineCap="round";
	 */
	Object.defineProperty(GContext2D.prototype, "lineCap", {
	    get : function() {
	        return this._lineCap;
	    },
	    set : function(value) {
	        this._lineCap = value;
	        this._drawCommands = this._drawCommands.concat("C" + value + ";");
	    }
	});


	/**
	 * Sets or returns the type of corner created, when two lines meet
	 *
	 * @type {number}
	 * @name GContext2D#lineJoin
	 * @example // set context lineJoin context.lineJoin="round";
	 */
	Object.defineProperty(GContext2D.prototype, "lineJoin", {
	    get : function() {
	        return this._lineJoin;
	    },
	    set : function(value) {
	        this._lineJoin = value;
	        this._drawCommands = this._drawCommands.concat("J" + value + ";");
	    }
	});


	/**
	 * Sets or returns the maximum miter length
	 *
	 * @type {number}
	 * @name GContext2D#miterLimit
	 * @example // set context miterLimit context.miterLimit=10;
	 */
	Object.defineProperty(GContext2D.prototype, "miterLimit", {
	    get : function() {
	        return this._miterLimit;
	    },
	    set : function(value) {
	        this._miterLimit = value;
	        this._drawCommands = this._drawCommands.concat("M" + value + ";");
	    }
	});

	/**
	 * Represents the globalCompositeOperation value to be used with drawing
	 * commands where 1 is completely visible and 0 is fully transparent.
	 *
	 * @type {number}
	 * @name GContext2D#globalCompositeOperation
	 */
	Object.defineProperty(GContext2D.prototype, "globalCompositeOperation", {
	    get : function() {
	        return this._globalCompositeOperation;
	    },

	    set : function(value) {
	        // if (this._globalCompositeOperation != value) {

	        this._globalCompositeOperation = value;
	        var mode = 0;
	        switch (value) {
	        case "source-over":
	            mode = 0;
	            break;
	        case "source-atop":
	            mode = 5;
	            break;
	        case "source-in":
	            mode = 0;
	            break;
	        case "source-out":
	            mode = 2;
	            break;
	        case "destination-over":
	            mode = 4;
	            break;
	        case "destination-atop":
	            mode = 4;
	            break;
	        case "destination-in":
	            mode = 4;
	            break;
	        case "destination-out":
	            mode = 3;
	            break;
	        case "lighter":
	            mode = 1;
	            break;
	        case "copy":
	            mode = 2;
	            break;
	        case "xor":
	            mode = 6;
	            break;
	        default:
	            mode = 0;
	        }

	        this._drawCommands = this._drawCommands.concat("B" + mode + ";");
	        // }
	    }
	});

	/**
	 * Represents the textAlign value to be used with drawing commands
	 *
	 * @type {number}
	 * @name GContext2D#textAlign
	 */
	Object.defineProperty(GContext2D.prototype, "textAlign", {
	    get : function() {
	        return this._textAlign;
	    },

	    set : function(value) {
	        // if (this._textAlign != value) {
	        this._textAlign = value;
	        var Align = 0;
	        switch (value) {
	        case "start":
	            Align = 0;
	            break;
	        case "end":
	            Align = 1;
	            break;
	        case "left":
	            Align = 2;
	            break;
	        case "center":
	            Align = 3;
	            break;
	        case "right":
	            Align = 4;
	            break;
	        default:
	            Align = 0;
	        }

	        this._drawCommands = this._drawCommands.concat("A" + Align + ";");
	        // }
	    }

	});

	/**
	 * Represents the _textBaseline value to be used with drawing commands
	 *
	 * @type {number}
	 * @name GContext2D#_textBaseline
	 */
	Object.defineProperty(GContext2D.prototype, "textBaseline", {
	    get : function() {
	        return this._textBaseline;
	    },

	    set : function(value) {
	        this._textBaseline = value;
	        var baseline = 0;
	        switch (value) {
	        case "alphabetic":
	            baseline = 0;
	            break;
	        case "middle":
	            baseline = 1;
	            break;
	        case "top":
	            baseline = 2;
	            break;
	        case "hanging":
	            baseline = 3;
	            break;
	        case "bottom":
	            baseline = 4;
	            break;
	        case "ideographic":
	            baseline = 5;
	            break;
	        default:
	            baseline = 0;
	            break;
	        }

	        this._drawCommands = this._drawCommands.concat("E" + baseline + ";");
	    }

	});

	/**
	 * Represents the textAlign value to be used with drawing commands
	 *
	 * @type {number}
	 * @name GContext2D#textAlign
	 */
	Object.defineProperty(GContext2D.prototype, "font", {
	    get : function() {
	        return this._font;
	    },
	    set : function(value) {
	        // if (this._font != value) {
	        this._font = value;
	        //this._apiContext.font = this._font;
	        this._drawCommands = this._drawCommands.concat("j" + value + ";");
	        // }
	    }

	});

	/**
	 * Loads an image into the plugin to be used as a texture in the GCanvas.
	 * Generally this method is never called directly. Instead, it is called
	 * indirectly through GCanvasImage instances upon setting their
	 * {@link GCanvasImage#src|GCanvasImage.src} property.
	 *
	 * @param {GCanvasImage}
	 *            image The image to be loaded into the GCanvas plugin.
	 * @param {function}
	 *            [successCallback] A callback that is fired when the image has
	 *            been successfully loaded.
	 * @param {function}
	 *            [errorCallback] A callback that is fired when there was an
	 *            error in loading the image.
	 * @example // create a new image and load // it from a relative URL path
	 *          var myImage = GCanvas.createImage(); myImage.src =
	 *          "images/spritesheet.jpg"; // calls loadTexture for you
	 * @private
	 */
	GContext2D.prototype.loadTexture = function(image, successCallback, errorCallback) {
	    // if (successCallback && typeof successCallback !== 'function') {
	    //     throw new Error(
	    //             'GContext2D.loadTexture failure: successCallback parameter not a function');
	    // }
	    // if (errorCallback && typeof errorCallback !== 'function') {
	    //     throw new Error(
	    //             'GContext2D.loadTexture failure: errorCallback parameter not a function');
	    // }

	    // GCanvas._toNative(successCallback, errorCallback, 'GCanvas',
	    //         'loadTexture', [ image.src, image._id ]);
	};

	/**
	 * Unloads an image from the GCanvas plugin. Generally this method is
	 * never called directly. Instead, it is called indirectly through
	 * GCanvasImage instances upon setting their
	 * {@link GCanvasImage#src|GCanvasImage.src} property to a false value
	 * such as <code>null</code> or an empty string (<code>""</code>).
	 *
	 * @param {GCanvasImage}
	 *            image The image to be unloaded from the GCanvas plugin.
	 * @example // unload an image from memory myImage.src = null; // calls
	 *          unloadTexture for you
	 * @private
	 */
	GContext2D.prototype.unloadTexture = function(image) {
	    // GCanvas._toNative(null, null, 'GCanvas', 'unloadTexture',
	    //         [ image._id ]);
	};

	/**
	 * Defines the 2D matrix transform applied to drawings within the context.
	 *
	 * @param {number}
	 *            a The value that affects the positioning of pixels along the x
	 *            axis when scaling or rotating the context.
	 * @param {number}
	 *            b The value that affects the positioning of pixels along the y
	 *            axis when rotating or skewing the context.
	 * @param {number}
	 *            c The value that affects the positioning of pixels along the x
	 *            axis when rotating or skewing the context.
	 * @param {number}
	 *            d The value that affects the positioning of pixels along the y
	 *            axis when scaling or rotating the context.
	 * @param {number}
	 *            tx The distance by which to translate the context along the x
	 *            axis.
	 * @param {number}
	 *            ty The distance by which to translate the context along the y
	 *            axis.
	 */
	GContext2D.prototype.setTransform = function(a, b, c, d, tx, ty) {
	    this._drawCommands = this._drawCommands.concat("t"
	            + (a === 1 ? "1" : a.toFixed(6)) + ","
	            + (b === 0 ? "0" : b.toFixed(6)) + ","
	            + (c === 0 ? "0" : c.toFixed(6)) + ","
	            + (d === 1 ? "1" : d.toFixed(6)) + "," + tx + "," + ty + ";");
	};

	/**
	 * Defines an added 2D matrix transform applied to drawings within the
	 * context.
	 *
	 * @param {number}
	 *            a The value added to the value that affects the positioning of
	 *            pixels along the x axis when scaling or rotating the context.
	 * @param {number}
	 *            b The value added to the value that affects the positioning of
	 *            pixels along the y axis when rotating or skewing the context.
	 * @param {number}
	 *            c The value added to the value that affects the positioning of
	 *            pixels along the x axis when rotating or skewing the context.
	 * @param {number}
	 *            d The value added to the value that affects the positioning of
	 *            pixels along the y axis when scaling or rotating the context.
	 * @param {number}
	 *            tx The value added to the distance by which to translate the
	 *            context along the x axis.
	 * @param {number}
	 *            ty The value added to the distance by which to translate the
	 *            context along the y axis.
	 */
	GContext2D.prototype.transform = function(a, b, c, d, tx, ty) {
	    this._drawCommands = this._drawCommands.concat("f"
	            + (a === 1 ? "1" : a.toFixed(6)) + ","
	            + (b === 0 ? "0" : b.toFixed(6)) + ","
	            + (c === 0 ? "0" : c.toFixed(6)) + ","
	            + (d === 1 ? "1" : d.toFixed(6)) + "," + tx + "," + ty + ";");
	};

	/**
	 * Restores the 2D matrix transform to the identity matrix. This is
	 * equivalent to calling <code>context.setTransform(1,0,0,1,0,0)</code>.
	 */
	GContext2D.prototype.resetTransform = function() {
	    this._drawCommands = this._drawCommands.concat("m;");
	};

	/**
	 * Scales the 2D matrix transform along the x and y axes.
	 *
	 * @param {number}
	 *            a The value added to the value that affects the positioning of
	 *            pixels along the x axis when scaling or rotating the context.
	 * @param {number}
	 *            d The value added to the value that affects the positioning of
	 *            pixels along the y axis when scaling or rotating the context.
	 */
	GContext2D.prototype.scale = function(a, d) {
	    this._drawCommands = this._drawCommands.concat("k" + a.toFixed(6) + ","
	            + d.toFixed(6) + ";");
	};

	/**
	 * Rotates the 2D matrix transform by a specified number of radians.
	 *
	 * @param {number}
	 *            angle The value in radians to rotate the context.
	 */
	GContext2D.prototype.rotate = function(angle) {
	    this._drawCommands = this._drawCommands
	            .concat("r" + angle.toFixed(6) + ";");
	};

	/**
	 * Moves the 2D matrix transform along the x and y axes.
	 *
	 * @param {number}
	 *            tx The value added to the distance by which to translate the
	 *            context along the x axis.
	 * @param {number}
	 *            ty The value added to the distance by which to translate the
	 *            context along the y axis.
	 */
	GContext2D.prototype.translate = function(tx, ty) {
	    this._drawCommands = this._drawCommands.concat("l" + tx + "," + ty + ";");
	};

	/**
	 * Sets a save point for the current context transform. This allows you to
	 * arbitrarily modify the transform and restore it back to its to its
	 * original state at the time save() was called by using restore().
	 *
	 * @see GContext2D#restore
	 */
	GContext2D.prototype.save = function() {
	    this._savedGlobalAlpha.push(this._globalAlpha);
	    this._drawCommands = this._drawCommands.concat("v;");
	};

	/**
	 * Restores the state of the context transform to the state at the point in
	 * time when save() was last called.
	 *
	 * @see GContext2D#save
	 */
	GContext2D.prototype.restore = function() {
	    this._drawCommands = this._drawCommands.concat("e;");
	    this._globalAlpha = this._savedGlobalAlpha.pop();
	};


	GContext2D.prototype.drawImage = function(image, // image
	sx, sy, sw, sh, // source (or destination if fewer args)
	dx, dy, dw, dh) { // destination

	    GLog.d("[GContext2D.drawImage] start...");

	    if (typeof image !== 'string') {
	        image = image.src;
	    }
	    
	    GBridge.preLoadImage(image);

	    var numArgs = arguments.length;

	    this._drawCommands += ("d" + numArgs + "," + image + "," 
	            + sx + "," + sy + "," + sw + "," + sh + "," 
	            + dx + "," + dy + "," + dw + "," + dh + ";");
	};

	/**
	 * Informs the drawing context that drawing commands have completed for the
	 * current frame and the should be sent to the GCanvas plugin for drawing
	 * to the screen.
	 * <p>
	 * This method is unique to GContext2D and does not exist within the HTML
	 * 2D context, so the utility method {@link GCanvas.render} should be
	 * used to make it easy to call or not call this method depending on the
	 * context you are currently working with.
	 * </p>
	 *
	 * @example // makes necessary GCanvas render call // if canvas being
	 *          used is GCanvas var myCanvas = GCanvas.create(); var
	 *          myContext = myCanvas.getContext("2d");
	 *  // ... myContext.translate(10,10); myContext.rotate(Math.PI); //
	 * ...
	 *  // after all context calls are complete // for the current frame:
	 * GCanvas.render(); // calls GContext2D.render()
	 */

	GContext2D.prototype.render = function(flag) {
	    if (typeof flag === "undefined"){
	        clearInterval(this.timer);
	        this.timer = null;
	    }
	    var commands = this._drawCommands;
	    this._drawCommands = "";
	    if (commands != null && commands != "") {
	        GLog.d("GContext2D#render() called, commands is "+ commands);
	        GBridge.callRender(commands)
	    }
	};

	/**
	 * Implementation of GCanvas.capture.
	 *
	 * @private
	 */
	GContext2D.prototype.capture = function(x, y, w, h, fileName, successCallback, errorCallback) {
	    // if (successCallback && typeof successCallback !== 'function') {
	    //     throw new Error('successCallback parameter not a function');
	    // }
	    // if (errorCallback && typeof errorCallback !== 'function') {
	    //     throw new Error('errorCallback parameter not a function');
	    // }

	    // GCanvas._toNative(successCallback, errorCallback, 'GCanvas',
	    //         'capture', [ x, y, w, h, fileName ]);
	};


	GContext2D.prototype.createPattern = function(img, pattern) {
	    return new FillStylePattern(img, pattern);
	};

	/**
	 * Implementation of GCanvas.createLinearGradient(x0, y0, x1, y1).
	 *
	 * @private
	 */
	 GContext2D.prototype.createLinearGradient = function(x0, y0, x1, y1) {
	    return new FillStyleLinearGradient(x0, y0, x1, y1);
	};

	/**
	 * Implementation of GCanvas.createRadialGradient(x0, y0, x1, y1).
	 *
	 * @private
	 */
	 GContext2D.prototype.createRadialGradient = function(x0, y0, r0, x1, y1, r1) {
	    return new FillStyleRadialGradient(x0, y0, r0, x1, y1, r1);
	};

	GContext2D.prototype.strokeRect = function(x, y, w, h, successCallback,
	        errorCallback) {
	    this._drawCommands = this._drawCommands.concat("s" + x + "," + y + "," + w
	            + "," + h + ";");
	};

	GContext2D.prototype.clearRect = function(x, y, w, h, successCallback,
	        errorCallback) {
	    // TODO: enable it later.
	    this._drawCommands = this._drawCommands.concat("c" + x + "," + y + "," + w
	        + "," + h + ";");
	}

	GContext2D.prototype.clip = function(successCallback, errorCallback) {
	    this._drawCommands = this._drawCommands.concat("p;");
	}

	GContext2D.prototype.resetClip = function(successCallback, errorCallback) {
	    this._drawCommands = this._drawCommands.concat("q;");
	}

	GContext2D.prototype.closePath = function(successCallback, errorCallback) {
	    this._drawCommands = this._drawCommands.concat("o;");
	}

	GContext2D.prototype.moveTo = function(x, y, successCallback, errorCallback) {
	    this._drawCommands = this._drawCommands.concat("g" + x.toFixed(6) + ","
	            + y.toFixed(6) + ";");
	}

	GContext2D.prototype.lineTo = function(x, y, successCallback, errorCallback) {
	    this._drawCommands = this._drawCommands.concat("i" + x.toFixed(6) + ","
	            + y.toFixed(6) + ";");
	}

	GContext2D.prototype.quadraticCurveTo = function(cpx, cpy, x, y,
	        successCallback, errorCallback) {
	    this._drawCommands = this._drawCommands.concat("u" + cpx + "," + cpy + ","
	            + x + "," + y + ";");
	}

	GContext2D.prototype.bezierCurveTo = function(cp1x, cp1y, cp2x, cp2y, x, y,
	        successCallback, errorCallback) {
	    this._drawCommands = this._drawCommands.concat("z" + cp1x + "," + cp1y
	            + "," + cp2x + "," + cp2y + "," + x + "," + y + ";");
	}

	GContext2D.prototype.arcTo = function(x1, y1, x2, y2, radius,
	        successCallback, errorCallback) {
	    this._drawCommands = this._drawCommands.concat("h" + x1 + "," + y1 + ","
	            + x2 + "," + y2 + "," + radius + ";");
	}

	/**
	 * Resets the current default path.
	 *
	 * @param null
	 */
	GContext2D.prototype.beginPath = function() {
	    this._drawCommands = this._drawCommands.concat("b;");
	};

	/**
	 * Paint the specified rectangular area using the fillStyle. If either
	 * height or width are zero, this method has no effect.
	 *
	 * @param {number}
	 *            x The x location of the source clipping rectangle
	 * @param {number}
	 *            y The y location of the source clipping rectangle
	 * @param {number}
	 *            w The width of the rectangle
	 * @param {number}
	 *            h The height of the rectangle
	 */
	GContext2D.prototype.fillRect = function(x, y, w, h) {
	    this._drawCommands = this._drawCommands.concat("n" + x + "," + y + "," + w
	            + "," + h + ";");
	};

	/**
	 * Adds a new closed subpath to the path, representing the given rectangle.
	 *
	 * @param {number}
	 *            x The x location of the rectangle
	 * @param {number}
	 *            y The y location of the rectangle
	 * @param {number}
	 *            w The width of the rectangle
	 * @param {number}
	 *            h The height of the rectangle
	 */
	GContext2D.prototype.rect = function(x, y, w, h) {
	    this._drawCommands = this._drawCommands.concat("w" + x + "," + y + "," + w
	            + "," + h + ";");
	};

	/**
	 * Fills the subpaths of the current default path or the given path with the
	 * current fill style.
	 *
	 * @param {string}
	 *            path The given path to fill.
	 */
	GContext2D.prototype.fill = function(path) {
	    this._drawCommands = this._drawCommands.concat("L;");
	};

	/**
	 * Strokes the subpaths of the current default path or the given path with
	 * the current stroke style.
	 *
	 * @param {string}
	 *            path The given path to stroke.
	 */
	GContext2D.prototype.stroke = function(path) {
	    this._drawCommands = this._drawCommands.concat("x;");
	};

	/**
	 * Adds points to the subpath such that the arc described by the
	 * circumference of the circle described by the arguments, starting at the
	 * given start angle and ending at the given end angle, going in the given
	 * direction (defaulting to clockwise), is added to the path, connected to
	 * the previous point by a straight line.
	 *
	 * @param {number}
	 *            x
	 * @param {number}
	 *            y
	 * @param {number}
	 *            radius
	 * @param {number}
	 *            startAngle
	 * @param {number}
	 *            endAngle
	 * @param {string}
	 *            anticlockwise
	 */
	GContext2D.prototype.arc = function(x, y, radius, startAngle, endAngle,
	        anticlockwise) {

	    var ianticlockwise = 0;
	    if (anticlockwise)
	        ianticlockwise = 1;

	    this._drawCommands = this._drawCommands.concat("y" + x + "," + y + ","
	            + radius + "," + startAngle + "," + endAngle + "," + ianticlockwise
	            + ";");
	};



	GContext2D.prototype.fillText = function(text, x, y) {
	    var tmptext =text.replace(/!/g,"!!");
	        tmptext =tmptext.replace(/,/g,"!,");
	        tmptext =tmptext.replace(/;/g,"!;");
	    this._drawCommands = this._drawCommands.concat("T" + tmptext + "," + x + ","
	            + y + ",0.0;");
	};

	GContext2D.prototype.strokeText = function(text, x, y) {
	    this._drawCommands = this._drawCommands.concat("U" + text + "," + x + ","
	            + y + ",0.0;");
	};


	//TODO:这个api有用需要原生的canvas对象，所以不支持
	GContext2D.prototype.measureText = function(text) {
	    return -1;
	    //return this._apiContext.measureText(text);
	};

	GContext2D.prototype.isPointInPath = function(x,y) {
	    return true;
	};


	/////////////////////////////////////////////////////////////////
	//base64
	/////////////////////////////////////////////////////////////////

	function GarrToBase64(buffer) {
	    var binary = ''
	    var bytes = new Uint8Array( buffer )
	    var len = bytes.byteLength;
	    for (var i = 0; i < len; i++) {
	        binary += String.fromCharCode( bytes[ i ] )
	    }
	    return window.btoa( binary );
	}

	function _GcharDecode (nChr) {
	  return nChr > 64 && nChr < 91 ?
	      nChr - 65
	    : nChr > 96 && nChr < 123 ?
	      nChr - 71
	    : nChr > 47 && nChr < 58 ?
	      nChr + 4
	    : nChr === 43 ?
	      62
	    : nChr === 47 ?
	      63
	    :
	      0;
	}

	function Gbase64ToArr (sBase64, nBlocksSize) {
	  var
	    sB64Enc = sBase64.replace(/[^A-Za-z0-9\+\/]/g, ""), nInLen = sB64Enc.length,
	    nOutLen = nBlocksSize ? Math.ceil((nInLen * 3 + 1 >> 2) / nBlocksSize) * nBlocksSize : nInLen * 3 + 1 >> 2, taBytes = new Uint8Array(nOutLen);

	  for (var nMod3, nMod4, nUint24 = 0, nOutIdx = 0, nInIdx = 0; nInIdx < nInLen; nInIdx++) {
	    nMod4 = nInIdx & 3;
	    nUint24 |= _GcharDecode(sB64Enc.charCodeAt(nInIdx)) << 18 - 6 * nMod4;
	    if (nMod4 === 3 || nInLen - nInIdx === 1) {
	      for (nMod3 = 0; nMod3 < 3 && nOutIdx < nOutLen; nMod3++, nOutIdx++) {
	        taBytes[nOutIdx] = nUint24 >>> (16 >>> nMod3 & 24) & 255;
	      }
	      nUint24 = 0;

	    }
	  }

	  return taBytes;
	}



	/////////////////////////////////////////////////////////////////
	//GCanvasImage
	/////////////////////////////////////////////////////////////////
	function GImageData(w, h) {
	    GLog.d("GImageData wh=" + w + "," + h);
	    this.width = w;
	    this.height = h;
	    this.data = new Uint8Array(w*h*4);
	}

	GContext2D.prototype.createImageData = function(w, h) {
	    GLog.d("GContext2D::createImageData wh=" + w + "," + h);
	    return new GImageData(w,h);
	};


	GContext2D.prototype._putImageData = function(data,dx, dy, sw, sh,  dw, dh){
	    this._drawCommands = this._drawCommands.concat("P"
	        + dx + ","
	        + dy + ","
	        + sw + ","
	        + sh + ","
	        + dw + ","
	        + dh + ","
	        + GarrToBase64(data) + ";");
	}
	GContext2D.prototype.putImageData = function(imgData, x, y, dirtyX, dirtyY, dirtyWidth, dirtyHeight) {
	    GLog.d("GContext2D::putImageData [" + arguments.length + "] "
	        + "dest_xy=(" + x + "," + y + ") "
	        + "dirty_xy=(" + dirtyX + "," + dirtyY + ") "
	        + "dirty_wh=(" + dirtyWidth + "," + dirtyHeight + ") ");

	    if (arguments.length <= 3){
	        this._putImageData(imgData.data, x, y, imgData.width, imgData.height, imgData.width, imgData.height);
	    }
	    else{
	        var destData = new Uint8Array(dirtyWidth*dirtyHeight*4);
	        var imgPos;
	        var destPos = 0
	        for(var i =0; i < dirtyHeight; i++){
	            imgPos = (imgData.width*(dirtyY + i) + dirtyX)*4;
	            for(var j=0; j< dirtyWidth; ++j){
	                destData[destPos++]=imgData.data[imgPos++];
	                destData[destPos++]=imgData.data[imgPos++];
	                destData[destPos++]=imgData.data[imgPos++];
	                destData[destPos++]=imgData.data[imgPos++];
	            }
	        }

	        this._putImageData(destData, x+dirtyX, y+dirtyY, dirtyWidth, dirtyHeight, dirtyWidth, dirtyHeight);
	    }
	};


	GContext2D.prototype.getImageDataAsyn = function(x, y, w, h) {
	    return '';
	    // GLog.d("GContext2D::getImageDataAsyn xy=(" + x + "," + y + "), wh=(" + w + ","+ h +")");
	    // GCanvas._instance.getContext().render("auto");
	    // var len = w*h;
	    // var imgData = new GImageData(w,h);
	    // imgData._x = x;
	    // imgData._y = y;
	    // imgData._dataGet = 0;
	    // imgData._split = 0;
	    // var me = this;
	    // me._getImageData.push(imgData);

	    // var h2 = Math.floor(262144/w);// 2^18
	    // if (h2 < h)
	    //     imgData._split = 1;

	    // function getImageDataAsynSuccess(getData) {
	    //     var destData = me._getImageData[0];
	    //     GLog.d("GContext2D::getImageDataAsyn: dataGet=" + destData._dataGet);
	    //     if (0 == destData._split){// one part
	    //         destData.data = Gbase64ToArr(getData);
	    //         destData._dataGet += destData.data.length;
	    //     }else{// multi parts
	    //         var taBytes  = Gbase64ToArr(getData);
	    //         destData._dataGet += taBytes.length;
	    //         for (var i=0;i<taBytes.length;i++){
	    //             destData.data[destData._dataGet+i] = taBytes[i];
	    //         }
	    //     }

	    //     if (destData._dataGet >= (destData._x*destData._y)){
	    //         if (typeof destData.onload === 'function') {
	    //             GLog.d("GContext2D::getImageDataAsyn: callback exec.");
	    //             destData.onload();
	    //         }
	    //         me._getImageData.splice(0,1);//delete first data
	    //     }
	    // }

	    // for(var i=0; i<h; i+= h2){
	    //     GCanvas._toNative(getImageDataAsynSuccess, getImageDataAsynSuccess, 'GCanvas',
	    //             'getImageData', [ x, y+i, w, (i+h2>h)?(h-i):h2 ]);
	    // }


	    // return imgData;
	};



	module.exports = GContext2D;


/***/ }),
/* 5 */
/***/ (function(module, exports) {

	module.exports = {
	  "type": "div",
	  "children": [
	    {
	      "type": "text",
	      "id": "canvas_demo1",
	      "style": {
	        "width": 750,
	        "height": 100,
	        "backgroundColor": "#e0e0e0"
	      },
	      "attr": {
	        "value": "canvas_demo 上边界"
	      }
	    },
	    {
	      "type": "chart",
	      "id": "xx",
	      "attr": {
	        "width": "750",
	        "height": "400"
	      }
	    },
	    {
	      "type": "text",
	      "id": "canvas_demo2",
	      "style": {
	        "width": 750,
	        "height": 100,
	        "backgroundColor": "#e0e0e0"
	      },
	      "attr": {
	        "value": "canvas_demo 下边界"
	      }
	    }
	  ]
	}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = function(module, exports, __weex_require__){'use strict';

	var GM = __webpack_require__(7)('g2');
	var cases = __webpack_require__(14);
	module.exports = {
	    ready: function ready() {
	        var url = this.$getConfig().bundleUrl;
	        var caseId = url.match(/\?case=(\d+)/)[1];
	        cases['case' + caseId](GM);
	    }

	};}
	/* generated by weex-loader */


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Created by godsong on 16/12/12.
	 */
	__webpack_require__(8);
	module.exports=__webpack_require__(12);

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	var __weex_template__ = __webpack_require__(9)
	var __weex_script__ = __webpack_require__(10)

	__weex_define__('@weex-component/chart', [], function(__weex_require__, __weex_exports__, __weex_module__) {

	    __weex_script__(__weex_module__, __weex_exports__, __weex_require__)
	    if (__weex_exports__.__esModule && __weex_exports__.default) {
	      __weex_module__.exports = __weex_exports__.default
	    }

	    __weex_module__.exports.template = __weex_template__

	})


/***/ }),
/* 9 */
/***/ (function(module, exports) {

	module.exports = {
	  "type": "gcanvas",
	  "id": "wxc_gcanvas",
	  "style": {
	    "width": function () {return this.width},
	    "height": function () {return this.height},
	    "backgroundColor": "#ffffff"
	  }
	}

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = function(module, exports, __weex_require__){'use strict';

	var CanvasElement = __webpack_require__(11);
	var Chart = __webpack_require__(12);
	module.exports = {
	    data: function () {return {
	        width: 750,
	        height: 375
	    }},
	    created: function created() {

	        CanvasElement.reset();
	    },
	    ready: function ready() {
	        CanvasElement.init(this.$el('wxc_gcanvas')).then(function (context) {
	            Chart.ready(context);
	        });
	    }
	};}
	/* generated by weex-loader */


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Created by godsong on 16/9/12.
	 */
	var Canvas = __webpack_require__(1);
	var _instanceMap = {};
	function CanvasElement(weexElement, canvasId) {
	    //g2竟然对canvas做深拷贝，用string 绕过他们类型检查的坑，无奈脸
	    var instance = new String();
	    instance.weexElement = weexElement;
	    if (_instanceMap[canvasId]) {
	        instance.weexElement = _instanceMap[canvasId];
	    }
	    else {
	        _instanceMap[canvasId] = instance;
	    }


	    Object.defineProperties(instance, {
	        'currentStyle': {
	            get: function () {
	                return Object.assign({}, instance.weexElement.classStyle, instance.weexElement.style);
	            }
	        },
	        'offsetWidth': {
	            get: function () {
	                var canvasWidth = parseFloat(instance.weexElement.classStyle['width'] || instance.weexElement.style['width']);
	                return canvasWidth;
	                //return parseFloat(weexElement.classStyle['width']||weexElement.style['width'])
	            }
	        },
	        'offsetHeight': {
	            get: function () {
	                console.log('offsetHeight:', parseFloat(instance.weexElement.classStyle['height'] || instance.weexElement.style['height']))
	                return parseFloat(instance.weexElement.classStyle['height'] || instance.weexElement.style['height'])
	            }
	        }
	    });
	    instance.getContext = function () {
	        return Canvas.getContext('2d')
	    };
	    return instance;
	}
	CanvasElement.init = function (element, canvasId) {
	    //初始化canvas dom 并伪造getElementById和标准的getContext
	    if (_instanceMap[canvasId]) {
	        _instanceMap[canvasId].weexElement = element;
	    }
	    else {
	        _instanceMap[canvasId] = element;
	    }

	    return new Promise(function (resolve) {
	        Canvas.start(element.ref, function () {
	            resolve(Canvas.getContext('2d'));

	        });
	    })
	};

	CanvasElement.reset = function () {
	    Canvas.disable();
	};
	module.exports = CanvasElement;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Created by godsong on 16/12/12.
	 */
	var GM = __webpack_require__(13);
	var CanvasElement=__webpack_require__(11)
	var _ready = false;
	var _context;
	var _renderQueue = [];
	var _chartRender = GM.Chart.prototype.render;
	GM.Chart.prototype.render = function () {
	    if (_ready) {
	        _chartRender.call(this);
	        _context.render();
	    }
	    else {
	        _renderQueue.push(this);
	    }
	};
	var G2Chart=GM.Chart;
	GM.Chart=function(config){
	    var canvasElement=new CanvasElement();
	    config.el=canvasElement;
	    return new G2Chart(config);
	}
	module.exports = function (name) {
	    switch (name.toLowerCase()) {
	        case 'g2':
	            return GM;
	        case 'gm':
	            return GM;
	        default:
	            return GM;
	    }
	};
	module.exports.ready = function (context,id,weexElement) {
	    _ready = true;
	    _context = context;
	    var chart;
	    if (_renderQueue.length > 0) {
	        while (chart = _renderQueue.shift()) {
	            _chartRender.call(chart);
	        }
	        context.render();
	    }
	};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

	!function(t,e){ true?module.exports=e():"function"==typeof define&&define.amd?define("GM",[],e):"object"==typeof exports?exports.GM=e():t.GM=e()}(this,function(){return function(t){function e(r){if(n[r])return n[r].exports;var i=n[r]={exports:{},id:r,loaded:!1};return t[r].call(i.exports,i,i.exports,e),i.loaded=!0,i.exports}var n={};return e.m=t,e.c=n,e.p="",e(0)}([function(t,e,n){"use strict";var r=n(2);n(88),n(55),n(91),n(68),n(40),t.exports=r},function(t,e,n){var r=n(76);t.exports=r},function(t,e,n){var r={Chart:n(97),Util:n(1),Geom:n(16),Shape:n(35),G:n(7),Global:n(3),Vector2:n(8),Theme:n(39),Scale:n(24),Coord:n(30),Plot:n(38),GuideAssist:n(37),Frame:n(5),AnimateAssist:n(27)};t.exports=r},function(t,e,n){"use strict";var r=n(39),i=n(1),a={sizes:{min:1,max:10},scales:{nice:!0},widthRatio:{column:.5,rose:.999999,multiplePie:.75},animateReduceMultiple:1,lineDash:[5,15]};a.setTheme=function(t){i.mix(this,t)},a.setTheme(r),t.exports=a},function(t,e,n){"use strict";var r=n(1),i=n(6),a=n(5),s=n(17),o=n(51),c="_origin",u=function(t){u.superclass.constructor.call(this,t)};u.ATTRS={id:"",type:null,container:null,attrs:null,shapeObj:null,createTime:null,styleCfg:{},shapeDatas:[]},r.extend(u,i),r.mixin(u,[o]),r.augment(u,{_mapping:function(t){var e=this,n=t.toJSON(),i=e.get("attrs"),s=[];return r.each(n,function(t){var n={};n[c]=t[c],n.points=t.points,n.nextPoints=t.nextPoints,r.each(i,function(i){var a=i.names,s=e._getAttrValues(i,t);r.each(s,function(t,e){var i=a[e];n[i]=r.isArray(t)&&1===t.length?t[0]:t})}),s.push(n)}),new a(s)},_processShapePoints:function(t){var e,n,i=this,o=i.get("shapeType")||i.get("type"),c=s.getShape(o),u=[];return c._coord=i.getCoord(),r.each(t,function(t){var e=[];t.each(function(t){var n=i.getAttrValue("shape",t),r=i.getShapePointInfo(t),a=c.getShapePoints(n,r);t.points=a,e.push(t)}),e=new a(e),u.push(e)}),r.each(u,function(t,r){e=u[r+1],n=e?e.colArray("points")[0]:null,t.addCol("nextPoints",function(){return n})}),i.set("shapeObj",c),u},_getAttrValues:function(t,e){var n=t.scales,i=[];r.each(n,function(t){var n=t.dim;"identity"===t.type?i.push(t.value):i.push(e[n])});var a=t.mappingValues.apply(t,i);return a},draw:function(t){var e=this,n=[];return t=e.sortFrames(t),t=e.processFrames(t),t=e._processShapePoints(t),r.each(t,function(t,r){t=e.beforeMapping(t),t=e._mapping(t),t.rowCount()&&e.drawFrame(t,r),n.push(t)}),n},sortFrames:function(t){var e=this.getXScale();return r.indexOf(["time","timeCat"],e.type)>-1?this.sort(t):t},processFrames:function(t){return t},beforeMapping:function(t){return t},isInCircle:function(){return this.getCoord().isPolar},getShapePointInfo:function(t){var e,n,r=this.getXScale(),i=this.getYScale();return e=r?this._normalizeValues(t[r.dim],r):t.x?t.x:.1,n=i?this._normalizeValues(t[i.dim],i):t.y?t.y:.1,{x:e,y:n,y0:i?i.scale(this.getYMinValue()):void 0,size:this.getSize(t)}},_normalizeValues:function(t,e){var n=[];return r.isArray(t)?r.each(t,function(t){n.push(e.scale(t))}):n=e.scale(t),n},getDefalutSize:function(){return.1},_getSize:function(t){var e,n=this.getCoord();return e=this.isInCircle()&&!n.isTransposed?(n.get("endAngle")-n.get("startAngle"))*n.get("radius"):this.getDimWidth("x"),t/e},getDimWidth:function(t){var e=this,n=e.getCoord(),r=n.convertPoint({x:0,y:0}),i=n.convertPoint({x:"x"===t?1:0,y:"x"===t?0:1}),a=0;return r&&i&&(a=Math.sqrt(Math.pow(i.x-r.x,2)+Math.pow(i.y-r.y,2))),a},getSize:function(t){var e=this.getAttrValue("size",t);return e=r.isNull(e)?this.getDefalutSize():this._getSize(e)},drawFrame:function(t){var e,n,i,a=this,s=t.toJSON(),o=a.get("container"),c=a.get("shapeObj");r.each(s,function(t,r){a.get("shapeDatas").push(t),t.index=r,e=a.getDrawCfg(t),n=a.getDrawShape(t.shape),i=c.drawShape(n,e,o),a.afterDraw(i,t)})},afterDraw:function(){},getDrawShape:function(t){return r.isArray(t)?t[0]:t},getDrawCfg:function(t){var e=this.get("styleCfg"),n=this.isInCircle(),r=t._origin,i={points:t.points,nextPoints:t.nextPoints,color:t.color,isInCircle:n,style:e,size:t.size,shape:t.shape,opacity:t.opacity,x:t.x,y:t.y,origin:t,id:this._getId(r),geomType:this.get("type")};return n&&(i.center=this.getCoord().get("center")),i},_getId:function(t){var e=this.get("idDims"),n=this.get("id"),r=n;if(e&&e.length>0)e.forEach(function(e){r+=" "+t[e]});else{var i=this.get("groupScales");i&&i.length>0&&i.forEach(function(e){var n=e.dim;"identity"!==e.type&&".."!==n.slice(0,2)&&(r+=" "+t[n])});var a=this.getAttr("position"),s=a.getDims(),o=s[0],c=s[1],u=this.get("type");r+="interval"===u||"intervalStack"===u||"schemal"===u?" "+t[o]:"line"===u||"area"===u?" "+u:" "+t[o]+" "+t[c]+" "+u}return r},getYMinValue:function(){var t,e=this.getYScale(),n=e.min;return t=n>=0?n:0},getAttrValue:function(t,e){var n=this.getAttr(t),r=null;return n&&(r=this._getAttrValues(n,e)[0]),r},getAttr:function(t){var e=this.get("attrs"),n=null;return r.each(e,function(e){e.type===t&&(n=e)}),n},getCoord:function(){return this.getAttr("position").coord},getXDim:function(){var t=this.getXScale();return t.dim},getYDim:function(){var t=this.getYScale();return t.dim},getXScale:function(){return this.getAttr("position").scales[0]},getYScale:function(){return this.getAttr("position").scales[1]}}),t.exports=u},function(t,e,n){var r=n(22);n(65),t.exports=r},function(t,e,n){var r=n(67);t.exports=r},function(t,e,n){"use strict";function r(t,e){var n=t.getContext("2d");if(n.beginPath(),n.save(),n.globalAlpha=e.opacity||1,e.lineDash&&n.setLineDash&&n.setLineDash(e.lineDash),e.fill&&(e.fillStyle=e.fill),delete e.fill,e.stroke&&(e.strokeStyle=e.stroke),delete e.stroke,e.fontStyle||e.fontVariant||e.fontWeight||e.fontSize||e.fontFamily){var r={};a.mix(r,c.defaultFont,e),e.font=[r.fontStyle,r.fontVariant,r.fontWeight,r.fontSize+"px",r.fontFamily].join(" ")}return a.mix(n,e),n}function i(t,e){var n=t.globalAlpha;e.strokeStyle&&(e.strokeOpacity&&(t.globalAlpha=e.strokeOpacity),t.stroke(),t.globalAlpha=n),e.fillStyle&&(t.globalAlpha=e.fillOpacity||t.globalAlpha,t.fill(),(e.fillOpacity||e.strokeOpacity)&&(t.strokeStyle=e.strokeStyle?e.strokeStyle:e.fillStyle,t.globalAlpha=e.strokeOpacity||1,t.stroke())),t.restore()}var a=n(1),s=n(8),o=n(106),c=n(3);t.exports={drawLine:function(t,e,n,a){var s=r(n,a);s.moveTo(t.x,t.y),s.lineTo(e.x,e.y),i(s,a)},drawText:function(t,e,n,i){var a;i.rotate&&(a=i.rotate*Math.PI/180,delete i.rotate);var s=r(n,i);a?(s.translate(e.x,e.y),s.rotate(a),s.fillText(""+t,0,0)):s.fillText(""+t,e.x,e.y),s.restore()},drawCircle:function(t,e,n,a){var s=r(n,a);s.arc(t.x,t.y,e,0,2*Math.PI),s.closePath(),i(s,a)},drawArc:function(t,e,n,a,s,o){var c=r(s,o);c.arc(t.x,t.y,e,n,a),o.z!==!1&&c.closePath(),i(c,o)},radiusRect:function(t,e,n,r,i,a){a.moveTo(t+i,e),a.arcTo(t+n,e,t+n,e+r,i),a.arcTo(t+n,e+r,t,e+r,i),a.arcTo(t,e+r,t,e,i),a.arcTo(t,e,t+n,e,i)},drawRect:function(t,e,n){var a=r(e,n),s=t[0].x,o=t[0].y,c=t[2].x,u=t[1].y;t.forEach(function(t){t.x>c&&(c=t.x),t.x<s&&(s=t.x),t.y>u&&(u=t.y),t.y<o&&(o=t.y)});var l=s,f=o,h=c-s,g=u-o;if(n.radius){var p=Math.min(n.radius,h/2,g/2);this.radiusRect(l,f,h,g,p,a)}else a.rect(l,f,h,g);n.z!==!1&&a.closePath(),i(a,n)},drawShape:function(t,e,n){var a=r(t,e);n(a),e.z&&a.closePath(),i(a,e)},drawLines:function(t,e,n){var a=r(e,n);this.lines(t,a),n.z&&a.closePath(),i(a,n)},lines:function(t,e,n){if(t.length){n!==!1&&e.moveTo(t[0].x,t[0].y);for(var r=1,i=t.length;r<i;r++){var a=t[r];e.lineTo(a.x,a.y)}}},drawFan:function(t,e,n,a){var o=r(n,a),c=new s(1,0),u=new s(t[0].x-e.x,t[0].y-e.y),l=u.length(),f=new s(t[1].x-e.x,t[1].y-e.y),h=f.length(),g=new s(t[2].x-e.x,t[2].y-e.y),p=c.angleTo(f),v=c.angleTo(g);p>v&&p-v<1e-4?(o.moveTo(e.x+h,e.y),o.arc(e.x,e.y,h,0,Math.PI),o.arc(e.x,e.y,h,Math.PI,2*Math.PI),o.moveTo(e.x+l,e.y),o.arc(e.x,e.y,l,2*Math.PI,Math.PI,!0),o.arc(e.x,e.y,l,Math.PI,0,!0),o.closePath()):(o.moveTo(t[0].x,t[0].y),o.lineTo(t[1].x,t[1].y),o.arc(e.x,e.y,h,p,v),o.lineTo(t[3].x,t[3].y),o.arc(e.x,e.y,l,v,p,!0),o.closePath()),i(o,a)},drawSmooth:function(t,e,n){if(0!==t.length){var r=this.before(e,n);this.smooth(t,r),this.after(r,n)}},before:function(t,e){return r(t,e)},after:function(t,e){return i(t,e)},smooth:function(t,e,n){var r=o.smooth(t);n!==!1&&e.moveTo(t[0].x,t[0].y);for(var i=0,a=r.length;i<a;i++){var s=r[i];e.bezierCurveTo(s[1],s[2],s[3],s[4],s[5],s[6])}}}},function(t,e,n){"use strict";function r(t,e){this.x=t,this.y=e}var i=n(1);r.add=function(t,e){return new r(t.x+e.x,t.y+e.y)},r.sub=function(t,e){return new r(t.x-e.x,t.y-e.y)},i.augment(r,{length:function(){return Math.sqrt(this.x*this.x+this.y*this.y)},normalize:function(){var t=1/this.length();return new r(this.x*t,this.y*t)},add:function(t){return r.add(this,t)},sub:function(t){return r.sub(this,t)},multiply:function(t){return new r(this.x*t,this.y*t)},dot:function(t){return this.x*t.x+this.y*t.y},angle:function(t){var e=this.dot(t)/(this.length()*t.length());return Math.acos(e)},angleTo:function(t){var e=this.angle(t),n=this.direction(t);return n>=0?e:2*Math.PI-e},zero:function(){return 0===this.x&&0===this.y},direction:function(t){return this.x*t.y-t.x*this.y},distanceTo:function(t){return r.sub(this,t).length()},clone:function(){return new r(this.x,this.y)},getPoint:function(){return{x:this.x,y:this.y}}}),t.exports=r},function(t,e,n){"use strict";var r=n(1),i=["min","max"],a=function(t){r.mix(this,t)};r.augment(a,{xScale:null,yScale:null,cfg:{},parsePoint:function(t,e){var n,a=this,s=a.xScale,o=a.yScale,c=e[0],u=e[1],l=u;if(c=s?r.indexOf(i,c)!==-1?s.scale(s[c]):s.scale(c):1,o){var f=o.scale(l),h=o.scale(o[l]);n=r.indexOf(i,u)!==-1?h:f}else n=1;return t.convertPoint({x:c,y:n})},paint:function(){}}),t.exports=a},function(t,e,n){"use strict";var r=n(1);n(18);var i=function(t){r.mix(this,t)};r.augment(i,{bgimageData:null,imageData:null,ratio:1,startPoint:{x:0,y:0},center:{x:200,y:200},radius:160,reduceMultiple:1,duration:1e3,easing:"easeInOut",success:null,paint:function(t){var e=this,n=document.createElement("canvas"),r=t.width,i=t.height,a=r/parseInt(t.style.width,10);e.ratio=a,n.style.width=r+"px",n.style.height=i+"px",n.width=r,n.height=i,e.draw(t,n)},draw:function(){},animateStep:function(t){var e=this;r.animateStep(function(n,r){r%e.reduceMultiple!==0&&1!==n||t(n)},e.duration,e.easing,e.success)},clear:function(t){var e=t.getContext("2d");e.clearRect(0,0,t.width,t.height)}}),t.exports=i},function(t,e,n){"use strict";var r=n(1),i=function(t){r.mix(this,t)};i.prototype={type:"base",names:null,scales:[],min:0,max:10,method:function(t){return t*(this.max-this.min)+this.min},callback:function(){var t,e,n,i=this,a=i.arr,s=i.scales,o=r.toArray(arguments),c=[];return r.each(s,function(s,u){t=o[u],n=s.scale(t),e=s.translate(t),"identity"===s.type?c.push(s.value):r.isArray(a)?c.push(i._getArrValue(a,s,n,e)):i.method?c.push(i.method(n)):c.push(null)}),c},getNames:function(){var t=this.scales,e=this.names,n=[];return r.each(t,function(t,r){n.push(e[r])}),n},getDims:function(){var t=this.scales,e=[];return r.each(t,function(t){e.push(t.dim)}),e},getScale:function(t){var e=this.scales,n=this.names,r=n.indexOf(t);return e[r]},mappingValues:function(){var t=this.scales,e=r.toArray(arguments),n=this.callback,i=e;if(n){for(var a=0;a<e.length;a++)e[a]=this.parseParam(e[a],t[a]);i=n.apply(this,e)}return this.names&&1===this.names.length&&(i=[i]),i},parseParam:function(t,e){var n=t;return e.isLinear||(n=e.scale(t),n=e.invert(n)),n},_getArrValue:function(t,e,n,r){var i=0;return e.isCategory?i=r:e.isLinear&&(i=parseInt(n*(t.length-1),10)),t[i%t.length]}},t.exports=i},function(t,e,n){"use strict";var r=n(1),i=function(t){r.mix(this,t),this.init()};r.augment(i,{formatter:null,range:[0,1],ticks:null,init:function(){},getTicks:function(){var t=this,e=t.ticks,n=[];return r.each(e,function(e){var i;i=r.isObject(e)?e:{text:t.getText(e),value:t.scale(e)},n.push(i)}),n},getText:function(t){var e=this.formatter;return t=e?e(t):t,!r.isNull(t)&&t.toString||(t=""),t.toString()},rangeMin:function(){return this.range[0]},rangeMax:function(){var t=this.range;return t[t.length-1]},invert:function(){},translate:function(t){return t},scale:function(){},clone:function(){var t=this,e=t.constructor,n={};return r.each(t,function(e,r){n[r]=t[r]}),new e(n)},change:function(t){return this.ticks=null,r.mix(this,t),this.init(),this}}),t.exports=i},function(t,e,n){"use strict";function r(t){r.superclass.constructor.call(this,t),this._init()}var i=n(1),a=n(6),s=n(47),o=["color","size","shape"],c=n(5),u="_origin";s.Base.prototype.sort=function(t){var e=this.getXScale(),n=[];if("cat"===e.type||"timeCat"===e.type)n=t.slice(0);else{var r=this.getXDim();i.each(t,function(t){n.push(c.sort(t,r))})}return n},r.ATTRS={coreType:null,frames:null,attrs:null,container:null,styleCfg:null},i.extend(r,a),i.augment(r,{_init:function(){var t=this.get("coreType"),e=new s[t]({attrs:this.get("attrs"),container:this.get("container"),styleCfg:this.get("styleCfg")});this.set("core",e),this.processCore()},_getGroupScales:function(){var t=this.get("core"),e=[];return i.each(o,function(n){var r=t.getAttr(n);if(r){var a=r.scales;i.each(a,function(t){t&&t.isCategory&&i.indexOf(e,t)===-1&&e.push(t)})}}),e},_groupFrames:function(t){var e=this,n=[],r=e._getGroupScales();return i.each(r,function(t){n.push(t.dim)}),c.group(t,n)},processCore:function(){},initData:function(t){var e=this._groupFrames(t);e=this._saveOriginData(e),e=this.processFrames(e),this.set("frames",e)},processFrames:function(t){return t},_saveOriginData:function(t){return i.each(t,function(t){var e=t.toJSON();t.addCol(u,e)}),t},draw:function(t){var e=this.get("frames"),n=this.get("core");t&&n.set("container",t),n.draw(e)},getXScale:function(){var t=this.get("core");return t.getXScale()},getYScale:function(){var t=this.get("core");return t.getYScale()},_isStack:function(t){var e=!1;return"intervalStack"!==t&&"areaStack"!==t||(e=!0),e},_getSnap:function(t,e){var n,r=0,i=this.get("attrs")[0].dims[1];if(this._isStack(this.get("type"))&&t.dim===i){var a=this.get("frames");for(n=[],a.forEach(function(e){e.data.forEach(function(e){n.push(e[t.dim])})});r<n.length&&!(n[0][0]>e);r++){if(n[n.length-1][1]<=e){r=n.length-1;break}if(n[r][0]<=e&&n[r][1]>e)break}}else for(n=t.values,n.sort(function(t,e){return t-e});r<n.length&&!((n[0]+n[1])/2>e)&&!((n[r-1]+n[r])/2<=e&&(n[r+1]+n[r])/2>e);r++)if((n[n.length-2]+n[n.length-1])/2<=e){r=n.length-1;break}var s=n[r];return s},getSnapRecords:function(t,e){var n=this,r=n.get("coord"),a=n.getXScale(),s=n.getYScale(),o=a.dim,c=s.dim,u=r.invertPoint(t),l=n.get("frames"),f=[];if(e===c){var h=s.invert(u.y);s.isCategory||(h=n._getSnap(s,h)),i.each(l,function(t){t.each(function(t){(i.isArray(h)?i.equalsArray(t[c],h):t[c]===h)&&f.push(t)})})}else{var g=a.invert(u.x);a.isCategory||(g=n._getSnap(a,g)),i.each(l,function(t){t.each(function(t){t[o]===g&&f.push(t)})})}return f},getAllShapeData:function(){var t=this.get("core");return t.get("shapeDatas")}}),t.exports=r},function(t,e,n){"use strict";var r=n(1),i=n(17),a=n(3);r.mix(i.ShapeBase,{parsePoint:function(t){1===t.x&&(t.x=.9999999),1===t.y&&(t.y=.9999999);var e=this._coord;return e.convertPoint(t)},parsePoints:function(t){if(!t)return!1;var e=this,n=[];return r.each(t,function(t){n.push(e.parsePoint(t))}),n}}),r.mix(i.GeomShape,{drawShape:function(t,e,n){var r=this.getShape(t);return e.color||(e.color=a.colors[0]),r.drawShape(e,n)}}),t.exports=i},function(t,e,n){var r={};r.number=n(74),r.time=n(75),r.category=n(73),t.exports=r},function(t,e,n){"use strict";var r=n(13);r.Line=n(100),r.Point=n(101),r.Interval=n(32),r.IntervalStack=n(99),r.StackMixin=n(33),r.WidthMixin=n(34),t.exports=r},function(t,e,n){"use strict";var r=n(1),i={},a={defaultShapeType:null,getShape:function(t){var e=this,n=e[t]||e[e.defaultShapeType]||i.ShapeBase;return n._coord=e._coord,n},getShapePoints:function(t,e){var n=this.getShape(t);return n.getShapePoints(e)},drawShape:function(t,e,n){var r=this.getShape(t);return r.drawShape(e,n)}},s={_coord:null,drawShape:function(){},getShapePoints:function(){}};i.registGeom=function(t,e){var n=r.ucfirst(t),s=r.mix({},a,e);return i[n]=s,s.className=n,s},i.registShape=function(t,e,n){var a=r.ucfirst(t),s=i[a],o=s.getShape(),c=r.mix({},o,n);return s[e]=c,c},i.getShape=function(t){var e=this;return t=t||"point",t=r.ucfirst(t),e[t]||i.ShapeBase},i.GeomShape=a,i.ShapeBase=s,t.exports=i},function(t,e,n){function r(){return++a}var i=n(1),a=0,s={},o=Math.pow,c=Math,u=Math.abs,l={linear:function(t){return t},easeIn:function(t){return o(t,1.7)},easeOut:function(t){return o(t,.48)},easeInOut:function(t){var e=.48-t/1.04,n=c.sqrt(.1734+e*e),r=n-e,i=o(u(r),1/3)*(r<0?-1:1),a=-n-e,s=o(u(a),1/3)*(a<0?-1:1),l=i+s+.5;return 3*(1-l)*l*l+l*l*l},backIn:function(t){var e=1.70158;return t*t*((e+1)*t-e)},backOut:function(t){t-=1;var e=1.70158;return t*t*((e+1)*t+e)+1},elastic:function(t){return t===!!t?t:o(2,-10*t)*c.sin((t-.075)*(2*Math.PI)/.3)+1},bounce:function(t){var e,n=7.5625,r=2.75;return t<1/r?e=n*t*t:t<2/r?(t-=1.5/r,e=n*t*t+.75):t<2.5/r?(t-=2.25/r,e=n*t*t+.9375):(t-=2.625/r,e=n*t*t+.984375),e}};i.mix(i,{animateStep:function(t,e,n,a){function o(t,e,r,a){var f=(new Date).getTime(),h=f-c;if(h>=r)return e(1,t),void(a&&a());var g=l[n||"linear"],p=g(h/r);e(p,t),s[u]=i.requestAnimationFrame(function(){o(t+1,e,r,a)})}var c=(new Date).getTime(),u=r();return o(0,t,e,a),u},stopStep:function(t){s[t]&&(i.cancelAnimationFrame()(s[t]),delete s[t])}}),t.exports=i},function(t,e,n){"use strict";var r=n(1),i=["color","shape","size","opacity"],a="_origin";t.exports={getShapeData:function(t){var e={},n=t.toJSON(),s=n[0],o=t.colArray("_origin");return r.each(i,function(t){s.hasOwnProperty(t)&&(e[t]=s[t])}),e[a]=o,e}}},function(t,e,n){"use strict";var r=n(1);t.exports={splitData:function(t){if(!t.length)return[];var e,n=[],i=[],a=this.getYDim();return r.each(t,function(t){e=t._origin?t._origin[a]:t[a],r.isArray(e)&&r.isNull(e[0])||r.isNull(e)?(n.push(i),i=[]):i.push(t)}),n.push(i),n}}},function(t,e,n){"use strict";function r(t){r.superclass.constructor.call(this,t)}var i=n(1),a=n(4),s=n(20),o=n(19);i.extend(r,a),i.mixin(r,[s,o]),r.ATTRS={type:"path",shapeType:"line"},i.augment(r,{drawFrame:function(t,e){var n,r,a,s=this,o=t.toJSON(),c=this.splitData(o),u=this.get("container"),l=this.get("shapeObj"),f=o[0],h=this.getDrawCfg(f),g=f.points.length;f.index=e,h=this.getDrawCfg(f);var p=s.get("adjusts"),v=p&&i.indexOf(p,"Stack")!==-1,d=s.getShapeData(t);s.get("shapeDatas").push(d),i.each(c,function(t,e){h.splitedIndex=e;for(var i=0;i<g;i++)if(n=[],!v||0!==i){for(var o=0;o<t.length;o++)a=t[o],n.push(a.points[i]);if(0===n.length)return;h.points=n,h.index=i,r=s.getDrawShape(h.shape),l.drawShape(r,h,u)}})},_getJoinIdAttr:function(){var t=this.get("attrs"),e=[];return i.each(t,function(t){"position"!==t.type&&e.push(t)}),e}}),t.exports=r},function(t,e,n){var r=n(1),i=function(t,e){this.data=t,r.mix(this,e),this.initFrame()};i.prototype={isFrame:!0,initFrame:function(){var t=this,e=t.data,n=t.colNames(),i=t.arr;if(r.isArray(e[0])&&(i=t.arr=e),!i){i=[];for(var a=0;a<n.length;a++){for(var s=[],o=n[a],c=0;c<e.length;c++)s.push(e[c][o]);i.push(s)}t.arr=i}},contains:function(t){var e=this.colNames();return r.indexOf(e,t)!==-1},colNames:function(){var t=this,e=t.names;if(!e){var n=this.data,i=n[0];e=[],i&&r.each(i,function(t,n){e.push(n)}),t.names=e}return e},rowCount:function(){var t=this,e=t.arr;return e&&e.length?e[0].length:0},colCount:function(){var t=this,e=t.colNames();return e?e.length:0},colIndex:function(t){return r.indexOf(this.names,t)},colArray:function(t){var e=t;return r.isString(t)&&(e=this.colIndex(t)),this.arr[e]},colReplace:function(t,e){var n=this.arr,i=this.colNames();if(r.isString(t)){var a=t;t=r.indexOf(i,a)}return n[t]=e,this},each:function(t){for(var e=this,n=e.rowCount(),r=0;r<n;r++){var i=e._getObject(r);t(i,r)}return e},rowObject:function(t){return this._getObject(t)},_getObject:function(t,e){var n=this,r=n.arr,i={};e=e||n.colNames();for(var a=0;a<e.length;a++)i[e[a]]=r[a][t];return i},addCol:function(t,e){var n=this;if(r.isFunction(e)){var i=e;e=[],n.each(function(t,n){var r=i(t,n);e.push(r)})}n.names.push(t),n.arr.push(e)},toArray:function(){return this.arr},toJSON:function(){for(var t=this,e=t.rowCount(),n=[],r=0;r<e;r++)n.push(t._getObject(r));return n}},t.exports=i},function(t,e){"use strict";function n(t){for(var e=1;t>10;)e=10*e,t/=10;for(;t<1;)e/=10,t=10*t;return e}function r(t,e){var n=t.length;if(0===n)return NaN;var r=t[0];if(e<t[0])return NaN;if(e>=t[n-1])return t[n-1];for(var i=1;i<t.length&&!(e<t[i]);i++)r=t[i];return r}function i(t,e){var n=t.length;if(0===n)return NaN;var r,i=t[0];if(e>t[n-1])return NaN;if(e<t[0])return t[0];for(var a=1;a<t.length;a++){if(e<=t[a]){r=t[a];break}i=t[a]}return r}var a={snapFactorTo:function(t,e,r){var i=1;t<0&&(i=-1),t*=i;var s=n(t);return i*=s,t/=s,t="floor"===r?a.snapFloor(e,t):"ceil"===r?a.snapCeiling(e,t):a.snapTo(e,t),t*i},snapMultiple:function(t,e,n){var r;return r=n?Math.ceil(t/e,10):Math.floor(t/e,10),r*e},snapTo:function(t,e){var n=r(t,e),a=i(t,e);if(isNaN(n)||isNaN(a)){if(t[0]>=e)return t[0];var s=t[t.length-1];if(s<=e)return s}return Math.abs(e-n)<Math.abs(a-e)?n:a},snapFloor:function(t,e){return r(t,e)},snapCeiling:function(t,e){return i(t,e)}};t.exports=a},function(t,e,n){var r=n(1),i=n(12);i.Linear=n(78),i.linear=function(t){return new i.Linear(t)},i.Cat=n(25),i.cat=function(t){return new i.Cat(t)},i.Identity=n(77),i.I=function(t){return new i.Identity(t)},i.TimeCat=n(79),i.timeCat=function(t){return new i.TimeCat(t)},i.I_TYPE="identity",i.isCategory=function(t){if("cat"===t)return!0;var e=r.ucfirst(t);return!(!i[e]||!i[e].superclass||"cat"!==i[e].superclass.type)},t.exports=i},function(t,e,n){"use strict";var r=n(12),i=n(1),a=n(15),s=function(t){s.superclass.constructor.call(this,t)};i.extend(s,r),i.augment(s,{type:"cat",tickCount:null,isCategory:!0,init:function(){var t=this,e=t.values,n=t.tickCount;if(i.each(e,function(t,n){e[n]=t.toString()}),!t.ticks){var r=e;if(n){var s=a.category({maxCount:n,data:e});r=s.ticks}this.ticks=r}},getText:function(t){return this.values.indexOf(t)>-1?t=t:i.isNumber(t)&&(t=this.values[Math.round(t)]),s.superclass.getText.call(this,t)},translate:function(t){var e=this.values.indexOf(t);return e===-1&&i.isNumber(t)?e=t:e===-1&&(e=NaN),e},scale:function(t){var e,n=this.rangeMin(),r=this.rangeMax();return(i.isString(t)||this.values.indexOf(t)!==-1)&&(t=this.translate(t)),e=this.values.length>1?t/(this.values.length-1):t,n+e*(r-n)},invert:function(t){if(i.isString(t))return t;var e=this.rangeMin(),n=this.rangeMax();t<e&&(t=e),t>n&&(t=n);var r=(t-e)/(n-e),a=Math.round(r*(this.values.length-1))%this.values.length;return a=a||0,this.values[a]}}),t.exports=s},function(t,e,n){"use strict";function r(t){r.superclass.constructor.call(this,t)}var i=n(1),a=n(2),s=a.Geom;r.ATTRS={coreType:"Area"},i.extend(r,s),t.exports=r},function(t,e,n){"use strict";var r=n(1),i=n(3),a=function(t){r.mix(this,t)};r.augment(a,{animate:null,setImageData:function(t,e){var n=this;n.animate.imageData=t,n.animate.bgImageData=e},setStartPoint:function(t){this.animate.startPoint=t},setPolar:function(t,e){this.animate.center=t,this.animate.radius=e},setCallBack:function(t){var e=this.animate.success,n=null;n=r.isFunction(e)?function(){t(),e()}:t,this.animate.success=n},paint:function(t){var e=this.animate;e.cycle=i.animateReduceMultiple,e.paint(t)}}),t.exports=a},function(t,e,n){"use strict";var r=n(1),i=n(6),a=n(7),s=n(8),o=function(t){o.superclass.constructor.call(this,t),this.init()};o.ATTRS={ticks:[],tickLine:{},offsetFactor:1,canvas:null,gridPoints:[]},r.extend(o,i),r.augment(o,{init:function(){},draw:function(){var t=this,e=t.get("line"),n=t.get("tickLine"),r=t.get("label");e&&t.drawLine(e),n&&t.drawTicks(n),r&&t.drawLabels(r)},drawGrid:function(){var t=this,e=t.get("grid");if(e){var n,i=t.get("canvas"),s=t.get("gridPoints"),o=t.get("ticks"),c=s.length;r.each(s,function(t,s){if(r.isFunction(e)){var u=o[s]||{};n=e(u.text,s,c)}else n=e;n&&a.drawLines(t,i,n)})}},getOffsetPoint:function(){},getAxisVector:function(){},getOffsetVector:function(t,e){var n=this,r=n.getAxisVector(t),i=r.normalize(),a=n.get("offsetFactor"),o=new s(i.y*-1*a,i.x*a);return o.multiply(e)},getSidePoint:function(t,e){var n=this,r=n.getOffsetVector(t,e);return{x:t.x+r.x,y:t.y+r.y}},drawTicks:function(t){var e=this,n=e.get("ticks"),i=t.value,s=e.get("canvas");r.each(n,function(n){var r=e.getOffsetPoint(n.value),o=e.getSidePoint(r,i);a.drawLine(r,o,s,t)})},getTextAlignInfo:function(t,e){var n,r,i=this,a=i.getOffsetVector(t,e);return n=a.x>0?"left":a.x<0?"right":"center",r=a.y>0?"top":a.y<0?"bottom":"middle",{textAlign:n,textBaseline:r}},drawLabels:function(t){var e,n=this,i=n.get("ticks"),s=n.get("canvas"),o=i.length;r.each(i,function(i,c){if(e=r.isFunction(t)?t(i.text,c,o):t){var u=n.get("labelOffset"),l=n.getOffsetPoint(i.value),f=n.getSidePoint(l,u),h=r.mix({},n.getTextAlignInfo(l,u),e);a.drawText(h.text||i.text,f,s,h)}})},drawLine:function(){}}),t.exports=o},function(t,e,n){"use strict";function r(t){r.superclass.constructor.call(this,t),this.__init()}var i=n(1),a=n(6);r.ATTRS={type:"cartesian",transposed:!1},i.extend(r,a),i.augment(r,{isRect:!0,isTransposed:!1,__init:function(){var t=this,e=t.get("plot"),n={start:e.get("bl").x,end:e.get("br").x},r={start:e.get("bl").y,end:e.get("tl").y};this.isTransposed=t.get("transposed"),t.set("x",n),t.set("y",r)},convertPoint:function(t){var e=this,n=e.isTransposed,r=n?"y":"x",i=n?"x":"y",a=e.get("x"),s=e.get("y");return{x:a.start+(a.end-a.start)*t[r],y:s.start+(s.end-s.start)*t[i]}},invertPoint:function(t){var e=this,n=e.isTransposed,r=n?"y":"x",i=n?"x":"y",a=e.get("x"),s=e.get("y"),o={};return o[r]=(t.x-a.start)/(a.end-a.start),o[i]=(t.y-s.start)/(s.end-s.start),o}}),t.exports=r},function(t,e,n){"use strict";t.exports={Rect:n(29),Cartesian:n(29),Polar:n(31),Circle:n(31)}},function(t,e,n){"use strict";function r(t){r.superclass.constructor.call(this,t),this.__init()}var i=n(1),a=n(6),s=n(8);r.ATTRS={startAngle:-Math.PI/2,endAngle:3*Math.PI/2,inner:0,type:"polar"},i.extend(r,a),i.augment(r,{isPolar:!0,isTransposed:!1,__init:function(){var t=this,e=t.get("plot"),n=t.get("inner"),r=Math.min(e.get("width"),e.get("height"))/2,i={start:t.get("startAngle"),end:t.get("endAngle")},a={start:r*n,end:r},s={x:(e.get("bl").x+e.get("br").x)/2,y:(e.get("tl").y+e.get("bl").y)/2};this.isTransposed=t.get("transposed"),t.set("center",s),t.set("radius",r),t.set("x",i),t.set("y",a)},convertPoint:function(t){var e=this,n=e.get("center"),r=e.isTransposed,i=r?"y":"x",a=r?"x":"y",s=e.get("x"),o=e.get("y"),c=s.start+(s.end-s.start)*t[i],u=o.start+(o.end-o.start)*t[a];return{x:n.x+Math.cos(c)*u,y:n.y+Math.sin(c)*u}},invertPoint:function(t){var e=this,n=e.get("center"),r=e.isTransposed,i=r?"y":"x",a=r?"x":"y",o=e.get("x"),c=e.get("y"),u=new s(1,0),l=new s(t.x-n.x,t.y-n.y);if(l.zero())return{x:0,y:0};for(var f=u.angleTo(l);f>o.end;)f-=2*Math.PI;var h=l.length(),g=(f-o.start)/(o.end-o.start),p=(h-c.start)/(c.end-c.start),v={};return v[i]=g,v[a]=p,v}}),t.exports=r},function(t,e,n){"use strict";function r(t){r.superclass.constructor.call(this,t)}var i=n(1),a=n(13),s=n(34);r.ATTRS={coreType:"Interval"},i.extend(r,a),i.mixin(r,[s]),t.exports=r},function(t,e,n){"use strict";var r=n(1),i=n(5),a=function(){};a.ATTRS={isAdjust:!0},r.augment(a,{processFrames:function(t){for(var e=this,n=e.getXScale().dim,a=e.getYScale().dim,s=t.length,o=[],c={},u=[],l=0;l<s;l++){for(var f=t[l].toJSON(),h=0;h<f.length;h++){var g=f[h],p=g[n],v=g[a],d=p.toString();v=r.isArray(v)?v[1]:v,c[d]||(c[d]=0),g[a]=[c[d],v+c[d]],c[d]+=v}o.push(f)}return r.each(o,function(t){var e=new i(t);u.push(e)}),u}}),t.exports=a},function(t,e,n){"use strict";var r=n(1),i=n(3),a=function(){};a.ATTRS={isAdjust:!0},r.augment(a,{processCore:function(){var t=this,e=this.get("core");e.getDefalutSize=function(){return t._getDefalutSize()}},_getDefalutSize:function(){var t=this.get("core"),e=t.getCoord(),n=t.getXScale(),r=n.values,a=i.widthRatio.column;return e.isPolar&&(a=e.isTransposed?1===r.length?i.widthRatio.rose:i.widthRatio.multiplePie:i.widthRatio.rose),a*(1/r.length)}}),t.exports=a},function(t,e,n){"use strict";var r=n(14);n(104),n(103),n(102),t.exports=r},function(t,e,n){"use strict";var r=n(1),i={splitPoints:function(t){var e=[],n=t.x,i=t.y;return i=r.isArray(i)?i:[i],r.each(i,function(t,i){var a={x:r.isArray(n)?n[i]:n,y:t};e.push(a)}),e}};t.exports=i},function(t,e,n){"use strict";var r=n(1),i=function(t){r.mix(this,t),this.guides=[]};r.augment(i,{guides:null,xScale:null,yScale:null,addGuide:function(t){this.guides.push(t)},setScale:function(t,e){var n=this.guides;this.xScale=t,this.yScale=e,r.each(n,function(n){n.xScale=t,n.yScale=e})},paintFront:function(t,e){var n=this.guides;r.each(n,function(n){"text"!==n.type&&"html"!==n.type||n.paint(t,e)})},paintBack:function(t,e){var n=this.guides;r.each(n,function(n){"text"!==n.type&&"html"!==n.type&&n.paint(t,e)})},clear:function(t){if(this.guides=[],t){var e=t.getElementsByClassName("guideWapper")[0];e&&t.removeChild(e)}return this}}),t.exports=i},function(t,e,n){"use strict";function r(t){r.superclass.constructor.call(this,t),this.__init()}var i=n(1),a=n(6);i.extend(r,a),i.augment(r,{__init:function(){var t=this,e=t.get("start"),n=t.get("end"),r={};r.x=Math.min(e.x,n.x),r.y=Math.min(e.y,n.y),t.set("tl",r);var i={};i.x=Math.max(e.x,n.x),i.y=Math.min(e.y,n.y),t.set("tr",i);var a={};a.x=Math.min(e.x,n.x),a.y=Math.max(e.y,n.y),t.set("bl",a);var s={};s.x=Math.max(e.x,n.x),s.y=Math.max(e.y,n.y),t.set("br",s),t.set("width",s.x-r.x),t.set("height",s.y-r.y)},reset:function(t,e){this.set("start",t),this.set("end",e),this.__init()},isInRange:function(t,e){i.isObject(t)&&(e=t.y,t=t.x);var n=this.get("tl"),r=this.get("br");return n.x<=t&&t<=r.x&&n.y<=e&&e<=r.y}}),t.exports=r},function(t,e,n){"use strict";var r="#999999",i="#E9E9E9",a=n(1),s={label:{fillStyle:"#979797",font:"20px san-serif"},labelOffset:6,line:{stroke:i,lineWidth:1},grid:{stroke:i,lineWidth:1},tickLine:null},o={fontStyle:"",fontVariant:"",fontWeight:"",fontSize:"10px",fontFamily:'"Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "\u5fae\u8f6f\u96c5\u9ed1", SimSun, "sans-serif"'},c={defaultFont:o,pixelRatio:1,margin:[40,40,40,40],colors:["#4E7CCC","#36B3C3","#4ECDA5","#94E08A","#E2F194","#EDCC72","#F8AB60","#F9815C","#EB4456","#C82B3D"],axis:{bottom:a.mix(!0,{},s,{line:{stroke:r},label:{textBaseline:"hanging"},labelOffset:12,gridAttrs:{},grid:function(t,e,n){return 0===e||e===n-1?null:a.mix({},s.grid,c.axis.bottom.gridAttrs)}}),left:a.mix(!0,{},s,{label:{textAlign:"end"},line:null,tickLine:null}),right:a.mix(!0,{},s,{label:{textAlign:"start"},line:null,tickLine:null,grid:null}),circle:a.mix(!0,{},s,{line:{stroke:r}}),radius:a.mix(!0,{},s,{})}};t.exports=c},function(t,e,n){var r=n(2);r.AnimateAssist=n(41),t.exports=r},function(t,e,n){var r=n(18),i=n(2),a=n(42),s=n(44),o=n(43),c=n(46),u=n(45),l=i.AnimateAssist;r.augment(l,{waveh:function(t){var e={type:"waveh"};e=r.mix({},t,e),this.animate=new c(e)},wavec:function(t){var e={type:"wavec"};e=r.mix({},t,e),this.animate=new u(e)},scalex:function(t){var e={type:"scalex"};e=r.mix({},t,e),this.animate=new a(e)},scaley:function(t){var e={type:"scaley"};e=r.mix({},t,e),this.animate=new s(e)},scalexy:function(t){var e={type:"scalexy"};e=r.mix({},t,e),this.animate=new o(e)}}),t.exports=l},function(t,e,n){"use strict";var r=n(1),i=n(10),a=function(t){a.superclass.constructor.call(this,t)};r.extend(a,i),r.augment(a,{draw:function(t,e){var n=this,r=n.ratio,i=n.startPoint.x*r,a=t.width,s=t.height,o=t.getContext("2d"),c=e.getContext("2d"),u=n.imageData,l=n.bgImageData;c.putImageData(u,0,0),n.animateStep(function(c){n.clear(t),o.putImageData(l,0,0);var u=i*c/r,f=(a-i)*c/r;o.drawImage(e,0,0,a,s,i*(1-c)/r,0,u+f,s/r)})}}),t.exports=a},function(t,e,n){"use strict";var r=n(1),i=n(10),a=function(t){a.superclass.constructor.call(this,t)};r.extend(a,i),r.augment(a,{draw:function(t,e){var n=this,r=n.ratio,i=n.center,a=t.width,s=t.height,o=t.getContext("2d"),c=e.getContext("2d"),u=n.imageData,l=n.bgImageData;
	c.putImageData(u,0,0),n.animateStep(function(c){n.clear(t),o.putImageData(l,0,0),o.drawImage(e,0,0,a,s,i.x*(1-c),i.y*(1-c),a*c/r,s*c/r)})}}),t.exports=a},function(t,e,n){"use strict";var r=n(1),i=n(10),a=function(t){a.superclass.constructor.call(this,t)};r.extend(a,i),r.augment(a,{draw:function(t,e){var n=this,r=n.ratio,i=n.startPoint.y*r,a=t.width,s=t.height,o=t.getContext("2d"),c=e.getContext("2d"),u=n.imageData,l=n.bgImageData;c.putImageData(u,0,0),n.animateStep(function(c){n.clear(t),o.putImageData(l,0,0);var u=i*c/r,f=(s-i)*c/r;o.drawImage(e,0,0,a,s,0,i*(1-c)/r,a/r,u+f)})}}),t.exports=a},function(t,e,n){"use strict";var r=n(1),i=n(10),a=function(t){a.superclass.constructor.call(this,t)};r.extend(a,i),r.augment(a,{draw:function(t,e){var n=this,r=t.width,i=t.height,a=t.getContext("2d"),s=e.getContext("2d"),o=n.ratio,c=n.center,u=n.radius,l=n.imageData,f=n.bgImageData;a.putImageData(f,0,0),s.putImageData(l,0,0),n.animateStep(function(s){n.clear(t),a.putImageData(f,0,0),a.save(),n.sector(a,2*Math.PI*s,c,u),a.clip(),a.drawImage(e,0,0,r,i,0,0,r/o,i/o),a.restore()})},sector:function(t,e,n,r){t.beginPath(),t.strokeStyle="rgba(1, 1, 1, 0)",t.arc(n.x,n.y,r,1.5*Math.PI,1.5*Math.PI+e),t.moveTo(n.x+Math.sin(e)*r,n.y-Math.cos(e)*r),t.lineTo(n.x,n.y),t.lineTo(n.x,n.y-r),t.stroke()}}),t.exports=a},function(t,e,n){"use strict";var r=n(1),i=n(10),a=function(t){a.superclass.constructor.call(this,t)};r.extend(a,i),r.augment(a,{draw:function(t,e){var n=this,r=t.width,i=t.height,a=t.getContext("2d"),s=n.ratio,o=e.getContext("2d"),c=n.imageData,u=n.bgImageData;a.putImageData(u,0,0),o.putImageData(c,0,0),n.animateStep(function(o){n.clear(t),a.putImageData(u,0,0),a.drawImage(e,0,0,r*o,i,0,0,r*o/s,i/s)})}}),t.exports=a},function(t,e,n){var r={};r.Base=n(4),r.Interval=n(49),r.Point=n(52),r.Line=n(50),r.Polygon=n(53),r.Schema=n(54),r.Path=n(21),r.Area=n(48),t.exports=r},function(t,e,n){"use strict";function r(t){r.superclass.constructor.call(this,t)}var i=n(1),a=n(4),s=n(20),o=n(19);i.extend(r,a),i.mixin(r,[s,o]),r.ATTRS={type:"area"},i.augment(r,{sortFrames:function(t){return this.sort(t)},drawFrame:function(t,e){var n,r,a,s,o=this,c=t.toJSON(),u=this.splitData(c),l=this.get("container"),f=this.get("shapeObj"),h=c[0];h.index=e,n=this.getDrawCfg(h);var g=o.getShapeData(t);o.get("shapeDatas").push(g),i.each(u,function(t,e){n.splitedIndex=e,a=[];for(var i=0;i<t.length;i++)s=t[i],a.push(s.points);0!==a.length&&(n.points=a,r=o.getDrawShape(n.shape),f.drawShape(r,n,l))})},_getJoinIdAttr:function(){var t=this.get("attrs"),e=[];return i.each(t,function(t){"position"!==t.type&&e.push(t)}),e}}),t.exports=r},function(t,e,n){"use strict";function r(t){r.superclass.constructor.call(this,t)}var i=n(1),a=n(4);r.ATTRS={type:"interval"},i.extend(r,a),i.mixin(r),i.augment(r,{getDrawCfg:function(t){var e=this,n=r.superclass.getDrawCfg.call(e,t),i=e.getCoord();return i.isPolar&&(n.z=!0,n.center=i.get("center")),n}}),t.exports=r},function(t,e,n){"use strict";function r(t){r.superclass.constructor.call(this,t)}var i=n(1),a=n(21);i.extend(r,a),r.ATTRS={type:"line"},i.augment(r,{sortFrames:function(t){return this.sort(t)}}),t.exports=r},function(t,e,n){"use strict";var r=n(1),i=n(5);t.exports={sort:function(t){var e=this.getXDim(),n=[];return r.each(t,function(t){n.push(i.sort(t,e))}),n}}},function(t,e,n){"use strict";function r(t){r.superclass.constructor.call(this,t)}var i=n(1),a=n(4);i.extend(r,a),r.ATTRS={type:"point"},t.exports=r},function(t,e,n){"use strict";function r(t){r.superclass.constructor.call(this,t)}var i=n(1),a=n(4);i.extend(r,a),r.ATTRS={type:"polygon"},i.augment(r,{getShapePointInfo:function(t){var e,n=a.prototype.getShapePointInfo.call(this,t),r=this,s=n.x,o=n.y;if(!i.isArray(s)||!i.isArray(o)){var c=r.getXScale(),u=r.getYScale(),l=c.values?c.values.length:c.ticks.length,f=u.values?u.values.length:u.ticks.length,h=.5/l,g=.5/f;c.isCategory&&u.isCategory?(s=[s-h,s-h,s+h,s+h],o=[o-g,o+g,o+g,o-g]):i.isArray(s)?(e=s,s=[e[0],e[0],e[1],e[1]],o=[o-g/2,o+g/2,o+g/2,o-g/2]):i.isArray(o)&&(e=o,o=[e[0],e[1],e[1],e[0]],s=[s-h/2,s-h/2,s+h/2,s+h/2])}var p=i.mix({},t,{x:s,y:o});return p}}),t.exports=r},function(t,e,n){"use strict";function r(t){r.superclass.constructor.call(this,t)}var i=n(1),a=n(4);i.extend(r,a),r.ATTRS={type:"schema"},t.exports=r},function(t,e,n){var r=n(2);r.GuideAssist=n(57),t.exports=r},function(t,e,n){"use strict";var r=n(1),i=n(9),a=n(2),s=a.Vector2,o=a.G,c=function(t){c.superclass.constructor.call(this,t)};r.extend(c,i),r.augment(c,{start:[],end:[],cfg:{strokeStyle:"#CCC"},getCfg:function(t){var e=this,n=e.parsePoint(t,e.start),r=e.parsePoint(t,e.end),i=t.get("center"),a=new s(1,0),o=new s.sub(n,i),c=new s.sub(r,i),u=o.length(),l={radius:u,startAngle:2*Math.PI-o.angleTo(a,!0),endAngle:2*Math.PI-c.angleTo(a,!0)};return l},paint:function(t,e){var n=this.getCfg(t),i=r.mix({z:!1},this.cfg,n),a=t.get("center"),s=n.radius,c=n.startAngle,u=n.endAngle;o.drawArc(a,s,c,u,e,i)}}),t.exports=c},function(t,e,n){"use strict";var r=n(2),i=n(1),a=n(9);a.Text=n(61),a.Line=n(59),a.Arc=n(56),a.Html=n(58),a.Rect=n(60);var s=r.GuideAssist;i.augment(s,{_getDefault:function(){return{xScale:this.xScale,yScale:this.yScale}},line:function(t,e,n){var r={type:"line",from:t,to:e,cfg:i.mix({},n)};i.mix(r,this._getDefault());var s=new a.Line(r);return this.addGuide(s),this},text:function(t,e,n){var r={type:"text",position:t,text:e,cfg:i.mix({},n)};i.mix(r,this._getDefault());var s=new a.Text(r);return this.addGuide(s),this},arc:function(t,e,n){var r={type:"arc",start:t,end:e,cfg:i.mix({},n)};i.mix(r,this._getDefault());var s=new a.Arc(r);return this.addGuide(s),this},html:function(t,e,n){var r={type:"html",point:t,html:e,cfg:i.mix({},n)};i.mix(r,this._getDefault());var s=new a.Html(r);return this.addGuide(s),this},rect:function(t,e,n){var r={type:"rect",start:t,end:e,cfg:i.mix({},n)};i.mix(r,this._getDefault());var s=new a.Rect(r);return this.addGuide(s),this}}),t.exports=s},function(t,e,n){"use strict";function r(t,e,n){var r=[];switch(t){case"tl":r[0]=0,r[1]=0;break;case"tr":r[0]=-e,r[1]=0;break;case"bl":r[0]=0,r[1]=Math.floor(-n);break;case"br":r[0]=Math.floor(-e),r[1]=Math.floor(-n);break;case"rc":r[0]=Math.floor(-e),r[1]=Math.floor(-n/2);break;case"lc":r[0]=0,r[1]=Math.floor(-n/2);break;case"tc":r[0]=Math.floor(-e/2),r[1]=Math.floor(-n);break;case"bc":r[0]=Math.floor(-e/2),r[1]=0;break;default:r[0]=Math.floor(-e/2),r[1]=Math.floor(-n/2)}return r}var i=n(1),a=n(9);n(62);var s=function(t){s.superclass.constructor.call(this,t)};i.extend(s,a),i.augment(s,{type:"html",point:[],cfg:{offset:[0,0],align:"cc"},html:"",paint:function(t,e){var n=this,a=n.parsePoint(t,n.point),s=i.createDom(n.html);s=i.modiCSS(s,{position:"absolute",top:Math.floor(a.y)+"px",left:Math.floor(a.x)+"px",visibility:"hidden"});var o=e.parentNode;o=i.modiCSS(o,{position:"relative"});var c;o.getElementsByClassName("guideWapper").length>0?c=o.getElementsByClassName("guideWapper")[0]:(c=i.createDom('<div class="guideWapper"></div>'),c=i.modiCSS(c,{position:"absolute",top:0,left:0}),o.appendChild(c)),c.appendChild(s);var u=n.cfg;if(u.align){var l=u.align,f=i.getWidth(s),h=i.getHeight(s),g=r(l,f,h);a.x=a.x+g[0],a.y=a.y+g[1]}if(u.offset){var p=u.offset;a.x=a.x+p[0],a.y=a.y+p[1]}i.modiCSS(s,{top:Math.floor(a.y)+"px",left:Math.floor(a.x)+"px",visibility:"visible"})}}),t.exports=s},function(t,e,n){"use strict";var r=n(1),i=n(9),a=n(2),s=a.G,o=function(t){o.superclass.constructor.call(this,t)};r.extend(o,i),r.augment(o,{from:[],to:[],cfg:{strokeStyle:"#000",lineWidth:1},paint:function(t,e){var n=this,r=[];r[0]=n.parsePoint(t,n.from),r[1]=n.parsePoint(t,n.to);var i=n.cfg;s.drawLines(r,e,i)}}),t.exports=o},function(t,e,n){"use strict";var r=n(1),i=n(9),a=n(2),s=a.G,o=function(t){o.superclass.constructor.call(this,t)};r.extend(o,i),r.augment(o,{start:[],end:[],cfg:{fillStyle:"#fafafa"},paint:function(t,e){var n=this,r=n.cfg,i=[];i[0]=n.parsePoint(t,n.start),i[1]=n.parsePoint(t,[n.start[0],n.end[1]]),i[2]=n.parsePoint(t,n.end),i[3]=n.parsePoint(t,[n.end[0],n.start[1]]),r.radius?s.drawRect(i,e,r):s.drawLines(i,e,r)}}),t.exports=o},function(t,e,n){"use strict";var r=n(1),i=n(9),a=n(2),s=a.G,o=function(t){o.superclass.constructor.call(this,t)};r.extend(o,i),r.augment(o,{position:[],text:"",cfg:{fill:"#000",textAlign:"center"},paint:function(t,e){var n=this,r=n.position,i=n.parsePoint(t,r),a=n.cfg,o=n.text;s.drawText(o,i,e,a)}}),t.exports=o},function(t,e,n){"use strict";var r=n(1);r.mix(r,{modiCSS:function(t,e){var n;for(n in e)e.hasOwnProperty(n)===!0&&(t.style[n]=e[n]);return t},createDom:function(t){var e=document.createElement("div");return t=t.replace(/(^\s*)|(\s*$)/g,""),e.innerHTML=""+t,e.childNodes[0]},getStyle:function(t,e){return window.getComputedStyle?window.getComputedStyle(t,null)[e]:t.currentStyle[e]},getWidth:function(t){var e=this.getStyle(t,"width");return"auto"===e&&(e=t.offsetWidth),parseFloat(e)},getHeight:function(t){var e=this.getStyle(t,"height");return"auto"===e&&(e=t.offsetHeight),parseFloat(e)}}),t.exports=r},function(t,e,n){var r=n(64);t.exports=r},function(t,e){"use strict";function n(t){return t instanceof Date?t:new Date(t)}function r(t,e,n){var r=new Date(n);switch(isNaN(r)&&(r=new Date),e=parseInt(e,10),t){case"s":r=new Date(r.getTime()+1e3*e);break;case"n":r=new Date(r.getTime()+6e4*e);break;case"h":r=new Date(r.getTime()+36e5*e);break;case"d":r=new Date(r.getTime()+864e5*e);break;case"w":r=new Date(r.getTime()+6048e5*e);break;case"m":r=new Date(r.getFullYear(),r.getMonth()+e,r.getDate(),r.getHours(),r.getMinutes(),r.getSeconds());break;case"y":r=new Date(r.getFullYear()+e,r.getMonth(),r.getDate(),r.getHours(),r.getMinutes(),r.getSeconds())}return r}var i=/^(?:(?!0000)[0-9]{4}([-\/.]+)(?:(?:0?[1-9]|1[0-2])\1(?:0?[1-9]|1[0-9]|2[0-8])|(?:0?[13-9]|1[0-2])\1(?:29|30)|(?:0?[13578]|1[02])\1(?:31))|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)([-\/.]?)0?2\2(?:29))(\s+([01]|([01][0-9]|2[0-3])):([0-9]|[0-5][0-9]):([0-9]|[0-5][0-9]))?$/,a=function(){var t=/w{1}|d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,e=/\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,n=/[^-+\dA-Z]/g,r=function(t,e){for(t=String(t),e=e||2;t.length<e;)t="0"+t;return t},i={"default":"ddd mmm dd yyyy HH:MM:ss",shortDate:"m/d/yy",longDate:"mmmm d, yyyy",fullDate:"dddd, mmmm d, yyyy",shortTime:"h:MM TT",longTime:"h:MM:ss TT Z",isoDate:"yyyy-mm-dd",isoTime:"HH:MM:ss",isoDateTime:"yyyy-mm-dd'T'HH:MM:ss",isoUTCDateTime:"UTC:yyyy-mm-dd'T'HH:MM:ss'Z'",localShortDate:"yy\u5e74mm\u6708dd\u65e5",localShortDateTime:"yy\u5e74mm\u6708dd\u65e5 hh:MM:ss TT",localLongDate:"yyyy\u5e74mm\u6708dd\u65e5",localLongDateTime:"yyyy\u5e74mm\u6708dd\u65e5 hh:MM:ss TT",localFullDate:"yyyy\u5e74mm\u6708dd\u65e5 w",localFullDateTime:"yyyy\u5e74mm\u6708dd\u65e5 w hh:MM:ss TT"},a={dayNames:["Sun","Mon","Tue","Wed","Thu","Fri","Sat","Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","\u661f\u671f\u65e5","\u661f\u671f\u4e00","\u661f\u671f\u4e8c","\u661f\u671f\u4e09","\u661f\u671f\u56db","\u661f\u671f\u4e94","\u661f\u671f\u516d"],monthNames:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec","January","February","March","April","May","June","July","August","September","October","November","December"]};return function(s,o,c){if(1!==arguments.length||"[object String]"!==Object.prototype.toString.call(s)||/\d/.test(s)||(o=s,s=void 0),s=s?new Date(s):new Date,isNaN(s))throw SyntaxError("invalid date");o=String(i[o]||o||i["default"]),"UTC:"===o.slice(0,4)&&(o=o.slice(4),c=!0);var u=c?"getUTC":"get",l=s[u+"Date"](),f=s[u+"Day"](),h=s[u+"Month"](),g=s[u+"FullYear"](),p=s[u+"Hours"](),v=s[u+"Minutes"](),d=s[u+"Seconds"](),m=s[u+"Milliseconds"](),x=c?0:s.getTimezoneOffset(),y={d:l,dd:r(l,void 0),ddd:a.dayNames[f],dddd:a.dayNames[f+7],w:a.dayNames[f+14],m:h+1,mm:r(h+1,void 0),mmm:a.monthNames[h],mmmm:a.monthNames[h+12],yy:String(g).slice(2),yyyy:g,h:p%12||12,hh:r(p%12||12,void 0),H:p,HH:r(p,void 0),M:v,MM:r(v,void 0),s:d,ss:r(d,void 0),l:r(m,3),L:r(m>99?Math.round(m/10):m,void 0),t:p<12?"a":"p",tt:p<12?"am":"pm",T:p<12?"A":"P",TT:p<12?"AM":"PM",Z:c?"UTC":(String(s).match(e)||[""]).pop().replace(n,""),o:(x>0?"-":"+")+r(100*Math.floor(Math.abs(x)/60)+Math.abs(x)%60,4),S:["th","st","nd","rd"][l%10>3?0:(l%100-l%10!==10)*l%10]};return o.replace(t,function(t){return t in y?y[t]:t.slice(1,t.length-1)})}}(),s={add:function(t,e,n){return r(t,e,n)},addHour:function(t,e){return r("h",t,e)},addMinute:function(t,e){return r("n",t,e)},addSecond:function(t,e){return r("s",t,e)},addDay:function(t,e){return r("d",t,e)},addWeek:function(t,e){return r("w",t,e)},addMonths:function(t,e){return r("m",t,e)},addYear:function(t,e){return r("y",t,e)},isDateEquals:function(t,e){return t.getFullYear()===e.getFullYear()&&t.getMonth()===e.getMonth()&&t.getDate()===e.getDate()},isEquals:function(t,e){return t===e||!(!t||!e)&&(!(!t.getTime||!e.getTime)&&t.getTime()===e.getTime())},isDateString:function(t){return i.test(t)},format:function(t,e,n){return a(t,e,n)},parse:function(t){return"string"==typeof t&&(t=t.replace(/-/g,"/")),n(t)},today:function(){var t=new Date;return new Date(t.getFullYear(),t.getMonth(),t.getDate())},getDate:function(t){return new Date(t.getFullYear(),t.getMonth(),t.getDate())}};t.exports=s},function(t,e,n){var r=n(1),i=n(66),a=n(22);r.mix(a,{values:function(t,e){var n=[],r={},a=t.colArray(e);a=i.formatArray(a);for(var s=0,o=a.length;s<o;s++){var c=a[s];r[c]||void 0===c||(r[c]=!0,n.push(c))}return n},group:function(t,e){if(!e)return[t];var n=a.groupToMap(t,e),r=[];for(var i in n)n.hasOwnProperty(i)&&r.push(n[i]);return r},groupToMap:function(t,e){var n=t.colNames(),i={};if(!e)return{0:t};if(!r.isFunction(e)){var s=r.isArray(e)?e:e.replace(/\s+/g,"").split("*");e=function(t){for(var e="",n=0,r=s.length;n<r;n++)e+=t[s[n]].toString();return e}}t.each(function(t){var n=e(t);i[n]?i[n].push(t):i[n]=[t]});for(var o in i)i.hasOwnProperty(o)&&(i[o]=new a(i[o],{names:n.slice(0)}));return i},merge:function(){for(var t=r.toArray(arguments),e=t[0],n=e.colNames(),i=e.colCount(),s=[],o=0;o<i;o++){s[o]=[];for(var c=0;c<t.length;c++){var u=t[c].colArray(o);s[o]=s[o].concat(u)}}return new a(s,{names:n})},sort:function(t,e){var n=t.toJSON();return n.sort(function(t,n){return t[e]-n[e]}),new a(n,{names:t.colNames()})}}),t.exports=a},function(t,e,n){var r=n(1);t.exports={filterNull:function(t){var e=[];return r.each(t,function(t){r.isNull(t)||e.push(t)}),e},mixIf:function(t,e,n){r.each(n,function(n){t[n]=e[n]})},formatArray:function(t){var e=[];return r.each(t,function(t){r.isArray(t)?e=e.concat(t):e.push(t)}),e}}},function(t,e,n){"use strict";function r(t){if(!t._attrs&&t!==i){var e=t.superclass.constructor;e&&!e._attrs&&r(e),t._attrs={},a.mix(!0,t._attrs,e._attrs),a.mix(!0,t._attrs,t.ATTRS)}}var i,a=n(1);i=function(t){r(this.constructor),this._attrs={},this.events={};var e=this.getDefaultCfg();a.mix(this._attrs,e,t)},a.augment(i,{getDefaultCfg:function(){var t=this,e=t.constructor,n=e._attrs,r=a.mix(!0,{},n);return r},set:function(t,e){var n="_onRender"+a.ucfirst(t);return this[n]&&this[n](e,this._attrs[t]),this._attrs[t]=e,this},get:function(t){return this._attrs[t]},on:function(t,e){var n=this,r=n.events,i=r[t];return i||(i=r[t]=[]),i.push(e),n},fire:function(t,e){var n=this,r=n.events,i=r[t];i&&a.each(i,function(t){t(e)})},off:function(t,e){var n=this,r=n.events,i=r[t];return t?(i&&a.remove(i,e),n):(n.events={},n)},destroy:function(){var t=this,e=t.destroyed;return e?t:(t._attrs={},t.events={},void(t.destroyed=!0))}}),t.exports=i},function(t,e,n){var r=n(2);r.Geom.Polygon=n(69),n(70),r.Chart.registGeom("polygon"),t.exports=r},function(t,e,n){"use strict";function r(t){r.superclass.constructor.call(this,t)}var i=n(1),a=n(2),s=a.Geom;r.ATTRS={coreType:"Polygon"},i.extend(r,s),t.exports=r},function(t,e,n){"use strict";var r=n(1),i=n(2),a=i.Shape,s=i.G,o=a.registGeom("polygon",{defaultShapeType:"polygon"});a.registShape("polygon","polygon",{getShapePoints:function(t){var e=[];return r.each(t.x,function(n,r){var i=t.y[r];e.push({x:n,y:i})}),e},drawShape:function(t,e){var n=this.parsePoints(t.points),i=r.mix({fillStyle:t.color,z:!0},t.style);s.drawLines(n,e,i)}}),t.exports=o},function(t,e,n){var r=n(72);t.exports=r},function(t,e){"use strict";function n(t,e,r){r=r||0;for(var i in e)if(e.hasOwnProperty(i)){var o=e[i];null!==o&&s.isObject(o)?(s.isObject(t[i])||(t[i]={}),r<a?n(t[i],e[i],r+1):t[i]=e[i]):s.isArray(o)?(t[i]=[],t[i]=t[i].concat(o)):void 0!==o&&(t[i]=e[i])}}var r=Object.prototype,i=r.toString,a=5,s={substitute:function(t,e){return t&&e?t.replace(/\\?\{([^{}]+)\}/g,function(t,n){return"\\"===t.charAt(0)?t.slice(1):void 0===e[n]?"":e[n]}):t},ucfirst:function(t){return t+="",t.charAt(0).toUpperCase()+t.substring(1)},isString:function(t){return"string"==typeof t},isNumber:function(t){return"number"==typeof t},isNumeric:function(t){return!isNaN(parseFloat(t))&&isFinite(t)},isBoolean:function(t){return"boolean"==typeof t},isFunction:function(t){return"function"==typeof t},isArray:"isArray"in Array?Array.isArray:function(t){return"[object Array]"===i.call(t)},isDate:function(t){return"[object Date]"===i.call(t)},isNull:function(t){return void 0===t||null===t},notNull:function(t){return!s.isNull(t)},isBlank:function(t){if(s.isArray(t))return 0===t.length;if(s.isObject(t)){var e=0;return s.each(t,function(t,n){e++}),0===e}return!1},isObject:"[object Object]"===i.call(null)?function(t){return null!==t&&void 0!==t&&"[object Object]"===i.call(t)&&void 0===t.ownerDocument}:function(t){return"[object Object]"===i.call(t)},extend:function(t,e,n,r){s.isFunction(e)||(n=e,e=t,t=function(){});var i=Object.create?function(t,e){return Object.create(t,{constructor:{value:e}})}:function(t,e){function n(){}n.prototype=t;var r=new n;return r.constructor=e,r},a=i(e.prototype,t);return t.prototype=s.mix(a,t.prototype),t.superclass=i(e.prototype,e),s.mix(a,n),s.mix(t,r),t},augment:function(t){for(var e=s.toArray(arguments),n=1;n<e.length;n++){var r=e[n];s.isFunction(r)&&(r=r.prototype),s.mix(t.prototype,r)}},toArray:function(t){return t&&t.length?Array.prototype.slice.call(t):[]},mix:function(){var t=s.toArray(arguments),e=t[0];if(e===!0){e=t[1];for(var r=2;r<t.length;r++){var i=t[r];n(e,i)}}else for(var r=1;r<t.length;r++){var i=t[r];for(var a in i)i.hasOwnProperty(a)&&"constructor"!==a&&(e[a]=i[a])}return e},each:function(t,e){if(t)if(s.isObject(t)){for(var n in t)if(t.hasOwnProperty(n)){var r=e(t[n],n);if(r===!1)break}}else if(t.length)for(var i=0;i<t.length;i++){var r=e(t[i],i);if(r===!1)break}},requestAnimationFrame:function(t){var e=window.requestAnimationFrame||window.webkitRequestAnimationFrame||function(t){return setTimeout(t,16)};return e(t)},cancelAnimationFrame:function(t){var e=window.cancelAnimationFrame||window.webkitCancelAnimationFrame||function(t){return clearTimeout(t)};return e(t)}};t.exports=s},function(t,e,n){"use strict";function r(t,e){var n=[];return e?i.isArray(t[0])&&i.each(t[0],function(e,r){for(var i=e,a=1;a<t.length;a++)i+=t[a][r];n.push(i)}):i.each(t,function(t){i.isArray(t)?n=n.concat(t):n.push(t)}),n}var i=n(1),a=6,s=function(t){var e={},n=[],i=t.maxCount||a,s=r(t.data);if(s.length<i)n=[].concat(s);else{var o=s.length,c=parseInt(o/(i-1),10),u=s.map(function(t,e){return e%c===0?s.slice(e,e+c):null}).filter(function(t){return t});n.push(s[0]);for(var l=1;l<u.length&&l<i-1;l++)n.push(u[l][0]);n.push(s[o-1])}return e.categories=s,e.ticks=n,e};t.exports=s},function(t,e,n){"use strict";var r=n(1),i=4,a=6,s=[0,1,2,2.5,3,4,5,7.5,10],o=r.isNull,c=n(23),u=function(t){var e,n=t.min,u=t.max,l=t.interval,f=[],h=t.minCount||i,g=t.maxCount||a,p=(h+g)/2;if(o(l)&&(u===n&&(u=t.min+1,l=1),o(l))){var v=(u-n)/p;l=c.snapFactorTo(v,s,"ceil"),e=parseInt((u-n)/l,10),e>g&&(e=g),e<h&&(e=h),l=c.snapFactorTo((u-n)/e,s,"ceil")}u=c.snapMultiple(u,l,!0),n=c.snapMultiple(n,l,!1),e=Math.round((u-n)/l),n=r.fixedBase(n,l),f.push(n);for(var d=1;d<=e;d++)f.push(r.fixedBase(l*d+n,l));return{min:n,max:r.fixedBase(u,l),interval:l,count:e,ticks:f}};t.exports=u},function(t,e,n){"use strict";function r(t){return new Date(t).getFullYear()}function i(t){return new Date(t,0,1).getTime()}function a(t){return new Date(t).getMonth()}function s(t,e){var n=r(t),i=r(e),s=a(t),o=a(e);return 12*(i-n)+(o-s)%12}function o(t,e){return new Date(t,e,1).getTime()}function c(t,e){return Math.ceil((e-t)/d)}function u(t,e){return Math.ceil((e-t)/v)}function l(t,e){return Math.ceil((e-t)/6e4)}var f=n(1),h=6,g=[1,2,4,6,8,12],p=6e4,v=36e5,d=864e5,m=n(23),x=function(t){var e,n=t.min,x=t.max,y=t.interval,S=[];if(x===n&&(x=n+d),f.isNull(y)){var w,T,A=x-n,_=d,C=365*_;y=parseInt(A/(t.maxCount||h)),w=y/C;var D=r(n);if(w>.51){T=Math.ceil(w);for(var M=r(x),b=D;b<=M+T;b+=T)S.push(i(b));y=null}else if(w>.0834){for(var T=r(n),P=Math.ceil(w/.0834),k=a(n),I=s(n,x),b=0;b<=I+P;b+=P)S.push(o(D,b+k));y=null}else if(y>.5*_){var O=new Date(n),T=O.getFullYear(),P=O.getMonth(n),N=O.getDate(),F=Math.ceil(y/_),R=c(n,x);y=F*_;for(var b=0;b<R+F;b+=F)S.push(new Date(T,P,N+b).getTime())}else if(y>v){var O=new Date(n),T=O.getFullYear(),P=O.getMonth(n),F=O.getDate(),G=O.getHours(),L=m.snapTo(g,Math.ceil(y/v)),z=u(n,x);y=L*v;for(var b=0;b<=z+L;b+=L)S.push(new Date(T,P,F,G+b).getTime())}else if(y>p){var j=l(n,x),Y=Math.ceil(y/p);y=Y*p;for(var b=0;b<=j+Y;b+=Y)S.push(n+b*p)}else{y<1e3&&(y=1e3),n=1e3*Math.floor(n/1e3);var H=Math.ceil((x-n)/1e3),B=Math.ceil(y/1e3);y=1e3*B;for(var b=0;b<H+B;b+=B)S.push(n+1e3*b)}}if(!S.length){n=1e3*Math.floor(n/1e3),x=1e3*Math.ceil(x/1e3);for(var e=(x-n)/y,b=0;b<=e;b++)S.push(f.fixedBase(y*b+n,y))}return{max:x,min:n,interval:y,ticks:S,count:S.length}};t.exports=x},function(t,e,n){"use strict";function r(t,e){var n=e.toString(),r=n.indexOf(".");if(r===-1)return Math.round(t);var i=n.substr(r+1).length;return parseFloat(t.toFixed(i))}function i(t,e){for(var n in e)e.hasOwnProperty(n)&&"constructor"!==n&&(t[n]=e[n])}var a=n(71);a.mix(a,{mixin:function(t,e){if(t&&e){t._mixins=e,t.ATTRS=t.ATTRS||{};var n={};a.each(e,function(e){a.augment(t,e);var r=e.ATTRS;r&&a.mix(n,r)}),t.ATTRS=a.mix(n,t.ATTRS)}},map:function(t,e){var n=[];return a.each(t,function(t,r){n.push(e(t,r))}),n},filter:function(t,e){var n=[];return a.each(t,function(t,r){e(t,r)&&n.push(t)}),n},guid:function(){var t={};return function(e){return e=e||"g",t[e]?t[e]+=1:t[e]=1,e+t[e]}}(),inArray:function(t,e){return a.indexOf(t,e)!==-1},indexOf:function(t,e){var n=Array.prototype.indexOf;if(n)return n.call(t,e);for(var r=-1,i=0;i<t.length;i++)if(t[i]===e){r=i;break}return r},remove:function(t,e){var n=a.indexOf(t,e);n!==-1&&t.splice(n,1)},empty:function(t){if(!(t instanceof Array))for(var e=t.length-1;e>=0;e--)delete t[e];t.length=0},equalsArray:function(t,e){if(t===e)return!0;if(!t||!e)return!1;if(t.length!==e.length)return!1;for(var n=!0,r=0;r<t.length;r++)if(t[r]!==e[r]){n=!1;break}return n},wrapBehavior:function(t,e){var n=function(n){t[e](n)};return t["_wrap_"+e]=n,n},getWrapBehavior:function(t,e){return t["_wrap_"+e]},fixedBase:function(t,e){return r(t,e)},length:function(t){if(a.isArray(t))return t.length;if(a.isObject(t)){var e=0;return a.each(t,function(){e++}),e}return 0},clone:function(t){if("object"!=typeof t||null===t)return t;var e;if(a.isArray(t)){e=[];for(var n=0,r=t.length;n<r;n++)"object"==typeof t[n]&&null!=t[n]?e[n]=a.clone(t[n]):e[n]=t[n]}else{e={};for(var i in t)"object"==typeof t[i]&&null!=t[i]?e[i]=a.clone(t[i]):e[i]=t[i]}return e},simpleMix:function(t,e,n,r){return e&&i(t,e),n&&i(t,n),r&&i(t,r),t}}),t.exports=a},function(t,e,n){"use strict";var r=n(12),i=n(1),a=function(t){a.superclass.constructor.call(this,t)};i.extend(a,r),i.augment(a,{type:"identity",value:null,getText:function(){return this.value.toString()},scale:function(){return 1},invert:function(){return this.value}}),t.exports=a},function(t,e,n){"use strict";var r=n(12),i=n(1),a=n(15),s=function(t){s.superclass.constructor.call(this,t)};i.extend(s,r),i.augment(s,{type:"linear",isLinear:!0,min:null,max:null,nice:!0,tickCount:5,tickInterval:null,init:function(){var t=this;if(t.ticks){var e=t.ticks,n=t.translate(e[0]),r=t.translate(e[e.length-1]);(i.isNull(t.min)||t.min>n)&&(t.min=n),(i.isNull(t.max)||t.max<r)&&(t.max=r)}else t.min=t.translate(t.min),t.max=t.translate(t.max),t.initTicks()},calculateTicks:function(){var t=this,e=t.min,n=t.max,r=t.tickCount,i=t.tickInterval,s=a.number({min:e,max:n,minCount:r,maxCount:r,interval:i});return s.ticks},initTicks:function(){var t=this,e=t.calculateTicks();if(t.nice)t.ticks=e,t.min=e[0],t.max=e[e.length-1];else{var n=[];i.each(e,function(e){e>=t.min&&e<=t.max&&n.push(e)}),t.ticks=n}},scale:function(t){if(null===t||void 0===t)return NaN;var e=this.max,n=this.min;if(e===n)return 0;var r=(t-n)/(e-n),i=this.rangeMin(),a=this.rangeMax();return i+r*(a-i)},invert:function(t){var e=(t-this.rangeMin())/(this.rangeMax()-this.rangeMin());return this.min+e*(this.max-this.min)}}),t.exports=s},function(t,e,n){"use strict";var r=n(25),i=n(1),a=n(63),s=n(15),o=function(t){o.superclass.constructor.call(this,t)};i.extend(o,r),i.augment(o,{type:"timeCat",mask:"yyyy-mm-dd HH:MM:ss",tickCount:5,init:function(){var t=this,e=this.values;e.sort(function(e,n){return e=t._toTimeStamp(e),n=t._toTimeStamp(n),e-n}),i.each(e,function(n,r){e[r]=t._toTimeStamp(n)}),this.ticks=this.calculateTicks(!0)},calculateTicks:function(t){var e=this,n=e.tickCount,r=s.category({maxCount:n,data:e.values}),o=r.ticks;return t&&i.each(o,function(t,n){o[n]=a.format(t,e.mask)}),o},translate:function(t){t=this._toTimeStamp(t);var e=this.values.indexOf(t);return e===-1&&(e=i.isNumber(t)&&t<this.values.length?t:NaN),e},scale:function(t){var e,n=this.rangeMin(),r=this.rangeMax(),i=this.translate(t);return e=this.values.length>1&&i>-1?i/(this.values.length-1):0,n+e*(r-n)},getText:function(t){var e="",n=this.translate(t);n>-1&&(e=this.values[n]);var r=this.formatter;return e=parseInt(e,10),e=r?r(e):a.format(e,this.mask)},getTicks:function(){var t=this,e=this.calculateTicks(!1),n=[];return i.each(e,function(e){var r;r=i.isObject(e)?e:{text:t.getText(e),value:t.scale(e)},n.push(r)}),n},_toTimeStamp:function(t){return i.isString(t)&&(t=t.replace(/-/gi,"/").replace("T"," ").replace("Z",""),t=new Date(t).getTime()),i.isDate(t)&&(t=t.getTime()),t}}),t.exports=o},function(t,e,n){var r=n(2);r.Geom.Schema=n(81),n(82),r.Chart.registGeom("schema"),t.exports=r},function(t,e,n){"use strict";function r(t){r.superclass.constructor.call(this,t)}var i=n(1),a=n(2),s=a.Geom;r.ATTRS={coreType:"Schema"},i.extend(r,s),i.mixin(r,[s.WidthMixin]),t.exports=r},function(t,e,n){"use strict";var r=n(2),i=r.Shape,a=i.registGeom("schema",{});t.exports=a},function(t,e,n){"use strict";var r=n(11),i=n(1),a=function(t){a.superclass.constructor.call(this,t)};i.extend(a,r),i.augment(a,{type:"color",names:["color"],arr:null}),r.Color=a,r.Position=n(85),r.Size=n(87),r.Shape=n(86),r.Opacity=n(84),t.exports=r},function(t,e,n){"use strict";var r=n(1),i=n(11),a=function(t){a.superclass.constructor.call(this,t)};r.extend(a,i),r.augment(a,{type:"opacity",names:["opacity"],min:.1,max:1,arr:null}),t.exports=a},function(t,e,n){"use strict";var r=n(1),i=n(11),a=function(t){a.superclass.constructor.call(this,t)};r.extend(a,i),r.augment(a,{type:"position",names:["x","y","z"],coord:null,parseParam:function(t,e){var n;return r.isArray(t)?(n=[],r.each(t,function(t){n.push(e.scale(t))})):n=e.scale(t),n},callback:function(t,e){var n,i,a,s=this.coord;if(t||0===t||(t=.1),e||0===e||(e=.1),r.isArray(e)&&r.isArray(t)){n=[],i=[];for(var o=0,c=0;o<t.length&&c<e.length;o++,c++)a=s.convertPoint({x:t[o],y:e[c]}),n.push(a.x),i.push(a.y)}else if(r.isArray(e))i=[],r.each(e,function(e){a=s.convertPoint({x:t,y:e}),n&&n!==a.x?(r.isArray(n)||(n=[n]),n.push(a.x)):n=a.x,i.push(a.y)});else if(r.isArray(t))n=[],r.each(t,function(t){a=s.convertPoint({x:t,y:e}),i&&i!==a.y?(r.isArray(i)||(i=[i]),i.push(a.y)):i=a.y,n.push(a.x)});else{var u=s.convertPoint({x:t,y:e});n=u.x,i=u.y}return[n,i]}}),t.exports=a},function(t,e,n){"use strict";var r=n(1),i=n(11),a=function(t){a.superclass.constructor.call(this,t)};r.extend(a,i),r.augment(a,{type:"shape",names:["shape"],arr:null}),t.exports=a},function(t,e,n){"use strict";var r=n(1),i=n(11),a=function(t){a.superclass.constructor.call(this,t)};r.extend(a,i),r.augment(a,{type:"size",names:["size"],arr:null}),t.exports=a},function(t,e,n){var r=n(2);r.Geom.Area=n(26),r.Geom.AreaStack=n(89),n(90),r.Chart.registGeom("area"),r.Chart.registGeom("areaStack"),t.exports=r},function(t,e,n){"use strict";function r(t){r.superclass.constructor.call(this,t)}var i=n(1),a=n(26),s=n(2),o=s.Geom.StackMixin;i.extend(r,a),i.mixin(r,[o]),t.exports=r},function(t,e,n){"use strict";function r(t,e){return Math.abs(t-e)<1e-5}function i(t,e){var n=!0;return s.each(t,function(t){if(!r(t.x,e.x)||!r(t.y,e.y))return n=!1,!1}),n}function a(t,e){var n=this,r=t.points,a=[],o=[];s.each(r,function(t){o.push(t[0]),a.push(t[1])});var c=s.mix({fillStyle:t.color},t.style),l=u.before(e,c);o.reverse(),a=n.parsePoints(a),o=n.parsePoints(o),t.isInCircle?(i(o,t.center)&&(o=[]),n.drawCircleArea(a,o,l)):n.drawRectShape(a,o,l),u.after(l,c)}var s=n(1),o=n(2),c=o.Shape,u=o.G,l=c.registGeom("area",{defaultShapeType:"area"});c.registShape("area","area",{getShapePoints:function(t){var e=t.x,n=t.y,r=t.y0;n=s.isArray(n)?n:[r,n];var i=[];return i.push({x:e,y:n[0]},{x:e,y:n[1]}),i},drawShape:function(t,e){a.call(this,t,e)},drawCircleArea:function(t,e,n){u.lines(t,n),n.lineTo(t[0].x,t[0].y),n.closePath(),e.length&&(u.lines(e,n),n.closePath())},drawRectShape:function(t,e,n){t=t.concat(e),u.lines(t,n),n.closePath()}}),c.registShape("area","smooth",{drawShape:function(t,e){a.call(this,t,e)},drawCircleArea:function(t,e,n){u.smooth(t,n),n.closePath(),e.length&&(u.smooth(e,n),n.closePath())},drawRectShape:function(t,e,n){u.smooth(t,n),n.lineTo(e[0].x,e[0].y),u.smooth(e,n,!1),n.closePath()}}),t.exports=l},function(t,e,n){var r=n(2);n(92),t.exports=r},function(t,e,n){function r(t){var e=t.sort(function(t,e){return t<e?1:-1}),n=e.length;if(n<4)for(var r=e[n-1],i=0;i<4-n;i++)e.push(r);return e}function i(t,e,n){var i=r(e),a=[{x:t,y:i[0]},{x:t,y:i[1]},{x:t-n/2,y:i[2]},{x:t-n/2,y:i[1]},{x:t+n/2,y:i[1]},{x:t+n/2,y:i[2]},{x:t,y:i[2]},{x:t,y:i[3]}];return a}var a=n(2),s=n(1),o=a.Shape,c=a.G;n(80);var u=o.registShape("schema","candle",{getShapePoints:function(t){var e=i(t.x,t.y,t.size);return e},drawShape:function(t,e){var n=this.parsePoints(t.points),r=s.mix({strokeStyle:t.color,fillStyle:t.color},t.style),i=c.before(e,r);i.moveTo(n[0].x,n[0].y),i.lineTo(n[1].x,n[1].y),i.moveTo(n[2].x,n[2].y);for(var a=3;a<6;a++)i.lineTo(n[a].x,n[a].y);i.closePath(),i.moveTo(n[6].x,n[6].y),i.lineTo(n[7].x,n[7].y),c.after(i,r)}});t.exports=u},function(t,e,n){"use strict";function r(t){var e=t.slice(0);if(e.length>0){var n=e[0],r=e[e.length-1];0!==n.value&&e.unshift({value:0}),1!==r.value&&e.push({value:1})}return e}var i=n(1),a=n(94),s=n(3),o=function(t){this.axisCfg={},i.mix(this,t)};i.augment(o,{axisCfg:{},canvas:null,_isHide:function(t){var e=this.axisCfg;return!e||e[t]===!1},_getLinePosition:function(t,e){var n="";return"x"===t&&(n="bottom"),"y"===t&&(n=e?"right":"left"),n},_getLineCfg:function(t,e,n){var r,i,a=1;return"x"===e?(r={x:0,y:0},i={x:1,y:0}):n?(r={x:1,y:0},i={x:1,y:1}):(r={x:0,y:0},i={x:0,y:1},a=-1),t.isTransposed&&(a*=-1),{offsetFactor:a,start:t.convertPoint(r),end:t.convertPoint(i)}},_getCircleCfg:function(t){return{startAngle:t.get("startAngle"),endAngle:t.get("endAngle"),center:t.get("center"),radius:t.get("radius")}},_getRadiusCfg:function(t){var e,n,r=t.isTransposed;return r?(e={x:0,y:0},n={x:1,y:0}):(e={x:0,y:0},n={x:0,y:1}),{offsetFactor:-1,start:t.convertPoint(e),end:t.convertPoint(n)}},_getAxisCfg:function(t,e,n,a,s){var o=this.axisCfg,c=e.getTicks(),u=i.mix(!0,{ticks:c,canvas:this.canvas},s,o[e.dim]);if(u.grid&&n){var l=[],f=r(n.getTicks());i.each(c,function(e){var n=[];i.each(f,function(r){var i="x"===a?e.value:r.value,s="x"===a?r.value:e.value,o=t.convertPoint({
	x:i,y:s});n.push(o)}),l.push(n)}),u.gridPoints=l}return u},_createAxis:function(t,e,n,r,o){var c,u,l,f=this,h=t.get("type"),g=t.isTransposed;if("cartesian"===h){c=a.Line;var p=f._getLinePosition(r,o);u=s.axis[p],l=f._getLineCfg(t,r,o)}else"x"===r&&!g||"y"===r&&g?(c=a.Circle,u=s.axis.circle,l=f._getCircleCfg(t)):(c=a.Line,u=s.axis.radius,l=f._getRadiusCfg(t));var v=f._getAxisCfg(t,e,n,r,u);v=i.mix(!0,{},v,l);var d=new c(v);return d.drawGrid(),d},createAxis:function(t,e,n){var r=this,a=[];if(e&&!r._isHide(e.dim)){var s=r._createAxis(t,e,n[0],"x");a.push(s)}i.each(n,function(n,i){if(!r._isHide(n.dim)){var s=r._createAxis(t,n,e,"y",i);a.push(s)}}),i.each(a,function(t){t.draw()})}}),t.exports=o},function(t,e,n){"use strict";t.exports={Line:n(96),Circle:n(95)}},function(t,e,n){"use strict";function r(t){r.superclass.constructor.call(this,t)}var i=n(1),a=n(28),s=n(7),o=n(8);r.ATTRS={startAngle:-Math.PI/2,endAngle:3*Math.PI/2,radius:null,center:null},i.extend(r,a),i.augment(r,{getOffsetPoint:function(t){var e=this,n=e.get("startAngle"),r=e.get("endAngle"),i=n+(r-n)*t;return e._getCirclePoint(i)},_getCirclePoint:function(t,e){var n=this,r=n.get("center");return e=e||n.get("radius"),{x:r.x+Math.cos(t)*e,y:r.y+Math.sin(t)*e}},getTextAlignInfo:function(t,e){var n,r=this,i=r.getOffsetVector(t,e),a="middle";return i.x>0?n="left":i.x<0?n="right":(n="center",i.y>0?a="top":i.y<0&&(a="bottom")),{textAlign:n,textBaseline:a}},getAxisVector:function(t){var e=this,n=e.get("center"),r=e.get("offsetFactor");return new o((t.y-n.y)*r,(t.x-n.x)*-1*r)},drawLine:function(t){var e=this,n=e.get("center"),r=e.get("radius"),i=e.get("canvas"),a=e.get("startAngle"),o=e.get("endAngle");s.drawArc(n,r,a,o,i,t)}}),t.exports=r},function(t,e,n){"use strict";function r(t){r.superclass.constructor.call(this,t)}var i=n(1),a=n(28),s=n(7),o=n(8);r.ATTRS={start:null,end:null},i.extend(r,a),i.augment(r,{getOffsetPoint:function(t){var e=this,n=e.get("start"),r=e.get("end"),i=r.x-n.x,a=r.y-n.y;return{x:n.x+i*t,y:n.y+a*t}},getAxisVector:function(){var t=this,e=t.get("start"),n=t.get("end");return new o(n.x-e.x,n.y-e.y)},drawLine:function(t){var e=this,n=e.get("canvas"),r=e.get("start"),i=e.get("end");s.drawLine(r,i,n,t)}}),t.exports=r},function(t,e,n){"use strict";function r(t){r.superclass.constructor.call(this,t),this.__init()}function i(t){return function(){var e=this,n=new f({chart:e,type:t,coord:e.get("coord")});return e.__addLayer(n),n}}var a=n(6),s=n(38),o=n(1),c=n(5),u=n(30),l=n(16),f=n(105),h=n(107),g=n(93),p=n(37),v=n(3),d=n(98),m=n(27);r.ATTRS={id:null,margin:null,data:null,scales:{},coordCfg:{type:"cartesian"},layers:null,geoms:null,colDefs:null},o.extend(r,a),o.augment(r,{source:function(t,e){var n=this;return e&&n.set("colDefs",e),n.__initData(t),n},axis:function(t,e){var n=this,r=n.get("axisAssist");return t?(r.axisCfg=r.axisCfg||{},r.axisCfg[t]=e):r.axisCfg=null,n},createScale:function(t,e){var n=this;e=e||n.get("data");var r=n.get("scales");return r[t]||(r[t]=n._createScale(t,e)),r[t]},_createScale:function(t,e){var n=this,r=n.get("coord"),i=r.isPolar,a=n.get("scaleAssist");return a.createScale(t,e,i)},coord:function(t,e){var n,r=this;return e?(n=e,n.type=t):n=o.isString(t)?{type:t}:t,r.set("coordCfg",n),r.__initCoord(),r},getPosition:function(t){var e=this,n=e.get("coord"),r=e._getXScale(),i=e._getYScales()[0],a=r.dim,s=r.scale(t[a]),o=i.dim,c=i.scale(t[o]);return n.convertPoint({x:s,y:c})},getRecord:function(t){var e=this,n=e.get("coord"),r=e._getXScale(),i=e._getYScales()[0],a=n.invertPoint(t),s={};return s[r.dim]=r.invert(a.x),s[i.dim]=i.invert(a.y),s},getSnapRecords:function(t,e){var n=this.get("geoms")[0],r=n.getSnapRecords(t,e);return r},__init:function(){var t=this;t.__initCanvas(),t.set("layers",[]),t.set("geoms",[]),t.set("scaleAssist",new h),t.set("axisAssist",new g({canvas:t.get("canvas")})),t.set("guideAssist",new p),t.set("animateAssist",new m),t.__initData(t.get("data"))},__initData:function(t){t&&(t instanceof c||(t=new c(t)),this.set("data",t));var e=this.get("colDefs");if(e){var n=this.get("scaleAssist");n.defs=e}},_getRatio:function(){return v.pixelRatio},__initCanvas:function(){var t,e=this,n=e.get("id"),r=e.get("el");t=r?r:document.getElementById(n);var i=d.getWidth(t),a=d.getHeight(t),s=e._getRatio();if(s){t.width=i*s,t.height=a*s;var o=t.getContext("2d");o.scale(s,s)}e.set("width",i),e.set("height",a),e.set("canvas",t),e.__initLayout()},__initLayout:function(){var t=this,e=t.get("margin");o.isNull(e)&&(e=v.margin,t.set("margin",e));var n,r,i,a,s=t.get("width"),c=t.get("height");o.isNumber(e)?(n=a=e,r=i=e):o.isArray(e)&&(n=e[0],i=o.isNull(e[1])?e[0]:e[1],a=o.isNull(e[2])?e[0]:e[2],r=o.isNull(e[3])?i:e[3]),a=c-a,i=s-i;var u={plot:{start:{x:r,y:n},end:{x:i,y:a}},lAxis:{start:{x:0,y:n},end:{x:r,y:c}},rAxis:{start:{x:i,y:n},end:{x:s,y:c}},bAxis:{start:{x:r,y:a},end:{x:i,y:c}}};t.set("layout",u),t.__initPlot()},__initPlot:function(){var t=this,e=t.get("layout"),n=new s({start:e.plot.start,end:e.plot.end});t.set("plot",n),t.__initCoord()},__initCoord:function(){var t=this,e=t.get("plot"),n=o.mix({},t.get("coordCfg"),{plot:e}),r=n.type,i=u[o.ucfirst(r)]||u.Cartesian,a=new i(n);t.set("coord",a)},__addLayer:function(t){var e=this;e.get("layers").push(t)},clear:function(){var t=this.get("canvas").parentNode;return this.get("guideAssist").clear(t),this.set("layers",[]),this.set("geoms",[]),this.set("scales",{}),this._clearCanvas(),this},_clearCanvas:function(){var t=this.get("canvas"),e=t.getContext("2d");return e.clearRect(0,0,t.width,t.height),this},_isDataChange:function(){var t=this,e=!1,n=t.get("geoms");return o.each(n,function(t){if(t.get("isAdjust"))return e=!0,!1}),e},_trainScale:function(t){var e,n=this,r=n._getYScales();t.length>0&&(e=c.merge.apply(null,t)),o.each(r,function(t){if(t.isLinear){var r=n._createScale(t.dim,e);t.change({min:r.min,max:r.max})}})},_renderBackGuide:function(){var t=this,e=t.get("canvas"),n=t.get("guideAssist");if(n.guides.length){var r=t.get("coord"),i=t._getXScale(),a=t._getYScales()[0];n.setScale(i,a),n.paintBack(r,e)}},_renderFrontGuide:function(){var t=this,e=t.get("canvas"),n=t.get("guideAssist");if(n.guides.length){var r=t.get("coord"),i=t._getXScale(),a=t._getYScales()[0];n.setScale(i,a),n.paintFront(r,e)}},_renderAnimate:function(t){var e=this,n=e.get("imageData"),r=e.get("bgImageData"),i=e.get("animateAssist"),a=e.get("canvas"),s=e.get("coord"),o=s.get("center"),c=s.get("radius"),u=e.get("geoms")[0],l=u.get("core"),f=l.getYScale(),h=l.getYMinValue(),g=s.convertPoint({x:0,y:f.scale(h)});i.animate&&(i.setImageData(n,r),i.setStartPoint(g),i.setPolar(o,c),i.setCallBack(t),i.paint(a))},render:function(){var t,e,n,r=this,i=r.get("layers"),a=r.get("geoms"),s=r.get("data"),c=r.get("animateAssist"),u=[];for(n=0;n<i.length;n++)t=i[n],e=t.createGeom(),e.initData(s),u=u.concat(e.get("frames")),a.push(e);return r._isDataChange()&&r._trainScale(u),r.beforeDrawGeom(),c.animate?o.requestAnimationFrame(function(){r.set("bgImageData",r.getImageData()),r._clearCanvas(),r.drawGeom(a),r.set("imageData",r.getImageData()),r._clearCanvas(),r._renderAnimate(r._renderFrontGuide.bind(r))}):(r.drawGeom(a),r._renderFrontGuide()),r},drawGeom:function(t,e){for(var n=0;n<t.length;n++)e?t[n].draw(e):t[n].draw()},beforeDrawGeom:function(){var t=this;t._renderAxis(),t._renderBackGuide()},getImageData:function(){var t=this,e=t.get("canvas"),n=e.getContext("2d"),r=t.get("width"),i=t.get("height"),a=t._getRatio();return n.getImageData(0,0,r*a,i*a)},_getXScale:function(){var t=this,e=t.get("geoms"),n=e[0].getXScale();return n},_getYScales:function(){var t=this,e=t.get("geoms"),n=[];return o.each(e,function(t){var e=t.getYScale();o.indexOf(n,e)===-1&&n.push(e)}),n},_renderAxis:function(){var t=this,e=t.get("axisAssist"),n=t._getXScale(),r=t._getYScales(),i=t.get("coord");e.createAxis(i,n,r)},guide:function(){return this.get("guideAssist")},animate:function(){return this.get("animateAssist")}});for(var x in l)l.hasOwnProperty(x)&&o.isFunction(l[x])&&(x=x[0].toLowerCase()+x.substr(1),r.prototype[x]=i(x));r.registGeom=function(t){t=t[0].toLowerCase()+t.substr(1),r.prototype[t]=i(t)},t.exports=r},function(t,e){"use strict";var n={getStyle:function(t,e){return"undefined"!=typeof window&&window.getComputedStyle?window.getComputedStyle(t,null)[e]:t.currentStyle[e]},getWidth:function(t){var e=n.getStyle(t,"width");return"auto"===e&&(e=t.offsetWidth),parseFloat(e)},getHeight:function(t){var e=n.getStyle(t,"height");return"auto"===e&&(e=t.offsetHeight),parseFloat(e)}};t.exports=n},function(t,e,n){"use strict";function r(t){r.superclass.constructor.call(this,t)}var i=n(1),a=n(32),s=n(33);i.extend(r,a),i.mixin(r,[s]),t.exports=r},function(t,e,n){"use strict";function r(t){r.superclass.constructor.call(this,t)}var i=n(1),a=n(13);r.ATTRS={coreType:"Line"},i.extend(r,a),t.exports=r},function(t,e,n){"use strict";function r(t){r.superclass.constructor.call(this,t)}var i=n(1),a=n(13);i.extend(r,a),r.ATTRS={coreType:"Point"},t.exports=r},function(t,e,n){"use strict";function r(t){var e=t.x,n=t.y,r=t.y0,a=t.size,s=r,o=n;i.isArray(n)&&(o=n[1],s=n[0]);var c,u;i.isArray(e)?(c=e[0],u=e[1]):(c=e-a/2,u=e+a/2);var l=[];return l.push({x:c,y:s},{x:c,y:o},{x:u,y:o},{x:u,y:s}),l}var i=n(1),a=n(14),s=n(7),o=a.registGeom("interval",{defaultShapeType:"rect"});a.registShape("interval","rect",{getShapePoints:function(t){return r(t)},drawShape:function(t,e){var n=this.parsePoints(t.points),r=i.mix({fillStyle:t.color,z:!0},t.style);if(t.isInCircle){var a=n.slice(0);this._coord.isTransposed&&(a=[n[0],n[3],n[2],n[1]]),s.drawFan(a,t.center,e,r)}else s.drawRect(n,e,r)}}),t.exports=o},function(t,e,n){"use strict";function r(t){var e=i.mix({strokeStyle:t.color,lineWidth:t.size||o,z:t.isInCircle},t.style);return e}var i=n(1),a=n(14),s=n(7),o=4,c=n(36),u=n(3),l=a.registGeom("line",{defaultShapeType:"line"});a.registShape("line","line",{getShapePoints:function(t){return c.splitPoints(t)},drawShape:function(t,e){var n=this.parsePoints(t.points),i=r(t);s.drawLines(n,e,i)}}),a.registShape("line","smooth",{drawShape:function(t,e){var n=this.parsePoints(t.points),i=r(t);s.drawSmooth(n,e,i)}}),a.registShape("line","dash",{drawShape:function(t,e){var n=this.parsePoints(t.points),i=r(t);i.lineDash=u.lineDash,s.drawLines(n,e,i)}}),t.exports=l},function(t,e,n){"use strict";function r(t){return{size:t.size||o,style:i.mix({lineWidth:0,strokeStyle:t.color,fillStyle:t.color},t.style)}}var i=n(1),a=n(14),s=n(7),o=5,c=n(36),u=a.registGeom("point",{defaultShapeType:"circle"});a.registShape("point","circle",{getShapePoints:function(t){return c.splitPoints(t)},drawShape:function(t,e){if(0!==t.size){var n=r(t),a=this.parsePoints(t.points),o=n.size,c=n.style;i.each(a,function(t){s.drawCircle(t,o,e,c)})}}}),a.registShape("point","rect",{drawShape:function(t,e){if(0!==t.size){var n=r(t),a=this.parsePoints(t.points),o=n.size,c=n.style;i.each(a,function(t){s.drawShape(e,c,function(e){e.rect(t.x-o,t.y-o,2*o,2*o)})})}}}),t.exports=u},function(t,e,n){"use strict";var r=n(1),i=n(83),a=n(3),s=n(16),o=n(35),c=function(t){r.mix(this,t),this.attrs=[]};r.augment(c,{type:null,attrs:null,chart:null,styleCfg:null,_createScales:function(t){var e=this,n=[];return r.each(t,function(t){var r=e._createScale(t);n.push(r)}),n},createGeom:function(){var t=this,e=t.type,n=s[r.ucfirst(e)],i=new n({type:e,attrs:t.attrs,styleCfg:t.styleCfg,coord:t.coord,container:t.chart.get("canvas")});return i},_createScale:function(t){var e=this.chart;return e.createScale(t)},_parseDims:function(t){return r.isString(t)&&t.indexOf("*")!==-1?t=t.replace(/\s+/g,"").split("*"):(r.isNumber(t)||r.isString(t))&&(t=[t]),t},_addAttr:function(t,e){t=r.ucfirst(t);var n=this.attrs,a=new i[t](e);n.push(a)},_createAttr:function(t,e,n){e=this._parseDims(e);var i,s=this._createScales(e),c=[],u=r.ucfirst(this.type),l={dims:e,scales:s};"shape"===t?(i=o[u],r.each(i,function(t,e){r.isObject(t)&&c.push(e)})):c=a[t+"s"],r.isFunction(n)?l.callback=n:r.isArray(n)&&(c=n),"position"===t&&(l.coord=this.coord),"size"===t?(l.min=c.min,l.max=c.max):l.arr=c,this._addAttr(t,l)},position:function(t,e){return this._createAttr("position",t,e),this},color:function(t,e){return this._createAttr("color",t,e),this},size:function(t,e){return this._createAttr("size",t,e),this},shape:function(t,e){return this._createAttr("shape",t,e),this},style:function(t){return this.styleCfg=t,this}}),t.exports=c},function(t,e,n){"use strict";function r(t){return new o(t.x,t.y)}function i(t,e){return t.x*=e,t.y*=e,t}function a(t,e,n,a){var s,c,u,l,f,h,g,p,v=[],d=!!a;if(d){for(u=new o(1/0,1/0),l=new o((-(1/0)),(-(1/0))),p=0,g=t.length;p<g;p++)f=r(t[p]),u.min(f),l.max(f);u.min(r(a[0])),l.max(r(a[1]))}for(p=0,h=t.length;p<h;p++){if(f=r(t[p]),n)s=r(t[p?p-1:h-1]),c=r(t[(p+1)%h]);else{if(0===p||p===h-1){v.push([f.x,f.y]);continue}s=r(t[p-1]),c=r(t[p+1])}var m=o.sub(c,s);i(m,e);var x=f.distanceTo(s),y=f.distanceTo(c),S=x+y;0!==S&&(x/=S,y/=S);var w=i(m.clone(),-x),T=i(m.clone(),y),A=o.add(f,w),_=o.add(f,T);d&&(A.max(u),A.min(l),_.max(u),_.min(l)),v.push([A.x,A.y]),v.push([_.x,_.y])}return n&&v.push(v.shift()),v}function s(t,e,n){for(var r,i,s,o=!!e,c=a(t,.4,o,n),u=t.length,l=[],f=0;f<u-1;f++)r=c[2*f],i=c[2*f+1],s=t[f+1],l.push(["C",r[0],r[1],i[0],i[1],s.x,s.y]);return o&&(r=c[u],i=c[u+1],s=t[0],l.push(["C",r[0],r[1],i[0],i[1],s.x,s.y])),l}var o=n(8);t.exports={smooth:s}},function(t,e,n){"use strict";var r=n(1),i=n(24),a=n(3),s=n(5),o={LINEAR:"linear",CAT:"cat",TIME_CAT:"timeCat"},c=function(t){r.mix(this,t),this.defs=this.defs||{}};r.augment(c,{defs:null,_getDefs:function(){var t=this.defs;return r.mix(!0,{},a.scales,t)},_getRange:function(t,e,n){return t===o.CAT||t===o.TIME_CAT?this._getCatRange(e,n):[0,1]},_getCatRange:function(t,e){var n,r=t.length;return n=1===r?[.5,1]:e?[0,1-1/r]:[1/(2*r),1-1/(2*r)]},_getScaleCfg:function(t,e,n){var r={dim:e};if(n&&n.names.length>0&&n.contains(e)){var i=s.values(n,e);i.length>0&&t!==o.CAT&&t!==o.TIME_CAT&&(r.min=Math.min.apply(null,i),r.max=Math.max.apply(null,i)),r.values=i}return r},_getDefaultType:function(t,e){var n=o.LINEAR,i=e.rowObject(0),a=i[t];return r.isArray(a)&&(a=a[0]),r.isString(a)&&(n=o.CAT),n},_createDefaultScale:function(t,e){var n=this._getDefaultType(t,e),r=this._getScaleCfg(n,t,e);return i[n](r)},createScale:function(t,e,n){var a,s=this,o=s._getDefs();if(r.isNumber(t))a=i.I({value:t,dim:t.toString()});else if(o[t]||r.indexOf(e.colNames(),t)!==-1)if(o[t]){var c=o[t],u=c.type||s._getDefaultType(t,e),l=s._getScaleCfg(u,t,e);r.isNull(c.min)||(l.min=c.min),r.isNull(c.max)||(l.max=c.max),r.mix(l,c),l.values||(l.values=[]),a=i[u](l)}else a=s._createDefaultScale(t,e);else a=i.I({value:t,dim:t});if(a&&"I"!==a.type&&(!o[t]||!o[t].range)&&a.values){var f=s._getRange(a.type,a.values,n);a.range=f}return a}}),t.exports=c}])});

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Created by godsong on 16/12/12.
	 */

	//var Canvas=require('../../../js/core/gcanvas');
	var Canvas = __webpack_require__(1);

	//字体渲染测试
	exports.case0 = function (GM, context) {

	    var margin = 30;
	    context = Canvas.getContext('2d');

	    /*
	    context.font="30px";
	    context.fillText("1 abc 你好 123 ~!@#$%^&*()_+",20,50);
	    
	    context.font="30px Arial";
	    context.fillText("2 abc 你好 123 ~!@#$%^&*()_+",20,50 + margin);
	    
	    context.font="30px sans-serif";
	    context.fillText("3 abc 你好 123 ~!@#$%^&*()_+",20,50 + margin*2);
	    */

	    //context.font="30px NotoSansSC";
	    //context.fillText("4 abc 你好 123 ~!@#$%^&*()_+",20,250);
	    context.font = "30px sans-serif";
	    context.fillText("font test", 20, 50 + margin * 3);

	    context.font = "30px sans-serif";
	    context.fillText("5.1 abcdefghijklmn ABCDEFGHIJKLMNOPQRSTUVWXYZ", 20, 50 + margin * 4);

	    context.font = "30px serif";
	    context.fillText("5.2 abcdefghijklmn ABCDEFGHIJKLMNOPQRSTUVWXYZ", 20, 50 + margin * 5);

	    context.font = "30px SimSun";
	    context.fillText("你好 阿里巴巴 淘宝 天猫 阿里云 菜鸟", 20, 50 + margin * 6);

	    context.font = "30px Arial";
	    context.fillText("你好 阿里巴巴 淘宝 天猫 阿里云 菜鸟", 20, 50 + margin * 7);

	    context.font = "30px serif";
	    context.fillText("5.3 1234567890", 20, 50 + margin * 8);

	    context.font = "30px sans-serif";
	    context.fillText("5.4 1234567890", 20, 50 + margin * 9);

	    context.font = "30px sans-serif";
	    context.fillText("5.5 ~!@#$%^&*()_+{}|[]\:\";''<>?,./", 20, 50 + margin * 10);

	    context.font = "30px serif";
	    context.fillText("5.6 ~!@#$%^&*()_+{}|[]\:\";''<>?,./", 20, 50 + margin * 11);

	    context.render();
	};

	//点图
	exports.case1 = function (GM) {
	    GM.Global.pixelRatio = 1;
	    var Util = GM.Util;
	    var data = [{ "time": '2016-08-08 00:00:00', "tem": 10 }, { "time": '2016-08-08 00:10:00', "tem": 22 }, { "time": '2016-08-08 00:30:00', "tem": 20 }, { "time": '2016-08-09 00:35:00', "tem": 26 }, { "time": '2016-08-09 01:00:00', "tem": 20 }, { "time": '2016-08-09 01:20:00', "tem": 26 }, { "time": '2016-08-10 01:40:00', "tem": 28 }, { "time": '2016-08-10 02:00:00', "tem": 20 }, { "time": '2016-08-10 02:20:00', "tem": 28 }];
	    var chart = new GM.Chart({
	        id: 'c1'
	    });
	    var defs = {
	        time: {
	            type: 'timeCat',
	            mask: 'mm/dd',
	            tickCount: 3
	        },
	        tem: {
	            tickCount: 5,
	            min: 0
	        }
	    };
	    //配置刻度文字大小，供PC端显示用(移动端可以使用默认值20px)
	    chart.axis('tem', {
	        label: {
	            fontSize: 14,
	            fontFamily: "sans-serif"
	        }
	    });
	    chart.axis('time', {
	        label: {
	            fontSize: 14,
	            fontFamily: "sans-serif"
	        }
	    });
	    chart.source(data, defs);
	    chart.point().position('time*tem');
	    chart.render();
	};

	//折线图
	exports.case2 = function (GM) {

	    GM.Global.pixelRatio = 1;
	    var Util = GM.Util;
	    var data = [{ "time": '2016-08-08 00:00:00', "tem": 10 }, { "time": '2016-08-08 00:10:00', "tem": 22 }, { "time": '2016-08-08 00:30:00', "tem": 20 }, { "time": '2016-08-09 00:35:00', "tem": 26 }, { "time": '2016-08-09 01:00:00', "tem": 20 }, { "time": '2016-08-09 01:20:00', "tem": 26 }, { "time": '2016-08-10 01:40:00', "tem": 28 }, { "time": '2016-08-10 02:00:00', "tem": 20 }, { "time": '2016-08-10 02:20:00', "tem": 28 }];
	    var chart = new GM.Chart({
	        id: 'c1'
	    });
	    var defs = {
	        time: {
	            type: 'timeCat',
	            mask: 'mm/dd',
	            tickCount: 3,
	            range: [0, 1]
	        },
	        tem: {
	            tickCount: 5,
	            min: 0
	        }
	    };
	    //配置刻度文字大小，供PC端显示用(移动端可以使用默认值20px)
	    chart.axis('tem', {
	        label: {
	            fontSize: 14,
	            fontFamily: "sans-serif"
	        }
	    });
	    chart.axis('time', {
	        label: {
	            fontSize: 14,
	            fontFamily: "sans-serif"
	        }
	    });
	    chart.source(data, defs);
	    chart.line().position('time*tem');
	    chart.render();
	};

	//平滑折线图
	exports.case3 = function (GM) {

	    GM.Global.pixelRatio = 1;
	    var Util = GM.Util;
	    var data = [{ "time": '周一', "tem": 10, "city": "beijing" }, { "time": '周二', "tem": 22, "city": "beijing" }, { "time": '周三', "tem": 20, "city": "beijing" }, { "time": '周四', "tem": 26, "city": "beijing" }, { "time": '周五', "tem": 20, "city": "beijing" }, { "time": '周六', "tem": 26, "city": "beijing" }, { "time": '周日', "tem": 28, "city": "beijing" }, { "time": '周一', "tem": 5, "city": "newYork" }, { "time": '周二', "tem": 12, "city": "newYork" }, { "time": '周三', "tem": 26, "city": "newYork" }, { "time": '周四', "tem": 20, "city": "newYork" }, { "time": '周五', "tem": 28, "city": "newYork" }, { "time": '周六', "tem": 26, "city": "newYork" }, { "time": '周日', "tem": 20, "city": "newYork" }];
	    var chart = new GM.Chart({
	        id: 'c1'
	    });
	    var defs = {
	        time: {
	            tickCount: 7,
	            range: [0, 1]
	        },
	        tem: {
	            tickCount: 5,
	            min: 0
	        }
	    };
	    //配置time刻度文字样式
	    var _label = {
	        fill: '#979797',
	        font: '14px SimSun',
	        offset: 6
	    };

	    chart.axis('time', {
	        label: function label(text, index, total) {

	            var cfg = Util.mix({}, _label);
	            // 第一个点左对齐，最后一个点右对齐，其余居中，只有一个点时左对齐
	            if (index === 0) {
	                cfg.textAlign = 'start';
	            }
	            if (index > 0 && index === total - 1) {
	                cfg.textAlign = 'end';
	            }
	            return cfg;
	        }
	    });
	    //配置刻度文字大小，供PC端显示用(移动端可以使用默认值20px)
	    chart.axis('tem', {
	        label: {
	            fontSize: 14,
	            fontFamily: 'sans-serif'
	        }
	    });
	    chart.source(data, defs);
	    chart.line().position('time*tem').color('city').shape('smooth');
	    chart.render();
	};

	//带点折线图
	exports.case4 = function (GM) {

	    //双精度
	    GM.Global.pixelRatio = 1;
	    var Util = GM.Util;
	    var data = [{ "time": '2016-08-08 00:00:00', "tem": 10 }, { "time": '2016-08-08 00:10:00', "tem": 22 }, { "time": '2016-08-08 00:30:00', "tem": 20 }, { "time": '2016-08-09 00:35:00', "tem": 26 }, { "time": '2016-08-09 01:00:00', "tem": 20 }, { "time": '2016-08-09 01:20:00', "tem": 26 }, { "time": '2016-08-10 01:40:00', "tem": 28 }, { "time": '2016-08-10 02:00:00', "tem": 20 }, { "time": '2016-08-10 02:20:00', "tem": 28 }];
	    var chart = new GM.Chart({
	        id: 'c1'
	    });
	    var defs = {
	        time: {
	            type: 'timeCat',
	            mask: 'yyyy-mm-dd',
	            tickCount: 2,
	            range: [0, 1]
	        },
	        tem: {
	            tickCount: 5,
	            min: 0
	        }
	    };
	    //配置time刻度文字样式
	    var _label2 = {
	        fill: '#979797',
	        font: '14px sans-serif',
	        offset: 6
	    };
	    chart.axis('time', {
	        label: function label(text, index, total) {
	            var cfg = Util.mix({}, _label2);
	            // 第一个点左对齐，最后一个点右对齐，其余居中，只有一个点时左对齐
	            if (index === 0) {
	                cfg.textAlign = 'start';
	            }
	            if (index > 0 && index === total - 1) {
	                cfg.textAlign = 'end';
	            }
	            return cfg;
	        }
	    });
	    //配置刻度文字大小，供PC端显示用(移动端可以使用默认值20px)
	    chart.axis('tem', {
	        label: {
	            fontSize: 14,
	            fontFamily: "sans-serif"
	        }
	    });
	    chart.source(data, defs);
	    chart.line().position('time*tem').shape('smooth');
	    chart.point().position('time*tem');
	    chart.render();
	};

	//区域图
	exports.case5 = function (GM) {

	    var Util = GM.Util;
	    // 双精度
	    GM.Global.pixelRatio = 1;
	    var data = [{ "time": '2016-08-08 00:00:00', "tem": 10, "city": "beijing" }, { "time": '2016-08-08 00:10:00', "tem": 22, "city": "beijing" }, { "time": '2016-08-08 00:30:00', "tem": 16, "city": "beijing" }, { "time": '2016-08-09 00:35:00', "tem": 26, "city": "beijing" }, { "time": '2016-08-09 01:00:00', "tem": 12, "city": "beijing" }, { "time": '2016-08-09 01:20:00', "tem": 26, "city": "beijing" }, { "time": '2016-08-10 01:40:00', "tem": 18, "city": "beijing" }, { "time": '2016-08-10 02:00:00', "tem": 26, "city": "beijing" }, { "time": '2016-08-10 02:20:00', "tem": 12, "city": "beijing" }, { "time": '2016-08-08 00:00:00', "tem": 28, "city": "newYork" }, { "time": '2016-08-08 00:10:00', "tem": 16, "city": "newYork" }, { "time": '2016-08-08 00:30:00', "tem": 26, "city": "newYork" }, { "time": '2016-08-09 00:35:00', "tem": 12, "city": "newYork" }, { "time": '2016-08-09 01:00:00', "tem": 26, "city": "newYork" }, { "time": '2016-08-09 01:20:00', "tem": 20, "city": "newYork" }, { "time": '2016-08-10 01:40:00', "tem": 29, "city": "newYork" }, { "time": '2016-08-10 02:00:00', "tem": 16, "city": "newYork" }, { "time": '2016-08-10 02:20:00', "tem": 22, "city": "newYork" }];
	    var chart = new GM.Chart({
	        id: 'c1'
	    });
	    chart.source(data, {
	        time: {
	            type: 'timeCat',
	            mask: 'yyyy-mm-dd',
	            tickCount: 3,
	            range: [0, 1]
	        },
	        tem: {
	            tickCount: 5,
	            min: 0
	        }
	    });
	    //配置刻度文字大小，供PC端显示用(移动端可以使用默认值20px)
	    chart.axis('tem', {
	        label: {
	            fontSize: 14,
	            fontFamily: "sans-serif"
	        }
	    });
	    //配置time刻度文字样式
	    var _label3 = {
	        fill: '#979797',
	        font: '14px sans-serif',
	        offset: 6
	    };
	    chart.axis('time', {
	        label: function label(text, index, total) {
	            var cfg = Util.mix({}, _label3);
	            // 第一个点左对齐，最后一个点右对齐，其余居中，只有一个点时左对齐
	            if (index === 0) {
	                cfg.textAlign = 'start';
	            }
	            if (index > 0 && index === total - 1) {
	                cfg.textAlign = 'end';
	            }
	            return cfg;
	        }
	    });
	    chart.area().position('time*tem').color('city').shape('smooth').style({
	        opacity: 0.6
	    });
	    chart.render();
	};

	//带事件的重叠区域图
	exports.case6 = function (GM) {

	    GM.Global.pixelRatio = 1;
	    var data = [{ "month": 12, "tem": 7, "city": "tokyo" }, { "month": 1, "tem": 6.9, "city": "tokyo" }, { "month": 2, "tem": 9.5, "city": "tokyo" }, { "month": 3, "tem": 14.5, "city": "tokyo" }, { "month": 4, "tem": 18.2, "city": "tokyo" }, { "month": 5, "tem": 21.5, "city": "tokyo" }, { "month": 6, "tem": 25.2, "city": "tokyo" }, { "month": 7, "tem": 26.5, "city": "tokyo" }, { "month": 8, "tem": 23.3, "city": "tokyo" }, { "month": 9, "tem": 18.3, "city": "tokyo" }, { "month": 10, "tem": 13.9, "city": "tokyo" }, { "month": 11, "tem": 9.6, "city": "tokyo" }, { "month": 12, "tem": 0, "city": "newYork" }, { "month": 1, "tem": 0.8, "city": "newYork" }, { "month": 2, "tem": 5.7, "city": "newYork" }, { "month": 3, "tem": 11.3, "city": "newYork" }, { "month": 4, "tem": 17, "city": "newYork" }, { "month": 5, "tem": 22, "city": "newYork" }, { "month": 6, "tem": 24.8, "city": "newYork" }, { "month": 7, "tem": 24.1, "city": "newYork" }, { "month": 8, "tem": 20.1, "city": "newYork" }, { "month": 9, "tem": 14.1, "city": "newYork" }, { "month": 10, "tem": 8.6, "city": "newYork" }, { "month": 11, "tem": 2.5, "city": "newYork" }, { "month": 12, "tem": 2, "city": "berlin" }, { "month": 1, "tem": 0.6, "city": "berlin" }, { "month": 2, "tem": 3.5, "city": "berlin" }, { "month": 3, "tem": 8.4, "city": "berlin" }, { "month": 4, "tem": 13.5, "city": "berlin" }, { "month": 5, "tem": 17, "city": "berlin" }, { "month": 6, "tem": 18.6, "city": "berlin" }, { "month": 7, "tem": 17.9, "city": "berlin" }, { "month": 8, "tem": 14.3, "city": "berlin" }, { "month": 9, "tem": 9, "city": "berlin" }, { "month": 10, "tem": 3.9, "city": "berlin" }, { "month": 11, "tem": 1, "city": "berlin" }];
	    var chart = new GM.Chart({
	        id: 'c1'
	    });
	    chart.source(data, {
	        month: {
	            tickCount: 12
	        },
	        tem: {
	            tickCount: 5
	        }
	    });
	    //配置刻度文字大小，供PC端显示用(移动端可以使用默认值20px)
	    chart.axis('tem', {
	        label: {
	            fontSize: 14,
	            fontFamily: "sans-serif"
	        }
	    });
	    chart.axis('month', {
	        label: {
	            fontSize: 14,
	            fontFamily: "sans-serif"
	        }
	    });
	    chart.areaStack().position('month*tem').color('city').shape('smooth').style({
	        opacity: 0.6
	    });
	    chart.render();
	    function getPoint(canvas, x, y) {
	        var bbox = canvas.getBoundingClientRect();
	        return {
	            x: x - bbox.left,
	            y: y - bbox.top
	        };
	    }
	};

	//柱状图
	exports.case7 = function (GM) {

	    GM.Global.pixelRatio = 1;
	    var data = [{ "tem": 10, "city": "tokyo" }, { "tem": 4, "city": "newYork" }, { "tem": 3, "city": "berlin" }];
	    var chart = new GM.Chart({
	        id: 'c1'
	    });
	    chart.source(data, {
	        tem: {
	            tickCount: 5
	        }
	    });
	    //配置刻度文字大小，供PC端显示用(移动端可以使用默认值20px)
	    chart.axis('city', {
	        label: {
	            fontSize: 14,
	            fontFamily: "sans-serif"
	        },
	        grid: null
	    });
	    chart.axis('tem', {
	        label: {
	            fontSize: 14,
	            fontFamily: "sans-serif"
	        }
	    });
	    chart.interval().position('city*tem').color('city');
	    chart.render();
	};

	//区间柱状图
	exports.case8 = function (GM) {

	    GM.Global.pixelRatio = 1;
	    var data = [{ "month": '周一', "tem": [0, 7] }, { "month": '周二', "tem": [7, 5] }, { "month": '周三', "tem": [5, 9.5] }, { "month": '周四', "tem": [9.5, 14.5] }, { "month": '周五', "tem": [14.5, 10.2] }, { "month": '周六', "tem": [10.2, 21.5] }, { "month": '周日', "tem": [21.5, 25.2] }];
	    var chart = new GM.Chart({
	        id: 'c1'
	    });
	    chart.source(data, {
	        tem: {
	            tickCount: 5
	        }
	    });
	    //配置刻度文字大小，供PC端显示用(移动端可以使用默认值20px)
	    chart.axis('month', {
	        label: {
	            fontSize: 14,
	            fontFamily: "SimSun"

	        },
	        grid: null
	    });
	    chart.axis('tem', {
	        label: {
	            fontSize: 14,
	            fontFamily: "sans-serif"
	        }
	    });
	    chart.interval().position('month*tem').color('tem', function (tem) {
	        if (tem[1] >= tem[0]) {
	            return 'red';
	        } else {
	            return 'green';
	        }
	    });
	    chart.render();
	};

	//层叠柱状图
	exports.case9 = function (GM) {

	    GM.Global.pixelRatio = 1;
	    var data = [{ "time": "周一", "tem": 6.9, "city": "tokyo" }, { "time": "周二", "tem": 9.5, "city": "tokyo" }, { "time": "周三", "tem": 14.5, "city": "tokyo" }, { "time": "周四", "tem": 18.2, "city": "tokyo" }, { "time": "周五", "tem": 21.5, "city": "tokyo" }, { "time": "周六", "tem": 25.2, "city": "tokyo" }, { "time": "周日", "tem": 26.5, "city": "tokyo" }, { "time": "周一", "tem": 0.8, "city": "newYork" }, { "time": "周二", "tem": 5.7, "city": "newYork" }, { "time": "周三", "tem": 11.3, "city": "newYork" }, { "time": "周四", "tem": 17, "city": "newYork" }, { "time": "周五", "tem": 22, "city": "newYork" }, { "time": "周六", "tem": 24.8, "city": "newYork" }, { "time": "周日", "tem": 24.1, "city": "newYork" }, { "time": "周一", "tem": 0.6, "city": "berlin" }, { "time": "周二", "tem": 3.5, "city": "berlin" }, { "time": "周三", "tem": 8.4, "city": "berlin" }, { "time": "周四", "tem": 13.5, "city": "berlin" }, { "time": "周五", "tem": 17, "city": "berlin" }, { "time": "周六", "tem": 18.6, "city": "berlin" }, { "time": "周日", "tem": 17.9, "city": "berlin" }];
	    var chart = new GM.Chart({
	        id: 'c1'
	    });
	    chart.source(data, {
	        tem: {
	            tickCount: 5
	        }
	    });
	    //配置刻度文字大小，供PC端显示用(移动端可以使用默认值20px)
	    chart.axis('time', {
	        label: {
	            fontSize: 14,
	            fontFamily: "SimSun"
	        },
	        grid: null
	    });
	    chart.axis('tem', {
	        label: {
	            fontSize: 14,
	            fontFamily: "sans-serif"
	        }
	    });
	    chart.intervalStack().position('time*tem').color('city');
	    chart.render();
	};

	//玉玦图
	exports.case10 = function (GM) {

	    GM.Global.pixelRatio = 1;
	    var data = [{ "tem": 7, "city": "tokyo" }, { "tem": 4, "city": "newYork" }, { "tem": 3, "city": "berlin" }];
	    var chart = new GM.Chart({
	        id: 'c1'
	    });
	    chart.source(data, {
	        tem: {
	            min: 0,
	            max: 10
	        }
	    });
	    chart.axis(false);
	    chart.coord('polar', {
	        transposed: true,
	        inner: 0.5
	    });
	    chart.interval().position('city*tem').color('city');
	    chart.render();
	};

	//自定义shape的柱状图
	exports.case11 = function (GM) {

	    GM.Global.pixelRatio = 1;
	    var data = [{ "tem": 500, "city": "一月" }, { "tem": -50, "city": "二月" }, { "tem": 450, "city": "五月" }, { "tem": -40, "city": "六月" }, { "tem": 690, "city": "七月" }, { "tem": 346, "city": "八月" }];
	    var _drawShape = function _drawShape(points, canvas, cfg) {
	        var ctx = canvas.getContext('2d');
	        ctx.beginPath();
	        ctx.moveTo(points[0].x, points[0].y);
	        if (points.length > 1) {
	            for (var i = 1; i <= points.length - 1; i++) {
	                ctx.lineTo(points[i].x, points[i].y);
	            }
	        }
	        ctx.fillStyle = cfg.fill;
	        ctx.fill();
	    };
	    //自定义绘制数据的的形状
	    var Shape = GM.Shape;
	    Shape.registShape('interval', 'polygon', {
	        getShapePoints: function getShapePoints(cfg) {
	            var x = cfg.x;
	            var y = cfg.y;
	            var y0 = cfg.y0;
	            var width = cfg.size;
	            return [{ x: x - width / 2, y: y0 }, { x: x, y: y }, { x: x + width / 2, y: y0 }];
	        },
	        drawShape: function drawShape(cfg, canvas) {
	            var points = this.parsePoints(cfg.points);
	            var style = cfg.style || {};
	            style.fill = cfg.color;
	            _drawShape(points, canvas, style);
	        }
	    });
	    var chart = new GM.Chart({
	        id: 'c1'
	    });
	    chart.source(data, {
	        tem: {
	            tickCount: 5
	        }
	    });
	    chart.axis('city', {
	        label: {
	            fontSize: 14,
	            fontFamily: 'SimSun'
	        },
	        line: null,
	        grid: null
	    });
	    chart.axis('tem', {
	        label: {
	            fontSize: 14,
	            fontFamily: 'sans-serif'
	        },
	        grid: {
	            stroke: '#f8f8f8'
	        }
	    });
	    chart.interval().position('city*tem').color('tem*city', function (tem, city) {
	        if (city === '八月') {
	            return '#f5623a';
	        }
	        if (tem >= 0) {
	            return '#f8bdad';
	        }
	        if (tem < 0) {
	            return '#99d6c0';
	        }
	    }).shape('polygon');
	    // 绘制数据
	    chart.render();
	};

	//饼图
	exports.case12 = function (GM) {

	    GM.Global.pixelRatio = 1;
	    var data = [{ a: '1', b: 0.3, c: '1' }, { a: '1', b: 0.3, c: '2' }, { a: '1', b: 0.4, c: '3' }];
	    var chart = new GM.Chart({
	        id: 'c1'
	    });
	    chart.source(data);
	    chart.coord('polar', {
	        transposed: true,
	        inner: 0
	    });
	    chart.axis(false);
	    chart.intervalStack().position('a*b').color('c');
	    chart.render();
	};

	//嵌套饼图
	exports.case13 = function (GM) {

	    GM.Global.pixelRatio = 1;
	    var data = [{ a: '1', b: 0.2, c: '1' }, { a: '2', b: 0.5, c: '1' }, { a: '3', b: 0.4, c: '1' }, { a: '1', b: 0.8, c: '2' }, { a: '2', b: 0.5, c: '2' }, { a: '3', b: 0.6, c: '2' }];
	    var chart = new GM.Chart({
	        id: 'c1'
	    });
	    chart.source(data);
	    chart.coord('polar', {
	        transposed: true,
	        inner: 0.5
	    });
	    chart.axis(false);
	    chart.intervalStack().position('a*b').color('c');
	    chart.render();
	};

	//玫瑰饼图
	exports.case14 = function (GM) {

	    GM.Global.pixelRatio = 1;
	    var data = [{ "tem": 7, "city": "tokyo" }, { "tem": 4, "city": "newYork" }, { "tem": 3, "city": "berlin" }];
	    var chart = new GM.Chart({
	        id: 'c1'
	    });
	    chart.source(data, {
	        tem: {
	            min: 0,
	            nice: false
	        }
	    });
	    chart.coord('polar', {
	        inner: 0
	    });
	    chart.axis(false);
	    chart.interval().position('city*tem').color('city');
	    chart.render();
	};

	//雷达图
	exports.case15 = function (GM) {

	    GM.Global.pixelRatio = 1;
	    var data = [{ name: '张飞', props: '智力', value: 65 }, { name: '张飞', props: '武力', value: 97 }, { name: '张飞', props: '政治', value: 50 }, { name: '张飞', props: '统帅', value: 92 }, { name: '张飞', props: '忠诚', value: 100 }, { name: '关羽', props: '智力', value: 80 }, { name: '关羽', props: '武力', value: 94 }, { name: '关羽', props: '政治', value: 70 }, { name: '关羽', props: '统帅', value: 95 }, { name: '关羽', props: '忠诚', value: 99 }];
	    var chart = new GM.Chart({
	        id: 'c1'
	    });
	    chart.coord('polar');
	    chart.source(data, {
	        value: {
	            min: 0,
	            tickInterval: 20
	        }
	    });
	    //配置刻度文字大小，供PC端显示用(移动端可以使用默认值20px)
	    chart.axis('props', {
	        label: {
	            fontSize: 14,
	            fontFamily: "SimSun"
	        },
	        line: null
	    });
	    chart.axis('value', {
	        label: {
	            fontSize: 14,
	            fontFamily: "sans-serif"
	        }
	    });
	    chart.line().position('props*value').color('name');
	    chart.render();
	};

	//带缩放动画的区域雷达图
	exports.case16 = function (GM) {

	    GM.Global.pixelRatio = 1;
	    var data = [{ name: '张飞', props: '智力', value: 65 }, { name: '张飞', props: '武力', value: 97 }, { name: '张飞', props: '政治', value: 50 }, { name: '张飞', props: '统帅', value: 92 }, { name: '张飞', props: '忠诚', value: 100 }, { name: '关羽', props: '智力', value: 80 }, { name: '关羽', props: '武力', value: 94 }, { name: '关羽', props: '政治', value: 70 }, { name: '关羽', props: '统帅', value: 95 }, { name: '关羽', props: '忠诚', value: 99 }];
	    var chart = new GM.Chart({
	        id: 'c1'
	    });
	    chart.coord('polar');
	    chart.source(data, {
	        value: {
	            min: 0,
	            tickInterval: 20
	        }
	    });
	    //配置刻度文字大小，供PC端显示用(移动端可以使用默认值20px)
	    chart.axis('props', {
	        label: {
	            fontSize: 14,
	            fontFamily: "SimSun"
	        },
	        line: null
	    });
	    chart.axis('value', {
	        label: {
	            fontSize: 14,
	            fontFamily: "sans-serif"
	        }
	    });
	    chart.area().position('props*value').color('name').style({
	        opacity: 0.6
	    });
	    // x和y轴同时缩放的动画
	    //  chart.animate().scalexy();
	    chart.render();
	};

	//股票图
	exports.case17 = function (GM) {

	    var Util = GM.Util;
	    GM.Global.pixelRatio = 1;
	    //获取本地数据
	    var data = [{
	        time: "2015-11-19",
	        start: 8.18,
	        max: 8.33,
	        min: 7.98,
	        end: 8.32,
	        volumn: 1810,
	        money: 14723.56
	    }, {
	        time: "2015-11-18",
	        start: 8.37,
	        max: 8.6,
	        min: 8.03,
	        end: 8.09,
	        volumn: 2790.37,
	        money: 23309.19
	    }, {
	        time: "2015-11-17",
	        start: 8.7,
	        max: 8.78,
	        min: 8.32,
	        end: 8.37,
	        volumn: 3729.04,
	        money: 31709.71
	    }, {
	        time: "2015-11-16",
	        start: 8.18,
	        max: 8.69,
	        min: 8.05,
	        end: 8.62,
	        volumn: 3095.44,
	        money: 26100.69
	    }, {
	        time: "2015-11-13",
	        start: 8.01,
	        max: 8.75,
	        min: 7.97,
	        end: 8.41,
	        volumn: 5815.58,
	        money: 48562.37
	    }, {
	        time: "2015-11-12",
	        start: 7.76,
	        max: 8.18,
	        min: 7.61,
	        end: 8.15,
	        volumn: 4742.6,
	        money: 37565.36
	    }, {
	        time: "2015-11-11",
	        start: 7.55,
	        max: 7.81,
	        min: 7.49,
	        end: 7.8,
	        volumn: 3133.82,
	        money: 24065.42
	    }, {
	        time: "2015-11-10",
	        start: 7.5,
	        max: 7.68,
	        min: 7.44,
	        end: 7.57,
	        volumn: 2670.35,
	        money: 20210.58
	    }, {
	        time: "2015-11-09",
	        start: 7.65,
	        max: 7.66,
	        min: 7.3,
	        end: 7.58,
	        volumn: 2841.79,
	        money: 21344.36
	    }, {
	        time: "2015-11-06",
	        start: 7.52,
	        max: 7.71,
	        min: 7.48,
	        end: 7.64,
	        volumn: 2725.44,
	        money: 20721.51
	    }, {
	        time: "2015-11-05",
	        start: 7.48,
	        max: 7.57,
	        min: 7.29,
	        end: 7.48,
	        volumn: 3520.85,
	        money: 26140.83
	    }, {
	        time: "2015-11-04",
	        start: 7.01,
	        max: 7.5,
	        min: 7.01,
	        end: 7.46,
	        volumn: 3591.47,
	        money: 26285.52
	    }, {
	        time: "2015-11-03",
	        start: 7.1,
	        max: 7.17,
	        min: 6.82,
	        end: 7,
	        volumn: 2029.21,
	        money: 14202.33
	    }, {
	        time: "2015-11-02",
	        start: 7.09,
	        max: 7.44,
	        min: 6.93,
	        end: 7.17,
	        volumn: 3191.31,
	        money: 23205.11
	    }, {
	        time: "2015-10-30",
	        start: 6.98,
	        max: 7.27,
	        min: 6.84,
	        end: 7.18,
	        volumn: 3522.61,
	        money: 25083.44
	    }, {
	        time: "2015-10-29",
	        start: 6.94,
	        max: 7.2,
	        min: 6.8,
	        end: 7.05,
	        volumn: 2752.27,
	        money: 19328.44
	    }, {
	        time: "2015-10-28",
	        start: 7.01,
	        max: 7.14,
	        min: 6.8,
	        end: 6.85,
	        volumn: 2311.11,
	        money: 16137.32
	    }, {
	        time: "2015-10-27",
	        start: 6.91,
	        max: 7.31,
	        min: 6.48,
	        end: 7.18,
	        volumn: 3172.9,
	        money: 21827.3
	    }, {
	        time: "2015-10-26",
	        start: 6.9,
	        max: 7.08,
	        min: 6.87,
	        end: 6.95,
	        volumn: 2769.31,
	        money: 19337.44
	    }, {
	        time: "2015-10-23",
	        start: 6.71,
	        max: 6.85,
	        min: 6.58,
	        end: 6.79,
	        volumn: 2483.18,
	        money: 16714.31
	    }, {
	        time: "2015-10-22",
	        start: 6.38,
	        max: 6.67,
	        min: 6.34,
	        end: 6.65,
	        volumn: 2225.88,
	        money: 14465.56
	    }, {
	        time: "2015-10-21",
	        start: 7.08,
	        max: 7.1,
	        min: 6.41,
	        end: 6.41,
	        volumn: 2891.47,
	        money: 19585.98
	    }, {
	        time: "2015-10-20",
	        start: 6.88,
	        max: 7.19,
	        min: 6.85,
	        end: 7.12,
	        volumn: 2389.62,
	        money: 16813.58
	    }, {
	        time: "2015-10-19",
	        start: 7.1,
	        max: 7.14,
	        min: 6.8,
	        end: 6.94,
	        volumn: 2786.61,
	        money: 19474.72
	    }, {
	        time: "2015-10-16",
	        start: 6.92,
	        max: 7.38,
	        min: 6.73,
	        end: 7.15,
	        volumn: 3289.27,
	        money: 22963.97
	    }, {
	        time: "2015-10-15",
	        start: 6.63,
	        max: 6.9,
	        min: 6.6,
	        end: 6.89,
	        volumn: 2440.37,
	        money: 16575.84
	    }];
	    //数据处理
	    data.sort(function (obj1, obj2) {
	        return obj1.time > obj2.time ? 1 : -1;
	    });
	    data.forEach(function (obj) {
	        obj.range = [obj.start, obj.end, obj.max, obj.min];
	        obj.trend = obj.start <= obj.end ? 0 : 1;
	    });
	    var chart = new GM.Chart({
	        id: 'c1'
	    });
	    //配置刻度文字大小，供PC端显示用(移动端可以使用默认值20px)
	    chart.axis('range', {
	        label: {
	            fontSize: 14,
	            fontFamily: "sans-serif"
	        }
	    });
	    //配置time刻度文字样式
	    var _label4 = {
	        fill: '#979797',
	        font: '14px sans-serif',
	        offset: 6
	    };
	    chart.axis('time', {
	        label: function label(text, index, total) {
	            var cfg = Util.mix({}, _label4);
	            // 第一个点左对齐，最后一个点右对齐，其余居中，只有一个点时左对齐
	            if (index === 0) {
	                cfg.textAlign = 'start';
	            }
	            if (index > 0 && index === total - 1) {
	                cfg.textAlign = 'end';
	            }
	            return cfg;
	        }
	    });
	    chart.source(data, {
	        range: {
	            tickCount: 5
	        },
	        time: {
	            tickCount: 3
	        }
	    });
	    chart.schema().position('time*range').color('trend', function (trend) {
	        return ['#C00000', '#19B24B'][trend];
	    }).shape('candle');
	    chart.render();
	};

	//双 Y 轴
	exports.case18 = function (GM) {
	    GM.Global.pixelRatio = 1;
	    var data = [{ "time": "周一", "tem": 6.9, "rain": 10 }, { "time": "周二", "tem": 9.5, "rain": 13 }, { "time": "周三", "tem": 14.5, "rain": 14 }, { "time": "周四", "tem": 18.2, "rain": 10 }, { "time": "周五", "tem": 21.5, "rain": 12 }, { "time": "周六", "tem": 25.2, "rain": 16 }, { "time": "周日", "tem": 26.5, "rain": 13 }];
	    var chart = new GM.Chart({
	        id: 'c1'
	    });
	    chart.source(data, {
	        tem: {
	            tickCount: 5,
	            max: 30,
	            min: 0
	        },
	        rain: {
	            tickCount: 5,
	            min: 0
	        }
	    });
	    //配置刻度文字大小，供PC端显示用(移动端可以使用默认值20px)
	    chart.axis('time', {
	        label: {
	            fontSize: 14,
	            fontFamily: "SimSun"
	        },
	        grid: null
	    });
	    chart.axis('tem', {
	        label: {
	            fontSize: 14,
	            fontFamily: "sans-serif"
	        }
	    });
	    chart.axis('rain', {
	        label: {
	            fontSize: 14,
	            fontFamily: "sans-serif"
	        }
	    });
	    chart.interval().position('time*tem');
	    chart.line().position('time*rain').color('#5ed470').size(2).shape('smooth');
	    chart.point().position('time*rain').color('#5ed470');
	    chart.render();
	};

	exports.case19 = function (GM) {

	    GM.Global.pixelRatio = 1; //双精度
	    var Shape = GM.Shape;
	    var G = GM.G;
	    var data = [{ pointer: '当前收益', value: 5, length: 2, y: 1.05 }];
	    //自定义绘制数据的的形状      
	    Shape.registShape('point', 'dashBoard', {
	        getShapePoints: function getShapePoints(cfg) {
	            var x = cfg.x;
	            var y = cfg.y;
	            return [{ x: x, y: y }, { x: x, y: 0.5 }];
	        },
	        drawShape: function drawShape(cfg, canvas) {
	            var point1 = cfg.points[0];
	            var point2 = cfg.points[1];
	            point1 = this.parsePoint(point1);
	            point2 = this.parsePoint(point2);
	            G.drawLines([point1, point2], canvas, {
	                stroke: '#18b7d6',
	                lineWidth: 2
	            });
	            var text = cfg.origin._origin.value.toString();
	            G.drawText(text + '%', cfg.center, canvas, {
	                fillStyle: '#f75b5b',
	                font: '30px serif',
	                textAlign: 'center',
	                textBaseline: 'bottom'
	            });
	            G.drawText(cfg.origin._origin.pointer, cfg.center, canvas, {
	                fillStyle: '#ccc',
	                font: '30px SimSun',
	                textAlign: 'center',
	                textBaseline: 'top'
	            });
	        }
	    });
	    var chart = new GM.Chart({
	        id: 'c1'
	    });
	    chart.source(data, {
	        'value': { type: 'linear', min: 0, max: 15, tickCount: 6 },
	        'length': { type: 'linear', min: 0, max: 10 },
	        y: { type: 'linear', min: 0, max: 1 }
	    });
	    chart.coord('polar', {
	        inner: 0,
	        startAngle: -1.25 * Math.PI,
	        endAngle: 0.25 * Math.PI
	    });
	    //配置value轴刻度线
	    chart.axis('value', {
	        tickLine: {
	            strokeStyle: '#b9e6ef',
	            lineWidth: 2,
	            value: -5
	        },
	        //label: null,
	        label: {
	            fontSize: 14,
	            fontFamily: "serif"
	        },
	        grid: null,
	        line: null
	    });
	    chart.axis('y', false);
	    //绘制仪表盘辅助元素
	    chart.guide().arc([0, 1.05], [4.8, 1.05], {
	        strokeStyle: '#18b7d6',
	        lineWidth: 5,
	        lineCap: 'round'
	    });
	    chart.guide().arc([5.2, 1.05], [9.8, 1.05], {
	        strokeStyle: '#ccc',
	        lineWidth: 5,
	        lineCap: 'round'
	    });
	    chart.guide().arc([10.2, 1.05], [15, 1.05], {
	        strokeStyle: '#ccc',
	        lineWidth: 5,
	        lineCap: 'round'
	    });
	    chart.guide().arc([0, 1.2], [15, 1.2], {
	        strokeStyle: '#ccc',
	        lineWidth: 1
	    });
	    chart.guide().text([-0.5, 1.3], '0.00%', {
	        fillStyle: '#ccc',
	        font: '18px serif',
	        textAlign: 'center'
	    });
	    chart.guide().text([7.5, 0.7], '7.50%', {
	        fillStyle: '#ccc',
	        font: '18px serif',
	        textAlign: 'center'
	    });
	    chart.guide().text([15.5, 1.3], '15.00%', {
	        fillStyle: '#ccc',
	        font: '18px serif',
	        textAlign: 'center'
	    });
	    chart.point().position('value*y').size('length').color('#18b7d6').shape('dashBoard');
	    chart.render();
	};

	//带缩放动画和自定义背景的柱状图
	exports.case21 = function () {};
	//带平铺动画的多类型线图
	exports.case22 = function () {};

	//带缩放动画的横向柱状图
	exports.case23 = function () {};
	//带平铺动画的环形饼图
	exports.case24 = function () {};
	//带html辅助元素的折线图
	exports.case25 = function (GM) {};

/***/ })
/******/ ]);