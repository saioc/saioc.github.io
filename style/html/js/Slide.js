$(function() {
	let index = 0;
	let btn = false;
	$('a[href=""]').prop('href', 'javascript:;');
	$('.content>ul>li').hide();
	$('.content>ul>li:eq(0)').show();
	$('.carousel').hover(function() {
		$('.htmlpos').stop().fadeIn()
	}, function() {
		$('.htmlpos').stop().fadeOut()
	})
	$('.left').on('click', function() {
		btn = true;
		clean();
		if(index == 0) {
			index = 5;
		} else {
			--index;
		}
		show();
	})
	$('.right').on('click', function() {
		btn = true;
		clean();
		if(index == 5) {
			index = 0;
		} else {
			++index;
		}
		show();
	})
	$('.htmldot li').on('click', function() {
		btn = true;
		let now = $(this).index()
		if(now != index) {
			clean();
			index = now;
			show();
		}
	})
	setInterval(function() {
		if(!btn) {
			clean();
			if(index == 5) {
				index = 0;
			} else {
				++index;
			}
			show();
		} else {
			btn = false;
		}
	}, 5000)

	function clean() {
		$(`.content>ul>li:eq(${index})`).stop().fadeOut();
		$(`.htmldot>ul>li:eq(${index})`).removeClass('active');
	}

	function show() {
		console.log(index);
		$(`.content>ul>li:eq(${index})`).stop().fadeIn();
		console.log($(`.content>ul>li:eq(${index})`))
		$(`.htmldot>ul>li:eq(${index})`).addClass('active');
	}
})