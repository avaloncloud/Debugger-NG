import { DebugEntry, IDebugOutput } from './debugger.data';

export class DebuggerApiAccess implements IDebugOutput {
  constructor(private apiEndpoint: string) {}

  async writeEntries(entries: DebugEntry[]): Promise<void> {
    if (!this.apiEndpoint) {
      console.warn('未提供 API Endpoint，無法透過 API 寫入日誌。');
      return;
    }

    try {
      const response = await fetch(this.apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(entries)
      });

      if (!response.ok) {
        console.warn(`傳送日誌至 API 失敗，狀態碼：${response.status}`);
      } else {
        console.info('成功將日誌傳送至 API。');
      }
    } catch (error: unknown) {
      console.error('傳送日誌至 API 時發生錯誤：', error);
    }
  }
}
