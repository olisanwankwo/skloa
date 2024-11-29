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
            <h2 class="text-2xl font-bold mb-4">Edit Teachers</h2>
            <form @submit.prevent="submitForm">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div class="flex flex-col">
                  <label for="Name" class="mb-2 font-semibold">Name *</label>
                  <input id="Name" v-model="form.name" type="text" class="p-2 border rounded" required>
                </div>
                <div class="flex flex-col">
                  <label for="gender" class="mb-2 font-semibold">Gender *</label>
                  <select id="gender" v-model="form.gender" class="p-2 border rounded" required>
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
                <div class="flex flex-col">
                  <label for="department" class="mb-2 font-semibold">Department</label>
                  <input id="department" v-model="form.department" type="text" class="p-2 border rounded">
                </div>
                <div class="flex flex-col">
                  <label for="dob" class="mb-2 font-semibold">Date Of Birth *</label>
                  <input id="dob" v-model="form.dob" type="date" class="p-2 border rounded" required>
                </div>
                <div class="flex flex-col">
                  <label for="address" class="mb-2 font-semibold">Address</label>
                  <input id="address" v-model="form.address" type="text" class="p-2 border rounded">
                </div>
                <div class="flex flex-col">
                  <label for="email" class="mb-2 font-semibold">E-Mail *</label>
                  <input id="email" v-model="form.email" type="email" class="p-2 border rounded" required>
                </div>
                <div class="flex flex-col">
                    <label for="age" class="mb-2 font-semibold">Age</label>
                    <input id="age" v-model="form.age" type="text" class="p-2 border rounded">
                  </div>
                <div class="flex flex-col">
                  <label for="phone" class="mb-2 font-semibold">Phone</label>
                  <input id="phone" v-model="form.phone" type="text" class="p-2 border rounded">
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
      name: 'Sidebar',
      data() {
        return {
          dropdown: {
            courses: false,
            teacher: false,
            students: false,
          },
          form: {
            name: '',
            gender: '',
            department: '',
            dob: '',
            address: '',
            email: '',
            age: '',
            phone: '',
          }
        };
      },
      
      methods: {
        toggleDropdown(menu) {
          this.dropdown[menu] = !this.dropdown[menu];
        },
    
        async submitForm() {
          try {
            const { data, error } = await supabase
              .from('profiles')
              .select('id, name, role')
              .eq('name', this.form.name);
    
            if (error) {
              console.error(error);
              toast.error('Error fetching teacher profile!');
              return;
            } 
    
            if (data.length > 0 && data[0].role === 'teacher') {
              const userId = data[0].id;
              const { data: updateData, error: updateError } = await supabase
                .from('profiles')
                .update({
                  name: this.form.name,
                  gender: this.form.gender,
                  department: this.form.department,
                  dob: this.form.dob,
                  address: this.form.address,
                  email: this.form.email,
                  age: this.form.age,
                  phone: this.form.phone,
                })
                .eq('id', userId);
    
              if (updateError) {
                console.error(updateError);
                toast.error('Error updating teacher profile!');
              } else {
                console.log('Teacher profile updated successfully!');
                toast.success('Teacher profile updated successfully!');
                this.form.name = '';
                this.form.gender = '';
                this.form.department = '';
                this.form.dob = '';
                this.form.address = '';
                this.form.email = '';
                this.form.age = '';
                this.form.phone = '';
              }
            } else {
              toast.error('Teacher not found or not a teacher!');
            }
          } catch (error) {
            console.error(error);
            toast.error('An unexpected error occurred during the profile update!');
          }
        }
      }
    };
    </script>

<style scoped>

</style>