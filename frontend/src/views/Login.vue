<template>
  <div id="header">
  <router-link to="/"><img alt="Header Logo" src="../assets/header.png"></router-link>
  <nav>
    <router-link to="/signup">Inscription</router-link> |
    <router-link to="/login">Connexion</router-link>
  </nav>
  <router-view/>
  </div>
  <h1>Bienvenue sur votre réseau d'entreprise !</h1>
  <div class="card">
    <h2 class="card__title">Connexion</h2>
    <p class="card__subtitle">Vous n'avez pas encore de compte ? <br><a href="./signup">Inscrivez-vous !</a></p>
    <div class="form">
      <input v-model="email" class="form__input" type="email" placeholder="Adresse mail" />
    </div>
    <div class="form">
      <input v-model="password" class="form__input" type="password" placeholder="Mot de passe" />
    </div>
    <div class="form-msg" v-if="status == 'error_login'">
      Adresse mail et/ou mot de passe invalide
    </div>
    <div class="form">
      <button class="button" @click="loginAccount()" :class="{'button--disabled' : !formValidate}">
      <span v-if="status == 'loading'"><i class="fa-solid fa-cog fa-spin"></i></span>
      <span v-else>Connexion</span>
      </button>
    </div>
  </div>
</template>
<script>
import router from "../router/index";
import { mapState } from 'vuex'

export default {
  name: 'Login',
  
  data: function () {
    return {
      mode: 'login',
      email: '',
      password: ''
    }
  },
  mounted: function () {
    if (this.$store.state.user.userId != -1) {
      this.$router.push('/forum');
      return ;
    }
  },
  computed: {
    formValidate: function () {
        if ( this.email != "" && this.password != "") {
          return true;
        } else {
          return false;
        }
      },
    ...mapState(['status'])
    },
  methods: {
    loginAccount: function () {
      this.$store.dispatch('loginAccount', {
        email: this.email,
        password: this.password
      })
    .then(function (response){
        localStorage.setItem('token', response.data.token);
        let user = {
          id: response.data.user.id,
          username: response.data.user.username,
          lastname: response.data.user.lastname,
          firstname: response.data.user.firstname,
          is_admin: response.data.user.is_admin,
          job: response.data.user.job,
          email: response.data.user.email,
          password: response.data.user.password
        }
        localStorage.setItem("user", JSON.stringify(user));
        location.reload();
      })
      .catch(function (error) {
        console.log(error);
      })
    }
  }
}
</script>
<style scoped>
#header {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  width: 100%
}
img {
  width: 50%;
}
nav a {
  font-weight: bold;
  color: #4E5166;
}
nav a:hover {
  color: #FD2D01;
}
.card {
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 50%;
  margin:auto;
  background: linear-gradient(#FD2D01, #FFD7D7);
  border: 2px solid #4E5166;
  border-radius: 25px;
  box-shadow: 0px 0px 25px 0px #FD2D01;
  opacity: 0.96;
}
p a {
  text-decoration: none;
  font-weight: bold;
  color: #001bff;
}
p a:hover {
  color: #001bff;
  font-weight: bold;
  text-decoration: underline;
}
.form {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: 12px 20px;
}
.form__input {
  padding: 2%;
  width: 90%;
  border: ;
  border-radius: 20px;
  border-color: #FD2D01;
  background: #4E5166;
  font-size: 16px;
  color: white;  
  text-overflow: ellipsis;
}
.form__input::placeholder {
  color: #bebebe;
}
.form-msg {
  font-weight: bold;
  color: red;
}
.button {
  background: #4E5166;
  font-size: 16px;
  font-weight: bold;
  color: #FD2D01;
  padding: 2% 5%;
  border-color: #FD2D01;
  border-radius: 20px;
  cursor: pointer;
}
.button:hover{
  background: #FD2D01;
  box-shadow: 0px 0px 50px 0px #FD2D01;
  color: #4E5166;
  font-weight: bold;
  border-color: #4E5166;
}
.button--disabled {
    background: #cecece;
    color: #4E5166;
    border: none;
  }
.button--disabled:hover {
   cursor: not-allowed;
    color: grey;
    background: #cecece;
    box-shadow: none;
    border: none;
  }
</style>