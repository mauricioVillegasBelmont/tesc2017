var page = document.getElementById('mainWrapper');
var slides = document.getElementsByTagName('section');
var ant  = document.getElementById('ant');
var sig  = document.getElementById('sig');
var slideIndex = 0;
var video = document.getElementById('bogota');

//var scrollButton = document.getElementById('scrollButton');
//var scrollInterval = function(){ 
//    document.body.scrollTop = document.body.scrollHeight;
//};
var stopScroll = function() { clearInterval(scrollInterval); };
var pageTitle=['','title_presentacion.svg','title_objetivoGeneral.svg','title_agenda.svg','title_agenda.svg','title_agenda.svg','title_ponentes.svg'];


function playAnimation(){
    var time = 1200;
    var img = document.getElementsByClassName('bgImages');
    var mainLogo=document.getElementById('mainLogo');
    var clickImg=document.getElementById('clickImg');
    setInterval(function(){
        clickImg.classList.remove('unanimated');
        mainLogo.classList.remove('unanimated');
    },time*img.length-1);
    for(var i = 0;i<=img.length-1;i++){
        (function(i) {
            setInterval(function(){
                img[i].classList.remove('unanimated');
            },time*i);
        })(i);
    }
}
function registro() {
    window.location.href="https://www.eventbrite.es/e/entradas-travesia-educativa-santillana-compartir-37507278279";
}


function pageIndex(){
    var thisPage = document.querySelector("section.current");
    var allPages = document.getElementsByTagName('section');
    var index;
    if(page != null || page != undefined){
        var getChildIndex = function(child){
        var parent = child.parentNode;
        var j = parent.children.length - 1;
            for (; j >= 0; j--){
                if (child == parent.children[j]){
                    break;
                }
            }
            return j;
        };
        index = getChildIndex(thisPage);
        if(index == 2){
            video.play();
        }else{
            video.pause();
        }
        if(index == 3||index == 4){
            setCurrentContent(0);
        }
        if(index == allPages.length-1){
            //setCurrentContent(0);
        }
    }
    return index;
}

function setCurrent(elem,index){
    var menuButton = document.querySelectorAll('#header .menu p');
    for(var i = index-1;i>=0;i--){
        if(elem[i].classList.contains('current')){
            elem[i].classList.remove('current');
        }
        if(elem[i].classList.contains('next')){
            elem[i].classList.remove('next');
        }
        elem[i].classList.add('prev');
        menuButton[i].classList.remove('current');
    }
    elem[index].classList.remove('prev','next');
    elem[index].classList.add('current');
    menuButton[index].classList.add('current')
    for(var i = index+1;i <= elem.length-1;i++){
        if(elem[i].classList.contains('current')){
            elem[i].classList.remove('current');
        }
        if(elem[i].classList.contains('prev')){
            elem[i].classList.remove('prev');
        }
        elem[i].classList.add('next');
        menuButton[i].classList.remove('current');
    }
    pageIndex();
}

function setCurrentContent(index){
    var currentSlide = document.querySelector('section.current');
    var currentElement=currentSlide.querySelectorAll('.elemento');
    var currentList = currentSlide.querySelectorAll('.verticalMenu li');
    for(var i = index-1;i>=0;i--){
        if(currentElement[i].classList.contains('disabled')){
    
        }else{
            currentElement[i].classList.add('disabled');
        }
        currentList[i].classList.remove('current');
    }
    
    currentElement[index].classList.remove('disabled');
    currentList[index].classList.add('current');
    
    for(var i = index+1;i <= currentElement.length-1;i++){
        if(currentElement[i].classList.contains('disabled')){
            
        }else{
            currentElement[i].classList.add('disabled');
        }
        currentList[i].classList.remove('current');
    }
}
function activate(e){
    if(!page.classList.contains('active')){
        page.classList.add('active');
        slideIndex += 1;
        setCurrent(slides,slideIndex);
    }
    var start = document.getElementById('start').style.display='none';
}

function next(trigger,elem,index){
    
}
function prev(trigger,elem,index){
    
}
function goTo(elem,index){
    setCurrent(elem,index);
    
    if(index <= 0){
        ant.classList.add('disabled');
    }else if(ant.classList.contains('disabled')){
        ant.classList.remove('disabled');
    }
    if(index >= slides.length-1){
        sig.classList.add('disabled');
    }else if(sig.classList.contains('disabled')){
        sig.classList.remove('disabled');
    }
    slideIndex = index;
}
function horizontalNav(trigger,inc){
    var navButtons = document.getElementsByClassName('horizontalNav');
    slideIndex += inc;
    setCurrent(slides,slideIndex);
    if(slideIndex + 1 >= slides.length||slideIndex - 1 <= -1){
        trigger.classList.add('disabled');
    }else{
        for(var i = 0;i<=navButtons.length-1;i++){
            if(navButtons[i].classList.contains('disabled')){
                navButtons[i].classList.remove('disabled');
            }
        }
    }
}
function home(){
    page.classList.remove('active');
    slideIndex = 0;
    setCurrent(slides,slideIndex);
    var start = document.getElementById('start').style.display='block';
}
/*------------------------------------------------------------*/
/*-----------------scroll down button-------------------*/
function checkScroll(){
    var thisPage = document.querySelector("section.current");
    if(thisPage.scrollTop == thisPage.scrollHeight){
        scrollButton.classList.add('disabled');
    } else if(scrollButton.classList.contains('disabled')){
        scrollButton.classList.remove('disabled');
    }
}
function scrollBottom(){
    var thisPage = document.querySelector("section.current");
    thisPage.scrollTop = thisPage.scrollHeight;
    /*thisPage.scroll({ 
        top :  'bottom',
        behavior: 'smooth' 
        });*/
}
/*------------------------------------------------------------*/
/*------------------------------------------------------------*/
    
document.addEventListener('DOMContentLoaded', function(){
    setCurrent(slides,slideIndex);
    startClock();
    ant.addEventListener('click',function(){horizontalNav(ant,-1)},false);
    sig.addEventListener('click',function(){horizontalNav(sig,1)} ,false);
    playAnimation();
}, false);