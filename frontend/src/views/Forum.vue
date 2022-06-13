<template>
  <div class="container">
    <div class="header"> 
        <img  alt="icon entreprise groupomania, page forum" src="../assets/icon-one.png" />
      <nav>
        <ul>
          <li>
            <button class="header__button-i btn" @click="forum()">Profil</button>
          </li>
          <li>
            <button class="header__button-i btn" @click="logout()">
              <i class="fa-solid fa-power-off"></i>
            </button>
          </li>
        </ul>
      </nav>
    </div>
    <div>
     

        <div class="container-fluid gedf-wrapper">
          <div class="row">
            <div class="col-md-3">
              <div class="card">
                <div class="card-body">
                  <div class="h5">@{{$store.state.user.username}}</div>
                  <div class="h7 text-muted"> {{$store.state.user.firstname+" "+$store.state.user.lastname}}</div>
                  <div class="h7">
                    {{$store.state.user.job}}
                  </div> </div>
              
                </div>
              </div>
              <div class="col-md-6 gedf-main">
                <!--- \\\\\\\Post-->
                <div class="card gedf-card" >
                  <div class="card-header">
                    <h4>Bienvenue sur votre réseau d'entreprise !</h4>
                  </div>
                  <div class="card-body">
                    <div class="tab-content" id="myTabContent">
                      <div class="tab-pane fade show active" id="posts" role="tabpanel" aria-labelledby="posts-tab" >
                        <div class="form-group">
                          <label class="sr-only" for="message">post</label>
                          <textarea class="form-control" v-model="content" id="message" rows="3"  placeholder="Ecrivez votre texte ici?" ></textarea>
                        </div>
                        <div class="form-group">
                            <label class="sr-only" for="message">Image</label>
                            <div class="custom-file">
                            <input  type="file" class="custom-file-input" name="image" id="imagePost"  @change="onFileUpload"/>
                            <label class="custom-file-label" for="imagePost" >Télécharger une image</label>
                          </div>
                        </div>
                      </div>
                     
                    </div>
                    <div class="btn-toolbar justify-content-between">
                        <div class="btn-group">
                          <button type="submit" class="btn btn-danger" @click="createPost()">Publier</button>
                        </div>
                       
                      </div>
                    </div>
                </div>
                <!-- Post /////-->
    
                <!--- \\\\\\\Post-->
                <div class="card gedf-card mt-3" v-for="post in posts">
                  <div class="card-header">
                    <div class="d-flex justify-content-between align-items-center">
                      <div class="d-flex justify-content-between align-items-center" v-if="post">
                        <div class="">
                            <div class="h5 m-0">@{{post.User.username}}</div>
                            <div class="h7 text-muted">{{post.User.firstname +" "+post.User.lastname}}</div>
                          </div>
                        </div>
                        <div>
                          <div class="dropdown">
                            <button class="btn btn-link dropdown-toggle" type="button" id="gedf-drop1" data-toggle="dropdown"
                              aria-haspopup="true" aria-expanded="false"  >
                              <i class="fa fa-ellipsis-h"></i>
                            </button>
                            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="gedf-drop1" >
                              <div class="h6 dropdown-header">Configuration</div>
                              <a class="dropdown-item" href="#">Save</a>
                              <a class="dropdown-item" href="#">Hide</a>
                              <a class="dropdown-item" href="#">Report</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="card-body">
                      <div class="text-muted h7 mb-2">
                        <i class="fa fa-clock-o"></i>10 min ago
                      </div>
                      <p class="card-text" v-if="post.content != 'null'">
                        {{post.content}}
                      </p>
                      <div v-if="post.file">
                        <img :src="post.file" class="" alt="">
                      </div>
                    </div>
                    <div class="card-footer">
                      
                     
                      <button class="btn btn-primary mx-2" ><i class="fa fa-gittip"></i> Like</button>
                      <button class="btn btn-primary mx-2" ><i class="fa fa-comment"></i> Commentaires</button>
                      <button class="btn btn-primary mx-2" ><i class="fa fa-plus"></i> Commenter</button>
                    </div>
                    <div class="commentaires">
                       <div class="card">
                      <div class="p-1">
                          <h6>Commentaires</h6>
                      </div>
                      <div class="d-flex flex-row align-items-center p-3 form-color"> 
                        <input type="text" class="form-control" placeholder="Enter your comment..."> 
                      </div>
                      <div class="" v-if="post.Comments.length > 0">
                          <div class="d-flex flex-row p-3 commentaire" v-for="comment in post.Comments"> 
                              <div class="w-100">
                                  <div class="d-flex justify-content-between align-items-center">
                                      <div class="d-flex flex-row align-items-center"> 
                                        <span class="mr-2">{{comment.User.username}}</span> 
                                      </div> 
                                      <small>12h ago</small>
                                  </div>
                                  <p class="text-justify comment-text mb-0">{{comment.contentComment}}</p>
                              </div>
                          </div>

                                    
                </div>
            </div>
              </div>
            </div>
            <!-- Post /////-->

            
          </div>
          
        </div>
      </div>
    </div>

    <!--<div class="card">
      <div class="card__create-post" v-if="adPost == true">
        <form class="form">
          <h2>Votre Publication</h2>
          <div class="form__post">
            <label for="description">Description :</label>
            <textarea
              class="description"
              id="description"
              rows="10"
              cols="50"
              required="true"
            ></textarea>
          </div>
          <div class="form__input" method="post" enctype="multipart/form-data">
            <label for="file" class="label-file"
              >Sélectionner le fichier à envoyer :</label
            >
            <input
              class="input-file"
              type="file"
              accept="image/*"
              id="file"
              name="file"
            />
          </div>
          <div class="form__button">
            <button class="button-form" @click="createPost()">Publier</button>
            <button class="button-form" @click="cancelCreate()">
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </div>
        </form>
      </div>
      <div class="card__create" v-else>
        <h2>Créer une publication</h2>
        <button class="button-create" @click="clickCreatePost()">
          <i class="fa-solid fa-circle-plus"></i>
        </button>
      </div>
      <div class="card__post" v-for="post in posts">
        <form class="form">
          <h2>Publication</h2>
          <div class="form__post">
            <label for="description">Description :</label>
            <p v-if="modifyPost == false">
              Poster par {{ this.$store.state.user.username }} <br />
            </p>
            <textarea
              class="description"
              id="description"
              rows="10"
              cols="50"
              required="true"
              v-else
            ></textarea>
          </div>
          <div class="form__button" v-if="modifyPost == false">
            <button class="button-form" @click="clickUpdatePost()">
              <i class="fa-solid fa-pencil"></i>
            </button>
          </div>
          <div class="form__updatePost" v-else>
            <div
              class="form__input"
              method="post"
              enctype="multipart/form-data"
            >
              <label for="file" class="label-file"
                >Sélectionner le fichier à envoyer :</label
              >
              <input
                class="input-file"
                type="file"
                accept="image/*"
                id="file"
                name="file"
              />
            </div>
            <div class="form__button">
              <button class="button-form">Publier</button>
              <button class="button-form" @click="cancelPost()">
                <i class="fa-solid fa-trash-can"></i>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>-->
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'Forum',
    name: "Forum",

  data: function () {
    return {
      mode: "forum",
      file: null,
      content: "TEXT CONTENT",
      token: "",
      adPost: false,
      modifyPost: false,
      posts: [],
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
    axios.get("http://localhost:3000/api/posts",this.configHeaders)
      // fonction qui affiche les posts boucle sur chaque post et passe tous les showUpdate à false + les showDoCom à false
      .then((response) => {
        this.posts = response.data;
        console.log(response)
      })
      .catch((error) => console.log(error));
  },
  computed: {
    ...mapState({
      user: "users",
      post: "posts",
    }),
  },
  methods: {
    onFileUpload (event) {
      this.file = event.target.files[0]
    },
<<<<<<< HEAD
    /*created: {
        displayPost: function() {
            axios('localhost:3000/api/posts')
            this.posts = data.post;
            return ;  
        }
    },*/
    mounted: function () {
        if (this.$store.state.user.userId == -1) {
            this.$router.push('/login');
            return ;
        }
=======
     clickCreatePost: function () {
      this.adPost = true;
    },
    cancelCreate: function () {
      this.adPost = false;
>>>>>>> df42e91500affbcf3864356ad46c3bc8d2e8156d
    },
    clickUpdatePost: function () {
      this.modifyPost = true;
    },cancelPost: function () {
      this.modifyPost = false;
    },
    logout: function () {
      this.$store.commit("logout");
      this.$router.push("/login");
    },
    forum: function () {
      this.$router.push("/profile");
    },
    createPost: function () {
          // upload file
          const formData = new FormData()
          console.log(this.$store.state.user)
          formData.append('image', this.file);
          formData.append('content', this.content);
          formData.append('UserId', this.$store.state.user.id)
          axios({ 
            method: "post",
            url: `http://localhost:3000/api/posts`,
            data: formData,
            headers: {
            "content-type": "multipart/form-data",
            Authorization: `Bearer ${this.token}`,
          }
          })
          .then(() => {
            // passe les inputs contentPost et attachment à null
            this.content = null;
            document.querySelector("#imagePost").value = null;
            //this.displayPosts();
          })
          //.catch((error) => console.log(error));
          .catch((error) => console.log("l'erreur est ici=======", error));
 
    },
  },
};
</script>

<style scoped>
.commentaire{
    border: 1px solid gray;
    border-radius: 5px;
    margin:5px
  }
.header {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  width: 100%;
  background: linear-gradient(to right, #fe2712, #fa8072);
  box-shadow: 0px 0px 50px 0px #fe2712;
  border-radius: 25px;
  margin-bottom: 5%;
}
+img {
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
  color: #fe2712;
  
  border-color: #fe2712;
}
.header__button-i:hover {
    background: #fe2712;
  box-shadow: 0px 0px 50px 0px black;
  color: #2c3e50;
  font-weight: bold;
  border-color: #2c3e50;
}
.card{
  border: 1px solid rgb(162 12 12 / 75%);
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
@ -240,50 +443,50 @@ li {
  justify-content: center;
}
h2 {color: white;
}
label {font-weight: bold;
  font-size: 18px;
  color: black;
}
.description {padding: 2%;
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