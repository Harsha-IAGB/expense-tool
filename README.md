# Expense Tool

A full-stack web application for managing expenses - built using Angular for the frontend and Django Rest Framework for the backend.

---

## Technologies Used

- **Frontend**: Angular
- **Backend**: Django Rest Framework (DRF)
- **Database**: SQLite (default, can be swapped for Postgres/MySQL)

---

## Project Structure

```
backend/
├── api/                    # Django app for API endpoints
├── expense_tool/           # Django project settings
├── static/angular/         # Angular static assets (js, css, assets, etc.)
├── templates/angular/      # Angular index.html
├── manage.py
```

```
frontend/
├── src/
├── angular.json
├── package.json
└── ...
```

---

## Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/Harsha-IAGB/expense-tool.git
```

### 2. Application Setup

Once inside the `expense-tool/` folder, install the dependencies using 
```bash
pip install -r requirements.txt
```

After installing the dependencies, navigate to `backend/` and create the database schema using

```bash
python manage.py migrate
```


### 3. Access the App

1. Once inside the `backend/` folder, run Django using
```bash
python manage.py runserver
```

2. Open your browser to [http://127.0.0.1:8000](http://127.0.0.1:8000)

---

## Notes

- Ideally, the frontend should be built using `ng build` and then placed in the right directory but for the purpose of demonstration, the built static files have been committed to the main repository.
- This setup is for development only. For production, the static files should be served using a CDN or a caching server like nginx and should be integrated with our backend using tools like gunicorn.

---

## Author

Sri Harsha Chayanulu Varahabhatla