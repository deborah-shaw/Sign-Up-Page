# 📝 Sign-Up Page

A responsive browser-based **Sign-Up Page** that collects user information, validates input, and dynamically interacts with APIs for city, state, county, username availability, and password suggestions. The page features a **4th of July / American theme** with a patriotic background image.

## 🕹️ Features

- 🧑‍💻 Collects user information:
  - First Name, Last Name
  - Gender selection
  - Zip code input with automatic city, latitude, and longitude lookup
  - State and county selection from API
  - Username availability check
  - Password validation and suggestion
- 🔄 Real-time validation and feedback:
  - Error messages for invalid or missing input
  - Password must be at least 6 characters
  - Password confirmation check
- 🎨 Responsive, modern UI with gradient buttons and Roboto font
- 🇺🇸 4th of July / American-themed background on both pages

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

## ✅ How to Use

1. Fill in personal details in the form.
2. Enter a zip code to see city, latitude, and longitude automatically populated.
3. Select your state to see the list of counties.
4. Choose a username to check availability.
5. Enter a password and confirm it. Generate a suggested password if needed.
6. Click Sign up! to submit. Successful submissions redirect to `welcome.html`

## 🧠 Behind the Scenes

- Uses `fetch()` to request data from public APIs:
    - States and counties
    - City info by zip code
    - Username availability
    - Suggested password
- Event listeners validate inputs in real time
- Form submission is blocked if validation fails

## 📱 Compatibility

- Works on all modern browsers: Chrome, Firefox, Edge, Safari

## 💡 Future Improvements

- Add backend integration to store user data
- Enhance mobile responsiveness
- Improve password requirements (special characters, numbers, etc.)
- Email verification

## 📄 License

This project is licensed under the MIT License.