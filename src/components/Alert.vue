<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<div>
		<v-snackbar v-if="alert.show" bottom :color="alert.type" :timeout="5" shaped>
			{{ alert.text }}
			<template v-slot:action="{ attrs }">
				<v-btn dark v-bind="attrs" text @click="hideAlert()"> <v-icon>cancel</v-icon> </v-btn>
			</template>
			<div><v-progress-linear class="linear-no-transition" v-model="progress" color="whiteColor"></v-progress-linear></div>
		</v-snackbar>
	</div>
</template>
<script>

export default {
	props:["alert"],
	data: () => ({ interval: null, progress: 100 }),
	
	methods: {
		startProgress() {
			if (this.interval === null) {
				this.progress = 100
				const time = 5 / 100
				this.interval = setInterval(() => (this.progress -= 1), time)
			}
		},
		clearProgress() {
			clearInterval(this.interval)
			this.interval = null
		},
		hideAlert() {
			const newAlert = { ...this.alert, show: false }
			this.$emit("update:alert", newAlert)
		}
	}
}
</script>
<style>
.linear-no-transition {
	transition: all 0.02s ease-in-out !important;
}

div.v-snack:not(.v-snack--absolute) {
	height: 100%;
}
</style>
