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
              <p class="text-gray-700"> {{teacherName}}</p>
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
            <h2 class="text-2xl font-bold mb-6">Student Progress</h2>
            <div class="flex space-x-4 mb-6">
              <select id="course_id" v-model="selectedCourseId" @change="fetchStudentGrades" class="px-4 py-2 border rounded-md w-full">
                <option value="" disabled selected>Select a course ID...</option>
                <option v-for="course in teacherCourses" :key="course.id" :value="course.courseid">{{ course.courseid }}</option>
              </select>
              <button @click="fetchStudentGrades" class="bg-blue-500 text-white px-4 py-2 rounded-md">Search</button>
            </div>
            <div class="overflow-x-auto">
              <table class="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr>
                    <th class="px-6 py-3 border-b text-left">ID</th>
                    <th class="px-6 py-3 border-b text-left">Student Name</th>
                    <th class="px-6 py-3 border-b text-left">Semester</th>
                    <th class="px-6 py-3 border-b text-left">Course</th>
                    <th class="px-6 py-3 border-b text-left">Course Name</th>
                    <th class="px-6 py-3 border-b text-left">Grade</th>
                    <th class="px-6 py-3 border-b text-left">Score</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="students.length === 0">
                    <td colspan="6" class="px-6 py-4 border-b text-center">No data available</td>
                  </tr>
                  <tr v-for="(student, index) in students" :key="student.id">
                    <td class="px-6 py-4 border-b">{{ index + 1 }}</td>
                    <td class="px-6 py-4 border-b">{{ student.student_name }}</td>
                    <td class="px-6 py-4 border-b">{{ student.semester }}</td>
                    <td class="px-6 py-4 border-b">{{ student.courseid }}</td>
                    <td class="px-6 py-4 border-b">{{ student.course_name }}</td>
                    <td class="px-6 py-4 border-b">{{ student.grade }}</td>
                    <td class="px-6 py-4 border-b">{{ student.score }}%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
    </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted, computed } from 'vue';
  import { supabase } from '@/supabase';
  import { store } from '@/store';
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
  
      const selectedCourseId = ref('');
      const students = ref([]);
      const teacherCourses = ref([]);

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
            .eq('email', user.user.email)
            .single();
  
          if (profileData) {
            store.teacherName = profileData.name;
            store.teacherRole = profileData.role;
  
            const { data: coursesData, error: coursesError } = await supabase
              .from('courses')
              .select('*') 
              .eq('teacher', store.teacherName); 
  
            if (coursesError) {
              console.error('Error fetching courses:', coursesError.message);
            } else {
              teacherCourses.value = coursesData;
            }
          }
        } catch (error) {
          console.error('Error during onMounted:', error.message);
        }
      });
  
      const fetchStudentGrades = async () => {
        console.log("Fetching student grades...");
        console.log("Selected Course ID:", selectedCourseId.value);
  
        if (!selectedCourseId.value) {
          alert("Please select course ID");
          return;
        }
  
        const { data, error } = await supabase
          .from('grade')
          .select('id, student_name, semester, courseid, course_name, grade, score')
          .eq('courseid', selectedCourseId.value);
  
        if (error) {
          console.error('Error fetching grades:', error.message);
        } else {
          console.log("Fetched Grades Data:", data);
          students.value = data;
        }
      };
  
      const signOut = async () => {
        try {
          await supabase.auth.signOut();
          window.location.href = '/login';
        } catch (error) {
          console.error('Error signing out:', error.message);
        }
      };
  
      return {
        dropdown,
        teacherName,
        teacherRole,
        selectedCourseId,
        students,
        teacherCourses,
        signOut,
        fetchStudentGrades,
      };
    },
    
    methods: {
      toggleDropdown(menu) {
        this.dropdown[menu] = !this.dropdown[menu];
      }
    }
  };
  </script>
  
  <style>
  .container {
    max-width: 1200px;
  }
  </style>
  