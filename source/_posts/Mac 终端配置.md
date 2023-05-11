---
title: mac 终端配置
date: 2020-02-23 14:56:12
tags: [终端, Terminal, oh-my-zsh, shell]
categories: [开发环境部署]
---



## 准备工作：

终端 shell 工具用的是 `zsh`，具体怎么安装 zsh 这里省略。

需要用到代理设置软件 clashX ，Vim编辑器基本操作命令，http传输协议原理，zsh 

关于系统用户目录下的.bashrc .bash_profile 和 .zshrc文件

```shell
cd ~
// bash 也就是 mac 默认的 shell 工具，配置文件为 .bashrc 和 .bash_profile
vim .bash_profile
// zsh 的配置文件为 .zshrc
vim .zshrc
```

使用`zsh`作为默认`shell`工具的时候，它启动时并不会加载`bash`的这两个配置文件`.bashrc`和`.bash_profile`，而只会加载自己的配置文件`.zshrc`，为了让我们的配置文件生效，需要再做如下配置，来达到环境变量设置的永久生效。**在`~/.zshrc` 文件最后增加一行**

```
source ~/.bash_profile
```

如果不做上述设置，你就会发现，只有当你每次`source ~/.bash_profile`后才会生效，下次重新打开`zsh`窗口，还是不生效。

## 2022-12-13

有个需求需要用到 python 的 pandas 库，使用 pip 命令安装时发现下载不了报错！

```shell
WARNING: Retrying (Retry(total=4, connect=None, read=None, redirect=None, status=None)) after connection broken by 'ProxyError('Your proxy appears to only use HTTP and not HTTPS, try changing your proxy URL to be HTTP. See: https://urllib3.readthedocs.io/en/1.26.x/advanced-usage.html#https-proxy-error-http-proxy', SSLError(SSLError(1, '[SSL: WRONG_VERSION_NUMBER] wrong version number (_ssl.c:1129)')))': /simple/pandas/
```

大致看了一下是访问网络端口配置问题，这时我才发现代理订阅链接服务流量用完了，前几天从clashX换到备用的ShadowsocksX-NG使用，由于这两个代理工具分别设置的 http 和 sock 端口号不一致，所以得到 .bash_profile 文件里重新修改一下端口号，改为 ShadowsocksX-NG 所提供的端口号。

**由于经常使用终端进行下载一些国外源的库，就得让终端也代上理。**进行代理之前得在 clashX 找“复制终端代理命令“的按钮，然后粘贴到终端运行就可以完成。**但是使用 export 命令是临时的，为了防止下次打开终端需要重新复制命令运行，这时可以把命令放到一个终端配置文件 .bash_profile  中，让其每一次启动终端时就自动配好代理。**

```shell
export https_proxy=http://127.0.0.1:7890 http_proxy=http://127.0.0.1:7890 all_proxy=socks5://127.0.0.1:1087
// 具体你的 http 和 sock5 端口号是多少，取决于你使用的代理工具，去查看就可以
```

