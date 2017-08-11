import __ from '../../comm-util/comm'
let store=new Store();
//定义数据
store.todos=[
    { title: 'Task 1sss', done: false },
    { title: 'Task 2', done: false }
];
//初始化事件
store.on('init', function() {
    this.emit('up', store.todos)
});

//添加
store.on('add', function(newTodo) {
    store.todos.push(newTodo);
    this.emit('up', store.todos)
});

//删除
store.on('del', function(e) {
    store.todos=_.reject(store.todos,  a => a===e.item);
    this.emit('up', store.todos)
});


export {store}