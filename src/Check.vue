<template>
  <div class="vue-swatches__check__wrapper vue-swatches--has-children-centered">
    <div class="vue-swatches__check__circle vue-swatches--has-children-centered">
      <svg version="1.1" role="presentation" width="12" height="12" viewBox="0 0 1792 1792" class="check">
        <path class="vue-swatches__check__path"
          d="M1671 566q0 40-28 68l-724 724-136 136q-28 28-68 28t-68-28l-136-136-362-362q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 295 656-657q28-28 68-28t68 28l136 136q28 28 28 68z"
          >
        </path>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: 'check',
  data () {
    return { }
  }
}
</script>

<style lang="scss">
  .vue-swatches__check__wrapper {
    position: absolute;
    width: 100%;
    height: 100%;
  }
  .vue-swatches__check__circle {
    width: 21px;
    height: 21px;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.15);
  }
  .vue-swatches__check__path {
    fill: white;
  }
</style>

