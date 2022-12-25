import Container from "@components/container";
import Layout from "@components/layout";
import { authorsquery, configQuery } from "@lib/groq";
import { getClient } from "@lib/sanity";
import GetImage from "@utils/getImage";
import Image from "next/image";
import Link from "next/link";

export default function About({ authors, siteconfig }) {
  // console.log("Atakan kontrol");
  // console.log(authors);
  // console.log(authors[0]["name"]);

  // authors = authors.sort(function(a, b) {
  //   var a_name = a["name"].toUpperCase();
  //   var b_name = b["name"].toUpperCase();
  //   return (a_name < b_name) ? -1 : (a_name > b_name) ? 1: 0;
  // });
  // console.log(au)
  return (
    <Layout {...siteconfig}>
      <Container>
        <h1 className="mt-2 mb-3 text-3xl font-semibold tracking-tight text-center lg:leading-snug text-brand-primary lg:text-4xl dark:text-white">
          Biz Kimiz
        </h1>
        <div className="text-center">
          <p className="text-lg">Biz Motivasyonu Yüksek Bir Takımız.</p>
        </div>
        
        <div className="mx-auto prose text-center dark:prose-invert mt-14">
          <p>
          Mimarlık Araştırmaları Derneği (MİMARDER) daha adil, katılımcı, kapsayıcı ve eleş- tirel mekânsal pratiklerin üretilebilmesi amacıyla kamu yararı doğrultusunda çeşitli tematik alanlarda bilgi üretebilmek ve paylaşabilmek ve kentlilerin yapılı çevreye dair yaşamış oldukları sorunlara ilişkin çözüm olanaklarını incelemeyi amaçlamak- tadır.Bu amaç doğrultusunda araştırmalar yürütmek, eğitimler vermek ve gerek Türkiyedeki gerekse de Dünyadaki mekânsal uygulamaları ve araştırma ekosis- temlerini takip eder.
          </p>
          <p>
          İstanbul Teknik Üniversitesi (İTÜ) Mimarlık Fakültesinde faaliyet gösteren öğretim üyeleri ve öğrencilerinden oluşan ekibin kökleri 2016 yılına dayanmaktadır. 2021 yılına gelindiğinde ise ekip faaliyetlerinin geliştirilmesi ve dış paydaşlarla araştırma ağının kurulması amacıyla tüzel kimlik oluşturma çabasına girilmiş ve bu çerçeve- de MİMARDER kurulmuştur.
Pandemi öncesi dönemde fiziksel ortamda faaliyet sürdürülen ve düzenli bir şe- kilde toplanan ekip, pandemi sonrası dönemde online ortamda çalışmalarını yü- rütmüş ve bu ortamda düzenli olarak haftalık «Fikir Geliştirme Toplantıları» düzen- lemiştir. Kitabın hazırlık sürecini de kapsayan bu dönemde sanal ortam üzerinde 100’ün üzerinde toplantı düzenlenmiş, cami tasarımı konusunda üretimler yapan çok sayıda fikir insanı ile görüşmeler yürütülmüş ve konuya ilişkin teknik gezi ve fikir atölyeleri düzenlenmiştir. İlk araştırma dosyası elinizdeki bu eser olan derneğin faaliyetleri tasarım konusunda farklı alanlarda yürütülmekte olan araştırma dosya- ları ile devam etmektedir.
          </p>
          <p>
            <Link href="/contact">Bize Ulaşın</Link>
          </p>
        </div>

        <div className="grid grid-cols-2 gap-5 mt-6 mb-16 md:mt-16 md:mb-32 md:gap-16">
          {authors.slice(0, -1).map(author => {
          {/* {authors.map(author => { */}
            const { width, height, ...imgprops } = GetImage(
              author?.image
            );
            return (
              <div
                key={author._id}
                className="relative overflow-hidden rounded-md aspect-square odd:translate-y-10 odd:md:translate-y-0">
                <Image
                  {...imgprops}
                  alt={author.name || " "}
                  layout="fill"
                  objectFit="cover"
                  sizes="(max-width: 320px) 100vw, 320px"
                />
              </div>
            );
          })}
        </div>

        
      </Container>
    </Layout>
  );
}

export async function getStaticProps({ params, preview = false }) {
  //console.log(params);
  const authors = await getClient(preview).fetch(authorsquery);
  const config = await getClient(preview).fetch(configQuery);
  return {
    props: {
      authors: authors,
      siteconfig: { ...config },
      preview
    },
    revalidate: 100
  };
}
