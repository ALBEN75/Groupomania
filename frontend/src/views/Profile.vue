<template>
    <div class="header">
        <img alt="icon entreprise groupomania, page profil" src="../assets/icon-two.png" >
        <nav>
            <ul>
                <li><button class="header__button-i" @click="forum()">Forum</button></li>
                <li><button class="header__button-i" @click="logout()"><i class="fa-solid fa-power-off"></i></button></li>
            </ul>
        </nav>    
    </div>
    <div class="card">
        <h1 class="card__title">Espace Perso</h1>
        <div class="card__form">
        
        </div>
        <div class="card__form">
            <p>{{this.$store.state.user.username}}</p>
            <input class="card__form-input" type="text" placeholder="Pseudo" />
            <button class="button-i" @click="getItem()"><i class="fa-solid fa-screwdriver-wrench"></i></button>
        </div>    
        <div class="card__form">
            <p>{{this.$store.state.user.lastname}}</p>
            <input class="card__form-input" type="text" placeholder="Nom" />
            <button class="button-i"><i class="fa-solid fa-screwdriver-wrench"></i></button>
        </div>        
        <div class="card__form">
            <p>{{this.$store.state.user.firstname}}</p>
            <input class="card__form-input" type="text" placeholder="Prénom" />
            <button class="button-i"><i class="fa-solid fa-screwdriver-wrench"></i></button>
        </div>
        <div class="card__form">
            <p>{{this.$store.state.user.job}}</p>
            <input class="card__form-input" type="text" placeholder="Job" />
            <button class="button-i"><i class="fa-solid fa-screwdriver-wrench"></i></button>
        </div>
        <div class="card__form">
            <p>{{this.$store.state.user.email}}</p>
            <input class="card__form-input" type="email" placeholder="Adresse mail" />
            <button class="button-i"><i class="fa-solid fa-screwdriver-wrench"></i></button>
        </div>     
        <div class="form-file" method="post" enctype="multipart/form-data">
            <label for="file" class="label-file">Sélectionner votre photo de profil :</label>
            <input class="input-file" type="file" accept="image/*" id="file" name="file" />
            <input class="input-submit" type="submit" value="Enregistrer"/>        
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
    mounted: function () {
        if (this.$store.state.user.userId == -1) {
        this.$router.push('/login');
        return ;
        } 
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
        getItem: function () { 
            addEventListener('click', function () {
                localStorage.getItem('user') ;
            });
        },
        getUser: function () {
            console.log(localStorage.getItem('user'));
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
    background: linear-gradient(to right, #fe2712, #fa8072);
    box-shadow: 0px 0px 50px 0px #fe2712;
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
    background: #2c3e50;
    font-size: 16px;
    font-weight: bold;
    color: #fe2712;
    padding: 10% 15%;
    border-radius: 25px;
    cursor: pointer;
    border-color: #fe2712;
}
.header__button-i:hover {
    background: #fe2712;
    box-shadow: 0px 0px 50px 0px black;
    color: #2c3e50;
    font-weight: bold;
    border-color: #2c3e50;
}
.card {
    display: flex;
    flex-direction: column;
    text-align: center;
    width: 50%;
    margin:auto;
    background: linear-gradient(#fe2712, #fa8072);
    border-radius: 25px;
    box-shadow: 0px 0px 25px 0px #fe2712;
    opacity: 0.96;
}
h1{
    color: white;
}
p {
    font-size: 18px;
    font-weight: bold;
    color: black;  
}
.card__form-input {
    padding: 2%;
    width: 50%;
    border-radius: 20px;
    border-color: #fe2712;
    background: #2c3e50;
    font-size: 16px;
    color: white;  
    text-overflow: ellipsis;
}
.input-file {
    background: #2c3e50;
    font-size: 16px;
    color: #fe2712;
    width: 80%;
    padding: 2% 5%;
    margin: 0 5%;
    border-radius: 20px;
}
.form-file{
    margin-top: 5%;
    font-weight: bold;
    color: black;
}
.input-submit {
    background: #2c3e50;
    font-size: 16px;
    font-weight: bold;
    color: #fe2712;
    margin-top: 2%;
    padding: 2% 2%;
    border-radius: 25px;
    cursor: pointer;
    border-color: #fe2712;
}
.input-submit:hover {
    background: #fe2712;
    box-shadow: 0px 0px 50px 0px black;
    color: #2c3e50;
    font-weight: bold;
    border-color: #2c3e50;
}
.button-i {
    background: #2c3e50;
    font-size: 16px;
    font-weight: bold;
    color: #fe2712;
    padding: 2% 2%;
    margin: 0 2%;
    border-radius: 25px;
    cursor: pointer;
    border-color: #fe2712;
}
.button-i:hover {
    background: #fe2712;
    box-shadow: 0px 0px 50px 0px black;
    color: #2c3e50;
    font-weight: bold;
    border-color: #2c3e50;
}
.button {
    background: #2c3e50;
    font-size: 16px;
    font-weight: bold;
    color: #fe2712;
    padding: 5% 2%;
    margin: 10% 0;
    border-radius: 20px;
    cursor: pointer;
    border-color: #fe2712;
}
.button:hover {
    background: #fe2712;
    box-shadow: 0px 0px 50px 0px #fe2712;
    color: #2c3e50;
    font-weight: bold;
    border-color: #2c3e50;
}
</style>