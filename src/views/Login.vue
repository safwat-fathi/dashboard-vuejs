<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { mdiAccount, mdiAsterisk } from '@mdi/js'
import FullScreenSection from '@/components/FullScreenSection.vue'
import CardComponent from '@/components/CardComponent.vue'
import CheckRadioPicker from '@/components/CheckRadioPicker.vue'
import Field from '@/components/Field.vue'
import Control from '@/components/Control.vue'
import Divider from '@/components/Divider.vue'
import JbButton from '@/components/JbButton.vue'
import JbButtons from '@/components/JbButtons.vue'
import { login } from '@/services/auth'

const form = reactive({
  name: '',
  password: ''
  // remember: ['remember']
})

const router = useRouter()

const submit = async () => {
  try {
    const user = await login({ email: form.name, password: form.password })

    if (user) {
      router.push('/')
    }
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <full-screen-section
    v-slot="{ cardClass, cardRounded }"
    bg="login"
  >
    <card-component
      :class="cardClass"
      :rounded="cardRounded"
      form
      @submit.prevent="submit"
    >
      <field
        label="Login"
        help="Please enter email"
      >
        <control
          v-model="form.name"
          :icon="mdiAccount"
          name="login"
          autocomplete="username"
          required
        />
      </field>

      <field
        label="Password"
        help="Please enter your password"
      >
        <control
          v-model="form.password"
          :icon="mdiAsterisk"
          type="password"
          name="password"
          autocomplete="current-password"
          required
        />
      </field>

      <!-- <check-radio-picker
        v-model="form.remember"
        name="remember"
        :options="{ remember: 'Remember' }"
      /> -->

      <divider />

      <jb-buttons>
        <jb-button
          type="submit"
          color="info"
          label="Login"
        />
        <span>Do not have an account?</span>
        <jb-button
          to="/register"
          color="info"
          outline
          label="Register"
        />
      </jb-buttons>
    </card-component>
  </full-screen-section>
</template>
