<template>
  <div class="page-shell">

    <AsyncState v-if="isLoading" />
    <AsyncState v-else-if="error" is-error :message="error.message" @retry="reload" />

    <template v-else-if="site">

    <!-- Hero Split -->
    <section class="about-hero">
      <div class="section-heading">
        <p class="eyebrow">關於我</p>
        <h1>專注後端工程、<br>系統重構與可維護架構。</h1>
        <p class="page-lead">{{ profile.intro }}</p>
      </div>

      <aside class="about-aside">
        <p class="eyebrow">個人摘要</p>
        <div class="summary-list">
          <div class="summary-list__item">
            <span>職務</span>
            <strong>{{ profile.title }} / {{ profile.location }}</strong>
          </div>
          <div v-if="currentExperience" class="summary-list__item">
            <span>目前任職</span>
            <strong>{{ currentExperience.organization }}・{{ currentExperience.role }}</strong>
          </div>
          <div class="summary-list__item">
            <span>主要技術</span>
            <strong>PHP, CodeIgniter, Laravel, MySQL, Vue / Nuxt</strong>
          </div>
          <div class="summary-list__item">
            <span>關注領域</span>
            <strong>系統重構, 領域模型, 資料流程, 產品化</strong>
          </div>
          <div class="summary-list__item">
            <span>聯絡信箱</span>
            <strong>
              <a :href="`mailto:${profile.email}`" class="about-email">{{ profile.email }}</a>
            </strong>
          </div>
        </div>
      </aside>
    </section>

    <!-- Bio + Principles -->
    <section class="section-block split-grid">
      <article class="prose-block">
        <p class="eyebrow">簡介</p>
        <p v-for="paragraph in profile.summary" :key="paragraph" class="body-copy">
          {{ paragraph }}
        </p>
      </article>

      <aside class="prose-block">
        <p class="eyebrow">工程原則</p>
        <ul class="plain-list">
          <li v-for="item in engineeringPrinciples" :key="item">{{ item }}</li>
        </ul>
      </aside>
    </section>

    <section
      v-if="workExperience.length"
      id="experience"
      class="section-block resume-section"
      aria-labelledby="experience-heading"
    >
      <div class="section-heading">
        <p class="eyebrow">Work Experience</p>
        <h2 id="experience-heading">工作經歷</h2>
        <p class="page-lead">從既有平台維護到架構升級，聚焦可以被交接、持續擴充的工程實作。</p>
      </div>

      <ol class="experience-list">
        <li
          v-for="(experience, index) in workExperience"
          :key="`${experience.organization}-${experience.role}-${experience.startDate}`"
          class="experience-item"
        >
          <div class="experience-item__rail">
            <span class="experience-item__index" aria-hidden="true">{{ formatIndex(index) }}</span>
            <p class="experience-item__period">
              <time :datetime="experience.startDate">{{ formatYearMonth(experience.startDate) }}</time>
              <span aria-hidden="true">—</span>
              <time v-if="experience.endDate" :datetime="experience.endDate">
                {{ formatYearMonth(experience.endDate) }}
              </time>
              <span v-else>至今</span>
            </p>
          </div>

          <article class="experience-item__body">
            <header class="experience-item__header">
              <div>
                <h3>{{ experience.role }}</h3>
                <p>{{ experience.organization }}</p>
              </div>
              <span v-if="!experience.endDate" class="experience-item__current">Current</span>
            </header>

            <p class="experience-item__summary">{{ experience.summary }}</p>
            <ul class="experience-highlights">
              <li v-for="highlight in experience.highlights" :key="highlight">{{ highlight }}</li>
            </ul>
            <div class="tag-list experience-technologies" aria-label="使用技術">
              <span v-for="technology in experience.technologies" :key="technology">
                {{ technology }}
              </span>
            </div>
          </article>
        </li>
      </ol>
    </section>

    <section
      v-if="education.length || certifications.length"
      class="section-block credentials-grid"
      aria-label="學歷與專業認證"
    >
      <section v-if="education.length" class="credential-section" aria-labelledby="education-heading">
        <header class="credential-section__heading">
          <p class="eyebrow">Education</p>
          <h2 id="education-heading">學歷</h2>
        </header>
        <div class="credential-list">
          <article
            v-for="item in education"
            :key="`${item.institution}-${item.startDate}`"
            class="credential-item"
          >
            <p class="credential-item__period">
              <time :datetime="item.startDate">{{ formatYearMonth(item.startDate) }}</time>
              <span aria-hidden="true">—</span>
              <time :datetime="item.endDate">{{ formatYearMonth(item.endDate) }}</time>
            </p>
            <h3>{{ item.institution }}</h3>
            <p>{{ item.program }}</p>
          </article>
        </div>
      </section>

      <section
        v-if="certifications.length"
        class="credential-section"
        aria-labelledby="certifications-heading"
      >
        <header class="credential-section__heading">
          <p class="eyebrow">Credentials</p>
          <h2 id="certifications-heading">資格認證</h2>
        </header>
        <ul class="certification-list">
          <li
            v-for="item in certifications"
            :key="`${item.issuer}-${item.name}`"
            class="certification-item"
          >
            <span>{{ item.issuer }}</span>
            <strong>{{ item.name }}</strong>
          </li>
        </ul>
      </section>
    </section>

    <!-- Skills (Refined Horizontal Alignment) -->
    <section class="section-block">
      <div class="section-heading">
        <p class="eyebrow">技術能力</p>
        <h2>技術棧與工具鏈</h2>
      </div>
      <div class="skill-list">
        <div v-for="group in skillGroups" :key="group.title" class="skill-category" :id="`skill-${group.title}`">
          <span class="skill-category__title">{{ group.title }}</span>
          <div class="tag-list">
            <span v-for="item in group.items" :key="item">{{ item }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Engineering context, intentionally separate from the factual CV timeline. -->
    <section v-if="journey.length" class="section-block">
      <div class="section-heading">
        <p class="eyebrow">Engineering Journey</p>
        <h2>工程脈絡</h2>
      </div>
      <div class="journey-list">
        <article v-for="item in journey" :key="`${item.period}-${item.title}`" class="journey-item">
          <span class="journey-item__period">{{ item.period }}</span>
          <div class="journey-item__main">
            <h3 class="journey-item__title">{{ item.title }}</h3>
            <p class="journey-item__desc">{{ item.description }}</p>
          </div>
        </article>
      </div>
    </section>

    <!-- Contact (Clean Inline Layout) -->
    <section class="section-block split-grid">
      <article class="prose-block">
        <p class="eyebrow">聯絡方式</p>
        <h3 class="contact-title">直接交流</h3>
        <p class="body-copy">
          如需交流後端架構、重構策略或大型資料流程處理，歡迎直接來信。
        </p>
        <a :href="`mailto:${profile.email}`" class="contact-link">{{ profile.email }}</a>
      </article>

      <article class="prose-block">
        <p class="eyebrow">線上連結</p>
        <h3 class="contact-title">社群平台</h3>
        <p class="body-copy">
          檢視個人開源專案、實驗性工具或骨架代碼。
        </p>
        <a :href="profile.githubUrl" target="_blank" rel="noreferrer" class="contact-link">
          GitHub
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/></svg>
        </a>
      </article>
    </section>

    </template>

  </div>
</template>

<script setup>
import { computed } from 'vue';
import AsyncState from '../components/common/AsyncState.vue';
import { useSiteContent } from '../composables/useSiteContent.js';

const { site, error, isLoading, reload } = useSiteContent();

const profile = computed(() => site.value?.profile ?? {});
const engineeringPrinciples = computed(() => site.value?.engineeringPrinciples ?? []);
const journey = computed(() => site.value?.journey ?? []);
const skillGroups = computed(() => site.value?.skillGroups ?? []);
const workExperience = computed(() => site.value?.resume.workExperience ?? []);
const education = computed(() => site.value?.resume.education ?? []);
const certifications = computed(() => site.value?.resume.certifications ?? []);
const currentExperience = computed(
  () => workExperience.value.find((item) => item.endDate === null) ?? workExperience.value[0] ?? null,
);

const formatYearMonth = (value) => value.replace('-', '.');
const formatIndex = (index) => String(index + 1).padStart(2, '0');
</script>

<style scoped>
.about-hero {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 3rem;
  align-items: start;
}

.about-email {
  color: var(--accent);
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: border-color 0.15s ease;
}

.about-email:hover {
  border-color: var(--accent);
}

.resume-section {
  gap: 1.25rem;
}

.experience-list {
  display: grid;
  margin: 0;
  padding: 0;
  border-top: 1px solid var(--line);
  list-style: none;
}

.experience-item {
  display: grid;
  grid-template-columns: minmax(9rem, 0.28fr) minmax(0, 1fr);
  gap: clamp(2rem, 6vw, 5rem);
  padding: 2.25rem 0;
  border-bottom: 1px solid var(--line);
}

.experience-item__rail {
  display: grid;
  align-content: start;
  gap: 0.7rem;
}

.experience-item__index,
.experience-item__period,
.experience-item__current,
.credential-item__period,
.certification-item span {
  font-family: 'DM Mono', monospace;
}

.experience-item__index {
  color: var(--accent);
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.12em;
}

.experience-item__period,
.credential-item__period {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  color: var(--text-secondary);
  font-size: 0.76rem;
  line-height: 1.5;
}

.experience-item__body {
  display: grid;
  min-width: 0;
  gap: 1rem;
}

.experience-item__header {
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
  justify-content: space-between;
}

.experience-item__header > div {
  display: grid;
  gap: 0.35rem;
}

.experience-item__header h3 {
  color: var(--text);
  font-size: clamp(1.2rem, 2vw, 1.45rem);
  letter-spacing: -0.025em;
}

.experience-item__header p {
  color: var(--accent-strong);
  font-size: 0.9rem;
  font-weight: 500;
}

.experience-item__current {
  flex: none;
  padding-left: 0.65rem;
  border-left: 2px solid var(--accent);
  color: var(--accent-strong);
  font-size: 0.65rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.experience-item__summary {
  max-width: 760px;
  color: var(--text-secondary);
  font-size: 0.92rem;
  line-height: 1.75;
}

.experience-highlights {
  display: grid;
  gap: 0.65rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.experience-highlights li {
  position: relative;
  padding-left: 1.15rem;
  color: var(--text-secondary);
  font-size: 0.875rem;
  line-height: 1.7;
}

.experience-highlights li::before {
  content: '';
  position: absolute;
  top: 0.78em;
  left: 0;
  width: 0.42rem;
  height: 1px;
  background: var(--accent);
}

.experience-technologies {
  margin-top: 0.2rem;
}

.credentials-grid {
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: clamp(2.5rem, 7vw, 5rem);
  align-items: start;
}

.credential-section,
.credential-section__heading {
  display: grid;
}

.credential-section {
  min-width: 0;
  gap: 1.25rem;
}

.credential-section__heading {
  gap: 0.4rem;
}

.credential-section__heading h2 {
  color: var(--text);
  font-size: clamp(1.2rem, 3vw, 1.5rem);
}

.credential-list,
.certification-list {
  display: grid;
  margin: 0;
  padding: 0;
  border-top: 1px solid var(--line);
  list-style: none;
}

.credential-item {
  display: grid;
  gap: 0.35rem;
  padding: 1.25rem 0;
  border-bottom: 1px solid var(--line);
}

.credential-item h3 {
  color: var(--text);
  font-size: 1rem;
  font-weight: 600;
}

.credential-item > p:last-child {
  color: var(--text-secondary);
  font-size: 0.875rem;
}

.certification-item {
  display: grid;
  grid-template-columns: minmax(5.5rem, auto) minmax(0, 1fr);
  gap: 1.25rem;
  align-items: baseline;
  padding: 1rem 0;
  border-bottom: 1px solid var(--line);
}

.certification-item span {
  color: var(--accent-strong);
  font-size: 0.7rem;
  letter-spacing: 0.06em;
}

.certification-item strong {
  min-width: 0;
  color: var(--text-secondary);
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.6;
  overflow-wrap: anywhere;
}

.prose-block {
  display: grid;
  align-content: start;
  gap: 0.5rem;
}

.body-copy {
  font-size: 0.9rem;
  color: var(--text-secondary);
  line-height: 1.7;
}

.contact-title {
  font-size: 1.15rem;
  font-weight: 500;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}

.about-aside {
  position: sticky;
  top: 6rem;
}

@media (max-width: 900px) {
  .about-hero {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .credentials-grid {
    grid-template-columns: 1fr;
    gap: 3rem;
  }

  .about-aside {
    position: static;
  }
}

@media (max-width: 640px) {
  .experience-item {
    grid-template-columns: 1fr;
    gap: 1.25rem;
    padding: 1.75rem 0;
  }

  .experience-item__rail {
    grid-template-columns: auto minmax(0, 1fr);
    gap: 1rem;
    align-items: center;
  }

  .experience-item__header {
    gap: 1rem;
  }

  .certification-item {
    grid-template-columns: 1fr;
    gap: 0.25rem;
  }
}
</style>
