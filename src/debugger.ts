import { DebugLevel, IDebugOutput } from "./debugger.data";
import { DebugEntry } from "./debugger.data";

export class Debugger {
  // 輸出工廠
  private debug!: boolean;
  private entries: DebugEntry[] = [];
  private outputImpl: IDebugOutput;

  constructor(
    debug: boolean, 
    outputImplFactory: () => IDebugOutput
  ) {
    this.debug = debug; 
    this.outputImpl = outputImplFactory();
  }

  add(entry: DebugEntry) {
    this.entries.push(entry);
  }

  setDebug(debug: boolean) {
    this.debug = debug;
  }

  async Output(): Promise<void> {
    const hasError = this.entries.some(e => e.level === DebugLevel.Error);
    if (hasError || this.debug) {
      await this.outputImpl.writeEntries(this.entries);
    }

    // 輸出後清空記錄，避免重複輸出
    this.entries = [];
  }
}
