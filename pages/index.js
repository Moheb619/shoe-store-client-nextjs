import HeroBanner from "@/components/HeroBanner";
import ProductCard from "@/components/ProductCard";
import Wrapper from "@/components/Wrapper";
import { useState, useRef, useEffect } from "react";
import { fetchDataFromApi } from "@/utils/api";
import { useInView, motion, stagger, useAnimation } from "framer-motion";
export default function Home({ product_data }) {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref);
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);
  const container = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: {
      scale: 0,
    },
    visible: {
      scale: 1,
    },
  };
  return (
    <main className="">
      <HeroBanner></HeroBanner>
      <Wrapper>
        {/* heading and paragaph start */}
        <div className="text-center max-w-[800px] mx-auto my-[50px] md:my-[80px]">
          <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">Cushioning for Your Miles</div>
          <div className="text-md md:text-xl">A lightweight Nike ZoomX midsole is combined with increased stack heights to help provide cushioning during extended stretches of running.</div>
        </div>
        {/* heading and paragaph end */}

        {/* products grid start */}
        <motion.div variants={container} initial="hidden" animate={controls} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14 px-5 md:px-0">
          {product_data?.map((product) => (
            <motion.div ref={ref} variants={item}>
              <ProductCard key={product.id} data={product} />
            </motion.div>
          ))}
        </motion.div>
        {/* products grid end */}
      </Wrapper>
    </main>
  );
}

export async function getStaticProps() {
  const product_data = await fetchDataFromApi("api/product/get-products");
  return {
    props: { product_data }, // will be passed to the page component as props
  };
}
