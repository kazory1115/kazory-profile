import { ref, watch } from 'vue';

export const useRepositoryList = (sources, loader, initialValue) => {
  const data = ref(initialValue);
  const error = ref(null);
  const isLoading = ref(true);
  let requestId = 0;

  const execute = async () => {
    const currentRequest = ++requestId;
    isLoading.value = true;
    error.value = null;

    try {
      const result = await loader();
      if (currentRequest === requestId) data.value = result;
    } catch (cause) {
      if (currentRequest === requestId) {
        error.value = cause instanceof Error ? cause : new Error(String(cause));
      }
    } finally {
      if (currentRequest === requestId) isLoading.value = false;
    }
  };

  watch(sources, execute, { immediate: true });

  return { data, error, isLoading, reload: execute };
};
