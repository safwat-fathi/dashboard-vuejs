<script setup>
import FullScreenSection from '@/components/FullScreenSection.vue'
import CardComponent from '@/components/CardComponent.vue'
import Divider from '@/components/Divider.vue'
import JbButton from '@/components/JbButton.vue'
import JbButtons from '@/components/JbButtons.vue'
import { useRouter } from 'vue-router'
import { logout } from '@/services/auth'

const router = useRouter()

const userLogout = () => {
  logout()
  router.push('/login')
}
</script>

<template>
  <full-screen-section
    v-slot="{ cardClass, cardRounded }"
    bg="info"
  >
    <card-component
      :class="cardClass"
      :rounded="cardRounded"
    >
      <div class="space-y-3">
        <h1 class="text-2xl">
          You are already logged in!
        </h1>

        <p>do you want to logout?</p>
      </div>

      <divider />

      <jb-buttons>
        <jb-button
          label="logout"
          @click.prevent="userLogout"
          color="danger"
        />
        <jb-button
          label="Back to home"
          to="/"
          color="info"
        />
      </jb-buttons>
    </card-component>
  </full-screen-section>
</template>
