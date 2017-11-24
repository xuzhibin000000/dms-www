export default {
  menu: (state) => {
    return state.menu
  },
  GET_PAGE_SIZE: (state) => {
    console.log(state)
    return state.pageSize
  }
}
