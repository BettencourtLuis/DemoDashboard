function hideSkeletonLoader(widgetId) {
    const widget = document.getElementById(widgetId);
    const skeletonLoader = widget.querySelector('.skeleton-loader');
    if (skeletonLoader) {
      skeletonLoader.style.display = 'none';
    }
  }

export { hideSkeletonLoader };