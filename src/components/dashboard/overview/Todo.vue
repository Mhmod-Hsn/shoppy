<template>
	<v-col
		:lg="todoPreferences.width[0]"
		:md="todoPreferences.width[1]"
		:sm="todoPreferences.width[2]"
		cols="12"
	>
		<v-card
			:color="todoPreferences.color"
			class="topTitledCard text-center"
			elevation="10"
			raised
			v-if="todos"
		>
			<v-card-title class="d-block pa-2 white secondary--text  ">
				Todo List
			</v-card-title>

			<div class="card-content">
				<perfect-scrollbar
					class="todos-wrapper mt-4"
				>
					<div
						class="singleTodo"
						v-for="todo in todos"
						:key="todo.id"
					>

						<v-checkbox
							color="white"
							v-model="todo.done"
							:label="todo.text"
							class="mt-0 mx-3"
							@change="changeState(todo.id, $event)"
						></v-checkbox>

						<div class="delete" @click="removeTodo(todo.id)">
							<i class="fa fa-times-circle"></i>
						</div>
						<div class="edit" @click="openEditDialog(todo)">
							<i class="fa fa-pencil-square-o"></i>
						</div>
					</div>
				</perfect-scrollbar>
				<v-divider></v-divider>

				<v-form @submit.prevent="">
					<v-text-field
						label="New todo"
						v-model="newTodo"
						class="mx-3"
						color="dark"
						prepend-icon="fa fa-plus"
						@keydown.enter="addTodo"
					></v-text-field>
				</v-form>

			</div>
		</v-card>

		<v-dialog
			max-width="350"
			persistent
			v-model="showEditDialog"
			v-if="showEditDialog"
		>
			<v-card class="px-4">
				<v-card-title class="headline">Edit</v-card-title>

				<v-text-field
					label="Todo"
					v-model="editedTodo.text"
				></v-text-field>

				<v-card-actions>
					<v-spacer></v-spacer>

					<v-btn
						@click="showEditDialog=false"
						color="dark darken-1"
						text
					>
						Cancel
					</v-btn>

					<v-btn
						@click="editTodo(editedTodo)"
						color="primary darken-1"
					>
						Edit
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>

	</v-col>
</template>

<script>
  export default {
    name: "Todo",
    props: ['todoPreferences'],
	  data(){
      return{
        newTodo: '',
	      editedTodo: {},
	      showEditDialog: false
      }
	  },
	  methods:{
      addTodo(){
        if (this.newTodo) {
          let obj = {
            text: this.newTodo,
            timestamp: Date.now(),
            done: false
          }
          this.$store.dispatch('addTodo',obj)
          this.newTodo = ''
        }
      },
      removeTodo(id){
        let confirm = window.confirm('Are you sure you want to remove it?')
	      if (confirm){
          this.$store.dispatch('removeTodo',id)
        }
      },

		  openEditDialog(todo){
        this.showEditDialog = true
        this.editedTodo = todo
      },
		  editTodo(){
        if (this.editedTodo.text){
          this.$store.dispatch('editTodos',this.editedTodo)
          this.showEditDialog = false
					this.editedTodo={}
        }
		  },
      changeState(id, value) {
        console.log(value)
        this.$store.dispatch('changeTodoState', {id, value})
      },
    },
		computed: {
      todos(){
        return this.$store.state.todos.todos
      }
		},
	  mounted() {
      this.$store.dispatch("getTodos");
    }
  }
</script>

<style lang="sass" scoped>
.todos-wrapper
	height: 250px
	overflow-y: auto

	.singleTodo
		position: relative
		.delete,.edit
			position: absolute
			right: 30px
			top: 2px
			font-size: 20px
			transition: color 0.3s ease-in
			cursor: pointer
			&:hover
				color: #ff5252

		.edit
			right: 60px
			&:hover
				color: #fbc600
</style>