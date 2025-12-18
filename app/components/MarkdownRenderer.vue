<script setup>
import MarkdownIt from "markdown-it"
import hljs from "highlight.js"
import "highlight.js/styles/github-dark.css" // Tema bonito en modo oscuro

const props = defineProps({
  content: {
    type: String,
    default: ""
  }
})

// Markdown parser con highlight
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return `<pre class="hljs"><code>${hljs.highlight(str, { language: lang }).value}</code></pre>`
      } catch (__) {}
    }

    return `<pre class="hljs"><code>${md.utils.escapeHtml(str)}</code></pre>`
  }
})


// abrir todos los enlaces en nueva pestaña
md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
  tokens[idx].attrPush(["target", "_blank"]);
  tokens[idx].attrPush(["rel", "noopener noreferrer"]);
  return self.renderToken(tokens, idx, options);
};
const rendered = computed(() =>
  md.render(props.content || "No hay contenido disponible.")
)
</script>

<template>
  <div class="markdown-content" v-html="rendered"></div>
</template>

<style scoped>
.markdown-content {        /* límite visual */
  overflow-y: auto;         /* scroll interno */
  padding: 20px;   
         /* ⭐ padding interno */     /* extra para evitar que el texto choque con el scrollbar */
  box-sizing: border-box;
  line-height: 1.6;
  font-size: 0.95rem;
  background: rgb(13 17 23); /* leve fondo opcional */
  border-radius: 10px;      /* redondeo opcional */
}

/* SCROLLBAR */
.markdown-content::-webkit-scrollbar {
  width: 6px;
}

.markdown-content::-webkit-scrollbar-thumb {
  background: #666;
  border-radius: 4px;
}

.markdown-content::-webkit-scrollbar-track {
  background: transparent;
}

/* TITULOS */
.markdown-content h1 {
  font-size: 1.6rem;
  margin-bottom: 1rem;
  color: #ffffff;
  font-weight: 700;
}

.markdown-content h2 {
  font-size: 1.3rem;
  margin-top: 1.2rem;
  margin-bottom: 0.6rem;
  color: #c3e6ff;
  font-weight: 600;
}

.markdown-content h3 {
  font-size: 1.1rem;
  margin-top: 1rem;
  margin-bottom: 0.4rem;
  color: #89c2ff;
}

/* PARRAFOS */
.markdown-content p {
  color: #cccccc;
  margin-bottom: 0.8rem;
}

/* LISTAS */
.markdown-content ul,
.markdown-content ol {
  margin-left: 20px;
  margin-bottom: 1rem;
  color: #dddddd;
}

/* INLINE CODE */
.markdown-content code {
  background: #1e1e1e;
  padding: 2px 5px;
  border-radius: 4px;
  font-size: 0.9rem;
}

/* BLOQUES DE CODIGO */
.markdown-content pre code {
  display: block;
  padding: 12px;
  border-radius: 8px;
  background: #1e1e1e !important;
  overflow-x: auto;
  white-space: pre;
}

</style>
