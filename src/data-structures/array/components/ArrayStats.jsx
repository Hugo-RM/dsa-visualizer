function ArrayStats({ 
  animationData, 
  algorithm = 'default',
  showAccessCount = true 
}) {
  // Don't render if no animation data
  if (!animationData || animationData.comparisons === undefined) {
    return null;
  }

  // Color schemes for different algorithms
  const colorSchemes = {
    bubble: {
      background: 'bg-blue-50',
      textHeader: 'text-blue-700',
      textStats: 'text-blue-600'
    },
    selection: {
      background: 'bg-teal-50',
      textHeader: 'text-teal-700',
      textStats: 'text-teal-600'
    },
    quick: {
      background: 'bg-purple-50',
      textHeader: 'text-purple-700',
      textStats: 'text-purple-600'
    },
    merge: {
      background: 'bg-orange-50',
      textHeader: 'text-orange-700',
      textStats: 'text-orange-600'
    },
    default: {
      background: 'bg-gray-50',
      textHeader: 'text-gray-700',
      textStats: 'text-gray-600'
    }
  };

  const colors = colorSchemes[algorithm] || colorSchemes.default;

  return (
    <div className={`mt-4 p-3 ${colors.background} rounded`}>
      <h4 className={`text-sm font-medium ${colors.textHeader} mb-2`}>
        Statistics:
      </h4>
      
      <div className={`grid ${showAccessCount ? 'grid-cols-3' : 'grid-cols-2'} gap-4 text-xs text-center`}>
        <div>
          <div className="font-medium">Comparisons</div>
          <div className={`text-lg font-bold ${colors.textStats}`}>
            {animationData.comparisons}
          </div>
        </div>
        
        <div>
          <div className="font-medium">Swaps</div>
          <div className={`text-lg font-bold ${colors.textStats}`}>
            {animationData.swaps}
          </div>
        </div>
        
        {showAccessCount && (
          <div>
            <div className="font-medium">Access Count</div>
            <div className={`text-lg font-bold ${colors.textStats}`}>
              {animationData.accessCount || 0}
            </div>
          </div>
        )}
      </div>
      
      {animationData.step && (
        <div className="mt-2 text-xs text-center text-gray-600">
          {animationData.step}
        </div>
      )}
    </div>
  );
}

export default ArrayStats;