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

        <div class="flex-1  mx-auto p-8 bg-white shadow-md rounded-lg">
          <h2 class="text-2xl font-bold mb-4">Update Student Grade</h2>
          <form @submit.prevent="submitForm">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div class="flex flex-col">
                <label for="student_name" class="mb-2 font-semibold">Student Name *</label>
                <input id="studen_name" v-model="form.student_name" type="text" class="p-2 border rounded" required>
              </div>
              <div class="flex flex-col">
                <label for="course" class="mb-2 font-semibold">Course ID *</label>
                <input id="course" v-model="form.courseid" type="text" class="p-2 border rounded" required>
              </div>
              <div class="flex flex-col">
                <label for="grade" class="mb-2 font-semibold">Grade *</label>
                <input id="grade" v-model="form.grade" type="text" class="p-2 border rounded" required>
              </div>
              <div class="flex flex-col">
                <label for="score" class="mb-2 font-semibold">Score *</label>
                <input id="score" v-model="form.score" type="number" class="p-2 border rounded" required>
              </div>
            </div>
            <button type="submit" class="mt-6 px-4 py-2 bg-blue-600 text-white font-semibold rounded">Submit</button>
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
          students: false
        },
        form: {
          student_name: '',
          courseid: '',
          grade: '',
          score: '',
        }
      };
    },
    methods: {
      toggleDropdown(menu) {
        this.dropdown[menu] = !this.dropdown[menu];
      },
      async submitForm() {
        try {
    
          const { data: gradeData, error: gradeError } = await supabase
            .from('grade')
            .select('id')
            .eq('student_name', this.form.student_name);
  
          if (gradeError) {
            console.error(gradeError);
            toast.error('Error updating grade!');
            return;
          }
  
          if (gradeData.length === 0) {
            console.log('Grade not found!');
            toast.error('Grade not found!');
            return;
          }
  
        
          const { data, error } = await supabase
            .from('grade')
            .update({
              student_name: this.form.student_name,
              courseid: this.form.courseid,
              grade: this.form.grade,
              score: this.form.score,
            })
            .eq('id', gradeData[0].id);
  
          if (error) {
            console.error(updateError);
            toast.error('Error updating grade!');
          } else {
            console.log('Grade updated successfully!');
            toast.success('Teacher profile updated successfully!');
            this.form.student_name = '';
            this.form.courseid = '';
            this.form.grade = '';
            this.form.score = '';
          }
        } catch (error) {
          console.error(error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  
  </style>
  