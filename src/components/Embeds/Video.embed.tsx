import React from 'react';

import { validateFacebookVideo, validateVideoUrl, validateYouTubeVideo, validateZoomVideo, validateMatterportVideo } from '../../utils/Validator.util'

const VideoEmbed: React.FC<any> = (props: any) => {

    const video: string = props.video.toString().replace('http:', 'https:');
    if (validateVideoUrl(video) || video.charAt(0) === '~') return <></>;

    if (!validateFacebookVideo(video)) {
        const embedUrl = `https://www.facebook.com/plugins/video.php?href=${ decodeURI(video) }`;
        return (
            <div className="facebook-video embed-responsive embed-responsive-16by9">
                <iframe title="facebook-video" className="embed-responsive-item"src={ embedUrl } allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" ></iframe>
            </div>
        );
    } else if (!validateYouTubeVideo(video)) {
        let embedUrl;
        if (video.indexOf('v=') > 0) {
            const start = video.indexOf('v=') + 2;
            const end = video.indexOf('&', start);
            const id = video.substring(start, end > 0 ? end : video.length);
            embedUrl = `https://www.youtube.com/embed/${id}?mute=1&playlist=${id}`;
        } else if (video.indexOf('youtu.be') > 0) {
            const lastIndex = video.lastIndexOf('/');
            const id = video.substring(lastIndex + 1);
            embedUrl = `https://www.youtube.com/embed/${id}?mute=1&playlist=${id}`;
        } else if (video.indexOf('youtube.com/embed') > 0 || video.indexOf('youtube-nocookie') > 0) {
            const slash = video.lastIndexOf('/');
            const ques = video.indexOf('?') > 0 ? video.indexOf('?') : video.length;
            const id = video.substring(slash + 1, ques);
            embedUrl = `https://www.youtube.com/embed/${id}?mute=1&playlist=${id}`;
        }
        return (
            <div className="youtube-video embed-responsive embed-responsive-16by9">
                <iframe title="youtube-video" className="embed-responsive-item" src={ embedUrl } allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" ></iframe>
            </div>
        );
    } else if (!validateZoomVideo(video)) {
        return (
            <div className="zoom-video">
                <a target='_blank' rel="noopener noreferrer" href={ video }>Live Zoom Open House</a>
            </div>
        );
    } else if (!validateMatterportVideo(video)) {
        return (
            <div className="virtual-tour-video embed-responsive embed-responsive-16by9">
                <iframe className="embed-responsive-item" title="virtual-tour" src={ video } allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" ></iframe>
            </div>
        );
    } else {
        return <></>;
    }
};

export default VideoEmbed;
