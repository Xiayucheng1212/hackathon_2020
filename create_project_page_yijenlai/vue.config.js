// module.exports = {
//     // options...
//     devServer: {
//         proxy: {
//             '/api': {
//                 target: 'https://hereisanewapp.herokuapp.com',    // api接口基础路径
//                 changeOrigin: true,                 // 是否支持跨域
//                 ws: true,
//                 pathRewrite: {
//                     '^/api': ''                       // 重写路径：去掉路径中开头的 '/api'
//                 }
//             }
//         }
//     }
// }