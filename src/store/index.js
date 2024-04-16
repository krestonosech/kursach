import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import jsonData from '@/components/calendar.json';
import { setMonth } from 'date-fns';

const store = createStore({
  state() {
    const months = jsonData.map((item) => (item));
    return {
        asideOpenClose: false,
        monther: {
          number: 4,
          year: 2024,
        },
        darkTheme: false,
        months,
        day: false,
        workingWeek: false,
        fullWeek: false,
        month: true,
        searchItems: [],
        feedback: false,
        afterOrder: false,
        BooleanSearch: false,
        inputStr: '',
        jojo: [],
        authorization: false,
        NickName: '',
        reviewItems: [],
        cartItems: [],
        favoriteItems: [],
        navbarPosition: 0,
        MouseIn: false,
        confirmHoverIn: 0,
        error: {
            excessive: false,
        },
    };
  },
  getters: {
    getQuantity: (state) => state.mainItems.quantity,
    getUser: (state) => state.jojo,
    getAuthorization: (state) => state.authorization,
    getnavbarPosition: (state) => state.navbarPosition,
    getMouse: (state) => state.MouseIn,
    getCartItems: (state) => state.cartItems,
    getfavoriteItems: (state) => state.favoriteItems,
    getQuantityInCart: (state) => (itemId) => {
      const itemInCart = state.cartItems.find((cartItem) => cartItem.id === itemId);
      return itemInCart ? itemInCart.quantity : 0;
    },
  },
  mutations: {
    addUser(state, user) {
      if (state.jojo.some((u) => u.email === user.email)) {
        console.log('Такой пользователь уже есть в базе');
      } else {
        state.jojo.push(user);
      }
    },
    
    setMonther(state, monther) {
      state.monther = monther;
    },

    setMontherNumberPlus(state) {
      state.monther.number = state.monther.number + 1;
    },

    setMontherNumberMinus(state) {
      state.monther.number = state.monther.number - 1;
    },

    setAsideCloseOpen(state) {
      state.asideOpenClose = !state.asideOpenClose;
    },

    setDarkTheme(state) {
      state.darkTheme = !state.darkTheme;
    },

    setDay(state) {
      state.day = true;
      state.workingWeek = false;
      state.fullWeek = false;
      state.month = false;
    },

    setWorkingWeek(state) {
      state.workingWeek = true;
      state.day = false;
      state.fullWeek = false;
      state.month = false;
    },

    setFullWeek(state) {
      state.fullWeek = true;
      state.day = false;
      state.workingWeek = false;
      state.month = false;
    },

    setMonth(state) {
      state.month = true;
      state.day = false;
      state.workingWeek = false;
      state.fullWeek = false;
    },

    setCartItems(state, items) {
      state.cartItems = items;
    },

    setFavItems(state, items) {
      state.favoriteItems = items;
    },

    setNickNameClear(state) {
      state.NickName = '';
    },

    setMaiItems(state, items) {
      state.mainItems = items;
    },

    setAuthorization(state, payload) {
      state.authorization = payload;
    },

    setnavbarPosition(state, payload) {
      state.navbarPosition = payload;
    },

    setMouse(state, payload) {
      state.MouseIn = payload;
    },

    addToCart(state, item) {
      const existingItem = state.cartItems.find((i) => i.id === item.id);
      const mainItem = state.mainItems.find((i) => i.id === item.id);
      if (!existingItem) {
        state.cartItems.push({ ...item, quantity: 0 });
      }
      if (mainItem) {
        this.commit('increaseQuantity', item);
      }
    },

    addReviews(state, item) {
      state.reviewItems.push(item);
    },

    removeReviews(state, item) {
      // Находим индекс предмета в массиве
      const index = state.reviewItems.findIndex((review) => review.nickName === item.nickName);

      // Если предмет найден, удаляем его из массива
      if (index !== -1) {
        state.reviewItems.splice(index, 1);
      }
    },

    removeFromCart(state, item) {
      state.cartItems = state.cartItems.filter((u) => u.id !== item);
      const mainItem = state.mainItems.find((i) => i.id === item);
      if (mainItem) {
        mainItem.quantity = 0;
      }
    },

    addToFavorite(state, item) {
      state.favoriteItems.push(item);
    },

    removeFromFavorite(state, itemId) {
      state.favoriteItems = state.favoriteItems.filter((u) => u.id !== itemId);
    },

    decreaseQuantity(state, item) {
      const existingItem = state.cartItems.find((i) => i.id === item.id);
      const mainItem = state.mainItems.find((i) => i.id === item.id);
      if (existingItem) {
        if (existingItem.quantity < 2) {
          mainItem.quantity = 1;
          this.commit('removeFromCart', item.id);
        }
        existingItem.quantity -= 1;
        mainItem.quantity = existingItem.quantity;
      }
    },

    increaseQuantity(state, item) {
      const existingItem = state.cartItems.find((i) => i.id === item.id);
      const mainItem = state.mainItems.find((i) => i.id === item.id);
      if (existingItem) {
        existingItem.quantity += 1;
        mainItem.quantity = existingItem.quantity;
      }
    },
  },
  actions: {
    addUser({ commit }, user) {
      commit('addUser', user);
    },

    setDay({ commit }) {
        commit('setDay');
    },

    setDarkTheme({ commit }) {
      commit('setDarkTheme');
    },

    setMontherNumberPlus({ commit }) {
      commit('setMontherNumberPlus');
    },

    setMontherNumberMinus({ commit }) {
      commit('setMontherNumberMinus');
    },

    setWorkingWeek({ commit }) {
      commit('setWorkingWeek');
    },

    setFullWeek({ commit }) {
      commit('setFullWeek');
    },

    setMonth({ commit }) {
      commit('setMonth');
    },

    setAsideCloseOpen({ commit }) {
      commit('setAsideCloseOpen');
    },

    addToCart({ commit }, item) {
      commit('addToCart', item);
    },

    removeFromCart({ commit }, item) {
      commit('removeFromCart', item);
    },

    addToFavorite({ commit }, item) {
      commit('addToFavorite', item);
    },

    removeFromFavorite({ commit }, item) {
      commit('removeFromFavorite', item);
    },

    decreaseQuantity({ commit }, item) {
      commit('decreaseQuantity', item);
    },

    increaseQuantity({ commit }, item) {
      commit('increaseQuantity', item);
    },

    addReviews({ commit }, item) {
      commit('addReviews', item);
    },

    setCartItems({ commit }, items) {
      commit('setCartItems', items);
    },

    setFavItems({ commit }, items) {
      commit('setFavItems', items);
    },

    setMaiItems({ commit }, items) {
      commit('setMaiItems', items);
    },

    setAuthorization({ commit }, items) {
      commit('setAuthorization', items);
    },

    setnavbarPosition({ commit }, items) {
      commit('setnavbarPosition', items);
    },

    setMouse({ commit }, items) {
      commit('setMouse', items);
    },

    removeReviews({ commit }, items) {
      commit('removeReviews', items);
    },

    setNickNameClear({ commit }) {
      commit('setNickNameClear');
    },
  },
  plugins: [createPersistedState()],
});


export default store;