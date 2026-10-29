function hasClass(element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}

/*====== Header Mobile Menu functionality Start ======*/

function toggle_menu() {
    var navBar = document.getElementsByClassName('header-menu')[0];
    var menuIcon = document.querySelector('.mobile-menu');
    var mobileMenuBtn = document.querySelector('.mobile-menu-block .mobile-menu');
    var mobileNavLogo = document.querySelector('.navbar-nav .nav-list-logo a')
    var mobileLogo = document.querySelector('.mobile-menu-block button');
    var macDropdownOpen = document.querySelector('.nav-list-items.active button');
    if (navBar && !hasClass(navBar, 'show') && window.innerWidth <= 1024) {
        menuIcon.firstElementChild.classList.add('icon-cancel');
        navBar.classList.add("show");
        document.body.style.overflow = 'hidden';
        // macDropdownOpen.setAttribute('tabindex','1');
        mobileMenuBtn.setAttribute('aria-expanded','true');
        navBar.focus();
        mobileNavLogo.focus();
        macDropdownOpen && macDropdownOpen.setAttribute("aria-expanded", "true");
    } else {
        menuIcon.firstElementChild.classList.remove('icon-cancel');
        navBar.classList.remove("show");
        document.body.style.overflow = 'scroll';
        document.querySelector('.mobile-menu').focus();
        mobileMenuBtn.setAttribute('aria-expanded','false');
        mobileLogo && mobileLogo.focus();
        macDropdownOpen && macDropdownOpen.setAttribute("aria-expanded", "false");
    }

}

// persona header for desktop 
function secondDropDown(event) {
    // debugger;
    var getArrowIcon = document.querySelector('.nav-list-items .icon');
    var areaOfExpert = document.querySelectorAll('.area-experts');
    var subItemsMenu = document.querySelectorAll('.sub-items');
    var areaOfExperts;
    if (event && event.type == "blur") {
        areaOfExperts = document.querySelector('.persona-navbar .nav-list-items.active button');
    } else {
        areaOfExperts = event.currentTarget;
    }
    if (!areaOfExperts) {}
    var listItem = areaOfExperts.parentElement;
    var subItems = listItem && listItem.getElementsByClassName('sub-items')[0];
    // var subItemsParent = subItems.parentElement;

    if (areaOfExpert.length >= 0) {
        for (var i = 0; i < areaOfExpert.length; i++) {
            var element = areaOfExpert[i];
            var buttonDatPhValue = element.getAttribute('data-ph-id');
            var buttonAreaDataPhValue = areaOfExperts.getAttribute('data-ph-id');
            if (buttonAreaDataPhValue != buttonDatPhValue) {
                element.setAttribute('aria-expanded', 'false');
            }
        }

    }
    if (subItemsMenu.length >= 0) {

        for (var i = 0; i < subItemsMenu.length; i++) {
            var element = subItemsMenu[i];
            var subMenuDataPhValue = element.getAttribute('data-ph-id');
            var subMenuItemsDataValue = subItems.getAttribute('data-ph-id')
            if (subMenuDataPhValue != subMenuItemsDataValue) {
                element.classList.remove("show");
                element.setAttribute('aria-hidden', 'true');
                element.parentElement.classList.remove('active');
                var dropDownListParent = document.getElementsByClassName('nav-list-items')[0]
                dropDownListParent.children[0].getElementsByTagName('i')[0].classList.add('icon-down-arrow'); 
                dropDownListParent.children[0].getElementsByTagName('i')[0].classList.remove('icon-up-arrow');
            }
        }
    }

    if (subItems.classList.contains('show')) {
        subItems.classList.remove("show");
        listItem.classList.remove('active');
        subItems.setAttribute('aria-hidden', 'true');
        areaOfExperts.setAttribute('aria-expanded', 'false');
        getArrowIcon.classList.remove('icon-up-arrow');
        getArrowIcon.classList.add('icon-down-arrow');
    } else {
        subItems.classList.add("show");
        listItem.classList.add('active');
        subItems.setAttribute('aria-hidden', 'false');
        areaOfExperts.setAttribute('aria-expanded', 'true');
        getArrowIcon.classList.remove('icon-down-arrow');
        getArrowIcon.classList.add('icon-up-arrow');
    }



}
window.onload = initPage();
function initPage() {
    handleListForCards ();
    handleRoleForHeadings();
    navigationActive();
    animationActive().init();
}

function navigationActive(){
    var getUrlLocation = window.location.href;
    var getCurrentPage = getUrlLocation.split(phApp.baseUrl)[1];
    var getHeader = document.querySelector('.ph-header');
    var getPageAnchor = getHeader.querySelector('[data-ph-href="'+getCurrentPage+'"]');
    // sticky header styles
    
    if(!getPageAnchor){
        getPageAnchor = getHeader.querySelector('[ph-href="'+getCurrentPage+'"]');
    }
    
    if(getPageAnchor){
        getPageAnchor.parentElement.classList.add('active');
        var getBtnMenu=getPageAnchor.parentElement.parentElement.previousElementSibling;
        if(getBtnMenu){
            if(getBtnMenu.nodeName == "BUTTON"){
                getBtnMenu.classList.add('active');
            }            
        }
    }
    document.addEventListener( "click", function(e){
        var getHeader = document.querySelector('.ph-header');
        var getSubNavDropDown = getHeader.querySelector('.workingatphenom');
        var getArrowIcon = document.querySelector('.nav-list-items .icon');
        // var personaNavBar = document.querySelector('.ph-navigation .persona-navbar') ;
        var getSubmenu = getHeader.querySelector('.nav-list-items .sub-navigation');
        var currentTartget = e.target;
        var getAttribute = currentTartget.getAttribute("data-ph-id");
        var isButtonEle = getSubNavDropDown.querySelector('[data-ph-id="'+getAttribute+'"]') || (getSubNavDropDown.getAttribute("data-ph-id") ==  getAttribute) || getSubmenu.querySelector('[data-ph-id="'+getAttribute+'"]');
        
       if(!isButtonEle){
            if(getSubmenu.classList.contains('show')){
                getSubmenu.classList.remove('show');
                getSubmenu.parentElement.classList.remove('active');
                getArrowIcon.classList.remove('icon-up-arrow');
                getArrowIcon.classList.add('icon-down-arrow');
                // getSubmenu.classList.add('hide');
            }
            else{
                // getSubmenu.classList.remove('hide');
            }
        }
        return true;
    })
}

function animationActive() {
        var elems;
        var windowHeight;
        var pagesObj;
        var clickEventAppended = false;
        
        function init() {
            elems = document.querySelectorAll('.ph-widget');
            pageName = document.getElementsByTagName('body')[0].className;
            pagesObj = {
                'events-page': {
                    itemClass: 'events-list-item',
                    classNameToAdd: 'event-item',
                },
                'blog-page': {
                    itemClass: 'blog-list-item',
                    classNameToAdd: 'blog-item',
                },
                'article-description-page': {
                    itemClass: 'blog-list-item',
                    classNameToAdd: 'blog-item',
                }
            }
            windowHeight = window.innerHeight;

            // hero text animation on load//

            var hero;
            var heroText;
            var textArr;

            // hero = document.querySelector("section[class*='ph-hero-']") ? document.querySelector("section[class*='ph-hero-']") : document.querySelector("section[original-view*='ph-hero-']");
            // heroText = hero.querySelector('.heading-one') ? hero.querySelector('.heading-one').querySelector('ppc-content') : hero.querySelector('.header').querySelector('ppc-content');
            // textArr = heroText.innerText.split(' ');
            // textArr = heroText.innerText;
            // if (!heroText.querySelector('span')) {
            //     heroText.innerText = "";
            //     for (var y = 0; y < textArr.length; y++) {
            //         if (textArr[y] !== ' ' && textArr[y] !== ''){
            //             textArr[y].replace(/ /g, '');
            //             var cleanTextArr = textArr[y].split(/[\r\n]+/gm);
            //             if (cleanTextArr.length > 1) {
            //             }
            //         //     while (textArr[y].includes("&nbsp;")){
            //         //         textArr[y].replace("&nbsp;", "");
            //         //     }
            //             var span = document.createElement('span');
            //             span.appendChild(document.createTextNode(textArr[y]));
            //             heroText.appendChild(span);
            //         }
            //     }
            // }
            var checkForPhb = setInterval(function(){
                if (phApp.phb) { 

                    if (!window.frameElement || window.frameElement.id !== "_cms_page_frame"){ 
                        // the page is not CMS - add all animations
                        if (pagesObj[pageName]) {
                            checkIfList();
                            if (pageName == 'events-page') {
                                addOverflowControl();
                            }
                        }
                        addEventHandlers();
                        checkPosition();
                        getGlobalSearch(false);
                    }
                    else {
                        setTimeout(function(){
                            // the page is  CMS - insure the cards opacity is 1
                            let iframeDocument = window.frameElement.contentDocument
                            let cards = iframeDocument.getElementsByClassName('ph-card');
                            let blogListItems = iframeDocument.getElementsByClassName('blog-list-item');
                            let eventListItems = iframeDocument.getElementsByClassName('events-list-item');

                            for (var i = 0; i < cards.length; i++) {
                                var singleCard = cards[i];
                                singleCard.className += ' card-no-animation';
                            }
                            for (var i = 0; i < blogListItems.length; i++) {
                                var singleBlog = blogListItems[i];
                                singleBlog.className += ' card-no-animation';
                            }
                            for (var i = 0; i < eventListItems.length; i++) {
                                var singleEvent = eventListItems[i];
                                singleEvent.className += ' card-no-animation';
                            }
                            getGlobalSearch(true);
                        }, 5000);
                    }
                    
                    clearInterval(checkForPhb);
                }
            }, 100)
        }
            // if (pageName == 'events-page' || pageName == 'blog-page') {
            //     checkIfList();
            // }

            // getGlobalSearch();
            // addEventHandlers();
            // checkPosition();
            // }

        function addOverflowControl() {
            var getInputs = setInterval(function(){
                var locationInput = document.querySelector('input[name="location"]');
                var categoryInput = document.querySelector('input[name="category"]');
                var dateInput = document.querySelector('input[name="date"]');
                var arr = [locationInput, categoryInput, dateInput];
                if(dateInput && categoryInput && locationInput){
                    for (var i = 0; i < arr.length; i++){
                        var element = arr[i];
                        var animatedElement = element.parentElement.parentElement.getElementsByTagName('ul')[0];
                        var clickableElement;
                        if (element == dateInput) {
                            clickableElement = element.nextElementSibling;
                        } else {
                            clickableElement = element.parentElement;
                        }
                        
                        animatedElement.style.overflowY = 'hidden'
                        clickableElement.addEventListener('click', function(){
                            if (animatedElement.className.split(' ').indexOf('aurelia-hide') == -1) {
                                setTimeout(function() {
                                    animatedElement.style.overflowY = 'auto'
                                }, 500)
                            }
                        })
                        animatedElement.addEventListener('animationstart', function(){
                            // if (animatedElement.className.split(' ').indexOf('aurelia-hide') != -1 ) {
                                animatedElement.style.overflowY = 'hidden'
                            // }
                        })

                    }
                    clearInterval(getInputs);
                }
            },200)
            
        }

        function checkIfList() {
            var checkIfListInterval = setInterval(function() {
                var itemList = document.getElementsByClassName(pagesObj[pageName].itemClass);
                if (itemList.length > 0) {
                    if (!clickEventAppended) {
                        var sortByOptions = document.querySelectorAll('[data-ph-at-id="sort-options-list-item"]');
                        for (var i = 0; i < sortByOptions.length; i++) {
                            var option = sortByOptions[i];
                            option.addEventListener('click', function(){
                                    var checkReset = setInterval(function() {
                                        var newItemList = document.getElementsByClassName(pagesObj[pageName].itemClass);
                                        var hideClassName = pagesObj[pageName].classNameToAdd + '-hide';
                                        var animateClassName = pagesObj[pageName].classNameToAdd + '-animate';
                                        if (newItemList.length > 0 && newItemList[0].className.split(' ').indexOf(hideClassName) == -1 && newItemList[0].className.split(' ').indexOf(animateClassName) == -1) {
                                            cardsAnimations(pagesObj[pageName].itemClass, pagesObj[pageName].classNameToAdd);
                                            clearInterval(checkReset);
                                        }
                                    }, 200);
                            });
                        }
                        clickEventAppended = true;
                    }
                    cardsAnimations(pagesObj[pageName].itemClass, pagesObj[pageName].classNameToAdd);
                    clearInterval(checkIfListInterval);
                }
            }, 100); // check every 100ms
        }    
        
        function addEventHandlers() {
            window.addEventListener('scroll', checkPosition);
            window.addEventListener('resize', init);
        }

        function getGlobalSearch(isCMS) {
            var checkExist = setInterval(function() {
                    hero = document.querySelector("section[class*='ph-hero-']") || document.querySelector("section[original-view*='ph-hero-']") || document.querySelector("section[class*='banner-block']") || document.querySelector("section[original-view*='event-banner-']") || document.querySelector("section[original-view*='blogs']") || document.querySelector('.ph-blog-banner-area') || null;
                    if (pageName.indexOf('home-page') > -1 || pageName.indexOf('locations-page') > -1 || pageName.indexOf('search-results-page') > -1 ) {
                        var globalSearch = hero && hero.querySelector("div[as-element*='global-search']") ? hero.querySelector("div[as-element*='global-search']") : null;
                        if (globalSearch && globalSearch.getElementsByTagName('input').length > 0) {
                            if (isCMS) {
                                hero.className += ' headline-no-animation';
                            }
                            else {
                                hero.className += ' global-search-headline-animation';
                            }
                            clearInterval(checkExist);
                        }
                    }
                    else {
                        if (hero) {
                            if (isCMS) {
                                hero.className += ' headline-no-animation';
                            }
                            else {
                                hero.className += ' simple-headline-animation';
                            }
                            clearInterval(checkExist);
                        }
                    }
             }, 100); // check every 100ms
        }

        function checkPosition() {
            for (var i = 0; i < elems.length; i++) {
                var element = elems[i];
                if (element.querySelector("[as-element*='ph-glassdoor']") !== -1) {
                    cardsAnimations('phs-employer-content', 'overall-stars');
                    cardsAnimations('rating-container', 'rating-container');
                    cardsAnimations('reviews-list-item', 'reviews-list-item');
                }
                if(element.className){
                    if (element.className.split(' ').indexOf('element-hide') == -1 && element.className.split(' ').indexOf('element-animate') == -1){
                        element.className += ' element-hide';
                    }
                    var positionFromTop = element.getBoundingClientRect().top;
                    var positionFromBottom = element.getBoundingClientRect().bottom;
                    var elementHeight = element.offsetHeight;
                        if (((positionFromTop > 0 && positionFromBottom > 0 && positionFromBottom - elementHeight < windowHeight) || (positionFromTop < 0 && positionFromBottom > 0 )) && element.className.split(' ').indexOf('element-animate') == -1) {
                            element.className = element.className.replace('element-hide','element-animate');
                        }
                        // if ((positionFromBottom < 0 && positionFromTop < -(elementHeight)) || (positionFromTop > windowHeight && positionFromBottom > windowHeight)) {
                        //         element.classList.replace('element-animate','element-hide');
                        // }
                    cardsAnimations('ph-card', 'card');
                }               
            }
            if (pagesObj[pageName]) {
                cardsAnimations(pagesObj[pageName].itemClass, pagesObj[pageName].classNameToAdd);
            }
        }

        function cardsAnimations(itemToFind, classNameToAdd) {
            var items = document.getElementsByClassName(itemToFind);
            var hideClassName = classNameToAdd + '-hide';
            var animateClassName = classNameToAdd + '-animate';
            for (var j = 0; j < items.length; j++) {
                var item = items[j];
                if (item.className.split(' ').indexOf(hideClassName) == -1 && item.className.split(' ').indexOf(animateClassName) == -1){
                    item.className += ' ';
                    item.className += hideClassName;
                }
                var itemPositionFromTop = item.getBoundingClientRect().top;
                var itemPositionFromBottom = item.getBoundingClientRect().bottom;
                var itemHeight = item.offsetHeight;
                    if (
                            ((itemPositionFromTop > 0 && itemPositionFromBottom > 0 && itemPositionFromBottom - itemHeight < windowHeight) || (itemPositionFromTop < 0 && itemPositionFromBottom > 0)) && item.className.split(' ').indexOf(animateClassName) == -1
                        ) {
                        item.className = item.className.replace(hideClassName,animateClassName);
                    }
            }
        }

        return {
        init: init
        };
}

// areaOfExperts on blur close
function persona_focuse_close_menu(event) {
    // setTimeout(function(){
    //     var activeEle = document.activeElement;
    //     var areaOfExperts = document.querySelector('.persona-navbar .nav-list-items.active button');
    //     var listItem = areaOfExperts.parentElement;
    //     var subItems = listItem && listItem.getElementsByClassName('sub-items')[0];
    //     if(!subItems.contains(activeEle)){
    //         secondDropDown(event);
    //     }
    // }, 400)
}

/*====== Header Mobile Menu functionality End ======*/


document.addEventListener('DOMContentLoaded', setFocus(500));
function setFocus(setTime) {
    setTimeout(function() {
        var getHeaderLogo = document.querySelector('.nav-main-bar .mobile-header-logo a');
        if (getHeaderLogo) {
            getHeaderLogo.addEventListener('focus', function() {
                if (window.innerWidth <= 1024) {
                    if (document.querySelector('.nav-main-bar .nav').classList.contains('show') == true) {
                        toggle_menu();
                    }
                }
            })
        }else{
            setFocus(500)
        }

    }, setTime);
}

document.addEventListener('DOMContentLoaded', function() {
    var getSkiptContent=document.getElementById('skip-content');
    var getPhpageEle=document.querySelector('.ph-page');

    setTimeout(function() {
        var jobCartEle = document.querySelector('.phs-job-cart-area a');
        if (jobCartEle) {
            jobCartEle.addEventListener('focus', function() {
                if (window.innerWidth <= 767) {
                    if (document.querySelector('.nav').classList.contains('show') == true) {
                        toggle_menu();
                    }
                }
            })
        }

    }, 1000);

    // skip to main
    if(getSkiptContent){
        document.getElementById('skip-content').addEventListener('focus',function(){
            document.querySelector('.skip-main').style.height="40px";
            });
        document.getElementById("skip-content").addEventListener("focusout", function(){
            document.querySelector('.skip-main').style.height="auto";
        });
    }
    setTimeout(function(){
        var createNewEle=document.createElement("DIV");
        var removeRole = document.querySelector('.ph-component-cntr.ph-widget-box');
        var removeRoleInJd = document.querySelector('.banner-block');
        var removeRoleInTestimonialSlider = document.querySelector('.ph-container-content-block.ph-static-slider');
        var removeHeadingRoleInTestimonialSlider = document.querySelector('.ph-component-cntr.ph-widget-box');
        if(getPhpageEle){
            getPhpageEle.setAttribute('id','acc-skip-content');
		}
        if(removeRole){
            // removeRole.removeAttribute('role');
        }
        if(removeRoleInJd){
            removeRoleInJd.removeAttribute('role');
        }
        if(removeRoleInTestimonialSlider){
            removeRoleInTestimonialSlider.firstElementChild.removeAttribute('role');
        }
        if(removeHeadingRoleInTestimonialSlider){
            // removeHeadingRoleInTestimonialSlider.removeAttribute('role');
        }
    },500);
    // skip to main end
    
})


function handleRoleForHeadings() {
    var widgets = document.querySelectorAll('.ph-widget');
    for (var i = 0; i < widgets.length; i++) {
        var headingBlock = widgets[i].querySelector('.ph-widget-box');
        if (headingBlock) {
            var widgetHeadingLevel = headingBlock.querySelector('[ctr-content-key="title"], [component-content-key="h2-heading"]');
            var headingHeroWidget = headingBlock.querySelector('[card-name^="ph-hero"]');
            var headingList = headingBlock.querySelectorAll('[component-content-key="heading"], [card-content-key="heading"]');
            for (var j = 0; j < headingList.length; j++) {
                headingList[j].removeAttribute('role');
                headingList[j].removeAttribute('aria-level');
                var headingRole = headingList[j].querySelector('[key-role], [card-content-key="heading"] > *:first-child, [component-content-key="heading"] > *:first-child');
                var headerExistList = headingList[j].querySelectorAll('h1,h2,h3,h4,h5,h6');
                if (headingRole && headingList[j] && !headingList[j].classList.contains('hide') && !headerExistList.length) {
                    headingRole.setAttribute('role', 'heading');
                    if (widgetHeadingLevel && !widgetHeadingLevel.classList.contains('hide') && !headingBlock.classList.contains('heading-block-hide')) {
                        headingRole.setAttribute('aria-level', '3');
                    }
                    else if(headingHeroWidget) {
                        headingRole.setAttribute('aria-level', '1');
                    }
                    else{
                        headingRole.setAttribute('aria-level', '2');
                    }
                }
            }
        }
    }
}


// Checking and list marking for cards
function handleListForCards () {
    var widgets = document.querySelectorAll('[as-element="ph-html-v1"]');
    for (let i = 0; i < widgets.length; i++) {
        var cardContainerBlock = widgets[i].querySelector('.ph-card-container');
        if (cardContainerBlock) {
            var cardBlock = cardContainerBlock.querySelectorAll('.ph-card');
            if (cardBlock.length <= 1) {
                cardContainerBlock.removeAttribute('role');
                for (let j = 0; j < cardBlock.length; j++) {
                    cardBlock[j].removeAttribute('role');
                }
            } else {
                cardContainerBlock.setAttribute('role', 'list');
                for (let k = 0; k < cardBlock.length; k++) {
                    cardBlock[k].setAttribute('role', 'listitem');
                }
            }
        }
    }
}


function getReqParam(name) {    
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");    
    var regexS = "[\\?&]" + name + "=([^&#]*)";    
    var regex = new RegExp(regexS);    
    var results = regex.exec(window.location.href);    
    return results == null ? null : results[1];
}
//var url = new URL(window.location.href);    
var attr_name = getReqParam("status");
var candidate_name = getReqParam("candidateName");
var job_title_name = getReqParam("jobTitle");
var job_id = getReqParam("jobId");
var suc = document.getElementById("success");
var alreadyAppy = document.getElementById("alreadyApplied");
//var sucdis = document.getElementById("success-disqualified");


if (attr_name == "alreadyApplied") {
    alreadyAppy.style.display = "block";
    suc.style.display = "none";
    //sucdis.style.display = "none";

    document.getElementById("job-title-applied").innerHTML = decodeURIComponent(job_title_name) + ' (' + job_id + ')';

} else if (attr_name == "success") {
    alreadyAppy.style.display = "none";
    suc.style.display = "block";
    //sucdis.style.display = "none";
    document.getElementById("job-title").innerHTML = decodeURIComponent(job_title_name) + ' (' + job_id + ')' + ' position.';

} else if (attr_name == "success-disqualified") {
    alreadyAppy.style.display = "none";
    suc.style.display = "none";
    //sucdis.style.display = "block";
    document.getElementById("candidate-name").innerHTML = candidate_name;

}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}