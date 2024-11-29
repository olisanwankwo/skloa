<template>
    <div style="background-color: #f7f7fa;">
      <nav class="bg-white shadow-md flex items-center justify-between px-4 py-2">
        <div class="flex items-center">
          <img class="h-10" src="/src/components/brand.png" alt="Logo">
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
            <p class="text-gray-700">{{teacherName}}</p>
            <p class="text-blue-600 text-sm">{{teacherRole}}</p>
          </div>
        </div>
      </nav>
      <div class="flex">
        <div class="bg-white max-h-full min-h-screen w-64 p-4 shadow-md">
          <ul class="space-y-4">
            <li>
              <a href="/teacherdashboard" class="flex items-center py-2 px-4 rounded hover-effect">
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
                    <div class="flex justify-between items-center mb-6">
            <h1 class="text-3xl font-semibold">Student Grades</h1>
            <span class="text-gray-600">Student / Grading System</span>
          </div>

          <div class="flex space-x-4 mb-6">
            <div class="w-1/2">
              <label class="block text-gray-600 mb-2">Select Semester:</label>
              <select id="semester" v-model="selectedSemester" class="px-4 py-2 border rounded-md w-full">
                <option value="" disabled selected>Select a semester...</option>
                <option value="First Semester">First Semester</option>
                <option value="Second Semester">Second Semester</option>
              </select>
            </div>
            <div class="w-1/2">
              <label class="block text-gray-600 mb-2">Select Course:</label>
              <select id="course" v-model="selectedCourse" class="px-4 py-2 border rounded-md w-full">
                <option value="" disabled selected>Select a course...</option>
                <option v-for="course in courses" :key="course.courseid" :value="course.courseid">{{ course.courseid }}</option>
              </select>
            </div>            
            <button @click="fetchStudentsByCourse" class="bg-blue-500 text-white px-4 py-2 rounded-md" style="height: 41px; margin-top: 30px;">
              Search
            </button>
          </div>

          <div v-if="studentCourses.length > 0" class="bg-white shadow-md rounded-lg overflow-hidden">
            <table class="min-w-full leading-normal">
              <thead>
                <tr>
                  <th class="px-5 py-3 border-b-2 border-gray-200">ID</th>
                  <th class="px-5 py-3 border-b-2 border-gray-200">Course ID</th>
                  <th class="px-5 py-3 border-b-2 border-gray-200">Course Name</th>
                  <th class="px-5 py-3 border-b-2 border-gray-200">Student Name</th>
                  <th class="px-5 py-3 border-b-2 border-gray-200">Semester</th>
                  <th class="px-5 py-3 border-b-2 border-gray-200">Grade</th>
                  <th class="px-5 py-3 border-b-2 border-gray-200">Score</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(course, index) in paginatedStudents" :key="course.courseid">
                  <td class="px-5 py-3 border-b border-gray-200">{{ start + index }}</td>
                  <td class="px-5 py-3 border-b border-gray-200">{{ course.courseid }}</td>
                  <td class="px-5 py-3 border-b border-gray-200">{{ course.course_name }}</td>
                  <td class="px-5 py-3 border-b border-gray-200">{{ course.student_name }}</td>
                  <td class="px-5 py-3 border-b border-gray-200">{{ course.semester }}</td>
                  <td class="px-5 py-3 border-b border-gray-200">
                    <input type="text" v-model="course.grade" placeholder="Enter grade" class="border rounded px-2 py-1 w-full">
                  </td>
                  <td class="px-5 py-3 border-b border-gray-200">
                    <input type="number" v-model="course.score" placeholder="Score" class="border rounded px-2 py-1 w-full">
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div v-else class="text-red-500 mt-4">No courses found for this student in the selected semester.</div>

          <div class="mt-6">
            <button :disabled="!allGradesEntered" @click="submitAllGrades" class="bg-blue-500 text-white px-4 py-2 rounded-md" :class="{'opacity-50 cursor-not-allowed': !allGradesEntered}">
              Submit All Grades
            </button>
          </div>
        </div>
        <div>
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

    const courses = ref([]);
    const students = ref([]);
    const selectedCourse = ref('');
    const selectedSemester = ref('');
    const studentCourses = ref([]);

    const dropdown = ref({
      courses: false,
      teacher: false,
      students: false,
    });

    const currentPage = ref(1);
    const perPage = ref(10);

    const paginatedStudents = computed(() => {
      const start = (currentPage.value - 1) * perPage.value;
      return studentCourses.value.slice(start, start + perPage.value);
    });

    const totalStudents = computed(() => studentCourses.value.length);
    const totalPages = computed(() => Math.ceil(totalStudents.value / perPage.value));

    const start = computed(() => (currentPage.value - 1) * perPage.value + 1);
    const end = computed(() => Math.min(currentPage.value * perPage.value, totalStudents.value));

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

    const fetchTeacherCourses = async () => {
      const { data: teacherCourses, error } = await supabase
        .from('courses')
        .select('*')
        .eq('teacher', store.teacherName); 

      if (error) {
        console.error('Error fetching courses:', error.message);
        return;
      }

      courses.value = teacherCourses;
    };

    const fetchStudentsByCourse = async () => {
      if (!selectedCourse.value || !selectedSemester.value) {
        alert("Please select both course and semester.");
        return;
      }

      const { data, error } = await supabase
        .from('studentcourse')
        .select('student_name, courseid, course_name, semester')
        .eq('courseid', selectedCourse.value)
        .eq('semester', selectedSemester.value);

      if (error) {
        console.error('Error fetching student courses:', error.message);
        return;
      }

      studentCourses.value = data;
    };

    const allGradesEntered = computed(() => {
      return studentCourses.value.every(course => course.grade && course.score);
    });

    const submitAllGrades = async () => {
      if (!allGradesEntered.value) {
        alert("Please enter grades and scores for all students before submitting.");
        return;
      }

      const totalScore = studentCourses.value.reduce((acc, course) => acc + course.score, 0);
      const numberOfCourses = studentCourses.value.length;
      const averageScore = totalScore / numberOfCourses;
      const cgpa = averageScore / 20;

      const gradeData = studentCourses.value.map(course => ({
        student_name: course.student_name,
        courseid: course.courseid,
        course_name: course.course_name,
        semester: course.semester,
        grade: course.grade,
        score: course.score,
        cgpa: cgpa,
      }));

      const { data, error } = await supabase
        .from('grade')
        .insert(gradeData);

      if (error) {
        console.error('Error submitting grades:', error.message);
        return;
      }

      toast.success('Grades submitted successfully!');
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

        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('name, role')
          .eq('email', user.user.email)
          .single();

        if (profileData) {
          store.teacherName = profileData.name;
          store.teacherRole = profileData.role;
        }
      } catch (error) {
        console.error('Error fetching profile:', error.message);
      }

      await fetchTeacherCourses();
    });

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

    return {
      teacherName,
      teacherRole,
      courses,
      students,
      selectedCourse,
      selectedSemester,
      studentCourses,
      dropdown,
      paginatedStudents,
      currentPage,
      perPage,
      totalStudents,
      totalPages,
      start,
      end,
      fetchStudentsByCourse,
      toggleDropdown,
      nextPage,
      prevPage,
      submitAllGrades,
      allGradesEntered,
      signOut,
    };
  },
};
  </script>  
  
  <style scoped>
  .container {
    max-width: 1200px;
  }
  .hover-effect:hover {
    background-color: #f1f1f1;
  }
  </style>
  