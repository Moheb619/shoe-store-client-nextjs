import ProductCard from "@/components/ProductCard";
import Wrapper from "@/components/Wrapper";
import { fetchDataFromApi } from "@/utils/api";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { inView, motion, useAnimation, useInView } from "framer-motion";
import useSWR from "swr";
const maxResult = 3;

const Category = ({ category, product, slug }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const productsVariant = {
    hidden: { x: -200, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  };
  const [pageIndex, setPageIndex] = useState(1);
  const { data, error, isLoading } = useSWR(`api/product/get-categorized-products/${slug}`, fetchDataFromApi, {
    fallbackData: product,
  });
  const { query } = useRouter();
  const cardsKey = query.slug || "all";
  useEffect(() => {
    setPageIndex(1);
  }, [query]);

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, query, isInView]);

  return (
    <div className="w-full md:py-20 relative">
      <Wrapper>
        <div className="text-center max-w-[800px] mx-auto mt-8 md:mt-0">
          <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">{category?.[0].name}</div>
        </div>

        {/* products grid start */}
        <motion.div key={cardsKey} ref={ref} variants={productsVariant} initial="hidden" animate={controls} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14 px-5 md:px-0">
          {data?.map((p) => (
            <ProductCard key={p?.product?.id} data={p?.product} />
          ))}
        </motion.div>
        {/* products grid end */}

        {/* PAGINATION BUTTONS START */}
        {/* {data?.meta?.pagination?.total > maxResult && (
          <div className="flex gap-3 items-center justify-center my-16 md:my-0">
            <button className={`rounded py-2 px-4 bg-black text-white disabled:bg-gray-200 disabled:text-gray-500`} disabled={pageIndex === 1} onClick={() => setPageIndex(pageIndex - 1)}>
              Previous
            </button>

            <span className="font-bold">{`${pageIndex} of ${data && data.meta.pagination.pageCount}`}</span>

            <button
              className={`rounded py-2 px-4 bg-black text-white disabled:bg-gray-200 disabled:text-gray-500`}
              disabled={pageIndex === (data && data.meta.pagination.pageCount)}
              onClick={() => setPageIndex(pageIndex + 1)}
            >
              Next
            </button>
          </div>
        )} */}
        {/* PAGINATION BUTTONS END */}
        {isLoading && (
          <div className="absolute top-0 left-0 w-full h-full bg-white/[0.5] flex flex-col gap-5 justify-center items-center">
            <img src="/logo.svg" width={150} />
            <span className="text-2xl font-medium">Loading...</span>
          </div>
        )}
      </Wrapper>
    </div>
  );
};

export default Category;

export async function getStaticPaths() {
  const category = await fetchDataFromApi("api/category/get-categories");
  const paths = category?.map((c) => ({
    params: {
      slug: c.slug,
    },
  }));
  return {
    paths,
    fallback: false, // can also be true or 'blocking'
  };
}

export async function getStaticProps({ params: { slug } }) {
  const category = await fetchDataFromApi(`api/category/get-categories?slug=${slug}`);
  const product = await fetchDataFromApi(`api/product/get-categorized-products/${slug}`);
  return {
    // Passed to the page component as props
    props: { category, product, slug },
  };
}
