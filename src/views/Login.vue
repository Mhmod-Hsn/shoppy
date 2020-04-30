<template>
	<v-app id="loginView">
		<v-content>
			<v-container
				class="fill-height"
				fluid
			>
				<v-card
					class="mx-auto"
					id="loginForm"
					outlined
				>
					<v-card-text>
						<h1 class="text-center mb-0">Login</h1>
					</v-card-text>
					<v-form v-model="valid">
						<v-container>
							<v-row>
								<v-col
									cols="12"
									md="12"
								>
									<v-text-field
										:rules="emailRules"
										label="E-mail"
										required
										v-model="email"
									></v-text-field>
								</v-col>

								<v-col
									cols="12"
									md="12"
								>
									<v-text-field
										:rules="passwordRules"
										label="Password"
										required
										type="password"
										v-model="password"
									></v-text-field>
								</v-col>
								<v-btn
									:loading="loginLoading"
									@click="signIn"
									block
									color="primary">login
								</v-btn>

							</v-row>
						</v-container>
					</v-form>
				</v-card>
			</v-container>
		</v-content>

	</v-app>
</template>

<script>
  import firebase from 'firebase'
  import 'firebase/auth'


  export default {
    name: "Login",
    data: () => ({
      valid: false,
      email: 'admin@admin.com',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid',
      ],
      password: 'admin123',
      passwordRules: [
        v => !!v || 'password is required',
      ],
      loginLoading: false
    }),
    methods: {
      signIn() {
        if (this.valid) {
          this.loginLoading = true

          firebase.auth().signInWithEmailAndPassword(this.email, this.password)
            .then((cred) => {
              console.log('correct', cred)
              this.loginLoading = false
              this.$router.push({name: 'Dashboard'})
            })
            .catch(e => {
              console.log('wrong')
              this.loginLoading = false

              // this.feedback = e.message
            })

        }
      }
    }
  }
</script>

<style scoped>
	#loginView {
		background: #eee;
	}

	#loginForm {
		width: 400px;
		padding: 20px 10px;
	}
</style>