//=============================================================================
// QABS
//=============================================================================

var Imported = Imported || {};

if (!Imported.QMovement || !QPlus.versionCheck(Imported.QMovement, '1.4.0')) {
	alert('Error: QABS requires QMovement 1.4.0 or newer to work.');
	throw new Error('Error: QABS requires QMovement 1.4.0 or newer to work.');
}

Imported.QABS = '1.7.0';

//=============================================================================
/*:
 * @plugindesc <QABS>
 * Action Battle System for QMovement
 * @version 1.7.0
 * @author Quxios  | Version 1.7.0
 * @site https://quxios.github.io/
 * @updateurl https://quxios.github.io/data/pluginsMin.json
 *
 * @repo https://github.com/quxios/QABS
 *
 * @requires QMovement
 *
 * @video TODO
 *
 * @param Attack Settings
 *
 * @param Quick Target
 * @parent Attack Settings
 * @desc Ground target skills will instantly cast at mouse location
 * @type Boolean
 * @default false
 *
 * @param Lock when Targeting
 * @parent Attack Settings
 * @desc Player can't move when using Ground / Select targeting skills
 * @type Boolean
 * @on Can't Move
 * @off Can Move
 * @default false
 *
 * @param Aim with Mouse
 * @parent Attack Settings
 * @desc All actions will be used towards your mouse location
 * @type Boolean
 * @on Towards mouse
 * @off Towards player direction
 * @default true
 *
 * @param Aim with Analog
 * @parent Attack Settings
 * @desc All actions will be used towards right analog stick when using a
 * gamepad.
 * @type Boolean
 * @on Towards right analog
 * @off Towards player direction
 * @default true
 *
 * @param Move Resistance Rate Stat
 * @parent Attack Settings
 * @desc Which stat to use for Move Resistance Rate
 * Default: xparam(1)     //  This is Evasion
 * @default xparam(1)
 *
 * @param Loot Settings
 *
 * @param Loot Decay
 * @parent Loot Settings
 * @desc How long until the loot disappears, in frames.
 * @type Number
 * @min 1
 * @default 600
 *
 * @param AoE Loot
 * @parent Loot Settings
 * @desc Collect nearby loot or pick up one at a time.
 * @type Boolean
 * @default false
 *
 * @param Loot Touch Trigger
 * @parent Loot Settings
 * @desc Pick up loot on player touch
 * @type Boolean
 * @default false
 *
 * @param Gold Icon
 * @parent Loot Settings
 * @desc Icon Index to display for gold loot
 * Default: 314
 * @default 314
 *
 * @param Level Animation
 * @parent Loot Settings
 * @desc The animation ID to play on level up.
 * Default: 52
 * @type Animation
 * @default 52
 *
 * @param Enemy AI
 *
 * @param AI Default Sight Range
 * @parent Enemy AI
 * @desc Default range for enemies to go after player, in pixels
 * Default: 240
 * @type Number
 * @min 1
 * @default 240
 *
 * @param AI Action Wait
 * @parent Enemy AI
 * @desc How many frames to wait before running AI for next skill
 * Default: 30
 * @min 1
 * @default 30
 *
 * @param AI Uses QSight
 * @parent Enemy AI
 * @desc Set to true or false if AI should use QSight
 * May decrease performance
 * @type Boolean
 * @default true
 *
 * @param AI uses QPathfind
 * @parent Enemy AI
 * @desc Set to true or false if AI should use QPathfind
 * May decrease performance
 * @type Boolean
 * @default true
 *
 * @param Default Skills
 * @type Struct<SkillKey>[]
 * @default []
 *
 * @help
 * ============================================================================
 * ## About
 * ============================================================================
 * A collider based action battle system for QMovement. *Note* This is not
 * your simple rpg maker action battle system. Using this plugin you can
 * create more advance like action games.
 *
 * For a demo visit the steamwork shop or Github repo
 * - http://steamcommunity.com/sharedfiles/filedetails/?id=952886994
 * - https://github.com/quxios/QMV-ABS-Demo
 * 
 * **_Plugin files in the repo are always kept up to date_**
 * ============================================================================
 * ## Is this for you?
 * ============================================================================
 * First, this is a very complex action battle system. If you're looking for
 * something that you can spend less than an hour to set up then this plugin
 * is not for you.
 *
 * To make full use of this plugin you need to know how to properly use and
 * setup QMovement. If you don't know what that plugin is or what colliders
 * are then again, this plugin is not for you.
 *
 * There are a lot of actions for skill sequences so you can create some pretty
 * crazy skills. Learning how to use the actions may take awhile since there
 * are a lot of actions, and maybe more to come.
 *
 * Enemies have a very basic AI. If you want to create more AI styles, you
 * will need to know how to JS and create a plugin / extend this plugin.
 * ============================================================================
 * ## Skill Keys
 * ============================================================================
 * **Default Skill keys**
 * ----------------------------------------------------------------------------
 * For the player to be able to use a skill from a hotkey, you will first need
 * to create a skill key in the plugin parameter `Default Skills`.
 *
 * ![Skill Keys](https://quxios.github.io/imgs/qabs/skillKeys.png)
 *
 * When creating a skill key you have 4 parameters:
 *
 * - #### Keyboard Input:
 *  * The keyboard input that will trigger this skill, set this to `mouse1` for
 *    left click, and `mouse2` for right click.
 * - #### Gamepad Input:
 *  * The gamepad input that will trigger this skill.
 * - #### Rebind:
 *  * If this is true, the skill that's assigned to this skill key can be
 *  reassigned.
 * - #### Skill Id:
 *  * The skill that this skill key will use when triggered.
 *
 * **_Note_** for input values those are the button values; `ok`, `cancel`, ect. Or
 * if you're using an input plugin, use their value. For example in QInput you can
 * use the `#A` for the a key or `#tab` for tab, ect.
 *
 * **_Note_** that rebind doesn't do much as this doesn't have a rebinding feature.
 * But the ground work is there so it can easily be created for an addon.
 *
 * **_Note_** that the `Skill Key Number` is the number next to the skill key you created.
 * `Skill Key Number` will be referenced later.
 *
 * ![Skill Keys](https://quxios.github.io/imgs/qabs/skillKeysNumber.png)
 *
 * ----------------------------------------------------------------------------
 * **Class Skill keys**
 * ----------------------------------------------------------------------------
 * You can change the players skill keys based on their class by adding the notetag:
 * ~~~
 * <skillKeys>
 * [SKILL KEY NUMBER]: [SKILL ID] [REBIND?]
 * </skillKeys>
 * ~~~
 * - #### SKILL KEY NUMBER:
 *  * The skill key that you want to change
 * - #### SKILL ID:
 *  * The skill to assign to this skill key number
 * - #### REBIND?:
 *  * Set to true or false if this can be reassigned
 *
 * If the skill key that you are trying to change has its `Rebind` value set to false,
 * nothing will happen since it can't be reassigned.
 *
 * **_Important!_** make sure the skill key you are trying to set is created in the
 * plugin parameters `Default Skills`. If it's not, the game will have an error.
 *
 * Example:
 * ~~~
 * <skillKeys>
 * 1: 2
 * 3: 15
 * 4: 16
 * </skillKeys>
 * ~~~
 * Class Skill keys will replace the default skill keys. So if you set up skill
 * keys 1 through 9 in the parameters and a class changes the skills for skill
 * keys 1, 3, 4. The over all skill keys will be, 1, 3, 4 from the class and
 * the rest are from the default values.
 * 
 * ----------------------------------------------------------------------------
 * **Weapon Skill keys**
 * ----------------------------------------------------------------------------
 * Weapons can also change the skill keys. For example you might want to change
 * the main attack to use a range skill if the player has a bow equipped! To do
 * this you use a similar tag as the class, but in the weapon
 * ~~~
 * <skillKeys>
 * [SKILL KEY NUMBER]: [SKILL ID]
 * </skillKeys>
 * ~~~
 * - #### SKILL KEY NUMBER:
 *  * The skill key that you want to change
 * - #### SKILL ID:
 *  * The skill to assign to this skill key number
 *
 * **_Important!_** make sure the skill key you are trying to set is created in the
 * plugin parameters `Default Skills`. If it's not, the game will have an error.
 *
 * Example:
 * ~~~
 * <skillKeys>
 * 1: 3
 * </skillKeys>
 * ~~~
 * Weapon skill keys take top priority, so they will replace both class keys
 * and the default keys! This example will replace skill key 1 with the skill
 * id 3
 * 
 * ----------------------------------------------------------------------------
 * **Override Skill keys**
 * ----------------------------------------------------------------------------
 * You can manually override a skill key with a plugin command. Override skill keys
 * take priority over weapon, class and default skill keys.
 *
 * Plugin command:
 * ~~~
 * qabs override SKILLKEYNUMBER SKILLID
 * ~~~
 * - #### SKILLKEYNUMBER:
 *  * The skill key that you want to change
 * - #### SKILLID:
 *  * The skill to assign to this skill key number. Set to -1 if you want to
 *    remove this override
 *
 * **_Important!_** make sure the skill key you are trying to set is created in the
 * plugin parameters `Default Skills`. If it's not, the game will have an error.
 *
 * **_Note_** that the player still needs to know the skill to be able to use it.
 * Assigning it won't let him use it if he doesn't know it.
 *
 * Example:
 * ~~~
 * qabs override 1 3
 * ~~~
 * Will override skill key 1 and assign the skill with id 3. To remove this
 * override later on use the plugin command:
 * ~~~
 * qabs override 1 -1
 * ~~~
 * 
 * ============================================================================
 * ## Skills
 * ============================================================================
 * **Skill Settings**
 * ----------------------------------------------------------------------------
 * Each skill should have a skill settings tag. This tag can change the settings
 * for the skills cooldown, through, and other effects. The tag is:
 * ~~~
 *  <absSettings>
 *  [SETTINGS]: [VALUE]
 *  </absSettings>
 * ~~~
 * Here's a list of all the settings:
 * ~~~
 * collider: [SHAPE], [WIDTH], [HEIGHT]
 * collides: [STRING]
 * cooldown: [NUMBER]
 * infront: [TRUE or FALSE]
 * rotate: [TRUE or FALSE]
 * through: [0, 1, 2 or 3]
 * throughTerrain: [LIST OF TERRAINS IT CAN GO THROUGH]
 * groundtarget: [NUMBER]
 * selecttarget: [NUMBER]
 * ~~~
 * - #### collider:
 *  * Set this to the collider this skill will use. See QMovement help for details
 *    on colliders. 
 *  * Default: The users collider
 *  * Format is: `shape, width, height`
 * - #### collides:
 *   * Set this to which collider type to check for against skill hit. If you
 *  want to use a custom collider, use the `<colliders></colliders>` tag
 *  * Default: collision
 * - #### cooldown:
 *  * Set to the number of frames until you can use this skill again. 
 *  * Default: 0
 * - #### infront:
 *  * Set to true or false. When true, the collider will appear in front of the user.
 *    When false the collider will be centered on the user. 
 *  * Default: false
 * - #### rotate:
 *  * Set to true or false. When true, the collider will rotate based on the users
 *    direction when skill is starting. Default: false
 * - #### through:
 *  * Set to 0, 1, 2, or 3. Default: 0
 *    - 0: Goes through events and tiles
 *    - 1: Goes through tiles but stops when it hits an event
 *    - 2: Goes through events but stops when it hits a tile
 *    - 3: Stops when it hits an event or tile
 * - #### throughTerrain:
 *  * Set to a list of tile terrains it can go through, separate each terrain with a comma
 * - #### groundtarget:
 *  * Set to the max distance, in pixels, for the ground target. If value is 0 ground 
 *    targeting will not be used. 
 *  * Default: 0
 * - #### selecttarget:
 *  * Set to the max distance, in pixels, for the select target. If value is 0 select 
 *    targeting will not be used. 
 *  * Default: 0
 * ----------------------------------------------------------------------------
 * **Skill Sequence**
 * ----------------------------------------------------------------------------
 * When a skill is used, it's sequence will run. You will need to configure
 * a sequence to tell the skill what it should do or it won't do anything.
 * 
 * This can be done with the notetag:
 * ~~~
 *  <absSequence>
 *  [ACTION]
 *  </absSequence>
 * ~~~
 * There are a bunch of actions. Each action needs to be on a different line.
 * 
 * Here's a list of all the actions:
 * ~~~
 * user casting [TRUE or FALSE]
 * user lock
 * user unlock
 * user speed [INC or DEC] [VALUE]
 * user move [FORWARD or BACKWARD] [DIST] [WAIT? TRUE or FALSE]
 * user moveHere [WAIT? TRUE or FALSE]
 * user jump [FORWARD or BACKWARD] [DIST] [WAIT? TRUE or FALSE]
 * user jumpHere [WAIT? TRUE or FALSE]
 * user teleport
 * user setDirection [DIR]
 * user directionFix [TRUE or FALSE]
 * user pose [POSE NAME] [WAIT? TRUE or FALSE]
 * user forceSkill [SKILL ID] [ANGLE OFFSET IN DEGREES]
 * user animation [ANIMATION ID]
 * user qaudio [NAME] [QAUDIO OPTIONS]
 * store
 * move [FORWARD or BACKWARD] [DIST] [DURATION] [WAIT? TRUE or FALSE]
 * moveToStored [DURATION] [WAIT? TRUE or FALSE]
 * wave [FORWARD or BACKWARD] [AMPLITUDE] [HARM] [DIST] [DURATION] [WAIT? TRUE or FALSE]
 * waveToStored [AMPLITUDE] [HARM] [DURATION] [WAIT? TRUE or FALSE]
 * trigger
 * adjustAim
 * wait [DURATION]
 * picture [FILE NAME] [ROTATABLE? TRUE or FALSE] [BASE DIRECTION]
 * trail [FILE NAME] [ROTATABLE? TRUE or FALSE] [BASE DIRECTION]
 * collider [SHOW or HIDE]
 * animation [ANIMATION ID]
 * se [NAME] [VOLUME] [PITCH] [PAN]
 * qaudio [NAME] [QAUDIO OPTIONS]
 * forceSkill [SKILL ID] [ANGLE OFFSET IN DEGREES]
 * globalLock
 * globalUnlock
 * ~~~
 * - #### user casting [TRUE or FALSE]
 *  * Set the user casting state. If the user is casting, this skill can be
 *    ended early if they get hit with a skill that has `user cancel` in it's
 *    `absOnDamage`
 *
 * - #### user lock
 *  * Locks the users movement. The user can't move or use any actions until
 *    `user unlock` is called. 
 *  * `user unlock` is called automatically after every skill ends to ensure 
 *    the user can move again if the skill ended.
 *
 * - #### user unlock
 *  * Unlocks the users movement. The user is unlocked if it was locked and can
 *    move and use actions again.
 *  * `user unlock` is called automatically after every skill ends to ensure
 *    the user can move again if the skill ended.
 *
 * - #### user speed [INC or DEC] [VALUE]
 *  * Changes the users move speed.
 *  * INC or DEC: 
 *    - Set to `inc` to increase movespeed
 *    - Set to `dec` to decrease move speed
 *  * VALUE: Set to a number to inc or dec the movespeed by.
 *
 * - #### user move [FORWARD or BACKWARD] [DIST] [WAIT? TRUE or FALSE]
 *  * The user will move forward or backwards by X distance.
 *  * FORWARD or BACKWARD:
 *    - Set to `forward` to move towards the direction the user is facing
 *    - Set to `backward` to move towards the opposite direction the user is facing
 *  * DIST: Set to the distance the user should move, in pixels
 *  * WAIT: Set to `true` or `false`. If true the sequencer will wait until the move
 *    is complete before going to the next action
 *
 * - #### user moveHere [WAIT? TRUE or FALSE]
 *  * The user will move to the skills current location
 *  * WAIT: Set to `true` or `false`. If true the sequencer will wait until the move
 *    is complete before going to the next action
 *
 * - #### user jump [FORWARD or BACKWARD] [DIST] [WAIT? TRUE or FALSE]
 *  * The user will jump forward or backwards by X distance.
 *  * FORWARD or BACKWARD: 
 *    - Set to `forward` to jump towards the direction the user is facing
 *    - Set to `backward` to jump towards the opposite direction the user is facing
 *  * DIST: Set to the distance the user should jump, in pixels
 *  * WAIT: Set to `true` or `false`. If true the sequencer will wait until the jump
 *    is complete before going to the next action
 *
 * - #### user jumpHere [WAIT? TRUE or FALSE]
 *  * The user will jump to the skills current location
 *  * WAIT: Set to `true` or `false`. If true the sequencer will wait until the jump
 *    is complete before going to the next action
 *
 * - #### user teleport
 *  * The user will be placed at the skills current location. Similar to an
 *    event transfer command.
 *
 * - #### user setDirection [DIR]
 *  * Change the users direction
 *  * DIR: Set to: 2, 4, 6 or 8. For diagonals; 1, 3, 7, or 9
 *
 * - #### user directionFix [TRUE or FALSE]
 *  * Sets the users direction fix.
 *  * TRUE or FALSE: Set to `true` or `false`. When true the users direction can't change
 *
 * - #### user pose [POSE NAME] [WAIT? TRUE or FALSE]
 *  * **_Requires QSprite plugin_**
 *  * If the user is a QSprite, it will play the pose
 *  * POSE NAME: The pose to play
 *  * WAIT: Set to `true` or `false`. If true the sequencer will wait until the pose
 *    is done playing before going to the next action
 *
 * - #### user forceSkill [SKILL ID] [ANGLE OFFSET IN DEGREES]
 *  * Forces the user to use a skill.
 *  * SKILL ID: The ID of the skill to use
 *  * ANGLE OFFSET: Lets you offset the angle, in degrees, that this skill be used
 *    towards. This is optional and can be left out.
 *    - Default: 0
 *
 * - #### user animation [ANIMATION ID]
 *  * Plays an animation on the user
 *  * ANIMATION ID: The ID of the animation to play
 *
 * - #### user qaudio [NAME] [QAUDIO OPTIONS]
 *  * **_Requires QAudio plugin_**
 *  * Binds a QAudio to the user
 *  * NAME: The name of the audio file to use
 *  * QAUDIO OPTIONS: any of the QAudio options besides; xX, yY, bindToCHARAID.
 *    View QAudio help for more details
 *
 * - #### store
 *  * Stores the skills current location. This location value is used when
 *    the actions `moveToStored` or 'waveToStored' are used.
 *
 * - #### move [FORWARD or BACKWARD] [DIST] [DURATION] [WAIT? TRUE or FALSE]
 *  * Moves the skill forward or backwards by X dist in Y frames
 *  * FORWARD or BACKWARD:
 *    - Set to `forward` to move towards the direction the skill is currently moving
 *    - Set to `backward` to move towards the opposite direction the skill is current moving
 *  * DIST: The distance you want the skill to move, in pixels.
 *  * DURATION: How long should it take to complete this move, in frames.
 *  * WAIT: Set to `true` or `false`. If true the sequencer will wait until the skill
 *    is done moving before going to the next action
 *
 * - #### moveToStored [DURATION] [WAIT? TRUE or FALSE]
 *  * Moves the skill to the stored position
 *  * DURATION: How long should it take to complete this move, in frames.
 *  * WAIT: Set to `true` or `false`. If true the sequencer will wait until the skill
 *    is done moving before going to the next action
 *
 * - #### wave [FORWARD or BACKWARD] [AMPLITUDE] [HARM] [DIST] [DURATION] [WAIT? TRUE or FALSE]
 *
 * - #### waveToStored [AMPLITUDE] [HARM] [DURATION] [WAIT? TRUE or FALSE]
 *
 * - #### trigger
 *  * Activates the skill at it's current location
 *
 * - #### adjustAim
 *  * Recalculates the direction the skill should move. This is only works
 *    when the skill is used from an enemy.
 *
 * - #### wait [DURATION]
 *  * The sequencer will wait before moving to the next action
 *  * DURATION: How long should the wait last, in frames
 *
 * - #### picture [FILE NAME] [ROTATABLE? TRUE or FALSE] [BASE DIRECTION]
 *  * Bind a picture to the skill
 *  * FILE NAME: The file name of the picture. Should be located in the
 *    Pictures folder. For an animated picture it should have the format:
 *    - %[COLS-SPEED]
 *    - COLS: The number of slices in the picture
 *    - SPEED: The time to wait between frames
 *  * ROTATABLE: Set to `true` or `false`. If true the picture will rotate based
 *    on the direction the skill is moving
 *  * BASE DIRECTION: The direction the skill is facing by default. The directions
 *    should be 2, 4, 6, or 8
 *
 * - #### trail [FILE NAME] [ROTATABLE? TRUE or FALSE] [BASE DIRECTION]
 *  * Binds a picture that stretches from the user to the skills position
 *  * FILE NAME: The file name of the picture. Should be located in the
 *    Pictures folder.
 *  * ROTATABLE: Set to `true` or `false`. If true the picture will rotate based
 *    on the direction the skill is moving
 *  * BASE DIRECTION: The direction the skill is facing by default. The directions
 *    should be 2, 4, 6, or 8
 *
 * - #### collider [SHOW or HIDE]
 *  * Shows the skills collider
 *  * SHOW or HIDE: 
 *    - Set to `show` to show the skills collider
 *    - Set to `hide` to hide the skills collider
 *
 * - #### animation [ANIMATION ID]
 *  * Play an animation at the skills current location
 *  * ANIMATION ID: The ID of the animation to play
 *
 * - #### se [NAME] [VOLUME] [PITCH] [PAN]
 *  * Play an se
 *  * NAME: The name of the SE to play
 *  * VOLUME: The volume of the SE, default: 90
 *  * PITCH: The pitch of the SE, default: 100
 *  * PAN: The pan of the SE, default: 0
 *
 * - #### qaudio [NAME] [QAUDIO OPTIONS]
 *  * Play a qAudio at the skills location
 *  * NAME: The name of the audio file
 *  * QAUDIO OPTIONS: Visit the QAudio help for information. The options
 *    are the same from the plugin commands. x, y, bindTo options will not work.
 *
 * - #### forceSkill [SKILL ID] [ANGLE OFFSET]
 *  * Force a skill at the skills current location
 *  * SKILL ID: The ID of the skill to use
 *  * ANGLE OFFSET: Lets you offset the angle, in degrees, this skill be used towards.
 *    This is optional and can be left out.
 *
 * - #### globalLock
 *  * Locks all characters movement
 *
 * - #### globalUnlock
 *  * Unlocks all characters movement
 *
 * ----------------------------------------------------------------------------
 * **Skill On Damage**
 * ----------------------------------------------------------------------------
 * Whenever a skill hits a target you can run another sequence. This is done
 * by using the notetag:
 * ~~~
 * <absOnDamage>
 * [ACTION]
 * </absOnDamage>
 * ~~~
 * There are a few actions you can add here:
 * ~~~
 * target move [TOWARDS or AWAY or INTO] [DIST]
 * target jump [TOWARDS or AWAY or INTO] [DIST]
 * target pose [POSE]
 * target cancel
 * target qaudio [NAME] [QAUDIO OPTIONS]
 * user forceSkill [SKILL ID] [ANGLE OFFSET IN DEGREES]
 * animationTarget [0 or 1]
 * ~~~
 * - #### target move [TOWARDS or AWAY or INTO] [DIST]
 *  * The target will move X distance.
 *  * TOWARDS or AWAY or INTO: 
 *    - Set to `towards` to move towards the user of the skill
 *    - Set to `away` to move away from the user of the skill
 *    - Set to `into` to move towards the skill center
 *  * DIST: Set to the distance the target should move, in pixels
 * 
 * - #### target jump [TOWARDS or AWAY or INTO] [DIST]
 *  * The target will jump X distance.
 *  * TOWARDS or AWAY or INTO:
 *    - Set to `towards` to jump towards the user of the skill
 *    - Set to `away` to jump away from the user of the skill
 *    - Set to `into` to jump towards the skill position
 *  * DIST: Set to the distance the target should jump, in pixels
 * 
 * - #### target pose [POSE]
 *  * **_Requires QSprite plugin_**
 *  * If the target is a QSprite, it will play the pose
 *  * POSE NAME: The pose to play
 * 
 * - #### target cancel
 *  * If the target is `casting`, it will cancel the skill
 * 
 * - #### target qaudio [NAME] [QAUDIO OPTIONS]
 *  * **_Requires QAudio plugin_**
 *  * Binds a QAudio to the target
 *  * NAME: The name of the audio file to use
 *  * QAUDIO OPTIONS: any of the QAudio options besides; xX, yY, bindToCHARAID.
 *    View QAudio help for more details
 * 
 * - #### user forceSkill [SKILL ID] [ANGLE OFFSET IN DEGREES]
 *  * Forces the user to use a skill.
 *  * SKILL ID: The ID of the skill to use
 *  * ANGLE OFFSET: Lets you offset the angle, in degrees, that this skill be used
 *    towards. This is optional and can be left out.
 *    - Default: 0
 * 
 * - #### animationTarget [0 or 1]
 *  * Sets where to play the skill animation
 *  * 0 or 1: 
 *    - When 0, the animation will play at the current location.
 *      Animation will only play once if the skill hit multiple targets
 *    - When 1, the animation will play on the target
 *      Animation will play on all targets it hits
 * 
 * ============================================================================
 * ## Enemies
 * ============================================================================
 * **Event**
 * ----------------------------------------------------------------------------
 * To mark an event as an enemy, add the notetag to the event
 * ~~~
 * <enemy:X>
 * ~~~
 * Where X is the ID of the enemy in the database.
 * 
 * ----------------------------------------------------------------------------
 * **Enemy Database**
 * ----------------------------------------------------------------------------
 * #### To set the enemies respawn time
 * ~~~
 * <respawn:X>
 * ~~~
 * - X: How long until it respawns, in frames.
 *
 * #### To change the team of the enemy
 * ~~~
 * <team:X>
 * ~~~
 * Set X to the team number
 * - 0: Neutral
 * - 1: Player team
 * - 2: Enemy team
 * - 3+ can also be used
 *
 * **_Note_** teams don't do much because there is no team based AI
 * 
 * #### To set an Enemies AI type
 * ~~~
 * <AIType:TYPE>
 * ~~~
 * - TYPE: The AI type, set this to `none` to disable AI.
 *
 * **_Note_** There's only 1 type of AI, so for now that AI is only to disable AI
 *
 * #### To set it's AI range
 * ~~~
 * <range:X>
 * ~~~
 * - X: The range in pixels
 *
 * #### To disable damage popups on this enemy
 * ~~~
 * <noPopup>
 * ~~~
 *
 * #### To add an offset to the popup's y use:
 * ~~~
 * <popupOY:Y>
 * ~~~
 * - Y: The y offset in pixels, can be negative
 *
 * #### To keep the event around after it dies
 * ~~~
 * <dontErase>
 * ~~~
 *
 * #### To run some JS when the enemy dies
 * ~~~
 * <onDeath>
 * javascript code
 * </onDeath>
 * ~~~
 * 
 * #### To auto gain the enemies loot
 * ~~~
 * <autoLoot>
 * ~~~
 * 
 * ============================================================================
 * ## Disabling QABS
 * ============================================================================
 * You can disable the QABS or disable certain events with a plugin command.
 *
 * #### To disable the QABS for everything use the plugin command
 * ~~~
 * qabs disable
 * ~~~
 * 
 * #### To re-enable use the plugin command:
 * ~~~
 * qabs enable
 * ~~~
 *
 * #### To disable certain event(s) use the plugin command
 * ~~~
 * qabs disable [LIST OF CHARAIDS TO DISABLE]
 * ~~~
 * - CHARAID: The character identifier.
 *  * For events: EVENTID, eEVENTID, eventEVENTID or this for the event that
 *    called this (replace EVENTID with a number)
 *
 * Where each CHARAID is separated with a space. CHARAID can only be for events.
 *
 * #### Example:
 * ~~~
 * qabs disable event1 e2 4
 * ~~~
 * Will disable events 1, 2 and 4. Used different types of CHARAIDs as an example
 * but you can use whichever one you like
 *
 * #### To re-enable event(s) use the plugin command
 * ~~~
 * qabs enable [LIST OF CHARAIDS TO DISABLE]
 * ~~~
 *
 * **_Note_** that disabling ABS doesn't remove it from the event, it just "pauses"
 * it until it's re-enabled.
 * 
 * ============================================================================
 * ## States
 * ============================================================================
 * To have a state affect the characters move speed use:
 * ~~~
 * <moveSpeed:X>
 * ~~~
 * Set X to the value to modify the move speed by. Can be negative.
 *
 * To disable a characters actions, use the following notetag. When disabled
 * the character can't use any skills until the state is removed.
 * ~~~
 * <stun>
 * 
 * ~~~
 * ============================================================================
 * ## Popups
 * ============================================================================
 * All of the popups are powered with the QPopup plugin. If you want to change
 * any styles of the popups you can edit their presets in that plugins parameters
 * or using the plugin commands from the QPopup plugin.
 *
 * The following are the qPopup presets this ABS uses:
 * - QABS-LEVEL
 * - QABS-EXP
 * - QABS-ITEM
 * - QABS-MISSED
 * - QABS-DMG
 * - QABS-DMG-CRIT
 * - QABS-HEAL
 * - QABS-HEAL-CRIT
 * - QABS-MP
 * - QABS-MP-CRIT
 * 
 * ============================================================================
 * ## Showcase
 * ============================================================================
 * This section is for user created stuff. If you created a video, game, tutorial,
 * or an addon for QABS feel free to send me a link and I'll showcase it here!
 * 
 * ============================================================================
 * ## Links
 * ============================================================================
 * Formated Help:
 *
 *  https://quxios.github.io/plugins/QABS
 *
 * RPGMakerWebs:
 *
 *  http://forums.rpgmakerweb.com/index.php?threads/qplugins.73023/
 *
 * Terms of use:
 *
 *  https://github.com/quxios/QMV-Master-Demo/blob/master/readme.md
 *
 * Like my plugins? Support me on Patreon!
 *
 *  https://www.patreon.com/quxios
 *
 * @tags QM-Addon, ABS, Battle
 */
/*~struct~SkillKey:
* @param Keyboard Input
* @desc Set to which keyboard input to use for this skill
* @default
*
* @param Gamepad Input
* @desc Set to which gamepad input to use for this skill
* @default
*
* @param Rebind
* @desc Can this skill be reassigned?
* @type Boolean
* @on Yes
* @off No
* @default true
*
* @param Skill Id
* @desc Which skill does this skill use
* @type skill
* @default
*/
//=============================================================================
//=============================================================================
// QABS Static Class

function QABS() {
	throw new Error('This is a static class');
}

(function () {
	var _PARAMS = QPlus.getParams('<QABS>', {
		'Default Skills': []
	});

	QABS.quickTarget = _PARAMS['Quick Target'];
	QABS.lockTargeting = _PARAMS['Lock when Targeting'];
	QABS.towardsMouse = _PARAMS['Aim with Mouse'];
	QABS.towardsAnalog = _PARAMS['Aim with Analog']
	QABS.radianAtks = QMovement.offGrid;

	QABS.lootDecay = _PARAMS['Loot Decay'];
	QABS.aoeLoot = _PARAMS['AoE Loot'];
	QABS.lootTrigger = _PARAMS['Loot Touch Trigger'] ? 2 : 0;
	QABS.goldIcon = _PARAMS['Gold Icon'];
	QABS.levelAnimation = _PARAMS['Level Animation'];
	QABS.showDmg = _PARAMS['Show Damage'];

	QABS.mrst = _PARAMS['Move Resistance Rate Stat'];

	QABS.aiLength = _PARAMS['AI Default Sight Range'];
	QABS.aiWait = _PARAMS['AI Action Wait'];
	QABS.aiSight = _PARAMS['AI Uses QSight'];
	QABS.aiPathfind = _PARAMS['AI uses QPathfind'];

	QABS.getDefaultSkillKeys = function () {
		var obj = {};
		var skills = _PARAMS['Default Skills'];
		for (var i = 0; i < skills.length; i++) {
			var skill = skills[i];
			obj[i + 1] = {
				input: [skill['Keyboard Input'].trim(), skill['Gamepad Input'].trim()],
				rebind: skill.Rebind,
				skillId: skill['Skill Id']
			}
		}
		return obj;
	};

	QABS.skillKey = QABS.getDefaultSkillKeys();

	QABS.stringToSkillKeyObj = function (string) {
		var obj = QPlus.stringToObj(string);
		for (var key in obj) {
			var data = String(obj[key]).split(' ').filter(function (i) {
				return i !== '';
			}).map(function (i) {
				return i.trim();
			});
			var skillId = Number(data[0]) || 0;
			var rebind = data[1] === 'true';
			var msg;
			if (skillId && !$dataSkills[skillId]) {
				msg = 'ERROR: Attempted to apply a Skill Id that does not exist in database.\n';
				msg += 'Skill Key Number: ' + key;
				alert(msg);
				delete obj[key];
				continue;
			}
			if (!QABS.skillKey[key]) {
				msg = 'ERROR: Attempted to apply a skill key that has not been setup ';
				msg += 'in the plugin parameters.\n';
				msg += 'Skill Key Number: ' + key;
				alert(msg);
				delete obj[key];
				continue;
			}
			obj[key] = {
				input: QABS.skillKey[key].input.clone(),
				skillId: skillId,
				rebind: rebind
			}
		}
		return obj;
	};

	QABS._skillSettings = {};
	QABS.getSkillSettings = function (skill) {
		if (!this._skillSettings.hasOwnProperty(skill.id)) {
			var settings = skill.qmeta.absSettings;
			this._skillSettings[skill.id] = {
				cooldown: 0,
				through: 0,
				groundTarget: false,
				selectTarget: false,
				throughTerrain: [],
				casting: false,
				compensate: false,
				endparticle: false,
				inevatable: false,
				cast: 0
			}
			if (settings) {
				// TODO change this, hate how it looks
				settings = QPlus.stringToObj(settings);
				Object.assign(settings, {
					cooldown: Number(settings.cooldown) || 0,
					through: Number(settings.through) || 0,
					groundTarget: settings.groundtarget && !settings.selecttarget,
					selectTarget: !settings.groundtarget && settings.selecttarget,
					throughTerrain: settings.throughTerrain || '',
					casting: settings.casting || false,
					spread: String(settings.spread) || null,
					compensate: settings.compensate,
					endparticle: settings.endparticle ? String(settings.endparticle).split(' ') : false,
					inevatable: settings.inevatable || false
				});
				if (settings.throughTerrain.constructor !== Array) {
					settings.throughTerrain = [settings.throughTerrain];
				}
				if (settings.groundtarget) var range = Number(settings.groundtarget);
				if (settings.selecttarget) var range = Number(settings.selecttarget);
				settings.range = range || 0;
				this._skillSettings[skill.id] = settings;
			}
		}
		return this._skillSettings[skill.id];
	};

	QABS._skillSequence = {};
	QABS.getSkillSequence = function (skill) {
		if (!this._skillSequence.hasOwnProperty(skill.id)) {
			var settings = skill.qmeta.absSequence;
			this._skillSequence[skill.id] = [];
			if (settings) {
				settings = settings.split('\n');
				var actions = [];
				for (var i = 0; i < settings.length; i++) {
					if (settings[i].trim() !== '') {
						actions.push(settings[i].trim());
					}
				}
				actions.push('collider hide');
				actions.push('user unlock');
				actions.push('user casting false');
				this._skillSequence[skill.id] = actions;
			}
		}
		return this._skillSequence[skill.id].clone();
	};

	QABS._skillOnDamage = {};
	QABS.getSkillOnDamage = function (skill) {
		if (!this._skillOnDamage.hasOwnProperty(skill.id)) {
			var settings = skill.qmeta.absOnDamage;
			var actions = [];
			actions.push('animation 0');
			if (settings) {
				settings = settings.split('\n');
				for (var i = 0; i < settings.length; i++) {
					if (settings[i].trim() !== '') {
						actions.push(settings[i].trim());
					}
				}
			}
			this._skillOnDamage[skill.id] = actions;
		}
		return this._skillOnDamage[skill.id].clone();
	};

	QABS._weaponSkills = {};
	QABS._armorSkills = {};
	QABS.weaponSkills = function (id) {
		if (!this._weaponSkills[id]) {
			var skills = $dataWeapons[id].qmeta.skillKeys || $dataWeapons[id].qmeta.absSkills;
			this._weaponSkills[id] = {};
			if (skills) {
				this._weaponSkills[id] = this.stringToSkillKeyObj(skills);
			}
		}
		return this._weaponSkills[id];
	};

	QABS.armorSkills = function (id) {
		if (!this._armorSkills[id]) {
			var skills = $dataArmors[id].qmeta.skillKeys || $dataArmors[id].qmeta.absSkills;
			this._armorSkills[id] = {};
			if (skills) {
				this._armorSkills[id] = this.stringToSkillKeyObj(skills);
			}
		}
		return this._armorSkills[id];
	};

	QABS._aiRange = {};
	QABS.getAIRange = function (skill) {
		if (!this._aiRange.hasOwnProperty(skill.id)) {
			this._aiRange[skill.id] = this.calcAIRange(skill);
		}
		return this._aiRange[skill.id];
	};

	QABS.calcAIRange = function (skill) {
		var settings = this.getSkillSettings(skill);
		if (settings.range) {
			return settings.range;
		}
		var actions = this.getSkillSequence(skill);
		var currDist = 0;
		var stored = 0;
		var maxDist = 0;
		actions.forEach(function (action) {
			var move = /^(?:move|wave) (.*)/i.exec(action);
			if (move) {
				move = move[1].trim().split(' ');
				if (move[0] === 'forward') {
					currDist += Number(move[1]) || 0;
				} else {
					currDist -= Number(move[1]) || 0;
				}
				maxDist = Math.max(currDist, maxDist);
			}
			var store = /^store/i.exec(action);
			if (store) {
				stored = currDist;
			}
			var toStore = /^(?:move|wave)ToStored/i.exec(action);
			if (toStore) {
				currDist = stored;
				maxDist = Math.max(currDist, maxDist);
			}
			var userForce = /^user forceSkill (.*)/i.exec(action);
			if (userForce) {
				userForce = Number(userForce[1].trim().split(' ')[0]);
				var dist2 = QABS.getAIRange($dataSkills[userForce]);
				maxDist = Math.max(dist2, maxDist);
			}
			var skillForce = /^forceSkill (.*)/i.exec(action);
			if (skillForce) {
				skillForce = Number(skillForce[1].trim().split(' ')[0]);
				var dist3 = QABS.getAIRange($dataSkills[skillForce]);
				dist3 += currDist;
				maxDist = Math.max(dist3, maxDist);
			}
		});
		return maxDist;
	};

})();

//-----------------------------------------------------------------------------
// QABS Manager Static Class

function QABSManager() {
	throw new Error('This is a static class');
}

(function () {
	QABSManager.clear = function () {
		this._animations = [];
		this._pictures = [];
		this._particles = [];
		this._mapId = $gameMap._mapId;
	};

	QABSManager.getTargets = function (item, self) {
		return ColliderManager.getCharactersNear(item.collider, function (chara) {
			if (typeof chara.battler !== 'function' || !chara.battler()) return false;
			if (chara.battler().isDeathStateAffected()) return false;
			if (chara.isFriendly(self) && [1, 2, 3, 4, 5, 6].contains(item.data.scope)) {
				return false;
			}
			if (!chara.isFriendly(self) && [7, 8, 9, 10].contains(item.data.scope)) {
				return false;
			}
			if (item.data.scope === 11 && chara !== self) return false;
			if (chara._jumpCount > 5) return false;
			var type = item.settings.collides || 'hitbox';
			return item.collider.intersects(chara.collider(type));
		});
	};

	QABSManager.bestAction = function (userId) {
		var chara = QPlus.getCharacter(userId);
		if (!chara.battler()) return null;
		var targets;
		var skills = chara.usableSkills().filter(function (skillId) {
			if (!skillId) return false;
			targets = QABSManager.skillWillHit(skillId, userId);
			if (targets && targets.length > 0) {
				return true;
			}
			return false;
		})
		if (skills.length === 0) return null;
		return skills[Math.floor(Math.random() * skills.length)];
	};

	QABSManager.skillWillHit = function (skillId, userId) {
		var skill = $dataSkills[skillId];
		var chara = QPlus.getCharacter(userId);
		var settings = QABS.getSkillSettings(skill);
		var collider = chara.collider('collision');
		var skillCollider = chara.makeSkillCollider(settings);
		var w1 = settings.collider[1] || chara.collider('collision').width;
		var h1 = settings.collider[2] || chara.collider('collision').height;
		var x1 = chara.cx() - w1 / 2;
		var y1 = chara.cy() - h1 / 2;
		var targets = [];
		var aiRange = QABS.getAIRange(skill);
		if (aiRange > 0) {
			var r1 = aiRange * 2;
			range = new Circle_Collider(w1 + r1, h1 + r1);
			range.moveTo(x1 - r1 / 2, y1 - r1 / 2);
			targets = this.getTargets({
				settings: settings,
				data: skill,
				collider: range
			}, chara);
			ColliderManager.draw(range, QABS.aiWait / 2);
		} else {
			targets = this.getTargets({
				settings: settings,
				data: skill,
				collider: skillCollider
			}, chara);
			ColliderManager.draw(skillCollider, QABS.aiWait / 2);
		}
		return targets;
	};

	//변경 : 타겟이 없을경우 애니메이션 출력하지 않음
	QABSManager.startAction = function (self, targets, item) {
		//if (!item.animationTarget) { || targets.length === 0) {
		if (targets.length != 0) {
			this.startAnimation(item.data.animationId, item.collider.center.x, item.collider.center.y);
		}
		self._agro.placeInCombat();
		var action = new Game_ABSAction(self.battler(), true);
		action.setSkill(item.data.id);
		if (item.settings._cast > 0) action._cast = item.settings._cast;
		for (var i = 0; i < targets.length; i++) {
			if (item.animationTarget === 1) {
				var x = targets[i].cx();
				var y = targets[i].cy();
				this.startAnimation(item.data.animationId, x, y);
			}
			if (!targets[i].battler().isStateAffected(11) && !targets[i]._invincible && (!targets[i]._avoid || item.settings.inevatable)) {
				action.absApply(targets[i].battler());
			}
			targets[i].addAgro(self.charaId(), item.data);
		}
		if (self == $gamePlayer) {
			if ($gamePlayer._onceMultipleShotUsed) {
				$gamePlayer._onceMultipleShot = 0;
				$gamePlayer._onceMultipleShotUsed = false;
			}
		}
		action.applyGlobal();
	};

	QABSManager.startPopup = function (type, options) {
		if (!Imported.QPopup) return;
		var preset = $gameSystem.qPopupPreset(type);
		Object.assign(options, {
			style: preset.style,
			transitions: preset.transitions
		})
		if (!options.duration) options.duration = 100;
		if (!options.transitions || options.transitions.length == 0) {
			var start = options.duration - 10;
			var end = start + 10;
			var fadeout = start + ' 10 fadeout';
			var slideup = '0 ' + end + ' slideup 24';
			if (type.substring(0, 8) == 'QABS-DMG') {
				var x = Math.floor((Math.random() + 0.1) * 25);
				if (Math.random() >= 0.5) x *= -1;
				var slidedamage = '0 ' + end + ' slidedamage ' + x + ' 300'
				options.transitions = [fadeout, slidedamage];
			} else options.transitions = [fadeout, slideup];
		}
		if (options.color) options.style.color = options.color
		return QPopup.start(options);
	};

	QABSManager._animations = [];
	QABSManager.startAnimation = function (id, x, y) {
		var scene = SceneManager._scene;
		if (scene.constructor !== Scene_Map) return;
		if (id < 0) id = 1;
		if (id <= 0) return;
		var animation = $dataAnimations[id];
		var temp = new Sprite_MapAnimation(animation);
		temp.move(x, y);
		this._animations.push(temp);
		scene._spriteset._tilemap.addChild(temp);
	};

	QABSManager.removeAnimation = function (sprite) {
		var scene = SceneManager._scene;
		if (scene.constructor !== Scene_Map) return;
		var i = this._animations.indexOf(sprite);
		if (i < 0) return;
		this._animations[i] = null;
		this._animations.splice(i, 1);
		scene._spriteset._tilemap.removeChild(sprite);
	};

	QABSManager._pictures = [];
	QABSManager.addPicture = function (sprite) {
		var scene = SceneManager._scene;
		// if (!scene.isReady()) return;
		if (scene.constructor !== Scene_Map) return;
		this._pictures.push(sprite);
		scene._spriteset._tilemap.addChild(sprite);
	};

	QABSManager.removePicture = function (sprite) {
		var scene = SceneManager._scene;
		if (scene.constructor !== Scene_Map) return;
		var i = this._pictures.indexOf(sprite);
		if (i < 0) return;
		this._pictures[i] = null;
		this._pictures.splice(i, 1);
		scene._spriteset._tilemap.removeChild(sprite);
	};

	QABSManager._particles = [];
	QABSManager.addParticle = function (particle) {
		this._particles.push(particle);
	};

	QABSManager.removeParticle = function (particle) {
		var i = SceneManager.particleGens.indexOf(particle.gen);
		JavaHut.particleOff(particle);
	};

	QABSManager.createItem = function (x, y, itemId, type) {
		var loot = new Game_Loot(x, y);
		var data = $dataItems;
		if (type === 1) data = $dataWeapons;
		if (type === 2) data = $dataArmors;
		loot.setItem(data[itemId]);
		return loot;
	};

	QABSManager.createGold = function (x, y, value) {
		var loot = new Game_Loot(x, y);
		loot.setGold(value);
		return loot;
	};

	QABSManager._freeEventIds = [];
	QABSManager.addEvent = function (event) {
		var id = this._freeEventIds.unshift() || 0;
		if (!id || $gameMap._events[id]) {
			id = $gameMap._events.length;
		}
		event._eventId = id;
		$gameMap._events[id] = event;
		if (!event._noSprite) {
			var scene = SceneManager._scene;
			if (scene === Scene_Map) {
				var spriteset = scene._spriteset;
				var sprite = new Sprite_Character(event);
				spriteset._characterSprites.push(sprite);
				spriteset._tilemap.addChild(sprite);
			}
		}
	};

	QABSManager.removeEvent = function (event) {
		var id = event._eventId;
		if (!id || !$gameMap._events[id]) return;
		event.removeColliders();
		if (!event._noSprite) {
			var scene = SceneManager._scene;
			if (scene === Scene_Map) {
				var spriteset = scene._spriteset;
				var spriteCharas = spriteset._characterSprites;
				for (var i = 0; i < spriteCharas.length; i++) {
					if (spriteCharas[i] && spriteCharas[i]._character === event) {
						spriteset._tilemap.removeChild(spriteCharas[i]);
						spriteCharas.splice(i, 1);
						break;
					}
				}
			}
		}
		$gameMap._events[id].clearABS();
		$gameMap._events[id] = null;
		this._freeEventIds.push(id);
	};

	QABSManager.preloadSkill = function (skill) {
		var aniId = skill.animationId;
		aniId = aniId < 0 ? 1 : aniId;
		var ani = $dataAnimations[aniId];
		if (ani) {
			ImageManager.loadAnimation(ani.animation1Name, ani.animation1Hue);
			ImageManager.loadAnimation(ani.animation2Name, ani.animation2Hue);
		}
		var sequence = QABS.getSkillSequence(skill);
		for (var i = 0; i < sequence.length; i++) {
			var action = sequence[i];
			var ani = /^animation (.*)/i.exec(action);
			var pic = /^picture (.*)/i.exec(action);
			var blendpic = /^blendpicture (.*)/i.exec(action);
			var forced = /forceSkill (\d+)/i.exec(action);
			if (ani) {
				ani = ani[1].trim();
				ani = $dataAnimations[ani];
				if (ani) {
					ImageManager.loadAnimation(ani.animation1Name, ani.animation1Hue);
					ImageManager.loadAnimation(ani.animation2Name, ani.animation2Hue);
				}
			}
			if (pic) {
				pic = QPlus.makeArgs(pic[1])[0];
				ImageManager.loadPicture(pic);
			}
			if (blendpic) {
				blendpic = QPlus.makeArgs(blendpic[1])[0];
				ImageManager.loadPicture(blendpic);
			}
			if (forced) {
				var forcedSkill = $dataSkills[Number(forced[1])];
				if (forcedSkill) this.preloadSkill(forcedSkill);
			}
		}
	};
})();

//-----------------------------------------------------------------------------
// Skill_Sequencer

function Skill_Sequencer() {
	this.initialize.apply(this, arguments);
}

(function () {

	Skill_Sequencer.prototype.initialize = function (character, skill) {
		this._character = character;
		this._skill = skill;
	};

	//변경 : 함수들 추가
	Skill_Sequencer.prototype.startAction = function (action) {
		var cmd = action.shift().toLowerCase();
		if (this._skill.origin != $gameMap._mapId) {
			//if (cmd == 'user') this.startUserAction(action);
			return;
		}
		switch (cmd) {
			case 'user': {
				this.startUserAction(action);
				break;
			}
			case 'store': {
				this.actionStore();
				break;
			}
			case 'eval' : {
				this.actionEvalAction(action);
				break;
			}
			case 'move': {
				this.actionMove(action);
				break;
			}
			case 'locate': {
				this.actionLocate(action)
				break;
			}
			case 'movetostored': {
				this.actionMoveToStored(action);
				break;
			}
			case 'wave': {
				this.actionWave(action);
				break;
			}
			case 'wavetostored': {
				this.actionWaveToStored(action);
				break;
			}
			case 'damage':
			case 'trigger': {
				this.actionTrigger(action);
				break;
			}
			case 'triggerorigin': {
				this.actionTriggerOrigin(action);
				break;
			}
			case 'adjustaim': {
				this.actionAdjustAim(action);
				break;
			}
			case 'wait': {
				this.actionWait(action);
				break;
			}
			case 'picture': {
				this.actionPicture(action);
				break;
			}
			case 'pictureline': {
				this.actionPictureLine(action);
				break;
			}
			case 'blendpicture': {
				this.actionBlendPicture(action);
				break;
			}
			case 'trail': {
				this.actionTrail(action);
				break;
			}
			case 'collider': {
				this.actionCollider(action);
				break;
			}
			case 'animation': {
				this.actionAnimation(action);
				break;
			}
			case 'se': {
				this.actionSE(action);
				break;
			}
			case 'collecttargetse': {
				this.actionCollectTargetSE(action);
				break;
			}
			case 'qaudio': {
				this.actionQAudio(action);
				break;
			}
			case 'globallock': {
				var char = action[0] == 0 ? [this._character] : [];
				$gameMap.globalLock(char, 0, 1);
				break;
			}
			case 'globalunlock': {
				$gameMap.globalUnlock(null, 0, 0);
				break;
			}
			case 'timestop': {
				$gameTemp._timeStop = [action[0], 0, 3, false];
				break;
			}
			case 'teleport': {
				this.skillTeleport(action)
				break;
			}
			case "teleportto": {
				this.startTeleport(action);
				break;
			}
			case "shake": {
				this.startShake(action);
				break;
			}
			case "accel": {
				this.startAccel(action);
				break;
			}
			case "rotate": {
				this.startRotate(action);
				break;
			}
			case "guid": {
				this.startGuid(action);
				break;
			}
			case "homing": {
				this.startHoming(action);
				break;
			}
			case "stop": {
				this.startStop();
				break;
			}
			case "towardplayer": {
				this.towardPlayer(action);
				break;
			}
			case "particleon": {
				this.particleOn(action);
				break;
			}
			case "particleoff": {
				this.particleOff(action);
				break;
			}
			case "particleupdate": {
				this.particleUpdate(action);
				break;
			}
			case 'rumble': {
				this.startRumble(action);
				break;
			}
			case 'motionblur': {
				this.startMotionBlur(action);
				break;
			}
			case 'through': {
				this.startThrough(action);
				break;
			}
			case 'collecttarget': {
				this.startCollectTarget(action);
				break;
			}
			
		}
	};

	Skill_Sequencer.prototype.startUserAction = function (action) {
		var cmd = action.shift().toLowerCase();
		switch (cmd) {
			case 'casting': {
				this.userCasting(action);
				break;
			}
			case 'lock': {
				this.userLock();
				break;
			}
			case 'unlock': {
				this.userUnlock();
				break;
			}
			case 'speed': {
				this.userSpeed(action);
				break;
			}
			case 'speedlock': {
				this.userSpeedlock(action);
				break;
			}
			case 'move': {
				this.userMove(action);
				break;
			}
			case 'movehere': {
				this.userMoveHere(action);
				break;
			}
			case 'movecancel': {
				this.userMoveCancel();
				break;
			}
			case "dash": {
				this.userDash(action)
				break;
			}
			case "changecollider": {
				this.userChangeCollider(action)
				break;
			}
			case "transit": {
				this.userTransit(action)
				break;
			}
			case "movelock": {
				this.userMoveLock(action)
				break;
			}
			case 'jump': {
				this.userJump(action);
				break;
			}
			case 'jumphere': {
				this.userJumpHere(action);
				break;
			}
			case 'teleport': {
				this.userTeleport();
				break;
			}
			case 'setdirection': {
				this.userSetDirection(action);
				break;
			}
			case 'directionfix': {
				this.userDirectionFix(action);
				break;
			}
			case 'pose': {
				this.userPose(action);
				break;
			}
			case 'posemove': {
				this.userPoseMove(action);
				break;
			}
			case 'forceskill': {
				this.userForceSkill(action);
				break;
			}
			case 'forceattack': {
				this.userForceAttack(action);
				break;
			}
			case 'animation': {
				this.userAnimation(action);
				break;
			}
			case 'qaudio': {
				this.userQAudio(action);
				break;
			}
			case 'invincible': {
				this.userInvincible(action);
				break;
			}
			case 'noknock': {
				this.userNoKnock(action);
				break;
			}
			case 'avoid': {
				this.userAvoid(action);
				break;
			}
			case 'rotate': {
				this.userRotate(action)
				break;
			}
			case 'addstate': {
				this.userAddState(action);
				break;
			}
			case 'removestate': {
				this.userRemoveState(action);
				break;
			}
			case 'residual': {
				this.userResidual(action);
				break;
			}
			case 'copyevent': {
				this.userCopyEvent(action);
				break;
			}
			case 'doubledashattack': {
				this.userDoubleDashAttack(action);
				break;
			}
			case 'collecttargetskill': {
				if (this._skill.collectTarget.length > 0) this.userForceSkill(action);
				break;
			}
		}
	};

	Skill_Sequencer.prototype.startOnDamageAction = function (action, targets) {
		var cmd = action.shift().toLowerCase();
		switch (cmd) {
			case 'se': {
				this.actionSE(action);
				break;
			}
			case 'target': {
				this.startOnDamageTargetAction(action, targets);
				break;
			}
			case 'user': {
				this.startOnDamageUserAction(action, targets);
				break;
			}
			case 'animationtarget': {
				this._skill.animationTarget = Number(action[0]) || 0
				break;
			}
			case 'shake': {
				this.startShake(action, targets);
				break;
			}
			case 'motionblur': {
				this.startTargetMotionBlur(action, targets);
				break;
			}
			case "particleon": {
				this.startOnDamageParticleOn(action);
				break;
			}
		}
	};

	Skill_Sequencer.prototype.startOnDamageTargetAction = function (action, targets) {
		var cmd = action.shift().toLowerCase();
		switch (cmd) {
			case 'move': {
				this.targetMove(action, targets);
				break;
			}
			case 'jump': {
				this.targetJump(action, targets);
				break;
			}
			case 'jumpz': {
				this.targetJumpZ(action, targets);
				break;
			}
			case 'pose': {
				this.targetPose(action, targets);
				break;
			}
			case 'cancel': {
				//this.targetCancel(action, targets);
				break;
			}
			case 'qaudio': {
				this.targetQAudio(action, targets);
				break;
			}
			case 'shake': {
				this.targetShake(action, targets);
				break;
			}
			case 'shiver': {
				this.targetShiver(action, targets);
				break;
			}
			case 'freeze': {
				this.targetFreeze(action, targets);
				break;
			}

		}
	};

	Skill_Sequencer.prototype.startOnDamageUserAction = function (action, targets) {
		var cmd = action.shift().toLowerCase();
		switch (cmd) {
			case 'forceskill': {
				this.userForceSkill(action);
				break;
			}
		}
	};

	Skill_Sequencer.prototype.startShake = function (action) {
		var power = Number(action[0]);
		var speed = Number(action[1]);
		var duration = Number(action[2]);
		$gameScreen.startShake(power, speed, duration);
	};

	Skill_Sequencer.prototype.startTargetMotionBlur = function (action, targets) {
		var zoomPower = Number(action[0]);
		var motionPower = Number(action[1]) > 0 ? Number(action[1]) : 0
		if (targets.length > 0) {
			$gameTemp._motionBlur = [motionPower, 3, 0, 0, 0];
			$gameMap.createFilter('test3', 'zoomblur', 0, -1);
			$gameMap.moveFilterQueue('test3', [0, 0, 0, 0], zoomPower);
		}
	};

	Skill_Sequencer.prototype.startMotionBlur = function (action) {
		var zoomPower = Number(action[0]);
		var motionPower = Number(action[1]) > 0 ? Number(action[1]) : 0
		$gameTemp._motionBlur = [motionPower, 3, 0, 0, 0];
		$gameMap.createFilter('test2', 'zoomblur', 0, -1);
		$gameMap.moveFilterQueue('test2', [0, 0, 0, 0], zoomPower);
	};

	Skill_Sequencer.prototype.startThrough = function (action) {
		var value = Number(action[0]);
		if (value != NaN) this._skill.settings.through = value;
	};

	Skill_Sequencer.prototype.startCollectTarget = function (action) {
		this._skill.collectTarget = [];
	}

	Skill_Sequencer.prototype.startRumble = function (action) {
		var strong = Number(action[0]);
		var weak = Number(action[1]);
		var duration = Number(action[2]);
		Rumble(strong, weak, duration);
	};

	Skill_Sequencer.prototype.startAccel = function (action) {
		this._skill.accel = Number(action[0]) / Number(action[1]);
		this._skill.accelD = Number(action[1]);
	};

	Skill_Sequencer.prototype.userCasting = function (action) {
		if (!this._skill.forced) {
			this._character._casting = action[0] === 'true' ? this._skill : false;
		}
	};

	Skill_Sequencer.prototype.startRotate = function (action) {
		this._skill.rotate = (2 * Math.PI * Number(action[0])) / (360 * Number(action[1]));
		this._skill.rotateD = Number(action[1]);
	};

	Skill_Sequencer.prototype.startGuid = function (action) {
		this._skill.guidSpeed = Number(action[0]) * Math.PI / 180 / Number(action[2]);
		this._skill.guidA = Number(action[1]) * Math.PI / 180 / Number(action[2]);
		this._skill.guidD = Number(action[2]);
	};

	Skill_Sequencer.prototype.startHoming = function (action) {
		//게임패드 사용중일 때 마우스위치가 아닌, 탄막의 위치를 저장
		var isGamepad = Imported.QInput && Input.preferGamepad();
		this._skill.homingSpeed = Number(action[0]) * Math.PI / 180 / Number(action[2]);
		this._skill.homingA = Number(action[1]) * Math.PI / 180 / Number(action[2]);
		this._skill.homingD = Number(action[2]);
		if (isGamepad) {
			this._skill.homingX = $gameMap.canvasToMapPX(TouchInput.x);
			this._skill.homingY = $gameMap.canvasToMapPY(TouchInput.y);
		} else {
			this._skill.homingX = $gameMap.canvasToMapPX(TouchInput.x);
			this._skill.homingY = $gameMap.canvasToMapPY(TouchInput.y);
		}
	};

	Skill_Sequencer.prototype.startStop = function () {
		//this.stop = true;
		this._skill.moving = false;
	};

	Skill_Sequencer.prototype.towardPlayer = function (action) {
		var x1 = $gamePlayer.cx();
		var y1 = $gamePlayer.cy();
		var x2 = this._character.cx();
		var y2 = this._character.cy();
		this._skill.radian = Math.atan2((y1 - y2), x1 - x2);
		if (action[0]) {
			if (action[0].match('~')) {
				var angleInterval = action[0].split('~');
				angleOffset = Math.randomIntBetween(angleInterval[0], angleInterval[1]);
				this._skill.radian += angleOffset * Math.PI / 180;
			}
		}
		this._skill.radian += this._skill.radian < 0 ? 2 * Math.PI : 0;
		this._character._radian = this._skill.radian;
	}

	Skill_Sequencer.prototype.particleOn = function (action) {
		this._skill.particle = [SceneManager.particleGens.length, action[0], action[1], action[2]];
		QABSManager.addParticle(this);
		JavaHut.particleSet(this._skill)
		JavaHut.particleOn(this._skill)
		//JavaHut.particleUpdate([this._skill.particle[0], this._skill.particle[2], 'rotation', 30])

	};

	Skill_Sequencer.prototype.startOnDamageParticleOn = function (action) {
		this._skill.particle = [SceneManager.particleGens.length, action[0], action[1], action[2]];
		QABSManager.addParticle(this);
		JavaHut.particleSet(this._skill)
		JavaHut.particleOn(this._skill)
		//JavaHut.particleUpdate([this._skill.particle[0], this._skill.particle[2], 'rotation', 30])

	};

	Skill_Sequencer.prototype.particleUpdate = function (action) {
		if (action[0] == 'rotate') {
			var amt = action[1] ? Number(action[1]) : (this._skill.radian - (Math.PI / 2)) * 180 / Math.PI;
			JavaHut.particleUpdate([this._skill.particle[0], this._skill.particle[2], 'rotation', amt])
		}
		if (action[0] == 'alpha') {
			var amt1 = action[1] ? Number(action[1]) : 1;
			var amt2 = action[2] ? Number(action[2]) : 1;
			JavaHut.particleUpdate([this._skill.particle[0], this._skill.particle[2], 'rotation', amt1, amt2])
		}
		if (action[0] == 'blend') {
			var amt = action[1] ? Number(action[1]) : 1;
			JavaHut.particleUpdate([this._skill.particle[0], this._skill.particle[2], 'blend', amt])
		}
	};

	Skill_Sequencer.prototype.particleOff = function (action) {
		JavaHut.particleOff(this._skill)
		//QABSManager.removeParticle(this._skill);
	};

	Skill_Sequencer.prototype.userInvincible = function (action) {
		if (action[0] === "on" && !this._character._invincibleSkills.contains(this._skill.id)) this._character._invincibleSkills.push(this._skill.id);
		else if (this._character._invincibleSkills.contains(this._skill.id)) {
			var index = this._character._invincibleSkills.indexOf(this._skill.id);
			this._character._invincibleSkills.splice(index, 1);
		}
		if (this._character._invincibleSkills.length > 0) this._character._invincible = true;
		else this._character._invincible = false;
	};

	Skill_Sequencer.prototype.userNoKnock = function (action) {
		this._character._noKnock = action[0] === "on" ? true : false;
	};

	Skill_Sequencer.prototype.userAvoid = function (action) {
		if (this._character._avoid = action[0] === "on") {
			this._character.residual().setColorTone([0, 0, 150, 100]);
			this._character.residual().setPeriod(2);
			this._character.residual().setDuration(15);
			this._character.residual().setValid(true);
			if(this._character.battler().trc < 100) this._character.battler().gainTp(-10);
			var isGamepad = Imported.QInput && Input.preferGamepad();
			var inputDir = isGamepad ? false : Input._dir8;
			if (inputDir) {
				if (this._character._diagonal) {
					this._character._diagonal = inputDir;
				} else this._character._direction = inputDir;
			};
			this._character.playPose('eva');
			return true;
		} else {
			$gamePlayer.residual().setValid(false)
			return false
		}
		//this._character._avoid = action[0] === "on" ? true : false;
	};

	Skill_Sequencer.prototype.userRotate = function (action) {
		this._character._radian += action[0] * Math.PI / 180;
		if (this._character._radian < 0) this._character._radian += 2 * Math.PI;
		if (this._character._radian > 2 * Math.PI) this._character._radian %= 2 * Math.PI;
		this._skill.radian += action[0] * Math.PI / 180;
		if (this._skill.radian < 0) this._skill.radian += 2 * Math.PI;
		if (this._skill.radian > 2 * Math.PI) this._skill.radian %= 2 * Math.PI;
	};

	Skill_Sequencer.prototype.skillTeleport = function (action) {
		var dist = Number(action[0]);
		dir = Input.dir8 || this._character._diagonal || this._character._direction;;
		var x1 = dir === 6 ? dist : dir === 4 ? -dist : dir === 1 || dir === 7 ? -dist * 0.7 : dir === 3 || dir === 9 ? dist * 0.7 : 0;
		var y1 = dir === 2 ? dist : dir === 8 ? -dist : dir === 7 || dir === 9 ? -dist * 0.7 : dir === 1 || dir === 3 ? dist * 0.7 : 0;
		var x2 = $gamePlayer._x * 48;
		var y2 = $gamePlayer._y * 48;
		var newPos = this._character.canJump(x1 / 48, y1 / 48);
		//SceneManager._scene.addTempCollider(this._skill.collider, duration);
		//this.setSkillRadian(Number(radian));

		this._character.setPixelPosition(x2 + newPos[0] * 48, y2 + newPos[1] * 48);
		//this._skill.collider.moveto(x2 + newPos[0], y2 + newPos[1]);
		//this._waitForMove = wait;
	};

	Skill_Sequencer.prototype.userDash = function (action) {
        /*//$gamePlayer._dashing = true;
        var dist = Number(action[0]) * (this._character._moveSpeed - 2) || this._character.moveTiles();
        var route = {
            list: [{ code: 45 }, { code: 0 }],
            repeat: false,
            skippable: true,
            wait: true
        };
        var dig = Input._dir8;
        var dir = dig || this._character._diagonal || this._character._direction;
        route.list[0].parameters = ["qmove(" + dir + "," + dist + ")"];
        if (dig) {
            if (this._character._diagonal) {
                this._character._diagonal = dig;
            } else this._character._direction = dig;
        };
        $gamePlayer.playPose('eva');
        this._character.forceMoveRoute(route);
        this._character.updateRoutineMove();
        this._waitForUserMove = action[1] ? action[1] === "true" : false;
        */

        /*
        var dist = Number(action[1]) || this._character.moveTiles();
        var route = {
            list: [],
            repeat: false,
            skippable: true,
            wait: false
        }
        var radian = oldRadian = this._character._radian;
        if (action[0] === 'backward') {
            radian -= Math.PI;
        }
        if (action[0] === 'friction') {
            if (!this._character.isMoving() || this._character._moveSpeed < 3) return;
            dist *= (this._character._moveSpeed - 2);
        }
        route.list.push({
            code: Game_Character.ROUTE_SCRIPT,
            parameters: ['qmove2(' + radian + ',' + dist + ')']
        });
        if (action[0] === 'backward') {
            route.list.unshift({
                code: Game_Character.ROUTE_DIR_FIX_OFF
            });
            route.list.push({
                code: this._character.isDirectionFixed() ?
                    Game_Character.ROUTE_DIR_FIX_ON : Game_Character.ROUTE_DIR_FIX_OFF
            });
        }
        route.list.push({
            code: Game_Character.ROUTE_END
        });
        this._character.forceMoveRoute(route);
        this._character.updateRoutineMove();
        this._waitForUserMove = action[2] ? action[2] === 'true' : false;*/
		if ($gamePlayer.battler()._hp <= 0) return;
		var dist = 102;//Number(action[0])//Number(action[0]) * (this._character._moveSpeed + this._character.battler()._moveSpeed - 2) || this._character.moveTiles();
		this._character._dashing = false;
		this._character._aStackD = 0;
		this._character._aStack = 0;
		this._character._tpTimer = 60 * (1 - this._character.battler().tpt / 100);
		var route = {
			list: [],
			repeat: false,
			skippable: true,
			wait: true
		}


		var radian = this._character._radian;
		if (this._character._isSpaceTriggered != undefined) {
			radian = this._character._isSpaceTriggered;
		} else {
			var isGamepad = Imported.QInput && Input.preferGamepad();
			var inputDir = isGamepad ? false : Input._dir8;

			if (isGamepad) {
				var horz = Input._dirAxesA.x;
				var vert = Input._dirAxesA.y;
				if (horz !== 0 || vert !== 0) {
					radian = (Math.atan2(vert, horz));
				}
			} else if (inputDir) radian = this._character.directionToRadian(Input._dir8);
		}

		route.list.push({
			code: Game_Character.ROUTE_SCRIPT,
			parameters: ['qmove2(' + radian + ',' + dist + ')']
		});
		if (inputDir) {
			if (this._character._diagonal) {
				this._character._diagonal = inputDir;
			} else this._character._direction = inputDir;
		};
		route.list.push({
			code: Game_Character.ROUTE_END
		});
		if (this._character._moveRoute) this._character._moveRoute = null;
		this._character._radMoveHorz = undefined;
		this._character._radMoveVert = undefined;
		this._character.forceMoveRoute(route);
		this._character.updateRoutineMove();
		this._waitForUserMove = action[2] ? action[2] === 'true' : false;
		this._character._isSpaceTriggered = undefined;
	};

	Skill_Sequencer.prototype.userChangeCollider = function (action) {
		var collider = String(action[0]);
		this._character.changeCollider('hitbox', ["preset", collider]);
	};

	Skill_Sequencer.prototype.userTransit = function (action) {
		if (action[0] == 'true') {
			this._character._transit.push(this._skill.id);
		}
		else {
			var i = this._character._transit.indexOf(this._skill.id);
			if (i > -1) this._character._transit.splice(i, 1);
		}
	};

	Skill_Sequencer.prototype.userMoveLock = function (action) {
		var amt = Number(action[0])
		if (amt) {
			this._character._moveLockedTimer = amt;
		}
	};

    /*스텟 구현
    밸런스
    아이템 드랍률

    */
	Skill_Sequencer.prototype.userAddState = function (action) {
		var id = Number(action[0]);
		var x = this._character.battler().addState(id);
	};

	Skill_Sequencer.prototype.userRemoveState = function (action) {
		var id = Number(action[0]);
		var x = this._character.battler().removeState(id);
	};

	Skill_Sequencer.prototype.userResidual = function (action) {
		var character = this._character;
		var period = action[1] ? action[1] : 2;
		var duration = action[2] ? action[2] : 10
		var color = action[6] ? [action[3], action[4], action[5], action[6]] : [20, 20, 20, 150];
		if (action[0] == 'true') {
			character.residual().setColorTone(color);
			character.residual().setPeriod(period);
			character.residual().setDuration(duration);
			character.residual().setValid(true)
		}
		else {
			character.residual().setValid(false)
		}
	};

	Skill_Sequencer.prototype.userCopyEvent = function (action) {
		var character = this._character;
		var id = action[0] ? action[0] : 1;
		var rad = action[1] ? this._skill.radian + (Number(action[1]) * Math.PI / 180) : 0;
		var dist = action[2] ? action[2] : 0;
		if (action[3] == 'skill') {
			var ox = dist * Math.cos(rad);
			var oy = dist * Math.sin(rad);
			$gameMap.copyEventFrom(1, id, (this._skill.collider.center.x + ox)/48, (this._skill.collider.center.y + oy)/48);
		}
		else {
			var ox = dist * Math.cos(rad);
			var oy = dist * Math.sin(rad);
			$gameMap.copyEventFrom(1, id, character.x + ox/48, character.y + oy/48)
		}
	};

	Skill_Sequencer.prototype.userDoubleDashAttack = function (action) {
		var character = this._character;
		if (character.battler().mp > 0 && !character.battler().isAvoid()) {
			character.battler().addState(15);
			character.battler().addState(23);
		} else if (character.battler().mp > 0 && character.battler().isAvoid()) {
			character._aStack = 0;
			character._aStackD = 0;
		}
	};

	Skill_Sequencer.prototype.userLock = function () {
		var i = this._character._skillLocked.indexOf(this._skill);
		if (i >= 0) return;
		this._character._skillLocked.push(this._skill);
	};

	Skill_Sequencer.prototype.userUnlock = function () {
		var i = this._character._skillLocked.indexOf(this._skill);
		if (i >= 0) {
			this._character._skillLocked.splice(i, 1);
		}
	};

	Skill_Sequencer.prototype.userSpeed = function (action) {
		var amt = Number(action[1]) || 1;
		var amt2 = Number(action[2]) || 1;
		var spd = this._character.moveSpeed();
		var otherSkillLock = false;
		if (this._character._skillSpeedLock.indexOf(this._skill.id) != this._character._skillSpeedLock.length - 1) {
			otherSkillLock = true;
		}
		if (action[0] === 'inc') {
			if (otherSkillLock) this._character._subSpeed += amt;
			else this._character.setMoveSpeed(spd + amt);
		} else if (action[0] === 'dec') {
			if (otherSkillLock) this._character._subSpeed -= amt;
			else this._character.setMoveSpeed(spd - amt);
		} else if (action[0] === 'incrat') {
			if (otherSkillLock) this._character._subSpeed *= amt / amt2;
			else this._character.setMoveSpeed(spd * amt / amt2);
		}
	};

	Skill_Sequencer.prototype.userSpeedlock = function (action) {
		var amt = Number(action[0]) - this._character.battler()._moveSpeed || 3;
		var duration = Number(action[1]) || 60;
		this._skill.speedLockD = duration;
		this._character._subSpeed += this._character.moveSpeed() - amt;
		if (this._character._skillSpeedLock.indexOf(this._skill.id) < 0) this._character._skillSpeedLock.push(this._skill.id);
		this._character.setMoveSpeed(amt);
	};

	Skill_Sequencer.prototype.userMove = function (action) {
		if ((this._character._avoid && !this._character.battler().isWtypeEquipped(4)) || this._character._isDead) return;
		var dist = Number(action[1]) || this._character.moveTiles();
		var route = {
			list: [],
			repeat: false,
			skippable: true,
			wait: false
		}
		var radian = oldRadian = this._skill.radian;//this._character._radian;
		if (action[0] === 'backward') {
			radian -= Math.PI;
		}
		if (action[0] === 'friction') {
			if (!this._character.isDashing() || this._character._moveSpeed < 3) return;
			dist *= (this._character._moveSpeed - 2);
		}
		route.list.push({
			code: Game_Character.ROUTE_SCRIPT,
			parameters: ['qmove2(' + radian + ',' + dist + ')']
		});
		if (action[0] === 'backward') {
			//route.list.unshift({ // 왜있는거지
			//	code: Game_Character.ROUTE_DIR_FIX_OFF
			//});
			route.list.push({
				code: this._character.isDirectionFixed() ?
					Game_Character.ROUTE_DIR_FIX_ON : Game_Character.ROUTE_DIR_FIX_OFF
			});
		}
		route.list.push({
			code: Game_Character.ROUTE_END
		});
		this._character.forceMoveRoute(route);
		this._character.updateRoutineMove();
		this._waitForUserMove = action[2] ? action[2] === 'true' : false;
	};

	Skill_Sequencer.prototype.userMoveHere = function (action) {
		var center = this._character.centerWithCollider(this._skill.collider);
		var final = this._character.adjustPosition(center.x, center.y);
		var dx = final.x - this._character.px;
		var dy = final.y - this._character.py;
		var radian = Math.atan2(dy, dx);
		var dist = Math.sqrt(dx * dx + dy * dy);
		var route = {
			list: [],
			repeat: false,
			skippable: true,
			wait: false
		}
		route.list.push({
			code: Game_Character.ROUTE_SCRIPT,
			parameters: ['qmove2(' + radian + ',' + dist + ')']
		});
		route.list.push({
			code: Game_Character.ROUTE_END
		});
		this._character.forceMoveRoute(route);
		this._character.updateRoutineMove();
		this._waitForUserMove = action[0] ? action[0] === 'true' : false;
	};

	Skill_Sequencer.prototype.userMoveCancel = function () {
		if (this._character._moveroute) {
			this._character._moveroute.list = [];
			this._waitforusermove = false;
			$gamePlayer.clearPose()
		}
	};

	Skill_Sequencer.prototype.userJump = function (action) {
		var dist = Number(action[1]) || 0;
		var x1 = this._character.px;
		var y1 = this._character.py;
		var radian = oldRadian = this._character._radian;
		if (action[0] === 'backward') {
			radian -= Math.PI;
		}
		if (action[0] === 'space') {
			$gamePlayer.actor().addState(12);
			dist ? this._character.spaceJump(dist) : this._character.jumpForward();
			return;
		}
		var x2 = x1 + Math.cos(radian) * dist;
		var y2 = y1 + Math.sin(radian) * dist;
		var final = this._character.adjustPosition(x2, y2);
		var dx = final.x - x1;
		var dy = final.y - y1;
		var lastDirectionFix = this._character.isDirectionFixed();
		if (action[0] === 'backward') {
			this._character.setDirectionFix(true);
		}
		this._character.pixelJump(dx, dy);
		this._character.setDirectionFix(lastDirectionFix);
		this._character.setRadian(oldRadian);
		this._waitForUserJump = action[2] ? action[2] === 'true' : false;
	};

	Skill_Sequencer.prototype.userJumpHere = function (action) {
		var center = this._character.centerWithCollider(this._skill.collider);
		var final = center;//this._character.adjustPosition(center.x, center.y);
		var dx = final.x - this._character.px;
		var dy = final.y - this._character.py;
		this._character.pixelJump(dx, dy);
		this._waitForUserJump = action[0] ? action[0] === 'true' : false;
	};

	Skill_Sequencer.prototype.userTeleport = function () {
		var x1 = this._skill.collider.center.x;
		var y1 = this._skill.collider.center.y;
		this._character.setPixelPosition(x1, y1);
	};

	Skill_Sequencer.prototype.userSetDirection = function (action) {
		if (action[0] === 'skill') {
			var rad = this._character.radianToDirection(this._skill.radian);
			this._character.setDirection(4);
		}
		else {
			var dir = Number(action[0]);
			if (dir) {
				this._character.setDirection(dir);
			}
		}
	};

	Skill_Sequencer.prototype.userDirectionFix = function (action) {
		this._character.setDirectionFix(action[0] === 'true');
	};

	Skill_Sequencer.prototype.userPose = function (action) {
		if (Imported.QSprite) {
			//if (this._character === $gamePlayer) {
			//    if (this._character._avoid) return;
			//} //왜 playpose 안해?
			this._character.playPose(action[0]);
			this._waitForUserPose = action[1] === 'true';
		}
	};

	Skill_Sequencer.prototype.userPoseMove = function (action) {
		var dir = this._character._direction;
		if (this._character.isDiagonal()) {
			dir = this._character.isDiagonal();
		}
		var isMoving = this._character.isMoving();
		var pose = action[0];
		var wait = action[1] === "true";
		if (isMoving) {
			pose += "move";
			if (!(this._character._pose === "btkmove" + dir)) {// && !this._character._posePlaying) {
				this._character.loopPose(pose);
				this._waitForPose = wait;
			}
			return;
		} else {
			pose += "idle";
			if (!(this._character._pose === "btkidle" + dir)) {
				this._character.loopPose(pose, false, true);
			}
		}//this._character.playPose(pose);
	};

	//변경 : 라디안값 다시 조정해서 정리하자. 2,3,4,5에 각각 mod, rat, repeat, rad 추가
	Skill_Sequencer.prototype.userForceSkill = function (action) {
		if (this._character.battler().isStunned()) return;
		var radian = this._character._radian;
		var id = Number(action[0]);
		var angleOffset = null;
		var mode = Number(action[2]) || 0;
		var rat = Number(action[3]) || 1;
		var repeat = Number(action[3]) || 1;
		var rad = Number(action[4]) || 0;
		if (action[1]) {
			if (action[1].match('~')) {
				var angleInterval = action[1].split('~');
				angleOffset = Math.randomIntBetween(angleInterval[0], angleInterval[1]);
			} else if (action[1] == 'spread') {
				var attackOffset = this._character.battler().aof;
				var spreadOffset = this._skill.settings.spread.split(' ');
				if (spreadOffset.length == 2) {
					if (attackOffset >= spreadOffset[1]) angleOffset = 0;
					else {
						angleOffset = Math.randomBetween(Math.max(spreadOffset[0] - attackOffset, 0), spreadOffset[1] - attackOffset);
						if (Math.random() >= 0.5) angleOffset *= -1;
					}
				} else {
					if (attackOffset >= spreadOffset) angleOffset = 0;
					else angleOffset = Math.randomBetween(spreadOffset - attackOffset, -(spreadOffset - attackOffset))
				}
			} else angleOffset = Number(action[1]);
		} else angleOffset = 0;
		switch (mode) {
			case 0: //디폴트. 기존방향 유지
				radian = this._skill.radian;
				if (angleOffset) {
					radian += angleOffset * Math.PI / 180;
					if (radian < 0) radian += 2 * Math.PI;
					if (radian > Math.PI * 2) radian -= 2 * Math.PI;
				}
				var skill = this._character.forceSkill(id, true);
				if (!skill) return;
				skill.radian = radian;
				skill._target = this._skill._target;
				if (this._skill.collectTarget) skill.targets = this._skill.collectTarget;
				break;
			case 1: //이벤트 - 플레이어를 향해 발사
				this._character.radianTowardsPlayer();
				if (angleOffset) {
					radian = angleOffset * Math.PI / 180;
				}
				var skill = this._character.forceSkill(id, true);
				skill.radian = radian;
				skill._target = this._skill._target;
				break;
			case 2: //이벤트 - 플레이어를 점점향해 발사
				var x1 = $gamePlayer.cx();
				var y1 = $gamePlayer.cy();
				var x2 = this._character.cx();
				var y2 = this._character.cy();
				rat = rat * Math.PI / 180;
				var toRadian = Math.atan2((y1 - y2), x1 - x2);
				toRadian += toRadian < 0 ? 2 * Math.PI : 0;
				if (this._character._radian > toRadian + rat / 2)
					this._character._radian -= rat;
				else if (this._character._radian < toRadian - rat / 2)
					this._character._radian += rat;
				if (angleOffset) {
					radian = angleOffset * Math.PI / 180;
				}
				var skill = this._character.forceSkill(id, true);
				skill.radian = radian;
				skill._target = this._skill._target;
				break;
			case 3: //아직 사용하지 않음
				var radOffset = angleOffset * Math.PI / 180;
				var independent = {
					x: this._character.cx(),
					y: this._character.cy(),
					radian: null
				}
				independent.radian += radOffset;
				independent.radian += independent.radian < 0 ? 2 * Math.PI : 0;
				for (var i = 0; i < repeat; i++) {
					this._character.forceSkill(id, true, independent);
					independent.radian += rad * Math.PI / 180;
				}
				break;
			case 4: // 스킬 - repeat만큼 rad를 추가하며 스킬위치에서 사용
				// (angle, 4, repeat, rad) – repeat만큼 rad를 추가하며 스킬위치에서 사용

				var radOffset = angleOffset * Math.PI / 180;
				var independent = {
					x: this._skill.collider.center.x,
					y: this._skill.collider.center.y,
					radian: this._skill.radian
				}
				independent.radian += radOffset;
				independent.radian += independent.radian < 0 ? 2 * Math.PI : 0;
				for (var i = 0; i < repeat; i++) {
					this._character.forceSkill(id, true, independent);
					independent.radian += rad * Math.PI / 180;
				}
				break;
			case 5: //플레이어 - 무조건 스킬 라디안으로 나감. 일반공격류를 이걸로!
				radian = this._skill.radian;
				if (angleOffset) {
					radian += angleOffset * Math.PI / 180;
					if (radian < 0) radian += 2 * Math.PI;
					if (radian > Math.PI * 2) radian -= 2 * Math.PI;
				}
				var skill = this._character.forceSkill(id, true);
				if (!skill) return;
				skill.radian = radian; //this._skill
				skill._target = this._skill._target;
				break;
			default:
				alert("forceskill에서 없는 모드입니다. 수정해주세요")
				console.log(this._skill);
				break;
		}
	};

	Skill_Sequencer.prototype.userForceAttack = function (action) {
		var radian = this._character._radian;
		var id = action[0];
		var nextSkillId;
		for (var i = 1; i < action.length; i++) {
			nextSkillId = action[i];
			if ($gamePlayer._skillCooldowns[action[i - 1]]) {
				id = nextSkillId;
			}
		}
		if ($gamePlayer._skillCooldowns[action[action.length - 1]]) {
			return
		};
		var skill = this._character.forceSkill(id, true);
		return skill;

	};

	Skill_Sequencer.prototype.userAnimation = function (action) {
		var id = Number(action[0]);
		var x = this._character.cx();
		var y = this._character.cy();
		QABSManager.startAnimation(id, x, y);
	};

	Skill_Sequencer.prototype.userQAudio = function (action) {
		if (!Imported.QAudio) return;
		var id = Game_Interpreter.prototype.getUniqueQAudioId.call();
		var name = action[0];
		var loop = !!QPlus.getArg(action, /^loop$/i);
		var dontPan = !!QPlus.getArg(action, /^noPan$/i);
		var fadein = QPlus.getArg(action, /^fadein(\d+)/i);
		var type = QPlus.getArg(action, /^(bgm|bgs|me|se)$/i) || 'bgm';
		type = type.toLowerCase();
		var max = QPlus.getArg(action, /^max(\d+)/i);
		if (max === null) {
			max = 90;
		}
		max = Number(max) / 100;
		var radius = QPlus.getArg(action, /^radius(\d+)/i);
		if (radius === null) {
			radius = 12;
		}
		var audio = {
			name: name,
			volume: 100,
			pitch: 1,
			pan: 0
		}
		AudioManager.playQAudio(id, audio, {
			type: type,
			loop: loop,
			maxVolume: Number(max),
			radius: Number(radius),
			bindTo: this._character.charaId(),
			doPan: !dontPan,
			fadeIn: Number(fadein) || 0
		});
	};

	Skill_Sequencer.prototype.actionStore = function () {
		this._stored = new Point(this._skill.collider.x, this._skill.collider.y);
	};

	Skill_Sequencer.prototype.actionEvalAction = function (action) {
		var res = action.join(" ");
		eval(res);
	};

	Skill_Sequencer.prototype.actionMove = function (action) {
		var dir = action[0];
		var distance = Number(action[1]);
		if (action[1].match('~')) {
			var distInterval = action[1].split('~');
			distance = Math.randomIntBetween(distInterval[0], distInterval[1]);
		}
		var duration = Number(action[2]);
		ColliderManager.draw(this._skill.collider, duration);
		var radian = this._skill.radian;
		if (this._skill.settings.spread) {
			var angleOffset;
			var attackOffset = this._character.battler().aof;
			var spreadOffset = this._skill.settings.spread.split(' ');
			if (spreadOffset.length == 2) {
				if (attackOffset >= spreadOffset[1]) angleOffset = 0;
				else {
					angleOffset = Math.randomBetween(Math.max(spreadOffset[0] - attackOffset, 0), spreadOffset[1] - attackOffset);
					if (Math.random() >= 0.5) angleOffset *= -1;
				}
			} else {
				if (attackOffset >= spreadOffset) angleOffset = 0;
				else angleOffset = Math.randomBetween(spreadOffset - attackOffset, -(spreadOffset - attackOffset))
			}
			if (angleOffset) {
				radian += angleOffset * Math.PI / 180;
				if (radian < 0) radian += 2 * Math.PI;
				if (radian > Math.PI * 2) radian -= 2 * Math.PI;
			}
		} 
		if (dir === 'backward') {
			radian -= Math.PI;
		} else if (dir === 'withuser') {
			var x = this._character.px;
			var y = this._character.py;
			this._skill.withUser = [x, y];
		}
		radian += radian < 0 ? Math.PI * 2 : 0;
		this._waitForMove = action[3] === 'true';
		this.setSkillRadian(Number(radian));
		this.actionMoveSkill(distance, duration);
	};

	Skill_Sequencer.prototype.actionMoveToStored = function (action) {
		if (this._stored) {
			var x1 = this._skill.collider.x;
			var y1 = this._skill.collider.y;
			var x2 = this._stored.x;
			var y2 = this._stored.y;
			var dx = x2 - x1;
			var dy = y2 - y1;
			var dist = Math.sqrt(dx * dx + dy * dy);
			this._skill.radian = Math.atan2(y2 - y1, x2 - x1);
			this._skill.radian += this._skill.radian < 0 ? Math.PI * 2 : 0;
			this.actionMove(['forward', dist, action[0], action[1]]);
		}
	};

	Skill_Sequencer.prototype.actionWave = function (action) {
		var dir = action[0];
		var amp = Number(action[1]);
		var harm = Number(action[2]);
		var distance = Number(action[3]);
		var duration = Number(action[4]);
		ColliderManager.draw(this._skill.collider, duration);
		var radian = this._skill.radian;
		if (dir === 'backward') {
			radian -= Math.PI;
		}
		radian += radian < 0 ? Math.PI * 2 : 0;
		this.setSkillRadian(Number(radian));
		this.actionWaveSkill(amp, harm, distance, duration);
		this._waitForMove = action[5] === "true";
	};

	Skill_Sequencer.prototype.actionWaveToStored = function (action) {
		if (this._stored) {
			var x1 = this._skill.collider.x;
			var y1 = this._skill.collider.y;
			var x2 = this._stored.x;
			var y2 = this._stored.y;
			var dx = x2 - x1;
			var dy = y2 - y1;
			var dist = Math.sqrt(dx * dx + dy * dy);
			this._skill.radian = Math.atan2(dy, dx);
			this.actionWave(['forward', action[0], action[1], dist, action[2], action[3]]);
		}
	};

	Skill_Sequencer.prototype.actionTrigger = function () {

		//Added
			Terrax_ABS_blast_x.push(this._skill.collider.center.x);
			Terrax_ABS_blast_y.push(this._skill.collider.center.y);
			Terrax_ABS_blast.push(this._skill.settings.tx_blast);
			Terrax_ABS_blast_duration.push(-1);
			Terrax_ABS_blast_fade.push(-1);
			Terrax_ABS_blast_grow.push(-1);
			Terrax_ABS_blast_mapid.push($gameMap.mapId());

		this._skill.targets = QABSManager.getTargets(this._skill, this._character);
		this.updateSkillDamage();
	};

	Skill_Sequencer.prototype.actionTriggerOrigin = function () {
		this.updateSkillDamage();
	};

	Skill_Sequencer.prototype.actionAdjustAim = function () {
		if (!this._skill._target) return;
		var x1 = this._skill.collider.x;
		var y1 = this._skill.collider.y;
		var forward = this._skill._target.forwardV();
		var dt = Math.randomInt(5) || 1;
		var x2 = this._skill._target.px + forward.x * dt;
		var y2 = this._skill._target.py + forward.y * dt;
		var dx = x2 - x1;
		var dy = y2 - y1;
		this._skill.radian = Math.atan2(dy, dx);
	};

	Skill_Sequencer.prototype.actionWait = function (action) {
		var duration = Number(action[0]);
		ColliderManager.draw(this._skill.collider, duration);
		this._waitCount = duration;
	};

	Skill_Sequencer.prototype.actionPicture = function (action) {
		//picture name ratatable? direction rotatespeed anchorx y z
		this._skill.picture = new Sprite_SkillPicture();
		this._skill.picture.bitmap = ImageManager.loadPicture(action[0]);
		this._skill.picture.rotatable = action[1] === 'true';
		this._skill.picture.originDirection = Number(action[2]);
		this._skill.picture.z = action[6] || 3;
		this._skill.picture.rotate = Number(action[3]) || 0;
		this._skill.picture.anchor.x = action[4] || 0.5;
		this._skill.picture.anchor.y = action[5] || 0.5;
		var isAnimated = /@\[(\d+)-(\d+)\]/.exec(action[0]);
		if (isAnimated) {
			var frames = Number(isAnimated[1]);
			var layers = Math.ceil(Number(frames / 5)) || 1;
			var speed = Number(isAnimated[2]);
			this._skill.picture.setupAnim(frames, layers, speed);
		}
		if (this._skill.data.stypeId == 1) {
			if (this._skill.id > 500 && this._skill.id < 700) {
				this._skill.picture.scale.x = this._character.battler().ats + this._skill.settings._cast/100;
				this._skill.picture.scale.y = this._character.battler().ats + this._skill.settings._cast/100;
			}
		} else if (this._skill.data.damage.elementId == 11 && this._character.team() == 1) {
			this._skill.picture.blendMode = 1;
			this._skill.picture.setColorTone([200, 200, 0, 0]);
		}
		this.setSkillPictureRadian(this._skill.picture, this._skill.radian);
		var x = this._skill.collider.center.x;
		var y = this._skill.collider.center.y;
		this._skill.picture.move(x, y);
		this._skill.picture.bitmap.addLoadListener(function () {
			QABSManager.addPicture(this);
		}.bind(this._skill.picture));
	};

	Skill_Sequencer.prototype.actionBlendPicture = function (action) {
		//picture name ratatable? direction rotatespeed anchorx y z
		this._skill.picture = new Sprite_SkillPicture();
		this._skill.picture.bitmap = ImageManager.loadPicture(action[0]);
		this._skill.picture.rotatable = action[1] === 'true';
		this._skill.picture.originDirection = Number(action[2]);
		this._skill.picture.z = action[6] || 3;
		this._skill.picture.rotate = Number(action[3]) || 0;
		this._skill.picture.anchor.x = action[4] || 0.5;
		this._skill.picture.anchor.y = action[5] || 0.5;
		this._skill.picture.blendMode = 1;
		if (this._skill.data.stypeId == 1) {
			if (this._skill.id > 500 && this._skill.id < 700) {
				this._skill.picture.scale.x = this._character.battler().ats;
				this._skill.picture.scale.y = this._character.battler().ats;
			}
		}
		var isAnimated = /@\[(\d+)-(\d+)\]/.exec(action[0]);
		if (isAnimated) {
			var frames = Number(isAnimated[1]);
			var layers = Math.ceil(Number(frames / 5)) || 1;
			var speed = Number(isAnimated[2]);
			this._skill.picture.setupAnim(frames, layers, speed);
		}
		this.setSkillPictureRadian(this._skill.picture, this._skill.radian);
		var x = this._skill.collider.center.x;
		var y = this._skill.collider.center.y;
		this._skill.picture.move(x, y);
		this._skill.picture.bitmap.addLoadListener(function () {
			QABSManager.addPicture(this);
		}.bind(this._skill.picture));
	};

	Skill_Sequencer.prototype.actionPictureLine = function (action) {
		//picture name ratatable? direction fadein fadeout
		// name rotatable originDirection fadein fadeduration fadeout z
		this._skill.picture = new Sprite_SkillPicture();
		this._skill.picture.bitmap = ImageManager.loadPicture(action[0]);
		this._skill.picture.rotatable = action[1] === 'true';
		this._skill.picture.originDirection = Number(action[2]);
		this._skill.picture.fadein = Number(action[3]);
		this._skill.picture.fadeDuration = Number(action[4]);
		this._skill.picture.fadeout = Number(action[5]);
		this._skill.picture.anchor.x = 0.5;
		this._skill.picture.anchor.y = 0.5;
		this._skill.picture.z = action[6] || 3;
		this._skill.picture.opacity = 0;
		var isAnimated = /@\[(\d+)-(\d+)\]/.exec(action[0]);
		if (isAnimated) {
			var frames = Number(isAnimated[1]);
			var layers = Math.ceil(Number(frames / 5)) || 1;
			var speed = Number(isAnimated[2]);
			this._skill.picture.setupAnim(frames, layers, speed);
		}
		this.setSkillPictureRadian(this._skill.picture, this._skill.radian);
		var x = this._skill.collider.center.x;
		var y = this._skill.collider.center.y;
		this._skill.picture.move(x, y);
		this._skill.picture.bitmap.addLoadListener(function () {
			QABSManager.addPicture(this);
		}.bind(this._skill.picture));
	};

	Skill_Sequencer.prototype.actionTrail = function (action) {
		this._skill.trail = new Sprite_SkillTrail();
		this._skill.trail.bitmap = ImageManager.loadPicture(action[0]);
		this._skill.trail.move(0, 0, Graphics.width, Graphics.height);
		this._skill.trail.rotatable = action[1] === 'true';
		this._skill.trail.originDirection = Number(action[2]);
		this._skill.trail.z = 3;
		this.setSkillPictureRadian(this._skill.trail, this._skill.radian);
		var x = this._skill.collider.center.x;
		var y = this._skill.collider.center.y;
		this._skill.trail.startX = x;
		this._skill.trail.startY = y;
		this._skill.trail.bitmap.addLoadListener(function () {
			var w = this.bitmap.width;
			var h = this.bitmap.height;
			this.move(x, y, w, h);
			QABSManager.addPicture(this);
		}.bind(this._skill.trail));
	};

	Skill_Sequencer.prototype.actionCollider = function (action) {
		var display = action[0];
		var shape = action[1]
		var duration = Number(action[4]) || -1;
		this._skill.newCollider = this._skill.newCollider || null;
		
		if (display === 'show') {
			this._skill.pictureCollider = new Sprite_SkillCollider(this._skill.collider);
			QABSManager.addPicture(this._skill.pictureCollider);
		} else if (display === 'hide' && this._skill.pictureCollider) {
			QABSManager.removePicture(this._skill.pictureCollider);
			this._skill.pictureCollider = null;
		}
		if (display === 'add') {
			if (this._skill.data.stypeId == 1) {
				if (this._skill.id > 500 && this._skill.id < 700) {
					action[2] *= this._character.battler().ats;
					action[3] *= this._character.battler().ats;
				}
			}
			if (shape === 'box') this._skill.newCollider = new Box_Collider(action[2], action[3], 0, 0);
			else this._skill.newCollider = new Circle_Collider(action[2], action[3], 0, 0);
			this._skill.newCollider.color = action[6] == 'parry' ? "#00ff00" : "#ffffff";
			this._skill.newCollider.team = this._character.team();
			this._skill.newCollider._offset.x = -action[2] / 2;
			this._skill.newCollider._offset.y = -action[3] / 2;
			this._skill.newCollider._radian = this._skill.radian;
			//this._skill.newCollider.rotate(Math.PI / 2 + this._skill.newCollider._radian);
			this._skill.newCollider.moveTo(this._skill.collider.center.x, this._skill.collider.center.y)
			ColliderManager.addCollider(this._skill.newCollider, duration)
		} else if (display === 'remove') {
			if (this._skill.newCollider && this._skill.newCollider.color == '#00ff00') this._character._parrySePlayed = false;
			ColliderManager.remove(this._skill.newCollider)
			this._skill.newCollider = undefined
		}
	};

	Skill_Sequencer.prototype.actionAnimation = function (action) {
		var id = Number(action[0]);
		var x = this._skill.collider.center.x;
		var y = this._skill.collider.center.y;
		QABSManager.startAnimation(id, x, y);
	};

	Skill_Sequencer.prototype.actionSE = function (action) {
		var se = {};
		se.name = action[0];
		se.volume = Number(action[1]) || 90;
		se.pitch = Number(action[2]) || 100;
		se.pan = Number(action[3]) || 0;
		AudioManager.playSe(se);
	};

	Skill_Sequencer.prototype.actionCollectTargetSE = function (action) {
		if (this._skill.collectTarget.length > 0) {
			var se = {};
			se.name = action[0];
			se.volume = Number(action[1]) || 90;
			se.pitch = Number(action[2]) || 100;
			se.pan = Number(action[3]) || 0;
			AudioManager.playSe(se);
		}
	};

	Skill_Sequencer.prototype.actionQAudio = function (action) {
		if (!Imported.QAudio) return;
		var x = this._skill.collider.center.x;
		var y = this._skill.collider.center.x;
		var id = Game_Interpreter.prototype.getUniqueQAudioId.call();
		var name = action[0];
		var loop = !!QPlus.getArg(action, /^loop$/i);
		var dontPan = !!QPlus.getArg(action, /^noPan$/i);
		var fadein = QPlus.getArg(action, /^fadein(\d+)/i);
		var type = QPlus.getArg(action, /^(bgm|bgs|me|se)$/i) || 'bgm';
		type = type.toLowerCase();
		var max = QPlus.getArg(action, /^max(\d+)/i);
		if (max === null) {
			max = 90;
		}
		max = Number(max) / 100;
		var radius = QPlus.getArg(action, /^radius(\d+)/i);
		if (radius === null) {
			radius = 5;
		}
		var audio = {
			name: name,
			volume: 100,
			pitch: 0,
			pan: 0
		}
		AudioManager.playQAudio(id, audio, {
			type: type,
			loop: loop,
			maxVolume: Number(max),
			radius: Number(radius),
			x: x / QMovement.tileSize,
			y: y / QMovement.tileSize,
			doPan: !dontPan,
			fadeIn: Number(fadein) || 0
		});
	};

	Skill_Sequencer.prototype.actionLocate = function (action) {
		var collider = this._skill.collider;
		if (action[0] == 'player') {
			x1 = $gamePlayer.cx();
			y1 = $gamePlayer.cy();
		} else {
			x1 = action[1];
			y1 = action[2];
		}
		var x2 = x1 - collider.ox;
		var y2 = y1 - collider.oy;
        /*if (x1 < x2) x1 = Math.min(x1 + this._skill.speedX, x2);
        if (x1 > x2) x1 = Math.max(x1 - this._skill.speedX, x2);
        if (y1 < y2) y1 = Math.min(y1 + this._skill.speedY, y2);
        if (y1 > y2) y1 = Math.max(y1 - this._skill.speedY, y2);*/
		collider.moveTo(x2, y2);
	};

	Skill_Sequencer.prototype.actionMoveSkill = function (distance, duration) {
		var instant = duration === 0;
		if (duration <= 0) duration = 1;
		this._skill.newX = this._skill.collider.x + Math.round(distance * Math.cos(this._skill.radian));
		this._skill.newY = this._skill.collider.y + Math.round(distance * Math.sin(this._skill.radian));
		this._skill.speed = Math.abs(distance / duration);
		this._skill.speedX = this._skill.speed * Math.cos(this._skill.radian);
		this._skill.speedY = this._skill.speed * Math.sin(this._skill.radian);

		this._skill.maxDuration = duration;
		this._skill.duration = duration;
		this._skill.moving = true;
		this._skill.accel = 0;
		this._skill.rotate = 0;
		this._skill.guidSpeed = 0;
		this._skill.guidA = 0;
		this._skill.accelD = 0;
		this._skill.rotateD = 0;
		this._skill.guidD = 0;
		this._skill.homing = 0;
		this._skill.homingD = 0;
		this._skill.homingX = 0;
		this._skill.homingY = 0;
		if (!this._skill.withUser) this._skill.withUser = null;
		if (instant) {
			this.updateSkillPosition();
		}
	};

	Skill_Sequencer.prototype.actionWaveSkill = function (amp, harmonics, distance, duration) {
		this._skill.amp = amp;
		this._skill.distance = distance;
		this._skill.waveLength = harmonics * Math.PI;
		this._skill.waveSpeed = this._skill.waveLength / duration;
		this._skill.theta = 0;
		this._skill.xi = this._skill.collider.x;
		this._skill.yi = this._skill.collider.y;
		this._skill.waving = true;
		this._skill.moving = true;
	};

	Skill_Sequencer.prototype.targetMove = function (action, targets) {
		var dist = Number(action[1]) || this._character.moveTiles();
		for (var i = 0; i < targets.length; i++) {
			var dist2 = dist - dist * eval('targets[i].battler().' + QABS.mrst);
			if (dist2 <= 0) return;
			var dx = targets[i].cx() - this._character.cx();
			var dy = targets[i].cy() - this._character.cy();
			var radian = Math.atan2(dy, dx);
			radian += radian < 0 ? Math.PI * 2 : 0;
			if (action[0] === 'towards') {
				radian += Math.PI;
			} else if (action[0] === 'into' || action[0] === 'towardsSkill') {
				var dxi = this._skill.collider.center.x - targets[i].cx();
				var dyi = this._skill.collider.center.y - targets[i].cy();
				radian = Math.atan2(dyi, dxi);
				dist2 = Math.min(dist2, Math.sqrt(dxi * dxi + dyi * dyi));
			} else if (action[0] === 'awayFromSkill') {
				var dxi = targets[i].cx() - this._skill.collider.center.x;
				var dyi = targets[i].cy() - this._skill.collider.center.y;
				radian = Math.atan2(dyi, dxi);
			}
			var route = {
				list: [],
				repeat: false,
				skippable: true,
				wait: false
			}
			route.list.push({
				code: Game_Character.ROUTE_DIR_FIX_ON
			});
			route.list.push({
				code: Game_Character.ROUTE_SCRIPT,
				parameters: ['qmove2(' + radian + ',' + dist + ')']
			});
			if (!targets[i].isDirectionFixed()) {
				route.list.push({
					code: Game_Character.ROUTE_DIR_FIX_OFF
				});
			}
			route.list.push({
				code: Game_Character.ROUTE_SCRIPT,
				parameters: ['this.setRadian(' + targets[i]._radian + ')']
			});
			route.list.push({
				code: Game_Character.ROUTE_END
			});
			targets[i].forceMoveRoute(route);
			targets[i].updateRoutineMove();
		}
	};

	Skill_Sequencer.prototype.targetJump = function (action, targets) {
		var dist = Number(action[1]) || 0;
		for (var i = 0; i < targets.length; i++) {
			var dist2 = dist - dist * eval('targets[i].battler().' + QABS.mrst);
			if (dist2 <= 0) return;
			var dx = targets[i].cx() - this._character.cx();
			var dy = targets[i].cy() - this._character.cy();
			var radian = Math.atan2(dy, dx);
			radian += radian < 0 ? Math.PI * 2 : 0;
			if (action[0] === 'towards') {
				radian += Math.PI;
			} else if (action[0] === 'into' || action[0] === 'towardsSkill') {
				var dxi = this._skill.collider.center.x - targets[i].cx();
				var dyi = this._skill.collider.center.y - targets[i].cy();
				radian = Math.atan2(dyi, dxi);
				dist2 = Math.min(dist2, Math.sqrt(dxi * dxi + dyi * dyi));
			} else if (action[0] === 'awayFromSkill') {
				var dxi = targets[i].cx() - this._skill.collider.center.x;
				var dyi = targets[i].cy() - this._skill.collider.center.y;
				radian = Math.atan2(dyi, dxi);
				dist2 = Math.min(dist2, Math.sqrt(dxi * dxi + dyi * dyi));
			}
			var x1 = targets[i].px;
			var y1 = targets[i].py;
			var x2 = x1 + Math.round(dist2 * Math.cos(radian));
			var y2 = y1 + Math.round(dist2 * Math.sin(radian));
			var final = targets[i].adjustPosition(x2, y2);
			dx = final.x - x1;
			dy = final.y - y1;
			if (!targets[i].battler().isStateAffected(11) && !targets[i].battler().isAvoid() && !targets[i]._invincible && !targets[i]._noKnock && !targets[i]._freeze) {
				if (targets[i]._avoid && !this._skill.settings.inevatable) return;
				var lastDirectionFix = targets[i].isDirectionFixed();
				var prevRadian = targets[i]._radian;
				targets[i].setDirectionFix(true);
				targets[i].pixelJump(dx, dy);
				targets[i].setDirectionFix(lastDirectionFix);
				targets[i].setRadian(prevRadian);
			}
		}
	};

	Skill_Sequencer.prototype.targetJumpZ = function (action, targets, height) {
		var dist = Number(action[1]) || 0;
		var z = action[2] ? action[2] : 1;
		var peak = action[3] ? action[3] : z;
		for (var i = 0; i < targets.length; i++) {
			var dist2 = dist - dist * eval('targets[i].battler().' + QABS.mrst);
			if (dist2 <= 0) return;
			var dx = targets[i].cx() - this._character.cx();
			var dy = targets[i].cy() - this._character.cy();
			var radian = Math.atan2(dy, dx);
			radian += radian < 0 ? Math.PI * 2 : 0;
			if (action[0] === 'towards') {
				radian += Math.PI;
			} else if (action[0] === 'into' || action[0] === 'towardsSkill') {
				var dxi = this._skill.collider.center.x - targets[i].cx();
				var dyi = this._skill.collider.center.y - targets[i].cy();
				radian = Math.atan2(dyi, dxi);
				dist2 = Math.min(dist2, Math.sqrt(dxi * dxi + dyi * dyi));
			} else if (action[0] === 'away') {
				var dxi = targets[i].cx() - this._skill.collider.center.x;
				var dyi = targets[i].cy() - this._skill.collider.center.y;
				radian = Math.atan2(dyi, dxi);
				dist2 = Math.min(dist2, Math.sqrt(dxi * dxi + dyi * dyi));
			} else if (action[0] === 'push') {
				var dxi = targets[i].cx() - this._skill.collider.center.x;
				var dyi = targets[i].cy() - this._skill.collider.center.y;
				radian = this._skill.radian;//Math.atan2(dyi, dxi);
				//dist2 = Math.min(dist2, Math.sqrt(dxi * dxi + dyi * dyi));
			}
			if (targets[i]._transit.indexOf('zjump') < 0) targets[i]._transit.push('zjump');
			var x1 = targets[i].px;
			var y1 = targets[i].py;
			var x2 = x1 + Math.round(dist2 * Math.cos(radian));
			var y2 = y1 + Math.round(dist2 * Math.sin(radian));
			var final = targets[i].adjustPosition(x2, y2);
			dx = final.x - x1;
			dy = final.y - y1;
			if (!targets[i].battler().isStateAffected(11) && !targets[i].battler().isAvoid() && !targets[i]._invincible && !targets[i]._noKnock && !targets[i]._freeze) {
				if (targets[i]._avoid && !this._skill.settings.inevatable) return;
				var lastDirectionFix = targets[i].isDirectionFixed();
				var prevRadian = targets[i]._radian;
				targets[i].setDirectionFix(true);
				targets[i].pixelZJump(dx, dy, z, peak);
				targets[i].setDirectionFix(lastDirectionFix);
				targets[i].setRadian(prevRadian);
			}
		}
	};

	Skill_Sequencer.prototype.targetPose = function (action, targets) {
		var pose = action[0];
		if (Imported.QSprite) {
			for (var i = 0; i < targets.length; i++) {
				if (!targets[i].battler().isStateAffected(11) && !targets[i].battler().isAvoid() && !targets[i]._invincible)
					if (targets[i]._avoid && !this._skill.settings.inevatable) return;
				targets[i].playPose(pose);
			}
		}
	};

	Skill_Sequencer.prototype.targetCancel = function (action, targets) {
		for (var i = 0; i < targets.length; i++) {
			if (targets[i]._casting) {
				targets[i]._casting.break = true;
			}
		}
	};

	Skill_Sequencer.prototype.targetShake = function (action, targets) {
		if (targets.length > 0) {
			var power = Number(action[0]);
			var speed = Number(action[1]);
			var duration = Number(action[2]);
			$gameScreen.startShake(power, speed, duration);
		}
	};

	Skill_Sequencer.prototype.targetShiver = function (action, targets) {
		for (var i = 0; i < targets.length; i++) {
			targets[i]._shakeData[0] = action[0];
			targets[i]._shakeData[3] = action[1];
		}
	};

	Skill_Sequencer.prototype.targetFreeze = function (action, targets) {
		for (var i = 0; i < targets.length; i++) {
			if (!targets[i].battler().isStateAffected(21)) targets[i].battler().addState(21);
			targets[i].battler()._stateSteps[21] += Number(action[0])
		}
	};

	Skill_Sequencer.prototype.targetQAudio = function (action, targets) {
		if (!Imported.QAudio) return;
		var id = Game_Interpreter.prototype.getUniqueQAudioId.call();
		var name = action[0];
		var loop = !!QPlus.getArg(action, /^loop$/i);
		var dontPan = !!QPlus.getArg(action, /^noPan$/i);
		var fadein = QPlus.getArg(action, /^fadein(\d+)/i);
		var type = QPlus.getArg(action, /^(bgm|bgs|me|se)$/i) || 'bgm';
		type = type.toLowerCase();
		var max = QPlus.getArg(action, /^max(\d+)/i);
		if (max === null) {
			max = 90;
		}
		max = Number(max) / 100;
		var radius = QPlus.getArg(action, /^radius(\d+)/i);
		if (radius === null) {
			radius = 5;
		}
		var audio = {
			name: name,
			volume: 100,
			pitch: 0,
			pan: 0
		}
		for (var i = 0; i < targets.length; i++) {
			AudioManager.playQAudio(id, audio, {
				type: type,
				loop: loop,
				maxVolume: Number(max),
				radius: Number(radius),
				bindTo: targets[i].charaId(),
				doPan: !dontPan,
				fadeIn: Number(fadein) || 0
			});
		};
	};

	Skill_Sequencer.prototype.setSkillRadian = function (radian) {
		var rotate = this._skill.settings.rotate === true;
		this._skill.radian = radian;
		this._skill.collider.setRadian(Math.PI / 2 + radian);
		if (this._skill.picture) {
			this.setSkillPictureRadian(this._skill.picture, this._skill.radian);
		}
	};

	//변경 : 로테이션 부호가 반대로됐는데, 왜인지 모르겠음
	Skill_Sequencer.prototype.setSkillPictureRadian = function (picture, radian) {
		if (!picture) return;
		if (!picture.rotatable) return;
		var originDirection = picture.originDirection;
		var originRadian = this._character.directionToRadian(originDirection);
		picture.rotation = radian - originRadian;
	};


    /* 
     * 0 :완전통과
     * 1 :타일통과
     * 2 :이벤트통과
     * 3 :비통과
     */


	Skill_Sequencer.prototype.updateTargetEffect = function (target, targets) {
		if (!target.battler()) return false;
		if (target.isFriendly(this._character)) {
			if ([1, 2, 3, 4, 5, 6].contains(this._skill.data.scope)) return false;
		} else if ([7, 8, 9, 10].contains(this._skill.data.scope)) return false;
		if (this._skill.data.scope === 11 && target !== this._character) return false;
		if (this._skill.collectTarget && !this._skill.collectTarget.contains(target)) this._skill.collectTarget.push(target);
		else if (!this._skill.targetsHit.contains(target.charaId()) && !target._invincible) {
			this._skill.targetsHit.push(target.charaId());
			targets.push(target);
		}
	}

	Skill_Sequencer.prototype.canSkillMove = function () {
		var collided = false;
		var through = this._skill.settings.through;
		var targets = [];
		//var targets = QABSManager.getTargets(this._skill, this._character);
		//if (targets.length > 0) {
		//	for (var i = targets.length - 1; i >= 0; i--) { //타겟들 모두에게
		//		if (this._skill.collectTarget && !this._skill.collectTarget.contains(targets[i])) this._skill.collectTarget.push(targets[i]);
		//		else {
		//			if (targets[i]._avoid) {
		//				this.startAvoidEffect(targets[i]);
		//				targets.splice(i, 1);
		//			} else if (!this._skill.targetsHit.contains(targets[i].charaId()) && !targets[i]._invincible) {
		//				this._skill.targetsHit.push(targets[i].charaId());
		//			} 
		//		}
		//	}
		//	if (targets.length > 0) {
		//		this._skill.targets = targets;
		//		if (through === 1 || through === 3) {
		//			collided = true;
		//			// TODO select the nearest target
		//			this._skill.targets = [targets[0]];
		//		}
		//		this.updateSkillDamage();
		//	}
		//} else this._skill.targetsHit = [];
		//if (collided) return false;
		//var edge = this._skill.collider.gridEdge();
		//var maxW = $gameMap.width();
		//var maxH = $gameMap.height();
		//if (!$gameMap.isLoopHorizontal()) {
		//	if (edge.x2 < 0 || edge.x1 >= maxW) return false;
		//}
		//if (!$gameMap.isLoopVertical()) {
		//	if (edge.y2 < 0 || edge.y1 >= maxH) return false;
		//} // 과부하 줄이기위해 맵밖체크 없앰
		if (through === 3) {
			var chara = this._character;
			ColliderManager.getAllNear(this._skill.collider, function (type, collider) {
				if (type === 'chara') {
					if (collider.team() == this._character.team()) return false;
					if (this._skill.collider.intersects(collider.collider('hitbox'))) {
						if (collider === this._character ||// !collider.isNormalPriority() ||
							collider._bulletThrough || collider._erased) return false;
						if (collider.isThrough() && !collider.battler()) return false;
						if (collider._avoid && !this._skill.settings.inevatable) {
							this.startAvoidEffect(collider);
							return false;
						}
						if (collider.battler()) {
							if (collider.battler().isStateAffected(11) || collider.battler().isAvoid() || collider.battler().isDead() || collider._jumpCount > 5) return false;
						}
						this.updateTargetEffect(collider, targets);
						if (targets.length > 0) {
							this._skill.targets = targets;
							this.updateSkillDamage();
						}
						collided = true;
						QABSManager.startAnimation(this._skill.data.animationId, this._skill.collider.center.x, this._skill.collider.center.y)
						return 'break';
					}
				} else if (type === 'collider') {
					if (collider === this._skill.collider) return false;
					if (collider.team == chara.team()) return false;
					if (this._skill.collider.intersects(collider)) {
						if (collider.color == "#00ff00") {
							this._skill.sequencer._skill.radian = $gamePlayer._radian
							this._skill.sequencer.setSkillPictureRadian(this._skill.sequencer._skill.picture, this._skill.sequencer._skill.radian);
							this._skill.speedX = (this._skill.speed + 6) * Math.cos(this._skill.radian);
							this._skill.speedY = (this._skill.speed + 6) * Math.sin(this._skill.radian);
							//이벤트의 엑티브 스킬에서 제거해주고, 플레이어의 엑티브 스킬에 추가시킨다
							var i = this._skill.sequencer._character._activeSkills.indexOf(this._skill);
							if (i > -1) {
								this._skill.sequencer._character._activeSkills.splice(i, 1);
								this._skill.sequencer._character = $gamePlayer;
								this._skill.sequencer._character._activeSkills.push(this._skill);
							}
							if (this._skill.picture) {
								//this.picture.blendMode = 1;
								this._skill.picture.setColorTone([200, 200, 0, 0]);
							}
							if (!this._skill.sequencer._character._parrySePlayed) {
								var se = {
									name: 'anim89',
									pan: 0,
									pitch: 150,
									volume: 60
								};
								AudioManager.playSe(se);
								if ($gamePlayer.battler().isWtypeEquipped(3)) {
									$gamePlayer._parryStack++;
								}
								if ($gamePlayer._parryStack > 2) {
									$gamePlayer.battler().addState(97);
									var se = {};
									se.name = 'se_stack';
									se.pitch = 100;
									se.volume = 30;
									AudioManager.playSe(se);
									$gamePlayer._parryStack = 0;
								}
								this._skill.sequencer._character._parrySePlayed = true;
							}
							return false;
						}
						collided = true;
						QABSManager.startAnimation(this._skill.data.animationId, this._skill.collider.center.x, this._skill.collider.center.y)
						return 'break';
					}
				}
			}.bind(this));
			if ($gameMap._hasCM) {
				var edge = {
					2: 'bottom', 4: 'left',
					6: 'right', 8: 'top'
				}
				var passableColors = ['#00000000', '#0000ff'];
				if (!$gameMap.collisionMapPass(this._skill.collider, edge[2], passableColors)) {
					collided = true;
					QABSManager.startAnimation(this._skill.data.animationId, this._skill.collider.center.x, this._skill.collider.center.y)
				}
			}
			return !collided;
		} else if (through === 1) {
			var chara = this._character;
			ColliderManager.getAllNear(this._skill.collider, function (type, collider) {
				if (type === 'chara') {
					if (collider.team() == this._character.team()) return false;
					if (this._skill.collider.intersects(collider.collider('hitbox'))) {
						if (collider === this._character ||// !collider.isNormalPriority() ||
							collider._bulletThrough || collider._erased) return false;
						if (collider.isThrough() && !collider.battler()) return false;
						if (collider._avoid && !this._skill.settings.inevatable) {
							this.startAvoidEffect(collider);
							return false;
						}
						if (collider.battler()) {
							if (collider.battler().isStateAffected(11) || collider.battler().isAvoid() || collider.battler().isDead() || collider._jumpCount > 5) return false;
						}
						this.updateTargetEffect(collider, targets);
						if (targets.length > 0) {
							this._skill.targets = targets;
							this.updateSkillDamage();
						}
						collided = true;
						QABSManager.startAnimation(this._skill.data.animationId, this._skill.collider.center.x, this._skill.collider.center.y)
						return 'break';
					}
				} else if (type == 'collider') {
					if (!collider.team) return false;
					if (collider.team == chara.team()) return false;
					if (this._skill.collider.intersects(collider)) {
						if (collider.color == "#00ff00") return false;
						collided = true;
						QABSManager.startAnimation(this._skill.data.animationId, this._skill.collider.center.x, this._skill.collider.center.y)
						return 'break';
					}
				}
			}.bind(this));
		} else if (through === 0) {
			var chara = this._character;
			ColliderManager.getAllNear(this._skill.collider, function (type, collider) {
				if (type === 'chara') {
					if (collider.team() == this._character.team()) return false;
					if (this._skill.collider.intersects(collider.collider('hitbox'))) {
						if (collider === this._character ||// !collider.isNormalPriority() ||
							collider._bulletThrough || collider._erased) return false;
						if (collider.isThrough() && !collider.battler()) return false;
						if (collider._avoid && !this._skill.settings.inevatable) {
							this.startAvoidEffect(collider);
							return false;
						}
						if (collider.battler()) {
							if (collider.battler().isStateAffected(11) || collider.battler().isAvoid() || collider.battler().isDead() || collider._jumpCount > 5) return false;
						}
						this.updateTargetEffect(collider, targets);
					}
				} else if (type == 'collider') {
					if (!collider.team) return false;
					if (collider.team == chara.team()) return false;
					if (this._skill.collider.intersects(collider)) {
						if (collider.color == "#00ff00") return false;
						collided = true;
						QABSManager.startAnimation(this._skill.data.animationId, this._skill.collider.center.x, this._skill.collider.center.y)
						return 'break';
					}
				}
			}.bind(this));
			if (targets.length > 0) {
				this._skill.targets = targets;
				this.updateSkillDamage();
			}
		} else if (through === 2) {
			var chara = this._character;
			ColliderManager.getAllNear(this._skill.collider, function (type, collider) {
				if (type === 'chara') {
					if (collider.team() == this._character.team()) return false;
					if (this._skill.collider.intersects(collider.collider('hitbox'))) {
						if (collider === this._character ||// !collider.isNormalPriority() ||
							collider._bulletThrough || collider._erased) return false;
						if (collider.isThrough() && !collider.battler()) return false;
						if (collider._avoid && !this._skill.settings.inevatable) {
							this.startAvoidEffect(collider);
							return false;
						}
						if (collider.battler()) {
							if (collider.battler().isStateAffected(11) || collider.battler().isAvoid() || collider.battler().isDead() || collider._jumpCount > 5) return false;
						}
						this.updateTargetEffect(collider, targets);
					}
				} else if (type == 'collider') {
					if (collider === this._skill.collider) return false;
					if (collider.team == chara.team()) return false;
					if (this._skill.collider.intersects(collider)) {
						if (collider.color == "#00ff00") {
							this._skill.sequencer._skill.radian = $gamePlayer._radian
							this._skill.sequencer.setSkillPictureRadian(this._skill.sequencer._skill.picture, this._skill.sequencer._skill.radian);
							this._skill.speedX = (this._skill.speed + 6) * Math.cos(this._skill.radian);
							this._skill.speedY = (this._skill.speed + 6) * Math.sin(this._skill.radian);
							//이벤트의 엑티브 스킬에서 제거해주고, 플레이어의 엑티브 스킬에 추가시킨다
							var i = this._skill.sequencer._character._activeSkills.indexOf(this._skill);
							if (i > -1) {
								this._skill.sequencer._character._activeSkills.splice(i, 1);
								this._skill.sequencer._character = $gamePlayer;
								this._skill.sequencer._character._activeSkills.push(this._skill);
							}
							if (this._skill.picture) {
								//this.picture.blendMode = 1;
								this._skill.picture.setColorTone([200, 200, 0, 0]);
							}
							if (!this._skill.sequencer._character._parrySePlayed) {
								var se = {
									name: 'anim89',
									pan: 0,
									pitch: 150,
									volume: 60
								};
								AudioManager.playSe(se);
								if ($gamePlayer.battler().isWtypeEquipped(3)) {
									$gamePlayer._parryStack++;
								}
								if ($gamePlayer._parryStack > 2) {
									$gamePlayer.battler().addState(97);
									var se = {};
									se.name = 'se_stack';
									se.pitch = 100;
									se.volume = 30;
									AudioManager.playSe(se);
									$gamePlayer._parryStack = 0;
								}
								this._skill.sequencer._character._parrySePlayed = true;
							}
							return false;
						}
						collided = true;
						QABSManager.startAnimation(this._skill.data.animationId, this._skill.collider.center.x, this._skill.collider.center.y)
						return 'break';
					}
				}
			}.bind(this));
			if (targets.length > 0) {
				this._skill.targets = targets;
				this.updateSkillDamage();
			}
			if ($gameMap._hasCM) {
				var edge = {
					2: 'bottom', 4: 'left',
					6: 'right', 8: 'top'
				}
				var passableColors = ['#00000000', '#0000ff'];
				if (!$gameMap.collisionMapPass(this._skill.collider, edge[2], passableColors)) {
					collided = true;
					QABSManager.startAnimation(this._skill.data.animationId, this._skill.collider.center.x, this._skill.collider.center.y)
				}
			}
		} else {
			ColliderManager.getCharactersNear(this._skill.collider, function (collider) {
				if (collider.team() == this._character.team()) return false;
				if (this._skill.collider.intersects(collider.collider('hitbox'))) {
					if (collider === this._character ||// !collider.isNormalPriority() ||
						collider._bulletThrough || collider._erased) return false;
					if (collider.isThrough() && !collider.battler()) return false;
					if (collider._avoid && !this._skill.settings.inevatable) {
						this.startAvoidEffect(collider);
						return false;
					}
					if (collider.battler()) {
						if (collider.battler().isStateAffected(11) || collider.battler().isAvoid() || collider.battler().isDead() || collider._jumpCount > 5) return false;
					}
					this.updateTargetEffect(collider, targets);
				}

			}.bind(this));
			if (targets.length > 0) {
				this._skill.targets = targets;
				this.updateSkillDamage();
			}
		}
		return !collided;
	};

	Skill_Sequencer.prototype.startAvoidEffect = function (target) {
		if (target.battler().isAvoid()) return;
		if (target != $gamePlayer) return;
		if (target.battler().isWtypeEquipped(4)) {
			target.battler().gainMp(1);
			target.battler().gainTp(18);
			if (target._cast > 0) {
				if (target._cast < target._maxCast) {
					target._cast += 100;
					if (target._cast >= target._maxCast) {
						if (!target.battler().isStateStackMax(94)) {
							target.battler().addState(94);
							var se = {};
							se.name = 'se_stack';
							se.pitch = 100;
							se.volume = 30;
							AudioManager.playSe(se);
						}
						target.requestAnimation(78);
					}
				}
			}

			target.battler().addState(99);
			Rumble(0.5, 0.2, 300)
			$gameTemp._motionBlur = [15, 1.5, 0, 0, 0];
			$gameMap.createFilter('test', 'zoomblur', 0, -1);
			$gameMap.moveFilterQueue('test', [0, 0, 0, 0], 20);
			target.forceSkill(17);
		} else {
			target.battler().gainMp(1);
			if (target.battler().isStateAffected(112)) target.battler().gainTp(27);
			else target.battler().gainTp(18);
			if (target._cast > 0) {
				if (target._cast < target._maxCast) {
					target._cast += 50;
					if (target._cast >= target._maxCast) {
						if (!target.battler().isStateStackMax(94)) {
							target.battler().addState(94);
							var se = {};
							se.name = 'se_stack';
							se.pitch = 100;
							se.volume = 30;
							AudioManager.playSe(se);
						}
						target.requestAnimation(78);
					}
				}
			}
			if (target._avoidshot.length > 0) target._onceMultipleShot = Number($dataStates[target._avoidshot[0]].qmeta.avoidshot);

			target.battler().addState(15);
			Rumble(0.5, 0.2, 300)
			$gameTemp._motionBlur = [15, 3, 0, 0, 0];
			$gameMap.createFilter('test', 'zoomblur', 0, -1);
			$gameMap.moveFilterQueue('test', [0, 0, 0, 0], 20);
			if (target.battler().isWtypeEquipped(2)) {
				if (!target.battler()._stateStacks[91] || !target.battler().isStateStackMax(91)) {
					target.battler().addState(91);
					if (target.battler().isStateAffected(336)) target.battler().addState(91);
					var se = {};
					se.name = 'se_stack';
					se.pitch = 100;
					se.volume = 30;
					AudioManager.playSe(se);
				}
			}

		}
	}

	Skill_Sequencer.prototype.isWaiting = function () {
		return this._waitCount > 0 || this._waitForMove ||
			this._waitForUserMove || this._waitForUserJump ||
			this._waitForUserPose;
	};

	Skill_Sequencer.prototype.onBreak = function () {
		var i = this._character._skillLocked.indexOf(this._skill);
		if (i >= 0) {
			this._character._skillLocked.splice(i, 1);
		}
		if (this._skill.speedLockD > 0) {
			var i = this._character._skillSpeedLock.indexOf(this._skill.id);
			this._character._skillSpeedLock.splice(i, 1);
			if (!this._character._skillSpeedLock.length > 0) {
				this._character._moveSpeed += this._character._subSpeed;
				this._character._subSpeed = 0;
			}
			this._skill.speedLockD = 0;
		}
		this._character._casting = false;
		this.onEnd();
	};

	Skill_Sequencer.prototype.onEnd = function () {
		this._skill.collider.kill = true;
		if (this._skill.newCollider) {
			ColliderManager.remove(this._skill.newCollider)
			this._skill.newCollider = null
		}
		if (this._skill.particle) {
			if (!this._skill.settings.endparticle) {
				this.particleOff(this._skill.particle);
			}
		}
		QABSManager.removePicture(this._skill.picture);
		QABSManager.removePicture(this._skill.trail);
		QABSManager.removePicture(this._skill.pictureCollider);

		var i = this._character._activeSkills.indexOf(this._skill);
		if (i > -1) this._character._activeSkills.splice(i, 1);
	};

	Skill_Sequencer.prototype.update = function () {
		if (this._skill.break) {
			return this.onBreak();
		} else if (this._skill.speedLockD > 0) {
			this._skill.speedLockD--;
			if (this._skill.speedLockD <= 0) {
				var i = this._character._skillSpeedLock.indexOf(this._skill.id);
				this._character._skillSpeedLock.splice(i, 1);
				if (!this._character._skillSpeedLock.length > 0) {
					this._character._moveSpeed += this._character._subSpeed;
					this._character._subSpeed = 0;
				}
				this._skill.speedLockD = 0;
			}
		}
		if (this._skill.moving) {
			this.updateSkillPosition();
		}
		if (this._skill.picture) {
			if (!this._skill.moving) this._skill.duration--;
			this._skill.picture.move(this._skill.collider.center.x, this._skill.collider.center.y);
			if (this._skill.picture.rotate > 0) this._skill.picture.rotation += this._skill.picture.rotate * this._skill.speed / 60;
			if (this._skill.picture.fadein) {
				//페이드가 있으면 페이드 인만큼 opacity 추가 후, 페이드 아웃만큼 opacity 감소한다. 
				if (this._skill.picture.opacity < 181)
					this._skill.picture.opacity += 181 / this._skill.picture.fadein;
				else if (this._skill.picture.fadeDuration > 0) {
					this._skill.picture.fadeDuration--;
				} else {
					this._skill.picture.fadein = -this._skill.picture.fadeout;
					this._skill.picture.opacity = 180;
				}
			} else if (this._skill.duration < this._skill.maxDuration / 10) {
				this._skill.picture.opacity -= 2550 / this._skill.maxDuration;
			}
		}
		if (!this.isWaiting()) {
			this.updateSequence();
		} else {
			this.updateWait();
		}
	};

	Skill_Sequencer.prototype.updateWait = function () {
		if (this._character._isDead) this.onEnd();   // 죽었을때 남은 스킬중 웨잇이 걸릴경우 없어지는걸 방지
		if (this._waitCount > 0) {
			this._waitCount--;
		}
		if (this._waitForUserMove && !this._character.isMoving()) {
			this._waitForUserMove = false;
		}
		if (this._waitForUserJump && !this._character.isJumping()) {
			this._waitForUserJump = false;
		}
		if (this._waitForUserPose && !this._character._posePlaying) {
			this._waitForUserPose = false;
		}
	};

	Skill_Sequencer.prototype.updateSequence = function () {

		var sequence = this._skill.sequence;
		while (sequence.length !== 0) {
			var action = QPlus.makeArgs(sequence.shift());
			this.startAction(action);
			if (this.isWaiting()) {
				break;
			}
		}
		if (this._skill.sequence.length === 0 && !this._skill.moving) {
			Terrax_ABS_blast_x.push(this._skill.collider.center.x - $gameMap.tileWidth() / 2);
			Terrax_ABS_blast_y.push(this._skill.collider.center.y - $gameMap.tileHeight() / 2);
			Terrax_ABS_blast.push(this._skill.settings.tx_onhit);
			Terrax_ABS_blast_duration.push(-1);
			Terrax_ABS_blast_fade.push(-1);
			Terrax_ABS_blast_grow.push(-1);
			Terrax_ABS_blast_mapid.push($gameMap.mapId());
			return this.onEnd();
		}
	};

	Skill_Sequencer.prototype.updateSkillDamage = function () {
		if (this._character == $gamePlayer && !this._firstEffect && this._skill.data.damage.type > 0) {
			this._firstEffect = true;
			if (this._character.battler().isWtypeEquipped(3) && this._character._aStack == this._character._aMaxStack) {
				if (!this._character.battler().isStateStackMax(97)) {
					var se = {};
					se.name = 'se_stack';
					se.pitch = 100;
					se.volume = 30;
					AudioManager.playSe(se);
				}
				this._character.battler().addState(97)
			}
		}
		var targets = this._skill.targets;
		for (var i = 0; i < this._skill.ondmg.length; i++) {
			var action = this._skill.ondmg[i].split(' ');
			this.startOnDamageAction(action, targets);
		}

		QABSManager.startAction(this._character, targets, this._skill);
	};


	//최적화 문제가 너무 안되어있다. updateSkillPosition이 가장 큰 문제 19.7ms
	// updateSkillPosition이 3%, canSkillMove가 1.9%, $gameMap,collisionMapPass가 2.3%, collisionMapCirclePass의 contains가 5.4%!!!!
	Skill_Sequencer.prototype.updateSkillPosition = function () {
		/*if (this._skill.waving) {
			return this.updateSkillWavePosition();
		}*/
		//var collider = this._skill.collider;
		if (this._skill.moving) {


			if (this._skill.withUser) {
				this._skill.collider.moveTo(this._skill.collider.x + this._skill.speedX + this._character.px - this._skill.withUser[0], this._skill.collider.y + this._skill.speedY + this._character.py - this._skill.withUser[1]); // 128ms. 왜 이렇게 많이드나? 해결책은 없나?
				this._skill.withUser[0] = this._character.px;
				this._skill.withUser[1] = this._character.py;
			} else {
				this._skill.collider.moveTo(this._skill.collider.x + this._skill.speedX, this._skill.collider.y + this._skill.speedY); // 128ms. 왜 이렇게 많이드나? 해결책은 없나?

            }
			if (this._skill.newCollider) {
				var prev = this._skill.newCollider.sectorEdge();
				this._skill.newCollider.moveTo(this._skill.collider.center.x, this._skill.collider.center.y)
				ColliderManager.updateGrid(this._skill.newCollider, prev)

			}
			if (this._skill.accelD > 0) {
				this._skill.speed += this._skill.accel;
				this._skill.speedX = this._skill.speed * Math.cos(this._skill.radian);
				this._skill.speedY = this._skill.speed * Math.sin(this._skill.radian);
				this._skill.accelD--;
			}
			if (this._skill.rotateD > 0) {
				this._skill.radian += this._skill.rotate;
				this._skill.speedX = this._skill.speed * Math.cos(this._skill.radian);
				this._skill.speedY = this._skill.speed * Math.sin(this._skill.radian);
				this.setSkillPictureRadian(this._skill.picture, this._skill.radian);
				this._skill.rotateD--;
			}
			if (this._skill.guidD > 0) {
				var playerX = $gamePlayer.cx();
				var playerY = $gamePlayer.cy();
				var colliderX = this._skill.collider.center.x;
				var colliderY = this._skill.collider.center.y;
				var toRadian = Math.atan2((playerY - colliderY), playerX - colliderX);
				toRadian += toRadian < 0 ? 2 * Math.PI : 0;
				var skillRad = this._skill.radian;
				var sat = Math.sin(this._skill.radian - toRadian);
				var sat2 = Math.cos(this._skill.radian - toRadian);
				var guidThreshold = this._skill.guidSpeed * Math.PI / 360;
				if (sat > 0 && sat2 < 1 - guidThreshold) {
					this._skill.radian -= this._skill.guidSpeed;
				} else if (sat <= 0 && sat2 < 1 - guidThreshold) {
					this._skill.radian += this._skill.guidSpeed;
				}
				this._skill.speedX = this._skill.speed * Math.cos(this._skill.radian);
				this._skill.speedY = this._skill.speed * Math.sin(this._skill.radian);
				this.setSkillPictureRadian(this._skill.picture, this._skill.radian);
				this._skill.guidSpeed -= this._skill.guidA;
				this._skill.guidD--;
			}
			if (this._skill.homingD > 0) {
				var playerX = this._skill.homingX;
				var playerY = this._skill.homingY;
				var colliderX = this._skill.collider.center.x;
				var colliderY = this._skill.collider.center.y;
				var toRadian = Math.atan2((playerY - colliderY), playerX - colliderX);
				toRadian += toRadian < 0 ? 2 * Math.PI : 0;
				var skillRad = this._skill.radian;
				var sat = Math.sin(this._skill.radian - toRadian);
				var sat2 = Math.cos(this._skill.radian - toRadian);
				var guidThreshold = this._skill.homingSpeed * Math.PI / 360;
				if (sat > 0 && sat2 < 1 - guidThreshold) {
					this._skill.radian -= this._skill.homingSpeed;
				} else if (sat <= 0 && sat2 < 1 - guidThreshold) {
					this._skill.radian += this._skill.homingSpeed;
				}
				this._skill.speedX = this._skill.speed * Math.cos(this._skill.radian);
				this._skill.speedY = this._skill.speed * Math.sin(this._skill.radian);
				this.setSkillPictureRadian(this._skill.picture, this._skill.radian);
				this._skill.homingSpeed -= this._skill.homingA;
				this._skill.homingD--;
			}
			Terrax_ABS_skill_x.push(this._skill.collider.center.x);
			Terrax_ABS_skill_y.push(this._skill.collider.center.y);
			Terrax_ABS_skill.push(this._skill.settings.tx_missle);
		}
		this._skill.duration--;
			if (!this.canSkillMove()) { // 162ms. can skillmove에서도 엄청 많이 먹는다. 나머지는 생각보다 많이 안먹음
				this._skill.targetsHit = [];
				this._skill.moving = false;
				this._waitForMove = false;
				this._waitCount = 0;
				if (this._skill.settings.endparticle) {
					if (this._skill.particle) this.particleOff(this.particle);
					this.particleOn(this._skill.settings.endparticle);
					this.particleUpdate(['rotate']);
				} else if (this._skill.particle) this.particleOff(this.particle);
		}
		if (!this._skill.duration) {
			if (this._character == $gamePlayer) {
				if (this._skill.data.stypeId == 1 && this._character.battler().isStateAffected(114)) this._character.battler().gainTp(2)
			}
			this._skill.targetsHit = [];
			this._skill.moving = false;
			this._waitForMove = false;
			this._waitCount = 0;
			if (this._skill.particle) this.particleOff(this.particle);
		}
	};

	Skill_Sequencer.prototype.updateSkillWavePosition = function () {
		var collider = this._skill.collider;
		var x1 = this._skill.xi;
		var y1 = this._skill.yi;
		var x2 = (this._skill.theta / this._skill.waveLength * this._skill.distance);
		var y2 = this._skill.amp * -Math.sin(this._skill.theta);
		var h = Math.sqrt(y2 * y2 + x2 * x2);
		var radian = Math.atan2(y2, x2);
		radian += this._skill.radian;
		var x3 = h * Math.cos(radian);
		var y3 = h * Math.sin(radian);
		collider.moveTo(x1 + x3, y1 + y3);
		var x4 = collider.center.x;
		var y4 = collider.center.y;
		if (this._skill.picture) {
			this._skill.picture.move(x4, y4);
		}
		if (!this.canSkillMove() || this._skill.theta >= this._skill.waveLength) {
			this._skill.targetsHit = [];
			this._skill.waving = false;
			this._skill.moving = false;
			this._waitForMove = false;
		}
		this._skill.theta += this._skill.waveSpeed;
	};

})();

//-----------------------------------------------------------------------------
// Game_Interpreter

(function () {
	var Alias_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
	Game_Interpreter.prototype.pluginCommand = function (command, args) {
		if (command.toLowerCase() === 'qabs') {
			return this.qABSCommand(QPlus.makeArgs(args));
		}
		Alias_Game_Interpreter_pluginCommand.call(this, command, args);
	};

	Game_Interpreter.prototype.qABSCommand = function (args) {
		var cmd = args.shift().toLowerCase();
		if (cmd === 'disable' || cmd === 'enable') {
			if (args.length === 0) {
				$gameSystem._absEnabled = cmd === 'enable';
			} else {
				for (var i = 0; i < args.length; i++) {
					var chara = QPlus.getCharacter(args[i]);
					if (chara.constructor === Game_Event) {
						var id = chara.eventId();
						var mapId = chara._mapId;
						if (cmd === 'enable') {
							$gameSystem.enableEnemy(mapId, id);
						} else {
							$gameSystem.disableEnemy(mapId, id);
						}
					}
				}
			}
			return;
		}
		if (cmd === 'override') {
			var key = Number(args.shift());
			var skillId = Number(args.shift());
			if (skillId === -1) {
				skillId = null;
			}
			$gameSystem.changeABSOverrideSkill(key, skillId);
			return;
		}
	};
})();

//-----------------------------------------------------------------------------
// Game_System

(function () {
	var Alias_Game_System_initialize = Game_System.prototype.initialize;
	Game_System.prototype.initialize = function () {
		Alias_Game_System_initialize.call(this);
		this._absKeys = QABS.getDefaultSkillKeys();
		this._absClassKeys = {};
		this._absWeaponKeys = {};
		this._absArmorKeys = {};
		this._absOverrideKeys = {};
		this._absEnabled = true;
		this._disabledEnemies = {};
		this._slotId = 0;
		this.checkAbsMouse();
		this.prgMapOpened = false;
	};

	Game_System.prototype.disableEnemy = function (mapId, eventId) {
		if (!this._disabledEnemies[mapId]) {
			this._disabledEnemies[mapId] = [];
		}
		this._disabledEnemies[mapId][eventId] = true;
	};

	Game_System.prototype.enableEnemy = function (mapId, eventId) {
		if (!this._disabledEnemies[mapId]) {
			this._disabledEnemies[mapId] = [];
		}
		this._disabledEnemies[mapId][eventId] = false;
	};

	Game_System.prototype.isDisabled = function (mapId, eventId) {
		if (!this._disabledEnemies[mapId]) {
			return false;
		}
		return this._disabledEnemies[mapId][eventId] || !this._absEnabled;
	};

	Game_System.prototype.loadClassABSKeys = function () {
		if (!$gameParty.leader()) return;
		var playerClass = $gameParty.leader().currentClass();
		var classKeys = /<skillKeys>([\s\S]*)<\/skillKeys>/i.exec(playerClass.note);
		if (classKeys && classKeys[1].trim() !== '') {
			this._absClassKeys = QABS.stringToSkillKeyObj(classKeys[1]);
			this.resetABSKeys();
		}
	};

	Game_System.prototype.resetABSKeys = function () {
		this._absKeys = QABS.getDefaultSkillKeys();
		for (var key in this._absKeys) {
			Object.assign(
				this._absKeys[key],
				this._absClassKeys[key] || {},
				this._absWeaponKeys[key] || {},
				this._absArmorKeys[key] || {},
				this._absOverrideKeys[key] || {}
			);
		}
		this.preloadAllSkills();
		this.checkAbsMouse();
		if (!this._slotId) this._slotId = 0;
	};

	Game_System.prototype.absKeys = function () {
		return this._absKeys;
	};
	Game_System.prototype.changeABSOverrideSkill = function (skillNumber, skillId, forced) {
		var absKeys = this.absKeys();
		var override = this._absOverrideKeys;
		if (!absKeys[skillNumber]) return;
		if (!forced && !absKeys[skillNumber].rebind) return;
		if (!override[skillNumber]) {
			override[skillNumber] = {};
		}
		if (skillId !== null) {
			if (skillId > 0 && skillNumber > 6) {
				for (var key = 7; key < 11; key++) {
					if (absKeys[key].skillId === skillId) {
						if (!override[key]) {
							override[key] = {};
						}
						override[key].skillId = override[skillNumber].skillId;
					}
				}
			}
			override[skillNumber].skillId = skillId;
		} else {
			delete override[skillNumber].skillId;
		}
		this.resetABSKeys();
		QABSSkillbar.requestIconUpdate = true;
	};

	Game_System.prototype.changeABSAddSkill = function (skillId, forced) {
		var absKeys = this.absKeys();
		var override = this._absOverrideKeys;
		//if (!absKeys[skillNumber]) return;
		//if (!forced && !absKeys[skillNumber].rebind) return;
		//if (!override[skillNumber]) {
		//  override[skillNumber] = {};
		//}
		if (skillId !== null) {
			if (skillId > 0) {
				for (var key = 3; key < 7; key++) {
					if (absKeys[key].skillId === skillId) {
						break;
					}
					if (!absKeys[key].skillId) {
						$gamePlayer.battler().learnSkill(skillId);
						override[key] = {};
						override[key].skillId = skillId;
						break;
					}
				}
			}

		}
		this.resetABSKeys();
	};

	Game_System.prototype.changeABSWeaponSkills = function (skillSet) {
		this._absWeaponKeys = skillSet;
		this.resetABSKeys();
	};

	Game_System.prototype.changeABSArmorSkills = function (skillSet) {
		this._absArmorKeys = skillSet;
		this.resetABSKeys();
	};

	Game_System.prototype.changeABSSkillInput = function (skillNumber, input) {
		var absKeys = this.absKeys();
		var override = this._absOverrideKeys;
		if (!absKeys[skillNumber]) return;
		if (!override[skillNumber]) {
			override[skillNumber] = {};
		}
		for (var key in absKeys) {
			var i = absKeys[key].input.indexOf(input);
			if (i !== -1) {
				if (!override[key]) {
					override[key] = {
						input: absKeys[key].input.clone()
					};
				}
				override[key].input.splice(i, 1);
				break;
			}
		}
		var i = /^\$/.test(input) ? 1 : 0;
		override[skillNumber].input[i] = input;
		this.checkAbsMouse();
	};

	Game_System.prototype.preloadAllSkills = function () {
		var absKeys = this.absKeys();
		for (var key in absKeys) {
			var skill = $dataSkills[absKeys[key].skillId];
			if (skill) QABSManager.preloadSkill(skill);
		}
	};

	Game_System.prototype.anyAbsMouse = function () {
		return this._absMouse1;
	};

	Game_System.prototype.anyAbsMouse2 = function () {
		return this._absMouse2;
	};

	Game_System.prototype.checkAbsMouse = function () {
		this._absMouse1 = false;
		this._absMouse2 = false;
		var keys = this.absKeys();
		for (var key in keys) {
			if (keys[key].input[0] === 'mouse1') {
				this._absMouse1 = true;
			}
			if (keys[key].input[0] === 'mouse2') {
				this._absMouse2 = true;
			}
		}
	};

	var Alias_Game_System_onBeforeSave = Game_System.prototype.onBeforeSave;
	Game_System.prototype.onBeforeSave = function () {
		Alias_Game_System_onBeforeSave.call(this);
		$gameMap.compressBattlers();
		QABS._needsUncompress = true;
	};

	var Alias_Game_System_onAfterLoad = Game_System.prototype.onAfterLoad;
	Game_System.prototype.onAfterLoad = function () {
		Alias_Game_System_onAfterLoad.call(this);
		QABS._needsUncompress = true;
	};
})();

//-----------------------------------------------------------------------------
// Game_Map

(function () {
	var Alias_Game_Map_setup = Game_Map.prototype.setup;
	Game_Map.prototype.setup = function (mapId) {
		Alias_Game_Map_setup.call(this, mapId);
		if (mapId !== QABSManager._mapId) {
			QABSManager.clear();
		}
	};

	var Alias_Game_Map_update = Game_Map.prototype.update;
	Game_Map.prototype.update = function (sceneActive) {
		Alias_Game_Map_update.call(this, sceneActive);
		if (QABS._needsUncompress) {
			this.uncompressBattlers();
			QABS._needsUncompress = false;
		}

		// Add Key Commands
		this._swapCooldown = 0;
		if (Input.isTriggered('1')) {
			var skillId = $gameSystem.absKeys()[7].skillId;
			if (skillId) {
				$gameSystem.changeABSOverrideSkill(6, skillId);
				$gameSystem._slotId = 7;
			}
		} else if (Input.isTriggered('2')) {
			var skillId = $gameSystem.absKeys()[8].skillId;
			if (skillId) {
				$gameSystem.changeABSOverrideSkill(6, skillId);
				$gameSystem._slotId = 8;
			}
		} else if (Input.isTriggered('3')) {
			var skillId = $gameSystem.absKeys()[9].skillId;
			if (skillId) {
				$gameSystem.changeABSOverrideSkill(6, skillId);
				$gameSystem._slotId = 9;
			}
		} else if (Input.isTriggered('4')) {
			var skillId = $gameSystem.absKeys()[10].skillId;
			if (skillId) {
				$gameSystem.changeABSOverrideSkill(6, skillId);
				$gameSystem._slotId = 10;
			}
		} else if (TouchInput._wheelY < 0) {
			if (!$gameSystem._prgMapOpened) {
				var slotId = $gameSystem._slotId + 1;
				if (slotId > 10) slotId = 10;
				else if (slotId < 7) slotId = 7;
				var skillId = $gameSystem.absKeys()[slotId].skillId;
				if (skillId) {
					$gameSystem.changeABSOverrideSkill(6, skillId);
					$gameSystem._slotId = slotId;
				}
			}
		}
		if (TouchInput._wheelY > 0) {
			if (!$gameSystem._prgMapOpened) {
				var slotId = $gameSystem._slotId - 1;
				if (slotId > 10) slotId = 10;
				else if (slotId < 7) slotId = 7;
				var skillId = $gameSystem.absKeys()[slotId].skillId;
				if (skillId) {
					$gameSystem.changeABSOverrideSkill(6, skillId);
					$gameSystem._slotId = slotId;
				}
			}
		}
			else if (Input.isTriggered('#r')) {
			if (this._swapCooldown <= 0) {
				
				$gamePlayer._cast = 0;
				$gameSystem._shud_visible = false;

				if ($gameParty.leader().weapons().length > 0) $gamePlayer._weapons[$gamePlayer._currentWeaponId] = $gameParty.leader().weapons()[0];
				$gamePlayer._currentWeaponId++;
				if ($gamePlayer._currentWeaponId >= $gamePlayer._weapons.length) $gamePlayer._currentWeaponId = 0;

				var slotId = 0;
				var item = $gamePlayer._weapons[$gamePlayer._currentWeaponId];

				if ($gameParty._inventory.indexOf(item) < 0 || item.durability <= 0) item = $gamePlayer._weapons[$gamePlayer._currentWeaponId] = null;

				$gameParty.leader().changeEquip(slotId, item);
				SoundManager.playSwapEquip(item);
				this._swapCooldown = 30;
			}
		} else if (Input.isTriggered('#esc')) {
			if (PKD_MI.isInventoryOpened()) {
				PKD_MI.closeInventory();
			} else if (!$gameSystem._prgMapOpened && !$gameScreen.picture(50)) {
				SceneManager.push(Scene_GameEnd);
			}
		} // else if (Input.isTriggered('#c')) PKD_MI.openOrCloseInventory();
		// else if (Input.isTriggered('#v')) SceneManager.push(Scene_Skill);
	};

	Game_Map.prototype.compressBattlers = function () {
		for (var i = 0; i < this.events().length; i++) {
			if (this.events()[i]._battler) {
				var oldRespawn = this.events()[i]._respawn;
				this.events()[i].clearABS();
				this.events()[i]._battler = null;
				this.events()[i]._respawn = oldRespawn;
			}
			if (this.events()[i].constructor === Game_Loot) {
				QABSManager.removePicture(this.events()[i]._itemIcon);
				QABSManager.removeEvent(this.events()[i]);
			}
		}
		$gamePlayer.clearABS();
		QABSManager.clear();
	};

	Game_Map.prototype.uncompressBattlers = function () {
		for (var i = 0; i < this.events().length; i++) {
			if (this.events()[i]._respawn >= 0) {
				var wasDead = true;
				var oldRespawn = this.events()[i]._respawn;
			}
			this.events()[i].setupBattler();
			if (wasDead) {
				this.events()[i].clearABS();
				this.events()[i]._battler = null;
				this.events()[i]._respawn = oldRespawn;
			}
		}
		// TODO setup player?
	};


})();

//-----------------------------------------------------------------------------
// Game_Action

function Game_ABSAction() {
	this.initialize.apply(this, arguments);
}

(function () {
	Game_ABSAction.prototype = Object.create(Game_Action.prototype);
	Game_ABSAction.prototype.constructor = Game_ABSAction;

	Game_ABSAction.prototype.setSubject = function (subject) {
		Game_Action.prototype.setSubject.call(this, subject);
		this._realSubject = subject;
	};

	Game_ABSAction.prototype.subject = function () {
		return this._realSubject;
	};

	Game_ABSAction.prototype.absApply = function (target) {
		var result = target.result();
		this._realSubject.clearResult();
		result.clear();
		result.physical = this.isPhysical();
		result.drain = this.isDrain();
		result.elementId = null;
		result.effective = null;
		if (this.item().damage.type > 0) {
			if ($gamePlayer._saintcritical) {
				if (this.subject() == $gamePlayer.battler()) {
					result.critical = (Math.random() < this.itemCri(target) + $gamePlayer._saintcriticalsum);
					if (!result.critical) $gamePlayer._saintcriticalsum += $gamePlayer._saintcritical;
					else {
						$gamePlayer._saintcriticalsum = 0;
						if ($gamePlayer._saintcritical > 0.15) $gamePlayer.battler().addState(285);
					}
				}
			} else result.critical = (Math.random() < this.itemCri(target));
			var value = this.makeDamageValue(target, result.critical);
			this.executeDamage(target, value);
			if (target == $gamePlayer.battler() && $gamePlayer.battler().isStateAffected(137)) $gamePlayer.battler().gainTp(100);
			/*if (this.item().damage.elementId > 1) */result.elementId = this.item().damage.elementId;
			if (target.elementRate(result.elementId) > 1) result.effective = 'strong';
			else if (target.elementRate(result.elementId) < 1) result.effective = 'weak';
			target.startDamagePopup();
		}
		this.item().effects.forEach(function (effect) {
			this.applyItemEffect(target, effect);
		}, this);
		this.applyItemUserEffect(target);
	};

	var Alias_Game_ActionResult_clear = Game_ActionResult.prototype.clear;
	Game_ActionResult.prototype.clear = function () {
		Alias_Game_ActionResult_clear.call(this);
		this.damageIcon = null;
	};
})();

//-----------------------------------------------------------------------------
// Game_BattlerBase

(function () {
	var Alias_Game_BattlerBase_resetStateCounts = Game_BattlerBase.prototype.resetStateCounts;
	Game_BattlerBase.prototype.resetStateCounts = function (stateId) {
		Alias_Game_BattlerBase_resetStateCounts.call(this, stateId);
		this._stateSteps[stateId] = $dataStates[stateId].stepsToRemove || 0;
	};

	var Alias_Game_BattlerBase_addNewState = Game_BattlerBase.prototype.addNewState;
	Game_BattlerBase.prototype.addNewState = function (stateId) {
		Alias_Game_BattlerBase_addNewState.call(this, stateId);
		this.addStateParams(stateId);
		if ($dataStates[stateId].meta.avoid) {
			this._isAvoid = true;
		}
		if ($dataStates[stateId].meta.moveSpeed) {
			this._moveSpeed = (this._moveSpeed*10 + Number($dataStates[stateId].meta.moveSpeed)*10)/10 || 0;
		}
		if ($dataStates[stateId].meta.stun == true) {
			this._isStunned++;
			var character = $gameMap.event(this._charaId)
			if (character._moveRoute) character._moveRoute.list = [];
			character.clearPose();

			var i = -1;
			character._activeSkills.forEach(function (skill, index) {
				if (!skill.forced) return i = index;
			});
			if (i > -1 && !character._activeSkills[i].forced) {
				character._activeSkills[i].break = true;
			}
			//character.playPose('hit', true, true, true, true);
		}
		if ($dataStates[stateId].meta.groggy == true) {
			this._isGroggy++;
			var character = $gameMap.event(this._charaId)
			//character.playPose('hit', true, true, true, true);
		}
		if ($dataStates[stateId].meta.bound == true) {
			this._bound = true;
			this._isBounded++;
		}
		if ($dataStates[stateId].meta.freeze == true) {
			this._freeze = true;
			var character = $gameMap.event(this._charaId)
			character._freeze = true;
		}
		if ($dataStates[stateId].meta.rumble == true) {
			Rumble(0.8, 0, 200);
		}
		if ($dataStates[stateId].meta.recoveryHp == true) {
			this.gainHp(this.mhp)
		}
		if ($dataStates[stateId].meta.tripleshot == true) {
			if (this == $gamePlayer.battler() && !$gamePlayer._tripleShot.contains(stateId)) $gamePlayer._tripleShot.push(stateId);
		}
		if ($dataStates[stateId].meta.avoidshot) {
			if (this == $gamePlayer.battler() && !$gamePlayer._avoidshot.contains(stateId)) $gamePlayer._avoidshot.push(stateId);
		}
		if ($dataStates[stateId].meta.witchskillreduce) {
			if (this == $gamePlayer.battler()) $gamePlayer._witchskillreduce = Number($dataStates[stateId].meta.witchskillreduce)
		}
		if ($dataStates[stateId].meta.saintcritical) {
			if (this == $gamePlayer.battler()) $gamePlayer._saintcritical = Number($dataStates[stateId].meta.saintcritical);
		}
		if ($dataStates[stateId].meta.killstates) {
			this._killStates.push(Number($dataStates[stateId].meta.killstates));
		}
		//console.log(QParams.stringToParamsObj($dataStates[stateId].qmeta['params']))
		var paramChange = $dataStates[stateId].qmeta['params'];
		if (paramChange) paramChange = paramChange.replace(/(\s*)/g, "").split('\n')[0];
		if (paramChange) {
			var index = paramChange.indexOf('mhp')
			if (index >= 0) this._hp += Number(paramChange.substr(index + 4, 1))
			var index = paramChange.indexOf('mmp')
			if (index >= 0) this._mp += Number(paramChange.substr(index + 4, 1))
		}
		//회피스킬 임시로 사용 안함 
        /*        if ($dataStates[stateId].meta.avoid) {
                    var weaponId = this.weapons()[0].id > 3000 ? this.weapons()[0].baseItemId : this.weapons()[0].id;
                    var avoidSkill = QABS._weaponSkills[weaponId][10] ? QABS._weaponSkills[weaponId][10].skillId : false;
                    if (avoidSkill) {
                        QABS._weaponSkills[weaponId][10].skillId = QABS._weaponSkills[weaponId][1].skillId;
                        QABS._weaponSkills[weaponId][1].skillId = avoidSkill;
                        $gameSystem.resetABSKeys()
                        //$gameSystem.preloadSkills();
                    }
                }*/
		if (this == $gamePlayer.battler()) {
			var newState = {};
			if ($dataStates[stateId].meta.buff) {
				newState = { category: 'buff', state: $dataStates[stateId] };
			} else if ($dataStates[stateId].meta.debuff) {
				newState = { category: 'debuff', state: $dataStates[stateId] };
			} else if (stateId > 100) {
				newState = { category: 'ability', state: $dataStates[stateId] };
				if ($dataStates[stateId].qmeta.params.indexOf('ivs') > 0)
					PKD_MI.refreshInventory();
			} else return;
			$gameSystem._ahud_newState.push(newState);
			QABSSkillbar.requestIconUpdate = true;
		}
	};
})();

Game_Battler.prototype.isStateAddable = function (stateId) {
	return (this.isAlive() && $dataStates[stateId] &&
		!this.isStateResist(stateId) &&
		!this.isStateRestrict(stateId));
};

Game_BattlerBase.prototype.maxTp = function () {
	return this.mtp;
};

Game_BattlerBase.prototype.refresh = function () {
	this.stateResistSet().forEach(function (stateId) {
		this.eraseState(stateId);
	}, this);
	this._hp = this._hp.clamp(0, this.mhp);
	this._mp = this._mp.clamp(0, this.mmp);
	this._tp = this._tp.clamp(0, this.maxTp()*this.tpr);
};

//-----------------------------------------------------------------------------
// Game_Battler

(function () {
	var Alias_Game_Battler_initMembers = Game_Battler.prototype.initMembers;
	Game_Battler.prototype.initMembers = function () {
		Alias_Game_Battler_initMembers.call(this);
		this._isAvoid = false;
		this._isStunned = 0;
		this._isGroggy = 0;
		this._moveSpeed = 0.1;
		this._damageQueue = [];
		this._isLoopStateChanged = false;
	};

	var Alias_Game_Battler_startDamagePopup = Game_Battler.prototype.startDamagePopup;
	Game_Battler.prototype.startDamagePopup = function () {
		this._damageQueue.push(Object.assign({}, this._result));
		Alias_Game_Battler_startDamagePopup.call(this);
	};

	Game_Battler.prototype.updateABS = function () {
		var states = this.states();
		for (var i = 0; i < states.length; i++) {
			this.updateStateSteps(states[i]);
		}
		//this.showAddedStates();   //Currently does nothing, so no need to run it
		//this.showRemovedStates(); //Currently does nothing, so no need to run it
	};

	Game_Battler.prototype.stepsForTurn = function () {
		return 60;
	};

	Game_Battler.prototype.updateStateSteps = function (state) {
		if (!state.removeByWalking) return;
		if (this._stateSteps[state.id] >= 0) {
			if (this._stateSteps[state.id] % this.stepsForTurn() === 0) {
				this.onTurnEnd();
				if (state.qmeta.hpDamage) this.gainHp(Number(Math.round(state.qmeta.hpDamage * $gamePlayer.battler().mat)));
				this.result().damageIcon = $dataStates[state.id].iconIndex;
				this.startDamagePopup();
				if (this._stateSteps[state.id] === 0) this.removeState(state.id);
			}
			this._stateSteps[state.id]--;
		}
	};

	Game_Battler.prototype.showAddedStates = function () {
		// TODO
		this.result().addedStateObjects().forEach(function (state) {
			// does nothing
		}, this);
	};

	Game_Battler.prototype.showRemovedStates = function () {
		// TODO
		this.result().removedStateObjects().forEach(function (state) {
			// Popup that state was removed?
		}, this);
	};

	var Alias_Game_Battler_removeState = Game_Battler.prototype.removeState;
	Game_Battler.prototype.removeState = function (stateId) {
		if (this.isStateAffected(stateId)) {
			this.removeStateParams(stateId);
			if ($dataStates[stateId].meta.avoid) {
				this._isAvoid = false;
			}
			if ($dataStates[stateId].meta.moveSpeed) {
				this._moveSpeed = (this._moveSpeed * 10 - Number($dataStates[stateId].meta.moveSpeed) * 10) / 10 || 0;
			}
			if ($dataStates[stateId].meta.stun == true) {
				this._isStunned--;
			}
			if ($dataStates[stateId].meta.groggy == true) {
				this._isGroggy--;
			}
			if ($dataStates[stateId].meta.bound == true) {
				this._bound = false;
				this._isBounded--;
			}
			if ($dataStates[stateId].meta.freeze == true) {
				$gameMap.event(this._charaId)._freeze = false;
			}
			if ($dataStates[stateId].meta.tripleshot == true) {
				if (this == $gamePlayer.battler() && $gamePlayer._tripleShot.contains(stateId)) {
					var index = $gamePlayer._tripleShot.indexOf(stateId);
					$gamePlayer._tripleShot.splice(index, 1);
				}
			}
			if ($dataStates[stateId].meta.avoidshot) {
				if (this == $gamePlayer.battler() && $gamePlayer._avoidshot.contains(stateId)) {
					var index = $gamePlayer._avoidshot.indexOf(stateId);
					$gamePlayer._avoidshot.splice(index, 1);
				}
			}
			if ($dataStates[stateId].meta.witchskillreduce) {
				if (this == $gamePlayer.battler() && $gamePlayer._witchskillreduce) {
					$gamePlayer._witchskillreduce = 0;
				}
			}
			if ($dataStates[stateId].meta.saintcritical) {
				if (this == $gamePlayer.battler() && $gamePlayer._saintcritical) {
					$gamePlayer._saintcritical = 0;
					$gamePlayer._saintcriticalsum = 0;
				}
			}
			if ($dataStates[stateId].meta.killstates) {
				var index = this._killStates.indexOf(Number($dataStates[stateId].meta.killstates))
				if (index > -1) this._killStates.splice(index, 1);
			}
			if (this == $gamePlayer.battler()) {
				if ($dataStates[stateId].meta.buff) {
					var index = this._stateBuffs.indexOf(stateId)
					this._stateBuffs.splice(index, 1);
				} else if ($dataStates[stateId].meta.debuff) {
					var index = this._stateDebuffs.indexOf(stateId)
					this._stateDebuffs.splice(index, 1);
				} else if (stateId > 100) {
					var index = this._abilities.indexOf(stateId)
					this._abilities.splice(index, 1);
				}
				QABSSkillbar.requestIconUpdate = true;
			}
            /*
            if ($dataStates[stateId].meta.avoid) {
                var weaponId = this.weapons()[0].id > 3000 ? this.weapons()[0].baseItemId : this.weapons()[0].id;
                var oldSkill = QABS._weaponSkills[weaponId][10] ? QABS._weaponSkills[weaponId][10].skillId : false;
                if (oldSkill) {
                    QABS._weaponSkills[weaponId][10].skillId = QABS._weaponSkills[weaponId][1].skillId;
                    QABS._weaponSkills[weaponId][1].skillId = oldSkill;
                    $gameSystem.resetABSKeys()
                   // $gameSystem.preloadSkills();
                }
            }*/
			Alias_Game_Battler_removeState.call(this, stateId);
			if ($dataStates[stateId].qmeta.stackparams) {
				$dataStates[stateId].qmeta.stackparams.split('\n').forEach(function (effect) {
					var effect = effect.replace(" ", "").split(':');
					if (effect[0].toLowerCase()  == 'tripleshot' && $gamePlayer._tripleShot.contains(stateId)) {
						var index = $gamePlayer._tripleShot.indexOf(stateId);
						$gamePlayer._tripleShot.splice(index, 1);
					}
					if (effect[0].toLowerCase() == 'stat' && effect[2]) {
						$gamePlayer.battler().removeState(Number(effect[2]));
					}
				});
			}
		}
	};

	Game_Battler.prototype.isAvoid = function () {
		return this._isAvoid;
	};
	Game_Battler.prototype.moveSpeed = function () {
		return this._moveSpeed;
	};

	Game_Battler.prototype.isStunned = function () {
		return this._isStunned > 0;
	};
	Game_Battler.prototype.isGroggy = function () {
		return this._isGroggy > 0;
	};
})();

//-----------------------------------------------------------------------------
// Game_Actor

(function () {
	var Alias_Game_Actor_setup = Game_Actor.prototype.setup;
	Game_Actor.prototype.setup = function (actorId) {
		Alias_Game_Actor_setup.call(this, actorId);
		var meta = this.actor().qmeta;
		this._popupOY = Number(meta.popupOY) || 0;
	};

	var Alias_Game_Actor_changeClass = Game_Actor.prototype.changeClass;
	Game_Actor.prototype.changeClass = function (classId, keepExp) {
		Alias_Game_Actor_changeClass.call(this, classId, keepExp);
		if (this === $gameParty.leader()) $gameSystem.loadClassABSKeys();
	};

	Game_Actor.prototype.initWeaponSkills = function () {
		var equips = this._equips;
		for (var i = 0; i < equips.length; i++) {
			if (equips[i].object()) {
				var equipId = equips[i].object().baseItemId || equips[i].object().id;
				if (equips[i].isWeapon() && equipId) {
					this.changeWeaponSkill(equipId);
				}
			}
		}
	};

	Game_Actor.prototype.initArmorSkills = function () {
		var equips = this._equips;
		for (var i = 0; i < equips.length; i++) {
			if (equips[i].object()) {
				var equipId = equips[i].object().baseItemId || equips[i].object().id;
				if (equips[i].isArmor() && equipId) {
					this.changeArmorSkill(equipId);
				}
			}
		}
	};

	var Alias_Game_Actor_changeEquip = Game_Actor.prototype.changeEquip;
	Game_Actor.prototype.changeEquip = function (slotId, item) {
		if (this !== $gameParty.leader()) {
			return Alias_Game_Actor_changeEquip.call(this, slotId, item);
		}
		var equips = this._equips;
		var oldId, newId = 0;
		var wasWeapon, wasArmor;
		if (equips[slotId] && equips[slotId].object()) {
			oldId = equips[slotId].object().baseItemId || equips[slotId].object().id;
			wasWeapon = equips[slotId].isWeapon();
			wasArmor = equips[slotId].isArmor();
		}
		Alias_Game_Actor_changeEquip.call(this, slotId, item);
		if (equips[slotId] && equips[slotId].object()) {
			newId = equips[slotId].object().baseItemId || equips[slotId].object().id;
		}
		if (newId && equips[slotId].isWeapon()) {
			this.changeWeaponSkill(newId);
			this.changeWeaponEffect(newId, true);
			if (oldId) {
				this.changeWeaponEffect(oldId, false);
			}
		} else if (wasWeapon) {
			this.changeWeaponSkill(0);
			this.changeWeaponEffect(oldId, false);
		}
		//변경 : 방어구 변경때 체인지 아머 이펙트
		if (newId !== oldId && this._equips[slotId].isArmor()) {
			this.changeArmorEffect(newId, true);
			if (slotId == 4) this.changeArmorSkill(newId);
			if (oldId) this.changeArmorEffect(oldId, false);
		} else if (wasArmor) {
			this.changeArmorEffect(oldId, false);
			if (slotId == 4) this.changeArmorSkill(0);
		}
		// $stvArmorSets.check();
	};

	Game_Actor.prototype.changeWeaponSkill = function (id) {
		if (this !== $gameParty.leader()) return;
		var weaponSkills;
		if (!$dataWeapons[id]) {
			weaponSkills = {};
		} else {
			weaponSkills = QABS.weaponSkills(id);
		}
		$gameSystem.changeABSWeaponSkills(weaponSkills);
	};

	//변경 : 체인지아머스킬 추가
	Game_Actor.prototype.changeArmorEffect = function (id, equip) {
		var note = $dataArmors[id].note;
		var effect = /<effect>([\s\S]*)<\/effect>/i.exec(note);
		if (effect) {
			var effect = effect[1].split('\n');//shift();
			var actions = [];
			var action;
			for (var i = 0; i < effect.length; i++) {
				if (effect[i] !== "") {
					actions = QPlus.stringToAry(effect[i], true);
					action = actions[0].split(' ');
					if (action[0].toLowerCase() == "movespeed") this.ArmorEffect(action, equip);
				}
			}
		}
	};

	Game_Actor.prototype.changeWeaponEffect = function (id, equip) {
		var note = $dataWeapons[id].note;
		var effect = /<effect>([\s\S]*)<\/effect>/i.exec(note);
		if (effect) {
			var effect = effect[1].split('\n');//shift();
			var actions = [];
			var action;
			for (var i = 0; i < effect.length; i++) {
				if (effect[i] !== "") {
					actions = QPlus.stringToAry(effect[i], true);
					action = actions[0].split(' ');
					if (action[0].toLowerCase() == "movespeed") this.ArmorEffect(action, equip);
				}
			}
		}
	};

	Game_Actor.prototype.ArmorEffect = function (action, equip) {
		var player = $gamePlayer
		//switch (action[0].toLowerCase()) {
		//	case "movespeed":
		var amt = Number(action[1]) || 0;
		this._moveSpeed = equip ? (this._moveSpeed * 10 + amt * 10) / 10 : (this._moveSpeed * 10 - amt * 10) / 10;
		return;
	};

	Game_Actor.prototype.changeArmorSkill = function (id) {
		if (this !== $gameParty.leader()) return;
		var armorSkills;
		if (!$dataArmors[id]) {
			armorSkills = {};
		} else {
			armorSkills = QABS.armorSkills(id);
		}
		$gameSystem.changeABSArmorSkills(armorSkills);
	};

	Game_Actor.prototype.displayLevelUp = function (newSkills) {
		QABSManager.startPopup('QABS-LEVEL', {
			x: $gamePlayer.cx(),
			y: $gamePlayer.cy(),
			string: 'Level Up!'
		})
		$gamePlayer.requestAnimation(QABS.levelAnimation);
	};

	Game_Actor.prototype.onPlayerWalk = function () {
		this.clearResult();
		this.checkFloorEffect();
	};

	Game_Actor.prototype.updateStateSteps = function (state) {
		Game_Battler.prototype.updateStateSteps.call(this, state);
	};

	Game_Actor.prototype.showAddedStates = function () {
		Game_Battler.prototype.showAddedStates.call(this);
	};

	Game_Actor.prototype.showRemovedStates = function () {
		Game_Battler.prototype.showRemovedStates.call(this);
	};

	Game_Actor.prototype.resetStateCounts = function (stateId) {
		Game_Battler.prototype.resetStateCounts.call(this, stateId);
	};

	Game_Actor.prototype.stepsForTurn = function () {
		return Game_Battler.prototype.stepsForTurn.call(this);
	};
})();

//-----------------------------------------------------------------------------
// Game_Enemy

(function () {
	var Alias_Game_Enemy_setup = Game_Enemy.prototype.setup;
	Game_Enemy.prototype.setup = function (enemyId, x, y) {
		Alias_Game_Enemy_setup.call(this, enemyId, x, y);
		var meta = this.enemy().qmeta;
		this._aiType = (meta.AIType || 'simple').toLowerCase();
		this._aiRange = Number(meta.range) || 0;
		this._noPopup = !!meta.noPopup;
		this._popupOY = Number(meta.popupOY) || 0;
		this._onDeath = meta.onDeath || '';
		this._onAgro = meta.onAgro || '';
		this._dontErase = !!meta.dontErase;
		this._team = Number(meta.team || 2);
		this._moveSpeed = Number(meta.movespeed || 0);
		this._noKnock = meta.noKnock || false;///<noknock>/i.test(notes);
		this._noMove = meta.noMove;///<nomove>/i.test(notes);
		this._noTransit = meta.noTransit || false;///<noknock>/i.test(notes);
		this._bound = false;
		this._freeze = false;
	};

	Game_Enemy.prototype.clearStates = function () {
		Game_Battler.prototype.clearStates.call(this);
		this._stateSteps = {};
	};

	Game_Enemy.prototype.eraseState = function (stateId) {
		Game_Battler.prototype.eraseState.call(this, stateId);
		delete this._stateSteps[stateId];
	};
})();

//-----------------------------------------------------------------------------
// Game_CharacterAgro

function Game_CharacterAgro() {
	this.initialize.apply(this, arguments);
}

(function () {
	Game_CharacterAgro.agroTimer = 300;

	Game_CharacterAgro.prototype.initialize = function (charaId) {
		this._charaId = charaId;
		this.clear();
	};

	Game_CharacterAgro.prototype.clear = function () {
		this._agrod = 0;
		this._points = {};
		this._tick = {};
		this._total = 0;
		this._highest = null;
		this._recalcHighest = false;
	};

	Game_CharacterAgro.prototype.has = function (charaId) {
		return !!this._points[charaId];
	};

	Game_CharacterAgro.prototype.inCombat = function () {
		return this._agrod > 0 || this._total > 0;
	};

	Game_CharacterAgro.prototype.character = function () {
		return QPlus.getCharacter(this._charaId) || null;
	};

	Game_CharacterAgro.prototype.highest = function () {
		if (this._recalcHighest) {
			this.calcHighest();
		}
		return this._highest;
	};

	Game_CharacterAgro.prototype.add = function (charaId, amount) {
		this._points[charaId] = this._points[charaId] ? this._points[charaId] + amount : amount;
		this._tick[charaId] = Game_CharacterAgro.agroTimer;
		var points = this._points[charaId];
		this._total += amount;
		this._recalcHighest = true;
	};

	Game_CharacterAgro.prototype.remove = function (charaId) {
		this._total -= this._points[charaId] || 0;
		delete this._points[charaId];
		delete this._tick[charaId];
		this._recalcHighest = true;
	};

	Game_CharacterAgro.prototype.placeInCombat = function () {
		this._agro = Game_CharacterAgro.agroTimer;
	};

	Game_CharacterAgro.prototype.calcHighest = function () {
		var highest = 0;
		var highestId = null;
		for (var charaId in this._points) {
			if (this._points[charaId] > highest) {
				highest = this._points[charaId];
				highestId = charaId;
			}
		}
		this._highest = highestId ? QPlus.getCharacter(highestId) : null;
		this._recalcHighest = false;
	};

	Game_CharacterAgro.prototype.update = function () {
		for (var charaId in this._tick) {
			this._tick[charaId] = this._tick[charaId] - 1;
			if (this._tick[charaId] === 0) {
				this.remove(charaId);
			}
		}
		if (this._agro > 0) this._agro--;
	};

})();
//-----------------------------------------------------------------------------
// Game_CharacterBase

(function () {
	Game_CharacterBase.prototype.battler = function () {
		return null;
	};

	Game_CharacterBase.prototype.clearABS = function () {
		if (this._activeSkills && this._activeSkills.length > 0) {
			this.clearSkills();
		}
		this.clearAgro();
		this._activeSkills = [];
		this._skillCooldowns = {};
		this._casting = null;
		this._casted = null;
		this._cast = 0;
		this._castS = 0;
		this._castTimer = 0;
		this._maxCast = 80;
		this._invincible = false;
		this._invincibleSkills = [];
		this._avoid = false;
		this._reduceCooldown = 0;
		this._skillLocked = [];
		this._skillSpeedLock = [];
		this._subSpeed = 0;
		this._transit = [];
		this._aStack = 0;
		this._aStackD = 0;
		this._aMaxStack = 5;
		this._parryStack = 0;
		this._parrySePlayed = false;
	};

	Game_CharacterBase.prototype.deathClearABS = function () {
		this.clearAgro();
		this._skillCooldowns = {};
		this._casting = null;
		this._invincible = false;
		this._avoid = false;
		this._maxCast = 80;
		this._skillLocked = [];
	};

	Game_CharacterBase.prototype.clearSkills = function () {
		for (var i = this._activeSkills.length - 1; i >= 0; i--) {
			var skill = this._activeSkills[i];
			QABSManager.removePicture(skill.picture);
			QABSManager.removePicture(skill.trail);
			QABSManager.removePicture(skill.pictureCollider);
			if (skill.particle && !skill.settings.endparticle) {
				JavaHut.particleOff(skill)
				QABSManager.removeParticle(skill);
			}
			this._activeSkills.splice(i, 1);
		}
	};

	Game_CharacterBase.prototype.team = function () {
		return 0;
	};

	Game_CharacterBase.prototype.isFriendly = function (target) {
		return target.team() === this.team();
	};

	Game_CharacterBase.prototype.inCombat = function () {
		if (!this.battler()) return false;
		return this._inCombat;
	};

	Game_CharacterBase.prototype.isCasting = function () {
		if (this._casting) {
			if (this._casting.break) {
				this._casting = null;
				return false;
			}
			return true;
		}
		return false;
	};

	var Alias_Game_CharacterBase_canMove = Game_CharacterBase.prototype.canMove;
	Game_CharacterBase.prototype.canMove = function () {
		if (this.battler()) {
			if (this._skillLocked.length > 0) return false;
			if (this.battler().isStunned()) return false;
			if (this.battler().isGroggy()) return false;
			if (this.battler().isDead()) return false;
		}
		if (this.realMoveSpeed() <= 0) return false;
		return Alias_Game_CharacterBase_canMove.call(this);
	};

	Game_CharacterBase.prototype.canInputSkill = function (fromEvent) {
		if (this._globalLocked > 0) return false;
		if (!fromEvent && $gameMap.isEventRunning()) return false;
		if (!$gameSystem._absEnabled) return false;
		if ($gameSwitches._data[10]) return false;
		if (!this.battler()) return false;
		if (this.battler().isDead()) return false;
		if (this.battler().isStunned()) return false;
		if (this.isCasting()) return false;
		if (this._skillLocked.length > 0) return false;
		if ($gameSystem._prgMapOpened) return false;
		return true;
	};

	Game_CharacterBase.prototype.canUseSkill = function (id = 616) {
		var skill = $dataSkills[id];
		// console.log(skill, 'skill')
		if (skill) {
			// console.log(this.usableSkills(), 'useable')
			// console.log(this.usableSkills().contains(id), 'skill1')
			// console.log(this.battler().canPaySkillCost(skill), 'skill2')
			// console.log(this.usableSkills().contains(id) && this.battler().canPaySkillCost(skill), 'skill3')
		}
		//return this.battler().canPaySkillCost(skill);
		return this.usableSkills().contains(id) && this.battler().canPaySkillCost(skill);
	};

	Game_CharacterBase.prototype.usableSkills = function () {
		return [];
	};

	var Alias_Game_CharacterBase_realMoveSpeed = Game_CharacterBase.prototype.realMoveSpeed;
	Game_CharacterBase.prototype.realMoveSpeed = function () {
		var value = Alias_Game_CharacterBase_realMoveSpeed.call(this);
		if (this.battler()) {
			value += this.battler().moveSpeed() * this.battler().msp; //54ms. 많이걸린다 과부하
		}
		return value;
	};

	Game_CharacterBase.prototype.inCombat = function () {
		if (!this._agro) return false;
		return this._agro.inCombat();
	};

	Game_CharacterBase.prototype.addAgro = function (from, skill) {
		var chara = QPlus.getCharacter(from);
		if (!chara || chara === this || !chara._agro) {
			return;
		}
		if (this.isFriendly(chara) || !this._agro) {
			return;
		}
		var amt = skill ? skill.agroPoints || 1 : 1;
		this._agro.add(from, amt);
	};

	Game_CharacterBase.prototype.removeAgro = function (from) {
		if (!this._agro) {
			return;
		}
		this._agro.remove(from);
	};

	Game_CharacterBase.prototype.clearAgro = function () {
		if (this._agro) {
			var agrod = this._agro._agrodList;
			for (var charaId in agrod) {
				var chara = QPlus.getCharacter(charaId);
				if (chara) chara.removeAgro(this.charaId());
			}
			this._agro.clear();
		} else {
			this._agro = new Game_CharacterAgro(this.charaId());
		}
	};

	Game_CharacterBase.prototype.bestTarget = function () {
		if (!this._agro) {
			return null;
		}
		return this._agro.highest();
	};

	var Alias_Game_CharacterBase_update = Game_CharacterBase.prototype.update;
	Game_CharacterBase.prototype.update = function () {
		if (this._globalLocked) return;
		if (this._isDead) {
			if (this._activeSkills.length > 0) this.updateSkills();
			return;
		}

		if (this._freeze) {
			if (this.battler() && $gameSystem._absEnabled) this.updateABS();
			if (this.battler()._stateSteps[21] < 45 && this._shakeData[0] <= 0) {
				this._shakeData[0] = 45;
				this._shakeData[3] = 2;
			}
			return;
		}
		// 타임스탑중엔 파티클이펙트 업데이트 안되게 변경 애니메이션이랑 화면 색조 추가하면 완성
		//이벤트 진행중에 abs 업데이트 하지않게 
		if ($gameTemp._timeStop) {
			var timeStop = $gameTemp._timeStop;
			if (this == $gamePlayer) {
				timeStop[1]++; // 0 + 1 = 1
				// This is for Cast Channeling [casting: 10 means 10 seconds [Skill ID: 336 timestop]]
				// timeStop[1] < 10 (10 is the seconds before the stop happens)
				if (timeStop[1] < 10) { // 0 < 10
					if (timeStop[1] >= timeStop[2]) { // 0 >= 3
						timeStop[1] = 0;
						timeStop[2]++;
						timeStop[3] = true;
					} else timeStop[3] = false;
				} else {
					$gameMap.createFilter('test1', 'oldfilm', 0);
					$gameMap.setFilter('test1')
					timeStop[3] = true;
				}
				if (timeStop[1] >= timeStop[0]) {
					$gameMap.eraseFilter('test1')
					$gameTemp._timeStop = null;
				}
			} else if (timeStop[3] == true) {
				return;
			}
		}
		Alias_Game_CharacterBase_update.call(this);
		if (this.battler() && $gameSystem._absEnabled) this.updateABS();
	};

	Game_CharacterBase.prototype.updateABS = function () {
		this.updateSkills();
		if (this.battler().isDead()) {
			if (!this._isDead) {
				this.onDeath();
			}
			return;
		}
		this._agro.update();
		this.battler().updateABS();
	};

	Game_CharacterBase.prototype.onDeath = function () {
		// Placeholder method, overwritten in Game_Player and Game_Event
	};

	Game_CharacterBase.prototype.updateSkills = function () {
		if (this._groundTargeting) this.updateTargeting();
		if (this._activeSkills.length > 0) {
			this.updateSkillSequence();
		}
		this.updateSkillCooldowns();
	};

	Game_CharacterBase.prototype.updateTargeting = function () {
		return this.onTargetingEnd();
	};

	Game_CharacterBase.prototype.updateSkillSequence = function () {
		for (var i = this._activeSkills.length - 1; i >= 0; i--) {
			this._activeSkills[i].sequencer.update();
		}
	};

	Game_CharacterBase.prototype.updateSkillCooldowns = function () {
		for (var id in this._skillCooldowns) {
			if (this._skillCooldowns[id] <= 0) {
				delete this._skillCooldowns[id];
			} else {
				this._skillCooldowns[id]--;
			}
		}
	};

	Game_CharacterBase.prototype.onTargetingEnd = function () {
		var skill = this._groundTargeting;
		this.battler().paySkillCost(skill.data);
		this._activeSkills.push(skill);
		this._skillCooldowns[skill.id] = skill.settings.cooldown;
		ColliderManager.draw(skill.collider, skill.sequence.length + 60);
		this.onTargetingCancel();
	};

	Game_CharacterBase.prototype.onTargetingCancel = function () {
		QABSManager.removePicture(this._groundTargeting.picture);
		this._groundTargeting.targeting.kill = true;
		this._groundTargeting = null;
		this._selectTargeting = null;
	};

	Game_CharacterBase.prototype.useSkill = function (skillId, fromEvent) {
		if (this.isJumping()) return null;
		if (!this.canInputSkill(fromEvent)) return null;
		if (!this.canUseSkill(skillId)) return null;
		if (this._groundTargeting) {
			this.onTargetingCancel();
		}
		var skill = this.forceSkill(skillId);
		if (!this._groundTargeting) {
			this.battler().paySkillCost($dataSkills[skillId]);
		}
		return skill;
	};

	Game_CharacterBase.prototype.beforeSkill = function (skill) {
		// Runs before the skills sequence and collider are made
		var before = skill.data.qmeta.beforeSkill || '';
		if (before !== '') {
			try {
				eval(before);
			} catch (e) {
				console.error('Error with `beforeSkill` meta inside skill ' + skill.data.id, e);
			}
		}
	};

	Game_CharacterBase.prototype.forceSkill = function (skillId, forced, independent) {
		if (!this.battler() || this._freeze) return;
		var skill = this.makeSkill(skillId, forced, independent);
		if (skill.settings.groundTarget || skill.settings.selectTarget) {
			return this.makeTargetingSkill(skill);
		}
		this._activeSkills.push(skill);
		if (skill.data.stypeId == 0) this._skillCooldowns[skillId] = skill.settings.cooldown;
		else if (skill.data.stypeId == 1) {
			this._tpTimer = 50 * (1 - this.battler().tpt / 100);
			this._skillCooldowns[skillId] = Math.round(skill.settings.cooldown * (1 / (1+this.battler().cda / 100)));
		}
		else if (skill.data.stypeId > 1) {
			this._skillCooldowns[skillId] = Math.round(skill.settings.cooldown * (1 - this.battler().cds / 100) * (1 - this._witchskillreduce * this.battler().skillMpCost(skill.data)));
		}
		ColliderManager.draw(skill.collider, skill.sequence.length + 60);
		var usedSkill = $dataSkills[skillId]
		if (this == $gamePlayer) this.battler().increaseSkillUsage(usedSkill);
		return skill;
	};

	Game_CharacterBase.prototype.makeSkill = function (skillId, forced, independent) {
		var data = $dataSkills[skillId];
		var skill = {
			id: skillId,
			data: data,
			settings: QABS.getSkillSettings(data),
			sequence: QABS.getSkillSequence(data),
			ondmg: QABS.getSkillOnDamage(data),
			radian: independent ? independent.radian : this._radian,
			targetsHit: [],
			forced: forced,
			origin: $gameMap._mapId
		}
		this.beforeSkill(skill, independent);
		if (skill.data.stypeId == 1 && this._cast > 0) skill.settings._cast = this._cast;
		else skill.settings._cast = 0;//일반공격이고 cast가 잇을경우 settings에 cast추가
		skill.sequencer = new Skill_Sequencer(this, skill);
		skill.collider = this.makeSkillCollider(skill.settings, independent);
		return skill;
	};

	//콜라이더 생성때 ats 저렇게하면 안돼. + 지팡이 크기조절과 매커니즘 생성.
	Game_CharacterBase.prototype.makeSkillCollider = function (settings, independent) {
		var w1 = this.collider('collision').width;
		var h1 = this.collider('collision').height;
        /*
        if (this._skill.data.stypeId == 1) {
            if (this._skill.id > 500 && this._skill.id < 700) {
                this._skill.picture.scale.x = this._character.battler().ats;
                this._skill.picture.scale.y = this._character.battler().ats;
            }
        }*/
		//settings.collider = settings.collider || ['box', w1, h1];
		var infront = settings.infront === true;
		var infrontOffset = settings.infrontoffset ? settings.infrontoffset : 0;
		var rotate = settings.rotate === true;


		if (this == $gamePlayer && settings.collider) {
			var settCollider = [settings.collider[0], settings.collider[1] * (this.battler().ats + settings._cast / 100), settings.collider[2] * (this.battler().ats + settings._cast / 100), settings.collider[3], settings.collider[4]]
			var collider = ColliderManager.convertToCollider(settCollider);
		} else {
			settings.collider = settings.collider || ['box', w1, h1];
			var collider = ColliderManager.convertToCollider(settings.collider);
		}
		if (rotate) {
			if (QABS.radianAtks) {
				collider.rotate(Math.PI / 2 + this._radian);
			} else {
				collider.rotate(Math.PI / 2 + this.directionToRadian(this._direction));
			}
		}
		var x1 = independent ? independent.x - collider.center.x + collider._offset.x : this.cx() - collider.center.x + collider._offset.x;
		var y1 = independent ? independent.y - collider.center.y + collider._offset.y : this.cy() - collider.center.y + collider._offset.y;
		if (infront) {
			//var w2 = collider._pivot.x * 2 + infrontOffset//collider.width + infrontOffset;
			var h2 = collider._pivot.y//collider.height + infrontOffset;
			var colliderInfront = Math.sqrt((w1 * w1 + h1 * h1)/4, 2);
			var radian;
			if (independent) {
				radian = independent.radian;
			} else if (QABS.radianAtks) {
				radian = this._radian;
			} else {
				radian = this.directionToRadian(this._direction);
			}
			var w3 = Math.cos(radian) * (colliderInfront + h2/2 + infrontOffset);
			var h3 = Math.sin(radian) * (colliderInfront + h2/2 + infrontOffset);
			x1 += w3;
			y1 += h3;
		}
		collider.moveTo(x1, y1);
		return collider;
	};

	Game_CharacterBase.prototype.makeTargetingSkill = function (skill) {
		this._groundTargeting = skill;
		this._selectTargeting = this.constructor === Game_Event ? true : skill.settings.selectTarget;
		var collider = skill.collider;
		var diameter = skill.settings.range * 2;
		skill.targeting = new Circle_Collider(diameter, diameter);
		skill.targeting.moveTo(this.cx() - diameter / 2, this.cy() - diameter / 2);
		ColliderManager.draw(skill.targeting, -1);
		skill.collider = skill.targeting;
		skill.targets = QABSManager.getTargets(skill, this);
		skill.collider = collider;
		skill.picture = new Sprite_SkillCollider(skill.collider);
		if (this._selectTargeting) {
			if (skill.targets.length === 0) {
				return this.onTargetingCancel();
			}
			skill.collider.color = '#ff0000';
			skill.index = 0;
		}
		QABSManager.addPicture(skill.picture);
		return skill;
	};
})();

//-----------------------------------------------------------------------------
// Game_Player

(function () {
	var Alias_Game_Player_refresh = Game_Player.prototype.refresh;
	Game_Player.prototype.refresh = function () {
		Alias_Game_Player_refresh.call(this);
		this.battler()._isLoopStateChanged = true;
		if (this.battler() && this._battlerId !== this.battler()._actorId) {
			this.setupBattler();
		}
	};

	Game_Player.prototype.battler = function () {
		return this.actor();
	};

	Game_Player.prototype.clearSkills = function () {
		for (var i = this._activeSkills.length - 1; i >= 0; i--) {
			var skill = this._activeSkills[i];
			QABSManager.removePicture(skill.picture);
			QABSManager.removePicture(skill.trail);
			QABSManager.removePicture(skill.pictureCollider);
			if (skill.particle && !skill.settings.endparticle) {
				JavaHut.particleOff(skill)
				QABSManager.removeParticle(skill);
			}
			if (this._invincibleSkills.contains(skill.id)) {
				var index = this._invincibleSkills.indexOf(skill.id);
				this._invincibleSkills.splice(index, 1);
			}
			this._invincible = false;

			this._activeSkills.splice(i, 1);
		}
	};

	Game_Player.prototype.setupBattler = function () {
		if (!this.battler()) return;
		this.clearABS();
		this._battlerId = this.battler()._actorId;
		this.battler()._charaId = 0;
		$gameSystem.loadClassABSKeys();
		$gameSystem.changeABSWeaponSkills({});
		$gameSystem.changeABSArmorSkills({});
		this.battler().initWeaponSkills();
		this.battler().initArmorSkills();
		this._isDead = false;
		this._tpTimer = 0;
		this._moveLockedTimer = 0;
		this._isSpaceTriggered = undefined;
		this._spaceTimer = 0;
		this._tripleShot = [];
		this._avoidshot = [];
		this._witchskillreduce = 0;
		this._saintcritical;
		this._saintcriticalsum = 0;
		this._onceMultipleShot = 0;
		this._onceMultipleShotUsed = false;
		this._currentWeaponId = 0;
		this._weapons = [null, null];
		this._realDead = false;
		this.battler()._killStates = [];
		this.battler()._hpLost = 0;
		this.battler()._mpLost = 0;
		this.battler()._abilities = [];
		this.battler()._stateBuffs = [];
		this.battler()._stateDebuffs = [];
		this.battler()._stateStacks = {};

	};

	Game_Player.prototype.team = function () {
		return 1;
	};

	var Alias_Game_Player_performTransfer = Game_Player.prototype.performTransfer;
	Game_Player.prototype.performTransfer = function () {
		if (this.isTransferring()) {
			if (this._newMapId !== $gameMap.mapId() || this._needsMapReload) {
				if (this._agro) this._agro.clear();
			}
		}
		Alias_Game_Player_performTransfer.call(this);
	};

	var Alias_Game_Player_canMove = Game_Player.prototype.canMove;
	Game_Player.prototype.canMove = function () {
		//if (QABS.lockTargeting && this._groundTargeting) return false;
		return Alias_Game_Player_canMove.call(this);
	};

	Game_Player.prototype.canInput = function () {
		if ($gameMap.isEventRunning() || $gameMessage.isBusy()) {
			return false;
		}
		return this.canInputSkill() && !this._realDead;
	};

	Game_Player.prototype.usableSkills = function () {
		return this.battler().skills().filter(function (skill) {
			return !this._skillCooldowns[skill.id];
		}, this).map(function (skill) {
			return skill.id;
		});
	};
	
	Game_Player.prototype.onDeath = function () {
		this.deathClearABS();
		//this._activeSkills = []; //죽어도 스킬 초기화 안되게
		//this._isDead = true;
		this._realDead = true;
		this._invincible = true;
		$gameTemp.reserveCommonEvent(10);
		this.battler().removeState(1)
	};

    /*var Alias_Game_Player_onPositionChange = Game_Player.prototype.onPositionChange;
    Game_Player.prototype.onPositionChange = function () {
        Alias_Game_Player_onPositionChange.call(this);
        if (this._groundTargeting && !QABS.lockTargeting) {
            this.onTargetingCancel();
        }
    };*/

	var Alias_Game_Player_collidesWithEvent = Game_Player.prototype.collidesWithEvent;
	Game_Player.prototype.collidesWithEvent = function (event, type) {
		if (event.constructor === Game_Loot) {
			return event.collider('interaction').intersects(this.collider(type));
		}
		return Alias_Game_Player_collidesWithEvent.call(this, event, type);
	};

	Game_Player.prototype.updateABS = function () {
		if (this._moveLockedTimer > 0) {
			this._moveLockedTimer--;
		}
		if (this._aStackD > 0) {
			this._aStackD--;
		} else this._aStack = 0;
		if (this._spaceTimer > 0) {
			this._spaceTimer--;
		} else this._isSpaceTriggered = undefined
		//if (this._isDead) return;
		if (this.battler() && this.canInput()) {
			this.updateABSInput();
		} else if ((Input.isTriggered('space') || Input.isTriggered('R1')) && !this._avoid && !this._realDead) {
			if (!this.battler().isWtypeEquipped(4)) {
				this._tpTimer = 50 * (1 - this.battler().tpt / 100);
				if (this.isAttacking() && !this.isAvoiding() && !this._transferring) { //기본공격 캔슬
					var radian = this._radian;
					this.forceSkill($gameSystem.absKeys()[1].skillId);
					//this._radian = radian;
				} else {
					var isGamepad = Imported.QInput && Input.preferGamepad();
					var inputDir = isGamepad ? false : Input._dir8;

					if (isGamepad) {
						var horz = Input._dirAxesA.x;
						var vert = Input._dirAxesA.y;
						if (horz !== 0 || vert !== 0) {
							this._isSpaceTriggered = (Math.atan2(vert, horz));
						}
					} else if (inputDir) this._isSpaceTriggered = this.directionToRadian(Input._dir8);
					this._spaceTimer = 100;
				} //근접공격의 회피공격이 회피중과 상관없이 사용가능하게. 핵심은 this._avoid가 있을때 이를 사용해야 한다는것
			}
		} else if (TouchInput.isCancelled() && $gameSystem.absKeys()[6].skillId) {
			if ((this.isAttacking() || this.isAvoiding() && !this._transferring)) { // 기본공격, 회피 캔슬
				if ($dataSkills[$gameSystem.absKeys()[6].skillId].meta.casting) { // 캐스팅 스킬이라면
					if (this.canUseSkill($gameSystem.absKeys()[6].skillId)) {
						if (TouchInput.isCancelled()) {
							if (this._cast > 0) this._cast = 0;
							$gameSystem._shud_visible = true;
							this._maxCast = $dataSkills[$gameSystem.absKeys()[6].skillId].speed;
							this.loopPose('cast');
							this.requestAnimation(210);
						}
						if (TouchInput.isPressed2()) {
							if ($gameSystem._shud_visible) {
								$gameSwitches.setValue(10, true)
								if (this._castS < this._maxCast) {
									this._castS++;
								} else {
									this.useSkill($gameSystem.absKeys()[6].skillId)
									$gameSwitches.setValue(10, false)
									$gameSystem._shud_visible = false;
									this._castS = 0;
								}
							} else if ($gameSwitches.value(10)) {
								this.clearPose();
								$gameSwitches.setValue(10, false)
								this._castS = 0;
							}
						} else if (TouchInput.isReleased()) {
							//this.clearPose();
							$gameSwitches.setValue(10, false)
							$gameSystem._shud_visible = false;
							this._castS = 0;
						}
					}
				} else if ($dataSkills[$gameSystem.absKeys()[6].skillId].meta.channeling) { // 채널링 스킬이라면
					if (TouchInput.isPressed2() && this.battler()._tp > 1 + this.battler().tpc / 100) {
						if (TouchInput.isCancelled() && this.canUseSkill($gameSystem.absKeys()[6].skillId)) {
							//this.requestAnimation(210);
							if (this._cast > 0) this._cast = 0;
							this._maxCast = $dataSkills[$gameSystem.absKeys()[6].skillId].speed;
							this._castS = $dataSkills[$gameSystem.absKeys()[6].skillId].speed;
							this._castTimer = 0;
							this.useSkill($gameSystem.absKeys()[6].skillId)
						}
						if (this._castS > 0) {
							$gameSystem._shud_visible = true;
							this._castS--;
							var channelData = $dataSkills[$gameSystem.absKeys()[6].skillId].qmeta.channeling.split(' ');
							if (this._castTimer <= 0) {
								this.forceSkill(Number(channelData[2]))
								this._castTimer = channelData[1];
							} else this._castTimer--;
						} else if (this._castS == 0 && $gameSystem._shud_visible == true) { // 다쓴채 끝났을때
							$gameSystem._shud_visible = false;
							//this.clearPose();
						}
					}
				} else { //차징, 캐스팅, 채널링이 아닐경우 바로 사용
					if (TouchInput.isCancelled()) {
						if (this.canUseSkill($gameSystem.absKeys()[6].skillId)) {
							this._avoid = false;
							this.useSkill($gameSystem.absKeys()[6].skillId)
							TouchInput.stopPropagation();
						}
					}
				}
				if ($gameSystem.absKeys()[6].skillId != 146 && this.battler().isStateAffected(73)) this.battler().removeState(73);
			}
		} else if (this.battler().isAvoid()) {
			PointSystem.addPoints(5);
			if (this.battler().isWtypeEquipped(3)) {
				if (this._aStack == 0 && (TouchInput.isPressed() || Input.isPressed('$L2')) && TouchInput._pressedTime < 10) {
					this._tpTimer = 50 * (1 - this.battler().tpt / 100);
					if (this._moveRoute) this._moveRoute.list = [];
					this.battler().removeState(15)
					if (this.battler().isStateAffected(23)) {
						this.battler().gainMp(-1);
						this.battler().removeState(23);
					}
					if (this.battler().isStateStackMax(97)) {
						this.forceSkill($gameSystem.absKeys()[3].skillId);
						this.battler().removeState(97);
					} else this.forceSkill($gameSystem.absKeys()[5].skillId);
					// this.battler().damageAllWeaponDurability(-0.5)
					this.battler().gainTp(-18 * (1 - this.battler().trc / 100))

					this._avoid = false;
					this._aStack = 1;
					this._aStackD = 30;
				}
			} else if (this.battler().isWtypeEquipped(4)) {
				this._maxCast = $dataSkills[$gameSystem.absKeys()[3].skillId].speed;
				if (this._cast > 0) {
					if (this._cast > 0 && !TouchInput.isPressed()) {
						if (this._cast >= this._maxCast) { //지팡이, 해머 차징공격
							this._cast = 0;
							this.forceSkill($gameSystem.absKeys()[3].skillId);
							// this.battler().damageAllWeaponDurability(-0.5)
						} else {
							this.forceSkill($gameSystem.absKeys()[4].skillId);
							// this.battler().damageAllWeaponDurability(-0.5)
						}
						$gameSystem._shud_visible = false;
						this._cast = 0;
					}
				} else if (TouchInput.isPressed() && !this.isAttacking()) {
					this._cast = this._maxCast / 2;
				}
			}
		} else if (TouchInput.isPressed() && this._cast > 0 && this._cast < this._maxCast && this.battler()._tp > 5) {
			this._cast += 0.7 + this.battler().cda / 120;
			this.battler().gainTp(-0.9 * (1 - this.battler().dtr / 100))
			if (this._cast >= this._maxCast) {
				if (!this.battler().isStateStackMax(94)) {
					this.battler().addState(94);
					var se = {};
					se.name = 'se_stack';
					se.pitch = 100;
					se.volume = 30;
					AudioManager.playSe(se);
				}
				this.requestAnimation(78);
			}
		}
		if (TouchInput.isReleased() && !TouchInput.isPressed2() && $gameSystem._shud_visible == true) {
			$gameSystem._shud_visible = false;
			this._castS = 0;
			//this.clearPose();
		} //else if (this._castS > 0 || this._cast > 0) {
		//	if (this._cast > 0) {
		//		$gameSystem._shud_visible = false;
		//		this._cast = 0;
		//	}
		//	this._castS--;
		//	if (this._castS <= 0) {
		//		$gameSystem._shud_visible = false;
		//		this._castS = 0;
		//	}
		//	if (TouchInput.isReleased() && $gameSystem._shud_visible == true) {
		//		$gameSystem._shud_visible = false;
		//		this._castS = 0;
		//	}
		//}
		Game_CharacterBase.prototype.updateABS.call(this);
		if (this._battlerId !== this.actor()._actorId) {
			this.clearABS();
			this.setupBattler();
		}
		/*if ((this._dashing || this._avoid) && this._isMoving) this.battler().gainTp(-0.15 * (1 - this.battler().dtr / 100)); //대쉬중엔 0.2배율만큼 감소
		else */
		if (this._tpTimer > 0) {
			this._tpTimer--;
		} else if (this._isMoving) this.battler().gainTp(0.65 * (1 + this.battler().tpc / 100)); //이동중엔 0.65배율만큼 증가
		else this.battler().gainTp(0.8 * (1 + this.battler().tpc / 100)); //가만히 있을땐 0.8배율만큼 증가
		if (this._dashing && this._isMoving) this.battler().gainTp(-0.2 * (1 - this.battler().dtr / 100));
	};

	Game_Player.prototype.isAttacking = function () {
		for (var i = 0; i < this._activeSkills.length; i++) {
			if (this._activeSkills[i].data.stypeId == 1) return true;
		}
		return false;
	};

	Game_Player.prototype.isAvoiding = function () {
		for (var i = 0; i < this._activeSkills.length; i++) {
			if (this._activeSkills[i].id == $gameSystem.absKeys()[1].skillId) return true;
		}
		return false;
	};

	Game_Player.prototype.updateABSInput = function () {
		var absKeys = $gameSystem.absKeys();
		//무기타입별 상태 추가
		if (this._isSpaceTriggered != undefined) {
			this.useSkill(absKeys[1].skillId);
		}
		for (var key in absKeys) {
			if (!absKeys[key]) continue;
			var inputs = absKeys[key].input;
			for (var i = 0; i < inputs.length; i++) {
				var input = inputs[i];
				if (!Input.isPressed('control') && this.canClick()) {
					if (input === 'mouse2' && absKeys[key].skillId) {
                        /*if ($dataSkills[absKeys[key].skillId].meta.charge) { // 차징 스킬이라면
                            if (this.canUseSkill(absKeys[key].skillId)) {
                                if (TouchInput.isPressed2() && this.battler()._tp > 1 + this.battler().tpc / 100) {
                                    if (!this.isAnimationPlaying() && $gameSystem._shud_visible) {
                                        this.requestAnimation($dataSkills[absKeys[key].skillId].animationId);
                                    }
                                    if (TouchInput.isCancelled()) {
                                        //this.requestAnimation(210);
                                        this._maxCast = $dataSkills[absKeys[key].skillId].speed;
                                        this.playPose('cast', false, false, true, true)
                                        $gameSystem._shud_visible = true;
                                    }
                                    if (this._castS < this._maxCast && $gameSystem._shud_visible) {
                                        this._castS++;
                                        this.battler().gainTp(-0.7)
                                    }
                                } else if (this._castS > 0) {
                                    var charge = $dataSkills[absKeys[key].skillId].qmeta.charge.split('\n');
                                    var chargeData = null;
                                    for (var i = 0; i < charge.length; i++) {
                                        chargeData = charge[i].split(' ');
                                        if (chargeData[0] == 'charge' && this._castS >= Number(chargeData[1])) {
                                            this.useSkill(absKeys[key].skillId)
                                            this.forceSkill(Number(chargeData[2]))
                                            break;
                                        }
                                    }
                                    this.clearPose();
                                    $gameSystem._shud_visible = false;
                                    this._castS = 0;
                                }
                            }
                        } else*/
						if ($dataSkills[absKeys[key].skillId].meta.casting) { // 캐스팅 스킬이라면
							if (this.canUseSkill(absKeys[key].skillId)) {
								if (TouchInput.isCancelled()) {
									if (IsMouseInInventory()) break;
									if (this._cast > 0) this._cast = 0;
									$gameSystem._shud_visible = true;
									this._maxCast = $dataSkills[absKeys[key].skillId].speed;
									this.loopPose('cast');
									this.requestAnimation(210);
								}
								if (TouchInput.isPressed2()) {
									if ($gameSystem._shud_visible) {
										$gameSwitches.setValue(10, true)
										if (this._castS < this._maxCast) {
											this._castS++;
										} else {
											this.useSkill(absKeys[key].skillId)
											if (absKeys[key].skillId != 146 && this.battler().isStateAffected(73)) this.battler().removeState(73); // 이부분 수정해야함
											$gameSwitches.setValue(10, false)
											$gameSystem._shud_visible = false;
											this._castS = 0;
										}
									} else if ($gameSwitches.value(10)) {
										this.clearPose();
										$gameSwitches.setValue(10, false)
										this._castS = 0;
									}
								} else if (TouchInput.isReleased()) {
									this.clearPose();
									$gameSwitches.setValue(10, false)
									$gameSystem._shud_visible = false;
									this._castS = 0;
								}
							}
						} else if ($dataSkills[absKeys[key].skillId].meta.channeling) { // 채널링 스킬이라면
							if (TouchInput.isPressed2() && this.battler()._tp > 1 + this.battler().tpc / 100) {
								if (TouchInput.isCancelled() && this.canUseSkill(absKeys[key].skillId)) {
									if (IsMouseInInventory()) break;
									//this.requestAnimation(210);
									if (this._cast > 0) this._cast = 0;
									this._maxCast = $dataSkills[absKeys[key].skillId].speed;
									this._castS = $dataSkills[absKeys[key].skillId].speed;
									this._castTimer = 0;
									this.useSkill(absKeys[key].skillId)
									if (absKeys[key].skillId != 146 && this.battler().isStateAffected(73)) this.battler().removeState(73); // 이부분 수정해야함
								}
								if (this._castS > 0) {
									$gameSystem._shud_visible = true;
									this._castS--;
									var channelData = $dataSkills[absKeys[key].skillId].qmeta.channeling.split(' ');
									if (this._castTimer <= 0) {
										this.forceSkill(Number(channelData[2]))
										this._castTimer = channelData[1];
									} else this._castTimer--;
								} else if (this._castS == 0 && $gameSystem._shud_visible == true) { // 다쓴채 끝났을때
									$gameSystem._shud_visible = false;
									this.clearPose();
								}
							} 
						} else { //차징, 캐스팅, 채널링이 아닐경우 바로 사용
							if (TouchInput.isCancelled()) {
								if (IsMouseInInventory()) break;
								this.useSkill(absKeys[key].skillId)
								if (absKeys[key].skillId != 146 && this.battler().isStateAffected(73)) this.battler().removeState(73); // 이부분 수정해야함
								TouchInput.stopPropagation();
							}
						}
					}
					//if (input === 'mouse2' && absKeys[key].skillId) {
					//    if ($dataSkills[absKeys[key].skillId].stypeId == 9) { // 캐스팅 스킬이라면
					//        if (this.canUseSkill(absKeys[key].skillId)) {
					//            if (TouchInput.isPressed2() || Input.isPressed('$R2')) {
					//                $gameSwitches.setValue(10, true)
					//                if (TouchInput.isCancelled()) {
					//                    this.loopPose('cast');
					//                    this.requestAnimation(210);
					//                }
					//                if (this._cast < 100) {
					//                    $gameSystem._shud_visible = true;
					//                    this._cast++;
					//                } else {
					//                    this.useSkill(absKeys[key].skillId)
					//                    $gameSwitches.setValue(10, false)
					//                    $gameSystem._shud_visible = false;
					//                    this._cast = 0;
					//                }
					//            } else if (TouchInput.isReleased()) {
					//                this.clearPose();
					//                $gameSwitches.setValue(10, false)
					//                $gameSystem._shud_visible = false;
					//                this.endAnimation();
					//                this._cast = 0;
					//            }
					//        }
					//    } else { // 캐스팅이 아닐경우 바로 사용
					//        if (TouchInput.isCancelled() || Input.isTriggered('$R2')) {
					//            if (!this._avoid) this.useSkill(absKeys[key].skillId)
					//            TouchInput.stopPropagation();
					//        }
					//    }
					//}
					else if (input === 'mouse1' && (!TouchInput.isPressed2() && !Input.isPressed('$R2'))) {
						if (IsMouseInInventory()) break;
						if ((TouchInput.isPressed() || Input.isPressed('$L2')) && !this._castS > 0) { // 눌렀을때 무기별 분기
							//TouchInput.stopPropagation();
							//if ((Input.isPressed('shift') || Input.isPressed('$R1')) && this.battler().isAvoid()) {

							if (this.battler().isWtypeEquipped(3)) { // 검일 경우
								//회피공격시 - 사용조건을 정해야함(회피스텟있고, astack == 0일떄만). 사용시 이동루트 지워야함. 회피스텟 지워야함. astack = 1, astackD = 30;
								if (this.battler().isAvoid() && this._aStack == 0 && TouchInput._pressedTime < 10) {
									if (this._moveRoute) this._moveRoute.list = [];
									this.battler().removeState(15)
									if (this.battler().isStateAffected(23)) {
										this.battler().gainMp(-1);
										this.battler().removeState(23);
									}

									if (this.battler().isStateStackMax(97)) {
										this.useSkill(absKeys[3].skillId);
										this.battler().removeState(97);
									} else this.useSkill(absKeys[5].skillId);
									this._avoid = false;
									this._aStack = 1;
									this._aStackD = 30;
								} else {
									//기본공격시 - aStack과 astackD(= +8를 정해줘야함
									var stacking = $dataSkills[absKeys[key].skillId].qmeta.stacking.split(' ')
									this._aMaxStack = stacking.length;
									var skill = Number(stacking[this._aStack]);
									var lastSkill = this._aStack == 0 ? skill : Number(stacking[this._aStack - 1]);
									// console.log(stacking, this._aMaxStack, skill, lastSkill)
									if (this.canUseSkill(lastSkill)) {
										// console.log(skill, 'yes')
										this.useSkill(skill);
										if (this._aStack > stacking.length - 1) {
											this._aStack = 0;
										}
										else this._aStack++;
										this._aStackD = this._skillCooldowns[skill] + 8
									}
								}
								break;
							} else if (this.battler().isWtypeEquipped(2)) { // 활일 경우
								if (this.battler().isAvoid()) {
									this._avoid = false;
									this.useSkill(absKeys[5].skillId);
								} else {
									this.useSkill(absKeys[key].skillId);
								}
								break;
							} else if (this.battler().isWtypeEquipped(1)) { // 지팡이일 경우
								if (TouchInput._pressedTime > 20) {
									if (this.battler()._tp > 5) {
										this._maxCast = $dataSkills[absKeys[3].skillId].speed;
										$gameSystem._shud_visible = true;
										if (this._cast < this._maxCast && $gameSystem._shud_visible) {
											this._cast += 0.7 + this.battler().cda / 120;
											this.battler().gainTp(-0.9 * (1 - this.battler().dtr / 100))
											if (this._cast >= this._maxCast) {
												if (!this.battler().isStateStackMax(94)) {
													this.battler().addState(94);
													var se = {};
													se.name = 'se_stack';
													se.pitch = 100;
													se.volume = 30;
													AudioManager.playSe(se);
												}
												this.requestAnimation(78);
											} else if (!this.isAnimationPlaying() && $gameSystem._shud_visible) {
												this.requestAnimation(72);
											}
										}
									}
								}
                                /*if (this.battler().isAvoid()) { // 마법 회피기 구현중
                                    if ($dataSkills[$gameSystem.absKeys()[6].skillId] != undefined) {
                                        if ($dataSkills[$gameSystem.absKeys()[6].skillId].stypeId == 2) this.useSkill(551);
                                        else if ($dataSkills[$gameSystem.absKeys()[6].skillId].stypeId == 3) this.useSkill(absKeys[5].skillId);
                                        else if ($dataSkills[$gameSystem.absKeys()[6].skillId].stypeId == 4) this.useSkill(absKeys[5].skillId);
                                        else this.useSkill(absKeys[5].skillId);
                                    } else this.useSkill(absKeys[5].skillId);
                                }*/
								break;
							} else if (this.battler().isWtypeEquipped(4)) { // 해머일 경우
								if (TouchInput._pressedTime > 20) { // 차징
									if (this.battler()._tp > 5) {
										this._maxCast = $dataSkills[absKeys[3].skillId].speed;;
										$gameSystem._shud_visible = true;
										if (this._cast < this._maxCast && $gameSystem._shud_visible) {
											this._cast += 0.7 + this.battler().cda / 120;
											this.battler().gainTp(-0.9 * (1 - this.battler().dtr / 100))
											if (this._cast >= this._maxCast) {
												if (!this.battler().isStateStackMax(94)) {
													this.battler().addState(94);
													var se = {};
													se.name = 'se_stack';
													se.pitch = 100;
													se.volume = 30;
													AudioManager.playSe(se);
												}
												this.requestAnimation(78);
											} else if (!this.isAnimationPlaying() && $gameSystem._shud_visible) {
												this.requestAnimation(72);
											}
										}
									}
								}
                                /*if (this.battler().isAvoid()) { // 마법 회피기 구현중
                                    if ($dataSkills[$gameSystem.absKeys()[6].skillId] != undefined) {
                                        if ($dataSkills[$gameSystem.absKeys()[6].skillId].stypeId == 2) this.useSkill(551);
                                        else if ($dataSkills[$gameSystem.absKeys()[6].skillId].stypeId == 3) this.useSkill(absKeys[5].skillId);
                                        else if ($dataSkills[$gameSystem.absKeys()[6].skillId].stypeId == 4) this.useSkill(absKeys[5].skillId);
                                        else this.useSkill(absKeys[5].skillId);
                                    } else this.useSkill(absKeys[5].skillId);
                                }*/
								break;
							} else { // 그 외의 경우
								if (TouchInput.isTriggered()) {
									this.useSkill(absKeys[key].skillId);
									break;
								}
							}
						} else if (this.battler().isWtypeEquipped(1) || this.battler().isWtypeEquipped(4)) { // 누른 게 아닐경우, 뗏을 때
							if (this._cast > 0) {
								if (this._cast >= this._maxCast) { //지팡이, 해머 차징공격
									this._cast = 0;
									this.battler().reduceStateStack(94);
									this.useSkill(absKeys[3].skillId)
								} else {
									this.useSkill(absKeys[key].skillId);
								}
								$gameSystem._shud_visible = false;
								this._cast = 0;
								break;
							} else if (TouchInput.isLeftButtonReleased()) {
								this.useSkill(absKeys[key].skillId);
								break;
                            }
						}
					} else if (input === 'space' && Input._currentState['space']) {
						//Input.stopPropagation(); //이것때문에 멈추는건가
						this.useSkill(absKeys[key].skillId);
					} else if (Input.isTriggered(input) && input != '$R2') {// || Input.isPressed(input)) {
						//Input.stopPropagation();
						this.useSkill(absKeys[key].skillId);
						break;
					}
                    /*
                    if (this.battler().isWtypeEquipped(2)) {
                        if (TouchInput.isPressed() || TouchInput._pressedTime > 0) {
                            this.battler()._mp = TouchInput._pressedTime
                            if (TouchInput._pressedTime > 120) {
                                if (TouchInput._pressedTime == 121) {
                                    var se = {};
                                    se.name = 'Skill1';
                                    se.pitch = 130;
                                    se.volume = 80;
                                    AudioManager.playSe(se);
                                    var data = {}
                                    data.id = 72;
                                    data.type = 'pressed';
                                    data.loop = 1;
                                    this.addLoopAnimation(data)
                                    TouchInput._pressedTime++;
                                }
                                if (TouchInput.isReleased()) {
                                    this.useSkill(absKeys[14].skillId);
                                    var data = {}
                                    data.id = 72
                                    data.type = 'pressed';
                                    data.loop = 1;
                                    this.removeLoopAnimation(data)
                                    TouchInput._pressedTime = 0;
                                }
                            }
                            else if (TouchInput._pressedTime > 30) {
                                if (TouchInput._pressedTime == 31) {
                                    var se = {};
                                    se.name = 'Skill1';
                                    se.pitch = 110;
                                    se.volume = 80;
                                    AudioManager.playSe(se);
                                    var data = {}
                                    data.id = 71;
                                    data.type = 'pressed';
                                    data.loop = 0;
                                    this._addLoopAnimation.push(data)
                                    TouchInput._pressedTime++;
                                }
                                if (TouchInput._pressedTime == 119) {
                                    console.log("지움")
                                    var data = {}
                                    data.id = 71;
                                    data.type = 'pressed';
                                    data.loop = 1;
                                    this.removeLoopAnimation(data)
                                    TouchInput._pressedTime++;
                                }
                                if (TouchInput.isReleased()) {
                                    var data = {}
                                    data.id = 71;
                                    data.type = 'pressed';
                                    data.loop = 1;
                                    this.removeLoopAnimation(data)
                                    this.useSkill(absKeys[13].skillId);
                                    TouchInput._pressedTime = 0;
                                }
                            }
                            break;
                        } else {
                            TouchInput._pressedTime = 0;
                            this.battler()._mp = 0;
                        }
                    }
                    */
				}
			}
		}
	};


	Game_Player.prototype.useSkill = function (skillId, fromEvent) {
		if (this.isJumping()) return null;
		//if (!this.canInputSkill(fromEvent)) return null;
		if (!this.canUseSkill(skillId)) return null;
		if (this._groundTargeting) {
			this.onTargetingCancel();
		}
		var skill = this.forceSkill(skillId);
		if (skill.data.stypeId == 1) { //일반공격일 경우
			if (this._tripleShot.length > 0) { // 트리플샷일때 검은 2발, 나머지는 3발 사용
				if (this.battler().isWtypeEquipped(3)) {
					var radOffset = 0;
					var independent = {
						x: skill.collider.center.x,
						y: skill.collider.center.y,
						radian: skill.radian
					}
					this.forceSkill(skillId, true, independent);
				} else {
					var radOffset = 20 * Math.PI / 180;
					var independent = {
						x: skill.collider.center.x,
						y: skill.collider.center.y,
						radian: skill.radian
					}
					independent.radian += radOffset;
					independent.radian += independent.radian < 0 ? 2 * Math.PI : 0;
					this.forceSkill(skillId, true, independent);
					independent.radian -= radOffset * 2;
					independent.radian += independent.radian < 0 ? 2 * Math.PI : 0;
					this.forceSkill(skillId, true, independent);
				}
			}
		}
		if (!this._groundTargeting) {
			this.battler().paySkillCost($dataSkills[skillId]);
		}
		if (skill.data.stypeId > 1) {
			QABSSkillbar.requestRefresh = true
			if (this._cast > 0) {
				this.battler().reduceStateStack(94);
				$gameSystem._shud_visible = false;
				this._cast = 0;
			}
		}
		// var value = Number(skill.data.meta.userWeaponDurability);
		// if ($gamePlayer._saintcritical > 0.15) {
		// 	if (!$gamePlayer.battler().isStateAffected(285) && !isNaN(value)) this.battler().damageAllWeaponDurability(value);
		// 	else $gamePlayer.battler().removeState(285);
		// } else if (!isNaN(value)) this.battler().damageAllWeaponDurability(value);
		return skill;
	};

	Game_Player.prototype.updateTargeting = function () {
		return this._selectTargeting ? this.updateSelectTargeting() : this.updateGroundTargeting();
	};

	Game_Player.prototype.updateSelectTargeting = function () {
		// TODO add mouse support
		if (Input.isTriggered('pageup')) {
			Input.stopPropagation();
			this._groundTargeting.index++;
			this.updateSkillTarget();
		}
		if (Input.isTriggered('pagedown')) {
			Input.stopPropagation();
			this._groundTargeting.index--;
			this.updateSkillTarget();
		}
		if (Input.isTriggered('ok')) {
			Input.stopPropagation();
			this.onTargetingEnd();
		}
		if (Input.isTriggered('escape') || TouchInput.isCancelled()) {
			TouchInput.stopPropagation();
			Input.stopPropagation();
			this.onTargetingCancel();
		}
	};

	Game_Player.prototype.updateSkillTarget = function () {
		var skill = this._groundTargeting;
		if (skill.index < 0) skill.index = skill.targets.length - 1;
		if (skill.index >= skill.targets.length) skill.index = 0;
		var target = skill.targets[skill.index];
		var w = skill.collider.width;
		var h = skill.collider.height;
		var x = target.cx() - w / 2;
		var y = target.cy() - h / 2;
		skill.collider.moveTo(x, y);
	};

	Game_Player.prototype.updateGroundTargeting = function () {
		this.updateGroundTargetingPosition();
		if (Input.isTriggered('escape') || TouchInput.isCancelled()) {
			TouchInput.stopPropagation();
			Input.stopPropagation();
			this.onTargetingCancel();
		}
		if (Input.isTriggered('ok') || (this.canClick() && TouchInput.isTriggered()) ||
			QABS.quickTarget) {
			if (!this._groundTargeting.isOk) {
				TouchInput.stopPropagation();
				Input.stopPropagation();
				this.onTargetingCancel();
			} else {
				this.onTargetingEnd();
			}
		}
	};

	Game_Player.prototype.updateGroundTargetingPosition = function () {
		var skill = this._groundTargeting;
		var w = skill.collider.width;
		var h = skill.collider.height;
		if (Imported.QInput && Input.preferGamepad()) {
			var x1 = skill.collider.center.x;
			var y1 = skill.collider.center.y;
			x1 += Input._dirAxesB.x * 5;
			y1 += Input._dirAxesB.y * 5;
		} else {
			var x1 = $gameMap.canvasToMapPX(TouchInput.x);
			var y1 = $gameMap.canvasToMapPY(TouchInput.y);
		}
		var x2 = x1 - w / 2;
		var y2 = y1 - h / 2;
		this.setRadian(Math.atan2(y1 - this.cy(), x1 - this.cx()));
		skill.radian = this._radian;
		skill.collider.moveTo(x2, y2);
		var dx = Math.abs(this.cx() - x2 - w / 2);
		var dy = Math.abs(this.cy() - y2 - h / 2);
		var distance = Math.sqrt(dx * dx + dy * dy);
		skill.isOk = distance <= skill.settings.range;
		skill.collider.color = skill.isOk ? '#00ff00' : '#ff0000';
	};

	//수정 : 조준보정 구현하자
	Game_Player.prototype.beforeSkill = function (skill, independent) {
		var meta = skill.data.qmeta;
		var isGamepad = Imported.QInput && Input.preferGamepad();
		if (!meta.dontTurn) {
			if (isGamepad && QABS.towardsAnalog) {
				var horz = Input._dirAxesB.x;
				var vert = Input._dirAxesB.y;
				if (horz !== 0 || vert !== 0) {
					this.setRadian(Math.atan2(vert, horz));
					var x1 = 0;
					var y1 = 0;
					var x2 = this.cx();
					var y2 = this.cy();
					var targetRad = 0;
					var dist;
					var distTarget = 10;
					var nearTarget = false;
					skill.radian = this._radian;
					if (independent) {
						skill.radian = independent.radian
					} else if (skill.settings.compensate) {
						for (var i = 0; i < $gameMap.events().length; i++) {
							var targetEvent = $gameMap.events()[i];
							if (targetEvent.battler() && !targetEvent._isDead) {
								dist = targetEvent.distToPlayer();
								if (dist < 10 && dist < distTarget) {
									x1 = targetEvent.cx();
									y1 = targetEvent.cy();
									targetRad = Math.atan2(y1 - y2, x1 - x2);
									if (targetRad < 0) targetRad += 2 * Math.PI;
									if (Math.abs(targetRad - this._radian) < 0.36) {
										nearTarget = $gameMap.events()[i];
										distTarget = dist;
									}
								}
							}
						}

						if (nearTarget) {
							x1 = nearTarget.cx();
							y1 = nearTarget.cy();
							targetRad = Math.atan2(y1 - y2, x1 - x2);
							if (targetRad < 0) targetRad += 2 * Math.PI;
							if (Math.abs(targetRad - this._radian) < 0.36) {
								skill.radian = Math.atan2(y1 - y2, x1 - x2);
							}
						}



					}
				} else {
					var x1 = 0;
					var y1 = 0;
					var x2 = this.cx();
					var y2 = this.cy();
					var targetRad = 0;
					var dist;
					var distTarget = 10;
					var nearTarget = false;
					if (independent) {
						skill.radian = independent.radian
					} else if (skill.settings.compensate) {
						for (var i = 0; i < $gameMap.events().length; i++) {
							var targetEvent = $gameMap.events()[i];
							if (targetEvent.battler() && !targetEvent._isDead) {
								dist = targetEvent.distToPlayer();
								if (dist < 10 && dist < distTarget) {
									nearTarget = $gameMap.events()[i];
									distTarget = dist;
								}
							}
						}

						if (nearTarget) {
							x1 = nearTarget.cx();
							y1 = nearTarget.cy();
							skill.radian = Math.atan2(y1 - y2, x1 - x2);
						}


					}
					this.setRadian(skill.radian);
				}
			} else if (!isGamepad && QABS.towardsMouse) {
				if (independent) {
					skill.radian = independent.radian
				} else {
				var x1 = $gameMap.canvasToMapPX(TouchInput.x);
				var y1 = $gameMap.canvasToMapPY(TouchInput.y);
				var x2 = this.cx();
				var y2 = this.cy();
					this.setRadian(Math.atan2(y1 - y2, x1 - x2));
					skill.radian = this._radian;
				}
			}
		}
		if (meta.towardsMove) {
			var radian;
			if (isGamepad) {
				var horz = Input._dirAxesA.x;
				var vert = Input._dirAxesA.y;
				if (horz === 0 && vert === 0) {
					radian = skill.radian;
				} else {
					radian = Math.atan2(vert, horz);
				}
			} else {
				var direction = QMovement.diagonal ? Input.dir8 : Input.dir4;
				if (direction === 0) {
					radian = skill.radian;
				} else {
					radian = this.directionToRadian(direction);
				}
			}
			skill.radian = radian;
		}
		Game_CharacterBase.prototype.beforeSkill.call(this, skill);
	};

	Game_Player.prototype.makeTargetingSkill = function (skill) {
		Game_CharacterBase.prototype.makeTargetingSkill.call(this, skill);
		if (this._selectTargeting) {
			this.updateSkillTarget();
		}
	};

	var Alias_Game_Player_requestMouseMove = Game_Player.prototype.requestMouseMove;
	Game_Player.prototype.requestMouseMove = function () {
		if ($gameSystem.anyAbsMouse()) return this.clearMouseMove();
		if (this._groundTargeting) return this.clearMouseMove();
		Alias_Game_Player_requestMouseMove.call(this);
	};
})();

//-----------------------------------------------------------------------------
// Game_Event

(function () {
	var Alias_Game_Event_initialize = Game_Event.prototype.initialize;
	Game_Event.prototype.initialize = function (mapId, eventId) {
		Alias_Game_Event_initialize.call(this, mapId, eventId);
		this.setupBattler();
	};

	Game_Event.prototype.battler = function () {
		return this._battler;
	};

	Game_Event.prototype.setupBattler = function () {
		var foe = /<enemy:([0-9]*?)>/i.exec(this.notes());
		if ($gameSelfSwitches.value([$gameMap._mapId, this._eventId, 'D'])) return;
		if (foe) {
			this.clearABS();
			this._battlerId = Number(foe[1]);
			this._battler = new Game_Enemy(this._battlerId, 0, 0);
			this._battler._charaId = this.charaId();
			this._skillList = [];
			this._aiType = this._battler._aiType;
			this._aiRange = this._battler._aiRange || QABS.aiLength;
			this._aiWait = -Math.random() * 20;
			this._aiPathfind = Imported.QPathfind && QABS.aiPathfind && this.validAI();
			this._aiSight = Imported.QSight && QABS.aiSight && this.validAI();
			if (this._aiSight) {
				this.setupSight({
					shape: 'circle',
					range: this._aiRange / QMovement.tileSize,
					handler: 'AI',
					targetId: '0'
				});
			}
			var actions = this._battler.enemy().actions;
			for (var i = 0; i < actions.length; i++) {
				this._skillList.push(actions[i].skillId);
			}
			this._respawn = -1;
			this._onDeath = this._battler._onDeath;
			this._onAgro = this._battler._onAgro;
			this._noPopup = this._battler._noPopup;
			this._dontErase = this._battler._dontErase;
			this._team = this._battler._team;
			this._isDead = false;
			this._noMove = this._battler._noMove;
			this._bound = this._battler._bound;
			this._freeze = this._battler._freeze;
			this._noKnock = this._battler._noKnock;
			this._noTransit = this._battler._noTransit;
			if ($gameVariables._data[3] == 1) {
				this.battler().addState(8);
			}
		}
	};

	Game_Event.prototype.distToPlayer = function () {
		return Math.sqrt(Math.pow($gamePlayer.x - this.x, 2) +
			Math.pow($gamePlayer.y - this.y, 2));
	}

	var Alias_Game_Event_comments = Game_Event.prototype.comments;
	Game_Event.prototype.comments = function (withNotes) {
		var comments = Alias_Game_Event_comments.call(this, withNotes);
		if (!this._aiSight) return comments;
		var range = this._aiRange / QMovement.tileSize;
		return comments + '<sight:circle,' + range + ', AI, 0>';
	};

	Game_Event.prototype.canSeeThroughChara = function (chara) {
		if (typeof chara.team === 'function' && chara.team() === this.team()) {
			return true;
		} else if (this._isDead || (typeof chara.battler === 'function' && chara.battler() && chara.battler().isDead())) {
			return true;
		}
		return Game_CharacterBase.prototype.canSeeThroughChara.call(this, chara);
	};

	Game_Event.prototype.disableEnemy = function () {
		//$gameSystem.disableEnemy(this._mapId, this._eventId);
		this.clearABS();
		this._battler = null;
	};

	Game_Event.prototype.team = function () {
		return this._battler ? this._team : 0;
	};

	Game_Event.prototype.usableSkills = function () {
		if (!this._battler) return [];
		return this._skillList.filter(function (skillId) {
			return !this._skillCooldowns[skillId];
		}, this);
	};

	var Alias_Game_Event_bestTarget = Game_Event.prototype.bestTarget;
	Game_Event.prototype.bestTarget = function () {
		var best = Alias_Game_Event_bestTarget.call(this);
		if (!best && this.team() === 2) {
			return $gamePlayer;
		}
		return best;
	};

	Game_Event.prototype.radianTowardsPlayer = function () {
		var x1 = $gamePlayer.cx();
		var y1 = $gamePlayer.cy();
		var x2 = this.cx();
		var y2 = this.cy();
		this._radian = Math.atan2((y1 - y2), x1 - x2);
		this._radian += this._radian < 0 ? 2 * Math.PI : 0;
	};

	Game_Event.prototype.updateABS = function () {
		//if ($gameSystem.isDisabled(this._mapId, this._eventId)) return;
		Game_CharacterBase.prototype.updateABS.call(this);
		if (this.page() && !this._isDead && !this._freeze && this.isNearTheScreen() && !this.battler().isStunned()) {
			return this.updateAI(this._aiType);
		}
		if (this._respawn >= 0) {
			this.updateRespawn();
		}
	};

	Game_Event.prototype.validAI = function () {
		// if added new AI types, expand here with its name so the
		// updateAI will run
		return this._aiType === "simple" || this._aiType === "boss" || this._aiType === "noai";
	};

	Game_Event.prototype.updateAI = function (type) {
		switch (type) {
			case 'simple':
				return this.updateAISimple();
			case 'boss':
				return this.updateAISimple();
			case 'noai':
				return;
			case 'slime':
				return this.updateAISlime();
			case 'forestfairy':
				return this.updateAIForestFairy();
			case 'mushmom':
				return this.updateAIMushmom();
			case 'teddy':
				return this.updateAITeddy();
			case 'bossseal':
				return this.updateAIBossSeal();
			default:
				return this.updateAISimple();
		}
		// to add more AI types, alias this function
		// and do something similar to above
	};

	Game_Event.prototype.updateAISlime = function () {
		var bestTarget = this.bestTarget();
		if (!bestTarget) return;
		var targetId = bestTarget.charaId();
		var bestActions = null;
		//스킬 쓸 수 있는지 확인
		if (this._aiWait >= QABS.aiWait) { //업데이트주기설정
			this._aiWait = -Math.random() * 20;
			if (!this.AISimpleInRange(bestTarget)) return; //업데이트때 범위에 없다면 컴뱃끝
			this.turnTowardCharacter(bestTarget);
			var chara = QPlus.getCharacter(this.charaId());
			if (chara.battler()) {
				var skills = chara.usableSkills().filter(function (skillId) {
					if (!skillId) return false;
					var targets = QABSManager.skillWillHit(skillId, chara._eventId);
					if (targets && targets.length > 0) {
						return true;
					}
				})
				if (skills.length === 0) bestActions = null;
				else bestActions = skills;
			}
		} else {
			this._aiWait++;
		}
		if (!this.inCombat()) return;
		//스킬 쓸 수 있다면 사용, 아니라면 이동
		if (bestActions) {
			//거리가 2이하일때는 점프, 그 외에는 탄막
			var skill = null;
			var bestAction = null;
			if (this.distToPlayer() < 4 && bestActions.indexOf(702) != -1) {
				skill = this.useSkill(702);
			} else if (bestActions.indexOf(705) != -1)
				skill = this.useSkill(705);
			if (skill) skill._target = bestTarget;
		} else if (this.canMove() && !this._noMove && !this.battler()._bound) {
			{
				this.moveTowardCharacter(bestTarget);
			}
		}
	};


	Game_Event.prototype.updateAIForestFairy = function () {
		var bestTarget = this.bestTarget(); //타겟설정
		if (!bestTarget) return;
		var targetId = bestTarget.charaId();
		var bestAction = null;
		if (this._aiWait >= QABS.aiWait) { //업데이트주기설정
			this._aiWait = -Math.random() * 20;
			if (!this.AISimpleInRange(bestTarget)) return; //업데이트때 범위에 없다면 컴뱃끝
			bestAction = QABSManager.bestAction(this.charaId());
		} else {
			this._aiWait++;
		}
		if (!this.inCombat()) return;
		//스킬 쓸 수 있다면 사용, 아니라면 이동
		if (bestAction) {
			var skill = this.useSkill(bestAction);
			if (skill) skill._target = bestTarget;
		} else if (this.canMove() && !this._noMove && !this.battler()._bound) {
			if (this.distToPlayer() > 5) this.moveTowardCharacter(bestTarget);
			if (this.distToPlayer() < 3) this.moveAwayFromCharacter(bestTarget);
		}
	};

	Game_Event.prototype.updateAIMushmom = function () {
		var bestTarget = this.bestTarget();
		if (!bestTarget) return;
		var targetId = bestTarget.charaId();
		if (!this.AISimpleInRange(bestTarget)) return;
		var bestAction = null;
		if (this._aiWait >= QABS.aiWait) { //업데이트주기설정
			this._aiWait = -Math.random() * 20;
			if (!this.AISimpleInRange(bestTarget)) return; //업데이트때 범위에 없다면 컴뱃끝
			bestAction = QABSManager.bestAction(this.charaId());
		} else {
			this._aiWait++;
		}
		if (!this.inCombat()) return;
		if (bestAction) {
			if (bestAction == 764 && this.canUseSkill(764)) {
				skill = this.useSkill(764);
				var rand = Math.floor(Math.random() * 3);
				skill = this.useSkill(765 + rand);
				if (skill) skill._target = bestTarget;
			} else if (bestAction == 769) {
				var skill = this.useSkill(bestAction);
				if (skill) skill._target = bestTarget;
			}
		} else if (this.canMove() && !this._noMove && !this.battler()._bound) {
			if (this.distToPlayer() > 7) this.moveTowardCharacter(bestTarget);
			if (this.distToPlayer() < 5) this.moveAwayFromCharacter(bestTarget);
		}
	};

	Game_Event.prototype.updateAITeddy = function () {
		var bestTarget = this.bestTarget();
		if (!bestTarget) return;
		var targetId = bestTarget.charaId();
		var bestAction = null;
		if (this._aiWait >= QABS.aiWait) { //업데이트주기설정
			this._aiWait = -Math.random() * 20;
			if (!this.AISimpleInRange(bestTarget)) return; //업데이트때 범위에 없다면 컴뱃끝
			bestAction = QABSManager.bestAction(this.charaId());
		} else {
			this._aiWait++;
		}
		if (!this.inCombat()) return;
		if (bestAction) {
			var skill = this.useSkill(bestAction);
			if (skill) skill._target = bestTarget;
		} else if (this.canMove() && !this._noMove && !this.battler()._bound) {
			if (this.distToPlayer() > 2.5) this.moveTowardCharacter(bestTarget);
			else this.turnTowardCharacter(bestTarget);
		}
	};

	Game_Event.prototype.updateAIBossSeal = function () {
		var bestTarget = this.bestTarget();
		if (!bestTarget) return;
		var targetId = bestTarget.charaId();
		var bestAction = null;
		if (this._aiWait >= QABS.aiWait) { //업데이트주기설정
			this._aiWait = -Math.random() * 10;
			if (!this.AISimpleInRange(bestTarget)) return; //업데이트때 범위에 없다면 컴뱃끝
			bestAction = QABSManager.bestAction(this.charaId());
		} else {
			this._aiWait++;
		}
		if (!this.inCombat()) return;
		if (bestAction) {
			var skill = this.useSkill(bestAction);
			if (skill) skill._target = bestTarget;
		}
	};

	Game_Event.prototype.updateAISimple = function () {
		var bestTarget = this.bestTarget();
		if (!bestTarget) return;
		var targetId = bestTarget.charaId();
		var bestAction = null;
		//console.log(this._aiWait)
		if (this._aiWait >= QABS.aiWait) { //업데이트주기설정
			this._aiWait = -Math.random() * 20;
			if (!this.AISimpleInRange(bestTarget)) return; //업데이트때 범위에 없다면 컴뱃끝
			bestAction = QABSManager.bestAction(this.charaId());
		} else {
			this._aiWait++;
		}
		if (!this.inCombat()) return;
		if (bestAction) {
			var skill = this.useSkill(bestAction);
			if (skill) skill._target = bestTarget;
		} else if (this.canMove() && !this._noMove && !this.battler()._bound) {
			this.moveTowardCharacter(bestTarget);
		}
	}

	Game_Event.prototype.updateAIBoss = function () {
        /*console.log('boss')
        if (this.battler().hp < 999) {
            var key = [$gameMap.mapId(), this._eventId, 'C'];
            $gameSelfSwitches.setValue(key, true);
            this.battler()._hp = 1000
        }*/
	};

	Game_Event.prototype.removeAgro = function (charaId) {
		if (!this._agro) return;
		Game_CharacterBase.prototype.removeAgro.call(this, charaId);
		if (!this.inCombat() && !this._endWait) {
			this.endCombat();
		}
	};

	//변경 : 어그로끌릴시 onAgro 실행되도록 바꿈
	Game_Event.prototype.AISimpleInRange = function (bestTarget) {
		var targetId = bestTarget.charaId();
		if (this.isTargetInRange(bestTarget)) {
			if (this._onAgro)
				try {
					eval(this._onAgro);
				} catch (e) {
					var id = this.battler()._enemyId;
					console.error('Error with `onAgro` meta inside enemy ' + id, e);
				}
			this._agro.placeInCombat();
			if (!this._agro.has(targetId)) {
				//this._aiWait = QABS.aiWait;
				this.addAgro(targetId);
				//if (this._aiPathfind) {
				//	this.clearPathfind();
				//}
			}
			if (this._endWait) {
				this.removeWaitListener(this._endWait);
				this._endWait = null;
			}
			return true;
		} //else {
		//	if (this._agro.has(targetId)) {
		//		//if (this._aiPathfind) {
		//		//	this.clearPathfind();
		//		//}
		//		this._endWait = this.wait(1800).then(function () {
		//			//this._endWait = null;
		//			//this.endCombat();
		//		}.bind(this));
		//		//this.removeAgro(targetId);
		//	}
		//	//if (this._endWait && this.canMove() && !this._noMove) {
		//	//	this.moveTowardCharacter(bestTarget);
		//	//}
		//	return false;
		//}
		return false;
	};

	Game_Event.prototype.AISimpleGetAction = function (bestTarget) {
		var bestAction = null;
		if (this._aiWait >= QABS.aiWait) {
			this.turnTowardCharacter(bestTarget);
			bestAction = QABSManager.bestAction(this.charaId());
			this._aiWait = -Math.random() * 20;
		} else {
			this._aiWait++;
		}
		return bestAction;
	};

	Game_Event.prototype.AISimpleAction = function (bestTarget, bestAction) {
		if (bestAction) {
			var skill = this.useSkill(bestAction);
			if (skill) skill._target = bestTarget;
		} else if (this.canMove() && !this._noMove && !this.battler()._bound) {
			if (this._aiPathfind) {
				var dx = bestTarget.cx() - this.cx();
				var dy = bestTarget.cy() - this.cy();
				var mw = this.collider('collision').width + bestTarget.collider('collision').width;
				var mh = this.collider('collision').height + bestTarget.collider('collision').height;
				if (Math.abs(dx) <= mw && Math.abs(dy) <= mh) {
					this.clearPathfind();
					this.moveTowardCharacter(bestTarget);
				} else {
					this.initChase(bestTarget.charaId());
				}
			} else {
				this.moveTowardCharacter(bestTarget);
			}
		}
	};


	//변경 : 몹이 바라보는 방향에따라 레인지가 바뀌도록 변경
	Game_Event.prototype.isTargetInRange = function (target) {
		if (!target) return false;
		//사이트 안쓰게 바꿈
        /*if (this._aiSight) {
            var prev = this._sight.range;
            if (this.inCombat()) {
                this._sight.range = this._aiRange + QMovement.tileSize * 3;
            } else {
                this._sight.range = this._aiRange;
            }
            this._sight.range /= QMovement.tileSize;
            if (prev !== this._sight.range) {
                if (this._sight.base) {
                    this._sight.base.kill = true;
                    this._sight.base.id = 'sightOld' + this.charaId();
                }
                this._sight.base = null;
                this._sight.reshape = true;
            }
            if (this._sight.targetId !== target.charaId()) {
                delete this._sight.cache.charas[this._sight.targetId];
                this._sight.targetId = target.charaId();
                this._sight.reshape = true;
            }
            if (this._sight.reshape) {
                this.updateSight();
            }
            var key = [this._mapId, this._eventId, this._sight.handler];
            //console.log($gameSelfSwitches.value(key), key)
            return $gameSelfSwitches.value(key);
        }*/
		var dx = Math.abs(target.cx() - this.cx());
		var dy = Math.abs(target.cy() - this.cy());
		var range = this._aiRange + (this.inCombat() ? 96 : 0);
        /*
        var dir = this._direction;
        if (this._diagonal) dir = this._diagonal;
        
        var toRadian = Math.atan2(-(dy), dx);
        toRadian += this._radian < 0 ? Math.PI : 0;
        toRadian -= this._radian > Math.PI ? Math.PI : 0;
        var targetDir = this.radianToDirection(toRadian, true);
        var rightRad = this.radianToDirection(toRadian + 3.14 / 4, true);
        var leftRad = this.radianToDirection(toRadian - 3.14 / 4, true);

        if (dir != targetDir && dir != rightRad && dir != leftRad) range *= 0.2;
        if(this._eventId == 29) console.log(targetDir, rightRad, leftRad)
        //if (dir == targetDir) range *= 0.1; // 후방 45도
        //else if (dir + targetDir != 10) range *= 0.7; 
        안해 씨발
        */
		return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2), 2) <= range;
	};

	Game_Event.prototype.updateRespawn = function () {
		if (this._respawn === 0) {
			this.respawn();
		} else {
			this._respawn--;
		}
	};

	Game_Event.prototype.respawn = function () {
		this._erased = false;
		this.refresh();
		this.findRespawnLocation();
		this.setupBattler();
	};

	Game_Event.prototype.endCombat = function () {
		//if (this._aiPathfind) {
		//	this.clearPathfind();
		//}
		this.clearAgro();
		//if (this._aiPathfind || Imported.QPathfind) {
		//	var x = this.event().x * QMovement.tileSize;
		//	var y = this.event().y * QMovement.tileSize;
		//	this.initPathfind(x, y, {
		//		smart: 1,
		//		adjustEnd: true
		//	});
		//} /*else {
  //          this.findRespawnLocation();
  //      }*/
		this.refresh();
	};

	Game_Event.prototype.findRespawnLocation = function () {
		var x = this.event().x * QMovement.tileSize;
		var y = this.event().y * QMovement.tileSize;
		if (this.canPixelPass(x, y, 5)) {
			this.setPixelPosition(x, y);
			this.straighten();
			this.refreshBushDepth();
			return;
		}
		var dist = Math.min(this.collider('collision').width, this.collider('collision').height);
		dist = Math.max(dist / 2, this.moveTiles());
		var open = [x + ',' + y];
		var closed = [];
		var current;
		var x2;
		var y2;
		while (open.length) {
			current = open.shift();
			closed.push(current);
			current = current.split(',').map(Number);
			var passed;
			for (var i = 1; i < 5; i++) {
				var dir = i * 2;
				x2 = Math.round($gameMap.roundPXWithDirection(current[0], dir, dist));
				y2 = Math.round($gameMap.roundPYWithDirection(current[1], dir, dist));
				if (this.canPixelPass(x2, y2, 5)) {
					passed = true;
					break;
				}
				var key = x2 + ',' + y2;
				if (!closed.contains(key) && !open.contains(key)) {
					open.push(key);
				}
			}
			if (passed) break;
		}
		this.setPixelPosition(x2, y2);
		this.straighten();
		this.refreshBushDepth();
	};

	Game_Event.prototype.onDeath = function () {
		if (this._onDeath) {
			try {
				eval(this._onDeath);
			} catch (e) {
				var id = this.battler()._enemyId;
				console.error('Error with `onDeath` meta inside enemy ' + id, e);
			}
		}

		this.deathClearABS();
		if (this._moveRoute) this._moveRoute.list = [];
		this._respawn = Number(this.battler().enemy().meta.respawn) || -1;
		this._isDead = true;
		this.battler()._killHpBar = true;
		if (!this._dontErase) this.erase();
	};

	Game_Event.prototype.setupLoot = function () {
		if (!this.battler()) return;
		var exp = this.battler().exp();
		if (exp > 0) {
			this.makeParticleStatTo($gamePlayer, 'exp', this.battler().exp());
		}
			// if (exp > 0) {
			// 	QABSManager.startPopup('QABS-EXP', {
			// 		x: $gamePlayer.cx(), y: $gamePlayer.cy(),
			// 		string: 'Exp: ' + exp
			// 	});
			// }
			if ($gamePlayer.battler()._killStates) {
				for (var i = 0; i < $gamePlayer.battler()._killStates.length; i++) {
					$gamePlayer.battler().addState($gamePlayer.battler()._killStates[i])
				}
			}
		if ($gamePlayer.battler().isStateAffected(115)) $gamePlayer.battler().gainTp(10);
		if ($gamePlayer.battler().isStateAffected(402)) $gamePlayer.battler().gainTp(30);
			if ($gamePlayer.battler().isStateAffected(202)) {
				var rand = Math.random();
				if (rand > 0.9) $gamePlayer.battler().gainHp(1);
				else if (rand > 0.6) $gamePlayer.battler().gainMp(1);
				else $gamePlayer.battler().gainTp(10);
			}
			//this.setupLoot();
		this.battler().makeDropItems().forEach(function (item) {
			if (DataManager.isWeapon(item)) {
				item.type = 1;
				$gameMap.copyItemFrom(1, 31, item, this.x, this.y, false);
			}
			else if (DataManager.isArmor(item)) {
				item.type = 2;
				$gameMap.copyItemFrom(1, 32, item, this.x, this.y, false);
			}
			else {
				if (item.id == 94) this.makeParticleStatTo($gamePlayer, 'hp', 1);
				else if (item.id == 95) this.makeParticleStatTo($gamePlayer, 'mp', 1);
				else if (item.id == 96) this.makeParticleStatTo($gamePlayer, 'tp', 40);
				else {
					if (item.id > 96) {
						if (item.id == 97) item.type = 97;
						else if (item.id == 98) item.type = 98;
						else if (item.id == 99) item.type = 99;
						else if (item.id == 100) item.type = 100;
						else if (item.id > 100) item.type = 106;
					} else item.type = 0;
					if (item.id > 100) $gameMap.copyDropItemFrom(1, 31, item, this.x, this.y, false);
					else $gameMap.copyItemFrom(1, 30, item, this.x, this.y, false);
				}
			}
		}, this);
		var key = [$gameMap.mapId(), this._eventId, 'D'];
		$gameSelfSwitches.setValue(key, true);
        /*
        var x, y;
        var loot = [];
        this.battler().makeDropItems().forEach(function (item) {
            x = this.x + (Math.random() / 2) - (Math.random() / 2);
            y = this.y + (Math.random() / 2) - (Math.random() / 2);
            var type = 0;
            if (DataManager.isWeapon(item)) type = 1;
            if (DataManager.isArmor(item)) type = 2;
            loot.push(QABSManager.createItem(x, y, item.id, type));
        }.bind(this));
        if (this.battler().gold() > 0) {
            x = this.x + (Math.random() / 2) - (Math.random() / 2);
            y = this.y + (Math.random() / 2) - (Math.random() / 2);
            loot.push(QABSManager.createGold(x, y, this.battler().gold()));
        }
        if (this.battler().enemy().meta.autoLoot) {
            var prevAoeLoot = QABS.aoeLoot;
            QABS.aoeLoot = false;
            loot.forEach(function (loot) {
                loot.collectDrops();
            });
        }*/
	};

	Game_Event.prototype.onTargetingEnd = function () {
		var skill = this._groundTargeting;
		var target = skill.targets[Math.floor(Math.random() * skill.targets.length)];
		var w = skill.collider.width;
		var h = skill.collider.height;
		var x = target.cx() - w / 2;
		var y = target.cy() - h / 2;
		skill.collider.moveTo(x, y);
		skill.picture.move(x + w / 2, y + h / 2);
		Game_CharacterBase.prototype.onTargetingEnd.call(this);
	};
})();

//-----------------------------------------------------------------------------
// Game_Loot

function Game_Loot() {
	this.initialize.apply(this, arguments);
}

(function () {
	Game_Loot.prototype = Object.create(Game_Event.prototype);
	Game_Loot.prototype.constructor = Game_Loot;

	Game_Loot.prototype.initialize = function (x, y) {
		Game_Character.prototype.initialize.call(this);
		this.isLoot = true;
		this._bulletThrough = true;
		this._decay = QABS.lootDecay;
		this._eventId = -1;
		this._gold = null;
		this._loot = null;
		this._noSprite = true;
		this.locate(x, y);
		QABSManager.addEvent(this);
		this.refresh();
	};

	Game_Loot.prototype.event = function () {
		return {
			note: ''
		}
	};

	Game_Loot.prototype.shiftY = function () {
		return 0;
	};

	Game_Loot.prototype.setGold = function (value) {
		this._gold = value;
		this.setIcon(QABS.goldIcon);
	};

	Game_Loot.prototype.setItem = function (item) {
		this._loot = item;
		this.setIcon(item.iconIndex);
	};

	Game_Loot.prototype.setIcon = function (iconIndex) {
		this._iconIndex = iconIndex;
		this._itemIcon = new Sprite_Icon(iconIndex);
		this._itemIcon.move(this._px, this._py);
		this._itemIcon.z = 1;
		this._itemIcon._isFixed = true;
		QABSManager.addPicture(this._itemIcon);
	};

	Game_Loot.prototype.page = function () {
		if (!this._lootPage) {
			this._lootPage = {
				conditions: {
					actorId: 1, actorValid: false,
					itemId: 1, itemValid: false,
					selfSwitchCh: 'A', selfSwitchValid: false,
					switch1Id: 1, switch1Valid: false,
					switch2Id: 1, switch2Valid: false,
					variable1Id: 1, variable1Valid: false, variableValue: 0
				},
				image: {
					characterIndex: 0, characterName: '',
					direction: 2, pattern: 1, tileId: 0
				},
				moveRoute: {
					list: [{ code: 0, parameters: [] }],
					repeat: false, skippable: false, wait: false
				},
				list: [],
				directionFix: false,
				moveFrequency: 4,
				moveSpeed: 3,
				moveType: 0,
				priorityType: 0,
				stepAnime: false,
				through: true,
				trigger: QABS.lootTrigger,
				walkAnime: true
			};
			this._lootPage.list = [];
			this._lootPage.list.push({
				code: 355,
				indent: 0,
				parameters: ['this.character().collectDrops();']
			});
			this._lootPage.list.push({
				code: 0,
				indent: 0,
				parameters: [0]
			});
		}
		return this._lootPage;
	};

	Game_Loot.prototype.findProperPageIndex = function () {
		return 0;
	};

	Game_Loot.prototype.collectDrops = function () {
		if (QABS.aoeLoot) {
			return this.aoeCollect();
		}
		if (this._loot) $gameParty.gainItem(this._loot, 1);
		if (this._gold) $gameParty.gainGold(this._gold);
		var string = this._gold ? String(this._gold) : this._loot.name;
		if (this._iconIndex) {
			string = '\\I[' + this._iconIndex + ']' + string;
		}
		QABSManager.startPopup('QABS-ITEM', {
			x: this.cx(), y: this.cy(),
			string: string
		});
		this.erase();
		QABSManager.removeEvent(this);
		QABSManager.removePicture(this._itemIcon);
	};

	Game_Loot.prototype.aoeCollect = function () {
		var loot = ColliderManager.getCharactersNear(this.collider(), function (chara) {
			return chara.constructor === Game_Loot &&
				chara.collider().intersects(this.collider());
		}.bind(this));
		var x = this.cx();
		var y = this.cy();
		var totalLoot = [];
		var totalGold = 0;
		var i;
		for (i = 0; i < loot.length; i++) {
			if (loot[i]._loot) totalLoot.push(loot[i]._loot);
			if (loot[i]._gold) totalGold += loot[i]._gold;
			QABSManager.removeEvent(loot[i]);
			QABSManager.removePicture(loot[i]._itemIcon);
		}
		var display = {};
		for (i = 0; i < totalLoot.length; i++) {
			var item = totalLoot[i];
			$gameParty.gainItem(item, 1);
			display[item.name] = display[item.name] || {};
			display[item.name].iconIndex = item.iconIndex;
			display[item.name].total = display[item.name].total + 1 || 1;
		}
		for (var name in display) {
			var iconIndex = display[name].iconIndex;
			var string = 'x' + display[name].total + ' ' + name;
			if (iconIndex) {
				string = '\\I[' + iconIndex + ']' + string;
			}
			QABSManager.startPopup('QABS-ITEM', {
				x: x, y: y,
				string: string,
				duration: 120
			});
			y += 22;
		}
		if (totalGold > 0) {
			$gameParty.gainGold(totalGold);
			var string = String(totalGold);
			if (QABS.goldIcon) {
				string = '\\I[' + QABS.goldIcon + ']' + string;
			}
			QABSManager.startPopup('QABS-ITEM', {
				x: x, y: y,
				string: string,
				duration: 120
			});
		}
	};

	Game_Loot.prototype.update = function () {
		if (this._decay <= 0) {
			this.erase();
			QABSManager.removeEvent(this);
			QABSManager.removePicture(this._itemIcon);
			return;
		}
		this._decay--;
	};

	Game_Loot.prototype.defaultColliderConfig = function () {
		return 'box,48,48,-8,-8';
	};

	Game_Loot.prototype.castsShadow = function () {
		return false;
	};
})();

//-----------------------------------------------------------------------------
// Scene_Map

(function () {
	var Alias_Scene_Map_initialize = Scene_Map.prototype.initialize;
	Scene_Map.prototype.initialize = function () {
		Alias_Scene_Map_initialize.call(this);
		$gameSystem.preloadAllSkills();
	};

	var Alias_Scene_Map_isMenuCalled = Scene_Map.prototype.isMenuCalled;
	Scene_Map.prototype.isMenuCalled = function () {
		if ($gameSystem.anyAbsMouse2()) return Input.isTriggered('menu');
		return Alias_Scene_Map_isMenuCalled(this);
	};
})();

//-----------------------------------------------------------------------------
// Sprite_Character

(function () {
	var Alias_Sprite_Character_initMembers = Sprite_Character.prototype.initMembers;
	Sprite_Character.prototype.initMembers = function () {
		Alias_Sprite_Character_initMembers.call(this);
		this.createStateSprite();
	};

	Sprite_Character.prototype.createStateSprite = function () {
		this._stateSprite = new Sprite_StateOverlay();
		this.addChild(this._stateSprite);
	};

	var Alias_Sprite_Character_update = Sprite_Character.prototype.update;
	Sprite_Character.prototype.update = function () {
		Alias_Sprite_Character_update.call(this);
		if (this._character) this.updateBattler();
		if (this._battler) this.updateDamagePopup();
	};

	Sprite_Character.prototype.updateDamagePopup = function () {
		this.setupDamagePopup();
	};

	Sprite_Character.prototype.updateBattler = function () {
		if (this._battler !== this._character.battler()) {
			this.setBattler(this._character.battler());
		}
	};

	Sprite_Character.prototype.setBattler = function (battler) {
		this._battler = battler;
		this._stateSprite.setup(this._battler);
	};

	Sprite_Character.prototype.setupDamagePopup = function () {
		if (!Imported.QPopup || this._character._noPopup || this._character == $gamePlayer) return;
		if (this._battler._damageQueue.length > 0) {
			var string;
			var fill = '#ffffff';
			var result = this._battler._damageQueue.shift();
			var type = 'DMG';
			var color = null;
			if (result.missed || result.evaded) {
				string = 'Missed';
				type = 'MISSED';
			} else if (result.hpAffected) {
				var dmg = result.hpDamage;
				string = String(Math.abs(dmg));
				if (dmg >= 0) {
					type = 'DMG';
				} else {
					type = 'HEAL';
				}
			} else if (result.mpDamage) {
				string = String(result.mpDamage);
				type = 'MP';
			}
			if (!string && string !== '0') return;
			var iconIndex = result.damageIcon;
			if (iconIndex) {
				string = '\\I[' + iconIndex + ']' + string;
			}
			if (result.elementId > 1) {
				if (result.elementId == 2) color = '#ff8383'
				else if (result.elementId == 3) color = '#97c5ff'
				else if (result.elementId == 4) color = '#9affa6'
				else if (result.elementId == 5) color = '#f9ffd2'
				else if (result.elementId == 6) color = '#d9d9d9'
				else if (result.elementId == 7) color = '#575757'
				else color = '#ffffff'
			} else color = '#ffffff'
			if (result.effective) {
				string = result.effective + '\n' + string;
			}
			if (result.critical) {
				type += '-CRIT';
				string = 'critical!\n' + string;
				var se = {};
				se.name = 'se_critical';
				se.volume = 80;
				se.pitch = 110;
				se.pan = 0;
				AudioManager.playSe(se);
			}
			QABSManager.startPopup('QABS-' + type, {
				string: string,
				oy: this._battler._popupOY,
				//bindTo: this._character.charaId(),
				x: this._character.cx(),
				y: this._character.cy(),
				duration: 50,
				color: color
			});
			this._battler.clearDamagePopup();
			this._battler.clearResult();
		}
	};
})();

//-----------------------------------------------------------------------------
// Sprite_Icon

function Sprite_Icon() {
	this.initialize.apply(this, arguments);
}

(function () {
	Sprite_Icon.prototype = Object.create(Sprite.prototype);
	Sprite_Icon.prototype.constructor = Sprite_Icon;

	Sprite_Icon.prototype.initialize = function (index, sheet, w, h) {
		Sprite.prototype.initialize.call(this);
		this._iconIndex = index;
		this._iconSheet = sheet || 'IconSet';
		this._iconW = w || 32;
		this._iconH = h || 32;
		this._realX = this.x;
		this._realY = this.y;
		this._isFixed = false;
		this.setBitmap();
	};

	Sprite_Icon.prototype.setBitmap = function () {
		this.bitmap = ImageManager.loadSystem(this._iconSheet);
		var pw = this._iconW;
		var ph = this._iconH;
		var sx = this._iconIndex % 16 * pw;
		var sy = Math.floor(this._iconIndex / 16) * ph;
		this.setFrame(sx, sy, pw, ph);
	};

	Sprite_Icon.prototype.update = function () {
		Sprite.prototype.update.call(this);
		if (this._isFixed) this.updatePosition();
	};

	Sprite_Icon.prototype.updatePosition = function () {
		this.x = this._realX;
		this.x -= $gameMap.displayX() * QMovement.tileSize;
		this.y = this._realY;
		this.y -= $gameMap.displayY() * QMovement.tileSize;
	};

	Sprite_Icon.prototype.move = function (x, y) {
		Sprite.prototype.move.call(this, x, y);
		this._realX = x;
		this._realY = y;
		this.updatePosition();
	};
})();

//-----------------------------------------------------------------------------
// Sprite_SkillPicture

function Sprite_SkillPicture() {
	this.initialize.apply(this, arguments);
}

(function () {
	Sprite_SkillPicture.prototype = Object.create(Sprite.prototype);
	Sprite_SkillPicture.prototype.constructor = Sprite_SkillPicture;

	Sprite_SkillPicture.prototype.initialize = function () {
		Sprite.prototype.initialize.call(this);
		this._maxFrames = 1;
		this._layers = 1;
		this._speed = 0;
		this._isAnimated = false;
		this._tick = 0;
		this._frameI = 0;
		this._lastFrameI = null;
		this._realX = this.x;
		this._realY = this.y;
	};

	Sprite_SkillPicture.prototype.setupAnim = function (frames, layers, speed) {
		this._isAnimated = true;
		this._maxFrames = frames;
		this._layers = layers;
		this._speed = speed;
	};

	Sprite_SkillPicture.prototype.update = function () {
		Sprite.prototype.update.call(this);
		this.updatePosition();
		if ($gameMap._globalLocked) return;
		if (this._isAnimated) this.updateAnimation();
		this.updateFrame();
	};

	Sprite_SkillPicture.prototype.updatePosition = function () {
		this.x = this._realX;
		this.x -= $gameMap.displayX() * QMovement.tileSize;
		this.y = this._realY;
		this.y -= $gameMap.displayY() * QMovement.tileSize;
	};

	Sprite_SkillPicture.prototype.updateAnimation = function () {
		if (this._tick % this._speed === 0) {
			this._frameI = (this._frameI + 1) % this._maxFrames;
		}
		this._tick = (this._tick + 1) % this._speed;
	};

	Sprite_SkillPicture.prototype.updateFrame = function () {
		if (this._lastFrameI !== null) {
			if (this._lastFrameI === this._frameI) return;
		}
		var i = this._frameI;
		var pw = this._maxFrames > 4 ? this.bitmap.width / 5 : this.bitmap.width;
		var ph = this.bitmap.height / this._layers;
		var sx = pw * (this._frameI % 5);
		var sy = ph * Math.floor(this._frameI / 5);
		this.setFrame(sx, sy, pw, ph);
		this._lastFrameI = i;
	};

	Sprite_SkillPicture.prototype.move = function (x, y) {
		Sprite.prototype.move.call(this, x, y);
		this._realX = x;
		this._realY = y;
		this.updatePosition();
	};
})();

//-----------------------------------------------------------------------------
// Sprite_SkillTrail

function Sprite_SkillTrail() {
	this.initialize.apply(this, arguments);
}

(function () {
	Sprite_SkillTrail.prototype = Object.create(TilingSprite.prototype);
	Sprite_SkillTrail.prototype.constructor = Sprite_SkillTrail;

	Sprite_SkillTrail.prototype.initialize = function () {
		TilingSprite.prototype.initialize.call(this);
		this._realX = this.x;
		this._realY = this.y;
	};

	Sprite_SkillTrail.prototype.update = function () {
		TilingSprite.prototype.update.call(this);
		this.updatePosition();
	};

	Sprite_SkillTrail.prototype.updatePosition = function () {
		this.x = this._realX;
		this.x -= $gameMap.displayX() * QMovement.tileSize;
		this.y = this._realY;
		this.y -= $gameMap.displayY() * QMovement.tileSize;
	};

	Sprite_SkillTrail.prototype.move = function (x, y, width, height) {
		TilingSprite.prototype.move.call(this, x, y, width, height);
		this._realX = x;
		this._realY = y;
		this.updatePosition();
	};
})();

//-----------------------------------------------------------------------------
// Sprite_MapAnimation

function Sprite_MapAnimation() {
	this.initialize.apply(this, arguments);
}

(function () {
	Sprite_MapAnimation.prototype = Object.create(Sprite_Base.prototype);
	Sprite_MapAnimation.prototype.constructor = Sprite_MapAnimation;

	Sprite_MapAnimation.prototype.initialize = function (animation) {
		Sprite_Base.prototype.initialize.call(this);
		this.z = 8;
		this._realX = this.x;
		this._realY = this.y;
		this._animation = animation;
		this._hasStarted = false;
	};

	Sprite_MapAnimation.prototype.update = function () {
		Sprite_Base.prototype.update.call(this);
		this.updatePosition();
		if (!this._hasStarted && this.parent) {
			this.startAnimation(this._animation, false, 0);
			this._hasStarted = true;
		}
		if (this._hasStarted && !this.isAnimationPlaying()) {
			QABSManager.removeAnimation(this);
		}
	};

	Sprite_MapAnimation.prototype.updatePosition = function () {
		this.x = this._realX;
		this.x -= $gameMap.displayX() * QMovement.tileSize;
		this.y = this._realY;
		this.y -= $gameMap.displayY() * QMovement.tileSize;
	};

	Sprite_MapAnimation.prototype.move = function (x, y) {
		Sprite_Base.prototype.move.call(this, x, y);
		this._realX = x;
		this._realY = y;
		this.updatePosition();
	};
})();

//-----------------------------------------------------------------------------
// Sprite_SkillCollider

function Sprite_SkillCollider() {
	this.initialize.apply(this, arguments);
}

(function () {
	Sprite_SkillCollider.prototype = Object.create(Sprite_Collider.prototype);
	Sprite_SkillCollider.prototype.constructor = Sprite_SkillCollider;

	Sprite_SkillCollider.prototype.initialize = function (collider) {
		Sprite_Collider.prototype.initialize.call(this, collider, -1);
		this.z = 2;
		this.alpha = 0.4;
		this.anchor.x = 0.5;
		this.anchor.y = 0.5;
		this._frameCount = 0;
	};

	Sprite_SkillCollider.prototype.update = function () {
		Sprite_Collider.prototype.update.call(this);
		this.updateAnimation();
	};

	Sprite_SkillCollider.prototype.updateAnimation = function () {
		this._frameCount++;
		if (this._frameCount > 30) {
			this.alpha += 0.2 / 30;
			this.scale.x += 0.1 / 30;
			this.scale.y = this.scale.x;
			if (this._frameCount === 60) this._frameCount = 0;
		} else {
			this.alpha -= 0.2 / 30;
			this.scale.x -= 0.1 / 30;
			this.scale.y = this.scale.x;
		}
	};
})();

//-----------------------------------------------------------------------------
// Spriteset_Map

(function () {
	var Alias_Spriteset_Map_createLowerLayer = Spriteset_Map.prototype.createLowerLayer;
	Spriteset_Map.prototype.createLowerLayer = function () {
		Alias_Spriteset_Map_createLowerLayer.call(this);
		this._pictures = [];
		this._tempAnimations = [];
	};

	Spriteset_Map.prototype.addPictures = function () {
		this._pictures = QABSManager._pictures;
		if (this._pictures.length === 0) return;
		for (var i = 0; i < this._pictures.length; i++) {
			if (this.children.indexOf(this._pictures[i]) !== -1) continue;
			this._tilemap.addChild(this._pictures[i]);
		}
	};

	Spriteset_Map.prototype.addAnimations = function () {
		this._tempAnimations = QABSManager._animations;
		if (this._tempAnimations.length === 0) return;
		for (var i = 0; i < this._tempAnimations.length; i++) {
			if (this.children.indexOf(this._tempAnimations[i]) !== -1) continue;
			this._tilemap.addChild(this._tempAnimations[i]);
			if (this._tempAnimations[i].isAnimationPlaying()) {
				for (var j = 0; j < this._tempAnimations[i]._animationSprites.length; j++) {
					this._tilemap.addChild(this._tempAnimations[i]._animationSprites[j]);
				}
			}
		}
	};

	var Alias_Spriteset_Map_updateTilemap = Spriteset_Map.prototype.updateTilemap;
	Spriteset_Map.prototype.updateTilemap = function () {
		Alias_Spriteset_Map_updateTilemap.call(this);
		if (this._pictures !== QABSManager._pictures) this.addPictures();
		if (this._tempAnimations !== QABSManager._animations) this.addAnimations();
	};
})();

