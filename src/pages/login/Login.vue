<template>
  <form @submit.prevent="doLogin()" class="form-login">
    <div class="card mx-auto my-3" :class="{'card-lg': !isMobile}">
      <div class="card-header text-center">
        <h1 class="mb-0">Finanças</h1>
      </div>
      <div class="card-body">
        <div class="form-group">
          <input required type="email" v-model="email" class="form-control" placeholder="E-mail" />
        </div>
        <div class="form-group">
          <input
            required
            type="password"
            v-model="password"
            class="form-control"
            placeholder="Senha"
          />
        </div>
        <button class="btn btn-primary w-100 mb-3" :class="{'btn-lg': !isMobile}" :disabled="loading">
          <template v-if="loading">
            Entrando...
            <i class="fa fa-spinner fa-spin"></i>
          </template>
          <template v-else>
            Entrar
            <i class="fa fa-sign-in-alt"></i>
          </template>
        </button>
        <div class="text-center mt-3">
          Não tem conta?
          <router-link to="/register" class="link">Clique aqui para Registrar</router-link>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import { auth } from '@/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'

export default {
  name: 'Login',
  data () {
    return {
      loading: false,
      email: 'natan.fh@gmail.com',
      password: 'Sup@2022',
      isMobile: window.innerWidth <= 576 // Adicionando isMobile aqui
    }
  },
  mounted () {
    window.addEventListener('resize', this.checkIfMobile)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.checkIfMobile)
  },
  methods: {
    async doLogin () {
      this.loading = true

      try {
        const res = await signInWithEmailAndPassword(auth, this.email, this.password)
        window.uid = res.user.uid
        this.$router.push({ name: 'home' })
      } catch (error) {
        console.log(error)
      }
      this.loading = false
    },
    checkIfMobile () {
      this.isMobile = window.innerWidth <= 576
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (window.uid) {
        vm.$router.push({ name: 'home' })
      }
    })
  }
}
</script>

<style scoped>
.form-login {
  margin: 0 auto;
  padding: 1rem;
}

.card {
  margin: 10px;/* Espaço ao redor do card */
  border-radius: 15px; /* Bordas arredondadas para parecer um app */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Sombra suave para dar profundidade */
  max-width: 100% ;/* Para garantir que o card não ultrapasse a largura da tela */
}

.card-lg {
  max-width: 400px;/* Limitar a largura do card em telas maiores */
}

.card-header h1 {
  font-size: 1.5rem; /* Ajuste do tamanho da fonte para dispositivos móveis */
}

.form-control {
  font-size: 1rem; /* Ajustar o tamanho da fonte para inputs */
  padding: 0.75rem ;/* Ajustar o padding */
  border-radius: 10px; /* Bordas arredondadas */
  margin-top: 5% !important;
  margin-bottom: 5% !important;
}

.btn {
  font-size: 1rem; /* Ajustar o tamanho da fonte do botão */
  padding: 0.5rem; /* Ajustar o padding */
  border-radius: 10px ;/* Bordas arredondadas */
}

@media (max-width: 576px) {
  .card-header h1 {
    font-size: 1.2rem ;/* Fonte menor para telas pequenas */
  }

  .form-control {
    font-size: 1.2rem ;/* Ajuste do tamanho da fonte para inputs em telas pequenas */
    padding: 1rem /* Ajuste do padding */
  }

  .btn {
    font-size: 1.2rem; /* Ajuste do tamanho da fonte do botão em telas pequenas */
    padding: 0.75rem ;/* Ajuste do padding */
  }
}
</style>
