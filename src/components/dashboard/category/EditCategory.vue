<template>
	<v-dialog
		max-width="350"
		persistent
		v-model="showEditDialog"
	>
		<v-card class="px-4">
			<v-card-title class="headline">Edit {{editingCategory
				.name}}
			</v-card-title>

			<v-text-field
				label="Category name"
				v-model="categoryName"
			></v-text-field>

			<v-card-actions>
				<v-spacer></v-spacer>

				<v-btn
					@click="closeDialog"
					color="dark darken-1"
					text
				>
					Cancel
				</v-btn>

				<v-btn
					@click="editCat(editingCategory)"
					color="primary darken-1"
				>
					Edit
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
  import slugify from 'slugify'

  export default {
    name: "EditCategory",
    props: ['showEditDialog', 'editingCategory'],
    data() {
      return {
        categoryName: this.editingCategory.name
      }
    },
    methods: {
      editCat(category) {
        if (this.categoryName) {
          let slug = slugify(this.categoryName, {
            replacement: '-',
            remove: /[$*_+~.()'"!\-:@]/g,
            lower: true
          })

          let cat = {
            id: category.id,
            name: this.categoryName,
            slug: slug
          }

          this.$store.dispatch('editCategory', cat)
          this.closeDialog()
        }
      },
      closeDialog() {
        this.$emit('closeDialog')
      }
    },
    computed: {}
  }
</script>

<style scoped>

</style>