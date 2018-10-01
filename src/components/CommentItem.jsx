import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import TimeAgo from 'react-timeago';
import { arrayToObject } from '../utilities/helper';
import { fetchItems } from '../api';
import ComponentAnimation from '../styles/ComponentAnimation.jsx';
import { TextToggle, ToggleMeta } from '../styles/CommentItem.jsx';

import makeComponentTrashable from 'trashable-react';

class CommentItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {}
    };
    this.toggleVisible = this.toggleVisible.bind(this);
  }

  componentDidMount() {
    const { kids, registerPromise } = this.props;

    kids &&
      registerPromise(fetchItems(kids)).then(items => {
        this.setState({
          data: Object.assign({}, arrayToObject(items, 'id'))
        });
      });
  }

  toggleVisible(id) {
    const { data } = this.state;
    this.setState({
      data: {
        ...data,
        [id]: { ...data[id], visible: !data[id].visible }
      }
    });
  }

  render() {
    const { data } = this.state;
    const { kids, registerPromise } = this.props;
    if (kids === undefined) {
      return <ComponentAnimation>No comments!</ComponentAnimation>;
    }
    return (
      <React.Fragment>
        {kids.map(kid => {
          if (data[kid] === undefined) return null;
          if (data[kid].deleted) return null;
          if (data[kid].dead) return null;
          if (!data[kid].id) return null;
          const { by, time, text, id, kids, visible } = data[kid];
          return (
            <ComponentAnimation key={id}>
              <div>
                <ToggleMeta onClick={() => this.toggleVisible(id)}>
                  {visible ? ' [-] ' : ' [+] '}
                </ToggleMeta>
                <Link to={`/user/${by}`}>
                  <b> {by} </b>
                </Link>
                <span>
                  <TimeAgo date={new Date(time * 1000)} />
                </span>
              </div>
              <TextToggle visible={visible}>
                <div
                  className="text"
                  dangerouslySetInnerHTML={{ __html: text }}
                />
                <p>reply</p>
                {kids && (
                  <CommentItem registerPromise={registerPromise} kids={kids} />
                )}
              </TextToggle>
            </ComponentAnimation>
          );
        })}
      </React.Fragment>
    );
  }
}

CommentItem.propTypes = {
  kids: PropTypes.arrayOf(PropTypes.number),
  registerPromise: PropTypes.func
};

export default makeComponentTrashable(CommentItem);
