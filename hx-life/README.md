# 樺鄉安家｜Cloudflare Pages 公司形象網站範本

這是一個純 HTML / CSS / JavaScript 的靜態網站範本，視覺參考名片中的奶油米色、暖棕金、細線與優雅中文字體風格。無需安裝建置工具。

## 網站頁面區塊
- 首頁 Hero
- 關於我們
- 服務項目
- 設計理念／品牌特色
- 最新消息
- 聯絡方式與社群連結
- 手機版導覽選單

## 最簡單的內容修改方式
1. 使用 VS Code、記事本或其他文字編輯器開啟 `content.js`。
2. 修改 `SITE_CONTENT` 中的公司名稱、標題、電話、地址、網址、LINE、Instagram、Email 等欄位。
3. 修改 `SERVICES` 陣列中的服務名稱和介紹。
4. 修改 `NEWS` 陣列中的最新消息。
5. 圖片放在 `images/` 資料夾，並修改 `heroImage` 或 `detailImage` 路徑。
6. 儲存檔案。用瀏覽器開啟 `index.html` 可先預覽。

> 注意：`content.js` 內的 LINE URL、Email、電話等請上線前再次核對。範本中的信箱為示範值 `hello@example.com`，請換成正式信箱。

## 部署至 Cloudflare Pages（直接上傳）
1. 登入 Cloudflare Dashboard。
2. 進入 **Workers & Pages**，選擇建立應用程式／Pages 專案（介面名稱可能調整）。
3. 選擇上傳靜態資產（Direct Upload）。
4. 上傳本資料夾內的網站檔案與 `images` 資料夾內容。請確保 `index.html` 位於發布根目錄。
5. 部署完成後，先測試 Cloudflare 提供的 `*.pages.dev` 網址。
6. 在專案的 **Custom domains** 加入自有網域，依指示完成 DNS 設定。
7. 確認 HTTPS、手機版、電話連結、LINE、Instagram 與聯絡資訊。

## 網域及企業信箱
- 網域註冊可與網站託管分開；務必自行掌握網域帳號及續約權限。
- Cloudflare Pages 不等於企業郵件服務。若需要 `info@yourdomain.com`，請另外選擇郵件服務並設定 MX、SPF、DKIM。
- 若只需收取客戶詢問，可先使用電話、LINE 或既有信箱；真正的網站聯絡表單需要表單服務或後端。

## 重要提醒
- 此範本使用示意 SVG 圖片，不是實際完工案例照片。上線前請替換成公司擁有授權的實景照片。
- 此範本不含後台登入系統；`content.js` 是容易編輯的內容檔，不是網頁表單式 CMS。
- 請勿把密碼、API 金鑰或敏感資料放進前端 JavaScript。
