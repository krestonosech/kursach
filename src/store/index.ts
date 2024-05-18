import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

export const store = createStore({
  state () {
    return {
      asideOpenClose: false,
      monther: {
        number: 4,
        year: 2024
      },
      server: 'http://localhost:8000',
      accessToken: '',
      darkTheme: false,
      day: false,
      workingWeek: false,
      fullWeek: false,
      month: true,
      invitedEvents: [],
      usersList: [],
      myEvents: []
    }
  },
  mutations: {
    setUsersList (state: any, users) {
      state.usersList = users
    },

    setMyEvents (state, events) {
      state.myEvents = events
    },

    setInvitedEvents (state, events) {
      state.invitedEvents = events
    },

    setMonther (state, monther) {
      state.monther = monther
    },

    setMontherNumberPlus (state) {
      state.monther.number++
    },

    setMontherNumberMinus (state) {
      state.monther.number--
    },

    setAsideCloseOpen (state) {
      state.asideOpenClose = !state.asideOpenClose
    },

    setDarkTheme (state) {
      state.darkTheme = !state.darkTheme
    },

    setDay (state) {
      state.day = true
      state.workingWeek = false
      state.fullWeek = false
      state.month = false
    },

    setWorkingWeek (state) {
      state.workingWeek = true
      state.day = false
      state.fullWeek = false
      state.month = false
    },

    setFullWeek (state) {
      state.fullWeek = true
      state.day = false
      state.workingWeek = false
      state.month = false
    },

    setMonth (state) {
      state.month = true
      state.day = false
      state.workingWeek = false
      state.fullWeek = false
    },

    addUser (state, user) {
      state.usersList.push(user)
    }
  },
  actions: {
    setUsersList ({ commit }, users) {
      commit('setUsersList', users)
    },

    setMyEvents ({ commit }, events) {
      commit('setMyEvents', events)
    },

    setInvitedEvents ({ commit }, events) {
      commit('setInvitedEvents', events)
    },

    addUser ({ commit }, user) {
      commit('addUser', user)
    },

    setDay ({ commit }) {
      commit('setDay')
    },

    setDarkTheme ({ commit }) {
      commit('setDarkTheme')
    },

    setMontherNumberPlus ({ commit }) {
      commit('setMontherNumberPlus')
    },

    setMontherNumberMinus ({ commit }) {
      commit('setMontherNumberMinus')
    },

    setWorkingWeek ({ commit }) {
      commit('setWorkingWeek')
    },

    setFullWeek ({ commit }) {
      commit('setFullWeek')
    },

    setMonth ({ commit }) {
      commit('setMonth')
    },

    setAsideCloseOpen ({ commit }) {
      commit('setAsideCloseOpen')
    }
  },
  plugins: [createPersistedState()]
})
