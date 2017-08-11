# ShortJS
 
首先，欢迎各位访问者，您的到来是我莫大的荣幸，同时也恭喜您...

ShortJS前端开发库，之所以叫short(短小)，其目的只有一个，是您用最小的代码，完成您的任务！如何做到这一点呢？？？？
    
先举个例子：
 
样式的写法：
```
.radio-c{
  @include ss(() (m 0));
  &>label {
    @include ss(() (fl)(t 5));
  }
  &>samp{
    @include ss(() (fl)(fw)(pl 8)(mt 5)(ff $ff-yh));
  }
}
```
或者 
```
.sys-page-tit{
  @include ss(() (who) (por) (ml 270) (mt 50));
}
.sys-inde-main {
  @include ss(() (wh) (por) (ml 270));
}
```
你仔细看看，有什么不同？？？？
