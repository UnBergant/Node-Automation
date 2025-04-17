market = document.querySelector("#__next > div > div.flex.flex-1.flex-col.overflow-auto.bg-baseBackgroundL0.text-baseTextHighEmphasis > div > div > div:nth-child(2) > div:nth-child(1) > div > div.flex.flex-col.gap-4 > div.flex.items-center.justify-between.flex-row > div > div.flex.justify-center.flex-col.cursor-pointer.rounded-lg.py-1.text-sm.font-medium.outline-none.hover\\:opacity-90.h-\\[32px\\].text-baseTextHighEmphasis.px-3.bg-baseBackgroundL2");

limit = document.querySelector("#__next > div > div.flex.flex-1.flex-col.overflow-auto.bg-baseBackgroundL0.text-baseTextHighEmphasis > div > div > div:nth-child(2) > div:nth-child(1) > div > div.flex.flex-col.gap-4 > div.flex.items-center.justify-between.flex-row > div > div.flex.justify-center.flex-col.cursor-pointer.rounded-lg.py-1.text-sm.font-medium.outline-none.hover\\:opacity-90.h-\\[32px\\].text-baseTextMedEmphasis.px-3");

buyLongTab = document.querySelector("#__next > div > div.bg-base-background-l0.text-high-emphasis.flex.flex-1.flex-col.overflow-auto > div > div > div.flex.flex-col.gap-2 > div:nth-child(1) > div > div.bg-base-background-l2.flex.h-\\[48px\\].w-full.overflow-hidden.rounded-xl > button.w-full.overflow-hidden.rounded-xl.text-sm.font-semibold.bg-green-background-transparent.text-green-text")

sellShortTab = document.querySelector("#__next > div > div.bg-base-background-l0.text-high-emphasis.flex.flex-1.flex-col.overflow-auto > div > div > div.flex.flex-col.gap-2 > div:nth-child(1) > div > div.bg-base-background-l2.flex.h-\\[48px\\].w-full.overflow-hidden.rounded-xl > button.w-full.rounded-xl.text-sm.font-semibold.text-low-emphasis.hover\\:text-red-text")
buySellButtonSwelector = "#__next > div > div.flex.flex-1 > div > div > div:nth-child(2) > div:nth-child(1) > div > div.flex > div.flex.flex-col > div > button > div";

liquidateMarketSelector = `#__next > div > div.bg-base-background-l0.text-high-emphasis.flex.flex-1.flex-col.overflow-auto > div > div > div.flex.flex-col.flex-1 > div:nth-child(2) > div:nth-child(1) > div > div.w-full.px-4.pb-4 > table > tbody > tr > td:nth-child(10) > div > button:nth-child(2)`
liquidationBuySellButtonSelector = `body > div.fixed.bottom-0.left-0 > div > div > section > div > div > div > div > div > button`

slyderSelector = `[aria-label="Percentage Slider"]`;

const LONG = 'LONG';
const SHORT = 'SHORT';

state = LONG;

changeState = () => {
  state = state === LONG ? SHORT : LONG;
}

set10PercentDepo = () => {
    console.log("🎯 Начинаю настройку ползунка на 10%");
    const slider = document.querySelector('[aria-label="Percentage Slider"] > div');
    
    if (slider) {
      const rect = slider.getBoundingClientRect();
      const centerX = rect.left + rect.width / 5;
      const centerY = rect.top + rect.height / 2;
    
      const mouseDownEvent = new MouseEvent('mousedown', { clientX: centerX, clientY: centerY, bubbles: true, cancelable: true });
      const mouseUpEvent = new MouseEvent('mouseup', { clientX: centerX, clientY: centerY, bubbles: true, cancelable: true });
    
      slider.dispatchEvent(mouseDownEvent);
      console.log("🖱️ Ползунок: mousedown сработал");
      slider.click();
      setTimeout(() => {
        slider.dispatchEvent(mouseUpEvent);
        console.log("🖱️ Ползунок: mouseup сработал");
      }, 100);
    } else {
      console.error("❌ Ползунок не найден");
    }
};

function getRandomDelay() {
  const minSeconds = 5;
  const maxSeconds = 25;
  const randomSeconds = Math.random() * (maxSeconds - minSeconds) + minSeconds;
  console.log(`⏳ Генерируем задержку: ${randomSeconds.toFixed(2)} минут`);
  return randomSeconds * 60 * 1000;
}

function delay(ms) {
  console.log(`⏳ Ждем ${ms} мс...`);
  return new Promise(resolve => setTimeout(resolve, ms));
}

function performClickWithDelay(selector, delayTime) {
  console.log(`🎯 Ищем элемент по селектору: ${selector}`);
  return new Promise(async (resolve, reject) => {
    await delay(delayTime/2);
    const element = document.querySelector(selector);
    if (element) {
      try {
        console.log("✔️ Элемент найден, ждем задержку...");
         await delay(delayTime/2);
        const mouseDownEvent = new MouseEvent("mousedown", { bubbles: true, cancelable: true, view: window });
        const mouseUpEvent = new MouseEvent("mouseup", { bubbles: true, cancelable: true, view: window });

        element.dispatchEvent(mouseDownEvent);
        console.log("🖱️ Mousedown отправлен");
        await delay(100);
        element.dispatchEvent(mouseUpEvent);
        element.click();
        console.log("🖱️ Клик завершен");

        resolve();
      } catch (error) {
        reject(error);
      }
    } else {
      reject(new Error("❌ Элемент не найден: " + selector));
    }
  });
}

trade = () => {
  const loop = () => {
    try {
      const randomDelay = getRandomDelay();
      console.log(`⏱️ Следующая операция через ${Math.round(randomDelay / 60000)} минут`);
      setTimeout(() => {
        setPosition();
        loop();
      }, randomDelay);
    } catch (e) {
      console.error(e);
    }
  };
  setPosition();
  loop();
};

setPosition = async () => {
  console.log("🔄 Установка позиции...");
  await performClickWithDelay(liquidateMarketSelector, 1000);
  await performClickWithDelay(liquidationBuySellButtonSelector, 1000);
  await delay(3000);
  if (state === LONG) {
    console.log("🟩 LONG выбран");
    sellShortTab.click();
  } else {
    console.log("🟥 SHORT выбран");
    buyLongTab.click();
  }
  await delay(1000);
  await set10PercentDepo();
  await delay(2000);
  await performClickWithDelay(buySellButtonSwelector, 1000);
  await delay(100);
  changeState();
  console.log("🔁 Состояние изменено");
};

trade();
