# Internal events used by app

### List

- [Auth event](#auth-event)
- [Game server connected](#game-server-connected)
- [Game server disconnect](#game-server-disconnect)
- [Game socket connected](#game-socket-connected)
- [Game socket disconnect](#game-socket-disconnect)



##Auth event

```ts
interface AuthEvent{
    event_name: 'auth';
    authed: boolean;
    message: string;
}
```

Example:  

```ts
// Client successfully authed
{
    event_name: 'auth',
    authed: true,
    message: 'User succesfully authed.'
}
```


##Game server connected

```ts
interface GameConnectedEvent{
    event_name: 'game_server_connected';
}
```

Example:  

```ts
// Game server successfully connected to game socket
{
    event_name: 'game_server_connected',
}
```

##Game server disconnect

```ts
interface GameDisconnectedEvent{
    event_name: 'game_server_disconnected';
}
```

Example:  

```ts
// Game server has disconnect from game socket
{
    event_name: 'game_server_disconnected',
}
```


##Game socket connected

```ts
interface GameSocketConnectedEvent{
    event_name: 'game_socket_connected';
}
```

Example:  

```ts
// Game socket successfully connected with the client socket
{
    event_name: 'game_socket_connected',
}
```

##Game socket disconnect

```ts
interface GameSocketDisconnectedEvent{
    event_name: 'game_socket_disconnected';
}
```

Example:  

```ts
// Game socket has disconnect (/w client)
{
    event_name: 'game_socket_disconnected',
}
```

