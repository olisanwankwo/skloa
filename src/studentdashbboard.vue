<template>
  <div class="bg-gray-100 min-h-screen">
    <nav class="bg-white shadow-md flex items-center justify-between px-6 py-4">
      <div class="flex items-center">
        <img class="h-10" src="/src/components/brand.png" alt="Logo">
        <button class="ml-4 text-2xl text-white bg-blue-600 p-2 rounded-lg">
          <i class="bx bx-menu"></i>
        </button>
      </div>
      <div class="flex-1 mx-4">
        <input type="text" placeholder="Search here" class="w-full max-w-xs p-2 border rounded bg-gray-100 placeholder-gray-500">
      </div>
      <div class="flex items-center space-x-6">
        <i class="bx bx-bell text-gray-500 text-2xl cursor-pointer"></i>
        <i class="bx bx-fullscreen text-gray-500 text-2xl cursor-pointer"></i>
        <div class="text-right">
          <p class="text-gray-700 font-medium">{{ studentName }}</p>
          <p class="text-blue-600 text-sm">{{ studentRole }}</p>
        </div>
      </div>
    </nav>

    <div class="flex">
      <aside class="bg-white w-64 p-6 shadow-md">
        <ul class="space-y-4">
          <li>
            <a href="/studentdashboard" class="flex items-center py-3 px-4 rounded hover:bg-blue-50 transition-colors">
              <i class="bx bx-home text-xl"></i>
              <span class="ml-3 text-gray-700">Home</span>
            </a>
          </li>
          <li>
            <div @click="toggleDropdown('profile')" class="flex items-center justify-between cursor-pointer py-3 px-4 rounded hover:bg-blue-50 transition-colors">
              <div class="flex items-center">
                <i class="bx bx-user text-xl"></i>
                <span class="ml-3 text-gray-700">Profile</span>
              </div>
              <i :class="dropdown.profile ? 'bx bx-chevron-up' : 'bx bx-chevron-down'" class="text-gray-600"></i>
            </div>
            <ul v-if="dropdown.profile" class="ml-8 mt-2 space-y-2">
              <li><a href="/studentprofile" class="block py-2 px-4 rounded hover:bg-blue-50 transition-colors">View Profile</a></li>
              <li><a href="/studentupdateprofile" class="block py-2 px-4 rounded hover:bg-blue-50 transition-colors">Update Profile</a></li>
            </ul>
          </li>
          <li>
            <div @click="toggleDropdown('courses')" class="flex items-center justify-between cursor-pointer py-3 px-4 rounded hover:bg-blue-50 transition-colors">
              <div class="flex items-center">
                <i class="bx bx-book text-xl"></i>
                <span class="ml-3 text-gray-700">Courses</span>
              </div>
              <i :class="dropdown.courses ? 'bx bx-chevron-up' : 'bx bx-chevron-down'" class="text-gray-600"></i>
            </div>
            <ul v-if="dropdown.courses" class="ml-8 mt-2 space-y-2">
              <li><a href="/studentcourselist" class="block py-2 px-4 rounded hover:bg-blue-50 transition-colors">List Of Courses</a></li>
              <li><a href="/studentcourseregiration" class="block py-2 px-4 rounded hover:bg-blue-50 transition-colors">Course Registration</a></li>
              <li><a href="/studentviewresult" class="block py-2 px-4 rounded hover:bg-blue-50 transition-colors">View Results</a></li>
            </ul>
          </li>
          <li>
            <a @click="signOut" class="flex items-center cursor-pointer py-2 px-4 rounded hover-effect" >
              <i class="bx bx-log-out text-xl"></i>
              <span class="ml-3 text-gray-700">Logout</span>
            </a>
          </li>
        </ul>
      </aside>

      <main class="flex-1 container mx-auto py-8">
        <div class="flex items-center justify-between mb-8">
          <h1 class="text-3xl font-semibold">Welcome {{studentName}}!</h1>
          <span class="text-gray-600">Home / {{studentRole}}</span>
        </div>

        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div class="bg-white p-6 rounded-lg shadow">
            <i class="bx bx-book-open text-4xl text-blue-600 mb-4"></i>
            <p class="text-xl font-semibold">All Courses</p>
            <p class="text-2xl font-bold">{{ courseCount }}</p>
          </div>
          <div class="bg-white p-6 rounded-lg shadow">
            <i class="bx bx-briefcase text-4xl text-blue-600 mb-4"></i>
            <p class="text-xl font-semibold">All Projects</p>
            <p class="text-2xl font-bold">40/60</p>
          </div>
          <div class="bg-white p-6 rounded-lg shadow">
            <i class="bx bx-task text-4xl text-blue-600 mb-4"></i>
            <p class="text-xl font-semibold">Tests Attended</p>
            <p class="text-2xl font-bold">30/50</p>
          </div>
          <div class="bg-white p-6 rounded-lg shadow">
            <i class="bx bx-check-circle text-4xl text-blue-600 mb-4"></i>
            <p class="text-xl font-semibold">Tests Passed</p>
            <p class="text-2xl font-bold">15/20</p>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div class="bg-white p-6 rounded-lg shadow-md h-48">
            <h2 class="text-xl font-semibold mb-4">Today's Lesson</h2>
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <div class="relative w-20 h-20">
                  <div class="absolute inset-0 rounded-full border-4 border-gray-200"></div>
                  <div class="absolute inset-0 rounded-full border-4 border-blue-600" :style="{ transform: 'rotate(-90deg)', strokeDasharray: 'calc(80 * 31.4 / 100) 31.4', }"></div>
                  <span class="absolute inset-0 flex items-center justify-center text-blue-600 text-lg font-semibold">80%</span>
                </div>
                <div class="ml-4">
                  <p class="text-lg font-semibold">Electrical Engg</p>
                  <p class="text-sm text-gray-600">10/50 Lessons Learned</p>
                </div>
              </div>
              <div class="flex space-x-2">
                <button class="bg-gray-200 text-gray-600 px-4 py-2 rounded-lg">Skip</button>
                <button class="bg-blue-600 text-white px-4 py-2 rounded-lg">Continue</button>
              </div>
            </div>
          </div>

          <div class="bg-white p-6 rounded-lg shadow">
            <h3 class="text-xl font-semibold mb-4">Calendar</h3>
            <VCalendar class="custom-calendar" />
            <VDatePicker v-model="date" mode="dateTime" expanded :rules="rules" :attributes="attributes" />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { supabase } from '@/supabase';
import { ref, onMounted } from 'vue';
import VCalendar from 'v-calendar';
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const studentName = ref('');
const studentRole = ref('');
const courseCount = ref(0);
const dropdown = ref({});
const rules = ref({
  hours: (hour, { weekday }) => {
    if ([1, 7].includes(weekday)) return hour >= 8 && hour < 12;
    return true;
  },
});

let inactivityTimer = null;
let warningTimer = null;

const startInactivityTimer = () => {
      resetInactivityTimer();
      window.addEventListener('mousemove', resetInactivityTimer);
      window.addEventListener('keypress', resetInactivityTimer);
    };

    const resetInactivityTimer = () => {
      clearTimeout(inactivityTimer);
      clearTimeout(warningTimer);

      warningTimer = setTimeout(() => {
        toast.warning('You will be signed out in 5 minutes due to inactivity.');
      }, 300000); 

      inactivityTimer = setTimeout(() => {
        signOut();
      }, 600000);
    };

    onMounted(async () => {
      startInactivityTimer(); 
  try {
    const { data: user, error: userError } = await supabase.auth.getUser ();

    if (userError || !user) {
      console.error('Error fetching user:', userError?.message || 'No user found');
      window.location.href = '/login';
      return;
    }

    const email = user.user?.email;
    if (!email) {
      console.error('No email found for user');
      window.location.href = '/login';
      return;
    }

    const { data, error } = await supabase
      .from('profiles')
      .select('name, role')
      .eq('email', email)
      .single();

    if (data) {
      studentName.value = data.name;
      studentRole.value = data.role;
      
      const { data: coursesData, error: coursesError } = await supabase
        .from('studentcourse')
        .select('*')
        .eq('student_name', studentName.value); 

      if (coursesError) {
        console.error('Error fetching courses:', coursesError);
      } else {
        const count = coursesData.length; 
        courseCount.value = count;
        console.log('Number of courses:', count);
      }
    } else if (error) {
      console.error('Error fetching profile:', error.message);
    }
  } catch (err) {
    console.error('Unexpected error:', err);
  }
});

const signOut = async () => {
  try {
    await supabase.auth.signOut();
    window.location.href = '/login';
  } catch (error) {
    console.error('Error signing out:', error.message);
  }
};

function toggleDropdown(section) {
  dropdown.value[section] = !dropdown.value[section];
}
</script>


<style scoped>
.custom-calendar {
  --vc-primary-color: #3182ce;
  --vc-border-color: #cbd5e0;
}
</style>
