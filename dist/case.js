// { "framework": "Vue" }
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


/***/ })
/******/ ]);