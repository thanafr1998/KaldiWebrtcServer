import { cloneDeep } from "lodash";
import { baseState, baseMutations } from "../state";

const state = {
    ...cloneDeep(baseState),
    isLogin : false,
    member : ["บี","ตาล","แตงไทย","ฟร้องซ์"],
    who : "ADMIN"
}
  
const getters = {

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
    }
}
  
const actions = {
    login({ commit, dispatch}, who) {
        commit('loading')
        if( state.member.includes(who) ) {
            commit('login',who)
            dispatch('notification/success', {root:true})
        } else {
            // context.commit('error')
            dispatch('notification/error','นาม ไม่ ได้ ลงทะเบียน กับ ระบบ ไว้',{root:true})
        }
        commit('finish')
    },
    logout(context) {
        context.commit('logout')
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}