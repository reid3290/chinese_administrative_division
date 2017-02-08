# chinese_administrative_division
## 中国行政区划数据：省、市、区
* [数据来源：中华人民共和国国家统计局](http://www.stats.gov.cn/tjsj/tjbz/xzqhdm/)

## Usage
```js
const chinese = require('chinese_administrative_division');
chinese.getAll()
    .then(data => {
        console.dir(data);
    })
    .catch(error => {
        console.error(error);
    })

```

## 数据格式
- `provinces` - 省份数据，包含`name`和`code`两个字段
- `cities` - 城市数据，包含`name`、`code`和`parent_code`三个字段
- `districts` - 区县数据，包含`name`、`code`和`parent_code`三个字段

## License
This repo is released under the [MIT License](http://www.opensource.org/licenses/MIT).


