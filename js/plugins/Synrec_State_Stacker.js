/*:
 *@author Synrec Codex
 *@plugindesc (v1.0) A state stacker plugin which indicates the amount
 *of stacks a state has.
 *@help
 *Change Log:
 *v1: Released publically.
 *v2: Fixed errors causing the secondary burst effect to not occur.
 *Fixed the problem of burst effect not stacking.
 *v3: Removed secondary burst effect for optimization reasons.
 *State overflow instead allows for an alternative state post burst.
 *v4: Fixed a bug where the game would crash when burst state is 
 *undefined.
 *v5: Fixed a bug where a state can be added +1 to the designers defined
 *maximum.
 *v6: Removed state icon duplication, added a number which indicates stack
 *amount.
 *v1.0: Multiple bug fixes: No turn count, no step count and general incompatibility
 *with game engine repaired. Stacked states are no innate to the game engine. Due to
 *how status windows work, it was decided to leave the status window as is to ensure
 *cross-compatibility with other plugins.
 *
 *DO NOT RESELL THIS SCRIPT.
 *FREE TO USE IN FREE OR COMMERCIAL PROJECTS.
 *If you use this in commercial projects, please let me know so I can check it out,
 *it is not mandatory to do so however.
 *----------------------------------------------------------------------------------
 *Allow a state to stack with <stateStackable>, define its max state stack with 
 *<maxStack:x> where x is an integer number. Define overflow state with <overflowState:x>
 *where x is an integer number.
 *
 *Not defining a max stack will lead to errors.
 *
 *This script at its current version does not have any plugin commands. If there is a
 *feature you would like implemented, please message me and let me know.
 *
 */
//-------------GAME---------------STATE--------------------OBJECT---------------------//
synrecBattlerBaseNewState = Game_BattlerBase.prototype.addNewState;
Game_BattlerBase.prototype.addNewState = function(stateId) {
	if ($dataStates[stateId].meta.stackableState == true){
		this.addStackableState(stateId);
	}
	synrecBattlerBaseNewState.call(this, stateId);
	
};

Game_BattlerBase.prototype.addStackableState = function(stateId){
		var restricted = this.isRestricted();
		//this._states.push(stateId);
		this.sortStates();
		if (!restricted && this.isRestricted()) {
			this.onRestrict();
		}
	//if (stack < $dataStates[stateId].meta.maxStack){
	//	var restricted = this.isRestricted();
	//	states.push(stateId);
	//	this.sortStates();
	//	if (!restricted && this.isRestricted()) {
	//		this.onRestrict();
	//	}
	//}
	//if (stack >= $dataStates[stateId].meta.maxStack && $dataStates[stateId].meta.overflowState !== undefined){
	//	this.addOverflowState(stateId, $dataStates[stateId].meta.overflowState);
	//}
};

Game_BattlerBase.prototype.addOverflowState = function(stateId, overflowStateId){
	this.removeState(stateId);
	if (overflowStateId === this.deathStateId()) {
		this.die();
	}
	var restricted = this.isRestricted();
	this._states.push(overflowStateId);
	this.sortStates();
	if (!restricted && this.isRestricted()) {
		this.onRestrict();
	}
}

//Game_BattlerBase.prototype.removeUnderFlow = function(stateId){
//	var states = this._states;
//	var indexRemove = states.indexOf(stateId);
//	states.forEach(function(element){
//		states.splice(indexRemove);
//	})		
//}

Game_BattlerBase.prototype.stateIcons = function() {
    return this.states().map(function(state) {
        return state.iconIndex;
    }).filter(function(iconIndex) {
        return iconIndex > 0;
    });
};

synrecBattlerAddState = Game_Battler.prototype.addState;
Game_Battler.prototype.addState = function (stateId) {
	if (!$dataStates[stateId]) {
		alert('Game has encountered a bug. Please report it.\nstateId : '+ stateId);
		return false;
	}
	if ($dataStates[stateId].meta.stackableState == true) {
		var stateStacks = this._stateStacks;
		if (stateStacks[stateId] == undefined) stateStacks[stateId] = 0;
		else if (stateStacks[stateId] < $dataStates[stateId].meta.maxStack - 1) stateStacks[stateId] += 1;
		var stack = stateStacks[stateId];
		//여기서부터 제작 시작. q파람에서 검색해서 추가 스탯 불러옴
		if ($dataStates[stateId].qmeta.stackparams) {
			$dataStates[stateId].qmeta.stackparams.split('\n').forEach(function (effect) {
				var effect = effect.replace(" ", "").split(':');
				if (Number(effect[1]) - 1 == stateStacks[stateId]) {
					if (effect[0].toLowerCase() == 'tripleshot' && !$gamePlayer._tripleShot.contains(stateId)) {
							$gamePlayer._tripleShot.push(stateId);
					}
					if (effect[0].toLowerCase() == 'stat' && effect[2]) {
						$gamePlayer.battler().addState(Number(effect[2]));
					}
				};
			});
		}
		//
		this.resetStateCounts(stateId);

		if (stack == 0) {
			this.addNewState(stateId);
			this.refresh();
			this._result.pushAddedState(stateId);
		} else if (stack >= $dataStates[stateId].meta.maxStack && $dataStates[stateId].meta.overflowState !== undefined) {
			this.removeState(stateId);
			this.addState(Number($dataStates[stateId].meta.overflowState));
			this.refresh();
		}
		if (stack < $dataStates[stateId].meta.maxStack)
			if ($dataStates[stateId].meta['loop animation'] != undefined) {
				this._isLoopStateChanged = true;
		}
	} else {
		if ($dataStates[stateId].meta['loop animation'] != undefined) {
			this._isLoopStateChanged = true;
		}
		synrecBattlerAddState.call(this, stateId);
	}
};

synrecBattlerRemoveState = Game_Battler.prototype.removeState;
Game_Battler.prototype.removeState = function (stateId) {
	if ($dataStates[stateId].meta.stackableState == true) {
		if (this._stateStacks[stateId] != undefined) {
			if ($dataStates[stateId].meta['loop animation'] != undefined) {
				var data = $dataStates[stateId].loopAnimation;
				Object.keys(data).forEach(function (type) {
					data[type].id -= this._stateStacks[stateId] - 1;
				}, this);
				this._isLoopStateChanged = true;
			}
			this._stateStacks[stateId] = undefined;
			delete this._stateStacks[stateId];
		}
		synrecBattlerRemoveState.call(this, stateId);
		//var states = this._states;
		//var stacks = 0;
		//for(i = 0; i < states.length; i++){
		//	if (states[i] == stateId){
		//		stacks++;
		//	}
		//}
		//for (i = 0; i < stacks; i++){
		//	if (stateId === this.deathStateId()) {
		//		this.revive();
		//	}
		//	this.eraseState(stateId);
		//	this.refresh();
		//	this._result.pushRemovedState(stateId);
		//}
	} else {
		if ($dataStates[stateId].meta['loop animation'] != undefined) {
			this._isLoopStateChanged = true;
		}
		synrecBattlerRemoveState.call(this, stateId);
	}
};

Game_Battler.prototype.reduceStateStack = function (stateId) {
	if (this._stateStacks[stateId] != undefined) {
		if (this._stateStacks[stateId] == 0) this.removeState(stateId);
		else this._stateStacks[stateId] -= 1;
	}
}

Game_Battler.prototype.isStateStackMax = function (stateId) {
	return this._stateStacks[stateId] >= Number($dataStates[stateId].meta.maxStack) - 1
}

//---------------------WINDOW-------------------BASE-------------------EDIT----------//
//function arrayDuplioChkr(Arr1, Arr2){
//	var lastItem = [0];
//	var lastIndex = [0];
//	stateCounter = [];
//	var y = 0;
//	console.log(lastIndex + ' ' + Arr2);
//	for (i = 0; i < Arr1.length; i++){
//		if (i == 0 && Arr2[y] == Arr1[i]){
//			if (lastIndex[y] == undefined){
//				lastIndex[y] = 0;
//			}
//			if (stateCounter[y] = undefined){
//				stateCounter[y] = 0;
//			}
//			lastIndex[y]++;
//			stateCounter.push(lastIndex[y]);
//			y = i;
//		}
//		if (Arr2[y] == Arr1[i] && i !== 0){
//			if (lastIndex[y] == undefined){
//				lastIndex[y] = 0;
//			}
//			if (stateCounter[y] = undefined){
//				stateCounter[y] = 0;
//			}
//			lastIndex[y]++;
//		}
//		if (Arr2[y] !== Arr1[i]){
//			y++;
//			if (lastIndex[y] == undefined){
//				lastIndex[y] = 0;
//			}
//			if (stateCounter[y] = undefined && Arr1[i] !== undefined){
//				stateCounter[y] = 0;
//			}
//			if (Arr2[y] == Arr1[i]){
//				lastIndex[y]++
//			}
//		}
//	}
//	stateCounter = lastIndex;
//}

//synrecDrawActorIcons = Window_Base.prototype.drawActorIcons;
//Window_Base.prototype.drawActorIcons = function(actor, x, y, width) {
//	var iconCounts = actor.allIcons();
//	actorIcons = Array.from(new Set(actor.allIcons()));
//	var icons = actorIcons.slice(0, Math.floor(width / Window_Base._iconWidth));
//	arrayDuplioChkr(iconCounts,icons);
//	for (var i = 0; i < icons.length; i++) {
//		this.drawIcon(icons[i], x + Window_Base._iconWidth * i, y + 2);
//		this.drawText(stateCounter[i], x + Window_Base._iconWidth * i + 8, y + 2);
//    }
	
//	if (icons.length == 0){
//		synrecDrawActorIcons.call(this, actor, x, y, width);
//	}
//};
