import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/site/SiteNav";
import { Hero } from "@/components/site/Hero";
import { AsIs } from "@/components/site/AsIs";
import { ToBe } from "@/components/site/ToBe";
import { Studio } from "@/components/site/Studio";
import { Impact } from "@/components/site/Impact";
import { WhyDifferent } from "@/components/site/WhyDifferent";
import { Compare } from "@/components/site/Compare";
import { Team } from "@/components/site/Team";
import { ClosingCta, SiteFooter } from "@/components/site/Closing";

const title = "صَنِّع AI — من فكرتك إلى منتج جاهز للتصنيع";
const description =
  "منصة AI Product Co-Designer تحوّل وصف العميل إلى مواصفات ومقترحات تصميم ومواد وتكلفة وفحص قابلية تصنيع، بدون اجتماع أولي.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="min-h-screen">
      <SiteNav />
      <Hero />
      <AsIs />
      <ToBe />
      <Studio />
      <Impact />
      <WhyDifferent />
      <Compare />
      <Team />
      <ClosingCta />
      <SiteFooter />
    </main>
  );
}
