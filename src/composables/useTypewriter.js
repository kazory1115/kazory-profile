import { ref, onMounted, onUnmounted } from 'vue';

export function useTypewriter(text, speed = 150) {
  const typedText = ref('');
  let index = 0;
  let intervalId = null;

  const type = () => {
    if (index < text.length) {
      typedText.value += text.charAt(index);
      index++;
    } else {
      clearInterval(intervalId);
    }
  };

  onMounted(() => {
    intervalId = setInterval(type, speed);
  });

  onUnmounted(() => {
    clearInterval(intervalId);
  });

  return { typedText };
}
