export default async function getCurrencyRate() {
  if (typeof window !== "undefined") {
    throw new Error("this works for server side")
  }
  const appId = process.env.APP_CURRENCY_API_ID

  const { rates } = await fetch(`https://openexchangerates.org/api/latest.json?app_id=${appId}
`).then((res) => res.json())

  const prevQAR = rates.QAR // base currency

  const convertedRates = rates
  Object.keys(rates).forEach((key) => {
    convertedRates[key] = rates[key] / prevQAR
  })

  return {
    base: "QAR",
    rates: convertedRates,
  }
}
