import Vue from 'vue';
import Vuex from 'vuex';
import robotsModule from './modules/robots';
import usersModule from './modules/user';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    robots: robotsModule,
    users: usersModule,
  },
});
