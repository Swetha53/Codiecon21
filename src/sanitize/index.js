import Vue from 'vue';
import VueSanitize from 'vue-sanitize';

const defaultOptions = {
  allowedTags: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'p', 'ul',
    'ol', 'nl', 'li', 'b', 'i', 'strong', 'em', 'strike', 'code', 'hr', 'br', 'div',
    'table', 'thead', 'caption', 'tbody', 'tr', 'th', 'td', 'pre', 'span', 'body',
    'head', 'header', 'details', 'article', 'section', 'aside', 'nav', 'img'],
  allowedAttributes: {
    a: ['href', 'name', 'target'],
    img: ['src'],
  },
  textFilter(text) {
    return (text.replace(/&amp;/g, '').replace(/&lt;/g, '').replace(/&gt;/g, ''));
  },
};
export default Vue.use(VueSanitize, defaultOptions);
