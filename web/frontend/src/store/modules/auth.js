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
        if( state.member.includes(who) ) {
            dispatch('notification/push',{
               message : `นาม ${who} ถูกต้อง เข้าใช้งาน ได้`,
               color : 'success'
            }, {root:true})
            commit('login',who)
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
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}