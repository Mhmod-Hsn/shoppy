<template>
	<v-col
		:lg="content.width[0]"
		:md="content.width[1]"
		:sm="content.width[2]"
		cols="12"
	>
		<div class="card">
			<v-card
				:color="content.color"
				class="topTitledCard text-center"
				elevation="10"
				raised>

				<v-progress-circular
					:value="Number(content.value[0])/Number(content.value[1])*100"
					class="my-4 mt-10"
					color="dark"
					rotate="270"
					size="200"
					v-if="content.type==='circle'"
					width="25"
				>
					<h1>{{ content.value[0]}}/{{ content.value[1]}}</h1>
				</v-progress-circular>

				<div
					class="number font-weight-bold card-content"
					v-else
				>
					{{content.value}}
				</div>


				<v-card-title class="d-block pa-2 white secondary--text">
					{{content.title}}
				</v-card-title>
			</v-card>
		</div>
	</v-col>
</template>

<script>
  export default {
    name: "Card",
    props: ['content'],
    computed: {}
  }
</script>

<style scoped>
	.number {
		font-size: 60px;
	}
</style>