/*
  Player equipment buyed on server
*/

interface BuyEquip{
    event_name: string;
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
    event_name: string;
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
    event_name: string;
    weapon_id: number;
    headshot: boolean;
    killer_id: string;
    victim_id: string | '';
    suicide: boolean;
    suicide_reason: 'weapon_hegrenade' | 'fall' | 'weapon_c4' | '';
  }
  
  // User kalle kills damper with deagle - headshot
  const killresponse : KillEvent = {
    event_name: 'kill',
    weapon_id: 26,
    headshot: true,
    killer_id: 'STEAM_0:1:115179770',
    victim_id: 'STEAM_0:1:115179770',
    suicide: false,
    suicide_reason: ''
  }
  
  
  
  /*
    C4 start planting
  */
  
  interface C4_Planting{
    event_name: string;
    plant_invoker_id: string; 
  }
  
  // User kalle started planting
  const c4plantingresponse : C4_Planting = {
    event_name: 'c4_planting',
    plant_invoker_id: 'STEAM_0:1:115179770',
  }
  
  
  
  /*
    C4 stop planting
  */
  
  interface C4_Planting_Stop{
    event_name: string;
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
    event_name: string;
    plant_invoker_id: string; 
  }
  
  // User kalle planted C4
  const c4plantedresponse : C4_Planted = {
    event_name: 'c4_planted',
    plant_invoker_id: 'STEAM_0:1:115179770',
  }
  
  
  
  /*
    C4 start defusing
  */
  
  interface C4_Defusing{
    event_name: string;
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
    event_name: string;
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
    event_name: string;
    defuse_invoker_id: string; 
  }
  
  // User kalle defused C4
  const c4defusedgresponse : C4_Defused = {
    event_name: 'c4_defused',
    defuse_invoker_id: 'STEAM_0:1:115179770',
  }
  
  
  
  
  
  
  
  