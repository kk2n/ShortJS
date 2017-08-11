# ShortJS
 
首先，欢迎各位访问者，您的到来是我莫大的荣幸，同时也恭喜您...

ShortJS前端开发库，之所以叫short(短小)，其目的只有一个，是您用最小的代码，完成您的任务！如何做到这一点呢？？？？
    
先举个例子：
    
样式的写法：
```
.radio-c{
  @include ss((who 100% 34) (m 0) (p 2 10) (lh 34px) (bd 1) (bgc #f00) (c #333));
  &>label {
    @include ss((fz 14) (fl) (t 5) (por) (z 1));
  }
  &>samp{
    @include ss((fl) (fw) (pl 8) (mt 5) (ff $ff-yh) (d1) );
  }
}
```
你仔细看看，有什么不同？？？？
如果你有前端的经验，或者熟悉Emment,或许你能知道最后会生成什么样式!!!!
    
        
好了 ，我们再来看一段HTML.....
    
```
<div class="layout">
    <ro>
      <co g="12" t="姓名：" tb="20">
          <in p="请输入您的名字" min="2" max='4' null time="400000"></in>
      </co>
      <co g="12" t="密码：" tb="20">
          <in pass min="6" max='12' null></in>
      </co>
    </ro>
    <ro>
        <co>
            <bn blue dis={p().dis} bdrs center>确定</bn>
        </co>
    </ro>
</div>
```
呵呵 估计你看的有点懵...
    
这就是 ShortJS框架...
    一个样式表中的属性由你自己去定义，html中的标签和属性也由你自己去设置...并且组件化，能重复使用，你只要设定几个简单属性就能得到你想要的效果...
    当然，shortJS远远不止这些..他是一套完善的前端开发系统.....
    您甚至可以用类似flux的开发架构布局，将所有的数据和方法集中起来管理...
    或者，您在项目中要用到前端路由...编译VUE模板...又或者想体验最新的svelte
    数据方面，采用mockserver模拟JSON数据，天生支持跨域....
    shortJS都为您考虑到了
    
    
