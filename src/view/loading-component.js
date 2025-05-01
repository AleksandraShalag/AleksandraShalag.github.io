import { AbstractComponent } from '../framework/view/abstract-component.js';

const createLoadingTemplate = () => `
  <div class="loading-overlay">
    <div class="loading-spinner"></div>
    <p class="loading-text">Загрузка данных...</p>
  </div>
`;

export default class LoadingComponent extends AbstractComponent {
  get template() {
    return createLoadingTemplate();
  }
}