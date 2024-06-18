/*:
 * @plugindesc <QABS_Movement>
 * Adds analogue stick-like movement control with a visual stick for QABS.
 * @author YourName
 *
 * @help
 * ============================================================================
 * ## Description
 * ============================================================================
 * This plugin adds an analogue stick-like movement control with a visual stick
 * for QABS, allowing for more fluid and precise character movement similar to
 * mobile games.
 *
 * ============================================================================
 * ## How to Use
 * ============================================================================
 * Simply install this plugin and configure the button and image for the movement
 * control in the plugin parameters.
 *
 * ============================================================================
 * ## Plugin Parameters
 * ============================================================================
 * @param Movement Button
 * @desc The button used for movement control.
 * @default A
 *
 * @param Stick Image
 * @desc The image file for the analogue stick (place in img/system/).
 * @default stick.png
 */

(function() {
  var parameters = PluginManager.parameters('<QABS_Movement>');
  var movementButton = String(parameters['Movement Button'] || 'A');
  var stickImage = String(parameters['Stick Image'] || 'stick');
  var stickSprite;

  var Alias_Scene_Map_start = Scene_Map.prototype.start;
  Scene_Map.prototype.start = function() {
    Alias_Scene_Map_start.call(this);
    this.createMovementStick();
  };

  Scene_Map.prototype.createMovementStick = function() {
    var bitmap = ImageManager.loadSystem(stickImage);
    stickSprite = new Sprite(bitmap);
    stickSprite.x = 50; // Position X on screen
    stickSprite.y = Graphics.height - bitmap.height - 50; // Position Y on screen
    stickSprite.opacity = 200; // Semi-transparent
    this.addChild(stickSprite);
  };

  var Alias_Game_Player_update = Game_Player.prototype.update;
  Game_Player.prototype.update = function(sceneActive) {
    Alias_Game_Player_update.call(this, sceneActive);
    this.updateQABSMovement();
  };

  Game_Player.prototype.updateQABSMovement = function() {
    if (Input.isPressed(movementButton)) {
      var direction = this.getAnalogueDirection();
      if (direction) {
        this.moveStraight(direction);
      }
    }
  };

  Game_Player.prototype.getAnalogueDirection = function() {
    var x = Input._dir4 ? Input._dir4.x : 0;
    var y = Input._dir4 ? Input._dir4.y : 0;
    if (x === 0 && y === 0) return 0;
    var angle = Math.atan2(y, x) * 180 / Math.PI;
    if (angle < 0) angle += 360;
    if (angle >= 45 && angle < 135) return 2; // down
    if (angle >= 135 && angle < 225) return 4; // left
    if (angle >= 225 && angle < 315) return 8; // up
    return 6; // right
  };
})();

