---
title: 将本地项目上传到 GitHub 托管
date: 2020-02-26 19:23:10
updated:
tags: git
categories: 技术
hide:
comment:
---

# Github基础使用

## 将本地仓库关联到GitHub

### 初始化本地仓库并提交仓库文件

要先确保操作系统已经安装了**Git**，之后进入本地仓库的根目录，鼠标右键选择`Git Bash Here`，接着输入以下命令：

```shell
git init
```
出现以下回应且在根目录下生成了一个隐藏的文件夹`.git`
![hHrssB](https://cdn.jsdelivr.net/gh/dolphinchng/MyPic@master/uPic/hHrssB.png)
此时，如图所示它是将`master`作为初始分支的名称，这里为了跟之后在 github 上默认创建的分支名一致，可以改名为`main`，输入

```
git branch -m "main"
```

此时仓库里的文件还没有被追踪，输入

```
git add . //将仓库里的所有文件进行追踪
```
提交一次快照，输入
```
git commit -m "Started Course"	//" "里可以自定义快照的名字
```


### 在GitHub上创建一个项目

GitHub主页右上角点击new repository
![](http://ww1.sinaimg.cn/large/bf4c214dgy1fxw9y9tnkcj20al06bab3.jpg)
输入信息，**记住勾选Initialize this repository with a REAdME**

![](http://ww1.sinaimg.cn/large/bf4c214dgy1fxw9yw1qg5j20o10hhgn0.jpg)

创建后，复制项目的地址

![](http://ww1.sinaimg.cn/large/bf4c214dgy1fxw9z9g1caj20sf0eujsx.jpg)

回到本地仓库，使用命令，**并在命令后加上你的GitHub项目的地址**，也就是刚才复制的内容。

```
git remote add origin
```



这一步是本地和远程服务器建立联系的一步。执行成功后不会显示任何结果：
![](http://ww1.sinaimg.cn/large/bf4c214dgy1fxwa001gerj20fn021q37.jpg)

到这里，你已经成功了一半了。

### 向远程仓库提交代码

第一次向远程提交代码时得先将远程的README.md 文件(如果有)同步过来，实行一下代码。

```
$ git pull --rebase origin master
```



![](http://ww1.sinaimg.cn/large/bf4c214dgy1fxwa0n36itj20db02xq38.jpg)

查看本地仓库是否出现README.md文件，如有，则表示拉取则成功。

![](http://ww1.sinaimg.cn/large/bf4c214dgy1fxwa1awhwuj20gp032glw.jpg)

接着，将进行第一次向远程同步本地仓库的内容，输入：

```
git push origin main
```

![](http://ww1.sinaimg.cn/large/bf4c214dgy1fxwa1pgcvpj20dj0400t6.jpg)
**注意**：过程中可能会出现一个登陆GitHub帐户的窗口，输入你的账户及密码就可以了。

最后回到GitHub主页查看是否同步即可。

## 文件变动操作

### 本地仓库有大量变动(修改II增删)，之后想快速同步到Github远程仓库应该如何处理？

比如我在本地有一个名为CodingAtSchool的仓库，仓库里有C语言作业文件夹和一个README文件如下图：

![](http://ww1.sinaimg.cn/large/bf4c214dgy1fxwa29yeq8j20i705hdgm.jpg)
我今天用操作鼠标做了大量对C语言目录下的改动，之后进到仓库根目录下，右键Git Bash Here，输入git status，查看仓库状态。

![](http://ww1.sinaimg.cn/large/bf4c214dgy1fxwa2m62lwj20ko0d0k3y.jpg)
oops，大量的红色数字什么鬼，这时千万别慌！如果本地仓库中含文件名为中文名称时，命令窗中提示的信息是无法显示中文的，它会把中文变成一串串数字。这时仔细观察一下，我所做的全部变动都是在C语言作业这个目录下完成的，具体变动是删除了大量文件和增加了一些文件。

第一步，分别执行以下两句命令

```
$ git rm -r C语言作业/
$ git add C语言作业/
```

再一次查看状态 git status，发现一切的修改都已经提交到暂存区了
![](http://ww1.sinaimg.cn/large/bf4c214dgy1fxwa2vktcrj20kk0cwqfy.jpg)

第二步，提交修改

```
$ git commit -m '我的修改'
```

第三步，推送到远程仓库

```
$ git push origin master
```

 
