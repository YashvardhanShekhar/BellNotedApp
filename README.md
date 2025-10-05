# BellNoted App

BellNoted is a React Native mobile app designed for **PSIT students** to track attendance efficiently. It notifies you about your daily attendance and immediately alerts you if you have any absences. The app also features a dynamic app icon change for a modern feel.

## Features

- **Daily Attendance Notifications**: Get notified if you have any absences.
- **Dynamic App Icon**: Changes the app icon to keep your home screen fresh. *(Currently a bit buggy when changing dynamically in the background — contributions are welcome!)*
- **Secure Login**: Register using your college ID and password. Passwords are encrypted from the beginning using the `crypto` package.
- **Intuitive UI**: Simple and clean interface for students to easily check their attendance status.

## Tech Stack

- **Frontend**: React Native
- **UI Libraries**: React Native Paper, Vector Icons
- **Notifications**: Local push notifications
- **App Icon Management**: react-native-dynamic-app-icon (or custom implementation)

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/YashvardhanShekhar/BellNotedApp.git
   cd BellNotedApp
    ````

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the app:**

   ```bash
   npx react-native run-android
   npx react-native run-ios  # if using Mac
   ```

4. **APK Download:**
   You can directly install the app on Android from the APK release:
   [Download BellNoted v1.0 APK](https://github.com/YashvardhanShekhar/BellNotedApp/releases/download/v1.0/app-release.apk)

## Folder Structure

```
BellNotedApp/
│
├─ src/
│   ├─ components/       # Reusable components (buttons, inputs)
│   ├─ screens/          # App screens (Home, Profile, Attendance)
│   ├─ services/         # API calls to backend
│   └─ utils/            # Utility functions (crypto, notification helpers)
├─ App.js                # Main App entry
├─ package.json
└─ ...
```

## Security

* Passwords are **never stored in plain text**.
* The `crypto` package is used to **encrypt passwords** before sending to the backend.
* Even the developer does not have access to user passwords.

## Contributing

Contributions are welcome! If you want to fix the dynamic app icon bug or improve notifications, please submit a PR.
