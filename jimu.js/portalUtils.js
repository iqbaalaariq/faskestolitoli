// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.15/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.
//>>built
define("dojo/_base/declare dojo/_base/lang dojo/_base/array dojo/_base/config dojo/Deferred dojo/topic dojo/json dojo/request/xhr esri/request ./Role ./utils ./portalUrlUtils ./tokenUtils ./ServiceDefinitionManager".split(" "),function(u,e,r,v,l,D,y,E,m,z,A,h,q,F){var H=u([],{declaredClass:"jimu.Portal",selfUrl:null,user:null,selfInfo:null,portalUrl:null,credential:null,constructor:function(a){this.portalUrl=h.getStandardPortalUrl(a);this.selfUrl=h.getPortalSelfInfoUrl(a)},loadSelfInfo:function(){var a=
this.selfUrl;this.isValidCredential()&&(a=-1<a.indexOf("?")?a+("\x26token\x3d"+this.credential.token):a+("?token\x3d"+this.credential.token));return F.getInstance().getServiceDefinition(a).then(e.hitch(this,function(b){var c=b.user;delete b.user;e.mixin(this,b);b.user=c;return b}))},_checkCredential:function(){var a=q.isValidCredential(this.credential);a||this.clearCredentialAndUser();return a},isValidCredential:function(){this.updateCredential();return this._checkCredential()},updateCredential:function(){this._checkCredential()||
(this.credential=q.getPortalCredential(this.portalUrl))},signIn:function(){var a=new l;this.updateCredential();this.isValidCredential()?setTimeout(e.hitch(this,function(){a.resolve(this.credential)}),0):a=q.signInPortal(this.portalUrl);return a},haveSignIn:function(){return q.userHaveSignInPortal(this.portalUrl)},clearCredentialAndUser:function(){this.user=this.credential=null},getSigninSettingsOfSelfInfo:function(){this.updateCredential();var a=new l,b=this.selfUrl+"/signinSettings";this.isValidCredential()?
a=m({url:b,handleAs:"json",content:{f:"json",token:this.credential.token},callbackParamName:"callback"}):a.resolve({});return a},getUser:function(){this.updateCredential();var a=new l;this.user&&"jimu.PortalUser"===this.user.declaredClass?setTimeout(e.hitch(this,function(){this.user.updateCredential();a.resolve(this.user)}),0):this.isValidCredential()?this.credential.userId?this._getUser(this.credential.userId).then(e.hitch(this,function(b){this.user=b;a.resolve(this.user)}),e.hitch(this,function(b){console.error(b);
a.reject(b)})):q.getUserIdByToken(this.credential.token,this.portalUrl).then(e.hitch(this,function(b){this.credential.userId=b;this._getUser(this.credential.userId).then(e.hitch(this,function(c){this.user=c;a.resolve(this.user)}),e.hitch(this,function(c){console.error(c);a.reject(c)}))}),e.hitch(this,function(b){console.error(b);a.reject(b)})):setTimeout(e.hitch(this,function(){a.reject("credential is null.")}),0);return a},queryItems:function(a){this.updateCredential();var b=new l,c=h.getBaseSearchUrl(this.portalUrl),
d={f:"json"};a&&(d=e.mixin(d,a));this.isValidCredential()&&(d.token=this.credential.token);d.sortField||d.sortOrder||(d.sortField="title",d.sortOrder="asc");m({url:c,handleAs:"json",content:d,callbackParamName:"callback"}).then(e.hitch(this,function(f){f.results=r.map(f.results,e.hitch(this,function(g){g.portalUrl=this.portalUrl;g.credential=this.credential;g.portal=this;return new w(g)}));b.resolve(f)}),e.hitch(this,function(f){console.error(f);b.reject(f)}));return b},getItemData:function(a){this.updateCredential();
a={url:h.getItemDataUrl(this.portalUrl,a),handleAs:"json",content:{f:"json"},callbackParamName:"callback"};return m(a)},_getItemById:function(a,b){a={url:h.getItemUrl(this.portalUrl,a),handleAs:"json",content:{f:"json"},callbackParamName:"callback"};b&&(a.content.token=b);return m(a).then(e.hitch(this,function(c){c.portalUrl=this.portalUrl;c.credential=this.credential;c.portal=this;return new w(c)}))},getItemById:function(a,b){this.updateCredential();return this._getItemById(a).then(e.hitch(this,
function(c){return b&&c.owner&&this.isValidCredential()&&this.credential&&this.credential.userId===c.owner?this._getItemById(a,this.credential.token):c}))},getAppById:function(a){var b=new l;this.updateCredential();this.isValidCredential()?(a=h.getAppIdUrl(this.portalUrl,a),b=m({url:a,handleAs:"json",content:{f:"json",token:this.credential.token}})):setTimeout(e.hitch(this,function(){b.reject("token is null.")}),0);return b},queryGroups:function(a){this.updateCredential();var b=new l,c=h.getBaseGroupUrl(this.portalUrl),
d={f:"json"};a&&(d=e.mixin(d,a));this.isValidCredential()&&(d.token=this.credential.token);m({url:c,handleAs:"json",content:d,callbackParamName:"callback"}).then(e.hitch(this,function(f){f.results=r.map(f.results,e.hitch(this,function(g){g.portalUrl=this.portalUrl;g.credential=this.credential;g.portal=this;return new x(g)}));b.resolve(f)}),e.hitch(this,function(f){console.error(f);b.reject(f)}));return b},registerApp:function(a,b,c){var d=new l;this.updateCredential();if(this.isValidCredential()){var f=
this.credential&&this.credential.token,g=h.getOAuth2Url(this.portalUrl);d=m({url:g+"/registerApp",content:{itemId:a,appType:b,redirect_uris:y.stringify(c),token:f,f:"json"},handleAs:"json"},{usePost:!0})}else setTimeout(e.hitch(this,function(){d.reject("token is null.")}),0);return d},createAndRegisterApp:function(a){var b=new l;this.updateCredential();this.isValidCredential()?this.getUser().then(e.hitch(this,function(c){c.addItem({title:"ArcGIS Web AppBuilder",type:"Web Mapping Application",text:"",
snippet:"",tags:"Registered App for OAuth"},"").then(e.hitch(this,function(d){d.success?this.registerApp(d.id,"browser",a).then(e.hitch(this,function(f){b.resolve(f)}),e.hitch(this,function(f){console.error(f);b.reject(f)})):b.reject("create app failed")}),e.hitch(this,function(d){console.error(d);b.reject(d)}))}),e.hitch(this,function(c){console.error(c);b.reject(c)})):setTimeout(e.hitch(this,function(){b.reject("token is null.")}),0);return b},_getUser:function(a){this.updateCredential();var b=
new l;a={url:h.getUserUrl(this.portalUrl,a),content:{f:"json"},handleAs:"json",callbackParamName:"callback"};this.isValidCredential()&&(a.content.token=this.credential&&this.credential.token);m(a).then(e.hitch(this,function(c){c.portalUrl=this.portalUrl;c.credential=this.credential;c.portal=this;this.user=new G(c);b.resolve(this.user)}),e.hitch(this,function(c){console.error(c);b.reject(c)}));return b},getHelpMap:function(){this.updateCredential();var a={url:h.getPortalHelpMapUrl(this.portalUrl),
handleAs:"json",content:{f:"json"},callbackParamName:"callback"};return m(a)}}),G=u([],{declaredClass:"jimu.PortalUser",portalUrl:null,credential:null,portal:null,constructor:function(a){a&&e.mixin(this,a)},_checkCredential:function(){var a=q.isValidCredential(this.credential);a||(this.credential=null);return a},isValidCredential:function(){this.updateCredential();return this._checkCredential()},updateCredential:function(){this._checkCredential()||(this.portal.updateCredential(),this.credential=this.portal.credential)},
canCreateItem:function(){var a=new z({id:this.roleId?this.roleId:this.role,role:this.role});this.privileges&&a.setPrivileges(this.privileges);return a.canCreateItem()},canCreateNotebooks:function(){var a=new z({id:this.roleId?this.roleId:this.role,role:this.role});this.privileges&&a.setPrivileges(this.privileges);return a.canCreateNotebooks()},getGroups:function(){var a=[];this.groups&&(a=r.map(this.groups,e.hitch(this,function(b){b.portalUrl=this.portalUrl;b.credential=this.credential;b.portal=this.portal;
return new x(b)})));return a},getItemsByKeywords:function(a,b){return this.portal.queryItems({start:b||1,num:100,q:"owner:"+this.username+' AND typekeywords:"'+a+'"'})},getContent:function(){this.updateCredential();var a={url:h.getUserContentUrl(this.portalUrl,this.username),handleAs:"json",content:{f:"json"},callbackParamName:"callback"};this.isValidCredential&&(a.content.token=this.credential.token);return m(a)},getTags:function(){this.updateCredential();var a={url:h.getUserTagsUrl(this.portalUrl,
this.username),handleAs:"json",content:{f:"json"},callbackParamName:"callback"};this.isValidCredential()&&(a.content.token=this.credential.token);return m(a)},addItem:function(a,b){this.updateCredential();var c=new l;if(this.isValidCredential()){var d={f:"json",token:this.credential.token};a&&(d=e.mixin(d,a));m({url:h.getAddItemUrl(this.portalUrl,this.username,b),handleAs:"json",callbackParamName:"callback",content:d},{usePost:!0}).then(e.hitch(this,function(f){c.resolve(f)}),e.hitch(this,function(f){console.error(f);
c.reject(f)}))}else setTimeout(e.hitch(this,function(){c.reject("token is null.")}),0);return c},deleteItem:function(a){this.updateCredential();var b=new l;this.isValidCredential()?(a=h.getDeleteItemUrl(this.portalUrl,this.username,a),b=m({url:a,content:{token:this.credential.token,f:"json"},handleAs:"json"},{usePost:!0})):setTimeout(e.hitch(this,function(){b.reject("token is null.")}),0);return b},getItemById:function(a,b){this.updateCredential();var c=new l;a={url:h.getUserItemsUrl(this.portalUrl,
this.username,b)+"/"+a,handleAs:"json",content:{f:"json"},callbackParamName:"callback"};m(a).then(e.hitch(this,function(d){d.portalUrl=this.portalUrl;d.credential=this.credential;d.portal=this;d=new w(d);c.resolve(d)}),e.hitch(this,function(d){console.error(d);c.reject(d)}));return c},shareItem:function(a,b,c){this.updateCredential();var d=new l;this.isValidCredential()?(b={url:h.shareItemUrl(this.portalUrl,this.username,b,c),handleAs:"json",callbackParamName:"callback",content:{f:"json",token:this.credential.token}},
a&&(b.content=e.mixin(b.content,a)),m(b,{usePost:!0}).then(e.hitch(this,function(f){d.resolve(f)}),e.hitch(this,function(f){console.error(f);d.reject(f)}))):setTimeout(e.hitch(this,function(){d.reject("token is null.")}),0);return d},updateItem:function(a,b){this.updateCredential();var c=new l;this.isValidCredential()?this.portal.getItemById(a).then(e.hitch(this,function(d){var f={f:"json",token:this.credential.token};b&&(f=e.mixin(f,b));m({url:h.getUpdateItemUrl(this.portalUrl,d.owner,a,d.ownerFolder),
handleAs:"json",callbackParamName:"callback",timeout:1E5,content:f},{usePost:!0}).then(e.hitch(this,function(g){c.resolve(g)}),e.hitch(this,function(g){console.error(g);c.reject(g)}))}),e.hitch(this,function(d){console.error(d);c.reject(d)})):setTimeout(e.hitch(this,function(){c.reject("token is null.")}),0);return c},isAdminRole:function(){return"org_admin"===this.role||"account_admin"===this.role},isPublisherRole:function(){return"org_publisher"===this.role||"account_publisher"===this.role},isUserRole:function(){return"org_user"===
this.role||"account_user"===this.role},getRegisteredAppInfo:function(a,b){var c=new l;this.updateCredential();b=h.getUserItemsUrl(this.portalUrl,this.username,b);return c=m({url:b+"/"+a+"/registeredAppInfo",content:{token:this.credential.token,f:"json"},handleAs:"json"},{usePost:!0})},getRegisteredAppInfoWithXhr:function(a,b){var c=new l;this.updateCredential();b=h.getUserItemsUrl(this.portalUrl,this.username,b);return c=E(b+"/"+a+"/registeredAppInfo",{data:{token:this.credential.token,f:"json"},
method:"POST",handleAs:"json"})}}),x=u([],{declaredClass:"jimu.PortalGroup",portalUrl:null,credential:null,portal:null,constructor:function(a){a&&e.mixin(this,a)},_checkCredential:function(){var a=q.isValidCredential(this.credential);a||(this.credential=null);return a},isValidCredential:function(){this.updateCredential();return this._checkCredential()},updateCredential:function(){this._checkCredential()||(this.portal.updateCredential(),this.credential=this.portal.credential)},queryItems:function(a){a.q=
"group:"+this.id+" AND "+a.q;return this.portal.queryItems(a)}}),w=u([],{declaredClass:"jimu.PortalItem",itemUrl:null,detailsPageUrl:null,ownerPageUrl:null,portalUrl:null,credential:null,portal:null,token:null,constructor:function(a){a&&e.mixin(this,a);this.itemUrl=h.getItemUrl(this.portalUrl,this.id);!this.thumbnailUrl&&this.thumbnail&&this.itemUrl&&(this.thumbnailUrl=this.itemUrl+"/info/"+this.thumbnail);this.token=this.credential&&this.credential.token;this.thumbnailUrl&&this.token&&(this.thumbnailUrl+=
"?token\x3d"+this.token);this.portalUrl&&this.id&&(this.detailsPageUrl=h.getItemDetailsPageUrl(this.portalUrl,this.id));this.portalUrl&&this.owner&&(this.ownerPageUrl=h.getUserProfilePageUrl(this.portalUrl,this.owner))},_checkCredential:function(){var a=q.isValidCredential(this.credential);a||(this.credential=null);return a},isValidCredential:function(){this.updateCredential();return this._checkCredential()},updateCredential:function(){this._checkCredential()||(this.portal.updateCredential(),this.credential=
this.portal.credential)},getItemData:function(){return this.portal.getItemData(this.id)},getItemGroups:function(){this.updateCredential();var a={url:h.getItemGroupsUrl(this.portalUrl,this.id),handleAs:"json",content:{f:"json"},callbackParamName:"callback"};this.isValidCredential()&&(a.content.token=this.credential.token);return m(a)}}),C={portals:[],webMapQueryStr:" "+A.getItemQueryStringByTypes(["Web Map"])+" ",webSceneQueryStr:" "+A.getItemQueryStringByTypes(["Web Scene"])+" ",_findPortal:function(a){for(var b=
0;b<this.portals.length;b++){var c=this.portals[b];if(h.isSamePortalUrl(a,c.portalUrl))return c.updateCredential(),c}return null},getPortal:function(a){if(!a||"string"!==typeof a||!e.trim(a))return null;a=h.getStandardPortalUrl(a);var b=this._findPortal(a);b||(b=new H(a),b.credential=q.getPortalCredential(b.portalUrl),b.updateCredential(),this.portals.push(b));return b},getPortalSelfInfo:function(a){return this.getPortal(a).loadSelfInfo()},getBasemapGalleryGroup:function(a){return this._getPortalSelfGroup(a,
"basemapGalleryGroupQuery")},getTemplatesGroup:function(a){return this._getPortalSelfGroup(a,"templatesGroupQuery")},getUnits:function(a){var b="english",c="",d=new l;this.getPortal(a).getUser().then(e.hitch(this,function(f){f&&f.units?b=f.units:(c=v.locale,b=c.startWith("en")?"english":"metric");d.resolve(b)}),e.hitch(this,function(f){console.warn(f);this.getPortalSelfInfo(a).then(e.hitch(this,function(g){var k=null;g&&g.units?k=g.units:(c=g&&g.culture||v.locale,k=c.startWith("en")?"english":"metric");
d.resolve(k)}),e.hitch(this,function(g){console.warn(g);c=v.locale;b=c.startWith("en")?"english":"metric";d.resolve(b)}))}));return d.promise},_getPortalSelfGroup:function(a,b){var c=new l,d=this.getPortal(a);d||setTimeout(e.hitch(this,function(){c.reject()}),0);this.getPortalSelfInfo(a).then(e.hitch(this,function(f){d.queryGroups({f:"json",q:f[b]}).then(e.hitch(this,function(g){0<g.results.length?(g=g.results[0],g.portalUrl=d.portalUrl,g.credential=d.credential,g.portal=d,g=new x(g),c.resolve(g)):
c.reject("Can't find portal self group.")}),e.hitch(this,function(g){console.error(g);c.reject(g)}))}),e.hitch(this,function(f){console.error(f);c.reject(f)}));return c},getWebMapsFromBasemapGalleryGroup:function(a){var b=new l;this.getBasemapGalleryGroup(a).then(e.hitch(this,function(c){c?c.queryItems({start:1,num:100,f:"json",q:this.webMapQueryStr}).then(e.hitch(this,function(d){b.resolve(d)}),e.hitch(this,function(d){console.error(d);b.reject(d)})):b.reject()}),e.hitch(this,function(c){console.error(c);
b.reject(c)}));return b},getDefaultWebScene:function(a){var b=h.getStandardPortalUrl(a);return this._searchWABDefaultWebScene(b).then(e.hitch(this,function(c){return c?c:this._createWABDefaultWebScene(b).then(e.hitch(this,function(d){return this.getPortal(b).getUser().then(e.hitch(this,function(f){var g=!1;f&&f.privileges&&0<f.privileges.length&&(g=r.some(f.privileges,function(k){return 0<=k.indexOf("shareToPublic")}));return g?f.shareItem({everyone:!0},d).then(e.hitch(this,function(){return d}),
e.hitch(this,function(){return d})):d}),e.hitch(this,function(f){console.error(f);return d}))}))}))},_searchWABDefaultWebScene:function(a){var b=new l;a=h.getStandardPortalUrl(a);a=this.getPortal(a);a.queryItems({q:'typekeywords:"WABDefaultWebScene" orgid:'+a.user.orgId+" access:public "+this.webSceneQueryStr}).then(e.hitch(this,function(c){c&&c.results&&0<c.results.length?b.resolve(c.results[0].id):b.resolve(null)}),e.hitch(this,function(c){console.error("_searchWABDefaultWebScene error:",c);b.reject(c)}));
return b},_createWABDefaultWebScene:function(a){var b=new l;a=h.getStandardPortalUrl(a);this.getPortal(a).getUser().then(e.hitch(this,function(c){var d={title:"Default Web Scene",type:"Web Scene",typeKeywords:"WABDefaultWebScene",tags:"default",text:y.stringify({operationalLayers:[],baseMap:{baseMapLayers:[{id:"World_Hillshade_3805",opacity:1,title:"World Hillshade",url:"https://services.arcgisonline.com/arcgis/rest/services/Elevation/World_Hillshade/MapServer",visibility:!0,layerType:"ArcGISTiledMapServiceLayer"},
{id:"VectorTile_2333",opacity:1,title:"World Topographic Map",visibility:!0,layerType:"VectorTileLayer",styleUrl:"https://cdn.arcgis.com/sharing/rest/content/items/7dc6cea0b1764a1f9af2e679f642f0f5/resources/styles/root.json"}],id:"18fe78cd348-basemap-2",title:"Topographic",elevationLayers:[{id:"globalElevation",listMode:"hide",title:"Terrain3D",url:"https://elevation3d.arcgis.com/arcgis/rest/services/WorldElevation3D/Terrain3D/ImageServer",layerType:"ArcGISTiledElevationServiceLayer"}]},ground:{layers:[{id:"globalElevation",
listMode:"hide",title:"Terrain3D",url:"https://elevation3d.arcgis.com/arcgis/rest/services/WorldElevation3D/Terrain3D/ImageServer",layerType:"ArcGISTiledElevationServiceLayer"}],transparency:0,navigationConstraint:{type:"stayAbove"}},heightModelInfo:{heightModel:"gravity_related_height",heightUnit:"meter"},version:"1.34",authoringApp:"WebAppBuilder",authoringAppVersion:"2.31",initialState:{environment:{lighting:{type:"sun",datetime:1710502027E3,displayUTCOffset:1},atmosphereEnabled:!0,starsEnabled:!0,
weather:{type:"sunny",cloudCover:0}},viewpoint:{camera:{position:{spatialReference:{latestWkid:3857,wkid:102100},x:915287.4999996595,y:5857842.796108316,z:1.3930898139164943E7},heading:0,tilt:.15702528423945328}}},spatialReference:{latestWkid:3857,wkid:102100},viewingMode:"global"}),snippet:""};c.addItem(d,"").then(e.hitch(this,function(f){f.success?b.resolve(f.id):(console.error("Can't create default web scene:",f),b.reject())}))}),e.hitch(this,function(c){console.error("Can't create default web scene");
b.reject(c)}));return b},getDefaultWebMap:function(a){var b=new l;this.getPortalSelfInfo(a).then(e.hitch(this,function(c){var d=c.defaultBasemap&&c.defaultBasemap.id;d?b.resolve(d):this._getDefaultWebMapByBasemapGallery(a,c).then(e.hitch(this,function(f){f?b.resolve(f):this._getMostNumViewsWebMap(a).then(e.hitch(this,function(g){g?b.resolve(g):b.reject()}),e.hitch(this,function(g){console.error(g);b.reject(g)}))}),e.hitch(this,function(f){console.error(f);b.reject(f)}))}),e.hitch(this,function(c){console.error(c);
b.reject(c)}));return b},_getDefaultWebMapByBasemapGallery:function(a,b){var c=new l,d=this.getPortal(a),f=b.defaultBasemap&&b.defaultBasemap.title;d.queryGroups({f:"json",q:b.basemapGalleryGroupQuery}).then(e.hitch(this,function(g){g=g.results;0<g.length?d.queryItems({start:1,num:1,f:"json",q:this.webMapQueryStr+" AND group:"+g[0].id+" AND title:"+f}).then(e.hitch(this,function(k){k=k.results;k=r.filter(k,e.hitch(this,function(n){return n.type&&"web map"===n.type.toLowerCase()}));0<k.length?c.resolve(k[0].id):
(console.log("Can't find web map under basemapGalleryGroupQuery."),d.queryItems({start:1,num:1,f:"json",q:this.webMapQueryStr+" AND title:"+f}).then(e.hitch(this,function(n){n=n.results;n=r.filter(n,e.hitch(this,function(p){return p.type&&"web map"===p.type.toLowerCase()}));if(0<n.length){var t=n[0];d.getItemData(t.id).then(e.hitch(this,function(p){p&&(p.operationalLayers||p.baseMap||p.version)?c.resolve(t.id):c.resolve(null)}),e.hitch(this,function(){c.resolve(null)}))}else console.log("Can't find web map by defaultBasemap.title."),
c.resolve(null)}),e.hitch(this,function(n){console.error(n);c.reject(n)})))}),e.hitch(this,function(k){console.error(k);c.reject(k)})):(console.log("Can't find group by basemapGalleryGroupQuery."),c.resolve(null))}),e.hitch(this,function(g){console.error(g);c.reject(g)}));return c},_getMostNumViewsWebMap:function(a){var b=new l;this.getPortal(a).queryItems({start:1,num:1,f:"json",q:this.webMapQueryStr+" AND access:public AND owner:esri_en",sortField:"numViews",sortOrder:"desc"}).then(e.hitch(this,
function(c){c=c.results;c=r.filter(c,e.hitch(this,function(d){return d.type&&"web map"===d.type.toLowerCase()}));0<c.length?b.resolve(c[0].id):b.reject("Can't find most-num-views web map.")}),e.hitch(this,function(c){console.error(c);b.reject(c)}));return b},comparePortalVersion:function(a,b){var c=a.split(".");a=parseInt(c[0],10);c=1<c.length?parseInt(c[1],10):0;var d=b.split(".");b=parseInt(d[0],10);d=1<d.length?parseInt(d[1],10):0;return a>b?1:a<b?-1:c>d?1:c<d?-1:0},getItemResources:function(a,
b,c){c||(c=100);a=h.getStandardPortalUrl(a);a=h.getItemResourceUrl(a,b);return m({url:a,content:{f:"json",num:c}}).then(function(d){if(d&&d.resources)return d.resources})},addResource:function(a,b,c,d,f){a=h.getStandardPortalUrl(a);var g=this.getPortal(a),k=new FormData;k.append("file",c,d);k.append("fileName",d);k.append("f","json");var n="";f?(k.append("resourcesPrefix",f),n=f+"/"+d):n=d;return g.getItemById(b,!0).then(function(t){t=h.getUserContentItemUrl(a,t.owner,b);return m({url:t+"/addResources",
form:k}).then(function(p){var B="";p&&p.success&&(B=h.getItemResourceUrl(a,"${itemId}",n));return B},function(p){console.error(p.message||p);return p})})},removeResources:function(a,b,c,d){var f={resource:d?d+"/"+c:c,f:"json"};a=h.getStandardPortalUrl(a);return this.getPortal(a).getItemById(b,!0).then(function(g){g=h.getUserContentItemUrl(a,g.owner,b);return m({url:g+"/removeResources",content:f},{usePost:!0}).then(function(k){return k},function(k){console.error(k.message||k);return k})})}};D.subscribe("userSignOut",
function(a){(a=C._findPortal(a))&&a.clearCredentialAndUser()});return C});