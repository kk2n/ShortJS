<!--Created by likuan on 8/9 0009.-->
<parent>
    <yield/>
    <script>
        import parent from '../comm-util/parent'
        this.mixin(parent);
        this.on('mount',()=>{
            $(this.root).children().unwrap();
            this.update();
        });
    </script>
</parent>