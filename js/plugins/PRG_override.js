//Override
var Imported = Imported || {};

if (Imported.MVCommons === undefined) {
    var MVCommons = {};

    (function ($) {
		$.ajaxLoadFileAsync = function (filePath, mimeType, onLoad, onError) {
			mimeType = mimeType || "application/json";
			var xhr = new XMLHttpRequest();
			var name = '$' + filePath.replace(/^.*(\\|\/|\:)/, '').replace(/\..*/, '');
			xhr.open('GET', filePath);
			if (mimeType && xhr.overrideMimeType) { xhr.overrideMimeType(mimeType); }
			if (onLoad === undefined) {
				onLoad = function (xhr, filePath, name) {
					if (xhr.status < 400) {
						window[name] = JSON.parse(xhr.responseText); DataManager.onLoad(window[name]);
					}
				};
			}
			if (onError === undefined) {
				onError = function () { DataManager._errorUrl = DataManager._errorUrl || filePath; };
			} xhr.onload = function () {
				onLoad.call(this, xhr, filePath, name);
			};
			xhr.onerror = onError;
			window[name] = null;
			xhr.send();
		};
    })(MVCommons);
}

(function () {

	// rpg_core.js
	
	//변경 : 프레스2 추가
	var Alias_TouchInput_clear = TouchInput.clear;
	TouchInput.clear = function() {
	    Alias_TouchInput_clear.call(this);
		this._mousePressed2 = false;
	};

    TouchInput.isTriggered = function () {
        return Input.preferGamepad() ? Input.isTriggered('$L2') : this._triggered;
    };

    TouchInput.isCancelled = function () {
        return Input.preferGamepad() ? Input.isTriggered('$R2') : this._cancelled;
    };

    TouchInput.isPressed = function () {
        return Input.preferGamepad() ? Input.isPressed('$L2') : this._mousePressed;
    };

    TouchInput.isReleased = function () {
        return Input.preferGamepad() ? !Input._currentState['$R2'] : this._released;
    };

	//변경 : 프레스2 추가
	TouchInput.isPressed2 = function () {
        return Input.preferGamepad() ? Input.isPressed('$R2') : this._mousePressed2;
	};
	    
	//변경 : 오른쪽클릭에 프레스2 추가

	var WindowMessage_terminateMessage = Window_Message.prototype.terminateMessage;
	Window_Message.prototype.terminateMessage = function () {
		WindowMessage_terminateMessage.call(this);
		TouchInput._mousePressed = false;
	};

	TouchInput._onLeftButtonDown = function (event) {
		var x = Graphics.pageToCanvasX(event.pageX);
		var y = Graphics.pageToCanvasY(event.pageY);
		if (Graphics.isInsideCanvas(x, y)) {
			this._mousePressed = true;
			this._pressedTime = 0;
			this._onTrigger(x, y);
		}
		// TouchInput.setCursor('pointer');
	};

	TouchInput._onRightButtonDown = function(event) {
	    var x = Graphics.pageToCanvasX(event.pageX);
	    var y = Graphics.pageToCanvasY(event.pageY);
	    if (Graphics.isInsideCanvas(x, y)) {
			this._mousePressed2 = true;
	        if(Input.isPressed('shift')) this._mouseTriggered2 = true;
	        this._onCancel(x, y);
	    }
	};
	    
	//변경 : 버튼2 리슨 추가
	TouchInput._onMouseUp = function(event) {
	    if (event.button === 0) {
	        var x = Graphics.pageToCanvasX(event.pageX);
	        var y = Graphics.pageToCanvasY(event.pageY);
	        this._mousePressed = false;
	        this._onRelease(x, y);
	    }
	    else if (event.button === 2) {
	    	var x = Graphics.pageToCanvasX(event.pageX);
	        var y = Graphics.pageToCanvasY(event.pageY);
            this._mousePressed2 = false;
            this._mouseTriggered2 = false;
	        this._onRelease(x, y);
	    }
    };

	TouchInput.update = function () {
		this._triggered = this._events.triggered;
		this._cancelled = this._events.cancelled;
		this._moved = this._events.moved;
		this._released = this._events.released;
		this._wheelX = this._events.wheelX;
		this._wheelY = this._events.wheelY;
		this._events.triggered = false;
		this._events.cancelled = false;
		this._events.moved = false;
		this._events.released = false;
		this._events.wheelX = 0;
		this._events.wheelY = 0;
		if (this.isPressed() || Input.isPressed('$L2')) {
			if (Input.isTriggered('$L2')) this._pressedTime = 0;
			else this._pressedTime++;
		}
	};

    //변경 : shouldPrevent tab키 추가
    var Alias_Input_shouldPreventDefault = Input._shouldPreventDefault;
    Input._shouldPreventDefault = function (keyCode) {
        if (keyCode === 9) return true;
        Alias_Input_shouldPreventDefault.call(this);

    };
	// rpg_Object.js

    //Game_Action
    Game_Action.prototype.itemEffectLearnSkill = function (target, effect) {
        if (target.isActor()) {
            target.learnSkill(effect.dataId);
            this.makeSuccess(target);
        }
    };

    Alias_Game_Action_ItemEffectRecoverHp = Game_Action.prototype.itemEffectRecoverHp;
    Game_Action.prototype.itemEffectRecoverHp = function (target, effect) {
        Alias_Game_Action_ItemEffectRecoverHp.call(this, target, effect);
        var value = String((target.mhp * effect.value1 + effect.value2) * target.rec);
        if (value > 0) {
            QABSManager.startPopup('QABS-HEAL', {
                string: value,
                oy: $gamePlayer.battler()._popupOY,
                //bindTo: this._character.charaId(),
                x: $gamePlayer.cx(),
                y: $gamePlayer.cy(),
                duration: 80
            });
        }
        if (target.isStateAffected(141)) {
            target.gainHp(1);
            QABSManager.startPopup('QABS-HEAL', {
                string: String(1),
                oy: $gamePlayer.battler()._popupOY,
                //bindTo: this._character.charaId(),
                x: $gamePlayer.cx(),
                y: $gamePlayer.cy(),
                duration: 40
            })
        }
    };

    Alias_Game_Action_ItemEffectRecoverMp = Game_Action.prototype.itemEffectRecoverMp;
    Game_Action.prototype.itemEffectRecoverMp = function (target, effect) {
        Alias_Game_Action_ItemEffectRecoverMp.call(this, target, effect);
        var value = String((target.mmp * effect.value1 + effect.value2) * target.rec);
        if (value > 0) {
            QABSManager.startPopup('QABS-MP', {
                string: value,
                oy: $gamePlayer.battler()._popupOY,
                //bindTo: this._character.charaId(),
                x: $gamePlayer.cx(),
                y: $gamePlayer.cy(),
                duration: 80
            });
        }
    };

	Game_Action.prototype.applyCritical = function (damage) {
		if (this.item().damage.elementId == 5) return damage * (2.5 + $gamePlayer.battler().cdr);
		else return damage * (2 + $gamePlayer.battler().cdr);
    };

	Graphics._requestFullScreen = function () {
		var element = document.body;
		if (element.requestFullScreen) {
			element.requestFullScreen();
		} else if (element.mozRequestFullScreen) {
			element.mozRequestFullScreen();
		} else if (element.webkitRequestFullScreen) {
			element.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
		} else if (element.msRequestFullscreen) {
			element.msRequestFullscreen();
		}
		this.fullScreen = true;
	};

	Graphics._cancelFullScreen = function () {
		if (document.cancelFullScreen) {
			document.cancelFullScreen();
		} else if (document.mozCancelFullScreen) {
			document.mozCancelFullScreen();
		} else if (document.webkitCancelFullScreen) {
			document.webkitCancelFullScreen();
		} else if (document.msExitFullscreen) {
			document.msExitFullscreen();
		}
		this.fullScreen = false;
	};

    Game_Action.prototype.evalDamageFormula = function (target) {
        try {
            var item = this.item();
            var a = this.subject();
            var b = target;
            var v = $gameVariables._data;
            var sign = ([3, 4].contains(item.damage.type) ? -1 : 1);
            if (this.item().damage.elementId == 11) {
                if (a == $gamePlayer.battler()) {
                    var value = Math.max(Math.pow(eval(item.damage.formula), 2) * a.atk * (1 - (b.def * 1 / (100 + b.def))) * 0.6 * item.successRate / 100, 1) * sign;
                } else var value = Math.max(eval(item.damage.formula), 0) * sign;
            } else var value = Math.max(eval(item.damage.formula), 0) * sign;
            if (isNaN(value)) value = 0;
            return value;
        } catch (e) {
            return 0;
        }
    };

	Game_Action.prototype.applyVariance = function (damage, variance) {
		variance = this.subject().bal >= 0 ? variance * (1 - this.subject().bal/100) : variance - this.subject().bal;
        var amp = Math.floor(Math.max(Math.abs(damage) * variance / 100, 0));
        var v = Math.randomInt(amp + 1) - amp;
        return damage >= 0 ? damage + v : damage - v;
    };

	Game_Enemy.prototype.dropItemRate = function () {
		return $gamePlayer.battler().idr > 0 ? 1 + $gamePlayer.battler().idr : 1;
	};

	//변경 : 스윗치10번 캔무브
	Game_Player.prototype.canMove = function() {
	    if ($gameMap.isEventRunning() || $gameMessage.isBusy()) {
	        return false;
	    }
	    if (this.isMoveRouteForcing() || this.areFollowersGathering()) {
	        return false;
	    }
	    if (this._vehicleGettingOn || this._vehicleGettingOff) {
	        return false;
	    }
	    if (this.isInVehicle() && !this.vehicle().canMove()) {
	        return false;
	    }
	    if ($gameSwitches.value(10))
	    	return false;
	    return true;
    };

	var alias_GamePlayerReservveTransfer = Game_Player.prototype.reserveTransfer;
	Game_Player.prototype.reserveTransfer = function (mapId, x, y, d, fadeType) {
		//if (this._activeSkills && this._activeSkills.length > 0) {
		//	this.clearSkills();
		//}
		this._transferrings = true
		PKD_MI.closeInventory();
		alias_GamePlayerReservveTransfer.call(this, mapId, x, y, d, fadeType);
	};

    var alias_GamePartyInitialize = Game_Party.prototype.initialize;
    Game_Party.prototype.initialize = function () {
        alias_GamePartyInitialize.call(this);
        this._inventory = [];
    };

    Game_Party.prototype.isInventoryPermitted = function (item, amount = 1) {
        return $gameParty.leader().ivs + 5 >= $gameParty._inventory.length + amount && this.numItems(item)+amount <= this.maxItems(item);
    }

	Game_Party.prototype.gainGold = function (amount) {
		if (this.leader().isStateAffected(233)) {
			if (amount < 0) {
				this.leader()._oParamPlus[33] += 10;
				TickerManager.show('행운이 10증가했습니다(현재수치:' + String(this.leader().luc) + ')', '#adadff');
			} else if (amount > 0) {
				this.leader()._oParamPlus[33] -= 1;
				amount += this.leader().luc;
				if (this.leader()._oParamPlus[33] > 0) TickerManager.show(String('골드획득량+' + this.leader().luc), '#adadff');
				else if (this.leader()._oParamPlus[33] < 0) TickerManager.show(String('골드획득량' + this.leader().luc), '#ffadad');
				TickerManager.show('행운이 1감소합니다(현재수치:' + String(this.leader().luc) + ')', '#ffadad');
			}
		}
		this._gold = (this._gold + amount).clamp(0, this.maxGold());
		$gameSystem._ghud_visible = 120;
	};

    Game_Party.prototype.loseGold = function (amount) {
        this.gainGold(-amount);
        if (this.leader().isStateAffected(170)) {
            if (Math.random() > 0.5) {
                this.leader().gainHp(1);
                QABSManager.startPopup('QABS-HEAL', {
                    string: String(1),
                    oy: $gamePlayer.battler()._popupOY,
                    //bindTo: this._character.charaId(),
                    x: $gamePlayer.cx(),
                    y: $gamePlayer.cy(),
                    duration: 40
                })
            }
        }
	};

	
	var alias_game_actor_changeExp = Game_Actor.prototype.changeExp;
	Game_Actor.prototype.changeExp = function (exp, show) {
		alias_game_actor_changeExp.call(this, exp, show);
		if (PRG._selectSkillMode.length > 0 && !$gameSwitches._data[50]) SceneManager.push(Scene_SelectSkill);
	}
	

	var alias_game_actor_levelup = Game_Actor.prototype.levelUp;
	Game_Actor.prototype.levelUp = function () {
		alias_game_actor_levelup.call(this);
		var skillnum = this.level > 7 ? 4 : this.level > 4 ? 3 : 2
		PRG._selectSkillMode.push(['levelUp', skillnum]);
		if ($gameVariables._data[3] == 1) this.gainHp(this.mhp);
		else this.gainHp(2);
		this.gainMp(this.mmp);
	};

    Game_Actor.prototype.changeEquip = function (slotId, item) {
        var hpChange = 0;
        var mpChange = 0;
        if (item) {
            hpChange += item.params[0];
			mpChange += item.params[1];
			if (item.passiveStates.length > 0) {
				this.addPassiveStateParams(item.passiveStates);
			}
        }
        if (this.equips()[slotId]) {
            hpChange -= this.equips()[slotId].params[0];
			mpChange -= this.equips()[slotId].params[1];
			if (this.equips()[slotId].passiveStates.length > 0) {
				this.removePassiveStateParams(this.equips()[slotId].passiveStates)
			}
		}
        //만약 hp + hpchange < 0이라면 (hp는4, hpchange는 -7) hp는 1이고 hplost = -hpchange - hp + 1
        //mp는 0이고 mplost = -mpchange - mp
        if (this._hp + hpChange <= 0) {
            this._hpLost = hpChange + this._hp - 1;
            this._hp = 1;
        } else if (this._hpLost < 0 && hpChange > 0) {
            this._hpLost += hpChange;
            if (this._hpLost > 0) {
                this._hp += this._hpLost;
                this._hpLost = 0;
            }
        } else this._hp += hpChange;
        if (this._mp + mpChange < 0) {
            this._mpLost = mpChange + this._mp;
            this._mp = 0;
        } else if (this._mpLost < 0 && mpChange > 0) {
            this._mpLost += mpChange;
            if (this._mpLost > 0) {
                this._mp += this._mpLost;
                this._mpLost = 0;
            }
        } else this._mp += mpChange;
        if (this.tradeItemWithParty(item, this.equips()[slotId]) &&
            (!item || this.equipSlots()[slotId] === item.etypeId)) {
            this._equips[slotId].setObject(item);
            this.refresh();
		}
		if (slotId == 0) { //무기변경시
			for (var stateId = 91; stateId < 100; stateId++) {
				if (this.isStateAffected(stateId)) this.removeState(stateId);
			}
		}
		if (DataManager.isWeapon(item)) {

			if (item != null && $gamePlayer._weapons.indexOf(item) >= 0) $gamePlayer._weapons[$gamePlayer._weapons.indexOf(item)] = null;
            if (item.wtypeId == 1 && !$gameSwitches.value(32)) $gameTemp.reserveCommonEvent(56);
            if (item.wtypeId == 2 && !$gameSwitches.value(33)) $gameTemp.reserveCommonEvent(57);
			if (item.wtypeId == 3 && !$gameSwitches.value(34)) $gameTemp.reserveCommonEvent(58);
		}
		QABSSkillbar.requestIconUpdate = true;
        PKD_MI.refreshInventory();
    };

    //트레이드 안하게 변경
    Game_Actor.prototype.tradeItemWithParty = function (newItem, oldItem) {
        if (newItem && !$gameParty.hasItem(newItem)) {
            return false;
        } else {
            return true;
        }
    };

	var Alias_Game_Player_isDashButtonPressed = Game_Player.prototype.isDashButtonPressed;
	Game_Player.prototype.isDashButtonPressed = function () {
		if (this.battler().tp <= 2) {
			Input._currentState['#shift'] = false;
			return;
		}
		return Alias_Game_Player_isDashButtonPressed.call(this);
	}

    Game_BattlerBase.prototype.addNewState = function (stateId) {
        if (stateId === this.deathStateId()) {
            this.die();
        }
        var restricted = this.isRestricted();
        this._states.push(stateId);
        if (!restricted && this.isRestricted()) {
            this.onRestrict();
        }
    };

    Alias_Game_BattlerBase_clearStates = Game_BattlerBase.prototype.clearStates;
    Game_BattlerBase.prototype.clearStates = function () {
        if (this == $gamePlayer.battler()) {
			this._killStates = [];
			this._isLoopStateChanged = true;
		}
		if (this._states) {
			for (var i = 0; i < this._states.length; i++) {
				this.removeState(this._states[i]);
			}
		}
        Alias_Game_BattlerBase_clearStates.call(this);
    };

    Game_Battler.prototype.gainHp = function (value) {
        this._result.hpDamage = -value;
        this._result.hpAffected = true;
		if (this == $gamePlayer.battler()) {
			if (value < 0) {
				if (this.arm > 0) { //방어력 계산, 최소데미지는 1
					value += this.arm;
					if (value >= 0) value = -1;
				}
				if (this.isStateAffected(214)) {
					if ($gameParty._gold >= -value * 66) {
						$gameParty._gold -= -value * 66;
						value = 0;
					} else {
						var availableValue = Math.floor($gameParty._gold / 66);
						$gameParty._gold -= availableValue * 66;
						value += availableValue;
					}
				}
				if (this.hp < 3 && this.isStateAffected(212)) {
					if (Math.random() > 0.3) value = 0;
				}
			}
        }
        this.setHp(this.hp + value);
    };

	Game_Battler.prototype.gainMp = function (value) {
		this._result.mpDamage = -value;
		this.setMp(this.mp + value);
		QABSSkillbar.requestIconUpdate = true;
	};
	Game_CharacterBase.prototype.jump = function (xPlus, yPlus) {
		if (Math.abs(xPlus) > Math.abs(yPlus)) {
			if (xPlus !== 0) {
				this.setDirection(xPlus < 0 ? 4 : 6);
			}
		} else {
			if (yPlus !== 0) {
				this.setDirection(yPlus < 0 ? 8 : 2);
			}
		}
		this._x += xPlus;
		this._y += yPlus;
		var distance = Math.round(Math.sqrt(xPlus * xPlus + yPlus * yPlus));
		this._jumpPeak = 10 + distance - Math.round(this._moveSpeed);
		this._jumpCount = this._jumpPeak * 2;
		this.resetStopCount();
		this.straighten();
	};

	Game_BattlerBase.prototype.canPaySkillCost = function (skill) {
		if (skill.mpCost > 0) return this._tp >= this.skillTpCost(skill) && this._mp >= this.skillMpCost(skill);
    else return this._tp >= this.skillTpCost(skill)
};

	Game_BattlerBase.prototype.paySkillCost = function (skill) {
		if (skill.mpCost > 0) this._mp -= this.skillMpCost(skill);
		this._tp -= this.skillTpCost(skill);
	};

	Game_CharacterBase.prototype.updateJump = function () {
		this._jumpCount--;
		if (this._jumpCount < 0) this._jumpCount == 0;
		this._realX = (this._realX * this._jumpCount + this._x) / (this._jumpCount + 1.0);
		this._realY = (this._realY * this._jumpCount + this._y) / (this._jumpCount + 1.0);
		this.refreshBushDepth();
		if (this._jumpCount === 0) {
			if (this.battler()) {
				var i = this._transit.indexOf('zjump');
				if (i > -1) this._transit.splice(i, 1);
			}
			this._realX = this._x = $gameMap.roundX(this._x);
			this._realY = this._y = $gameMap.roundY(this._y);
		}
	};

    Game_CharacterBase.prototype.realMoveSpeed = function () {
        return this._moveSpeed + (this.isDashing() ? 0.8 : 0);
    };

    Game_CharacterBase.prototype.initMembers = function () {
        this._x = 0;
        this._y = 0;
        this._realX = 0;
        this._realY = 0;
        this._moveSpeed = 3;
        this._moveFrequency = 6;
        this._opacity = 255;
        this._blendMode = 0;
        this._direction = 2;
        this._pattern = 1;
        this._priorityType = 1;
        this._tileId = 0;
        this._characterName = '';
        this._characterIndex = 0;
        this._isObjectCharacter = false;
        this._walkAnime = true;
        this._stepAnime = false;
        this._directionFix = false;
        this._through = false;
        this._transparent = false;
        this._bushDepth = 0;
        this._animationId = 0;
        this._balloonId = 0;
        this._animationPlaying = false;
        this._balloonPlaying = false;
        this._animationCount = 0;
        this._stopCount = 0;
        this._jumpCount = 0;
        this._jumpPeak = 0;
        this._movementSuccess = true;
    };

    //roof passable true로 변경
    Game_Map.prototype.checkPassage = function (x, y, bit) {
        var flags = this.tilesetFlags();
        var tiles = this.allTiles(x, y);
        for (var i = 0; i < tiles.length; i++) {
            var flag = flags[tiles[i]];
            if (flag === 3584)
                return false;
            if ((flag & 0x10) !== 0)  // [*] No effect on passage
                continue;
            if ((flag & bit) === 0)   // [o] Passable
                return true;
            if ((flag & bit) === bit) // [x] Impassable
                return false;
        }
        return false;

    };

    Game_Map.prototype.canvasToMapX = function (x) {
        var tileWidth = this.tileWidth();
        var originX = this._displayX * tileWidth;
        x1 = Graphics.width / 2 + (x - Graphics.width / 2) / this._zoomScale;
        var mapX = Math.floor((originX + x1) / tileWidth);
        return this.roundX(mapX);
    };

    Game_Map.prototype.canvasToMapY = function (y) {
        var tileHeight = this.tileHeight();
        var originY = this._displayY * tileHeight;
        y1 = Graphics.height / 2 + (y - Graphics.height / 2) / this._zoomScale;
        var mapY = Math.floor((originY + y1) / tileHeight);
        return this.roundY(mapY);
    };

	Game_Map.prototype.gainDropItem = function (eventId) {
		if ($gamePlayer._globalLocked > 0) return false;
        var event = $gameMap.event(eventId);
        if (event.distToPlayer() < 2.5) {
            event.moveTowardPlayer();
            if (event.distToPlayer() < 0.35) return true;
        }
        return false;
	};

	Game_Map.prototype.absorbParticle = function (eventId, target) {
		if ($gamePlayer._globalLocked > 0) return false;
		var event = $gameMap.event(eventId);
		var target = event._eventData.particleStatData.target;
		if (!event._absorbCount) {
			event._absorbCount = 0;
			var dur = Math.floor(event.pixelDistanceFrom(target.cx(), target.cy()) / 120)
			event.pixelZJump(0, 0, dur, 40)
			event._radian = Math.PI * 2 * Math.random();
		}
		event._absorbCount++;
		var dx = event.deltaPXFrom(target.cx());
		var dy = event.deltaPYFrom(target.cy());
		var radian = Math.atan2(-dy, -dx);
		if (radian < 0) radian += Math.PI * 2;
		var curvSpeed = (1 - 1 / (1 + event._absorbCount / 200));
		if (Math.sin(radian - event._radian) < 0) event._radian -= Math.abs(radian - event._radian) * curvSpeed;
		else event._radian += Math.abs(radian - event._radian) * curvSpeed;
		if (event._radian < 0) {
			event._radian += 2 * Math.PI;
		}
		if (event._radian > Math.PI * 2) {
			event._radian -= 2 * Math.PI;
		}
		//else radian = event._radian + curvSpeed;
		//var dir = event.radianToDirection(radian);
		var dist = Math.min(2 + event._absorbCount / 10, 8);
		dx = Math.cos(event._radian) * dist;
		dy = Math.sin(event._radian) * dist


		event._px += dx;
		event._py += dy;
		event._realPX = event._px;
		event._realPY = event._py;
		event._x = event._realX = event._realPX / QMovement.tileSize;
		event._y = event._realY = event._realPY / QMovement.tileSize;

		event.moveColliders(event._px, event._py);
		if (Math.pow(event.cx() - target.cx(), 2) + Math.pow(event.cy() - target.cy(), 2) <= 100) return true; // 이벤트도 되게 변경해야 함
		return false;
	};

	// rpg_scenes.js
	//변경 : 없애버림ㅋ
	Scene_Base.prototype.checkGameover = function() {
	};

	//_Scene_Base_initialize = Scene_Base.prototype.initialize;
	//Scene_Base.prototype.initialize = function () { // Alias of initialize
	//	//-----------------------------------------------------------------------------
	//	_Scene_Base_initialize.call(this);
	//	this.initializeUploader();
	//	this.initializeTicker();
	//};

	Scene_Base.prototype.initializeUploader = function () { // create a new uploader for the scene.
		//-----------------------------------------------------------------------------
		if (Graphics.isWebGL()) {
			this._uploader = new PIXI.prepare.webgl(Graphics._renderer);
		} else {
			this._uploader = new PIXI.prepare.canvas(Graphics._renderer);
		}
		this._uploader.status = 'waiting';

	};
	Scene_Base.prototype.initializeTicker = function () { // create a ticker for the scene.
		//-----------------------------------------------------------------------------
		this._stabilizer = new PIXI.ticker.Ticker();
		this._lastDeltaTime = 0;
		this._deltaTime = 0;
		this._elapsedMS = 0;
		this._stabilizer.add(this.updateDelta.bind(this));
		this._stabilizer.start();
		this._averageMS = [0];
	};

	Scene_Base.prototype.updateDelta = function (delta) { // update the delta time and last delta time.
		//-----------------------------------------------------------------------------
		this._deltaTime = delta;
		this._averageMS.push(this._stabilizer.elapsedMS - this._elapsedMS);
		if (this._averageMS.length > 60) this._averageMS.shift();
		this._elapsedMS = this._stabilizer.elapsedMS;
	};

	Scene_Base.prototype.averageLatency = function () { // return the amount of latency on average.
		//-----------------------------------------------------------------------------
		var size = this._averageMS.length;
		var total = this._averageMS.reduce(function (t, n) { return t + n });
		return Math.abs(total / size);
	};

	// _Scene_Base_isReady = Scene_Base.prototype.isReady;
	// Scene_Base.prototype.isReady = function () {
	// 	var ready = _Scene_Base_isReady.call(this);
	// 	if (ready) {
	// 		if (PIXI.ticker.shared.FPS <= 58) return false;
	// 	}
	// 	return ready && ImageManager.isReady();// && this.averageLatency() < 1;
	// };

	_Scene_Base_isActive = Scene_Base.prototype.isActive;
	//-----------------------------------------------------------------------------
	Scene_Base.prototype.isActive = function () { // Alias of isActive
		//-----------------------------------------------------------------------------
		if (this._activityDelay > 0) {
			this._activityDelay--;
			return false;
		}
		return _Scene_Base_isActive.call(this);
	};

    _Scene_Base_start = Scene_Map.prototype.start;
	//-----------------------------------------------------------------------------

	Scene_Boot.prototype.initialize = function () {
		Scene_Base.prototype.initialize.call(this);
		this._startDate = Date.now();
		// if (!OrangeGreenworks.steamId) {
		// 	alert('Failed to load accountId. Please login Steam First');
		// 	SceneManager.exit();
		// }
	};


	Scene_Map.prototype.start = function () { // Alias of start
		//-----------------------------------------------------------------------------
		_Scene_Base_start.call(this);
		this._activityDelay = 12;
	};

	var _Scene_Map_updateMain = Scene_Map.prototype.updateMain;
	Scene_Map.prototype.updateMain = function () {
		if ($gameTemp._motionBlur) {
			var blur = $gameTemp._motionBlur;
			blur[2]++;
			blur[4]++;
			if (blur[2] >= blur[1]) {
				blur[2] = 0;
				blur[3] = true;
			} else {
				blur[3] = false;
			}
			if (blur[4] > blur[0]) $gameTemp._motionBlur = null;
			//Todo 변경점 : 업데이트는 하지 않더라도 updateAbsInput은 해야됨
			if (blur[3] == true) {
				return;
			}
		}
		_Scene_Map_updateMain.apply(this, arguments);
		this.updateTKMfilters();
	};

    //변경 : 속도 빠르게하는거 없애버림
    Scene_Map.prototype.updateMainMultiply = function () {
        this.updateMain();
    };
    //광클버그 왜인지모르겠는데 생김 ctrl+왼클+오른클. 맵이름윈도우 확인으로 해결
    Scene_Map.prototype.stop = function () {
        Scene_Base.prototype.stop.call(this);
        $gamePlayer.straighten();
        if (this._mapNameWindow) this._mapNameWindow.close();
        if (this.needsSlowFadeOut()) {
            this.startFadeOut(this.slowFadeSpeed(), false);
        } else if (SceneManager.isNextScene(Scene_Map)) {
            this.fadeOutForTransfer();
        } else if (SceneManager.isNextScene(Scene_Battle)) {
            this.launchBattle();
        }
    };
    //튜토리얼 페이지 클릭업데이트를 위해 canmove 지움
    Scene_Map.prototype.isMapTouchOk = function () {
        return this.isActive();
    };

	//변경 : options 이후 커맨드 처리
	Scene_Title.prototype.createCommandWindow = function() {
	    this._commandWindow = new Window_TitleCommand();
	    this._commandWindow.setHandler('newGame',  this.commandNewGame.bind(this));
	    this._commandWindow.setHandler('continue', this.commandContinue.bind(this));
	    //this._commandWindow.setHandler('Gallery', this.commandGallery.bind(this));
	    //this._commandWindow.setHandler('Credit', this.commandCredit.bind(this));
	    this._commandWindow.setHandler('options',  this.commandOptions.bind(this));
	    this._commandWindow.setHandler('exitGame', this.commandExitGame.bind(this));
	    this.addWindow(this._commandWindow);
	};    
	
	//변경 : 바로 로드
	Scene_Title.prototype.commandContinue = function() {
	    this._commandWindow.close();
	    this.fadeOutAll();
		if(DataManager.isAnySavefileExists()){
			DataManager.loadGame(DataManager.latestSavefileId());
			$gamePlayer.reserveTransfer($gameMap.mapId(), $gamePlayer.x, $gamePlayer.y);
		    $gamePlayer.requestMapReload();
			$gameSystem.onAfterLoad();
			$gameTemp.reserveCommonEvent(60);
			$gameSwitches._data[5] = false;
			if ($gameVariables._data[2] < 120) {
				$gamePlayer.battler()._oParamPlus = {};
				$gamePlayer.battler()._rParamPlus = {};
				for (var i = 0; i < 37; i++) {
					$gamePlayer.battler()._oParamPlus[i] = 0;
				};
				ConfigManager.alwaysDash = true
			}
			SceneManager.goto(Scene_Map);
		}
		else{
			SceneManager.goto(Scene_Title);
		}
	    //SceneManager.push(Scene_Load);
	};

    var Alias_Game_System_onAfterLoad = Game_System.prototype.onAfterLoad;
    Game_System.prototype.onAfterLoad = function () {
        Alias_Game_System_onAfterLoad.call(this);
        $gameSwitches._data[2] = true;
    };

	//변경 : commandOptions 전까지 명령 추가
	Scene_Title.prototype.commandGallery = function() {
	    alert("아직 지원하지 않습니다");
		//this._commandWindow.close();
	    //this.fadeOutAll();
	    //SceneManager.exit();
	    SceneManager.goto(Scene_Title);
	};

	Scene_Title.prototype.commandCredit = function() {
		alert("아직 지원하지 않습니다");
		//this._commandWindow.close();
	    //this.fadeOutAll();
	    //SceneManager.exit();
		SceneManager.goto(Scene_Title);
	};

	Scene_Title.prototype.commandOptions = function() {
		this._commandWindow.close();
	    SceneManager.push(Scene_Options);
	};
	//변경 : exit도 추가
	Scene_Title.prototype.commandExitGame = function() {
		this._commandWindow.close();
	    this.fadeOutAll();
	    SceneManager.exit();
	};
	

	//변경 : 게임오버 없애버림
	Scene_Map.prototype.updateScene = function() {
	    //this.checkGameover();
	    if (!SceneManager.isSceneChanging()) {
	        this.updateTransferPlayer();
	    }
	    if (!SceneManager.isSceneChanging()) {
	        this.updateEncounter();
	    }
	    if (!SceneManager.isSceneChanging()) {
	        this.updateCallMenu();
	    }
	    if (!SceneManager.isSceneChanging()) {
	        this.updateCallDebug();
	    }
	};

	//변경 : 뮤직, 백그라운드 안해
	Scene_Gameover.prototype.create = function() {
	    Scene_Base.prototype.create.call(this);
	    //this.playGameoverMusic();
	    //this.createBackground();
	};

	//변경 : 페이드인 안해
	Scene_Gameover.prototype.start = function() {
	    Scene_Base.prototype.start.call(this);
	    //this.startFadeIn(this.slowFadeSpeed(), false);
	};

	Scene_GameEnd.prototype.createCommandWindow = function () {
		this._commandWindow = new Window_GameEnd();
		this._commandWindow.setHandler('toTitle', this.commandToTitle.bind(this));
		this._commandWindow.setHandler('option', this.commandOptions.bind(this));
		this._commandWindow.setHandler('cancel', this.popScene.bind(this));
		this.addWindow(this._commandWindow);
	};

	Scene_GameEnd.prototype.commandOptions = function () {
		this._commandWindow.close();
		SceneManager.push(Scene_Options);
	};

	Scene_GameEnd.prototype.update = function () {
		Scene_Base.prototype.update.call(this);
		if (Input.isTriggered('$START')) {
			SoundManager.playCancel();
			this.popScene();
		}
	};

	Window_GameEnd.prototype.makeCommandList = function () {
		this.addCommand(TextManager.toTitle, 'toTitle');
		this.addCommand(TextManager.options, 'option');
		this.addCommand(TextManager.cancel, 'cancel');
	};

	SoundManager.playSwapEquip = function (item) {
		if (item) {
			if (item.wtypeId == 1) SoundManager.playSystemSound(5);
			else if (item.wtypeId == 2) SoundManager.playSystemSound(6);
			else if (item.wtypeId == 3) SoundManager.playSystemSound(7);
			else SoundManager.playSystemSound(4);
		}
	};

    Sprite_Character.prototype.updateBalloon = function () {
        this.setupBalloon();
        if (this._balloonSprite) {
            this._balloonSprite.x = this.x;
            this._balloonSprite.y = this._character == $gamePlayer ? this.y - 48 : this.y - this.height;
            
            if (!this._balloonSprite.isPlaying()) {
                this.endBalloon();
            }
        }
    };

	// rpg_windows.js
	
	//변경 : 페이스칩 사이즈 변경
	Window_Base.prototype.drawFace = function(faceName, faceIndex, x, y, width, height) {
	    width = width || Window_Base._faceWidth;
	    height = height || Window_Base._faceHeight;
	    var bitmap = ImageManager.loadFace(faceName);
	    var pw = Window_Base._faceWidth;
	    var ph = Window_Base._faceHeight;
	    var sw = Math.min(width, pw);
	    var sh = Math.min(height, ph);
	    var dx = Math.floor(x + Math.max(width - pw, 0) / 2);
	    var dy = Math.floor(y + Math.max(height - ph, 0) / 2);
	    var sx = faceIndex % 4 * pw + (pw - sw) / 2;
	    var sy = Math.floor(faceIndex / 4) * ph + (ph - sh) / 2;
	    var dw = 100; //your desired portrait width
	    var dh = 110; //your desired portrait heith
	    this.contents.blt(bitmap, sx, sy, sw, sh, dx, dy, dw, dh); //notice two more params
	    //this.contents.blt(bitmap, sx, sy, sw, sh, dx, dy);
	};

	Window_Base.prototype.drawTextEx2 = function (text, x, y) {
		if (text) {
			var textState = { index: 0, x: x, y: y, left: x };
			textState.text = this.convertEscapeCharacters(text);
			textState.height = this.calcTextHeight(textState, false);
			//this.resetFontSettings();
			while (textState.index < textState.text.length) {
				this.processCharacter(textState);
			}
			return textState.x - x;
		} else {
			return 0;
		}
	};

	Window_Base.prototype.drawTextSkill = function (text, x, y) {
		if (text) {
			var textState = { index: 0, x: x, y: y, left: x };
			textState.text = this.convertEscapeCharacters(text);
			textState.height = this.calcTextHeight(textState, false);
			//this.resetFontSettings();
			while (textState.index < textState.text.length) {
				switch (textState.text[textState.index]) {
					case '\f':
						this.processNewPage(textState);
						break;
					case '\x1b':
						this.processEscapeCharacter(this.obtainEscapeCode(textState), textState);
						break;
					default:
						var c = textState.text[textState.index++];
						var w = this.textWidth(c);
						this.contents.drawText(c, textState.x, textState.y, w * 2, textState.height);
						textState.x += w;
						if (textState.x >= 230) {
							textState.x = textState.left;
							textState.y += textState.height;
							textState.height = this.calcTextHeight(textState, false);
						}
						break;
				}
			}
			return textState.x - x;
		} else {
			return 0;
		}
	};
	
	//변경 : 타이틀 커맨드 options 이후로 추가
	Window_TitleCommand.prototype.makeCommandList = function() {
	    this.addCommand(TextManager.newGame,   'newGame');
	    this.addCommand(TextManager.continue_, 'continue', this.isContinueEnabled());
	    //this.addCommand('Gallery', 'Gallery');
	    //this.addCommand('Credit', 'Credit');
	    this.addCommand(TextManager.options,   'options');
	    this.addCommand('Exit', 'exitGame');
	};
	
	Window_Selectable.prototype.processCursorMove = function() {
	    if (this.isCursorMovable()) {
	        var lastIndex = this.index();
	        if (Input.isRepeated('down')) {
	            this.cursorDown(Input.isTriggered('down'));
	        }
	        if (Input.isRepeated('up')) {
	            this.cursorUp(Input.isTriggered('up'));
	        }
	        if (Input.isRepeated('right')) {
	            this.cursorRight(Input.isTriggered('right'));
	        }
	        if (Input.isRepeated('left')) {
	            this.cursorLeft(Input.isTriggered('left'));
	        }
	        if (!this.isHandled('pagedown') && Input.isTriggered('pagedown')) {
	            this.cursorPagedown();
	        }
	        if (!this.isHandled('pageup') && Input.isTriggered('pageup')) {
	            this.cursorPageup();
            }
            if (this.index() !== lastIndex) {
                SoundManager.playCursor();
            }
	    }
	};
	
	Window_Selectable.prototype.onTouch = function(triggered) {
	    var lastIndex = this.index();
	    var x = this.canvasToLocalX(TouchInput.x);
	    var y = this.canvasToLocalY(TouchInput.y);
	    var hitIndex = this.hitTest(x, y);
	    if (hitIndex >= 0) {
	        if (hitIndex === this.index()) {
	            if (triggered && this.isTouchOkEnabled()) {
	                this.processOk();
	            }
	        } else if (this.isCursorMovable()) {
	            this.select(hitIndex);
	        }
	    } else if (this._stayCount >= 10) {
	        if (y < this.padding) {
	            this.cursorUp();
	        } else if (y >= this.height - this.padding) {
	            this.cursorDown();
	        }
	    }
	};
	
	Window_Selectable.prototype.processPageup = function() {
	    this.updateInputData();
	    this.deactivate();
	    this.callHandler('pageup');
	};
	
	Window_Selectable.prototype.processPagedown = function() {
	    this.updateInputData();
	    this.deactivate();
	    this.callHandler('pagedown');
	};

    //window_Item
    

    Window_ItemList.prototype.makeItemList = function () {
        this._data = $gameParty.allItems()
        if (this.includes(null)) {
            this._data.push(null);
        }
    };

    Window_ItemList.prototype.maxCols = function () {
        return 1;
    };

    Window_ItemList.prototype.drawItem = function (index) {
        var item = this._data[index];
        if (item) {
            var numberWidth = this.numberWidth();
            var rect = this.itemRect(index);
            rect.width -= this.textPadding();
            this.changePaintOpacity(this.isEnabled(item));
            this.drawItemName(item, rect.x, rect.y, rect.width - numberWidth);
            this.drawItemNumber(item, rect.x - 100, rect.y, rect.width);
            this.drawItemPrice(item, rect.x, rect.y, rect.width);
            this.changePaintOpacity(1);
        }
    };

    Window_ItemList.prototype.drawItemPrice = function (item, x, y, width) {
            this.drawText(item.price/2, x, y, width, 'right');
    };

    Window_Options.prototype.addGeneralOptions = function () {
        this.addCommand(TextManager.alwaysDash, 'alwaysDash');
    };

	Window_Options.prototype.addVolumeOptions = function () {
		this.addCommand(TextManager.bgmVolume, 'bgmVolume');
	};

    //QABS 캐스팅 애니메이션 추가

	Bitmap.prototype.drawTextInfo = function (text, x, y, maxWidth, lineHeight, align) {
		if (text) {
			var textState = { index: 0, x: x - 8, y: y, left: x - 8 };
			if (align == 'center') {
				var textSplit = text.split('\n');
				textState.x += (this.width - this.measureTextWidth(textSplit[0].replace(/\\c\[[0-9]+\]/gi, ''))) / 2;
				if (textSplit.length > 1) textState.left += (this.width - this.measureTextWidth(textSplit[1].replace(/\\c\[[0-9]+\]/gi, ''))) / 2;
			}
			text = text.replace(/\\/g, '\x1b');
			text = text.replace(/\x1b\x1b/g, '\\');
			text = text.replace(/\x1bV\[(\d+)\]/gi, function () {
				return $gameVariables.value(parseInt(arguments[1]));
			}.bind(this));
			text = text.replace(/\x1bV\[(\d+)\]/gi, function () {
				return $gameVariables.value(parseInt(arguments[1]));
			}.bind(this));
			text = text.replace(/\x1bN\[(\d+)\]/gi, function () {
				return this.actorName(parseInt(arguments[1]));
			}.bind(this));
			text = text.replace(/\x1bP\[(\d+)\]/gi, function () {
				return this.partyMemberName(parseInt(arguments[1]));
			}.bind(this));
			text = text.replace(/\x1bG/gi, TextManager.currencyUnit);
			textState.text = text;
			textState.height = this.fontSize + 8;


			//this.resetFontSettings();
			while (textState.index < textState.text.length) {
				switch (textState.text[textState.index]) {
					case '\n':
						textState.x = textState.left;
						textState.y += textState.height;
						textState.index++;
						break;
					case '\f':
						textState.index++;
						break;
					case '\x1b':
						switch (this.obtainEscapeCode(textState)) {
							case 'C':
								if (!this._windowskin) this._windowskin = ImageManager.loadSystem('Window');
									var n = this.obtainEscapeParam(textState);
									var px = 96 + (n % 8) * 12 + 6;
								var py = 144 + Math.floor(n / 8) * 12 + 6;
								this.textColor = this._windowskin.getPixel(px, py);
								break;
							case 'I':
								this.drawIcon(this.obtainEscapeParam(textState), textState.x + 2, textState.y + 2);
								textState.x += Window_Base._iconWidth + 4;
								break;
							case '{':
								if (this.fontSize <= 96) {
								this.fontSize += 12;
							}
								break;
							case '}':
								if (this.fontSize >= 24) {
									this.fontSize -= 12;
								}
								break;
						}
						break;
					default:
						var c = textState.text[textState.index++];
						var w = this.measureTextWidth(c);
						this.drawText(c, textState.x, textState.y, w * 2, textState.height, align);
						textState.x += w;
						break;
				}
			}
			return textState.x - x;
		} else {
			return 0;
		}
	};


	Bitmap.prototype.obtainEscapeCode = function (textState) {
		textState.index++;
		var regExp = /^[\$\.\|\^!><\{\}\\]|^[A-Z]+/i;
		var arr = regExp.exec(textState.text.slice(textState.index));
		if (arr) {
			textState.index += arr[0].length;
			return arr[0].toUpperCase();
		} else {
			return '';
		}
	};

	Bitmap.prototype.obtainEscapeParam = function (textState) {
		var arr = /^\[\d+\]/.exec(textState.text.slice(textState.index));
		if (arr) {
			textState.index += arr[0].length;
			return parseInt(arr[0].slice(1));
		} else {
			return '';
		}
	};

    Sprite_Character.prototype.setupAnimation = function () {
        if (this._character.animationId() > 0) {
            var animation = $dataAnimations[this._character.animationId()];
            if (this._character.animationId() == 210) {
                this.startCastingAnimation(animation, false, 0);
            } else this.startAnimation(animation, false, 0);
        }
        this._character.startAnimation();
    };
    
    Sprite_Base.prototype.startCastingAnimation = function (animation, mirror, delay) {
        var sprite = new Sprite_Animation();
        sprite.setup(this._effectTarget, animation, mirror, delay);
        sprite._casting = true;
        sprite._castingAlpha = 0.05;
        this.parent.addChild(sprite);
        this._animationSprites.push(sprite);
    };

    Sprite_Base.prototype.updateAnimationSprites = function () {
        if (this._animationSprites.length > 0) {
            var sprites = this._animationSprites.clone();
            this._animationSprites = [];
            for (var i = 0; i < sprites.length; i++) {
                var sprite = sprites[i];
                if (sprite.isPlaying()) {
                    this._animationSprites.push(sprite);
                } else {
                    sprite.remove();
                }
            }
        }
    };

    Sprite_Base.prototype.updateAnimationSprites = function () {
        if (this._animationSprites.length > 0) {
            var sprites = this._animationSprites.clone();
            this._animationSprites = [];
            for (var i = 0; i < sprites.length; i++) {
                var sprite = sprites[i];
                if (sprite.isPlaying()) {
                    if (sprite._castingAlpha) {
                        if (sprite._casting && $gameSystem._shud_visible) {
                            if (sprite._castingAlpha < 1) sprite._castingAlpha += 0.1;
                        } else if (sprite._castingAlpha > 0) {
                                sprite._castingAlpha -= 0.05;
                                sprite._casting = false;
                            }
                        else {
                            sprite.remove();
                        }
                        sprite.alpha = sprite._castingAlpha;
                        this._animationSprites.push(sprite);
                    } else this._animationSprites.push(sprite);
                } else {
                    sprite.remove();
                }
            }
        }
    };

	var animation_position = Sprite_Animation.prototype.updatePosition;
	Sprite_Animation.prototype.updatePosition = function () {
		animation_position.call(this)
		if (this._animation.name.contains("idx")) {
			this.z = Number(this._animation.name.split('idx')[1]);
		} //else {
			//this.z = 8;
		//}
	};

})();