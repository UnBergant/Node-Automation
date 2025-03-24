# 🔄 Automatic Token Swap in the Sepolia Test Network

## 📝 Description

This script automates the token swapping process on the [Unlock3d](https://unlock3d.t3rn.io/) website in the Sepolia test network. It allows performing multiple swaps by splitting a large amount into smaller transactions, which can be useful due to transaction limits. Large transactions often get stuck in a Pending status and later require a Reclaim.

## ✅ Prerequisites

Before running the script, make sure to:

1. 🔗 Connect your wallet (MetaMask).
2. 🔄 Select the networks you want to swap between.
3. ⚠️ Ensure you have clicked the `Connect to <chainName>` button.

> **Important!** Each transaction must be manually confirmed in MetaMask. This is a security requirement and cannot be automated.

## 🚀 Installation & Execution

The script is inserted into the browser console and executed by pressing `Enter`.

### 🔹 Option 1: Manual Execution

1. Open the [Unlock3d](https://unlock3d.t3rn.io/) website.
2. Open DevTools (console) in your browser (`F12` or `Ctrl + Shift + I` / `Cmd + Option + I`).
3. Switch to the `Console` tab.
4. Paste the script and press `Enter`.

### 🔹 Option 2: Save as a Snippet

For convenience, you can save the script in `Snippets` in DevTools:

1. Open DevTools (`F12` → `Sources` → `Snippets`).
2. Create a new snippet (`New Snippet`).
3. Paste the code and save it.
4. Run it anytime using `Run`.

## ⚙️ Configurable Parameters

The only parameter worth modifying is `AMOUNT` (the amount for a single swap). You can change it in the script before execution:

```javascript
const AMOUNT = 0.5; // Set your desired value
```

## ⚠️ Possible Issues & Solutions

- ❌ **Transaction too large to process.**
  - Split the amount into smaller parts by adjusting `AMOUNT`.
- ❌ **The script does not click the `Swap` button.**
  - Ensure you have selected the networks and connected your wallet.
  - Check that you have clicked the `Connect to <chainName>` button.
- ❌ **The script does not start.**
  - Try refreshing the page and pasting the code again.

## ⚠️ Disclaimer

This script is intended for use only in the Sepolia test network and is used at your own risk. The developer is not responsible for any loss of test tokens or account restrictions on the website.

---

🚀 Happy swapping! 🔥
