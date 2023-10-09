import FeaturedProducts from "@modules/home/components/featured-products";
import Hero from "@modules/home/components/hero";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Shop all available models only at the StreamPay™. Worldwide Shipping. Secure Payment.",
};

const PromoMessage = () => (
  <section style={{ margin: '20px 0' }}>
    <p>
      Shop all available models only at the StreamPay™. Worldwide Shipping. Secure Payment.
    </p>
  </section>
);

const Home = () => {
  return (
    <>
      <Hero />
      <PromoMessage />
      <FeaturedProducts />
    </>
  );
}

export default Home;

export default Home
