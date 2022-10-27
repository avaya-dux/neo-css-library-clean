<script lang="ts">
  let dir: "auto" | "ltr" | "rtl" = "auto";
  let mode: "light" | "dark" | "dynamic" = "light";
</script>

<main {dir} class="neo-global-colors neo-{mode}">
  <div class="page-options">
    <fieldset>
      <legend>Root Level <code>`dir`</code> attribute</legend>

      <div>
        <input
          id="auto"
          type="radio"
          name="dir-attribute"
          value="auto"
          bind:group={dir}
        />
        <label for="auto"><code>auto</code></label>
      </div>

      <div>
        <input
          id="ltr"
          type="radio"
          name="dir-attribute"
          value="ltr"
          bind:group={dir}
        />
        <label for="ltr"><code>ltr</code></label>
      </div>

      <div>
        <input
          id="rtl"
          type="radio"
          name="dir-attribute"
          value="rtl"
          bind:group={dir}
        />
        <label for="rtl"><code>rtl</code></label>
      </div>
    </fieldset>

    <fieldset>
      <legend>Color Mode:</legend>

      <div>
        <input
          id="light"
          type="radio"
          name="color-mode"
          value="light"
          bind:group={mode}
        />
        <label for="light"><code>light</code></label>
      </div>

      <div>
        <input
          id="dark"
          type="radio"
          name="color-mode"
          value="dark"
          bind:group={mode}
        />
        <label for="dark"><code>dark</code></label>
      </div>

      <div>
        <input
          id="dynamic"
          type="radio"
          name="color-mode"
          value="dynamic"
          bind:group={mode}
        />
        <label for="dynamic"><code>dynamic</code></label>
      </div>
    </fieldset>
  </div>

  <slot />
</main>

<style>
  fieldset {
    margin-bottom: 2rem;
    padding: 1rem;
  }

  div.page-options {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    padding: 1rem;
  }
</style>
