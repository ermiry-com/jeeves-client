import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Alert = ({ alerts }) =>
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map (alert => (
    <nav key={ alert.id } className={ `alert-${alert.alert_type} navbar navbar-expand-lg sticky-top text-center`}>
        <div className="container">
            { alert.msg }
        </div>
    </nav>
));

Alert.propTypes = {
    alerts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    alerts: state.alert
});

export default connect (mapStateToProps) (Alert);