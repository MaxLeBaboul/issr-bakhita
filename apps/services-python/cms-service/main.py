"""
ISSR Sainte Joséphine Bakhita - CMS & Content Microservice (FastAPI)
Rattaché à l'UCAC-ICY - Yaoundé, Mvolyé
"""

from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime
import json
import os

app = FastAPI(
    title="ISSR Sainte Bakhita - CMS Microservice",
    description="Microservice FastAPI pour la gestion collaborative des contenus, articles, formations et événements.",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Models
class ArticleCreate(BaseModel):
    title: str
    category: str
    excerpt: str
    content: str
    author: str
    imageUrl: Optional[str] = "/images/img-1050.jpg"
    readTime: Optional[str] = "3 min"
    featured: Optional[bool] = False

class Article(ArticleCreate):
    id: str
    slug: str
    publishedAt: str

class EventMessage(BaseModel):
    eventType: str
    aggregateId: str
    payload: dict
    timestamp: str = Field(default_factory=lambda: datetime.utcnow().isoformat())

# In-memory storage with initial authentic institutional data
ARTICLES_DB: List[dict] = [
    {
        "id": "art-1",
        "slug": "inscriptions-ouvertes-annee-academique-2026-2027",
        "title": "Inscriptions ouvertes pour la rentrée académique 2026-2027 à l'ISSR Bakhita",
        "category": "Admissions",
        "excerpt": "L'Institut Supérieur des Sciences Religieuses Sainte Joséphine Bakhita lance sa campagne d'admissions pour l'ensemble de ses filières canoniques et professionnelles.",
        "content": "L'Institut Supérieur des Sciences Religieuses Sainte Joséphine Bakhita, érigé canoniquement par le Saint-Siège et rattaché à l'Université Catholique d'Afrique Centrale (UCAC-ICY), informe le public de l'ouverture des candidatures pour l'année académique 2026-2027. Que vous soyez laïc engagé désireux d'approfondir votre foi, religieux(se) en formation initiale ou permanente, ou pasteur en responsabilité, nos programmes d'excellence vous ouvrent leurs portes.",
        "author": "Secrétariat Général",
        "publishedAt": "15 Septembre 2026",
        "imageUrl": "/images/img-1050.jpg",
        "readTime": "3 min",
        "featured": True
    },
    {
        "id": "art-2",
        "slug": "colloque-theologique-afrique-eglise-societe",
        "title": "Colloque : « La formation théologique des laïcs, moteur du développement en Afrique »",
        "category": "Événements",
        "excerpt": "Retour sur la journée de réflexion organisée à Yaoundé réunissant théologiens, pasteurs et universitaires autour de la mission de l'ISSR.",
        "content": "Sous la présidence du P. Dr Patrice MEKANA, sac, Directeur de l'Institut, l'ISSR Sainte Bakhita a accueilli une conférence académique majeure portant sur la place cruciale des laïcs chrétiens formés intellectuellement et spirituellement dans la société africaine actuelle. Les débats ont souligné l'urgence d'une foi adulte, capable de rendre compte de l'espérance chrétienne dans les sphères professionnelles, politiques et familiales.",
        "author": "P. Dr Patrice MEKANA, sac",
        "publishedAt": "04 Août 2026",
        "imageUrl": "/images/mg-2217.jpg",
        "readTime": "5 min",
        "featured": False
    },
    {
        "id": "art-3",
        "slug": "diplome-universitaire-ingenierie-pastorale-inscriptions",
        "title": "L'Ingénierie Pastorale : une réponse moderne aux aumôneries et projets d'Église",
        "category": "Formations",
        "excerpt": "Découvrez notre Diplôme Universitaire en Ingénierie Pastorale spécialement conçu pour les aumôniers hospitaliers, pénitentiaires et responsables d'œuvres caritatives.",
        "content": "Comment structurer une aumônerie d'hôpital ? Quels outils pour accompagner la réinsertion sociale en milieu carcéral ? Comment gérer une équipe bénévole et financer un projet paroissial ? Le DU en Ingénierie Pastorale de l'ISSR Bakhita offre 2 années de formation pratique et théorique pour professionnaliser l'action d'Église.",
        "author": "Sr. Patience ENGANEMBEN, ejnb",
        "publishedAt": "28 Juillet 2026",
        "imageUrl": "/images/img-1139.jpg",
        "readTime": "4 min",
        "featured": False
    }
]

FORMATIONS_DB: List[dict] = [
    {
        "id": "baccalaureat-canonique",
        "slug": "baccalaureat-canonique-sciences-religieuses",
        "title": "Baccalauréat Canonique en Sciences Religieuses",
        "subtitle": "Formation théologique et pastorale universitaire de 1er cycle (Équivalent Licence LMD)",
        "category": "canonique",
        "duration": "3 ans (6 semestres)",
        "diploma": "Baccalauréat Canonique (Saint-Siège / UCAC)",
        "modality": "Présentiel (Yaoundé – Mvolyé) & Distanciel hybride",
        "tuition": {
            "registrationFee": "50 000 FCFA",
            "annualTuition": "450 000 FCFA",
            "installments": "Payable en 3 tranches (Octobre, Janvier, Mars)"
        }
    },
    {
        "id": "master-sciences-religieuses",
        "slug": "master-sciences-religieuses",
        "title": "Master en Sciences Religieuses",
        "subtitle": "Spécialisation approfondie : Pastorale & Évangélisation des cultures",
        "category": "canonique",
        "duration": "2 ans (4 semestres)",
        "diploma": "Licence Canonique / Master d'État (UCAC)",
        "modality": "Présentiel & E-learning synchrone",
        "tuition": {
            "registrationFee": "50 000 FCFA",
            "annualTuition": "550 000 FCFA",
            "installments": "Payable en 3 tranches"
        }
    },
    {
        "id": "du-ingenierie-pastorale",
        "slug": "du-ingenierie-pastorale",
        "title": "DU en Ingénierie Pastorale & Projets d'Église",
        "subtitle": "Gestion de projets caritatifs, aumôneries et management d'œuvres d'Église",
        "category": "professionnelle",
        "duration": "2 ans",
        "diploma": "Diplôme Universitaire (DU - ISSR / UCAC)",
        "modality": "Cours du soir & Samedis",
        "tuition": {
            "registrationFee": "35 000 FCFA",
            "annualTuition": "350 000 FCFA",
            "installments": "Payable en 3 tranches"
        }
    },
    {
        "id": "du-pedagogie-religieuse",
        "slug": "du-pedagogie-religieuse",
        "title": "DU en Pédagogie Religieuse & Catéchétique",
        "subtitle": "Formation pour enseignants du secondaire et coordinateurs de catéchèse",
        "category": "professionnelle",
        "duration": "2 ans",
        "diploma": "Diplôme Universitaire (DU - ISSR / UCAC)",
        "modality": "Présentiel & Hybride",
        "tuition": {
            "registrationFee": "35 000 FCFA",
            "annualTuition": "350 000 FCFA",
            "installments": "Payable en 3 tranches"
        }
    }
]

EVENTS_LOG: List[dict] = []

@app.get("/health")
def health_check():
    return {
        "service": "issr-cms-service",
        "status": "UP",
        "institution": "ISSR Sainte Joséphine Bakhita - UCAC",
        "timestamp": datetime.utcnow().isoformat()
    }

@app.get("/api/articles")
def get_articles(category: Optional[str] = None, q: Optional[str] = None):
    results = ARTICLES_DB
    if category and category.lower() != "toutes":
        results = [a for a in results if a["category"].lower() == category.lower()]
    if q:
        query = q.lower()
        results = [
            a for a in results 
            if query in a["title"].lower() or query in a["excerpt"].lower() or query in a["author"].lower()
        ]
    return results

@app.get("/api/articles/{slug}")
def get_article_by_slug(slug: str):
    for a in ARTICLES_DB:
        if a["slug"] == slug:
            return a
    raise HTTPException(status_code=404, detail="Article non trouvé")

@app.post("/api/articles", status_code=201)
def create_article(article_in: ArticleCreate):
    new_id = f"art-{len(ARTICLES_DB) + 1}"
    slug = article_in.title.lower().replace(" ", "-").replace("'", "-")[:60]
    published_date = datetime.now().strftime("%d %B %Y")
    
    article_dict = {
        "id": new_id,
        "slug": slug,
        "title": article_in.title,
        "category": article_in.category,
        "excerpt": article_in.excerpt,
        "content": article_in.content,
        "author": article_in.author,
        "imageUrl": article_in.imageUrl,
        "readTime": article_in.readTime,
        "publishedAt": published_date,
        "featured": article_in.featured
    }
    
    ARTICLES_DB.insert(0, article_dict)
    
    # Emit Event in event-bus
    event = {
        "eventType": "ARTICLE_PUBLISHED",
        "aggregateId": new_id,
        "payload": {"title": article_in.title, "author": article_in.author},
        "timestamp": datetime.utcnow().isoformat()
    }
    EVENTS_LOG.append(event)
    
    return article_dict

@app.delete("/api/articles/{article_id}")
def delete_article(article_id: str):
    global ARTICLES_DB
    before_count = len(ARTICLES_DB)
    ARTICLES_DB = [a for a in ARTICLES_DB if a["id"] != article_id]
    if len(ARTICLES_DB) == before_count:
        raise HTTPException(status_code=404, detail="Article non trouvé")
    return {"message": "Article supprimé avec succès"}

@app.get("/api/formations")
def get_formations(category: Optional[str] = None):
    if category:
        return [f for f in FORMATIONS_DB if f["category"].lower() == category.lower()]
    return FORMATIONS_DB

@app.get("/api/formations/{slug}")
def get_formation_by_slug(slug: str):
    for f in FORMATIONS_DB:
        if f["slug"] == slug or f["id"] == slug:
            return f
    raise HTTPException(status_code=404, detail="Formation non trouvée")

@app.post("/api/events/publish")
def publish_event(event: EventMessage):
    """Publish an event to the internal event bus"""
    EVENTS_LOG.append(event.dict())
    return {"status": "ACKNOWLEDGED", "event": event}

@app.get("/api/events")
def list_events():
    """List recent microservice events"""
    return EVENTS_LOG

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
