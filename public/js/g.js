(function(module){(function(){var CHARS="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");Math.uuid=function(len,radix){var chars=CHARS,uuid=[],i;radix=radix||chars.length;if(len){for(i=0;i<len;i++)uuid[i]=chars[0|Math.random()*radix]}else{var r;uuid[8]=uuid[13]=uuid[18]=uuid[23]="-";uuid[14]="4";for(i=0;i<36;i++){if(!uuid[i]){r=0|Math.random()*16;uuid[i]=chars[i==19?r&3|8:r]}}}return uuid.join("")};Math.uuidFast=function(){var chars=CHARS,uuid=new Array(36),rnd=0,r;for(var i=0;i<36;i++){if(i==8||i==13||i==18||i==23){uuid[i]="-"}else if(i==14){uuid[i]="4"}else{if(rnd<=2)rnd=33554432+Math.random()*16777216|0;r=rnd&15;rnd=rnd>>4;uuid[i]=chars[i==19?r&3|8:r]}}return uuid.join("")};Math.uuidCompact=function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(c){var r=Math.random()*16|0,v=c=="x"?r:r&3|8;return v.toString(16)})}})();(function(){if(!this.require){var modules={},cache={},require=function(name,root){var path=expand(root,name),module=cache[path],fn;if(module){return module.exports}else if(fn=modules[path]||modules[path=expand(path,"./index")]){module={id:path,exports:{}};try{cache[path]=module;fn(module.exports,function(name){return require(name,dirname(path))},module);return module.exports}catch(err){delete cache[path];throw err}}else{throw"module '"+name+"' not found"}},expand=function(root,name){var results=[],parts,part;if(/^\.\.?(\/|$)/.test(name)){parts=[root,name].join("/").split("/")}else{parts=name.split("/")}for(var i=0,length=parts.length;i<length;i++){part=parts[i];if(part==".."){results.pop()}else if(part!="."&&part!=""){results.push(part)}}return results.join("/")},dirname=function(path){return path.split("/").slice(0,-1).join("/")};this.require=function(name){return require(name,"")};this.require.define=function(bundle){for(var key in bundle)modules[key]=bundle[key]}}return this.require.define}).call(this)({Enum:function(exports,require,module){(function(){var Enum;Enum=function(){function Enum(items,offset){var item,key,_i,_len;if(offset==null){offset=0}for(key=_i=0,_len=items.length;_i<_len;key=++_i){item=items[key];this[item]=key+offset}}return Enum}();module.exports=Enum}).call(this)},ErrorReporter:function(exports,require,module){(function(){var ErrorReporter,__bind=function(fn,me){return function(){return fn.apply(me,arguments)}},__indexOf=[].indexOf||function(item){for(var i=0,l=this.length;i<l;i++){if(i in this&&this[i]===item)return i}return-1};ErrorReporter=function(){function ErrorReporter(){this.toString=__bind(this.toString,this)}ErrorReporter._errors={"Unknown Error":["An unknown error has occurred"]};ErrorReporter._indices=[ErrorReporter._errors["Unknown Error"][0]];ErrorReporter._groups=["Unknown Error"];ErrorReporter.wrapCustomError=function(error){return"["+error.name+"] "+error.message};ErrorReporter.generate=function(errorCode,extra){if(extra==null){extra=null}return(new this).generate(errorCode,extra)};ErrorReporter.extended=function(){var error,errors,group,key,_i,_len,_ref;_ref=this.errors;for(group in _ref){errors=_ref[group];this._errors[group]=errors;this._groups.push(group);for(key=_i=0,_len=errors.length;_i<_len;key=++_i){error=errors[key];this._indices.push(this._errors[group][key])}}this.prototype._=this;delete this.errors;return this.include(ErrorReporter.prototype)};ErrorReporter.prototype.generate=function(errCode,extra){var errors,group,_ref,_ref1;this.errCode=errCode;if(extra==null){extra=null}if(!this._._indices[this.errCode]){this.name=this._._groups[0];this.message=this._._errors[this._._groups[0]][0]}else{this.message=this._._indices[this.errCode];if(extra){this.message+=" - Extra Data : "+extra}_ref=this._._errors;for(group in _ref){errors=_ref[group];if(!(_ref1=this.message,__indexOf.call(errors,_ref1)>=0)){continue}this.name=group;break}}return this};ErrorReporter.prototype.toString=function(){return"["+this.name+"] "+this.message+" |"+this.errCode+"|"};return ErrorReporter}();module.exports=ErrorReporter}).call(this)},"Modules/Mediator":function(exports,require,module){(function(){var Modules;Modules={Observer:require("Modules/Observer")};Modules.Mediator=function(){var extended,included,installTo,key,value,_ref;function Mediator(){}_ref=Modules.Observer;for(key in _ref){value=_ref[key];Mediator.prototype[key]=value}installTo=function(object){this.delegate("publish",object);return this.delegate("subscribe",object)};included=function(){this.prototype.queue={};return this.prototype._delegates={publish:true,subscribe:true}};extended=function(){this.queue={};return this._delegates={publish:true,subscribe:true}};return Mediator}();module.exports=Modules.Mediator.prototype}).call(this)},"Modules/ORM":function(exports,require,module){(function(){var Modules,V,__indexOf=[].indexOf||function(item){for(var i=0,l=this.length;i<l;i++){if(i in this&&this[i]===item)return i}return-1};Modules={};V=require("Variable");Modules.ORM=function(){function ORM(){}ORM.prototype._identifier="BasicORM";ORM.prototype._reccords={};ORM.prototype._symlinks={};ORM.prototype._head=0;ORM.prototype._props=[];ORM.prototype.get=function(which){if(typeof which==="object"){return this.getAdv(which)}return this._symlinks[which]||this._reccords[which]||null};ORM.prototype.getAdv=function(what){var check,key,rec,results,_ref,_ref1;results=[];check=function(rec){var final,k,mod,modfinal,recs,v,val,value,_i,_len;for(k in what){v=what[k];final=false;if(rec[k]==null){break}if(typeof v==="object"){for(mod in v){val=v[mod];modfinal=true;switch(mod){case"$gt":if(rec[k].get()<=val){modfinal=false;break}break;case"$gte":if(rec[k].get()<val){modfinal=false;break}break;case"$lt":if(rec[k].get()>=val){modfinal=false;break}break;case"$lte":if(rec[k].get()>val){modfinal=false;break}break;case"$contains":recs=rec[k].get();if(recs.constructor!==Array){modfinal=false;break}modfinal=false;for(_i=0,_len=recs.length;_i<_len;_i++){value=recs[_i];if(value===val){modfinal=true;break}}}if(modfinal===false){break}}if(modfinal===true){final=true}}else if(rec[k].get()===v){final=true}else{break}}if(final){return results.push(rec)}};_ref=this._reccords;for(key in _ref){rec=_ref[key];check(rec)}_ref1=this._symlinks;for(key in _ref1){rec=_ref1[key];check(rec)}if(results.length===0){return null}if(results.length===1){return results[0]}return results};ORM.prototype["delete"]=function(which){var _base,_base1,_ref,_ref1;if((_ref=(_base=this._reccords)[which])==null){_base[which]=null}return(_ref1=(_base1=this._symlinks)[which])!=null?_ref1:_base1[which]=null};ORM.prototype.create=function(id,args){var prop,uuid,_i,_len,_ref,_ref1,_ref2;if((_ref=this._reccords)==null){this._reccords={}}if(args==null){args={}}uuid=id||args._id||this._head;if((_ref1=args._id)==null){args._id=uuid}uuid=Math.uuidFast(uuid);args._uuid=uuid;args._fn=this;if(typeof this.preCreate==="function"){this.preCreate(args)}this._reccords[uuid]=new this(args);this._reccords[uuid]._constructor(args);if(typeof this.postCreate==="function"){this.postCreate(this._reccords[uuid],args)}if(id!=null&&id!==this._head){this._symlinks[id]=this._reccords[uuid]}if(uuid===this._head){this._head++}_ref2=this._props;for(_i=0,_len=_ref2.length;_i<_len;_i++){prop=_ref2[_i];this._reccords[uuid][prop]=V.spawn()}return this._reccords[uuid]};ORM.prototype.reuse=function(which,args){var rez;if(args==null){args={}}rez=this.get(which);if(rez!=null){return rez}return this.create(which,args)};ORM.prototype.addProp=function(prop){var key,rec,_ref,_ref1,_results;this._props.push(prop);_ref=this._reccords;_results=[];for(key in _ref){rec=_ref[key];_results.push((_ref1=rec[prop])!=null?_ref1:rec[prop]=V.spawn())}return _results};ORM.prototype.removeProp=function(prop){var k,key,p,rec,_i,_len,_ref,_ref1,_ref2;_ref=this._reccords;for(key in _ref){rec=_ref[key];if((_ref1=rec[prop])==null){rec[prop]=null}}_ref2=this._props;for(k=_i=0,_len=_ref2.length;_i<_len;k=++_i){p=_ref2[k];if(p===prop){return this._props.splice(k,1)}}};ORM.prototype.extended=function(){this._excludes=["_fn","_uuid","_id"];return this.include({_constructor:function(args){var k,key,v,value,valueSet,_results;valueSet={};this._uuid=args._uuid||null;this._id=args._id||null;this.fn=args._fn;for(key in args){value=args[key];if(__indexOf.call(this.fn._excludes,key)<0&&this.constructFilter(key,value)!==false){valueSet[key]=value}}if(this.init!=null){return this.init.call(this,valueSet)}_results=[];for(k in valueSet){v=valueSet[k];_results.push(this[k]=v)}return _results},constructFilter:function(key,value){return true},remove:function(){return this.parent.remove(this.id)}})};return ORM}();module.exports=Modules.ORM.prototype}).call(this)},"Modules/Observer":function(exports,require,module){(function(){var Modules,__slice=[].slice;Modules={};Modules.Observer=function(){function Observer(){}Observer.prototype.delegateEvent=function(event,handler,object){var c,_base,_ref;if(object==null){object=window}if(event.substr(0,2)==="on"){event=event.substr(2)}if((_ref=(_base=this.queue)[event])==null){_base[event]=[]}c=this.queue[event].length;this.queue[event].unshift(function(){return handler.apply(object,arguments)});return c};Observer.prototype.subscribe=function(event,handler){return this.delegateEvent(event,handler,this)};Observer.prototype.publish=function(){var args,event,handler,key,_ref;args=1<=arguments.length?__slice.call(arguments,0):[];event=args[0];args=args.splice(1);if(!event||this.queue[event]==null){return this}_ref=this.queue[event];for(key in _ref){handler=_ref[key];if(key!=="__head"){handler.apply(this,args)}}return this};Observer.prototype.unsubscribe=function(event,id){if(!this.queue[event]){return null}if(!this.queue[event][id]){return null}return this.queue[event].splice(id,1)};Observer.prototype.included=function(){return this.prototype.queue={}};Observer.prototype.extended=function(){return this.queue={}};return Observer}();module.exports=Modules.Observer.prototype}).call(this)},"Modules/Overload":function(exports,require,module){(function(){var CRITERIA,Include,Modules,_count,__slice=[].slice,__bind=function(fn,me){return function(){return fn.apply(me,arguments)}};Modules={};_count=function(object){var key,nr,value;nr=0;for(key in object){value=object[key];nr++}return nr};CRITERIA={args:function(crit,args){return args.length===crit}};Include=function(){function Include(){}Include.prototype.overload=function(sets){var helper;helper=new Modules.Overload(sets,this);return this.proxy(function(){var args;args=1<=arguments.length?__slice.call(arguments,0):[];return helper.verifyAll.apply(helper,args)},this)};return Include}();Modules.Overload=function(){function Overload(sets,parent){var aux,i,j,name,set,_i,_j,_ref,_ref1,_ref2;this.parent=parent;this.verify=__bind(this.verify,this);this.verifyAll=__bind(this.verifyAll,this);this.names=[];this.verifies=[];this.handles=[];for(name in sets){set=sets[name];this.names.push(name);this.verifies.push(set["if"]||null);this.handles.push(set.then||null)}for(i=_i=0,_ref=this.verifies.length-1;0<=_ref?_i<=_ref:_i>=_ref;i=0<=_ref?++_i:--_i){for(j=_j=_ref1=i+1,_ref2=this.verifies.length;_ref1<=_ref2?_j<=_ref2:_j>=_ref2;j=_ref1<=_ref2?++_j:--_j){if(_count(this.verifies[i])<_count(this.verifies[j])){aux=this.verifies[i];this.verifies[i]=this.verifies[j];this.verifies[j]=aux;aux=this.names[i];this.names[i]=this.names[j];this.names[j]=aux;aux=this.handles[i];this.handles[i]=this.handles[j];this.handles[j]=aux}}}}Overload.prototype.verifyAll=function(){var args,how,key,set,what,_i,_len,_ref;args=1<=arguments.length?__slice.call(arguments,0):[];this.args=args;_ref=this.verifies;for(key=_i=0,_len=_ref.length;_i<_len;key=++_i){set=_ref[key];if(set!=null){for(what in set){how=set[what];if(!this.verify(what,how)){break}return this.handles[key].apply(this.parent,this.args)}}}return(this.handles["default"]||this.handles[key-1]).apply(this.parent,this.args)};Overload.prototype.verify=function(what,how){if(CRITERIA[what]){return CRITERIA[what](how,this.args)}else{what=parseInt(what.replace("arg",""))-1;if(this.args[what]!=null){return how.apply(this.parent,this.args)}return false}};return Overload}();module.exports=Include.prototype}).call(this)},"Modules/StateMachine":function(exports,require,module){(function(){var Modules,__bind=function(fn,me){return function(){return fn.apply(me,arguments)}};Modules={};Modules.StateMachine=function(){function StateMachine(){this.delegateContext=__bind(this.delegateContext,this)}StateMachine.prototype.extended=function(){this._contexts=[];return this._activeContext=null};StateMachine.prototype.included=function(){this.prototype._contexts=[];return this.prototype._activeContext=null};StateMachine.prototype.delegateContext=function(context){var l;if(this._find(context)){return null}l=this._contexts.length;this._contexts[l]=context;if(context.activate==null){context.activate=function(){}}if(context.deactivate==null){context.deactivate=function(){}}return this};StateMachine.prototype.getActiveContextID=function(){return this._activeContext};StateMachine.prototype.getActiveContext=function(){return this._activeContext};StateMachine.prototype.getContext=function(context){return this._contexts[context]||null};StateMachine.prototype._find=function(con){var key,value,_i,_len,_ref;_ref=this._contexts;for(value=_i=0,_len=_ref.length;_i<_len;value=++_i){key=_ref[value];if(con===key){return value}}return null};StateMachine.prototype.activateContext=function(context){var con;con=this._find(context);if(con==null){return null}if(this._activeContext===con){return true}this._activeContext=con;return context.activate()};StateMachine.prototype.deactivateContext=function(context){if(this._find(context)==null){return null}this._activeContext=null;return context.deactivate()};StateMachine.prototype.switchContext=function(context){var con;if(context==null){con=this._activeContext+1;if(con===this._contexts.length){con=0}}else{con=this._find(context);if(con==null){return null}}this.deactivateContext(this._contexts[this._activeContext]);this.activateContext(this._contexts[con]);return this._contexts[con]};return StateMachine}();module.exports=Modules.StateMachine.prototype}).call(this)},Object:function(exports,require,module){(function(){var $,Obiect,clone,_excludes,__indexOf=[].indexOf||function(item){for(var i=0,l=this.length;i<l;i++){if(i in this&&this[i]===item)return i}return-1},__slice=[].slice;_excludes=["included","extended"];clone=function(obj){var k,o,v;o=obj instanceof Array?[]:{};for(k in obj){v=obj[k];if(v!=null&&typeof v==="object"){o[k]=clone(v)}else{o[k]=v}}return o};$=function(what){return $[what]||null};Obiect=function(){var extended,included;function Obiect(){}Obiect.clone=function(obj){if(obj==null){obj=this}debugger;return Obiect.proxy(Obiect.include,Obiect.proxy(Obiect.extend,function(){})(obj))(obj.prototype)};Obiect.extend=function(obj,into){var k,value,_ref,_ref1;if(into==null){into=this}obj=clone(obj);for(k in obj){value=obj[k];if(!(__indexOf.call(_excludes,k)>=0||obj._excludes!=null&&__indexOf.call(obj._excludes,k)>=0)){if(into[k]!=null){if((_ref=into["super"])==null){into["super"]={}}into["super"][k]=into[k]}into[k]=value}}if((_ref1=obj.extended)!=null){_ref1.call(into)}return this};Obiect.include=function(obj,into){var key,value,_ref;if(into==null){into=this}obj=clone(obj);for(key in obj){value=obj[key];into.prototype[key]=value}if((_ref=obj.included)!=null){_ref.call(into)}return this};Obiect.proxy=function(){var to,what,_this=this;what=arguments[0];to=arguments[1];if(typeof what==="function"){return function(){var args;args=1<=arguments.length?__slice.call(arguments,0):[];return what.apply(to,args)}}else{return this[what]}};Obiect.delegate=function(property,context){var _ref;if(((_ref=this._delegates)!=null?_ref[property]:void 0)!=null===false&&this._deleagates[property]!==false){trigger("Cannot delegate member "+property+" to "+context)}return context[property]=this.proxy(function(){return this[property](arguments)},this)};extended=function(){};included=function(){};Obiect.include({proxy:Obiect.proxy});return Obiect}();module.exports=Obiect}).call(this)},Promise:function(exports,require,module){(function(){var Promise,__slice=[].slice;Promise=function(){function Promise(promise){if(promise instanceof Promise){return promise}this.callbacks=[]}Promise.prototype.then=function(ok,err,progr){this.callbacks.push({ok:ok,error:err,progress:progr});return this};Promise.prototype.resolve=function(){var args,callback;args=1<=arguments.length?__slice.call(arguments,0):[];callback=this.callbacks.shift();if(callback&&callback.ok){callback.ok.apply(this,args)}return this};Promise.prototype.reject=function(){var args,callback;args=1<=arguments.length?__slice.call(arguments,0):[];callback=this.callbacks.shift();if(callback&&callback.error){callback.error.apply(this,args)}return this};Promise.prototype.progress=function(){var args,callback;args=1<=arguments.length?__slice.call(arguments,0):[];callback=this.callbacks[0];if(callback&&callback.progress){callback.progress.apply(this,args)}return this};return Promise}();module.exports=Promise}).call(this)},Variable:function(exports,require,module){(function(){var Variable,_ref,__hasProp={}.hasOwnProperty,__extends=function(child,parent){for(var key in parent){if(__hasProp.call(parent,key))child[key]=parent[key]}function ctor(){this.constructor=child}ctor.prototype=parent.prototype;child.prototype=new ctor;child.__super__=parent.prototype;return child};Variable=function(_super){__extends(Variable,_super);function Variable(){_ref=Variable.__super__.constructor.apply(this,arguments);return _ref}Variable.spawn=function(){var x;x=new this;x._value=null;return x};Variable.prototype.get=function(){return this._value};Variable.prototype.set=function(value){return this._value=value};Variable.prototype.add=function(reccord){if(this._value==null||this._value.constructor!==Array){this._value=[]}return this._value.push(reccord)};return Variable}(require("Object"));if(typeof module!=="undefined"&&module!==null){module.exports=Variable}}).call(this)},async:function(exports,require,module){(function(){var async={};var root,previous_async;root=this;if(root!=null){previous_async=root.async}async.noConflict=function(){root.async=previous_async;return async};function only_once(fn){var called=false;return function(){if(called)throw new Error("Callback was already called.");called=true;fn.apply(root,arguments)}}var _each=function(arr,iterator){if(arr.forEach){return arr.forEach(iterator)}for(var i=0;i<arr.length;i+=1){iterator(arr[i],i,arr)}};var _map=function(arr,iterator){if(arr.map){return arr.map(iterator)}var results=[];_each(arr,function(x,i,a){results.push(iterator(x,i,a))});return results};var _reduce=function(arr,iterator,memo){if(arr.reduce){return arr.reduce(iterator,memo)}_each(arr,function(x,i,a){memo=iterator(memo,x,i,a)});return memo};var _keys=function(obj){if(Object.keys){return Object.keys(obj)}var keys=[];for(var k in obj){if(obj.hasOwnProperty(k)){keys.push(k)}}return keys};if(typeof process==="undefined"||!process.nextTick){if(typeof setImmediate==="function"){async.nextTick=function(fn){setImmediate(fn)}}else{async.nextTick=function(fn){setTimeout(fn,0)}}}else{async.nextTick=process.nextTick}async.each=function(arr,iterator,callback){callback=callback||function(){};if(!arr.length){return callback()}var completed=0;_each(arr,function(x){iterator(x,only_once(function(err){if(err){callback(err);callback=function(){}}else{completed+=1;if(completed>=arr.length){callback(null)}}}))})};async.forEach=async.each;async.eachSeries=function(arr,iterator,callback){callback=callback||function(){};if(!arr.length){return callback()}var completed=0;var iterate=function(){var sync=true;iterator(arr[completed],function(err){if(err){callback(err);callback=function(){}}else{completed+=1;if(completed>=arr.length){callback(null)}else{if(sync){async.nextTick(iterate)}else{iterate()}}}});sync=false};iterate()};async.forEachSeries=async.eachSeries;async.eachLimit=function(arr,limit,iterator,callback){var fn=_eachLimit(limit);fn.apply(null,[arr,iterator,callback])};async.forEachLimit=async.eachLimit;var _eachLimit=function(limit){return function(arr,iterator,callback){callback=callback||function(){};if(!arr.length||limit<=0){return callback()}var completed=0;var started=0;var running=0;(function replenish(){if(completed>=arr.length){return callback()}while(running<limit&&started<arr.length){started+=1;running+=1;iterator(arr[started-1],function(err){if(err){callback(err);callback=function(){}}else{completed+=1;running-=1;if(completed>=arr.length){callback()}else{replenish()}}})}})()}};var doParallel=function(fn){return function(){var args=Array.prototype.slice.call(arguments);return fn.apply(null,[async.each].concat(args))}};var doParallelLimit=function(limit,fn){return function(){var args=Array.prototype.slice.call(arguments);return fn.apply(null,[_eachLimit(limit)].concat(args))}};var doSeries=function(fn){return function(){var args=Array.prototype.slice.call(arguments);return fn.apply(null,[async.eachSeries].concat(args))}};var _asyncMap=function(eachfn,arr,iterator,callback){var results=[];arr=_map(arr,function(x,i){return{index:i,value:x}});eachfn(arr,function(x,callback){iterator(x.value,function(err,v){results[x.index]=v;callback(err)})},function(err){callback(err,results)})};async.map=doParallel(_asyncMap);async.mapSeries=doSeries(_asyncMap);async.mapLimit=function(arr,limit,iterator,callback){return _mapLimit(limit)(arr,iterator,callback)};var _mapLimit=function(limit){return doParallelLimit(limit,_asyncMap)};async.reduce=function(arr,memo,iterator,callback){async.eachSeries(arr,function(x,callback){iterator(memo,x,function(err,v){memo=v;callback(err)})},function(err){callback(err,memo)})};async.inject=async.reduce;async.foldl=async.reduce;async.reduceRight=function(arr,memo,iterator,callback){var reversed=_map(arr,function(x){return x}).reverse();async.reduce(reversed,memo,iterator,callback)};async.foldr=async.reduceRight;var _filter=function(eachfn,arr,iterator,callback){var results=[];arr=_map(arr,function(x,i){return{index:i,value:x}});eachfn(arr,function(x,callback){iterator(x.value,function(v){if(v){results.push(x)}callback()})},function(err){callback(_map(results.sort(function(a,b){return a.index-b.index}),function(x){return x.value}))})};async.filter=doParallel(_filter);async.filterSeries=doSeries(_filter);async.select=async.filter;async.selectSeries=async.filterSeries;var _reject=function(eachfn,arr,iterator,callback){var results=[];arr=_map(arr,function(x,i){return{index:i,value:x}});eachfn(arr,function(x,callback){iterator(x.value,function(v){if(!v){results.push(x)}callback()})},function(err){callback(_map(results.sort(function(a,b){return a.index-b.index}),function(x){return x.value}))})};async.reject=doParallel(_reject);async.rejectSeries=doSeries(_reject);var _detect=function(eachfn,arr,iterator,main_callback){eachfn(arr,function(x,callback){iterator(x,function(result){if(result){main_callback(x);main_callback=function(){}}else{callback()}})},function(err){main_callback()})};async.detect=doParallel(_detect);async.detectSeries=doSeries(_detect);async.some=function(arr,iterator,main_callback){async.each(arr,function(x,callback){iterator(x,function(v){if(v){main_callback(true);main_callback=function(){}}callback()})},function(err){main_callback(false)})};async.any=async.some;async.every=function(arr,iterator,main_callback){async.each(arr,function(x,callback){iterator(x,function(v){if(!v){main_callback(false);main_callback=function(){}}callback()})},function(err){main_callback(true)})};async.all=async.every;async.sortBy=function(arr,iterator,callback){async.map(arr,function(x,callback){iterator(x,function(err,criteria){if(err){callback(err)}else{callback(null,{value:x,criteria:criteria})}})},function(err,results){if(err){return callback(err)}else{var fn=function(left,right){var a=left.criteria,b=right.criteria;return a<b?-1:a>b?1:0};callback(null,_map(results.sort(fn),function(x){return x.value}))}})};async.auto=function(tasks,callback){callback=callback||function(){};var keys=_keys(tasks);if(!keys.length){return callback(null)}var results={};var listeners=[];var addListener=function(fn){listeners.unshift(fn)};var removeListener=function(fn){for(var i=0;i<listeners.length;i+=1){if(listeners[i]===fn){listeners.splice(i,1);return}}};var taskComplete=function(){_each(listeners.slice(0),function(fn){fn()})};addListener(function(){if(_keys(results).length===keys.length){callback(null,results);callback=function(){}}});_each(keys,function(k){var task=tasks[k]instanceof Function?[tasks[k]]:tasks[k];var taskCallback=function(err){var args=Array.prototype.slice.call(arguments,1);if(args.length<=1){args=args[0]}if(err){var safeResults={};_each(_keys(results),function(rkey){safeResults[rkey]=results[rkey]});safeResults[k]=args;callback(err,safeResults);callback=function(){}}else{results[k]=args;async.nextTick(taskComplete)}};var requires=task.slice(0,Math.abs(task.length-1))||[];var ready=function(){return _reduce(requires,function(a,x){return a&&results.hasOwnProperty(x)},true)&&!results.hasOwnProperty(k)};if(ready()){task[task.length-1](taskCallback,results)}else{var listener=function(){if(ready()){removeListener(listener);task[task.length-1](taskCallback,results)}};addListener(listener)}})};async.waterfall=function(tasks,callback){callback=callback||function(){};if(!tasks.length){return callback()}var wrapIterator=function(iterator){return function(err){if(err){callback.apply(null,arguments);callback=function(){}}else{var args=Array.prototype.slice.call(arguments,1);var next=iterator.next();if(next){args.push(wrapIterator(next))}else{args.push(callback)}async.nextTick(function(){iterator.apply(null,args)})}}};wrapIterator(async.iterator(tasks))()};var _parallel=function(eachfn,tasks,callback){callback=callback||function(){};if(tasks.constructor===Array){eachfn.map(tasks,function(fn,callback){if(fn){fn(function(err){var args=Array.prototype.slice.call(arguments,1);if(args.length<=1){args=args[0]}callback.call(null,err,args)})}},callback)}else{var results={};eachfn.each(_keys(tasks),function(k,callback){tasks[k](function(err){var args=Array.prototype.slice.call(arguments,1);if(args.length<=1){args=args[0]}results[k]=args;callback(err)})},function(err){callback(err,results)})}};async.parallel=function(tasks,callback){_parallel({map:async.map,each:async.each},tasks,callback)};async.parallelLimit=function(tasks,limit,callback){_parallel({map:_mapLimit(limit),each:_eachLimit(limit)},tasks,callback)};async.series=function(tasks,callback){callback=callback||function(){};if(tasks.constructor===Array){async.mapSeries(tasks,function(fn,callback){if(fn){fn(function(err){var args=Array.prototype.slice.call(arguments,1);if(args.length<=1){args=args[0]}callback.call(null,err,args)})}},callback)}else{var results={};async.eachSeries(_keys(tasks),function(k,callback){tasks[k](function(err){var args=Array.prototype.slice.call(arguments,1);if(args.length<=1){args=args[0]}results[k]=args;callback(err)})},function(err){callback(err,results)})}};async.iterator=function(tasks){var makeCallback=function(index){var fn=function(){if(tasks.length){tasks[index].apply(null,arguments)}return fn.next()};fn.next=function(){return index<tasks.length-1?makeCallback(index+1):null};return fn};return makeCallback(0)};async.apply=function(fn){var args=Array.prototype.slice.call(arguments,1);return function(){return fn.apply(null,args.concat(Array.prototype.slice.call(arguments)))}};var _concat=function(eachfn,arr,fn,callback){var r=[];eachfn(arr,function(x,cb){fn(x,function(err,y){r=r.concat(y||[]);cb(err)})},function(err){callback(err,r)})};async.concat=doParallel(_concat);async.concatSeries=doSeries(_concat);async.whilst=function(test,iterator,callback){if(test()){var sync=true;iterator(function(err){if(err){return callback(err)}if(sync){async.nextTick(function(){async.whilst(test,iterator,callback)})}else{async.whilst(test,iterator,callback)}});sync=false}else{callback()}};async.doWhilst=function(iterator,test,callback){var sync=true;iterator(function(err){if(err){return callback(err)}if(test()){if(sync){async.nextTick(function(){async.doWhilst(iterator,test,callback)})}else{async.doWhilst(iterator,test,callback)}}else{callback()}});sync=false};async.until=function(test,iterator,callback){if(!test()){var sync=true;iterator(function(err){if(err){return callback(err)}if(sync){async.nextTick(function(){async.until(test,iterator,callback)})}else{async.until(test,iterator,callback)}});sync=false}else{callback()}};async.doUntil=function(iterator,test,callback){var sync=true;iterator(function(err){if(err){return callback(err)}if(!test()){if(sync){async.nextTick(function(){async.doUntil(iterator,test,callback)})}else{async.doUntil(iterator,test,callback)}}else{callback()}});sync=false};async.queue=function(worker,concurrency){if(concurrency===undefined){concurrency=1}function _insert(q,data,pos,callback){if(data.constructor!==Array){data=[data]}_each(data,function(task){var item={data:task,callback:typeof callback==="function"?callback:null};if(pos){q.tasks.unshift(item)}else{q.tasks.push(item)}if(q.saturated&&q.tasks.length===concurrency){q.saturated()}async.nextTick(q.process)})}var workers=0;var q={tasks:[],concurrency:concurrency,saturated:null,empty:null,drain:null,push:function(data,callback){_insert(q,data,false,callback)},unshift:function(data,callback){_insert(q,data,true,callback)},process:function(){if(workers<q.concurrency&&q.tasks.length){var task=q.tasks.shift();if(q.empty&&q.tasks.length===0){q.empty()}workers+=1;var sync=true;var next=function(){workers-=1;if(task.callback){task.callback.apply(task,arguments)}if(q.drain&&q.tasks.length+workers===0){q.drain()}q.process()};var cb=only_once(function(){var cbArgs=arguments;if(sync){async.nextTick(function(){next.apply(null,cbArgs)})}else{next.apply(null,arguments)}});worker(task.data,cb);sync=false}},length:function(){return q.tasks.length},running:function(){return workers}};return q};async.cargo=function(worker,payload){var working=false,tasks=[];var cargo={tasks:tasks,payload:payload,saturated:null,empty:null,drain:null,push:function(data,callback){if(data.constructor!==Array){data=[data]}_each(data,function(task){tasks.push({data:task,callback:typeof callback==="function"?callback:null});if(cargo.saturated&&tasks.length===payload){cargo.saturated()}});async.nextTick(cargo.process)},process:function process(){if(working)return;if(tasks.length===0){if(cargo.drain)cargo.drain();return}var ts=typeof payload==="number"?tasks.splice(0,payload):tasks.splice(0);var ds=_map(ts,function(task){return task.data});if(cargo.empty)cargo.empty();working=true;worker(ds,function(){working=false;var args=arguments;_each(ts,function(data){if(data.callback){data.callback.apply(null,args)}});process()})},length:function(){return tasks.length},running:function(){return working}};return cargo};var _console_fn=function(name){return function(fn){var args=Array.prototype.slice.call(arguments,1);fn.apply(null,args.concat([function(err){var args=Array.prototype.slice.call(arguments,1);if(typeof console!=="undefined"){if(err){if(console.error){console.error(err)}}else if(console[name]){_each(args,function(x){console[name](x)})}}}]))}};async.log=_console_fn("log");async.dir=_console_fn("dir");async.memoize=function(fn,hasher){var memo={};var queues={};hasher=hasher||function(x){return x};var memoized=function(){var args=Array.prototype.slice.call(arguments);var callback=args.pop();var key=hasher.apply(null,args);if(key in memo){callback.apply(null,memo[key])}else if(key in queues){queues[key].push(callback)}else{queues[key]=[callback];fn.apply(null,args.concat([function(){memo[key]=arguments;var q=queues[key];delete queues[key];for(var i=0,l=q.length;i<l;i++){q[i].apply(null,arguments)}}]))}};memoized.memo=memo;memoized.unmemoized=fn;return memoized};async.unmemoize=function(fn){return function(){return(fn.unmemoized||fn).apply(null,arguments)}};async.times=function(count,iterator,callback){var counter=[];
for(var i=0;i<count;i++){counter.push(i)}return async.map(counter,iterator,callback)};async.timesSeries=function(count,iterator,callback){var counter=[];for(var i=0;i<count;i++){counter.push(i)}return async.mapSeries(counter,iterator,callback)};async.compose=function(){var fns=Array.prototype.reverse.call(arguments);return function(){var that=this;var args=Array.prototype.slice.call(arguments);var callback=args.pop();async.reduce(fns,args,function(newargs,fn,cb){fn.apply(that,newargs.concat([function(){var err=arguments[0];var nextargs=Array.prototype.slice.call(arguments,1);cb(err,nextargs)}]))},function(err,results){callback.apply(that,[err].concat(results))})}};async.applyEach=function(fns){var go=function(){var that=this;var args=Array.prototype.slice.call(arguments);var callback=args.pop();return async.each(fns,function(fn,cb){fn.apply(that,args.concat([cb]))},callback)};if(arguments.length>1){var args=Array.prototype.slice.call(arguments,1);return go.apply(this,args)}else{return go}};if(typeof define!=="undefined"&&define.amd){define([],function(){return async})}else if(typeof module!=="undefined"&&module.exports){module.exports=async}else{root.async=async}})()}});var require=this.require;(function(){var IS;require("Object");require("async");IS={Variable:require("Variable"),Enum:require("Enum"),Promise:require("Promise"),ErrorReporter:require("ErrorReporter"),Object:require("Object"),Modules:{Overload:require("Modules/Overload"),Observer:require("Modules/Observer"),ORM:require("Modules/ORM"),Mediator:require("Modules/Mediator"),StateMachine:require("Modules/StateMachine")}};if(typeof window!=="undefined"&&window!==null){window.IS=IS}if(typeof module!=="undefined"&&module!==null){module.exports=IS}if(typeof root!=="undefined"&&root!==null){root.IS=IS}}).call(this)}).call({},typeof module=="undefined"?typeof window=="undefined"?root:window:module);
(function(/*! Stitch !*/) {
	if (!this.require) {
		var modules = {}, cache = {}, require = function(name, root) {
			var path = expand(root, name), module = cache[path], fn;
			if (module) {
				return module.exports;
			} else if (fn = modules[path] || modules[path = expand(path, './index')]) {
				module = {id: path, exports: {}};
				try {
					cache[path] = module;
					fn(module.exports, function(name) {
						return require(name, dirname(path));
					}, module);
					return module.exports;
				} catch (err) {
					delete cache[path];
					throw err;
				}
			} else {
				throw 'module \'' + name + '\' not found';
			}
		}, expand = function(root, name) {
			var results = [], parts, part;
			if (/^\.\.?(\/|$)/.test(name)) {
				parts = [root, name].join('/').split('/');
			} else {
				parts = name.split('/');
			}
			for (var i = 0, length = parts.length; i < length; i++) {
				part = parts[i];
				if (part == '..') {
					results.pop();
				} else if (part != '.' && part != '') {
					results.push(part);
				}
			}
			return results.join('/');
		}, dirname = function(path) {
			return path.split('/').slice(0, -1).join('/');
		};
		this.require = function(name) {
			return require(name, '');
		}
		this.require.define = function(bundle) {
			for (var key in bundle)
				modules[key] = bundle[key];
		};
	}
	return this.require.define;
}).call(this)({"Application": function(exports, require, module) {(function() {
  var Application,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  require("Object");

  Application = (function(_super) {
    __extends(Application, _super);

    function Application() {
      var el, els, root, routes, _activate, _altmenu, _i, _len, _menu, _resize, _scenarios,
        _this = this;

      root = window;
      root.echo = (require("Object")).echo;
      document.title = "GeneGenerator Project";
      (function() {
        var meta;

        meta = document.createElement("meta");
        meta.setAttribute("name", "viewport");
        meta.setAttribute("content", "width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1");
        return document.head.appendChild(meta);
      })();
      root.DepMan = new (require("helpers/DependenciesManager"));
      DepMan.lib("jquery");
      DepMan.lib("jquery.mousewheel");
      DepMan.stylesheet("font-awesome");
      DepMan.stylesheet("bootstrap");
      DepMan.stylesheet("bootstrap-responsive");
      DepMan.googleFont("Satisfy", [400]);
      DepMan.googleFont("Open Sans", [400, 300], ["latin", "latin-ext"]);
      _resize = function() {
        var html;

        html = document.querySelector("html");
        if (window.innerWidth <= 1024) {
          if (html.className.indexOf("smallscreen") === -1) {
            return html.className += " smallscreen";
          }
        } else {
          return html.className = html.className.replace(/\ ?smallscreen/, "");
        }
      };
      window.addEventListener("resize", _resize);
      _resize();
      root.LinkManager = new (DepMan.helper("LinkManager"));
      _activate = function(doc) {
        $("body").addClass("active");
        $("article").removeClass("active");
        return $("article#" + doc).addClass("active");
      };
      _scenarios = {
        root: function() {
          $("article").removeClass("active");
          return $("body").removeClass("active");
        },
        document: function(doc) {
          var article;

          if (doc[doc.length - 1] === "/") {
            doc = doc.substr(0, doc.length - 1);
          }
          doc = doc.replace(/\//g, "_");
          article = $("article#" + doc);
          if (article && article[0]) {
            return _activate(doc);
          } else {
            return _activate("404");
          }
        }
      };
      routes = {
        "/": function() {
          return _scenarios.root();
        },
        "/*": function(loc) {
          return _scenarios.document(loc[0]);
        },
        "/*/*": function(loc) {
          return _scenarios.document("" + loc[0] + "/" + loc1);
        }
      };
      LinkManager.setRoutes(routes);
      document.title = "Manastiri";
      _menu = {
        "muntenia": "Muntenia",
        "transilvania": "Transilvania",
        "banat": "Banat",
        "oltenia": "Oltenia",
        "crisana": "Crisana",
        "maramures": "Maramures",
        "bucovina": "Bucovina",
        "moldova": "Moldova",
        "dobrogea": "Dobrogea"
      };
      _altmenu = ["bucovina/sucevita", "bucovina/putna", "bucovina/voronet", "transilvania/dintrunlemn", "transilvania/oasa", "transilvania/sambatadesus", "oltenia/brancoveni", "oltenia/caluiu", "oltenia/clocociov", "muntenia/cernica", "muntenia/dealu", "muntenia/zamfira", "moldova/barnova", "moldova/secu", "moldova/sihastria", "maramures/barsana", "maramures/sapantaperi", "maramures/sfantatreime", "dobrogea/celicdere", "dobrogea/cocos", "dobrogea/halmyris", "crisana/bunavestire", "crisana/feredu", "crisana/gai", "banat/nera", "banat/piatrascrisa", "banat/teius"];
      $("body").html(DepMan.render("index", {
        title: document.title,
        menu: _menu,
        altmenu: _altmenu
      }));
      $("article").click(function(e) {
        if (e.target.tagName === "ARTICLE") {
          return LinkManager.link("/");
        }
      });
      LinkManager.linkAllAnchors();
      LinkManager.checkRoute();
      els = document.querySelectorAll("*");
      console.log(els);
      for (_i = 0, _len = els.length; _i < _len; _i++) {
        el = els[_i];
        el.addEventListener("click", function(e) {
          return console.log("Clicked", e);
        });
      }
    }

    return Application;

  })(BaseObject);

  module.exports = Application;

}).call(this);
}, "Object": function(exports, require, module) {(function() {
  var BObject, _baseObj, _ref,
    __slice = [].slice,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _baseObj = {
    echo: function() {
      var args, owner, _d;

      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      _d = new Date;
      owner = "<not supported>";
      if (this.__proto__ != null) {
        owner = this.__proto__.constructor.name;
      }
      args[0] = "[" + (_d.getHours()) + ":" + (_d.getMinutes()) + ":" + (_d.getSeconds()) + "][" + (this.name || owner) + "]	" + args[0];
      return this;
    }
  };

  BObject = (function(_super) {
    __extends(BObject, _super);

    function BObject() {
      _ref = BObject.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    BObject.extend(_baseObj);

    BObject.include(_baseObj);

    return BObject;

  })(IS.Object);

  module.exports = window.BaseObject = BObject;

}).call(this);
}, "docs/banat": function(exports, require, module) {module.exports = "<h1>Banat</h1>\n\n<p><br><br>        </p>\n\n<h4>\n    <ul>\n        <li><a href=\"/banat/nera\">Nera</a></li>\n        <br>\n        <li><a href=\"/banat/piatrascrisa\">Piatra Scrisa</a></li>\n        <br>\n        <li><a href=\"/banat/teius\">Teius</a></li>\n    </ul>\n</h4>"}, "docs/banat/nera": function(exports, require, module) {module.exports = "<h4 class=\"right\"><a href=\"/banat\">Inapoi</a></h4>\n\n<h1>Manastirea Nera</h1>\n\n<p>Date gererale:</p>\n\n<ul>\n<li>47 vietuitoare, viata de obste</li>\n<li>Hram: Sfanta Cuvioasa Paraschiva</li>\n<li>Acces: DN 57 Oravita spre SV10 km, DJ571 Ciuchici-Macoviste-Sasca Montana (17 km), apoi pe drum forestier 2 km</li>\n<li>Stareta: monahia Dimitria losif;</li>\n</ul>\n\n<p><figure class=\"center\"><img src=\"/images/neta.jpg\" alt=\"\"></figure></p>\n\n<h3>Depre manastirea Nera:</h3>\n\n<p>Manastirea Slatina Nera este amplasata intr-o zona de deal, la 20 km. de Oravita, pe malul raului Nera, in apropierea localitatii Sasea Montana. Initiativa construirii acestui asezamant monahal apartine domnului Dr. Chirila loan, fost director al Asociatiei Cristiana din Bucuresti, originar din Slatina Nera si sponsorul principal al lucrarilor care se executa, in ziua de 15 martie 1994, la sediul protopopiatului Oravita a avut loc o discutie intre reprezentantii Asociatiei Cristiana si parintele protopop loan Varan, in care s-a convenit ca parohia Slatina Nera sa cedeze o parte din sesia parohiala, adica locul pe care s-a construit actuala manastire. La propunerea domnului Dr. Chirila loan Sf. Sinod al Bisericii Ortodoxe Romane a aprobat prin decizia nr. 3866 din 19 iulie 1994 infiintarea acestei manastiri, pusa sub purtarea de grija a Prea Cuvioasei maicii Paraschiva.</p>\n\n<p>Piatra de temelie a bisericii manastiresti a fost asezata la 14 octombrie 1994 de catre episcopul Emilian Birdas al Caransebesului, in toamna anului 1994 au venit primele trei surori, stareta fiind numita rasofora Nicodima Moisa, care au inceput sa se ocupe de strangerea de fonduri financiare si materiale pentru constructia manastirii. </p>\n\n<p>In anul 1994 au inceput lucrarile de constructie a bisericii din lemn pe fundatie de beton, in prezent lucrarile fiind in stadiu de finisare. Stilul bisericii este moldovenesc, in plan triconic. Grinzile sunt imbinate in coada de! randunica. Spatiul bisericii est compartimentat in naos, pronaos si pridvor inchis. Naosul cu absidele foarte largi este mai spatios decat pronaosul, de car se delimiteaza prin pereti marginali din lemn, sustinuti de stalpi sculptati. Catapeteasma este din lemn sculptat, in anu 1995 a inceput constructia unu corp de cladire care cuprind* chiliile maicilor si atelierul di plante medicinale. La i, octombrie 1997, Prea Sfintia S. Dr. Laurentiu Streza binecuvantat biserica. </p>\n\n<p>Cu acei prilej i-a fost inmanat domnuli Dr. Pavel Chirila diploma d ctitor principal al asezamantuli monahal de la Slatina Neri in anul 2000 s-a construit u alt corp de cladire cai adaposteste trapeza bucataria, precum si o cladi anexa pentru gospodarie. ( sprijin material si financiar d partea Centrului Eparhial, pi contributia credinciosilor d parohiile protopopiatul Gravita, a unor uniti economice si social Inspectoratul Silvic Caras Severin, Conel Caras - Sever Directia de drumuri si pod Timisoara(Sectia Oravit Ociolul Silvic Sasea Monta Grupul de pompieri Oravi Primaria orasului Oravita, Primaria din Sasea Montana, Prefectura si Consiliul Judetean Caras - Severin, manastirea incepe sa ia contur pe zi ce trece. ; Cand s-a initiat constructia manastirii, domnul Dr. Chirila loan a avut in vedere faptul ca ostenitoarele acestui asezamant monahal ar putea veni in sprijinul credinciosilor din zona, si nu numai al acestora, prin cultivarea si valorificarea plantelor medicinale atat a celor cultivate cat si cele din flora spontana. </p>\n\n<p>De asemenea, este in curs de amenajare un cabinet stomatologic pentru credinciosii din zona, una din vietuitoare fiind licentiata in medicina, specializarea stomatologie. O alta ocupatie a vietuitoarelor este apicultura, in prezent manastirea avand peste 20 de familii de albine. Sunt in curs de amenajare un atelier de croitorie si altul de pictura.</p>\n\n<p>La cererea obstii monahale, cu aprobarea si binecuvantarea Prea Sfintitului Dr. Laurentiu Streza, Episcopul Caransebesului, manastirii Slatina Nera i-a fost daruit, in 5 octombrie 2001, prin bunavointa inalt Prea Sfintitului Parinte Mitropolit al Moldovei si Bucovinei, Dr. Daniel Ciubotea, un vesmant care a fost pus pe racla cu sfintele moaste ale Prea Cuvioasei Paraschiva, pentru a fi de folos tuturor celor care cu credinta se vor ruga la mijlocirea Sf. Paraschiva.</p>\n\n<p>Manastirea are viata de obste, in prezent fiind 25 vietuitoare indrumate de maica stareta Siluana Petre si parintele Evloghie Muntean, care tin aprinsa candela spiritualitatii noastre ortodoxe, alaturi de celelalte asezaminte monahale din Eparhia Caransebesului.\nSfintele slujbe, corul minunat al maicilor si ospitalitatea obstii monahale ofera oricarui credincios care calca pragul manastirii clipe de inaltare a sufletului catre Dumnezeu pentru a se incarca cu puterile dumnezeiesti ale Sfantului Duh.</p>"}, "docs/banat/piatrascrisa": function(exports, require, module) {module.exports = "<h4 class=\"right\"><a href=\"/banat\">Inapoi</a></h4>\n\n<h1>Manastirea Piatra Scrisa</h1>\n\n<p>Date generale:</p>\n\n<ul>\n<li>8 vietuitori, viata de obste</li>\n<li>Hram: Duminica Tuturor Sfintilor</li>\n<li>Acces: DN6/E70 Caransebes (spre Baile Herculane)-Armenis (25 km)</li>\n<li>Staret: protos. Paisie Sadici;</li>\n</ul>\n\n<p><figure class=\"center\"><img src=\"/images/piatrascrisa.jpg\" alt=\"\"></figure></p>\n\n<h3>Despre manastirea Piatra Scrisa</h3>\n\n<p>Manastirea Piatra Scrisa este o manastire ortodoxa din judetul Caras Severin, localizata in comuna Armenis. Hramul acestui sfant locas de rugaciune este \"Duminica Tuturor Sfintilor\", prima duminica dupa Rusalii. Smerita si mai putin cunoscuta, manastirea este infrumusetata cu o viata de obste. Calugarii ofera cazare pelerinilor, insa in limita locurilor existente; momentan doar opt paturi sunt disponibile.</p>\n\n<p>La o distanta de 25 de kilometri de Caransebes, spre Orsova, unde soseaua se intalneste cu apele Timisului, in stramtoarea peste care arcuieste podul de cale ferata, sta de veghe Schitul Piatra Scrisa, cu clopotnita si cladirea pentru vietuitori.</p>\n\n<h3>Manastirea Piatra Scrisa - traditiile locale</h3>\n\n<p>Schitul Piatra Scrisa, astazi manastire, a luat fiinta pe un loc randuit de Dumnezeu. Traditia locala leaga inceputurile acestei manastiri de gasirea unei icoane zugravite pe stanca. Icoana cu Sfanta Treime, putand fi vazuta si astazi pe stanca negricioasa, a fost gasita in timpul lucrarilor la calea ferata ce urma sa lege Caransebesul de Orsova.</p>\n\n<p>Prezenta icoanei pe peretele de stanca a dus la devierea iesirii tunelului feroviar cativa metri mai spre vest de icoana. Reactia credinciosilor a convins pe inginerul Mihlheisen, conducatorul lucrarilor, sa schimbe calculele, deviind iesirea tunelului spre Armenis, la cativa metri in spre apus de icoana.</p>\n\n<p>Este foarte semnificativa o relatare a primarului de atunci al Armenisului, Grigorie Dragomir: \"Noi si mai ales raposatul preot Ilie Sarbu i-am raspuns ca acea icoana si acel loc pentru noi si pentru toti trecatorii de lege romaneasca sant sfinte si ca nu trecem niciodata pe langa ele fara sa ne descoperim capul si a ne face sfanta cruce. Cine a fi zugravit sfanta icoana, din ce indemn si imprejurari si cand, nu avem cunostinta deplina. Genunchiul de oameni de astazi si parintii nostri s-au pomenit cu sfanta icoana la loc, unde este acum. Poporul nostru stie sa spuna predanii. Noi insa nu stim nimic mai ales, - de cum stie poporul. Dupa ce am spus acestea domnului ober-inginer Mihlheisen, a luat in considerare rugarea noastra, caci la croire a incovoiat tunelul asa, ca iese spre Armenis cu 4-5 metri spre apus de icoana, ceea ce se vede si azi.\"</p>\n\n<p>Cei care calatoresc cu trenul in spre Armenis usor pot observa ca in tunel calea ferata face o mica cotitura spre dreapta la iesire spre Armenis. Aceasta este ceea ce se stie, in general, despre modul cum a aparut icoana Sfintei Treimi in locul in care de atunci a fost numita Piatra Scrisa.</p>\n\n<p>Mai exista insa si alte traditii care nu ne spun ca icoana aceasta ar avea origine miraculoasa, nefiind zugravita de mana omeneasca, dar arata ca Dumnezeu intervine in viata omului, mai simtit in momente dificile, si ca adevaratul credincios trebuie sa-l multumeasca cand primeste ajutor.</p>\n\n<p>Astfel, se spune ca un conducator de oaste crestin, urmarit de otomani, a cazut cu cal cu tot de pe coama unui deal pana in raul Timis, scapand nevatamat. Drept multumire, el a dat porunca sa se zugraveasca pe stanga Sfanta Treime.</p>\n\n<p>O alta traditie spune ca, mergand niste calatori din Muntenia cu trasura pe drum, la un moment dat caii s-au speriat, au inceput sa alerge fara control, si tocmai cand oamenii se asteptau sa se prabuseasca in rau, trasura s-a intepenit intr-o stanca chiar in locul care mai tarziu s-a numit Piatra Scrisa, iar calatorii au scapat teferi, intru pomenirea intamplarii si preamarirea lui Dumnezeu, ei au pus sa se faca icoana.</p>\n\n<p>Se mai spune ca un negutator de vite a fost surprins tocmai in Duminica Tuturor Sfintilor de o furtuna puternica, iar un fulger a despicat stanca sub care se adapostise, dar prin minune dumnezeiasca el nu a patit nimic. Preotul din sat l-a sfatuit sa zugraveasca icoana Sfintei Treimi, caci Dumnezeirea intreaga l-a salvat din primejdie impreuna cu cetele tuturor sfintilor care se pomeneau in acea zi.</p>\n\n<p>Daca aceste traditii vorbesc despre recunostinta oamenilor pentru ca au scapat de o primejdie, iata ca alta varianta aminteste de necesitatea credinciosului de a aduce jertfa lui Dumnezeu chiar atunci cand i se intampla o tragedie.</p>\n\n<p>Se spune ca fiul mesterului care ridica biserica din Armenis a vrut neaparat sa puna el crucea pe varful turnului, desi tatal sau, la inceput, nu l-a lasat, in final, baiatul s-a urcat, dar a ametit, a cazut si a murit, intru iertarea pacatelor sale, mesterul a lasat sa se zugraveasca icoana de la Piatra Scrisa.</p>\n\n<p>Nu este exclusa nici parerea ca in veacurile trecute in aceasta mica pestera sa fi vietuit vre-un pustnic. Tot ce s-a amintit pana acum sunt traditii orale, care prin insasi varietatea lor, ele nu pot fi luate ca dovezi istorice. Ele vorbesc insa despre relatia activa pe care crestinul trebuie sa o aiba cu Dumnezeu, relatie care nu e bine sa se limiteze doar la ganduri sau cuvinte, ci sa treaca si la fapte.</p>\n\n<h3>Manastirea Piatra Scrisa - scurt istoric</h3>\n\n<p>Prima mentiune documentara sigura despre Piatra Scrisa apare pe o harta militara austriaca din anul 1788, in care pe acest loc este trecuta \"Stanca Sfintei Treimi”. Probabil ca icoana exista atunci, daca a dat denumire locului. Icoana a fost restaurata in anul 1822 de pictorul Moise Buru Scriitorul, din Caransebes.</p>\n\n<p>In anul 1929, Vasile Dragomir din Slatina Mica, impreuna cu sotia sa Ana au ridicat o capela in amintirea unicei lor fiice care a decedat. Dimensiunile ei in exterior sunt de 8 metri lungime si 4 inaltime, iar in interior de 3,5 metri lungime, 3 latime si 3,50 metri inaltime.</p>\n\n<p>In anul 1930, Episcopia Caransebesului a construit o casa cu etaj pentru personalul monahal si o clopotnita, si astfel a aparut o mica asezare monahala numita Schitul Piatra Scrisa.</p>\n\n<p>O data cu numirea ca staret a Prea Cuviosului Parinte Hristofor Bucur, licentiat al Facultatii de Mecanica din Sibiu si al Facultatii de Teologie din Sibiu, a inceput o perioada noua in istoria schitului. Datorita pozitionarii la marginea drumului european, fapt ce nu constituia confort duhovnicesc a facut ca la initiativa parintelui ieromonah Hristofor Bucur sa se amenajeze, pe dealul din vecinatatea schitului, un nou corp monahal si a unei biserici reprezentative pentru aceste locuri.</p>\n\n<p>Parintele, impreuna cu obstea, cu sprijinul material si financiar al unor oameni de buna-credinta, au dat o noua infatisare acestei asezari monahale. Au refacut capela, staretia, au ridicat un altar de vara, si in prezent se lucreaza la ridicarea unei noi biserici si a unui complex de cladiri care vor cuprinde staretia, chiliile calugarilor, biblioteca si un mic muzeu.</p>\n\n<p>Noua biserica a manastirii a fost tarnosita in anul 2008, de catre Preasfintitul Parinte Episcop Lucian al Caransebesului, la hramul asezamantului manastiresc.\nIn prezent obstea monahala, condusa de protosinghelul Paisie Sadici, intreprind eforturi de definitivare a ansamblului monahal aflat pe dealul de langa biserica care gazduieste de zeci de ani icoana \"nefacuta de maini omenesti” a Sfintei Treimi.</p>\n\n<h3>Manastirea Piatra Scrisa - localizare si cai de acces</h3>\n\n<ul>\n<li>Localitatea Armenis, judetul Caras-Severin.</li>\n<li>Acces rutier: Drum National 6 (Caransebes - Baile Herculane), la 25 de km de Caransebes.</li>\n<li>Acces feroviar: pe ruta Caransebes - Baile Herculane, cu coborare in statia Armenis.</li>\n</ul>"}, "docs/banat/teius": function(exports, require, module) {module.exports = "<h4 class=\"right\"><a href=\"/banat\">Inapoi</a></h4>\n\n<h1>Manastirea Teius</h1>\n\n<p>Date generale:</p>\n\n<ul>\n<li>4 vietuitori, viata de obste</li>\n<li>Hram: Adormirea Maicii Domnului</li>\n<li>Acces: Caransebes, prin parcul Teius, se traverseaza calea ferata in directia NE, 3 km</li>\n<li>Staret: protos. Justinian Tibil;</li>\n</ul>\n\n<p><figure class=\"center\"><img src=\"/images/teius.jpg\" alt=\"\"></figure></p>\n\n<h3>Despre manatirea Teius:</h3>\n\n<p>Fiecare loc in lume isi are taina si istoria lui pe care Bunul Dumnezeu o randuieste dupa puterea si intelepciunea sa. Despre existenta unui asezamant monahal in apropierea Caransebesului nu avem nici o marturie scrisa. Exista insa o traditie pastrata din generatie in generatie in legatura cu o cruce numita \"Crucea verde\" si un izvor de apa numit \"Izvorul calugarului\", ceea ce vrea sa spuna ca vreodata prin aceasta zona s-a nevoit vreun cuvios pustnic sau calugar.</p>\n\n<p>Faptul ca in cetatea Caransebesului inca din sec. XIV - XV-lea este atestata documentar existenta unui centru episcopal vine sa intareasca parerea ca trebuia sa existe si asezaminte monahale, nu mari ca cele din Moldova, deoarece istoria Banatului a fost vitrega in ceea ce priveste soarta Bisericii si a romanilor. Sa ne gandim la faptul ca in a doua jumatate a sec. XVIII, din porunca imparatesei Maria Tereza, au fost distruse numeroase asezaminte monahale din Transilvania si Banat. Numai asa ne putem explica faptul ca pana in vremurile noastre zona Banatului era foarte saraca in ceea ce priveste viata monahala.</p>\n\n<p>Istoria asezamantului monahal din Teiusul Caransebesului incepe o data cu aprobarea data de Consiliul Eparhial si Adunarea Eparhiala din toamna anului 1998, fiind numit egumen Prea Cuviosul Parinte justinian Tibil, absolvent al Facultatii de Teologie din Arad, originar din partile Maramuresului. Dorind sa construiasca o manastire parintele Justinian a luat legatura cu parintele Rusalin Simeria si fiul sau Petru, din Caransebes, care au donat un hectar de pamant pentru noul asezamant. La putin timp, familia Ioana si Mihai Tomescu au donat inca un hectar.</p>\n\n<p>In luna lui ianuarie 1999, parintele Justinian impreuna cu Prea Sfintitul Dr. Laurentiu Streza, Episcopul Caransebesului, au mers la fata locului pentru a vedea terenul si a stabili locul unde sa fie ridicat viitorul asezamant monahal. Locul era inconjurat de paduri de tei, si gandul -spune parintele Justinian - ne-a dus la vremea cand acestia erau infloriti. Numai ca indata si-au venit la realitate: terenul era pustiu, plin de spini si de buruieni uscate. Nu s-a descurajat, si la indemnul Prea Sfintitului Laurentiu, parintele Justinian s-a angajat trup si suflet la intruparea gandului sau, hotarandu-se ca noua asezare monahala sa fie pusa sub purtarea de grija a Maicii Domnului, decizandu-se ca hramul schitului sa fie pus sub ocrotirea Maicii Domnului, praznuirea hramului facandu-se la 15 august, cand sarbatorim Adormirea Maicii Domnului. Datorita lipsei depreoti in parohiile din zona Caransebesului, parintelui justinian i s-a incredintat suplinirea parohiei Borlova si Sadova Noua. Cu acest prilej, parintele a facut cunoscuta credinciosilor intentia sa de a construi o manastire.</p>\n\n<p>in luna iunie 1999 s-a mutat in Teius, unde a locuit intr-o camera oferita de familia Tomescu, la salasul lor. Fiind sprijinit de credinciosi parintele Justinian a demarat inceperea lucrarilor. Un sprijin important l-a avut din partea doamnei Elena Crisan din Arad, precum si de la fratele parintelui, Cornel Tibil. Asa s-a ridicat o mica bisericuta, construita din tabla ondulata, pentru savarsirea sfintelor slujbe. Prima Sf. Liturghie s-a oficiat in data de 17 iulie 1999, in prezenta a numerosi credinciosi din Caransebes, Borlova si alte localitati, inceputul a fost impreunat si cu unele greutati, uneori chiar cu deznadejde. Totusi, dragostea si speranta au biruit toate aceste greutati si deznadejdi. Cuvantul si sfatul Prea Sfintitului Laurentiu de a continua lucrul inceput au fost decisiv.</p>\n\n<p>Munca depusa si primele realizari au convins pe credinciosi ca sa-si deschida inima si mana. Multi au donat materiale de constructii, altii au donat bani. intre acestia amintim pe Petria Cornea, Mihaela Popescu, Eugenia Cocor, Mariana si Mircea Benea, Maria Beg, Cornelia si loan Vela, Daniel Urban, Niculina si Ilie Rosu, Elena si Petru Neagoe, Maria si Afilon Albu din Borlova,Calina si Cheorghe Simescu din Caransebes etc.</p>\n\n<p>Purtarea de grija a lui Dumnezeu si a Maicii Domnului nu a intarziat sa se arate, caci la 15 iulie a venit la manastire fratele Sorin Alboni, tinerel de numai 14 ani, dar inimos, cu convingere si dragoste, hotarat si gata sa puna umarul acolo unde este nevoie. La 15 august, Prea Sfintitul Parinte Dr. Laurentiu Streza, inconjurat de un sobor de peste 40 de preoti , a savarsit Sf. Liturghie, apoi s-a pus piatra de temelie pentru biserica manastirii. Prezenta credinciosilor a fost de neasteptat, aproape cateva mii. A fost un semn al Providentei Divine ca acest bun lucru se va putea realiza, dand si mai mult curaj parintelui si vietuitorilor in osteneala lor. Acest lucru s-a concretizat, in putin timp, in stivele de caramida, boltarii facuti cu mainile la fata locului, grinzile si lazile cu var. Cu fiecare zi ce trecea, biserica manastirii prindea contur. Concomitent cu lucrarile de la biserica a inceput si construirea corpului de chilii. La i decembrie 1999, asa-zisul corp administrativ al asezamantului a fost terminat. S-a facut o rugaciune de multumire, apoi fiecare a plecat la chilia sa. A fot prima seara in care parintele si cei din obste au dormit in casa lor.</p>\n\n<p>Zidurile bisericii manastirii se ridicau pe zi ce trecea, intr-o seara - marturiseste parintele Justinian - plina cu stele, odihnindu-se pe prispa si meditand Sorin Alboni, tinerel de numai 14 ani, dar inimos, cu convingere si dragoste, hotarat si gata sa puna umarul acolo unde este nevoie. La 15 august, Prea Sfintitul Parinte Dr. Laurentiu Streza, inconjurat de un sobor de peste 40 de preoti , a savarsit Sf. Liturghie, apoi s-a pus piatra de temelie pentru biserica manastirii. Prezenta credinciosilor a fost de neasteptat, aproape cateva mii. A fost un semn al Providentei Divine ca acest bun lucru se va putea realiza, dand si mai mult curaj parintelui si vietuitorilor in osteneala lor. Acest lucru s-a concretizat, in putin timp, in stivele de caramida, boltarii facuti cu mainile la fata locului, grinzile si lazile cu var. Cu fiecare zi ce trecea, biserica manastirii prindea contur. Concomitent cu lucrarile de la biserica a inceput si construirea corpului de chilii. La i decembrie 1999, asa-zisul corp administrativ al asezamantului a fost terminat. S-a facut o rugaciune de multumire, apoi fiecare a plecat la chilia sa. A fot prima seara in care parintele si cei din obste au dormit in casa lor</p>"}, "docs/bucovina": function(exports, require, module) {module.exports = "<h1>Bucovina</h1>\n\n<p><br><br>        </p>\n\n<h4>\n    <ul>\n        <li><a href=\"/bucovina/sucevita\">Sucevita</a></li>\n        <br>\n        <li><a href=\"/bucovina/putna\">Putna</a></li>\n        <br>\n        <li><a href=\"/bucovina/voronet\">Voronet</a></li>\n    </ul>\n</h4>"}, "docs/bucovina/putna": function(exports, require, module) {module.exports = "<h4 class=\"right\"><a href=\"/bucovina\">Inapoi</a></h4>\n\n<h1>Manastirea Putna</h1>\n\n<p>Date generale:</p>\n\n<ul>\n<li>98 de vietuitori, viata de obste</li>\n<li>Hram: Adormirea Maicii Domnului, Sfantul stefan cel Mare</li>\n<li>Acces: din Radauti pe DJ178c, spre nord, 24 km, stanga in Vicovul de Sus, pe DN2H12 km, pana in Putna</li>\n<li>Staret: arhim. Melchisedec Velnic</li>\n</ul>\n\n<p><figure class=\"center\"><img src=\"/images/putna.jpg\" alt=\"\"></figure></p>\n\n<h3>Despre manastirea Putna:</h3>\n\n<p>Manastirea Putna, asezata la 72 de kilometri de Cetatea de Scaun a Sucevei, este prima si cea mai importanta ctitorie a Binecredinciosului Voievod Stefan cel Mare si Sfant, si strajuieste, de peste cinci veacuri, tinutul legendar al Bucovinei.</p>\n\n<h3>Manastirea Putna - scurt istoric</h3>\n\n<p>Cronicarul Ion Neculce istoriseste astfel despre felul in care a fost ales locul pe care avea sa fie zidita Manastirea Putna: \"Stefan-Voda cel Bun, cand s-au apucat sa facaManastirea Putna, au tras cu arcul dintr-un varfu de munte ce este langa manastire. Si unde au agiunsu sageata, acolo au facut prestolul in oltariul\".</p>\n\n<p>Incepute la 10 iulie 1466, dupa cucerirea cetatii Chilia (1465), lucrarile de constructie a bisericii cu hramul \"Adormirea Maicii Domnului\", vor fi terminate in anul 1469, slujba de sfintire avand loc la 3 septembrie acelasi an. S-au construit apoi Casa Domneasca (1473), chiliile, zidul de aparare cu turnurile aferente si Turnul Tezaurului, lucrarile finalizandu-se in anul 1481.</p>\n\n<p>De-a lungul veacurilor Manastirea Putna a trecut prin numeroase incercari ca incendii, navaliri si ocupatii straine, cutremure, dar care n-au putut intrerupe desfasurarea vietii monahale si lauda neincetata adusa lui Dumnezeu.</p>\n\n<p>Dupa intrarea, din anul 1775, sub ocupatie habsburgica, manastirea va mai suferi o serie de transformari exterioare prin extinderea zonei de nord a incintei, noi constructii de chilii (1852-1856), modificari ale formei acoperisului bisericii (1859), lucrari mai ample asupra acesteia avand loc in 1902 sub conducerea arhitectului vienez K. A. Romstorfer.</p>\n\n<p>Manastirea Putna - cronologia evenimentelor mai importante\nLa data de 4 iulie 1466, Voievodul Stefan cel Mare si Sfant alege locul pe care va fi zidita Biserica Manastirii Putna, tragand cu arcul de pe Dealul Crucii. Sase zile mai tarziu, la 10 iulie 1466, conform Letopisetelor putnene, se incepe zidirea Bisericii Manastirii Putna, care va fi terminata in anul 1469.</p>\n\n<p>In data de 3 septembrie 1470 are loc sfintirea Manastirii Putna, ceremonie intarziata de campania contra tatarilor, terminata cu victoria de la Lipnic, pe Nistru. La data de 1 mai 1481 se finalizeaza lucrarile de zidire a cladirilor din incinta si a zidurilor de aparare.</p>\n\n<p>La 15 martie 1484, un incendiu a distrus chiliile si a afectat partial si biserica. In urma incendiului, Voievodul Stefan a poruncit restaurarea bisericii si pictarea ei, atat in interior, cat si in exterior.</p>\n\n<p>Sfantul Stefan cel Mare, care, la 1 mai 1488, a daruit Manastirii Putna craniul Sfantului Ierarh Ghenadie, adoarme in Domnul la data de 2 iulie 1504. \"Stefan Voievod, care a domnit in Tara Moldovei 47 de ani si trei luni a trecut la vesnicele locasuri in anul 7012 (1504), luna iulie, in ziua a doua, marti, la ceasul al patrulea din zi - ora 10.\" El va fi inmormantat in biserica Manastirii Putna.</p>\n\n<p>La 20 aprilie 1517 moare si Bogdan al III-lea, fiul Sfantului Voievod Stefan, fiind si el ingropat tot in Manastirea Putna. Dupa acesta, la 14 ianuarie 1527, moare si este inmormantat tot in biserica Stefanita Voda.</p>\n\n<p>In anul 1653 este distrusa biserica Manastirii Putna, inclusiv pictura interioara si exterioara. Din porunca domnitorului Vasile Lupu se va incepe refacerea bisericii in anul 1653. Lucrarile vor fi continuate de voievozii Gheorghe Stefan si Eustratie Dabija si terminate in anul 1662.</p>\n\n<p>Intre anii 1756-1760, prin grija mitropolotului Iacov Putneanul, la Manastirea Putna se executa importante lucrari de restaurare. Intre anii 1901-1902, arhitectul austriac K. A. Romstorfer restaureaza biserica Manastirii Putna.</p>\n\n<p>In anul 1904 are loc comemorarea a 400 de ani de la adormirea Sfantului Voievod Stefan cel Mare. Costin Petrescu picteaza portretul acestuia avand ca model portretul domnitorului din Tetraevanghelul de la Humor.</p>\n\n<p>La data de 15 mai 1918 Consiliul National Roman din Bucovina proclama reintegrarea Bucovinei in componenta Romaniei, iar in 1966, la recomandarea UNESCO, implinirea a 500 de ani de la intemeierea Manastirii Putna se celebreaza pe plan mondial.</p>\n\n<p>In data de 6 iunie 1976 se inaugureaza sediul actual al Muzeului Manastirii Putna.</p>\n\n<p>Intre anii 1980-1982 se intreprind noi campanii de cercetari arheologice pe latura de sud a incintei Manastirii Putna, menite sa dezvaluie complet vestigiile Casei Domnesti din epoca lui Stefan cel Mare. In anul 1982 incep lucrarile de refacere a Casei Domnesti de la Putna, la data de 15 august 1988 aceasta sfintindu-se.</p>\n\n<p>In sesiunea din 20-21 iunie 1992, Sfantul Sinod al B.O.R. hotaraste canonizarea lui Stefan cel Mare sub numele \"Binecredinciosul Voievod Stefan cel Mare si Sfant\", cu data de pomenire 2 iulie. In data de 2 iulie 2004 s-au implinit 500 de ani de la trecerea la cele vesnice a Slavitului Voievod Stefan cel Mare si Sfant.</p>\n\n<h3>Manastirea Putna - arhitectura ansamblului monahal</h3>\n\n<p>Intrarea in incinta Manastirii Putna se face pe sub arcul boltit al unui turn compus din parter si etaj, pe a carui fatada estica se afla stema Moldovei datata cu anul 1471. Turnul a fost zidit in anul 1757, in vremea domnitorului Constantin Racovita, despre aceasta dand marturie si stema de pe fatada de vest, in care apar reunite stemele Moldovei si ale Tarii Romanesti.</p>\n\n<p>Deoarece poetul Mihai Eminescu impreuna cu Ioan Slavici si cu alti participanti la Marea Serbare de la Putna din august 1871 au innoptat in acele zile in sala de la etaj, aceasta constructie se numeste \"Turnul Eminescu\". Tot pe latura de est este situat si Turnul clopotnitei construit in anul 1882.</p>\n\n<p>Paraclisul manastirii, asezat in partea vestica a incintei, cu hramul Sfintii Apostoli Petru si Pavel, este construit de mitropolitul Iacov Putneanul in anul 1759, pe locul vechiului turn clopotnita deteriorat la marele cutremur din 1739.</p>\n\n<p>Paraclisul a fost restaurat intre anii 1976-1983, cand i s-au adaugat noi spatii. Paraclisul a fost pictat in tehnica \"a fresco\" in perioada 1980-1984 de artistii-frati Mihail si Gavril Morosan, staret fiind Arhimandritul Iachint Unciuleac.</p>\n\n<p>Pe latura sudica a incintei se afla Casa Domneasca ridicata intre anii 1982-1988 pe temeliile celei vechi distrusa de habsburgi. Lucrarile de reconstructie au fost incepute si supravegheate, in mare parte, de catre Prea Fericitul Parinte Teoctist pe timpul arhipastoririi sale ca mitropolit al Moldovei.</p>\n\n<p>Singura cladire ramasa din vremea Sfantului Voievod Stefan este Turnul Tezaurului a carui constructie a fost terminata in anul 1481. In el au fost adapostite, in vremi de tulburare, odoarele acestui sfant locas.</p>\n\n<h3>Manastirea Putna - biserica centrala</h3>\n\n<p>Biserica originala a suferit mari modificari in perioada 1653-1662. S-au pastrat liniile arhitectonice initiale specifice stilului moldovenesc, fiind alcatuita din cinci incaperi: pridvor, pronaos, gropnita, naos si altar. Se regasesc astfel reunite elemente de arhitectura bizantine, gotice si renascentiste.</p>\n\n<p>Biserica, reconstruita de domnitorii Vasile Lupu, Gheorghe Stefan si Eustatie Dabija (1653-1662) se inscrie in datele generale ce constituie trasaturile epocii: plan trilobat, brau in torsada impartitor al zidurilor, ocnite din arcaturi si arcade oarbe, pilastri, ferestre dreptunghiulare gotice; turla are coloane rasucite, pridvorul inchis apare aici pentru prima data in Moldova.</p>\n\n<p>Accesul in biserica se face prin cele doua usi laterale ale pridvorului, incadrate cu portaluri de piatra. Usa masiva prin care se trece din pridvor in pronaos are la partea superioara o pisanie care aminteste de lucrarile de reconstructie ce au avut loc in timpul domniilor lui Gheorghe Stefan si Eustratie Dabija.</p>\n\n<p>Camera mormintelor primeste lumina de la cate o fereastra la sud si nord. Aici se afla mormantul lui Stefan cel Mare si Sfant acoperit cu un baldachin din marmura alba, cu o inscriptie incrustata pe lespede care ne spune ca viteazul domnitor este ctitorul si ziditorul sfantului locas, alaturi de sotia sa Maria, fiica lui Radu Voievod. Pe mormantul marelui Stefan se afla urna de argint depusa cu prilejul serbarii din 1871.</p>\n\n<p>Din camera mormintelor - gropnita - trecerea catre naos se face printre doua coloane masive ce au inlocuit, in secolul al XVII-lea, peretele despartitor specific liniei arhitectonice stefaniene.</p>\n\n<p>Pronaosul este luminat de doua ferestre la sud si alte doua la nord. Pridvorul este luminat prin mai multe ferestre, asezate pe zidurile din sud, nord si vest. Intrarea in pridvor se face prin sud si nord, pe usi masive din lemn, ferecate cu fier.</p>\n\n<p>Intrarile din pridvor in pronaos si din pronaos in camera mormintelor sunt de asemenea prin usi masive din lemn ferecate cu fier. In pridvor, pe latura sudica, se afla mormantul Mitropolitului Moldovei Iacob Putneanul, innoitorul manastirii ( 15 mai 1778), iar pe partea nordica, mormantul Mitropolitului Sucevei Teoctist (18 noiembrie 1478).</p>\n\n<p>Altarul este luminat de 3 ferestre (est, nord si sud) si este separat de naos printr-un iconostas din lemn, cu o ornamentatie sculpturala foarte frumoasa. Naosul, luminat de cate doua ferestre la sud si nord, are deasupra turla deschisa, de forma octogonala la primul etaj si hexagonala la etajul superior, la exterior cu coloane torsionate si ancadramente la ferestre. Intre naos si camera mormintelor sunt doi stalpi masivi din piatra, care sustin arcada ce sustine la randul ei bolta.</p>\n\n<p>Toate ferestrele din altar, naos, gropnita si pronaos sunt pictate in interior, terminate in arc si prevazute la exterior cu grilaje metalice. Pardoseala este din marmura, numai in pridvor este din lespezi de piatra.</p>\n\n<p>La exterior biserica Manastirii Putna este incinsa cu un brau rasucit in torsada simbolizand Preasfanta Treime, motiv ce se regaseste si in ornamentatia interioara.</p>\n\n<p>Acoperisul este cu tabla de arama, asezatain randuri dese, pentru a imita sindrila, in exterior este un brau masiv torsionat, cu firide largi, mult mai inalte in partea inferioara si mai scurte in partea superioara. Ferestrele au ancadramente din piatra. Pe fatade sunt amplasati mai multi stalpi conforturi.</p>\n\n<p>Manastirea Putna - pictura bisericii\nDistrusa in timpul luptelor pentru domnie dintre Vasile Lupu si Gheorghe Stefan, pictura originala s-a incercat a se reface abia in secolele XVIII-XIX cand s-au zugravit in pridvor cateva chipuri de sfinti.</p>\n\n<p>Dorinta de a reda Putnei stralucirea de odinioara, cand era \"tot cu aur poleita zugraveala, mai mult aur decat zugraveala si pre dinauntru si pre denafara\" (cronicarul Ion Neculce), a inceput sa prinda contur abia in anul 1972 cand mitropolitul de atunci, Iustin Moisescu, a binecuvantat proiectul de refacere a picturii din biserica mare a manastirii, pe baza unui plan iconografic intocmit de parintele Sofian Boghiu.</p>\n\n<p>Ca o proorocie peste veacuri, hotararea mitropolitului de a incredinta pictarea ctitoriei Voievodului Stefan cel Mare acelora care vor picta mai intai Paraclisul, s-a implinit la 10 iulie 2001, cand, cu binecuvantarea Prea Fericitului Parinte Teoctist, Patriarhul Bisericii Ortodoxe Romane, pictorii Mihail si Gavril Morosan au trasat primele linii la noua fresca.</p>\n\n<p>Fii ai Bucovinei, pictori de categoria I-a, cu numeroase lucrari in tara si strainatate, fratii Mihail si Gavril Morosan au impodobit biserica cu frumoase chipuri, scene si compozitii pe fondul foitei de aur. Stilul neobizantin, cu acorduri cromatice deosebite, compozitiile inedite, sunt cateva din caracteristicile noii picturi.</p>\n\n<p>Iconostasul ce impodobeste biserica a fost realizat in anul 1773 din lemn de tei si tisa. Executat de mesteri locali din porunca si cu osteneala mitropolitului Iacob Putneanul, iconostasul este sculptat in stil baroc tarziu. A fost restaurat.</p>\n\n<p>Manastirea Putna - sfintele moaste\nIn altarul bisericii sunt pastrate cu multa evlavie particele din moastele Sfintilor Trei Ierarhi Vasile, Grigorie si Ioan, Sfanta Ana - mama Maicii Domnului, Sfantul Ierarh Alexandru, Sfantul Ierarh Nectarie, Sfantul Ierarh Vavila, Sfantul Mare Mucenic Pantelimon, Sfantul Mare Mucenic Gheorghe, Sfantul Mucenic Rafael, Sfantul Mucenic Ghedeon, Sfantul Serafim de Sarov si degetul aratator alSfantului Daniil Sihastru, iar in pronaos, craniul Sfantului Ierarh Ghenadie asezat intr-o frumoasa racla sculptata.</p>\n\n<h3>Manastirea Putna - muzeul manastirii</h3>\n\n<p>Muzeul Manastirii Putna este poate cel mai bogat si valoros din tara, pastrand multe obiecte de la Stefan cel Mare, manastirea fiind renumita prin tezaurul sau de broderii, tesaturi, manuscrise, argintarie, obiecte de cult.</p>\n\n<p>Muzeul Manastirii Putna, reamenajat in anii 1976 si 2004, se afla in partea de vest a incintei, alaturi de Paraclis. Aici se pastreaza o parte din tezaurul artistic si istoric al manastirii, constand in manuscrise (Tetraevanghele, Psaltiri, carti de invatatura, Leastvite, Psaltichii) si broderii realizate in atelierele manastirii (epitafuri, acoperaminte pentru sfintele vase, pocrovete, dvere, valuri de tampla, acoperaminte de morminte, vesminte preotesti), carti de cult si de invatatura, odoare bisericesti (sfinte vase, cruci ferecate, icoane, cadelnite, candele), obiecte din ceramica, etc.</p>\n\n<p>Printre odoarele de mare pret se numara icoana facatoare de minuni a Maicii Domnului adusa, dupa traditie, din Constantinopol in 1472 de catre Doamna Maria de Mangop, sotia Sfantului Voievod Stefan si craniul Sfantului Ierarh Ghenadie, mare facator de minuni, ferecat in argint aurit si daruit manastirii de ctitorul ei in anul 1488.</p>\n\n<h3>Manastirea Putna - necropola domneasca</h3>\n\n<p>Conceputa dintru inceput ca necropola domneasca, biserica Manastirii Putna adaposteste paisprezece morminte din care trei sunt voievodale, apartinand familiei Musatinilor. Lucrat din porunca sa, cu doisprezece ani inainte de stramutarea la vesnicele locasuri, mormantul Binecredinciosului Voievod Stefan se afla in partea de sud a gropnitei.</p>\n\n<p>Alaturi este mormantul Doamnei Maria Voichita (†1511). Pe latura de nord se afla alte trei morminte: cel al Doamnei Maria de Mangop (†1477) si ale fiilor Bogdan (†1479) si Petru (†1480).</p>\n\n<p>Pronaosul adaposteste mormintele Domnitorului Bogdan al III-lea (†1517) - fiul lui Stefan, al Mariei (†1518) - fiica, al Domnitorului Stefanita (†1527) - nepotul lui Stefan si cel al Doamnei Maria (†1529) - sotia lui Petru Rares.</p>\n\n<p>In pridvor se afla mormantul mitropolitului Moldovei Teoctist I (†1477), cel care l-a uns ca Domn pe Stefan cel Mare la locul numit Direptate, iar in partea opusa sunt mormintele mitropolitului Iacov Putneanul si ale parintilor acestuia, Adrian ieroschimonahul si Mariana monahia.</p>\n\n<p>Dupa traditie, in exteriorul bisericii, partea sudica, langa Sfantul Altar, se aflamormantul Sfantului Ierarh Ilie Iorest, calugar putnean ajuns mitropolit al Ardealului, unde a marturisit credinta ortodoxa in vremea prigoanei calvine. Revenit la Putna dupa ani grei de temnita, s-a mutat catre cele vesnice la 12 martie 1678.</p>\n\n<p>Langa acesta se afla cripta Mitropolitului Isaia Balosescu, cel care a construit la sfarsitul secolului XVIII, la Cernauti, celebrul Palat Mitropolitan al Bucovinei, transformat astazi in Universitate.</p>\n\n<h3>Manastirea Putna - locul in care rugaciunea a scris istorie</h3>\n\n<p>Dotata dintru inceput cu atelier de caligrafie - scriptorium (in care calugarii, instruiti in scoala vestitului caligraf Gavriil Uric de la Manastirea Neamt, copiau carti de cult si din scrierile Sfintilor Parinti), cu atelier de broderie (in care se lucra cu fir de aur si de argint, cu matasuri scumpe si pietre pretioase) si cu o celebra scoala de muzica psaltica condusa de Eustatie Protopsaltul, Manastirea Putna va deveni in scurt timp un renumit centru al artei si culturii medievale sud-est europene in secolele XV-XVI.</p>\n\n<p>Mai tarziu, viata duhovniceasca, culturala si artistica a manastirii a avut din nou o perioada de mare inflorire in timpul pastoririi mitropolitului Iacov Putneanul.</p>\n\n<p>Pentru romani, Manastirea Putna nu reprezinta numai rugaciune, arta sau cultura, ci si o pagina din istoria vie a neamului. Nume ca Ioan Slavici, Mihai Eminescu, Ciprian Porumbescu, A. D. Xenopol, Mihail Kogalniceanu trezesc si astazi amintirea marii serbari de la Putna (14-16 august 1871) ocazionata de implinirea a 400 de ani de la sfintirea bisericii manastirii. Atunci Mihai Eminescu a rostit cuvintele: \"Sa facem din Putna Ierusalim al neamului romanesc si din mormantul lui Stefan altar al constiintei nationale\".</p>\n\n<p>Pe urna votiva depusa atunci pe mormantul Sfantului Voievod Stefan se afla inscriptia: \"Eroului, invingatorului, aparatorului existentei romane, scutului crestinatatii, lui Stefan cel Mare, Junimea Romana Academica, MDCCCLXX\".\nPastrarea constiintei de neam in timpul ocupatiei austro-ungare s-a manifestat si in 1904 cand intreaga Bucovina, la initiativa lui Eudoxiu Hurmuzachi si a altor intelectuali romani, a comemorat 400 de ani de la trecerea la cele vesnice a slavitului Voievod Stefan cel Mare, care a fost \"glasul istoriei noastre, al unui neam viteaz si nedreptatit\" (P.P.Panaitescu).</p>\n\n<p>Evlavia romanilor, inradacinata de veacuri fata de marele ctitor de locasuri sfinte, a facut ca actul canonizarii Sfantului Stefan ce Mare, in iunie 1992, sa fie doar o recunoastere oficiala a cultului popular pastrat cu sfintenie atatea veacuri.</p>\n\n<p>\"Om ales de Dumnezeu\", \"aparator al dreptei credinte\", \"ocrotitorul celor napastuiti\", \"stalp neclintit al rabdarii\", \"neinfricat ostas al lui Hristos\", marele Voievod a fost si ramane in constiinta poporului ca \"parinte al neamului romanesc\".</p>\n\n<p>Sfintenia Voievodului ramane dovedita peste veacuri si de stransele sale legaturi cu marii duhovnici ai timpului: Sfantul Ghenadie, Simeon staretul de la Pangarati si mai ales cu Sfantul Daniil Sihastru, in a carui chilie a gasit totdeauna mangaiere, sfat si ajutor.</p>\n\n<h3>Manastirea Putna - obstea manastirii</h3>\n\n<p>Manastirea Putna este ridicata pe o veche vatra sihastreasca, fapt dovedit si de cercetarile arheologice. La numai o jumatate de metru sub temelia vechii Case Domnesti s-au gasit oseminte \"galbene si frumoase\" cu mireasma de sfinte moaste, a cinci calugari care s-au nevoit aici cu peste un secol inainte de intemeierea Manastirii Putna.</p>\n\n<p>Prima obste a fost formata in anul 1466 din calugari adusi de la Manastirea Neamt, condusi de Arhimandritul Ioasaf, cel dintai staret al Putnei. De atunci si pana in prezent viata monahala s-a desfasurat fara intrerupere, in pofida ocupatiei straine si a prigoanei comuniste.\nPentru crestini Putna a fost si ramane o cetate a rugaciunii si duhovniciei, unde generatii intregi de monahi s-au nevoit sa ajunga la desavarsire, la cunoasterea lui Dumnezeu. Monahii sunt chemati sa se roage pentru intreaga lume si aceasta este principala lor slujire catre omenire.</p>\n\n<p>Multumita monahilor, rugaciunea nu se intrerupe niciodata pe pamant, iar acesta este cel mai mare folos pentru intreaga lume, caci lumea dainuie prin rugaciune. De aceea, vietuitorii manastirii se straduiesc sa savarseasca zilnic Sfanta Liturghie si cele Sapte Laude.</p>"}, "docs/bucovina/sucevita": function(exports, require, module) {module.exports = "<h4 class=\"right\"><a href=\"/bucovina\">Inapoi</a></h4>\n\n<h1>Manastirea Sucevita</h1>\n\n<p>Date gererale:</p>\n\n<ul>\n<li>70 de vietuitoare, viata de obste</li>\n<li>Hram: invierea Domnului, Schimbarea la Fata</li>\n<li>Acces: din Suceava, spre Radauti, pe DN2/E85, 35 km, stanga pe DN17A, prin Radauti si Marginea, 18 km</li>\n<li>Stareta: stavrofora Mihaela Cozmei</li>\n<li>Adresa: com. Sucevita, 727510, jud. Suceava</li>\n</ul>\n\n<p><figure class=\"center\"><img src=\"/images/sucevita.jpg\" alt=\"\"></figure></p>\n\n<h3>Despre Manastirea Sucevita:</h3>\n\n<p>Manastirea Sucevita, cu hramul Invierea Domnului, a fost construita in ultimele decenii ale secolului al XVI-lea, cu cheltuiala familiei de boieri Movila. Traditia aseaza pe valea raului Sucevita, intre dealuri, o biserica din lemn si o schivnicie de pe la inceputul veacului al XVI-lea.</p>\n\n<p>Primii sihastri de pe valea paraului Sucevita au fost ucenici ai Sfantului Daniil Sihastrul. Acesti sihastri se nevoiau sub Muntele Obcina Mare, unde mai tarziu si-au facut o mica biserica de lemn cu hramul \"Schimbarea la Fata\". Locul se numeste pana astazi \"La Pustnici\".</p>\n\n<p>La inceputul secolului al XVI-lea intalnim aici pe Calistrat Sihastrul, un alt ucenic alSfantului Daniil de la Voronet. Acest mare isihast a adunat in jurul sau mai multi ucenici si a innoit prima sihastrie, cunoscuta in traditie sub numele de \"Sihastria lui Calistrat\", transformata spre sfarsitul secolului al XVI-lea in actuala Manastire Sucevita.</p>\n\n<p>Cei mai renumiti sihastri, dupa Cuviosul Calistrat, au fost Pangratie arhimandritul (+1615) si Cuviosul Isachie (secolul al XVIII-lea). Primul s-a nevoit cu cativa ucenici pe o culme, numita pana azi \"Dealul lui Pangratie\", iar al doilea a sihastrit pe dealul Furcoiului. Dupa desfiintarea manastirii (in anul 1786), viata de sihastrie a inceput sa se stinga.</p>\n\n<p>Manastirea Sucevita - marturia evlaviei lui Ieremia Movila\nLegenda spune ca, mai tarziu, dupa secolul al XVI-lea, pentru rascumpararea a cine stie caror pacate, o femeie a adus cu carul ei tras de bivoli, timp de treizeci de ani, piatra necesara actualei constructii. Documentar, Manastirea Sucevita este atestata la anul 1586, ca rezultat al initiativei mitropolitului Gheorghe Movila.</p>\n\n<p>Dupa venirea pe tronul Moldovei, in anul 1595, Ieremia Movila adauga bisericii doua pridvorase, amplasate la intrare, zidurile si turnurile de incinta, care confera manastirii infatisare de cetate medievala, o casa domneasca, ale carei ruine se mai vad si astazi pe latura de nord, precum si chilii pentru calugari.</p>\n\n<p>Tot in timpul domniei lui Ieremia Movila se picteaza biserica in interior si exterior. Pictura, realizata in fresca, a fost executata de doi pictori moldoveni, Ioan Zugravul si fratele sau Sofronie, si se pastreaza in forma originala. Aceasta are o valoare artistica, culturala, istorica si duhovniceasca incontestabile in intreaga lume.</p>\n\n<p>In camera mormintelor isi dorm somnul de veci fratii voievozi Ieremia  si Simion Movila ale caror lespezi funerare din marmura de Ruschita sunt, in traditia inaugurata de Stefan cel Mare, valoroase obiecte de arta medievala romaneasca.\nMonumentul este in realitate ctitorie comuna a familiilor Movilestilor - mari boieri, carturari si chiar domnitori ai Moldovei si Tarii Romanesti intre secolele XVI-XVII.</p>\n\n<p>Tabloul votiv infatisand familia lui Ieremia Movila, se desfasoara in partea stanga a usii naosului, in partea opusa aflandu-se al doilea tablou votiv reprezentand pe mitropolitul Gheorghe Movila, initiatorul construirii bisericii, si pe tatal fratilor Movila, Ioan Movila (fost logofat, calugarit la batranete cu numele de Ioanichie).</p>\n\n<h3>Manastirea Sucevita - arhitectura unei bijuterii moldave</h3>\n\n<p>Construita in stilul arhitecturii moldovenesti - imbinare de elemente de arta bizantina si gotica, la care se adauga elemente de arhitectura ale vechilor biserici de lemn din Moldova - Manastirea Sucevita, de mari proportii, pastreaza planul trilobat si stilul statornicit in epoca lui Stefan cel Mare, cu pridvorul inchis.</p>\n\n<p>Nota aparte fac celelalte doua mici pridvoare deschise - stalpi legati prin arcuri in acolada - plasati mai tarziu pe laturile de sud si de nord. Prin excelenta \"muntenesti\", pridvoarele constituie un evident ecou al arhitecturii din Tara Romaneasca. Se mentin firidele absidelor, chenarele gotice din piatra si ocnitele numai la turla, inclusiv pe baza ei stelata.</p>\n\n<p>Incinta manastirii este un patrulater cu laturile de 100 si 104 metri, inconjurat de ziduri inalte de 6 metri si groase de 3 metri, prevazute cu contraforturi, metereze, drum de straja, patru turnuri de colt si unul cu paraclis peste gangul intrarii - stema Moldovei.</p>\n\n<p>In incinta manastirii se mai afla incaperi ale vechii case domnesti si beciuri unde ar fi fost ascunsa o fabuloasa avere, conform marturiei lui Ion Neculce.</p>\n\n<h3>Manastirea Sucevita - pictura in fresca recunoscuta mondial</h3>\n\n<p>Manastirea Sucevita, ultima biserica moldava zugravita in exterior, este un \"testament al artei vechi moldovenesti\". Traditia si inovatia se impletesc original si pitoresc intr-o desfasurare multicroma dominata de un verde crud, plin de viata.</p>\n\n<p>Programul iconografic al picturii interioare si exterioare respecta traditia constituita in epoca lui Petru Rares (prima jumatate a sec. al XVI-lea), dar introduce teme noi, cu caracter teologico-dogmatic, cum este scena din conca naosului reprezentand imnul liturgic \"Unul nascut..\" si alte reprezentari ale Sfintei Treimi.</p>\n\n<p>O trasatura caracteristica a picturii de la Sucevita este inclinatia spre naratiune, configurand cicluri complete din vietile unor sfinti (Sfantul Pahomie, Sfantul Ioan cel Nou de la Suceava, Sfantul Ierarh Nicolae, Sfantul Mucenic Gheorghe, Viata lui Moise etc), prezentate cu scop educativ.</p>\n\n<p>Stiinta si maiestria pictorilor se descifreaza mai ales in abordarea perspectivelor studiate, a popularii fundalurilor cu peisaje sau arhitecturi specifice spatiului artistic post-bizantin din aceasta zona a Europei.</p>\n\n<p>Pictura murala de la Manastirea Sucevita, considerata de cercetatorul de arta francez Paul Henry drept \"testamentul artei moldovenesti\", incheie epoca de mari creatii care a fost secolul al XVI-lea, ale carei monumente cu pictura exterioara de la Humor, Moldovita, Arbore si Voronet constituie capodopere ale artei universale.</p>\n\n<h3>Manastirea Sucevita - pictura interioara \"intre traditie si inovatie\"</h3>\n\n<p>Pictura interioara este repartizata pe toata suprafata disponibila conform schemelor traditionale, imbogatita insa prin subiecte mai putin obisnuite in Moldova, dar familiare pentru Muntenia - spre exemplu: reprezentarea Cortului Marturiei, in altar. Iconostasul Manastirii Sucevita este sculptat in lemn de tisa, in stil baroc-rococo si dateaza din anul 1801.</p>\n\n<p>Pridvorul intampina, ca de obicei, cu Judecata de Apoi si o foarte pamanteana relatare istorica: Intampinarea moastelor Sfantului Ioan cel Nou la curtea lui Alexandru cel Bun.</p>\n\n<p>Naosul cuprinde un mozaic miniatural de intamplari din Viata lui Iisus, trei imagini ale Genezei unde natura si peisajul ies in prim plan - sunt tratate cu generozitate si semnificativ, zugravii plasand fara sfiala in ambianta persano-mediteraneeana maci, garofite si vita de vie - si \"tabloul votiv\", care este si el bogat in personaje.</p>\n\n<p>Unica in pictura noastra este iconografia ocnitei - Viata lui Moise - tot miniaturizata, unde apar si catei, purcei, ba chiar evrei cu caciuli tuguiate, elemente laice de sorginte locala, in timp ce Maica Domnului - pe bolta - are flori in nimb si este incorporata unui peisaj montan.</p>\n\n<p>Alte sute de scene descriu, in pronaos, Viata Sfantului Gheorghe, Calendarul, Sinoadele, imagini din Viata Sfantului Nicolae ce se desfasoara in ambianta marina.</p>\n\n<h3>Manastirea Sucevita - pictura exterioara.. \"testament al vechii arte moldovenesti\"</h3>\n\n<p>Sucevita, ultima biserica din Bucovina zugravita pe fatade (in anul 1596), monumentul cu cel mai mare numar de imagini religioase din tara, este un \"testament al artei vechi moldovenesti\" (Paul Henry). Traditia si inovatia se impletesc original si pitoresc intr-o desfasurare multicroma dominata de verdele cu \"intensitatea smaraldului si vigoarea ierbii proaspete dupa ploaie\".</p>\n\n<p>Zugravii, fratii moldoveni Sofronie si Ion, s-au dovedit buni cunoscatori ai randuielilor iconografice, dar si ai arhitecturii italiene (Imnul acatist - la sud) sau rusesti (Pocrovul - intre ferestrele gotice).</p>\n\n<p>Pictura exterioara a Manastirii Sucevita este cea mai bine pastrata din grupul bisericilor moldovenesti cu pictura exterioara, fiind totodata se singura care-si pastreaza latura de nord, unde este reprezentata scena \"Scara virtutilor\", cea mai impresionanta scena, prin amploarea si contrastul dintre ordinea ingerilor si haosul iadului.</p>\n\n<p>Din tematica picturii mai amintim: Rugaciunea tuturor sfintilor, Arborele lui Iesei, cicluri complete din viata unor sfinti: Sfantul Ioan cel Nou, Sfantul Ierarh Nicolae,Sfantul Mucenic Gheorghe, friza profetilor si filosofilor antichitatii, intre care regasim pe David si Solomon, Homer, Sofocle si Aristotel.</p>\n\n<p>Fatada sudica este decorata cu \"Arborele lui Iesei\", avand la baza filosofii antici, \"Acatistul Maicii Domnului\", \"Rugul in flacari\" si \"Acoperamantul Maicii Domnului\". Scenele si personajele din Arborele lui Iesei apar cel putin la fel de importante ca peisajul (element de prim plan la Moldovita ori Voronet).</p>\n\n<p>Pe peretii celor trei abside, in sapte registre pe orizontala, este redata \"Rugaciunea tuturor sfintilor\", \"Cinul\", tema unica in lumea crestin-ortodoxa, creatie a scolii de pictura din Moldova. Aceasta reprezentare iconografica se impune prin puterea de sugestie si colorit.</p>\n\n<p>Revelatoare si definitorie pentru Sucevita ramane insa Scara Sfantului Ioan Climax (la nord), cea mai vasta interpretare iconografica romaneasca a credintei intr-o prima judecata imediat dupa moarte si una din cele mai valoroase compozitii ale picturii medievale romanesti. Aici, Vamile vazduhului nu mai dau nici o sansa pacatosilor. Este redata lupta dintre bine si rau, incercarea omului de a pasi spre perfectiune pentru a-si redobandi chipul pierdut prin caderea in pacat.</p>\n\n<p>Peretele de vest nu are pictura - se spune ca zugravul, care lucra in paralel la Manastirea Sucevita a Movilestilor si la Manastirea Teodoreni din Burdujeni, a cazut de pe schela Manastirii Sucevitei si a murit.</p>\n\n<p>La Manastirea Sucevita s-au facut intre anii 1958-1969 importanta lucrari de restaurare.</p>\n\n<h3>Manastirea Sucevita - muzeul manastirii</h3>\n\n<p>In complexul cultural-artistic de la Manastirea Sucevita, vizitatorul dornic de a cunoaste arta medievala a secolului al XV-lea si al XVI-lea gaseste, reunite, arhitectura religioasa, de aparare si civila, monastica, pictura, sculptura in lemn si piatra, broderii, manuscrise miniate si argintarie.</p>\n\n<p>Muzeul manastirii este in posesia uneia dintre cele mai bogate si mai pretioase colectii de arta medievala din Moldova: acoperamintele de morminte ale domnitorilor Ieremia (datand din 1606) si Simion Movila (1609), capodopere ale broderiei, totodata printre cele mai reusite portrete laice din epoca: epitaful cu 10.000 de margaritare (1597), caseta de argint cu parul doamnei Elisabeta, sotia lui Ieremia Movila.</p>\n\n<p>Printre exponatele pastrate cu grija si evlavie in muzeul Manastirii Sucevita se remarca broderiile de valoare exceptionala, datand din secolele al XV-XVI-lea, din vremea lui Stefan cel Mare si Ieremia Movila, lucrate cu fir de aur, argint, matase si perle.</p>\n\n<p>Cele mai importante piese sunt portretele lui Ieremia si Simion Movila, un epitaf cu perle, tetraevangheliarele ferecate in argint aurit, un chivot donat de Mitropolitul Gheorghe Movila. Remarcabile sunt si pietrele tombale din gropnita ale celor doi Movilesti, cu unele influente muntenesti in decoratia cioplita.</p>\n\n<p>Datorita valorii sale si a rolului educativ, religios si cultural, Manastirea Sucevita, perla a ortodoxiei romanesti, face parte din patrimoniul universal.</p>\n\n<h3>Manastirea Sucevita - localizare si date de contact</h3>\n\n<p>Manastirea Sucevita se afla in Comuna Sucevita, judetul Suceava.</p>\n\n<p>Accesul la manastire se face de pe Drumul National 17A dinspre Radauti, spre Sud-Vest pana la localitatea Marginea (aflata la o distanta de 11 kilometri), iar de aici se ajunge imediat la Sucevita (dupa alti 5 kilometri).</p>"}, "docs/bucovina/voronet": function(exports, require, module) {module.exports = "<h4 class=\"right\"><a href=\"/bucovina\">Inapoi</a></h4>\n\n<h1>Manastirea Voronet</h1>\n\n<p>Date gererale:</p>\n\n<ul>\n<li>4 vietuitoare, viata de obste</li>\n<li>Hram: Sfantul Mare Mucenic Gheorghe, Sfantul Daniil Sihastrul</li>\n<li>Adresa: str. Voronet, nr. 166, Gura Humorului, 725300, jud. Suceava Accesdin Gura Humorului in Voronet, pe DJ177D, 4 km</li>\n<li>Stareta: stavrofora Irina Pantescu</li>\n</ul>\n\n<p><figure class=\"center\"><img src=\"/images/voronet.jpg\" alt=\"\"></figure></p>\n\n<h2>Despre manastirea Vornet:</h2>\n\n<p>Cu voia Bunului Dumnezeu, cu rugaciunile Sf. Cuvios Daniil Sihastrul si prin osardia Biencredinciosului Voievod Stefan cel Mare si Sfant s-a inaltat, din 26 mai pana in 14 septembrie 1488, Manastirea Voronet cu hramul Sf. Mare Mucenic Gheorghe.</p>\n\n<p>In 1547 i s-a adaugat pridvorul si i s-a facut pictura exterioara sub privegherea Mitropolitului Grigorie Rosca, ce se odihneste in pridvor: Inca de la inceput Manastirea a fost binecuvantata cu calugari cu aleasa viata duhovniceasca, in vreamea Sf. CuviosDaniil Sihastrul fiind o adevarata lavra a isihasmului romanesc. Viata monahala s-a intrerupt in anul 1785 dupa anexarea Bucovinei la Imperiul Habsburgic si s-a reluat in anul 1991, de data aceasta cu obste de calugarite sub staretia Stavroforei Irina Pantescu. Tanara obste se straduieste sa imbine aromnios rugaciunea cu munca in gospodarie, in camp, in atelierul de pictura si in indrumarea vizitatorilor:</p>\n\n<p>Manastirea Voronet este socotita \"Capela Sixtina a Orientului\" pentru marea fresca de pe fatada de vest, numita \"Judecata de apoi\". De asemenea \"albastrul de Voronet\" este considerat de specialisti ca unic in lume si cunoscut ca rosul lui Rubes sau verdele lui Veronese. Pe fondul albastru este prezentat \"Arborele lui Iesei\" sau Genealogia Mantuitorului nostru Iisus Hristos iar pe coloane sunt pictati filozofii greco-latini. Sunt cautati cu privirea Aristotel si Platon iar pe absida laterala retine atentia \"chipul ascetic al Sf. Onufirie\".</p>\n\n<p>In stanga usii de la intrare este zugravit chipul aureolat al Sf. Cuvios Daniil Sihastrul. Deasupra usii strajuieste Icoana \"Deisis\". Mantuitorul nostru Iisus Hristos, Judecatorul Atotdrept, priveste cercetator pe toti cei care trec pragul Bisericii noastre; in dreapta si in stanga Sa, Maica Domnului si Sf. Ioan Botezatorul mijlocesc milostivirea pentru noi, oamenii. Pe contrafort este pictat Sf. Mare Mucenic Gheorghe, patronul Manastirii noastre, iar pe primele randuri ale acestui ansamblu de pictura, sus, \"Acatistul Sf. Nicolae\" si mai jos, \"Acatistul Sf. Ioan cel Nou de la Suceava\".</p>\n\n<p>In pridvor pictura reprezintacalendarul crestin-ortodox, iar pe multe Icoane se vad nume si zgarieturi, semne ale celor 206 ani de pustiire. Deasupra usii de la intrare, in pronaous, se afla o mununata Icoana - \"Dulcea imbratisare\" si mai sus inscriptia in piatra ce precizeaza numele ctitorului si timpul inaltarii Manastirii.</p>\n\n<p>In pronaos se afla, strajuit de o candela aprinsa, mormantul Sf. Cuvios Daniil Sihastrul, ce a fost primul staret al Manastirii.</p>\n\n<p>Tabloul votiv, al intemeietorului, se afla in naos. Maria Sa, Stefan cel Mare si Sfant, pictat in anul 1496 impreuna cu Doamna Maria-Voichita si Bogdan mostenitorul inchina, prin mijlocirea Sf. Mare Mucenic Gheorghe, Manastirea aceasta Mantuitorului nostru Iisus Hristos pentru a-i multumi ca l-a ajutat in lupta impotriva cotropitorilor turci.</p>\n\n<p>Privind tabloul votiv si ascultand clopotele daruite de voievod Manastirii inca de la intemeiere, clopote ce trase de vietuitoarele noastre tinere cheama de peste veacuri numele ctitorului: \"Stefan-Voda, Stefan-Voda\" ca intr-o vesnica pomenire, ne simtim legati prin fire nevazute de inaintasii nostri.</p>\n\n<p>Valoroasa artistic este catapeteasma din lemn de tisa, aurit, usile imparatestifiind o adevarata capodopera de sculptura in lemn. De mare pret este tronul Mitropolitului Grigorie Rosca si nadajduim ca va reveni acasa tronul original al Mariei-Sale, cel din Biserica fiind o copie distonand cu piesele vechi.</p>\n\n<p>Pictura din naos si din Sf. Altar, obosita de fumul lumanarilor sutelor de ani, asteapta restaurarea. Dupa primele probe de curatire facute de specialisti se zaresc culorile originale bine conservate. Aceasta lucraea minutioasa si costisitoare se va face din donatiile statului nostru roman si din micile donatii ale turistilor si inchinatorilor romani si straini care iubesc Voronetul.</p>\n\n<p>Expresia artistica a dreptei noastre credinte, a rafinamentului si gustului pentru frumos a neamului nostru, Sf. Manastire Voronet indeamna la reculegere si incanta inima si mintea privitorului ce ajunge la noi din toate colturile lumii.</p>\n\n<p>Iara, Stefan-voda, mergand de la cetatea Neamtului in sus pre Moldova, au marsu pe la Voronet, unde traie un parinte sihastru, pre nume Daniil, si tatand Stefan-voda in usa sihastrului sa-i descuie, au raspunsu sihastrul sa astepte Stefan-voda afara pana ce si-a istovit ruga. Si dupa ce si-au istovit sihastrul ruga, l-au chemat in chilie pre Stefan-voda si s-au ispovedit Stefan-voda la dansul. Si au intrebat Stefan-voda pre sihastru ce va mai face, ca nu poate sa sa mai bata cu turcii: inchina-va tara la turic, au ba? Iar sihastrul a dzis sa nu o inchine, ca razboiul este a lui, numai, dupa ce va izbandi, sa faca manastire acolo, in numele Sfantului Gehorghe, sa fie framul bisericii.</p>"}, "docs/crisana": function(exports, require, module) {module.exports = "<h1>Crisana</h1>\n\n<p><br><br>        </p>\n\n<h4>\n    <ul>\n        <li><a href=\"/crisana/bunavestire\">Buna Vestire</a></li>\n        <br>\n        <li><a href=\"/crisana/feredu\">Feredu</a></li>\n        <br>\n        <li><a href=\"/crisana/gai\">Gai</a></li>\n    </ul>\n</h4>"}, "docs/crisana/bunavestire": function(exports, require, module) {module.exports = "<h4 class=\"right\"><a href=\"/crisana\">Inapoi</a></h4>\n\n<h1>Manastirea Buna Vestire – Oradea</h1>\n\n<p>Date generale:</p>\n\n<ul>\n<li>Hram: Buna Vestire (biserica mare), Sfantul Mare Mucenic Mina (biserica mica)</li>\n<li>Acces: in Oradea, la iesirea spre Satu Mare</li>\n<li>Stareta: stavrofora Pavelida Badila</li>\n</ul>\n\n<p><figure class=\"center\"><img src=\"/images/bunavestire.jpg\" alt=\"\"></figure></p>\n\n<h3>Despre manastirea Buna-Vestire –Oradea:</h3>\n\n<p>Manastirea Buna Vestire din Oradea a fost infiintata in 1998 de catre episcopul Ioan Mihaltan.  Alaturi de locasul de cult au fost ridicate alte corpuri de cladiri necesare desfasurarii vietii monahale. Asezamantul mai are un altar de vara, cu hramul Sfintii Apostoli Petru si Pavel si Sfantul Nicolae, iar la subsolul acestuia, un paraclis cu hramul Sfantul Mucenic Mina.</p>"}, "docs/crisana/feredu": function(exports, require, module) {module.exports = "<h4 class=\"right\"><a href=\"/crisana\">Inapoi</a></h4>\n\n<h1>Manastirea Feredu</h1>\n\n<p>Date generale:</p>\n\n<ul>\n<li>6 vietuitori, viata de obste</li>\n<li>Hram: Sfantul Ilie Tezviteanul (Feredeul din Vale), Sfantul Gheorghe (Feredeul din Deal)</li>\n<li>Acces: DJ 709 Arad-siria; la iesirea din siria spre Ghioroc dupa 1 km se vireaza stanga si se parcurg inca cca 1800 m pana la manastire (30 km din Arad); de ia Feredeul din Vale, inca 4 km pana la Feredeul din Deal</li>\n<li>Staret: exarh arhim. Ilarion Taucean;  </li>\n</ul>\n\n<p><figure class=\"center\"><img src=\"/images/feredu.jpg\" alt=\"\"></figure></p>\n\n<h3>Despre manastirea Feredu:</h3>\n\n<p>Manastirea Feredeu este mentionata pentru intaia oara in documente in 1761, in timpul persecutiei generalului Bukow. In 1931 s-a pus piatra de temelie a unui paraclis cu hramul Sfantul Gheorghe, pe locul manastirii distruse. In 1959 schitul este inchis si este reactivat in 1987, la initiativa PS Timotei Seviciu. In acelasi an este instalat actualul staret, care, gasind paraclisul in ruina si cladirea aferenta distrusa, demareaza o serie de lucrari de reconstructie. Pe locul paraclisului s-a ridicat actuala biserica, cu hramul Sfantul Gheorghe, cunoscuta acum ca Feredeul din Deal. Ansamblul monahal cuprinde si alte cladiri din care amintim:  staretia, chiliile, trapeza.</p>"}, "docs/crisana/gai": function(exports, require, module) {module.exports = "<h4 class=\"right\"><a href=\"/crisana\">Inapoi</a></h4>\n\n<h1>Manastirea Gai</h1>\n\n<p>Date generale:</p>\n\n<ul>\n<li>5 vietuitoare, viata de obste</li>\n<li>Hram: Sfantul Simeon Stalpnicul (biserica veche de piatra), Acoperamantul Maicii Domnului (biserica noua), Sfintii Apostoli Petru si Pavel (biserica de lemn din Salistea), Nasterea Maicii Domnului (paraclis)</li>\n<li>Acces: in cartierul Gai, in nord-vestul municipiului Arad, in dreapta sosei spre Nadlag;</li>\n<li>Stareta: monahia Magdalena Bortes</li>\n</ul>\n\n<p><figure class=\"center\"><img src=\"/images/gai.jpg\" alt=\"\"></figure></p>\n\n<h3>Despre manastirea Gai:</h3>\n\n<p>In zona de nord - vest a Aradului, in cartierul Gai, la capatul strazii Dunarii, se inalta unul din cele mai reprezentative monumente din secolul al XVII-lea, din zona de vest a tarii, Manastirea Sfantul Simeon Stalpnicul sau Manastirea Gai. Manastirea Gai a fost ridicata intre anii 1760-1762 de catre episcopul Sinesie Jivanovici (1751-1768) pentru vesnica sa pomenire si pentru a fi folosita de urmasii sai in scaunul episcopal al Aradului.</p>\n\n<p>Contractul din 15-26 mai dintre episcopul Sinesie si mesterul aradean Egidius Ioanovici, prevedea ridicarea ansamblului manastiresc pentru suma de 98.000 florini aur. Proiectul monumentului a fost discutat de cele doua parti contractante. Manastirea se infatisa ca un ansamblu alcatuit dintr-un conac, resedinta episcopului, o biserica si anexe gospodaresti. Conacul a avut functia de resedinta de vara, pentruepiscopii Aradului. Biserica a constituit un lacas de cult si inchinare pentru o larga masa de credinciosi din apropiere.</p>\n\n<p>Dupa demolarea vechii catedrale a Aradului, in anul 1861, au fost stramutate si inmormantate la Gai, in interiorul altarului, ramasitele pamantesti ale episcopilor inhumati in catedrala. Reinfiintata in 1964, in prezent este manastire de maici, avand hramul la 1 septembrie cand este sarbatorit Sfantul Simeon Stalpnicul. Complexul, dupa dorinta ctitorului sau, episcopul Sinesie, a fost construit in stil baroc. Conform cerintei lui biserica facea corp comun cu conacul, care era atasat bisericii pe latura de nord. Intregul complex arhitectonic se inscrie intr-un plan in forma literei U, aceasta datorita celor doua iesinduri spre rasarit, marcate de absida bisericii si cea a unui paraclis interior din zona de nord-est a conacului.</p>\n\n<p>Fatada de rasarit a complexului arhitectonic este impunatoare si bogat ornamentata, avand nota caracteristica pentru constructiile de epoca. Turnul bisericii, aflata in zona de sud-vest a complexului, impresioneaza prin cele doua registre si cornisa dintre ele, bogat ornamentata arhitectonic. In axul turnului este plasata usa de intrare in biserica, prevazuta cu un ancadrament dreptunghiular din piatra. Turnul este prevazut cu un acoperis piramidal, compus din pante arcuite si este realizat din tabla de zinc. </p>\n\n<p>In interior, planimetria bisericii prezinta impartirea caracteristica bisericilor ortodoxe. Spre rasarit se afla absida semicirculara a altarului, care la exterior prezinta o forma poligonala. Masa altarului este cioplita din marmura rosie. In altar a fost inmormantat episcopul Sinesie. Dupa demolarea vechii catedrale a Aradului, in anul 1861, au fost stramutate si inmormantate la Gai, in interiorul altarului, ramasitele pamantesti ale episcopilor inhumati in catedrala. Arhitectura iconostasului evoca stilul neoclasic. Pictura iconostasului a fost realizata de Stefan Tenetchi in anul 1767 in stilul Renasterii italiene tarzii. De o frumusete deosebita sunt usile imparatesti, cu o ornamentatie deosebit de bogata. Acest ansamblu arhitectonic de epoca, a fost intregit prin aducerea, in cadrul complexului, a bisericii de lemn, din Selistea de Mures -comuna Petris- unul din cele mai reprezentative monumente din lemn ale arhitecturii romanesti de pe Valea Muresului in secolul al XVIII-lea.</p>\n\n<p>Este impresionanta colectia de \"Valori de arta veche romaneasca\", colectie aflata in interiorul vechiului conac. Aceasta colectie, dupa opinia criticului de arta Horea Medeleanu, unul din principalii organizatori, reprezinta o splendida imagine a artei vechi romanesti din acest colt de tara. Prin intregul sau ansamblu, complexul de la Gai este unul din punctele de mare interes de pe teritoriul municipiului Arad, necesar a fi cunoscut de cei care trec prin oras. Manastirea isi sarbatoreste hramul la 1 septembrie, odata cu inceputul anului bisericesc. Sfantul Simeon Stalpnicul, patronul spiritual al manastirii, s-a nascut in satul Sisan din Cilicia, partea de sud a Turciei de astazi, din parinti crestini, Susotion si Marta. La varsta de treisprezece ani s-a hotarat sa apuce calea calugariei si a fost primit la manastirea Ograda dupa ce a petrecut sapte zile la poarta acesteia. In scurt timp a invatat pe de rost toata psaltirea, lucru care le era obligatoriu pe vremea aceea tuturor celor care doreau sa intre in viata monahala. Dorind o viata mai aspra decat cea de la manastirea Ograda, Cuviosul Simeon a plecat la manastirea lui avva Eliodor. Deoarece nici aici nu a gasit o pravila atat de aspra pe cat si-o dorea, s-a retras timp de trei ani intr-o chilie, la poalele muntelui Telanis.</p>\n\n<p>In aceasta pustietate a petrecut pentru prima oara o perioada de patruzeci de zile de post fara mancare si fara apa. In urma acestei incercari la care s-a supus, Dumnezeu i-a dat darul vindecarii. Drept multumire, Sfantul Simeon a continuat acest post in fiecare an, pe perioada Postului Mare. Timp de douazeci de zile se ruga neincetat in picioare, iar in restul de douazeci de zile statea asezat, nemaiavand putere. Ducandu-se vestea despre darul pe care Dumnezeu i l-a dat, multa lume si-a cautat insanatosirea si alinarea la el. Pentru ca cinstirea pe care o primea din partea celor care isi gaseau tamaduire la el i s-a parut prea mare, a hotarat sa ridice un stalp iar in varful lui sa puna o chilie stramta in care sa se retraga si de unde sa nu iasa decat de doua ori pe zi pentru a biencuvanta multimea adunata. Astfel a devenit primul stalpnic, multi urmandu-l dupa aceea.</p>\n\n<p>Prin dovada credintei sale nestramutate, prin puterea cuvintelor si stralucirea minunilor a indreptat spre Dumnezeu multi oameni. Imparati ca Teodosie cel Tanar sau Leon cel Mare i-au cerut sfatul iar pe imparateasa Eudoxia a facut-o sa se lepede de calea ratacirii pe care o apucase. In ziua de 1 septembrie a anului 459 Sfantul Simeon Stalpnicul a fost chemat la Domnul spre vesnica odihna.</p>"}, "docs/dobrogea": function(exports, require, module) {module.exports = "<h1>Dobrogea</h1>\n\n<p><br><br>        </p>\n\n<h4>\n    <ul>\n        <li><a href=\"/dobrogea/celicdere\">Celic Dere</a></li>\n        <br>\n        <li><a href=\"/dobrogea/cocos\">Cocos</a></li>\n        <br>\n        <li><a href=\"/dobrogea/halmyris\">Halmyris</a></li>\n    </ul>\n</h4>"}, "docs/dobrogea/celicdere": function(exports, require, module) {module.exports = "<h4 class=\"right\"><a href=\"/dobrogea\">Inapoi</a></h4>\n\n<h1>Manastirea Celic Dere</h1>\n\n<p>Date generale:</p>\n\n<ul>\n<li>50 vietuitoare, viata de obste</li>\n<li>Hram: Adormirea Maicii Domnului (biserica mare), Acoperamantul Maicii Domnului (paraclisul)</li>\n<li>Acces: manastirea este situata pe DN229A, intre satele Telita si Posta, de la - Tulcea spre Isaccea, la 60 km SE de Galati (DN22, DN229A), 19 km SE de Isaccea si 23 km SV de Tulcea</li>\n<li>Stareta: monahia Casiana Mares;</li>\n</ul>\n\n<p><figure class=\"center\"><img src=\"/images/celicdere.jpg\" alt=\"\"></figure></p>\n\n<h3>Despre manastirea Celic Dere</h3>\n\n<p>Manastirea Celic-Dere, situata in partea de nord a Dobrogei, este unul dintre cele mai importante centre de spiritualitate dintre Dunare si Marea Neagra. Numele manastirii este luat de la paraul Celic-Dere (nume turcesc, in romana insemnand \"paraiasul de otel\", aici fiind gasite arme din trecutul indepartat).</p>\n\n<p>Manastirea este situata la 25 de kilometri sud-vest de Tulcea si 12 kilometri vest de localitatea Cataloi aflata pe soseaua Tulcea-Constanta, in Comuna Frecatei. Autobuzele din Tulcea-Cataloi-Telita au statie chiar in fata Manastirii Celic-Dere.</p>\n\n<p>De la Manastirea Cocos se poate veni cu autobuzele de Niculitel-Tulcea pana la intersectia Telita si de aici la dreapta 7 kilometri (drum asfaltat) pana la statia Celic-Dere (total 22 kilometri). Pe acelasi traseu cu 4 kilometri inainte de intersectia Telita vedem in stanga soselei Manastirea Saon.</p>\n\n<p>Din statia autobuzelor pentru Manastirea Celic-Dere pana la biserica acesteia se parcurge 0,5 kilometri. La intrarea in incinta trecem pe langa cladirea din dreapta cu etaj, construita in 1919, la parterul careia din 1954 este paraclisul, iar in stanga intrarii cladirea staretiei si a catorva chilii.</p>\n\n<p>In incinta mai sunt si alte cladiri pentru chilii, una dintre acestea fiind in fata bisericii mari. Alte cladiri sunt in afara incintei, in spatele cladirii cu paraclis. In incinta mare a manastirii sunt parcuri cu iarba, flori, arbusti si arbori, precum si alei betonate pentru circulatie, prevazute cu banci pentru odihna.</p>\n\n<p>De la intrarea in incinta mergem urcand usor pe o alee inierbata marginita de arbori coniferi, circa 150 de metri, urcam apoi o scara de beton de 30 trepte pana ajungem in fata bisericii, dupa care urcam inca 24 trepte de beton ca sa ajungem in pridvorul bisericii. Acest urcus ne face sa intelegem ca biserica este construita pe un deal mai inalt decat restul incintei.</p>\n\n<h3>Manastirea Celic Dere - scurt istoric</h3>\n\n<p>Asupra anului infiintarii Manastirii Celic Dere exista, pe de o parte, precizarea \"Marelui Dictionar Geografic al Romaniei\", conform careia asezamantul a fost fondat de \"arhiereul\" Athanasie Lisivencof la anul 1835, pe de alta parte, marturia arhimandritului Roman Sorescu, care fixeaza fondarea manastirii \"cam la 1840\" de catre calugari romani si doi calugari rusi intorsi de la Sfantul Munte Athos, arhimandritul Athanasie Lisavenco si schimonahul Paisie.</p>\n\n<p>Dintre acestea, cea mai intalnita este cea conform careia, in secolul al XVIII-lea, calugari ardeleni veniti din Muntele Athos se stabilesc in aceasta poienita, vatra monahala si construiesc o bisericuta din barne de lemn si lut, situata pe locul unde azi este cimitirul.</p>\n\n<p>Athanasie Lisavenco ar fi oprit pe femei in manastirea intemeiata, iar pentru barbati a construit o bisericuta si cateva chilii la vreo doi kilometri mai la vale, infiintand o a doua manastire, Celicul Mic sau Celicul de Jos.</p>\n\n<p>Distrusa de incendiu, arhimandritul Athanasie Lisavenco (considerat ctitorul manastirii, 1800-1880 si ale carui oseminte se gasesc intr-o mica racla foarte frumos argintata, asezata pe dreapta in paraclis) si Dosotei Crihana construiesc, intre anii 1841 si 1844, o bisericuta cu chilii in forma de patrulater, pe valea paraiasului Celic-Dere, azi fiind pe acel loc o troita care arata ca aici a fost biserica.</p>\n\n<p>In anul 1845 manastirea de calugari Celic Dere s-a transformat in manastire de maici (maicile au fost aduse din Basarabia), monahii fiind stramutati langa balta Saon unde isi construiesc o bisericuta si cateva chilii - viitoarea Manastire Saon. Dupa 60 de ani, constructia s-a degradat datorita infiltratiilor si inundatiilor.</p>\n\n<p>Dupa propria sa declaratie, facuta la 3 septembrie 1857, in fata Consistoriului duhovnicesc din Ismail, Athanasie Lisavenco, lipovean de origine, s-a nascut in targul Chilia din Basarabia, pe la anul 1816 (in 1857 arata ca are 41 de ani).</p>\n\n<p>In anul 1837 el intra in Manastirea Caracal de la Sfantul Munte Athos unde se calugareste in anul 1839. Doi ani mai tarziu, el este hirotonit ierodiacon si ieromonah, dupa care pleaca \"in partile Dunarii, aproape de Isaccea, langa apa numita Celic Dere unde a fundat un schit cu hramul Adormirea Maicii Domnului.\"</p>\n\n<p>O troita aminteste: \"Aicea a fost biserica Sfintii Voievozi Mihail si Gavril, a treia din Manastirea Celic Dere, ctitorie a arhimandritului Athanasie si daramata de inundatiile din 1916. Spre aducere aminte s-a facut aceasta insemnare de arhim. Porfirie Stefanescu in 1976 - aug. 1977\".</p>\n\n<p>In anul 1901 episcopul Partenie al Dunarii de Jos a pus temelia actualei biserici, dupa planurile arhitectului Toma Dobrescu din Bucuresti. Dar in anul 1902 lucrarile constructiei sunt intrerupte si reluate abia in anul 1910 la initiativa episcopului Nifon Niculescu, cu sprijinul Ministerului Cultelor.</p>\n\n<p>Lucrarile, reluate dupa planurile arhitectului Dumitru Berechet, continua pana in anul 1916 si reincep in anii 1924-1925. Acum a fost ridicata si biserica mare a manastirii si o mare parte dintre edificiile actuale.</p>\n\n<p>Noua biserica a asezamantului a fost pictata intre anii 1926-1932, in fresca, de pictorul roman Gheorghe Eftimiu din Bucuresti, in stil neobizantin, de o neasemuita frumusete, cu motive obisnuite in bisericile romanesti din epoca brancoveneasca. Biserica a fost sfintita in anul 1932 cu hramul \"Adormirea Maicii Domnului\" de catre episcopul Cosma Petrovici.</p>\n\n<p>La cativa pasi de biserica se afla casa maicii Paisia, in curtea careia s-a ridicat o troita pe locul bisericii inaltata la 1909, cu Sfanta Masa protejata cu acoperis din tabla si mormantul ctitorului Athanasie ale carui moaste (mana neputrezita) sunt depuse in Paraclis.</p>\n\n<p>\"Marele Dictionar geografic al Romaniei\" consemneaza la 1902 ca \"maicile sunt in numar de 83\" si ca \"langa manastire se mai afla si o pestera unde se ingroapa mortii incepand de la 1860. Pestera e lunga de cateva sute de metri, incepand de la manastire si raspunzand tocmai la Telita. Are mai multe rasuflaturi\". Tunelul nu a fost inca cercetat.</p>\n\n<p>In anul 2002, pentru mai buna desfasurare a vietii monahale in cadrul manastirii, vietuirea de sine a fost inlocuita cu randuiala vietii de obste. Tot atunci monahia Casiana Mares a fost numita stareta manastirii.\nManastirea Celic Dere - arhitectura</p>\n\n<p>Biserica din piatra a manastirii a fost construita intre anii 1901-1916, ctitorita de episcopul Partenie Clinceni. In anul 1909 lucrarile se reiau de catre P.S. Nifon Niculescu care a ridicat zidurile si acoperisul, inclusiv biserica de la subsol, pe baza planului intocmit de arhitectul Toma Dobrescu din Bucuresti. Biserica de la subsol a avut initial destinatia de gropnita, transformata apoi in biserica de iarna cu hramul \"Izvorul Tamaduirii\", unde s-a slujit intre anii 1932-1954.</p>\n\n<p>Biserica manastirii este construita in plan triconic, in stil clasic modern de traditie post-bizantina. Constructia este caracterizata prin suprapunerea a doua biserici. Subsolul initial a fost facut ca gropnita pentru pastrarea osemintelor, dar dupa sfintirea din anul 1932 (cu hramul \"Izvorul Tamaduirii\") i s-a dat alta destinatie, ca paraclis, pana in anul 1954.</p>\n\n<p>In exterior, despartirea celor doua biserici este marcata de un brau inconjurator. Are trei turle, una mare pe altar-naos octogonala cu opt ferestre inguste si inalte prevazute cu frumoase ancadramente in piatra si doua mai mici pe pridvorul inchis asezate dreapta-stanga tot de forma poligonala. Pridvorul deschis este sustinut de patru coloane mari asezate in fata si alte doua (dreapta-stanga) care marginesc peretele pridvorului inchis.</p>\n\n<p>In pridvorul inchis se intra pe o usa masiva din lemn prevazuta si cu un grilaj puternic de metal. In dreapta si stanga usii sunt pictati, in forma marita, Sfintii Apostoli Petru si Pavel. Sus, pe peretele pridvorului, este pictata scena \"Adormirea Maicii Domnului\". Pridvorul inchis este pictat.</p>\n\n<p>In pronaos sunt cate doua coloane mari pe fiecare parte care-l delimiteaza de naos. In naos si pronaos lumina strabte prin cele doua ferestre duble asezate pe fiecare parte, prevazute cu grilaj metalic intre ele. Pridvorul inchis este luminat de cate o fereastra laterala si cate una dreapta-stanga in fata.</p>\n\n<p>Catapeteasma, executata in lemn de par poleit cu foita de aur, este de mare valoare artistica, sculptura fiind opera lui Anghel Dima din Bucuresti. Pardoseala bisericii este din parchet. Acoperisul este din tabla. Pridvorul inchis fiind construit mai inalt decat restul bisericii, are in partea superioara un rand de firide nepictate.</p>\n\n<p>Biserica cu hramul \"Adormirea Maicii Domnului\" adaposteste epitaful Mantuitorului brodat de maica Antonina in anul 1865, 85 de strane, policandrul si sfesnicele lucrate in 1928 la fabrica de laminat din Brasov.</p>"}, "docs/dobrogea/cocos": function(exports, require, module) {module.exports = "<h4 class=\"right\"><a href=\"/dobrogea\">Inapoi</a></h4>\n\n<h1>Manastirea Cocos</h1>\n\n<p>Date generale:</p>\n\n<ul>\n<li>25 vietuitori, viata de obste</li>\n<li>Hram: Sfanta Treime, Sfintii Zotic, Atal, Camasie si Filip (biserica mare), Sfantul Nicolae (paraclisul);</li>\n<li>Acces: DN 22/E87 Isaccea-Tulcea. Indicator, dupa 5 km de la Isaccea, 4,5 km spre S pana la Manastirea Cocos. Manastirea se afla la 6 km de Niculitel, 10 km SE de Isaccea si 35 km V de Tulcea</li>\n<li>Staret: ierom. Visarion Scutaru;</li>\n</ul>\n\n<p><figure class=\"center\"><img src=\"/images/cocos.jpg\" alt=\"\"></figure></p>\n\n<h3>Despre manastirea Cocos:</h3>\n\n<p>Manastirea Cocos se afla la 6 kilometri distanta de comuna Niculitel si la aproximativ 35 de kilometri vest de orasul Tulcea. Manastirea este condusa de o obste de calugari, avand drept hramuri Pogorarea Sfantului Duh (biserica mare) si Sfantul Ierarh Nicolae (paraclisul).</p>\n\n<p>Manastirea este asezata intr-un loc retras, la poalele unui deal invaluit in mireasma padurilor de tei. Odata, demult, de pe acest deal s-a auzit intr-o noapte cantecul unui cocos salbatic insotit de o bataie de toaca. Calugarii spun ca acest cantec se mai aude si astazi, uneori.</p>\n\n<p>Prima atestare documentara a unui asezamant religios in acest loc este din anul 1679, cand aflam despre existenta unui schit de sihastri, pradat de invaziile vremii.</p>\n\n<p>Manastirea Cocos exista din 1833, ctitori fiind calugarii Visarion, Gherontie si Isaia dinmanastirea Neamt, care au trecut pe la Muntele Athos, inainte de a se opri aici. Ei au venit pana la Isaccea, unde s-au si asezat.\nAcestia au cumparat o bucata de pamant si au construit o mica biserica din nuiele lipite cu pamant, fara turle si fara clopote, respectand legile musulmane de atunci.</p>\n\n<p>Aceasta biserica, cu reparatii facute in timp, a dainuit pana in 1910 cand a fost demolata. Pe locul fostului Altar a fost asezata o troita pentru aducere-aminte. Pentru ca era nevoie de un locas mai mare si mai trainic, parintele Visarion, devenit arhimandrit si staret al manastirii, construieste in 1853 o noua biserica din piatra si caramida, cu cheltuiala unui mocan ardelean instarit care, calugarindu-se, a donat manastirii intregul sau avut.</p>\n\n<p>Prima biserica a avut hramul \"Sfanta Treime\". Dupa razboiul de independenta s-au construit si cele 3 turle ale bisericii. Din 1862 pana in 1884 urmeaza ca staret Daniel, in timpul staretiei se ridica clopotnita masiva si monumentala inalta de 30 m, existenta si astazi. In jurul clopotelor sunt 6 firide. Tot Daniel a construit cladirea chiliilor dinspre vest din fata bisericii, in stil oriental, un pridvor si cerdac pe ambele parti, acoperite cu olane.</p>\n\n<p>In 1959 aceasta cladire a fost declarata monument istoric. Celelalte chilii construite de staretii Visarion si Daniel au fost demolate in 1910, odata cu cele doua biserici, dupa ce se incercase fara succes, consolidarea bisericii in 1853.</p>\n\n<p>In 1909 devine staret arhimandritul Roman Sorescu, calugarit la Ciolanu si in 1910 termina constructia din partea de rasarit unde azi este staretia, paraclisul, bucataria si trapeza.</p>\n\n<p>La 23 aprilie 1910 episcopul Nifon Niculescu pune temelia celor 24 chilii noi ce se leaga de clopotnita dupa planul intocmit de arhitectul Toma Dobrescu si care la capatul dinspre rasarit se termina cu o frumoasa cladire cu doua etaje in care, in prezent, este muzeul.</p>\n\n<p>La 1 septembrie 1911 se pune temelia noii biserici, ale carei ziduri nu sunt afectate de cutremurul din 28 mai 1912. Lucrata de pietrari italieni dupa planurile arhitectului bucurestean Toma Dobrescu, este terminata in 1913.</p>\n\n<p>Odata cu inceperea razboiului in 1916, o mare parte din cei 86 calugari care existau in 1914 au pornit in bejenie impreuna cu staretul, luand cu ei majoritatea obiectelor de valoare pe care la intoarcere nu le-au mai adus in totalitate. Staretul Roman Sorescu inceteaza din viata in 1919 la numai 45 de ani.</p>\n\n<p>Intre 1926 si 1929 s-a construit corpul de cladiri din dreapta clopotnitei, cu etaj si pridvor. Aici a functionat o vreme o scoala de cantareti bisericesti, iar in prezent este casa de odihna a episcopiei. </p>\n\n<p>Cutremurul din 1940 a avariat puternic biserica. Incendiul din 27 iulie 1946 a ars clopotnita, topind si clopotele. Lucrarile de restaurare au inceput in 1954 si s-au terminat in 1956, in timpul pastoririi episcopului Chesarie Paunescu, fiind staret protosinghelul Damaschin Duros. Au fost restaurate si chiliile din vest. Sunt instalate in clopotnita doua noi clopote de 500 kg si 375 kg.</p>\n\n<p>In anul 1971, pe teritoriul comunei Niculitel, in apropierea manastirii, sapaturile arheologice au adus la lumina o cripta care adapostea moastele a patru sfinti mucenici, primele descoperite pe teritoriul tarii noastre. Acestia sunt crestini martiri din secolele III-IV. Inscriptiile in limba greaca din interiorul criptei atesta astazi moastele a patru martiri pentru Hristos: Zoticos, Attalos, Kamasis si Philippos. La doi ani de la descoperirea lor, Sinodul Bisericii Ortodoxe a decis ca moastele celor patru sa fie depuse in patru racle, la Manastirea Cocos din apropiere.</p>\n\n<p>La 17 ianuarie 1973 sunt aduse in manastire si asezate la loc de cinste in biserica, intr-o frumoasa racla, moastele sfintilor martiri Zotic, Atal, Camasie si Filip, ca o marturie incontestabila a credintei stramosesti. Praznuirea acestor martiri se face in fiecare an la data de 4 iunie.</p>\n\n<p>Biserica este o constructie masiva din piatra in forma de cruce. Absidele din naos sunt adanci si foarte largi. Naosul se delimiteaza de pronaos prin doi stalpi voluminosi, cate unul pe fiecare parte, lipiti de zid. Are un pridvor inchis in care se intra printr-o usa masiva in doua canaturi, inalta, cu geam in partea superioara. Are al doilea pridvor deschis, sustinut de 6 coloane masive.</p>\n\n<p>Naosul de 19 m latime in zona absidelor luminat de cate doua mari ferestre, pe fiecare parte, pronaosul lat de 9 m este luminat de cate o fereastra lata si inalta pe fiecare parte. Pronaosul si naosul au impreuna 24 m in lungime.\nBiserica are 3 turle octogonale, strapunse de cate 8 ferestre inguste si inalte. Turla de pe naos este foarte masiva si inalta. Celelalte doua mai mici sunt asezate pe fiecare parte a pridvorului.</p>\n\n<p>In exterior, peretele din dreapta naosului are o firida inalta, pictata. La fel o firida inalta si pictata este pe zidul din rasaritul altarului.\nPictura bisericii a inceput in toamna anului 1914, executata de pictorul italian F. da Biasse in stil neobizantin si s-a terminat in 1916. A fost restaurata intre 1957 si 1960.</p>\n\n<p>Manastirea are un muzeu cu icoane vechi si obiecte de arta religioasa adunate din parohiile judetului Tulcea. Muzeul adaposteste si o colectie de carte veche, religioasa, in special romaneasca.</p>"}, "docs/dobrogea/halmyris": function(exports, require, module) {module.exports = "<h4 class=\"right\"><a href=\"/dobrogea\">Inapoi</a></h4>\n\n<h1>Manastirea Halmyris - o scoala duhovniceasca aparte</h1>\n\n<p>Date generale:</p>\n\n<ul>\n<li>6 vietuitori, viata de obste</li>\n<li>Hram: Sfintii Epictet si Astion (biserica mare, aflata in constructie si primul paraclis), Sfintii Montanus si Maxima (biserica din demisol)</li>\n<li>Acces: din Tulcea, pe DJ222C spre SE pana la Murighiol (46 km). La intersectia din centrul Murighiolului se continua catre stanga, spre Dunavatu de Jos, pe DC9, drum pietruit. La 1,5 km de la iesirea din Murighiol, pe partea stanga a drumului, se afla ruinele cetatii Halmyris, langa care este situata manastirea</li>\n</ul>\n\n<p><figure class=\"center\"><img src=\"/images/halmyris.jpg\" alt=\"\"></figure></p>\n\n<h3>Despre manastirea Halmyris</h3>\n\n<p>Halmyris, nume ca din povesti. O poveste antica care s-a scris, acum mai bine de 1700 de ani, in aceste locuri ale provinciei Scythia Minor - Dobrogea de astazi. S-a scris cu sangele Martirilor Epictet, preotul si Astion, monahul. S-a marturisit in perioada sangeroaselor persecutii dezlantuite impotriva crestinilor de catre imparatul Diocletian (284-305) si coregentii sai.</p>\n\n<p>Orasul Halmyris apare mentionat inca din secolul I d. Hr. ca fiind situat la varsarea Dunarii in mare, in apropierea lacului Razelm (care se numea in trecut Halmiris, adica apa sarata) un fost un golf al Marii Negre. Astfel pozitionata, aceasta cetate a fost un important centrucomercial si militar alImperiului Roman, fiind la frontiera de nord a acestuia, dar si la intersectia drumurilor terestre, fluviale si maritime. Ruinele fortaretei romano-bizantine care a apartinut cetatii Halmyris, se gasesc intre doua localitati ale judetului Tulcea, Murighiol si Dunavatul de Jos. Tot aici, intr-un santier arheologic deschis in anul 1981, in urma unor sapaturi efectuate de o echipa romano-americana, a fost descoperita o Bazilica Episcopala in anul 2000. Un an mai tarziu, la praznuirea Adormirii Maicii Domnului, in cripta de sub altarul bazilicii, au fost descoperite sfintele moaste  ale celor doi Martiri, Epictet si Astion.</p>\n\n<p>Nimic din ceea ce se poate vedea astazi in aceste locuri nu tradeaza existenta comorilor nepretuite care au stat ascunse aici. Pamant arid, vegetatie salbatica, maracini, scaieti, praf abundent, arsita, desert cat vezi cu ochii. Locuri uitate de lume, dar nu si de Dumnezeu care-Si ascunde cu grija darurile pazite prin Harul Sau si le scoate la iveala atunci cand, din credinta celor care vor sa se foloseasca de ele, izvorasc fapte bineplacute Lui: se inalta o Troita, se infiinteaza o Manastire, se ridica o Catedrala  - cea mai mare a Dobrogei - se organizeaza procesiuni si pelerinaje.</p>\n\n<p>Credinciosii vin in aceasta oaza duhovniceasca mai ales la praznicul din zilele de 7 si 8 iulie. Sfintii Mucenici ne cheama sa ne rugam impreuna cu ei. Dar pana sa ajungem la locul de intalnire, strabatem cu autocarele distanta Tulcea - Murighiol, intonand cantari ortodoxe. Bucuria tulcenilor si a altor pelerini isi face cunoscuta prezenta. Raclele cu moastele sfintilor mucenici sunt intampinate la Troita din localitatea Murighiol.</p>\n\n<p>La 2 kilometri de comuna Murighiol, in vecinatatea ruinelor cetatii Halmyris, unde au fost facute in anul 2001 importante descoperiri arheologice, se construieste Manastirea Halmyris care se doreste a fi un lacas in concordanta cu tipologia traditionala specifica bisericii ortodoxe.</p>\n\n<p>Mentionam ca autoritatile administratiei publice locale ale comunei Murighiol nu dispun de fonduri necesare efectuarii lucrarilor de constructii in prima faza, terasamente si fundatii.</p>\n\n<p>In acest sens este necesara alocarea unei sume din Fondul de rezerva bugetara la dispozitia Guvernului, prevazut in bugetul de stat pe anul 2006, pentru judetul Tulcea si alocarea acesteia bugetelor locale ale comunelor Frecatei si Murighiol.</p>\n\n<p>Fata de cele prezentate, a fost promovata prezenta Hotarare a Guvernului privind alocarea unei sume din Fondul de rezerva bugetara la dispozitia Guvernului, prevazut in bugetul de stat pe anul 2006, pentru judetul Tulcea.</p>"}, "docs/maramures": function(exports, require, module) {module.exports = "<h1>Maramures</h1>\n\n<p><br><br>        </p>\n\n<h4>\n    <ul>\n        <li><a href=\"/maramures/barsana\">Barsana</a></li>\n        <br>\n        <li><a href=\"/maramures/sapantaperi\">Sapanta Peri</a></li>\n        <br>\n        <li><a href=\"/maramures/sfantatreime\">Sfanta Treime - Prislop</a></li>\n    </ul>\n</h4>"}, "docs/maramures/barsana": function(exports, require, module) {module.exports = "<h4 class=\"right\"><a href=\"/maramures\">Inapoi</a></h4>\n\n<h1>Manastirea Barsana</h1>\n\n<p>Date genrale:</p>\n\n<ul>\n<li>14 vietuitoare, viata de obste</li>\n<li>Hram: Soborul celor 12 Apostoli</li>\n<li>Acces: DJ186 Sighetu Marmatiei-Vadu Izei-Oncesti-Barsana</li>\n<li>Stareta: stavrofora Fiiofteia Oltean</li>\n</ul>\n\n<p><figure class=\"center\"><img src=\"/images/barsana.jpg\" alt=\"\"></figure></p>\n\n<h3>Despre manastirea Barsana:</h3>\n\n<p>Manastirea Barsana, asezata pe Valea Izei, este o icoana a sufletului crestin ortodox maramuresean, o speranta pentru un viitor binecuvantat, este un loc sfant unde natura se uneste cu Biserica in Liturghie cosmica.</p>\n\n<p>Ceea ce fascineaza la Manastirea Barsana, dincolo de duhul locului de buna randuiala monahala, este desavarsita unitate stilistica si simtul artistic fara gres care guverneaza intregul asezamant, pe linia unei traditii imbogatite prin evlavie creatoare. Puritatea liniilor de la Barsana e ca o tamada pentru ochi si pentru inima: filocalie (iubire de frumos) mladiata in lemn!</p>\n\n<p>Apartinand de Episcopia Ortodoxa Romana a Maramuresului si Satmarului, Manastirea Soborul Sfintilor Apostoli din Barsana este situata la 22 de km sud-est de municipiul Sighetul Marmatiei, la iesirea din Barsana, spre podul Slatioarei, unde spatiile dumbravilor largi ale Izei se stramteaza, spre localitatea Stramtura, fiind cel mai stramt vad al Izei. De la kilometrul 17 al Drumului Judetean 186, trecand pe sub o frumoasa poarta maramureseana, se rasuceste in sus aleea care duce lin spre manastire.</p>\n\n<h3>Manastirea Barsana - de-a lungul vremii</h3>\n\n<p>Localitatea Barsana este o asezare straveche, situata pe malul drept al raului Iza, la o departare de 20 kilometri spre sud-est de municipiul Sighetul Marmatiei. Daca sapaturile arheologice au scos la iveala relicve care arata ca aici au existat asezari omenesti inca din epoca hallstattiana, in izvoarele scrise, localitatea Barsana este atestata incepand cu 1326 cand, la 26 septembrie, regele Carol Robert emite o diploma prin care sunt intarite drepturile de posesiune asupra mosiei Barsana, pentru cneazul Stanislau Barsan, care avea aceasta mosie cu drept de mostenire.</p>\n\n<p>Mai tarziu, asa cum reiese din diplomele emise de regele Sigismund de Luxemburg la 30 aprilie si respectiv 21 iulie 1390, proprietarii mosiei Barsana erau Voievozii Balcu si fratele sau Drag.</p>\n\n<p>La Barsana au existat doua vetre monahale, la aproximativ 8-9 km departare una de alta: una in partea sud-estica a hotarului, in locul numit Valea Slatinei, iar alta in partea sud-vestica a hotarului, pe dealul Humana, la izvoarele vaii, care astazi se numeste Valea Hotarului, iar in documentele secolului al XIV-lea e amintita cu numele Valea Manastirii.</p>\n\n<p>Manastirea de pe dealul Humana este aestata documentar de o diploma din 21 iulie 1390. Pana in prezent nu se cunosc alte documente care sa ateste existenta acestei manastiri. Dupa traditie Manastirea din Humana a disparut in secolul al XVIII-lea, cand, prin actiunile uniatiei, au fost distruse mai multe manastiri de pe teritoriul Transilvaniei.</p>\n\n<h3>Manastirea Barsana - Manastirea de pe Valea Slatinei</h3>\n\n<p>Istoricul acestei manastiri incepe cu o sihastrie, care a existat in Valea Slatinei, in locul numit La Parul Calugarului. Este greu de stabilit data la care a luat fiinta aceasta sihastrie, totusi traditia spune ca manastirea din Valea Slatinei a fost \"mai veche, mai mare si mai importanta decat cea din Humana\".</p>\n\n<p>Viata monahala in sihastria din Valea Slatinei se pierde in negura vremurilor, inceputul ei poate ca a avut loc in secolul al XIII-lea sau in primii ani ai secolului al XIV-lea. Cu timpul, in jurul acestei sihastrii s-au adunat calugari si frati, care si-au facut acolo chilii si biserica de lemn si asa cum s-au petrecut lucrurile cu majoritatea manastirilor de pe teritoriul romanesc, si aici, modesta sihastrie a devenit manastire.</p>\n\n<p>La Parul Calugarului, manastirea era foarte izolata, se afla adancita intr-o padure de foioase de pe un deal situat la mare departare de localitate. Accesul la manastire era ingreunat si din cauza raului Iza, peste care nu exista o punte de trecere in apropiere. De aceea, in a doua jumatate a secolului al XIV-lea, manastirea a fost mutata din Valea Slatinei intr-un loc din dreapta Izei, numit pe atunci Podurile Stramtorii, iar dupa mutarea manastirii in acest loc, platoul a primit numele Podurile Manastirii.</p>\n\n<p>Dupa traditie, mutarea manastirii a fost facuta de catre un voievod, iar acesta nu putea fi altul decat Balcu Voda care a condus Tara Maramuresului timp de treizeci de ani fiind ultimul mare voievod al Maramuresului. In sprijinul acestei ipoteze pledeaza si faptul ca voievozii Balcu si Drag erau buni crestini ortodocsi si ctitori de asezaminte sfinte; printre altele, ei au ridicat manastirea Peri la rangul de stavropighie patriarhala, au construit biserica de piatra de la manastirea Peri iar in 1364 au ctitorit biserica din Deal de la Ieud, care in traditie poarta numele voievodului Balcu - Biserica Balcului.</p>\n\n<p>Voievozii Balcu si Drag, carora li s-au alaturat si boierii din sat, au inzestrat manastirea cu terenuri arabile, fanete, paduri si alte bunuri, fiind in acest fel ctitorii manastirii iar Manastirea Barsana poate fi numita, pe drept cuvant, manastire voievodala.</p>\n\n<p>Treptat, averile manastirii s-au marit, dar a sporit si prestigiul ei ca vatra de spiritualitate romaneasca. Aici se pregateau preoti, cantori, zugravi. Cu toate interdictiile impuse de regimurile straine, Manastirea Barsana tinea legaturi cu marile centre ortodoxe din Tara Romaneasca si Moldova, de unde se procurau carti de slujba si invatatura, nu numai pentru trebuintele manastirii ci si pentru parohiile invecinate.</p>\n\n<p>Din anul 1735, cand episcopul Maramuresului Dosoftei Teodorovici, care isi avea resedinta la Manastirea Uglea, a fost asasinat, pana in 1740, cand episcop al Maramuresului era Gavril Stefanca de Barsana, resedinta Episcopiei Ortodoxe Romane a Maramuresului a fost la Manastirea Barsana. Episcopia Ortodoxa Romana a Maramuresului a fost desfiintata, oficial, in 1740, dar si dupa aceasta data preotii, calugarii si credinciosii maramureseni au ramas statornici in credinta stramoseasca.</p>\n\n<p>In timpul actiunilor uniatiei din jurul anului 1700 si perioadei care a urmat, Maramuresul a ramas o adevarata cetate inexpugnabila a Ortodoxiei iar Manastirea Barsana a avut un rol important in apararea legii stramosesti din acea perioada atat de grea din istoria Bisericii Ortodoxe din Transilvania. Chiar in conditiile presiunilor generate de extinderea oficiala a unirii religioase a romanilor cu Biserica Romei asupra locasurilor de cult ortodox din zona, manastirea va rezista pana la 1791.</p>\n\n<p>La 12 iulie 1791 manastirea a fost desfiintata, calugarii au fost alungati si s-au refugiat in Moldova la Manastirea Neamt. Atunci manastirea a fost devastata, chiliile si cladirile anexe distruse, averea confiscata: o parte a averii a trecut in proprietatea statului si predata manastirii greco-catolice de la Cernoc iar, alta, inclusiv locul unde a fost manastirea, a devenit proprietate a bisericii parohiale din Barsana.</p>\n\n<p>Dupa desfiintarea manastirii, pe vatra manastirii n-au dainuit decat biserica si staretia. Pentru a feri biserica de profanare si distrugere, credinciosii din Barsana au mutat-o, in 1806, chiar in vatra satului, in locul numit Podurile Jbarului, unde se mai poate vedea si azi. O data cu mutarea bisericii, a fost dusa in sat si staretia. In aceasta casa a functionat scoala confesionala romaneasca in timpul renumitului dascal Fabian.</p>\n\n<h3>Manastirea Barsana - Manastirea \"Soborul Sfintilor Apostoli\"</h3>\n\n<p>Locul pe care a fost manastirea era bine gospodarit in timpul cand se afla in posesiunea parohiei din Barsana. Pe el se afla o livada frumoasa cu pomi fructiferi, fanete si araturi. Dupa al doilea razboi mondial, locul a fost confiscat de la parohie, partea de langa drum a fost data la mai multe familii, care si-au construit acolo locuinte si astfel s-a constituit pe acel teren un adevarat catun de case noi. Partea terenului manastirii, care este situata mai sus, pe terasa, a ramas in continuare libera, locul a fost pastrat de Dumnezeu pentru ca pe el sa se intemeieze o noua manastire.</p>\n\n<p>Amintirea vechii manastiri n-a disparut din memoria credinciosilor, dar nici dorinta de a avea alta in loc. Timpurile si evenimentele au fost impotriva acestei aspiratii. Inainte de Marea Unire din 1918, Maramuresul, ca si intreaga Transilvanie, se afla sub stapanirea Imperiului habsburgic, ostil bisericilor si manastirilor ortodoxe romanesti.</p>\n\n<p>Intre cele doua razboaie mondiale multe parohii au revenit la Ortodoxie si, in 1937, s-a reinfiintat Episcopia Ortodoxa Romana a Maramuresului. Atunci, s-a pus problema readucerii bisericii si staretiei pe locul de odinioara si reinfiintarea manastirii, dar a urmat Dictatul de la Viena care a destramat si aceste vise. Dupa al doilea razboi mondial a urmat regimul comunist ateu, care se opunea infiintarii de noi manastiri. Astfel dorinta aceasta s-a tot amanat, dar niciodata nu s-a stins.</p>\n\n<p>Reinfiintarea manastirii, o nazuinta mai veche a credinciosilor, nu s-a putut concretiza decat dupa 1989, cand barsanestii au luat hotararea sa ridice o noua manastire pe locul unde a fost cea veche si, in 1991, au adunat materialul lemnos pentru biserica.</p>\n\n<p>In 1992, Prea Sfintitul Justinian, intaistatatorul Episcopiei Ortodoxe Romane a Maramuresului si Satmarului, insotit de un grup de preoti si diaconi, a vizitat locul unde a fost Manastirea Intrarea Maicii Domnului in Biserica. S-a oprit pe locul unde, in urma cu cateva sute de ani, a fost vechea biserica, a ingenunchiat cu adanca evlavie, a rostit o rugaciune chemandu-i ca mijlocitori pe Sfantul Ierarh Iosif Marturisitorul din Maramures si pe episcopul Gavril Stefanca, s-a ridicat si a spus ca crede ca aici se va ridica o noua manastire.</p>\n\n<p>In 1993, Prea Sfintitul Justinian, Episcopul Maramuresului si Satmarului a sfintit piatra de temelie a noii biserici a manastirii. S-a stabilit ca manastirea va avea hramul Soborul Sfintilor 12 Apostoli. In ziua de miercuri, 30 iunie 1993, s-a praznuit pentru prima data hramul noii manastiri. In aceeasi zi, in cuvantul de invatatura adresat multimii de credinciosi, Prea Sfintitul Justinian a amintit hotararea ca la Barsana va fi manastire de maici.</p>\n\n<p>In ziua de joi, 30 iunie 1994, asa cum rezulta si din insemnarea de pe Sfanta Evanghelie, a fost sarbatorit hramul manastirii. Liturghia arhiereasca a fost oficiata de Prea Sfintitul Justinian, Episcopul Maramuresului si Satmarului, inconjurat de un numeros sobor de preoti si diaconi. In acest cadru sarbatoresc, Prea Sfintitul Justinian a prezentat-o pe monahia Filofteia Oltean ca viitoare stareta a manastirii. Totodata diaconul Ioan Stoica a fost hirotonit intru preot si a fost numit, in mod provizoriu, preot slujitor al manastirii.</p>\n\n<p>La inceput, lucrarile au fost supravegheate de parintele Gheorghe Urda, parohul Barsanei. In 1994, Dumnezeu a adus-o sub cerul Maramuresului, de la Manastirea Ramet, pe tanara monahie Filofteia Oltean, randuita ca stareta a noului asezamant. Fire energica si intreprinzatoare, cu simt artistic si zel ctitoricesc, Maica Filofteia a chivernisit si a vegheat, pana la cele mai marunte detalii, ridicarea intregului ansamblu manastiresc, inchinat Soborului Sfintilor 12 Apostoli - 30 iunie.</p>\n\n<p>Reconstructia Manastirii Barsana este o punte intre trecut si viitor. Folosind ca sursa de inspiratie traditia locala, toate cladirile din incinta manastirii sunt executate din lemn de stejar si pietre de rau, fiind ridicate de mesteri din localitate, asigurand astfel continuitatea artei cioplirii si imbinarii lemnului.</p>\n\n<h3>Manastirea Barsana - proiectul Manastirii \"Soborul Sfintilor Apostoli\"</h3>\n\n<p>Barsana a fost gandit ca un ansamblu arhitectural, elaborat de arhitectul Dorel Cordos, care se va dezvolta in timp si spatiu in functie de posibilitatile financiare ale locanicilor, ale sponsorilor si de nevoile spirituale ale obstii monahale.</p>\n\n<p>Proiectul cuprinde urmatoarele obiective: Biserica in stil marmuresean, Altarul de vara, Aghiasmatarul, Staretia, Casa maicilor, Casa artistului, Casa duhovnicului, Casa mesterilor, Praznicarul cu trapeza, Muzeul, turnul-clopotnita, Poarta maramureseana, Monumentul funerar, drumul de acces, loc pentru aprinderea lumanarilor, troite, lac, pod peste lac, alei care duc la diferite obiective, parcare, si altele.</p>\n\n<h3>Manastirea Barsana - arhitectura ansamblului monahal</h3>\n\n<p>Intrarea in incinta propriu-zisa se face pe sub semetul turn-clopotnita, dincolo de care, pe partea dreapta, biserica tasneste mladioasa spre cer - pana nu demult, cea mai inalta biserica de lemn din lume.</p>\n\n<p>De la biserica porneste aleea pietruita si strajuita de flori ce duce spre Staretie, constructie supraetajata de o cuceritoare fantezie arhitectonica, remarcabila transpunere creatoare a stilului maramuresean al bisericilor de lemn. Pe pajistea verde din stanga aleii se afla un Altar de vara si un Aghiasmatar, iar pe dambul din dreapta, la oarecare distanta, Casa Artistului - o fermecatoare vila destinata sa gazduiasca, pentru repaus si creatie, carturari si mesteri ai frumusetii sacre.</p>\n\n<p>In spatele Staretiei si pe latura dinspre sosea se afla chilii, ateliere si o seama de anexe gospodaresti, iar in partea de sud-est a manastirii, in imediata vecinatate a turnului-clopotnita, se afla Muzeul.</p>\n\n<h3>Manastirea Barsana - Biserica veche \"Intrarea in Biserica a Maicii Domnului\"</h3>\n\n<p>O prima biserica modesta de lemn a avut Manastirea Barsana in timpul cand se afla in Valea Slatinei. Aceasta a disparut, probabil in a doua jumatate a secolului al XIV-lea, cand manastirea a fost mutata din Valea Slatinei in locul numit, de atunci inainte, Podurile Manastirii. Aici a fost construita alta, tot de lemn, care a durat, in aceasta forma, pana in timpul navalirii tatarilor din 1717.</p>\n\n<p>La 2 septembrie 1717, dupa pradarea localitatii Sighet, tatarii ajung in Barsana, unde au fost atacati de 300 de militieni si tarani. Drept razbunare, pentru noul atac, tatarii „au nimicit totul in calea lor pana la Borsa”. Atunci au dat foc Manastirii Barsana, bisericilor din Cuhea, Dragomiresti, Moisei si la multe case de prin satele maramuresene.</p>\n\n<p>Curand, credinciosii maramureseni si-au construit, in locul celor distruse, biserici noi: cei din Cuhea in 1718, cei din Dragomiresti in 1722. In 1720 cei din Barsana au construit si ei o biserica de lemn de stejar adus din padure de pe Dealul lui Filip, deal care se afla aproape de manastire. Aceasta biserica exista si astazi.</p>\n\n<p>La 12 iulie 1791 cand manastirea a fost desfiintata iar calugarii alungati, atunci asezamantul a fost devastat, chiliile si cladirile anexe distruse, averea confiscata: o parte a averii a trecut in proprietatea statului si predata manastirii greco-catolice de la Cernoc (Munkaci) iar, alta, inclusiv locul unde a fost manastirea, a devenit proprietate a bisericii parohiale din Barsana.</p>\n\n<p>Pe vatra manastirii au mai ramas doar biserica si staretia. Pentru a feri biserica de profanare si distrugere, credinciosii din Barsana au mutat-o, in 1806, mai aproape de sat, in locul numit Podurile Jbarului. Acolo se afla si in ziua de astazi.</p>\n\n<p>Vechea biserica, avand hramul Intrarea Maicii Domnului in Biserica, face parte din grupul bisericilor de tip maramuresean, este martorul unui fenomen frecvent in cazul bisericilor si caselor de lemn, cel de stramutare (mutarea bisericilor). Este unica biserica din cele opt aflate pe lista monumentelor UNESCO care, in 1806, a fost mutata pe actualul amplasament.</p>\n\n<p>Planul bisericii este compus din pridvor supraetajat pe latura de vest, pronaos tavanit si naos acoperit cu bolta semicilindrica suprainaltata care laolalta formeaza un corp dreptunghiular caruia i se adauga absida altarului, decrosata, cu cinci laturi scurte la exterior.</p>\n\n<p>Vazuta dinafara biserica pare de tip sala, dar interiorul este divizat prin pereti despartitori potrivit ritualului ortodox traditional. Pe un soclu scund de piatra se ridica peretii din barne masive de stejar asezate in randuri orizontale si imbinate prin taieturi in \"coada de randunica\"; barnele de la partea superioara a peretilor sunt prelungite spre exterior si taiate in trepte formand console pe care se sprijina sarpanta nivelului inferior al acoperisului si au totodata un rol estetic in conturarea siluetei arhitectonice a monumentului.</p>\n\n<p>Peretii exteriori sunt decorati cu motivul franghiei rasucite, sculptat in relief. Acoperisul are poala dubla, astfel bolta cilindrica a naosului este luminata de ferestrele dintre cele doua stresini.</p>\n\n<p>Cu ocazia aducerii bisericii in sat, monumentul a primit o noua haina picturala, autorii fiind doi zugravi maramureseni, Hodor Toader din Viseu de Mijloc si Plohod Ion din Dragomiresti. Pictura ce se pastreaza in bune conditii este o realizare in spirit popular, o transpunere in maniera proprie zugravilor maramureseni a unor compozitii si motive deorative de stil baroc.</p>\n\n<p>Aceasta biserica este un valoros monument istoric si se asteapta ca ea sa fie readusa pe locul de odinioara si incadrata in complexul actual al Manastirii Barsana.</p>\n\n<h3>Manastirea Barsana - Biserica noua \"Soborul Sfintilor Apostoli\" (1993-1995)</h3>\n\n<p>Biserica este amplasata in partea estica a complexului monahal fiind destinata savarsirii cultului, ea este in acelasi timp centrul spiritual si compozitional al intregului ansamblu. Tinand seama de mai multe criterii specifice acestei manastiri, biserica a fost proiectata in urmatoarele dimensiuni: 22.57 metri lungime, 12.20 metri latime si 57 metri inaltime, numarandu-se printre cele mai inalte constructii de lemn din Europa. Constructia are doua nivele: demisol si parter.</p>\n\n<p>Demisolul reprezinta biserica primara, are o singura intrare si este luminat de douasprezece ferestre mici. Demisolul adaposteste paraclisul mare al manastirii. Altarul este separat printr-o catapeteasma construita din lemn sculptat cu ornate specifice artei maramuresene. Tavanul este sustinut de patru coloane de beton. Demisolul este construit din beton armat, cu pereti grosi si placati in exterior cu piatra de rau si este imbracat in haina picturala, realizata de pictorul Ioan Botis, in tehnica fresca.</p>\n\n<p>Biserica propriu-zisa se afla la parter, are un plan treflat, cu doua abside poligonale. Absidele laterale se formeaza din naos in apropierea iconostasului. Biserica concentreaza toate spatiile caracteristice unui lacas de cult ortodox: pridvor, pronaos, naos, altar.</p>\n\n<p>Pridvorul este construit din lemn de stejar sculptat cu ornamente specifice artei maramuresene. In pridvor, care este situat deasupra demisolului se ajunge pe doua scari laterale.</p>\n\n<p>Turnul este plasat deasupra pronaosului si este prevazut cu foisor si coif prelung. Acoperisul de sindrila de brad lucrata in stilul numit \"coada de randunica\" are streasina dubla si formeaza o adevarata dantelarie in lemn.</p>\n\n<p>Crucea de fier, avand inaltimea de sapte metri si greutatea de cinci sute de kilograme a fost ridicata pe biserica manastirii in ziua de joi, 10 august 1995. Biserica isi asteapta pictorul pentru fi impodobita cu o haina picturala traditionala.</p>\n\n<h3>Manastirea Barsana - Altarul de vara (1996-1997)</h3>\n\n<p>Altarul de vara este asezat in partea centrala a spatiului care formeaza incinta manastirii. Aici se oficiaza Sfintele Liturghii arhieresti la praznuirea hramului. Tot aici se oficiaza sfintele slujbe in duminici si sarbatori din anotimpurile calde, precum si alte slujbe importante.</p>\n\n<p>Altarul de vara este elementul de arhitectura in jurul caruia pivoteaza intregul ansamblu monahal. Este elementul de arhitectura relativ nou, care prelungeste tematica arhitecturii populare specifica Maramuresului istoric. Continuand arta cioplirii lemnului prin mesteri locali, grefata pe un limbaj modern, prin aceasta lucrare s-a obtinut un spatiu contemplativ, in care trecutul devine viabil si reprezinta o punte de legatura cu viitorul.</p>\n\n<p>Fundatia este construita din beton ciclopian, si este placata cu piatra de rau. Structurat pe o forma octogonala cu diagonala de opt metri si o inaltime de douazeci de metri, altarul este incununat de o cupola de lemn care se sprijina pe doua patrate cu 45 de grade fata de axul central. Sarpanta este executata din lemn de brad, iar invelitoarea din dranita.</p>\n\n<h3>Manastirea Barsana - Aghiasmatarul</h3>\n\n<p>Aghiasmatarul completeaza ansamblul manastiresc si se afla intr-un loc central. Are patru intrari, iar in mijloc o fantana. Acesta evoca constructiile anexa, de pe langa basilicile paleocrestine in care se savarsea si se pastra aghiasma.</p>\n\n<p>La aghiasmatar se ajunge pe alei pavate cu dale de andezit. Aghiasmatarul are o suprafata de 32 de metri patrati si noua metri inaltime, iar pardoseala este din placi de andezit.</p>\n\n<h3>Manastirea Barsana - Staretia (1995-1996)</h3>\n\n<p>Staretia, constructie supraetajata de o cuceritoare fantezie arhitectonica, remarcabila transpunere creatoare a stilului maramuresean al bisericilor de lemn, este amplasata in partea de sud-vest a complexului manastiresc si este construita in patru nivele: demisol, parter, etaj si mansarda. Demisolul este din beton armat, cu peretii avand grosimea de patruzeci de centimetri, care sunt placati in exterior cu piatra de rau.</p>\n\n<p>Parterul are trei intrari: una dinspre est, alta dinspre nord si a treia dinspre vest. In jur are patru terase orientate dupa punctele cardinale: estica, sudica, vestica si nordica. La terasa estica se ajunge pe doua scari. In aceasta terasa se afla intrarea principala, prin care se ajunge intr-un hol. Acesta se uneste cu coridorul care vine de la intrarea nordica. Din acestea se intra in birou, trapeza si bucatarie.</p>\n\n<p>La etaj se afla chilii, bilioteca si paraclisul, care se ridica si la mansarda. La mansarda sunt chilii, paraclis, sala de lectura. Acoperisul este din sindrila de brad lucrat in acelasi stil ca si cel de la biserica.</p>\n\n<h3>Manastirea Barsana - Casa Maicilor</h3>\n\n<p>Casa maicilor se afla in partea de nord-vest a ansamblului manastiresc si este o cladire cu trei nivele: demisol, parter si etaj. La demisol se afla un depozit si centrala termica iar la parter si etaj sunt chilii.</p>\n\n<p>Casa maicilor are in fatada, la fiecare nivel, terase impodobite cu flori.</p>\n\n<h3>Manastirea Barsana - Casa Artistului</h3>\n\n<p>Casa artistului a fost construit in partea de nord si putin mai sus pe coasta, urcarea se face pe trepte. Aici sunt gazduiti oameni de creatie, oameni cu preocupari artistice. Casa este asezata pe o fundatie de beton placata in exterior cu pietre de rau si are doua nivele construite din lemn: parter si etaj.</p>\n\n<p>Parterul are in fata o terasa, din care se intra intr-un hol, iar de aici in trei incaperi: dormitor, baie si un living.</p>\n\n<h3>Manastirea Barsana - Casa Duhovnicului (1998)</h3>\n\n<p>Avand in vedere ca la manastire este nevoie de un duhovnic, savarsitor al Sfintelor Taine, s-a ridicat o casa speciala pentru el. Aceasta a fost amplasata in partea vestica a complexului.</p>\n\n<p>Are in fata terasa, iar interiorul cuprinde un hol si trei incaperi.</p>\n\n<h3>Manastirea Barsana - Casa Mesterilor</h3>\n\n<p>Casa mesterilor este o cladire in care se afla atelierele mesterilor si este amplasata in partea de sud-vest a ansamblului monahal. Este o cladire destinata spatiului productiv ce adaposteste mai multe ateliere, atat la parter, cat si la etaj.</p>\n\n<p>Fundatiile sunt continue din beton ciclopan, elevatia fiind realizata din beton armat, si este placat cu piatra de rau. Peretii parterului sunt realizati din boltari de ciment, iar etajul este construit din lemn de stejar. Sarpanta este executata din lemn de brad cu invelitoare de dranita.</p>\n\n<h3>Manastirea Barsana - Praznicarul si Trapeza</h3>\n\n<p>Cladirea are trei nivele: demisol, parter si etaj si este situata in partea vestica a ansamblului manastiresc. Demisolul cuprinde garaje, si depozit. La parter se afla trapeza, bucataria, camara si spalatoria.</p>\n\n<p>Etajul formeaza o imensa terasa deschisa. Prin destinatia ei se numeste de obicei praznicar. In cadrul ei se afla si o trapeza mare, in care pot servi masa cateva sute de persoane. Aici se serveste masa la praznuirea hramului.</p>"}, "docs/maramures/sapantaperi": function(exports, require, module) {module.exports = "<h4 class=\"right\"><a href=\"/maramures\">Inapoi</a></h4>\n\n<h1>Manastirea Sapanta Peri</h1>\n\n<p>Date generale:</p>\n\n<ul>\n<li>6 vietuitoare, viata de obste</li>\n<li>Hram: Sfintii Arhangheli Mihail si Gavriil</li>\n<li>Acces: DN19 Sighetu Marmatiei spre NV-Sapanta (18 km), la nord de Sapanta 1 km</li>\n<li>Stareta: monahia Agnia Ciuban</li>\n</ul>\n\n<p><figure class=\"center\"><img src=\"/images/sapantaperi.jpg\" alt=\"\"></figure></p>\n\n<h3>Despre manastirea Sapanta Peri:</h3>\n\n<p>Manastirea Sapanta Peri a fost infiintata in anul 1997, in hotarul satului Sapanta, din dorinta de a reinnoda traditia istorica a vechii Manastiri Sfantul Mihail, din Peri - Maramures, astazi pe teritoriul Ucrainei. Distrusa la inceputul secolului al XVIII-lea, Manastirea Peri a constituit un important centru bisericesc si cultural. Ctitorie a voievozilor Dragosesti, manastirea Sapanta Peri a fost supusa in anul 1391 sub jurisdictia directa a patriarhului de Constantinopol. Ctitorita de parintele paroh Grigore Lutai, Manastirea Sapanta Peri a primit, din anul 2005, o obste de maici, care a continuat lucrarile de constructie incepute anterior.</p>"}, "docs/maramures/sfantatreime": function(exports, require, module) {module.exports = "<h4 class=\"right\"><a href=\"/maramures\">Inapoi</a></h4>\n\n<h1>Manastirea Sfanta Treime - Prislop</h1>\n\n<p>Date generale:</p>\n\n<ul>\n<li>10 vietuitori, viata de obste</li>\n<li>Hram: Schimbarea la Fata, Sfanta Treime</li>\n<li>Acces: Moisei-Borsa-Pasul Prislop, la 20 km de Borsa sau Vatra Dornei-Iacobeni-Ciocanesti-Carlibaba-Pasul Prislop, la 60 km de Vatra Dornei</li>\n<li>Staret: arhid. Andrei Reziuc</li>\n</ul>\n\n<p><figure class=\"center\"><img src=\"/images/sftrpr.jpg\" alt=\"\"></figure></p>\n\n<h3>Depsre manastirea Prislop:</h3>\n\n<p>Manastirea Prislop este o manastire relativ noua. Constructia ei s-a inceput in urma cu 10 ani, ridicandu-se biserica de zid si corpul de chilii. Din anul 2008 s-a asezat aici o obste de calugari.</p>"}, "docs/moldova": function(exports, require, module) {module.exports = "<h1>Moldova</h1>\n\n<p><br><br>        </p>\n\n<h4>\n    <ul>\n        <li><a href=\"/moldova/barnova\">Barnova</a></li>\n        <br>\n        <li><a href=\"/moldova/secu\">Secu</a></li>\n        <br>\n        <li><a href=\"/moldova/sihastria\">Sihastria</a></li>\n    </ul>\n</h4>"}, "docs/moldova/barnova": function(exports, require, module) {module.exports = "<h4 class=\"right\"><a href=\"/moldova\">Inapoi</a></h4>\n\n<h1>Manastirea Barnova</h1>\n\n<p>Date generale:</p>\n\n<ul>\n<li>6 vietuitori, viata de obste</li>\n<li>Hram: Sfantul Mare Mucenic Gheorghe, Taierea Capului Sfantului Ioan Botezatorul</li>\n<li>Acces: din lasi spre Vaslui, pe DN24,10 km, dreapta (la Hanul irei Sarmale) pe DJ248d, 2,5 km;</li>\n<li>Staret: ierom. Paisie Furdui;  </li>\n</ul>\n\n<p><figure class=\"center\"><img src=\"/images/barnova.jpg\" alt=\"\"></figure></p>\n\n<h1>Despre manastirea Barnova:</h1>\n\n<p>Manastirea Barnova este ctitorita de Miron Barnovschi - Movila, domnitorul Moldovei (1626- 1629,1633), pe locul unei biserici de lemn, ridicate, in 1603, de Ieremia Movila, cu hramul Sfantul Gheorghe. Manastirea este terminata de domnitorul Eustratie Dabija, in anul 1662. In anul 1728, domnitorul Grigore al II-lea Ghica reface cladirile din incinta si inalta zidul de imprejmuire, prevazut cu creneluri si foisor de paza. Manastirea a functionat un timp ca biserica de parohie, iar intre 1945 si 1950 a fost manastire de maici. In iulie 1991 redevine manastire de calugari.</p>"}, "docs/moldova/secu": function(exports, require, module) {module.exports = "<h4 class=\"right\"><a href=\"/moldova\">Inapoi</a></h4>\n\n<h1>Manastirea Secu</h1>\n\n<p>Date generale:</p>\n\n<ul>\n<li>60 virtuitori, viata de obste</li>\n<li>Hram: Taierea Capului Sfantului Ioan Botezatorul</li>\n<li>Acces: din Targu-Neamt spre Poiana Largului, pe DN15B, 13,5 km, stanga pe DJ157F, 7 km;</li>\n<li>Staret: arhim. Vichentie Amariei;</li>\n<li>Adresa: com. Vanatori, 617500, jud. Neamt</li>\n</ul>\n\n<p><figure class=\"center\"><img src=\"/images/scu.jpg\" alt=\"\"></figure></p>\n\n<h3>Despre manastirea Secu:</h3>\n\n<p>Manastirea Secu este una dintre vechile vetre monahale ortodoxe din judetul Neamt. Aflata intre localitatile nemtene Vanatori si Pipirig, manastirea a fost construita in anul 1602, de catre marele vornic Nestor Ureche, tatal marelui cronicar Grigore Ureche, pe locul unei mici sihastrii, numita atunci \"Schitul lui Zosima\", asezamant intemeiat in anul 1564.</p>\n\n<h3>Manastirea Secu - scurt istoric</h3>\n\n<p>Manastirea Secu este o vatra monahala de intensa traire duhovniceasca, a carei vechime se ridica la aproape cinci sute de ani. In jurul anului 1500, pe domeniul feudal al Cetatii Neamt, pe valea paraului Secu, se aseaza un grup de sihastri care vor intemeia mai apoi, in anul 1530, sub conducerea ieroschimonahului Zosima, calugar de la Manastirea Neamt, schitul cu acelasi nume, \"Schitul lui Zosima\".</p>\n\n<p>Domnitorul Petru Rares (1527-1546) a cladit biserica Schitului Zosima pe locul actualei biserici a cimitirului manastirii. Schitul a fost ingradit cu zid de piatra in anul 1550, de catre doamna Elena, sotia voievodului, si de fiii sai. Din acest zid se mai pastreaza astazi o mica parte, la intrarea in manastire, in dreptul actualei biserici a cimitirului, unde, in urma cu cinci secole, fusese poarta de intrare in schit si clopotnita acestuia.</p>\n\n<p>Acelasi domnitor, anume Petru Rares, in prima lui domnie, a intarit stapanirea asupra pamanturilor ce apartineau mosiei Cetatii Neamt, daruindu-le calugarilor de pe valea paraului Secu. Episcopul Melchisedec Stefanescu, vorbind despre inceputurile Manastirii Secu, aminteste ca pana in anul 1910, pe zidul clopotnitei din manastire, in nisa unde se afla acum o fresca cu Sfantul Ioan Botezatorul, se gasea pisania originala de la biserica construita de voievodul Petru Rares, pisanie care s-a deteriorat, din cauza asprimii vremurilor.</p>\n\n<p>In vremea voievozilor Alexandru Lapusneanu (1552-1561; 1564-1568), Petru Schiopu (1574-1579; 1581-1591) si Aron Tiranul (1591-1595), schitul lui Zosima mai primeste cateva danii spre folosinta si intretinerea calugarilor sihastri din aceste locuri. Astfel, spre sfarsitul secolului al XVI-lea, schitul lui Zosima cunoaste o dezvoltare deosebita, mai ales din punct de vedere economic.</p>\n\n<p>In secolul al XVII-lea, Nestor Ureche, vornicul Tarii de Jos, tatal cunoscutului cronicar Grigore Ureche, impreuna cu sotia sa Mitrofana, ctitoresc manastirea de piatra, in forma de cetate dreptunghiulara, cu biserica mare in mijlocul zidurilor, careia ii aseaza drept hram \"Taierea capului Sfantului Ioan Botezatorul\", sarbatorit in fiecare an, la data de 29 august.</p>\n\n<p>Nestor Ureche ajunsese in randurile celor dintai boieri ai Moldovei, sub domnia lui Ieremia Movila, prin bogatia casei sale, catre care se indreptau veniturile a peste saptezeci de sate, dar si prin istetimea mintii. El avea demnitatea de \"mare vornic\", fiind judecatorul principal al tarii si \"mai marele curtii domnesti\".</p>\n\n<p>Marele boier a inzestrat aceasta ctitorie cu odoare, carti si mosii, asa cum erau inzestrate toate manastirile domnesti in vremea voievodului Ieremia Movila. Pe atunci in scaunul Mitropoliei Moldovei era Gheorghe Movila, fratele voievodului, egumen la Manastirea Secu fiind ieroschimonahul Dosoftei.</p>\n\n<p>Pisania originala, asezata pe peretele de sud al bisericii mari, scrisa in limba slavona, marturiseste urmatoarele: \"Cu vrerea Tatalui si cu ajutorul Fiului si cu savarsirea Sfantului Duh, cu rugaciunile Preacuratei Nascatoare de Dumnezeu si cu ale Sfantului Ioan Inaintemergatorul si cu ale tuturor sfintilor, cu bunavointa si ingaduinta dreptcredinciosului domnului nostru Io Ieremia Movila Voievod, cu mila lui Dumnezeu Domn Tarii Moldovei si a de Dumnezeu daruitilor sai fii Io Constantin si Alexandru Voievod si cu a celuilalt frate al sau Simeon Movila Voievod si a copiilor sai; si cu binecuvantarea fratelui domniei lor Preasfintitului Gheorghe Moghila, Mitropolitul Sucevei, cu buna ravna dumnezeiasca si cu adevarata avere de la Dumnezeu daruita a adevaratilor ctitori...</p>\n\n<p>... sau facut acest locas dumnezeiesc si sau zidit spre lauda lui Dumnezeu celui Inalt, in numele Sfantului Slavitului Prooroc Inaintemergatorul si Botezatorul lui Hristos Ioan si a cinstitei lui taieri, de smeritul si mult gresitul si nevrednicul rob al Stapanului Hristos, Nestor Ureche, Marele Vornic al Tarii de Jos si de Doamna lui Mitrofana si de copiii lui: Vasile si Grigore si de alti de Dumnezeu daruiti copii ai lor. Sfintilor parinti petrecatori din acest sfant locas ca sa va rugati lui Dumnezeu pentru noi mult gresitii robi ai lui Dumnezeu, Nestor Ureche si sotia sa Mitrofana si pentru tot neamul lor si pentru iertarea pacatelor lor in vecii vecilor. Amin. Si sau inceput a se zidi la anul 7110 (1602), iunie 7, si s-a ispravit in acelasi an, octombrie 5.\"</p>\n\n<p>Icoana Maicii Domnului numita \"Cipriota\", o icoana indeobste cunoscuta ca facatoare de minuni, este asezata in biserica cea mare din Manastirea Secu, alaturi de o alta nepretuita comoara, Moastele Sfantului Ierarh Varlaam al Moldovei. Icoana Maicii Domnului Indrumatoarea - Hodighitira, cunoscuta si sub denumirea de \"Cipriota\" a fost daruita de catre domnitorul Vasile Lupu renumitului carturar al vremii, Sfantului mitropolit Varlaam al Moldovei, ca semn de pretuire deosebita, in anul 1647. Numele icoanei se trage de la faptul ca icoana este adusa de domnitor din Insula Cipru, unde este posibil sa fi fost pictata intre anii 1541-1546.</p>\n\n<p>Intre anii 1647-1718, icoana Maicii Domnului a stat in Biserica Sfantul Nicolae din Cetatea Neamtului, supusa canonic, din anul 1646, de catre acelasi domnitor, Manastirii Secu. Deoarece in anul 1718 Cetatea Neamtului a fost distrusa din ordinul turcilor, in vremea domnitorului Mihail Racovita, obiectele mai importante ale Bisericii Sfantul Nicolae au fost aduse la Manastirea Secu, printre ele aflandu-se si Icoana Maicii Domnului Cipriota.</p>\n\n<p>Icoana Maicii Domnului a fost asezata in biserica Schitului Sfantul Nifon, unde a stat pana in anul 1758, cand aceasta este adusa in biserica cimitirului manastirii. Mult mai tarziu, abia in anul 1876, icoana va fi asezata in biserica cea mare, unde se afla si in prezent. La data de 20 iulie 1879, icoana Maicii Domnului Cipriota a fost imbracata in argint de catre boierul Nicolae Albu si sotia sa Maria, din Piatra Neamt. Tot in aceasta perioada, icoana va primi si o strana de lemn, in care ea se afla asezata si astazi, lucrata din fier si lemn bogat ornamentat, in stil baroc.</p>\n\n<p>Mitropolitul Varlaam a pastorit Mitropolia Moldovei intre anii 1632-1653, in timpul domnitorilor Alexandru Ilias, Miron Barnovschi, Moise Movila si Vasile Lupu. Mitropolitul cu viata sfanta a fost inmormantat in zidul de miazazi al bisericii Manastirii Secu. Pentru ravna sa in apararea dreptei credinte si pentru vietuirea sa, la propunerea Sinodului mitropolitan al Mitropoliei Moldovei si Bucovinei, in data de 12 februarie 2007, Sfantul Sinod al Bisericii Ortodoxe Romane a inscris in randul sfintilor din calendar pe invatatul Mitropolit Varlaam al Moldovei, cu zi de pomenire la 30 august. Sfintele sale Moaste sunt pastrate in biserica cea mare a Manastirii Secu, in pridvor.</p>"}, "docs/moldova/sihastria": function(exports, require, module) {module.exports = "<h4 class=\"right\"><a href=\"/moldova\">Inapoi</a></h4>\n\n<h1>Manastirea Sihastria</h1>\n\n<p>Date generale:</p>\n\n<ul>\n<li>90 vietuitori, viata de obste</li>\n<li>Hram: Nasterea Maicii Domnului</li>\n<li>Acces: din Targu-Neamt spre Poiana Largului, pe DN15B, 13,5 km stanga pe DJ157F, 10 km;</li>\n<li>Staret: arhim. Victorin Oanele</li>\n</ul>\n\n<p><figure class=\"center\"><img src=\"/images/sihastria.jpg\" alt=\"\"></figure></p>\n\n<h3>Despre manastirea Sihastria:</h3>\n\n<p>Manastirea Sihastria este asezata in partea de nord a judetului Neamt, la 22 km departare de orasul Targu Neamt, pe soseaua ce duce spre Vatra Dornei. Lasand in dreapta drumul Manastirii Neamt, si inaintand spre celelalte manastiri nemtene, mai se parcurg 15 kilometri. Aici, drumul paraseste soseaua principala, trece peste Ozana si patrunde spre apus, pe valea paraului Secu.</p>\n\n<p>Trecand pe langa Manastirea Secu, drumul se indreapta spre sud, valea devenind tot mai ingusta si mai singuratica. Dupa inca 3 km de drum se descopere in toata frumusetea ei, Manastirea Sihastria.</p>\n\n<p>De aici pornesc, prin munti, mai multe poteci. Dintre ele, cea mai frecventata este poteca ce urca la sud, spre schitul Sihla, cale de peste un ceas, de unde se poate ajunge la Manastirea Agapia, cat si la manastirile Varatec si Horaita prin poiana Ciungi.</p>\n\n<p>Desi nu in proportia marilor ctitorii voievodale, care au avut un rol insemnat in trecutul Moldovei medievale, Manastirea Sihastria, prin cele trei secole de existenta, evoca totusi cateva momente istorice de seama. In arhitectura manastirea continua cu fidelitate stilul clasic moldovenesc care, in ciuda atator innoiri si adaugiri, se mentine pana intr-o epoca asa de tarzie.</p>\n\n<p>In marile manastiri Neamt, Secu si Agapia se gaseau destui calugari dornici sa continue traditia Cuviosului Daniil Sihastrul si a altor pustnici renumiti. Codrii nestrabatuti din partea locului ofereau cele mai bune conditii; astfel, la inceputul secolului al XVII-lea traiau in imprejurimi numerosi sihastri.</p>\n\n<p>In aceste conditii, infiintarea unei \"sihastrii\" mai la indemana devenea in chip firesc o necesitate. Faptul fiind cunoscut de episcopul Ghedeon de Husi, ca ucenic al venerabilului mitropolit Varlaam Motoc, acesta intemeiaza in 1655 - fiind deja mitropolit al Moldovei - prima biserica a schitului Sihastria, pe care o inzestreaza apoi cu chilii si cele de trebuinta.</p>\n\n<p>Locul ales a fost \"poiana lui Atanasie\", care oferea conditii prilenice unei vieti de sihastrie, iar primii vietuitori, asa cum consemneaza pomelnicul ctitoricesc, au fost sapte sihastri din Manastirea Neamt retrasi mult mai inainte prin partile locului.</p>\n\n<p>Vremurile vitrege care au urmat si mai ales desele incursiuni ale tatarilor de la inceputul sec. al XVIII-lea au facut ca schitul Sihastria sa ajunga intr-o stare aproape de ruina. Indemnat de exemplul inaintasului sau, ca si de frumusetea locului, Episcopul Ghedeon de Roman construieste in anul 1734 o noua biserica mai trainica si incapatoare pe care o inchina Manastirii Secu din apropiere, dupa obiceiul vremii.</p>\n\n<p>In anul 1821 cetele eteristilor lui Alexandru Ipsilanti, urmarite de turci, se retrag in partile Moldovei, ajungand pana la Manastirea Secu. Lupta sangeroasa care a urmat s-a incheiat cu arderea si pradarea manastirilor din imprejurimi de catre turci, printre care si Sihastria. Schitul nu a ars in intregime. Tezaurul Sihastriei, dupa cum consemneaza pomelnicul ctitoricesc, a fost ascuns in acele zile la Poiana Crucii \"sub un fag\", intr-un cazan de arama. Cu timpul taina obiectelor de cult s-a pierdut.</p>\n\n<p>Lucrarile de refacere au inceput abia in anul 1824, cu sprijinul efectiv al mitropolituluiVeniamin Costachi si au durat aproape doi ani. S-au refacut atunci biserica de piatra, turnul clopotnita, un corp de chilie in partea de sud, turnul portii si zidul de incinta. Renumitul \"calfa pietrar\" Nicolae Cerneschi din Botosani a condus lucrarile, contribuind atat cu priceperea sa cat si cu insemnate sume de bani, devenind astfel al treilea ctitor principal al manastirii.</p>\n\n<p>Vechile obiecte de cult fiind pierdute, se lucreaza in acelasi an noi obiecte bisericesti, in atelierele Manastirii Neamt: vase liturgice, candele si cadelnite de argint, doua clopote etc. Astfel, Sihastria isi incepe din nou firul existentei sale, intrerupt timp de patru ani.</p>\n\n<p>In anul 1837 se construieste din lemn, pentru serviciul religios din timpul iernii, un paraclis cu hramul Sfintii Parinti Ioachim si Ana si, in continuare, alte doua corpuri de chilii, in partea de est si de nord. In anul 1842, \"o cismea cu doua tevi precum se vede\" aducea in incinta \"apa racoritoare si de viata datatoare\".\nIn vara anului 1941 un incendiu necrutator a mistuit paraclisul de lemn si o parte a chiliilor Sihastriei, din care cauza multi calugari au plecat la alte manastiri. Parintele staret Ioanichie fiind batran si bolnav, in anul 1942 este ales, in postul de loctiitor de staret, Parintele Cleopa.</p>\n\n<p>Prima grija a noului staret a fost refacerea incintei si a chiliilor arse. Cu ajutorul manastirii Neamt, pana in 1944 s-au construit doua corpuri de chilii cu peste 20 de incaperi. Invingand dificultatile aduse de razboi si seceta, obstea condusa de Parintele Cleopa se intareste duhovniceste, creste numeric si, cu mari eforturi, reuseste sa construiasca in anul 1946 un nou paraclis.</p>\n\n<p>Pe 16 octombrie 1988 a avut loc resfintirea solemna a bisericii centrale, pictata de protos. Bartolomeu Florea. Slujba de resfintire si Sfanta Liturghie arhiereasca au fost savarsite de Prea Fericitul Parinte Teoctist, Patriarhul Bisericii Ortodoxe Romane, impreuna cu Prea Sfintitul Eftimie, Episcopul Romanului si Husilor, inconjurati de un sobor de peste 15 preoti si diaconi in mijlocul a mii de credinciosi.</p>\n\n<h3>Manastirea Sihastria - Biserica centrala \"Nasterea Maicii Domnului\"</h3>\n\n<p>Din ansamblul constructiilor, biserica centrala prezinta un interes deosebit, datorita faptului ca mesterul a reluat stilul clasic al bisericilor moldovenesti. Echilibrul proportiilor, zveltetea turlei, efectul liniilor, sobrietatea interiorului si simplitatea decoratiei exterioare sunt cateva din caracteristicile ei.</p>\n\n<p>Biserica este construita in plan triconc, de dimensiuni reduse, cu o singura turla asezata pe naos. Este impartita in pridvor, pronaos, naos si altar, avand lungimea in exterior de 21,50 metri, latimea la abside de 11 metri si inaltimea pe axul turlei de 20 metri. Peretii grosi de peste 1,25 metri sunt lucrati din piatra de rau, cu putina caramida in partea superioara si var hidraulic.</p>\n\n<p>Intrarea se face prin partea de vest. Initial biserica n-a avut pridvor, cel actual fiind adaugat probabil in anul 1837, cand s-au efectuat si alte constructii la Sihastria. Mesterul, dorind sa realizeze un pridvor deschis, inspirat poate dupa cel de la Galata sau chiar Moldovita, l-a prevazut cu sase deschideri largi in ziduri, pentru a avea cat mai multa lumina.</p>\n\n<p>In anul 1988, cele doua deschideri din partea de apus ale pridvorului s-au acoperit, pictandu-se doua icoane mari in fresca: Acoperamantul Maicii Domnului si NastereaMaicii Domnului, hramul manastirii. Din pridvor, o usa masiva de stejar, ferecata in fier forjat, duce in pronaos.</p>\n\n<p>Pronaosul este sectionat de un arc transversal suspendat, care ar vrea sa aminteasca vechea incapere destinata mormintelor. In prima parte, bolta este impartita de un arc longitudinal in doua calote sferice paralele, ceea ce constituie un detaliu rar in Moldova, in ceea ce priveste pronaosul. Ambele calote sunt sustinute de cate patru arcuri obisnuite.</p>\n\n<p>Naosul este separat de pronaos doar printr-un arc proeminent. Constructorul renunta intentionat la obisnuitul perete despartitor pentru a nu micsora spatiul, si asa destul de restrans al interiorului.</p>\n\n<p>Turla, in forma cilindrica, strapunsa de patru ferestre inguste, este sustinuta de acelasi sistem de arcuri moldovenesti, suprapuse piezis, care preiau descarcarile tamburului si se sprijina pe cei patru pandantivi. Ajuns in forma desavarsita la bisericile Sfantului Stefan cel Mare, acest sistem clasic de boltire este reluat intocmai si la Sihastria, pentru ca putin mai tarziu sa fie parasit pentru totodeauna.</p>\n\n<p>Absida altarului este prevazuta cu doua nise laterale, adanc sapate in grosimea zidului, care tin loc de proscomidiar si diaconicon.</p>\n\n<p>Atat interiorul, cat si exteriorul bisericii sunt lipsite de bogata ornamentatie intalnita la marile ctitorii voievodale. Singurele ornamente interioare, cu semnificatie liturgica, sunt strugurii executati din ipsos, fixati la fiecare unghi si varf de arc.</p>\n\n<p>Turla, de forma cilindrica in exterior, ca si in interior, se sprijina pe o baza octogonala, renuntandu-se la baza stelata mai greu de executat. Ca ornamentatie, turla prezinta in partea inferioara un brau de ocnite adanci, dispuse oblic, iar pe verticala douasprezece coloane cu capiteluri si cornisa, care dau armonie si invioreaza albul zidului. Coloanele simbolizeaza pe cei doisprezece apostoli.</p>\n\n<p>In ce priveste pardoseala bisericii, este probabil ca initial sa fi fost lespezi de gresie. Cele cateva morminte de sub pardoseala sunt inca neidentificate.</p>\n\n<p>Pictura tamplei, de o varsta cu sculptura, este executata in ulei cu deosebit gust artistic, \"cu cheltuiala sfintiilor sale ieromonahul Calinic si a schimonahilor Fevronia si Elisabeta Cuza, la anul 1827, luna iunie 15\". Pe langa icoanele imparatesti ale luiIisus Hristos si Maicii Domnului cu Pruncul la piept, se remarca \"Cina cea de taina\", unde apostolii sunt asezati la o obisnuita masa rotunda, asemanatoare cu cele din casele taranesti.</p>\n\n<p>Vechea pictura in tempera degradandu-se in urma incendiului din 1941, biserica a fost pictata integral in interior in fresca, intre anii 1986-1988, de pictorul bisericesc protosinghelul Vartolomeu Florea din obstea acestei manastiri. In cea mai mare parte erminia veche a fost respectata, realizandu-se in decurs de peste doi ani o pictura armonioasa.</p>\n\n<p>Se cuvine amintita aici si icoana facatoare de minuni a Maicii Domnului, adusa la Manastirea Sihastria la inceputul secolului al XX-lea.</p>\n\n<p>Manastirea Sihastria - Paraclisul \"Sfintii Parinti Ioachim si Ana\"\nIn coltul de sud-est al incintei, pe o temelie inalta de piatra, se afla paraclisul Sfintii Parinti Ioachim si Ana, in care se oficiaza serviciul religios in lunile de iarna. Acesta a fost construit in anul 1946, in locul vechiului paraclis mistuit de foc.</p>\n\n<p>Paraclisul respecta planul triconc, cu o singura turla octogonala pe naos. Are lungimea in interior de 9 metri, latimea la abside de 8 metri, si este impartit in pridvor, pronaos, naos si altar. Doua incaperi mici, anexate la absida centrala, servesc drept proscomidiar si diaconicon.</p>\n\n<p>Interiorul este luminat de sapte ferestre, dintre care patru in pronaos si trei in axul absidelor. Lumina mai patrunde in interior prin cele patru ferestre mici ale turlei.</p>\n\n<p>Redus ca dimensiuni, paraclisul contine un mare volum de pictura si sculptura in lemn, de o reala valoare artistica.</p>\n\n<p>Catapeteasma, sculptura masiva in stejar, lucrata in anul 1947. Privita in ansamblu, catapeteasma se impune prin amploare si stil, ca cea mai reprezentativa sculptura din paraclis. Indeosebi usile imparatesti sunt o adevarata broderie in lemn.</p>\n\n<p>Strana Maicii Domnului, cu scene ca \"Nasterea Domnului\", \"Sfintii Evanghelisti\", \"Sfintii Arhangheli Mihail si Gavriil\", si broderia sculptata, reprezentand prooroci din Vechiul Testament care proorocesc despre Preasfanta Fecioara, ce incadreazaicoana Maicii Domnului, toate fiind sculptate in lemn de par, ca si iconostasul cu \"Invierea Domnului\", in lemn de chiparos, si \"Cei doisprezece Apostoli\" - medalioane aplicate din lemn de tisa - sunt lucrari de inalta realizare artistica.</p>\n\n<p>Mai pot fi amintite: Crucea, cu admirabilul ei suport sculptat in lemn de tei; analogul cu Sfantul Gheorghe in medalion, din lemn de stejar; stranile pentru cantareti si scaunul arhieresc.\nCeea ce ridica si mai mult valoarea artistica a paraclisului este, fara indoiala, pictura in ulei din interior, opera calugarului Irineu Protcenco. Pictura paraclisului se caracterizeaza, in general, printr-un puternic realism portretistic, o mare finete si precizie a liniilor si o admirabila nuantare a culorilor, care dovedesc bogata paleta de expresie a pictorului.</p>\n\n<h3>Manastirea Sihastria - Catedrala \"Sfanta Teodora de la Sihla\"</h3>\n\n<p>Dupa anul 1947, Sihastria, dintr-un mic schit pustnicesc, a devenit o manastire misionara, cautata de multi pelerini. Insa mai ales dupa anul 1989, cand obstea a sporit mult numeric, ajungand in anul 1994 la aproape 140 de parinti si frati, iar credinciosii insetati dupa cuvantul lui Dumnezeu vin in numar foarte mare la manastire, s-a simtit mai mult nevoia construirii unei biserici mai mari.</p>\n\n<p>Astfel a prins viata o dorinta mai veche a parintelui staret, arhim. Victorin Oanele, ce astepta doar vremuri mai prielnice pentru realizarea unei biserici mari, incapatoare.</p>\n\n<p>Constructia a inaintat foarte repede, caci obstea s-a jertfit pe cat ii statea in putinta, sutele si miile de credinciosi veniti in pelerinaj la manastire au daruit fiecare ce si cat putea si nu putini oameni inimosi, cu posibilitati financiare, au contribuit cu materiale si bani.</p>\n\n<p>Ca ocrotitoare a noii biserici a fost aleasa Sfanta Teodora de la Sihla, mai intai pentru faptul ca sfanta, fiind nou canonizata, in anul 1992, nu avea o biserica inchinata ei, iar apoi din dorinta de a aduce aici sfintele sale moaste care se afla acum la Kiev - Ucraina.</p>\n\n<p>In anul 1999 s-a finalizat constructia bisericii, iar in anul 2004 s-a terminat pictura interioara, in fresca, ramanand de pictat numai firidele dimprejurul bisericii. Pictorii fac parte din obstea Manastirii Sihastria, fiind condusi de P.C. arhim. Vartolomeu Florea, pictor bisericesc, ucenic al arhim. Sofian Boghiu, cel ce a realizat si devizuliconografic al bisericii.</p>\n\n<p>Biserica este construita in plan triconc, cu o turla pe naos si incadrata in partea dinspre apus de doua turnuri laterale. Este impartita in nartex, pridvor, pronaos, naos si altar, avand lungimea in exterior de 42 metri, latimea la abside de 22 metri si inaltimea pe axul turlei de 36 metri. Constructia este realizata din caramida pe cadre de beton armat, avand si un mare demisol, de dimensiunile bisericii.</p>\n\n<p>Intrarea in biserica se face prin partea de vest, in nartex, pe a carui fatada sunt sapte firide pictate in mozaic. Accesul in pridvorul bisericii se face printr-o usa masiva metalica, cu ornamente de bronz incastrate. Pridvorul este incadrat de doua turnuri, deasupra lui fiind cafasul sub care se gasesc doua usi: una spre sud, care duce la scara spre cafas, si una spre nord, spre pangarul bisericii.</p>\n\n<p>Pronaosul are trei nave, una centrala si doua laterale, mai inguste, inscrise de opt coloane, din care doua sunt angajate in zid. La demisolul bisericii se afla un paraclis avand hramul \"Sfantul Mucenic Victorin\" si \"Toti Sfintii Romani\" care s-a sfintit in dimineata zilei de 7 august 2001 de catre I.P.S. Mitropolit Daniel si P.S. Casian, Episcopul Dunarii de Jos.</p>\n\n<p>In partea stanga a demisolului se afla o racla de lemn sculptat, unde se gasesc particele din Sfintele moaste ale mai multor sfinti: o particica din lemnul Sfintei Cruci, ale Sfantul Apostol Andrei, Sfantul Ierarh Nicolae, Sfantul Ierarh Spiridon, Sfantul Mucenic Haralambie, Sfantul Ignatie Teoforul, Sfantul Mare Mucenic Gheorghe, Sfantul Mare Mucenic Ioan cel Nou de la Suceava, Sfantul Mare Mucenic Pantelimon, Sfantul Mucenic Lavrentie, Sfantul Varnava, Sfantul Mucenic Ioan Rusul, Sfantul Procopie, Sfantul Mucenic Marina, Sfantul Elefterie, Sfantul Andrei, Sfanta Mucenita Paraschevi, Sfinti Parinti din Lavra Sfantul Sava, Sfintii Cuviosi Mucenici din Muntele Sinai, Sfantul Cuvios Arsenie, Sfantul Mucenic Panaghiot, Sfantul Cuvios Daniil, Sfantul Martin de Tours, Sfintii Cuviosi Paisie, Natan si Sila, Sfantul Cuvios Mucenic Daniel, sfinti de la Pecerska - Sfintii Damian, Ioan si Nicolae, Sfintii Prunci ucisi de Irod, de la cuviosii din Lavra Sfantul Teodosie, unul din Sfintii Mucenic Prov, Tarah si Andronic si particele de la diferiti sfinti necunoscuti.</p>\n\n<p>In paraclisul de la demisol se savarseste slujba Sfantul Maslu in fiecare joi noapte spre vineri.</p>\n\n<h3>Manastirea Sihastria - Turnul-clopotnita</h3>\n\n<p>Situat in coltul de nord-est al incintei, face parte din ansamblul constructiilor ridicate in anul 1825. Este o cladire aflata in imediata apropiere a chiliilor, prevazuta cu doua nivele, cu ganguri de acces si patru metereze, fapt ce ne aminteste de vechile turnuri de aparare.</p>\n\n<p>Peretii, grosi de peste doi metri, au la baza latura de 7 metri si sunt lucrati din bolovani de rau si var hidraulic. Acoperisul este incheiat in obisnuitul bulb moldovenesc.</p>\n\n<p>Lucrarile de restaurare din anii 1983-1984, consolidarea zidurilor, fresca interioara si exterioara si acoperirea cu tabla de cupru, dau clopotnitei durata si frumusete.</p>\n\n<h3>Manastirea Sihastria - Cimitirul</h3>\n\n<p>Cimitirul manastirii este asezat in locul actual de catre Parintele Cleopa, in anii 1944-1945, sfintia sa mutand aici ramasitele pamantesti ale calugarilor din cele trei cimitire existente pana atunci, unul dintre ele fiind asezat in jurul bisericii centrale.</p>\n\n<p>In cimitir, devenit deja loc de pelerinaj, se afla mormantul Parintelui Cleopa. Fiii duhovnicesti, din evlavie, i-au pus in locul crucii modeste, de lemn, dorita de parintele, o frumoasa cruce de marmura. La mormantul sfintiei sale vin zeci de credinciosi, care aprind o lumanare, se roaga pentru odihna sufletului sau, amintindu-si cu drag de neuitatele sale cuvinte si mai ales de nesfarsita dragoste a parintelui.</p>\n\n<p>Langa mormantul Parintelui Cleopa se afla mormantul Parintelui Paisie Olaru, un mare duhovnic al Moldovei, de asemenea vizitat de foarte multi pelerini.</p>\n\n<p>Bineinteles ca in cimitir sunt ingropati multi nevoitori de taina, ale caror osteneli si nevointe numai Bunul Dumnezeu le stie. Despre unii dintre acestia citim in filele Patericului romanesc al Parintelui Ioanichie Balan: Ieroschimonahul Onufrie Frunza, un parinte al tacerii, al lacrimilor si al meditatiilor duhovnicesti.</p>\n\n<p>Monahul Marcu, un parinte ce a patimit pentru convingerile lui religioase 18 ani de inchisoare si s-a invrednicit de multe cercetari si mangaieri dumnezeiesti, fratii Parintelui Cleopa, Parintii Gherasim si Vasile, primul facand mii de metanii si dormind intr-un sicriu pentru a avea pururea cugetarea la moarte, iar al doilea invrednicindu-se sa fie chemat la cele ceresti de insasi Maica Domnului.</p>\n\n<p>Apoi Protosinghelul Ioanichie Moroi, un parinte mult postitor si nevoitor, binecuvantat de Dumnezeu cu mari daruri, Parintele Paisie Nichitenco, un calugar simplu, invrednicit de Dumnezeu cu darul rugaciunii celei de foc a inimii, Parintele Irineu Protcenco, un om al rugaciunii interioare, al pacii si al tacerii, mare iconar din Ucraina, care si-a gasit linistea la Manastirea Sihastria, unde a atins apogeul creatiei sale, impodobind cu icoane minunate paraclisul manastirii si multi alti parinti care ne indeamna sa le urmam credinta, sa nu uitam ca suntem trecatori pe acest pamant.</p>\n\n<p>Cine are urechile sufletului deschise, aude ca ei, desi tac, totusi vorbesc, de multe ori zicandu-ne: \"Ceea ce am fost noi ieri, sunteti voi azi, iar ce suntem noi azi, veti fi voi maine!\"\nManastirea Sihastria - Biserica cimitirului \"Invierea Domnului\"</p>\n\n<p>Biserica cimitirului a fost ridicata din initiativa Parintelui staret Victorin Oanele. La Inceput, in anul 1987, s-a stramutat la Sihastria o biserica cu hramul \"SfintiiArhangheli Mihail si Gavriil\", din satul Hlapesti, comuna Dragomiresti, judetul Neamt.</p>\n\n<p>Biserica fiind de lemn si foarte deteriorata, parintele staret a hotarat sa construiasca o biserica noua, pastrand insa neschimbat planul vechii biserici. La ridicarea bisericii s-a lucrat intre anii 1987-1999. Catapeteasma este pictata de Arhim. Vartolomeu Florea, iar icoanele care impodobesc biserica sunt cele ale bisericii vechi.</p>\n\n<p>Biserica s-a sfintit in ziua de 7 august 1999, de catre I.P.S. Mitropolit Daniel si P.S. Casian, dandu-i-se hramul \"Invierea Domnului\" si \"Sfantul Ioan Evanghelistul\". In biserica se slujeste sambata, de primavara pana toamna tarziu, in special pentru parintii adormiti din cimitir.</p>"}, "docs/muntenia": function(exports, require, module) {module.exports = "<h1>Muntenia</h1>\n\n<p><br><br>        </p>\n\n<h4>\n    <ul>\n        <li><a href=\"/muntenia/cernica\">Cernica</a></li>\n        <br>\n        <li><a href=\"/muntenia/dealu\">Dealu</a></li>\n        <br>\n        <li><a href=\"/muntenia/zamfira\">Zamfira</a></li>\n    </ul>\n</h4>"}, "docs/muntenia/cernica": function(exports, require, module) {module.exports = "<h4 class=\"right\"><a href=\"/muntenia\">Inapoi</a></h4>\n\n<h1>Manastirea Cernica - suflarea duhului peste ape</h1>\n\n<p>Date generale:</p>\n\n<ul>\n<li>40 vietuitoare, viata de obste</li>\n<li>Hram: Sfantul Mare Mucenic Gheorghe (biserica din cetate); Sfantul Mare Ierarh Nicolae (biserica de pe ostrov); Sfantul Ierarh Calinic</li>\n<li>Acces: din DN 3, la E de Bucuresti, ramificatie, din com. Pantelimon (dupa 9,5 km), DJ 301 spre S (4 km). Manastirea se afla la 13,5 km de centrul Capitalei Romaniei;</li>\n</ul>\n\n<p><figure class=\"center\"><img src=\"/images/cernica.jpg\" alt=\"\"></figure></p>\n\n<h3>Despre manastirea Cernica:</h3>\n\n<p>Manastirea Cernica, situata la 14 km de Bucuresti, pe DN 3,  si ctitorita la inceputul secolului 17, continua sa uimeasca prin istoria ei minunata si prin marea ei forta duhovniceasca. Aici a trait Sfantul Calinic, care avea, intre alte daruri, si pe acela de a citi gandurile celor din preajma sa. Aceasta veche vatra de spiritualitate si cultura romaneasca este o mandrie nationala si un loc predilect de pelerinaj spiritual. Pictorul Ion Tuculescu, scriitorul Gala Galaction, marele teolog Dumitru Staniloae si multe alte figuri ilustre, istorice sau duhovnicesti, odihnesc in cimitirul manastirii.</p>\n\n<h3>Sfintele Moaste tamaduitoare</h3>\n\n<p>Manastirea de calugari, ctitorie a vornicului Cernica Izvoranul, zis Stirbei, e atestata documentar la 1608, prin hrisovul domnesc al lui Radu Voda Serban. In acel an, vornicul a refacut un vechi schit, caruia i-a dat numele sau si l-a inzestrat cu pamanturi, paduri si sate, spre vesnica pomenire a neamului sau. Manastirea este zidita in mijlocul unui lac inconjurat de paduri, prezentand in orice anotimp aceeasi fascinatie, atat pentru ochi, cat si pentru inima. Dupa ce a fost parasita vremelnic din pricina unei epidemii, manastirea a fost restaurata in 1842 de catre Sf. Calinic (1787-1868), care a fost staret al manastirii timp de 31 de ani. Moastele acestuia, facatoare de minuni, odihnesc intr-o racla din biserica mare a manastirii. Multe sunt minunile vrednice de pomenire ale Sfantului Calinic, de la vindecari miraculoase la intoarcerea barbatilor acasa, la maritisul fetelor sau la dezbararea de vicii cumplite. La Cernica, nu exista zi in care credinciosi din toata tara sa nu vina sa se roage dinaintea Sfintelor Moaste pentru alinarea necazurilor si iertarea pacatelor. </p>\n\n<h3>De la Gheorghe la Calinic</h3>\n\n<p>In anul 1781 vine ca staret al manastirii parintele arhimandrit Gheorghe, unul dintre ucenicii Sfantului Paisie de la Neamt. Acesta reface obstea de monahi (care se risipise din pricina razboaielor si a ciumei) si ridica din ruina biserica. Viata monahala de la Cernica primeste astfel un nou avant. In loculvechii biserici e construita, la 1815, Biserica Sf. Nicolae din Ostrov, a carei pictura interioara a fost realizata de zugravul Fotache, unul dintre ultimii mesteri ai picturii medievale. Lacasul l-a avut ca staret, intre 1818 si 1850, pe cel mai luminos si reprezentativ om al timpului: Sf.Ierarh Calinic de la Cernica, ctitor de manastiri si biserici, de spitale, scoli si case pentru orfani. In vremea sa au fost ridicate zidurile imprejmuitoare si Biserica Sf. Gheorghe, cladirea staretiei si aproape toate casele de pe insula care poarta numele aceluiasiSfant Mare Mucenic. Iubitor de cultura, Calinic a pus bazele unei valoroase biblioteci si a deschis aici o scoala de pictura bisericeasca. O institutie de o reala importanta a fost Seminarul Monahal, care a functionat aici si a dat oameni de seama ai Bisericii, printre care si Prea Fericitul Parinte Patriarh Teoctist. Corpul de chilii in care vietuiesc astazi calugarii este ocrotit de ziduri ca de cetate, cu o arhitectura tipica zonelor de campie, adica nu prea inalta, spre a se putea repara usor.</p>\n\n<h3>Pe lacul Cernica au tacut broastele</h3>\n\n<p>Ierarhul Calinic a fost trecut in randul sfintilor in 1955, in plina prigoana comunista. Printre cele mai celebre profetii ale sale se numara prezicerea mortii Mitropolitului Nifon, a izgonirii lui Cuza, a celor doua Razboaie Mondiale si chiar a „izbavirii“ Romaniei, ce-ar fi trebuit sa inceapa (si poate a si inceput, in adancuri nestiute de noi) in anul 1996. Vechea chilie in care a trait e situata in insula Sfantului Gheorghede pe lacul Cernica si a devenit cu timpul casa memoriala. Acolo se pastreaza obiecte care i-au apartinut marelui staret. Un fapt cel putin curios e acela ca in jurul chiliei broastele nu canta niciodata. Legenda spune ca intr-o seara, pe cand sfantul era cufundat in rugaciune, linistea i-a fost tulburata de oracaitul broastelor. Atunci el s-a dus pe malul apei si, delimitand cu privirea o portiune din lac, atat cat „zgomotul“ sa nu ajunga la chilie, a binecuvantat broastele si le-a spus: „Duceti-va in stanga si in dreapta, de cantati cat vreti! Dar aici voi sa nu-mi mai cantati!“. Din acea zi, in zona binecuvantata de Sf. Calinic broastele au incetat sa mai oracaie.</p>\n\n<h3>Mortul neputrezit</h3>\n\n<p>Povestesc batranii calugari ca in vara anului 1854 Sf. Calinic se indrepta, pe Valea Jiului, catre Manastirea Lainici. Pe drum s-a intalnit cu fiii unui om instarit, care murise in urma cu 7 ani. Tocmai in acea zi de sambata urmau sa-i faca parastasul de pomenire si Calinic s-a oprit sa-si traga putin sufletul alaturi de ei. Cu ocazia deshumarii cadavrului, rudele au constatat ca mortul nu putrezise. Toti au incremenit de spaima. Stiind ca sfantul are har si ca face minuni, copiii bogatasului au cazut in genunchi si l-au rugat sa ramana in satul lor pana a doua zi. Calinic s-a induiosat si a ramas pentru a-i ajuta. Lumea vorbea ca raposatul avusese in timpul vietii puteri necurate si toate slujbele de dezlegare facute la capataiul lui de arhierei si preoti, ca si toate rugaciunile rudelor, nu avusesera nici un efect. Sfantul a tinut slujba liturghiei la biserica din sat si a mers la mormant cu o cruce in mana. Mortul, dezgropat intre timp, era rezemat in picioare de zidul bisericii. Trupul intact era imbracat in haine lungi de matase. Dupa ce si-a terminat slujba, sfantul a inceput sa citeasca rugaciunile de iertare a pacatelor si dezlegare de blesteme. Toti cei prezenti au plans, inaltand slava lui Dumnezeu, in timp ce trupul raposatului se transforma sub ochii lor in pulbere, incepand de la talpi. La sfarsitul rugaciunilor, din cadavru nu mai ramasese decat o gramajoara de tarana amestecata cu oase. Blestemul fusese stins.</p>\n\n<h3>„In numele Domnului Hristos, ridica-te!“</h3>\n\n<p>Biserica Sf. Nicolae din asezamantul Cernicai are o icoana facatoare de minuni, dar nu se stie cu precizie care dintre cele 7 icoane prezente in interior este aceea. Se banuieste doar ca ar fi cea mai veche dintre ele. Icoana il infatiseaza pe Sf. Nicolae. Legenda spune ca acesta a coborat intr-o noapte in visul Sfantului Calinic si l-ar fi anuntat ca staretul Nicandru a murit. La vremea aceea calugarii au notat data respectiva in scriptele bisericii si trista veste s-a confirmat mai tarziu. Spre sfarsitul vietii, in cadrul unei slujbe de exorcizare savarsite in paraclisul Episcopiei Ramnicului, Sf. Calinic a reusit sa aduca in fire o femeie care tipa, facea spume la gura si-si rupea hainele de pe ea. Bunul parinte si-a asezat mainile pe capul ei si a binecuvantat-o, rostind: „In numele Domnului nostru Iisus Hristos, ridica-te!“. Femeia s-a linistit intr-o clipa, apoi s-a inchinat la sfintele icoane, multumind lui Dumnezeu. Dupa putin timp, un mestesugar din partea locului, pe nume Costache, a venit cu fiul sau epileptic la Sf. Calinic. Acesta i-a spus: „Du-te acasa si te roaga la Maica Domnului“. Cand a ajuns in ograda lui, barbatul a ramas uimit vazand cum fiul lui se indreapta catre icoana Preasfintei Fecioare si ingenuncheaza. dinaintea ei! Dupa ce s-a rugat, copilul s-a ridicat in picioare si, cu o privire senina, i-a spus: „Tata, cu ajutorul lui Dumnezeu si al Maicii Domnului, sunt sanatos-tun“.</p>"}, "docs/muntenia/dealu": function(exports, require, module) {module.exports = "<h4 class=\"right\"><a href=\"/muntenia\">Inapoi</a></h4>\n\n<h1>Manastirea Dealu</h1>\n\n<p>Date generale:</p>\n\n<ul>\n<li>30 vietuitoare, viata de obste</li>\n<li>Hram: Sfantul Ierarh Nicolae, Adormirea Maicii Domnului (paraclisul)</li>\n<li>Acces: din centrul Targovistei 3,5 km NE pana la manastire</li>\n<li>Stareta: stavrofora Emanuela Preda</li>\n</ul>\n\n<p><figure class=\"center\"><img src=\"/images/dealu.jpg\" alt=\"\"></figure></p>\n\n<h3>Despre manastirea Dealu:</h3>\n\n<p>Manastirea Dealu este una dintre marile vechi manastiri ale tarii noastre. Manastirea de maici de la Dealu se afla in localitatea Viforata, comuna Aninoasa, la sase kilometri in nord-vestul localitatii Targoviste, pe un deal din preajma cursului Ialomitei.</p>\n\n<p>Daca ajungi in asa-numita \"Vale a Voievozilor\", de langa Targoviste, si incepi sa urci dealul aparut in cale, dupa o vreme, trecand pe sub un portal de clopotnita, te vei afla fata in fata cu silueta stranie si impunatoare a bisericii Manastirii Dealu, ctitorie a domnitorului Radu cel Mare.</p>\n\n<p>Prima biserica de pe acest loc dateaza de la sfarsitul secolului al XIV-lea sau inceputul celui de al XV-lea, din timpul domnitorului Mircea cel Batran. Pe locul acesteia, domnitorul Radu cel Mare (1495-1508) construieste o prea mareata biserica din caramida placata cu piatra si impodobita in chip deosebit. Aceasta avea sa fie luata drept model de catre urmasul lui Radu, Neagoe Basarab (1512-1521), atunci cand a ridicat biserica episcopala din Curtea de Arges.</p>\n\n<p>Biserica de la Manastirea Dealu este cea mai mare necropola domneasca din tara. Dincolo de zidurile ei, mormintele voievozilor poarta nu numai plamada de istorie si sfintenie din care s-a alcatuit neamul caruia ii apartinem, dar si ecourile tradarilor, laolalta cu soaptele de alcov, patimile si asceza, intriga, blestemul si cainta.</p>\n\n<p>Autentic \"principe al Renasterii\", domnitorul Radu cel Mare isi purtase mult timp pasii prin lumea apuseana, unde deprinsese fastul si stralucirea de la curte, artele si frumosul. La sud de Dunare erau vremurile in care otomanii cuceritori nu ingaduia sa se ridice vreo biserica peste care sa nu poata privi un turc calare. Cu atat mai mult a dorit domnitorul sa ridice aici, la Dealu, cea mai mareata biserica din cate se inaltasera pana la acea vreme in Tara Romaneasca.</p>\n\n<p>Oare cum se vor fi infatisat toate cu cinci veacuri in urma, in vremea domniei lui Radu cel Mare - fiul lui Vlad Calugarul - si al sotiei sale Smaranda, cea care va imbraca in cele din urma haina monahala sub numele de Samonida?\nBiserica Tarii Romanesti era in mare suferinta, iar domnitorul avea nevoie de o personalitate care s-o puna in randuiala, asa ca si-a indreptat privirile asupra fostului Patriarh al Constantinopolului, Sfantul Nifon, exilat de catre sultan la Adrianopole.</p>\n\n<p>In ziua hotarata de domn, carete si radvane insotite de calareti se indreptau spre Mitropolie. Din goana cailor puteau fi zarite jupanese si jupanite, imbracate in matasuri de Damasc, cu cele mai fine saluri ori chiar cu blanuri de samur, grabite sa iasa in intampinarea fostului Patriarh de Constantinopol.</p>\n\n<p>Prin aducerea sa, pentru care se auzise ca domnul cheltuise multe daruri in aur si pietre scumpe catre sultanul Baiazid, capitala tarii, Targoviste, devenea intaia capitala a lumii crestine, asezata in fata capitalei islamice a Imperiului Otoman. Asadar, in acea zi a anului 1503 dupa Hristos, Sfantul Nifon era intampinat cu tot fastul, la care se adaugau si vorbele pline de miez ale lui Radu cel Mare: \"Eu o sa domnesc, iar tu sa ne fii dreptar in legea Domnului. Sa ne fii pastor sufletesc si sol noua la Dumnezeu.\"</p>\n\n<p>Numai ca, in scurta vreme, la curtea lui Radu se pripaseste Bogdan Vornicul, un boier moldovean alungat de catre Stefan Voda. Cu toate ca era casatorit si avea cinci copii, reuseste sa se vare pe sub pielea domnitorului, ba mai mult, sa-i fure inima surorii acestuia, frumoasa jupanita Caplea. Se pune la cale nunta.</p>\n\n<p>Intre timp insa, sotia parasita a lui Bogdan ii scrie o scrisoare Sfantului Nifon, instiintandu-l de toata nelegiuirea. Patriarhul il cheama pe vornic la Mitropolie si il indeamna sa se intoarca acasa la sotia si copiii sai. Bogdan, insa, se duce la voievod si se plange de Nifon, astfel ca in cele din urma intriga si minciuna prind pe evlaviosul domn ca intr-o panza de paianjen. Sfantul Nifon e alungat de la curte. \nInainte de a lua iarasi calea exilului, batranul ierarh ii spune domnitorului: \"Blestem va fi pe capul tau si neamurile tale. In mari suferinte si dureri vei muri si multe nevoi au sa cada asupra tarii tale. Atunci ma veti cauta, dar nu ma veti gasi.\" Apoi pleaca, luand calea Sfantului Munte Athos, sa-si traiasca acolo restul vietii in singuratate si rugaciune.</p>\n\n<p>La scurt timp dupa plecarea sfantului, Radu cel Mare cade la pat, rapus de o boala necunoscuta. In tara izbucnesc razmerite, epidemii, certuri, galceava intre boieri. Voievodul trimite dupa Nifon, dar era prea tarziu: acesta trecuse in lumea dreptilor, la Manastirea Dionisiu din Sfantul Munte, unde a si fost inmormantat.</p>\n\n<p>In cele din urma, domnitorul isi afla sfarsitul, dar nu si linistea. Blestemul il urmarea si dincolo de lespedea mormantului. In fiecare dimineata, cu toata curatenia facuta, ieseau viermi deasupra lespedei de mormant, care mai era si zgaltaita de nu se stie ce puteri nevazute. Este momentul in care intra in scena un alt personaj important: Sfantul domnitor Neagoe Basarab. </p>\n\n<p>Tanarul pe atunci Neagoe, educat la Scoala Teologica de la Bistrita Craiovestilor, gasise in Patriarhul Nifon nu numai un interlocutor pe masura aspiratiilor sale, dar si un model duhovnicesc. De altfel, Nifon ii proorocise tanarului Basarab ca va ajunge domn si va avea o domnie indelungata si linistita.</p>\n\n<p>Ajuns domn, chinuit de gandul ca blestemul lui Nifon apasa nu numai asupra ctitorului de la Dealu, dar si asupra tarii intregi, Sfantul Neagoe Basarab merge la Athos si aduce, cu mare cheltuiala, osemintele sfinte ale patriarhului, pe care le asaza peste mormantul lui Radu cel Mare de la Manastirea Dealu.</p>\n\n<p>Urmeaza o lunga noapte de priveghere, in timpul careia Sfantul Neagoe are o vedenie. Trupurile celor doi ii rasar asezate fata in fata: de-o parte, cel al lui Radu, groaznic, intunecat, plin de murdarie si putoare; de cealalta parte, cel al Sfantului Nifon, alb, curat si imprastiind buna mireasma. Cateva picaturi de apa sfintita se preling din trupul sfantului pe mormantul nefericitului domn. Apoi toate incuietorile si pietrele mormantului se inchid singure. Blestemul incetase.</p>\n\n<h3>Manastirea Dealu - scurt istoric</h3>\n\n<p>Manastirea Dealu exista deja la 17 noiembrie 1431, cand Alexandru Voda Aldea ii face danie doua sate, Alexeni si Razvad, pentru pomenirea lui Mircea cel Batran, tatal si prezumtivul ctitor.</p>\n\n<p>La 28 martie 1451, Vladislav al II-lea intarea manastirii alte 3 jumatati de sate, precum si muntele Brateiul, ceea ce dovedeste ca, inca din aceasta vreme, exista aici o manastire mare si bogata. La moartea sa, in 1456, domnul Tarii Romanesti a fost ingropat in aceasta manastire, devenita apoi necropola domneasca.</p>\n\n<p>Aceasta prima constructie de la Manastirea Dealu a disparut, fiind inlocuita cu o alta in vremea domniei lui Radu cel Mare (1495 - 1508). Astfel, Radu cel Mare a inceput sa zideasca si sa innoiasca si din temelie a ridicat cu toate bunatatile si cu mare frumusete a infrumusetat acest hram. Lucrarile au inceput la 26 august 1499, dupa cum se arata intr-o inscriptie ramasa de la vechea clopotnita a manastirii; mai intai au fost reconstruite cladirile manastirii si apoi biserica. Lacasul a fost sfintit la 4 decembrie 1501.</p>\n\n<p>Radu cel Mare a murit inainte de a termina mareata ctitorie de la Dealu. Cei care au continuat lucrarile au fost Vladut Voievod si, dupa aceea, Sfantul Neagoe Basarab (1512 - 1521), domnul atat de legat de istoria Targovistei prin ctitoriile sale.</p>\n\n<p>In aceasta vreme biserica uimea pe contemporani prin splendoarea ei. La mijlocul secolului al XVII-lea, diaconul Paul de Alep va remarca unele asemanari cu biserica de la Manastirea Curtea de Arges; tot el arata ca zidurile bisericii erau \"lucrate si ornate cu piatra fina, iar ferestrele incadrate cu marmura alba\". </p>\n\n<p>In secolul al XVI-lea, dupa recladirea ei, Manastirea Dealu a fost o importanta necropola domneasca, indeplinind acest rol incepand din 1508, data inmormantarii aici a lui Radu cel Mare, ctitorul bisericii. Dupa aceasta data au fost inhumati aici: jupanita Caplea, sora lui Radu cel Mare (1511), Vladut Voievod, fratele lui Radu cel Mare (1512), Radu Voda Badica, fiul lui Radu cel Mare(1524), Vlad Inecatul (1532), Patrascu Voda cel Bun, nepotul primului ctitor (1567) si Mihai Movila (1608).</p>\n\n<p>In anul 1603 tot aici a fost adus, prin grija clucerului Radu Buzescu, capul lui Mihai Viteazul, ucis miseleste pe Campia Turzii. Pe lespedea de mormant care acopera capul marelui erou, clucerul Buzescu a pus sa se sape aceasta frumoasa inscriptie: \"Aice zace cinstitul si raposatul capul crestinului Mihail, marele voievod, ce au fost domn Tarii Romanesti si Ardealului si Moldovei ; cinstitul trup zace in Campia Tordei. Si cand l-au ucis nemtii anii au fost 7109 (1601), in luna lui aug. 8 zile. Aceasta piatra o-u pus jupan Radu Buzescu si jupanita ego Preda.\" </p>\n\n<p>Dupa domnia lui Mihai Viteazul, Manastirea Dealu a avut de suferit din pricina ostilor principelui Gabriel Bathory, care au intrat pe neasteptate in tara , in decembrie 1610. Dupa cum spune fostul mitropolit Matei al Mirelor, egumenul de atunci al manastirii, ostenii au furat \"toate giuvaerele\" bisericii, \"sfarmand mormintele domnilor si stricand lespezile bisericii\", in speranta ca vor gasi aici comori. Tot acum a fost luat si plumbul ce acoperea biserica.</p>\n\n<p>La anul 1614 Radu Voda Mihnea (1611-1616) a vizitat manastirea si a gasit locasul \"stricat si lovit si saracit si jefuit si surupat cu totul de unguri\". Astfel voievodul a daruit manastirii Satul Nou, scutit de dari, din veniturile caruia (100 de galbeni anual) calugarii trebuiau \"sa intareasca si sa drega sfanta manastire\".</p>\n\n<p>Marele ctitor care a fost Sfantul Constantin Brancoveanu nu a neglijat nici el Manastirea Dealu, facand bisericii o noua zugraveala \"peste tot\", precum si o tampla noua; pisania ne pastreaza si numele zugravilor: Constantin, Preda, Nicolae si Radu, adica aproximativ aceeasi echipa care a pictat Mitropolia din Targoviste, la anii 1707-1709. Dupa domnia Sfantului Constantin Brancoveanu, in epoca fanariotilor, ca si alte multe manastiri din tara, Manastirea Dealu, neingrijita de calugari, a inceput sa se ruineze.</p>\n\n<p>Dupa o perioada grea pentru manastrire, in prima jumatate a secolului al XIX-lea, cand a avut de suferit de pe urma cutremurelor din 1802 si 1838, aceasta a fost restaurata de George Bibescu, intre anii 1844-1854. In anul 1879, in noile cladiri ale manastirii, s-a instalat \"Scoala divizionara de ofiteri\", apoi, la 1890-1891 \"Depozitul de arme al armatei\", la inceputul secolului al XIX-lea \"Scoala copiilor de trupa\", iar la anul 1912 \"Liceul militar Nicolae Filipescu\". Cu acest ultim prilej, chiliile au fost inlocuite cu cladiri noi, din vechile constructii ramanand numai biserica. </p>\n\n<p>La inceputul secolului al XIX-lea, biserica Manastirii Dealu se infatisa lui Nicolae Iorga ca o minune a artei orientale. \"Lespezi mari de piatra, prinse cu scoabe de fier, alcatuiesc pareti de o putere neobisnuita in grosime si-n injghebarea lor de stanca. Doua turnulete octogonale in fata, unul mai mare la mijloc. Cele mai delicate si mai felurite horbote de piatra inconjoara pisania impartita la dreapta si la stinga usii de intrare sau impodobesc baza, tivesc ferestrele turnurilor. Gustul cel mai ales s-ar opri fermecat inaintea acestei armonii, durate pentru o mie de ani.\"</p>\n\n<p>Cutremurul din anul 1940 a cauzat mari stricaciuni manastirii, daramand turlele bisericii, partea superioara a clopotnitei si avariind cladirile din anul 1912, care au fost refacute intre 1953-1956, perioada in care manastirea si-a recapatat stralucirea de odinioara. </p>\n\n<p>Manastirea Dealu isi leaga numele de aparitia primei carti din Tara Romaneasca si organizarea celui de-al patrulea centru tipografic european de litera chirilica, prin patronajul voievodului Radu cel Mare si actiunea calugarului carturar Macarie. Cartile aparute la tiparnita de la Manastirea Dealu (1508, 1510, 1512, 1644, 1645, 1646 si 1647) constituie nu doar forme unice ale unui model editorial autohton, ci si expresia perfecta a unui concept cultural si ideologic specific, prin care Targovistea voievodala isi asuma rolul de important centru cultural sud-est european, loc de aparitie a cartilor necesare romanilor si crestinilor din Imperiul Otoman, punct de maxima concentrare a valorilor carturaresti nationale si europene, chemate sa lucreze pentru dezvoltarea culturii si a limbii literare.</p>\n\n<p>Mai ales in secolul al XVII-lea, prin Matei al Mirelor si Udriste Nasturel, Manastirea Dealu devine suport pentru activitatea miniaturistilor, traducatorilor si tipografilor, care scot editii dupa editii si deseneaza splendide portrete (Matei Basarab si Doamna Elina, desenate de Antim caligraful, intre anii 1634-1644).</p>\n\n<p>In biserica de la Manastirea Dealu se afla mai multe lespezi de mormant. Pe cea mai apropiata se vede scris numele unui Movila, mort la anul 1608, iar pe alta numele lui Vlad cel Tanar, fratele lui Radu cel Mare. Putin mai incolo se iveste piatra mormantului celei ce a fost pricina blestemului lui Nifon: jupanita Caplea.</p>\n\n<p>Inspre dreapta, chiar la intrarea in naos, un mormant din marmura alba adaposteste capul voievodului Mihai Viteazul, adus la Manastirea Dealu in anul 1601, de pe Campia Turzii, de catre paharnicul Turturea si asezat sub o lespede de piatra, de catre Radu Buzescu si sotia sa, respectandu-se astfel dorinta voievodului de a fi inmormantat la Manastirea Dealu.</p>\n\n<p>Tot aici, la mai putin de-un pas de mormantul fiului, isi doarme somnul de veci tatal sau, Patrascu Voievod, iar de partea cealalta a intrarii in naos, intr-un mormant de marmura alba, se odihneste strabunicul sau si ctitorul lacasului, Radu cel Mare.</p>\n\n<p>In timpul primului razboi mondial, capul voievodului Mihai, invelit in panza cu care era acoperita Sfanta Masa din altar, este dus in locuri tainice. In anul 1920, regele de-atunci al tuturor romanilor, Ferdinand, readuce la Manastirea Dealu capul lui Mihai Viteazul.</p>"}, "docs/muntenia/zamfira": function(exports, require, module) {module.exports = "<h4 class=\"right\"><a href=\"/muntenia\">Inapoi</a></h4>\n\n<h1>Manastirea Zamfira</h1>\n\n<p>Date generale:</p>\n\n<ul>\n<li>30 vietuitoare, viata de sine</li>\n<li>Hram: inaltarea Domnului, Sfantul Nifon al Constantinopolului</li>\n<li>Acces: Bucuresti-Ploiesti (pe DN 1/E 60)-Zamfira (DN 1 A), 83 km. Manastirea se afla in latura de SV a satului (DJ 217), la 2 km V din DN 1 A. Din Ploiesti pana la manastire, 19 km;</li>\n<li>Stareta: monahia Fanuria Berica;</li>\n<li>Despre manastirea Zamfira:</li>\n</ul>\n\n<p><figure class=\"center\"><img src=\"/images/zamfira.jpg\" alt=\"\"></figure></p>\n\n<p>Manastirea este situata in lunca din stanga raului Teleajan, pe soseaua paralela cu Drumul National 1A, la aproximativ 15 kilometri de orasul Ploiesti. Din punct de vedere administrativ-teritorial, manastirea este localizata pe raza comunei Lipanesti, in imediata apropiere a satului Zamfira.\nManastirea Zamfira - biserica de pe valea Teleajanului</p>\n\n<p>Asezamantul monahal Zamfira a fost ctitorit de arhimandritul Eftimie, staret alManastirii Ghighiu si dateaza de la jumatatea secolului al XIX-lea. Complexul monahal al Manastirii Zamfira cuprinde doua biserici: biserica veche, numita si \"biserica mica\", situata in cimitir si \"biserica mare\", situata chiar in incinta. Manastirea Zamfira are doua hramuri: Inaltarea Domnului si Sfantul Ierarh Nifon.</p>\n\n<p>Dupa cum reiese din pisania vechii biserici, Manastirea Zamfira a fost construita in timpul domnitorului Nicolae Mavrocordat, intre anii 1721-1743, la initiativa Zamfirei Apostoli, vaduva bogatului comerciant Manoil Apostoli.</p>\n\n<p>Dupa  moartea Zamfirei sarcina terminarii lucrarilor ii revine norei acesteia Smaranda, fiica agai Ion Balaceanu si nepoata voievodului Serban Cantacuzino, vaduva si ea la acea data. Nu  se cunoaste inca numele niciunuia dintre mesterii care au  lucrat aceasta ctitorie a Zamfirei si a Smarandei.</p>\n\n<p>Initial, rolul acesteia, asa cum rezulta din pisanie, era, ori de biserica de mir a catunului de clacasi ce slujeau pe mosiile Manoileselor, ori chiar de biserica de curte a acestora, caci profesorul Victor Bratulescu afla ca in imediata apropiere a bisericutei, aproximativ 60 de metri mai la nord, s-ar fi aflat si conacul ctitorilor, astazi complet disparut.</p>\n\n<p>Manastirea Zamfira, chiar de la ctitorire, primeste spre folosinta cateva pamanturi, desigur din avutul Smarandei, iar, dintr-un document datat 17 decembrie1776 aflam ca aici a fost numit un anume egumen Dionisie fapt ce ar duce la concluzia ca la acea data functia de biserica de mir era schimbata in aceea de schit de calugari.</p>\n\n<p>La moartea Smarandei Balaceanu-Apostoli, in anul 1780, biserica devine metoh alscaunului episcopal dinTargoviste. La anul 1832, Zamfira, cu un venit de 1800 de taleri, trece drept schit de maici si inchinat Manastirii Campulung, aceasta la randul ei apartinand de scaunul Mitropoliei din Bucuresti.</p>\n\n<p>Cutremurele din 1802 si 1838 aduc biserica in ruina astfel incat in 1842 arhimandritul Isaia Blejoianu, facand un inventar al bunurilor schitului, ia sub \"stapanirea sa\" bunurile pentru a putea sa le refaca. Interesant este faptul ca din acel inventar amanuntit lipseste orice mentionare cu privire la cladiri ce ar fi putut sa serveasca drept chilii pentru calugari sau calugarite functia de schit a acestui lacas la acea data fiind pusa sub indoiala.</p>\n\n<p>Odata cu accederea ierarhica a mitropolitului Nifon (1850-1875) incepe o perioada de inflorire pentru manastirile si metoacele ce tineau de Mitropolia de la Bucuresti. Acesta face o vizita in zona constatand ca \"nu se afla aici nici o alta urma care sa arate ca a existat aici, candva, acel asezamant, decat o mica biserica ruinata, in paraginire\".</p>\n\n<p>Probabil tocmai aceasta stare deplorabila a asezamantului il decid pe mitropolit sa cladeasca o alta biserica mai mare la 400 de pasi spre nord de vechiul altar. Noua biserica este terminata in anul 1858, dupa care incep lucrarile de refacere a celei vechi si de constructie a unei clopotnite noi.</p>\n\n<p>In anul 1860 sunt sistate lucrarile fara a se mai reface turla, pridvorul si curtea, astfel incat biserica Zamfirei si Smarandei devine, ceea ce este si astazi, un paraclis al noii ctitorii.</p>\n\n<p>Cutremurele din 1940 si mai ales cel din 1977 aduc mari stricaciuni cladirilor asezamantului monahal impunand o ampla campanie de refacere ce se intinde pe perioada 1977-1982 prin grija preafericitului patriarh Iustin Moisescu.</p>\n\n<h3>Manastirea Zamfira - arhitectura complexului monahal</h3>\n\n<p>Incinta complexului monastic este de forma unui patrulater cu latura dinspre E-V cu marimea de aproximativ 170 de metri, celelalte 3 laturi avand dimensiuni de aproximativ 130 de metri. In afara acestui spatiu se gaseste cimitirul vechi inprejmuit de un gard de sarma si uluci, precum si gradinile ce tin de manastire.</p>\n\n<p>Biserica Sfanta Treime, biserica veche, se afla in cimitirul din afara incintei. In ziua de azi biserica, substantial modificata fata de cea din prima jumatate a secolului al XVIII-lea, are o forma trilobata, avand absidele laterale octogonale (la origine rotunde) cu peretii laterali ai pridvorului mai distantati.</p>\n\n<p>Initial vechiul pridvor deschis acum sprijina acoperisul refacut pe sase coloane din caramida cu capiteluri din piatra lucrate la Cluj.  Pronaosul, in lungime aproximativ 2 metri, este prevazut in laterale cu doua ferestre avand deschiderea de 1.30 x 0.35 metri cu ancadramente de piatra. Trecerea dintre pronaos si naos este marcata de doi stalpi cu cu arcade simple. Naosul are o lunguime de circa 2.5 metri pana la catapeteasma, altarul masurand tot 2.5 metri.</p>\n\n<p>Peretii exteriori sunt simpli, zugraviti in alb, singurul ornament care poate fi observat sunt doua brauri sablonate ce cuprind biserica, cu exceptia pridvorului desigul; primul este situat la 1 metru sub cornisa, iar al doilea la 1.5 metri sub primul.</p>\n\n<p>Biserica este acoperita cu tabla galvanizata. Din acoperis creste un esafodaj cubic de zid, iar din acesta o turla octogonala. Pictura interioara (din cea veche nu s-a mai pastrat nici macar amintirea), in stil neo-bizantin, este de data recenta (terminata in 1982) si a fost executata cu maiestrie de catre pictorul Mihail-Bogdan Mochulschi. Pe peretele de sud se afla o incapere cu pivnita folosita drept osuar.</p>\n\n<p>In exteriorul bisericii mari, pe latura de sud, se afla mormintele a cinci membri din familia marelui istoric Iorga, iar pe latura din nord se gaseste mormantul profesorului de muzica bisericeasca Stefanache Popescu.</p>\n\n<p>Biserica noua, situata in curtea manastirii este fondata de Mitropolitul Nifon si construita intre anii 1855-1857 in scopul transferarii maicutelor de la Schitul \"Rosioara\" de la Filipesti de Padure. De la inceputuri viata monahala in manastire a fost implinita de aceste maici, care au fost aduse aici de la schitul Rosioara.</p>\n\n<p>Activitatea monahala a fost intrerupta de decretul 410 al lui Gheorghiu-Dej, din anul 1959, cand maicile au fost alungate si biserica a fost inchisa. Mai tarziu, manastirea a fost deschisa ca monument istoric si numai dupa 1970 a inceput sa fie locuita iarasi de maici, ca dupa revolutia din 1989 sa se inceapa o activitate monahala normala.</p>\n\n<p>Manastirea Zamfira are si o colectie de obiecte bisericesti - vesminte, haine de demult, cruci, potire si carti vechi - cu valoare de patrimoniu.</p>\n\n<h3>Manastirea Zamfira - nasterea, moartea si renasterea unei picturi unice</h3>\n\n<p>Pictura bisericii celei mari, din cadrul Manastirii Zamfira, a fost efectuata intre anii 1856-1857, de catre pictorul Nicolae Grigorescu, care avea atunci in jur de 18-19 ani.</p>\n\n<p>Degradandu-se pictura, in anul 1904, mitropolitul Ghenadie Petrescu a initiat executarea picturii in ulei, peste cea a lui N. Grigorescu, autor fiind pictorul Toma Vintilescu.</p>\n\n<p>Intre anii 1951-1953, pictorii Gheorghe Vanatoru si Constantin Calinescu fac repictari in tempera. Ultima si adevarata restaurare are loc in 1986-1989, cand pictorul Ion Chiriac inlatura toate picturile prin decupare si scoate la suprafata pictura originala a lui Nicolae Grigorescu, intervenind acolo unde a fost neaparat nevoie.</p>\n\n<h3>Manastirea Zamfira - singura lucrare \"in fresca\" a lui Nicolae Grigorescu</h3>\n\n<p>Importanta artistica a acestei manastiri consta in pictura sa pentru ca ea este prima biserica pictata in intregime de marele pictor Nicolae Grigorescu, la varsta de 18 ani. Acestuia i-a ajutat si fratele sau, Gheorghe Grigorescu (avand o varsta apropiata).</p>\n\n<p>Mai mult aceasta pictura poate fi considerata ca unicat, pentru ca ea este singura executata in \"fresca\" de Nicolae Grigorescu. Atat pictura murala cat si icoanele iconastasului au fost executate intr-un timp foarte scurt, de numai un an si doua luni (intre 16 iulie 1856 - data incheierii contractului si 8 septembrie 1857 - data sfintirii bisericii).</p>\n\n<p>Aceasta pictura a suportat mai multe restaurarii, ultima si cea mai importanta fiind cea executata intre 1986-1989 de pictorul restaurator Chiriac Ion, care a indepartat toate portiunile repictate si a scos la lumina pictura originala. Acesta adevarata bijuterie arhitectonica este  comparata cu un frumos chivot alb de catre cei ce au descris-o de-a lungul timpului.</p>"}, "docs/oltenia": function(exports, require, module) {module.exports = "<h1>Oltenia</h1>\n\n<p><br><br>        </p>\n\n<h4>\n    <ul>\n        <li><a href=\"/oltenia/brancoveni\">Brancoveni</a></li>\n        <br>\n        <li><a href=\"/oltenia/caluiu\">Caluiu</a></li>\n        <br>\n        <li><a href=\"/oltenia/clocociov\">Clocociov</a></li>\n    </ul>\n</h4>"}, "docs/oltenia/brancoveni": function(exports, require, module) {module.exports = "<h4 class=\"right\"><a href=\"/oltenia\">Inapoi</a></h4>\n\n<h1>Manastirea Brancoveni</h1>\n\n<p>Date generale:</p>\n\n<ul>\n<li>90 vietuitori, viata de obste</li>\n<li>Hram: Adormirea Maicii Domnului, Izvorul Tamaduirii, Sfintii Arhangheli Mihail si Gavriil (paraclis)</li>\n<li>Acces: DN65/E574 Slatina-Craiova 7,8 km, stanga pe DN64 catre Caracal, 10 km, stanga pe DC80 400 m</li>\n<li>Stareta: stavrofora Eufrosina Stanciu;</li>\n</ul>\n\n<p><figure class=\"center\"><img src=\"/images/brancoveni.jpg\" alt=\"\"></figure></p>\n\n<h3>Despre manastirea Brancoveni:</h3>\n\n<p>Manastirea Brancoveni este o manastire ortodoxa de maici, cu viata de obste, din comuna Brancoveni, judetul Olt, Romania. Manastirea se afla la o distanta de numai 20 de kilometri sud-vest de Slatina si la 6 kilometri de halta Parscoveni, pe linia ferata Piatra Olt - Caracal, putin mai inspre sud de localitatea Piatra Olt. La aceasta se ajunge pe drumul ce leaga intre ele localitatile Slatina si Craiova (DN65 / E574), facandu-se stanga, spre localitatea Caracal (DN64), iar mai apoi tot stanga, pe drumul comunal DC80. </p>\n\n<p>Pe harta stolnicului Constantin Cantacuzino, in care este desenata Tara Romaneasca, la inceputul secolului al XVII-lea, satul Brancoveni apare mentionat ca targ si resedinta a fostului judet Romanati. Alaturi, este desenata miniatura manastirii.</p>\n\n<p>Cu aceasta harta in mana, istoricul sirian si arhidiaconul Paul de Alep va vizita, putin dupa jumatatea aceluiasi veac, intreaga Valahie, trecand si pe la Brancoveni, despre care afla lucruri uimitoare, pe care le povesteste cu insufletire crestina, spre a fi ferite de uitare. </p>\n\n<p>Biserica cea mare a manastirii este inchinata Adormirii Maicii Domnului, iar biserica bolnita, aflata in afara zidurilor complexului monahal, este inchinata Sfintilor Arhangheli Mihail si Gavriil, cat si Izvorului Tamaduirii.</p>\n\n<h3>Manastirea Brancoveni - scurt istoric</h3>\n\n<p>Comuna Brancoveni este atestata documentar inca din timpul domnitorului Mircea cel Batran (1386-1418). Anii ce au urmat consemneaza interesul pentru acest tinut si al altor mari domnitori, precum: Neagoe Basarab, Mihai Viteazul, Matei Basarab, Sfantul Constantin Brancoveanu.</p>\n\n<p>Boierii din familia Brancovenilor construiesc, in secolul al XV-lea, ca loc de refugiu, ansamblul arhitectural Brancoveni. Inceputurile vietii monahale de la Brancoveni se pierd in veacurile indepartate ale istoriei, manastirea fiind refacuta de catre boierii Craiovesti.</p>\n\n<p>In anul 1570, jupanita Celea, strabunica domnitorului Matei Basarab, construieste pe locul actualului paraclis o bisericuta din lemn, la care slujeau calugarii. Prima atestare documentara a acesteia dateaza din anii 1582-1583, cand Mihnea Turcitu intareste daniile facute mai inainte. Cel mai vechi document de atestare pastrat este actul de danie din anul 1583, hrisovul din anul 1508, de care face amintire marele savant Nicolae Iorga, nemaifiind gasit.</p>\n\n<p>In urma vindecarii, cu apa izvorului din incinta manastirii, in semn de multumire adusa lui Dumnezeu, Matei Basarab, impreuna cu nepotul sau, Preda Brancoveanu - bunicul Sfantului Constantin Brancoveanu, refac manastirea intre anii 1634-1640.</p>\n\n<p>Cei doi construind chiliile, turnul clopotnita, casele si beciurile domnesti, picteaza ctitoria stramosilor sai si ridica ziduri de aparare, dand asezamantului un aspect de fortareata. Din vremea lui Matei Basarab se pastreaza turnul-clopotnita, spatioasele pivnite boltite, precum si zidul de aparare prevazut cu creneluri.</p>\n\n<p>Biserica cea mica, inchinata Sfintilor Arhangheli Mihail si Gavriil, a fost ridicata in anul 1700 si a devenit ulterior bolnita manastirii, aici fiind savarsite slujbele pentru monahii bolnavi si ranitii de razboi adapostiti uneori aici. Pictura din bolnita, lucrata in fresca, intr-un deosebit stil bizantin, este de o valoare inestimabila, aceasta fiind lucrata de mesterii Scolii de la Hurezi, condusi de grecul Constantinos.</p>\n\n<p>Sfantul domnitor Constantin Brancoveanu si-a petrecut aici vremea copilariei si a adolescentei. In anul 1674, fratele sau, numit Barbu, a murit la Constantinopol, iar trupul lui a fost adus si inmormantat aici.</p>\n\n<p>In anul 1688, doamna Stanca Brancoveanu, mama domnitorului, reinhumeaza in pronaos trupul sotului ei, numit Papa, omorat la Bucuresti, in anul 1655, si al lui Preda Brancoveanu. Dupa mai bine de 44 de ani de vaduvie, petrecuti in rugaciune si nevointe duhovnicesti, doamna Stanca adoarme intru Domnul la varsta de 66 de ani, fiind si ea inmormantata langa Papa si Preda Brancoveanu, sub o lespede de piatra cu stema familiei Cantacuzinilor (vulturul bicefal).</p>\n\n<p>Sfantul Constantin Brancoveanu hotareste restaurarea manastirii. Cei doi fii ai sai mai mari, anume Constantin si Stefan, au pus piatra de temelie a bisericii celei mari, cu hramul Adormirea Maicii Domnului. Constructia acesteia a durat numai doua luni, la 15 august 1699 ea fiind tarnosita, desi zugavirea ei s-a savarsit abia in anul 1704.</p>\n\n<p>Vremurile au fost grele pentru aceasta manastire. Astfel, in timpul razboiului turco-austriac (1716-1718) aceasta a fost partial arsa, iar dupa un mare cutremur, pagubele au fost iarasi semnificative. Intre anii 1721-1727, manastirea de la Brancoveni a fost tranformata in cazarma austriaca, doamna Marica Brancoveanu intervenind pe langa imparatul habsburgic, pentru eliberarea ei.</p>\n\n<p>Avariată grav in urma cutremurului din anul 1837-1838, biserica cea mare a fost partial recladita, in anul 1842, sub staretia monahului Teodosie din Trapezunt. Dupa aceasta, au urmat vremuri vitrege si stari de ruina.</p>\n\n<p>Secularizarea averilor manastiresti, petrecuta in vremea lui Alexandru Cuza, in anul 1864, a transformat Manastirea Brancoveni intr-un modest asezamant monahal. Obstea monahala de la Brancoveni se diminueaza, astfel incat in anul 1872 aici vor ramane numai patru vietuitori.</p>\n\n<p>Viata monahala de la Brancoveni a fost sustinuta de cei cativa calugari, dar si acestia au parasit-o, dupa moartea preotului Radu Sapca din Celei (1876), ultimul staret al manastirii si membru al Guvernului provizoriu de la Izlaz, din anul 1848. Acesta a fost inmormantat, mai intai in partea de nord a bisericii, iar apoi in pridvor.</p>\n\n<p>Manastirea Brancoveni a fost refacuta partial de episcopul Vartolomeu Stanescu. In aceasta perioada a fost adusa aici si icoana facatoare de minuni a Maicii Domnului, ferecata ceva mai tarziu in argint. Fericitul Patriarh Justinian s-a interesat indeaproape de restaurarea manastirii, acordandu-i acesteia un bogat sprijin material.</p>\n\n<p>Intre anii 1940-1959, manastirea a fost ocupata de o obste de maici, dar in urma decretului 410, din anul 1959, dat de Gheorghiu Dej, ea a fost desfiintata, in incinta acesteia infiintandu-se un azil de batrani. Cu aceasta ocazie, izvorul tamaduitor a fost mutat, din fata bisericii, in afara incintei, asa cum se vede pana astazi. Mai apoi, vreme de aproape 20 de ani, locul a ramas parasit.</p>\n\n<p>In anul 1975, Directia Monumentelor Istorice a inceput lucrarile de refacere a caselor domnesti. Abia dupa anul 1980 au fost aduse aici cateva maici de la Manastirea Clocociov si au inceput primele reparatii. Biserica cea mare s-a redeschis insa abia in anul 1985, ca manastire de maici, cu sprijinul Preasfintitului Episcop Gherasim Cristea al Ramnicului, al Preasfintitului Episcop Calinic al Argesului si al doamnei Elena Barbulescu, sora presedintelui Nicolae Ceausescu.</p>\n\n<p>Cu aceasta ocazie au fost efectuate mai multe lucrari, printre care: cele doua biserici monahale au fost subzidite, consolidate si reacoperite cu tabla zincata; s-au deschis drumuri de acces; s-a recuperat o parte din terenul agricol ce apartinuse manastirii; lacurile au fost drenate, iar dealurile, acoperite cu livezi.</p>\n\n<p>Biserica cea mare, reconstruita in anul 1700, tot in stilul arhitectural brancovenesc, este zidita in forma de cruce, fiind compartimentata in Altar, naos si pronaos. Pridvorul acesteia este deschis, sustinut de opt coloane din piatra, dispuse in centru. Peretii exteriori, varuiti in alb, sunt incinsi cu un brau median, iar in partea superioara, aproape de streasina, sunt inconjurati de trei randuri de caramizi asezate pe muchie, incastrate in zid.</p>\n\n<p>Biserica are o turla pe naos, de factura mai noua, cea veche prabusindu-se la cutremurul din anul 1837, iar usile sunt masive, din lemn de stejar sculptat, cu o compozitie compartimentata si cu un modelaj bogat. Usile din lemn de stejar masiv au fost sculptate de mesterul italian Giorgio Pesena Levin.</p>\n\n<p>Catapeteasma bisericii este cea originala, din lemn, avand inca si azi o sculptura bogat ornamentata, aurita. Pictura dateaza din anul 1837, autorii fiind necunoscuti. Bolnita dateaza din anul 1702, aceasta fiind construita in plan triconc. In pronaos sunt inmormantati Papa Brancoveanu, tatal Sfantului Constantin Brancoveanu, mama si bunica lui, iar in pridvor este inmormantata jupanita Celea.</p>\n\n<p>In beciul cel mare al manastirii, aflat sub Staretie, s-a amenajat un lapidariu model, unde au fost adapostite vremelnic si sculpturi de la bisericile daramate din Bucuresti. In muzeul manastirii se pastreaza coloanele Manastirii Vacaresti, icoane din secolul al XVIII-lea si pietrele funerare ale lui Ghica Voda, Barbu Vacarescu si ale postelnicului Dumitrescu.</p>"}, "docs/oltenia/caluiu": function(exports, require, module) {module.exports = "<h4 class=\"right\"><a href=\"/oltenia\">Inapoi</a></h4>\n\n<h1>Manastirea Caluiu</h1>\n\n<p>Date generale: </p>\n\n<ul>\n<li>5 vietuitori, viata de obste</li>\n<li>Hram: Sfantul Ierarh Nicolae</li>\n<li>Acces: din DN 65/E574, din Bals pe DJ 643 12,5 km, stanga in Calui pe DC 9, 3 km, pana in Gura Caluiului;</li>\n<li>Staret: arhim. Corneliu Miroslav;</li>\n</ul>\n\n<p><figure class=\"center\"><img src=\"/images/calui.jpg\" alt=\"\"></figure></p>\n\n<h3>Despre manastirea Caluiu:</h3>\n\n<p>Manastirea Calui se afla pe malul Oltetului, in apropiere de Craiova, nu departe de comuna Oboga, comuna renumita pentru ceramica ei populara. Dupa traditie, in acest loc in care a fost intemeiata manastirea, se spune ca Balan, calul lui Mihai Viteazu, a lovit cu copita in pamant si a tasnit apa. </p>\n\n<p>Asezamantul monahal, inconjurat de un puternic zid de caramida, caramida adusa de pe malul Oltetului si carata din mana in mana pe o distanta de un kilometru, a fost intemeiata intre anii 1516-1521, in timpul domniei lui Neagoe Basarab (1512-1521), de catre banul Vlad si fratii sai, Dumitru si Balica.</p>\n\n<p>Primii ctitori ridicand edificiul pana la nivelul temeliilor, nu l-au putut probabil termina datorita instabilitatii politice care a urmat domniei lui Neagoe Basarab. Manastirea Calui, cu hramul Sfantul Nicolae, a fost refacuta de catre boierii Craiovesti. Restaurarea si infrumusetarea ei au fost facute de catre fratii Buzesti in perioada 20 aprilie - 8 iunie 1588, atunci cand au fost infiintate si corpurile de chilii, dupa cum precizeaza pisania, sapata in piatra cu majuscule frumos executate, asezata deasupra usii de la intrarea in biserica. </p>\n\n<p>Ulterior monumentului i s-a adaugat un exonartex, marginit de arcade laterale.Biserica Sfantul Nicolae, de dimensiuni mici - 15 metri lungime si 6 metri latime - este un monument reprezentativ al arhitecturii muntenesti din secolul al XVI-lea, care se impune prin proportiile grandioase ale turlei si prin bogata decoratie a fatadelor. Fatadele bisericii au un parament de caramida si tencuiala, cu un puternic brau median, avand registrul inferior impartit in panouri dreptunghiulare, iar cel superior cu arcaturi duble.</p>\n\n<p>Interiorul pastreaza un ansamblu de picturi murale realizate de mesterul zugrav Mina intre anii 1593-1594, care ii infatiseaza pe Fratii Radu, Preda si Stroe Buzescu, precum si un tablou cu domnii Mihai Viteazu si Petru Cercel. Pictura va fi spalata in anul 1908.</p>\n\n<p>In 1608, Preda Buzescu, mare ban al Craiovei a fost inmormantat in pronaosul bisericii iar in anul 1610 cel mai batran dintre frati, Radu Buzescu, va fi ingropat in noua incapere. </p>\n\n<p>Icoana din dreapta altarului este facatoare de minuni. In felul ei, fiecare icoana estefacatoare de minuni. Trebuie doar sa ne lasam purtati de puterea rugaciunii si de chemarea credintei. Vom descoperi ca Dumnezeu este in toate si ca doar El ne va arata calea cea buna, zice unul dintre parintii manastirii - parintele Maxim.</p>\n\n<p>In curtea manastirii se afla turnul-clopotnita care dateaza din secolul al XVII-lea. In vremurile de restriste aici a fost cetate. Manastirea era in acea vreme foarte bogata, avand in stapanire nu mai putin de 30 de sate. De aceea, multe puteri au ravnit-o de-a lungul timpului.</p>\n\n<p>Biserica a fost renovata in anii 1650, 1828, 1834 si amplu restaurata in 1932-1937.</p>\n\n<p>Viata monahala de la Calui este intensa, chiar daca numarul vietuitorilor monahi nu este foarte ridicat. Fiecare dintre ei desfasoara, atunci cand ii vine randul, dupa ascultare, activitatile firesti din gospodaria monahala. Iar la bucatarie ii ajuta o maicuta.</p>\n\n<p>Asa cum se prezinta astazi, in ciuda amprentei lasate de vremi, manastirea Calui, ctitoria Buzestilor, constituie una din insemnatele dovezi ale aportului adus de mesterii autohtoni la dezvoltarea arhitecturii romanesti in secolul al XVI-lea.</p>"}, "docs/oltenia/clocociov": function(exports, require, module) {module.exports = "<h4 class=\"right\"><a href=\"/oltenia\">Inapoi</a></h4>\n\n<h1>Manastirea Clocociov</h1>\n\n<p>Date generale:</p>\n\n<ul>\n<li>50 vietuitoare, viata de obste</li>\n<li>Hram: Sfintii Arhangheli Mihail si Gavriil</li>\n<li>Stareta: monahia lulia Bagaceanu;</li>\n<li>Cazare: 70 locuri (vara)</li>\n<li>Adresa: str. Manastirii, nr. 3, Slatina, 230038, jud. Olt</li>\n</ul>\n\n<p><figure class=\"center\"><img src=\"/images/clocociov.jpg\" alt=\"\"></figure></p>\n\n<h3>Despre manastirea Clocociov:</h3>\n\n<p>Manastirea Clocociov este o manastire ortodoxa din judetul Olt. Fiind inchinata Sfintilor Arhangheli Mihail si Gavriil, manastirea se afla la marginea localitatii Slatina. Din gara Slatina, se ia autobuzul, pana la spitalul central, iar mai apoi se porneste pe Strada Basarabilor, pana la manastire.</p>\n\n<p>Manastirea Clocociov se numara printre cele mai vechi manastiri din tara, inceputurile acesteia pierzandu-le de-a lungul vremii. Nici macar pisania vechii biserici nu s-a pastrat, aceasta fiind initial din lemn sau distrugandu-se prin vitregiile vremii. Drept aceea, nici anul zidirii, nici ctitorii de la Clocociov nu sunt stiuti cu exactitate.</p>\n\n<p>Cu toate acestea, unele documente, precum si o fresca pastrata in manastire, il numesc drept ctitor pe voievodul muntean Mihai Viteazu (1593-1601). Dupa anul 1628, cladirile manastirii incep sa aibe de suferit, indreptarea acestora facandu-se din mila si dragostea de Dumnezeu a domnitorului Matei Basarab (1632-1654).</p>\n\n<p>Refacerea manastirii este atribuita, in oarecare parte, dregatorului Diicu Buicescu, sotiei acestuia, Dumitra, si mamei sale, Mara, cu totii rude de-ale domnitorului Matei Basarab; boierul Diicu era nepotul domnitorului. Biserica cea veche a inceput a fi zidita in anul 1645, in numai cateva luni de zile aceasta fiind savarsita. Ctitoria evlaviosului Buicescu, pe langa biserica, mai cuprinde si un corp de chilii, precum si un zid imprejmuitor.</p>\n\n<p>Potrivit unei traditii locale, fiind urmarit de turcii cei pagani, domnitorul Matei Basarb s-a ascuns in scorbura soc batran din padurea Clocociov. Scapand din mainile prigonitorilor, voievodul a fagaduit lui Dumnezeu ca va ridica in apropiere o manastire.</p>\n\n<p>Aceasta traditie este intarita si de un document din anul 1862, care marturiseste ca biserica de la Clocociov este zidita \"in anul 7153 (1645), de raposatul Matei Basarab Voda\". Documentul a fost intocmit probabil in urma pisaniei asezate pe biserica de catre boierul Buicescu, in anul 1645.</p>\n\n<p>Fiind inchinata Manastirii Cutlumus, din Sfantul Munte Athos, de catre domnitorul Alexandru Coconul, in perioada secolelor XVII-XVIII, manastirea dispunea de multe mosii, proprietati si bogatii. In data de 19 august 1657, patriarhul Macarie al III-lea al Antiohiei, aflat in trecere prin Tara Romaneasca, impreuna cu arhidiaconul sau, Paul de Alep, a poposit in Manastirea Clocociov. Din jurnalul de calatorie al arhidiaconului Paul de Alep, ne-a ramas urmatoarea marturie: \"O manastire cu hramul Sfantul Mihail, dar de obiceiu numita Clocociov, care seamana cu Manastirea Stanesti, de peste Olt, si este stapanita de egumeni si de calugari greci, de la Manastirea Cutlumus, din Sfantul Munte.\"</p>\n\n<p>Spre sfarsitul secolului al XVIII-lea, datorita si secularizarii averilor monahale, Manastirea Clocociov a avut si ea mult de suferit, complexul monahal fiind lasat aproape in parasire, jafurile neintarziind sa apara. Mai mult inca, Primul Razboi Mondial si cateva cutremure vor dauna si ele manastirii. Mai apoi, vreme de decenii, manastirea a zacut aproape pustie.</p>\n\n<p>Abia la inceputul anului 1976, in chiliile sarace ale manastirii se vor aseza ieromonahul Visarion Coman, impreuna cu cateva maici, venite de la Manastirea Sucevita. Complexul monahal se afla pe atunci intr-o situatie jalnica, biserica neamiavand turle, iar zidurile fiind grav avariate. La numai un an de la venirea aici, obstea a avut de infruntat cutremurul din anul 1977. Drept urmare, manastirea a fost complet reparata si restaurata, intre anii 1980-1981. Lucrarile au fost realizate cu ajutorul Arhiepiscopiei Ramnicului si al staretei de atunci, Mihaela Tamas.</p>\n\n<p>Manastirea Clocociov a fost imbracata iarasi in haine de sarbatoare: cele trei turle ale bisericii au fost rezidite si acoperite cu tabla de arama; acoperisul bisericii a fost si el schimbat; temelia bisericii a fost consolidata; staretia a fost rezidita in intregime; pivnitele s-au refacut si s-au intarit; clopotnita a fost restaurata; zidul de incinta a fost fortificat; in afara manastirii au fost randuite toate cele de folos intretinerii obstii.\nBiserica monahala de la Clocociov a fost construită in forma de cruce, avand un pridvor deschis si o impartire tipic bizantina. Desi zidurile si pisania sunt originale, pictura a trebuit insa innoita complet, astfel ea fiind lucrata in anul 1937, de mana zugravului Nicolae Pana. Din vechea pictura se mai pastreaza doar tabloul votiv.</p>"}, "docs/transilvania": function(exports, require, module) {module.exports = "<h1>Transilvania</h1>\n\n<p><br><br>        </p>\n\n<h4>\n    <ul>\n        <li><a href=\"/transilvania/dintrunlemn\">Dintr-un Lemn</a></li>\n        <br>\n        <li><a href=\"/transilvania/oasa\">Oasa</a></li>\n        <br>\n        <li><a href=\"/transilvania/sambatadesus\">Sambata de Sus</a></li>\n    </ul>\n</h4>"}, "docs/transilvania/dintrunlemn": function(exports, require, module) {module.exports = "<h4 class=\"right\"><a href=\"/transilvania\">Inapoi</a></h4>\n\n<h1>Manastirea Dintr-un Lemn</h1>\n\n<p>Date generale:</p>\n\n<ul>\n<li>40 vietuitoare, viata de obste</li>\n<li>Hram: Nasterea Maicii Domnului</li>\n<li>Acces: DN 64 Rm. Valcea-Dragasani 18 km, dreapta la Babeni pe DJ 646 2,5 km Francesti, dreapta DJ 646 6 km</li>\n<li>Stareta: monahia Emanuela Oprea;</li>\n</ul>\n\n<p><figure class=\"center\"><img src=\"/images/dintrunlemn.png\" alt=\"\"></figure></p>\n\n<h3>Despre manastirea Dintr-un lemn:</h3>\n\n<p>Manastirea Dintr-un Lemn este situata la aproximativ 25 de kilometri sud de municipiul Ramnicu Valcea si la 12 kilometri nord de Babeni, pe valea Otasaului, in comuna Francesti.</p>\n\n<p>Cea mai veche marturie despre manastire a fost consemnata in scris de diaconul Paul de Alep, care l-a insotit pe Patriarhul Macarie al Antiohiei in calatoriile acestuia prin Tarile Romanesti intre anii 1653-1658. El sustine ca un calugar ar fi gasit oicoana a Maicii Domnului in scorbura unui stejar secular. In acel moment el ar fi auzit o voce ce l-ar fi indemnat sa zideasca o manastire din trunchiul acelui copac.</p>\n\n<p>Potrivit unei vechi traditii locale, ar fi luat fiinta in primele decenii ale secolului al XVI-lea, prin edificarea in acest loc a materialului unui singur stejar. Ea a fost ridicata in cinstea Icoanei Maicii Domnului, icoana ce se pastreaza si azi in biserica de piatra a manastirii. In baza acestei traditii asezarea monahala de aici poarta numele Dintr-un Lemn.</p>\n\n<p>Mitropolitul Ungrovlahiei, Neofit Cretanul, cercetand manastirea la 29 iulie 1745 scria: un cioban cu numele Radu, in timpul lui Alexandru Voda (1568-1577), a visat IconaMaicii Domnului despre care aminteste Paul de Alep si, taind stejarul in care a fost gasita icoana, a facut din lemnul lui o bisericuta, numita din aceasta pricina Dintr-un Lemn.\nCam acelasi lucru afirma in anul 1842 si poetul Grigore Alexandrescu. Existenta stejarilor seculari, precum si a icoanei, se constituie astazi in probe de necontestat pentru adevarurile consacrate in legenda.</p>\n\n<p>Construita chiar pe locul stejarului purtator de icoana, dupa toate probabilitatile pe la mijlocul secolului al XVI-lea, bisericuta din lemn este lucrata din barne groase, incheiate in coada de randunica. Are o forma dreptunchiulara, cu absida altarului decrosata, cu o lungime totala de 13 metri, o latime de 5.50 metri si o inaltime de aproximativ 4 metri. Este inconjurata la exterior de un brau in torsada, sapat in grosimea lemnului, cu un pridvor deschis, fara turla.</p>\n\n<p>Iconostasul, sculptat in lemn de tei, in anul 1814, este o veritabila opera de arta ca si multe din icoanele de lemn ce impodobesc bisericuta in interior. Icoana Maicii Domnului de care este legata existenta acestui sfant asezamant monahal, este pastrata cu multa veneratie in biserica mare.</p>\n\n<p>Icoana are dimensiuni impresionante, fiind inalta de 1.50 metri si lata de 1.10 metri. In anul 1929, Andrei Grabar de la Universitatea din Strasbourg a vizitat manastirea si, studiind icoana, a identificat-o ca fiind pictata in secolul IV la manastirea Theothokos din Grecia, dupa un model care se spune ca ar fi apartinut Apostolului Luca, cel care a pictat-o pentru prima data pe Fecioara Maria. Conform traditiei, in lume se mai pastreaza trei exemplare asemenea celei de la Dintr-un Lemn.</p>\n\n<p>Profesorul I.D.Stefanescu afirma insa ca icoana a fost zugravita abia in a doua jumatate a secolului al XVI-lea. Conform lui A.M.Muzicescu icoana ar fi lucrata inainte de 1453, la Bizant sau la Muntele Athos, folosindu-se un model mai vechi. Cea din urma ipoteza este si cea mai plauzibila, dar modul in care icoana a ajuns la noi ramane necunoscut.</p>\n\n<p>Inceputurile Manastirii Dintr-un Lemn sunt legate, asa cum am vazut, de unele traditii sau legende care conserva fara indoiala o parte din adevar. Primul document in care apare numele asezamantului monahal de aici poarta data de 20 aprilie 1635.</p>\n\n<p>Intr-o alta marturie scrisa la data de 27 noiembrie 1640, Matei Basarab spune ca a zidit manastirea - de isnoava de-ntemei. El o insira printre manastirile pe care le-a intemeiat.</p>\n\n<p>Pisania bisericii de zid, aflata deasupra intrarii principale, care dateaza din anul 1715, scrisa la porunca lui Stefan Cantacuzino (1714-1716), confirma cele aflate din documentul din 1640 si anume: faptul ca biserica de zid a fost construita de Matei Basarab. De fapt si pomelnicul manastirii, scris de Dionisie, Eclesiarhul Mitropoliei de Bucuresti la anul 1804, dupa cel din anul 1715, la fila numarul sase il atesta ca ctitor pe Matei Basarab.</p>\n\n<p>Tot cu Matei Basarab incepe si pomelnicul din anul 1845 scris de Gheorghe Gherontie de la Hurezi, document in original, aflat in colectia manatirii. Cu toate acestea, Paul de Alep, care viziteaza manastirea, dupa cum am consemnat mai sus, in decursul anilor 1653-1658, deci la aproximativ 20 de ani dupa intemeierea bisericii de piatra, adauga la cele consemnate de tradita locala si de documentele scrise pana atunci ca manastirea este ctitoria unui mare spatar si boier contemporan cu Matei Basarab.</p>\n\n<p>La cele confirmate de Paul Alep si in baza unor documente mai recente, Radu Creteanu afima ca - autorul celei de a doua etape constructive a manastirii Dintr-un Lemn, a complexului edificiilor din piatra din care face parte si biserica din zid, nu poate fi altul decat insusi Preda Brancoveanu, fost mare spatar si mare culcer, mare vornic, viitor ban.</p>\n\n<p>Faptul ca unele documente il atesta pe Matei Basarab ca fiind ctitorul bisericii de piatra, iar altele pe Preda Brancoveanu, nu trebuie sa deruteze pe cercetator. Este posibil ca la aceasta constructie sa participe atat domnitorul, cat si ruda sa, marele boier Preda Brancoveanu. Acest fapt e confirmat de tabloul ctitorilor din pronaosul bisericii din piatra.</p>\n\n<p>Biserica de azi prezinta in linii generale arhitectura lui Matei Basarab. Din punct de vedere arhitectonic biserica de zid este in plan triconc, cu altar octogonal, iar pronaosul se termina cu un pridvor pe stalpi.\nPe langa icoana Sfintei Fecioare, de care este legat trecutul manastirii, se pastreaza cele doua policandre de la Serban Cantacuzino si doamna Marica Brancoveanu, cele trei icoane mari imparatesti, precum si alte 36 de icoane mai mici zugravite in anii 1833-1840 de Gheorghe Gherontie de la Hurezi.</p>\n\n<p>In 1715 Stefan Cantacuzino restaureaza in intregime clopotnita manastirii, situata la intrarea in incinta principala si Casa Domneasca. Dupa restaurarea din 1938-1940, facuta de Ministerul Aerului si Marinei, acest ansamblu monahal a devenit in mod simbolic altar de inchinare pentru aviatori si marinari.</p>\n\n<p>Manastirea Dintr-un Lemn poarta hramul Nasterea Maicii Domnului.</p>"}, "docs/transilvania/oasa": function(exports, require, module) {module.exports = "<h4 class=\"right\"><a href=\"/transilvania\">Inapoi</a></h4>\n\n<h1>Manastirea Oasa</h1>\n\n<p>Date generale:</p>\n\n<ul>\n<li>23 vietuitori, viata de obste</li>\n<li>Hram: Adormirea Maicii Domnului; Sfantul Mucenic Pantelimon (paraclis)</li>\n<li>Acces: DN 67C Sebes-Sugag-Tau-Bistra (44 km), apoi inca 23 km pana la manastire. Variante accesibile doar vara: DN 7A Petrosani-Obarsia Lotrului (34 km), DN 67C, Oasa, sau DN 7A Brezoi-Voineasa-Obarsia Lotrului (86 km), DN 67C, Oasa</li>\n<li>Staret: protos. Iustin Miron;</li>\n</ul>\n\n<p><figure class=\"center\"><img src=\"/images/oasa.jpg\" alt=\"\"></figure></p>\n\n<h3>Despre manastirea Oasa:</h3>\n\n<p>Manastirea Oasa este o manastire ortodoxa aflata in localitatea Sugag, judetul Alba. Aflata la o distanta de 70 de kilometri mai spre sud de Sebes si la 57 de kilometri nord-est fata de Petrosani, la poalele Muntilor Sureanu, Manastirea Oasa este o oaza de liniste, incojurata de paduri, cu vai si lacuri. Cel mai apropiat sat se afla la o distanta de peste patruzeci de kilometri de manastire.</p>\n\n<p>Biserica centrala a Manastirii Oasa este inchinata Adormirii Maicii Domnului, hram praznuit in ziua de 15 august, si Sfantului Mare Mucenic Pantelimon, hram praznuit in ziua de 27 iulie.</p>\n\n<p>Sfantul Pantelimon este sarbatorit din anul 303, anul mortii sale, pe data de 27 iulie. S-a nascut in anul 284 in orasul Nicomidia. Tatal sau Evstorghie era pagan, iar mama sa era crestina. A reusit sa-l aduca la dreapta credinta si pe tatal sau, iar dupa moartea acestuia si-a impartit toata averea saracilor si, pentru ca nu primea plata pentru tratamentele pe care le facea, el este numit \"doctor fara de arginti\".</p>\n\n<h3>Manastirea Oasa - scurt istoric</h3>\n\n<p>In anul 1943, scriitorul Ioan Pop si povestitorul Mihail Sadoveanu au ridicat in acest loc o bisericuta din lemn. Mai apoi, in anul 1983, prin purtarea de grija a episcopului Emilian Bardas, din Alba Iulia, a preotului Faur si a protopopului Viorel Porcaru, o veche biserica a fost reparata si imbunatatita, dupa care a fost adusa in acest loc.</p>\n\n<p>Biserica de lemn din Manastirea Oasa a fost stramutata in acest loc de pe raul Sebes, judetul Alba, odata cu amenajarea lacului de acumulare construit pe Valea Frumoasei. Mai tarziu, bisericuta a fost reparata si de preotul Petru Sora, din localitatea Sugag.</p>\n\n<p>In anul 1990, bisericuta a fost resfintita, iar in jurul ei s-a randuit o manastire de maicute. Pentru inceput, obstea a fost pusa sub indrumarea duhovniceasca a maicii starete Iustiniana Macarie. Obstea numara, pe atunci, in jur de douazeci de suflete. Cu ajutorul celor de la Hidrotehnica, maicile au reusit sa ridice mai multe corpuri de chilii, in jurul bisericutei: corpul de chilii, zidit in stil brancovenesc, cu etaj; staretia; trapeza si clopotnita.</p>\n\n<p>Iernile grele si accesul anevoios in acest loc au facut ca maicile sa intampine dificultati greu de biruit. Astfel, prin anul 1998, maicile au parasit manastirea. Mai apoi, in ziua de 1 iunie 2000, in acest loc pustiu si greu accesibil s-a asezat o obste de calugari.</p>\n\n<p>Manastirea este vietuita in intregime de straluciti calugari intelectuali, trecuti mai intai prin scoala insingurarii monahale de la Schitul Posaga, iar mai apoi initiati in tainele Filocaliei, de catre duhovnicul lor de la Manastirea Brancoveanu - Sambata de Sus,parintele Teofil Paraian.</p>\n\n<p>Fiecare vietuitor este dator sa-si urmeze inzestrarea sa proprie (cantare, scriere,pictura sau alt mestesug), precum si de a citi zilnic din Filocalie si din Sfintii Parinti. Parintele staret Iustin a terminat Facultatea de Electrotehnica, din Timisoara, parintele Pantelimon a absolvit Scoala de Arte Frumoase, parintele Serafim este medic, parintele Nectarie este teolog, parintele Moise este scriitor si editor, iar parintele Sava a terminat Conservatorul, in America.</p>\n\n<p>Biserica din Manastirea Oasa este din lemn, fiind zidita pe o fundatie de piatra, in forma de cruce. Biserica are o singura turla, fiind acoperita cu sindrila. Biserica de lemn a Manastirii Oasa a fost pictata, in fresca, intre anii 1985-1986, de catre pictorul Liviu Dumbrava, din Gura Humorului.\nTeodor Danalache</p>"}, "docs/transilvania/sambatadesus": function(exports, require, module) {module.exports = "<h4 class=\"right\"><a href=\"/transilvania\">Inapoi</a></h4>\n\n<h1>Manastirea Brancoveanu - Sambata de Sus</h1>\n\n<p>Date generale:</p>\n\n<ul>\n<li>38 vietuitori, viata de obste</li>\n<li>Hram: Adormirea Maicii Domnului, Izvorul Tamaduirii, Sfintii Martiri Brancoveni</li>\n<li>Acces: DN1, E68, Fagaras, com. Voila, ramificatie DL com. Sambata de Sus (13 km);</li>\n<li>Staret: arhim. Ilarion Urs</li>\n</ul>\n\n<p><figure class=\"center\"><img src=\"/images/sambatadesus.jpg\" alt=\"\"></figure></p>\n\n<h3>Despre manastirea Sambata de Sus:</h3>\n\n<p>Aflata pe valea raului Sambata, la poalele Muntilor Fagaras, este renumita ca loc de reculegere, mangaiere si intarire sufleteasca pentru credinciosii si vizitatorii ce se roaga ori poposesc in acest locas sfant.\nPoporul roman, care \"s-a nascut crestin\", are prin aceasta manastire, ca si prin celelalte foarte multe manastiri ortodoxe din Romania, cea mai trainica punte de legatura a tuturor romanilor, de-o parte si de alta a Carpatilor.</p>\n\n<h3>Manastirea Brancoveanu - Sambata de Sus - de-a lungul vremii</h3>\n\n<p>Istoria Manastirii Brancoveanu incepe din secolul al XVII-lea. In anul 1654 satul si mosia din Sambata de Sus au intrat in stapanirea lui Preda Brancoveanu, boier de loc din sudul Carpatilor, care a construit o bisericuta din lemn pe valea raului. Pe locul acesteia, in jurul anului 1696, primul ctitor, domnitorul Constantin Brancoveanu, domn al Tarii Romanesti intre anii 1688-1714, a zidit in piatra o manastire.</p>\n\n<p>La sfarsitul secolului al XVII-lea Transilvania abia scapase de incercarile principilor calvini de a o calviniza. Atacurile au continuat insa asupra punctului principal de rezistenta, credinta ortodoxa a romanilor, urmarind-se, de fapt, deznationalizarea lor.</p>\n\n<p>Pentru a intari si a salva Ortodoxia romana de noul pericol al catolicizarii, aparut prin trecerea Transilvaniei sub stapanirea Habsburgilor (1683), domnitorul Constantin Brancoveanu a intemeiat la Sambata de Sus o manastire ortodoxa, pentru a da marturie in timp despre unitatea de neam si credinta a romanilor de pe ambele versante ale Carpatilor.</p>\n\n<p>Persecutiile religioase ale stapanirii austro-ungare au facut mii de victime printre romani. Schimbarea credintei stramosesti a romanilor ar fi condus usor la pierderea identitatii lor nationale. Romanii ortodocsi au incercat sa reziste, fiind ajutati in primul rand, de bisericile si manastirile lor. Din aceasta cauza a inceput calvarul distrugeriimanastirilor si bisericilor din Transilvania. Mai mult de 150 de manastiri au fost distruse de generalul vienez Bukow. Multa vreme administratia austro-ungara nu s-a atins de Manastirea Brancoveanu.</p>\n\n<p>Dupa decapitarea domnitorului Constantin Brancoveanu de catre turci, in anul 1714, Curtea din Viena a tinut seama mai intai de mostenitoare, doamna Marica, sotia acestuia, si apoi de faptul ca mai ramasese in viata un nepot al domnitorului.</p>\n\n<p>In anul 1785, profitand de imprejurare, Viena, la cererea administratiei catolice, a trimis pe generalul Preiss, care a daramat manastirea brancovenilor. Chiliile au fost distruse complet, iar biserica a fost adusa in stare de ruina. Manastirea Brancoveanu, ultimul mare bastion al apararii Ortodoxiei in Tara Fagarasului, zidita intre anii 1696-1698, a fost distrusa in anul 1785.</p>\n\n<p>Dupa daramarea manastirii, palatul brancovenesc din Sambata de Sus, aflat la 10 kilometri departare de manastire, a fost locuit vremelnic de urmasi ai familiei Brancoveanu. Acestia au stapanit domeniul pana la reforma agrara din anul 1922, cand Ministerul Domeniilor a predat Mitropoliei din Sibiu domeniul brancovenesc impreuna cu ruinele si toata incinta Manastireasca de la Sambata de Sus.</p>\n\n<p>In decursul celor 140 de ani de parasire in ruine de la data distrugerii, se cunosc mai multe incercari de restaurare a manastirii. Cinstea de a deveni al doilea ctitor alManastirii Brancoveanu de la Sambata de Sus i-a revenit Mitropolitului Dr. Nicolae Balan, care a inceput restaurarea bisericii in anul 1926. Sfintirea a fost facuta in anul 1946, dupa razboi.</p>\n\n<p>Manastirea Brancoveanu - Sambata de Sus - biserica cea veche\nMitropolitul Nicolae Balan a pastrat in interiorul bisericii pictura veche; arhitectura bisericii manastirii se incadreaza intru totul in stilul brancovenesc, stil aparut la sfarsitul sec. al XVII-lea si inceputul sec. al XVIII-lea in Tara Romaneasca.</p>\n\n<p>La exterior, decoratia in piatra a incadrarilor de la usi si ferestre, dar mai ales a pilastrilor sculptati si a panourilor de piatra traforata din pridvorul bisericii dau o deosebita frumusete acestui monument. Braul de caramida asezat in zimti, acoperisul de sindrila si proportiile perfecte ne infatiseaza un monument vrednic de epoca domnitorului Brancoveanu. Turla bisericii este octogonala la exterior si cilindrica in interior.</p>\n\n<p>Interiorul bisericii, in forma de cruce, e impartit in altar, naos, pronaos si pridvor si este impartirea intalnita la mai toate bisericile construite in epoca lui Brancoveanu, ca si dupa aceea. Pictura din pridvorul bisericii e in intregime noua si cuprinde scene dinVechiul Testament, precum si Judecata de apoi, Raiul si Iadul.</p>\n\n<p>Intrarea din pridvor in pronaos se face printr-o usa de lemn de stejar, fixata intr-un ancadrament de piatra sculptata, iar deasupra usii se afla pisania sapata intr-o placa de piatra. Pe peretele vestic al pronaosului, unde este pictata Maica Domnului, se afla tabloul votiv al ctitorilor Brancoveni.</p>\n\n<p>In naos, pictura e aranjata in cinci registre: sfinti mucenici, scene din Noul Testament, prooroci, Invierea Domnului si Schimbarea la Fata. Tampla bisericii, construita din zid masiv, care permite intrarea in altar prin trei usi, este de asemenea pictata in intregime in fresca cu icoane corespunzatoare canonului bisericesc.</p>\n\n<p>Pictura in fresca a altarului e dispusa in patru registre: Maica Domnului pe tron, Impartasirea Apostolilor, Sfinti Ierarhi - in doua registre. Mai jos de biserica, la circa 50 de metri, Mitropolitul Nicolae Balan a reconstruit si vechea clopotnita a manastirii in forma initiala, unde pana in anul 1997 - cand au fost mutate in turla noii incinte - au fost adapostite cele 5 clopote foarte bine armonizate, a caror greutate depaseste 2.000 kg.</p>\n\n<p>Manastirea Brancoveanu - Sambata de Sus - chiliile si alte anexe\nIn anii 1976-1977 s-a imprejmuit suprafata aflata in proprietatea manastirii, asezandu-se o noua poarta sculptata in lemn de stejar si s-a incheiat lucrarea de restaurare a paraclisului brancovenesc, executat in lemn de stejar sculptat in motive brancovenesti, iar in interior decorat cu picturi neobizantine.</p>\n\n<p>Fantana \"Izvorul Tamaduirii\", atestata documentar din sec. al XVI-lea, cea mai veche piesa din incinta manastirii, in jurul careia, de-a lungul timpului, s-au petrecut si tesut multe intamplari miraculoase si legende, a fost restaurata, mai intai, de Mitropolitul Nicolae Balan, iar in zilele noastre s-a construit in jurul ei un baldachin sculptat in lemn de stejar. Tot ca o lucrare de innoire a Manastirii Brancoveanu se inscrie si renovarea si extinderea altarului din padure, unde se savarsesc slujbele religioase in aer liber.</p>\n\n<p>Al treilea ctitor al Manastirii Brancoveanu de la Sambata de Sus este I.P.S. Dr. Antonie Plamadeala, ales in anul 1982 Arhiepiscop al Sibiului, Mitropolit al Transilvaniei,Crisanei si Maramuresului.</p>\n\n<p>P.S. Antonie a rezidit din temelie incinta Manastirii Brancoveanu, lucrare inceputa in anul 1985. Sub indrumarea sa directa s-au facut reparatii capitale si s-a restaurat pictura de la vechea biserica brancoveneasca.</p>\n\n<p>Imprejurul ei s-a ridicat din temelii incinta in stil brancovenesc, in forma de patrulater, potrivit traditiei ortodoxe romanesti, compusa din doua corpuri masive de cladiri cu doua nivele - unul spre nord si altul spre sud; trei foisoare sculptate in piatra impodobesc incinta in exterior si interior.</p>\n\n<p>Corpul de cladiri asezat pe latura de nord cuprinde intre altele, la parter, o trapeza incapatoare, bucatarie si chilii, la etaj, casa brancoveneasca, o mare biblioteca, un arhondaric, iar la mansarda muzeul unde sunt expuse icoane vechi pe sticla si lemn si obiecte de patrimoniu colectionate de I.P.S. Antonie, toate aceste spatii marturisind intentia de a face din Manastirea Brancoveanu un centru de spiritualitate ortodoxa si de cultura romaneasca.</p>\n\n<p>Ca o recunoastere a meritelor si suferintelor domnitorului martir, ctitorul Manastirii de la Sambata de Sus, Constantin Brancoveanu impreuna cu cei patru fii ai sai, Constantin, Stefan, Radu si Matei si cu ginerele sau, sfetnicul Ianache, acestia au fost canonizati la 21 iulie 1992 de catre Sfantul Sinod al Bisericii Ortodoxe Romane, iar sarbatorirea lor inscrisa in calendarul ortodox sub denumirea de \"Sfintii Martiri Brancoveni\" se face in 16 august.</p>\n\n<h3>Manastirea Brancoveanu - Sambata de Sus - biserica cea noua</h3>\n\n<p>Dupa 208 ani de la daramarea ei in anul 1785, Manastirea Brancoveanu a reinviat in ziua de duminica, 15 august 1993, la sarbatoarea \"Adormirea Maicii Domnului\", cand s-a sfintit biserica noua ce poarta hramul Sfintilor Martiri Brancoveni, ca si intreaga manastire.</p>\n\n<p>Sfintirea a fost savarsita de catre Sanctitatea Sa Bartolomeos I, Arhiepiscop al Constantinopolului, Noua Roma, Patriarh Ecumenic, de catre Prea Fericitul ParinteTeoctist, Arhiepiscop al Bucurestiului, Mitropolit al Munteniei si Dobrogei si Patriarh al Romaniei, de catre I.P.S. Dr. Antonie, Mitropolit al Transilvaniei, Crisanei si Maramuresului si de alti inalti ierarhi, preoti si diaconi.</p>\n\n<p>In prezent obstea Manastirii Brancoveanu de la Sambata de Sus este alcatuita din 35 de vietuitori, parinte staret fiind arhimandritul Ilarion Urs.\nManastirea Brancoveanu - Sambata de Sus - \"Academia de la Sambata\"\nUnul din obiectivele cultural-religioase care maresc stralucirea pe care o are Manastirea Brancoveanu este si viitoarea \"Academia Sambata - spiritualitate, cultura, arta, stiinta\", care a fost inaugurata la hramul manastirii \"Adormirea Maicii Domnului\" din 15 august 2003.</p>\n\n<p>Gandul cu care Inalt Prea Sfintitul Mitropolit Antonie a purces la ridicarea acestei academii de vara - este vorba de o cladire cu aproximativ 70 de camere, respectiv 130 de locuri si un amfiteatru cu o capacitate de 150 locuri - a fost ca in acest spatiu sa poata fi primiti, gazduiti si serviti oameni din afara, care in dorinta lor de studiu si retragere sa se poata bucura de conditiile oferite de manastire, de materialul stiintific necesar studiului pus la dispozitie de nou amenajata biblioteca, precum si de atmosfera propice studiului oferita de cadrul natural.</p>\n\n<p>Academia este proiectata ca un loc unde sa se desfasoare diferite conferinte pe teme religioase, culturale, stiintifice si artistice - centru international - unde sa se adune pentru dezbateri reprezentanti ai tuturor confesiunilor crestine, angajati in dialogul ecumenic de reconciliere a crestinilor, dar si de alta natura.</p>\n\n<p>Avantajul oferit de Academie este acela ca pe langa programul de dezbateri si studii, participantii pot participa la slujbele religioase oficiate in cadrul manastirii, astfel incat cei de religie ortodoxa se vor putea ruga aici impreuna cu monahii din manastire, iar cei de alte confesiuni au prilejul sa cunoasca frumusetea cultului ortodox.</p>\n\n<p>Sala de conferinta, cu loja si camera pentru traduceri simultane, este dotata cu aparatura electronica ultramoderna, computere, sistem de sonorizare si videoproiectie. Exista aici camere tip apartament sau simple cu doua sau trei paturi, mobilate cu gust, dispunand fiecare de toaleta cu apa calda permanent. Incalzirea cladirii este asigurata printr-o centrala proprie ce functioneaza cu gaz metan centrala formata din zece unitati distincte, legate in \"cascada\", care asigura si apa calda menajera.</p>\n\n<p>Cladirea are forma literei T, piciorul literei fiind aula, iar cele doua parti laterale formeaza doua corpuri distincte legate intre ele printr-o monumentala scara din marmura alba. In cele doua aripi, pe trei si respectiv patru nivele sunt amplasate camerele de cazare, cele de la etaj avand balcon cu vedere spre \"Ferestrele\" Muntilor Fagaras. In holul mare sunt gazduite expozitii temporare ale artistilor plastici sau participantilor la conferinte.</p>\n\n<p>Triunghiul frontonului este decorat cu un mozaic reprezentand \"Sfanta Treime de la Stejarul Mamvri\", iar spatiul verde este amenajat cu alei luminate, gard viu, si central un mic bazin din care tasneste o frumoasa fantana arteziana.</p>"}, "helpers/DependenciesManager": function(exports, require, module) {(function() {
  var DepErr, DepMan, _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice;

  DepMan = (function(_super) {
    __extends(DepMan, _super);

    function DepMan(basePrefix, deps) {
      this.basePrefix = basePrefix != null ? basePrefix : "";
      this.deps = deps != null ? deps : [];
      this.googleFont = __bind(this.googleFont, this);
      this.lib = __bind(this.lib, this);
      this.model = __bind(this.model, this);
      this.controller = __bind(this.controller, this);
      this.helper = __bind(this.helper, this);
      this.stylesheet = __bind(this.stylesheet, this);
      this.doc = __bind(this.doc, this);
      this.render = __bind(this.render, this);
      this._require = __bind(this._require, this);
      this.echo("Activated DependenciesManager!");
    }

    DepMan.prototype._require = function(module, prefix) {
      var e;

      if (prefix == null) {
        prefix = "";
      }
      try {
        this.deps["" + prefix + module] = require("" + this.basePrefix + prefix + module);
        return this.deps["" + prefix + module];
      } catch (_error) {
        e = _error;
        throw DepErr.generate(1, "[BP= " + this.basePrefix + "][P= " + prefix + "][P= " + module + "] " + (DepErr.wrapCustomError(e)));
      }
    };

    DepMan.prototype.render = function() {
      var args, module;

      module = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      return (this._require(module, "views/")).apply(this, args);
    };

    DepMan.prototype.doc = function(module) {
      return this._require(module, "docs/");
    };

    DepMan.prototype.stylesheet = function(module) {
      return this._require(module, "stylesheets/");
    };

    DepMan.prototype.helper = function(module) {
      return this._require(module, "helpers/");
    };

    DepMan.prototype.controller = function(module) {
      return this._require(module, "controllers/");
    };

    DepMan.prototype.model = function(module) {
      return this._require(module, "models/");
    };

    DepMan.prototype.lib = function(module) {
      return this._require(module, "libs/");
    };

    DepMan.prototype.googleFont = function(font, sizes, subsets) {
      var names, string, _s;

      if (subsets == null) {
        subsets = null;
      }
      names = font.split(" ");
      _s = this.deps["" + font] = document.createElement("link");
      string = "http://fonts.googleapis.com/css?family=" + (names.join("+")) + ":" + (sizes.join(","));
      if (subsets != null) {
        string += "&subset=" + (subsets.join(","));
      }
      _s.setAttribute("href", string);
      _s.setAttribute("rel", "stylesheet");
      _s.setAttribute("type", "text/css");
      document.head.appendChild(_s);
      return _s;
    };

    return DepMan;

  })(BaseObject);

  DepErr = (function(_super) {
    __extends(DepErr, _super);

    function DepErr() {
      _ref = DepErr.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    DepErr.errors = {
      "RequireError": ["Could not require module!"]
    };

    DepErr.extend(IS.ErrorReporter);

    return DepErr;

  })(IS.Object);

  module.exports = DepMan;

}).call(this);
}, "helpers/LinkManager": function(exports, require, module) {(function() {
  var LinkManager, _first,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _first = true;

  LinkManager = (function(_super) {
    __extends(LinkManager, _super);

    function LinkManager(history, routes) {
      var _this = this;

      this.history = history != null ? history : [];
      this.routes = routes != null ? routes : [];
      this.linkAllAnchors = __bind(this.linkAllAnchors, this);
      this.getParentAnchor = __bind(this.getParentAnchor, this);
      this.link = __bind(this.link, this);
      this.checkRoute = __bind(this.checkRoute, this);
      this.setRoutes = __bind(this.setRoutes, this);
      window.addEventListener("popstate", (function(e) {
        if (_first) {
          return _first = false;
          return _this.checkRoute();
        }
      }));
      this.echo("LinkManager Activated!");
    }

    LinkManager.prototype.setRoutes = function(routePatterns) {
      var handler, route;

      for (route in routePatterns) {
        handler = routePatterns[route];
        this.routes.push({
          route: route,
          handler: handler
        });
      }
      return this.checkRoute();
    };

    LinkManager.prototype.checkRoute = function(after) {
      var args, l, loc, r, res, route, routeSet, _baseLoc, _i, _len, _loc, _ref;

      if (after == null) {
        after = "";
      }
      if (after[0] === "/") {
        loc = after;
      } else {
        loc = window.location.pathname + after;
      }
      _baseLoc = loc;
      if (loc[loc.length - 1] === "/") {
        loc = loc.substr(0, loc.length - 1);
      }
      _loc = loc;
      _ref = this.routes;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        routeSet = _ref[_i];
        loc = _loc.split("/");
        route = routeSet.route;
        if (route[route.length - 1] === "/") {
          route = route.substr(0, route.length - 1);
        }
        route = route.split("/");
        args = [];
        res = true;
        while (route.length && res) {
          r = route.shift();
          l = loc.shift();
          if (r[0] === ":") {
            args[r.substr(1)] = l;
          } else if (r[0] === "*") {
            args[0] = "" + l + "/" + (loc.join("/"));
            loc = "";
            break;
          } else {
            if (r !== l) {
              res = false;
            }
          }
        }
        if (res && loc.length === 0) {
          document.body.setAttribute("id", _baseLoc.substr(1));
          return routeSet.handler(args, after);
        } else {
          continue;
        }
      }
      document.body.innerHTML = DepMan.render(404, {
        title: "ATLAS",
        text: "404",
        reason: "This page either does not exist, or it is hidden.",
        message: "Why would it be hidden? Well, monkeys are always rapaging through the labs, and sometimes want to play hide and seek with our pages.\n\nThat, or  you don't have permission to view those files."
      });
      this.linkAllAnchors();
      return false;
    };

    LinkManager.prototype.link = function(e) {
      debugger;
      var el, _l;

      if (e.substr != null) {
        _l = e;
      } else {
        el = this.getParentAnchor(e.srcElement);
        _l = el.getAttribute("href");
      }
      if (this.checkRoute(_l)) {
        history.pushState(null, null, _l);
      }
      if (typeof e.preventDefault === "function") {
        e.preventDefault();
      }
      return false;
    };

    LinkManager.prototype.getParentAnchor = function(e) {
      if (e == null) {
        return null;
      }
      if (e.tagName === "A") {
        return e;
      }
      return this.getParentAnchor(e.parentNode);
    };

    LinkManager.prototype.linkAllAnchors = function() {
      var anchor, anchors, _i, _len, _results;

      anchors = document.querySelectorAll("a");
      _results = [];
      for (_i = 0, _len = anchors.length; _i < _len; _i++) {
        anchor = anchors[_i];
        _results.push(anchor.addEventListener("click", this.link));
      }
      return _results;
    };

    return LinkManager;

  })(BaseObject);

  module.exports = LinkManager;

}).call(this);
}, "libs/jquery": function(exports, require, module) {/*!
 * jQuery JavaScript Library v1.9.0
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2012 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2013-1-14
 */
(function( window, undefined ) {
"use strict";
var
	// A central reference to the root jQuery(document)
	rootjQuery,

	// The deferred used on DOM ready
	readyList,

	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,
	location = window.location,

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$,

	// [[Class]] -> type pairs
	class2type = {},

	// List of deleted data cache ids, so we can reuse them
	core_deletedIds = [],

	core_version = "1.9.0",

	// Save a reference to some core methods
	core_concat = core_deletedIds.concat,
	core_push = core_deletedIds.push,
	core_slice = core_deletedIds.slice,
	core_indexOf = core_deletedIds.indexOf,
	core_toString = class2type.toString,
	core_hasOwn = class2type.hasOwnProperty,
	core_trim = core_version.trim,

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		return new jQuery.fn.init( selector, context, rootjQuery );
	},

	// Used for matching numbers
	core_pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,

	// Used for splitting on whitespace
	core_rnotwhite = /\S+/g,

	// Make sure we trim BOM and NBSP (here's looking at you, Safari 5.0 and IE)
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	// Match a standalone tag
	rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,

	// JSON RegExp
	rvalidchars = /^[\],:{}\s]*$/,
	rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g,
	rvalidescape = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
	rvalidtokens = /"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	},

	// The ready event handler and self cleanup method
	DOMContentLoaded = function() {
		if ( document.addEventListener ) {
			document.removeEventListener( "DOMContentLoaded", DOMContentLoaded, false );
			jQuery.ready();
		} else if ( document.readyState === "complete" ) {
			// we're here because readyState === "complete" in oldIE
			// which is good enough for us to call the dom ready!
			document.detachEvent( "onreadystatechange", DOMContentLoaded );
			jQuery.ready();
		}
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: core_version,

	constructor: jQuery,
	init: function( selector, context, rootjQuery ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// scripts is true for back-compat
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[2] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return rootjQuery.ready( selector );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	},

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	// The number of elements contained in the matched element set
	size: function() {
		return this.length;
	},

	toArray: function() {
		return core_slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num == null ?

			// Return a 'clean' array
			this.toArray() :

			// Return just the object
			( num < 0 ? this[ this.length + num ] : this[ num ] );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	ready: function( fn ) {
		// Add the callback
		jQuery.ready.promise().done( fn );

		return this;
	},

	slice: function() {
		return this.pushStack( core_slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: core_push,
	sort: [].sort,
	splice: [].splice
};

// Give the init function the jQuery prototype for later instantiation
jQuery.fn.init.prototype = jQuery.fn;

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;
		target = arguments[1] || {};
		// skip the boolean and the target
		i = 2;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( length === i ) {
		target = this;
		--i;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	noConflict: function( deep ) {
		if ( window.$ === jQuery ) {
			window.$ = _$;
		}

		if ( deep && window.jQuery === jQuery ) {
			window.jQuery = _jQuery;
		}

		return jQuery;
	},

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
		if ( !document.body ) {
			return setTimeout( jQuery.ready );
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.trigger ) {
			jQuery( document ).trigger("ready").off("ready");
		}
	},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type(obj) === "array";
	},

	isWindow: function( obj ) {
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {
		return !isNaN( parseFloat(obj) ) && isFinite( obj );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return String( obj );
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ core_toString.call(obj) ] || "object" :
			typeof obj;
	},

	isPlainObject: function( obj ) {
		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {
			// Not own constructor property must be Object
			if ( obj.constructor &&
				!core_hasOwn.call(obj, "constructor") &&
				!core_hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
				return false;
			}
		} catch ( e ) {
			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.

		var key;
		for ( key in obj ) {}

		return key === undefined || core_hasOwn.call( obj, key );
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	error: function( msg ) {
		throw new Error( msg );
	},

	// data: string of html
	// context (optional): If specified, the fragment will be created in this context, defaults to document
	// keepScripts (optional): If true, will include scripts passed in the html string
	parseHTML: function( data, context, keepScripts ) {
		if ( !data || typeof data !== "string" ) {
			return null;
		}
		if ( typeof context === "boolean" ) {
			keepScripts = context;
			context = false;
		}
		context = context || document;

		var parsed = rsingleTag.exec( data ),
			scripts = !keepScripts && [];

		// Single tag
		if ( parsed ) {
			return [ context.createElement( parsed[1] ) ];
		}

		parsed = jQuery.buildFragment( [ data ], context, scripts );
		if ( scripts ) {
			jQuery( scripts ).remove();
		}
		return jQuery.merge( [], parsed.childNodes );
	},

	parseJSON: function( data ) {
		// Attempt to parse using the native JSON parser first
		if ( window.JSON && window.JSON.parse ) {
			return window.JSON.parse( data );
		}

		if ( data === null ) {
			return data;
		}

		if ( typeof data === "string" ) {

			// Make sure leading/trailing whitespace is removed (IE can't handle it)
			data = jQuery.trim( data );

			if ( data ) {
				// Make sure the incoming data is actual JSON
				// Logic borrowed from http://json.org/json2.js
				if ( rvalidchars.test( data.replace( rvalidescape, "@" )
					.replace( rvalidtokens, "]" )
					.replace( rvalidbraces, "")) ) {

					return ( new Function( "return " + data ) )();
				}
			}
		}

		jQuery.error( "Invalid JSON: " + data );
	},

	// Cross-browser xml parsing
	parseXML: function( data ) {
		var xml, tmp;
		if ( !data || typeof data !== "string" ) {
			return null;
		}
		try {
			if ( window.DOMParser ) { // Standard
				tmp = new DOMParser();
				xml = tmp.parseFromString( data , "text/xml" );
			} else { // IE
				xml = new ActiveXObject( "Microsoft.XMLDOM" );
				xml.async = "false";
				xml.loadXML( data );
			}
		} catch( e ) {
			xml = undefined;
		}
		if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
			jQuery.error( "Invalid XML: " + data );
		}
		return xml;
	},

	noop: function() {},

	// Evaluates a script in a global context
	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {
			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data );
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Use native String.trim function wherever possible
	trim: core_trim && !core_trim.call("\uFEFF\xA0") ?
		function( text ) {
			return text == null ?
				"" :
				core_trim.call( text );
		} :

		// Otherwise use our own trimming functionality
		function( text ) {
			return text == null ?
				"" :
				( text + "" ).replace( rtrim, "" );
		},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				core_push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( core_indexOf ) {
				return core_indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {
				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var l = second.length,
			i = first.length,
			j = 0;

		if ( typeof l === "number" ) {
			for ( ; j < l; j++ ) {
				first[ i++ ] = second[ j ];
			}
		} else {
			while ( second[j] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, inv ) {
		var retVal,
			ret = [],
			i = 0,
			length = elems.length;
		inv = !!inv;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			retVal = !!callback( elems[ i ], i );
			if ( inv !== retVal ) {
				ret.push( elems[ i ] );
			}
		}

		return ret;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret[ ret.length ] = value;
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret[ ret.length ] = value;
				}
			}
		}

		// Flatten any nested arrays
		return core_concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = core_slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( core_slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	// Multifunctional method to get and set values of a collection
	// The value/s can optionally be executed if it's a function
	access: function( elems, fn, key, value, chainable, emptyGet, raw ) {
		var i = 0,
			length = elems.length,
			bulk = key == null;

		// Sets many values
		if ( jQuery.type( key ) === "object" ) {
			chainable = true;
			for ( i in key ) {
				jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
			}

		// Sets one value
		} else if ( value !== undefined ) {
			chainable = true;

			if ( !jQuery.isFunction( value ) ) {
				raw = true;
			}

			if ( bulk ) {
				// Bulk operations run against the entire set
				if ( raw ) {
					fn.call( elems, value );
					fn = null;

				// ...except when executing function values
				} else {
					bulk = fn;
					fn = function( elem, key, value ) {
						return bulk.call( jQuery( elem ), value );
					};
				}
			}

			if ( fn ) {
				for ( ; i < length; i++ ) {
					fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
				}
			}
		}

		return chainable ?
			elems :

			// Gets
			bulk ?
				fn.call( elems ) :
				length ? fn( elems[0], key ) : emptyGet;
	},

	now: function() {
		return ( new Date() ).getTime();
	}
});

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// we once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {
			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", DOMContentLoaded, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", jQuery.ready, false );

		// If IE event model is used
		} else {
			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", DOMContentLoaded );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", jQuery.ready );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch(e) {}

			if ( top && top.doScroll ) {
				(function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {
							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll("left");
						} catch(e) {
							return setTimeout( doScrollCheck, 50 );
						}

						// and execute any waiting functions
						jQuery.ready();
					}
				})();
			}
		}
	}
	return readyList.promise( obj );
};

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {
	var length = obj.length,
		type = jQuery.type( obj );

	if ( jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || type !== "function" &&
		( length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj );
}

// All jQuery objects should point back to these
rootjQuery = jQuery(document);
// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( core_rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// Flag to know if list is currently firing
		firing,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Control if a given callback is in the list
			has: function( fn ) {
				return jQuery.inArray( fn, list ) > -1;
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				args = args || [];
				args = [ context, args.slice ? args.slice() : args ];
				if ( list && ( !fired || stack ) ) {
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};
jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var action = tuple[ 0 ],
								fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ action + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = core_slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? core_slice.call( arguments ) : value;
					if( values === progressValues ) {
						deferred.notifyWith( contexts, values );
					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});
jQuery.support = (function() {

	var support, all, a, select, opt, input, fragment, eventName, isSupported, i,
		div = document.createElement("div");

	// Setup
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// Support tests won't run in some limited or non-browser environments
	all = div.getElementsByTagName("*");
	a = div.getElementsByTagName("a")[ 0 ];
	if ( !all || !a || !all.length ) {
		return {};
	}

	// First batch of tests
	select = document.createElement("select");
	opt = select.appendChild( document.createElement("option") );
	input = div.getElementsByTagName("input")[ 0 ];

	a.style.cssText = "top:1px;float:left;opacity:.5";
	support = {
		// Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
		getSetAttribute: div.className !== "t",

		// IE strips leading whitespace when .innerHTML is used
		leadingWhitespace: div.firstChild.nodeType === 3,

		// Make sure that tbody elements aren't automatically inserted
		// IE will insert them into empty tables
		tbody: !div.getElementsByTagName("tbody").length,

		// Make sure that link elements get serialized correctly by innerHTML
		// This requires a wrapper element in IE
		htmlSerialize: !!div.getElementsByTagName("link").length,

		// Get the style information from getAttribute
		// (IE uses .cssText instead)
		style: /top/.test( a.getAttribute("style") ),

		// Make sure that URLs aren't manipulated
		// (IE normalizes it by default)
		hrefNormalized: a.getAttribute("href") === "/a",

		// Make sure that element opacity exists
		// (IE uses filter instead)
		// Use a regex to work around a WebKit issue. See #5145
		opacity: /^0.5/.test( a.style.opacity ),

		// Verify style float existence
		// (IE uses styleFloat instead of cssFloat)
		cssFloat: !!a.style.cssFloat,

		// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
		checkOn: !!input.value,

		// Make sure that a selected-by-default option has a working selected property.
		// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
		optSelected: opt.selected,

		// Tests for enctype support on a form (#6743)
		enctype: !!document.createElement("form").enctype,

		// Makes sure cloning an html5 element does not cause problems
		// Where outerHTML is undefined, this still works
		html5Clone: document.createElement("nav").cloneNode( true ).outerHTML !== "<:nav></:nav>",

		// jQuery.support.boxModel DEPRECATED in 1.8 since we don't support Quirks Mode
		boxModel: document.compatMode === "CSS1Compat",

		// Will be defined later
		deleteExpando: true,
		noCloneEvent: true,
		inlineBlockNeedsLayout: false,
		shrinkWrapBlocks: false,
		reliableMarginRight: true,
		boxSizingReliable: true,
		pixelPosition: false
	};

	// Make sure checked status is properly cloned
	input.checked = true;
	support.noCloneChecked = input.cloneNode( true ).checked;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE<9
	try {
		delete div.test;
	} catch( e ) {
		support.deleteExpando = false;
	}

	// Check if we can trust getAttribute("value")
	input = document.createElement("input");
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";

	// #11217 - WebKit loses check when the name is after the checked attribute
	input.setAttribute( "checked", "t" );
	input.setAttribute( "name", "t" );

	fragment = document.createDocumentFragment();
	fragment.appendChild( input );

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	support.appendChecked = input.checked;

	// WebKit doesn't clone checked state correctly in fragments
	support.checkClone = fragment.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Opera does not clone events (and typeof div.attachEvent === undefined).
	// IE9-10 clones events bound via attachEvent, but they don't trigger with .click()
	if ( div.attachEvent ) {
		div.attachEvent( "onclick", function() {
			support.noCloneEvent = false;
		});

		div.cloneNode( true ).click();
	}

	// Support: IE<9 (lack submit/change bubble), Firefox 17+ (lack focusin event)
	// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP), test/csp.php
	for ( i in { submit: true, change: true, focusin: true }) {
		div.setAttribute( eventName = "on" + i, "t" );

		support[ i + "Bubbles" ] = eventName in window || div.attributes[ eventName ].expando === false;
	}

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	// Run tests that need a body at doc ready
	jQuery(function() {
		var container, marginDiv, tds,
			divReset = "padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;",
			body = document.getElementsByTagName("body")[0];

		if ( !body ) {
			// Return for frameset docs that don't have a body
			return;
		}

		container = document.createElement("div");
		container.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px";

		body.appendChild( container ).appendChild( div );

		// Support: IE8
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
		tds = div.getElementsByTagName("td");
		tds[ 0 ].style.cssText = "padding:0;margin:0;border:0;display:none";
		isSupported = ( tds[ 0 ].offsetHeight === 0 );

		tds[ 0 ].style.display = "";
		tds[ 1 ].style.display = "none";

		// Support: IE8
		// Check if empty table cells still have offsetWidth/Height
		support.reliableHiddenOffsets = isSupported && ( tds[ 0 ].offsetHeight === 0 );

		// Check box-sizing and margin behavior
		div.innerHTML = "";
		div.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;";
		support.boxSizing = ( div.offsetWidth === 4 );
		support.doesNotIncludeMarginInBodyOffset = ( body.offsetTop !== 1 );

		// Use window.getComputedStyle because jsdom on node.js will break without it.
		if ( window.getComputedStyle ) {
			support.pixelPosition = ( window.getComputedStyle( div, null ) || {} ).top !== "1%";
			support.boxSizingReliable = ( window.getComputedStyle( div, null ) || { width: "4px" } ).width === "4px";

			// Check if div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container. (#3333)
			// Fails in WebKit before Feb 2011 nightlies
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			marginDiv = div.appendChild( document.createElement("div") );
			marginDiv.style.cssText = div.style.cssText = divReset;
			marginDiv.style.marginRight = marginDiv.style.width = "0";
			div.style.width = "1px";

			support.reliableMarginRight =
				!parseFloat( ( window.getComputedStyle( marginDiv, null ) || {} ).marginRight );
		}

		if ( typeof div.style.zoom !== "undefined" ) {
			// Support: IE<8
			// Check if natively block-level elements act like inline-block
			// elements when setting their display to 'inline' and giving
			// them layout
			div.innerHTML = "";
			div.style.cssText = divReset + "width:1px;padding:1px;display:inline;zoom:1";
			support.inlineBlockNeedsLayout = ( div.offsetWidth === 3 );

			// Support: IE6
			// Check if elements with layout shrink-wrap their children
			div.style.display = "block";
			div.innerHTML = "<div></div>";
			div.firstChild.style.width = "5px";
			support.shrinkWrapBlocks = ( div.offsetWidth !== 3 );

			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			body.style.zoom = 1;
		}

		body.removeChild( container );

		// Null elements to avoid leaks in IE
		container = div = tds = marginDiv = null;
	});

	// Null elements to avoid leaks in IE
	all = select = fragment = opt = a = input = null;

	return support;
})();

var rbrace = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
	rmultiDash = /([A-Z])/g;
	
function internalData( elem, name, data, pvt /* Internal Use Only */ ){
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var thisCache, ret,
		internalKey = jQuery.expando,
		getByName = typeof name === "string",

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( (!id || !cache[id] || (!pvt && !cache[id].data)) && getByName && data === undefined ) {
		return;
	}

	if ( !id ) {
		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			elem[ internalKey ] = id = core_deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {
		cache[ id ] = {};

		// Avoids exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		if ( !isNode ) {
			cache[ id ].toJSON = jQuery.noop;
		}
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( getByName ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt /* For internal use only */ ){
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var thisCache, i, l,

		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split(" ");
					}
				}
			} else {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			for ( i = 0, l = name.length; i < l; i++ ) {
				delete thisCache[ name[i] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( !( pvt ? isEmptyDataObject : jQuery.isEmptyObject )( thisCache ) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	} else if ( jQuery.support.deleteExpando || cache != cache.window ) {
		delete cache[ id ];

	// When all else fails, null
	} else {
		cache[ id ] = null;
	}
}

jQuery.extend({
	cache: {},

	// Unique for each copy of jQuery on the page
	// Non-digits removed to match rinlinejQuery
	expando: "jQuery" + ( core_version + Math.random() ).replace( /\D/g, "" ),

	// The following elements throw uncatchable exceptions if you
	// attempt to add expando properties to them.
	noData: {
		"embed": true,
		// Ban all objects except for Flash (which handle expandos)
		"object": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
		"applet": true
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[jQuery.expando] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data, false );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name, false );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},
	
	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	},

	// A method for determining if a DOM node can handle the data expando
	acceptData: function( elem ) {
		var noData = elem.nodeName && jQuery.noData[ elem.nodeName.toLowerCase() ];

		// nodes accept data unless otherwise specified; rejection can be conditional
		return !noData || noData !== true && elem.getAttribute("classid") === noData;
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var attrs, name,
			elem = this[0],
			i = 0,
			data = null;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					attrs = elem.attributes;
					for ( ; i < attrs.length; i++ ) {
						name = attrs[i].name;

						if ( !name.indexOf( "data-" ) ) {
							name = jQuery.camelCase( name.substring(5) );

							dataAttr( elem, name, data[ name ] );
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				jQuery.data( this, key );
			});
		}

		return jQuery.access( this, function( value ) {

			if ( value === undefined ) {
				// Try to fetch any internally stored data first
				return elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : null;
			}

			this.each(function() {
				jQuery.data( this, key, value );
			});
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each(function() {
			jQuery.removeData( this, key );
		});
	}
});

function dataAttr( elem, key, data ) {
	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
				data === "false" ? false :
				data === "null" ? null :
				// Only convert to a number if it doesn't change the string
				+data + "" === data ? +data :
				rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[name] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}
jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray(data) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		hooks.cur = fn;
		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object, or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	// Based off of the plugin by Clint Helfers, with permission.
	// http://blindsignals.com/index.php/2009/07/jquery-delay/
	delay: function( time, type ) {
		time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
		type = type || "fx";

		return this.queue( type, function( next, hooks ) {
			var timeout = setTimeout( next, time );
			hooks.stop = function() {
				clearTimeout( timeout );
			};
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var nodeHook, boolHook,
	rclass = /[\t\r\n]/g,
	rreturn = /\r/g,
	rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i,
	rboolean = /^(?:checked|selected|autofocus|autoplay|async|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped)$/i,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = jQuery.support.getSetAttribute,
	getSetInput = jQuery.support.input;

jQuery.fn.extend({
	attr: function( name, value ) {
		return jQuery.access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	},

	prop: function( name, value ) {
		return jQuery.access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each(function() {
			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch( e ) {}
		});
	},

	addClass: function( value ) {
		var classes, elem, cur, clazz, j,
			i = 0,
			len = this.length,
			proceed = typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( core_rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}
					elem.className = jQuery.trim( cur );

				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j,
			i = 0,
			len = this.length,
			proceed = arguments.length === 0 || typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( core_rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}
					elem.className = value ? jQuery.trim( cur ) : "";
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value,
			isBool = typeof stateVal === "boolean";

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					state = stateVal,
					classNames = value.match( core_rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// check each className given, space separated list
					state = isBool ? state : !self.hasClass( className );
					self[ state ? "addClass" : "removeClass" ]( className );
				}

			// Toggle whole class name
			} else if ( type === "undefined" || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					jQuery._data( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : jQuery._data( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	},

	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// handle most common string cases
					ret.replace(rreturn, "") :
					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val,
				self = jQuery(this);

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, self.val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map(val, function ( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				// attributes.value is undefined in Blackberry 4.7 but
				// uses .value. See #6932
				var val = elem.attributes.value;
				return !val || val.specified ? elem.value : elem.text;
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( jQuery.support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var values = jQuery.makeArray( value );

				jQuery(elem).find("option").each(function() {
					this.selected = jQuery.inArray( jQuery(this).val(), values ) >= 0;
				});

				if ( !values.length ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	},

	attr: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( notxml ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] || ( rboolean.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && notxml && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && notxml && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {

			// In IE9+, Flash objects don't have .getAttribute (#12945)
			// Support: IE9+
			if ( typeof elem.getAttribute !== "undefined" ) {
				ret =  elem.getAttribute( name );
			}

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( core_rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( rboolean.test( name ) ) {
					// Set corresponding property to false for boolean attributes
					// Also clear defaultChecked/defaultSelected (if appropriate) for IE<8
					if ( !getSetAttribute && ruseDefault.test( name ) ) {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					} else {
						elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !jQuery.support.radioValue && value === "radio" && jQuery.nodeName(elem, "input") ) {
					// Setting the type on a radio button after the value resets the value in IE6-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	propFix: {
		tabindex: "tabIndex",
		readonly: "readOnly",
		"for": "htmlFor",
		"class": "className",
		maxlength: "maxLength",
		cellspacing: "cellSpacing",
		cellpadding: "cellPadding",
		rowspan: "rowSpan",
		colspan: "colSpan",
		usemap: "useMap",
		frameborder: "frameBorder",
		contenteditable: "contentEditable"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				return ( elem[ name ] = value );
			}

		} else {
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
				return ret;

			} else {
				return elem[ name ];
			}
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				// elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				var attributeNode = elem.getAttributeNode("tabindex");

				return attributeNode && attributeNode.specified ?
					parseInt( attributeNode.value, 10 ) :
					rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?
						0 :
						undefined;
			}
		}
	}
});

// Hook for boolean attributes
boolHook = {
	get: function( elem, name ) {
		var
			// Use .prop to determine if this attribute is understood as boolean
			prop = jQuery.prop( elem, name ),

			// Fetch it accordingly
			attr = typeof prop === "boolean" && elem.getAttribute( name ),
			detail = typeof prop === "boolean" ?

				getSetInput && getSetAttribute ?
					attr != null :
					// oldIE fabricates an empty string for missing boolean attributes
					// and conflates checked/selected into attroperties
					ruseDefault.test( name ) ?
						elem[ jQuery.camelCase( "default-" + name ) ] :
						!!attr :

				// fetch an attribute node for properties not recognized as boolean
				elem.getAttributeNode( name );

		return detail && detail.value !== false ?
			name.toLowerCase() :
			undefined;
	},
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		// Use defaultChecked and defaultSelected for oldIE
		} else {
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}

		return name;
	}
};

// fix oldIE value attroperty
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			return jQuery.nodeName( elem, "input" ) ?

				// Ignore the value *property* by using defaultValue
				elem.defaultValue :

				ret && ret.specified ? ret.value : undefined;
		},
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {
				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {
				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			return ret && ( name === "id" || name === "name" || name === "coords" ? ret.value !== "" : ret.specified ) ?
				ret.value :
				undefined;
		},
		set: function( elem, value, name ) {
			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					(ret = elem.ownerDocument.createAttribute( name ))
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			return name === "value" || value === elem.getAttribute( name ) ?
				value :
				undefined;
		}
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		get: nodeHook.get,
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each([ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = jQuery.extend( jQuery.attrHooks[ name ], {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		});
	});
}


// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !jQuery.support.hrefNormalized ) {
	jQuery.each([ "href", "src", "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = jQuery.extend( jQuery.attrHooks[ name ], {
			get: function( elem ) {
				var ret = elem.getAttribute( name, 2 );
				return ret == null ? undefined : ret;
			}
		});
	});

	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each([ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	});
}

if ( !jQuery.support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {
			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case senstitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}

// Safari mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
if ( !jQuery.support.optSelected ) {
	jQuery.propHooks.selected = jQuery.extend( jQuery.propHooks.selected, {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		}
	});
}

// IE6/7 call enctype encoding
if ( !jQuery.support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}

// Radios and checkboxes getter/setter
if ( !jQuery.support.checkOn ) {
	jQuery.each([ "radio", "checkbox" ], function() {
		jQuery.valHooks[ this ] = {
			get: function( elem ) {
				// Handle the case where in Webkit "" is returned instead of "on" if a value isn't specified
				return elem.getAttribute("value") === null ? "on" : elem.value;
			}
		};
	});
}
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = jQuery.extend( jQuery.valHooks[ this ], {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	});
});
var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			// Don't attach events to noData or text/comment nodes (but allow plain objects)
			elemData = elem.nodeType !== 3 && elem.nodeType !== 8 && jQuery._data( elem );

		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && (!e || jQuery.event.triggered !== e.type) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};
			// Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		// jQuery(...).bind("mouseover mouseout", fn);
		types = ( types || "" ).match( core_rnotwhite ) || [""];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( core_rnotwhite ) || [""];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special,
			eventPath = [ elem || document ],
			type = event.type || event,
			namespaces = event.namespace ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		event.isTrigger = true;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] && jQuery._data( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && jQuery.acceptData( cur ) && handle.apply && handle.apply( cur, data ) === false ) {
				event.preventDefault();
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( elem.ownerDocument, data ) === false) &&
				!(type === "click" && jQuery.nodeName( elem, "a" )) && jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {
						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = core_slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or
				// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			for ( ; cur != this; cur = cur.parentNode || this ) {

				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.disabled !== true || event.type !== "click" ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop,
			originalEvent = event,
			fixHook = jQuery.event.fixHooks[ event.type ] || {},
			copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Chrome 23+, Safari?
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var eventDoc, doc, body,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			}
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== document.activeElement && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {
						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === document.activeElement && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Even when returnValue equals to undefined Firefox will still show alert
				if ( event.result !== undefined ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{ type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle, false );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event, to properly expose it to GC
			if ( typeof elem[ name ] === "undefined" ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = ( src.defaultPrevented || src.returnValue === false ||
			src.getPreventDefault && src.getPreventDefault() ) ? returnTrue : returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;
		if ( !e ) {
			return;
		}
		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		this.isImmediatePropagationStopped = returnTrue;
		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// IE submit delegation
if ( !jQuery.support.submitBubbles ) {

	jQuery.event.special.submit = {
		setup: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {
				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ? elem.form : undefined;
				if ( form && !jQuery._data( form, "submitBubbles" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submit_bubble = true;
					});
					jQuery._data( form, "submitBubbles", true );
				}
			});
			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {
			// If form was submitted by the user, bubble the event up the tree
			if ( event._submit_bubble ) {
				delete event._submit_bubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event, true );
				}
			}
		},

		teardown: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !jQuery.support.changeBubbles ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {
				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._just_changed = true;
						}
					});
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._just_changed && !event.isTrigger ) {
							this._just_changed = false;
						}
						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event, true );
					});
				}
				return false;
			}
			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "changeBubbles" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event, true );
						}
					});
					jQuery._data( elem, "changeBubbles", true );
				}
			});
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox") ) {
				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Create "bubbling" focus and blur events
if ( !jQuery.support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler while someone wants focusin/focusout
		var attaches = 0,
			handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				if ( attaches++ === 0 ) {
					document.addEventListener( orig, handler, true );
				}
			},
			teardown: function() {
				if ( --attaches === 0 ) {
					document.removeEventListener( orig, handler, true );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var origFn, type;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	},

	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
});

jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};

	if ( rkeyEvent.test( name ) ) {
		jQuery.event.fixHooks[ name ] = jQuery.event.keyHooks;
	}

	if ( rmouseEvent.test( name ) ) {
		jQuery.event.fixHooks[ name ] = jQuery.event.mouseHooks;
	}
});
/*!
 * Sizzle CSS Selector Engine
 * Copyright 2012 jQuery Foundation and other contributors
 * Released under the MIT license
 * http://sizzlejs.com/
 */
(function( window, undefined ) {

var i,
	cachedruns,
	Expr,
	getText,
	isXML,
	compile,
	hasDuplicate,
	outermostContext,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsXML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,
	sortOrder,

	// Instance-specific data
	expando = "sizzle" + -(new Date()),
	preferredDoc = window.document,
	support = {},
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),

	// General-purpose constants
	strundefined = typeof undefined,
	MAX_NEGATIVE = 1 << 31,

	// Array methods
	arr = [],
	pop = arr.pop,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf if we can't use a native one
	indexOf = arr.indexOf || function( elem ) {
		var i = 0,
			len = this.length;
		for ( ; i < len; i++ ) {
			if ( this[i] === elem ) {
				return i;
			}
		}
		return -1;
	},


	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Acceptable operators http://www.w3.org/TR/selectors/#attribute-selectors
	operators = "([*^$|!~]?=)",
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")" + whitespace +
		"*(?:" + operators + whitespace + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + identifier + ")|)|)" + whitespace + "*\\]",

	// Prefer arguments quoted,
	//   then not containing pseudos/brackets,
	//   then attribute selectors/non-parenthetical expressions,
	//   then anything else
	// These preferences are here to reduce the number of selectors
	//   needing tokenize in the PSEUDO preFilter
	pseudos = ":(" + characterEncoding + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + attributes.replace( 3, 8 ) + ")*)|.*)\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([\\x20\\t\\r\\n\\f>+~])" + whitespace + "*" ),
	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"NAME": new RegExp( "^\\[name=['\"]?(" + characterEncoding + ")['\"]?\\]" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rsibling = /[\x20\t\r\n\f]*[+~]/,

	rnative = /\{\s*\[native code\]\s*\}/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rescape = /'|\\/g,
	rattributeQuotes = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = /\\([\da-fA-F]{1,6}[\x20\t\r\n\f]?|.)/g,
	funescape = function( _, escaped ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		return high !== high ?
			escaped :
			// BMP codepoint
			high < 0 ?
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	};

// Use a stripped-down slice if we can't use a native one
try {
	slice.call( docElem.childNodes, 0 )[0].nodeType;
} catch ( e ) {
	slice = function( i ) {
		var elem,
			results = [];
		for ( ; (elem = this[i]); i++ ) {
			results.push( elem );
		}
		return results;
	};
}

/**
 * For feature detection
 * @param {Function} fn The function to test for native support
 */
function isNative( fn ) {
	return rnative.test( fn + "" );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var cache,
		keys = [];

	return (cache = function( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key += " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key ] = value);
	});
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return fn( div );
	} catch (e) {
		return false;
	} finally {
		// release memory in IE
		div = null;
	}
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];

	if ( !selector || typeof selector !== "string" ) {
		return results;
	}

	if ( (nodeType = context.nodeType) !== 1 && nodeType !== 9 ) {
		return [];
	}

	if ( !documentIsXML && !seed ) {

		// Shortcuts
		if ( (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, slice.call(context.getElementsByTagName( selector ), 0) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getByClassName && context.getElementsByClassName ) {
				push.apply( results, slice.call(context.getElementsByClassName( m ), 0) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && !rbuggyQSA.test(selector) ) {
			old = true;
			nid = expando;
			newContext = context;
			newSelector = nodeType === 9 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && context.parentNode || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results, slice.call( newContext.querySelectorAll(
						newSelector
					), 0 ) );
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Detect xml
 * @param {Element|Object} elem An element or a document
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var doc = node ? node.ownerDocument || node : preferredDoc;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;

	// Support tests
	documentIsXML = isXML( doc );

	// Check if getElementsByTagName("*") returns only elements
	support.tagNameNoComments = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Check if attributes should be retrieved by attribute nodes
	support.attributes = assert(function( div ) {
		div.innerHTML = "<select></select>";
		var type = typeof div.lastChild.getAttribute("multiple");
		// IE8 returns a string for some attributes even when not present
		return type !== "boolean" && type !== "string";
	});

	// Check if getElementsByClassName can be trusted
	support.getByClassName = assert(function( div ) {
		// Opera can't find a second classname (in 9.6)
		div.innerHTML = "<div class='hidden e'></div><div class='hidden'></div>";
		if ( !div.getElementsByClassName || !div.getElementsByClassName("e").length ) {
			return false;
		}

		// Safari 3.2 caches class attributes and doesn't catch changes
		div.lastChild.className = "e";
		return div.getElementsByClassName("e").length === 2;
	});

	// Check if getElementById returns elements by name
	// Check if getElementsByName privileges form controls or returns elements by ID
	support.getByName = assert(function( div ) {
		// Inject content
		div.id = expando + 0;
		div.innerHTML = "<a name='" + expando + "'></a><div name='" + expando + "'></div>";
		docElem.insertBefore( div, docElem.firstChild );

		// Test
		var pass = doc.getElementsByName &&
			// buggy browsers will return fewer than the correct 2
			doc.getElementsByName( expando ).length === 2 +
			// buggy browsers will return more than the correct 0
			doc.getElementsByName( expando + 0 ).length;
		support.getIdNotName = !doc.getElementById( expando );

		// Cleanup
		docElem.removeChild( div );

		return pass;
	});

	// IE6/7 return modified attributes
	Expr.attrHandle = assert(function( div ) {
		div.innerHTML = "<a href='#'></a>";
		return div.firstChild && typeof div.firstChild.getAttribute !== strundefined &&
			div.firstChild.getAttribute("href") === "#";
	}) ?
		{} :
		{
			"href": function( elem ) {
				return elem.getAttribute( "href", 2 );
			},
			"type": function( elem ) {
				return elem.getAttribute("type");
			}
		};

	// ID find and filter
	if ( support.getIdNotName ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== strundefined && !documentIsXML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [m] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== strundefined && !documentIsXML ) {
				var m = context.getElementById( id );

				return m ?
					m.id === id || typeof m.getAttributeNode !== strundefined && m.getAttributeNode("id").value === id ?
						[m] :
						undefined :
					[];
			}
		};
		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.tagNameNoComments ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== strundefined ) {
				return context.getElementsByTagName( tag );
			}
		} :
		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				for ( ; (elem = results[i]); i++ ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Name
	Expr.find["NAME"] = support.getByName && function( tag, context ) {
		if ( typeof context.getElementsByName !== strundefined ) {
			return context.getElementsByName( name );
		}
	};

	// Class
	Expr.find["CLASS"] = support.getByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== strundefined && !documentIsXML ) {
			return context.getElementsByClassName( className );
		}
	};

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21),
	// no need to also add to buggyMatches since matches checks buggyQSA
	// A support test would require too much code (would include document ready)
	rbuggyQSA = [ ":focus" ];

	if ( (support.qsa = isNative(doc.querySelectorAll)) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explictly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			div.innerHTML = "<select><option selected=''></option></select>";

			// IE8 - Some boolean attributes are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:checked|disabled|ismap|multiple|readonly|selected|value)" );
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}
		});

		assert(function( div ) {

			// Opera 10-12/IE8 - ^= $= *= and empty values
			// Should not select anything
			div.innerHTML = "<input type='hidden' i=''/>";
			if ( div.querySelectorAll("[i^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:\"\"|'')" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = isNative( (matches = docElem.matchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.webkitMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = new RegExp( rbuggyMatches.join("|") );

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = isNative(docElem.contains) || docElem.compareDocumentPosition ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	// Document order sorting
	sortOrder = docElem.compareDocumentPosition ?
	function( a, b ) {
		var compare;

		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		if ( (compare = b.compareDocumentPosition && a.compareDocumentPosition && a.compareDocumentPosition( b )) ) {
			if ( compare & 1 || a.parentNode && a.parentNode.nodeType === 11 ) {
				if ( a === doc || contains( preferredDoc, a ) ) {
					return -1;
				}
				if ( b === doc || contains( preferredDoc, b ) ) {
					return 1;
				}
				return 0;
			}
			return compare & 4 ? -1 : 1;
		}

		return a.compareDocumentPosition ? -1 : 1;
	} :
	function( a, b ) {
		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// The nodes are identical, we can exit early
		if ( a === b ) {
			hasDuplicate = true;
			return 0;

		// Fallback to using sourceIndex (in IE) if it's available on both nodes
		} else if ( a.sourceIndex && b.sourceIndex ) {
			return ( ~b.sourceIndex || MAX_NEGATIVE ) - ( contains( preferredDoc, a ) && ~a.sourceIndex || MAX_NEGATIVE );

		// Parentless nodes are either documents or disconnected
		} else if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	// Always assume the presence of duplicates if sort doesn't
	// pass them to our comparison function (as in Google Chrome).
	hasDuplicate = false;
	[0, 0].sort( sortOrder );
	support.detectDuplicates = hasDuplicate;

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	// rbuggyQSA always contains :focus, so no need for an existence check
	if ( support.matchesSelector && !documentIsXML && (!rbuggyMatches || !rbuggyMatches.test(expr)) && !rbuggyQSA.test(expr) ) {
		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch(e) {}
	}

	return Sizzle( expr, document, null, [elem] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	var val;

	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	if ( !documentIsXML ) {
		name = name.toLowerCase();
	}
	if ( (val = Expr.attrHandle[ name ]) ) {
		return val( elem );
	}
	if ( documentIsXML || support.attributes ) {
		return elem.getAttribute( name );
	}
	return ( (val = elem.getAttributeNode( name )) || elem.getAttribute( name ) ) && elem[ name ] === true ?
		name :
		val && val.specified ? val.value : null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

// Document sorting and removing duplicates
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		i = 1,
		j = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		for ( ; (elem = results[i]); i++ ) {
			if ( elem === results[ i - 1 ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	return results;
};

function siblingCheck( a, b ) {
	var cur = a && b && a.nextSibling;

	for ( ; cur; cur = cur.nextSibling ) {
		if ( cur === b ) {
			return -1;
		}
	}

	return a ? 1 : -1;
}

// Returns a function to use in pseudos for input types
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

// Returns a function to use in pseudos for buttons
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

// Returns a function to use in pseudos for positionals
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		for ( ; (node = elem[i]); i++ ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (see #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[5] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[4] ) {
				match[2] = match[4];

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeName ) {
			if ( nodeName === "*" ) {
				return function() { return true; };
			}

			nodeName = nodeName.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
			};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( elem.className || (typeof elem.getAttribute !== strundefined && elem.getAttribute("class")) || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.substr( result.length - check.length ) === check :
					operator === "~=" ? ( " " + result + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.substr( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf.call( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifider
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsXML ?
						elem.getAttribute("xml:lang") || elem.getAttribute("lang") :
						elem.lang) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is only affected by element nodes and content nodes(including text(3), cdata(4)),
			//   not comment, processing instructions, or others
			// Thanks to Diego Perini for the nodeName shortcut
			//   Greater than "@" means alpha characters (specifically not starting with "#" or "?")
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeName > "@" || elem.nodeType === 3 || elem.nodeType === 4 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			// IE6 and 7 will map elem.type to 'text' for new HTML5 types (search, etc)
			// use getAttribute instead to test this case
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === elem.type );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

function tokenize( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( tokens = [] );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push( {
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			} );
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push( {
					value: matched,
					type: type,
					matches: match
				} );
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
}

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && combinator.dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var data, cache, outerCache,
				dirkey = dirruns + " " + doneName;

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (cache = outerCache[ dir ]) && cache[0] === dirkey ) {
							if ( (data = cache[1]) === true || data === cachedruns ) {
								return data === true;
							}
						} else {
							cache = outerCache[ dir ] = [ dirkey ];
							cache[1] = matcher( elem, context, xml ) || cachedruns;
							if ( cache[1] === true ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf.call( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf.call( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			return ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector( tokens.slice( 0, i - 1 ) ).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	// A counter to specify which element is currently being matched
	var matcherCachedRuns = 0,
		bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, expandContext ) {
			var elem, j, matcher,
				setMatched = [],
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				outermost = expandContext != null,
				contextBackup = outermostContext,
				// We must always have either seed elements or context
				elems = seed || byElement && Expr.find["TAG"]( "*", expandContext && context.parentNode || context ),
				// Nested matchers should use non-integer dirruns
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.E);

			if ( outermost ) {
				outermostContext = context !== document && context;
				cachedruns = matcherCachedRuns;
			}

			// Add elements passing elementMatchers directly to results
			for ( ; (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					for ( j = 0; (matcher = elementMatchers[j]); j++ ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
						cachedruns = ++matcherCachedRuns;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			// `i` starts as a string, so matchedCount would equal "00" if there are no elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				for ( j = 0; (matcher = setMatchers[j]); j++ ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, group /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !group ) {
			group = tokenize( selector );
		}
		i = group.length;
		while ( i-- ) {
			cached = matcherFromTokens( group[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );
	}
	return cached;
};

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function select( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		match = tokenize( selector );

	if ( !seed ) {
		// Try to minimize operations if there is only one group
		if ( match.length === 1 ) {

			// Take a shortcut and set the context if the root selector is an ID
			tokens = match[0] = match[0].slice( 0 );
			if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
					context.nodeType === 9 && !documentIsXML &&
					Expr.relative[ tokens[1].type ] ) {

				context = Expr.find["ID"]( token.matches[0].replace( runescape, funescape ), context )[0];
				if ( !context ) {
					return results;
				}

				selector = selector.slice( tokens.shift().value.length );
			}

			// Fetch a seed set for right-to-left matching
			for ( i = matchExpr["needsContext"].test( selector ) ? -1 : tokens.length - 1; i >= 0; i-- ) {
				token = tokens[i];

				// Abort if we hit a combinator
				if ( Expr.relative[ (type = token.type) ] ) {
					break;
				}
				if ( (find = Expr.find[ type ]) ) {
					// Search, expanding context for leading sibling combinators
					if ( (seed = find(
						token.matches[0].replace( runescape, funescape ),
						rsibling.test( tokens[0].type ) && context.parentNode || context
					)) ) {

						// If seed is empty or no tokens remain, we can return early
						tokens.splice( i, 1 );
						selector = seed.length && toSelector( tokens );
						if ( !selector ) {
							push.apply( results, slice.call( seed, 0 ) );
							return results;
						}

						break;
					}
				}
			}
		}
	}

	// Compile and execute a filtering function
	// Provide `match` to avoid retokenization if we modified the selector above
	compile( selector, match )(
		seed,
		context,
		documentIsXML,
		results,
		rsibling.test( selector )
	);
	return results;
}

// Deprecated
Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Easy API for creating new setFilters
function setFilters() {}
Expr.filters = setFilters.prototype = Expr.pseudos;
Expr.setFilters = new setFilters();

// Initialize with the default document
setDocument();

// Override sizzle attribute retrieval
Sizzle.attr = jQuery.attr;
jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;


})( window );
var runtil = /Until$/,
	rparentsprev = /^(?:parents|prev(?:Until|All))/,
	isSimple = /^.[^:#\[\.,]*$/,
	rneedsContext = jQuery.expr.match.needsContext,
	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend({
	find: function( selector ) {
		var i, ret, self;

		if ( typeof selector !== "string" ) {
			self = this;
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < self.length; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		ret = [];
		for ( i = 0; i < this.length; i++ ) {
			jQuery.find( selector, this[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( jQuery.unique( ret ) );
		ret.selector = ( this.selector ? this.selector + " " : "" ) + selector;
		return ret;
	},

	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter(function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	not: function( selector ) {
		return this.pushStack( winnow(this, selector, false) );
	},

	filter: function( selector ) {
		return this.pushStack( winnow(this, selector, true) );
	},

	is: function( selector ) {
		return !!selector && (
			typeof selector === "string" ?
				// If this is a positional/relative selector, check membership in the returned set
				// so $("p:first").is("p:last") won't return true for a doc with two "p".
				rneedsContext.test( selector ) ?
					jQuery( selector, this.context ).index( this[0] ) >= 0 :
					jQuery.filter( selector, this ).length > 0 :
				this.filter( selector ).length > 0 );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			ret = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			cur = this[i];

			while ( cur && cur.ownerDocument && cur !== context && cur.nodeType !== 11 ) {
				if ( pos ? pos.index(cur) > -1 : jQuery.find.matchesSelector(cur, selectors) ) {
					ret.push( cur );
					break;
				}
				cur = cur.parentNode;
			}
		}

		return this.pushStack( ret.length > 1 ? jQuery.unique( ret ) : ret );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[0] && this[0].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[0], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(
			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[0] : elem, this );
	},

	add: function( selector, context ) {
		var set = typeof selector === "string" ?
				jQuery( selector, context ) :
				jQuery.makeArray( selector && selector.nodeType ? [ selector ] : selector ),
			all = jQuery.merge( this.get(), set );

		return this.pushStack( jQuery.unique(all) );
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

jQuery.fn.andSelf = jQuery.fn.addBack;

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( !runtil.test( name ) ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		ret = this.length > 1 && !guaranteedUnique[ name ] ? jQuery.unique( ret ) : ret;

		if ( this.length > 1 && rparentsprev.test( name ) ) {
			ret = ret.reverse();
		}

		return this.pushStack( ret );
	};
});

jQuery.extend({
	filter: function( expr, elems, not ) {
		if ( not ) {
			expr = ":not(" + expr + ")";
		}

		return elems.length === 1 ?
			jQuery.find.matchesSelector(elems[0], expr) ? [ elems[0] ] : [] :
			jQuery.find.matches(expr, elems);
	},

	dir: function( elem, dir, until ) {
		var matched = [],
			cur = elem[ dir ];

		while ( cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery( cur ).is( until )) ) {
			if ( cur.nodeType === 1 ) {
				matched.push( cur );
			}
			cur = cur[dir];
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var r = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				r.push( n );
			}
		}

		return r;
	}
});

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, keep ) {

	// Can't pass null or undefined to indexOf in Firefox 4
	// Set to 0 to skip string check
	qualifier = qualifier || 0;

	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep(elements, function( elem, i ) {
			var retVal = !!qualifier.call( elem, i, elem );
			return retVal === keep;
		});

	} else if ( qualifier.nodeType ) {
		return jQuery.grep(elements, function( elem ) {
			return ( elem === qualifier ) === keep;
		});

	} else if ( typeof qualifier === "string" ) {
		var filtered = jQuery.grep(elements, function( elem ) {
			return elem.nodeType === 1;
		});

		if ( isSimple.test( qualifier ) ) {
			return jQuery.filter(qualifier, filtered, !keep);
		} else {
			qualifier = jQuery.filter( qualifier, filtered );
		}
	}

	return jQuery.grep(elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) >= 0 ) === keep;
	});
}
function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" +
		"header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
	rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
	rleadingWhitespace = /^\s+/,
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rtbody = /<tbody/i,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	manipulation_rcheckableType = /^(?:checkbox|radio)$/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {
		option: [ 1, "<select multiple='multiple'>", "</select>" ],
		legend: [ 1, "<fieldset>", "</fieldset>" ],
		area: [ 1, "<map>", "</map>" ],
		param: [ 1, "<object>", "</object>" ],
		thead: [ 1, "<table>", "</table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
		// unless wrapped in a div with non-breaking characters in front of it.
		_default: jQuery.support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>"  ]
	},
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement("div") );

wrapMap.optgroup = wrapMap.option;
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

jQuery.fn.extend({
	text: function( value ) {
		return jQuery.access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append( ( this[0] && this[0].ownerDocument || document ).createTextNode( value ) );
		}, null, value, arguments.length );
	},

	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapAll( html.call(this, i) );
			});
		}

		if ( this[0] ) {
			// The elements to wrap the target around
			var wrap = jQuery( html, this[0].ownerDocument ).eq(0).clone(true);

			if ( this[0].parentNode ) {
				wrap.insertBefore( this[0] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function(i) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	},

	append: function() {
		return this.domManip(arguments, true, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				this.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip(arguments, true, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				this.insertBefore( elem, this.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, false, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, false, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	// keepData is for internal use only--do not document
	remove: function( selector, keepData ) {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			if ( !selector || jQuery.filter( selector, [ elem ] ).length > 0 ) {
				if ( !keepData && elem.nodeType === 1 ) {
					jQuery.cleanData( getAll( elem ) );
				}

				if ( elem.parentNode ) {
					if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
						setGlobalEval( getAll( elem, "script" ) );
					}
					elem.parentNode.removeChild( elem );
				}
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function () {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return jQuery.access( this, function( value ) {
			var elem = this[0] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( jQuery.support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( jQuery.support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ ( rtagName.exec( value ) || ["", ""] )[1].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for (; i < l; i++ ) {
						// Remove element nodes and prevent memory leaks
						elem = this[i] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch(e) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function( value ) {
		var isFunc = jQuery.isFunction( value );

		// Make sure that the elements are removed from the DOM before they are inserted
		// this can help fix replacing a parent with child elements
		if ( !isFunc && typeof value !== "string" ) {
			value = jQuery( value ).not( this ).detach();
		}

		return this.domManip( [ value ], true, function( elem ) {
			var next = this.nextSibling,
				parent = this.parentNode;

			if ( parent && this.nodeType === 1 || this.nodeType === 11 ) {

				jQuery( this ).remove();

				if ( next ) {
					next.parentNode.insertBefore( elem, next );
				} else {
					parent.appendChild( elem );
				}
			}
		});
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, table, callback ) {

		// Flatten any nested arrays
		args = core_concat.apply( [], args );

		var fragment, first, scripts, hasScripts, node, doc,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[0],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction || !( l <= 1 || typeof value !== "string" || jQuery.support.checkClone || !rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[0] = value.call( this, index, table ? self.html() : undefined );
				}
				self.domManip( args, table, callback );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				table = table && jQuery.nodeName( first, "tr" );
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call(
						table && jQuery.nodeName( this[i], "table" ) ?
							findOrAppend( this[i], "tbody" ) :
							this[i],
						node,
						i
					);
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!jQuery._data( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Hope ajax is available...
								jQuery.ajax({
									url: node.src,
									type: "GET",
									dataType: "script",
									async: false,
									global: false,
									"throws": true
								});
							} else {
								jQuery.globalEval( ( node.text || node.textContent || node.innerHTML || "" ).replace( rcleanScript, "" ) );
							}
						}
					}
				}

				// Fix #11809: Avoid leaking memory
				fragment = first = null;
			}
		}

		return this;
	}
});

function findOrAppend( elem, tag ) {
	return elem.getElementsByTagName( tag )[0] || elem.appendChild( elem.ownerDocument.createElement( tag ) );
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	var attr = elem.getAttributeNode("type");
	elem.type = ( attr && attr.specified ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[1];
	} else {
		elem.removeAttribute("type");
	}
	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; (elem = elems[i]) != null; i++ ) {
		jQuery._data( elem, "globalEval", !refElements || jQuery._data( refElements[i], "globalEval" ) );
	}
}

function cloneCopyEvent( src, dest ) {

	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, data, e;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !jQuery.support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( jQuery.support.html5Clone && ( src.innerHTML && !jQuery.trim(dest.innerHTML) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && manipulation_rcheckableType.test( src.type ) ) {
		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone(true);
			jQuery( insert[i] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			core_push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});

function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== "undefined" ? context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== "undefined" ? context.querySelectorAll( tag || "*" ) :
			undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context; (elem = elems[i]) != null; i++ ) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}

// Used in buildFragment, fixes the defaultChecked property
function fixDefaultChecked( elem ) {
	if ( manipulation_rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, srcElements, node, i, clone,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( jQuery.support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {
			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( (!jQuery.support.noCloneEvent || !jQuery.support.noCloneChecked) &&
				(elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; (node = srcElements[i]) != null; ++i ) {
				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[i] ) {
					fixCloneNodeIssues( node, destElements[i] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; (node = srcElements[i]) != null; i++ ) {
					cloneCopyEvent( node, destElements[i] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var contains, elem, tag, tmp, wrap, tbody, j,
			l = elems.length,

			// Ensure a safe fragment
			safe = createSafeFragment( context ),

			nodes = [],
			i = 0;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || safe.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = ( rtagName.exec( elem ) || ["", ""] )[1].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;

					tmp.innerHTML = wrap[1] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[2];

					// Descend through wrappers to the right content
					j = wrap[0];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Manually add leading whitespace removed by IE
					if ( !jQuery.support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
						nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[0] ) );
					}

					// Remove IE's autoinserted <tbody> from table fragments
					if ( !jQuery.support.tbody ) {

						// String was a <table>, *may* have spurious <tbody>
						elem = tag === "table" && !rtbody.test( elem ) ?
							tmp.firstChild :

							// String was a bare <thead> or <tfoot>
							wrap[1] === "<table>" && !rtbody.test( elem ) ?
								tmp :
								0;

						j = elem && elem.childNodes.length;
						while ( j-- ) {
							if ( jQuery.nodeName( (tbody = elem.childNodes[j]), "tbody" ) && !tbody.childNodes.length ) {
								elem.removeChild( tbody );
							}
						}
					}

					jQuery.merge( nodes, tmp.childNodes );

					// Fix #12392 for WebKit and IE > 9
					tmp.textContent = "";

					// Fix #12392 for oldIE
					while ( tmp.firstChild ) {
						tmp.removeChild( tmp.firstChild );
					}

					// Remember the top-level container for proper cleanup
					tmp = safe.lastChild;
				}
			}
		}

		// Fix #11356: Clear elements from fragment
		if ( tmp ) {
			safe.removeChild( tmp );
		}

		// Reset defaultChecked for any radios and checkboxes
		// about to be appended to the DOM in IE 6/7 (#8060)
		if ( !jQuery.support.appendChecked ) {
			jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
		}

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( safe.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		tmp = null;

		return safe;
	},

	cleanData: function( elems, /* internal */ acceptData ) {
		var data, id, elem, type,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			deleteExpando = jQuery.support.deleteExpando,
			special = jQuery.event.special;

		for ( ; (elem = elems[i]) != null; i++ ) {

			if ( acceptData || jQuery.acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// IE does not allow us to delete expando properties from nodes,
						// nor does it have a removeAttribute function on Document nodes;
						// we must handle all of these cases
						if ( deleteExpando ) {
							delete elem[ internalKey ];

						} else if ( typeof elem.removeAttribute !== "undefined" ) {
							elem.removeAttribute( internalKey );

						} else {
							elem[ internalKey ] = null;
						}

						core_deletedIds.push( id );
					}
				}
			}
		}
	}
});
var curCSS, getStyles, iframe,
	ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/,
	rposition = /^(top|right|bottom|left)$/,
	// swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rmargin = /^margin/,
	rnumsplit = new RegExp( "^(" + core_pnum + ")(.*)$", "i" ),
	rnumnonpx = new RegExp( "^(" + core_pnum + ")(?!px)[a-z%]+$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + core_pnum + ")", "i" ),
	elemdisplay = { BODY: "block" },

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: 0,
		fontWeight: 400
	},

	cssExpand = [ "Top", "Right", "Bottom", "Left" ],
	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];

// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt(0).toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function isHidden( elem, el ) {
	// isHidden might be called from jQuery#filter function;
	// in that case, element will be second argument
	elem = el || elem;
	return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
}

function showHide( elements, show ) {
	var elem,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		values[ index ] = jQuery._data( elem, "olddisplay" );
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && elem.style.display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = jQuery._data( elem, "olddisplay", css_defaultDisplay(elem.nodeName) );
			}
		} else if ( !values[ index ] && !isHidden( elem ) ) {
			jQuery._data( elem, "olddisplay", jQuery.css( elem, "display" ) );
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

jQuery.fn.extend({
	css: function( name, value ) {
		return jQuery.access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		var bool = typeof state === "boolean";

		return this.each(function() {
			if ( bool ? state : isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});

jQuery.extend({
	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {
					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Exclude the following css properties to add px
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		// normalize float css property
		"float": jQuery.support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {
		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// convert relative number strings (+= or -=) to relative numbers. #7345
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that NaN and null values aren't set. See: #7116
			if ( value == null || type === "number" && isNaN( value ) ) {
				return;
			}

			// If a number was passed in, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight (for every problematic property) identical functions
			if ( !jQuery.support.clearCloneStyle && value === "" && name.indexOf("background") === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {

				// Wrapped to prevent IE from throwing errors when 'invalid' values are provided
				// Fixes bug #5509
				try {
					style[ name ] = value;
				} catch(e) {}
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	},

	// A method for quickly swapping in/out CSS properties to get correct calculations
	swap: function( elem, options, callback, args ) {
		var ret, name,
			old = {};

		// Remember the old values, and insert the new ones
		for ( name in options ) {
			old[ name ] = elem.style[ name ];
			elem.style[ name ] = options[ name ];
		}

		ret = callback.apply( elem, args || [] );

		// Revert the old values
		for ( name in options ) {
			elem.style[ name ] = old[ name ];
		}

		return ret;
	}
});

// NOTE: we've included the "window" in window.getComputedStyle
// because jsdom on node.js will break without it.
if ( window.getComputedStyle ) {
	getStyles = function( elem ) {
		return window.getComputedStyle( elem, null );
	};

	curCSS = function( elem, name, _computed ) {
		var width, minWidth, maxWidth,
			computed = _computed || getStyles( elem ),

			// getPropertyValue is only needed for .css('filter') in IE9, see #12537
			ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined,
			style = elem.style;

		if ( computed ) {

			if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
				ret = jQuery.style( elem, name );
			}

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value" instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
			// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
			if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		return ret;
	};
} else if ( document.documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, _computed ) {
		var left, rs, rsLeft,
			computed = _computed || getStyles( elem ),
			ret = computed ? computed[ name ] : undefined,
			style = elem.style;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are proportional to the parent element instead
		// and we can't measure the parent instead because it might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		return ret === "" ? "auto" : ret;
	};
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = jQuery.support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox && ( jQuery.support.boxSizingReliable || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

// Try to determine the default display value of an element
function css_defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {
			// Use the already-created iframe if possible
			iframe = ( iframe ||
				jQuery("<iframe frameborder='0' width='0' height='0'/>")
				.css( "cssText", "display:block !important" )
			).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[0].contentWindow || iframe[0].contentDocument ).document;
			doc.write("<!doctype html><html><body>");
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}

// Called ONLY from within css_defaultDisplay
function actualDisplay( name, doc ) {
	var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),
		display = jQuery.css( elem[0], "display" );
	elem.remove();
	return display;
}

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {
				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return elem.offsetWidth === 0 && rdisplayswap.test( jQuery.css( elem, "display" ) ) ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

if ( !jQuery.support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {
			// IE uses filters for opacity
			return ropacity.test( (computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "" ) ?
				( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
				computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist - attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

// These hooks cannot be added until DOM ready because the support test
// for it is not run until after DOM ready
jQuery(function() {
	if ( !jQuery.support.reliableMarginRight ) {
		jQuery.cssHooks.marginRight = {
			get: function( elem, computed ) {
				if ( computed ) {
					// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
					// Work around by temporarily setting element display to inline-block
					return jQuery.swap( elem, { "display": "inline-block" },
						curCSS, [ elem, "marginRight" ] );
				}
			}
		};
	}

	// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
	// getComputedStyle returns percent when specified for top/left/bottom/right
	// rather than make the css module depend on the offset module, we just check for it here
	if ( !jQuery.support.pixelPosition && jQuery.fn.position ) {
		jQuery.each( [ "top", "left" ], function( i, prop ) {
			jQuery.cssHooks[ prop ] = {
				get: function( elem, computed ) {
					if ( computed ) {
						computed = curCSS( elem, prop );
						// if curCSS returns percentage, fallback to offset
						return rnumnonpx.test( computed ) ?
							jQuery( elem ).position()[ prop ] + "px" :
							computed;
					}
				}
			};
		});
	}

});

if ( jQuery.expr && jQuery.expr.filters ) {
	jQuery.expr.filters.hidden = function( elem ) {
		return ( elem.offsetWidth === 0 && elem.offsetHeight === 0 ) || (!jQuery.support.reliableHiddenOffsets && ((elem.style && elem.style.display) || jQuery.css( elem, "display" )) === "none");
	};

	jQuery.expr.filters.visible = function( elem ) {
		return !jQuery.expr.filters.hidden( elem );
	};
}

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});
var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function(){
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function(){
			var type = this.type;
			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !manipulation_rcheckableType.test( type ) );
		})
		.map(function( i, elem ){
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ){
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});

//Serialize an array of form elements or a set of
//key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}
var
	// Document location
	ajaxLocParts,
	ajaxLocation,
	
	ajax_nonce = jQuery.now(),

	ajax_rquery = /\?/,
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, // IE leaves an \r character at EOL
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,

	// Keep a copy of the old load method
	_load = jQuery.fn.load,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat("*");

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
try {
	ajaxLocation = location.href;
} catch( e ) {
	// Use the href attribute of an A element
	// since IE will modify it given document.location
	ajaxLocation = document.createElement( "a" );
	ajaxLocation.href = "";
	ajaxLocation = ajaxLocation.href;
}

// Segment location into parts
ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( core_rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType[0] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = url.slice( off, url.length );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};

// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ){
	jQuery.fn[ type ] = function( fn ){
		return this.on( type, fn );
	};
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": window.String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,
			// URL without anti-cache param
			cacheURL,
			// Response headers
			responseHeadersString,
			responseHeaders,
			// timeout handle
			timeoutTimer,
			// Cross-domain detection vars
			parts,
			// To know if global events are to be dispatched
			fireGlobals,
			// Loop variable
			i,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" ).replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( core_rnotwhite ) || [""];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? 80 : 443 ) ) !=
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? 80 : 443 ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		fireGlobals = s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( ajax_rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + ajax_nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( ajax_rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ajax_nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// If successful, handle type chaining
			if ( status >= 200 && status < 300 || status === 304 ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// If not modified
				if ( status === 304 ) {
					isSuccess = true;
					statusText = "notmodified";

				// If we have data
				} else {
					isSuccess = ajaxConvert( s, response );
					statusText = isSuccess.state;
					success = isSuccess.data;
					error = isSuccess.error;
					isSuccess = !error;
				}
			} else {
				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	}
});

/* Handles responses to an ajax request:
 * - sets all responseXXX fields accordingly
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes,
		responseFields = s.responseFields;

	// Fill responseXXX fields
	for ( type in responseFields ) {
		if ( type in responses ) {
			jqXHR[ responseFields[type] ] = responses[ type ];
		}
	}

	// Remove auto dataType and get content-type in the process
	while( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

// Chain conversions given the request and the original response
function ajaxConvert( s, response ) {

	var conv, conv2, current, tmp,
		converters = {},
		i = 0,
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice(),
		prev = dataTypes[ 0 ];

	// Apply the dataFilter if provided
	if ( s.dataFilter ) {
		response = s.dataFilter( response, s.dataType );
	}

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	// Convert to each sequential dataType, tolerating list modification
	for ( ; (current = dataTypes[++i]); ) {

		// There's only work to do if current dataType is non-auto
		if ( current !== "*" ) {

			// Convert response if prev dataType is non-auto and differs from current
			if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split(" ");
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.splice( i--, 0, current );
								}

								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s["throws"] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}

			// Update prev for next iteration
			prev = current;
		}
	}

	return { state: "success", data: response };
}
// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function(s) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery("head")[0] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement("script");

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
});
var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( ajax_nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( ajax_rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});
var xhrCallbacks, xhrSupported,
	xhrId = 0,
	// #5280: Internet Explorer will keep connections alive if we don't abort on unload
	xhrOnUnloadAbort = window.ActiveXObject && function() {
		// Abort all pending requests
		var key;
		for ( key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	};

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject("Microsoft.XMLHTTP");
	} catch( e ) {}
}

// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject ?
	/* Microsoft failed to properly
	 * implement the XMLHttpRequest in IE7 (can't request local files),
	 * so we use the ActiveXObject when it is available
	 * Additionally XMLHttpRequest can be disabled in IE7/IE8 so
	 * we need a fallback.
	 */
	function() {
		return !this.isLocal && createStandardXHR() || createActiveXHR();
	} :
	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

// Determine support properties
xhrSupported = jQuery.ajaxSettings.xhr();
jQuery.support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = jQuery.support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport(function( s ) {
		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !s.crossDomain || jQuery.support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {

					// Get a new xhr
					var handle, i,
						xhr = s.xhr();

					// Open the socket
					// Passing null username, generates a login popup on Opera (#2865)
					if ( s.username ) {
						xhr.open( s.type, s.url, s.async, s.username, s.password );
					} else {
						xhr.open( s.type, s.url, s.async );
					}

					// Apply custom fields if provided
					if ( s.xhrFields ) {
						for ( i in s.xhrFields ) {
							xhr[ i ] = s.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( s.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( s.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !s.crossDomain && !headers["X-Requested-With"] ) {
						headers["X-Requested-With"] = "XMLHttpRequest";
					}

					// Need an extra try/catch for cross domain requests in Firefox 3
					try {
						for ( i in headers ) {
							xhr.setRequestHeader( i, headers[ i ] );
						}
					} catch( err ) {}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( s.hasContent && s.data ) || null );

					// Listener
					callback = function( _, isAbort ) {

						var status,
							statusText,
							responseHeaders,
							responses,
							xml;

						// Firefox throws exceptions when accessing properties
						// of an xhr when a network error occurred
						// http://helpful.knobs-dials.com/index.php/Component_returned_failure_code:_0x80040111_(NS_ERROR_NOT_AVAILABLE)
						try {

							// Was never called and is aborted or complete
							if ( callback && ( isAbort || xhr.readyState === 4 ) ) {

								// Only called once
								callback = undefined;

								// Do not keep as active anymore
								if ( handle ) {
									xhr.onreadystatechange = jQuery.noop;
									if ( xhrOnUnloadAbort ) {
										delete xhrCallbacks[ handle ];
									}
								}

								// If it's an abort
								if ( isAbort ) {
									// Abort it manually if needed
									if ( xhr.readyState !== 4 ) {
										xhr.abort();
									}
								} else {
									responses = {};
									status = xhr.status;
									xml = xhr.responseXML;
									responseHeaders = xhr.getAllResponseHeaders();

									// Construct response list
									if ( xml && xml.documentElement /* #4958 */ ) {
										responses.xml = xml;
									}

									// When requesting binary data, IE6-9 will throw an exception
									// on any attempt to access responseText (#11426)
									if ( typeof xhr.responseText === "string" ) {
										responses.text = xhr.responseText;
									}

									// Firefox throws an exception when accessing
									// statusText for faulty cross-domain requests
									try {
										statusText = xhr.statusText;
									} catch( e ) {
										// We normalize with Webkit giving an empty statusText
										statusText = "";
									}

									// Filter status for non standard behaviors

									// If the request is local and we have data: assume a success
									// (success with no data won't get notified, that's the best we
									// can do given current implementations)
									if ( !status && s.isLocal && !s.crossDomain ) {
										status = responses.text ? 200 : 404;
									// IE - #1450: sometimes returns 1223 when it should be 204
									} else if ( status === 1223 ) {
										status = 204;
									}
								}
							}
						} catch( firefoxAccessException ) {
							if ( !isAbort ) {
								complete( -1, firefoxAccessException );
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, responseHeaders );
						}
					};

					if ( !s.async ) {
						// if we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {
						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						setTimeout( callback );
					} else {
						handle = ++xhrId;
						if ( xhrOnUnloadAbort ) {
							// Create the active xhrs callbacks list if needed
							// and attach the unload handler
							if ( !xhrCallbacks ) {
								xhrCallbacks = {};
								jQuery( window ).unload( xhrOnUnloadAbort );
							}
							// Add to list of active xhrs callbacks
							xhrCallbacks[ handle ] = callback;
						}
						xhr.onreadystatechange = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	});
}
var fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + core_pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [function( prop, value ) {
			var end, unit,
				tween = this.createTween( prop, value ),
				parts = rfxnum.exec( value ),
				target = tween.cur(),
				start = +target || 0,
				scale = 1,
				maxIterations = 20;

			if ( parts ) {
				end = +parts[2];
				unit = parts[3] || ( jQuery.cssNumber[ prop ] ? "" : "px" );

				// We need to compute starting value
				if ( unit !== "px" && start ) {
					// Iteratively approximate from a nonzero starting point
					// Prefer the current property, because this process will be trivial if it uses the same units
					// Fallback to end or a simple constant
					start = jQuery.css( tween.elem, prop, true ) || end || 1;

					do {
						// If previous iteration zeroed out, double until we get *something*
						// Use a string for doubling factor so we don't accidentally see scale as unchanged below
						scale = scale || ".5";

						// Adjust and apply
						start = start / scale;
						jQuery.style( tween.elem, prop, start + unit );

					// Update scale, tolerating zero or NaN from tween.cur()
					// And breaking the loop if scale is unchanged or perfect, or if we've just had enough
					} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
				}

				tween.unit = unit;
				tween.start = start;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[1] ? start + ( parts[1] + 1 ) * end : end;
			}
			return tween;
		}]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

function createTweens( animation, props ) {
	jQuery.each( props, function( prop, value ) {
		var collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
			index = 0,
			length = collection.length;
		for ( ; index < length; index++ ) {
			if ( collection[ index ].call( animation, prop, value ) ) {

				// we're done with this property
				return;
			}
		}
	});
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	createTweens( animation, props );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

jQuery.Animation = jQuery.extend( Animation, {

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

function defaultPrefilter( elem, props, opts ) {
	/*jshint validthis:true */
	var index, prop, value, length, dataShow, toggle, tween, hooks, oldfire,
		anim = this,
		style = elem.style,
		orig = {},
		handled = [],
		hidden = elem.nodeType && isHidden( elem );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		if ( jQuery.css( elem, "display" ) === "inline" &&
				jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !jQuery.support.inlineBlockNeedsLayout || css_defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";

			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !jQuery.support.shrinkWrapBlocks ) {
			anim.done(function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			});
		}
	}


	// show/hide pass
	for ( index in props ) {
		value = props[ index ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ index ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {
				continue;
			}
			handled.push( index );
		}
	}

	length = handled.length;
	if ( length ) {
		dataShow = jQuery._data( elem, "fxshow" ) || jQuery._data( elem, "fxshow", {} );
		if ( "hidden" in dataShow ) {
			hidden = dataShow.hidden;
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( index = 0 ; index < length ; index++ ) {
			prop = handled[ index ];
			tween = anim.createTween( prop, hidden ? dataShow[ prop ] : 0 );
			orig[ prop ] = dataShow[ prop ] || jQuery.style( elem, prop );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}
	}
}

function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// passing a non empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "auto" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Remove in 2.0 - this supports IE8's panic based approach
// to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );
				doAnimation.finish = function() {
					anim.stop( true );
				};
				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.cur && hooks.cur.finish ) {
				hooks.cur.finish.call( this );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		});
	}
});

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth? 1 : 0;
	for( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p*Math.PI ) / 2;
	}
};

jQuery.timers = [];
jQuery.fx = Tween.prototype.init;
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	if ( timer() && jQuery.timers.push( timer ) ) {
		jQuery.fx.start();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};

// Back Compat <1.8 extension point
jQuery.fx.step = {};

if ( jQuery.expr && jQuery.expr.filters ) {
	jQuery.expr.filters.animated = function( elem ) {
		return jQuery.grep(jQuery.timers, function( fn ) {
			return elem === fn.elem;
		}).length;
	};
}
jQuery.fn.offset = function( options ) {
	if ( arguments.length ) {
		return options === undefined ?
			this :
			this.each(function( i ) {
				jQuery.offset.setOffset( this, options, i );
			});
	}

	var docElem, win,
		box = { top: 0, left: 0 },
		elem = this[ 0 ],
		doc = elem && elem.ownerDocument;

	if ( !doc ) {
		return;
	}

	docElem = doc.documentElement;

	// Make sure it's not a disconnected DOM node
	if ( !jQuery.contains( docElem, elem ) ) {
		return box;
	}

	// If we don't have gBCR, just use 0,0 rather than error
	// BlackBerry 5, iOS 3 (original iPhone)
	if ( typeof elem.getBoundingClientRect !== "undefined" ) {
		box = elem.getBoundingClientRect();
	}
	win = getWindow( doc );
	return {
		top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
		left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
	};
};

jQuery.offset = {

	setOffset: function( elem, options, i ) {
		var position = jQuery.css( elem, "position" );

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		var curElem = jQuery( elem ),
			curOffset = curElem.offset(),
			curCSSTop = jQuery.css( elem, "top" ),
			curCSSLeft = jQuery.css( elem, "left" ),
			calculatePosition = ( position === "absolute" || position === "fixed" ) && jQuery.inArray("auto", [curCSSTop, curCSSLeft]) > -1,
			props = {}, curPosition = {}, curTop, curLeft;

		// need to be able to calculate position if either top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};


jQuery.fn.extend({

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is it's only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true)
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || document.documentElement;
			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position") === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || document.documentElement;
		});
	}
});


// Create scrollLeft and scrollTop methods
jQuery.each( {scrollLeft: "pageXOffset", scrollTop: "pageYOffset"}, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return jQuery.access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? (prop in win) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}
// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return jQuery.access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height], whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only, but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});
// Limit scope pollution from any deprecated API
// (function() {

// })();
// Expose jQuery to the global object
window.jQuery = window.$ = jQuery;

// Expose jQuery as an AMD module, but only for AMD loaders that
// understand the issues with loading multiple versions of jQuery
// in a page that all might call define(). The loader will indicate
// they have special allowances for multiple jQuery versions by
// specifying define.amd.jQuery = true. Register as a named module,
// since jQuery can be concatenated with other files that may use define,
// but not use a proper concatenation script that understands anonymous
// AMD modules. A named AMD is safest and most robust way to register.
// Lowercase jquery is used because AMD module names are derived from
// file names, and jQuery is normally delivered in a lowercase file name.
// Do this after creating the global so that if an AMD module wants to call
// noConflict to hide this version of jQuery, it will work.
if ( typeof define === "function" && define.amd && define.amd.jQuery ) {
	define( "jquery", [], function () { return jQuery; } );
}

})( window );
}, "libs/jquery.mousewheel": function(exports, require, module) {/*! Copyright (c) 2011 Brandon Aaron (http://brandonaaron.net)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Thanks to: http://adomas.org/javascript-mouse-wheel/ for some pointers.
 * Thanks to: Mathias Bank(http://www.mathias-bank.de) for a scope bug fix.
 * Thanks to: Seamus Leahy for adding deltaX and deltaY
 *
 * Version: 3.0.6
 *
 * Requires: 1.2.2+
 */

(function($) {

var types = ['DOMMouseScroll', 'mousewheel'];

if ($.event.fixHooks) {
    for ( var i=types.length; i; ) {
        $.event.fixHooks[ types[--i] ] = $.event.mouseHooks;
    }
}

$.event.special.mousewheel = {
    setup: function() {
        if ( this.addEventListener ) {
            for ( var i=types.length; i; ) {
                this.addEventListener( types[--i], handler, false );
            }
        } else {
            this.onmousewheel = handler;
        }
    },

    teardown: function() {
        if ( this.removeEventListener ) {
            for ( var i=types.length; i; ) {
                this.removeEventListener( types[--i], handler, false );
            }
        } else {
            this.onmousewheel = null;
        }
    }
};

$.fn.extend({
    mousewheel: function(fn) {
        return fn ? this.bind("mousewheel", fn) : this.trigger("mousewheel");
    },

    unmousewheel: function(fn) {
        return this.unbind("mousewheel", fn);
    }
});


function handler(event) {
    var orgEvent = event || window.event, args = [].slice.call( arguments, 1 ), delta = 0, returnValue = true, deltaX = 0, deltaY = 0;
    event = $.event.fix(orgEvent);
    event.type = "mousewheel";

    // Old school scrollwheel delta
    if ( orgEvent.wheelDelta ) { delta = orgEvent.wheelDelta/120; }
    if ( orgEvent.detail     ) { delta = -orgEvent.detail/3; }

    // New school multidimensional scroll (touchpads) deltas
    deltaY = delta;

    // Gecko
    if ( orgEvent.axis !== undefined && orgEvent.axis === orgEvent.HORIZONTAL_AXIS ) {
        deltaY = 0;
        deltaX = -1*delta;
    }

    // Webkit
    if ( orgEvent.wheelDeltaY !== undefined ) { deltaY = orgEvent.wheelDeltaY/120; }
    if ( orgEvent.wheelDeltaX !== undefined ) { deltaX = -1*orgEvent.wheelDeltaX/120; }

    // Add event and delta to the front of the arguments
    args.unshift(event, delta, deltaX, deltaY);

    return ($.event.dispatch || $.event.handle).apply(this, args);
}

})(jQuery);
}, "stylesheets/bootstrap-responsive": function(exports, require, module) {s = document.createElement('style'); s.innerHTML = "/*!\n * Bootstrap Responsive v2.3.1\n *\n * Copyright 2012 Twitter, Inc\n * Licensed under the Apache License v2.0\n * http://www.apache.org/licenses/LICENSE-2.0\n *\n * Designed and built with all the love in the world @twitter by @mdo and @fat.\n */.clearfix{*zoom:1}.clearfix:before,.clearfix:after{display:table;line-height:0;content:\"\"}.clearfix:after{clear:both}.hide-text{font:0/0 a;color:transparent;text-shadow:none;background-color:transparent;border:0}.input-block-level{display:block;width:100%;min-height:30px;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}@-ms-viewport{width:device-width}.hidden{display:none;visibility:hidden}.visible-phone{display:none!important}.visible-tablet{display:none!important}.hidden-desktop{display:none!important}.visible-desktop{display:inherit!important}@media(min-width:768px) and (max-width:979px){.hidden-desktop{display:inherit!important}.visible-desktop{display:none!important}.visible-tablet{display:inherit!important}.hidden-tablet{display:none!important}}@media(max-width:767px){.hidden-desktop{display:inherit!important}.visible-desktop{display:none!important}.visible-phone{display:inherit!important}.hidden-phone{display:none!important}}.visible-print{display:none!important}@media print{.visible-print{display:inherit!important}.hidden-print{display:none!important}}@media(min-width:1200px){.row{margin-left:-30px;*zoom:1}.row:before,.row:after{display:table;line-height:0;content:\"\"}.row:after{clear:both}[class*=\"span\"]{float:left;min-height:1px;margin-left:30px}.container,.navbar-static-top .container,.navbar-fixed-top .container,.navbar-fixed-bottom .container{width:1170px}.span12{width:1170px}.span11{width:1070px}.span10{width:970px}.span9{width:870px}.span8{width:770px}.span7{width:670px}.span6{width:570px}.span5{width:470px}.span4{width:370px}.span3{width:270px}.span2{width:170px}.span1{width:70px}.offset12{margin-left:1230px}.offset11{margin-left:1130px}.offset10{margin-left:1030px}.offset9{margin-left:930px}.offset8{margin-left:830px}.offset7{margin-left:730px}.offset6{margin-left:630px}.offset5{margin-left:530px}.offset4{margin-left:430px}.offset3{margin-left:330px}.offset2{margin-left:230px}.offset1{margin-left:130px}.row-fluid{width:100%;*zoom:1}.row-fluid:before,.row-fluid:after{display:table;line-height:0;content:\"\"}.row-fluid:after{clear:both}.row-fluid [class*=\"span\"]{display:block;float:left;width:100%;min-height:30px;margin-left:2.564102564102564%;*margin-left:2.5109110747408616%;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}.row-fluid [class*=\"span\"]:first-child{margin-left:0}.row-fluid .controls-row [class*=\"span\"]+[class*=\"span\"]{margin-left:2.564102564102564%}.row-fluid .span12{width:100%;*width:99.94680851063829%}.row-fluid .span11{width:91.45299145299145%;*width:91.39979996362975%}.row-fluid .span10{width:82.90598290598291%;*width:82.8527914166212%}.row-fluid .span9{width:74.35897435897436%;*width:74.30578286961266%}.row-fluid .span8{width:65.81196581196582%;*width:65.75877432260411%}.row-fluid .span7{width:57.26495726495726%;*width:57.21176577559556%}.row-fluid .span6{width:48.717948717948715%;*width:48.664757228587014%}.row-fluid .span5{width:40.17094017094017%;*width:40.11774868157847%}.row-fluid .span4{width:31.623931623931625%;*width:31.570740134569924%}.row-fluid .span3{width:23.076923076923077%;*width:23.023731587561375%}.row-fluid .span2{width:14.52991452991453%;*width:14.476723040552828%}.row-fluid .span1{width:5.982905982905983%;*width:5.929714493544281%}.row-fluid .offset12{margin-left:105.12820512820512%;*margin-left:105.02182214948171%}.row-fluid .offset12:first-child{margin-left:102.56410256410257%;*margin-left:102.45771958537915%}.row-fluid .offset11{margin-left:96.58119658119658%;*margin-left:96.47481360247316%}.row-fluid .offset11:first-child{margin-left:94.01709401709402%;*margin-left:93.91071103837061%}.row-fluid .offset10{margin-left:88.03418803418803%;*margin-left:87.92780505546462%}.row-fluid .offset10:first-child{margin-left:85.47008547008548%;*margin-left:85.36370249136206%}.row-fluid .offset9{margin-left:79.48717948717949%;*margin-left:79.38079650845607%}.row-fluid .offset9:first-child{margin-left:76.92307692307693%;*margin-left:76.81669394435352%}.row-fluid .offset8{margin-left:70.94017094017094%;*margin-left:70.83378796144753%}.row-fluid .offset8:first-child{margin-left:68.37606837606839%;*margin-left:68.26968539734497%}.row-fluid .offset7{margin-left:62.393162393162385%;*margin-left:62.28677941443899%}.row-fluid .offset7:first-child{margin-left:59.82905982905982%;*margin-left:59.72267685033642%}.row-fluid .offset6{margin-left:53.84615384615384%;*margin-left:53.739770867430444%}.row-fluid .offset6:first-child{margin-left:51.28205128205128%;*margin-left:51.175668303327875%}.row-fluid .offset5{margin-left:45.299145299145295%;*margin-left:45.1927623204219%}.row-fluid .offset5:first-child{margin-left:42.73504273504273%;*margin-left:42.62865975631933%}.row-fluid .offset4{margin-left:36.75213675213675%;*margin-left:36.645753773413354%}.row-fluid .offset4:first-child{margin-left:34.18803418803419%;*margin-left:34.081651209310785%}.row-fluid .offset3{margin-left:28.205128205128204%;*margin-left:28.0987452264048%}.row-fluid .offset3:first-child{margin-left:25.641025641025642%;*margin-left:25.53464266230224%}.row-fluid .offset2{margin-left:19.65811965811966%;*margin-left:19.551736679396257%}.row-fluid .offset2:first-child{margin-left:17.094017094017094%;*margin-left:16.98763411529369%}.row-fluid .offset1{margin-left:11.11111111111111%;*margin-left:11.004728132387708%}.row-fluid .offset1:first-child{margin-left:8.547008547008547%;*margin-left:8.440625568285142%}input,textarea,.uneditable-input{margin-left:0}.controls-row [class*=\"span\"]+[class*=\"span\"]{margin-left:30px}input.span12,textarea.span12,.uneditable-input.span12{width:1156px}input.span11,textarea.span11,.uneditable-input.span11{width:1056px}input.span10,textarea.span10,.uneditable-input.span10{width:956px}input.span9,textarea.span9,.uneditable-input.span9{width:856px}input.span8,textarea.span8,.uneditable-input.span8{width:756px}input.span7,textarea.span7,.uneditable-input.span7{width:656px}input.span6,textarea.span6,.uneditable-input.span6{width:556px}input.span5,textarea.span5,.uneditable-input.span5{width:456px}input.span4,textarea.span4,.uneditable-input.span4{width:356px}input.span3,textarea.span3,.uneditable-input.span3{width:256px}input.span2,textarea.span2,.uneditable-input.span2{width:156px}input.span1,textarea.span1,.uneditable-input.span1{width:56px}.thumbnails{margin-left:-30px}.thumbnails>li{margin-left:30px}.row-fluid .thumbnails{margin-left:0}}@media(min-width:768px) and (max-width:979px){.row{margin-left:-20px;*zoom:1}.row:before,.row:after{display:table;line-height:0;content:\"\"}.row:after{clear:both}[class*=\"span\"]{float:left;min-height:1px;margin-left:20px}.container,.navbar-static-top .container,.navbar-fixed-top .container,.navbar-fixed-bottom .container{width:724px}.span12{width:724px}.span11{width:662px}.span10{width:600px}.span9{width:538px}.span8{width:476px}.span7{width:414px}.span6{width:352px}.span5{width:290px}.span4{width:228px}.span3{width:166px}.span2{width:104px}.span1{width:42px}.offset12{margin-left:764px}.offset11{margin-left:702px}.offset10{margin-left:640px}.offset9{margin-left:578px}.offset8{margin-left:516px}.offset7{margin-left:454px}.offset6{margin-left:392px}.offset5{margin-left:330px}.offset4{margin-left:268px}.offset3{margin-left:206px}.offset2{margin-left:144px}.offset1{margin-left:82px}.row-fluid{width:100%;*zoom:1}.row-fluid:before,.row-fluid:after{display:table;line-height:0;content:\"\"}.row-fluid:after{clear:both}.row-fluid [class*=\"span\"]{display:block;float:left;width:100%;min-height:30px;margin-left:2.7624309392265194%;*margin-left:2.709239449864817%;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}.row-fluid [class*=\"span\"]:first-child{margin-left:0}.row-fluid .controls-row [class*=\"span\"]+[class*=\"span\"]{margin-left:2.7624309392265194%}.row-fluid .span12{width:100%;*width:99.94680851063829%}.row-fluid .span11{width:91.43646408839778%;*width:91.38327259903608%}.row-fluid .span10{width:82.87292817679558%;*width:82.81973668743387%}.row-fluid .span9{width:74.30939226519337%;*width:74.25620077583166%}.row-fluid .span8{width:65.74585635359117%;*width:65.69266486422946%}.row-fluid .span7{width:57.18232044198895%;*width:57.12912895262725%}.row-fluid .span6{width:48.61878453038674%;*width:48.56559304102504%}.row-fluid .span5{width:40.05524861878453%;*width:40.00205712942283%}.row-fluid .span4{width:31.491712707182323%;*width:31.43852121782062%}.row-fluid .span3{width:22.92817679558011%;*width:22.87498530621841%}.row-fluid .span2{width:14.3646408839779%;*width:14.311449394616199%}.row-fluid .span1{width:5.801104972375691%;*width:5.747913483013988%}.row-fluid .offset12{margin-left:105.52486187845304%;*margin-left:105.41847889972962%}.row-fluid .offset12:first-child{margin-left:102.76243093922652%;*margin-left:102.6560479605031%}.row-fluid .offset11{margin-left:96.96132596685082%;*margin-left:96.8549429881274%}.row-fluid .offset11:first-child{margin-left:94.1988950276243%;*margin-left:94.09251204890089%}.row-fluid .offset10{margin-left:88.39779005524862%;*margin-left:88.2914070765252%}.row-fluid .offset10:first-child{margin-left:85.6353591160221%;*margin-left:85.52897613729868%}.row-fluid .offset9{margin-left:79.8342541436464%;*margin-left:79.72787116492299%}.row-fluid .offset9:first-child{margin-left:77.07182320441989%;*margin-left:76.96544022569647%}.row-fluid .offset8{margin-left:71.2707182320442%;*margin-left:71.16433525332079%}.row-fluid .offset8:first-child{margin-left:68.50828729281768%;*margin-left:68.40190431409427%}.row-fluid .offset7{margin-left:62.70718232044199%;*margin-left:62.600799341718584%}.row-fluid .offset7:first-child{margin-left:59.94475138121547%;*margin-left:59.838368402492065%}.row-fluid .offset6{margin-left:54.14364640883978%;*margin-left:54.037263430116376%}.row-fluid .offset6:first-child{margin-left:51.38121546961326%;*margin-left:51.27483249088986%}.row-fluid .offset5{margin-left:45.58011049723757%;*margin-left:45.47372751851417%}.row-fluid .offset5:first-child{margin-left:42.81767955801105%;*margin-left:42.71129657928765%}.row-fluid .offset4{margin-left:37.01657458563536%;*margin-left:36.91019160691196%}.row-fluid .offset4:first-child{margin-left:34.25414364640884%;*margin-left:34.14776066768544%}.row-fluid .offset3{margin-left:28.45303867403315%;*margin-left:28.346655695309746%}.row-fluid .offset3:first-child{margin-left:25.69060773480663%;*margin-left:25.584224756083227%}.row-fluid .offset2{margin-left:19.88950276243094%;*margin-left:19.783119783707537%}.row-fluid .offset2:first-child{margin-left:17.12707182320442%;*margin-left:17.02068884448102%}.row-fluid .offset1{margin-left:11.32596685082873%;*margin-left:11.219583872105325%}.row-fluid .offset1:first-child{margin-left:8.56353591160221%;*margin-left:8.457152932878806%}input,textarea,.uneditable-input{margin-left:0}.controls-row [class*=\"span\"]+[class*=\"span\"]{margin-left:20px}input.span12,textarea.span12,.uneditable-input.span12{width:710px}input.span11,textarea.span11,.uneditable-input.span11{width:648px}input.span10,textarea.span10,.uneditable-input.span10{width:586px}input.span9,textarea.span9,.uneditable-input.span9{width:524px}input.span8,textarea.span8,.uneditable-input.span8{width:462px}input.span7,textarea.span7,.uneditable-input.span7{width:400px}input.span6,textarea.span6,.uneditable-input.span6{width:338px}input.span5,textarea.span5,.uneditable-input.span5{width:276px}input.span4,textarea.span4,.uneditable-input.span4{width:214px}input.span3,textarea.span3,.uneditable-input.span3{width:152px}input.span2,textarea.span2,.uneditable-input.span2{width:90px}input.span1,textarea.span1,.uneditable-input.span1{width:28px}}@media(max-width:767px){body{padding-right:20px;padding-left:20px}.navbar-fixed-top,.navbar-fixed-bottom,.navbar-static-top{margin-right:-20px;margin-left:-20px}.container-fluid{padding:0}.dl-horizontal dt{float:none;width:auto;clear:none;text-align:left}.dl-horizontal dd{margin-left:0}.container{width:auto}.row-fluid{width:100%}.row,.thumbnails{margin-left:0}.thumbnails>li{float:none;margin-left:0}[class*=\"span\"],.uneditable-input[class*=\"span\"],.row-fluid [class*=\"span\"]{display:block;float:none;width:100%;margin-left:0;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}.span12,.row-fluid .span12{width:100%;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}.row-fluid [class*=\"offset\"]:first-child{margin-left:0}.input-large,.input-xlarge,.input-xxlarge,input[class*=\"span\"],select[class*=\"span\"],textarea[class*=\"span\"],.uneditable-input{display:block;width:100%;min-height:30px;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}.input-prepend input,.input-append input,.input-prepend input[class*=\"span\"],.input-append input[class*=\"span\"]{display:inline-block;width:auto}.controls-row [class*=\"span\"]+[class*=\"span\"]{margin-left:0}.modal{position:fixed;top:20px;right:20px;left:20px;width:auto;margin:0}.modal.fade{top:-100px}.modal.fade.in{top:20px}}@media(max-width:480px){.nav-collapse{-webkit-transform:translate3d(0,0,0)}.page-header h1 small{display:block;line-height:20px}input[type=\"checkbox\"],input[type=\"radio\"]{border:1px solid #ccc}.form-horizontal .control-label{float:none;width:auto;padding-top:0;text-align:left}.form-horizontal .controls{margin-left:0}.form-horizontal .control-list{padding-top:0}.form-horizontal .form-actions{padding-right:10px;padding-left:10px}.media .pull-left,.media .pull-right{display:block;float:none;margin-bottom:10px}.media-object{margin-right:0;margin-left:0}.modal{top:10px;right:10px;left:10px}.modal-header .close{padding:10px;margin:-10px}.carousel-caption{position:static}}@media(max-width:979px){body{padding-top:0}.navbar-fixed-top,.navbar-fixed-bottom{position:static}.navbar-fixed-top{margin-bottom:20px}.navbar-fixed-bottom{margin-top:20px}.navbar-fixed-top .navbar-inner,.navbar-fixed-bottom .navbar-inner{padding:5px}.navbar .container{width:auto;padding:0}.navbar .brand{padding-right:10px;padding-left:10px;margin:0 0 0 -5px}.nav-collapse{clear:both}.nav-collapse .nav{float:none;margin:0 0 10px}.nav-collapse .nav>li{float:none}.nav-collapse .nav>li>a{margin-bottom:2px}.nav-collapse .nav>.divider-vertical{display:none}.nav-collapse .nav .nav-header{color:#777;text-shadow:none}.nav-collapse .nav>li>a,.nav-collapse .dropdown-menu a{padding:9px 15px;font-weight:bold;color:#777;-webkit-border-radius:3px;-moz-border-radius:3px;border-radius:3px}.nav-collapse .btn{padding:4px 10px 4px;font-weight:normal;-webkit-border-radius:4px;-moz-border-radius:4px;border-radius:4px}.nav-collapse .dropdown-menu li+li a{margin-bottom:2px}.nav-collapse .nav>li>a:hover,.nav-collapse .nav>li>a:focus,.nav-collapse .dropdown-menu a:hover,.nav-collapse .dropdown-menu a:focus{background-color:#f2f2f2}.navbar-inverse .nav-collapse .nav>li>a,.navbar-inverse .nav-collapse .dropdown-menu a{color:#999}.navbar-inverse .nav-collapse .nav>li>a:hover,.navbar-inverse .nav-collapse .nav>li>a:focus,.navbar-inverse .nav-collapse .dropdown-menu a:hover,.navbar-inverse .nav-collapse .dropdown-menu a:focus{background-color:#111}.nav-collapse.in .btn-group{padding:0;margin-top:5px}.nav-collapse .dropdown-menu{position:static;top:auto;left:auto;display:none;float:none;max-width:none;padding:0;margin:0 15px;background-color:transparent;border:0;-webkit-border-radius:0;-moz-border-radius:0;border-radius:0;-webkit-box-shadow:none;-moz-box-shadow:none;box-shadow:none}.nav-collapse .open>.dropdown-menu{display:block}.nav-collapse .dropdown-menu:before,.nav-collapse .dropdown-menu:after{display:none}.nav-collapse .dropdown-menu .divider{display:none}.nav-collapse .nav>li>.dropdown-menu:before,.nav-collapse .nav>li>.dropdown-menu:after{display:none}.nav-collapse .navbar-form,.nav-collapse .navbar-search{float:none;padding:10px 15px;margin:10px 0;border-top:1px solid #f2f2f2;border-bottom:1px solid #f2f2f2;-webkit-box-shadow:inset 0 1px 0 rgba(255,255,255,0.1),0 1px 0 rgba(255,255,255,0.1);-moz-box-shadow:inset 0 1px 0 rgba(255,255,255,0.1),0 1px 0 rgba(255,255,255,0.1);box-shadow:inset 0 1px 0 rgba(255,255,255,0.1),0 1px 0 rgba(255,255,255,0.1)}.navbar-inverse .nav-collapse .navbar-form,.navbar-inverse .nav-collapse .navbar-search{border-top-color:#111;border-bottom-color:#111}.navbar .nav-collapse .nav.pull-right{float:none;margin-left:0}.nav-collapse,.nav-collapse.collapse{height:0;overflow:hidden}.navbar .btn-navbar{display:block}.navbar-static .navbar-inner{padding-right:10px;padding-left:10px}}@media(min-width:980px){.nav-collapse.collapse{height:auto!important;overflow:visible!important}}\n"; s.id = "css-bootstrap-responsive"; document.head.appendChild(s);}, "stylesheets/bootstrap": function(exports, require, module) {s = document.createElement('style'); s.innerHTML = "\n        .clearfix{*zoom:1}.clearfix:before,.clearfix:after{display:table;line-height:0;content:\"\"}.clearfix:after{clear:both}.hide-text{font:0/0 a;color:transparent;text-shadow:none;background-color:transparent;border:0}.input-block-level{display:block;width:100%;min-height:30px;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}article,aside,details,figcaption,figure,footer,header,hgroup,nav,section{display:block}audio,canvas,video{display:inline-block;*display:inline;*zoom:1}audio:not([controls]){display:none}html{font-size:100%;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%}a:focus{outline:thin dotted #333;outline:5px auto -webkit-focus-ring-color;outline-offset:-2px}a:hover,a:active{outline:0}sub,sup{position:relative;font-size:75%;line-height:0;vertical-align:baseline}sup{top:-0.5em}sub{bottom:-0.25em}img{width:auto\\9;height:auto;max-width:100%;vertical-align:middle;border:0;-ms-interpolation-mode:bicubic}#map_canvas img,.google-maps img{max-width:none}button,input,select,textarea{margin:0;font-size:100%;vertical-align:middle}button,input{*overflow:visible;line-height:normal}button::-moz-focus-inner,input::-moz-focus-inner{padding:0;border:0}button,html input[type=\"button\"],input[type=\"reset\"],input[type=\"submit\"]{cursor:pointer;-webkit-appearance:button}label,select,button,input[type=\"button\"],input[type=\"reset\"],input[type=\"submit\"],input[type=\"radio\"],input[type=\"checkbox\"]{cursor:pointer}input[type=\"search\"]{-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;-webkit-appearance:textfield}input[type=\"search\"]::-webkit-search-decoration,input[type=\"search\"]::-webkit-search-cancel-button{-webkit-appearance:none}textarea{overflow:auto;vertical-align:top}@media print{*{color:#000!important;text-shadow:none!important;background:transparent!important;box-shadow:none!important}a,a:visited{text-decoration:underline}a[href]:after{content:\" (\" attr(href) \")\"}abbr[title]:after{content:\" (\" attr(title) \")\"}.ir a:after,a[href^=\"javascript:\"]:after,a[href^=\"#\"]:after{content:\"\"}pre,blockquote{border:1px solid #999;page-break-inside:avoid}thead{display:table-header-group}tr,img{page-break-inside:avoid}img{max-width:100%!important}@page{margin:.5cm}p,h2,h3{orphans:3;widows:3}h2,h3{page-break-after:avoid}}body{margin:0;font-family:\"Helvetica Neue\",Helvetica,Arial,sans-serif;font-size:14px;line-height:20px;color:#333;background-color:#fff}a{color:#08c;text-decoration:none}a:hover,a:focus{color:#005580;text-decoration:underline}.img-rounded{-webkit-border-radius:6px;-moz-border-radius:6px;border-radius:6px}.img-polaroid{padding:4px;background-color:#fff;border:1px solid #ccc;border:1px solid rgba(0,0,0,0.2);-webkit-box-shadow:0 1px 3px rgba(0,0,0,0.1);-moz-box-shadow:0 1px 3px rgba(0,0,0,0.1);box-shadow:0 1px 3px rgba(0,0,0,0.1)}.img-circle{-webkit-border-radius:500px;-moz-border-radius:500px;border-radius:500px}.row{margin-left:-20px;*zoom:1}.row:before,.row:after{display:table;line-height:0;content:\"\"}.row:after{clear:both}[class*=\"span\"]{float:left;min-height:1px;margin-left:20px}.container,.navbar-static-top .container,.navbar-fixed-top .container,.navbar-fixed-bottom .container{width:940px}.span12{width:940px}.span11{width:860px}.span10{width:780px}.span9{width:700px}.span8{width:620px}.span7{width:540px}.span6{width:460px}.span5{width:380px}.span4{width:300px}.span3{width:220px}.span2{width:140px}.span1{width:60px}.offset12{margin-left:980px}.offset11{margin-left:900px}.offset10{margin-left:820px}.offset9{margin-left:740px}.offset8{margin-left:660px}.offset7{margin-left:580px}.offset6{margin-left:500px}.offset5{margin-left:420px}.offset4{margin-left:340px}.offset3{margin-left:260px}.offset2{margin-left:180px}.offset1{margin-left:100px}.row-fluid{width:100%;*zoom:1}.row-fluid:before,.row-fluid:after{display:table;line-height:0;content:\"\"}.row-fluid:after{clear:both}.row-fluid [class*=\"span\"]{display:block;float:left;width:100%;min-height:30px;margin-left:2.127659574468085%;*margin-left:2.074468085106383%;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}.row-fluid [class*=\"span\"]:first-child{margin-left:0}.row-fluid .controls-row [class*=\"span\"]+[class*=\"span\"]{margin-left:2.127659574468085%}.row-fluid .span12{width:100%;*width:99.94680851063829%}.row-fluid .span11{width:91.48936170212765%;*width:91.43617021276594%}.row-fluid .span10{width:82.97872340425532%;*width:82.92553191489361%}.row-fluid .span9{width:74.46808510638297%;*width:74.41489361702126%}.row-fluid .span8{width:65.95744680851064%;*width:65.90425531914893%}.row-fluid .span7{width:57.44680851063829%;*width:57.39361702127659%}.row-fluid .span6{width:48.93617021276595%;*width:48.88297872340425%}.row-fluid .span5{width:40.42553191489362%;*width:40.37234042553192%}.row-fluid .span4{width:31.914893617021278%;*width:31.861702127659576%}.row-fluid .span3{width:23.404255319148934%;*width:23.351063829787233%}.row-fluid .span2{width:14.893617021276595%;*width:14.840425531914894%}.row-fluid .span1{width:6.382978723404255%;*width:6.329787234042553%}.row-fluid .offset12{margin-left:104.25531914893617%;*margin-left:104.14893617021275%}.row-fluid .offset12:first-child{margin-left:102.12765957446808%;*margin-left:102.02127659574467%}.row-fluid .offset11{margin-left:95.74468085106382%;*margin-left:95.6382978723404%}.row-fluid .offset11:first-child{margin-left:93.61702127659574%;*margin-left:93.51063829787232%}.row-fluid .offset10{margin-left:87.23404255319149%;*margin-left:87.12765957446807%}.row-fluid .offset10:first-child{margin-left:85.1063829787234%;*margin-left:84.99999999999999%}.row-fluid .offset9{margin-left:78.72340425531914%;*margin-left:78.61702127659572%}.row-fluid .offset9:first-child{margin-left:76.59574468085106%;*margin-left:76.48936170212764%}.row-fluid .offset8{margin-left:70.2127659574468%;*margin-left:70.10638297872339%}.row-fluid .offset8:first-child{margin-left:68.08510638297872%;*margin-left:67.9787234042553%}.row-fluid .offset7{margin-left:61.70212765957446%;*margin-left:61.59574468085106%}.row-fluid .offset7:first-child{margin-left:59.574468085106375%;*margin-left:59.46808510638297%}.row-fluid .offset6{margin-left:53.191489361702125%;*margin-left:53.085106382978715%}.row-fluid .offset6:first-child{margin-left:51.063829787234035%;*margin-left:50.95744680851063%}.row-fluid .offset5{margin-left:44.68085106382979%;*margin-left:44.57446808510638%}.row-fluid .offset5:first-child{margin-left:42.5531914893617%;*margin-left:42.4468085106383%}.row-fluid .offset4{margin-left:36.170212765957444%;*margin-left:36.06382978723405%}.row-fluid .offset4:first-child{margin-left:34.04255319148936%;*margin-left:33.93617021276596%}.row-fluid .offset3{margin-left:27.659574468085104%;*margin-left:27.5531914893617%}.row-fluid .offset3:first-child{margin-left:25.53191489361702%;*margin-left:25.425531914893618%}.row-fluid .offset2{margin-left:19.148936170212764%;*margin-left:19.04255319148936%}.row-fluid .offset2:first-child{margin-left:17.02127659574468%;*margin-left:16.914893617021278%}.row-fluid .offset1{margin-left:10.638297872340425%;*margin-left:10.53191489361702%}.row-fluid .offset1:first-child{margin-left:8.51063829787234%;*margin-left:8.404255319148938%}[class*=\"span\"].hide,.row-fluid [class*=\"span\"].hide{display:none}[class*=\"span\"].pull-right,.row-fluid [class*=\"span\"].pull-right{float:right}.container{margin-right:auto;margin-left:auto;*zoom:1}.container:before,.container:after{display:table;line-height:0;content:\"\"}.container:after{clear:both}.container-fluid{padding-right:20px;padding-left:20px;*zoom:1}.container-fluid:before,.container-fluid:after{display:table;line-height:0;content:\"\"}.container-fluid:after{clear:both}p{margin:0 0 10px}.lead{margin-bottom:20px;font-size:21px;font-weight:200;line-height:30px}small{font-size:85%}strong{font-weight:bold}em{font-style:italic}cite{font-style:normal}.muted{color:#999}a.muted:hover,a.muted:focus{color:#808080}.text-warning{color:#c09853}a.text-warning:hover,a.text-warning:focus{color:#a47e3c}.text-error{color:#b94a48}a.text-error:hover,a.text-error:focus{color:#953b39}.text-info{color:#3a87ad}a.text-info:hover,a.text-info:focus{color:#2d6987}.text-success{color:#468847}a.text-success:hover,a.text-success:focus{color:#356635}.text-left{text-align:left}.text-right{text-align:right}.text-center{text-align:center}h1,h2,h3,h4,h5,h6{margin:10px 0;font-family:inherit;font-weight:bold;line-height:20px;color:inherit;text-rendering:optimizelegibility}h1 small,h2 small,h3 small,h4 small,h5 small,h6 small{font-weight:normal;line-height:1;color:#999}h1,h2,h3{line-height:40px}h1{font-size:38.5px}h2{font-size:31.5px}h3{font-size:24.5px}h4{font-size:17.5px}h5{font-size:14px}h6{font-size:11.9px}h1 small{font-size:24.5px}h2 small{font-size:17.5px}h3 small{font-size:14px}h4 small{font-size:14px}.page-header{padding-bottom:9px;margin:20px 0 30px;border-bottom:1px solid #eee}ul,ol{padding:0;margin:0 0 10px 25px}ul ul,ul ol,ol ol,ol ul{margin-bottom:0}li{line-height:20px}ul.unstyled,ol.unstyled{margin-left:0;list-style:none}ul.inline,ol.inline{margin-left:0;list-style:none}ul.inline>li,ol.inline>li{display:inline-block;*display:inline;padding-right:5px;padding-left:5px;*zoom:1}dl{margin-bottom:20px}dt,dd{line-height:20px}dt{font-weight:bold}dd{margin-left:10px}.dl-horizontal{*zoom:1}.dl-horizontal:before,.dl-horizontal:after{display:table;line-height:0;content:\"\"}.dl-horizontal:after{clear:both}.dl-horizontal dt{float:left;width:160px;overflow:hidden;clear:left;text-align:right;text-overflow:ellipsis;white-space:nowrap}.dl-horizontal dd{margin-left:180px}hr{margin:20px 0;border:0;border-top:1px solid #eee;border-bottom:1px solid #fff}abbr[title],abbr[data-original-title]{cursor:help;border-bottom:1px dotted #999}abbr.initialism{font-size:90%;text-transform:uppercase}blockquote{padding:0 0 0 15px;margin:0 0 20px;border-left:5px solid #eee}blockquote p{margin-bottom:0;font-size:17.5px;font-weight:300;line-height:1.25}blockquote small{display:block;line-height:20px;color:#999}blockquote small:before{content:'\\2014 \\00A0'}blockquote.pull-right{float:right;padding-right:15px;padding-left:0;border-right:5px solid #eee;border-left:0}blockquote.pull-right p,blockquote.pull-right small{text-align:right}blockquote.pull-right small:before{content:''}blockquote.pull-right small:after{content:'\\00A0 \\2014'}q:before,q:after,blockquote:before,blockquote:after{content:\"\"}address{display:block;margin-bottom:20px;font-style:normal;line-height:20px}code,pre{padding:0 3px 2px;font-family:Monaco,Menlo,Consolas,\"Courier New\",monospace;font-size:12px;color:#333;-webkit-border-radius:3px;-moz-border-radius:3px;border-radius:3px}code{padding:2px 4px;color:#d14;white-space:nowrap;background-color:#f7f7f9;border:1px solid #e1e1e8}pre{display:block;padding:9.5px;margin:0 0 10px;font-size:13px;line-height:20px;word-break:break-all;word-wrap:break-word;white-space:pre;white-space:pre-wrap;background-color:#f5f5f5;border:1px solid #ccc;border:1px solid rgba(0,0,0,0.15);-webkit-border-radius:4px;-moz-border-radius:4px;border-radius:4px}pre.prettyprint{margin-bottom:20px}pre code{padding:0;color:inherit;white-space:pre;white-space:pre-wrap;background-color:transparent;border:0}.pre-scrollable{max-height:340px;overflow-y:scroll}form{margin:0 0 20px}fieldset{padding:0;margin:0;border:0}legend{display:block;width:100%;padding:0;margin-bottom:20px;font-size:21px;line-height:40px;color:#333;border:0;border-bottom:1px solid #e5e5e5}legend small{font-size:15px;color:#999}label,input,button,select,textarea{font-size:14px;font-weight:normal;line-height:20px}input,button,select,textarea{font-family:\"Helvetica Neue\",Helvetica,Arial,sans-serif}label{display:block;margin-bottom:5px}select,textarea,input[type=\"text\"],input[type=\"password\"],input[type=\"datetime\"],input[type=\"datetime-local\"],input[type=\"date\"],input[type=\"month\"],input[type=\"time\"],input[type=\"week\"],input[type=\"number\"],input[type=\"email\"],input[type=\"url\"],input[type=\"search\"],input[type=\"tel\"],input[type=\"color\"],.uneditable-input{display:inline-block;height:20px;padding:4px 6px;margin-bottom:10px;font-size:14px;line-height:20px;color:#555;vertical-align:middle;-webkit-border-radius:4px;-moz-border-radius:4px;border-radius:4px}input,textarea,.uneditable-input{width:206px}textarea{height:auto}textarea,input[type=\"text\"],input[type=\"password\"],input[type=\"datetime\"],input[type=\"datetime-local\"],input[type=\"date\"],input[type=\"month\"],input[type=\"time\"],input[type=\"week\"],input[type=\"number\"],input[type=\"email\"],input[type=\"url\"],input[type=\"search\"],input[type=\"tel\"],input[type=\"color\"],.uneditable-input{background-color:#fff;border:1px solid #ccc;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,0.075);-moz-box-shadow:inset 0 1px 1px rgba(0,0,0,0.075);box-shadow:inset 0 1px 1px rgba(0,0,0,0.075);-webkit-transition:border linear .2s,box-shadow linear .2s;-moz-transition:border linear .2s,box-shadow linear .2s;-o-transition:border linear .2s,box-shadow linear .2s;transition:border linear .2s,box-shadow linear .2s}textarea:focus,input[type=\"text\"]:focus,input[type=\"password\"]:focus,input[type=\"datetime\"]:focus,input[type=\"datetime-local\"]:focus,input[type=\"date\"]:focus,input[type=\"month\"]:focus,input[type=\"time\"]:focus,input[type=\"week\"]:focus,input[type=\"number\"]:focus,input[type=\"email\"]:focus,input[type=\"url\"]:focus,input[type=\"search\"]:focus,input[type=\"tel\"]:focus,input[type=\"color\"]:focus,.uneditable-input:focus{border-color:rgba(82,168,236,0.8);outline:0;outline:thin dotted \\9;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,0.075),0 0 8px rgba(82,168,236,0.6);-moz-box-shadow:inset 0 1px 1px rgba(0,0,0,0.075),0 0 8px rgba(82,168,236,0.6);box-shadow:inset 0 1px 1px rgba(0,0,0,0.075),0 0 8px rgba(82,168,236,0.6)}input[type=\"radio\"],input[type=\"checkbox\"]{margin:4px 0 0;margin-top:1px \\9;*margin-top:0;line-height:normal}input[type=\"file\"],input[type=\"image\"],input[type=\"submit\"],input[type=\"reset\"],input[type=\"button\"],input[type=\"radio\"],input[type=\"checkbox\"]{width:auto}select,input[type=\"file\"]{height:30px;*margin-top:4px;line-height:30px}select{width:220px;background-color:#fff;border:1px solid #ccc}select[multiple],select[size]{height:auto}select:focus,input[type=\"file\"]:focus,input[type=\"radio\"]:focus,input[type=\"checkbox\"]:focus{outline:thin dotted #333;outline:5px auto -webkit-focus-ring-color;outline-offset:-2px}.uneditable-input,.uneditable-textarea{color:#999;cursor:not-allowed;background-color:#fcfcfc;border-color:#ccc;-webkit-box-shadow:inset 0 1px 2px rgba(0,0,0,0.025);-moz-box-shadow:inset 0 1px 2px rgba(0,0,0,0.025);box-shadow:inset 0 1px 2px rgba(0,0,0,0.025)}.uneditable-input{overflow:hidden;white-space:nowrap}.uneditable-textarea{width:auto;height:auto}input:-moz-placeholder,textarea:-moz-placeholder{color:#999}input:-ms-input-placeholder,textarea:-ms-input-placeholder{color:#999}input::-webkit-input-placeholder,textarea::-webkit-input-placeholder{color:#999}.radio,.checkbox{min-height:20px;padding-left:20px}.radio input[type=\"radio\"],.checkbox input[type=\"checkbox\"]{float:left;margin-left:-20px}.controls>.radio:first-child,.controls>.checkbox:first-child{padding-top:5px}.radio.inline,.checkbox.inline{display:inline-block;padding-top:5px;margin-bottom:0;vertical-align:middle}.radio.inline+.radio.inline,.checkbox.inline+.checkbox.inline{margin-left:10px}.input-mini{width:60px}.input-small{width:90px}.input-medium{width:150px}.input-large{width:210px}.input-xlarge{width:270px}.input-xxlarge{width:530px}input[class*=\"span\"],select[class*=\"span\"],textarea[class*=\"span\"],.uneditable-input[class*=\"span\"],.row-fluid input[class*=\"span\"],.row-fluid select[class*=\"span\"],.row-fluid textarea[class*=\"span\"],.row-fluid .uneditable-input[class*=\"span\"]{float:none;margin-left:0}.input-append input[class*=\"span\"],.input-append .uneditable-input[class*=\"span\"],.input-prepend input[class*=\"span\"],.input-prepend .uneditable-input[class*=\"span\"],.row-fluid input[class*=\"span\"],.row-fluid select[class*=\"span\"],.row-fluid textarea[class*=\"span\"],.row-fluid .uneditable-input[class*=\"span\"],.row-fluid .input-prepend [class*=\"span\"],.row-fluid .input-append [class*=\"span\"]{display:inline-block}input,textarea,.uneditable-input{margin-left:0}.controls-row [class*=\"span\"]+[class*=\"span\"]{margin-left:20px}input.span12,textarea.span12,.uneditable-input.span12{width:926px}input.span11,textarea.span11,.uneditable-input.span11{width:846px}input.span10,textarea.span10,.uneditable-input.span10{width:766px}input.span9,textarea.span9,.uneditable-input.span9{width:686px}input.span8,textarea.span8,.uneditable-input.span8{width:606px}input.span7,textarea.span7,.uneditable-input.span7{width:526px}input.span6,textarea.span6,.uneditable-input.span6{width:446px}input.span5,textarea.span5,.uneditable-input.span5{width:366px}input.span4,textarea.span4,.uneditable-input.span4{width:286px}input.span3,textarea.span3,.uneditable-input.span3{width:206px}input.span2,textarea.span2,.uneditable-input.span2{width:126px}input.span1,textarea.span1,.uneditable-input.span1{width:46px}.controls-row{*zoom:1}.controls-row:before,.controls-row:after{display:table;line-height:0;content:\"\"}.controls-row:after{clear:both}.controls-row [class*=\"span\"],.row-fluid .controls-row [class*=\"span\"]{float:left}.controls-row .checkbox[class*=\"span\"],.controls-row .radio[class*=\"span\"]{padding-top:5px}input[disabled],select[disabled],textarea[disabled],input[readonly],select[readonly],textarea[readonly]{cursor:not-allowed;background-color:#eee}input[type=\"radio\"][disabled],input[type=\"checkbox\"][disabled],input[type=\"radio\"][readonly],input[type=\"checkbox\"][readonly]{background-color:transparent}.control-group.warning .control-label,.control-group.warning .help-block,.control-group.warning .help-inline{color:#c09853}.control-group.warning .checkbox,.control-group.warning .radio,.control-group.warning input,.control-group.warning select,.control-group.warning textarea{color:#c09853}.control-group.warning input,.control-group.warning select,.control-group.warning textarea{border-color:#c09853;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,0.075);-moz-box-shadow:inset 0 1px 1px rgba(0,0,0,0.075);box-shadow:inset 0 1px 1px rgba(0,0,0,0.075)}.control-group.warning input:focus,.control-group.warning select:focus,.control-group.warning textarea:focus{border-color:#a47e3c;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,0.075),0 0 6px #dbc59e;-moz-box-shadow:inset 0 1px 1px rgba(0,0,0,0.075),0 0 6px #dbc59e;box-shadow:inset 0 1px 1px rgba(0,0,0,0.075),0 0 6px #dbc59e}.control-group.warning .input-prepend .add-on,.control-group.warning .input-append .add-on{color:#c09853;background-color:#fcf8e3;border-color:#c09853}.control-group.error .control-label,.control-group.error .help-block,.control-group.error .help-inline{color:#b94a48}.control-group.error .checkbox,.control-group.error .radio,.control-group.error input,.control-group.error select,.control-group.error textarea{color:#b94a48}.control-group.error input,.control-group.error select,.control-group.error textarea{border-color:#b94a48;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,0.075);-moz-box-shadow:inset 0 1px 1px rgba(0,0,0,0.075);box-shadow:inset 0 1px 1px rgba(0,0,0,0.075)}.control-group.error input:focus,.control-group.error select:focus,.control-group.error textarea:focus{border-color:#953b39;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,0.075),0 0 6px #d59392;-moz-box-shadow:inset 0 1px 1px rgba(0,0,0,0.075),0 0 6px #d59392;box-shadow:inset 0 1px 1px rgba(0,0,0,0.075),0 0 6px #d59392}.control-group.error .input-prepend .add-on,.control-group.error .input-append .add-on{color:#b94a48;background-color:#f2dede;border-color:#b94a48}.control-group.success .control-label,.control-group.success .help-block,.control-group.success .help-inline{color:#468847}.control-group.success .checkbox,.control-group.success .radio,.control-group.success input,.control-group.success select,.control-group.success textarea{color:#468847}.control-group.success input,.control-group.success select,.control-group.success textarea{border-color:#468847;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,0.075);-moz-box-shadow:inset 0 1px 1px rgba(0,0,0,0.075);box-shadow:inset 0 1px 1px rgba(0,0,0,0.075)}.control-group.success input:focus,.control-group.success select:focus,.control-group.success textarea:focus{border-color:#356635;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,0.075),0 0 6px #7aba7b;-moz-box-shadow:inset 0 1px 1px rgba(0,0,0,0.075),0 0 6px #7aba7b;box-shadow:inset 0 1px 1px rgba(0,0,0,0.075),0 0 6px #7aba7b}.control-group.success .input-prepend .add-on,.control-group.success .input-append .add-on{color:#468847;background-color:#dff0d8;border-color:#468847}.control-group.info .control-label,.control-group.info .help-block,.control-group.info .help-inline{color:#3a87ad}.control-group.info .checkbox,.control-group.info .radio,.control-group.info input,.control-group.info select,.control-group.info textarea{color:#3a87ad}.control-group.info input,.control-group.info select,.control-group.info textarea{border-color:#3a87ad;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,0.075);-moz-box-shadow:inset 0 1px 1px rgba(0,0,0,0.075);box-shadow:inset 0 1px 1px rgba(0,0,0,0.075)}.control-group.info input:focus,.control-group.info select:focus,.control-group.info textarea:focus{border-color:#2d6987;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,0.075),0 0 6px #7ab5d3;-moz-box-shadow:inset 0 1px 1px rgba(0,0,0,0.075),0 0 6px #7ab5d3;box-shadow:inset 0 1px 1px rgba(0,0,0,0.075),0 0 6px #7ab5d3}.control-group.info .input-prepend .add-on,.control-group.info .input-append .add-on{color:#3a87ad;background-color:#d9edf7;border-color:#3a87ad}input:focus:invalid,textarea:focus:invalid,select:focus:invalid{color:#b94a48;border-color:#ee5f5b}input:focus:invalid:focus,textarea:focus:invalid:focus,select:focus:invalid:focus{border-color:#e9322d;-webkit-box-shadow:0 0 6px #f8b9b7;-moz-box-shadow:0 0 6px #f8b9b7;box-shadow:0 0 6px #f8b9b7}.form-actions{padding:19px 20px 20px;margin-top:20px;margin-bottom:20px;background-color:#f5f5f5;border-top:1px solid #e5e5e5;*zoom:1}.form-actions:before,.form-actions:after{display:table;line-height:0;content:\"\"}.form-actions:after{clear:both}.help-block,.help-inline{color:#595959}.help-block{display:block;margin-bottom:10px}.help-inline{display:inline-block;*display:inline;padding-left:5px;vertical-align:middle;*zoom:1}.input-append,.input-prepend{display:inline-block;margin-bottom:10px;font-size:0;white-space:nowrap;vertical-align:middle}.input-append input,.input-prepend input,.input-append select,.input-prepend select,.input-append .uneditable-input,.input-prepend .uneditable-input,.input-append .dropdown-menu,.input-prepend .dropdown-menu,.input-append .popover,.input-prepend .popover{font-size:14px}.input-append input,.input-prepend input,.input-append select,.input-prepend select,.input-append .uneditable-input,.input-prepend .uneditable-input{position:relative;margin-bottom:0;*margin-left:0;vertical-align:top;-webkit-border-radius:0 4px 4px 0;-moz-border-radius:0 4px 4px 0;border-radius:0 4px 4px 0}.input-append input:focus,.input-prepend input:focus,.input-append select:focus,.input-prepend select:focus,.input-append .uneditable-input:focus,.input-prepend .uneditable-input:focus{z-index:2}.input-append .add-on,.input-prepend .add-on{display:inline-block;width:auto;height:20px;min-width:16px;padding:4px 5px;font-size:14px;font-weight:normal;line-height:20px;text-align:center;text-shadow:0 1px 0 #fff;background-color:#eee;border:1px solid #ccc}.input-append .add-on,.input-prepend .add-on,.input-append .btn,.input-prepend .btn,.input-append .btn-group>.dropdown-toggle,.input-prepend .btn-group>.dropdown-toggle{vertical-align:top;-webkit-border-radius:0;-moz-border-radius:0;border-radius:0}.input-append .active,.input-prepend .active{background-color:#a9dba9;border-color:#46a546}.input-prepend .add-on,.input-prepend .btn{margin-right:-1px}.input-prepend .add-on:first-child,.input-prepend .btn:first-child{-webkit-border-radius:4px 0 0 4px;-moz-border-radius:4px 0 0 4px;border-radius:4px 0 0 4px}.input-append input,.input-append select,.input-append .uneditable-input{-webkit-border-radius:4px 0 0 4px;-moz-border-radius:4px 0 0 4px;border-radius:4px 0 0 4px}.input-append input+.btn-group .btn:last-child,.input-append select+.btn-group .btn:last-child,.input-append .uneditable-input+.btn-group .btn:last-child{-webkit-border-radius:0 4px 4px 0;-moz-border-radius:0 4px 4px 0;border-radius:0 4px 4px 0}.input-append .add-on,.input-append .btn,.input-append .btn-group{margin-left:-1px}.input-append .add-on:last-child,.input-append .btn:last-child,.input-append .btn-group:last-child>.dropdown-toggle{-webkit-border-radius:0 4px 4px 0;-moz-border-radius:0 4px 4px 0;border-radius:0 4px 4px 0}.input-prepend.input-append input,.input-prepend.input-append select,.input-prepend.input-append .uneditable-input{-webkit-border-radius:0;-moz-border-radius:0;border-radius:0}.input-prepend.input-append input+.btn-group .btn,.input-prepend.input-append select+.btn-group .btn,.input-prepend.input-append .uneditable-input+.btn-group .btn{-webkit-border-radius:0 4px 4px 0;-moz-border-radius:0 4px 4px 0;border-radius:0 4px 4px 0}.input-prepend.input-append .add-on:first-child,.input-prepend.input-append .btn:first-child{margin-right:-1px;-webkit-border-radius:4px 0 0 4px;-moz-border-radius:4px 0 0 4px;border-radius:4px 0 0 4px}.input-prepend.input-append .add-on:last-child,.input-prepend.input-append .btn:last-child{margin-left:-1px;-webkit-border-radius:0 4px 4px 0;-moz-border-radius:0 4px 4px 0;border-radius:0 4px 4px 0}.input-prepend.input-append .btn-group:first-child{margin-left:0}input.search-query{padding-right:14px;padding-right:4px \\9;padding-left:14px;padding-left:4px \\9;margin-bottom:0;-webkit-border-radius:15px;-moz-border-radius:15px;border-radius:15px}.form-search .input-append .search-query,.form-search .input-prepend .search-query{-webkit-border-radius:0;-moz-border-radius:0;border-radius:0}.form-search .input-append .search-query{-webkit-border-radius:14px 0 0 14px;-moz-border-radius:14px 0 0 14px;border-radius:14px 0 0 14px}.form-search .input-append .btn{-webkit-border-radius:0 14px 14px 0;-moz-border-radius:0 14px 14px 0;border-radius:0 14px 14px 0}.form-search .input-prepend .search-query{-webkit-border-radius:0 14px 14px 0;-moz-border-radius:0 14px 14px 0;border-radius:0 14px 14px 0}.form-search .input-prepend .btn{-webkit-border-radius:14px 0 0 14px;-moz-border-radius:14px 0 0 14px;border-radius:14px 0 0 14px}.form-search input,.form-inline input,.form-horizontal input,.form-search textarea,.form-inline textarea,.form-horizontal textarea,.form-search select,.form-inline select,.form-horizontal select,.form-search .help-inline,.form-inline .help-inline,.form-horizontal .help-inline,.form-search .uneditable-input,.form-inline .uneditable-input,.form-horizontal .uneditable-input,.form-search .input-prepend,.form-inline .input-prepend,.form-horizontal .input-prepend,.form-search .input-append,.form-inline .input-append,.form-horizontal .input-append{display:inline-block;*display:inline;margin-bottom:0;vertical-align:middle;*zoom:1}.form-search .hide,.form-inline .hide,.form-horizontal .hide{display:none}.form-search label,.form-inline label,.form-search .btn-group,.form-inline .btn-group{display:inline-block}.form-search .input-append,.form-inline .input-append,.form-search .input-prepend,.form-inline .input-prepend{margin-bottom:0}.form-search .radio,.form-search .checkbox,.form-inline .radio,.form-inline .checkbox{padding-left:0;margin-bottom:0;vertical-align:middle}.form-search .radio input[type=\"radio\"],.form-search .checkbox input[type=\"checkbox\"],.form-inline .radio input[type=\"radio\"],.form-inline .checkbox input[type=\"checkbox\"]{float:left;margin-right:3px;margin-left:0}.control-group{margin-bottom:10px}legend+.control-group{margin-top:20px;-webkit-margin-top-collapse:separate}.form-horizontal .control-group{margin-bottom:20px;*zoom:1}.form-horizontal .control-group:before,.form-horizontal .control-group:after{display:table;line-height:0;content:\"\"}.form-horizontal .control-group:after{clear:both}.form-horizontal .control-label{float:left;width:160px;padding-top:5px;text-align:right}.form-horizontal .controls{*display:inline-block;*padding-left:20px;margin-left:180px;*margin-left:0}.form-horizontal .controls:first-child{*padding-left:180px}.form-horizontal .help-block{margin-bottom:0}.form-horizontal input+.help-block,.form-horizontal select+.help-block,.form-horizontal textarea+.help-block,.form-horizontal .uneditable-input+.help-block,.form-horizontal .input-prepend+.help-block,.form-horizontal .input-append+.help-block{margin-top:10px}.form-horizontal .form-actions{padding-left:180px}table{max-width:100%;background-color:transparent;border-collapse:collapse;border-spacing:0}.table{width:100%;margin-bottom:20px}.table th,.table td{padding:8px;line-height:20px;text-align:left;vertical-align:top;border-top:1px solid #ddd}.table th{font-weight:bold}.table thead th{vertical-align:bottom}.table caption+thead tr:first-child th,.table caption+thead tr:first-child td,.table colgroup+thead tr:first-child th,.table colgroup+thead tr:first-child td,.table thead:first-child tr:first-child th,.table thead:first-child tr:first-child td{border-top:0}.table tbody+tbody{border-top:2px solid #ddd}.table .table{background-color:#fff}.table-condensed th,.table-condensed td{padding:4px 5px}.table-bordered{border:1px solid #ddd;border-collapse:separate;*border-collapse:collapse;border-left:0;-webkit-border-radius:4px;-moz-border-radius:4px;border-radius:4px}.table-bordered th,.table-bordered td{border-left:1px solid #ddd}.table-bordered caption+thead tr:first-child th,.table-bordered caption+tbody tr:first-child th,.table-bordered caption+tbody tr:first-child td,.table-bordered colgroup+thead tr:first-child th,.table-bordered colgroup+tbody tr:first-child th,.table-bordered colgroup+tbody tr:first-child td,.table-bordered thead:first-child tr:first-child th,.table-bordered tbody:first-child tr:first-child th,.table-bordered tbody:first-child tr:first-child td{border-top:0}.table-bordered thead:first-child tr:first-child>th:first-child,.table-bordered tbody:first-child tr:first-child>td:first-child,.table-bordered tbody:first-child tr:first-child>th:first-child{-webkit-border-top-left-radius:4px;border-top-left-radius:4px;-moz-border-radius-topleft:4px}.table-bordered thead:first-child tr:first-child>th:last-child,.table-bordered tbody:first-child tr:first-child>td:last-child,.table-bordered tbody:first-child tr:first-child>th:last-child{-webkit-border-top-right-radius:4px;border-top-right-radius:4px;-moz-border-radius-topright:4px}.table-bordered thead:last-child tr:last-child>th:first-child,.table-bordered tbody:last-child tr:last-child>td:first-child,.table-bordered tbody:last-child tr:last-child>th:first-child,.table-bordered tfoot:last-child tr:last-child>td:first-child,.table-bordered tfoot:last-child tr:last-child>th:first-child{-webkit-border-bottom-left-radius:4px;border-bottom-left-radius:4px;-moz-border-radius-bottomleft:4px}.table-bordered thead:last-child tr:last-child>th:last-child,.table-bordered tbody:last-child tr:last-child>td:last-child,.table-bordered tbody:last-child tr:last-child>th:last-child,.table-bordered tfoot:last-child tr:last-child>td:last-child,.table-bordered tfoot:last-child tr:last-child>th:last-child{-webkit-border-bottom-right-radius:4px;border-bottom-right-radius:4px;-moz-border-radius-bottomright:4px}.table-bordered tfoot+tbody:last-child tr:last-child td:first-child{-webkit-border-bottom-left-radius:0;border-bottom-left-radius:0;-moz-border-radius-bottomleft:0}.table-bordered tfoot+tbody:last-child tr:last-child td:last-child{-webkit-border-bottom-right-radius:0;border-bottom-right-radius:0;-moz-border-radius-bottomright:0}.table-bordered caption+thead tr:first-child th:first-child,.table-bordered caption+tbody tr:first-child td:first-child,.table-bordered colgroup+thead tr:first-child th:first-child,.table-bordered colgroup+tbody tr:first-child td:first-child{-webkit-border-top-left-radius:4px;border-top-left-radius:4px;-moz-border-radius-topleft:4px}.table-bordered caption+thead tr:first-child th:last-child,.table-bordered caption+tbody tr:first-child td:last-child,.table-bordered colgroup+thead tr:first-child th:last-child,.table-bordered colgroup+tbody tr:first-child td:last-child{-webkit-border-top-right-radius:4px;border-top-right-radius:4px;-moz-border-radius-topright:4px}.table-striped tbody>tr:nth-child(odd)>td,.table-striped tbody>tr:nth-child(odd)>th{background-color:#f9f9f9}.table-hover tbody tr:hover>td,.table-hover tbody tr:hover>th{background-color:#f5f5f5}table td[class*=\"span\"],table th[class*=\"span\"],.row-fluid table td[class*=\"span\"],.row-fluid table th[class*=\"span\"]{display:table-cell;float:none;margin-left:0}.table td.span1,.table th.span1{float:none;width:44px;margin-left:0}.table td.span2,.table th.span2{float:none;width:124px;margin-left:0}.table td.span3,.table th.span3{float:none;width:204px;margin-left:0}.table td.span4,.table th.span4{float:none;width:284px;margin-left:0}.table td.span5,.table th.span5{float:none;width:364px;margin-left:0}.table td.span6,.table th.span6{float:none;width:444px;margin-left:0}.table td.span7,.table th.span7{float:none;width:524px;margin-left:0}.table td.span8,.table th.span8{float:none;width:604px;margin-left:0}.table td.span9,.table th.span9{float:none;width:684px;margin-left:0}.table td.span10,.table th.span10{float:none;width:764px;margin-left:0}.table td.span11,.table th.span11{float:none;width:844px;margin-left:0}.table td.span12,.table th.span12{float:none;width:924px;margin-left:0}.table tbody tr.success>td{background-color:#dff0d8}.table tbody tr.error>td{background-color:#f2dede}.table tbody tr.warning>td{background-color:#fcf8e3}.table tbody tr.info>td{background-color:#d9edf7}.table-hover tbody tr.success:hover>td{background-color:#d0e9c6}.table-hover tbody tr.error:hover>td{background-color:#ebcccc}.table-hover tbody tr.warning:hover>td{background-color:#faf2cc}.table-hover tbody tr.info:hover>td{background-color:#c4e3f3}[class^=\"icon-\"],[class*=\" icon-\"]{display:inline-block;width:14px;height:14px;margin-top:1px;*margin-right:.3em;line-height:14px;vertical-align:text-top;background-image:url(\"../img/glyphicons-halflings.png\");background-position:14px 14px;background-repeat:no-repeat}.icon-white,.nav-pills>.active>a>[class^=\"icon-\"],.nav-pills>.active>a>[class*=\" icon-\"],.nav-list>.active>a>[class^=\"icon-\"],.nav-list>.active>a>[class*=\" icon-\"],.navbar-inverse .nav>.active>a>[class^=\"icon-\"],.navbar-inverse .nav>.active>a>[class*=\" icon-\"],.dropdown-menu>li>a:hover>[class^=\"icon-\"],.dropdown-menu>li>a:focus>[class^=\"icon-\"],.dropdown-menu>li>a:hover>[class*=\" icon-\"],.dropdown-menu>li>a:focus>[class*=\" icon-\"],.dropdown-menu>.active>a>[class^=\"icon-\"],.dropdown-menu>.active>a>[class*=\" icon-\"],.dropdown-submenu:hover>a>[class^=\"icon-\"],.dropdown-submenu:focus>a>[class^=\"icon-\"],.dropdown-submenu:hover>a>[class*=\" icon-\"],.dropdown-submenu:focus>a>[class*=\" icon-\"]{background-image:url(\"../img/glyphicons-halflings-white.png\")}.icon-glass{background-position:0 0}.icon-music{background-position:-24px 0}.icon-search{background-position:-48px 0}.icon-envelope{background-position:-72px 0}.icon-heart{background-position:-96px 0}.icon-star{background-position:-120px 0}.icon-star-empty{background-position:-144px 0}.icon-user{background-position:-168px 0}.icon-film{background-position:-192px 0}.icon-th-large{background-position:-216px 0}.icon-th{background-position:-240px 0}.icon-th-list{background-position:-264px 0}.icon-ok{background-position:-288px 0}.icon-remove{background-position:-312px 0}.icon-zoom-in{background-position:-336px 0}.icon-zoom-out{background-position:-360px 0}.icon-off{background-position:-384px 0}.icon-signal{background-position:-408px 0}.icon-cog{background-position:-432px 0}.icon-trash{background-position:-456px 0}.icon-home{background-position:0 -24px}.icon-file{background-position:-24px -24px}.icon-time{background-position:-48px -24px}.icon-road{background-position:-72px -24px}.icon-download-alt{background-position:-96px -24px}.icon-download{background-position:-120px -24px}.icon-upload{background-position:-144px -24px}.icon-inbox{background-position:-168px -24px}.icon-play-circle{background-position:-192px -24px}.icon-repeat{background-position:-216px -24px}.icon-refresh{background-position:-240px -24px}.icon-list-alt{background-position:-264px -24px}.icon-lock{background-position:-287px -24px}.icon-flag{background-position:-312px -24px}.icon-headphones{background-position:-336px -24px}.icon-volume-off{background-position:-360px -24px}.icon-volume-down{background-position:-384px -24px}.icon-volume-up{background-position:-408px -24px}.icon-qrcode{background-position:-432px -24px}.icon-barcode{background-position:-456px -24px}.icon-tag{background-position:0 -48px}.icon-tags{background-position:-25px -48px}.icon-book{background-position:-48px -48px}.icon-bookmark{background-position:-72px -48px}.icon-print{background-position:-96px -48px}.icon-camera{background-position:-120px -48px}.icon-font{background-position:-144px -48px}.icon-bold{background-position:-167px -48px}.icon-italic{background-position:-192px -48px}.icon-text-height{background-position:-216px -48px}.icon-text-width{background-position:-240px -48px}.icon-align-left{background-position:-264px -48px}.icon-align-center{background-position:-288px -48px}.icon-align-right{background-position:-312px -48px}.icon-align-justify{background-position:-336px -48px}.icon-list{background-position:-360px -48px}.icon-indent-left{background-position:-384px -48px}.icon-indent-right{background-position:-408px -48px}.icon-facetime-video{background-position:-432px -48px}.icon-picture{background-position:-456px -48px}.icon-pencil{background-position:0 -72px}.icon-map-marker{background-position:-24px -72px}.icon-adjust{background-position:-48px -72px}.icon-tint{background-position:-72px -72px}.icon-edit{background-position:-96px -72px}.icon-share{background-position:-120px -72px}.icon-check{background-position:-144px -72px}.icon-move{background-position:-168px -72px}.icon-step-backward{background-position:-192px -72px}.icon-fast-backward{background-position:-216px -72px}.icon-backward{background-position:-240px -72px}.icon-play{background-position:-264px -72px}.icon-pause{background-position:-288px -72px}.icon-stop{background-position:-312px -72px}.icon-forward{background-position:-336px -72px}.icon-fast-forward{background-position:-360px -72px}.icon-step-forward{background-position:-384px -72px}.icon-eject{background-position:-408px -72px}.icon-chevron-left{background-position:-432px -72px}.icon-chevron-right{background-position:-456px -72px}.icon-plus-sign{background-position:0 -96px}.icon-minus-sign{background-position:-24px -96px}.icon-remove-sign{background-position:-48px -96px}.icon-ok-sign{background-position:-72px -96px}.icon-question-sign{background-position:-96px -96px}.icon-info-sign{background-position:-120px -96px}.icon-screenshot{background-position:-144px -96px}.icon-remove-circle{background-position:-168px -96px}.icon-ok-circle{background-position:-192px -96px}.icon-ban-circle{background-position:-216px -96px}.icon-arrow-left{background-position:-240px -96px}.icon-arrow-right{background-position:-264px -96px}.icon-arrow-up{background-position:-289px -96px}.icon-arrow-down{background-position:-312px -96px}.icon-share-alt{background-position:-336px -96px}.icon-resize-full{background-position:-360px -96px}.icon-resize-small{background-position:-384px -96px}.icon-plus{background-position:-408px -96px}.icon-minus{background-position:-433px -96px}.icon-asterisk{background-position:-456px -96px}.icon-exclamation-sign{background-position:0 -120px}.icon-gift{background-position:-24px -120px}.icon-leaf{background-position:-48px -120px}.icon-fire{background-position:-72px -120px}.icon-eye-open{background-position:-96px -120px}.icon-eye-close{background-position:-120px -120px}.icon-warning-sign{background-position:-144px -120px}.icon-plane{background-position:-168px -120px}.icon-calendar{background-position:-192px -120px}.icon-random{width:16px;background-position:-216px -120px}.icon-comment{background-position:-240px -120px}.icon-magnet{background-position:-264px -120px}.icon-chevron-up{background-position:-288px -120px}.icon-chevron-down{background-position:-313px -119px}.icon-retweet{background-position:-336px -120px}.icon-shopping-cart{background-position:-360px -120px}.icon-folder-close{width:16px;background-position:-384px -120px}.icon-folder-open{width:16px;background-position:-408px -120px}.icon-resize-vertical{background-position:-432px -119px}.icon-resize-horizontal{background-position:-456px -118px}.icon-hdd{background-position:0 -144px}.icon-bullhorn{background-position:-24px -144px}.icon-bell{background-position:-48px -144px}.icon-certificate{background-position:-72px -144px}.icon-thumbs-up{background-position:-96px -144px}.icon-thumbs-down{background-position:-120px -144px}.icon-hand-right{background-position:-144px -144px}.icon-hand-left{background-position:-168px -144px}.icon-hand-up{background-position:-192px -144px}.icon-hand-down{background-position:-216px -144px}.icon-circle-arrow-right{background-position:-240px -144px}.icon-circle-arrow-left{background-position:-264px -144px}.icon-circle-arrow-up{background-position:-288px -144px}.icon-circle-arrow-down{background-position:-312px -144px}.icon-globe{background-position:-336px -144px}.icon-wrench{background-position:-360px -144px}.icon-tasks{background-position:-384px -144px}.icon-filter{background-position:-408px -144px}.icon-briefcase{background-position:-432px -144px}.icon-fullscreen{background-position:-456px -144px}.dropup,.dropdown{position:relative}.dropdown-toggle{*margin-bottom:-3px}.dropdown-toggle:active,.open .dropdown-toggle{outline:0}.caret{display:inline-block;width:0;height:0;vertical-align:top;border-top:4px solid #000;border-right:4px solid transparent;border-left:4px solid transparent;content:\"\"}.dropdown .caret{margin-top:8px;margin-left:2px}.dropdown-menu{position:absolute;top:100%;left:0;z-index:1000;display:none;float:left;min-width:160px;padding:5px 0;margin:2px 0 0;list-style:none;background-color:#fff;border:1px solid #ccc;border:1px solid rgba(0,0,0,0.2);*border-right-width:2px;*border-bottom-width:2px;-webkit-border-radius:6px;-moz-border-radius:6px;border-radius:6px;-webkit-box-shadow:0 5px 10px rgba(0,0,0,0.2);-moz-box-shadow:0 5px 10px rgba(0,0,0,0.2);box-shadow:0 5px 10px rgba(0,0,0,0.2);-webkit-background-clip:padding-box;-moz-background-clip:padding;background-clip:padding-box}.dropdown-menu.pull-right{right:0;left:auto}.dropdown-menu .divider{*width:100%;height:1px;margin:9px 1px;*margin:-5px 0 5px;overflow:hidden;background-color:#e5e5e5;border-bottom:1px solid #fff}.dropdown-menu>li>a{display:block;padding:3px 20px;clear:both;font-weight:normal;line-height:20px;color:#333;white-space:nowrap}.dropdown-menu>li>a:hover,.dropdown-menu>li>a:focus,.dropdown-submenu:hover>a,.dropdown-submenu:focus>a{color:#fff;text-decoration:none;background-color:#0081c2;background-image:-moz-linear-gradient(top,#08c,#0077b3);background-image:-webkit-gradient(linear,0 0,0 100%,from(#08c),to(#0077b3));background-image:-webkit-linear-gradient(top,#08c,#0077b3);background-image:-o-linear-gradient(top,#08c,#0077b3);background-image:linear-gradient(to bottom,#08c,#0077b3);background-repeat:repeat-x;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#ff0088cc',endColorstr='#ff0077b3',GradientType=0)}.dropdown-menu>.active>a,.dropdown-menu>.active>a:hover,.dropdown-menu>.active>a:focus{color:#fff;text-decoration:none;background-color:#0081c2;background-image:-moz-linear-gradient(top,#08c,#0077b3);background-image:-webkit-gradient(linear,0 0,0 100%,from(#08c),to(#0077b3));background-image:-webkit-linear-gradient(top,#08c,#0077b3);background-image:-o-linear-gradient(top,#08c,#0077b3);background-image:linear-gradient(to bottom,#08c,#0077b3);background-repeat:repeat-x;outline:0;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#ff0088cc',endColorstr='#ff0077b3',GradientType=0)}.dropdown-menu>.disabled>a,.dropdown-menu>.disabled>a:hover,.dropdown-menu>.disabled>a:focus{color:#999}.dropdown-menu>.disabled>a:hover,.dropdown-menu>.disabled>a:focus{text-decoration:none;cursor:default;background-color:transparent;background-image:none;filter:progid:DXImageTransform.Microsoft.gradient(enabled=false)}.open{*z-index:1000}.open>.dropdown-menu{display:block}.pull-right>.dropdown-menu{right:0;left:auto}.dropup .caret,.navbar-fixed-bottom .dropdown .caret{border-top:0;border-bottom:4px solid #000;content:\"\"}.dropup .dropdown-menu,.navbar-fixed-bottom .dropdown .dropdown-menu{top:auto;bottom:100%;margin-bottom:1px}.dropdown-submenu{position:relative}.dropdown-submenu>.dropdown-menu{top:0;left:100%;margin-top:-6px;margin-left:-1px;-webkit-border-radius:0 6px 6px 6px;-moz-border-radius:0 6px 6px 6px;border-radius:0 6px 6px 6px}.dropdown-submenu:hover>.dropdown-menu{display:block}.dropup .dropdown-submenu>.dropdown-menu{top:auto;bottom:0;margin-top:0;margin-bottom:-2px;-webkit-border-radius:5px 5px 5px 0;-moz-border-radius:5px 5px 5px 0;border-radius:5px 5px 5px 0}.dropdown-submenu>a:after{display:block;float:right;width:0;height:0;margin-top:5px;margin-right:-10px;border-color:transparent;border-left-color:#ccc;border-style:solid;border-width:5px 0 5px 5px;content:\" \"}.dropdown-submenu:hover>a:after{border-left-color:#fff}.dropdown-submenu.pull-left{float:none}.dropdown-submenu.pull-left>.dropdown-menu{left:-100%;margin-left:10px;-webkit-border-radius:6px 0 6px 6px;-moz-border-radius:6px 0 6px 6px;border-radius:6px 0 6px 6px}.dropdown .dropdown-menu .nav-header{padding-right:20px;padding-left:20px}.typeahead{z-index:1051;margin-top:2px;-webkit-border-radius:4px;-moz-border-radius:4px;border-radius:4px}.well{min-height:20px;padding:19px;margin-bottom:20px;background-color:#f5f5f5;border:1px solid #e3e3e3;-webkit-border-radius:4px;-moz-border-radius:4px;border-radius:4px;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,0.05);-moz-box-shadow:inset 0 1px 1px rgba(0,0,0,0.05);box-shadow:inset 0 1px 1px rgba(0,0,0,0.05)}.well blockquote{border-color:#ddd;border-color:rgba(0,0,0,0.15)}.well-large{padding:24px;-webkit-border-radius:6px;-moz-border-radius:6px;border-radius:6px}.well-small{padding:9px;-webkit-border-radius:3px;-moz-border-radius:3px;border-radius:3px}.fade{opacity:0;-webkit-transition:opacity .15s linear;-moz-transition:opacity .15s linear;-o-transition:opacity .15s linear;transition:opacity .15s linear}.fade.in{opacity:1}.collapse{position:relative;height:0;overflow:hidden;-webkit-transition:height .35s ease;-moz-transition:height .35s ease;-o-transition:height .35s ease;transition:height .35s ease}.collapse.in{height:auto}.close{float:right;font-size:20px;font-weight:bold;line-height:20px;color:#000;text-shadow:0 1px 0 #fff;opacity:.2;filter:alpha(opacity=20)}.close:hover,.close:focus{color:#000;text-decoration:none;cursor:pointer;opacity:.4;filter:alpha(opacity=40)}button.close{padding:0;cursor:pointer;background:transparent;border:0;-webkit-appearance:none}.btn{display:inline-block;*display:inline;padding:4px 12px;margin-bottom:0;*margin-left:.3em;font-size:14px;line-height:20px;color:#333;text-align:center;text-shadow:0 1px 1px rgba(255,255,255,0.75);vertical-align:middle;cursor:pointer;background-color:#f5f5f5;*background-color:#e6e6e6;background-image:-moz-linear-gradient(top,#fff,#e6e6e6);background-image:-webkit-gradient(linear,0 0,0 100%,from(#fff),to(#e6e6e6));background-image:-webkit-linear-gradient(top,#fff,#e6e6e6);background-image:-o-linear-gradient(top,#fff,#e6e6e6);background-image:linear-gradient(to bottom,#fff,#e6e6e6);background-repeat:repeat-x;border:1px solid #ccc;*border:0;border-color:#e6e6e6 #e6e6e6 #bfbfbf;border-color:rgba(0,0,0,0.1) rgba(0,0,0,0.1) rgba(0,0,0,0.25);border-bottom-color:#b3b3b3;-webkit-border-radius:4px;-moz-border-radius:4px;border-radius:4px;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffffffff',endColorstr='#ffe6e6e6',GradientType=0);filter:progid:DXImageTransform.Microsoft.gradient(enabled=false);*zoom:1;-webkit-box-shadow:inset 0 1px 0 rgba(255,255,255,0.2),0 1px 2px rgba(0,0,0,0.05);-moz-box-shadow:inset 0 1px 0 rgba(255,255,255,0.2),0 1px 2px rgba(0,0,0,0.05);box-shadow:inset 0 1px 0 rgba(255,255,255,0.2),0 1px 2px rgba(0,0,0,0.05)}.btn:hover,.btn:focus,.btn:active,.btn.active,.btn.disabled,.btn[disabled]{color:#333;background-color:#e6e6e6;*background-color:#d9d9d9}.btn:active,.btn.active{background-color:#ccc \\9}.btn:first-child{*margin-left:0}.btn:hover,.btn:focus{color:#333;text-decoration:none;background-position:0 -15px;-webkit-transition:background-position .1s linear;-moz-transition:background-position .1s linear;-o-transition:background-position .1s linear;transition:background-position .1s linear}.btn:focus{outline:thin dotted #333;outline:5px auto -webkit-focus-ring-color;outline-offset:-2px}.btn.active,.btn:active{background-image:none;outline:0;-webkit-box-shadow:inset 0 2px 4px rgba(0,0,0,0.15),0 1px 2px rgba(0,0,0,0.05);-moz-box-shadow:inset 0 2px 4px rgba(0,0,0,0.15),0 1px 2px rgba(0,0,0,0.05);box-shadow:inset 0 2px 4px rgba(0,0,0,0.15),0 1px 2px rgba(0,0,0,0.05)}.btn.disabled,.btn[disabled]{cursor:default;background-image:none;opacity:.65;filter:alpha(opacity=65);-webkit-box-shadow:none;-moz-box-shadow:none;box-shadow:none}.btn-large{padding:11px 19px;font-size:17.5px;-webkit-border-radius:6px;-moz-border-radius:6px;border-radius:6px}.btn-large [class^=\"icon-\"],.btn-large [class*=\" icon-\"]{margin-top:4px}.btn-small{padding:2px 10px;font-size:11.9px;-webkit-border-radius:3px;-moz-border-radius:3px;border-radius:3px}.btn-small [class^=\"icon-\"],.btn-small [class*=\" icon-\"]{margin-top:0}.btn-mini [class^=\"icon-\"],.btn-mini [class*=\" icon-\"]{margin-top:-1px}.btn-mini{padding:0 6px;font-size:10.5px;-webkit-border-radius:3px;-moz-border-radius:3px;border-radius:3px}.btn-block{display:block;width:100%;padding-right:0;padding-left:0;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}.btn-block+.btn-block{margin-top:5px}input[type=\"submit\"].btn-block,input[type=\"reset\"].btn-block,input[type=\"button\"].btn-block{width:100%}.btn-primary.active,.btn-warning.active,.btn-danger.active,.btn-success.active,.btn-info.active,.btn-inverse.active{color:rgba(255,255,255,0.75)}.btn-primary{color:#fff;text-shadow:0 -1px 0 rgba(0,0,0,0.25);background-color:#006dcc;*background-color:#04c;background-image:-moz-linear-gradient(top,#08c,#04c);background-image:-webkit-gradient(linear,0 0,0 100%,from(#08c),to(#04c));background-image:-webkit-linear-gradient(top,#08c,#04c);background-image:-o-linear-gradient(top,#08c,#04c);background-image:linear-gradient(to bottom,#08c,#04c);background-repeat:repeat-x;border-color:#04c #04c #002a80;border-color:rgba(0,0,0,0.1) rgba(0,0,0,0.1) rgba(0,0,0,0.25);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#ff0088cc',endColorstr='#ff0044cc',GradientType=0);filter:progid:DXImageTransform.Microsoft.gradient(enabled=false)}.btn-primary:hover,.btn-primary:focus,.btn-primary:active,.btn-primary.active,.btn-primary.disabled,.btn-primary[disabled]{color:#fff;background-color:#04c;*background-color:#003bb3}.btn-primary:active,.btn-primary.active{background-color:#039 \\9}.btn-warning{color:#fff;text-shadow:0 -1px 0 rgba(0,0,0,0.25);background-color:#faa732;*background-color:#f89406;background-image:-moz-linear-gradient(top,#fbb450,#f89406);background-image:-webkit-gradient(linear,0 0,0 100%,from(#fbb450),to(#f89406));background-image:-webkit-linear-gradient(top,#fbb450,#f89406);background-image:-o-linear-gradient(top,#fbb450,#f89406);background-image:linear-gradient(to bottom,#fbb450,#f89406);background-repeat:repeat-x;border-color:#f89406 #f89406 #ad6704;border-color:rgba(0,0,0,0.1) rgba(0,0,0,0.1) rgba(0,0,0,0.25);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#fffbb450',endColorstr='#fff89406',GradientType=0);filter:progid:DXImageTransform.Microsoft.gradient(enabled=false)}.btn-warning:hover,.btn-warning:focus,.btn-warning:active,.btn-warning.active,.btn-warning.disabled,.btn-warning[disabled]{color:#fff;background-color:#f89406;*background-color:#df8505}.btn-warning:active,.btn-warning.active{background-color:#c67605 \\9}.btn-danger{color:#fff;text-shadow:0 -1px 0 rgba(0,0,0,0.25);background-color:#da4f49;*background-color:#bd362f;background-image:-moz-linear-gradient(top,#ee5f5b,#bd362f);background-image:-webkit-gradient(linear,0 0,0 100%,from(#ee5f5b),to(#bd362f));background-image:-webkit-linear-gradient(top,#ee5f5b,#bd362f);background-image:-o-linear-gradient(top,#ee5f5b,#bd362f);background-image:linear-gradient(to bottom,#ee5f5b,#bd362f);background-repeat:repeat-x;border-color:#bd362f #bd362f #802420;border-color:rgba(0,0,0,0.1) rgba(0,0,0,0.1) rgba(0,0,0,0.25);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffee5f5b',endColorstr='#ffbd362f',GradientType=0);filter:progid:DXImageTransform.Microsoft.gradient(enabled=false)}.btn-danger:hover,.btn-danger:focus,.btn-danger:active,.btn-danger.active,.btn-danger.disabled,.btn-danger[disabled]{color:#fff;background-color:#bd362f;*background-color:#a9302a}.btn-danger:active,.btn-danger.active{background-color:#942a25 \\9}.btn-success{color:#fff;text-shadow:0 -1px 0 rgba(0,0,0,0.25);background-color:#5bb75b;*background-color:#51a351;background-image:-moz-linear-gradient(top,#62c462,#51a351);background-image:-webkit-gradient(linear,0 0,0 100%,from(#62c462),to(#51a351));background-image:-webkit-linear-gradient(top,#62c462,#51a351);background-image:-o-linear-gradient(top,#62c462,#51a351);background-image:linear-gradient(to bottom,#62c462,#51a351);background-repeat:repeat-x;border-color:#51a351 #51a351 #387038;border-color:rgba(0,0,0,0.1) rgba(0,0,0,0.1) rgba(0,0,0,0.25);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#ff62c462',endColorstr='#ff51a351',GradientType=0);filter:progid:DXImageTransform.Microsoft.gradient(enabled=false)}.btn-success:hover,.btn-success:focus,.btn-success:active,.btn-success.active,.btn-success.disabled,.btn-success[disabled]{color:#fff;background-color:#51a351;*background-color:#499249}.btn-success:active,.btn-success.active{background-color:#408140 \\9}.btn-info{color:#fff;text-shadow:0 -1px 0 rgba(0,0,0,0.25);background-color:#49afcd;*background-color:#2f96b4;background-image:-moz-linear-gradient(top,#5bc0de,#2f96b4);background-image:-webkit-gradient(linear,0 0,0 100%,from(#5bc0de),to(#2f96b4));background-image:-webkit-linear-gradient(top,#5bc0de,#2f96b4);background-image:-o-linear-gradient(top,#5bc0de,#2f96b4);background-image:linear-gradient(to bottom,#5bc0de,#2f96b4);background-repeat:repeat-x;border-color:#2f96b4 #2f96b4 #1f6377;border-color:rgba(0,0,0,0.1) rgba(0,0,0,0.1) rgba(0,0,0,0.25);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#ff5bc0de',endColorstr='#ff2f96b4',GradientType=0);filter:progid:DXImageTransform.Microsoft.gradient(enabled=false)}.btn-info:hover,.btn-info:focus,.btn-info:active,.btn-info.active,.btn-info.disabled,.btn-info[disabled]{color:#fff;background-color:#2f96b4;*background-color:#2a85a0}.btn-info:active,.btn-info.active{background-color:#24748c \\9}.btn-inverse{color:#fff;text-shadow:0 -1px 0 rgba(0,0,0,0.25);background-color:#363636;*background-color:#222;background-image:-moz-linear-gradient(top,#444,#222);background-image:-webkit-gradient(linear,0 0,0 100%,from(#444),to(#222));background-image:-webkit-linear-gradient(top,#444,#222);background-image:-o-linear-gradient(top,#444,#222);background-image:linear-gradient(to bottom,#444,#222);background-repeat:repeat-x;border-color:#222 #222 #000;border-color:rgba(0,0,0,0.1) rgba(0,0,0,0.1) rgba(0,0,0,0.25);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#ff444444',endColorstr='#ff222222',GradientType=0);filter:progid:DXImageTransform.Microsoft.gradient(enabled=false)}.btn-inverse:hover,.btn-inverse:focus,.btn-inverse:active,.btn-inverse.active,.btn-inverse.disabled,.btn-inverse[disabled]{color:#fff;background-color:#222;*background-color:#151515}.btn-inverse:active,.btn-inverse.active{background-color:#080808 \\9}button.btn,input[type=\"submit\"].btn{*padding-top:3px;*padding-bottom:3px}button.btn::-moz-focus-inner,input[type=\"submit\"].btn::-moz-focus-inner{padding:0;border:0}button.btn.btn-large,input[type=\"submit\"].btn.btn-large{*padding-top:7px;*padding-bottom:7px}button.btn.btn-small,input[type=\"submit\"].btn.btn-small{*padding-top:3px;*padding-bottom:3px}button.btn.btn-mini,input[type=\"submit\"].btn.btn-mini{*padding-top:1px;*padding-bottom:1px}.btn-link,.btn-link:active,.btn-link[disabled]{background-color:transparent;background-image:none;-webkit-box-shadow:none;-moz-box-shadow:none;box-shadow:none}.btn-link{color:#08c;cursor:pointer;border-color:transparent;-webkit-border-radius:0;-moz-border-radius:0;border-radius:0}.btn-link:hover,.btn-link:focus{color:#005580;text-decoration:underline;background-color:transparent}.btn-link[disabled]:hover,.btn-link[disabled]:focus{color:#333;text-decoration:none}.btn-group{position:relative;display:inline-block;*display:inline;*margin-left:.3em;font-size:0;white-space:nowrap;vertical-align:middle;*zoom:1}.btn-group:first-child{*margin-left:0}.btn-group+.btn-group{margin-left:5px}.btn-toolbar{margin-top:10px;margin-bottom:10px;font-size:0}.btn-toolbar>.btn+.btn,.btn-toolbar>.btn-group+.btn,.btn-toolbar>.btn+.btn-group{margin-left:5px}.btn-group>.btn{position:relative;-webkit-border-radius:0;-moz-border-radius:0;border-radius:0}.btn-group>.btn+.btn{margin-left:-1px}.btn-group>.btn,.btn-group>.dropdown-menu,.btn-group>.popover{font-size:14px}.btn-group>.btn-mini{font-size:10.5px}.btn-group>.btn-small{font-size:11.9px}.btn-group>.btn-large{font-size:17.5px}.btn-group>.btn:first-child{margin-left:0;-webkit-border-bottom-left-radius:4px;border-bottom-left-radius:4px;-webkit-border-top-left-radius:4px;border-top-left-radius:4px;-moz-border-radius-bottomleft:4px;-moz-border-radius-topleft:4px}.btn-group>.btn:last-child,.btn-group>.dropdown-toggle{-webkit-border-top-right-radius:4px;border-top-right-radius:4px;-webkit-border-bottom-right-radius:4px;border-bottom-right-radius:4px;-moz-border-radius-topright:4px;-moz-border-radius-bottomright:4px}.btn-group>.btn.large:first-child{margin-left:0;-webkit-border-bottom-left-radius:6px;border-bottom-left-radius:6px;-webkit-border-top-left-radius:6px;border-top-left-radius:6px;-moz-border-radius-bottomleft:6px;-moz-border-radius-topleft:6px}.btn-group>.btn.large:last-child,.btn-group>.large.dropdown-toggle{-webkit-border-top-right-radius:6px;border-top-right-radius:6px;-webkit-border-bottom-right-radius:6px;border-bottom-right-radius:6px;-moz-border-radius-topright:6px;-moz-border-radius-bottomright:6px}.btn-group>.btn:hover,.btn-group>.btn:focus,.btn-group>.btn:active,.btn-group>.btn.active{z-index:2}.btn-group .dropdown-toggle:active,.btn-group.open .dropdown-toggle{outline:0}.btn-group>.btn+.dropdown-toggle{*padding-top:5px;padding-right:8px;*padding-bottom:5px;padding-left:8px;-webkit-box-shadow:inset 1px 0 0 rgba(255,255,255,0.125),inset 0 1px 0 rgba(255,255,255,0.2),0 1px 2px rgba(0,0,0,0.05);-moz-box-shadow:inset 1px 0 0 rgba(255,255,255,0.125),inset 0 1px 0 rgba(255,255,255,0.2),0 1px 2px rgba(0,0,0,0.05);box-shadow:inset 1px 0 0 rgba(255,255,255,0.125),inset 0 1px 0 rgba(255,255,255,0.2),0 1px 2px rgba(0,0,0,0.05)}.btn-group>.btn-mini+.dropdown-toggle{*padding-top:2px;padding-right:5px;*padding-bottom:2px;padding-left:5px}.btn-group>.btn-small+.dropdown-toggle{*padding-top:5px;*padding-bottom:4px}.btn-group>.btn-large+.dropdown-toggle{*padding-top:7px;padding-right:12px;*padding-bottom:7px;padding-left:12px}.btn-group.open .dropdown-toggle{background-image:none;-webkit-box-shadow:inset 0 2px 4px rgba(0,0,0,0.15),0 1px 2px rgba(0,0,0,0.05);-moz-box-shadow:inset 0 2px 4px rgba(0,0,0,0.15),0 1px 2px rgba(0,0,0,0.05);box-shadow:inset 0 2px 4px rgba(0,0,0,0.15),0 1px 2px rgba(0,0,0,0.05)}.btn-group.open .btn.dropdown-toggle{background-color:#e6e6e6}.btn-group.open .btn-primary.dropdown-toggle{background-color:#04c}.btn-group.open .btn-warning.dropdown-toggle{background-color:#f89406}.btn-group.open .btn-danger.dropdown-toggle{background-color:#bd362f}.btn-group.open .btn-success.dropdown-toggle{background-color:#51a351}.btn-group.open .btn-info.dropdown-toggle{background-color:#2f96b4}.btn-group.open .btn-inverse.dropdown-toggle{background-color:#222}.btn .caret{margin-top:8px;margin-left:0}.btn-large .caret{margin-top:6px}.btn-large .caret{border-top-width:5px;border-right-width:5px;border-left-width:5px}.btn-mini .caret,.btn-small .caret{margin-top:8px}.dropup .btn-large .caret{border-bottom-width:5px}.btn-primary .caret,.btn-warning .caret,.btn-danger .caret,.btn-info .caret,.btn-success .caret,.btn-inverse .caret{border-top-color:#fff;border-bottom-color:#fff}.btn-group-vertical{display:inline-block;*display:inline;*zoom:1}.btn-group-vertical>.btn{display:block;float:none;max-width:100%;-webkit-border-radius:0;-moz-border-radius:0;border-radius:0}.btn-group-vertical>.btn+.btn{margin-top:-1px;margin-left:0}.btn-group-vertical>.btn:first-child{-webkit-border-radius:4px 4px 0 0;-moz-border-radius:4px 4px 0 0;border-radius:4px 4px 0 0}.btn-group-vertical>.btn:last-child{-webkit-border-radius:0 0 4px 4px;-moz-border-radius:0 0 4px 4px;border-radius:0 0 4px 4px}.btn-group-vertical>.btn-large:first-child{-webkit-border-radius:6px 6px 0 0;-moz-border-radius:6px 6px 0 0;border-radius:6px 6px 0 0}.btn-group-vertical>.btn-large:last-child{-webkit-border-radius:0 0 6px 6px;-moz-border-radius:0 0 6px 6px;border-radius:0 0 6px 6px}.alert{padding:8px 35px 8px 14px;margin-bottom:20px;text-shadow:0 1px 0 rgba(255,255,255,0.5);background-color:#fcf8e3;border:1px solid #fbeed5;-webkit-border-radius:4px;-moz-border-radius:4px;border-radius:4px}.alert,.alert h4{color:#c09853}.alert h4{margin:0}.alert .close{position:relative;top:-2px;right:-21px;line-height:20px}.alert-success{color:#468847;background-color:#dff0d8;border-color:#d6e9c6}.alert-success h4{color:#468847}.alert-danger,.alert-error{color:#b94a48;background-color:#f2dede;border-color:#eed3d7}.alert-danger h4,.alert-error h4{color:#b94a48}.alert-info{color:#3a87ad;background-color:#d9edf7;border-color:#bce8f1}.alert-info h4{color:#3a87ad}.alert-block{padding-top:14px;padding-bottom:14px}.alert-block>p,.alert-block>ul{margin-bottom:0}.alert-block p+p{margin-top:5px}.nav{margin-bottom:20px;margin-left:0;list-style:none}.nav>li>a{display:block}.nav>li>a:hover,.nav>li>a:focus{text-decoration:none;background-color:#eee}.nav>li>a>img{max-width:none}.nav>.pull-right{float:right}.nav-header{display:block;padding:3px 15px;font-size:11px;font-weight:bold;line-height:20px;color:#999;text-shadow:0 1px 0 rgba(255,255,255,0.5);text-transform:uppercase}.nav li+.nav-header{margin-top:9px}.nav-list{padding-right:15px;padding-left:15px;margin-bottom:0}.nav-list>li>a,.nav-list .nav-header{margin-right:-15px;margin-left:-15px;text-shadow:0 1px 0 rgba(255,255,255,0.5)}.nav-list>li>a{padding:3px 15px}.nav-list>.active>a,.nav-list>.active>a:hover,.nav-list>.active>a:focus{color:#fff;text-shadow:0 -1px 0 rgba(0,0,0,0.2);background-color:#08c}.nav-list [class^=\"icon-\"],.nav-list [class*=\" icon-\"]{margin-right:2px}.nav-list .divider{*width:100%;height:1px;margin:9px 1px;*margin:-5px 0 5px;overflow:hidden;background-color:#e5e5e5;border-bottom:1px solid #fff}.nav-tabs,.nav-pills{*zoom:1}.nav-tabs:before,.nav-pills:before,.nav-tabs:after,.nav-pills:after{display:table;line-height:0;content:\"\"}.nav-tabs:after,.nav-pills:after{clear:both}.nav-tabs>li,.nav-pills>li{float:left}.nav-tabs>li>a,.nav-pills>li>a{padding-right:12px;padding-left:12px;margin-right:2px;line-height:14px}.nav-tabs{border-bottom:1px solid #ddd}.nav-tabs>li{margin-bottom:-1px}.nav-tabs>li>a{padding-top:8px;padding-bottom:8px;line-height:20px;border:1px solid transparent;-webkit-border-radius:4px 4px 0 0;-moz-border-radius:4px 4px 0 0;border-radius:4px 4px 0 0}.nav-tabs>li>a:hover,.nav-tabs>li>a:focus{border-color:#eee #eee #ddd}.nav-tabs>.active>a,.nav-tabs>.active>a:hover,.nav-tabs>.active>a:focus{color:#555;cursor:default;background-color:#fff;border:1px solid #ddd;border-bottom-color:transparent}.nav-pills>li>a{padding-top:8px;padding-bottom:8px;margin-top:2px;margin-bottom:2px;-webkit-border-radius:5px;-moz-border-radius:5px;border-radius:5px}.nav-pills>.active>a,.nav-pills>.active>a:hover,.nav-pills>.active>a:focus{color:#fff;background-color:#08c}.nav-stacked>li{float:none}.nav-stacked>li>a{margin-right:0}.nav-tabs.nav-stacked{border-bottom:0}.nav-tabs.nav-stacked>li>a{border:1px solid #ddd;-webkit-border-radius:0;-moz-border-radius:0;border-radius:0}.nav-tabs.nav-stacked>li:first-child>a{-webkit-border-top-right-radius:4px;border-top-right-radius:4px;-webkit-border-top-left-radius:4px;border-top-left-radius:4px;-moz-border-radius-topright:4px;-moz-border-radius-topleft:4px}.nav-tabs.nav-stacked>li:last-child>a{-webkit-border-bottom-right-radius:4px;border-bottom-right-radius:4px;-webkit-border-bottom-left-radius:4px;border-bottom-left-radius:4px;-moz-border-radius-bottomright:4px;-moz-border-radius-bottomleft:4px}.nav-tabs.nav-stacked>li>a:hover,.nav-tabs.nav-stacked>li>a:focus{z-index:2;border-color:#ddd}.nav-pills.nav-stacked>li>a{margin-bottom:3px}.nav-pills.nav-stacked>li:last-child>a{margin-bottom:1px}.nav-tabs .dropdown-menu{-webkit-border-radius:0 0 6px 6px;-moz-border-radius:0 0 6px 6px;border-radius:0 0 6px 6px}.nav-pills .dropdown-menu{-webkit-border-radius:6px;-moz-border-radius:6px;border-radius:6px}.nav .dropdown-toggle .caret{margin-top:6px;border-top-color:#08c;border-bottom-color:#08c}.nav .dropdown-toggle:hover .caret,.nav .dropdown-toggle:focus .caret{border-top-color:#005580;border-bottom-color:#005580}.nav-tabs .dropdown-toggle .caret{margin-top:8px}.nav .active .dropdown-toggle .caret{border-top-color:#fff;border-bottom-color:#fff}.nav-tabs .active .dropdown-toggle .caret{border-top-color:#555;border-bottom-color:#555}.nav>.dropdown.active>a:hover,.nav>.dropdown.active>a:focus{cursor:pointer}.nav-tabs .open .dropdown-toggle,.nav-pills .open .dropdown-toggle,.nav>li.dropdown.open.active>a:hover,.nav>li.dropdown.open.active>a:focus{color:#fff;background-color:#999;border-color:#999}.nav li.dropdown.open .caret,.nav li.dropdown.open.active .caret,.nav li.dropdown.open a:hover .caret,.nav li.dropdown.open a:focus .caret{border-top-color:#fff;border-bottom-color:#fff;opacity:1;filter:alpha(opacity=100)}.tabs-stacked .open>a:hover,.tabs-stacked .open>a:focus{border-color:#999}.tabbable{*zoom:1}.tabbable:before,.tabbable:after{display:table;line-height:0;content:\"\"}.tabbable:after{clear:both}.tab-content{overflow:auto}.tabs-below>.nav-tabs,.tabs-right>.nav-tabs,.tabs-left>.nav-tabs{border-bottom:0}.tab-content>.tab-pane,.pill-content>.pill-pane{display:none}.tab-content>.active,.pill-content>.active{display:block}.tabs-below>.nav-tabs{border-top:1px solid #ddd}.tabs-below>.nav-tabs>li{margin-top:-1px;margin-bottom:0}.tabs-below>.nav-tabs>li>a{-webkit-border-radius:0 0 4px 4px;-moz-border-radius:0 0 4px 4px;border-radius:0 0 4px 4px}.tabs-below>.nav-tabs>li>a:hover,.tabs-below>.nav-tabs>li>a:focus{border-top-color:#ddd;border-bottom-color:transparent}.tabs-below>.nav-tabs>.active>a,.tabs-below>.nav-tabs>.active>a:hover,.tabs-below>.nav-tabs>.active>a:focus{border-color:transparent #ddd #ddd #ddd}.tabs-left>.nav-tabs>li,.tabs-right>.nav-tabs>li{float:none}.tabs-left>.nav-tabs>li>a,.tabs-right>.nav-tabs>li>a{min-width:74px;margin-right:0;margin-bottom:3px}.tabs-left>.nav-tabs{float:left;margin-right:19px;border-right:1px solid #ddd}.tabs-left>.nav-tabs>li>a{margin-right:-1px;-webkit-border-radius:4px 0 0 4px;-moz-border-radius:4px 0 0 4px;border-radius:4px 0 0 4px}.tabs-left>.nav-tabs>li>a:hover,.tabs-left>.nav-tabs>li>a:focus{border-color:#eee #ddd #eee #eee}.tabs-left>.nav-tabs .active>a,.tabs-left>.nav-tabs .active>a:hover,.tabs-left>.nav-tabs .active>a:focus{border-color:#ddd transparent #ddd #ddd;*border-right-color:#fff}.tabs-right>.nav-tabs{float:right;margin-left:19px;border-left:1px solid #ddd}.tabs-right>.nav-tabs>li>a{margin-left:-1px;-webkit-border-radius:0 4px 4px 0;-moz-border-radius:0 4px 4px 0;border-radius:0 4px 4px 0}.tabs-right>.nav-tabs>li>a:hover,.tabs-right>.nav-tabs>li>a:focus{border-color:#eee #eee #eee #ddd}.tabs-right>.nav-tabs .active>a,.tabs-right>.nav-tabs .active>a:hover,.tabs-right>.nav-tabs .active>a:focus{border-color:#ddd #ddd #ddd transparent;*border-left-color:#fff}.nav>.disabled>a{color:#999}.nav>.disabled>a:hover,.nav>.disabled>a:focus{text-decoration:none;cursor:default;background-color:transparent}.navbar{*position:relative;*z-index:2;margin-bottom:20px;overflow:visible}.navbar-inner{min-height:40px;padding-right:20px;padding-left:20px;background-color:#fafafa;background-image:-moz-linear-gradient(top,#fff,#f2f2f2);background-image:-webkit-gradient(linear,0 0,0 100%,from(#fff),to(#f2f2f2));background-image:-webkit-linear-gradient(top,#fff,#f2f2f2);background-image:-o-linear-gradient(top,#fff,#f2f2f2);background-image:linear-gradient(to bottom,#fff,#f2f2f2);background-repeat:repeat-x;border:1px solid #d4d4d4;-webkit-border-radius:4px;-moz-border-radius:4px;border-radius:4px;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffffffff',endColorstr='#fff2f2f2',GradientType=0);*zoom:1;-webkit-box-shadow:0 1px 4px rgba(0,0,0,0.065);-moz-box-shadow:0 1px 4px rgba(0,0,0,0.065);box-shadow:0 1px 4px rgba(0,0,0,0.065)}.navbar-inner:before,.navbar-inner:after{display:table;line-height:0;content:\"\"}.navbar-inner:after{clear:both}.navbar .container{width:auto}.nav-collapse.collapse{height:auto;overflow:visible}.navbar .brand{display:block;float:left;padding:10px 20px 10px;margin-left:-20px;font-size:20px;font-weight:200;color:#777;text-shadow:0 1px 0 #fff}.navbar .brand:hover,.navbar .brand:focus{text-decoration:none}.navbar-text{margin-bottom:0;line-height:40px;color:#777}.navbar-link{color:#777}.navbar-link:hover,.navbar-link:focus{color:#333}.navbar .divider-vertical{height:40px;margin:0 9px;border-right:1px solid #fff;border-left:1px solid #f2f2f2}.navbar .btn,.navbar .btn-group{margin-top:5px}.navbar .btn-group .btn,.navbar .input-prepend .btn,.navbar .input-append .btn,.navbar .input-prepend .btn-group,.navbar .input-append .btn-group{margin-top:0}.navbar-form{margin-bottom:0;*zoom:1}.navbar-form:before,.navbar-form:after{display:table;line-height:0;content:\"\"}.navbar-form:after{clear:both}.navbar-form input,.navbar-form select,.navbar-form .radio,.navbar-form .checkbox{margin-top:5px}.navbar-form input,.navbar-form select,.navbar-form .btn{display:inline-block;margin-bottom:0}.navbar-form input[type=\"image\"],.navbar-form input[type=\"checkbox\"],.navbar-form input[type=\"radio\"]{margin-top:3px}.navbar-form .input-append,.navbar-form .input-prepend{margin-top:5px;white-space:nowrap}.navbar-form .input-append input,.navbar-form .input-prepend input{margin-top:0}.navbar-search{position:relative;float:left;margin-top:5px;margin-bottom:0}.navbar-search .search-query{padding:4px 14px;margin-bottom:0;font-family:\"Helvetica Neue\",Helvetica,Arial,sans-serif;font-size:13px;font-weight:normal;line-height:1;-webkit-border-radius:15px;-moz-border-radius:15px;border-radius:15px}.navbar-static-top{position:static;margin-bottom:0}.navbar-static-top .navbar-inner{-webkit-border-radius:0;-moz-border-radius:0;border-radius:0}.navbar-fixed-top,.navbar-fixed-bottom{position:fixed;right:0;left:0;z-index:1030;margin-bottom:0}.navbar-fixed-top .navbar-inner,.navbar-static-top .navbar-inner{border-width:0 0 1px}.navbar-fixed-bottom .navbar-inner{border-width:1px 0 0}.navbar-fixed-top .navbar-inner,.navbar-fixed-bottom .navbar-inner{padding-right:0;padding-left:0;-webkit-border-radius:0;-moz-border-radius:0;border-radius:0}.navbar-static-top .container,.navbar-fixed-top .container,.navbar-fixed-bottom .container{width:940px}.navbar-fixed-top{top:0}.navbar-fixed-top .navbar-inner,.navbar-static-top .navbar-inner{-webkit-box-shadow:0 1px 10px rgba(0,0,0,0.1);-moz-box-shadow:0 1px 10px rgba(0,0,0,0.1);box-shadow:0 1px 10px rgba(0,0,0,0.1)}.navbar-fixed-bottom{bottom:0}.navbar-fixed-bottom .navbar-inner{-webkit-box-shadow:0 -1px 10px rgba(0,0,0,0.1);-moz-box-shadow:0 -1px 10px rgba(0,0,0,0.1);box-shadow:0 -1px 10px rgba(0,0,0,0.1)}.navbar .nav{position:relative;left:0;display:block;float:left;margin:0 10px 0 0}.navbar .nav.pull-right{float:right;margin-right:0}.navbar .nav>li{float:left}.navbar .nav>li>a{float:none;padding:10px 15px 10px;color:#777;text-decoration:none;text-shadow:0 1px 0 #fff}.navbar .nav .dropdown-toggle .caret{margin-top:8px}.navbar .nav>li>a:focus,.navbar .nav>li>a:hover{color:#333;text-decoration:none;background-color:transparent}.navbar .nav>.active>a,.navbar .nav>.active>a:hover,.navbar .nav>.active>a:focus{color:#555;text-decoration:none;background-color:#e5e5e5;-webkit-box-shadow:inset 0 3px 8px rgba(0,0,0,0.125);-moz-box-shadow:inset 0 3px 8px rgba(0,0,0,0.125);box-shadow:inset 0 3px 8px rgba(0,0,0,0.125)}.navbar .btn-navbar{display:none;float:right;padding:7px 10px;margin-right:5px;margin-left:5px;color:#fff;text-shadow:0 -1px 0 rgba(0,0,0,0.25);background-color:#ededed;*background-color:#e5e5e5;background-image:-moz-linear-gradient(top,#f2f2f2,#e5e5e5);background-image:-webkit-gradient(linear,0 0,0 100%,from(#f2f2f2),to(#e5e5e5));background-image:-webkit-linear-gradient(top,#f2f2f2,#e5e5e5);background-image:-o-linear-gradient(top,#f2f2f2,#e5e5e5);background-image:linear-gradient(to bottom,#f2f2f2,#e5e5e5);background-repeat:repeat-x;border-color:#e5e5e5 #e5e5e5 #bfbfbf;border-color:rgba(0,0,0,0.1) rgba(0,0,0,0.1) rgba(0,0,0,0.25);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#fff2f2f2',endColorstr='#ffe5e5e5',GradientType=0);filter:progid:DXImageTransform.Microsoft.gradient(enabled=false);-webkit-box-shadow:inset 0 1px 0 rgba(255,255,255,0.1),0 1px 0 rgba(255,255,255,0.075);-moz-box-shadow:inset 0 1px 0 rgba(255,255,255,0.1),0 1px 0 rgba(255,255,255,0.075);box-shadow:inset 0 1px 0 rgba(255,255,255,0.1),0 1px 0 rgba(255,255,255,0.075)}.navbar .btn-navbar:hover,.navbar .btn-navbar:focus,.navbar .btn-navbar:active,.navbar .btn-navbar.active,.navbar .btn-navbar.disabled,.navbar .btn-navbar[disabled]{color:#fff;background-color:#e5e5e5;*background-color:#d9d9d9}.navbar .btn-navbar:active,.navbar .btn-navbar.active{background-color:#ccc \\9}.navbar .btn-navbar .icon-bar{display:block;width:18px;height:2px;background-color:#f5f5f5;-webkit-border-radius:1px;-moz-border-radius:1px;border-radius:1px;-webkit-box-shadow:0 1px 0 rgba(0,0,0,0.25);-moz-box-shadow:0 1px 0 rgba(0,0,0,0.25);box-shadow:0 1px 0 rgba(0,0,0,0.25)}.btn-navbar .icon-bar+.icon-bar{margin-top:3px}.navbar .nav>li>.dropdown-menu:before{position:absolute;top:-7px;left:9px;display:inline-block;border-right:7px solid transparent;border-bottom:7px solid #ccc;border-left:7px solid transparent;border-bottom-color:rgba(0,0,0,0.2);content:''}.navbar .nav>li>.dropdown-menu:after{position:absolute;top:-6px;left:10px;display:inline-block;border-right:6px solid transparent;border-bottom:6px solid #fff;border-left:6px solid transparent;content:''}.navbar-fixed-bottom .nav>li>.dropdown-menu:before{top:auto;bottom:-7px;border-top:7px solid #ccc;border-bottom:0;border-top-color:rgba(0,0,0,0.2)}.navbar-fixed-bottom .nav>li>.dropdown-menu:after{top:auto;bottom:-6px;border-top:6px solid #fff;border-bottom:0}.navbar .nav li.dropdown>a:hover .caret,.navbar .nav li.dropdown>a:focus .caret{border-top-color:#333;border-bottom-color:#333}.navbar .nav li.dropdown.open>.dropdown-toggle,.navbar .nav li.dropdown.active>.dropdown-toggle,.navbar .nav li.dropdown.open.active>.dropdown-toggle{color:#555;background-color:#e5e5e5}.navbar .nav li.dropdown>.dropdown-toggle .caret{border-top-color:#777;border-bottom-color:#777}.navbar .nav li.dropdown.open>.dropdown-toggle .caret,.navbar .nav li.dropdown.active>.dropdown-toggle .caret,.navbar .nav li.dropdown.open.active>.dropdown-toggle .caret{border-top-color:#555;border-bottom-color:#555}.navbar .pull-right>li>.dropdown-menu,.navbar .nav>li>.dropdown-menu.pull-right{right:0;left:auto}.navbar .pull-right>li>.dropdown-menu:before,.navbar .nav>li>.dropdown-menu.pull-right:before{right:12px;left:auto}.navbar .pull-right>li>.dropdown-menu:after,.navbar .nav>li>.dropdown-menu.pull-right:after{right:13px;left:auto}.navbar .pull-right>li>.dropdown-menu .dropdown-menu,.navbar .nav>li>.dropdown-menu.pull-right .dropdown-menu{right:100%;left:auto;margin-right:-1px;margin-left:0;-webkit-border-radius:6px 0 6px 6px;-moz-border-radius:6px 0 6px 6px;border-radius:6px 0 6px 6px}.navbar-inverse .navbar-inner{background-color:#1b1b1b;background-image:-moz-linear-gradient(top,#222,#111);background-image:-webkit-gradient(linear,0 0,0 100%,from(#222),to(#111));background-image:-webkit-linear-gradient(top,#222,#111);background-image:-o-linear-gradient(top,#222,#111);background-image:linear-gradient(to bottom,#222,#111);background-repeat:repeat-x;border-color:#252525;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#ff222222',endColorstr='#ff111111',GradientType=0)}.navbar-inverse .brand,.navbar-inverse .nav>li>a{color:#999;text-shadow:0 -1px 0 rgba(0,0,0,0.25)}.navbar-inverse .brand:hover,.navbar-inverse .nav>li>a:hover,.navbar-inverse .brand:focus,.navbar-inverse .nav>li>a:focus{color:#fff}.navbar-inverse .brand{color:#999}.navbar-inverse .navbar-text{color:#999}.navbar-inverse .nav>li>a:focus,.navbar-inverse .nav>li>a:hover{color:#fff;background-color:transparent}.navbar-inverse .nav .active>a,.navbar-inverse .nav .active>a:hover,.navbar-inverse .nav .active>a:focus{color:#fff;background-color:#111}.navbar-inverse .navbar-link{color:#999}.navbar-inverse .navbar-link:hover,.navbar-inverse .navbar-link:focus{color:#fff}.navbar-inverse .divider-vertical{border-right-color:#222;border-left-color:#111}.navbar-inverse .nav li.dropdown.open>.dropdown-toggle,.navbar-inverse .nav li.dropdown.active>.dropdown-toggle,.navbar-inverse .nav li.dropdown.open.active>.dropdown-toggle{color:#fff;background-color:#111}.navbar-inverse .nav li.dropdown>a:hover .caret,.navbar-inverse .nav li.dropdown>a:focus .caret{border-top-color:#fff;border-bottom-color:#fff}.navbar-inverse .nav li.dropdown>.dropdown-toggle .caret{border-top-color:#999;border-bottom-color:#999}.navbar-inverse .nav li.dropdown.open>.dropdown-toggle .caret,.navbar-inverse .nav li.dropdown.active>.dropdown-toggle .caret,.navbar-inverse .nav li.dropdown.open.active>.dropdown-toggle .caret{border-top-color:#fff;border-bottom-color:#fff}.navbar-inverse .navbar-search .search-query{color:#fff;background-color:#515151;border-color:#111;-webkit-box-shadow:inset 0 1px 2px rgba(0,0,0,0.1),0 1px 0 rgba(255,255,255,0.15);-moz-box-shadow:inset 0 1px 2px rgba(0,0,0,0.1),0 1px 0 rgba(255,255,255,0.15);box-shadow:inset 0 1px 2px rgba(0,0,0,0.1),0 1px 0 rgba(255,255,255,0.15);-webkit-transition:none;-moz-transition:none;-o-transition:none;transition:none}.navbar-inverse .navbar-search .search-query:-moz-placeholder{color:#ccc}.navbar-inverse .navbar-search .search-query:-ms-input-placeholder{color:#ccc}.navbar-inverse .navbar-search .search-query::-webkit-input-placeholder{color:#ccc}.navbar-inverse .navbar-search .search-query:focus,.navbar-inverse .navbar-search .search-query.focused{padding:5px 15px;color:#333;text-shadow:0 1px 0 #fff;background-color:#fff;border:0;outline:0;-webkit-box-shadow:0 0 3px rgba(0,0,0,0.15);-moz-box-shadow:0 0 3px rgba(0,0,0,0.15);box-shadow:0 0 3px rgba(0,0,0,0.15)}.navbar-inverse .btn-navbar{color:#fff;text-shadow:0 -1px 0 rgba(0,0,0,0.25);background-color:#0e0e0e;*background-color:#040404;background-image:-moz-linear-gradient(top,#151515,#040404);background-image:-webkit-gradient(linear,0 0,0 100%,from(#151515),to(#040404));background-image:-webkit-linear-gradient(top,#151515,#040404);background-image:-o-linear-gradient(top,#151515,#040404);background-image:linear-gradient(to bottom,#151515,#040404);background-repeat:repeat-x;border-color:#040404 #040404 #000;border-color:rgba(0,0,0,0.1) rgba(0,0,0,0.1) rgba(0,0,0,0.25);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#ff151515',endColorstr='#ff040404',GradientType=0);filter:progid:DXImageTransform.Microsoft.gradient(enabled=false)}.navbar-inverse .btn-navbar:hover,.navbar-inverse .btn-navbar:focus,.navbar-inverse .btn-navbar:active,.navbar-inverse .btn-navbar.active,.navbar-inverse .btn-navbar.disabled,.navbar-inverse .btn-navbar[disabled]{color:#fff;background-color:#040404;*background-color:#000}.navbar-inverse .btn-navbar:active,.navbar-inverse .btn-navbar.active{background-color:#000 \\9}.breadcrumb{padding:8px 15px;margin:0 0 20px;list-style:none;background-color:#f5f5f5;-webkit-border-radius:4px;-moz-border-radius:4px;border-radius:4px}.breadcrumb>li{display:inline-block;*display:inline;text-shadow:0 1px 0 #fff;*zoom:1}.breadcrumb>li>.divider{padding:0 5px;color:#ccc}.breadcrumb>.active{color:#999}.pagination{margin:20px 0}.pagination ul{display:inline-block;*display:inline;margin-bottom:0;margin-left:0;-webkit-border-radius:4px;-moz-border-radius:4px;border-radius:4px;*zoom:1;-webkit-box-shadow:0 1px 2px rgba(0,0,0,0.05);-moz-box-shadow:0 1px 2px rgba(0,0,0,0.05);box-shadow:0 1px 2px rgba(0,0,0,0.05)}.pagination ul>li{display:inline}.pagination ul>li>a,.pagination ul>li>span{float:left;padding:4px 12px;line-height:20px;text-decoration:none;background-color:#fff;border:1px solid #ddd;border-left-width:0}.pagination ul>li>a:hover,.pagination ul>li>a:focus,.pagination ul>.active>a,.pagination ul>.active>span{background-color:#f5f5f5}.pagination ul>.active>a,.pagination ul>.active>span{color:#999;cursor:default}.pagination ul>.disabled>span,.pagination ul>.disabled>a,.pagination ul>.disabled>a:hover,.pagination ul>.disabled>a:focus{color:#999;cursor:default;background-color:transparent}.pagination ul>li:first-child>a,.pagination ul>li:first-child>span{border-left-width:1px;-webkit-border-bottom-left-radius:4px;border-bottom-left-radius:4px;-webkit-border-top-left-radius:4px;border-top-left-radius:4px;-moz-border-radius-bottomleft:4px;-moz-border-radius-topleft:4px}.pagination ul>li:last-child>a,.pagination ul>li:last-child>span{-webkit-border-top-right-radius:4px;border-top-right-radius:4px;-webkit-border-bottom-right-radius:4px;border-bottom-right-radius:4px;-moz-border-radius-topright:4px;-moz-border-radius-bottomright:4px}.pagination-centered{text-align:center}.pagination-right{text-align:right}.pagination-large ul>li>a,.pagination-large ul>li>span{padding:11px 19px;font-size:17.5px}.pagination-large ul>li:first-child>a,.pagination-large ul>li:first-child>span{-webkit-border-bottom-left-radius:6px;border-bottom-left-radius:6px;-webkit-border-top-left-radius:6px;border-top-left-radius:6px;-moz-border-radius-bottomleft:6px;-moz-border-radius-topleft:6px}.pagination-large ul>li:last-child>a,.pagination-large ul>li:last-child>span{-webkit-border-top-right-radius:6px;border-top-right-radius:6px;-webkit-border-bottom-right-radius:6px;border-bottom-right-radius:6px;-moz-border-radius-topright:6px;-moz-border-radius-bottomright:6px}.pagination-mini ul>li:first-child>a,.pagination-small ul>li:first-child>a,.pagination-mini ul>li:first-child>span,.pagination-small ul>li:first-child>span{-webkit-border-bottom-left-radius:3px;border-bottom-left-radius:3px;-webkit-border-top-left-radius:3px;border-top-left-radius:3px;-moz-border-radius-bottomleft:3px;-moz-border-radius-topleft:3px}.pagination-mini ul>li:last-child>a,.pagination-small ul>li:last-child>a,.pagination-mini ul>li:last-child>span,.pagination-small ul>li:last-child>span{-webkit-border-top-right-radius:3px;border-top-right-radius:3px;-webkit-border-bottom-right-radius:3px;border-bottom-right-radius:3px;-moz-border-radius-topright:3px;-moz-border-radius-bottomright:3px}.pagination-small ul>li>a,.pagination-small ul>li>span{padding:2px 10px;font-size:11.9px}.pagination-mini ul>li>a,.pagination-mini ul>li>span{padding:0 6px;font-size:10.5px}.pager{margin:20px 0;text-align:center;list-style:none;*zoom:1}.pager:before,.pager:after{display:table;line-height:0;content:\"\"}.pager:after{clear:both}.pager li{display:inline}.pager li>a,.pager li>span{display:inline-block;padding:5px 14px;background-color:#fff;border:1px solid #ddd;-webkit-border-radius:15px;-moz-border-radius:15px;border-radius:15px}.pager li>a:hover,.pager li>a:focus{text-decoration:none;background-color:#f5f5f5}.pager .next>a,.pager .next>span{float:right}.pager .previous>a,.pager .previous>span{float:left}.pager .disabled>a,.pager .disabled>a:hover,.pager .disabled>a:focus,.pager .disabled>span{color:#999;cursor:default;background-color:#fff}.modal-backdrop{position:fixed;top:0;right:0;bottom:0;left:0;z-index:1040;background-color:#000}.modal-backdrop.fade{opacity:0}.modal-backdrop,.modal-backdrop.fade.in{opacity:.8;filter:alpha(opacity=80)}.modal{position:fixed;top:10%;left:50%;z-index:1050;width:560px;margin-left:-280px;background-color:#fff;border:1px solid #999;border:1px solid rgba(0,0,0,0.3);*border:1px solid #999;-webkit-border-radius:6px;-moz-border-radius:6px;border-radius:6px;outline:0;-webkit-box-shadow:0 3px 7px rgba(0,0,0,0.3);-moz-box-shadow:0 3px 7px rgba(0,0,0,0.3);box-shadow:0 3px 7px rgba(0,0,0,0.3);-webkit-background-clip:padding-box;-moz-background-clip:padding-box;background-clip:padding-box}.modal.fade{top:-25%;-webkit-transition:opacity .3s linear,top .3s ease-out;-moz-transition:opacity .3s linear,top .3s ease-out;-o-transition:opacity .3s linear,top .3s ease-out;transition:opacity .3s linear,top .3s ease-out}.modal.fade.in{top:10%}.modal-header{padding:9px 15px;border-bottom:1px solid #eee}.modal-header .close{margin-top:2px}.modal-header h3{margin:0;line-height:30px}.modal-body{position:relative;max-height:400px;padding:15px;overflow-y:auto}.modal-form{margin-bottom:0}.modal-footer{padding:14px 15px 15px;margin-bottom:0;text-align:right;background-color:#f5f5f5;border-top:1px solid #ddd;-webkit-border-radius:0 0 6px 6px;-moz-border-radius:0 0 6px 6px;border-radius:0 0 6px 6px;*zoom:1;-webkit-box-shadow:inset 0 1px 0 #fff;-moz-box-shadow:inset 0 1px 0 #fff;box-shadow:inset 0 1px 0 #fff}.modal-footer:before,.modal-footer:after{display:table;line-height:0;content:\"\"}.modal-footer:after{clear:both}.modal-footer .btn+.btn{margin-bottom:0;margin-left:5px}.modal-footer .btn-group .btn+.btn{margin-left:-1px}.modal-footer .btn-block+.btn-block{margin-left:0}.tooltip{position:absolute;z-index:1030;display:block;font-size:11px;line-height:1.4;opacity:0;filter:alpha(opacity=0);visibility:visible}.tooltip.in{opacity:.8;filter:alpha(opacity=80)}.tooltip.top{padding:5px 0;margin-top:-3px}.tooltip.right{padding:0 5px;margin-left:3px}.tooltip.bottom{padding:5px 0;margin-top:3px}.tooltip.left{padding:0 5px;margin-left:-3px}.tooltip-inner{max-width:200px;padding:8px;color:#fff;text-align:center;text-decoration:none;background-color:#000;-webkit-border-radius:4px;-moz-border-radius:4px;border-radius:4px}.tooltip-arrow{position:absolute;width:0;height:0;border-color:transparent;border-style:solid}.tooltip.top .tooltip-arrow{bottom:0;left:50%;margin-left:-5px;border-top-color:#000;border-width:5px 5px 0}.tooltip.right .tooltip-arrow{top:50%;left:0;margin-top:-5px;border-right-color:#000;border-width:5px 5px 5px 0}.tooltip.left .tooltip-arrow{top:50%;right:0;margin-top:-5px;border-left-color:#000;border-width:5px 0 5px 5px}.tooltip.bottom .tooltip-arrow{top:0;left:50%;margin-left:-5px;border-bottom-color:#000;border-width:0 5px 5px}.popover{position:absolute;top:0;left:0;z-index:1010;display:none;max-width:276px;padding:1px;text-align:left;white-space:normal;background-color:#fff;border:1px solid #ccc;border:1px solid rgba(0,0,0,0.2);-webkit-border-radius:6px;-moz-border-radius:6px;border-radius:6px;-webkit-box-shadow:0 5px 10px rgba(0,0,0,0.2);-moz-box-shadow:0 5px 10px rgba(0,0,0,0.2);box-shadow:0 5px 10px rgba(0,0,0,0.2);-webkit-background-clip:padding-box;-moz-background-clip:padding;background-clip:padding-box}.popover.top{margin-top:-10px}.popover.right{margin-left:10px}.popover.bottom{margin-top:10px}.popover.left{margin-left:-10px}.popover-title{padding:8px 14px;margin:0;font-size:14px;font-weight:normal;line-height:18px;background-color:#f7f7f7;border-bottom:1px solid #ebebeb;-webkit-border-radius:5px 5px 0 0;-moz-border-radius:5px 5px 0 0;border-radius:5px 5px 0 0}.popover-title:empty{display:none}.popover-content{padding:9px 14px}.popover .arrow,.popover .arrow:after{position:absolute;display:block;width:0;height:0;border-color:transparent;border-style:solid}.popover .arrow{border-width:11px}.popover .arrow:after{border-width:10px;content:\"\"}.popover.top .arrow{bottom:-11px;left:50%;margin-left:-11px;border-top-color:#999;border-top-color:rgba(0,0,0,0.25);border-bottom-width:0}.popover.top .arrow:after{bottom:1px;margin-left:-10px;border-top-color:#fff;border-bottom-width:0}.popover.right .arrow{top:50%;left:-11px;margin-top:-11px;border-right-color:#999;border-right-color:rgba(0,0,0,0.25);border-left-width:0}.popover.right .arrow:after{bottom:-10px;left:1px;border-right-color:#fff;border-left-width:0}.popover.bottom .arrow{top:-11px;left:50%;margin-left:-11px;border-bottom-color:#999;border-bottom-color:rgba(0,0,0,0.25);border-top-width:0}.popover.bottom .arrow:after{top:1px;margin-left:-10px;border-bottom-color:#fff;border-top-width:0}.popover.left .arrow{top:50%;right:-11px;margin-top:-11px;border-left-color:#999;border-left-color:rgba(0,0,0,0.25);border-right-width:0}.popover.left .arrow:after{right:1px;bottom:-10px;border-left-color:#fff;border-right-width:0}.thumbnails{margin-left:-20px;list-style:none;*zoom:1}.thumbnails:before,.thumbnails:after{display:table;line-height:0;content:\"\"}.thumbnails:after{clear:both}.row-fluid .thumbnails{margin-left:0}.thumbnails>li{float:left;margin-bottom:20px;margin-left:20px}.thumbnail{display:block;padding:4px;line-height:20px;border:1px solid #ddd;-webkit-border-radius:4px;-moz-border-radius:4px;border-radius:4px;-webkit-box-shadow:0 1px 3px rgba(0,0,0,0.055);-moz-box-shadow:0 1px 3px rgba(0,0,0,0.055);box-shadow:0 1px 3px rgba(0,0,0,0.055);-webkit-transition:all .2s ease-in-out;-moz-transition:all .2s ease-in-out;-o-transition:all .2s ease-in-out;transition:all .2s ease-in-out}a.thumbnail:hover,a.thumbnail:focus{border-color:#08c;-webkit-box-shadow:0 1px 4px rgba(0,105,214,0.25);-moz-box-shadow:0 1px 4px rgba(0,105,214,0.25);box-shadow:0 1px 4px rgba(0,105,214,0.25)}.thumbnail>img{display:block;max-width:100%;margin-right:auto;margin-left:auto}.thumbnail .caption{padding:9px;color:#555}.media,.media-body{overflow:hidden;*overflow:visible;zoom:1}.media,.media .media{margin-top:15px}.media:first-child{margin-top:0}.media-object{display:block}.media-heading{margin:0 0 5px}.media>.pull-left{margin-right:10px}.media>.pull-right{margin-left:10px}.media-list{margin-left:0;list-style:none}.label,.badge{display:inline-block;padding:2px 4px;font-size:11.844px;font-weight:bold;line-height:14px;color:#fff;text-shadow:0 -1px 0 rgba(0,0,0,0.25);white-space:nowrap;vertical-align:baseline;background-color:#999}.label{-webkit-border-radius:3px;-moz-border-radius:3px;border-radius:3px}.badge{padding-right:9px;padding-left:9px;-webkit-border-radius:9px;-moz-border-radius:9px;border-radius:9px}.label:empty,.badge:empty{display:none}a.label:hover,a.label:focus,a.badge:hover,a.badge:focus{color:#fff;text-decoration:none;cursor:pointer}.label-important,.badge-important{background-color:#b94a48}.label-important[href],.badge-important[href]{background-color:#953b39}.label-warning,.badge-warning{background-color:#f89406}.label-warning[href],.badge-warning[href]{background-color:#c67605}.label-success,.badge-success{background-color:#468847}.label-success[href],.badge-success[href]{background-color:#356635}.label-info,.badge-info{background-color:#3a87ad}.label-info[href],.badge-info[href]{background-color:#2d6987}.label-inverse,.badge-inverse{background-color:#333}.label-inverse[href],.badge-inverse[href]{background-color:#1a1a1a}.btn .label,.btn .badge{position:relative;top:-1px}.btn-mini .label,.btn-mini .badge{top:0}@-webkit-keyframes progress-bar-stripes{from{background-position:40px 0}to{background-position:0 0}}@-moz-keyframes progress-bar-stripes{from{background-position:40px 0}to{background-position:0 0}}@-ms-keyframes progress-bar-stripes{from{background-position:40px 0}to{background-position:0 0}}@-o-keyframes progress-bar-stripes{from{background-position:0 0}to{background-position:40px 0}}@keyframes progress-bar-stripes{from{background-position:40px 0}to{background-position:0 0}}.progress{height:20px;margin-bottom:20px;overflow:hidden;background-color:#f7f7f7;background-image:-moz-linear-gradient(top,#f5f5f5,#f9f9f9);background-image:-webkit-gradient(linear,0 0,0 100%,from(#f5f5f5),to(#f9f9f9));background-image:-webkit-linear-gradient(top,#f5f5f5,#f9f9f9);background-image:-o-linear-gradient(top,#f5f5f5,#f9f9f9);background-image:linear-gradient(to bottom,#f5f5f5,#f9f9f9);background-repeat:repeat-x;-webkit-border-radius:4px;-moz-border-radius:4px;border-radius:4px;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#fff5f5f5',endColorstr='#fff9f9f9',GradientType=0);-webkit-box-shadow:inset 0 1px 2px rgba(0,0,0,0.1);-moz-box-shadow:inset 0 1px 2px rgba(0,0,0,0.1);box-shadow:inset 0 1px 2px rgba(0,0,0,0.1)}.progress .bar{float:left;width:0;height:100%;font-size:12px;color:#fff;text-align:center;text-shadow:0 -1px 0 rgba(0,0,0,0.25);background-color:#0e90d2;background-image:-moz-linear-gradient(top,#149bdf,#0480be);background-image:-webkit-gradient(linear,0 0,0 100%,from(#149bdf),to(#0480be));background-image:-webkit-linear-gradient(top,#149bdf,#0480be);background-image:-o-linear-gradient(top,#149bdf,#0480be);background-image:linear-gradient(to bottom,#149bdf,#0480be);background-repeat:repeat-x;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#ff149bdf',endColorstr='#ff0480be',GradientType=0);-webkit-box-shadow:inset 0 -1px 0 rgba(0,0,0,0.15);-moz-box-shadow:inset 0 -1px 0 rgba(0,0,0,0.15);box-shadow:inset 0 -1px 0 rgba(0,0,0,0.15);-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;-webkit-transition:width .6s ease;-moz-transition:width .6s ease;-o-transition:width .6s ease;transition:width .6s ease}.progress .bar+.bar{-webkit-box-shadow:inset 1px 0 0 rgba(0,0,0,0.15),inset 0 -1px 0 rgba(0,0,0,0.15);-moz-box-shadow:inset 1px 0 0 rgba(0,0,0,0.15),inset 0 -1px 0 rgba(0,0,0,0.15);box-shadow:inset 1px 0 0 rgba(0,0,0,0.15),inset 0 -1px 0 rgba(0,0,0,0.15)}.progress-striped .bar{background-color:#149bdf;background-image:-webkit-gradient(linear,0 100%,100% 0,color-stop(0.25,rgba(255,255,255,0.15)),color-stop(0.25,transparent),color-stop(0.5,transparent),color-stop(0.5,rgba(255,255,255,0.15)),color-stop(0.75,rgba(255,255,255,0.15)),color-stop(0.75,transparent),to(transparent));background-image:-webkit-linear-gradient(45deg,rgba(255,255,255,0.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,0.15) 50%,rgba(255,255,255,0.15) 75%,transparent 75%,transparent);background-image:-moz-linear-gradient(45deg,rgba(255,255,255,0.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,0.15) 50%,rgba(255,255,255,0.15) 75%,transparent 75%,transparent);background-image:-o-linear-gradient(45deg,rgba(255,255,255,0.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,0.15) 50%,rgba(255,255,255,0.15) 75%,transparent 75%,transparent);background-image:linear-gradient(45deg,rgba(255,255,255,0.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,0.15) 50%,rgba(255,255,255,0.15) 75%,transparent 75%,transparent);-webkit-background-size:40px 40px;-moz-background-size:40px 40px;-o-background-size:40px 40px;background-size:40px 40px}.progress.active .bar{-webkit-animation:progress-bar-stripes 2s linear infinite;-moz-animation:progress-bar-stripes 2s linear infinite;-ms-animation:progress-bar-stripes 2s linear infinite;-o-animation:progress-bar-stripes 2s linear infinite;animation:progress-bar-stripes 2s linear infinite}.progress-danger .bar,.progress .bar-danger{background-color:#dd514c;background-image:-moz-linear-gradient(top,#ee5f5b,#c43c35);background-image:-webkit-gradient(linear,0 0,0 100%,from(#ee5f5b),to(#c43c35));background-image:-webkit-linear-gradient(top,#ee5f5b,#c43c35);background-image:-o-linear-gradient(top,#ee5f5b,#c43c35);background-image:linear-gradient(to bottom,#ee5f5b,#c43c35);background-repeat:repeat-x;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffee5f5b',endColorstr='#ffc43c35',GradientType=0)}.progress-danger.progress-striped .bar,.progress-striped .bar-danger{background-color:#ee5f5b;background-image:-webkit-gradient(linear,0 100%,100% 0,color-stop(0.25,rgba(255,255,255,0.15)),color-stop(0.25,transparent),color-stop(0.5,transparent),color-stop(0.5,rgba(255,255,255,0.15)),color-stop(0.75,rgba(255,255,255,0.15)),color-stop(0.75,transparent),to(transparent));background-image:-webkit-linear-gradient(45deg,rgba(255,255,255,0.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,0.15) 50%,rgba(255,255,255,0.15) 75%,transparent 75%,transparent);background-image:-moz-linear-gradient(45deg,rgba(255,255,255,0.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,0.15) 50%,rgba(255,255,255,0.15) 75%,transparent 75%,transparent);background-image:-o-linear-gradient(45deg,rgba(255,255,255,0.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,0.15) 50%,rgba(255,255,255,0.15) 75%,transparent 75%,transparent);background-image:linear-gradient(45deg,rgba(255,255,255,0.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,0.15) 50%,rgba(255,255,255,0.15) 75%,transparent 75%,transparent)}.progress-success .bar,.progress .bar-success{background-color:#5eb95e;background-image:-moz-linear-gradient(top,#62c462,#57a957);background-image:-webkit-gradient(linear,0 0,0 100%,from(#62c462),to(#57a957));background-image:-webkit-linear-gradient(top,#62c462,#57a957);background-image:-o-linear-gradient(top,#62c462,#57a957);background-image:linear-gradient(to bottom,#62c462,#57a957);background-repeat:repeat-x;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#ff62c462',endColorstr='#ff57a957',GradientType=0)}.progress-success.progress-striped .bar,.progress-striped .bar-success{background-color:#62c462;background-image:-webkit-gradient(linear,0 100%,100% 0,color-stop(0.25,rgba(255,255,255,0.15)),color-stop(0.25,transparent),color-stop(0.5,transparent),color-stop(0.5,rgba(255,255,255,0.15)),color-stop(0.75,rgba(255,255,255,0.15)),color-stop(0.75,transparent),to(transparent));background-image:-webkit-linear-gradient(45deg,rgba(255,255,255,0.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,0.15) 50%,rgba(255,255,255,0.15) 75%,transparent 75%,transparent);background-image:-moz-linear-gradient(45deg,rgba(255,255,255,0.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,0.15) 50%,rgba(255,255,255,0.15) 75%,transparent 75%,transparent);background-image:-o-linear-gradient(45deg,rgba(255,255,255,0.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,0.15) 50%,rgba(255,255,255,0.15) 75%,transparent 75%,transparent);background-image:linear-gradient(45deg,rgba(255,255,255,0.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,0.15) 50%,rgba(255,255,255,0.15) 75%,transparent 75%,transparent)}.progress-info .bar,.progress .bar-info{background-color:#4bb1cf;background-image:-moz-linear-gradient(top,#5bc0de,#339bb9);background-image:-webkit-gradient(linear,0 0,0 100%,from(#5bc0de),to(#339bb9));background-image:-webkit-linear-gradient(top,#5bc0de,#339bb9);background-image:-o-linear-gradient(top,#5bc0de,#339bb9);background-image:linear-gradient(to bottom,#5bc0de,#339bb9);background-repeat:repeat-x;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#ff5bc0de',endColorstr='#ff339bb9',GradientType=0)}.progress-info.progress-striped .bar,.progress-striped .bar-info{background-color:#5bc0de;background-image:-webkit-gradient(linear,0 100%,100% 0,color-stop(0.25,rgba(255,255,255,0.15)),color-stop(0.25,transparent),color-stop(0.5,transparent),color-stop(0.5,rgba(255,255,255,0.15)),color-stop(0.75,rgba(255,255,255,0.15)),color-stop(0.75,transparent),to(transparent));background-image:-webkit-linear-gradient(45deg,rgba(255,255,255,0.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,0.15) 50%,rgba(255,255,255,0.15) 75%,transparent 75%,transparent);background-image:-moz-linear-gradient(45deg,rgba(255,255,255,0.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,0.15) 50%,rgba(255,255,255,0.15) 75%,transparent 75%,transparent);background-image:-o-linear-gradient(45deg,rgba(255,255,255,0.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,0.15) 50%,rgba(255,255,255,0.15) 75%,transparent 75%,transparent);background-image:linear-gradient(45deg,rgba(255,255,255,0.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,0.15) 50%,rgba(255,255,255,0.15) 75%,transparent 75%,transparent)}.progress-warning .bar,.progress .bar-warning{background-color:#faa732;background-image:-moz-linear-gradient(top,#fbb450,#f89406);background-image:-webkit-gradient(linear,0 0,0 100%,from(#fbb450),to(#f89406));background-image:-webkit-linear-gradient(top,#fbb450,#f89406);background-image:-o-linear-gradient(top,#fbb450,#f89406);background-image:linear-gradient(to bottom,#fbb450,#f89406);background-repeat:repeat-x;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#fffbb450',endColorstr='#fff89406',GradientType=0)}.progress-warning.progress-striped .bar,.progress-striped .bar-warning{background-color:#fbb450;background-image:-webkit-gradient(linear,0 100%,100% 0,color-stop(0.25,rgba(255,255,255,0.15)),color-stop(0.25,transparent),color-stop(0.5,transparent),color-stop(0.5,rgba(255,255,255,0.15)),color-stop(0.75,rgba(255,255,255,0.15)),color-stop(0.75,transparent),to(transparent));background-image:-webkit-linear-gradient(45deg,rgba(255,255,255,0.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,0.15) 50%,rgba(255,255,255,0.15) 75%,transparent 75%,transparent);background-image:-moz-linear-gradient(45deg,rgba(255,255,255,0.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,0.15) 50%,rgba(255,255,255,0.15) 75%,transparent 75%,transparent);background-image:-o-linear-gradient(45deg,rgba(255,255,255,0.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,0.15) 50%,rgba(255,255,255,0.15) 75%,transparent 75%,transparent);background-image:linear-gradient(45deg,rgba(255,255,255,0.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,0.15) 50%,rgba(255,255,255,0.15) 75%,transparent 75%,transparent)}.accordion{margin-bottom:20px}.accordion-group{margin-bottom:2px;border:1px solid #e5e5e5;-webkit-border-radius:4px;-moz-border-radius:4px;border-radius:4px}.accordion-heading{border-bottom:0}.accordion-heading .accordion-toggle{display:block;padding:8px 15px}.accordion-toggle{cursor:pointer}.accordion-inner{padding:9px 15px;border-top:1px solid #e5e5e5}.carousel{position:relative;margin-bottom:20px;line-height:1}.carousel-inner{position:relative;width:100%;overflow:hidden}.carousel-inner>.item{position:relative;display:none;-webkit-transition:.6s ease-in-out left;-moz-transition:.6s ease-in-out left;-o-transition:.6s ease-in-out left;transition:.6s ease-in-out left}.carousel-inner>.item>img,.carousel-inner>.item>a>img{display:block;line-height:1}.carousel-inner>.active,.carousel-inner>.next,.carousel-inner>.prev{display:block}.carousel-inner>.active{left:0}.carousel-inner>.next,.carousel-inner>.prev{position:absolute;top:0;width:100%}.carousel-inner>.next{left:100%}.carousel-inner>.prev{left:-100%}.carousel-inner>.next.left,.carousel-inner>.prev.right{left:0}.carousel-inner>.active.left{left:-100%}.carousel-inner>.active.right{left:100%}.carousel-control{position:absolute;top:40%;left:15px;width:40px;height:40px;margin-top:-20px;font-size:60px;font-weight:100;line-height:30px;color:#fff;text-align:center;background:#222;border:3px solid #fff;-webkit-border-radius:23px;-moz-border-radius:23px;border-radius:23px;opacity:.5;filter:alpha(opacity=50)}.carousel-control.right{right:15px;left:auto}.carousel-control:hover,.carousel-control:focus{color:#fff;text-decoration:none;opacity:.9;filter:alpha(opacity=90)}.carousel-indicators{position:absolute;top:15px;right:15px;z-index:5;margin:0;list-style:none}.carousel-indicators li{display:block;float:left;width:10px;height:10px;margin-left:5px;text-indent:-999px;background-color:#ccc;background-color:rgba(255,255,255,0.25);border-radius:5px}.carousel-indicators .active{background-color:#fff}.carousel-caption{position:absolute;right:0;bottom:0;left:0;padding:15px;background:#333;background:rgba(0,0,0,0.75)}.carousel-caption h4,.carousel-caption p{line-height:20px;color:#fff}.carousel-caption h4{margin:0 0 5px}.carousel-caption p{margin-bottom:0}.hero-unit{padding:60px;margin-bottom:30px;font-size:18px;font-weight:200;line-height:30px;color:inherit;background-color:#eee;-webkit-border-radius:6px;-moz-border-radius:6px;border-radius:6px}.hero-unit h1{margin-bottom:0;font-size:60px;line-height:1;letter-spacing:-1px;color:inherit}.hero-unit li{line-height:30px}.pull-right{float:right}.pull-left{float:left}.hide{display:none}.show{display:block}.invisible{visibility:hidden}.affix{position:fixed}\n\n"; s.id = "css-bootstrap"; document.head.appendChild(s);}, "stylesheets/font-awesome": function(exports, require, module) {s = document.createElement('style'); s.innerHTML = "/*  Font Awesome 3.0\n    the iconic font designed for use with Twitter Bootstrap\n    -------------------------------------------------------\n    The full suite of pictographic icons, examples, and documentation\n    can be found at: http://fortawesome.github.com/Font-Awesome/\n\n    License\n    -------------------------------------------------------\n    • The Font Awesome font is licensed under the SIL Open Font License - http://scripts.sil.org/OFL\n    • Font Awesome CSS, LESS, and SASS files are licensed under the MIT License -\n      http://opensource.org/licenses/mit-license.html\n    • The Font Awesome pictograms are licensed under the CC BY 3.0 License - http://creativecommons.org/licenses/by/3.0/\n    • Attribution is no longer required in Font Awesome 3.0, but much appreciated:\n      \"Font Awesome by Dave Gandy - http://fortawesome.github.com/Font-Awesome\"\n\n    Contact\n    -------------------------------------------------------\n    Email: dave@davegandy.com\n    Twitter: http://twitter.com/fortaweso_me\n    Work: Lead Product Designer @ http://kyruus.com\n\n    */\n@font-face {\n  font-family: 'FontAwesome';\n  src: url('/font/fontawesome-webfont.eot');\n  src: url('/font/fontawesome-webfont.eot?#iefix') format('embedded-opentype'), url('/font/fontawesome-webfont.woff') format('woff'), url('/font/fontawesome-webfont.ttf') format('truetype');\n  font-weight: normal;\n  font-style: normal;\n}\n/*  Font Awesome styles\n    ------------------------------------------------------- */\n/* includes sprites.less reset */\n[class^=\"icon-\"],\n[class*=\" icon-\"] {\n  font-family: FontAwesome;\n  font-weight: normal;\n  font-style: normal;\n  text-decoration: inherit;\n  display: inline;\n  width: auto;\n  height: auto;\n  line-height: normal;\n  vertical-align: baseline;\n  background-image: none !important;\n  background-position: 0% 0%;\n  background-repeat: repeat;\n}\n[class^=\"icon-\"]:before,\n[class*=\" icon-\"]:before {\n  text-decoration: inherit;\n  display: inline-block;\n  speak: none;\n}\n/* makes sure icons active on rollover in links */\na [class^=\"icon-\"],\na [class*=\" icon-\"] {\n  display: inline-block;\n}\n/* makes the font 33% larger relative to the icon container */\n.icon-large:before {\n  vertical-align: -10%;\n  font-size: 1.3333333333333333em;\n}\n.btn [class^=\"icon-\"],\n.nav [class^=\"icon-\"],\n.btn [class*=\" icon-\"],\n.nav [class*=\" icon-\"] {\n  display: inline;\n  /* keeps button heights with and without icons the same */\n\n  line-height: .6em;\n}\n.btn [class^=\"icon-\"].icon-spin,\n.nav [class^=\"icon-\"].icon-spin,\n.btn [class*=\" icon-\"].icon-spin,\n.nav [class*=\" icon-\"].icon-spin {\n  display: inline-block;\n}\nli [class^=\"icon-\"],\nli [class*=\" icon-\"] {\n  display: inline-block;\n  width: 1.25em;\n  text-align: center;\n}\nli [class^=\"icon-\"].icon-large,\nli [class*=\" icon-\"].icon-large {\n  /* increased font size for icon-large */\n\n  width: 1.5625em;\n}\nul.icons {\n  list-style-type: none;\n  text-indent: -0.75em;\n}\nul.icons li [class^=\"icon-\"],\nul.icons li [class*=\" icon-\"] {\n  width: .75em;\n}\n.icon-muted {\n  color: #eeeeee;\n}\n.icon-border {\n  border: solid 1px #eeeeee;\n  padding: .2em .25em .15em;\n  -webkit-border-radius: 3px;\n  -moz-border-radius: 3px;\n  border-radius: 3px;\n}\n.icon-2x {\n  font-size: 2em;\n}\n.icon-2x.icon-border {\n  border-width: 2px;\n  -webkit-border-radius: 4px;\n  -moz-border-radius: 4px;\n  border-radius: 4px;\n}\n.icon-3x {\n  font-size: 3em;\n}\n.icon-3x.icon-border {\n  border-width: 3px;\n  -webkit-border-radius: 5px;\n  -moz-border-radius: 5px;\n  border-radius: 5px;\n}\n.icon-4x {\n  font-size: 4em;\n}\n.icon-4x.icon-border {\n  border-width: 4px;\n  -webkit-border-radius: 6px;\n  -moz-border-radius: 6px;\n  border-radius: 6px;\n}\n.pull-right {\n  float: right;\n}\n.pull-left {\n  float: left;\n}\n[class^=\"icon-\"].pull-left,\n[class*=\" icon-\"].pull-left {\n  margin-right: .35em;\n}\n[class^=\"icon-\"].pull-right,\n[class*=\" icon-\"].pull-right {\n  margin-left: .35em;\n}\n.btn [class^=\"icon-\"].pull-left.icon-2x,\n.btn [class*=\" icon-\"].pull-left.icon-2x,\n.btn [class^=\"icon-\"].pull-right.icon-2x,\n.btn [class*=\" icon-\"].pull-right.icon-2x {\n  margin-top: .35em;\n}\n.btn [class^=\"icon-\"].icon-spin.icon-large,\n.btn [class*=\" icon-\"].icon-spin.icon-large {\n  height: .75em;\n}\n.btn.btn-small [class^=\"icon-\"].pull-left.icon-2x,\n.btn.btn-small [class*=\" icon-\"].pull-left.icon-2x,\n.btn.btn-small [class^=\"icon-\"].pull-right.icon-2x,\n.btn.btn-small [class*=\" icon-\"].pull-right.icon-2x {\n  margin-top: .45em;\n}\n.btn.btn-large [class^=\"icon-\"].pull-left.icon-2x,\n.btn.btn-large [class*=\" icon-\"].pull-left.icon-2x,\n.btn.btn-large [class^=\"icon-\"].pull-right.icon-2x,\n.btn.btn-large [class*=\" icon-\"].pull-right.icon-2x {\n  margin-top: .2em;\n}\n.icon-spin {\n  display: inline-block;\n  -moz-animation: spin 2s infinite linear;\n  -o-animation: spin 2s infinite linear;\n  -webkit-animation: spin 2s infinite linear;\n  animation: spin 2s infinite linear;\n}\n@-moz-keyframes spin {\n  0% {\n    -moz-transform: rotate(0deg);\n  }\n  100% {\n    -moz-transform: rotate(359deg);\n  }\n}\n@-webkit-keyframes spin {\n  0% {\n    -webkit-transform: rotate(0deg);\n  }\n  100% {\n    -webkit-transform: rotate(359deg);\n  }\n}\n@-o-keyframes spin {\n  0% {\n    -o-transform: rotate(0deg);\n  }\n  100% {\n    -o-transform: rotate(359deg);\n  }\n}\n@-ms-keyframes spin {\n  0% {\n    -ms-transform: rotate(0deg);\n  }\n  100% {\n    -ms-transform: rotate(359deg);\n  }\n}\n@keyframes spin {\n  0% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(359deg);\n  }\n}\n/*  Font Awesome uses the Unicode Private Use Area (PUA) to ensure screen\n    readers do not read off random characters that represent icons */\n.icon-glass:before {\n  content: \"\\f000\";\n}\n.icon-music:before {\n  content: \"\\f001\";\n}\n.icon-search:before {\n  content: \"\\f002\";\n}\n.icon-envelope:before {\n  content: \"\\f003\";\n}\n.icon-heart:before {\n  content: \"\\f004\";\n}\n.icon-star:before {\n  content: \"\\f005\";\n}\n.icon-star-empty:before {\n  content: \"\\f006\";\n}\n.icon-user:before {\n  content: \"\\f007\";\n}\n.icon-film:before {\n  content: \"\\f008\";\n}\n.icon-th-large:before {\n  content: \"\\f009\";\n}\n.icon-th:before {\n  content: \"\\f00a\";\n}\n.icon-th-list:before {\n  content: \"\\f00b\";\n}\n.icon-ok:before {\n  content: \"\\f00c\";\n}\n.icon-remove:before {\n  content: \"\\f00d\";\n}\n.icon-zoom-in:before {\n  content: \"\\f00e\";\n}\n.icon-zoom-out:before {\n  content: \"\\f010\";\n}\n.icon-off:before {\n  content: \"\\f011\";\n}\n.icon-signal:before {\n  content: \"\\f012\";\n}\n.icon-cog:before {\n  content: \"\\f013\";\n}\n.icon-trash:before {\n  content: \"\\f014\";\n}\n.icon-home:before {\n  content: \"\\f015\";\n}\n.icon-file:before {\n  content: \"\\f016\";\n}\n.icon-time:before {\n  content: \"\\f017\";\n}\n.icon-road:before {\n  content: \"\\f018\";\n}\n.icon-download-alt:before {\n  content: \"\\f019\";\n}\n.icon-download:before {\n  content: \"\\f01a\";\n}\n.icon-upload:before {\n  content: \"\\f01b\";\n}\n.icon-inbox:before {\n  content: \"\\f01c\";\n}\n.icon-play-circle:before {\n  content: \"\\f01d\";\n}\n.icon-repeat:before {\n  content: \"\\f01e\";\n}\n/* \\f020 doesn't work in Safari. all shifted one down */\n.icon-refresh:before {\n  content: \"\\f021\";\n}\n.icon-list-alt:before {\n  content: \"\\f022\";\n}\n.icon-lock:before {\n  content: \"\\f023\";\n}\n.icon-flag:before {\n  content: \"\\f024\";\n}\n.icon-headphones:before {\n  content: \"\\f025\";\n}\n.icon-volume-off:before {\n  content: \"\\f026\";\n}\n.icon-volume-down:before {\n  content: \"\\f027\";\n}\n.icon-volume-up:before {\n  content: \"\\f028\";\n}\n.icon-qrcode:before {\n  content: \"\\f029\";\n}\n.icon-barcode:before {\n  content: \"\\f02a\";\n}\n.icon-tag:before {\n  content: \"\\f02b\";\n}\n.icon-tags:before {\n  content: \"\\f02c\";\n}\n.icon-book:before {\n  content: \"\\f02d\";\n}\n.icon-bookmark:before {\n  content: \"\\f02e\";\n}\n.icon-print:before {\n  content: \"\\f02f\";\n}\n.icon-camera:before {\n  content: \"\\f030\";\n}\n.icon-font:before {\n  content: \"\\f031\";\n}\n.icon-bold:before {\n  content: \"\\f032\";\n}\n.icon-italic:before {\n  content: \"\\f033\";\n}\n.icon-text-height:before {\n  content: \"\\f034\";\n}\n.icon-text-width:before {\n  content: \"\\f035\";\n}\n.icon-align-left:before {\n  content: \"\\f036\";\n}\n.icon-align-center:before {\n  content: \"\\f037\";\n}\n.icon-align-right:before {\n  content: \"\\f038\";\n}\n.icon-align-justify:before {\n  content: \"\\f039\";\n}\n.icon-list:before {\n  content: \"\\f03a\";\n}\n.icon-indent-left:before {\n  content: \"\\f03b\";\n}\n.icon-indent-right:before {\n  content: \"\\f03c\";\n}\n.icon-facetime-video:before {\n  content: \"\\f03d\";\n}\n.icon-picture:before {\n  content: \"\\f03e\";\n}\n.icon-pencil:before {\n  content: \"\\f040\";\n}\n.icon-map-marker:before {\n  content: \"\\f041\";\n}\n.icon-adjust:before {\n  content: \"\\f042\";\n}\n.icon-tint:before {\n  content: \"\\f043\";\n}\n.icon-edit:before {\n  content: \"\\f044\";\n}\n.icon-share:before {\n  content: \"\\f045\";\n}\n.icon-check:before {\n  content: \"\\f046\";\n}\n.icon-move:before {\n  content: \"\\f047\";\n}\n.icon-step-backward:before {\n  content: \"\\f048\";\n}\n.icon-fast-backward:before {\n  content: \"\\f049\";\n}\n.icon-backward:before {\n  content: \"\\f04a\";\n}\n.icon-play:before {\n  content: \"\\f04b\";\n}\n.icon-pause:before {\n  content: \"\\f04c\";\n}\n.icon-stop:before {\n  content: \"\\f04d\";\n}\n.icon-forward:before {\n  content: \"\\f04e\";\n}\n.icon-fast-forward:before {\n  content: \"\\f050\";\n}\n.icon-step-forward:before {\n  content: \"\\f051\";\n}\n.icon-eject:before {\n  content: \"\\f052\";\n}\n.icon-chevron-left:before {\n  content: \"\\f053\";\n}\n.icon-chevron-right:before {\n  content: \"\\f054\";\n}\n.icon-plus-sign:before {\n  content: \"\\f055\";\n}\n.icon-minus-sign:before {\n  content: \"\\f056\";\n}\n.icon-remove-sign:before {\n  content: \"\\f057\";\n}\n.icon-ok-sign:before {\n  content: \"\\f058\";\n}\n.icon-question-sign:before {\n  content: \"\\f059\";\n}\n.icon-info-sign:before {\n  content: \"\\f05a\";\n}\n.icon-screenshot:before {\n  content: \"\\f05b\";\n}\n.icon-remove-circle:before {\n  content: \"\\f05c\";\n}\n.icon-ok-circle:before {\n  content: \"\\f05d\";\n}\n.icon-ban-circle:before {\n  content: \"\\f05e\";\n}\n.icon-arrow-left:before {\n  content: \"\\f060\";\n}\n.icon-arrow-right:before {\n  content: \"\\f061\";\n}\n.icon-arrow-up:before {\n  content: \"\\f062\";\n}\n.icon-arrow-down:before {\n  content: \"\\f063\";\n}\n.icon-share-alt:before {\n  content: \"\\f064\";\n}\n.icon-resize-full:before {\n  content: \"\\f065\";\n}\n.icon-resize-small:before {\n  content: \"\\f066\";\n}\n.icon-plus:before {\n  content: \"\\f067\";\n}\n.icon-minus:before {\n  content: \"\\f068\";\n}\n.icon-asterisk:before {\n  content: \"\\f069\";\n}\n.icon-exclamation-sign:before {\n  content: \"\\f06a\";\n}\n.icon-gift:before {\n  content: \"\\f06b\";\n}\n.icon-leaf:before {\n  content: \"\\f06c\";\n}\n.icon-fire:before {\n  content: \"\\f06d\";\n}\n.icon-eye-open:before {\n  content: \"\\f06e\";\n}\n.icon-eye-close:before {\n  content: \"\\f070\";\n}\n.icon-warning-sign:before {\n  content: \"\\f071\";\n}\n.icon-plane:before {\n  content: \"\\f072\";\n}\n.icon-calendar:before {\n  content: \"\\f073\";\n}\n.icon-random:before {\n  content: \"\\f074\";\n}\n.icon-comment:before {\n  content: \"\\f075\";\n}\n.icon-magnet:before {\n  content: \"\\f076\";\n}\n.icon-chevron-up:before {\n  content: \"\\f077\";\n}\n.icon-chevron-down:before {\n  content: \"\\f078\";\n}\n.icon-retweet:before {\n  content: \"\\f079\";\n}\n.icon-shopping-cart:before {\n  content: \"\\f07a\";\n}\n.icon-folder-close:before {\n  content: \"\\f07b\";\n}\n.icon-folder-open:before {\n  content: \"\\f07c\";\n}\n.icon-resize-vertical:before {\n  content: \"\\f07d\";\n}\n.icon-resize-horizontal:before {\n  content: \"\\f07e\";\n}\n.icon-bar-chart:before {\n  content: \"\\f080\";\n}\n.icon-twitter-sign:before {\n  content: \"\\f081\";\n}\n.icon-facebook-sign:before {\n  content: \"\\f082\";\n}\n.icon-camera-retro:before {\n  content: \"\\f083\";\n}\n.icon-key:before {\n  content: \"\\f084\";\n}\n.icon-cogs:before {\n  content: \"\\f085\";\n}\n.icon-comments:before {\n  content: \"\\f086\";\n}\n.icon-thumbs-up:before {\n  content: \"\\f087\";\n}\n.icon-thumbs-down:before {\n  content: \"\\f088\";\n}\n.icon-star-half:before {\n  content: \"\\f089\";\n}\n.icon-heart-empty:before {\n  content: \"\\f08a\";\n}\n.icon-signout:before {\n  content: \"\\f08b\";\n}\n.icon-linkedin-sign:before {\n  content: \"\\f08c\";\n}\n.icon-pushpin:before {\n  content: \"\\f08d\";\n}\n.icon-external-link:before {\n  content: \"\\f08e\";\n}\n.icon-signin:before {\n  content: \"\\f090\";\n}\n.icon-trophy:before {\n  content: \"\\f091\";\n}\n.icon-github-sign:before {\n  content: \"\\f092\";\n}\n.icon-upload-alt:before {\n  content: \"\\f093\";\n}\n.icon-lemon:before {\n  content: \"\\f094\";\n}\n.icon-phone:before {\n  content: \"\\f095\";\n}\n.icon-check-empty:before {\n  content: \"\\f096\";\n}\n.icon-bookmark-empty:before {\n  content: \"\\f097\";\n}\n.icon-phone-sign:before {\n  content: \"\\f098\";\n}\n.icon-twitter:before {\n  content: \"\\f099\";\n}\n.icon-facebook:before {\n  content: \"\\f09a\";\n}\n.icon-github:before {\n  content: \"\\f09b\";\n}\n.icon-unlock:before {\n  content: \"\\f09c\";\n}\n.icon-credit-card:before {\n  content: \"\\f09d\";\n}\n.icon-rss:before {\n  content: \"\\f09e\";\n}\n.icon-hdd:before {\n  content: \"\\f0a0\";\n}\n.icon-bullhorn:before {\n  content: \"\\f0a1\";\n}\n.icon-bell:before {\n  content: \"\\f0a2\";\n}\n.icon-certificate:before {\n  content: \"\\f0a3\";\n}\n.icon-hand-right:before {\n  content: \"\\f0a4\";\n}\n.icon-hand-left:before {\n  content: \"\\f0a5\";\n}\n.icon-hand-up:before {\n  content: \"\\f0a6\";\n}\n.icon-hand-down:before {\n  content: \"\\f0a7\";\n}\n.icon-circle-arrow-left:before {\n  content: \"\\f0a8\";\n}\n.icon-circle-arrow-right:before {\n  content: \"\\f0a9\";\n}\n.icon-circle-arrow-up:before {\n  content: \"\\f0aa\";\n}\n.icon-circle-arrow-down:before {\n  content: \"\\f0ab\";\n}\n.icon-globe:before {\n  content: \"\\f0ac\";\n}\n.icon-wrench:before {\n  content: \"\\f0ad\";\n}\n.icon-tasks:before {\n  content: \"\\f0ae\";\n}\n.icon-filter:before {\n  content: \"\\f0b0\";\n}\n.icon-briefcase:before {\n  content: \"\\f0b1\";\n}\n.icon-fullscreen:before {\n  content: \"\\f0b2\";\n}\n.icon-group:before {\n  content: \"\\f0c0\";\n}\n.icon-link:before {\n  content: \"\\f0c1\";\n}\n.icon-cloud:before {\n  content: \"\\f0c2\";\n}\n.icon-beaker:before {\n  content: \"\\f0c3\";\n}\n.icon-cut:before {\n  content: \"\\f0c4\";\n}\n.icon-copy:before {\n  content: \"\\f0c5\";\n}\n.icon-paper-clip:before {\n  content: \"\\f0c6\";\n}\n.icon-save:before {\n  content: \"\\f0c7\";\n}\n.icon-sign-blank:before {\n  content: \"\\f0c8\";\n}\n.icon-reorder:before {\n  content: \"\\f0c9\";\n}\n.icon-list-ul:before {\n  content: \"\\f0ca\";\n}\n.icon-list-ol:before {\n  content: \"\\f0cb\";\n}\n.icon-strikethrough:before {\n  content: \"\\f0cc\";\n}\n.icon-underline:before {\n  content: \"\\f0cd\";\n}\n.icon-table:before {\n  content: \"\\f0ce\";\n}\n.icon-magic:before {\n  content: \"\\f0d0\";\n}\n.icon-truck:before {\n  content: \"\\f0d1\";\n}\n.icon-pinterest:before {\n  content: \"\\f0d2\";\n}\n.icon-pinterest-sign:before {\n  content: \"\\f0d3\";\n}\n.icon-google-plus-sign:before {\n  content: \"\\f0d4\";\n}\n.icon-google-plus:before {\n  content: \"\\f0d5\";\n}\n.icon-money:before {\n  content: \"\\f0d6\";\n}\n.icon-caret-down:before {\n  content: \"\\f0d7\";\n}\n.icon-caret-up:before {\n  content: \"\\f0d8\";\n}\n.icon-caret-left:before {\n  content: \"\\f0d9\";\n}\n.icon-caret-right:before {\n  content: \"\\f0da\";\n}\n.icon-columns:before {\n  content: \"\\f0db\";\n}\n.icon-sort:before {\n  content: \"\\f0dc\";\n}\n.icon-sort-down:before {\n  content: \"\\f0dd\";\n}\n.icon-sort-up:before {\n  content: \"\\f0de\";\n}\n.icon-envelope-alt:before {\n  content: \"\\f0e0\";\n}\n.icon-linkedin:before {\n  content: \"\\f0e1\";\n}\n.icon-undo:before {\n  content: \"\\f0e2\";\n}\n.icon-legal:before {\n  content: \"\\f0e3\";\n}\n.icon-dashboard:before {\n  content: \"\\f0e4\";\n}\n.icon-comment-alt:before {\n  content: \"\\f0e5\";\n}\n.icon-comments-alt:before {\n  content: \"\\f0e6\";\n}\n.icon-bolt:before {\n  content: \"\\f0e7\";\n}\n.icon-sitemap:before {\n  content: \"\\f0e8\";\n}\n.icon-umbrella:before {\n  content: \"\\f0e9\";\n}\n.icon-paste:before {\n  content: \"\\f0ea\";\n}\n.icon-lightbulb:before {\n  content: \"\\f0eb\";\n}\n.icon-exchange:before {\n  content: \"\\f0ec\";\n}\n.icon-cloud-download:before {\n  content: \"\\f0ed\";\n}\n.icon-cloud-upload:before {\n  content: \"\\f0ee\";\n}\n.icon-user-md:before {\n  content: \"\\f0f0\";\n}\n.icon-stethoscope:before {\n  content: \"\\f0f1\";\n}\n.icon-suitcase:before {\n  content: \"\\f0f2\";\n}\n.icon-bell-alt:before {\n  content: \"\\f0f3\";\n}\n.icon-coffee:before {\n  content: \"\\f0f4\";\n}\n.icon-food:before {\n  content: \"\\f0f5\";\n}\n.icon-file-alt:before {\n  content: \"\\f0f6\";\n}\n.icon-building:before {\n  content: \"\\f0f7\";\n}\n.icon-hospital:before {\n  content: \"\\f0f8\";\n}\n.icon-ambulance:before {\n  content: \"\\f0f9\";\n}\n.icon-medkit:before {\n  content: \"\\f0fa\";\n}\n.icon-fighter-jet:before {\n  content: \"\\f0fb\";\n}\n.icon-beer:before {\n  content: \"\\f0fc\";\n}\n.icon-h-sign:before {\n  content: \"\\f0fd\";\n}\n.icon-plus-sign-alt:before {\n  content: \"\\f0fe\";\n}\n.icon-double-angle-left:before {\n  content: \"\\f100\";\n}\n.icon-double-angle-right:before {\n  content: \"\\f101\";\n}\n.icon-double-angle-up:before {\n  content: \"\\f102\";\n}\n.icon-double-angle-down:before {\n  content: \"\\f103\";\n}\n.icon-angle-left:before {\n  content: \"\\f104\";\n}\n.icon-angle-right:before {\n  content: \"\\f105\";\n}\n.icon-angle-up:before {\n  content: \"\\f106\";\n}\n.icon-angle-down:before {\n  content: \"\\f107\";\n}\n.icon-desktop:before {\n  content: \"\\f108\";\n}\n.icon-laptop:before {\n  content: \"\\f109\";\n}\n.icon-tablet:before {\n  content: \"\\f10a\";\n}\n.icon-mobile-phone:before {\n  content: \"\\f10b\";\n}\n.icon-circle-blank:before {\n  content: \"\\f10c\";\n}\n.icon-quote-left:before {\n  content: \"\\f10d\";\n}\n.icon-quote-right:before {\n  content: \"\\f10e\";\n}\n.icon-spinner:before {\n  content: \"\\f110\";\n}\n.icon-circle:before {\n  content: \"\\f111\";\n}\n.icon-reply:before {\n  content: \"\\f112\";\n}\n.icon-github-alt:before {\n  content: \"\\f113\";\n}\n.icon-folder-close-alt:before {\n  content: \"\\f114\";\n}\n.icon-folder-open-alt:before {\n  content: \"\\f115\";\n}\n"; s.id = "css-font-awesome"; document.head.appendChild(s);}, "views/_document": function(exports, require, module) {module.exports = function(__obj) {
  if (!__obj) __obj = {};
  var __out = [], __capture = function(callback) {
    var out = __out, result;
    __out = [];
    callback.call(this);
    result = __out.join('');
    __out = out;
    return __safe(result);
  }, __sanitize = function(value) {
    if (value && value.ecoSafe) {
      return value;
    } else if (typeof value !== 'undefined' && value != null) {
      return __escape(value);
    } else {
      return '';
    }
  }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
  __safe = __obj.safe = function(value) {
    if (value && value.ecoSafe) {
      return value;
    } else {
      if (!(typeof value !== 'undefined' && value != null)) value = '';
      var result = new String(value);
      result.ecoSafe = true;
      return result;
    }
  };
  if (!__escape) {
    __escape = __obj.escape = function(value) {
      return ('' + value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    };
  }
  (function() {
    (function() {
      __out.push('<article></article>');
    
    }).call(this);
    
  }).call(__obj);
  __obj.safe = __objSafe, __obj.escape = __escape;
  return __out.join('');
}}, "views/_index": function(exports, require, module) {module.exports = function(__obj) {
  if (!__obj) __obj = {};
  var __out = [], __capture = function(callback) {
    var out = __out, result;
    __out = [];
    callback.call(this);
    result = __out.join('');
    __out = out;
    return __safe(result);
  }, __sanitize = function(value) {
    if (value && value.ecoSafe) {
      return value;
    } else if (typeof value !== 'undefined' && value != null) {
      return __escape(value);
    } else {
      return '';
    }
  }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
  __safe = __obj.safe = function(value) {
    if (value && value.ecoSafe) {
      return value;
    } else {
      if (!(typeof value !== 'undefined' && value != null)) value = '';
      var result = new String(value);
      result.ecoSafe = true;
      return result;
    }
  };
  if (!__escape) {
    __escape = __obj.escape = function(value) {
      return ('' + value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    };
  }
  (function() {
    (function() {
      __out.push('<article id="home">\n\t<img src="/images/Castelul_Peles_3.jpg" alt="">\t\n</article>');
    
    }).call(this);
    
  }).call(__obj);
  __obj.safe = __objSafe, __obj.escape = __escape;
  return __out.join('');
}}, "views/_menu": function(exports, require, module) {module.exports = function(__obj) {
  if (!__obj) __obj = {};
  var __out = [], __capture = function(callback) {
    var out = __out, result;
    __out = [];
    callback.call(this);
    result = __out.join('');
    __out = out;
    return __safe(result);
  }, __sanitize = function(value) {
    if (value && value.ecoSafe) {
      return value;
    } else if (typeof value !== 'undefined' && value != null) {
      return __escape(value);
    } else {
      return '';
    }
  }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
  __safe = __obj.safe = function(value) {
    if (value && value.ecoSafe) {
      return value;
    } else {
      if (!(typeof value !== 'undefined' && value != null)) value = '';
      var result = new String(value);
      result.ecoSafe = true;
      return result;
    }
  };
  if (!__escape) {
    __escape = __obj.escape = function(value) {
      return ('' + value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    };
  }
  (function() {
    (function() {
      var section, title, _ref;
    
      __out.push('<nav>\n\t<img src="/images/harta.png" alt="">\n\t');
    
      _ref = this.menu;
      for (section in _ref) {
        title = _ref[section];
        __out.push('\n\t<li id="');
        __out.push(__sanitize(section));
        __out.push('">\n\t\t<a href="/');
        __out.push(__sanitize(section));
        __out.push('"><img src="/images/');
        __out.push(__sanitize(section));
        __out.push('.png" alt=""></a>\n\t</li>\n\t');
      }
    
      __out.push('\n</nav>');
    
    }).call(this);
    
  }).call(__obj);
  __obj.safe = __objSafe, __obj.escape = __escape;
  return __out.join('');
}}, "views/index": function(exports, require, module) {module.exports = function(__obj) {
  if (!__obj) __obj = {};
  var __out = [], __capture = function(callback) {
    var out = __out, result;
    __out = [];
    callback.call(this);
    result = __out.join('');
    __out = out;
    return __safe(result);
  }, __sanitize = function(value) {
    if (value && value.ecoSafe) {
      return value;
    } else if (typeof value !== 'undefined' && value != null) {
      return __escape(value);
    } else {
      return '';
    }
  }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
  __safe = __obj.safe = function(value) {
    if (value && value.ecoSafe) {
      return value;
    } else {
      if (!(typeof value !== 'undefined' && value != null)) value = '';
      var result = new String(value);
      result.ecoSafe = true;
      return result;
    }
  };
  if (!__escape) {
    __escape = __obj.escape = function(value) {
      return ('' + value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    };
  }
  (function() {
    (function() {
      var section, title, _i, _len, _ref, _ref1;
    
      __out.push('<header>\n\t<h1>');
    
      __out.push(__sanitize(document.title));
    
      __out.push('</h1>\n\t');
    
      __out.push(DepMan.render("_menu", {
        menu: this.menu
      }));
    
      __out.push('\n</header>\n<aside></aside>\n<section>\n\t');
    
      _ref = this.menu;
      for (section in _ref) {
        title = _ref[section];
        __out.push('\n\t\t<article id="');
        __out.push(__sanitize(section));
        __out.push('">\n\t\t\t<div><div>');
        __out.push(DepMan.doc(section));
        __out.push('</div></div>\n\t\t</article>\n\t');
      }
    
      __out.push('\n\t');
    
      _ref1 = this.altmenu;
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        section = _ref1[_i];
        __out.push('\n\t\t<article id="');
        __out.push(__sanitize(section.replace(/\//g, "_")));
        __out.push('">\n\t\t\t<div><div>');
        __out.push(DepMan.doc(section));
        __out.push('</div></div>\n\t\t</article>\n\t');
      }
    
      __out.push('\n</section>\n<footer></footer>');
    
    }).call(this);
    
  }).call(__obj);
  __obj.safe = __objSafe, __obj.escape = __escape;
  return __out.join('');
}}});
