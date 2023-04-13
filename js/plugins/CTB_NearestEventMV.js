/*=============================================================================*\
 * CTB NearestEventMV
 * By CT_Bolt
 * CTB_NearestEventMV.js
 * Version: 2.14
 * Terms of Use:
 *  Free for commercial or non-commercial use
 *
/*=============================================================================*/
var CTB = CTB || {}; CTB.NearestEventMV  = CTB.NearestEventMV || {};
var Imported = Imported || {}; Imported["CT_Bolt NearestEventMV"] = 2.14;
//=============================================================================//

/*:
 * @target MV
 * @plugindesc [RPG Maker MV] [Tier 1] [Version 2.14] [CT_Bolt - Nearest Event]
 * @author CT_Bolt
 * @desc Find the event(s) nearest the player (or any other object)
 *
 * @help
 * Script calls:
 *   $gameMap.nearestEvent()
 *   $gameMap.nearestEventId()
 *   $gameMap.eventsByDistance()
 *   $gameMap.eventIdsByDistance()
 *   $gameMap.hasNearEvent()
 *
 * To use a notetag filter:
 * Place a notetag like <target> into an event's note field
 *
 * To use a comment as a notetag use a comment like the following examples:
 *  <target: true/>
 *  <target: $gameVariables.value(30) > 5/>
 *
 * then use any of the the following script calls:
 *   $gameMap.nearestEvent('target')
 *   $gameMap.nearestEventId('target')
 *   $gameMap.eventsByDistance('target')
 *   $gameMap.eventIdsByDistance('target')
 *   $gameMap.hasNearEvent('target')
 *
 * this can also be used to check against other events like this:
 *   $gameMap.nearestEventId('target', $gameMap.event(1))
 *
 * Example of how to set a self-switch using this:
 *   $gameSelfSwitches.setValue([$gameMap._mapId, $gameMap.nearestEventId('target'), 'A'], true);
 *
 *
 */
//=============================================================================
//=============================================================================

"use strict";
(function ($_$) {
    function getPluginParameters() {var a = document.currentScript || (function() { var b = document.getElementsByTagName('script'); return b[b.length - 1]; })(); return PluginManager.parameters(a.src.substring((a.src.lastIndexOf('/') + 1), a.src.indexOf('.js')));} $_$.params = getPluginParameters();
	
	// New
	Game_CharacterBase.prototype.readCommentMVex = function(tag, ev) {		
		ev = ev || this;
		ev.commentTag = ev.commentTag || {};
		if (tag && this._pageIndex > -1){
			var RX = new RegExp('<'+tag+':\\s*(\\S+)/>');			
			var data = ev.list().filter(function(c) {return c.code === 108;}).map(function(c) {
				var v = c.parameters[0].replace(/\s+/g, '');
				var match = RX.exec(v);
				return match ? match[1] : '';  
			}).filter(function(c) {return !!c;})[0] || null;			
			ev.commentTag[tag] = data;
			return ev.commentTag[tag];
		};
	};
	
	// New
	function simpleDist(pointA, pointB) {var x = pointA._realX - pointB._realX, y = pointA._realY - pointB._realY; return Math.sqrt(x*x + y*y);}
	
	// New
	Game_Map.prototype.eventsWithTag = function(filterTag) {
		return this._events.filter(function(event) {
			if (event._pageIndex > -1){
				event.readCommentMVex(filterTag);
				event._eventData.meta = event._eventData.meta || {};
				return filterTag ? !!event && (event._eventData.meta[filterTag] || eval(event.commentTag[filterTag])) && !event._erased : !!event && !event._erased;
			};
		});
	};
	
	// New
	Game_Map.prototype.eventsByDistance = (function(filterTag, object) {	
	  var comparator = function(a,b) { return a.value - b.value; };
	  return function (filterTag, object) {
		object = object || $gamePlayer;
		let result = $gameMap.eventsWithTag(filterTag);		
		var reorder = function(e) { return result[e.index]; };
		var distanceFromArray = function(b,i) {
		  return { index: i, value: simpleDist($gamePlayer, b) };
		};
		var v = result.map(distanceFromArray).sort(comparator).map(reorder);
		var i = v.indexOf(object);
		if (i > -1){v.splice(i, 1);};
		return v;
	  };	  
	}());
	
	// New
	Game_Map.prototype.eventIdsByDistance = function(filterTag, object) {return this.eventsByDistance(filterTag, object).map(a => a._eventData.id)};	
	
	// New
	Game_Map.prototype.nearestEvent = function(filterTag, object) {
		return this.eventsByDistance(filterTag, object)[0];
	};
	
	// New
	Game_Map.prototype.nearestEventId = function(filterTag, object) {
		return this.eventIdsByDistance(filterTag, object)[0];
	};
	
	// New
	Game_Map.prototype.hasNearEvent = function(filterTag, object) {
		return !!$gameMap.nearestEvent(filterTag, object);
	};	
	
	// Alias
	$_$['Game_Event.prototype.initialize'] = Game_Event.prototype.initialize;
	Game_Event.prototype.initialize = function(mapId, eventId) {
		$_$['Game_Event.prototype.initialize'].apply(this, arguments);
		this._eventData = this._eventData || $dataMap.events[eventId];
	};

})(CTB.NearestEventMV);

