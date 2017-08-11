<!--Created by likuan on 8/3 0003.-->
<sel  onclick="{clk}">
    <select class="myselect {myclass}" id="{myid}" name="{myname}">
        <option each="{data}" value="{id}">{name}</option>
    </select>
    <script>
        const s=this;

        s.myclass=opts.myclass;
        s.myid=opts.myid;
        s.myname=opts.myname;
        s.data=opts.data;
        s.placeholder=opts.placeholder;
        s.prefix=opts.prefix;
        s.cycle=opts.cycle;
        s.links=opts.links;
        s.size=opts.size;
        s.onChange=opts.ifchage||opts._change ||opts._ch ||function () {};
        s.on('mount',function(){
            $('select',s.root).selectOrDie({
                prefix: '',
                cycle: true,
                onChange: function(){
                    s.onChange($(this).val(),$('option[value="'+$(this).val()+'"]',s.root).text());
                }
            });
            $('.sod_option',s.root).on('click', (e)=> {
                opts.ifclick?opts.ifclick($(e.target).attr('data-value'),$(e.target).text()):'';
                opts._c?opts._c($(e.target).attr('data-value'),$(e.target).text()):'';
                opts._click?opts._click($(e.target).attr('data-value'),$(e.target).text()):''
            })
        });
    </script>
</sel>