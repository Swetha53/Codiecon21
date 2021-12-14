<template>
  <div class="progress-bar">
    <div v-for="i in 3" :key="i" class="container" :class="{'selected': steps[getPage] >= i}">
      <div class="progress-bar__steps">
        <span v-if="steps[getPage] > i">✔️</span>
        <span v-else>{{i}}</span>
      </div>
      <hr class="progress-bar__line" v-if="i !== 3"/>
    </div>
  </div>
</template>

<script src="./js/progress-bar.js"/>
