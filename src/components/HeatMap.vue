<template>
  <div class="heatmap">
    <div class="dropdowns">
      <multiselect
        v-model="index"
        :options="getIndices"
        :allow-empty="true"
        :option-height="100"
        :multiple="false"
        :show-labels="false"
        label="value"
        track-by="id"
        placeholder="Select Index"
        position="bottom"
        @input="(value, id) => (topic = null)"
        class="dropdown index-dropdown"
      />
      <multiselect
        v-model="topic"
        :options="getTopics(index)"
        :allow-empty="true"
        :option-height="100"
        :multiple="false"
        :show-labels="false"
        :disabled="index == null"
        label="value"
        track-by="id"
        placeholder="Select Topic"
        position="bottom"
        class="dropdown"
      />
    </div>
    <table >
      <th class="manager-container">
        <div class="manager-inner">
          <i class="fa fa-user "></i><span>|</span>
          Managers
        </div>
      </th>
      <th
        v-for="key in Object.keys(getTableData(index, topic))"
        :key="key"
        :style="style"
      >
        {{ key }}
      </th>
      <tbody>
        <tr v-for="(manager, idx) in getManagers" :key="idx">
          <Cell :value="getManagers[idx].toUpperCase()" :type="'y'" />
          <Cell
            v-for="key in Object.keys(getTableData(index, topic))"
            :key="key"
            :value="getTableData(index, topic)[key][idx].score"
            :type="'val'"
          />
        </tr>
      </tbody>
      <tr>
        <td class="aggregate-container">
          <i class="far fa-bookmark "></i><span>|</span>
          Aggregate
        </td>
        <Cell
          v-for="(val, idx) in getAggregate(index, topic)"
          :value="val"
          :key="idx"
          :type="'aggregate'"
        />
      </tr>
    </table>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { mapGetters } from 'vuex';
import Multiselect from 'vue-multiselect';
import axios from 'axios';
import Cell from './Cell';
export default {
  components: {
    Multiselect,
    Cell,
  },
  data() {
    return {
      index: null,
      topic: null,
    };
  },
  computed: {
    ...mapGetters([
      'getApiData',
      'getTableData',
      'getIndices',
      'getApiDefinitions',
      'getTopics',
      'getManagers',
      'getAggregate',
    ]),
    getTable() {
      return this.getTableData;
    },
    style() {

      /**
       * Division of remaining width along columns equally for every topic 
      */
      let width = parseInt(

        /**
         * 90 divide by No of topic/sub-topic columns possible for the given index/topic
        */
        90 / Object.keys(this.getTableData(this.index, this.topic)).length
      );
      return (
        'color:white;font-weight:lighter;background:#2B2424;border:3px solid #A49D92;width:' +
        width +
        '%;'
      );
    },
  },

async mounted() {
  /**
   * Action to fetch api data
  */
    await this.getData({ flush: false });
  },

  methods: {
    ...mapActions(['getData']),
  },
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style>
* {
  font-family: Arial, Helvetica, sans-serif;
}
.heatmap {
  padding-left: 15vw;
  padding-right: 15vw;
  padding-top: 10vw;
}

/*Dropdowns CSS*/
.dropdowns {
  display: flex;
  width: 45%;
  padding-left: 10%;
}
.index-dropdown .multiselect__tags,
.index-dropdown .multiselect__input,
.index-dropdown .multiselect__single,
.index-dropdown .multiselect--disabled .multiselect__select {
  background: blue !important;
  font-weight: bold !important;
}
.index-dropdown input.multiselect__input::placeholder,
.index-dropdown .multiselect__placeholder,
.index-dropdown .multiselect__single,
.index-dropdown .multiselect--disabled .multiselect__select {
  color: white !important;
}
.dropdown {
  margin: 5px;
}
.index-dropdown .multiselect dropdown {
  border: 1px solid blue !important;
}
/* Table CSS*/
table{
width:100%;
}
td,
th {
  vertical-align: middle;
  text-align: center;
  height: 2rem;
}
.manager-container {
  padding: 4px;
  background: lightgray;
}
.manager-inner {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: x-small;
  color: white;
  background: black;
}
.manager-inner i {
  font-size: 0.85rem;
}

.manager-inner span {
  font-size: medium;
  padding-left: 5px;
  padding-right: 5px;
}
.aggregate-container {
  font-size: x-small;
  color: white;
  background: blue;
}
.aggregate-container i {
  font-size: 0.85rem;
}
.aggregate-container span {
  font-size: medium;
  padding-left: 5px;
  padding-right: 5px;
}

</style>
