<template>
    <div class="header">
        <img alt="icon entreprise groupomania, page forum" src="../assets/icon-one.png" >
        <nav>
            <ul>
                <li><button class="header__button-i" @click="forum()">Profil</button></li>
                <li><button class="header__button-i" @click="logout()"><i class="fa-solid fa-power-off"></i></button></li>
            </ul>
        </nav>    
    </div>
    <div class="card">
        <div class="card__create-post" v-if=" adPost == true">
            <form class="form">
                <h2> Votre Publication </h2>
                <div class="form__post">
                    <label for="description">Description :</label>
                    <textarea class="description" id="description" rows="10" cols="50" required="true"></textarea>
                </div>
                <div class="form__input" method="post" enctype="multipart/form-data">
                    <label for="file" class="label-file">Sélectionner le fichier à envoyer :</label>
                    <input class="input-file" type="file" accept="image/*" id="file" name="file" />
                </div>
                <div class="form__button">
                    <button class="button-form" @click="createPost()">Publier</button>
                    <button class="button-form" @click="cancelCreate()"><i class="fa-solid fa-trash-can"></i></button>
                </div>
            </form>
        </div>
        <div class="card__create" v-else>
            <h2>Créer une publication</h2> 
            <button class="button-create" @click="clickCreatePost()"><i class="fa-solid fa-circle-plus"></i></button>
        </div>
        <div class="card__post" v-for="post in posts">
            <form class="form">
                <h2> Publication </h2>
                <div class="form__post">
                    <label for="description">Description :</label>
                    <p v-if="modifyPost == false">Poster par {{this.$store.state.user.username}} <br>
                    
                    </p>
                    <textarea class="description" id="description" rows="10" cols="50" required="true" v-else></textarea>
                </div>
                <div class="form__button" v-if="modifyPost == false">
                    <button class="button-form" @click="clickUpdatePost()"><i class="fa-solid fa-pencil"></i></button>
                </div>
                <div class="form__updatePost" v-else>  
                    <div class="form__input" method="post" enctype="multipart/form-data">
                        <label for="file" class="label-file">Sélectionner le fichier à envoyer :</label>
                        <input class="input-file" type="file" accept="image/*" id="file" name="file" />
                    </div>
                    <div class="form__button">
                        <button class="button-form">Publier</button>
                        <button class="button-form" @click="cancelPost()"><i class="fa-solid fa-trash-can"></i></button>
                    </div>
                </div>    
            </form>
        </div>
    </div>

</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'Forum',
    
    data: function () {
        return {
            mode: 'forum',
            file: '',
            content: '',
            adPost : false,
            modifyPost: false,
            posts: []
        }
    },
    created: {
        displayPost: function() {
            axios('localhost:3000/api/posts')
            this.posts = data.post;
            return ;  
        }
    },
    mounted: function () {
        if (this.$store.state.user.userId == -1) {
            this.$router.push('/login');
            return ;
        }
    },
    computed: {
        ...mapState({
        user: 'users',
        post: 'posts'
        })
    },
    methods: {
        clickCreatePost: function () {
            this.adPost= true;
        },       
        cancelCreate: function () {
            this.adPost= false;
        },
        clickUpdatePost: function () {
            this.modifyPost= true;
        },
        cancelPost: function () {
            this.modifyPost= false;
        },
        logout: function () {
            this.$store.commit('logout');
            this.$router.push('/login');
        },
        forum: function () {
            this.$router.push('/profile');
        },
        createPost: function () {
            this.$store.dispatch('createPost', {
            content: this.content,
            file: this.file
            })
            .then(function (response){
                let post = {
                    content: response.data.post.content,
                    file: response.data.post.file
                }
                localStorage.setItem("post", JSON.stringify(post));
                //router.push('/forum');
            })
            .catch(function (error) {
                console.log(error);
            })
        }
    }
}
</script>

<style scoped>
.header{
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap; 
    width: 100%;
    background: linear-gradient(to right, #fe2712, #fa8072);
    box-shadow: 0px 0px 50px 0px #fe2712;
    border-radius: 25px; 
    margin-bottom: 5%;
}
img{
    width: 50%;
}
nav{
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
.card__create {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    width: 40%;
    margin: auto;
    margin-bottom: 2%;
    background: linear-gradient(#fe2712, #fa8072);
    border-radius: 25px;
    box-shadow: 0px 0px 25px 0px #fe2712;
    opacity: 0.96;
}
.button-create {
    padding: 2% 2%;
    margin-bottom: 2%; 
    background: #2c3e50;
    font-size: 16px;
    font-weight: bold;
    color: #fe2712;
    border-radius: 25px;
    cursor: pointer;
    border-color: #fe2712;
}
.button-create:hover {
    background: #fe2712;
    box-shadow: 0px 0px 50px 0px black;
    color: #2c3e50;
    font-weight: bold;
    border-color: #2c3e50;
}
.card__create-post {
    display: flex;
    flex-direction: column;
    text-align: center;
    width: 50%;
    margin: 2% auto;
    background: linear-gradient(#fe2712, #fa8072);
    border-radius: 25px;
    box-shadow: 0px 0px 25px 0px #fe2712;
    opacity: 0.96;
}
.card__post {
    display: flex;
    flex-direction: column;
    text-align: center;
    width: 50%;
    margin: auto;
    background: linear-gradient(#fe2712, #fa8072);
    border-radius: 25px;
    box-shadow: 0px 0px 25px 0px #fe2712;
    opacity: 0.96;
}
.form {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
h2 {
    color: white;
}
label {
    font-weight: bold;
    font-size: 18px;
    color: black;
}
.description {
    padding: 2%;
    width: 90%;
    border-radius: 20px;
    background: #2c3e50;
    font-size: 18px;
    color: white; 
}
.form__input {
    width: 100%;
    margin-top: 2%;
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
.button-form {
    background: #2c3e50;
    font-size: 16px;
    font-weight: bold;
    color: #fe2712;
    padding: 2% 5%;
    margin: 5% 2%;
    border-radius: 20px;
    cursor: pointer;
    border-color: #fe2712;
}
.button-form:hover {
    background: #fe2712;
    box-shadow: 0px 0px 50px 0px #fe2712;
    color: #2c3e50;
    font-weight: bold;
    border-color: #2c3e50;
}
</style>