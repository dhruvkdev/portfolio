<script lang="ts">
  let { data, form } = $props();
</script>

<svelte:head>
  <title>Admin login</title>
</svelte:head>

<div class="auth-shell">
  <section class="auth-card">
    <p class="eyebrow">PRIVATE ACCESS</p>
    <h1>Portfolio admin</h1>

    {#if form?.error}
      <p class="error">{form.error}</p>
    {/if}

    {#if data.notConfigured}
      <p class="error">Admin login is not configured. Set ADMIN_PASSWORD on the server to enable it.</p>
    {/if}

    <form method="POST">
      <label>
        <span>Username</span>
        <input name="username" type="text" value="admin" autocomplete="username" required />
      </label>

      <label>
        <span>Password</span>
        <input name="password" type="password" autocomplete="current-password" required />
      </label>

      <button type="submit">Enter admin</button>
    </form>
  </section>
</div>

<style>
  @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400&family=Libre+Baskerville:wght@400;700&display=swap');

  :global(html) {
    background: var(--color-background);
    color: var(--color-primary);
    font-family: 'Libre Baskerville', Georgia, serif;
  }

  :global(body) {
    margin: 0;
    background: var(--color-background);
    color: var(--color-primary);
    min-height: 100vh;
  }

  .auth-shell {
    min-height: 100vh;
    display: grid;
    place-items: center;
    padding: 2rem;
    background: color-mix(in srgb, var(--color-background) 96%, var(--color-rules) 4%);
  }

  .auth-card {
    width: min(100%, 480px);
    padding: 2.25rem;
    border: 1px solid var(--color-rules);
    background: color-mix(in srgb, var(--color-background) 85%, transparent);
    box-shadow: 0 18px 48px rgba(0, 0, 0, 0.08);
  }

  .eyebrow {
    margin: 0 0 1rem;
    color: var(--color-accent);
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.18em;
  }

  h1 {
    margin: 0 0 2rem;
    font-size: clamp(2rem, 4vw, 2.75rem);
    line-height: 1.1;
  }

  form {
    display: grid;
    gap: 1.25rem;
  }

  label {
    display: grid;
    gap: 0.55rem;
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--color-secondary);
  }

  input {
    appearance: none;
    border: 1px solid var(--color-rules);
    background: transparent;
    color: var(--color-primary);
    font: inherit;
    padding: 0.9rem 1rem;
    border-radius: 0;
  }

  input:focus {
    outline: 2px solid color-mix(in srgb, var(--color-accent) 80%, transparent);
    border-color: var(--color-accent);
  }

  button {
    margin-top: 0.75rem;
    border: 1px solid var(--color-accent);
    background: var(--color-accent);
    color: var(--color-background);
    padding: 0.9rem 1.25rem;
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    cursor: pointer;
  }

  .error {
    margin: 0 0 1rem;
    padding: 0.8rem 0.9rem;
    border-left: 2px solid var(--color-accent);
    background: color-mix(in srgb, var(--color-accent) 8%, transparent);
    color: var(--color-primary);
  }
</style>
