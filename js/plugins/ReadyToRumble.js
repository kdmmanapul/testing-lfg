var Imported = Imported || {}; 
Imported.ReadyToRumble = true;

//==========================================================================
// ReadyToRumble.js
//==========================================================================

/*:
@plugindesc Add rumble mode to your MV projects
@author BreakerZero, with consultation from OS87, edit by YoraeRasante


* @param Rumble Control Option
* @desc Options menu's option name.
* @type text
* @default Rumble

@help
* ------------------------------------------------------------------------------
* Ready to Rumble by BereakerZero V1.0.5
* With consultation from OS87
* Edits by YoraeRasante to add to Options and use last used Gamepad
* Free for both commercial and non-commercial use, with credit.
* ------------------------------------------------------------------------------
* Special installation requirement: Download the latest version of NWJS, back
* up the version that ships withy MV and patch it over. The SDK version should
* go in your MV install, the redistributable goes in your exported game 
* package. This is important as there's NO GUARANTEE that the NWJS package
* shipped with MV has the necessary functions that allow the plugin to work,
* not to mention that MV ships with the x86 version which is functionally
* inadequate by modern game development standards. (Don't worry about the
* prospect of problems - as long as your install and project are 1.6.x or
* newer the official NWJS redistributable and the MV launcher are completely
* interchangeable. But again, you should back up the default launcher files
* in case something else happens.)
*	
* Instructions for patching the NWJS redistributable:
* http://bit.ly/2Zaahxb
* Download the latest NWJS redistributable:
* http://bit.ly/2XNqNGu
* ------------------------------------------------------------------------------
* Using the plugin:
* ------------------------------------------------------------------------------
* To activate the rumble feature in a given event or scene, use the following
* script call:
*
*  Rumble(strong,weak,time)
*     
* Strong: Maximum velocity of the effect's magnitude.
*         Default/maximum 1.0, minimum 0.2
* Weak:   Minimal velocity of the effect.
*         Default/maximum 1.0, minimum 0.2
* Time:   Defined in milliseconds, so 1000::1 and 5000 is 5 seconds.
*         Default 1000, maximum 5000.
*
* The values for weak and strong can also be reversed and still work properly.
*	
* For example:
*   Rumble(1,1,1000)
*   Rumble(0.4,0.2,500)
*   Rumble(0.3,0.6,5000)
* ------------------------------------------------------------------------------
* Rumble Option:
* ------------------------------------------------------------------------------
* Option was based on Yanfly's GamepadConfig and YEP_FpsSynchOption.
* If you are using YEP_OptionsCore.js, here's the code/parameter settings.
 *
 * ---------
 * Settings:
 * ---------
 * 
 * Name:
 * \i[83]Rumble
 *
 * Help Description:
 * Activate gamepad's Rumble effect.
 *
 * Symbol:
 * rumbleOption
 *
 * Show/Hide:
 * if (Imported.ReadyToRumble && Input.isControllerConnected()) {
 *   show = !Utils.isMobileDevice();
 * } else {
 *   show = false;
 * }
 *
 * Enable:
 * enabled = true;
 *
 * Ext:
 * ext = 0;
 *
 * ----------
 * Functions:
 * ----------
 * 
 * Make Option Code:
 * this.addCommand(name, symbol, enabled, ext);
 *
 * Draw Option Code:
 * var rect = this.itemRectForText(index);
 * var statusWidth = this.statusWidth();
 * var titleWidth = rect.width - statusWidth;
 * this.resetTextColor();
 * this.changePaintOpacity(this.isCommandEnabled(index));
 * this.drawOptionsName(index);
 * this.drawOptionsOnOff(index);
 *
 * Process OK Code:
 * var index = this.index();
 * var symbol = this.commandSymbol(index);
 * var value = this.getConfigValue(symbol);
 * this.changeValue(symbol, !value);
 *
 * Cursor Right Code:
 * var index = this.index();
 * var symbol = this.commandSymbol(index);
 * var value = this.getConfigValue(symbol);
 * this.changeValue(symbol, true);
 * 
 * Cursor Left Code:
 * var index = this.index();
 * var symbol = this.commandSymbol(index);
 * var value = this.getConfigValue(symbol);
 * this.changeValue(symbol, false);
 *
 * Default Config Code:
 * ConfigManager[symbol] = true;
 *
 * Save Config Code:
 * config[symbol] = ConfigManager[symbol];
 *
 * Load Config Code:
 * ConfigManager[symbol] = (config[symbol] !== undefined) ? config[symbol] : true
 *
* ------------------------------------------------------------------------------
* Q&A
* ------------------------------------------------------------------------------
* What reasoning does the NWJS update provide as part of the install process?
*     If you're on 64-bit, you can take advantage of improved access to your
*     system resources beyond the 3GB combied access limit, making for improved
*     game prformance. Also, it is required in order to guarantee the complete
*     availability of the gamepad servicing ibraries for NWJS that allow for the
*     plugin to work properly.
* What should I say if my customers are complaining of rumble malfunctioning?
*     Provided the gamepad has a rumble fature there shouldn't be an issue. But
*     in rare cases, making a change to the rumble option while the gamepad is
*     connected may desync the rumble feature. If this occurrs, simply unplug
*     and reconnect your gamepad to cycle access to the rumble interface.
* ------------------------------------------------------------------------------
* Release history:
* ------------------------------------------------------------------------------
* v1.0.0: Initial RTM
* v1.0.1: Unanticipated bugfix
* v1.0.2: Added control switch assignment to change rumble mode status
* v1.0.3: Small change to accommodate the possibility of a crash when a gamepad
*         is disconnected. Also set the maximum supported values to eliminate
*         the possibility of the effect not working if set too high or too low.
* v1.0.4: Replaces control switch with option menu function, and directs the
*         effect to the most recenty-used gamepad. A very special thanks to 
*         YoraeRasante for this update. 
* v1.0.5: Added verification to detect the availability of a supported gamepad.
*         As of this update, the functions will not be available if gamepad
*         detection fails.
* ------------------------------------------------------------------------------
*/

var bZero = bZero || {};
 
//Setting the Options parameters
var parameters = PluginManager.parameters('ReadyToRumble');
bZero.rumbleOption = String(parameters['Rumble Control Option']);
ConfigManager.rumbleOption = true;
 
  //Detecting last gamepad used and saving the index
  bZero.rumble_Input_updateGamepad = Input._updateGamepadState;
  Input._updateGamepadState = function(gamepad) {
      bZero.rumble_Input_updateGamepad.call (this, gamepad);
      var buttons = gamepad.buttons;
      var axes = gamepad.axes;
      var threshold = 0.5;
      var used = buttons.some(function(button){
              if (button.pressed) return true;
              return false;
          });
      used = used || axes.some(function(axe){
              if (axe > threshold || axe < -threshold) return true;
              return false;
          });
      if (used) {
        this._lastGamepadUsed = gamepad.index;
      }
  }
 
  //The original Rumble function, with my edits
  function Rumble(strong, weak, time){
    if (ConfigManager.rumbleOption && Input._lastGamepadUsed || Input._lastGamepadUsed === 0) {
      //Checking if the option for Rumble is ON and if there is a gamepad saved as last used
      //Both checks for the gamepad are needed, first to see if a gamepad was detected and second because it'd return false for first check if the value was 0
      //Yes, even though 0 is a valid index value. For 0 in boolean is false.
         
        if(!strong){strong = 1.0}
        if(strong > 1.0){strong = 1.0}
        if(strong <= 0.2){strong = 0.2}
        if(!weak){weak = 1.0}
        if(weak > 1.0){weak = 1.0}
        if(weak <= 0.2){weak = 0.2}
        if(!time){time = 1000}
        if(time >= 5000){time = 5000}
            var gamepad = navigator.getGamepads()[Input._lastGamepadUsed]; //This is the whole point of the previous section, to detect what gamepad to rumble on
            if (!!gamepad && !!gamepad.vibrationActuator) {
                gamepad.vibrationActuator.playEffect("dual-rumble", {
                duration: time,
                strongMagnitude: strong,
                weakMagnitude: weak
                }
            );
        }
    }
  }
 
  //Check if any gamepad is connected
  if (!Input.isControllerConnected) Input.isControllerConnected = function() {
    if (navigator.getGamepads) {
      var gamepads = navigator.getGamepads();
      if (gamepads) {
        for (var i = 0; i < gamepads.length; i++) {
          var gamepad = gamepads[i];
          if (gamepad && gamepad.connected) return true;
        }
      }
    }
    return false;
  };
 
  //Adding to Options
  bZero.rumble_Window_Options_addGeneralOptions = Window_Options.prototype.addGeneralOptions;
  Window_Options.prototype.addGeneralOptions = function() {
    bZero.rumble_Window_Options_addGeneralOptions.call(this);
    if (!Imported.YEP_OptionsCore) this.addRumbleOptionCommand();
  };
 
  Window_Options.prototype.addRumbleOptionCommand = function() {
    if (Input.isControllerConnected()) {
      this.addCommand(bZero.rumbleOption, 'rumbleOption', true);
      this._addedController = true;
    }
  };
 
  bZero.rumble_Window_Options_update = Window_Options.prototype.update;
  Window_Options.prototype.update = function() {
    bZero.rumble_Window_Options_update.call(this);
    if (this._addedController && !Input.isControllerConnected()) {
      this.refresh();
      this.height = this.windowHeight();
      this.updatePlacement();
    }
  };