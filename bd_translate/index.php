<!doctype html>
<head>
    <meta charset="utf-8"/>
    <style>
        textarea{
            display: inline-block;
            width: 400px;
            height: 300px;
            vertical-align: middle;
        }

        button{
            cursor: pointer;
            font-size: 14px;
            color: #FFFFFF;
            line-height: 20px;
            padding: 5px 20px;
            font-size: 14px;
            border-radius: 2px;
            outline: none;
            border: none;
            text-align: center;
            width: 100px;
            height: 30px;
            background:#128BF7
        }

    </style>


</head>

<body>
    <textarea id="old"></textarea>
    <button id="zhToEn">中翻英</button>
    <button id="zhToHk">中翻繁体</button>
    <textarea id="result"></textarea>


    <script src="//apps.bdimg.com/libs/jquery/1.9.1/jquery.min.js"></script>
    <script src="./md5.js"></script>
    <script type="text/javascript">




$("#zhToEn").click(function () {


    var jsonObj = JSON.parse($("#old").val());
    console.log(jsonObj);

    var q='';

    var old = [];
    for(var attr in jsonObj) {
        console.log(attr);//attr
        old.push(attr)
        console.log(jsonObj[attr]);//value
        q=q+jsonObj[attr]+"\\"
    }




    var appid = '';//－－－－－－－这里自己申请哈
    var key = '';//－－－－－－－这里自己申请哈

    var salt = (new Date).getTime();
    var from = 'zh';
    var to = 'en';

    var query =q.substr(0,q.length-1);
    var str1 = appid + query + salt +key;
    var sign = MD5(str1);


    $.ajax({
        url: 'http://api.fanyi.baidu.com/api/trans/vip/translate',
        type: 'get',
        dataType: 'jsonp',
        data: {
            q: query,
            appid: appid,
            salt: salt,
            from: from,
            to: to,
            sign: sign
        },
        success: function (data) {
            var transResult = data.trans_result[0].dst;
            transResult = transResult.replace(/\s+/g,"");
            transResult = transResult.split("/")

            console.log(old,transResult)



            var result="{";
            for(var item =0;item < old.length;item++){
                var kk ="  "+'"'+old[item]+'"'+":"+'"'+transResult[item]+'"';
                if(item != (old.length -1)){
                    kk = kk+","
                }

                result = result+"\n"+kk;
            }
            result = result+"\n"+"}";

            console.log(result)
            $("#result").val(result)

        }
    });

})

$("#zhToHk").click(function () {

    var jsonObj = JSON.parse($("#old").val());
    console.log(jsonObj);

    var q='';

    var old = [];
    for(var attr in jsonObj) {
        console.log(attr);//attr
        old.push(attr)
        console.log(jsonObj[attr]);//value
        q=q+jsonObj[attr]+"\\"
    }




    var appid = '';//－－－－－－－这里自己申请哈
    var key = '';  //－－－－－－－这里自己申请哈
    var salt = (new Date).getTime();
    var from = 'zh';
    var to = 'cht';

    var query =q.substr(0,q.length-1);
    var str1 = appid + query + salt +key;
    var sign = MD5(str1);


    $.ajax({
        url: 'http://api.fanyi.baidu.com/api/trans/vip/translate',
        type: 'get',
        dataType: 'jsonp',
        data: {
            q: query,
            appid: appid,
            salt: salt,
            from: from,
            to: to,
            sign: sign
        },
        success: function (data) {
            var transResult = data.trans_result[0].dst;
            transResult = transResult.replace(/\s+/g,"");
            transResult = transResult.split("\\");

            console.log(old,transResult)



            var result="{";
            for(var item =0;item < old.length;item++){
                var kk ="  "+'"'+old[item]+'"'+":"+'"'+transResult[item]+'"';
                if(item != (old.length -1)){
                    kk = kk+","
                }

                result = result+"\n"+kk;
            }
            result = result+"\n"+"}";
            console.log(result)
            $("#result").val(result)

        }
    });

})

</script>
</body>
