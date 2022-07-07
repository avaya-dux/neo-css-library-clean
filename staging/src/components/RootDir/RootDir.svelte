<script lang="ts">
  let dir: "auto" | "ltr" | "rtl" = "auto";
</script>

<main {dir}>
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

  <slot />
</main>

<style>
  fieldset {
    margin-bottom: 2rem;
  }
</style>
