<!--Created by likuan on 8/4 0004d.-->
<list>
    <div class="list">
        <div each="{items}" onclick="{del}">{title}</div>
        <bn blue _c="{add}">添加2</bn>
    </div>

    <script>
        import __ from '../../comm-util/comm'
        const s = this;
        s.items=[];
        __.on('up', function(items) {
            s.items = items;
            s.update();
        });
        add(){
            __.emit('add',{ title: "eeeee"});
        }
        del(e){
            __.emit('del',e);
        }
        s.on('mount', () => {
            $('.list',s.root).unwrap();
            __.emit('init');
        });

    </script>
</list>