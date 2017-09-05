window.onload = function () {
	var subscribeEmail = function(email, name, languageCode){
		AWS.config.region = 'us-east-1'; // Region
		AWS.config.credentials = new AWS.CognitoIdentityCredentials({IdentityPoolId: 'us-east-1:0a0d2bec-2e8f-4281-8abe-adfd65bb773a',});
		var lambda = new AWS.Lambda({region: 'us-east-1', apiVersion: '2015-03-31'});

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
		});
	} 
	
	document.querySelector(".subscribe form").addEventListener("submit", function (event) {
		event.preventDefault();
		console.log("Try to subscribeEmail");
		
		var email = event.target.getElementsByClassName("email")[0].value;
		var name = event.target.getElementsByClassName("name")[0].value;

		if(email && name){
			subscribeEmail(email, name, global.languageCode);
		}
	});
}
