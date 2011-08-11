/**
 * 快速页面预览，提供对多个页面的快速预览，从Pad下方滑出，可以快速拉动。
 * 拉到某个页面后，标题栏中显示该页面的文字介绍。
 */
Ext.ns("SH");

SH.OverviewSheet = Ext.extend(Ext.Sheet, {
	height : '440px',
	dock : 'buttom',
	cls : 'overview',
    hideOnMaskTap : true,
	modal: false,
	stretchX: true,
	layout : 'fit',
	padding : '5 0 0 0', 
	scroll : false ,
	
	
	initComponent: function() {
		
		var pagestore = new Ext.data.Store({
		    fields: [
		             {name: 'index' , type: 'int' },
		             {name: 'snapshot', type: 'string'}
		    ],
			data : ieat.data.getPagesOfType('特色徽菜') 
		});
		
		var tapHandler = function(){
			
		}
		
		Ext.apply(this, {
			// head bar
        	dockedItems:[{
        		floatingCls : 'overview' ,
        		height: 140 ,
    			html : '<div class="pageintro"> <span>每页菜品介绍</span></div>'
    		}, {
    			xtype : 'tabbar' ,
                dock: 'bottom',
                scroll: 'horizontal',
                sortable: true,
                layout: {
                    pack: 'center'
                }
            }, {
            	xtype : 'toolbar' ,
    			dock: 'bottom',
    			heigth: '60' ,
    			layout: {
		            pack: 'center'
		        },
    		    items: [{
    	            text: '收回',
    	            ui: 'back',
    	            listeners: {
                        scope : this,
                        tap: function(){
                        	this.setVisible(false);
                        }
    	            }
    	        },{ xtype : 'spacer' } , {
    	            xtype: 'segmentedbutton',
    	            defaults : {
    	            	width : 100 ,
    	            	height : 50 
    	            } ,
    	            items: [{
    	                text: '特色徽菜',
       	                pressed : true,
    	                handler: tapHandler
    	            }, {
    	                text: '精品凉菜',
    	                handler: tapHandler
    	            }, {
    	                text: '鲜美肉类',
    	                handler: tapHandler
    	            }, {
    	                text: ' 海  鲜 ',
    	                handler: tapHandler
    	            }, {
    	                text: '特色主食 ',
    	                handler: tapHandler
    	            }, {
    	                text: '蔬  菜 ',
    	                handler: tapHandler
    	            }]
    	        },{ xtype : 'spacer' },{
    	            text: '收回',
    	            ui: 'forward',
    	            listeners: {
                        scope : this,
                        tap: function(){
                        	this.setVisible(false);
                        }
    	            }
    	        }]
            }],
    		items: [{
		    	xtype: 'pageoverview' ,
		        store: pagestore 
		    }]
        });
    	
    	SH.OverviewSheet.superclass.initComponent.apply(this, arguments);
	}
});


SH.PageOverview = Ext.extend(Ext.DataView, {
	tpl : 
		'<div class="pageovcontainer">' +
		'<tpl for=".">' +
		'<div class="pageoverview" id="{index}" '+
		'style="background : url(\'{snapshot}\') center no-repeat ;'+ 
		'height:199px ; width: 284px"></div>' +
		'</tpl>' +
		'<div class="x-clear"></div></div>' ,
		
	selectedItemCls : 'selected',
	itemSelector : 'div.pageoverview',
	emptyText : '没有缩略图数据 ...',
	autoHeight : true,
	selectedItemCls : 'selected',
	multiSelect : true,
	overItemCls : 'x-view-over',
	width: '100%',
	gridWidth : 304 ,
	
	listeners:{
		itemtap : function(dv, index, item, e){
			console.log("index:"+ index);
			Ext.dispatch({
              	controller: ieat.control ,
                action: 'openPage',
                index : index
              });	
		}
	} ,
	
	/**
     * @private
     */
    initComponent : function() {
        this.scroll = {
                direction: 'horizontal',
                friction: 0.7,
                acceleration: 25,
                snapDuration: 200 ,
                animationDuration: 200
            };
        SH.PageOverview.superclass.initComponent.call(this);
    },
	
	
	/**
     * @private
     */
    setupBar: function() {
    	this.scroller.updateBoundary();
        this.scroller.setSnap(this.gridWidth);
    },
    
    /**
     * @private
     */
    afterComponentLayout: function() {
        // 延迟执行，等待所有资源创建完成
        Ext.defer(this.setupBar, 200, this);
    },
    
    /**
     * @private
     */
    initEvents: function() {
        this.mon(this.scroller, {
            scrollend: this.onScrollEnd,
            scroll : this.onScroll,
            scope: this
        });
    },
    
    /**
     * 滚动结束事件
     * @private
     */
    onScrollEnd: function(scroller, offset) {
    	this.selectedNode = this.getNode(Math.round(offset.x / this.gridWidth));
        this.selectedIndex = this.indexOf(this.selectedNode);
        this.onSlot(this.selectedIndex , this.selectedNode);
    },
    
    onSlot :  function(index, item){
		//TODO 改变窗口内的页面样式
	},
    
    /**
     * 滚动事件
     */
    onScroll: function(scroller , offset) {
    	var grid = Math.round(offset.x / this.gridWidth) + 1 ;
    	
    	if(grid != this.grid){
    		var oldgrid = this.grid ;
    		this.grid = grid ;
    		this.onWindowChange(this.grid , oldgrid );
    	}
    },
    
    onWindowChange : function(grid, oldgrid){
    	console.log("===onWindowChagne, Grid=" + grid );
    	
    	Ext.dispatch({
          	controller: ieat.control ,
            action: 'showPageIntoInfo',
            index : grid
          });
    }

});

Ext.reg('pageoverview', SH.PageOverview);

SH.PageIntroPanel = Ext.extend(Ext.Panel , {
	
});
