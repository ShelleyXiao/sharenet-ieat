Ext.ns("SH");

SH.Viewport = Ext.extend(Ext.Panel, {
    fullscreen: true,
    layout: 'card',
    cardSwitchAnimation: 'slide',
    
    initComponent: function() {
    	

		
    	//put instances of cards into viewport
    	Ext.apply(this, {
        	// head bar
        	dockedItems:[{
    		    xtype: 'ieatheadbar',
    		    title: '标题栏'
    		}] ,
    		
            items: [
               ieat.views.viewpage  , 
               ieat.views.cover 
            ]
        });
    	
    	SH.Viewport.superclass.initComponent.apply(this, arguments);
    }

});
