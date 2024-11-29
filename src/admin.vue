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
        <div class="relative">
          <img class="h-8 w-8 rounded-full" src="/src/components/olisa.jpg" alt="User">
          <span class="absolute right-0 bottom-0 bg-green-500 h-3 w-3 rounded-full border-2 border-white"></span>
        </div>
        <div class="text-right">
          <p class="text-gray-700">Nwankwo Olisaemeka Donald</p>
          <p class="text-blue-600 text-sm">Administrator</p>
        </div>
      </div>
    </nav>
    <div class="flex">
        <div class="bg-white max-h-full min-h-screen w-64 p-4 shadow-md">
        <ul class="space-y-4">
          <li>
            <a href="/admin" class="flex items-center py-2 px-4 rounded hover-effect" >
              <i class='bx bx-home text-xl'></i>
              <span class="ml-3 text-gray-700">Home</span>
            </a>
          </li>          
          <li>
            <div @click="toggleDropdown('courses')" class="flex items-center justify-between cursor-pointer py-2 px-4 rounded hover:bg-gray-100">
              <div class="flex items-center">
                <i class='bx bx-book text-xl'></i>
                <span class="ml-3 text-gray-700">Courses</span>
              </div>
              <i :class="dropdown.courses ? 'bx bx-chevron-up' : 'bx bx-chevron-down'" class="text-gray-600"></i>
            </div>
            <ul v-if="dropdown.courses" class="ml-8 mt-2 space-y-2">
              <li><a href="/courselist" class="block py-2 px-4 rounded hover:bg-gray-100">List of Courses</a></li>
              <li><a href="/courseupload" class="block py-2 px-4 rounded hover:bg-gray-100">Upload Course</a></li>
              <li><a href="/courseupdate" class="block py-2 px-4 rounded hover:bg-gray-100">Update Course</a></li>
            </ul>
          </li>
          <li>
            <div @click="toggleDropdown('teacher')" class="flex items-center justify-between cursor-pointer py-2 px-4 rounded hover:bg-gray-100">
              <div class="flex items-center">
                <i class='bx bx-chalkboard text-xl'></i>
                <span class="ml-3 text-gray-700">Teacher</span>
              </div>
              <i :class="dropdown.teacher ? 'bx bx-chevron-up' : 'bx bx-chevron-down'" class="text-gray-600"></i>
            </div>
            <ul v-if="dropdown.teacher" class="ml-8 mt-2 space-y-2">
              <li><a href="/teacherlist" class="block py-2 px-4 rounded hover:bg-gray-100">List of Teachers</a></li>
              <li><a href="/teacherupdateprofile" class="block py-2 px-4 rounded hover:bg-gray-100">Update Teacher Profile</a></li>
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
              <li><a href="/studentlist" class="block py-2 px-4 rounded hover:bg-gray-100">List of Students</a></li>
              <li><a href="/studentupdate" class="block py-2 px-4 rounded hover:bg-gray-100">Update Student Profile</a></li>
              <li><a href="/updatestudentresult" class="block py-2 px-4 rounded hover:bg-gray-100">Update Result</a></li>
            </ul>
          </li>
        </ul>
      </div>
      <div class="container mx-auto py-8">
        <div class="flex items-center justify-between mb-6">
          <h1 class="text-3xl font-semibold">Welcome Admin!</h1>
          <span class="text-gray-600">Home / Admin</span>
        </div>
        <div class="grid grid-cols-4 gap-4 mb-6">
          <div class="bg-white p-6 rounded-lg shadow-md flex items-center">
            <div>
              <p class="text-sm text-gray-500">Students</p>
              <p class="text-2xl font-semibold">{{studentCount}}</p>
            </div>
            <i class='bx bxs-graduation text-4xl text-blue-600 ml-auto'></i>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-md flex items-center">
            <div>
              <p class="text-sm text-gray-500">Teachers</p>
              <p class="text-2xl font-semibold">{{teacherCount}}</p>
            </div>
            <i class='bx bx-chalkboard text-4xl text-green-600 ml-auto'></i>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-md flex items-center">
            <div>
              <p class="text-sm text-gray-500">Admins</p>
              <p class="text-2xl font-semibold">1</p>
            </div>
            <i class='bx bx-user text-4xl text-orange-600 ml-auto'></i>
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
          <div class="bg-white p-6 rounded-lg shadow-md">
            <h2 class="text-xl font-semibold mb-4">List of Teachers</h2>
            <table class="min-w-full bg-white">
              <thead class="bg-gray-100 text-gray-600">
                <tr>
                  <th class="py-2 px-4">ID</th>
                  <th class="py-2 px-4">Name</th>
                  <th class="py-2 px-4">Subjects</th>
                  <th class="py-2 px-4">Role</th>
                  <th class="py-2 px-4">DOB</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="teacher, index in paginatedTeachers" :key="teacher.id">
                  <td class="border-t py-2 px-4">{{ index + 1 }}</td>
                  <td class="border-t py-2 px-4">  {{ teacher.name }}</td>
                  <td class="border-t py-2 px-4">  {{ teacher.subject }}</td>
                  <td class="border-t py-2 px-4">  {{ teacher.department }} Professor</td>
                  <td class="border-t py-2 px-4">{{ teacher.dob }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="grid grid-cols-4 gap-4 mt-6">
          <div class="bg-blue-600 text-white p-4 rounded-lg flex items-center justify-between">
            <span>Like us on Facebook</span>
            <span class="text-2xl">50,095</span>
            <i class='bx bxl-facebook text-3xl'></i>
          </div>
          <div class="bg-blue-400 text-white p-4 rounded-lg flex items-center justify-between">
            <span>Follow us on Twitter</span>
            <span class="text-2xl">48,596</span>
            <i class='bx bxl-twitter text-3xl'></i>
          </div>
          <div class="bg-pink-500 text-white p-4 rounded-lg flex items-center justify-between">
            <span>Follow us on Instagram</span>
            <span class="text-2xl">52,085</span>
            <i class='bx bxl-instagram text-3xl'></i>
          </div>
          <div class="bg-blue-700 text-white p-4 rounded-lg flex items-center justify-between">
            <span>Follow us on LinkedIn</span>
            <span class="text-2xl">69,050</span>
            <i class='bx bxl-linkedin text-3xl'></i>
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

export default {
  name: 'Sidebar',
  data() {
    return {
      dropdown: {
        courses: false,
        teacher: false,
        students: false,
      },
      teachers: [],
      students: [],
      studentCount: 0,
      teacherCount: 0,
      paginatedTeachers: [],
      paginatedStudents: [] 
    };
  },
  async mounted() {
    let { data: profiles, error } = await supabase
      .from('profiles')
      .select("role");

    if (error) {
      console.error('Error fetching data:', error);
    } else {
      const studentCount = profiles.filter(profile => profile.role === 'student').length;
      const teacherCount = profiles.filter(profile => profile.role === 'teacher').length;
      this.teacherCount = teacherCount;
      this.studentCount = studentCount;

      console.log('Number of students:', studentCount);
      console.log('Number of teachers:', teacherCount);

      await this.getTeachers();

      await this.getStudents();
    }
  },
  methods: {
    toggleDropdown(menu) {
      this.dropdown[menu] = !this.dropdown[menu];
    },
    async getTeachers() {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, name, subject, department, dob')
        .eq('role', 'teacher');

      if (error) {
        console.error(error);
      } else {
        this.teachers = data;
        this.paginatedTeachers = data; 
      }
    },
    async getStudents() {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, name, department, level, dob')
        .eq('role', 'student');

      if (error) {
        console.error(error);
      } else {
        this.students = data;
        this.paginatedStudents = data; 
      }
    }
  }
};
</script>

    
    <style scoped>
    .container {
      max-width: 1200px;
    }

    </style>
    