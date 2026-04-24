import os
import django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'job_portal_backend.settings')
django.setup()

from jobs.models import Job

jobs = [
    {
        "title": "Backend Engineer",
        "company": "Razorpay",
        "location": "Bengaluru, India",
        "job_type": "full-time",
        "salary": "₹18 - 28 LPA",
        "description": "Build scalable payment infrastructure handling millions of transactions daily. Work with microservices, Kafka, and distributed systems.",
        "requirements": "3+ years Python/Go experience\nStrong knowledge of distributed systems\nExperience with SQL and NoSQL databases\nFamiliarity with Kafka or RabbitMQ",
    },
    {
        "title": "ML Engineer",
        "company": "Swiggy",
        "location": "Bengaluru, India",
        "job_type": "full-time",
        "salary": "₹20 - 35 LPA",
        "description": "Build recommendation systems and demand forecasting models to optimize food delivery operations across 500+ cities.",
        "requirements": "Strong ML fundamentals (regression, classification, deep learning)\nProficiency in Python, TensorFlow or PyTorch\nExperience with feature engineering and model deployment\nKnowledge of A/B testing",
    },
    {
        "title": "React Developer",
        "company": "Zerodha",
        "location": "Remote",
        "job_type": "remote",
        "salary": "₹12 - 20 LPA",
        "description": "Build trading interfaces and dashboards used by millions of retail investors. Work on real-time data rendering and performance optimization.",
        "requirements": "2+ years React experience\nStrong JavaScript/TypeScript skills\nExperience with WebSockets or real-time data\nUnderstanding of financial markets is a plus",
    },
    {
        "title": "Data Analyst Intern",
        "company": "PhonePe",
        "location": "Pune, India",
        "job_type": "internship",
        "salary": "₹40,000/month",
        "description": "Analyze transaction data to surface insights for the product and growth teams. Build dashboards and run experiments.",
        "requirements": "Proficiency in Python (pandas, numpy) and SQL\nExperience with visualization tools (Tableau/Metabase)\nStatistics fundamentals\nCurrently pursuing B.Tech/B.E.",
    },
    {
        "title": "DevOps Engineer",
        "company": "CRED",
        "location": "Bengaluru, India",
        "job_type": "full-time",
        "salary": "₹15 - 25 LPA",
        "description": "Own the infrastructure powering CRED's premium credit card management platform. Drive CI/CD, cloud cost optimization, and reliability.",
        "requirements": "Experience with AWS or GCP\nProficiency in Kubernetes and Docker\nCI/CD pipeline management (GitHub Actions, Jenkins)\nInfrastructure-as-code (Terraform)",
    },
    {
        "title": "iOS Developer",
        "company": "Meesho",
        "location": "Bengaluru, India",
        "job_type": "full-time",
        "salary": "₹14 - 22 LPA",
        "description": "Build and optimize the Meesho iOS app used by 150M+ users across Tier 2 & 3 cities. Focus on performance and offline-first experiences.",
        "requirements": "3+ years Swift experience\nExperience with UIKit and SwiftUI\nUnderstanding of iOS memory management\nExperience with crash analytics tools",
    },
]

for j in jobs:
    Job.objects.create(**j)

print(f"Seeded {len(jobs)} jobs!")

