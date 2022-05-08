// mtain.js

//显示输入的区间
function showRange() {
    var leftRange = document.getElementById("lNumberTxt").value;
    var rightRange = document.getElementById("rNumberTxt").value;
    document.getElementById('showleftRange').innerHTML = "[" + leftRange + ", " + rightRange + "]";


}

//右边区间超过范围提示
function showRtRangeTip(){
    var rnumber = parseInt(document.getElementById("rNumberTxt").value);
    if(rnumber>2022000){
        document.getElementById('rRangeTip').innerHTML = "数值超过,请重新输入"
    }
}

//计算
function goGo() {
    var lNumber = parseInt(document.getElementById("lNumberTxt").value);
    var rNumber = parseInt(document.getElementById("rNumberTxt").value);
    countMT(lNumber,rNumber);
}

//验证数字总函数
function countMT(num1, num2) {
    var num = 0;
    for (var i = num1; i <= num2; i++) {
        if (isMT(i)) {
            num++;
        }

    }
    alert(num);
}

//验证数字条件是否满足
function isMT(number) {
    //将number输出到字符串
    var str = number.toString();

    //验证条件一:是否先单调不减
    for (var i = 1; i < (str.length + 1) / 2; i++) {
        if (str[i] < str[i - 1]) {
            return false;
        }
    }

    //验证条件二:是否对称,利用双指针
    for (var i = 0; i < str.length / 2; i++) {
        if (str[i] != str[str.length - 1 - i]) {
            return false;
        }
    }
    return true;
}

