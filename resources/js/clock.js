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
document.getElementById('bogotaTime').innerHTML = '<span class="hour">'+hours+'</span><span class="minute">'+minutes+'</span><span class="second">'+seconds+'</span>';
document.getElementById('mexicoDate').innerHTML = weekday[day]+', '+dateNum+' de '+montName[mont]+' de '+year;
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