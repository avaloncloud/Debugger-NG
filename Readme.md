# @avalon-cloud/debugger-ng

`@avalon-cloud/debugger-ng` 是一個適用於 Angular 19 的日誌紀錄套件。  
您可使用此套件輕鬆地在前端收集並輸出日誌至 Console 或透過 API 傳送至後端伺服器進行儲存。

## 特點

- **彈性輸出**：可選擇 Console 或 API 輸出
- **動態控制等級**：`debug=true` 時輸出所有等級 (Info、Warning、Error)，`debug=false` 時僅輸出 Error
- **簡易整合 Angular**：透過 `provideDebugger()` 將 Debugger 實例注入整個應用程式的 DI 系統中

## 安裝

```bash
npm install @avalon-cloud/debugger-ng
```

## 使用
### 基本設定

在您的 `main.ts` 中設定 Debugger API模式:

```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideDebugger, Debugger } from '@avalon-cloud/debugger-ng';

bootstrapApplication(AppComponent, {
  providers: [
    provideDebugger({
      debugOutputType: Debugger.DebugOutputType.Api,
      apiEndpoint: 'https://your-backend.example.com/logs',
      debug: true
    })
  ]
});
```
或是設定 Console 模式:

```typescript
import { provideDebugger, Debugger } from '@avalon-cloud/debugger-ng';

bootstrapApplication(AppComponent, {
  providers: [
    provideDebugger({
      debugOutputType: Debugger.DebugOutputType.Console,
      debug: true
    })
  ]
});
``` 

### 使用 Debugger

在您的元件中使用 Debugger:

```typescript
import { Component } from '@angular/core';
import { Debugger } from '@avalon-cloud/debugger-ng';

@Component({
  selector: 'app-root',
  template: `<h1>我的應用程式</h1>`
})
export class AppComponent {
  constructor(private dbg: Debugger) {
    this.dbg.add({
      level: Debugger.DebugLevel.Info,
      message: 'AppComponent已初始化',
      args: [],
      function: 'AppComponent'
    });

    // 輸出日誌 (透過 API 傳送或於 Console 顯示)
    this.dbg.Output();
  }
}
```

## 選項說明

### debug (boolean)
- `true`: 輸出所有等級 (Info, Warning, Error)
- `false`: 僅輸出 Error 等級
- 預設值為 `true`

### debugOutputType (Debugger.DebugOutputType)
- `Console`: 將日誌輸出至瀏覽器/終端機 Console
- `Api`: 透過 HTTP POST 將日誌傳送至提供的 apiEndpoint URL

### apiEndpoint (string, optional)
- 當 `debugOutputType=Api` 時需提供
- 指定後端接收日誌的 API 位址

## 錯誤處理與注意事項

### 未提供 apiEndpoint 卻選擇 Api 輸出
- 會顯示警告並自動回退到 Console 輸出
- 不會拋出異常

### 不支援的輸出類型
- 若輸入的 debugOutputType 非 Console 或 Api
- 將顯示警告並回退至 Console 輸出

### API 呼叫失敗
- 若使用 Api 輸出時，fetch 請求失敗或狀態碼非 2xx
- 將顯示警告或錯誤訊息
- 不會造成應用程式崩潰

### 前端無法直接連接資料庫
- 本套件設計為前端日誌紀錄，不直接存取資料庫
- 請確保您有對應的後端 API Endpoint 來接收日誌

## 常見問題

### Q: 若我只想在 Console 顯示日誌，需要設定 apiEndpoint 嗎？
A: 不需要。若您選擇 DebugOutputType.Console，不需提供 apiEndpoint。

### Q: 我可以在 App 啟動時設定為 Api，後來改成 Console 嗎？
A: provideDebugger() 在應用啟動時決定輸出類型，若需動態切換可考慮在服務中分別建立兩個 Debugger 實例或重啟應用設定。

