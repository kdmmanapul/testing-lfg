//================================================================
//PRG_SelectSkill
/*
 * 
 * @plugindesc <PRG_SelectSkill>
 * @version 0.01
 * 
 */

var Imported = Imported || {};
Imported.PRG_SelectSkill = true;

function Scene_SelectSkill() {
    this.initialize.apply(this, arguments);
}


Scene_SelectSkill.prototype = Object.create(Scene_MenuBase.prototype);
Scene_SelectSkill.prototype.constructure = Scene_SelectSkill;

Scene_SelectSkill.prototype.initialize = function () {
	Scene_MenuBase.prototype.initialize.call(this, arguments);
	this._mode = 'levelup';
	this._newSkillNum = 3;
	this._discardNewSkillId = null;
	this._initialTimer = 25;
	if (PRG._selectSkillMode.length > 0) {
		var skillMode = PRG._selectSkillMode.shift();
		if (skillMode.length >= 2) {
			this._mode = skillMode[0].toLowerCase();
			if (this._mode == 'levelup') this._newSkillNum = skillMode[1];
			else if (this._mode == 'discard') this._discardNewSkillId = skillMode[1];
			else if (this._mode == 'relic') {
				this._newSkillNum = skillMode[1];
				this._rarity = skillMode[2];
			}
		} else this._mode = skillMode[0].toLowerCase();
	} else this._mode = 'levelup';
}


Scene_SelectSkill.prototype.create = function () {
	Scene_MenuBase.prototype.create.call(this);
	this.createMessageWindow();
	this.createSkillWindow();
	this.createHelpWindow();
	//this.createContents(mode, message);
};

Scene_SelectSkill.prototype.refreshMode = function () {
	Scene_MenuBase.prototype.initialize.call(this, arguments);
	this._mode = 'levelup';
	this._newSkillNum = 3;
	this._discardNewSkillId = null;
	if (PRG._selectSkillMode.length > 0) {
		var skillMode = PRG._selectSkillMode.shift();
		if (skillMode.length >= 2) {
			this._mode = skillMode[0].toLowerCase();
			if (this._mode == 'levelup') this._newSkillNum = skillMode[1];
			else if (this._mode == 'discard') this._discardNewSkillId = skillMode[1];
		} else this._mode = skillMode[0].toLowerCase();
	} else this._mode = 'levelup';
	this.create();
};

Scene_SelectSkill.prototype.createMessageWindow = function () {
	var width = 800;
	var height = 100;
	this._messageWindow = new Window_Base((Graphics.width - width) / 2, (Graphics.height - height) / 2 - 180, width, height);
	this._messageWindow.setBackgroundType(2);
	this._messageWindow.contents.fontSize = 42;
	switch (this._mode) {
		case 'levelup': {
			this._messageWindow.drawText('Choose a new skill!', 0, 0, width, 'center');
			break
		}
		case 'discard': {
			this._messageWindow.drawText('Choose a skill to forget', 0, 0, width, 'center');
			break
		}
		case 'remove': {
			this._messageWindow.drawText('Choose a skill to forget', 0, 0, width, 'center');
			break
		}
		case 'skillup': {
			this._messageWindow.drawText('Choose a skill to level up', 0, 0, width, 'center');
			break
		}
		case 'relic': {
			this._messageWindow.drawText('Choose a new relic!', 0, 0, width, 'center');
			break
        }
		default: {
			this._messageWindow.drawText('Choose a new skill!', 0, 0, width, 'center');
			break
		}
	}
	
	this.addChild(this._messageWindow);
	this._messageWindow.addAnimation(new QueueTweenAnimation(new Point(this._messageWindow.x, this._messageWindow.y+60), new Point(1.0, 1.0), 0, 30, 2, 0));
};

Scene_SelectSkill.prototype.createSkillWindow = function () {
	var width = Graphics.width;
	var height = Graphics.height / 2 - 20;
	var skills = [];


	switch (this._mode) {
		case 'levelup': {
			skills = PRG.getLevelupSkills(this._newSkillNum);
			break
		}
		case 'discard': {
			for (var i = 7; i < 11; i++) {
				if (Number($gameSystem.absKeys()[i].skillId)) skills.push(Number($gameSystem.absKeys()[i].skillId))
			}
			if (this._discardNewSkillId) skills.push(this._discardNewSkillId);
			break
		}
		case 'remove': {
			for (var i = 7; i < 11; i++) {
				if (Number($gameSystem.absKeys()[i].skillId)) skills.push(Number($gameSystem.absKeys()[i].skillId))
			}
			break
		}
		case 'relic': {
			skills = PRG.getRelics(this._newSkillNum, this._rarity);
		}
		case 'skillup': {//todo
			break
		}
		default: {
			break
		}
	}

	this._skillWindow = new Window_SelectSkill(0, this._messageWindow.y + this._messageWindow.height - 20 + 40, width, height, skills, this._mode);
	this._skillWindow.setBackgroundType(2);
	this._skillWindow.setHandler('ok', this.onSkillOk.bind(this))
	this.addChild(this._skillWindow);
	this._skillWindow.addAnimation(new QueueTweenAnimation(new Point(this._skillWindow.x, this._skillWindow.y+40), new Point(1.0, 1.0), 0, 30, 2, 0));
	this._skillWindow.activate();
};

Scene_SelectSkill.prototype.createHelpWindow = function () {
	this._helpWindow = new Window_skillHelp();
	this._helpWindow.y = Graphics.height - 108;
	this._helpWindow.setBackgroundType(1);
	this.addWindow(this._helpWindow)
	this._skillWindow.setHelpWindow(this._helpWindow)
};


Scene_SelectSkill.prototype.onSkillOk = function () {
	if (this._initialTimer > 0) {
		this._initialTimer -= 1;
		this._skillWindow.activate();
		return false;
	}
	if (this._skillWindow.index() < 0) {

		this._skillWindow.activate();
		return false;
	}
	var skill = this._skillWindow._skills[this._skillWindow.index()]
	if (!skill) alert("error : skill not exist");
	switch (this._mode) {
		case 'levelup': {
			$gamePlayer.battler().learnSkill(skill - (skill - 1) % 5);
			if ($gamePlayer.battler().isStateAffected(559) && $dataSkills[skill].stypeId == 3 && skill % 5 > 1) $gamePlayer.battler().gainHp(1);
			if ($gamePlayer.battler().isStateAffected(560) && $dataSkills[skill].stypeId == 2 && skill % 5 == 1) $gamePlayer.battler()._oParamPlus[4] += 1;
			break
		}
		case 'discard': {
			if (skill == this._discardNewSkillId) {
				$gamePlayer.battler().forgetSkill(skill)
			} else {
				var i = this._skillWindow.index();
				if (i == 5) {
					$gamePlayer.battler().forgetSkill(skill)
				} else {
					if (skill == $gameSystem.absKeys()[6].skillId) {
						$gameSystem.changeABSOverrideSkill(6, this._discardNewSkillId);
						$gameSystem.changeABSOverrideSkill(i + 7, this._discardNewSkillId);
					} else $gameSystem.changeABSOverrideSkill(i + 7, this._discardNewSkillId);
				}
				$gamePlayer.battler().forgetSkill(skill)
			}
			for (var i = 0; i < $gamePlayer.battler()._levelingSkillNeeds.length; i++) {
				if (Math.ceil(skill / 5) == Math.ceil(($gamePlayer.battler()._levelingSkillNeeds[i].result - 1) / 5)) {
					$gamePlayer.battler()._levelingSkillNeeds.splice(i, 1);
					i--;
				}
			}
			break
		}
		case 'remove': {
			var skill = this._skillWindow._skills[this._skillWindow.index()]
			var i = this._skillWindow.index();
			if (skill == $gameSystem.absKeys()[6].skillId) {
				$gameSystem.changeABSOverrideSkill(6, null);
				$gameSystem.changeABSOverrideSkill(i + 7, null);
			} else $gameSystem.changeABSOverrideSkill(i + 7, null);
			$gamePlayer.battler().forgetSkill(skill)
			break
		}
		case 'relic': {
			$gameVariables._data[28] = skill;
			var skills = this._skillWindow._skills;
			var rarity = 0;
			for (var i = 0; i < skills.length; i++) {
				if (skills[i] == skill) continue;
				rarity = $dataStates[skills[i]].rarity - 1 < 0 ? 0 : $dataStates[skills[i]].rarity - 1;
				PRG.data.abil[rarity].push(skills[i]);
            }
			// $gamePlayer.battler().addState(skill)
			// $gameTemp._infoPopup.push($dataStates[skill])
			break;
        }
		case 'skillup': {//Todo
			break
		}
		default: {
			$gamePlayer.battler().learnSkill(skill - (skill - 1) % 5)
			break
		}
	}
	if (PRG._selectSkillMode.length > 0) this.refreshMode();
	else {
		if (this._mode != 'relic') {
			$gameTemp.reserveCommonEvent(18);
			if (!$gameSwitches.value(31) && $gameVariables._data[104] > 0) $gameTemp.reserveCommonEvent(55);
		}
		this.popScene();
	}
};

Scene_SelectSkill.prototype.update = function () {
	Scene_MenuBase.prototype.update.call(this);
	if (this._initialTimer > 0) {
		this._initialTimer -= 1;
	}
	//if (Input.isTriggered('#esc')) this.popScene();
};


//==============================================================================================================
// * Window_SelectSkill
//==============================================================================================================



function Window_SelectSkill() {
	this.initialize.apply(this, arguments);
}


Window_SelectSkill.prototype = Object.create(Window_Selectable.prototype);
Window_SelectSkill.prototype.constructor = Window_SelectSkill;

Window_SelectSkill.prototype.initialize = function (x, y, width, height, skills, mode) {
	this._skills = skills;
	this._mode = mode;
	Window_Selectable.prototype.initialize.call(this, x, y, width, height);
	this.drawAllItems();
}

Window_SelectSkill.prototype.maxItems = function () {
	return this._skills.length;
}

Window_SelectSkill.prototype.itemWidth = function () {
	return 140;
};

Window_SelectSkill.prototype.itemHeight = function () {
	return 160;
};

Window_SelectSkill.prototype.drawAllItems = function () {
	var topIndex = this.topIndex();
	for (var i = 0; i < this.maxPageItems(); i++) {
		var index = topIndex + i;
		if (index < this.maxItems()) {
			this.drawItem(index);
		}
	}
};

Window_SelectSkill.prototype.maxCols = function () {
	return 5;
};

Window_SelectSkill.prototype.maxRows = function () {
	return 1;//Math.max(Math.ceil(this.maxItems() / this.maxCols()), 1);
};

Window_SelectSkill.prototype.spacing = function () {
	return 42;
};

Window_SelectSkill.prototype.itemRect = function (index) {
	var rect = new Rectangle();
	var maxCols = this.maxCols();
	var n = this.maxItems();
	rect.width = this.itemWidth();
	rect.height = this.itemHeight();
	rect.x = this.width/2 + ((index * 2 - n) * rect.width + (index * 2  - n) * this.spacing()) / 2;//index % maxCols * (rect.width + this.spacing()) - this._scrollX;
	rect.y = Math.floor(index / maxCols) * rect.height - this._scrollY + 5;
	return rect;
};

Window_SelectSkill.prototype.drawItem = function (index) {
	var rect = this.itemRectForText(index);
	var pic = ImageManager.loadBitmap('img/actorhud/', 'skillBoxFrame', 0, true);
	this.contents.blt(pic, 0, 0, pic.width, pic.height, rect.x - 12, rect.y-5);

	if (this._mode == 'relic') {
		var skill = $dataStates[this._skills[index]];

		var fx = rect.x + (this.itemWidth() - 72) / 2;
		var fy = rect.y + this.spacing() / 2 + 10;
		this.drawIconPlusZoom(skill.iconIndex, fx, fy, 2);

		this.drawName(skill, rect.x, 106);

	} else {
		var skill = $dataSkills[this._skills[index]];
		var fx = rect.x + (this.itemWidth() - 72) / 2;
		var fy = rect.y + this.spacing() / 2;
		this.drawIconPlusZoom(skill.iconIndex, fx, fy, 2);
		var skillTextFrame = ImageManager.loadBitmap('img/actorhud/', 'selectSkillFrame_' + skill.stypeId, 0, true);
		this._spriteIconTextFrame = new Sprite(skillTextFrame);
		this._spriteIconTextFrame.x = fx + 37;
		this._spriteIconTextFrame.y = fy + 87;
		this.addChild(this._spriteIconTextFrame)

		this._spriteIconText = new Sprite();
		this._spriteIconText.x = fx + 29;
		this._spriteIconText.y = fy + 78;
		this._spriteIconText.bitmap = new Bitmap(40, 40);
		this._spriteIconText.bitmap.textColor = '#f9d730'
		this._spriteIconText.bitmap.fontSize = 18;
		this._spriteIconText.bitmap.outlineWidth = 2;
		this._spriteIconText.bitmap.outlineColor = "rgba(0,0,0,0.9)";
		this._spriteIconText.bitmap.smooth = true;
		this._spriteIconText.bitmap.drawText(skill.mpCost, 13, 13, 14, 14, "center");
		this.addChild(this._spriteIconText)

		this.drawName(skill, rect.x, 112);
	}
};

Window_SelectSkill.prototype.drawIconPlusZoom = function (iconIndex, x, y, zoom) {
	var bitmap = ImageManager.loadSystem('IconSet');
	var pw = Window_Base._iconWidth;
	var ph = Window_Base._iconHeight;
	var sx = iconIndex % 16 * pw;
	var sy = Math.floor(iconIndex / 16) * ph;
	var zoomValue = pw * zoom;
	this.contents._context.imageSmoothingEnabled = false;
	this.contents.blt(bitmap, sx, sy, pw, ph, x, y, zoomValue, zoomValue);
	this.contents._context.imageSmoothingEnabled = true;
};

Window_SelectSkill.prototype.drawName = function (skill, x, y) {
	var name = skill.name
	if (this._mode == 'relic') {
		this.contents.fontSize = 18;
		this.changeTextColor(this.rarityColor(skill));
		this.drawText(name, x - 6, y, this.itemWidth(), 'center'); //name.length+this.fontSize
	} else {
		if ((skill.id - 1) % 5 > 0) {
			var start = name.indexOf(' ')
			var lv = name.substring(0, start);
			name = name.substring(start + 1, name.length);
			this.contents.fontSize = 18;
			this.changeTextColor('#eadf27');
			this.drawText(name, x - 6, y, this.itemWidth(), 'center'); //name.length+this.fontSize
			this.drawText(lv, x - 6, y + 18, this.itemWidth(), 'center');
		} else {
			if (name.indexOf('Lv.') >= 0) {
				var start = name.indexOf(' ')
				name = name.substring(start + 1, name.length);
				this.contents.fontSize = 18;
				this.changeTextColor(this.rarityColor(skill));
				this.drawText(name, x - 6, y, this.itemWidth(), 'center'); //name.length+this.fontSize
			}
		}
	}
};

Window_SelectSkill.prototype.updateHelp = function () {
	console.log(this._mode)
	if (this._mode == 'relic') {
		var skill = $dataStates[this._skills[this.index()]];
		this.setHelpWindowItem(skill);
	} else {
		var skill = $dataSkills[this._skills[this.index()]];
		this.setHelpWindowItem(skill);
	}
};


//메세지를 출력하는 함수

//셀과 아이콘, 이름을 출력하는 함수
//ok시에 행동을 선택하는 함수
//씬을 끝내는 함수


	//-----------------------------------------------------------------------------
	// Window_skillHelp
	//
	// The window for displaying the description of the selected item.

function Window_skillHelp() {
		this.initialize.apply(this, arguments);
	}

Window_skillHelp.prototype = Object.create(Window_Base.prototype);
Window_skillHelp.prototype.constructor = Window_skillHelp;

Window_skillHelp.prototype.initialize = function (numLines) {
	var width = Graphics.boxWidth;
	var height = this.fittingHeight(numLines || 3);
	Window_Base.prototype.initialize.call(this, 0, 0, width, height);
	this._text = '';
	this._name = '';
	this._item = null;
	this._mode = 'skill'
};

Window_skillHelp.prototype.setText = function (item) {
	if (this._mode == 'relic') {
		var text = item ? item.message1 : '';
		if (text) {
			if (item.message2) text += '\n' + item.message2;
			if (item.message4) text += '\n' + item.message4;
		}
		var name = item ? item.name : '';
		if (this._text !== text) {
			this._text = text;
			this._name = name;
			this.refresh();
		}
	} else {
		if ((item.id - 1) % 5 > 0) {
			var text = item ? item.message2.split('\\n')[(item.id - 2) % 5] : '';// item && $gameSwitches._data[1000 + item.id + 1]? item.message2.split('\\n')[0] : '???';
			var name = item ? item.name : '';
		} else {
			var text = item ? item.description : '';
			var name = item ? item.name : '';
			if (name && name.indexOf('Lv.') >= 0) {
				var start = name.indexOf(' ')
				name = name.substring(start + 1, name.length);
			}
		}
		if (this._text !== text) {
			this._text = text;
			this._name = name;
			this.refresh();
		}
	}
};

Window_skillHelp.prototype.clear = function () {
	this.setText('');
};

Window_skillHelp.prototype.setItem = function (item) {
	this._item = item;
	if (item && item.maxTurns != null) this._mode = 'relic';
	this.setText(item ? item : '');
};

Window_skillHelp.prototype.refresh = function () {
	this.contents.clear();
	var x, y;

	if (this._mode == 'relic') {
		if (this._text) {
			var textWidthDx = this._text.split('\n');
			this.resetFontSettings();
			this.contents.fontSize = 22;
			x1 = (this.width - this.textWidth(textWidthDx[0].replace(/\\c\[[0-9]+\]/gi, ''))) / 2 - this.textPadding() * 4;
			if (textWidthDx[1]) x2 = (this.width - this.textWidth(textWidthDx[1].replace(/\\c\[[0-9]+\]/gi, ''))) / 2 - this.textPadding() * 4;
			else x2 = x1;
			y = textWidthDx.length > 1 ? 30 : 40;
			var textState = { index: 0, x: x1, y: y, left: x2 };
			textState.text = this.convertEscapeCharacters(this._text);
			textState.height = this.calcTextHeight(textState, false);
			while (textState.index < textState.text.length) {
				this.processCharacter(textState);
			}
		}

		if (this._name) {
			this.contents.fontSize = 24;
			this.changeTextColor('#eadf27');//this.rarityColor(this._item));
			x = (this.width - this.textWidth(this._name)) / 2 - this.textPadding() * 4;
			y = 0
			var textState = { index: 0, x: x, y: y, left: x };
			textState.text = this.convertEscapeCharacters(this._name);
			textState.height = this.calcTextHeight(textState, false);
			while (textState.index < textState.text.length) {
				this.processCharacter(textState);
			}
		}
	} else {
		if (this._text) {
			var textWidthDx = this._text.split('\n');
			this.resetFontSettings();
			this.contents.fontSize = 22;
			x1 = (this.width - this.textWidth(textWidthDx[0].replace(/\\c\[[0-9]+\]/gi, ''))) / 2 - this.textPadding() * 4;
			if (textWidthDx[1]) x2 = (this.width - this.textWidth(textWidthDx[1].replace(/\\c\[[0-9]+\]/gi, ''))) / 2 - this.textPadding() * 4;
			else x2 = x1;
			y = textWidthDx.length > 1 ? 30 : 40;
			var textState = { index: 0, x: x1, y: y, left: x2 };
			textState.text = this.convertEscapeCharacters(this._text);
			textState.height = this.calcTextHeight(textState, false);
			while (textState.index < textState.text.length) {
				this.processCharacter(textState);
			}
		}

		if (this._name) {
			this.contents.fontSize = 24;
			this.changeTextColor('#eadf27');//this.rarityColor(this._item));
			x = (this.width - this.textWidth(this._name)) / 2 - this.textPadding() * 4;
			y = textWidthDx.length > 1 ? 0 : 8;
			var textState = { index: 0, x: x, y: y, left: x };
			textState.text = this.convertEscapeCharacters(this._name);
			textState.height = this.calcTextHeight(textState, false);
			while (textState.index < textState.text.length) {
				this.processCharacter(textState);
			}
		}
	}
};