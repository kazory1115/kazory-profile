<template>
  <div class="p-8">
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-12">
      <!-- Left Column - Profile Sidebar -->
      <ProfileSidebar />

      <!-- Right Column - Content Sections -->
      <div class="lg:col-span-3 space-y-12">
        <PrinciplesSection />
        <SkillsSection />
        <ExperienceSection />
        <EducationSection />
      </div>
    </div>
  </div>
</template>

<script setup>
import ProfileSidebar from '../components/ProfileSidebar.vue';
import PrinciplesSection from '../components/PrinciplesSection.vue';
import SkillsSection from '../components/SkillsSection.vue';
import ExperienceSection from '../components/ExperienceSection.vue';
import EducationSection from '../components/EducationSection.vue';
</script>
