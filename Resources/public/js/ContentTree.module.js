!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("react"),require("prop-types")):"function"==typeof define&&define.amd?define(["react","prop-types"],t):"object"==typeof exports?exports.ContentTree=t(require("react"),require("prop-types")):(e.eZ=e.eZ||{},e.eZ.modules=e.eZ.modules||{},e.eZ.modules.ContentTree=t(e.React,e.PropTypes))}("undefined"!=typeof self?self:this,function(e,t){return function(e){var t={};function i(s){if(t[s])return t[s].exports;var n=t[s]={i:s,l:!1,exports:{}};return e[s].call(n.exports,n,n.exports,i),n.l=!0,n.exports}return i.m=e,i.c=t,i.d=function(e,t,s){i.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:s})},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="",i(i.s=62)}({0:function(t,i){t.exports=e},1:function(e,i){e.exports=t},2:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=r(i(0)),n=r(i(1));function r(e){return e&&e.__esModule?e:{default:e}}const a=e=>{const t=e.customPath?e.customPath:`/bundles/ezplatformadminui/img/ez-icons.svg#${e.name}`;let i="ez-icon";return e.extraClasses&&(i=`${i} ${e.extraClasses}`),s.default.createElement("svg",{className:i},s.default.createElement("use",{xlinkHref:t}))};a.propTypes={extraClasses:n.default.string.isRequired,name:n.default.string,customPath:n.default.string},a.defaultProps={customPath:null,name:null},t.default=a},3:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.getBasicRequestInit=(({token:e,siteaccess:t})=>({headers:{"X-Siteaccess":t,"X-CSRF-Token":e},mode:"same-origin",credentials:"same-origin"}));const s=t.handleRequestError=(e=>{if(!e.ok)throw Error(e.statusText);return e});t.handleRequestResponse=(e=>s(e).json()),t.handleRequestResponseStatus=(e=>s(e).status)},4:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const s=t.NOTIFICATION_INFO_LABEL="info",n=t.NOTIFICATION_SUCCESS_LABEL="success",r=t.NOTIFICATION_WARNING_LABEL="warning",a=t.NOTIFICATION_ERROR_LABEL="danger",o=t.showNotification=(e=>{const t=new CustomEvent("ez-notify",{detail:e});document.body.dispatchEvent(t)});t.showInfoNotification=(e=>{o({message:e,label:s})}),t.showSuccessNotification=(e=>{o({message:e,label:n})}),t.showWarningNotification=(e=>{o({message:e,label:r})}),t.showErrorNotification=(e=>{const t=e instanceof Error?e.message:e;o({message:t,label:a})})},62:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=i(0),n=d(s),r=d(i(1)),a=d(i(63)),o=i(66);function d(e){return e&&e.__esModule?e:{default:e}}const l="ez-content-tree-subtrees";class u extends s.Component{constructor(e){super(e),this.setInitialItemsState=this.setInitialItemsState.bind(this),this.loadMoreSubitems=this.loadMoreSubitems.bind(this),this.updateSubtreeAfterItemToggle=this.updateSubtreeAfterItemToggle.bind(this),this.handleCollapseAllItems=this.handleCollapseAllItems.bind(this),this.limitSubitemsInSubtree=this.limitSubitemsInSubtree.bind(this);try{const t=this.readSubtree();this.items=e.preloadedLocations,this.subtree=t||this.generateInitialSubtree(),this.expandCurrentLocationInSubtree(),this.clipTooDeepSubtreeBranches(this.subtree[0],e.treeMaxDepth-1),this.subtree[0].children.forEach(this.limitSubitemsInSubtree),this.saveSubtree()}catch(e){this.items=[],this.subtree=this.generateInitialSubtree(),this.saveSubtree()}}componentDidMount(){if(this.items.length)return this.subtree=this.generateSubtree(this.items,!0),void this.saveSubtree();(0,o.loadSubtree)(this.props.restInfo,this.subtree,e=>{this.setInitialItemsState(e[0])})}setInitialItemsState(e){this.items=[e],this.subtree=this.generateSubtree(this.items,!0),this.saveSubtree(),this.forceUpdate()}loadMoreSubitems({parentLocationId:e,offset:t,limit:i,path:s},n){(0,o.loadLocationItems)(this.props.restInfo,e,this.updateLocationsStateAfterLoadingMoreItems.bind(this,s,n),i,t)}updateLocationsStateAfterLoadingMoreItems(e,t,i){const s=this.findItem(this.items,e.split(","));s&&(s.subitems=[...s.subitems,...i.subitems],this.updateSubtreeAfterLoadMoreItems(e),t(),this.forceUpdate())}updateSubtreeAfterLoadMoreItems(e){const t=this.findItem(this.items,e.split(","));this.updateItemInSubtree(this.subtree[0],t,e.split(",")),this.saveSubtree()}updateSubtreeAfterItemToggle(e,t){const i=this.findItem(this.items,e.split(","));t?this.addItemToSubtree(this.subtree[0],i,e.split(",")):this.removeItemFromSubtree(this.subtree[0],i,e.split(",")),this.saveSubtree()}addItemToSubtree(e,t,i){const s=this.findParentSubtree(e,i);if(!s)return;var n=this.props;const r=n.subitemsLoadLimit,a=n.subitemsLimit,o=Math.ceil(t.subitems.length/r)*r;s.children.push({"_media-type":"application/vnd.ez.api.ContentTreeLoadSubtreeRequestNode",locationId:t.locationId,limit:Math.min(a,o),offset:0,children:[]})}removeItemFromSubtree(e,t,i){const s=this.findParentSubtree(e,i);if(!s)return;const n=s.children.findIndex(e=>e.locationId===t.locationId);n>-1&&s.children.splice(n,1)}updateItemInSubtree(e,t,i){const s=this.findParentSubtree(e,i);if(!s)return;const n=s.children.findIndex(e=>e.locationId===t.locationId);n>-1&&(s.children[n].limit=t.subitems.length)}readSubtree(){var e=this.props;const t=e.rootLocationId,i=e.userId,s=localStorage.getItem(l),n=s?JSON.parse(s):null,r=n?n[i]:null,a=r?r[t]:null;return a?JSON.parse(a):null}saveSubtree(){var e=this.props;const t=e.rootLocationId,i=e.userId,s=localStorage.getItem(l),n=s?JSON.parse(s):{};n[i]||(n[i]={}),n[i][t]=JSON.stringify(this.subtree),localStorage.setItem(l,JSON.stringify(n))}findParentSubtree(e,t){if(!(t.length<2))return t.shift(),t.pop(),t.reduce((e,t)=>e.children.find(e=>e.locationId===parseInt(t,10)),e)}expandCurrentLocationInSubtree(){var e=this.props;const t=e.rootLocationId,i=e.currentLocationPath.split("/").filter(e=>!!e),s=i.findIndex(e=>parseInt(e,10)===t);if(-1===s)return;const n=i.slice(s-i.length+1),r=n.slice(0,n.length-1);this.expandPathInSubtree(this.subtree[0],r)}expandPathInSubtree(e,t){if(!t.length)return;const i=parseInt(t[0],10);let s=e.children.find(e=>e.locationId===i);s||(s={"_media-type":"application/vnd.ez.api.ContentTreeLoadSubtreeRequestNode",locationId:i,limit:this.props.subitemsLimit,offset:0,children:[]},e.children.push(s)),t.shift(),this.expandPathInSubtree(s,t)}clipTooDeepSubtreeBranches(e,t){t<=0?e.children=[]:e.children.forEach(e=>this.clipTooDeepSubtreeBranches(e,t-1))}limitSubitemsInSubtree(e){e.limit=Math.min(this.props.subitemsLimit,e.limit),e.children.forEach(this.limitSubitemsInSubtree)}generateInitialSubtree(){return[{"_media-type":"application/vnd.ez.api.ContentTreeLoadSubtreeRequestNode",locationId:this.props.rootLocationId,limit:this.props.subitemsLoadLimit,offset:0,children:[]}]}generateSubtree(e,t){const i=[];var s=this.props;const n=s.subitemsLoadLimit,r=s.subitemsLimit;for(const s of e){const e=s.subitems.length;if(!!e||t){const t=e?Math.ceil(e/n)*n:n;i.push({"_media-type":"application/vnd.ez.api.ContentTreeLoadSubtreeRequestNode",locationId:s.locationId,limit:Math.min(r,t),offset:0,children:this.generateSubtree(s.subitems,!1)})}}return i}findItem(e,t){const i=1===t.length,s=e.find(e=>e.locationId===parseInt(t[0],10));return s?i?s:s.hasOwnProperty("subitems")&&Array.isArray(s.subitems)?(t.shift(),this.findItem(s.subitems,t)):null:null}getCurrentLocationId(){const e=this.props.currentLocationPath.split("/").filter(e=>!!e).pop();return parseInt(e,10)}handleCollapseAllItems(){this.items=[],this.forceUpdate(),this.subtree=this.generateInitialSubtree(),this.saveSubtree(),(0,o.loadSubtree)(this.props.restInfo,this.subtree,e=>{this.setInitialItemsState(e[0])})}render(){var e=this.props;const t=e.subitemsLimit,i=e.subitemsLoadLimit,s=e.treeMaxDepth,r={items:this.items,currentLocationId:this.getCurrentLocationId(),subitemsLimit:t,subitemsLoadLimit:i,treeMaxDepth:s,loadMoreSubitems:this.loadMoreSubitems,afterItemToggle:this.updateSubtreeAfterItemToggle,onCollapseAllItems:this.handleCollapseAllItems};return n.default.createElement(a.default,r)}}t.default=u,eZ.addConfig("modules.ContentTree",u),u.propTypes={rootLocationId:r.default.number.isRequired,currentLocationPath:r.default.number.isRequired,userId:r.default.number.isRequired,preloadedLocations:r.default.arrayOf(r.default.object),subitemsLimit:r.default.number.isRequired,subitemsLoadLimit:r.default.number.isRequired,treeMaxDepth:r.default.number.isRequired,restInfo:r.default.shape({token:r.default.string.isRequired,siteaccess:r.default.string.isRequired}).isRequired},u.defaultProps={preloadedLocations:[],rootLocationId:window.eZ.adminUiConfig.contentTree.treeRootLocationId,subitemsLimit:window.eZ.adminUiConfig.contentTree.childrenLoadMaxLimit,subitemsLoadLimit:window.eZ.adminUiConfig.contentTree.loadMoreLimit,treeMaxDepth:window.eZ.adminUiConfig.contentTree.treeMaxDepth}},63:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=i(0),n=d(s),r=d(i(1)),a=d(i(64)),o=d(i(2));function d(e){return e&&e.__esModule?e:{default:e}}const l="ez-is-tree-resizing";class u extends s.Component{constructor(e){super(e),this.changeContainerWidth=this.changeContainerWidth.bind(this),this.addWidthChangeListener=this.addWidthChangeListener.bind(this),this.handleResizeEnd=this.handleResizeEnd.bind(this),this._refTreeContainer=n.default.createRef(),this.state={resizeStartPositionX:0,containerWidth:0,resizedContainerWidth:0,isResizing:!1}}componentWillUnmount(){this.clearDocumentResizingListeners()}changeContainerWidth({clientX:e}){const t=e;this.setState(e=>({resizedContainerWidth:e.containerWidth+(t-e.resizeStartPositionX)}))}addWidthChangeListener({nativeEvent:e}){const t=e.clientX,i=this._refTreeContainer.current.getBoundingClientRect().width;window.document.addEventListener("mousemove",this.changeContainerWidth,!1),window.document.addEventListener("mouseup",this.handleResizeEnd,!1),window.document.body.classList.add(l),this.setState(()=>({resizeStartPositionX:t,containerWidth:i,isResizing:!0}))}handleResizeEnd(){this.clearDocumentResizingListeners(),this.setState(e=>({resizeStartPositionX:0,containerWidth:e.resizedContainerWidth,isResizing:!1}))}clearDocumentResizingListeners(){window.document.removeEventListener("mousemove",this.changeContainerWidth),window.document.removeEventListener("mouseup",this.handleResizeEnd),window.document.body.classList.remove(l)}renderCollapseAllBtn(){const e=Translator.trans("collapse_all",{},"content_tree");return n.default.createElement("div",{tabIndex:-1,className:"m-tree__collapse-all-btn",onClick:this.props.onCollapseAllItems},e)}renderList(){const e=this.props.items;if(!e||!e.length)return;var t=this.props;const i=t.loadMoreSubitems,s=t.currentLocationId,r=t.subitemsLoadLimit,o={items:e,path:"",loadMoreSubitems:i,currentLocationId:s,subitemsLimit:t.subitemsLimit,subitemsLoadLimit:r,treeMaxDepth:t.treeMaxDepth,afterItemToggle:t.afterItemToggle,isRoot:!0};return n.default.createElement("div",{className:"m-tree__scrollable-wrapper"},n.default.createElement(a.default,o))}renderLoadingSpinner(){const e=this.props.items;if(!e||!e.length)return n.default.createElement("div",{className:"m-tree__loading-spinner"},n.default.createElement(o.default,{name:"spinner",extraClasses:"ez-icon--medium ez-spin"}))}render(){var e=this.state;const t=e.isResizing,i=e.containerWidth,s=e.resizedContainerWidth,r=t?s:i,a={className:"m-tree",ref:this._refTreeContainer};return r&&(a.style={width:`${r}px`}),n.default.createElement("div",a,this.renderList(),this.renderLoadingSpinner(),this.renderCollapseAllBtn(),n.default.createElement("div",{className:"m-tree__resize-handler",onMouseDown:this.addWidthChangeListener}))}}t.default=u,u.propTypes={items:r.default.array.isRequired,loadMoreSubitems:r.default.func.isRequired,currentLocationId:r.default.number.isRequired,subitemsLimit:r.default.number.isRequired,subitemsLoadLimit:r.default.number,treeMaxDepth:r.default.number.isRequired,afterItemToggle:r.default.func.isRequired,onCollapseAllItems:r.default.func.isRequired}},64:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var i=arguments[t];for(var s in i)Object.prototype.hasOwnProperty.call(i,s)&&(e[s]=i[s])}return e},n=o(i(0)),r=o(i(1)),a=o(i(65));function o(e){return e&&e.__esModule?e:{default:e}}const d=({items:e,loadMoreSubitems:t,currentLocationId:i,path:r,subitemsLoadLimit:o,subitemsLimit:l,treeMaxDepth:u,afterItemToggle:c,isRoot:m})=>{const h={loadMoreSubitems:t,subitemsLoadLimit:o,subitemsLimit:l,treeMaxDepth:u,afterItemToggle:c},p=s({},h,{currentLocationId:i}),f=h;return n.default.createElement("ul",{className:"c-list"},e.map(e=>{const t=r&&r.length,o=window.Routing.generate("_ezpublishLocation",{locationId:e.locationId}),l=`${t?r+",":""}${e.locationId}`,u=e.subitems;return n.default.createElement(a.default,s({},e,f,{key:e.locationId,selected:e.locationId===i,href:o,isRootItem:m,path:l}),u.length?n.default.createElement(d,s({path:l,items:u,isRoot:!1},p)):null)}))};d.propTypes={path:r.default.string.isRequired,items:r.default.array.isRequired,loadMoreSubitems:r.default.func.isRequired,currentLocationId:r.default.number.isRequired,subitemsLimit:r.default.number.isRequired,subitemsLoadLimit:r.default.number,treeMaxDepth:r.default.number.isRequired,afterItemToggle:r.default.func.isRequired,isRoot:r.default.bool.isRequired},d.defaultProps={isRoot:!1},t.default=d},65:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=i(0),n=o(s),r=o(i(1)),a=o(i(2));function o(e){return e&&e.__esModule?e:{default:e}}class d extends s.Component{constructor(e){super(e),this.toggleExpandedState=this.toggleExpandedState.bind(this),this.cancelLoadingState=this.cancelLoadingState.bind(this),this.loadMoreSubitems=this.loadMoreSubitems.bind(this),this.handleAfterExpandedStateChange=this.handleAfterExpandedStateChange.bind(this),this.state={isExpanded:!!e.subitems.length,isLoading:!1}}cancelLoadingState(){this.setState(()=>({isLoading:!1}))}toggleExpandedState(){var e=this.props;const t=e.path,i=e.treeMaxDepth;if(t.split(",").length-1>=i){const e=Translator.trans("expand_item.limit.message",{},"content_tree");window.eZ.helpers.notification.showWarningNotification(e)}else this.setState(e=>({isExpanded:!e.isExpanded}),()=>{var e=this.props;(0,e.afterItemToggle)(e.path,this.state.isExpanded),this.handleAfterExpandedStateChange()})}handleAfterExpandedStateChange(){this.state.isExpanded&&!this.props.subitems.length&&this.loadMoreSubitems()}loadMoreSubitems(){var e=this.props;const t=e.subitems,i=e.subitemsLimit,s=t.length>=i;if(this.state.isLoading||s)return;var n=this.props;const r=n.path,a=n.locationId,o=n.subitemsLoadLimit,d=n.loadMoreSubitems;this.setState(()=>({isLoading:!0}),()=>d({path:r,parentLocationId:a,offset:t.length,limit:o},this.cancelLoadingState))}checkCanLoadMore(){var e=this.props;const t=e.subitems,i=e.totalSubitemsCount;return t.length<i}renderIcon(){var e=this.props;const t=e.contentTypeIdentifier,i={extraClasses:`ez-icon--small ez-icon--${e.selected?"light":"dark"}`};return!this.state.isLoading||this.props.subitems.length?i.customPath=eZ.helpers.contentType.getContentTypeIconUrl(t)||eZ.helpers.contentType.getContentTypeIconUrl("file"):(i.name="spinner",i.extraClasses=`${i.extraClasses} ez-spin`),n.default.createElement("span",{className:"c-list-item__icon"},n.default.createElement(a.default,i))}renderLoadMoreBtn(){var e=this.props;const t=e.subitems,i=e.subitemsLimit,s=t.length>=i;if(!this.state.isExpanded||s||!this.checkCanLoadMore()||!t.length)return null;const r=this.state.isLoading,o=Translator.trans("show_more",{},"content_tree"),d=Translator.trans("loading_more",{},"content_tree"),l=r?d:o;let u=null;return r&&(u=n.default.createElement(a.default,{name:"spinner",extraClasses:"ez-spin ez-icon--small c-list-item__load-more-btn-spinner"})),n.default.createElement("button",{type:"button",className:"c-list-item__load-more-btn btn ez-btn",onClick:this.loadMoreSubitems},u," ",l)}renderSubitemsLimitReachedInfo(){var e=this.props;const t=e.subitems,i=e.subitemsLimit,s=t.length>=i;if(!this.state.isExpanded||!s)return null;const r=Translator.trans("show_more.limit_reached",{},"content_tree");return n.default.createElement("div",{className:"c-list-item__load-more-limit-info"},r)}renderItemLabel(){if(this.props.isRootItem)return null;var e=this.props;const t=e.totalSubitemsCount,i=e.href,s=e.name,r={className:"c-list-item__toggler",onClick:this.toggleExpandedState,hidden:!t,tabIndex:-1};return n.default.createElement("div",{className:"c-list-item__label"},n.default.createElement("span",r),n.default.createElement("a",{className:"c-list-item__link",href:i},this.renderIcon()," ",s))}render(){var e=this.props;const t=e.totalSubitemsCount,i=e.children,s=e.isInvisible,r=e.selected,a={className:"c-list-item"},o={className:"c-list-item__toggler",onClick:this.toggleExpandedState,hidden:!t,tabIndex:-1};return t&&(a.className=`${a.className} c-list-item--has-sub-items`),this.checkCanLoadMore()&&(a.className=`${a.className} c-list-item--can-load-more`),this.state.isExpanded&&(a.className=`${a.className} c-list-item--is-expanded`),s&&(a.className=`${a.className} c-list-item--is-hidden`),r&&(a.className=`${a.className} c-list-item--is-selected`,o.className=`${o.className} c-list-item__toggler--light`),this.props.isRootItem&&(a.className=`${a.className} c-list-item--is-root-item`),n.default.createElement("li",a,this.renderItemLabel(),i,this.renderLoadMoreBtn(),this.renderSubitemsLimitReachedInfo())}}d.propTypes={path:r.default.string.isRequired,href:r.default.string.isRequired,contentTypeIdentifier:r.default.string.isRequired,totalSubitemsCount:r.default.number.isRequired,subitems:r.default.array.isRequired,children:r.default.element,hidden:r.default.bool.isRequired,isContainer:r.default.bool.isRequired,selected:r.default.bool.isRequired,locationId:r.default.number.isRequired,name:r.default.string.isRequired,isInvisible:r.default.bool.isRequired,loadMoreSubitems:r.default.func.isRequired,subitemsLimit:r.default.number.isRequired,subitemsLoadLimit:r.default.number,treeMaxDepth:r.default.number.isRequired,afterItemToggle:r.default.func.isRequired,isRootItem:r.default.bool.isRequired},d.defaultProps={hidden:!1,isRootItem:!1},t.default=d},66:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.loadSubtree=t.loadLocationItems=void 0;var s=i(3),n=i(4);t.loadLocationItems=(({siteaccess:e},t,i,r=50,o=0)=>{const d=new Request(`/api/ezp/v2/location/tree/load-subitems/${t}/${r}/${o}`,{method:"GET",mode:"same-origin",credentials:"same-origin",headers:{Accept:"application/vnd.ez.api.ContentTreeNode+json","X-Siteaccess":e}});fetch(d).then(s.handleRequestResponse).then(e=>{const t=e.ContentTreeNode;return t.children=t.children.map(a),a(t)}).then(i).catch(n.showErrorNotification)}),t.loadSubtree=(({token:e,siteaccess:t},i,a)=>{const o=new Request("/api/ezp/v2/location/tree/load-subtree",{method:"POST",mode:"same-origin",credentials:"same-origin",body:JSON.stringify({LoadSubtreeRequest:{"_media-type":"application/vnd.ez.api.ContentTreeLoadSubtreeRequest",nodes:i}}),headers:{Accept:"application/vnd.ez.api.ContentTreeRoot+json","Content-Type":"application/vnd.ez.api.ContentTreeLoadSubtreeRequest+json","X-Siteaccess":t,"X-CSRF-Token":e}});fetch(o).then(s.handleRequestResponse).then(e=>{const t=e.ContentTreeRoot.ContentTreeNodeList;return r(t)}).then(a).catch(n.showErrorNotification)});const r=e=>e.map(e=>(a(e),e.subitems=r(e.subitems),e)),a=e=>(e.totalSubitemsCount=e.totalChildrenCount,e.subitems=e.children,delete e.totalChildrenCount,delete e.children,delete e.displayLimit,e)}}).default});
//# sourceMappingURL=ContentTree.module.js.map