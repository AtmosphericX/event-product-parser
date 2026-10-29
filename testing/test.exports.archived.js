const { GetArchivedProducts } = require(`../dist/index.cjs`)

// Retrieve archive products from iastate.edu using the specified PIL and limit

GetArchivedProducts({ PIL: [`TOR`], Limit: 1 }).then((products) => {
    console.log(products)
})