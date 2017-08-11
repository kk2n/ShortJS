let env = 'dev';
// let env='pro';

const config={
    ajaxConfig:axios.create({
        baseURL: env === 'dev' ? 'http://192.168.1.57:8081' : env === 'pro' ? 'https://www.url.com' : '',
        timeout: 30000
    })
};
// __.ajax({
//     url: '/user',
//     method: 'get',
//     responseType: 'json',
//     transformResponse: [function (data) {
//         return data;
//     }],
// }).then((reg) => {
//
// });
export default config;