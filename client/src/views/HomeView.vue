<template>
  <div class="home">
        <form @submit.prevent="addMessage">
      <div class="form-group">
        <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
        <label for="username">Username</label>
        <input
          v-model="message.username"
          type="text"
          class="form-control"
          id="username"
          value="Anonymous"
          required>
      </div>
      <div class="form-group">
        <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
        <label for="subject">Subject</label>
        <input
          v-model="message.subject"
          type="text"
          class="form-control"
          id="subject"
          placeholder="Enter a subject"
          required>
      </div>
      <div class="form-group">
        <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
        <label for="message">Message</label>
        <textarea v-model="message.message" class="form-control" id="message" rows="3"></textarea>
      </div>
      <div class="form-group">
        <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
        <label for="imageURL">Image URL</label>
        <input
          v-model="message.imageURL"
          type="URL"
          class="form-control"
          id="imageURL"
          placeholder="Put an image URL">
      </div>
        <button type="submit" class="btn btn-primary">Add Message</button>
    </form>
    <div class="list-unstyled" v-for="message in messages" :key="message._id">
      <li class="media">
        <img v-if="message.imageURL" class="mr-3" :src="message.imageURL" :alt="message.subject">
        <div class="media-body">
          <h4 class="mt-0 mb-1">{{message.username}}</h4>
          <h5 class="mt-0 mb-1">{{message.subject}}</h5>
          {{ message.message }}
          <br />
          <small>{{ message.created }}</small>
        </div>
      </li>
      <hr>
    </div>
  </div>
</template>

<script>
// TO STORE URL IN A VARIABLE
const API_URL = 'http://localhost:1234/messages';

export default {
  name: 'HomeView',
  data: () => ({
    messages: [],
    message: {
      username: 'Anonymous',
      subject: '',
      imageURL: '',
    },
  }),
  // WHEN THE PAGE IS MOUNTED/CREATED THIS WILL RUN, AND IT WILL MAKE A REQUEST TO THE API
  mounted() {
    fetch(API_URL).then((reponse) => reponse.json()).then((result) => {
      this.messages = result;
    });
  },

  methods: {
    addMessage() {
      console.log(this.message);
    },
  },
};
</script>

<style >
  hr{
    border-top: 2px solid white;
  }

  img{
    max-width: 300px;
    height: auto;

  }
</style>
