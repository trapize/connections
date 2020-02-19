import { injectable, inject, optional } from 'inversify';
import { IConnectionFactory } from './IConnection.Factory';
import { Pool, createPool } from 'mysql';
import { IPool } from './IPool';
import { ConnectionSymbols } from './Connection.Symbols';
import { ISecretService, Secrets } from '@trapize/secrets-management';
import { MySqlPool } from './MySql.Pool';
import { MySqlException } from './exceptions/MySql.Exception';
import { Core } from '@trapize/core';
import { IConnectionConfig } from './IConnection.Config';


/**
 * MySql Implementation for the Connection Factory
 *
 * @export
 * @class MySqlConnectionFactory
 * @implements {IConnectionFactory}
 */
@injectable()
export class MySqlConnectionFactory implements IConnectionFactory {
    /**
     *
     *
     * @private
     * @type {Map<string, IPool>}
     * @memberof MySqlConnectionFactory
     */
    private pools: Map<string, IPool> = new Map<string, IPool>();
    /**
     *
     *
     * @private
     * @type {Map<string, string>}
     * @memberof MySqlConnectionFactory
     */
    private queryCache: Map<string, string> = new Map<string,string>();
    /**
     *
     *
     * @private
     * @memberof MySqlConnectionFactory
     */
    private createPoolFn: (data: any) => Pool;


    /**
     * Creates an instance of MySqlConnectionFactory.
     * @param {IAppConfig} appConfig
     * @param {ISecretService} secretService
     * @param {(data: any) => Pool} [createPoolFunction]
     * @memberof MySqlConnectionFactory
     */
    public constructor(
        @inject(Core.Configuration.IAppConfig) private appConfig: IConnectionConfig,
        @inject(Secrets.ISecretService) private secretService: ISecretService,
        @inject(ConnectionSymbols.CreatePool) @optional() createPoolFunction?: (data: any) => Pool
    ) {
        this.createPoolFn = createPoolFunction || createPool;
    }


    /**
     *
     *
     * @param {string} name
     * @returns {Promise<IPool>}
     * @memberof MySqlConnectionFactory
     */
    public async connect(name: string): Promise<IPool> {
        const cached = this.pools.get(name);
        if(cached) {
            return cached;
        }
        else {
            const newPool = await this.createPool(name);
            this.pools.set(name, newPool);
            return newPool;
        }
    }


    /**
     *
     *
     * @param {string} name
     * @returns {Promise<IPool>}
     * @memberof MySqlConnectionFactory
     */
    public async reconnect(name: string): Promise<IPool> {
        this.pools.delete(name);
        return this.connect(name);
    }


    /**
     *
     *
     * @private
     * @param {string} name
     * @returns {Promise<IPool>}
     * @memberof MySqlConnectionFactory
     */
    private async createPool(name: string): Promise<IPool> {
        const data = this.appConfig.connections[name];
        if(!data) {
            throw new MySqlException.ConnectionConfigurationException({name});
        }
        const secret = await this.secretService.get(data.secretName);

        return new MySqlPool(this.createPoolFn({
            host: data.host,
            user: data.user,
            password: secret,
            database: data.database,
            waitForConnections: data.waitForConnections,
            connectionLimit: data.connectionLimit,
            queueLimit: data.queueLimit
        }), this.queryCache);
    }
    
}