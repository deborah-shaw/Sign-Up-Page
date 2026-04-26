# 📝 Sign-Up Page

A responsive browser-based **Sign-Up Page** that collects user information, validates input in real time, and dynamically interacts with external APIs for city, state, county, and username availability. The app features a clean UI with a **4th of July / American theme** design and demonstrates modern JavaScript concepts such as async/await, form validation, and API integration.

## 🕹️ Features

- 🧑‍💻 Collects user information:
  - First Name, Last Name
  - Gender selection
  - Zip code input with auto-fills city, latitude, longitude
  - State and county selection via API
  - Username availability check (live API validation)
  - Password validation
- 🔄 Real-time validation and feedback:
  - Required field checks
  - Username availability validation (async API call)
  - Strong password enforcement:
    - Minimum 8 characters
    - At least 1 uppercase letter
    - At least 1 lowercase letter
    - At least 1 number
    - At least 1 special character
    - No whitespace allowed
  - Password match validation
  - Form submission blocked until all conditions pass
- 🎨 UI / UX
  - Responsive layout for mobile and desktop
  - Clean card-style form with shadow and transparency
  - Gradient button with hover effects
  - Google Fonts (Roboto)
  - 🇺🇸 Themed background image

## 🚀 Live Demo

👉 Try it [here](https://deborah-shaw.github.io/Sign-Up-Page/)

## 🗂️ Project Structure

```text
📦 sign-up-page/
 ┣ 📁 css/
 ┃ ┗ 📄 style.css           # 🎨 Styling for layout and form
 ┣ 📁 js/
 ┃ ┗ 📄 script.js           # 🧠 Handles form validation and API interaction
 ┣ 📁 img/
 ┃ ┗ 📄 usa.jpg             # 🖼 Background image
 ┣ 📄 index.html            # 🏠 Main sign-up page
 ┣ 📄 welcome.html          # 🎉 Account created page
 ┗ 📄 README.md             # 📄 Project documentation
```

## 🛠️ Tech Used

- **HTML5** – Page structure
- **CSS3** – Layout, gradient buttons, background image
- **JavaScript** – DOM manipulation, event listeners, API calls
- **Google Fonts** – Roboto
- **APIs** – City info, state/county lists, username check, password suggestions

## ✅ How It Works

1. User fills out the form
2. ZIP code triggers API call → displays location data
3. State selection loads counties dynamically
4. Username is checked via API for availability
5. Password is validated using regex rules
6. On submit:
  - Form submission is prevented
  - All validations (including async username check) run
  - If valid → form submits manually to `welcome.html`

## 🧠 Behind the Scenes

- `async / await` for handling API calls
- Promise-based data handling
- Form validation with both synchronous and asynchronous logic
- Event-driven programming
- Preventing default form submission and controlling flow manually
- Regex-based password validation

## 📱 Compatibility

- Works on all modern browsers: Chrome, Firefox, Edge, Safari, Mobile browsers

## 💡 Future Improvements

- Backend integration (store user accounts)
- Email verification system
- Password strength meter UI
- Accessibility improvements (ARIA labels, screen reader support)

## 📄 License

This project is licensed under the MIT License.
