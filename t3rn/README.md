# 🛠 T3rn Project: Useful Scripts for Automation & Analysis

This repository contains **browser-based automation scripts** designed for use with the [T3rn](https://unlock3d.t3rn.io/) ecosystem and testnet tools.  
All scripts are **executed directly in the browser console**, making them easy to run without extra setup.

---

## 🔄 Script 1: Automatic Token Swap (Sepolia Test Network)

### 📝 Description

This script automates token swapping on the [Unlock3d](https://unlock3d.t3rn.io/) website in the Sepolia test network.  
It performs multiple swaps by splitting a large transaction into smaller ones to avoid stuck "Pending" status or the need to reclaim.

---

### ✅ Prerequisites

Before running the script:

1. 🔗 Connect your MetaMask wallet.
2. 🔄 Select the source and target networks.
3. ✅ Click the `Connect to <chainName>` button if required.

> 💡 **Note**: Transactions must be manually approved in MetaMask for security reasons.

---

### 🚀 Execution

1. Open [Unlock3d](https://unlock3d.t3rn.io/).
2. Open browser DevTools (`F12` / `Ctrl+Shift+I` / `Cmd+Option+I`).
3. Go to the `Console` tab.
4. Paste the script from `swap.js` and press `Enter`.

---

### 🔧 Configurable Parameter

```js
const AMOUNT = 0.5; // Amount of ETH per swap
```

---

### ❗️ Troubleshooting

- **Transactions stuck** → Lower `AMOUNT`.
- **Swap button not clicked** → Ensure all connections and network selections are complete.
- **Script not running** → Refresh the page and try again.

---

## 🌱 Script 2: Farmed Token Balance Tracker

### 📝 Description

This script checks how much of the `BRN` token was farmed (accumulated) via swap activity over a specified time period (default: 1 hour).  
It fetches and compares balances using the T3rn explorer API.

---

### ✅ Requirements

1. Open the following page in your browser, replacing `<YOUR_ADDRESS>` with your actual wallet address:  
   🔗 [https://b2n.explorer.caldera.xyz/address/<YOUR_ADDRESS>](https://b2n.explorer.caldera.xyz/address/<YOUR_ADDRESS>)

2. Open DevTools (`F12`) → Console.

3. Paste the script from `balanceAnalysis.js` and run.

---

### ⚙️ Configurable Parameters

```js
const address = '<YOUR_ADDRESS>'; // your wallet address
const timeDiff = 1 * 60 * 60 * 1000; // Time window: 1 hour
const mode = 'farm'; // Currently only 'farm' mode is supported
```

---

### 📊 Output Summary

- 📈 Balance now
- 📉 Balance N hours ago
- 🔁 Farmed amount (based on swap transactions)
- 📥 Total and swap transaction counts

Sample output:
```
🗓 15.04 17:32 🔁 0.023145 BRN | 💰 8397.543 BRN
📈 15.04 17:32 | 8397.543 BRN (Newest)
📉 15.04 16:32 | 8395.125 BRN (1 hour ago)
📥 Txs (swap): 14
📥 Txs (total): 32
🔁 Delta (swap): 2.418 BRN
🔁 Delta (total): 3.042 BRN
```

---

## ⚠️ Disclaimer

These scripts are intended for educational and testing purposes only.  
They operate on the Sepolia testnet and T3rn explorer, and are used at your own risk.

---

🚀 Happy hacking & farming!  
💬 Got feedback or improvements? PRs welcome!
