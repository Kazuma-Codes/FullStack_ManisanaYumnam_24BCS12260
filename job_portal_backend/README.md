# HireGrid — Job Portal (Django Backend)

## Setup

```bash
pip install django djangorestframework django-cors-headers
python manage.py migrate
python seed_data.py     # loads 6 sample jobs
python manage.py runserver
```

## API Endpoints

| Method | URL | Description |
|--------|-----|-------------|
| GET | /api/jobs/ | List all jobs |
| GET | /api/jobs/?search=python | Search jobs |
| GET | /api/jobs/?job_type=remote | Filter by type |
| GET | /api/jobs/<id>/ | Job detail |
| POST | /api/jobs/ | Create a job |
| POST | /api/applications/ | Apply to a job |
| GET | /api/applications/ | All applications |

## Sample POST body for a job

```json
{
  "title": "Backend Engineer",
  "company": "Razorpay",
  "location": "Bengaluru, India",
  "job_type": "full-time",
  "salary": "₹18-28 LPA",
  "description": "...",
  "requirements": "3+ years Python\nDjango experience"
}
```
