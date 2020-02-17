import { IPool } from './IPool';


/**
 *
 *
 * @export
 * @interface IConnectionFactory
 */
export interface IConnectionFactory {
    /**
     *
     *
     * @param {string} name
     * @returns {Promise<IPool>}
     * @memberof IConnectionFactory
     */
    connect(name: string): Promise<IPool>; 
    /**
     *
     *
     * @param {string} name
     * @returns {Promise<IPool>}
     * @memberof IConnectionFactory
     */
    reconnect(name: string): Promise<IPool>;
}