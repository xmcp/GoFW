# GoFW
[添加到 Chrome](http://s.xmcp.ml/gofw/latest.crx)

![code style: extremely bad](https://img.shields.io/badge/_code_style_-_extremely_bad_-red.svg)

**（本扩展程序不是翻墙软件，不要指望能使用本程序上 Youtube）**

## 当你上境外网站时，是否有如下烦恼？

- 网站用了 Google API 或者 Google 字体库，导致页面错乱
- 网站用了境外 jQuery CDN，导致JS半天加载不了
- 网站用了 Google Analytics，导致页面加载缓慢
- 网页内嵌了 facebook 分享按钮，导致网页白屏半分钟
- 网页的 Glyphicons 图标总是刷不出来，导致页面排版问题

**五大症状，一个对策！**

GoFW 将上述 JS 库重定向到国内的 [360 CDN](http://libs.useso.com/) 和 [BootCDN](http://www.bootcdn.cn/)，缓存了 Glyphicons 图标，同时屏蔽浏览器向被墙域名的请求，帮 GFW 照耀下的广大网友有效提升网页打开速度！

[CRX下载](http://s.xmcp.ml/gofw/latest.crx) （适用于 Chrome 25 或更高版本）

## 网站示例：
- [getbootstrap.com](http://getbootstrap.com/css/)，使用了谷歌统计、Glyphicons、jQuery 和 twitter 分享按钮；
- [tkdocs.com](http://www.tkdocs.com/tutorial/index.html)，使用了谷歌统计和谷歌服务器中的图片；
- [stackoverflow.com](https://stackoverflow.com/)，使用了 Google API 中的 jQuery 和谷歌统计；
- [wtfpl.net](http://www.wtfpl.net/)，使用了 Google 的 +1 按钮、facebook 分享按钮和 twitter 分享按钮；
- ……

上述网站在未使用 GoFW 的情况下均需要花费十几秒或更多的时间打开，其中 StackOverflow 由于缺失 jQuery，甚至无法正常使用。

在使用了 GoFW 后，这些网页在 10 Mb 宽带的网速下，均能在五秒钟之内加载完成。

## License

> Copyright © 2015 xmcp

> This work is free. You can redistribute it and/or modify it under the

> terms of the Do What The Fuck You Want To Public License, Version 2,

> as published by Sam Hocevar. See http://www.wtfpl.net/ for more details.
