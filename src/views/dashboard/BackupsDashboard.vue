<template>
	<v-container id="dashboard" fluid tag="section">
		<v-row>
		<!--                               Backup Jobs                          -->
			<v-col cols="12" md="6">
				<base-material-card color="#E91E63" class="px-5 py-3">
					<template v-slot:heading>
						<div class="display-2 font-weight-light">
							<v-icon>mdi-dip-switch</v-icon>
							Backup Jobs
						</div>
					</template>
					<v-card-text>
						<v-data-table
							:headers="backup_job_headers"
							:items="backup_job_items">
						</v-data-table>
					</v-card-text>
				</base-material-card>
			</v-col>
			<v-col cols="12" lg="3">
		<!--							Disk Pool State								-->
				<base-material-card color="#E91E63" class="px-5 py-3" >
					<template v-slot:heading>
						<div class="display-2 font-weight-light">
							<v-icon>mdi-dip-switch</v-icon>
							Disk Pool State
						</div>
					</template>
					<v-card-text>
						<v-data-table 
							:headers="diskpool_state_headers" 
							:items="diskpool_state_items">
							<template v-slot:item.ports="{ item }">
								<v-chip :color="getColor(item.ports)" dark>
									{{ item.ports }}
								</v-chip>
							</template>
						</v-data-table>
					</v-card-text>
				</base-material-card>
        <!--							Cloud Arrays Health							-->
        <base-material-card 
          color="#E91E63" 
          class="px-5 py-3">
          <template v-slot:heading>
            <div class="display-2 font-weight-light">
              <v-icon class="mr-2">
                  mdi-cloud
                </v-icon>
              Cloud Arrays Health
            </div>
          </template>
          <v-card-text>
            <v-data-table
              :headers="cloud_headers"
              :items="cloud_items"
            >
            <template v-slot:item.status="{ item }">
              <v-chip
                :color="getColor(item.status)"
                dark
              >
                {{ item.status }}
              </v-chip>
            </template>
            <template v-slot:item.controllers="{ item }">
              <v-chip
                :color="getColor(item.controllers)"
                dark
              >
                {{ item.controllers }}
              </v-chip>
            </template>
            <template v-slot:item.ports="{ item }">
              <v-chip
                :color="getColor(item.ports)"
                dark
              >
                {{ item.ports }}
              </v-chip>
            </template>
            </v-data-table>
          </v-card-text>
        </base-material-card>
      </v-col>
      <!--                               Switch Health                          -->
      <v-col
        cols="12"
        lg="4"
      >
        <base-material-chart-card
          :data="emailsSubscriptionChart.data"
          :options="emailsSubscriptionChart.options"
          :responsive-options="emailsSubscriptionChart.responsiveOptions"
          color="#E91E63"
          hover-reveal
          type="Line"
        >
          <template v-slot:reveal-actions>
            <v-tooltip bottom>
              <template v-slot:activator="{ attrs, on }">
                <v-btn
                  v-bind="attrs"
                  color="info"
                  icon
                  v-on="on"
                >
                  <v-icon
                    color="info"
                  >
                    mdi-refresh
                  </v-icon>
                </v-btn>
              </template>

              <span>Refresh</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ attrs, on }">
                <v-btn
                  v-bind="attrs"
                  light
                  icon
                  v-on="on"
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </template>

              <span>Change Date</span>
            </v-tooltip>
          </template>

          <h4 class="card-title font-weight-light mt-2 ml-2">
            Website Views
          </h4>

          <p class="d-inline-flex font-weight-light ml-2 mt-1">
            Last Campaign Performance
          </p>

          <template v-slot:actions>
            <v-icon
              class="mr-1"
              small
            >
              mdi-clock-outline
            </v-icon>
            <span class="caption grey--text font-weight-light">updated 10 minutes ago</span>
          </template>
        </base-material-chart-card>
      </v-col>

      <v-col
        cols="12"
        lg="4"
      >
        <base-material-chart-card
          :data="dailySalesChart.data"
          :options="dailySalesChart.options"
          color="success"
          hover-reveal
          type="Line"
        >
          <template v-slot:reveal-actions>
            <v-tooltip bottom>
              <template v-slot:activator="{ attrs, on }">
                <v-btn
                  v-bind="attrs"
                  color="info"
                  icon
                  v-on="on"
                >
                  <v-icon
                    color="info"
                  >
                    mdi-refresh
                  </v-icon>
                </v-btn>
              </template>

              <span>Refresh</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ attrs, on }">
                <v-btn
                  v-bind="attrs"
                  light
                  icon
                  v-on="on"
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </template>

              <span>Change Date</span>
            </v-tooltip>
          </template>

          <h4 class="card-title font-weight-light mt-2 ml-2">
            Daily Sales
          </h4>

          <p class="d-inline-flex font-weight-light ml-2 mt-1">
            <v-icon
              color="green"
              small
            >
              mdi-arrow-up
            </v-icon>
            <span class="green--text">55%</span>&nbsp;
            increase in today's sales
          </p>

          <template v-slot:actions>
            <v-icon
              class="mr-1"
              small
            >
              mdi-clock-outline
            </v-icon>
            <span class="caption grey--text font-weight-light">updated 4 minutes ago</span>
          </template>
        </base-material-chart-card>
      </v-col>

      <v-col
        cols="12"
        lg="4"
      >
        <base-material-chart-card
          :data="dataCompletedTasksChart.data"
          :options="dataCompletedTasksChart.options"
          hover-reveal
          color="info"
          type="Line"
        >
          <template v-slot:reveal-actions>
            <v-tooltip bottom>
              <template v-slot:activator="{ attrs, on }">
                <v-btn
                  v-bind="attrs"
                  color="info"
                  icon
                  v-on="on"
                >
                  <v-icon
                    color="info"
                  >
                    mdi-refresh
                  </v-icon>
                </v-btn>
              </template>

              <span>Refresh</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ attrs, on }">
                <v-btn
                  v-bind="attrs"
                  light
                  icon
                  v-on="on"
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </template>

              <span>Change Date</span>
            </v-tooltip>
          </template>

          <h3 class="card-title font-weight-light mt-2 ml-2">
            Completed Tasks
          </h3>

          <p class="d-inline-flex font-weight-light ml-2 mt-1">
            Last Last Campaign Performance
          </p>

          <template v-slot:actions>
            <v-icon
              class="mr-1"
              small
            >
              mdi-clock-outline
            </v-icon>
            <span class="caption grey--text font-weight-light">campaign sent 26 minutes ago</span>
          </template>
        </base-material-chart-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'BackupsDashboard',

    data () {
      return {
        dailySalesChart: {
          data: {
            labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
            series: [
              [12, 17, 7, 17, 23, 18, 38],
            ],
          },
          options: {
            lineSmooth: this.$chartist.Interpolation.cardinal({
              tension: 0,
            }),
            low: 0,
            high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
            chartPadding: {
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
            },
          },
        },
        dataCompletedTasksChart: {
          data: {
            labels: ['12am', '3pm', '6pm', '9pm', '12pm', '3am', '6am', '9am'],
            series: [
              [230, 750, 450, 300, 280, 240, 200, 190],
            ],
          },
          options: {
            lineSmooth: this.$chartist.Interpolation.cardinal({
              tension: 0,
            }),
            low: 0,
            high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
            chartPadding: {
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
            },
          },
        },
        emailsSubscriptionChart: {
          data: {
            labels: ['Ja', 'Fe', 'Ma', 'Ap', 'Mai', 'Ju', 'Jul', 'Au', 'Se', 'Oc', 'No', 'De'],
            series: [
              [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895],

            ],
          },
          options: {
            axisX: {
              showGrid: false,
            },
            low: 0,
            high: 1000,
            chartPadding: {
              top: 0,
              right: 5,
              bottom: 0,
              left: 0,
            },
          },
          responsiveOptions: [
            ['screen and (max-width: 640px)', {
              seriesBarDistance: 5,
              axisX: {
                labelInterpolationFnc: function (value) {
                  return value[0]
                },
              },
            }],
          ],
        },
        backup_job_headers: [
			{ sortable: false, text: 'Job ID',			value: 'job_id', },
//			{ sortable: false, text: 'Job Policy',		value: 'job_policy', },
//			{ sortable: false, text: 'Job Schedule',	value: 'job_schedule', },
			{ sortable: false, text: 'Client',			value: 'client', },
			{ sortable: false, text: 'Start Time',		value: 'start_time', },
			{ sortable: false, text: 'Finish Time',		value: 'finish_time', },
			{ sortable: false, text: 'Elapsed Time',	value: 'elapsed_time', },
			{ sortable: true, text: 'Status',			value: 'status', },
        ],
        backup_job_items: [
			{ job_id: 43105, job_policy: 'DHL_Oracle_DB', job_schedule: 'Arch_10_AM', 	client: 'NMXDHLSP07GLPXP-BKP', 	start_time: '10:03:33', finish_time: '10:25:12', 	elapsed_time: '00:21:49', status : 'Done', },
			{ job_id: 43106, job_policy: 'DHL_Oracle_DB', job_schedule: 'Arch_10_AM', 	client: 'NDHLSP03CECOP-BKP', 	start_time: '10:02:19', finish_time: '10:50:19', 	elapsed_time: '00:48:00', status : 'Done', },
			{ job_id: 43107, job_policy: 'DHL_Oracle_DB', job_schedule: 'Arch_10_AM', 	client: 'NMXDHLSP05KMDBP-BKP', 	start_time: '10:03:33', finish_time: '10:25:12', 	elapsed_time: '00:21:49', status : 'Failed', },
			{ job_id: 43108, job_policy: 'DHL_Oracle_DB', job_schedule: 'Arch_10_AM', 	client: 'NMXDHLSP06KMDBB-BKP', 	start_time: '10:03:33', finish_time: '-', 			elapsed_time: '00:21:49', status : 'Running', },
			{ job_id: 43108, job_policy: 'DHL_Servers_OS', job_schedule: 'Incr_D', 		client: 'NMXDHLSP09KMWBP-BKP', 	start_time: '10:03:33', finish_time: '-', 			elapsed_time: '00:21:49', status : 'Running', },
			{ job_id: 43108, job_policy: 'DHL_Oracle_DB', job_schedule: 'Arch_10_AM',	client: 'NMXDHLSP06KMDBB-BKP', 	start_time: '10:03:33', finish_time: '-', 			elapsed_time: '00:21:49', status : 'Running', },
			{ job_id: 43108, job_policy: 'DHL_Oracle_DB', job_schedule: 'Arch_10_AM', 	client: 'NMXDHLSP06KMDBB-BKP', 	start_time: '10:03:33', finish_time: '-', 			elapsed_time: '00:21:49', status : 'Running', },
		],
		diskpool_state_headers: [
			{ sortable: false, text: 'Disk Type', 			value: 'disk_type', },
			{ sortable: false, text: 'Disk Volume Name',	value: 'disk_volume_type', },
			{ sortable: false, text: 'Use %', 				value: 'use', },
			{ sortable: true,  text: 'Status', 				value: 'status', },
/*			{ sortable: false, text: 'Disk Media', 			value: 'disk_media', },
			{ sortable: false, text: 'Total Capacity', 		value: 'total_capacity', },
			{ sortable: false, text: 'Free Space', 			value: 'free_space', },
			{ sortable: false, text: 'Version',				value: 'version', },
			{ sortable: false, text: 'Disk Pool Name',		value: 'disk_pool_state', },
			{ sortable: false, text: 'Num Read Mounts', 	value: 'num_read_mounts', },
			{ sortable: false, text: 'Num Write Mounts', 	value: 'num_write_mounts', },
			{ sortable: false, text: 'Cur Read Streams', 	value: 'cur_read_streams', },
			{ sortable: false, text: 'Cur Write Streams', 	value: 'cur_write_streams', },
			{ sortable: false, text: 'Num Repl Sources', 	value: 'num_repl_sources', },
			{ sortable: false, text: 'Num Repl targets', 	value: 'num_repl_targets', },
			{ sortable: false, text: 'WORM Lock Min Time', 	value: 'worm_lock_min_time', },
			{ sortable: false, text: 'WORM Lock Max Time', 	value: 'worm_lock_max_time', },*/
		],
		diskpool_state_items: [
			{ disk_type: 'Pure Disk', disk_volume_type: 'PureDiskVolume', use: 17, status: 'Ok'},
        ],
        cloud_headers: [
          { sortable: false, text: 'Device',      value: 'device', },
          { sortable: false, text: 'Status',      value: 'status', },
          { sortable: false, text: 'Controllers', value: 'controllers', },
          { sortable: false, text: 'Ports',       value: 'ports', },
        ],
        cloud_items: [
          { device: 'StoreSimple1', status: 1, controllers: 0, ports: 0, },
          { device: 'StoreSimple2', status: 0, controllers: 1, ports: 0, },
          { device: 'StoreSimple3', status: 0, controllers: 0, ports: 1, },
        ],
        tabs: 0,
        list: {
          0: false,
          1: false,
          2: false,
        }
      }
    },
    methods: {
      complete (index) {
        this.list[index] = !this.list[index]
      },
      getColor (alerts) {
        if (alerts > 0) return 'red'
        else return 'green'
      },
    },
  }
</script>
