import { ref, onMounted, onUnmounted } from 'vue';

export function useIntersectionObserver(elementRef, options = {}) {
  const isVisible = ref(false);
  let observer;

  onMounted(() => {
    observer = new IntersectionObserver(
      ([entry]) => {
        isVisible.value = entry.isIntersecting;
      },
      options
    );

    if (elementRef.value) {
      observer.observe(elementRef.value);
    }
  });

  onUnmounted(() => {
    if (observer && elementRef.value) {
      observer.unobserve(elementRef.value);
    }
  });

  return { isVisible };
}
