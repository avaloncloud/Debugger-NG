import { Debugger } from '../src/debugger';
import { DebugLevel, DebugEntry, IDebugOutput } from '../src/debugger.data';

class MockOutput implements IDebugOutput {
  entries: DebugEntry[] = [];
  writeEntries(entries: DebugEntry[]): void {
    this.entries.push(...entries);
  }
}

describe('Debugger', () => {
  let debuggerInstance: Debugger;
  let mockOutput: MockOutput;

  beforeEach(() => {
    mockOutput = new MockOutput();
    debuggerInstance = new Debugger(true, () => mockOutput);
  });

  it('should add and output entries', async () => {
    const entry: DebugEntry = {
      level: DebugLevel.Info,
      message: 'Test message',
      args: [],
      function: 'testFunction'
    };

    debuggerInstance.add(entry);
    await debuggerInstance.Output();

    expect(mockOutput.entries.length).toBe(1);
    expect(mockOutput.entries[0]).toEqual(entry);
  });
  it('should filter non-error entries when debug is false', async () => {
    debuggerInstance = new Debugger(false, () => mockOutput);

    const infoEntry: DebugEntry = {
      level: DebugLevel.Info,
      message: 'Info message',
      args: [],
      function: 'testFunction'
    };

    const errorEntry: DebugEntry = {
      level: DebugLevel.Error,
      message: 'Error message',
      args: [],
      function: 'testFunction'
    };

    debuggerInstance.add(infoEntry);
    debuggerInstance.add(errorEntry);
    await debuggerInstance.Output();

    expect(mockOutput.entries.length).toBe(2);
    expect(mockOutput.entries[0]).toEqual(errorEntry);
  });
}); 