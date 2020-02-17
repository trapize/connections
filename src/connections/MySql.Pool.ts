import { IPool } from './IPool';
import { Pool } from 'mysql';
import { IConnection } from './IConnection';
import { MySqlConnection } from './MySql.Connection';
import { MySqlException } from './exceptions/MySql.Exception';


/**
 * MySql implementation for Pool
 *
 * @export
 * @class MySqlPool
 * @implements {IPool}
 */
export class MySqlPool implements IPool {


    /**
     *Creates an instance of MySqlPool.
     * @param {Pool} framework
     * @param {Map<string,string>} cache
     * @memberof MySqlPool
     */
    public constructor(public framework: Pool, private cache: Map<string,string>) {}


    /**
     *
     *
     * @template T
     * @param {string} queryString
     * @param {any[]} input
     * @returns {Promise<T>}
     * @memberof MySqlPool
     */
    public query<T = any>(queryString: string, input: any[]): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            this.framework.query(queryString, input, (err, values) => {
                if(err) {
                    reject(new MySqlException.QueryException(err.message, err));
                } else {
                    resolve(values);
                }
            })
        })
    }


    /**
     *
     *
     * @template T
     * @param {string} procedureString
     * @param {any[]} input
     * @returns {Promise<T>}
     * @memberof MySqlPool
     */
    public procedure<T>(procedureString: string, input: any[]): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            this.framework.query(procedureString, input, (err, values) => {
                if(err) {
                    reject(new MySqlException.ProcedureException(err.message, err));
                } else {
                    resolve(values);
                }
            })
        })
    }


    /**
     *
     *
     * @returns {Promise<IConnection>}
     * @memberof MySqlPool
     */
    public getConnection(): Promise<IConnection> {
        return new Promise<IConnection>((resolve, reject) => {
            this.framework.getConnection((err, conn) => {
                if(err) {
                    reject(new MySqlException.MySqlConnectionException(err.message, err));
                } else {
                    resolve(new MySqlConnection(conn, this.cache));
                }
            })
        })
    }


    /**
     *
     *
     * @param {IConnection} connection
     * @memberof MySqlPool
     */
    public release(connection: IConnection): void {
        this.framework.releaseConnection(connection.framework);
    }
    

    /**
     *
     *
     * @param {string} key
     * @param {string} query
     * @memberof MySqlPool
     */
    public cacheQuery(key: string, query: string): void {
        this.cache.set(key, query);
    }


    /**
     *
     *
     * @param {string} key
     * @returns {(string | undefined)}
     * @memberof MySqlPool
     */
    public getQuery(key: string): string | undefined {
        return this.cache.get(key);
    }


}