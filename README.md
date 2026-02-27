# Masterblog API & Frontend Integration

This project is a full-stack blogging platform developed as part of my web development journey. It features a robust **Python Flask API** seamlessly integrated with a dynamic **Asynchronous JavaScript Frontend**.

## Project Overview
The goal of this project was to build a functional Content Management System (CMS) for blog posts. I focused on creating a clear separation between the backend data logic and a responsive, interactive user interface.

### Key Features

#### Flask Backend (Python)
I developed a RESTful API with the following capabilities:
- **Full CRUD Support:** Create, Read, Update, and Delete blog posts.
- **Advanced Search Logic:** A dedicated search endpoint using partial string matching (similar to SQL `LIKE`) for titles and content, including case-insensitivity.
- **Dynamic Sorting:** Optional query parameters to sort results by fields (title, content) and order (ASC/DESC).
- **Validation & Error Handling:** Strict backend validation for required fields, providing detailed JSON error responses to the client.
- **CORS Configuration:** Enabled secure cross-origin communication via `flask-cors`.

#### Modern Frontend (JavaScript)
I implemented a clean and responsive interface using modern JavaScript standards:
- **Async/Await Architecture:** Utilizing asynchronous functions for all API interactions to ensure a smooth, non-blocking user experience.
- **Smart UI Logic:** A "dual-purpose" form that intelligently toggles between `POST` (creating new entries) and `PUT` (updating existing ones) based on the application state.
- **Real-time Feedback:** Integrated server-side error messages into the UI via alerts to guide user input.
- **Custom CSS Design:** A polished layout focusing on visual hierarchy, depth (box-shadows), and a clean mobile-friendly structure.

---

## Technologies Used
- **Backend:** [Python](https://www.python.org), [Flask](https://flask.palletsprojects.com), [Flask-CORS](https://flask-cors.readthedocs.io)
- **Frontend:** Vanilla JavaScript (ES6+), HTML5, CSS3
- **Tools:** Postman (API Testing), VS Code


## How it Works
1. Run the Flask backend (default port `5002`).
2. Open `index.html` in your browser (e.g., via Live Server).
3. The API base URL is automatically stored in `LocalStorage` for an easier development workflow.
4. Posts can be created, searched, sorted, edited, and deleted – all validated in real-time by the backend.


---

### Conclusion
This project allowed me to bridge the gap between server-side data processing and client-side interaction. Building the search and sorting logic in Python while managing the UI state in JavaScript provided deep insights into modern full-stack development patterns.