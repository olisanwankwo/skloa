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

        <div style="height: 40rem;" class="flex-1  l mx-auto p-8 bg-white shadow-md rounded-lg">
          <h2 class="text-2xl font-bold mb-4">Upload Course</h2>
          <form @submit.prevent="submitForm">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div class="flex flex-col">
                <label for="courseId" class="mb-2 font-semibold">Course Code *</label>
                <input id="courseId" v-model="form.courseid" type="text" class="p-2 border rounded" required>
              </div>
              <div class="flex flex-col">
                <label for="Name" class="mb-2 font-semibold">Course Name *</label>
                <input id="Name" v-model="form.name" type="text" class="p-2 border rounded" required>
              </div>
              <div class="flex flex-col">
                <label for="level" class="mb-2 font-semibold">Level *</label>
                <select id="level" v-model="form.level" class="p-2 border rounded" required>
                  <option value="">Please Select Level</option>
                  <option value="100">100 Level</option>
                  <option value="200">200 Level</option>
                  <option value="300">300 Level</option>
                  <option value="400">400 Level</option>
                  <option value="500">500 Level</option>
                </select>
              </div>
              <div class="flex flex-col">
                <label for="Department" class="mb-2 font-semibold">Department *</label>
                <input id="Department" v-model="form.department" type="text" class="p-2 border rounded" required>
              </div>
              <div class="flex flex-col">
                <label for="teacher" class="mb-2 font-semibold">Instructor *</label>
                <select
                  id="teacher"
                  v-model="form.teacher"
                  class="p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="" disabled selected>Select a teacher...</option>
                  <option v-for="teacher in teachers" :key="teacher.id" :value="teacher.name">
                    {{ teacher.name }}
                  </option>
                </select>
              </div>
              </div>
            <button type="submit" class="mt-6 px-4 py-2 bg-blue-600 text-white font-semibold rounded">Upload</button>
          </form>
        </div>
      </div>
      </div>
  </template>
  
  <script>
  import { supabase } from '@/supabase';
  import { toast } from "vue3-toastify";
  import "vue3-toastify/dist/index.css";
  
  export default {
    data() {
      return {
        dropdown: {
          courses: false,
          teacher: false,
          students: false,
        },
        form: {
          courseid: '',
          name: '',
          department: '',
          teacher: '',
          level: '',
        },
        teachers: [],
      };
    },
    
    async mounted() {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('id, name')
          .eq('role', 'teacher');
  
        if (error) {
          console.error(error);
          toast.error('Error fetching teachers!');
        } else {
          this.teachers = data;
        }
      } catch (error) {
        console.error(error);
        toast.error('An error occurred while fetching teachers!');
      }
    },
    
    methods: {
      toggleDropdown(menu) {
        this.dropdown[menu] = !this.dropdown[menu];
      },
  
      async submitForm() {
        try {
          const { data: teacherData, error: teacherError } = await supabase
            .from('profiles')
            .select('id')
            .eq('name', this.form.teacher)
            .eq('role', 'teacher');
  
          if (teacherError) {
            console.error(teacherError);
            toast.error('Error fetching teacher data!');
            return;
          }
  
          if (teacherData.length === 0) {
            console.log('Teacher not found!');
            toast.error('Teacher not found!');
            return;
          }
  
          const { data, error } = await supabase
            .from('courses')
            .insert([
              {
                courseid: this.form.courseid,
                name: this.form.name,
                level: this.form.level,
                department: this.form.department,
                teacher: this.form.teacher,
              }
            ]);
  
          if (error) {
            console.error(error);
            toast.error('Error uploading course!');
          } else {
            console.log('Course uploaded successfully!');
            toast.success('Course uploaded successfully!');
            this.form.courseid = '';
            this.form.name = '';
            this.form.department = '';
            this.form.level = '';
            this.form.teacher = '';
          }
        } catch (error) {
          console.error(error);
          toast.error('An unexpected error occurred during course upload!');
        }
      },
    },
  };
  </script>
  
  <style scoped>
  body {
    font-family: 'Arial', sans-serif;
  }
  </style>
  