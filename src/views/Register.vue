<script setup>
import { ref, reactive } from 'vue'
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
import Notification from '@/components/Notification.vue'
import JbButtons from '@/components/JbButtons.vue'
import { useStore } from 'vuex'
import { register } from '@/services/auth'
import * as Yup from 'yup'

const registerSchema = Yup.object().shape({
  name: Yup.string().required(),
  Title: Yup.string().required(),
  FirstName: Yup.string().required(),
  BirthDate: Yup.date('Please enter valid date').nullable().required(),
  HireDate: Yup.date('Please enter valid date').nullable().required(),
  PostalCode: Yup.number('Please enter valid postal code').nullable(),
  Username: Yup.string().required(),
  Country: Yup.string().required(),
  // Country: Yup.object().shape({
  //   label: Yup.string().nullable().required(),
  //   id: Yup.string().nullable().required()
  // }),
  LicenseStart: Yup.date('Please enter valid date').nullable().required(),
  LicenseEnd: Yup.date('Please enter valid date').nullable().required(),
  Phone: Yup.string()
    .matches(
      /^(00201|\+201|01)[0-2,5]{1}[0-9]{8}$/,
      'Phone number is not egyptian valid'
    )
    .required(),
  email: Yup.string().email('Invalid email format').required(),
  password: Yup.string().required(),
  password_confirmation: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Passwords must match'
  )
})

const form = reactive({
  name: '',
  Title: '',
  FirstName: '',
  BirthDate: null,
  HireDate: null,
  PostalCode: null,
  Username: '',
  Country: '',
  LicenseStart: null,
  LicenseEnd: null,
  Phone: '',
  email: '',
  password: '',
  password_confirmation: ''
})

const formErrors = reactive({
  name: '',
  Title: '',
  FirstName: '',
  BirthDate: '',
  HireDate: '',
  PostalCode: '',
  Username: '',
  Country: '',
  LicenseStart: '',
  LicenseEnd: '',
  Phone: '',
  email: '',
  password: '',
  password_confirmation: ''
})

const router = useRouter()
const store = useStore()

const validate = (field) => {
  registerSchema
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

    console.log(form)
    console.log(formErrors)

    let formIsValid = true
    Object.values(formErrors).forEach((error) => {
      if (error.length) {
        formIsValid = false
      }
    })

    if (formIsValid) {
      const res = await register(form)

      if (res.access_token) {
        router.push('/login')
      }
    }
  } catch (error) {
    console.log(error)
  }
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
      novalidate
      @submit.prevent="submit"
    >
      <field
        label="Name"
        :help="formErrors.name"
      >
        <control
          v-model.trim="form.name"
          :icon="mdiAccount"
          name="name"
          autocomplete="name"
        />
      </field>

      <field
        label="First Name"
        :help="formErrors.FirstName"
      >
        <control
          v-model.trim="form.FirstName"
          :icon="mdiAccount"
          name="first-name"
          autocomplete="first-name"
        />
      </field>

      <field
        label="User Name"
        :help="formErrors.Username"
      >
        <control
          v-model.trim="form.Username"
          :icon="mdiAccount"
          name="user-name"
          autocomplete="user-name"
          required
        />
      </field>
      <field
        label="Email"
        :help="formErrors.email"
      >
        <control
          v-model.trim="form.email"
          :icon="mdiEmail"
          type="email"
          name="email"
          autocomplete="email"
          required
        />
      </field>
      <field
        label="Mobile Phone"
        :help="formErrors.Phone"
      >
        <control
          v-model.trim="form.Phone"
          type="tel"
          placeholder="Ex: +201251197264"
          required
        />
      </field>

      <field
        label="Country"
        :help="formErrors.Country"
      >
        <control
          v-model="form.Country"
          :options="store.state.countries"
          required
        />
      </field>

      <field
        label="Title"
        :help="formErrors.Title"
      >
        <control
          v-model.trim="form.Title"
          :icon="mdiBriefcaseOutline"
          name="title"
          autocomplete="title"
        />
      </field>

      <field
        label="Postal Code"
        :help="formErrors.PostalCode"
      >
        <control
          v-model.number="form.PostalCode"
          :icon="mdiEmail"
          name="postal-code"
          autocomplete="postal-code"
        />
      </field>

      <field
        label="License Start"
        :help="formErrors.LicenseStart"
      >
        <control
          v-model="form.LicenseStart"
          :icon="mdiCalendarRange"
          type="date"
          name="license-start"
        />
      </field>
      <field
        label="License End"
        :help="formErrors.LicenseEnd"
      >
        <control
          v-model="form.LicenseEnd"
          :icon="mdiCalendarRange"
          type="date"
          name="license-end"
        />
      </field>

      <field
        label="Birth Date"
        :help="formErrors.BirthDate"
      >
        <control
          v-model="form.BirthDate"
          :icon="mdiCalendarRange"
          type="date"
          name="birth-date"
        />
      </field>

      <field
        label="Hire Date"
        :help="formErrors.HireDate"
      >
        <control
          v-model="form.HireDate"
          :icon="mdiCalendarRange"
          type="date"
          name="hire-date"
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
          autocomplete="password"
          required
        />
      </field>
      <field
        label="Confirm Password"
        :help="formErrors.password_confirmation"
      >
        <control
          v-model="form.password_confirmation"
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
    <!-- <notification
			v-if=""
      color="success"
      :icon="mdiCheckCircleOutline"
      :outline="notificationsOutline"
    >
      <b>Registered successfully</b>
    </notification> -->
  </full-screen-section>
</template>
