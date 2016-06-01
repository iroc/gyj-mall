/**
 * Created by gao on 2016/5/18.
 */
window.onload = function () {


    $("#btn").on("click",function(){
        $.ajax({
            type:'post',
            url:'php/users.php',
            data:{
                act:'add',
                username:$("#inp1").val(),
                password:$("#inp2").val()
            },
            success:function(data){
             console.log(data);
            }
        });
    })

//    function $(id) {
//        return document.getElementById(id);
//    }

//
//    var regName = /^[\u4e00-\u9fa5]{2,}$/;
//    var regPass = /^[\u4e00-\u9fa5]{2,}$/;
//    var regRePass = /^[\u4e00-\u9fa5]{2,}$/;
//    var regPhone = /^(13[0-9]|14[57]|15[0-9]|17[0-9]|18[0-9])\d{8}$/;
//    var regVerify = /^[\u4e00-\u9fa5]{2,}$/;
//
//
//
//
//    check(inpName,regName);
//    check(inpPass,regPass);
//    check(inpRePass,regRePass);
//    check(inpPhone,regPhone);
//    check(inpVerify,regVerify);
//
//
////用户输入完成之后进行判断
//    function check(inp, regEx) {
//        inp.onblur = function () {
//            //判断用户输入并做相应操作
//            if (regEx.test(this.value)) {
//                //sp.innerHTML="输入正确";
//                //alert("输入正确");
//                this.nextSibling.innerHTML ="输入正确";
//                this.nextSibling.className = "right";
//            } else {
//                //alert("滚");
//                this.nextSibling.innerHTML = "输入不合法，请重新输入";
//                this.nextSibling.className = "wrong";
//            }
//        }
//    }


}
