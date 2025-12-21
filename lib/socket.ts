'use client'

import { usePresenceStore } from '@/hooks/store/presence.store';
import { PresenceMessageDto } from '@/types/socket/presence';
import { Connect } from '@/types/socket/socket';
import { Client, StompSubscription } from '@stomp/stompjs'
import SockJS from 'sockjs-client';


export class ConnectSocket {
    private client: Client | null = null;
    private readonly reconnectDelayMs = 1000;
    private readonly wsUrl = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:5000/api/ws';
    private subscriptions: StompSubscription[] = []

    connect({ accessToken }: Connect) {
        this.client = new Client({
            webSocketFactory: () => new SockJS(this.wsUrl),
            connectHeaders: { Authorization: `Bearer ${accessToken}` },
            reconnectDelay: this.reconnectDelayMs,
        })

        this.client.onConnect = () => {
            this.subscribeAll();
            console.log("Connected");
        }

        this.client.onDisconnect = () => {
            this.clearSubscriptions();
        };

        this.client.activate();
    }
    disconnect() {
        if (this.client) {
            this.client.deactivate()
            this.client = null
        }
    }
    // ======================
    // SUBSCRIBE SECTION
    // ======================
    private subscribeAll() {
        this.subscribePresence()
        // this.subscribeNotification()
    }

    // ======================
    // LISTENER
    // ======================
    private clearSubscriptions() {
        this.subscriptions.forEach((s) => s.unsubscribe())
        this.subscriptions = []
    }

    private subscribePresence() {
        const sub = this.client!.subscribe('/topic/presence', (msg) => {

            const presenceMessageDto: PresenceMessageDto = JSON.parse(msg.body)
            const store = usePresenceStore.getState();
            console.log("hihi" + presenceMessageDto.presence);

            if (presenceMessageDto.presence == "ONLINE") {
                store.userOnline(presenceMessageDto.email)
            }

            if (presenceMessageDto.presence == "OFFLINE") {
                store.userOffline(presenceMessageDto.email)
            }
        })
        this.subscriptions.push(sub)
    }
    // private subscribeNotification() {
    //     const sub = this.client!.subscribe(
    //         '/user/queue/notifications',
    //         (msg) => {
    //             const data = JSON.parse(msg.body)
    //         }
    //     )
    // }

}

export const socket = new ConnectSocket();