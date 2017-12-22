interface Handshake {
    /**
     * The headers passed along with the request. e.g. 'host',
     * 'connection', 'accept', 'referer', 'cookie'
     */
    headers: any;

    /**
     * The current time, as a string
     */
    time: string;

    /**
     * The remote address of the connection request
     */
    address: string;

    /**
     * Is this a cross-domain request?
     */
    xdomain: boolean;

    /**
     * Is this a secure request?
     */
    secure: boolean;

    /**
     * The timestamp for when this was issued
     */
    issued: number;

    /**
     * The request url
     */
    url: string;

    /**
     * Any query string parameters in the request url
     */
    query: any;
};

export class Client{
    constructor(
        public SocketClient:SocketIO.Client,
        public Handshake: Handshake
    ){

    }
}