(function(){

  var step=1,
    d=document,
    w=window;

  var json={},
      ssMax=0,
      ssCtr=0,
      hitApp=0,
      appId="",
      tiffFlg="false";

      var bmBase='https://rkpg.github.io/apphtml.js';

      var cnt=getJs('cnt'),knd=getJs('knd'),out=getJs('out'),aff=getJs('aff');var scs=getJs('scs'),ipd=getJs('ipd'),fmt=unescape(getJs('fmt'));if(location.href.indexOf("itunes.apple.com/")>-1){var urlAry=location.href.split("/id");appId=urlAry[1];urlAry=appId.split("?");appId=urlAry[0];}
var kwd='';if(appId==""){if(d.selection)kwd=d.selection.createRange().text;else if(w.selection)kwd=w.selection.createRange().text;else if(w.getSelection)kwd=w.getSelection();else if(d.getSelection)kwd=d.getSelection();else kwd='';if(kwd=="")kwd=prompt("Input App name.","");if(kwd==""||!kwd){prompt('Result','Not Found ...');return;}}
var bmAry=['appname','version','price','title','category','appsize','pubdate','seller','sellersite','selleritunes','phgurl','url','icon175url','icon100url','icon75url','icon53url','moveos','os','gamecenter','univ','lang','rating','curverrating','curverstar','curreviewcnt','allverrating','allverstar','allreviewcnt','desc','descnew','image1','image2','image3','image4','image5','univimage1','univimage2','univimage3','univimage4','univimage5'];var timerId=setInterval(function(){switch(step){case 1:step=0;getWebApi();break;case 2:step=0;getWidth();break;case 3:step=0;dispData();break;case 4:while(d.getElementById("bmlt"))d.getElementById("bmlt").parentNode.removeChild(d.getElementById("bmlt"));clearInterval(timerId);timerId=null;return 0;}},100);function getWebApi(){var s=d.createElement("script"),src="";if(appId!="")src="https://itunes.apple.com/jp/lookup?id="+ appId+"&lang=ja_jp&country=JP&entity="+ knd+"&limit="+ cnt;if(src=="")src="https://itunes.apple.com/jp/search?term="+ encodeURIComponent(kwd)+"&lang=ja_jp&country=JP&entity="+ knd+"&limit="+ cnt;s.charset="utf-8";s.src=src+"&callback=result";s.id="bmlt";d.body.appendChild(s);w.result=function(data){if(data.resultCount==0){prompt('Result','Not Found ...');step=4;return;}
for(var i=0;i<data.resultCount;i++){json[i]=data.results[i];json[i].description=json[i].description.replace(/\n/g,'<br>');if(json[i].releaseNotes)json[i].releaseNotes=json[i].releaseNotes.replace(/\n/g,'<br>');var z=json[i],x=new Array(bmAry);x.appname=z.trackCensoredName;x.version=z.version;if(eval(z.price)==0)x.price='無料';else x.price='￥'+ fmtNumber(z.price);x.title=x.appname+' '+ x.version+'（'+ x.price+'）';var r=prompt('【'+(i+ 1)+'/'+ data.resultCount+'】'+ x.title,'OK→次, キャンセル→決定');if(!r){hitApp=i;step=2;return;}}
step=4;}}
function getWidth(){var i;ssMax=json[hitApp].screenshotUrls.length;if(knd=='software'){ssMax=ssMax+ json[hitApp].ipadScreenshotUrls.length;for(i=0;i<json[hitApp].screenshotUrls.length;i++){loadImg(i,"image",json[hitApp].screenshotUrls[i],eval(scs));}
for(i=0;i<json[hitApp].ipadScreenshotUrls.length;i++){loadImg(i,"univimage",json[hitApp].ipadScreenshotUrls[i],eval(scs)*eval(ipd));}}
if(knd=='iPadSoftware'){ssMax=ssMax+ json[hitApp].ipadScreenshotUrls.length;for(i=0;i<json[hitApp].ipadScreenshotUrls.length;i++){loadImg(i,"image",json[hitApp].ipadScreenshotUrls[i],eval(scs));}
for(i=0;i<json[hitApp].screenshotUrls.length;i++){loadImg(i,"univimage",json[hitApp].screenshotUrls[i],eval(scs)*eval(ipd));}}
if(knd=='macSoftware'){for(i=0;i<json[hitApp].screenshotUrls.length;i++){loadImg(i,"image",json[hitApp].screenshotUrls[i],eval(scs));}}}
function loadImg(i,type,src,x){var aw,ah,img=new Image(),ret;if(src.indexOf(".tif")!=-1){ssCtr=ssCtr+ 1;json[hitApp][type+(i+ 1)+"width"]=0;if(ssCtr==ssMax)step=3;tiffFlg="true";return;}
img.src=src;img.onload=function(){aw=img.width;ah=img.height;if(aw>ah){ret=Math.round(x);}else{ret=Math.round(x*(aw/ah));}
img.onload="";img=void 0;ssCtr=ssCtr+ 1;json[hitApp][type+(i+ 1)+"width"]=ret;if(ssCtr==ssMax)step=3;}}
function dispData(){var x='',chk='';var z=json[hitApp],pData=fmt;var bmData=handData(z);for(var j=0;j<bmAry.length;j++){var key=bmAry[j],value=bmData[key],reg=new RegExp('\\${'+ key+'}','g');pData=pData.replace(reg,value);}
x=pData+'\n';chk=pData;if(tiffFlg=="true")prompt("Screenshots cannot be displayed because of TIFF files.","Warning...");if(chk!=''){if(out=="preview"){d.body.innerHTML='<div id="bkmlt_preview">'+"<form><input type='button' value='プレビュー表示を消す' onclick='javascript:"+'var a=document.getElementById("bkmlt_preview");a.parentNode.removeChild(a);'+"'>　<input type='button' value='HTMLを選択する' onclick='javascript:"+'var a=document.getElementById("bkmklt_ret");a.focus();'+"'>　<input type='button' value='HTMLの内容でプレビューを書き直す' onclick='javascript:"+'var a=document.getElementById("bkmklt_ret").value;'+'document.getElementById("bkmklt_rewrite").innerHTML=a;'+"'></form>"+'<textarea style="width:99%;font-size:80%;" rows="10" id="bkmklt_ret"'+'onfocus="javascript:this.select();">'+ x+'</textarea><br><br><div id="bkmklt_rewrite">'+
x+'</div></div>'+ d.body.innerHTML;}
if(out=="popup"){prompt("result",x);}
if(out=="textforce"){w.location='textforce://file?path=/blog.html&method=write&after=quick_look&text='+
encodeURIComponent(x);}
if(out=="draftpad"){w.location='draftpad:///insert?after='+ encodeURIComponent(x);}
if(out=="slpro"){w.location='slpro://'+ encodeURIComponent(x);}
if(out=="moblogger-append"){w.location='moblogger://append?text='+ encodeURIComponent(x);}
if(out=="moblogger-pboard"){w.location='moblogger://pboard?text='+ encodeURIComponent(x);}}
step=4;}
function handData(data){var x=new Array(bmAry),i,j,tmp,reg;x.appname=data.trackCensoredName;x.version=data.version;if(eval(data.price)==0)x.price='無料';else x.price='￥'+ fmtNumber(data.price);x.title=x.appname+' '+ x.version+'（'+ x.price+'）';x.category=data.genres[0];for(i=1;i<data.genres.length;i++)x.category=x.category+', '+ data.genres[i];x.appsize=sizeNumber(data.fileSizeBytes);x.pubdate=data.releaseDate.replace(/-/g,'/');x.pubdate=x.pubdate.replace(/T.*/g,'');x.seller=data.artistName+' - '+ data.sellerName;x.sellersite=data.sellerUrl;if(aff=='')x.selleritunes=data.artistViewUrl.replace("&uo=4","");else x.selleritunes=phgurl(data.artistViewUrl,aff);if(aff=='')x.phgurl=data.trackViewUrl.replace("&uo=4","");else x.phgurl=phgurl(data.trackViewUrl,aff);x.url=data.trackViewUrl.replace("&uo=4","");tmp=data.artworkUrl100.split(".");reg=new RegExp(tmp[tmp.length- 1]+'$');x.icon100url=data.artworkUrl100;x.moveos="";x.os="";x.gamecenter="";x.univ="";if(knd!='macSoftware'){x.moveos=data.supportedDevices[0];for(i=1;i<data.supportedDevices.length;i++)x.moveos=x.moveos+', '+ data.supportedDevices[i];x.os=x.moveos.replace(/.*all.*/g,'iPhone');if(x.os=='')x.os=x.moveos.replace(/.*iPhone.*/g,'iPhone');if(x.os=='')x.os=x.moveos.replace(/.*iPad.*/g,'iPad');if(data.isGameCenterEnabled)x.gamecenter='<img width="100" alt="GameCenter対応" '+'src="https://sites.google.com/site/ichitasofile/home/apphtml/gc_badge.png" style="vertical-align:middle;">';if(!x.gamecenter)x.gamecenter="";if(data.ipadScreenshotUrls[0]&&data.screenshotUrls[0])x.univ='<img alt="+ " src="https://sites.google.com/site/ichitasofile/home/apphtml/fat-binary-badge-web.png" style="vertical-align:middle;">'+' iPhone/iPadの両方に対応';if(!x.univ)x.univ="";}
x.lang=data.languageCodesISO2A[0];for(i=1;i<data.languageCodesISO2A.length;i++)x.lang=x.lang+', '+ data.languageCodesISO2A[i];x.rating=data.trackContentRating;if(''+ data.averageUserRatingForCurrentVersion=='null')x.curverrating='無し';else x.curverrating=data.averageUserRatingForCurrentVersion;x.curverstar=getStar(data.averageUserRatingForCurrentVersion);if(!data.userRatingCountForCurrentVersion){x.curreviewcnt='0件の評価';}else{x.curreviewcnt=fmtNumber(data.userRatingCountForCurrentVersion)+'件の評価';}
x.curreviewcnt=x.curreviewcnt.replace('n,ull','0');if(''+ data.averageUserRating=='null')x.allverrating='無し';else x.allverrating=data.averageUserRating;x.allverstar=getStar(data.averageUserRating);if(!data.userRatingCount){x.allreviewcnt='0件の評価';}else{x.allreviewcnt=fmtNumber(data.userRatingCount)+'件の評価';}
x.allreviewcnt=x.allreviewcnt.replace('n,ull','0');x.desc=data.description;x.descnew=data.releaseNotes;for(i=1;i<=5;i++){x['image'+ i]="";x['univimage'+ i]="";}
if(knd=='software'){for(i=0;i<data.screenshotUrls.length;i++){if(data.screenshotUrls[i]){x['image'+(i+ 1)]='<img alt="ss'+(i+ 1)+'" src="'+
data.screenshotUrls[i]+'" '+'width="'+ data['image'+(i+ 1)+'width']+'px">';}}
for(i=0;i<data.ipadScreenshotUrls.length;i++){if(data.ipadScreenshotUrls[i]){x['univimage'+(i+ 1)]='<img alt="univss'+(i+ 1)+'" src="'+
data.ipadScreenshotUrls[i]+'" '+'width="'+ data['univimage'+(i+ 1)+'width']+'px">';}}}
if(knd=='iPadSoftware'){for(i=0;i<data.ipadScreenshotUrls.length;i++){if(data.ipadScreenshotUrls[i]){x['image'+(i+ 1)]='<img alt="ss'+(i+ 1)+'" src="'+
data.ipadScreenshotUrls[i]+'" '+'width="'+ data['image'+(i+ 1)+'width']+'px">';}}
for(i=0;i<data.screenshotUrls.length;i++){if(data.screenshotUrls[i]){x['univimage'+(i+ 1)]='<img alt="univss'+(i+ 1)+'" src="'+
data.screenshotUrls[i]+'" '+'width="'+ data['univimage'+(i+ 1)+'width']+'px">';}}}
if(knd=='macSoftware'){for(i=0;i<data.screenshotUrls.length;i++){if(data.screenshotUrls[i]){x['image'+(i+ 1)]='<img alt="ss'+(i+ 1)+'" src="'+
data.screenshotUrls[i]+'" '+'width="'+ data['image'+(i+ 1)+'width']+'px">';}}}
return x;}
function getJs(searchKey){var scripts=document.getElementsByTagName("script"),urlArg,params={};for(var i=0;i<scripts.length;i++){var tmp=scripts.item(i);if(tmp.src.indexOf(bmBase)!=-1){urlArg=tmp.src.slice(bmBase.length+ 1);break;}}
var paramAry,dataKey,dataVal,pos;if(urlArg)paramAry=urlArg.split("&");if(paramAry){for(var i=0;i<paramAry.length;i++){var pos=paramAry[i].indexOf('=');if(pos>0){dataKey=paramAry[i].substring(0,pos);dataVal=paramAry[i].substring(pos+ 1);}
if(dataKey==searchKey)return dataVal;}}
return null;}
function fmtNumber(x){var s=''+ x,p=s.indexOf('.');if(p<0)p=s.length;var r=s.substring(p,s.length);for(var i=0;i<p;i++){var c=s.substring(p- 1- i,p- 1- i+ 1);if(i>0&&i%3==0)r=','+ r;r=c+ r;}
return r;}
function sizeNumber(x){var r=Math.round((eval(x)/ 1000000) * 10) / 10;
r=fmtNumber(r);r=r+' MB';return r;}
function phgurl(url,id){var main=url;var appUrl=url.replace("&uo=4","");return appUrl+'&at='+ id;}
function getStar(x){var star='<img alt="" src="https://sites.google.com/site/ichitasofile/home/apphtml/rating_star.png">';var half='<img alt="" src="https://sites.google.com/site/ichitasofile/home/apphtml/rating_star_half.png">';var tmp=(''+ x).split(".",2);var ret='';for(var i=1;i<eval(tmp[0])+ 1;i++)ret=ret+ star;if(tmp[1])ret=ret+ half;if(ret=='')ret='無し';return ret;}})();
