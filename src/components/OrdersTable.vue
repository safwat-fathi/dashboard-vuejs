<script setup>
import { computed, ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import { mdiEye, mdiTrashCan } from '@mdi/js'
import ModalBox from '@/components/ModalBox.vue'
import Level from '@/components/Level.vue'
import JbButtons from '@/components/JbButtons.vue'
import JbButton from '@/components/JbButton.vue'

// dummy data
const dummyOrders = [
  {
    id: 1,
    MAWBNO: '2147483647',
    Job: 'Import',
    JobNumber: 'AM-10000025',
    OrderNumber: '0000',
    POREF: '000',
    Incoterms: 'EXW',
    Agent: 296,
    Shipper: 351,
    Consignee: 196,
    FromLoc: 4712,
    ToLoc: 4329,
    FlightNO: '123456789',
    POL: '123',
    POD: '12',
    ETD: '2020-09-30 00:00:00',
    ETA: '2020-09-30 08:03:04',
    Carrier: 3778,
    Freight: 'Prepaid',
    Commodity: null,
    HSCode: 0,
    BookingPerson: 'Administrator',
    Pieces: '10',
    NumberOfHAWB: 6,
    GrossWt: '250',
    VolumeWt: '165.12',
    ChargeableWt: '250',
    Currency: 'OMR',
    WeightType: 'KG',
    UnitPrice: 0,
    Insurance: 0,
    RemarkDateandTime: '2020-09-21',
    RemarkTypy: 'Typy A',
    RemarkEmail: null,
    RemarkNote: null,
    Attach_MAWB: '',
    Attach_HAWB: '',
    Attach_CI: null,
    Attach_PL: '',
    Attach_COO: '',
    Attach_OTR: '',
    Attach_CMNFST: null,
    Attach_DO: '',
    Attach_DGD: null,
    Status: 'Shipment In Transit On Its Way To Airport/Port',
    UUID: 'a5bf1393d956a50c221090614083af42d65a42e1f9578db8f82e86533b20806b1e715450839aa4a34a8e9653380f7b25e753',
    DateandTime: '2020-09-21 06:18:18',
    UserName: 'Administrator',
    UserIDGroup: -1,
    UserIP: '127.0.0.1',
    LastEditDateTime: '2021-02-10 07:03:12',
    LastEditUserName: 'Administrator',
    LastEditUserIDGroup: -1,
    LastEditUserIP: '127.0.0.1',
    created_at: null,
    updated_at: null
  },
  {
    id: 2,
    MAWBNO: '14479611',
    Job: 'Import',
    JobNumber: 'AM-1000003724',
    OrderNumber: '',
    POREF: '',
    Incoterms: 'EXW',
    Agent: 296,
    Shipper: 198,
    Consignee: 194,
    FromLoc: 772,
    ToLoc: 4712,
    FlightNO: '123456789',
    POL: '123',
    POD: '12',
    ETD: '2020-09-30 00:00:00',
    ETA: '2020-09-30 00:00:00',
    Carrier: 3778,
    Freight: 'Prepaid',
    Commodity: '',
    HSCode: 10293,
    BookingPerson: 'Administrator',
    Pieces: '11111',
    NumberOfHAWB: 0,
    GrossWt: '11111',
    VolumeWt: '',
    ChargeableWt: '11111',
    Currency: 'OMR',
    WeightType: 'KG',
    UnitPrice: 0,
    Insurance: 0,
    RemarkDateandTime: '2020-09-21',
    RemarkTypy: 'Typy A',
    RemarkEmail: '',
    RemarkNote: '',
    Attach_MAWB: '',
    Attach_HAWB: '',
    Attach_CI: null,
    Attach_PL: '',
    Attach_COO: '',
    Attach_OTR: '',
    Attach_CMNFST: null,
    Attach_DO: '',
    Attach_DGD: null,
    Status: '',
    UUID: '323aab77d5f8fb7e621e35f04c7cbff8a13bcf5de4ec8f78927944efe00e8fb194d97584a478584444d1b7214c8eb4a09541',
    DateandTime: '2020-09-21 06:19:02',
    UserName: 'Administrator',
    UserIDGroup: -1,
    UserIP: '127.0.0.1',
    LastEditDateTime: '2020-10-01 12:03:26',
    LastEditUserName: 'Administrator',
    LastEditUserIDGroup: -1,
    LastEditUserIP: '127.0.0.1',
    created_at: null,
    updated_at: null
  }
]

const store = useStore()

const lightBorderStyle = computed(() => store.state.lightBorderStyle)

const lightBgStyle = computed(() => store.state.lightBgStyle)

const tableTrStyle = computed(() => store.state.tableTrStyle)

const tableTrOddStyle = computed(() => store.state.tableTrOddStyle)

const darkMode = computed(() => store.state.darkMode)

// const orders = computed(() => store.state.orders)
const orders = computed(() => dummyOrders)

onMounted(() => {
  store.dispatch('fetchOrders')
  console.log(dummyOrders)
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

// const checked = (isChecked, client) => {
//   if (isChecked) {
//     checkedRows.value.push(client)
//   } else {
//     checkedRows.value = remove(checkedRows.value, (row) => row.id === client.id)
//   }
// }
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
        <th>Agent</th>
        <th>BookingPerson</th>
        <th>Carrier</th>
        <th>ChargeableWt</th>
        <th>Currency</th>
        <th>Currency</th>
        <th>Currency</th>
        <th>Currency</th>
        <th>Currency</th>
        <th>Currency</th>
        <th>Currency</th>
        <th>Currency</th>
        <th>Currency</th>
        <th>Currency</th>
        <th>Currency</th>
        <th>Currency</th>
        <th>Currency</th>
        <th>Currency</th>
        <th>Currency</th>
        <th>Currency</th>
        <th>Currency</th>
        <th>Currency</th>
        <th>Currency</th>
        <th>Currency</th>
        <th>Currency</th>
        <th>Currency</th>
        <th>Currency</th>
        <th>Currency</th>
        <th>Currency</th>
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
        <td data-label="Currency">
          {{ order.Currency }}
        </td>
        <td data-label="Currency">
          {{ order.Currency }}
        </td>
        <td data-label="Currency">
          {{ order.Currency }}
        </td>
        <td data-label="Currency">
          {{ order.Currency }}
        </td>
        <td data-label="Currency">
          {{ order.Currency }}
        </td>
        <td data-label="Currency">
          {{ order.Currency }}
        </td>
        <td data-label="Currency">
          {{ order.Currency }}
        </td>
        <td data-label="Currency">
          {{ order.Currency }}
        </td>
        <td data-label="Currency">
          {{ order.Currency }}
        </td>
        <td data-label="Currency">
          {{ order.Currency }}
        </td>
        <td data-label="Currency">
          {{ order.Currency }}
        </td>
        <td data-label="Currency">
          {{ order.Currency }}
        </td>
        <td data-label="Currency">
          {{ order.Currency }}
        </td>
        <td data-label="Currency">
          {{ order.Currency }}
        </td>
        <td data-label="Currency">
          {{ order.Currency }}
        </td>
        <td data-label="Currency">
          {{ order.Currency }}
        </td>
        <td data-label="Currency">
          {{ order.Currency }}
        </td>
        <td data-label="Currency">
          {{ order.Currency }}
        </td>
        <td data-label="Currency">
          {{ order.Currency }}
        </td>
        <td data-label="Currency">
          {{ order.Currency }}
        </td>
        <td data-label="Currency">
          {{ order.Currency }}
        </td>
        <td data-label="Currency">
          {{ order.Currency }}
        </td>
        <td data-label="Currency">
          {{ order.Currency }}
        </td>

        <td class="actions-cell">
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
        </td>
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
