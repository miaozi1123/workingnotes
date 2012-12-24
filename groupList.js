/* by miaoxiuhong 2012-12-17
* 多级组
*/
var mulitiplyList = function(o,tag){
	var p = {
		data: function(){
			var request = $.ajax({
				url: '/js/concats/json.js',
				dataType: 'script',
				cache: 'false',
			});
			request.done(p.requestDone);
			request.fail(p.requestFail);
		},
		requestDone:function(data){
			var items = p.reorganization(eval(data).items),ulContent = [];
			if (items.length > 0) {
				$.each(items, function(i, item){
					ulContent.push('<li groupId="' + item.id + '" title="'+item.name+'"><a class="l' + item.level + '" href="javascript:;">' + p.cut(item.name,14) + '</a></li>');
				});
				
				p.ui(ulContent.join(""));
			}else{
				var li = '<li class="none">您还没有企业通讯录</li>';
				p.ui(li);
			}
		},
		requestFail:function(jqXHR, textStatus){
			throw( "Request failed: " + textStatus );
		},
		ui:function(content){
			o.html('<ul>'+ content +'</ul>');
		},
		reorganization:function(items){
			var len = items.length, itemsNew = [];
			for(var i = 0; i < len;i++){
				var ele = items[i],eleParent = items[i].parentId,level = 1;
				for(var j = 0; j < len; j++){
					var eleJ = items[j],eleJId = items[j].id,eleJParent = items[j].parentId,oldLevel = items[j].level;
					if(eleParent == eleJId){
						level = oldLevel + 1;
					}
					ele.level = level;
				}
				itemsNew.push(ele);
			}
			return itemsNew;
		},
		cut: function(value,l){
			var cutValue = value;			
			if(p.byteLength(value) > l){
				if(p.isContainNoAsscii){
					cutValue = cutValue.slice(0,l/2) + "...";
				}else{
					cutValue = cutValue.slice(0,l) + "...";
				}
				return cutValue;
			}
			else{
				return value;
			}
		},
		byteLength: function(value){
			var length = value.length; 
			for(var i = 0; i < value.length; i++){
			     if(value.charCodeAt(i) > 127){       
			        length = length + 1;
			     }       
			 }
			 return length;
		},
		isContainNoAsscii : function(value){
			var length = value.length;
			/*计算字符串实际长度，一个中文算2个字符*/
			var byteLengths = p.byteLength(value);
			return byteLengths > length;
		}
	};
	var inherit = function(p){
		if(p == null)throw TypeError();
		if(Object.create){
			return Object.create(p);
		}
		var t = typeof p;
		if(t !== "object" && t !== "function"){
			throw TypeError();
		}
		function f(){};
		f.prototype = p;
		return new f();
	}
	var m = inherit(p);
	m.requestDone = function(data){
		var items = p.reorganization(eval(data).items), ulContent = [];
		
		if (items.length > 0) {
			$.each(items, function(i, item){
				ulContent.push('<li groupId="' + item.id + '"><div class="list_control">');
				ulContent.push('<a class="list_btn_style icon_list_edit boxy_external" title="重命名" href="javascript:;"></a>');
				ulContent.push('<a href="javascript:;" class="list_btn_style icon_list_del" title="删除"></a></div>');
				ulContent.push('<span title="'+ item.name +'">' + m.cut(item.name,12) + '</span></li>');
			});
			p.ui(ulContent.join(""));
		}
		else {
			var li = '<li class="none">您还没有添加组</li>';
			p.ui(li);
		}
	}
	m.data = function(){
		var request = $.ajax({
				url: '/js/concats/json.js',
				dataType: 'script',
				cache: 'false',
			});
		request.done(m.requestDone);
		request.fail(p.requestFail);
	}
	switch(tag){
		case '1':
			p.data();
			break;
		default:
			m.data();
	}
};
