/* ==========================================================================
   裝修報價單管理系統 - App Core Logic
   ========================================================================== */

const APP_VERSION = "v1.3.1";
const APP_BUILD_DATE = "2026-08-12";

// Default Sample Data (Parsed directly from reference file: 報價單_民權東路一段72號八樓.xlsx)
const SAMPLE_QUOTATION = {
  id: "quote_sample_72_8f",
  quoteNo: "DQ-20260810-72",
  quoteVersion: "V1",
  customerName: "Vincent",
  customerPhone: "0912-345-678",
  decorAddress: "台北市中山區民權東路一段72號八樓",
  propertyType: "電梯大樓",
  quoteDate: "2026-08-10",
  validDays: 30,
  projectMemo: "社區清潔費、保證金另計",
  
  companyName: "樺曏創意設計有限公司",
  bankName: "國泰世華",
  bankBranch: "八德分行",
  bankAccountName: "樺曏創意設計有限公司",
  bankAccountNo: "077035004991",
  
  termsText: "1. 此報價30日內有效\n2. 訂金預付30%，期中款50%、尾款20%\n3. 工程含一年保固",
  
  designFee: 0,
  serviceFeePercent: 8,
  enableTax: true,
  discountName: "專案特惠",
  discountAmount: 0,
  
  categories: [
    {
      id: "cat_1",
      name: "系統櫃工程",
      items: [
        { id: "item_1_1", name: "廚具吊櫃", spec: "W200, 六面結烤", qty: 1, unit: "櫃", price: 32500, note: "" },
        { id: "item_1_2", name: "廚具矮櫃 (G型把手、拉籃)", spec: "W200, 六面結烤", qty: 1, unit: "櫃", price: 32500, note: "" },
        { id: "item_1_3", name: "人造石檯面", spec: "含水槽下崁", qty: 1, unit: "組", price: 17000, note: "" },
        { id: "item_1_4", name: "櫻花油煙機 70cm", spec: "R3012S", qty: 1, unit: "台", price: 6800, note: "" },
        { id: "item_1_5", name: "櫻花IH爐 (單口)", spec: "EG2120AG (220v)", qty: 1, unit: "台", price: 8200, note: "" },
        { id: "item_1_6", name: "櫻花烘碗機 60cm", spec: "Q600C", qty: 1, unit: "台", price: 7500, note: "" },
        { id: "item_1_7", name: "功林水槽+龍頭", spec: "KL-302/ST-7008", qty: 1, unit: "組", price: 4100, note: "" },
        { id: "item_1_8", name: "安裝搬運費", spec: "", qty: 1, unit: "式", price: 4500, note: "" }
      ]
    },
    {
      id: "cat_2",
      name: "拆除工程",
      items: [
        { id: "item_2_1", name: "櫥櫃拆除（8尺內）", spec: "", qty: 1, unit: "式", price: 8000, note: "" },
        { id: "item_2_2", name: "垃圾清運", spec: "", qty: 1, unit: "式", price: 4000, note: "" }
      ]
    },
    {
      id: "cat_3",
      name: "水電工程",
      items: [
        { id: "item_3_1", name: "吸頂燈含安裝 50W", spec: "舞光D-CEN50DM", qty: 1, unit: "件", price: 2800, note: "" },
        { id: "item_3_2", name: "櫥櫃排煙管安裝", spec: "", qty: 1, unit: "式", price: 8000, note: "" },
        { id: "item_3_3", name: "插座面板更換", spec: "", qty: 3, unit: "個", price: 500, note: "" },
        { id: "item_3_4", name: "新增崁燈含開關", spec: "(15cm自然光)", qty: 1, unit: "式", price: 2000, note: "" }
      ]
    },
    {
      id: "cat_4",
      name: "門窗工程",
      items: [
        { id: "item_4_1", name: "PVC摺疊拉門", spec: "240*200", qty: 1, unit: "式", price: 8000, note: "" }
      ]
    },
    {
      id: "cat_5",
      name: "玻璃工程",
      items: [
        { id: "item_5_1", name: "廚房烤漆玻璃", spec: "", qty: 25, unit: "才", price: 450, note: "" }
      ]
    },
    {
      id: "cat_6",
      name: "假設工程",
      items: [
        { id: "item_6_1", name: "公共空間保護", spec: "走道地面、電梯", qty: 1, unit: "式", price: 8000, note: "社區清潔費、保證金另計" }
      ]
    },
    {
      id: "cat_7",
      name: "油漆工程",
      items: [
        { id: "item_7_1", name: "全室油漆(一底二度)", spec: "虹牌全效乳膠漆", qty: 36, unit: "坪", price: 1200, note: "批土、修補另計" }
      ]
    },
    {
      id: "cat_8",
      name: "地板工程",
      items: [
        { id: "item_8_1", name: "超耐磨木地板", spec: "Egger標準版", qty: 11, unit: "坪", price: 4600, note: "含損料" },
        { id: "item_8_2", name: "貼工", spec: "", qty: 1, unit: "工", price: 3000, note: "" }
      ]
    },
    {
      id: "cat_9",
      name: "清潔工程",
      items: [
        { id: "item_9_1", name: "全室細清", spec: "", qty: 12, unit: "坪", price: 800, note: "" }
      ]
    }
  ]
};

// Standard Construction Catalog Presets
const PRESET_ITEMS_CATALOG = [
  { category: "拆除&清運", name: "公共空間保護工程", spec: "防潮布、防刮板雙層保護", unit: "式", price: 6000 },
  { category: "拆除&清運", name: "室內舊有天花板/隔間拆除", spec: "含垃圾袋裝整理", unit: "坪", price: 1500 },
  { category: "拆除&清運", name: "廢棄物清運", spec: "3.5噸卡車", unit: "車", price: 4500 },
  
  { category: "水電工程", name: "全室電線更新(太電/華新)", spec: "2.0mm/5.5mm 銅線", unit: "式", price: 35000 },
  { category: "水電工程", name: "新增專用迴路", spec: "含斷路器", unit: "組", price: 2800 },
  { category: "水電工程", name: "Panasonic 國際牌星光系列插座/開關", spec: "雙插座含接地", unit: "組", price: 650 },
  
  { category: "泥作工程", name: "浴室防水工程", spec: "彈性水泥三度高彈防水", unit: "間", price: 18000 },
  { category: "泥作工程", name: "地磚鋪設", spec: "60x60 拋光石英磚", unit: "坪", price: 5500 },
  
  { category: "木作工程", name: "平頂天花板", spec: "永新防蟲角材 + 台灣麗仕矽酸鈣板", unit: "坪", price: 3600 },
  { category: "木作工程", name: "冷氣包管/窗簾盒", spec: "含矽酸鈣板封板", unit: "尺", price: 650 },
  { category: "木作工程", name: "房間木門組含五金鎖具", spec: "實木複合門", unit: "組", price: 9500 },
  
  { category: "油漆工程", name: "全室批土刷漆", spec: "得利全效合一乳膠漆", unit: "坪", price: 1350 },
  { category: "油漆工程", name: "天花板批土刷漆", spec: "水性水泥漆", unit: "坪", price: 1000 },
  
  { category: "地板工程", name: "SPC防水超耐磨卡扣木地板", spec: "含靜音墊與壓條", unit: "坪", price: 3800 },
  { category: "地板工程", name: "歐聖/Egger 德國進口超耐磨木地板", spec: "AC4磨耗等級", unit: "坪", price: 4800 },
  
  { category: "系統櫃工程", name: "玄關鞋櫃/收納高櫃", spec: "E1級V313防潮系統板材", unit: "尺", price: 3200 },
  { category: "系統櫃工程", name: "主臥主體衣櫃", spec: "含抽屜、掛衣桿、緩衝滑軌", unit: "尺", price: 4200 },
  
  { category: "清潔工程", name: "粗清 (大型廢棄物清掃)", spec: "含掃地與整理", unit: "式", price: 5000 },
  { category: "清潔工程", name: "全室細清 (入住級專業清潔)", spec: "含窗戶拆洗、櫃內吸塵", unit: "坪", price: 900 }
];

// App State Variable
let currentQuote = JSON.parse(JSON.stringify(SAMPLE_QUOTATION));

// Initialize Application
document.addEventListener("DOMContentLoaded", async () => {
  loadQuoteFromLocalStorage();
  renderAll();
  initPresetItemsModal();
  await syncWithSharedProjectDb();
});

/* ==========================================================================
   State & Storage Management (LocalStorage & Folder Shared DB)
   ========================================================================== */

let isSharedServerAvailable = false;

async function syncWithSharedProjectDb() {
  try {
    let res = await fetch('/api/db');
    if (!res.ok) {
      res = await fetch('data/quotations_db.json');
    }
    if (res.ok) {
      const db = await res.json();
      if (db && db.quotations && Array.isArray(db.quotations) && db.quotations.length > 0) {
        isSharedServerAvailable = true;
        localStorage.setItem("deco_quotation_history", JSON.stringify(db.quotations));
        const activeQuote = db.quotations.find(q => q.id === db.currentQuoteId) || db.quotations[0];
        currentQuote = activeQuote;
        saveQuoteToLocalStorage();
        renderAll();
        return true;
      }
    }
  } catch (e) {
    console.log("Using browser LocalStorage mode.", e);
  }
  return false;
}

function debounce(fn, delay) {
  let timer = null;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

function saveQuoteToLocalStorage() {
  try {
    localStorage.setItem("deco_quotation_current", JSON.stringify(currentQuote));
    
    // Also add to history array
    let history = JSON.parse(localStorage.getItem("deco_quotation_history") || "[]");
    const existingIndex = history.findIndex(q => q.id === currentQuote.id);
    if (existingIndex >= 0) {
      history[existingIndex] = currentQuote;
    } else {
      history.unshift(currentQuote);
    }
    localStorage.setItem("deco_quotation_history", JSON.stringify(history));
  } catch (e) {
    console.error("Failed to save to localStorage", e);
  }
}

async function saveSharedProjectDb(showAlert = false) {
  saveQuoteToLocalStorage();
  const history = JSON.parse(localStorage.getItem("deco_quotation_history") || "[]");
  const payload = {
    currentQuoteId: currentQuote.id,
    version: APP_VERSION,
    lastUpdated: new Date().toISOString(),
    quotations: history
  };

  try {
    const res = await fetch('/api/db', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (res.ok) {
      isSharedServerAvailable = true;
      if (showAlert) showToast("已成功將所有報價單紀錄同步儲存至 data/quotations_db.json！");
      return;
    }
  } catch (e) {}

  if (showAlert) {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(payload, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `quotations_db.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast("已下載 quotations_db.json，可覆蓋同資料夾 data/ 內的資料庫檔！");
  }
}

// Debounced background saver - smooth 60fps typing, disk/network save 400ms after typing stops
const debouncedSaveAll = debounce(() => {
  saveQuoteToLocalStorage();
  saveSharedProjectDb();
}, 400);

const debouncedRenderPreview = debounce(() => {
  renderPreview();
}, 150);

function loadQuoteFromLocalStorage() {
  try {
    const saved = localStorage.getItem("deco_quotation_current");
    if (saved) {
      currentQuote = JSON.parse(saved);
    }
    if (currentQuote && currentQuote.termsText && currentQuote.termsText.includes("期中款40%")) {
      currentQuote.termsText = currentQuote.termsText.replace(/期中款40%/g, "期中款50%");
    }
  } catch (e) {
    console.error("Failed to load from localStorage", e);
  }
}

function loadSampleData() {
  currentQuote = JSON.parse(JSON.stringify(SAMPLE_QUOTATION));
  saveQuoteToLocalStorage();
  renderAll();
  showToast("已成功載入「民權東路一段72號八樓」參考範例資料！");
}

function resetClientInfo() {
  currentQuote.customerName = "";
  currentQuote.customerPhone = "";
  currentQuote.decorAddress = "";
  currentQuote.projectMemo = "";
  updateFormFromState();
  renderPreview();
  saveQuoteToLocalStorage();
}

/* ==========================================================================
   UI Mode & Theme Control
   ========================================================================== */

function setAppMode(mode) {
  const appContainer = document.getElementById("appContainer");
  const btnSplit = document.getElementById("btnModeSplit");
  const btnEdit = document.getElementById("btnModeEdit");
  const btnPreview = document.getElementById("btnModePreview");
  
  const editorSection = document.getElementById("editorSection");
  const previewSection = document.getElementById("previewSection");

  // Reset tab buttons
  btnSplit.classList.remove("active");
  btnEdit.classList.remove("active");
  btnPreview.classList.remove("active");

  if (mode === "split") {
    btnSplit.classList.add("active");
    appContainer.className = "app-container split-mode";
    editorSection.style.display = "block";
    previewSection.style.display = "block";
  } else if (mode === "edit") {
    btnEdit.classList.add("active");
    appContainer.className = "app-container";
    editorSection.style.display = "block";
    previewSection.style.display = "none";
  } else if (mode === "preview") {
    btnPreview.classList.add("active");
    appContainer.className = "app-container";
    editorSection.style.display = "none";
    previewSection.style.display = "block";
  }
}

function toggleTheme() {
  const html = document.documentElement;
  const btnTheme = document.getElementById("btnThemeToggle");
  const currentTheme = html.getAttribute("data-theme");
  
  if (currentTheme === "dark") {
    html.setAttribute("data-theme", "light");
    btnTheme.innerHTML = `<i class="fa-solid fa-moon"></i>`;
  } else {
    html.setAttribute("data-theme", "dark");
    btnTheme.innerHTML = `<i class="fa-solid fa-sun"></i>`;
  }
}

/* ==========================================================================
   Form Input Sync & State Calculation Engine
   ========================================================================== */

function updateStateFromForm() {
  currentQuote.quoteNo = document.getElementById("quoteNo").value;
  const verEl = document.getElementById("quoteVersion");
  if (verEl) currentQuote.quoteVersion = verEl.value;

  currentQuote.customerName = document.getElementById("customerName").value;
  currentQuote.customerPhone = document.getElementById("customerPhone").value;
  currentQuote.propertyType = document.getElementById("propertyType").value;
  currentQuote.decorAddress = document.getElementById("decorAddress").value;
  currentQuote.quoteDate = document.getElementById("quoteDate").value;
  currentQuote.validDays = parseInt(document.getElementById("validDays").value) || 30;
  currentQuote.projectMemo = document.getElementById("projectMemo").value;
  
  currentQuote.designFee = parseFloat(document.getElementById("designFee").value) || 0;
  currentQuote.serviceFeePercent = parseFloat(document.getElementById("serviceFeePercent").value) || 0;
  currentQuote.enableTax = document.getElementById("enableTax").value === "true";
  
  const discNameEl = document.getElementById("discountName");
  if (discNameEl) currentQuote.discountName = discNameEl.value;
  const discAmtEl = document.getElementById("discountAmount");
  if (discAmtEl) currentQuote.discountAmount = parseFloat(discAmtEl.value) || 0;

  currentQuote.companyName = document.getElementById("companyName").value;
  currentQuote.bankName = document.getElementById("bankName").value;
  currentQuote.bankBranch = document.getElementById("bankBranch").value;
  currentQuote.bankAccountName = document.getElementById("bankAccountName").value;
  currentQuote.bankAccountNo = document.getElementById("bankAccountNo").value;
  currentQuote.termsText = document.getElementById("termsText").value;

  recalculateCalculations();
  debouncedRenderPreview();
  debouncedSaveAll();
}

function updateFormFromState() {
  document.getElementById("quoteNo").value = currentQuote.quoteNo || "";
  const verEl = document.getElementById("quoteVersion");
  if (verEl) verEl.value = currentQuote.quoteVersion || "V1";

  document.getElementById("customerName").value = currentQuote.customerName || "";
  document.getElementById("customerPhone").value = currentQuote.customerPhone || "";
  document.getElementById("propertyType").value = currentQuote.propertyType || "電梯大樓";
  document.getElementById("decorAddress").value = currentQuote.decorAddress || "";
  document.getElementById("quoteDate").value = currentQuote.quoteDate || new Date().toISOString().split('T')[0];
  document.getElementById("validDays").value = currentQuote.validDays || 30;
  document.getElementById("projectMemo").value = currentQuote.projectMemo || "";
  
  document.getElementById("designFee").value = currentQuote.designFee || 0;
  document.getElementById("serviceFeePercent").value = currentQuote.serviceFeePercent || 8;
  document.getElementById("enableTax").value = currentQuote.enableTax ? "true" : "false";

  const discNameEl = document.getElementById("discountName");
  if (discNameEl) discNameEl.value = currentQuote.discountName || "專案特惠";
  const discAmtEl = document.getElementById("discountAmount");
  if (discAmtEl) discAmtEl.value = currentQuote.discountAmount || 0;
  
  document.getElementById("companyName").value = currentQuote.companyName || "";
  document.getElementById("bankName").value = currentQuote.bankName || "";
  document.getElementById("bankBranch").value = currentQuote.bankBranch || "";
  document.getElementById("bankAccountName").value = currentQuote.bankAccountName || "";
  document.getElementById("bankAccountNo").value = currentQuote.bankAccountNo || "";
  document.getElementById("termsText").value = currentQuote.termsText || "";
}

// Calculation Engine
function computeTotals() {
  let engSubtotal = 0;
  
  currentQuote.categories.forEach(cat => {
    let catSub = 0;
    cat.items.forEach(item => {
      const qty = parseFloat(item.qty) || 0;
      const price = parseFloat(item.price) || 0;
      const sub = Math.round(qty * price * 100) / 100;
      item.subtotal = sub;
      catSub += sub;
    });
    cat.subtotal = catSub;
    engSubtotal += catSub;
  });

  const designFee = parseFloat(currentQuote.designFee) || 0;
  const serviceRate = parseFloat(currentQuote.serviceFeePercent) || 0;
  const serviceFee = Math.round((engSubtotal + designFee) * (serviceRate / 100));
  const untaxedTotal = engSubtotal + designFee + serviceFee;
  
  const taxRate = currentQuote.enableTax ? 0.05 : 0;
  const taxFee = Math.round(untaxedTotal * taxRate);
  const grandTotal = untaxedTotal + taxFee;

  const discountName = currentQuote.discountName !== undefined ? currentQuote.discountName : "專案特惠";
  const discountAmount = parseFloat(currentQuote.discountAmount) || 0;
  const finalTotal = Math.max(0, grandTotal - discountAmount);

  return {
    engSubtotal,
    designFee,
    serviceRate,
    serviceFee,
    untaxedTotal,
    taxFee,
    grandTotal,
    discountName,
    discountAmount,
    finalTotal
  };
}

function recalculateCalculations() {
  const totals = computeTotals();

  // Update Summary Panel in Editor
  document.getElementById("calcEngSubtotal").textContent = formatCurrency(totals.engSubtotal);
  document.getElementById("calcDesignFee").textContent = formatCurrency(totals.designFee);
  document.getElementById("calcServiceRate").textContent = totals.serviceRate;
  document.getElementById("calcServiceFee").textContent = formatCurrency(totals.serviceFee);
  document.getElementById("calcUntaxedTotal").textContent = formatCurrency(totals.untaxedTotal);
  document.getElementById("calcTaxFee").textContent = formatCurrency(totals.taxFee);
  document.getElementById("calcGrandTotal").textContent = formatCurrency(totals.grandTotal);

  const calcDiscountName = document.getElementById("calcDiscountName");
  const calcDiscountAmount = document.getElementById("calcDiscountAmount");
  const calcFinalTotal = document.getElementById("calcFinalTotal");

  if (calcDiscountName) calcDiscountName.textContent = (totals.discountName || "專案特惠") + ":";
  if (calcDiscountAmount) {
    calcDiscountAmount.textContent = totals.discountAmount > 0 ? `-$${Number(totals.discountAmount).toLocaleString()}` : `$0`;
  }
  if (calcFinalTotal) calcFinalTotal.textContent = formatCurrency(totals.finalTotal);

  // Update Category Subtotals in Editor Cards
  currentQuote.categories.forEach(cat => {
    const subEl = document.getElementById(`cat_subtotal_${cat.id}`);
    if (subEl) {
      subEl.textContent = formatCurrency(cat.subtotal);
    }
  });
}

function formatCurrency(amount) {
  return "$" + Number(amount || 0).toLocaleString("zh-TW");
}

/* ==========================================================================
   CRUD Operations for Categories & Items
   ========================================================================== */

const STANDARD_CATEGORIES = [
  "系統櫃工程",
  "拆除工程",
  "水電工程",
  "泥作工程",
  "木作工程",
  "冷氣工程",
  "油漆工程",
  "地板工程",
  "門窗工程",
  "玻璃工程",
  "假設工程",
  "窗簾工程",
  "清潔工程",
  "家電工程",
  "家具工程",
  "弱電工程"
];

function moveCategoryUp(catId) {
  const idx = currentQuote.categories.findIndex(c => c.id === catId);
  if (idx > 0) {
    const temp = currentQuote.categories[idx];
    currentQuote.categories[idx] = currentQuote.categories[idx - 1];
    currentQuote.categories[idx - 1] = temp;
    renderCategories();
    renderPreview();
    saveQuoteToLocalStorage();
    showToast(`已將工種「${temp.name}」上移`);
  }
}

function moveCategoryDown(catId) {
  const idx = currentQuote.categories.findIndex(c => c.id === catId);
  if (idx >= 0 && idx < currentQuote.categories.length - 1) {
    const temp = currentQuote.categories[idx];
    currentQuote.categories[idx] = currentQuote.categories[idx + 1];
    currentQuote.categories[idx + 1] = temp;
    renderCategories();
    renderPreview();
    saveQuoteToLocalStorage();
    showToast(`已將工種「${temp.name}」下移`);
  }
}

function handleCategorySelectChange(catId, selectValue) {
  const cat = currentQuote.categories.find(c => c.id === catId);
  if (cat) {
    if (selectValue === "__CUSTOM__") {
      const customInput = document.getElementById(`cat_custom_input_${catId}`);
      if (customInput) {
        customInput.style.display = "inline-block";
        customInput.focus();
      }
    } else {
      cat.name = selectValue;
      renderCategories();
      renderPreview();
      saveQuoteToLocalStorage();
      showToast(`已切換工種為「${selectValue}」`);
    }
  }
}

function addCategory() {
  const newCatId = "cat_" + Date.now();
  currentQuote.categories.push({
    id: newCatId,
    name: "泥作工程",
    items: [
      { id: "item_" + Date.now(), name: "新工程項目", spec: "", qty: 1, unit: "式", price: 0, note: "" }
    ]
  });
  renderCategories();
  recalculateCalculations();
  renderPreview();
  saveQuoteToLocalStorage();
  showToast("已成功新增工種分類");
}

function deleteCategory(catId) {
  if (currentQuote.categories.length <= 1) {
    alert("至少必須保留一個工種分類！");
    return;
  }
  if (confirm("確定要刪除此工種分類及其所有工程項目嗎？")) {
    currentQuote.categories = currentQuote.categories.filter(c => c.id !== catId);
    renderCategories();
    recalculateCalculations();
    renderPreview();
    saveQuoteToLocalStorage();
    showToast("已刪除工種分類");
  }
}

function updateCategoryName(catId, newName) {
  const cat = currentQuote.categories.find(c => c.id === catId);
  if (cat) {
    cat.name = newName;
    renderPreview();
    saveQuoteToLocalStorage();
  }
}

function addItemToCategory(catId) {
  const cat = currentQuote.categories.find(c => c.id === catId);
  if (cat) {
    const newItemId = "item_" + Date.now();
    cat.items.push({
      id: newItemId,
      name: "",
      spec: "",
      qty: 1,
      unit: "式",
      price: 0,
      note: ""
    });
    renderCategories();
    recalculateCalculations();
    renderPreview();
    saveQuoteToLocalStorage();
    
    // Focus new item input
    setTimeout(() => {
      const nameInput = document.getElementById(`input_name_${newItemId}`);
      if (nameInput) nameInput.focus();
    }, 50);
  }
}

function deleteItem(catId, itemId) {
  const cat = currentQuote.categories.find(c => c.id === catId);
  if (cat) {
    if (cat.items.length <= 1) {
      if (!confirm("此分類只剩下一個項目，確定要刪除嗎？")) return;
    }
    cat.items = cat.items.filter(i => i.id !== itemId);
    renderCategories();
    recalculateCalculations();
    renderPreview();
    saveQuoteToLocalStorage();
  }
}

function updateItemField(catId, itemId, field, value) {
  const cat = currentQuote.categories.find(c => c.id === catId);
  if (cat) {
    const item = cat.items.find(i => i.id === itemId);
    if (item) {
      if (field === "qty" || field === "price") {
        item[field] = parseFloat(value) || 0;
      } else {
        item[field] = value;
      }
      
      // Update cell subtotal
      const sub = Math.round((item.qty || 0) * (item.price || 0) * 100) / 100;
      item.subtotal = sub;
      const subEl = document.getElementById(`subtotal_${itemId}`);
      if (subEl) subEl.textContent = formatCurrency(sub);

      recalculateCalculations();
      debouncedRenderPreview();
      debouncedSaveAll();
    }
  }
}

/* ==========================================================================
   Preset Item Dropdown Selection Logic
   ========================================================================== */

function buildPresetOptionsHtml() {
  const categories = {};
  PRESET_ITEMS_CATALOG.forEach((item, index) => {
    if (!categories[item.category]) {
      categories[item.category] = [];
    }
    categories[item.category].push({ item, index });
  });

  let html = `<option value="">-- 快速套用範本 --</option>`;
  for (const catName in categories) {
    html += `<optgroup label="${escapeHtml(catName)}">`;
    categories[catName].forEach(({ item, index }) => {
      html += `<option value="${index}">${escapeHtml(item.name)} ($${item.price.toLocaleString()}/${escapeHtml(item.unit)})</option>`;
    });
    html += `</optgroup>`;
  }
  return html;
}

function applyPresetToItem(catId, itemId, presetIndexStr) {
  if (!presetIndexStr) return;
  const idx = parseInt(presetIndexStr);
  const preset = PRESET_ITEMS_CATALOG[idx];
  if (!preset) return;

  const cat = currentQuote.categories.find(c => c.id === catId);
  if (cat) {
    const item = cat.items.find(i => i.id === itemId);
    if (item) {
      item.name = preset.name;
      item.spec = preset.spec;
      item.unit = preset.unit;
      item.price = preset.price;
      item.subtotal = Math.round((item.qty || 0) * (item.price || 0) * 100) / 100;
      
      renderCategories();
      recalculateCalculations();
      renderPreview();
      saveQuoteToLocalStorage();
      showToast(`已套用範本「${preset.name}」`);
    }
  }
}

/* ==========================================================================
   Drag & Drop Reordering Logic
   ========================================================================== */

let dragSourceCatId = null;
let dragSourceItemId = null;

function handleDragStart(e, catId, itemId) {
  // If drag started on an input, textarea, select or button, don't drag the row
  if (['INPUT', 'SELECT', 'TEXTAREA', 'BUTTON'].includes(e.target.tagName)) {
    e.preventDefault();
    return;
  }
  
  dragSourceCatId = catId;
  dragSourceItemId = itemId;
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/plain', itemId);
  
  const tr = e.currentTarget;
  if (tr) {
    tr.classList.add('dragging');
  }
}

function handleDragOver(e) {
  if (e.preventDefault) {
    e.preventDefault();
  }
  e.dataTransfer.dropEffect = 'move';
  return false;
}

function handleDragEnter(e) {
  const tr = e.currentTarget;
  if (tr && !tr.classList.contains('dragging')) {
    tr.classList.add('drag-over');
  }
}

function handleDragLeave(e) {
  const tr = e.currentTarget;
  if (tr) {
    tr.classList.remove('drag-over');
  }
}

function handleDrop(e, targetCatId, targetItemId) {
  if (e.preventDefault) e.preventDefault();
  e.stopPropagation();
  
  const tr = e.currentTarget;
  if (tr) tr.classList.remove('drag-over');

  if (dragSourceItemId && (dragSourceItemId !== targetItemId || dragSourceCatId !== targetCatId)) {
    moveItemInState(dragSourceCatId, dragSourceItemId, targetCatId, targetItemId);
  }
  return false;
}

function handleDragEnd(e) {
  document.querySelectorAll('.items-table tr').forEach(tr => {
    tr.classList.remove('dragging');
    tr.classList.remove('drag-over');
  });
  dragSourceCatId = null;
  dragSourceItemId = null;
}

function moveItemInState(sourceCatId, sourceItemId, targetCatId, targetItemId) {
  const sourceCat = currentQuote.categories.find(c => c.id === sourceCatId);
  const targetCat = currentQuote.categories.find(c => c.id === targetCatId);
  if (!sourceCat || !targetCat) return;

  const sourceItemIdx = sourceCat.items.findIndex(i => i.id === sourceItemId);
  if (sourceItemIdx === -1) return;

  const itemToMove = sourceCat.items[sourceItemIdx];

  sourceCat.items.splice(sourceItemIdx, 1);

  const targetItemIdx = targetCat.items.findIndex(i => i.id === targetItemId);
  if (targetItemIdx === -1) {
    targetCat.items.push(itemToMove);
  } else {
    targetCat.items.splice(targetItemIdx, 0, itemToMove);
  }

  renderCategories();
  recalculateCalculations();
  renderPreview();
  saveQuoteToLocalStorage();
  showToast("已調整工程項目順序");
}

/* ==========================================================================
   Render Dynamic UI Components
   ========================================================================== */

function renderAll() {
  updateFormFromState();
  renderCategories();
  recalculateCalculations();
  renderPreview();
}

function renderCategories() {
  const container = document.getElementById("categoriesContainer");
  container.innerHTML = "";

  currentQuote.categories.forEach((cat, catIdx) => {
    const catCard = document.createElement("div");
    catCard.className = "category-card";
    
    let itemsRowsHtml = "";
    cat.items.forEach((item, itemIdx) => {
      const itemSub = Math.round((item.qty || 0) * (item.price || 0) * 100) / 100;
      
      itemsRowsHtml += `
        <tr class="item-row"
            ondragover="handleDragOver(event)"
            ondragenter="handleDragEnter(event)"
            ondragleave="handleDragLeave(event)"
            ondrop="handleDrop(event, '${cat.id}', '${item.id}')">
          <td style="width: 32px; text-align: center;"
              draggable="true"
              ondragstart="handleDragStart(event, '${cat.id}', '${item.id}')"
              ondragend="handleDragEnd(event)">
            <i class="fa-solid fa-grip-vertical drag-handle" title="按住拖動項目順序"></i>
          </td>
          <td style="width: 40px; text-align: center; font-weight: 600; color: var(--text-muted); font-size: 0.8rem; font-family: var(--font-mono);">
            ${(itemIdx + 1).toString().padStart(2, '0')}
          </td>
          <td style="min-width: 150px;">
            <input type="text" class="item-input" id="input_name_${item.id}" value="${escapeHtml(item.name)}" 
              placeholder="項目名稱" oninput="updateItemField('${cat.id}', '${item.id}', 'name', this.value)">
          </td>
          <td style="min-width: 130px;">
            <input type="text" class="item-input" value="${escapeHtml(item.spec)}" 
              placeholder="規格 / 型號" oninput="updateItemField('${cat.id}', '${item.id}', 'spec', this.value)">
          </td>
          <td style="width: 95px; min-width: 85px;">
            <input type="number" class="item-input item-input-number" value="${item.qty}" min="0" step="any"
              oninput="updateItemField('${cat.id}', '${item.id}', 'qty', this.value)">
          </td>
          <td style="width: 65px; min-width: 60px;">
            <input type="text" class="item-input" value="${escapeHtml(item.unit)}" 
              placeholder="單位" oninput="updateItemField('${cat.id}', '${item.id}', 'unit', this.value)">
          </td>
          <td style="width: 100px; min-width: 90px;">
            <input type="number" class="item-input item-input-number" value="${item.price}" min="0" step="any"
              oninput="updateItemField('${cat.id}', '${item.id}', 'price', this.value)">
          </td>
          <td class="item-subtotal-cell" id="subtotal_${item.id}" style="width: 100px; min-width: 90px;">
            ${formatCurrency(itemSub)}
          </td>
          <td style="width: 44px; text-align: center;">
            <button class="btn btn-danger btn-icon btn-sm" onclick="deleteItem('${cat.id}', '${item.id}')" title="刪除此細項">
              <i class="fa-solid fa-trash"></i>
            </button>
          </td>
        </tr>
      `;
    });

    const optionsHtml = STANDARD_CATEGORIES.map(name => 
      `<option value="${escapeHtml(name)}" ${cat.name === name ? 'selected' : ''}>${escapeHtml(name)}</option>`
    ).join('') + `<option value="__CUSTOM__" ${!STANDARD_CATEGORIES.includes(cat.name) ? 'selected' : ''}>✏️ 自訂工種...</option>`;

    const isCustom = !STANDARD_CATEGORIES.includes(cat.name);

    catCard.innerHTML = `
      <div class="category-header">
        <div style="display: flex; align-items: center; gap: 0.5rem; flex: 1;">
          <span style="font-size: 0.75rem; background: var(--bg-card); color: var(--accent-amber); padding: 0.15rem 0.45rem; border-radius: var(--radius-sm); font-weight: 700; font-family: var(--font-mono); border: 1px solid var(--border-color);" title="工種類別編號">
            工種 ${(catIdx + 1).toString().padStart(2, '0')}
          </span>
          <div style="display: flex; gap: 2px;">
            <button class="btn btn-secondary btn-icon btn-sm" onclick="moveCategoryUp('${cat.id}')" 
              title="上移此工種區塊順序" ${catIdx === 0 ? 'disabled style="opacity:0.3; cursor:not-allowed;"' : ''}>
              <i class="fa-solid fa-arrow-up"></i>
            </button>
            <button class="btn btn-secondary btn-icon btn-sm" onclick="moveCategoryDown('${cat.id}')" 
              title="下移此工種區塊順序" ${catIdx === currentQuote.categories.length - 1 ? 'disabled style="opacity:0.3; cursor:not-allowed;"' : ''}>
              <i class="fa-solid fa-arrow-down"></i>
            </button>
          </div>
          <i class="fa-solid fa-folder" style="color: var(--accent-amber); margin-left: 0.25rem;"></i>
          <select class="category-select-dropdown" onchange="handleCategorySelectChange('${cat.id}', this.value)">
            ${optionsHtml}
          </select>
          <input type="text" class="category-name-input" id="cat_custom_input_${cat.id}"
            value="${escapeHtml(cat.name)}" 
            style="${isCustom ? 'display: inline-block;' : 'display: none;'}"
            placeholder="請輸入自訂工種名稱" onchange="updateCategoryName('${cat.id}', this.value)">
        </div>
        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <div class="category-subtotal">
            分類小計: <span id="cat_subtotal_${cat.id}">${formatCurrency(cat.subtotal || 0)}</span>
          </div>
          <button class="btn btn-secondary btn-sm" onclick="addItemToCategory('${cat.id}')">
            <i class="fa-solid fa-plus"></i> 新增細項
          </button>
          <button class="btn btn-danger btn-icon btn-sm" onclick="deleteCategory('${cat.id}')" title="刪除整個工種">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
      </div>
      <div class="items-table-wrapper">
        <table class="items-table">
          <thead>
            <tr>
              <th style="width: 32px;"></th>
              <th style="width: 55px; min-width: 55px; text-align: center; white-space: nowrap;">項次</th>
              <th style="min-width: 150px;">項目名稱</th>
              <th style="min-width: 130px;">規格說明</th>
              <th style="width: 95px; text-align: right;">數量</th>
              <th style="width: 65px;">單位</th>
              <th style="width: 100px; text-align: right;">單價 ($)</th>
              <th style="width: 100px; text-align: right;">小計 ($)</th>
              <th style="width: 44px; text-align: center;">操作</th>
            </tr>
          </thead>
          <tbody>
            ${itemsRowsHtml}
          </tbody>
        </table>
      </div>
    `;
    container.appendChild(catCard);
  });
}

function renderPreview() {
  const totals = computeTotals();

  // Basic info sync
  document.getElementById("prevCompanyName").textContent = currentQuote.companyName || "樺曏創意設計有限公司";
  document.getElementById("prevCustomerName").textContent = currentQuote.customerName || "—";
  document.getElementById("prevCustomerPhone").textContent = currentQuote.customerPhone || "—";
  document.getElementById("prevDecorAddress").textContent = currentQuote.decorAddress || "—";
  document.getElementById("prevPropertyType").textContent = currentQuote.propertyType || "—";
  document.getElementById("prevQuoteNo").textContent = currentQuote.quoteNo || "—";
  const verPrev = document.getElementById("prevQuoteVersion");
  if (verPrev) verPrev.textContent = currentQuote.quoteVersion || "V1";
  document.getElementById("prevQuoteDate").textContent = currentQuote.quoteDate || "—";
  
  // Calculate expiry date
  if (currentQuote.quoteDate && currentQuote.validDays) {
    const d = new Date(currentQuote.quoteDate);
    d.setDate(d.getDate() + parseInt(currentQuote.validDays));
    document.getElementById("prevValidDate").textContent = d.toISOString().split('T')[0];
  } else {
    document.getElementById("prevValidDate").textContent = "—";
  }

  document.getElementById("prevProjectMemo").textContent = currentQuote.projectMemo || "無";

  // Render preview table items
  const tbody = document.getElementById("prevItemsBody");
  tbody.innerHTML = "";

  let globalSeqIndex = 1;
  const CHINESE_NUMS = ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二", "十三", "十四", "十五", "十六", "十七", "十八", "十九", "二十"];

  currentQuote.categories.forEach((cat, catIdx) => {
    const catNumStr = CHINESE_NUMS[catIdx] || (catIdx + 1);

    // Category Header Row
    const catRow = document.createElement("tr");
    catRow.className = "category-row";
    catRow.innerHTML = `
      <td colspan="8" style="padding: 6px 10px; background: #e2e8f0; font-weight: 700; color: #0f172a;">
        ${catNumStr}、${escapeHtml(cat.name)}
      </td>
    `;
    tbody.appendChild(catRow);

    // Category Item Rows
    cat.items.forEach((item) => {
      const tr = document.createElement("tr");
      const sub = Math.round((item.qty || 0) * (item.price || 0) * 100) / 100;
      tr.innerHTML = `
        <td class="text-center" style="color: #64748b; font-weight: 600; font-size: 8.5pt;">${globalSeqIndex}</td>
        <td style="color: #475569;">${escapeHtml(cat.name)}</td>
        <td style="font-weight: 600;">${escapeHtml(item.name || "—")}</td>
        <td>${escapeHtml(item.spec || "—")}</td>
        <td class="text-center">${item.qty || 0}</td>
        <td class="text-center">${escapeHtml(item.unit || "—")}</td>
        <td class="text-right">${Number(item.price || 0).toLocaleString()}</td>
        <td class="text-right" style="font-weight: 600;">${Number(sub).toLocaleString()}</td>
      `;
      tbody.appendChild(tr);
      globalSeqIndex++;
    });

    // Category Subtotal Row
    const subRow = document.createElement("tr");
    subRow.className = "subtotal-row";
    subRow.innerHTML = `
      <td colspan="7" class="text-right" style="font-weight: 700; color: #475569; font-size: 8.5pt;">
        【${escapeHtml(cat.name)}】 小計:
      </td>
      <td class="text-right" style="font-weight: 700; color: #0f172a;">
        $${Number(cat.subtotal || 0).toLocaleString()}
      </td>
    `;
    tbody.appendChild(subRow);
  });

  // Summary Table sync
  document.getElementById("prevEngSubtotal").textContent = "$" + Number(totals.engSubtotal).toLocaleString();
  document.getElementById("prevDesignFee").textContent = "$" + Number(totals.designFee).toLocaleString();
  document.getElementById("prevServiceRate").textContent = totals.serviceRate;
  document.getElementById("prevServiceFee").textContent = "$" + Number(totals.serviceFee).toLocaleString();
  document.getElementById("prevUntaxedTotal").textContent = "$" + Number(totals.untaxedTotal).toLocaleString();
  document.getElementById("prevTaxFee").textContent = "$" + Number(totals.taxFee).toLocaleString();
  document.getElementById("prevGrandTotal").textContent = "$" + Number(totals.grandTotal).toLocaleString();

  const prevDiscountName = document.getElementById("prevDiscountName");
  const prevDiscountAmount = document.getElementById("prevDiscountAmount");
  const prevFinalTotal = document.getElementById("prevFinalTotal");

  if (prevDiscountName) prevDiscountName.textContent = totals.discountName || "專案特惠";
  if (prevDiscountAmount) {
    prevDiscountAmount.textContent = totals.discountAmount > 0 ? `-$${Number(totals.discountAmount).toLocaleString()}` : `$0`;
  }
  if (prevFinalTotal) prevFinalTotal.textContent = "$" + Number(totals.finalTotal).toLocaleString();

  // Terms & Payment Info
  document.getElementById("prevTermsText").textContent = currentQuote.termsText || "";
  document.getElementById("prevBankName").textContent = currentQuote.bankName || "";
  document.getElementById("prevBankBranch").textContent = currentQuote.bankBranch || "";
  document.getElementById("prevBankAccountName").textContent = currentQuote.bankAccountName || "";
  document.getElementById("prevBankAccountNo").textContent = currentQuote.bankAccountNo || "";
}

/* ==========================================================================
   Preset Items Catalog Modal Operations
   ========================================================================== */

function initPresetItemsModal() {
  const grid = document.getElementById("presetItemsGrid");
  grid.innerHTML = "";

  PRESET_ITEMS_CATALOG.forEach(item => {
    const card = document.createElement("div");
    card.className = "preset-card";
    card.onclick = () => addPresetItemToQuote(item);
    card.innerHTML = `
      <div style="font-size: 0.7rem; color: var(--accent-amber); font-weight: 700; text-transform: uppercase;">
        ${escapeHtml(item.category)}
      </div>
      <div class="preset-card-title">${escapeHtml(item.name)}</div>
      <div class="preset-card-spec">${escapeHtml(item.spec || "無特定規格")}</div>
      <div class="preset-card-price">
        $${item.price.toLocaleString()} / ${escapeHtml(item.unit)}
      </div>
    `;
    grid.appendChild(card);
  });
}

function addPresetItemToQuote(preset) {
  let targetCat = currentQuote.categories.find(c => c.name === preset.category);
  if (!targetCat) {
    // Create new category if not existing
    targetCat = {
      id: "cat_" + Date.now(),
      name: preset.category,
      items: []
    };
    currentQuote.categories.push(targetCat);
  }

  targetCat.items.push({
    id: "item_" + Date.now(),
    name: preset.name,
    spec: preset.spec,
    qty: 1,
    unit: preset.unit,
    price: preset.price,
    note: ""
  });

  renderCategories();
  recalculateCalculations();
  renderPreview();
  saveQuoteToLocalStorage();
  showToast(`已加入「${preset.name}」至 ${targetCat.name}`);
}

function openPresetItemsModal() {
  document.getElementById("presetModal").classList.add("active");
}
function closePresetItemsModal() {
  document.getElementById("presetModal").classList.remove("active");
}

/* ==========================================================================
   Saved Quotes Manager Modal Operations
   ========================================================================== */

function toggleExportMenu(e) {
  if (e) e.stopPropagation();
  const menu = document.getElementById("exportMenu");
  if (menu) {
    menu.classList.toggle("show");
  }
}

document.addEventListener("click", (e) => {
  const menu = document.getElementById("exportMenu");
  if (menu && menu.classList.contains("show")) {
    if (!e.target.closest(".dropdown")) {
      menu.classList.remove("show");
    }
  }
});

function openSavedQuotesModal() {
  renderSavedQuotesList();
  document.getElementById("savedQuotesModal").classList.add("active");
}
function closeSavedQuotesModal() {
  document.getElementById("savedQuotesModal").classList.remove("active");
}

function renderSavedQuotesList() {
  const container = document.getElementById("savedQuotesList");
  if (!container) return;
  container.innerHTML = "";
  
  const history = JSON.parse(localStorage.getItem("deco_quotation_history") || "[]");

  const statusBox = document.createElement("div");
  statusBox.style.cssText = `
    background: var(--bg-card);
    border: 1px solid var(--accent-amber);
    padding: 0.75rem 1rem;
    border-radius: var(--radius-md);
    margin-bottom: 1rem;
    font-size: 0.88rem;
    color: var(--text-main);
  `;
  statusBox.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center;">
      <div>
        <i class="fa-solid fa-hard-drive" style="color: var(--accent-amber);"></i>
        <strong>專案資料庫儲存位置：</strong>
        <code style="background: rgba(0,0,0,0.2); padding: 2px 6px; border-radius: 4px; color: var(--accent-amber);">data/quotations_db.json</code>
      </div>
      <button class="btn btn-secondary btn-sm" onclick="saveSharedProjectDb(true)">
        <i class="fa-solid fa-floppy-disk"></i> 儲存至專案檔
      </button>
    </div>
  `;
  container.appendChild(statusBox);

  if (history.length === 0) {
    const emptyDiv = document.createElement("div");
    emptyDiv.style.cssText = "text-align:center; padding: 2rem; color: var(--text-muted);";
    emptyDiv.textContent = "尚無儲存的歷史報價單紀錄";
    container.appendChild(emptyDiv);
    return;
  }

  history.forEach(q => {
    const item = document.createElement("div");
    item.style.cssText = `
      background: var(--bg-input);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-md);
      padding: 0.85rem 1.25rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    `;
    const isCurrent = q.id === currentQuote.id;

    item.innerHTML = `
      <div>
        <div style="font-weight: 700; color: ${isCurrent ? 'var(--accent-amber)' : 'var(--text-main)'};">
          ${escapeHtml(q.customerName || '未命名客戶')} - ${escapeHtml(q.quoteNo || '無單號')} ${isCurrent ? '(目前的報價單)' : ''}
        </div>
        <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.2rem;">
          地址: ${escapeHtml(q.decorAddress || '未填寫')} | 日期: ${q.quoteDate || '—'}
        </div>
      </div>
      <div style="display: flex; gap: 0.5rem;">
        <button class="btn btn-secondary btn-sm" onclick="switchQuote('${q.id}')">
          <i class="fa-solid fa-folder-open"></i> 載入
        </button>
        <button class="btn btn-danger btn-icon btn-sm" onclick="deleteHistoryQuote('${q.id}')">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    `;
    container.appendChild(item);
  });
}

function createNewQuote() {
  currentQuote = {
    id: "quote_" + Date.now(),
    quoteNo: "DQ-" + new Date().toISOString().slice(0,10).replace(/-/g, '') + "-01",
    quoteVersion: "V1",
    customerName: "新客戶",
    customerPhone: "",
    decorAddress: "",
    propertyType: "電梯大樓",
    quoteDate: new Date().toISOString().split('T')[0],
    validDays: 30,
    projectMemo: "",
    companyName: "樺曏創意設計有限公司",
    bankName: "國泰世華",
    bankBranch: "八德分行",
    bankAccountName: "樺曏創意設計有限公司",
    bankAccountNo: "077035004991",
    termsText: "1. 此報價30日內有效\n2. 訂金預付30%，期中款50%、尾款20%\n3. 工程含一年保固",
    designFee: 0,
    serviceFeePercent: 8,
    enableTax: true,
    discountName: "專案特惠",
    discountAmount: 0,
    categories: [
      {
        id: "cat_" + Date.now(),
        name: "一般工程",
        items: [
          { id: "item_" + Date.now(), name: "工程項目", spec: "", qty: 1, unit: "式", price: 0, note: "" }
        ]
      }
    ]
  };
  saveQuoteToLocalStorage();
  renderAll();
  closeSavedQuotesModal();
  showToast("已建立新報價單！");
}

function switchQuote(quoteId) {
  const history = JSON.parse(localStorage.getItem("deco_quotation_history") || "[]");
  const target = history.find(q => q.id === quoteId);
  if (target) {
    currentQuote = target;
    saveQuoteToLocalStorage();
    renderAll();
    closeSavedQuotesModal();
    showToast(`已載入 ${currentQuote.customerName} 的報價單`);
  }
}

function deleteHistoryQuote(quoteId) {
  if (confirm("確定要刪除此筆報價單歷史紀錄嗎？")) {
    let history = JSON.parse(localStorage.getItem("deco_quotation_history") || "[]");
    history = history.filter(q => q.id !== quoteId);
    localStorage.setItem("deco_quotation_history", JSON.stringify(history));
    renderSavedQuotesList();
    showToast("已刪除報價單紀錄");
  }
}

/* ==========================================================================
   Import / Export JSON Modal Operations
   ========================================================================== */

function openImportExportModal() {
  const el1 = document.getElementById("jsonTextArea");
  const el2 = document.getElementById("jsonTextAreaModal3");
  if (el1) el1.value = JSON.stringify(currentQuote, null, 2);
  if (el2) el2.value = JSON.stringify(currentQuote, null, 2);
  document.getElementById("importExportModal").classList.add("active");
}
function closeImportExportModal() {
  document.getElementById("importExportModal").classList.remove("active");
}

function copyJsonText() {
  const textarea = document.getElementById("jsonTextArea") || document.getElementById("jsonTextAreaModal3");
  if (textarea) {
    textarea.select();
    navigator.clipboard.writeText(textarea.value);
    showToast("JSON 資料已成功複製到剪貼簿！");
  }
}

function getFormattedExportBaseName() {
  const quoteDate = (currentQuote && currentQuote.quoteDate ? currentQuote.quoteDate : '').trim();
  const decorAddress = (currentQuote && currentQuote.decorAddress ? currentQuote.decorAddress : '').trim();
  const quoteVersion = (currentQuote && currentQuote.quoteVersion ? currentQuote.quoteVersion : '').trim();

  const parts = [quoteDate, decorAddress, quoteVersion].filter(Boolean);
  let baseName = parts.join('_');
  if (!baseName) {
    baseName = '報價單';
  }
  return baseName.replace(/[\\/:*?"<>|]/g, '_');
}

function downloadJsonFile() {
  const baseName = getFormattedExportBaseName();
  const filename = `${baseName}.json`;
  const jsonString = JSON.stringify(currentQuote, null, 2);

  const blob = new Blob([jsonString], { type: 'application/json;charset=utf-8;' });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  showToast(`已成功匯出 JSON 報價單：${filename}`);
}

/* Integrated JSON Import & File Picker Logic */

function triggerJsonFileInput() {
  let fileInput = document.getElementById("modalJsonFileInput");
  if (!fileInput) {
    fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.id = "modalJsonFileInput";
    fileInput.accept = ".json";
    fileInput.style.display = "none";
    fileInput.onchange = handleModalJsonFileSelect;
    document.body.appendChild(fileInput);
  }
  fileInput.value = "";
  fileInput.click();
}

function handleModalJsonFileSelect(event) {
  const file = event.target.files && event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    processImportedJsonContent(e.target.result, file.name);
    event.target.value = "";
  };
  reader.onerror = function() {
    alert("讀取 JSON 檔案失敗！");
  };
  reader.readAsText(file, "UTF-8");
}

function handleJsonDragOver(event) {
  event.preventDefault();
  event.stopPropagation();
  const dropzone = document.getElementById("jsonDropzone");
  if (dropzone) dropzone.classList.add("drag-over");
}

function handleJsonDragLeave(event) {
  event.preventDefault();
  event.stopPropagation();
  const dropzone = document.getElementById("jsonDropzone");
  if (dropzone) dropzone.classList.remove("drag-over");
}

function handleJsonDrop(event) {
  event.preventDefault();
  event.stopPropagation();
  const dropzone = document.getElementById("jsonDropzone");
  if (dropzone) dropzone.classList.remove("drag-over");

  const files = event.dataTransfer && event.dataTransfer.files;
  if (files && files.length > 0) {
    const file = files[0];
    if (!file.name.toLowerCase().endsWith(".json")) {
      alert("請選擇或拖曳 .json 格式的檔案！");
      return;
    }
    const reader = new FileReader();
    reader.onload = function(e) {
      processImportedJsonContent(e.target.result, file.name);
    };
    reader.readAsText(file, "UTF-8");
  }
}

function toggleJsonTextPanel() {
  const panel = document.getElementById("jsonTextPanel");
  if (panel) {
    if (panel.style.display === "none" || !panel.style.display) {
      panel.style.display = "block";
      const textarea = document.getElementById("jsonTextArea");
      if (textarea) textarea.value = JSON.stringify(currentQuote, null, 2);
    } else {
      panel.style.display = "none";
    }
  }
}

function processImportedJsonContent(rawText, fileName = "") {
  try {
    const parsed = JSON.parse(rawText);

    // Case 1: Full database payload (quotations_db.json with array of quotations)
    if (parsed.quotations && Array.isArray(parsed.quotations)) {
      if (parsed.quotations.length === 0) {
        throw new Error("匯入的 JSON 專案庫檔案中無任何報價單紀錄");
      }
      localStorage.setItem("deco_quotation_history", JSON.stringify(parsed.quotations));
      const activeQuote = parsed.quotations.find(q => q.id === parsed.currentQuoteId) || parsed.quotations[0];
      currentQuote = activeQuote;
      saveQuoteToLocalStorage();
      saveSharedProjectDb();
      renderAll();
      renderSavedQuotesList();
      showToast(`🎉 已成功匯入專案庫檔案（包含 ${parsed.quotations.length} 筆報價單）！`);
      return;
    }

    // Case 2: Single quotation object
    if (!parsed.categories || !Array.isArray(parsed.categories)) {
      throw new Error("無效的報價單 JSON 格式（缺少 categories 工程類別陣列）");
    }

    if (!parsed.id) {
      parsed.id = "quote_" + Date.now();
    }

    currentQuote = parsed;
    saveQuoteToLocalStorage();
    saveSharedProjectDb();
    renderAll();
    renderSavedQuotesList();
    showToast(`🎉 已成功載入 JSON 報價單「${currentQuote.customerName || currentQuote.quoteNo || '專案'}」！`);
  } catch (e) {
    alert("JSON 載入失敗: " + e.message);
  }
}

function importJsonText() {
  const textarea = document.getElementById("jsonTextArea");
  if (textarea && textarea.value.trim()) {
    processImportedJsonContent(textarea.value);
  } else {
    alert("請先輸入或貼上 JSON 文字內容！");
  }
}

function importJsonTextModal3() {
  const textarea = document.getElementById("jsonTextAreaModal3");
  if (textarea && textarea.value.trim()) {
    processImportedJsonContent(textarea.value);
    closeImportExportModal();
  } else {
    alert("請先輸入或貼上 JSON 文字內容！");
  }
}

/* ==========================================================================
   Export CSV Function (Excel UTF-8 BOM Compatible)
   ========================================================================== */

function exportCsvFile() {
  const totals = computeTotals();
  let csvContent = "\uFEFF"; // UTF-8 BOM for Excel Traditional Chinese support

  // Client & Project Info Header
  csvContent += `裝修工程報價單,,,,,,\n`;
  csvContent += `報價單號,${csvEscape(currentQuote.quoteNo)},報價版號,${csvEscape(currentQuote.quoteVersion || 'V1')},客戶姓名,${csvEscape(currentQuote.customerName)},聯絡電話,${csvEscape(currentQuote.customerPhone)}\n`;
  csvContent += `裝修地址,${csvEscape(currentQuote.decorAddress)},建物類型,${csvEscape(currentQuote.propertyType)},報價日期,${csvEscape(currentQuote.quoteDate)}\n`;
  csvContent += `有效天數,${currentQuote.validDays}日,專案備註,${csvEscape(currentQuote.projectMemo)},,\n\n`;

  // Engineering Items Table Header
  csvContent += `項次,工種分類,項目名稱,規格說明,數量,單位,單價($),複價($),備註\n`;

  let globalItemIndex = 1;
  currentQuote.categories.forEach((cat) => {
    cat.items.forEach((item) => {
      const sub = Math.round((item.qty || 0) * (item.price || 0) * 100) / 100;
      csvContent += `${globalItemIndex},${csvEscape(cat.name)},${csvEscape(item.name)},${csvEscape(item.spec)},${item.qty || 0},${csvEscape(item.unit)},${item.price || 0},${sub},${csvEscape(item.note)}\n`;
      globalItemIndex++;
    });
    // Category Subtotal row
    csvContent += `,,【${csvEscape(cat.name)}】 小計,,,,,${cat.subtotal || 0},\n`;
  });

  // Summary Section
  csvContent += `\n費用摘要,金額($)\n`;
  csvContent += `工程項目小計,${totals.engSubtotal}\n`;
  csvContent += `設計費,${totals.designFee}\n`;
  csvContent += `工程服務費 (${totals.serviceRate}%),${totals.serviceFee}\n`;
  csvContent += `未稅金額,${totals.untaxedTotal}\n`;
  csvContent += `營業稅 (5%),${totals.taxFee}\n`;
  csvContent += `報價總額 (含稅),${totals.grandTotal}\n`;
  csvContent += `${csvEscape(totals.discountName)},-${totals.discountAmount}\n`;
  csvContent += `實收總額 (折後),${totals.finalTotal}\n\n`;

  // Company & Terms Info
  csvContent += `公司名稱,${csvEscape(currentQuote.companyName)}\n`;
  csvContent += `匯款帳號,${csvEscape(currentQuote.bankName)} ${csvEscape(currentQuote.bankBranch)} ${csvEscape(currentQuote.bankAccountName)} ${csvEscape(currentQuote.bankAccountNo)}\n`;
  csvContent += `報價條款,"${csvEscape(currentQuote.termsText).replace(/\n/g, ' ')}"\n`;

  const baseName = getFormattedExportBaseName();
  const filename = `${baseName}.csv`;

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(blob, filename);
  } else {
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  showToast(`已成功匯出 CSV 報價單檔案：${filename}`);
}

function csvEscape(str) {
  if (str === null || str === undefined) return "";
  let s = String(str);
  if (s.includes(",") || s.includes('"') || s.includes("\n")) {
    return '"' + s.replace(/"/g, '""') + '"';
  }
  return s;
}

function openChangelogModal() {
  document.getElementById("changelogModal").classList.add("active");
}
function closeChangelogModal() {
  document.getElementById("changelogModal").classList.remove("active");
}

/* ==========================================================================
   Print / Export Trigger & Helper Functions
   ========================================================================== */

function getExportPdfFileName() {
  return getFormattedExportBaseName();
}

let defaultAppTitle = document.title;

window.addEventListener('beforeprint', () => {
  defaultAppTitle = document.title;
  document.title = getExportPdfFileName();
});

window.addEventListener('afterprint', () => {
  document.title = defaultAppTitle;
});

function triggerPrint() {
  // Ensure mode is split or preview so preview element is rendered
  setAppMode("preview");
  defaultAppTitle = document.title;
  document.title = getExportPdfFileName();
  setTimeout(() => {
    window.print();
  }, 200);
}

function showToast(message) {
  let toast = document.getElementById("appToast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "appToast";
    toast.style.cssText = `
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      background: var(--accent-amber);
      color: #ffffff;
      padding: 0.75rem 1.25rem;
      border-radius: var(--radius-md);
      font-weight: 600;
      box-shadow: var(--shadow-lg);
      z-index: 9999;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      transform: translateY(100px);
      opacity: 0;
    `;
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.style.transform = "translateY(0)";
  toast.style.opacity = "1";

  setTimeout(() => {
    toast.style.transform = "translateY(100px)";
    toast.style.opacity = "0";
  }, 3000);
}

function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
