<script setup>
import { computed, ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import { mdiEye, mdiTrashCan } from '@mdi/js'
import ModalBox from '@/components/ModalBox.vue'
import Level from '@/components/Level.vue'
import JbButtons from '@/components/JbButtons.vue'
import JbButton from '@/components/JbButton.vue'

const store = useStore()

const lightBorderStyle = computed(() => store.state.lightBorderStyle)

const lightBgStyle = computed(() => store.state.lightBgStyle)

const tableTrStyle = computed(() => store.state.tableTrStyle)

const tableTrOddStyle = computed(() => store.state.tableTrOddStyle)

const darkMode = computed(() => store.state.darkMode)

const orders = computed(() => store.state.orders)

onMounted(() => {
  store.dispatch('fetchOrders')
  console.log(orders)
})

const isModalActive = ref(false)

const isModalDangerActive = ref(false)

const perPage = ref(10)

const currentPage = ref(0)

const checkedRows = ref([])

const ordersPaginated = computed(() =>
  orders.value.slice(
    perPage.value * currentPage.value,
    perPage.value * (currentPage.value + 1)
  )
)

const numPages = computed(() => Math.ceil(orders.value.length / perPage.value))

const currentPageHuman = computed(() => currentPage.value + 1)

const pagesList = computed(() => {
  const pagesList = []

  for (let i = 0; i < numPages.value; i++) {
    pagesList.push(i)
  }

  return pagesList
})

const remove = (arr, cb) => {
  const newArr = []

  arr.forEach((item) => {
    if (!cb(item)) {
      newArr.push(item)
    }
  })

  return newArr
}
</script>

<template>
  <modal-box
    v-model="isModalActive"
    title="Sample modal"
  >
    <p>Lorem ipsum dolor sit amet <b>adipiscing elit</b></p>
    <p>This is sample modal</p>
  </modal-box>

  <modal-box
    v-model="isModalDangerActive"
    large-title="Please confirm"
    button="danger"
    has-cancel
  >
    <p>Lorem ipsum dolor sit amet <b>adipiscing elit</b></p>
    <p>This is sample modal</p>
  </modal-box>

  <!-- <div
    v-if="checkedRows.length"
    class="bg-opacity-50 p-3 dark:bg-gray-800"
    :class="lightBgStyle"
  >
    <span
      v-for="checkedRow in checkedRows"
      :key="checkedRow.id"
      class="inline-block px-2 py-1 rounded-sm mr-2 text-sm dark:bg-gray-700"
      :class="lightBgStyle"
    >
      {{ checkedRow.name }}
    </span>
  </div> -->

  <table class="block overflow-x-scroll overflow-y-hidden">
    <thead>
      <tr>
        <th>MAWBNO</th>
        <th>Job</th>
        <th>JobNumber</th>
        <th>OrderNumber</th>
        <th>POREF</th>
        <th>Incoterms</th>
        <th>Agent</th>
        <th>Shipper</th>
        <th>Consignee</th>
        <th>FromLoc</th>
        <th>ToLoc</th>
        <th>FlightNO</th>
        <th>POL</th>
        <th>POD</th>
        <th>ETD</th>
        <th>ETA</th>
        <th>Carrier</th>
        <th>Freight</th>
        <th>Commodity</th>

        <th />
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(order, index) in ordersPaginated"
        :key="order.id"
        :class="[tableTrStyle, index % 2 === 0 ? tableTrOddStyle : '']"
      >
        <!-- <checkbox-cell
          v-if="checkable"
          @checked="checked($event, order)"
        /> -->

        <td data-label="Agent">
          {{ order.Agent }}
        </td>
        <td data-label="BookingPerson">
          {{ order.BookingPerson }}
        </td>
        <td data-label="Carrier">
          {{ order.Carrier }}
        </td>
        <td data-label="ChargeableWt">
          {{ order.ChargeableWt }}
        </td>
        <td data-label="Currency">
          {{ order.Currency }}
        </td>

        <!-- <td class="actions-cell">
          <jb-buttons
            type="justify-start lg:justify-end"
            no-wrap
          >
            <jb-button
              color="info"
              :icon="mdiEye"
              small
              @click="isModalActive = true"
            />
            <jb-button
              color="danger"
              :icon="mdiTrashCan"
              small
              @click="isModalDangerActive = true"
            />
          </jb-buttons>
        </td> -->
      </tr>
    </tbody>
  </table>
  <div
    :class="lightBorderStyle"
    class="p-3 lg:px-6 border-t dark:border-gray-800"
  >
    <level>
      <jb-buttons>
        <jb-button
          v-for="page in pagesList"
          :key="page"
          :active="page === currentPage"
          :label="page + 1"
          :outline="darkMode"
          small
          @click="currentPage = page"
        />
      </jb-buttons>
      <small>Page {{ currentPageHuman }} of {{ numPages }}</small>
    </level>
  </div>
</template>
