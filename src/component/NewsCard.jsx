const NewsCard = ({ title, description, url, imageUrl }) => {
  return (
    <div className="flex flex-col bg-white border rounded-lg shadow-lg overflow-hidden max-w-xs  h-full my-6 mx-1">
      {imageUrl ? (
        <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
      ) : (
        <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">
          No Image
        </div>
      )}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-[#4158D0] truncate">{title}</h3>
        <p className="text-sm text-gray-700 flex-grow overflow-hidden truncate">
          {description || "No description available."}
        </p>
        <a
          href={url}
          className="mt-auto inline-flex items-center justify-center rounded-md bg-[#4158D0] px-4 py-2 text-sm font-medium text-white shadow hover:bg-opacity-90"
          target="_blank"
          rel="noopener noreferrer"
        >
          Read More
        </a>
      </div>
    </div>
  );
};

export default NewsCard;
