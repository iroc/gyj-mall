/**
 * Created by gao on 2016/4/24.
 */
//点击关闭按钮，广告关闭
var closeBan =document.getElementById("closeBan");
var topbanner =document.getElementById("topbanner");
closeBan.onclick = function () {
    topbanner.style.display= "none";
}