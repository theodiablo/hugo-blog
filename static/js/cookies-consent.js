
(function(){
if(document.getElementsByClassName){
	var COOKIECONSENT_COOKIE_NAME = "cc";
	var ACCEPT_CONSENT_COOKIE_VALUE = "ok";

	var cookieConsentValue = readCookie(COOKIECONSENT_COOKIE_NAME);
	var cookieMessageElement = document.getElementsByClassName("cc-banner")[0];

	if(!!!cookieConsentValue){
		//If cookie is not set, show the cookie message and add event listner to cookie button.
		cookieMessageElement.classList.remove("hidden");

		// When user clicks on cookie button, sets the cookie and hide cookie message.
		var cookieButton = cookieMessageElement.getElementsByClassName("cc-btn")[0];
		if(is_touch_device()){
			cookieButton.addEventListener("touchend", function(e){
				e.preventDefault();
				createCookie(COOKIECONSENT_COOKIE_NAME, ACCEPT_CONSENT_COOKIE_VALUE, 3650);
				cookieMessageElement.classList.add("hidden");
			});
		}else{
			cookieButton.addEventListener("click", function(e){
				e.preventDefault();
				createCookie(COOKIECONSENT_COOKIE_NAME, ACCEPT_CONSENT_COOKIE_VALUE, 3650);
				cookieMessageElement.classList.add("hidden");
			});
		}

		//createCookie(COOKIECONSENT_COOKIE_NAME, SUBSCRIBED_COOKIE_VALUE, 3650);

	}
	else{
		//Make sure message is hidden
		cookieMessageElement.classList.add("hidden");
	}
}}())
