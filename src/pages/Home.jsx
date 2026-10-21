import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import {useState, useEffect} from "react";

function Home() {
  const buttons = [
    { id: "all", name: "All" },
    { id: "phones", name: "Phones" },
    { id: "headphones", name: "Headphones" },
    { id: "electronics", name: "Electronics" },
    { id: "laptops", name: "Laptops" },
    { id: "audio", name: "Audio" },
    { id: "wearables", name: "Wearables" },
    { id: "tv", name: "TV" },
    { id: "gaming", name: "Gaming" },
  ];

  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category") || "all";
  const currentPage = Number(searchParams.get("page")) || 1;

  const search = searchParams.get("search") || "";
  const [searchInput, setSearchInput] = useState(search);
  
  const { data, isLoading, isError } = useQuery({
    queryKey: ["products", selectedCategory, currentPage, search],

    queryFn: async () => {
      const response = await axios.get(
        `http://localhost:8000/api/products?search=${search}&category=${selectedCategory}&page=${currentPage}`,
      );

      return response.data;
    },
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchParams({ category: selectedCategory, search: searchInput, page: 1 });
    }, 500);

    return () => clearTimeout(timer);
  }, [searchInput, selectedCategory, setSearchParams]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return <h1>Error</h1>;
  }

  return (
    <>
      {buttons.map((button) => (
        <button
          key={button.id}
          className="bg-black text-white py-2 px-4 mx-4 my-2 rounded-lg"
          onClick={() => setSearchParams({ category: button.id, search: search, page: 1 })}
        >
          {button.name}
        </button>
      ))}
      <div>
        <input 
          type="text"
          placeholder="Search products..."
          className="ml-4 border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data.products.map((product) => (
          <div key={product._id} className="rounded-xl bg-white p-4 shadow">
            <Link to={`/products/${product._id}`}>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 rounded-lg object-cover"
              />

              <div className="mt-4 flex items-center gap-4 justify-between">
                <h2 className="mt-3 text-lg font-semibold">{product.name}</h2>

                <p className="mt-4 text-xl font-bold text-gray-900 bg-cyan-500 rounded-lg w-fit px-2 py-1">
                  {product.category}
                </p>
              </div>

              <p className="mt-1 text-gray-500">{product.price} AZN</p>
            </Link>

            <button className="mt-3 w-full rounded-lg bg-black py-2 text-white">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-2 p-4">
  {Array.from(
    { length: Math.ceil(data.count / 10) },
    (_, index) => {
      const page = index + 1;

      return (
        <button
          key={page}
          onClick={() =>
            setSearchParams({
              category: selectedCategory,
              page: page.toString(),
              search: search
            })
          }
          className={`${currentPage === page ? "bg-black text-white" : "bg-gray-200 text-gray-700"} rounded-lg px-4 py-2`}
        >
          {page}
        </button>
      );
    }
  )}
</div>
    </>
  );
}                                                                                                                                                                                                                 

export default Home;
