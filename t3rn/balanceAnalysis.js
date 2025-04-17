const ONE_HOUR = 60 * 60 * 1000;
const ONE_DAY = ONE_HOUR * 24;
const POINT_POSTION = 1000000000000000000;

const address = '<YOUR_WALLET_ADDRESS>'
const timeDiff = ONE_HOUR;

const MODE = {
  farm: 'farm',
};

const bIToFP = (bigInt) => Number(BigInt(bigInt))/ 1e18; // bigint to fixed point

const formatDateTime = (timestamp) => {
  const ts = new Date(timestamp);
  const date = ts.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
  });

  const time = ts.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return `${date.replace('/', '.')} ${time}`;
};

const printTxInfo = (item) => {
  const ts = new Date(item.block_timestamp);

  const deltaEth = bIToFP(item.delta);
  const valueEth = bIToFP(item.value);

  console.log(`🗓 ${formatDateTime(ts)} 🔁 ${deltaEth.toFixed(6)} BRN | 💰 ${valueEth.toFixed(3)} BRN`);
}

function formatTimeDiff(ms) {
  const totalHours = Math.floor(ms / ONE_HOUR);
  const days = Math.floor(totalHours / 24);
  const hours = totalHours % 24;

  return `${String(days).padStart(2, '0')}.${String(hours).padStart(2, '0')}`;
}

function formatRelative(ms, locale = 'es') {
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });

  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(ms / 60000);
  const hours = Math.floor(ms / 3600000);
  const days = Math.floor(ms / 86400000);

  if (Math.abs(days) >= 1) return rtf.format(-days, 'day');
  if (Math.abs(hours) >= 1) return rtf.format(-hours, 'hour');
  if (Math.abs(minutes) >= 1) return rtf.format(-minutes, 'minute');
  return rtf.format(-seconds, 'second');
}

const farmByDays = []; 

async function getBalanceChangeLastHour({address, timeDiff, mode}) {
  const baseUrl = `https://b2n.explorer.caldera.xyz/api/v2/addresses/${address}/coin-balance-history`;
  let url = baseUrl;
  let newestItem = null;
  let olderItem = null;
  let done = false;

  let sum = 0;
  let totalTxFiltered = 0;

  while (!done) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Fetch error: ${res.status}`);

    const data = await res.json();
    let items = data.items;

    if (!items || items.length === 0) break;

    if (mode = MODE.farm) {
      items = items.filter(tx => !tx.transaction_hash);
    }

    for (const item of items) {
      totalTxFiltered++;
      const itemTime = new Date(item.block_timestamp).getTime();

      if (!newestItem) {
        newestItem = item;
      }
      printTxInfo(item)
      sum += bIToFP(item.delta);

      const timeDiffOk = (new Date(newestItem.block_timestamp).getTime() - itemTime) >  timeDiff;

      if (timeDiffOk) {
        olderItem = item;
        done = true;
        break;
      }
    }

    if (!done) {
      url = `${baseUrl}?block_number=${data.next_page_params.block_number}`;
    };
  }

  if (newestItem && olderItem) {
    const valueNow = bIToFP(BigInt(newestItem.value)).toFixed(3);
    const valueThen = bIToFP(BigInt(olderItem.value)).toFixed(3);
    const delta = valueNow - valueThen;
    console.log(`------------------`);
    if (mode) {
      console.log(`⚙️ Mode: ${mode}`);
    }
    console.log(`📈 ${formatDateTime(newestItem.block_timestamp)} | ${valueNow} BRN (Newest)`);
    console.log(`📉 ${formatDateTime(olderItem.block_timestamp)} | ${valueThen} BRN (${formatRelative(timeDiff)})`);
    console.log(`📥 Txs (mode): ${totalTxFiltered}`);
    console.log(`🔁 Delta (mode): ${sum.toFixed(3)} BRN`);
    console.log(`🔁 Delta (total): ${delta.toFixed(3)} BRN`);

    // return delta.toString();
  } else {
    console.log('⚠️ Not enough data to calculate 1h difference.');
    return null;
  }
}

try {
  await getBalanceChangeLastHour({address, timeDiff, mode: MODE.farm});
} catch (e) {
  console.log(e);
}
