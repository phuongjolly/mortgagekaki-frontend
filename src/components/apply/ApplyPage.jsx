import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './ApplyPage.less';
import TextField from '../ui/TextField';
import { applicationActionCreator } from '../../reducers/application';
import { renderLoading } from '../rate-comparison/ResultPanel';


function ApplyPage({
  name,
  email,
  mobile,
  update,
  apply,
  match,
  isLoading,
  isSuccessful,
}) {
  if (isLoading) {
    return (
      <div className="apply-page">
        {renderLoading('spinningBubbles', '#20cb7e')}
      </div>
    );
  }

  if (isSuccessful) {
    window.fbq('track', 'PageView');
    window.fbq('track', 'Lead');

    return (
      <div className="apply-page">
        <h1>Thank you</h1>
        <div className="row">
          Your request has been successfully sent.
          <br />
          You will be contacted 1-2 days time.
          <br />
          Thank you, and have a good day ahead.
          <br />
        </div>
        <div className="apply row">
          <Link className="cancel button" to="/search/purchase">
            Back
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className="apply-page">
      <h1>Enquire Details</h1>

      <div className="row">
        <div className="label">Name</div>
        <TextField
          value={name}
          className="name"
          onChange={value => update('name', value)}
          symbol=" "
        />
      </div>
      <div className="row">
        <div className="label">Email</div>
        <TextField
          value={email}
          className="email"
          onChange={value => update('email', value)}
          symbol=" "
        />
      </div>
      <div className="row">
        <div className="label">Mobile Number</div>
        <TextField
          value={mobile}
          className="email"
          onChange={value => update('mobile', value)}
          symbol=" "
        />
      </div>
      <div className="description">
        By clicking Submit, you agree to our
        {' '}
        <a href="http://www.mortgagekaki.com/?page_id=34">Terms of Use</a>
        , and
        {' '}
        <a href="http://www.mortgagekaki.com/?page_id=29"> Privacy Policy</a>
        .
      </div>
      <div className="apply row">
        <div
          role="presentation"
          className="apply button"
          onClick={() => apply(match.params.packageId)}
        >
          Submit
        </div>
        <Link className="cancel button" to="/search/purchase">
          Back
        </Link>
      </div>
    </div>
  );
}

ApplyPage.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  mobile: PropTypes.string.isRequired,
  update: PropTypes.func.isRequired,
  apply: PropTypes.func.isRequired,
  match: PropTypes.shape({}).isRequired,
  isLoading: PropTypes.bool.isRequired,
  isSuccessful: PropTypes.bool.isRequired,
};

export default connect(
  state => state.application,
  applicationActionCreator,
)(ApplyPage);
