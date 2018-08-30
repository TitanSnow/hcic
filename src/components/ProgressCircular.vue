<!-- Copyright (c) 2018 The Chromium Authors. All rights reserved. -->

<template>
  <div class="spinner-wrapper" :style="{
    '--paper-spinner-color': color,
    'transform': `scale(${size / 28})`
  }">
    <div class="spinner-container active">
      <div class="spinner-layer">
        <div class="circle-clipper left"></div>
        <div class="circle-clipper right"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProgressCircular',
  props: {
    color: {
      type: String,
      default: 'rgb(66, 133, 244)'
    },
    size: {
      type: Number,
      default: 28
    }
  }
}
</script>


<style scoped>
.spinner-wrapper {
  display: inline-block;
        position: relative;
        width: 28px;
        height: 28px;


        --paper-spinner-container-rotation-duration: 1568ms;


        --paper-spinner-expand-contract-duration: 1333ms;


        --paper-spinner-full-cycle-duration: 5332ms;


        --paper-spinner-cooldown-duration: 400ms;
}

.spinner-container {
  width: 100%;
        height: 100%;


        direction: ltr;
}

.spinner-container.active {
  animation: container-rotate var(--paper-spinner-container-rotation-duration) linear infinite;
}

@-webkit-keyframes container-rotate {
to {
  -webkit-transform: rotate(360deg)
}

}

@keyframes container-rotate {
to {
  transform: rotate(360deg)
}

}

.spinner-layer {
  position: absolute;
        width: 100%;
        height: 100%;
        opacity: 0;
        white-space: nowrap;
        border-color: var(--paper-spinner-color, var(--google-blue-500));
}

.layer-1 {
  border-color: var(--paper-spinner-layer-1-color, var(--google-blue-500));
}

.layer-2 {
  border-color: var(--paper-spinner-layer-2-color, var(--google-red-500));
}

.layer-3 {
  border-color: var(--paper-spinner-layer-3-color, var(--google-yellow-500));
}

.layer-4 {
  border-color: var(--paper-spinner-layer-4-color, var(--google-green-500));
}

.active .spinner-layer {
  animation-name: fill-unfill-rotate;
        animation-duration: var(--paper-spinner-full-cycle-duration);
        animation-timing-function: cubic-bezier(0.4, 0.0, 0.2, 1);
        animation-iteration-count: infinite;
        opacity: 1;
}

.active .spinner-layer.layer-1 {
  animation-name: fill-unfill-rotate, layer-1-fade-in-out;
}

.active .spinner-layer.layer-2 {
  animation-name: fill-unfill-rotate, layer-2-fade-in-out;
}

.active .spinner-layer.layer-3 {
  animation-name: fill-unfill-rotate, layer-3-fade-in-out;
}

.active .spinner-layer.layer-4 {
  animation-name: fill-unfill-rotate, layer-4-fade-in-out;
}

@-webkit-keyframes fill-unfill-rotate {
12.5% {
  -webkit-transform: rotate(135deg)
}

25% {
  -webkit-transform: rotate(270deg)
}

37.5% {
  -webkit-transform: rotate(405deg)
}

50% {
  -webkit-transform: rotate(540deg)
}

62.5% {
  -webkit-transform: rotate(675deg)
}

75% {
  -webkit-transform: rotate(810deg)
}

87.5% {
  -webkit-transform: rotate(945deg)
}

to {
  -webkit-transform: rotate(1080deg)
}

}

@keyframes fill-unfill-rotate {
12.5% {
  transform: rotate(135deg)
}

25% {
  transform: rotate(270deg)
}

37.5% {
  transform: rotate(405deg)
}

50% {
  transform: rotate(540deg)
}

62.5% {
  transform: rotate(675deg)
}

75% {
  transform: rotate(810deg)
}

87.5% {
  transform: rotate(945deg)
}

to {
  transform: rotate(1080deg)
}

}

@-webkit-keyframes layer-1-fade-in-out {
0% {
  opacity: 1
}

25% {
  opacity: 1
}

26% {
  opacity: 0
}

89% {
  opacity: 0
}

90% {
  opacity: 1
}

to {
  opacity: 1
}

}

@keyframes layer-1-fade-in-out {
0% {
  opacity: 1
}

25% {
  opacity: 1
}

26% {
  opacity: 0
}

89% {
  opacity: 0
}

90% {
  opacity: 1
}

to {
  opacity: 1
}

}

@-webkit-keyframes layer-2-fade-in-out {
0% {
  opacity: 0
}

15% {
  opacity: 0
}

25% {
  opacity: 1
}

50% {
  opacity: 1
}

51% {
  opacity: 0
}

to {
  opacity: 0
}

}

@keyframes layer-2-fade-in-out {
0% {
  opacity: 0
}

15% {
  opacity: 0
}

25% {
  opacity: 1
}

50% {
  opacity: 1
}

51% {
  opacity: 0
}

to {
  opacity: 0
}

}

@-webkit-keyframes layer-3-fade-in-out {
0% {
  opacity: 0
}

40% {
  opacity: 0
}

50% {
  opacity: 1
}

75% {
  opacity: 1
}

76% {
  opacity: 0
}

to {
  opacity: 0
}

}

@keyframes layer-3-fade-in-out {
0% {
  opacity: 0
}

40% {
  opacity: 0
}

50% {
  opacity: 1
}

75% {
  opacity: 1
}

76% {
  opacity: 0
}

to {
  opacity: 0
}

}

@-webkit-keyframes layer-4-fade-in-out {
0% {
  opacity: 0
}

65% {
  opacity: 0
}

75% {
  opacity: 1
}

90% {
  opacity: 1
}

to {
  opacity: 0
}

}

@keyframes layer-4-fade-in-out {
0% {
  opacity: 0
}

65% {
  opacity: 0
}

75% {
  opacity: 1
}

90% {
  opacity: 1
}

to {
  opacity: 0
}

}

.circle-clipper {
  display: inline-block;
        position: relative;
        width: 50%;
        height: 100%;
        overflow: hidden;
        border-color: inherit;
}

.spinner-layer::after {
  left: 45%;
        width: 10%;
        border-top-style: solid;
}

.spinner-layer::after, .circle-clipper::after {
  content: '';
        box-sizing: border-box;
        position: absolute;
        top: 0;
        border-width: var(--paper-spinner-stroke-width, 3px);
        border-color: inherit;
        border-radius: 50%;
}

.circle-clipper::after {
  bottom: 0;
        width: 200%;
        border-style: solid;
        border-bottom-color: transparent !important;
}

.circle-clipper.left::after {
  left: 0;
        border-right-color: transparent !important;
        transform: rotate(129deg);
}

.circle-clipper.right::after {
  left: -100%;
        border-left-color: transparent !important;
        transform: rotate(-129deg);
}

.active .gap-patch::after, .active .circle-clipper::after {
  animation-duration: var(--paper-spinner-expand-contract-duration);
        animation-timing-function: cubic-bezier(0.4, 0.0, 0.2, 1);
        animation-iteration-count: infinite;
}

.active .circle-clipper.left::after {
  animation-name: left-spin;
}

.active .circle-clipper.right::after {
  animation-name: right-spin;
}

@-webkit-keyframes left-spin {
0% {
  -webkit-transform: rotate(130deg)
}

50% {
  -webkit-transform: rotate(-5deg)
}

to {
  -webkit-transform: rotate(130deg)
}

}

@keyframes left-spin {
0% {
  transform: rotate(130deg)
}

50% {
  transform: rotate(-5deg)
}

to {
  transform: rotate(130deg)
}

}

@-webkit-keyframes right-spin {
0% {
  -webkit-transform: rotate(-130deg)
}

50% {
  -webkit-transform: rotate(5deg)
}

to {
  -webkit-transform: rotate(-130deg)
}

}

@keyframes right-spin {
0% {
  transform: rotate(-130deg)
}

50% {
  transform: rotate(5deg)
}

to {
  transform: rotate(-130deg)
}

}

.spinner-container.cooldown {
  animation: container-rotate var(--paper-spinner-container-rotation-duration) linear infinite, fade-out var(--paper-spinner-cooldown-duration) cubic-bezier(0.4, 0.0, 0.2, 1);
}

@-webkit-keyframes fade-out {
0% {
  opacity: 1
}

to {
  opacity: 0
}

}

@keyframes fade-out {
0% {
  opacity: 1
}

to {
  opacity: 0
}

}
</style>
