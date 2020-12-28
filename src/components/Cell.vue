<template>
  <td :style="style">
    {{ value }}
  </td>
</template>

<script>
export default {
  name: 'Cell',
  props: {
    type: {
      type: String,
      required: true,
      description:"type of cell (x-axis,y-axis,value,aggregate)"
    },
    value: {
      type: String,
      required: true,
      description:"Value inside the cell"
    },
  },
  computed: {
    style() {
      if (this.type == 'y') {
        return ' width:10%;color:blue;background:rgb(216, 214, 214);font-size:xx-small;font-weight: 700;';
      } 
      else if (this.type == 'aggregate') {
        let str = ';';
        if (this.value < 2) {
          str +=
            'background:rgb(255, 0, 0);border:2px solid brown;color:#81170B;';
        } else if (this.value < 4) {
          str +=
            'background:rgb(254, 220, 8);border:2px solid rgb(169, 149, 24);color:rgb(137, 119, 10);';
        } else {
          str +=
            'background:rgb(71, 205, 94);border:2px solid green;color:rgb(7, 79, 82);';
        }
        return str;
      }
       else {
        let str = ';';
        if (this.value < 2) {
          str += 'background:#F69494;border:2px solid brown;color:#81170B;';
        } else if (this.value < 4) {
          str +=
            'background:rgb(255, 242, 162);border:2px solid rgb(169, 149, 24);color:rgb(137, 119, 10);';
        } else {
          str += 'background:#BAEEC3;border:2px solid green;color:#0ABAC0;';
        }
        return str;
      }
    },
  },
};
</script>
