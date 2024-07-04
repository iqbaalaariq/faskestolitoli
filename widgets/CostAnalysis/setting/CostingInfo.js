// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.15/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.
//>>built
require({cache:{"url:widgets/CostAnalysis/setting/CostingInfo.html":'\x3cdiv class\x3d"esriCTTabNode"\x3e\r\n    \x3c!--Add Layers section --\x3e\r\n    \x3cdiv class\x3d"esriCTTabContainer row"\x3e\r\n        \x3cdiv class\x3d"esriCTManageScenarioButtonContainer"\x3e\r\n            \x3cdiv class\x3d"esriCTMangeScenarios"\x3e\r\n                \x3cdiv data-dojo-attach-point\x3d"btnManageScenarios" class\x3d"esriCTBtnAddSection esriCTEllipsis"\x3e\r\n                    \x3cspan class\x3d"esriCTBtnAddIcon"\x3e\x3c/span\x3e\r\n                    \x3cspan class\x3d"esriCTBtnAddLabel esriCTEllipsis"\x3e${nls.costingInfo.manageScenariosTitle}\x3c/span\x3e\r\n                \x3c/div\x3e\r\n            \x3c/div\x3e\r\n        \x3c/div\x3e\r\n        \x3cdiv class\x3d"esriCTHidden esriCTNoEditableLayersAvailable" data-dojo-attach-point\x3d"noEditableLayersAvailable"\x3e\r\n            ${nls.costingInfo.noEditableLayersAvailable}\r\n        \x3c/div\x3e\r\n        \x3c!-- Update cost equation checkbox parent node --\x3e\r\n        \x3cdiv class\x3d"esriCTUpdateCostCheckBoxParentContainer esriCTHidden" data-dojo-attach-point\x3d"updateCostEquationChkContainer"\x3e\r\n            \x3c!-- checkbox container --\x3e\r\n            \x3cdiv class\x3d"esriCTUpdateCheckBoxContainer"\x3e\r\n                \x3c!-- checkbox --\x3e\r\n                \x3cinput id\x3d"esrict-update-costequation-check" data-dojo-attach-point\x3d"updateCostEquationCheckBox"\r\n                    data-dojo-type\x3d"dijit/form/CheckBox" type\x3d"checkbox" checked\x3d"false" /\x3e\r\n                \x3cspan\x3e${nls.costingInfo.updateProjectCostCheckboxLabel}\x3c/span\x3e\r\n            \x3c/div\x3e\r\n            \x3cdiv class\x3d"esriCTUpdateEquationHint esriCTNote"\x3e${nls.costingInfo.updateProjectCostEquationHint}\x3c/div\x3e\r\n        \x3c/div\x3e\r\n        \x3cdiv data-dojo-attach-point\x3d"costingTemplateContainer"\x3e\x3c/div\x3e\r\n    \x3c/div\x3e\r\n\x3c/div\x3e'}});
define("dojo/_base/declare jimu/BaseWidget dojo/Evented dijit/_WidgetsInTemplateMixin dojo/text!./CostingInfo.html dojo/on dojo/dom-construct dojo/_base/lang dojo/_base/array ./ManageScenarios ./CostingTemplate esri/tasks/query esri/tasks/QueryTask dojo/Deferred dojo/string dojo/dom-class dijit/form/CheckBox".split(" "),function(q,r,t,u,v,p,w,f,m,x,y,z,A,B,l,k){return q([r,t,u],{templateString:v,_manageScenario:null,totalScenariosCollection:[],costingTemplate:{},_scenarioOptions:[],_geographyOptions:[],
costingInfoData:{},_configuredLayers:[],baseClass:"jimu-widget-cost-analysis-costing-info",constructor:function(a){f.mixin(this,a)},postMixInProperties:function(){this.nls.common={};f.mixin(this.nls.common,window.jimuNls.common)},postCreate:function(){this.costingTemplate={};this._manageScenario=null;this.totalScenariosCollection=[];this._scenarioOptions=[];this._geographyOptions=[];this.costingInfoData={};this._configuredLayers=[];this.inherited(arguments);this._setUpdateEquationCheckBoxState();
for(var a in this.config.layerSettings)this.config.layerSettings[a].editable&&this._configuredLayers.push(this.config.layerSettings[a].id);this._init();this.own(p(this.btnManageScenarios,"click",f.hitch(this,this._manageScenariosBtnClicked)))},_setUpdateEquationCheckBoxState:function(){this.config&&this.config.hasOwnProperty("updateCostEquationCheckBoxStatus")&&this.updateCostEquationCheckBox.set("checked",this.config.updateCostEquationCheckBoxStatus)},validate:function(){var a=this._validateCostingInfoTabData();
return a.isValid?{isValid:!0}:{isValid:!1,errorMessage:a.errorMessage}},getConfig:function(){return{costingInfoData:this.costingInfoData,scenarios:this.totalScenariosCollection,updateCostEquationCheckBoxStatus:this.updateCostEquationCheckBox.get("checked")}},_init:function(){this._geographyOptions=[{label:this.nls.costingInfo.noneValue,value:""}];this.config.projectSettings&&""!==this.config.projectSettings.costingGeometryLayer&&void 0!==this.config.projectSettings.costingGeometryLayer?this.getGeographyOptions().then(f.hitch(this,
function(){this._createCostingTemplate()})):this.config.layerSettings&&this.config.layerSettings.length&&this._createCostingTemplate()},_createCostingTemplate:function(){var a;this._getScenarioOptions(this.config.scenarios);var b=this.map.itemInfo.itemData.operationalLayers;this._showHideNoLayerMessage(b.length);if(0<Object.keys(this.config.costingInfoSettings).length)for(a in this.config.costingInfoSettings)if(-1!==this._configuredLayers.indexOf(a)){var c=this._getOperationalLayer(b,a);c&&(!c.errors||
0>=c.errors.length)&&this._createCostingTemplateObj(c)}},_createCostingTemplateObj:function(a){0===this._scenarioOptions.length&&this._scenarioOptions.push({label:this.nls.costingInfo.noneValue,value:""});this.costingTemplate[a.id]=new y({nls:this.nls,map:this.map,config:this.config,layer:a,scenarios:this._scenarioOptions,geographies:this._geographyOptions},w.create("div",{},this.costingTemplateContainer))},_getOperationalLayer:function(a,b){var c;m.some(a,f.hitch(this,function(d){if(d.id===b)return c=
d,!0}));return c},_manageScenariosBtnClicked:function(){this._manageScenario=new x({nls:this.nls,map:this.map,config:this.config,existingScenarios:this.totalScenariosCollection});p(this._manageScenario,"okButtonClicked",f.hitch(this,function(a){this._manageScenario.destroy();this._getScenarioOptions(a)}))},_checkEditCapabilities:function(a){return a&&a.capabilities&&"string"===typeof a.capabilities&&-1!==a.capabilities.indexOf("Delete")&&-1!==a.capabilities.indexOf("Create")&&-1!==a.capabilities.indexOf("Update")&&
a.globalIdField?!0:!1},_getScenarioOptions:function(a){var b,c;this._scenarioOptions=[{label:this.nls.costingInfo.noneValue,value:""}];this.totalScenariosCollection=[];m.forEach(a,f.hitch(this,function(d){b="object"===typeof d?d.field:d;this._scenarioOptions.push({label:b,value:b});this.totalScenariosCollection.push(b)}));for(c in this.costingTemplate)this.costingTemplate[c].updateScenarioOptions(this._scenarioOptions)},getGeographyOptions:function(a,b){var c=new B;b||(a=this.config.projectSettings.geographyField,
b=this.config.projectSettings.costingGeometryLayer);if(""!==b&&this.layerInfosObj.getLayerInfoById(b)){b=this.map._layers[b];b=new A(b.url);var d=new z;d.outFields=[a];d.returnDistinctValues=!0;d.returnGeometry=!1;d.where="1\x3d1";b.execute(d,f.hitch(this,function(h){this._geographyQueryTaskComplete(h,a);c.resolve(this._geographyOptions)}),f.hitch(this,function(){this._geographyOptions=[];this._geographyOptions.push({label:this.nls.costingInfo.noneValue,value:""});c.resolve(this._geographyOptions)}))}else this._geographyOptions=
[],this._geographyOptions.push({label:this.nls.costingInfo.noneValue,value:""}),c.resolve(this._geographyOptions);return c.promise},_geographyQueryTaskComplete:function(a,b){this._geographyOptions=[{label:this.nls.costingInfo.noneValue,value:""}];m.forEach(a.features,f.hitch(this,function(c){""!==c.attributes[b]&&null!==c.attributes[b]&&this._geographyOptions.push({label:isNaN(c.attributes[b])?c.attributes[b]:c.attributes[b].toString(),value:c.attributes[b]})}))},_validateCostingInfoTabData:function(){var a,
b,c;this.costingInfoData={};for(a in this.costingTemplate){var d=[];var h=[];if(this.costingTemplate[a]){this.costingInfoData[a]=this.costingTemplate[a].getUpdatedCostingInfo();var g=this.costingInfoData[a].length;for(b in this.costingInfoData[a]){var e=this.costingInfoData[a][b];-1===h.indexOf(e.featureTemplate)&&h.push(e.featureTemplate);""===e.scenario&&""===e.geography&&-1===d.indexOf(e.featureTemplate)&&d.push(e.featureTemplate);if(!this.costingTemplate[a].validateCostEquation(e.costEquation))return{isValid:!1,
errorMessage:l.substitute(this.nls.costingInfo.requiredCostEquation,{templateName:e.featureTemplate,layerName:this.costingTemplate[a].layer.title})};if(1<g)for(c=parseInt(b,0)+1;c<g;c++){var n=this.costingInfoData[a][c];if(e.featureTemplate===n.featureTemplate&&e.scenario===n.scenario&&e.geography===n.geography)return{isValid:!1,errorMessage:l.substitute(this.nls.costingInfo.duplicateTemplateMessage,{layerName:this.costingTemplate[a].layer.title,templateName:e.featureTemplate})}}}g=0;e=h.length;for(g;g<
e;g++)if(-1===d.indexOf(h[g]))return{isValid:!1,errorMessage:l.substitute(this.nls.costingInfo.defaultEquationRequired,{templateName:h[g],layerName:this.costingTemplate[a].layer.title})};if(0===this.costingInfoData[a].length)return{isValid:!1,errorMessage:l.substitute(this.nls.costingInfo.noTemplateAvailable,{layerName:this.costingTemplate[a].layer.title})}}}return Object.keys(this.costingInfoData).length?{isValid:!0}:{isValid:!1,errorMessage:l.substitute(this.nls.costingInfo.noLayerMessage,{tabName:this.nls.costingInfo.tabTitle})}},
_updateCostingInfoTable:function(a,b){if(a.layerId)var c=a.layerId;else{var d=a.lastSelectedId;c=a.currentSelectedLayerId}Object.keys(a).length&&(d?(this.costingTemplate[c]&&this._deleteCostingInfoLayer(c),d&&(b||this._addCostingInfoLayer(d))):a.editable?b||this._addCostingInfoLayer(c):this.costingTemplate[c]&&this._deleteCostingInfoLayer(c));this._showHideNoLayerMessage(Object.keys(this.costingTemplate).length)},_showHideNoLayerMessage:function(a){0===a?(k.remove(this.noEditableLayersAvailable,"esriCTHidden"),
k.add(this.updateCostEquationChkContainer,"esriCTHidden"),k.add(this.costingTemplateContainer,"esriCTHidden")):(k.add(this.noEditableLayersAvailable,"esriCTHidden"),k.remove(this.updateCostEquationChkContainer,"esriCTHidden"),k.remove(this.costingTemplateContainer,"esriCTHidden"))},_deleteCostingInfoLayer:function(a){this.costingTemplate[a].destroyRecursive();delete this.costingTemplate[a];delete this.config.costingInfoSettings[a]},_addCostingInfoLayer:function(a){m.some(this.map.itemInfo.itemData.operationalLayers,
f.hitch(this,function(b){if(a===b.id&&this._checkEditCapabilities(b.layerObject))return this._createCostingTemplateObj(b),!0}))},onGeographyFieldUpdate:function(a){for(var b in this.costingTemplate)this.costingTemplate[b].updateGeographyOptions(a)},disableUpdateCostEquationChk:function(a){this.updateCostEquationCheckBox.set("disabled",a);a&&this.updateCostEquationCheckBox.set("value",!1)}})});