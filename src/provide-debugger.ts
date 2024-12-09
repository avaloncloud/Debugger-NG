import { Debugger } from './debugger';
import { DebugOutputType } from './debugger.data';
import { OutputFactory } from './debugger.factory';
import { Provider } from '@angular/core';

export interface ProvideDebuggerOptions {
  debugOutputType: DebugOutputType;
  apiEndpoint?: string;
  debug?: boolean;
}

export function provideDebugger(options: ProvideDebuggerOptions): Provider {
  return {
    provide: Debugger,
    useFactory: () => {
      const factory = OutputFactory.create({
        debugOutputType: options.debugOutputType,
        apiEndpoint: options.apiEndpoint
      });
      return new Debugger(options.debug ?? true, factory);
    }
  };
}
