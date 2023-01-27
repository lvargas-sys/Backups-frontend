/**
 * @copyright       T-Systems México S.A. de C.V
 * @description     HELPER para el consumo de servicios REST
 * @author         
 * @creationDate
 */

// Incluimos la libreria que permite realizar el consumo de servicios REST
import Axios from "axios";
// Incluimos la instancia Vuex
import store from "@/store";
// Incluimos la libreria lodash
import _ from "lodash";
//Incluimos vue Router para el redireccionamiento de rutas
import router from "@/router";



Axios.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      if (typeof error.response === "undefined") {
        //verifica por Error en el certificado
        /*
        if (error.message === "Network Error") {
          window.location.href = process.env.VUE_APP_HOST + "/adanva/ping";
        }
        */
       /*  if (store.state.appCreated) {
          //EL App.vue esta creado y puede mostrar la vista de mantenimiento
          router.push("/Maintenance"); // maintenancePage
        } */
        //indica que estamos en mantenimiento, para que cuando se cree al App.vue muestre la vista de mantenimiento
        //store.commit("maintenancePage", true);
        return Promise.reject(error);
      }
      if (error.response.status === 503) {
        //if (store.state.appCreated) {
          //EL App.vue esta creado y puede mostrar la vista de mantenimiento
          router.push("/Maintenance"); // maintenancePage
        //}
        //indica que estamos en mantenimiento, para que cuando se cree al App.vue muestre la vista de mantenimiento
        //store.commit("maintenancePage", true);
        return Promise.reject(error.response.data);
      }
      if (error.response && error.response.data) {
        return Promise.reject(error.response.data);
      }
      return Promise.reject(error.message);
    }
  );
/**
 * Este método reemplaza los parámetros contenido en la URL en formato <code>{{nombreParametro}}</code>
 * con los valores correspondientes contenidos en el objeto que se recibe en el parámetro params.
 *
 * @param {String} url URL del servicio REST que se desea consumir. La URL puede contener parámetros
 * en el formato <code>{{nombreParametro}}</code>. Los cuales serán reemplazados con sus respectivos
 * valores, contenidos en el objeto <code>params</code>.
 * Ejemplo de una URL:
 *  /api/item/{{itemId}}
 *  /api/location/{{locationId}}/items/{{itemTypeId}}
 *
 * @param {Object} params Un objeto que contiene los valores de los parámetros que serán reemplazados en la URL.
 * Los parámetros corresponden con las propiedades de este objeto, es decir el nombre de la propiedad corresponde
 * al nombre del parámetro en la URL (sensible a minúsculas/mayúsculas).
 *
 * @returns {String} Retorna la url con los valores de los parámetros correspondientes
 * sustituidos en los lugares definidos para tal fin.
 *
 * Para la URL
 *      /api/item/{{itemId}}
 * El objeto params conrrespondientes es el siguiente
 *  params = {
 *      itemId: 10
 *  }
 * El resultado es el siguiente:
 *  /api/item/10
 *
 * Para la URL
 *      /api/location/{{locationId}}/items/{{itemTypeId}}
 * El objeto params conrrespondientes es el siguiente
 *  params = {
 *      locationId: 1,
 *      itemTypeId: 10
 *  }
 * El resultado es el siguiente:
 *  /api/location/1/items/10
 *
 */
const formatRequestURL = (url, params) => {
    if (params) {
        // Si existe el objeto params, iteramos
        // en cada propiedad de éste y la reemplazamos
        // en la url
        Object.keys(params).forEach((key) => {
            // Por cada propiedad, generamos una expresión
            // regular para realizar la sustisución global
            // del nombre del parámetro por su valor
            let pattern = RegExp(`{{${key}}}`, "g");
            url = url.replace(pattern, params[key]);
        });
    }
    //return url;
    console.log(url);
    return url;
};

/**
 * Método base para realizar la llamada al servicio REST. Se encarga de
 * reemplazar los parámetros de la URL, y ejecutar la llamada del servicio REST
 * utilizando Axios.
 *
 * @see formatRequestURL
 *
 * @param {String} method Método por el cual será ejecutado el servicio REST (GET/POST/OUT,DELETE,PATCH)
 *
 * @param {String} url URL del servicio REST que se desea consumir. @see formatRequestURL
 * @param {Object} payload
 *  Un objeto que contiene los valores de los parámetros que serán reemplazados en la URL. @see formatRequestURL
 *  y también los valores que serán enviados dentro del BODY (post).
 *
* {
 *    params: {},
 *    data: {},
 *    headers: {}
 * }
 *
 * -params Un objeto que contiene los valores de los parámetros que serán reemplazados en la URL. @see formatRequestURL
 * -data Información que será enviada al servicio REST.
 * -headers Headers que se incluiran en la llamada al servicio REST.

 */
const doRequest = (method, url, payload) => {
    // Inciamos el LOADER
    store.dispatch("initLoader");
    payload = payload ? payload : {};
    // Obtenemos la información de parametros, headers y contenido (datos)
    // que se van a enviar a la servicio REST
    //
    // @see Object destructuring (https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Operadores/Destructuring_assignment)
    //
    let { params = {}, data = {}, headers = {} } = payload;

    // Creamos el header por default
    // content-type = 'application/json'
    let requestHeaders = {
        "content-type": "application/json",
    };

    requestHeaders['Access-Control-Allow-Origin'] = '*';

    const token = store.getters["auth/token"];
    if (token) {
      requestHeaders["Authorization"] = `Bearer ${token}`;
    }

    // Realizamos el merge con los headers indicados en el parámetro header
    // de manera que si el header indica un content-type diferente
    // se utilice dicho content-type
    // @see https://lodash.com/docs/#merge
    _.merge(requestHeaders, headers);

    // Se realiza el proceso de sustitución de parámetros en la URL
    url = formatRequestURL(url, params);

    // Realizamos la petición al servicio REST
    return Axios({
        method: method,
        url: url,
        data: data,
        headers: requestHeaders,
    }).then(
        (response) => {

            // Detenemos el LOADER
            store.dispatch("stopLoader");
            // Retornamos el resultado
            console.log(response);
            return response;
        },
        (e) => {
            console.log("message", e.message);
            const { error } = e;
            if (error !== undefined && error.message === "jwt expired") {
                console.log("signing out...");
                store.dispatch("closeSesion", router).then(() => {
                  // Actualizamos la página para forzar el redireccionamiento a la pantalla de login
                  window.location.reload();
                });
              }
            // Detenemos el LOADER
            store.dispatch("stopLoader");
            // Ocurrió un error.
            console.log("Error AXIOS:",e);
            throw e;
        }
    ).finally(() => {
        store.dispatch("stopLoader");
    });
};

/**
 * Definimos el API con los métodos get, post, put, delete y patch para hacer
 * mas fácil el consumo de los servicios REST
 */

export const API = {
    /**
     * Consume un servicio REST utilizando el método GET.
     *
     * @param {String} url URL del servicio REST que se desea consumir. @see formatRequestURL
     * @param {Object} payload
     *
     * {
     *    params: {},
     *    data: {},
     *    headers: {}
     * }
     *  params (OPTIONAL): Un objeto que contiene los valores de los parámetros que serán reemplazados en la URL. @see formatRequestURL
     *  headers (OPTIONAL): Valores que serán enviados en el header
     */
    get: (url, payload) => {
        payload = payload ? payload : {};
        let { params = null } = payload;
        if (params) {
            return doRequest("GET", url, payload);
        } else {
            return doRequest("GET", url, { params });
        }
    },
    /**
     * Consume un servicio REST utilizando el método POST.
     *
     * @param {String} url URL del servicio REST que se desea consumir. @see formatRequestURL
     * @param {Object} payload
     *  Un objeto que contiene los valores de los parámetros que serán reemplazados en la URL. @see formatRequestURL
     *  y también los valores que serán enviados dentro del BODY (post).
     *
     * {
     *    params: {},
     *    data: {},
     *    headers: {}
     * }
     */
    post: (url, payload) => {
        return doRequest("POST", url, payload);
    },
    /**
     * Consume un servicio REST utilizando el método PUT.
     *
     * @param {String} url URL del servicio REST que se desea consumir. @see formatRequestURL
     * @param {Object} payload
     *  Un objeto que contiene los valores de los parámetros que serán reemplazados en la URL. @see formatRequestURL
     *  y también los valores que serán enviados dentro del BODY (post).
     *
     * {
     *    params: {},
     *    data: {},
     *    headers: {}
     * }   */
    put: (url, payload) => {
        return doRequest("PUT", url, payload);
    },
    /**
     * Consume un servicio REST utilizando el método PATCH.
     *
     * @param {String} url URL del servicio REST que se desea consumir. @see formatRequestURL
     * @param {Object} payload
     *  Un objeto que contiene los valores de los parámetros que serán reemplazados en la URL. @see formatRequestURL
     *  y también los valores que serán enviados dentro del BODY (post).
     *
     * {
     *    params: {},
     *    data: {},
     *    headers: {}
     * }  */
    patch: (url, payload) => {
        return doRequest("PATCH", url, payload);
    },
    /**
     * Consume un servicio REST utilizando el método DELETE.
     *
     * @param {String} url URL del servicio REST que se desea consumir. @see formatRequestURL
     * @param {Object} payload
     *  Un objeto que contiene los valores de los parámetros que serán reemplazados en la URL. @see formatRequestURL
     *  y también los valores que serán enviados dentro del BODY (post).
     *
     * {
     *    params: {},
     *    data: {},
     *    headers: {}
     * }
     */
    delete: (url, payload) => {
        return doRequest("DELETE", url, payload);
    },
};