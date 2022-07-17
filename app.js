//---------------------------------menu------------------------------------------------//

const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    //toggle Nav
    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');

        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = ''
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.5}s`;
            }


        });
        burger.classList.toggle('toggle');
    });


}
navSlide();
//---------------------------------Cambio de Color Menu--------------------------------------------//

window.addEventListener('scroll', function () {
    let nav = document.querySelector('nav');
    let windowPosition = window.scrollY > 0;

    nav.classList.toggle('scrolling-active', windowPosition);
  })
  //---------------------------------Animacion Divs------------------------------------------------//

  let animado = document.querySelectorAll(".animado");

function mostrarScroll() {
    let scrollTop =
    document.documentElement.scrollTop;
    for (var i=0; i < animado.length; i++ ) {
        let alturaAnimado = animado[i].offsetTop;

        if(alturaAnimado - 300 < scrollTop) {
            animado[i].style.opacity = 1;
            animado[i].classList.add("mostrarArriba");
        }

    }
}
//---------------------------------autocarga---------------------------------------------------------//
window.onload = function(){
    var contenedor = document.getElementById('contenedor_carga');
    
    contenedor.style.visibility = 'hidden';
    contenedor.style.opacity = '0';
}

 //---------------------------------Slider Proyectos------------------------------------------------//
window.addEventListener('scroll', mostrarScroll);
var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
}


var sliderTeam = (function(document, $) {
  
  'use strict';
  
  var $sliderTeams = $('.slider--teams'),
      $list = $('#list'),
      $listItems = $('#list li'),
      $nItems = $listItems.length,
      $nView = 3,
      autoSlider,
      $current = 0,
      $isAuto = true,
      $acAuto = 2500,
      
      _init = function() {
        _initWidth();
        _eventInit();
      },
      
      _initWidth = function() {
        $list.css({
          'margin-left': ~~(100 / $nView) + '%',
          'width': ~~(100 * ($nItems / $nView)) + '%'
        });
        $listItems.css('width', 100 / $nItems + '%');
        $sliderTeams.velocity({ opacity: 1 }, { display: "block" }, { delay:1000 });
      },
      
      _eventInit = function() {
        
        window.requestAnimFrame = (function() {
          return  window.requestAnimationFrame       || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame    || 
              window.oRequestAnimationFrame      || 
              window.msRequestAnimationFrame     || 
              function(callback, element){
                window.setTimeout(callback, 1000 / 60);
              };
        })();

        window.requestInterval = function(fn, delay) {
            if( !window.requestAnimationFrame       && 
                !window.webkitRequestAnimationFrame && 
                !window.mozRequestAnimationFrame    && 
                !window.oRequestAnimationFrame      && 
                !window.msRequestAnimationFrame)
                    return window.setInterval(fn, delay);
            var start = new Date().getTime(),
            handle = new Object();

            function loop() {
                var current = new Date().getTime(),
                delta = current - start;
                if(delta >= delay) {
                    fn.call();
                    start = new Date().getTime();
                }
                handle.value = requestAnimFrame(loop);
            };
            handle.value = requestAnimFrame(loop);
            return handle;
        }

        window.clearRequestInterval = function(handle) {
            window.cancelAnimationFrame ? window.cancelAnimationFrame(handle.value) :
            window.webkitCancelRequestAnimationFrame ? window.webkitCancelRequestAnimationFrame(handle.value)   :
            window.mozCancelRequestAnimationFrame ? window.mozCancelRequestAnimationFrame(handle.value) :
            window.oCancelRequestAnimationFrame ? window.oCancelRequestAnimationFrame(handle.value) :
            window.msCancelRequestAnimationFrame ? msCancelRequestAnimationFrame(handle.value) :
            clearInterval(handle);
        };
        
        $.each($listItems, function(i) {
          var $this = $(this);
          $this.on('touchstart click', function(e) {
            e.preventDefault();
            _stopMove(i);
            _moveIt($this, i);
          });
        });
        
        autoSlider = requestInterval(_autoMove, $acAuto);
      },
      
      _moveIt = function(obj, x) {
        
        var n = x;
        
        obj.find('figure').addClass('active');        
        $listItems.not(obj).find('figure').removeClass('active');
        
        $list.velocity({
          translateX: ~~((-(100 / $nItems)) * n) + '%',
          translateZ: 0
        }, {
          duration: 1000,
          easing: [400, 26],
          queue: false
        });
        
      },
      
      _autoMove = function(currentSlide) {
        if ($isAuto) { 
          $current = ~~(($current + 1) % $nItems);
        } else {
          $current = currentSlide;
        }
        console.log($current);
        _moveIt($listItems.eq($current), $current);
      },
      
      _stopMove = function(x) {
        clearRequestInterval(autoSlider);
        $isAuto = false;
        _autoMove(x);
      };
  
  return {
    init: _init
  };

})(document, jQuery);

$(window).load(function(){
  'use strict';
  sliderTeam.init();
});