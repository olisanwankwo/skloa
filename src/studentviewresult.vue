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
        <aside class="bg-white max-h-full min-h-screen w-64 p-6 shadow-md">
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
  
        <div class="container mx-auto py-8">
          <div class="flex justify-between items-center mb-6">
            <h1 class="text-3xl font-semibold">Results</h1>
            <span class="text-gray-600">Results / All Results</span>
          </div>
  
          <div class="flex space-x-4 mb-6">
            <input type="text" placeholder="Search by ID ..." class="px-4 py-2 border rounded-md w-full">
            <input type="text" placeholder="Search by Name ..." class="px-4 py-2 border rounded-md w-full">
            <button class="bg-blue-500 text-white px-4 py-2 rounded-md">Search</button>
          </div>
  
          <div class="bg-white shadow-md rounded-lg overflow-hidden">
            <table id="resultsTable" class="min-w-full leading-normal">
              <thead>
                <tr>
                  <th scope="col" class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    ID
                  </th>
                  <th scope="col" class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    CourseID
                  </th>
                  <th scope="col" class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Course Name
                  </th>
                  <th scope="col" class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Score
                  </th>
                  <th scope="col" class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Grade
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(result, index) in paginatedResults" :key="result.cousreid">
                  <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {{ (currentPage - 1) * pageSize + index + 1 }}
                  </td>
                  <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {{ result.courseid }}
                  </td>
                  <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {{ result.course_name }}
                  </td>
                  <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {{ result.score }}
                  </td>
                  <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {{ result.grade }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <button @click="downloadPDF" class="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md">Save as PDF</button>
          <div class="flex justify-between items-center py-3 bg-white mt-6" style="background-color: #f2f3f5">
            <span class="text-sm text-gray-700">
              Showing {{ start }} to {{ end }} of {{ totalResults }} entries
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
            <span class="text-gray-600">COPYRIGHT © 2024 SKLOA.</span>
          </footer>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { supabase } from '@/supabase';
  import { ref, onMounted, computed } from 'vue';
  import { store } from '@/store';
  import html2pdf from "html2pdf.js";
  import { toast } from "vue3-toastify";
  import "vue3-toastify/dist/index.css";
  
  export default {
    setup() {
      const studentName = computed(() => store.studentName);
      const studentRole = computed(() => store.studentRole);
      const registeredResults = ref([]);
      const currentPage = ref(1);
      const pageSize = ref(10);
      const dropdown = {
        courses: false,
        teacher: false,
        students: false,
      };
  
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
  
          if (user) {
            const { data, error } = await supabase
              .from('profiles')
              .select('name, role')
              .eq('email', user.user.email)
              .single();
  
            if (data) {
              store.studentName = data.name;
              store.studentRole = data.role;
  
              const { data: resultData, error: resultError } = await supabase
                .from('grade')
                .select('*')
                .eq('student_name', data.name);
  
              if (resultData) {
                registeredResults.value = resultData;
              } else if (resultError) {
                console.error('Error fetching registered courses:', resultError.message);
              }
            } else if (error) {
              console.error('Error fetching profile:', error.message);
            }
          }
        } catch (error) {
          console.error('An error occurred during onMounted:', error);
        }
      });
  
      const totalResults = computed(() => registeredResults.value.length);
      const totalPages = computed(() => Math.ceil(totalResults.value / pageSize.value));
      const start = computed(() => (currentPage.value - 1) * pageSize.value + 1);
      const end = computed(() => Math.min(start.value + pageSize.value - 1, totalResults.value));
      const paginatedResults = computed(() => registeredResults.value.slice(start.value - 1, end.value));
  
      const downloadPDF = () => {
        const element = document.getElementById('resultsTable');
        const options = {
          margin: 1,
          filename: 'results.pdf',
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
        };
        html2pdf().from(element).set(options).save();
      };
  
      const signOut = async () => {
        try {
          await supabase.auth.signOut();
          window.location.href = '/login';
        } catch (error) {
          console.error('Error signing out:', error.message);
        }
      };
  
      const toggleDropdown = (section) => {
        dropdown[section] = !dropdown[section];
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
  
      return {
        studentName,
        studentRole,
        registeredResults,
        currentPage,
        pageSize,
        toggleDropdown,
        dropdown,
        totalResults,
        totalPages,
        start,
        end,
        signOut,
        paginatedResults,
        downloadPDF,
        prevPage,
        nextPage,
      };
    },
  };
  </script>
  
  <style scoped>
  .container{
    max-width: 1200px;
}
  </style>
  