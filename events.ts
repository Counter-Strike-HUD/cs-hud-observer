/*
  Player equipment buyed on server
*/

interface BuyEquip{
  event_name: 'buy_equipment';
  weapon_id: string | number;
  weapon_buyer: string;
  weapon_price: number;
  weapon_name: string;
  weapon_altname: string;
}

// User kalle buys deagle for 650$
const equipresponse : BuyEquip = {
  event_name: 'buy_equipment',
  weapon_id: 26,
  weapon_buyer: 'STEAM_0:1:115179770',
  weapon_price: 650,
  weapon_name: "deagle",
  weapon_altname: "nighthawk"
}


/*
  Say event
*/

interface SayEvent{
  event_name: 'user_say';
  message_invoker: string;
  message: string;
}

// User kalle say "hello"
const sayresponse : SayEvent = {
  event_name: 'user_say',
  message_invoker: 'STEAM_0:1:115179770',
  message: 'hello',
}



/*
  Kill event
*/

interface KillEvent{
  event_name: 'kill',
  weapon_id: number;
  headshot: boolean;
  killer_id: string;
  killer_flashed: boolean;
  victim_id: string;
  victim_flashed: boolean;
  suicide: boolean;
  wallbang: boolean;
  suicide_reason: 'weapon_hegrenade' | 'fall' | 'weapon_c4' | '';
}

// User kalle kills damper with deagle - headshot
const killresponse : KillEvent = {
  event_name: 'kill',
  weapon_id: 26,
  headshot: true,
  killer_id: 'STEAM_0:1:115179770',
  killer_flashed: true,
  victim_id: 'STEAM_0:1:115179770',
  victim_flashed: false,
  suicide: false,
  wallbang: false,
  suicide_reason: ''
}




/**
 * Damage
 * Event when player gets damage
 */

interface DamageEvent{
  event_name: 'damage',
  weapon_id: number;
  attacker_id: string;
  health_reduced: number;
  health: number;
  victim_id: string;
}

// User kalle kills damper with deagle - headshot
const damageresponse : DamageEvent = {
  event_name: 'damage',
  weapon_id: 26,
  attacker_id: 'STEAM_0:1:115179770',
  victim_id: 'STEAM_0:1:115179770',
  health_reduced: 20,
  health: 80
}




/*
  C4 start planting
*/

interface C4_Planting{
  event_name: 'c4_planting';
  plant_invoker_id: string; 
  bombsite: 'A' | 'B';
}

// User kalle started planting on A site
const c4plantingresponse : C4_Planting = {
  event_name: 'c4_planting',
  plant_invoker_id: 'STEAM_0:1:115179770',
  bombsite: 'A',
}



/*
  C4 stop planting
*/

interface C4_Planting_Stop{
  event_name: 'c4_planting_stoped';
  plant_invoker_id: string; 
}

// User kalle stopped planting
const c4stoppedplantingresponse : C4_Planting_Stop = {
  event_name: 'c4_planting_stoped',
  plant_invoker_id: 'STEAM_0:1:115179770',
}



/*
  C4 planted
*/

interface C4_Planted{
  event_name: 'c4_planted';
  plant_invoker_id: string; 
  bombsite: 'A' | 'B';
}

// User kalle planted C4 on A site
const c4plantedresponse : C4_Planted = {
  event_name: 'c4_planted',
  plant_invoker_id: 'STEAM_0:1:115179770',
  bombsite: 'A',
}



/*
  C4 start defusing
*/

interface C4_Defusing{
  event_name: 'c4_defusing';
  defuse_invoker_id: string; 
}

// User kalle started defusing
const c4defusingresponse : C4_Defusing = {
  event_name: 'c4_defusing',
  defuse_invoker_id: 'STEAM_0:1:115179770',
}



/*
  C4 stop defusing
*/

interface C4_Defusing_Stop{
  event_name: 'c4_defusing_stopped';
  defuse_invoker_id: string; 
}

// User kalle stopped defusing
const c4stoppeddefusingresponse : C4_Defusing_Stop = {
  event_name: 'c4_defusing_stopped',
  defuse_invoker_id: 'STEAM_0:1:115179770',
}



/*
  C4 defused
*/

interface C4_Defused{
  event_name: 'c4_defused';
  defuse_invoker_id: string; 
}

// User kalle defused C4
const c4defusedresponse : C4_Defused = {
  event_name: 'c4_defused',
  defuse_invoker_id: 'STEAM_0:1:115179770',
}

/*
  C4 exploded
*/

interface C4_Exploded{
  event_name: 'c4_exploded';
  plant_invoker_id: string; 
}

// C4 with planter kalle exploded
const exploded : C4_Exploded = {
  event_name: 'c4_exploded',
  plant_invoker_id: 'STEAM_0:1:115179770',
}



/*
  C4 drop
*/

interface C4_Drop{
  event_name: 'c4_drop';
  user_drop_id: string; 
}

// User kalle drop C4
const c4dropresponse : C4_Drop = {
  event_name: 'c4_drop',
  user_drop_id: 'STEAM_0:1:115179770',
}


/*
  C4 pickup
  Event sent when user pickups C4 
*/

interface C4_Pickup{
  event_name: 'c4_pick';
  user_pick_id: string; 
}

// User kalle picked up C4
const c4pickupresponse : C4_Pickup= {
  event_name: 'c4_pick',
  user_pick_id: 'STEAM_0:1:115179770',
}


/*
  Caster observe event
*/

interface CasterObserveEvent{
  event_name: 'caster_observed_player';
  user_pick_id: string; 
}

// User kalle picked up C4
const casterobserveevent : CasterObserveEvent = {
  event_name: 'caster_observed_player',
  user_pick_id: 'STEAM_0:1:115179770',
}



/**
  Change weapon
  Called when player switches current weapon
*/

interface SwitchCurrentWeapon{
  event_name: 'weapon_switched';
  user_id: string; 
  weapon_id: number;
}

// User kalle changed weapon to deagle
const weaponswitch : SwitchCurrentWeapon = {
  event_name: 'weapon_switched',
  user_id: 'STEAM_0:1:115179770',
  weapon_id: 27
}


/**
  Pickup item
  Called when player pickups something including defuse kit
*/

interface PickupEvent{
  event_name: 'pickup_item';
  user_id: string; 
  item_id: number;
}

// User kalle changed pickups weapon deagle
const pickup : PickupEvent = {
  event_name: 'pickup_item',
  user_id: 'STEAM_0:1:115179770',
  item_id: 27
}


/**
  Drop item
  Called when player drops something 
*/

interface DropEvent{
  event_name: 'drop_item';
  user_id: string; 
  item_id: number;
}

// User kalle have dropped weapon deagle
const drop : DropEvent = {
  event_name: 'drop_item',
  user_id: 'STEAM_0:1:115179770',
  item_id: 27
}



/**
  Money event
  Called when players money changes
*/

interface MoneyEvent{
  event_name: 'money_change';
  user_id: string; 
  current_money: number;
}

// User kalle have now has 3700$
const moeny : MoneyEvent = {
  event_name: 'money_change',
  user_id: 'STEAM_0:1:115179770',
  current_money: 3700
}


/**
  Round win event
  Called when players money changes
*/

interface RoundEndEvent{
  event_name: 'round_end';
  side_win: 'tt' | 'ct'; 
  end_type: 'elimination' | 'c4_exploded' | 'c4_defused'; 
  tt_rounds: number;
  ct_rounds: number;
}

// User kalle have now has 3700$
const round : RoundEndEvent = {
  event_name: 'round_end',
  side_win: 'ct',
  end_type: 'elimination',
  tt_rounds: 11,
  ct_rounds: 14
}


/**
  Nade throw event
  Called when user throws an nade
*/

interface NadeThrowEvent{
  event_name: 'nade_throw';
  invoker_id: string;
  nade_type: string;
}

// User kalle has thrown an smoke
const nadethrow : NadeThrowEvent = {
  event_name: 'nade_throw',
  invoker_id: 'STEAM_0:1:115179770',
  nade_type: 'smokegrenade',
}


/**
  Nade land event
  Called when players money changes
*/

interface NadeLandEvent{
  event_name: 'nade_land';
  invoker_id: string;
  nade_type: string;
  landing_x: number;
  landing_y: number;
  landing_z: number;
}

// Smoke grenade from user kalle has landed on specific cordinates
const nadeland : NadeLandEvent = {
  event_name: 'nade_land',
  invoker_id: 'STEAM_0:1:115179770',
  nade_type: 'smokegrenade',
  landing_x: 1,
  landing_y: 1,
  landing_z: 1
}



/**
  Auth event
  Internal event for client
*/

interface AuthEvent{
  event_name: 'auth';
  authed: boolean;
  message: string;
}

// Client successfully authed
const auth : AuthEvent = {
  event_name: 'auth',
  authed: true,
  message: 'User succesfully authed.'
}






















