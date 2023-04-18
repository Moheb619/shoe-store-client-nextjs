import ProductCard from "@/components/ProductCard";
import Wrapper from "@/components/Wrapper";
import { fetchDataFromApi } from "@/utils/api";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
const maxResult = 3;

const Category = ({ category, product, slug }) => {
  const [pageIndex, setPageIndex] = useState(1);
  const { data, error, isLoading } = useSWR(`api/product/get-products?slug=${slug}`, fetchDataFromApi, {
    fallbackData: product,
  });
  const { query } = useRouter();
  useEffect(() => {
    setPageIndex(1);
  }, [query]);

  return (
    <div className="w-full md:py-20 relative">
      <Wrapper>
        <div className="text-center max-w-[800px] mx-auto mt-8 md:mt-0">
          <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">{category?.[0].name}</div>
        </div>

        {/* products grid start */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14 px-5 md:px-0">
          {data?.map((p) => (
            <ProductCard key={p?.id} data={p} />
          ))}
        </div>
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
  const product = await fetchDataFromApi(`api/product/get-products?slug=${slug}`);

  return {
    // Passed to the page component as props
    props: { category, product, slug },
  };
}
