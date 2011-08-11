/**
 * 注册ieat应用程序
 */ 
Ext.regApplication({
    name: "ieat",
    icon: 'images/icon.jpg',
    tabletStartupScreen: 'images/cover.jpg',
    glossOnIcon: true ,
    
    /**
     * This function is automatically called when the document has finished loading. All we do here
     * is launch the application by calling the loans controller's 'list' action (see app/controllers/loans.js)
     */
    launch: function() {
    	//播放启动动画，后台创建其他控件
    	
    	//创建数据
    	ieat.data = new SH.Data();
    	ieat.data.initData();
    	
    	//创建对象
    	Ext.apply(ieat.views , {
            cover: new SH.AnimPanel({ 
            	listeners: {
            		
            		tap:{
	            		element: 'el',
	            		fn: function(){
		            		Ext.dispatch({
		                      	controller: ieat.control ,
		                        action: 'showViewPage',
		                        animation: {type:'slide', direction:'left' ,duration: 600 }
		                      });		
	            		}
            		}
            	}
            }),
            viewpage: new SH.PageView()
        });
    	ieat.viewport = new SH.Viewport() ;
    }
});