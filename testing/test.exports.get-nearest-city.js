const { Manager, GetNearestCity } = require(`../dist/index.cjs`)

// Please make sure to include manager as it is required!!

new Manager({})
console.log(GetNearestCity({ Coordinates: { Latitude: 42.0308, Longitude: -93.6319 }, Radius: 25 }))