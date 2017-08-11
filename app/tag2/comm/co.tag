<!--Created by likuan on 11/21 0021.-->
<!--
表单项
------------------
grid=,g=    网格值，1-24
myclass=,c= 独立样式
myid=,i= 独立ID
text=,t= 文字
zhongyao,zy   是否重要，前面的"*"标红
lh= 行高
bl= || b=            左右比例,b="1:1:2",表示左：右：总,左右在总宽的占比;b="1:1"，左右的比例
例：左：右：总比
<co g="8" t="姓名：" b="1:1:2" z="1"></co>
或：左：右（为百分比30%：70%）
<co g="8" t="姓名：" b="30:50"></co>
或：左
<co g="8" t="姓名：" b="30"></co>//左边的百分比


px=||p=           设置左右的px值
例如
<co g="8" t="姓名：" p="120:150"></co>
<co g="8" t="姓名：" p="120"></co>//左边的px
-->
<co>
    <div class="col-xs col-xs-{ grid } { myclass }" if="{is_bl}" id="{ myid }">
        <div class="{fl:text} tag-cols-left" if="{ text }" style="width:{ble}%"><span
                class="{ dn:zhongyao=='true' || zhongyao=='1'?0:1 }">*</span>{ text }
        </div>
        <div class="tag-cols-right {fl:text} {cols-t-center:center}" style="width:{br}%">
            <yield/>
        </div>
    </div>

    <div class="col-xs col-xs-{ grid } { myclass }" if="{is_px}" id="{ myid }">
        <div class="{fl:text} tag-cols-left" if="{ text }" style="width:{ ble }"><span
                class="{ dn:zhongyao=='true' || zhongyao=='1'?0:1 }">*</span>{ text }
        </div>
        <div class="tag-cols-right {fl:text} {cols-t-center:center}" style="width:{br}">
            <yield/>
        </div>
    </div>

    <div class="col-xs col-xs-{ grid } { myclass }" if="{!is_bl && !is_px}">
        <div class="fl tag-cols-left" if="{ text }">
            <span class="{ dn:zhongyao=='true' || zhongyao=='1'?0:1 }">*</span>{ text }
        </div>
        <div class="tag-cols-right {fl:text} {cols-t-center:center}">
            <yield/>
        </div>
    </div>
    <script>
        const s = this;
        s.mixin(mixin);
        //常量
        s.myclass=s._format(opts.myclass)||s._format(opts.c);
        s.myid=s._format(opts.myid)||s._format(opts.i);
        s.grid=s._format(opts.grid)||s._format(opts.g);
        s.zhongyao=s._format(opts.zhongyao)||s._format(opts.zy);
        s.text=s._format(opts.text)||s._format(opts.t);
        s.center=s._format(opts.center)||s._format(opts.tc);
        s.is_bl=s._format(opts.bl)||s._format(opts.b)||'';
        s.lh=s._format(opts.lh);
        s.tb=s._format(opts.tb);
        s.top=s._format(opts.top);
        s.bottom=s._format(opts.bottom);

        //左右比例处理
        if (s.is_bl) {
            s.is_bl = s.is_bl.split(':');
            if (s.is_bl.length === 1) {
                s.ble =s.is_bl[0]/100* 100;
                s.br = 100-s.ble;
                s.ble=s.ble.toFixed(4);
                s.br=s.br.toFixed(4);
            }else if (s.is_bl.length === 2) {
                s.ble =s.is_bl[0]/100* 100;
                s.br = s.is_bl[1]/100* 100;
                s.ble=s.ble.toFixed(4);
                s.br=s.br.toFixed(4);
            } else if (s.is_bl.length === 3) {
                s.ble = (s.is_bl[0] / s.is_bl[2]) * 100;
                s.br = (s.is_bl[1] / s.is_bl[2]) * 100;
                s.ble=s.ble.toFixed(2);
                s.br=s.br.toFixed(2);
            }
        }
        //左右比例处理px
        s.is_px=s._format(opts.width)||s._format(opts.w);
        if (s.is_px) {
            s.is_px = s.is_px.split(':');
            if (s.is_px.length === 1) {
                s.ble =s.is_px[0]+'px';
                s.br = 'auto';
            }else if (s.is_px.length === 2) {
                s.ble =s.is_px[0]+'px';
                if(s.is_px[1]==='auto'){
                    s.br = s.is_px[1];
                }else{
                    s.br = s.is_px[1]+'px';
                }
            }
        }
        s.on('mount',()=>{
            //行高处理
            if(s.lh){
                $('.tag-cols-left,.tag-cols-right',s.root).css('line-height',s.lh+'px')
            }
            //处理margin
            if(s.tb){
                s.tb=s.tb.split(':');
                if(s.tb.length===1){
                    $('.tag-cols-left,.tag-cols-right',s.root).css('margin-top',s.tb[0]+'px').css('margin-bottom',s.tb[0]+'px')
                }
                if(s.tb.length===2){
                    $('.tag-cols-left,.tag-cols-right',s.root).css('margin-top',s.tb[0]+'px').css('margin-bottom',s.tb[1]+'px')
                }
            }
            if(s.top){
                $('.tag-cols-left,.tag-cols-right',s.root).css('margin-top',s.top+'px')
            }
            if(s.bottom){
                $('.tag-cols-left,.tag-cols-right',s.root).css('margin-bottom',s.bottom+'px')
            }
            $('.col-xs',s.root).unwrap();
        });
    </script>
</co>