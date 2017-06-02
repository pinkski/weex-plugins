## weex-chart 能提供什么?
weex图表插件是通过g2-mobile依赖gcanvas插件实现的,而通过weex图表插件你能够实现的图表如下
[G2-mobile 图表示例](https://antv.alipay.com/g2-mobile/demo/index.html),相信已经能够满足大部分图表的需求

## weex-chart 怎么用?

```js
<chart id="c1" width="750" height="400"></chart>
```

```js
var G2=require('weex-chart')('g2');//使用g2这个chart 目前只支持g2-mobile
module.exports={
        ready:function(){
            var chart = new GM.Chart({
                    id: 'c1'
            });
            ...
            chart.render()
        }
}
```

G2-mobile语法请参照 g2-mobile 不支持内容 由于g2-mobile是给浏览器页面设计的 weex环境与浏览器环境有较大差异 因此一些g2-mobile的功能暂时无法支持,主要如下

* animate 动画

* guide 辅助线

如果您发现有别的特性或者api 无法支持 或者支持不好 请提交issue 谢谢

## 本项目介绍
```
.
├── case.js        例子
├── demo.we        读取例子
├── include
│   ├── example-list-item.we        列表cell
│   └── example-list.we             列表
├── index.vue
├── index.we         入口文件
└── package.json
```

#### 如何打包dist
```
npm run dev
```