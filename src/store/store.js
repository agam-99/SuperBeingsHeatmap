import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'

Vue.use(Vuex);

export const store = new Vuex.Store({
    strict: true,
    state: {
        data: [],
        definitions: []
    },
    getters: {
        getApiData: (state) => {    //return data array fetched from the api
            return state.data;
        },
        getApiDefinitions: (state) => {     //return definitions array fetched from the api
            return state.definitions;
        },
        getIndices: (state) => {   //returns an array of all available indexes
            let params = []
            let i = 0;
            state.definitions.forEach((obj) => {
                if (!params.some((item) => item.value == obj.index)) {
                    params.push({ id: i++, value: obj.index });
                }
            });
            return params;
        },
        getManagers: (state) => {    //returns list of all managers
            let managers = [];
            state.data.forEach((obj) => {
                if (!managers.includes(obj.manager)) {
                    managers.push(obj.manager)
                }
            })
            return managers;
        },
        getTopics: (state) => (index) => {   //returns all topics of the selected index
            let topics = []
            if (index == null) return topics
            let i = 0;
            state.definitions.forEach((obj) => {
                if (obj.index == index.value) {
                    topics.push({ id: i++, value: obj.topic });
                }
            });
            return topics;
        },
        getTableData: (state, getters) => (index, topic) => {     //returns data for the table to be rendered on the basis of index and topic
            let params = [];
            let i = 0;
            if (index == null && topic == null) {
                params = getters.getIndices;
            }
            else if (topic == null) {
                params = getters.getTopics(index);
            }
            else {
                state.definitions.forEach((obj) => {
                    if (obj.topic == topic.value) {
                        params.push({ id: i++, value: obj.subTopic });
                    }
                });
            }
            let tableObj = {}
            params.forEach(param => {
                let obj = state.data.filter(o => o.parameter === param.value);
                tableObj[param.value] = obj;
            })
            return tableObj
        },
        getAggregate: (state, getters) => (index, topic) => {     //returns array of aggregate score for the selected table
            let aggregate = []
            let tableData = getters.getTableData(index, topic);
            let keys = Object.keys(tableData);
            keys.forEach((key) => {
                let val = (tableData[key].reduce((o1, o2) => o1 + parseInt(o2.score), 0) / tableData[key].length)
                aggregate.push((Math.round(val * 10) / 10).toString())
            })
            return aggregate;
        }
    },
    mutations: {
        saveData: (state, payload) => {    //set data in the store state which is fetched from api
            Vue.set(state, 'data', payload.data)
            Vue.set(state, 'definitions', payload.definitions)
        }
    },
    actions: {
        async getData({ commit }, { flush = false }) {   //fetches data from api if it's not present in store
            if (flush == false && this.state.data.length > 0 && this.state.definitions.length > 0) {
                return;
            }
            let data = await axios.get('https://run.mocky.io/v3/09a1870d-294b-4d53-ac4f-87b676ddd000');
            commit('saveData', data.data);
        }
    }
});