<!--Created by likuan on 7/26 0026.-->
<!--
行
=========================
myid
myclass
mystyle
gutter || g 间隔
-->
<ro>
    <div class="row {myclass}" id="{ myid }">
        <yield/>
    </div>
    <script>
        const s=this;
        s.mixin('mixin');
        //常量
        s.myclass=s._format(opts.myclass)||s._format(opts.c);
        s.myid=s._format(opts.myid)||s._format(opts.i);
        s.gutter=s._format(opts.gutter);

        //特需样式处理
        if(s.gutter){
            $(this.root).find('.col-xs:not(:first):not(:last)').css('padding','0 '+s.gutter/2+"px");
            $(this.root).find('.col-xs:first').css('padding-right',s.gutter/2+"px");
            $(this.root).find('.col-xs:last').css('padding-left',s.gutter/2+"px");
        }
        s.on('mount', function () {
            $('.row',s.root).unwrap();
        });
    </script>
</ro>