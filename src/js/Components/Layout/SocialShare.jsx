import React from 'react';
import { ShareButtons, generateShareIcon } from 'react-share';

const {
  FacebookShareButton,
  TwitterShareButton,
  RedditShareButton,
  EmailShareButton,
} = ShareButtons;

const FacebookIcon = generateShareIcon('facebook');
const TwitterIcon = generateShareIcon('twitter');
const RedditIcon = generateShareIcon('reddit');
const EmailIcon = generateShareIcon('email');

class SocialShare extends React.Component {
  render() {
    return (
      <div className='socialComponent'>
        <FacebookShareButton url={window.location.href} quote={this.props.notice.title}>
          <FacebookIcon size={40}/>
        </FacebookShareButton>
        <TwitterShareButton url={window.location.href} title={this.props.notice.title}>
          <TwitterIcon size={40}/>
        </TwitterShareButton>
        <RedditShareButton url={window.location.href} title={this.props.notice.title}>
          <RedditIcon size={40}/>
        </RedditShareButton>
        <EmailShareButton url={window.location.href} title={this.props.notice.title}>
          <EmailIcon size={40}/>
        </EmailShareButton>
      </div>
    );
  }
}

export default SocialShare;

