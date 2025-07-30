<template>
  <div class="home">
    <button @click="showMessageForm = !showMessageForm"
            type="button"
            class="btn btn-info mt-3 mb-3">Toggle Message Form</button>
        <form  v-if="showMessageForm" @submit.prevent="addMessage" class="mb-3">
      <div  v-if="error" class="alert alert-dismissible alert-warning">
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        <h4 class="alert-heading">Error!</h4>
        <p class="mb-0">{{ error }}</p>
      </div>
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
        <button type="submit" class="btn btn-primary mt-3 mb-3">Add Message</button>
    </form>
    <div class="list-unstyled" v-for="message in reversedMessages" :key="message._id">
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
    error: '',
    showMessageForm: false,
    messages: [],
    message: {
      username: 'Anonymous',
      subject: '',
      imageURL: '',
    },
  }),

  computed: {
    reversedMessages() {
    // REVESING MESSAGES ORDER (NEWEST TO LATEST)
      return this.messages.slice().reverse();
    },
  },

  // WHEN THE PAGE IS MOUNTED/CREATED THIS WILL RUN, AND IT WILL MAKE A REQUEST TO THE API
  mounted() {
    fetch(API_URL).then((reponse) => reponse.json()).then((result) => {
      this.messages = result;
    });
  },
  methods: {
    // A POST REQUEST WILL DONE TO THE URL
    // AND THE BODY WILL BE WHATEVER IS TYPED IN THE FORM AS A JSON
    // AND IT IS NEEDED TO TELL THE SERVER ITS A JSON
    addMessage() {
      console.log(this.message);
      // SENDING DATA TO THE SERVER
      // A FETCH ITS A GET REQUEST, BUT THE BACKEND ITS SET UP TO RECEIVE A POST REQUEST
      fetch(API_URL, {
        method: 'POST',
        // THE SERVER ONLY UNDERSTANDS JSON, SO A STRINGIFY IS NEEDED IN THE MESSAGE
        body: JSON.stringify(this.message),
        // ITS NEEDED TO TELL THE SERVER THAT A JSON DATA IS BEEN SENDED
        headers: {
          'content-type': 'application/json',
        },
      }).then((reponse) => reponse.json()).then((result) => {
        if (result.details) {
          // TAKES ALL THE ERROR IN THE DETAIS ARRAY
          // TAKES ONLY THE MESSAGE AND SHOW ON THE PAGE
          const error = result.details.map((detail) => detail.message).join('. ');
          this.error = error;
        } else {
          this.error = '';
          this.showMessageForm = false;
          this.messages.push(result);
        }
      });
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
