import { useEffect, useRef, useState } from 'react'

// ** ThemeConfig
import themeConfig from 'src/configs/themeConfig'

console.log('themeConfigMode', themeConfig.mode)
let tvScriptLoadingPromise: any

export default function TradingViewWidget() {
  const onLoadScriptRef = useRef<Function | null>(null)
  const [widgetReady, setWidgetReady] = useState(false)

  useEffect(() => {
    onLoadScriptRef.current = createWidget

    if (!tvScriptLoadingPromise) {
      tvScriptLoadingPromise = new Promise(resolve => {
        const script = document.createElement('script')
        script.id = 'tradingview-widget-loading-script'
        script.src = 'https://s3.tradingview.com/tv.js'
        script.type = 'text/javascript'
        script.onload = resolve

        document.head.appendChild(script)
      })
    }

    tvScriptLoadingPromise.then(() => {
      setWidgetReady(true)
      onLoadScriptRef.current && onLoadScriptRef.current()
    })

    return () => {
      onLoadScriptRef.current = null
    }

    function createWidget() {
      if (widgetReady && 'TradingView' in window) {
        const widget = new window.TradingView.widget({
          width: '100%',
          height: '400px',
          symbol: 'EURUSD', // Change to the desired symbol
          timezone: 'Etc/UTC',
          theme: themeConfig.mode,
          style: '1',
          locale: 'en',
          enable_publishing: false,
          withdateranges: true,
          range: 'YTD',
          hide_side_toolbar: false,
          allow_symbol_change: true,
          container_id: 'tradingview_6c538'
        })
      }
    }
  }, [widgetReady])

  return (
    <div className='tradingview-widget-container' style={{ width: '100%' }}>
      <div id='tradingview_6c538' />
    </div>
  )
}
