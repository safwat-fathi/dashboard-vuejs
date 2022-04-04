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
import * as Yup from 'yup'

const loginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email format').required(),
  password: Yup.string().required()
})
const form = reactive({
  email: '',
  password: ''
  // remember: ['remember']
})

const formErrors = reactive({
  email: '',
  password: ''
})

const router = useRouter()

const validate = (field) => {
  loginSchema
    .validateAt(field, form)
    .then(() => {
      formErrors[field] = ''
    })
    .catch((err) => {
      formErrors[field] = err.message
    })
}

const submit = async () => {
  try {
    Object.keys(form).forEach((field) => {
      validate(field)
    })

    let formIsValid = true

    Object.values(formErrors).forEach((error) => {
      if (error.length) {
        formIsValid = false
      }
    })

    if (formIsValid) {
      const res = await login(form)
      console.log(res)
      // if (res) {
      //   router.push('/')
      // }
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
        :help="formErrors.email"
      >
        <control
          v-model.trim="form.email"
          :icon="mdiAccount"
          name="login"
        />
      </field>

      <field
        label="Password"
        :help="formErrors.password"
      >
        <control
          v-model="form.password"
          :icon="mdiAsterisk"
          type="password"
          name="password"
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
