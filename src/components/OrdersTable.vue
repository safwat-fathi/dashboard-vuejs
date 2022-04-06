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
        <th>Agent</th>
        <th>Attach_CI</th>
        <th>Attach_CMNFST</th>
        <th>Attach_COO</th>
        <th>Attach_DGD</th>
        <th>Attach_DO</th>
        <th>Attach_HAWB</th>
        <th>Attach_OTR</th>
        <th>Attach_PL</th>
        <th>BookingPerson</th>
        <th>Carrier</th>
        <th>ChargeableWt</th>
        <th>Commodity</th>
        <th>Consignee</th>
        <th>Currency</th>
        <th>DateandTime</th>
        <th>ETA</th>
        <th>ETD</th>
        <th>FlightNO</th>
        <th>Freight</th>
        <th>FromLoc</th>
        <th>GrossWt</th>
        <th>HSCode</th>
        <th>Incoterms</th>
        <th>Insurance</th>
        <th>Job</th>
        <th>JobNumber</th>
        <th>LastEditDateTime</th>
        <th>LastEditUserIDGroup</th>
        <th>LastEditUserIP</th>
        <th>LastEditUserName</th>
        <th>MAWBNO</th>
        <th>NumberOfHAWB</th>
        <th>OrderNumber</th>
        <th>POD</th>
        <th>POL</th>
        <th>POREF</th>
        <th>Pieces</th>
        <th>RemarkDateandTime</th>
        <th>RemarkEmail</th>
        <th>RemarkNote</th>
        <th>RemarkTypy</th>
        <th>Shipper</th>
        <th>Status</th>
        <th>ToLoc</th>
        <th>UUID</th>
        <th>UnitPrice</th>
        <th>UserIDGroup</th>
        <th>UserIP</th>
        <th>UserName</th>
        <th>VolumeWt</th>
        <th>WeightType</th>

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
          {{ order.Attach_CI }}
        </td>
        <td data-label="Carrier">
          {{ order.Attach_CMNFST }}
        </td>
        <td data-label="ChargeableWt">
          {{ order.Attach_COO }}
        </td>
        <td data-label="Currency">
          {{ order.Attach_DGD }}
        </td>
        <td data-label="Currency">
          {{ order.Attach_HAWB }}
        </td>
        <td data-label="Currency">
          {{ order.Attach_DGD }}
        </td>
        <td data-label="Currency">
          {{ order.Attach_OTR }}
        </td>
        <td data-label="Currency">
          {{ order.Attach_PL }}
        </td>
        <td data-label="Currency">
          {{ order.BookingPerson }}
        </td>
        <td data-label="Currency">
          {{ order.Carrier }}
        </td>
        <td data-label="Currency">
          {{ order.ChargeableWt }}
        </td>
        <td data-label="Currency">
          {{ order.Commodity }}
        </td>
        <td data-label="Currency">
          {{ order.Consignee }}
        </td>
        <td data-label="Currency">
          {{ order.Currency }}
        </td>
        <td data-label="Currency">
          {{ order.DateandTime }}
        </td>
        <td data-label="Currency">
          {{ order.ETA }}
        </td>
        <td data-label="Currency">
          {{ order.ETD }}
        </td>
        <td data-label="Currency">
          {{ order.FlightNO }}
        </td>
        <td data-label="Currency">
          {{ order.Freight }}
        </td>
        <td data-label="Currency">
          {{ order.FromLoc }}
        </td>
        <td data-label="Currency">
          {{ order.GrossWt }}
        </td>
        <td data-label="Currency">
          {{ order.HSCode }}
        </td>
        <td data-label="Currency">
          {{ order.Incoterms }}
        </td>
        <td data-label="Currency">
          {{ order.Insurance }}
        </td>
        <td data-label="Currency">
          {{ order.Job }}
        </td>
        <td data-label="Currency">
          {{ order.JobNumber }}
        </td>
        <td data-label="Currency">
          {{ order.LastEditDateTime }}
        </td>
        <td data-label="Currency">
          {{ order.LastEditUserIDGroup }}
        </td>
        <td data-label="Currency">
          {{ order.LastEditUserIP }}
        </td>
        <td data-label="Currency">
          {{ order.LastEditUserName }}
        </td>
        <td data-label="Currency">
          {{ order.MAWBNO }}
        </td>
        <td data-label="Currency">
          {{ order.NumberOfHAWB }}
        </td>
        <td data-label="Currency">
          {{ order.OrderNumber }}
        </td>
        <td data-label="Currency">
          {{ order.POD }}
        </td>
        <td data-label="Currency">
          {{ order.POL }}
        </td>
        <td data-label="Currency">
          {{ order.POREF }}
        </td>
        <td data-label="Currency">
          {{ order.Pieces }}
        </td>
        <td data-label="Currency">
          {{ order.RemarkDateandTime }}
        </td>
        <td data-label="Currency">
          {{ order.RemarkEmail }}
        </td>
        <td data-label="Currency">
          {{ order.RemarkNote }}
        </td>
        <td data-label="Currency">
          {{ order.RemarkTypy }}
        </td>
        <td data-label="Currency">
          {{ order.Shipper }}
        </td>
        <td data-label="Currency">
          {{ order.Status }}
        </td>
        <td data-label="Currency">
          {{ order.ToLoc }}
        </td>
        <td data-label="Currency">
          {{ order.UUID }}
        </td>
        <td data-label="Currency">
          {{ order.UserIDGroup }}
        </td>
        <td data-label="Currency">
          {{ order.UserIP }}
        </td>
        <td data-label="Currency">
          {{ order.UserName }}
        </td>
        <td data-label="Currency">
          {{ order.VolumeWt }}
        </td>
        <td data-label="Currency">
          {{ order.WeightType }}
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
