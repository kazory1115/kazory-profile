import { ref, toValue, watch } from 'vue';

export const useAsyncResource = (source, loader) => {
  const data = ref(null);
  const error = ref(null);
  const isLoading = ref(true);
  let requestId = 0;

  const execute = async () => {
    const currentRequest = ++requestId;
    isLoading.value = true;
    error.value = null;

    try {
      const result = await loader(toValue(source));
      if (currentRequest === requestId) data.value = result;
    } catch (cause) {
      if (currentRequest === requestId) {
        data.value = null;
        error.value = cause instanceof Error ? cause : new Error(String(cause));
      }
    } finally {
      if (currentRequest === requestId) isLoading.value = false;
    }
  };

  watch(source, execute, { immediate: true });

  return { data, error, isLoading, reload: execute };
};
