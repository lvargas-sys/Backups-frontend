<template>
    <v-container
      id="user-profile"
      fluid
      tag="section"
    >

    <v-row justify="center">
        <v-col
          cols="12"
          md="8"
        >
    <base-material-card>
            <template v-slot:heading>
              <div class="display-2 font-weight-light">
                Insert Cliente
              </div>
  
            
            </template>

      <v-form ref="form">
        <v-row>
          <v-col xl="6" md="6" xs="12" sm="12">
            <v-text-field
              v-model="cliente.nombre_cliente"
              label="cliente"
              type="String"
              class="purple-input"
              
            ></v-text-field>
          </v-col>
          
          
        </v-row>
      </v-form>

      <v-card-actions>
        <v-spacer></v-spacer>
          <v-btn
            color="success"
            class="mr-0"
            @click="save()"
          >
            Guardar
          </v-btn>
      </v-card-actions>
    </base-material-card>  


      <!--INSERT DEVICE-->

     
          <base-material-card>
            <template v-slot:heading>
              <div class="display-2 font-weight-light">
                Insert Device
              </div>
  
            
            </template>
  
            <v-form  ref="formDispositivo">
              <v-container class="py-0">
                <v-row>
              
  
                  <v-col
                    cols="12"
                    md="4"
                  >
                    <v-text-field
                      v-model="dispositivo.nombre_dispositivo"
                      type="String"
                      class="purple-input"
                      label="nombre dispositivo"
                    />
                 
                  </v-col>
                  <v-col
                    cols="12"
                    md="4"
                  >
                    <v-text-field
                      v-model="dispositivo.contrato_soporte"
                      class="purple-input"
                      label="contrato_soporte"
                      type="date"
                    />
                  </v-col>
  
                  <v-col
                    cols="12"
                    md="4"
                  >
                    <v-text-field
                      v-model="dispositivo.ip"
                      type="String"
                      label="ip"
                      class="purple-input"
                    />
                  </v-col>
  
                  <v-col
                    cols="12"
                    md="4"
                  >
                    <v-text-field
                      v-model="dispositivo.end_life" 
                      label="end_life"
                      class="purple-input"
                      type="date"
                    />
                  </v-col>
  
                  <v-col
                    cols="12"
                    md="4"
                  >
                    <v-text-field
                      v-model="dispositivo.end_support"
                      label="end_support"
                      class="purple-input"
                      type="date"
                    />
                  </v-col>
  
                  <v-col cols="12" md="4">
                    
                    <v-text-field
                      v-model="dispositivo.tipo"
                      type="String"
                      label="tipo"
                      class="purple-input"
                    />
                  </v-col>
  
                  <v-col
                    cols="12"
                    md="4"
                  >
                    <v-text-field
                      v-model="dispositivo.id_cliente"
                      type="String"
                      label="id_cliente"
                      class="purple-input"
                    />

                   

                  </v-col>
  
                
  
                  <v-col
                    cols="12"
                    class="text-right"
                  >
                    <v-btn
                      color="success"
                      class="mr-0"
                      @click="saveDevice()"
                    >
                      Guardar Device
                    </v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </base-material-card>
        </v-col>
  


      </v-row>
      <v-snackbar
          v-model="snack"
          :timeout="10000"
          :color="snackColor"
          class="text-center"
        >
          <h4 class="white--text">{{ snackText }}</h4>

          <v-btn color="white" outlined text @click="snack = false">OK</v-btn>
        </v-snackbar>
    </v-container>
  </template>
  
  <script>

import axios from "axios";
import { API } from "@/tools/API.js";



  export default {

  data() {
    return {
    
    cliente:
    {
      // id_cliente: 0,
      nombre_cliente: ""
      
    },
    dispositivo:
    {
      //id_dispositvo:""
      nombre_dispositivo:"",
      contrato_soporte:"",//Date
      ip:"",
      end_life:"",//date
      end_support:"",//date	
      tipo:"",
      id_cliente:0
    },

    
    snack: false,
    snackColor: "",
    snackText: "",
    };
  },
  methods:{

    async save() {

      if (this.$refs.form.validate()) {

        const data = {
          nombre_cliente: this.cliente.nombre_cliente,
           
          };

          await this.newCliente(data);
        console.log("data",data);
      }

    },
    async saveDevice() {

    if (this.$refs.formDispositivo.validate()) {

      const data = {
        nombre_dispositivo:this.dispositivo.nombre_dispositivo,
        contrato_soporte:this.dispositivo.contrato_soporte,//Date
        ip:this.dispositivo.ip,
        end_life:this.dispositivo.end_life,//date
        end_support:this.dispositivo.end_support,//date	
        tipo:this.dispositivo.tipo,
        id_cliente:this.dispositivo.id_cliente
        
        };

        await this.newDevice(data);
      console.log("data",data);
    }

    },

    async newCliente(data) {
        const url = "{{endpoint}}/api/{{controller}}";
        await API.post(url, {
          params: {
            endpoint:'https://localhost:7198', 
            controller: 'customers',//process.env.VUE_APP_CAT_CUSTOMER,
          },
          data: data,
        })
          .then(async (response) => {
            //Recarga de lista
            console.log(response.data);
            this.snack = true;
            this.snackColor = "success";
            this.snackText = "Registro exitoso";
           
          })
          .catch((e) => {
            // Ocurrió un error en el API
            console.log(e);
            this.snack = true;
            this.snackColor = "danger";
            this.snackText = "Error al realizar registro del elemento";
            throw e;
          })
        
     
    },

    async newDevice(data) {
        const url = "{{endpoint}}/api/{{controller}}";
        await API.post(url, {
          params: {
            endpoint:'https://localhost:7198', 
            controller: 'device',
          },
          data: data,
        })
          .then(async (response) => {
            //Recarga de lista
            console.log(response.data);
            this.snack = true;
            this.snackColor = "success";
            this.snackText = "Registro exitoso";
           
          })
          .catch((e) => {
            // Ocurrió un error en el API
            console.log(e);
            this.snack = true;
            this.snackColor = "danger";
            this.snackText = "Error al realizar registro del elemento";
            throw e;
          })
        
     
    },

    
  }
}
  </script>
  