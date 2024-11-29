<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="mx-auto h-10 w-auto" src="/src/components/brand.png" alt="Your Company" />
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Create an account</h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form @submit.prevent="handleSignup" class="space-y-6">
        <div>
          <label for="name" class="block text-sm font-medium leading-6 text-gray-900">Name</label>
          <input type="text" v-model="name" id="name" name="name" required class="block w-full rounded-md p-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
        </div>

        <div>
          <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
          <input id="email" name="email" type="email" autocomplete="email" required class="block w-full rounded-md p-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" v-model="email" />
        </div>

        <div>
          <label for="phone" class="block text-sm font-medium leading-6 text-gray-900">Phone number</label>
          <input id="phone" name="phone" type="tel" autocomplete="tel" required class="block w-full rounded-md p-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" v-model="phone" />
        </div>

        <div>
          <label for="role" class="block text-sm font-medium leading-6 text-gray-900">Role</label>
          <select id="role" v-model="role" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm p-2 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
            <option value="">Select Role</option>
            <option value="teacher">Teacher</option>
            <option value="student">Student</option>
          </select>
        </div>

        <div>
          <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
          <div class="mt-2 relative">
            <input id="password" name="password" type="password" autocomplete="new-password" required class="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" v-model="password" />
            <span @click="togglePasswordVisibility('password')" class="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer text-gray-400 hover:text-gray-600">
              <i class="bx bx-show"></i> 
            </span>
          </div>
        </div>

        <div>
          <label for="password_confirmation" class="block text-sm font-medium leading-6 text-gray-900">Confirm Password</label>
          <div class="mt-2 relative">
            <input id="password_confirmation" name="password_confirmation" type="password" autocomplete="new-password" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset p-2 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" v-model="password_confirmation" />
            <span @click="togglePasswordVisibility('password_confirmation')" class="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer text-gray-400 hover:text-gray-600">
              <i class="bx bx-show"></i> 
            </span>
          </div>
        </div>

        <div>
          <button type="submit" class="bg-blue-600 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Create Account</button>
        </div>
      </form>

      <p class="mt-10 text-center text-sm text-gray-500">
        Already have an account? 
        <router-link to="/login" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Sign in here</router-link>
      </p>
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
      name: '',
      email: '',
      phone: '',
      role: '',
      password: '',
      password_confirmation: ''
    };
  },
  methods: {
    async handleSignup() {
      if (this.password !== this.password_confirmation) {
        alert('Passwords do not match');
        return;
      }

      const { data, error } = await supabase.auth.signUp({
        email: this.email,
        password: this.password
      });

      if (error) {
        alert(error.message);
        return;
      }

      const user = data.user;

      const { error: insertError } = await supabase
        .from('profiles')
        .insert([
          {
            id: user.id,
            name: this.name,
            email: this.email,
            phone: this.phone,
            role: this.role
          }
        ]);

      if (insertError) {
        alert(insertError.message);
        return;
      }

      toast.success('Registration successful');
      setTimeout(() => {
        this.$router.push('/login');
      }, 5000);
    },
    
    togglePasswordVisibility(field) {
      const input = document.getElementById(field);
      if (input.type === 'password') {
        input.type = 'text';
      } else {
        input.type = 'password';
      }
    }
  }
};
</script>

<style scoped>
body {
  font-family: 'Arial', sans-serif;
}
</style>