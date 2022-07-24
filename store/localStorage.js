export const state = () => ({
  products: [],
})

export const mutations = {
  addProduct(state, product) {
      state.products.push(product)
  },
  removeProduct(state, productId) {
      state.products = state.products.filter((product) => product.id !== productId)
  },
  sortProducts(state, typeSort) {
    let sortedProducts = state.products

    if (typeSort === 'По цене min') {
      sortedProducts = sortedProducts.sort((a,b) => a.cost - b.cost)
    } else if (typeSort === 'По цене max') {
      sortedProducts = sortedProducts.sort((a,b) => b.cost - a.cost)
    } else if (typeSort === 'По наименованию') {
      sortedProducts = sortedProducts.sort((a,b) => {
        const fa = a.name.toLowerCase()
        const fb = b.name.toLowerCase()
        if (fa < fb) {
          return -1
        }
        if (fa > fb) {
          return 1
        }
        return 0
      })
    } else if(typeSort === 'По умолчанию') {
      sortedProducts = sortedProducts.sort((a,b) => a.id - b.id)
    }
    state.products = sortedProducts
  }
}

export const getters = {
  getProducts: (state) => {
      return state.products
  },
}
