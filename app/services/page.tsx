import type { Metadata } from "next";
import ServicesPage from "../../components/ServicesPage";

export const metadata: Metadata = {
  title: "Services | South Yemeni Community of Hamilton",
  description:
    "Settlement, immigration information, employment, education, and community programs for newcomers and families in Hamilton.",
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  const { service } = await searchParams;
  return <ServicesPage initialService={service} />;
}