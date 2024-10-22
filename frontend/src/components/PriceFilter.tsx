const PriceFilter = ({ selectedPrice, onChange }: Props) => {
  return (
    <div className="mb-4">
      <h4 className="text-lg font-semibold mb-3 text-slate-700">Max Price</h4>
      <select
        className="p-3 border border-slate-300 rounded-lg w-full bg-white text-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
        value={selectedPrice}
        onChange={(event) =>
          onChange(
            event.target.value ? parseInt(event.target.value) : undefined
          )
        }
      >
        <option value="">Select Max Price</option>
        {[50, 100, 200, 300, 500].map((price) => (
          <option key={price} value={price}>
            {price}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PriceFilter;
