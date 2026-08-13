<template>
  <div class="content-body">
    <template v-for="(block, index) in blocks" :key="`${block.type}-${index}`">
      <component
        :is="`h${block.level}`"
        v-if="block.type === 'heading'"
      >
        {{ block.text }}
      </component>

      <p v-else-if="block.type === 'paragraph'">{{ block.text }}</p>

      <blockquote v-else-if="block.type === 'quote'">
        <p>{{ block.text }}</p>
      </blockquote>

      <component :is="block.ordered ? 'ol' : 'ul'" v-else-if="block.type === 'list'">
        <li v-for="item in block.items" :key="item">{{ item }}</li>
      </component>

      <pre v-else-if="block.type === 'code'"><code :class="`language-${block.language}`">{{ block.code }}</code></pre>

      <div v-else-if="block.type === 'table'" class="content-table-scroll">
        <table>
          <thead>
            <tr>
              <th v-for="header in block.headers" :key="header">{{ header }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, rowIndex) in block.rows" :key="rowIndex">
              <td v-for="(cell, cellIndex) in row" :key="cellIndex">{{ cell }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
  </div>
</template>

<script setup>
defineProps({
  blocks: {
    type: Array,
    default: () => [],
  },
});
</script>

<style scoped>
.content-body {
  display: grid;
  gap: 0.875rem;
  padding-block: 0.5rem;
  font-size: 1rem;
  line-height: 1.85;
}

.content-body h2 {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--line);
  font-size: clamp(1.2rem, 2vw, 1.5rem);
  color: var(--text);
  letter-spacing: -0.015em;
}

.content-body h3,
.content-body h4 {
  margin-top: 1.25rem;
  font-size: 1.1rem;
  color: var(--text);
}

.content-body p,
.content-body li {
  color: var(--text-secondary);
}

.content-body ul,
.content-body ol {
  display: grid;
  gap: 0.45rem;
  margin: 0;
  padding-left: 1.5rem;
}

.content-body blockquote {
  margin: 0.5rem 0;
  padding: 1rem 1.25rem;
  border-left: 3px solid var(--accent);
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
  background: var(--accent-dim);
}

.content-body blockquote p {
  color: var(--text);
}

.content-body pre {
  overflow-x: auto;
  margin: 0.5rem 0;
  padding: 1.25rem;
  border: 1px solid var(--line);
  border-radius: var(--radius-sm);
  background: var(--bg-elevated);
  font-size: 0.875rem;
  line-height: 1.65;
}

.content-body code {
  color: var(--text);
  white-space: pre;
}

.content-table-scroll {
  overflow-x: auto;
}

.content-body table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
}

.content-body th,
.content-body td {
  padding: 0.75rem;
  border: 1px solid var(--line);
  text-align: left;
  color: var(--text-secondary);
}

.content-body th {
  background: var(--surface-soft);
  color: var(--text);
  font-weight: 600;
}
</style>
