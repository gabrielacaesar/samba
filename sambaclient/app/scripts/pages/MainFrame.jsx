var React = require('react');
var { AppBar } = require('material-ui');
var VideoCamIcon = require('material-ui/svg-icons/av/videocam').default;
var ArrowBackIcon = require('material-ui/svg-icons/navigation/arrow-back').default;

var MainFrame = React.createClass({
    navigate: function() {
        if(this.props.location.pathname != '/') {
            this.props.history.push('/');
        }
    },
    render: function() {
        var icon = this.props.location.pathname == '/' ? VideoCamIcon : ArrowBackIcon;
        return (
            <div className="App">
                <AppBar
                    title="Samba"
                    iconElementLeft={React.createElement(icon, {
                        style: { margin: 12, marginRight: 8},
                        color: 'white',
                        onClick: this.navigate
                    })}
                />
                {this.props.children}
            </div>
        );
    }

});

module.exports = MainFrame;
