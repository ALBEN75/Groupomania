<template>
    <div id="header">
        <img alt="icon entreprise groupomania, page forum" src="../assets/icon-one.png" >
        <nav>
            <ul>
                <li>Profil</li> |
                <li><i class="fa-solid fa-power-off"></i></li>
            </ul>
        </nav>    
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
#header{
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap; 
    width: 100%;
    background: #fe2712;
    box-shadow: 0px 0px 50px 0px #fe2712;
    border-radius: 25px; 
}
img{
    width: 50%;
}
nav{
    width: 50%;
}
ul{
    display: flex;
    flex-direction: row;
    justify-content: center;
    list-style-type: none;
    font-weight: bold;
}
li{
    padding: 0 5%;
}
</style>