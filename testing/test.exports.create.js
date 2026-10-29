const { Manager, GetArchivedProducts, ConstructProduct } = require(`../dist/index.cjs`)

// Retrieve archived products from iastate.edu and construct new products based on them
// Please make sure to include manager as it is required for constructing products

new Manager({})
GetArchivedProducts({ PIL: [`TOR`], Limit: 1 }).then(archivedProducts => {
    archivedProducts.forEach(({ TTAAII, Products = [] }) => {
        Products.forEach(Message => ConstructProduct({
            Message,
            PIL: TTAAII,
            Tracking: `BO.TOR.S.${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`
        }));
    });
});
