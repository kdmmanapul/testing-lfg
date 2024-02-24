// Define variables to hold the cursor position
var cursorX = 0;
var cursorY = 0;

// Listen for mouse movement and update the cursor position
document.addEventListener('mousemove', function(event) {
    cursorX = event.pageX;
    cursorY = event.pageY;
});

(function($){
 
    // Use this site "https://keycode.info/" to find the keycode for the button you want.
    // https://www.toptal.com/developers/keycode
    Input.keyMapper[191] = "test";
    var Alias_Scene_Map_updateMain = Scene_Map.prototype.updateMain;
  
    Scene_Map.prototype.updateMain = function() {
      Alias_Scene_Map_updateMain.call(this);
       if (Input.isTriggered('#m')) { 
        $gameTemp.reserveCommonEvent(306); 
       }

       if (Input.isTriggered('#n')) { 
        const toggleHud = $gameSwitches.value(1600);
        $gameSwitches.setValue(1600, !toggleHud);
        $gameTemp.reserveCommonEvent(307);
        if (toggleHud) {
            document.body.style.cursor = 'none';
        } else {
            TouchInput.setCursor('pointer');
        }
       }

       if (Input.isTriggered('#b')) { 
        for(var i=1; i<=$gameVariables.value(334);i++) {
            var enemyId = $gameVariables.value(335)
            $gameMap.copyEventFromMapToRegion(1, enemyId, 10, true)
        }
       }

       if (Input.isTriggered('#j')) { 
        console.log(cursorX, cursorY, 'x, y');
       }
    }
  })()


  // Stuff For Sandbox Skills //
  // [First Page]
  const skillsPlayer = $gamePlayer.battler()._skills;
  const filteredSkills = skillsPlayer.filter(skill => skill > 100 && skill < 500);

  if (filteredSkills.length == 4) {
    // $gameMessage.add("You already have 4 skills, silly.");
    $gameVariables.setValue(339, 4);
    $gameSwitches.setValue(1597, true);
  } else {
    let choicesArr = [
        'Lv.Max And, Fireball', 
        'Lv.Max Heat Breath', 
        'Lv.Max Iceball', 
        'Lv.Max Cold Breath', 
        'Lv.Max Wind Cutter', 
        'Lv.Max Tornado', 
        'Next Page',
    ]
    // Set choices to A, B, C; default C, no cancel
    $gameMessage.setChoices(choicesArr, 2, -1);
    // Set background: Window
    $gameMessage.setChoiceBackground(0);
    // Set position: Center
    $gameMessage.setChoicePositionType(1);
    // On choice, set variable #1 equal to the selected index
    $gameMessage.setChoiceCallback(n => {
        console.log(n, 'choice n')
        const actions = {
            0: () => learnSkillAndSetVariable(105),
            1: () => learnSkillAndSetVariable(108),
            2: () => learnSkillAndSetVariable(115),
            3: () => learnSkillAndSetVariable(118),
            4: () => learnSkillAndSetVariable(125),
            5: () => learnSkillAndSetVariable(128),
            6: () => changePageAndJumpToLabel(338, 2),
        };
    
        if (actions[n]) {
            actions[n]();
        }
    });

    function learnSkillAndSetVariable(skillId) {
        $gameActors.actor(1).learnSkill(skillId)
        $gameVariables.setValue(340, $dataSkills[skillId].name);
        $gameSwitches.setValue(1597, true);
    }
    
    function changePageAndJumpToLabel(variable, page) {
        $gameVariables.setValue(variable, page)
        // $gameInterp.command119(["SkillSelection"]);
    }
  }

  // [Second Page]
//   const skillsPlayer = $gamePlayer.battler()._skills;
//   const filteredSkills = skillsPlayer.filter(skill => skill > 100 && skill < 500);

//   if (filteredSkills.length == 4) {
//     // $gameMessage.add("You already have 4 skills, silly.");
//     $gameVariables.setValue(339, 4);
//   } else {
//     let choicesArr = [
//         'Previous Page', 
//         'Lv.Max Mana Bash', 
//         'Lv.Max Haste', 
//         'Lv.Max Fire Spear', 
//         'Lv.Max Fire Strike', 
//         'Lv.Max Frozen Protection', 
//         'Next Page',
//     ]
//     // Set choices to A, B, C; default C, no cancel
//     $gameMessage.setChoices(choicesArr, 2, -1);
//     // Set background: Window
//     $gameMessage.setChoiceBackground(0);
//     // Set position: Center
//     $gameMessage.setChoicePositionType(1);
//     // On choice, set variable #1 equal to the selected index
//     $gameMessage.setChoiceCallback(n => {
//         console.log(n, 'choice n')
//         const actions = {
//             0: () => changePageAndJumpToLabel(338, 1),
//             1: () => learnSkillAndSetVariable(143),
//             2: () => learnSkillAndSetVariable(155),
//             3: () => learnSkillAndSetVariable(158),
//             4: () => learnSkillAndSetVariable(163),
//             5: () => learnSkillAndSetVariable(168),
//             6: () => changePageAndJumpToLabel(338, 3),
//         };
    
//         if (actions[n]) {
//             actions[n]();
//         }
//     });

//     function learnSkillAndSetVariable(skillId) {
//         $gameActors.actor(1).learnSkill(skillId)
//         $gameVariables.setValue(340, $dataSkills[skillId].name);
//         $gameSwitches.setValue(1597, true);
//     }
    
//     function changePageAndJumpToLabel(variable, page) {
//         $gameVariables.setValue(variable, page)
//         // $gameInterp.command119(["SkillSelection"]);
//     }
//   }

  // [Third Page]
//   const skillsPlayer = $gamePlayer.battler()._skills;
//   const filteredSkills = skillsPlayer.filter(skill => skill > 100 && skill < 500);

//   if (filteredSkills.length == 4) {
//     // $gameMessage.add("You already have 4 skills, silly.");
//     $gameVariables.setValue(339, 4);
//   } else {
//     let choicesArr = [
//         'Previous Page', 
//         'Lv.Max Call Lightning', 
//         'Lv.Max Flash', 
//         'Lv.Max Slugfest', 
//         'Lv.Max Explosion!', 
//         'Lv.Max Icicle Spark',
//         'Next Page',
//     ]
//     // Set choices to A, B, C; default C, no cancel
//     $gameMessage.setChoices(choicesArr, 2, -1);
//     // Set background: Window
//     $gameMessage.setChoiceBackground(0);
//     // Set position: Center
//     $gameMessage.setChoicePositionType(1);
//     // On choice, set variable #1 equal to the selected index
//     $gameMessage.setChoiceCallback(n => {
//         console.log(n, 'choice n')
//         const actions = {
//             0: () => changePageAndJumpToLabel(338, 2),
//             1: () => learnSkillAndSetVariable(183),
//             2: () => learnSkillAndSetVariable(188),
//             3: () => learnSkillAndSetVariable(191),
//             4: () => learnSkillAndSetVariable(203),
//             5: () => learnSkillAndSetVariable(208),
//             6: () => changePageAndJumpToLabel(338, 4),
//         };
    
//         if (actions[n]) {
//             actions[n]();
//         }
//     });

//     function learnSkillAndSetVariable(skillId) {
//         $gameActors.actor(1).learnSkill(skillId)
//         $gameVariables.setValue(340, $dataSkills[skillId].name);
//         $gameSwitches.setValue(1597, true);
//     }
    
//     function changePageAndJumpToLabel(variable, page) {
//         $gameVariables.setValue(variable, page)
//         // $gameInterp.command119(["SkillSelection"]);
//     }
//   }

  // [Fouth Page]
//   const skillsPlayer = $gamePlayer.battler()._skills;
//   const filteredSkills = skillsPlayer.filter(skill => skill > 100 && skill < 500);

//   if (filteredSkills.length == 4) {
//     // $gameMessage.add("You already have 4 skills, silly.");
//     $gameVariables.setValue(339, 4);
//   } else {
//     let choicesArr = [
//         'Previous Page', 
//         'Lv.Max Rondo', 
//         'Lv.Max Railgun', 
//         'Lv.Max Explosive punch', 
//         'Lv.Max Vortex',
//         'Timestop', 
//         'Next Page',
//     ]
//     // Set choices to A, B, C; default C, no cancel
//     $gameMessage.setChoices(choicesArr, 2, -1);
//     // Set background: Window
//     $gameMessage.setChoiceBackground(0);
//     // Set position: Center
//     $gameMessage.setChoicePositionType(1);
//     // On choice, set variable #1 equal to the selected index
//     $gameMessage.setChoiceCallback(n => {
//         console.log(n, 'choice n')
//         const actions = {
//             0: () => changePageAndJumpToLabel(338, 3),
//             1: () => learnSkillAndSetVariable(133),
//             2: () => learnSkillAndSetVariable(263),
//             3: () => learnSkillAndSetVariable(268),
//             4: () => learnSkillAndSetVariable(178),
//             5: () => learnSkillAndSetVariable(336),
//             6: () => changePageAndJumpToLabel(338, 5),
//         };
    
//         if (actions[n]) {
//             actions[n]();
//         }
//     });

//     function learnSkillAndSetVariable(skillId) {
//         $gameActors.actor(1).learnSkill(skillId)
//         $gameVariables.setValue(340, $dataSkills[skillId].name);
//         $gameSwitches.setValue(1597, true);
//     }
    
//     function changePageAndJumpToLabel(variable, page) {
//         $gameVariables.setValue(variable, page)
//         // $gameInterp.command119(["SkillSelection"]);
//     }
//   }

  // [Fifth Page]
//   const skillsPlayer = $gamePlayer.battler()._skills;
//   const filteredSkills = skillsPlayer.filter(skill => skill > 100 && skill < 500);

//   if (filteredSkills.length == 4) {
//     // $gameMessage.add("You already have 4 skills, silly.");
//     $gameVariables.setValue(339, 4);
//   } else {
//     let choicesArr = [
//         'Previous Page', 
//         'Lv.Max Earthquake', 
//         'Lv.Max Thunder Flash', 
//         'Lv.Max Nuclear Punch', 
//     ]
//     // Set choices to A, B, C; default C, no cancel
//     $gameMessage.setChoices(choicesArr, 2, -1);
//     // Set background: Window
//     $gameMessage.setChoiceBackground(0);
//     // Set position: Center
//     $gameMessage.setChoicePositionType(1);
//     // On choice, set variable #1 equal to the selected index
//     $gameMessage.setChoiceCallback(n => {
//         console.log(n, 'choice n')
//         const actions = {
//             0: () => changePageAndJumpToLabel(338, 4),
//             1: () => learnSkillAndSetVariable(213),
//             2: () => learnSkillAndSetVariable(223),
//             3: () => learnSkillAndSetVariable(218),
//         };
    
//         if (actions[n]) {
//             actions[n]();
//         }
//     });

//     function learnSkillAndSetVariable(skillId) {
//         $gameActors.actor(1).learnSkill(skillId)
//         $gameVariables.setValue(340, $dataSkills[skillId].name);
//         $gameSwitches.setValue(1597, true);
//     }
    
//     function changePageAndJumpToLabel(variable, page) {
//         $gameVariables.setValue(variable, page)
//         // $gameInterp.command119(["SkillSelection"]);
//     }
//   }