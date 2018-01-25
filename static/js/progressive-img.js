//Inspired by amazing tutorial on "sitepoint.com"

var timer, pItem;



if(window.addEventListener && window.requestAnimationFrame && document.getElementsByClassName){

var inView = function(){
	var wT = window.pageYOffset,
		wB = wT + window.innerHeight,
		cRect, pT, pB, p = 0;

		while(p < pItem.length){
			cRect = pItem[p].getBoundingClientRect();
			pT = wT +  cRect.top;
			pB = pT + cRect.height;

			if(wT - 200 < pB && wB + 200 > pT){
				loadFullImage(pItem[p]);
				pItem[p].classList.remove('replace');
			}
			else{
				p ++;
			}
		}
}

var loadFullImage = function(item){
	if(!item || !item.href) return;

	var addImg = function(){
		//disable click
		item.addEventListener('click', function(e){e.preventDefault();}, false);

		var pImg = item.querySelector && item.querySelector('img.preview');
		if(pImg){
			item.alt = pImg.alt || '';
			item.removeChild(pImg);
		}
		//Add full image
		item.appendChild(img).addEventListener('animationend', function(e){
			//remove preview image
			e.target.classList.remove('reveal');
		})
	}

	var img = new Image();
	if(item.dataset){
		//Todo load several sources!
		img.srcset = item.dataset.srcset || '';
		img.sizes = item.dataset.sizes || '';
	}
	img.src = item.href;
	img.classList.add('reveal');
	img.display = "none";
	if(img.complete) addImg();
	else img.onload = addImg;
}

var scroller = function(e){
	timer = timer || setTimeout(function(argument) {
		timer = null;
		requestAnimationFrame(inView);
	}, 300);

}


	window.addEventListener('load', function() {
		pItem = document.getElementsByClassName('progressive replace');
		inView();
	})

	window.addEventListener('scroll', scroller, false);
	window.addEventListener('resize', scroller, false);
}