![](https://github.com/trapize/connections/workflows/Unit%20Tests/badge.svg)
# Core
Provides an extensible framework design around ease of use to remove much of the boiler plate code for web APIs.

## Installation
`npm install --save @trapize/connections`

## Getting Started
Make sure to include an `ISecretService` in your injection tree, and connection data in your `IAppConfig`

Then simply inject the `IConnectionFactory` into your Repository class and connect.

```javascript
export class MyRepo {
    public constructor(@inject(Connections.IConnectionFactory) private connectionFactory: IConnectionFactory) {}

    public get connection(): Observable<IConnection> {
        return this.connectionFactory.connect('connectionName');
    }
}
```

## Advanced
Checkout the wiki for advanced usage.

https://github.com/trapize/core/wiki

## MIT

Copyright (c) 2020 ztrank

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
