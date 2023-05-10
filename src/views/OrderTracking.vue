<template>
  <div>
    <v-container class="mt-15">
      <v-data-table class="elevation-5 row-pointer mt-7" :loading="orderList.loading" :headers="filteredOrderHeaders" :items="orderList.tableItem" item-key="id" no-data-text="$t('knittingOrderProductionTransaction.no-assigned-stock-found')" style="margin-top: 0px !important" :items-per-page="5" @click:row="openCargoTrackingDialog">
        <template v-slot:top>
          <div class="text-right">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn class="mx-2" icon dark small color="info" v-bind="attrs" v-on="on" @click="openCargoTrackingNumberDialog()"><v-icon dark>attach_file</v-icon> </v-btn>
              </template>
              <span>Kargo Takip Numarası Ekle</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn class="mx-2" icon dark small color="info" v-bind="attrs" v-on="on" @click="getOrderList()"><v-icon dark>mdi-refresh</v-icon> </v-btn>
              </template>
              <span>Yenile</span>
            </v-tooltip>
          </div>
        </template>
      </v-data-table>
    </v-container>
    <v-dialog v-model="cargoTrackingNumberDialog.show">
      <v-card >
        <v-app-bar color="header">
          <v-card-title style="color:white">Kargo Takip Numarası Ekle</v-card-title>
          <v-spacer></v-spacer>
          <v-btn class="mx-2" icon dark small  @click="closeCargoTrackingNumberDialog()"><v-icon dark>cancel</v-icon> </v-btn>
        </v-app-bar>
        <v-card-text>
          <v-container style="heihgt:150px" fluid>
          <v-row>
            <v-col cols="12" md="12">
              <v-textarea v-model="cargoTrackingNumberDialog.list" row="50" outlined label="Kargo Takip Numaraları"></v-textarea>
            </v-col>
          </v-row>
          <v-row class="text-right">
            <v-col cols="12" md="12">
              <v-btn class="mx-2" color="primary" @click="sendCargoTrackingNumber()">Gönder</v-btn>
            </v-col>
          </v-row>
        </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog v-model="cargoTrackingDialog.show" v-if="cargoTrackingDialog.show">
      <v-card>
        <v-app-bar color="header">
          <v-card-title style="color:white">Kargo Takip Numarası Ekle</v-card-title>
          <v-spacer></v-spacer>
          <v-btn class="mx-2" icon dark small @click="closeCargoTrackingDialog()"><v-icon dark>cancel</v-icon> </v-btn>
        </v-app-bar>
        <v-data-table class="elevation-1" :headers="filteredOrderDetailHeaders" :items="cargoTrackingDialog.list" item-key="id" no-data-text="$t('knittingOrderProductionTransaction.no-assigned-stock-found')" style="margin-top: 0px !important" :footer-props="{ 'items-per-page-options': [5,50] }" :items-per-page="50" />
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data: () => ({
    tab: "tab-0",
    orderList: { loading:false, tableItem:[], headers:[] },
    cargoTrackingNumberDialog: { show:false, list: "" },
    person: {username: "", password: "" },
    cargoTrackingDialog: {  show: false, list: [], headers:[] }
  }),
  computed:{
    filteredOrderHeaders() {
			return this.orderList.headers.filter((header) => header.showInTable).map((header) => ({ ...header }))
		},
    filteredOrderDetailHeaders() {
			return this.cargoTrackingDialog.headers.filter((header) => header.showInTable).map((header) => ({ ...header }))
		}
  },
  created() {
		this.orderList.headers = [
			{ text: 'Müşteri', align: 'left', sortable: false, value: 'customer', showInTable: true },
			{ text: 'Telefon', align: 'center', sortable: false, value: 'customerPhoneNumber', showInTable: true },
			{ text: 'İl', align: 'center', sortable: false, value: 'city', showInTable: true },
			{ text: 'İlçe', align: 'center', sortable: false, value: 'district', showInTable: true },
			{ text: 'Ödeme Şekli', align: 'center', sortable: false, value: 'paymentType', showInTable: true },
			{ text: 'Sayı', align: 'center', sortable: false, value: 'number', showInTable: true },
			{ text: 'Tutar', align: 'center', sortable: false, value: 'amount', showInTable: true },
			{ text: 'Kargo', align: 'center', sortable: false, value: 'cargo', showInTable: true },
			{ text: 'Kargo Durumu', align: 'center', sortable: false, value: 'state', showInTable: true }
		],
    this.cargoTrackingDialog.headers = [
			{ text: 'Tarih', align: 'left', sortable: false, value: 'trackingDate', showInTable: true },
			{ text: 'İşlem', align: 'center', sortable: false, value: 'process', showInTable: true },
			{ text: 'Şube', align: 'center', sortable: false, value: 'branch', showInTable: true },
			{ text: 'İl/İlçe', align: 'center', sortable: false, value: 'location', showInTable: true },
			{ text: 'Açıklama', align: 'center', sortable: false, value: 'explanation', showInTable: true },
		]
	},
  methods:{
    async getOrderList(){
      this.orderList.loading=true
      const response = await this.axios.get("http://localhost:1453/order/getAll")
      this.orderList.tableItem = response.data
      console.log(this.orderList)
      this.orderList.loading=false
    },
    openCargoTrackingNumberDialog(){
      this.cargoTrackingNumberDialog.show=true
    },
    async sendCargoTrackingNumber(){
      let addCargoTrackingDto = { cargoTrackingNumbers: this.cargoTrackingNumberDialog.list, username: localStorage.getItem('username'), password: localStorage.getItem('password')}
      await this.axios.post("http://localhost:1453/cargoTracking/sendCargoTrackingNumbers", addCargoTrackingDto)
    },
    closeCargoTrackingNumberDialog() {
      this.getOrderList()
      this.cargoTrackingNumberDialog = { show: false, list: "" }
    },
    openCargoTrackingDialog(value){
      console.log(value.cargoTrackings)
      this.cargoTrackingDialog = { ...this.cargoTrackingDialog, show: true, list: value.cargoTrackings }
    },
    closeCargoTrackingDialog(){
      this.cargoTrackingDialog = { ...this.cargoTrackingDialog, show: false, list: []}
    }
  },
  mounted() {
    this.getOrderList()
  },
}
</script>

<style lang="css" scoped>
.row-pointer >>> tbody tr :hover {
  cursor: pointer;
}
</style>