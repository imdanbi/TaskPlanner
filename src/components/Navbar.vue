<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <router-link class="navbar__menu" :to="{ name: 'Home'}">
    <li>Home</li>
  </router-link>

  <ul class="navbar-nav mr-auto">
    <li class="nav-item active">
      <router-link class="navbar__menu" :to="{ name: 'Todos' }">
        <li>Memo</li>
      </router-link>
    </li>
  </ul>
</nav>
</template>

<script>

export default {

}
</script>

<style>
.navbar__menu{
  color:black;
  list-style:none;
  

}
.navbar__menu li {
  padding:8px 12px;  
  font-family: 'Nerko One';
 
}
.navbar__menu li:hover{
  background-color:#FAFAD2;
  border-radius: 4px;
}

</style>