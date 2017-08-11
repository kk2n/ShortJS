<!--Created by likuan on 7/26 0026.-->
<!--
输入框组件
==================
说明：
opts：
myid=,i=  ID
myname=,n=  name
myclass=,c=  class
val=,v=  初始值
placeholder=,p=  初始提示
bdrs 圆角
width=,w= 设置style,width
max=   最大字符长度
min=   最小字符长度

pass 类型位密码
number 只能填写整数
float 只能填写浮点数
null  显示为空提示
================
事件
-->
<in>
    <input
            type="{type}"
            id="{myid}"
            class="myinput-c {myclass} {inp-bdrs:bdrs}"
            name="{myname}"
            value="{val}"
            placeholder="{placeholder}"
            onkeyup="{keyup}"
            onfocus="{focus}"
            onblur="{blur}"
            onclick="{click}"
            onchange="{change}"
            maxlength="{max}"
    >
    <script>
        const s = this;
        s.mixin('mixin');
        s.time=opts.timeout||opts.time||1000;
        s.lh = s._format(opts.lh)||s._format(opts.lh)||s._format(opts.h)|| '34';
        //键盘事件
        let tx,tx2;
        keyup(e) {
            $(e.target).val($(e.target).val().trimLeft(' '));
            tx = setTimeout(function () {
                if (opts.number === '') {
                    $(e.target).val(parseInt($(e.target).val()) ? parseInt($(e.target).val()) : '');
                    //仅限数字
                    yanzheng(e,'仅限整数');
                }
                if (opts.float === '') {
                    $(e.target).val(parseFloat($(e.target).val()) ? parseFloat($(e.target).val()) : '');
                    //仅限数字
                    yanzheng(e,'仅限数字');
                }
                opts._k?opts._k(e):'';
                opts._keyup?opts._keyup(e):'';
            }, 600)
        }
        //获得焦点时
        focus(e) {
            clearTimeout(tx);
            $(s.root).find('span').remove();
            opts._f?opts._f(e):'';
            opts._focus?opts._focus(e):'';
        }
        //失去焦点时
        blur(e) {
            $(e.target).val($(e.target).val().trimLeft(' ').trimRight(' '));
            //判断是否为空
            if(opts.null===''){
                if(!$(e.target).val().length){
                    $(s.root).append('<span ' +
                        'style="' +
                        'position: absolute;' +
                        //'top: -34px;' +
                        'right: 10px;' +
                        'line-height: ' +s.lh+'px;'+
                        'color:#f00" onclick=$(this).parent().find("input").focus()>' +
                        '不能为空！</span>')
                }
            }
            //验证长度是否够
            if (opts.min) {
                if($(e.target).val().length<opts.min){
                    $(s.root).append('<span class="err-shu" ' +
                        'style="' +
                        'position: absolute;' +
                        'top: 0;' +
                        'right: 10px;' +
                        'line-height: ' +s.lh+'px;'+
                        'color:#f00">' +
                        '至少'+opts.min+'个字符</span>');
                    tx2=setTimeout(function () {
                        $(s.root).find('span.err-shu').remove();
                    },s.time)
                }
            }
            opts._b ? opts._b(e) : '';
            opts._blur ? opts._blur(e) : '';
        }
        //点击时
        click(e) {
            opts._c ? opts._c(e) : '';
            opts._click ? opts._click(e) : ''
        }
        //改变
        change(e) {
            //输出到父级组件
            opts._ch ? opts._ch(e) : '';
            opts._chang ? opts._chang(e) : ''
        }
        //验证函数
        function yanzheng(x,t) {
            if(!$(x.target).val().length){
                $(s.root).find('span').remove();
                $(s.root).append('<span class="err-shu" ' +
                    'style="' +
                    'position: absolute;' +
                    //'top: -34px;' +
                    'right: 10px;' +
                    'line-height: 34px;' +
                    'color:#f00">' +
                    t+'</span>');
                setTimeout(function () {
                    $(s.root).find('span.err-shu').remove();
                },s.time)
            }else{
                return false
            }
        }


        //装载
        s.on('mount', () => {
            s.update();
        });
        s.on('update',()=>{
            //常量
            s.myclass = s._format(opts.myclass) || s._format(opts.c);
            s.myname = s._format(opts.myname) || s._format(opts.n);
            s.myid = s._format(opts.myid) || s._format(opts.i);

            s.val = s._format(opts.val) || s._format(opts.v);
            s.type = s._format(opts.type) || s._format(opts.t)||'text';
            s.placeholder = s._format(opts.placeholder) || s._format(opts.p);
            s.bdrs = s._format(opts.bdrs);
            s.w = s._format(opts.w)||s._format(opts.width);
            s.lh = s._format(opts.lh)||s._format(opts.lh)||s._format(opts.h)|| '34';
            s.max = s._format(opts.max);

            //处理psaaword
            s.pass = s._format(opts.pass);
            s.pass?s.type='password':'text';
            //处理圆角
            typeof(s.bdrs)==='string'?
                s.bdrs.indexOf('%') < 0 ?
                    $('input', s.root).css('border-radius', parseInt(s.bdrs) + 'px')
                    : $('input', s.root).css('border-radius', parseInt(s.bdrs) + '%')
                :'';
            //处理自定义宽度
            typeof(s.w)==='string'?
                s.w.indexOf('%') < 0 ?
                    $('input', this.root).css('width', parseInt(s.w) + 'px')
                    : $('input', this.root).css('width', parseInt(s.w) + '%')
                :'';
            //处理自定义高度
            typeof(s.lh)==='string'?
                $('input', this.root).css('height', parseInt(s.lh) + 'px').css('line-height', parseInt(s.lh) + 'px')
                : '';
        })
    </script>
</in>