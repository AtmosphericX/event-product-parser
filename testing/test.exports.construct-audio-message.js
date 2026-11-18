const { ConstructAudioMessage } = require(`../dist/index.cjs`)

new ConstructAudioMessage().Construct({
    Message: `This is a test audio message`,
    Header: `ZCZC-ATX-TEST-000000+0015-3211920-XXXX`,
    File: String(Math.floor(Math.random() * 1000000)),
})
