<template>
  <v-app id="inspire">
    <!-- <v-system-bar :color="'#11334d'" app>
      <v-spacer></v-spacer>
      <v-icon>mdi-square</v-icon>
      <v-icon>mdi-circle</v-icon>
      <v-icon>mdi-triangle</v-icon>
    </v-system-bar> -->

    <!--//! DIALOG EDITAR -->
    <v-row justify="center">
      <v-dialog v-model="dialogEdit" persistent max-width="600px">
        <v-card>
          <v-toolbar v-show="loading ? false : true" color="primary">
            <span class="text-h5" style="color: white"
              >Cambio de Estado OT {{ itemSelected.OT_numero }}</span
            >
          </v-toolbar>

          <v-card-text>
            <v-container v-if="loading ? true : false">
              <v-row
                class="fill-height"
                align-content="center"
                justify="center"
              >
                <v-col class="text-subtitle-1 text-center" cols="12">
                  Subiendo Archivos a la Nube ...
                </v-col>
                <v-col class="text-subtitle-1 text-center" cols="12">
                  <v-icon x-large>mdi-cloud-arrow-up-outline</v-icon>
                </v-col>

                <v-col cols="6">
                  <v-progress-linear
                    color="primary"
                    indeterminate
                    rounded
                    height="6"
                  ></v-progress-linear>
                </v-col>
              </v-row>
            </v-container>
            <v-container v-if="loading ? false : true">
              <v-form ref="formEditDocument">
                <v-row>
                  <v-row>
                    <v-col>
                      <v-row>
                        <v-container fluid>
                          <v-row>
                            <v-col>
                              <v-radio-group v-model="radioSelec" column>
                                <template v-slot:label>
                                  <div>
                                    Seleccione el
                                    <strong>Estado/Proceso</strong>
                                  </div>
                                </template>
                                <v-radio
                                  v-for="radio in arrEstado"
                                  :color="radio.color"
                                  :label="radio.label"
                                  :value="radio.value"
                                  :key="radio.value"
                                ></v-radio>
                              </v-radio-group>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-row>
                      <v-textarea
                        outlined
                        dense
                        v-model="OT_comentario"
                        label="Comentario"
                        required
                      ></v-textarea>

                      <v-card-actions v-if="loading ? false : true">
                        <v-spacer></v-spacer>
                        <v-btn
                          color="red darken-1"
                          text
                          @click.prevent="cancelDialogEdit()"
                        >
                          Close
                        </v-btn>
                        <v-btn
                          color="blue darken-1"
                          text
                          @click.prevent="editDocument()"
                        >
                          EDIT
                        </v-btn>
                      </v-card-actions>
                    </v-col>
                  </v-row>
                </v-row>
              </v-form>
              <small>*indicates required field</small>
            </v-container>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-row>

    <!-- //!DIALOG ELIMINA DOC-->
    <v-dialog
      v-model="dialogDel"
      transition="dialog-top-transition"
      max-width="600"
    >
      <v-card>
        <!-- <v-toolbar color="primary" dark> Eliminar Registro</v-toolbar> -->
        <v-card-title>
          ¿Desea eliminar el registro OT número :
          {{ itemSelected.OT_numero }}?</v-card-title
        >
        <v-card-text>
          <p class="text--secondary">
            Esta acción es irreversible, por favor asegúrese de que el registro
            sea el correcto a eliminar.
          </p>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn color="primary" text @click="dialogDel = false">Close</v-btn>
          <v-btn color="red" text @click="DeleteDoc">Eliminar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- //!LOGIN -->
    <v-dialog
      v-model="dialogLogin"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-container fluid class="ma-0 pa-0">
          <v-row no-gutters>
            <v-col cols="12" sm="6">
              <v-card-text class="mt-12">
                <v-row align="center" justify="center">
                  <img
                    style="height: 150px; margin-bottom: 20px"
                    src="./assets/logo.png"
                    alt=""
                  />
                </v-row>
                <h4 class="text-center text-h5">Bienvenido</h4>
                <v-row align="center" justify="center">
                  <v-col cols="12" sm="8">
                    <v-text-field
                      label="Email"
                      outlined
                      dense
                      autocomplete="false"
                      class="mt-16"
                      v-model="email"
                    />
                    <v-text-field
                      label="Password"
                      outlined
                      dense
                      autocomplete="false"
                      type="password"
                      v-model="password"
                    />
                    <v-row>
                      <v-col cols="12" sm="7">
                        <!-- <v-checkbox label="Remember Me" class="mt-n1" color="blue"> </v-checkbox> -->
                      </v-col>
                      <v-col cols="12" sm="5">
                        <!-- <span class="caption blue--text">Forgot password</span> -->
                      </v-col>
                    </v-row>
                    <v-btn color="primary" dark @click="signIn()" block tile
                      >Ingresar</v-btn
                    >
                    <!-- <v-btn
                class="mt-1 white--text"
                color="light-green darken-2"
                @click="signIn()"
                block
                tile
                >Registrar</v-btn
              > -->
                    <!-- <v-btn
                class="mt-2"
                color="error"
                dark
                @click="signInWithGoogle()"
                block
                tile
                outlined
              >
                Ingresa con Google
              </v-btn> -->
                    <v-alert
                      style="margin-top: 10px"
                      dismissible
                      v-model="dialogErr"
                      type="error"
                      outlined
                    >
                      Quizás olvidaste tu correo o contraseña.
                    </v-alert>
                    <!-- <h5 class="text-center  grey--text mt-4 mb-3">Or Log in using</h5> -->
                    <div></div>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-col>

            <v-col color="primary" cols="12" sm="6" class="rounded-bl-xl">
              <div
                style="
                  background-color: #1a7188;
                  text-align: center;
                  padding: 180px 0;
                  min-height: 100vh;
                "
              >
                <v-card-text class="white--text">
                  <v-row align="center" justify="center">
                    <img
                      style="height: 300px; margin-bottom: 10px"
                      src="./assets/logo.png"
                      alt=""
                    />
                  </v-row>
                  <h1 class="text-center">PhoenixGlass.</h1>
                  <h5 class="text-center">La solución en tus manos.</h5>
                </v-card-text>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>

    <!-- //TODO:SNACKVAR PARA MENSAJES -->
    <v-snackbar
      :timeout="timeout"
      v-model="snackbar"
      :vertical="vertical"
      :color="snacktype.color"
    >
      <p>
        <v-icon>{{ snacktype.icon }}</v-icon
        >{{ snacktype.msg }}.
      </p>
    </v-snackbar>

    <!-- // ! DIALOG NUEVO -->
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="1000px">
        <v-card>
          <v-toolbar v-show="loading ? false : true" color="primary">
            <span class="text-h5" style="color: white">Ingreso OT</span>
          </v-toolbar>

          <v-card-text>
            <v-container v-if="loading ? true : false">
              <v-row
                class="fill-height"
                align-content="center"
                justify="center"
              >
                <v-col class="text-subtitle-1 text-center" cols="12"> </v-col>
                <v-col class="text-subtitle-1 text-center" cols="12">
                  <v-icon x-large>mdi-cloud-arrow-up-outline</v-icon>
                </v-col>

                <v-col cols="6">
                  <v-progress-linear
                    color="primary"
                    indeterminate
                    rounded
                    height="6"
                  ></v-progress-linear>
                </v-col>
              </v-row>
            </v-container>
            <v-container v-if="loading ? false : true">
              <v-form ref="formNewDocument">
                <v-row>
                  <v-col>
                    <v-row>
                      <v-col>
                        <v-text-field
                          outlined
                          dense
                          v-model="OT_numero"
                          label="Número de OT"
                          :rules="rulesOt"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col>
                        <v-text-field
                          outlined
                          dense
                          v-model="OT_cliente"
                          label="Nombre Cliente"
                          :rules="rules"
                          required
                        ></v-text-field>
                      </v-col>
                    </v-row>

                    <v-textarea
                      outlined
                      dense
                      v-model="OT_comentario"
                      label="Comentario"
                      required
                    ></v-textarea>
                    <v-row>
                      <v-container fluid>
                        <v-row>
                          <v-col cols="12" sm="6" md="6">
                            <v-radio-group v-model="radioSelec" column>
                              <template v-slot:label>
                                <div>
                                  Seleccione el
                                  <strong>Estado/Proceso</strong> del
                                  requerimiento:
                                </div>
                              </template>
                              <v-radio
                                v-for="radio in arrEstado"
                                :color="radio.color"
                                :label="radio.label"
                                :value="radio.value"
                                :key="radio.value"
                              ></v-radio>
                            </v-radio-group>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-row>
                    <v-card-actions v-if="loading ? false : true">
                      <v-spacer></v-spacer>
                      <v-btn
                        color="red darken-1"
                        text
                        @click.prevent="cancelDialog()"
                      >
                        Close
                      </v-btn>
                      <v-btn
                        color="blue darken-1"
                        text
                        @click.prevent="SaveNewDoc()"
                      >
                        Save
                      </v-btn>
                    </v-card-actions>
                  </v-col>
                </v-row>
              </v-form>
              <small>*indicates required field</small>
            </v-container>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-row>

    <v-app-bar color="primary" dark app clipped-right flat height="60">
      <v-app-bar-title>
        {{ pdfsrc != "" ? itemSelected.title : "" }}
      </v-app-bar-title>
      <v-spacer></v-spacer>

      <v-responsive max-width="90">
        <!-- <v-btn class="mx-7" color="#11334d" fab @click="pdfsrc = ''">
          <v-icon> mdi-help-circle-outline </v-icon>
        </v-btn> -->
        <v-switch
          class="mx-7 mt-5"
          v-model="$vuetify.theme.dark"
          inset
          persistent-hint
        ></v-switch>
        <!-- <v-text-field dense flat hide-details rounded solo-inverted></v-text-field> -->
      </v-responsive>
    </v-app-bar>
    <!-- BARRA LATERAL 1 -->
    <v-navigation-drawer v-model="drawer" app width="400">
      <v-navigation-drawer
        v-model="drawer"
        absolute
        color="primary"
        mini-variant
      >
        <!-- <v-avatar
          class="d-block text-center mx-auto mt-4"
          color="grey darken-1"
          size="36"
        >
        </v-avatar> -->
        <v-container fluid>
          <v-row justify="center">
            <v-menu bottom min-width="200px" rounded offset-y>
              <template v-slot:activator="{ on }">
                <v-btn style="margin-top: 5px" icon x-large v-on="on">
                  <v-avatar size="48">
                    <v-icon color="white"> mdi-account-circle </v-icon>
                  </v-avatar>
                </v-btn>
              </template>
              <v-card>
                <v-list-item-content class="justify-center">
                  <div class="mx-auto text-center">
                    <v-avatar size="48">
                      <v-icon color="black"> mdi-account-circle </v-icon>
                    </v-avatar>
                    <!-- <h3>{{ user.fullName }}</h3> -->
                    <p class="text-caption mt-1">
                      {{ user.email }}
                    </p>
                    <v-divider class="my-3"></v-divider>
                    <v-btn depressed rounded text @click="signOutt()">
                      Cerrar Sesión
                    </v-btn>
                  </div>
                </v-list-item-content>
              </v-card>
            </v-menu>
          </v-row>
        </v-container>

        <!-- <v-icon dark class="d-block text-center mx-auto mt-4"
          >mdi-file-chart</v-icon
        > -->

        <v-divider class="mx-3 my-5"></v-divider>
        <v-icon
          @click="addFileDialog()"
          dark
          class="d-block text-center mx-auto mt-4"
          >mdi-file-plus</v-icon
        >
        <v-icon
          @click="delFileDialog()"
          dark
          :disabled="itemSelected.title != '' ? false : true"
          class="d-block text-center mx-auto mt-4"
          >mdi-file-document-remove</v-icon
        >
        <v-icon
          @click="editFileDialog()"
          dark
          :disabled="itemSelected.title != '' ? false : true"
          class="d-block text-center mx-auto mt-4"
          >mdi-file-document-edit</v-icon
        >

        <!-- <v-avatar v-for="n in 6" :key="n" class="d-block text-center mx-auto mb-9" color="grey lighten-1"
              size="28"></v-avatar> -->
      </v-navigation-drawer>

      <v-sheet class="pl-16 pa-3" color="primary" height="60" width="100%">
        <v-row>
          <v-col cols="1">
            <v-icon @click="getDocuments()" color="white">mdi-reload</v-icon>
          </v-col>
          <v-col>
            <v-text-field
              dark
              v-model="search"
              append-icon="mdi-magnify"
              label="Buscar por Número OT"
              dense
              flat
              hide-details
              rounded
              solo-inverted
            ></v-text-field>
          </v-col>
        </v-row>
      </v-sheet>
      <!-- // TODO: COLUMNA IZQUIERDA -->
      <v-list-item-group v-model="selected" color="primary">
        <v-list-item
          class="pl-16"
          three-line
          v-for="item in searching"
          :key="item.id"
          link
          v-on:click="getSelectedItem(item)"
        >
          <v-list-item-content>
            <v-list-item-title
              >OT número : {{ item.OT_numero }}</v-list-item-title
            >
            <v-list-item-subtitle>
              <strong> Última modificación: </strong>
              {{
                new Date(
                  item.OT_createdAd.seconds * 1000
                ).toLocaleDateString() +
                " a las,  " +
                new Date(item.OT_createdAd.seconds * 1000).toLocaleTimeString(
                  "en-US"
                )
              }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>

      <!-- //esta es la lista original -->
      <!-- <v-list class="pl-14" shaped>
            <v-list-item v-for="item in pdfList" :key="item.id" link>
              <v-list-item-content>
                <v-list-item-title> {{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list> -->
    </v-navigation-drawer>

    <!-- // TODOLA COLUMNA DERECHA -->
    <v-navigation-drawer
      v-show="itemSelected.id ? true : false"
      app
      clipped
      right
      :mini-variant="mini"
    >
      <v-list-item class="px-2">
        <v-btn icon @click.stop="mini = !mini">
          <v-icon v-if="mini">mdi-chevron-left</v-icon>
          <v-icon v-else>mdi-chevron-right</v-icon>
        </v-btn>
      </v-list-item>
      <v-card v-if="!mini">
        <v-card-title class="text-subtitle-2 pb-0">Número OT:</v-card-title>
        <v-card-text class="pb-0">{{ itemSelected.OT_numero }}</v-card-text>
        <v-card-title class="text-subtitle-2 pb-0"
          >Comentario Inicial:</v-card-title
        >
        <v-card-text>{{ itemSelected.OT_comentario }}</v-card-text>
        <v-card-title class="text-subtitle-2 pb-0 pt-0">Cliente:</v-card-title>
        <v-chip class="ma-2" color="indigo" text-color="white">
          <v-avatar left>
            <v-icon>mdi-account-circle</v-icon>
          </v-avatar>
          {{ itemSelected.OT_cliente }}
        </v-chip>
        <v-card-title class="text-subtitle-2 pb-0 pt-0"
          >Estado/Proceso Actual:</v-card-title
        >
        <v-chip class="ma-2" color="teal" text-color="white">
          <v-avatar left>
            <v-icon>mdi-file</v-icon>
          </v-avatar>
          {{ itemSelected.OT_EstadoActual }}
        </v-chip>
        <v-card-title class="text-subtitle-2 pb-0 pt-0"
          >Creado por:</v-card-title
        >
        <v-chip class="ma-2" color="teal" text-color="white">
          <v-avatar left>
            <v-icon>mdi-account-circle</v-icon>
          </v-avatar>
          {{ itemSelected.OT_creador }}
        </v-chip>

        <v-card-title class="text-subtitle-2 pb-0 pt-0"
          >Fecha Creación:</v-card-title
        >
        <v-chip class="ma-2" color="cyan" text-color="white">
          <v-avatar left>
            <v-icon>mdi-calendar-range</v-icon>
          </v-avatar>
          {{ itemSelected.OT_dateStringCreated }}
        </v-chip>
        <v-card-title class="text-subtitle-2 pb-0 pt-0"
          >Fecha Modificación:</v-card-title
        >
        <v-chip class="ma-2" color="cyan" text-color="white">
          <v-avatar left>
            <v-icon>mdi-calendar-range</v-icon>
          </v-avatar>
          {{ itemSelected.OT_dateStringUpdate }}
        </v-chip>

        <!-- <v-card-title class="text-subtitle-2 pb-0 pt-0"
          >Tickets Relacionados:</v-card-title
        >
        <v-chip class="ma-2" color="green" text-color="white">
          <v-avatar left>
            <v-icon>mdi-ticket-confirmation</v-icon>
          </v-avatar>
          {{ itemSelected.ticket }}
        </v-chip> -->
      </v-card>
    </v-navigation-drawer>

    <v-main>
      <v-row><h1>&nbsp;</h1></v-row>
      <v-row v-if="itemSelected.id">
        <!-- <img :src="pdfsrc" alt=""> -->
        <v-col>
          <v-container class="py-8 px-6">
            <v-card>
              <v-card-title
                >Historial de cambios OT :
                {{ itemSelected.OT_numero }}</v-card-title
              >
              <v-subheader>{{ itemSelected.id }}</v-subheader>
              <v-list two-line>
                <template v-for="historial in historialList">
                  <v-list-item :key="historial.id">
                    <v-list-item-avatar
                      :color="arrEstado[historial.OT_estadoValue].color"
                    >
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title>
                        Estado: {{ historial.OT_Estado }} -
                        {{
                          new Date(
                            historial.OT_updateAd.seconds * 1000
                          ).toLocaleDateString("en-GB", { hour12: false })
                        }}
                        -
                        {{
                          new Date(
                            historial.OT_updateAd.seconds * 1000
                          ).toLocaleTimeString("en-GB", { hour12: false })
                        }}
                      </v-list-item-title>
                      <v-list-item-subtitle>
                        <strong>Comentario:</strong>
                        {{ historial.OT_comentario }}
                      </v-list-item-subtitle>
                      <v-list-item-subtitle>
                        <strong>Modificado por:</strong>
                        <v-chip class="ma-2" color="teal" text-color="white">
                          <v-avatar left>
                            <v-icon>mdi-account-circle</v-icon>
                          </v-avatar>
                          {{ historial.OT_modificador }}
                        </v-chip>
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </template>
              </v-list>
            </v-card>
          </v-container>
        </v-col>
      </v-row>
      <v-row v-else>
        <welcome-home></welcome-home>
      </v-row>
    </v-main>

    <!-- <v-footer app color="transparent" height="72" inset>
          <v-text-field background-color="grey lighten-1" dense flat hide-details rounded solo></v-text-field>
        </v-footer> -->
  </v-app>
</template>

<script>
import WelcomeHome from "./components/WelcomeHome";
//import AvatarLogin from "./components/AvatarLogin.vue";
//import { config } from "../config/config";
//import data from "/public/data.json";
//const usradm = config.userAdmin;
//const usrpass = config.userPass;

import {
  db,
  collection,
  doc,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  Timestamp,
  where,
  auth,
  signInWithEmailAndPassword,
  signOut,
  orderBy,
  query,
} from "./firebase.js";

export default {
  data: () => ({
    cards: ["Today", "Yesterday"],
    user: {
      fullName: "",
      email: "",
    },
    arrEstado: [
      { label: "Nueva Orden de Trabajo", value: "0", color: "#76FF03" },
      { label: "Corte de vidrios", value: "1", color: "#C0CA33" },
      { label: "Corte de separadores", value: "2", color: "#FFFF00" },
      {
        label: "Armado y llenado de separadores",
        value: "3",
        color: "#FF6D00",
      },
      { label: "Armado de Termopaneles", value: "4", color: "#D84315" },
      { label: "Sellado de Termopaneles", value: "5", color: "#01579B" },
    ],

    radios: "",
    OT_numero: "",
    selected: "",
    OT_cliente: "",
    OT_comentario: "",
    radioSelec: "",
    chips: [],
    itemsCategory: ["Boletines", "Manuales"],
    mini: false,
    customToolbar: [["code-block"]],
    dialogDel: false,
    selectedItem: 0,
    progress: null,
    loading: false,
    dialog: false,
    snackbar: false,
    search: "",
    title: "",
    description: "",
    author: "",
    categoria: "",
    itemsCategoria: ["Boletines", "Manuales"],
    vertical: true,
    itemSelected: { title: "" },
    pdfsrc: null,
    pdfsrc2: null,
    timeout: 5000, //3seg
    drawer: null,
    OTSList: [],
    snacktype: {
      color: "",
      icon: "",
      msg: "",
    },
    historialList: [],
    uploadValue: 0,
    rulesOt: [(v) => v.length >= 1 || "Min 1 characters"],
    rules: [(v) => v.length >= 10 || "Min 10 characters"],
    rulesDesc: [(v) => v.length <= 100 || "Max 100 characters"],
    wordsRules: [(v) => v.trim().split(" ").length <= 5 || "Max 5 words"],
    pdfListAll: [],
    dialogErr: false,
    dialogLogin: true,
    dialogEdit: false,
    email: "",
    password: "",
    enabled: false,
    createdAdDoc: null,
  }),
  components: {
    WelcomeHome,
  },
  methods: {
    signOutt() {
      signOut(auth)
        .then(() => {
          // Sign-out successful.
          this.dialogLogin = true;
          this.user = { fullName: "", email: "" };
        })
        .catch((error) => {
          // An error happened.
          console.log(error);
        });
    },
    cancelDialogEdit() {
      this.dialogEdit = false;
      this.OT_comentario = "";
      this.radioSelec = "0";
    },
    async editDocument() {
      let itemEdit = {
        OT_id: this.itemSelected.id,
        OT_comentario: this.OT_comentario,
        OT_updateAd: Timestamp.fromDate(new Date()),
        OT_modificador: this.user.email,
        OT_Estado: this.arrEstado[this.radioSelec].label,
        OT_estadoValue: this.radioSelec,
      };

      let updateDocNew = this.itemSelected;
      updateDocNew.OT_modificador = this.user.email;
      updateDocNew.OT_dateStringUpdate = new Date().toLocaleDateString(
        "en-GB",
        {
          hour12: false,
        }
      );
      updateDocNew.OT_estadoValue = this.radioSelec;
      updateDocNew.OT_EstadoActual = this.arrEstado[this.radioSelec].label;
      updateDocNew.OT_updateAd = Timestamp.fromDate(new Date());

      if (this.$refs.formEditDocument.validate()) {
        this.loading = true;
        try {
          //**Primero Actuaslizo la OT */
          const docRef = doc(db, "OTS", this.itemSelected.id);
          await updateDoc(docRef, updateDocNew);

          //** le CREO el HISTORIAL DE CAMBIO */
          await addDoc(collection(db, "OTS_historial"), itemEdit);

          //await updateDoc(docRef, itemEdit);
          //await this.getDocuments();
          this.itemSelected = updateDocNew;
          this.getDocumentsHistorial(this.itemSelected.id);
          this.loading = false;
          this.snackbar = true;
          this.dialogEdit = false;
          this.snacktype = {
            color: "success",
            icon: "mdi-check-circle-outline",
            msg: "Documento editado correctamente",
          };
        } catch (error) {
          console.log(error);
          this.loading = false;
        }
      }
    },
    editFileDialog() {
      //*opciones de la ventana
      this.radioSelec = this.itemSelected.OT_estadoValue;
      //console.log(this.itemSelected);
      //* son los elementos de la ventana
      this.OT_comentario = "";
      this.OT_id = this.itemSelected.id;
      this.dialogEdit = true;
    },
    delFileDialog() {
      this.dialogDel = true;
    },
    async DeleteDoc() {
      //console.log(this.itemSelected);

      try {
        await deleteDoc(doc(db, "OTS", this.itemSelected.id));
        //console.log("documento eliminado ", this.itemSelected);
        this.itemSelected = { title: "" };
        this.dialogDel = false;
        this.pdfsrc = "";
        await this.getDocuments(); //recargo lista.
      } catch (error) {
        console.log(error);
        this.dialogDel = false;
      }
    },
    signIn() {
      // this.email=""
      // this.password=""
      // TODO : esto es temporal, se valida con una variable de entorno.
      //
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          //* Signed in
          console.log(userCredential.user);
          this.user = userCredential.user;
          this.dialogLogin = false;
          this.getDocuments();
          //this.$router.push("perfil");
          // ...
        })
        .catch((error) => {
          console.log(error);
          this.dialogErr = true;
        });
    },
    assignDataPDF(event) {
      this.filePDFData = null;
      this.filePDFData = event[0];
      //this.filePDFData.name = this.getFileNameWithTime(this.filePDFData.name);
      console.log(this.filePDFData);
    },
    getFileExtension(filename) {
      //metodo que obtiene la extension del archivo
      return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2);
    },
    getFileNameWithTime(fileName) {
      return (
        fileName.slice(0, fileName.lastIndexOf(".")) +
        new Date().getTime().toString() +
        ".pdf"
      );
    },
    async getDocumentsHistorial(idOT) {
      const querySnapshot = await getDocs(
        query(collection(db, "OTS_historial"), where("OT_id", "==", idOT))
      );

      this.historialList = [];
      querySnapshot.forEach((doc) => {
        let newdoc = doc.data();
        newdoc.id = doc.id;
        this.historialList.push(newdoc);
      });

      this.historialList.sort(
        (x, y) => x.OT_updateAd.seconds - y.OT_updateAd.seconds
      );

      console.log(this.historialList);
    },
    async getDocuments() {
      this.OTSList = [];

      const querySnapshot = await getDocs(
        query(collection(db, "OTS"), orderBy("OT_updateAd", "desc"))
      );
      //const querySnapshot = await getDocs(collection(db, "OTS"));
      //console.log("snapshot", querySnapshot);
      querySnapshot.forEach((doc) => {
        let newdoc = doc.data();
        newdoc.id = doc.id;
        this.OTSList.push(newdoc);
      });

      console.log(this.OTSList);
    },
    cancelDialog() {
      this.dialog = false;
      this.radioSelec = 0;
      this.OT_numero = "";
      this.OT_cliente = "";
      this.OT_comentario = "";
    },
    async SaveNewDoc() {
      let newDoc = {
        OT_numero: this.OT_numero,
        OT_cliente: this.OT_cliente,
        OT_comentario: this.OT_comentario,
        OT_createdAd: Timestamp.fromDate(new Date()),
        OT_updateAd: Timestamp.fromDate(new Date()),
        OT_EstadoActual: this.arrEstado[this.radioSelec].label,
        OT_estadoValue: this.radioSelec,
        OT_dateStringCreated: new Date().toLocaleDateString("en-GB", {
          hour12: false,
        }),
        OT_dateStringUpdate: new Date().toLocaleDateString("en-GB", {
          hour12: false,
        }),
        OT_creador: this.user.email,
        OT_modificador: this.user.email,
      };

      if (this.$refs.formNewDocument.validate()) {
        //subir el primer archivo pdf.
        this.loading = true;
        try {
          // una vez que los 2 archivos subieron
          //a firebase se crear el registro en la base de datos
          const docRef = await addDoc(collection(db, "OTS"), newDoc);
          console.log("OT written with ID: ", docRef.id);

          let newHistorial = {
            OT_id: docRef.id,
            OT_comentario: newDoc.OT_comentario,
            OT_updateAd: Timestamp.fromDate(new Date()),
            OT_modificador: this.user.email,
            OT_Estado: this.arrEstado[this.radioSelec].label,
            OT_estadoValue: this.radioSelec,
          };
          const docRefH = await addDoc(
            collection(db, "OTS_historial"),
            newHistorial
          );
          console.log("OT written with ID: ", docRefH.id);

          this.loading = false;
          this.dialog = false;
          this.snackbar = true;
          this.snacktype = {
            color: "success",
            icon: "mdi-check-circle-outline",
            msg: "OT almacenado correctamente",
          };
          await this.getDocuments();
        } catch (error) {
          console.log(error);
          this.loading = false;
          this.dialog = false;
          this.snackbar = true;
          this.snacktype = {
            color: "red accent-2",
            icon: "mdi-alert-circle-outline",
            msg: "No fue posible Almacenar documento.",
          };
        }
      }
    },

    getSelectedItem(item) {
      this.itemSelected = item;
      this.getDocumentsHistorial(item.id);
      //console.log(item);
    },
    addFileDialog() {
      this.dialog = true;
      this.radioSelec = 0;
      this.OT_numero = "";
      this.OT_cliente = "";
      this.OT_comentario = "";

      //this.contentEditor = item.phpFile;
    },
    DownloadFromUrl(item) {
      this.contentEditor = "";
      this.contentEditor = item.phpFile;
      this.dialogShowphp = true;
      // TODO: este codigo era el antiguo
      // var link = document.createElement("a");
      // link.href = item.phpFile;
      // link.download = item.title + ".php";
      // link.target = "_blank";
      // document.body.appendChild(link);

      // link.click();
      // document.body.removeChild(link);
    },
  },
  computed: {
    keywords() {
      if (!this.search) return [];
      const keywords = [];
      for (const search of this.searching) {
        keywords.push(search.keyword);
      }
      return keywords;
    },
    searching() {
      let arrayTemp = [];
      arrayTemp = this.OTSList;

      if (!this.search) return arrayTemp;

      const search = this.search.toLowerCase();
      return arrayTemp.filter((item) => {
        const text = item.OT_numero.toLowerCase();
        return text.indexOf(search) > -1;
      });
    },
  },

  async created() {
    //aca debemos leer firestore
    if (auth.currentUser) {
      await this.getDocuments();
      //console.log(this.pdfList);
      this.user = auth.currentUser;
      this.pdfsrc = "";
      this.dialogLogin = false;
      console.log(this.itemSelected);
      //this.pdfList = data.datos;
      this.pdfListAll = this.OTSList;
    } else {
      console.log("no creado");
    }
  },
};
</script>

<style lang="css">
@import "~vue2-editor/dist/vue2-editor.css";

/*Import the Quill styles you want */
@import "~quill/dist/quill.core.css";
@import "~quill/dist/quill.bubble.css";
@import "~quill/dist/quill.snow.css";
</style>