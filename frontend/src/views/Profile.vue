<template>
    <div class="header">
        <img alt="icon entreprise groupomania, page profil" src="../assets/icon-two.png" >
        <nav>
            <ul>
                <li><button class="header__button-i btn" @click="forum()">Forum</button></li>
                <li><button class="header__button-i btn" @click="logout()"><i class="fa-solid fa-power-off"></i></button></li>
            </ul>
        </nav>    
    </div>
    <div class="card">
        <h1 class="card__title">Espace Perso</h1>
        <div class="card__form">
            <p class="userinfo-title">Pseudo:</p>
            <p>{{this.$store.state.user.username}}</p>
            <input class="card__form-input" type="text" placeholder="Pseudo" v-if="updateUsername == true" />
            <button class="button-i" @click="updateUserName()" v-else><i class="fa-solid fa-screwdriver-wrench"></i></button>
        </div>    
        <div class="card__form">
            <p class="userinfo-title">Nom:</p>
            <p>{{this.$store.state.user.lastname}}</p>
            <input class="card__form-input" type="text" placeholder="Nom" v-if="updateLastname == true" />
            <button class="button-i" @click="updateUserLastname()" v-else><i class="fa-solid fa-screwdriver-wrench"></i></button>
        </div>        
        <div class="card__form">
            <p class="userinfo-title">Prénom:</p>
            <p>{{this.$store.state.user.firstname}}</p>
            <input class="card__form-input" type="text" placeholder="Prénom" v-if="updateFirstname == true" />
            <button class="button-i" @click="updateUserFirstname()" v-else><i class="fa-solid fa-screwdriver-wrench"></i></button>
        </div>
        <div class="card__form">
            <p class="userinfo-title">Métier:</p>
            <p>{{this.$store.state.user.job}}</p>
            <input class="card__form-input" type="text" placeholder="Job" v-if="updateJob == true" />
            <button class="button-i" @click="updateUserJob()" v-else><i class="fa-solid fa-screwdriver-wrench"></i></button>
        </div>
        <div class="card__form">
            <p class="userinfo-title">Email:</p>
            <p>{{this.$store.state.user.email}}</p>
            <input class="card__form-input" type="email" placeholder="Adresse mail" v-if="updateEmail == true" />
            <button class="button-i" @click="updateUserEmail()" v-else><i class="fa-solid fa-screwdriver-wrench"></i></button>
        </div>     
        <div class="form-button">
            <button class="button-i" @click="updateProfile(user)">Enregistrer</button>        
        </div>
        <div class="card__form-button">
            <button class="button" @click="logout()">
                Déconnexion<br>
                <i class="fa-solid fa-power-off"></i>
            </button>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    
    name: 'Profile',
    data: function() {
        return {
          updateUsername: false,
          updateLastname: false,
          updateFirstname: false,
          updateJob: false,
          updateEmail: false,
          token: ""
        };
    },
    mounted: function () {
      if (this.$store.state.user.userId == -1) {
        this.$router.push("/login");
        return;
      }
      this.token = localStorage.getItem('token');
        let configHeaders = {
            headers: {
                Authorization: `Bearer ${this.token}`,
            },
        };
    },
    computed: {
        ...mapState({
        user: 'users',
        })
    },
    methods: {
        logout: function () {
            this.$store.commit('logout');
            this.$router.push('/login');
        },
        forum: function () {
            this.$router.push('/forum');
        },
        updateUserName: function () {
            this.updateUsername = true;
        },
        updateUserLastname: function () {
            this.updateLastname = true;
        },
        updateUserFirstname: function () {
            this.updateFirstname = true;
        },
        updateUserJob: function () {
            this.updateJob = true;
        },
        updateUserEmail: function () {
            this.updateEmail = true;
        },
        updateProfile: function (user) {
        /*const formData = new FormData()
        formData.append('username', this.$store.state.user.username);
        formData.append('lastname', this.$store.state.user.lastname);
        formData.append('firstname', this.$store.state.user.firstname);
        formData.append('job', this.$store.state.user.job);
        formData.append('email', this.$store.state.user.email);
        axios({
          method: "put",
          url: `http://localhost:3000/api/users/${this.$store.state.user.id}`,
          data: formData,
          headers: {
            "content-type": "multipart/form-data",
            Authorization: `Bearer ${this.token}`,
          }
        })
          .then(() => {
            alert("Modification enregistrée avec succée !")
            location.reload('/profile');
          })
          .catch((error) => console.log("l'erreur est ici=======", error));*/
        }
    }
}
</script>

<style scoped>
.header {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap; 
    width: 100%;
    margin-bottom: 5%;
    background: linear-gradient(to right, #FD2D01, #FFD7D7);
    border: 2px solid #4E5166;
    box-shadow: 0px 0px 50px 0px #FD2D01;
    border-radius: 25px;
}
img {
    width: 50%;
}
nav {
    width: 50%;
}
ul {
    display: flex;
    flex-direction: row;
    justify-content: center;
    list-style-type: none;
    font-weight: bold;
    font-size: 18px;
    padding: 5% 5%;
}
li {
    margin: 0 10%;
}
.header__button-i {
    background: #4E5166;
    font-size: 16px;
    color: #FD2D01;
    cursor: pointer;
    border-color: #FD2D01;
}
.header__button-i:hover {
    background: #FD2D01;
    box-shadow: 0px 0px 50px 0px black;
    color: #4E5166;
    font-weight: bold;
    border-color: #4E5166;
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

.card__title{
    border-bottom: 2px solid #4E5166;
    margin-bottom: auto;
}
h1{
    color: white;
}
p {
    font-size: 18px;
    color: black;  
}
.userinfo-title{
    text-decoration: underline;
    font-weight: bold;
    border-bottom: 2px solid #4E5166;
    background: white;
}
.card__form{
    border-bottom: 2px solid #4E5166; 
}
.card__form-input {
    padding: 2%;
    margin-bottom: 2%;
    width: 50%;
    border-radius: 20px;
    border-color: #FD2D01;
    background: #4E5166;
    font-size: 16px;
    color: white;  
    text-overflow: ellipsis;
}
.form-button{
    margin-top: auto;
    font-weight: bold;
    color: black;
    border-bottom: 2px solid #4E5166; 
}
.input-submit {
    background: #4E5166;
    font-size: 16px;
    font-weight: bold;
    color: #FD2D01;
    margin: 2%;
    padding: 2% 2%;
    border-radius: 25px;
    cursor: pointer;
    border-color: #FD2D01;
}
.input-submit:hover {
    background: #FD2D01;
    box-shadow: 0px 0px 50px 0px black;
    color: #4E5166;
    font-weight: bold;
    border-color: #4E5166;
}
.button-i {
    background: #4E5166;
    font-size: 16px;
    font-weight: bold;
    color: #FD2D01;
    padding: 2% 2%;
    margin: 2% 0;
    border-radius: 25px;
    cursor: pointer;
    border-color: #FD2D01;
}
.button-i:hover {
    background: #FD2D01;
    box-shadow: 0px 0px 50px 0px black;
    color: #4E5166;
    font-weight: bold;
    border-color: #4E5166;
}
.button {
    background: #4E5166;
    font-size: 16px;
    font-weight: bold;
    color: #FD2D01;
    padding: 2% 2%;
    margin: 2% 0;
    border-radius: 35px;
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
</style>