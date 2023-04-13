/*=============================================================================
 * Orange - Custom Event
 * By Hudell - www.hudell.com
 * OrangeCustomEvents.js
 * Version: 1.9
 * Free for commercial and non commercial use.
 *=============================================================================*/
 /*:
 * @plugindesc This plugin Will let you add or copy events to the current map
 *             
 * @author Hudell
 * @help
 * ============================================================================
 * Latest Version
 * ============================================================================
 * 
 * Get the latest version of this script on 
 * http://download.hudell.com/OrangeCustomEvents.js
 * 
 *=============================================================================*/

var Imported = Imported || {};



var OrangeCustomEvents = OrangeCustomEvents || {};
var $gameInterp = new Game_Interpreter();

function Game_Custom_Event() {
  this.initialize.apply(this, arguments);
}
Game_Custom_Event.prototype = Object.create(Game_Event.prototype);
Game_Custom_Event.prototype.constructor = Game_Custom_Event;

(function($) {
  "use strict";

  //----------------------------------------------.
  //----------------------------------------------|
  // PROTECTED METHODS                            |
  //----------------------------------------------|
  //----------------------------------------------|

  $.getAnotherMapData = function(mapId, callback) {
    var variableName = '$Map%1'.format(mapId.padZero(3));
    var filename = 'data/Map%1.json'.format(mapId.padZero(3));

    var onLoad = function(xhr, filePath, name) {
      if (xhr.status < 400) {
        window[name] = JSON.parse(xhr.responseText);
        DataManager.onLoad(window[name]);

        callback();
      }
    };

    if (window[variableName] === undefined || window[variableName] === null) {
      MVCommons.ajaxLoadFileAsync(filename, undefined, onLoad);
    } else {
      callback();
    }
  };


  //----------------------------------------------.
  //----------------------------------------------|
  // PUBLIC METHODS                               |
  //----------------------------------------------|
  //----------------------------------------------|

  //----------------------------------------------
  // Game_Custom_Event
  //----------------------------------------------
  Game_Custom_Event.prototype.initialize = function(mapId, eventId, eventData) {
    this._eventData = eventData;
    Game_Event.prototype.initialize.call(this, mapId, eventId);
  };

  Game_Custom_Event.prototype.event = function() {
    return this._eventData;
  };

  Game_Custom_Event.prototype.revive = function(data) {
    return new Game_Custom_Event(data.mapId, data.id, data.eventData);
  };

  //----------------------------------------------
  // Game_System
  //----------------------------------------------
  Game_System.prototype.clearSelfSwitches = function(mapId, eventId) {
    var switches = ["A", "B", "C", "D"];

    switches.forEach(function(switchId) {
      var key = [mapId, eventId, switchId];
      $gameSelfSwitches.setValue(key, false);
    });
  };

  Game_System.prototype.initCustomEvents = function(mapId) {
    if (this._customEvents === undefined) {
      this._customEvents = {};
    }

    if (this._customEvents[mapId] === undefined) {
      this._customEvents[mapId] = {};
    }
  };

  Game_System.prototype.addCustomEvent = function(mapId, event) {
    this.initCustomEvents(mapId);
    this.clearSelfSwitches(mapId, event.id);
    this._customEvents[mapId][event.id] = event;

    return event;
  };

    Game_System.prototype.removeCustomEvent = function (mapId, eventId) {
    this.initCustomEvents(mapId);
    this.clearSelfSwitches(mapId, eventId);
      delete this._customEvents[mapId][eventId];
  };

  Game_System.prototype.clearCustomEvents = function(mapId) {
    this.initCustomEvents();
    this._customEvents[mapId] = {};
  };

  Game_System.prototype.getCustomEvents = function(mapId) {
    this.initCustomEvents();
    return this._customEvents[mapId];
  };

  //----------------------------------------------
  // Game_Map
  //----------------------------------------------
  Game_Map.prototype.getIndexForNewEvent = function() {
    var index = 1;
    while (index < this._events.length && !!this._events[index]) {
      index++;
    }

    return index;
  };

  Game_Map.prototype.addEvent = function(eventData, temporary, index) {
    if (temporary === undefined) {
      temporary = false;
    }

    if (index === undefined) {
      index = this.getIndexForNewEvent();
    }

    eventData.id = index;
    var gameEvent = new Game_Custom_Event(this._mapId, index, eventData);
    $gameSystem.clearSelfSwitches(this._mapId, index);

    this._events[index] = gameEvent;

    if (SceneManager._scene instanceof Scene_Map) {
        var sprite = new Sprite_Character(gameEvent);
        SceneManager._scene._spriteset._characterSprites.push(sprite);
        if (sprite._character._indData) SceneManager._scene._spriteset._indicatorsField.addChild(new EventIndicators(sprite));
        SceneManager._scene._spriteset._tilemap.addChild(sprite);
    }
    //인덱스추가
    //gameEvent._characterIndex = eventData.pages[0]._characterIndex;
    
    if (temporary === false) {
      $gameSystem.addCustomEvent(this._mapId, eventData);
    }

    return gameEvent;
  };

  var oldGameMap_setupEvents = Game_Map.prototype.setupEvents;
  Game_Map.prototype.setupEvents = function() {
    oldGameMap_setupEvents.call(this);

    var customEvents = $gameSystem.getCustomEvents(this._mapId);
    for (var eventId in customEvents) {
      if (customEvents[eventId] === undefined) continue;
        var newEventId = eventId;// this.getIndexForNewEvent(); bug fix

      customEvents[eventId].eventId = newEventId;
      this._events[newEventId] = new Game_Custom_Event(this._mapId, newEventId, customEvents[eventId]);
    }
  };

  Game_Map.prototype.addEventAt = function(eventData, x, y, temporary, index) {
    eventData.x = x;
    eventData.y = y;
    return this.addEvent(eventData, temporary, index);
  };

  Game_Map.prototype.spawnEvent = function(eventData, tileList, temporary) {
    for (var i = 0; i < tileList.length; i++) {
      var newEventData = JsonEx.makeDeepCopy(eventData);
      newEventData.x = tileList[i].x;
      newEventData.y = tileList[i].y;
      this.addEvent(newEventData, temporary);
    }
  };

  Game_Map.prototype.getEventData = function(eventIdOrigin) {
    var event = $dataMap.events[eventIdOrigin];
    if (event === undefined) return undefined;

    return JsonEx.makeDeepCopy(event);
  };

  Game_Map.prototype.getEventDataFrom = function(mapIdOrigin, eventIdOrigin, callback) {
    $.getAnotherMapData(mapIdOrigin, function() {
      var variableName = '$Map%1'.format(mapIdOrigin.padZero(3));

      if (window[variableName] === undefined || window[variableName] === null) return;

      var event = window[variableName].events[eventIdOrigin];
      if (event === undefined) return;

        var eventData = JsonEx.makeDeepCopy(event);
        //console.log("may error", mapIdOrigin, eventIdOrigin)
      if (eventData.note) {
        DataManager.extractMetadata(eventData);
      }
      callback.call(this, eventData);
    });    
  };

  Game_Map.prototype.copyEvent = function(eventIdOrigin, x, y, temporary, newIndex) {
    var eventData = this.getEventData(eventIdOrigin);
    if (eventData) {
      $gameMap.addEventAt(eventData, x, y, temporary, newIndex);
    }
  };

  Game_Map.prototype.getRegionTileList = function(regionId) {
    var tileList = [];

    for (var x = 0; x < $gameMap.width(); x++) {
      for (var y = 0; y < $gameMap.height(); y++) {
        if ($gameMap.eventsXy(x, y).length === 0) {
          if ($gameMap.regionId(x, y) == regionId) {
            tileList.push({x : x, y : y});
          }
        }
      }
    }

    return tileList;
  };

  Game_Map.prototype.getRandomRegionTile = function(regionId) {
    var tileList = this.getRegionTileList(regionId);

    if (tileList.length > 0) {
      var index = Math.randomInt(tileList.length);
      return tileList[index];
    }

    return undefined;
  };

  Game_Map.prototype.copyEventToRegion = function(eventIdOrigin, regionId, temporary, newIndex) {
    var tile = this.getRandomRegionTile(regionId);
    if (tile !== undefined) {
      this.copyEvent(eventIdOrigin, tile.x, tile.y, temporary, newIndex);
    }
  };

  Game_Map.prototype.copyEventFrom = function(mapIdOrigin, eventIdOrigin, x, y, temporary, newIndex, callback) {
    this.getEventDataFrom(mapIdOrigin, eventIdOrigin, function(eventData) {
      var event = $gameMap.addEventAt(eventData, x, y, temporary, newIndex);

      if (!!callback) {
        callback.call(this, event);
      }
    });
  };

  Game_Map.prototype.copyItemFrom = function(mapIdOrigin, eventIdOrigin, item, x, y, temporary, newIndex, callback) {
	    this.getEventDataFrom(mapIdOrigin, eventIdOrigin, function(eventData) {
	    	switch (item.type) {
	    	case 0 :
	    		eventData.pages[0].image.characterName = "item_test1";
	    		break;
	    	case 1 :
	    		eventData.pages[0].image.characterName = "item_test2";
		    	break;
	    	case 2 :
	    		eventData.pages[0].image.characterName = "item_test3";
                    break;
                case 97:
                    eventData.pages[0].image.characterName = "item_scroll";
                    break;
                case 98:
                    eventData.pages[0].image.characterName = "@Coin-item_test98";
                    break;
                case 99:
                    eventData.pages[0].image.characterName = "@Coin-item_test99";
                    break;
                case 100:
                    eventData.pages[0].image.characterName = "@Coin-item_test100";
                    break;
                case 101:
                    eventData.pages[0].image.characterName = "item_stat";
                    break;
                case 102:
                    eventData.pages[0].image.characterName = "item_stat2";
                    break;
                case 103:
                    eventData.pages[0].image.characterName = "item_stat3";
                    break;
                case 106:
                    eventData.pages[0].image.characterName = "item_material";
                    break;
                default:
                    item.type = 106;
                    eventData.pages[0].image.characterName = "item_material";
                    break;
            }
            if (item.type == 106) {
                for (var i = 0; i < eventData.pages.length; i++) {
                    var id = item.baseItemId ? item.baseItemId - 100 : item.id - 100;// + Math.floor((item.id - 101) / 5);
                    eventData.pages[0]._characterIndex = id;
                    eventData.item = item;
                    eventData.pages[0].image.characterIndex = 4 * (Math.floor((id - 1) / 48)) + Math.floor((id - 1) / 3) % 4;
                    eventData.pages[0].image.direction = 2 * (1 + Math.floor((id - 1) / 12) % 4);
                    eventData.pages[0].image.pattern = (id - 1) % 3;
                    eventData.pages[0].directionFix = true;
                }
            } else if (item.baseItemId) {
                eventData.pages[0]._characterIndex = item.baseItemId;
                eventData.item = item;
                eventData.pages[0].image.characterIndex = 4 * (Math.floor((item.baseItemId - 1) / 48)) + Math.floor((item.baseItemId - 1) / 3) % 4;
                eventData.pages[0].image.direction = 2 * (1 + Math.floor((item.baseItemId - 1) / 12) % 4);
                eventData.pages[0].image.pattern = (item.baseItemId - 1) % 3;
                eventData.pages[0].directionFix = true;
            } else if (item.id == 97) {
                for (var i = 0; i < eventData.pages.length; i++) {
                    var id = 1;// + Math.floor((item.id - 101) / 5);
                    eventData.pages[0]._characterIndex = id;
                    eventData.item = item;
                    eventData.pages[0].image.characterIndex = 4 * (Math.floor((id - 1) / 48)) + Math.floor((id - 1) / 3) % 4;
                    eventData.pages[0].image.direction = 2 * (1 + Math.floor((id - 1) / 12) % 4);
                    eventData.pages[0].image.pattern = (id - 1) % 3;
                    eventData.pages[0].directionFix = true;
                }
            } else if (item.id > 196) {
                var id = item.id - 196;
                eventData.pages[0]._characterIndex = id;
                eventData.item = item;
                eventData.pages[0].image.characterIndex = 4 * (Math.floor((id - 1) / 48)) + Math.floor((id - 1) / 3) % 4;
                eventData.pages[0].image.direction = 2 * (1 + Math.floor((id - 1) / 12) % 4);
                eventData.pages[0].image.pattern = (id - 1) % 3;
                eventData.pages[0].directionFix = true;
            } else if (item.id > 100) {
                var id = item.id - 100;
                eventData.pages[0]._characterIndex = id;
                eventData.item = item;
                eventData.pages[0].image.characterIndex = 4 * (Math.floor((id - 1) / 48)) + Math.floor((id - 1) / 3) % 4;
                eventData.pages[0].image.direction = 2 * (1 + Math.floor((id - 1) / 12) % 4);
                eventData.pages[0].image.pattern = (id - 1) % 3;
                eventData.pages[0].directionFix = true;
            } else {
                eventData.pages[0]._characterIndex = item.id;
                eventData.item = item;
                eventData.pages[0].image.characterIndex = 4 * (Math.floor((item.id - 1) / 48)) + Math.floor((item.id - 1) / 3) % 4;
                eventData.pages[0].image.direction = 2 * (1 + Math.floor((item.id - 1) / 12) % 4);
                eventData.pages[0].image.pattern = (item.id - 1) % 3;
                eventData.pages[0].directionFix = true;
            }
            //eventData.xPlus = Math.random() - (Math.random());
	    	//eventData.yPlus = Math.random() - (Math.random());
	        var event = $gameMap.addEventAt(eventData, x, y, temporary, newIndex);
	    	//event.jump(Math.random() - (Math.random()), Math.random() - (Math.random()));
            //점프 대체 이벤트내용으로, 없앰
            /*
	    	var xPlus = Math.random() - Math.random();
            var yPlus = Math.random() - Math.random();
            if (xPlus > 0) xPlus += 0.5;
            else xPlus -= 0.5;
            if (yPlus > 0) yPlus += 0.5;
            else yPlus -= 0.5;
	        event._x += xPlus;
	    	event._y += yPlus;
	    	var distance = Math.round(Math.sqrt(xPlus * xPlus + yPlus * yPlus));
	    	event._jumpPeak = 14 + distance - event._moveSpeed;
	    	event._jumpCount = event._jumpPeak * 2;
	    	event.resetStopCount();
            event.straighten();*/
            // 파티클 효과 일단 없앰
	    	/*args =('particleSet '+event._eventId+' below Item_' +item.rarity+ ' particle').split(" ");
	        command = args.shift();
	        $gameInterp.pluginCommand(command, args);
	        var args =('particleOn '+event._eventId+' Item_'+item.rarity).split(" ");
	        var command = args.shift();
	        $gameInterp.pluginCommand(command, args);*/
            //console.log(event)
	      if (!!callback) {
	        callback.call(this, event);
	      }
	    });
  };

    Game_Map.prototype.copyShopItems = function (eventId) {
        var event = $gameMap.event(eventId);
        var item = null;
        var ox = 0;
        var oy = 0.2;
        for (var i = 0; i < PRG._maryGoods.length; i++) {
            item = PRG._maryGoods[i];
            if (item[0] == 1) {
                item = DataManager.registerNewItem($dataWeapons[item[1]]);
                item.type = 1
                ox = -0.7 * (Math.ceil((i + 1) / 2)) * Math.pow(-1, i);
                if ($gameVariables._data[104] < 7 && $gameVariables._data[104] > 3 && i == 4) ox = 0;
                PRG.wUndefinedEnchant(item)
                $gameMap.copyItemFrom(1, 3, item, event.x + ox, event.y + oy)
            }
            else if (item[0] == 2) {
                item = DataManager.registerNewItem($dataArmors[item[1]]);
                item.type = 2
                ox = -0.7 * (Math.ceil((i + 1) / 2)) * Math.pow(-1, i);
                if ($gameVariables._data[104] < 7 && $gameVariables._data[104] > 3 && i == 4) ox = 0;
                $gameMap.copyItemFrom(1, 4, item, event.x + ox, event.y + oy)
            }
            else if (item[0] == 3) {
                item = $dataItems[item[1]]
                item.type = 106
                ox = -0.7 * (Math.ceil((i + 1) / 2)) * Math.pow(-1, i);
                if ($gameVariables._data[104] < 7 && $gameVariables._data[104] > 3 && i == 4) ox = 0;
                $gameMap.copyItemFrom(1, 2, item, event.x + ox, event.y + oy)
            } else {
                item = $dataItems[item[1]]
                item.type = 0
                ox = -0.7 * (Math.ceil((i + 1) / 2)) * Math.pow(-1, i);
                if ($gameVariables._data[104] < 7 && $gameVariables._data[104] > 3 && i == 4) ox = 0;
                if (item.id == 11 || item.id == 12) $gameMap.copyItemFrom(1, 5, item, event.x + ox, event.y + oy)
            }
        } 
    };

	Game_Map.prototype.copyEventObject = function (targetEventId) {
		var locEvent = $gameMap.event(targetEventId);
		var item = null;
		var ox = 0;
		var oy = 0.2;

		var rand = Math.floor(Math.random() * PRG._events.length);
		var eventCase = PRG._events.splice(rand, 1)[0];
		var eventId = 1;


		switch (eventCase) {
			case 0: //chest
				eventId = 61;
				$gameMap.copyEventFrom(1, eventId, locEvent.x + ox, locEvent.y + oy)
				break;
			case 1: //foun
				if (Math.random() > 0.7)
					eventId = 62;
				else eventId = 63;
				$gameMap.copyEventFrom(1, eventId, locEvent.x + ox, locEvent.y + oy)
				break;
			case 2: //god 이번버전에선 모루로 대체
                eventId = 64;
                $gameVariables._data[96] = 0;
				$gameMap.copyEventFrom(1, eventId, locEvent.x + ox, locEvent.y + oy)
				break;
			case 3: //marble
				eventId = 65;
				$gameMap.copyEventFrom(1, eventId, locEvent.x + ox - 1, locEvent.y + oy)
				eventId = 66;
				$gameMap.copyEventFrom(1, eventId, locEvent.x + ox + 1, locEvent.y + oy)
				break;
            case 4: // mery 다음버전부터
                //eventId = 61;
                //$gameMap.copyEventFrom(1, eventId, locEvent.x + ox, locEvent.y + oy, true)
                //break;
                eventId = 67;
                $gameMap.copyEventFrom(1, eventId, locEvent.x + ox + 1, locEvent.y + oy)
                var event = $gameMap.event(eventId);
                var item = null;
                this.copyMeryItem(locEvent);
                break;
            default:
                console.log('error, event not exist', eventCase);
                eventId = 64;
                $gameVariables._data[96] = 0;
                $gameMap.copyEventFrom(1, eventId, locEvent.x + ox, locEvent.y + oy)
                break;
		}
	};

    Game_Map.prototype.copyMeryItem = function (event) {
        var itemNum = 0;
        var rarity = 0;
        var rarityRand = Math.random();
        var uncommon = 1 - 0.30 * $gamePlayer.battler().srr * (1 + $gamePlayer.battler().luc / 60);
        var rare = 1 - 0.20 * $gamePlayer.battler().srr * (1 + $gamePlayer.battler().luc / 60);
        var legend = 1 - 0.08 * $gamePlayer.battler().srr * (1 + $gamePlayer.battler().luc / 60);
        if (rarityRand > legend) rarity = 4;
        else if (rarityRand > rare) rarity = 3;
        else if (rarityRand > uncommon) rarity = 2;
        else rarity = 1;
        var item = $dataStates[PRG.getAbilityId(rarity)];
        if (rarity < 4) item.type = 101;
        else item.type = 102;
        $gameMap.copyItemFrom(1, 131, item, event.x -1, event.y + 0.9)

        rarityRand = Math.random();
        if (rarityRand > legend) rarity = 4;
        else if (rarityRand > rare) rarity = 3;
        else if (rarityRand > uncommon) rarity = 2;
        else rarity = 1;
        item = $dataStates[PRG.getAbilityId(rarity)];
        if (rarity < 4) item.type = 101;
        else item.type = 102;
        $gameMap.copyItemFrom(1, 131, item, event.x, event.y + 0.9)

        rarityRand = Math.random();
        if (rarityRand > legend) rarity = 4;
        else if (rarityRand > rare) rarity = 3;
        else if (rarityRand > uncommon) rarity = 2;
        else rarity = 1;
        item = $dataStates[PRG.getAbilityId(rarity)];
        if (rarity < 4) item.type = 101;
        else item.type = 102;
        $gameMap.copyItemFrom(1, 131, item, event.x + 1, event.y + 0.9)
    }

    Game_Event.prototype.dropRandomChestItem = function (type, rarity) {
        /*한등급 높은지 검사. 
         * 아이템 타입 검사
         * 아이템 레어도 검사
         * 열었을 때 한등급 검사를 시행, 없다면 바로 열리고 드랍 시행, 높다면 - 이펙트 연출 후 드랍 시행
         */
        var item = null;
        switch (type) {
			case 'weapon':
				var id = PRG.getWeaponId(rarity);
				if (!id) {
					rarity++;
					id = PRG.getWeaponId(rarity)
				}
				item = $dataWeapons[id];
                item.type = 1;
                item._undefinedItem = true;
                $gameMap.copyChestItemFrom(1, 44, item, this.x, this.y, false);
                break;
			case 'armor':
				var id = PRG.getArmorId(rarity);
				if (!id) {
					rarity++;
					id = PRG.getArmorId(rarity)
				}
				item = $dataArmors[id];
                item.type = 2;
                item._undefinedItem = true;
                $gameMap.copyChestItemFrom(1, 45, item, this.x, this.y, false);
                break;
            case 'accessory':
                var id = PRG.getAccessoryId(rarity);
                if (!id) {
                    rarity++;
                    id = PRG.getAccessoryId(rarity)
                }
                item = $dataArmors[id];
                item.type = 2;
                item._undefinedItem = true;
                $gameMap.copyChestItemFrom(1, 45, item, this.x, this.y, false);
                break;
            case 'magic':
				var id = PRG.getMagicId(rarity);
				if (!id) {
					rarity++;
					id = PRG.getMagicId(rarity)
				}
                item = $dataSkills[id];
                item.type = 104;
                $gameMap.copyChestItemFrom(1, 43, item, this.x, this.y, false);
                break;
            case 'stat':
                var id = PRG.getAbilityId(rarity);
                item = $dataStates[id];
                if (item.rarity < 4) item.type = 101;
                else item.type = 102;
                $gameMap.copyChestItemFrom(1, 43, item, this.x, this.y, false);
                break;
            case 'enchant':
                var id = PRG.getEnchantId(rarity);
                if (!id) {
                    rarity++;
                    id = PRG.getEnchantId(rarity)
                }
                item = $dataItems[id];
                item.type = 105;
                $gameMap.copyChestItemFrom(1, 29, item, this.x, this.y, false);
                break;
            default:
                item = $dataItems[data.stat[rarity][Math.floor(Math.random() * data.stat[rarity].length)]];
                item.type = 0;
                $gameMap.copyChestItemFrom(1, 43, item, this.x, this.y, false);
                break;
        }
    }

    Game_Map.prototype.copyChestItemFrom = function (mapIdOrigin, eventIdOrigin, item, x, y, temporary, newIndex, callback) {
        this.getEventDataFrom(mapIdOrigin, eventIdOrigin, function (eventData) {
            switch (item.type) {
                case 0:
                    eventData.pages[0].image.characterName = "item_test1";
                    break;
                case 1:
                    eventData.pages[0].image.characterName = "item_test2";
                    break;
                case 2:
                    eventData.pages[0].image.characterName = "item_test3";
                    break;
                case 98:
                    eventData.pages[0].image.characterName = "@Coin-item_test98";
                    break;
                case 99:
                    eventData.pages[0].image.characterName = "@Coin-item_test99";
                    break;
                case 100:
                    eventData.pages[0].image.characterName = "@Coin-item_test100";
                    break;
                case 101:
                    eventData.pages[0].image.characterName = "item_stat";
                    break;
                case 102:
                    eventData.pages[0].image.characterName = "item_stat2";
                    break;
                case 103:
                    eventData.pages[0].image.characterName = "item_stat3";
                    break;
                case 104:
                    eventData.pages[0].image.characterName = "item_magic";
                    break;
                case 105:
                    eventData.pages[0].image.characterName = "item_enchant";
                    break;
            }
            //eventData.pages[0].image.characterName = "item_test1";
            if (item.type == 105) {
                for (var i = 0; i < eventData.pages.length; i++) {
                    var id = 1;// + Math.floor((item.id - 101) / 5);
                    eventData.pages[0]._characterIndex = id;
                    eventData.item = item;
                    eventData.pages[0].image.characterIndex = 4 * (Math.floor((id - 1) / 48)) + Math.floor((id - 1) / 3) % 4;
                    eventData.pages[0].image.direction = 2 * (1 + Math.floor((id - 1) / 12) % 4);
                    eventData.pages[0].image.pattern = (id - 1) % 3;
                    eventData.pages[0].directionFix = true;
                }
            } else if (item.type == 104) {
                for (var i = 0; i < eventData.pages.length; i++) {
                    var id = 1 + Math.floor((item.id - 101)/5);
                    eventData.pages[0]._characterIndex = id;
                    eventData.item = item;
                    eventData.pages[0].image.characterIndex = 4 * (Math.floor((id - 1) / 48)) + Math.floor((id - 1) / 3) % 4;
                    eventData.pages[0].image.direction = 2 * (1 + Math.floor((id - 1) / 12) % 4);
                    eventData.pages[0].image.pattern = (id - 1) % 3;
                    eventData.pages[0].directionFix = true;
                }
            } else if (item.type == 102) {
                for (var i = 0; i < eventData.pages.length; i++) {
                    var id = item.id - 196;
                    eventData.pages[0]._characterIndex = id;
                    eventData.item = item;
                    eventData.pages[0].image.characterIndex = 4 * (Math.floor((id - 1) / 48)) + Math.floor((id - 1) / 3) % 4;
                    eventData.pages[0].image.direction = 2 * (1 + Math.floor((id - 1) / 12) % 4);
                    eventData.pages[0].image.pattern = (id - 1) % 3;
                    eventData.pages[0].directionFix = true;
                }
            } else if (item.type == 101) {
                for (var i = 0; i < eventData.pages.length; i++) {
                    var id = item.id - 100;
                    eventData.pages[0]._characterIndex = id;
                    eventData.item = item;
                    eventData.pages[0].image.characterIndex = 4 * (Math.floor((id - 1) / 48)) + Math.floor((id - 1) / 3) % 4;
                    eventData.pages[0].image.direction = 2 * (1 + Math.floor((id - 1) / 12) % 4);
                    eventData.pages[0].image.pattern = (id - 1) % 3;
                    eventData.pages[0].directionFix = true;
                }
            } else {
                for (var i = 0; i < eventData.pages.length; i++) {
                    eventData.pages[0]._characterIndex = item.id;
                    eventData.item = item;
                    eventData.pages[0].image.characterIndex = 4 * (Math.floor((item.id - 1) / 48)) + Math.floor((item.id - 1) / 3) % 4;
                    eventData.pages[0].image.direction = 2 * (1 + Math.floor((item.id - 1) / 12) % 4);
                    eventData.pages[0].image.pattern = (item.id - 1) % 3;
                    eventData.pages[0].directionFix = true;
                }
            }
            //eventData.xPlus = Math.random() - (Math.random());
            //eventData.yPlus = Math.random() - (Math.random());
            var event = $gameMap.addEventAt(eventData, x, y, temporary, newIndex);
            event._trigger = -1;
            //event.jump(Math.random() - (Math.random()), Math.random() - (Math.random()));
            //점프효과 이벤트로 대체 후 없앰
            /*
            var xPlus = Math.random() - Math.random();
            var yPlus = Math.random() - Math.random()
            if (xPlus > 0) xPlus += 1;
            else xPlus -= 1;
            event._x += xPlus;
            event._y += yPlus;
            var distance = Math.round(Math.sqrt(xPlus * xPlus + yPlus * yPlus));
            event._jumpPeak = 14 + distance - event._moveSpeed;
            event._jumpCount = event._jumpPeak * 2;
            event.resetStopCount();
            event.straighten();*/

            // 파티클 효과 일단 없앰
	    	/*args =('particleSet '+event._eventId+' below Item_' +item.rarity+ ' particle').split(" ");
	        command = args.shift();
	        $gameInterp.pluginCommand(command, args);
	        var args =('particleOn '+event._eventId+' Item_'+item.rarity).split(" ");
	        var command = args.shift();
	        $gameInterp.pluginCommand(command, args);*/
            //console.log(event)
            if (!!callback) {
                callback.call(this, event);
            }
        });
    };

	Game_Event.prototype.makeParticleStatTo = function (target, flag, value) {
		var particleStatData = {
			target : target,
			value : value
		}
		if (flag == 'hp') {
			$gameMap.copyParticleStatFrom(1, 75, particleStatData, this.x, this.y)
		} else if (flag == 'mp') {
			$gameMap.copyParticleStatFrom(1, 76, particleStatData, this.x, this.y)
		} else if (flag == 'tp') {
			$gameMap.copyParticleStatFrom(1, 77, particleStatData, this.x, this.y)
		} else {
			var num = Math.ceil(value / 10)
			var exp = Math.ceil(value/num)
			for (var i = 0; i < num; i++) {
				if (i == num - 1) exp = value - i * exp;
				particleStatData.value = exp;
				$gameMap.copyParticleStatFrom(1, 78, particleStatData, this.x, this.y)
			}
			
		}
	}

	Game_Player.prototype.makeParticleStatTo = function (target, flag, value) {
		var particleStatData = {
			target: target,
			value: value
		}
		if (flag == 'hp') {
			//if (this.battler().hp > value) this.battler().gainHp(-value);
			//else this.battler().setHp(1);
			this.battler().gainHp(-value);
			$gameMap.copyParticleStatFrom(1, 75, particleStatData, this.x, this.y)
		} else if (flag == 'mp') {
			this.battler().gainMp(-value);
			$gameMap.copyParticleStatFrom(1, 76, particleStatData, this.x, this.y)
		} else if (flag == 'tp') {
			this.battler().gainTp(-value);
			$gameMap.copyParticleStatFrom(1, 77, particleStatData, this.x, this.y)
		} else {
			$gamePlayer.battler().gainExp(-value);
			var num = Math.ceil(value / 10)
			var exp = Math.ceil(value / num)
			for (var i = 0; i < num; i++) {
				if (i == num - 1) exp = value - i * exp;
				particleStatData.value = exp;
				$gameMap.copyParticleStatFrom(1, 78, particleStatData, this.x, this.y)
			}

		}
	}

	Game_Map.prototype.copyParticleStatFrom = function (mapIdOrigin, eventIdOrigin, particleStatData, x, y, temporary, newIndex, callback) {
		this.getEventDataFrom(mapIdOrigin, eventIdOrigin, function (eventData) {
			eventData.particleStatData = particleStatData;
			var event = $gameMap.addEventAt(eventData, x, y, temporary, newIndex);
			if (!!callback) {
				callback.call(this, event);
			}
		});
	}

    Game_Player.prototype.dropUserItem = function (item, amt) {
        if (DataManager.isWeapon(item)) {
            item.type = 1;
            $gameMap.copyDropItemFrom(1, 55, item, this.x, this.y);
        } else if (DataManager.isArmor(item)) {
            item.type = 2;
            $gameMap.copyDropItemFrom(1, 56, item, this.x, this.y);

		} else {
			//if (item.meta.Augment != undefined || item.meta["Upgrade Effect"]) item.type = 105;
            //         else item.type = 0;
            if (item.baseItemId > 100) item.type = 106;
            else item.type = 0;
            $gameMap.copyDropItemFrom(1, 54, item, this.x, this.y);
        };
        $gameParty.loseItem(item, 1);
    }

    Game_Map.prototype.copyDropItemFrom = function (mapIdOrigin, eventIdOrigin, item, x, y, temporary, newIndex, callback) {
        if (item.type == undefined) {
            if (DataManager.isWeapon(item)) {
                item.type = 1;
            } else if (DataManager.isArmor(item)) {
                item.type = 2;
            }
        }
        this.getEventDataFrom(mapIdOrigin, eventIdOrigin, function (eventData) {
            switch (item.type) {
                case 0:
                    eventData.pages[0].image.characterName = "item_test1";
                    break;
                case 1:
                    eventData.pages[0].image.characterName = "item_test2";
                    break;
                case 2:
                    eventData.pages[0].image.characterName = "item_test3";
					break;
                case 106:
					eventData.pages[0].image.characterName = "item_material";
                    break;
                default:
                    item.type = 106;
                    eventData.pages[0].image.characterName = "item_material";
                    break;
            }
            if (item.type == 106) {
                for (var i = 0; i < eventData.pages.length; i++) {
                    var id = item.baseItemId ? item.baseItemId - 100 : item.id - 100;// + Math.floor((item.id - 101) / 5);
                    eventData.pages[0]._characterIndex = id;
                    eventData.item = item;
                    eventData.pages[0].image.characterIndex = 4 * (Math.floor((id - 1) / 48)) + Math.floor((id - 1) / 3) % 4;
                    eventData.pages[0].image.direction = 2 * (1 + Math.floor((id - 1) / 12) % 4);
                    eventData.pages[0].image.pattern = (id - 1) % 3;
                    eventData.pages[0].directionFix = true;
                }
            } else if (item.baseItemId) {
                    eventData.pages[0]._characterIndex = item.baseItemId;
                    eventData.item = item;
                    eventData.pages[0].image.characterIndex = 4 * (Math.floor((item.baseItemId - 1) / 48)) + Math.floor((item.baseItemId - 1) / 3) % 4;
                    eventData.pages[0].image.direction = 2 * (1 + Math.floor((item.baseItemId - 1) / 12) % 4);
                    eventData.pages[0].image.pattern = (item.baseItemId - 1) % 3;
                    eventData.pages[0].directionFix = true;
            } else {
                eventData.pages[0]._characterIndex = item.id;
                eventData.item = item;
                eventData.pages[0].image.characterIndex = 4 * (Math.floor((item.id - 1) / 48)) + Math.floor((item.id - 1) / 3) % 4;
                eventData.pages[0].image.direction = 2 * (1 + Math.floor((item.id - 1) / 12) % 4);
                eventData.pages[0].image.pattern = (item.id - 1) % 3;
                eventData.pages[0].directionFix = true;
            }
            //eventData.xPlus = Math.random() - (Math.random());
            //eventData.yPlus = Math.random() - (Math.random());
            var xPlus = (Math.random()-0.5) / 2;
            var yPlus = (Math.random()-0.5) / 2;
            var event = $gameMap.addEventAt(eventData, x + xPlus, y + yPlus, temporary, newIndex);
            event._trigger = -1;
            //event.jump(Math.random() - (Math.random()), Math.random() - (Math.random()));
            //점프효과 이벤트로 대체 후 없앰
            /*
            var xPlus = Math.random() - Math.random();
            var yPlus = Math.random() - Math.random()
            if (xPlus > 0) xPlus += 1;
            else xPlus -= 1;
            event._x += xPlus;
            event._y += yPlus;
            var distance = Math.round(Math.sqrt(xPlus * xPlus + yPlus * yPlus));
            event._jumpPeak = 14 + distance - event._moveSpeed;
            event._jumpCount = event._jumpPeak * 2;
            event.resetStopCount();
            event.straighten();*/

            // 파티클 효과 일단 없앰
	    	/*args =('particleSet '+event._eventId+' below Item_' +item.rarity+ ' particle').split(" ");
	        command = args.shift();
	        $gameInterp.pluginCommand(command, args);
	        var args =('particleOn '+event._eventId+' Item_'+item.rarity).split(" ");
	        var command = args.shift();
	        $gameInterp.pluginCommand(command, args);*/
            //console.log(event)
            if (!!callback) {
                callback.call(this, event);
            }
        });
    };

  Game_Map.prototype.copyEventFromMapToRegion = function(mapIdOrigin, eventIdOrigin, regionId, temporary, newIndex, callback) {
    var tile = this.getRandomRegionTile(regionId);
    console.log(regionId, 'regionID')
    if (tile !== undefined) {
      this.copyEventFrom(mapIdOrigin, eventIdOrigin, tile.x, tile.y, temporary, newIndex, callback);
    }    
  };

  Game_Map.prototype.spawnMapEvent = function(eventIdOrigin, regionId, temporary) {
    var eventData = this.getEventData(eventIdOrigin);
    var tileList = this.getRegionTileList(regionId);

    if (eventData && tileList) {
      this.spawnEvent(eventData, tileList, temporary);
    }
  };

  Game_Map.prototype.spawnMapEventFrom = function(mapIdOrigin, eventIdOrigin, regionId, temporary) {
    var tileList = this.getRegionTileList(regionId);

    if (tileList.length > 0) {
      this.getEventDataFrom(mapIdOrigin, eventIdOrigin, function(eventData) {
        $gameMap.spawnEvent(eventData, tileList, temporary);
      });
    }
  };

  Game_Interpreter.prototype.getNumericValue = function(stringValue) {
    if (stringValue.substr(0, 1) == '[' && stringValue.substr(-1) == ']') {
      var variableId = parseInt(stringValue.substr(1, stringValue.length - 2), 10);

      if (variableId > 0) {
        return $gameVariables.value(variableId);
      }

      return 0;
    } else {
      return parseInt(stringValue, 10);
    }
  };

  Game_Interpreter.prototype.checkCopyCommands = function(command, args) {
    if (args.length < 2) return;

    if (command.toUpperCase() !== 'COPY' && command.toUpperCase() !== 'SPAWN') return;
    if (args[0].toUpperCase() !== "EVENT") return;

    var eventIdOrigin = this.getNumericValue(args[1]);
    var mapIdOrigin = $gameMap.mapId();
    var isPosition = true;
    var x = 0;
    var y = 0;
    var regionId = 0;
    var temporary = true;
    var hasPosition = false;
    var userIndex;

    if (eventIdOrigin <= 0) return;

    var nextIndex = 2;

    if (args.length >= nextIndex + 3) {
      if (args[nextIndex].toUpperCase() == 'FROM' && args[nextIndex + 1].toUpperCase() == 'MAP') {
        mapIdOrigin = this.getNumericValue(args[nextIndex + 2]);
        nextIndex += 3;
      }
    }

    if (args.length > nextIndex && args[nextIndex].toUpperCase() == 'HERE') {
      isPosition = true;
      hasPosition = true;
      x = this.character(0).x;
      y = this.character(0).y;
      nextIndex++;

    } else if (args.length > nextIndex) {
      if (args[nextIndex].toUpperCase() !== 'TO' && args[nextIndex].toUpperCase() !== 'ON') {
        console.error('OrangeCustomEvents', 'Invalid destination', command, args);
        return;
      }

      nextIndex++;

      if (args.length > nextIndex && args[nextIndex].toUpperCase() == 'REGION') {
        isPosition = false;
        nextIndex++;
      } else if (args.length > nextIndex && args[nextIndex].toUpperCase() == 'POSITION') {
        isPosition = true;
        nextIndex++;
      }
    }
    else {
      console.error('OrangeCustomEvents', 'Incomplete command', command, args);
      return;
    }

    if (isPosition) {
      if (!hasPosition) {
        if (args.length > nextIndex && args[nextIndex].toUpperCase() == 'PLAYER') {
          x = $gamePlayer.x;
          y = $gamePlayer.y;
          nextIndex++;
        } else if (args.length >= nextIndex + 2) {
          x = this.getNumericValue(args[nextIndex]);
          y = this.getNumericValue(args[nextIndex + 1]);

          nextIndex += 2;
        }
        else {
          console.error('OrangeCustomEvents', 'What position?', command, args);
        }
      }
    }
    else {
      if (args.length > nextIndex) {
        regionId = this.getNumericValue(args[nextIndex]);
        nextIndex++;
      }
      else {
        console.error('OrangeCustomEvents', 'What region?', command, args);
      }
    }

    if (args.length > nextIndex + 2) {
      if (args[nextIndex].toUpperCase().startsWith('WITH') && args[nextIndex + 1].toUpperCase().startsWith('ID')) {
        userIndex = this.getNumericValue(args[nextIndex + 2]);
        nextIndex += 3;
      }
    }

    if (args.length > nextIndex) {
      if (args[nextIndex].toUpperCase().startsWith('TEMP')) {
        temporary = true;
        nextIndex++;
      } else if (args[nextIndex].toUpperCase() == 'SAVE') {
        temporary = false;
        nextIndex++;
      }
    }

    if (isPosition) {
      if (mapIdOrigin == $gameMap.mapId()) {
        $gameMap.copyEvent(eventIdOrigin, x, y, temporary, userIndex);
      } else {
        $gameMap.copyEventFrom(mapIdOrigin, eventIdOrigin, x, y, temporary, userIndex);
      }
    }
    else {
      if (command.toUpperCase() === 'COPY') {
        if (mapIdOrigin == $gameMap.mapId()) {
          $gameMap.copyEventToRegion(eventIdOrigin, regionId, temporary, userIndex);
        } else {
          $gameMap.copyEventFromMapToRegion(mapIdOrigin, eventIdOrigin, regionId, temporary, userIndex);
        }
      } else if (command.toUpperCase() === 'SPAWN') {
        if (mapIdOrigin == $gameMap.mapId()) {
          $gameMap.spawnMapEvent(eventIdOrigin, regionId, temporary);
        } else {
          $gameMap.spawnMapEventFrom(mapIdOrigin, eventIdOrigin, regionId, temporary);
        }
      }
    }
  };

  Game_Interpreter.prototype.checkDeleteCommand = function(command, args) {
    if (args.length != 2) return;

    if (command.toUpperCase() !== 'DELETE') return;
    if (args[0].toUpperCase() !== "THIS") return;
    if (args[1].toUpperCase() !== "EVENT") return;
    $gameSystem.removeCustomEvent(this._mapId, this._eventId);
    this.command214();
  };

  var oldGameInterpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    oldGameInterpreter_pluginCommand.call(this, command, args);

    this.checkCopyCommands(command, args);
    this.checkDeleteCommand(command, args);
  };
})(OrangeCustomEvents);

Imported.OrangeCustomEvents = 1.9;