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
          <p class="text-gray-700 font-medium">{{ teacherName }}</p>
          <p class="text-blue-600 text-sm">{{ teacherRole }}</p>
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
      <div class="min-h-screen flex-1 p-6">
        <div class="bg-white p-6 rounded-lg shadow-lg">
          <div class="flex items-center justify-between">
            <h2 class="text-2xl font-bold">Profile</h2>
            <nav class="text-sm text-gray-600">
              <span>Dashboard</span> / <span class="font-semibold">Profile</span>
            </nav>
          </div>

          <div class="mt-6 flex items-center">   
            <div class="ml-4">
              <h3 class="text-xl font-bold">{{ teacherName }}</h3>
              <p class="text-sm text-gray-500">{{ teacherDepartment }} Professor</p>
              <p class="text-sm text-gray-500">SKLOA</p>
            </div>
          </div>

          <div class="mt-8">
            <div class="flex border-b border-gray-200">
              <button @click="selectedTab = 'about'" :class="selectedTab === 'about' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'" class="pb-2 px-4 font-semibold">About</button>
              <button @click="selectedTab = 'password'" :class="selectedTab === 'password' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'" class="pb-2 px-4 font-semibold">Password</button>
            </div>

            <div v-if="selectedTab === 'about'" class="mt-6">
              <div>
                <h4 class="text-lg font-semibold">Personal Details</h4>
                <div class="mt-4 space-y-4">
                  <div class="flex justify-between">
                    <span class="text-gray-500">Name</span>
                    <span>{{ teacherName }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-500">Date of Birth</span>
                    <span>{{ teacherDob }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-500">Age</span>
                    <span>{{ teacherAge }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-500">Email ID</span>
                    <span>{{ teacherEmail }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-500">Mobile</span>
                    <span>{{ teacherPhone }}</span>
                  </div>
                
                  <div class="flex justify-between">
                    <span class="text-gray-500">Role</span>
                    <span>{{ teacherDepartment }} Professor</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-500">Gender</span>
                    <span>{{ teacherGender }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-500">Address</span>
                    <span>{{ teacherAddress }}</span>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="selectedTab === 'password'" class="mt-6">
              <div>
                <h4 class="text-lg font-semibold">Change Password</h4>
                <div class="mt-4 space-y-4">
                  <div>
                    <label for="oldPassword" class="block text-gray-700">Old Password</label>
                    <input type="password" id="oldPassword" class="w-full p-2 border rounded mt-1">
                  </div>
                  <div>
                    <label for="newPassword" class="block text-gray-700">New Password</label>
                    <input type="password" id="newPassword" class="w-full p-2 border rounded mt-1">
                  </div>
                  <div>
                    <label for="confirmPassword" class="block text-gray-700">Confirm Password</label>
                    <input type="password" id="confirmPassword" class="w-full p-2 border rounded mt-1">
                  </div>
                </div>
                <button class="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500">Save Changes</button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { supabase } from '@/supabase';
import { ref, onMounted, computed, onBeforeUnmount } from 'vue';
import { store } from '@/store';
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export default {
  setup() {
    const teacherName = computed(() => store.teacherName);
    const teacherRole = computed(() => store.teacherRole);
    const teacherAddress = computed(() => store.teacherAddress);
    const teacherDepartment = computed(() => store.teacherDepartment);
    const teacherDob = computed(() => store.teacherDob);
    const teacherAge = computed(() => store.teacherAge);
    const teacherEmail = computed(() => store.teacherEmail);
    const teacherPhone = computed(() => store.teacherPhone);
    const teacherGender = computed(() => store.teacherGender);
    
    let inactivityTimer = null;
    let warningTimer = null;

    const selectedTab = ref('about');
    const dropdown = ref({
      courses: false,
      students: false,
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

    const updateProfile = () => {
      console.log('Profile updated:', form.value);
    };

    const onImageChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          form.value.profileImage = e.target.result;
        };
        reader.readAsDataURL(file);
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

        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('name, role, address, department, dob, age, email, phone, gender')
          .eq('email', email)
          .single();

        console.log(profileData);

        if (profileData) {
          store.teacherName = profileData.name;
          store.teacherRole = profileData.role;
          store.teacherAddress = profileData.address;
          store.teacherDepartment = profileData.department;
          store.teacherDob = profileData.dob;
          store.teacherAge = profileData.age;
          store.teacherEmail = profileData.email;
          store.teacherPhone = profileData.phone;
          store.teacherGender = profileData.gender;
        } else if (profileError) {
          console.error('Error fetching profile:', profileError.message);
        }
      } catch (error) {
        console.error('An error occurred during onMounted:', error);
      }

      startInactivityTimer();
    });

    onBeforeUnmount(() => {
      clearTimeout(inactivityTimer);
      clearTimeout(warningTimer);
      window.removeEventListener('mousemove', resetInactivityTimer);
      window.removeEventListener('keypress', resetInactivityTimer);
    });

    return {
      teacherName,
      teacherRole,
      teacherAddress,
      teacherDepartment,
      teacherDob,
      teacherAge,
      teacherPhone,
      teacherEmail,
      teacherGender,
      selectedTab,
      dropdown,
      toggleDropdown,
      signOut,
      updateProfile,
      onImageChange,
    };
  },
};
</script>

<style scoped>
.hover-effect {
  transition: background-color 0.3s ease;
}
.hover-effect:hover {
  background-color: #f0f0f5;
}
</style>
