//CLOCK//
setInterval(displayclock,500);
function displayclock(){
	var time=new Date();
	var hrs=time.getHours();
	var min= time.getMinutes();
	var sec=time.getSeconds();

	if (hrs > 12){
		hrs = hrs - 12;
	}
	if (hrs==0){
		hrs=12;
	}
	if (hrs< 10){
		hrs='0'+ hrs;
	}
	
	if (min< 10){
		min='0'+ hrs;
	}
	
	if (sec< 10){
		sec='0'+ hrs;
	}
	document.getElementById('clock').innerHTML = hrs +':' + min + ':' +sec;

}
