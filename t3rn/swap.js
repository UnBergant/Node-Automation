const amountInputSelector = "#root-scroll-container > div > div > div.relative.flex.justify-center > div.border.border-white\\/15.bg-card-2.text-card-foreground.shadow-sm.p-4.md\\:p-6.rounded-\\[1\\.5rem\\].w-full.sm\\:w-\\[484px\\].md\\:w-\\[460px\\].lg\\:w-\\[532px\\] > div > section > div.pt-6.flex.flex-col.gap-3 > form > div > div.flex.flex-col.gap-10.md\\:gap-4.relative > div:nth-child(1) > div > div.bg-white\\/5.p-4.rounded-\\[24px\\].hover\\:bg-white\\/10.transition-colors.w-auto.flex.flex-col.h-\\[117px\\].px-4.relative > input";
const swapButtonSelector = "#root-scroll-container > div > div > div.relative.flex.justify-center > div.border.border-white\\/15.bg-card-2.text-card-foreground.shadow-sm.p-4.md\\:p-6.rounded-\\[1\\.5rem\\].w-full.sm\\:w-\\[484px\\].md\\:w-\\[460px\\].lg\\:w-\\[532px\\] > div > section > div.pt-6.flex.flex-col.gap-3 > form > button";
const newOrderButtonSelector = "#root-scroll-container > div > div > div.relative.flex.justify-center > div.border.border-white\\/15.bg-card-2.text-card-foreground.shadow-sm.p-4.md\\:p-6.rounded-\\[1\\.5rem\\].w-full.sm\\:w-\\[484px\\].md\\:w-\\[460px\\].lg\\:w-\\[532px\\] > div > section > div.pt-4 > a";

const AMOUNT = 0.5;
const TIMEOUT_INTERVAL = 1000;

const CONFIRM_TRANSACTION_TEXT = 'Confirm transaction';

const promisify = (f, arg) => {
    return new Promise((res, rej) => {
        let attemptNumber = 1;
        const intervalId = setInterval(() => {
            const result = f(arg);
            console.log(`attemp ${attemptNumber}`);
            if (result) {
                console.log('success: resolve')
                clearInterval(intervalId);
                res(result);
            }
            attemptNumber++;
        }, TIMEOUT_INTERVAL)
    })
}

const setAmount = (amount) => {
    const amountInput = document.querySelector(amountInputSelector);
    const setValue = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
    setValue.call(amountInput, AMOUNT);
    amountInput.dispatchEvent(new Event('input', { bubbles: true }));
};

const makeSwap = () => {
    const swapButton = document.querySelector(swapButtonSelector);
    swapButton.click();
}

const isElementVisible = (elSelector) => {
    const el = document.querySelector(elSelector);
    if (!el) return false;
    console.log('element found');
    const rect = el.getBoundingClientRect();
    return rect.top >= 0 && rect.left >= 0 &&
           rect.bottom <= window.innerHeight &&
           rect.right <= window.innerWidth;
}

const textOfELementIsEqual = ({elSelector, text}) => {
    const el = document.querySelector(elSelector);
    console.log({elSelector, text});
    if (!el) return false;
    console.log({text});
    console.log({el: el.innerText});
    if (el.disabled) return false; 
    if (el.innerText === text) return true;
} 

const clickNewOrderButton = () => {
    const newOrderButton = document.querySelector(newOrderButtonSelector);
    newOrderButton.click();
}

const main = async () => {
    const swapButtonConf = {
        elSelector: swapButtonSelector, 
        text: CONFIRM_TRANSACTION_TEXT
    }
    await promisify(isElementVisible, amountInputSelector);
    setAmount(AMOUNT);
    await promisify(textOfELementIsEqual, swapButtonConf);
    makeSwap();
    await promisify(isElementVisible, newOrderButtonSelector);
    clickNewOrderButton();
    main();
}

main();
