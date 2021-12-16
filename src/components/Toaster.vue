<template>
  <div class="toaster" :class="type === 'success' ? 'toaster__success' : 'toaster__error'">
    {{message}}
  </div>
</template>

<script src="./js/toaster.js"/>
