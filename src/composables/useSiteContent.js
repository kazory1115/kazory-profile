import { onMounted, ref, shallowRef } from 'vue';
import { siteRepository } from '../repositories/index.js';

const site = shallowRef(null);
const error = ref(null);
const isLoading = ref(true);
let pendingRequest = null;

export const loadSiteContent = async ({ force = false } = {}) => {
  if (site.value && !force) return site.value;
  if (pendingRequest && !force) return pendingRequest;

  isLoading.value = true;
  error.value = null;
  pendingRequest = siteRepository.get();

  try {
    site.value = await pendingRequest;
    return site.value;
  } catch (cause) {
    error.value = cause instanceof Error ? cause : new Error(String(cause));
    throw error.value;
  } finally {
    pendingRequest = null;
    isLoading.value = false;
  }
};

export const useSiteContent = () => {
  onMounted(() => loadSiteContent().catch(() => {}));

  return {
    site,
    error,
    isLoading,
    reload: () => loadSiteContent({ force: true }).catch(() => {}),
  };
};
