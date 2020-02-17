
/**
 *
 *
 * @export
 * @interface IConnectionData
 */
export interface IConnectionData {
    /**
     *
     *
     * @type {string}
     * @memberof IConnectionData
     */
    host: string;
    /**
     *
     *
     * @type {string}
     * @memberof IConnectionData
     */
    user: string;
    /**
     *
     *
     * @type {string}
     * @memberof IConnectionData
     */
    secretName: string;
    /**
     *
     *
     * @type {string}
     * @memberof IConnectionData
     */
    database: string;
    /**
     *
     *
     * @type {boolean}
     * @memberof IConnectionData
     */
    waitForConnections: boolean;
    /**
     *
     *
     * @type {number}
     * @memberof IConnectionData
     */
    connectionLimit: number;
    /**
     *
     *
     * @type {number}
     * @memberof IConnectionData
     */
    queueLimit: number;
}