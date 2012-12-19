/* by miaoxiuhong 2012-12-17
* 多级组
*/
var mulitiplyList = function(o){
	var f = {
		data: function(){
			var request = $.ajax({
				url:'/json.js',
				dataType: 'script',
				cache: 'false',
			});
			request.done(function(data) {
				var items = f.reorganization(eval(data).items),ulContent = [];
				if (items.length > 0) {
					$.each(items, function(i, item){
						ulContent.push('<li groupId="' + item.id + '"><a class="l' + item.level + '" href="javascript:;">' + item.name + '</a></li>');
					});
					f.ui(ulContent.join(""));
				}else{
					var li = '<li class="none">您还没有企业通讯录</li>';
					f.ui(li);
				}
			});
			request.fail(function(jqXHR, textStatus) {
				if(console && console.log){
					 console.log( "Request failed: " + textStatus );
				}	 
			});	
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
		}
	};
	f.data();
};
