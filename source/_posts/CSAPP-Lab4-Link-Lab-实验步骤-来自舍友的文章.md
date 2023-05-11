---
title: CSAPP Lab4 (Link Lab) 实验步骤 - 来自舍友的文章
date: 2022-07-30 10:51:59
updated:
tags:
categories:
hide: true
comment:
---

# 前期准备

- ASCII码对照表

![img](https://cdn.nlark.com/yuque/0/2021/png/1352293/1640783994155-2049d1eb-c9ab-4c14-a800-736bdc16c089.png)

- 文件十六进制编辑器

```
apt-get install hexedit
```

- 查看程序ELF

```
readelf -a <文件>
```

- 查看程序汇编代码和重定向目标

```
objdump -dx <文件>
```



# 第一题

要求：修改二进制可重定位目标文件“phase1.o”的数据节内容，使其与main.o链接后能够运行输出（且仅输出）自己的学号



编译运行看看输出的内容：

![img](https://cdn.nlark.com/yuque/0/2021/png/1352293/1640783551709-f8b90f59-10f3-4343-9ca8-e50e03545f56.png)



看到这种一大串乱七八糟的字符串，第一反应是直接用十六进制编辑器看文件的ASCII码有没有这一串字符串

使用十六进制编辑器查看文件：`hexedit phase1.o`

找到该字符串的位置：

![img](https://cdn.nlark.com/yuque/0/2021/png/1352293/1640783948863-90d9bf97-9409-4429-a8d0-553ca3ff28a4.png)

直接从字符串开头修改为自己的学号，并用ASCII码的 ‘/0’ 结束，‘/0’的十六进制是 `00`

![img](https://cdn.nlark.com/yuque/0/2021/png/1352293/1640784529713-c5e57ae5-4e30-4d87-872e-3d7cff3c0186.png)

在hexedit编辑器中，使用CTRL + X 快捷键保存修改的结果

再编译程序：

![img](https://cdn.nlark.com/yuque/0/2021/png/1352293/1640784607901-f5fce52e-08a9-4e66-84b0-1902ea090bb7.png)



# 第二题

要求：根据强符号与弱符号的原则，判断符号表中的符号以及其所对应的数据区域。利用符号解析规则，创建生成一个名为“phase2_patch.o”的二进制可重定位目标文件



先编译phase2.o，看看输出的效果

```
gcc main.o phase2.o -no-pie
```

![img](https://cdn.nlark.com/yuque/0/2021/png/1352293/1640869225822-89d5b194-e31e-45d2-b9c6-7b590795c650.png)

是一串乱七八糟的文本，也推断不出它们的ASCII码，不能像第一题一样直接在文件中改字符串，

所以反汇编它的代码，尝试找到它输出的文本位置

```
objdump -d a.out
```

![img](https://cdn.nlark.com/yuque/0/2021/png/1352293/1640869772837-d272a721-d990-47d0-b62b-c71f21592489.png)



在do_phase2函数中，找到关键的汇编代码，其中call puts就是输出字符串的函数，输出的字符串地址为：0x60108a

往上看代码，看到把 0x601060 的地址放进myFunc函数计算，怀疑 0x60108a 的字符串内容 也经过 myFunc函数计算过。



于是再分析myFunc函数的汇编代码：

![img](https://cdn.nlark.com/yuque/0/2021/png/1352293/1640870093347-62ebc97a-796e-4eef-bb59-1af6bb43b8d0.png)

分析myFunc函数的汇编代码，原理是在一个 大小为256的char数组中经过如下运算生成字符串，

在这个例子中，这个char数组的起始地址就是：0x601060



为了找到这个char数组在原phase2.o中的重定向位置，方便我们接下来在phase2.o文件中修改这个数组

使用 `objdump -dx phase2.o` 查看重定向信息



![img](https://cdn.nlark.com/yuque/0/2021/png/1352293/1640877108454-4569048c-568b-4828-ac97-4e89848e59dc.png)

（左边的终端是查看phase2.o的重定向信息，右边的终端是查看a.out的重定向结果）



为了更清晰描述phase2的汇编代码，将它的大概逻辑转换成c语言伪代码如下：

```cpp
char g_myCharArray[256] = {0};

for(int i=0; i < 256; i++){
    g_myCharArray[i] = g_myCharArray[i] + (i & 0x1F);
}

# idx 在重定位表中找到
puts(g_myCharArray + idx);
```





用`readelf -a phase2.o`查看文件，发现`g_myCharArray`数组变量是弱符号，

并且它的类型为COM，即未初始化或初始化为0的全局变量。

弱符号可以被强符号覆盖，意思是只要在链接的时候出现同名的强符号变量就可以覆盖它，强符号变量就是有初始化值的变量。

![img](https://cdn.nlark.com/yuque/0/2021/png/1352293/1640785499062-f99537e2-1731-4b32-8543-2dea59cc894a.png)

要想输出自己的学号，先在重定位表中找到从数组的哪个位置输出：

![img](https://cdn.nlark.com/yuque/0/2021/png/1352293/1640878154861-0de3812a-5985-4d51-b076-a3cd35eefce2.png)

找到偏移量是2a，十进制为42，所以程序是从数组g_myCharArray[42]输出，数组下标是42，我们学号也要经过一系列计算后写到这个位置上。

下面开始计算学号的存放到数组中的值。简而言之：



```
存放到数组中的值 = 学号ASCII码 - （下标 & 0x1F）
```



学号第一个位置的偏移量是2a，那么：

2a & 0x1F = 0xA (十六进制) = 10 （十进制）



往后位置的数值就是递增的：10  11  12  13 ....



![img](https://cdn.nlark.com/yuque/0/2021/png/1352293/1640879817903-298d3b1a-cf13-4bb8-bcdc-02cee07a9b68.png)



另外还需要写入字符 ‘/0’的ASCII码作为字符串的结束符

‘/0’字符写入的数组下标 & 0x1F 的结果是 21

只要将这个值与一个整数相加，溢出char类型的最大表示范围，就可以得到0

举例：21 + 235 = 256  > 255(char类型最大表示范围)

所以，‘/0’字符写入到数组对应的数值是235。



新建一个phase2_patch.c，写入一个同名的char g_myCharArray[256]，

从数组g_myCharArray[42]写入经过计算后的学号值。还要再写入经过计算后的‘/0’结束符的值。

![img](https://cdn.nlark.com/yuque/0/2021/png/1352293/1640878100749-30744963-39b1-4429-9f4a-52799dc5ebb7.png)

编译这个文件，然后输出结果：

![img](https://cdn.nlark.com/yuque/0/2021/png/1352293/1640878355553-03ec2022-1cdb-4f71-b58c-5688b2ae19a1.png)



# 第三题

检查反汇编代码，定位模块中的各组成函数并推断其功能作用。 根据反汇编程序的执行逻辑，修改函数中的机器指令（用自己指令替换函数体中的nop指令）以实现期望的输出。



先编译程序：`gcc main.o phase3.o -no-pie`

再分析编译后的程序的汇编代码：`objdump -d a.out`

![img](https://cdn.nlark.com/yuque/0/2021/png/1352293/1640786357367-4db926f4-5f79-4052-a710-7c63aa9425fb.png)

除了do_phase3还有myFunc1、myFunc2函数，这题是让我们定位模块中的各组成函数并推断其功能作用。 根据反汇编程序的执行逻辑，修改函数中的机器指令。

分析程序得出结论：需要修改do_phase3的nop指令为如下结果：

```cpp
0000000000400550 <do_phase3>:
  400550:	55                   	push   %rbp
  400551:	48 89 e5             	mov    %rsp,%rbp
  400554:	90                   	nop
  400555:	90                   	nop
  400556:	90                   	nop
  400557:	90                   	nop
  400558:	e8 e1 ff ff ff       	callq  40053e <myFunc2>
  40055d:	48 89 c7             	mov    %rax,%rdi
  400560:	e8 be ff ff ff       	callq  400523 <myFunc1>
  .....
```

它们的汇编特征码如下：

55 48 89 e5   90 90 90 90   E8 E1 FF FF   FF 48 89 C7   E8 BE FF FF   FF



分析完a.out的行为，就要在phase3.o中修改对应的汇编代码，才可以生效。



使用`objdump -dx phase3.o`查看这个函数在phase3.o的.text位置：

![img](https://cdn.nlark.com/yuque/0/2021/png/1352293/1640881232940-6f23ea20-df4d-410f-87d1-dcae86c7aa30.png)

使用`readelf -a phase3.o`找到.text在静态文件中的偏移：

![img](https://cdn.nlark.com/yuque/0/2021/png/1352293/1640881400547-de5f7145-5884-41d4-a417-763c2c2b0710.png)

所以计算do_phase3函数在phase3.o的静态文件偏移是：

0x40 + 0x2d = 0x6D



使用`hexedit phase3.o`修改0x6D位置开始的数据：

55 48 89 e5   90 90 90 90   E8 E1 FF FF   FF 48 89 C7   E8 BE FF FF   FF

![img](https://cdn.nlark.com/yuque/0/2021/png/1352293/1640881783650-995a09b2-446a-4628-bebe-e7e0a7418c7f.png)



在a.out的汇编代码中，myFunc2中这个地址就是字符串数组的起始地址，在这个地址中输入自己的学号就可以通过此关

![img](https://cdn.nlark.com/yuque/0/2021/png/1352293/1640786737987-10961ffb-7c2b-4654-a45b-d8eb61384416.png)

需要从phase3.o中找到它的位置。



使用`objdump -dx phase3.o`查看这个函数下的重定位信息：

![img](https://cdn.nlark.com/yuque/0/2021/png/1352293/1640880914937-c77dd996-0557-4f7e-8cbb-60ac42c6d9ea.png)

使用`readelf -a phase3.o`也同样可以看到

![img](https://cdn.nlark.com/yuque/0/2021/png/1352293/1640786872855-3df015ae-319c-40c3-a2c5-488338459c7a.png)

重定向的偏移是.data + c



找.data的静态文件偏移：

![img](https://cdn.nlark.com/yuque/0/2021/png/1352293/1640786934738-87c85d45-dd7c-47dc-b515-3087e1215ec3.png)

所以在静态文件偏移 1a0 + c  = 1AC 这个地址就是数组起始地址，在这个地址中修改为自己的学号

![img](https://cdn.nlark.com/yuque/0/2021/png/1352293/1640882364964-3316b538-8fff-4765-9bf1-2169f96c0712.png)

输出结果：

![img](https://cdn.nlark.com/yuque/0/2021/png/1352293/1640882441514-81cc76ee-a2ef-4b8d-b56c-8434511e5e9c.png)



# 第四题

要求：修改二进制可重定位目标文件“phase4.o”中重定位节	和数据节中的内容，使其与main.o链接后能够运行输出（且仅输出）自己的学号，本阶段学生所拿到的.o文件中的“重定位位置”信息已经被抹除，学生需要根据实际情况确认冲重定位的发生位置，并根据重定位类型对位置信息进行恢复。



查看被抹除的重定位信息:

```
readelf -a phase4.o
```

![img](https://cdn.nlark.com/yuque/0/2021/png/1352293/1640787620308-10254a3c-f9c5-4227-9d9c-ab70e0a7fe41.png)

发现3个位置被抹除。



反汇编查看.text段的重定向信息及汇编内容：

```
objdump -dx phase4.o
```



根据汇编指令特点，猜测代码思路，使得程序修复重定位地址后可以正常运行:

![img](https://cdn.nlark.com/yuque/0/2021/png/1352293/1640787772002-8a8943f8-e6d7-41cd-86ea-5626cd03b98c.png)

R_X86_64_PC32类型  为 相对地址偏移，重定位一个使用32位PC相对地址的引用

R_X86_64_32S类型  为 绝对地址偏移，重定位一个使用32位绝对地址的引用





应该改为如下的重定位位置：

![img](https://cdn.nlark.com/yuque/0/2022/png/1352293/1641276697837-37caf36f-4d92-4f75-a753-5f78c904fc69.png)



修复重定位信息：

使用`readelf -a phase4.o`查看".rela.text"段

**".rela.text"是重定位信息段，它在静态文件的偏移是 0x250**

![img](https://cdn.nlark.com/yuque/0/2022/png/1352293/1641278110225-e67c7999-23ef-412c-a71e-75ece807cff7.png)



**".rela.text"每一条重定位数据都是一个结构体，**

**结构体定位文件可以在**`/usr/include/elf.h`**中看到**

**".rela.text"结构体内容如下：**

![img](https://cdn.nlark.com/yuque/0/2022/png/1352293/1641278518628-a84ca7d4-e9eb-46d7-b302-5df2eeab6953.png)

使用`hexedit phase3.o`修改**静态文件的偏移 0x250**位置的结构体数据：

![img](https://cdn.nlark.com/yuque/0/2022/png/1352293/1641279135178-bc9edd39-65c2-47ed-9055-1fe2751b278a.png)



分析.data段的学号写入位置：

首先分析do_phase函数的汇编代码，计算第一条重定向数据的相对偏移：

![img](https://cdn.nlark.com/yuque/0/2022/png/1352293/1641320345924-ac83bb96-aa5c-422d-a808-237f30b547b4.png)

.text段在文件中的偏移是0x40，所以第一条重定向在文件中的偏移是0x46，

.data段在文件中的偏移是0x60

所以第一条重定向的相对偏移是：(.data + 0x10) - 0x46  =  0x60 + 0x10 - 0x46 =   0x2A

又因为下一条指令在静态文件的地址是0x4a

所以得到的绝对地址是：0x4a + 0x2A = 0x74

![img](https://cdn.nlark.com/yuque/0/2022/png/1352293/1641321035870-85df389e-0d47-4b89-a9a6-f5c0b9a8b3e4.png)

静态文件 0x74 位置上的数值是**0x3F**

根据do_phase的汇编代码流程，学号写入位置应该是：0x3F & 0x7 + .data = 0x3F & 0x7 + 0x60 = **0x67**

![img](https://cdn.nlark.com/yuque/0/2022/png/1352293/1641321456359-d5cd2717-bde6-480d-a523-14cc089005bc.png)

输出结果：

![img](https://cdn.nlark.com/yuque/0/2022/png/1352293/1641321537765-f53cc6e6-9603-4b75-bfde-c5a2460c096a.png)





# 第五题

要求：修改二进制可重定位目标文件“phase5.o”中重定位节和数据节的内容，使其与main.o链接后能够正确输出（且仅输出）自己学号



反汇编先分析完整的程序逻辑

```
gcc main.o phase5.o -no-pie
objdump -d a.out
```



发现myFunc是关键函数

![img](https://cdn.nlark.com/yuque/0/2021/png/1352293/1640788319784-fbe2008e-cd4b-4d68-88d6-502b3335736a.png)



再查看该内存的数据：

![img](https://cdn.nlark.com/yuque/0/2021/png/1352293/1640788388281-577f94c6-758d-48f0-96a9-0888e29de038.png)



整理程序逻辑：

程序判断g_guard变量是否为0，如果不为零输出0x0x601030地址中的“hhhhh”字符串，如果变量为0输出0x0x601040地址中的“000000000000”字符串，程序里的g_guard变量始终为1，所以总是输出了“hhhhh”字符串。



我们的解题思路是不修改g_guard变量值的情况下，把这两者的重定向绝对地址互换，然后修改0x0x601040地址中的“000000000000”字符串为自己的学号。

![img](https://cdn.nlark.com/yuque/0/2021/png/1352293/1640788962102-d507d615-9c1c-40d4-90dc-fa3ac205ec57.png)

以上是分析可执行文件a.out的流程，实际上要修改phase5.o文件的重定位信息才可以生效。

两个变量的重定向顺序在phase5.o中找到，所以开始分析phase5.o

```
objdump -dx phase5.o
```

![img](https://cdn.nlark.com/yuque/0/2021/png/1352293/1640789268085-ae6430b3-f75d-438a-9061-f494af4d55ab.png)



```
readelf -a phase5.o
```

![img](https://cdn.nlark.com/yuque/0/2021/png/1352293/1640789347851-e55ef930-92f2-48bc-b875-a2682c631158.png)



修改`.rela.text`段中 20 与 2c 互换，再修改`.data + 10`的内存数据为学号即可

![img](https://cdn.nlark.com/yuque/0/2022/png/1352293/1641322096307-a0449a69-1e81-4611-8ac4-320433823d40.png)

![img](https://cdn.nlark.com/yuque/0/2022/png/1352293/1641322162423-435af911-4ebd-4846-ab1d-fdc734d43357.png)

![img](https://cdn.nlark.com/yuque/0/2022/png/1352293/1641322191877-1b699192-dc6e-44ec-9f36-4bc60b5f245f.png)
