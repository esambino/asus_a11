var producthash = '9EadKfrQhPM5nsL5';
var ltIE9 = (navigator.userAgent.replace(/^.*MSIE\s+(\d+\.\d+).*$/ig, '$1') * 1) < 9;
//document.write('<link rel="stylesheet" href="/websites/global/products/' + producthash + '/css/main.css">');
//document.write('<link rel="stylesheet"  type="text/css" href="http://fonts.googleapis.com/css?family=Lato|Noto+Sans|Istok+Web&subset=latin,latin-ext">');
//document.write('<link rel="stylesheet"  type="text/css" href="http://fonts.googleapis.com/css?family=Roboto:400,300,500">');

document.write('<script src="/websites/global/products/' + producthash + '/js/vendor/jquery.min.js"></script>');
document.write('<script src="/websites/global/products/' + producthash + '/js/vendor/modernizr.js"></script>');
document.write('<script src="/websites/global/products/' + producthash + '/js/vendor/swfobject.js"></script>');
document.write('<script src="/websites/global/products/' + producthash + '/js/vendor/waypoints.js"></script>');
document.write('<script src="/websites/global/products/' + producthash + '/js/vendor/waypoints.min.js"></script>');
document.write('<script src="/websites/global/products/' + producthash + '/js/vendor/jquery.easing.min.js"></script>');
document.write('<script src="/websites/global/products/' + producthash + '/js/vendor/jquery.lazyload.min.js"></script>');
//document.write('<script src="/websites/global/products/' + producthash + '/js/vendor/jquery.colorbox-min.js""></script>');
document.write('<script src="/websites/global/products/' + producthash + '/js/vendor/jquery.superscrollorama.js"></script>');
document.write('<script src="/websites/global/products/' + producthash + '/js/vendor/gsap/TweenMax.min.js"></script>');
document.write('<script src="/websites/global/products/' + producthash + '/js/vendor/gsap/plugins/ScrollToPlugin.min.js"></script>');
document.write('<script src="/websites/global/products/' + producthash + '/js/main.js" type="text/javascript"></script>');
document.write('<script src="/websites/global/products/' + producthash + '/js/vendor/MyWeather.js"></script>');
document.write('<script src="/websites/global/products/' + producthash + '/js/vendor/jquery.reel.js"></script>');

if (!ltIE9) {
    document.write('<script src="http://code.createjs.com/easeljs-0.6.0.min.js"></script>');
    document.write('<script src="http://code.createjs.com/tweenjs-0.4.0.min.js"></script>');
    document.write('<script src="http://code.createjs.com/movieclip-0.6.0.min.js"></script>');
    document.write('<script src="http://code.createjs.com/preloadjs-0.3.0.min.js"></script>');
}