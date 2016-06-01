/**
 * Created by gao on 2016/2/29.
 */
    window.onload = function() {
        var slider = document.getElementById("slider");
        var arr = document.getElementById("arr");
        var arrRight = document.getElementById("right");
        var arrLeft = document.getElementById("left");
        var screen = slider.children[0];
        var ul = screen.children[0];
        var ol = screen.children[1];
        var ulLis = ul.children;//ul里的广告
        var imgWidth = screen.offsetWidth;
        var timer = null;
        //alert(imgWidth);

        //1.动态生成结构
        //1.1根据图片数量动态生成按钮
        for (var i = 0; i < ulLis.length; i++) {
            //生成按钮
            var li = document.createElement("li");
            //添加序号 索引号是从0开始的 所以要加一
            li.innerHTML = i + 1;
            ol.appendChild(li);
        }
        //1.2创建完成后才能获取
        var olLis = ol.children;
        //暂时先给第一个按钮添加样式
        olLis[0].className = "current";

        //1.3动态的克隆第一张图片并追加到最后
        var firstImg = ulLis[0].cloneNode(true);
        ul.appendChild(firstImg);

        //2.鼠标经过按钮
        // 给每一个按钮绑定鼠标经过事件 事件是按钮排他 而且将图片移动到指定位置
        for (var j = 0; j < olLis.length; j++) {
            olLis[j].index = j;
            olLis[j].onmouseover = function () {
                //干掉所有人
                for (var k = 0; k < olLis.length; k++) {
                    olLis[k].className = "";
                }
                //留下我自己
                this.className = "current";

                //将图片渐渐地移动到指定位置
                //target 和 当前按钮的索引 和 图片的宽度 有关 而且是负数
                var target = -this.index * imgWidth;
                animate(ul, target);

                //pic = this.index;
                 //square = this.index;
                pic = square = this.index;//和上面是一个效果
            }
        }

        //3.鼠标点击箭头
        //鼠标经过盒子 显示arr 鼠标离开盒子 隐藏arr
        //鼠标经过盒子清理自动播放图片的定时器 鼠标离开盒子继续自动播放
        slider.onmouseover = function () {
            clearInterval(timer);
            arr.style.display = "block";

        }
        slider.onmouseout = function () {
            arr.style.display = "none";
            timer = setInterval(playNext, 2000);
        }
        //点击右侧箭头 将ul渐渐地移动到相应位置
        var pic = 0;//用于储存当前应该像是的图片的索引
        var square = 0;//用于储存当前应该亮起的按钮的索引

        arrRight.onclick = function () {
            playNext();
        }
        arrLeft.onclick = function () {
            //判断边界 如果是第一张图片 就应该变为假的第一张
            //让ul跳到最后 pic也要跳到最后
            if (pic == 0) {
                //瞬间变为假的第一张
                ul.style.left = -imgWidth * (ulLis.length - 1) + "px";
                pic = ulLis.length - 1;
            }
            pic--;
            //target 和 pic有关 和 图片宽度 而且是负数
            var target = -pic * imgWidth;
            animate(ul, target);

            //按钮也应该亮起相应的那个

            //判断边界
            //如果sqaure大于第一个按钮的索引号才能自减 否则从最后一个开始
            if (square > 0) {
                square++;
            } else {
                square = olLis.length - 1;
            }
            //干掉所有人
            for (var i = 0; i < olLis.length; i++) {
                olLis[i].className = "";
            }
            //留下当前的
            olLis[square].className = "current";

        }


        //4.添加自动滚动
        //相当于每秒钟按下一次右箭头
        clearInterval(timer);
        timer = setInterval(playNext, 5000);


        function playNext() {
            //判断边界 如果是最后一张图片（假的第一张）的索引
            //让ul跳回开始 pic也要调回去
            if (pic == ulLis.length - 1) {
                ul.style.left = 0;
                pic = 0;
            }
            pic++;
            //target 和 pic有关 和 图片宽度 而且是负数
            var target = -pic * imgWidth;
            animate(ul, target);

            //按钮也应该亮起相应的那个

            //判断边界
            //如果sqaure小于最后一个按钮的索引号才能自加 否则从头开始
            if (square < olLis.length - 1) {
                square++;
            } else {
                square = 0;
            }
            //干掉所有人
            for (var i = 0; i < olLis.length; i++) {
                olLis[i].className = "";
            }
            //留下当前的
            olLis[square].className = "current";

        }

        //5.完善鼠标经过


        function animate(obj, target) {
            clearInterval(obj.timer);//为了防止重复调用 先清理一下
            obj.timer = setInterval(function () {
                var leader = obj.offsetLeft;//获取对象当前位置
                //往右走 left数值越来越大 step 正数
                //往左走 left数值越来越小 step 负数
                //如果leader < target leader 在左边 就应该往右走
                var step = (target - leader)/10;
                /*if (leader < target) {
                 step = step;
                 } else {
                 step = -step;
                 }*/
                step = step > 0 ? Math.ceil(step) : Math.floor(step);//判断对象移动的方向
                //判断终点 如果没到终点就执行动画
                //Math.abs(leader - target) 对象当前位置和target的距离
                //如果距离大于步长 说明还可以继续移动 否则说明再迈一步就超过终点了
                //if (Math.abs(leader - target) > Math.abs(step)) {
                //    //leader = leader + step
                //    obj.style.left = leader + step + "px";
                //} else {
                //    clearInterval(obj.timer);
                //    //手动将快要到达终点的对象放到终点
                //    obj.style.left = target + "px";
                //}
                if (leader != target) {//说明还没有到
                    obj.style.left = leader + step + "px";
                } else {//说明到了
                    clearInterval(obj.timer);
                }
            }, 50)
        }



    }

