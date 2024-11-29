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
          <div class="relative">
            <img class="h-8 w-8 rounded-full" src="" alt="User">
            <span class="absolute right-0 bottom-0 bg-green-500 h-3 w-3 rounded-full border-2 border-white"></span>
          </div>
          <div class="text-right">
            <p class="text-gray-700 font-medium">{{studentName}}</p>
            <p class="text-blue-600 text-sm">{{studentRole}}</p>
          </div>
        </div>
      </nav>
  
      <div class="flex">
        <aside class="bg-white max-h-full min-h-screen w-64 p-4 shadow-md">
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
        <main class="flex-1 p-8">
          <h2 class="text-2xl font-bold mb-4">Course Registration</h2>

          <div class="flex flex-col sm:flex-row gap-6 mb-6">
            <div class="flex flex-col">
              <label for="department" class="mb-2 font-semibold">Select Department</label>
              <select id="department" v-model="selectedDepartment" class="p-2 border rounded" @change="fetchCourses">
                <option value="" disabled>Select Department</option>
                <option v-for="department in departments" :key="department" :value="department">
                  {{ department }}
                </option>
              </select>
            </div>

            <div class="flex flex-col">
              <label for="level" class="mb-2 font-semibold">Select Level</label>
              <select id="level" v-model="selectedLevel" class="p-2 border rounded" @change="fetchCourses">
                <option value="" disabled>Select Level</option>
                <option v-for="level in levels" :key="level" :value="level">
                  {{ level }}
                </option>
              </select>
            </div>
          </div>

          <div class="bg-white shadow-md rounded-lg p-6">
            <h3 class="text-xl font-semibold mb-4">Available Courses</h3>
            <div v-if="availableCourses.length > 0">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Select</th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course ID</th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course Name</th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teacher</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="course in availableCourses" :key="course.id" class="hover:bg-gray-100">
                    <td class="px-6 py-4 whitespace-nowrap">
                      <input type="checkbox" :value="course.id" @change="toggleCourseSelection(course.id)" />
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">{{ course.courseid }}</td>
                    <td class="px-6 py-4 whitespace-nowrap">{{ course.name }}</td>
                    <td class="px-6 py-4 whitespace-nowrap">{{ course.teacher }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div v-else>
              <p>No courses available for the selected department and level.</p>
            </div>
          </div>

         <div class="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
      <div class="flex flex-col">
        <label for="semester" class="mb-2 font-semibold">Select Semester</label>
        <select id="semester" v-model="selectedSemester" class="p-2 border rounded" required>
          <option value="" disabled>Select Semester</option>
          <option value="First Semester">First Semester</option>
          <option value="Second Semester">Second Semester</option>
        </select>
      </div>

      <div class="flex flex-col">
        <label for="session" class="mb-2 font-semibold">Select Session</label>
        <select id="session" v-model="selectedSession" class="p-2 border rounded" required>
          <option value="" disabled>Select Session</option>
          <option value="2024/2025">2024/2025</option>
        </select>
      </div>
    </div>

    <div class="mt-8">
      <button
        @click="registerCourses"
        :disabled="selectedCourses.length === 0 || !selectedSemester || !selectedSession"
        class="px-6 py-3 bg-blue-600 text-white font-semibold rounded shadow hover:bg-blue-700 disabled:opacity-50"
      >
        Register Selected Courses
      </button>
    </div>
  </main>
        </div>
        </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { supabase } from '@/supabase';
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const departments = ref([]);
const levels = ref(['100', '200', '300', '400', '500']);
const availableCourses = ref([]);
const selectedCourses = ref([]);
const studentName = ref('');
const studentRole = ref('');
const selectedDepartment = ref('');
const selectedLevel = ref('');
const selectedSemester = ref('');
const selectedSession = ref('');
const dropdown = ref({});

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
    const { data: courses, error: coursesError } = await supabase
      .from('courses')
      .select('department');

    if (courses) {
      departments.value = [...new Set(courses.map(course => course.department))];
    } else if (coursesError) {
      console.error('Error fetching departments:', coursesError.message);
      toast.error(`Error fetching departments: ${coursesError.message}`);
    }

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

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('name, role, department, level')
      .eq('email', email)
      .single();

    if (profile) {
      studentName.value = profile.name;
      studentRole.value = profile.role;
      selectedDepartment.value = profile.department;
      selectedLevel.value = profile.level;
    } else if (profileError) {
      console.error('Error fetching profile:', profileError.message);
      toast.error(`Error fetching profile: ${profileError.message}`);
    }
  } catch (error) {
    console.error('Unexpected error:', error);
    toast.error(`Unexpected error: ${error.message}`);
  }
});

const fetchCourses = async () => {
  if (!selectedDepartment.value || !selectedLevel.value) return;

  try {
    const { data: courses, error } = await supabase
      .from('courses')
      .select('id, courseid, name, teacher, department, level')
      .eq('department', selectedDepartment.value)
      .eq('level', selectedLevel.value);

    if (courses) {
      availableCourses.value = courses;
    } else {
      availableCourses.value = [];
    }

    if (error) {
      console.error('Error fetching courses:', error.message);
      toast.error(`Error fetching courses: ${error.message}`);
    }
  } catch (error) {
    console.error('Unexpected error fetching courses:', error);
    toast.error(`Unexpected error fetching courses: ${error.message}`);
  }
};

const toggleCourseSelection = (courseId) => {
  if (selectedCourses.value.includes(courseId)) {
    selectedCourses.value = selectedCourses.value.filter((id) => id !== courseId);
  } else {
    selectedCourses.value.push(courseId);
  }
};

const registerCourses = async () => {
  const coursesToRegister = selectedCourses.value.map((courseId) => {
    const course = availableCourses.value.find((c) => c.id === courseId);

    if (!course) {
      console.error(`Course not found with id ${courseId}`);
      toast.error(`Course not found with id ${courseId}`);
      return null;
    }

    return {
      student_name: studentName.value,
      courseid: course.courseid,
      course_name: course.name,
      semester: selectedSemester.value,
      session: selectedSession.value,
    };
  }).filter(Boolean);

  if (coursesToRegister.length === 0) {
    console.error('No courses to register');
    toast.error('No courses to register');
    return;
  }

  try {
    const { data, error } = await supabase
      .from('studentcourse')
      .insert(coursesToRegister);

    if (error) {
      console.error('Error registering courses:', error.message);
      toast.error(`Error registering courses: ${error.message}`);
    } else {
      toast.success('Courses registered successfully!');
    }
  } catch (error) {
    console.error('Unexpected error registering courses:', error);
    toast.error(`Unexpected error registering courses: ${error.message}`);
  }
};

const signOut = async () => {
  try {
    await supabase.auth.signOut();
    window.location.href = '/login';
  } catch (error) {
    console.error('Error signing out:', error.message);
    toast.error(`Error signing out: ${error.message}`);
  }
};

const toggleDropdown = (section) => {
  dropdown.value[section] = !dropdown.value[section];
};
</script>

<style scoped>
.container{ 
    max-width: 120px;
}
</style>