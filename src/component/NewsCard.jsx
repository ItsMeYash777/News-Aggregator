const NewsCard = ({ title, description, url, imageUrl, author, source, publishedAt }) => {
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <article className="flex flex-col bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-lg shadow-lg hover:shadow-xl overflow-hidden max-w-xs h-full my-6 mx-1 transition-all duration-300 hover:transform hover:scale-105 animate-fade-in">
      {imageUrl ? (
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-48 object-cover"
          loading="lazy"
        />
      ) : (
        <div className="w-full h-48 bg-surface-light dark:bg-primary-800 flex items-center justify-center text-text-secondary-light dark:text-text-secondary-dark border-b border-border-light dark:border-border-dark">
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      )}
      
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-text-primary-light dark:text-text-primary-dark mb-2 line-clamp-2 leading-tight">
          {title}
        </h3>
        
        {description && (
          <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark flex-grow mb-3 line-clamp-3 leading-relaxed">
            {description}
          </p>
        )}
        
        {/* Article metadata */}
        <div className="flex flex-col gap-2 mt-auto">
          {(author || source || publishedAt) && (
            <div className="text-xs text-text-secondary-light dark:text-text-secondary-dark space-y-1">
              {source && (
                <div className="font-medium text-primary-700 dark:text-primary-400">
                  {source}
                </div>
              )}
              <div className="flex justify-between items-center">
                {author && (
                  <span>By {author}</span>
                )}
                {publishedAt && (
                  <span>{formatDate(publishedAt)}</span>
                )}
              </div>
            </div>
          )}
          
          <a
            href={url}
            className="mt-3 inline-flex items-center justify-center rounded-lg bg-primary-900 dark:bg-primary-100 px-4 py-2.5 text-sm font-semibold text-white dark:text-primary-900 shadow-md hover:bg-primary-800 dark:hover:bg-primary-200 transition-all duration-200 transform hover:scale-105"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read Full Article
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </article>
  );
};

export default NewsCard;
