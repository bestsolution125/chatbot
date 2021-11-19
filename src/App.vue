<template>
  <main>
    <div>
      <ul
        :style="{
          listStyle: 'none',
          margin: 0,
          padding: 0,
          overflowY: 'scroll',
          height: '600px',
          paddingBottom: '100px',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 0,
        }"
        id="chatUl"
      >
        <li
          v-for="(message, index) in messages.slice(0, next)"
          v-bind:key="index"
          :class="message.owner"
        >
          {{ message.loading ? "..." : message.text }}
        </li>
      </ul>
    </div>
    <bottom-options
      :disabled="messages.slice(0, next).find((x) => x.text.includes('cool'))"
      :start="messages.slice(0, next).length === 0"
      v-model:input="input"
      @send="send"
    ></bottom-options>
  </main>
</template>

<script>
import BottomOptions from "./components/BottomOptions.vue";
export default {
  name: "App",
  components: { BottomOptions },
  data: () => ({
    next: 0,
    input: "",
    messages: [],
  }),
  async mounted() {
    const { data: messages } = await this.$api.project.getMessages();
    this.messages = messages;
  },
  methods: {
    send() {
      // if input is empty and question is asked
      // on click of button nothing should happen
      if (!this.input && this.messages.slice(0, this.next).length) {
        return;
      }

      // if question is asked, and input is not empty, add input text to message list
      if (this.input && this.messages.slice(0, this.next).length) {
        this.messages.splice(this.next, 0, {
          text: this.input,
          owner: "me",
        });
        this.next += 1;
        this.scrollToBottom();
      }

      this.input = "";

      // load next auto message from chatboat
      let active = true;

      while (active) {
        let _next = this.next;

        if (
          this.messages[this.next] &&
          typeof this.messages[this.next].ask === "undefined"
        ) {
          this.loadNextMessage(_next);
        } else {
          this.loadNextMessage(_next);
          active = false;
        }
        this.scrollToBottom();
      }
    },
    loadNextMessage(_next) {
      setTimeout(() => {
        this.messages[_next].loading = false;
        this.messages = [...this.messages];
      }, 500);
      this.next += 1;
    },
    scrollToBottom() {
      var objDiv = document.getElementById("chatUl");
      objDiv.scrollTop = objDiv.scrollHeight;
    },
  },
};
</script>

<style>
main {
  display: flex;
  flex-direction: column;
}

ul li {
  display: inline-block;
  padding: 20px;
  border-radius: 30px;
  margin-bottom: 2px;
  font-family: Helvetica, Arial, sans-serif;
  align-self: center;
  flex-shrink: 0;
}
.him {
  background: #eee;
  align-self: flex-start;
}
.me {
  float: right;
  background: #0084ff;
  align-self: flex-end;
}
.him + .me {
  border-bottom-right-radius: 5px;
}
.me + .me {
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}
.me:last-of-type {
  border-bottom-right-radius: 30px;
}
.input-area {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 10px;
  z-index: 100;
  background: #ffffff;
  display: flex;
  align-items: flex-end;
}
textarea {
  width: 100%;
  resize: none;
  padding: 10px;
  margin-right: 24px;
  outline: none;
  height: 100px;
  font-size: 16px;
}
</style>