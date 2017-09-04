var  GMToffset = 0,t;

function startClock() {
  GMToffset=zxcReadCookie('time')||0;
  t=setInterval('digitalclock()',500);
}

function digitalclock()
{
var today=new Date();
var weekday = new Array(7);
weekday[0] =  "Domingo";
weekday[1] = "Lunes";
weekday[2] = "Martes";
weekday[3] = "Miercoles";
weekday[4] = "Jueves";
weekday[5] = "Viernes";
weekday[6] = "Sabado";
var dateNum = today.getDate();
var day=today.getDay();
var mont=today.getMonth();
var montName = new Array(12);
    montName[0] = "Enero";
    montName[1] = "Febrero";
    montName[2] = "Marzo";
    montName[3] = "abril";
    montName[4] = "Mayo";
    montName[5] = "Junio";
    montName[6] = "Julio";
    montName[7] =  "Agosto";
    montName[8] = "Septiembre";
    montName[9] = "Octubre";
    montName[10] = "Noviembre";
    montName[11] = "Diciembre";
var year = today.getFullYear();
var hours=(today.getHours() + GMToffset*1+24)%24;
var minutes=today.getMinutes();
var seconds=today.getSeconds();
minutes=checkTime(minutes);
seconds=checkTime(seconds);
hours=checkTime(hours);
//document.getElementById('bogotaTime').innerHTML=hours+":"+minutes+":"+seconds;
document.getElementById('bogotaDate').innerHTML = weekday[day]+', '+dateNum+' de '+montName[mont]+' de '+year;
document.getElementById('mexicoDate').innerHTML = weekday[day]+', '+dateNum+' de '+montName[mont]+' de '+year;
document.getElementById('bogotaTime').innerHTML = '<span class="hour">'+hours+'</span><span class="minute">'+minutes+'</span><span class="second">'+seconds+'</span>';
document.getElementById('mexicoTime').innerHTML = '<span class="hour">'+hours+'</span><span class="minute">'+minutes+'</span><span class="second">'+seconds+'</span>';
}

function checkTime(i)
{
if (i<10)
  {
  i="0" + i;
  }
return i;
}

function updatetime(nu) {
  GMToffset = nu;
  zxcCreateCookie('time',nu,1); // change 1 to the number of days persistance required
}

function zxcCreateCookie(nme,v,days){
 document.cookie=nme+'='+v+';expires='+(new Date(new Date().getTime()+days*86400000).toGMTString())+';path=/';
}

function zxcReadCookie(nme){
 nme+='=';
 var split = document.cookie.split(';');
 for(var z0=0;z0<split.length;z0++){
  var s=split[z0];
  while (s.charAt(0)==' ') s=s.substring(1,s.length);
  if (s.indexOf(nme)==0) return s.substring(nme.length,s.length);
 }
 return null;
}


/*------------------------------*/
/*          canvas clock        */
/*------------------------------*/




var canvas, ctx, clockWidth, centerX, centerY;

function ClockFace() 
{
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.beginPath();
	ctx.fillStyle= "#000000";
	ctx.arc(centerX, centerY, centerX, 0, 2 * Math.PI,true);
	ctx.fill();
	ctx.closePath();
	ctx.beginPath();
	ctx.fillStyle= "#666";
	ctx.arc(centerX, centerY, 10, 0, 2 * Math.PI, false);
	ctx.fill();
	ctx.closePath();
	var hours=12;
	for (var i= 0; i < 60; i++) 
	{
		ctx.lineCap= "square";
		ctx.save();
		ctx.beginPath();
		ctx.translate(centerX, centerY);
		ctx.rotate(i * Math.PI / 30);
		ctx.translate(0, -clockWidth / 2);
		if ((i % 5) == 0) 
		{
			ctx.fillStyle= "#ffffff";
			ctx.font="30px sans-serif";
			if(hours==3) 
			{
				ctx.rotate(i * Math.PI/-30);
				ctx.fillText(hours,-20,10);
			}
			else if(hours==9) 
			{
				ctx.rotate(i * Math.PI/-30);
				ctx.fillText(hours,0,10);
			}
			else if(hours==6) 
			{
				ctx.rotate(i * Math.PI/-30);
				ctx.fillText(hours,-10,0);
			}
			else if(hours==7) 
			{
				ctx.rotate(i * Math.PI/hours);
				ctx.fillText(hours,-15,0);
			}
			else if(hours==5 || hours==4)
			{
				ctx.rotate(i * Math.PI/hours);
				ctx.fillText(hours,-15,0);
			}
			else 
			{
				if(hours<10)
				ctx.fillText(hours,-15,30);
				else
					ctx.fillText(hours,-15,30);
			}
			if(hours==12) 
            hours=0;
			hours++;
		}
		else
		{
			
			ctx.strokeStyle= "#666999";
			
			ctx.moveTo(0, 2);
			ctx.lineWidth= 1;
			ctx.lineTo(0, 20);
		}
		ctx.stroke();
		ctx.restore();
	}
} 

function drawClockHand(length, angle) 
{
	ctx.save();
	ctx.beginPath();
	ctx.translate(centerX, centerY);
	ctx.lineCap= "round";
	ctx.lineJoin="round";
	var rotation=Math.PI * (angle - 180) / 180;
	ctx.rotate(rotation);
	ctx.moveTo(0, -40);
	ctx.lineTo(0, length);
	ctx.stroke();
	ctx.restore();
}

function onDrawTime() 
{
	ClockFace();
	var date= new Date();
	var hours= date.getHours() % 12;
	var minutes= date.getMinutes();
	var seconds= date.getSeconds();
	
	ctx.strokeStyle= "#dfdfdf";//"rgb(0, 0, 255)";
	ctx.lineWidth= 10;
	drawClockHand(clockWidth / 2.5, (hours + (minutes / 60)) * 30);

	ctx.strokeStyle= "#afafaf";
	ctx.lineWidth= 6;
	drawClockHand(clockWidth / 2.2, minutes * 6);

	ctx.strokeStyle= "#ffffff";
	ctx.lineWidth= 2;
	drawClockHand(clockWidth/2, seconds * 6);
}
function ananlogClock() 
{
	canvas= document.getElementById("analog_clock");
	clockWidth= Math.min(canvas.width, canvas.height) - 10;
	ctx= canvas.getContext("2d");
	centerX= canvas.width / 2;
	centerY= canvas.height / 2;
	ctx.lineCap= "round";
	onDrawTime();
	setInterval(onDrawTime, 1000);
} // initializeClock()
onload= ananlogClock;