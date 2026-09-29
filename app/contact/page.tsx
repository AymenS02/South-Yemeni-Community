import type { Metadata } from "next";
import ContactPage from "../../components/ContactPage";

export const metadata: Metadata = {
  title: "Contact | South Yemeni Community of Hamilton",
  description:
    "Get in touch with the South Yemeni Community of Hamilton. Questions, volunteering, partnerships, or just to say hello.",
};

export default function Page() {
  return <ContactPage />;
}