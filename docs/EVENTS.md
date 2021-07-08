# Server connection events


### List of the events with examples

- [Buy Equipment](#buy-equipment)
- [Kill](#kill)
- [Say](#say)
- [Planting](#planting)
- [Planting Stop](#planting-stop)
- [Planted](#planted)
- [Defusing](#defusing)
- [Defusing Stop](#defusing-stop)
- [Defused](#defused)
- [Bomb Dropped](#bomb-dropped)
- [Bomb Picked Up](#bomb-picked-up)
- [Caster observe event](#caster-event)
- [Switch current weapon](#switch-current-weapon)
- [Pickup event](#pickup-event)
- [Drop event](#drop-event)
- [Money change](#money-change)
- [Round end event](#round-end-event)
- [Nade throw event](#nade-throw-event)
- [Nade land event](#nade-land-event)

## Buy Equipment

```ts
interface BuyEquip{
    event_name: 'buy_equipment';
    weapon_id: number;
    weapon_buyer: string;
    weapon_price: number;
    weapon_name: string;
    weapon_altname: string;
}
```

Example: 

```ts
//User kalle buys deagle for 650$
{
    event_name: 'buy_equipment',
    weapon_id: 26,
    weapon_buyer: 'STEAM_0:1:115179770',
    weapon_price: 650,
    weapon_name: "deagle",
    weapon_altname: "nighthawk"
}

```

Scripting reference documentation for this [event](https://github.com/kallefrombosnia/cs-hud-observer/blob/master/game/README.md#buy-equipment)

## Kill

```ts
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
```

Example: 

```ts
// User kalle kills damper with deagle - headshot
{
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
```

Scripting reference documentation for this [event](https://github.com/kallefrombosnia/cs-hud-observer/blob/master/game/README.md#buy-equipment)

## Say

```ts
interface SayEvent{
    event_name: 'user_say';
    message_invoker: string;
    message: string;
}
```
Example:

```ts
// User kalle say "hello"
{
    event_name: 'user_say',
    message_invoker: 'STEAM_0:1:115179770',
    message: 'hello'
}
```


## Planting

```ts
interface C4_Planting{
    event_name: 'c4_planting';
    plant_invoker_id: string; 
    bombsite: 'A' | 'B';
}
```

Example:

```ts
// User kalle started planting on A site
{
    event_name: 'c4_planting',
    plant_invoker_id: 'STEAM_0:1:115179770',
    bombsite: 'A'
}
```

## Planting Stop

```ts
interface C4_Planting_Stop{
    event_name: 'c4_planting_stoped';
    plant_invoker_id: string; 
}
```

Example:

```ts
// User kalle stopped planting
{
    event_name: 'c4_planting_stoped',
    plant_invoker_id: 'STEAM_0:1:115179770'
}
```

## Planted

```ts
interface C4_Planted{
    event_name: 'c4_planted';
    plant_invoker_id: string; 
    bombsite: 'A' | 'B';
}
```

Example:  

```ts
// User kalle planted C4 on A site
{
    event_name: 'c4_planted',
    plant_invoker_id: 'STEAM_0:1:115179770',
    bombsite: 'A',
}
```


## Defusing

```ts
interface C4_Defusing{
    event_name: 'c4_defusing';
    defuse_invoker_id: string; 
}
```

Example:  

```ts
// User kalle started defusing
{
    event_name: 'c4_defusing',
    defuse_invoker_id: 'STEAM_0:1:115179770',
}
```

## Defusing Stop

```ts
interface C4_Defusing_Stop{
    event_name: 'c4_defusing_stopped';
    defuse_invoker_id: string; 
}
```

Example:  

```ts
// User kalle stopped defusing
{
    event_name: 'c4_defusing_stopped',
    defuse_invoker_id: 'STEAM_0:1:115179770',
}
```

## Defused

```ts
interface C4_Defused{
    event_name: 'c4_defused';
    defuse_invoker_id: string; 
}
```

Example:  

```ts
// User kalle defused C4
{
    event_name: 'c4_defused',
    defuse_invoker_id: 'STEAM_0:1:115179770',
}
```

## Bomb exploded

```ts
interface C4_Exploded{
    event_name: 'c4_exploded';
    plant_invoker_id: string; 
}
```

Example:

```ts
// C4 with planter kalle exploded
{
    event_name: 'c4_exploded',
    plant_invoker_id: 'STEAM_0:1:115179770',
}
```

## Bomb Dropped


```ts
interface C4_Drop{
    event_name: 'c4_drop';
    user_drop_id: string; 
}
```

Example:  

```ts
// User kalle drop C4
{
    event_name: 'c4_drop',
    user_drop_id: 'STEAM_0:1:115179770',
}
```

## Bomb Picked Up

```ts
interface C4_Pickup{
    event_name: 'c4_pick';
    user_pick_id: string; 
}
```

Example:  

```ts
// User kalle picked up C4
{
    event_name: 'c4_pick',
    user_pick_id: 'STEAM_0:1:115179770',
}
```

## Caster observe event

```ts
interface CasterObserveEvent{
    event_name: 'caster_observed_player';
    user_pick_id: string; 
}
```

Example: 


```ts
// User kalle picked up C4
{
    event_name: 'caster_observed_player',
    user_pick_id: 'STEAM_0:1:115179770',
}
```


## Switch current weapon

```ts
interface SwitchCurrentWeapon{
    event_name: 'weapon_switched';
    user_id: string; 
    weapon_id: number;
}
```

Example:  

```ts
// User kalle changed weapon to deagle
{
    event_name: 'weapon_switched',
    user_id: 'STEAM_0:1:115179770',
    weapon_id: 27
}
```

## Pickup event

```ts
interface PickupEvent{
    event_name: 'pickup_item';
    user_id: string; 
    item_id: number;
    current_ammo: number;
    ammo_reserve: number;
}
```

Example: 

```ts
// User kalle changed pickups weapon deagle
{
    event_name: 'pickup_item',
    user_id: 'STEAM_0:1:115179770',
    item_id: 27,
    current_ammo: 4,
    ammo_reserve: 27
}
```

## Drop event

```ts
interface DropEvent{
    event_name: 'drop_item';
    user_id: string; 
    item_id: number;
}
```
Example:  

```ts
// User kalle have dropped weapon deagle
{
    event_name: 'drop_item',
    user_id: 'STEAM_0:1:115179770',
    item_id: 27
}
```


## Money change

```ts
interface MoneyEvent{
    event_name: 'money_change';
    user_id: string; 
    current_money: number;
}
```

Example:

```ts
// User kalle have now has 3700$
{
    event_name: 'money_change',
    user_id: 'STEAM_0:1:115179770',
    current_money: 3700
}
```

## Round end event

```ts
interface RoundEndEvent{
    event_name: 'round_end';
    side_win: 'tt' | 'ct';
    end_type: 'elimination' | 'c4_exploded' | 'c4_defused'; 
    tt_rounds: number;
    ct_rounds: number;
}
```

Example: 

```ts
// CT team wins by eliminating whole TT team
{
    event_name: 'round_end',
    side_win: 'ct',
    end_type: 'elimination',
    tt_rounds: 11,
    ct_rounds: 14
}
```

## Nade throw event

```ts
interface NadeThrowEvent{
    event_name: 'nade_throw';
    invoker_id: string;
    nade_type: string;
}
```

Example:  

```ts
// User kalle has thrown an smoke
{
    event_name: 'nade_throw',
    invoker_id: 'STEAM_0:1:115179770',
    nade_type: 'smokegrenade',
}
```

## Nade land event

```ts
interface NadeLandEvent{
    event_name: 'nade_land';
    invoker_id: string;
    nade_type: string;
    landing_x: number;
    landing_y: number;
    landing_z: number;
}
```

Example: 

```ts
// Smoke grenade from user kalle has landed on specific cordinates
{
    event_name: 'nade_land',
    invoker_id: 'STEAM_0:1:115179770',
    nade_type: 'smokegrenade',
    landing_x: 1,
    landing_y: 1,
    landing_z: 1
}
```


## Bullet state change

This event is periodically sended from server if there is any update on player bullets.
Every 0.1s will be checking to prevent multiple packet send on weapon fire.
This measurement is only to prevent server from lagging.
Client will accept any interval.

```ts
interface BulletChangeEvent{
    event_name: 'ammo_update';
    players: Array<{player_id: string; primary_weapon: { current_ammo: number; ammo_reserve: number;}; secondary_weapon: { current_ammo: number; ammo_reserve: number}}>
}
```

Example: 

```ts
// Ammo for every player contains primary and secondary weapon values
const ammo_update: BulletChangeEvent = {
    event_name: 'ammo_update',
    players: [
        {
            player_id: 'STEAM_0:1:115179770',
            primary_weapon: {
                current_ammo: 30,
                ammo_reserve: 90
            },
            secondary_weapon:{
                current_ammo: 12,
                ammo_reserve: 24
            }
        },
        {
        player_id: 'STEAM_0:1:115179770',
            primary_weapon: {
                current_ammo: 30,
                ammo_reserve: 90
            },
            secondary_weapon:{
                current_ammo: 12,
                ammo_reserve: 24
            }
        },
    ]
}
```



