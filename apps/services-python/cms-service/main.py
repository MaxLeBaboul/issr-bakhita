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
        "id": "sciences-religieuses-licence",
        "slug": "sciences-religieuses-baccalaureat-canonique",
        "title": "Sciences Religieuses (Baccalauréat Canonique / Licence)",
        "subtitle": "Formation théologique et philosophique fondamentale reconnue par Rome et l'UCAC",
        "category": "canonique",
        "duration": "3 ans (6 semestres)",
        "diploma": "Baccalauréat Canonique (Saint-Siège / UCAC)",
        "modality": "Présentiel (campus de Mvolyé) et En direct en ligne",
        "tuition": {
            "registrationFee": "10 000 FCFA",
            "annualTuition": "150 000 FCFA (Laïcs) / 765 000 FCFA (Religieux)",
            "installments": "Payable en 3 tranches"
        }
    },
    {
        "id": "sciences-religieuses-master-foi-culture",
        "slug": "master-sciences-religieuses-foi-culture-dialogue",
        "title": "Master Sciences Religieuses : Foi, Culture & Dialogue Interreligieux",
        "subtitle": "Cycle supérieur de recherche, inculturation et dialogue œcuménique (UCAC)",
        "category": "canonique",
        "duration": "2 ans (4 semestres)",
        "diploma": "Master universitaire en Sciences Religieuses (UCAC)",
        "modality": "Présentiel (cours du soir 17h00 - 20h30)",
        "tuition": {
            "registrationFee": "15 000 FCFA",
            "annualTuition": "450 000 FCFA (Laïcs) / 850 000 FCFA (Religieux)",
            "installments": "Payable en tranches"
        }
    },
    {
        "id": "sciences-religieuses-master-pastorale-gouvernance",
        "slug": "master-theologie-pastorale-gouvernance-ecclesiale",
        "title": "Master Sciences Religieuses : Pastorale & Gouvernance Ecclésiale",
        "subtitle": "Management institutionnel, audit pastoral et direction d'œuvres d'Église (UCAC)",
        "category": "canonique",
        "duration": "2 ans (4 semestres)",
        "diploma": "Master universitaire en Sciences Religieuses (UCAC)",
        "modality": "Présentiel et Enseignement synchrone à distance",
        "tuition": {
            "registrationFee": "15 000 FCFA",
            "annualTuition": "450 000 FCFA (Laïcs) / 850 000 FCFA (Religieux)",
            "installments": "Payable en 3 tranches"
        }
    },
    {
        "id": "licence-ingenierie-pastorale",
        "slug": "licence-sciences-religieuses-option-ingenierie-pastorale",
        "title": "Licence Sciences Religieuses — Option Ingénierie Pastorale",
        "subtitle": "Théologie pastorale approfondie, conduite de projets et évangélisation numérique",
        "category": "professionnelle",
        "duration": "3 ans",
        "diploma": "Licence en Sciences Religieuses (UCAC / ISSR)",
        "modality": "En ligne & Présentiel (Jour dès 8h ou Soir dès 17h)",
        "tuition": {
            "registrationFee": "10 000 FCFA",
            "annualTuition": "150 000 FCFA (Laïcs) / 765 000 FCFA (Religieux)",
            "installments": "Payable par tranches"
        }
    },
    {
        "id": "licence-pedagogie-religieuse",
        "slug": "licence-sciences-religieuses-option-pedagogie-religieuse",
        "title": "Licence Sciences Religieuses — Option Pédagogie Religieuse",
        "subtitle": "Devenez un acteur clé de l'éducation religieuse et de la formation des consciences",
        "category": "professionnelle",
        "duration": "3 ans",
        "diploma": "Licence en Sciences Religieuses (UCAC / ISSR)",
        "modality": "En ligne & Présentiel (Jour dès 8h ou Soir dès 17h)",
        "tuition": {
            "registrationFee": "10 000 FCFA",
            "annualTuition": "150 000 FCFA (Laïcs) / 765 000 FCFA (Religieux)",
            "installments": "Payable par tranches"
        }
    },
    {
        "id": "du-ingenierie-pastorale",
        "slug": "du-ingenierie-pastorale",
        "title": "Diplôme Universitaire (DU) en Ingénierie Pastorale",
        "subtitle": "Conception, gestion et accompagnement de projets pastoraux et caritatifs",
        "category": "professionnelle",
        "duration": "2 ans",
        "diploma": "Diplôme Universitaire (DU - UCAC / ISSR)",
        "modality": "Présentiel à Yaoundé (Mvolyé) ou En ligne",
        "tuition": {
            "registrationFee": "25 000 FCFA",
            "annualTuition": "280 000 FCFA",
            "installments": "Échelonné en 3 paiements"
        }
    },
    {
        "id": "du-pedagogie-religieuse",
        "slug": "du-pedagogie-religieuse",
        "title": "Diplôme Universitaire (DU) en Pédagogie Religieuse",
        "subtitle": "Formation pour enseignants du secondaire et coordinateurs de catéchèse",
        "category": "professionnelle",
        "duration": "2 ans",
        "diploma": "Diplôme Universitaire (DU - UCAC / ISSR)",
        "modality": "Présentiel et En ligne",
        "tuition": {
            "registrationFee": "25 000 FCFA",
            "annualTuition": "280 000 FCFA",
            "installments": "Payable par tranches"
        }
    },
    {
        "id": "certificat-leadership-gestion-oeuvres",
        "slug": "certificat-universitaire-leadership-gestion-oeuvres",
        "title": "Certificat Universitaire en Leadership & Gestion des Œuvres",
        "subtitle": "Gouvernance évangélique, comptabilité, gestion financière et droit ecclésial",
        "category": "certificat",
        "duration": "6 mois (oct-fév ou fév-juin) + stage 2 mois",
        "diploma": "Certificat Universitaire (UCAC / ISSR)",
        "modality": "100% En Ligne (Cours du soir à 17h00)",
        "tuition": {
            "registrationFee": "Inclus",
            "annualTuition": "415 000 FCFA",
            "installments": "Payable en 2 versements"
        }
    },
    {
        "id": "certificat-sciences-religieuses",
        "slug": "certificat-universitaire-en-sciences-religieuses",
        "title": "Certificat Universitaire en Sciences Religieuses",
        "subtitle": "Formation théologique, doctrinale, spirituelle et humaine fondamentale",
        "category": "certificat",
        "duration": "1 an",
        "diploma": "Certificat Universitaire (UCAC / ISSR)",
        "modality": "Cours du soir ou 100% En Ligne",
        "tuition": {
            "registrationFee": "10 000 FCFA",
            "annualTuition": "150 000 FCFA",
            "installments": "Payable en tranches"
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
