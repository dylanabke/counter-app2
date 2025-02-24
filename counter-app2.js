/**
 * Copyright 2025 dylanabke
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

/**
 * `counter-app2`
 *
 * @demo index.html
 * @element counter-app2
 */
export class CounterApp2 extends DDDSuper(I18NMixin(LitElement)) {
  static get tag() {
    return "counter-app2";
  }

  constructor() {
    super();
    this.count = 0;
    this.title = "";
    this.t = this.t || {};
    this.t = {
      ...this.t,
      title: "Title",
    };
    this.registerLocalization({
      context: this,
      localesPath:
        new URL("./locales/counter-app2.ar.json", import.meta.url).href + "/../",
      locales: ["ar", "es", "hi", "zh"],
    });
  }

  static get properties() {
    return {
      ...super.properties,
      count: { type: Number, reflect: true },
    };
  }

  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: block;
          color: var(--ddd-theme-primary);
          background-color: var(--ddd-theme-accent);
          font-family: var(--ddd-font-navigation);
        }
        :host([count="18"]) {
          color: var(--ddd-theme-default-athertonViolet);
        }
        :host([count="21"]) {
          color: var(--ddd-theme-default-athertonViolet);
        }
        :host([count="22"]) {
          color: var(--ddd-theme-default-error);
        }
        :host([count="-22"]) {
          color: var(--ddd-theme-default-error);
        }
        .wrapper {
          margin: var(--ddd-spacing-2);
          padding: var(--ddd-spacing-4);
        }
        .counter {
          font-size: var(--counter-app2-label-font-size, var(--ddd-font-size-xxl));
        }
      `,
    ];
  }

  updated(changedProperties) {
    super.updated(changedProperties);
    if (changedProperties.has("count")) {
      if (this.count === 21) {
        this.makeItRain();
      }
    }
  }

  makeItRain() {
    import("@haxtheweb/multiple-choice/lib/confetti-container.js").then(
      (module) => {
        setTimeout(() => {
          this.shadowRoot.querySelector("#confetti").setAttribute("popped", "");
        }, 0);
      }
    );
  }

  render() {
    return html`
      <confetti-container id="confetti" class="wrapper">
        <div class="counter">${this.count}</div>
        <div class="buttons">
          <button @click="${this.decrease}">-1</button>
          <button @click="${this.increase}">+1</button>
        </div>
      </confetti-container>
    `;
  }

  increase() {
    if (this.count < 22){
      this.count++;
    }
  }
  decrease() {
    if (this.count > -22){
      this.count--;
    }

  }
  reset() {
    this.count = 0;
  }

  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url).href;
  }
}

globalThis.customElements.define(CounterApp2.tag, CounterApp2);
