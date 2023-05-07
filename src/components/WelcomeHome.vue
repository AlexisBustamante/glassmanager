<template>
  <v-container>
    <!--esta propiedad en el timeline  :dense="$vuetify.breakpoint.smAndDown" -->
    <v-row class="fill-height" align-content="center" justify="center">
      <img src="../assets/logo.png" alt="" />
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    items: [
      {
        color: "indigo",
        icon: "mdi-magnify",
        title: "Busca un informe",
        description:
          "Busca un ejemplo del informe que tienes que desarrollar a travez del nombre o titulo del mismo.",
      },
      {
        title: "Visualiza un ejemplo",
        color: "green lighten-1",
        icon: "mdi-eye-check-outline",
        description:
          "selecciona el informe que buscaste para poder ver un ejemplo del informe, así sabrás graficamente si es lo que necesitas. ",
      },
      {
        color: "purple darken-1",
        icon: "mdi-book-variant",
        title: "Descarga el Script",
        description:
          "Descarga todo el codigo fuente del ejemplo el cual  te permitirá crear  el informe con una base de HTML,CSS y PHP sin tener que empezar de 0",
      },
    ],
  }),
  methods: {},
  components: {},
  computed: {},
  created() {},
};
</script>
