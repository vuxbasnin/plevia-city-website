"use client";

import { useEffect, useState } from "react";
import { getPublishedNewsArticles } from "@/lib/firestoreService";
import ClientImageBannerNews from "@/components/shared/ClientImageBannerNews";
import ListNews from "@/components/sections/ListNews/ListNews";
import ScrollReveal from "@/components/shared/ScrollReveal";
import FormInfo from "@/components/sections/FormInfo/FormInfo";

export default function NewsContent() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const fetchedArticles = await getPublishedNewsArticles();
        setArticles(fetchedArticles);
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang tải tin tức...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="news-content">
      <ScrollReveal>
        <ClientImageBannerNews/>
      </ScrollReveal>
      <ScrollReveal>
        <ListNews newsItems={articles} />
      </ScrollReveal>
      <ScrollReveal>
        <FormInfo />
      </ScrollReveal>
    </div>
  );
}
