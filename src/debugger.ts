import { DebugLevel, IDebugOutput } from "./debugger.data";
import { DebugEntry } from "./debugger.data";

export class Debugger {
  // 輸出工廠
  

  private entries: DebugEntry[] = [];
  private outputImpl: IDebugOutput;

  constructor(
    private debug: boolean, 
    outputImplFactory: () => IDebugOutput
  ) {
    this.outputImpl = outputImplFactory();
  }

  add(entry: DebugEntry) {
    this.entries.push(entry);
  }

  async Output() {
    const filtered = this.debug 
      ? this.entries
      : this.entries.filter(e => e.level === DebugLevel.Error);

    if (filtered.length > 0) {
      await this.outputImpl.writeEntries(filtered);
    }

    // 輸出後清空記錄，避免重複輸出
    this.entries = [];
  }
}
