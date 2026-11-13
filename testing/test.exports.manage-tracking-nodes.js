const { Manager, ManageTrackingNode } = require(`../dist/index.cjs`)

// Please make sure to include manager as it is required!!

new Manager({})
ManageTrackingNode({ Identifier: `Testing Node`, Coordinates: { Latitude: 42.0308, Longitude: -93.6319 } })
ManageTrackingNode({ Identifier: `Testing Node`, Coordinates: { Latitude: 42.0308, Longitude: -91.6319 } })

ManageTrackingNode({ Identifier: `Testing Node 1`, Coordinates: { Latitude: 42.0308, Longitude: -93.6319 } })
ManageTrackingNode({ Identifier: `Testing Node 1`, Coordinates: { Latitude: 42.0308, Longitude: -91.6319}, Delete: true })
