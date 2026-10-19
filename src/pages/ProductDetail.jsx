import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

function ProductDetails() {
  const { id } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["product", id],

    queryFn: async () => {
      const response = await axios.get(
        `http://localhost:8000/api/products/${id}`
      );

      return response.data;
    },
  });

  if (isLoading) {
    return <h1 className="p-8 text-center text-xl">Loading...</h1>;
  }

  if (isError) {
    return <h1 className="p-8 text-center text-xl">Error</h1>;
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto grid max-w-6xl gap-10 rounded-2xl bg-white p-6 shadow-sm md:grid-cols-2 md:p-10">

        {/* Product Image */}
        <div className="flex items-center justify-center">
          <img
            src={data.image}
            alt={data.name}
            className="h-[450px] w-full rounded-2xl object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-center">

          <p className="mb-3 text-sm font-medium uppercase tracking-wide text-gray-400">
            Premium Collection
          </p>

          <h1 className="text-4xl font-bold text-gray-900">
            {data.name}
          </h1>

          <div className="mt-4 flex items-center gap-4 justify-between">
            <p className="mt-4 text-3xl font-bold text-gray-900">
              {data.price} AZN
            </p>
             <p className="mt-4 text-3xl font-bold text-gray-900 bg-cyan-500 rounded-lg w-fit px-2 py-1">
              {data.category}
            </p>
          </div>

          <div className="my-6 h-px bg-gray-200" />

          <p className="leading-7 text-gray-600">
            {data.description}
          </p>

          {/* Quantity */}
          <div className="mt-8">
            <p className="mb-2 font-medium text-gray-900">
              Quantity
            </p>

            <div className="flex w-fit items-center rounded-lg border">
              <button className="px-4 py-2 text-xl hover:bg-gray-100">
                −
              </button>

              <span className="px-5 py-2">
                1
              </span>

              <button className="px-4 py-2 text-xl hover:bg-gray-100">
                +
              </button>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-8 flex gap-3">

            <button className="flex-1 rounded-xl bg-black py-3 font-medium text-white transition hover:bg-gray-800">
              Add to Cart
            </button>

            <button className="rounded-xl border border-gray-300 px-5 py-3 font-medium text-gray-700 transition hover:bg-gray-100">
              ♡
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}

export default ProductDetails;