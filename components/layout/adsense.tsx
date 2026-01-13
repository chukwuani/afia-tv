import Script from 'next/script'
import React from 'react'

function Adsense({pId}: {pId: string}) {
  return (
    <Script 
        id="adsense-script"
        strategy="afterInteractive"
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${pId}`}
        crossOrigin="anonymous"
      />
  )
}

export default Adsense
