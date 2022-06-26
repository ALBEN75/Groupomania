<template>
  <div class="">
    <div class="header">
      <img alt="icon entreprise groupomania, page forum" src="../assets/icon-one.png" />
      <nav>
        <ul class="btn-off">
          <!--<li>
            <button class="header__button-i btn" @click="forum()">Profil</button>
          </li>-->
          <li>
            <button class="header__button-i btn" @click="logout()">
              <i class="fa-solid fa-power-off"></i>
            </button>
          </li>
        </ul>
      </nav>
    </div>
    <div>

      <h1>Bienvenue sur votre réseau d'entreprise !</h1>

      <div class="container-fluid gedf-wrapper">
        <div class="row">
          <div class="col-md-3">
            <div class="card mb-3 cb-left">
              <div class="card-body">
                <div class="user-info">@{{this.$store.state.user.username}}</div>
                <div class="user-info text-muted"> {{$store.state.user.firstname+" "+$store.state.user.lastname}}</div>
                <div class="user-info">
                  {{$store.state.user.job}}
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6 gedf-main ">
            <div class="card gedf-card ">
              <div class="card-header ">
                <h3>Publication</h3>
              </div>
              <div class="card-body d-flex flex-column align-items-center">
                <div class="tab-content" id="myTabContent">
                  <div class="tab-pane fade show active" id="posts" role="tabpanel" aria-labelledby="posts-tab">
                    <div class="form-group">
                      <label class="sr-only" for="message">post</label>
                      <textarea class="form-control" v-model="content" id="message" rows="5"
                        placeholder="Ecrivez votre texte ici !"></textarea>
                    </div>
                    <div class="form-group">
                      <label class="sr-only" for="message">Image</label>
                      <div class="custom-file">
                        <label class="file-label" for="imagePost">Télécharger une image :</label>
                        <input class="file-input" type="file" accept="image/*" id="imagePost" name="image" @change="onFileUpload"/>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="btn-toolbar justify-content-between">
                  <div class="btn-group">
                    <button type="submit" class="btn btn-create" @click="createPost()"><i
                        class="fa-solid fa-pencil"></i> Publier</button>
                  </div>
                </div>
              </div>
            </div>
            <div v-for="post in posts">
              <div class="card gedf-card mt-3" v-if="editedPost && editedPost.id == post.id">
                <div class="card-header ">
                  <h3>Modification</h3>
                </div>
                <div class="card-body d-flex flex-column align-items-center">
                  <div class="tab-content" id="myTabContent">
                    <div class="tab-pane fade show active" id="posts" role="tabpanel" aria-labelledby="posts-tab">
                      <div class="form-group">
                        <label class="sr-only" for="message">post</label>
                        <textarea class="form-control" v-model="editedPost.content" id="message" rows="5"
                          placeholder="Ecrivez votre texte ici !"></textarea>
                      </div>
                      <div class="form-group">
                        <label class="sr-only" for="message">Image</label>
                        <div class="custom-file">
                          <label class="file-label" for="imagePost">Télécharger une image :</label>
                          <input class="file-input" type="file" accept="image/*" id="imagePost" name="image" @change="onFileUpdate"/>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="btn-toolbar justify-content-between">
                    <div class="btn-group">
                      <button type="submit" class="btn btn-create" @click="updatePost()"><i
                          class="fa-solid fa-pencil"></i> Enregistrer</button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card gedf-card mt-3" v-else>
                <div class="card-header align-items-center">
                  <div class="d-flex justify-content-between align-items-center">
                    <div class="d-flex justify-content-between align-items-center" v-if="post">
                      <div class="info_user">
                        <div class="user-info m-0">@{{post.User.username}}</div>
                        <div class="user-info text-muted">{{post.User.firstname +" "+post.User.lastname}}</div>
                      </div>
                    </div>
                    <div class="text-muted mb-2">
                        <span class="time">
                          <i class="fa fa-clock-o"></i><br>
                          {{ formaDate(post.createdAt) }}<br>
                          {{ formaHour(post.createdAt) }}
                        </span>
                      </div>
                    <div>
                      <div class="updatePost d-flex flex-nowrap" v-if="post.User.id == $store.state.user.id || $store.state.user.is_admin == true">
                        <button class="btn btn-warning mr-2" @click="editPost(post)"><i class="fa fa-edit"></i></button>
                        <button class="btn btn-danger" @click="deletePost(post)"><i class="fa fa-trash"></i></button>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="card-body">
                  <p class="card-text" v-if="post.content != 'null'">
                    {{post.content}}
                  </p>
                  <div v-if="post.file">
                    <img :src="post.file" class="" alt="">
                  </div>
                  <span class="heart">
                    <span class="i-heart"><i class="fa-solid fa-heart"> </i> {{post.Likes.length}} </span>
                  </span>
                </div>
                <div class="card-footer p-0">
                  <button class="btn btn-primary mx-2 btn-create" @click="like(post.id)" v-if="!userHasLiked(post.Likes)">
                    <i class="fa-solid fa-heart"></i> J'aime
                  </button>
                  <button class="btn btn-primary mx-2 btn-create" @click="dislike(post.id)" v-else>
                    <i class="fa-solid fa-heart-crack"></i> Je n'aime plus
                  </button>
                  <button class="btn btn-primary mx-2 btn-create" @click="showComment(post)">
                  <i class="fa fa-comment"></i>Commentaires
                    </button>
                </div>
                <div class="comment" v-if="commentToShowPostId == post.id">
                    <div class="" v-if="post.Comments.length > 0">
                      <div class="d-flex flex-row p-3 commentaire" v-for="comment in post.Comments">
                        <div class="user-comment">
                          <span class="mr-2">@{{comment.User.username}}</span>
                          <small><i class="fa fa-clock-o"></i>
                          {{ formaDate(comment.createdAt) }}
                          {{ formaHour(comment.createdAt) }}</small><br>
                          <button class="btn btn-danger ml-2" @click="deleteComment(comment)" v-if="comment.User.id == $store.state.user.id || $store.state.user.is_admin == true">
                            <i class="fa fa-trash"></i>
                          </button>
                          <div class="w-100">
                            <div class=" d-flex justify-content-between align-items-center">
                              <p class="text-justify comment-text mb-0" v-if="comment.contentComment != 'null'">
                                {{comment.contentComment}}
                              </p>
                              <div v-if="comment.fileComment">
                                <img :src="comment.fileComment" class="" alt="">
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="form-comment">
                        <div class="d-flex flex-column mb-4 align-items-center form-color">
                          <label class="sr-only" for="message">comment</label>
                          <textarea class="form-control" v-model="contentComment" id="message" rows="3"
                            placeholder="Ecrivez votre commentaire ici !"></textarea>
                          <div class="btn-toolbar justify-content-between">
                            <div class="btn-group">
                              <button type="submit" class="btn btn-primary mx-2 mt-2 btn-create"
                                @click="createComment(post.id)"><i class="fa-solid fa-pencil"></i> Commenter</button>
                            </div>
                          </div>
                        </div>
                      </div>
                  </div>
              </div> 
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import moment from 'moment'

  export default {
    name: 'Forum',

    data: function () {
      return {
        mode: "forum",
        file: null,
        fileUpdate: null,
        content: "",
        contentComment: "",
        token: "",
        adPost: false,
        modifyPost: false,
        posts: [],
        comments: [],
        commentToShowPostId: null,
        time: true,
        editedPost: null 
      };
    },
    mounted: function () {
      if (!this.$store.state.user) {
        location.reload();
      }
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
      this.loadPosts();
    },
    computed: {
      ...mapState({
        user: "users",
        post: "posts",
        comment: "comments"
      }),
    },
    methods: {
      formaDate: function (date) {
        return moment(date).format('DD/MM/YYYY');
      },
      formaHour: function (date) {
        return moment(date).format('HH:mm');
      },
      userHasLiked: function (postLikes) {
        if (postLikes.length < 1) {
          return false;
        }
        let result = postLikes.find(el => el.UserId == this.$store.state.user.id);
        if (result) {
          return true;
        }
      },
      like: function (PostId) {
        axios.post("http://localhost:3000/api/like/" + PostId, { UserId: this.$store.state.user.id } ,this.configHeaders)
        .then(() =>{
          alert(" Réaction enregistré ! ")
          this.loadPosts();
        })
        .catch((error) => console.log("l'erreur est ici=======", error));
      },
      dislike: function (PostId) {
        axios.delete("http://localhost:3000/api/like/" + PostId + "/" + this.$store.state.user.id, this.configHeaders)
        .then(() =>{
          alert(" Réaction enregistré ! ")
          this.loadPosts();
        })
        .catch((error) => console.log("l'erreur est ici=======", error));
      },
      loadPosts: function () {
        axios.get("http://localhost:3000/api/posts", this.configHeaders)
        // fonction qui affiche les posts boucle sur chaque post et passe tous les showUpdate à false + les showDoCom à false
        .then((response) => {
          this.posts = response.data;
        })
        .catch((error) => console.log(error));
      },
      onFileUpload(event) {
        this.file = event.target.files[0]
      },
      onFileUpdate(event) {
        this.fileUpdate = event.target.files[0]
      },
      clickUpdatePost: function () {
        if (this.post.UserId == this.user.id) {
          return this.modifyPost = true;
        }
      },
      logout: function () {
        this.$store.commit("logout");
        this.$router.push("/login");
      },
      forum: function () {
        this.$router.push("/profile");
      },
      showComment: function (post) {
        this.commentToShowPostId = post.id
      },
      createPost: function () {
        const formData = new FormData()
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
            this.content = null;
            document.querySelector("#imagePost").value = null;
            this.loadPosts();
          })
          .catch((error) => console.log("l'erreur est ici=======", error));
      },
      editPost: function (post) {
        this.editedPost = post;
      },
      updatePost: function () {
        const formData = new FormData()
        formData.append('image', this.fileUpdate);
        formData.append('content', this.editedPost.content);
        formData.append('UserId', this.$store.state.user.id)
        axios({
          method: "put",
          url: `http://localhost:3000/api/posts/${this.editedPost.id}`,
          data: formData,
          headers: {
            "content-type": "multipart/form-data",
            Authorization: `Bearer ${this.token}`,
          }
        })
          .then((res) => {
            alert("Modification enregistrée avec succée !")
            this.loadPosts();
            this.editedPost = null;
          })
          .catch((error) => console.log("l'erreur est ici=======", error));
      },
      deletePost: function (post) {
        let confirmation = confirm("Voulez vraiment supprimer cette publication ?");
        if (confirmation == true) {
           axios.delete("http://localhost:3000/api/posts/" + post.id, this.configHeaders)
        .then(() => {
          this.loadPosts();
        })
        .catch((error) => console.log("l'erreur est ici=======", error));
        }
      },
      createComment: function (PostId) {
        const formData = new FormData()
        formData.append('contentComment', this.contentComment);
        formData.append('UserId', this.$store.state.user.id);
        formData.append('PostId', PostId)
        axios({
          method: "post",
          url: `http://localhost:3000/api/comments`,
          data: formData,
          headers: {
            "content-type": "multipart/form-data",
            Authorization: `Bearer ${this.token}`,
          }
        })
          .then(() => {
            this.contentComment = null;
            this.loadPosts();
          })
          .catch((error) => console.log("l'erreur est ici=======", error));
      },
      deleteComment: function (comment) {
        let confirmation = confirm("Voulez vraiment supprimer votre commentaire ?");
        if (confirmation == true) {
           axios.delete("http://localhost:3000/api/comments/" + comment.id, this.configHeaders)
        .then(() => {
          this.loadPosts();
        })
        .catch((error) => console.log("l'erreur est ici=======", error));
        }
      },
    },
  };
</script>

<style scoped>
  h1 {
    color: #4E5166;
  }

  h3 {
    color: red;
  }

  .title-comment {
    border: 1px solid rgba(0, 0, 0, .125);
    background-color: rgba(0, 0, 0, .03);
  } 

  .comment {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 2%;
  }

  .user-comment {
    flex-direction: column;
    border: 1px solid rgba(0, 0, 0, .125);
    background-color: rgba(0, 0, 0, .03);
  }

  .comment-text {
    padding: 2px 3px;
    background-color: white;
  }

  .header {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    width: 100%;
    background: linear-gradient(to right, #FD2D01, #FFD7D7);
    border: 2px solid #4E5166;
    box-shadow: 0px 0px 50px 0px #FD2D01;
    border-radius: 25px;
    margin-bottom: 3%;
  }

  img {
    width: 50%;
  }

  nav {
    width: 50%;
    margin: auto;
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

  .header__button-i {
    background: #4E5166;
    color: #FD2D01;
    border: 1.5px solid #FD2D01;
  }

  .header__button-i:hover {
    background: #FD2D01;
    box-shadow: 0px 0px 50px 0px black;
    color: #4E5166;
    font-weight: bold;
    border: 1.5px solid #4E5166;
  }
  
  @media screen and (min-width: 768px) {
    .cb-left {
      position: fixed;
      z-index: 1;
      width: 20%;
    }
  }

  .card {
    border: 2px solid #FD2D01;
    box-shadow: 0px 0px 25px 0px #FD2D01;
    z-index: 2;
  }

  .card__create {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    width: 40%;
    margin: auto;
    margin-bottom: 2%;
    background: linear-gradient(#FD2D01, #FFD7D7);
    border-radius: 25px;
    box-shadow: 0px 0px 25px 0px #FD2D01;
    opacity: 0.96;
  }

  .custom-file {
    display: flex;
    flex-direction: column;
    height: auto;
    align-items: center;
  }
  
  .heart {
    border: 1px solid #4E5166;
  }

  .i-heart{
    color: #FD2D01;
    padding: 0 5%;
  }

  .btn-off {
    margin-left: 60%;
    margin-bottom: 0;
    margin-top: 0;
  }

  .btn-create {
    margin-bottom: 2%;
    background: #FFD7D7;
    font-size: 16px;
    color: #4E5166;
    cursor: pointer;
    border: 1.5px solid #4E5166;
  }

  .btn-create:hover {
    background: #4E5166;
    box-shadow: 0px 0px 50px 0px black;
    color: #FD2D01;
    font-weight: bold;
    border: 1.5px solid #FD2D01;
    cursor: pointer;
  }

  .card__create-post {
    display: flex;
    flex-direction: column;
    text-align: center;
    width: 50%;
    margin: 2% auto;
    background: linear-gradient(#FD2D01, #FFD7D7);
    border-radius: 25px;
    box-shadow: 0px 0px 25px 0px #FD2D01;
    opacity: 0.96;
  }

  .card__post {
    display: flex;
    flex-direction: column;
    text-align: center;
    width: 50%;
    margin: auto;
    background: linear-gradient(#FD2D01, #FFD7D7);
    border-radius: 25px;
    box-shadow: 0px 0px 25px 0px #FD2D01;
    opacity: 0.96;
  }

  .info_user {
    justify-content: center;
  }

  .form {
    display: flex;
  }

  li {
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
    background: #4E5166;
    font-size: 18px;
    color: white;
  }

  .form__input {
    width: 100%;
    margin-top: 2%;
  }

  .input-file {
    background: #4E5166;
    font-size: 16px;
    color: #FD2D01;
    width: 80%;
    padding: 2% 5%;
    margin: 0 5%;
    border-radius: 20px;
  }

  .button-form {
    background: #4E5166;
    font-size: 16px;
    font-weight: bold;
    color: #FD2D01;
    padding: 2% 5%;
    margin: 5% 2%;
    border-radius: 20px;
    cursor: pointer;
    border-color: #FD2D01;
  }

  .button-form:hover {
    background: #FD2D01;
    box-shadow: 0px 0px 50px 0px #FD2D01;
    color: #4E5166;
    font-weight: bold;
    border-color: #4E5166;
  }
</style>