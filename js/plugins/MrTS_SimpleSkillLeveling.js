//=============================================================================
// MrTS_SimpleSkillLeveling.js
//=============================================================================

/*:
* @plugindesc Skills change to stronger version of themselves after X uses.
* @author Mr. Trivel
* 
* @help 
* --------------------------------------------------------------------------------
* Terms of Use
* --------------------------------------------------------------------------------
* Don't remove the header or claim that you wrote this plugin.
* Credit Mr. Trivel if using this plugin in your project.
* Free for commercial and non-commercial projects.
* --------------------------------------------------------------------------------
* Version 1.1
* --------------------------------------------------------------------------------
** 
* --------------------------------------------------------------------------------
* Skill Tags
* --------------------------------------------------------------------------------
* To make skill change after some uses, use the following tag:
* <LevelUpTo: [ID], [USES], [REMOVE]>
*
* Will make skill require a specific other existing skill that was used.
* <LevelUpRequire: [ID], [USES], [REMOVE]>
* 
* [ID] - Skill ID to change to
* [USES] - After how many uses change into that skill
* [REMOVE] - 0 - keep skill after leveling up, 1 - remove skill after leveling up
* (Remove is optional, by default it'll remove)
* 
* Examples:
* <LevelUpTo: 5, 25, 0>
* <LevelUpTo: 8, 10>
*
* <LevelUpTo: 5, 20, 0>
* <LevelUpRequire: 7, 5>
* <LevelUpRequire: 8, 9>
*
* <LevelUpTo: 7, 20>
* <LevelUpRequire: 8, 10, 0>
*
* <LevelUpTo: 8, 10>
* <LevelUpRequire: 7, 20> 
* --------------------------------------------------------------------------------
* 
* --------------------------------------------------------------------------------
* Version History
* --------------------------------------------------------------------------------
* 1.1 - Added multiple skill requirement for level up.
*     - Added ability to keep skills after they leveled up.
*     - Fixed a bug where it'd count as multiple uses for multiple target skill.
* 1.0 - Release
*/

(function() {
	var _GameActor_initMembers = Game_Actor.prototype.initMembers;
	Game_Actor.prototype.initMembers = function() {
		_GameActor_initMembers.call(this);
	    Game_Battler.prototype.initMembers.call(this);
	    this._skillUsedTimes = {};
	    this._levelingSkillNeeds = [];
	};

	var _GameActor_learnSkill = Game_Actor.prototype.learnSkill;
    Game_Actor.prototype.learnSkill = function (skillId, levelup) {
        // $cgmv.EncyclopediaDiscoverSkill(skillId);
		if (!this.isLearnedSkill(skillId) && !this.isPreviousSkill(skillId)) {
			var absKeyId = null;
            if ($dataSkills[skillId].occasion == 2) {
                //var shortCutIndex = quickSlot >= 0? quickSlot : $gameParty._shortCut.indexOf(0)
                //$gameParty.setShortCut(shortCutIndex, skillId);
                //$gameSystem.changeABSOverrideSkill(shortCutIndex + 6, skillId);
                var absKeys = $gameSystem.absKeys();
                if (!absKeys[6].skillId) {
                    $gameSystem.changeABSOverrideSkill(6, skillId);
                    $gameSystem._slotId = 7;
                }
                for (var i = 7; i < 11; i++) {
                    if (!absKeys[i].skillId) {
						$gameSystem.changeABSOverrideSkill(i, skillId);
						absKeyId = i;
                        break;
                    }
                }
            }
            if ($dataSkills[skillId].meta.LevelUpTo)
                this.grabSkillLevelingData(skillId);
            this._skillUsedTimes[skillId] = 0;
            _GameActor_learnSkill.call(this, skillId);
			if (skillId > 100 && skillId < 500) {
				// // $gameTemp._infoPopup.push($dataSkills[skillId])

				//���� ��ų�� �� á�ٸ� ��ų�� �ش� ���� �߰� �� ����
				if (absKeyId == null && !levelup) {
                    PRG._selectSkillMode.push(['discard', skillId]);
                    // if (SceneManager.isCurrentScene(Scene_Map)) SceneManager.push(Scene_SelectSkill)
				}
			}
        } else {
            var absKeys = $gameSystem.absKeys();
            for (var i = 7; i < 11; i++) {
                if (Math.ceil(absKeys[i].skillId/5) == Math.ceil(skillId/5)) {
                    this._skillUsedTimes[absKeys[i].skillId] = 9999;
                    this.checkSkillLevelUps();
                    return;
                }
            }
        }
	};

    Game_Actor.prototype.isPreviousSkill = function (skillId) {
        for (var i = 7; i < 11; i++) {
            if (Math.ceil($gameSystem.absKeys()[i].skillId / 5) == Math.ceil(skillId / 5)) {
                if ($gameSystem.absKeys()[i].skillId > skillId)
                return true;
            }
        }
        return false;
    }

    Game_Actor.prototype.grabSkillLevelingData = function (skillId) {
		var lines = $dataSkills[skillId].note.split(/[\r\n]/);
		var skillLearnObj = {result: 0, required: [], completed: false};
		var regex1 = /<LevelUpTo:[ ]*(\d+),[ ]*(\d+),?[ ]?(\d+)?>/i;
		var regex2 = /<LevelUpRequire:[ ]*(\d+),[ ]*(\d+),?[ ]?(\d+)?>/i;
		for (var i = 0; i < lines.length; i++) {
			var regex1Match = regex1.exec(lines[i]);
			if (regex1Match)
            {
				var goal = Number(regex1Match[1]);
				var reqId = skillId;
				var uses = Number(regex1Match[2]);
				var remove = regex1Match[3] ? regex1Match[3] === "1" : true;
				skillLearnObj.result = goal;
				skillLearnObj.required.push({id: reqId, uses: uses, remove: remove});
				continue;
			}

			var regex2Match = regex2.exec(lines[i]);
			if (regex2Match)
			{
				var reqId = Number(regex2Match[1]);
				var uses = Number(regex2Match[2]);
				var remove = regex2Match[3] ? regex2Match[3] === "1" : true;
				skillLearnObj.required.push({id: reqId, uses: uses, remove: remove});
				continue;
			}
        }
		this._levelingSkillNeeds.push(skillLearnObj);
	};

	Game_Actor.prototype.checkSkillLevelUps = function() {
		for (var i = 0; i < this._levelingSkillNeeds.length; i++) {
			var skill = this._levelingSkillNeeds[i];
			if (skill.completed) continue;
			var allDone = true;
			for (var j = 0; j < skill.required.length; j++) {
				var req = skill.required[j];
				if (!this._skillUsedTimes[req.id]) allDone = false;
				if (this._skillUsedTimes[req.id] < req.uses) allDone = false;
				if (!allDone) break;
			}
			if (allDone)
            {
                var quickSlot = 0;
                var absKeys = $gameSystem.absKeys();
                for (var j = 0; j < skill.required.length; j++) {
                    for (var k = 7; k < 11; k++) {
                        if (absKeys[k].skillId == skill.required[j].id) {
                            quickSlot = k;
                            break;
                        }
                    }
                    if (skill.required[j].remove) this.forgetSkill(skill.required[j].id);
                }
                var switchId = skill.result + 1000;
                if (!$gameSwitches._data[switchId]) {
                    $gameSwitches._data[switchId] = true;
                }
                this.learnSkill(skill.result, true);
                $gameSystem.changeABSOverrideSkill(6, skill.result);
                if (quickSlot > 0) {
                    $gameSystem._absOverrideKeys[quickSlot].skillId = null;
                    $gameSystem.changeABSOverrideSkill(quickSlot, skill.result);
                }
                this._levelingSkillNeeds[i].completed = true;

                QABSManager.startPopup('QABS-SKILL-LEVEL-UP', {
                    x: $gamePlayer.cx(),
                    y: $gamePlayer.cy(),
                    string: 'Skill Level Up!',
                    duration: 80
                })
                $gamePlayer.requestAnimation(74);
			}
		}
	};

    Game_Actor.prototype.increaseSkillUsage = function (skill) {
        if (this != $gameParty.leader()) return;
        if (!this._skillUsedTimes[skill.id] == undefined) return; //this._skillUsedTimes[skill.id] = 0;
        if (this.isStateAffected(258)) this._skillUsedTimes[skill.id] += 2;
		else this._skillUsedTimes[skill.id]++;
		this.checkSkillLevelUps(skill);
	};

	var _Game_Actor_useItem = Game_Actor.prototype.useItem;
    Game_Actor.prototype.useItem = function (item) {
		_Game_Actor_useItem.call(this, item);
		if (DataManager.isSkill(item))
		{
            this.increaseSkillUsage(item);
		}
	};
})();
