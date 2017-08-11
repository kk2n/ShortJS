/**
 * Created by likuan on 7/18 0018.
 */
module.exports =  {
    App: {//开发目录
        Root: './app',     //开发目录
        Sass: './app/sass',//开发中的sass所在的目录
        Js: './app/js',    //开发目录中的js目录
        Css: './app/style', //开发目录中的css目录
        Html: './app/html' //开发目录中的html文件，include文件目录
    },
    View: {//视图目录，用于浏览测试
        Root: 'app',
        Js: 'app/scripts',
        Css: 'app/css'
    },
    Demo: {//最后输出的目录
        Root: 'demo',
        Js: 'demo/scripts',
        Css: 'demo/css'
    }
};