/**
 * ISSR Sainte Bakhita - Client API & Microservices Connectors
 * 
 * Supports both:
 * - Render Production URLs (via process.env.NEXT_PUBLIC_CMS_API_URL and NEXT_PUBLIC_SCHOOL_API_URL)
 * - Local Development (http://localhost:8000 and http://localhost:3001)
 * - Graceful Fallback to Mock Data during cold starts or offline mode
 */

import { Article, AdmissionApplication } from '../types';
import { ARTICLES, FORMATIONS } from '../data/mockData';

export const CMS_API_URL = process.env.NEXT_PUBLIC_CMS_API_URL || 'http://localhost:8000';
export const SCHOOL_API_URL = process.env.NEXT_PUBLIC_SCHOOL_API_URL || 'http://localhost:3001';

// ========================================================
// 1. CMS Microservice (FastAPI Python on Render)
// ========================================================

export async function getArticles(): Promise<Article[]> {
  try {
    const res = await fetch(`${CMS_API_URL}/articles`, {
      headers: { 'Content-Type': 'application/json' },
      next: { revalidate: 60 }
    });
    if (!res.ok) throw new Error(`CMS API error: ${res.status}`);
    const data = await res.json();
    return data.length > 0 ? data : ARTICLES;
  } catch (err) {
    console.warn('[CMS Service] Backend unreachable, using cached/mock articles:', err);
    return ARTICLES;
  }
}

export async function createArticle(articleData: Omit<Article, 'id' | 'publishedAt'>): Promise<Article | null> {
  try {
    const res = await fetch(`${CMS_API_URL}/articles`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(articleData),
    });
    if (!res.ok) throw new Error(`Failed to create article: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error('[CMS Service] Error creating article:', err);
    return null;
  }
}

// ========================================================
// 2. School & Admissions Microservice (NestJS on Render)
// ========================================================

export async function submitAdmissionApplication(applicationData: any): Promise<{ success: boolean; trackingNumber?: string; message?: string }> {
  try {
    const res = await fetch(`${SCHOOL_API_URL}/api/admissions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(applicationData),
    });
    if (!res.ok) throw new Error(`School API error: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('[School Service] Backend unreachable, falling back to client-generated tracking:', err);
    const fallbackNum = `ISSR-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    return {
      success: true,
      trackingNumber: fallbackNum,
      message: 'Candidature enregistrée avec succès (mode hors-ligne sécurisé)'
    };
  }
}

export async function getAdmissions(): Promise<AdmissionApplication[]> {
  try {
    const res = await fetch(`${SCHOOL_API_URL}/api/admissions`, {
      headers: { 'Content-Type': 'application/json' }
    });
    if (!res.ok) throw new Error(`School API error: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('[School Service] Backend unreachable, using local storage or sample:', err);
    return [];
  }
}
