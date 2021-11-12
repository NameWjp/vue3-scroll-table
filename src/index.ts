import { App } from 'vue';
import ScrollTable from './ScrollTable/index.vue';
import ScrollTableColumn from './ScrollTableColumn/index.vue';

const components = [
  ScrollTable,
  ScrollTableColumn
];

const install = (app: App): void  => {
  components.forEach(component => {
    app.component(component.name, component);
  });
};

export { ScrollTable, ScrollTableColumn };

export default { install };
