
function ArrayVisualizer({ 
  array, 
  animationData, 
  algorithm = 'default',
  height = 40,
  showValues = true,
  showCurrentArray = true 
}) {
  // Get bar styling based on animation state
  const getBarStyle = (index) => {
    let className = "text-white text-xs flex items-end justify-center transition-all duration-200";
    
    // Improve this later
    if (animationData) {
      if (animationData.comparing && animationData.comparing.includes(index)) {
        className += " bg-red-500";
      } else if (animationData.swapping && animationData.swapping.includes(index)) {
        className += " bg-yellow-500";
      } else if (animationData.sorted && animationData.sorted.includes(index)) {
        className += " bg-green-500";
      } else {
        className += " bg-blue-500"; // Default active
      }
    } else {
      className += " bg-gray-400"; // Inactive/placeholder
    }
    
    return className;
  };

  // Handle empty array case
  if (!array || array.length === 0) {
    return (
      <div className={`flex items-center justify-center h-${height} mb-4`}>
        <p className="text-gray-500">No data to visualize</p>
      </div>
    );
  }

  return (
    <div>
      {/* Array Visualization */}
      <div className={`flex items-end justify-center space-x-1 h-${height} mb-4`}>
        {array.map((value, index) => (
          <div
            key={index}
            className={getBarStyle(index)}
            style={{
              height: `${value * 1.5}px`,
              width: '30px',
              minHeight: '20px' // Ensure small values are visible
            }}
          >
            {showValues && (
              <span className="mb-1 text-[10px]">{value}</span>
            )}
          </div>
        ))}
      </div>
      
      {/* Current Array Display */}
      {showCurrentArray && (
        <p className="text-center text-sm text-gray-600">
          Current: [{array.join(', ')}]
        </p>
      )}
    </div>
  );
}

export default ArrayVisualizer;