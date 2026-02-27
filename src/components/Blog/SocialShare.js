import React from "react";
import { 
  AiOutlineTwitter, 
  AiOutlineLinkedin, 
  AiFillRedditCircle,
  AiOutlineLink,
  AiOutlineFacebook 
} from "react-icons/ai";
import { trackSocialShare } from "../../utils/analytics";

function SocialShare({ url, title, description }) {
  const shareData = {
    url: encodeURIComponent(url),
    title: encodeURIComponent(title),
    description: encodeURIComponent(description)
  };

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${shareData.url}&text=${shareData.title}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${shareData.url}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${shareData.url}`,
    reddit: `https://www.reddit.com/submit?url=${shareData.url}&title=${shareData.title}`,
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      // You could add a toast notification here
      alert("Link copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy: ", err);
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
        alert("Link copied to clipboard!");
      } catch (err) {
        alert("Failed to copy link");
      }
      document.body.removeChild(textArea);
    }
  };

  const handleShare = (platform) => {
    // Track social share
    trackSocialShare(platform, url, title);
    
    if (platform === 'copy') {
      copyToClipboard();
      return;
    }
    
    const shareUrl = shareLinks[platform];
    window.open(shareUrl, '_blank', 'noopener,noreferrer,width=600,height=600');
  };

  // Native Web Share API for mobile
  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: description,
          url: url,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    }
  };

  return (
    <div className="social-share">
      <span style={{ color: "rgba(255, 255, 255, 0.8)", marginRight: "10px" }}>
        Share this article:
      </span>
      
      <button 
        className="social-share-button"
        onClick={() => handleShare('twitter')}
        aria-label="Share on Twitter"
      >
        <AiOutlineTwitter size={18} />
        <span>Twitter</span>
      </button>
      
      <button 
        className="social-share-button"
        onClick={() => handleShare('linkedin')}
        aria-label="Share on LinkedIn"
      >
        <AiOutlineLinkedin size={18} />
        <span>LinkedIn</span>
      </button>
      
      <button 
        className="social-share-button"
        onClick={() => handleShare('reddit')}
        aria-label="Share on Reddit"
      >
        <AiFillRedditCircle size={18} />
        <span>Reddit</span>
      </button>
      
      <button 
        className="social-share-button"
        onClick={() => handleShare('copy')}
        aria-label="Copy link"
      >
        <AiOutlineLink size={18} />
        <span>Copy Link</span>
      </button>

      {/* Show native share button on mobile */}
      {navigator.share && (
        <button 
          className="social-share-button"
          onClick={handleNativeShare}
          aria-label="Share"
        >
          <AiOutlineLink size={18} />
          <span>Share</span>
        </button>
      )}
    </div>
  );
}

export default SocialShare;