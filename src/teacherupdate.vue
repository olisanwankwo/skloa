<template>
  <div class="bg-gray-100 min-h-screen">
    <nav class="bg-white shadow-md flex items-center justify-between px-6 py-4">
      <div class="flex items-center">
        <img class="h-10" src="/src/components/brand.png" alt="Logo">
        <button class="ml-4 text-2xl text-white bg-blue-600 p-2 rounded-lg">
          <i class='bx bx-menu'></i>
        </button>
      </div>
      <div class="flex-1 mx-4">
        <input type="text" placeholder="Search here" class="w-full max-w-xs p-2 border rounded bg-gray-100 placeholder-gray-500">
      </div>
      <div class="flex items-center space-x-6">
        <i class='bx bx-bell text-gray-500 text-2xl cursor-pointer'></i>
        <i class='bx bx-fullscreen text-gray-500 text-2xl cursor-pointer'></i>
        <div class="text-right">
          <p class="text-gray-700 font-medium">{{ teacherName }}</p>
          <p class="text-blue-600 text-sm">{{ teacherRole }}</p>
        </div>
      </div>
    </nav>

    <div class="flex">
      <aside class="bg-white max-h-full min-h-screen w-64 p-4 shadow-md">
        <ul class="space-y-4">
          <li>
            <a href="/teacherdashboard" class="flex items-center py-3 px-4 rounded hover:bg-blue-50 transition-colors">
              <i class='bx bx-home text-xl'></i>
              <span class="ml-3 text-gray-700">Home</span>
            </a>
          </li>
          <li>
            <div @click="toggleDropdown('profile')" class="flex items-center justify-between cursor-pointer py-3 px-4 rounded hover:bg-blue-50 transition-colors">
              <div class="flex items-center">
                <i class='bx bx-user text-xl'></i>
                <span class="ml-3 text-gray-700">Profile</span>
              </div>
              <i :class="dropdown.profile ? 'bx bx-chevron-up' : 'bx bx-chevron-down'" class="text-gray-600"></i>
            </div>
            <ul v-if="dropdown.profile" class="ml-8 mt-2 space-y-2">
              <li><a href="/teacherprofile" class="block py-2 px-4 rounded hover:bg-blue-50 transition-colors">View Profile</a></li>
              <li><a href="/teacherupdateprofile" class="block py-2 px-4 rounded hover:bg-blue-50 transition-colors">Update Profile</a></li>
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
      </aside>

      <div class="flex-1 mx-auto p-8 bg-white shadow-md rounded-lg">
        <h2 class="text-2xl font-bold mb-4">Edit Teacher Profile</h2>
        <form @submit.prevent="updateProfile">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div class="flex flex-col">
              <label for="name" class="mb-2 font-semibold">Full Name *</label>
              <input id="name" v-model="form.name" type="text" class="p-2 border rounded" required>
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
              <label for="dob" class="mb-2 font-semibold">Date of Birth *</label>
              <input id="dob" v-model="form.dob" type="date" class="p-2 border rounded" required>
            </div>
            <div class="flex flex-col">
              <label for="age" class="mb-2 font-semibold">Age *</label>
              <input id="age" v-model="form.age" type="number" class="p-2 border rounded" required>
            </div>
            <div class="flex flex-col">
              <label for="address" class="mb-2 font-semibold">Address *</label>
              <input id="address" v-model="form.address" type="text" class="p-2 border rounded" required>
            </div>
            <div class="flex flex-col">
              <label for="email" class="mb-2 font-semibold">E-Mail *</label>
              <input id="email" v-model="form.email" type="email" class="p-2 border rounded" required>
            </div>
            <div class="flex flex-col">
              <label for="department" class="mb-2 font-semibold">Department *</label>
              <input id="department" v-model="form.department" type="text" class="p-2 border rounded" required>
            </div>
            <div class="flex flex-col">
              <label for="profileImage" class="mb-2 font-semibold">Phone Number</label>
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
import { ref, onMounted, computed, onBeforeUnmount } from 'vue';
import { store } from '@/store';
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export default {
  setup() {
    const teacherName = computed(() => store.teacherName);
    const teacherRole = computed(() => store.teacherRole);

    const dropdown = ref({
      profile: false,
    });

    const form = ref({
      name: '',
      email: '',
      phone: '',
      address: '',
      age: '',
      gender: '',
      dob: '',
      department: '',
      profileImage: '', 
    });

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
          .eq('email', email)
          .single();

        if (profileData) {
          store.teacherName = profileData.name;
          store.teacherRole = profileData.role;
          form.value.name = profileData.name; 
          form.value.email = email; 
        } else if (profileError) {
          console.error('Error fetching profile:', profileError.message);
        }
      } catch (error) {
        console.error('Error in onMounted:', error.message);
      }
    });

    onBeforeUnmount(() => {
      clearTimeout(inactivityTimer);
      clearTimeout(warningTimer);
      window.removeEventListener('mousemove', resetInactivityTimer);
      window.removeEventListener('keypress', resetInactivityTimer);
    });

    const updateProfile = async () => {
      const profileImageInput = document.getElementById('profileImage');
      const file = profileImageInput?.files[0];

      try {
        if (file) {
          const { data, error } = await supabase.storage
            .from('images')
            .upload(file.name, file);

          if (error) {
            console.error('Error uploading image:', error.message);
            return;
          }

          const imageUrl = `${supabase.storage.url}/images/${data.path}`;
          form.value.profileImage = imageUrl; 
        }

        const { error: profileError } = await supabase
          .from('profiles')
          .update({
            name: form.value.name,
            email: form.value.email,
            phone: form.value.phone,
            address: form.value.address,
            age: form.value.age,
            gender: form.value.gender,
            dob: form.value.dob,
            department: form.value.department,
            profileImage: form.value.profileImage, 
          })
          .eq('email', form.value.email);

        if (profileError) {
          console.error('Error updating profile:', profileError.message);
        } else {
          console.log('Profile updated successfully!');
          toast.success('Profile updated successfully!'); 
        }
      } catch (error) {
        console.error('Error updating profile:', error.message);
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

    const toggleDropdown = (menu) => {
      dropdown.value[menu] = !dropdown.value[menu];
    };

    return {
      teacherName,
      teacherRole,
      dropdown,
      form,
      signOut,
      updateProfile,
      toggleDropdown,
    };
  },
};
</script>

<style scoped>
nav i {
  font-size: 1.75rem;
}
</style>

  