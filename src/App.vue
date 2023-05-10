<template>
  <v-app style="height: 100%">
    <v-app-bar app clipped-left clipped-right color="app" dark>
      <v-toolbar-title>TKS</v-toolbar-title>
    </v-app-bar>
    <v-main style="overflow-y: auto; height: 100%; overflow-x: hidden">
      <router-view></router-view>
      <v-container v-if="false" fluid fill-height>
        <v-row align="center" justify="center">
          <v-col cols="12" md="8" lg="4">
            <v-card class="mx-auto my-12 pa-8" id="login-card">
              <v-card-title class="headline" id="login-header">Login</v-card-title>
              <v-form ref="login" id="login-form">
                <v-alert>
                  <span>Lütfen Kişisel Agridin Hesabınızın Bilgileri İle Giriş Yapınız.</span>
                </v-alert>
                <v-text-field v-model="person.username" :rules="[rules.required]" label="Username"></v-text-field>
                <v-text-field v-model="person.password" :rules="[rules.required]" label="Password" type="password"></v-text-field>
                <v-btn @click="login()" id="login-btn">Login</v-btn>
              </v-form>
            </v-card>
          </v-col>
        </v-row>
        <my-alert v-if="alert.show" :alert.sync=alert></my-alert>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Vue from 'vue'
import Alert from "@/components/Alert.vue"

Vue.component('my-alert', Alert)

export default {
  name: 'app',
  data: () => ({
    person: { username: '', password: '' },
    rules: {
      required: (value) => !!value || 'Field is required'
    },
    alert:{show:false, type:"",text:""}
  }),

  methods: {
    async login() {
      try {
        await this.axios.post('http://localhost:1453/seleniumAgridin/login', this.person)
        localStorage.setItem('username', this.person.username)
        localStorage.setItem('password', this.person.password)
      } catch (error) {
        this.alert = {show:true, text:error.response.data.message, type:"error"}
      }
    }
  },
  mounted() {
    if(localStorage.getItem('username') && localStorage.getItem('password')) this.$router.push( {path: "/order-tracking"})
  },
}
</script>

<style>
.v-navigation-drawer--temporary.v-navigation-drawer--clipped {
  z-index: 5;
  margin-top: 64px;
}
#login-card {
  max-width: 400px;
  margin: 0 auto;
  margin-top: 50px;
  padding: 20px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
}

#login-header {
  text-align: center;
  margin-bottom: 30px;
}

#login-form {
  display: flex;
  flex-direction: column;
}

#login-form > * {
  margin-bottom: 20px;
}

#login-btn {
  background-color: #009688;
  color: #fff;
  border-radius: 5px;
  font-weight: bold;
  padding: 10px;
  transition: background-color 0.2s;
}

#login-btn:hover {
  background-color: #008080;
  cursor: pointer;
}
</style>
