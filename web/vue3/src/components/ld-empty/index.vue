<template>
  <div class="ld-empty">
    <div class="ld-empty--image"><icon-svg name="empty-data" /></div>
    <p class="ld-empty--description">{{description}}</p>
  </div>
</template>
<script>
export default {
  name: "LdEmpty",
  props: {
    description: {
      type: String,
      default: "暂无数据",
    },
  },
};
</script>
<style lang="scss" scoped>
.ld-empty {
  margin: 32px 0;
  color: rgba(0, 0, 0, 0.25);
  font-size: 14px;
  line-height: 22px;
  text-align: center;
  &--image {
    height: 40px;
    margin-bottom: 8px;
    svg {
      height: 100%;
      margin: auto;
    }
    .icon-svg {
      width: 3rem;
      height: 3rem;
    }
  }
  &--description {
    margin: 0;
  }
}
</style>
