/*
 * SWFObject v1.5: Flash Player detection and embed - http://blog.deconcept.com/swfobject/
 *
 * SWFObject is (c) 2007 Geoff Stearns and is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 * @namespace YAHOO
 */
YAHOO.namespace("deconcept");YAHOO.deconcept=YAHOO.deconcept||{};if(typeof YAHOO.deconcept.util=="undefined"||!YAHOO.deconcept.util){YAHOO.deconcept.util={};}if(typeof YAHOO.deconcept.SWFObjectUtil=="undefined"||!YAHOO.deconcept.SWFObjectUtil){YAHOO.deconcept.SWFObjectUtil={};}YAHOO.deconcept.SWFObject=function(E,C,K,F,H,J,L,G,A,D){if(!document.getElementById){return;}this.DETECT_KEY=D?D:"detectflash";this.skipDetect=YAHOO.deconcept.util.getRequestParameter(this.DETECT_KEY);this.params={};this.variables={};this.attributes=[];if(E){this.setAttribute("swf",E);}if(C){this.setAttribute("id",C);}if(K){this.setAttribute("width",K);}if(F){this.setAttribute("height",F);}if(H){this.setAttribute("version",new YAHOO.deconcept.PlayerVersion(H.toString().split(".")));}this.installedVer=YAHOO.deconcept.SWFObjectUtil.getPlayerVersion();if(!window.opera&&document.all&&this.installedVer.major>7){YAHOO.deconcept.SWFObject.doPrepUnload=true;}if(J){this.addParam("bgcolor",J);}var B=L?L:"high";this.addParam("quality",B);this.setAttribute("useExpressInstall",false);this.setAttribute("doExpressInstall",false);var I=(G)?G:window.location;this.setAttribute("xiRedirectUrl",I);this.setAttribute("redirectUrl","");if(A){this.setAttribute("redirectUrl",A);}};YAHOO.deconcept.SWFObject.prototype={useExpressInstall:function(A){this.xiSWFPath=!A?"expressinstall.swf":A;this.setAttribute("useExpressInstall",true);},setAttribute:function(A,B){this.attributes[A]=B;},getAttribute:function(A){return this.attributes[A];},addParam:function(A,B){this.params[A]=B;},getParams:function(){return this.params;},addVariable:function(A,B){this.variables[A]=B;},getVariable:function(A){return this.variables[A];},getVariables:function(){return this.variables;},getVariablePairs:function(){var A=[];var B;var C=this.getVariables();for(B in C){if(C.hasOwnProperty(B)){A[A.length]=B+"="+C[B];}}return A;},getSWFHTML:function(){var D="";var C={};var A="";var B="";if(navigator.plugins&&navigator.mimeTypes&&navigator.mimeTypes.length){if(this.getAttribute("doExpressInstall")){this.addVariable("MMplayerType","PlugIn");this.setAttribute("swf",this.xiSWFPath);}D='<embed type="application/x-shockwave-flash" src="'+this.getAttribute("swf")+'" width="'+this.getAttribute("width")+'" height="'+this.getAttribute("height")+'" style="'+this.getAttribute("style")+'"';D+=' id="'+this.getAttribute("id")+'" name="'+this.getAttribute("id")+'" ';C=this.getParams();for(A in C){if(C.hasOwnProperty(A)){D+=[A]+'="'+C[A]+'" ';}}B=this.getVariablePairs().join("&");if(B.length>0){D+='flashvars="'+B+'"';}D+="/>";}else{if(this.getAttribute("doExpressInstall")){this.addVariable("MMplayerType","ActiveX");this.setAttribute("swf",this.xiSWFPath);}D='<object id="'+this.getAttribute("id")+'" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="'+this.getAttribute("width")+'" height="'+this.getAttribute("height")+'" style="'+this.getAttribute("style")+'">';D+='<param name="movie" value="'+this.getAttribute("swf")+'" />';C=this.getParams();for(A in C){if(C.hasOwnProperty(A)){D+='<param name="'+A+'" value="'+C[A]+'" />';}}B=this.getVariablePairs().join("&");if(B.length>0){D+='<param name="flashvars" value="'+B+'" />';}D+="</object>";}return D;},write:function(A){if(this.getAttribute("useExpressInstall")){var B=new YAHOO.deconcept.PlayerVersion([6,0,65]);if(this.installedVer.versionIsValid(B)&&!this.installedVer.versionIsValid(this.getAttribute("version"))){this.setAttribute("doExpressInstall",true);this.addVariable("MMredirectURL",escape(this.getAttribute("xiRedirectUrl")));document.title=document.title.slice(0,47)+" - Flash Player Installation";this.addVariable("MMdoctitle",document.title);}}if(this.skipDetect||this.getAttribute("doExpressInstall")||this.installedVer.versionIsValid(this.getAttribute("version"))){var C=(typeof A=="string")?document.getElementById(A):A;C.innerHTML=this.getSWFHTML();return true;}else{if(this.getAttribute("redirectUrl")!==""){document.location.replace(this.getAttribute("redirectUrl"));}}return false;}};YAHOO.deconcept.SWFObjectUtil.getPlayerVersion=function(){var D=null;var C=new YAHOO.deconcept.PlayerVersion([0,0,0]);if(navigator.plugins&&navigator.mimeTypes.length){var A=navigator.plugins["Shockwave Flash"];if(A&&A.description){C=new YAHOO.deconcept.PlayerVersion(A.description.replace(/([a-zA-Z]|\s)+/,"").replace(/(\s+r|\s+b[0-9]+)/,".").split("."));}}else{if(navigator.userAgent&&navigator.userAgent.indexOf("Windows CE")>=0){var B=3;while(D){try{B++;D=new ActiveXObject("ShockwaveFlash.ShockwaveFlash."+B);C=new YAHOO.deconcept.PlayerVersion([B,0,0]);}catch(E){D=null;}}}else{try{D=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");}catch(E){try{D=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");C=new YAHOO.deconcept.PlayerVersion([6,0,21]);D.AllowScriptAccess="always";}catch(E){if(C.major==6){return C;}}try{D=new ActiveXObject("ShockwaveFlash.ShockwaveFlash");}catch(E){}}if(D!==null){C=new YAHOO.deconcept.PlayerVersion(D.GetVariable("$version").split(" ")[1].split(","));}}}return C;};YAHOO.deconcept.PlayerVersion=function(A){this.major=A[0]!==null?parseInt(A[0],0):0;this.minor=A[1]!==null?parseInt(A[1],0):0;this.rev=A[2]!==null?parseInt(A[2],0):0;};YAHOO.deconcept.PlayerVersion.prototype.versionIsValid=function(A){if(this.major<A.major){return false;}if(this.major>A.major){return true;}if(this.minor<A.minor){return false;}if(this.minor>A.minor){return true;}if(this.rev<A.rev){return false;}return true;};YAHOO.deconcept.util={getRequestParameter:function(D){var C=document.location.search||document.location.hash;if(D===null){return C;}if(C){var B=C.substring(1).split("&");for(var A=0;A<B.length;A++){if(B[A].substring(0,B[A].indexOf("="))==D){return B[A].substring((B[A].indexOf("=")+1));}}}return"";
}};YAHOO.deconcept.SWFObjectUtil.cleanupSWFs=function(){var C=document.getElementsByTagName("OBJECT");for(var B=C.length-1;B>=0;B--){C[B].style.display="none";for(var A in C[B]){if(typeof C[B][A]=="function"){C[B][A]=function(){};}}}};if(YAHOO.deconcept.SWFObject.doPrepUnload){if(!YAHOO.deconcept.unloadSet){YAHOO.deconcept.SWFObjectUtil.prepUnload=function(){__flash_unloadHandler=function(){};__flash_savedUnloadHandler=function(){};window.attachEvent("onunload",YAHOO.deconcept.SWFObjectUtil.cleanupSWFs);};window.attachEvent("onbeforeunload",YAHOO.deconcept.SWFObjectUtil.prepUnload);YAHOO.deconcept.unloadSet=true;}}if(!document.getElementById&&document.all){document.getElementById=function(A){return document.all[A];};}YAHOO.widget.FlashAdapter=function(D,A,B){this._queue=this._queue||[];this._events=this._events||{};this._configs=this._configs||{};B=B||{};this._id=B.id=B.id||YAHOO.util.Dom.generateId(null,"yuigen");B.version=B.version||"9.0.45";B.backgroundColor=B.backgroundColor||"#ffffff";this._attributes=B;this._swfURL=D;this._containerID=A;this._embedSWF(this._swfURL,this._containerID,B.id,B.version,B.backgroundColor,B.expressInstall,B.wmode);try{this.createEvent("contentReady");}catch(C){}};YAHOO.extend(YAHOO.widget.FlashAdapter,YAHOO.util.AttributeProvider,{_swfURL:null,_containerID:null,_swf:null,_id:null,_initialized:false,_attributes:null,toString:function(){return"FlashAdapter "+this._id;},destroy:function(){if(this._swf){var B=YAHOO.util.Dom.get(this._containerID);B.removeChild(this._swf);}var A=this._id;for(var C in this){if(YAHOO.lang.hasOwnProperty(this,C)){this[C]=null;}}},_embedSWF:function(I,H,D,C,F,G,B){var E=new YAHOO.deconcept.SWFObject(I,D,"100%","100%",C,F);if(G){E.useExpressInstall(G);}E.addParam("allowScriptAccess","always");if(B){E.addParam("wmode",B);}E.addVariable("allowedDomain",document.location.hostname);E.addVariable("elementID",D);E.addVariable("eventHandler","YAHOO.widget.FlashAdapter.eventHandler");var A=YAHOO.util.Dom.get(H);var J=E.write(A);if(J){this._swf=YAHOO.util.Dom.get(D);this._swf.owner=this;}else{}},_eventHandler:function(B){var A=B.type;switch(A){case"swfReady":this._loadHandler();this.fireEvent("contentReady");return;case"log":return;}this.fireEvent(A,B);},_loadHandler:function(){this._initialized=false;this._initAttributes(this._attributes);this.setAttributes(this._attributes,true);this._initialized=true;},set:function(A,B){this._attributes[A]=B;YAHOO.widget.FlashAdapter.superclass.set.call(this,A,B);},_initAttributes:function(A){this.getAttributeConfig("altText",{method:this._getAltText});this.setAttributeConfig("altText",{method:this._setAltText});this.getAttributeConfig("swfURL",{method:this._getSWFURL});},_getSWFURL:function(){return this._swfURL;},_getAltText:function(){return this._swf.getAltText();},_setAltText:function(A){return this._swf.setAltText(A);}});YAHOO.widget.FlashAdapter.eventHandler=function(A,C){var B=YAHOO.util.Dom.get(A);if(!B.owner){setTimeout(function(){YAHOO.widget.FlashAdapter.eventHandler(A,C);},0);}else{B.owner._eventHandler(C);}};YAHOO.widget.FlashAdapter.proxyFunctionCount=0;YAHOO.widget.FlashAdapter.createProxyFunction=function(B){var A=YAHOO.widget.FlashAdapter.proxyFunctionCount;YAHOO.widget.FlashAdapter["proxyFunction"+A]=function(){return B.apply(null,arguments);};YAHOO.widget.FlashAdapter.proxyFunctionCount++;return"YAHOO.widget.FlashAdapter.proxyFunction"+A.toString();};YAHOO.widget.FlashAdapter.removeProxyFunction=function(A){if(!A||A.indexOf("YAHOO.widget.FlashAdapter.proxyFunction")<0){return;}A=A.substr(26);YAHOO.widget.FlashAdapter[A]=null;};YAHOO.widget.Chart=function(C,A,D,B){YAHOO.widget.Chart.superclass.constructor.call(this,YAHOO.widget.Chart.SWFURL,A,B);this._type=C;this._dataSource=D;this.createEvent("itemMouseOverEvent");this.createEvent("itemMouseOutEvent");this.createEvent("itemClickEvent");this.createEvent("itemDoubleClickEvent");this.createEvent("itemDragStartEvent");this.createEvent("itemDragEvent");this.createEvent("itemDragEndEvent");};YAHOO.extend(YAHOO.widget.Chart,YAHOO.widget.FlashAdapter,{_type:null,_pollingID:null,_pollingInterval:null,_dataTipFunction:null,_seriesLabelFunctions:null,toString:function(){return"Chart "+this._id;},setStyle:function(A,B){B=YAHOO.lang.JSON.stringify(B);this._swf.setStyle(A,B);},setStyles:function(A){A=YAHOO.lang.JSON.stringify(A);this._swf.setStyles(A);},setSeriesStyles:function(B){for(var A=0;A<B.length;A++){B[A]=YAHOO.lang.JSON.stringify(B[A]);}this._swf.setSeriesStyles(B);},destroy:function(){if(this._dataSource!==null){if(this._pollingID!==null){this._dataSource.clearInterval(this._pollingID);this._pollingID=null;}}if(this._dataTipFunction){YAHOO.widget.FlashAdapter.removeProxyFunction(this._dataTipFunction);}YAHOO.widget.Chart.superclass.destroy.call(this);},_initAttributes:function(A){YAHOO.widget.Chart.superclass._initAttributes.call(this,A);this.getAttributeConfig("request",{method:this._getRequest});this.setAttributeConfig("request",{method:this._setRequest});this.getAttributeConfig("dataSource",{method:this._getDataSource});this.setAttributeConfig("dataSource",{method:this._setDataSource});this.getAttributeConfig("series",{method:this._getSeriesDefs});this.setAttributeConfig("series",{method:this._setSeriesDefs});this.getAttributeConfig("categoryNames",{method:this._getCategoryNames});this.setAttributeConfig("categoryNames",{validator:YAHOO.lang.isArray,method:this._setCategoryNames});this.getAttributeConfig("dataTipFunction",{method:this._getDataTipFunction});this.setAttributeConfig("dataTipFunction",{method:this._setDataTipFunction});this.getAttributeConfig("polling",{method:this._getPolling});this.setAttributeConfig("polling",{method:this._setPolling});},_loadHandler:function(){this._swf.setType(this._type);if(this._attributes.style){var A=this._attributes.style;this.setStyles(A);}YAHOO.widget.Chart.superclass._loadHandler.call(this);if(this._dataSource){this.set("dataSource",this._dataSource);}},refreshData:function(){if(!this._initialized){return;
}if(this._dataSource!==null){if(this._pollingID!==null){this._dataSource.clearInterval(this._pollingID);this._pollingID=null;}if(this._pollingInterval>0){this._pollingID=this._dataSource.setInterval(this._pollingInterval,this._request,this._loadDataHandler,this);}this._dataSource.sendRequest(this._request,this._loadDataHandler,this);}},_loadDataHandler:function(D,C,J){if(this._swf){if(J){}else{var H;if(this._seriesLabelFunctions){var I=this._seriesLabelFunctions.length;for(H=0;H<I;H++){YAHOO.widget.FlashAdapter.removeProxyFunction(this._seriesLabelFunctions[H]);}this._seriesLabelFunction=null;}this._seriesLabelFunctions=[];var F=[];var E=0;var K=null;if(this._seriesDefs!==null){E=this._seriesDefs.length;for(H=0;H<E;H++){K=this._seriesDefs[H];var B={};for(var A in K){if(YAHOO.lang.hasOwnProperty(K,A)){if(A=="style"){if(K.style!==null){B.style=YAHOO.lang.JSON.stringify(K.style);}}else{if(A=="labelFunction"){if(K.labelFunction!==null&&typeof K.labelFunction=="function"){B.labelFunction=YAHOO.widget.FlashAdapter.createProxyFunction(K.labelFunction);this._seriesLabelFunctions.push(B.labelFunction);}}else{B[A]=K[A];}}}}F.push(B);}}if(E>0){for(H=0;H<E;H++){K=F[H];if(!K.type){K.type=this._type;}K.dataProvider=C.results;}}else{var G={type:this._type,dataProvider:C.results};F.push(G);}this._swf.setDataProvider(F);}}},_request:"",_getRequest:function(){return this._request;},_setRequest:function(A){this._request=A;this.refreshData();},_dataSource:null,_getDataSource:function(){return this._dataSource;},_setDataSource:function(A){this._dataSource=A;this.refreshData();},_seriesDefs:null,_getSeriesDefs:function(){return this._seriesDefs;},_setSeriesDefs:function(A){this._seriesDefs=A;this.refreshData();},_getCategoryNames:function(){this._swf.getCategoryNames();},_setCategoryNames:function(A){this._swf.setCategoryNames(A);},_setDataTipFunction:function(A){if(this._dataTipFunction){YAHOO.widget.FlashAdapter.removeProxyFunction(this._dataTipFunction);}if(A&&typeof A=="function"){A=YAHOO.widget.FlashAdapter.createProxyFunction(A);this._dataTipFunction=A;}this._swf.setDataTipFunction(A);},_getPolling:function(){return this._pollingInterval;},_setPolling:function(A){this._pollingInterval=A;this.refreshData();}});YAHOO.widget.Chart.SWFURL="assets/charts.swf";YAHOO.widget.PieChart=function(A,C,B){YAHOO.widget.PieChart.superclass.constructor.call(this,"pie",A,C,B);};YAHOO.lang.extend(YAHOO.widget.PieChart,YAHOO.widget.Chart,{_initAttributes:function(A){YAHOO.widget.PieChart.superclass._initAttributes.call(this,A);this.getAttributeConfig("dataField",{method:this._getDataField});this.setAttributeConfig("dataField",{validator:YAHOO.lang.isString,method:this._setDataField});this.getAttributeConfig("categoryField",{method:this._getCategoryField});this.setAttributeConfig("categoryField",{validator:YAHOO.lang.isString,method:this._setCategoryField});},_getDataField:function(){return this._swf.getDataField();},_setDataField:function(A){this._swf.setDataField(A);},_getCategoryField:function(){return this._swf.getCategoryField();},_setCategoryField:function(A){this._swf.setCategoryField(A);}});YAHOO.widget.CartesianChart=function(C,A,D,B){YAHOO.widget.CartesianChart.superclass.constructor.call(this,C,A,D,B);};YAHOO.lang.extend(YAHOO.widget.CartesianChart,YAHOO.widget.Chart,{_xAxisLabelFunction:null,_yAxisLabelFunction:null,destroy:function(){if(this._xAxisLabelFunction){YAHOO.widget.FlashAdapter.removeProxyFunction(this._xAxisLabelFunction);this._xAxisLabelFunction=null;}if(this._yAxisLabelFunction){YAHOO.widget.FlashAdapter.removeProxyFunction(this._yAxisLabelFunction);this._yAxisLabelFunction=null;}YAHOO.widget.CartesianChart.superclass.destroy.call(this);},_initAttributes:function(A){YAHOO.widget.CartesianChart.superclass._initAttributes.call(this,A);this.getAttributeConfig("xField",{method:this._getXField});this.setAttributeConfig("xField",{validator:YAHOO.lang.isString,method:this._setXField});this.getAttributeConfig("yField",{method:this._getYField});this.setAttributeConfig("yField",{validator:YAHOO.lang.isString,method:this._setYField});this.setAttributeConfig("xAxis",{method:this._setXAxis});this.setAttributeConfig("yAxis",{method:this._setYAxis});},_getXField:function(){return this._swf.getHorizontalField();},_setXField:function(A){this._swf.setHorizontalField(A);},_getYField:function(){return this._swf.getVerticalField();},_setYField:function(A){this._swf.setVerticalField(A);},_setXAxis:function(B){if(this._xAxisLabelFunction!==null){YAHOO.widget.FlashAdapter.removeProxyFunction(this._xAxisLabelFunction);this._xAxisLabelFunction=null;}var A={};for(var C in B){if(C=="labelFunction"){if(B.labelFunction!==null){if(typeof B.labelFunction=="function"){A.labelFunction=YAHOO.widget.FlashAdapter.createProxyFunction(B.labelFunction);}else{A.labelFunction=B.labelFunction;}this._xAxisLabelFunction=A.labelFunction;}}else{A[C]=B[C];}}this._swf.setHorizontalAxis(A);},_setYAxis:function(B){if(this._yAxisLabelFunction!==null){YAHOO.widget.FlashAdapter.removeProxyFunction(this._yAxisLabelFunction);this._yAxisLabelFunction=null;}var A={};for(var C in B){if(C=="labelFunction"){if(B.labelFunction!==null){if(typeof B.labelFunction=="function"){A.labelFunction=YAHOO.widget.FlashAdapter.createProxyFunction(B.labelFunction);}else{A.labelFunction=B.labelFunction;}this._yAxisLabelFunction=A.labelFunction;}}else{A[C]=B[C];}}this._swf.setVerticalAxis(A);}});YAHOO.widget.LineChart=function(A,C,B){YAHOO.widget.LineChart.superclass.constructor.call(this,"line",A,C,B);};YAHOO.lang.extend(YAHOO.widget.LineChart,YAHOO.widget.CartesianChart);YAHOO.widget.ColumnChart=function(A,C,B){YAHOO.widget.ColumnChart.superclass.constructor.call(this,"column",A,C,B);};YAHOO.lang.extend(YAHOO.widget.ColumnChart,YAHOO.widget.CartesianChart);YAHOO.widget.BarChart=function(A,C,B){YAHOO.widget.BarChart.superclass.constructor.call(this,"bar",A,C,B);};YAHOO.lang.extend(YAHOO.widget.BarChart,YAHOO.widget.CartesianChart);YAHOO.widget.StackedColumnChart=function(A,C,B){YAHOO.widget.StackedColumnChart.superclass.constructor.call(this,"stackcolumn",A,C,B);
};YAHOO.lang.extend(YAHOO.widget.StackedColumnChart,YAHOO.widget.CartesianChart);YAHOO.widget.StackedBarChart=function(A,C,B){YAHOO.widget.StackedBarChart.superclass.constructor.call(this,"stackbar",A,C,B);};YAHOO.lang.extend(YAHOO.widget.StackedBarChart,YAHOO.widget.CartesianChart);YAHOO.widget.Axis=function(){};YAHOO.widget.Axis.prototype={type:null,reverse:false,labelFunction:null,numLabels:NaN};YAHOO.widget.NumericAxis=function(){YAHOO.widget.NumericAxis.superclass.constructor.call(this);};YAHOO.lang.extend(YAHOO.widget.NumericAxis,YAHOO.widget.Axis,{type:"numeric",minimum:NaN,maximum:NaN,majorUnit:NaN,minorUnit:NaN,snapToUnits:true,stackingEnabled:false,alwaysShowZero:true,scale:"linear",roundMajorUnit:true});YAHOO.widget.TimeAxis=function(){YAHOO.widget.TimeAxis.superclass.constructor.call(this);};YAHOO.lang.extend(YAHOO.widget.TimeAxis,YAHOO.widget.Axis,{type:"time",minimum:null,maximum:null,majorUnit:NaN,majorTimeUnit:null,minorUnit:NaN,minorTimeUnit:null,snapToUnits:true,stackingEnabled:false});YAHOO.widget.CategoryAxis=function(){YAHOO.widget.CategoryAxis.superclass.constructor.call(this);};YAHOO.lang.extend(YAHOO.widget.CategoryAxis,YAHOO.widget.Axis,{type:"category",categoryNames:null,calculateCategoryCount:false});YAHOO.widget.Series=function(){};YAHOO.widget.Series.prototype={type:null,displayName:null};YAHOO.widget.CartesianSeries=function(){YAHOO.widget.CartesianSeries.superclass.constructor.call(this);};YAHOO.lang.extend(YAHOO.widget.CartesianSeries,YAHOO.widget.Series,{xField:null,yField:null});YAHOO.widget.ColumnSeries=function(){YAHOO.widget.ColumnSeries.superclass.constructor.call(this);};YAHOO.lang.extend(YAHOO.widget.ColumnSeries,YAHOO.widget.CartesianSeries,{type:"column"});YAHOO.widget.LineSeries=function(){YAHOO.widget.LineSeries.superclass.constructor.call(this);};YAHOO.lang.extend(YAHOO.widget.LineSeries,YAHOO.widget.CartesianSeries,{type:"line"});YAHOO.widget.BarSeries=function(){YAHOO.widget.BarSeries.superclass.constructor.call(this);};YAHOO.lang.extend(YAHOO.widget.BarSeries,YAHOO.widget.CartesianSeries,{type:"bar"});YAHOO.widget.PieSeries=function(){YAHOO.widget.PieSeries.superclass.constructor.call(this);};YAHOO.lang.extend(YAHOO.widget.PieSeries,YAHOO.widget.Series,{type:"pie",dataField:null,categoryField:null,labelFunction:null});YAHOO.widget.StackedBarSeries=function(){YAHOO.widget.StackedBarSeries.superclass.constructor.call(this);};YAHOO.lang.extend(YAHOO.widget.StackedBarSeries,YAHOO.widget.CartesianSeries,{type:"stackbar"});YAHOO.widget.StackedColumnSeries=function(){YAHOO.widget.StackedColumnSeries.superclass.constructor.call(this);};YAHOO.lang.extend(YAHOO.widget.StackedColumnSeries,YAHOO.widget.CartesianSeries,{type:"stackcolumn"});YAHOO.register("charts",YAHOO.widget.Chart,{version:"@VERSION@",build:"@BUILD@"});