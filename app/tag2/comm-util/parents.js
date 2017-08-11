/**
 * Created by likuan on 8/9 0009.
 */

let ps = function (count) {
    let p;
    p = this.parent;
    while (count > 0) {
        if (p.parent) {
            p = p.parent;
        } else {
            break;
        }
        count--;
    }
    return p;
};
export default ps;


// 用法
/*
 import ps from '../comm-util/parents'
 this.mixin({ps});
  <layout>
        <ro>{ps(1)test}</ro>
  </layout>

  有几层 ps(n),n就等几
*/