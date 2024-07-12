//=============================================================================
// PointSystem.js
//=============================================================================

/*:
 * @plugindesc Implements a Point system for QABS
 * @author Your Name
 *
 * @param X-Axis
 * @desc Set point display X Axis
 * @default 20
 *
 * @param Y-Axis
 * @desc Set point display Y Axis
 * @default 20
 *
 * @param Image Name
 * @desc Name of the image file for point display (in img/system/)
 * @default PointDisplay
 *
 * @help This plugin adds a Point system to the game.
 * Points increase when dealing damage and decrease when taking damage.
 * 
 * Plugin Commands:
 *   PointSystem Add 100         # Adds 100 points
 *   PointSystem Subtract 50     # Subtracts 50 points
 *   PointSystem Set 1000        # Sets points to 1000
 *   PointSystem Show            # Shows the point display
 *   PointSystem Hide            # Hides the point display
 * 
 * Script Calls:
 *   PointSystem.addPoints(100);
 *   PointSystem.subtractPoints(50);
 *   PointSystem.setPoints(1000);
 *   PointSystem.show();
 *   PointSystem.hide();
 */

var PointSystem = PointSystem || {};

(function() {
    var parameters = PluginManager.parameters('PointSystem');
    var xAxis = Number(parameters['X-Axis'] || 20);
    var yAxis = Number(parameters['Y-Axis'] || 20);
    var imageName = String(parameters['Image Name'] || 'Treasure');

    PointSystem.points = 0;
    PointSystem.isVisible = false;

    PointSystem.addPoints = function(amount) {
        this.points += Math.round(amount);
        this.refreshPointsDisplay();
    };

    PointSystem.subtractPoints = function(amount) {
        this.points = Math.max(0, this.points - Math.round(amount * 5));
        this.refreshPointsDisplay();
    };

    PointSystem.getPoints = function() {
        return this.points;
    };

    PointSystem.setPoints = function(value) {
        this.points = Math.max(0, value);
        this.refreshPointsDisplay();
    };

    PointSystem.show = function() {
        // console.log('PointSystem.show() called');
        this.isVisible = true;
        this.refreshPointsDisplay();
    };

    PointSystem.hide = function() {
        // console.log('PointSystem.hide() called');
        this.isVisible = false;
        this.refreshPointsDisplay();
    };

    PointSystem.refreshPointsDisplay = function() {
        if (SceneManager._scene instanceof Scene_Map && SceneManager._scene._pointDisplay) {
            SceneManager._scene._pointDisplay.refresh();
            SceneManager._scene._pointDisplay.updateVisibility();
        }
    };

    // Hook into QABS damage calculation
    var _Game_ABSAction_applyAni = Game_ABSAction.prototype.applyAni;
    Game_ABSAction.prototype.applyAni = function(target) {
        var result = _Game_ABSAction_applyAni.call(this, target);
        if (result.hpDamage > 0) {
            if (this.subject().isPlayer()) {
                PointSystem.addPoints(result.hpDamage);
            } else if (target.isPlayer()) {
                PointSystem.subtractPoints(result.hpDamage);
            }
        }
        return result;
    };

    // Hook into regular damage calculation (for non-QABS damage)
    var _Game_Action_executeHpDamage = Game_Action.prototype.executeHpDamage;
    Game_Action.prototype.executeHpDamage = function(target, value) {
        _Game_Action_executeHpDamage.call(this, target, value);
        if (value > 0) {
            if (target === $gamePlayer.battler()) {
                PointSystem.subtractPoints(value);
            } else if (this.subject() === $gamePlayer.battler()) {
                PointSystem.addPoints(value);
            }
        }
    };

    // Create Point Display Sprite
    function Sprite_PointDisplay() {
        this.initialize.apply(this, arguments);
    }

    Sprite_PointDisplay.prototype = Object.create(Sprite_Base.prototype);
    Sprite_PointDisplay.prototype.constructor = Sprite_PointDisplay;

    Sprite_PointDisplay.prototype.initialize = function() {
        Sprite_Base.prototype.initialize.call(this);
        this.x = xAxis;
        this.y = yAxis;
        this.createBackground();
        this.createTextSprite();
        this.refresh();
        this.updateVisibility();
    };

    Sprite_PointDisplay.prototype.createBackground = function() {
        this._background = new Sprite();
        this._background.bitmap = ImageManager.loadSystem(imageName);
        this.addChild(this._background);
    };

    Sprite_PointDisplay.prototype.createTextSprite = function() {
        this._textSprite = new Sprite();
        this._textSprite.bitmap = new Bitmap(200, 48);
        this._textSprite.bitmap.fontSize = 20;
        this.addChild(this._textSprite);
    };

    Sprite_PointDisplay.prototype.refresh = function() {
        // Clear and prepare text bitmap
        this._textSprite.bitmap.clear();
        this._textSprite.bitmap.textColor = '#FFFFFF';
        var text = 'Points: ' + PointSystem.points;
        var textWidth = this._textSprite.bitmap.measureTextWidth(text) + 20; // Add some padding
        var textHeight = this._textSprite.bitmap.height;
        
        // Adjust background width and height
        var newWidth = Math.max(textWidth, 200); // Ensure a minimum width
        var newHeight = textHeight;
        
        // Resize background sprite
        this._background.scale.x = newWidth / this._background.bitmap.width;
        this._background.scale.y = newHeight / this._background.bitmap.height;
        
        // Center text on background
        this._textSprite.x = (newWidth - textWidth) / 2;
        this._textSprite.y = (newHeight - textHeight) / 2;
        
        // Draw text
        this._textSprite.bitmap.drawText(text, 0, 0, textWidth, textHeight, 'center');
        
        this.updateVisibility();
    };

    Sprite_PointDisplay.prototype.updateVisibility = function() {
        this.visible = PointSystem.isVisible;
        if (this._background) this._background.visible = this.visible;
        if (this._textSprite) this._textSprite.visible = this.visible;
    };

    // Add Point Display to Scene_Map
    var _Scene_Map_createAllWindows = Scene_Map.prototype.createAllWindows;
    Scene_Map.prototype.createAllWindows = function() {
        _Scene_Map_createAllWindows.call(this);
        this.createPointDisplay();
    };

    Scene_Map.prototype.createPointDisplay = function() {
        this._pointDisplay = new Sprite_PointDisplay();
        this.addChild(this._pointDisplay);
    };

    // Add to Plugin Manager
    var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);
        if (command === 'PointSystem') {
            switch (args[0]) {
                case 'Add':
                    PointSystem.addPoints(Number(args[1]));
                    break;
                case 'Subtract':
                    PointSystem.subtractPoints(Number(args[1]));
                    break;
                case 'Set':
                    PointSystem.setPoints(Number(args[1]));
                    break;
                case 'Show':
                    PointSystem.show();
                    break;
                case 'Hide':
                    PointSystem.hide();
                    break;
            }
        }
    };
})();