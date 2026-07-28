export class CryptoApiClient {
  private coingeckoUrl: string
  private btcExplorerUrl: string
  private ethExplorerUrl: string
  private ethApiKey: string

  constructor() {
    this.coingeckoUrl = process.env['COINGECKO_API_URL'] ?? 'https://api.coingecko.com/api/v3'
    this.btcExplorerUrl = process.env['BTC_EXPLORER_URL'] ?? 'https://blockchain.info'
    this.ethExplorerUrl = process.env['ETH_EXPLORER_URL'] ?? 'https://api.etherscan.io/api'
    this.ethApiKey = process.env['ETHERSCAN_API_KEY'] ?? ''
  }

  async getBtcRate(): Promise<number> {
    const res = await fetch(`${this.coingeckoUrl}/simple/price?ids=bitcoin&vs_currencies=ngn`)
    const data = await res.json() as { bitcoin?: { ngn?: number } }
    return data?.bitcoin?.ngn ?? 98000000
  }

  async verifyTx(txHash: string, currency: string): Promise<{ confirmed: boolean; confirmations: number }> {
    let url: string | undefined
    if (currency === 'BTC') {
      url = `${this.btcExplorerUrl}/rawtx/${txHash}`
    } else if (currency === 'ETH') {
      url = `${this.ethExplorerUrl}?module=transaction&action=gettxreceiptstatus&txhash=${txHash}&apikey=${this.ethApiKey}`
    }
    if (!url) return { confirmed: false, confirmations: 0 }

    try {
      const res = await fetch(url)
      const data = await res.json() as Record<string, unknown>
      return { confirmed: true, confirmations: (data?.confirmations as number) ?? 1 }
    } catch {
      return { confirmed: false, confirmations: 0 }
    }
  }
}

export const cryptoApi = new CryptoApiClient()