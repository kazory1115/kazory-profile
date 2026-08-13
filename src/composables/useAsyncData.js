import { onMounted, ref } from 'vue';

export const useAsyncData = (loader, initialValue = null) => {
  const data = ref(initialValue);
  const error = ref(null);
  const isLoading = ref(true);

  const execute = async () => {
    isLoading.value = true;
    error.value = null;

    try {
      data.value = await loader();
    } catch (cause) {
      error.value = cause instanceof Error ? cause : new Error(String(cause));
    } finally {
      isLoading.value = false;
    }
  };

  onMounted(execute);

  return { data, error, isLoading, reload: execute };
};
