import 'reflect-metadata';
import { MySqlConnectionFactory, IConnectionConfig } from '../../src/connections';
import { ISecretService } from '@trapize/secrets-management';
import { MySqlPool } from '../../src/connections/MySql.Pool';


const appData = <IConnectionConfig><any>{
    modules: [],
    secrets: <any>{},
    connections: {
        test: {
            host: 'localhost',
            user: 'user',
            secretName: 'secretName',
            database: 'schema',
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 10
        }
    }
};

const secretService = <ISecretService><any>{
    get: jest.fn().mockImplementation((name: string) => {
        return Promise.resolve(name.toUpperCase());
    })
}

describe('MySql Connection Factory', () => {
    it('Should create a pool', (done) => {
        const createPool = jest.fn();
        createPool.mockImplementation(data => {
            return <any>{};
        });

        const factory = new MySqlConnectionFactory(appData, secretService, createPool);
        factory.connect('test')
            .then(pool => {
                expect(pool).toBeDefined();
                expect(pool).toBeInstanceOf(MySqlPool);
                done();
            })
            .catch(done);
    });

    it('Should used Cached pool', (done) => {
        const createPool = jest.fn();
        createPool.mockImplementation(data => {
            return <any>{};
        });

        const factory = new MySqlConnectionFactory(appData, secretService, createPool);
        factory.connect('test')
            .then(pool => {
                expect(pool).toBeDefined();
                expect(pool).toBeInstanceOf(MySqlPool);
                return factory.connect('test');
            })
            .then(pool => {
                expect(pool).toBeDefined();
                expect(createPool).toHaveBeenCalledTimes(1);
                done();
            })
            .catch(done);
    });

    it('Should used Cached pool, disconnect and create a new pool', (done) => {
        const createPool = jest.fn();
        createPool.mockImplementation(data => {
            return <any>{};
        });

        const factory = new MySqlConnectionFactory(appData, secretService, createPool);
        factory.connect('test')
            .then(pool => {
                expect(pool).toBeDefined();
                expect(pool).toBeInstanceOf(MySqlPool);
                return factory.connect('test');
            })
            .then(pool => {
                expect(pool).toBeDefined();
                expect(createPool).toHaveBeenCalledTimes(1);
                return factory.reconnect('test');
            })
            .then(pool => {
                expect(pool).toBeDefined();
                expect(createPool).toHaveBeenCalledTimes(2);
                done();
            })
            .catch(done);
    });

    it('Should throw an error', (done) => {
        const createPool = jest.fn();
        createPool.mockImplementation(data => {
            return <any>{};
        });

        const factory = new MySqlConnectionFactory(appData, secretService, createPool);
        factory.connect('unknown')
            .then(pool => {
                done('Should have thrown an error');
            })
            .catch(err => {
                done();
            });
    });
});