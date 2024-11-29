import { createRouter, createWebHistory } from 'vue-router';
import Home from './home.vue';
import Admin from './admin.vue';
import Studentlist from './studentlist.vue';
import Studentupdate from './studentupdate.vue';
import Teacherlist from './teacherlist.vue';
import Courselist from './courselist.vue';
import Updatestudentresult from './updatestudentresult.vue';
import Register from './register.vue';
import Login from './login.vue';
import Courseupload from './courseupload.vue';
import Courseupdate from './courseupdate.vue';
import Studentdashboard from './studentdashbboard.vue';
import Teacherupdateprofile from './teacherupdateprofile.vue';
import Studentupdateprofile from './studentupdateprofile.vue';
import Studentprofile from './studentprofile.vue';
import Studentcourselist from './studentcourselist.vue';
import Studentcourseregiration from './studentcourseregiration.vue';
import Studentviewresult from './studentviewresult.vue';
import Teacherdashboard from './teacherdashboard.vue';
import Teacherprofile from './teacherprofile.vue';
import Teacherupdate from './teacherupdate.vue';
import Teacherstudentlist from './teacherstudentlist.vue';
import Teacherstudentgrade from './teacherstudentgrade.vue';
import Teacherstudentprogress from './teacherstudentprogress.vue';

const routes = [
    { path: '/', redirect: '/home' }, 
    { path: '/home', component: Home },
    { path: '/admin', component: Admin },
    { path: '/studentlist', component: Studentlist },
    { path: '/studentupdate', component: Studentupdate },
    { path: '/teacherlist', component: Teacherlist },
    { path: '/courselist', component: Courselist },
    { path: '/updatestudentresult', component: Updatestudentresult },
    { path: '/register', component: Register },
    { path: '/login', component: Login },
    { path: '/courseupload', component: Courseupload },
    { path: '/courseupdate', component: Courseupdate },
    { path: '/studentdashboard', component: Studentdashboard },
    { path: '/studentupdateprofile', component: Studentupdateprofile },
    { path: '/teacherupdateprofile', component: Teacherupdateprofile },
    { path: '/studentprofile', component: Studentprofile },
    { path: '/studentcourselist', component: Studentcourselist },
    { path: '/studentcourseregiration', component: Studentcourseregiration },
    { path: '/studentviewresult', component: Studentviewresult },
    { path: '/teacherdashboard', component: Teacherdashboard },
    { path: '/teacherprofile', component: Teacherprofile },
    { path: '/teacherupdate', component: Teacherupdate },
    { path: '/teacherstudentlist', component: Teacherstudentlist },
    { path: '/teacherstudentgrade', component: Teacherstudentgrade },
    { path: '/teacherstudentprogress', component: Teacherstudentprogress },
];

const router = createRouter({
    history: createWebHistory(),
    routes 
  });
  
  export default router;
