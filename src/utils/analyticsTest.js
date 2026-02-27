// Analytics testing utility - verify Google Analytics is working
// Run this in browser console to test tracking

export const testAnalytics = () => {
  console.log('🧪 Testing Google Analytics Integration...');
  
  // Check if gtag is loaded
  if (typeof window !== 'undefined' && window.gtag) {
    console.log('✅ gtag is loaded successfully');
    console.log('📊 Google Analytics ID: G-B6H259W4M9');
    
    // Test custom event
    window.gtag('event', 'test_event', {
      event_category: 'Testing',
      event_label: 'Analytics Test',
      value: 1
    });
    console.log('📤 Test event sent: test_event');
    
    // Test page view
    window.gtag('config', 'G-B6H259W4M9', {
      page_path: '/test',
      page_title: 'Analytics Test Page'
    });
    console.log('📄 Test page view sent');
    
    console.log('🎉 Analytics test complete! Check your Google Analytics dashboard in a few minutes.');
    
    return true;
  } else {
    console.error('❌ gtag is not loaded. Check your Google Analytics setup.');
    return false;
  }
};

// Test specific blog engagement tracking
export const testBlogTracking = () => {
  console.log('📝 Testing blog engagement tracking...');
  
  if (typeof window !== 'undefined' && window.gtag) {
    // Test blog view
    window.gtag('event', 'blog_engagement', {
      post_slug: 'test-post',
      action: 'view',
      content_group1: 'Blog'
    });
    console.log('📖 Blog view event sent');
    
    // Test newsletter signup
    window.gtag('event', 'newsletter_signup', {
      source: 'test',
      content_group1: 'Newsletter'
    });
    console.log('✉️ Newsletter signup event sent');
    
    // Test social share
    window.gtag('event', 'share', {
      method: 'twitter',
      content_type: 'blog_post',
      item_id: window.location.href,
      content_group1: 'Social'
    });
    console.log('🐦 Social share event sent');
    
    console.log('🎉 Blog tracking test complete!');
    return true;
  } else {
    console.error('❌ gtag not available for blog tracking test');
    return false;
  }
};

// Instructions for manual testing
export const getTestInstructions = () => {
  return `
🧪 GOOGLE ANALYTICS TESTING INSTRUCTIONS

1. Open your website in a browser
2. Open Developer Tools (F12)
3. Go to Console tab
4. Run these commands:

   // Import test functions
   import { testAnalytics, testBlogTracking } from './src/utils/analyticsTest.js';
   
   // Test basic analytics
   testAnalytics();
   
   // Test blog-specific tracking
   testBlogTracking();

5. Check your Google Analytics dashboard:
   - Go to https://analytics.google.com
   - Select your property (G-B6H259W4M9)
   - Go to Realtime > Events
   - You should see the test events within 1-2 minutes

6. Verify these events are tracked:
   - Page views (automatic)
   - test_event (manual test)
   - blog_engagement (blog views)
   - newsletter_signup (form submissions)
   - share (social sharing)

🎯 Expected Results:
- Events appear in GA4 Realtime dashboard
- User sessions are tracked
- Page views are recorded
- Custom events show proper parameters

If events don't appear:
- Check browser console for errors
- Verify network requests to google-analytics.com
- Confirm G-B6H259W4M9 is the correct measurement ID
- Wait up to 24 hours for data to appear in standard reports
  `;
};

// Auto-run basic test when this file is imported (development only)
if (process.env.NODE_ENV === 'development') {
  console.log('🔧 Development mode - Analytics auto-test enabled');
  console.log(getTestInstructions());
}