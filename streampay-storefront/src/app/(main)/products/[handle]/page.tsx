import { getProductByHandle } from "@lib/data";
import ProductTemplate from "@modules/products/templates";
import { GetServerSideProps } from "next";
import { Metadata } from "next";

type Props = {
  product: any;
};

export async function generateMetadata(product: any): Promise<Metadata> {
  return {
    title: `${product.title} | StreamPay™ Store`,
    description: `${product.title}`,
    openGraph: {
      title: `${product.title} | StreamPay™ Store`,
      description: `${product.title}`,
      images: product.thumbnail ? [product.thumbnail] : [],
    },
  };
}

const ProductPage: React.FC<Props> = ({ product }) => {
  return <ProductTemplate product={product} />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { products } = await getProductByHandle(context.params.handle);
    const product = products[0];

    if (!product) {
      return { notFound: true };
    }

    return { props: { product } };

  } catch (error) {
    return { notFound: true };
  }
};

export default ProductPage;
