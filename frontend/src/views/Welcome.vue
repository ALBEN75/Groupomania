<template>
  <div id="header">
  <router-link to="/"><img alt="Header Logo" src="../assets/header.png"></router-link>
  <nav>
    <router-link to="/signup">Inscription</router-link> |
    <router-link to="/login">Connexion</router-link>
  </nav>
  <router-view/>
  </div>
  <div class="welcome">  
    <h1>Bienvenue sur votre réseau d'entreprise !</h1>
    <p>Notre entreprise, spécialisée dans la grande distribution, est en pleine expansion. Nous avons actuellement plus de 600 collaborateurs et avons beaucoup recruté depuis quelques années. Nous étions uniquement 300 il y a 3 ans !</p><br>
    <p> Ce réseau a était créé pour vous, afin de vous permettre d'échanger à propos de divers sujets qui vous plaît sur l'entreprise et autres. De plus il servira aussi a améliorer la cohésion dans nos équipes.</p>
  </div>
</template>

<script>

</script>
<style scoped>
#header{
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  width: 100%
}
img{
  width: 50%;
}
nav a {
  font-weight: bold;
  color: #2c3e50;
}
nav a:hover {
  color: #fe2712;
}
h1{
  margin: 90px 0;
}
p{
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  color: black;
}
</style>