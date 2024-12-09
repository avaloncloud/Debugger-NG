  // 日誌等級
  export enum DebugLevel {
    Info = 'info',
    Warning = 'warning',
    Error = 'error'
  }

  // 輸出類型
  export enum DebugOutputType {
    Console = 'console',
    Api = 'api'
  }

  // 日誌項目介面
  export interface DebugEntry {
    level: DebugLevel;
    message: string;
    args: string[];
    function: string;
  }

  // 輸出實作介面
  export interface IDebugOutput {
    writeEntries(entries: DebugEntry[]): Promise<void> | void;
  }

  // 工廠選項
  export interface DebuggerFactoryOptions {
    debugOutputType: DebugOutputType;
    apiEndpoint?: string; 
  }