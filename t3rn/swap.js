const amountInputSelector = "#root-scroll-container > div > div > div.relative.flex.justify-center > div.border.border-white\\/15.bg-card-2.text-card-foreground.shadow-sm.p-4.md\\:p-6.rounded-\\[1\\.5rem\\].w-full.sm\\:w-\\[484px\\].md\\:w-\\[460px\\].lg\\:w-\\[532px\\] > div > section > div.pt-6.flex.flex-col.gap-3 > form > div > div.flex.flex-col.gap-10.md\\:gap-4.relative > div:nth-child(1) > div > div.bg-white\\/5.p-4.rounded-\\[24px\\].hover\\:bg-white\\/10.transition-colors.w-auto.flex.flex-col.h-\\[117px\\].px-4.relative > input";
const swapButtonSelector = "#root-scroll-container > div > div > div.relative.flex.justify-center > div.border.border-white\\/15.bg-card-2.text-card-foreground.shadow-sm.p-4.md\\:p-6.rounded-\\[1\\.5rem\\].w-full.sm\\:w-\\[484px\\].md\\:w-\\[460px\\].lg\\:w-\\[532px\\] > div > section > div.pt-6.flex.flex-col.gap-3 > form > button";
const newOrderButtonSelector = "#root-scroll-container > div > div > div.relative.flex.justify-center > div.border.border-white\\/15.bg-card-2.text-card-foreground.shadow-sm.p-4.md\\:p-6.rounded-\\[1\\.5rem\\].w-full.sm\\:w-\\[484px\\].md\\:w-\\[460px\\].lg\\:w-\\[532px\\] > div > section > div.pt-4 > a";
const goBackButtonSelector = "#root-scroll-container > div > div > div.relative.flex.justify-center > div.border.border-white\\/15.bg-card-2.text-card-foreground.shadow-sm.p-4.md\\:p-6.rounded-\\[1\\.5rem\\].w-full.sm\\:w-\\[484px\\].md\\:w-\\[460px\\].lg\\:w-\\[532px\\] > div > section > div.pt-4 > div > button"

const AMOUNT = 6;
const TIMEOUT_INTERVAL = 1000;

const clickEl = ({selector, text, desc}) => {
    const el = document.querySelector(selector);
    console.log(`Press: ${text}\nDesc: ${desc}`);
    el.click();
}

const TEXTS = {
    swapButton: 'Confirm transaction',
    goBackButton: 'Go Back'
}

const DESCS = {
    amountInput: 'Token amount input',
    swapButton: 'Confirm swap button',
    newOrderButton: 'Go back to create new order',
    goBackButton: 'In case of error this button is shown'
}

const amountInputConf = {
    selector: amountInputSelector,
    desc: DESCS.amountInput
}

const swapButtonConf = {
    selector: swapButtonSelector, 
    text: TEXTS.swapButton,
    desc: DESCS.swapButton
}

const newOrderButtonConf = {
    selector: newOrderButtonSelector,
    action: clickEl,
    desc: DESCS.newOrderButton,
}

const goBackButtonConf = {
    selector: goBackButtonSelector, 
    action: clickEl,
    text: TEXTS.goBackButton,
    desc: DESCS.goBackButton,
}


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

const isElementVisible = ({selector, desc}) => {
    const el = document.querySelector(selector);
    if (!el) return false;
    console.log(`Element is visible: \n${desc}`);
    const rect = el.getBoundingClientRect();
    return rect.top >= 0 && rect.left >= 0 &&
           rect.bottom <= window.innerHeight &&
           rect.right <= window.innerWidth;
}

const textOfELementIsEqual = ({selector, text}) => {
    const el = document.querySelector(selector);
    console.log(`Looking for element with text "${text}"...`);
    if (!el) {
        console.log(`Element with text "${text}" not found`);
        return false;
    }
    if (el.disabled)  {
        console.log(`Element with text "${text}" is disabled`);
        return false
    }; 
    if (el.innerText === text) {
        console.log(`Element with text "${text}" found`);
        return true;
    }
} 

const doActionWithAny = (els) => {
    for (let el of els) {
        if (!isElementVisible(el)) {
            continue;
        };
        switch (true) {
            case !isElementVisible(el):
                continue;
            case el.text && textOfELementIsEqual(el):
                el.action(el);
                return el;
            case !el.text:
                el.action(el);
                return el;
            default:
                console.log('default block')
        }
    }
};

const clickNewOrderButton = () => {
    const newOrderButton = document.querySelector(newOrderButtonSelector);
    newOrderButton.click();
}

const main = async () => {
    await promisify(isElementVisible, amountInputConf);
    setAmount(AMOUNT);
    await promisify(textOfELementIsEqual, swapButtonConf);
    makeSwap();
    await promisify(doActionWithAny, [goBackButtonConf, newOrderButtonConf])
    main();
}

main();
