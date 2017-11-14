import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router';

import { capitalize, remoteBrowserMod } from 'helpers/utils';
import EditableString from 'components/EditableString';
import TimeFormat from 'components/TimeFormat';


class PageRow extends Component {
  static propTypes = {
    browserObj: PropTypes.object,
    coll: PropTypes.object,
    index: PropTypes.number,
    onSelectRow: PropTypes.func,
    page: PropTypes.object,
    rec: PropTypes.object,
    selected: PropTypes.bool
  };

  static contextTypes = {
    canAdmin: PropTypes.bool
  }

  selectRow = () => {
    const { index, rec } = this.props;

    this.props.onSelectRow({
      rec,
      index
    });
  }

  render() {
    const { canAdmin } = this.context;
    const { browserObj, coll, page, selected } = this.props;

    const browser = page.get('browser') || null;
    const url = page.get('url');
    const ts = page.get('timestamp');

    return (
      <tr
        className={classNames({ selected })}
        onClick={this.selectRow}
        role="button">
        {
          canAdmin &&
            <td className="bookmark-hidden-switch"><span className="glyphicon glyphicon-star" /></td>
        }
        {
          canAdmin &&
            <td className="bookmark-edit-title"><span className="glyphicon glyphicon-bookmark" /></td>
        }
        <td className="timestamp"><TimeFormat dt={ts} /></td>
          <td className="bookmark-title">
            <Link to={`/${coll.get('user')}/${coll.get('id')}/${remoteBrowserMod(browser, ts)}/${url}`}>
              <EditableString
                string={page.get('title') || 'No Title'}
                className="edit-coll-title" />
            </Link>
          </td>
        <td className="bookmark-url">{url}</td>
      </tr>
    );
  }
}

export default PageRow;
