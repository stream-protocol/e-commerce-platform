import { getCategoryByHandle } from "@lib/data"
import CategoryTemplate from "@modules/categories/templates"
import { GetServerSideProps } from "next"
import { Metadata } from "next"

type Props = {
  category: any
}

export async function generateMetadata(category: any): Promise<Metadata> {
  return {
    title: `${category.name} | StreamPay™ Store`,
    description: `${category.name} category`,
  }
}

const CategoryPage: React.FC<Props> = ({ category }) => {
  return <CategoryTemplate categories={[category]} />
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { category } = context.params

  try {
    const data = await getCategoryByHandle(category[0]) // Assuming you want the first item of the array
    return { props: { category: data.product_categories[0] } }
  } catch (error) {
    return { notFound: true }
  }
}

export default CategoryPage
