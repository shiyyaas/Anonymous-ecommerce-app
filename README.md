# ANONYMOUS — Premium Minimalist Retail App

[![CI Validation](https://github.com/shiyyaas/Anonymous-ecommerce-app/actions/workflows/ci.yml/badge.svg)](https://github.com/shiyyaas/Anonymous-ecommerce-app/actions/workflows/ci.yml)
[![Release Pipeline](https://github.com/shiyyaas/Anonymous-ecommerce-app/actions/workflows/release.yml/badge.svg)](https://github.com/shiyyaas/Anonymous-ecommerce-app/actions/workflows/release.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Contemporary editorial mobile commerce application built with React Native and Expo for the **ANONYMOUS** brand. Engineered with a brutalist yet refined visual hierarchy, strong typographic identity, and fully automated Android releases.

---

## 1. Brand Identity & Visual Design Tokens

The ANONYMOUS design system is centralized in `constants/theme.ts`:

| Token | Hex Value | Application |
|---|---|---|
| **Background** | `#F4F2EC` | Editorial warm bone / muted parchment page canvas |
| **Primary Text** | `#171717` | High contrast editorial black for typography |
| **Secondary Text**| `#77756F` | Balanced warm gray for descriptions, metadata & icons |
| **Accent** | `#C8F169` | Electric lime used sparingly for CTAs and status pills |
| **Card / Surface**| `#FFFFFF` | Crisp architectural white for cards and surface sheets |
| **Borders** | `#DEDCD4` | Subtle hair-thin dividers and framing borders |

### Typography
- **Headings & Wordmarks**: Space Grotesk (`@expo-google-fonts/space-grotesk`) with wide tracking.
- **Body & UI**: Inter (`@expo-google-fonts/inter`) for maximum legibility on high-density displays.
- **Fallbacks**: Clean system sans-serif hierarchy on platforms without custom font rendering.

---

## 2. Core Architecture & Features

This project preserves 100% of the foundational architecture and business logic:
- **Navigation**: Expo Router (file-based routing with tab bar + stack screens)
- **State Management**: React Context API (`CartContext`, `WishlistContext`)
- **Key Flows**:
  - `Home`: Editorial banner carousel, category filtering, flash sale vault, and featured archive.
  - `Explore`: Multi-attribute search, category chips, sort by price/rating, and dynamic empty states.
  - `Product Details`: Multi-angle imagery gallery, size/color variant tags, and quick-add actions.
  - `Wishlist`: Saved pieces archive with direct transfer to cart.
  - `Bag / Cart`: Real-time order calculation, quantity increments, and item removal.
  - `Checkout`: Tiered dispatch selector, multiple payment settlement options, and mock order confirmation.
  - `Profile`: Client tiers, order tracking, address registry, and account controls.

---

## 3. Local Development & Setup

### Prerequisites
- Node.js LTS (v20+ recommended)
- npm or yarn
- Expo Go app or an Android emulator

### Installation
```bash
# Clone the repository
git clone https://github.com/shiyyaas/Anonymous-ecommerce-app.git
cd Anonymous-ecommerce-app

# Switch to the feature branch
git checkout feature/anonymous-redesign

# Install dependencies (respecting Expo SDK peer constraints)
npm install --legacy-peer-deps

# Start Expo development server
npx expo start
```

### Static Analysis & Verification
```bash
# Run TypeScript compilation check
npx tsc --noEmit

# Validate Expo public configuration
npx expo config --type public

# Validate Expo environment and dependencies
npx expo doctor
```

---

## 4. Automated CI/CD Release Pipeline

The repository includes GitHub Actions workflows configured in `.github/workflows/`:

### 4.1 `ci.yml` — Pull Request Validation
Runs automatically on every pull request targeting `main`:
1. Checks out repository and configures Node.js LTS 20 with npm caching.
2. Performs clean dependency installation (`npm ci`).
3. Executes `tsc --noEmit` to guarantee zero TypeScript regressions.
4. Validates Expo configuration schema (`npx expo config --type public`).
5. Fails the PR check if any step fails.

### 4.2 `release.yml` — Push & Merge Automation
Runs automatically whenever code is merged into `main` (ignoring docs-only changes):
1. **Automated SemVer Bump**: Determines `patch`, `minor` (e.g. `feat:`), or `major` (`BREAKING CHANGE`) from Conventional Commits using `scripts/bump-version.js`, updating `app.json` and generating tag `vX.Y.Z`.
2. **Version Code Synchronization**: Assigns `android.versionCode` monotonically using `github.run_number`.
3. **Android Project Generation**: Invokes `npx expo prebuild --platform android --clean` without committing native build files.
4. **Gradle Compilation**:
   - If keystore secrets exist: builds signed release APK (`assembleRelease`).
   - If secrets do not exist: builds debug-signed APK (`assembleDebug`) and marks the release notes with:
     > `unsigned/debug — not for Play Store`
5. **GitHub Release Publication**: Automatically packages and publishes `ANONYMOUS-vX.Y.Z.apk` to GitHub Releases.

---

## 5. Repository Settings & Manual Configuration

To enable automated release signing and protect the production branch, configure the following in GitHub:

### 5.1 Branch Protection Rules
Navigate to **Settings → Branches → Add branch protection rule**:
- **Branch name pattern**: `main`
- Check **Require a pull request before merging**.
- Check **Require status checks to pass before merging** and select `Lint, Type Check & Config Validation`.
- Select **Require linear history** or enforce **Squash merging** with Conventional Commit messages (e.g., `feat: redesign navigation bar`).

### 5.2 Android Release Signing Secrets
Navigate to **Settings → Secrets and variables → Actions** and add:
- `ANDROID_KEYSTORE_BASE64`: Base64 string of your Android `.keystore` / `.jks` file.
- `ANDROID_KEYSTORE_PASSWORD`: Keystore master password.
- `ANDROID_KEY_ALIAS`: Key alias name.
- `ANDROID_KEY_PASSWORD`: Key password.

#### Generating a Local Keystore
```bash
# Generate release keystore
keytool -genkey -v -keystore release.keystore -alias anonymous-key -keyalg RSA -keysize 2048 -validity 10000

# Encode keystore to Base64 (macOS / Linux)
base64 -i release.keystore | tr -d '\n' > keystore_base64.txt
```
Copy the contents of `keystore_base64.txt` into the `ANDROID_KEYSTORE_BASE64` secret.

---

## 6. Original Attribution & Upstream Source

This application was imported from the open-source repository:
- **Upstream Repository**: [NafisRayan/Ecommerce-Mobile](https://github.com/NafisRayan/Ecommerce-Mobile)
- **Original Author**: [Nafis Rayan](https://github.com/NafisRayan)
- **License**: MIT License (Preserved in [LICENSE](LICENSE))
