document.addEventListener("DOMContentLoaded", function() {
	document.querySelector('#menuLink').addEventListener("click", function(){
		var element = document.querySelector('#all-items');
		element.classList.toggle("show-menu");
	});

	document.querySelector('#cssmenu li.has-sub>a').addEventListener("click", function(){
		this.removeAttribute('href');
		var element = getParentByTag(this, "li");
		if (element.classList.contains('open')) {
			element.classList.remove('open');
			var ulElem = getChildrenByTag(element, 'ul');
			ulElem.style.display = "";
			/*ulElem.animate.animate({
		      height: 0
		    }, {
		      duration: 1000,
		      easing: "ease-in-out",
		      iterations: 1,
		      fill:"forwards"
		    })*/
			//element.find('li').removeClass('open');
			//element.find('ul').slideUp();
		}
		else {
			element.classList.add('open');
			var ulElem = getChildrenByTag(element, 'ul');
			ulElem.style.display = "block";
			/*ulElem.animate.animate({
		      height: element.offsetHeight
		    }, {
		      duration: 1000,
		      easing: "ease-in-out",
		      iterations: 1,
		      fill:"forwards"
		    })*/
			//element.children('ul').slideDown();
			//element.siblings('li').children('ul').slideUp();
			//element.siblings('li').removeClass('open');
			//element.siblings('li').find('li').removeClass('open');
			//element.siblings('li').find('ul').slideUp();
		}
	});
}); 


var getParentByTag = function(element, tag, index){
	if(index >= 5){
		return undefined;
	}
	if(element.parentNode.tagName == tag.toUpperCase()){
		return element.parentNode;
	}
	else{
		if(!index){index = 0}
		return getParentByTag(element.parentNode, tag, index+1)
	}
}

var getChildrenByTag = function(element, tag){
	for (var i = 0; i < element.childNodes.length; i++) {
	    if (element.childNodes[i].tagName == tag.toUpperCase()) {
	      return element.childNodes[i];
	    }        
	}	
}