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
              <h1 class="text-3xl font-semibold">Courses</h1>
              <span class="text-gray-600">Courses / All Courses</span>
            </div>
            <div class="flex space-x-4 mb-6">
              <input type="text" placeholder="Search by CourseID ..." class="px-4 py-2 border rounded-md w-full">
              <input type="text" placeholder="Search by Name ..." class="px-4 py-2 border rounded-md w-full">
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
                      Course Code
                    </th>
                    <th scope="col" class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Name
                    </th>
                    <th scope="col" class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                     Semester
                    </th>
                    <th scope="col" class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Session
                     </th>
                  </tr>
                </thead>
                <tbody>
                    <tr v-for="(course, index) in paginatedCourses" :key="course.id">
                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">{{ index + 1 }}</td>
                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">{{ course.courseid }}</td>
                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">{{ course.course_name }}</td>
                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">{{ course.semester }}</td>
                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">{{ course.session }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="flex justify-between items-center py-3 bg-white mt-6" style="background-color: #f2f3f5">
              <span class="text-sm text-gray-700">
                Showing {{ start }} to {{ end }} of {{ totalCourses }} entries
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
              <span class="text-gray-600">COPYRIGHT © 2023 DREAMSTECHNOLOGIES.</span>
            </footer>
          </div>
        </div>
      </div>
    </template>


    <script>
    import { supabase } from '@/supabase';
    import { ref, onMounted, computed } from 'vue';
    import { store } from '@/store';
    import { toast } from "vue3-toastify";
    import "vue3-toastify/dist/index.css";
    
    export default {
      setup() {
        const studentName = computed(() => store.studentName);
        const studentRole = computed(() => store.studentRole);
    
        const dropdown = ref({
          courses: false,
          teacher: false,
          students: false,
        });
    
        const registeredCourses = ref([]);
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
              store.studentName = profileData.name;
              store.studentRole = profileData.role;
    
              const { data: coursesData, error: coursesError } = await supabase
                .from('studentcourse')
                .select('*')
                .eq('student_name', profileData.name);
    
              if (coursesData) {
                registeredCourses.value = coursesData;
              } else if (coursesError) {
                console.error('Error fetching registered courses:', coursesError.message);
              }
            } else if (profileError) {
              console.error('Error fetching profile:', profileError.message);
            }
          } catch (error) {
            console.error('Unexpected error:', error);
          }
        });
    
        const totalCourses = computed(() => registeredCourses.value.length);
        const totalPages = computed(() => Math.ceil(totalCourses.value / perPage.value));
        const paginatedCourses = computed(() => {
          const start = (currentPage.value - 1) * perPage.value;
          return registeredCourses.value.slice(start, start + perPage.value);
        });
        const start = computed(() => (currentPage.value - 1) * perPage.value + 1);
        const end = computed(() => Math.min(start.value + perPage.value - 1, totalCourses.value));
    
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
    
        const nextPage = () => {
          if (currentPage.value < totalPages.value) {
            currentPage.value++;
          }
        };
    
        const prevPage = () => {
          if (currentPage.value > 1) {
            currentPage.value--;
          }
        };
    
        return {
          studentName,
          studentRole,
          dropdown,
          registeredCourses,
          currentPage,
          perPage,
          totalCourses,
          totalPages,
          paginatedCourses,
          start,
          end,
          toggleDropdown,
          nextPage,
          prevPage,
          signOut,
        };
      },
    };
    </script>
    
    
    <style scoped>
    .container{
        max-width: 1200px;
    }
    </style>