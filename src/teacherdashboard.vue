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
            <p class="text-gray-700">{{ teacherName }}</p>
            <p class="text-blue-600 text-sm">{{ teacherRole }}</p>
          </div>
        </div>
      </nav>
      <div class="flex">
        <div class="bg-white h-107 w-64 p-4 shadow-md">
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
            <div class="flex items-center justify-between mb-6">
              <h1 class="text-3xl font-semibold">Welcome {{teacherName}}!</h1>
              <span class="text-gray-600">Home / {{teacherRole}}</span>
            </div>
        <div class="p-6">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div class="bg-white p-6 rounded-lg shadow">
              <p class="text-xl font-semibold">Course</p>
              <p class="text-2xl font-bold">{{teachercourseCourse}}</p>
            </div>
            <div class="bg-white p-6 rounded-lg shadow">
              <p class="text-xl font-semibold">Total Students</p>
              <p class="text-2xl font-bold">{{studentCount}}</p>
            </div>
            <div class="bg-white p-6 rounded-lg shadow">
              <p class="text-xl font-semibold">Total Lessons</p>
              <p class="text-2xl font-bold">30/50</p>
            </div>
            <div class="bg-white p-6 rounded-lg shadow">
              <p class="text-xl font-semibold">Total Hours</p>
              <p class="text-2xl font-bold">15/20</p>
            </div>
          </div>
          
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div class="bg-white p-6 rounded-lg shadow">
              <h3 class="text-xl font-semibold mb-4">Upcoming Lesson</h3>
              <div class="mb-4">
                <p class="font-semibold">Lessons 30</p>
                <p class="text-gray-600">3.1 Ipsum dolor</p>
                <p class="text-gray-600 flex items-center">
                  <span class="mr-2">
                    <i class='bx bx-time'></i>
                  </span>
                  Sep 5, 2022 | 09:00 - 10:00 am
                </p>
                <button class="mt-2 px-4 py-2 bg-blue-600 text-white rounded">Reschedule</button>
              </div>
            </div>
            <div class="bg-white p-6 rounded-lg shadow">
              <h3 class="text-xl font-semibold mb-4">Semester Progress</h3>
              <div class="relative pt-1">
                <div class="overflow-hidden h-10 text-xs flex rounded bg-purple-200">
                  <div style="width: 91%" class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-500"></div>
                </div>
                <div class="flex justify-between text-xs mt-2">
                  <span>55/60 Lesson Progressed</span>
                  <span>91%</span>
                </div>
              </div>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div class="bg-white p-6 rounded-lg shadow-md">
              <h2 class="text-xl font-semibold mb-4">List of Students</h2>
              <table class="min-w-full bg-white">
                <thead class="bg-gray-100 text-gray-600">
                  <tr>
                    <th class="py-2 px-4">ID</th>
                    <th class="py-2 px-4">Name</th>
                    <th class="py-2 px-4">Department</th>
                    <th class="py-2 px-4">Level</th>
                    <th class="py-2 px-4">DOB</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="student, index in paginatedStudents" :key="student.id">
                    <td class="border-t py-2 px-4"> {{ index + 1 }}</td>
                    <td class="border-t py-2 px-4">{{ student.name }}</td>
                    <td class="border-t py-2 px-4">{{ student.department }}</td>
                    <td class="border-t py-2 px-4">{{ student.level }}</td>
                    <td class="border-t py-2 px-4">{{ student.dob }}</td>
                  </tr>
                 
                </tbody>
              </table>
            </div>
            <div class="bg-white p-6 rounded-lg shadow">
              <h3 class="text-xl font-semibold mb-4">Calendar</h3>
              <VDatePicker v-model="date" mode="dateTime"  expanded :rules="rules" :attributes="attributes" />
            </div>
          </div>
        </div>
        </div>
        </div>
        </div>
  </template>
  
  <script setup>
  import { supabase } from '@/supabase';
  import { ref, onMounted, onBeforeUnmount } from 'vue';
  import { toast } from "vue3-toastify";
  import "vue3-toastify/dist/index.css";
  
  const dropdown = ref({
    courses: false,
    students: false,
  });
  
  const students = ref([]);
  const studentCount = ref(0);
  const paginatedStudents = ref([]);
  const teacherName = ref('');
  const teacherRole = ref('');
  const teachercourseCourse = ref(0);
  let inactivityTimer = null;
  let warningTimer = null;
  
  const fetchProfiles = async () => {
    const { data: profiles, error } = await supabase
      .from('profiles')
      .select("role");
  
    if (error) {
      console.error('Error fetching data:', error);
    } else {
      const count = profiles.filter(profile => profile.role === 'student').length;
      studentCount.value = count;
      console.log('Number of students:', count);
      await getStudents();
    }
  };
  
  const getStudents = async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('id, name, department, level, dob')
      .eq('role', 'student');
  
    if (error) {
      console.error('Error fetching students:', error);
    } else {
      students.value = data;
      paginatedStudents.value = data; 
    }
  };
  
  onMounted(async () => {
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
        teacherName.value = data.name;
        teacherRole.value = data.role;
        const { data: coursesData, error: coursesError } = await supabase
          .from('courses')
          .select('*')
          .eq('teacher', teacherName.value);
  
        if (coursesError) {
          console.error('Error fetching courses:', coursesError);
        } else {
          const count = coursesData.length; 
          teachercourseCourse.value = count;
          console.log('Number of courses:', count);
        }
      } else if (error) {
        console.error('Error fetching profile:', error.message);
      }
    } catch (err) {
      console.error('Unexpected error:', err);
    }
  
    await fetchProfiles();
    startInactivityTimer();
  });
  
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
  
  onBeforeUnmount(() => {
    clearTimeout(inactivityTimer);
    clearTimeout(warningTimer);
    window.removeEventListener('mousemove', resetInactivityTimer);
    window.removeEventListener('keypress', resetInactivityTimer);
  });
  
  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      window.location.href = '/login';
    } catch (error) {
      console.error('Error signing out:', error.message);
    }
  };
  
  const toggleDropdown = (section) => {
    dropdown.value[section] = !dropdown.value[section];
  };
  
  const date = ref(new Date());
  const rules = ref({
    hours: (hour, { weekday }) => {
      if ([1, 7].includes(weekday)) return hour >= 8 && hour < 12;
      return true;
    },
  });
  </script>


  
  <style scoped>
  body {
    font-family: 'Inter', sans-serif;
  }

  .container {
    max-width: 1200px;
  }

  .custom-calendar {
    width: 500px;
  }
  </style>
  