    // 初始化
    var vConsole = new VConsole();
    $(function () {
        $(".plus").click(
            function () {
                var _this = $(this);//将当前的pimg元素作为_this传入函数 
                imgShow("#outerdiv", "#innerdiv", "#bigimg", _this);
                //移动端手指移动事件,如果不需要移动端手指事件,这一部分内容可以不加,只要上面两行代码以及imgShow()事件
                var eleImg = document.querySelector('#innerdiv');
                var store = {
                    scale: 1
                };
                //定义移动端的初始位置
                var position_top, position_left, pageX, pageY;
                // 缩放事件的处理
                //事件开始
                eleImg.addEventListener('touchstart', function (event) {
                    event.preventDefault();//阻止默认事件，防止底部内容滚动
                    //在触屏设备下，要判断是单指还是多指操作，可以通过event.touches数组对象的长度判断。
                    var touches = event.touches;
                    var events = touches[0];//单指
                    var events2 = touches[1];//双指
                    if (touches.length == 1) {   //单指操作                         
                        pageX = Number(events.pageX);
                        pageY = Number(events.pageY);
                        store.moveable = true;
                        var _obj = $('#innerdiv');
                        //  .css获取的值是字符串
                        position_left = parseFloat(_obj.css('left')
                            .split('px'));
                        position_top = parseFloat(_obj.css('top')
                            .split('px'));
 
                    } else {
                        // 第一个触摸点的坐标
                        store.pageX = events.pageX;
                        store.pageY = events.pageY;
                        store.moveable = true;
                        if (events2) {
                            store.pageX2 = events2.pageX;
                            store.pageY2 = events2.pageY;
                        }
                        store.originScale = store.scale || 1;
                    }
                }, { passive: false }); //passive: false必须加上,否则控制台报错
                //开始移动
                document.addEventListener('touchmove', function (event) {
                    // event.preventDefault();//阻止默认事件，防止底部滚动
                    if (!store.moveable) {
                        return;
                    }
                    var touches = event.touches;
                    var events = touches[0];
                    var events2 = touches[1];
                    if (touches.length == 1) 
                    {
                        var pageX2 = Number(events.pageX);
                        var pageY2 = Number(events.pageY);
                        //控制图片移动
                        $('#innerdiv').css({
                            'top': position_top + pageY2 - pageY + 'px',
                            "left": position_left + pageX2 - pageX + 'px'
                        })
                    } 
                    else 
                    {
                        // 双指移动
                        if (events2) {
                            // 第2个指头坐标在touchmove时候获取
                            if (!store.pageX2) {
                                store.pageX2 = events2.pageX;
                            }
                            if (!store.pageY2) {
                                store.pageY2 = events2.pageY;
                            }
 
                            // 获取坐标之间的距离
                            var getDistance = function (start, stop) {
                                //用到三角函数
                                return Math.hypot(stop.x - start.x,
                                    stop.y - start.y);
                            };
                            // 双指缩放比例计算
                            var zoom = getDistance({
                                x: events.pageX,
                                y: events.pageY
                            }, {
                                x: events2.pageX,
                                y: events2.pageY
                            }) / getDistance({
                                x: store.pageX,
                                y: store.pageY
                            }, {
                                x: store.pageX2,
                                y: store.pageY2
                            });
                            // 应用在元素上的缩放比例
                            var newScale = store.originScale * zoom;
                            // 最大缩放比例限制
                            if (newScale > 3) 
                            {
                                newScale = 3;
                            }
                            // 记住使用的缩放值
                            store.scale = newScale;
                            // 图像应用缩放效果
                            eleImg.style.transform = 'scale('
                                + newScale + ')';
                        }
                    }
                }, { passive: false });//*/
 
                document.addEventListener('touchend', function () {
                    store.moveable = false;
                    delete store.pageX2;
                    delete store.pageY2;
                });
                document.addEventListener('touchcancel', function () {
                    store.moveable = false;
                    delete store.pageX2;
                    delete store.pageY2;
                });
            });
        //移动端手指页面结束
    });
 
    //遮罩层图片位置
    function imgShow(outerdiv, innerdiv, bigimg, _this) {
        //这是刚才判断是否PC端的函数事件
        var flag = IsPC();
        console.log(flag);
        var src = _this.attr("src");//获取当前点击的pimg元素中的src属性 
        $(bigimg).attr("src", src);//设置#bigimg元素的src属性 
        /*获取当前点击图片的真实大小，并显示弹出层及大图*/
        $("<img/>").attr("src", src).load(function () {
            //注意在使用这种方法获取窗口高度和宽度的时候,
            //务必在html页面最上方加上一句<!DOCTYPE html>,否则获取屏幕高度时会出问题
            var windowW = $(window).width();//获取当前窗口宽度
            var windowH = $(window).height();//获取当前窗口高度  
            var realWidth = this.width;//获取图片真实宽度 
            var realHeight = this.height;//获取图片真实高度 
            var imgWidth, imgHeight;
            var scale = 0.8;//缩放尺寸，当图片真实宽度和高度大于窗口宽度和高度时进行缩放 
            if (realHeight > windowH * scale) {//判断图片高度 
                imgHeight = windowH * scale;//如大于窗口高度，图片高度进行缩放 
                imgWidth = imgHeight / realHeight * realWidth;//等比例缩放宽度
                if (imgWidth > windowW * scale) {//如宽度扔大于窗口宽度 
                    imgWidth = windowW * scale;//再对宽度进行缩放 
                }
            } else if (realWidth > windowW * scale) {//如图片高度合适，判断图片宽度 
                imgWidth = windowW * scale;//如大于窗口宽度，图片宽度进行缩放 
                imgHeight = imgWidth / realWidth * realHeight;//等比例缩放高度 
            } else {//如果图片真实高度和宽度都符合要求，高宽不变 
                if (flag == false) {
                    imgWidth = realWidth;
                    imgHeight = realHeight;
                } else if (realWidth >= 1000) {  //这里我怕图片太大又做了个判断
                    imgWidth = realWidth;
                    imgHeight = realHeight;
                } else {
                    imgWidth = realWidth * 2;
                    imgHeight = realHeight * 2;
                }
            }
            $(bigimg).css("width", imgWidth);//以最终的宽度对图片缩放 
            var w = (windowW - imgWidth) / 2;//计算图片与窗口左边距 
            var h = (windowH - imgHeight) / 2;//计算图片与窗口上边距 
            $(innerdiv).css({
                "top": h,
                "left": w
            });//设置#innerdiv的top和left属性 
            $(outerdiv).fadeIn("fast");//淡入显示#outerdiv及.pimg 
        });
        $(outerdiv).click(function () {//再次点击淡出消失弹出层 
            $(this).fadeOut("fast");
        });
    };
 
    function IsPC() 
    {
        var sUserAgent = navigator.userAgent;
        if (sUserAgent.indexOf('Android') > -1 || sUserAgent.indexOf('iPhone') > -1 || sUserAgent.indexOf('iPad') > -1 || sUserAgent.indexOf('iPod') > -1 || sUserAgent.indexOf('Symbian') > -1) {
            return false;
        }
        else {
            return true;
        }
    }
