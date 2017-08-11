<!--Created by likuan on 7/26 0026s.-->
<!--
按钮
==================================
myclass=,c=
myid=,i=
myname=,n=

单值-------
颜色---
blue
green
red
orange
info
nobg
dotted 边框设为虚线

fill 填充
anim 动画，渐变，过滤效果

big   大
big2  很大
small 小 字体为12，padding：2px 4px
bdrs  设置为圆角,bdrs="10"圆角为10px，bdrs="10%"圆角为10%


center 按钮居中
disabled 禁用
dis 禁用


ico=  设置图标
op 按钮设置透明度

事件
_click={}
_c={}

-->
<bn>
    <button
            class="{'btn':1,'btn-default':1,'btn-blue':blue,'btn-green':green,'btn-orange':orange,'btn-info':info,'btn-red':red,'btn-nobg':nobg,'btn-dotted':dotted,'btn-fill':fill,'btn-big':big,'btn-big2':big2,'btn-small':small,'btn-bdrs':bdrs,'btn-center':center,'anim':anim} {myclass}"
            id="{ myid }"
            disabled="{disabled:disabled}"
            name="{myname}"
            onclick="{click}"
            onmouseenter="{enter}"
            onmouseleave="{leave}"
    >
        <i if="{ico}" class="glyphicon glyphicon-{ico}"></i>{text}
        <yield/>
    </button>
    <script>
        const s = this;
        s.mixin('mixin');
        s.on('mount', () => {
            s.update();
        });
        s.on('update', () => {
            //常量
            s.myclass = s._format(opts.myclass) || s._format(opts.c);
            s.myname = s._format(opts.myname) || s._format(opts.n);
            s.myid = s._format(opts.myid) || s._format(opts.i);
            //色彩
            s.blue = s._format(opts.blue);
            s.green = s._format(opts.green);
            s.red = s._format(opts.red);
            s.orange = s._format(opts.orange);
            s.info = s._format(opts.info);
            s.nobg = s._format(opts.nobg);
            s.fill = s._format(opts.fill) || s._format(opts.f);
            s.big = s._format(opts.big);
            s.big2 = s._format(opts.big2);
            s.small = s._format(opts.small) || s._format(opts.sm);
            s.bdrs = s._format(opts.bdrs);
            s.dotted = s._format(opts.dotted) || s._format(opts.dd);
            s.ico = s._format(opts.bdrs);
            s.w = s._format(opts.width) || s._format(opts.w);
            s.h = s._format(opts.lineheight) || s._format(opts.lh);
            s.text = s._format(opts.text) || s._format(opts.t);
            s.center = s._format(opts.center) || s._format(opts.jz);
            s.anim = s._format(opts.anim) || s._format(opts.dh);
            s.op = s._format(opts.opacity) || s._format(opts.op);
            s.disabled = s._format(opts.disabled) || s._format(opts.dis);
            //特殊样式
            s.bdrs && s.bdrs !== 1?
                s.bdrs.indexOf('%') < 0 ?
                    $('button', s.root).css('border-radius', parseInt(s.bdrs) + 'px')
                    :
                    $('button', s.root).css('border-radius', parseInt(s.bdrs) + '%')
                    :'';
            s.w ?
                s.w.indexOf('%') < 0?
                    $('button', s.root).css('width', parseInt(s.w) + 'px')
                    :
                    $('button', s.root).css('width', parseInt(s.w) + '%')
                    :'';
            s.op?
                $('button', s.root).css('opacity', parseFloat(s.op)):'';
            //点击事件
            opts._click ?
                s.click = function (e) {opts._click(e)} : '';
            opts._c ?
                s.click = function (e) {opts._c(e)} : '';
            opts._enter ?
                s.enter = function (e) {opts._enter(e)} : '';
            opts._over ?
                s.enter = function (e) {opts._over(e)} : '';
            opts._e ?
                s.enter = function (e) {opts._e(e)} : '';
            opts._l ?
                s.leave = function (e) {opts._l(e)} : '';
            opts._leave ?
                s.leave = function (e) {opts._leave(e)} : '';
            opts._out ?
                s.leave = function (e) {opts._out(e)} : '';
            //移除标签
            $('button', s.root).unwrap();
        });
    </script>
</bn>