import arcjet,{ tokenBucket,shield,detectBot, slidingWindow } from "@arcjet/node";

import "dotenv/config";

export const aj=arcjet({
    key:process.env.ARCJET_KEY,
    characteristics:["ip.src"],
    rules:[
        // shield protects SQL injection,XSS,CSRF attacks
        shield({mode:"LIVE"}),
        detectBot({
            mode:"LIVE",
            // block
            allow:[
                "CATEGORY:SEARCH_ENGINE"
            ]
            // see full list
        }),
        tokenBucket({
            mode:"LIVE",
            refillRate:5,
            interval:10,
            capacity:10
        })
    ]
})