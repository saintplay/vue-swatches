<template>
  <div id="app">
    <div>
      <h2>Popover</h2>
      <swatches />
    </div>
    <h2>Popover to Top and Left</h2>
    <div class="flexbox">
      <swatches
        popover-top
        popover-left />
      <swatches
        popover-top
        popover-left />
    </div>
    <h2>Popover to Top and Right</h2>
    <div class="flexbox">
      <swatches
        popover-top
        popover-right />
      <swatches
        popover-top
        popover-right />
    </div>
    <h2>Popover to Bottom and Left</h2>
    <div class="flexbox">
      <swatches
        popover-bottom
        popover-left />
      <swatches
        popover-bottom
        popover-left />
    </div>
    <h2>Popover to Bottom and Right</h2>
    <div class="flexbox">
      <swatches
        popover-bottom
        popover-right />
      <swatches
        popover-bottom
        popover-right />
    </div>
  </div>
</template>

<script>
export default {
  name: 'app-demo',
}
</script>


<style>
*,
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.flexbox {
  display: flex;
  justify-content: space-between;
}
</style>
