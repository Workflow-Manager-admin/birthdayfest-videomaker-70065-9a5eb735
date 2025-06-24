# Remotion video

<p align="center">
  <a href="https://github.com/remotion-dev/logo">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://github.com/remotion-dev/logo/raw/main/animated-logo-banner-dark.gif">
      <img alt="Animated Remotion Logo" src="https://github.com/remotion-dev/logo/raw/main/animated-logo-banner-light.gif">
    </picture>
  </a>
</p>

Welcome to your Remotion project!

## Commands

**Install Dependencies**

```console
npm i
```

**Start Preview**

```console
npm run dev
```

**Render video**

```console
npx remotion render
```

**Upgrade Remotion**

```console
npx remotion upgrade
```

## Docs

Get started with Remotion by reading the [fundamentals page](https://www.remotion.dev/docs/the-fundamentals).

---

## Troubleshooting Remotion Studio/HMR/lazy-compilation in cloud/devcontainer/remote

If you see errors like "**Problem communicating active modules to the server**", "**HMR/lazy-compilation server communication error**", "**WebSocket disconnect**", "**Invalid Host/Origin header**", or if Remotion Studio's preview does not refresh:

**Key Steps & Systematic Checklist:**

1. **Use the dev script always**:
   ```sh
   npm run dev
   ```
   This script already uses `--host 0.0.0.0`. Always run the app via this script.

2. **Cloud/Remote/Docker setups:**
   - Ensure the browser accesses the app *using the EXACT public URL* (including https if provided).
   - In Codespaces, cloud IDEs, and remotes, the preview URL may be different from `localhost:3000`. HMR fails if the browser origin and the dev server do not match!

3. **Set --public-address for HMR/WebSocket:**
   If the error persists, set the correct external/public address that matches your browser's preview URL:
   ```sh
   remotion studio --hot --host 0.0.0.0 --public-address <URL>
   ```
   Example:
   ```sh
   remotion studio --hot --host 0.0.0.0 --public-address https://vscode-internal-5684-beta.beta01.cloud.kavia.ai:3000
   ```
   Use your actual browser preview URL here.

4. **Proxy/Port/Host settings:**
   - Some cloud IDEs use port proxies. Remotion HMR requires that the WebSocket server's public address exactly matches what your browser sees for both `hostname` and `protocol`.
   - Verify no VPN, proxy extension, or browser firewall blocks WebSockets.

5. **Cache and Browser:**
   - Do a hard refresh, or try in an *incognito* window.
   - If stuck, clear browser site data/cookies for the workspace URL.

6. **Dev server logs:**
   - Watch terminal logs for warnings like "Invalid Host header", "socket error", or "Unable to serve active modules".
   - In rare cases, check for conflicting node processes on port 3000.

7. **Remotion/webpack quirks:**
   - This project uses Remotion >=4.x, which bundles Webpack dev server and handles HMR/WebSocket, but in REMOTE/CLOUD environments, setting `--public-address` is critical.
   - _If you have custom reverse-proxy (nginx, Codespaces previews, etc), proxy all: `/sockjs-*`, `/ws`, `/api/hot` routes to the dev server backend too._

8. **For stubborn errors:** 
   - Review [Remotion's full troubleshooting guide](https://www.remotion.dev/docs/troubleshooting/remote)
   - Ask on [Discord](https://discord.gg/6VzzNDwUwV)

> **Summary**:  
> Always match Remotion's `--public-address` URL to the one shown in your browser, including protocol. Cloud/remote/HMR problems are 99% caused by this mismatch.


See [Remotion's remote troubleshooting guide](https://www.remotion.dev/docs/troubleshooting/remote) for full details.

---

## Help

We provide help on our [Discord server](https://discord.gg/6VzzNDwUwV).

## Issues

Found an issue with Remotion? [File an issue here](https://github.com/remotion-dev/remotion/issues/new).

## License

Note that for some entities a company license is needed. [Read the terms here](https://github.com/remotion-dev/remotion/blob/main/LICENSE.md).
