
"use server";

import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
  Timestamp,
  collection,
  getDocs,
  query,
  orderBy,
  updateDoc,
  addDoc,
  deleteDoc,
  where,
} from "firebase/firestore";
import { db } from "./firebase"; // db can be null if Firebase fails to initialize
import type {
  HeroSectionData,
  SeatingSectionData,
  AmenitiesSectionData,
  MemberBenefitsSectionData,
  CommunityCultureSectionData,
  FinalCtaSectionData,
  SiteSettingsData,
  SectionKey,
  TrialSignupData,
  TrialSignupStatus,
  TourBookingData,
  TourBookingStatus,
  MemberBenefitsPageSettingsData,
  NewsArticle,
} from "@/types/landingPageAdmin";
import { getDefaultData } from "@/types/landingPageAdmin";
import type { ContactFormData } from "@/components/shared/ContactFormDialog";
import type { TourBookingFormData as ClientTourBookingFormData } from "@/types/landingPageAdmin";

const PAGE_CONTENT_COLLECTION = "page_content";
const TRIAL_SIGNUPS_COLLECTION = "trial_signups";
const TOUR_BOOKINGS_COLLECTION = "tour_bookings";
const NEWS_ARTICLES_COLLECTION = "news_articles";

// Generic function to get section data
export async function getSectionData<T>(sectionKey: SectionKey): Promise<T> {
  if (!db) {
    console.warn(`Firestore (db) is not initialized. Returning default data for section '${sectionKey}'. Check Firebase configuration in .env files and firebase.ts.`);
    return getDefaultData(sectionKey) as T;
  }
  try {
    const docRef = doc(db, PAGE_CONTENT_COLLECTION, sectionKey);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      if (data && "lastUpdated" in data && data.lastUpdated instanceof Timestamp) {
        const { lastUpdated, ...rest } = data; 
        return rest as T;
      }
      return data as T;
    } else {
      console.log(
        `No document found for section '${sectionKey}'. Returning default data.`
      );
      return getDefaultData(sectionKey) as T;
    }
  } catch (error) {
    console.error(`Error fetching data for section '${sectionKey}':`, error);
    return getDefaultData(sectionKey) as T;
  }
}

// Generic function to update section data
export async function updateSectionData(
  sectionKey: SectionKey,
  data: any
): Promise<boolean> {
  if (!db) {
    console.error(`Firestore (db) is not initialized. Cannot update section '${sectionKey}'. Check Firebase configuration.`);
    return false;
  }
  try {
    const docRef = doc(db, PAGE_CONTENT_COLLECTION, sectionKey);
    await setDoc(
      docRef,
      { ...data, lastUpdated: serverTimestamp() },
      { merge: true }
    );
    console.log(`Section '${sectionKey}' updated successfully.`);
    return true;
  } catch (error) {
    console.error(`Error updating section '${sectionKey}':`, error);
    return false;
  }
}

// Site Settings
export async function getSiteSettingsData(): Promise<SiteSettingsData> {
  return getSectionData<SiteSettingsData>("siteSettings");
}
export async function updateSiteSettings(
  data: SiteSettingsData
): Promise<boolean> {
  return updateSectionData("siteSettings", data);
}

// Hero Section (Main Page)
export async function getHeroSectionData(): Promise<HeroSectionData> {
  return getSectionData<HeroSectionData>("hero");
}
export async function updateHeroSection(
  data: HeroSectionData
): Promise<boolean> {
  return updateSectionData("hero", data);
}

// Seating Section
export async function getSeatingSectionData(): Promise<SeatingSectionData> {
  return getSectionData<SeatingSectionData>("seating");
}
export async function updateSeatingSectionData(
  data: SeatingSectionData
): Promise<boolean> {
  return updateSectionData("seating", data);
}

// Amenities Section
export async function getAmenitiesSectionData(): Promise<AmenitiesSectionData> {
  return getSectionData<AmenitiesSectionData>("amenities");
}
export async function updateAmenitiesSectionData(
  data: AmenitiesSectionData
): Promise<boolean> {
  return updateSectionData("amenities", data);
}

// Member Benefits Section (Manages the list of benefit items)
export async function getMemberBenefitsSectionData(): Promise<MemberBenefitsSectionData> {
  return getSectionData<MemberBenefitsSectionData>("benefits");
}
export async function updateMemberBenefitsSectionData(
  data: MemberBenefitsSectionData
): Promise<boolean> {
  return updateSectionData("benefits", data);
}

// Member Benefits Page Settings
export async function getMemberBenefitsPageSettingsData(): Promise<MemberBenefitsPageSettingsData> {
  return getSectionData<MemberBenefitsPageSettingsData>("memberBenefitsPage");
}
export async function updateMemberBenefitsPageSettingsData(
  data: MemberBenefitsPageSettingsData
): Promise<boolean> {
  return updateSectionData("memberBenefitsPage", data);
}

// Community Culture Section
export async function getCommunityCultureSectionData(): Promise<CommunityCultureSectionData> {
  return getSectionData<CommunityCultureSectionData>("culture");
}
export async function updateCommunityCultureSectionData(
  data: CommunityCultureSectionData
): Promise<boolean> {
  return updateSectionData("culture", data);
}

// Final CTA Section (Main Page)
export async function getFinalCtaSectionData(): Promise<FinalCtaSectionData> {
  return getSectionData<FinalCtaSectionData>("finalCta");
}
export async function updateFinalCtaSectionData(
  data: FinalCtaSectionData
): Promise<boolean> {
  return updateSectionData("finalCta", data);
}

// Trial Signups (from Contact Form)
export async function addTrialSignup(data: ContactFormData): Promise<boolean> {
  if (!db) {
    console.error("Firestore (db) is not initialized. Cannot add trial signup. Check Firebase configuration.");
    return false;
  }
  try {
    await addDoc(collection(db, TRIAL_SIGNUPS_COLLECTION), {
      ...data,
      message: data.message || "",
      createdAt: serverTimestamp(),
      status: "pending",
    });
    return true;
  } catch (error) {
    console.error("Error adding trial signup:", error);
    return false;
  }
}

export async function getTrialSignups(): Promise<TrialSignupData[]> {
  if (!db) {
    console.warn("Firestore (db) is not initialized. Cannot fetch trial signups. Returning empty array. Check Firebase configuration.");
    return [];
  }
  try {
    const q = query(
      collection(db, TRIAL_SIGNUPS_COLLECTION),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    const signups: TrialSignupData[] = [];
    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data();
      signups.push({
        id: docSnap.id,
        fullName: data.fullName,
        email: data.email,
        message: data.message,
        createdAt: (data.createdAt as Timestamp).toDate(),
        status: data.status,
      } as TrialSignupData);
    });
    return signups;
  } catch (error) {
    console.error("Error fetching trial signups:", error);
    return [];
  }
}

export async function updateTrialSignupStatus(
  id: string,
  status: TrialSignupStatus
): Promise<boolean> {
  if (!db) {
    console.error(`Firestore (db) is not initialized. Cannot update status for signup ${id}. Check Firebase configuration.`);
    return false;
  }
  try {
    const docRef = doc(db, TRIAL_SIGNUPS_COLLECTION, id);
    await updateDoc(docRef, { status });
    return true;
  } catch (error) {
    console.error(`Error updating status for signup ${id}:`, error);
    return false;
  }
}

// Tour Bookings
export async function addTourBooking(data: ClientTourBookingFormData): Promise<boolean> {
  if (!db) {
    console.error("Firestore (db) is not initialized. Cannot add tour booking. Check Firebase configuration.");
    return false;
  }
  try {
    const dataToSave = {
      ...data,
      preferredDate: Timestamp.fromDate(new Date(data.preferredDate)),
      createdAt: serverTimestamp(),
      status: "pending_confirmation",
    };
    await addDoc(collection(db, TOUR_BOOKINGS_COLLECTION), dataToSave);
    return true;
  } catch (error) {
    console.error("Error adding tour booking:", error);
    return false;
  }
}

export async function getTourBookings(): Promise<TourBookingData[]> {
  if (!db) {
    console.warn("Firestore (db) is not initialized. Cannot fetch tour bookings. Returning empty array. Check Firebase configuration.");
    return [];
  }
  try {
    const q = query(
      collection(db, TOUR_BOOKINGS_COLLECTION),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    const bookings: TourBookingData[] = [];
    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data();
      bookings.push({
        id: docSnap.id,
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        preferredDate: (data.preferredDate as Timestamp).toDate(),
        preferredTime: data.preferredTime,
        numberOfPeople: data.numberOfPeople,
        notes: data.notes,
        createdAt: (data.createdAt as Timestamp).toDate(),
        status: data.status,
      } as TourBookingData);
    });
    return bookings;
  } catch (error) {
    console.error("Error fetching tour bookings:", error);
    return [];
  }
}

export async function updateTourBookingStatus(
  id: string,
  status: TourBookingStatus
): Promise<boolean> {
  if (!db) {
    console.error(`Firestore (db) is not initialized. Cannot update status for tour booking ${id}. Check Firebase configuration.`);
    return false;
  }
  try {
    const docRef = doc(db, TOUR_BOOKINGS_COLLECTION, id);
    await updateDoc(docRef, { status });
    return true;
  } catch (error) {
    console.error(`Error updating status for tour booking ${id}:`, error);
    return false;
  }
}

// News Articles Management
export async function getNewsArticles(): Promise<NewsArticle[]> {
  if (!db) {
    throw new Error("Firestore not initialized");
  }

  try {
    const articlesRef = collection(db, NEWS_ARTICLES_COLLECTION);
    const q = query(articlesRef, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    
    const articles: NewsArticle[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      articles.push({
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toMillis ? data.createdAt.toMillis() : null,
        updatedAt: data.updatedAt?.toMillis ? data.updatedAt.toMillis() : null,
      } as NewsArticle);
    });
    
    return articles;
  } catch (error) {
    console.error("Error fetching news articles:", error);
    throw error;
  }
}

export async function getNewsArticleById(id: string): Promise<NewsArticle | null> {
  if (!db) {
    throw new Error("Firestore not initialized");
  }

  try {
    const articleRef = doc(db, NEWS_ARTICLES_COLLECTION, id);
    const articleSnap = await getDoc(articleRef);
    
    if (articleSnap.exists()) {
      const data = articleSnap.data();
      return {
        id: articleSnap.id,
        ...data,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      } as NewsArticle;
    }
    
    return null;
  } catch (error) {
    console.error("Error fetching news article:", error);
    throw error;
  }
}

export async function createNewsArticle(articleData: Omit<NewsArticle, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
  if (!db) {
    throw new Error("Firestore not initialized");
  }

  try {
    // Loại bỏ createdAt, updatedAt nếu có trong articleData
    const { createdAt, updatedAt, ...rest } = articleData as any;
    const articlesRef = collection(db, NEWS_ARTICLES_COLLECTION);
    const newArticle = {
      ...rest,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    const docRef = await addDoc(articlesRef, newArticle);
    return docRef.id;
  } catch (error) {
    console.error("Error creating news article:", error);
    throw error;
  }
}

export async function updateNewsArticle(id: string, articleData: Partial<NewsArticle>): Promise<void> {
  if (!db) throw new Error("Firestore not initialized");
  try {
    const articleRef = doc(db, NEWS_ARTICLES_COLLECTION, id);
    const updateData = {
      ...articleData,
      updatedAt: serverTimestamp(),
    };
    await updateDoc(articleRef, updateData);
  } catch (error) {
    console.error("Error updating news article:", error);
    throw error;
  }
}

export async function deleteNewsArticle(id: string): Promise<void> {
  if (!db) {
    throw new Error("Firestore not initialized");
  }

  try {
    const articleRef = doc(db, NEWS_ARTICLES_COLLECTION, id);
    await deleteDoc(articleRef);
  } catch (error) {
    console.error("Error deleting news article:", error);
    throw error;
  }
}

export async function getPublishedNewsArticles(): Promise<NewsArticle[]> {
  if (!db) {
    throw new Error("Firestore not initialized");
  }

  try {
    const articlesRef = collection(db, NEWS_ARTICLES_COLLECTION);
    const q = query(
      articlesRef, 
      where("isPublished", "==", true),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    
    const articles: NewsArticle[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      articles.push({
        id: doc.id,
        ...data,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      } as NewsArticle);
    });
    
    return articles;
  } catch (error) {
    console.error("Error fetching published news articles:", error);
    throw error;
  }
}
