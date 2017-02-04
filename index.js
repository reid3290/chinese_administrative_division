const cheerio = require('cheerio');
const request = require('request');
const url = require('url');
const fs = require('fs');

const XZQH_URL = 'http://www.stats.gov.cn/tjsj/tjbz/xzqhdm/'; // 中国统计局行政区划代码发布地址

request(XZQH_URL, (error, response, body) => {
    if (error) {
        return;
    }
    const $ = cheerio.load(body);
    const latest_url = $('.center_list_contlist a').attr('href');
    const completed_url = url.resolve(XZQH_URL, latest_url);
    request(completed_url, (error, response, body) => {
        if (error) {
            return;
        }
        const $ = cheerio.load(body);
        let str = '';
        $('.MsoNormal').each((index, elem) => {
            str += $(elem).text();
            str += '\n';
        });
        str = str.slice(0, str.length-1); // 去除最后一个多余的换行符
        const data = str.replace(/[\u00A0|\u3000]+/ig, '').split('\n'); // 去除中文空格
        const res = {};
        let currentProvince = '',
            currentCity = '';
        data.forEach(item => {
            const a = item.split(' ');
            if (a[0].substr(2, 4) === '0000') {
                // 省份数据
                currentProvince = a[1];
                res[currentProvince] = {};
            }
            else if (a[0].substr(4, 2) === '00' && a[0].substr(2, 4) !== '0000') {
                // 城市数据
                currentCity = a[1];
                res[currentProvince][currentCity] = [];
            }
            else if (a[0].substr(4, 2) !== '00') {
                // 区县数据
                res[currentProvince][currentCity].push(a[1]);
            }
        });
        fs.writeFile('./res.json', JSON.stringify(res), (error)=>{
            if(error) {
                return;
            }
        });
    });
});
