var SUBSCRIBED_COOKIE_NAME = "nl";
var SUBSCRIBED_COOKIE_VALUE = "1"

document.addEventListener("DOMContentLoaded", function() {
	AWS.config.region = 'us-east-1'; // Region
	AWS.config.credentials = new AWS.CognitoIdentityCredentials({IdentityPoolId: 'us-east-1:0a0d2bec-2e8f-4281-8abe-adfd65bb773a',});
	var lambda = new AWS.Lambda({region: 'us-east-1', apiVersion: '2015-03-31'});

	var subscribeEmail = function(email, name, languageCode, event){
		lambda.invoke({
			FunctionName: 'subscribe-email-user',
			Payload: JSON.stringify({
				email: email,
				name: name,
				languageCode: languageCode,
				conversionUrl: window.location.href
			})
		}, function(err, data) {
		 	if (err && console) {
				console.log(err);
			}
			else{
				createCookie(SUBSCRIBED_COOKIE_NAME, SUBSCRIBED_COOKIE_VALUE, 3650);
				changeLoadingVisibility(event.target, false);
				changeSuccessVisibility(event.target, true);
			}
		});
	}
	
	document.querySelector(".subscribe form").addEventListener("submit", function (event) {
		event.preventDefault();
		changeSubmitButtonEnableState(event.target, false);
		changeLoadingVisibility(event.target, true);

		console.log("Try to subscribeEmail");
		
		var email = event.target.getElementsByClassName("email")[0].value;
		var name = event.target.getElementsByClassName("name")[0].value;

		if(email && name){
			subscribeEmail(email, name, global.languageCode, event);
		}
	});

	
	function changeSubmitButtonEnableState(eventTarget, isEnabled){
		eventTarget.getElementsByClassName("submit")[0].disabled = !isEnabled;
	}

	function changeLoadingVisibility(eventTarget, isVisible){
		eventTarget.parentElement.getElementsByClassName("spinner")[0].hidden = !isVisible;
	}

	function changeSuccessVisibility(eventTarget, isVisible){
		eventTarget.parentElement.getElementsByClassName("success")[0].hidden = !isVisible;
	}

	function createCookie(name,value,days) {
	  if (days) {
	    var date = new Date();
	    date.setTime(date.getTime()+(days*24*60*60*1000));
	    var expires = "; expires="+date.toGMTString();
	  }
	  else var expires = "";
	  document.cookie = name+"="+value+expires+"; path=/";
	}

	function readCookie(name) {
	  var nameEQ = name + "=";
	  var ca = document.cookie.split(';');
	  for(var i=0;i < ca.length;i++) {
	    var c = ca[i];
	    while (c.charAt(0)==' ') c = c.substring(1,c.length);
	    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	  }
	  return null;
	}

	function eraseCookie(name) {
	    createCookie(name,"",-1);
	}
})
