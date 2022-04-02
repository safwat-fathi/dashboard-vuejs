<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import {
  mdiAccount,
  mdiAsterisk,
  mdiBriefcaseOutline,
  mdiFileCertificateOutline,
  mdiEmail,
  mdiCalendarRange
} from '@mdi/js'
import FullScreenSection from '@/components/FullScreenSection.vue'
import CardComponent from '@/components/CardComponent.vue'
import CheckRadioPicker from '@/components/CheckRadioPicker.vue'
import Field from '@/components/Field.vue'
import Control from '@/components/Control.vue'
import Divider from '@/components/Divider.vue'
import JbButton from '@/components/JbButton.vue'
import JbButtons from '@/components/JbButtons.vue'
import { useStore } from 'vuex'
import { register } from '@/services/auth'

const form = reactive({
  firstName: '',
  userName: '',
  email: '',
  phone: '',
  birthDate: '',
  hireDate: '',
  title: '',
  postalCode: '',
  country: { label: 'none', id: 'NA' },
  licenseStart: '',
  licenseEnd: '',
  password: '',
  passwordConfirmation: ''
})

const router = useRouter()
const store = useStore()

const submit = async () => {
  console.log(form)
  // try {
  //   const user = await register({ ...form })

  //   if (user) {
  //     router.push('/login')
  //   }
  // } catch (error) {
  //   console.log(error)
  // }
}
</script>

<template>
  <full-screen-section
    v-slot="{ cardClass, cardRounded }"
    bg="register"
  >
    <card-component
      :class="cardClass"
      :rounded="cardRounded"
      form
      @submit.prevent="submit"
    >
      <field label="Name">
        <control
          v-model="form.name"
          :icon="mdiAccount"
          name="name"
          autocomplete="name"
          required
        />
      </field>

      <field label="First Name">
        <control
          v-model="form.firstName"
          :icon="mdiAccount"
          name="first-name"
          autocomplete="first-name"
          required
        />
      </field>

      <field label="User Name">
        <control
          v-model="form.userName"
          :icon="mdiAccount"
          name="user-name"
          autocomplete="user-name"
          required
        />
      </field>
      <field label="Email">
        <control
          v-model="form.email"
          :icon="mdiEmail"
          type="email"
          name="email"
          autocomplete="email"
          required
        />
      </field>
      <field
        label="Mobile Phone"
        help="Add country code"
      >
        <control
          v-model="form.phone"
          type="tel"
          placeholder="Ex: +201251197264"
          required
        />
      </field>

      <field label="Country">
        <control
          v-model="form.country"
          :options="store.state.countries"
          required
        />
      </field>

      <field label="Title">
        <control
          v-model="form.title"
          :icon="mdiBriefcaseOutline"
          name="title"
          autocomplete="title"
        />
      </field>

      <field label="Postal Code">
        <control
          v-model="form.postalCode"
          :icon="mdiEmail"
          name="postal-code"
          autocomplete="postal-code"
        />
      </field>

      <field label="License Start">
        <control
          v-model="form.licenseStart"
          :icon="mdiFileCertificateOutline"
          type="date"
          name="license-start"
          autocomplete="license-start"
          required
        />
      </field>
      <field label="License End">
        <control
          v-model="form.licenseEnd"
          :icon="mdiFileCertificateOutline"
          type="date"
          name="license-end"
          autocomplete="license-end"
          required
        />
      </field>

      <field label="Birth Date">
        <control
          v-model="form.birthDate"
          :icon="mdiCalendarRange"
          type="date"
          name="birth-date"
          autocomplete="birth-date"
          required
        />
      </field>

      <field label="Hire Date">
        <control
          v-model="form.hireDate"
          :icon="mdiCalendarRange"
          type="date"
          name="hire-date"
          autocomplete="hire-date"
          required
        />
      </field>

      <field label="Password">
        <control
          v-model="form.password"
          :icon="mdiAsterisk"
          type="password"
          name="password"
          autocomplete="password"
          required
        />
      </field>
      <field label="Confirm Password">
        <control
          v-model="form.passwordConfirmation"
          :icon="mdiAsterisk"
          type="password"
          name="confirm-password"
          autocomplete="confirm-password"
          required
        />
      </field>

      <divider />

      <jb-buttons>
        <jb-button
          type="submit"
          color="info"
          label="Submit"
        />
        <span>Already have an account?</span>
        <jb-button
          to="/login"
          color="info"
          outline
          label="Login"
        />
      </jb-buttons>
    </card-component>
  </full-screen-section>
</template>
