//Inspired by amazing tutorial on "sitepoint.com"



if(window.addEventListener && window.requestAnimationFrame && document.getElementsByClassName){

var timer, pItem;

var inView = function(){
	pItem = pItem || document.getElementsByClassName('progressive replace');
	var wT = window.pageYOffset - 100,
		wB = wT + window.innerHeight + 200,
		cRect, pT, pB, p = 0;

		while(p < pItem.length){
			cRect = pItem[p].querySelector('img.preview').getBoundingClientRect();
			pT = wT +  cRect.top;
			pB = pT + cRect.height;

			if(wT < pB && wB > pT){
				loadFullImage(pItem[p]);
				pItem[p].classList.remove('replace');
			}
			else{
				p ++;
			}
		}
}

var loadFullImage = function(item){
	if(!item || !item.hasAttribute("href")) return;

	var addImg = function(){
		//disable click
		item.addEventListener('click', function(e){e.preventDefault();}, false);

		var pImg = item.querySelector && item.querySelector('img.preview');
		if(pImg){
			img.alt = pImg.alt || '';
		}
		item.removeChild[0]; //remove loading animation
		item.replaceChild(img, item.children[0]); //replace small image by new one
		img.addEventListener('animationend', function(e){
			//remove preview image
			e.target.classList.remove('reveal');
		})
	}

	var img = new Image();
	img.classList.add('reveal');
	img.display = "none";
	if(item.getAttribute("srcset") || item.getAttribute("sizes")){
		//Todo load several sources!
		img.srcset = item.getAttribute("srcset") || '';
		img.sizes = item.getAttribute("sizes") || '';
	}
	img.onload = addImg;
	img.src = item.getAttribute("href");
}

var scroller = function(e){
	timer = timer || setTimeout(function(argument) {
		timer = null;
		requestAnimationFrame(inView);
	}, 300);
}

	window.addEventListener('scroll', scroller, false);
	window.addEventListener('resize', scroller, false);
}