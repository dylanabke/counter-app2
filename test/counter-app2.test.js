import { html, fixture, expect } from '@open-wc/testing';
import "../counter-app2.js";

describe("CounterApp2 test", () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`
      <counter-app2
        title="title"
      ></counter-app2>
    `);
  });

  it("basic will it blend", async () => {
    expect(element).to.exist;
  });

  it("passes the a11y audit", async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
