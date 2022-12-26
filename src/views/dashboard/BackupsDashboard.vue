
<template>
	<v-container id="dashboard" fluid tag="section">
		<v-row>
		<!--								B A C K U P   J O B S									-->
			<v-col cols="12" md="7">
				<base-material-card color="#E91E63" class="px-5 py-3">
					<template v-slot:heading>
						<div class="display-2 font-weight-light">
							<v-icon>mdi-dip-switch</v-icon>
							Backup Jobs
						</div>
						
	 
					</template>
					<v-text-field
                      v-model="filtro"
                      type="String"
                      label="filtro"
                      class="purple-input"
                    />

					<v-btn  class="mr-0" color="success" outlined text @click="getJobStatus(filtro)">Esatdo del job</v-btn>
					<v-card-text>
						<v-data-table items-per-page="50"
							:headers="backup_job_headers"
							:items="itemsJob">
							
							<template v-slot:item.status="{ item }">
								<v-tooltip bottom>
									<template v-slot:activator="{ on, attrs }">
										<span v-bind="attrs" v-on="on">
											<v-chip :color="getJobStatusColor(item.status)" dark>
												{{ item.status }}
											</v-chip>
										</span>
									</template>
									<span>
										Job Policy: {{ item.job_policy }}<br/>
										Job Schedule : {{ item.job_schedule }}<br/>
									</span>
								</v-tooltip>
							</template>
						</v-data-table>
					</v-card-text>
				</base-material-card>
			</v-col>
			<v-col cols="12" lg="5">
		<!--							D I S K   P O O L   S T A T E								-->
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
							<template v-slot:item.use="{ item }">
								<v-chip :color="getUsageColor(item.use)" dark>
									{{ item.use }}
								</v-chip>
							</template>
							<template v-slot:item.status="{ item }">
								<v-tooltip bottom>
									<template v-slot:activator="{ on, attrs }">
										<span v-bind="attrs" v-on="on">
											<v-chip :color="getHealthStatusColor(item.status)" dark>
												{{ item.status }}
											</v-chip>
										</span>
									</template>
									<span>
										<b>Disk Type:</b> {{ item.disk_type }}<br/>
										<b>Disk Volume Name:</b> {{ item.disk_volume_name }}<br/>
										<b>Use:</b> {{ item.use }}<br/>
										<b>Disk Media:</b> {{ item.disk_media }}<br/>
										<b>Total Capacity:</b> {{ item.total_capacity }}<br/>
										<b>Free Space:</b> {{ item.free_space }}<br/>
										<b>Version:</b> {{ item.version }}<br/>
										<b>Disk Pool Name:</b> {{ item.disk_pool_name }}<br/>
										<b>Num Read Mounts:</b> {{ item.num_read_mounts }}<br/>
										<b>Num Write Mounts:</b> {{ item.num_write_mounts }}<br/>
										<b>Cur Read Streams:</b> {{ item.cur_read_streams }}<br/>
										<b>Cur Write Streams:</b> {{ item.cur_write_streams }}<br/>
										<b>Num Repl Sources:</b> {{ item.num_repl_sources }}<br/>
										<b>Num Repl Targets:</b> {{ item.num_repl_targets }}<br/>
										<b>WORM Lock Min Time:</b> {{ item.worm_lock_min_time }}<br/>
										<b>WORM Lock Max Time:</b> {{ item.worm_lock_max_time }}<br/>
									</span>
								</v-tooltip>
							</template>
						</v-data-table>
					</v-card-text>
				</base-material-card>
		<!--							C L E A N I N G   S T A T U S								-->
				<base-material-card color="#E91E63" class="px-5 py-3" >
					<template v-slot:heading>
						<div class="display-2 font-weight-light">
							<v-icon>mdi-dip-switch</v-icon>
							Cleaning Status
						</div>
					</template>
					<v-card-text>
						<v-data-table 
							:headers="cleaning_status_headers" 
							:items="cleaning_status_items">
							<template v-slot:item.ports="{ item }">
								<v-chip :color="getColor(item.ports)" dark>
									{{ item.ports }}
								</v-chip>
							</template>
						</v-data-table>
					</v-card-text>
					
				</base-material-card>
			</v-col>
    </v-row>


	
	
	
  </v-container>
</template>



<script>
import { API } from "@/tools/API.js";

import axios from "axios";





  export default {
    name: 'DashboardDashboard',
 async mounted () {
   axios
      .get('https://localhost:7198/api/job/')
      .then(async (response) => {
		const data  = response.data
		console.log("respuesta prueba ",response.data)
		this.itemsJob = response.data;

		//this.items = response.data.items;
			/*data.forEach(async(element)=>{
				this.items.push({ text:element.job_id, element.backup_client_name, element.start_datetime,element.end_datetime,element.elapsed_time,element.status})

				
			})*/
		})	
	//	await this.created()
		//this.getAll()
	//await this.getAll()
	
  },
  

    data () {
		
      return {
        backup_job_headers: [
			{ sortable: false, text: 'Job ID',			value: 'job_id', },
//			{ sortable: false, text: 'Job Policy',		value: 'job_policy', groupable:true, },
//			{ sortable: false, text: 'Job Schedule',	value: 'job_schedule', },
			{ sortable: false, text: 'Client',			value: 'id_cliente', },
			{ sortable: false, text: 'Start Time',		value: 'start_datetime', },
			{ sortable: false, text: 'Finish Time',		value: 'end_datetime', },
			{ sortable: false, text: 'Elapsed Time',	value: 'elapsed_time', },
			{ sortable: true,  text: 'Status',			value: 'status', 		align:'center', },
        ],
       /* backup_job_items: [
			{ job_id: 43105, job_policy: 'DHL_Oracle_DB', job_schedule: 'Arch_10_AM', 	client: 'NMXDHLSP07GLPXP-BKP', 	start_time: '10:03:33', finish_time: '10:25:12', 	elapsed_time: '00:21:49', status : 'Done', },
			{ job_id: 43106, job_policy: 'DHL_Oracle_DB', job_schedule: 'Arch_10_AM', 	client: 'NDHLSP03CECOP-BKP', 	start_time: '10:02:19', finish_time: '10:50:19', 	elapsed_time: '00:48:00', status : 'Done', },
			{ job_id: 43107, job_policy: 'DHL_Oracle_DB', job_schedule: 'Arch_10_AM', 	client: 'NMXDHLSP05KMDBP-BKP', 	start_time: '10:03:33', finish_time: '10:25:12', 	elapsed_time: '00:21:49', status : 'Failed', },
			{ job_id: 43108, job_policy: 'DHL_Oracle_DB', job_schedule: 'Arch_10_AM', 	client: 'NMXDHLSP06KMDBB-BKP', 	start_time: '10:03:33', finish_time: '-', 			elapsed_time: '00:21:49', status : 'Running', },
			{ job_id: 43108, job_policy: 'DHL_Servers_OS', job_schedule: 'Incr_D', 		client: 'NMXDHLSP09KMWBP-BKP', 	start_time: '10:03:33', finish_time: '-', 			elapsed_time: '00:21:49', status : 'Running', },
			{ job_id: 43108, job_policy: 'DHL_Oracle_DB', job_schedule: 'Arch_10_AM',	client: 'NMXDHLSP06KMDBB-BKP', 	start_time: '10:03:33', finish_time: '-', 			elapsed_time: '00:21:49', status : 'Running', },
			{ job_id: 43108, job_policy: 'DHL_Oracle_DB', job_schedule: 'Arch_10_AM', 	client: 'NMXDHLSP06KMDBB-BKP', 	start_time: '10:03:33', finish_time: '-', 			elapsed_time: '00:21:49', status : 'Running', },
		],*/
		diskpool_state_headers: [
			{ sortable: false, text: 'Disk Type', 			value: 'disk_type', },
			{ sortable: false, text: 'Disk Volume Name',	value: 'disk_volume_name', },
			{ sortable: false, text: 'Use %', 				value: 'use', },
			{ sortable: true,  text: 'Status', 				value: 'status', },
/*			{ sortable: false, text: 'Disk Media', 			value: 'disk_media', },
			{ sortable: false, text: 'Total Capacity', 		value: 'total_capacity', },
			{ sortable: false, text: 'Free Space', 			value: 'free_space', },
			{ sortable: false, text: 'Version',				value: 'version', },
			{ sortable: false, text: 'Disk Pool Name',		value: 'disk_pool_name', },
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
			{ disk_type: 'Pure Disk', disk_volume_name: 'PureDiskVolume 1', use: 17, status: 'Ok'},
			{ disk_type: 'Pure Disk', disk_volume_name: 'PureDiskVolume 2', use: 55, status: 'Ok'},
			{ disk_type: 'Pure Disk', disk_volume_name: 'PureDiskVolume 3', use: 85, status: 'Ok'},
			{ disk_type: 'Pure Disk', disk_volume_name: 'PureDiskVolume 4', use: 92, status: 'Ok'},
			{ disk_type: 'Pure Disk', disk_volume_name: 'PureDiskVolume 4', use: 26, status: 'Nok'},
        ],
        cleaning_status_headers: [
          { sortable: false, text: 'Drive name',	value: 'drive_name', },
          { sortable: false, text: 'Type',			value: 'type', },
          { sortable: false, text: 'Mount Type', 	value: 'mount_type', },
          { sortable: false, text: 'Frequency',		value: 'frequency', },
          { sortable: false, text: 'Last Clean',	value: 'last_clean', },
          { sortable: false, text: 'Comment',		value: 'comment', },
        ],
        cleaning_status_items: [
			{ drive_name: '-', type: '-', mount_type: '-', frequency: '-', last_clean: '-', comment: '-', },
			{ drive_name: '-', type: '-', mount_type: '-', frequency: '-', last_clean: '-', comment: '-', },
			{ drive_name: '-', type: '-', mount_type: '-', frequency: '-', last_clean: '-', comment: '-', },
        ],
		itemsJob: [],
		estadoJob:[],
		filtro:"",
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
		getJobStatusColor (status) {
			if (status == 'Failed') return 'red'
			else if (status == 'Running') return 'blue'
			else return 'green'
		},
		getHealthStatusColor (status) {
			if (status == 'Ok') return 'green'
			else return 'red'
		},
		getUsageColor (usage) {
			if (usage < '70') return 'green'
			else if (usage < '90') return 'orange'
			else return 'red'
		},
		async getJobStatus(estado) {
			const url =
				"{{endpoint}}/{{controller}}/"+estado
				await API.get(url, {
				params: {
				endpoint: 'https://localhost:7198/api',
				controller: process.env.VUE_APP_CAT_JOB,
				estado:this.filtro,
				},  
			})
				.then(async (response) => {

					//console.log("endpoint "+endpoint+"controller "+controller+"url "+url)
			
				//Recarga de lista
				this.itemsJob = response.data;
				//console.log("reponse "+response.data);

				})
				.catch((e) => {
				console.log("error "+e);
				throw e;
				});
		},

	},

  }
</script>
