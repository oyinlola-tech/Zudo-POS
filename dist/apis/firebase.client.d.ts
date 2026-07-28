export declare class FirebaseClient {
    private fcmUrl;
    private serverKey;
    constructor();
    sendNotification(data: {
        token: string;
        title: string;
        body: string;
        data?: Record<string, string>;
    }): Promise<void>;
}
export declare const firebaseClient: FirebaseClient;
//# sourceMappingURL=firebase.client.d.ts.map