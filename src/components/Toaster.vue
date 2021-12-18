<template>
  <div class="toaster" :class="type === 'success' ? 'toaster__success' : 'toaster__error'">
    {{message}}
    <div v-for="key in Object.keys(description)" :key="key" class="toaster__details">
      <span class="heading">{{key}}:</span> {{description[key]}}
    </div>
  </div>
</template>

<script src="./js/toaster.js"/>
