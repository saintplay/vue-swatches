<template>
    <div v-if="mounted">
      <v-modal v-bind="$attrs" v-on="$listeners">
        <slot></slot>
      </v-modal>
    </div>
</template>

<script>
import Vue from 'vue';

export default {
  data: () => ({
    mounted: false
  }),
  inheritAttrs: false,
  mounted() {
    Vue.component('v-modal', function (resolve) {
      require(['@melmacaluso/vue-modal'], resolve)
    })
    this.mounted =  true;
  }
}
</script>
