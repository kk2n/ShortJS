<Layout>
    <div class="layout" style="padding-top: 130px;padding-left: 300px;">
        <ro>
          <co g="12" t="likuan：" bottom="20">
              <in p="likuan" min="2"  time="400000"></in>
          </co>
        </ro>
        <yield/>
    </div>
    <script>
        //ssssssssassdsasas
        import __ from '../../comm-util/comm'
        import './list.tag'
        const s = this;
        s.mixin('mixin');
        s.dis = 0;
        s.bdrs=0;
        s.a2 = 'ssss';
        s.on('mount', () => {
            $('.layout', s.root).unwrap();
        });
        s.on('update', function () {

        })
    </script>
</Layout>
