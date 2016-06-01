/**
 * Created by gao on 2016/5/10.
 */











// window.onload = function () {


        // var loginConFr = document.getElementById("login-content-fr");
        // var loginConFr2 = document.getElementById("login-content-fr2");
        // var twoDimensionalCode2 = document.getElementById("two-dimensional-code2");
        // var twoDimensionalCode = document.getElementById("two-dimensional-code");


        // regFun("spanClose2", "none");

        // function regFun(a, b) {
        //     var aSpan = document.getElementById(a);
        //     aSpan.onclick = function () {
        //         loginConFr2.style.display = b;
        //         loginConFr.style.display = "block";

        //     }
        // }

        // twoDimensionalCode.onclick = function () {
        //     loginConFr2.style.display = "block";
        //     loginConFr.style.display = "none";
        // };
        // twoDimensionalCode2.onclick = function () {
        //     loginConFr2.style.display = "none";
        //     loginConFr.style.display = "block";
        // };

        // focOnbFun(0, 0);
        // focOnbFun(1, 1);
        // function focOnbFun(a, b) {
        //     var loginAccount = document.getElementById("login-account");
        //     var arrInput = loginAccount.getElementsByTagName("input");
        //     var arrS = loginAccount.getElementsByTagName("s");
        //     arrInput[a].onfocus = function () {
        //         arrS[a].style.backgroundPosition = "-" + b * 48 + "px" + " -48px";
        //     };
        //     arrInput[a].onblur = function () {
        //         arrS[a].style.backgroundPosition = "-" + b * 48 + "px" + " 0";
        //     }
        // }
    // }


window.onload=function(){

  provingCode();
}
/* 验证码 */
function provingCode(){

    // /* 生成验证码 */
    // var randomNum, // 生成的数字
    //     arrNum=[], // 存放数字
    //     inputNu=[]; //输入数字

    // var userName=document.getElementById('userName'); //用户名
    // var password=document.getElementById('password');  //密码
    // var inputCode=document.getElementById('checkcode'); //输入的验证码
    var loginBtn=document.getElementById('loginBtn'); //登录按钮

    // var loginCheck=document.getElementById('loginCheck'); //
    // var checkSpans=loginCheck.getElementsByTagName('span'); // 验证的span


    //   for(var i = 0 ;i<4 ;i++){
    //     randomNum=Math.floor(Math.random()*10);
    //     arrNum.push(randomNum);
    //     checkSpans[i].innerHTML=randomNum;
    //   }
   // 输入完毕验证 输入的验证码
      loginBtn.onclick=function(){
          // checkcode=inputCode.value;
          // for(var i = 0 ;i <arrNum.length ; i++){
          //     inputNu[i]=checkcode.charAt(i);
          // }
          // var isCheck=(checkcode[0] ==arrNum[0])&&(checkcode[1] ==arrNum[1])&&
          //   (checkcode[2] ==arrNum[2])&&(checkcode[3] ==arrNum[3]);

          // if(!isCheck ){
          //     alert('验证码错误');
          //   }else {
                    //  请求数据库
               $.ajax({
                  type:'post',
                  url:'php/users.php',
                  data:{
                    act:'find',
                    username:$("#userName").val(),
                    password:$("#password").val()
                  },
                  success:function(data){
                   console.log(typeof data);
                   if( data){
                      alert("输入错误");
                   }
                   else {
                      alert("登录成功.")
                      window.location.href="index.html";
                   }

                  }
               });

            }


            // inputCode.value="";
      }


