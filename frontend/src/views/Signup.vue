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
    <h2 class="card__title">Inscription</h2>
    <p class="card__subtitle">Vous avez déjà un compte ? <br><a href="./login">Connectez-vous !</a></p>
    <div class="form">
      <input v-model="username" class="form__input" type="text" placeholder="Pseudo" />
    </div>
    <div class="form">
      <input v-model="lastname" class="form__input" type="text" placeholder="Nom" />
    </div>
    <div class="form">
      <input v-model="firstname" class="form__input" type="text" placeholder="Prénom" />
    </div>
    <div class="form">
      <input v-model="job" class="form__input" type="text" placeholder="Job" />
    </div>
    <div class="form">
      <input v-model="email" class="form__input" type="email" placeholder="Adresse mail" />
    </div>
    <div class="form">
      <input v-model="firstpassword" class="form__input" type="password" placeholder="Mot de passe" />
    </div>
    <div class="form">
      <input v-model="password" class="form__input" type="password" placeholder="Confirmer mot de passe" />
    </div>
    <div class="form-msg">
      <span v-if="formValidate == false">
      Veuillez remplir les champs vides
      </span>
      <span v-else="formValidate == true">
      </span>
    </div>
    <div class="form-msg">
    <span v-if="status == 'error_signup'"> 
      Adresse mail déjà utilisée ou invalide
      </span>
    </div>
    <div class="form">
      <button class="button" @click="signupAccount()" :class="{'button--disabled' : !formValidate}">
      <span v-if="status == 'loading'"><i class="fa-solid fa-cog fa-spin"></i></span>
      <span v-else>Inscription</span>
      </button>
    </div>
  </div>
</template>

<script>
import router from "../router/index";
import { mapState } from 'vuex'

export default {
  name: 'Signup',
  
  data: function () {
    return {
      mode: 'signup',
      username: '',
      lastname: '',
      firstname: '',
      job: '',
      email: '',
      firstpassword: '',
      password: '',
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
        if (this.username != "" && this.lastname != "" && this.firstname != "" && this.job !="" && this.email != "" && this.firstpassword != "" && this.password != "" && this.firstpassword == this.password) {
          return true;
        } else {
          return false;
        }
      },
    ...mapState(['status'])
    },
  methods: {
    signupAccount: function () {
      this.$store.dispatch('signupAccount', {
        username: this.username,
        lastname: this.lastname,
        firstname: this.firstname,
        job: this.job,
        email: this.email,
        firstpassword: this.firstpassword,
        password: this.password
      })
      .then(function (response){
        router.push('/forum');
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
  margin: auto;
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
  margin: 5px 20px;
}
.form__input {
  padding: 2%;
  width: 90%;
  border-color: #FD2D01;
  border-radius: 20px;
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
  border-radius: 20px;
  cursor: pointer;
  border-color: #FD2D01;
}
.button:hover {
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