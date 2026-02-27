// Analytics and tracking utilities

// Google Analytics 4 setup (gtag is already loaded via HTML)
export const initGA = (measurementId = 'G-B6H259W4M9') => {
  if (typeof window === 'undefined' || !window.gtag) return;

  // gtag is already loaded via HTML script tag
  window.gtag('config', measurementId, {
    page_title: document.title,
    page_location: window.location.href
  });
};

// Track page views
export const trackPageView = (url) => {
  if (typeof window === 'undefined' || !window.gtag) return;
  
  window.gtag('config', 'G-B6H259W4M9', {
    page_path: url,
    page_title: document.title,
    page_location: window.location.href
  });
};

// Track custom events
export const trackEvent = (eventName, parameters = {}) => {
  if (typeof window === 'undefined' || !window.gtag) return;
  
  window.gtag('event', eventName, parameters);
};

// Track blog engagement
export const trackBlogEngagement = (postSlug, action, value = null) => {
  trackEvent('blog_engagement', {
    post_slug: postSlug,
    action: action, // 'view', 'share', 'newsletter_signup', 'read_time'
    value: value,
    content_group1: 'Blog'
  });
};

// Track newsletter signups
export const trackNewsletterSignup = (source = 'blog') => {
  trackEvent('newsletter_signup', {
    source: source,
    content_group1: 'Newsletter'
  });
};

// Track social shares
export const trackSocialShare = (platform, url, title) => {
  trackEvent('share', {
    method: platform,
    content_type: 'blog_post',
    item_id: url,
    content_group1: 'Social'
  });
};

// Track contact form submissions
export const trackContactForm = (source = 'contact_page') => {
  trackEvent('contact_form_submit', {
    source: source,
    content_group1: 'Contact'
  });
};

// Track resume downloads
export const trackResumeDownload = () => {
  trackEvent('file_download', {
    file_name: 'abhishek_sagar_sanda_resume.pdf',
    file_extension: 'pdf',
    link_url: '/resume',
    content_group1: 'Resume'
  });
};

// Track project interactions
export const trackProjectInteraction = (projectName, action) => {
  trackEvent('project_interaction', {
    project_name: projectName,
    action: action, // 'view_demo', 'view_code', 'learn_more'
    content_group1: 'Projects'
  });
};

// Performance tracking
export const trackPerformance = () => {
  if (typeof window === 'undefined' || !window.gtag) return;
  
  // Track page load time
  window.addEventListener('load', () => {
    setTimeout(() => {
      const perfData = performance.getEntriesByType('navigation')[0];
      const pageLoadTime = perfData.loadEventEnd - perfData.fetchStart;
      
      trackEvent('page_timing', {
        name: 'page_load_time',
        value: Math.round(pageLoadTime),
        content_group1: 'Performance'
      });
    }, 0);
  });
};

// User engagement tracking
export const setupEngagementTracking = () => {
  if (typeof window === 'undefined') return;
  
  let startTime = Date.now();
  let isActive = true;
  
  // Track time on page
  const trackTimeOnPage = () => {
    if (isActive) {
      const timeSpent = Date.now() - startTime;
      trackEvent('user_engagement', {
        engagement_time_msec: timeSpent,
        content_group1: 'Engagement'
      });
    }
  };
  
  // Track when user becomes inactive
  const handleVisibilityChange = () => {
    if (document.hidden) {
      isActive = false;
      trackTimeOnPage();
    } else {
      isActive = true;
      startTime = Date.now();
    }
  };
  
  // Track scroll depth
  let maxScrollPercentage = 0;
  const trackScrollDepth = () => {
    const scrollPercentage = Math.round(
      (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
    );
    
    if (scrollPercentage > maxScrollPercentage) {
      maxScrollPercentage = scrollPercentage;
      
      // Track milestone percentages
      if ([25, 50, 75, 100].includes(scrollPercentage)) {
        trackEvent('scroll', {
          percent_scrolled: scrollPercentage,
          content_group1: 'Engagement'
        });
      }
    }
  };
  
  // Set up event listeners
  document.addEventListener('visibilitychange', handleVisibilityChange);
  window.addEventListener('scroll', trackScrollDepth);
  window.addEventListener('beforeunload', trackTimeOnPage);
};

// A/B Testing utilities
export const getVariant = (testName, variants = ['A', 'B']) => {
  if (typeof window === 'undefined') return variants[0];
  
  const stored = localStorage.getItem(`ab_test_${testName}`);
  if (stored && variants.includes(stored)) {
    return stored;
  }
  
  // Assign random variant
  const variant = variants[Math.floor(Math.random() * variants.length)];
  localStorage.setItem(`ab_test_${testName}`, variant);
  
  // Track variant assignment
  trackEvent('ab_test_assignment', {
    test_name: testName,
    variant: variant,
    content_group1: 'AB_Testing'
  });
  
  return variant;
};

// Error tracking
export const setupErrorTracking = () => {
  if (typeof window === 'undefined') return;
  
  window.addEventListener('error', (event) => {
    trackEvent('exception', {
      description: `${event.error?.message || 'Unknown error'} at ${event.filename}:${event.lineno}`,
      fatal: false,
      content_group1: 'Errors'
    });
  });
  
  window.addEventListener('unhandledrejection', (event) => {
    trackEvent('exception', {
      description: `Unhandled promise rejection: ${event.reason}`,
      fatal: false,
      content_group1: 'Errors'
    });
  });
};