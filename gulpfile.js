//导入依耐
const gulp = require('gulp');
const babel = require("gulp-babel");
const plugins = require('gulp-load-plugins')();//自动加载插件，调用时用驼峰命名
const plumber = require('gulp-plumber');//忽略错误
const include = require('gulp-html-tag-include'); //incdule功能
const htmlbeautify = require('gulp-html-beautify'); //html格式化
const replace = require('gulp-replace');
//导入配置
const port = require('./port_config');
const url = require('./path_config');



//API服务器---------------------------------------------------
const path = require('path');
const nodemon = require('gulp-nodemon');
const browserSync = require('browser-sync').create();
const server = path.resolve(__dirname, 'API');
gulp.task('browser-sync', ['nodemon'], function () {
    browserSync.init(null, {
        //proxy: "http://localhost:57", // 代理web服务器端口
        //port: 57
    });
});
// browser-sync 监听文件
gulp.task('api', ['browser-sync'], function () {
    gulp.watch(['./API/API.js', './API/**'], ['bs-delay']);
});
// 延时刷新
gulp.task('bs-delay', function () {
    setTimeout(function () {
        browserSync.reload();
    }, 1000);
});
// 服务器重启
gulp.task('nodemon', function (cb) {
    // 设个变量来防止重复重启
    var started = false;
    var stream = nodemon({
        script: './API/server.js',
        // 监听文件的后缀
        ext: "js",
        env: {
            'NODE_ENV': 'development'
        },
        // 监听的路径
        watch: [
            server
        ]
    });
    stream.on('start', function () {
        if (!started) {
            cb();
            started = true;
        }
    }).on('crash', function () {
        console.error('application has crashed!\n')
        stream.emit('restart', 10)
    })
});





//WEB服务器---------------------------------------------------
gulp.task('connect', () => {
    plugins.connect.server({
        port: port.webServerPort,
        host: '127.0.0.1',
        root: './app',
        "startPath": "/",
        livereload: true
    })
});
//重启connect服务器
gulp.task('re-server', () => {
    plugins.connect.reload();//自动刷新
});






//模板处理------------------------------------------------------
// riot
const riot = require('gulp-riot');
gulp.task('watch-riot', () => {
    gulp.watch(
        [
            url.App.Root + '/tag/**/' + '*.tag'
        ],
        function (event) {
            let path = event.path;
            let fileName = path.substring(path.lastIndexOf('\\') + 1);
            gulp.src(url.App.Root + '/tag/**/' + fileName)
                .pipe(riot({
                    compact: 'Minify'
                }))
                .pipe(plumber())//忽略错误
                .pipe(gulp.dest(url.App.Root + '/tag'))
        })
});
//Svelte
const gulpSvelte = require('gulp-svelte');
gulp.task('watch-svelte', () => {
    gulp.watch(
        [
            url.App.Root + '/svelte/**/*.html'
        ],
        function (event) {
            let str = event.path, str2, str3;
            str = str.substring(str.lastIndexOf('\\') + 1);//文件名
            str2 = event.path.substring(0, event.path.lastIndexOf('\\'));
            str2 = str2.substring(str2.lastIndexOf('\\') + 1);
            str3 = str.substring(0, str.lastIndexOf('.'));
            gulp.src([url.App.Root + "/svelte/**/*.html"])
                .pipe(gulpSvelte(
                    {
                        format: 'iife', filename: str, name: str3
                        // format – defaults (ES2015 modules), can also be 'amd', 'cjs', 'umd', 'iife' or 'eval'
                    }
                ))
                .pipe(gulp.dest(url.App.Root + '/svelte'))
        });
});
//rollup编译工具
const fs = require('fs');
const rollup = require('rollup').rollup;
const commonjs = require('rollup-plugin-commonjs');
const nodeResolve = require('rollup-plugin-node-resolve');
//rollup编译vue依耐
const vue = require('rollup-plugin-vue2');
const buble = require('rollup-plugin-buble');
const css = require ('rollup-plugin-css-only');
const scss = require ('rollup-plugin-scss');
const uglify2 = require('rollup-plugin-uglify');
const stylus = require('stylus');
const image = require('rollup-plugin-image');
const multiEntry = require('rollup-plugin-multi-entry');
const riot2= require('rollup-plugin-riot');
const babel2 = require("rollup-plugin-babel");
const CleanCSS = require('clean-css');
//vue
gulp.task('watch-entry', function () {
    return gulp.watch([
        url.App.Root + '/vue/*/' + '*.entry.js',
    ], function (event) {
        let str = event.path, str2;
        str = str.substring(str.lastIndexOf('\\') + 1);//文件名
        str2 = event.path.substring(event.path.lastIndexOf('vue\\'), event.path.lastIndexOf('\\'));
        str2 = str2.substring(str2.lastIndexOf('\\') + 1);//所在目录
        let str3 = event.path.substring(event.path.lastIndexOf('vue\\'), event.path.lastIndexOf('\\'));//所在完整目录
        return rollup({
            entry: {
                include: [url.App.Root + '/vue/' + str2 + '/' + '*.entry.js'],
                // exclude: ['those/files.js', 'and/globs/*.to.be.excluded.js']
            },
            plugins: [
                multiEntry(),
                vue({
                    compileTemplate: true
                }),
                //riot2(),
                css({ output: url.App.Root + '/' + str3 + '/' +str.replace('.entry.js','')+'.css' }),
                scss({output: function (styles, styleNodes) {
                    let output = new CleanCSS().minify(styles);
                    //console.log(output);
                    write(
                        url.App.Root + '/' + str3 + '/' +str.replace('.entry.js','')+'.css',
                        output.styles)
                }}),
                buble(),
                nodeResolve({jsnext: true, main: true }),
                commonjs(),
                babel2({
                    exclude: 'node_modules/**',
                    presets: [ "es2015-rollup" ]
                }),
                uglify2()
            ],
        })
        //处理js文件
            .then(function (bundle) {
                let code = bundle.generate({
                    format: 'umd',
                    moduleName: 'main',
                    useStrict: false
                }).code;
                return write(url.App.Root+'/' + str3 + '/' +str.replace('.entry.js','')+ '.js', code).then(function () {
                    return code
                })
            }).catch(logError)
    });
});
gulp.task('watch-vue', function () {
    return gulp.watch([
        url.App.Root + '/vue/*/*/' + '*.vue',
        url.App.Root + '/vue/*/*/' + '*.scss'
    ], function (event) {
        let str = event.path, str2;
        str = str.substring(str.lastIndexOf('\\') + 1);//文件名
        str2 = event.path.substring(event.path.lastIndexOf('vue\\'), event.path.lastIndexOf('\\'));
        str2 = str2.substring(str2.lastIndexOf('\\') + 1);//所在目录
        let str3 = event.path.substring(event.path.lastIndexOf('vue\\'), event.path.lastIndexOf('\\'));//所在完整目录
        let str4=str3.substring(str3.indexOf('\\')+1,str3.lastIndexOf('\\'));//modules路径
        return gulp.src( url.App.Root + '/vue/'+str4+'/'+ '*.entry.js') // 匹配文件
            .pipe(replace('', ''))
            .pipe(gulp.dest('./app/vue/'+str4));  // 输出路径
    })
});
gulp.task('watch-entry-tag', function () {
    return gulp.watch([
        url.App.Root + '/tag2/*/' + '*.entry.js',
    ], function (event) {
        let str = event.path, str2;
        str = str.substring(str.lastIndexOf('\\') + 1);//文件名
        str2 = event.path.substring(event.path.lastIndexOf('tag2\\'), event.path.lastIndexOf('\\'));
        str2 = str2.substring(str2.lastIndexOf('\\') + 1);//所在目录
        let str3 = event.path.substring(event.path.lastIndexOf('tag2\\'), event.path.lastIndexOf('\\'));//所在完整目录
        return rollup({
            entry: {
                include: [url.App.Root + '/tag2/' + str2 + '/' + '*.entry.js'],
                // exclude: ['those/files.js', 'and/globs/*.to.be.excluded.js']
            },
            plugins: [
                multiEntry(),
                riot2(),
                css({ output: url.App.Root + '/' + str3 + '/' +str.replace('.entry.js','')+'.css' }),
                scss({output: function (styles, styleNodes) {
                    let output = new CleanCSS().minify(styles);
                    write(
                        url.App.Root + '/' + str3 + '/' +str.replace('.entry.js','')+'.css',
                        output.styles)
                }}),
                buble(),
                commonjs(),
                babel2({
                    exclude: 'node_modules/**',
                    presets: [ "es2015-rollup" ]
                }),
                uglify2()
            ],
        })
        //处理js文件
            .then(function (bundle) {
                let code = bundle.generate({
                    format: 'iife',
                    moduleName: 'main',
                    useStrict: true
                }).code;
                return write(url.App.Root+'/' + str3 + '/' +str.replace('.entry.js','')+ '.js', code).then(function () {
                    return code
                })
            })//.catch(logError)
    });
});
gulp.task('watch-tag', function () {
    return gulp.watch([
        url.App.Root + '/tag2/*/*/' + '*.tag',
        url.App.Root + '/tag2/*/*/' + '*.scss',
        url.App.Root + '/tag2/*/*/' + '*.js',
    ], function (event) {
        let str = event.path, str2;
        str = str.substring(str.lastIndexOf('\\') + 1);//文件名
        str2 = event.path.substring(event.path.lastIndexOf('tag2\\'), event.path.lastIndexOf('\\'));
        str2 = str2.substring(str2.lastIndexOf('\\') + 1);//所在目录
        let str3 = event.path.substring(event.path.lastIndexOf('tag2\\'), event.path.lastIndexOf('\\'));//所在完整目录
        let str4=str3.substring(str3.indexOf('\\')+1,str3.lastIndexOf('\\'));//modules路径
        //console.log(str4);
        return gulp.src( url.App.Root + '/tag2/'+str4+'/'+ '*.entry.js') // 匹配文件
            .pipe(replace('', ''))
            .pipe(gulp.dest('./app/tag2/'+str4));  // 输出路径
    })
});
function write(dest, code) {
    return new Promise(function (resolve, reject) {
        fs.writeFile(dest, code, function (err) {
            if (err) return reject(err);
            resolve()
        })
    })
}
function logError(e) {
    //console.log(e)
}
//rollup编译riot,支持es6语法




//监控es6文件,转成es5-------------------------------
gulp.task('watch-es6', function () {
    return gulp.watch([
        url.App.Root + '/vue/*/' + '*.es6.js',
    ], function (event) {
        let str = event.path, str2;
        str = str.substring(str.lastIndexOf('\\') + 1);
        str2 = event.path.substring(0, event.path.lastIndexOf('\\'));
        str2 = str2.substring(str2.lastIndexOf('\\') + 1);
        return rollup({
            entry: url.App.Root + '/vue/' + str2 + '/' + str,
            moduleName: 'MyModule',
            plugins: [
                nodeResolve({jsnext: true }),
                commonjs(),
            ]
        }).then(function (bundle) {
            bundle.write({
                format: 'umd',
                dest: url.App.Root + '/vue/' + str2 + '/' + str.replace('.es6', '')
            });
        });
    });
});







//sass处理-------------------------------------------
// 公共css
gulp.task('watch-comm-sass', function () {
    return gulp.watch([
        url.App.Sass + '/' + 'comm*.scss',
        url.App.Root + '/' + 'tag/comm/*.scss',
        url.App.Root + '/' + 'tag/comm-tag/*.scss',
        url.App.Root + '/' + 'tag/comm-module/*.scss',
        url.App.Root + '/' + 'vue/comm/*.scss',
        '!' + url.App.Sass + '/' + '_*.scss',
        '!' + url.App.Sass + '/' + 'scss.scss',
        '!' + url.App.Sass + '/' + 'css.scss',
        '!' + url.App.Sass + '/' + 'all.scss'

    ], function (event) {
        let str = event.path;
        str = str.substring(str.lastIndexOf('\\') + 1);
        gulp.src([
            url.App.Sass + '/' + str,
            url.App.Root + '/tag/**/' + str,
            url.App.Root + '/vue/**/' + str
        ])
            .pipe(plumber())
            .pipe(plugins.sass().on('error', plugins.sass.logError))
            .pipe(plugins.autoprefixer({//指定生成不同版本的css前缀
                browsers: ['last 3 versions', 'Android >= 4.0', 'last 3 Explorer versions', 'opera 15'],
                remove: true //是否去掉不必要的前缀 默认：true
            }))
            .pipe(gulp.dest(url.App.Css));
    });
});
gulp.task('watch-concat-css', function () {
    return gulp.watch([
        url.App.Css + '/' + '*.css',
        url.App.Css + '/**/' + '*.css',
        '!' + url.App.Css + '/' + '*.*.css',
        '!' + url.App.Css + '/' + 'all.css',
        '!' + url.App.Css + '/' + 'scss.css',
        '!' + url.App.Css + '/' + 'css.css'], ['concat-css']);
});
gulp.task('concat-css', function () {
    return gulp.src([
        url.App.Css + '/' + '*.css',
        url.App.Css + '/**/' + '*.css',
        '!' + url.App.Css + '/' + '*.*.css',
        '!' + url.App.Css + '/' + 'all.css',
        '!' + url.App.Css + '/' + 'scss.css',
        '!' + url.App.Css + '/' + 'css.css'])
        .pipe(plugins.concat('comm.min.css'))//合并后的文件名
        .pipe(plugins.minifyCss())
        .pipe(plumber())//忽略错误
        .pipe(gulp.dest(url.View.Css))
        .pipe(plugins.connect.reload());
});
//页面样式
gulp.task('watch-temp-sass', function () {
    return gulp.watch([
        url.App.Root +'/tag/**/*.scss',
        '!'+url.App.Root +'/tag/comm-tag/*.scss',
        '!'+url.App.Root +'/tag/comm-module/*.scss',
    ], function (event) {
        let str = event.path;
        str = str.substring(str.lastIndexOf('\\') + 1);
        gulp.src([
            url.App.Root + '/*/**/' + str,
            '!'+url.App.Root +'/tag/comm/*.scss',
            '!'+url.App.Root +'/tag/comm-tag/*.scss',
            '!'+url.App.Root +'/tag/comm-module/*.scss'
        ]) // 匹配文件
            .pipe(plumber())
            .pipe(plugins.sass().on('error', plugins.sass.logError))
            .pipe(plugins.autoprefixer({//指定生成不同版本的css前缀
                browsers: ['last 3 versions', 'Android >= 4.0', 'last 3 Explorer versions', 'opera 15'],
                remove: true //是否去掉不必要的前缀 默认：true
            }))
            .pipe(plugins.minifyCss())
            .pipe(gulp.dest('./app/'));
    });
});
// sass任务集合
gulp.task('watch-sass', ['watch-comm-sass', 'watch-concat-css','watch-temp-sass']);





// html处理，【代码美化，压缩，和include功能】-------------------------------------
gulp.task('watch-html', function () {
    return gulp.watch([
        url.App.Html + '/*.html',
        url.App.Html + '/**/*.html',
        url.App.Html + '/**/**/*.html',
        '!' + url.App.Html + '/comm/*.html',
        '!' + url.App.Html + '/modules/*.html'
    ], function (event) {
        let str = event.path;
        str = str.substring(str.lastIndexOf('\\') + 1);
        let options = {
            indentSize: 2
        };
        gulp.src([
            url.App.Html + '/**/'+str,
            '!' + url.App.Html + '/comm/*.html',
            '!' + url.App.Html + '/modules/*.html'
        ])
            .pipe(include())
            .pipe(plumber())//忽略错误
            .pipe(htmlbeautify(options))//整理格式
            .pipe(gulp.dest(url.App.Root + '/view/'))
    });
});
//项目打包--压缩成zip文件
gulp.task('zip', function () {
    return gulp.src(['./app/**', './gulpfile.js', './package.json', './.gitignore'])
        .pipe(zip('app-bak.zip'))
        .pipe(gulp.dest('backup'));
});
//vlib
gulp.task('vlib', function () {
    return gulp.src([
        './app/scripts/vlib/*.js',
        '!./app/scripts/vlib/*.c.js',
        '!./app/scripts/vlib/*.m.js'
    ])
        .pipe(plugins.concat('vlib.c.js', {newLine: '\n//注释：文件分割\n'}))
        .pipe(gulp.dest('./app/scripts/vlib'))
        .pipe(plugins.uglify())//压缩JS
        .pipe(plugins.rename('vlib.m.js'))
        .pipe(gulp.dest('./app/scripts/vlib'))
});
//tlib
//合并统一工具
gulp.task('tlib', function () {
    return gulp.src([
        './app/scripts/tlib/*.js',
        '!./app/scripts/tlib/*.c.js',
        '!./app/scripts/tlib/*.m.js'
    ])
        .pipe(plugins.concat('tlib.c.js', {newLine: '\n//注释：文件分割\n'}))
        .pipe(gulp.dest('./app/scripts/tlib'))
        .pipe(plugins.uglify())//压缩JS
        .pipe(plugins.rename('tlib.m.js'))
        .pipe(gulp.dest('./app/scripts/tlib'))
});


//任务集合--------------------------------------------------------
gulp.task('go', [
    'connect',
    'watch-html',
    'watch-sass',
    'watch-es6',
    'watch-riot',
    'watch-entry',//监控一级目录
    'watch-vue',//监控二级目录
    'watch-entry-tag',//监控一级目录
    'watch-tag',//监控二级目录
]);

