import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { of } from "rxjs";
import { from } from "rxjs";
import { bufferCount, concatMap, delay, tap } from "rxjs/operators";
import { Server, Socket } from 'socket.io';
import { customerSample, lastUpdateTrackerSample } from "./sampleData";

@WebSocketGateway({namespace : 'map'})
export class MapGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('AppGateway');

  @SubscribeMessage('getFeatures')
  handleMessage(client: Socket, payload: {kota: string}): void {
    console.log('request from client', payload)
    // implement DB query
    const result = customerSample.filter(({properties}) => properties.kota === payload.kota)
    
    // use bufferCount to chunk DB fol
    const CHUNK_SIZE = 10
    from(result).pipe(bufferCount(CHUNK_SIZE),concatMap((val) => of(val).pipe(delay(4000)))).subscribe((customers) => {
      console.log('emit', customers.length)
      this.server.emit('getFeaturesResponse', customers)
    })
  }

  @SubscribeMessage('getLastUpdateTracker')
  getLastUpdate(client: Socket, payload: {kota: string}): void {
    console.log('request from client', payload)
    // implement DB query
    const result = lastUpdateTrackerSample.filter(({slug}) => slug === payload.kota)

    this.server.emit('lastUpdateTrackerResponse', result[0])
  }

  afterInit(server: Server) {
    this.logger.log('Init');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
    const response = new Date();
    client.emit("FromAPI", response);
  }
  
  handleConnection(client: Socket, ...args: any[]) {
    console.log('connect')
    this.logger.log(`Client connected: ${client.id}`);
  }
}
