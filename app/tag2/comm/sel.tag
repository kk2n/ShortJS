<!--Created by likuan on 11/4 0004.-->
<!--
单选下拉框---组件
myclass   样式名
myid      组件中隐藏域id
init_t    初始文字
init    初始文字
text    初始文字
init_val  初始值
val        初始值
yid        初始值
data      数据
clickfn   点击选项后的事件
get_val   点击选项后的事件
-->
<sel>
    <div class="dropdown sel-zujian my-select {myclass}">
        <a data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="true">
            <samp class="init-c">{text}</samp>
            <span></span>
            <input type="hidden" name="{myname}" id="{myid}" data-t="{text}" value="{val}" data-yid="{yid}">
        </a>
        <div class="dropdown-menu option-c" aria-labelledby="dLabel">
            <ul>
                <li each='{data || [{"id":"","name":"暂无"}]}' data-val="{id}" data-yid="{yid}" onclick="{getval}">{name}</li>
            </ul>
        </div>
    </div>
    <script>
        var s=this;
        s.data=$.isEmptyObject(opts.data)?'':opts.data;
        s.myclass=opts.myclass || opts.c;
        s.myname=opts.myname || opts.n;
        s.myid=opts.myid || opts.i;
        s.val=opts.val || opts.v || opts.init_val || '';
        s.text= opts.text || opts.txt || opts.t || opts.init_t || opts.init_txt || opts.init || "请选择..";
        s.yid=opts.yid;
        s.getval=function(e){
            $(e.target).parent().parent().parent().find('.init-c').text($(e.target).text());
            $(e.target).parent().parent().parent().find('input[type="hidden"]')
                .val($(e.target).attr('data-val'))
                .attr("data-t",$(e.target).text())
                .attr("data-yid",$(e.target).attr('data-yid'));
            opts.getval?opts.getval($(e.target).attr('data-val'),$(e.target).text()):$.noop();
        };
    </script>
</sel>