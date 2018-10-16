;(function(){
    'use strict';

    $(function() {

        //首先定义i，使i与每张图片的id数一一对应
        let i = 0;

        //根据图片的个数，添加底部导航圆点
        for(let i = 0; i < $('#box .img li').length; i++) {
            $('#box .circle').append('<li></li>');
        }
        //设置第一个圆点的背景为红色
        $('.circle li').first().addClass('active');

        //第一张图片克隆后添加到最后一张后面
        let lastImg = $('#box .img li').first().clone();
        $('.img').append(lastImg).width($('.img li').length*($('.img img').width()));

        //定义自动播放的时间函数
        window.timer = setInterval(autoPlay, 3000);


        //定义鼠标在图片上时暂停自动播放，并且显示左右导航栏
        $('#box').hover(function() {
            clearInterval(window.timer);
            $('.nav').show();
        }, function() {
            window.timer = setInterval(autoPlay, 3000);
            $('.nav').hide();
        });

        function Play() {
            $('.img').stop().animate({left: -i * 960}, 500);
        }

        //定义自动播放事件
        function autoPlay() {
            i ++;
            if(i == $('.img li').length) {
                i = 1;
                $('.img').css({left: 0});//回到第一张图
            }
            //正常播放
            Play();

            //圆点对应变化
            if(i == $('.img li').length - 1) {
                $('.circle li').eq(0).addClass('active').siblings().removeClass('active');
            }
            Play();
            $('.circle li').eq(i).addClass('active').siblings().removeClass('active');
        }

        //上一张
        $('#left').click(function() {
           i--;
           if(i == -1) {
               i = $('.img li').length - 2;
               $('.img').css({left: -($('.img li').length - 1) * 960});
           }
           Play();
           $('.circle li').eq(i).addClass('active').siblings().removeClass('active');
        });

        //下一张
        $('#right').click(function() {
            i++;
            if(i == $('.img li').length) {
                i = 1;
                $('.img').css({left: 0});
                $('.circle li').eq(i).addClass('active').siblings().removeClass('active');
            }else {
                Play();
                $('.circle li').eq(i).addClass('active').siblings().removeClass('active');
            }
        });

        //鼠标进入圆点
        $('.circle li').mouseover(function() {
            let _index = $(this).index();

            i = _index;
            Play();
            $('.circle li').eq(i).addClass('active').siblings().removeClass('active');
        });


    });

})();