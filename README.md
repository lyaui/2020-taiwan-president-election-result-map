# 2023 Mission 2 - 歷屆總統開票全台地圖

![](https://images.thef2e.com//works/279_2023-11-19T05:34:01.947Z.png)

## 作品說明

根據歷屆中選會提供的資料製作的歷屆總統選舉地圖。
因為縣市升格合併因素，無論是資料計算或與地圖的的顯示都不好處理，礙於時間因此只做了 2012 年以後的部分。

- [2023 THE F2E](https://2023.thef2e.com/news)
- [Design](https://www.figma.com/file/WlsKcXrmUd0lL4f8p3d122/2023-The-F2E-%E7%B8%BD%E7%B5%B1?type=design&node-id=4818%3A2&mode=design&t=7hiLpAoeHHeVItZC-1) (by jhen)
- [Demo](https://taiwan-president-election-result-map.vercel.app/) (by Iris Huang)

## 系統說明

Install the project

```bash
$ npm install
or
$ yarn install
```

Run the project

```bash
$ npm run dev
# or
$ yarn dev
```

## 使用技術

- [Next.js](https://nextjs.org/)
- [Vercel](https://vercel.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Headless UI](https://headlessui.com/)
- [query-string](https://www.npmjs.com/package/query-string)

## 資料夾說明

- `public/` 靜態資源，含：json, icon, images, logo...
- `src/`
  - `app/` 全域樣式、頁面、狀態頁(loading, error)...
  - `components/`
    - `layout/` 頁面結構元件，例如 Navbar, Footer...
    - `UI/` 基礎共用元件，例如 Button, Breadcrumb, Selector...
    - 其餘為頁面區塊使用元件
  - `constants/` 共用常數
  - `pageFunctions` 頁面畫面或資料處理的函式
  - `routers` 頁面路徑相關常數，例如 router, query...
  - `types` 共用的型別，例如候選人資料、個別區域投票結果
  - `utils` 共用的資料處理函式，例如數字轉換成千分號、千分號轉換成數字...

## 第三方服務

無

## TODO

- Map
- FIX: Not found page shallow router problem

THANK YOU!
