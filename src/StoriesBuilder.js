import React, { Component } from 'react';
import Main from './components/Main.jsx';

function createStories(basePath, name) {
    return class StoriesBuilder extends Component{
        render() {
            return <Main {...this.props} basePath={basePath} name={name}/>;
        }
    };
}

export const NewStories = createStories('newest', 'newstories');
export const TopStories = createStories('news', 'topstories');
export const ShowStories = createStories('show', 'showstories');
export const AskStories = createStories('ask', 'askstories');
export const JobsStories = createStories('jobs', 'jobstories');
