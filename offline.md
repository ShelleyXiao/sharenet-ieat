# Introduction #

本文介绍如何配置服务以脱机运行菜单。


# Details #
很简单的几个步骤
  * 首先配置服务器，让其支持text/cache-manifest manifest;格式
//TODO添加具体的说明
  * 然后用iPad访问服务器上的page,注意，我们有两个page : index.html / debug.html，其中index.html是支持脱机的，而debug.html不支持。调试的时候用debug.html可以免得每次有改变都需要刷新脱机文件，比较方便一些。
//TODO添加具体的说明
  * 最后，把该页设置成桌面上的启动项，然后用启动项再启动一次，就OK了。
//TODO添加具体的说明

参考文档：
http://www.sencha.com/learn/Tutorial:Taking_Sencha_Touch_Apps_Offline