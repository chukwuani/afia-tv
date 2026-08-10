import { NewsTypes } from '@/types'
import axios from 'axios'
import { MetadataRoute } from 'next'

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch your news articles
  const articles = await fetchAllArticles() // Your data fetching function
  
  const articleUrls = articles.map((article) => ({
    url: `https://afiatv.net/news/${article.slug}`,
    lastModified: article._updatedAt || article.publishedAt,
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }))

  return [
    {
      url: 'https://afiatv.net',
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 1,
    },
    {
      url: 'https://afiatv.net/news',
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 0.9,
    },
    ...articleUrls,
  ]
}

const fetchAllArticles = async () => {
	const query = `*[_type == "news" && !(_id in path("drafts.**"))] | order(publishedAt desc) [0...150] {
					_id,
					_createdAt,
					publishedAt,
					title, 
					description, 
					author->{
						name,
						"imageUrl": image.asset->url
					},
					"slug": slug.current, 
					"mainImage": mainImage.asset->url, 
					"altText": mainImage.alt
	}`;

	const res = await axios.post(
		`https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/query/${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
		{
			query,
		},
		{
			headers: {
				Authorization: `Bearer ${process.env.NEXT_PUBLIC_SANITY_API_TOKEN}`,
				"Content-Type": "application/json",
			},
		}
	);

	const data = res.data;
	const posts: NewsTypes[] = data.result;

	return posts
}