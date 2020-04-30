<template>
	<v-expansion-panels>
		<v-expansion-panel>
			<v-expansion-panel-header>Add Category</v-expansion-panel-header>
			<v-expansion-panel-content>
				<v-row>

					<!--			Input			-->
					<v-col sm="8">
						<v-text-field
							label="Category name"
							v-model="newCategoryName"
						></v-text-field>
					</v-col>

					<!--				Submit				-->
					<v-col sm="4">
						<div class="my-2">
							<v-btn
								@click="addCategory"
								block
								class="mt-3"
								color="primary"
							>
								<i class="fa fa-plus mr-2"></i>Add Category
							</v-btn>
						</div>
					</v-col>
				</v-row>
			</v-expansion-panel-content>
		</v-expansion-panel>
	</v-expansion-panels>

</template>

<script>
  import slugify from 'slugify'

  export default {
    name: "AddCategory",
    data() {
      return {
        newCategoryName: null
      }
    },
    methods: {
      addCategory() {
        if (this.newCategoryName) {
          let slug = slugify(this.newCategoryName, {
            replacement: '-',
            remove: /[$*_+~.()'"!\-:@]/g,
            lower: true
          })
          let cat = {
            name: this.newCategoryName,
            slug: slug
          }

          this.$store.dispatch('addCategory', {
            category: cat
          })
          this.newCategoryName = null
        }
      }
    }
  }
</script>

<style scoped>

</style>