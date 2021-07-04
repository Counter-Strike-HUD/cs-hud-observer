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
Called when player planted c4

## Defusing
Called when player defusing c4

## Defusing Stop
Called when player stop defusing c4

## Defused
Called when player defused c4

## Bomb Dropped
Called when player drop c4

## Bomb Picked Up
Called when player pick up c4
