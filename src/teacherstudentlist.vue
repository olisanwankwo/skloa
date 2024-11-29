<template>
  <div style="background-color: #f7f7fa;">
    <nav class="bg-white shadow-md flex items-center justify-between px-4 py-2">
      <div class="flex items-center">
        <img class="h-10"  src="/src/components/brand.png" alt="Logo">
        <button class="ml-4 text-2xl text-white bg-blue-600 p-2 rounded">
          <i class='bx bx-menu'></i>
        </button>
      </div>
      <div class="flex-1 mx-4">
        <input type="text" placeholder="Search here" class="w-64 p-2 border rounded bg-gray-100 placeholder-gray-500">
      </div>
      <div class="flex items-center space-x-4">
        <i class='bx bx-bell text-gray-500 text-2xl'></i>
        <i class='bx bx-fullscreen text-gray-500 text-2xl'></i>
        <div class="text-right">
          <p class="text-gray-700">{{teacherName}}</p>
          <p class="text-blue-600 text-sm">{{teacherRole}}</p>
        </div>
      </div>
    </nav>
    <div class="flex">
      <div class="bg-white max-h-full min-h-screen w-64 p-4 shadow-md">
        <ul class="space-y-4">
          <li>
            <a href="/teacherdashboard" class="flex items-center py-2 px-4 rounded hover-effect" >
              <i class='bx bx-home text-xl'></i>
              <span class="ml-3 text-gray-700">Home</span>
            </a>
          </li>          
          <li>
            <div @click="toggleDropdown('courses')" class="flex items-center justify-between cursor-pointer py-2 px-4 rounded hover:bg-gray-100">
              <div class="flex items-center">
                <i class='bx bx-user text-xl'></i>
                <span class="ml-3 text-gray-700">Profile</span>
              </div>
              <i :class="dropdown.courses ? 'bx bx-chevron-up' : 'bx bx-chevron-down'" class="text-gray-600"></i>
            </div>
            <ul v-if="dropdown.courses" class="ml-8 mt-2 space-y-2">
              <li><a href="/teacherprofile" class="block py-2 px-4 rounded hover:bg-gray-100">View Profile</a></li>
              <li><a href="/teacherupdate" class="block py-2 px-4 rounded hover:bg-gray-100">Update Profile</a></li>
            </ul>
          </li>
          <li>
            <div @click="toggleDropdown('students')" class="flex items-center justify-between cursor-pointer py-2 px-4 rounded hover:bg-gray-100">
              <div class="flex items-center">
                <i class='bx bxs-graduation text-xl'></i>
                <span class="ml-3 text-gray-700">Students</span>
              </div>
              <i :class="dropdown.students ? 'bx bx-chevron-up' : 'bx bx-chevron-down'" class="text-gray-600"></i>
            </div>
            <ul v-if="dropdown.students" class="ml-8 mt-2 space-y-2">
              <li><a href="/teacherstudentlist" class="block py-2 px-4 rounded hover:bg-gray-100">List of Students</a></li>
              <li><a href="/teacherstudentgrade" class="block py-2 px-4 rounded hover:bg-gray-100">Grade Students</a></li>
              <li><a href="/teacherstudentprogress" class="block py-2 px-4 rounded hover:bg-gray-100">Student Progress</a></li>
            </ul>
          </li>
          <li>
            <a @click="signOut" class="flex items-center cursor-pointer py-2 px-4 rounded hover-effect" >
              <i class="bx bx-log-out text-xl"></i>
              <span class="ml-3 text-gray-700">Logout</span>
            </a>
          </li>
        </ul>
      </div>
      <div class="container mx-auto py-8">
        <div class="flex justify-between items-center mb-6">
          <h1 class="text-3xl font-semibold">Students</h1>
          <span class="text-gray-600">Student / All Students</span>
        </div>
        <div class="flex space-x-4 mb-6">
          <input type="text" placeholder="Search by ID ..." class="px-4 py-2 border rounded-md w-full">
          <input type="text" placeholder="Search by Name ..." class="px-4 py-2 border rounded-md w-full">
          <input type="text" placeholder="Search by Phone ..." class="px-4 py-2 border rounded-md w-full">
          <button class="bg-blue-500 text-white px-4 py-2 rounded-md">Search</button>
        </div>
        <div class="bg-white shadow-md rounded-lg overflow-hidden">
          <table class="min-w-full leading-normal">
            <thead>
              <tr>
                <th scope="col" class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  ID
                </th>
                <th scope="col" class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Level
                </th>
                <th scope="col" class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  DOB
                </th>
                <th scope="col" class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Department
                </th>
                <th scope="col" class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Mobile Number
                </th>
                <th scope="col" class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Address
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="student, index in paginatedStudents" :key="student.id">
                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {{ index + 1 }}
                </td>
                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <div class="flex items-center">
                    <div class="ml-3">
                      <p class="text-gray-900 whitespace-no-wrap">
                        {{ student.name }}
                      </p>
                    </div>
                  </div>
                </td>
                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {{ student.level }}
                </td>
                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {{ student.dob }}
                </td>
                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {{ student.department
                   }}
                </td>
                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {{ student.phone }}
                </td>
                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {{ student.address }}
                </td>
              </tr>
            </tbody>
          </table>
            </div>
            <div class="flex justify-between items-center py-3 bg-white mt-6" style="background-color: #f7f7fa;">
              <span class="text-sm text-gray-700">
                Showing {{ start }} to {{ end }} of {{ totalStudents }} entries
              </span>
              <div>
                <button @click="prevPage" :disabled="currentPage === 1" class="px-3 py-1 rounded-l bg-gray-200 hover:bg-gray-300 text-gray-800">
                  Previous
                </button>
                <button class="px-3 py-1 bg-blue-500 text-white">{{ currentPage }}</button>
                <button @click="nextPage" :disabled="currentPage === totalPages" class="px-3 py-1 rounded-r bg-gray-200 hover:bg-gray-300 text-gray-800">
                  Next
                </button>
              </div>
            </div>
            <footer class="text-center py-4">
              <span class="text-gray-600">COPYRIGHT © 2024 SKOLA.</span>
            </footer>
          </div>
          </div>
          </div>
</template>

<script>
import { store } from '@/store';
import { ref, onMounted, computed } from 'vue';
import { supabase } from '@/supabase';
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export default {
  setup() {
    const teacherName = computed(() => store.teacherName);
    const teacherRole = computed(() => store.teacherRole);

    const dropdown = ref({
      courses: false,
      teacher: false,
      students: false,
    });

    const students = ref([]);
    const currentPage = ref(1);
    const perPage = ref(10);

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

        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('name, role')
          .eq('email', email)
          .single();

        if (profileData) {
          store.teacherName = profileData.name;
          store.teacherRole = profileData.role;
        }
      } catch (error) {
        console.error('Error during user fetching:', error);
      }

      await getStudents();
    });

    const totalStudents = computed(() => students.value.length);
    const totalPages = computed(() => Math.ceil(totalStudents.value / perPage.value));
    const paginatedStudents = computed(() => {
      const start = (currentPage.value - 1) * perPage.value;
      const end = start + perPage.value;
      return students.value.slice(start, end);
    });
    
    const start = computed(() => (currentPage.value - 1) * perPage.value + 1);
    const end = computed(() => Math.min(currentPage.value * perPage.value, totalStudents.value));

    const signOut = async () => {
      try {
        await supabase.auth.signOut();
        window.location.href = '/login';
      } catch (error) {
        console.error('Error signing out:', error.message);
      }
    };

    const toggleDropdown = (menu) => {
      dropdown.value[menu] = !dropdown.value[menu];
    };

    const prevPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--;
      }
    };

    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value++;
      }
    };

    const getStudents = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, name, level, dob, department, phone, address')
        .eq('role', 'student');

      if (error) {
        console.error('Error fetching students:', error);
      } else {
        students.value = data || [];
      }
    };

    return {
      teacherName,
      teacherRole,
      dropdown,
      students,
      currentPage,
      perPage,
      totalStudents,
      totalPages,
      paginatedStudents,
      start,
      end,
      toggleDropdown,
      signOut,
      prevPage,
      nextPage,
      getStudents,
    };
  },
};
</script>

<style scoped>
.container {
    max-width: 1200px;
  }
</style>