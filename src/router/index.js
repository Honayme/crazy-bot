import Vue from 'vue';
import Router from 'vue-router';
import HomePage from '../home/HomePage.vue';
import RobotBuilder from '../build/RobotBuilder.vue';
import PartInfo from '../parts/PartInfo.vue';
import BrowseParts from '../parts/BrowseParts.vue';
import RobotArms from '../parts/RobotArms.vue';
import RobotBases from '../parts/RobotBases.vue';
import RobotHeads from '../parts/RobotHeads.vue';
import RobotTorsos from '../parts/RobotTorsos.vue';
import SideBarStandard from '../sidebars/SideBarStandard.vue';
import SidebarBuild from '../sidebars/SidebarBuild.vue';
import ShoppingCart from '../cart/ShoppingCart.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [{
    path: '/',
    name: 'Home',
    components: {
      default: HomePage,
      sidebar: SideBarStandard,
    },
  }, {
    path: '/build',
    name: 'Build',
    components: {
      default: RobotBuilder,
      sidebar: SidebarBuild,
    },
  }, {
    path: '/parts/browse',
    name: 'BrowseParts',
    component: BrowseParts,
    children: [
      {
        name: 'BrowseArms',
        path: 'arms',
        component: RobotArms,
      },
      {
        name: 'BrowseBases',
        path: 'bases',
        component: RobotBases,
      },
      {
        name: 'BrowseHeads',
        path: 'heads',
        component: RobotHeads,
      },
      {
        name: 'BrowseTorsos',
        path: 'torsos',
        component: RobotTorsos,
      },
    ],
  }, {
    path: '/parts/:partType/:id',
    name: 'Parts',
    component: PartInfo,
    props: true,
    // Route guard allow to prevent navigate with a non integer inside the URL
    beforeEnter(to, from, next) {
      const isValidId = Number.isInteger(Number(to.params.id));
      next(isValidId);
    },
  }, {
    path: '/cart',
    name: 'Cart',
    component: ShoppingCart,
  }],
});
