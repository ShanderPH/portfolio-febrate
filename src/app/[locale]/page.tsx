import { serverSideTranslation, type Locale } from '@/lib/i18n'
import { HeroSectionWrapper } from '@/components/hero'
import { AboutSection } from '@/components/about'
import { SkillsSection } from '@/components/skills'
import { FooterSection } from '@/components/footer'

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale: localeParam } = await params
  const locale = localeParam as Locale
  await serverSideTranslation(locale, ['common', 'home'])

  return (
    <div className="min-h-screen bg-transparent">
      <HeroSectionWrapper />

      <AboutSection />

      <SkillsSection />

      <FooterSection />
    </div>
  )
}
