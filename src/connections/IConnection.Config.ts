import { IAppConfig } from '@trapize/core';
import { IConnectionData } from './IConnection.Data';

export interface IConnectionConfig extends IAppConfig {
    connections: {[name: string]: IConnectionData};
}