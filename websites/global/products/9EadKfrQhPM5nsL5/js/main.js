var producthash = '9EadKfrQhPM5nsL5';
var ltIE9 = (navigator.userAgent.replace(/^.*MSIE\s+(\d+\.\d+).*$/ig, '$1') * 1) < 9;
//document.write('<link rel="stylesheet" href="/websites/global/products/' + producthash + '/css/main.css">');

var firstTimeLoad = true;
var kvTimeline;
var canvas, stage, exportRoot;

var isfixed = false;
var kvTimelineHeight = 6000;

function kvResize() {
    $("#index").width($(window).width());
    $("#index").height($(window).height());
    if (!isfixed) {
        $("#kv-phone").width($(window).width() * 1.5);
    }
}



$(function () {

    window.exportRoot = exportRoot;

    var click_event = "click";
    //setup section's pager
    //var pagerColor = ['', '', 'white', 'white', 'white', 'white', '', '', 'white']
    var pagerColor = ['white', '#7ac7f8', '#dce9f0', '#f9f5c5', '#bfdefb', '#c9e7bc', '#edeeea', '#e8d7cc']

    if ($("html").hasClass('ie8')) {
        var sectionAry = ['index', 'padfone', 'performance', 'camera', 'design', 'audio', 'app-ie8', 'accessory'];
        $('#special-sectionOverview #follow-wrap #app').css('display', 'none');
        $('#special-sectionOverview #custom-wrap #follow-wrap #padfone .content .kv #pad-photo #pad-screen').css('display', 'none');

    }
    else {
        var sectionAry = ['index', 'padfone', 'performance', 'camera', 'design', 'audio', 'app', 'accessory'];
        $('#special-sectionOverview #follow-wrap #app-ie8').css('display', 'none');
    }
    var sectionTotal = sectionAry.length;

    for(var j=0;j<sectionTotal;j++)
    {
        /*
        //waypoint
        $('section#'+sectionAry[j]).waypoint(function(direction) {

            var target = $(this).attr('id');
            switch(direction)
            {
                case 'down':
                    $('nav.shortcut ul li').each(function(){
                        if($(this).attr('data-anchor') == target)
                        {
                            $(this).addClass('on');
                        }
                        else
                        {
                            $(this).removeClass('on');
                        }
                    })
                break;
                
                case 'up':
                    $('nav.shortcut ul li').each(function(){
                        if($(this).attr('data-anchor') == target)
                        {
                            $(this).addClass('on');
                        }
                        else
                        {
                            $(this).removeClass('on');
                        }
                    })
                break;
            }
        });
        */

        
        var total = $("#custom-wrap section#"+sectionAry[j]+" ul.content li").length;
        if (total == 1 || sectionAry[j] == 'index' || sectionAry[j] == 'accessory')
            continue;

        $("#custom-wrap section#"+ sectionAry[j]).append('<nav class="pager '+sectionAry[j]+' '+ pagerColor[j]+'"></nav>');
        var i=0;
        for(i=0;i<total;i++)
        {
            var status = '';
            if(i==0)
                status = 'active first';
            $("#custom-wrap section#"+sectionAry[j]+" nav.pager").append('<a href="javascript:;" class="'+status+'" slide="'+i+'"></a>');
        }

        $("#custom-wrap section#"+sectionAry[j]).append('<nav class="arrow '+sectionAry[j]+'"></nav>');
        var i=0;
        var total = 2;
        for(i=0;i<total;i++)
        {
            var dx = 'next';
            if(i==0)
            {
                dx = 'prev'
            }
            $("#custom-wrap section#"+sectionAry[j]+" nav.arrow").append('<a href="javascript:;" class="'+dx+'"></a>');
        }
    }

    //nav arrow
    $("nav.arrow a").on(click_event, function () {
        var current = $(this).parents(".page").find("ul.content li.active");
        var target = null;

        if ($(this).hasClass('next')) {
            target = current.next().length > 0 ? current.next() : current.siblings().first();
        }
        else {
            target = current.prev().length > 0 ? current.prev() : current.siblings().last();
        }
        var clickItem = $(this).parents(".page").find("nav.pager").find("a").eq(target.index());
        clickItem.trigger(click_event);
    })

    if ($("html").hasClass('ie8')) {
        //nav pager
        $("nav.pager a").on(click_event, function () {
            var current = $(this).parents(".page").find("ul.content li.active");
            var target = $(this).parents(".page").find("ul.content li").eq($(this).index());
            var current_bg = $(this).parents(".page").find("ul.bg li").eq(current.index());
            var target_bg = $(this).parents(".page").find("ul.bg li").eq($(this).index());

            if (current.index() === target.index())
                return;
            target.addClass("prepare");
            if (target.index() > current.index()) {
                setTimeout(function () {
                    target.removeClass("prev").addClass("next");
                    target_bg.removeClass("prev").addClass("next");
                    setTimeout(function () {
                        target.removeClass("prepare");
                        current.addClass("prev").removeClass("active");
                        target.addClass("active").removeClass("prev").removeClass("next");
                    }, 50);
                }, 1);
            }
            else {
                setTimeout(function () {
                    target.removeClass("next").addClass("prev");
                    target_bg.removeClass("next").addClass("prev");
                    setTimeout(function () {
                        target.removeClass("prepare");
                        current.removeClass("active").addClass("next");
                        target.removeClass("prev").removeClass("next").addClass("active");
                    }, 50);
                }, 1);
            }

            //TweenMax.set(target_bg, { zIndex: 2000 });
            //TweenMax.set(current_bg, { zIndex: 1000 });
            //TweenMax.to(target_bg, 0.3, { opacity: 1, delay: .4 });
            //TweenMax.to(current_bg, 0.3, { opacity: 0, delay: 1 });
            $(this).siblings().removeClass('active')
            $(this).addClass('active');
            target.find("img").trigger("click");

        })

        // sidebar for #custom-wrap
        $("nav.shortcut ul li.fixed").on('click', function () {
            TweenMax.to(window, 1, { scrollTo: { y: $("#custom-wrap").offset().top, ease: Quad.easeOut } });
        })
        // sidebar for section#
        $("nav.shortcut ul li.m2").on('click', function () {
            TweenMax.to(window, .5, { scrollTo: { y: $("section#padfone").offset().top, ease: Quad.easeOut } });
        })
        $("nav.shortcut ul li.m3").on('click', function () {
            TweenMax.to(window, .5, { scrollTo: { y: $("section#performance").offset().top, ease: Quad.easeOut } });
        })
        $("nav.shortcut ul li.m4").on('click', function () {
            TweenMax.to(window, .5, { scrollTo: { y: $("section#camera").offset().top, ease: Quad.easeOut } });
        })
        $("nav.shortcut ul li.m5").on('click', function () {
            TweenMax.to(window, .5, { scrollTo: { y: $("section#design").offset().top, ease: Quad.easeOut } });
        })
        $("nav.shortcut ul li.m6").on('click', function () {
            TweenMax.to(window, .5, { scrollTo: { y: $("section#audio").offset().top, ease: Quad.easeOut } });
        })
        $("nav.shortcut ul li.m7").on('click', function () {
            TweenMax.to(window, .5, { scrollTo: { y: $("section#app-ie8").offset().top, ease: Quad.easeOut } });
        })
    }
    else {
        //nav pager
        $("nav.pager a").on(click_event, function () {
            var current = $(this).parents(".page").find("ul.content li.active");
            var target = $(this).parents(".page").find("ul.content li").eq($(this).index());
            var current_bg = $(this).parents(".page").find("ul.bg li").eq(current.index());
            var target_bg = $(this).parents(".page").find("ul.bg li").eq($(this).index());

            if (current.index() === target.index())
                return;
            target.addClass("prepare");
            if (target.index() > current.index()) {
                setTimeout(function () {
                    target.removeClass("prev").addClass("next");
                    target_bg.removeClass("prev").addClass("next");
                    setTimeout(function () {
                        target.removeClass("prepare");
                        current.addClass("prev").removeClass("active");
                        target.addClass("active").removeClass("prev").removeClass("next");
                    }, 50);
                }, 1);
            }
            else {
                setTimeout(function () {
                    target.removeClass("next").addClass("prev");
                    target_bg.removeClass("next").addClass("prev");
                    setTimeout(function () {
                        target.removeClass("prepare");
                        current.removeClass("active").addClass("next");
                        target.removeClass("prev").removeClass("next").addClass("active");
                    }, 50);
                }, 1);
            }

            TweenMax.set(target_bg, { zIndex: 2000 });
            TweenMax.set(current_bg, { zIndex: 1000 });
            TweenMax.to(target_bg, 0.3, { opacity: 1, delay: .4 });
            TweenMax.to(current_bg, 0.3, { opacity: 0, delay: 1 });
            $(this).siblings().removeClass('active')
            $(this).addClass('active');
            target.find("img").trigger("click");

        })

        // sidebar for #custom-wrap
        $("nav.shortcut ul li.fixed").on('click', function () {
            TweenMax.to(window, 1, { scrollTo: { y: $("#custom-wrap").offset().top, ease: Quad.easeOut } });
        })
        // sidebar for section#
        $("nav.shortcut ul li.m2").on('click', function () {
            if (checkKvAnimationComplete()) { TweenMax.to(window, .5, { scrollTo: { y: $("section#padfone").offset().top, ease: Quad.easeOut } }); }
            else { TweenMax.to(window, .5, { scrollTo: { y: $("section#padfone").offset().top + kvTimelineHeight, ease: Quad.easeOut } }); }
        })
        $("nav.shortcut ul li.m3").on('click', function () {
            if (checkKvAnimationComplete()) { TweenMax.to(window, .5, { scrollTo: { y: $("section#performance").offset().top, ease: Quad.easeOut } }); }
            else { TweenMax.to(window, .5, { scrollTo: { y: $("section#performance").offset().top + kvTimelineHeight, ease: Quad.easeOut } }); }
        })
        $("nav.shortcut ul li.m4").on('click', function () {
            if (checkKvAnimationComplete()) { TweenMax.to(window, .5, { scrollTo: { y: $("section#camera").offset().top, ease: Quad.easeOut } }); }
            else { TweenMax.to(window, .5, { scrollTo: { y: $("section#camera").offset().top + kvTimelineHeight, ease: Quad.easeOut } }); }
        })
        $("nav.shortcut ul li.m5").on('click', function () {
            if (checkKvAnimationComplete()) { TweenMax.to(window, .5, { scrollTo: { y: $("section#design").offset().top, ease: Quad.easeOut } }); }
            else { TweenMax.to(window, .5, { scrollTo: { y: $("section#design").offset().top + kvTimelineHeight, ease: Quad.easeOut } }); }
        })
        $("nav.shortcut ul li.m6").on('click', function () {
            if (checkKvAnimationComplete()) { TweenMax.to(window, .5, { scrollTo: { y: $("section#audio").offset().top, ease: Quad.easeOut } }); }
            else { TweenMax.to(window, .5, { scrollTo: { y: $("section#audio").offset().top + kvTimelineHeight, ease: Quad.easeOut } }); }
        })
        $("nav.shortcut ul li.m7").on('click', function () {
            if (checkKvAnimationComplete()) { TweenMax.to(window, .5, { scrollTo: { y: $("section#app").offset().top, ease: Quad.easeOut } }); }
            else { TweenMax.to(window, .5, { scrollTo: { y: $("section#app").offset().top + kvTimelineHeight, ease: Quad.easeOut } }); }
        })
    }
    $("nav.shortcut ul li").on('mouseover', function () {
        $("nav.shortcut").css('width', 51);
    })
    $("nav.shortcut ul li").on('mouseout', function () {
        $("nav.shortcut").css('width', 51);
    })



    $(function () {
        setInterval(updateClock, 1000);
    })

    // updateClock
    function updateClock() {

        var CurrentDate = new Date();
        var hours = CurrentDate.getHours();
        var minutes = CurrentDate.getMinutes();
        var DayNight = "PM";
        if (hours < 12) DayNight = "AM";
        if (hours > 12) hours = hours - 12;
        if (hours === 0) hours = 12;
        if (hours <= 9) hours = "0" + hours;
        if (minutes <= 9) minutes = "0" + minutes;
        var currentTime = hours + ":" + minutes + " " + DayNight;

        document.getElementById("kv-hr-b").innerHTML = hours;
        document.getElementById("kv-min-b").innerHTML = minutes;
        document.getElementById("kv-day-b").innerHTML = DayNight;
        document.getElementById("kv-hr-s").innerHTML = hours;
        document.getElementById("kv-min-s").innerHTML = minutes;

        document.getElementById("kv2-hr-b").innerHTML = hours;
        document.getElementById("kv2-min-b").innerHTML = minutes;
        document.getElementById("kv2-day-b").innerHTML = DayNight;
        document.getElementById("kv2-hr-s").innerHTML = hours;
        document.getElementById("kv2-min-s").innerHTML = minutes;

        document.getElementById("pad-hr-b").innerHTML = hours;
        document.getElementById("pad-min-b").innerHTML = minutes;
        document.getElementById("pad-day-b").innerHTML = DayNight;
        document.getElementById("pad-hr-s").innerHTML = hours;
        document.getElementById("pad-min-s").innerHTML = minutes;
    }

    var kv_scrollTop = $(window).scrollTop();


    function checkKvAnimationComplete() {
        var val;

        if ($(window).height() > 768) {

            if (isfixed) {
                kvTimelineHeight = -768 - $('#kv-wrap').height();
                return false;
            }
            else {
                if ($("#follow-wrap").offset().top > 2000) {
                    kvTimelineHeight = $('#kv-wrap').height() - 768 - 30;
                }
                else {
                    kvTimelineHeight = 6000 - 768 - 768 - 30;
                }
                return false;
            }
        }
        else {
            if (isfixed) {
                kvTimelineHeight = -677 - $('#kv-wrap').height();
                return false;
            }
            else {
                if ($("#follow-wrap").offset().top > 2000) {
                    kvTimelineHeight = $('#kv-wrap').height() - 737 - 30;
                }
                else {
                    kvTimelineHeight = 6000 - 707 - 768 - 30;
                }
                return false;
            }
        }

        if ($("#kv-wrap").offset().top == 799) {
            val = false;
            return val;
        }
        else {
            val = $("#kv-begin").is(":hidden") && $("#kv-animate").is(":hidden") && $("#kv-animate2").is(":hidden") && $("#kv-animate3").is(":hidden") && $("#kv-ie8").is(":hidden");
            return val;
        }
        
    }
    
    //weather

    function formatNum(a_num) {
        if (String(a_num).length < 2) {
            return '0' + String(a_num);
        }
        return a_num;
    }
    $.MyWeather({
        elementid: "#Clima"
        //temperature: "c"

    }, function (City, Country, IP, Latitude, Longitude, Temperature, Picture, WeatherID) {

        var obj = {}
        obj.City = City;
        obj.Country = Country;
        obj.IP = IP;
        obj.Temperature = Math.round(Temperature.split('&')[0]) + '&' + Temperature.split('&')[1];

        //
        if(Temperature.indexOf('celsius') != -1){
            obj.TemperatureUint = 'C';
        }else{
            obj.TemperatureUint = 'F';
        }

        obj.Temperature = obj.Temperature.replace('celsius', '');
        obj.Temperature = obj.Temperature.replace('fahrenheit', '');
        obj.Latitude = Latitude;
        obj.Longitude = Longitude;
        obj.Picture = Picture;
        obj.Weather = obj.Picture.substr(12, obj.Picture.length - 4 - 12);
        switch (obj.Weather) {
            case 'clear-day':
            case 'clear-night':
                obj.WeatherIcon = '<img src="/websites/global/products/9EadKfrQhPM5nsL5/img/weather/sunny.png">';
                obj.WeatherBg = '<img src="/websites/global/products/9EadKfrQhPM5nsL5/img/weather/sunny_bg.png">';
                break;

            case 'cloudy':
            case 'fog':
                obj.WeatherIcon = '<img src="/websites/global/products/9EadKfrQhPM5nsL5/img/weather/cloudy.png">';
                obj.WeatherBg = '<img src="/websites/global/products/9EadKfrQhPM5nsL5/img/weather/cloudy_bg.png">';
                break;

            case 'partly-cloudy-day':
            case 'partly-cloudy-night':
                obj.WeatherIcon = '<img src="/websites/global/products/9EadKfrQhPM5nsL5/img/weather/partlycloudy.png">';
                obj.WeatherBg = '<img src="/websites/global/products/9EadKfrQhPM5nsL5/img/weather/partlycloudy_bg.png">';
                break;

            case 'rain':
            case 'sleet':
                obj.WeatherIcon = '<img src="/websites/global/products/9EadKfrQhPM5nsL5/img/weather/rain.png">';
                obj.WeatherBg = '<img src="/websites/global/products/9EadKfrQhPM5nsL5/img/weather/rain_bg.png">';
                break;

            case 'snow':
                obj.WeatherIcon = '<img src="/websites/global/products/9EadKfrQhPM5nsL5/img/weather/snow.png">';
                obj.WeatherBg = '<img src="/websites/global/products/9EadKfrQhPM5nsL5/img/weather/snow_bg.png">';
                break;

            case 'wind':
                obj.WeatherIcon = '<img src="/websites/global/products/9EadKfrQhPM5nsL5/img/weather/wind.png">';
                obj.WeatherBg = '<img src="/websites/global/products/9EadKfrQhPM5nsL5/img/weather/wind_bg.png">';
                break;

            default:
                obj.WeatherIcon = '<img src="/websites/global/products/9EadKfrQhPM5nsL5/img/weather/sunny.png">';
                obj.WeatherBg = '<img src="/websites/global/products/9EadKfrQhPM5nsL5/img/weather/sunny_bg.png">';
                break;
        }
        var NowDate = new Date();
        obj.Hour = formatNum(NowDate.getHours());
        obj.Minutes = formatNum(NowDate.getMinutes());
        obj.Seconds = formatNum(NowDate.getSeconds());
        obj.time = obj.Hour + ':' + obj.Minutes + ':' + obj.Seconds;
        //
        document.getElementById("kv-city").innerHTML = obj.City+","+obj.Country;
        document.getElementById("kv-weather-icon").innerHTML = obj.WeatherIcon;
        document.getElementById("kv-temp").innerHTML = obj.Temperature + "<span>" + obj.TemperatureUint + "</span>";
        document.getElementById("kv-weather-bg-icon").innerHTML = obj.WeatherBg;

        document.getElementById("kv2-city").innerHTML = obj.City+","+obj.Country;
        document.getElementById("kv2-weather-icon").innerHTML = obj.WeatherIcon;
        document.getElementById("kv2-temp").innerHTML = obj.Temperature + "<span>" + obj.TemperatureUint + "</span>";
        document.getElementById("kv2-weather-bg-icon").innerHTML = obj.WeatherBg;

        document.getElementById("pad-city").innerHTML = obj.City+","+obj.Country;
        document.getElementById("pad-weather-icon").innerHTML = obj.WeatherIcon;
        document.getElementById("pad-temp").innerHTML = obj.Temperature + "<span>" + obj.TemperatureUint + "</span>";
        document.getElementById("pad-weather-bg-icon").innerHTML = obj.WeatherBg;
    });

    //kv Animation
    function kvTimeline_Animation() {

        //kvTimeline Animations
        $('#kv-animate').css('display', 'block');
        $('#kv-animate2').css('display', 'block');
        $('#kv-animate3').css('display', 'block');
        var controller = $.superscrollorama();

        //Initial Size of kvTimeline
        var init_kv_width = $('#kv-animate').width();
        var init_kv_height = $('#kv-animate').height();

        // kv animation timeline for pinned
        kvTimeline = new TimelineMax();

        if ($("html").hasClass('safari')) {

            kvTimeline.append([
            TweenMax.to('#kv-begin', 2.0, { css: { top: 100 + '%', ease: 'Quad.easeIn' } })
            ])
        .append([
            TweenMax.to('#kv-begin', 0.5, { css: { opacity: 0, zIndex:0, left: -200 +'%', ease: 'Quad.easeOut' } }),
            TweenMax.to('#kv-content', 0.5, { css: { opacity: 1, ease: 'Quad.easeIn' } })
        ])
        .append([
            TweenMax.fromTo('#kv-animate', 5.0,
                { css: { width: 150 + '%', height: 4668, top: 0, marginTop: -950, left: -25 + '%', ease: 'Quad.easeOut' } },
                { css: { width: 260, height: 511, top: 50 + '%', marginTop: -255, left: 50 + '%', marginLeft: -130, ease: 'Quad.easeOut' } }
            ),
            TweenMax.to('#kv-phone', 5.0, { css: { width: 260, ease: 'Quad.easeOut' } }),
            TweenMax.to('#kv-content', 5.0, { css: { marginLeft: -83, marginTop: -340, ease: 'Quad.easeOut' } }),
            TweenMax.to('.kv-clock-big', 5.0, { css: { top: 380, left: -5, ease: 'Quad.easeOut' } }),
            TweenMax.to('.kv-clock-big .clock-block', 5.0, { css: { width: 65, fontSize: 65, ease: 'Quad.easeOut' } }),
            TweenMax.to('.kv-clock-big .clock-block.word', 5.0, { css: { width: 5, marginLeft: 0, ease: 'Quad.easeOut' } }),
            TweenMax.to('.kv-clock-big .clock-block.kv-day', 5.0, { css: { top: -36, ease: 'Quad.easeOut' } }),
            TweenMax.to('.kv-clock-big .clock-block #kv-day-b', 5.0, { css: { fontSize: 12, marginLeft: -63, top: -30, ease: 'Quad.easeOut' } }),

            TweenMax.fromTo('.kv-clock-small', 5.0,
                { css: { width: 17 + '%', height: 150, top: 14 + '%', ease: 'Quad.easeOut' } },
                { css: { width: 42, height: 15, top: 60, ease: 'Quad.easeOut' } }
            ),
            TweenMax.to('.kv-clock-small .kv-clock-block', 5.0, { css: { fontSize: 10, left: 0, marginLeft: 0, ease: 'Quad.easeOut' } }),
            TweenMax.to('.kv-clock-small .kv-clock-block.word', 5.0, { css: { left: 15, marginLeft: 0, ease: 'Quad.easeOut' } }),
            TweenMax.to('.kv-clock-small  #kv-min-s', 5.0, { css: { fontSize: 10, left: 0, marginLeft: 20, ease: 'Quad.easeOut' } }),

            TweenMax.to('.kv-weather', 5.0, { css: { left: -22, top: 360, width: 214.8, height: 124.2, ease: 'Quad.easeOut' } }),
            TweenMax.to('.kv-weather #kv-weather-icon', 5.0, { css: { width: 34, height: 34, marginLeft: -5, marginTop: -17, ease: 'Quad.easeOut' } }),
            TweenMax.to('.kv-weather .kv-location', 5.0, { css: { left: 18, ease: 'Quad.easeOut' } }),
            TweenMax.to('.kv-weather .kv-location h2', 5.0, { css: { fontSize: 12, ease: 'Quad.easeOut' } }),
            TweenMax.to('.kv-weather #kv-temp', 5.0, { css: { fontSize: 20, top: 88, left: 140, ease: 'Quad.easeOut' } }),
            TweenMax.to('.kv-weather span', 5.0, { css: { fontSize: 20, marginLeft: -12, ease: 'Quad.easeOut' } })
        ])
        .append(
            TweenMax.to('#kv-animate', 2.0, { css: { top: 65 + '%' } })
        )
        .append([
            TweenMax.to('#kv-animate', 2.0, { css: { top: 75 + '%' } }),
            TweenMax.fromTo('#kv-animate2', 2.0, { css: { top: 100 + '%' } }, { css: { top: 100 + '%', marginTop: -1536 } })
        ])
        .append([
            TweenMax.to('#kv-animate', 0.5, { css: { opacity: 0 } }),
            TweenMax.to('#kv-animate2 #kv-pad-screen', 0.5, { css: { opacity: 0, ease: 'Quad.easeIn' } })
        ])
        .append(
            TweenMax.to('#kv-animate img', 1.0, { css: { opacity: 0, ease: 'Quad.easeOut' } })
        )
        .append(
            TweenMax.to('#kv-animate2 #kv-pad-photo', 1.0, { css: { top: 485, ease: 'Quad.easeOut' } })
        )
        .append(
            TweenMax.from('#kv-animate2 .inner-content', 1.0, { css: { opacity: 0, top: 50, ease: 'Quad.easeOut' } })
        )
        .append([
            TweenMax.to('#kv-animate3', 0.01, { css: { left: -200 + '%', ease: 'Quad.easeOut' } }),
            TweenMax.to('#follow-wrap', 0.01, { css: { marginTop: -1536, ease: 'Quad.easeOut' } })
        ])
        }

        else {
            kvTimeline.append([
            TweenMax.to('#kv-begin', 2.0, { css: { top: 100 + '%', ease: 'Quad.easeIn' } })
            ])
        .append([
            TweenMax.to('#kv-begin', 0.5, { css: { opacity: 0, left: -200 + '%', ease: 'Quad.easeOut' } }),
            TweenMax.to('#kv-begin .inner ul', 0.5, { css: { marginLeft:-5000, ease: 'Quad.easeOut' } }),
            TweenMax.to('#kv-content', 0.5, { css: { opacity: 1, ease: 'Quad.easeIn' } })
        ])
        .append([
            TweenMax.fromTo('#kv-animate', 5.0,
                { css: { width: 150 + '%', height: init_kv_height, top: 0, marginTop: -950, left: -25 + '%', ease: 'Quad.easeOut' } },
                { css: { width: 260, height: 511, top: 50 + '%', marginTop: -255, left: 50 + '%', marginLeft: -130, ease: 'Quad.easeOut' } }
            ),
            TweenMax.to('#kv-phone', 5.0, { css: { width: 260, ease: 'Quad.easeOut' } }),
            TweenMax.to('#kv-content', 5.0, { css: { marginLeft: -83, marginTop: -340, ease: 'Quad.easeOut' } }),
            TweenMax.to('.kv-clock-big', 5.0, { css: { top: 380, left: -5, ease: 'Quad.easeOut' } }),
            TweenMax.to('.kv-clock-big .clock-block', 5.0, { css: { width: 65, fontSize: 65, ease: 'Quad.easeOut' } }),
            TweenMax.to('.kv-clock-big .clock-block.word', 5.0, { css: { width: 5, marginLeft: 0, ease: 'Quad.easeOut' } }),
            TweenMax.to('.kv-clock-big .clock-block.kv-day', 5.0, { css: { top: -36, ease: 'Quad.easeOut' } }),
            TweenMax.to('.kv-clock-big .clock-block #kv-day-b', 5.0, { css: { fontSize: 12, marginLeft: -63, top: -30, ease: 'Quad.easeOut' } }),

            TweenMax.fromTo('.kv-clock-small', 5.0,
                { css: { width: 17 + '%', height: 150, top: 14 + '%', ease: 'Quad.easeOut' } },
                { css: { width: 42, height:15, top: 60, ease: 'Quad.easeOut' } }
            ),
            TweenMax.to('.kv-clock-small .kv-clock-block', 5.0, { css: { fontSize: 10, left:0, marginLeft:0, ease: 'Quad.easeOut' } }),
            TweenMax.to('.kv-clock-small .kv-clock-block.word', 5.0, { css: { left: 15, marginLeft: 0, ease: 'Quad.easeOut' } }),
            TweenMax.to('.kv-clock-small  #kv-min-s', 5.0, { css: { fontSize: 10, left: 0, marginLeft: 20, ease: 'Quad.easeOut' } }),

            TweenMax.to('.kv-weather', 5.0, { css: { left: -22, top: 360, width: 214.8, height: 124.2, ease: 'Quad.easeOut' } }),
            TweenMax.to('.kv-weather #kv-weather-icon', 5.0, { css: { width: 34, height: 34, marginLeft: -5, marginTop: -17, ease: 'Quad.easeOut' } }),
            TweenMax.to('.kv-weather .kv-location', 5.0, { css: { left: 17, ease: 'Quad.easeOut' } }),
            TweenMax.to('.kv-weather .kv-location h2', 5.0, { css: { fontSize: 12, ease: 'Quad.easeOut' } }),
            TweenMax.to('.kv-weather #kv-temp', 5.0, { css: { fontSize: 20, top: 88, left: 140, ease: 'Quad.easeOut' } }),
            TweenMax.to('.kv-weather span', 5.0, { css: { fontSize: 20, marginLeft: -12, ease: 'Quad.easeOut' } })
        ])
        .append(
            TweenMax.to('#kv-animate', 2.0, { css: { top: 65 + '%' } })
        )
        .append([
            TweenMax.to('#kv-animate', 2.0, { css: { top: 75 + '%' } }),
            TweenMax.fromTo('#kv-animate2', 2.0, { css: { top: 100 + '%' } }, { css: { top: 100 + '%', marginTop: -1536 } })
        ])
        .append([
            TweenMax.to('#kv-animate', 0.5, { css: { opacity: 0 } }),
            TweenMax.to('#kv-animate2 #kv-pad-screen', 0.5, { css: { opacity: 0, ease: 'Quad.easeIn' } })
        ])
        .append(
            TweenMax.to('#kv-animate img', 1.0, { css: { opacity: 0, ease: 'Quad.easeOut' } })
        )
        .append(
            TweenMax.to('#kv-animate2 #kv-pad-photo', 1.0, { css: { top: 485, ease: 'Quad.easeOut' } })
        )
        .append(
            TweenMax.from('#kv-animate2 .inner-content', 1.0, { css: { opacity: 0, top: 50, ease: 'Quad.easeOut' } })
        )
        .append([
            TweenMax.to('#kv-animate3', 0.01, { css: { left: -200 + '%', ease: 'Quad.easeOut' } }),
            TweenMax.to('#follow-wrap', 0.01, { css: { marginTop: -1536, ease: 'Quad.easeOut' } })
        ])
        }
        
        controller.pin($('#kv-wrap'), 6000, {
            anim: kvTimeline,
            onPin: function () {
                $('#kv-wrap').css('height', '100%');
                $('#kv-animate2').css('display', 'block');
                $('#kv-animate3').css('display', 'block');
                $('#kv-animate2').css('opacity', '1');
                $('#kv-animate3').css('opacity', '1');
                isfixed = true;
            },
            onUnpin: function () {
                $('#kv-animate2').css('display', 'none');
                $('#kv-animate2').css('opacity', '0');
                $('#kv-animate3').css('opacity', '0');
                isfixed = false;
            }
        });

    }

    //kv_ie8 Animation
    function kvTimeline_Animation_ie8() {
        $('#kv-ie8').css('display', 'block');
        $('#kv-ie8').css('height', '768px');
        $('#kv-wrap').css('height', '768px');

        $('#kv-begin').css('height', '0px');
        $('#kv-animate').css('height', '0px');
        $('#kv-animate2').css('height', '0px');
        $('#kv-animate3').css('height', '0px');

        $('#kv-begin').css('display', 'none');
        $('#kv-animate').css('display', 'none');
        $('#kv-animate2').css('display', 'none');
        $('#kv-animate3').css('display', 'none');

    }

    //2-in-1 Sync Animation
    function syncTimeline_Animation() {
        var sync0 = $("section.no-syncing .sync-0");
        var sync1 = $("section.no-syncing .sync-1");
        var sync2 = $("section.no-syncing .sync-2");
        var sync3 = $("section.no-syncing .sync-3");
        var sync4 = $("section.no-syncing .sync-4");
        var syncTimeline = new TimelineMax();
        syncTimeline.append(TweenMax.set(sync0, {opacity: 1 }));
        syncTimeline.insert(TweenMax.set(sync1, { opacity: 0 }));
        syncTimeline.insert(TweenMax.set(sync2, { opacity: 0, top: 85, rotation: -3 }));
        syncTimeline.insert(TweenMax.set(sync3, { opacity: 0, top: 15, rotation: -3 }));
        syncTimeline.insert(TweenMax.set(sync4, { opacity: 0, top:-20, rotation:-3 }));
        syncTimeline.insert(TweenMax.to(sync4, 0.3, { delay: 0.5, opacity: 1, top: 0, rotation: 0, ease: 'Quad.easeOut' }));
        syncTimeline.insert(TweenMax.to(sync4, 0.8, { delay: 0.8, opacity: 0.1, top: 0, rotation: 0, ease: 'Quad.easeOut' }));
        syncTimeline.insert(TweenMax.to(sync3, 0.3, { delay: 0.8, opacity: 1, top: 45, rotation: 0, ease: 'Quad.easeOu5t' }));
        syncTimeline.insert(TweenMax.to(sync3, 0.6, { delay: 1.1, opacity: 0.35, top: 45, rotation: 0, ease: 'Quad.easeOut' }));
        syncTimeline.insert(TweenMax.to(sync2, 0.5, { delay: 1.1, opacity: 0.9, top: 105, rotation: 0, ease: 'Quad.easeOut' }));
        //syncTimeline.insert(TweenMax.to(sync2, 0.5, { delay: 1.3, opacity: 0.8, top: 105, rotation: 0, ease: 'Quad.easeOut' }));
        syncTimeline.insert(TweenMax.to(sync1, 0.25, { delay: 1.3, opacity: 1, ease: 'Expo.easeIn' }));

        $("nav a").click(function () {
            if ($(this).parents(".page").find("ul.content li section").hasClass('no-syncing')) {
                syncTimeline.restart();
            }
        })

    }

    //Performance CPU Animation
    function cpuTimeline_Animation() {
        var cpu_pic = $("section.cpu img");
        var cpu_content = $("section.cpu .inner-content");
        var cpuTimeline = new TimelineMax();
        cpuTimeline.append(TweenMax.set(cpu_pic, { left: 1366, opacity: 0 }));
        cpuTimeline.insert(TweenMax.set(cpu_content, { paddingTop: 335, opacity: 0 }));
        cpuTimeline.insert(TweenMax.to(cpu_pic, 0.8, { delay: 0.3, left: 775, opacity:1, ease: 'Expo.easeInOut' }));
        cpuTimeline.insert(TweenMax.to(cpu_content, 0.8, { delay: 0.7, paddingTop: 305, opacity: 1, ease: 'Expo.easeOut' }));
        $("nav a").click(function () {
            if ($(this).parents(".page").find("ul.content li section").hasClass('cpu')) {
                cpuTimeline.restart();
            }
        })
    }

    //Performance Battery Animation
    function batTimeline_Animation() {
        var bat_pic = $("section.battery .bt");
        var bat_phone = $("section.battery .bt-phone");
        var bat_ctn = $("section.battery .inner-content");
        var batTimeline = new TimelineMax();
        batTimeline.append(TweenMax.set(bat_pic, { opacity: 0 }));
        batTimeline.insert(TweenMax.set(bat_phone, { opacity: 0, left:2000 }));
        batTimeline.insert(TweenMax.set(bat_ctn, { paddingTop: 275, opacity: 0 }));
        batTimeline.insert(TweenMax.to(bat_ctn, 0.5, { delay: 0.8, paddingTop: 305, opacity: 1, ease: 'Power3.easeOut' }));
        batTimeline.insert(TweenMax.to(bat_pic, 0.5, { delay: 0.8, opacity: 1, ease: 'Expo.easeOut' }));
        batTimeline.insert(TweenMax.to(bat_phone, 0.6, { delay: 0.3, opacity: 1, left: 130, ease: 'Expo.easeOut' }));
        $("nav a").click(function () {
            if ($(this).parents(".page").find("ul.content li section").hasClass('battery')) {
                batTimeline.restart();
            }
        })
    }

    //Camera PixelMaster Animation
    function pxTimeline_Animation() {
        var px_animate = $("section.pixelmaster .px-animate");
        var px_bright = $("section.pixelmaster .px-animate .px-bright");
        var pxTimeline = new TimelineMax();
        pxTimeline.append(TweenMax.set(px_animate, { left: 70 }));
        pxTimeline.insert(TweenMax.set(px_bright, { left: 8 }));
        pxTimeline.insert(TweenMax.to(px_animate, 2.0, { delay: 0.8, left: 453, ease: 'Back.easeInOut' }));
        pxTimeline.insert(TweenMax.to(px_bright, 2.0, { delay: 0.8, left: -320, ease: 'Back.easeInOut' }));
        $("nav a").click(function () {
            if ($(this).parents(".page").find("ul.content li section").hasClass('pixelmaster')) {
                pxTimeline.restart();
            }
        })
    }

    //Camera UltraBurst Animation
    function burstTimeline_Animation() {
        var burst1 = $("section.burst .burst1");
        var burst2 = $("section.burst .burst2");
        var burst3 = $("section.burst .burst3");
        var burst4 = $("section.burst .burst4");
        var burst5 = $("section.burst .burst5");
        var burst6 = $("section.burst .burst6");
        var burst7 = $("section.burst .burst7");
        var burst8 = $("section.burst .burst8");
        var burstTimeline = new TimelineMax();
        burstTimeline.append(TweenMax.set(burst1, { opacity: 0, left: -170, top: 580, rotation: -5 }));
        burstTimeline.insert(TweenMax.set(burst2, { opacity: 0, left: -55, top: 510, rotation: -5 }));
        burstTimeline.insert(TweenMax.set(burst3, { opacity: 0, left: 145, top: 460, rotation: -5 }));
        burstTimeline.insert(TweenMax.set(burst4, { opacity: 0, left: 400, top: 405, rotation: 0 }));
        burstTimeline.insert(TweenMax.set(burst5, { opacity: 0, left: 740, top: 440, rotation: -5 }));
        burstTimeline.insert(TweenMax.set(burst6, { opacity: 0, left: 925, top: 485, rotation: -5 }));
        burstTimeline.insert(TweenMax.set(burst7, { opacity: 0, left: 1070, top: 535, rotation: -5 }));
        burstTimeline.insert(TweenMax.set(burst8, { opacity: 0, left: 1205, top: 600, rotation: -5 }));
        burstTimeline.insert(TweenMax.to(burst1, 0.25, { delay: 0.5, opacity: 1, left: -80, top: 550, rotation: 0, ease: 'Quad.easeOut' }));
        burstTimeline.insert(TweenMax.to(burst2, 0.25, { delay: 0.6, opacity: 1, left: 35, top: 480, rotation: 0, ease: 'Quad.easeOut' }));
        burstTimeline.insert(TweenMax.to(burst3, 0.25, { delay: 0.7, opacity: 1, left: 235, top: 430, rotation: 0, ease: 'Quad.easeOut' }));
        burstTimeline.insert(TweenMax.to(burst4, 0.25, { delay: 0.8, opacity: 1, left: 490, top: 375, rotation: 0, ease: 'Quad.easeOut' }));
        burstTimeline.insert(TweenMax.to(burst5, 0.25, { delay: 0.9, opacity: 1, left: 830, top: 410, rotation: 0, ease: 'Quad.easeOut' }));
        burstTimeline.insert(TweenMax.to(burst6, 0.25, { delay: 1.0, opacity: 1, left: 1015, top: 455, rotation: 0, ease: 'Quad.easeOut' }));
        burstTimeline.insert(TweenMax.to(burst7, 0.25, { delay: 1.1, opacity: 1, left: 1160, top: 515, rotation: 0, ease: 'Quad.easeOut' }));
        burstTimeline.insert(TweenMax.to(burst8, 0.25, { delay: 1.2, opacity: 1, left: 1295, top: 580, rotation: 0, ease: 'Quad.easeOut' }));

        $("nav a").click(function () {
            if ($(this).parents(".page").find("ul.content li section").hasClass('burst')) {
                burstTimeline.restart();
            }
        })
    }

    //Camera Smile Animation
    function smileTimeline_Animation() {
        var smile_pic = $("section.smile img.pic");
        var smile_ctn = $("section.smile .inner-content");
        var smileTimeline = new TimelineMax();
        smileTimeline.append(TweenMax.set(smile_pic, { top: 780 }));
        smileTimeline.insert(TweenMax.set(smile_ctn, { opacity:0, paddingTop:145 }));
        smileTimeline.insert(TweenMax.to(smile_pic, 0.7, { delay: 0.4, top: 205, ease: 'Expo.easeOut' }));
        smileTimeline.insert(TweenMax.to(smile_ctn, 0.8, { delay: 0.3, paddingTop: 175, opacity: 1, ease: 'Power5.easeOut' }));
        $("nav a").click(function () {
            if ($(this).parents(".page").find("ul.content li section").hasClass('smile')) {
                smileTimeline.restart();
            }
        })
    }

    //Camera Remove Animation
    function removeTimeline_Animation() {
        var rm_photo = $("section.remove .rm-photo");
        var rm_arrow = $("section.remove .rm-arrow");
        var rm_phone = $("section.remove .rm-phone");
        var rm_ctn = $("section.remove .inner-content");
        var removeTimeline = new TimelineMax();
        removeTimeline.append(TweenMax.set(rm_photo, { opacity: 0 }));
        removeTimeline.insert(TweenMax.set(rm_arrow, { opacity: 0 }));
        removeTimeline.insert(TweenMax.set(rm_phone, { opacity: 0 }));
        removeTimeline.insert(TweenMax.set(rm_ctn, { opacity: 0, paddingTop: 145 }));
        removeTimeline.insert(TweenMax.to(rm_photo, 0.7, { delay: 0.3, opacity: 1, ease: 'Quad.easeOut' }));
        removeTimeline.insert(TweenMax.to(rm_arrow, 0.7, { delay: 0.3, opacity: 1, ease: 'Quad.easeOut' }));
        removeTimeline.insert(TweenMax.to(rm_phone, 0.7, { delay: 0.3, opacity: 1, ease: 'Quad.easeOut' }));
        removeTimeline.insert(TweenMax.to(rm_ctn, 0.5, { delay: 0.3, paddingTop: 175, opacity: 1, ease: 'Quad.easeOut' }));
        $("nav a").click(function () {
            if ($(this).parents(".page").find("ul.content li section").hasClass('remove')) {
                removeTimeline.restart();
            }
        })
    }

    //Camera Colorful Animation
    function colorTimeline_Animation() {
        var white = $("section.colorful .white");
        var black = $("section.colorful .black");
        var pink = $("section.colorful .pink");
        var colorTimeline = new TimelineMax();
        colorTimeline.append(TweenMax.set(white, { top: 780 }));
        colorTimeline.insert(TweenMax.set(black, { top: 780 }));
        colorTimeline.insert(TweenMax.set(pink, { top: 780 }));
        colorTimeline.insert(TweenMax.to(white, 0.6, { delay: 0.5, top: 390, ease: 'Expo.easeOut' }));
        colorTimeline.insert(TweenMax.to(black, 0.6, { delay: 0.7, top: 290, ease: 'Expo.easeOut' }));
        colorTimeline.insert(TweenMax.to(pink, 0.6, { delay: 0.9, top: 40, ease: 'Expo.easeOut' }));

        $("nav a").click(function () {
            if ($(this).parents(".page").find("ul.content li section").hasClass('colorful')) {
                colorTimeline.restart();
            }
        })
    }

    //Camera Compact Animation
    function compactTimeline_Animation() {
        var compact_phone = $("section.compact .compact-phone");
        var compact_data = $("section.compact .compact-data");
        var compactTimeline = new TimelineMax();
        compactTimeline.append(TweenMax.set(compact_phone, { left: 2000, opacity:0 }));
        compactTimeline.insert(TweenMax.set(compact_data, { left: 550, opacity:0 }));
        compactTimeline.insert(TweenMax.to(compact_phone, 1.1, { delay: 0.2, left: 245, opacity:1, ease: 'Power4.easeOut' }));
        compactTimeline.insert(TweenMax.to(compact_data, 1.3, { delay: 1.2, left: 590, opacity:1, ease: 'Power4.easeOut' }));
        $("nav a").click(function () {
            if ($(this).parents(".page").find("ul.content li section").hasClass('compact')) {
                compactTimeline.restart();
            }
        })
    }

    //Bg Parallax Effect
    //$('section#performance ul.bg li.kv').parallax("50%", 0.4);
    //$('section#design ul.bg li.kv').parallax("70%", 0.09);
    //$('section#app ul.bg li.kv').parallax("50%", 0.1);

    if ($("html").hasClass('ie8')) {
        kvTimeline_Animation_ie8();
    }
    else {
        //resize kvResize
        $(window).resize(kvResize).trigger('resize');

        //Animation
        kvTimeline_Animation();
        syncTimeline_Animation();
        cpuTimeline_Animation();
        batTimeline_Animation();
        pxTimeline_Animation();
        burstTimeline_Animation();
        smileTimeline_Animation();
        removeTimeline_Animation();
        colorTimeline_Animation();
        compactTimeline_Animation();
    }

    //lazyload
    $("#custom-wrap img.lazy").lazyload({
        effect: "fadeIn",
        event: "click"
    });

    $(function () {
        $("#reel-wrap").hide();

        $("#reel-wrap .close").click(function () {
            $("#reel-wrap").hide();
        });
        $("#reel-wrap .bg").click(function () {
            $("#reel-wrap").hide();
        });
        $(".videos .reel-thumb").click(function () {
            $("#reel-wrap").fadeIn();
            $("#special-sectionOverview #custom-wrap #kv-wrap #kv-begin .inner ul li #open-reel").css('display', 'block');
        })
    })


    $('#kv-animate2').css('display', 'none');

    $(window).on("scroll", function () {

        var win_height = $(window).height();
        var kv_height = $("#kv-animate").height();
        var kv_scrollTop = $(window).scrollTop();
        var kv_scrollPercent = (kv_scrollTop) * 100 / (kv_height - win_height);
        var kv_scrollPercentRounded = Math.round(kv_scrollPercent);

        $('#scroll-position').html(kv_scrollTop);
        $('#scroll-percent').html(kv_scrollPercentRounded);
        $('#scroll-position2').html(kv_scrollTop);
        $('#scroll-percent2').html(kv_scrollPercentRounded);

    })

    //if (!ltIE9) {
    //    $("#custom-wrap img.lazy").lazyload({
    //         effect: "fadeIn",
    //         event:"click"
    //    });
    //}
    //else{
    //    $("#custom-wrap img.lazy").lazyload({
    //         event:"click"
    //    });
    //}


    //colorbox
    //if ($(window).width() > 1920 * 0.8) {
    //    $(".videos .kv-movie").colorbox({ iframe: true, innerWidth: 1920 * 0.8, innerHeight: 1080 * 0.8 });
    //}
    //else {
    //    $(".videos .kv-movie").colorbox({ iframe: true, innerWidth: $(window).width() * 0.8, innerHeight: $(window).height() * 0.8 });
    //}
    //$(".videos .kv-movie").each(function () {
    //    $(this).attr('href', $(this).attr('data-href'));
    //})

    //resize window.width
    $(window).resize(function () {
        $("#custom-wrap").width($(window).width());
        $("#special-sectionOverview nav.arrow").width($(window).width());
        //
        if($(window).width()>960)
        {
            $("#custom-wrap nav.pager").css('left', ($(window).width() - 960) / 2 + 126);
            $("#custom-wrap .inner").css('left',0);
            $("#custom-wrap nav.arrow a.prev").css('left', ($(window).width() - 960) * 0.5 * 0.5 - 19);
            $("#custom-wrap nav.arrow a.next").css('left', ($(window).width() - 960) * 0.75 + 960 - 19);
            $("#custom-wrap nav.shortcut").show();
        }
        else
        {
            $("#custom-wrap .inner").css('left',-126/2);
            $("#custom-wrap nav.pager").css('left',126/2);
            $("#custom-wrap nav.arrow a.prev").css('left',10);
            $("#custom-wrap nav.arrow a.next").css('left',$(window).width()-40);
            $("#custom-wrap nav.shortcut").hide();
        }
        
        $("#custom-wrap nav.arrow").show();
        $("#custom-wrap").css('left',-$("#special-sectionOverview").offset().left);
    });

    $(window).trigger('resize');

});
