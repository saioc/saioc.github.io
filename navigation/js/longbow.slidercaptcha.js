(function () {
    'use strict';

    var extend = function () {
        var length = arguments.length;
        var target = arguments[0] || {};
        if (typeof target != "object" && typeof target != "function") {
            target = {};
        }
        if (length == 1) {
            target = this;
            i--;
        }
        for (var i = 1; i < length; i++) {
            var source = arguments[i];
            for (var key in source) {
                // 使用for in会遍历数组所有的可枚举属性，包括原型。
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }
        return target;
    }

    var isFunction = function isFunction(obj) {
        return typeof obj === "function" && typeof obj.nodeType !== "number";
    };

    var SliderCaptcha = function (element, options) {
        this.$element = element;
        this.options = extend({}, SliderCaptcha.DEFAULTS, options);
        this.$element.style.position = 'relative';
        this.$element.style.width = this.options.width + 'px';
        this.$element.style.margin = '0 auto';
        this.init();
    };

    SliderCaptcha.DEFAULTS = {
        width: 280,     // canvas宽度
        height: 180,    // canvas高度
        PI: Math.PI,
        sliderL: 42,    // 滑块边长
        sliderR: 9,     // 滑块半径
        offset: 8,      // 容错偏差
        loadingText: slidercaptcha.loading, //加载中...
        failedText: slidercaptcha.retry,    //再试一次
        barText: slidercaptcha.slider,      //向右滑动填充拼图
        repeatIcon: 'iconfont icon-refresh',
        maxLoadCount: 3,
        localImages: function () {
            return '';
        },
        verify: function (arr, url) {
            var ret = false;
            $.ajax({
                url: url,
                data: {
                    "datas": JSON.stringify(arr),
                },
                dataType: "json",
                type: "post",
                async: false,
                success: function (result) {
                    ret = JSON.stringify(result);
                    console.log("返回结果：" + ret)
                }
            });
            return ret;
        }
    };

    function Plugin(option) {
        var $this = document.getElementById(option.id);
        var options = typeof option === 'object' && option;
        return new SliderCaptcha($this, options);
    }

    window.sliderCaptcha = Plugin;
    window.sliderCaptcha.Constructor = SliderCaptcha;

    var _proto = SliderCaptcha.prototype;
    _proto.init = function () {
        this.initDOM();
        this.initImg();
        this.bindEvents();
    };

    _proto.initDOM = function () {
        var createElement = function (tagName, className) {
            var elment = document.createElement(tagName);
            elment.className = className;
            return elment;
        };

        var createCanvas = function (width, height) {
            var canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            return canvas;
        };

        var canvas = createCanvas(this.options.width - 2, this.options.height); // 画布
        var block = canvas.cloneNode(true); // 滑块
        var sliderContainer = createElement('div', 'sliderContainer');
        var refreshIcon = createElement('i', 'refreshIcon ' + this.options.repeatIcon);
        var sliderMask = createElement('div', 'sliderMask');
        var sliderbg = createElement('div', 'sliderbg');
        var slider = createElement('div', 'captcha-slider');
        var sliderIcon = createElement('i', 'iconfont icon-arrow-r sliderIcon');
        var text = createElement('span', 'sliderText');

        canvas.className = 'captcha-body-bg placeholder';
        block.className = 'captcha-body-bar';
        text.innerHTML = this.options.barText;

        var el = this.$element;
        el.appendChild(canvas);
        el.appendChild(refreshIcon);
        el.appendChild(block);
        slider.appendChild(sliderIcon);
        sliderMask.appendChild(slider);
        sliderContainer.appendChild(sliderbg);
        sliderContainer.appendChild(sliderMask);
        sliderContainer.appendChild(text);
        el.appendChild(sliderContainer);

        var _canvas = {
            canvas: canvas,
            block: block,
            sliderContainer: sliderContainer,
            refreshIcon: refreshIcon,
            slider: slider,
            sliderMask: sliderMask,
            sliderIcon: sliderIcon,
            text: text,
            canvasCtx: canvas.getContext('2d'),
            blockCtx: block.getContext('2d')
        };

        if (isFunction(Object.assign)) {
            Object.assign(this, _canvas);
        }
        else {
            extend(this, _canvas);
        }
    };

    _proto.initImg = function () {
        var that = this;
        var isIE = window.navigator.userAgent.indexOf('Trident') > -1;
        var L = this.options.sliderL + this.options.sliderR * 2 + 3; // 滑块实际边长
        var drawImg = function (ctx, operation) {
            var l = that.options.sliderL;
            var r = that.options.sliderR;
            var PI = that.options.PI;
            var x = that.x;
            var y = that.y;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.arc(x + l / 2, y - r + 2, r, 0.72 * PI, 2.26 * PI);
            ctx.lineTo(x + l, y);
            ctx.arc(x + l + r - 2, y + l / 2, r, 1.21 * PI, 2.78 * PI);
            ctx.lineTo(x + l, y + l);
            ctx.lineTo(x, y + l);
            ctx.arc(x + r - 2, y + l / 2, r + 0.4, 2.76 * PI, 1.24 * PI, true);
            ctx.lineTo(x, y);
            ctx.lineWidth = 2;
            ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
            ctx.stroke();
            ctx[operation]();
            ctx.globalCompositeOperation = isIE ? 'xor' : 'destination-over';
        };

        var getRandomNumberByRange = function (start, end) {
            return Math.round(Math.random() * (end - start) + start);
        };

        var getRandomNumberByRangeToX = function (start, end) {
            var x = getRandomNumberByRange(start, end);
            if (isFunction(that.options.getX)) that.options.getX(x);
            return x;
        };

        var img = new Image();
        img.crossOrigin = "Anonymous";
        var loadCount = 0;
        img.onload = function () {
            // 随机创建滑块的位置
            that.x = getRandomNumberByRangeToX(L + 10, that.options.width - (L + 10));
            that.y = getRandomNumberByRange(10 + that.options.sliderR * 2, that.options.height - (L + 10));
            drawImg(that.canvasCtx, 'fill');
            drawImg(that.blockCtx, 'clip');

            that.canvasCtx.drawImage(img, 0, 0, that.options.width - 2, that.options.height);
            that.blockCtx.drawImage(img, 0, 0, that.options.width - 2, that.options.height);
            var y = that.y - that.options.sliderR * 2 - 1;
            var ImageData = that.blockCtx.getImageData(that.x - 3, y, L, L);
            that.block.width = L;
            that.blockCtx.putImageData(ImageData, 0, y + 1);
            that.text.textContent = that.text.getAttribute('data-text');
        };
        img.onerror = function () {
            loadCount++;
            if (window.location.protocol === 'file:') {
                loadCount = that.options.maxLoadCount;
                console.error("can't load pic resource file from File protocal. Please try http or https");
            }
            if (loadCount >= that.options.maxLoadCount) {
                that.text.textContent = slidercaptcha.failed;
                that.classList.add('text-danger');
                return;
            }
            img.src = that.options.localImages();
        };
        img.setSrc = function () {
            var src = '';
            loadCount = 0;
            that.text.classList.remove('text-danger');
            if (isFunction(that.options.setSrc)) src = that.options.setSrc();
            if (!src || src === '') src = 'https://picsum.photos/' + that.options.width + '/' + that.options.height + '/?image=' + Math.round(Math.random() * 20);
            if (isIE) { // IE浏览器无法通过img.crossOrigin跨域，使用ajax获取图片blob然后转为dataURL显示
                var xhr = new XMLHttpRequest();
                xhr.onloadend = function (e) {
                    var file = new FileReader(); // FileReader仅支持IE10+
                    file.readAsDataURL(e.target.response);
                    file.onloadend = function (e) {
                        img.src = e.target.result;
                    };
                };
                xhr.open('GET', src);
                xhr.responseType = 'blob';
                xhr.send();
            } else img.src = src;
        };
        img.setSrc();
        this.text.setAttribute('data-text', this.options.barText);
        this.text.textContent = this.options.loadingText;
        this.img = img;
    };

    _proto.clean = function () {
        this.canvasCtx.clearRect(0, 0, this.options.width, this.options.height);
        this.blockCtx.clearRect(0, 0, this.options.width, this.options.height);
        this.block.width = this.options.width;
    };

    _proto.bindEvents = function () {
        var that = this;
        this.$element.addEventListener('selectstart', function () {
            return false;
        });

        this.refreshIcon.addEventListener('click', function () {
            that.text.textContent = that.options.barText;
            if (isFunction(that.options.reset)) that.options.reset();
            that.reset();
            if (isFunction(that.options.onRefresh)) that.options.onRefresh.call(that.$element);
        });

        var originX, originY, trail = [],
            isMouseDown = false;

        var handleDragStart = function (e) {
            if (that.text.classList.contains('text-danger')) return;
            e.preventDefault();
            originX = e.clientX || e.touches[0].clientX;
            originY = e.clientY || e.touches[0].clientY;
            isMouseDown = true;
        };

        var handleDragMove = function (e) {
            if (!isMouseDown) return false;
            var eventX = e.clientX || e.touches[0].clientX;
            var eventY = e.clientY || e.touches[0].clientY;
            var moveX = eventX - originX;
            var moveY = eventY - originY;
            if (moveX < 0 || moveX + 40 > that.options.width) return false;
            that.slider.style.left = (moveX - 1) + 'px';
            var blockLeft = (that.options.width - 40 - 20) / (that.options.width - 40) * moveX;
            that.block.style.left = blockLeft + 'px';

            that.sliderContainer.classList.add('sliderContainer_active');
            that.sliderMask.style.width = (moveX + 4) + 'px';
            trail.push(Math.round(moveY));
        };

        var handleDragEnd = function (e) {
            if (!isMouseDown) return false;
            isMouseDown = false;
            var eventX = e.clientX || e.changedTouches[0].clientX;
            if (eventX === originX) return false;
            that.sliderContainer.classList.remove('sliderContainer_active');
            that.trail = trail;
            var data = that.verify();
            if (data.spliced && data.verified) {
                that.sliderContainer.classList.add('sliderContainer_success');
                if (isFunction(that.options.onSuccess)) that.options.onSuccess.call(that.$element, data);
            } else {
                that.sliderContainer.classList.add('sliderContainer_fail');
                if (isFunction(that.options.onFail)) that.options.onFail.call(that.$element);
                setTimeout(function () {
                    that.text.innerHTML = that.options.failedText;
                    that.reset();
                }, 1000);
            }
        };

        this.slider.addEventListener('mousedown', handleDragStart);
        this.slider.addEventListener('touchstart', handleDragStart);
        document.addEventListener('mousemove', handleDragMove);
        document.addEventListener('touchmove', handleDragMove);
        document.addEventListener('mouseup', handleDragEnd);
        document.addEventListener('touchend', handleDragEnd);

        document.addEventListener('mousedown', function () { return false; });
        document.addEventListener('touchstart', function () { return false; });
        document.addEventListener('swipe', function () { return false; });
    };

    _proto.verify = function () {
        var arr = this.trail; // 拖动时y轴的移动距离
        var left = parseInt(this.block.style.left);
        var verified = false;
        var sum = function (x, y) { return x + y; };
        var square = function (x) { return x * x; };
        var average = arr.reduce(sum) / arr.length;
        var deviations = arr.map(function (x) { return x - average; });
        var stddev = Math.sqrt(deviations.map(square).reduce(sum) / arr.length);
        verified = stddev !== 0;
        return {
            spliced: Math.abs(left - this.x) < this.options.offset,
            verified: verified,
            distance: left
        };
    };

    _proto.reset = function () {
        this.sliderContainer.classList.remove('sliderContainer_fail');
        this.sliderContainer.classList.remove('sliderContainer_success');
        this.slider.style.left = 0;
        this.block.style.left = 0;
        this.sliderMask.style.width = 0;
        this.clean();
        this.text.setAttribute('data-text', this.text.textContent);
        this.text.textContent = this.options.loadingText;
        this.img.setSrc();
    };
})();

function SliderCaptchaOpen(_btn) {
    var modal_id = 'slider_captcha';
    window.captcha._this = _btn;

    if (!$('#' + modal_id).length) {
        var modal_html = '<div id="' + modal_id + '" class="modal fade" tabindex="-1" role="dialog" aria-hidden="false" style="user-select:none;z-index:100000000;background:rgba(0, 0, 0, 0.5);">\
                            <div class="modal-dialog modal-dialog-centered mx-auto" style="width:320px"><div class="modal-content"><div class="modal-body"><div id="'+ modal_id + '_body" class="slider-captcha my-2"></div>\
                            <div class="d-flex align-items-center"><div class="text-xs text-muted">© '+theme.sitesName+'</div><div class="slider-captcha-close ml-auto" data-dismiss="modal" aria-label="Close"><i class="iconfont icon-close"></i></div>\
                        </div></div></div></div></div>';
        $('body').append(modal_html);
        $('#' + modal_id + ' [data-dismiss="modal"]').on('click', hide);
    }

    function str($str) {
        var a = get_random(11, 40);
        var b = get_random(11, 40);
        return a + '' + getPass(a) + $str + getPass(b) + b;
    }

    function get_random(min, max) {
        return Math.round(Math.random() * (min - max) + max);
    }

    function getPass(len) {
        var tmpCh = "";
        for (var i = 0; i < len; i++) {
            tmpCh += String.fromCharCode(Math.floor(Math.random() * 26) + "a".charCodeAt(0));
        }
        return tmpCh;
    }

    function hide() {
        $('#' + modal_id).removeClass('show');
        setTimeout(function () {
            $('#' + modal_id + "_body").html("");
            $('#' + modal_id).hide();
        }, 300);
    }

    function show() {
        window.captcha.imgIndex = 0;
        window.captcha.imgId = false;
        $('#' + modal_id).show();
        setTimeout(function () {
            $('#' + modal_id).addClass('show');
            sliderCaptcha({
                id: modal_id + '_body',
                setSrc: function () {
                    if (window.captcha.imgId == false || window.captcha.imgIndex>=3) {
                        window.captcha.imgIndex = 0;
                        window.captcha.imgId = Math.round(Math.random() * 20);
                    }
                    window.captcha.imgIndex++;
                    return theme.uri + '/images/captcha/' + window.captcha.imgId + '.jpg';
                },
                reset: function () {
                    window.captcha.imgId = false;
                },
                onSuccess: function (res) {
                    var randstr = window.captcha.rand_str;
                    delete(window.captcha.rand_str);
                    delete(window.captcha.token);
                    var randstr_a = get_random(1, 9);
                    var randstr_b = get_random(15, 25);

                    window.captcha.ticket = str(res.distance);
                    window.captcha.randstr = randstr_a + '' + randstr.substring(randstr_a, randstr_b) + randstr_b;
                    window.captcha.spliced = res.spliced;

                    setTimeout(function () {
                        hide();
                        window.captcha._this.click();
                        return false;
                    }, 500);
                },
                getX: function (_x) {
                    window.captcha.ticket = 0;
                    window.captcha.randstr = 0;
                    window.captcha.spliced = 0;

                    $.ajax({
                        url: theme.ajaxurl,
                        data: {
                            action: 'get_slider_captcha',
                            randstr: str(_x),
                        },
                    }).done(function (data) {
                        window.captcha.token = data.token;
                        window.captcha.rand_str = data.rand_str;
                        window.captcha.check = data.check;
                    });
                },
            });
        }, 30);
    }

    show();
}