<template>

    <div class="background-container">
      <img src="@/assets/background.jpg" alt="image" class="background">
      <div class="welcome">welcome</div>
      </div>

</template>

<script>
export default {

}
</script>

<style scoped>
.background-container {
  position: fixed;
  top: 10;
}
.welcome {
  font-size:135px;
  color : rgb(158, 200, 235);
  text-align: center;
  position:absolute;
  top:50%;;
  left : 50%;
  margin-top : -351px;
  margin-left:-305px;
  font-family: 'Nerko One';
}
</style>
