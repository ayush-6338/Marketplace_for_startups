
const categories = [
  'All',
  'Graphics & Design',
  'Programming & Tech',
  'Digital Marketing',
  'Video & Animation',
  'Writing & Translation',
  'Music & Audio',
  'Business',
  'Data',
  'Photography',
  'AI Services'
];

const CategoryBar = ({ selected, onSelect }) => {
  return (
    <div className="border-b border-white/5 overflow-x-auto no-scrollbar bg-[#020617]/50 backdrop-blur-sm sticky top-20 z-40">
      <div className="flex gap-6 px-6 py-4 w-max mx-auto">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => onSelect(cat)}
            className={`whitespace-nowrap text-sm font-medium transition duration-200 border-b-2 pb-1
              ${
                selected === cat
                  ? 'text-blue-400 border-blue-400'
                  : 'text-gray-400 border-transparent hover:text-white hover:border-gray-600'
              }
            `}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryBar;
