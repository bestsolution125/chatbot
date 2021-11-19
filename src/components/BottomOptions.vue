<template>
  <div class="input-area">
    <textarea
      placeholder="Type your message"
      :value="input"
      @input="onMessageInput"
      @keypress.enter="$emit('send')"
    ></textarea>
    <button
      :style="{
        width: '150px',
        height: '50px',
        cursor: 'pointer',
        backgroundColor: '#56c8d8',
        outline: 'none',
        border: 'none',
        fontSize: '16px',
      }"
      :disabled="disabled"
      @click="$emit('send')"
    >
      {{ start ? "Let's start" : "Send Message" }}
    </button>
  </div>
</template>

<script>
export default {
  props: ["disabled", "start", "input"],
  methods: {
    onMessageInput(event) {
      this.$emit("update:input", event.target.value);
    },
  },
};
</script>

<style>
</style>