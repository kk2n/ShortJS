const Mock = require('mockjs');

module.exports = {
    // 时光抽，，评论详情
    sgc_info_pingjia: Mock.mock({
            'id': 1,
            'title|20-40': '@cword',
            'time': '@date',
            'g_tag|3-4': '@cword',
            'jianjie': '',
            'content|2': [
                {
                    "id|+1": 1,
                    "name|4-7": "@cword",
                    "ziji|2": [
                        {
                            "id|+1": 1,
                            "name|4-6": "@cword",
                            "check|1": ["1", "2", "3", "4"]
                        }
                    ],
                }
            ],
            'yijian|20-50': '@cword'
        }),
    // 时光抽，，测评详情
    sgc_info_cp: Mock.mock({
        'id': 1,
        'title|20-40': '@cword',
        'time': '@date',
        'g_tag|3-4': '@cword',
        'content|2': [
            {
                "id|+1": 1,
                "title|4-7": "@cword",
                "time": "2015-03-31 34:34:34",
                "jianjie|4-7": "@cword",
                "img": "../../img/bfs.png",
                'url': '33333'
            }
        ]
    }),
    // 时光抽，，测评详情
    mypinglun_list: Mock.mock({
        'data': [
            [
                '@cname',
                '高三（2班）',
                '评价标题（来自语文老师）',
                '2017-04-20 10:23',
                "<div class='bg-zc'><a class='tabs-bns' href='?id=1'>查看详情</a><a class='tabs-bns' href='?id=1'>修改</a><a  class='tabs-bns' onclick='my_pinglun_list.del(this)' data-id='111'>删除</a></div>"],
            [
                '@cname',
                '高三（2班）',
                '评价标题（来自语文老师）',
                '2017-04-20 10:23',
                "<div class='bg-zc'><a class='tabs-bns' href='?id=1'>查看详情</a><a class='tabs-bns' href='?id=1'>修改</a><a  class='tabs-bns' onclick='my_pinglun_list.del(this)' data-id='222'>删除</a></div>"],
            [
                '@cname',
                '高三（2班）',
                '评价标题（来自语文老师）',
                '2017-04-20 10:23',
                "<div class='bg-zc'><a class='tabs-bns' href='?id=1'>查看详情</a><a class='tabs-bns' href='?id=1'>修改</a><a  class='tabs-bns' onclick='my_pinglun_list.del(this)' data-id='333'>删除</a></div>"],
            [
                '@cname',
                '高三（2班）',
                '评价标题（来自语文老师）',
                '2017-04-20 10:23',
                "<div class='bg-zc'><a class='tabs-bns' href='?id=1'>查看详情</a><a class='tabs-bns' href='?id=1'>修改</a><a  class='tabs-bns' onclick='my_pinglun_list.del(this)' data-id='444'>删除</a></div>"]
        ]
    }),
    //老师添加评价时，评价项目
    pingjia_xiangmu: Mock.mock({
        data: [
            {
                ziji: [
                    {
                        id: "11",
                        name: "认真思考，积极发言",
                        check:1,
                    },
                    {
                        id: "22",
                        name: "按时完成作业，及时订正",
                        check:1,
                    },
                    {
                        id: "23",
                        name: "认真思考，积极发言",
                        //check:2,
                    }
                ],
                id: "1",
                name: "学习表现"
            },
            {
                ziji: [
                    {
                        id: "24",
                        name: "按时完成作业，及时订正",
                        //check:3,
                    }
                ],
                id: "2",
                name: "学习表现2"
            },
            {
                ziji: [
                    {
                        id: "11",
                        name: "认真思考，积极发言",
                        check:1,
                    },
                    {
                        id: "22",
                        name: "按时完成作业，及时订正",
                        check:1,
                    },
                    {
                        id: "23",
                        name: "认真思考，积极发言",
                        check:2,
                    }
                ],
                id: "3",
                name: "学习表现3"
            }
        ]
    })
};
