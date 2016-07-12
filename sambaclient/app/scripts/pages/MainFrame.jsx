var React = require('react');
var { Navbar, Nav, NavItem } = require('react-bootstrap');
var { Link } = require('react-router');

var MainFrame = React.createClass({

    render: function() {
        return (
            <div className="App">
                <Navbar>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="#">Samba</a>
                        </Navbar.Brand>
                    </Navbar.Header>
                    <Nav>
                        <NavItem eventKey={1}>
                            <Link to={'/jobs'}>Jobs</Link>
                        </NavItem>
                        <NavItem eventKey={2}>
                            <Link to={'/new'}>New Job</Link>
                        </NavItem>
                    </Nav>
                </Navbar>
                {this.props.children}
            </div>
        );
    }

});

module.exports = MainFrame;
