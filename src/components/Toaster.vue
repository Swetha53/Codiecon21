<template>
  <div class="toaster" :class="type === 'success' ? 'toaster__success' : 'toaster__error'">
    {{message}}
    <div v-if="message2" class="toaster__details">
      <span v-for="(mes, key) in message2" :key="key">
        <span :class="{'heading': key === 3}">{{mes}}</span>
      </span>
    </div>
  </div>
</template>

<script src="./js/toaster.js"/>
