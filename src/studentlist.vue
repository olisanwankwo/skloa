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
          <img class="h-8 w-8 rounded-full" src="" alt="User">
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
      students: [],
      currentPage: 1,
      perPage: 10
    };
  },
  mounted() {
    this.getStudents();
  },
  computed: {
    totalStudents() {
      return this.students.length; 
    },
    totalPages() {
      return Math.ceil(this.totalStudents / this.perPage);
    },
    paginatedStudents() {
      const start = (this.currentPage - 1) * this.perPage;
      const end = start + this.perPage;
      return this.students.slice(start, end);
    },
    start() {
      return (this.currentPage - 1) * this.perPage + 1;
    },
    end() {
      return Math.min(this.currentPage * this.perPage, this.totalStudents);
    }
  },
  methods: {
    toggleDropdown(menu) {
      this.dropdown[menu] = !this.dropdown[menu];
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    async getStudents() {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, name, level, dob, department, phone, address')
        .eq('role', 'student');

      if (error) {
        console.error(error);
      } else {
        this.students = data || []; 
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