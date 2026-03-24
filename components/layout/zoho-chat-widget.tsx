"use client"; // only if using App Router

import Script from "next/script";

export default function ZohoChat() {
	return (
		<Script id="zsiqchat" strategy="lazyOnload">
			{`
            var $zoho = $zoho || {};
            $zoho.salesiq = $zoho.salesiq || {
            widgetcode: "siqcd36da8148373c734866fcaf31bcdd96",
            values: {},
            ready: function() {}
            };
            var d = document;
            s = d.createElement("script");
            s.type = "text/javascript";
            s.id = "zsiqscript";
            s.defer = true;
            s.src = "https://salesiq.zoho.com/widget";
            t = d.getElementsByTagName("script")[0];
            t.parentNode.insertBefore(s, t);
            `}
		</Script>
	);
}
