document.write(unescape("%3Clink rel='stylesheet' href='https://baidu.com.im/Staticfile/tool/script/hljs/styles/monokai.css'%3E"));
//document.write(unescape("%3Cscript src='https://baidu.com.im/Staticfile/tool/script/hljs/highlight.pack.js' type='text/javascript'%3E%3C/script%3E"));
var script = document.createElement("script");
script.src = "https://baidu.com.im/Staticfile/tool/script/hljs/highlight.pack.js";
script.type = "text/javascript";
script.async = true;  // 确保脚本异步加载
document.head.appendChild(script);

$(function(){
hljs.initHighlightingOnLoad();

});
function is_hide(attr){
	attr = (typeof(attr) == "undefined" || title == '') ? "pre" : attr;
	$(attr).hide();
}
$("pre").hide();
__=["\x70\x72\x65","\x73\x68\x6f\x77","\x68\x69\x67\x68\x6c\x69\x67\x68\x74\x41\x75\x74\x6f","\x76\x61\x6c\x75\x65",'\x23\x72\x65\x73\x75\x6c\x74',"\x65\x6d\x70\x74\x79","\x68\x74\x6d\x6c"];function hightout(Bd1){$(__[0])[__[1]]();var YLUMqiA2= hljs[__[2]](Bd1)[__[3]];$(__[4])[__[5]]();$(__[4])[__[6]](YLUMqiA2);}
function is_show(attr){
	attr = (typeof(attr) == "undefined" || title == '') ? "pre" : attr;
	$(attr).show();
}
function ClearAll() {
    $("#content").val("");
    $("#content").select();
	$("#result").html('');
	$("pre").hide();
}
