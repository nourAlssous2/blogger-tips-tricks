import SectionTitle from "@/components/SectionTitle/SectionTitle"
import BlogsContainer from "@/components/BlogsContainer/BlogsContainer"
import Category from "@/components/Category/Category"
import { Suspense } from "react"
import Image from "next/image"
import BlogSkeleton from "@/components/Skeletons/Blog/BlogSkeleton"
import { translate } from "@/lib/funcs/translate"
import { cookies } from "next/headers"

export function generateMetadata() {
    const language = cookies().get('lang')?.value === '1' ? 'ar' : 'en';
    const translates = translate(language)
    const hero = translates.hero;
    return {
        title: hero.title,
        description: hero.description,
    }
}

export const dynamic = 'force-dynamic';

export default async function Home() {
    const cookie = cookies();
    const language = cookie.get('lang')?.value === '1' ? 'ar' : 'en';
    const translates = translate(language);
    
    return (
        <div className="felx flex-col">
            <div className="hero h-[calc(100vh_-_56px)] relative mb-2">
                <Image
                    src={'/images/hero.webp'}
                    alt="Hero Image"
                    className="object-cover"
                    fill
                />
                <div className="placeholder bg-black/60 absolute w-full h-full"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center text-white gap-2">
                    <h3 className="text-2xl font-bold text-center">{translates.hero.title}</h3>
                    <p className="text-xl text-center">{translates.hero.description}</p>
                </div>
            </div>
            <section>
                <SectionTitle title={translates.last3Blogs} />
                <Suspense fallback={<BlogSkeleton />}>
                    <BlogsContainer lang={language} url={'recent'} />
                </Suspense>
            </section>
            <section>
                <SectionTitle title={translates.categories.sectionTitle} />
                <div className="container grid grid-cols-3 py-2 gap-2 max-md:grid-cols-2 max-sm:grid-cols-1">
                    <Category translates={translates} categoryText={translates.categories.sport}      category={'Sport'}      icon={'fa fa-dumbbell'}  mainColor={'#4ade80'} secondryColor={'#16a34a'} />
                    <Category translates={translates} categoryText={translates.categories.anime}      category={'Anime'}      icon={'fa fa-pen'}       mainColor={'#facc15'} secondryColor={'#ca8a04'} />
                    <Category translates={translates} categoryText={translates.categories.personal}   category={'Personal'}   icon={'fa fa-person'}    mainColor={'#818cf8'} secondryColor={'#4f46e5'} />
                    <Category translates={translates} categoryText={translates.categories.health}     category={'Health'}     icon={'fa fa-heart'}     mainColor={'#f87171'} secondryColor={'#dc2626'} />
                    <Category translates={translates} categoryText={translates.categories.learn}      category={'Learn'}      icon={'fa fa-book'}      mainColor={'#60a5fa'} secondryColor={'#2563eb'} />
                    <Category translates={translates} categoryText={translates.categories.history}    category={'History'}    icon={'fa fa-history'}   mainColor={'#fb923c'} secondryColor={'#ea580c'} />
                    <Category translates={translates} categoryText={translates.categories.technology} category={'Technology'} icon={'fa fa-lightbulb'} mainColor={'#9ca3af'} secondryColor={'#4b5563'} />
                </div>
            </section>
            <section>
                <SectionTitle title={translates.mostLikedBlogs} />
                <Suspense fallback={<BlogSkeleton />}>
                    <BlogsContainer lang={language} url={'most-liked'} />
                </Suspense>
            </section>
        </div>
    )
}