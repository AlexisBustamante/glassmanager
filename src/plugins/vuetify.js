import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#1a7188',
                //         secondary: '#b0bec5',
                // accent: '#8c9eff',
                // error: '#b71c1c',
            },
            dark: {
                primary: '#1a7188',
            }

        }
    }
});
