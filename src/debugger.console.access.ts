import { DebugLevel, DebugEntry, IDebugOutput } from './debugger.data';

export class DebuggerConsoleAccess implements IDebugOutput {
  writeEntries(entries: DebugEntry[]): void {
    for (const entry of entries) {
      switch (entry.level) {
        case DebugLevel.Error:
          console.error(`【${entry.function}】${entry.message}`, ...entry.args);
          break;
        case DebugLevel.Warning:
          console.warn(`【${entry.function}】${entry.message}`, ...entry.args);
          break;
        default:
          console.info(`【${entry.function}】${entry.message}`, ...entry.args);
          break;
      }
    }
  }
}
