import { cloneDeep } from "lodash";
import { baseState, baseMutations } from "../state";

const state = {
    ...cloneDeep(baseState),
    isLogin : false,
    members : ["บี","ตาล","แตงไทย","ฟร้องซ์"],
    favouriteList : {
        "บี" : [],
        "ตาล" : [],
        "แตงไทย" : [],
        "ฟร้องซ์" : [],
    },
    topList : {
        "บี" : ['','',''],
        "ตาล" : ['','',''],
        "แตงไทย" : ['','',''],
        "ฟร้องซ์" : ['','',''],
    },
    who : ""
}
  
const getters = {
    movieList: state => {
        if(state.isLogin) {
            console.log(state.favouriteList[state.who])
            return state.favouriteList[state.who]
        } else {
            return []
        }
    },
    topList: state => {
        if(state.isLogin) {
            console.log(state.topList[state.who])
            return state.topList[state.who]
        } else {
            return []
        }
    }
}
  
const mutations =  {
    ...cloneDeep(baseMutations),
    login(state, who) {
        state.who = who;

        state.isLogin = true
    },
    logout(state) {
        state.who = null
        state.isLogin = false
    },
    addFavorite(state, payload) {
        console.log(`who : ${payload.who}, movieFav : ${payload.movie.title}`)
        console.log(state.favouriteList[payload.who])
        console.log(state.favouriteList[payload.who].indexof(payload.movie))
        if(state.favouriteList[payload.who].indexof(payload.movie) == -1){
            state.favouriteList[payload.who].push(payload.movie)
        }
    },
    removeFavorite(state,payload) {
        console.log(`who : ${payload.who}, movieFav : ${payload.id}`)
        console.log(state.favouriteList)
        state.favouriteList[payload.who] = state.favouriteList[payload.who].filter(movie => {
            return movie.id != payload.id
        })
        console.log(state.favouriteList)
    },
    refetchFavoriteList(state) {
        if(state.isLogin) {
            const data = state.favouriteList[state.who]
            state.favouriteList["test"] = data
        }
    },
    addTopVideo(state,payload) {
        console.log(`who : ${payload.who}, movieTop : ${payload.movie.title}, number : ${payload.number}`)
        console.log(state.topList[payload.who])
        state.topList[payload.who][payload.number-1] = payload.movie
    },
    refetchTopList(state){
        if(state.isLogin) {
            const data = state.topList[state.who]
            state.topList["test"] = data
        }
    }
}
  
const actions = {
    login({ commit, dispatch}, member) {
        if( state.members.includes(member) ) {
            dispatch('notification/push',{
               message : `นาม ${member} ถูกต้อง เข้าใช้งาน ได้`,
               color : 'success'
            }, {root:true})
            commit('login',member)
        } else {
            dispatch('notification/push',{
                message : 'นาม ไม่ ได้ ลงทะเบียน กับ ระบบ ไว้',
                color : 'error'
             }, {root:true})
        }
    },
    logout({commit,dispatch}) {
        dispatch('notification/push',{
            message : `นาม ${state.who} ล็อกเอาท์สำเร็จ`,
            color : 'success'
         }, {root:true})
        commit('logout')
    },
    addFavorite({commit, dispatch, rootState,state}) {
        if(state.isLogin) {
            const movie = rootState.video.currentMovie
            commit('addFavorite', {
                movie : movie,
                who : state.who
            })
            dispatch('notification/push',{
                message : `add favourite suceessfully`,
                color : 'success'
             }, {root:true})
        } else {
            dispatch('notification/push',{
                message : `ฟังก์ชันไม่ถูกต้อง`,
                color : 'error'
             }, {root:true})
        }
    },
    removeFavorite({commit,dispatch,rootState,state}) {
        if(state.isLogin) {
            const movie = rootState.video.currentMovie
            commit('removeFavorite',{
                who : state.who,
                id : movie.id
            })
            dispatch('notification/push',{
                message : `remove favourite successfully`,
                color : 'success'
             }, {root:true})
        } else {
            dispatch('notification/push',{
                message : `ฟังก์ชันไม่ถูกต้อง`,
                color : 'error'
             }, {root:true})
        }
    },
    fetchFavoriteList({commit}) {
        commit('refetchFavoriteList')
    },
    addTopVideo({commit, dispatch, rootState, state},number){
        console.log(number);
        if(state.isLogin) {
            const movie = rootState.video.currentMovie
            commit('addTopVideo', {
                movie : movie,
                who : state.who,
                number : number
            })
            commit('addFavorite', {
                movie : movie,
                who : state.who
            })
            dispatch('notification/push',{
                message : `add top ${number} video suceessfully`,
                color : 'success'
             }, {root:true})
        } else {
            dispatch('notification/push',{
                message : `ฟังก์ชันไม่ถูกต้อง`,
                color : 'error'
             }, {root:true})
        }
    },
    fetchTopList({commit}) {
        commit('refetchTopList')
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}