
<template>
	<v-container id="dashboard" fluid tag="section">
		<v-row>
			<v-col cols="12" md="7">
				<!---------------------------------B A C K U P   J O B S-------------------------------->
				<base-material-card color="#E91E63" class="px-5 py-3">
					<template v-slot:heading>
						<div class="display-2 font-weight-light">
							<v-icon>mdi-dip-switch</v-icon>
							Respaldos
						</div>
						
	 
					</template>
					<v-text-field
                      v-model="filtro"
                      type="String"
                      label="Filtro por estado"
                      class="purple-input"
                    />

					<v-btn  class="mr-0" color="success" outlined text @click="getJobStatus(filtro)">Esatdo del job</v-btn>
					<v-card-text>
						<v-data-table items-per-page="50"
							:headers="backup_job_headers"
							:items="backup_job_items">
							
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
				<!---------------------------------MANTENIMIENTO DE DRIVES-------------------------------->
				<base-material-card color="#E91E63" class="px-5 py-3">
					<template v-slot:heading>
						<div class="display-2 font-weight-light">
							<v-icon>mdi-dip-switch</v-icon>
							Mantenimiento de Drives
						</div>
						
	 
					</template>
					
					<v-card-text>
						<v-data-table items-per-page="50"
							:headers="drives_headers"
							:items="drives_items">
						</v-data-table>
					</v-card-text>
				</base-material-card>
				<!-------------------------------------N A S---------------------------------------------------->
				<base-material-card color="#E91E63" class="px-5 py-3" >
					<template v-slot:heading>
						<div class="display-2 font-weight-light">
							<v-icon>mdi-dip-switch</v-icon>
							NAS
						</div>
					</template>
					<v-card-text>
						<v-data-table 
							:headers="NAS_headers" 
							:items="NAS_items">
							<template v-slot:item.ports="{ item }">
								<v-chip :color="getColor(item.ports)" dark>
									{{ item.ports }}
								</v-chip>
							</template>
						</v-data-table>
					</v-card-text>
					
				</base-material-card>
			</v-col>

			<v-col cols="12" lg="5">
				<!-------------------------------GRÁFICA DE ESTADO DE BACKUPS------------------------->
				<base-material-card color="#E91E63" class="px-5 py-3" >
					<template v-slot:heading>
						<div class="display-2 font-weight-light">
							<v-icon>mdi-dip-switch</v-icon>
							Estatus de Respaldos
						</div>
					</template>
					<v-card-text>
					</v-card-text>
				</base-material-card>

				
				<!----------------------------------LIBRERIAS----------------------------------------->
				<base-material-card color="#E91E63" class="px-5 py-3" >
					<template v-slot:heading>
						<div class="display-2 font-weight-light">
							<v-icon>mdi-dip-switch</v-icon>
							Librerías
						</div>
					</template>
					<v-card-text>
						<v-data-table
							:headers="libreria_headers" 
							:items="libreria_items">
							<template v-slot:item.use="{ item }">
								<v-chip :color="getUsageColor(item.use)" dark>
									{{ item.use }}
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
			{ sortable: false, text: 'Client',			value: 'client', },
			{ sortable: false, text: 'Start Time',		value: 'start_time', },
			{ sortable: false, text: 'Finish Time',		value: 'finish_time', },
			{ sortable: false, text: 'Elapsed Time',	value: 'elapsed_time', },
			{ sortable: true,  text: 'Status',			value: 'status', 		align:'center', },
        ],
       	backup_job_items: [
			{ job_id: 'BCKP0001', job_policy: 'DHL_Oracle_DB', job_schedule: 'ARCH_10_AM', 	client: '2', 	start_time: '0000-00-00 00:00:00', finish_time: '0000-00-00 00:00:00', elapsed_time: '00:21:49', status : 'Done', },
		],
		estadoJob:[],
		filtro:"",
		drives_headers: [
			{ sortable: false, text: 'Disk Type',			value: 'disk_type', },
			{ sortable: false, text: 'Disk Media',			value: 'disk_media', },
			{ sortable: false, text: 'Total Capacity',		value: 'total_capacity', },
			{ sortable: false, text: 'Free Capacity',		value: 'free_capacity', },
			{ sortable: false, text: 'Reading at',	value: 'reading_at', },
        ],
       	drives_items: [
			{ disk_type: '246BCKPS', disk_media: '246BCKPS', total_capacity: '120.01', 	free_capacity: '12.01', reading_at: '2023-03-31 05:00:18', },
		],
		libreria_headers: [
			{ sortable: false, text: 'Drive',			value: 'drive', },
			{ sortable: false, text: 'Drive Path',			value: 'drive_path', },
			{ sortable: false, text: 'Status',		value: 'status', },
			{ sortable: false, text: 'Label',		value: 'label', },
			{ sortable: false, text: 'Ready',	value: 'ready', },
			{ sortable: false, text: 'Fecha',	value: 'fecha', },
        ],
		libreria_items: [
			{ drive: '21538', drive_path: '246BCKPS', status: 'Done', label: 'BCKPDHL_01', ready: 'Ready', fecha: '2023-03-31 5:00:18', },
		],
		NAS_headers: [
			{ sortable: false, text: 'Device', 			value: 'device', },
			{ sortable: false, text: 'Fan',	value: 'fan', },
			{ sortable: false, text: 'Job Policy', 				value: 'job_policy', },
			{ sortable: true,  text: 'Disks', 				value: 'disks', },
			{ sortable: true,  text: 'Client', 				value: 'client', },
			{ sortable: true,  text: 'Master Server', 				value: 'master_server', },
			{ sortable: true,  text: 'Start Time', 				value: 'start_time', },
			{ sortable: true,  text: 'End Time', 				value: 'end_time', },
		],
		NAS_items: [
			{ device: '-', fan: '-', job_policy: '-', disks: '-', client: '-', master_server: '-', start_time: '-', end_time: '-', },
        ],
		//itemsJob: [],
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
