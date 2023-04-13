/*=============================================================================
 * Orange - Instant Trigger Mouse Events
 * By Hudell - www.hudell.com
 * OrangeInstantTriggerMouseEvents.js
 * Version: 1.0
 * Free for commercial and non commercial use.
 *=============================================================================*/
 /*:
 * @plugindesc This plugin will trigger events instantly when you click on them
 * @author Hudell
 *
 * @help
 * ============================================================================
 * Latest Version
 * ============================================================================
 * 
 * Get the latest version of this script on
 * http://link.hudell.com/trigger-mouse-events
 * 
 *=============================================================================*/
var Imported = Imported || {};
var OrangeInstantTriggerMouseEvents = OrangeInstantTriggerMouseEvents || {};

(function($) {
  "use strict";

    Scene_Map.prototype.tryTriggeringEvent = function () {
        var eventStart = false;
        if ($gameMap.isAnyEventStarting() || $gameMap.isEventRunning() || !$gamePlayer.canStartLocalEvents() || SceneManager.isSceneChanging() || $gameSystem._prgMapOpened) {
      return false;
    }
      // TODO 줌했을때 줌만큼 터치거리를 계산해야함
    if (TouchInput.isTriggered() || this._touchCount > 0) {
      if (TouchInput.isPressed()) {
          if (this._touchCount === 0 || this._touchCount >= 15) {
          var x = $gameMap.canvasToMapX(TouchInput.x);
            var y = $gameMap.canvasToMapY(TouchInput.y);
            var px = $gameMap.canvasToMapPX(TouchInput.x)
            var py = $gameMap.canvasToMapPY(TouchInput.y)
            var events = $gameMap.events().filter(function (event) {
                if (Number.isInteger(event._x) && Number.isInteger(event._y)) {
                    return event.pos(x, y);
                }
                else {
                    var ec = event.collider();
                    return ec.x + ec._offset.x < px && ec.x + ec._offset.x + ec.width > px && ec.y + ec._offset.y < py && ec.y + ec._offset.y + ec.height > py;
                }

            })
          if (events.length === 0) {
            return false;
          }

            for (var i = 0; i < events.length; i++) {
            if (events[i].isTriggerIn([0]) && 
            		Math.pow($gamePlayer.x - events[i]._realX,2) + 
            		Math.pow($gamePlayer.y - events[i]._realY,2) < 1.4) {
                events[i].start();
                eventStart = true;
            }
          }
        }
      }
    }

    return false;
  };

  var oldSceneMap_processMapTouch = Scene_Map.prototype.processMapTouch;
  Scene_Map.prototype.processMapTouch = function() {
    if (!this.tryTriggeringEvent()) {
      oldSceneMap_processMapTouch.call(this);
    }
  };
})(OrangeInstantTriggerMouseEvents);

// If MVCommons is imported, register the plugin with it's PluginManager.
if (Imported['MVCommons'] !== undefined) {
  PluginManager.register("OrangeInstantTriggerMouseEvents", "1.0.0", "This plugin will trigger events instantly when you click on them", {
    email: "plugins@hudell.com",
    name: "Hudell",
    website: "http://www.hudell.com"
  }, "2015-10-22");
} else {
  Imported["OrangeInstantTriggerMouseEvents"] = true;
}
