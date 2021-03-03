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
  suicide_reason: ''
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
const casterobserveresponse : CasterObserveEvent = {
  event_name: 'caster_observed_player',
  user_pick_id: 'STEAM_0:1:115179770',
}






